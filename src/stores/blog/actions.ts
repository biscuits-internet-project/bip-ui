import axios, { AxiosResponse } from 'axios'
import { IPost } from './types'
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_FULFILLED = 'GET_POSTS_FULFILLED'
export const GET_POSTS_REJECTED = 'GET_POSTS_REJECTED'

export const getPosts = () => ({ type: GET_POSTS_REQUEST } as const)

export const getPostsFulfilled = (payload: IPost[]) =>
  ({ type: GET_POSTS_FULFILLED, payload } as const)

export const getPostsRejected = () => ({ type: GET_POSTS_REJECTED } as const)

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
