import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import AuthPage from './pages/AuthPage';

const useRouts = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>

        <Route path="/links" exact>
          <HomePage />
        </Route>

        <Route path="/create" exact>
          <BoardPage />
        </Route>

        <Redirect to="/create" />

      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRouts;
