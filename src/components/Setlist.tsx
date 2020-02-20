import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tracklist, { ITrack } from './Tracklist';
import Moment from 'react-moment';
import { Typography, Paper, Link, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, SvgIconProps, SvgIcon, FormControlLabel, Switch, Badge, Tooltip, Checkbox, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HeadsetIcon from '@material-ui/icons/Headset';
import { red, green } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

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
			<CardContent style={{paddingTop: 0, paddingBottom: 0}}>
				<Typography variant="body2" dangerouslySetInnerHTML={{ __html: notes }} />
				<Tracklist tracks={tracks}></Tracklist>
			</CardContent>
			<CardActions disableSpacing>

				<IconButton aria-label="Favorite">
					<FavoriteIcon/>
				</IconButton>

				<IconButton aria-label="I was there">
					<EmojiTransportationIcon/>
				</IconButton>

				<IconButton aria-label="Relisten">
					<HeadsetIcon />
				</IconButton>


			</CardActions>
		</Card>
	)
}

export default Setlist