import React, {useReducer, createContext, useEffect} from 'react';
import jwt from 'jwt-decode'

type Nullable<T> = T | null;

type Action = {
  type: string
  payload?: any
}

export interface AppState {
  token: Nullable<string> ,
  roles: string[],
  ready: boolean
}

interface IContextProps {
  state: AppState;
  dispatch: ({type,payload}:Action) => void;
}

const initialState:AppState = {
  token: null,
  roles: [],
  ready: false
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
      // case "LOGOUT":
      //   localStorage.clear();
      //   return {
      //     ...state,
      //     //isAuthenticated: false,
      //     //user: null
      //   };
      default:
        return state;
    }
  };

export const AppContext = createContext({} as IContextProps )

const AppProvider:React.FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {
      let token:Nullable<string> = null
      let roles: string[] = []

      const tokenStorage = localStorage.getItem('token')

      if (typeof tokenStorage === 'string') {
        token = JSON.parse(tokenStorage)
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
            dispatch
          }}
        >
          {state.ready ? children : null}
        </AppContext.Provider>
    )
}

export default AppProvider