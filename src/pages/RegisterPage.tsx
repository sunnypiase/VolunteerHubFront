import VHBar from '../Components/VHBar';
import { useUserRegister } from '../Hooks/userRegister';
import {
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link as LinkRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import PasswordInputFlexible from '../Components/PasswordInputFlexible';

function RegisterPage() {
  const {
    imageBlobUrl,
    imageInput,
    error,
    handleImageChange,
    handleRegisterUser,
  } = useUserRegister();

  return (
    <>
      <VHBar />
      <Container
        component="main"
        sx={{
          width: '800px',
          marginBottom: '20px'
        }}
      >
        <Box
          sx={{
            marginTop: 3,
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
              Register on VolunteerHub
            </Typography>
          </div>

          <Box
            sx={{
              width: '100%',
              padding: '30px 50px',
              backgroundColor: '#FFEDE0',
            }}
          >
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
                handleRegisterUser(values);
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <div className="upload-user-photo-positioning">
                        <CardMedia
                          component="img"
                          sx={{
                            borderRadius: '50%',
                            width: '100px',
                            height: '100px',
                            overflow: 'hidden',
                          }}
                          image={imageBlobUrl}
                        />
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
                              sx={{
                                backgroundColor: 'rgba(89, 143, 135, 0.9)',
                                borderRadius: '20px',
                                padding: '7px 14px',
                                marginRight: '5px',
                                color: '#fffcfc',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '15px',
                                marginTop: '10px',
                                '&:hover': {
                                  backgroundColor: '#044945',
                                },
                              }}
                            >
                              Upload image
                            </Button>
                          </label>
                        </>
                      </div>
                      <FormControl required sx={{ width: '25%' }}>
                        <InputLabel id="role" sx={{ marginTop: '7%' }}>
                          Select role
                        </InputLabel>
                        <Select
                          required
                          fullWidth
                          className="role-selector"
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
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        name="name"
                        required
                        id="name"
                        label="First Name"
                        autoFocus
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                        sx={{ width: '45%' }}
                      />
                      <TextField
                        required
                        id="surname"
                        label="Last Name"
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                        sx={{ width: '45%' }}
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <TextField
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                        fullWidth
                      />
                    </Grid>
                    <Grid sx={{ width: '100%' }}>
                      <PasswordInputFlexible
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        className="input-field"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <PasswordInputFlexible
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Confirm password"
                        id="repeatPassword"
                        className="input-field"
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <TextField
                        required
                        fullWidth
                        className="input-field"
                        name="phoneNumber"
                        label="Phone number"
                        id="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <TextField
                        required
                        fullWidth
                        className="input-field"
                        name="address"
                        label="Address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: 'rgba(17, 102, 96, 0.7)',
                          color: '#FFFCFC',
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          fontSize: '15px',
                          width: '40%',
                          margin: '15px 0px 10px 0px',
                          borderRadius: '15px',
                          '&:hover': {
                            backgroundColor: '#044945',
                          },
                        }}
                      >
                        Sign Up
                      </Button>

                      <LinkRouter to="/login" className="standard-link">
                        Already have an account? Sign in
                      </LinkRouter>
                    </Grid>
                  </Grid>
                  {error && <CustomErrorMessage error={error} />}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default RegisterPage;
