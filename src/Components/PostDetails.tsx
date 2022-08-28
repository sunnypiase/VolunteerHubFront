import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthorize } from '../Hooks/isAuthorize';
import { IPost, IUser } from '../models';
import ErrorMessage from './ErrorMessage';

interface PostDetailsProps {
  post: IPost;
}

function PostDetails({ post }: PostDetailsProps) {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const postImage = `https://localhost:7266/api/Blob?name=${post.postImage.imageId}.${post.postImage.format}`;

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container>
          <Grid item xs>
            <Typography component="h2" variant="h4">
              {post.title}
            </Typography>
          </Grid>
          <Grid item>
            <CardMedia
              component="img"
              sx={{
                pt: '10.25%',
              }}
              image={postImage}
              alt="imge"
            />
            <Typography component="h2" variant="h4">
              {post.user.name}
            </Typography>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 3, mb: 2 }} variant="h5" paragraph>
          Detail description:
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {post.description}
        </Typography>

        {/* send your post if authorize */}
        {isAuthorize && <Button>Send your post</Button>}
        {/* propose sign up or register if not aythorize */}
        {!isAuthorize && (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={navigateToLogin}
            >
              Sign In
            </Button>

            <Grid>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            {error && <ErrorMessage error={error} />}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PostDetails;
