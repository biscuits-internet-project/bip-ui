import { createSelector } from 'reselect'
import { RootState } from '../reducers'

export const rootSongs = (state: RootState) => state.songs.songsById

export const songsSelector = createSelector(rootSongs, (songs) =>
  Object.values(songs),
)
