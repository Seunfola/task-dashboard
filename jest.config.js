import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Extend expect with Jest DOM

import Login from './src/pages/Login';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Login Component', () => {
  it('renders login form with email and password inputs', () => {
    render(<Login />);

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('displays error message if login fails', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    // Mocking sweetalert2 fire function
    expect(window.swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Login failed!',
    });
  });
});
