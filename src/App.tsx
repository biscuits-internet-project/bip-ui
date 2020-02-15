import React, { useContext, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './routing/PrivateRoute'
import { AppContext } from './context/AppProvider'
import { darkTheme, lightTheme } from './lib/theme'
import MenuIcon from '@material-ui/icons/Menu';
import LatestShows from './components/LatestShows';
import Shows from './components/Shows';
import Show from './components/Show';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import Venue from './components/Venue';
import NotFound from './NotFound';
import Register from './components/Register';
import Tour from './components/Tour';
import Resources from './components/Resources';
import About from './components/About';
import Contact from './components/Contact';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Admin from './components/Admin'

import Toolbar from '@material-ui/core/Toolbar';
import { ListItem, ListItemIcon, ListItemText, List, IconButton, Button, Typography, Menu, MenuItem, Drawer, AppBar, Hidden, Divider } from '@material-ui/core';
import { QueueMusic, Home, LibraryMusic, Room, AccountCircle, CardTravel, Info, Album, ChevronLeft } from '@material-ui/icons';

interface sideMenuItem {
  name: string | undefined,
  label: string,
  icon: ReactElement
}
const itemList: sideMenuItem[] = [
  {
    name: '',
    label: 'Home',
    icon: <Home />
  },
  {
    name: 'shows',
    label: 'Shows',
    icon: <QueueMusic />
  },
  {
    name: 'tour',
    label: 'Tour',
    icon: <CardTravel />
  },
  {
    name: 'songs',
    label: 'Songs',
    icon: <Album />
  },
  {
    name: 'venues',
    label: 'Venues',
    icon: <Room />
  },
  {
    name: 'resources',
    label: 'Resources',
    icon: <Info />
  }
]

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      ...theme.mixins.toolbar,
    }
  }),
);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const App: React.FC = () => {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext)
  const { state } = useContext(AppContext)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { username } = state
  const { roles } = state
  const theme = useTheme();
  const admin = roles.includes('admin')
  const logoutUser = () => {
    localStorage.removeItem('token')
    dispatch({ type: "LOGOUT" })
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <List>
      {itemList.map((item: sideMenuItem) => {
        return (
          <ListItemLink key={item.name} href={`/${item.name}`}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemLink>
        )
      })}
    </List>
  )

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={lightTheme}>
          <Switch>
            <PrivateRoute path="/admin/:adminPage?" component={Admin} roles={roles} />
            <Route path="/login" component={Login} />

            <div className={classes.root}>
              <CssBaseline />

              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h4">
                    Biscuits Internet Project
                  </Typography>

                  {username ? (
                    <>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem><Link to="/profile">Profile</Link></MenuItem>
                        {admin && <MenuItem><Link to="/admin/dashboard">Admin</Link></MenuItem>}
                        <MenuItem onClick={logoutUser}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                      <Link component="button" to="/login">Login</Link>
                    )}
                </Toolbar>
              </AppBar>
              <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                  <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <div className={classes.toolbar} /> */}
                <Route path="/" exact component={LatestShows} />
                <Route path="/shows" exact component={Shows} />
                <Route path="/shows/:id" exact component={Show} />
                <Route path="/shows/year/:year" exact component={Shows} />
                <Route path="/shows/venue/:venue_id" exact component={Shows} />
                <Route path="/shows/state/:state" exact component={Shows} />
                <Route path="/songs" exact component={Songs} />
                <Route path="/songs/:id" component={Song} />
                <Route path="/venues" exact component={Venues} />
                <Route path="/venues/:id" exact component={Venue} />
                <Route path="/tour" exact component={Tour} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/resources" exact component={Resources} />
                <Route path="/about" exact component={About} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/register/confirm" exact component={Register} />
                <Route path="/password/reset/:token" exact component={ResetPassword} />

                <Divider/>
                <Typography>
                  <span>BIP 2.0 | </span>
                  <span><Link to="/about">About</Link> | </span>
                  <span><Link to="/contact">Contact</Link> </span>
                </Typography>
              </main>
            </div>
          </Switch>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App