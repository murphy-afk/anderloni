// Generates client/src/data/catalog.js from the scraped catalogue extract.
//
//   node scripts/sync-assets.mjs      (copy images first)
//   node scripts/build-catalog.mjs    (then generate the data module)
//
// Inputs:
//   docs/catalog-raw.json      raw extract of the source catalogue
//   client/src/data/series-config.js   hand written series titles and categories
// Output:
//   client/src/data/catalog.js generated data module, reviewed and committed.

import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normaliseName, slugify } from './lib/normalise-name.mjs';
import { readJpegSize } from './lib/read-jpeg-size.mjs';
import { seriesConfig, workOverrides } from '../client/src/data/series-config.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesOrder = ['gallery.htm', 'gallery2.htm', 'gallery3.htm'];

const raw = JSON.parse(await readFile(path.join(root, 'docs', 'catalog-raw.json'), 'utf8'));

const extracted = [...raw.series].sort((a, b) => {
  const pageDelta = pagesOrder.indexOf(a.sourcePage) - pagesOrder.indexOf(b.sourcePage);
  return pageDelta !== 0 ? pageDelta : a.sourceOrder - b.sourceOrder;
});

if (extracted.length !== seriesConfig.length) {
  throw new Error(
    `Series mismatch: ${extracted.length} extracted against ${seriesConfig.length} configured`,
  );
}

function parseDimensions(primary) {
  if (!primary) return { primary: null, secondary: null };

  // Content model rule: the x symbol is surrounded by spaces.
  const cleaned = primary
    .replace(/\s+/g, ' ')
    .replace(/(\d)\s*x\s*(\d)/g, '$1 x $2')
    .replace(/\s*cm\b/i, ' cm')
    .replace(/\.+$/, '')
    .trim();

  // The source publishes the imperial line inconsistently, see
  // QUESTIONS.md Q24, so the small line is computed from centimetres.
  if (!/\bcm\b/i.test(cleaned)) return { primary: cleaned, secondary: null };
  const match = cleaned.match(
    /(\d+(?:[.,]\d+)?)(?:\s*x\s*(\d+(?:[.,]\d+)?))?(?:\s*x\s*(\d+(?:[.,]\d+)?))?\s*cm/i,
  );
  if (!match) return { primary: cleaned, secondary: null };

  const values = match
    .slice(1)
    .filter(Boolean)
    .map((value) => Number(value.replace(',', '.')));
  const inches = values.map((value) => Number((value / 2.54).toFixed(1)));

  return { primary: cleaned, secondary: `${inches.join(' x ')} in` };
}

// Resolves a source file to the shipped asset path and confirms the copy
// exists, so a broken reference never reaches the data module.
function publicPath(relativePath) {
  if (!relativePath) return null;
  const folder = path.basename(path.dirname(relativePath));
  const file = normaliseName(path.basename(relativePath));
  const target = `works/${folder}/${file}`;
  if (!existsSync(path.join(root, 'client', 'public', target))) {
    missingFiles.push(target);
    return null;
  }
  return target;
}

const missingFiles = [];

// Pixel size of a shipped asset, used to emit width and height attributes
// that prevent layout shift. Returns nulls when the file is absent.
async function imageSize(publicFile) {
  if (!publicFile) return { width: null, height: null };
  try {
    return await readJpegSize(path.join(root, 'client', 'public', publicFile));
  } catch {
    return { width: null, height: null };
  }
}

const series = await Promise.all(
  extracted.map(async (source, position) => {
    const config = seriesConfig[position];
    const used = new Set();

    const works = await Promise.all(
      source.works.map(async (rawWork) => {
        const base =
          (rawWork.title && slugify(rawWork.title)) ||
          (rawWork.zoomPage && slugify(path.basename(rawWork.zoomPage, '.htm'))) ||
          `opera-${rawWork.sourceOrder}`;
        let slug = base || `opera-${rawWork.sourceOrder}`;
        let suffix = 2;
        while (used.has(slug)) {
          slug = `${base}-${suffix}`;
          suffix += 1;
        }
        used.add(slug);

        const dimensions = parseDimensions(rawWork.dimensionsAsPublished);

        const thumb = publicPath(rawWork.galleryThumb);
        const image = publicPath(rawWork.fullImage);
        const thumbSize = await imageSize(thumb);
        const imageSizeValue = await imageSize(image);
        const override =
          workOverrides.find((entry) => entry.zoomPage === (rawWork.zoomPage || '')) || null;

        return {
          slug,
          title: rawWork.title || null,
          year: rawWork.year || null,
          dimensionsPrimary: dimensions.primary,
          dimensionsSecondary: dimensions.secondary,
          thumb,
          thumbWidth: thumbSize.width,
          thumbHeight: thumbSize.height,
          image,
          imageWidth: imageSizeValue.width,
          imageHeight: imageSizeValue.height,
          video: Boolean(rawWork.video) || Boolean(override && override.video),
          missingSource: Boolean(rawWork.missingSource),
        };
      }),
    );

    // Cards show the full size image whenever the work has one: the gallery
    // thumbs are about 140 px wide and look soft once stretched to the card
    // width. The 11 video and missing-source works keep their thumb.
    const coverSource = works.find((work) => work.image) || works.find((work) => work.thumb);

    return {
      slug: config.slug,
      title: config.title,
      year: config.year,
      category: config.category,
      cover: coverSource ? coverSource.image || coverSource.thumb : null,
      coverWidth: coverSource ? coverSource.imageWidth || coverSource.thumbWidth : null,
      coverHeight: coverSource ? coverSource.imageHeight || coverSource.thumbHeight : null,
      works,
    };
  }),
);

const output = `// Generated by scripts/build-catalog.mjs. Do not edit by hand.
// Edit docs/catalog-raw.json and client/src/data/series-config.js instead,
// then re-run: node scripts/build-catalog.mjs

export const series = ${JSON.stringify(series, null, 2)};
`;

await writeFile(path.join(root, 'client', 'src', 'data', 'catalog.js'), output, 'utf8');

const workCount = series.reduce((total, item) => total + item.works.length, 0);
const withoutImage = series.reduce(
  (total, item) => total + item.works.filter((work) => !work.image).length,
  0,
);
console.log(
  `client/src/data/catalog.js: ${series.length} series, ${workCount} works, ${withoutImage} without a full image`,
);
if (missingFiles.length > 0) {
  console.warn(`Missing shipped assets: ${[...new Set(missingFiles)].join(', ')}`);
}