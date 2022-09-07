import { Copyright } from '@mui/icons-material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import CustomModal from '../Components/CustomModal';
import PostDetails from '../Components/PostsComponents/PostDetails';
import PostSimpleView from '../Components/PostsComponents/PostSimpleView';
import SiteLoader from '../Components/SiteLoader';
import TagsList from '../Components/PostsComponents/TagsList';
import VHBar from '../Components/VHBar';
import { usePostsList } from '../Hooks/postsList';
import { IPost } from '../models';

function HomePage() {
  const {
    posts,
    error,
    loading,
    loadingPostsCount,
    postsRole,
    setPosts,
    getPosts,
    setLoadingPostsCount,
    handleShowPostsChange,
  } = usePostsList();
  //for modal
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();
  return (
    <>
      <VHBar />
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
            }}
            onClick={handleShowPostsChange}
          >
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
                  <PostDetails post={currentPostModal} displayButtons={true} />
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
      <ScrollToTop
        smooth
        top={400}
        component={<KeyboardArrowUpRoundedIcon fontSize="large" />}
      />
    </>
  );
}

export default HomePage;
