import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from '@material-ui/core';

export interface ISong {
	id?: string,
	title?: string
	author_id?: string,
	author_name?: string,
	cover?: boolean,
	lyrics?: string,
	notes?: string,
	slug?: string,
	tabs?: string,
	history?: string,
	featured_lyric?: string
}

const Songs: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [songs, setSongs] = useState<ISong[]>([])
	useEffect(()=> {
		setLoading(true)
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs')
			setSongs(data.data)
			setLoading(false)
		}
		fetchSongs()
	},[])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Songs</title>
			</Helmet>
			<h1>Songs</h1>
			{loading && <h3>.....Loading</h3>}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Author</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						{songs.map((song: ISong) => (
							<TableRow key={song.slug}>
								<TableCell component="th" scope="row">
									<Link component={RouterLink} to={`/songs/${song.slug}`}>
										{song.title}
									</Link>
								</TableCell>
								<TableCell>{song.author_name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Songs
