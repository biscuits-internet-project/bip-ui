import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { IShow } from "./shows/Show";
import Setlist from "./shows/Setlist";
import {
  Typography,
  Link,
  Grid,
  Box,
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ShowSearch from "./shared/ShowSearch";
import HtmlHead from "./shared/HtmlHead";
import ProgressBar from "./shared/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { publishedPostsSelector } from "../stores/blog/selectors";
import { RootState } from "../stores/reducers";
import { fetchPosts } from "../stores/blog/actions";
import { AppContext } from "../context/AppProvider";
import BlogCard from "./blog/BlogCard";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    setlists: {
      order: 1,
      [theme.breakpoints.down("sm")]: {
        order: 1,
      },
    },
    blog: {
      order: 2,
      [theme.breakpoints.down("sm")]: {
        order: 2,
      },
    },
  })
);

const Home: React.FC = () => {
  const { state } = useContext(AppContext);
  const [shows, setShows] = useState<IShow[]>([]);
  const [searchShows, setSearchShows] = useState<IShow[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const dispatch = useDispatch();
  const publishedPosts = useSelector(publishedPostsSelector);
  const postsLoading = useSelector((state: RootState) => state.loading.GET_POSTS);
  const classes = useStyles();
  const theme = useTheme();

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
        <ShowSearch setShows={setSearchShows} setLoading={setSearchLoading}></ShowSearch>
        <Grid container spacing={4}>
          <Grid item md={8} className={classes.setlists}>
            {searchLoading && <ProgressBar />}
            {searchShows.map((show) => {
              return <Setlist key={show.slug} show={show} />;
            })}

            <Typography variant="h2">Recent Shows</Typography>
            <div style={{ height: 10 }}></div>
            {shows.map((show) => {
              return <Setlist key={show.slug} show={show} />;
            })}
          </Grid>
          <Grid item md={4} className={classes.blog}>
            <Typography variant="h2">A Clamouring Sound</Typography>
            <div style={{ height: 10 }}></div>
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
