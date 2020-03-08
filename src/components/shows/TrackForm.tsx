import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import { AppContext } from '../../context/AppProvider'
import TextField from '../shared/TextFieldContainer'
import { Paper, Button, Grid } from '@material-ui/core'
import CheckboxField from '../shared/CheckboxField';
import { ITrack } from './Tracklist';
import SelectField, { ISelectOption } from '../shared/SelectField';

interface ITrackForm {
  track: ITrack
}

const initialValues: ITrack = {
  id: "",
  slug: "",
  note: "",
  all_timer: false,
  song_title: "",
  song_slug: "",
  song_id: "",
  segue: "",
  position: 0,
  set: "",
  annotations: []
}

const TrackForm: React.FC<ITrackForm> = ({ track }) => {
  const { state } = useContext(AppContext)
  const [formData, setFormData] = useState(initialValues)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (track) {
      setFormData(track)
    }
  }, [track])

  const setOptions: ISelectOption[] = useMemo(() => {
    return ["S1", "S2", "S3", "S4", "E1", "E2"].map((set): ISelectOption => {
      return {
        value: set,
        label: set
      }
    })
  }, [])


  const songOptions: ISelectOption[] = useMemo(() => {
    return state.songs.map((song): ISelectOption => {
      return {
        value: song.id,
        label: song.title
      }
    })
  }, [state.songs])

  const postTrack = useCallback(async (values: ITrack, actions: FormikHelpers<ITrack>) => {
    const resp:AxiosResponse = await axios({
      method: track ? 'put' : 'post',
      url: `${process.env.REACT_APP_API_URL}/tracks/${track ? track.id : ''}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": state.token
      }
    });

    const {data} = resp
    enqueueSnackbar("Success", { variant: 'success' })
  }, [enqueueSnackbar, track, state.token])

  return (
    <Paper style={{ marginBottom: 20, padding: 20 }}>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={(values, actions) => postTrack(values, actions)}
      >
        {(props: FormikProps<ITrack>) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <SelectField
                  options={setOptions}
                  name="set"
                  label="Set"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField name="position" label="Position" type="number" />
              </Grid>
              <Grid item xs={6}>
                <SelectField
                  options={songOptions}
                  name="song_id"
                  label="Song"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField name="segue" label="Segue" type="text" />
              </Grid>
              <Grid item xs={2}>
                <CheckboxField name="all_timer" label="All timer" />
              </Grid>
            </Grid>

            <TextField name="note" label="Jam Chart" type="text" />
            <div style={{ height: 10 }}></div>

            <Button variant="contained" type="submit">
              Submit
                </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default TrackForm