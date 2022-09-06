import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useSiteBar } from '../Hooks/siteBar';
import { Menu, MenuItem } from '@mui/material';

function VHBar() {
  const {
    anchorEl,
    isMenuOpen,
    location,
    isAuthorize,
    newMessagesCount,
    handleMenuClose,
    navigateToAccountPosts,
    navigateToAccountMessages,
    navigateToAccountProfile,
    handleProfileMenuOpen,
    handleLogOut,
    navigateToSignUp,
    navigateToLogin,
  } = useSiteBar();

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
                aria-label="show new notifications"
                color="inherit"
                onClick={navigateToAccountMessages}
              >
                <Badge badgeContent={newMessagesCount} color="error">
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
