import { Container, Grid, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import { useCurrentUser } from '../Hooks/currentUser';
import { IUser } from '../models';
import { UserInfoLeft } from './Profile/UserInfoLeft';
import { UserInfoRight } from './Profile/UserInfoRight';
import { UserInfoTable } from './Profile/UserInfoTable';
import { UserPosts } from './Profile/UserPosts';

function AccountProfile() {
  const { currentUser } = useCurrentUser();
  return (
    <Container
      sx={{
        backgroundColor: '#ffeddf',
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
            width: 'max',
          }}
        >
          Your profile
        </Typography>
      </div>
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
  );
}

export default AccountProfile;
