import React, { useState } from 'react'
import { Form, Formik, FormikProps} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';
import ReCaptcha from './shared/ReCaptcha';
import { Typography, Button } from '@material-ui/core';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
});

interface IRegister {
    email: string
    username: string
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    avatar: string
}

const initialValues: IRegister = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    avatar: ""
}

const postRegister = async (values: IRegister, setError, setSuccess) => {
  try {
    setError(null)
    const registerRequest:AxiosResponse = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/register`,
        data: values,
        headers: {
            "Content-Type":	"application/json",
        }
    });
    setSuccess(true)
    return registerRequest.data
  }
  catch(error){
    const {response} = error
    //Could be as granular as we like here or could leave it generic.
    console.log(response)
    setError(response.statusText)
  }
}

const Register: React.FC = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    return (
        <div>
          <h1>Register</h1>
          {success ? (
            <div>Please check your email and click the link to confirm and complete your registration.</div>
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => postRegister(values, setError, setSuccess)}
              validationSchema={RegisterSchema}
            >
              {(props: FormikProps<IRegister>) => (
                <Form>
                  {error && <Typography color="error" variant="h6">{error}</Typography>}
                  <TextField name="email" type="email" label="Email" />
                  <TextField name="username" type="text" label="Username" />
                  <TextField name="first_name" type="text" label="First Name" />
                  <TextField name="last_name" type="text" label="Last Name" />
                  <TextField name="password" type="password" label="Password" />
                  <TextField name="password_confirmation" type="password" label="Password Confirmation" />

                  <input name="avatar" type="file"></input>

                  <ReCaptcha></ReCaptcha>

                  <Button variant="contained" type="submit">Submit</Button>
                </Form>
              )}
            </Formik>)}
        </div>
      );
}

  export default Register