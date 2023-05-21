import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hardcodedUser, loginUser } from '../store/actions/auth-actions';
import { AppDispatch } from '../store';

interface IUseLogin {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const useLogin = (): IUseLogin => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if(email === hardcodedUser.email && password === hardcodedUser.password) {
        dispatch(loginUser(email, password));
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
