function Header({ currentPage, onNavigate, dueTodayCount }) {
  const menus = [
    ['search', 'Search'],
    ['dashboard', 'Dashboard'],
    ['review', 'Review'],
    ['quiz', 'Quiz'],
    ['words', 'Words List'],
  ];

  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="text-lg font-bold text-blue-700">📘 English Vocab SRS</div>
        <nav className="flex flex-wrap gap-2">
          {menus.map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => onNavigate(key)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                currentPage === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
              {key === 'review' && dueTodayCount > 0 ? (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{dueTodayCount}</span>
              ) : null}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
