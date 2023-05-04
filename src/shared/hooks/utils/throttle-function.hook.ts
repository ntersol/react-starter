import { useEffect, useRef } from 'react';

/**
 * Utility function to throttle a function
 * @param func The function to be throttled
 * @param delay The delay in milliseconds
 * @returns The throttled function
 */
export function useThrottledFunction<T extends (...args: any[]) => void>(func: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastExecutionRef = useRef<number>(0);

  function throttledFunction(...args: any[]) {
    const now = Date.now();
    const remainingTime = delay - (now - lastExecutionRef.current);

    if (remainingTime <= 0) {
      lastExecutionRef.current = now;
      func(...args);
    } else {
      clearTimeout(timeoutRef.current!);

      timeoutRef.current = setTimeout(() => {
        lastExecutionRef.current = Date.now();
        func(...args);
      }, remainingTime);
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return throttledFunction as T;
}
