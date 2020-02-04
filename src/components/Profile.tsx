import React, { useState } from 'react'
import { Form, Formik, FormikProps} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';
import { Typography } from '@material-ui/core';

const ProfileSchema = Yup.object().shape({
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

interface IProfile {
    email: string
    username: string
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    avatar: string
}

const initialValues: IProfile = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    avatar: ""
}

const postProfile = async (values: IProfile, setError, setSuccess) => {
  try {
    setError(null)
    const registerRequest:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/auth/register',
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

const Profile: React.FC = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    return (
        <div>
          {success ? (
            <div>Please check your email and click the link to confirm and complete your registration.</div>
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => postProfile(values, setError, setSuccess)}
              validationSchema={ProfileSchema}
            >
              {(props: FormikProps<IProfile>) => (
                <Form>
                  {error && <Typography color="error" variant="h6">{error}</Typography>}
                  <TextField name="email" type="email" label="Email" />
                  <TextField name="username" type="text" label="Username" />
                  <TextField name="first_name" type="text" label="First Name" />
                  <TextField name="last_name" type="text" label="Last Name" />
                  <TextField name="password" type="password" label="Password" />
                  <TextField name="password_confirmation" type="password" label="Password Confirmation" />

                  // add image avatar upload to rails here //
                  <input name="avatar" type="file"></input>

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>)}
        </div>
      );
}

  export default Profile 