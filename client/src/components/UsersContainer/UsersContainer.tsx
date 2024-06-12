import { User } from '../../types/User';

interface UsersContainerProps {
  users: User[];
  message: string;
}

const UsersContainer: React.FC<UsersContainerProps> = ({ users, message }) => {
  // Функция для преобразования номера 999999 в формат 99-99-99
  const convertNumber = (number: string | undefined) => {
    return number?.replace(/(\d{2})(?=\d)/g, '$1-');
  };

  return (
    <div className="message-container">
      {message && <p className="message">{message}</p>}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.email} className="user-item">
              Email: {user.email}
              <br />
              Number: {convertNumber(user.number)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersContainer;
