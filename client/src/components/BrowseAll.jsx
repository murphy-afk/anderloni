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

  // The close event is queued by the browser, so React's own onClose prop
  // would also report the close performed by the cleanup below (StrictMode
  // runs it on every mount) and the dialog would kill itself on open. The
  // native listener is detached before the cleanup closes the dialog, and it
  // only reports a close that actually left the dialog closed.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const handleClose = () => {
      if (!dialog.open) onCloseRef.current();
    };
    dialog.addEventListener('close', handleClose);
    if (!dialog.open) dialog.showModal();
    return () => {
      dialog.removeEventListener('close', handleClose);
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

  // Swipe support: on phones the arrows are hidden, so a horizontal swipe
  // steps through the works. Taps and vertical gestures are left alone.
  const touchStart = useRef(null);

  function handleTouchStart(event) {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
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
      onClick={handleBackdrop}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={micro.browseLabel}>
      <div className="lightbox__panel">
        <div className="lightbox__stage">
          <button
            className="lightbox__nav"
            type="button"
            onClick={() => step(-1)}
            aria-label={micro.previousWork}
            title={micro.previousWork}>
            ←
          </button>
          <img className="lightbox__image" src={asset(source)} alt={alt} />
          <button
            className="lightbox__nav"
            type="button"
            onClick={() => step(1)}
            aria-label={micro.nextWork}
            title={micro.nextWork}>
            →
          </button>
        </div>
        <div className="browse__caption">
          <span className="browse__series">
            {entry.series.title}, {entry.series.year}
          </span>
          <span className="browse__count">{micro.browsePosition(current + 1, entries.length)}</span>
        </div>
        <div className="lightbox__bar">
          <button className="lightbox__close" type="button" onClick={() => dialogRef.current.close()}>
            {micro.close}
          </button>
          <a className="lightbox__open" href={asset(source)} target="_blank" rel="noreferrer">
            {micro.openInNewTab}
          </a>
        </div>
      </div>
    </dialog>
  );
}
