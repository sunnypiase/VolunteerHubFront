import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../models';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser>();

  const getCurrentUser = async () => {
    console.log('get user start');
    try {
      console.log('get user start');
      const response = await axios.get(
        'https://localhost:7266/api/Users/by-token',
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setCurrentUser(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { currentUser, getCurrentUser };
}
