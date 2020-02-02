import React, {useState, useEffect, useContext} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../../../context/AppProvider'
import TextField from '../../shared/TextField'
import {IUser} from './AdminUsers'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
const postUser = async (values: IUser, actions:FormikHelpers<IUser>, updateUsers: (user: IUser) => void, token: string | null, setError, setSuccess) => {
    try{
      setError(null)
      const newUser:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/users',
        data: values,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
      });
      setSuccess(true)
      updateUsers(newUser.data)
    }
    catch(error){
      const {response} = error
      //Could be as granular as we like here or could leave it generic.
      console.log(response)
      setError(response.statusText)
    }
}

const AddUser: React.FC<IAddUser> = ({updateUsers}) => {
    const {state} = useContext(AppContext)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    return (
        <div>
          {success ? (<Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postUser(values, actions, updateUsers, state.token, setError, setSuccess)}
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
          </Formik>) : (
            <div style={{width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <CheckCircleOutlineIcon color="secondary" fontSize='large'/>
              <Typography  variant="h4">Success!</Typography>
              <Typography  variant="h6">User has been successfully been created</Typography>
                <Button variant="contained" color="primary" style={{marginTop: '32px'}}onClick={()=>setSuccess(!success)}>
                    Create Another User
                </Button>
            </div>
          )}
        </div>
      );
}

  export default AddUser