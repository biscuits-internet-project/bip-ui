import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
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
	title: string,
	times_played: number,
	first_time_played: Date,
	last_time_played: Date
}


const Songs: React.FC = () => {

	const params = useParams();
	const [loading, setLoading] = useState(false)
	const [song, setSong] = useState<ISong | undefined>(undefined)
	useEffect(()=> {
		setLoading(true)
		const fetchSong = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs/' + params.id)
			setSong(data.data)
			setLoading(false)
		}
		fetchSong()
	},[])
	return (
		<Wrap>
			{loading && <h3>.....Loading</h3>}
			{song && 
				<div>
					<h1>{song.title}</h1>
					<div>number of times played: {song.times_played}</div>
					<div>first time played: {song.first_time_played}</div>
					<div>last time played: {song.last_time_played}</div>
				</div>
			}
		</Wrap>
	)
}
export default Songs
