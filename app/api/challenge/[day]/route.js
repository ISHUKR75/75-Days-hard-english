// ============================================================
// API Route: /api/challenge/[day]
// Reads all data files for a specific day from data/challenge/day-XX/
// Returns combined JSON with topic, content, vocabulary, practice, mockTest
// ============================================================

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── Static topic map for all 75 days ────────────────────────────────────────
const TOPICS_MAP = {
  1:  { title: 'Basics of English',                emoji: '📚', cefr: 'A0', difficulty: 'beginner',     type: 'grammar'    },
  2:  { title: 'Self Introduction',                emoji: '👋', cefr: 'A1', difficulty: 'beginner',     type: 'spoken'     },
  3:  { title: 'Imperative Sentence',              emoji: '⚡', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  4:  { title: 'Be Verb',                          emoji: '🔤', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  5:  { title: 'Demonstrative Pronoun',            emoji: '👉', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  6:  { title: 'Has / Have',                       emoji: '✋', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  7:  { title: 'Had',                              emoji: '⏮️', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  8:  { title: 'Will Have',                        emoji: '🔮', cefr: 'A1', difficulty: 'elementary',   type: 'grammar'    },
  9:  { title: 'Use of There',                     emoji: '📍', cefr: 'A1', difficulty: 'elementary',   type: 'grammar'    },
  10: { title: 'Revision + Practice',              emoji: '🔄', cefr: 'A1', difficulty: 'beginner',     type: 'revision'   },
  11: { title: 'Use of Want',                      emoji: '💫', cefr: 'A1', difficulty: 'elementary',   type: 'grammar'    },
  12: { title: 'Use of Wanted',                    emoji: '💭', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  13: { title: 'Use of Let',                       emoji: '🤝', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  14: { title: "Use of Let's",                     emoji: '🎯', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  15: { title: 'Would Like To',                    emoji: '🙏', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  16: { title: 'Can',                              emoji: '💪', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  17: { title: 'Should',                           emoji: '💡', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  18: { title: 'May',                              emoji: '🌸', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  19: { title: 'Must',                             emoji: '⚠️', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  20: { title: 'Revision + Speaking Practice',     emoji: '🎤', cefr: 'A2', difficulty: 'elementary',   type: 'revision'   },
  21: { title: 'Used To',                          emoji: '🕰️', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  22: { title: 'Could',                            emoji: '🌟', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  23: { title: 'Should Have',                      emoji: '😔', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  24: { title: 'Must Have',                        emoji: '🔍', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  25: { title: 'Could Have',                       emoji: '🤔', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  26: { title: 'Would Have',                       emoji: '💭', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  27: { title: 'May Have',                         emoji: '🌿', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  28: { title: 'Might Have',                       emoji: '🎲', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  29: { title: 'Will / Shall',                     emoji: '🚀', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  30: { title: 'Would + Ought To + Dare',          emoji: '⚔️', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  31: { title: 'Revision',                         emoji: '📝', cefr: 'B1', difficulty: 'intermediate', type: 'revision'   },
  32: { title: 'Tenses Part 1',                    emoji: '⏰', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  33: { title: 'Tenses Part 2',                    emoji: '📅', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  34: { title: 'Tenses Part 3',                    emoji: '📆', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  35: { title: 'Tenses Part 4',                    emoji: '🗓️', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  36: { title: 'Prepositions Part 1',              emoji: '📌', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  37: { title: 'Prepositions Part 2',              emoji: '🗺️', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  38: { title: 'Has To / Have To',                 emoji: '✅', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  39: { title: 'Had To / Will Have To',            emoji: '⚙️', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  40: { title: 'Make / Get',                       emoji: '🔧', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  41: { title: 'Going To',                         emoji: '🏃', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  42: { title: 'About To',                         emoji: '⏳', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  43: { title: 'Want To / Wanted To',              emoji: '🎯', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  44: { title: 'Need To / Needed To',              emoji: '📋', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  45: { title: 'Fond Of',                          emoji: '❤️', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  46: { title: 'Able To',                          emoji: '🦾', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  47: { title: 'Conjunctions',                     emoji: '🔗', cefr: 'A2', difficulty: 'elementary',   type: 'grammar'    },
  48: { title: 'WH Words',                         emoji: '❓', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  49: { title: 'Passive Voice Part 1',             emoji: '🔄', cefr: 'B1', difficulty: 'intermediate', type: 'grammar'    },
  50: { title: 'Passive Voice Part 2',             emoji: '↩️', cefr: 'B2', difficulty: 'upper_int',   type: 'grammar'    },
  51: { title: 'Advance Level Sentences Part 1',   emoji: '🎓', cefr: 'B2', difficulty: 'upper_int',   type: 'grammar'    },
  52: { title: 'Advance Level Sentences Part 2',   emoji: '🏆', cefr: 'C1', difficulty: 'advanced',    type: 'grammar'    },
  53: { title: 'Verb List',                        emoji: '📖', cefr: 'A1', difficulty: 'beginner',     type: 'grammar'    },
  54: { title: 'Idioms, Phrases & Proverbs',       emoji: '💬', cefr: 'B2', difficulty: 'upper_int',   type: 'vocabulary' },
  55: { title: 'Important Vocabulary',             emoji: '📌', cefr: 'B1', difficulty: 'intermediate', type: 'vocabulary' },
  56: { title: 'Miscellaneous Vocabulary',         emoji: '🗂️', cefr: 'B1', difficulty: 'intermediate', type: 'vocabulary' },
  57: { title: 'Stationery Vocabulary',            emoji: '✏️', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  58: { title: 'Foods Vocabulary & Tastes',        emoji: '🍕', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  59: { title: 'Relation & Weather Vocabulary',    emoji: '🌤️', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  60: { title: 'Professions & Occupations',        emoji: '💼', cefr: 'A2', difficulty: 'elementary',   type: 'vocabulary' },
  61: { title: 'Buildings, Worms & Insects',       emoji: '🏗️', cefr: 'A2', difficulty: 'elementary',   type: 'vocabulary' },
  62: { title: 'Flowers & Fruits Vocabulary',      emoji: '🌸', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  63: { title: 'Maths Vocabulary',                 emoji: '🔢', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  64: { title: 'Body & Diseases Vocabulary',       emoji: '🏥', cefr: 'A2', difficulty: 'elementary',   type: 'vocabulary' },
  65: { title: 'Industry Vocabulary',              emoji: '🏭', cefr: 'B1', difficulty: 'intermediate', type: 'vocabulary' },
  66: { title: 'Colours & Judiciary Vocabulary',   emoji: '🎨', cefr: 'A1', difficulty: 'beginner',     type: 'vocabulary' },
  67: { title: 'Birds & Astrology Vocabulary',     emoji: '🦅', cefr: 'A2', difficulty: 'elementary',   type: 'vocabulary' },
  68: { title: 'Factory & Sports Vocabulary',      emoji: '⚽', cefr: 'B1', difficulty: 'intermediate', type: 'vocabulary' },
  69: { title: 'Application Writing',              emoji: '📝', cefr: 'B2', difficulty: 'upper_int',   type: 'writing'    },
  70: { title: 'Letter Writing',                   emoji: '✉️', cefr: 'B2', difficulty: 'upper_int',   type: 'writing'    },
  71: { title: 'E-mail Writing',                   emoji: '📧', cefr: 'B2', difficulty: 'upper_int',   type: 'writing'    },
  72: { title: 'Paragraph Writing',                emoji: '📄', cefr: 'B2', difficulty: 'upper_int',   type: 'writing'    },
  73: { title: 'Notice Writing',                   emoji: '📢', cefr: 'B1', difficulty: 'intermediate', type: 'writing'    },
  74: { title: 'Grammar + Vocabulary Full Rev.',   emoji: '📊', cefr: 'C1', difficulty: 'advanced',    type: 'revision'   },
  75: { title: 'Complete Mock Test + Final Rev.',  emoji: '🏁', cefr: 'C1', difficulty: 'advanced',    type: 'practice'   },
};

// ── Helper: safely read and parse a JSON file ─────────────────────────────
function readJSON(filePath) {
  // Returns parsed object or null if file missing/invalid
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ── Helper: extract vocabulary array from various formats ─────────────────
function extractVocabulary(vocabData) {
  if (!vocabData) return [];
  // Format 1: { words: [...] }
  if (Array.isArray(vocabData.words)) return vocabData.words;
  // Format 2: direct array
  if (Array.isArray(vocabData)) return vocabData;
  // Format 3: { categories: [...], words: [...] }
  return [];
}

// ── Helper: extract practice questions array from various formats ─────────
function extractPractice(practiceData) {
  if (!practiceData) return [];
  if (Array.isArray(practiceData.questions)) return practiceData.questions;
  if (Array.isArray(practiceData)) return practiceData;
  return [];
}

// ── Helper: extract mock test questions ──────────────────────────────────
function extractMockTest(testData) {
  if (!testData) return [];
  if (Array.isArray(testData.questions)) return testData.questions;
  if (Array.isArray(testData)) return testData;
  return [];
}

// ── Helper: build content object from lessons.json ───────────────────────
function buildContent(lessonsData) {
  if (!lessonsData) return null;

  // If lessons.json has a "sections" array (old format), transform it
  if (Array.isArray(lessonsData.sections)) {
    const sections = lessonsData.sections;
    const first = sections[0] || {};

    // Build a rich content object from all sections
    return {
      title: lessonsData.title || '',
      explanation: sections.map(s =>
        `**${s.title}**\n${s.hindiTitle ? `(${s.hindiTitle})\n` : ''}${s.explanation}\n\n📐 Formula: ${s.formula || ''}`
      ).join('\n\n---\n\n'),
      rules: sections.flatMap(s => [
        `${s.title}: ${s.formula || ''}`,
        ...(s.keyRules || []),
      ]).filter(Boolean),
      examples: sections.flatMap(s =>
        (s.examples || []).map(ex => ({
          hindi: ex.hindi,
          english: ex.english,
          type: s.title,
        }))
      ),
      mistakes: sections.flatMap(s => s.commonErrors || []),
      memoryTrick: sections.find(s => s.memoryTrick)?.memoryTrick || '',
      vocabulary: sections.flatMap(s => s.vocabulary || []),
      speakingTips: sections.flatMap(s => s.speakingTips || []),
      // Pass all raw sections for rich rendering
      sections: sections,
    };
  }

  // If lessons.json already has direct fields (new format from gen_day*.js)
  if (lessonsData.lessons) {
    return {
      title: lessonsData.title || '',
      explanation: (lessonsData.lessons || []).map(l =>
        `**${l.title}**\n${l.theory || l.theoryHindi || ''}`
      ).join('\n\n'),
      rules: (lessonsData.lessons || []).flatMap(l => l.keyRules || []),
      examples: (lessonsData.lessons || []).flatMap(l =>
        (l.examples || []).map(ex => ({
          hindi: ex.hindi,
          english: ex.english,
          type: l.title,
        }))
      ),
      mistakes: [],
      memoryTrick: '',
      vocabulary: [],
      speakingTips: [],
      sections: lessonsData.lessons,
    };
  }

  // Return as-is with defaults
  return {
    title: lessonsData.title || '',
    explanation: lessonsData.explanation || '',
    rules: lessonsData.rules || [],
    examples: lessonsData.examples || [],
    mistakes: lessonsData.mistakes || [],
    memoryTrick: lessonsData.memoryTrick || '',
    vocabulary: lessonsData.vocabulary || [],
    speakingTips: lessonsData.speakingTips || [],
    sections: lessonsData.sections || [],
  };
}

// ── Main API handler ──────────────────────────────────────────────────────
export async function GET(request, { params }) {
  // Await params (Next.js 15+ requirement)
  const resolvedParams = await params;
  const dayRaw = resolvedParams.day;
  const dayNum = parseInt(dayRaw, 10);

  if (!dayNum || dayNum < 1 || dayNum > 75) {
    return NextResponse.json(
      { error: `Invalid day: ${dayRaw}. Must be 1-75.` },
      { status: 400 }
    );
  }

  // Build the path to data/challenge/day-XX/
  const padded = String(dayNum).padStart(2, '0');
  const dirPath = path.join(process.cwd(), 'data', 'challenge', `day-${padded}`);

  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    // Return a placeholder response so the page still renders
    return NextResponse.json({
      topic: TOPICS_MAP[dayNum] || { title: `Day ${dayNum}`, emoji: '📖', cefr: 'A1', difficulty: 'beginner', type: 'grammar' },
      content: {
        title: `Day ${dayNum} — Content Coming Soon`,
        explanation: 'Content for this day is being prepared. Please check back soon.',
        rules: [],
        examples: [],
        mistakes: [],
        memoryTrick: '',
        vocabulary: [],
        speakingTips: [],
        sections: [],
      },
      vocabulary: [],
      practice: [],
      mockTest: [],
      speaking: null,
      writing: null,
      listening: null,
      reading: null,
      revision: null,
      morningRoutine: null,
      milestones: null,
      meta: { dayNum, padded, dirPath, status: 'content_pending' },
    });
  }

  // Read all data files for this day
  const lessonsData      = readJSON(path.join(dirPath, 'lessons.json'));
  const vocabData        = readJSON(path.join(dirPath, 'vocabulary.json'));
  const practiceData     = readJSON(path.join(dirPath, 'practice-questions.json'));
  const testData         = readJSON(path.join(dirPath, 'daily-test.json'));
  const speakingData     = readJSON(path.join(dirPath, 'speaking-drill.json'));
  const writingData      = readJSON(path.join(dirPath, 'writing-exercise.json'));
  const listeningData    = readJSON(path.join(dirPath, 'listening-exercise.json'));
  const readingData      = readJSON(path.join(dirPath, 'reading-exercise.json'));
  const revisionData     = readJSON(path.join(dirPath, 'revision.json'));
  const morningData      = readJSON(path.join(dirPath, 'morning-routine.json'));
  const milestonesData   = readJSON(path.join(dirPath, 'milestones.json'));
  const overviewData     = readJSON(path.join(dirPath, 'overview.json'));
  const challengeData    = readJSON(path.join(dirPath, 'challenge.json'));
  const metaData         = readJSON(path.join(dirPath, 'meta.json'));

  // Build the combined response
  const responseData = {
    // Topic info (from static map + meta override)
    topic: {
      ...(TOPICS_MAP[dayNum] || { title: `Day ${dayNum}`, emoji: '📖', cefr: 'A1', difficulty: 'beginner', type: 'grammar' }),
      ...(metaData?.topic || {}),
    },

    // Grammar content built from lessons.json
    content: buildContent(lessonsData),

    // Vocabulary words array
    vocabulary: extractVocabulary(vocabData),

    // Practice questions for translation quiz
    practice: extractPractice(practiceData),

    // Mock test MCQ questions
    mockTest: extractMockTest(testData),

    // Additional modules
    speaking:      speakingData,
    writing:       writingData,
    listening:     listeningData,
    reading:       readingData,
    revision:      revisionData,
    morningRoutine: morningData,
    milestones:    milestonesData,
    overview:      overviewData,
    challenge:     challengeData,
    meta:          metaData,

    // Stats for the UI
    stats: {
      practiceCount:    extractPractice(practiceData).length,
      vocabularyCount:  extractVocabulary(vocabData).length,
      mockTestCount:    extractMockTest(testData).length,
      dayNum,
    },
  };

  return NextResponse.json(responseData);
}
