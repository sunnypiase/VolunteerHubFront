import axios from 'axios';
import { useState, useEffect } from 'react';

//check if user has token
export function useIsAuthorize() {
  const [isAuthorize, setIsAuthorize] = useState(false);

  const checkIfAuthorize = async () => {
    setIsAuthorize(false);

    const response = await axios.get(
      'https://localhost:7266/api/Users/ifUserAuthorize',
      {
        withCredentials: true,
      }
    );
    setIsAuthorize(response.data);
  };

  useEffect(() => {
    checkIfAuthorize();
  }, []);

  return { isAuthorize };
}
