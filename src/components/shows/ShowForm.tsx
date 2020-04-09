import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import {
  Form,
  Formik,
  FormikProps,
  validateYupSchema,
  yupToFormErrors,
  FormikHelpers,
} from 'formik'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup'
import { Button } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { AppContext } from '../../context/AppProvider'
import SelectField, { ISelectOption } from '../shared/SelectField'
import TextField from '../shared/TextFieldContainer'
import { useSnackbar } from 'notistack'
import TextAreaField from '../shared/TextAreaField'
import { IShow } from './Show'

import { venuesSelector } from '../../stores/venues/selectors'

export interface IShowForm {
  show?: IShow
}

interface IShowValues {
  id: string
  notes: string
  date: Date
  venue_id: string
  relisten_url: string
}

const initialValues: IShowValues = {
  id: '',
  notes: '',
  date: new Date(),
  venue_id: '',
  relisten_url: '',
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  venue_id: Yup.string().required('Venue is required'),
})

const ShowForm: React.FC<IShowForm> = ({ show }) => {
  const { state } = useContext(AppContext)
  const history = useHistory()
  const [formData, setFormData] = useState(initialValues)
  const { enqueueSnackbar } = useSnackbar()
  const [selectedDate, setSelectedDate] = useState(show ? null : new Date())
  const { currentUser } = state
  const venues = useSelector(venuesSelector)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (show) {
      setFormData(show)
      setSelectedDate(show.date)
    }
  }, [show])

  const handleSubmit = useCallback(
    async (values: IShowValues, actions: FormikHelpers<IShowValues>) => {
      const resp: AxiosResponse = await axios({
        method: show ? 'put' : 'post',
        url: `${process.env.REACT_APP_API_URL}/shows/${show ? show.id : ''}`,
        data: {
          date: values.date,
          venue_id: values.venue_id,
          notes: values.notes,
          relisten_url: values.relisten_url,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser?.token,
        },
      })
      const { data } = resp

      if (!show) {
        enqueueSnackbar(`Successfully added ${data.date}`, {
          variant: 'success',
        })
        history.push(`/admin/shows/edit/${data.slug}`)
      } else {
        enqueueSnackbar(`Successfully edited ${data.date}`, {
          variant: 'success',
        })
      }
    },
    [enqueueSnackbar, show, currentUser, history],
  )

  const venueOptions: ISelectOption[] = useMemo(() => {
    return venues.map(
      (venue): ISelectOption => {
        return {
          value: venue.id,
          label: venue.name + ' - ' + venue.city + ', ' + venue.state,
        }
      },
    )
  }, [venues])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        // validate={(values) => {
        //     return validateYupSchema(values, validationSchema, false)
        //         .catch((err) => {
        //             return yupToFormErrors(err)
        //         })
        // }}
      >
        <Form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date"
              name="date"
              label="Date"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ width: 200 }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <SelectField options={venueOptions} name="venue_id" label="Venue" />
          <TextField type="text" name="relisten_url" label="Relisten URL" />
          <TextAreaField name="notes" label="Notes" rows={3} />
          <div style={{ height: 20 }}></div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  )
}
export default ShowForm
