import { useEffect, useRef } from 'react';
import { micro } from '../data/site.js';

// Full size image dialog. Uses the native dialog element, so Escape closes
// it and focus stays trapped inside. When prev and next handlers are given,
// the arrows sit on the sides of the image itself, so the next work is one
// click away without scrolling; the arrow keys do the same.
export default function Lightbox({ src, alt, onPrev, onNext, onClose }) {
  const dialogRef = useRef(null);

  // Same reason as BrowseAll: the close event is queued, so React's onClose
  // would also see the cleanup close on StrictMode mounts. The listener is
  // detached before closing and only reports a real close.
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

  useEffect(() => {
    if (!onPrev && !onNext) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'ArrowRight' && onNext) onNext();
      if (event.key === 'ArrowLeft' && onPrev) onPrev();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext]);

  function handleBackdrop(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  // Swipe support for phones, where the arrows are hidden: a horizontal
  // swipe steps to the previous or the next work.
  const touchStart = useRef(null);

  function handleTouchStart(event) {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    if (!touchStart.current || (!onPrev && !onNext)) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && onNext) onNext();
    if (dx > 0 && onPrev) onPrev();
  }

  return (
    <dialog
      className="lightbox"
      ref={dialogRef}
      onClick={handleBackdrop}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={micro.lightboxLabel}>
      <div className="lightbox__panel">
        <div className="lightbox__stage">
          {onPrev ? (
            <button
              className="lightbox__nav"
              type="button"
              onClick={onPrev}
              aria-label={micro.previousWork}
              title={micro.previousWork}>
              ←
            </button>
          ) : null}
          <img className="lightbox__image" src={src} alt={alt} />
          {onNext ? (
            <button
              className="lightbox__nav"
              type="button"
              onClick={onNext}
              aria-label={micro.nextWork}
              title={micro.nextWork}>
              →
            </button>
          ) : null}
        </div>
        <div className="lightbox__bar">
          <button className="lightbox__close" type="button" onClick={() => dialogRef.current.close()}>
            {micro.close}
          </button>
          <a className="lightbox__open" href={src} target="_blank" rel="noreferrer">
            {micro.openInNewTab}
          </a>
        </div>
      </div>
    </dialog>
  );
}
