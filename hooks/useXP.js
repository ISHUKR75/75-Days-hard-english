/**
 * useXP - XP and level management hook
 * Wraps useUserStore's XP actions with toast notifications
 */
import { useCallback } from 'react';
import useUserStore from '@/store/userStore';

export function useXP() {
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const levelXP = useUserStore((s) => s.levelXP);
  const levelXPRequired = useUserStore((s) => s.levelXPRequired);
  const addXPStore = useUserStore((s) => s.addXP);

  /** Progress percentage within the current level (0–100) */
  const levelProgress = levelXPRequired > 0
    ? Math.min(100, Math.floor((levelXP / levelXPRequired) * 100))
    : 0;

  /** XP still needed to reach the next level */
  const nextLevelXP = Math.max(0, levelXPRequired - levelXP);

  /**
   * Add XP with optional toast notification
   * @param {number} amount
   * @param {object} options - { silent: boolean, label: string }
   */
  const addXP = useCallback(
    (amount, options = {}) => {
      if (amount <= 0) return;
      addXPStore(amount);

      if (!options.silent && typeof window !== 'undefined') {
        // Fire a custom event so any toast listener can pick it up
        window.dispatchEvent(
          new CustomEvent('xp-gained', {
            detail: { amount, label: options.label || `+${amount} XP` },
          })
        );
      }
    },
    [addXPStore]
  );

  return {
    xp,
    level,
    levelXP,
    levelXPRequired,
    addXP,
    levelProgress,
    nextLevelXP,
  };
}

export default useXP;
