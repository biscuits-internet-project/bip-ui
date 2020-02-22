import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import Tracklist, {ITrack} from './Tracklist';
import { Helmet } from "react-helmet"
import YouTube from 'react-youtube';
import { Typography, Link, Card, CardContent } from '@material-ui/core';
import Moment from 'react-moment';

export interface IShow {
	slug: string
	notes: string
	date: string
	youtube_id: string
	relisten_url: string
	likes_count: number
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

const Shows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState<IShow | undefined>(undefined)
	const params = useParams();
	const youtubeOpts = {
		height: '390',
		width: '640',
		playerVars: { // https://developers.google.com/youtube/player_parameters
		  autoplay: 0
		}
	  };

	useEffect(()=> {
		setLoading(true)
		const fetchSetlist = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`)
			setShow(data.data)
			setLoading(false)
		}
		fetchSetlist()
	}, [params.id])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			{show &&
			<>
				<Helmet>
					<title>Biscuits Internet Project - Shows - </title>
				</Helmet>
				<h1>
					<Moment format="MMMM D, YYYY">
						{show.date}
					</Moment>
					<span> at {show.venue.name} - {show.venue.city}, {show.venue.state}</span>
				</h1>
				<div>
					{/* <div>{show.likes_count} likes </div> */}
					{show.notes &&
						<div>
							<Typography variant="body2" dangerouslySetInnerHTML={{__html: show.notes}} />
							<br/>
						</div>
					}

					{show.relisten_url &&
						<div>
							<Link target="blank" href={show.relisten_url}>{show.relisten_url}</Link>
							<br/>
							<br/>
						</div>
					}

					<Card>
						<CardContent>
							<Tracklist key={show.slug} tracks={show.tracks} />
						</CardContent>
					</Card>
				</div>
				<div>
					{show.youtube_id &&
						<YouTube
							videoId={show.youtube_id}
							opts={youtubeOpts}
						/>
					}
				</div>
			</>
			}
		</>

	)
}

export default Shows;