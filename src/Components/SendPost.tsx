import {
  Container,
  Box,
  Typography,
  Grid,
  CardMedia,
  Rating,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { IPost } from '../models';

interface LocationState {
  receiverPost: IPost;
}

function SendPost() {
  const { currentUser } = useCurrentUser();

  //get props from link
  const location = useLocation();
  const { receiverPost } = location.state as LocationState;
  const postImage = `https://localhost:7266/api/Blob?name=${receiverPost.postImage.imageId}.${receiverPost.postImage.format}`;
  const [userRating, setUserRating] = useState<number | null>(0);

  console.log(receiverPost);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h2" variant="h4" align="center">
          {receiverPost.title}
        </Typography>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Typography variant="h5" color="text.secondary" paragraph>
              {receiverPost.description}
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <CardMedia
              component="img"
              sx={{
                pt: '10.25%',
                width: '200px',
                height: '200px',
              }}
              image={postImage}
              alt="post_image"
            />
            <Typography component="h2" variant="h4">
              {receiverPost.user.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-center' }}>
              <Rating
                name="simple-controlled"
                value={userRating}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
          }}
        >
          {receiverPost.tags.map((tag) => (
            <Grid item key={tag.tagId}>
              <Typography
                sx={{
                  backgroundColor: '#FFEDE0',
                  padding: '3px 3px',
                  margin: '10px 5px',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 6px black',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  width: '100px',
                }}
              >
                {tag.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default SendPost;
