/**
 * App Configuration - Global configuration constants for the 75 Days Hard English app
 */

/** Core app metadata */
export const APP_META = {
  NAME:           '75 Days Hard English',
  SHORT_NAME:     '75 Days English',
  DESCRIPTION:    'Master English in 75 days with gamified daily lessons, quizzes and streaks.',
  VERSION:        '1.0.0',
  LOCALE:         'en-IN',
  CURRENCY:       'INR',
  SUPPORT_EMAIL:  'support@75daysenglish.com',
};

/** Challenge configuration */
export const CHALLENGE_CONFIG = {
  TOTAL_DAYS:           75,
  START_DAY:            1,
  DAYS_PER_WEEK:        7,
  LESSONS_PER_DAY:      1,
  MIN_DAILY_MINUTES:    15,
  RECOMMENDED_MINUTES:  30,
};

/** Gamification configuration */
export const GAMIFICATION_CONFIG = {
  MAX_LEVEL:            100,
  BASE_XP_PER_LEVEL:    100,
  LEVEL_SCALE_FACTOR:   1.15,
  DAILY_XP_CAP:         500,
  COIN_TO_XP_RATIO:     0.5,   // 1 coin = 0.5 XP equivalent
  DIAMOND_TO_COIN_RATIO:10,    // 1 diamond = 10 coins
};

/** Quiz configuration */
export const QUIZ_CONFIG = {
  DEFAULT_QUESTIONS:    10,
  MIN_QUESTIONS:        5,
  MAX_QUESTIONS:        30,
  DEFAULT_TIME_LIMIT:   60,   // seconds per question (0 = no limit)
  PASS_SCORE:           60,   // % to pass
  PERFECT_SCORE:        100,
  MAX_HINTS_PER_QUIZ:   3,
  HINT_XP_PENALTY:      5,
};

/** Streak configuration */
export const STREAK_CONFIG = {
  GRACE_PERIOD_HOURS:   24,   // hours after midnight before streak breaks
  MAX_FREEZE:           3,    // max streak freeze uses
  FREEZE_COST_COINS:    50,
};

/** Vocabulary configuration */
export const VOCAB_CONFIG = {
  MASTERY_CORRECT_COUNT:  3,  // correct answers needed to "master" a word
  DAILY_NEW_WORDS:        10,
  FLASHCARD_DECK_SIZE:    20,
  REVIEW_INTERVAL_DAYS:   [1, 3, 7, 14, 30], // spaced repetition intervals
};

/** UI / Display configuration */
export const UI_CONFIG = {
  TOAST_DURATION_MS:    3000,
  ANIMATION_DURATION:   300,  // ms
  DEBOUNCE_DELAY:       300,  // ms
  THROTTLE_DELAY:       1000, // ms
  SEARCH_MIN_CHARS:     2,
  SEARCH_MAX_RESULTS:   20,
  LEADERBOARD_LIMIT:    50,
};

/** Local storage keys */
export const STORAGE_KEYS = {
  USER_STORE:       'user-store',
  PROGRESS_STORE:   'progress-store',
  SETTINGS_STORE:   'settings-store',
  SOUND_STORE:      'sound-store',
  TIMER_STORE:      'timer-store',
  SEARCH_STORE:     'search-store',
  ONBOARDING_DONE:  'onboarding-done',
  LAST_SYNC:        'last-sync',
};

/** Feature flags */
export const FEATURES = {
  SPEAKING_ENABLED:     true,
  WRITING_ENABLED:      true,
  AI_FEEDBACK:          false, // Coming soon
  OFFLINE_MODE:         true,
  PUSH_NOTIFICATIONS:   true,
  LEADERBOARD:          true,
  SOCIAL_SHARING:       true,
};

export default {
  APP_META,
  CHALLENGE_CONFIG,
  GAMIFICATION_CONFIG,
  QUIZ_CONFIG,
  STREAK_CONFIG,
  VOCAB_CONFIG,
  UI_CONFIG,
  STORAGE_KEYS,
  FEATURES,
};
