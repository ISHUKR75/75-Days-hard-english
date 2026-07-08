/**
 * API Endpoint Constants - All backend API routes for the app
 */

/** Base API prefix */
export const API_BASE = '/api';

/** Auth endpoints */
export const AUTH_ENDPOINTS = {
  LOGIN:          `${API_BASE}/auth/login`,
  SIGNUP:         `${API_BASE}/auth/signup`,
  LOGOUT:         `${API_BASE}/auth/logout`,
  ME:             `${API_BASE}/auth/me`,
  REFRESH:        `${API_BASE}/auth/refresh`,
  FORGOT:         `${API_BASE}/auth/forgot-password`,
  RESET:          `${API_BASE}/auth/reset-password`,
  VERIFY_EMAIL:   `${API_BASE}/auth/verify-email`,
};

/** User endpoints */
export const USER_ENDPOINTS = {
  PROFILE:        `${API_BASE}/user/profile`,
  UPDATE:         `${API_BASE}/user/update`,
  AVATAR:         `${API_BASE}/user/avatar`,
  DELETE:         `${API_BASE}/user/delete`,
  STATS:          `${API_BASE}/user/stats`,
  LEADERBOARD:    `${API_BASE}/user/leaderboard`,
};

/** Progress endpoints */
export const PROGRESS_ENDPOINTS = {
  GET:            `${API_BASE}/progress`,
  SAVE:           `${API_BASE}/progress/save`,
  SYNC:           `${API_BASE}/progress/sync`,
  RESET:          `${API_BASE}/progress/reset`,
  DAILY:          `${API_BASE}/progress/daily`,
  STREAK:         `${API_BASE}/progress/streak`,
};

/** Quiz / Questions endpoints */
export const QUIZ_ENDPOINTS = {
  LIST:           `${API_BASE}/quiz`,
  BY_TOPIC:       (slug) => `${API_BASE}/quiz/${slug}`,
  SUBMIT:         `${API_BASE}/quiz/submit`,
  RESULT:         (id) => `${API_BASE}/quiz/result/${id}`,
};

/** Topics & lessons endpoints */
export const TOPIC_ENDPOINTS = {
  LIST:           `${API_BASE}/topics`,
  BY_SLUG:        (slug) => `${API_BASE}/topics/${slug}`,
  LESSON:         (topicSlug, lessonSlug) => `${API_BASE}/topics/${topicSlug}/${lessonSlug}`,
  COMPLETE:       `${API_BASE}/topics/complete`,
};

/** Vocabulary endpoints */
export const VOCAB_ENDPOINTS = {
  LIST:           `${API_BASE}/vocabulary`,
  SET:            (id) => `${API_BASE}/vocabulary/${id}`,
  SAVE_WORD:      `${API_BASE}/vocabulary/save`,
  MASTERED:       `${API_BASE}/vocabulary/mastered`,
};

/** Achievement & badge endpoints */
export const ACHIEVEMENT_ENDPOINTS = {
  LIST:           `${API_BASE}/achievements`,
  UNLOCK:         `${API_BASE}/achievements/unlock`,
  BADGES:         `${API_BASE}/badges`,
};

/** Gamification endpoints */
export const GAMIFICATION_ENDPOINTS = {
  XP:             `${API_BASE}/gamification/xp`,
  COINS:          `${API_BASE}/gamification/coins`,
  LEVEL:          `${API_BASE}/gamification/level`,
  LEADERBOARD:    `${API_BASE}/gamification/leaderboard`,
};

/** Assessment endpoints */
export const ASSESSMENT_ENDPOINTS = {
  PLACEMENT:      `${API_BASE}/assessment/placement`,
  PLACEMENT_SUBMIT: `${API_BASE}/assessment/placement/submit`,
  CEFR:           `${API_BASE}/assessment/cefr`,
  CEFR_SUBMIT:    `${API_BASE}/assessment/cefr/submit`,
};

/** Search endpoint */
export const SEARCH_ENDPOINTS = {
  SEARCH:         `${API_BASE}/search`,
  SUGGESTIONS:    `${API_BASE}/search/suggestions`,
};

/** Notification endpoints */
export const NOTIFICATION_ENDPOINTS = {
  LIST:           `${API_BASE}/notifications`,
  MARK_READ:      `${API_BASE}/notifications/read`,
  SETTINGS:       `${API_BASE}/notifications/settings`,
};

/** All endpoints grouped for easy access */
export const API_ENDPOINTS = {
  AUTH:           AUTH_ENDPOINTS,
  USER:           USER_ENDPOINTS,
  PROGRESS:       PROGRESS_ENDPOINTS,
  QUIZ:           QUIZ_ENDPOINTS,
  TOPICS:         TOPIC_ENDPOINTS,
  VOCAB:          VOCAB_ENDPOINTS,
  ACHIEVEMENTS:   ACHIEVEMENT_ENDPOINTS,
  GAMIFICATION:   GAMIFICATION_ENDPOINTS,
  ASSESSMENT:     ASSESSMENT_ENDPOINTS,
  SEARCH:         SEARCH_ENDPOINTS,
  NOTIFICATIONS:  NOTIFICATION_ENDPOINTS,
};

export default API_ENDPOINTS;
