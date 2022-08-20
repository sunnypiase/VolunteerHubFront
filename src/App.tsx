import { createTheme, CssBaseline } from '@mui/material';
import { green } from '@mui/material/colors';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';

import SiteBar from './Components/SiteBar';

import VHBar from './Components/VHBar';

//Need this for proper work with TypeScript
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ADB5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
        {/* <SiteBar /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
