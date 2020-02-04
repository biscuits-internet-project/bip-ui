import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';
import { Helmet } from "react-helmet"

const Shows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const [setlist, setSetlist] = useState<ISetlist | undefined>(undefined)
	const params = useParams();

	useEffect(()=> {
		setLoading(true)
		const fetchSetlist = async () => {
			const data:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/shows/${params.id}`)
			setSetlist(data.data)
			setLoading(false)
		}
		fetchSetlist()
	}, [params.id])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			<Helmet>
				<title>Biscuits Internet Project - Shows - </title>
			</Helmet>
			<div className="setlist">
				{setlist && 
					<Setlist key={setlist.slug} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
				}
			</div>
		</>

	)
}

export default Shows;  