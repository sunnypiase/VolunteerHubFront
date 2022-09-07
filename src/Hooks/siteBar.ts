import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAuthorize } from './isAuthorize';
import { useCurrentPostConnections } from '../Hooks/currentPostConnections';

export function useSiteBar() {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  //for pop up menu under the profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const location = useLocation();

  const { newMessagesCount } = useCurrentPostConnections();

  //element needs anchor
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //set ahchor to null, no element needs menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigateToAccountPosts = () => {
    navigate('/account/posts');
  };
  const navigateToAccountProfile = () => {
    navigate('/account/profile');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToSignUp = () => {
    navigate('/register');
  };
  const navigateToAccountMessages = () => {
    navigate('/account/messages');
  };

  const handleLogOut = async () => {
    //for cros
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL!.trim()}`+'/api/Users/logout'
    );
    if (response.status === 200) {
      navigateToLogin();
    }
  };

  return {
    anchorEl,
    isMenuOpen,
    location,
    isAuthorize,
    newMessagesCount,
    handleMenuClose,
    navigateToAccountPosts,
    navigateToAccountMessages,
    navigateToAccountProfile,
    handleProfileMenuOpen,
    handleLogOut,
    navigateToSignUp,
    navigateToLogin,
  };
}