// Single naming rule for artwork files. Used by scripts/sync-assets.mjs when
// copying images and by scripts/build-catalog.mjs when generating the data
// module, so the copied file and the generated path always agree.

export function normaliseName(name) {
  let decoded = name;
  try {
    decoded = decodeURIComponent(name);
  } catch {
    decoded = name;
  }
  return decoded
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9._-]/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}

export function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}