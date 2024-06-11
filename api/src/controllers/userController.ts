import { Request, Response } from 'express';
import { SearchRequestBody } from '../types/userTypes';
import { getUsersByEmailAndNumber } from '../lib/getUsersByEmailAndNumber';

const searchUsers = (
  req: Request<{}, {}, SearchRequestBody>,
  res: Response
) => {
  const { email, number } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Поле email является обязательным' });
  }

  const users = getUsersByEmailAndNumber(email, number);
  res.json(users);
};

export { searchUsers };
