import { Request, Response } from 'express';
import { searchUsers } from '../src/controllers/userController';
import * as userService from '../src/lib/getUsersByEmailAndNumber';

// Мокирование сервиса
jest.mock('../src/lib/getUsersByEmailAndNumber');

describe('searchUsers', () => {
  it('should return 400 if email is not provided', () => {
    const req = {
      body: {},
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    searchUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Поле email является обязательным',
    });
  });

  it('should return users if email is provided', () => {
    const req = {
      body: { email: 'jim@gmail.com' },
    } as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // Мокирование возвращаемого значения метода getUsersByEmailAndNumber
    (userService.getUsersByEmailAndNumber as jest.Mock).mockReturnValue([
      { email: 'jim@gmail.com', number: '221122' },
    ]);

    searchUsers(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { email: 'jim@gmail.com', number: '221122' },
    ]);
  });
});
