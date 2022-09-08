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
import { Link as LinkRouter } from 'react-router-dom';
import { useSiteBar } from '../Hooks/siteBar';

function VHBar() {
  const {
    anchorEl,
    isMenuOpen,
    location,
    isAuthorize,
    newMessagesCount,
    setAnchorEl,
    navigate,
    handleLogOut,
  } = useSiteBar();

  //menu, that will pop up if account icon clicked
  const menuId = 'account-more-info';
  const renderMenu = (
    <Menu
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
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem key={1} onClick={() => navigate('/account/posts')}>
        My posts
      </MenuItem>
      <MenuItem key={2} onClick={() => navigate('/account/profile')}>
        My profile
      </MenuItem>
      <MenuItem key={3} onClick={() => navigate('/account/messages')}>
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
            <LinkRouter to="/">
              <div className="logo"></div>
            </LinkRouter>

            <LinkRouter to="/" className="header-link">
              {'Volunteer-Hub'}
            </LinkRouter>
          </Box>
          <LinkRouter to="#" className="header-link">
            {'About us'}
          </LinkRouter>
          <LinkRouter to="#" className="header-link">
            {'How it works'}
          </LinkRouter>
          <LinkRouter to="#" className="header-link">
            {'Contacts'}
          </LinkRouter>
          {isAuthorize && (
            <Box>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                onClick={() => navigate('/account/messages')}
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
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  setAnchorEl(e.currentTarget)
                }
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
                  onClick={() => navigate('/login')}
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
                  onClick={() => navigate('/register')}
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
