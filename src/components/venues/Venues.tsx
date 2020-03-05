import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { Link, Dialog, DialogTitle, DialogContent, Grid, Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import PageHeading from './../shared/PageHeading';
import { IVenue } from './Venue'
import VenueForm from './VenueForm';
import { AppContext } from '../../context/AppProvider';

const Venues: React.FC = () => {
	const [formOpen, setFormOpen] = useState(false)
	const {state, asyncActions} = useContext(AppContext)
	const { roles } = state
	const admin = roles.includes('admin')

	useEffect(
		()=> {
		  !state.venues.length && asyncActions.getVenues()
		}
		,[state.venues.length, asyncActions]
	)

	const handleOpen = () => {
		setFormOpen(true)
	};

	const handleClose = () => {
		setFormOpen(false)
	};

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

	const data = state.venues.map((v: IVenue) => (
		[[v.slug, v.name], v.city, v.state, v.times_played]
	))

	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Venues</title>
			</Helmet>
			<Grid container justify="space-between" >
				<Grid item>
					<PageHeading text="Venues"/>
				</Grid>
				<Grid item>
					{ admin &&
						<div style={{alignContent: "right"}}>
							<Button onClick={() =>handleOpen()}>Add Venue</Button>
						</div>
                    }
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
				<DialogTitle>Add Venue</DialogTitle>
				<DialogContent>
					<VenueForm id="" handleClose={() => handleClose()} />
				</DialogContent>
			</Dialog>
		</>
	)
}
export default Venues
