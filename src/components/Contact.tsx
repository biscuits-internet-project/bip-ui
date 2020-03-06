import React from 'react';
import { Helmet } from "react-helmet";
import axios, { AxiosResponse } from 'axios';
import { Formik, Form, FormikProps } from 'formik';
import TextField from './shared/TextField'
import TextAreaField from './shared/TextAreaField'
import ReCaptcha from './shared/ReCaptcha'
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import PageHeading from './shared/PageHeading';

const ContactSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  name: Yup.string()
    .required('Name is required'),
  message: Yup.string()
    .required('Message is required'),
})

interface IContact {
  email: string
  name: string
  message: string
}

const initialValues: IContact = {
  email: "",
  name: "",
  message: ""
}

const postContact = async (values: IContact) => {
  const contactRequest: AxiosResponse = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/contact`,
    data: values,
    headers: {
      "Content-Type": "application/json",
    }
  });
  return contactRequest.data
}

const Register: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Biscuits Internet Project - Contact</title>
      </Helmet>

      <PageHeading text="Contact"/>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => postContact(values)}
        validationSchema={ContactSchema}
      >
        {(props: FormikProps<IContact>) => (
          <Form>
            <TextField name="email" type="email" label="Email" />
            <TextField name="name" type="text" label="Name" />
            <TextAreaField name="message" label="Message" />
            <ReCaptcha></ReCaptcha>
            <Button variant="contained" type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register