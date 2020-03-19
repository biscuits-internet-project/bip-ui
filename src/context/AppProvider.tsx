import React, { useReducer, createContext, useEffect } from 'react';
import jwt from 'jwt-decode'
import asyncActions from './asyncActions'
import { IVenue } from '../components/venues/Venue'
import { ISong } from '../components/songs/Song'
import { IShow, IRating } from '../components/shows/Show'
import { IUser } from '../components/users/Users';

type Nullable<T> = T | null;

export type Action = {
  type: string
  payload?: any
}

export interface AppState {
  currentUser?: Nullable<IUser>
  theme: string
  ready: boolean
  venues: IVenue[]
  songs: ISong[]
  shows: IShow[]
  attendances: string[]
  favorites: string[]
  ratings: IRating[]
  viewSetlists: boolean
}

interface IContextProps {
  state: AppState;
  dispatch: ({ type, payload }: Action) => void;
  asyncActions: any
}

const initialState: AppState = {
  currentUser: null,
  theme: "dark",
  ready: false,
  venues: [],
  songs: [],
  shows: [],
  attendances: [],
  favorites: [],
  ratings: [],
  viewSetlists: true
}

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "INITIATE":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        ready: true
      };
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload.currentUser
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: null
      };
    case "TOGGLE_VIEW_SETLISTS":
      return {
        ...state,
        viewSetlists: action.payload
      }
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
    case "GET_SHOWS":
      return {
        ...state,
        shows: action.payload
      };
    case "GET_USER_ATTENDANCES":
      return {
        ...state,
        attendances: action.payload
      };
    case "ADD_USER_ATTENDANCE":
      state.attendances = [...state.attendances, action.payload]
      return {
        ...state,
        attendances: state.attendances
      };
    case "REMOVE_USER_ATTENDANCE":
      state.attendances = state.attendances.filter((showId) => {
        return showId !== action.payload
      })
      return {
        ...state,
        attendances: state.attendances
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload
      };
    case "ADD_FAVORITE":
      state.favorites = [...state.favorites, action.payload]
      return {
        ...state,
        favorites: state.favorites
      };
    case "REMOVE_FAVORITE":
      state.favorites = state.favorites.filter((showId) => {
        return showId !== action.payload
      })
      return {
        ...state,
        favorites: state.favorites
      };
    case "GET_RATINGS":
      return {
        ...state,
        ratings: action.payload
      };
    case "UPDATE_RATING":
      let ratings = state.ratings
      const i = ratings.findIndex(r => r.show_id === action.payload.show_id);
      if (i > -1) {
        ratings[i] = action.payload
      } else {
        ratings.push(action.payload)
      }
      console.log(ratings)
      console.log(action.payload)
      return {
        ...state,
        ratings: ratings
      };
    default:
      return state;
  }
};

export const AppContext = createContext({} as IContextProps)

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const token: Nullable<string> = localStorage.getItem('token')
    let currentUser: Nullable<IUser> = null

    if (typeof token === 'string') {
      currentUser = {
        token: token,
        roles: jwt(token).roles,
        username: jwt(token).username,
        avatar_url: jwt(token).avatar_url,
        first_name: jwt(token).first_name,
        last_name: jwt(token).last_name,
        email: jwt(token).email
      }
    }
    dispatch({
      type: 'INITIATE',
      payload: {
        currentUser,
      }
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        asyncActions: asyncActions(dispatch),
      }}
    >
      {state.ready ? children : null}
    </AppContext.Provider>
  )
}

export default AppProvider