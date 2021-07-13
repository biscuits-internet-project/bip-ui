import React, { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Button } from "@material-ui/core";
import { AppContext } from "../../context/AppProvider";
import SelectField, { ISelectOption } from "../shared/SelectField";
import TextField from "../shared/TextFieldContainer";
import { useSnackbar } from "notistack";
import TextAreaField from "../shared/TextAreaField";
import { IShow } from "./Show";
import { venuesSelector } from "../../stores/venues/selectors";

export interface IShowForm {
  show?: IShow;
}

interface IShowValues {
  id: string;
  notes: string;
  date: string;
  venue_id: string;
  relisten_url: string;
}

const initialValues: IShowValues = {
  id: "",
  notes: "",
  venue_id: "",
  date: formatDate(new Date()),
  relisten_url: "",
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const ShowForm: React.FC<IShowForm> = ({ show }) => {
  const { state } = useContext(AppContext);
  const history = useHistory();
  const [formData, setFormData] = useState(initialValues);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = state;
  const venues = useSelector(venuesSelector);

  useEffect(() => {
    if (show) {
      setFormData({
        date: formatDate(show.date),
        notes: show.notes,
        id: show.id,
        venue_id: show.venue_id,
        relisten_url: show.relisten_url,
      });
    }
  }, [show]);

  const handleSubmit = useCallback(
    async (values: IShowValues, actions: FormikHelpers<IShowValues>) => {
      const resp: AxiosResponse = await axios({
        method: show ? "put" : "post",
        url: `${process.env.REACT_APP_API_URL}/shows/${show ? show.id : ""}`,
        data: {
          date: values.date,
          venue_id: values.venue_id,
          notes: values.notes,
          relisten_url: values.relisten_url,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser?.token,
        },
      });
      const { data } = resp;

      if (!show) {
        enqueueSnackbar(`Successfully added ${data.date}`, {
          variant: "success",
        });
        history.push(`/admin/shows/edit/${data.slug}`);
      } else {
        enqueueSnackbar(`Successfully edited ${data.date}`, {
          variant: "success",
        });
      }
    },
    [enqueueSnackbar, show, currentUser, history]
  );

  const venueOptions: ISelectOption[] = useMemo(() => {
    return venues.map(
      (venue): ISelectOption => {
        return {
          value: venue.id,
          label: venue.name + " - " + venue.city + ", " + venue.state,
        };
      }
    );
  }, [venues]);

  return (
    <>
      <Formik enableReinitialize initialValues={formData} onSubmit={(values, actions) => handleSubmit(values, actions)}>
        <Form>
          <TextField type="text" name="date" label="Date (ex 1999-12-30)" />
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
  );
};
export default ShowForm;
