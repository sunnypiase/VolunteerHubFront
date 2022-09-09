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
        `${process.env.REACT_APP_API_URL!.trim()}` +
          '/api/PostConnections/current-user',
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setCurrentUserConnections(response.data);

      //for count-----------
      let newCount = 0;
      response.data.map((userCon) =>
        userCon.userHasSeen === false ? newCount++ : newCount
      );
      setNewMessagesCount(newCount);
      //for error
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  const handleDeletePostConnection = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL!.trim()}` +
          '/api/PostConnections?id=' +
          id,
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

  const markAllAsRead = () => {
    let connectionIds = currentUserConnections
      .map((connection) => {
        if (connection.userHasSeen === false) {
          return connection.postConnectionId;
        }
        return undefined;
      })
      .filter((id) => id !== undefined);
    renewHasSeenStatus(connectionIds as number[]);
  };

  const renewHasSeenStatus = async (postConnectionIds: number[]) => {
    try {
      setError('');
      //marking them read
      console.log(postConnectionIds);
      const response2 = await axios.put(
        `${process.env.REACT_APP_API_URL!.trim()}` +
          '/api/PostConnections/revision',
        { postConnectionIds },
        {
          withCredentials: true,
        }
      );
      console.log(response2);
      getUserConnections();
      console.log(newMessagesCount);
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
    setCurrentUserConnections,
    markAllAsRead,
  };
}
