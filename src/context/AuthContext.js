import { createContext } from 'react';

function noop() {}

const AuthContext = createContext({
  token: null,
  userId: null,
  fullName: null,
  email: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export default AuthContext;
