import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { usePosts } from '../Hooks/posts';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import Post from './Post';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';

import { IPost } from '../models';
import TagsList from './TagsList';

export default function PoststList() {
  const { posts, error, loading, addPost, setPosts, getPosts } = usePosts();
  //for modal
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  return (
    <>
      <TagsList setPosts={setPosts} getPosts={getPosts} />
      {error && <ErrorMessage error={error} />}
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
            spacing={12}
            direction="column"
            sx={{
              width: '80%',
              margin: '0px auto',
            }}
          >
            {posts.map((post) => (
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
