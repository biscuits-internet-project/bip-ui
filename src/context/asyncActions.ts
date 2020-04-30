import { Dispatch } from 'react'
import { Action } from './AppProvider'
import axios, { AxiosResponse } from 'axios'

export interface IasyncActions {
  [prop: string]: () => void
}

const asyncActions = (dispatch: Dispatch<Action>) => {
  return {
    //USER
    getUser: async (token: string, user_id: string) => {
      const resp = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/users/${user_id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })

      const { data } = resp
      const payload = {
        username: data.username,
        avatar_url: data.avatar_url,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }
      dispatch({ type: 'UPDATE_USER', payload: payload })
    },
    //ATTENDANCES
    getUserAttendances: async (token) => {
      const attendances: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/attendances`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      localStorage.setItem('token', token)
      dispatch({ type: 'GET_USER_ATTENDANCES', payload: attendances.data })
    },
    postAttendance: async (token: string, showId: string, value: boolean) => {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/shows/${showId}/${
          value ? 'attend' : 'unattend'
        }`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })

      if (value) {
        dispatch({ type: 'ADD_USER_ATTENDANCE', payload: showId })
      } else {
        dispatch({ type: 'REMOVE_USER_ATTENDANCE', payload: showId })
      }
    },
    //FAVORITES
    getFavorites: async (token) => {
      const favorites: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/favorites`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({ type: 'GET_FAVORITES', payload: favorites.data })
    },
    postFavorite: async (token: string, showId: string, value: boolean) => {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/shows/${showId}/${
          value ? 'favorite' : 'unfavorite'
        }`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })

      if (value) {
        dispatch({ type: 'ADD_FAVORITE', payload: showId })
      } else {
        dispatch({ type: 'REMOVE_FAVORITE', payload: showId })
      }
    },
    //RATINGS
    getRatings: async (token) => {
      const ratings: AxiosResponse = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/ratings`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({ type: 'GET_RATINGS', payload: ratings.data })
    },
    postRating: async (
      token: string,
      rateableType: string,
      rateableId: string,
      value: number,
    ) => {
      const data = { value: value }
      await axios({
        method: 'post',
        url: `${
          process.env.REACT_APP_API_URL
        }/${rateableType.toLowerCase()}s/${rateableId}/rate`,
        data: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({
        type: 'UPDATE_RATING',
        payload: {
          rateable_type: rateableType,
          rateable_id: rateableId,
          value: value,
        },
      })
    },
  }
}

export default asyncActions
