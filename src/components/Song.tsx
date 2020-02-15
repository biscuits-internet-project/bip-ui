import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { IVenue } from './Venues';
import { Helmet } from "react-helmet";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Moment from 'react-moment';

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
	last_time_played: Date,
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
						<div><em>{song.featured_lyric}</em></div>
						<div>author: {song.author_name}</div>
						<div>number of times played: {song.times_played}</div>
						<div>first time played: {song.first_time_played}</div>
						<div>last time played: {song.last_time_played}</div>
						{song.history &&
							<>
								<h3>History</h3>
								<div dangerouslySetInnerHTML={{__html: song.history}} />
							</>
						}
						{song.lyrics &&
							<>
								<h3>Lyrics</h3>
								<div dangerouslySetInnerHTML={{__html: song.lyrics}} />
							</>
						}
						<br/><br/>
					</div>
				</>
			}

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Venue</TableCell>
						<TableCell>City</TableCell>
						<TableCell>State</TableCell>
						<TableCell>Notes</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						{songsPlayed.map((s: ISongPlayed) => (
							<TableRow>
								<TableCell component="th" scope="row">
									<Link to={`/shows/${s.show.slug}`} >
										<Moment format="MMMM D, YYYY">
											{s.show.date}
										</Moment>
									</Link>
								</TableCell>
								<TableCell>
									<Link to={`/venues/${s.venue.slug}`}>
										{s.venue.name}
									</Link>
								</TableCell>
								<TableCell>{s.venue.city}</TableCell>
								<TableCell>{s.venue.state}</TableCell>
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
