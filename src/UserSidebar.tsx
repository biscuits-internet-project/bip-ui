import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { AppContext } from './context/AppProvider';
import { Grid, Avatar, Typography, IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const UserSidebar: React.FC = () => {
	const { dispatch } = useContext(AppContext)
	const { state } = useContext(AppContext)
	const { currentUser } = state
	const admin = currentUser?.roles.includes("admin")
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem('token')
		dispatch({ type: "LOGOUT" })
	}

	return (
		<AppContext.Consumer>
			{({ currentUser }) => (
				<>
					{currentUser &&
						<Grid
							container
							spacing={3}
							direction="row"
							alignItems="center"
							justify="center"
							style={{ margin: 3 }}
						>

							<Grid item xs={3}>
								<Avatar src={currentUser.avatar_url} />
							</Grid>
							<Grid item>
								<Typography style={{ marginTop: 4 }}>{currentUser.username}</Typography>
							</Grid>
							<Grid item>
								<div style={{ textAlign: "right" }}>
									<IconButton
										onClick={handleOpen}
									>
										<MoreVertIcon />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<MenuItem onClick={handleClose} component={RouterLink} to="/profile">Profile</MenuItem>
										<MenuItem onClick={handleClose}>My Account</MenuItem>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
										{admin && <Divider></Divider>}
										{admin && <MenuItem onClick={handleClose} component={RouterLink} to="/admin/users">User Admin</MenuItem>}
									</Menu>
								</div>
							</Grid>
						</Grid>
					}
				</>
			)}
		</AppContext.Consumer>
	)
}

export default UserSidebar;