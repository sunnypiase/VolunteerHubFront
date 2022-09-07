import { Container, Typography } from '@mui/material';
import { useCurrentUser } from '../Hooks/currentUser';
import { UserInfoLeft } from './Profile/UserInfoLeft';
import { UserInfoRight } from './Profile/UserInfoRight';
import { UserInfoTable } from './Profile/UserInfoTable';

function AccountProfile() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <div className="loginHeader">
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '36px',
            color: '#FFFCFC',
            padding: '10px 0px',
            width: 'max',
          }}
        >
          Your profile
        </Typography>
      </div>
      <Container>
        <Container
          sx={{
            py: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          maxWidth="md"
        >
          <UserInfoLeft user={currentUser} />
          <UserInfoTable user={currentUser} />
          <UserInfoRight />
        </Container>
      </Container>
    </>
  );
}

export default AccountProfile;
