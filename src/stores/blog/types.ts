export type IPost = {
  id?: String
  blurb: String
  content: String
  published_at?: String
  slug?: String
  state?: String
  title: String
  user?: {
    avatar_url?: String
    username?: String
  }
}

export type BlogState = {
  postsById: { [key: string]: IPost }
}
