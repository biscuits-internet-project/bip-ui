import React, { useState, useContext } from 'react'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { History } from 'history'
import jwt from 'jwt-decode'
import { AppContext } from '../context/AppProvider'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from './shared/TextField'
//import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ForgotPassword from './ForgotPassword'
import { Box } from '@material-ui/core';

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

const postLogin = async (values: ILogin, actions: FormikHelpers<ILogin>, dispatch: ({ type: string, payload: any }) => void, history: History, setLoading) => {
  try {
    setLoading(true)
    const loginRequest: AxiosResponse = await axios({
      method: 'post',
      url: 'https://stg-api.discobiscuits.net/api/auth/login',
      data: values,
      headers: {
        "Content-Type": "application/json",
      }
    });
    const { data } = loginRequest
    const { token } = data
    const roles = jwt(token).roles
    localStorage.setItem('token', token);
    dispatch({
      type: 'LOGIN',
      payload: {
        token,
        roles
      }
    })
    history.push("/admin")
    return
  }
  catch (e) {
    setLoading(false)
    actions.setFieldError('password', 'Incorrect login Details')
  }
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AppContext)
  const history = useHistory();
  return (
    <div style={{ maxWidth: 400 }}>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => postLogin(values, actions, dispatch, history, setLoading)}
        validationSchema={LoginSchema}
      >
        {(props: FormikProps<ILogin>) => (
          <Form>
            <TextField name="email" type="email" label="Email" />
            <div style={{ height: "32px" }}></div>
            <TextField name="password" type="password" label="Password" />
            <div style={{ height: "32px" }}></div>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>LOG IN</Button>
          </Form>
        )}
      </Formik>

      <ForgotPassword />
    </div>
  );
}

export default Login