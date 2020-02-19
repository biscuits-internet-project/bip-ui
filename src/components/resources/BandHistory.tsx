import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Card, CardHeader, Typography, CardContent, ListItem, List, Link } from '@material-ui/core';

const BandHistory: React.FC = () => {
	const divider = (
		<>
			<div style={{ height: 30 }}></div>
		</>
	)

	const twitter = (url) => {
		return (
			<Link href={url} target="blank">
				<img src="/twitter.png" alt="twitter" style={{ display: "inline-block", marginLeft: 10, paddingTop: 5 }}></img>
			</Link>
		)
	}

	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Band History</title>
			</Helmet>
			<PageHeading text="Band History" />

			<Card>
				<CardHeader title={"Current Members"}>
				</CardHeader>
				<CardContent>
					<List>
						<ListItem>
							Jon Gutwillig (Guitar)
								{twitter("https://twitter.com/BarberShreds")}
						</ListItem>
						<ListItem>
							Marc Brownstein (Bass)
								{twitter("https://twitter.com/Marc_Brownstein")}
						</ListItem>
						<ListItem>
							Aron Magner (Keys)
								{twitter("https://twitter.com/aronmagner")}
						</ListItem>
						<ListItem>
							Allen Aucoin (Drums)
								{twitter("https://twitter.com/DrFameus")}
						</ListItem>

					</List>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"Early Years"} />
				<CardContent>
					<Typography variant="body1">
						The four original members, Jon Gutwillig (guitar), Marc Brownstein (bass), Ben Hayflick (keys), and Sam Altman (drums) met in 1993 as students at the University of Pennsylvania in Philadelphia. Originally calling themselves by various names such as “Party Tent” and “Zex Sea,” they played at fraternities and house parties in West Philadelphia, doing mostly covers of the Grateful Dead and Phish with some early originals mixed in.  Setlists from this time would often feature segments like “Basis For a Day > Help On the Way > Slipknot > Basis For a Day” or “Antelope > Morning Dew > Antelope”
					</Typography>
					<Typography variant="body1">
						In 1995, Aron Magner replaced Hayflick on keys and the band changed their name to The Disco Biscuits.  In an interview with Spin, Marc says:
					</Typography>
					<Typography variant="body2">
						<blockquote>
							“…we were headed out to the Jersey Shore one weekend for this huge party. We were sitting in our car and one of our friends — totally out of the blue — says, ‘Hey, you guys wanna go find some Disco Biscuits?’ We were like ‘Boom! That’s the name.’ At the time I didn’t know what Disco Biscuits even meant — the dude was looking for Quaaludes. That shows how old we are because nowadays Disco Biscuits is slang for ecstasy. Part of the reason I never told that story before is because there was a time when we didn’t necessarily want to be associated with the drug reference. But that didn’t hurt the Rolling Stones, so I think we’ll be okay!”
						</blockquote>
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"1999"} />
				<CardContent>
					<Typography variant="body1">
						BGOCK
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2000 – The Disco Triscuits and The Maui Project"} />
				<CardContent>
					<Typography variant="body1">
						In January 2000 Marc announced via an Internet message board post that he had been asked to leave the band. Luckily, this hiatus was short-lived, and he rejoined the band in July of that same year.
					</Typography>
					<Typography variant="body1">
						During this 6-month period, the remaining three members (Jon, Aron, and Sammy) played several shows as a trio, referred to as The Disco Triscuits (or just “Triscuits). Each member would take turns playing the bassline – sometimes Aron on keys, other times Sammy would pick up a bass guitar while friend and local musician DJ Mauricio would take over on edrums.  During this time, they also auditioned/jammed with other bass players at shows including Carol Wade, Clay Belknap, Bill Stites, Anthony Rogers-Wright, Rob Derhak, and Jordan Crisman.  Crisman played multiple shows with the band and was widely believed to be Marc’s replacement for a time.
					</Typography>
					<Typography variant="body1">
						Meanwhile, Marc channeled his energy into writing a ton of new songs, and formed his own band, The Maui Project,
						which played one show on his birthday – <span> </span>
						<Link href="https://archive.org/details/maui2000-04-08.flac16" target="blank">4/8/2000</Link> – at the Wetlands in New York City. The Maui Project featured Marc on bass, Jamie Shields on keys, Max Delaney on guitar, Dave Hoffman on drums, Paulie Herron on percussion and DJ Stitch on the turntables. Maui Project songs are now staples of the Biscuits current repertoire, and include such fan favorites as Triumph, Home Again, Humuhumunukunukuapua'a, Grass is Green, and Kamaole Sands.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2005 – The Doctor is Out.  Enter Batman."} />
				<CardContent>
					<Typography variant="body1">
						In 2005, after more than 10 years, Sam Altman left the band to pursue his dream of becoming a doctor.  His last official shows were
						<span> </span>
						<Link component={RouterLink} to="/shows/2005-08-26-skye-top-festival-grounds-van-etten-ny">8/26/05</Link>
						<span> </span>
						 and
						<span> </span>
						<Link component={RouterLink} to="/shows/2005-08-27-skye-top-festival-grounds-van-etten-ny">8/27/05</Link>
						<span> </span>
						  at Camp Bisco IV. To find a replacement, the band held a series of auditions culminating in a two-night, sold-out “drum off” at the Borgata in Atlantic City, won by Skydog Gypsy drummer, Allen Aucoin. In December of 2005, Allen was announced as the band’s new drummer.
					</Typography>
					<Typography variant="body1">
						Allen attended Berklee College of Music in Boston, and began his musical career in education and composition, including teaching and writing for award-winning percussion ensembles.  In 1999 he formed Skydog Gypsy.
					</Typography>
					<Typography variant="body1">
						In December of 2010, Allen was hospitalized after a serious asthma attack and was unable to perform at the first 3 shows of the band’s New Year’s Eve run. In his place, Lotus drummer Mike Greenfield, Johnny Rabb from BioDiesel, Pretty Lights drummer Adam Deitch, New Deal drummer Darren Shearer, and even original drummer Sam Altman took turns sitting in.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2006-2009 Early Allen Years"} />
				<CardContent>
					<Typography variant="body1">
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2011-2019 – “Setbreak”"} />
				<CardContent>
					<Typography variant="body1">
						During the 8 years from 2011-2019, the band did not tour – instead just performing periodic series of limited engagement runs
						(4 nights in Colorado, NYE Run, Camp Bisco, etc).
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2019-Present – “Setbreak is Over”"} />
				<CardContent>
					<Typography variant="body1">
						In September of 2019 in a series of social media posts, the Disco Biscuits announced “Setbreak is over. Gas tank’s refilled. We are back.”  Shortly thereafter, they announced their 2019-2020 Winter Tour, playing 23 shows in a 2 month period, including 3-night runs in Florida and Chicago and a 4-night New Year’s Eve run at the Playstation Theater in New York City.
					</Typography>
					<Typography variant="body1">
						In January of 2020 the band announced “Act 1” – a 19-show tour starting with a 3-night run in March at the Fillmore in Philadelphia and culminating in the band’s annual Camp Bisco festival in July.
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}
export default BandHistory
