import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tracklist from './Tracklist';
import {IShow} from './Show'
import Moment from 'react-moment';
import { Typography, Link, Card, CardHeader, CardContent, CardActions, Avatar, Grid, Chip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';


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
			marginTop: 2,
			paddingBottom: 0,
			marginBottom: 0
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		avatar: {
			width: theme.spacing(2.5),
			height: theme.spacing(2.5),
			marginTop: 4,
			marginLeft: 1,
			marginRight: 1,
			display: "inline-block"
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

					<Grid container direction="row"  justify="space-between">
						<Grid item>
							<Link component={RouterLink} to={`/shows/${show.slug}`}>
								<Moment format="M/DD/YYYY">
									{show.date}
								</Moment>
							</Link>
						</Grid>
						<Grid item>
							<div style={{textAlign: "right"}}>

							{ show.average_rating > 0 &&
								<Chip
									icon={<StarIcon />}
									label={show.average_rating}
									size="small"
									style={{marginRight: 2 }}
								/>
							}

							{(show.show_youtubes_count > 0 || show.relisten_url !== "" || show.show_photos_count > 0) &&
								<Chip
									size="small"
									label={
										<>
											{show.relisten_url !== "" &&
												<Link target="blank" href={show.relisten_url}>
													<Avatar alt="relisten" src="/icons/relisten.png" className={classes.avatar} />
												</Link>
											}
											{show.show_youtubes_count > 0 &&
												<Avatar alt="youtube" src="/icons/youtube.png" className={classes.avatar} />
											}
											{show.show_photos_count > 0 &&
											  <Avatar alt="photos" src="/icons/photos.png" className={classes.avatar} />
											}
										</>
									}
								/>
							}

							</div>

						</Grid>

					</Grid>

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