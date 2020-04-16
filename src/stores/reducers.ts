import { combineReducers } from 'redux'
//State Interfaces
import { VenueState } from './venues/types'
import { SongState } from './songs/types'
import { LoadingState } from './loading/types'
import { BlogState } from './blog/types'
import { FilterState } from './filters/types'

//Reducers
import loading from './loading/reducers'
import venues from './venues/reducers'
import songs from './songs/reducers'
import blog from './blog/reducers'
import filters from './filters/reducers'

export interface RootState {
  venues: VenueState
  songs: SongState
  loading: LoadingState
  blog: BlogState
  filters: FilterState
}

const rootReducer = combineReducers<RootState>({
  loading,
  venues,
  songs,
  blog,
  filters,
})

export default rootReducer
