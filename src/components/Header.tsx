import React from 'react';

import { Link } from 'react-router-dom';

class Header extends React.Component {

	render() {
		return (

			<header className="header">
				<h1>BIP</h1>
				<nav>
					<ul>
						<li>
							<Link to="/">Homepage</Link>
						</li>
						<li>
							<Link to="/shows">Shows</Link>
						</li>
					</ul>
				</nav>
			</header>

		)
	}
}

export default Header;