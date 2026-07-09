'use client';
// ============================================================
// ASSESSMENT HUB PAGE - Tests, quizzes, and mock tests
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Trophy, Zap, Brain, ChevronRight, Star, Clock } from 'lucide-react';

const TESTS = [
  { slug: 'mixed-grammar', title: 'Mixed Grammar Test', emoji: '📝', questions: 1000, difficulty: 'Medium', time: '60 min' },
  { slug: 'mixed-vocabulary', title: 'Vocabulary Challenge', emoji: '📚', questions: 1000, difficulty: 'Medium', time: '60 min' },
  { slug: 'translation-practice', title: 'Translation Practice', emoji: '🔄', questions: 1000, difficulty: 'Hard', time: '90 min' },
  { slug: 'fill-in-blanks', title: 'Fill in the Blanks', emoji: '✏️', questions: 1000, difficulty: 'Easy', time: '45 min' },
  { slug: 'error-correction', title: 'Error Correction', emoji: '🔍', questions: 1000, difficulty: 'Hard', time: '60 min' },
  { slug: 'sentence-completion', title: 'Sentence Completion', emoji: '📋', questions: 1000, difficulty: 'Medium', time: '45 min' },
  { slug: 'word-formation', title: 'Word Formation', emoji: '🧩', questions: 1000, difficulty: 'Hard', time: '60 min' },
  { slug: 'sentence-transformation', title: 'Sentence Transformation', emoji: '🔀', questions: 1000, difficulty: 'Hard', time: '60 min' },
  { slug: 'cloze-test', title: 'Cloze Test', emoji: '📄', questions: 1000, difficulty: 'Hard', time: '45 min' },
  { slug: 'mock-test-1', title: 'Mock Test 1 (Comprehensive)', emoji: '🏆', questions: 1000, difficulty: 'Expert', time: '120 min' },
  { slug: 'mock-test-2', title: 'Mock Test 2 (Final)', emoji: '🥇', questions: 1000, difficulty: 'Expert', time: '120 min' },
  { slug: 'final-assessment', title: 'Final Assessment', emoji: '🎓', questions: 1000, difficulty: 'Expert', time: '180 min' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AssessmentPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Tests & Assessment</h1>
              <p className="text-white/80 text-lg mt-1">12 Test Types • 12,000 Questions • Prove Your Mastery</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 अपनी अंग्रेज़ी की ताकत को परखो! Mixed Grammar, Vocabulary, Translation, Mock Tests — सब कुछ!
          </p>
        </div>
      </motion.div>

      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTS.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-2xl" />
                <div className="p-6">
                  <span className="text-4xl block mb-3">{t.emoji}</span>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">{t.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-300 flex items-center gap-1">
                      <Target size={12} /> {t.questions} Q
                    </span>
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-300 flex items-center gap-1">
                      <Clock size={12} /> {t.time}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      t.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      t.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      t.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {t.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
