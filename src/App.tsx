import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute'
import {AppContext} from './context/AppProvider'
import Home from './Home';
import Setlists from './components/Setlists';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import NotFound from './NotFound';
import Login from './components/Login';
import Admin from './components/Admin'
import Wrap from './components/Wrap'

const App:React.FC = () => {
  const {state} = useContext(AppContext)
  const {roles} = state
  return (
    <Router>
      <Wrap>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/setlists" exact component={Setlists} />
          <Route path="/songs" exact component={Songs} />
          <Route path="/songs/:id" component={Song} />
          <Route path="/venues" exact component={Venues}/>
          <Route path="/login" exact component={Login}/>
          <PrivateRoute path="/admin" component={Admin} roles={roles}/>
          <Route component={NotFound}/>
        </Switch>
      </Wrap>
    </Router>
  )
}

export default App