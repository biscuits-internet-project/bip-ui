import React, {useContext} from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import {History} from 'history'
import jwt from 'jwt-decode'
import {AppContext} from '../context/AppProvider'
import TextField from './shared/TextField'

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

const postLogin = async (values: ILogin, actions:FormikHelpers<ILogin>, dispatch:({type: string, payload: any})=> void, history:History) => {
    try {
      const loginRequest:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/auth/login',
        data: values,
        headers: {
            "Content-Type":	"application/json", 
        }
      });
      const {data} = loginRequest
      const {token} = data
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
      actions.setFieldError('password', 'Incorrect login Details')
    }
}

const Login: React.FC = () => {
    const {dispatch} = useContext(AppContext)
    const history = useHistory();
    return (
        <div style={{width: '100vw', height:  'calc(100vh - 300px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Login</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => postLogin(values, actions,dispatch,history)}
              validationSchema={LoginSchema}
            >
              {(props: FormikProps<ILogin>) => (
                <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <TextField name="email" type="email" label="Email" />
                  <TextField name="password" type="password" label="Password" />
                  <button style={{textAlign: 'center', marginTop: '16px'}} type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );
}

  export default Login