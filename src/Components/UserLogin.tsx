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
import CustomErrorMessage from './CustomErrorMessage';
import FormikField from './FormikField';
import PasswordInput from './PasswordInput';

export default function UserLogin() {
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
        { login, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('success login');
        navigateToHome();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  return (
    <Container
      component="main"
      sx={{
        width: '700px',
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="loginHeader">
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '36px',
              color: '#FFFCFC',
              padding: '10px 0px',
            }}
          >
            Login to VolunteerHub
          </Typography>
        </div>
        {/*component="form" noValidate onSubmit={handleSubmit} */}

        <Box
          sx={{
            width: '100%',
            padding: '30px 50px',
            backgroundColor: '#FFEDE0',
          }}
        >
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {() => (
              <Form>
                <div className="logInFields">
                  <Field
                    variant="standard"
                    name="login"
                    placeholder="Email"
                    component={FormikField}
                    type="text"
                    fullWidth
                  />

                  <Field
                    name="password"
                    placeholder="Password"
                    component={PasswordInput}
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: '30%',
                      backgroundColor: 'rgba(17, 102, 96, 0.65)',
                      margin: '20px 0px',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '300',
                      fontSize: '18px',
                      borderRadius: '20px',
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {error && <CustomErrorMessage error={error} />}
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
