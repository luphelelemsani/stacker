// authActions.ts

import { Dispatch } from 'redux';
import { userLogin, userLogout } from '../reducers/auth-reducer';
import CryptoJS from 'crypto-js';

interface IUser {
  email: string;
  password: string;
}

export const hardcodedUser: IUser = {
  email: "test@example.com",
  password: "password123"
};

export const loginUser = (email: string, password: string) => (dispatch: Dispatch) => {

  if (email === hardcodedUser.email && password === hardcodedUser.password) {

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

    hardcodedUser.password = encryptedPassword;

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

  if (!expiryTime || !user || Object.keys(user).length === 0 || new Date().getTime() > Number(expiryTime)) {
    localStorage.removeItem('user');
    localStorage.removeItem('expiryTime');
    dispatch(userLogout());
  } else {
    dispatch(userLogin(user));
  }
};




