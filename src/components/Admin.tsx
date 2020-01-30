import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Dashboard from './admin/Dashboard'
import Navbar from './admin/Navbar'
import SideMenu from './admin/SideMenu'
import Shows from './Shows';
import AdminSongs from './admin/songs/AdminSongs';
import Song from './Song';
import Venues from './Venues';
import NotFound from '../NotFound';

const Admin: React.FC = () => {
	return (
		<>
		<Navbar/>
		<div style={{ display: 'flex' }}>
        <SideMenu />
		<div style={{ margin: '16px', width: 'calc(100vw - 300px)' }}>
			<Switch>
				<Route path="/admin/shows" exact component={Shows} />
				<Route path="/admin/songs" exact component={AdminSongs} />
				<Route path="/admin/songs/:id" component={Song} />
				<Route path="/admin/venues" exact component={Venues}/>
				<Route path="/admin" component={Dashboard}/>
				<Route component={NotFound}/>
			</Switch>
		</div>
		</div>
		</>
	)
}
export default Admin
