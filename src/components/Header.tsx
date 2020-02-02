import React, {useContext} from 'react';
import {AppContext} from '../context/AppProvider'

import { Link } from 'react-router-dom';

const Header:React.FC = () => {
	const {dispatch} = useContext(AppContext)
	const {state} = useContext(AppContext)
	const {username} = state
	const {roles} = state
	const admin = roles.includes('admin')
	const logoutUser = () => {
		localStorage.removeItem('token')
		dispatch({type: "LOGOUT"})
	}
	return (
		<header className="header">
			<h1><Link to="/">BIP</Link></h1>
			<nav className="nav-main">
				<ul className="nav-main__list">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/shows">Shows</Link>
					</li>
					<li>
						<Link to="/tour">Tour</Link>
					</li>
					<li>
						<Link to="/songs">Songs</Link>
					</li>
					<li>
						<Link to="/venues">Venues</Link>
					</li>
					<li>
						<Link to="/resources">Resources</Link>
					</li>
					{username ? (
						<li onClick={logoutUser}>
							{username} | <Link to="/logout">Logout</Link>
							{admin && 
							  <Link to="/admin/dashboard">Admin</Link>
							}
						</li>
					) : (
						<li>
							<Link to="/register">Register</Link> | <Link to="/login">Login</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header;