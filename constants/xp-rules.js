/**
 * XP Earning Rules - Defines how much XP each action awards
 */

/** Core XP values for every action in the app */
export const XP_RULES = {
  // ─── Answer Actions ──────────────────────────────────────────
  CORRECT_ANSWER:         10,  // Per correct answer in a quiz
  WRONG_ANSWER:            2,  // Consolation XP for wrong (effort counts)
  HINT_USED_CORRECT:       5,  // Correct but used a hint
  STREAK_ANSWER:          15,  // Answering correctly 5 in a row

  // ─── Lesson / Session Completion ─────────────────────────────
  LESSON_COMPLETE:        50,  // Completing a full lesson
  LESSON_PERFECT:        100,  // Completing a lesson with 100% accuracy
  TOPIC_COMPLETE:        200,  // Completing all lessons in a topic
  TOPIC_PERFECT:         350,  // Completing a topic with 100% average
  CHALLENGE_DAY:          75,  // Completing a challenge day

  // ─── Streaks ─────────────────────────────────────────────────
  DAILY_STREAK:           25,  // Each day in a streak
  STREAK_MILESTONE_7:    100,  // 7-day streak bonus
  STREAK_MILESTONE_30:   300,  // 30-day streak bonus
  STREAK_MILESTONE_75:  1000,  // 75-day streak bonus

  // ─── Quiz Performance ─────────────────────────────────────────
  QUIZ_COMPLETE:          30,  // Finishing any quiz
  PERFECT_SCORE:         100,  // 100% score on a quiz
  SCORE_90:               60,  // 90–99% score
  SCORE_80:               40,  // 80–89% score
  FIRST_TRY_CORRECT:      20,  // Getting a question right on first attempt

  // ─── Vocabulary ───────────────────────────────────────────────
  VOCABULARY_LEARNED:      5,  // Adding a word to vocabulary
  VOCABULARY_MASTERED:    15,  // Mastering a vocabulary word (correct 3×)
  FLASHCARD_CORRECT:       8,  // Correct flashcard answer

  // ─── Speaking & Writing ──────────────────────────────────────
  SPEAKING_PRACTICE:      15,  // Completing a speaking exercise
  WRITING_SUBMITTED:      20,  // Submitting a writing exercise
  WRITING_REVIEWED:       30,  // Having writing reviewed

  // ─── Daily Goals ─────────────────────────────────────────────
  DAILY_GOAL_MET:         50,  // Meeting your daily study goal
  DAILY_GOAL_EXCEEDED:    80,  // Exceeding your daily study goal

  // ─── Assessment ──────────────────────────────────────────────
  PLACEMENT_TEST:        100,  // Completing the placement test
  CEFR_LEVEL_UP:         500,  // Advancing a CEFR level

  // ─── Social & Special ─────────────────────────────────────────
  FIRST_LESSON:           25,  // Completing your very first lesson (bonus)
  COMEBACK_BONUS:         30,  // Returning after a 7+ day break
};

/**
 * Multipliers applied to base XP in certain conditions
 */
export const XP_MULTIPLIERS = {
  DOUBLE_XP:        2.0,  // Double XP event
  STREAK_BONUS:     1.5,  // Bonus when on a 7+ day streak
  WEEKEND_BONUS:    1.25, // Small bonus for studying on weekends
  PERFECT_LESSON:   1.5,  // Multiplier for perfect lesson score
};

/**
 * XP thresholds for each app level (level 1–100)
 * @param {number} level - Current level (1-based)
 * @returns {number} XP required to reach next level
 */
export const getXPForLevel = (level) => Math.floor(100 * Math.pow(1.15, level - 1));

/**
 * Calculate total XP needed to reach a given level from level 1
 * @param {number} targetLevel
 * @returns {number}
 */
export const getTotalXPForLevel = (targetLevel) => {
  let total = 0;
  for (let i = 1; i < targetLevel; i++) {
    total += getXPForLevel(i);
  }
  return total;
};

export default XP_RULES;
