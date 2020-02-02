import React, {useContext} from 'react'
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import {AppContext} from '../../../context/AppProvider'
import TextField from '../../shared/TextField'
import {IVenue} from '../../Venues'
import Button from '@material-ui/core/Button'

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
const postVenue = async (values: IVenue, actions:FormikHelpers<IVenue>, updateVenues: (venue: IVenue) => void, token: string | null) => {
    const newVenue:AxiosResponse = await axios({
        method: 'post',
        url: 'https://stg-api.discobiscuits.net/api/venues',
        data: values,
        headers: {
            "Content-Type":	"application/json",
            "Authorization": token
        }
    });
    updateVenues(newVenue.data)
    actions.resetForm()
}

const AddVenue: React.FC<IAddVenue> = ({updateVenues}) => {
    const {state} = useContext(AppContext)
    return (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => postVenue(values, actions, updateVenues, state.token)}
          >
            {(props: FormikProps<IVenue>) => (
              <Form>
                <TextField name="name" type="text" label="Name" />
                <TextField name="street" type="text" label="Street" />
                <TextField name="city" type="text" label="City" />
                <TextField name="state" type="text" label="State" />
                <TextField name="country" type="text" label="Country"/>
                <TextField name="postal_code" type="text" label="Postal Code" />
                <TextField name="phone" type="text" label="Phone" />
                <TextField name="website" type="text" label="Website" />
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

  export default AddVenue