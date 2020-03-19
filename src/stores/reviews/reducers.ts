import createReducer from '../../lib/createReducer'
import { IReview, ReviewState } from './types'
import * as actions from './actions'

const initialState: ReviewState = {
  reviewsById: {},
}

export default createReducer(initialState, {
  [actions.GET_REVIEWS_REQUEST]: (state: ReviewState) => {
    const newState = { ...state }
    return newState
  },
  [actions.GET_REVIEWS_FULFILLED]: (
    state: ReviewState,
    action: ReturnType<typeof actions.getReviewsFulfilled>,
  ) => {
    const reviewsById = { ...state.reviewsById }
    const data = action.payload
    data.forEach((review: IReview) => {
      reviewsById[`${review.id}`] = {
        ...reviewsById[`${review.id}`],
        ...review,
      }
    })
    const newState = {
      ...state,
      reviewsById,
    }
    return newState
  },
  [actions.CREATE_REVIEW_REQUEST]: (state: ReviewState) => {
    const newState = { ...state }
    return newState
  },
  [actions.GET_REVIEWS_REJECTED]: (state: ReviewState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_REVIEW_REQUEST]: (state: ReviewState) => {
    const newState = { ...state }
    return newState
  },
  [actions.CREATE_REVIEW_FULFILLED]: (
    state: ReviewState,
    action: ReturnType<typeof actions.createReviewFulfilled>,
  ) => {
    const reviewsById = { ...state.reviewsById }
    const newReview = action.payload
    if (newReview) {
      const newState = {
        ...state,
        reviewsById: { [`${newReview.id}`]: newReview, ...reviewsById },
      }
      return newState
    }
  },
  [actions.CREATE_REVIEW_REJECTED]: (state: ReviewState) => {
    const newState = { ...state }
    return newState
  },
})
