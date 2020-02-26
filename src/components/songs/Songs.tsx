import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { Link, Grid, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import PageHeading from '../shared/PageHeading';
import SongForm from './SongForm'
import { ISong } from './Song'

const Songs: React.FC = () => {
	const [songs, setSongs] = useState<ISong[]>([])
	const [formOpen, setFormOpen] = useState(false)

	useEffect(()=> {
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/songs`)
			data.data.sort((a, b) => (b.times_played > a.times_played) ? 1 : -1)
			setSongs(data.data)
		}
		fetchSongs()
	},[])

	const handleOpen = () => {
		setFormOpen(true)
	};

	const handleClose = () => {
		setFormOpen(false)
	};

	const columns = [
		{
			name: "Title",
			options: {
				filter: false,
				sort: true,
				sortDirection: "none",
				searchable: true,
				customBodyRender: value => {
					return (
					  <Link component={RouterLink} to={`/songs/${value[0]}`}>{value[1]}</Link>
					);
				  }
			}
		},
		{
			name: "Author",
			options: {
				filter: true,
				sort: true,
				sortDirection: "none",
				searchable: true
			},
		},
		{
			name: "Original",
			options: {
				display: false,
				filter: true,
				sort: false,
				searchable: false
			},
		},
		{
			name: "Times Played",
			options: {
				filter: false,
				sort: true,
				sortDirection: "desc",
				searchable: true
			},
		},
			{
				name: "",
				options: {
					filter: false,
					sort: false,
					searchable: false,
				},
			},
		];

	const options = {
		responsive: 'scrollFullHeight',
		filterType: 'multiselect',
		pagination: true,
		print: false,
		download: false,
		selectableRows: "none",
		selectableRowsHeader: false,
		searchOpen: true,
		viewColumns: false,
		rowsPerPage: 25,
		rowsPerPageOptions: [25,50,100],
		customSort: (data, colIndex, order) => {
			return data.sort((a, b) => {
			  if (colIndex === 0) {
				return (
				  (a.data[colIndex][1].toLowerCase() < b.data[colIndex][1].toLowerCase() ? -1 : 1) *
				  (order === "desc" ? 1 : -1)
				);
			  } else if (colIndex === 1) {
				return (
				  ((a.data[colIndex] ?? "").toLowerCase() < (b.data[colIndex] ?? "").toLowerCase() ? -1 : 1) *
				  (order === "desc" ? 1 : -1)
				);
			  } else {
				return (
				  (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
				  (order === "asc" ? 1 : -1)
				);
			  }
			});
		  }
	};

	const data = songs.map((s: ISong) => (
		[[s.slug, s.title], s.author_name, s.cover ? "cover" : "original", s.times_played]
	))

	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Songs</title>
			</Helmet>
			<Grid container justify="space-between" >
				<Grid item>
					<PageHeading text="Songs"/>
				</Grid>
				<Grid item>
					<div style={{alignContent: "right"}}>
						<Button onClick={() =>handleOpen()}>Add Song</Button>
					</div>
				</Grid>
			</Grid>
			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>

			<Dialog
				open={formOpen}
				onClose={() => handleClose()}
			>
				<DialogTitle>Add Song</DialogTitle>
				<DialogContent>
					<SongForm setSongs={setSongs} songs={songs} id="" handleClose={() => handleClose()} />
				</DialogContent>
			</Dialog>
		</>
	)
}
export default Songs
