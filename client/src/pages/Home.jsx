import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import { asset } from '../lib/asset.js';
import { home } from '../data/site.js';

// Home: full bleed hero plate, opening text, artist quote, catalogue teaser.
export default function Home() {
  usePageTitle('Guido Anderloni, pittura, natura morta e installazioni');

  return (
    <>
      <section className="hero plate" aria-labelledby="titolo-hero">
        <img
          className="hero__image"
          src={asset(home.heroImage)}
          alt={home.heroAlt}
          width={1600}
          height={900}
          fetchPriority="high" />
        <div className="hero__body container container--wide">
          <div className="hero__text flow">
            <p className="eyebrow hero__eyebrow">{home.eyebrow}</p>
            <h1 id="titolo-hero" className="hero__title">
              {home.title}
            </h1>
            <p className="hero__subtitle">{home.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="apertura">
        <div className="flow section__inner">
          <h2 id="apertura" className="visually-hidden">
            {home.title}
          </h2>
          <p className="section__lead">{home.lead}</p>
          <p className="section__lead">{home.second}</p>
        </div>
      </section>

      <section className="section section--tint" aria-label="Citazione">
        <div className="container">
          <blockquote className="quote flow">
            <p className="quote__text">{home.quote.text}</p>
            <footer className="quote__author">{home.quote.author}</footer>
          </blockquote>
        </div>
      </section>

      <section className="section container" aria-labelledby="catalogo">
        <div className="feature flow">
          <p className="eyebrow">{home.feature.eyebrow}</p>
          <h2 id="catalogo">{home.feature.title}</h2>
          <p>{home.feature.text}</p>
          <p>
            <Link className="link-arrow" to={home.feature.to}>
              {home.feature.action}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}