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
import { IPost, IUser } from '../models';
import ErrorMessage from './ErrorMessage';

const initialUser: IUser = {
  id: 2,
  name: 'Volunteer',
  email: 'volunteer@example.com',
  password: 'volunteer',
  surname: 'Test',
  phoneNumber: '88005553535',
  address: 'Volunteer street',
  role: 0,
};
interface PostDetailsProps {
  post: IPost;
}
interface GetUserByIdProps {
  userId: number;
}

function PostDetails({ post }: PostDetailsProps) {
  const [error, setError] = useState('');
  const [user, setUser] = useState<IUser>(initialUser);
  const [loading, setLoading] = useState(false);

  const getUserById = async ({ userId }: GetUserByIdProps) => {
    setError('');
    setLoading(true);

    console.log('Before get id');
    const response = await axios.get<IUser>(
      'https://localhost:7266/api/Users/' + userId,
      {
        withCredentials: true,
      }
    );
    console.log('after get id');
    console.log(response.data);
  };

  useEffect(() => {
    const obj = { userId: post.userId };
    getUserById(obj);
  }, []);

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
              image={post.image}
              alt="user-image"
            />
            <Typography component="h2" variant="h4">
              {user.name}
            </Typography>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 3, mb: 2 }} variant="h5" paragraph>
          Detail description:
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {post.description}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/*Here we need to add link to our site */}
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/*Here we need to add link to our site */}
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {error && <ErrorMessage error={error} />}
        </Box>
      </Box>
    </Container>
  );
}

export default PostDetails;
