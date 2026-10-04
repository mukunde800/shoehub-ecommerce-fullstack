import { useEffect, useState } from 'react';
import api from '../api/axios';

export const useFetch = (url, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(url)
      .then(({ data }) => setData(data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, deps);

  return { data, loading, error };
};