import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { usePosts } from '../Hooks/posts';
import Copyright from './Copyright';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostSimpleView from './PostSimpleView';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';

import { IPost } from '../models';
import TagsList from './TagsList';
import { UserContext } from '../context/UserContext';
import { Button } from '@mui/material';

export default function PoststList() {
  const { posts, error, loading, setPosts, getPosts } = usePosts();
  //for modal
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();
  const [loadingPostsCount, setLoadingPostsCount] = useState(10);

  return (
    <>
      <TagsList setPosts={setPosts} getPosts={getPosts} />
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <main className="posts">
        {/* Hero unit */}
        <Box
          sx={{
            pt: 4,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              sx={{
                fontSize: '36px',
                fontWeight: '400',
                textAlign: 'center',
              }}
            >
              Posts
            </Typography>
          </Container>
        </Box>
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
            {posts.slice(0, loadingPostsCount).map((post) => (
              <Grid
                item
                key={post.postId}
                sx={{
                  padding: '0px!important',
                  width:'100%',
                  margin: '20px'
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
            ))}
            <Grid item
              sx={{
                padding: '0px!important',
                margin: '10px 20px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button
                onClick={() => posts.length - 10 <= loadingPostsCount ? setLoadingPostsCount(posts.length) : setLoadingPostsCount(loadingPostsCount + 10)}
                sx={{
                  backgroundColor: 'rgba(89, 143, 135, 0.9)',
                  borderRadius: '20px',
                  width: '30%',
                  padding: '5px 10px',
                  color: '#fffcfc',
                  fontSize: '20px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  '&:hover': {
                    backgroundColor: '#044945',
                  },
                }}
              >
                More posts
              </Button>
            </Grid>
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
      </main>
      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#4F3328',
          padding: '20px 0px 10px 0px',
        }}
        component="footer"
      >
        <Copyright />
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
          sx={{
            color: 'white',
          }}
        >
          For more information look FAQ
        </Typography>
      </Box>
    </>
  );
}
