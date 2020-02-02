import React, {useState, useEffect, useContext} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Panel from '../../shared/Panel'
import AddUser from './AddUser'
import UserList from './UserList'
import {AppContext} from '../../../context/AppProvider'

export interface IUser {
    id: string
    email: string
    username: string
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    avatar: string
}

const AdminUsers = () => {
    const {state} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
	const [users, setUsers] = useState<IUser[]>([])
	useEffect(()=> {
		setLoading(true)
		const fetchUsers = async () => {
            const data:AxiosResponse = await axios({
                method: 'get',
                url: 'https://stg-api.discobiscuits.net/api/users',
                headers: {
                    "Content-Type":	"application/json",
                    "Authorization": state.token
                }
            });
			setUsers(data.data)
			setLoading(false)
		}
		fetchUsers()
	},[])
    return (
        <>
            <Typography variant='h4'>Users</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Panel title="Add User">
                        <AddUser updateUsers={(user: IUser)=> setUsers([user,...users])}/>
                    </Panel>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Panel title="User List">
                        <UserList users={users}/>
                    </Panel>
                </Grid>
            </Grid>   
        </> 
    )
}

export default AdminUsers