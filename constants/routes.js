/**
 * Application Routes - All navigation paths for the 75 Days Hard English app
 */

export const ROUTES = {
  // ─── Core Pages ────────────────────────────────────────────
  HOME: '/',
  DASHBOARD: '/dashboard',
  CHALLENGE: '/75-days-challenge',

  // ─── Authentication ─────────────────────────────────────────
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  ONBOARDING: '/onboarding',

  // ─── Topic / Day Routes ──────────────────────────────────────
  TOPICS: '/topics',
  TOPIC: (slug) => `/topics/${slug}`,
  DAY: (day) => `/day/${day}`,
  LESSON: (topicSlug, lessonSlug) => `/topics/${topicSlug}/${lessonSlug}`,

  // ─── Grammar ─────────────────────────────────────────────────
  GRAMMAR: '/grammar',
  GRAMMAR_TOPIC: (slug) => `/grammar/${slug}`,
  GRAMMAR_QUIZ: (slug) => `/grammar/${slug}/quiz`,

  // ─── Vocabulary ──────────────────────────────────────────────
  VOCABULARY: '/vocabulary',
  VOCABULARY_SET: (id) => `/vocabulary/${id}`,
  VOCABULARY_PRACTICE: (id) => `/vocabulary/${id}/practice`,
  FLASHCARDS: '/vocabulary/flashcards',

  // ─── Speaking ────────────────────────────────────────────────
  SPEAKING: '/speaking',
  SPEAKING_LESSON: (id) => `/speaking/${id}`,
  PRONUNCIATION: '/pronunciation',
  PRONUNCIATION_TOPIC: (slug) => `/pronunciation/${slug}`,

  // ─── Writing ─────────────────────────────────────────────────
  WRITING: '/writing',
  WRITING_EXERCISE: (id) => `/writing/${id}`,
  WRITING_SUBMIT: (id) => `/writing/${id}/submit`,

  // ─── Listening ───────────────────────────────────────────────
  LISTENING: '/listening',
  LISTENING_EXERCISE: (id) => `/listening/${id}`,

  // ─── Reading ─────────────────────────────────────────────────
  READING: '/reading',
  READING_PASSAGE: (id) => `/reading/${id}`,

  // ─── Quizzes & Assessments ───────────────────────────────────
  QUIZ: '/quiz',
  QUIZ_TOPIC: (slug) => `/quiz/${slug}`,
  QUIZ_RESULT: (id) => `/quiz/result/${id}`,
  ASSESSMENT: '/assessment',
  PLACEMENT_TEST: '/assessment/placement',
  CEFR_TEST: '/assessment/cefr',

  // ─── Progress & Stats ────────────────────────────────────────
  PROGRESS: '/progress',
  STREAK: '/progress/streak',
  STATS: '/stats',

  // ─── Leaderboard & Social ────────────────────────────────────
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  PROFILE_USER: (id) => `/profile/${id}`,

  // ─── Gamification ────────────────────────────────────────────
  ACHIEVEMENTS: '/achievements',
  BADGES: '/badges',
  REWARDS: '/rewards',
  SHOP: '/shop',

  // ─── Search ──────────────────────────────────────────────────
  SEARCH: '/search',

  // ─── Settings & Account ──────────────────────────────────────
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  SETTINGS_PRIVACY: '/settings/privacy',
  SETTINGS_APPEARANCE: '/settings/appearance',

  // ─── Help & Info ─────────────────────────────────────────────
  HELP: '/help',
  FAQ: '/help/faq',
  ABOUT: '/about',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',

  // ─── Admin ───────────────────────────────────────────────────
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_CONTENT: '/admin/content',

  // ─── API ─────────────────────────────────────────────────────
  API_ROOT: '/api',
};

export default ROUTES;
