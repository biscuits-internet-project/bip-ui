import React from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import TextAreaField from './shared/TextAreaField'
import {ISong} from './Songs'
import CheckboxField from './shared/CheckboxField'

interface IAddSong {
    updateSongs(song: ISong): void
}

const initialValues = {
  title: "",
	cover: false, 
	lyrics: "",
	notes: "",
	tabs: ""
}
const postSong = async (values: ISong, actions:FormikHelpers<ISong>, updateSongs: (song: ISong) => void) => {
    // const newSong:AxiosResponse = await axios({
    //     method: 'post',
    //     url: 'https://stg-api.discobiscuits.net/api/songs',
    //     data: values,
    //     headers: {
    //         "Content-Type":	"application/json",
    //         "Authorization": "jfghsjdgfhjdsghjf" 
    //     }
    // });
    
    // updateSongs(newSong.data)
    updateSongs(values)
    actions.resetForm()
}

const AddSong: React.FC<IAddSong> = ({updateSongs}) => {
    return (
        <div>
          <h1>Add Song</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postSong(values, actions, updateSongs)}
          >
            {(props: FormikProps<ISong>) => (
              <Form>
                <TextField name="tile" type="text" label="Title" />
                // todo: add author dropdown
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