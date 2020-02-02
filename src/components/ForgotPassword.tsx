import React from 'react'
import { Form, Formik, FormikProps} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';

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

const postForgotPassword = async (values: IForgotPassword) => {
    const forgotPasswordRequest:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/auth/password/reset',
        data: values,
        headers: {
            "Content-Type":	"application/json", 
        }
    });
    return forgotPasswordRequest.data
}

const ForgotPassword: React.FC = () => {
    return (
        <div>
          <h1>Forgot Password</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => postForgotPassword(values)}
            validationSchema={ForgotPasswordSchema}
          >
            {(props: FormikProps<IForgotPassword>) => (
              <Form>
                <TextField name="email" type="email" label="Email" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default ForgotPassword