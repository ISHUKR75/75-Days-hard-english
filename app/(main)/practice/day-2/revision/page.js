'use client';
// ============================================================
// Day 2 — Revision / Summary Page
// Complete revision notes, cheat sheet, grammar rules,
// common mistakes, memory tricks, and practice session.
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  RotateCcw, ArrowLeft, BookOpen, CheckCircle2, XCircle,
  Lightbulb, Star, Target, ChevronDown, ChevronUp,
  Brain, Zap, AlertTriangle, Award, Sparkles, FileText,
  Eye, EyeOff, Volume2, Check, X
} from 'lucide-react';

// All revision data hardcoded for instant load, backed by real Day 2 content
const REVISION_DATA = {
  topicOverview: {
    day: 2,
    topic: 'Self Introduction',
    cefr: 'A1',
    description: 'Apna confident aur professional introduction dena sabse basic aur important English skill hai.',
  },

  // The 6-part PEFHGL formula
  formula: {
    title: 'The PERFECT Formula — PEFHGL',
    parts: [
      { letter: 'P', stands: 'Personal — Name + Age + City', example: 'My name is Rahul. I am 25. I am from Delhi.' },
      { letter: 'E', stands: 'Education — Degree + College + Year + Score', example: 'I completed my B.Tech from DTU in 2022 with 8.5 CGPA.' },
      { letter: 'F', stands: 'Field — Job + Company + Duration', example: 'I work as a developer at TCS for 2 years.' },
      { letter: 'H', stands: 'Hobbies — 2-3 interests briefly', example: 'I love reading and playing cricket.' },
      { letter: 'G', stands: 'Goals — Short or long-term', example: 'My goal is to become a senior developer.' },
      { letter: 'L', stands: 'Looking Forward — Closing statement', example: 'I look forward to working with your team.' },
    ]
  },

  // Key sentence patterns
  patterns: [
    {
      title: 'Name Introduction (5 Ways)',
      patterns: [
        { formula: 'My name is [Full Name].', example: 'My name is Rohan Sharma.', use: 'Most formal — interviews, meetings' },
        { formula: 'I am [Name].', example: 'I am Priya.', use: 'Standard — office, classroom' },
        { formula: "I'm [Name].", example: "I'm Aman.", use: 'Informal — friends, casual' },
        { formula: 'My friends call me [Nickname].', example: 'My friends call me Vicky.', use: 'For nickname' },
        { formula: 'You can call me [Name].', example: 'You can call me Raj.', use: 'Inviting informality' },
      ]
    },
    {
      title: 'Origin / City (5 Ways)',
      patterns: [
        { formula: 'I am from [City/State].', example: 'I am from Delhi.', use: 'Most common' },
        { formula: 'I belong to [Place].', example: 'I belong to Lucknow.', use: 'Formal' },
        { formula: 'I come from [Place].', example: 'I come from a small town in Bihar.', use: 'Natural' },
        { formula: 'I was born in [Place].', example: 'I was born in Patna.', use: 'Birthplace — PAST tense!' },
        { formula: 'I hail from [Place].', example: 'I hail from Rajasthan.', use: 'Formal/literary' },
      ]
    },
    {
      title: 'Education',
      patterns: [
        { formula: 'I completed my [Degree] from [College] in [Year].', example: 'I completed my B.Tech from DTU in 2022.', use: 'Standard' },
        { formula: 'I graduated from [College] in [Year].', example: 'I graduated from Delhi University in 2021.', use: 'Standard' },
        { formula: 'I am pursuing a [Degree] in [Subject].', example: 'I am pursuing an MBA in Finance.', use: 'Currently studying' },
        { formula: 'I hold a [Degree] in [Subject].', example: 'I hold a degree in Computer Science.', use: 'Formal' },
      ]
    },
    {
      title: 'Profession / Work',
      patterns: [
        { formula: 'I am a [Profession].', example: 'I am a software engineer.', use: 'Simple, direct' },
        { formula: 'I work at [Company].', example: 'I work at TCS.', use: 'Specific company — use AT' },
        { formula: 'I work as a [Role].', example: 'I work as a data analyst.', use: 'Emphasizes the role' },
        { formula: 'I work in the [Industry].', example: 'I work in the IT sector.', use: 'Industry — use IN' },
        { formula: 'I have been working at [Company] for [Time].', example: 'I have been working at Infosys for 3 years.', use: 'Work duration' },
      ]
    },
    {
      title: 'Hobbies and Interests',
      patterns: [
        { formula: 'I love/enjoy/like [verb+ing].', example: 'I love playing cricket.', use: 'After love/enjoy/like → gerund' },
        { formula: 'I am passionate about [noun/gerund].', example: 'I am passionate about technology.', use: 'Deep interest' },
        { formula: 'I am interested in [noun].', example: 'I am interested in photography.', use: "Always 'in', never 'to'" },
        { formula: 'I am fond of [gerund].', example: 'I am fond of reading.', use: "After 'of' → gerund" },
        { formula: 'My hobby is [gerund].', example: 'My hobby is painting.', use: 'One hobby — singular IS' },
        { formula: 'My hobbies are [gerund] and [gerund].', example: 'My hobbies are reading and cooking.', use: 'Multiple — plural ARE' },
      ]
    },
    {
      title: 'Goals and Closing',
      patterns: [
        { formula: 'My goal is to [infinitive].', example: 'My goal is to become a manager.', use: 'Clear goal statement' },
        { formula: 'I look forward to [gerund].', example: 'I look forward to working with you.', use: 'Formal closing' },
        { formula: 'I am excited about this opportunity.', example: 'I am excited about this opportunity.', use: 'Interview/office closing' },
        { formula: 'I believe my skills align with this role.', example: 'I believe my skills align perfectly with this role.', use: 'Interview confidence' },
        { formula: 'Thank you for this opportunity.', example: 'Thank you for this opportunity.', use: 'Formal thanks' },
      ]
    }
  ],

  // Top 20 mistakes cheat sheet
  top20Mistakes: [
    { wrong: 'Myself Rahul', correct: 'My name is Rahul', rule: 'Never use "Myself" for introduction' },
    { wrong: 'My good name is...', correct: 'My name is...', rule: '"Good name" = Indian English. Not used in standard English.' },
    { wrong: 'I am born in Delhi', correct: 'I was born in Delhi', rule: 'Birth = past event → PAST TENSE' },
    { wrong: 'I am belong to Delhi', correct: 'I belong to Delhi', rule: "'Belong' is main verb — no 'am' before it" },
    { wrong: 'I am doing job in TCS', correct: 'I work at TCS', rule: '"Doing job" = wrong. Use "work at"' },
    { wrong: 'I am working since 3 years', correct: 'I have been working for 3 years', rule: 'Duration → FOR. Present Perfect Continuous.' },
    { wrong: 'I have joined in 2022', correct: 'I joined in 2022', rule: 'Specific year → Simple Past (not Present Perfect)' },
    { wrong: 'My hobby are reading', correct: 'My hobbies are reading', rule: 'Multiple hobbies = plural = ARE' },
    { wrong: 'I am interested to music', correct: 'I am interested IN music', rule: 'Interested → always IN' },
    { wrong: 'I am fond of to read', correct: 'I am fond of reading', rule: "After 'of' → GERUND (-ing)" },
    { wrong: 'I am having a wife', correct: 'I have a wife', rule: "'Have' for possession = no -ing form (stative verb)" },
    { wrong: 'Two childrens', correct: 'Two children', rule: "Irregular plural: child → children (no 's')" },
    { wrong: 'I am liking this company', correct: 'I like this company', rule: "Stative verbs (like, love, know, want) → NO -ing" },
    { wrong: '2 years back', correct: '2 years ago', rule: 'Standard English: "ago", not "back"' },
    { wrong: 'Passed out from college', correct: 'Graduated from college', rule: '"Passed out" = fainted in standard English!' },
    { wrong: 'I work in Google', correct: 'I work at Google', rule: 'Specific company → AT. Industry → IN' },
    { wrong: 'a IT professional', correct: 'an IT professional', rule: 'A/AN rule = SOUND not spelling. IT = "Eye-Tee" = vowel sound' },
    { wrong: 'Very much excited', correct: 'Very excited', rule: '"Very much" before verbs, not adjectives' },
    { wrong: 'Nice to meet to you', correct: 'Nice to meet you', rule: 'No extra "to" before "you"' },
    { wrong: 'I am working from last 3 years', correct: 'I have been working for the last 3 years', rule: 'FOR + duration. Present Perfect Continuous.' },
  ],

  // Grammar tips
  grammarRules: [
    {
      title: 'FOR vs SINCE',
      rule: 'FOR + duration (3 years, 6 months, a week). SINCE + point in time (2020, January, last Monday).',
      examples: [
        'I have been working here FOR 3 years. ✓',
        'I have been working here SINCE 2021. ✓',
        'I have been working here SINCE 3 years. ✗ (wrong!)',
      ]
    },
    {
      title: 'Stative Verbs — Never Use -ing',
      rule: 'Stative verbs describe states, not actions. They NEVER use continuous (-ing) form.',
      examples: [
        'I LIKE this company. ✓ (not "I am liking")',
        'I KNOW many people. ✓ (not "I am knowing")',
        'I HAVE a brother. ✓ (not "I am having")',
        'I WANT to join. ✓ (not "I am wanting")',
      ]
    },
    {
      title: 'A vs AN — Sound Rule',
      rule: 'Use AN before vowel SOUNDS (not vowel letters). Based on pronunciation!',
      examples: [
        'an engineer ✓ (E = vowel sound)',
        'an MBA ✓ (M = "Em" = vowel sound)',
        'an IT professional ✓ (I = "Eye" = vowel sound)',
        'a university ✗ (U = "You" = consonant sound!)',
        'a software engineer ✓ (S = consonant sound)',
      ]
    },
    {
      title: 'Past vs Present Perfect',
      rule: 'Specific time (2022, last year) → Simple Past. No specific time / ongoing → Present Perfect.',
      examples: [
        'I JOINED the company in 2022. ✓ (specific year)',
        'I HAVE BEEN working here for 2 years. ✓ (ongoing)',
        'I have joined in 2022. ✗ (wrong — specific year = past simple)',
      ]
    },
    {
      title: 'Prepositions at Work',
      rule: 'Work AT/FOR a company. Work IN an industry. Graduate FROM a college. Born IN a city.',
      examples: [
        'I work AT Google. ✓ | I work FOR Google. ✓',
        'I work IN the IT sector. ✓',
        'I graduated FROM IIT. ✓',
        'I was born IN Mumbai. ✓',
        'I work IN Google. ✗',
      ]
    }
  ],

  // Memory tricks
  memoryTricks: [
    { trick: 'PEFHGL = People Enjoy Friendly, Honest, Goal-oriented Learners', use: 'Remember the 6-part introduction formula' },
    { trick: 'FOR = 4 letters = a NUMBER (period/duration). SINCE = SPECIFIC (both start with S).', use: 'FOR vs SINCE rule' },
    { trick: 'Stative verbs: LIKES KNOW HAVE — the 3 most common ones. None take -ing.', use: 'Stative verb rule' },
    { trick: 'A/AN = SOUND not SPELLING. Say it aloud. Vowel sound? AN. Consonant sound? A.', use: 'A/AN rule' },
    { trick: 'MIRROR = "myself". PEOPLE = "My name is". Meeting people ≠ using mirror!', use: 'Never say "Myself Rahul"' },
    { trick: 'Old photo = WAS born. You were born years ago. Past photo = past tense.', use: '"I was born" (not "I am born")' },
    { trick: 'AT = dartboard (specific target). IN = big room (industry/area).', use: 'Work AT company. Work IN industry.' },
    { trick: 'AGO = standard English. BACK = informal Indian English. Never "3 years back".', use: 'Always "3 years ago"' },
  ],

  // Templates
  templates: [
    {
      title: '30-Second Interview Introduction',
      template: 'Good [morning/afternoon]. My name is [Name]. I am from [City]. I completed my [Degree] from [College] in [Year] with [Score]. I have been working as [Role] at [Company] for [Duration]. My biggest strength is [Strength]. My goal is to [Goal]. Thank you for this opportunity.',
    },
    {
      title: 'Office Introduction (New Joinee)',
      template: 'Good [morning/afternoon] everyone! I am [Name], joining as [Role]. I have [X] years of experience in [Field]. Outside of work, I enjoy [Hobby]. I look forward to working with all of you!',
    },
    {
      title: 'College Introduction',
      template: 'Hi everyone! My name is [Name]. My friends call me [Nickname]. I am from [City]. I love [Hobby1] and [Hobby2]. My goal is to become [Career]. Nice to meet you all!',
    },
    {
      title: 'Online Meeting Introduction',
      template: 'Hello! I am [Name], [Role] at [Company], joining from [City]. I have been in [Field] for [Duration]. Excited to be on this call!',
    },
  ]
};

// ── Accordion section ──────────────────────────────────────────────────────────
function AccordionSection({ title, emoji, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800 text-lg flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          {title}
        </span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Mini quiz component ────────────────────────────────────────────────────────
function MiniQuiz() {
  const QUESTIONS = [
    { q: 'Which is CORRECT?', opts: ['Myself Rahul Sharma.', 'My name is Rahul Sharma.'], correct: 'My name is Rahul Sharma.', exp: '"Myself" cannot be used to introduce yourself.' },
    { q: 'Fill in: I have been working here ___ 3 years.', opts: ['since', 'for', 'from'], correct: 'for', exp: 'Duration → FOR. Point in time → SINCE.' },
    { q: 'Which is WRONG?', opts: ['I am from Delhi.', 'I am born in Delhi.', 'I was born in Delhi.'], correct: 'I am born in Delhi.', exp: 'Birth = past event → "I WAS born".' },
    { q: 'Which preposition after "interested"?', opts: ['interested to', 'interested in', 'interested at'], correct: 'interested in', exp: 'Always "interested IN" — never "interested to".' },
    { q: '"I am a ___ professional." (a/an)', opts: ['a IT', 'an IT', 'the IT'], correct: 'an IT', exp: 'IT = "Eye-Tee" = vowel sound → AN.' },
    { q: 'Which is CORRECT for work?', opts: ['I work in TCS.', 'I work at TCS.', 'I work on TCS.'], correct: 'I work at TCS.', exp: 'Specific company → work AT. Industry → work IN.' },
    { q: 'Hobby sentence — which is correct?', opts: ['My hobby are reading.', 'My hobbies is reading.', 'My hobbies are reading and cooking.'], correct: 'My hobbies are reading and cooking.', exp: 'Multiple hobbies = plural = ARE.' },
    { q: '"2 years ___" — which word?', opts: ['back', 'before', 'ago'], correct: 'ago', exp: 'Standard English: "2 years AGO". "Back" is informal Indian English.' },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({});
  const [done, setDone]         = useState(false);

  const handleAnswer = (opt) => {
    if (answers[currentQ] !== undefined) return;
    setAnswers(prev => ({ ...prev, [currentQ]: opt }));
  };

  const score = Object.entries(answers).filter(([i, a]) => a === QUESTIONS[i].correct).length;

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">{score >= 6 ? '🏆' : score >= 4 ? '👍' : '💪'}</div>
        <p className="text-2xl font-bold text-gray-800">{score}/{QUESTIONS.length}</p>
        <p className="text-gray-500 mt-1">{score >= 6 ? 'Excellent! Keep it up!' : score >= 4 ? 'Good! Review the missed ones.' : 'Practice more — you will get there!'}</p>
        <button onClick={() => { setCurrentQ(0); setAnswers({}); setDone(false); }} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm">
          Try Again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];
  const answered = answers[currentQ] !== undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">Q {currentQ + 1} / {QUESTIONS.length}</span>
        <span className="text-sm font-medium text-blue-600">{score} correct</span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-5">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }} />
      </div>

      <p className="font-semibold text-gray-800 mb-4">{q.q}</p>

      <div className="space-y-2 mb-4">
        {q.opts.map(opt => {
          let cls = 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50';
          if (answered) {
            cls = opt === q.correct ? 'border-green-400 bg-green-50 text-green-800 font-semibold' :
                  opt === answers[currentQ] ? 'border-red-400 bg-red-50 text-red-700' :
                  'border-gray-100 text-gray-400 opacity-50';
          }
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}>
              {answered && opt === q.correct && '✓ '}{opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`p-3 rounded-xl text-sm mb-4 ${answers[currentQ] === q.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {q.exp}
        </div>
      )}

      {answered && (
        <button
          onClick={() => { if (currentQ < QUESTIONS.length - 1) setCurrentQ(q => q + 1); else setDone(true); }}
          className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm"
        >
          {currentQ < QUESTIONS.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  );
}

// ── Main revision page ────────────────────────────────────────────────────────
export default function Day2RevisionPage() {
  const [activeTab, setActiveTab] = useState('summary');

  const TABS = [
    { id: 'summary',   label: 'Summary',       emoji: '📋' },
    { id: 'patterns',  label: 'Patterns',      emoji: '📐' },
    { id: 'mistakes',  label: 'Mistakes',      emoji: '⚠️' },
    { id: 'grammar',   label: 'Grammar Rules', emoji: '📖' },
    { id: 'tricks',    label: 'Memory Tricks', emoji: '🧠' },
    { id: 'templates', label: 'Templates',     emoji: '📝' },
    { id: 'quiz',      label: 'Mini Quiz',     emoji: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block font-medium">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              Revision
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <div className="w-16" />
        </div>

        {/* Tab bar */}
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0 scrollbar-none">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ── Summary Tab ── */}
          {activeTab === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Topic overview */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">👋</span>
                  <div>
                    <h2 className="text-xl font-bold">Day 2: Self Introduction</h2>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">CEFR: A1</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {REVISION_DATA.topicOverview.description}
                </p>
              </div>

              {/* PEFHGL Formula */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  {REVISION_DATA.formula.title}
                </h3>
                <div className="space-y-3">
                  {REVISION_DATA.formula.parts.map((part, i) => (
                    <motion.div
                      key={part.letter}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                    >
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {part.letter}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{part.stands}</p>
                        <p className="text-sm text-gray-500 italic mt-0.5">e.g. {part.example}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Patterns Tab ── */}
          {activeTab === 'patterns' && (
            <motion.div key="patterns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {REVISION_DATA.patterns.map((section, i) => (
                <AccordionSection key={i} title={section.title} emoji="📐" defaultOpen={i === 0}>
                  <div className="space-y-3">
                    {section.patterns.map((p, j) => (
                      <div key={j} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
                        <p className="font-mono text-sm font-semibold text-blue-700 mb-1">{p.formula}</p>
                        <p className="text-gray-700 italic text-sm">"{p.example}"</p>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full mt-2 inline-block">{p.use}</span>
                      </div>
                    ))}
                  </div>
                </AccordionSection>
              ))}
            </motion.div>
          )}

          {/* ── Mistakes Tab ── */}
          {activeTab === 'mistakes' && (
            <motion.div key="mistakes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-5">
                <h3 className="font-bold text-red-700 mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Top 20 Mistakes — Never Make These Again
                </h3>
                <p className="text-red-600 text-sm">Inhe yaad kar lein — ye sabse common errors hain jo har beginner karta hai.</p>
              </div>

              <div className="space-y-3">
                {REVISION_DATA.top20Mistakes.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-600 font-medium line-through text-sm">{item.wrong}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-700 font-semibold text-sm">{item.correct}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg ml-8">{item.rule}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Grammar Tab ── */}
          {activeTab === 'grammar' && (
            <motion.div key="grammar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {REVISION_DATA.grammarRules.map((rule, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    {rule.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-xl">{rule.rule}</p>
                  <div className="space-y-2">
                    {rule.examples.map((ex, j) => (
                      <p key={j} className={`text-sm px-3 py-2 rounded-lg font-mono ${
                        ex.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {ex}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Tricks Tab ── */}
          {activeTab === 'tricks' && (
            <motion.div key="tricks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {REVISION_DATA.memoryTricks.map((trick, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-yellow-100 shadow-sm p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">🧠</div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">{trick.trick}</p>
                      <p className="text-sm text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-lg">📌 Use for: {trick.use}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── Templates Tab ── */}
          {activeTab === 'templates' && (
            <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {REVISION_DATA.templates.map((tmpl, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    {tmpl.title}
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-800 leading-loose whitespace-pre-line font-medium">
                      {tmpl.template}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Tip: [text in brackets] ko apni real information se replace karein</p>

                  {/* Practice area */}
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Practice — apna version likhein:</label>
                    <textarea
                      rows={5}
                      placeholder={`Type your own version using this template...`}
                      className="w-full text-sm border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Quiz Tab ── */}
          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Quick Revision Quiz
                </h3>
                <p className="text-gray-500 text-sm mb-6">8 quick questions to test your Day 2 knowledge</p>
                <MiniQuiz />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick nav footer */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Continue with Day 2:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { href: '/practice/day-2', label: 'Practice', emoji: '📝' },
              { href: '/practice/day-2/vocabulary', label: 'Vocabulary', emoji: '📚' },
              { href: '/practice/day-2/test', label: 'Take Test', emoji: '🎯' },
              { href: '/practice/day-2/flashcards', label: 'Flashcards', emoji: '🃏' },
              { href: '/practice/day-2/stories', label: 'Stories', emoji: '📖' },
              { href: '/practice/day-2/speaking', label: 'Speaking', emoji: '🎤' },
              { href: '/practice/day-2/writing', label: 'Writing', emoji: '✍️' },
              { href: '/practice/day-2/grammar', label: 'Grammar', emoji: '⚡' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all text-sm font-medium text-gray-700 border border-transparent hover:border-blue-200">
                <span>{link.emoji}</span>{link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
