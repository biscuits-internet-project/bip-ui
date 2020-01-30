import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';

const LatestShows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	
	useEffect(()=> {
		setLoading(true)
		const fetchSetlists = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/shows?last=5')
			setSetlists(data.data)
			setLoading(false)
		}
		fetchSetlists()
	},[])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			<div className="setlists">
				<h2 className="setlists__title">Latest Shows</h2>
				<div className="setlists__feed setlists__feed--latest">
					{setlists.map((setlist) => {
						return (
							<Setlist date={setlist.date} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
						)
					})}
				</div>
			</div>
		</>

	)
}

export default LatestShows;