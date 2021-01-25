import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

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
    console.log(name);

    localStorage.setItem(storageName, JSON.stringify(
      {
        token: jwtToken,
        userId: id,
        refreshToken: jwtRefreshToken,
        fullName: name,
      },
    ));
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data?.token && data?.userId && data?.fullName && data?.refreshToken) {
      login(data.token, data.userId, data.fullName, data.refreshToken);
    }

    setReady(true);
  }, [login, setReady]);

  return {
    login,
    logout,
    token,
    refreshToken,
    fullName,
    userId,
    ready,
  };
};

export default useAuth;
