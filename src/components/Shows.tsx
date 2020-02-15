import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { ISetlist } from './Setlist';
import Setlist from './Setlist';
import { Helmet } from "react-helmet"
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

const Shows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const currentYear = new Date().getFullYear()
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	//const params = useParams();
	const years = Array(currentYear - 1995 + 1).fill(0).map((_, idx) => 1995 + idx)
	const history = useHistory()

	const changeYear = (e) => {
		setSelectedYear(e.target.value)
		history.push(`/shows?year=${e.target.value}`)
	}

	useEffect(() => {
		setLoading(true)
		const fetchSetlists = async () => {
			const data: AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/shows?year=${selectedYear}`)
			setSetlists(data.data)
			setLoading(false)
		}
		fetchSetlists()
	}, [selectedYear])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Shows</title>
			</Helmet>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<h1>Shows from {selectedYear}</h1>
					</Grid>
					<Grid item xs={6}>
						<FormControl>
							<InputLabel id="yearLabel">Year</InputLabel>
							<Select
								labelId="yearYear"
								id="year"
								value={selectedYear}
								onChange={changeYear}
							>
								{years.map((year) => {
									return (
										<MenuItem value={year} selected={selectedYear === year}>{year}</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				{loading && <h3>.....Loading</h3>}

				<div>
					{setlists.map((setlist, id) => {
						return (
							<Setlist key={id} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
						)
					})}
				</div>
			</div>
		</>

	)
}

export default Shows;