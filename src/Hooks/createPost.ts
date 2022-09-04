import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultPostImage from '../images/DefaultPostImage.png';
import { ICreatePost } from '../models';
import { useCurrentUser } from './currentUser';
import { useTags } from './tags';

interface SubmitProps {
  title: string;
  description: string;
}

export function useCreatePosts() {
  const { tags, tagsList, handleTagsChange } = useTags();
  const [error, setError] = useState('');
  const { currentUser } = useCurrentUser();
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultPostImage);
  const [fileToSend, setFileToSend] = useState<FormData>();

  const navigate = useNavigate();

  const navigateToAccountPosts = () => {
    navigate('/account/posts');
  };
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
      fileToSend?.append('userId', data.userId.toString());
      fileToSend?.append('title', data.title);
      fileToSend?.append('description', data.description);
      for (let i = 0; i < data.tagIds.length; i++) {
        fileToSend?.append(`tagIds[${i}]`, data.tagIds[i].toString());
      }

      const response = await axios.post<FormData>(
        'https://localhost:7266/api/Post',
        fileToSend,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('create post success');
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
      const formData = new FormData();
      formData.append('imageFile', files[0]);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
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
