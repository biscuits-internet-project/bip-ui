import React, { useState, useContext, useMemo, useCallback, useEffect } from 'react'
import { Form, Formik, FormikProps, validateYupSchema, yupToFormErrors, FormikHelpers } from 'formik'
import axios, { AxiosResponse } from 'axios'
import * as Yup from 'yup';
import { Typography, Button, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { AppContext } from '../../context/AppProvider';
import SelectField, { ISelectOption } from '../shared/SelectField';
import TextField from '../shared/TextFieldContainer';
import { useSnackbar } from 'notistack';
import TextAreaField from '../shared/TextAreaField';
import moment from 'moment';
import { IShow } from './Show';

export interface IShowForm {
    id: string
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
    relisten_url: ''
}

const validationSchema = Yup.object().shape({
    date: Yup.date()
        .required('Date is required'),
    venue_id: Yup.string()
        .required('Venue is required'),
});

const ShowForm: React.FC<IShowForm> = ({id}) => {
    const { state, asyncActions } = useContext(AppContext)
    const [formData, setFormData] = useState(initialValues)
    const { enqueueSnackbar } = useSnackbar()
    const [selectedDate, setSelectedDate] = useState((id) ? null : new Date())

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    useEffect(()=> {
        const fetchShow = async () => {
          const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${id}`)
          const show:IShow = data.data
          setFormData(show)

          const date = new Date(moment(show.date).format("YYYY/MM/DD"))
          setSelectedDate(date)
        }
        if (id) {
          fetchShow()
        }
      },[id])

    const handleSubmit = useCallback(async (values: IShowValues, actions:FormikHelpers<IShowValues>) => {
        //values.date = selectedDate || new Date()).format('YYYY-MM-DD')
        const show:AxiosResponse = await axios({
            method: id ? 'put' : 'post',
            url: `${process.env.REACT_APP_API_URL}/shows/${id ? id : ''}`,
            data: {
                date: values.date,
                venue_id: values.venue_id,
                notes: values.notes,
                relisten_url: values.relisten_url
            },
            headers: {
                "Content-Type":	"application/json",
                "Authorization": state.token
            }
        });
        const {data} = show

        if (!id) {
            enqueueSnackbar(`Successfully added ${data.date}`, { variant: 'success' })
        } else {
            enqueueSnackbar(`Successfully edited ${data.date}`, { variant: 'success' })
        }
    }, [enqueueSnackbar, id, selectedDate, state.token])

    const venueOptions: ISelectOption[] = useMemo(() => {
        return state.venues.map((venue): ISelectOption => {
            return {
                value: venue.id,
                label: venue.name + " - " + venue.city + ", " + venue.state
            }
        })
    }, [state.venues])

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
                    <SelectField
                        options={venueOptions}
                        name="venue_id"
                        label="Venue"
                    />
                    <TextField
                        type="text"
                        name="relisten_url"
                        label="Relisten URL"
                    />
                    <TextAreaField
                        name="notes"
                        label="Notes"
                    />
                    <div style={{height: 20}}></div>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Form>
            </Formik>
        </>
    )
}
export default ShowForm
