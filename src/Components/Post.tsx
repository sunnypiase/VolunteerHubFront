import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { IPost } from '../models';

interface PostProps {
  post: IPost;
  setCurrentPost: (currentPost: IPost) => void;
}

function Post({ post, setCurrentPost }: PostProps) {
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
