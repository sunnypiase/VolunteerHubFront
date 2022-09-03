import { Button, Container, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostSimpleView from './PostSimpleView';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';
import { useCurrentUserPosts } from '../Hooks/currentUserPosts';

function AccounPosts() {
  const { error, loading, currentUserPosts } = useCurrentUserPosts();
  //for modal post
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();

  const navigate = useNavigate();

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
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
          {currentUserPosts.map((post) => {
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
                <PostSimpleView
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
            <CustomModal
              h1CustomClass="modal-title"
              title="Post Details"
              onClose={() => setCurrentPostModal(undefined)}
            >
              <PostDetails post={currentPostModal} />
            </CustomModal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
