import React from 'react';
import {Route, Switch } from 'react-router-dom';
// import LatestSetlists from './components/LatestSetlists';
import Setlists from './components/Setlists';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import NotFound from './NotFound';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin'
import Wrap from './components/Wrap'
class Home extends React.Component {

	render() {
		return (
			<Wrap>
				<Switch>
					<Route path="/" exact component={Setlists}/>
					<Route path="/setlists" exact component={Setlists} />
					<Route path="/songs" exact component={Songs} />
					<Route path="/songs/:id" component={Song} />
					<Route path="/venues" exact component={Venues}/>
					<Route path="/login" exact component={Login}/>
					<Route path="/register" exact component={Register}/>
					{/* <PrivateRoute path="/admin" component={Admin} roles={roles}/> */}
					<Route component={NotFound}/>
				</Switch>
      		</Wrap>
		)
	}
}

export default Home;