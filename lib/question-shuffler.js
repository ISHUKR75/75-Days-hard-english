/**
 * Question Shuffler - Smart question selection and ordering logic
 */

import { shuffleArray } from './utils.js';

/**
 * Shuffle questions with an optional deterministic seed
 * @param {Array} questions
 * @param {number} [seed] - Optional seed for deterministic shuffle (e.g., day number)
 * @returns {Array} shuffled copy
 */
export function shuffleQuestions(questions, seed) {
  if (!questions || questions.length === 0) return [];

  if (seed !== undefined) {
    // Seeded shuffle using mulberry32 PRNG for deterministic results
    const rand = mulberry32(seed);
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return shuffleArray(questions);
}

/**
 * Get a random subset of questions
 * @param {Array} questions
 * @param {number} count - How many to return
 * @returns {Array}
 */
export function getRandomSubset(questions, count) {
  if (!questions || questions.length === 0) return [];
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Adaptive question selection — prioritizes questions the user gets wrong
 * @param {Array} questions - All available questions
 * @param {Record<string, { correct: number, attempts: number }>} history - User question history
 * @param {number} count - Number of questions to return
 * @returns {Array} selected questions ordered by priority
 */
export function getAdaptiveQuestions(questions, history = {}, count = 10) {
  if (!questions || questions.length === 0) return [];

  const scored = questions.map((q) => {
    const h = history[q.id];
    if (!h || h.attempts === 0) {
      // Never attempted — medium priority
      return { q, priority: 0.5 };
    }
    const accuracy = h.correct / h.attempts;
    // Lower accuracy = higher priority (weighted towards hard questions)
    return { q, priority: 1 - accuracy };
  });

  // Sort by priority descending, then shuffle within similar-priority groups
  scored.sort((a, b) => b.priority - a.priority);

  // Take top 60% difficult + 40% mixed to avoid pure drilling
  const hardCount = Math.ceil(count * 0.6);
  const restCount = count - hardCount;

  const hard = scored.slice(0, Math.min(hardCount, scored.length)).map((s) => s.q);
  const rest = shuffleArray(scored.slice(hardCount).map((s) => s.q)).slice(0, restCount);

  return shuffleArray([...hard, ...rest]);
}

/**
 * Separate questions by their type
 * @param {Array<{ type: string }>} questions
 * @returns {Record<string, Array>} grouped by type
 */
export function separateByType(questions) {
  if (!questions || questions.length === 0) return {};
  return questions.reduce((groups, q) => {
    const type = q.type || 'unknown';
    if (!groups[type]) groups[type] = [];
    groups[type].push(q);
    return groups;
  }, {});
}

/**
 * Get questions for a specific difficulty level
 * @param {Array} questions
 * @param {'beginner'|'elementary'|'intermediate'|'upper-intermediate'|'advanced'} difficulty
 * @returns {Array}
 */
export function filterByDifficulty(questions, difficulty) {
  if (!questions) return [];
  return questions.filter((q) => q.difficulty === difficulty);
}

/**
 * Get questions not yet attempted by the user
 * @param {Array} questions
 * @param {Record<string, { attempts: number }>} history
 * @returns {Array}
 */
export function getNewQuestions(questions, history = {}) {
  return questions.filter((q) => !history[q.id] || history[q.id].attempts === 0);
}

// ─── Internal helpers ─────────────────────────────────────────

/**
 * Mulberry32 — fast seeded PRNG
 * @param {number} seed
 * @returns {() => number} function returning 0–1
 */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
