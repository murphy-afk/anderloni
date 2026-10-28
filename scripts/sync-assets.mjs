// Copies the scraped artwork files from _reference/ into the client, with
// normalised filenames. Re-run when the client sends new images.
//
//   node scripts/sync-assets.mjs
//
// Normalisation: URI escapes decoded, whitespace becomes a dash, every other
// character outside [a-z0-9._-] becomes a dash, dashes collapsed, lowercased.
// The generated catalogue points at these normalised names.

import { copyFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normaliseName } from './lib/normalise-name.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pairs = [
  { from: path.join(root, '_reference', 'gallery'), to: path.join(root, 'client', 'public', 'works', 'gallery') },
  { from: path.join(root, '_reference', 'full'), to: path.join(root, 'client', 'public', 'works', 'full') },
];

async function sync({ from, to }) {
  await mkdir(to, { recursive: true });
  const files = await readdir(from);
  const seen = new Map();
  let copied = 0;

  for (const file of files) {
    const target = normaliseName(file);
    if (seen.has(target)) {
      throw new Error(`Name collision: ${seen.get(target)} and ${file} both become ${target}`);
    }
    seen.set(target, file);

    const source = path.join(from, file);
    const destination = path.join(to, target);
    await copyFile(source, destination);
    copied += 1;
  }

  console.log(`${path.relative(root, to)}: ${files.length} files, ${copied} renamed or copied`);
}

for (const pair of pairs) {
  await sync(pair);
}