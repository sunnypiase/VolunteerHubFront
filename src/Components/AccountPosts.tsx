import { Button, Container, Grid, Modal } from '@mui/material';
import axios, { AxiosError } from 'axios';
import ErrorMessage from './ErrorMessage';
import * as React from 'react';
import { useState } from 'react';
import { usePosts } from '../Hooks/posts';
import { IPost } from '../models';
import SiteLoader from './SiteLoader';
import Post from './Post';
import PostDetails from './PostDetails';

function AccounPosts() {
  //як варінат
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const { addPost } = usePosts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Button>New post</Button>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}></Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
