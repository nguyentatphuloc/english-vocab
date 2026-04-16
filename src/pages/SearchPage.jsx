import SearchForm from '../components/SearchForm';
import WordResult from '../components/WordResult';

function SearchPage({ onSearch, result, onAdd, loading }) {
  return (
    <div>
      <SearchForm onSearch={onSearch} loading={loading} />
      <WordResult result={result} onAdd={onAdd} />
    </div>
  );
}

export default SearchPage;
