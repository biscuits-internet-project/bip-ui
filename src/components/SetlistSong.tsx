import React from 'react';

interface MyProps {
	song_name: string,
	segue: string,
	position: number,
	set: string,
}

class SetlistSong extends React.Component<MyProps, {}> {

	constructor(props) {
		super(props);
	}

	render() {
		return (

			<li className="setlist__song">{this.props.song_name}</li>

		)
	}
}

export default SetlistSong;