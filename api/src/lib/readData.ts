import path from 'path';
import fs from 'fs';

import { User } from '../types/userTypes';

// Функция для чтения данных из файла data.json
const readUsersFromFile = (): User[] => {
  const filePath = path.join(__dirname, '../db/data.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export { readUsersFromFile };
