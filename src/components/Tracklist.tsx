import React from 'react';
import { Link } from 'react-router-dom';

export interface ITracklist {
	tracks: ITrack[]
}

export interface ITrack {
	song_title: string
	song_slug: string
	song_id: string
	segue: string
	position: number
	set: string
	annotations: string[]
}

const Tracklist: React.FC<ITracklist> = ({tracks}) => {

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
		<div className="setlist__set-wrap">
			{Object.keys(sets).map((key) => {
				return (
					<ul className="flex" key={key}>
						<li className="flex mr-3">{key}</li>
						{sets[key].map((track: ITrack,index: number) => {
							return (
								<>
									<li className="flex mr-2" key={index}>
										<Link to={`/songs/${track.song_slug}`}>{track.song_title}</Link>
										{track.annotations.map((a, i) => {
											return <sup key={i}> {annLookup[a]} </sup>
										})}
									</li>
									<li className="flex mr-2"> {track.segue}</li>
								</>
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
	)
}

export default Tracklist