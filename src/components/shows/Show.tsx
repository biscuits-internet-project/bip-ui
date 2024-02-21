import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ITrack } from "./Tracklist";
import { Typography, Grid } from "@material-ui/core";
import Moment from "react-moment";
import PageHeading from "../shared/PageHeading";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { AppContext } from "../../context/AppProvider";
import LinkButton from "../shared/LinkButton";
import HtmlHead from "../shared/HtmlHead";
import Setlist from "./Setlist";
import ShowReviews from "./Reviews";
import moment from "moment";

export interface IShow {
  id: string;
  slug: string;
  notes: string;
  date: Date;
  venue_id: string;
  youtube_ids: string[];
  relisten_url: string;
  likes_count: number;
  venue: { id: string; slug: string; name: string; city: string; state: string };
  tracks: ITrack[];
  year: number;
  average_rating: number;
  ratings_count: number;
  show_photos_count: number;
  reviews_count: number;
  show_youtubes_count: number;
}

export interface IRating {
  rateable_id: string;
  rateable_type: string;
  value: number;
}

interface IImage {
  source: string;
  src: string;
  srcSet?: string[];
  height: number;
  width: number;
  title: string;
  sizes: string[];
}

const Show: React.FC = () => {
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  const admin = currentUser?.roles.includes("admin");
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [firstThumbUrl, setFirstThumbUrl] = useState("");

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const [show, setShow] = useState<IShow | undefined>(undefined);
  const [photos, setPhotos] = useState<IImage[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchPhotos = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}/photos`);
      const imgs: IImage[] = data.data.map((obj) => {
        setFirstThumbUrl(obj.thumb_url);
        return {
          source: obj.url,
          src: obj.url,
          srcSet: obj.src_set,
          sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
          width: obj.width,
          height: obj.height,
        };
      });
      setPhotos(imgs);
    };
    const fetchShow = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`);
      setShow(data.data);
    };
    fetchPhotos();
    fetchShow();
  }, [params.id]);
  return (
    <>
      {show && (
        <>
          <HtmlHead
            title={`${moment(show.date).format("M/D/YY")} - ${show.venue.city}, ${show.venue.state} - ${
              show.venue.name
            } - DiscoBiscuits.net`}
            description={`Setlist, photos, and reviews of The Disco Biscuits show from ${show.date} at ${show.venue.name}`}
            image_url={firstThumbUrl ? firstThumbUrl : undefined}
            hide_title_prefix={true}
          />
          <Grid container justify="space-between">
            <Grid item>
              <PageHeading
                text={
                  <>
                    <Moment format="M/D/YY">{show.date}</Moment>
                    <span>
                      {" "}
                      at {show.venue.name} - {show.venue.city}, {show.venue.state}
                    </span>
                  </>
                }
              />
            </Grid>
            <Grid item>
              {admin && (
                <div style={{ alignContent: "right" }}>
                  <LinkButton text="Edit Show" to={`/admin/shows/edit/${show.slug}`} />
                </div>
              )}
            </Grid>
          </Grid>

          {show.notes && (
            <div>
              <Typography variant="body2" dangerouslySetInnerHTML={{ __html: show.notes }} />
              <br />
            </div>
          )}

          <Setlist show={show} />

          <ShowReviews show={show} />

          {show.youtube_ids.map((id) => {
            return (
              <div
                key={id}
                className="video"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0,
                  marginTop: 30,
                }}
              >
                <iframe
                  title={id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://www.youtube.com/embed/${id}`}
                  frameBorder="0"
                />
              </div>
            );
          })}
          <div style={{ height: 30 }}></div>
          <div>
            <Gallery photos={photos} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={photos.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </>
      )}
    </>
  );
};

export default Show;
