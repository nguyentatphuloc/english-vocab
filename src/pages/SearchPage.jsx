import SearchForm from '../components/SearchForm';
import WordResult from '../components/WordResult';

function SearchPage(props) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Tìm kiếm & học từ vựng</h2>
      <SearchForm value={props.query} onChange={props.setQuery} onSubmit={props.onSearch} isLoading={props.isLoading} />
      {props.error ? <p className="mt-3 rounded bg-red-100 p-3 text-red-700">{props.error}</p> : null}
      <WordResult result={props.result} onAddCard={props.onAddCard} />
    </section>
  );
}

export default SearchPage;
