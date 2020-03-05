import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Formik, FormikProps,FormikHelpers} from 'formik'
import axios, { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import {AppContext} from '../../context/AppProvider'
import TextField from '../shared/TextField'
import Button from '@material-ui/core/Button'
import {IVenue} from './Venue'
import { Grid } from '@material-ui/core';
import DeleteConfirm from '../shared/DeleteConfirm';

interface IVenueForm {
    id: string | null
    handleClose: (string) => void
}

const initialValues:IVenue = {
  id: "",
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

const VenueForm: React.FC<IVenueForm> = ({id, handleClose}) => {
    const {state} = useContext(AppContext)
    const [formData, setFormData] = useState(initialValues)
    const [deleteOpen, setDeleteOpen] = useState(false)
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

    const handleDeleteOpen = () => {
      setDeleteOpen(true)
    };

    const deleteVenue = useCallback(async () => {
      if (id) {
        await axios({
          method: 'delete',
          url: `${process.env.REACT_APP_API_URL}/venues/${id}`,
          headers: {
            "Content-Type":	"application/json",
            "Authorization": state.token
          }
        });
        enqueueSnackbar("Successfully deleted venue", { variant: 'success' })
        handleClose("delete")
      }
    },[enqueueSnackbar, id, state.token])

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
        enqueueSnackbar(`Successfully added ${data.name}`, { variant: 'success' })
        handleClose("form")
      } else {
        enqueueSnackbar(`Successfully edited ${data.name}`, { variant: 'success' })
        handleClose("form")
      }
    }, [enqueueSnackbar, handleClose, id, state.token])

    return (
        <div>
          {id &&
            <DeleteConfirm
              handleClose={() => handleClose('delete')}
              deleteOpen={deleteOpen}
              handleDelete={deleteVenue}
            >
              Venue
              </DeleteConfirm>
          }
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
                <div style={{height: 20}}></div>
                <Grid container justify="space-between" >
                  <Grid item>
                    {id &&
                      <Button onClick={()=>handleDeleteOpen()}>Delete Venue</Button>
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

  export default VenueForm