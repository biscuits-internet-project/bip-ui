import axios, { AxiosResponse } from 'axios'
import { IBlogPost } from './types'

//GET POSTS
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_FULFILLED = 'GET_POSTS_FULFILLED'
export const GET_POSTS_REJECTED = 'GET_POSTS_REJECTED'

export const getPosts = () => ({ type: GET_POSTS_REQUEST } as const)

export const getPostsFulfilled = (payload: IBlogPost[]) =>
  ({ type: GET_POSTS_FULFILLED, payload } as const)

export const getPostsRejected = () => ({ type: GET_POSTS_REJECTED } as const)

//CREATE POST
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_FULFILLED = 'CREATE_POST_FULFILLED'
export const CREATE_POST_REJECTED = 'CREATE_POST_REJECTED'

export const createPost = (payload: IBlogPost) =>
  ({ type: CREATE_POST_REQUEST, payload } as const)

export const createPostFulfilled = (payload: IBlogPost) =>
  ({ type: CREATE_POST_FULFILLED, payload } as const)

export const createPostRejected = () =>
  ({ type: CREATE_POST_REJECTED } as const)

//UPDATE POST
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
export const UPDATE_POST_FULFILLED = 'UPDATE_POST_FULFILLED'
export const UPDATE_POST_REJECTED = 'UPDATE_POST_REJECTED'

export const updatePost = (payload: IBlogPost) =>
  ({ type: UPDATE_POST_REQUEST, payload } as const)

export const updatePostFulfilled = (payload: IBlogPost) =>
  ({ type: UPDATE_POST_FULFILLED, payload } as const)

export const updatePostRejected = () =>
  ({ type: UPDATE_POST_REJECTED } as const)

//DELETE POST
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED'
export const DELETE_POST_REJECTED = 'DELETE_POST_REJECTED'

export const deletePost = (payload: string) =>
  ({ type: DELETE_POST_REQUEST, payload } as const)

export const deletePostFulfilled = (payload: string) =>
  ({ type: DELETE_POST_FULFILLED, payload } as const)

export const deletePostRejected = () =>
  ({ type: DELETE_POST_REJECTED } as const)

//CREATE COMMENT
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST'
export const CREATE_COMMENT_FULFILLED = 'CREATE_COMMENT_FULFILLED'
export const CREATE_COMMENT_REJECTED = 'CREATE_COMMENT_REJECTED'

export const createComment = (payload) =>
  ({ type: CREATE_COMMENT_REQUEST, payload } as const)

export const createCommentFulfilled = (payload) =>
  ({ type: CREATE_COMMENT_FULFILLED, payload } as const)

export const createCommentRejected = () =>
  ({ type: CREATE_COMMENT_REJECTED } as const)

//ASYNC ACTIONS
export const fetchPosts = (currentUser, type = 'published') => {
  return async (dispatch) => {
    dispatch(getPosts())
    const venues: AxiosResponse = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/blog_posts?state=${type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })
    dispatch(getPostsFulfilled(venues.data))
  }
}

export const createPostAsync = (post: IBlogPost, currentUser) => {
  const formData = new FormData()
  Object.keys(post).forEach((key) => formData.append(key, post[key]))
  return async (dispatch) => {
    dispatch(createPost(post))
    const newPost: AxiosResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/blog_posts`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: currentUser?.token,
      },
    })

    dispatch(createPostFulfilled(newPost.data))
  }
}

export const updatePostAsync = (post: IBlogPost, currentUser) => {
  const formData = new FormData()
  Object.keys(post).forEach((key) => formData.append(key, post[key]))
  return async (dispatch) => {
    dispatch(updatePost(post))
    const updatedPost: AxiosResponse = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/blog_posts/${post.id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: currentUser?.token,
      },
    })

    dispatch(updatePostFulfilled(updatedPost.data))
  }
}

export const deletePostAsync = (id: string, currentUser) => {
  return async (dispatch) => {
    dispatch(deletePost(id))
    const updatedPost: AxiosResponse = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/blog_posts/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: currentUser?.token,
      },
    })

    dispatch(deletePostFulfilled(id))
  }
}

export const createCommentAsync = (id, text, currentUser) => {
  return async (dispatch) => {
    dispatch(createComment(id))
    const comment: AxiosResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/blog_posts/${id}/comments`,
      data: {
        content: text,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })

    dispatch(createCommentFulfilled({ id, comment: comment.data }))
  }
}
