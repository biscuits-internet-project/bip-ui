import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootVenues = (state: RootState) => state.venues.venuesById
export const rootFilters = (state: RootState) => state.filters

export const venuesSelector = createSelector(rootVenues, (venues) =>
  Object.values(venues),
)

export const venuesByIdSelector = createSelector(
  [rootVenues, rootFilters],
  (venues, filters) => {
    return {
      venues,
      filters,
    }
  },
)
