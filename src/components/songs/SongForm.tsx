import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { useSnackbar } from 'notistack'
import {AppContext} from '../../context/AppProvider'
import TextField from '../shared/TextFieldContainer'
import TextAreaField from '../shared/TextAreaField'
import CheckboxField from '../shared/CheckboxField'
import SelectField, {ISelectOption} from '../shared/SelectField'
import TextEditorField from '../shared/TextEditorField'
import Button from '@material-ui/core/Button'
import {ISong} from './Song'
import { Grid } from '@material-ui/core';
import DeleteConfirm from '../shared/DeleteConfirm';

interface ISongForm {
    id: string | null
    handleClose: (string) => void
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
  id: "",
  slug: "",
  title: "",
	cover: false,
	lyrics: "",
	notes: "",
	history: "",
	featured_lyric: "",
  tabs: "",
  author_id: "",
  times_played: 0,
  first_played_show: undefined,
  last_played_show: undefined,
  author_name: ""
}

const SongFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('Song is required'),
  author_id: Yup.string().nullable()
    .required('Author is required')
});

const SongForm: React.FC<ISongForm> = ({id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [formData, setFormData] = useState(initialValues)
    const [authors, setAuthors] = useState<IAuthorOption[]>([])
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteOpen = () => {
      setDeleteOpen(true)
    };

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

    const deleteSong = useCallback(async () => {
      if (id) {
        await axios({
          method: 'delete',
          url: `${process.env.REACT_APP_API_URL}/songs/${id}`,
          headers: {
            "Content-Type":	"application/json",
            "Authorization": state.token
          }
        });
        enqueueSnackbar("Successfully deleted song", { variant: 'success' })
        handleClose("delete")
      }
    },[enqueueSnackbar, id, state.token, handleClose])

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
        enqueueSnackbar(`Successfully added ${data.title} by ${data.author_name}`, { variant: 'success' })
        handleClose("form")
      } else {
        enqueueSnackbar(`Successfully edited ${data.title} by ${data.author_name}`, { variant: 'success' })
        handleClose("form")
      }
    }, [enqueueSnackbar, handleClose, id, state.token])
    if(!dataLoaded) return <div style={{width: '600px', height: '500px'}}></div>
    return (
        <div>
          {id &&
            <DeleteConfirm
              handleClose={() => handleClose('delete')}
              deleteOpen={deleteOpen}
              handleDelete={deleteSong}
            />
          }
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
                <TextEditorField name="lyrics" label="Lyrics" />
                <TextEditorField name="tabs" label="Tabs" />

                <div style={{height: 20}}></div>
                <Grid container justify="space-between" >
                  <Grid item>
                    {id &&
                      <Button onClick={()=>handleDeleteOpen()}>Delete Song</Button>
                    }
                  </Grid>
                  <Grid item>
                    <div style={{alignContent: "right"}}>
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <div style={{height: 20}}></div>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default SongForm