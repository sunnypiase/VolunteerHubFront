import { cleanup } from '@testing-library/react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IPostConnection } from '../models';

export function useCurrentPostConnections() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserConnections, setCurrentUserConnections] = useState<
    IPostConnection[]
  >([]);

  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const getUserConnections = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IPostConnection[]>(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/PostConnection/currentUser',
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setCurrentUserConnections(response.data);

      //for count
      let newCount = 0;
      response.data.map((userCon) =>
        userCon.userHasSeen === false ? newCount++ : newCount
      );
      setNewMessagesCount(newCount);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  const handleDeletePostConnection = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/PostConnection?id=' + id,
        {
          withCredentials: true,
        }
      );
      const newPostConnections = currentUserConnections.filter(
        (pc) => pc.postConnectionId !== id
      );
      setCurrentUserConnections(newPostConnections);

      if (response.status === 200) {
        console.log('post connection deleted successfuly');
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  const renewHasSeenStatus = async (postConnectionId: number) => {
    try {
      setError('');
      //marking them read
      console.log(postConnectionId);

      const response2 = await axios.put(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/PostConnection/revision',
        { postConnectionId },
        {
          withCredentials: true,
        }
      );
      console.log(response2);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserConnections();
  }, []);

  return {
    error,
    loading,
    currentUserConnections,
    newMessagesCount,
    renewHasSeenStatus,
    handleDeletePostConnection,
  };
}
