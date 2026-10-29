// Fetch helper for the Express API. Returns null on any failure, so callers
// can fall back to the bundled static data, which keeps the GitHub Pages
// preview working without the API.

export async function getJson(path) {
  try {
    const response = await fetch(path, { headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function postJson(path, body) {
  return fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => ({ ok: response.ok, status: response.status, data: response.json() }));
}
