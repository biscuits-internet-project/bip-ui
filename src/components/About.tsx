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
			<PageHeading text="About the Biscuits Internet Project" />

			<Typography variant="body2">
				The Biscuits Internet Project is built for fans, by fans. We’re the ones who meticulously track out every set, the ones you see with little notebooks furiously transcribing setlists at shows, and the ones who engage in lively debate over the merits of our favorite Astronaut.
			</Typography>
			<Typography variant="body2">
				When the Disco Biscuits announced that setbreak was over – we knew we had to get back to work too, building a bigger and better BIP, with even more content than before, and more searchable than ever.
			</Typography>
			<Typography variant="body2">
				Welcome to the Biscuits Internet Project 2.0.  Want to find all the shows from New York City in the year 2000 that have photos uploaded?  Just search for “2000 New York photos” (there are 3.) Wondering which shows from 1998 you could watch on Youtube? Try “1998 youtube” (They’re embedded right on the show page!)
			</Typography>
			<Typography variant="body2">
				We’ve also got an updated Resources section with information on everything from Musical Terminology to Side Projects.  Confused about what makes a song inverted vs dyslexic? Trying to settle a bet on who the 2nd guitarist was in Brain Damaged Eggmen?  We’ve got a resource for that!
			</Typography>
			<Typography variant="body2">
				So sit back, put on your favorite Biscuits show, and poke around to see what the BIP 2.0 has to offer.  This is just the beginning – come back often for updates and new features!
			</Typography>
			<div style={{ height: 20 }}></div>
			<Typography variant="body2">
				Have suggestions for features?  Find some bugs?
				<span> </span>
				<Link component={RouterLink} to="/contact">
					Drop us a line!
				</Link>
			</Typography>

			<div style={{ height: 20 }}></div>

			<Typography variant="body2">B4L!</Typography>


		</>
	)
}
export default About
