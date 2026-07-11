// ============================================================
// OverviewSection.js - "Why today's topic matters" hero page
// Gen Z styled, glassmorphism, animated entrance
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import {
  BookOpen, Star, Clock, Zap, Globe, Target, ChevronDown,
  Sparkles, Trophy, ArrowRight, Languages, Brain
} from 'lucide-react';

// Stagger container variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

// Motivational quotes pool
const QUOTES = [
  { text: "Every expert was once a beginner. Keep going! 🚀", author: "Unknown" },
  { text: "Language is the road map of a culture. 🗺️", author: "Rita Mae Brown" },
  { text: "One language sets you in a corridor for life. Two open every door. 🚪", author: "Frank Smith" },
  { text: "The limits of your language are the limits of your world. 🌍", author: "Wittgenstein" },
  { text: "To learn a language is to have one more window. 🪟", author: "Chinese Proverb" },
];

// Animated background blob
function Blob({ className }) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl opacity-20 pointer-events-none", className)}
      animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// CEFR badge color map
const CEFR_COLORS = {
  A1: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  A2: 'bg-green-500/20 text-green-400 border-green-500/30',
  B1: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  B2: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  C1: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  C2: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function OverviewSection({ data, dayNum }) {
  const [showHindi, setShowHindi] = useState(false);
  const [quoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));

  const overview = data?.overview || {};
  const {
    summary = "Today's lesson will help you master important English concepts.",
    hindiSummary = "आज का पाठ आपको महत्वपूर्ण अंग्रेजी अवधारणाओं को समझने में मदद करेगा।",
    whatYouWillLearn = [],
  } = overview;

  const topic = data?.topic || 'English Lesson';
  const title = data?.title || topic;
  const emoji = data?.emoji || '📚';
  const cefr = data?.cefr || 'B1';
  const difficulty = data?.difficulty || 'Intermediate';
  const stats = data?.stats || {};

  // XP potential = sum of all activities
  const xpPotential = (stats.practiceCount || 0) * 10 +
    (stats.vocabularyCount || 0) * 5 +
    (stats.mockTestCount || 0) * 15 + 50;

  // Time estimate (rough: 5 min per practice, 2 min per vocab)
  const timeEstimate = Math.max(
    15,
    (stats.practiceCount || 0) * 2 + (stats.vocabularyCount || 0) * 1 + 10
  );

  const quote = QUOTES[quoteIdx];

  // Default learn cards if none provided
  const learnCards = whatYouWillLearn.length > 0 ? whatYouWillLearn : [
    { topic: 'Vocabulary', detail: 'New words with examples', icon: '📖' },
    { topic: 'Grammar', detail: 'Rules and usage patterns', icon: '✍️' },
    { topic: 'Speaking', detail: 'Pronunciation & fluency', icon: '🗣️' },
    { topic: 'Listening', detail: 'Comprehension skills', icon: '👂' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background blobs */}
      <Blob className="w-96 h-96 bg-violet-600 top-0 -left-20" />
      <Blob className="w-80 h-80 bg-purple-500 top-40 right-0" />
      <Blob className="w-64 h-64 bg-cyan-500 bottom-20 left-1/4" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Hero Card ── */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(139,92,246,0.2) 50%, rgba(6,182,212,0.15) 100%)' }}
        >
          <div className="absolute inset-0 backdrop-blur-xl" />
          <div className="relative z-10 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Emoji */}
            <motion.div
              className="text-6xl sm:text-8xl select-none"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.div>

            <div className="flex-1 min-w-0">
              {/* Day badge */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300 font-medium">
                  Day {dayNum}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide",
                  CEFR_COLORS[cefr] || CEFR_COLORS['B1']
                )}>
                  {cefr}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs text-orange-400 font-medium">
                  {difficulty}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">{topic}</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>~{xpPotential} XP today</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  <span>~{timeEstimate} mins</span>
                </div>
                <div className="flex items-center gap-1.5 text-violet-400 text-sm font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>{stats.vocabularyCount || 0} vocab words</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Summary Card ── */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              <h2 className="text-white font-bold text-lg">Today's Overview</h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHindi(!showHindi)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              {showHindi ? 'English' : 'हिंदी'}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={showHindi ? 'hindi' : 'english'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "text-base leading-relaxed",
                showHindi ? "text-orange-200 font-medium" : "text-gray-300"
              )}
            >
              {showHindi ? hindiSummary : summary}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ── What You'll Learn ── */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-white font-bold text-lg">What You'll Learn Today ✨</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {learnCards.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-start gap-4 cursor-default"
              >
                <div className="text-3xl flex-shrink-0">{item.icon || '📌'}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.topic}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5 ml-auto" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── XP & Time Cards ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 text-center">
            <Zap className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-emerald-400">+{xpPotential}</p>
            <p className="text-gray-400 text-xs">XP Potential</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 text-center">
            <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-cyan-400">{timeEstimate}m</p>
            <p className="text-gray-400 text-xs">Estimated Time</p>
          </div>
        </motion.div>

        {/* ── Motivational Quote ── */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-violet-600/20 to-purple-500/20 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 text-center"
        >
          <Sparkles className="w-6 h-6 text-violet-400 mx-auto mb-3" />
          <p className="text-white font-medium text-base sm:text-lg italic leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-gray-500 text-sm mt-2">— {quote.author}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
