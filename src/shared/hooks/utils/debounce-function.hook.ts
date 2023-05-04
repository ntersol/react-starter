import { useEffect, useRef } from 'react';

/**
 * Utility function to debounce a function
 * @param func The function to be debounced
 * @param delay The delay in milliseconds
 * @returns The debounced function
 */
export function useDebouncedFunction<T extends (...args: any[]) => void>(func: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debouncedFunction(...args: any[]) {
    clearTimeout(timeoutRef.current || 0);

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current || 0);
    };
  }, []);

  return debouncedFunction as T;
}
