/**
 * CEFR Level Definitions - Common European Framework of Reference for Languages
 * Defines all 7 levels (A0–C2) with descriptions, skills, XP thresholds, and metadata.
 */

/**
 * Complete CEFR level definitions
 * @type {Array<Object>}
 */
export const CEFR_LEVELS = [
  {
    id: 'A0',
    label: 'A0',
    name: 'Pre-Beginner',
    nameHi: 'प्रारंभिक',
    color: '#10b981',
    emoji: '🌱',
    xpMin: 0,
    xpMax: 500,
    daysRange: '1–10',
    description: 'Knows basic greetings, numbers, and the alphabet. No prior English knowledge assumed.',
    canDo: [
      'Understand and use very basic phrases',
      'Introduce yourself and answer basic questions',
      'Interact simply when the other person speaks slowly',
    ],
    topics: ['Alphabet', 'Numbers', 'Colors', 'Basic greetings', 'Days & months'],
    skills: { reading: 1, writing: 1, speaking: 1, listening: 1, grammar: 1 },
  },
  {
    id: 'A1',
    label: 'A1',
    name: 'Beginner',
    nameHi: 'शुरुआती',
    color: '#3b82f6',
    emoji: '🔤',
    xpMin: 500,
    xpMax: 1500,
    daysRange: '1–20',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    canDo: [
      'Understand simple sentences about everyday topics',
      'Describe your family, home and daily routine',
      'Ask and answer simple questions',
    ],
    topics: ['Be Verb', 'Simple Present', 'Demonstrative pronouns', 'Has/Have', 'Basic vocabulary'],
    skills: { reading: 2, writing: 2, speaking: 2, listening: 2, grammar: 2 },
  },
  {
    id: 'A2',
    label: 'A2',
    name: 'Elementary',
    nameHi: 'प्रारंभिक स्तर',
    color: '#8b5cf6',
    emoji: '📖',
    xpMin: 1500,
    xpMax: 4000,
    daysRange: '21–35',
    description: 'Can communicate in simple and routine tasks requiring a direct exchange of information.',
    canDo: [
      'Understand sentences on familiar topics',
      'Describe your background and immediate environment',
      'Communicate in simple and routine tasks',
    ],
    topics: ['Past Simple', 'Future tense', 'Modal verbs', 'Can/Could', 'Shopping & travel'],
    skills: { reading: 3, writing: 3, speaking: 3, listening: 3, grammar: 3 },
  },
  {
    id: 'B1',
    label: 'B1',
    name: 'Intermediate',
    nameHi: 'मध्यम स्तर',
    color: '#f59e0b',
    emoji: '🎯',
    xpMin: 4000,
    xpMax: 8000,
    daysRange: '36–50',
    description: 'Can understand the main points of clear standard input on familiar matters.',
    canDo: [
      'Understand main points of standard speech',
      'Deal with most travel situations',
      'Produce simple connected text on familiar topics',
      'Describe experiences, events, and ambitions',
    ],
    topics: ['Perfect tenses', 'Conditionals', 'Passive voice', 'Reported speech', 'Complex sentences'],
    skills: { reading: 4, writing: 4, speaking: 4, listening: 4, grammar: 5 },
  },
  {
    id: 'B2',
    label: 'B2',
    name: 'Upper-Intermediate',
    nameHi: 'उच्च मध्यम स्तर',
    color: '#ef4444',
    emoji: '🚀',
    xpMin: 8000,
    xpMax: 15000,
    daysRange: '51–62',
    description: 'Can understand the main ideas of complex text on both concrete and abstract topics.',
    canDo: [
      'Understand complex texts including technical discussions',
      'Interact with native speakers without strain',
      'Produce clear, detailed text on a wide range of subjects',
    ],
    topics: ['Advanced conditionals', 'Discourse markers', 'Formal writing', 'Idioms', 'Academic English'],
    skills: { reading: 6, writing: 6, speaking: 6, listening: 6, grammar: 7 },
  },
  {
    id: 'C1',
    label: 'C1',
    name: 'Advanced',
    nameHi: 'उन्नत स्तर',
    color: '#ec4899',
    emoji: '🌟',
    xpMin: 15000,
    xpMax: 25000,
    daysRange: '63–70',
    description: 'Can understand a wide range of demanding, longer texts and recognize implicit meaning.',
    canDo: [
      'Express ideas fluently and spontaneously',
      'Use language flexibly for social, academic and professional purposes',
      'Produce clear, well-structured and detailed text on complex subjects',
    ],
    topics: ['Nuanced grammar', 'Professional English', 'Academic writing', 'Complex discourse', 'Collocations'],
    skills: { reading: 8, writing: 8, speaking: 8, listening: 8, grammar: 9 },
  },
  {
    id: 'C2',
    label: 'C2',
    name: 'Mastery',
    nameHi: 'निपुणता स्तर',
    color: '#0ea5e9',
    emoji: '👑',
    xpMin: 25000,
    xpMax: Infinity,
    daysRange: '71–75',
    description: 'Can understand with ease virtually everything heard or read. Near-native proficiency.',
    canDo: [
      'Understand virtually everything with ease',
      'Summarize complex information from different sources',
      'Express yourself spontaneously with precision',
    ],
    topics: ['Native-level idioms', 'Literature', 'Rhetorical devices', 'Complex argumentation', 'Style'],
    skills: { reading: 10, writing: 10, speaking: 10, listening: 10, grammar: 10 },
  },
];

/**
 * Get CEFR level object by ID
 * @param {string} levelId - e.g. 'A1', 'B2'
 * @returns {Object|undefined}
 */
export const getCEFRLevel = (levelId) => CEFR_LEVELS.find((l) => l.id === levelId);

/**
 * Get CEFR level from total XP
 * @param {number} xp
 * @returns {Object}
 */
export const getCEFRLevelFromXP = (xp) =>
  CEFR_LEVELS.slice().reverse().find((l) => xp >= l.xpMin) || CEFR_LEVELS[0];

/** Ordered list of level IDs */
export const CEFR_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default CEFR_LEVELS;
