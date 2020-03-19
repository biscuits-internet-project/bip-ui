import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Grid,
  Link,
} from '@material-ui/core'
import { createCommentAsync } from '../../stores/blog/actions'
import { RootState } from '../../stores/reducers'
import Paragraph from '../shared/Paragraph'
import { AppContext } from '../../context/AppProvider'
import Moment from 'react-moment'

const Comments = ({ id, user }) => {
  const { state } = useContext(AppContext)
  const { currentUser } = state
  const dispatch = useDispatch()
  const comments =
    useSelector((state: RootState) => state.blog.postsById[id].comments) || []
  const [commentText, setCommentText] = useState('')
  return (
    <>
      <Typography variant="h3">Comments</Typography>

      <Paper style={{ padding: 20, marginBottom: 20 }}>
        {comments.length === 0 && (
          <Typography>Be the first to comment!</Typography>
        )}
        {comments.map((comment) => (
          <Grid container key={comment.id} spacing={3}>
            <Grid item>
              <Avatar src={comment?.user?.avatar_url} />
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ color: 'silver' }}>
                <em>
                  posted by {comment?.user?.username} on{' '}
                  <Moment format="M/D/YY">{comment.created_at}</Moment>
                </em>
              </Typography>
              <div style={{ height: 4 }}></div>
              <Paragraph>{comment?.content}</Paragraph>
            </Grid>
          </Grid>
        ))}
      </Paper>

      {currentUser ? (
        <>
          <TextField
            margin="normal"
            variant="outlined"
            label={'Add Comment'}
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            variant="outlined"
            style={{ width: '200px', marginTop: 10 }}
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
        </>
      ) : (
        <Paragraph>
          <Link component={RouterLink} to="/login">
            Login to comment
          </Link>
        </Paragraph>
      )}
    </>
  )
}

export default Comments
