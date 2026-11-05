// Critical texts from the API, falling back to the static module in
// client/src/data/texts.js, same rationale as useCatalog. Body copy and the
// series links only exist statically, so API rows only replace metadata.

import { useEffect, useState } from 'react';
import { texts as staticTexts } from '../data/texts.js';
import { getJson } from '../lib/api.js';

export default function useTexts() {
  const [texts, setTexts] = useState(staticTexts);

  useEffect(() => {
    let cancelled = false;
    getJson('/api/texts').then((data) => {
      if (!cancelled && data && Array.isArray(data.texts) && data.texts.length > 0) {
        const remote = new Map(data.texts.map((item) => [item.slug, item]));
        setTexts(
          staticTexts.map((item) => {
            const row = remote.get(item.slug);
            if (!row) return item;
            return { ...item, title: row.title, author: row.author, year: row.year, languages: row.languages };
          })
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return texts;
}
