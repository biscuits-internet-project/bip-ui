import React from 'react';
import { Link } from 'react-router-dom';
import Tracklist, { ITracklist, ITrack } from './Tracklist';

export interface ISetlist {
	slug: string
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

const Setlist: React.FC<ISetlist> = ({date,slug,venue,tracks,notes}) => {

	return (
		<section className="setlist">
			<header className="setlist__header">
				<h3 className="setlist__date">
					<Link to={`/shows/${slug}`}>{date}</Link>
				</h3>
				<h3 className="setlist__location">
					<Link to={`/venues/${venue.slug}`}>
						{venue.name} {venue.city}, {venue.state}
					</Link>
				</h3>
				<h3 className="setlist__notes">{notes}</h3>
			</header>
			<Tracklist tracks={tracks}></Tracklist>
		</section>
	)
}

export default Setlist