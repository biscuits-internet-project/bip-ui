import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { useSnackbar } from 'notistack'
import {AppContext} from '../../../context/AppProvider'
import TextField from '../../shared/TextField'
import TextAreaField from '../../shared/TextAreaField'
import CheckboxField from '../../shared/CheckboxField'
import SelectField, {ISelectOption} from '../../shared/SelectField'
import TextEditorField from '../../shared/TextEditorField'
import Button from '@material-ui/core/Button'
import {ISong} from '../../Songs'


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
	history: "",
	featured_lyric: "",
  tabs: "",
  author_id: ""
}

const SongFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('Song is required'),
  author_id: Yup.string().nullable()
    .required('Author is required')
});

const SongForm: React.FC<ISongForm> = ({setSongs, songs, id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [formData, setFormData] = useState(initialValues)
    const [authors, setAuthors] = useState<IAuthorOption[]>([])
    const { enqueueSnackbar } = useSnackbar()

    useEffect(()=> {
      const fetchSong = async () => {
        const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/songs/${id}?edit=true`)
        const song:ISong = data.data
        setFormData(song)
        setDataLoaded(true)
      }
      if(id){
        fetchSong()
      }
      else {
        setDataLoaded(true)
      }
    },[id])
    useEffect(()=> {
      const fetchAuthors = async () => {
        const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/authors`)
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
          url: `${process.env.REACT_APP_API_URL}/songs/${id ? id : ''}`,
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
    if(!dataLoaded) return <div style={{width: '480px', height: '500px'}}></div>
    return (
        <div>
          <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={(values, actions) => postSong(values, actions)}
            validationSchema={SongFormSchema}
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
                <TextEditorField name="history" label="History" />
                <TextAreaField name="featured_lyric" label="Featured Lyric" />
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