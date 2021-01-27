import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

const isExpired = (jwtToken) => {
  if (!jwtToken) {
    return null;
  }

  const exp = JSON.parse(atob(jwtToken.split('.')[1]));

  if (!exp) {
    return null;
  }

  const deadline = exp.exp * 1000;

  return Date.now() > deadline;
};

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fullName, setUserName] = useState(null);

  const login = useCallback((jwtToken, jwtRefreshToken, id, name) => {
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);
    setUserId(id);
    setUserName(name);

    localStorage.setItem(storageName, JSON.stringify(
      {
        token: jwtToken,
        refreshToken: jwtRefreshToken,
        userId: id,
        fullName: name,
      },
    ));
  }, []);

  const logout = useCallback(async () => {
    const data = JSON.parse(localStorage.getItem(storageName) || null);

    const url = 'https://rsclone-back-end.herokuapp.com/api/auth/logout';

    const headers = {};
    headers['Content-Type'] = 'application/json';

    const body = JSON.stringify({ userId: data.userId });

    await fetch(url, { method: 'DELETE', headers, body });

    setToken(null);
    setUserId(null);
    setRefreshToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  const getToken = useCallback(async () => {
    const data = JSON.parse(localStorage.getItem(storageName) || null);
    if (data) {
      try {
        if (isExpired(token)) {
          const url = 'https://rsclone-back-end.herokuapp.com/api/auth/refresh_token';

          const headers = {};
          headers['Content-Type'] = 'application/json';

          const body = JSON.stringify({ refreshToken });

          const updatedToken = await fetch(url, { method: 'POST', headers, body })
            .then((newToken) => newToken.json());

          setToken(updatedToken.token);

          if (updatedToken.token && data?.userId && data?.fullName && data?.refreshToken) {
            login(updatedToken.token, data.refreshToken, data.userId, data.fullName);
          }
        }
      } catch (e) {
        if (e.message === 'Session timed out,please login again!') {
          await logout();
          window.location.reload();
        }
      }
    }
  }, [login, logout, token, refreshToken]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data?.token && data?.userId && data?.fullName && data?.refreshToken) {
      login(data.token, data.refreshToken, data.userId, data.fullName);
    }

    setReady(true);
  }, [login, logout, getToken, setReady]);

  return {
    login,
    logout,
    token,
    getToken,
    fullName,
    userId,
    ready,
  };
};

export default useAuth;
