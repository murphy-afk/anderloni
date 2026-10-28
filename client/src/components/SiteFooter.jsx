import { Link } from 'react-router-dom';
import { footerLinks, micro, navigation, site } from '../data/site.js';

// Dark footer band: identity, contact details, legal links, back to top.
export default function SiteFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="site-footer plate">
      <div className="container container--wide site-footer__grid">
        <div className="site-footer__identity flow">
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__role">{site.role}</p>
          <address className="site-footer__address">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            {site.address}
          </address>
        </div>

        <nav className="site-footer__nav" aria-label="Navigazione a piè di pagina">
          <ul className="site-footer__list" role="list">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__meta">
          <ul className="site-footer__list" role="list">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <button type="button" className="site-footer__top" onClick={scrollToTop}>
                {micro.backToTop}
              </button>
            </li>
          </ul>
          <p className="site-footer__copy">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}