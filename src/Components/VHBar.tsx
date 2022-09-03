import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAuthorize } from '../Hooks/isAuthorize';

function VHBar() {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  //for pop up menu under the profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const location = useLocation();

  //element needs anchor
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //set ahchor to null, no element needs menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigateToAccountPosts = () => {
    navigate('/account/posts');
  };
  const navigateToAccountProfile = () => {
    navigate('/account/profile');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToSignUp = () => {
    navigate('/register');
  };
  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToAccountMessages = () => {
    navigate('/account/messages');
  };

  const handleLogOut = async () => {
    //for cros
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      'https://localhost:7266/api/Users/logout'
    );
    if (response.status === 200) {
      navigateToLogin();
    }
  };

  //menu, that will pop up if account icon clicked
  const menuId = 'account-more-info';
  const renderMenu = (
    <Menu
      //to what element to attach
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem key={1} onClick={navigateToAccountPosts}>
        My posts
      </MenuItem>
      <MenuItem key={2} onClick={navigateToAccountProfile}>
        My profile
      </MenuItem>
      <MenuItem key={3} onClick={navigateToAccountMessages}>
        My messages
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            width: '100%',
            backgroundColor: '#F5EADB',
            color: 'black',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '200px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <div className="logo"></div>
            </Link>

            <Link href="/" variant="h6" color="inherit">
              {'Volunteer-Hub'}
            </Link>
          </Box>
          <Link href="#" variant="h6" color="inherit">
            {'About us'}
          </Link>
          <Link href="#" variant="h6" color="inherit">
            {'How it works'}
          </Link>
          <Link href="#" variant="h6" color="inherit">
            {'Contacts'}
          </Link>
          {isAuthorize && (
            <Box>
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
                aria-label="account of current user"
                aria-haspopup="true"
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <IconButton
                size="large"
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
            <Box
              sx={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {location.pathname !== '/login' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={navigateToLogin}
                  sx={{
                    backgroundColor: '#B37E6B',
                    borderRadius: '15px',
                    '&:hover': {
                      backgroundColor: '#9c5e48',
                    },
                  }}
                >
                  Log in
                </Button>
              )}
              {location.pathname !== '/register' && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#116660',
                    borderRadius: '15px',
                    '&:hover': {
                      backgroundColor: '#044945',
                    },
                  }}
                  onClick={navigateToSignUp}
                >
                  Sign up
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default VHBar;
