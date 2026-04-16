import { useState } from 'react';

function SearchForm({ onSearch, loading }) {
  const [word, setWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim()) return;
    onSearch(word.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow sm:flex-row">
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Type an English word..."
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none ring-blue-500 focus:ring"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;
