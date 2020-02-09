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
		<ul className="flex">
			<li className="mr-4">
				<Link to="/">Biscuits Internet Project</Link>
			</li>
			<li className="mr-4">
				<Link to="/shows">Shows</Link>
			</li>
			<li className="mr-4">
				<Link to="/tour">Tour</Link>
			</li>
			<li className="mr-4">
				<Link to="/songs">Songs</Link>
			</li>
			<li className="mr-4">
				<Link to="/venues">Venues</Link>
			</li>
			<li className="mr-4">
				<Link to="/resources">Resources</Link>
			</li>
			{username ? (
				<li className="mr-4" onClick={logoutUser}>
					{username} | <Link to="/logout">Logout</Link>
				</li>
			) : (
				<>
					<li className="mr-4">
						<Link to="/register">Register</Link>
					</li>
					<li className="mr-4">
						<Link to="/login">Login</Link>
					</li>
				</>
			)}
			{admin &&
				<li className="mr-4 right">
					<Link to="/admin/dashboard">Admin</Link>
				</li>
			}
		</ul>
	)
}

export default Header;