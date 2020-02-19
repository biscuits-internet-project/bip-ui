import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { ISetlist } from './Setlist';
import Setlist from './Setlist';
import { Helmet } from "react-helmet"
import { FormControl, InputLabel, Select, MenuItem, Grid, Menu, Button, Fade } from '@material-ui/core';
import PageHeading from './shared/PageHeading';

const Shows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const currentYear = new Date().getFullYear()
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	//const params = useParams();
	const years = Array(currentYear - 1995 + 1).fill(0).map((_, idx) => 1995 + idx)
	const history = useHistory()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeYear = (e) => {
		setAnchorEl(null);
		setSelectedYear(e.target.value)
		history.push(`/shows?year=${e.target.value}`)
	}

	useEffect(() => {
		setLoading(true)
		const fetchSetlists = async () => {
			const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?year=${selectedYear}`)
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
						<PageHeading text={`Shows from ${selectedYear}`} />
					</Grid>
					<Grid item xs={6}>
						<FormControl>
							<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
								Select Year
							</Button>
							<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									TransitionComponent={Fade}
								>

								{years.map((year) => {
									return (
										<MenuItem value={year} onClick={changeYear} selected={selectedYear === year}> {year} </MenuItem>
									)
								})}
							</Menu>
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