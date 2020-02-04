import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import Setlist, { ISetlist } from './Setlist';

interface IVenue {
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
	times_played: number,
	first_time_played?: Date,
	last_time_played?: Date
}

const Venue: React.FC = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const [venue, setVenue] = useState<IVenue | undefined>(undefined)
	const [shows, setShows] = useState<ISetlist[]>([])
	
	useEffect(()=> {
		setLoading(true)
		const fetchVenue = async () => {
			const venue:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/venues/${params.id}`)
			setVenue(venue.data)

			const shows:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/shows?venue=${params.id}`)
			setShows(shows.data)

			setLoading(false)
		}
		fetchVenue()
	},[params.id])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			{venue && 
				<>
					<Helmet>
						<title>Biscuits Internet Project - {venue.name}</title>
					</Helmet>
					<div>
						<h1>{venue.name}</h1>
						<div>number of times played: {venue.times_played}</div>
						<div>first time played: {venue.first_time_played}</div>
						<div>last time played: {venue.last_time_played}</div>
					</div>

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
