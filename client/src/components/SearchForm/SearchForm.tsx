import InputMask from 'react-input-mask';
import Loader from '../Loader/Loader';
import useForm from '../../hooks/useForm';

import './SearchForm.css';
import UsersContainer from '../UsersContainer/UsersContainer';

const SearchForm: React.FC = () => {
  const {
    email,
    number,
    message,
    users,
    isLoading,
    setEmail,
    setNumber,
    handleSubmit,
  } = useForm();

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <label>Number (optional):</label>
          <InputMask
            mask="99-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={styles}
          ></InputMask>
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <UsersContainer message={message} users={users} />}

      {isLoading && <Loader background="#f8f9fa" size={50} />}
    </div>
  );
};

// Стили для кастомизации компонента из React-Input-Mask
const styles = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  fontSize: '16px',
};

export default SearchForm;
