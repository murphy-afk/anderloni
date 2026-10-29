// Catalogue from the API, falling back to the generated static module. The
// static array renders immediately, so pages stay complete until the API
// answers with the same content.

import { useEffect, useState } from 'react';
import { series as staticSeries } from '../data/catalog.js';
import { getJson } from '../lib/api.js';

export default function useCatalog() {
  const [series, setSeries] = useState(staticSeries);

  useEffect(() => {
    let cancelled = false;
    getJson('/api/series').then((data) => {
      if (
        !cancelled &&
        data &&
        Array.isArray(data.series) &&
        data.series.length > 0 &&
        (data.series[0].works?.length ?? 0) > 0
      ) {
        setSeries(data.series);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return series;
}
