import React from 'react'
import {useParams} from 'react-router-dom'
import { Form, Formik, FormikProps} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';

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

const postResetPassword = async (values: IResetPassword, token: string) => {
    const resetPasswordRequest:AxiosResponse = await axios({
        method: 'put',
        url: `https://stg-api.discobiscuits.net/api/auth/password/update/${token}`,
        data: values,
        headers: {
            "Content-Type":	"application/json", 
        }
    });
    return resetPasswordRequest.data
}

const ResetPassword: React.FC = () => {
  	const params = useParams();
    return (
        <div>
          <h1>Reset Password</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => postResetPassword(values, params.token)}
            validationSchema={ResetPasswordSchema}
          >
            {(props: FormikProps<IResetPassword>) => (
              <Form>
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_confirmation" type="password" label="Password confirm" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default ResetPassword