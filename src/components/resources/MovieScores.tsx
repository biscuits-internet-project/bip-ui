import React from 'react';
import { Link as RouterLink} from 'react-router-dom'
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Card, CardContent, Typography, Link } from '@material-ui/core';

const Gear: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Movie Scores</title>
			</Helmet>
			<PageHeading text="Live Movie Scores"/>

			<Card>
				<CardContent>
					<Typography variant="h3">Akira
					<span>&nbsp; - &nbsp;</span>
					<Link component={RouterLink} to="/shows/1999-12-31-theater-of-the-living-arts-philadelphia-pa">
					December 31, 1999 at Theater Of The Living Arts - Philadelphia, PA
					</Link>

					</Typography>
					<Typography>
						For the 2nd set on New Year’s Eve, 1999, The Disco Biscuits played along to Katsuhiro Otomo's anime masterpiece, Akira. Starting with just the setbreak DJ spinning, the band members slowly came out one by one onto stage dressed entirely in black robes. Behind them a on a projection screen, the movie played. This "Akira Jam" eventually falls into Basis For a Day to end the set.
					</Typography>
					<Typography>
						As for syncing up the taped set to the movie itself, this is a topic under heavy debate among Biscuits fans. There are many theories as to where you should start the tape with the movie, so it might take you some experimenting to find the best sync.  Here’s a tip from one fan:
					</Typography>
					<Typography>
						"When the 1988 dateline appears, the first note of the DJ spinning should start up. When they first take off in the motorcycles, the beat should get noticeably more intense. When the kid is headbutted by the big Clown leader, the drum machines should stop completely, leaving just the vocal sample. When the first child subject screams after seeing his guardian shot, a phone should ring right at the time the store sign blows up (right before the windows all smash). Hope that will help line it up."
					</Typography>
				</CardContent>
			</Card>
			<div style={{height: 30}}></div>

			<Card>
				<CardContent>
					<Typography variant="h3">Tron
						<span>&nbsp; - &nbsp;</span>
						<Link component={RouterLink} to="/shows/2015-12-31-playstation-theater-new-york-ny">
							December 31, 2015 at Playstation Theater - New York, NY
						</Link>
					</Typography>
					<Typography>
						For the 3rd set of their New Year’s Eve 2015 show, the Disco Biscuits again played an improvised score to a movie, this time the original Tron.  However, instead of projecting the movie behind behind them, they projected it onto a scrim that hung in front of them, covering the entire stage area, top to bottom, left to right.  The result was that you were primarily watching the movie, while seeing hints of movement and shadows from the band behind.
					</Typography>
				</CardContent>
			</Card>
			<div style={{height: 30}}></div>

			<Card>
				<CardContent>
					<Typography variant="h3">Fall 2001 Movie Jams</Typography>
					<Typography>
						In the spirit of Halloween, and on the heels of the much-ballyhooed Akira Jam, the band played a series of improvised scores during a special mini-run in the Pacific Northwest. Though the full Alice in Wonderland jam was marred by DVD playback issues (and as such, no sync is possible), each score offers its own unique session of lengthy improv. Run Lola Run featured the first segment of the film. Clips of Koyaanisqatsi were played throughout a unique opening jam that started out of DJ Mauricio's set. And the Linus and Lucy/"Great Pumpkin Jam" featured a sped-up version of the Peanuts classic.
						<ul>
							<li>Disney's Alice in Wonderland - <Link component={RouterLink} to="/shows/2001-10-31-woodmen-of-the-world-hall-eugene-or">10/31/01 Woodmen of the World Hall, Eugene, OR</Link></li>
							<li>It's The Great Pumpkin, Charlie Brown - <Link component={RouterLink} to="/shows/2001-11-01-wett-bar-vancouver-bc">11/01/01 The Wett Bar, Vancouver, BC</Link></li>
							<li>Koyaanisqatsi - <Link component={RouterLink} to="/shows/2001-11-02-crystal-ballroom-portland-or">11/02/01 Crystal Ballroom, Portland, OR</Link></li>
							<li>Run Lola Run - <Link component={RouterLink} to="/shows/2001-11-03-king-cat-theatre-seattle-wa">11/03/01 King Cat Theatre, Seattle, WA</Link></li>
						</ul>
					</Typography>
				</CardContent>
			</Card>

		</>
	)
}
export default Gear
