/**
 * useStreak - Daily streak tracking hook
 * Reads and updates streak data from useUserStore
 */
import { useCallback } from 'react';
import useUserStore from '@/store/userStore';

export function useStreak() {
  const streak = useUserStore((s) => s.streak);
  const longestStreak = useUserStore((s) => s.longestStreak);
  const lastStudiedDate = useUserStore((s) => s.lastStudiedDate);
  const updateStreakStore = useUserStore((s) => s.updateStreak);

  /** Returns true if the user has already studied today */
  const hasStudiedToday = useCallback(() => {
    if (!lastStudiedDate) return false;
    const today = new Date().toDateString();
    const last = new Date(lastStudiedDate).toDateString();
    return today === last;
  }, [lastStudiedDate]);

  /**
   * Returns true if the streak is still active
   * (studied today OR yesterday)
   */
  const isStreakActive = (() => {
    if (!lastStudiedDate) return false;
    const last = new Date(lastStudiedDate).toDateString();
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return last === today || last === yesterday.toDateString();
  })();

  /** Call this when the user completes a study session */
  const updateStreak = useCallback(() => {
    updateStreakStore();
  }, [updateStreakStore]);

  return {
    streak,
    longestStreak,
    isStreakActive,
    updateStreak,
    hasStudiedToday,
  };
}

export default useStreak;
