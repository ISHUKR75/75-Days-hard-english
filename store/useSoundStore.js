/**
 * Sound Store - Manages sound/audio settings across the app
 * Uses Zustand with localStorage persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useSoundStore = create(
  persist(
    (set, get) => ({
      // ─── Global sound toggle ──────────────────────────────────
      /** Whether all sounds are muted */
      muted: false,
      /** Master volume level 0–1 */
      volume: 0.6,
      /** Whether sound is globally enabled */
      soundEnabled: true,

      // ─── Per-category sound toggles ───────────────────────────
      /** Sound enabled per category */
      categories: {
        correct:     true,  // Correct answer sound
        wrong:       true,  // Wrong answer sound
        levelUp:     true,  // Level up fanfare
        achievement: true,  // Achievement unlock
        coin:        true,  // Coin earned
        click:       true,  // UI click/tap sounds
        notification:true,  // Push notification chime
        background:  false, // Background music
      },

      // ─── Actions ──────────────────────────────────────────────

      /** Toggle all sounds on/off */
      toggleMute: () => set((state) => ({ muted: !state.muted })),

      /** Set the master volume (0–1) */
      setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),

      /** Enable or disable all sounds */
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      /** Toggle a specific sound category */
      toggleCategory: (category) =>
        set((state) => ({
          categories: {
            ...state.categories,
            [category]: !state.categories[category],
          },
        })),

      /** Set a specific sound category enabled/disabled */
      setCategoryEnabled: (category, enabled) =>
        set((state) => ({
          categories: { ...state.categories, [category]: enabled },
        })),

      /**
       * Check if a specific sound category should play
       * (considers global mute + soundEnabled + category toggle)
       */
      canPlay: (category = 'correct') => {
        const { muted, soundEnabled, categories } = get();
        if (muted || !soundEnabled) return false;
        return categories[category] !== false;
      },

      /** Reset to defaults */
      reset: () =>
        set({
          muted: false,
          volume: 0.6,
          soundEnabled: true,
          categories: {
            correct: true, wrong: true, levelUp: true,
            achievement: true, coin: true, click: true,
            notification: true, background: false,
          },
        }),
    }),
    {
      name: 'sound-store',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
);

export default useSoundStore;
