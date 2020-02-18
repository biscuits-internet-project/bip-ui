import React, {useState, useEffect} from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { IVenue } from './Venues';
import { Helmet } from "react-helmet";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, LinearProgress } from '@material-ui/core';
import Moment from 'react-moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface ISong {
	id: string,
	author_id: string,
	author_name: string,
	cover: boolean,
	lyrics: string,
	notes: string,
	slug: string,
	tabs: string,
	title: string,
	times_played: number,
	first_played_show: IShow,
	last_played_show: IShow,
	history: string,
	featured_lyric: string
}

interface ISongPlayed {
	annotations: string[]
	position: number
	segue: string
	set: string
	venue: IVenue
	show: IShow
	note: string
}

interface IShow {
	date: Date
	notes?: string
	slug: string
	venue: IVenue
	relisten_url?: string
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

const Song: React.FC = () => {

	const classes = useStyles();
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const [song, setSong] = useState<ISong | undefined>(undefined)
	const [songsPlayed, setSongsPlayed] = useState<ISongPlayed[]>([])

	useEffect(()=> {
		setLoading(true)
		const fetchSong = async () => {
			const song:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/songs/${params.id}`)
			setSong(song.data)

			const songs:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/tracks/songs/${params.id}`)
			setSongsPlayed(songs.data)

			setLoading(false)
		}
		fetchSong()
	},[params.id])
	return (
		<>
			{song &&
				<>
					<Helmet>
						<title>Biscuits Internet Project - {song.title}</title>
					</Helmet>
					<div>
						<h1>{song.title}</h1>
						{song.featured_lyric &&
							<>
							<Typography>
								<em>{song.featured_lyric}</em>
							</Typography>
							<div style={{height: 20}}></div>
							</>
						}

						{loading &&
							<>
								<div style={{height: 30}}></div>
									<LinearProgress color="primary" />
								<div style={{height: 30}}></div>
							</>
						}

						<TableContainer component={Paper}>
							<Table>
								<TableRow>
									<TableCell>
										Author
									</TableCell>
									<TableCell>
										{song.author_name}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Times played
									</TableCell>
									<TableCell>
										{song.times_played}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Debut
									</TableCell>
									<TableCell>
										<Link component={RouterLink} to={`/shows/${song.first_played_show.slug}`}>
											<Moment format="MMMM D, YYYY">
												{song.first_played_show.date}
											</Moment>
											<span> - </span>
											{song.first_played_show.venue.name}
											<span> - </span>
											{song.first_played_show.venue.city}
											<span>, </span>
											{song.first_played_show.venue.state}
											<span> </span>
										</Link>

										{song.first_played_show.relisten_url &&
											<Link href={song.first_played_show.relisten_url} target="blank">
												<img src="/relisten.png" alt="relisten" />
											</Link>
										}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Last played
									</TableCell>
									<TableCell>
										<Link component={RouterLink} to={`/shows/${song.last_played_show.slug}`}>
											<Moment format="MMMM D, YYYY">
												{song.last_played_show.date}
											</Moment>
											<span> - </span>
											{song.last_played_show.venue.name}
											<span> - </span>
											{song.last_played_show.venue.city}
											<span>, </span>
											{song.last_played_show.venue.state}
										</Link>
									</TableCell>
								</TableRow>
							</Table>
						</TableContainer>

						<div style={{height: 20}}></div>

						{song.lyrics &&
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>Lyrics</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										<div dangerouslySetInnerHTML={{__html: song.lyrics}} />
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						}

						{song.history &&
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>History</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										<div dangerouslySetInnerHTML={{__html: song.history}} />
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						}
						{song.tabs &&
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>Guitar Tabs</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>
										<div dangerouslySetInnerHTML={{__html: song.tabs}} />
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						}

						<div style={{height: 20}}></div>
					</div>
				</>
			}

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Venue</TableCell>
						<TableCell>Relisten</TableCell>
						<TableCell>Notes</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						{songsPlayed.map((s: ISongPlayed) => (
							<TableRow>
								<TableCell component="th" scope="row">
									<Link component={RouterLink} to={`/shows/${s.show.slug}`} >
										<Moment format="MMMM D, YYYY">
											{s.show.date}
										</Moment>
									</Link>
								</TableCell>
								<TableCell>
									<Link component={RouterLink} to={`/venues/${s.venue.slug}`}>
										{s.venue.name}<br/>
										{s.venue.city}
										<span>, </span>
										{s.venue.state}
									</Link>
								</TableCell>
								<TableCell>
									{s.show.relisten_url &&
										<Link href={s.show.relisten_url} target="blank">
											<img src="/relisten.png" alt="relisten" />
										</Link>
									}
								</TableCell>
								<TableCell>{s.note}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Song
