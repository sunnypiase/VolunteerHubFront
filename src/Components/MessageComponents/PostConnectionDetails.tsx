import { Box, Container, Grid, Typography } from '@mui/material';
import { IPostConnection, IUser } from '../../models';
import PostDetails from '../PostsComponents/PostDetails';

interface ConnectionDetailsProps {
  connection: IPostConnection | undefined;
  currentUser: IUser | undefined;
}

interface UserInfo {
  fullName: String;
  email: String;
  phoneNumber: String;
}

// TODO: It is used only in the AccountMessagesPage. Is there any special need to extract this component to common components folder?
function PostConnectionDetails({
  connection,
  currentUser,
}: ConnectionDetailsProps) {
  const otherParty: UserInfo = {
    fullName:
      currentUser?.role === 0
        ? `${connection?.needfulPost.user.name} ${connection?.needfulPost.user.surname}`
        : `${connection?.volunteerPost.user.name} ${connection?.volunteerPost.user.surname}`,
    email:
      currentUser?.role === 0
        ? `${connection?.needfulPost.user.email}`
        : `${connection?.volunteerPost.user.email}`,
    phoneNumber:
      currentUser?.role === 0
        ? `${connection?.needfulPost.user.phoneNumber}`
        : `${connection?.volunteerPost.user.phoneNumber}`,
  };

  return (
    <Container component="main" sx={{ marginTop: 3, padding: '0px!important' }}>
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
            padding: '15px 10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Grid item sx={{ width: '60%' }}>
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
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{ mb: 1, paddingLeft: '7px', color: '#4F3328' }}
                variant="h6"
                paragraph
              >
                Other party contacts:
              </Typography>
              <Typography
                sx={{ mb: 1, paddingLeft: '7px' }}
                variant="subtitle1"
                paragraph
              >
                Full Name:
              </Typography>
              <Box
                sx={{
                  alignContent: 'center',
                  borderRadius: '16px',
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                  className="input-field"
                  sx={{
                    padding: '2px 2px 2px 7px',
                    marginTop: '0px!important',
                  }}
                >
                  {otherParty.fullName}
                </Typography>
              </Box>

              <Typography
                sx={{ mb: 1, paddingLeft: '7px' }}
                variant="subtitle1"
                paragraph
              >
                Phone number:
              </Typography>
              <Box
                sx={{
                  alignContent: 'center',
                  borderRadius: '16px',
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                  className="input-field"
                  sx={{
                    padding: '2px 2px 2px 7px',
                    marginTop: '0px!important',
                  }}
                >
                  {otherParty.phoneNumber}
                </Typography>
              </Box>

              <Typography
                sx={{ mb: 1, paddingLeft: '7px' }}
                variant="subtitle1"
                paragraph
              >
                Email:
              </Typography>
              <Box
                sx={{
                  alignContent: 'center',
                  borderRadius: '16px',
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                  className="input-field"
                  sx={{
                    padding: '2px 2px 2px 7px',
                    marginTop: '0px!important',
                  }}
                >
                  {otherParty.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <div
            style={{
              border: '1px solid #598F87',
              marginBottom: '20px',
              width: '100%',
            }}
          >
            <h1 className="modal-title">Volunteer post</h1>
            <PostDetails
              post={connection?.volunteerPost}
              displayButtons={false}
            />
          </div>
          <div style={{ border: '1px solid #598F87', width: '100%' }}>
            <h1 className="modal-title">Needful post</h1>
            <PostDetails
              post={connection?.needfulPost}
              displayButtons={false}
            />
          </div>
        </Grid>
      </Box>
    </Container>
  );
}

export default PostConnectionDetails;
