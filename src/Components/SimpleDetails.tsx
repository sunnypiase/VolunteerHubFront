import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import { IPost } from '../models';

interface PostDetailsProps {
  post: IPost | undefined;
}

function SimpleDetails({ post }: PostDetailsProps) {
  const postImage = `https://localhost:7266/api/Blob?name=${post?.postImage.imageId}.${post?.postImage.format}`;

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
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Typography variant="h5" color="text.secondary" paragraph>
              {post?.description}
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
              {/* {`${post?.user.name} ${post?.user.surname}`} */}
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
      </Box>
    </Container>
  );
}

export default SimpleDetails;
