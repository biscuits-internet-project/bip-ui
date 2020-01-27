import React, {useContext} from 'react';
import {AppContext} from '../context/AppProvider'

import { Link } from 'react-router-dom';

const Header:React.FC = () => {
	const {dispatch} = useContext(AppContext)
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
						<Link to="/setlists">Setlists</Link>
					</li>
					<li>
						<Link to="/songs">Songs</Link>
					</li>
					<li>
						<Link to="/venues">Venues</Link>
					</li>
					<li>
						<Link to="/admin">Admin</Link>
					</li>
					<li onClick={logoutUser}>
						Logout
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;