import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Panel from '../../shared/Panel'
import AddSongs from './AddSong'
import SongList from './SongList'

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
}

const AdminSongs = () => {
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
    return (
        <>
            <Typography variant='h4'>Songs</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Panel title="Add Song">
                        <AddSongs updateSongs={(song: ISong)=> setSongs([song,...songs])}/>
                    </Panel>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Panel title="Song List">
                        <SongList songs={songs}/>
                    </Panel>
                </Grid>
            </Grid>   
        </> 
    )
}

export default AdminSongs