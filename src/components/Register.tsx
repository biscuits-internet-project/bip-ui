import React, {useContext} from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import * as Yup from 'yup';

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

const postRegister = async (values: IRegister, actions:FormikHelpers<IRegister>) => {
    const registerRequest:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/auth/register',
        data: values,
        headers: {
            "Content-Type":	"application/json", 
        }
    });
    const {data} = registerRequest
}

const Register: React.FC = () => {
    return (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postRegister(values, actions)}
            validationSchema={RegisterSchema}
          >
            {(props: FormikProps<IRegister>) => (
              <Form>
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
          </Formik>
        </div>
      );
}

  export default Register 