import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from '@material-ui/core';
			import MUIDataTable from "mui-datatables";

export interface IVenue {
	id?: string,
	city?: string,
	postal_code?: string,
	name?: string,
	slug?: string,
	state?: string,
	phone?: string,
	website?: string
	street?: string,
	country?: string,
	times_played?: number
}

const Venues: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [venues, setVenues] = useState<IVenue[]>([])

	useEffect(()=> {
		setLoading(true)
		const fetchVenues = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/venues')
			setVenues(data.data)
			setLoading(false)
		}
		fetchVenues()
	},[])

	const columns = [
		{
			name: "Name",
			options: {
				filter: false,
				sort: true,
				searchable: true
			}
		},
		{
			name: "City",
			options: {
				filter: true,
				sort: true,
				searchable: true
			},
		},
		{
			name: "State",
			options: {
				filter: true,
				sort: true,
				searchable: true
			},
		},
			{
				name: "Times Played",
				options: {
					filter: false,
					sort: true,
					searchable: true,
				},
			},
			{
				name: ""
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

	const data = venues.map((v: IVenue) => (
		[ v.name, v.city, v.state, v.times_played, <Link variant="button" component={RouterLink} to={`/venues/${v.slug}`}>view details</Link>]
	))

	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Venues</title>
			</Helmet>
			<h1>Venues</h1>
			{loading && <h3>.....Loading</h3>}

			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>
		</>
	)
}
export default Venues
