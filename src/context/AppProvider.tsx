import React, {useReducer, createContext, useEffect} from 'react';
import jwt from 'jwt-decode'
import asyncActions from './asyncActions'
import {IVenue} from '../components/Venues'
import {ISong} from '../components/Songs'

type Nullable<T> = T | null;

export type Action = {
  type: string
  payload?: any
}

export interface AppState {
  token: Nullable<string> ,
  roles: string[],
  ready: boolean
  venues: IVenue[]
  songs: ISong[]
}

interface IContextProps {
  state: AppState;
  dispatch: ({type,payload}:Action) => void;
  asyncActions: any
}

const initialState:AppState = {
  token: null,
  roles: [],
  ready: false,
  venues: [],
  songs: []
}

const appReducer = (state: AppState, action:Action): AppState => {
    switch (action.type) {
      case "INITIATE":
        return {
          ...state,
          token: action.payload.token,
          roles: action.payload.roles,
          ready: true
        };
      case "LOGIN":
        return {
          ...state,
          token: action.payload.token,
          roles: action.payload.roles,
        };
      case "LOGOUT":
        return {
          ...state,
          token: null,
          roles: []
        };
      case "GET_VENUES":
        return {
          ...state,
          venues: action.payload
        };
      case "GET_SONGS":
        return {
          ...state,
          songs: action.payload
        };
      default:
        return state;
    }
  };

export const AppContext = createContext({} as IContextProps )

const AppProvider:React.FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {
      const token:Nullable<string> = localStorage.getItem('token')
      let roles: string[] = []


      if (typeof token === 'string') {
        roles = jwt(token).roles
      }
        dispatch({
          type: 'INITIATE',
          payload: {
            token,
            roles
          }
        })
    }, [])

    return (
        <AppContext.Provider
          value={{
            state,
            dispatch,
            asyncActions: asyncActions(dispatch)
          }}
        >
          {state.ready ? children : null}
        </AppContext.Provider>
    )
}

export default AppProvider