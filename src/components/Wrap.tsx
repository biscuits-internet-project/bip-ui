import React from 'react';

import Header from './Header';

class Wrap extends React.Component {

	render() {
		return (

			<div className="page-wrap">
				<Header />
				{this.props.children}
			</div>
				
		);
	}
}

export default Wrap;
