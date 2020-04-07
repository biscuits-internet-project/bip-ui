import { combineReducers } from 'redux'
//State Interfaces
import { VenueState } from './venues/types'

//Reducers
import venues from './venues/reducers'

export interface RootState {
  venues: VenueState
}

const rootReducer = combineReducers<RootState>({
  venues,
})

export default rootReducer
