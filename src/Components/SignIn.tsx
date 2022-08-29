import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios, { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserLogIn } from '../models';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';
import ExampleMyField from './ExampleMyField';

//testing input
// const userVolunteerTest: IUserLogIn = {
//   login: 'volunteer@example.com',
//   password: 'volunteer',
// };
const userNeedfulTest: IUserLogIn = {
  login: 'needful@example.com',
  password: 'needful1',
};

//Submit the data to API server
export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const navigateToHome = () => {
    navigate('/');
  };

  const onSubmit = async ({ login, password }: IUserLogIn) => {
    try {
      setError('');
      const response = await axios.post<IUserLogIn>(
        'https://localhost:7266/api/Users/login',
        userNeedfulTest,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigateToHome();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/*component="form" noValidate onSubmit={handleSubmit} */}

        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values }) => (
              <Form>
                <Field
                  name="login"
                  placeholder="Email"
                  component={ExampleMyField}
                  type="text"
                  fullWidth
                />

                <Field
                  name="password"
                  placeholder="Password"
                  component={ExampleMyField}
                  type="password"
                  fullWidth
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {/* test show of data */}
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
          {/* 
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          */}
          {error && <ErrorMessage error={error} />}
          <Grid container>
            <Grid item xs>
              {/*Here we need to add link to our site */}
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/*Here we need to add link to our site */}
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
