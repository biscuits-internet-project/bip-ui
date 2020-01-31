import React, {useContext} from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'

interface IRegister {
    email: string
    username: string
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
}

const initialValues: IRegister = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: ""
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
          >
            {(props: FormikProps<IRegister>) => (
              <Form>
                <TextField name="email" type="email" label="Email" />
                <TextField name="first_name" type="text" label="First Name" />
                <TextField name="last_name" type="text" label="Last Name" />
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_confirmation" type="password" label="Password Confirmation" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default Register 