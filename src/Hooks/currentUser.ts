import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../models';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [currentUserId, setCurrentUserId] = useState(0);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7266/api/Users/by-token',
        {
          withCredentials: true,
        }
      );
      setCurrentUser(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  const updateUserId = () => {
    if (currentUser) setCurrentUserId(currentUser?.userId);
    console.log('update use tag');
  };

  useEffect(() => {
    getCurrentUser();
    updateUserId();
  }, []);

  return { currentUser, getCurrentUser, updateUserId, currentUserId };
}
