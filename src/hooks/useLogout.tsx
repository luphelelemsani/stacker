import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/auth-actions';
import { AppDispatch } from '../store';

export const useLogout = () => {
  const dispatch:AppDispatch = useDispatch();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');

    // Remove expiry time from storage
    localStorage.removeItem('expiryTime');

    // Dispatch logout action
    dispatch(logoutUser());
  };

  return { logout };
};
