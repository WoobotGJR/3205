import axios, { CancelTokenSource } from 'axios';
import { useRef, useState } from 'react';
import { fetchUsersByEmailAndNumber } from '../api/userService/userService';
import { User } from '../types/User';

const useForm = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка на пустой email
    if (!email) {
      setMessage('Email is required');
      return;
    }

    // Отменить предыдущий запрос, если он существует
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Operation canceled due to new request.');
    }

    // Создать новый CancelToken для текущего запроса
    const source = axios.CancelToken.source();
    cancelTokenRef.current = source;

    // Очищаем массив пользователей и устанавливаем состояние загрузки
    setMessage('');
    setUsers([]);
    setisLoading(true);

    try {
      setMessage('Searching for users...');
      const response = await fetchUsersByEmailAndNumber(
        email,
        number,
        source.token // Передаём токен отмены
      );

      // Сохраняем пользователей и устанавливаем сообщение
      setMessage(`Found ${response.length} users: `);
      setUsers(response);
    } catch (error) {
      setMessage('An error occurred while searching for users: ' + error);
    } finally {
      setisLoading(false); // Сбросить состояние загрузки
    }
  };

  return {
    email,
    number,
    message,
    isLoading,
    users,
    setEmail,
    setNumber,
    handleSubmit,
  };
};

export default useForm;
