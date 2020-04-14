import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import { AppContext } from '../../context/AppProvider'
import TextField from '../shared/TextFieldContainer'
import { Button, Grid } from '@material-ui/core'
import CheckboxField from '../shared/CheckboxField'
import { ITrack } from './Tracklist'
import SelectField, { ISelectOption } from '../shared/SelectField'
import { IShow } from './Show'
import TextAreaField from '../shared/TextAreaField'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSongs } from '../../stores/songs/actions'
import { songsSelector } from '../../stores/songs/selectors'

interface Props {
  track?: ITrack
  show: IShow
  handleClose: () => void
}

const initialValues: ITrack = {
  id: '',
  slug: '',
  note: '',
  all_timer: false,
  song_title: '',
  song_slug: '',
  song_id: '',
  segue: '',
  position: 0,
  set: '',
  annotations: [],
  annotations_with_newlines: '',
}

const TrackForm: React.FC<Props> = ({ track, show, handleClose }) => {
  const { state } = useContext(AppContext)
  const [formData, setFormData] = useState(initialValues)
  const { enqueueSnackbar } = useSnackbar()
  const { currentUser } = state
  const songs = useSelector(songsSelector)

  useEffect(() => {
    if (track) {
      setFormData(track)
    }
  }, [track])

  const setOptions: ISelectOption[] = useMemo(() => {
    return ['S1', 'S2', 'S3', 'S4', 'E1', 'E2'].map(
      (set): ISelectOption => {
        return {
          value: set,
          label: set,
        }
      },
    )
  }, [])

  const songOptions: ISelectOption[] = useMemo(() => {
    return songs.map(
      (song): ISelectOption => {
        return {
          value: song.id,
          label: song.title,
        }
      },
    )
  }, [])

  const postTrack = useCallback(
    async (values: ITrack, actions: FormikHelpers<ITrack>) => {
      values.annotations = values.annotations_with_newlines.split('\n')
      const resp: AxiosResponse = await axios({
        method: track ? 'put' : 'post',
        url: `${process.env.REACT_APP_API_URL}/${
          track ? `tracks/${track.id}` : `shows/${show.id}/tracks`
        }`,
        data: values,
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })

      if (track) {
        if (resp.status !== 200) {
          enqueueSnackbar('Error updating track.', { variant: 'error' })
          return
        } else {
          enqueueSnackbar('Track updated.', { variant: 'success' })
        }
      } else {
        if (resp.status !== 201) {
          enqueueSnackbar('Error creating track.', { variant: 'error' })
          return
        } else {
          enqueueSnackbar('Track created.', { variant: 'success' })
        }
      }
      handleClose()
    },
    [enqueueSnackbar, track, currentUser, show.id, handleClose],
  )

  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      onSubmit={(values, actions) => postTrack(values, actions)}
    >
      {(props: FormikProps<ITrack>) => (
        <Form>
          <Grid container spacing={1}>
            <Grid item xs>
              <SelectField options={setOptions} name="set" label="Set" />
            </Grid>
            <Grid item xs>
              <TextField name="position" label="Position" type="number" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <SelectField options={songOptions} name="song_id" label="Song" />
            </Grid>
            <Grid item xs={3}>
              <TextField name="segue" label="Segue" type="text" />
            </Grid>
          </Grid>
          <TextAreaField
            name="annotations_with_newlines"
            label="Annotations"
            rows={3}
            helperText="each annotation needs a new line"
          />
          <CheckboxField name="all_timer" label="All timer" />
          <TextAreaField name="note" label="Jam Chart" />
          <TextField name="show_id" label="Show" type="hidden" />

          <Button variant="contained" type="submit">
            Submit
          </Button>
          <div style={{ height: 10 }}></div>
        </Form>
      )}
    </Formik>
  )
}

export default TrackForm
