import createReducer from '../../lib/createReducer'
import { ISong, SongState } from './types'
import * as actions from './actions'

const initialState: SongState = {
  songsById: {},
  getSongsStatus: null,
}

export default createReducer(initialState, {
  [actions.GET_SONGS_REQUEST]: (state: SongState) => {
    const newState = { ...state }
    return newState
  },
  [actions.GET_SONGS_FULFILLED]: (
    state: SongState,
    action: ReturnType<typeof actions.getSongsFulfilled>,
  ) => {
    const songsById = { ...state.songsById }
    const data = action.payload
    data.forEach((song: ISong) => {
      songsById[`${song.id}`] = {
        ...songsById[`${song.id}`],
        ...song,
      }
    })
    const newState = {
      ...state,
      songsById,
    }
    return newState
  },
  [actions.GET_SONGS_REJECTED]: (state: SongState) => {
    const newState = { ...state }
    return newState
  },
})
