import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Dashboard from './admin/Dashboard'
import Navbar from './admin/Navbar'
import SideMenu from './admin/SideMenu'
import Song from './songs/Song';
import AdminUsers from './admin/users/AdminUsers';
import AdminShows from './admin/shows/AdminShows';
import AdminTracks from './admin/tracks/AdminTracks';
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
						<Route path="/admin/shows" exact component={AdminShows} />
						<Route path="/admin/songs/:id/tracks" component={AdminTracks} />
						<Route path="/admin/songs/:id" component={Song} />
						<Route path="/admin/users" exact component={AdminUsers}/>
						<Route path="/admin" component={Dashboard}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</div>
		</SnackbarProvider>
	)
}
export default Admin
