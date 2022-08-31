import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { ITag } from '../models';

//gets tags from server
export function useTags() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [tagsList, setTagsList] = useState<number[]>([]);

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = tagsList.indexOf(+event.target.value);
    //add skill if dont exist
    if (index === -1) {
      setTagsList((prev) => [...prev, +event.target.value]);
      //else remove skill
    } else {
      setTagsList(tagsList.filter((tag) => tag !== +event.target.value));
    }
  };

  const handleCleanTags = () => {
    setTagsList([]);
  };

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

  return {
    tags,
    error,
    loading,
    tagsList,
    handleTagsChange,
    handleCleanTags,
    setError,
  };
}
