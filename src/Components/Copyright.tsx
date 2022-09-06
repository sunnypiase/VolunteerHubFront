import { Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        color: 'white',
      }}
    >
      {'Copyright © Volunteer-Hub '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
