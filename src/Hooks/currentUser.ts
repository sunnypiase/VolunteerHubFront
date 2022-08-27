import axios from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../models';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();

  const getCurrentUser = async () => {
    setCurrentUser(undefined);

    const response = await axios.get(
      'https://localhost:7266/api/Users/by-token',
      {
        withCredentials: true,
      }
    );
    setCurrentUser(response.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { currentUser };
}
