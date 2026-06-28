import { useState, useEffect } from 'react';

// Tracks a CSS media query. Used to collapse the desktop-first layouts down to
// a single column on phones / narrow tablets.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    // `resize` is a belt-and-suspenders fallback: some embedded webviews don't
    // reliably dispatch matchMedia 'change' events on viewport changes.
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, [query]);

  return matches;
}

export const useIsNarrow = () => useMediaQuery('(max-width: 820px)');
export const useIsPhone = () => useMediaQuery('(max-width: 560px)');
