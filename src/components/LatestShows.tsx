import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';
import PageHeading from './shared/PageHeading';
import { Grid, LinearProgress } from '@material-ui/core';
import ShowSearch from './shared/ShowSearch';

const LatestShows: React.FC = () => {
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(()=> {
		const fetchSetlists = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?last=5`)
			setSetlists(data.data)
		}
		fetchSetlists()
	},[])
	return (
		<div>
			<Grid container style={{marginBottom: 10}}>
				<Grid item md={4}>
					<PageHeading text="Latest Shows"/>
				</Grid>
				<Grid item container md={8} justify="flex-end">
					<ShowSearch setSetlists={setSetlists} setLoading={setLoading}></ShowSearch>
				</Grid>
			</Grid>
			{loading &&
				<>
					<div style={{ height: 30 }}></div>
					<LinearProgress />
					<div style={{ height: 30 }}></div>
				</>
			}
			{setlists.map((setlist) => {
				return (
					<Setlist key={setlist.slug} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
				)
			})}
		</div>
	)
}

export default LatestShows;