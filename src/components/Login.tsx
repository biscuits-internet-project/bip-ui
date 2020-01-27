import React from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'

interface ILogin {
    email: string
    password: string
}


const initialValues: ILogin = {
    email: "",
    password: ""
}
const postLogin = async (values: ILogin, actions:FormikHelpers<ILogin>) => {
    const login:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/auth/login',
        data: values,
        headers: {
            "Content-Type":	"application/json",
            // "Authorization": "jfghsjdgfhjdsghjf" 
        }
    });

    console.log(login)
    
    // updateVenues(newVenue.data)
    //actions.resetForm()
}

const Login: React.FC = () => {
    return (
        <div>
          <h1>Login</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postLogin(values, actions)}
          >
            {(props: FormikProps<ILogin>) => (
              <Form>
                <TextField name="email" type="email" label="Email" />
                <TextField name="password" type="text" label="Password" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default Login