/**
 * Score Calculator - Logic for calculating quiz scores, XP, grades, and CEFR levels
 */

import { XP_RULES, XP_MULTIPLIERS } from '../constants/xp-rules.js';
import { CEFR_LEVELS } from '../constants/cefr-levels.js';

/**
 * Calculate the score for a completed quiz
 * @param {Array<{ id: string, correct: boolean, timeSpent: number, hintUsed?: boolean }>} results
 * @returns {{ score: number, correct: number, total: number, accuracy: number, grade: string }}
 */
export function calculateQuizScore(results) {
  if (!results || results.length === 0) {
    return { score: 0, correct: 0, total: 0, accuracy: 0, grade: 'F' };
  }
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const accuracy = Math.round((correct / total) * 100);
  const grade = getGradeFromScore(accuracy);
  return { score: accuracy, correct, total, accuracy, grade };
}

/**
 * Calculate overall topic score from an array of subtopic scores
 * @param {number[]} subtopicScores - Array of 0–100 scores
 * @returns {number} weighted average 0–100
 */
export function calculateTopicScore(subtopicScores) {
  if (!subtopicScores || subtopicScores.length === 0) return 0;
  const sum = subtopicScores.reduce((acc, s) => acc + s, 0);
  return Math.round(sum / subtopicScores.length);
}

/**
 * Calculate an estimated CEFR level from user stats
 * @param {{ totalXP: number, overallAccuracy: number, lessonsCompleted: number }} stats
 * @returns {string} CEFR level ID e.g. 'A1', 'B2'
 */
export function calculateCEFRLevel(stats) {
  const { totalXP = 0 } = stats;
  const level = CEFR_LEVELS.slice().reverse().find((l) => totalXP >= l.xpMin);
  return level ? level.id : 'A0';
}

/**
 * Get a letter grade from a numeric score
 * @param {number} score - 0 to 100
 * @returns {string} 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F'
 */
export function getGradeFromScore(score) {
  if (score >= 97) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'F';
}

/**
 * Calculate XP earned for a quiz session
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total questions
 * @param {number} timeSpent - Seconds taken for the session
 * @param {{ isStreakActive?: boolean, isWeekend?: boolean }} [options={}]
 * @returns {number} XP to award
 */
export function calculateXPForSession(correct, total, timeSpent, options = {}) {
  if (!total) return 0;

  const accuracy = (correct / total) * 100;

  // Base XP from answers
  const wrongAnswers = total - correct;
  let xp = correct * XP_RULES.CORRECT_ANSWER + wrongAnswers * XP_RULES.WRONG_ANSWER;

  // Quiz completion bonus
  xp += XP_RULES.QUIZ_COMPLETE;

  // Score bonus
  if (accuracy === 100) xp += XP_RULES.PERFECT_SCORE;
  else if (accuracy >= 90) xp += XP_RULES.SCORE_90;
  else if (accuracy >= 80) xp += XP_RULES.SCORE_80;

  // Speed bonus: under 2 minutes (120s) for 10 questions
  const avgTimePerQ = total > 0 ? timeSpent / total : 0;
  if (avgTimePerQ < 12 && accuracy >= 80) {
    xp += 20; // speed + accuracy bonus
  }

  // Apply multipliers
  if (options.isStreakActive) xp = Math.round(xp * XP_MULTIPLIERS.STREAK_BONUS);
  if (options.isWeekend) xp = Math.round(xp * XP_MULTIPLIERS.WEEKEND_BONUS);

  return Math.max(0, Math.round(xp));
}

/**
 * Calculate current streak from a daily activity map
 * @param {Record<string, { questionsAttempted: number }>} dailyActivity - keyed by 'YYYY-MM-DD'
 * @returns {{ currentStreak: number, longestStreak: number }}
 */
export function calculateStreak(dailyActivity) {
  if (!dailyActivity || Object.keys(dailyActivity).length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dates = Object.keys(dailyActivity)
    .filter((d) => dailyActivity[d]?.questionsAttempted > 0)
    .sort()
    .reverse();

  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Check if most recent date is today or yesterday (grace period)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (dates[0] !== todayStr && dates[0] !== yesterdayStr) {
    return { currentStreak: 0, longestStreak: Math.max(...[1]) };
  }

  currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = Math.round((prev - curr) / 86400000);

    if (diffDays === 1) {
      tempStreak++;
      if (i < dates.length - 1 || dates[i] === dates[0]) {
        currentStreak = tempStreak;
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
      if (i > 1) break; // streak broken before today
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);
  return { currentStreak, longestStreak };
}

/**
 * Calculate percentage progress within a CEFR level
 * @param {number} totalXP
 * @param {string} cefrLevelId
 * @returns {number} 0–100
 */
export function calculateCEFRProgress(totalXP, cefrLevelId) {
  const level = CEFR_LEVELS.find((l) => l.id === cefrLevelId);
  if (!level || level.xpMax === Infinity) return 100;
  const progress = ((totalXP - level.xpMin) / (level.xpMax - level.xpMin)) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}
