import {
  Container,
  Box,
  Typography,
  Grid,
  CardMedia,
  Rating,
  InputLabel,
  MenuItem,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { IPost } from '../models';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SimpleDetails from './SimpleDetails';

interface LocationState {
  receiverPost: IPost;
}

function SendPost() {
  const { currentUser } = useCurrentUser();

  //get props from link
  const location = useLocation();
  const { receiverPost } = location.state as LocationState;

  //user posts
  const [selectedPostTitle, setSelectedPostTitle] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPost>();

  const handleChangeTitle = (event: SelectChangeEvent) => {
    setSelectedPostTitle(event.target.value as string);
  };

  useEffect(() => {
    setSelectedPost(
      currentUser?.posts.find((post) => post.title === selectedPostTitle)
    );
    const forUserSet: IPost = selectedPost;
    forUserSet?.user = currentUser;
    setSelectedPost((prev) => (prev?.user = currentUser));
  }, [selectedPostTitle]);

  const handleSendPost = () => {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SimpleDetails post={receiverPost} />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="post-title-label">
            Select your post or create new one
          </InputLabel>
          <Select
            labelId="post-title-label"
            id="post-title"
            value={selectedPostTitle}
            label="Age"
            onChange={handleChangeTitle}
          >
            {currentUser?.posts.map((post) => (
              <MenuItem key={post.id} value={post.title}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {selectedPostTitle && (
          <Grid item xs={12}>
            <SimpleDetails post={} pos />
          </Grid>
        )}
        <Grid item xs={4}>
          <Button onClick={handleSendPost}>Send post</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SendPost;
