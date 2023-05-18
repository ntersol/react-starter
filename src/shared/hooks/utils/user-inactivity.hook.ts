import { useEffect, useRef } from 'react';
import { useThrottledFunction } from './throttle-function.hook';

/**
 * Hook that checks for user inactivity and runs a function after a set period
 * @param timeout The inactivity timeout in milliseconds
 * @param callback The function to be executed on inactivity timeout
 */
export function useInactivity(timeout: number, callback: () => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleThrottledActivity = useThrottledFunction(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(callback, timeout);
  }, timeout);

  const handleClearTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleThrottledActivity);
    window.addEventListener('keydown', handleThrottledActivity);

    return () => {
      handleClearTimeout();
      window.removeEventListener('mousemove', handleThrottledActivity);
      window.removeEventListener('keydown', handleThrottledActivity);
    };
  }, [timeout, callback, handleThrottledActivity]);
}
