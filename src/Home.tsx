import React from 'react';
import {Route, Switch } from 'react-router-dom';
import LatestShows from './components/LatestShows';
import Shows from './components/Shows';
import Songs from './components/Songs';
import Song from './components/Song';
import Venues from './components/Venues';
import Venue from './components/Venue';
import NotFound from './NotFound';
import Login from './components/Login';
import Register from './components/Register';
import Wrap from './components/Wrap'
import Tour from './components/Tour';
import Resources from './components/Resources';
import About from './components/About';
import Contact from './components/Contact';
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
					<Route path="/venues" exact component={Venues} />
					<Route path="/venues/:id" exact component={Venue} />
					<Route path="/tour" exact component={Tour} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/resources" exact component={Resources} />
					<Route path="/about" exact component={About} />
					<Route path="/contact" exact component={Contact} />
					<Route path="/register/confirm" exact component={Register}/>
					{/* <PrivateRoute path="/admin" component={Admin} roles={roles}/> */}
					<Route component={NotFound}/>
				</Switch>
      		</Wrap>
		)
	}
}

export default Home;