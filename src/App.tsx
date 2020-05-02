import React, { useContext, ReactElement, useEffect } from 'react'
import { Switch, Link as RouterLink, useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppContext } from './context/AppProvider'
import { darkTheme } from './lib/theme'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  IconButton,
  Typography,
  Drawer,
  AppBar,
  Hidden,
  Divider,
  Box,
} from '@material-ui/core'
import {
  Notes,
  QueueMusic,
  Home,
  Room,
  CardTravel,
  Info,
  Album,
  Radio,
} from '@material-ui/icons'
import { SnackbarProvider } from 'notistack'
import Routes from './routing/Routes'
import AvatarMenu from './components/identity/AvatarMenu'
import ScrollUpButton from 'react-scroll-up-button'
import { fetchVenues } from './stores/venues/actions'
import { fetchSongs } from './stores/songs/actions'
import { useDispatch } from 'react-redux'

interface sideMenuItem {
  name: string | undefined
  label: string
  icon: ReactElement
}
const itemList: sideMenuItem[] = [
  {
    name: '',
    label: 'Home',
    icon: <Home />,
  },
  {
    name: 'shows',
    label: 'Shows',
    icon: <QueueMusic />,
  },
  {
    name: 'songs',
    label: 'Songs',
    icon: <Album />,
  },
  {
    name: 'jam-charts',
    label: 'Jam Charts',
    icon: <Notes />,
  },
  {
    name: 'venues',
    label: 'Venues',
    icon: <Room />,
  },
  {
    name: 'tour',
    label: 'Tour Dates',
    icon: <CardTravel />,
  },
  {
    name: 'resources',
    label: 'Resources',
    icon: <Info />,
  },
  {
    name: 'resources/touchdowns-all-day',
    label: 'touchdowns all day w/ jon barber',
    icon: <Radio />,
  },
]

const drawerWidth = 190

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
      paddingTop: 8,
      minHeight: 80,
      verticalAlign: 'middle',
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
      zIndex: 1000,
    },
    content: {
      flexGrow: 1,
      [theme.breakpoints.up('xs')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
    footer: {
      marginTop: 30,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      marginBottom: 15,
    },
    navHeaderDisplay: {
      fontFamily: '"Orbitron", sans-serif',
      textTransform: 'lowercase',
      fontWeight: 'bold',
      'background-image': 'linear-gradient(#9ccaea, #e94abc)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      [theme.breakpoints.up('xs')]: {
        fontSize: `2.20rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `1.70rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2.0rem`,
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
    },
  }),
)

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

const App: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const { state, asyncActions } = useContext(AppContext)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchVenues())
    dispatch(fetchSongs())
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  useEffect(
    () => {
      !state.attendances.length &&
        state.currentUser &&
        asyncActions.getUserAttendances(state.currentUser.token)
      !state.favorites.length &&
        state.currentUser &&
        asyncActions.getFavorites(state.currentUser.token)
      !state.ratings.length &&
        state.currentUser &&
        asyncActions.getRatings(state.currentUser.token)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [history.location.pathname])

  const drawer = (
    <>
      <List>
        {itemList.map((item: sideMenuItem) => {
          return (
            <ListItemLink
              component={RouterLink}
              key={item.name}
              to={`/${item.name}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                className={classes.sidebarText}
                primary={item.label}
              />
            </ListItemLink>
          )
        })}
      </List>
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

                <Box flexGrow={1}>
                  <Box display={{ xs: 'block', sm: 'none' }}>
                    <Typography
                      variant="h5"
                      className={classes.navHeaderDisplay}
                    >
                      BIP 2.0
                    </Typography>
                  </Box>
                  <Box display={{ xs: 'none', sm: 'block' }}>
                    <Typography
                      variant="h5"
                      className={classes.navHeaderDisplay}
                    >
                      Biscuits Internet Project 2.0
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <AvatarMenu />
                </Box>
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
              <Divider style={{ marginTop: '120px' }} />
              <ScrollUpButton ShowAtPosition={500} />

              <Box className={classes.footer}>
                <Typography>
                  <span>BIP 2.0 | </span>
                  <span>
                    <Link component={RouterLink} to="/about">
                      About
                    </Link>{' '}
                    |{' '}
                  </span>
                  <span>
                    <Link component={RouterLink} to="/contact">
                      Contact
                    </Link>{' '}
                    |{' '}
                  </span>
                  <span>
                    <Link component={RouterLink} to="/privacy">
                      Privacy
                    </Link>{' '}
                    |{' '}
                  </span>
                  <span>
                    <Link href="https://twitter.com/tdbdotnet" target="blank">
                      twitter
                    </Link>{' '}
                    |{' '}
                  </span>
                  <span>
                    <Link href="https://instagram.com/tdbdotnet" target="blank">
                      instagram
                    </Link>
                  </span>
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
