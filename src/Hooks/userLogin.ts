import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserLogIn } from '../models';

export function useUserLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleUserLogin = async ({ login, password }: IUserLogIn) => {
    try {
      setError('');
      const response = await axios.post<IUserLogIn>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Users/login',
        { login, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('success login');
        navigate('/');
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  return { error, handleUserLogin };
}
