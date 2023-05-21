import { useState } from 'react';
import CryptoJS from 'crypto-js';

interface IUser {
  email: string;
  password: string;
}

interface IUseLogin {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const useLogin = (): IUseLogin => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user: IUser = {
    email: "test@example.com",
    password: CryptoJS.AES.encrypt("password123", 'secret-key').toString()
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

    if (email !== user.email || encryptedPassword !== user.password) {
      setIsLoading(false);
      setError("Invalid email or password.");
    } else {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(user));

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
