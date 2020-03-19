import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'
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
} from '@material-ui/core'
import Moment from 'react-moment'
import { AppContext } from '../../context/AppProvider'
import { IShow } from './Show'
import Paragraph from '../shared/Paragraph'
import { IReview } from '../../stores/reviews/types'
import ReviewForm from './ReviewForm'
import { useSelector } from 'react-redux'
import { reviewsSelector } from '../../stores/reviews/selectors'

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
  const { currentUser } = state
  const [review, setReview] = useState<IReview | undefined>(undefined)
  const styles = useStyles()
  const [formOpen, setFormOpen] = useState(false)
  const reviews = useSelector(reviewsSelector)

  const handleOpen = () => {
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={formOpen}
        onClose={() => handleClose()}
      >
        <DialogTitle>Add a Review</DialogTitle>
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
          {currentUser && (
            <div style={{ alignContent: 'right' }}>
              <Button onClick={() => handleOpen()}>Add a Review</Button>
            </div>
          )}
        </Grid>
      </Grid>

      {reviews.map((review) => {
        return (
          <>
            <Paper className={styles.review}>
              <Typography className={styles.author}>
                by {review.user?.username} on{' '}
                <Moment format="M/D/YY">{review.created_at}</Moment>
              </Typography>

              <Paragraph>{review.content}</Paragraph>
            </Paper>
          </>
        )
      })}
    </>
  )
}

export default Reviews
