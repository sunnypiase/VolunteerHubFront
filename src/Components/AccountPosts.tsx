import { Button, Container, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../models';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import Post from './Post';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';

function AccounPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  //for modal
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();

  const getUserPosts = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IPost[]>(
        'https://localhost:7266/api/Post/currentUser',
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setUserPosts(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

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
        New post
      </Button>
      <Container
        sx={{
          '@media': {
            maxWidth: 'none',
          },
        }}
      >
        {/* End hero unit */}
        <Grid
          container
          spacing={12}
          direction="column"
          sx={{
            width: '80%',
            margin: '0px auto',
          }}
        >
          {userPosts.map((post) => {
            return (
              <Grid
                item
                key={post.postId}
                xs={12}
                sm={12}
                md={12}
                sx={{
                  padding: '0px!important',
                  margin: '20px',
                }}
              >
                <Post
                  post={post}
                  key={post.postId}
                  setCurrentPost={(currentPost: IPost) =>
                    setCurrentPostModal(currentPost)
                  }
                  isDetailsVisible={true}
                />
              </Grid>
            );
          })}
          {/* set modal for post view */}
          {currentPostModal !== undefined && (
            <Modal
              h1CustomClass="modal-title"
              title="Post Details"
              onClose={() => setCurrentPostModal(undefined)}
            >
              <PostDetails post={currentPostModal} />
            </Modal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
