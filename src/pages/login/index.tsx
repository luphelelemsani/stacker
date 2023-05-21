import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

interface IUseLogin {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, error, isLoading }: IUseLogin = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleChange = (setFunction: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => setFunction(e.target.value);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={handleChange(setEmail)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={handleChange(setPassword)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
