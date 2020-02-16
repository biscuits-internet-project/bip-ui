import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Tracklist, { ITrack } from './Tracklist';
import Moment from 'react-moment';
import { Typography, Paper, Link } from '@material-ui/core';

export interface ISetlist {
	slug: string
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

var setlistStyle = {
	padding: 10,
	marginBottom: 20
};

const Setlist: React.FC<ISetlist> = ({date,slug,venue,tracks,notes}) => {

	return (
		<Paper elevation={3} style={setlistStyle}>
			<Typography>
				<Link component={RouterLink} to={`/shows/${slug}`}>
					<Moment format="MMMM D, YYYY">
						{date}
					</Moment>
				</Link>
				<span> - </span>
				<Link component={RouterLink} to={`/venues/${venue.slug}`}>
					{venue.name} - {venue.city}, {venue.state}
				</Link>
			</Typography>
			<Typography variant="body2" dangerouslySetInnerHTML={{__html: notes}} />
			<Tracklist tracks={tracks}></Tracklist>
		</Paper>
	)
}

export default Setlist