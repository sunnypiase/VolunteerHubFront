import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div className="App">
      <br></br>

      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success test commit
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>

      <br></br>
      <br></br>

      <Button variant="outlined" startIcon={<link href="__"></link>}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<link href="__"></link>}>
        Send
      </Button>
    </div>
  );
}

export default App;
