import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import "../../theme/pages/login.css"

interface IUseLogin {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const { login, error, isLoading }: IUseLogin = useLogin();

  useEffect(() => {
    setEmailValid(email.includes('@') && email.includes('.'));
  }, [email]);

  useEffect(() => {
    setPasswordValid(password.length >= 6);
  }, [password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleChange = (setFunction: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => setFunction(e.target.value);

    if(isLoading) return <div>Loading...</div>

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label htmlFor='email'>Email address:</label>
      <input 
        type="email" 
        id='email'
        name='email'
        onChange={handleChange(setEmail)} 
        value={email} 
      />
      {!emailValid && <div className="error">Please enter a valid email address.</div>}
      <label htmlFor='password'>Password:</label>
      <input 
        type="password" 
        name='password'
        id='password'
        onChange={handleChange(setPassword)} 
        value={password} 
      />
      {!passwordValid && <div className="error">Password should be at least 6 characters.</div>}
      <button disabled={isLoading || !emailValid || !passwordValid} type='submit'>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
