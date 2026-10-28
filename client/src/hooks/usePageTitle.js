import { useEffect } from 'react';

// Sets the document title for the active route. Values follow
// docs/content-model.md section 2.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}