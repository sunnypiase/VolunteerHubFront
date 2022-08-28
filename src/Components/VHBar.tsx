import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthorize } from '../Hooks/isAuthorize';
import SearchIcon from '@mui/icons-material/Search';

import logoVH from '../images/logoVH.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function VHBar() {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  //for pop up menu under the profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

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

  const navigateToSignUp = () => {
    navigate('/register');
  };
  //to do
  const handleAccountInfo = () => {};

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
      <MenuItem onClick={navigateToAccountPosts}>My posts</MenuItem>
      <MenuItem onClick={navigateToAccountProfile}>My profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My messages</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar variant={'rounded'} src={logoVH} alt="VH-logo" />
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
          {/* search element */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

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
              {/* account button */}
              <IconButton
                size="large"
                edge="end"
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
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default VHBar;
