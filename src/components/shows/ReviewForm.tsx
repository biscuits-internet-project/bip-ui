import React, { useState, useContext, useCallback, useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { IShow } from './Show'
import Moment from 'react-moment'
import * as Yup from 'yup'
import useAsync from '../../stores/useAsync'

interface Props {
  show: IShow
  review?: IReview
  handleClose: () => void
}

const ReviewForm: React.FC<Props> = ({ show, review, handleClose }) => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(review || { content: '' })
  const { enqueueSnackbar } = useSnackbar()
  const [
    dispatchFuncCreate,
    loadingCreate,
    errorCreate,
    successCreate,
  ] = useAsync(createReviewAsync)
  const [
    dispatchFuncUpdate,
    loadingUpdate,
    errorUpdate,
    successUpdate,
  ] = useAsync(updateReviewAsync)

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
  })

  const deleteReview = () => {
    if (review) {
      dispatch(deleteReviewAsync(String(review.id), state.currentUser))
      enqueueSnackbar('Review deleted', { variant: 'success' })
      handleClose()
    }
  }

  const saveReview = (values: IReview) => {
    dispatch(
      review
        ? dispatchFuncUpdate(values, state.currentUser)
        : dispatchFuncCreate(show.id, values, state.currentUser),
    )
  }

  useEffect(() => {
    if (successUpdate) {
      enqueueSnackbar(`Successfully updated review`, {
        variant: 'success',
      })
      handleClose()
    }
    if (successCreate) {
      enqueueSnackbar(`Successfully created review`, {
        variant: 'success',
      })
      handleClose()
    }
  }, [successCreate, successUpdate])

  useEffect(() => {
    if (errorUpdate) {
      enqueueSnackbar(`An error occurred`, {
        variant: 'error',
      })
    }
    if (errorCreate) {
      enqueueSnackbar(`An error occurred`, {
        variant: 'error',
      })
    }
  }, [errorCreate, errorUpdate])

  if (loadingCreate || loadingUpdate) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={(values, actions) => saveReview(values)}
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
                    <Button
                      onClick={() =>
                        window.confirm('You sure?') && deleteReview()
                      }
                    >
                      Delete
                    </Button>
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
