// ProtectedRoute.tsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuthState } from '../store/actions/auth-actions';
import { useAppSelector } from "../hooks/reduxHook";
import { AppDispatch } from "../store";

const ProtectedRoute = (props: { component: JSX.Element }) => {
  const dispatch:AppDispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthState());
    // check if isAuthenticated has changed to false, if yes, then navigate to login
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [dispatch, navigate, isAuthenticated]);

  return isAuthenticated ? props.component : null;
};

export default ProtectedRoute;
