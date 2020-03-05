import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tracklist, { ITrack } from './Tracklist';
import {IShow} from './Show'
import Moment from 'react-moment';
import { Typography, Link, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';

export interface ISetlist {
	show: IShow
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 20,
		},
		title: {
			fontSize: 22,
		},
		subheader: {
			fontSize: 18,
			paddingBottom: 0,
			marginBottom: 0
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
	}),
);

const Setlist: React.FC<ISetlist> = ({ show }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader
				classes={{
					title: classes.title,
					subheader: classes.subheader,
				}}
				title = {
					<Link component={RouterLink} to={`/shows/${show.slug}`}>
						<Moment format="MMMM D, YYYY">
							{show.date}
						</Moment>
					</Link>
				}
				subheader = {show.venue &&
					<>
						<Link component={RouterLink} to={`/venues/${show.venue.slug}`}>
							{show.venue.name} - {show.venue.city}, {show.venue.state}
						</Link>
					</>
				}
			/>
			<CardContent style={{paddingTop: 0, paddingBottom: 0}}>
				{show.notes && <Typography variant="body2" dangerouslySetInnerHTML={{ __html: show.notes }} /> }
				<Tracklist tracks={show.tracks}></Tracklist>
			</CardContent>
			<CardActions disableSpacing>
				{/* <IconButton aria-label="Favorite">
					<FavoriteIcon/>
				</IconButton>

				<IconButton aria-label="I was there">
					<EmojiTransportationIcon/>
				</IconButton>

				<IconButton aria-label="Relisten">
					<HeadsetIcon />
				</IconButton> */}
			</CardActions>
		</Card>
	)
}

export default Setlist