import { useEffect, useRef } from 'react';

/**
 * Hook that checks for user inactivity and runs a function after a set period
 * @param timeout The inactivity timeout in milliseconds
 * @param callback The function to be executed on inactivity timeout
 */
export function useInactivity(timeout: number, callback: () => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, timeout);
    };

    const handleClearTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleThrottledActivity = handleActivity; // Adjust this line to use your own throttle function

    window.addEventListener('mousemove', handleThrottledActivity);
    window.addEventListener('keydown', handleThrottledActivity);

    return () => {
      handleClearTimeout();
      window.removeEventListener('mousemove', handleThrottledActivity);
      window.removeEventListener('keydown', handleThrottledActivity);
    };
  }, [timeout, callback]);
}
