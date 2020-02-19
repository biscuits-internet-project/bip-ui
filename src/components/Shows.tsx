import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { ISetlist } from './Setlist';
import Setlist from './Setlist';
import { Helmet } from "react-helmet"
import { Grid, makeStyles, Theme, createStyles, LinearProgress, Button, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PageHeading from './shared/PageHeading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
	  display: 'flex',
	  height: 40
    },
    input: {
	  marginTop: 13,
	  marginLeft: theme.spacing(1),
	  fontSize: 15,
      flex: 1,
    },
    iconButton: {
      padding: 0,
    },
  }),
);

const Shows: React.FC = () => {
	const classes = useStyles();
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const currentYear = new Date().getFullYear()
	const [selectedYear, setSelectedYear] = useState(params.year || currentYear)
	const [search, setSearch] = useState("")
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	const years = Array(currentYear - 1995 + 1).fill(0).map((_, idx) => 1995 + idx)
	const history = useHistory()

	const changeYear = (year) => {
		setSetlists([])
		history.push(`/shows/year/${year}`)
		setSelectedYear(year)
		setSearch("");
	}

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	}
	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearchClick()
		}
	}

	const handleSearchClick = () => {
		if (search === "") {
			return
		}
		setLoading(true)
		const searchShows = async () => {
			const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?search=${search}`)
			setSetlists(data.data)
			setLoading(false)
		}
		searchShows()
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
			<Grid container>
				<Grid item xs={6}>
					<PageHeading text="Shows" />
				</Grid>
				<Grid item container xs={6} justify="flex-end">
					<Paper className={classes.root}>
						<InputBase
							className={classes.input}
							placeholder="Search"
							onKeyDown={handleSearchKeyDown}
							onChange={handleSearchChange}
							inputProps={{ 'aria-label': 'search' }}
						/>
						<IconButton onClick={handleSearchClick} className={classes.iconButton} aria-label="search">
							<SearchIcon />
						</IconButton>
					</Paper>
				</Grid>


			</Grid>
			{years.map((year) => {
				return (
					<Button key={year} onClick={() => changeYear(year)} style={{display: "inline", marginRight: 6}}>
						{year}
					</Button>
				)
			})}
			<div style={{ height: 30 }}></div>

			{loading &&
				<>
					<div style={{ height: 30 }}></div>
					<LinearProgress />
					<div style={{ height: 30 }}></div>
				</>
			}

			{setlists.map((setlist, id) => {
				return (
					<Setlist key={id} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
				)
			})}
		</>

	)
}

export default Shows;