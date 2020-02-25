import React, {useMemo, useEffect, useContext} from 'react';
import { Form, Formik, FormikHelpers, FieldArray, validateYupSchema, yupToFormErrors} from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import {AppContext} from '../../../context/AppProvider'
import {ISong} from './../../songs/Song'
import SelectField, {ISelectOption} from '../../shared/SelectField'
import IconButton from '@material-ui/core/IconButton'
import { AddCircle} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '../../shared/TextField'
import Panel from '../../shared/Panel'
import Button from '@material-ui/core/Button'
import Track from './Track'

export interface IShow {
  tracks: ITrack[]
  notes: string
  date: string
  venue_id: string
  youtube_id: string
}

export interface ISetlistForm {
  sets: ISet[]
  activeSet: number
  notes: string
  date: string
  venue_id: string
  youtube_id: string
}

interface ISet {
  tracks: ITrack[]
}

interface ITrack {
  set?:string
	song_id?: string
	segue?: string
  position?: number
  annotations?: string[]
}

export interface ISongOption extends ISelectOption{
    song: ISong
}

export const emptyTrack : ITrack = {
    segue: '',
    song_id:'',
    annotations: [],
    set: '',
    position: 0
}

const emptySet: ISet = {
  tracks: [emptyTrack],
}

const initialData: ISetlistForm = {
  sets: [
    emptySet
  ],
  notes: '',
  date: '',
  venue_id: '',
  youtube_id: '',
  activeSet: 0
}

const createData = (data: ISetlistForm) => {
  const {notes,youtube_id,date,venue_id, sets} = data
  let tracks:ITrack[] = []
  sets.forEach((set:ISet, setIndex:number) => {
    set.tracks.forEach((track: ITrack,index: number)=> {
      track.position = index + 1
      track.set = `S${setIndex + 1}`
      track.segue = track.segue ? '>' : ''
      tracks = [...tracks, track]
    })
  })
  const show:IShow = {
    notes,
    date,
    venue_id,
    tracks,
    youtube_id
  }
  return show
}

const validationSchema = Yup.lazy(() => {
  return Yup.object().shape({
    date: Yup.string()
      .required('A valid date is required'),
    venue_id: Yup.string()
      .required('Venue is required'),
    sets: Yup.array()
      .of(
        Yup.object().shape({
          tracks: Yup.array()
            .of(
              Yup.object().shape({
                song_id: Yup.string()
                .required('A Song is required'),
              })
            )
        })
      )
  });
})

const AddShow:React.FC = () => {
  const {state,asyncActions} = useContext(AppContext)

  useEffect(
    ()=> {
      !state.songs.length && asyncActions.getSongs()
      !state.venues.length && asyncActions.getVenues()
      }
    ,[state.venues.length, state.songs.length, asyncActions]
  )

  const songOptions: ISongOption[] = useMemo(() => {
    return state.songs.map((song:ISong): ISongOption => {
      return {
          label: song.title,
          value: song.id,
          song: song
      }
    })
  },[state.songs])

  const venueOptions: ISelectOption[] = useMemo(() => {
    return state.venues.map((venue): ISelectOption => {
      return  {
        value: venue.id,
        label: venue.name
      }
    })
  },[state.venues] )



  const handleActiveSet = (val: number, setFieldValue: (field:string,val:number )=>void) => {
    setFieldValue('activeSet', val);
  };
  const handleSubmit = async (values: ISetlistForm, actions:FormikHelpers<ISetlistForm>, token: string | null) => {
    const data = createData(values)
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/shows`,
        data,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
    });
    actions.resetForm()
  }

  return (
    <div style={{marginTop: '32px', width: '100%'}}>
      {/* <Typography variant="h4">Add Show</Typography> */}
      <Formik
        enableReinitialize
        initialValues={initialData}
        onSubmit={(values, actions) => handleSubmit(values, actions, state.token)}
        validate={(values) => {
          return validateYupSchema(values, validationSchema, false)
          .catch((err) => {
            return yupToFormErrors(err)
          })
        }}
      >
        {({values, setFieldValue,errors,submitCount}) => {
          return (
            <>
            <Form>
            <Panel title="Show Information">
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={2}>
                  <TextField
                      type="text"
                      name="date"
                      label="Date"
                  />
                </Grid>
                <Grid item xs={5}>
                  <SelectField
                      options={venueOptions}
                      name="venue_id"
                      label="Venue"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                      type="text"
                      name="notes"
                      label="Notes"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                      type="text"
                      name="youtube_id"
                      label="Youtube ID"
                  />
                </Grid>
              </Grid>
            </Panel>
            <Panel title="Setlists">

                <FieldArray
                  name="sets"
                  render={(setArrayHelpers)=>(
                    <div style={{minHeight: '300px'}}>
                        <div style={{display: 'flex'}}>
                          <Tabs
                            value={values.activeSet}
                            onChange={(evt,val) => handleActiveSet(val, setFieldValue)}
                            aria-label="nav tabs example"
                          >
                            {values.sets.map((set, setIndex) => (
                              <Tab key={setIndex} label={`Set ${setIndex + 1 }`}  value={setIndex}/>
                            ))}


                          </Tabs>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6">Add Set</Typography>
                            <IconButton color="primary" onClick={() => {
                              setArrayHelpers.insert(values.activeSet + 1, emptySet)
                              setFieldValue('activeSet', values.activeSet + 1)
                            }}>
                              <AddCircle />
                            </IconButton>
                          </div>
                        </div>
                          <div style={{width: 'calc(100vw - 280px)'}}>
                            <FieldArray
                                name={`sets[${values.activeSet}].tracks`}
                                render={(arrayHelpers)=> (
                                  <div style={{width: '100%', margin: '16px'}}>
                                    {values.sets[values.activeSet].tracks.map((track,index) => (
                                      <div key={index}>
                                        <Track trackIndex={index} submitCount={submitCount} values={values} songOptions={songOptions} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers}/>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              />
                          </div>


                    </div>
                  )}
                />

                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Panel>
            </Form>
            </>
          )
        }}
      </Formik>
    </div>
  );
}

  export default AddShow