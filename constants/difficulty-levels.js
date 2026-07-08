/**
 * Difficulty Level Definitions - All difficulty levels used in the app
 */

export const DIFFICULTY_LEVELS = [
  {
    id: 'beginner',
    label: 'Beginner',
    labelHi: 'शुरुआती',
    emoji: '🌱',
    color: '#10b981',
    order: 1,
    xpMultiplier: 1.0,
    description: 'Perfect for those new to English. Simple sentences and basic vocabulary.',
    cefrRange: ['A0', 'A1'],
  },
  {
    id: 'elementary',
    label: 'Elementary',
    labelHi: 'प्रारंभिक',
    emoji: '📗',
    color: '#3b82f6',
    order: 2,
    xpMultiplier: 1.2,
    description: 'Building on the basics. Common structures and everyday vocabulary.',
    cefrRange: ['A1', 'A2'],
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    labelHi: 'मध्यम',
    emoji: '📘',
    color: '#f59e0b',
    order: 3,
    xpMultiplier: 1.5,
    description: 'More complex grammar, tenses, and real-world conversation.',
    cefrRange: ['A2', 'B1'],
  },
  {
    id: 'upper-intermediate',
    label: 'Upper-Intermediate',
    labelHi: 'उच्च मध्यम',
    emoji: '📙',
    color: '#ef4444',
    order: 4,
    xpMultiplier: 1.8,
    description: 'Advanced structures, idiomatic language and professional usage.',
    cefrRange: ['B1', 'B2'],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    labelHi: 'उन्नत',
    emoji: '🔴',
    color: '#ec4899',
    order: 5,
    xpMultiplier: 2.0,
    description: 'Near-native level. Complex academic and professional English.',
    cefrRange: ['B2', 'C1', 'C2'],
  },
];

/** Ordered IDs for quick comparisons */
export const DIFFICULTY_ORDER = [
  'beginner',
  'elementary',
  'intermediate',
  'upper-intermediate',
  'advanced',
];

/**
 * Get difficulty level by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export const getDifficultyLevel = (id) => DIFFICULTY_LEVELS.find((d) => d.id === id);

/**
 * Compare two difficulty levels
 * @param {string} a
 * @param {string} b
 * @returns {number} negative if a < b, 0 if equal, positive if a > b
 */
export const compareDifficulty = (a, b) =>
  DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b);

export default DIFFICULTY_LEVELS;
