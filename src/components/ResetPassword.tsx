import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik, FormikProps } from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';
import { Typography, Button } from '@material-ui/core';
import PageHeading from './shared/PageHeading'

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
});

interface IResetPassword {
  password: string,
  password_confirmation: string
}

const initialValues: IResetPassword = {
  password: "",
  password_confirmation: "",
}

const postResetPassword = async (values: IResetPassword, token: string, setError, setSuccess) => {
  try {
    setError(null)
    const resetPasswordRequest: AxiosResponse = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/auth/password/update/${token}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
      }
    });
    setSuccess(true)
    return resetPasswordRequest.data
  }
  catch (error) {
    const { response } = error
    console.log(response)
    setError(response.statusText)
  }
}

const ResetPassword: React.FC = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const params = useParams();
  return (
    <div>
      <PageHeading text="Reset Password" />
      {success ? (
        <div>Your password has been reset.</div>
      ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => postResetPassword(values, params.token, setError, setSuccess)}
            validationSchema={ResetPasswordSchema}
          >
            {(props: FormikProps<IResetPassword>) => (
              <Form>
                {error && <Typography color="error" variant="h6">{error}</Typography>}
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_confirmation" type="password" label="Password confirm" />
                <Button variant="contained" type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        )}
    </div>
  );
}

export default ResetPassword