import React, {useState, useEffect, useContext} from 'react';
import { Form, Formik, FormikHelpers, FieldArray} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../../../context/AppProvider'
import {ISong} from '../../Songs'
import {ISelectOption} from '../../shared/SelectField'
import IconButton from '@material-ui/core/IconButton'
import { AddCircle, Delete } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '../../shared/TextField'
import Panel from '../../shared/Panel'
// import TextAreaField from '../../shared/TextAreaField'
// import CheckboxField from '../../shared/CheckboxField'
// import SelectField from '../../shared/SelectField'
// import {ISelectOption}  from '../../shared/SelectField'
import Button from '@material-ui/core/Button'

import Track from './Track'

export interface IShow {
  tracks: ITrack[]
  notes: string
  date: string
  venue_id: string
}

export interface ISetlistForm {
  sets: ISet[]
  activeSet: number
  notes: string
  date: string
  venue_id: string
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
  activeSet: 0
}

const createData = (data: ISetlistForm) => {
  const {notes,date,venue_id, sets} = data
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
    tracks
  }
  return show
}

const AddSetlist:React.FC = () => {
  const {state} = useContext(AppContext)
  const [songOptions, setSongOptions] = useState<ISongOption[]>([])
  const handleActiveSet = (val: number, setFieldValue: (field:string,val:number )=>void) => {
    setFieldValue('activeSet', val);
  };
  const handleSubmit = async (values: ISetlistForm, actions:FormikHelpers<ISetlistForm>, token: string | null) => {
    const data = createData(values)
    await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/shows',
        data,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
    });
    actions.resetForm()
  }
	useEffect(()=> {
		const fetchSongs = async () => {
			const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/songs')
			setSongOptions(data.data.map((song:ISong): ISongOption => {
                return {
                    label: song.title,
                    value: song.id,
                    song: song
                }
            }))
		}
		fetchSongs()
    },[])
    return (
      <div style={{marginTop: '32px', width: '100%'}}>

        <Formik
          initialValues={initialData}
          onSubmit={(values, actions) => handleSubmit(values, actions, state.token)}
        >
          {({values, setFieldValue}) => {
            return (
              <>
              <Form>
              <Panel title="Setlist Information">
                <Grid container alignItems="center" spacing={4}>
                  <Grid item xs={2}>
                    <TextField 
                        type="text"
                        name="date"
                        label="Date"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField 
                        type="text"
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
                </Grid>
              </Panel>
              <Panel title="Setlist Tracks">
                
                  <FieldArray
                    name="sets"
                    render={(setArrayHelpers)=>(
                      <div style={{height: '600px'}}>
                        
                          <Tabs
                            value={values.activeSet}
                            onChange={(evt,val) => handleActiveSet(val, setFieldValue)}
                            aria-label="nav tabs example"
                          > 
                            {values.sets.map((set, setIndex) => (
                              <Tab label={`Set ${setIndex + 1 }`}  value={setIndex}/>
                            ))}
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6">Add Set</Typography>
                            <IconButton color="primary" onClick={() => {
                              setArrayHelpers.insert(values.activeSet + 1, emptySet)
                              setFieldValue('activeSet', values.activeSet + 1)
                            }}>
                              <AddCircle />
                            </IconButton>
                            </div>
                            
                          </Tabs>
                            <div style={{width: 'calc(100vw - 300px)'}}>
                             <FieldArray
                                 name={`sets[${values.activeSet}].tracks`}
                                 render={(arrayHelpers)=> (
                                   <div style={{width: '100%', margin: '16px'}}>
                                     {values.sets[values.activeSet].tracks.map((track,index) => (
                                        <>
                                          <Track trackIndex={index} values={values} songOptions={songOptions} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers}/>
                                        </>
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

  export default AddSetlist

  // <div style={{display: 'flex', alignItems: 'center'}}>
  //                                      <Typography variant="h5">{`Set ${value + 1}`}</Typography>
  //                                      <IconButton color="primary" onClick={() => setArrayHelpers.insert(value + 1, emptySet)}>
  //                                        <AddCircle />
  //                                      </IconButton>
  //                                      <IconButton color="primary" disabled={values.sets.length === 1} onClick={() => setArrayHelpers.remove(value)}>
  //                                        <Delete />
  //                                      </IconButton> 
  //                                    </div>


  // {values.sets.map((set, setIndex)=> (
  //   <>
    
  
  // </>
  //))}

  // {/* <TabPanel value={value} index={0}>
  //                         Page One
  //                       </TabPanel>
  //                       <TabPanel value={value} index={1}>
  //                         Page Two
  //                       </TabPanel>
  //                       <TabPanel value={value} index={2}>
  //                         Page Three
  //                       </TabPanel> */}
  //                         {/* <div style={{width: '500px'}}>
  //                           <FieldArray
  //                               name={`sets[${setIndex}].tracks`}
  //                               render={(arrayHelpers)=> (
  //                                 <div style={{width: '100%', margin: '16px'}}>
  //                                   <div style={{display: 'flex', alignItems: 'center'}}>
  //                                     <Typography variant="h5">{`Set ${setIndex + 1}`}</Typography>
  //                                     <IconButton color="primary" onClick={() => setArrayHelpers.insert(setIndex + 1, emptySet)}>
  //                                       <AddCircle />
  //                                     </IconButton>
  //                                     <IconButton color="primary" disabled={values.sets.length === 1} onClick={() => setArrayHelpers.remove(setIndex)}>
  //                                       <Delete />
  //                                     </IconButton> 
  //                                   </div>
                                    
  //                                   {values.sets[setIndex].tracks.map((track,index) => (
  //                                       <div key={index} style={{display: 'flex', width: '100%', alignItems: 'center'}}>
  //                                         <Avatar>{index + 1}</Avatar>
  //                                         <div style={{width: '300px', marginBottom: '10px', marginLeft: '16px'}}>
  //                                           <SelectField name={`sets[${setIndex}].tracks[${index}].song_id`} label="Song" options={songOptions} onSelect={(id:string): void => {
  //                                             const songOption = songOptions.find((songOption: ISetSong):boolean => songOption.song.id === id)
  //                                             setFieldValue(`sets[${setIndex}].tracks[${index}].song_slug`, songOption?.song.slug)
  //                                             setFieldValue(`sets[${setIndex}].tracks[${index}].song_title`, songOption?.song.title)
  //                                           }}/>
  //                                         </div>
  //                                         <IconButton color="primary" onClick={() => arrayHelpers.insert(index + 1, emptyTrack)}>
  //                                           <AddCircle />
  //                                         </IconButton>
  //                                         <IconButton color="primary" disabled={values.sets[setIndex].tracks.length === 1} onClick={() => arrayHelpers.remove(index)}>
  //                                           <Delete />
  //                                         </IconButton> 
  //                                       </div>
  //                                   ))}
  //                                 </div>
  //                               )}
  //                             />
  //                         </div> */}