import { Link } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 7, mb: 4 }}
    >
      {'Copyright © Volunteer-Hub '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
