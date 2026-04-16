import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Search' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/review', label: 'Review' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/words', label: 'Words List' },
];

function Header({ dueCount }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-lg font-bold text-blue-700">📘 English Vocab SRS</h1>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">{dueCount} cần ôn</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
