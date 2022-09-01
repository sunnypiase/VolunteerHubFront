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
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserRegister } from '../models';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';
import ImageIcon from '@mui/icons-material/Image';

//Submit data to API
export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //for image work
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState('');
  const [fileToSend, setFileToSend] = useState<FormData>();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const registerUser = async (user: IUserRegister) => {
    try {
      setError('');

      fileToSend?.append('name', user.name);
      fileToSend?.append('surname', user.surname);
      fileToSend?.append('email', user.email);
      fileToSend?.append('password', user.password);
      fileToSend?.append('repeatPassword', user.repeatPassword);
      fileToSend?.append('address', user.address);
      fileToSend?.append('phoneNumber', user.phoneNumber);
      fileToSend?.append('role', user.role);

      const response = await axios.post<FormData>(
        'https://localhost:7266/api/Users/register',
        fileToSend,
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

  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;
    if (files) {
      const formData = new FormData();
      formData.append('profileImageFile', files[0]);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
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
              registerUser(values);
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
                    <>
                      <input
                        hidden
                        id="uploadImage"
                        name="uploadImage"
                        accept="image/*"
                        type="file"
                        ref={imageInput}
                        onInput={(e) => {
                          handleImageChange(e);
                        }}
                      />
                      <label htmlFor="uploadImage">
                        <Button
                          variant="contained"
                          component="span"
                          size="large"
                          color="primary"
                        >
                          <ImageIcon />
                          Upload photo
                        </Button>
                      </label>
                    </>
                    <img src={imageBlobUrl} alt="user image" width="400" />
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
