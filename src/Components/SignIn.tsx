import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import { IUserLogIn } from '../models';
import SiteLogout from './SiteLogout';

const userDataTestPost: IUserLogIn = {
  login: 'oleh@gmail.com',
  password: '1234567890',
};

//Submit the data to API server
export default function SignIn() {
  const [error, setError] = useState('');

  //Enter submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const data = new FormData(event.currentTarget);

    // const email = data.get('email').toString;
    // const passwordIn = data.get('password').toString;
    // console.log(`${email} and ${password}`);

    // if (email === '' || password === '') {
    //   setError('Please enter valid data');
    //   return;
    // }

    // const userLogin: IUserLogIn = {
    //   name: email,
    //   password: passwordIn,
    // };
    console.log('Before post');

    //for cros
    //axios.defaults.withCredentials = true;
    const response = await axios.post<IUserLogIn>(
      'https://localhost:7266/api/Users/login',
      userDataTestPost
    );
    console.log('After post');
    console.log(response);
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              {/*Here we need to add link to our site */}
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/*Here we need to add link to our site */}
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {error && <ErrorMessage error={error} />}
        </Box>
      </Box>
      <Copyright />
      <SiteLogout />
    </Container>
  );
}
