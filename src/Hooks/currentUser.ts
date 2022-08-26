import axios from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../models';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();
}
