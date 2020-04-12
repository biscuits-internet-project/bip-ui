import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { fetchPosts } from '../../stores/blog/actions'
import { postsSelector } from '../../stores/blog/selectors'

const Blog: React.FC = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postsSelector)
  const postsLoading = useSelector(
    (state: RootState) => state.loading.GET_POSTS,
  )
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  if (postsLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div>
          {post.title}, {post.blurb}, {post.content}
        </div>
      ))}
    </div>
  )
}
export default Blog
