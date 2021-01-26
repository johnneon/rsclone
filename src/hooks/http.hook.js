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

      const totalData = { method, headers: newHeader };

      if (body) {
        totalData.body = stringifyedBody;
      }

      const response = await fetch(url, totalData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get data.');
      }

      setLoading(false);

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
