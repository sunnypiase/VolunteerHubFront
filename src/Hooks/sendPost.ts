import { SelectChangeEvent } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPost, ICreatePostConnection } from '../models';
import { useCurrentUserPosts } from './currentUserPosts';

interface LocationState {
  receiverPost: IPost;
}
interface SendValueProps {
  title: string;
  description: string;
}

export function useSendPost() {
  const [error, setError] = useState('');
  const { currentUserPosts } = useCurrentUserPosts();

  //get props from link---
  const location = useLocation();
  const { receiverPost } = location.state as LocationState;

  //user posts
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPost>();

  const navigate = useNavigate();

  const handleChangeTitle = (event: SelectChangeEvent) => {
    setSelectedPostId(event.target.value as string);
  };

  useEffect(() => {
    setSelectedPost(
      currentUserPosts.find((post) => post.postId === +selectedPostId)
    );
  }, [selectedPostId]);

  //to refactor============================
  const handleSendPost = async ({ title, description }: SendValueProps) => {
    try {
      setError('');
      let volunteerId = 0;
      let needfulId = 0;
      if (selectedPost) {
        //0 - volunteer, 1- needful
        selectedPost.user.role === 0
          ? (volunteerId = selectedPost.postId)
          : (volunteerId = receiverPost.postId);
        selectedPost.user.role === 0
          ? (needfulId = receiverPost.postId)
          : (needfulId = selectedPost.postId);
      }

      const sendData: ICreatePostConnection = {
        title: title,
        message: description,
        volunteerPostId: volunteerId,
        needfulPostId: needfulId,
      };
      const response = await axios.post<ICreatePostConnection>(
        `${process.env.REACT_APP_API_URL!.trim()}` + '/api/PostConnections',
        sendData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log('Success connection');
        navigate('/');
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return {
    error,
    receiverPost,
    selectedPostId,
    selectedPost,
    currentUserPosts,
    handleChangeTitle,
    handleSendPost,
    navigateToCreatePost,
  };
}
