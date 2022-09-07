import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTags } from '../Hooks/tags';
import DefaultPostImage from '../images/DefaultPostImage.png';
import { IPost } from '../models';
import Copyright from './Copyright';
import CustomErrorMessage from './CustomErrorMessage';

interface UpdateProps {
  title: string;
  description: string;
}

interface LocationState {
  postToEdit: IPost;
}

interface IUpdatePost {
  postId: number;
  title: string;
  description: string;
  postImageFile: string;
  tags: number[];
}

function EditUserPost() {
  const [error, setError] = useState('');
  const { tags, tagsList, setPresetTags, handleTagsChange } = useTags();

  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultPostImage);

  const navigate = useNavigate();

  const navigateToUserPosts = () => {
    navigate('/account/posts');
  };

  // create file from image blob
  async function createFile() {
    let response = await fetch(
      `https://localhost:7266/api/Blob?name=${postToEdit?.postImage.imageId}.${postToEdit?.postImage.format}`
    );
    let data = await response.blob();
    let metadata = {
      type: 'image/png',
    };
    let file = new File([data], 'userImage.png', metadata);
    return file;
  }

  //get props from link---
  const location = useLocation();
  const { postToEdit } = location.state as LocationState;

  const handleUpdatePost = async ({ title, description }: UpdateProps) => {
    try {
      setError('');

      const dataToSend: IUpdatePost = {
        postId: postToEdit.postId,
        title: title,
        description: description,
        postImageFile: imageBlobUrl,
        tags: tagsList,
      };

      const formData = new FormData();
      const files = imageInput.current?.files;

      if (files!.length > 0) {
        formData.append('postImageFile', files![0]);
      } else {
        //return last post image photo
        formData.append('postImageFile', await createFile());
      }
      formData.append('postId', dataToSend.postId.toString());
      formData.append('title', dataToSend.title);
      formData.append('description', dataToSend.description);
      for (let i = 0; i < dataToSend.tags.length; i++) {
        formData?.append(`tagIds[${i}]`, dataToSend.tags[i].toString());
      }

      const response = await axios.put<FormData>(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/Post/UpdatePostById',
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('Post update successfuly');
        navigateToUserPosts();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  //change image input
  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;
    if (files) {
      setImageBlobUrl(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    setPresetTags(postToEdit.tags);
    setImageBlobUrl(
      `https://localhost:7266/api/Blob?name=${postToEdit?.postImage.imageId}.${postToEdit?.postImage.format}`
    );
  }, []);

  return (
    <Container
      component="main"
      sx={{
        width: '80%',
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
            Edit post
          </Typography>
        </div>

        <Box
          sx={{
            width: '100%',
            padding: '30px 50px',
            backgroundColor: '#FFEDE0',
          }}
        >
          {postToEdit && (
            <Formik
              initialValues={{
                title: postToEdit.title,
                description: postToEdit.description,
              }}
              onSubmit={(values) => {
                handleUpdatePost(values);
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
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
                          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                            (event.currentTarget.src = DefaultPostImage)}
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
                        }}
                      >
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
                      <FormLabel
                        component="legend"
                        sx={{
                          paddingLeft: '20px',
                          color: '#00adb5',
                        }}
                      >
                        Select Tags
                      </FormLabel>
                      <FormGroup>
                        <Grid
                          container
                          spacing={12}
                          direction="row"
                          justifyContent="left"
                          alignItems="space-evenly"
                          sx={{
                            width: '100%',
                            margin: '0px',
                          }}
                        >
                          {tags.map((tag) => (
                            <Grid
                              item
                              key={tag.tagId}
                              xs={12}
                              sm={6}
                              md={3}
                              sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                padding: '10px 20px!important',
                              }}
                            >
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
                        Edit post
                      </Button>
                    </Grid>
                  </Grid>

                  {error && <CustomErrorMessage error={error} />}
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}

export default EditUserPost;
