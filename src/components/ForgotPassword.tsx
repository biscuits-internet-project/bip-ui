import React, { useState } from 'react'
import { Form, Formik, FormikProps} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';
import { Typography } from '@material-ui/core';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

interface IForgotPassword {
    email: string
}

const initialValues: IForgotPassword = {
    email: "",
}

const postForgotPassword = async (values: IForgotPassword, setError, setSuccess) => {
  try {
    setError(null)
    const forgotPasswordRequest:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/auth/password/reset',
        data: values,
        headers: {
            "Content-Type":	"application/json", 
        }
    });
    setSuccess(true)
    return forgotPasswordRequest.data
  }
  catch(error) {
    const {response} = error
    //Could be as granular as we like here or could leave it generic.
    console.log(response)
    setError(response.statusText)
  }
}

const ForgotPassword: React.FC = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    return (
        <div>
          <h1>Forgot Password</h1>
          {success ? (
            <div>Please check your email and click the link to rest your password.</div>
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => postForgotPassword(values, setError, setSuccess)}
              validationSchema={ForgotPasswordSchema}
            >
              {(props: FormikProps<IForgotPassword>) => (
                <Form>
                  {error && <Typography color="error" variant="h6">{error}</Typography>}
                  <TextField name="email" type="email" label="Email" />
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      );
}

  export default ForgotPassword