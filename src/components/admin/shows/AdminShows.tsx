import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Panel from '../../shared/Panel'
import AddShow from './AddShow'
import ShowList from './ShowList'

export interface IShow {
	id: string
	notes: string
	date: string
	venue: { id: string, slug: string, name: string, city: string, state: string }
}

const AdminShows = () => {
	const [shows, setShows] = useState<IShow[]>([])
	useEffect(()=> {
		const fetchShows = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/shows?year=2020')
			setShows(data.data)
		}
		fetchShows()
	},[])
    return (
        <>
            <Typography variant='h4'>Shows</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Panel title="Add Song">
                        <AddShow></AddShow>
                    </Panel>
                </Grid>
                <Grid item xs={12}>
                    <Panel title="Show List">
                        <ShowList shows={shows}/>
                    </Panel>
                </Grid>
            </Grid>   
        </> 
    )
}

export default AdminShows