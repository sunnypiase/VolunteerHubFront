import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthorize } from '../Hooks/isAuthorize';

function VHBar() {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleLogOut = async () => {
    console.log('Before logout');

    //for cros
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      'https://localhost:7266/api/Users/logout'
    );

    console.log(response);
    if (response.status === 200) {
      navigateToLogin();
    }
  };

  const navigateToSignUp = () => {
    navigate('/register');
  };
  //to do
  const handleAccountInfo = () => {};

  return (
    <AppBar position="relative">
      <Toolbar>
        <AccessibilityNewIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Volunteer-Hub
        </Typography>
        <Link href="#" sx={{ ml: 4 }} variant="h6" color="inherit" noWrap>
          {'About us'}
        </Link>

        <Link href="#" sx={{ ml: 2 }} variant="h6" color="inherit" noWrap>
          {'How it works'}
        </Link>
        <Link href="#" sx={{ ml: 2 }} variant="h6" color="inherit" noWrap>
          {'Contacts'}
        </Link>

        <Box sx={{ flexGrow: 1 }} />
        {isAuthorize && (
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleAccountInfo}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleLogOut}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
        {!isAuthorize && (
          <Box sx={{ display: { md: 'flex' } }}>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToLogin}
            >
              Log in
            </Button>
            <Button
              variant="text"
              color="secondary"
              sx={{ ml: 3 }}
              onClick={navigateToSignUp}
            >
              Sign up
            </Button>
          </Box>
        )}

        {/* тут для мобільної версії вигляд */}
        {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleLogOut}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default VHBar;
