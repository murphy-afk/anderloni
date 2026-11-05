import { useEffect, useRef, useState } from 'react';
import { micro } from '../data/site.js';
import { asset } from '../lib/asset.js';

// Whole catalogue in a single dialog. Works follow each other in series
// order, the caption always names the series, so the reading order stays the
// same as the three gallery pages of the original site. Arrow keys move
// through the works and the sequence wraps around at the end.
export default function BrowseAll({ entries, index, onClose }) {
  const dialogRef = useRef(null);
  const [current, setCurrent] = useState(index);

  const entry = entries[current];
  const work = entry ? entry.work : null;
  const source = entry ? entry.work.image || entry.work.thumb : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function step(delta) {
    setCurrent((value) => (value + delta + entries.length) % entries.length);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [entries.length]);

  // Warm up the next image so the slideshow does not stall on large files.
  useEffect(() => {
    if (!entries.length) return;
    const next = entries[(current + 1) % entries.length].work;
    const preload = next.image || next.thumb;
    if (preload) {
      const image = new Image();
      image.src = asset(preload);
    }
  }, [current, entries]);

  function handleBackdrop(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  if (!entry || !work || !source) {
    return null;
  }

  const title = work.title || entry.series.title;
  const year = work.year || entry.series.year;
  const alt = `${title}, ${year}`;

  return (
    <dialog
      className="lightbox browse"
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdrop}
      aria-label={micro.browseLabel}>
      <div className="lightbox__panel">
        <img className="lightbox__image" src={asset(source)} alt={alt} />
        <div className="browse__caption">
          <span className="browse__series">
            {entry.series.title}, {entry.series.year}
          </span>
          <span className="browse__count">{micro.browsePosition(current + 1, entries.length)}</span>
        </div>
        <div className="lightbox__bar">
          <button className="browse__nav" type="button" onClick={() => step(-1)}>
            ← {micro.previousWork}
          </button>
          <span className="browse__tools">
            <a className="lightbox__open" href={asset(source)} target="_blank" rel="noreferrer">
              {micro.openInNewTab}
            </a>
            <button className="lightbox__close" type="button" onClick={() => dialogRef.current.close()}>
              {micro.close}
            </button>
          </span>
          <button className="browse__nav" type="button" onClick={() => step(1)}>
            {micro.nextWork} →
          </button>
        </div>
      </div>
    </dialog>
  );
}
