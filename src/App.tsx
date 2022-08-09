import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div className="App">
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<link href="__"></link>}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<link href="__"></link>}>
          Send
        </Button>
      </Stack>
    </div>
  );
}

export default App;
