import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentPostConnections } from '../Hooks/currentPostConnections';
import { useIsAuthorize } from './isAuthorize';

export function useSiteBar() {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  //for pop up menu under the profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  //for checking path
  const location = useLocation();
  //for messages
  const { newMessagesCount } = useCurrentPostConnections();

  const handleLogOut = async () => {
    //for cros
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL!.trim()}` + '/api/Users/logout'
    );
    if (response.status === 200) {
      navigate('/login');
    }
  };

  return {
    anchorEl,
    isMenuOpen,
    location,
    isAuthorize,
    newMessagesCount,
    navigate,
    setAnchorEl,
    handleLogOut,
  };
}
