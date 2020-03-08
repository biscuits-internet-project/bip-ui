import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

export interface ITracklist {
	tracks: ITrack[]
}

export interface ITrack {
	id: string
	slug: string
	note: "",
	all_timer: false,
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
		return sets;
	}
	let sets = orderTracks(tracks)

	return (
		<div>
			{Object.keys(sets).map((key, i) => {
				return (
					<Typography key={uuidv4()}>
						<span style={{paddingRight: 6}}>{key} </span>
						{sets[key].map((track: ITrack, index: number) => {
							return (
								<span key={uuidv4()}>
									<Link component={RouterLink} to={`/songs/${track.song_slug}`}>{track.song_title}</Link>
									{track.annotations.map((a, i) => {
										return <sup key={i}> {annLookup[a]}</sup>
									})}
									{track.segue &&
										<span style={{paddingRight: 4, paddingLeft: 4}}> {track.segue} </span>
									}
									{track.segue === "" && sets[key].length > index + 1 &&
										<span style={{paddingRight: 8}}>, </span>
									}
								</span>
							)
						})}
					</Typography>
				)
			})}

			{annLookup && Object.keys(annLookup).map(function (key) {
				return (
					<em key={key}><span key={key}><strong>{annLookup[key]}</strong> {key} </span></em>
				)
			})}
		</div>
	)
}

export default Tracklist