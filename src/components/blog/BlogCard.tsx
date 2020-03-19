import React, { useContext } from 'react'
import { Link as ResourceLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
  makeStyles,
  CardActionArea,
  CardMedia,
  Link,
  Box,
  Button,
} from '@material-ui/core'
import { IBlogPost } from '../../stores/blog/types'
import Paragraph from '../shared/Paragraph'
import Moment from 'react-moment'
import { AppContext } from '../../context/AppProvider'

const useStyles = makeStyles({
  root: {
    height: 'auto',
  },
  media: {
    maxHeight: 200,
    minHeight: 200,
    transition: 'all 1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
})

interface Props {
  post: IBlogPost
  handleEdit: (string) => void
  handleDelete: (string) => void
}

const BlogCard: React.FC<Props> = ({ post, handleEdit, handleDelete }) => {
  const classes = useStyles()
  const { state } = useContext(AppContext)
  const { currentUser, username } = state

  return (
    <Card className={classes.root} style={{ height: '100%', minWidth: 200 }}>
      <Box overflow="hidden">
        <CardMedia
          className={classes.media}
          component="img"
          alt={post.title}
          image={post.primary_image_url || 'https://via.placeholder.com/200'}
          title={post.title}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h2" component="h2">
          <Link
            underline="none"
            component={ResourceLink}
            to={`/blog/${post.slug}`}
          >
            {post.title}
          </Link>
        </Typography>
        <Paragraph variant="body2" style={{ color: 'silver' }}>
          posted on by {post.user?.username} on{' '}
          <Moment format="M/D/YY">{post.published_at}</Moment>
        </Paragraph>
        <Paragraph>{post.blurb}</Paragraph>

        {username === post.user?.username && (
          <>
            <Button onClick={() => handleEdit(post.id)}>edit</Button>
            <Button onClick={() => handleDelete(post.id)}>delete</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogCard
