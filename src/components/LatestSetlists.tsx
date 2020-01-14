import React from 'react';

import Setlist from './Setlist';

class LatestSetlists extends React.Component {

	render() {
		return (
			
			<div className="setlists">
				<h2 className="setlists__title">Latest Setlists</h2>
				<div className="setlists__feed setlists__feed--latest">
					<Setlist />
				</div>
			</div>

		);
	}
}

export default LatestSetlists;