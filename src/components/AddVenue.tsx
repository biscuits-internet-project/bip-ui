import React from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import TextField from './shared/TextField'
import {IVenue} from './Venues'
interface IAddVenue {
    updateVenues(venue: IVenue): void
}

const initialValues = {
	city: "",
	postal_code: "",
	name: "",
    slug: "",
    street: "",
    country: "",
	state: "",
	phone: "",
	website: ""
}
const postVenue = async (values: IVenue, actions:FormikHelpers<IVenue>, updateVenues: (venue: IVenue) => void) => {
    // const newVenue:AxiosResponse = await axios({
    //     method: 'post',
    //     url: 'https://stg-api.discobiscuits.net/api/venues',
    //     data: values,
    //     headers: {
    //         "Content-Type":	"application/json",
    //         "Authorization": "jfghsjdgfhjdsghjf" 
    //     }
    // });
    
    // updateVenues(newVenue.data)
    updateVenues(values)
    actions.resetForm()
}

const AddVenue: React.FC<IAddVenue> = ({updateVenues}) => {
    return (
        <div>
          <h1>Add Venue</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postVenue(values, actions, updateVenues)}
          >
            {(props: FormikProps<IVenue>) => (
              <Form>
                <TextField name="name" type="password" label="Name" />
                <TextField name="street" type="text" label="Street" />
                <TextField name="city" type="text" label="City" />
                <TextField name="state" type="text" label="State" />
                <TextField name="country" type="text" label="Country"/>
                <TextField name="postal_code" type="text" label="Postal Code" />
                <TextField name="phone" type="text" label="Phone" />
                <TextField name="website" type="text" label="Website" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default AddVenue