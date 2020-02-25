import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { Link, Grid, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import PageHeading from './shared/PageHeading';
import SongForm from './admin/songs/SongForm'
import { useSnackbar } from 'notistack'

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
	featured_lyric?: string,
	times_played?: number
}

const Songs: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [songs, setSongs] = useState<ISong[]>([])
	const [formOpen, setFormOpen] = useState(false)
	const [id, setId] = useState('')
	const { enqueueSnackbar } = useSnackbar()

	useEffect(()=> {
		setLoading(true)
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/songs`)
			data.data.sort((a, b) => (b.times_played > a.times_played) ? 1 : -1)
			setSongs(data.data)
			setLoading(false)
		}
		fetchSongs()
	},[])

	const handleOpen = (type: string, id?: string) => {
		if(id) setId(id)
		//type === 'form' ? setFormOpen(true) : setDeleteOpen(true)
		setFormOpen(true)
	};

	const handleClose = (type :string) => {
		//type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
		setFormOpen(false)
		setTimeout(()=>setId(''), 500)
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
			<PageHeading text="Songs"/>
			{/* <Grid container>
				<Grid item>
				</Grid>
				<Grid item>
					<div style={{alignContent: "right"}}>
						<Button variant="contained" onClick={() =>handleOpen('form')}>Add Song</Button>
					</div>
				</Grid>
			</Grid> */}
			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>

			<Dialog
				open={formOpen}
				onClose={() => handleClose('form')}
			>
				<DialogTitle>{id ? "Edit Song" : "Add Song"}</DialogTitle>
				<DialogContent>
					<SongForm setSongs={setSongs} songs={songs} id={id} handleClose={() => handleClose('form')}/>
				</DialogContent>
			</Dialog>
		</>
	)
}
export default Songs
