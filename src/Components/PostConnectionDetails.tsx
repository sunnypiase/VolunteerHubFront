import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import DefaultUser from '../images/DefaultUser.png';
import { IPostConnection } from '../models';

interface ConnectionDetailsProps {
  connection: IPostConnection | undefined;
}

function PostConnectionDetails({ connection }: ConnectionDetailsProps) {
  const userImage = `https://localhost:7266/api/Blob?name=${connection?.volunteerPost.user.profileImage.imageId}.${connection?.volunteerPost.user.profileImage.format}`;

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
          {connection?.title}
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
          ></Grid>
          <Grid item sx={{ width: '55%' }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              {connection?.message}
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
              {`${connection?.volunteerPost.user.name} ${connection?.volunteerPost.user.surname}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PostConnectionDetails;
