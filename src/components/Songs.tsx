import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { Link } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import PageHeading from './shared/PageHeading';

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
	const columns = [
		{
			name: "Title",
			options: {
				filter: false,
				sort: true,
				searchable: true
			}
		},
		{
			name: "Author",
			options: {
				filter: true,
				sort: true,
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
		rowsPerPageOptions: [25,50,100]
	};

	const data = songs.map((s: ISong) => (
		[<Link component={RouterLink} to={`/songs/${s.slug}`}>{s.title}</Link>, s.author_name, s.cover ? "cover" : "original", s.times_played]
	))


	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Songs</title>
			</Helmet>
			<PageHeading text="Songs"/>
			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>
		</>
	)
}
export default Songs
