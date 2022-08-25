import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';

function SiteLogout() {
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const data = new FormData(event.currentTarget);

    console.log('Before logout');

    //for cros
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      'https://localhost:7266/api/Users/logout'
    );
    console.log('After logout');
    console.log(response);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Log out
        </Button>
        {error && <ErrorMessage error={error} />}
      </Box>
    </Box>
  );
}

export default SiteLogout;
