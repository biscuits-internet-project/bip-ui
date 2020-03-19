import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootSongs = (state: RootState) => state.songs.songsById

export const songsSelector = createSelector(rootSongs, (songs) =>
  Object.values(songs),
)

export const songsForTableSelector = createSelector(rootSongs, (songs) =>
  Object.values(songs).map((s) => [
    [s.slug, s.title],
    s.author_name,
    s.cover ? 'cover' : 'original',
    s.times_played,
    s.date_last_played,
  ]),
)
