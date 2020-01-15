import React from 'react';

import Wrap from './Wrap';
import Setlist from './Setlist';

export default class Setlists extends React.Component{

	render() {
		return (

			<Wrap>
				<h2>Setlists</h2>

				<Setlist />
			</Wrap>

		)
	}
}