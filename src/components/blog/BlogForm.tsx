import React, { useContext, useEffect } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { AppContext } from '../../context/AppProvider'
import * as Yup from 'yup'
import TextField from '../shared/TextFieldContainer'
import Uploader from '../shared/Uploader'
import TextEditorField from '../shared/TextEditorField'
import CheckboxField from '../shared/CheckboxField'
import ChipField from '../shared/ChipField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box'
import { RootState } from '../../stores/reducers'
import { IBlogPost } from '../../stores/blog/types'
import { createPostAsync, updatePostAsync } from '../../stores/blog/actions'
import useAsync from './useAsync'
import { useSnackbar } from 'notistack'
import { error } from 'console'

const BlogFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  blurb: Yup.string().required('Blurb is required'),
  content: Yup.string().required('Content is required'),
  //primary_image: Yup.string().required('Image is required'),
})

const BlogForm = ({ editId }) => {
  const { state } = useContext(AppContext)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [
    dispatchFuncUpdate,
    loadingUpdate,
    errorUpdate,
    successUpdate,
  ] = useAsync(updatePostAsync)
  const [
    dispatchFuncCreate,
    loadingCreate,
    errorCreate,
    successCreate,
  ] = useAsync(createPostAsync)

  const createPostLoading = useSelector(
    (state: RootState) => state.loading.CREATE_POST,
  )
  const updatePostLoading = useSelector(
    (state: RootState) => state.loading.UPDATE_POST,
  )

  const editData = useSelector((state: RootState) => {
    const data = { ...state.blog.postsById[editId] }
    data.state = data.state === 'published'
    return data
  })

  const submitPost = (values: IBlogPost) => {
    const postValues = values
    postValues.state = values.state ? 'published' : 'draft'
    console.log(postValues)
    dispatch(
      editId
        ? dispatchFuncUpdate(postValues, state.currentUser)
        : dispatchFuncCreate(postValues, state.currentUser),
    )
  }

  useEffect(() => {
    if (successUpdate) {
      enqueueSnackbar(`Successfully updated blog post`, {
        variant: 'success',
      })
    }
    if (successCreate) {
      enqueueSnackbar(`Successfully created blog post`, {
        variant: 'success',
      })
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

  const initialData = editData.id
    ? editData
    : {
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
        //@ts-ignore
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
