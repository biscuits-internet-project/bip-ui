import React, {useState, useEffect} from 'react';
import axios, { AxiosResponse } from 'axios'
import Wrap from './Wrap';

interface IVenue {
	id: string,
	city: string,
	name: string,
	slug: string,
	state: string
}

const Venues: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [venues, setVenues] = useState<IVenue[]>([])
	useEffect(()=> {
		setLoading(true)
		const fetchVenues = async () => {
			const data:AxiosResponse = await axios.get('http://stg-api.discobiscuits.net/api/venues')
			setVenues(data.data)
			setLoading(false)
		}
		fetchVenues()
	},[])
	return (
		<Wrap>
			<h1>Venues</h1>
			{loading && <h3>.....Loading</h3>}
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Slug</td>
						<td>City</td>
						<td>State</td>
					</tr>
				</thead>
			{venues.map((venue: IVenue) => {
				return <tr key={venue.id}>
							<td>{venue.name}</td>
							<td>{venue.slug}</td>
							<td>{venue.city}</td>
							<td>{venue.state}</td>
					    </tr>
			})}
			</table>
		</Wrap>
	)
}
export default Venues
