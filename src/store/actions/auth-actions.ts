// authActions.ts

import { Dispatch } from 'redux';
import { userLogin, userLogout } from '../reducers/auth-reducer';
import CryptoJS from 'crypto-js';

interface IUser {
  email: string;
  password: string;
}

const hardcodedUser: IUser = {
  email: "test@example.com",
  password: CryptoJS.AES.encrypt("password123", 'secret-key').toString()
};

export const loginUser = (email: string, password: string) => (dispatch: Dispatch) => {
  const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

  if (email === hardcodedUser.email && encryptedPassword === hardcodedUser.password) {
    localStorage.setItem('user', JSON.stringify(hardcodedUser));
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;  // current time in milliseconds + 24 hours in milliseconds
    localStorage.setItem('expiryTime', expiryTime.toString());

    dispatch(userLogin(hardcodedUser));
  }
};

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('expiryTime');

  dispatch(userLogout());
};

export const checkAuthState = () => (dispatch: Dispatch) => {
    const expiryTime = localStorage.getItem('expiryTime');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (expiryTime && new Date().getTime() > Number(expiryTime)) {
      localStorage.removeItem('user');
      localStorage.removeItem('expiryTime');
      dispatch(userLogout());
    } else if (user && Object.keys(user).length !== 0) {
      dispatch(userLogin(user));
    } else {
      dispatch(userLogout());
    }
  };
  

