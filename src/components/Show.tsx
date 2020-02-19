import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import Tracklist, {ITrack} from './Tracklist';
import { Helmet } from "react-helmet"
import YouTube from 'react-youtube';
import { Typography, Link, Card, CardContent, GridList, GridListTile, makeStyles, Theme, createStyles } from '@material-ui/core';
import Moment from 'react-moment';
import PageHeading from './shared/PageHeading';
import ImageGallery from 'react-image-gallery';

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

interface IShowPhoto {
	url: string
}

interface IImage {
	original: string
	thumbnail: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }),
);

const Shows: React.FC = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState<IShow | undefined>(undefined)
	const [images, setImages] = useState<IImage[]>([])
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
		const fetchPhotos = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}/photos`)

			var images = data.data.map(obj =>{
				return { thumbnail: obj.url, original: obj.url }
			 });

			setImages(images)
			setLoading(false)
		}
		const fetchSetlist = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`)
			setShow(data.data)
			setLoading(false)
		}
		fetchSetlist()
		fetchPhotos()
	}, [params.id])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			{show &&
			<>
				<Helmet>
					<title>Biscuits Internet Project - Shows - {show.date} at {show.venue.name} - {show.venue.city}, {show.venue.state}</title>
				</Helmet>
				<PageHeading text={
					<>
						<Moment format="MMMM D, YYYY">
							{show.date}
						</Moment>
						<span> at {show.venue.name} - {show.venue.city}, {show.venue.state}</span>
					</>
				} />
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


				<Typography>Photos</Typography>
				<ImageGallery items={images} />;

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