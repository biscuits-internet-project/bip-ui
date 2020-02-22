
import React, {useState, useEffect,useContext} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {AppContext} from '../../../context/AppProvider'
import { useSnackbar } from 'notistack'
import UserForm from './UserForm'
import UserList from './UserList'

export interface IUser {
    id?: string
    email?: string
    username?: string
    first_name?: string
    last_name?: string
    password?: string
    password_confirmation?: string
    avatar?: string
}

const AdminUsers = () => {
	const {state} = useContext(AppContext)
	const [open, setOpen] = useState(false)
	const [id, setId] = useState<string | null>(null)
	const { enqueueSnackbar } = useSnackbar()
    const [users, setUsers] = useState<IUser[]>([])

	useEffect(()=> {
		const fetchUsers = async () => {
            const data:AxiosResponse = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/users`,
                headers: {
                    "Content-Type":	"application/json",
                    "Authorization": state.token
                }
            });
			setUsers(data.data)
		}
		fetchUsers()
    },[state.token])

	const handleOpen = (id: string | null) => {
		if(id) setId(id)
		setOpen(true);
	};

	const handleClose = () => {
		setId(null)
		setOpen(false);
	};

	const handleDelete = async (id?: string) => {
		await axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}/users/${id}`,
			headers: {
				"Content-Type":	"application/json",
				"Authorization": state.token
			}
		});
		enqueueSnackbar("successfully deleted", { variant: 'success' })
		setUsers(users.filter(user => user.id !== id))
	}

    return (
        <>
            <Grid container spacing={3} alignItems="center">
				<Grid item  md={10}>
					<Typography variant='h4'>Users</Typography>
				</Grid>
				<Grid item md={2}>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<Button variant="contained" color="primary" onClick={() =>handleOpen(null)}>Add User</Button>
				</div>
				</Grid>
			</Grid>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card title="Song List">
                        <UserList users={users} handleOpen={(id)=>handleOpen(id || null)} handleDelete={handleDelete}/>
                    </Card>
                </Grid>

			</Grid>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{id ? "Edit User" : "Add User"}</DialogTitle>
				<DialogContent>
					<UserForm setUsers={setUsers} users={users} id={id} handleClose={handleClose}/>
				</DialogContent>
			</Dialog>
        </>
    )
}

export default AdminUsers