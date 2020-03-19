import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootVenues = (state: RootState) => state.venues.venuesById

export const venuesSelector = createSelector(rootVenues, (venues) =>
  Object.values(venues),
)
