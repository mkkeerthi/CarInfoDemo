import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Cars List' },
  { to: '/compare', label: 'Compare' },
  { to: '/contact', label: 'Contact' },
  { to: '/ui-elements', label: 'UI Elements' },
];

export default function Header() {
  return (
    <header id="site-header" className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <nav id="site-nav" aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link id="brand-link" to="/" className="flex items-center gap-2 text-lg font-semibold transition-colors duration-200 ease-in-out hover:text-emerald-400">
          <i className="fa-solid fa-car text-emerald-400" aria-hidden="true" />
          <span>Car Info Demo</span>
        </Link>
        <ul id="nav-menu" className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm transition-colors duration-200 ease-in-out ${
                    isActive ? 'bg-emerald-500/15 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
