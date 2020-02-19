import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import Tracklist, {ITrack} from './Tracklist';
import { Helmet } from "react-helmet"
import { Typography, Link, Card, CardContent } from '@material-ui/core';
import Moment from 'react-moment';
import PageHeading from './shared/PageHeading';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export interface IShow {
	slug: string
	notes: string
	date: string
	youtube_ids: string[]
	relisten_url: string
	likes_count: number
	venue: { id: string, slug: string, name: string, city: string, state: string }
	tracks: ITrack[]
}

interface IImage {
  src: string
  srcSet?: string[]
  height: number
  width: number
  title: string
  sizes: string[]
}

const Shows: React.FC = () => {

	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState<IShow | undefined>(undefined)
	const [photos, setPhotos] = useState<IImage[]>([])
	const params = useParams();

	useEffect(()=> {
		setLoading(true)
		const fetchPhotos = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}/photos`)
			const imgs: IImage[] = data.data.map(obj => {
				return {
					src: obj.url,
					srcSet: obj.src_set,
					sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
					width: obj.width,
					height: obj.height
				}
			});
			setPhotos(imgs)
		}
		const fetchShow = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`)
			setShow(data.data)
			setLoading(false)
		}
		fetchPhotos()
		fetchShow()
	}, [params.id])
	return (
		<>
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
				{loading && <h3>.....Loading</h3>}
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
				{show.youtube_ids.map((id) => {
					return (
						<div
							className="video"
							style={{
								position: "relative",
								paddingBottom: "56.25%" /* 16:9 */,
								paddingTop: 25,
								height: 0,
								marginTop: 30
							}}
						>
							<iframe
								title={show.date}
								style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%"
								}}
								src={`https://www.youtube.com/embed/${id}`}
								frameBorder="0"
							/>
						</div>
					)
				})}
				<div style={{height: 30}}></div>
				<div>
					<Gallery photos={photos} onClick={openLightbox} />
					<ModalGateway>
						{viewerIsOpen ? (
						<Modal onClose={closeLightbox}>
							<Carousel
							currentIndex={currentImage}
							views={photos.map(x => ({
								...x,
								srcset: x.srcSet,
								caption: x.title
							}))}
							/>
						</Modal>
						) : null}
					</ModalGateway>
				</div>
			</>
			}
		</>

	)
}

export default Shows;