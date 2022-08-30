import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IPost } from '../models';
import PostDetails from './PostDetails';
import { Grid } from '@mui/material';
import { usePosts } from '../Hooks/posts';
import Post from './Post';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { posts, error, loading, addPost } = usePosts();

  //additional
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentPost, setCurrentPost] = React.useState<IPost | undefined>();

  return (
    <div>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={12} md={12}>
            <Post
              post={post}
              user={post.user}
              key={post.id}
              setCurrentPost={(currentPost: IPost) =>
                setCurrentPost(currentPost)
              }
            />
          </Grid>
        ))}
        {currentPost !== undefined && (
          <Modal
            open={currentPost !== undefined}
            onClose={() => setCurrentPost(undefined)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PostDetails post={currentPost} />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
            </Box>
          </Modal>
        )}
      </Grid>
    </div>
  );
}
