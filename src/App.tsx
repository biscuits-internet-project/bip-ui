import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const App:React.FC = () => {
  const {state} = useContext(AppContext)
  const {roles} = state
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
      <Router>
          <ThemeProvider theme={defaultTheme}>
            <Switch>
              <PrivateRoute path="/admin/:adminPage?" component={Admin} roles={roles}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </ThemeProvider>
          <Wrap>
            <Switch>
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
            </Switch>
      		</Wrap>
      </Router>
    </React.Fragment>
  )
}

export default App