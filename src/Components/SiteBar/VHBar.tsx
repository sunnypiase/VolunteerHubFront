import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function VHBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <AccessibilityNewIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Requests List
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default VHBar;
