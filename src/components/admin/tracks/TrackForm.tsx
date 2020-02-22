import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import {AppContext} from '../../../context/AppProvider'
import TextAreaField from '../../shared/TextAreaField'
import Button from '@material-ui/core/Button'
import {ITrack} from './AdminTracks'

interface ITrackForm {
    setTracks: (tracks: ITrack[]) => void
    tracks: ITrack[],
    id: string | null
    handleClose: ()=> void
}

const initialValues:ITrack = {
  id: "",
  slug: "",
  note: "",
  show: undefined,
  venue: undefined
}

const TrackForm: React.FC<ITrackForm> = ({setTracks, tracks, id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [formData, setFormData] = useState(initialValues)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(()=> {
      const fetchTrack = async () => {
        const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tracks/${id}?edit=true`)
        const track:ITrack = data.data
        setFormData(track)
      }
      if(id){
        fetchTrack()
      }
    },[id])

    const postTrack = useCallback(async (values: ITrack, actions:FormikHelpers<ITrack>) => {
      const newTrack:AxiosResponse = await axios({
          method: 'put',
          url: `${process.env.REACT_APP_API_URL}/tracks/${id}`,
          data: values,
          headers: {
              "Content-Type":	"application/json",
              "Authorization": state.token
          }
      });
      const {data} = newTrack

      const index = tracks.findIndex(track => track.slug === id)
      const newTracks = [...tracks]
      newTracks[index] = data
      setTracks(newTracks)
      enqueueSnackbar(`Successfully edited ${data.title} by ${data.author_name}`, { variant: 'success' })
      handleClose()
    }, [enqueueSnackbar, handleClose, id, setTracks, tracks, state.token])

    return (
        <div>
          <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={(values, actions) => postTrack(values, actions)}
          >
            {(props: FormikProps<ITrack>) => (
              <Form>
                <TextAreaField name="note" label="Note" />
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default TrackForm