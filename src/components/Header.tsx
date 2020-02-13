import React, {useContext} from 'react';
import {AppContext} from '../context/AppProvider'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header:React.FC = () => {
	const classes = useStyles();
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
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>
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
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header;