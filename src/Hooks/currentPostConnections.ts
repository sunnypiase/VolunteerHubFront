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
        'https://localhost:7266/api/PostConnection/currentUser',
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

  const renewHasSeenStatus = async () => {
    try {
      setError('');
      //marking them read
      let postConnectionIds: number[] = [];
      currentUserConnections.map((con) =>
        postConnectionIds.push(con.postConnectionId)
      );
      console.log(postConnectionIds);

      const response2 = await axios.put(
        'https://localhost:7266/api/PostConnection/revision',
        { postConnectionIds },
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

  //mount
  useEffect(() => {
    getUserConnections();
  }, []);
  //unmount
  useEffect(() => {
    return () => {
      renewHasSeenStatus();
    };
  }, []);

  return {
    error,
    loading,
    currentUserConnections,
    newMessagesCount,
  };
}
