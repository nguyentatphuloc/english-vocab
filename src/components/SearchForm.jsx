function SearchForm({ value, onChange, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nhập từ tiếng Anh..."
        className="flex-1 rounded border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>
    </form>
  );
}

export default SearchForm;
