import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Helmet } from "react-helmet"
import { Link } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import PageHeading from './shared/PageHeading';

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
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/venues`)
			data.data.sort((a, b) => (b.times_played > a.times_played) ? 1 : -1)
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
				sortDirection: "none",
				searchable: true,
				customBodyRender: value => {
					return (
					  <Link component={RouterLink} to={`/venues/${value[0]}`}>{value[1]}</Link>
					);
				}
			}
		},
		{
			name: "City",
			options: {
				filter: true,
				sort: true,
				sortDirection: "none",
				searchable: true
			},
		},
		{
			name: "State",
			options: {
				filter: true,
				sort: true,
				sortDirection: "none",
				searchable: true
			},
		},
			{
				name: "Times Played",
				options: {
					filter: false,
					sort: true,
					sortDirection: "desc",
					searchable: true,
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
			  } else if (colIndex === 1 || colIndex === 2) {
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

	const data = venues.map((v: IVenue) => (
		[[v.slug, v.name], v.city, v.state, v.times_played]
	))

	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Venues</title>
			</Helmet>
			<PageHeading text="Venues"/>

			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
			/>
		</>
	)
}
export default Venues
