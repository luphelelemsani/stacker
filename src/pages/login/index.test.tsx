import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '.';

jest.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    login: jest.fn().mockResolvedValue(true),
    error: null,
    isLoading: false,
  }),
}));

describe('Login', () => {
  it('renders the login form and allows a user to fill out their information', async () => {
    render(<Login />);

    expect(screen.getByText('Log In')).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email address:');
    const passwordInput = screen.getByLabelText('Password:');
    
    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@email.com');
    expect(passwordInput).toHaveValue('password123');

    const submitButton = screen.getByRole('button', {name: /log in/i});

    fireEvent.click(submitButton);

    // Check if login function is called when the button is clicked
    await waitFor(() => expect(jest.fn()).toHaveBeenCalled());
  });
});
