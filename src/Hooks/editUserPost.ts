import axios, { AxiosError } from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTagsList } from './tagsList';
import DefaultPostImage from '../images/DefaultPostImage.png';
import { IPost } from '../models';

interface UpdateProps {
  title: string;
  description: string;
}

interface LocationState {
  postToEdit: IPost;
}

interface IUpdatePost {
  postId: number;
  title: string;
  description: string;
  postImageFile: string;
  tags: number[];
}

export function useEditUserPost() {
  const [error, setError] = useState('');
  const { tags, tagsList, setPresetTags, handleTagsChange } = useTagsList();

  //for image
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultPostImage);

  const navigate = useNavigate();

  //get props from link---
  const location = useLocation();
  const { postToEdit } = location.state as LocationState;

  // create file from image blob
  async function createFile() {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL!.trim()}/api/Blob?name=${
        postToEdit?.postImage.imageId
      }.${postToEdit?.postImage.format}`
    );
    let data = await response.blob();
    let metadata = {
      type: 'image/png',
    };
    let file = new File([data], 'userImage.png', metadata);
    return file;
  }

  const handleUpdatePost = async ({ title, description }: UpdateProps) => {
    try {
      setError('');

      const dataToSend: IUpdatePost = {
        postId: postToEdit.postId,
        title: title,
        description: description,
        postImageFile: imageBlobUrl,
        tags: tagsList,
      };

      const formData = new FormData();
      const files = imageInput.current?.files;

      if (files!.length > 0) {
        formData.append('postImageFile', files![0]);
      } else {
        //return last post image photo
        formData.append('postImageFile', await createFile());
      }
      formData.append('postId', dataToSend.postId.toString());
      formData.append('title', dataToSend.title);
      formData.append('description', dataToSend.description);
      for (let i = 0; i < dataToSend.tags.length; i++) {
        formData?.append(`tagIds[${i}]`, dataToSend.tags[i].toString());
      }

      const response = await axios.put<FormData>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Posts',
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('Post update successfuly');
        navigate('/account/posts');
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

  useEffect(() => {
    setPresetTags(postToEdit.tags);
    setImageBlobUrl(
      `${process.env.REACT_APP_API_URL!.trim()}/api/Blob?name=${
        postToEdit?.postImage.imageId
      }.${postToEdit?.postImage.format}`
    );
  }, []);

  return {
    error,
    postToEdit,
    tags,
    tagsList,
    imageBlobUrl,
    imageInput,
    handleImageChange,
    handleUpdatePost,
    handleTagsChange,
  };
}
