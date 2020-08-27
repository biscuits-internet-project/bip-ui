import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { IShow } from "./shows/Show";
import Setlist from "./shows/Setlist";
import { Typography, Link, Grid, Box } from "@material-ui/core";
import ShowSearch from "./shared/ShowSearch";
import HtmlHead from "./shared/HtmlHead";
import ProgressBar from "./shared/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { publishedPostsSelector } from "../stores/blog/selectors";
import { RootState } from "../stores/reducers";
import { fetchPosts } from "../stores/blog/actions";
import { AppContext } from "../context/AppProvider";
import BlogCard from "./blog/BlogCard";

const Home: React.FC = () => {
  const { state } = useContext(AppContext);
  const [shows, setShows] = useState<IShow[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const publishedPosts = useSelector(publishedPostsSelector);
  const postsLoading = useSelector((state: RootState) => state.loading.GET_POSTS);

  useEffect(() => {
    dispatch(fetchPosts(state.currentUser, "published"));
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?last=5`);
      setShows(data.data);
    };
    fetchShows();
  }, []);

  if (postsLoading) {
    return <Typography>Loading....</Typography>;
  }

  return (
    <>
      <HtmlHead title="" description="Disco Biscuits setlists, reviews, ratings, band history, and more." />
      <div>
        <Typography variant="body1" style={{ fontSize: 16, marginBottom: 15 }}>
          Welcome to the Biscuits Internet Project 2.0 - more content than ever before in an easily searchable format.
          Go ahead...search for something! &nbsp; This is just the beginning – follow us on{" "}
          <Link href="https://twitter.com/tdbdotnet" target="blank">
            twitter
          </Link>{" "}
          and{" "}
          <Link href="https://instagram.com/tdbdotnet" target="blank">
            instagram
          </Link>{" "}
          for updates on new content and features!
        </Typography>

        <Grid container spacing={4}>
          <Grid item md={8}>
            <ShowSearch setShows={setShows} setLoading={setLoading}></ShowSearch>
            {loading && <ProgressBar />}
            {shows.map((show) => {
              return <Setlist key={show.slug} show={show} />;
            })}
          </Grid>
          <Grid item md={4}>
            {publishedPosts.slice(0, 5).map((post) => (
              <>
                <Box style={{ marginBottom: 20 }}>
                  <BlogCard post={post} handleEdit={() => {}} handleDelete={() => {}}></BlogCard>
                </Box>
              </>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
