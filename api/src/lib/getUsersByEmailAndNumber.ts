import { User } from '../types/userTypes';
import { readUsersFromFile } from './readData';

const getUsersByEmailAndNumber = (email: string, number?: string): User[] => {
  const users = readUsersFromFile();
  let result = users.filter((user) => user.email.includes(email));

  if (number) {
    number = number.replace(/[-_]/g, '');
    result = result.filter((user) => user.number.includes(number ?? ''));
  }

  return result;
};

export { getUsersByEmailAndNumber };
