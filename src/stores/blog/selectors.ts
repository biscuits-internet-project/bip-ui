import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootPosts = (state: RootState) => state.blog.postsById

export const postsSelector = createSelector(rootPosts, (posts) =>
  Object.values(posts),
)

export const draftPostsSelector = createSelector(rootPosts, (posts) =>
  Object.values(posts).filter((post) => post.state === 'draft'),
)

export const publishedPostsSelector = createSelector(rootPosts, (posts) =>
  Object.values(posts).filter((post) => post.state === 'published'),
)
