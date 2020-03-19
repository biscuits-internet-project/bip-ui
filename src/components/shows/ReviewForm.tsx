import React, { useState, useContext, useCallback } from 'react'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'
import { AppContext } from '../../context/AppProvider'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import DeleteConfirm from '../shared/DeleteConfirm'
import { IReview } from '../../stores/reviews/types'
import TextAreaField from '../shared/TextAreaField'
import {
  createReviewAsync,
  updateReviewAsync,
  deleteReviewAsync,
} from '../../stores/reviews/actions'
import { useDispatch } from 'react-redux'
import { IShow } from './Show'
import Moment from 'react-moment'
import * as Yup from 'yup'

interface Props {
  show: IShow
  review?: IReview
  handleClose: (string) => void
}

const ReviewForm: React.FC<Props> = ({ show, review, handleClose }) => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(review || { content: '' })
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { currentUser } = state

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
  })

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const deleteReview = useCallback(async () => {
    if (review) {
      dispatch(deleteReviewAsync(String(review.id), state.currentUser))
      enqueueSnackbar('Review deleted', { variant: 'success' })
      handleClose('delete')
    }
  }, [enqueueSnackbar, review, currentUser, handleClose])

  const saveReview = useCallback(
    async (values: IReview, actions: FormikHelpers<IReview>) => {
      if (review) {
        // update
        dispatch(updateReviewAsync(values, state.currentUser))

        enqueueSnackbar(`Review updated`, {
          variant: 'success',
        })
        handleClose('form')
      } else {
        // create
        dispatch(createReviewAsync(show.id, values, state.currentUser))

        enqueueSnackbar(`Review added`, {
          variant: 'success',
        })
        handleClose('form')
      }
    },
    [enqueueSnackbar, handleClose, currentUser],
  )

  return (
    <div>
      {review && (
        <DeleteConfirm
          handleClose={() => handleClose('delete')}
          deleteOpen={deleteOpen}
          handleDelete={deleteReview}
        >
          Review of&nbsp;<Moment format="M/D/YY">{show.date}</Moment>
        </DeleteConfirm>
      )}
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={(values, actions) => saveReview(values, actions)}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<IReview>) => (
          <Form>
            <TextAreaField name="content" label="" rows={10} />
            <div style={{ height: 20 }}></div>
            <Grid container justify="space-between">
              <Grid item>
                <div style={{ alignContent: 'left' }}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </Grid>
              <Grid item>
                {review && (
                  <div style={{ alignContent: 'right' }}>
                    <Button onClick={() => handleDeleteOpen()}>Delete</Button>
                  </div>
                )}
              </Grid>
            </Grid>
            <div style={{ height: 20 }}></div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ReviewForm
