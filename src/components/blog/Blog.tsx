import React, { useEffect, useCallback, useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { fetchPosts, createPostAsync } from '../../stores/blog/actions'
import { postsSelector } from '../../stores/blog/selectors'

const Blog: React.FC = () => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const posts = useSelector(postsSelector)
  const postsLoading = useSelector(
    (state: RootState) => state.loading.GET_POSTS,
  )
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const postBlog = useCallback(() => {
    const dummy = {
      blurb: 'new blurb',
      content: 'new content',
      title: 'new title',
    }
    dispatch(createPostAsync(dummy, state.currentUser))
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
      <button onClick={postBlog}>Add Dummy Blog Post</button>
    </div>
  )
}
export default Blog
