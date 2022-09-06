import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { usePosts } from '../Hooks/posts';
import Copyright from './Copyright';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostDetails from './PostDetails';
import PostSimpleView from './PostSimpleView';
import SiteLoader from './SiteLoader';
import { Button } from '@mui/material';
import { IPost } from '../models';
import TagsList from './TagsList';

export default function PoststList() {
  const { posts, error, loading, setPosts, getPosts } = usePosts();
  //for modal
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();
  const [loadingPostsCount, setLoadingPostsCount] = useState(3);

  const [postsRole, setPostsRole] = useState(0);

  const handleShowPostsChange = () => {
    postsRole === 0 ? setPostsRole(1) : setPostsRole(0);
  };

  return (
    <>
      <TagsList
        setPosts={setPosts}
        getPosts={getPosts}
        setLoadingPostsCount={setLoadingPostsCount}
      />
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <main className="posts">
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
        <Button
          sx={{
            backgroundColor: 'rgba(89, 143, 135, 0.9)',
            borderRadius: '20px',
            width: '30%',
            padding: '5px 10px',
            color: '#fffcfc',
            fontSize: '18px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            '&:hover': {
              backgroundColor: '#044945',
            },
          }} onClick={handleShowPostsChange}>
          {postsRole ? 'See voluntter posts' : 'See needful posts'}
        </Button>
        <Container
          sx={{
            '@media': {
              maxWidth: 'none',
            },
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              width: '80%',
              margin: '0px auto',
            }}
          >

            {posts
              .filter((post) => post.user.role === postsRole)
              .slice(0, loadingPostsCount)
              .map((post) => (
                <Grid
                  item
                  key={post.postId}
                  sx={{
                    padding: '0px!important',
                    width: '100%',
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
              ))}
            <Grid
              item
              sx={{
                padding: '0px!important',
                margin: '10px 20px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {posts.length !== loadingPostsCount && (
                <Button
                  onClick={() =>
                    posts.length - 3 <= loadingPostsCount
                      ? setLoadingPostsCount(posts.length)
                      : setLoadingPostsCount(loadingPostsCount + 3)
                  }
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
              )}
            </Grid>
            {/* set modal for post view */}
            {currentPostModal !== undefined && (
              <CustomModal
                h1CustomClass="modal-title"
                isAutoModalHeight={true}
                title="Post Details"
                onClose={() => setCurrentPostModal(undefined)}
              >
                <PostDetails post={currentPostModal} />
              </CustomModal>
            )}
          </Grid>
        </Container>
      </main>
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
