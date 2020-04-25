export type IBlogPost = {
  id?: string
  blurb: string
  content: string
  published_at?: Date
  slug?: string
  state?: string | boolean
  title: string
  primary_image_url?: string
  tags: string[]
  comments: {
    id: string
    content: string
    user?: {
      avatar_url?: string
      username?: string
    }
    created_at: Date
    updated_at: Date
  }[]
  user?: {
    avatar_url?: string
    username?: string
  }
}

export type BlogState = {
  postsById: { [key: string]: IBlogPost }
}
