import React from 'react';
import { Link as RouterLink } from "react-router-dom"
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Typography, Link } from '@material-ui/core';

const Gear: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - The Perfume</title>
			</Helmet>
			<PageHeading text="The Perfume" />
			<Typography variant="body2">
				The Disco Biscuits first performed under the moniker "The Perfume"
				 on <Link component={RouterLink} to="/shows/2001-04-16-wetlands-preserve-new-york-ny">April 16, 2001</Link> at the Wetlands
				 in New York City. Having played the Roseland Ballroom two nights earlier they used this alternate
				 band name as to not break contractual obligations with the venue. The set was sandwiched between two sets of Electron.
			</Typography>
			<Typography variant="body2">
				On <Link component={RouterLink} to="/shows/2003-05-28-the-conduit-trenton-nj">May 28, 2003</Link>  at The Conduit in Trenton, NJ they again performed under this alternate band name,
				but with a new twist. All of the songs played at this show were played in alternate styles. Mindless Dribble and Sister
				Judy’s Soul Shack were played in a dub style, I-man and 7-11 (affectionately referred to as WaWa) were played in a
				techno style, Sound One was played Honkey Tonk, and more. This was also the first performance of Pilin it High in a
				breakbeat style. While many of these alternate versions were one-offs, Pilin it High(er) as it is sometimes referred to
				by fans, has stuck around and has been performed predominantly in this style since.
			</Typography>
			<Typography variant="body2">
				The next Perfume show was played at Stella Blues in Asheville, NC on <Link component={RouterLink} to="/shows/2003-10-23-stella-blue-asheville-nc">October 23, 2003</Link> . The band debuted
				more alternate versions of songs such as Aquatic Ape Primus style, Digital Buddha U2 style, Frog Legs Devo,  techno
				Aceetobee, surf punk Kitchen Mitts and bluegrass 42. The show also included rarity Soul is Shaking and the debut
				performance of Caterpillar. In addition to the debuts they brought back alternate versions of I-Man, Pilin it High,
				Sound One, and Sister Judy’s from the previous Perfume show.
			</Typography>
			<Typography variant="body2">
				The Perfume played the Conduit on <Link component={RouterLink} to="/shows/2004-05-28-the-conduit-trenton-nj">May 28, 2004</Link> but did not perform Perfume versions of songs.
			</Typography>
			<Typography variant="body2">
				The first time The Perfume would take the stage with Allen behind the kit was on <Link component={RouterLink} to="/shows/2009-07-18-indian-lookout-country-club-mariaville-ny">July 18, 2009</Link> at
				Camp Bisco in Mariaville, NY. Again the band tried something new as the performance was billed <Link component={RouterLink}
				to="/resources/tractorbeam">Tractorbeam</Link> vs. The Perfume. This day set featured Tractorbeam versions of Rock Candy and Run Like Hell, as well as Perfume debuts
				of M.E.M.P.H.I.S.>Little Lai>M.E.M.P.H.I.S. (hip-hop), Once the Fiddler Paid (calypso) and News From Nowhere (techno).
				The set also included the return of Frog Legs (Devo) and Sound One (Honkey Tonk) featuring Sam Altman on drums
			</Typography>
			<Typography variant="body2">
				The band treated fans to another Perfume set on <Link component={RouterLink} to="/shows/2014-09-27-mann-center-for-the-performing-arts-philadelphia-pa">September 27th, 2014</Link> at the Mann Center in Philadelphia,
				PA as a part of City Bisco. The set included Perfume Standards such as Dub Dribble, Frog Legs and Pilin it High as
				well as a reworked Disco version of 7-11.
			</Typography>
			<Typography variant="body2">
				The most recent Perfume performance was <Link component={RouterLink} to="/shows/2018-07-14-the-pavilion-at-montage-mountain-scranton-pa">July 14, 2018</Link> at Montage Mountain in Scranton, PA as
				Tractorbeam v. The Perfume (Spin the Wheel) played Camp Bisco.
			</Typography>
		</>
	)
}
export default Gear
