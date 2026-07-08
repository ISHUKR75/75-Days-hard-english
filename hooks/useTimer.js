/**
 * useTimer - Countdown and count-up timer hook
 * @param {number} initialSeconds - Starting seconds
 * @param {object} options - { mode: 'countdown'|'countup', onComplete, autoStart }
 */
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds = 60, options = {}) {
  const { mode = 'countdown', onComplete, autoStart = false } = options;

  const [time, setTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const initialRef = useRef(initialSeconds);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      stop();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (mode === 'countdown') {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        } else {
          // countup mode
          const next = prev + 1;
          if (initialRef.current > 0 && next >= initialRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            if (onComplete) onComplete();
            return next;
          }
          return next;
        }
      });
    }, 1000);

    return stop;
  }, [isRunning, mode, onComplete, stop]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    stop();
    setIsRunning(false);
    setTime(initialRef.current);
  }, [stop]);

  const percentage = initialRef.current > 0
    ? mode === 'countdown'
      ? (time / initialRef.current) * 100
      : (time / initialRef.current) * 100
    : 0;

  const formattedTime = (() => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  })();

  return { time, isRunning, start, pause, reset, percentage, formattedTime };
}

export default useTimer;
