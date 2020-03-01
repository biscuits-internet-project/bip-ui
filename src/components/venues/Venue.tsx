import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import Setlist, { ISetlist } from './../Setlist';
import { IShow } from './../Show';
import { TableContainer, Paper, Table, TableRow, TableCell, Link, Dialog, DialogTitle, DialogContent, Grid, Button } from '@material-ui/core';
import Moment from 'react-moment';
import PageHeading from './../shared/PageHeading';
import VenueForm from './VenueForm';
import { AppContext } from '../../context/AppProvider';

export interface IVenue {
	id: string,
	city?: string,
	postal_code?: string,
	name: string,
	slug?: string,
	state?: string,
	phone?: string,
	website?: string
	street?: string,
	country?: string
	times_played?: number,
	first_played_show?: IShow
	last_played_show?: IShow
}

const Venue: React.FC = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const [venue, setVenue] = useState<IVenue | undefined>(undefined)
	const [shows, setShows] = useState<ISetlist[]>([])
	const [id, setId] = useState('')
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [venues, setVenues] = useState<IVenue[]>([])
	const [formOpen, setFormOpen] = useState(false)
	const { state } = useContext(AppContext)
	const { roles } = state
	const admin = roles.includes('admin')

	const handleOpen = (type: string, id: string) => {
		setId(id)
		type === 'form' ? setFormOpen(true) : setDeleteOpen(true)
	};

	const handleClose = (type: string) => {
		type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
		setFormOpen(false)
		setTimeout(() => setId(''), 500)
	};

	useEffect(() => {
		setLoading(true)
		const fetchVenue = async () => {
			const venue: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/venues/${params.id}`)
			setVenue(venue.data)

			const shows: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?venue=${params.id}`)
			setShows(shows.data)

			setLoading(false)
		}
		fetchVenue()
	}, [params.id])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			{venue &&
				<>
					<Helmet>
						<title>Biscuits Internet Project - {venue.name}</title>
					</Helmet>
					<Grid container justify="space-between" >
						<Grid item>
							<PageHeading text={venue.name} />
						</Grid>
						<Grid item>
							{ admin &&
								<div style={{alignContent: "right"}}>
									<Button onClick={()=>handleOpen("form", venue.id)}>Edit Venue</Button>
								</div>
							}
						</Grid>
					</Grid>
					<Dialog
						open={formOpen}
						onClose={() => handleClose('form')}
					>
						<DialogTitle>Edit Venue</DialogTitle>
						<DialogContent>
							<VenueForm setVenues={setVenues} setVenue={setVenue} venues={venues} id={venue.id} handleClose={() => handleClose('form')} />
						</DialogContent>
					</Dialog>

					<TableContainer component={Paper}>
						<Table>
							<TableRow>
								<TableCell>
									Location
									</TableCell>
								<TableCell>
									{venue.city}, {venue.state}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Times played
									</TableCell>
								<TableCell>
									{venue.times_played}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									First played
									</TableCell>
								<TableCell>
									{venue.first_played_show &&
										<Link component={RouterLink} to={`/shows/${venue.first_played_show.slug}`}>
											<Moment format="MMMM D, YYYY">
												{venue.first_played_show.date}
											</Moment>
										</Link>
									}
									{venue.first_played_show && venue.first_played_show.relisten_url &&
										<>
											<span> </span>
											<Link href={venue.first_played_show.relisten_url} target="blank">
												<img src="/relisten.png" alt="relisten" />
											</Link>
										</>
									}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Last played
									</TableCell>
								<TableCell>
									{venue.last_played_show &&
										<Link component={RouterLink} to={`/shows/${venue.last_played_show.slug}`}>
											<Moment format="MMMM D, YYYY">
												{venue.last_played_show.date}
											</Moment>
										</Link>
									}
									{venue.last_played_show && venue.last_played_show.relisten_url &&
										<>
											<span> </span>
											<Link href={venue.last_played_show.relisten_url} target="blank">
												<img src="/relisten.png" alt="relisten" />
											</Link>
										</>
									}
								</TableCell>
							</TableRow>
						</Table>
					</TableContainer>

					<div style={{ height: 30 }}></div>

					{shows && shows.map((show) => {
						return (
							<Setlist date={show.date} slug={show.slug} venue={show.venue} tracks={show.tracks} notes={show.notes} />
						)
					})}
				</>
			}
		</>
	)
}
export default Venue
