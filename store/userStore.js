// User Store - Manages user data, XP, coins, streaks, and gamification state
// Uses Zustand for lightweight, fast state management

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================
// Initial State
// ============================================================
const INITIAL_STATE = {
  // User profile
  user: {
    id: 'user-1',
    name: 'Student',
    email: '',
    avatar: null,
    joinedAt: new Date().toISOString(),
    cefrLevel: 'A1', // A0, A1, A2, B1, B2, C1, C2
  },

  // Gamification stats
  xp: 0,                // Experience points
  coins: 0,             // Virtual coins
  diamonds: 0,          // Premium currency
  level: 1,             // Current level (1-100)
  levelXP: 0,           // XP within current level
  levelXPRequired: 100, // XP needed for next level
  streak: 0,            // Day streak
  longestStreak: 0,     // Best streak ever
  lastStudiedDate: null, // ISO date string

  // Learning progress
  totalTopicsCompleted: 0,
  totalLessonsCompleted: 0,
  totalQuestionsAttempted: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  totalWordsLearned: 0,
  totalTimeSpent: 0, // in minutes

  // Badges and achievements
  badges: [],
  achievements: [],

  // Daily goals
  dailyGoal: 30,    // minutes per day
  dailyProgress: 0, // minutes today

  // Settings
  settings: {
    soundEnabled: true,
    notificationsEnabled: true,
    darkMode: true,
    language: 'hi', // hi = Hindi, en = English
    reminderTime: '20:00',
  },
};

// ============================================================
// XP Required for Each Level
// ============================================================
const getXPForLevel = (level) => {
  // XP scales: level 1→2 = 100 XP, doubles roughly every 10 levels
  return Math.floor(100 * Math.pow(1.15, level - 1));
};

// ============================================================
// Zustand Store
// ============================================================
const useUserStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      // --------------------------------------------------------
      // Update user profile
      // --------------------------------------------------------
      updateProfile: (profileData) => {
        set((state) => ({
          user: { ...state.user, ...profileData },
        }));
      },

      // --------------------------------------------------------
      // Add XP and handle level up
      // --------------------------------------------------------
      addXP: (amount) => {
        set((state) => {
          let newXP = state.xp + amount;
          let newLevelXP = state.levelXP + amount;
          let newLevel = state.level;
          let newLevelXPRequired = state.levelXPRequired;
          let levelsGained = 0;

          // Check for level up
          while (newLevelXP >= newLevelXPRequired) {
            newLevelXP -= newLevelXPRequired;
            newLevel++;
            newLevelXPRequired = getXPForLevel(newLevel);
            levelsGained++;
          }

          return {
            xp: newXP,
            level: newLevel,
            levelXP: newLevelXP,
            levelXPRequired: newLevelXPRequired,
            // Store level up flag so components can show animation
            _justLeveledUp: levelsGained > 0,
            _levelsGained: levelsGained,
          };
        });
      },

      // --------------------------------------------------------
      // Add coins
      // --------------------------------------------------------
      addCoins: (amount) => {
        set((state) => ({ coins: state.coins + amount }));
      },

      // --------------------------------------------------------
      // Spend coins
      // --------------------------------------------------------
      spendCoins: (amount) => {
        set((state) => ({
          coins: Math.max(0, state.coins - amount),
        }));
      },

      // --------------------------------------------------------
      // Add diamonds
      // --------------------------------------------------------
      addDiamonds: (amount) => {
        set((state) => ({ diamonds: state.diamonds + amount }));
      },

      // --------------------------------------------------------
      // Update daily streak
      // --------------------------------------------------------
      updateStreak: () => {
        set((state) => {
          const today = new Date().toDateString();
          const lastStudied = state.lastStudiedDate
            ? new Date(state.lastStudiedDate).toDateString()
            : null;

          // If already studied today, don't update
          if (lastStudied === today) return {};

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();

          // Check if studied yesterday (maintain streak)
          const newStreak = lastStudied === yesterdayStr
            ? state.streak + 1
            : 1; // Reset streak if missed a day

          return {
            streak: newStreak,
            longestStreak: Math.max(newStreak, state.longestStreak),
            lastStudiedDate: new Date().toISOString(),
          };
        });
      },

      // --------------------------------------------------------
      // Record question answer
      // --------------------------------------------------------
      recordAnswer: (isCorrect) => {
        set((state) => ({
          totalQuestionsAttempted: state.totalQuestionsAttempted + 1,
          totalCorrectAnswers: isCorrect
            ? state.totalCorrectAnswers + 1
            : state.totalCorrectAnswers,
          totalWrongAnswers: !isCorrect
            ? state.totalWrongAnswers + 1
            : state.totalWrongAnswers,
        }));

        // Award XP and coins for correct answers
        if (isCorrect) {
          get().addXP(5);
          get().addCoins(1);
        }
      },

      // --------------------------------------------------------
      // Add a badge
      // --------------------------------------------------------
      addBadge: (badge) => {
        set((state) => {
          const alreadyHas = state.badges.some((b) => b.id === badge.id);
          if (alreadyHas) return {};
          return { badges: [...state.badges, { ...badge, earnedAt: new Date().toISOString() }] };
        });
      },

      // --------------------------------------------------------
      // Add an achievement
      // --------------------------------------------------------
      addAchievement: (achievement) => {
        set((state) => {
          const alreadyHas = state.achievements.some((a) => a.id === achievement.id);
          if (alreadyHas) return {};
          return {
            achievements: [
              ...state.achievements,
              { ...achievement, unlockedAt: new Date().toISOString() },
            ],
          };
        });
      },

      // --------------------------------------------------------
      // Update learning progress
      // --------------------------------------------------------
      completeLesson: () => {
        set((state) => ({
          totalLessonsCompleted: state.totalLessonsCompleted + 1,
        }));
        get().addXP(20);
        get().addCoins(5);
        get().updateStreak();
      },

      completeTopic: () => {
        set((state) => ({
          totalTopicsCompleted: state.totalTopicsCompleted + 1,
        }));
        get().addXP(100);
        get().addCoins(25);
        get().addDiamonds(1);
      },

      addWordsLearned: (count) => {
        set((state) => ({
          totalWordsLearned: state.totalWordsLearned + count,
        }));
      },

      addTimeSpent: (minutes) => {
        set((state) => ({
          totalTimeSpent: state.totalTimeSpent + minutes,
          dailyProgress: state.dailyProgress + minutes,
        }));
      },

      // --------------------------------------------------------
      // Update settings
      // --------------------------------------------------------
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // --------------------------------------------------------
      // Computed values
      // --------------------------------------------------------
      getAccuracy: () => {
        const { totalQuestionsAttempted, totalCorrectAnswers } = get();
        if (totalQuestionsAttempted === 0) return 0;
        return Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100);
      },

      getLevelProgress: () => {
        const { levelXP, levelXPRequired } = get();
        if (levelXPRequired === 0) return 0;
        return Math.round((levelXP / levelXPRequired) * 100);
      },

      getDailyGoalProgress: () => {
        const { dailyProgress, dailyGoal } = get();
        return Math.min(100, Math.round((dailyProgress / dailyGoal) * 100));
      },

      // --------------------------------------------------------
      // Reset daily progress (call at midnight)
      // --------------------------------------------------------
      resetDailyProgress: () => {
        set({ dailyProgress: 0 });
      },

      // --------------------------------------------------------
      // Reset all data (for testing or new user)
      // --------------------------------------------------------
      resetAll: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      // Persist to localStorage
      name: '75-days-english-user',
      storage: createJSONStorage(() => localStorage),
      // Only persist these keys
      partialize: (state) => ({
        user: state.user,
        xp: state.xp,
        coins: state.coins,
        diamonds: state.diamonds,
        level: state.level,
        levelXP: state.levelXP,
        levelXPRequired: state.levelXPRequired,
        streak: state.streak,
        longestStreak: state.longestStreak,
        lastStudiedDate: state.lastStudiedDate,
        totalTopicsCompleted: state.totalTopicsCompleted,
        totalLessonsCompleted: state.totalLessonsCompleted,
        totalQuestionsAttempted: state.totalQuestionsAttempted,
        totalCorrectAnswers: state.totalCorrectAnswers,
        totalWrongAnswers: state.totalWrongAnswers,
        totalWordsLearned: state.totalWordsLearned,
        totalTimeSpent: state.totalTimeSpent,
        badges: state.badges,
        achievements: state.achievements,
        dailyGoal: state.dailyGoal,
        dailyProgress: state.dailyProgress,
        settings: state.settings,
      }),
    }
  )
);

export default useUserStore;
