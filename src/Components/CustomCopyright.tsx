import { Box, Typography } from '@mui/material';

function CustomCopyright() {
  return (
    <Box
      sx={{
        backgroundColor: '#4F3328',
        padding: '15px 0px',
      }}
      component="footer"
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          color: 'white',
        }}
      >
        {'CustomCopyright © Volunteer-Hub '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default CustomCopyright;
