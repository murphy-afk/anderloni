// Resolves a public asset path against the Vite base option, so the same
// relative references work in dev and under the GitHub Pages subpath.
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}