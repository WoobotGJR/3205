import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useForm from '../src/hooks/useForm';
import SearchForm from '../src/components/SearchForm/SearchForm';

// Мокируем useForm хук
jest.mock('../../hooks/useForm');

const mockedUseForm = useForm;

describe('SearchForm', () => {
  beforeEach(() => {
    mockedUseForm.mockReturnValue({
      email: '',
      number: '',
      message: '',
      users: [],
      isLoading: false,
      setEmail: jest.fn(),
      setNumber: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  it('renders the form fields', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('enables the submit button when email is provided', () => {
    const setEmailMock = jest.fn();
    mockedUseForm.mockReturnValueOnce({
      email: '',
      number: '',
      message: '',
      users: [],
      isLoading: false,
      setEmail: setEmailMock,
      setNumber: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<SearchForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(setEmailMock).toHaveBeenCalledWith('test@example.com');
  });

  it('displays loading state and then results on submit', async () => {
    const handleSubmitMock = jest.fn((e) => {
      e.preventDefault();
      mockedUseForm.mockReturnValueOnce({
        email: 'test@example.com',
        number: '22-11-22',
        message: 'Users found',
        users: [{ email: 'test@example.com', number: '22-11-22' }],
        isLoading: false,
        setEmail: jest.fn(),
        setNumber: jest.fn(),
        handleSubmit: jest.fn(),
      });
    });

    mockedUseForm.mockReturnValueOnce({
      email: 'test@example.com',
      number: '22-11-22',
      message: '',
      users: [],
      isLoading: true,
      setEmail: jest.fn(),
      setNumber: jest.fn(),
      handleSubmit: handleSubmitMock,
    });

    render(<SearchForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const numberInput = screen.getByLabelText(/number \(optional\)/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(numberInput, { target: { value: '22-11-22' } });

    fireEvent.click(submitButton);

    expect(handleSubmitMock).toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    );

    mockedUseForm.mockReturnValueOnce({
      email: 'test@example.com',
      number: '22-11-22',
      message: 'Users found',
      users: [{ email: 'test@example.com', number: '22-11-22' }],
      isLoading: false,
      setEmail: jest.fn(),
      setNumber: jest.fn(),
      handleSubmit: jest.fn(),
    });

    await waitFor(() =>
      expect(screen.getByText(/users found/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
});
