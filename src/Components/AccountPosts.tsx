import { Button, Container, Grid } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { usePosts } from '../Hooks/posts';
import { IPost } from '../models';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import Post from './Post';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';

function AccounPosts() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const { error, loading } = usePosts();
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  const getUserPosts = React.useCallback(() => {
    if (currentUser !== undefined) setUserPosts(currentUser.posts);
  }, [currentUser]);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

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
            post.user = currentUser!;
            return (
              <Grid
                item
                key={post.id}
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
                  key={post.id}
                  setCurrentPost={(currentPost: IPost) =>
                    setCurrentPost(currentPost)
                  }
                />
              </Grid>
            );
          })}
          {/* set modal for post view */}
          {currentPost !== undefined && (
            <Modal
              h1CustomClass="text-2xl text-center mb-2"
              title="Post Details"
              onClose={() => setCurrentPost(undefined)}
            >
              <PostDetails post={currentPost} />
            </Modal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
