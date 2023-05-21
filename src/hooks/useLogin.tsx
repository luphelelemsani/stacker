import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/auth-actions';
import { AppDispatch } from '../store';

interface IUseLogin {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const useLogin = (): IUseLogin => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch:AppDispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(loginUser(email, password));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Invalid email or password.");
    }
  };

  return { login, isLoading, error };
};
