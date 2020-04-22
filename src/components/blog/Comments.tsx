import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { createCommentAsync } from '../../stores/blog/actions'
import { RootState } from '../../stores/reducers'

const Comments = ({ id, user }) => {
  const dispatch = useDispatch()
  const comments =
    useSelector((state: RootState) => state.blog.postsById[id].comments) || []
  const [commentText, setCommentText] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment?.content}</div>
          <div style={{ display: 'flex' }}>
            <img src={comment?.user?.avatar_url || ''} width={30} height={30} />
            <h5>{comment?.user?.username || ''}</h5>
          </div>
        </div>
      ))}
      <TextField
        margin="normal"
        variant="outlined"
        label={'Add Comment'}
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button
        variant="contained"
        style={{ width: '200px' }}
        onClick={() => {
          dispatch(
            //@ts-check
            createCommentAsync(id, commentText, user),
          )
          setCommentText('')
        }}
      >
        Add Comment
      </Button>
    </div>
  )
}

export default Comments
