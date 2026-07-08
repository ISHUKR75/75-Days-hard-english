// ============================================================
// Streak Store — Tracks daily learning streaks
// Features: Current streak, longest streak, streak freeze,
// calendar heatmap data, daily goals
// Uses Zustand for state management with localStorage persistence
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper: Get today's date as YYYY-MM-DD string
const getToday = () => new Date().toISOString().split('T')[0];

// Helper: Get yesterday's date as YYYY-MM-DD string
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

// ── Streak Store ────────────────────────────────────────────
const useStreakStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────
      currentStreak: 0,          // How many consecutive days
      longestStreak: 0,          // All-time best streak
      lastActiveDate: null,      // Last date the user was active
      streakFreezes: 2,          // Available streak freezes
      totalDaysActive: 0,        // Total unique days of activity
      activeDates: [],           // Array of YYYY-MM-DD strings for heatmap
      dailyGoalMinutes: 15,      // Daily goal in minutes
      todayMinutes: 0,           // Minutes spent learning today
      todayGoalMet: false,       // Whether today's goal was met

      // ── Actions ────────────────────────────────────────

      // Record today's activity — called whenever user completes any exercise
      recordActivity: () => {
        const today = getToday();
        const state = get();

        // If already recorded today, skip
        if (state.lastActiveDate === today) return;

        const yesterday = getYesterday();
        let newStreak = state.currentStreak;

        // Check streak continuity
        if (state.lastActiveDate === yesterday) {
          // Consecutive day — increment streak
          newStreak = state.currentStreak + 1;
        } else if (state.lastActiveDate === null) {
          // First ever activity
          newStreak = 1;
        } else {
          // Streak broken — check if freeze is available
          if (state.streakFreezes > 0) {
            // Use a freeze to maintain streak
            newStreak = state.currentStreak + 1;
            set({ streakFreezes: state.streakFreezes - 1 });
          } else {
            // Streak reset to 1
            newStreak = 1;
          }
        }

        // Update all state
        set({
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.longestStreak),
          lastActiveDate: today,
          totalDaysActive: state.totalDaysActive + 1,
          activeDates: [...state.activeDates.slice(-365), today], // Keep last 365 days
        });
      },

      // Add minutes of learning time for today
      addMinutes: (minutes) => {
        const state = get();
        const newMinutes = state.todayMinutes + minutes;
        set({
          todayMinutes: newMinutes,
          todayGoalMet: newMinutes >= state.dailyGoalMinutes,
        });
      },

      // Set daily goal in minutes
      setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),

      // Add a streak freeze (earned from achievements)
      addStreakFreeze: () => set((s) => ({ streakFreezes: Math.min(s.streakFreezes + 1, 5) })),

      // Reset today's progress (called at midnight)
      resetToday: () => set({ todayMinutes: 0, todayGoalMet: false }),

      // Get streak status info
      getStreakStatus: () => {
        const state = get();
        const today = getToday();
        const isActiveToday = state.lastActiveDate === today;
        const isStreakAtRisk = !isActiveToday && state.currentStreak > 0;
        return { isActiveToday, isStreakAtRisk };
      },
    }),
    {
      name: '75days-streak-store', // localStorage key
    }
  )
);

export default useStreakStore;
