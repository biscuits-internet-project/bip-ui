import React from 'react';

import SetlistSong from './SetlistSong';

interface TrackObj { song_name: string, segue: string, position: number, set: string, annotations: string[] }
interface MyState {
	date: string,
	venue: { name: string, city: string, state: string },
	tracks: TrackObj[],
}

class Setlist extends React.Component<{}, MyState> {

	constructor(props) {
		super(props);
	
	  this.state = {
	  	date: "January 4, 2020",
	  	venue: {
	  		name: "Riviera Theater",
	  		city: "Chicago",
	  		state: "IL",
	  	},
	  	tracks: [
	  		{
	  			song_name: "7-11",
	  			segue: ">",
	  			position: 1,
	  			set: "S1",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Rivers",
	  			segue: ">",
	  			position: 2,
	  			set: "S1",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Little Betty Boop",
	  			segue: ">",
	  			position: 3,
	  			set: "S1",
	  			annotations: [ "middle/beginning" ],
	  		},
	  		{
	  			song_name: "7-11",
	  			segue: ">",
	  			position: 4,
	  			set: "S1",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Miracles",
	  			segue: ">",
	  			position: 5,
	  			set: "S1",
	  			annotations: [ "unfinished" ],
	  		},
	  		{
	  			song_name: "Confrontation",
	  			segue: ">",
	  			position: 6,
	  			set: "S1",
	  			annotations: [ "middle/beginning" ],
	  		},
	  		{
	  			song_name: "42",
	  			segue: "",
	  			position: 7,
	  			set: "S1",
	  			annotations: [ "end only" ],
	  		},
	  		{
	  			song_name: "Vassillios",
	  			segue: ">",
	  			position: 1,
	  			set: "S2",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Anthem",
	  			segue: ">",
	  			position: 2,
	  			set: "S2",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Above the Waves",
	  			segue: ">",
	  			position: 3,
	  			set: "S2",
	  			annotations: [ "middle only" ],
	  		},
	  		{
	  			song_name: "Tractorbeam Jam",
	  			segue: ">",
	  			position: 4,
	  			set: "S2",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "The Great Abyss",
	  			segue: ">",
	  			position: 5,
	  			set: "S2",
	  			annotations: [ "middle/beginning" ],
	  		},
	  		{
	  			song_name: "4th of July",
	  			segue: ">",
	  			position: 6,
	  			set: "S2",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Above the Waves",
	  			segue: ">",
	  			position: 7,
	  			set: "S2",
	  			annotations: [ "inverted" ],
	  		},
	  		{
	  			song_name: "Sabre Dance",
	  			segue: "",
	  			position: 8,
	  			set: "S2",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Story of the World",
	  			segue: ">",
	  			position: 1,
	  			set: "E",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Station",
	  			segue: ">",
	  			position: 2,
	  			set: "E",
	  			annotations: [],
	  		},
	  		{
	  			song_name: "Story of the World",
	  			segue: "",
	  			position: 3,
	  			set: "E",
	  			annotations: [],
	  		},
	  	]
	  };
	}

	componentDidMount() {
		this.orderTracks(this.state.tracks);
	}

	orderTracks = (tracks) => {
		let sets = {};
		tracks.forEach(function(track) {
			if(!sets[track.set]) { sets[track.set] = []; }
			sets[track.set].push(track);
		});
		return sets;
	}

	render() {
		let { date, venue, tracks } = this.state,
				setlist = this.orderTracks(tracks);

		return (

			<section className="setlist">
				<header className="setlist__header">
					<h3 className="setlist__date">{date}</h3>
					<h3 className="setlist__location">{venue.name}, {venue.city}, {venue.state}</h3>
				</header>
				<div className="setlist__set">
					{Object.keys(setlist).map((key) => {
						return (

							<div key={key}>
								<strong className="setlist__label">{key}</strong>
								<ul className="set">
									{setlist[key].map((track, i) => {
										return (

											<li className="set__track">{track.song_name} {track.segue}</li>

										)
									})}
								</ul>
							</div>

						)
					})}
				</div>
			</section>

		)
	}
}

export default Setlist;