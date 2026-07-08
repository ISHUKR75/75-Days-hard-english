/**
 * useWindowSize - Responsive breakpoints hook
 * Returns window dimensions and named breakpoint helpers
 * SSR safe — returns sensible defaults on the server
 */
import { useState, useEffect } from 'react';

const BREAKPOINTS = {
  mobile: 640,   // < 640px
  tablet: 1024,  // 640px – 1024px
  desktop: 1024, // > 1024px
};

const getSize = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

const getBreakpoint = (width) => {
  if (width === 0) return 'desktop'; // SSR default
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width <= BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
};

export function useWindowSize() {
  const [size, setSize] = useState(getSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setSize(getSize());

    window.addEventListener('resize', handleResize, { passive: true });
    // Set correct size after mount (avoids SSR mismatch)
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = getBreakpoint(size.width);

  return {
    width: size.width,
    height: size.height,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    breakpoint,
  };
}

export default useWindowSize;
