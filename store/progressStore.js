// Progress Store - Tracks learning progress per topic, subtopic, and lesson
// Updated: Added recordQuestionResult, recordDailyActivity

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set, get) => ({
      // --------------------------------------------------------
      // Topic progress map: { topicId: { completed, startedAt, completedAt, score } }
      // --------------------------------------------------------
      topics: {},

      // --------------------------------------------------------
      // Subtopic progress map
      // --------------------------------------------------------
      subtopics: {},

      // --------------------------------------------------------
      // Lesson progress map
      // --------------------------------------------------------
      lessons: {},

      // --------------------------------------------------------
      // Question history: { questionId: { correct, attempts, lastAttemptedAt } }
      // --------------------------------------------------------
      questionHistory: {},

      // --------------------------------------------------------
      // Daily activity: { 'YYYY-MM-DD': { questionsAttempted, questionsCorrect, timeSpent, xpEarned } }
      // --------------------------------------------------------
      dailyActivity: {},

      // --------------------------------------------------------
      // Vocabulary mastery
      // --------------------------------------------------------
      vocabulary: {},

      // --------------------------------------------------------
      // Current session
      // --------------------------------------------------------
      currentSession: null,

      // --------------------------------------------------------
      // Mark topic as started
      // --------------------------------------------------------
      startTopic: (topicId) => {
        set((state) => ({
          topics: {
            ...state.topics,
            [topicId]: {
              ...state.topics[topicId],
              started: true,
              startedAt: state.topics[topicId]?.startedAt || new Date().toISOString(),
            },
          },
        }));
      },

      // --------------------------------------------------------
      // Mark topic as completed
      // --------------------------------------------------------
      completeTopic: (topicId, score) => {
        set((state) => ({
          topics: {
            ...state.topics,
            [topicId]: {
              ...state.topics[topicId],
              completed: true,
              completedAt: new Date().toISOString(),
              score: score ?? state.topics[topicId]?.score ?? 0,
            },
          },
        }));
      },

      // --------------------------------------------------------
      // Update subtopic progress
      // --------------------------------------------------------
      updateSubtopicProgress: (subtopicId, data) => {
        set((state) => ({
          subtopics: {
            ...state.subtopics,
            [subtopicId]: {
              ...state.subtopics[subtopicId],
              ...data,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },

      // --------------------------------------------------------
      // Mark lesson as completed
      // --------------------------------------------------------
      completeLesson: (lessonId, score) => {
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              ...state.lessons[lessonId],
              completed: true,
              completedAt: new Date().toISOString(),
              score: score ?? 0,
            },
          },
        }));
      },

      // --------------------------------------------------------
      // Record question result (correct or wrong)
      // Called by PracticeQuiz after each answer
      // --------------------------------------------------------
      recordQuestionResult: (questionId, isCorrect) => {
        const today = new Date().toISOString().slice(0, 10);
        set((state) => {
          // Update question history
          const prev = state.questionHistory[questionId] || { attempts: 0, correct: 0 };
          const newHistory = {
            ...state.questionHistory,
            [questionId]: {
              attempts: prev.attempts + 1,
              correct:  prev.correct + (isCorrect ? 1 : 0),
              lastAttemptedAt: new Date().toISOString(),
            },
          };

          // Update daily activity
          const prevDay = state.dailyActivity[today] || {
            questionsAttempted: 0,
            questionsCorrect: 0,
            timeSpent: 0,
            xpEarned: 0,
          };
          const newDaily = {
            ...state.dailyActivity,
            [today]: {
              ...prevDay,
              questionsAttempted: prevDay.questionsAttempted + 1,
              questionsCorrect:   prevDay.questionsCorrect   + (isCorrect ? 1 : 0),
            },
          };

          return {
            questionHistory: newHistory,
            dailyActivity: newDaily,
          };
        });
      },

      // --------------------------------------------------------
      // Record XP earned today
      // --------------------------------------------------------
      recordDailyXP: (xp) => {
        const today = new Date().toISOString().slice(0, 10);
        set((state) => {
          const prevDay = state.dailyActivity[today] || { questionsAttempted: 0, questionsCorrect: 0, timeSpent: 0, xpEarned: 0 };
          return {
            dailyActivity: {
              ...state.dailyActivity,
              [today]: {
                ...prevDay,
                xpEarned: (prevDay.xpEarned || 0) + xp,
              },
            },
          };
        });
      },

      // --------------------------------------------------------
      // Record study time
      // --------------------------------------------------------
      recordStudyTime: (minutes) => {
        const today = new Date().toISOString().slice(0, 10);
        set((state) => {
          const prevDay = state.dailyActivity[today] || { questionsAttempted: 0, questionsCorrect: 0, timeSpent: 0, xpEarned: 0 };
          return {
            dailyActivity: {
              ...state.dailyActivity,
              [today]: {
                ...prevDay,
                timeSpent: (prevDay.timeSpent || 0) + minutes,
              },
            },
          };
        });
      },

      // --------------------------------------------------------
      // Mark word as learned / mastered
      // --------------------------------------------------------
      markWordLearned: (wordId, mastered = false) => {
        set((state) => ({
          vocabulary: {
            ...state.vocabulary,
            [wordId]: {
              ...state.vocabulary[wordId],
              seen: true,
              mastered,
              seenCount: (state.vocabulary[wordId]?.seenCount || 0) + 1,
              lastSeenAt: new Date().toISOString(),
            },
          },
        }));
      },

      // --------------------------------------------------------
      // Get heatmap data (last N days)
      // --------------------------------------------------------
      getHeatmapData: (days = 84) => {
        const { dailyActivity } = get();
        const result = [];
        for (let i = days - 1; i >= 0; i--) {
          const d   = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          const act = dailyActivity[key];
          const count = act?.questionsAttempted || 0;
          result.push({
            date:  key,
            count,
            level: count === 0 ? 0 : count < 5 ? 1 : count < 15 ? 2 : count < 30 ? 3 : 4,
          });
        }
        return result;
      },

      // --------------------------------------------------------
      // Get overall stats
      // --------------------------------------------------------
      getOverallStats: () => {
        const state = get();
        const completedTopics = Object.values(state.topics).filter(t => t.completed).length;
        const totalAttempts   = Object.values(state.questionHistory).reduce((s, q) => s + q.attempts, 0);
        const totalCorrect    = Object.values(state.questionHistory).reduce((s, q) => s + q.correct, 0);
        return {
          completedTopics,
          totalAttempts,
          totalCorrect,
          accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
        };
      },

      // --------------------------------------------------------
      // Reset all progress
      // --------------------------------------------------------
      resetProgress: () => {
        set({
          topics: {},
          subtopics: {},
          lessons: {},
          questionHistory: {},
          dailyActivity: {},
          vocabulary: {},
          currentSession: null,
        });
      },
    }),
    {
      name:    'progress-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useProgressStore };
export default useProgressStore;
