import createReducer from '../../lib/createReducer'
import { Venue, VenueState } from './types'
import * as actions from './actions'

const initialState: VenueState = {
  venuesById: {},
  getVenuesStatus: null,
}

export default createReducer(initialState, {
  [actions.GET_VENUES]: (state: VenueState) => {
    const newState = { ...state, getVenuesStatus: 'pending' }
    return newState
  },
  [actions.GET_VENUES_FULFILLED]: (
    state: VenueState,
    action: ReturnType<typeof actions.getVenuesFulfilled>,
  ) => {
    const venuesById = { ...state.venuesById }
    const data = action.payload
    data.forEach((venue: Venue) => {
      venuesById[`${venue.id}`] = {
        ...venuesById[`${venue.id}`],
        ...venue,
      }
    })
    const newState = {
      ...state,
      venuesById,
      getVenuesStatus: 'complete',
    }
    return newState
  },
  [actions.GET_VENUES_REJECTED]: (state: VenueState) => {
    const newState = { ...state, getVenuesStatus: 'rejected' }
    return newState
  },
})
