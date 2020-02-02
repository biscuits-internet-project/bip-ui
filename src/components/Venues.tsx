import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"

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
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>City</td>
						<td>State</td>
					</tr>
				</thead>
			{venues.map((venue: IVenue) => {
				return <tr key={venue.id}>
							<td>
								<Link to={`/venues/${venue.slug}`}>
									{venue.name}
								</Link>
							</td>
							<td>{venue.city}</td>
							<td>{venue.state}</td>
					    </tr>
			})}
			</table>
		</>
	)
}
export default Venues
