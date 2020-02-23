import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Typography, Link } from '@material-ui/core';
import PageHeading from './shared/PageHeading';

const About: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - About</title>
			</Helmet>
			<PageHeading text="About the Biscuits Internet Project"/>

			<Typography>
				Setbreak is over for the BIP as well.  Welcome to v2.0!
			</Typography>

			<div style={{height: 20}}></div>

			<Typography>
				We've rebuilt the entire site from the ground up.  Bigger, better, faster... and pretty much the same stuff as before.
				Rest assured though, we'll be working hard to add more functionality as things move along.
			</Typography>
			<div style={{height: 20}}></div>
			<Typography>
				Have suggestions for features?  Find some bugs?
				<span> </span>
				<Link component={RouterLink} to="/contact">
					Drop us a line!
				</Link>
			</Typography>

			<div style={{height: 20}}></div>

			<Typography>B4L!</Typography>


		</>
	)
}
export default About
