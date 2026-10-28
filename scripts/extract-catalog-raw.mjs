// Builds docs/catalog-raw.json from the saved source site in _reference/.
//
//   node scripts/extract-catalog-raw.mjs
//
// Input:  _reference/html/gallery.htm, gallery2.htm, gallery3.htm and the
//         zoom pages in _reference/html/zoom/.
// Output: docs/catalog-raw.json, the extracted catalogue and source of truth
//         for scripts/build-catalog.mjs.
//
// Each source band is a table with three rows: series title, thumbnails with
// zoom links, and per work captions. Caption cells are matched to thumbnails
// in order. Titles, years and dimensions are then read from the zoom page,
// which is more detailed than the band caption. A work keeps the band caption
// only when it has no zoom page.

import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['gallery.htm', 'gallery2.htm', 'gallery3.htm'];

const entities = {
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&amp;': '&',
  '&copy;': '',
  '&lt;': '<',
  '&gt;': '>',
  '&iexcl;': '\u00a1',
  '&ntilde;': '\u00f1',
  '&uuml;': '\u00fc',
  '&agrave;': '\u00e0',
  '&egrave;': '\u00e8',
  '&igrave;': '\u00ec',
  '&ograve;': '\u00f2',
  '&ugrave;': '\u00f9',
  '&agrave;': '\u00e0',
};

function decode(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/gi, (match) => entities[match.toLowerCase()] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// File names in _reference differ from the paths in the markup only by the
// separator, so compare on letters and digits alone.
function key(name) {
  return decodeURIComponent(name).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function indexFolder(relative) {
  const folder = path.join(root, relative);
  const map = new Map();
  for (const file of readdirSync(folder)) {
    map.set(key(file), path.join(relative, file));
  }
  return map;
}

const thumbs = indexFolder('_reference/gallery');
const fulls = indexFolder('_reference/full');
const zooms = indexFolder('_reference/html/zoom');

function lookup(map, relativePath) {
  if (!relativePath) return null;
  const hit = map.get(key(relativePath));
  return hit ? hit.replace(/\\/g, '/') : null;
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, ' '));
}

// Reads one zoom page: full size image, title, year, dimensions.
function readZoom(zoomPath) {
  const file = lookup(zooms, zoomPath);
  if (!file) return null;
  const html = readFileSync(path.join(root, file), 'latin1');

  const source = html.replace(/<title>[\s\S]*?<\/title>/i, ' ');
  const body = stripTags(source.replace(/<script[\s\S]*?<\/script>/gi, ' '));
  const isFlash = /flash player/i.test(body);
  const caption = body
    .replace(/<!--|-->|-->/g, ' ')
    .replace(/content on this page requires[\s\S]*?flash player\.?/gi, ' ')
    .replace(/loading\s*\.\.\./gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // The full size image: skip the adobe and loading placeholder gifs.
  let fullRelative = null;
  const src = html.match(/<img[^>]*src="([^"]+)"/i);
  if (src && !/loading\.gif|download_buttons/i.test(src[1])) {
    const decoded = decodeURIComponent(src[1]);
    const candidate = path.posix.join(path.posix.dirname(zoomPath.replace(/\\/g, '/')), decoded);
    fullRelative = lookup(fulls, candidate) || lookup(fulls, decoded);
  }

  const year = (caption.match(/\b(19|20)\d{2}\b/) || [null])[0]
    ? caption.match(/\b((?:19|20)\d{2})\b/)[1]
    : null;

  // Title is the caption text before the year.
  let title = null;
  if (year) {
    title = caption.slice(0, caption.indexOf(year));
  } else if (caption) {
    title = caption;
  }
  if (title) {
    title = title
      .replace(/\d+(?:['\u2032]?\d+)?"\s*(loop)?$/i, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[\s,:]+$/g, '')
      .trim();
    // Numbered placeholders and detail shots carry no real title.
    if (!title || /^#?\s*\d+$/.test(title) || /^detail/i.test(title)) title = null;
    // Some titles repeat the technique after the name, for example
    // "Untitled, photoengraving monotype". Keep only the name part.
    if (title) {
      const cut = title.search(/,\s*(photoengraving|monotype|video|installation)/i);
      if (cut > 0) title = title.slice(0, cut).trim();
    }
  }

  const afterYear = year ? caption.slice(caption.indexOf(year) + 4) : '';
  const metric = afterYear.match(/^((?:\d+(?:[.,]\d+)?\s*x\s*)*\d+(?:[.,]\d+)?\s*cm)/i);
  let dimensionsPrimary = metric ? metric[1].replace(/\s+/g, ' ').trim() : null;
  if (dimensionsPrimary) {
    dimensionsPrimary = dimensionsPrimary.replace(/\.+$/, '');
  }
  let dimensionsSecondary = null;
  if (dimensionsPrimary) {
    const rest = afterYear.slice(metric[0].length).replace(/^[\s.-]+/, '').trim();
    if (rest.includes('x') && rest.includes('"')) dimensionsSecondary = rest.replace(/\.$/, '');
  }

  return { fullRelative, title, year, dimensionsPrimary, dimensionsSecondary, isFlash, video: isFlash };
}

// Caption cell under a thumbnail. Only used when the work has no zoom page.
function captionFromBand(text) {
  const clean = decode(text);
  if (!clean || /^#?\s*\d+$/.test(clean)) return { title: null, dimensions: null };
  // The caption cell repeats the exhibition caption: metric dimensions, then
  // the imperial conversion. Both are kept, in that order.
  const metric = clean.match(/((?:\d+(?:[.,]\d+)?\s*x\s*){1,2}\d+(?:[.,]\d+)?\s*cm)/i);
  if (!metric) {
    if (/video|installation|detail/i.test(clean)) return { title: null, dimensions: null };
    // A bare "WxH" with no unit, as published for some works.
    const bare = clean.match(/^(.*?)\s*((?:\d+(?:[.,]\d+)?\s*x\s*){1,2}\d+(?:[.,]\d+)?)\s*$/);
    if (!bare) return { title: clean, dimensions: null };
    const bareTitle = bare[1].replace(/[\s,:]+$/g, '').trim();
    return {
      title: bareTitle && !/^#?\s*\d+$/.test(bareTitle) ? bareTitle : null,
      dimensions: bare[2].replace(/\s+/g, ' ').trim(),
    };
  }

  const title = clean.slice(0, clean.indexOf(metric[1])).replace(/[\s,:]+$/g, '').trim();
  const imperial = clean.slice(clean.indexOf(metric[1]) + metric[1].length).trim();
  return {
    title: title && !/^#?\s*\d+$/.test(title) ? title : null,
    dimensions: metric[1].replace(/\s+/g, ' ').trim(),
    dimensionsImperial: imperial.replace(/^[\s.-]+|\.+$/g, '').trim() || null,
  };
}

const series = [];

for (const page of pages) {
  const html = readFileSync(path.join(root, '_reference/html', page), 'latin1');
  const bands = html.split(/<table[^>]*bgcolor="687A6F"/i).slice(1);

  bands.forEach((band, bandIndex) => {
    const rows = band.split(/<tr\b[^>]*>/i).slice(1);
    const imageRowIndex = rows.findIndex((row) => /<img[^>]+src="(?:images|pag2|pag3)\//i.test(row));
    if (imageRowIndex === -1) return;

    const headerRow = rows.slice(0, imageRowIndex).join(' ');
    const headerMatch = headerRow.match(/size="1"[^>]*>([\s\S]*?)<\/font>/i);
    const headerTitle = headerMatch ? stripTags(headerMatch[1]) : null;

    const imageCells = rows[imageRowIndex].split(/<td\b[^>]*>/i).slice(1);
    const imageEntries = [];
    imageCells.forEach((cell, index) => {
      if (/<img[^>]+src="(?:images|pag2|pag3)\//i.test(cell)) {
        imageEntries.push({ index, cell });
      }
    });

    const captionRow = rows[imageRowIndex + 1] || '';
    const captionCells = captionRow.split(/<td\b[^>]*>/i).slice(1);

    const works = imageEntries.map(({ index, cell }, order) => {
      const img = cell.match(/<img[^>]*src="([^"]+)"/i);
      const zoom = cell.match(/MM_openBrWindow\('([^']*)'/);
      const thumbRelative = lookup(thumbs, decodeURIComponent(img[1]));
      const zoomPath = zoom && zoom[1].trim() ? decodeURIComponent(zoom[1]) : null;
      const zoomData = zoomPath ? readZoom(zoomPath) : null;
      const alt = (cell.match(/<img[^>]*alt="([^"]*)"/i) || [])[1] || '';

      const video =
        /play/i.test(alt) || Boolean(zoomData && zoomData.video) || /video/i.test(img[1]);

      // Video cells publish duration and file size in the caption cell, which
      // is not a measurement, so videos never carry dimensions.
      const captionText = captionCells[index] ? stripTags(captionCells[index]) : '';
      const captionData = video ? { title: null, dimensions: null } : captionFromBand(captionText);

      return {
        sourceOrder: order,
        zoomPage: zoomPath,
        title: (zoomData && zoomData.title) || captionData.title || null,
        year: (zoomData && zoomData.year) || null,
        dimensionsAsPublished:
          (zoomData && zoomData.dimensionsPrimary) || captionData.dimensions || null,
        dimensionsSecondaryPublished:
          (zoomData && zoomData.dimensionsSecondary) || captionData.dimensionsImperial || null,
        galleryThumb: thumbRelative,
        fullImage: (zoomData && zoomData.fullRelative) || null,
        video,
        missingSource: !thumbRelative && !(zoomData && zoomData.fullRelative),
      };
    });

    // A band without a title continues the previous series, see gallery3.
    if (!headerTitle && series.length > 0) {
      const previous = series[series.length - 1];
      previous.works.push(...works);
      console.warn(`${page} band ${bandIndex}: continuation of ${previous.sourceOrder}`);
      return;
    }

    series.push({ sourcePage: page, sourceOrder: series.length, works });
    console.log(
      `${page} band ${bandIndex}: ${headerTitle || 'UNTITLED'} with ${works.length} works`,
    );
  });
}

const output = {
  source: 'https://www.anderloni.com',
  extractedOn: '2026-10-28',
  note: 'Generated by scripts/extract-catalog-raw.mjs from the saved source pages. Titles and years come from the zoom pages, dimensions are kept as published.',
  series,
};

writeFileSync(path.join(root, 'docs', 'catalog-raw.json'), `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const workCount = series.reduce((total, item) => total + item.works.length, 0);
const videoCount = series.reduce(
  (total, item) => total + item.works.filter((work) => work.video).length,
  0,
);
const missingCount = series.reduce(
  (total, item) => total + item.works.filter((work) => !work.fullImage).length,
  0,
);
console.log(
  `docs/catalog-raw.json: ${series.length} series, ${workCount} works, ${videoCount} videos, ${missingCount} without a full image`,
);
