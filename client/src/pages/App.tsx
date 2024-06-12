import SearchForm from '../components/SearchForm/SearchForm';

function App() {
  return (
    <div className="app">
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>User Search</h1>
        <SearchForm />
      </header>
    </div>
  );
}

export default App;
