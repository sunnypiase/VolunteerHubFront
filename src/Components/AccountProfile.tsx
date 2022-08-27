import * as React from 'react';
import { useCurrentUser } from '../Hooks/currentUser';

function AccountProfile() {
  const { currentUser } = useCurrentUser();
  return <div></div>;
}

export default AccountProfile;
