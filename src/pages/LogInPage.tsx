import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { Link as LinkRouter } from 'react-router-dom';
import VHBar from '../Components/VHBar';
import { useUserLogin } from '../Hooks/userLogin';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import FormikField from '../Components/FormikField';
import PasswordInput from '../Components/PasswordInput';

function LogInPage() {
  const { error, handleUserLogin } = useUserLogin();

  return (
    <>
      <VHBar />
      <Container
        component="main"
        sx={{
          width: '700px',
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
                handleUserLogin(values);
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
                <LinkRouter to="#" className="standard-link">
                  Forgot password?
                </LinkRouter>
              </Grid>
              <Grid item>
                {/*Here we need to add link to our site */}
                <LinkRouter to="/register" className="standard-link">
                  {"Don't have an account? Sign Up"}
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LogInPage;
