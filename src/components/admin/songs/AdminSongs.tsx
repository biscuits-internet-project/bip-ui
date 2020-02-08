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
import SongForm from './SongForm'
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
	const {state} = useContext(AppContext)
	const [songs, setSongs] = useState<ISong[]>([])
	const [open, setOpen] = useState(false)
	const [id, setId] = useState<string | null>(null)
	
	useEffect(()=> {
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs')
			setSongs(data.data)
		}
		fetchSongs()
	},[])

	const handleOpen = (id: string | null) => {
		console.log(id)
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
			url: `https://stg-api.discobiscuits.net/api/songs/${id}`,
			headers: {
				"Content-Type":	"application/json",
				"Authorization": state.token
			}
		});
		setSongs(songs.filter(song => song.slug !== id))
	}
	
    return (
        <>	
			<Grid container spacing={3} alignItems="center">
				<Grid item  md={10}>
					<Typography variant='h4'>Songs</Typography>
				</Grid>
				<Grid item md={2}>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<Button variant="contained" color="primary" onClick={() =>handleOpen(null)}>Add Song</Button>
				</div>
				</Grid>
			</Grid>
            <Grid container spacing={3}>
				
                <Grid item xs={12}>
                    <Card title="Song List">
                        <SongList songs={songs} handleOpen={(id)=>handleOpen(id || null)} handleDelete={handleDelete}/>
                    </Card>
                </Grid>
				
			</Grid>   
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{id ? "Edit Song" : "Add Song"}</DialogTitle>
				<DialogContent>
					<SongForm setSongs={setSongs} songs={songs} id={id} handleClose={handleClose}/>
				</DialogContent>
			</Dialog>
		</> 
)
}

export default AdminSongs