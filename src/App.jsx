import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import AuthContext from './context/AuthContext';
import useRouts from './routes';
import CustomThemeProvider from './theme/CustomThemeProvider';
import useAuth from './hooks/auth.hook';

function App() {
  const {
    token,
    login,
    logout,
    userId,
    ready,
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
          token, login, logout, userId, isAuthenticated,
        }}
      >
        <Router>
          <div className="container">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    </CustomThemeProvider>
  );
}

export default App;
