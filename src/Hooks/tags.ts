import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { ITag } from '../models';

export function useTags() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getTags() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<ITag[]>(
        'https://localhost:7266/api/Tags',
        {
          withCredentials: true,
        }
      );
      console.log('tags');
      console.log(response.data);
      setTags(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    getTags();
  }, []);

  return { tags, error, loading };
}
