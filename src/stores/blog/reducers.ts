import createReducer from '../../lib/createReducer'
import { IPost, BlogState } from './types'
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
    data.forEach((venue: IPost) => {
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
})
