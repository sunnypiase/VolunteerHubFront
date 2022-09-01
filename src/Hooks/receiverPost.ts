import { useEffect, useState } from 'react';
import { IPost } from '../models';

export function useReceiverPost() {
  const [receiverPost, setReceiverPost] = useState<IPost>();

  useEffect(() => {
    console.log(receiverPost);
  }, []);

  return { receiverPost, setReceiverPost };
}
