import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core';

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

const Tracklist: React.FC<ITracklist> = ({ tracks }) => {

	let annLookup = {}

	const orderTracks = (tracks) => {
		let sets = {};
		tracks.forEach(track => {
			if (!sets[track.set]) { sets[track.set] = []; }
			sets[track.set].push(track);

			track.annotations.forEach(ann => {
				if (!annLookup.hasOwnProperty(ann)) {
					annLookup[ann] = Object.keys(annLookup).length + 1
				}
			})
		});
		console.log(sets)
		return sets;
	}
	let sets = orderTracks(tracks)

	return (
		<div>
			{Object.keys(sets).map((key, i) => {
				return (
					<Typography>
						<div>
							<span>{key} </span>
							{sets[key].map((track: ITrack, index: number) => {
								return (
									<>
										<Link component={RouterLink} to={`/songs/${track.song_slug}`}>{track.song_title}</Link>
										{track.annotations.map((a, i) => {
											return <sup key={i}> {annLookup[a]}</sup>
										})}
										{track.segue &&
											<span> {track.segue} </span>
										}
										{track.segue === "" && sets[key].length > index + 1 &&
											<span>, </span>
										}
									</>
								)
							})}
						</div>
						<div style={{ height: 10 }}></div>
					</Typography>
				)
			})}

			{annLookup && Object.keys(annLookup).map(function (key) {
				return (
					<em><span key={key}><strong>{annLookup[key]}</strong> {key} </span></em>
				)
			})}
		</div>
	)
}

export default Tracklist