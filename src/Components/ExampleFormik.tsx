import { Grid, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import ExampleMyField from './ExampleMyField';

interface Props {
  onSubmit: (values: Values) => void;
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const ExampleFormik: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        {/* тут іде сам формік */}
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '' }}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <Field
                  name="firstName"
                  placeholder="first name"
                  component={ExampleMyField}
                  type="password"
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  placeholder="last name"
                  component={ExampleMyField}
                />
              </div>
              <div>
                <Field
                  name="email"
                  placeholder="email"
                  component={ExampleMyField}
                />
              </div>
              <Button type="submit">Submit</Button>
              {/* pre - показати точно як є всередині */}
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
