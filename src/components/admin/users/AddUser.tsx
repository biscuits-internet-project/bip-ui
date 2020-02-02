import React, {useState, useEffect, useContext} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../../../context/AppProvider'
import TextField from '../../shared/TextField'
import {IUser} from './AdminUsers'
import Button from '@material-ui/core/Button'

interface IAddUser {
    updateUsers(user: IUser): void
}

const initialValues = {
  id: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
  first_name: "",
  last_name: "",
  avatar: ""
}
const postUser = async (values: IUser, actions:FormikHelpers<IUser>, updateUsers: (user: IUser) => void, token: string | null) => {
    console.log(values)
    const newUser:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/users',
        data: values,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
    });
    
    updateUsers(newUser.data)
    updateUsers(values)
    actions.resetForm()
}

const AddUser: React.FC<IAddUser> = ({updateUsers}) => {
    const {state} = useContext(AppContext)
    return (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postUser(values, actions, updateUsers, state.token)}
          >
            {(props: FormikProps<IUser>) => (
              <Form>
                 <TextField name="email" type="email" label="Email" />
                <TextField name="username" type="text" label="Username" />
                <TextField name="first_name" type="text" label="First Name" />
                <TextField name="last_name" type="text" label="Last Name" />
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_confirmation" type="password" label="Password Confirmation" />

                // add image avatar upload to rails here //
                <input name="avatar" type="file"></input>

                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default AddUser