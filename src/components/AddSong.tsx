import React, {useState, useEffect, useContext} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../context/AppProvider'
import {ISong} from './Songs'
import TextField from './shared/TextField'
import TextAreaField from './shared/TextAreaField'
import CheckboxField from './shared/CheckboxField'
import SelectField from './shared/SelectField'
import {ISelectOption}  from './shared/SelectField'

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
	tabs: ""
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
          return {label: author.name, value: author.id}
        })
        setAuthors(authors)
        // let options:ISelectOption[] = authors.map(author => ISelectOption[] 
        //   return {label: author.name, value: author.id}
        // )
      }
      fetchAuthors()
    },[])
    return (
        <div>
          <h1>Add Song</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postSong(values, actions, updateSongs, state.token)}
          >
            {(props: FormikProps<ISong>) => (
              <Form>
                <TextField name="title" type="text" label="Title" />
                {/* todo: need to get authors passed over to SelectField */}
                <SelectField name="author_id" label="Author" options={authors}/>
                <CheckboxField name="cover" label="Cover" checked={false} />
                <TextAreaField name="notes" label="Notes" />
                <TextAreaField name="lyrics" label="Lyrics" />
                <TextAreaField name="tabs" label="Tabs" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default AddSong