import {
  Card,
  Stack,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import * as React from 'react';
import { IPost } from '../models';
import Modal from './Modal';
import { ModalContext } from '../context/ModalContext';
import PostDetails from './PostDetails';
import { useState } from 'react';

interface PostProps {
  post: IPost;
  setCurrentPost: (currentPost: IPost) => void;
}

function Post({ post, setCurrentPost }: PostProps) {
  const { modal, open, close } = React.useContext(ModalContext);
  const [innerPost, setInnerPost] = useState<IPost>(post);

  return (
    <div>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          //image="https://source.unsplash.com/random"
          alt="random"
        /> */}
        <CardContent sx={{ flexGrow: 1, justifyItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {post.title}
          </Typography>
          <Typography align="center">{post.description}</Typography>
        </CardContent>
        <Stack direction="row" justifyContent="end">
          <CardActions>
            <Button size="small" onClick={() => setCurrentPost(post)}>
              View
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </div>
  );
}

export default Post;
