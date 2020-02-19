import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import PageHeading from './shared/PageHeading';

interface ITourDate {
	details?: string,
	address?: string,
	formatted_start_date?: string,
	formatted_end_date?: string,
	date: Date,
	venue_name?: string,
}

const Tour: React.FC = () => {
	const [tourDates, setTourDates] = useState<ITourDate[]>([])

	useEffect(() => {
		const fetchTourDates = async () => {
			const data: AxiosResponse = await axios.get('https://cdn.seated.com/api/tour/261deef5-93c4-4d64-8582-dff697ce4644?include=tour-events')
			const dates: ITourDate[] = data.data.included.map(obj => {
				return {
					venue_name: obj['attributes']['venue-name'],
					formatted_start_date: obj['attributes']['starts-at-short'],
					formatted_end_date: obj['attributes']['ends-at-short'],
					date: obj['attributes']['starts-at'],
					details: obj['attributes']['details'],
					address: obj['attributes']['formatted-address'],

				}
			});

			dates.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
			setTourDates(dates)
		}
		fetchTourDates()
	}, [])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Tour Dates</title>
			</Helmet>
			<PageHeading text="Tour Dates"/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Venue</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Details</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tourDates.map((td: ITourDate) => (
							<TableRow key={td.formatted_start_date}>
								<TableCell component="th" scope="row">
									{td.formatted_start_date === td.formatted_end_date ? (
										td.formatted_start_date
									) : (
											`${td.formatted_start_date} - ${td.formatted_end_date}`
										)
									}
								</TableCell>
								<TableCell>{td.venue_name}</TableCell>
								<TableCell>{td.address}</TableCell>
								<TableCell>{td.details}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Tour
