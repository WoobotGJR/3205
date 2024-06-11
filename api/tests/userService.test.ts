import { getUsersByEmailAndNumber } from '../src/lib/getUsersByEmailAndNumber';

// Мокирование данных
jest.mock('fs', () => ({
  readFileSync: jest.fn(() =>
    JSON.stringify([
      { email: 'jim@gmail.com', number: '221122' },
      { email: 'jam@gmail.com', number: '830347' },
      { email: 'john@gmail.com', number: '221122' },
      { email: 'jams@gmail.com', number: '349425' },
      { email: 'jams@gmail.com', number: '141424' },
      { email: 'jill@gmail.com', number: '822287' },
      { email: 'jill@gmail.com', number: '822286' },
    ])
  ),
}));

describe('getUsersByEmailAndNumber', () => {
  it('should return users with the given email', () => {
    const users = getUsersByEmailAndNumber('jim@gmail.com');
    expect(users).toEqual([{ email: 'jim@gmail.com', number: '221122' }]);
  });

  it('should return users with the given email and number', () => {
    const users = getUsersByEmailAndNumber('jams@gmail.com', '141424');
    expect(users).toEqual([{ email: 'jams@gmail.com', number: '141424' }]);
  });

  it('should return empty array if no users match the criteria', () => {
    const users = getUsersByEmailAndNumber('unknown@gmail.com');
    expect(users).toEqual([]);
  });
});
