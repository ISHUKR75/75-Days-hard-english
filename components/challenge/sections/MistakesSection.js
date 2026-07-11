// ============================================================
// MistakesSection.js — Common Grammar Mistakes
// Teacher-style correction cards with quiz mode
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  XCircle, CheckCircle, BookOpen, Search, Filter,
  ThumbsUp, AlertTriangle, Brain, Zap, Target, RotateCcw,
  ChevronDown, ChevronUp, Lightbulb, Award
} from 'lucide-react';

// ── Category color map ───────────────────────────────────────
const CAT_COLORS = {
  tense:       'bg-violet-400/10 text-violet-300 border-violet-400/20',
  preposition: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
  article:     'bg-blue-400/10 text-blue-300 border-blue-400/20',
  spelling:    'bg-orange-400/10 text-orange-300 border-orange-400/20',
  grammar:     'bg-purple-400/10 text-purple-300 border-purple-400/20',
  vocabulary:  'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  default:     'bg-white/10 text-gray-300 border-white/10',
};

const catColor = (cat) => CAT_COLORS[cat?.toLowerCase()] || CAT_COLORS.default;

// ── Single mistake card ──────────────────────────────────────
function MistakeCard({ mistake, index, understood, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`bg-white/5 border rounded-2xl overflow-hidden transition-all ${
        understood ? 'border-emerald-400/30' : 'border-white/10'}`}
    >
      {/* Card header */}
      <div className="p-5">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${catColor(mistake.category)}`}>
            {mistake.category || 'Grammar'}
          </span>
          {understood && (
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
              <CheckCircle size={13} /> Got it!
            </span>
          )}
        </div>

        {/* Wrong sentence */}
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-3 mb-3 flex items-start gap-2">
          <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm line-through leading-relaxed">{mistake.wrong}</p>
        </div>

        {/* Correct sentence */}
        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3 mb-4 flex items-start gap-2">
          <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-emerald-300 text-sm font-semibold leading-relaxed">{mistake.correct}</p>
        </div>

        {/* Rule (collapsible) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-left hover:bg-white/10 transition-all"
        >
          <span className="flex items-center gap-2 text-gray-300 text-sm font-medium">
            <Lightbulb size={14} className="text-yellow-400" /> Rule Explanation
          </span>
          {expanded ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
                <p className="text-yellow-100 text-sm leading-relaxed">{mistake.rule || 'Remember this grammar rule carefully!'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Got it" button */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => onToggle(mistake.id)}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all border ${
            understood
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <ThumbsUp size={15} />
          {understood ? 'Understood ✅' : 'Got it! 👍'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Quiz mode card ───────────────────────────────────────────
function QuizCard({ mistake, onCorrect, onWrong }) {
  const [userInput, setUserInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(null);

  const checkAnswer = () => {
    if (!userInput.trim()) return;
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/gi, '').trim();
    const isCorrect = norm(userInput) === norm(mistake.correct);
    setCorrect(isCorrect);
    setRevealed(true);
    if (isCorrect) onCorrect();
    else onWrong();
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-xs text-violet-400 uppercase tracking-widest mb-3 font-semibold">Fix the mistake</div>
      {/* Wrong sentence prompt */}
      <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-3 mb-4 flex items-start gap-2">
        <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-red-300 text-sm line-through">{mistake.wrong}</p>
      </div>

      {!revealed ? (
        <>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type the correct sentence..."
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-400/50 resize-none mb-3"
          />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={checkAnswer}
            className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold rounded-xl text-sm">
            Check Answer
          </motion.button>
        </>
      ) : (
        <div>
          <div className={`rounded-xl p-3 mb-3 flex items-start gap-2 ${correct ? 'bg-emerald-500/10 border border-emerald-400/20' : 'bg-red-500/10 border border-red-400/20'}`}>
            {correct ? <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />}
            <p className={`text-sm ${correct ? 'text-emerald-300' : 'text-red-300'}`}>
              {correct ? 'Nailed it! 🔥' : `Correct: ${mistake.correct}`}
            </p>
          </div>
          {mistake.rule && (
            <p className="text-gray-400 text-xs bg-white/5 rounded-xl p-3">{mistake.rule}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function MistakesSection({ data, dayNum }) {
  const mistakes = data?.commonMistakes?.mistakes ?? [];
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const [understood, setUnderstood] = useState(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem(`mistakes_understood_day${dayNum}`);
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [catFilter, setCatFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState({ correct: 0, wrong: 0 });

  // Unique categories
  const categories = ['all', ...new Set(mistakes.map(m => m.category).filter(Boolean))];

  // Filtered mistakes
  const filtered = mistakes.filter(m => {
    const matchCat = catFilter === 'all' || m.category === catFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || m.wrong?.toLowerCase().includes(q) || m.correct?.toLowerCase().includes(q) || m.rule?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const understoodCount = filtered.filter(m => understood.has(m.id)).length;
  const progressPct = filtered.length ? Math.round((understoodCount / filtered.length) * 100) : 0;

  // Persist understood
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`mistakes_understood_day${dayNum}`, JSON.stringify([...understood]));
    }
  }, [understood, dayNum]);

  const toggleUnderstood = (id) => {
    setUnderstood(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); }
      else { n.add(id); addXP(5); recordQuestionResult?.(id, true); }
      return n;
    });
  };

  // Quiz deck = not-understood in filtered
  const quizDeck = filtered.filter(m => !understood.has(m.id));
  const quizCard = quizDeck[quizIndex % Math.max(1, quizDeck.length)];

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center mb-8">
        <div className="text-5xl mb-3">🚫</div>
        <h1 className="text-3xl font-black text-white mb-2">Common Mistakes</h1>
        {/* Teacher note */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left mt-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Hey! 👋 These are the most common mistakes learners make — and honestly, totally understandable! Go through each one,
            understand <span className="text-violet-300 font-semibold">WHY</span> it's wrong, and click <span className="text-emerald-400 font-semibold">"Got it!"</span> when it clicks.
            No judgment here, we're all learning! 💜
          </p>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Understood {understoodCount} / {filtered.length} mistakes</span>
          <span className="text-violet-400 font-semibold">{progressPct}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Mode toggle */}
      <div className="max-w-2xl mx-auto flex gap-3 mb-6">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizMode(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
            !quizMode ? 'bg-violet-500/30 border-violet-400/50 text-violet-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
          <BookOpen size={15} /> Study Mode
        </motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setQuizMode(true); setQuizIndex(0); setQuizScore({ correct: 0, wrong: 0 }); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
            quizMode ? 'bg-cyan-500/30 border-cyan-400/50 text-cyan-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
          <Brain size={15} /> Quiz Mode
        </motion.button>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search mistakes..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-400/50"
        />
      </div>

      {/* Category filters */}
      <div className="max-w-2xl mx-auto flex gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map(c => (
          <motion.button key={c} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCatFilter(c)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
              catFilter === c ? 'bg-violet-500/20 border-violet-400/40 text-violet-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
            {c}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      {quizMode ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Quiz: {quizIndex + 1} / {quizDeck.length}</span>
            <div className="flex gap-4 text-sm">
              <span className="text-emerald-400">✅ {quizScore.correct}</span>
              <span className="text-red-400">❌ {quizScore.wrong}</span>
            </div>
          </div>
          {quizDeck.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div key={quizIndex}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <QuizCard
                  mistake={quizCard}
                  onCorrect={() => {
                    setQuizScore(s => ({ ...s, correct: s.correct + 1 }));
                    addXP(10);
                    setTimeout(() => setQuizIndex(i => i + 1), 1500);
                  }}
                  onWrong={() => {
                    setQuizScore(s => ({ ...s, wrong: s.wrong + 1 }));
                    setTimeout(() => setQuizIndex(i => i + 1), 2000);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-10">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-emerald-400 font-black text-xl mb-2">All understood!</h3>
              <p className="text-gray-400 text-sm mb-4">You've nailed all the mistakes. Actual W. 🏆</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setUnderstood(new Set()); setQuizIndex(0); }}
                className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-xl text-sm">
                Reset & Practice Again
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <AlertTriangle size={32} className="mx-auto mb-3 opacity-50" />
              <p>No mistakes match your search</p>
            </div>
          ) : (
            filtered.map((mistake, i) => (
              <MistakeCard
                key={mistake.id}
                mistake={mistake}
                index={i}
                understood={understood.has(mistake.id)}
                onToggle={toggleUnderstood}
              />
            ))
          )}
        </div>
      )}

      {/* Completion message */}
      <AnimatePresence>
        {!quizMode && understoodCount === filtered.length && filtered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-violet-600/20 to-emerald-600/20 border border-emerald-400/30 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🧑‍🏫</div>
            <h3 className="text-white font-black text-xl mb-1">Teacher is proud! 🎉</h3>
            <p className="text-gray-400 text-sm">You've understood all {filtered.length} common mistakes. Now go quiz yourself!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
