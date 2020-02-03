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

	let annLookup = {}

	const orderTracks = (tracks) => {
		let sets = {};
		tracks.forEach(track => {
			if(!sets[track.set]) { sets[track.set] = []; }
			sets[track.set].push(track);

			track.annotations.forEach(ann => {
				if (!annLookup.hasOwnProperty(ann)) {
					annLookup[ann] = Object.keys(annLookup).length + 1
				}
			})
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
							{sets[key].map((track: ITrack,index: number) => {
								return (
									<li className="set__track" key={index}>
										<Link to={`/songs/${track.song_slug}`}>{track.song_title}</Link>
										{track.annotations.map((a, i) => {
											return <sup key={i}> {annLookup[a]} </sup>
										})}

										<span> {track.segue}</span>
									</li>
								)
							})}
						</ul>
					)
				})}

				{annLookup && Object.keys(annLookup).map(function (key) {
					return (
						<span><strong>{annLookup[key]}</strong> {key} </span>
					)
				})}
				<br/><hr/><br />
			</div>
			<div>
			</div>
		</section>
	)
}

export default Setlist