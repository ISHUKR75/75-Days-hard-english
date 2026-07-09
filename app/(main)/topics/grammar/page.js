'use client';
// ============================================================
// GRAMMAR HUB PAGE - Lists ALL grammar topics in a premium grid
// Apple/Notion/Vercel inspired design with animations
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Filter, ChevronRight, Star,
  Sparkles, Trophy, Target, Flame, Lock, CheckCircle,
  ArrowRight, Zap, GraduationCap, BookMarked,
} from 'lucide-react';

// ── All 94 grammar topics from English.txt ─────────────────
const GRAMMAR_TOPICS = [
  // Basics & Parts of Speech
  { slug: 'parts-of-speech', title: 'Parts of Speech', emoji: '📝', level: 'A1', group: 'Basics', color: 'from-blue-500 to-cyan-500' },
  { slug: 'articles', title: 'Articles (A, An, The)', emoji: '📰', level: 'A1', group: 'Basics', color: 'from-indigo-500 to-blue-500' },
  { slug: 'nouns', title: 'Nouns', emoji: '📦', level: 'A1', group: 'Basics', color: 'from-purple-500 to-indigo-500' },
  { slug: 'sentence-structure', title: 'Sentence Structure', emoji: '🏗️', level: 'A1', group: 'Basics', color: 'from-violet-500 to-purple-500' },
  { slug: 'types-of-sentences', title: 'Types of Sentences', emoji: '📋', level: 'A1', group: 'Basics', color: 'from-fuchsia-500 to-violet-500' },
  { slug: 'imperative-sentences', title: 'Imperative Sentences', emoji: '⚡', level: 'A1', group: 'Basics', color: 'from-pink-500 to-fuchsia-500' },
  { slug: 'punctuation', title: 'Punctuation', emoji: '✍️', level: 'A1', group: 'Basics', color: 'from-rose-500 to-pink-500' },
  { slug: 'capitalization', title: 'Capitalization', emoji: '🔤', level: 'A1', group: 'Basics', color: 'from-amber-500 to-orange-500' },
  
  // Pronouns
  { slug: 'pronouns-all-types', title: 'Pronouns (All Types)', emoji: '👤', level: 'A1', group: 'Pronouns', color: 'from-emerald-500 to-teal-500' },
  { slug: 'personal-pronouns', title: 'Personal Pronouns', emoji: '🙋', level: 'A1', group: 'Pronouns', color: 'from-teal-500 to-cyan-500' },
  { slug: 'subject-pronouns', title: 'Subject Pronouns', emoji: '👆', level: 'A1', group: 'Pronouns', color: 'from-cyan-500 to-sky-500' },
  { slug: 'object-pronouns', title: 'Object Pronouns', emoji: '👇', level: 'A1', group: 'Pronouns', color: 'from-sky-500 to-blue-500' },
  { slug: 'possessive-adjectives', title: 'Possessive Adjectives', emoji: '🏠', level: 'A2', group: 'Pronouns', color: 'from-blue-500 to-indigo-500' },
  { slug: 'possessive-pronouns', title: 'Possessive Pronouns', emoji: '🔑', level: 'A2', group: 'Pronouns', color: 'from-indigo-500 to-violet-500' },
  { slug: 'reflexive-pronouns', title: 'Reflexive Pronouns', emoji: '🪞', level: 'A2', group: 'Pronouns', color: 'from-violet-500 to-purple-500' },
  { slug: 'indefinite-pronouns', title: 'Indefinite Pronouns', emoji: '❓', level: 'A2', group: 'Pronouns', color: 'from-purple-500 to-fuchsia-500' },
  { slug: 'distributive-pronouns', title: 'Distributive Pronouns', emoji: '🔀', level: 'B1', group: 'Pronouns', color: 'from-fuchsia-500 to-pink-500' },
  { slug: 'relative-pronouns', title: 'Relative Pronouns', emoji: '🔗', level: 'B1', group: 'Pronouns', color: 'from-pink-500 to-rose-500' },
  { slug: 'interrogative-pronouns', title: 'Interrogative Pronouns', emoji: '❔', level: 'A2', group: 'Pronouns', color: 'from-rose-500 to-red-500' },
  { slug: 'demonstrative-pronouns', title: 'Demonstrative Pronouns', emoji: '👉', level: 'A1', group: 'Pronouns', color: 'from-orange-500 to-amber-500' },

  // Verbs & Modals
  { slug: 'verbs', title: 'Verbs', emoji: '🏃', level: 'A1', group: 'Verbs & Modals', color: 'from-green-500 to-emerald-500' },
  { slug: 'auxiliary-verbs', title: 'Auxiliary Verbs', emoji: '🤝', level: 'A1', group: 'Verbs & Modals', color: 'from-emerald-500 to-teal-500' },
  { slug: 'be-verb', title: 'Be Verb (is/am/are)', emoji: '✨', level: 'A1', group: 'Verbs & Modals', color: 'from-teal-500 to-cyan-500' },
  { slug: 'has-have', title: 'Has / Have', emoji: '📥', level: 'A1', group: 'Verbs & Modals', color: 'from-cyan-500 to-sky-500' },
  { slug: 'had', title: 'Had', emoji: '⏪', level: 'A2', group: 'Verbs & Modals', color: 'from-sky-500 to-blue-500' },
  { slug: 'will-have', title: 'Will Have', emoji: '⏩', level: 'A2', group: 'Verbs & Modals', color: 'from-blue-500 to-indigo-500' },
  { slug: 'modals', title: 'Modals (Overview)', emoji: '🎯', level: 'A2', group: 'Verbs & Modals', color: 'from-indigo-500 to-violet-500' },
  { slug: 'can', title: 'Can', emoji: '💪', level: 'A1', group: 'Verbs & Modals', color: 'from-violet-500 to-purple-500' },
  { slug: 'should', title: 'Should', emoji: '👍', level: 'A2', group: 'Verbs & Modals', color: 'from-purple-500 to-fuchsia-500' },
  { slug: 'may', title: 'May', emoji: '🤔', level: 'A2', group: 'Verbs & Modals', color: 'from-fuchsia-500 to-pink-500' },
  { slug: 'must', title: 'Must', emoji: '⚠️', level: 'A2', group: 'Verbs & Modals', color: 'from-pink-500 to-rose-500' },
  { slug: 'could', title: 'Could', emoji: '🌟', level: 'A2', group: 'Verbs & Modals', color: 'from-rose-500 to-red-500' },
  { slug: 'used-to', title: 'Used To', emoji: '📜', level: 'A2', group: 'Verbs & Modals', color: 'from-orange-500 to-amber-500' },
  { slug: 'should-have', title: 'Should Have', emoji: '😟', level: 'B1', group: 'Verbs & Modals', color: 'from-amber-500 to-yellow-500' },
  { slug: 'must-have', title: 'Must Have', emoji: '🔍', level: 'B1', group: 'Verbs & Modals', color: 'from-lime-500 to-green-500' },
  { slug: 'could-have', title: 'Could Have', emoji: '💭', level: 'B1', group: 'Verbs & Modals', color: 'from-green-500 to-emerald-500' },
  { slug: 'would-have', title: 'Would Have', emoji: '🌈', level: 'B1', group: 'Verbs & Modals', color: 'from-emerald-500 to-teal-500' },
  { slug: 'may-have', title: 'May Have', emoji: '🎲', level: 'B1', group: 'Verbs & Modals', color: 'from-teal-500 to-cyan-500' },
  { slug: 'might-have', title: 'Might Have', emoji: '🎭', level: 'B1', group: 'Verbs & Modals', color: 'from-cyan-500 to-sky-500' },
  { slug: 'will-shall', title: 'Will / Shall', emoji: '🚀', level: 'A2', group: 'Verbs & Modals', color: 'from-sky-500 to-blue-500' },
  { slug: 'would-ought-to-dare', title: 'Would + Ought To + Dare', emoji: '🎪', level: 'B1', group: 'Verbs & Modals', color: 'from-blue-500 to-indigo-500' },
  { slug: 'causative-verbs', title: 'Causative Verbs', emoji: '🔧', level: 'B1', group: 'Verbs & Modals', color: 'from-indigo-500 to-violet-500' },

  // Tenses
  { slug: 'tenses-present-simple', title: 'Present Simple', emoji: '📍', level: 'A1', group: 'Tenses', color: 'from-green-500 to-emerald-500' },
  { slug: 'tenses-present-continuous', title: 'Present Continuous', emoji: '🔄', level: 'A1', group: 'Tenses', color: 'from-emerald-500 to-teal-500' },
  { slug: 'tenses-present-perfect', title: 'Present Perfect', emoji: '✅', level: 'A2', group: 'Tenses', color: 'from-teal-500 to-cyan-500' },
  { slug: 'tenses-present-perfect-continuous', title: 'Present Perfect Continuous', emoji: '⏳', level: 'B1', group: 'Tenses', color: 'from-cyan-500 to-sky-500' },
  { slug: 'tenses-past-simple', title: 'Past Simple', emoji: '⏮️', level: 'A1', group: 'Tenses', color: 'from-sky-500 to-blue-500' },
  { slug: 'tenses-past-continuous', title: 'Past Continuous', emoji: '🔙', level: 'A2', group: 'Tenses', color: 'from-blue-500 to-indigo-500' },
  { slug: 'tenses-past-perfect', title: 'Past Perfect', emoji: '📚', level: 'B1', group: 'Tenses', color: 'from-indigo-500 to-violet-500' },
  { slug: 'tenses-past-perfect-continuous', title: 'Past Perfect Continuous', emoji: '🕰️', level: 'B1', group: 'Tenses', color: 'from-violet-500 to-purple-500' },
  { slug: 'tenses-future-simple', title: 'Future Simple', emoji: '🔮', level: 'A2', group: 'Tenses', color: 'from-purple-500 to-fuchsia-500' },
  { slug: 'tenses-future-continuous', title: 'Future Continuous', emoji: '⏭️', level: 'B1', group: 'Tenses', color: 'from-fuchsia-500 to-pink-500' },
  { slug: 'tenses-future-perfect', title: 'Future Perfect', emoji: '🏆', level: 'B1', group: 'Tenses', color: 'from-pink-500 to-rose-500' },
  { slug: 'tenses-future-perfect-continuous', title: 'Future Perfect Continuous', emoji: '🌟', level: 'B2', group: 'Tenses', color: 'from-rose-500 to-red-500' },

  // Advanced Grammar
  { slug: 'adjectives', title: 'Adjectives', emoji: '🎨', level: 'A1', group: 'Advanced', color: 'from-amber-500 to-orange-500' },
  { slug: 'degrees-of-comparison', title: 'Degrees of Comparison', emoji: '📊', level: 'A2', group: 'Advanced', color: 'from-orange-500 to-red-500' },
  { slug: 'adverbs', title: 'Adverbs', emoji: '💨', level: 'A2', group: 'Advanced', color: 'from-red-500 to-rose-500' },
  { slug: 'prepositions', title: 'Prepositions', emoji: '📍', level: 'A2', group: 'Advanced', color: 'from-rose-500 to-pink-500' },
  { slug: 'conjunctions', title: 'Conjunctions', emoji: '🔗', level: 'A2', group: 'Advanced', color: 'from-pink-500 to-fuchsia-500' },
  { slug: 'interjections', title: 'Interjections', emoji: '😲', level: 'A1', group: 'Advanced', color: 'from-fuchsia-500 to-purple-500' },
  { slug: 'determiners', title: 'Determiners', emoji: '📐', level: 'A2', group: 'Advanced', color: 'from-purple-500 to-violet-500' },
  { slug: 'quantifiers', title: 'Quantifiers', emoji: '🔢', level: 'A2', group: 'Advanced', color: 'from-violet-500 to-indigo-500' },
  { slug: 'active-passive-voice', title: 'Active & Passive Voice', emoji: '🔄', level: 'B1', group: 'Advanced', color: 'from-indigo-500 to-blue-500' },
  { slug: 'direct-indirect-speech', title: 'Direct & Indirect Speech', emoji: '💬', level: 'B1', group: 'Advanced', color: 'from-blue-500 to-sky-500' },
  { slug: 'reported-speech', title: 'Reported Speech', emoji: '📢', level: 'B1', group: 'Advanced', color: 'from-sky-500 to-cyan-500' },
  { slug: 'gerunds', title: 'Gerunds', emoji: '🏊', level: 'B1', group: 'Advanced', color: 'from-cyan-500 to-teal-500' },
  { slug: 'infinitives', title: 'Infinitives', emoji: '🎯', level: 'B1', group: 'Advanced', color: 'from-teal-500 to-emerald-500' },
  { slug: 'participles', title: 'Participles', emoji: '📖', level: 'B1', group: 'Advanced', color: 'from-emerald-500 to-green-500' },
  { slug: 'subject-verb-agreement', title: 'Subject-Verb Agreement', emoji: '🤝', level: 'A2', group: 'Advanced', color: 'from-green-500 to-lime-500' },
  { slug: 'question-formation', title: 'Question Formation', emoji: '❓', level: 'A2', group: 'Advanced', color: 'from-lime-500 to-yellow-500' },
  { slug: 'question-tags', title: 'Question Tags', emoji: '🏷️', level: 'A2', group: 'Advanced', color: 'from-yellow-500 to-amber-500' },
  { slug: 'relative-clauses', title: 'Relative Clauses', emoji: '🔗', level: 'B1', group: 'Advanced', color: 'from-amber-500 to-orange-500' },
  { slug: 'common-grammar-errors', title: 'Common Grammar Errors', emoji: '❌', level: 'A2', group: 'Advanced', color: 'from-red-500 to-rose-500' },

  // Conditionals
  { slug: 'conditionals-zero', title: 'Zero Conditional', emoji: '0️⃣', level: 'A2', group: 'Conditionals', color: 'from-blue-500 to-indigo-500' },
  { slug: 'conditionals-first', title: 'First Conditional', emoji: '1️⃣', level: 'A2', group: 'Conditionals', color: 'from-indigo-500 to-violet-500' },
  { slug: 'conditionals-second', title: 'Second Conditional', emoji: '2️⃣', level: 'B1', group: 'Conditionals', color: 'from-violet-500 to-purple-500' },
  { slug: 'conditionals-third', title: 'Third Conditional', emoji: '3️⃣', level: 'B1', group: 'Conditionals', color: 'from-purple-500 to-fuchsia-500' },
  { slug: 'conditionals-mixed', title: 'Mixed Conditional', emoji: '🔀', level: 'B2', group: 'Conditionals', color: 'from-fuchsia-500 to-pink-500' },

  // Usage Patterns
  { slug: 'use-of-there', title: 'Use of There', emoji: '📍', level: 'A1', group: 'Usage', color: 'from-green-500 to-teal-500' },
  { slug: 'use-of-want', title: 'Use of Want', emoji: '🙏', level: 'A1', group: 'Usage', color: 'from-teal-500 to-cyan-500' },
  { slug: 'use-of-wanted', title: 'Use of Wanted', emoji: '📜', level: 'A2', group: 'Usage', color: 'from-cyan-500 to-blue-500' },
  { slug: 'use-of-let', title: 'Use of Let', emoji: '🔓', level: 'A2', group: 'Usage', color: 'from-blue-500 to-indigo-500' },
  { slug: 'use-of-lets', title: "Use of Let's", emoji: '🤝', level: 'A2', group: 'Usage', color: 'from-indigo-500 to-violet-500' },
  { slug: 'would-like-to', title: 'Would Like To', emoji: '🎁', level: 'A2', group: 'Usage', color: 'from-violet-500 to-purple-500' },
  { slug: 'has-to-have-to', title: 'Has To / Have To', emoji: '📋', level: 'A2', group: 'Usage', color: 'from-purple-500 to-fuchsia-500' },
  { slug: 'had-to-will-have-to', title: 'Had To / Will Have To', emoji: '⏰', level: 'B1', group: 'Usage', color: 'from-fuchsia-500 to-pink-500' },
  { slug: 'make-get', title: 'Make / Get', emoji: '🔧', level: 'B1', group: 'Usage', color: 'from-pink-500 to-rose-500' },
  { slug: 'going-to', title: 'Going To', emoji: '🏃', level: 'A2', group: 'Usage', color: 'from-rose-500 to-red-500' },
  { slug: 'about-to', title: 'About To', emoji: '⏱️', level: 'A2', group: 'Usage', color: 'from-amber-500 to-orange-500' },
  { slug: 'want-to-wanted-to', title: 'Want To / Wanted To', emoji: '💫', level: 'A2', group: 'Usage', color: 'from-orange-500 to-red-500' },
  { slug: 'need-to-needed-to', title: 'Need To / Needed To', emoji: '📌', level: 'A2', group: 'Usage', color: 'from-emerald-500 to-green-500' },
  { slug: 'fond-of', title: 'Fond Of', emoji: '❤️', level: 'A2', group: 'Usage', color: 'from-red-500 to-rose-500' },
  { slug: 'able-to', title: 'Able To', emoji: '💪', level: 'A2', group: 'Usage', color: 'from-blue-500 to-cyan-500' },
  { slug: 'wh-words', title: 'WH Words', emoji: '❓', level: 'A1', group: 'Usage', color: 'from-violet-500 to-indigo-500' },
];

// ── Unique groups for filter tabs ────────────────────────────
const GROUPS = ['All', ...new Set(GRAMMAR_TOPICS.map(t => t.group))];

// ── Animation variants ───────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GrammarHubPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  // Filtered topics
  const filtered = useMemo(() => {
    return GRAMMAR_TOPICS.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                            t.slug.toLowerCase().includes(search.toLowerCase());
      const matchesGroup = activeGroup === 'All' || t.group === activeGroup;
      return matchesSearch && matchesGroup;
    });
  }, [search, activeGroup]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* ── Hero Section ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl"
      >
        {/* Animated background orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookMarked className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Grammar Mastery
              </h1>
              <p className="text-white/80 text-lg mt-1">
                94 Topics • 94,000 Practice Questions • Complete Grammar
              </p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-base md:text-lg mt-4">
            🇮🇳 अंग्रेज़ी व्याकरण के हर एक टॉपिक को मास्टर करो। Parts of Speech से लेकर Conditionals तक, 
            हर टॉपिक में 1000 प्रैक्टिस क्वेश्चन और 400 टेस्ट क्वेश्चन तैयार हैं!
          </p>
          
          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { icon: BookOpen, label: '94 Topics', value: 'Complete' },
              { icon: Target, label: '94,000 Questions', value: 'Practice' },
              { icon: Trophy, label: '37,600 Tests', value: 'Assessment' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <Icon size={18} className="text-white/80" />
                <span className="text-white font-bold text-sm">{label}</span>
                <span className="text-white/60 text-xs">({value})</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Search & Filter Bar ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search grammar topics... (e.g., tenses, pronouns, articles)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* Group Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {GROUPS.map(group => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeGroup === group
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {group} {group === 'All' ? `(${GRAMMAR_TOPICS.length})` : `(${GRAMMAR_TOPICS.filter(t => t.group === group).length})`}
          </button>
        ))}
      </div>

      {/* ── Topics Grid ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup + search}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((topic) => (
            <motion.div key={topic.slug} variants={cardVariants}>
              <Link
                href={`/topics/grammar/${topic.slug}`}
                className="group block h-full"
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
                  {/* Gradient top bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${topic.color}`} />
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{topic.emoji}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        topic.level === 'A1' ? 'bg-green-500/20 text-green-400' :
                        topic.level === 'A2' ? 'bg-blue-500/20 text-blue-400' :
                        topic.level === 'B1' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {topic.level}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-indigo-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-slate-500 text-xs mb-3">{topic.group}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-xs">1000 Questions</span>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No topics found</h3>
          <p className="text-slate-400">Try a different search term or filter.</p>
        </div>
      )}
    </div>
  );
}


