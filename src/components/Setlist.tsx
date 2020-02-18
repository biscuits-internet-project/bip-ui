import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tracklist, { ITrack } from './Tracklist';
import Moment from 'react-moment';
import { Typography, Paper, Link, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, SvgIconProps, SvgIcon } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import HeadsetIcon from '@material-ui/icons/Headset';

export interface ISetlist {
	slug: string
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 20,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
	}),
);

const Setlist: React.FC<ISetlist> = ({ date, slug, venue, tracks, notes }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader

				title = {
					<Link component={RouterLink} to={`/shows/${slug}`}>
						<Moment format="MMMM D, YYYY">
							{date}
						</Moment>
					</Link>
				}
				subheader = {venue &&
					<>
						<Link component={RouterLink} to={`/venues/${venue.slug}`}>
							{venue.name} - {venue.city}, {venue.state}
						</Link>
					</>
				}
			/>
			<CardContent>
				<Typography variant="body2" dangerouslySetInnerHTML={{ __html: notes }} />
				<Tracklist tracks={tracks}></Tracklist>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="Like">
					<FavoriteIcon />
				</IconButton>

				<IconButton aria-label="I was there">
					<BeenhereIcon />
				</IconButton>

				<IconButton aria-label="Relisten">
					<HeadsetIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default Setlist