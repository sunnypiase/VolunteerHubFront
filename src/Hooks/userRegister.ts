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

  //for default image
  async function createFile() {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL!.trim()}` +
        '/api/Blob?name=DefaultUser.png'
    );
    let data = await response.blob();
    let metadata = {
      type: 'image/png',
    };
    let file = new File([data], 'test.png', metadata);
    return file;
  }
  //send file to register
  const handleRegisterUser = async (user: IUserRegister) => {
    try {
      setError('');
      const formData = new FormData();

      const files = imageInput.current?.files;
      if (files!.length > 0) {
        formData.append('profileImageFile', files![0]);
      } else {
        formData.append('profileImageFile', await createFile());
      }

      formData?.append('name', user.name);
      formData?.append('surname', user.surname);
      formData?.append('email', user.email);
      formData?.append('password', user.password);
      formData?.append('repeatPassword', user.repeatPassword);
      formData?.append('address', user.address);
      formData?.append('phoneNumber', user.phoneNumber);
      formData?.append('role', user.role);

      const response = await axios.post<FormData>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Users/register',
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log('success register');
        navigate('/login');
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
      setImageBlobUrl(URL.createObjectURL(files[0]));
    }
  };
  return {
    imageBlobUrl,
    imageInput,
    error,
    handleImageChange,
    handleRegisterUser,
  };
}
