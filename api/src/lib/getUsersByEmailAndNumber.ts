import { User } from '../types/userTypes';
import { readUsersFromFile } from './readData';

const getUsersByEmailAndNumber = (email: string, number?: string): User[] => {
  const users = readUsersFromFile();
  let result = users.filter((user) => user.email === email);

  if (number) {
    result = result.filter((user) => user.number === number);
  }

  return result;
};

export { getUsersByEmailAndNumber };
