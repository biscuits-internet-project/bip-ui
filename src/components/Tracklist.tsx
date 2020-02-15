import React from 'react';
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

var setsStyle = {
	display: "flex",
	listStyle: "none",
	margin: 0,
	padding: 0,
};

var setStyle = {
	marginBottom: 5,
	marginRight: 15
};


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
		console.log(sets)
		return sets;
	}
	let sets = orderTracks(tracks)

	return (
		<div>
			{Object.keys(sets).map((key) => {
				return (
					<Typography>
						<div>
						<span>{key} </span>
						{sets[key].map((track: ITrack, index: number) => {
							return (
								<>
									<Link href={`/songs/${track.song_slug}`}>{track.song_title}</Link>
									{track.annotations.map((a, i) => {
										return <sup key={i}> {annLookup[a]} </sup>
									})}
								<span> {track.segue} </span>
								</>
							)
						})}
					</div>
					</Typography>
				)
			})}

			{annLookup && Object.keys(annLookup).map(function (key) {
				return (
					<span key={key}><strong>{annLookup[key]}</strong> {key} </span>
				)
			})}
		</div>
	)
}

export default Tracklist