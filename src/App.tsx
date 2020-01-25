import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setlists from './components/Setlists';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/setlists" exact component={Setlists} />
          <Route path="/songs" exact component={Songs} />
          <Route path="/songs/:id" component={Song} />
          <Route path="/venues" exact component={Venues} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    
    );
  }
}

export default App;
