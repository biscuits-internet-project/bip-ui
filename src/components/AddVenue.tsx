import React from 'react'
import { Form, Formik, FormikProps} from 'formik'
import TextField from './shared/TextField'

interface IValues {
    one: string
    two: string
    three: string
}

const AddVenue: React.FC = () => {
    return (
        <div>
          <h1>Add Venue</h1>
          <Formik
            initialValues={{
              one: '',
              two: '',
              three: '',
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<IValues>) => (
              <Form>
                <TextField name="firstName" type="text" label="First Name" />
                <TextField name="lastName" type="text" label="Last Name" />
                <TextField name="email" type="email" label="Email" />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

  export default AddVenue