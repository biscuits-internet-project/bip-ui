import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import {AppContext} from '../../context/AppProvider'
import TextField from '../shared/TextField'
import Button from '@material-ui/core/Button'
import {IVenue} from './Venue'

interface IVenueForm {
    setVenues: (venues: IVenue[]) => void
    venues: IVenue[],
    id: string | null
    handleClose: ()=> void
}

const initialValues:IVenue = {
	city: "",
	postal_code: "",
	name: "",
  slug: "",
  street: "",
  country: "",
	state: "",
	phone: "",
  website: "",
  times_played: 0,
	first_played_show: undefined,
	last_played_show: undefined
}


const VenueForm: React.FC<IVenueForm> = ({setVenues, venues, id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [formData, setFormData] = useState(initialValues)
    const { enqueueSnackbar } = useSnackbar()
    useEffect(()=> {
      const fetchVenue = async () => {
        const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/venues/${id}`)
        const venue:IVenue = data.data
        setFormData(venue)
      }
      if(id){
        fetchVenue()
      }
    },[id])

    const postVenue = useCallback(async (values: IVenue, actions:FormikHelpers<IVenue>) => {
      const newVenue:AxiosResponse = await axios({
          method: id ? 'put' : 'post',
          url: `${process.env.REACT_APP_API_URL}/venues/${id ? id : ''}`,
          data: values,
          headers: {
              "Content-Type":	"application/json",
              "Authorization": state.token
          }
      });
      const {data} = newVenue

      if(!id){
        setVenues([data, ...venues])
        enqueueSnackbar(`Successfully added ${data.name}`, { variant: 'success' })
        handleClose()

      }

      else {
        const index = venues.findIndex(venue => venue.slug === id)
        const newVenues = [...venues]
        newVenues[index] = data
        setVenues(newVenues)
        enqueueSnackbar(`Successfully edited ${data.name}`, { variant: 'success' })
        handleClose()
      }
    }, [enqueueSnackbar, handleClose, id, setVenues, venues, state.token])

    return (
        <div>
          <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={(values, actions) => postVenue(values, actions)}
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

  export default VenueForm