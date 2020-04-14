import axios, { AxiosResponse } from 'axios'
import { IPost } from './types'

//GET POSTS
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_FULFILLED = 'GET_POSTS_FULFILLED'
export const GET_POSTS_REJECTED = 'GET_POSTS_REJECTED'

export const getPosts = () => ({ type: GET_POSTS_REQUEST } as const)

export const getPostsFulfilled = (payload: IPost[]) =>
  ({ type: GET_POSTS_FULFILLED, payload } as const)

export const getPostsRejected = () => ({ type: GET_POSTS_REJECTED } as const)

//CREATE POST
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_FULFILLED = 'CREATE_POST_FULFILLED'
export const CREATE_POST_REJECTED = 'CREATE_POST_REJECTED'

export const createPost = (payload: IPost) =>
  ({ type: CREATE_POST_REQUEST, payload } as const)

export const createPostFulfilled = (payload: IPost) =>
  ({ type: CREATE_POST_FULFILLED, payload } as const)

export const createPostRejected = () =>
  ({ type: CREATE_POST_REJECTED } as const)

//ASYNC ACTIONS
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(getPosts())
    const venues: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/blog_posts?state=published`,
    )
    dispatch(getPostsFulfilled(venues.data))
  }
}

export const createPostAsync = (post: IPost, currentUser) => {
  return async (dispatch) => {
    dispatch(createPost(post))
    const newPost: AxiosResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/blog_posts`,
      data: post,
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })

    dispatch(createPostFulfilled(newPost.data))
  }
}
