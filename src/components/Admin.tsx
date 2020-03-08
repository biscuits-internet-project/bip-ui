import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Dashboard from './admin/Dashboard'
import Navbar from './admin/Navbar'
import SideMenu from './admin/SideMenu'
import Song from './songs/Song';
import AdminUsers from './admin/users/AdminUsers';
import NotFound from '../NotFound';

const Admin: React.FC = () => {
	return (
		<SnackbarProvider
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			maxSnack={3}
		>
			<Navbar/>
			<div style={{ display: 'flex' }}>
				<SideMenu />

				<div style={{ width: 'calc(100vw - 170px)', marginLeft: '170px', padding: '16px'}}>

					<Switch>
						<Route path="/admin/users" exact component={AdminUsers}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</div>
		</SnackbarProvider>
	)
}
export default Admin
