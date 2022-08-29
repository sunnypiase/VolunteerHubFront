import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../models';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser>();

  function fetchUser<T>(resourceUrl: string): Promise<T> {
    return fetch(resourceUrl, {
      credentials: 'include',
    }).then((response) => {
      return response.json().then((data) => data as T);
    });
  }

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
