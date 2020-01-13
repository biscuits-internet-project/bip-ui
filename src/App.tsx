import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Shows from './components/Shows';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shows" exact component={Shows} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    
    );
  }
}

export default App;
