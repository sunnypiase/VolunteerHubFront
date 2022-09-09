import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../Hooks/currentUser';
import { useIsAuthorize } from '../../Hooks/isAuthorize';
import DefaultPostImage from '../../images/DefaultPostImage.png';
import DefaultUser from '../../images/DefaultUser.png';
import { IPost } from '../../models';

interface PostDetailsProps {
  post: IPost | undefined;
  displayButtons: boolean;
}

export function PostDetails({ post, displayButtons }: PostDetailsProps) {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  const postImage = `${process.env.REACT_APP_API_URL!.trim()}/api/Blob?name=${
    post?.postImage.imageId
  }.${post?.postImage.format}`;
  const userImage = `${process.env.REACT_APP_API_URL!.trim()}/api/Blob?name=${
    post?.user.profileImage.imageId
  }.${post?.user.profileImage.format}`;

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL!.trim()}` +
          '/api/Posts?id=' +
          post?.postId,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log('post deleted successfuly');
        window.location.reload();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  return (
    <Container component="main" sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: '#4F3328',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '24px',
            textAlign: 'center',
          }}
        >
          {post?.title}
        </Typography>
        <Grid
          container
          sx={{
            margin: '15px 0px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Grid
            item
            sx={{
              width: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0px 10px',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: '150px',
                width: 'auto',
                borderRadius: '10px',
              }}
              image={postImage}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (event.currentTarget.src = DefaultPostImage)
              }
            />
          </Grid>
          <Grid item sx={{ width: '55%' }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              {post?.description}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              width: '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                overflow: 'hidden',
              }}
              image={userImage}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (event.currentTarget.src = DefaultUser)
              }
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '20px',
                color: '#4F3328',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              {`${post?.user.name} ${post?.user.surname}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '80%',
          }}
        >
          {post?.tags.map((tag) => (
            <Grid item key={tag.tagId}>
              <Typography
                sx={{
                  backgroundColor: 'rgba(243, 189, 149, 0.36);',
                  padding: '3px 10px',
                  margin: '0px 10px',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 6px black',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '17px',
                  marginBottom: '15px',
                }}
              >
                {tag.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* send your post if authorize */}
        {displayButtons && (
          <>
            {isAuthorize ? (
              <>
                {/* if it`s another user post propose to send
          else propose to edit post*/}
                {currentUser?.userId !== post?.userId ? (
                  <>
                    {currentUser?.role !== post?.user.role && (
                      <LinkRouter
                        to="/send-post"
                        state={{ receiverPost: post }}
                        className="send-post-link"
                      >
                        Respond
                      </LinkRouter>
                    )}
                  </>
                ) : (
                  <>
                    <LinkRouter
                      to="/account/posts/edit"
                      state={{ postToEdit: post }}
                      className="send-post-link"
                    >
                      Edit post
                    </LinkRouter>
                    <Button
                      onClick={handleDeletePost}
                      sx={{
                        backgroundColor: '#FF7171',
                        color: '#FFFCFC',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '15px',
                        margin: '0px auto 10px',
                        width: '30%',
                        borderRadius: '10px',
                        padding: '10px',
                        textAlign: 'center',
                        '&:hover': {
                          backgroundColor: '#EF4B4B',
                        },
                      }}
                    >
                      Delete post
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {/* else proprose to register*/}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '10px 0px',
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: 'rgba(89, 143, 135, 0.9)',
                      color: '#FFFCFC',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '15px',
                      width: '30%',
                      marginBottom: '10px',
                      borderRadius: '10px',
                      '&:hover': {
                        backgroundColor: '#044945',
                      },
                    }}
                    onClick={navigateToLogin}
                  >
                    Sign In
                  </Button>

                  <LinkRouter to="/register" className="standard-link">
                    {"Don't have an account? Sign Up"}
                  </LinkRouter>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default PostDetails;
