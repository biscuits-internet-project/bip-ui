import React from 'react';
import { Route } from 'react-router';
import { Switch } from '@material-ui/core'


export default (
    <Switch>

			<Route path="/resources/history" />
			<Route path="/resources/music" />
			<Route path="/resources/chemical-warfare-brigade"/>
			<Route path="/resources/hot-air-balloon"/>
			<Route path="/resources/side-projects" />
			<Route path="/resources/movie-scores" />
			<Route path="/resources/the-perfume" />
			<Route path="/resources/tractorbeam" />
			<Route path="/resources/media" />
			<Route path="/resources/touchdowns-all-day" />
			<Route path="/shows" />
			<Route path="/shows/:id" />
			<Route path="/shows/year/:year" />
			<Route path="/shows/venue/:venue_id" />
			<Route path="/shows/state/:state" />
			<Route path="/songs" />
			<Route path="/songs/:id" />
			<Route path="/jam-charts" />
			<Route path="/venues" />
			<Route path="/venues/:id" />
			<Route path="/tour" />
			<Route path="/resources" />
			<Route path="/about" />

    </Switch>
);