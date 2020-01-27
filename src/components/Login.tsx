import React, {useContext} from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from "react-router-dom";
import jwt from 'jwt-decode'
import {AppContext} from '../context/AppProvider'
import TextField from './shared/TextField'

interface ILogin {
    email: string
    password: string
}


const initialValues: ILogin = {
    email: "",
    password: ""
}
const postLogin = async (values: ILogin, actions:FormikHelpers<ILogin>, dispatch,history) => {
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
}

const Login: React.FC = () => {
    const {dispatch} = useContext(AppContext)
    const history = useHistory();
    return (
        <div>
          <h1>You Don't have access to Admin</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postLogin(values, actions,dispatch,history)}
          >
            {(props: FormikProps<ILogin>) => (
              <Form>
                <TextField name="email" type="email" label="Email" />
                <TextField name="password" type="text" label="Password" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default Login