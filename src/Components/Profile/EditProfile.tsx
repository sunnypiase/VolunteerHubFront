import {
  Box,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  Select,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../Hooks/currentUser';
import { IUser } from '../../models';

interface IUserUpdate {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  repeatPassword: string;
}

export function EditProfile() {
  const { currentUser } = useCurrentUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/account/profile');
  };

  const onSubmit = async (user: IUserUpdate) => {
    try {
      setError('');

      const response = await axios.put<IUserUpdate>(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/Users/info',
        user,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigateToProfile();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  return (
    <>
      <div className="loginHeader">
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '36px',
            color: '#FFFCFC',
            padding: '10px 0px',
            width: 'max',
          }}
        >
          Edit Profile
        </Typography>
      </div>
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
          <Box sx={{ mt: 3 }}>
            {currentUser?.name && (
              <Formik
                initialValues={{
                  name: currentUser?.name ?? 'Unknown',
                  surname: currentUser?.surname ?? 'Unknown',
                  email: currentUser?.email ?? 'Unknown',
                  phoneNumber: currentUser?.phoneNumber ?? 'Unknown',
                  address: currentUser?.address ?? 'Unknown',

                  password: '',
                  repeatPassword: '',
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
                          required
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          id="outlined-required"
                          label="First Name"
                          defaultValue={values.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="surname"
                          id="outlined-required"
                          label="Last Name"
                          defaultValue={values.surname}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="phoneNumber"
                          id="outlined-required"
                          label="Phone number"
                          defaultValue={values.phoneNumber}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="address"
                          label="Address"
                          id="outlined-required"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          disabled
                          required
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="email"
                          id="outlined-required"
                          label="Email"
                          defaultValue={values.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="outlined-required"
                          placeholder="Enter current password"
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
                          id="outlined-required"
                          placeholder="Repeat current password"
                          value={values.repeatPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: '#57897d',
                            '&:hover': {
                              backgroundColor: '#044945',
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
