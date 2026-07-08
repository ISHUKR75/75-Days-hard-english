// ============================================================
// Achievement Store — Badges, milestones, and unlockable rewards
// Features: 50+ achievement definitions, unlock tracking,
// progress tracking, sound triggers, celebration effects
// Uses Zustand for state management with localStorage persistence
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Achievement Definitions ─────────────────────────────────
// Each achievement has: id, title, description, emoji, category,
// condition (how to earn it), xpReward
export const ACHIEVEMENTS = [
  // ── Streak Achievements ───────────────────────────────
  { id: 'streak-3',    title: 'Getting Started',     description: '3 day streak! You\'re building a habit.',         emoji: '🔥', category: 'streak',    xpReward: 50,   requirement: { type: 'streak', value: 3 } },
  { id: 'streak-7',    title: 'One Week Warrior',    description: '7 day streak! A full week of learning.',         emoji: '⚡', category: 'streak',    xpReward: 100,  requirement: { type: 'streak', value: 7 } },
  { id: 'streak-14',   title: 'Two Week Champion',   description: '14 day streak! You\'re dedicated.',              emoji: '💪', category: 'streak',    xpReward: 200,  requirement: { type: 'streak', value: 14 } },
  { id: 'streak-30',   title: 'Monthly Master',      description: '30 day streak! Incredible discipline!',          emoji: '🏆', category: 'streak',    xpReward: 500,  requirement: { type: 'streak', value: 30 } },
  { id: 'streak-75',   title: '75 Days Legend',       description: 'Completed the entire 75 Days Hard Challenge!',   emoji: '👑', category: 'streak',    xpReward: 2000, requirement: { type: 'streak', value: 75 } },

  // ── XP Achievements ───────────────────────────────────
  { id: 'xp-100',      title: 'First Hundred',       description: 'Earned 100 XP — great start!',                   emoji: '⭐', category: 'xp',       xpReward: 20,   requirement: { type: 'xp', value: 100 } },
  { id: 'xp-500',      title: 'XP Hunter',           description: 'Earned 500 XP — you\'re on fire!',               emoji: '🌟', category: 'xp',       xpReward: 50,   requirement: { type: 'xp', value: 500 } },
  { id: 'xp-1000',     title: 'XP Master',           description: 'Earned 1,000 XP — unstoppable!',                 emoji: '💫', category: 'xp',       xpReward: 100,  requirement: { type: 'xp', value: 1000 } },
  { id: 'xp-5000',     title: 'XP Legend',            description: 'Earned 5,000 XP — truly dedicated!',             emoji: '🏅', category: 'xp',       xpReward: 250,  requirement: { type: 'xp', value: 5000 } },
  { id: 'xp-10000',    title: 'XP God',              description: 'Earned 10,000 XP — you are the GOAT!',           emoji: '🐐', category: 'xp',       xpReward: 500,  requirement: { type: 'xp', value: 10000 } },

  // ── Practice Achievements ─────────────────────────────
  { id: 'practice-10',  title: 'First Steps',         description: 'Completed 10 practice questions.',               emoji: '📝', category: 'practice', xpReward: 30,   requirement: { type: 'practice', value: 10 } },
  { id: 'practice-50',  title: 'Practice Regular',    description: 'Completed 50 practice questions.',               emoji: '📚', category: 'practice', xpReward: 80,   requirement: { type: 'practice', value: 50 } },
  { id: 'practice-100', title: 'Century Club',        description: 'Completed 100 practice questions!',              emoji: '💯', category: 'practice', xpReward: 150,  requirement: { type: 'practice', value: 100 } },
  { id: 'practice-500', title: 'Practice Pro',        description: 'Completed 500 practice questions!',              emoji: '🎯', category: 'practice', xpReward: 300,  requirement: { type: 'practice', value: 500 } },
  { id: 'practice-1000',title: 'Practice Legend',     description: 'Completed 1,000 practice questions!',            emoji: '🏆', category: 'practice', xpReward: 500,  requirement: { type: 'practice', value: 1000 } },

  // ── Perfect Score Achievements ────────────────────────
  { id: 'perfect-1',    title: 'Perfect!',            description: 'Got a perfect score on a quiz.',                  emoji: '✨', category: 'perfect',  xpReward: 50,   requirement: { type: 'perfectScores', value: 1 } },
  { id: 'perfect-5',    title: 'Perfectionist',       description: '5 perfect scores — you barely make mistakes!',   emoji: '💎', category: 'perfect',  xpReward: 150,  requirement: { type: 'perfectScores', value: 5 } },
  { id: 'perfect-10',   title: 'Flawless',            description: '10 perfect scores — absolute precision!',        emoji: '🎖️', category: 'perfect',  xpReward: 300,  requirement: { type: 'perfectScores', value: 10 } },

  // ── Topic Achievements ────────────────────────────────
  { id: 'topics-5',     title: 'Explorer',            description: 'Completed 5 topics.',                            emoji: '🗺️', category: 'topics',   xpReward: 100,  requirement: { type: 'topicsCompleted', value: 5 } },
  { id: 'topics-15',    title: 'Adventurer',          description: 'Completed 15 topics.',                           emoji: '🧭', category: 'topics',   xpReward: 250,  requirement: { type: 'topicsCompleted', value: 15 } },
  { id: 'topics-30',    title: 'Halfway Hero',        description: 'Completed 30 topics — you\'re halfway there!',   emoji: '🎪', category: 'topics',   xpReward: 500,  requirement: { type: 'topicsCompleted', value: 30 } },
  { id: 'topics-50',    title: 'Marathon Runner',     description: 'Completed 50 topics — almost there!',            emoji: '🏃', category: 'topics',   xpReward: 750,  requirement: { type: 'topicsCompleted', value: 50 } },
  { id: 'topics-75',    title: 'Course Champion',     description: 'Completed all 75 topics — YOU DID IT!',          emoji: '👑', category: 'topics',   xpReward: 2000, requirement: { type: 'topicsCompleted', value: 75 } },

  // ── Vocabulary Achievements ───────────────────────────
  { id: 'vocab-25',     title: 'Word Collector',      description: 'Learned 25 vocabulary words.',                    emoji: '📖', category: 'vocab',    xpReward: 50,   requirement: { type: 'vocabLearned', value: 25 } },
  { id: 'vocab-100',    title: 'Word Scholar',        description: 'Learned 100 vocabulary words.',                   emoji: '📗', category: 'vocab',    xpReward: 150,  requirement: { type: 'vocabLearned', value: 100 } },
  { id: 'vocab-500',    title: 'Walking Dictionary',  description: 'Learned 500 vocabulary words!',                   emoji: '📕', category: 'vocab',    xpReward: 400,  requirement: { type: 'vocabLearned', value: 500 } },
  { id: 'vocab-1000',   title: 'Lexicon Legend',      description: 'Learned 1,000 vocabulary words!',                 emoji: '📘', category: 'vocab',    xpReward: 800,  requirement: { type: 'vocabLearned', value: 1000 } },

  // ── Speed Achievements ────────────────────────────────
  { id: 'speed-fast',   title: 'Speed Demon',         description: 'Completed a quiz in under 2 minutes.',           emoji: '⚡', category: 'speed',    xpReward: 75,   requirement: { type: 'fastQuiz', value: 1 } },
  { id: 'speed-10',     title: 'Lightning Fast',      description: 'Completed 10 quizzes in under 2 minutes each.',  emoji: '🚀', category: 'speed',    xpReward: 200,  requirement: { type: 'fastQuiz', value: 10 } },

  // ── Time Achievements ─────────────────────────────────
  { id: 'time-1h',      title: 'One Hour',            description: 'Spent 1 hour learning — great dedication!',      emoji: '⏰', category: 'time',     xpReward: 50,   requirement: { type: 'totalMinutes', value: 60 } },
  { id: 'time-5h',      title: 'Five Hours',          description: 'Spent 5 hours learning — you\'re committed!',    emoji: '⏱️', category: 'time',     xpReward: 150,  requirement: { type: 'totalMinutes', value: 300 } },
  { id: 'time-24h',     title: 'Full Day',            description: 'Spent 24 hours total learning!',                 emoji: '🕰️', category: 'time',     xpReward: 500,  requirement: { type: 'totalMinutes', value: 1440 } },

  // ── Social Achievements ───────────────────────────────
  { id: 'share-1',      title: 'Sharing is Caring',   description: 'Shared your progress on social media.',          emoji: '📤', category: 'social',   xpReward: 25,   requirement: { type: 'shares', value: 1 } },

  // ── Special Achievements ──────────────────────────────
  { id: 'early-bird',   title: 'Early Bird',          description: 'Practiced before 6 AM — impressive!',            emoji: '🐦', category: 'special',  xpReward: 50,   requirement: { type: 'earlyBird', value: 1 } },
  { id: 'night-owl',    title: 'Night Owl',           description: 'Practiced after 11 PM — burning the midnight oil.', emoji: '🦉', category: 'special',  xpReward: 50,   requirement: { type: 'nightOwl', value: 1 } },
  { id: 'weekend-warrior', title: 'Weekend Warrior',  description: 'Practiced on both Saturday and Sunday.',          emoji: '🗓️', category: 'special',  xpReward: 75,   requirement: { type: 'weekendWarrior', value: 1 } },
];

// ── Achievement Store ───────────────────────────────────────
const useAchievementStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────
      unlockedAchievements: [],   // Array of achievement IDs that are unlocked
      recentUnlock: null,         // Most recently unlocked achievement (for toast)
      totalAchievementXP: 0,     // Total XP earned from achievements

      // Counters for tracking achievement progress
      counters: {
        streak: 0,
        xp: 0,
        practice: 0,
        perfectScores: 0,
        topicsCompleted: 0,
        vocabLearned: 0,
        fastQuiz: 0,
        totalMinutes: 0,
        shares: 0,
        earlyBird: 0,
        nightOwl: 0,
        weekendWarrior: 0,
      },

      // ── Actions ────────────────────────────────────────

      // Update a counter and check if any achievements are unlocked
      updateCounter: (counterName, value) => {
        const state = get();
        const newCounters = { ...state.counters, [counterName]: value };
        
        // Check all achievements for this counter
        const newUnlocks = [];
        ACHIEVEMENTS.forEach((achievement) => {
          // Skip already unlocked
          if (state.unlockedAchievements.includes(achievement.id)) return;

          // Check if requirement is met
          const req = achievement.requirement;
          if (req.type === counterName && newCounters[counterName] >= req.value) {
            newUnlocks.push(achievement);
          }
        });

        // Apply unlocks
        if (newUnlocks.length > 0) {
          const newIds = newUnlocks.map((a) => a.id);
          const newXP = newUnlocks.reduce((sum, a) => sum + a.xpReward, 0);

          set({
            counters: newCounters,
            unlockedAchievements: [...state.unlockedAchievements, ...newIds],
            recentUnlock: newUnlocks[newUnlocks.length - 1], // Show last unlocked
            totalAchievementXP: state.totalAchievementXP + newXP,
          });

          // Play achievement sound
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: 'levelup' } }));
          }
        } else {
          set({ counters: newCounters });
        }
      },

      // Increment a counter by a given amount
      incrementCounter: (counterName, amount = 1) => {
        const state = get();
        const newValue = (state.counters[counterName] || 0) + amount;
        state.updateCounter(counterName, newValue);
      },

      // Clear the recent unlock toast
      clearRecentUnlock: () => set({ recentUnlock: null }),

      // Check if a specific achievement is unlocked
      isUnlocked: (achievementId) => {
        return get().unlockedAchievements.includes(achievementId);
      },

      // Get progress percentage for an achievement
      getProgress: (achievementId) => {
        const state = get();
        const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
        if (!achievement) return 0;
        if (state.unlockedAchievements.includes(achievementId)) return 100;
        const current = state.counters[achievement.requirement.type] || 0;
        return Math.min(100, Math.round((current / achievement.requirement.value) * 100));
      },

      // Get all achievements organized by category
      getByCategory: () => {
        const categories = {};
        ACHIEVEMENTS.forEach((a) => {
          if (!categories[a.category]) categories[a.category] = [];
          categories[a.category].push(a);
        });
        return categories;
      },
    }),
    {
      name: '75days-achievement-store', // localStorage key
    }
  )
);

export default useAchievementStore;
