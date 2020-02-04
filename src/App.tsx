import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './routing/PrivateRoute'
import {AppContext} from './context/AppProvider'
import {defaultTheme} from './lib/theme'
import Home from './Home';
// import Shows from './components/Shows';
// import Songs from './components/Songs';
// import Song from './components/Song';
// import Venues from './components/Venues';
// import NotFound from './NotFound';
import Login from './components/Login';
//import Register from './components/Register';
import Admin from './components/Admin'
//import Wrap from './components/Wrap'

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
              <Route path="/" component={Home}/>
            </Switch>
          </ThemeProvider> 
      </Router>
    </React.Fragment>
  )
}

export default App