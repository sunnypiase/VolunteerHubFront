import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../Hooks/tags';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';
import ImageIcon from '@mui/icons-material/Image';
import { Fragment, useState } from 'react';
import { useCurrentUser } from '../Hooks/currentUser';
import axios, { AxiosError } from 'axios';
import { ICreatePost } from '../models';

import logoVH from '../images/logoVH.png';

interface SubmitProps {
  title: string;
  description: string;
}

declare var Blob: {
  prototype: Blob;
  new (): Blob;
  new (request: any, mime: string): Blob;
};

function CreatePost() {
  const navigate = useNavigate();
  const { tags, error, loading, tagsList, handleTagsChange, setError } =
    useTags();
  const [image, setImage] = useState('');
  const { currentUser } = useCurrentUser();

  const navigateToAccountPosts = () => {
    navigate('/account/posts');
  };

  const handleCreatePost = async ({ title, description }: SubmitProps) => {
    try {
      const userId = currentUser?.userId;
      setError('');
      console.log(title, description, userId, tagsList, image);
      const response = await axios.post<ICreatePost>(
        'https://localhost:7266/api/Post',
        { title, description, userId, tagsList, image },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('success');
        //navigateToAccountPosts();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  const handleImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value;
    // setImage(URL.createObjectURL(url));
    setImage(url);
    console.log(image);
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
          <AddCircleOutlineIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create post
        </Typography>

        <Box sx={{ mt: 3, width: '40ch' }}>
          <Formik
            initialValues={{
              title: '',
              description: '',
            }}
            onSubmit={(values) => {
              handleCreatePost(values);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="Post title"
                      autoFocus
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={4}
                      required
                      fullWidth
                      id="description"
                      label="Post description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Select Tags</FormLabel>
                    <FormGroup>
                      <Grid container spacing={1}>
                        {tags.map((tag) => (
                          <Grid item key={tag.tagId} xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleTagsChange}
                                  checked={tagsList.includes(
                                    tag.tagId.toString()
                                  )}
                                />
                              }
                              label={tag.name}
                              value={tag.tagId}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </FormGroup>
                  </FormControl>
                  <Grid item xs={12}>
                    <>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        id="icon-button-file"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="icon-button-file">
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
                    <Avatar
                      src={image}
                      alt="user image"
                      sizes="(min-width: 768px) 40px, 30px"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Create Post
                    </Button>
                  </Grid>
                </Grid>

                {error && <ErrorMessage error={error} />}

                {/* test show of data */}
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(tagsList, null, 2)}</pre>
                <pre>{JSON.stringify(image, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}

export default CreatePost;
