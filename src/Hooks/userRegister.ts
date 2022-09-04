import axios, { AxiosError } from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserRegister } from '../models';
import DefaultUser from '../images/DefaultUser.png';

export function useUserRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //for image work
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultUser);
  const [fileToSend, setFileToSend] = useState<FormData>();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const registerUser = async (user: IUserRegister) => {
    try {
      setError('');

      fileToSend?.append('name', user.name);
      fileToSend?.append('surname', user.surname);
      fileToSend?.append('email', user.email);
      fileToSend?.append('password', user.password);
      fileToSend?.append('repeatPassword', user.repeatPassword);
      fileToSend?.append('address', user.address);
      fileToSend?.append('phoneNumber', user.phoneNumber);
      fileToSend?.append('role', user.role);

      const response = await axios.post<FormData>(
        'https://localhost:7266/api/Users/register',
        fileToSend,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigateToLogin();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;
    if (files) {
      const formData = new FormData();
      formData.append('profileImageFile', files[0]);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
    }
  };
  return { imageBlobUrl, imageInput, handleImageChange, error, registerUser };
}
