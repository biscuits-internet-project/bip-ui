import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from '@material-ui/core/Grid';
import TrackForm from './TrackForm'
import TrackList from './TrackList'
import { IVenue } from '../../Venues';
import { IShow } from '../../Show';
import { ISong } from '../songs/AdminSongs';

export interface ITrack {
	id: string,
	slug: string
	note?: string,
	venue?: IVenue
	show?: IShow
}

const AdminTracks = () => {
	const [formOpen, setFormOpen] = useState(false)
	const [id, setId] = useState('')
    const params = useParams();
    const [song, setSong] = useState<ISong | undefined>(undefined)
    const [tracks, setTracks] = useState<ITrack[]>([])

	useEffect(()=> {
		const fetchSong = async () => {
			const song:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/songs/${params.id}`)
			setSong(song.data)

			const tracks:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/tracks/songs/${params.id}`)
			setTracks(tracks.data)
		}
		fetchSong()
	},[params.id])

	const handleOpen = (type: string, id: string) => {
		setId(id)
		setFormOpen(true)
	};

	const handleClose = (type :string) => {
		setFormOpen(false)
		setTimeout(()=>setId(''), 500)
	};

    return (
        <>
			<Grid container spacing={3} alignItems="center">
				<Grid item  md={12}>
					<Typography variant='h4'>Tracks for {song && song.title}</Typography>
				</Grid>
			</Grid>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card title="Track List">
                        <TrackList tracks={tracks} handleOpen={(type: string, id: string, )=>handleOpen(type, id)}/>
                    </Card>
                </Grid>

			</Grid>
			<Dialog
				open={formOpen}
				onClose={() => handleClose('form')}
			>
				<DialogTitle>Edit Track</DialogTitle>
				<DialogContent>
					<TrackForm setTracks={setTracks} tracks={tracks} id={id} handleClose={() => handleClose('form')}/>
				</DialogContent>
			</Dialog>
		</>
)
}

export default AdminTracks