import React, { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Link,
} from '@material-ui/core'
import Moment from 'react-moment'
import { AppContext } from '../../context/AppProvider'
import { IShow } from './Show'
import Paragraph from '../shared/Paragraph'
import { IReview } from '../../stores/reviews/types'
import ReviewForm from './ReviewForm'
import { useSelector, useDispatch } from 'react-redux'
import { fetchReviews } from '../../stores/reviews/actions'
import { RootState } from '../../stores/reducers'

interface Props {
  show: IShow
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    review: {
      marginTop: 20,
      padding: 20,
    },
    author: {
      marginBottom: 10,
    },
  }),
)

const Reviews: React.FC<Props> = ({ show }) => {
  const { state } = useContext(AppContext)
  const { username, currentUser } = state
  const dispatch = useDispatch()
  const [review, setReview] = useState<IReview | undefined>(undefined)
  const styles = useStyles()
  const [formOpen, setFormOpen] = useState(false)

  const reviewsLoading = useSelector(
    (state: RootState) => state.loading.GET_REVIEWS,
  )

  const reviews = useSelector((state: RootState) => {
    return Object.values(state.reviews.reviewsById).filter(
      (r: IReview) => r.show_id === show.id,
    )
  })

  useEffect(() => {
    dispatch(fetchReviews(show.id))
  }, [])

  const handleOpen = (review) => {
    setReview(review)
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
    setTimeout(() => setReview(undefined), 300)
  }

  if (reviewsLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={formOpen}
        onClose={() => handleClose()}
      >
        <DialogTitle>{review ? 'Edit' : 'Add'} Review</DialogTitle>
        <DialogContent>
          <ReviewForm
            review={review}
            show={show}
            handleClose={() => handleClose()}
          />
        </DialogContent>
      </Dialog>

      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h2">Reviews</Typography>
        </Grid>
        <Grid item>
          {currentUser && reviews.length > 0 && (
            <div style={{ alignContent: 'right' }}>
              <Button onClick={() => handleOpen(undefined)}>
                Add a Review
              </Button>
            </div>
          )}
        </Grid>
      </Grid>

      {reviews.length === 0 && currentUser && (
        <Paper className={styles.review}>
          <Button onClick={() => handleOpen(undefined)}>Add a review</Button>
        </Paper>
      )}

      {reviews.map((review) => {
        return (
          <>
            <Paper className={styles.review}>
              <Typography className={styles.author}>
                by {review.user?.username} on{' '}
                <Moment format="M/D/YY">{review.created_at}</Moment>
              </Typography>

              <Paragraph>
                {review.content &&
                  review.content.split('\n').map((item, key) => {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    )
                  })}
              </Paragraph>

              {review.user?.username === username && (
                <>
                  <Link
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpen(review)}
                  >
                    Edit
                  </Link>
                </>
              )}
            </Paper>
          </>
        )
      })}
    </>
  )
}

export default Reviews
