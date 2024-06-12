import { CancelToken } from 'axios';
import { User } from '../../types/User';
import apiRequest from '../apiRequest';

const fetchUsersByEmailAndNumber = async (
  email: string,
  number?: string,
  cancelToken?: CancelToken
): Promise<User[]> => {
  const response = await apiRequest.post(
    '/search',
    { email, number },
    {
      cancelToken,
    }
  );
  return response.data;
};

export { fetchUsersByEmailAndNumber };
