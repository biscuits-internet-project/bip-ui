import React, { useState, useContext } from 'react'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { useHistory, Link as RouterLink } from "react-router-dom";
import { History } from 'history'
import jwt from 'jwt-decode'
import { AppContext } from '../context/AppProvider'
import TextField from './shared/TextFieldContainer'
import Button from '@material-ui/core/Button'
import ForgotPassword from './ForgotPassword'
import { Link, Paper, Grid, Fade, Box } from '@material-ui/core';
import PageHeading from './shared/PageHeading';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

interface ILogin {
  email: string
  password: string
}

const initialValues: ILogin = {
  email: "",
  password: ""
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(true)
  const { dispatch } = useContext(AppContext)
  const {asyncActions} = useContext(AppContext)
  const history = useHistory();

  const postLogin = async (values: ILogin, actions: FormikHelpers<ILogin>, dispatch: ({ type: string, payload: any }) => void, history: History, setLoading) => {
    try {
      setLoading(true)
      const loginRequest: AxiosResponse = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/login`,
        data: values,
        headers: {
          "Content-Type": "application/json",
        }
      });
      const { data } = loginRequest
      const { token } = data
      const roles = jwt(token).roles
      localStorage.setItem('token', token);

      asyncActions.getAttendances(token)

      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          roles
        }
      })
      history.push("/")
      return
    }
    catch (e) {
      setLoading(false)
      actions.setFieldError('password', 'Incorrect login Details')
    }
  }

  const handleOpenForgotPassword = () => {
    setForgotPasswordOpen(true)
    setLoginOpen(false)
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false)
    setLoginOpen(true)
  }

  return (
    <div>
      <PageHeading text="Sign In" />

      <div style={{ height: "20px" }}></div>

      <Paper style={{ padding: 20, maxWidth: 500 }}>
        {loginOpen &&
          <Fade in={loginOpen} timeout={1000}>
            <Box>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => postLogin(values, actions, dispatch, history, setLoading)}
                validationSchema={LoginSchema}
              >
                {(props: FormikProps<ILogin>) => (
                  <Form>
                    <TextField name="email" type="email" label="Email" />
                    <TextField name="password" type="password" label="Password" />
                    <div style={{ height: "20px" }}></div>
                    <Button variant="contained" type="submit" disabled={loading} fullWidth>LOG IN</Button>
                  </Form>
                )}
              </Formik>

              <div style={{ height: 40 }}></div>

              <Grid container justify="space-between">
                <Grid item>
                  <Link style={{ cursor: 'pointer' }} onClick={() => handleOpenForgotPassword()}>Forgot Password</Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register">Don't have an account? Sign up</Link>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        }

        {forgotPasswordOpen &&
          <ForgotPassword handleCloseForgotPassword={() => handleCloseForgotPassword()} />
        }

      </Paper>
    </div>
  );
}

export default Login