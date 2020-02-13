import React, {useContext, ReactElement} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './routing/PrivateRoute'
import {AppContext} from './context/AppProvider'
import {defaultTheme} from './lib/theme'
import LatestShows from './components/LatestShows';
import Shows from './components/Shows';
import Show from './components/Show';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import Venue from './components/Venue';
import NotFound from './NotFound';
import Register from './components/Register';
import Wrap from './components/Wrap'
import Tour from './components/Tour';
import Resources from './components/Resources';
import About from './components/About';
import Contact from './components/Contact';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Admin from './components/Admin'

import {
  Root,
  Header,
  Sidebar,
  SidebarTrigger,
  SidebarTriggerIcon,
  CollapseBtn,
  CollapseIcon,
  Footer,
  Content,
  fixedLayoutPreset,
} from '@mui-treasury/layout';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { ListItem, ListItemIcon, ListItemText, List, Link, IconButton } from '@material-ui/core';
import { QueueMusic, Home, LibraryMusic, Room, AccountCircle, CardTravel, Info, Album, ChevronLeft, Menu} from '@material-ui/icons';


interface sideMenuItem {
	name: string | undefined,
	label: string,
	icon: ReactElement
}
const itemList: sideMenuItem[] = [
	{
		name: '',
		label: 'Home',
		icon: <Home/>
	},
	{
		name: 'shows',
		label: 'Shows',
		icon: <QueueMusic/>
	},
	{
		name: 'tour',
		label: 'Tour',
		icon: <CardTravel/>
	},
	{
		name: 'songs',
		label: 'Songs',
		icon: <Album/>
	},
	{
		name: 'venues',
		label: 'Venues',
		icon: <Room/>
	},
	{
		name: 'resources',
		label: 'Resources',
		icon: <Info/>
	}
]

var contentStyle = {
  padding: 30,
};

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const App:React.FC = () => {
  const {state} = useContext(AppContext)
  const {roles} = state
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <Switch>
            <PrivateRoute path="/admin/:adminPage?" component={Admin} roles={roles}/>
            <Route path="/login" component={Login}/>

            <Root config={fixedLayoutPreset}>
              {({ sidebarStyles, headerStyles }) => (
                <>
                 <Header>
                    <Toolbar>
                      <CollapseBtn
                        component={IconButton}
                        className={headerStyles.leftTrigger}
                      >
                        <CollapseIcon />
                      </CollapseBtn>
                      <SidebarTrigger className={headerStyles.leftTrigger}>
                        <SidebarTriggerIcon />
                      </SidebarTrigger>
                      <h1>Biscuits Internet Project</h1>
                    </Toolbar>
                  </Header>
                  <Sidebar>
                    <div className={sidebarStyles.container}>
                      <List>
                        {itemList.map((item: sideMenuItem)=> {
                          return (
                            <ListItemLink href={`/${item.name}`}>
                              <ListItemIcon>
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText primary={item.label} />
                            </ListItemLink>
                          )
                        })}
                      </List>
                    </div>
                    <CollapseBtn className={sidebarStyles.collapseBtn}>
                      <CollapseIcon />
                    </CollapseBtn>
                  </Sidebar>
                  <Content style={contentStyle}>
                    <Box minHeight={1000} >
                      <Route path="/" exact component={LatestShows}/>
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
                      <Route path="/register/confirm" exact component={Register}/>
                      <Route path="/password/reset/:token" exact component={ResetPassword}/>
                      {/* <PrivateRoute path="/admin" component={Admin} roles={roles}/> */}
                      <Route component={NotFound}/>
                    </Box>
                  </Content>
                  <Footer>Footer</Footer>
                </>
              )}
            </Root>
          </Switch>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App