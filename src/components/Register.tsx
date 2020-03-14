import React, { useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextFieldContainer'
import * as Yup from 'yup';
import ReCaptcha from './shared/ReCaptcha';
import { Typography, Button, Paper } from '@material-ui/core';
import PageHeading from './shared/PageHeading';
import Uploader from './shared/Uploader';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

interface IRegister {
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
  avatar: string
}

const initialValues: IRegister = {
  email: "",
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  avatar: ""
}

const Register: React.FC = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [recaptcha, setRecaptcha] = useState(false)

  const recaptchaCallback = function () {
    setRecaptcha(true)
  };

  const postRegister = async (values: IRegister, setError, setSuccess) => {
    try {
      if (!recaptcha) {
        setError("Unless your name is Allen, you need to check that box!")
        return
      }
      setError(null)

      const registerRequest: AxiosResponse = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/register`,
        data: values,
        headers: {
          "Content-Type": "application/json",
        }
      });
      setSuccess(true)
      return registerRequest.data
    }
    catch (error) {
      const { response } = error
      //Could be as granular as we like here or could leave it generic.
      console.log(response)
      setError(response.statusText)
    }
  }

  return (
    <div>
      <PageHeading text="Register" />
      <Paper style={{ padding: 20, maxWidth: 500 }}>
        {success ? (
          <div>
            Please check your email and click the link to confirm and complete your registration.
          </div>
        ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => postRegister(values, setError, setSuccess)}
              validationSchema={RegisterSchema}
            >
              {(props: FormikProps<IRegister>) => (
                <Form>
                  <TextField name="email" type="email" label="Email" />
                  <TextField name="username" type="text" label="Username" />
                  <TextField name="first_name" type="text" label="First Name" />
                  <TextField name="last_name" type="text" label="Last Name" />
                  <TextField name="password" type="password" label="Password" />
                  <Uploader {...props} label="Avatar" name="avatar" multiple={false} />
                  <ReCaptcha callback={() => recaptchaCallback()}></ReCaptcha>

                  <Button variant="contained" type="submit">Submit</Button>

                  {error &&
                    <>
                      <div style={{height: 20}}></div>
                      <Typography color="error">{error}</Typography>
                    </>
                  }
                </Form>
              )}
            </Formik>
          )}
      </Paper>
    </div>
  );
}

export default Register