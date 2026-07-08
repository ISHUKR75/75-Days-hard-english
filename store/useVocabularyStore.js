// ============================================================
// Vocabulary Store — Tracks learned words and mastery levels
// Features: Word tracking, mastery levels, spaced repetition,
// favorite words, learned count, category progress
// Uses Zustand for state management with localStorage persistence
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Mastery Levels ──────────────────────────────────────────
// Each word progresses through these mastery levels
export const MASTERY_LEVELS = {
  NEW: 'new',           // Just seen — 0%
  LEARNING: 'learning', // Seen 1-2 times — 25%
  FAMILIAR: 'familiar', // Seen 3-4 times — 50%
  PRACTICED: 'practiced',// Correctly answered 3+ times — 75%
  MASTERED: 'mastered',  // Correctly answered 5+ times — 100%
};

// ── Vocabulary Store ────────────────────────────────────────
const useVocabularyStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────
      words: {},             // { wordId: { word, hindi, mastery, seen, correct, wrong, lastSeen, isFavorite } }
      totalLearned: 0,       // Count of words at "familiar" or above
      totalMastered: 0,      // Count of words at "mastered" level
      favorites: [],         // Array of favorite word IDs
      categoryProgress: {},  // { categoryId: { total, learned, mastered } }
      dailyNewWords: 0,      // New words learned today
      lastResetDate: null,   // Date of last daily reset

      // ── Actions ────────────────────────────────────────

      // Mark a word as seen (called when user views a word card)
      markSeen: (wordId, wordData = {}) => {
        const state = get();
        const existing = state.words[wordId] || {
          word: wordData.word || wordId,
          hindi: wordData.hindi || '',
          mastery: MASTERY_LEVELS.NEW,
          seen: 0,
          correct: 0,
          wrong: 0,
          lastSeen: null,
          isFavorite: false,
        };

        const newSeen = existing.seen + 1;
        let newMastery = existing.mastery;

        // Auto-upgrade mastery based on views
        if (newSeen >= 1 && newMastery === MASTERY_LEVELS.NEW) {
          newMastery = MASTERY_LEVELS.LEARNING;
        } else if (newSeen >= 3 && newMastery === MASTERY_LEVELS.LEARNING) {
          newMastery = MASTERY_LEVELS.FAMILIAR;
        }

        const updatedWord = {
          ...existing,
          ...wordData,
          seen: newSeen,
          mastery: newMastery,
          lastSeen: new Date().toISOString(),
        };

        set({
          words: { ...state.words, [wordId]: updatedWord },
        });

        // Recalculate totals
        get().recalculateTotals();
      },

      // Record correct answer for a word
      markCorrect: (wordId) => {
        const state = get();
        const existing = state.words[wordId];
        if (!existing) return;

        const newCorrect = existing.correct + 1;
        let newMastery = existing.mastery;

        // Upgrade mastery based on correct answers
        if (newCorrect >= 3 && (newMastery === MASTERY_LEVELS.LEARNING || newMastery === MASTERY_LEVELS.FAMILIAR)) {
          newMastery = MASTERY_LEVELS.PRACTICED;
        } else if (newCorrect >= 5 && newMastery === MASTERY_LEVELS.PRACTICED) {
          newMastery = MASTERY_LEVELS.MASTERED;
        }

        set({
          words: {
            ...state.words,
            [wordId]: { ...existing, correct: newCorrect, mastery: newMastery },
          },
        });

        get().recalculateTotals();
      },

      // Record wrong answer for a word
      markWrong: (wordId) => {
        const state = get();
        const existing = state.words[wordId];
        if (!existing) return;

        // Downgrade mastery if too many wrongs
        let newMastery = existing.mastery;
        if (existing.wrong + 1 > existing.correct && newMastery === MASTERY_LEVELS.PRACTICED) {
          newMastery = MASTERY_LEVELS.FAMILIAR;
        }

        set({
          words: {
            ...state.words,
            [wordId]: { ...existing, wrong: existing.wrong + 1, mastery: newMastery },
          },
        });

        get().recalculateTotals();
      },

      // Toggle favorite status for a word
      toggleFavorite: (wordId) => {
        const state = get();
        const existing = state.words[wordId];
        if (!existing) return;

        const isFav = !existing.isFavorite;
        const newFavorites = isFav
          ? [...state.favorites, wordId]
          : state.favorites.filter((id) => id !== wordId);

        set({
          words: { ...state.words, [wordId]: { ...existing, isFavorite: isFav } },
          favorites: newFavorites,
        });
      },

      // Recalculate total learned and mastered counts
      recalculateTotals: () => {
        const state = get();
        const allWords = Object.values(state.words);
        const learned = allWords.filter(
          (w) => w.mastery === MASTERY_LEVELS.FAMILIAR || w.mastery === MASTERY_LEVELS.PRACTICED || w.mastery === MASTERY_LEVELS.MASTERED
        ).length;
        const mastered = allWords.filter((w) => w.mastery === MASTERY_LEVELS.MASTERED).length;
        set({ totalLearned: learned, totalMastered: mastered });
      },

      // Get words that need review (spaced repetition logic)
      getWordsForReview: (limit = 10) => {
        const state = get();
        const now = new Date();
        return Object.entries(state.words)
          .filter(([_, w]) => w.mastery !== MASTERY_LEVELS.MASTERED)
          .sort((a, b) => {
            // Prioritize words not seen recently
            const aDate = a[1].lastSeen ? new Date(a[1].lastSeen) : new Date(0);
            const bDate = b[1].lastSeen ? new Date(b[1].lastSeen) : new Date(0);
            return aDate - bDate;
          })
          .slice(0, limit)
          .map(([id, word]) => ({ id, ...word }));
      },

      // Get mastery distribution for stats
      getMasteryDistribution: () => {
        const state = get();
        const allWords = Object.values(state.words);
        return {
          new: allWords.filter((w) => w.mastery === MASTERY_LEVELS.NEW).length,
          learning: allWords.filter((w) => w.mastery === MASTERY_LEVELS.LEARNING).length,
          familiar: allWords.filter((w) => w.mastery === MASTERY_LEVELS.FAMILIAR).length,
          practiced: allWords.filter((w) => w.mastery === MASTERY_LEVELS.PRACTICED).length,
          mastered: allWords.filter((w) => w.mastery === MASTERY_LEVELS.MASTERED).length,
        };
      },
    }),
    {
      name: '75days-vocabulary-store', // localStorage key
    }
  )
);

export default useVocabularyStore;
