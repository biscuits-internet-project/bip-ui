import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';
import PageHeading from './shared/PageHeading';
import { Grid, LinearProgress, Typography, Link } from '@material-ui/core';
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
			<Typography variant="body1" style={{fontSize: 16, marginBottom: 10 }}>
				Welcome to the Biscuits Internet Project 2.0 - more content than ever before
				 in a easily searchable format. Go ahead...search for something!
				 &nbsp;
				 This is just the beginning – follow us at <span> </span>
				<Link href="https://twitter.com/tdbdotnet" target="blank">@tdbdotnet</Link> for updates on new content and features!
			</Typography>
			<ShowSearch setSetlists={setSetlists} setLoading={setLoading}></ShowSearch>
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