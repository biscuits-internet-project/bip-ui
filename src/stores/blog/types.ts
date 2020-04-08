export type Post = {
  id: number
  //Post stuff here
}

export type BlogState = {
  postsById: { [key: string]: Post }
}
