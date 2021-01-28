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
    const data = JSON.parse(localStorage.getItem(storageName));

    const url = 'https://rsclone-back-end.herokuapp.com/api/auth/logout';

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: data.userId }),
    };

    await fetch(url, options);

    setToken(null);
    setUserId(null);
    setRefreshToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  const getToken = useCallback(async () => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (!data) {
      return;
    }

    try {
      if (isExpired(token)) {
        const url = 'https://rsclone-back-end.herokuapp.com/api/auth/refresh_token';

        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        };

        const updatedToken = await fetch(url, options)
          .then((newToken) => newToken.json())
          .catch((e) => { throw new Error(e); });

        setToken(updatedToken.token);

        login(updatedToken.token, data.refreshToken, data.userId, data.fullName);
      }
    } catch (e) {
      await logout();
      window.location.reload();
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
