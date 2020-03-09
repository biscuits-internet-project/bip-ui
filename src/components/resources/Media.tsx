import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import axios, { AxiosResponse } from 'axios';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from '@material-ui/core';
import { type } from 'os';

interface IMedia {
	date: Date
	url: string,
	year: string,
	description: string,
	media_type: string
}

const Media: React.FC = () => {
	const [media, setMedia] = useState<IMedia[]>([])

	useEffect(() => {
		const fetchMedia = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/media_contents`)
			setMedia(data.data)
		}
		fetchMedia()
	}, [])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Articles and Podcasts</title>
			</Helmet>
			<PageHeading text="News from Nowhere"/>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Year</TableCell>
							<TableCell>Link</TableCell>
							<TableCell>Type</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{media.map((m: IMedia) => (
							<TableRow>
								<TableCell>
									{m.year}
								</TableCell>
								<TableCell component="th" scope="row">
									<Link href={m.url} target="blank">
										{m.url}
									</Link>
								</TableCell>
								<TableCell>
									{m.media_type}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Media
