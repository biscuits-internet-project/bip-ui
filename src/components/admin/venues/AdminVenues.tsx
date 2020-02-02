import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Panel from '../../shared/Panel'
import AddVenue from './AddVenue'
import VenueList from './VenueList'

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
    return (
        <>
            <Typography variant='h4'>Venues</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Panel title="Add Venue">
                        <AddVenue updateVenues={(venue: IVenue)=> setVenues([venue,...venues])}/>
                    </Panel>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Panel title="Venue List">
                        <VenueList venues={venues}/>
                    </Panel>
                </Grid>
            </Grid>   
        </> 
    )
}

export default AdminVenues