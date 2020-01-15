import React from 'react';

import Wrap from './Wrap';

interface MyProps {
	id: number,
}

export default class Song extends React.Component<MyProps, {}> {

	render() {

		return (

			<Wrap>
				<h1>Song</h1>
			</Wrap>

		)
	}
}