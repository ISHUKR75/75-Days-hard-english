'use client';
// Grammar Hub Page — All grammar topics organized by category
// Shows all 75 days grammar topics + additional grammar reference

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, ChevronRight, CheckCircle2, Lock, Play,
  Search, Filter, Star, BarChart2, ArrowRight, Zap,
} from 'lucide-react';
import DAYS_75_TOPICS from '@/lib/topics';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ============================================================
// Grammar categories beyond 75 days
// ============================================================
const GRAMMAR_TOPICS = [
  {
    category: 'Foundation Grammar',
    emoji: '🏗️',
    color: 'from-indigo-500 to-blue-500',
    topics: [
      { title: 'Parts of Speech', slug: 'parts-of-speech', desc: 'Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection', level: 'A1', emoji: '📝' },
      { title: 'Sentence Types', slug: 'sentence-types', desc: 'Declarative, Interrogative, Imperative, Exclamatory', level: 'A1', emoji: '📋' },
      { title: 'Subject & Predicate', slug: 'subject-predicate', desc: 'How to identify subject and predicate in any sentence', level: 'A1', emoji: '🔍' },
      { title: 'Articles (A, An, The)', slug: 'articles', desc: 'When to use A, An, The and when to use no article', level: 'A1', emoji: '📖' },
      { title: 'Nouns (Types & Uses)', slug: 'nouns', desc: 'Common, Proper, Abstract, Collective, Countable, Uncountable', level: 'A1', emoji: '🏷️' },
      { title: 'Pronouns (All Types)', slug: 'pronouns', desc: 'Personal, Reflexive, Relative, Interrogative, Demonstrative', level: 'A1', emoji: '👤' },
    ],
  },
  {
    category: 'Tenses (All 12)',
    emoji: '⏰',
    color: 'from-violet-500 to-purple-500',
    topics: [
      { title: 'Simple Present Tense', slug: 'simple-present', desc: 'Habits, facts, routines — "I eat rice"', level: 'A1', emoji: '🌅' },
      { title: 'Present Continuous', slug: 'present-continuous', desc: 'Actions happening now — "I am eating"', level: 'A1', emoji: '▶️' },
      { title: 'Present Perfect', slug: 'present-perfect', desc: 'Past actions with present relevance — "I have eaten"', level: 'A2', emoji: '✅' },
      { title: 'Present Perfect Continuous', slug: 'present-perfect-continuous', desc: 'Ongoing since past — "I have been eating"', level: 'B1', emoji: '🔄' },
      { title: 'Simple Past Tense', slug: 'simple-past', desc: 'Completed past actions — "I ate rice"', level: 'A1', emoji: '⏮️' },
      { title: 'Past Continuous', slug: 'past-continuous', desc: 'Ongoing past action — "I was eating"', level: 'A2', emoji: '🎬' },
      { title: 'Past Perfect', slug: 'past-perfect', desc: 'Earlier past action — "I had eaten"', level: 'B1', emoji: '⏪' },
      { title: 'Past Perfect Continuous', slug: 'past-perfect-continuous', desc: '"I had been eating for an hour"', level: 'B2', emoji: '⏭️' },
      { title: 'Simple Future Tense', slug: 'simple-future', desc: 'Future plans — "I will eat"', level: 'A2', emoji: '🔮' },
      { title: 'Future Continuous', slug: 'future-continuous', desc: 'Ongoing future — "I will be eating"', level: 'B1', emoji: '⏩' },
      { title: 'Future Perfect', slug: 'future-perfect', desc: 'Completed before future time — "I will have eaten"', level: 'B2', emoji: '🏁' },
      { title: 'Future Perfect Continuous', slug: 'future-perfect-continuous', desc: '"I will have been eating for an hour"', level: 'C1', emoji: '🎯' },
    ],
  },
  {
    category: 'Modal Verbs',
    emoji: '🔑',
    color: 'from-emerald-500 to-teal-500',
    topics: [
      { title: 'Can & Could', slug: 'can-could', desc: 'Ability, permission, possibility', level: 'A1', emoji: '💪' },
      { title: 'Should & Ought To', slug: 'should-ought', desc: 'Advice, obligation, expectation', level: 'A2', emoji: '💡' },
      { title: 'May & Might', slug: 'may-might', desc: 'Possibility, permission, speculation', level: 'A2', emoji: '🤔' },
      { title: 'Must & Have To', slug: 'must-have-to', desc: 'Obligation, necessity, deduction', level: 'B1', emoji: '⚡' },
      { title: 'Will & Would', slug: 'will-would', desc: 'Future, willingness, hypothetical', level: 'B1', emoji: '🔮' },
      { title: 'Shall & Should', slug: 'shall-should', desc: 'Formal future, suggestions, advice', level: 'B1', emoji: '📜' },
      { title: 'Need To & Needn\'t', slug: 'need-neednt', desc: 'Necessity vs no necessity', level: 'B1', emoji: '✅' },
      { title: 'Perfect Modals', slug: 'perfect-modals', desc: 'Could have, Would have, Should have', level: 'B2', emoji: '🎭' },
    ],
  },
  {
    category: 'Conditionals',
    emoji: '🌊',
    color: 'from-amber-500 to-orange-500',
    topics: [
      { title: 'Zero Conditional', slug: 'zero-conditional', desc: 'Always true facts — "If you heat water, it boils"', level: 'A2', emoji: '0️⃣' },
      { title: 'First Conditional', slug: 'first-conditional', desc: 'Real future possibility — "If it rains, I will stay"', level: 'A2', emoji: '1️⃣' },
      { title: 'Second Conditional', slug: 'second-conditional', desc: 'Unreal/imaginary — "If I had money, I would travel"', level: 'B1', emoji: '2️⃣' },
      { title: 'Third Conditional', slug: 'third-conditional', desc: 'Impossible past — "If I had studied, I would have passed"', level: 'B2', emoji: '3️⃣' },
      { title: 'Mixed Conditionals', slug: 'mixed-conditionals', desc: 'Mix of 2nd and 3rd conditional', level: 'C1', emoji: '🔀' },
    ],
  },
  {
    category: 'Voice & Narration',
    emoji: '🗣️',
    color: 'from-pink-500 to-rose-500',
    topics: [
      { title: 'Active Voice', slug: 'active-voice', desc: 'Subject karta hai action — "Ram ate the apple"', level: 'A2', emoji: '➡️' },
      { title: 'Passive Voice', slug: 'passive-voice', desc: 'Action subject par hoti hai — "The apple was eaten"', level: 'B1', emoji: '↩️' },
      { title: 'Direct Speech', slug: 'direct-speech', desc: 'Exact words: "He said, \'I am happy\'"', level: 'A2', emoji: '💬' },
      { title: 'Indirect Speech', slug: 'indirect-speech', desc: 'Reported: "He said that he was happy"', level: 'B1', emoji: '📢' },
    ],
  },
  {
    category: 'Sentence Structure',
    emoji: '🔧',
    color: 'from-cyan-500 to-sky-500',
    topics: [
      { title: 'Clauses (Main & Sub)', slug: 'clauses', desc: 'Independent and dependent clauses explained', level: 'B1', emoji: '🧩' },
      { title: 'Conjunctions', slug: 'conjunctions', desc: 'And, But, Or, Because, Although, However...', level: 'A2', emoji: '🔗' },
      { title: 'Relative Clauses', slug: 'relative-clauses', desc: 'Who, Which, That, Whose, Where, When', level: 'B1', emoji: '🔍' },
      { title: 'Gerunds & Infinitives', slug: 'gerunds-infinitives', desc: 'Running vs To run — when to use which', level: 'B2', emoji: '🏃' },
      { title: 'Prepositions', slug: 'prepositions', desc: 'At, In, On, With, By, For, About, Over...', level: 'A2', emoji: '📍' },
      { title: 'Question Formation', slug: 'question-formation', desc: 'Yes/No, WH, Tag questions', level: 'A2', emoji: '❓' },
    ],
  },
];

// ============================================================
// Grammar Days from 75-day curriculum
// ============================================================
const grammarDays = DAYS_75_TOPICS.filter(t =>
  t.type === 'grammar' || t.type === 'revision'
);

// Level color mapping
const LEVEL_COLORS = {
  A0: 'text-slate-400 bg-slate-500/15',
  A1: 'text-emerald-400 bg-emerald-500/15',
  A2: 'text-sky-400 bg-sky-500/15',
  B1: 'text-amber-400 bg-amber-500/15',
  B2: 'text-orange-400 bg-orange-500/15',
  C1: 'text-rose-400 bg-rose-500/15',
  C2: 'text-purple-400 bg-purple-500/15',
};

// ============================================================
// Grammar Hub Page
// ============================================================
export default function GrammarPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('75days'); // 75days | reference

  const { totalLessonsCompleted } = useUserStore();
  const { topics: topicProgress } = useProgressStore();
  const currentDay = totalLessonsCompleted + 1;

  // Filter 75-day topics
  const filteredDays = grammarDays.filter(t =>
    !search || t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">📚</span> Grammar Hub
          </h1>
          <p className="text-slate-500">
            Complete English grammar — 75-day curriculum + reference guide
          </p>
        </div>
        <Link href="/75-days-challenge" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Play size={15} fill="currentColor" /> Start Today's Lesson
        </Link>
      </div>

      {/* ── Search ───────────────────────────────────────── */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search grammar topics..."
          className="input w-full pl-10"
        />
      </div>

      {/* ── Tab Switch ───────────────────────────────────── */}
      <div className="flex gap-2 border-b border-white/8">
        {[
          { id: '75days',    label: '75-Day Grammar', emoji: '📅' },
          { id: 'reference', label: 'Grammar Reference', emoji: '📖' },
        ].map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === id
                ? 'border-primary-500 text-primary-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* ── Tab: 75-Day Grammar ──────────────────────────── */}
      {activeTab === '75days' && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
            {[
              { label: 'Grammar Topics', value: grammarDays.length, emoji: '📚', color: 'text-indigo-400' },
              { label: 'Completed', value: Math.min(currentDay - 1, grammarDays.length), emoji: '✅', color: 'text-accent-400' },
              { label: 'Current Day', value: currentDay, emoji: '📍', color: 'text-primary-400' },
              { label: 'Total Days', value: 75, emoji: '🎯', color: 'text-amber-400' },
            ].map(({ label, value, emoji, color }) => (
              <div key={label} className="card p-4">
                <p className="text-xs text-slate-500 mb-1">{emoji} {label}</p>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Grammar Days Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDays.map((topic) => {
              const isCompleted = topic.day < currentDay;
              const isCurrent   = topic.day === currentDay;
              const isLocked    = topic.day > currentDay;
              const progress    = topicProgress?.[`day-${topic.day}`];

              return (
                <Link
                  key={topic.day}
                  href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
                  className={`card p-4 group transition-all ${
                    isLocked  ? 'opacity-50 cursor-not-allowed' :
                    isCurrent ? 'border-primary-500/40 bg-primary-500/5 cursor-pointer' :
                    'hover:border-white/15 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      isCompleted ? 'bg-accent-500/15'   :
                      isCurrent   ? 'bg-primary-500/15'  :
                      'bg-white/5'
                    }`}>
                      {isCompleted ? '✅' : isLocked ? '🔒' : topic.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-xs font-bold text-primary-400">Day {topic.day}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${LEVEL_COLORS[topic.cefr] || 'text-slate-400 bg-slate-500/15'}`}>
                          {topic.cefr}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-sm mb-0.5 group-hover:text-primary-300 transition-colors line-clamp-1 ${
                        isCurrent ? 'text-primary-200' : 'text-white'
                      }`}>
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600 capitalize">{topic.difficulty}</p>
                    </div>
                    {!isLocked && (
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-primary-400 transition-colors shrink-0 mt-1" />
                    )}
                  </div>

                  {/* Quick practice link */}
                  {!isLocked && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                      <Link
                        href={`/75-days-challenge/${topic.day}`}
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-slate-500 hover:text-primary-400 flex items-center gap-1 transition-colors"
                      >
                        <BookOpen size={11} /> Lesson
                      </Link>
                      <span className="text-slate-700">·</span>
                      <Link
                        href={`/practice/day-${topic.day}`}
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-slate-500 hover:text-accent-400 flex items-center gap-1 transition-colors"
                      >
                        <Zap size={11} /> Practice
                      </Link>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab: Grammar Reference ───────────────────────── */}
      {activeTab === 'reference' && (
        <div className="space-y-8">
          {GRAMMAR_TOPICS
            .filter(cat =>
              !search || cat.topics.some(t => t.title.toLowerCase().includes(search.toLowerCase()))
            )
            .map(({ category, emoji, color, topics }) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl shadow-md`}>
                  {emoji}
                </div>
                <div>
                  <h2 className="font-black text-white text-lg">{category}</h2>
                  <p className="text-xs text-slate-500">{topics.length} topics</p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topics
                  .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()))
                  .map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/grammar/${topic.slug}`}
                    className="card p-4 group hover:border-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{topic.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-semibold text-white text-sm group-hover:text-primary-300 transition-colors">
                            {topic.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {topic.desc}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            LEVEL_COLORS[topic.level] || 'text-slate-400 bg-slate-500/15'
                          }`}>
                            {topic.level}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-primary-400 transition-colors shrink-0 mt-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
