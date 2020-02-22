import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import {AppContext} from '../../../context/AppProvider'
import TextField from '../../shared/TextField'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import {IUser} from './AdminUsers'

interface IUserForm {
  setUsers: (users: IUser[]) => void
  users: IUser[],
  id: string | null
  handleClose: ()=> void
}

const initialValues:IUser = {
  id: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
  first_name: "",
  last_name: "",
  avatar: ""
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  username: Yup.string()
    .required('Username is required'),
  first_name: Yup.string()
    .required('First Name is required'),
  last_name: Yup.string()
    .required('Last Name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be 6 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required('Password is required')
});

const UserForm: React.FC<IUserForm> = ({setUsers, users, id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState(initialValues)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(()=> {
      const fetchUser = async () => {
        const data:AxiosResponse = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/users/${id}`,
          headers: {
            "Authorization": state.token
            }
        });
        const user:IUser = data.data
        setFormData(user)
      }
      if(id){
        fetchUser()
      }
    },[id])

    const postUser = useCallback(async (values: IUser, actions:FormikHelpers<IUser>) => {
      try {
        setError(null)
        const newUser:AxiosResponse = await axios({
            method: id ? 'put' : 'post',
            url: `${process.env.REACT_APP_API_URL}/users/${id ? id : ''}`,
            data: values,
            headers: {
                "Content-Type":	"application/json",
                "Authorization": state.token
            }
        });

        const {data} = newUser

        if(!id){
          setUsers([data, ...users])
          enqueueSnackbar(`Successfully added ${data.name}`, { variant: 'success' })
          handleClose()
        } else {
          const index = users.findIndex(user => user.id === id)
          const newUsers = [...users]
          newUsers[index] = data
          setUsers(newUsers)
          enqueueSnackbar(`Successfully edited ${data.name}`, { variant: 'success' })
          handleClose()
        }
      }
      catch(error){
        const {response} = error
        const {data} = response
        if (typeof data === 'object'){
          Object.keys(data).forEach(key => actions.setFieldError(key, data[key]))
        }
        else {
          setError(response.statusText)
        }
      }
    }, [enqueueSnackbar, handleClose, id, setUsers, users, state.token])

    return (
        <div>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={formData}
            onSubmit={(values, actions) => postUser(values, actions)}
          >
            {(props: FormikProps<IUser>) => (
              <Form>
                <TextField name="email" type="email" label="Email" />
                <TextField name="username" type="text" label="Username" />
                <TextField name="first_name" type="text" label="First Name" />
                <TextField name="last_name" type="text" label="Last Name" />
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_confirmation" type="password" label="Password Confirmation" />

                <p>add image avatar upload to rails here</p>
                <input name="avatar" type="file"></input>
                {error && <Typography color="error" variant="h6">{error}</Typography>}
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

export default UserForm