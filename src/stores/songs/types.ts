export interface ISong {
  id: string
  author_id: string
  author_name: string
  cover: boolean
  lyrics?: string
  notes?: string
  slug: string
  tabs?: string
  title: string
  times_played: number
  first_played_show?: any //Chage to IShow when in redux
  last_played_show?: any //Chage to IShow when in redux
  history?: string
  featured_lyric?: string
  date_last_played?: Date
  shows_since_last_played?: number
  most_common_year?: number,
  least_common_year?: number,
  yearly_play_chart_data?: string
}

export type SongState = {
  songsById: { [key: string]: ISong }
  getSongsStatus: String | null
}
