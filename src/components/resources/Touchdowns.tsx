import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import LinkButton from '../shared/LinkButton';
import * as rssParser from 'react-native-rss-parser';
import { Card, CardHeader, CardMedia, CardContent, makeStyles, Grid, Typography } from '@material-ui/core';

interface IPodcast {
  title: string
  links: string[]
  itunes: IITunes
}

interface IITunes {
	image: string
	subtitle: string
	duration: string
}

const useStyles = makeStyles({
	root: {
	  height: "100%",
	  width: 350
	},
	header: {
	  minHeight: 100
	},
    media: {
		height: 350,
		width: 350
    }
});

const Touchdowns: React.FC = () => {
	const classes = useStyles()
	const [podcasts, setPodcasts] = useState<IPodcast[]>([])

	useEffect(() => {
		const fetchPodcasts = async () => {
			fetch('https://rss.acast.com/touchdownsallday')
			.then((response) => response.text())
			.then((responseData) => rssParser.parse(responseData))
			.then((rss) => {

				setPodcasts(rss.items)
			});
		}
		fetchPodcasts()
	}, [])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Touchdowns All Day Podcast</title>
			</Helmet>
			<PageHeading text="Touchdowns All Day"/>

			<Grid container spacing={5} alignItems="stretch">
				{podcasts && podcasts.map((pod) => {
					return (
						<Grid item xs={12} sm={12} md={6} lg={3} xl={3} style={{display: 'flex', height: "auto"}} className={classes.root}>
							<Card className={classes.root}>
								<CardHeader title={pod.title} className={classes.header} />
								<CardMedia
									className={classes.media}
									component="img"
									alt={pod.title}
									image={pod.itunes.image}
									title={pod.title}
								/>
								<CardContent>
									<Typography>{pod.itunes.subtitle}</Typography>
									<div style={{height: 15}}></div>
									<div style={{textAlign: "center"}}>
										<LinkButton to="https://www.osirispod.com/podcasts/touchdowns-all-day-with-jon-barber/" text="Check it out" />
									</div>
								</CardContent>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
export default Touchdowns
