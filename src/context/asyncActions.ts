import {Dispatch} from 'react'
import {Action}  from './AppProvider'
import axios, {AxiosResponse}  from 'axios'

export interface IasyncActions {
    [prop: string]: () => void
}

const asyncActions = (dispatch: Dispatch<Action>) => {
    return {
        //SONGS
        getSongs: async () => {
            const songs:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/songs`)
            dispatch({type: "GET_SONGS", payload: songs.data})
        },
        //VENEUES
        getVenues: async () => {
            const venues:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/venues`)
            dispatch({type: "GET_VENUES", payload: venues.data})
        },
        //SHOWS
        getShows: async () => {
            const shows:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows`)
            dispatch({type: "GET_SHOWS", payload: shows.data})
        },
        //ATTENDANCES
        getAttendances: async (token) => {
            const attendances: AxiosResponse = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/attendances`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            dispatch({type: "GET_ATTENDANCES", payload: attendances.data})
        },
    }
}

export default asyncActions