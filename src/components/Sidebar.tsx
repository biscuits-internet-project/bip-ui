import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';

const Sidebar:React.FC = () => {
	return (
		<Drawer
			variant="persistent"
			anchor="left"
			open={true}
		>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/shows">Shows</Link>
				</li>
				<li>
					<Link to="/tour">Tour</Link>
				</li>
				<li>
					<Link to="/songs">Songs</Link>
				</li>
				<li>
					<Link to="/venues">Venues</Link>
				</li>
				<li>
					<Link to="/resources">Resources</Link>
				</li>
			</ul>
		</Drawer>
	)
}

export default Sidebar