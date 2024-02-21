import createReducer from '../../lib/createReducer'
import { FilterState } from './types'
import { SET_FILTER, setFilter } from './actions'

const initialState: FilterState = {}

export default createReducer(initialState, {
  [SET_FILTER]: (state: FilterState, action: ReturnType<typeof setFilter>) => {
    let filterInfo = action.payload.filterInfo
    return {
      ...state,
      [action.payload.namespace]: {
        ...filterInfo,
      },
    }
  },
})
