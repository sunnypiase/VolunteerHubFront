import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IPostConnection } from '../models';

export function useCurrentPostConnections() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserConnections, setCurrentUserConnections] = useState<
    IPostConnection[]
  >([]);

  const getUserConnections = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IPostConnection[]>(
        'https://localhost:7266/api/PostConnection/currentUser',
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setCurrentUserConnections(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserConnections();
  }, []);

  return { error, loading, currentUserConnections };
}
