import React, { useEffect, useCallback, useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { useParams } from 'react-router-dom'
import { getPostByIdAsync } from '../../stores/blog/actions'

import {
  Link,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import Comments from './Comments'

const BlogPost: React.FC = () => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const { postId } = useParams()

  const post = useSelector((state: RootState) => state.blog.postsById[postId])
  const loading = useSelector(
    (state: RootState) => state.loading.GET_POST_BY_ID,
  )
  const error = useSelector((state: RootState) => state.error.GET_POST_BY_ID)
  useEffect(() => {
    dispatch(getPostByIdAsync(postId, state.currentUser))
  }, [])
  console.log(loading)
  if (loading !== false) {
    return <div>loading</div>
  }
  if (error && error.error) {
    return <div>Error!</div>
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <h5>{post.blurb}</h5>
      <img src={post.primary_image_url} width={300} />
      {/* need to dangerously_set_html */}
      <div>{post.content}</div>
      <Comments id={postId} user={state.currentUser} />
    </div>
  )
}
export default BlogPost
