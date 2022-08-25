import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { IUserRegister } from '../models';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';

//Submit data to API
export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     role: data.get('role'),
  //   });

  //   const response = await axios.get<IUserRegister>(
  //     'https://localhost:7266/api/Users/register',
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const onSubmit = async (user: IUserRegister) => {
    try {
      setError('');

      const response = await axios.post<IUserRegister>(
        'https://localhost:7266/api/Users/register',
        user,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigateToLogin();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              password: '',
              repeatPassword: '',
              phoneNumber: '',
              address: '',
              role: '',
            }}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      autoFocus
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="surname"
                      label="Last Name"
                      name="surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="repeatPassword"
                      label="Repeat password"
                      type="password"
                      id="repeatPassword"
                      value={values.repeatPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone number"
                      id="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="role">Select role*</InputLabel>
                    <Select
                      required
                      fullWidth
                      name="role"
                      label="Select role"
                      id="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={'Volunteer'}>Volunteer</MenuItem>
                      <MenuItem value={'Needful'}>Needful</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                {error && <ErrorMessage error={error} />}

                {/* test show of data */}
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
