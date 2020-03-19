import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { IShow } from './Show';
import Setlist from './Setlist';
import { LinearProgress, Typography, Link } from '@material-ui/core';
import ShowSearch from '../shared/ShowSearch';
import HtmlHead from '../shared/HtmlHead';

const LatestShows: React.FC = () => {
	const [shows, setShows] = useState<IShow[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchShows = async () => {
			const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?last=5`)
			setShows(data.data)
		}
		fetchShows()
	}, [])
	return (
		<>
			<HtmlHead title="" description="Disco Biscuits setlists, reviews, ratings, band history, and more." />
			<div>
				<Typography variant="body1" style={{ fontSize: 16, marginBottom: 10 }}>
					Welcome to the Biscuits Internet Project 2.0 - more content than ever before
					in an easily searchable format. Go ahead...search for something!
					&nbsp;
				 This is just the beginning – follow us on <Link href="https://twitter.com/tdbdotnet" target="blank">twitter</Link> and <Link href="https://instagram.com/tdbdotnet" target="blank">instagram</Link>  for updates on new content and features!
			</Typography>
				<ShowSearch setShows={setShows} setLoading={setLoading}></ShowSearch>
				{loading &&
					<>
						<div style={{ height: 30 }}></div>
						<LinearProgress />
						<div style={{ height: 30 }}></div>
					</>
				}
				{shows.map((show) => {
					return (
						<Setlist key={show.slug} show={show} />
					)
				})}
			</div>
		</>
	)
}

export default LatestShows;