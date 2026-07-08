/**
 * Badge Definitions - 30+ collectible badges for the 75 Days Hard English app
 */

export const BADGES = [
  // ─── Streak Badges ────────────────────────────────────────────
  {
    id: 'streak-bronze',
    title: 'Bronze Streak',
    desc: '7-day study streak',
    emoji: '🥉',
    color: '#cd7f32',
    rarity: 'common',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'streak-silver',
    title: 'Silver Streak',
    desc: '14-day study streak',
    emoji: '🥈',
    color: '#c0c0c0',
    rarity: 'uncommon',
    category: 'streak',
    requirement: { type: 'streak', value: 14 },
  },
  {
    id: 'streak-gold',
    title: 'Gold Streak',
    desc: '30-day study streak',
    emoji: '🥇',
    color: '#ffd700',
    rarity: 'rare',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'streak-platinum',
    title: 'Platinum Streak',
    desc: '75-day study streak — the ultimate!',
    emoji: '💎',
    color: '#e5e4e2',
    rarity: 'legendary',
    category: 'streak',
    requirement: { type: 'streak', value: 75 },
  },

  // ─── Topic Mastery Badges ─────────────────────────────────────
  {
    id: 'grammar-master',
    title: 'Grammar Master',
    desc: 'Complete all grammar topics',
    emoji: '📐',
    color: '#6366f1',
    rarity: 'rare',
    category: 'mastery',
    requirement: { type: 'topicType', value: 'grammar', count: 10 },
  },
  {
    id: 'vocab-master',
    title: 'Vocabulary Master',
    desc: 'Learn 500 vocabulary words',
    emoji: '📚',
    color: '#8b5cf6',
    rarity: 'rare',
    category: 'mastery',
    requirement: { type: 'wordsLearned', value: 500 },
  },
  {
    id: 'speaking-star',
    title: 'Speaking Star',
    desc: 'Complete all speaking lessons',
    emoji: '🎤',
    color: '#10b981',
    rarity: 'uncommon',
    category: 'mastery',
    requirement: { type: 'topicType', value: 'spoken', count: 5 },
  },
  {
    id: 'writing-pro',
    title: 'Writing Pro',
    desc: 'Submit 10 writing exercises',
    emoji: '✍️',
    color: '#0ea5e9',
    rarity: 'uncommon',
    category: 'mastery',
    requirement: { type: 'writingSubmissions', value: 10 },
  },
  {
    id: 'pronunciation-ace',
    title: 'Pronunciation Ace',
    desc: 'Complete all pronunciation lessons',
    emoji: '🔊',
    color: '#f97316',
    rarity: 'uncommon',
    category: 'mastery',
    requirement: { type: 'topicType', value: 'pronunciation', count: 5 },
  },
  {
    id: 'reading-scholar',
    title: 'Reading Scholar',
    desc: 'Complete 10 reading passages',
    emoji: '📰',
    color: '#f59e0b',
    rarity: 'uncommon',
    category: 'mastery',
    requirement: { type: 'topicType', value: 'reading', count: 10 },
  },
  {
    id: 'listening-expert',
    title: 'Listening Expert',
    desc: 'Complete 10 listening exercises',
    emoji: '🎧',
    color: '#ec4899',
    rarity: 'uncommon',
    category: 'mastery',
    requirement: { type: 'topicType', value: 'listening', count: 10 },
  },

  // ─── CEFR Level Badges ────────────────────────────────────────
  {
    id: 'badge-a0',
    title: 'A0 Starter',
    desc: 'Begin the English journey',
    emoji: '🌱',
    color: '#10b981',
    rarity: 'common',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'A0' },
  },
  {
    id: 'badge-a1',
    title: 'A1 Beginner',
    desc: 'Reach A1 level',
    emoji: '🔵',
    color: '#3b82f6',
    rarity: 'common',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'A1' },
  },
  {
    id: 'badge-a2',
    title: 'A2 Elementary',
    desc: 'Reach A2 level',
    emoji: '🟣',
    color: '#8b5cf6',
    rarity: 'uncommon',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'A2' },
  },
  {
    id: 'badge-b1',
    title: 'B1 Intermediate',
    desc: 'Reach B1 level',
    emoji: '🟡',
    color: '#f59e0b',
    rarity: 'rare',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'B1' },
  },
  {
    id: 'badge-b2',
    title: 'B2 Upper-Int',
    desc: 'Reach B2 level',
    emoji: '🔴',
    color: '#ef4444',
    rarity: 'rare',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'B2' },
  },
  {
    id: 'badge-c1',
    title: 'C1 Advanced',
    desc: 'Reach C1 level — you are advanced!',
    emoji: '🌸',
    color: '#ec4899',
    rarity: 'epic',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'C1' },
  },
  {
    id: 'badge-c2',
    title: 'C2 Master',
    desc: 'Reach C2 — near-native mastery!',
    emoji: '👑',
    color: '#0ea5e9',
    rarity: 'legendary',
    category: 'cefr',
    requirement: { type: 'cefrLevel', value: 'C2' },
  },

  // ─── Performance Badges ───────────────────────────────────────
  {
    id: 'perfect-learner',
    title: 'Perfect Learner',
    desc: 'Get 5 perfect quiz scores',
    emoji: '💯',
    color: '#ffd700',
    rarity: 'rare',
    category: 'performance',
    requirement: { type: 'perfectScores', value: 5 },
  },
  {
    id: 'speed-runner',
    title: 'Speed Runner',
    desc: 'Complete a quiz in under 60 seconds',
    emoji: '⚡',
    color: '#f59e0b',
    rarity: 'uncommon',
    category: 'performance',
    requirement: { type: 'quizTime', value: 60, operator: 'lte' },
  },
  {
    id: 'accuracy-king',
    title: 'Accuracy King',
    desc: 'Maintain 95%+ accuracy over 50 questions',
    emoji: '🎯',
    color: '#10b981',
    rarity: 'epic',
    category: 'performance',
    requirement: { type: 'accuracyOver', questions: 50, value: 95 },
  },

  // ─── Special / Seasonal Badges ───────────────────────────────
  {
    id: 'early-adopter',
    title: 'Early Adopter',
    desc: 'One of the first users of the app',
    emoji: '🚀',
    color: '#6366f1',
    rarity: 'legendary',
    category: 'special',
    requirement: { type: 'earlyAdopter' },
  },
  {
    id: 'comeback-hero',
    title: 'Comeback Hero',
    desc: 'Return after a long break and keep going',
    emoji: '💪',
    color: '#ef4444',
    rarity: 'uncommon',
    category: 'special',
    requirement: { type: 'comeback', breakDays: 7 },
  },
  {
    id: 'all-rounder',
    title: 'All-Rounder',
    desc: 'Study every topic type at least once',
    emoji: '🌈',
    color: '#d946ef',
    rarity: 'rare',
    category: 'special',
    requirement: { type: 'allTopicTypes' },
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    desc: 'Study after midnight 3 times',
    emoji: '🦉',
    color: '#4f46e5',
    rarity: 'uncommon',
    category: 'special',
    requirement: { type: 'studyAfterMidnight', value: 3 },
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    desc: 'Study before 6 AM 3 times',
    emoji: '🌅',
    color: '#f97316',
    rarity: 'uncommon',
    category: 'special',
    requirement: { type: 'studyBefore6AM', value: 3 },
  },
  {
    id: 'challenge-complete',
    title: '75-Day Champion',
    desc: 'Complete the entire 75-day challenge!',
    emoji: '🏆',
    color: '#ffd700',
    rarity: 'legendary',
    category: 'special',
    requirement: { type: 'lessonsCompleted', value: 75 },
  },
];

/** Badge rarity tiers */
export const BADGE_RARITY = {
  COMMON:    { id: 'common',    label: 'Common',    color: '#9ca3af' },
  UNCOMMON:  { id: 'uncommon',  label: 'Uncommon',  color: '#10b981' },
  RARE:      { id: 'rare',      label: 'Rare',      color: '#3b82f6' },
  EPIC:      { id: 'epic',      label: 'Epic',      color: '#8b5cf6' },
  LEGENDARY: { id: 'legendary', label: 'Legendary', color: '#ffd700' },
};

/**
 * Get badge by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export const getBadge = (id) => BADGES.find((b) => b.id === id);

/**
 * Get badges by category
 * @param {string} category
 * @returns {Array}
 */
export const getBadgesByCategory = (category) => BADGES.filter((b) => b.category === category);

export default BADGES;
