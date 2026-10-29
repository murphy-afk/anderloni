// Critical texts from the API, falling back to the static module in
// client/src/data/site.js, same rationale as useCatalog.

import { useEffect, useState } from 'react';
import { texts as staticTexts } from '../data/site.js';
import { getJson } from '../lib/api.js';

export default function useTexts() {
  const [texts, setTexts] = useState(staticTexts);

  useEffect(() => {
    let cancelled = false;
    getJson('/api/texts').then((data) => {
      if (!cancelled && data && Array.isArray(data.texts) && data.texts.length > 0) {
        setTexts(data.texts);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return texts;
}
