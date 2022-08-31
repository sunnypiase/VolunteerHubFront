import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { readFile } from 'fs';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { useTags } from '../Hooks/tags';
import { ICreatePost } from '../models';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';

interface SubmitProps {
  title: string;
  description: string;
}

function CreatePost() {
  const navigate = useNavigate();
  const { tags, error, loading, tagsList, handleTagsChange, setError } =
    useTags();
  const { currentUser } = useCurrentUser();

  //another example------------------------
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [imageBlobUrl, setImageBlobUrl] = useState('');
  const [fileToSend, setFileToSend] = useState<FormData>();

  const handleCreatePost = async ({ title, description }: SubmitProps) => {
    try {
      const userId = currentUser?.userId;
      setError('');

      const data: ICreatePost = {
        title: title,
        description: description,
        userId: currentUser?.userId!,
        tagIds: tagsList,
      };
      fileToSend?.append('userId', data.userId.toString());
      fileToSend?.append('title', data.title);
      fileToSend?.append('description', data.description);
      for (let i = 0; i < data.tagIds.length; i++) {
        fileToSend?.append(`tagIds[${i}]`, data.tagIds[i].toString());
      }

      const response = await axios.post(
        'https://localhost:7266/api/Post',
        fileToSend,
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

  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;
    if (files) {
      const formData = new FormData();
      formData.append('imageFile', files[0]);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
    }
  };

  const navigateToAccountPosts = () => {
    navigate('/account/posts');
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
                                  checked={tagsList.includes(tag.tagId)}
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
                      Create Post
                    </Button>
                  </Grid>
                </Grid>

                {error && <ErrorMessage error={error} />}

                {/* test show of data */}
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(tagsList, null, 2)}</pre>
                <pre>{JSON.stringify(imageBlobUrl, null, 2)}</pre>
                <pre>{JSON.stringify(fileToSend, null, 2)}</pre>
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
