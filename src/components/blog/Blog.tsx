import React, { useEffect, useCallback, useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { useHistory } from 'react-router-dom'

import {
  fetchPosts,
  deletePostAsync,
  createCommentAsync,
} from '../../stores/blog/actions'
import {
  draftPostsSelector,
  publishedPostsSelector,
} from '../../stores/blog/selectors'
import {
  Link,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import BlogForm from './BlogForm'
import Comments from './Comments'

const Blog: React.FC = () => {
  const { state } = useContext(AppContext)
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const publishedPosts = useSelector(publishedPostsSelector)
  const draftPosts = useSelector(draftPostsSelector)
  const postsLoading = useSelector(
    (state: RootState) => state.loading.GET_POSTS,
  )
  const createPostLoading = useSelector(
    (state: RootState) => state.loading.CREATE_POST,
  )

  const updatePostLoading = useSelector(
    (state: RootState) => state.loading.UPDATE_POST,
  )

  useEffect(() => {
    // These will likely be in different components when styling is polished
    dispatch(fetchPosts(state.currentUser, 'published'))
    dispatch(fetchPosts(state.currentUser, 'draft'))
  }, [])

  useEffect(() => {
    createPostLoading === false && setFormOpen(false)
    updatePostLoading === false && setFormOpen(false)
  }, [createPostLoading, updatePostLoading])

  if (postsLoading) {
    return <h1>Loading....</h1>
  }
  const handleOpen = () => {
    setEditId(null)
    setFormOpen(true)
  }
  const handleEdit = (id) => {
    setFormOpen(true)
    setEditId(id)
  }
  const handleDelete = (id) => {
    dispatch(deletePostAsync(id, state.currentUser))
  }

  const handleClose = () => {
    setFormOpen(false)
  }
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add New Post
      </Button>
      <h1>Published Posts</h1>
      {publishedPosts.map((post) => (
        <div
          onClick={() => history.push(`/blog/${post.id}`)}
          style={{
            border: '1px solid white',
            margin: '16px 0px',
            cursor: 'pointer',
          }}
        >
          <img
            width="60px"
            height="60px"
            src={
              post.primary_image_url
                ? post.primary_image_url
                : 'https://cdn3.iconfinder.com/data/icons/christmas-flat-square-rounded-vol-3/150/cookies__biscuits__sweets__cake-512.png'
            }
          />
          {post.title}, {post.blurb}, {post.content}, {post.state}{' '}
          {/* We can conditionally render these depending on roles/user etc. */}
          <button onClick={() => handleEdit(post.id)}>edit</button>
          <button onClick={() => handleDelete(post.id)}>delete</button>
        </div>
      ))}
      <h1>Draft Posts</h1>
      {draftPosts.map((post) => (
        <div
          onClick={() => history.push(`/blog/${post.id}`)}
          style={{
            border: '1px solid white',
            margin: '16px 0px',
            cursor: 'pointer',
          }}
        >
          <img
            width="60px"
            height="60px"
            src={
              post.primary_image_url
                ? post.primary_image_url
                : 'https://cdn3.iconfinder.com/data/icons/christmas-flat-square-rounded-vol-3/150/cookies__biscuits__sweets__cake-512.png'
            }
          />
          {post.title}, {post.blurb}, {post.content}, {post.state}{' '}
          {/* We can conditionally render these depending on roles/user etc. */}
          <button onClick={() => handleEdit(post.id)}>edit</button>
          <button onClick={() => handleDelete(post.id)}>delete</button>
        </div>
      ))}
      <Dialog open={formOpen} onClose={() => handleClose()}>
        <DialogTitle>Add Song</DialogTitle>
        <DialogContent>
          <BlogForm editId={editId} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default Blog
