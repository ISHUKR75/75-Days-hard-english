// ============================================================
// TOPIC PROGRESS STORE — Per-topic/subtopic accuracy tracking
// Used by Dashboard graphs to show which topics need revision
// Persists to localStorage via Zustand persist middleware
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default stats object for a single topic
const defaultTopicStats = () => ({
  questionsAttempted: 0, // total questions tried
  questionsCorrect:   0, // correct answers count
  questionsWrong:     0, // wrong answers count
  lastAttempted:      null, // ISO date string
  isCompleted:        false, // lesson fully done
  timeSpent:          0, // minutes
});

export const useTopicProgressStore = create(
  persist(
    (set, get) => ({
      // Map of { [topicId]: { questionsAttempted, questionsCorrect, ... } }
      topicStats: {},

      // ── Record a question answer for a specific topic ──────
      recordAnswer: (topicId, isCorrect) => {
        set((state) => {
          const existing = state.topicStats[topicId] || defaultTopicStats();
          return {
            topicStats: {
              ...state.topicStats,
              [topicId]: {
                ...existing,
                questionsAttempted: existing.questionsAttempted + 1,
                questionsCorrect:   existing.questionsCorrect + (isCorrect ? 1 : 0),
                questionsWrong:     existing.questionsWrong   + (isCorrect ? 0 : 1),
                lastAttempted:      new Date().toISOString(),
              },
            },
          };
        });
      },

      // ── Mark a topic as fully completed ───────────────────
      completeTopic: (topicId) => {
        set((state) => {
          const existing = state.topicStats[topicId] || defaultTopicStats();
          return {
            topicStats: {
              ...state.topicStats,
              [topicId]: { ...existing, isCompleted: true },
            },
          };
        });
      },

      // ── Add time spent on a topic ──────────────────────────
      addTimeSpent: (topicId, minutes) => {
        set((state) => {
          const existing = state.topicStats[topicId] || defaultTopicStats();
          return {
            topicStats: {
              ...state.topicStats,
              [topicId]: { ...existing, timeSpent: existing.timeSpent + minutes },
            },
          };
        });
      },

      // ── Get accuracy % for a specific topic ───────────────
      getTopicAccuracy: (topicId) => {
        const stats = get().topicStats[topicId];
        if (!stats || stats.questionsAttempted === 0) return 0;
        return Math.round((stats.questionsCorrect / stats.questionsAttempted) * 100);
      },

      // ── Get all topics sorted by accuracy (weakest first) ──
      getWeakTopics: () => {
        const { topicStats } = get();
        return Object.entries(topicStats)
          .filter(([, s]) => s.questionsAttempted >= 5) // min 5 attempts
          .map(([id, s]) => ({
            id,
            accuracy: Math.round((s.questionsCorrect / s.questionsAttempted) * 100),
            attempted: s.questionsAttempted,
          }))
          .sort((a, b) => a.accuracy - b.accuracy) // weakest first
          .slice(0, 5); // top 5 weakest
      },

      // ── Get overall stats across all topics ───────────────
      getOverallStats: () => {
        const stats = Object.values(get().topicStats);
        const totalAttempted = stats.reduce((s, t) => s + t.questionsAttempted, 0);
        const totalCorrect   = stats.reduce((s, t) => s + t.questionsCorrect, 0);
        const totalWrong     = stats.reduce((s, t) => s + t.questionsWrong, 0);
        const completed      = stats.filter(t => t.isCompleted).length;
        const accuracy       = totalAttempted > 0
          ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
        return { totalAttempted, totalCorrect, totalWrong, completed, accuracy };
      },

      // ── Chart data: topic-wise accuracy for bar chart ─────
      getChartData: () => {
        const { topicStats } = get();
        return Object.entries(topicStats)
          .filter(([, s]) => s.questionsAttempted > 0)
          .map(([id, s]) => ({
            topic: id.replace('day-', 'Day ').replace(/-/g, ' '),
            accuracy: Math.round((s.questionsCorrect / s.questionsAttempted) * 100),
            questions: s.questionsAttempted,
          }))
          .slice(-10); // last 10 topics for chart
      },

      // ── Reset all topic progress ───────────────────────────
      resetAll: () => set({ topicStats: {} }),
    }),
    {
      name: '75days-topic-progress', // localStorage key
      partialize: (state) => ({ topicStats: state.topicStats }),
    }
  )
);
