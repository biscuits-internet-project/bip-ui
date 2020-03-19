import createReducer from '../../lib/createReducer'
import { IBlogPost, BlogState } from './types'
import * as actions from './actions'

const initialState: BlogState = {
  postsById: {},
}

export default createReducer(initialState, {
  [actions.GET_POSTS_REQUEST]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.GET_POSTS_FULFILLED]: (
    state: BlogState,
    action: ReturnType<typeof actions.getPostsFulfilled>,
  ) => {
    const postsById = { ...state.postsById }
    const data = action.payload
    data.forEach((venue: IBlogPost) => {
      postsById[`${venue.id}`] = {
        ...postsById[`${venue.id}`],
        ...venue,
      }
    })
    const newState = {
      ...state,
      postsById,
    }
    return newState
  },
  [actions.GET_POSTS_REJECTED]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_POST_REQUEST]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_POST_FULFILLED]: (
    state: BlogState,
    action: ReturnType<typeof actions.createPostFulfilled>,
  ) => {
    const postsById = { ...state.postsById }
    const newPost = action.payload
    if (newPost) {
      const newState = {
        ...state,
        postsById: { [`${newPost.id}`]: newPost, ...postsById },
      }
      return newState
    }
  },
  [actions.CREATE_POST_REJECTED]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.UPDATE_POST_REQUEST]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.UPDATE_POST_FULFILLED]: (
    state: BlogState,
    action: ReturnType<typeof actions.updatePostFulfilled>,
  ) => {
    const postsById = { ...state.postsById }
    const newPost = action.payload
    if (newPost) {
      const newState = {
        ...state,
        postsById: { ...postsById, [`${newPost.id}`]: newPost },
      }
      return newState
    }
  },
  [actions.CREATE_POST_REJECTED]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.DELETE_POST_REQUEST]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.DELETE_POST_FULFILLED]: (
    state: BlogState,
    action: ReturnType<typeof actions.deletePostFulfilled>,
  ) => {
    const postsById = { ...state.postsById }
    delete postsById[action.payload]
    return {
      ...state,
      postsById,
    }
  },
  [actions.DELETE_POST_REJECTED]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_COMMENT_REQUEST]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_COMMENT_FULFILLED]: (
    state: BlogState,
    action: ReturnType<typeof actions.createCommentFulfilled>,
  ) => {
    const newState = { ...state }
    const post = newState.postsById[action.payload.id]
    // FIX when comments is returned
    const comments = post.comments ? post.comments : []
    post.comments = [...comments, action.payload.comment]
    return newState
  },
  [actions.CREATE_COMMENT_REJECTED]: (state: BlogState) => {
    const newState = { ...state }
    return newState
  },
})
