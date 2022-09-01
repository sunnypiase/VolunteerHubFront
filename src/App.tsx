import { createTheme, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import AccountPostsPage from "./pages/AccountPostsPage";
import AccountProfilePage from "./pages/AccountProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditProfilePage from "./pages/EditProfilePage";

//Need this for proper work with TypeScript
declare module "@mui/material/styles" {
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
      main: "#00ADB5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
      contrastText: "#00ADB5",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "300",
          fontSize: "18px",
        },
      },
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
          <Route path="/account/profile" element={<AccountProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
        {/* <SiteBar /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
