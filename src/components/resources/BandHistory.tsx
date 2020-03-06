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
				<title>Biscuits Internet Project - The Band</title>
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
						The four original members, Jon Gutwillig (guitar), Marc Brownstein (bass), Ben Hayflick (keys), and Sam Altman (drums) met in the early 90's as students at the University of Pennsylvania in Philadelphia. Originally calling themselves by various names such as "Party Tent" and "Zex Sea", they played at fraternities and house parties in West Philadelphia, doing mostly covers of the Grateful Dead and Phish with some early originals mixed in.  Setlists from this time would often feature segments like "Basis For a Day > Help On the Way > Slipknot > Basis For a Day" or "Antelope > Morning Dew > Antelope"
					</Typography>
					<Typography variant="body1">
						In 1995, Aron Magner replaced Hayflick on keys and the band changed their name to The Disco Biscuits.  In an interview with Spin, Marc says:
					</Typography>
					<Typography variant="body2">
						<blockquote>
							"...we were headed out to the Jersey Shore one weekend for this huge party. We were sitting in our car and one of our friends... totally out of the blue... says, 'Hey, you guys wanna go find some Disco Biscuits?' We were like 'Boom! That's the name.' At the time I didn't know what Disco Biscuits even meant... the dude was looking for Quaaludes. That shows how old we are because nowadays Disco Biscuits is slang for ecstasy. Part of the reason I never told that story before is because there was a time when we didn't necessarily want to be associated with the drug reference. But that didn't hurt the Rolling Stones, so I think we'll be okay!"
						</blockquote>
					</Typography>
					<Typography variant="body1">
						<Link component={RouterLink} to="/shows/year/1995">1995</Link> into <Link component={RouterLink} to="/shows/year/1996">1996</Link> saw them move away from house parties and into the Philadelphia bar/club scene with shows at Sam Adam's Brewhouse, The Middle East, J.C. Dobb's, and the Blarney Stone, among others.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"1997 - 1999"} />
				<CardContent>
					<Typography variant="body1">
						The first heavily circulated show of the Disco Biscuits career was played on <Link component={RouterLink} to="/shows/1997-01-30-wetlands-preserve-new-york-ny">1/30/97</Link> at the Wetlands Preserve, in New York, featuring a masterful, segue-laden setlist. On <Link component={RouterLink} to="/shows/1997-02-13-r-t-s-oaklyn-nj">2/13/97</Link>, the band played Peaches en Regalia for the final time, marking the beginning of a new era focused on originals and leaving their Phish aping styles in the past. The move away from Phish's shadow was solidified with a performance on <Link component={RouterLink} to="/shows/1997-10-31-phi-sigma-kappa-university-of-pennsylvania-philadelphia-pa">10/31/97</Link> in which Magner incorporated the JP8000 synthesizer for the first time. The show, featuring an extremely jammed out Run Like Hell, marked the beginning of the "Trance-Fusion Era."
					</Typography>
					<Typography variant="body1">
						<Link component={RouterLink} to="/shows/year/1998">1998</Link> saw an explosion in the band's scope and popularity. Prior to that year they had played exclusively in the Northeast and Mid-Atlantic regions, but beginning in the summer of 98, the band embarked on a tour that took them down the East coast, out West via the Midwest, along the West coast, and back East via the South. The band made their triumphant return to the Northeast on <Link component={RouterLink} to="/shows/1998-08-28-wetlands-preserve-new-york-ny">8/28/98</Link> where they debuted three new songs, two of which, Helicopters and Once the Fiddler Paid, entered regular rotation. The band played almost entirely on the East coast for the rest of the year, debuting the songs that would make up the Hot Air Balloon rock opera. On <Link component={RouterLink} to="/shows/1998-12-29-wetlands-preserve-new-york-ny">12/29/98</Link> and <Link component={RouterLink} to="/shows/1998-12-30-wetlands-preserve-new-york-ny">12/30/98</Link> the band played two legendary Phish afterparties at the Wetlands Preserve, and on <Link component={RouterLink} to="/shows/1998-12-31-silk-city-diner-philadelphia-pa">12/31/98</Link> the band debuted Barber's <Link component={RouterLink} to="/resources/hot-air-ballooon">Hot Air Balloon</Link> rock opera at Silk City.
					</Typography>
					<Typography variant="body1">
						The Biscuits saw a huge expansion in popularity and skill in <Link component={RouterLink} to="/shows/year/1999">1999</Link>. They played two national tours in the winter and fall, as well as an East coast and Midwest tour in the spring/summer. They continued to cultivate their following throughout the year, playing 1000+ capacity venues in New York, Worcester and (of all places) Phoenix, Arizona. On 5/22/99, the band was scheduled to play a set at All Good Music Festival that was ultimately canceled. A group of dedicated Biscuits fans camped out, dubbing their site "Camp Bisco." In August, the band held the first Camp Bisco Music Festival, an annual event that happens to this day.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2000 - The Disco Triscuits and The Maui Project"} />
				<CardContent>
					<Typography variant="body1">
						In January 2000 Marc announced via an Internet message board post that he had been asked to leave the band. Luckily, this hiatus was short-lived, and he rejoined the band in July of that same year.
					</Typography>
					<Typography variant="body1">
						During this 6-month period, the remaining three members (Jon, Aron, and Sammy) played several shows as a trio, referred to as The Disco Triscuits (or just Triscuits). Each member would take turns playing the bassline - sometimes Aron on keys, other times Sammy would pick up a bass guitar while friend and local musician DJ Mauricio would take over on e-drums.  During this time, they also auditioned/jammed with other bass players at shows including Carol Wade, Clay Belknap, Bill Stites, Anthony Rogers-Wright, Rob Derhak, and Jordan Crisman.  Crisman played multiple shows with the band and was widely believed to be Marc's replacement for a time.
					</Typography>
					<Typography variant="body1">
						Meanwhile, Marc channeled his energy into writing a ton of new songs, and formed his own band, The Maui Project,
						which played one show on his birthday - <span> </span>
						<Link href="https://archive.org/details/maui2000-04-08.flac16" target="blank">4/8/2000</Link> - at the Wetlands in New York City. The Maui Project featured Marc on bass, Jamie Shields on keys, Max Delaney on guitar, Dave Hoffman on drums, Paulie Herron on percussion and DJ Stitch on the turntables. Maui Project songs are now staples of the Biscuits current repertoire, and include such fan favorites as Triumph, Home Again, Humuhumunukunukuapua'a, Grass is Green, and Kamaole Sands.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2000 - 2004"} />
				<CardContent>
					<Typography variant="body1">Coming soon - this shit don't write itself.  Follow us at <Link href="https://twitter.com/tdbdotnet" target="blank">@tdbdotnet</Link> for content updates!</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2005 - The Doctor is Out.  Enter Batman."} />
				<CardContent>
					<Typography variant="body1">
						In <Link component={RouterLink} to="/shows/years/2005">2005</Link>, after more than 10 years, Sam Altman left the band to pursue his dream of becoming a doctor.  His last official shows were <Link component={RouterLink} to="/shows/2005-08-26-skye-top-festival-grounds-van-etten-ny">8/26/05</Link> and <Link component={RouterLink} to="/shows/2005-08-27-skye-top-festival-grounds-van-etten-ny">8/27/05</Link> at Camp Bisco IV. To find a replacement, the band held a series of auditions culminating in a two-night, sold-out "drum off" at the Borgata in Atlantic City, won by Skydog Gypsy drummer, Allen Aucoin. In December of 2005, Allen was announced as the band's new drummer.
					</Typography>
					<Typography variant="body1">
						Allen attended Berklee College of Music in Boston, and began his musical career in education and composition, including teaching and writing for award-winning percussion ensembles.  In 1999 he formed Skydog Gypsy.
					</Typography>
					<Typography variant="body1">
						In December of 2010, Allen was hospitalized after a serious asthma attack and was unable to perform at the first 3 shows of the band's New Year's Eve run. In his place, Lotus drummer Mike Greenfield, Johnny Rabb from BioDiesel, Pretty Lights drummer Adam Deitch, New Deal drummer Darren Shearer, and even original drummer Sam Altman took turns sitting in.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2006"} />
				<CardContent>
					<Typography variant="body1">
						<Link component={RouterLink} to="/shows/year/2006">2006</Link> marked a new chapter for the Disco Biscuits, as they took their new drummer Allen on the road. While performances may have been a little uneven at first, it was clear that Allen had the chops and chemistry within the band improved with each show. As the band expanded the repertoire of songs they had at their disposal, a change in the band's sound was becoming evident. The jams produced during these early Allen days could be described as hard-driving and heavily rooted in electronic elements, but they were still undoubtedly the Disco Biscuits. Conspirator tracks Commercial Amen and Liquid Handcuffs as well as new originals The Great Abyss, Cyclone (originally debuted by JM2), and Step Inside were added to the band's live catalog.
					</Typography>
					<Typography variant="body1">
						2006 was a busy year for the band as they released their live album The Wind at Four to Fly, played Jam in the Dam, Langerado, Bonnaroo and a number of other festivals, as well as went on extensive Spring and Fall tours. Allen's first Camp Bisco was held on <Link component={RouterLink} to="/shows/2006-08-25-hunter-mountain-ski-lodge-hunter-ny">08/25</Link> and <Link component={RouterLink} to="/shows/2006-08-26-hunter-mountain-ski-lodge-hunter-ny">08/26/06</Link> at Hunter Mountain in Hunter, NY. At the time, these shows, 08/25 in particular, contained some of the most cohesive playing to date. Fans were thrown for a bit of a loop as the first few shows of the fall tour featured Shawn Hennessy on percussion. Some fans thought it seemed odd to add another new member into the mix just as Allen was really starting to find his footing, however, the experiment was short lived as he only played four shows.
					</Typography>
					<Typography variant="body1">
						The end of Fall tour and the California run in December showcased a band that was feeling more confident by the day.  By the time they closed out the year at The Tweeter Center (Susquehanna Bank Center in Camden NJ), they had resoundingly quashed any fears fans had felt about the switch in drummers. The show featured DJ Switches (see Munchkin>Bazaar) as well as the debut of Orch Theme (Conspirator) a song that would ultimately become a fan favorite and heavy hitter.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2007"} />
				<CardContent>
					<Typography variant="body1">
						While it could be said that much of 2006 felt like a period of adjustment, <Link component={RouterLink} to="/shows/year/2007">2007</Link> found the Biscuits extremely comfortable with their new drummer and could be described as a time of high level experimentation and creativity. Setlists became more diverse and the band took more risks on stage as their confidence grew. On <Link component={RouterLink} to="/shows/2007-02-15-starland-ballroom-sayreville-nj">02/15/07</Link> the band brought back Spin the Wheel as a select group of fans got to come on stage, spin the wheel, and the band played whatever song it landed on. A whole slew of new originals (Air Song, Minions, Shadow, Rockafella, Sweatbox and Glastonbury) were debuted and to the delight of fans they dusted off Down to Bottom, Onamae Wa, and Pat and Dex (all first time played with Allen). Another exciting development of the weekend was the reintroduction of Strobelights and Martinis and Gangster. Both were reworked versions of 1.0 jams (Strobelights appearing in <Link component={RouterLink} to="/shows/2001-09-01-wetlands-preserve-new-york-ny">09/01/01</Link> Dribble and Gangster as the intro jam>I-Man on <Link component={RouterLink} to="/shows/2002-12-29-electric-factory-philadelphia-pa">12/29/02</Link>), now being presented as full-fledged songs. Both songs would go on to become staples in the band’s live repertoire and are used as jam vehicles to this day. These Starland shows would be a harbinger of good things to come in 2007 as the Disco Biscuits were ready to remind everyone that they can be the best band on the planet on any given night.
					</Typography>
					<Typography variant="body1">
						Spring Tour yielded more quality shows as they played Chicago and an extensive run in the northeast and Mid-Atlantic. <Link component={RouterLink} to="/shows/2007-05-21-mr-small-s-funhouse-pittsburgh-pa">05/21/07</Link> is required listening for all fans and for good reason. The band expertly wove in and out of their songs with precision, dropping stunning improv along the way, as they blew the roof off of Mr. Smalls, just outside Pittsburgh, PA. Excitement within the scene grew as word spread that The Disco Biscuits had not only returned to form, but were breaking new ground on a nightly basis. June would be another important month for the band as they headlined Starscape in Baltimore, MD, played a legendary <Link component={RouterLink} to="/resources/tractorbeam">Tractorbeam</Link> show on <Link component={RouterLink} to="/shows/2007-06-26-chameleon-club-lancaster-pa">06/26</Link>, and played a six show run co-headlining shows with Umphrey’s McGee (dubbed D.U.M.B. tour). Their hot streak continued into July as they zigzagged across the country playing High Sierra Music Festival, two shows in Southern California, co-headlined festival Trancegression (with Umphrey’s) in Copper Mountain, Colorado, played Missouri, Wisconsin, and 10,000 Lakes Festival in Detroit Lakes, MN, and then finally back out to San Francisco and Berkeley, CA. You really cannot go wrong with any of these shows, but <Link component={RouterLink} to="/shows/2007-07-19-10-000-lakes-festival-detriot-lakes-mn">07/19/07</Link> epitomizes the creative setlist writing and inspired playing of 2007.
					</Typography>
					<Typography variant="body1">
						In August, Camp Bisco found a new home in Mariaville, NY at Indian Lookout Country Club. This would prove to be a huge moment in Disco Biscuits history as ILCC would become the first venue to allow the Disco Biscuits back after holding the festival (and continued to so through 2013). Fall tour began in Florida and continued to bring the heat as they headed north through Georgia and Tennessee. Momentum built as they moved through the Midwest, back to North Carolina and then up through the Mid-Atlantic and then the northeast. Halloween in Boston was a special occasion as Jon Gutwillig's rock opera The Hot Air Balloon was performed in full for the 8th time. After Boston it was off to Albany, Columbus, Cleveland, and then finally to the tour closer in Buffalo, NY. Looking back, this tour is undoubtedly one of their finest. There are noteworthy jams and segues in virtually every show, although it could be argued that <Link component={RouterLink} to="/shows/2007-10-10-state-theatre-st-petersburg-fl">10/10</Link>, <Link component={RouterLink} to="/shows/2007-10-23-legends-boone-nc">10/23</Link>, <Link component={RouterLink} to="/shows/2007-10-26-rams-head-live-baltimore-md">10/26</Link>, <Link component={RouterLink} to="/shows/2007-11-01-the-palace-theatre-albany-ny">11/1</Link> and <Link component={RouterLink} to="/shows/2007-11-03-house-of-blues-cleveland-oh">11/3</Link> stand above the rest.
					</Typography>
					<Typography variant="body1">
						In mid-December the band and fans headed off to Runaway Bay, Jamaica for Caribbean Holidaze, a jamband destination vacation. Co-headlined by Umphrey’s McGee, this event gave fans an opportunity to watch the band from the beach and even take excursions with band members. 2007 wrapped with a New Year’s run split between New York and Philadelphia, culminating with New Year’s Eve at the Tweeter Center (now the Susquehanna Bank Center). Fans still look back on this time period as a golden age of The Disco Biscuits and with good reason, the band was at the top of their game and the future looked bright.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2008"} />
				<CardContent>
					<Typography variant="body1">
						Fresh off an incredibly successful 2007, four nights in Colorado started <Link component={RouterLink} to="/shows/year/2008">2008</Link> off on the right foot. Extended sections of improv were prevalent throughout this run, the 54 minute I-Man from <Link component={RouterLink} to="/shows/2008-01-19-dobson-ice-arena-vail-co">01/19</Link> in Vail being one of the many highlights. Three nights back at the Starland Ballroom and a set at the final Langerado served as somewhat of a warm up, before heading off to Europe for Jam in the Dam, with an additional three shows before and after the festival. Two major highlights of this European Tour occurred on <Link component={RouterLink} to="/shows/2008-03-21-magnet-club-berlin-germany">3/21</Link> and <Link component={RouterLink} to="/shows/2008-03-22-pumpehuset-copenhagen-denmark">3/22</Link>. Channeling the spirit of Berlin and the techno music that’s revered there, 03/21 featured relentless, hard hitting jams that reflected this German city splendidly. The following night in Copenhagen, Denmark delivered a performance that could not have been more different, instead showing off gorgeous soundscapes and gooey transitions (both Crickets>Voices and Voices>Rainbow song are master level segues).
					</Typography>
					<Typography variant="body1">
						When comparing 2008 to the previous and following years, it might be easy to say that it was a down year, but if you go just by the shows in April it would be hard to tell. Playing fifteen shows over the course of the month, the Biscuits continued to polish and fine-tune their sound. <Link component={RouterLink} to="/shows/2008-04-11-nokia-theater-new-york-ny">04/11</Link> produced one of the top highlights of 2.0 with the blissed out, buttery segue from Vassillios > Spaga. A run through the south was punctuated by two highly praised shows at the Georgia Theater in Athens on <Link component={RouterLink} to="/shows/2008-04-18-georgia-theater-athens-ga">04/18</Link> and <Link component={RouterLink} to="/shows/2008-04-19-georgia-theater-athens-ga">04/19</Link>, before heading down to New Orleans for late nights at JazzFest. May was a very quiet month, with only two shows; Jam on the River and a late night at the Electric Factory in Philadelphia. June was also somewhat light on tour dates, with only 7 performances. However, the music they played was anything but light. <Link component={RouterLink} to="/shows/2008-06-06-webster-theater-hartford-ct">06/06</Link> and <Link component={RouterLink} to="/shows/2008-06-07-ft-armistead-park-baltimore-md">06/07</Link> featured dark, heavy, danceable improv, while <Link component={RouterLink} to="/shows/2008-06-13-bonnaroo-music-festival-manchester-tn">06/13</Link> undoubtedly turned on a whole new group of fans, as they delivered a jaw dropping late night set at Bonnaroo (check out the opening sequence of M.E.M.P.H.I.S. > Ladies > Helicopters).
					</Typography>
					<Typography variant="body1">
						The rest of the year was relatively quiet as the band spent a lot of time in the studio, working on an album that would never be officially released. Tour dates for the second half of 2008 were very sparse and almost all exclusively one-off festival dates. Camp Bisco VII, now in its second year at ILCC in Mariaville, NY continued to grow in popularity and performances by mainstream artists like Snoop Dogg and 311... err, hold on. Was 311 there? No. Snoop seemed to think so though. Despite the lack of shows, the Biscuits came out swinging at Camp, delivering sets that tapped into the energy and cohesiveness they had found earlier in the year.
					</Typography>
					<Typography variant="body1">
						The year ended strong as the band returned to Jamaica for Caribbean Holidaze. Not only was the playing extremely high level, but the band debuted four new songs (Uber Glue, High Speed Racer, and M80) foreshadowing the inspiration and creativity that would be displayed the following year. While the improv was especially good all weekend, it is the jam out of Vassillios on <Link component={RouterLink} to="/shows/2007-12-14-caribbean-holidaze-runaway-bay-jamaica">12/14</Link> that could be considered the crown jewel of Holidaze. The exquisite, cascading melody that developed out of this classic song was nothing short of breathtaking.
					</Typography>
						<Typography variant="body1">
							2008 ended with a five night run at the Nokia Theater in New York. The shows certainly had their moments, especially <Link component={RouterLink} to="/shows/2008-12-28-nokia-theater-new-york-ny">12/28</Link> and <Link component={RouterLink} to="/shows/2008-12-30-nokia-theater-new-york-ny">12/30</Link>, but <Link component={RouterLink} to="/shows/2008-12-31-nokia-theater-new-york-ny">12/31</Link>, set three in particular (which included almost all new material and a Matisyahu sit-in) left fans wanting more. Luckily for them, the band would be back on the road in a few weeks, breaking new ground and eviscerating everything that stood in their path.
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2009 - 2010"} />
				<CardContent>
					<Typography variant="body1">Coming soon - this shit don't write itself.  Follow us at <Link href="https://twitter.com/tdbdotnet" target="blank">@tdbdotnet</Link> for content updates!</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2011-2019 - Setbreak"} />
				<CardContent>
					<Typography variant="body1">
						During the 8 years from 2011-2019, the band did not tour - instead just performing periodic series of limited engagement runs
						(4 nights in Colorado, NYE Run, Camp Bisco, etc).
					</Typography>
				</CardContent>
			</Card>
			{divider}
			<Card>
				<CardHeader title={"2019-Present - Setbreak is Over"} />
				<CardContent>
					<Typography variant="body1">
						In September of 2019 in a series of social media posts, the Disco Biscuits announced "Setbreak is over. Gas tank's refilled. We are back."  Shortly thereafter, they announced their 2019-2020 Winter Tour, playing 23 shows in a 2 month period, including 3-night runs in Florida and Chicago and a 4-night New Year's Eve run at the Playstation Theater in New York City.
					</Typography>
					<Typography variant="body1">
						In January of 2020 the band announced "Act 1" - a 19-show tour starting with a 3-night run in March at the Fillmore in Philadelphia and culminating in the band's annual Camp Bisco festival in July.
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}
export default BandHistory


