import React, {useState, useEffect} from 'react';
import axios, { AxiosResponse } from 'axios'
import Wrap from './Wrap';

interface ISong {
	id: string,
	author_id: string,
	author_name: string,
	cover: boolean,
	lyrics: string,
	notes: string,
	slug: string,
	tabs: string,
	title: string
}

const Songs: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [songs, setSongs] = useState<ISong[]>([])
	useEffect(()=> {
		setLoading(true)
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get('https://bip-api-staging.herokuapp.com/api/songs')
			setSongs(data.data)
			setLoading(false)
		}
		fetchSongs()
	},[])
	return (
		<Wrap>
			<h1>Songs</h1>
			{loading && <h3>.....Loading</h3>}
			{songs.map((song: ISong) => {
			return <h5 key={song.id}>{song.title}</h5>
			})}
		</Wrap>
	)
}
export default Songs
