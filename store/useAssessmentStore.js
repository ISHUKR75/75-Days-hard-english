// ============================================================
// Assessment Store — Manages test/quiz sessions
// Features: Test session management, question randomization,
// timing, scoring, result history, and performance tracking
// Uses Zustand for state management with localStorage persistence
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Assessment Store ────────────────────────────────────────
const useAssessmentStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────
      // Current test session
      activeTest: null,           // { id, title, questions, startedAt }
      currentIndex: 0,            // Current question index
      answers: {},                // { questionId: selectedAnswer }
      timeElapsed: 0,             // Seconds spent on test
      isPaused: false,            // Whether test is paused

      // Test history
      testHistory: [],            // Array of completed test results
      totalTestsTaken: 0,         // Total number of tests completed
      averageScore: 0,            // Average score across all tests
      bestScore: 0,               // Best score ever achieved

      // ── Actions ────────────────────────────────────────

      // Start a new test session
      startTest: ({ id, title, questions, timeLimit = null }) => {
        // Shuffle questions for randomization
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        set({
          activeTest: { id, title, questions: shuffled, timeLimit, startedAt: Date.now() },
          currentIndex: 0,
          answers: {},
          timeElapsed: 0,
          isPaused: false,
        });
      },

      // Submit answer for current question
      submitAnswer: (questionId, answer) => {
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        }));
      },

      // Go to next question
      nextQuestion: () => {
        const state = get();
        if (!state.activeTest) return;
        const maxIndex = state.activeTest.questions.length - 1;
        if (state.currentIndex < maxIndex) {
          set({ currentIndex: state.currentIndex + 1 });
        }
      },

      // Go to previous question
      prevQuestion: () => {
        const state = get();
        if (state.currentIndex > 0) {
          set({ currentIndex: state.currentIndex - 1 });
        }
      },

      // Jump to specific question
      goToQuestion: (index) => {
        set({ currentIndex: index });
      },

      // Pause/resume test
      togglePause: () => set((s) => ({ isPaused: !s.isPaused })),

      // Update timer
      tick: () => set((s) => ({ timeElapsed: s.timeElapsed + 1 })),

      // Finish the test and calculate results
      finishTest: () => {
        const state = get();
        if (!state.activeTest) return null;

        const { questions } = state.activeTest;
        let correctCount = 0;
        const reviewData = [];

        // Calculate score
        questions.forEach((q) => {
          const userAnswer = state.answers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          if (isCorrect) correctCount++;
          reviewData.push({
            question: q,
            userAnswer,
            isCorrect,
          });
        });

        const score = Math.round((correctCount / questions.length) * 100);
        const result = {
          id: `test-${Date.now()}`,
          testId: state.activeTest.id,
          title: state.activeTest.title,
          score,
          correctCount,
          totalQuestions: questions.length,
          timeElapsed: state.timeElapsed,
          completedAt: new Date().toISOString(),
          review: reviewData,
        };

        // Update history and stats
        const newHistory = [...state.testHistory, result].slice(-50); // Keep last 50
        const newTotal = state.totalTestsTaken + 1;
        const allScores = newHistory.map((r) => r.score);
        const newAverage = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
        const newBest = Math.max(state.bestScore, score);

        set({
          activeTest: null,
          currentIndex: 0,
          answers: {},
          timeElapsed: 0,
          testHistory: newHistory,
          totalTestsTaken: newTotal,
          averageScore: newAverage,
          bestScore: newBest,
        });

        return result;
      },

      // Abandon the current test without saving
      abandonTest: () => {
        set({
          activeTest: null,
          currentIndex: 0,
          answers: {},
          timeElapsed: 0,
        });
      },

      // Get progress for current test
      getProgress: () => {
        const state = get();
        if (!state.activeTest) return 0;
        const answered = Object.keys(state.answers).length;
        return Math.round((answered / state.activeTest.questions.length) * 100);
      },

      // Clear all test history
      clearHistory: () => set({ testHistory: [], totalTestsTaken: 0, averageScore: 0, bestScore: 0 }),
    }),
    {
      name: '75days-assessment-store', // localStorage key
    }
  )
);

export default useAssessmentStore;
