import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Wrap extends React.Component {

	render() {
		return (

			<div className="page-wrap">
				<Header />
				{this.props.children}
				<Footer />
			</div>

		);
	}
}

export default Wrap;
