import React, {useState, useEffect} from 'react';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"

interface ITourDate {
	details?: string,
	address?: string,
	formatted_date?: string,
	date: Date,
	venue_name?: string,
}

const Tour: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [tourDates, setTourDates] = useState<ITourDate[]>([])
	
	useEffect(()=> {
		setLoading(true)
		const fetchTourDates = async () => {
			const data:AxiosResponse = await axios.get('https://cdn.seated.com/api/tour/261deef5-93c4-4d64-8582-dff697ce4644?include=tour-events')
			const dates: ITourDate[] = data.data.included.map(obj => {
					return {
						venue_name: obj['attributes']['venue-name'],
						formatted_date: obj['attributes']['starts-at-short'],
						date: obj['attributes']['starts-at'],
						details: obj['attributes']['details'],
						address: obj['attributes']['formatted-address'],

					}
			  });

			  dates.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
			setTourDates(dates)
			setLoading(false)
		}
		fetchTourDates()
	},[])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Tour Dates</title>
			</Helmet>
			<h1>Tour Dates</h1>
			{loading && <h3>.....Loading</h3>}
			<table>
				<thead>
					<tr>
						<td>Date</td>
						<td>Venue</td>
						<td>Address</td>
						<td>Details</td>
					</tr>
				</thead>
			{tourDates.map((td: ITourDate) => {
				return <tr> <td>{td.formatted_date}</td>
							<td>{td.venue_name}</td>
							<td>{td.address}</td>
							<td>{td.details}</td>
					    </tr>
			})}
			</table>
		</>
	)
}
export default Tour
