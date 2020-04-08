import axios, { AxiosResponse } from 'axios'
import { Venue } from './types'
export const GET_VENUES_REQUEST = 'GET_VENUES_REQUEST'
export const GET_VENUES_FULFILLED = 'GET_VENUES_FULFILLED'
export const GET_VENUES_REJECTED = 'GET_VENUES_REJECTED'

export const getVenues = () => ({ type: GET_VENUES_REQUEST } as const)

export const getVenuesFulfilled = (payload: Venue[]) =>
  ({ type: GET_VENUES_FULFILLED, payload } as const)

export const getVenuesRejected = () => ({ type: GET_VENUES_REJECTED } as const)

//ASYNC ACTIONS
export const fetchVenues = () => {
  return async (dispatch) => {
    dispatch(getVenues())
    const venues: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/venues`,
    )
    dispatch(getVenuesFulfilled(venues.data))
  }
}
