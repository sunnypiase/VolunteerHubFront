import { Button, Container, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import ErrorMessage from './ErrorMessage';
import * as React from 'react';
import { useState } from 'react';
import { usePosts } from '../Hooks/posts';
import { IPost } from '../models';
import SiteLoader from './SiteLoader';
import Post from './Post';
import PostDetails from './PostDetails';
import Modal from './Modal';
import { useCurrentUser } from '../Hooks/currentUser';
import { useNavigate } from 'react-router-dom';

function AccounPosts() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  //як варінат
  //   const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const { posts, error, loading, addPost } = usePosts();
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Button onClick={navigateToCreatePost}>New post</Button>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={12} md={12}>
              <Post
                post={post}
                key={post.id}
                setCurrentPost={(currentPost: IPost) =>
                  setCurrentPost(currentPost)
                }
              />
            </Grid>
          ))}
          {/* set modal for post view */}
          {currentPost !== undefined && (
            <Modal
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
