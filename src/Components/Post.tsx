import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  CardMedia,
  Grid
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
          backgroundColor: '#FBDBC3',
          borderRadius: '20px',
          boxShadow: '0px 4px 4px rgba(243, 189, 149, 0.58)'
        }}
      >
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '30px',
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            {post.title}
          </Typography>
          <div className='postContent'>
            <div className='postUser'>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  overflow: 'hidden'
                }}
                image={`https://localhost:7266/api/Blob?name=${post.user.profileImage.imageId}.${post.user.profileImage.format}`}
                alt="UserImage"
              />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px'
                }}>
                {`${post.user.name} ${post.user.surname}`}
              </Typography>
            </div>
            <Typography align="left"
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '22px',
                width: '80%'
              }}>{post.description}</Typography>
          </div>
        </CardContent>
        <Stack direction="row" justifyContent="space-between"
          sx={{
            marginLeft: '20%'
          }}>
          <div className='postTags'>
            <Grid container sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              {post.tags.map((tag) => (<Grid item key={tag.tagId}>
                <Typography sx={{
                  backgroundColor: '#FFEDE0',
                  padding: '3px 10px',
                  margin: '0px 10px',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 6px black',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '17px'
                }}>
                  {tag.name}
                </Typography>
              </Grid>))}
            </Grid>
          </div>
          <CardActions>
            <Button size="small" onClick={() => setCurrentPost(post)}
              sx={{
                backgroundColor: 'rgba(17, 102, 96, 0.7)',
                borderRadius: '20px',
                padding: '5px 10px',
                marginRight: '5px',
                color: '#fffcfc',
                fontSize: '20px',
                '&:hover': {
                  backgroundColor: '#044945',
                }
              }}>
              Details
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </div >
  );
}

export default Post;
