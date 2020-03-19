import axios, { AxiosResponse } from 'axios'
import { IReview } from './types'

//GET REVIEWS
export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST'
export const GET_REVIEWS_FULFILLED = 'GET_REVIEWS_FULFILLED'
export const GET_REVIEWS_REJECTED = 'GET_REVIEWS_REJECTED'

export const getReviews = () => ({ type: GET_REVIEWS_REQUEST } as const)

export const getReviewsFulfilled = (payload: IReview[]) =>
  ({ type: GET_REVIEWS_FULFILLED, payload } as const)

export const getReviewsRejected = () =>
  ({ type: GET_REVIEWS_REJECTED } as const)

//CREATE REVIEW
export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST'
export const CREATE_REVIEW_FULFILLED = 'CREATE_REVIEW_FULFILLED'
export const CREATE_REVIEW_REJECTED = 'CREATE_REVIEW_REJECTED'

export const createReview = (payload: IReview) =>
  ({ type: CREATE_REVIEW_REQUEST, payload } as const)

export const createReviewFulfilled = (payload: IReview) =>
  ({ type: CREATE_REVIEW_FULFILLED, payload } as const)

export const createReviewRejected = () =>
  ({ type: CREATE_REVIEW_REJECTED } as const)

//ASYNC ACTIONS
export const fetchReviews = () => {
  return async (dispatch) => {
    dispatch(getReviews())
    const reviews: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews`,
    )
    dispatch(getReviewsFulfilled(reviews.data))
  }
}

export const createReviewAsync = (
  showId: string,
  review: IReview,
  currentUser,
) => {
  return async (dispatch) => {
    dispatch(createReview(review))
    const newReview: AxiosResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/shows/${showId}/reviews`,
      data: review,
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
    })

    dispatch(createReviewFulfilled(newReview.data))
  }
}
