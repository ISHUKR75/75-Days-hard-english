/**
 * Achievement Definitions - 50+ achievements for the 75 Days Hard English app
 */

export const ACHIEVEMENTS = [
  // ─── First Steps ──────────────────────────────────────────────
  { id: 'first-lesson',       title: 'First Steps',          desc: 'Complete your first lesson',                emoji: '🎯', xp: 50,  category: 'milestone',  condition: 'lessonsCompleted >= 1' },
  { id: 'first-quiz',         title: 'Quiz Taker',           desc: 'Complete your first quiz',                  emoji: '📝', xp: 50,  category: 'milestone',  condition: 'quizzesCompleted >= 1' },
  { id: 'first-correct',      title: 'Right Answer!',        desc: 'Get your first correct answer',             emoji: '✅', xp: 10,  category: 'milestone',  condition: 'totalCorrectAnswers >= 1' },
  { id: 'first-word',         title: 'Word Learner',         desc: 'Learn your first vocabulary word',          emoji: '📖', xp: 20,  category: 'vocabulary', condition: 'totalWordsLearned >= 1' },

  // ─── Streaks ──────────────────────────────────────────────────
  { id: 'streak-3',           title: '3-Day Warrior',        desc: 'Maintain a 3-day streak',                   emoji: '🔥', xp: 75,  category: 'streak',     condition: 'streak >= 3' },
  { id: 'streak-7',           title: 'Week Champion',        desc: 'Maintain a 7-day streak',                   emoji: '🔥', xp: 150, category: 'streak',     condition: 'streak >= 7' },
  { id: 'streak-14',          title: 'Two Weeks Strong',     desc: 'Maintain a 14-day streak',                  emoji: '🔥', xp: 300, category: 'streak',     condition: 'streak >= 14' },
  { id: 'streak-30',          title: 'Monthly Master',       desc: 'Maintain a 30-day streak',                  emoji: '🔥', xp: 500, category: 'streak',     condition: 'streak >= 30' },
  { id: 'streak-75',          title: '75 Days Legend',       desc: 'Complete the full 75-day challenge streak',  emoji: '👑', xp: 2000,category: 'streak',     condition: 'streak >= 75' },

  // ─── Lessons ─────────────────────────────────────────────────
  { id: 'lessons-5',          title: 'Eager Learner',        desc: 'Complete 5 lessons',                        emoji: '📚', xp: 100, category: 'lesson',     condition: 'lessonsCompleted >= 5' },
  { id: 'lessons-10',         title: 'Dedicated Student',    desc: 'Complete 10 lessons',                       emoji: '📚', xp: 150, category: 'lesson',     condition: 'lessonsCompleted >= 10' },
  { id: 'lessons-25',         title: 'Knowledge Seeker',     desc: 'Complete 25 lessons',                       emoji: '📚', xp: 300, category: 'lesson',     condition: 'lessonsCompleted >= 25' },
  { id: 'lessons-50',         title: 'Half Century',         desc: 'Complete 50 lessons',                       emoji: '🏆', xp: 500, category: 'lesson',     condition: 'lessonsCompleted >= 50' },
  { id: 'lessons-75',         title: '75 Days Complete!',    desc: 'Complete all 75 lessons',                   emoji: '🎓', xp: 2000,category: 'lesson',     condition: 'lessonsCompleted >= 75' },

  // ─── Topics ──────────────────────────────────────────────────
  { id: 'topic-grammar',      title: 'Grammar Guru',         desc: 'Complete 10 grammar topics',                emoji: '📐', xp: 200, category: 'topic',      condition: 'grammarTopicsCompleted >= 10' },
  { id: 'topic-vocab',        title: 'Word Wizard',          desc: 'Complete 5 vocabulary topics',              emoji: '🔮', xp: 150, category: 'topic',      condition: 'vocabTopicsCompleted >= 5' },
  { id: 'topic-speaking',     title: 'Confident Speaker',    desc: 'Complete 5 speaking lessons',               emoji: '🎤', xp: 150, category: 'topic',      condition: 'speakingTopicsCompleted >= 5' },
  { id: 'topic-writing',      title: 'Skilled Writer',       desc: 'Submit 5 writing exercises',                emoji: '✍️', xp: 150, category: 'topic',      condition: 'writingSubmissions >= 5' },

  // ─── Accuracy ────────────────────────────────────────────────
  { id: 'perfect-quiz',       title: 'Perfect Score',        desc: 'Score 100% on a quiz',                      emoji: '💯', xp: 200, category: 'accuracy',   condition: 'perfectScores >= 1' },
  { id: 'perfect-5',          title: 'Perfectionist',        desc: 'Score 100% on 5 different quizzes',         emoji: '⭐', xp: 400, category: 'accuracy',   condition: 'perfectScores >= 5' },
  { id: 'accuracy-90',        title: 'Sharp Mind',           desc: 'Achieve 90%+ accuracy in a session',        emoji: '🎯', xp: 150, category: 'accuracy',   condition: 'sessionAccuracy >= 90' },
  { id: 'accuracy-overall',   title: 'Consistent Learner',   desc: 'Maintain 80%+ overall accuracy',            emoji: '📊', xp: 300, category: 'accuracy',   condition: 'overallAccuracy >= 80' },

  // ─── XP & Levels ─────────────────────────────────────────────
  { id: 'xp-100',             title: 'XP Collector',         desc: 'Earn 100 XP',                               emoji: '⚡', xp: 0,   category: 'xp',         condition: 'totalXP >= 100' },
  { id: 'xp-500',             title: 'XP Hunter',            desc: 'Earn 500 XP',                               emoji: '⚡', xp: 0,   category: 'xp',         condition: 'totalXP >= 500' },
  { id: 'xp-1000',            title: 'XP Master',            desc: 'Earn 1,000 XP',                             emoji: '⚡', xp: 0,   category: 'xp',         condition: 'totalXP >= 1000' },
  { id: 'xp-5000',            title: 'XP Champion',          desc: 'Earn 5,000 XP',                             emoji: '💎', xp: 0,   category: 'xp',         condition: 'totalXP >= 5000' },
  { id: 'level-5',            title: 'Level 5',              desc: 'Reach level 5',                             emoji: '🆙', xp: 100, category: 'level',      condition: 'level >= 5' },
  { id: 'level-10',           title: 'Level 10',             desc: 'Reach level 10',                            emoji: '🆙', xp: 200, category: 'level',      condition: 'level >= 10' },
  { id: 'level-25',           title: 'Level 25',             desc: 'Reach level 25',                            emoji: '🆙', xp: 500, category: 'level',      condition: 'level >= 25' },
  { id: 'level-50',           title: 'Level 50',             desc: 'Reach level 50',                            emoji: '👑', xp: 1000,category: 'level',      condition: 'level >= 50' },

  // ─── Vocabulary ──────────────────────────────────────────────
  { id: 'words-10',           title: 'Vocabulary Starter',   desc: 'Learn 10 vocabulary words',                 emoji: '📗', xp: 50,  category: 'vocabulary', condition: 'totalWordsLearned >= 10' },
  { id: 'words-50',           title: 'Vocabulary Builder',   desc: 'Learn 50 vocabulary words',                 emoji: '📘', xp: 100, category: 'vocabulary', condition: 'totalWordsLearned >= 50' },
  { id: 'words-100',          title: 'Word Collector',       desc: 'Learn 100 vocabulary words',                emoji: '📙', xp: 200, category: 'vocabulary', condition: 'totalWordsLearned >= 100' },
  { id: 'words-500',          title: 'Vocabulary Master',    desc: 'Learn 500 vocabulary words',                emoji: '🏅', xp: 500, category: 'vocabulary', condition: 'totalWordsLearned >= 500' },

  // ─── Time Spent ───────────────────────────────────────────────
  { id: 'time-1h',            title: 'One Hour Down',        desc: 'Spend 1 hour studying',                     emoji: '⏱️', xp: 50,  category: 'time',       condition: 'totalTimeSpent >= 60' },
  { id: 'time-5h',            title: 'Five Hours Strong',    desc: 'Spend 5 hours studying',                    emoji: '⏱️', xp: 150, category: 'time',       condition: 'totalTimeSpent >= 300' },
  { id: 'time-24h',           title: '24 Hours Invested',    desc: 'Spend 24 hours studying',                   emoji: '⏱️', xp: 400, category: 'time',       condition: 'totalTimeSpent >= 1440' },

  // ─── CEFR Milestones ──────────────────────────────────────────
  { id: 'cefr-a1',            title: 'A1 Achieved',          desc: 'Reach CEFR level A1',                       emoji: '🔵', xp: 100, category: 'cefr',       condition: 'cefrLevel === "A1"' },
  { id: 'cefr-a2',            title: 'A2 Achieved',          desc: 'Reach CEFR level A2',                       emoji: '🟣', xp: 200, category: 'cefr',       condition: 'cefrLevel === "A2"' },
  { id: 'cefr-b1',            title: 'B1 Achieved',          desc: 'Reach CEFR level B1',                       emoji: '🟡', xp: 400, category: 'cefr',       condition: 'cefrLevel === "B1"' },
  { id: 'cefr-b2',            title: 'B2 Achieved',          desc: 'Reach CEFR level B2',                       emoji: '🔴', xp: 600, category: 'cefr',       condition: 'cefrLevel === "B2"' },
  { id: 'cefr-c1',            title: 'C1 Achieved',          desc: 'Reach CEFR level C1',                       emoji: '🌸', xp: 1000,category: 'cefr',       condition: 'cefrLevel === "C1"' },
  { id: 'cefr-c2',            title: 'C2 Mastery',           desc: 'Reach CEFR level C2 — near-native!',        emoji: '🔷', xp: 2000,category: 'cefr',       condition: 'cefrLevel === "C2"' },

  // ─── Social & Special ─────────────────────────────────────────
  { id: 'early-bird',         title: 'Early Bird',           desc: 'Study before 8 AM',                         emoji: '🌅', xp: 50,  category: 'special',    condition: 'studiedBeforeHour(8)' },
  { id: 'night-owl',          title: 'Night Owl',            desc: 'Study after 10 PM',                         emoji: '🦉', xp: 50,  category: 'special',    condition: 'studiedAfterHour(22)' },
  { id: 'weekend-warrior',    title: 'Weekend Warrior',      desc: 'Study on both Saturday and Sunday',         emoji: '🗓️', xp: 100, category: 'special',    condition: 'studiedOnWeekend' },
  { id: 'comeback-kid',       title: 'Comeback Kid',         desc: 'Return after a 7-day break',                emoji: '💪', xp: 75,  category: 'special',    condition: 'returnedAfterBreak' },
  { id: 'daily-goal',         title: 'Goal Achiever',        desc: 'Meet your daily study goal',                emoji: '🏅', xp: 30,  category: 'special',    condition: 'dailyGoalMet' },
  { id: 'daily-goal-7',       title: 'Goal Crusher',         desc: 'Meet your daily goal 7 days in a row',      emoji: '🏆', xp: 200, category: 'special',    condition: 'dailyGoalMetStreak >= 7' },
  { id: 'all-types',          title: 'All-Rounder',          desc: 'Complete a lesson from every topic type',   emoji: '🌈', xp: 300, category: 'special',    condition: 'allTopicTypesTried' },
  { id: 'speed-demon',        title: 'Speed Demon',          desc: 'Complete a quiz in under 2 minutes',        emoji: '⚡', xp: 100, category: 'special',    condition: 'quizUnder2Min' },
  { id: 'no-hints',           title: 'No Hints Needed',      desc: 'Complete a quiz without using any hints',   emoji: '🧠', xp: 100, category: 'special',    condition: 'quizNoHints' },
  { id: 'question-100',       title: 'Century Club',         desc: 'Answer 100 questions',                      emoji: '💯', xp: 150, category: 'milestone',  condition: 'totalQuestionsAttempted >= 100' },
  { id: 'question-1000',      title: 'Question Master',      desc: 'Answer 1,000 questions',                    emoji: '🎓', xp: 500, category: 'milestone',  condition: 'totalQuestionsAttempted >= 1000' },
];

/**
 * Get achievement by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export const getAchievement = (id) => ACHIEVEMENTS.find((a) => a.id === id);

/**
 * Get achievements by category
 * @param {string} category
 * @returns {Array}
 */
export const getAchievementsByCategory = (category) =>
  ACHIEVEMENTS.filter((a) => a.category === category);

/** All achievement categories */
export const ACHIEVEMENT_CATEGORIES = [
  'milestone', 'streak', 'lesson', 'topic', 'accuracy',
  'xp', 'level', 'vocabulary', 'time', 'cefr', 'special',
];

export default ACHIEVEMENTS;
