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
export const CREATE_REVIEW = 'CREATE_REVIEW'
export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST'
export const CREATE_REVIEW_FULFILLED = 'CREATE_REVIEW_FULFILLED'
export const CREATE_REVIEW_REJECTED = 'CREATE_REVIEW_REJECTED'

export const createReview = (payload: IReview) =>
  ({ type: CREATE_REVIEW_REQUEST, payload } as const)

export const createReviewFulfilled = (payload: IReview) =>
  ({ type: CREATE_REVIEW_FULFILLED, payload } as const)

export const createReviewRejected = () =>
  ({ type: CREATE_REVIEW_REJECTED } as const)

//UPDATE REVIEW
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const UPDATE_REVIEW_REQUEST = 'UPDATE_REVIEW_REQUEST'
export const UPDATE_REVIEW_FULFILLED = 'UPDATE_REVIEW_FULFILLED'
export const UPDATE_REVIEW_REJECTED = 'UPDATE_REVIEW_REJECTED'

export const updateReview = (payload: IReview) =>
  ({ type: UPDATE_REVIEW_REQUEST, payload } as const)

export const updateReviewFulfilled = (payload: IReview) =>
  ({ type: UPDATE_REVIEW_FULFILLED, payload } as const)

export const updateReviewRejected = () =>
  ({ type: UPDATE_REVIEW_REJECTED } as const)

//DELETE REVIEW
export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST'
export const DELETE_REVIEW_FULFILLED = 'DELETE_REVIEW_FULFILLED'
export const DELETE_REVIEW_REJECTED = 'DELETE_REVIEW_REJECTED'

export const deleteReview = (payload: string) =>
  ({ type: DELETE_REVIEW_REQUEST, payload } as const)

export const deleteReviewFulfilled = (payload: string) =>
  ({ type: DELETE_REVIEW_FULFILLED, payload } as const)

export const deleteReviewRejected = () =>
  ({ type: DELETE_REVIEW_REJECTED } as const)

//ASYNC ACTIONS
export const fetchReviews = (showId) => {
  return async (dispatch) => {
    dispatch(getReviews())
    const reviews: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/shows/${showId}/reviews`,
    )
    dispatch(getReviewsFulfilled(reviews.data))
  }
}

export const createReviewAsync = {
  name: CREATE_REVIEW,
  func: (showId: string, review: IReview, currentUser) => {
    return async (dispatch) => {
      dispatch(createReview(review))
      try {
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
      } catch (e) {
        dispatch(createReviewRejected())
      }
    }
  },
}

export const updateReviewAsync = {
  name: UPDATE_REVIEW,
  func: (review: IReview, currentUser) => {
    const formData = new FormData()
    Object.keys(review).forEach((key) => formData.append(key, review[key]))
    return async (dispatch) => {
      dispatch(updateReview(review))
      try {
        const updatedReview: AxiosResponse = await axios({
          method: 'put',
          url: `${process.env.REACT_APP_API_URL}/reviews/${review.id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: currentUser?.token,
          },
        })
        dispatch(updateReviewFulfilled(updatedReview.data))
      } catch (e) {
        dispatch(updateReviewRejected())
      }
    }
  },
}

export const deleteReviewAsync = (id: string, currentUser) => {
  return async (dispatch) => {
    dispatch(deleteReview(id))
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/reviews/${id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: currentUser?.token,
        },
      })
      dispatch(deleteReviewFulfilled(id))
    } catch (e) {
      dispatch(deleteReviewRejected())
    }
  }
}
