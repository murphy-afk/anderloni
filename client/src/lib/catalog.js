// Catalogue accessors over a series array, either the API payload or the
// generated static module.

export function getSeries(series, slug) {
  if (!series || !slug) return null;
  return series.find((item) => item.slug === slug) || null;
}

export function getWork(item, slug) {
  if (!item || !slug) return null;
  return item.works.find((work) => work.slug === slug) || null;
}

export function getCategories(series) {
  if (!series) return [];
  return Array.from(new Set(series.map((item) => item.category)));
}
