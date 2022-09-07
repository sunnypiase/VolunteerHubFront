import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserPosts } from '../Hooks/currentUserPosts';
import { IPost } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostDetails from './PostDetails';
import PostSimpleView from './PostSimpleView';
import SiteLoader from './SiteLoader';

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
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          zIndex: 2000,
          backgroundColor: 'rgba(17, 102, 96, 0.7)',
          borderRadius: '15px',
          padding: '5px 10px',
          color: '#fffcfc',
          fontSize: '15px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          '&:hover': {
            backgroundColor: '#044945',
          },
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
                sx={{
                  width: '100%',
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
              isAutoModalHeight={true}
              title="Post Details"
              onClose={() => setCurrentPostModal(undefined)}
            >
              <PostDetails post={currentPostModal} displayButtons={true} />
            </CustomModal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
