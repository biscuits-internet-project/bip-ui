import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Formik, Form, FormikProps } from 'formik';
import TextField from './shared/TextFieldContainer'
import TextAreaField from './shared/TextAreaField'
import ReCaptcha from './shared/ReCaptcha'
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import PageHeading from './shared/PageHeading';
import Paragraph from './shared/Paragraph';
import HtmlHead from './shared/HtmlHead';

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

const Register: React.FC = () => {
  const [confirmation, setConfirmation] = useState(false)
  const [recaptcha, setRecaptcha] = useState(false)

  const recaptchaCallback = function () {
    setRecaptcha(true)
  };

  const postContact = async (values: IContact) => {
    if (!recaptcha) {
      alert("Are you a robot?")
      return
    }
    const contactRequest: AxiosResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/contact`,
      data: values,
      headers: {
        "Content-Type": "application/json",
      }
    });
    setConfirmation(true)
    return contactRequest.data
  }
  return (
    <div>
      <HtmlHead title="Contact Us" />
      <PageHeading text="Contact"/>
      {confirmation ? (
        <Paragraph>
          Thanks - we'll get back to you as soon as we can!
        </Paragraph>
      ) : (
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
              <ReCaptcha callback={() => recaptchaCallback() }></ReCaptcha>
              <Button variant="contained" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Register