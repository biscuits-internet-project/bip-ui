import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Card, CardHeader, CardContent, Typography, List, ListItem, Link } from '@material-ui/core';

const Music: React.FC = () => {
	const divider = (
		<>
			<div style={{ height: 30 }}></div>
		</>
	)
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Resources - Music</title>
			</Helmet>
			<PageHeading text="Music" />

			<Card>
				<CardHeader title={"Inverted"} />
				<CardContent>
					<Typography variant="body1">
						Consider that a basic Disco Biscuits song (Song A) has three parts: A beginning composed section, followed by a jam, followed by a composed ending section.</Typography>
					<Typography variant="body1">An inverted version of a song will almost always happen when they jam out of a different song (Song B), and segue the jam into the ending section of Song A. At the exact point of the ending of Song A, they immediately play the beginning of Song A, then the jam section, which usually segues into a different song (Song C), or the song that proceeded the inverted song (Song B).</Typography>

					<Typography variant="h6">Examples:</Typography>
					<Typography variant="body1">Standard Version of a song:</Typography>
					<Typography variant="body1">
						Song A (Beg.) -> Jam ->Song A (End)
				    </Typography>
					<Typography variant="body1">Inverted Version:</Typography>
					<Typography variant="body1">Song B -> Jam -> Song A (End) -> Song A (Beg.) -> Jam -> Song C</Typography>

					<Typography variant="h6">Shows:</Typography>
					<Typography>
						<Link component={RouterLink} to="/shows/2003-08-31-cervantes-masterpiece-ballroom-denver-co">8/31/03</Link>: Magellan > Inverted Once the Fiddler Paid > Magellan<br/>
						<Link component={RouterLink} to="//shows/2006-05-28-electric-factory-philadelphia-pa">5/28/06</Link>: Story of the World > Inverted Digital Buddha > Story of the World
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"Dyslexic"} />
				<CardContent>
					<Typography variant="body1">
						Refer back to the Inverted example above, except the beginning of Song A does not immediately follow the ending.</Typography>
					<Typography variant="body1">
						Basically, a song is considered dyslexic if it is broken up, similar to an inverted version, but the song structure is played out of order or not immediately following each other. The band might play the end of a song in the first set, then start off the second set with the beginning. This would be considered a dyslexic version of the song. Dyslexic and Inverted are mutually exclusive.  A song can be one or the other, but not both.
				</Typography>

					<Typography variant="h6">Examples:</Typography>
					<Typography variant="body1">Song A -> Jam -> Song B (End), Song C, Song B (Beg.) -> Song D</Typography>

					<Typography variant="h6">Shows:</Typography>
					<Typography variant="body1">
						<Link component={RouterLink} to="//shows/2006-05-28-electric-factory-philadelphia-pa">1/4/07</Link>: Above the Waves > Dyslexic Svenghali (End) > Paul Revere > Dyslexic Svenghali (Beg.) > Confrontation
					</Typography>
				</CardContent>
			</Card>

			{divider}
			<Card>
				<CardHeader title={"Palindrom"} />
				<CardContent>
					<Typography variant="body1">
						A Palindrome is exactly what you think it is – a set or portion of a set 3 songs or longer that reads the same forwards as it does backwards.
					</Typography>

					<Typography>Shows:</Typography>

					<Typography variant="body1">
						<Link component={RouterLink} to="/shows/1999-05-01-wetlands-preserve-new-york-ny">5/1/99</Link>: Overture > Basis for a Day > Vassillios > Basis for a Day > Overture<br/>
						<Link component={RouterLink} to="/shows/2001-09-08-webster-theater-hartford-ct">9/8/01</Link>: Reactor > Crickets > Story of the World > Overture > Story of the World > Crickets > Reactor
					</Typography>

				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"Fakeout"} />
				<CardContent>
					<Typography variant="body1">
						A song fakeout is when the band builds up the end of a jam exactly like they would for a given song, then instead of playing
						 the actual song, they stop and start playing a different song all at once. For example, o <span> </span>
						 <Link component={RouterLink} to="/shows/1999-10-02-cafe-tomo-arcata-ca">10/02/1999</Link>, there is a Basis For a Day fakeout,
						 with a fast techno jam in the same key as Basis like it was usually played in '99, then the band dropped into Above the Waves at the last second.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"Alternative Genre Versions of Songs"} />
				<CardContent>
					<Typography variant="body1">
						Occasionally the band will experiment by putting a significantly different musical spin on a composed song –
						essentially taking what they’ve written and reimagining it in a completely different genre.  It’s very common to see
						 “Dub Dribble” or “Techno I-Man” on a setlist.
					</Typography>
					<Typography variant="h6">
						Dub [Song name]
					</Typography>
					<Typography variant="body1">
						A "dub" or "reggae" version of a song is a slowed down version, often complemented by a "juicier" bassline and calypso sounds a la
						 reggae. It's simply altering the tune/tempo to give the composed section of the song a different feel.
						Most common are “Dublights” (from Floodlights, as in
							<span> </span>
						<Link component={RouterLink} to="/shows/2001-04-28-howlin-wolf-new-orleans-la">4/28/01</Link>) and “Dub Dribble” (from Mindless Dribble, as in
							<span> </span><Link component={RouterLink} to="/shows/2001-05-08-crystal-ballroom-portland-or">5/8/01</Link>,
							<span> </span><Link component={RouterLink} to="/shows/2003-05-28-the-conduit-trenton-nj">5/28/03</Link>, etc.)
					</Typography>
					<Typography variant="h6">
						Techno [Song Name]
					</Typography>
					<Typography variant="body1">
						A "techno" version of a song involves dropping a song's usual drumwork for a four-on-the-floor house beat complemented by
						 heavy hi-hat work. Additionally, the bassline is often more thumping, following very crisply a more emphatic techno beat.
						  While electronic music purists may cringe at the misuse of the term "techno" to describe what is essentially a "house"
						   version of a song, they'll just have to deal with the nomenclature.
					</Typography>
					<Typography>
						The most common techno versions are I-Man and Pilin' It High, and they've been played so frequently now that often people
						 forget there used to be another style.
					</Typography>
					<Typography variant="body1">
						Techno I-Man has varied over the years as their style of playing has progressed. Some of the more well-known versions of the
						 song are
						 <span> </span>
						 <Link component={RouterLink} to="/shows/1999-03-14-quixote-s-true-blue-aurora-co">3/14/99</Link>,<span> </span>
						 <Link component={RouterLink} to="/shows/1999-12-04-irving-plaza-new-york-ny">12/4/99</Link><span> </span>,
						 <Link component={RouterLink} to="/shows/2000-10-27-bluebird-bloomington-in">12/29/02</Link>, and<span> </span>
						 <Link component={RouterLink} to="/shows/2003-05-28-the-conduit-trenton-nj">5/28/03</Link>. For a comparison to a non-techno version,<span> </span>
						 <Link component={RouterLink} to="/shows/1999-05-06-chameleon-club-atlanta-ga">5/6/99</Link> is a perfect example (and you can hear the
						  roots of King of the World taboot). Most of the versions from <Link component={RouterLink} to="/shows?year=2003">2003</Link> and <span> </span>
						  <Link component={RouterLink} to="/shows?year=2004">2004</Link> are techno versions and are often not noted as such on the setlists because it had become so commonplace.
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}
export default Music
