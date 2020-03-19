import { combineReducers } from 'redux'
//State Interfaces
import { VenueState } from './venues/types'
import { ReviewState } from './reviews/types'
import { SongState } from './songs/types'
import { LoadingState } from './loading/types'
import { BlogState } from './blog/types'

//Reducers
import loading from './loading/reducers'
import venues from './venues/reducers'
import songs from './songs/reducers'
import reviews from './reviews/reducers'
import blog from './blog/reducers'

export interface RootState {
  venues: VenueState
  songs: SongState
  loading: LoadingState
  blog: BlogState
  reviews: ReviewState
}

const rootReducer = combineReducers<RootState>({
  loading,
  venues,
  songs,
  blog,
  reviews,
})

export default rootReducer
