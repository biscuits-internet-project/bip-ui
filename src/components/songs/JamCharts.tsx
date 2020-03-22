import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { Link, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Grid, Typography } from '@material-ui/core';
import Moment from 'react-moment';
import PageHeading from '../shared/PageHeading';
import { IShow } from '../shows/Show';
import { ISong } from './Song';

export interface ITrack {
	annotations: string[]
	position: number
	segue: string
	set: string
	show: IShow
	song: ISong
	note: string
	all_timer: boolean
}

const Song: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [tracks, setTracks] = useState<ITrack[]>([])

	useEffect(() => {
		setLoading(true)
		const fetchSong = async () => {
			const tracks: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tracks/charts`)
			setTracks(tracks.data)
			setLoading(false)
		}
		fetchSong()
	}, [])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Jam Charts</title>
			</Helmet>
			<Grid container justify="space-between" >
				<Grid item>
					<PageHeading text="Jam Charts" />
				</Grid>
			</Grid>



			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Song</TableCell>
							<TableCell>Show</TableCell>
							<TableCell>Relisten</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tracks.map((track: ITrack) => (
							<TableRow style={{verticalAlign: "top"}}>
								<TableCell>
									<Link component={RouterLink} to={`/songs/${track.song.slug}`} >
										{track.song.title}
									</Link>
								</TableCell>
								<TableCell component="th" scope="row">
									<Link component={RouterLink} to={`/shows/${track.show.slug}`} >
										<Typography>
											<Moment format="M/DD/YYYY">
												{track.show.date}
											</Moment>
										</Typography>
										<Typography>
											{track.show.venue.name}<br />
											{track.show.venue.city}, {track.show.venue.state}
										</Typography>
									</Link>
								</TableCell>
								<TableCell>
									{track.show.relisten_url &&
										<Link href={track.show.relisten_url} target="blank">
											<img src="/relisten.png" alt="relisten" />
										</Link>
									}
								</TableCell>
								<TableCell style={{width: "50%"}}>{track.note}</TableCell>
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
