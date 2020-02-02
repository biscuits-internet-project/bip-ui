import React from 'react';
import { Helmet } from "react-helmet";

const About: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - About</title>
			</Helmet>
			<h1>Contact Us</h1>

			contact form will go here, submits to api and uses sendgrid from there
		</>
	)
}
export default About
