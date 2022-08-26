import { createTheme, CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import TestPage from './pages/TestPage';
import AccountPostsPage from './pages/AccountPosts';

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
      main: '#000000',
      contrastText: '#00ADB5',
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/account/posts" element={<AccountPostsPage />} />
        </Routes>
        {/* <SiteBar /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
