import {Dispatch} from 'react'
import {Action}  from './AppProvider'
import axios, {AxiosResponse}  from 'axios'

export interface IasyncActions {
    [prop: string]: () => void
}

const asyncActions = (dispatch: Dispatch<Action>) => {
    return {
        getVenues: async () => {
            const venues:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/venues')
            dispatch({type: "GET_VENUES", payload: venues.data})
        }
    }
    
}

export default asyncActions