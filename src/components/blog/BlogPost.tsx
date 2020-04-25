import React, { useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { useParams } from 'react-router-dom'
import { newgetPostByIdAsync } from '../../stores/blog/actions'
import useAsync from '../../stores/useAsync'
import { Grid, Typography, Paper } from '@material-ui/core'
import Comments from './Comments'
import HtmlHead from '../shared/HtmlHead'
import PageHeading from '../shared/PageHeading'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      padding: 20,
      marginBottom: 20,
    },
    comments: {
      padding: 20,
      marginTop: 20,
    },
  }),
)

const BlogPost: React.FC = () => {
  // These can be name whatever you want but need to be in that order e.g
  // [dispatchSinglePost, singlePostLoading, singlePostError, singlePostSuccess] = useAsync(/*this is the name of the object from the actions file*/)
  const [dispatchFunc, loading, error, success] = useAsync(newgetPostByIdAsync)
  const { state } = useContext(AppContext)
  const { postId } = useParams()
  const post = useSelector((state: RootState) => state.blog.postsById[postId])
  const classes = useStyles()

  useEffect(() => {
    if (success) console.log('success')
  }, [success])
  useEffect(() => {
    dispatchFunc(postId, state.currentUser)
  }, [])
  if (error) {
    return <div>Error!</div>
  }
  if (loading || !post) {
    return <div>Loading...</div>
  }
  return (
    <>
      <HtmlHead
        title={`A Clamouring Sound - ${post.title}`}
        description={post.blurb}
      />
      <Grid container justify="space-between">
        <Grid item>
          <PageHeading text={post.title} />
        </Grid>
      </Grid>
      <Paper className={classes.content}>
        <img
          src={post.primary_image_url}
          width={300}
          style={{ float: 'right', paddingLeft: 20, paddingBottom: 20 }}
        />
        <Typography
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></Typography>
        <div style={{ clear: 'both' }}></div>
      </Paper>

      <Comments id={postId} user={state.currentUser} />
    </>
  )
}
export default BlogPost
