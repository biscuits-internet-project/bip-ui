export type IBlogPost = {
  id?: string
  blurb: string
  content: string
  published_at?: string
  slug?: string
  state?: string | boolean
  title: string
  primary_image_url?: string
  user?: {
    avatar_url?: string
    username?: string
  }
}

export type BlogState = {
  postsById: { [key: string]: IBlogPost }
}
