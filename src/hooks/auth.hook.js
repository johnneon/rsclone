import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fullName, setUserName] = useState(null);

  const login = useCallback((jwtToken, id, name) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(name);

    localStorage.setItem(storageName, JSON.stringify(
      {
        token: jwtToken,
        userId: id,
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
    if (data?.token && data?.userId && data?.fullName) {
      login(data.token, data.userId, data.fullName);
    }
    setReady(true);
  }, [login, setReady]);

  return {
    login,
    logout,
    token,
    fullName,
    userId,
    ready,
  };
};

export default useAuth;
