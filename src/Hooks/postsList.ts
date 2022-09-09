import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IPost } from '../models';

//gets post from server
export function usePostsList() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingPostsCount, setLoadingPostsCount] = useState(3);
  const [postsRole, setPostsRole] = useState(0);

  const handleShowPostsChange = () => {
    postsRole === 0 ? setPostsRole(1) : setPostsRole(0);
  };

  async function getPosts() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IPost[]>(
        `${process.env.REACT_APP_API_URL!.trim()}/api/Posts`,
        {
          withCredentials: true,
        }
      );

      setPosts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  function updatePosts(inputPosts: IPost[]) {
    setPosts(inputPosts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return {
    posts,
    error,
    loading,
    setPosts,
    updatePosts,
    getPosts,
    setLoadingPostsCount,
    handleShowPostsChange,
    loadingPostsCount,
    postsRole,
  };
}
