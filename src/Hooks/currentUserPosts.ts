import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IPost } from '../models';

export function useCurrentUserPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUserPosts, setCurrentUserPosts] = useState<IPost[]>([]);

  const getUserPosts = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IPost[]>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Posts/current-user',
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setCurrentUserPosts(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return { error, loading, currentUserPosts };
}
