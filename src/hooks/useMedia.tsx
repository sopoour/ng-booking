import { useState, useEffect } from 'react';
import { Breakpoints } from '../styles/media';

export function useMedia(breakpoint: Breakpoints) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, breakpoint]);

  return matches;
}
