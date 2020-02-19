import React, { useContext, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch, Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './routing/PrivateRoute'
import { AppContext } from './context/AppProvider'
import { darkTheme, lightTheme } from './lib/theme'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import LatestShows from './components/LatestShows';
import Shows from './components/Shows';
import Show from './components/Show';
import Songs from './components/songs/Songs';
import Song from './components/songs/Song';
import Venues from './components/venues/Venues';
import Venue from './components/venues/Venue';
import Register from './components/Register';
import Tour from './components/Tour';
import Resources from './components/resources/Resources';
import About from './components/About';
import Contact from './components/Contact';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Admin from './components/Admin'
import BandHistory from './components/resources/BandHistory'
import Toolbar from '@material-ui/core/Toolbar';
import { Link, ListItem, ListItemIcon, ListItemText, List, IconButton, Typography, Drawer, AppBar, Hidden, Divider, Box } from '@material-ui/core';
import { QueueMusic, Home, Room, CardTravel, Info, Album } from '@material-ui/icons';
import Profile from './components/Profile';
import HotAirBalloon from './components/resources/HotAirBalloon';
import Gear from './components/resources/Gear';
import Music from './components/resources/Music';
import ChemicalWarfareBrigade from './components/resources/ChemcialWarfareBrigade';
import SideProjects from './components/resources/SideProjects';
import { SnackbarProvider } from 'notistack';

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
    label: 'Tour Dates',
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

const drawerWidth = 190;

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
      minHeight: 80,
      backgroundImage: 'url("/bkgrnd-navbar.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'container',
      backgroundColor: '#000000',
      backgroundPosition: 'top -110px center',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 1000
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    footer: {
      marginTop: 30
    },
    toolbar: {
      ...theme.mixins.toolbar,
      marginBottom: 30,
    },
    navHeaderDisplay: {
      fontFamily: '"Orbitron", sans-serif',
      textTransform: 'lowercase',
      fontWeight: "bold",
      'background-image': 'linear-gradient(#9ccaea, #e94abc)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      [theme.breakpoints.down('sm')]: {
        fontSize: `1.60rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2.8rem`,
      },
    },
    sidebarText: {
      textTransform: 'lowercase',
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
  const admin = roles.includes('admin')
  const logoutUser = () => {
    localStorage.removeItem('token')
    dispatch({ type: "LOGOUT" })
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // choose theme based on users's OS or browser preference
  function getTheme(darkMode) {
    if (darkMode) {
      state.theme = 'dark'
      return darkTheme
    } else {
      state.theme = 'light'
      return lightTheme
    }
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() =>
    getTheme(
      prefersDarkMode
    ),
    [prefersDarkMode],
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <>
      <List>
        {itemList.map((item: sideMenuItem) => {
          return (
            <ListItemLink component={RouterLink} key={item.name} to={`/${item.name}`}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText className={classes.sidebarText} primary={item.label} />
            </ListItemLink>
          )
        })}
      </List>

      <Divider></Divider>
      <div style={{ height: 20 }}></div>
      {username &&
        <div style={{ marginLeft: 20 }}>
          {admin && <div><Link component={RouterLink} to="/admin/dashboard">Admin</Link></div>}
          <div><Link onClick={logoutUser}>Logout</Link></div>
        </div>
      }
    </>

  )

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            maxSnack={3}
          >
            <Switch>
              <PrivateRoute path="/admin/:adminPage?" component={Admin} roles={roles} />
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
                    <Typography variant="h5" className={classes.navHeaderDisplay}>
                      Biscuits Internet Project 2.0
                      </Typography>

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
                      onClick={handleDrawerToggle}
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
                  <Route path="/" exact component={LatestShows} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/resources/history" exact component={BandHistory} />
                  <Route path="/resources/gear" exact component={Gear} />
                  <Route path="/resources/music" exact component={Music} />
                  <Route path="/resources/chemical-warfare-brigade" exact component={ChemicalWarfareBrigade} />
                  <Route path="/resources/hot-air-balloon" exact component={HotAirBalloon} />
                  <Route path="/resources/side-projects" exact component={SideProjects} />
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
                  <Route path="/register" exact component={Register} />
                  <Route path="/resources" exact component={Resources} />
                  <Route path="/about" exact component={About} />
                  <Route path="/contact" exact component={Contact} />
                  <Route path="/register/confirm" exact component={Register} />
                  <Route path="/password/reset/:token" exact component={ResetPassword} />

                  <Divider style={{ marginTop: "30px" }} />

                  <Box className={classes.footer}>
                    <Typography>
                      <span>BIP 2.0 | </span>
                      <span><Link component={RouterLink} to="/about">About</Link> | </span>
                      <span><Link component={RouterLink} to="/contact">Contact</Link> </span>
                    </Typography>
                  </Box>
                </main>
              </div>
            </Switch>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App
