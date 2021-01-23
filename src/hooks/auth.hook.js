import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, jwtRefreshToken, id) => {
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      refreshToken: jwtRefreshToken,
      userId: id,
    }));
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data?.token && data?.userId && data?.refreshToken) {
      login(data.token, data.userId, data.refreshToken);
    }

    setReady(true);
  }, [login, setReady]);

  return {
    login,
    logout,
    token,
    refreshToken,
    userId,
    ready,
  };
};

export default useAuth;
