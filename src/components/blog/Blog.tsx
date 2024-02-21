import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/reducers";

import { fetchPosts, deletePostAsync } from "../../stores/blog/actions";
import { draftPostsSelector, publishedPostsSelector } from "../../stores/blog/selectors";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import BlogForm from "./BlogForm";
import HtmlHead from "../shared/HtmlHead";
import PageHeading from "../shared/PageHeading";
import BlogCard from "./BlogCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "auto",
    },
    media: {
      maxHeight: 150,
      minHeight: 150,
      transition: "all 1s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    headingImage: {
      [theme.breakpoints.down("md")]: {
        width: "400px",
      },
      [theme.breakpoints.up("md")]: {
        width: `524px`,
      },
    },
  })
);

const Blog: React.FC = () => {
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  const admin = currentUser?.roles.includes("admin");
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const publishedPosts = useSelector(publishedPostsSelector);
  const draftPosts = useSelector(draftPostsSelector);
  const postsLoading = useSelector((state: RootState) => state.loading.GET_POSTS);
  const createPostLoading = useSelector((state: RootState) => state.loading.CREATE_POST);
  const updatePostLoading = useSelector((state: RootState) => state.loading.UPDATE_POST);
  const classes = useStyles();

  useEffect(() => {
    // These will likely be in different components when styling is polished
    dispatch(fetchPosts(state.currentUser, "published"));
    if (admin) {
      dispatch(fetchPosts(state.currentUser, "draft"));
    }
  }, []);

  useEffect(() => {
    createPostLoading === false && setFormOpen(false);
    updatePostLoading === false && setFormOpen(false);
  }, [createPostLoading, updatePostLoading]);

  if (postsLoading) {
    return <Typography>Loading....</Typography>;
  }
  const handleOpen = () => {
    setEditId(null);
    setFormOpen(true);
  };
  const handleEdit = (id) => {
    setFormOpen(true);
    setEditId(id);
  };
  const handleDelete = (id) => {
    dispatch(deletePostAsync(id, state.currentUser));
  };
  const handleClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      <HtmlHead
        title={`A Clamouring Sound - Disco Biscuits Blog`}
        description={`Original long-form articles on all things Disco Biscuits`}
      />
      <Grid container justify="space-between">
        <Grid item>
          <img src="/acs.png" className={classes.headingImage} />
        </Grid>
        <Grid item>
          {admin && (
            <div style={{ alignContent: "right" }}>
              <Button variant="text" onClick={handleOpen}>
                Add New Post
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      <div style={{ height: "20px" }}></div>
      <Grid container spacing={3} alignItems="stretch">
        {publishedPosts.map((post) => (
          <Grid item xs={12} sm={8} md={4} lg={3} xl={2} style={{ display: "flex", height: "auto" }}>
            <BlogCard
              post={post}
              handleEdit={() => handleEdit(post.slug)}
              handleDelete={() => handleDelete(post.slug)}
            ></BlogCard>
          </Grid>
        ))}
      </Grid>
      {admin && draftPosts.length > 0 && (
        <>
          <Typography variant="h2" style={{ marginTop: 20, marginBottom: 20 }}>
            Drafts
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {draftPosts.map((post) => (
              <Grid item xs={12} sm={8} md={4} lg={3} xl={2} style={{ display: "flex", height: "auto" }}>
                <BlogCard
                  post={post}
                  handleEdit={() => handleEdit(post.slug)}
                  handleDelete={() => handleDelete(post.slug)}
                ></BlogCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Dialog open={formOpen} onClose={() => handleClose()} maxWidth="md" fullWidth>
        <DialogTitle>{editId ? "Edit" : "Create"} Post</DialogTitle>
        <DialogContent>
          <BlogForm editId={editId} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Blog;
