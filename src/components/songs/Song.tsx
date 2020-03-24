import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { IVenue } from '../venues/Venue';
import { Helmet } from "react-helmet";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, LinearProgress, Button, Grid, Dialog, DialogTitle, DialogContent, Box } from '@material-ui/core';
import Moment from 'react-moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PageHeading from '../shared/PageHeading';
import { AppContext } from '../../context/AppProvider';
import SongForm from './SongForm';
import Paragraph from '../shared/Paragraph';

export interface ISong {
	id: string,
	author_id: string,
	author_name: string,
	cover: boolean,
	lyrics?: string,
	notes?: string,
	slug: string,
	tabs?: string,
	title: string,
	times_played: number,
	first_played_show?: IShow,
	last_played_show?: IShow,
	history?: string,
	featured_lyric?: string,
	date_last_played?: Date
}

interface ISongPlayed {
	annotations: string[]
	position: number
	segue: string
	set: string
	venue: IVenue
	show: IShow
	note: string
	all_timer: boolean
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
	const { state, dispatch } = useContext(AppContext)
	const classes = useStyles();
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const [song, setSong] = useState<ISong | undefined>(undefined)
	const [formOpen, setFormOpen] = useState(false)
	const [id, setId] = useState("")
	const [songsPlayed, setSongsPlayed] = useState<ISongPlayed[]>([])
	const [allTimers, setAllTimers] = useState<ISongPlayed[]>([])
	const [jamCharts, setJamCharts] = useState<ISongPlayed[]>([])
	const [displayTracks, setDisplayTracks] = useState<ISongPlayed[]>([])
	const { currentUser } = state
	const admin = currentUser?.roles.includes('admin')

	const initViewJamCharts = (state.viewJamCharts) ? true : false

	console.log(initViewJamCharts)

	const handleOpen = (type: string, id: string) => {
		setId(id)
		type === 'form' ? setFormOpen(true) : setDeleteOpen(true)
	};

	const handleClose = (type: string) => {
		type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
		setFormOpen(false)
		setTimeout(() => setId(''), 500)
	};

	const setDeleteOpen = ((type) => {
		type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
		setFormOpen(false)
		setTimeout(() => setId(''), 500)
	});

	const toggleView = (jamcharts) => {
		if (jamcharts) {
			setDisplayTracks(jamCharts)
		} else {
			setDisplayTracks(songsPlayed)
		}
        dispatch({type: 'TOGGLE_VIEW_JAM_CHARTS', payload: jamcharts})
	}

	useEffect(() => {
		setLoading(true)
		const fetchSong = async () => {
			const song: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/songs/${params.id}`)
			setSong(song.data)

			const tracks: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tracks/songs/${params.id}`)

			setSongsPlayed(tracks.data)
			const allTimers = tracks.data.filter(x => x.all_timer)
			setAllTimers(allTimers)
			const jamCharts = tracks.data.filter(x => x.note != null && x.note !== "")
			setJamCharts(jamCharts)

			if (initViewJamCharts) {
				setDisplayTracks(jamCharts)
			} else {
				setDisplayTracks(tracks.data)
			}

			setLoading(false)
		}
		fetchSong()
	}, [initViewJamCharts, params.id])
	return (
		<>
			{song &&
				<>
					<Helmet>
						<title>Biscuits Internet Project - {song.title}</title>
					</Helmet>
					<Grid container justify="space-between" >
						<Grid item>
							<PageHeading text={song.title} />
						</Grid>
						<Grid item>
							{admin &&
								<div style={{ alignContent: "right" }}>
									<Button onClick={() => handleOpen("form", song.id)}>Edit Song</Button>
								</div>
							}
						</Grid>
					</Grid>
					<Dialog
						open={formOpen}
						onClose={() => handleClose('form')}
					>
						<DialogTitle>Edit Song</DialogTitle>
						<DialogContent>
							<SongForm id={id} handleClose={() => handleClose('form')} />
						</DialogContent>
					</Dialog>

					{song.featured_lyric &&
						<>
							<Paragraph>
								<em>{song.featured_lyric}</em>
							</Paragraph>
							<div style={{ height: 20 }}></div>
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
									{song.first_played_show &&
										<Link component={RouterLink} to={`/shows/${song.first_played_show.slug}`}>
											<Moment format="M/DD/YYYY">
												{song.first_played_show.date}
											</Moment>
											<span> - </span>
											{song.first_played_show.venue.name}
											<span> - </span>
											{song.first_played_show.venue.city}
											<span>, </span>
											{song.first_played_show.venue.state}
										</Link>

									}
									{song.first_played_show && song.first_played_show.relisten_url &&
										<>
											<span style={{ paddingLeft: 12, verticalAlign: "middle" }}>
												<Link href={song.first_played_show.relisten_url} target="blank">
													<img src="/relisten.png" alt="relisten" />
												</Link>
											</span>
										</>
									}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Last played
									</TableCell>
								<TableCell>
									{song.last_played_show &&
										<Link component={RouterLink} to={`/shows/${song.last_played_show.slug}`}>
											<Moment format="M/DD/YYYY">
												{song.last_played_show.date}
											</Moment>
											<span> - </span>
											{song.last_played_show.venue.name}
											<span> - </span>
											{song.last_played_show.venue.city}
											<span>, </span>
											{song.last_played_show.venue.state}
										</Link>
									}

									{song.last_played_show && song.last_played_show.relisten_url &&
										<>
											<span style={{ paddingLeft: 12, verticalAlign: "middle" }}>
												<Link href={song.last_played_show.relisten_url} target="blank">
													<img src="/relisten.png" alt="relisten" />
												</Link>
											</span>
										</>
									}
								</TableCell>
							</TableRow>
							{song.notes &&
								<TableRow>
									<TableCell>
										Notes
									</TableCell>
									<TableCell>
										{song.notes}
									</TableCell>
								</TableRow>
							}
							{allTimers.length > 0 &&
								<TableRow>
									<TableCell>
										All Timers
									</TableCell>
									<TableCell>
										{allTimers.map((allTimer) => {
											return (
												<Typography key={allTimer.show.slug}>
													<Link component={RouterLink} to={`/shows/${allTimer.show.slug}`}>
														<Moment format="M/DD/YYYY">
															{allTimer.show.date}
														</Moment>
														<span> - </span>
														{allTimer.show.venue.name}
														<span> - </span>
														{allTimer.show.venue.city}
														<span>, </span>
														{allTimer.show.venue.state}
													</Link>
												</Typography>
											)
										})}
									</TableCell>
								</TableRow>
							}
						</Table>
					</TableContainer>

					<div style={{ height: 20 }}></div>

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
								<Paragraph>
									<div dangerouslySetInnerHTML={{ __html: song.lyrics }} />
								</Paragraph>
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
								<Typography dangerouslySetInnerHTML={{ __html: song.history }} />
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
								<Paragraph>
									<div dangerouslySetInnerHTML={{ __html: song.tabs }} />
								</Paragraph>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					}

					<div style={{ height: 20 }}></div>
				</>
			}

			<Box style={{marginTop: 0, marginBottom: 10, textAlign: "right"}}>
                <Button onClick={() => toggleView(!state.viewJamCharts)}>
                    {state.viewJamCharts ? (
                        "View All"
                    ) : (
                        "View Jam Charts"
                    )}
                </Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Show</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{displayTracks.map((s: ISongPlayed) => (
							<TableRow>
								<TableCell>

									<Link component={RouterLink} to={`/shows/${s.show.slug}`} >
										<Typography>
											<Moment format="M/DD/YYYY">
												{s.show.date}
											</Moment>
										</Typography>
										<Typography>
											{s.venue.name}<br />
											{s.venue.city}
											<span>, </span>
											{s.venue.state}
										</Typography>
									</Link>
									{s.show.relisten_url &&
										<Typography style={{marginTop: 6}}>
											<Link href={s.show.relisten_url} target="blank">
												<img src="/relisten.png" alt="relisten" />
											</Link>
										</Typography>
									}
								</TableCell>
								<TableCell style={{width: "70%"}}>{s.note}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{loading &&
				<>
					<div style={{ height: 30 }}></div>
					<LinearProgress />
					<div style={{ height: 30 }}></div>
				</>
			}
		</>
	)
}
export default Song
