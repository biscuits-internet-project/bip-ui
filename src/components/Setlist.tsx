import React from 'react';
import { Link } from 'react-router-dom';

export interface ISetlist {
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

interface ITrack {
	song_title: string
	song_slug: string
	song_id: string
	segue: string
	position: number
	set: string
	annotations: string[]
}

const Setlist: React.FC<ISetlist> = ({date,venue,tracks,notes}) => {

	const orderTracks = (tracks) => {
		let sets = {};
		tracks.forEach(track => {
			if(!sets[track.set]) { sets[track.set] = []; }
			sets[track.set].push(track);
		});
		return sets;
	}
	let sets = orderTracks(tracks)
		
	return (
		<section className="setlist">
			<header className="setlist__header">
				<h3 className="setlist__date">{date}</h3>
				<h3 className="setlist__location">{venue.name}, {venue.city}, {venue.state}</h3>
				<h3 className="setlist__notes">{notes}</h3>
			</header>
			<div className="setlist__set-wrap">
				{Object.keys(sets).map((key) => {
					return (
						<ul className="set" key={key}>
							<li className="set__label">{key}</li>
							{sets[key].map((track) => {
								return (
									<li className="set__track">
										<Link to={`/songs/${track.song_slug}`}>{track.song_title}</Link> {track.segue}
									</li>
								)
							})}
						</ul>
					)
				})}
			</div>
		</section>
	)
}

export default Setlist