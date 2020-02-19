import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet";
import { Link } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

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
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs')
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
				filter: true,
				sort: true,
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
		filterType: 'multiselect',
		count: 2000,
		pagination: false,
		print: false,
		download: false,
		selectableRows: "none",
		selectableRowsHeader: false,
	};

	const data = songs.map((s: ISong) => (
		[ s.title, s.author_name, String(!s.cover) , s.times_played, <Link variant="button" component={RouterLink} to={`/songs/${s.slug}`}>View Details </Link>]
	))


	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Songs</title>
			</Helmet>
			<h1>Songs</h1>
			{loading && <h3>.....Loading</h3>}


			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>
		</>
	)
}
export default Songs
