import React, { } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
  } = useAuth();

  const isAuthenticated = !!token;

  const routes = useRouts(isAuthenticated);

  if (!ready) {
    console.log('loading');
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
            <Header prop={isAuthenticated} />
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    </CustomThemeProvider>
  );
}

export default App;
