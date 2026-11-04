import { useEffect } from 'react';
import { site } from '../data/site.js';
import { asset } from '../lib/asset.js';

// Ensures a meta tag exists with the given attribute/value, creating it in
// <head> when missing. Returns the element so callers can update content.
function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
  return tag;
}

// Updates or creates the route level SEO metadata: document title, meta
// description, canonical URL, OpenGraph and Twitter values, plus an optional
// JSON-LD block scoped to the page. Called once per route by pages.
// `image` overrides the shared share image with { src, width, height, alt },
// `noindex` drops the canonical link and blocks indexing (404 page).

// Default share image (hero still life, 800x612) applied when a route does
// not pass its own image override.
const defaultImage = {
  src: '/works/full/images_____06_10_cen002.jpg',
  width: 800,
  height: 612,
  alt: 'Natura morta su fondo nero: un insetto coperto di cenere',
};

export default function useSeo({ title, description, path = '/', jsonLd, image, noindex = false }) {
  // Serialised once so inline object literals do not retrigger the effect
  // on every render.
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';
  const imageKey = image ? JSON.stringify(image) : '';

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);

    const url = `${site.domain}${path === '/' ? '/' : path}`;

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      const link =
        canonical ||
        document.head.appendChild(
          Object.assign(document.createElement('link'), { rel: 'canonical' })
        );
      link.setAttribute('href', url);
      document.head.querySelector('meta[name="robots"]')?.remove();
      upsertMeta('property', 'og:url', url);
    }

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const shareImage = imageKey ? JSON.parse(imageKey) : defaultImage;
    const imageUrl = `${site.domain}${asset(shareImage.src)}`;
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:width', String(shareImage.width));
    upsertMeta('property', 'og:image:height', String(shareImage.height));
    upsertMeta('property', 'og:image:alt', shareImage.alt);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', shareImage.alt);

    const existing = document.getElementById('route-jsonld');
    if (existing) existing.remove();
    if (jsonLdText) {
      const script = document.createElement('script');
      script.id = 'route-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonLdText;
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonLdText, imageKey, noindex]);
}
