import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { IVenue } from './Venues';
import { Helmet } from "react-helmet";

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
	first_time_played: Date,
	last_time_played: Date
}

interface ISongPlayed {
	annotations: string[]
	position: number
	segue: string
	set: string
	venue: IVenue
	show: IShow
}

interface IShow {
	date: Date
	notes?: string
	slug: string
}

const Song: React.FC = () => {

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
			{loading && <h3>.....Loading</h3>}
			{song && 
				<>
					<Helmet>
						<title>Biscuits Internet Project - {song.title}</title>
					</Helmet>
					<div>
						<h1>{song.title}</h1>
						<div>number of times played: {song.times_played}</div>
						<div>first time played: {song.first_time_played}</div>
						<div>last time played: {song.last_time_played}</div>
					</div>
				</>
			}

				<table>
				<thead>
					<tr>
						<td>Date</td>
						<td>Venue</td>
						<td>Set</td>
						<td>City</td>
						<td>State</td>
					</tr>
				</thead>

				{songsPlayed.map((s: ISongPlayed) => {
					 return <tr>
								<td>{s.show.date}</td>
								<td>{s.venue.name}</td>
								<td>{s.set}</td>
								<td>{s.venue.city}</td>
								<td>{s.venue.state}</td>
							</tr>
				})}
			</table>
		</>
	)
}
export default Song
