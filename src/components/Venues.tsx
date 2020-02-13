import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

export interface IVenue {
	id?: string,
	city?: string,
	postal_code?: string,
	name?: string,
	slug?: string,
	state?: string,
	phone?: string,
	website?: string
	street?: string,
	country?: string
}

const Venues: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [venues, setVenues] = useState<IVenue[]>([])

	useEffect(()=> {
		setLoading(true)
		const fetchVenues = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/venues')
			setVenues(data.data)
			setLoading(false)
		}
		fetchVenues()
	},[])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Venues</title>
			</Helmet>
			<h1>Venues</h1>
			{loading && <h3>.....Loading</h3>}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>City</TableCell>
						<TableCell>State</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						{venues.map((venue: IVenue) => (
							<TableRow key={venue.slug}>
								<TableCell component="th" scope="row">
									<Link to={`/venues/${venue.slug}`}>
										{venue.name}
									</Link>
								</TableCell>
								<TableCell>{venue.city}</TableCell>
								<TableCell>{venue.state}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Venues
