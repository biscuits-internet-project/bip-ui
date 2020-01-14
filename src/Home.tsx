import React from 'react';

import Wrap from './components/Wrap';
import LatestSetlists from './components/LatestSetlists';

class Home extends React.Component {

	render() {
		return (

			<Wrap>
				<LatestSetlists />
			</Wrap>

		)
	}
}

export default Home;