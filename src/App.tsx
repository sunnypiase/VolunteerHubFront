import { createTheme, CssBaseline } from '@mui/material';
import { green } from '@mui/material/colors';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { createElement } from 'react';
//our components
import RequestList from './Components/RequestListComponent/RequestList';
import SignIn from './Components/SignInComponent/SignIn';
import SignUp from './Components/SignUpComponent/SignUp';
import SiteBar from './Components/SiteBar/SiteBar';
import VHBar from './Components/SiteBar/VHBar';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <VHBar />
        <SignIn></SignIn>
        <br></br>
        <br></br>
        <SignUp></SignUp>
        <RequestList></RequestList>
        <br></br>
        <SiteBar />
      </div>
    </ThemeProvider>
  );
}

export default App;
