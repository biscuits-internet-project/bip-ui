import React from 'react';
import {Route, Switch } from 'react-router-dom';
import LatestShows from './components/LatestShows';
import Shows from './components/Shows';
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
					<Route path="/" exact component={LatestShows}/>
					<Route path="/shows" exact component={Shows} />
					<Route path="/shows/:id" exact component={Shows} />
					<Route path="/shows/year/:year" exact component={Shows} />
					<Route path="/shows/venue/:venue_id" exact component={Shows} />
					<Route path="/shows/state/:state" exact component={Shows} />
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