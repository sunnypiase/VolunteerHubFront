import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from '../models';
import { useIsAuthorize } from './isAuthorize';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const { isAuthorize } = useIsAuthorize();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL!.trim()}`+'/api/Users/by-token',
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

  useEffect(() => {
    getCurrentUser();
  }, [isAuthorize]);

  return { currentUser };
}
