import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Link } from '@material-ui/core';
import Paragraph from '../shared/Paragraph';

const Tractorbeam: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Tractorbeam</title>
			</Helmet>
			<PageHeading text="Tractor Beam" />
			<Paragraph>
				Tractorbeam, like <Link component={RouterLink} to="/resources/the-perfume">The Perfume</Link>, is a pseudonym the Disco Biscuits perform under.
				Debuted on <Link component={RouterLink} to="/shows/2018-07-14-the-pavilion-at-montage-mountain-scranton-pa">April 20th, 2007</Link> at Ontourage in Chicago,
				e IL Tractorbeam played instrumental versions of Disco Biscuits originals and covers until switching up their format in 2019.
			</Paragraph>
			<Paragraph>
				It was evident that this project served as a creative spark for the band, as they played three memorable shows in 2007,
				following their Chicago debut. <Link component={RouterLink} to="/shows/2007-04-20-ontourage-chicago-il">April, 27th 2007</Link> at the Gramercy in New York and two shows at the Chameleon Club in Lancaster,
				 PA (<Link component={RouterLink} to="/shows/2007-06-26-chameleon-club-lancaster-pa">06/26</Link> and <Link component={RouterLink} to="/shows/2007-08-30-chameleon-club-lancaster-pa">08/30</Link>) featured creative setlists and dynamic
				 jamming that often leaned heavy, dark, and electronic.
			</Paragraph>
			<Paragraph>
				After appearing four times in 2007, Tractorbeam performances became somewhat rare as they played only nine times over the next eleven years:
				<ul>
					<li><Link component={RouterLink} to="/shows/2008-10-25-state-theater-falls-church-va">10/25/08 State Theater Falls - Church, VA</Link></li>
					<li><Link component={RouterLink} to="/shows/2009-07-18-indian-lookout-country-club-mariaville-ny">07/18/09 Camp Bisco, ILCC - Mariaville, NY</Link> (TB vs. The Perfume)</li>
					<li><Link component={RouterLink} to="/shows/2009-09-12-starland-ballroom-sayreville-nj">09/12/09 Starland Ballroom - Sayreville, NJ</Link></li>
					<li><Link component={RouterLink} to="/shows/2009-12-28-highline-ballroom-new-york-ny">12/28/09 Highline Ballroom - New York, NY</Link></li>
					<li><Link component={RouterLink} to="/shows/2010-03-26-grand-central-miami-fl">03/26/10 Ultra Music Festival Afterparty - Miami, FL</Link></li>
					<li><Link component={RouterLink} to="/shows/2010-09-18-mishawaka-amphitheater-bellvue-co">09/18/10 Mishawaka Amphitheatre - Bellvue, CO</Link></li>
					<li><Link component={RouterLink} to="/shows/2010-10-31-jefferson-theater-charlottesville-va">10/31/10 Jefferson Theater - Charlottesville, VA</Link></li>
					<li><Link component={RouterLink} to="/shows/2011-01-23-mayan-holidaze-now-sapphire-resort-puerto-morelos-mexico">01/23/11 Mayan Holidaze Now Sapphire Resort - Puerto Morelos, Mexico</Link></li>
					<li><Link component={RouterLink} to="/shows/2014-01-26-fox-theatre-boulder-co">01/26/14 Fox Theater, Boulder, CO</Link></li>
					<li><Link component={RouterLink} to="/shows/2014-12-29-b-b-king-s-blues-club-new-york-ny">12/29/14 B.B. King Blue Club - New York, NY</Link></li>
					<li><Link component={RouterLink} to="/shows/2016-09-09-great-north-music-and-arts-fest-minot-me">09/09/16 Great North Music and Arts Fest - Minot, ME</Link></li>
					<li><Link component={RouterLink} to="/shows/2018-07-14-the-pavilion-at-montage-mountain-scranton-pa">07/14/18 Camp Bisco, Montage Mountain - Scranton, PA</Link> (TB vs. The Perfume Spin the Wheel)</li>
				</ul>

				On October <Link component={RouterLink} to="">3rd</Link> and <Link component={RouterLink} to="">4th</Link> 2019 at 10 Mile Music Hall in Frisco, CO
				the band debuted a completely new format for Tractorbeam. This iteration focuses on playing live versions of house and
				disco songs like Delorean Dynamite/Strandbar (Todd Terje), White Rabbit (Solomun), Fly Away (Crackazat). All four
				band members use laptops and are synced up through Ableton Live. Tractorbeam also played a
				late night show on 12/27/19 at Sony Music Hall in New York, NY.
			</Paragraph>
			<Paragraph>
				In addition to the TB standalone shows, every Disco Biscuits show since 11/14/19 has included a Tractorbeam segment mid-second or third set.
			</Paragraph>
		</>
	)
}
export default Tractorbeam
