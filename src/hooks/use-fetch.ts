'use client';

import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string | null, deps: any[] = []): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    let active = true;
    // Use a microtask to set pending (avoids synchronous setState in effect body)
    Promise.resolve().then(() => {
      if (active) setPending(true);
    });
    fetch(url)
      .then(async (r) => {
        if (!r.ok) {
          const txt = await r.text().catch(() => '');
          throw new Error(txt || `HTTP ${r.status}`);
        }
        return r.json();
      })
      .then((j) => {
        if (active) {
          setData(j);
          setError(null);
          setPending(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e?.message || 'Gagal memuat data');
          setPending(false);
        }
      });
    return () => {
      active = false;
    };
  }, [url, tick, ...deps]);

  return {
    data: url ? data : null,
    loading: !!url && (pending || (!data && !error)),
    error,
    refetch: () => setTick((t) => t + 1),
  };
}
