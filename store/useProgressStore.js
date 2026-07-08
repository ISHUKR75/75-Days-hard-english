import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set) => ({
      // User stats
      xp: 0,
      coins: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,

      // Progress tracking
      completedDays: [], // e.g., ['day-01', 'day-02']
      unlockedDays: ['day-01'], // Starts with day 1 unlocked
      
      // Detailed metrics
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      accuracy: 0,
      
      // Actions
      addXP: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple leveling logic: every 500 XP is a new level
        const newLevel = Math.floor(newXp / 500) + 1;
        return { xp: newXp, level: newLevel };
      }),
      
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      recordAnswer: (isCorrect) => set((state) => {
        const total = state.totalQuestionsAnswered + 1;
        const correct = state.correctAnswers + (isCorrect ? 1 : 0);
        const newAccuracy = Math.round((correct / total) * 100);
        return {
          totalQuestionsAnswered: total,
          correctAnswers: correct,
          accuracy: newAccuracy,
        };
      }),

      completeDay: (dayId) => set((state) => {
        if (!state.completedDays.includes(dayId)) {
          const nextDayNum = parseInt(dayId.split('-')[1]) + 1;
          const nextDayId = `day-${nextDayNum.toString().padStart(2, '0')}`;
          
          return {
            completedDays: [...state.completedDays, dayId],
            unlockedDays: state.unlockedDays.includes(nextDayId) 
              ? state.unlockedDays 
              : [...state.unlockedDays, nextDayId]
          };
        }
        return state;
      }),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        
        if (!state.lastActiveDate) {
          return { streak: 1, lastActiveDate: today };
        }

        if (state.lastActiveDate === today) {
          return state; // Already updated today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastActiveDate === yesterdayStr) {
          // Continuous streak
          return { streak: state.streak + 1, lastActiveDate: today };
        } else {
          // Streak broken
          return { streak: 1, lastActiveDate: today };
        }
      })
    }),
    {
      name: '75-hard-english-progress', // name of the item in the storage (must be unique)
    }
  )
);
