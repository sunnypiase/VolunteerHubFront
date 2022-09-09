import axios from 'axios';
import { useState, useEffect } from 'react';

//check if user has token
export function useIsAuthorize() {
  const [isAuthorize, setIsAuthorize] = useState(false);

  const checkIfAuthorize = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Users/if-authorize',
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
