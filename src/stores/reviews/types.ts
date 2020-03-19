export type IReview = {
  id?: String
  content?: String
  created_at?: Date
  updated_at?: Date
  user?: {
    avatar_url?: String
    username?: String
  }
}

export type ReviewState = {
  reviewsById: { [key: string]: IReview }
}
