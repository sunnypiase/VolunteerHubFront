import { Box, Container, Grid, Typography } from '@mui/material';
import { useCurrentUser } from '../../Hooks/currentUser';
import { UserInfoLeft } from '../Profile/UserInfoLeft';
import { UserInfoTable } from '../Profile/UserInfoTable';

function AccountProfile() {
  const { currentUser } = useCurrentUser();

  return (
    <Container
      component="main"
      sx={{
        width: '900px',
      }}
    >
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 0px 30px 0px',
        }}
      >
        <div className="loginHeader">
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '36px',
              color: '#FFFCFC',
              padding: '10px 0px',
            }}
          >
            Your Profile
          </Typography>
        </div>

        <Box
          sx={{
            backgroundColor: '#FFEDE0',
          }}
        >
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 4">
              <UserInfoLeft user={currentUser} />
            </Box>
            <Box gridColumn="span 8">
              <UserInfoTable currentUser={currentUser} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AccountProfile;
