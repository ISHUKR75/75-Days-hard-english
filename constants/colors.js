/**
 * Color Palette Constants - All colors used across the 75 Days Hard English app
 */

/** Primary brand and UI colors */
export const COLORS = {
  // Brand
  PRIMARY:        '#6366f1', // Indigo
  PRIMARY_DARK:   '#4f46e5',
  PRIMARY_LIGHT:  '#a5b4fc',
  SECONDARY:      '#8b5cf6', // Violet
  ACCENT:         '#d946ef', // Fuchsia

  // Semantic
  SUCCESS:        '#10b981', // Emerald
  SUCCESS_LIGHT:  '#6ee7b7',
  WARNING:        '#f59e0b', // Amber
  WARNING_LIGHT:  '#fcd34d',
  ERROR:          '#ef4444', // Red
  ERROR_LIGHT:    '#fca5a5',
  INFO:           '#0ea5e9', // Sky
  INFO_LIGHT:     '#7dd3fc',

  // Neutrals
  WHITE:          '#ffffff',
  BLACK:          '#000000',
  GRAY_50:        '#f9fafb',
  GRAY_100:       '#f3f4f6',
  GRAY_200:       '#e5e7eb',
  GRAY_300:       '#d1d5db',
  GRAY_400:       '#9ca3af',
  GRAY_500:       '#6b7280',
  GRAY_600:       '#4b5563',
  GRAY_700:       '#374151',
  GRAY_800:       '#1f2937',
  GRAY_900:       '#111827',

  // Dark mode surfaces
  SURFACE:        '#1e1e2e',
  SURFACE_2:      '#2a2a3e',
  SURFACE_3:      '#313145',
  BORDER:         '#3f3f5a',

  // Gamification
  XP:             '#f59e0b', // Amber - XP points
  COIN:           '#fbbf24', // Yellow - Coins
  DIAMOND:        '#06b6d4', // Cyan - Diamonds
  STREAK:         '#f97316', // Orange - Streaks
  LEVEL:          '#6366f1', // Indigo - Levels
};

/**
 * CEFR Level Colors - Consistent color coding for each CEFR level
 * @type {Record<string, string>}
 */
export const CEFR_COLORS = {
  A0: '#10b981', // Emerald  - Pre-beginner
  A1: '#3b82f6', // Blue     - Beginner
  A2: '#8b5cf6', // Violet   - Elementary
  B1: '#f59e0b', // Amber    - Intermediate
  B2: '#ef4444', // Red      - Upper-intermediate
  C1: '#ec4899', // Pink     - Advanced
  C2: '#0ea5e9', // Sky      - Mastery
};

/** Topic type colors */
export const TOPIC_TYPE_COLORS = {
  grammar:       '#6366f1',
  spoken:        '#10b981',
  pronunciation: '#f97316',
  vocabulary:    '#8b5cf6',
  writing:       '#0ea5e9',
  listening:     '#ec4899',
  reading:       '#f59e0b',
  'real-life':   '#14b8a6',
  practice:      '#22c55e',
  revision:      '#3b82f6',
  professional:  '#d946ef',
};

/** Difficulty level colors */
export const DIFFICULTY_COLORS = {
  beginner:            '#10b981',
  elementary:          '#3b82f6',
  intermediate:        '#f59e0b',
  'upper-intermediate':'#ef4444',
  advanced:            '#ec4899',
};

/** Grade colors */
export const GRADE_COLORS = {
  'A+': '#10b981',
  'A':  '#22c55e',
  'B+': '#3b82f6',
  'B':  '#6366f1',
  'C':  '#f59e0b',
  'F':  '#ef4444',
};

export default COLORS;
