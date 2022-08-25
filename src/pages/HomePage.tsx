import React from 'react';
import PoststList from '../Components/PoststList';
import VHBar from '../Components/VHBar';
import TagsList from '../Components/TagsList';

function RegisterPage() {
  return (
    <div>
      <VHBar />
      <TagsList />
      <PoststList />
    </div>
  );
}

export default RegisterPage;
