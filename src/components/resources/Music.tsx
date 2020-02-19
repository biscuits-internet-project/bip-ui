import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import { Card, CardHeader, CardContent, Typography, List, ListItem, Link } from '@material-ui/core';

const Music: React.FC = () => {
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
					<List>
						<ListItem><Typography><Link component={RouterLink} to="/shows/2003-08-31-cervantes-masterpiece-ballroom-denver-co">8/31/03</Link>: Magellan > Inverted Once the Fiddler Paid > Magellan</Typography></ListItem>
						<ListItem><Typography><Link component={RouterLink} to="//shows/2006-05-28-electric-factory-philadelphia-pa">5/28/06</Link>: Story of the World > Inverted Digital Buddha > Story of the World</Typography></ListItem>
					</List>
				</CardContent>
			</Card>

		</>
	)
}
export default Music
