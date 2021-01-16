import { useCallback, useState } from 'react';

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async ({
    url,
    method = 'GET',
    body = null,
    headers = {},
  }) => {
    setLoading(true);
    try {
      const stringifyedBody = JSON.stringify(body);
      const newHeader = headers;
      newHeader['Content-Type'] = 'application/json';

      const response = await fetch(url, { method, body: stringifyedBody, headers: newHeader });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get data.');
      }

      setLoading(false);

      console.log(data);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearErorr = useCallback(() => setError(null), []);

  return {
    loading,
    request,
    error,
    clearErorr,
  };
};

export default useHttp;
