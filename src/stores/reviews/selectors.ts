import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootReviews = (state: RootState) => state.reviews.reviewsById

export const reviewsSelector = createSelector(rootReviews, (reviews) =>
  Object.values(reviews),
)
