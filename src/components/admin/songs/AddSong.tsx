import React, {useState, useEffect, useContext} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../../../context/AppProvider'
import {ISong} from '../../Songs'
import TextField from '../../shared/TextField'
import TextAreaField from '../../shared/TextAreaField'
import CheckboxField from '../../shared/CheckboxField'
import SelectField, {ISelectOption} from '../../shared/SelectField'
import Button from '@material-ui/core/Button'

interface IAddSong {
    updateSongs(song: ISong): void
}

interface IAuthor {
  id: string
  name: string
}

const initialValues = {
  title: "",
	cover: false, 
	lyrics: "",
	notes: "",
  tabs: "",
  author_id: ""
}
const postSong = async (values: ISong, actions:FormikHelpers<ISong>, updateSongs: (song: ISong) => void, token: string | null) => {
    const newSong:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/songs',
        data: values,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
    });
    
    updateSongs(newSong.data)
    updateSongs(values)
    actions.resetForm()
}

const AddSong: React.FC<IAddSong> = ({updateSongs}) => {
    const {state} = useContext(AppContext)
    const [authors, setAuthors] = useState<ISelectOption[]>([])
    useEffect(()=> {
      const fetchAuthors = async () => {
        const data:AxiosResponse = await axios.get('https://stg-api.discobiscuits.net/api/authors')
        const authors:ISelectOption[] = data.data.map((author):ISelectOption =>  {
          return {label: author.name, value: author.id, selected: false}
        })
        setAuthors(authors)
      }
      fetchAuthors()
    },[])
    return (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postSong(values, actions, updateSongs, state.token)}
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

  export default AddSong