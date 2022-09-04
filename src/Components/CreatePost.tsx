import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import {
  CardMedia,
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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { useTags } from '../Hooks/tags';
import { ICreatePost } from '../models';
import Copyright from './Copyright';
import CustomErrorMessage from './CustomErrorMessage';
import DefaultPostImage from '../images/DefaultPostImage.png';

interface SubmitProps {
  title: string;
  description: string;
}

function CreatePost() {
  const navigate = useNavigate();
  const { tags, error, tagsList, handleTagsChange, setError } = useTags();
  const { currentUser } = useCurrentUser();

  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultPostImage);
  const [fileToSend, setFileToSend] = useState<FormData>();

  const handleCreatePost = async ({ title, description }: SubmitProps) => {
    try {
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

      const response = await axios.post<FormData>(
        'https://localhost:7266/api/Post',
        fileToSend,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('create post success');
        navigateToAccountPosts();
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
    <Container component="main"
      sx={{
        width: '80%',
      }}>
      <CssBaseline />
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
            Create post
          </Typography>
        </div>

        <Box
          sx={{
            width: '100%',
            padding: '30px 50px',
            backgroundColor: '#FFEDE0',
          }} >
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
                <Grid container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Grid item
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <div className="upload-post-photo-positioning">
                      <CardMedia
                        component="img"
                        sx={{
                          maxWidth: '200px',
                          height: '150px',
                          width: 'auto',
                          borderRadius: '10px',
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
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TextField
                        name="title"
                        required
                        id="title"
                        label="Post title"
                        autoFocus
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                        sx={{ width: '100%' }}
                      />
                      <TextField
                        multiline
                        rows={4}
                        required
                        id="description"
                        label="Post description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                        sx={{ width: '100%' }}
                      />
                    </Box>
                  </Grid>
                  <FormControl
                    sx={{ margin: '15px 0px' }}
                    component="fieldset"
                    variant="standard"
                    className="input-field"
                  >
                    <FormLabel component="legend"
                      sx={{
                        paddingLeft: '20px',
                        color: '#00adb5'
                      }}
                    >
                      Select Tags
                    </FormLabel>
                    <FormGroup>
                      <Grid container
                        spacing={12}
                        direction="row"
                        justifyContent="left"
                        alignItems="space-evenly"
                        sx={{
                          width: '100%',
                          margin: '0px',
                        }}>
                        {tags.map((tag) => (
                          <Grid item
                            key={tag.tagId}
                            xs={12}
                            sm={6}
                            md={3}
                            sx={{
                              display: 'flex',
                              justifyContent: 'left',
                              padding: '10px 20px!important',
                            }}>
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
                  <Grid item sx={{ width: '40%' }}>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: 'rgba(17, 102, 96, 0.7)',
                        color: '#FFFCFC',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '15px',
                        width: '100%',
                        margin: '15px 0px 10px 0px',
                        borderRadius: '15px',
                        '&:hover': {
                          backgroundColor: '#044945',
                        },
                      }}
                    >
                      Create Post
                    </Button>
                  </Grid>
                </Grid>

                {error && <CustomErrorMessage error={error} />}
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
