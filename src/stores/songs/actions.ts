import axios, { AxiosResponse } from 'axios'
import { ISong } from './types'
export const GET_SONGS_REQUEST = 'GET_SONGS_REQUEST'
export const GET_SONGS_FULFILLED = 'GET_SONGS_FULFILLED'
export const GET_SONGS_REJECTED = 'GET_SONGS_REJECTED'

export const getSongs = () => ({ type: GET_SONGS_REQUEST } as const)

export const getSongsFulfilled = (payload: ISong[]) =>
  ({ type: GET_SONGS_FULFILLED, payload } as const)

export const getSongsRejected = () => ({ type: GET_SONGS_REJECTED } as const)

//ASYNC ACTIONS
export const fetchSongs = () => {
  return async (dispatch) => {
    dispatch(getSongs())
    const songs: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/songs`,
    )
    dispatch(getSongsFulfilled(songs.data))
  }
}
