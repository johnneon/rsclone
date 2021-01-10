import React, { } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import useRouts from './routes';
import useAuth from './hooks/auth.hook';

function App() {
  const {
    token,
    login,
    logout,
    userId,
    ready,
  } = useAuth();
  /*
    Тут пока нету бэка если делаем страницу авторизации
    оставляем значение false, если занимаеся другими, ставим true
  */
  const isAuthenticated = !!token;

  const routes = useRouts(isAuthenticated);

  if (!ready) {
    console.log('loading');
  }

  return (
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
  );
}

export default App;
