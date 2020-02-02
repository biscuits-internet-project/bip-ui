import React from 'react';
import { Link } from 'react-router-dom';;

export default class Footer extends React.Component {

	render() {
		let currentYear = new Date().getFullYear();
		
		return (

			<footer className="footer" role="contentinfo">
				<span className="footer__copy">BIP v.11 :: &copy; {currentYear}</span>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</footer>

		)
	}
}