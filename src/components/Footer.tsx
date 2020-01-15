import React from 'react';

export default class Footer extends React.Component {

	render() {
		let currentYear = new Date().getFullYear();
		
		return (

			<footer className="footer" role="contentinfo">
				<span className="footer__copy">BIP v.11 :: &copy; {currentYear}</span>
			</footer>

		)
	}
}