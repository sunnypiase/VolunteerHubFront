import * as React from 'react';
import { createContext, useState } from 'react';
import { useCurrentUser } from '../Hooks/currentUser';
import { IUser } from '../models';

interface IUserContext {
  currentUser: IUser | undefined;
}

export const UserContext = createContext<IUserContext>({
  currentUser: undefined,
});

//we call currentUser one time for all
export const UserState = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useCurrentUser();

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
