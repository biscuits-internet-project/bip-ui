
import React, {useState, useEffect,useContext} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {AppContext} from '../../../context/AppProvider'
import { useSnackbar } from 'notistack'
import VenueList from './VenueList'
import VenueForm from './VenueForm';

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
	country?: string
}

const AdminVenues = () => {
	const {state} = useContext(AppContext)
	const [venues, setVenues] = useState<IVenue[]>([])
	const [open, setOpen] = useState(false)
	const [id, setId] = useState<string | null>(null)
	const { enqueueSnackbar } = useSnackbar()

	useEffect(()=> {
		const fetchVenues = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/venues`)
			setVenues(data.data)
		}
		fetchVenues()
	},[])

	const handleOpen = (id: string | null) => {
		if(id) setId(id)
		setOpen(true);
	};

	const handleClose = () => {
		setId(null)
		setOpen(false);
	};

	const handleDelete = async (id?: string) => {
		await axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}/venues/${id}`,
			headers: {
				"Content-Type":	"application/json",
				"Authorization": state.token
			}
		});
		enqueueSnackbar("successfully deleted", { variant: 'success' })
		setVenues(venues.filter(venue => venue.slug !== id))
	}

    return (
        <>
			<Grid container spacing={3} alignItems="center">
				<Grid item  md={10}>
					<Typography variant='h4'>Venues</Typography>
				</Grid>
				<Grid item md={2}>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<Button variant="contained" color="primary" onClick={() =>handleOpen(null)}>Add Venue</Button>
				</div>
				</Grid>
			</Grid>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card title="Song List">
                        <VenueList venues={venues} handleOpen={(id)=>handleOpen(id || null)} handleDelete={handleDelete}/>
                    </Card>
                </Grid>

			</Grid>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{id ? "Edit Venue" : "Add Venue"}</DialogTitle>
				<DialogContent>
					<VenueForm setVenues={setVenues} venues={venues} id={id} handleClose={handleClose}/>
				</DialogContent>
			</Dialog>
        </>
    )
}

export default AdminVenues