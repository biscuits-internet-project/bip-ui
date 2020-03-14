import React, { useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextFieldContainer'
import * as Yup from 'yup';
import { Typography, Button, Link, Fade, Box } from '@material-ui/core';
import Paragraph from './shared/Paragraph';

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

interface Props {
  handleCloseForgotPassword: () => void
}

const ForgotPassword: React.FC<Props> = ({ handleCloseForgotPassword }) => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const postForgotPassword = async (values: IForgotPassword, setError, setSuccess) => {
    try {
      setError(null)
      const forgotPasswordRequest: AxiosResponse = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/password/reset`,
        data: values,
        headers: {
          "Content-Type": "application/json",
        }
      });
      setSuccess(true)
      return forgotPasswordRequest.data
    }
    catch (error) {
      const { response } = error
      //Could be as granular as we like here or could leave it generic.
      console.log(response)
      setError(response.statusText)
    }
  }

  return (
    <Fade in={true} timeout={1000}>
      <Box>
        <Typography variant="h3">Forgot Password</Typography>
        {success ? (
          <Paragraph>
            <br /><br />
                Please check your email and click the link to reset your password.
          </Paragraph>
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
                  <div style={{ height: "20px" }}></div>
                  <Button variant="contained" type="submit">Reset Password</Button>
                </Form>
              )}
            </Formik>
          )}

        <div style={{ height: 40 }}></div>

        <Link style={{ cursor: 'pointer' }} onClick={() => handleCloseForgotPassword()}>&#8592; back to login</Link>
      </Box>
    </Fade>
  );
}

export default ForgotPassword