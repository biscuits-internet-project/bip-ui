import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import AddSong from './AddSong'

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

const Songs: React.FC = () => {
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
			<h1>Songs</h1>
			{loading && <h3>.....Loading</h3>}
			<AddSong updateSongs={(song: ISong)=> setSongs([song,...songs])}/>
			{songs.map((song: ISong) => {
			return <div key={song.id}>
					  <Link to={"/songs/" + song.slug}>
						{song.title}
					  </Link>
				   </div>
			})}
		</>
	)
}
export default Songs
