import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import {AppContext} from '../../../context/AppProvider'
import {ISong} from '../../Songs'
import TextField from '../../shared/TextField'
import TextAreaField from '../../shared/TextAreaField'
import CheckboxField from '../../shared/CheckboxField'
import SelectField, {ISelectOption} from '../../shared/SelectField'
import Button from '@material-ui/core/Button'

interface ISongForm {
    setSongs: (songs: ISong[]) => void
    songs: ISong[],
    id: string | null
    handleClose: ()=> void
}

interface IAuthor {
  id: string
  name: string
  author_id: string
}

interface IAuthorOption extends ISelectOption {
  author_id: string
}

const initialValues:ISong = {
  title: "",
	cover: false, 
	lyrics: "",
	notes: "",
  tabs: "",
  author_id: ""
}

const SongForm: React.FC<ISongForm> = ({setSongs, songs, id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [formData, setFormData] = useState(initialValues)
    const [authors, setAuthors] = useState<IAuthorOption[]>([])
    const { enqueueSnackbar } = useSnackbar()
    
    useEffect(()=> {
      const fetchSong = async () => {
        const data:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/songs/${id}`)
        const song:ISong = data.data
        setFormData(song)
      }
      if(id){
        fetchSong()
      }
    },[id])
    useEffect(()=> {
      const fetchAuthors = async () => {
        const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/authors')
        const authors:IAuthorOption[] = data.data.map((author: IAuthor):IAuthorOption =>  {
          return {label: author.name, value: author.id, selected: false, author_id: author.author_id}
        })
        setAuthors(authors)
      }
      fetchAuthors()
    },[])

    const postSong = useCallback(async (values: ISong, actions:FormikHelpers<ISong>) => {
      const newSong:AxiosResponse = await axios({
          method: id ? 'put' : 'post',
          url: `https://stg-api.discobiscuits.net/api/songs/${id ? id : ''}`,
          data: values,
          headers: {
              "Content-Type":	"application/json",
              "Authorization": state.token
          }
      });
      const {data} = newSong 

      if(!id){
        setSongs([data, ...songs])
        enqueueSnackbar(`Successfully added ${data.title} by ${data.author_name}`, { variant: 'success' })
        handleClose()
        
      }

      else {
        const index = songs.findIndex(song => song.slug === id)
        const newSongs = [...songs]
        newSongs[index] = data
        setSongs(newSongs)
        enqueueSnackbar(`Successfully edited ${data.title} by ${data.author_name}`, { variant: 'success' })
        handleClose()
      }
    }, [enqueueSnackbar, handleClose, id, setSongs, songs, state.token])

    return (
        <div>
          <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={(values, actions) => postSong(values, actions)}
          >
            {(props: FormikProps<ISong>) => (
              <Form>
                <TextField name="title" type="text" label="Title" />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <div style={{width: '75%'}}>
                    <SelectField name="author_id" label="Author" options={authors}/>
                  </div>
                  <div style={{marginTop: '12px'}}>
                    <CheckboxField name="cover" label="Cover" />
                  </div>
                </div>
                <TextAreaField name="notes" label="Notes" />
                <TextAreaField name="lyrics" label="Lyrics" />
                <TextAreaField name="tabs" label="Tabs" />
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

  export default SongForm