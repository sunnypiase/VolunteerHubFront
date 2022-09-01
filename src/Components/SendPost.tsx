import { Button, Grid, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { IPost } from '../models';
import Post from './Post';

interface LocationState {
  receiverPost: IPost;
}

function SendPost() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  currentUser?.posts.forEach((post) => (post.user = currentUser));
  //get props from link
  const location = useLocation();
  const { receiverPost } = location.state as LocationState;

  //user posts
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPost>();

  const handleChangeTitle = (event: SelectChangeEvent) => {
    setSelectedPostId(event.target.value as string);
  };

  useEffect(() => {
    setSelectedPost(
      currentUser?.posts.find((post) => post.postId === +selectedPostId)
    );
  }, [selectedPostId]);

  const handleSendPost = () => {};

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Post
            post={receiverPost}
            isDetailsVisible={false}
            setCurrentPost={(receiverPost) => {}}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="post-title-label">
            Select your post or create new one
          </InputLabel>
          <Select
            labelId="post-title-label"
            id="post-title"
            value={selectedPostId}
            onChange={handleChangeTitle}
          >
            {currentUser?.posts.map((post) => (
              <MenuItem key={post.postId} value={post.postId}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          {selectedPostId && selectedPost && (
            <Post
              post={selectedPost}
              isDetailsVisible={false}
              setCurrentPost={(selectedPost) => {}}
            />
          )}
        </Grid>

        <Grid item xs={4}>
          <Button onClick={handleSendPost}>Send post</Button>
        </Grid>
        <Button
          variant="contained"
          sx={{
            borderRadius: 28,
            position: 'fixed',
            bottom: '2%',
            right: '2%',
            zIndex: 2000,
          }}
          onClick={navigateToCreatePost}
        >
          New post
        </Button>
      </Grid>
    </>
  );
}

export default SendPost;
