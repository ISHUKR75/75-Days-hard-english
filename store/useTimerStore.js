/**
 * Timer Store - Manages countdown and stopwatch timer state for quizzes
 * Uses Zustand (no persistence — timer state is session-only)
 */

import { create } from 'zustand';

const useTimerStore = create((set, get) => ({
  // ─── State ────────────────────────────────────────────────────
  /** Current time in seconds */
  currentTime: 0,
  /** Initial/max time for countdown mode */
  maxTime: 60,
  /** Whether the timer is actively running */
  isRunning: false,
  /** 'countdown' | 'stopwatch' */
  mode: 'countdown',
  /** Internal interval reference (not serializable, runtime only) */
  _intervalId: null,
  /** Whether the timer has expired (countdown hit 0) */
  isExpired: false,
  /** Total elapsed time in seconds (for stopwatch) */
  elapsedTime: 0,

  // ─── Actions ──────────────────────────────────────────────────

  /**
   * Initialize the timer with a new duration and mode
   * @param {number} seconds - Duration (for countdown) or starting point
   * @param {'countdown'|'stopwatch'} mode
   */
  initTimer: (seconds, mode = 'countdown') => {
    const { _intervalId } = get();
    if (_intervalId) clearInterval(_intervalId);
    set({
      currentTime: mode === 'countdown' ? seconds : 0,
      maxTime: seconds,
      mode,
      isRunning: false,
      isExpired: false,
      elapsedTime: 0,
      _intervalId: null,
    });
  },

  /** Start or resume the timer */
  startTimer: () => {
    const state = get();
    if (state.isRunning) return;

    const intervalId = setInterval(() => {
      const { currentTime, mode, elapsedTime } = get();

      if (mode === 'countdown') {
        if (currentTime <= 1) {
          clearInterval(get()._intervalId);
          set({ currentTime: 0, isRunning: false, isExpired: true, _intervalId: null });
        } else {
          set({ currentTime: currentTime - 1, elapsedTime: elapsedTime + 1 });
        }
      } else {
        // Stopwatch mode
        set({ currentTime: currentTime + 1, elapsedTime: elapsedTime + 1 });
      }
    }, 1000);

    set({ isRunning: true, isExpired: false, _intervalId: intervalId });
  },

  /** Pause the timer */
  pauseTimer: () => {
    const { _intervalId } = get();
    if (_intervalId) clearInterval(_intervalId);
    set({ isRunning: false, _intervalId: null });
  },

  /** Reset timer to initial state */
  resetTimer: () => {
    const { _intervalId, maxTime, mode } = get();
    if (_intervalId) clearInterval(_intervalId);
    set({
      currentTime: mode === 'countdown' ? maxTime : 0,
      isRunning: false,
      isExpired: false,
      elapsedTime: 0,
      _intervalId: null,
    });
  },

  /** Stop timer and record elapsed time */
  stopTimer: () => {
    const { _intervalId } = get();
    if (_intervalId) clearInterval(_intervalId);
    set({ isRunning: false, _intervalId: null });
  },

  /**
   * Get time remaining percentage (0–100)
   * @returns {number}
   */
  getProgressPercent: () => {
    const { currentTime, maxTime, mode } = get();
    if (mode === 'stopwatch' || maxTime === 0) return 100;
    return Math.round((currentTime / maxTime) * 100);
  },
}));

export default useTimerStore;
