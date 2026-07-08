// ============================================================
// GAMIFICATION STORE - XP, Coins, Levels, Badges, Streaks
// Complete gamification system with persistent storage
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

// ============================================================
// XP RULES & CONSTANTS
// ============================================================
const XP_RULES = {
  CORRECT_ANSWER_BASE: 10,
  PERFECT_SCORE_BONUS: 50,
  FIRST_TRY_BONUS: 5,
  SPEED_BONUS_FAST: 10,      // < 5 seconds
  SPEED_BONUS_NORMAL: 5,     // < 10 seconds
  STREAK_MULTIPLIER: 1.5,    // 50% bonus when streak active
  HARD_QUESTION_MULTIPLIER: 2,
  MEDIUM_QUESTION_MULTIPLIER: 1.5,
  LEVEL_UP_REQUIREMENT: 100  // XP needed per level
};

const COIN_RULES = {
  DAILY_LOGIN: 10,
  LESSON_COMPLETE: 20,
  TOPIC_COMPLETE: 50,
  TEST_PASS: 30,
  PERFECT_SCORE: 100,
  STREAK_MILESTONE_7: 50,
  STREAK_MILESTONE_30: 200,
  STREAK_MILESTONE_100: 500,
  LEVEL_UP: 25
};

const BADGE_DEFINITIONS = [
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎓',
    requirement: { type: 'lessons_completed', value: 1 }
  },
  {
    id: 'streak_7',
    name: '7-Day Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'streak_30',
    name: '30-Day Champion',
    description: 'Maintain a 30-day learning streak',
    icon: '⭐',
    requirement: { type: 'streak', value: 30 }
  },
  {
    id: 'streak_100',
    name: '100-Day Legend',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    requirement: { type: 'streak', value: 100 }
  },
  {
    id: 'questions_100',
    name: 'Century',
    description: 'Answer 100 questions correctly',
    icon: '💯',
    requirement: { type: 'correct_answers', value: 100 }
  },
  {
    id: 'questions_500',
    name: 'Half Thousand',
    description: 'Answer 500 questions correctly',
    icon: '🎯',
    requirement: { type: 'correct_answers', value: 500 }
  },
  {
    id: 'questions_1000',
    name: 'Master Solver',
    description: 'Answer 1000 questions correctly',
    icon: '🏆',
    requirement: { type: 'correct_answers', value: 1000 }
  },
  {
    id: 'grammar_master',
    name: 'Grammar Master',
    description: 'Complete all grammar topics',
    icon: '📖',
    requirement: { type: 'category_complete', value: 'grammar' }
  },
  {
    id: 'vocab_guru',
    name: 'Vocabulary Guru',
    description: 'Learn 1000 new words',
    icon: '📚',
    requirement: { type: 'vocabulary_learned', value: 1000 }
  },
  {
    id: 'speaking_champion',
    name: 'Speaking Champion',
    description: 'Complete all speaking exercises',
    icon: '🎤',
    requirement: { type: 'category_complete', value: 'speaking' }
  },
  {
    id: 'writing_expert',
    name: 'Writing Expert',
    description: 'Complete all writing exercises',
    icon: '✍️',
    requirement: { type: 'category_complete', value: 'writing' }
  },
  {
    id: 'perfect_test',
    name: 'Perfectionist',
    description: 'Score 100% on any test',
    icon: '💎',
    requirement: { type: 'perfect_test', value: 1 }
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Answer 10 questions in under 30 seconds',
    icon: '⚡',
    requirement: { type: 'speed_questions', value: 10 }
  },
  {
    id: 'level_10',
    name: 'Rising Star',
    description: 'Reach level 10',
    icon: '🌟',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'level_25',
    name: 'Expert Learner',
    description: 'Reach level 25',
    icon: '🎖️',
    requirement: { type: 'level', value: 25 }
  },
  {
    id: 'level_50',
    name: 'Grand Master',
    description: 'Reach level 50',
    icon: '👑',
    requirement: { type: 'level', value: 50 }
  },
  {
    id: 'course_complete',
    name: '75-Day Graduate',
    description: 'Complete the entire 75-day course',
    icon: '🎓',
    requirement: { type: 'days_completed', value: 75 }
  }
];

// ============================================================
// GAMIFICATION STORE
// ============================================================
export const useGamificationStore = create(
  persist(
    (set, get) => ({
      // ========================================================
      // STATE
      // ========================================================
      xp: 0,
      level: 1,
      coins: 0,
      streak: 0,
      lastActiveDate: null,
      totalQuestionsAttempted: 0,
      totalQuestionsCorrect: 0,
      lessonsCompleted: 0,
      topicsCompleted: 0,
      testsCompleted: 0,
      perfectScores: 0,
      badges: [], // Array of unlocked badge IDs
      achievements: [], // Array of achievement objects
      stats: {
        fastestAnswer: null,
        longestStreak: 0,
        totalTimeSpent: 0, // in minutes
        vocabularyLearned: 0,
        categoriesCompleted: {
          grammar: 0,
          vocabulary: 0,
          speaking: 0,
          writing: 0,
          listening: 0,
          reading: 0
        }
      },

      // ========================================================
      // XP & LEVELING ACTIONS
      // ========================================================
      
      /**
       * Add XP and handle level-ups
       * @param {number} amount - Base XP amount
       * @param {object} options - Additional options (difficulty, speed, etc.)
       */
      addXP: (amount, options = {}) => {
        const state = get();
        let finalXP = amount;

        // Apply difficulty multiplier
        if (options.difficulty === 'hard') {
          finalXP *= XP_RULES.HARD_QUESTION_MULTIPLIER;
        } else if (options.difficulty === 'medium') {
          finalXP *= XP_RULES.MEDIUM_QUESTION_MULTIPLIER;
        }

        // Apply streak multiplier
        if (state.streak >= 7) {
          finalXP *= XP_RULES.STREAK_MULTIPLIER;
        }

        // Apply speed bonus
        if (options.answerTime) {
          if (options.answerTime < 5) {
            finalXP += XP_RULES.SPEED_BONUS_FAST;
          } else if (options.answerTime < 10) {
            finalXP += XP_RULES.SPEED_BONUS_NORMAL;
          }
        }

        // First try bonus
        if (options.firstTry) {
          finalXP += XP_RULES.FIRST_TRY_BONUS;
        }

        const newXP = state.xp + Math.round(finalXP);
        const newLevel = Math.floor(newXP / XP_RULES.LEVEL_UP_REQUIREMENT) + 1;

        // Check if leveled up
        if (newLevel > state.level) {
          get().handleLevelUp(newLevel);
          get().addCoins(COIN_RULES.LEVEL_UP);
        }

        set({ xp: newXP, level: newLevel });
        return Math.round(finalXP);
      },

      /**
       * Handle level up with celebration
       */
      handleLevelUp: (newLevel) => {
        // Trigger confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#d946ef', '#10b981']
        });

        // Play sound (will be handled by sound provider)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('play-sound', { 
            detail: { sound: 'levelUp' } 
          }));
        }

        // Check for level-based badges
        get().checkBadges();

        // Show notification
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('show-notification', {
            detail: {
              type: 'success',
              title: `Level ${newLevel}!`,
              message: `You've reached level ${newLevel}! Keep learning!`
            }
          }));
        }
      },

      // ========================================================
      // COINS ACTIONS
      // ========================================================
      
      /**
       * Add coins
       */
      addCoins: (amount, reason) => {
        const state = get();
        set({ coins: state.coins + amount });

        // Play coin sound
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('play-sound', { 
            detail: { sound: 'coin' } 
          }));
        }

        return amount;
      },

      /**
       * Spend coins
       */
      spendCoins: (amount) => {
        const state = get();
        if (state.coins >= amount) {
          set({ coins: state.coins - amount });
          return true;
        }
        return false;
      },

      // ========================================================
      // STREAK ACTIONS
      // ========================================================
      
      /**
       * Update streak (call daily)
       */
      updateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        const lastActive = state.lastActiveDate 
          ? new Date(state.lastActiveDate).toDateString() 
          : null;

        // Same day - no change
        if (lastActive === today) {
          return state.streak;
        }

        // Yesterday - increment streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastActive === yesterday.toDateString()) {
          const newStreak = state.streak + 1;
          set({ 
            streak: newStreak, 
            lastActiveDate: new Date().toISOString() 
          });

          // Update longest streak
          if (newStreak > state.stats.longestStreak) {
            set({
              stats: {
                ...state.stats,
                longestStreak: newStreak
              }
            });
          }

          // Check for streak milestones
          if (newStreak === 7) {
            get().addCoins(COIN_RULES.STREAK_MILESTONE_7, '7-day streak');
          } else if (newStreak === 30) {
            get().addCoins(COIN_RULES.STREAK_MILESTONE_30, '30-day streak');
          } else if (newStreak === 100) {
            get().addCoins(COIN_RULES.STREAK_MILESTONE_100, '100-day streak');
          }

          get().checkBadges();

          return newStreak;
        }

        // Streak broken - reset to 1
        set({ 
          streak: 1, 
          lastActiveDate: new Date().toISOString() 
        });
        return 1;
      },

      /**
       * Reset streak (when user breaks it)
       */
      breakStreak: () => {
        set({ streak: 0 });
      },

      // ========================================================
      // QUESTION TRACKING
      // ========================================================
      
      /**
       * Record a question attempt
       */
      recordQuestion: (isCorrect, options = {}) => {
        const state = get();
        
        set({
          totalQuestionsAttempted: state.totalQuestionsAttempted + 1,
          totalQuestionsCorrect: isCorrect 
            ? state.totalQuestionsCorrect + 1 
            : state.totalQuestionsCorrect
        });

        // Award XP for correct answer
        if (isCorrect) {
          const xpGained = get().addXP(XP_RULES.CORRECT_ANSWER_BASE, options);
          
          // Play success sound
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('play-sound', { 
              detail: { sound: 'correct' } 
            }));
          }

          return { success: true, xpGained };
        } else {
          // Play error sound
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('play-sound', { 
              detail: { sound: 'wrong' } 
            }));
          }

          return { success: false, xpGained: 0 };
        }
      },

      /**
       * Record lesson completion
       */
      completeLesson: () => {
        const state = get();
        set({ lessonsCompleted: state.lessonsCompleted + 1 });
        get().addCoins(COIN_RULES.LESSON_COMPLETE, 'Lesson completed');
        get().checkBadges();
      },

      /**
       * Record topic completion
       */
      completeTopic: (category) => {
        const state = get();
        set({ topicsCompleted: state.topicsCompleted + 1 });
        get().addCoins(COIN_RULES.TOPIC_COMPLETE, 'Topic completed');
        
        // Update category stats
        if (category && state.stats.categoriesCompleted[category] !== undefined) {
          set({
            stats: {
              ...state.stats,
              categoriesCompleted: {
                ...state.stats.categoriesCompleted,
                [category]: state.stats.categoriesCompleted[category] + 1
              }
            }
          });
        }

        get().checkBadges();
      },

      /**
       * Record test completion
       */
      completeTest: (score) => {
        const state = get();
        set({ testsCompleted: state.testsCompleted + 1 });
        get().addCoins(COIN_RULES.TEST_PASS, 'Test completed');

        // Perfect score
        if (score === 100) {
          set({ perfectScores: state.perfectScores + 1 });
          get().addCoins(COIN_RULES.PERFECT_SCORE, 'Perfect score!');
          
          // Celebration
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 }
          });

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('play-sound', { 
              detail: { sound: 'perfectScore' } 
            }));
          }
        }

        get().checkBadges();
      },

      // ========================================================
      // BADGES & ACHIEVEMENTS
      // ========================================================
      
      /**
       * Check and unlock badges
       */
      checkBadges: () => {
        const state = get();
        const newlyUnlocked = [];

        BADGE_DEFINITIONS.forEach(badge => {
          // Skip if already unlocked
          if (state.badges.includes(badge.id)) return;

          let shouldUnlock = false;

          // Check requirement
          switch (badge.requirement.type) {
            case 'lessons_completed':
              shouldUnlock = state.lessonsCompleted >= badge.requirement.value;
              break;
            case 'streak':
              shouldUnlock = state.streak >= badge.requirement.value;
              break;
            case 'correct_answers':
              shouldUnlock = state.totalQuestionsCorrect >= badge.requirement.value;
              break;
            case 'vocabulary_learned':
              shouldUnlock = state.stats.vocabularyLearned >= badge.requirement.value;
              break;
            case 'level':
              shouldUnlock = state.level >= badge.requirement.value;
              break;
            case 'days_completed':
              shouldUnlock = state.topicsCompleted >= badge.requirement.value;
              break;
            case 'perfect_test':
              shouldUnlock = state.perfectScores >= badge.requirement.value;
              break;
            case 'category_complete':
              // This would need more complex logic based on total topics per category
              break;
            default:
              break;
          }

          if (shouldUnlock) {
            newlyUnlocked.push(badge);
          }
        });

        // Unlock new badges
        if (newlyUnlocked.length > 0) {
          set({
            badges: [...state.badges, ...newlyUnlocked.map(b => b.id)],
            achievements: [...state.achievements, ...newlyUnlocked.map(b => ({
              ...b,
              unlockedAt: new Date().toISOString()
            }))]
          });

          // Show badge notification
          newlyUnlocked.forEach(badge => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('show-notification', {
                detail: {
                  type: 'badge',
                  badge: badge,
                  title: `${badge.icon} Badge Unlocked!`,
                  message: badge.name
                }
              }));

              window.dispatchEvent(new CustomEvent('play-sound', { 
                detail: { sound: 'badge' } 
              }));
            }
          });
        }
      },

      /**
       * Get all badges (unlocked + locked)
       */
      getAllBadges: () => {
        const state = get();
        return BADGE_DEFINITIONS.map(badge => ({
          ...badge,
          unlocked: state.badges.includes(badge.id),
          unlockedAt: state.achievements.find(a => a.id === badge.id)?.unlockedAt || null
        }));
      },

      // ========================================================
      // STATS ACTIONS
      // ========================================================
      
      /**
       * Record vocabulary learned
       */
      recordVocabulary: (count = 1) => {
        const state = get();
        set({
          stats: {
            ...state.stats,
            vocabularyLearned: state.stats.vocabularyLearned + count
          }
        });
        get().checkBadges();
      },

      /**
       * Record time spent (in minutes)
       */
      recordTimeSpent: (minutes) => {
        const state = get();
        set({
          stats: {
            ...state.stats,
            totalTimeSpent: state.stats.totalTimeSpent + minutes
          }
        });
      },

      // ========================================================
      // UTILITY ACTIONS
      // ========================================================
      
      /**
       * Get accuracy percentage
       */
      getAccuracy: () => {
        const state = get();
        if (state.totalQuestionsAttempted === 0) return 0;
        return Math.round(
          (state.totalQuestionsCorrect / state.totalQuestionsAttempted) * 100
        );
      },

      /**
       * Get XP progress to next level
       */
      getXPProgress: () => {
        const state = get();
        const currentLevelXP = (state.level - 1) * XP_RULES.LEVEL_UP_REQUIREMENT;
        const nextLevelXP = state.level * XP_RULES.LEVEL_UP_REQUIREMENT;
        const progress = state.xp - currentLevelXP;
        const required = nextLevelXP - currentLevelXP;
        return {
          current: progress,
          required: required,
          percentage: Math.round((progress / required) * 100)
        };
      },

      /**
       * Reset all progress (for testing or user request)
       */
      resetProgress: () => {
        set({
          xp: 0,
          level: 1,
          coins: 0,
          streak: 0,
          lastActiveDate: null,
          totalQuestionsAttempted: 0,
          totalQuestionsCorrect: 0,
          lessonsCompleted: 0,
          topicsCompleted: 0,
          testsCompleted: 0,
          perfectScores: 0,
          badges: [],
          achievements: [],
          stats: {
            fastestAnswer: null,
            longestStreak: 0,
            totalTimeSpent: 0,
            vocabularyLearned: 0,
            categoriesCompleted: {
              grammar: 0,
              vocabulary: 0,
              speaking: 0,
              writing: 0,
              listening: 0,
              reading: 0
            }
          }
        });
      }
    }),
    {
      name: '75days-gamification', // LocalStorage key
      partialize: (state) => ({
        // Only persist certain fields
        xp: state.xp,
        level: state.level,
        coins: state.coins,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        totalQuestionsAttempted: state.totalQuestionsAttempted,
        totalQuestionsCorrect: state.totalQuestionsCorrect,
        lessonsCompleted: state.lessonsCompleted,
        topicsCompleted: state.topicsCompleted,
        testsCompleted: state.testsCompleted,
        perfectScores: state.perfectScores,
        badges: state.badges,
        achievements: state.achievements,
        stats: state.stats
      })
    }
  )
);

// Export rules for external use
export { XP_RULES, COIN_RULES, BADGE_DEFINITIONS };
