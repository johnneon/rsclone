import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AuthContext from './context/AuthContext';
import useRouts from './routes';
import CustomThemeProvider from './theme/CustomThemeProvider';
import useAuth from './hooks/auth.hook';
import Header from './components/Header/Header';

function App() {
  const {
    token,
    login,
    logout,
    userId,
    ready,
    fullName,
  } = useAuth();

  const isAuthenticated = !!token;

  const routes = useRouts(isAuthenticated);

  if (!ready) {
    return (
      <Backdrop variant="outlined" open={ready}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <CustomThemeProvider>
      <AuthContext.Provider
        value={{
          token, login, logout, userId, fullName, isAuthenticated,
        }}
      >
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Router>
            <div className="container">
              <Header onReady={ready} />
              {routes}
            </div>
          </Router>
        </SnackbarProvider>
      </AuthContext.Provider>
    </CustomThemeProvider>
  );
}

export default App;
