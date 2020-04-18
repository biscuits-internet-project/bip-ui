import React, { useEffect, useCallback, useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { fetchPosts, deletePostAsync } from '../../stores/blog/actions'
import { draftPostsSelector } from '../../stores/blog/selectors'
import {
  Link,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import BlogForm from './BlogForm'

const Blog: React.FC = () => {
  const { state } = useContext(AppContext)
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const dispatch = useDispatch()
  const posts = useSelector(draftPostsSelector)
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
    dispatch(fetchPosts(state.currentUser))
  }, [])

  useEffect(() => {
    createPostLoading === false && setFormOpen(false)
    updatePostLoading === false && setFormOpen(false)
  }, [createPostLoading, updatePostLoading])

  console.log(state.currentUser)

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
      <h1>Blog</h1>
      {posts.map((post) => (
        <div>
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
          <button onClick={() => handleEdit(post.id)}>edit</button>
          <button onClick={() => handleDelete(post.id)}>delete</button>
        </div>
      ))}
      <button onClick={handleOpen}>Add Blog</button>
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
