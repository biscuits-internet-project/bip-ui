import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Helmet } from "react-helmet"
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, Grid, Avatar } from '@material-ui/core';
import { AppContext } from '../../context/AppProvider';
import { useSnackbar } from 'notistack';
import axios, { AxiosResponse } from 'axios'
import UserForm from './UserForm';
import PageHeading from '../shared/PageHeading';

export interface IUser {
  id?: string
  email?: string
  username?: string
  first_name?: string
  last_name?: string
  avatar?: string
  avatar_url?: string
  token: string
  roles: string[]
}

const Users: React.FC = () => {
  const { state } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const { enqueueSnackbar } = useSnackbar()
  const [users, setUsers] = useState<IUser[]>([])
  const { currentUser } = state

  const initUsers = useCallback(async () => {
    const fetchUsers = async () => {
      const data: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/users`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": currentUser?.token
        }
      });
      setUsers(data.data)
    }
    fetchUsers()
  }, [currentUser])

  useEffect(() => {
    initUsers()
  }, [initUsers])

  const handleOpen = (user?: IUser) => {
    if (user) setUser(user)
    setOpen(true)
  };

  const handleClose = () => {
    setUser(undefined)
    setOpen(false)
    initUsers()
  };

  const handleDelete = async (id?: string) => {
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/users/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": currentUser?.token
      }
    });
    enqueueSnackbar("Successfully deleted", { variant: 'success' })
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <>
      <Helmet>
				<title>Biscuits Internet Project - Users</title>
			</Helmet>
			<Grid container justify="space-between" >
				<Grid item>
					<PageHeading text="Users"/>
				</Grid>
				<Grid item>
          <div style={{alignContent: "right"}}>
            <Button onClick={() => handleOpen()}>Add User</Button>
          </div>
				</Grid>
			</Grid>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>
          {user === undefined ? "Add" : "Edit"} user</DialogTitle>
        <DialogContent>
          <UserForm user={user} handleClose={() => handleClose()} />
        </DialogContent>
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.avatar_url &&
                    <Avatar alt={user.username} src={user.avatar_url} />
                  }
                </TableCell>
                <TableCell>
                  {user.username}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.first_name}
                </TableCell>
                <TableCell>
                  {user.last_name}
                </TableCell>
                <TableCell align='right'>
                  <Button onClick={() => handleOpen(user)}>Edit</Button>
                  <Button onClick={() => window.confirm("Are you sure you want to delete this user?") && handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Users