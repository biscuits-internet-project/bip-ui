import React from 'react';
import { Link } from 'react-router-dom';
import Tracklist, { ITrack } from './Tracklist';
import Moment from 'react-moment';
import { Typography, Paper } from '@material-ui/core';

export interface ISetlist {
	slug: string
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

var setlistStyle = {
	padding: 15,
	marginBottom: 20
  };

const Setlist: React.FC<ISetlist> = ({date,slug,venue,tracks,notes}) => {

	return (
		<Paper style={setlistStyle}>
			<section className="setlist">
				<header className="setlist__header">
					<h3 className="setlist__date">
						<Link to={`/shows/${slug}`}>
							<Moment format="MMMM D, YYYY">
								{date}
							</Moment>
						</Link>
						<span> - </span>
						<Link to={`/venues/${venue.slug}`}>
							{venue.name} - {venue.city}, {venue.state}
						</Link>
					</h3>
					<h3 className="setlist__notes">{notes}</h3>
				</header>
				<Tracklist tracks={tracks}></Tracklist>
			</section>
		</Paper>
	)
}

export default Setlist