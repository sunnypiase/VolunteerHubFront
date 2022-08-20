import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdbIcon from '@mui/icons-material/Adb';

function VHBar() {
  const handleLogOut = () => {};

  return (
    <AppBar position="relative">
      <Toolbar>
        <AccessibilityNewIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Requests List
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
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
            onClick={handleLogOut}
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
