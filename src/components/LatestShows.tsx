import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';
import PageHeading from './shared/PageHeading';

const LatestShows: React.FC = () => {
	const [setlists, setSetlists] = useState<ISetlist[]>([])

	useEffect(()=> {
		const fetchSetlists = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?last=5`)
			setSetlists(data.data)
		}
		fetchSetlists()
	},[])
	return (
		<div>
			<PageHeading text="Latest Shows"/>
			{setlists.map((setlist) => {
				return (
					<Setlist key={setlist.slug} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
				)
			})}
		</div>
	)
}

export default LatestShows;