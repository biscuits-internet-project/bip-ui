import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import { AppContext } from '../../context/AppProvider'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import TextField from '../shared/TextFieldContainer'
import TextAreaField from '../shared/TextAreaField'
import Uploader from '../shared/Uploader'
import TextEditorField from '../shared/TextEditorField'
import CheckboxField from '../shared/CheckboxField'
import ChipField from '../shared/ChipField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box'
import { RootState } from '../../stores/reducers'
import { Grid } from '@material-ui/core'
import { IBlogPost } from '../../stores/blog/types'
import { createPostAsync, updatePostAsync } from '../../stores/blog/actions'

const BlogFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  blurb: Yup.string().required('Blurb is required'),
  content: Yup.string().required('Content is required'),
  //primary_image: Yup.string().required('Image is required'),
})

const BlogForm = ({ editId }) => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const createPostLoading = useSelector(
    (state: RootState) => state.loading.CREATE_POST,
  )
  const updatePostLoading = useSelector(
    (state: RootState) => state.loading.UPDATE_POST,
  )
  const submitPost = (values: IBlogPost) => {
    const postValues = values
    postValues.state = values.state ? 'published' : 'draft'
    dispatch(
      editId
        ? updatePostAsync(postValues, state.currentUser)
        : createPostAsync(postValues, state.currentUser),
    )
  }
  const editData = useSelector((state: RootState) => {
    const data = { ...state.blog.postsById[editId] }
    data.state = data.state === 'published'
    console.log(data)
    return data
  })
  const initialData = editData || {
    title: '',
    blurb: '',
    content: '',
    primary_image: '',
    state: false,
    tag_list: [],
  }
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialData}
        onSubmit={submitPost}
        validationSchema={BlogFormSchema}
      >
        {(props: FormikProps<IBlogPost>) => (
          <Form>
            <TextField name="title" type="text" label="Title" />
            <TextField name="blurb" type="text" label="Blurb" />
            <Uploader
              {...props}
              label="Image"
              url={props.values.primary_image_url}
              name="primary_image"
              multiple={false}
            />
            <TextEditorField name="content" label="Content" />
            <CheckboxField name="state" label="publish?" />
            <ChipField name="tag_list" label="Tags" />
            <Box display="flex" justifyContent="flex-end" marginTop="16px">
              <Button
                variant="contained"
                type="submit"
                disabled={createPostLoading || updatePostLoading ? true : false}
              >
                Submit
              </Button>
              {createPostLoading ||
                (updatePostLoading && (
                  <CircularProgress
                    size={24}
                    style={{ position: 'relative', top: '10px', left: '-60px' }}
                  />
                ))}
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BlogForm
