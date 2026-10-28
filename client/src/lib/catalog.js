// Catalogue accessors over the generated data module.

import { series } from '../data/catalog.js';

export function getSeries(slug) {
  if (!slug) return null;
  return series.find((item) => item.slug === slug) || null;
}

export function getWork(item, slug) {
  if (!item || !slug) return null;
  return item.works.find((work) => work.slug === slug) || null;
}

export function getCategories() {
  return Array.from(new Set(series.map((item) => item.category)));
}