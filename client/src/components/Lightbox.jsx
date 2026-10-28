import { useEffect, useRef } from 'react';
import { micro } from '../data/site.js';

// Full size image dialog. Uses the native dialog element, so Escape closes
// it and focus stays trapped inside.
export default function Lightbox({ src, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function handleBackdrop(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog className="lightbox" ref={dialogRef} onClose={onClose} onClick={handleBackdrop}>
      <div className="lightbox__panel">
        <img className="lightbox__image" src={src} alt={alt} />
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