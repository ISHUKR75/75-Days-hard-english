'use client';
// Vocabulary Bank — All vocabulary categories with word lists
// Features: search, filter by level, mastery tracking, word of day

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Search, Star, ChevronRight, Zap,
  CheckCircle2, Brain, Volume2, ArrowRight, Trophy,
} from 'lucide-react';
import useUserStore from '@/store/userStore';

// ============================================================
// Vocabulary categories data
// ============================================================
const VOCAB_CATEGORIES = [
  {
    category: 'Daily Life',
    emoji: '🏠',
    color: 'from-indigo-500 to-blue-500',
    slug: 'daily-life',
    totalWords: 500,
    level: 'A1-A2',
    topics: [
      { title: 'Food & Drinks', slug: 'food-drinks', words: 80, emoji: '🍛' },
      { title: 'Family & Relations', slug: 'family', words: 60, emoji: '👨‍👩‍👧‍👦' },
      { title: 'Body Parts', slug: 'body-parts', words: 50, emoji: '🫁' },
      { title: 'Colors & Shapes', slug: 'colors-shapes', words: 40, emoji: '🎨' },
      { title: 'Numbers & Time', slug: 'numbers-time', words: 70, emoji: '🔢' },
      { title: 'House & Furniture', slug: 'house-furniture', words: 60, emoji: '🛋️' },
      { title: 'Clothes & Fashion', slug: 'clothes', words: 50, emoji: '👗' },
      { title: 'Weather', slug: 'weather', words: 40, emoji: '🌦️' },
    ],
  },
  {
    category: 'Emotions & Feelings',
    emoji: '❤️',
    color: 'from-rose-500 to-pink-500',
    slug: 'emotions',
    totalWords: 300,
    level: 'A2-B1',
    topics: [
      { title: 'Positive Emotions', slug: 'positive-emotions', words: 50, emoji: '😊' },
      { title: 'Negative Emotions', slug: 'negative-emotions', words: 50, emoji: '😢' },
      { title: 'Surprise & Shock', slug: 'surprise', words: 30, emoji: '😲' },
      { title: 'Love & Relationships', slug: 'love', words: 60, emoji: '💝' },
      { title: 'Fear & Anxiety', slug: 'fear', words: 40, emoji: '😰' },
      { title: 'Anger & Frustration', slug: 'anger', words: 40, emoji: '😤' },
      { title: 'Personality Traits', slug: 'personality', words: 80, emoji: '🧠' },
    ],
  },
  {
    category: 'Professional English',
    emoji: '💼',
    color: 'from-teal-500 to-emerald-500',
    slug: 'professional',
    totalWords: 600,
    level: 'B1-B2',
    topics: [
      { title: 'Office & Workplace', slug: 'office', words: 80, emoji: '🏢' },
      { title: 'Business Meeting', slug: 'meeting', words: 60, emoji: '🤝' },
      { title: 'Email Vocabulary', slug: 'email', words: 70, emoji: '📧' },
      { title: 'Job Interview', slug: 'interview', words: 80, emoji: '💼' },
      { title: 'Finance & Banking', slug: 'finance', words: 70, emoji: '💰' },
      { title: 'Sales & Marketing', slug: 'sales', words: 60, emoji: '📈' },
      { title: 'Technology', slug: 'technology', words: 80, emoji: '💻' },
      { title: 'Leadership', slug: 'leadership', words: 60, emoji: '👑' },
    ],
  },
  {
    category: 'Idioms & Phrases',
    emoji: '💬',
    color: 'from-amber-500 to-yellow-500',
    slug: 'idioms',
    totalWords: 400,
    level: 'B2-C1',
    topics: [
      { title: 'Common Idioms (A-M)', slug: 'idioms-a-m', words: 100, emoji: '🅰️' },
      { title: 'Common Idioms (N-Z)', slug: 'idioms-n-z', words: 100, emoji: '🔤' },
      { title: 'Body Language Idioms', slug: 'body-idioms', words: 60, emoji: '👃' },
      { title: 'Animal Idioms', slug: 'animal-idioms', words: 50, emoji: '🐾' },
      { title: 'Sports Idioms', slug: 'sports-idioms', words: 40, emoji: '⚽' },
      { title: 'Business Idioms', slug: 'business-idioms', words: 50, emoji: '📊' },
    ],
  },
  {
    category: 'Phrasal Verbs',
    emoji: '🚀',
    color: 'from-violet-500 to-purple-500',
    slug: 'phrasal-verbs',
    totalWords: 350,
    level: 'B1-B2',
    topics: [
      { title: 'Get + Preposition', slug: 'get-phrasal', words: 40, emoji: '📥' },
      { title: 'Make + Preposition', slug: 'make-phrasal', words: 30, emoji: '🔨' },
      { title: 'Come + Preposition', slug: 'come-phrasal', words: 35, emoji: '🚶' },
      { title: 'Put + Preposition', slug: 'put-phrasal', words: 35, emoji: '📦' },
      { title: 'Take + Preposition', slug: 'take-phrasal', words: 40, emoji: '✋' },
      { title: 'Look + Preposition', slug: 'look-phrasal', words: 30, emoji: '👀' },
      { title: 'Turn + Preposition', slug: 'turn-phrasal', words: 30, emoji: '🔄' },
      { title: 'Give + Preposition', slug: 'give-phrasal', words: 30, emoji: '🎁' },
      { title: 'Go + Preposition', slug: 'go-phrasal', words: 40, emoji: '🏃' },
      { title: 'Break + Preposition', slug: 'break-phrasal', words: 30, emoji: '💥' },
    ],
  },
  {
    category: 'Synonyms & Antonyms',
    emoji: '🔄',
    color: 'from-cyan-500 to-sky-500',
    slug: 'synonyms-antonyms',
    totalWords: 500,
    level: 'A2-B1',
    topics: [
      { title: 'Adjective Synonyms', slug: 'adj-synonyms', words: 80, emoji: '🏷️' },
      { title: 'Verb Synonyms', slug: 'verb-synonyms', words: 80, emoji: '⚡' },
      { title: 'Noun Synonyms', slug: 'noun-synonyms', words: 80, emoji: '📝' },
      { title: 'Common Antonyms', slug: 'antonyms', words: 120, emoji: '↔️' },
      { title: 'Formal vs Informal', slug: 'formal-informal', words: 80, emoji: '🎩' },
      { title: 'British vs American', slug: 'brit-amer', words: 60, emoji: '🌍' },
    ],
  },
  {
    category: 'Advanced Vocabulary',
    emoji: '🎓',
    color: 'from-orange-500 to-red-500',
    slug: 'advanced',
    totalWords: 700,
    level: 'C1-C2',
    topics: [
      { title: 'GRE / IELTS Words', slug: 'gre-ielts', words: 100, emoji: '📚' },
      { title: 'Academic Vocabulary', slug: 'academic', words: 100, emoji: '🎓' },
      { title: 'Confusing Words', slug: 'confusing', words: 80, emoji: '🤔' },
      { title: 'One-Word Substitution', slug: 'one-word', words: 100, emoji: '🎯' },
      { title: 'Medical Terms', slug: 'medical', words: 80, emoji: '🏥' },
      { title: 'Legal Terms', slug: 'legal', words: 70, emoji: '⚖️' },
      { title: 'Science Terms', slug: 'science', words: 80, emoji: '🔬' },
      { title: 'Power Words', slug: 'power-words', words: 90, emoji: '💪' },
    ],
  },
  {
    category: 'Verbs (Complete List)',
    emoji: '⚡',
    color: 'from-lime-500 to-green-500',
    slug: 'verbs',
    totalWords: 800,
    level: 'A1-B2',
    topics: [
      { title: 'Common Action Verbs', slug: 'action-verbs', words: 100, emoji: '🏃' },
      { title: 'Irregular Verbs (V1-V2-V3)', slug: 'irregular-verbs', words: 200, emoji: '🔀' },
      { title: 'Regular Verbs', slug: 'regular-verbs', words: 150, emoji: '📋' },
      { title: 'Stative Verbs', slug: 'stative-verbs', words: 60, emoji: '🧘' },
      { title: 'Transitive & Intransitive', slug: 'trans-intrans', words: 80, emoji: '↔️' },
      { title: 'Causative Verbs', slug: 'causative', words: 40, emoji: '🎪' },
      { title: 'Linking Verbs', slug: 'linking-verbs', words: 30, emoji: '🔗' },
      { title: 'Reporting Verbs', slug: 'reporting-verbs', words: 60, emoji: '📢' },
    ],
  },
];

// Word of the Day data
const WORD_OF_DAY = {
  word: 'Perseverance',
  pronunciation: '/ˌpɜːrsɪˈvɪərəns/',
  partOfSpeech: 'noun',
  hindi: 'दृढ़ता / लगन',
  definition: 'The quality of continuing to try to achieve a particular aim despite difficulties.',
  example: 'His perseverance in learning English paid off when he got the job.',
  synonyms: ['Persistence', 'Determination', 'Tenacity', 'Resilience'],
  antonyms: ['Giving up', 'Surrender', 'Weakness'],
  useInSentence: 'With perseverance, you can master English in 75 days.',
};

// ============================================================
// Vocabulary Bank Page
// ============================================================
export default function VocabularyBankPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { totalWordsLearned, xp } = useUserStore();

  const filtered = VOCAB_CATEGORIES.filter(cat =>
    !search ||
    cat.category.toLowerCase().includes(search.toLowerCase()) ||
    cat.topics.some(t => t.title.toLowerCase().includes(search.toLowerCase()))
  ).filter(cat =>
    activeFilter === 'all' || cat.level.includes(activeFilter)
  );

  return (
    <div className="space-y-6">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">📖</span> Vocabulary Bank
          </h1>
          <p className="text-slate-500">10,000+ words across 8 categories — build a powerful vocabulary</p>
        </div>
        <Link href="/vocabulary-bank/word-of-the-day" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Star size={14} className="text-yellow-300" /> Word of the Day
        </Link>
      </div>

      {/* ── Word of the Day Banner ────────────────────────── */}
      <div className="card p-5 border-amber-500/20 bg-gradient-to-r from-amber-950/30 to-yellow-950/20">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Word of the Day</span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-black text-white">{WORD_OF_DAY.word}</h2>
              <span className="text-slate-500 text-sm">{WORD_OF_DAY.pronunciation}</span>
              <span className="badge text-xs text-amber-400 bg-amber-500/15 border border-amber-500/20">
                {WORD_OF_DAY.partOfSpeech}
              </span>
            </div>
            <p className="hindi-text text-amber-300 text-sm mt-1 mb-2">🇮🇳 {WORD_OF_DAY.hindi}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{WORD_OF_DAY.definition}</p>
            <p className="text-slate-500 text-xs mt-2 italic">"{WORD_OF_DAY.example}"</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500/25 transition-all">
              <Volume2 size={16} className="text-amber-400" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-all">
              <Star size={16} className="text-slate-400" />
            </button>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex gap-2 flex-wrap">
          <span className="text-xs text-slate-500">Synonyms:</span>
          {WORD_OF_DAY.synonyms.map(s => (
            <span key={s} className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Words Learned', value: totalWordsLearned.toLocaleString(), emoji: '📚', color: 'text-indigo-400' },
          { label: 'Categories', value: VOCAB_CATEGORIES.length, emoji: '📂', color: 'text-accent-400' },
          { label: 'Total Words', value: '10,000+', emoji: '🔤', color: 'text-primary-400' },
          { label: 'Practice Sets', value: '50+', emoji: '🎯', color: 'text-amber-400' },
        ].map(({ label, value, emoji, color }) => (
          <div key={label} className="card p-4 text-center">
            <div className="text-xl mb-1">{emoji}</div>
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filter ───────────────────────────────── */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vocabulary..."
            className="input w-full pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-2 rounded-xl border font-medium transition-all ${
                activeFilter === f
                  ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                  : 'bg-white/3 border-white/8 text-slate-500 hover:text-slate-300'
              }`}
            >
              {f === 'all' ? 'All Levels' : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Categories Grid ───────────────────────────────── */}
      <div className="space-y-6">
        {filtered.map(({ category, emoji, color, slug, totalWords, level, topics }) => (
          <div key={slug} className="card p-5">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-xl shadow-lg`}>
                  {emoji}
                </div>
                <div>
                  <h2 className="font-black text-white">{category}</h2>
                  <p className="text-xs text-slate-500">{totalWords} words · Level {level}</p>
                </div>
              </div>
              <Link
                href={`/vocabulary-bank/${slug}`}
                className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>

            {/* Subtopics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {topics.map(({ title, slug: topicSlug, words, emoji: topicEmoji }) => (
                <Link
                  key={topicSlug}
                  href={`/vocabulary-bank/${slug}/${topicSlug}`}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/12 hover:bg-white/6 transition-all group"
                >
                  <span className="text-lg shrink-0">{topicEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors line-clamp-2">
                      {title}
                    </p>
                    <p className="text-[10px] text-slate-600">{words} words</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Practice CTA ───────────────────────────── */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h3 className="font-bold text-white">Vocabulary Flashcards</h3>
            <p className="text-sm text-slate-500">Spaced repetition se words yaad karo — sab categories se</p>
          </div>
        </div>
        <Link href="/memory-lab/spaced-repetition" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Brain size={15} /> Start Flashcards
        </Link>
      </div>
    </div>
  );
}
