import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models";

interface UserInfoTableProps {
  currentUser: IUser | undefined;
}

interface IUserUpdate {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export function UserInfoTable({ currentUser }: UserInfoTableProps) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/account/profile");
  };

  const onSubmit = async (user: IUserUpdate) => {
    try {
      setError("");

      const response = await axios.put<IUserUpdate>(
        `${process.env.REACT_APP_API_URL!.trim()}` + "/api/Users/info",
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
    <Container component="main">
      <Box
        sx={{
          marginTop: 3,
          marginBottom: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          {currentUser?.name && (
            <Formik
              initialValues={{
                name: currentUser?.name ?? "Unknown",
                surname: currentUser?.surname ?? "Unknown",
                email: currentUser?.email ?? "Unknown",
                phoneNumber: currentUser?.phoneNumber ?? "Unknown",
                address: currentUser?.address ?? "Unknown",

                password: "",
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
                        className="input-field"
                        required
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        label="First Name"
                        id="outlined-required"
                        defaultValue={values.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className="input-field"
                        required
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="surname"
                        id="outlined"
                        label="Last Name"
                        defaultValue={values.surname}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className="input-field"
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
                        className="input-field"
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
                        id="outlined-read-only-input"
                        className="input-field"
                        disabled
                        required
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        label="Email"
                        defaultValue={values.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#57897d",
                          "&:hover": {
                            backgroundColor: "#044945",
                          },
                        }}
                      >
                        Update
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
  );
}
