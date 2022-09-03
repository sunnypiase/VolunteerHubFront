import { Button, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import { Form, Formik, validateYupSchema } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUserPosts } from '../Hooks/currentUserPosts';
import { IPost, IPostConnection } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import PostSimpleView from './PostSimpleView';

interface LocationState {
  receiverPost: IPost;
}
interface SendValueProps {
  title: string;
  description: string;
}

function SendPost() {
  const [error, setError] = useState('');
  const { currentUserPosts } = useCurrentUserPosts();

  //get props from link---
  const location = useLocation();
  const { receiverPost } = location.state as LocationState;

  //user posts
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPost>();

  const navigate = useNavigate();

  const handleChangeTitle = (event: SelectChangeEvent) => {
    setSelectedPostId(event.target.value as string);
  };

  useEffect(() => {
    setSelectedPost(
      currentUserPosts.find((post) => post.postId === +selectedPostId)
    );
  }, [selectedPostId]);

  //to refactor============================
  const handleSendPost = async ({ title, description }: SendValueProps) => {
    try {
      setError('');
      let volunteerId = 0;
      let needfulId = 0;
      if (selectedPost) {
        //0 - volunteer, 1- needful
        selectedPost.user.role === 0
          ? (volunteerId = selectedPost.postId)
          : (volunteerId = receiverPost.postId);
        selectedPost.user.role === 0
          ? (needfulId = receiverPost.postId)
          : (needfulId = selectedPost.postId);
      }

      const sendData: IPostConnection = {
        title: title,
        message: description,
        volunteerPostId: volunteerId,
        needfulPostId: needfulId,
      };
      console.log(sendData);

      // const response = await axios.post<IPostConnection>(
      //   'https://localhost:7266/api/PostConnection',
      //   data,
      //   {
      //     withCredentials: true,
      //   }
      // );
      // if (response.status === 200) {
      //   console.log('Success connection');
      // }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PostSimpleView
            post={receiverPost}
            isDetailsVisible={false}
            setCurrentPost={(receiverPost) => {}}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="post-title-label">
            Select your post or create new one
          </InputLabel>
          <Select
            labelId="post-title-label"
            id="post-title"
            value={selectedPostId}
            onChange={handleChangeTitle}
          >
            {currentUserPosts.map((post) => (
              <MenuItem key={post.postId} value={post.postId}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          {selectedPostId && selectedPost && (
            <PostSimpleView
              post={selectedPost}
              isDetailsVisible={false}
              setCurrentPost={(selectedPost) => {}}
            />
          )}
        </Grid>

        {selectedPost && (
          <Formik
            initialValues={{
              title: '',
              description: '',
            }}
            onSubmit={(values) => {
              handleSendPost(values);
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
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      name="title"
                      required
                      id="title"
                      label="Message title"
                      autoFocus
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-field"
                      sx={{ width: '45%' }}
                    />
                    <TextField
                      required
                      multiline
                      rows={4}
                      id="description"
                      label="Message description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-field"
                      sx={{ width: '45%' }}
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
                      Send your post
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
        <Button
          variant="contained"
          sx={{
            borderRadius: 28,
            position: 'fixed',
            bottom: '2%',
            right: '2%',
            zIndex: 2000,
          }}
          onClick={navigateToCreatePost}
        >
          Create new post
        </Button>
        {error && <CustomErrorMessage error={error} />}
      </Grid>
    </>
  );
}

export default SendPost;
