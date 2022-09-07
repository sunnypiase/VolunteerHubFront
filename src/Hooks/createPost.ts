import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultPostImage from '../images/DefaultPostImage.png';
import { ICreatePost } from '../models';
import { useCurrentUser } from './currentUser';
import { useTagsList } from './tagsList';

interface SubmitProps {
  title: string;
  description: string;
}

export function useCreatePosts() {
  const { tags, tagsList, handleTagsChange } = useTagsList();
  const [error, setError] = useState('');
  const { currentUser } = useCurrentUser();
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultPostImage);

  const navigate = useNavigate();

  const navigateToAccountPosts = () => {
    navigate('/account/posts');
  };
  async function createFile() {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL!.trim()}` +
        '/api/Blob?name=DefaultPostImage.png'
    );
    let data = await response.blob();
    let metadata = {
      type: 'image/png',
    };
    let file = new File([data], 'test.png', metadata);
    return file;
  }

  //send data to server
  const handleCreatePost = async ({ title, description }: SubmitProps) => {
    try {
      setError('');

      const data: ICreatePost = {
        title: title,
        description: description,
        userId: currentUser?.userId!,
        tagIds: tagsList,
      };
      const formData = new FormData();
      const files = imageInput.current?.files;

      if (files!.length > 0) {
        formData.append('imageFile', files![0]);
      } else {
        formData.append('imageFile', await createFile());
      }

      formData?.append('userId', data.userId.toString());
      formData?.append('title', data.title);
      formData?.append('description', data.description);
      for (let i = 0; i < data.tagIds.length; i++) {
        formData?.append(`tagIds[${i}]`, data.tagIds[i].toString());
      }

      const response = await axios.post<FormData>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Posts',
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('create post successfuly');
        navigateToAccountPosts();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  //change image input
  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;
    if (files) {
      setImageBlobUrl(URL.createObjectURL(files[0]));
    }
  };

  return {
    handleImageChange,
    tags,
    tagsList,
    error,
    imageBlobUrl,
    imageInput,
    handleCreatePost,
    handleTagsChange,
  };
}
