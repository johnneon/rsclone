import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userId: id }));
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    console.log(data);
    if (data?.token && data?.userId) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login, setReady]);

  return {
    login,
    logout,
    token,
    userId,
    ready,
  };
};

export default useAuth;
