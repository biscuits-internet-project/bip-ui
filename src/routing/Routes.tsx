import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LatestShows from '../components/shows/LatestShows'
import Shows from '../components/shows/Shows'
import Show from '../components/shows/Show'
import Songs from '../components/songs/Songs'
import Song from '../components/songs/Song'
import Venues from '../components/venues/Venues'
import Venue from '../components/venues/Venue'
import Register from '../components/identity/Register'
import Tour from '../components/Tour'
import Resources from '../components/resources/Resources'
import About from '../components/About'
import Contact from '../components/Contact'
import ResetPassword from '../components/identity/ResetPassword'
import Login from '../components/identity/Login'
import BandHistory from '../components/resources/BandHistory'
import MovieScores from '../components/resources/MovieScores'
import Tractorbeam from '../components/resources/Tractorbeam'
import Media from '../components/resources/Media'
import Touchdowns from '../components/resources/Touchdowns'
import Perfume from '../components/resources/Perfume'
import Account from '../components/identity/Account'
import Privacy from '../components/Privacy'
import HotAirBalloon from '../components/resources/HotAirBalloon'
import Gear from '../components/resources/Gear'
import Music from '../components/resources/Music'
import ChemicalWarfareBrigade from '../components/resources/ChemcialWarfareBrigade'
import SideProjects from '../components/resources/SideProjects'
import AddShow from '../components/shows/AddShow'
import EditShow from '../components/shows/EditShow'
import Users from '../components/users/Users'
import JamCharts from '../components/songs/JamCharts'

const Routes: React.FC = () => {
	return (
		<React.Fragment>
			<PrivateRoute path="/admin/shows/create" exact component={AddShow} adminOnly />
			<PrivateRoute path="/admin/shows/edit/:id" exact component={EditShow} adminOnly />
			<PrivateRoute path="/admin/users" exact component={Users} adminOnly />
			<PrivateRoute path="/account" exact component={Account} />

			<Route path="/" exact component={LatestShows} />
			<Route path="/login" component={Login} />
			<Route path="/privacy" component={Privacy} />
			<Route path="/resources/history" exact component={BandHistory} />
			<Route path="/resources/gear" exact component={Gear} />
			<Route path="/resources/music" exact component={Music} />
			<Route path="/resources/chemical-warfare-brigade" exact component={ChemicalWarfareBrigade} />
			<Route path="/resources/hot-air-balloon" exact component={HotAirBalloon} />
			<Route path="/resources/side-projects" exact component={SideProjects} />
			<Route path="/resources/movie-scores" exact component={MovieScores} />
			<Route path="/resources/the-perfume" exact component={Perfume} />
			<Route path="/resources/tractorbeam" exact component={Tractorbeam} />
			<Route path="/resources/media" exact component={Media} />
			<Route path="/resources/touchdowns-all-day" exact component={Touchdowns} />
			<Route path="/shows" exact component={Shows} />
			<Route path="/shows/add" exact component={AddShow} />
			<Route path="/shows/:id" exact component={Show} />
			<Route path="/shows/year/:year" exact component={Shows} />
			<Route path="/shows/venue/:venue_id" exact component={Shows} />
			<Route path="/shows/state/:state" exact component={Shows} />
			<Route path="/songs" exact component={Songs} />
			<Route path="/songs/:id" component={Song} />
			<Route path="/jam-charts" component={JamCharts} />
			<Route path="/venues" exact component={Venues} />
			<Route path="/venues/:id" exact component={Venue} />
			<Route path="/tour" exact component={Tour} />
			<Route path="/register" exact component={Register} />
			<Route path="/resources" exact component={Resources} />
			<Route path="/about" exact component={About} />
			<Route path="/contact" exact component={Contact} />
			<Route path="/register/confirm" exact component={Register} />
			<Route path="/password/reset/:token" exact component={ResetPassword} />
		</React.Fragment>
	)
}

export default Routes