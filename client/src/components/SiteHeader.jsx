import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation, site } from '../data/site.js';
import { micro } from '../data/site.js';

// Sticky header: artist name on the left, navigation on the right.
// Below the desktop breakpoint the navigation collapses behind a toggle.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner container container--wide">
        <Link className="site-header__brand" to="/">
          <span className="site-header__name">{site.name}</span>
          <span className="site-header__role">{site.role}</span>
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="navigazione"
          onClick={() => setOpen((value) => !value)}>
          {open ? micro.closeMenu : micro.menu}
        </button>

        <nav
          id="navigazione"
          className={`site-header__nav${open ? ' is-open' : ''}`}
          aria-label="Navigazione principale">
          <ul className="site-header__list" role="list">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `site-header__link${isActive ? ' is-active' : ''}`
                  }>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}