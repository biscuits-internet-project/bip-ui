import React, {useState, useEffect,useContext,useCallback} from 'react'
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
import DeleteConfirm from './DeleteConfirm'
import { useSnackbar } from 'notistack'

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
	const [formOpen, setFormOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [id, setId] = useState('')
	const { enqueueSnackbar } = useSnackbar()
	
	useEffect(()=> {
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs')
			setSongs(data.data)
		}
		fetchSongs()
	},[])

	const handleOpen = (type: string, id?: string) => {
		if(id) setId(id)
		type === 'form' ? setFormOpen(true) : setDeleteOpen(true)
	};
	
	const handleClose = (type :string) => {
		type === 'form' ? setFormOpen(false) : setDeleteOpen(false)
		setTimeout(()=>setId(''), 500)
	};

	const handleDelete = useCallback(async () => {
		await axios({
			method: 'delete',
			url: `https://stg-api.discobiscuits.net/api/songs/${id}`,
			headers: {
				"Content-Type":	"application/json",
				"Authorization": state.token
			}
		});
		enqueueSnackbar("successfully deleted", { variant: 'success' })
		setSongs(songs.filter(song => song.slug !== id))
		handleClose('delete')
	},[enqueueSnackbar, id, songs, state.token])

    return (
        <>	
			<Grid container spacing={3} alignItems="center">
				<Grid item  md={10}>
					<Typography variant='h4'>Songs</Typography>
				</Grid>
				<Grid item md={2}>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<Button variant="contained" color="primary" onClick={() =>handleOpen('form')}>Add Song</Button>
				</div>
				</Grid>
			</Grid>
            <Grid container spacing={3}>
				
                <Grid item xs={12}>
                    <Card title="Song List">
                        <SongList songs={songs} handleOpen={(type: string, id?: string, )=>handleOpen(type, id)}/>
                    </Card>
                </Grid>
				
			</Grid>   
			<Dialog
				open={formOpen}
				onClose={handleClose}
			>
				<DialogTitle>{id ? "Edit Song" : "Add Song"}</DialogTitle>
				<DialogContent>
					<SongForm setSongs={setSongs} songs={songs} id={id} handleClose={() => handleClose('form')}/>
				</DialogContent>
			</Dialog>
			<DeleteConfirm 
				songs={songs} 
				handleClose={() => handleClose('delete')}  
				deleteOpen={deleteOpen} id ={id} 
				handleDelete={handleDelete}
			/>
		</> 
)
}

export default AdminSongs