import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { AppContext } from '../../context/AppProvider';
import { Avatar, Menu, MenuItem, Divider } from '@material-ui/core';
import LinkButton from '../shared/LinkButton';

const AvatarMenu: React.FC = () => {
	const { dispatch } = useContext(AppContext)
	const { state } = useContext(AppContext)
	const { currentUser } = state
	const { avatar_url } = state
	const admin = currentUser?.roles.includes("admin")
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null)
		localStorage.removeItem('token')
		dispatch({ type: "LOGOUT" })
	}

	return (
		<>
			{currentUser ? (
				<>
					<Avatar src={avatar_url} onClick={handleOpen} style={{cursor: "pointer"}} />
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose} component={RouterLink} to="/account">Account</MenuItem>
						<MenuItem onClick={handleClose} component={RouterLink} to="/my-shows">My Shows</MenuItem>
						{/* <MenuItem onClick={handleClose} component={RouterLink} to="/my-stuff">My Stuff</MenuItem> */}
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
						{admin && <Divider></Divider>}
						{admin && <MenuItem onClick={handleClose} component={RouterLink} to="/admin/users">User Admin</MenuItem>}
					</Menu>
				</>
			) : (
				<>
					<LinkButton to="/login" text="login" />
				</>
			)
		}

		</>
	)
}

export default AvatarMenu;