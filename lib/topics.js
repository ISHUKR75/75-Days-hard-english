// Topics Data - Complete 75 Days curriculum structure
// Defines all topics, subtopics, and metadata for the learning platform

// ============================================================
// Topic Type Categories
// ============================================================
export const TOPIC_TYPES = {
  GRAMMAR:       'grammar',
  SPOKEN:        'spoken',
  PRONUNCIATION: 'pronunciation',
  VOCABULARY:    'vocabulary',
  WRITING:       'writing',
  LISTENING:     'listening',
  READING:       'reading',
  REAL_LIFE:     'real-life',
  PRACTICE:      'practice',
  REVISION:      'revision',
  PROFESSIONAL:  'professional',
};

// ============================================================
// Difficulty Levels
// ============================================================
export const DIFFICULTY = {
  BEGINNER:     'beginner',
  ELEMENTARY:   'elementary',
  INTERMEDIATE: 'intermediate',
  UPPER_INT:    'upper-intermediate',
  ADVANCED:     'advanced',
};

// ============================================================
// CEFR Levels
// ============================================================
export const CEFR = {
  A0: 'A0', A1: 'A1', A2: 'A2',
  B1: 'B1', B2: 'B2',
  C1: 'C1', C2: 'C2',
};

// ============================================================
// 75 Days Complete Topic List
// ============================================================
export const DAYS_75_TOPICS = [
  { day: 1,  title: 'Basics of English',              slug: '01-basics',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A0, emoji: '📚', color: '#6366f1' },
  { day: 2,  title: 'Self Introduction',              slug: '02-self-intro',         type: TOPIC_TYPES.SPOKEN,        difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '👋', color: '#8b5cf6' },
  { day: 3,  title: 'Imperative Sentence',            slug: '03-imperative',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '⚡', color: '#d946ef' },
  { day: 4,  title: 'Be Verb',                        slug: '04-be-verb',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🔤', color: '#ec4899' },
  { day: 5,  title: 'Demonstrative Pronoun',          slug: '05-demonstrative',      type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '👉', color: '#f43f5e' },
  { day: 6,  title: 'Has / Have',                     slug: '06-has-have',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '✋', color: '#f97316' },
  { day: 7,  title: 'Had',                            slug: '07-had',                type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '⏮️', color: '#f59e0b' },
  { day: 8,  title: 'Will Have',                      slug: '08-will-have',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A1, emoji: '🔮', color: '#eab308' },
  { day: 9,  title: 'Use of There',                   slug: '09-there',              type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A1, emoji: '📍', color: '#84cc16' },
  { day: 10, title: 'Revision + Practice',            slug: '10-revision-1',         type: TOPIC_TYPES.REVISION,      difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🔄', color: '#22c55e' },
  { day: 11, title: 'Use of Want',                    slug: '11-want',               type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A1, emoji: '💫', color: '#10b981' },
  { day: 12, title: 'Use of Wanted',                  slug: '12-wanted',             type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '💭', color: '#14b8a6' },
  { day: 13, title: 'Use of Let',                     slug: '13-let',                type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🤝', color: '#06b6d4' },
  { day: 14, title: "Use of Let's",                   slug: '14-lets',               type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🎯', color: '#0ea5e9' },
  { day: 15, title: 'Would Like To',                  slug: '15-would-like',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🙏', color: '#3b82f6' },
  { day: 16, title: 'Can',                            slug: '16-can',                type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '💪', color: '#6366f1' },
  { day: 17, title: 'Should',                         slug: '17-should',             type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '💡', color: '#8b5cf6' },
  { day: 18, title: 'May',                            slug: '18-may',                type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🌸', color: '#d946ef' },
  { day: 19, title: 'Must',                           slug: '19-must',               type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '⚠️', color: '#ec4899' },
  { day: 20, title: 'Revision + Speaking Practice',  slug: '20-revision-2',         type: TOPIC_TYPES.REVISION,      difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🎤', color: '#f43f5e' },
  { day: 21, title: 'Used To',                        slug: '21-used-to',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.A2, emoji: '📖', color: '#f97316' },
  { day: 22, title: 'Could',                          slug: '22-could',              type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.A2, emoji: '🔑', color: '#f59e0b' },
  { day: 23, title: 'Should Have',                    slug: '23-should-have',        type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '😔', color: '#eab308' },
  { day: 24, title: 'Must Have',                      slug: '24-must-have',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🤔', color: '#84cc16' },
  { day: 25, title: 'Could Have',                     slug: '25-could-have',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '💭', color: '#22c55e' },
  { day: 26, title: 'Would Have',                     slug: '26-would-have',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🌀', color: '#10b981' },
  { day: 27, title: 'May Have',                       slug: '27-may-have',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '❓', color: '#14b8a6' },
  { day: 28, title: 'Might Have',                     slug: '28-might-have',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🎭', color: '#06b6d4' },
  { day: 29, title: 'Will / Shall',                   slug: '29-will-shall',         type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🚀', color: '#0ea5e9' },
  { day: 30, title: 'Would + Ought To + Dare',        slug: '30-would-ought-dare',   type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '⚔️', color: '#3b82f6' },
  { day: 31, title: 'Revision',                       slug: '31-revision-3',         type: TOPIC_TYPES.REVISION,      difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🔄', color: '#6366f1' },
  { day: 32, title: 'Tenses Part 1',                  slug: '32-tenses-1',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '⏰', color: '#8b5cf6' },
  { day: 33, title: 'Tenses Part 2',                  slug: '33-tenses-2',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '⏱️', color: '#d946ef' },
  { day: 34, title: 'Tenses Part 3',                  slug: '34-tenses-3',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '🕰️', color: '#ec4899' },
  { day: 35, title: 'Tenses Part 4',                  slug: '35-tenses-4',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '⌛', color: '#f43f5e' },
  { day: 36, title: 'Prepositions Part 1',            slug: '36-prepositions-1',     type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '📌', color: '#f97316' },
  { day: 37, title: 'Prepositions Part 2',            slug: '37-prepositions-2',     type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '📍', color: '#f59e0b' },
  { day: 38, title: 'Has To / Have To',               slug: '38-has-have-to',        type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '✅', color: '#eab308' },
  { day: 39, title: 'Had To / Will Have To',          slug: '39-had-to-will-have-to',type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '📋', color: '#84cc16' },
  { day: 40, title: 'Make / Get',                     slug: '40-make-get',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🛠️', color: '#22c55e' },
  { day: 41, title: 'Going To',                       slug: '41-going-to',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🎯', color: '#10b981' },
  { day: 42, title: 'About To',                       slug: '42-about-to',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '⚡', color: '#14b8a6' },
  { day: 43, title: 'Want To / Wanted To',            slug: '43-want-to',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🌟', color: '#06b6d4' },
  { day: 44, title: 'Need To / Needed To',            slug: '44-need-to',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🎪', color: '#0ea5e9' },
  { day: 45, title: 'Fond Of',                        slug: '45-fond-of',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '❤️', color: '#3b82f6' },
  { day: 46, title: 'Able To',                        slug: '46-able-to',            type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '💪', color: '#6366f1' },
  { day: 47, title: 'Conjunctions',                   slug: '47-conjunctions',       type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🔗', color: '#8b5cf6' },
  { day: 48, title: 'WH Words',                       slug: '48-wh-words',           type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '❓', color: '#d946ef' },
  { day: 49, title: 'Passive Voice Part 1',           slug: '49-passive-1',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '🔄', color: '#ec4899' },
  { day: 50, title: 'Passive Voice Part 2',           slug: '50-passive-2',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '↩️', color: '#f43f5e' },
  { day: 51, title: 'Advance Level Sentences Part 1', slug: '51-advance-1',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ADVANCED,     cefr: CEFR.C1, emoji: '🏆', color: '#f97316' },
  { day: 52, title: 'Advance Level Sentences Part 2', slug: '52-advance-2',          type: TOPIC_TYPES.GRAMMAR,       difficulty: DIFFICULTY.ADVANCED,     cefr: CEFR.C1, emoji: '🎖️', color: '#f59e0b' },
  { day: 53, title: 'Verb List',                      slug: '53-verb-list',          type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '📝', color: '#eab308' },
  { day: 54, title: 'Idioms, Phrases & Proverbs',     slug: '54-idioms-phrases',     type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '💬', color: '#84cc16' },
  { day: 55, title: 'Important Vocabulary',           slug: '55-vocabulary-1',       type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '📖', color: '#22c55e' },
  { day: 56, title: 'Miscellaneous Vocabulary',       slug: '56-vocabulary-2',       type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🗂️', color: '#10b981' },
  { day: 57, title: 'Stationery Vocabulary',          slug: '57-stationery',         type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '✏️', color: '#14b8a6' },
  { day: 58, title: 'Foods Vocabulary & Tastes',      slug: '58-food-tastes',        type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🍕', color: '#06b6d4' },
  { day: 59, title: 'Relation & Weather Vocabulary',  slug: '59-relation-weather',   type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🌤️', color: '#0ea5e9' },
  { day: 60, title: 'Professions & Occupations',      slug: '60-professions',        type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '💼', color: '#3b82f6' },
  { day: 61, title: 'Buildings, Worms & Insects',     slug: '61-buildings-insects',  type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🏗️', color: '#6366f1' },
  { day: 62, title: 'Flowers & Fruits Vocabulary',    slug: '62-flowers-fruits',     type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🌸', color: '#8b5cf6' },
  { day: 63, title: 'Maths Vocabulary',               slug: '63-maths',              type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🔢', color: '#d946ef' },
  { day: 64, title: 'Body & Diseases Vocabulary',     slug: '64-body-diseases',      type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🏥', color: '#ec4899' },
  { day: 65, title: 'Industry Vocabulary',            slug: '65-industry',           type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '🏭', color: '#f43f5e' },
  { day: 66, title: 'Colours & Judiciary Vocabulary', slug: '66-colours-judiciary',  type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.BEGINNER,     cefr: CEFR.A1, emoji: '🎨', color: '#f97316' },
  { day: 67, title: 'Birds & Astrology Vocabulary',   slug: '67-birds-astrology',    type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.ELEMENTARY,   cefr: CEFR.A2, emoji: '🦅', color: '#f59e0b' },
  { day: 68, title: 'Factory & Sports Vocabulary',    slug: '68-factory-sports',     type: TOPIC_TYPES.VOCABULARY,    difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '⚽', color: '#eab308' },
  { day: 69, title: 'Application Writing',            slug: '69-application',        type: TOPIC_TYPES.WRITING,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '📝', color: '#84cc16' },
  { day: 70, title: 'Letter Writing',                 slug: '70-letter',             type: TOPIC_TYPES.WRITING,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '✉️', color: '#22c55e' },
  { day: 71, title: 'E-mail Writing',                 slug: '71-email',              type: TOPIC_TYPES.WRITING,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '📧', color: '#10b981' },
  { day: 72, title: 'Paragraph Writing',              slug: '72-paragraph',          type: TOPIC_TYPES.WRITING,       difficulty: DIFFICULTY.UPPER_INT,    cefr: CEFR.B2, emoji: '📄', color: '#14b8a6' },
  { day: 73, title: 'Notice Writing',                 slug: '73-notice',             type: TOPIC_TYPES.WRITING,       difficulty: DIFFICULTY.INTERMEDIATE, cefr: CEFR.B1, emoji: '📢', color: '#06b6d4' },
  { day: 74, title: 'Grammar + Vocabulary Full Rev.', slug: '74-full-revision',      type: TOPIC_TYPES.REVISION,      difficulty: DIFFICULTY.ADVANCED,     cefr: CEFR.C1, emoji: '📊', color: '#0ea5e9' },
  { day: 75, title: 'Complete Mock Test + Final Rev.', slug: '75-final-mock',        type: TOPIC_TYPES.PRACTICE,      difficulty: DIFFICULTY.ADVANCED,     cefr: CEFR.C1, emoji: '🏁', color: '#3b82f6' },
];

// ============================================================
// Additional Topics (Grammar, Spoken, Pronunciation, etc.)
// ============================================================
export const ADDITIONAL_GRAMMAR_TOPICS = [
  { id: 'gram-pos',           title: 'Parts of Speech',               slug: 'parts-of-speech',          cefr: CEFR.A1 },
  { id: 'gram-articles',      title: 'Articles (A, An, The)',         slug: 'articles',                 cefr: CEFR.A1 },
  { id: 'gram-pronouns',      title: 'Personal Pronouns',             slug: 'personal-pronouns',        cefr: CEFR.A1 },
  { id: 'gram-degrees',       title: 'Degrees of Comparison',         slug: 'degrees-comparison',       cefr: CEFR.A2 },
  { id: 'gram-adverbs',       title: 'Adverbs',                       slug: 'adverbs',                  cefr: CEFR.A2 },
  { id: 'gram-determiners',   title: 'Determiners',                   slug: 'determiners',              cefr: CEFR.A2 },
  { id: 'gram-quantifiers',   title: 'Quantifiers',                   slug: 'quantifiers',              cefr: CEFR.A2 },
  { id: 'gram-qtags',         title: 'Question Tags',                 slug: 'question-tags',            cefr: CEFR.B1 },
  { id: 'gram-sva',           title: 'Subject-Verb Agreement',        slug: 'subject-verb-agreement',   cefr: CEFR.A2 },
  { id: 'gram-conditionals',  title: 'Conditionals (0, 1, 2, 3)',     slug: 'conditionals',             cefr: CEFR.B1 },
  { id: 'gram-gerund',        title: 'Gerund',                        slug: 'gerund',                   cefr: CEFR.B1 },
  { id: 'gram-infinitive',    title: 'Infinitive',                    slug: 'infinitive',               cefr: CEFR.B1 },
  { id: 'gram-indirect',      title: 'Direct & Indirect Speech',      slug: 'direct-indirect-speech',   cefr: CEFR.B1 },
];

// ============================================================
// Spoken English Topics
// ============================================================
export const SPOKEN_TOPICS = [
  { id: 'sp-greetings',    title: 'Greetings',             slug: 'greetings',             cefr: CEFR.A0 },
  { id: 'sp-daily-conv',   title: 'Daily Conversation',    slug: 'daily-conversation',    cefr: CEFR.A1 },
  { id: 'sp-small-talk',   title: 'Small Talk',            slug: 'small-talk',            cefr: CEFR.A2 },
  { id: 'sp-office',       title: 'Office Conversation',   slug: 'office-conversation',   cefr: CEFR.B1 },
  { id: 'sp-interview',    title: 'Interview Conversation', slug: 'interview-english',    cefr: CEFR.B2 },
  { id: 'sp-phone',        title: 'Phone Conversation',    slug: 'phone-conversation',    cefr: CEFR.B1 },
  { id: 'sp-gd',           title: 'Group Discussion',      slug: 'group-discussion',      cefr: CEFR.B2 },
  { id: 'sp-public',       title: 'Public Speaking',       slug: 'public-speaking',       cefr: CEFR.C1 },
  { id: 'sp-debate',       title: 'Debate',                slug: 'debate',                cefr: CEFR.C1 },
  { id: 'sp-presentation', title: 'Presentation Skills',   slug: 'presentation-skills',   cefr: CEFR.C1 },
  { id: 'sp-confidence',   title: 'Confidence Building',   slug: 'confidence-building',   cefr: CEFR.B1 },
  { id: 'sp-storytelling', title: 'Storytelling',          slug: 'storytelling',          cefr: CEFR.B2 },
];

// ============================================================
// Pronunciation Topics
// ============================================================
export const PRONUNCIATION_TOPICS = [
  { id: 'pron-alphabet',  title: 'Alphabet Sounds',    slug: 'alphabet-sounds',   cefr: CEFR.A0 },
  { id: 'pron-phonics',   title: 'Phonics',            slug: 'phonics',           cefr: CEFR.A0 },
  { id: 'pron-ipa',       title: 'IPA Basics',         slug: 'ipa-basics',        cefr: CEFR.A1 },
  { id: 'pron-silent',    title: 'Silent Letters',     slug: 'silent-letters',    cefr: CEFR.A2 },
  { id: 'pron-stress',    title: 'Word Stress',        slug: 'word-stress',       cefr: CEFR.B1 },
  { id: 'pron-intonation',title: 'Intonation',         slug: 'intonation',        cefr: CEFR.B1 },
  { id: 'pron-rhythm',    title: 'Rhythm',             slug: 'rhythm',            cefr: CEFR.B2 },
  { id: 'pron-connected', title: 'Connected Speech',   slug: 'connected-speech',  cefr: CEFR.C1 },
  { id: 'pron-minimal',   title: 'Minimal Pairs',      slug: 'minimal-pairs',     cefr: CEFR.A2 },
];

// ============================================================
// Helper Functions
// ============================================================

// Get topic by day number
export const getTopicByDay = (day) => {
  return DAYS_75_TOPICS.find((t) => t.day === day) || null;
};

// Get topic by slug
export const getTopicBySlug = (slug) => {
  return DAYS_75_TOPICS.find((t) => t.slug === slug) || null;
};

// Get all revision days
export const getRevisionDays = () => {
  return DAYS_75_TOPICS.filter((t) => t.type === TOPIC_TYPES.REVISION);
};

// Get topics by CEFR level
export const getTopicsByCEFR = (level) => {
  return DAYS_75_TOPICS.filter((t) => t.cefr === level);
};

// Get topics by difficulty
export const getTopicsByDifficulty = (diff) => {
  return DAYS_75_TOPICS.filter((t) => t.difficulty === diff);
};

// Get topics by type
export const getTopicsByType = (type) => {
  return DAYS_75_TOPICS.filter((t) => t.type === type);
};

// Group topics by week
export const getWeeklyTopics = () => {
  const weeks = [];
  for (let i = 0; i < 11; i++) {
    const start = i * 7;
    const end = Math.min(start + 7, DAYS_75_TOPICS.length);
    weeks.push({
      week: i + 1,
      days: DAYS_75_TOPICS.slice(start, end),
    });
  }
  return weeks;
};

export default DAYS_75_TOPICS;
