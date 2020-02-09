import React from 'react';
import { Link } from 'react-router-dom';;

export default class Footer extends React.Component {

	render() {
		let currentYear = new Date().getFullYear();

		return (
			<ul className="flex">
				<li className="mr-4">
					<span>Biscuits Internet Project 2.0  &copy;{currentYear}</span>
				</li>
				<li className="mr-4">
					<Link to="/about">About</Link>
				</li>
				<li className="mr-4">
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		)
	}
}