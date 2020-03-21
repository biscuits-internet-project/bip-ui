import React, { useContext, ReactElement, useEffect } from 'react';
import {Switch, Link as RouterLink, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContext } from './context/AppProvider'
import { darkTheme } from './lib/theme'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, ListItem, ListItemIcon, ListItemText, List, IconButton, Typography, Drawer, AppBar, Hidden, Divider, Box } from '@material-ui/core';
import { QueueMusic, Home, Room, CardTravel, Info, Album } from '@material-ui/icons';
import { SnackbarProvider } from 'notistack';
import Routes from './routing/Routes';
import UserSidebar from './UserSidebar';

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
      marginBottom: 15,
    },
    navHeaderDisplay: {
      fontFamily: '"Orbitron", sans-serif',
      textTransform: 'lowercase',
      fontWeight: "bold",
      'background-image': 'linear-gradient(#9ccaea, #e94abc)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      [theme.breakpoints.down('sm')]: {
        fontSize: `1.80rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2.20rem`,
      },
      [theme.breakpoints.up('lg')]: {
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
  const history = useHistory()
  const classes = useStyles();
  const {state, asyncActions} = useContext(AppContext)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(
		()=> {
		  !state.venues.length && asyncActions.getVenues()
      !state.songs.length && asyncActions.getSongs()
      !state.attendances.length && state.currentUser && asyncActions.getUserAttendances(state.currentUser.token)
      !state.favorites.length && state.currentUser && asyncActions.getFavorites(state.currentUser.token)
      !state.ratings.length && state.currentUser && asyncActions.getRatings(state.currentUser.token)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		,[]
	)
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[history.location.pathname])

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

      <UserSidebar />
    </>
  )

  return (
    <React.Fragment>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            maxSnack={3}
          >
            <CssBaseline />
              <div className={classes.root}>
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
                      anchor="left"
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
                  <Switch>
                    <Routes />
                  </Switch>
                  <Divider style={{ marginTop: "30px" }} />

                  <Box className={classes.footer}>
                    <Typography>
                      <span>BIP 2.0 | </span>
                      <span><Link component={RouterLink} to="/about">About</Link> | </span>
                      <span><Link component={RouterLink} to="/contact">Contact</Link> | </span>
                      <span><Link component={RouterLink} to="/privacy">Privacy</Link> | </span>
                      <span><Link href="https://twitter.com/tdbdotnet" target="blank">twitter</Link> | </span>
                      <span><Link href="https://instagram.com/tdbdotnet" target="blank">instagram</Link></span>
                    </Typography>
                  </Box>
                </main>
              </div>
          </SnackbarProvider>
        </ThemeProvider>
    </React.Fragment>
  )
}

export default App
