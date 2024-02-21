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

//GET POST BY ID
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const GET_POST_BY_ID_REQUEST = 'GET_POST_BY_ID_REQUEST'
export const GET_POST_BY_ID_FULFILLED = 'GET_POST_BY_ID_FULFILLED'
export const GET_POST_BY_ID_REJECTED = 'GET_POST_BY_ID_REJECTED'

export const getPostById = () => ({ type: GET_POST_BY_ID_REQUEST } as const)
export const getPostByIdFulfilled = (payload: IBlogPost) =>
  ({ type: GET_POST_BY_ID_FULFILLED, payload } as const)
export const getPostByIdRejected = (payload) =>
  ({ type: GET_POST_BY_ID_REJECTED, payload } as const)

//CREATE POST
export const CREATE_POST = 'CREATE_POST'
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_FULFILLED = 'CREATE_POST_FULFILLED'
export const CREATE_POST_REJECTED = 'CREATE_POST_REJECTED'

export const createPost = (payload: IBlogPost) =>
  ({ type: CREATE_POST_REQUEST, payload } as const)

export const createPostFulfilled = (payload: IBlogPost) =>
  ({ type: CREATE_POST_FULFILLED, payload } as const)

export const createPostRejected = (payload) =>
  ({ type: CREATE_POST_REJECTED, payload } as const)

//UPDATEPOST
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
export const UPDATE_POST_FULFILLED = 'UPDATE_POST_FULFILLED'
export const UPDATE_POST_REJECTED = 'UPDATE_POST_REJECTED'

export const updatePost = (payload: IBlogPost) =>
  ({ type: UPDATE_POST_REQUEST, payload } as const)

export const updatePostFulfilled = (payload: IBlogPost) =>
  ({ type: UPDATE_POST_FULFILLED, payload } as const)

export const updatePostRejected = (payload) =>
  ({ type: UPDATE_POST_REJECTED, payload } as const)

//DELETE POST
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED'
export const DELETE_POST_REJECTED = 'DELETE_POST_REJECTED'

export const deletePost = (payload: string) =>
  ({ type: DELETE_POST_REQUEST, payload } as const)

export const deletePostFulfilled = (payload: string) =>
  ({ type: DELETE_POST_FULFILLED, payload } as const)

export const deletePostRejected = (payload) =>
  ({ type: DELETE_POST_REJECTED, payload } as const)

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
    const posts: AxiosResponse = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/blog_posts?state=${type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })
    dispatch(getPostsFulfilled(posts.data))
  }
}

export const getPostByIdAsync = (postSlug, currentUser) => {
  return async (dispatch) => {
    dispatch(getPostById())
    try {
      const post: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/blog_posts/${postSlug}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })
      dispatch(getPostByIdFulfilled(post.data))
    } catch (error) {
      dispatch(getPostByIdRejected(error))
    }
  }
}

export const createPostAsync = {
  name: CREATE_POST,
  func: (post: IBlogPost, currentUser) => {
    const formData = new FormData()
    Object.keys(post).forEach((key) => formData.append(key, post[key]))
    return async (dispatch) => {
      dispatch(createPost(post))

      try {
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
      } catch (error) {
        dispatch(createPostRejected(error))
      }
    }
  },
}

export const updatePostAsync = {
  name: UPDATE_POST,
  func: (post: IBlogPost, currentUser) => {
    const formData = new FormData()
    Object.keys(post).forEach((key) => formData.append(key, post[key]))
    return async (dispatch) => {
      dispatch(updatePost(post))
      try {
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
      } catch (error) {
        dispatch(updatePostRejected(error))
      }
    }
  },
}

export const deletePostAsync = (id: string, currentUser) => {
  return async (dispatch) => {
    dispatch(deletePost(id))
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/blog_posts/${id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: currentUser?.token,
        },
      })

      dispatch(deletePostFulfilled(id))
    } catch (error) {
      dispatch(deletePostRejected(error))
    }
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

// Use this as a model
export const newgetPostByIdAsync = {
  name: GET_POST_BY_ID,
  func: (postSlug: string, currentUser) => async (dispatch) => {
    dispatch(getPostById())
    try {
      const post: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/blog_posts/${postSlug}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })
      dispatch(getPostByIdFulfilled(post.data))
    } catch (error) {
      dispatch(getPostByIdRejected(error))
    }
  },
}
