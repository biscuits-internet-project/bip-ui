import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { AppContext } from '../../context/AppProvider'
import TextField from '../shared/TextFieldContainer'
import Button from '@material-ui/core/Button'
import Uploader from '../shared/Uploader'
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { IUser } from './Users'

interface Props {
  user?: IUser
  handleClose: () => void
}

const initialValues: IUser = {
  id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  avatar: "",
  avatar_url: "",
  token: "",
  roles: []
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
});

const UserForm: React.FC<Props> = ({ user, handleClose }) => {
  const { state, asyncActions } = useContext(AppContext)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(initialValues)
  const { enqueueSnackbar } = useSnackbar()
  const { currentUser } = state

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const postUser = useCallback(async (values: IUser, actions: FormikHelpers<IUser>) => {
    try {
      setError(null)
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]))
      await axios({
        method: user ? 'put' : 'post',
        url: `${process.env.REACT_APP_API_URL}/users/${user ? user.id : ''}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": currentUser?.token
        }
      });

      if (user) {
        enqueueSnackbar(`Successfully edited account`, { variant: 'success' })
        if (currentUser && user.id === currentUser.id) {
          asyncActions.getUser(currentUser.token, currentUser.id)
        }
      } else {
        enqueueSnackbar(`Successfully added user`, { variant: 'success' })
      }
      handleClose()
    } catch (error) {
      const { response } = error
      const { data } = response
      if (typeof data === 'object') {
        Object.keys(data).forEach(key => actions.setFieldError(key, data[key]))
      }
      else {
        setError(response.statusText)
      }
    }
  }, [user, currentUser, handleClose, enqueueSnackbar, asyncActions])

  return (
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
          <Uploader {...props} label="Avatar" name="avatar" multiple={false} />
          {error && <Typography color="error" variant="h6">{error}</Typography>}
          <div style={{ height: 20 }}></div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <div style={{ height: 20 }}></div>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm