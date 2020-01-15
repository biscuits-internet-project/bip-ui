import React from 'react';

import { Link } from 'react-router-dom';

class Header extends React.Component {

	render() {
		return (

			<header className="header">
				<h1><Link to="/">BIP</Link></h1>
				<nav className="nav-main">
					<ul className="nav-main__list">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/setlists">Setlists</Link>
						</li>
						<li>
							<Link to="/songs">Songs</Link>
						</li>
					</ul>
				</nav>
			</header>

		)
	}
}

export default Header;