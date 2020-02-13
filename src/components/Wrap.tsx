import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

class Wrap extends React.Component {

	render() {
		return (

			<div className="page-wrap">
				<Header />
				<Sidebar />
				<div style={{ margin: '16px', width: 'calc(100vw - 300px)' }}>
					{this.props.children}
				</div>
				<Footer />
			</div>

		);
	}
}

export default Wrap;
