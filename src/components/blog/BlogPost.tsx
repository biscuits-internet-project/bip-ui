import React, { useEffect, useCallback, useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { useParams } from 'react-router-dom'
import {
  getPostByIdAsync,
  newgetPostByIdAsync,
} from '../../stores/blog/actions'
import useAsync from './useAsync'

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
  // These can be name whatever you want but need to be in that order e.g
  // [dispatchSinglePost, singlePostLoading, singlePostError, singlePostSuccess] = useAsync(/*this is the name of the object from the actions file*/)
  const [dispatchFunc, loading, error, success] = useAsync(newgetPostByIdAsync)
  const { state } = useContext(AppContext)
  const { postId } = useParams()
  const post = useSelector((state: RootState) => state.blog.postsById[postId])
  useEffect(() => {
    if (success) alert('do something if the request is a success')
  }, [success])
  useEffect(() => {
    dispatchFunc(postId, state.currentUser)
  }, [])
  if (error) {
    return <div>Error!</div>
  }
  if (loading || !post) {
    return <div>loading</div>
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <h5>{post.blurb}</h5>
      <img src={post.primary_image_url} width={300} />
      {/* need to dangerously_set_html */}
      <div>{post.content}</div>
      {/* add chips somewhere */}
      <Comments id={postId} user={state.currentUser} />
    </div>
  )
}
export default BlogPost
