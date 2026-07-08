'use client';
// Vocabulary Bank — Complete vocabulary with search, categories, and learning mode
// Uses real vocabularyData.js with 1000+ real words

import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Search, Star, BookOpen, Zap, CheckCircle2,
  Volume2, ArrowRight, Filter, XCircle, Trophy,
  ChevronRight, Target, RotateCcw, Eye, EyeOff,
} from 'lucide-react';
import {
  ALL_VOCABULARY, VOCAB_CATEGORIES_META, getAllWords,
  searchWords, IDIOMS, PHRASAL_VERBS,
} from '@/lib/vocabularyData';
import useUserStore from '@/store/userStore';

// ── Level colors ───────────────────────────────────────────────
const LEVEL_COLORS = {
  A0: 'bg-green-500/20 text-green-300 border-green-500/30',
  A1: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  A2: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  B1: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  B2: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  C1: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

// ── Word Card Component ────────────────────────────────────────
function WordCard({ item, isLearned, onToggleLearn, showHindi }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`card p-4 group cursor-pointer transition-all ${isLearned ? 'border-green-500/20 bg-green-500/3' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-base">{item.word}</span>
            {item.pronunciation && (
              <span className="text-xs text-slate-600 font-mono">/{item.pronunciation}/</span>
            )}
          </div>
          {showHindi && (
            <p className="text-sm text-primary-300 mt-0.5">{item.hindi}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LEVEL_COLORS[item.level] || LEVEL_COLORS.B1}`}>
            {item.level}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleLearn(); }}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
              isLearned ? 'text-green-400 bg-green-500/15' : 'text-slate-600 hover:text-slate-400 hover:bg-white/8'
            }`}
          >
            <CheckCircle2 size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-white/5 mt-2">
              <p className="text-sm text-slate-400 italic leading-relaxed">"{item.example}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!flipped && (
        <p className="text-xs text-slate-600 mt-1 truncate">{item.example}</p>
      )}
    </motion.div>
  );
}

// ── Idioms Section Component ───────────────────────────────────
function IdiomsSection() {
  return (
    <div className="space-y-4">
      <div className="card p-4 border border-amber-500/20 bg-amber-500/5">
        <p className="text-sm text-slate-400">
          <span className="text-amber-300 font-semibold">Idioms</span> — इन्हें literally translate मत करो!
          हर idiom का एक figurative meaning होता है। Context में use करना सीखो।
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {IDIOMS.map(({ word, hindi, example, level }) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="font-bold text-white text-sm flex-1">{word}</p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ml-2 ${LEVEL_COLORS[level] || LEVEL_COLORS.B1}`}>{level}</span>
            </div>
            <p className="text-xs text-amber-300 mb-1.5">{hindi}</p>
            <p className="text-xs text-slate-500 italic">"{example}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Phrasal Verbs Section ──────────────────────────────────────
function PhrasalVerbsSection() {
  return (
    <div className="space-y-4">
      <div className="card p-4 border border-orange-500/20 bg-orange-500/5">
        <p className="text-sm text-slate-400">
          <span className="text-orange-300 font-semibold">Phrasal Verbs</span> — English में verb + preposition मिलकर एक नया meaning बनाते हैं।
          ये professional conversations में बहुत common हैं। Master karo इन्हें!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PHRASAL_VERBS.map(({ word, hindi, example, level }) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4"
          >
            <div className="flex items-start justify-between mb-1.5">
              <p className="font-bold text-white text-base">{word}</p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ml-2 ${LEVEL_COLORS[level] || LEVEL_COLORS.B1}`}>{level}</span>
            </div>
            <p className="text-xs text-orange-300 mb-1.5">{hindi}</p>
            <p className="text-xs text-slate-500 italic">"{example}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function VocabularyBankPage() {
  const [activeCategory, setActiveCategory] = useState('office');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedLevel,  setSelectedLevel]  = useState('All');
  const [learnedWords,   setLearnedWords]   = useState(new Set());
  const [showHindi,      setShowHindi]      = useState(true);
  const [quizMode,       setQuizMode]       = useState(false);

  const { addXP } = useUserStore() || {};

  // Get words for active category or search results
  const displayWords = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      let results = searchWords(searchQuery);
      if (selectedLevel !== 'All') results = results.filter(w => w.level === selectedLevel);
      return results;
    }
    if (activeCategory === 'idioms') return IDIOMS;
    if (activeCategory === 'phrasal-verbs') return PHRASAL_VERBS;
    let words = ALL_VOCABULARY[activeCategory] || [];
    if (selectedLevel !== 'All') words = words.filter(w => w.level === selectedLevel);
    return words;
  }, [activeCategory, searchQuery, selectedLevel]);

  const toggleLearn = useCallback((wordKey) => {
    setLearnedWords(prev => {
      const next = new Set(prev);
      if (next.has(wordKey)) {
        next.delete(wordKey);
      } else {
        next.add(wordKey);
        addXP?.(5);
      }
      return next;
    });
  }, [addXP]);

  const learnedCount  = learnedWords.size;
  const totalWords    = getAllWords().length;
  const progressPct   = Math.round((learnedCount / totalWords) * 100);

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-emerald-600/20 via-teal-600/15 to-cyan-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Globe size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Vocabulary Bank</h1>
                <p className="text-sm text-emerald-300 font-medium">1000+ Real words with Hindi meanings</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Daily Life, Office, Travel, Idioms, Phrasal Verbs — सब categories में real words with examples. 
              Mark as learned, track your progress.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-emerald-300">{learnedCount}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Learned</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-teal-300">{totalWords}+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Words</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-cyan-300">{progressPct}%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Progress</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Search + Filters ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, meanings, phrases..."
            className="input pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="input text-sm px-3 pr-8 min-w-[80px] bg-surface-900"
          >
            {['All', 'A0', 'A1', 'A2', 'B1', 'B2', 'C1'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <button
            onClick={() => setShowHindi(!showHindi)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all ${
              showHindi
                ? 'bg-primary-500/15 text-primary-300 border-primary-500/30'
                : 'bg-white/5 text-slate-500 border-white/8'
            }`}
          >
            {showHindi ? <Eye size={14} /> : <EyeOff size={14} />}
            Hindi
          </button>
        </div>
      </div>

      {/* Search Results Banner */}
      {searchQuery.trim().length > 1 && (
        <div className="card p-3 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Found <span className="text-white font-bold">{displayWords.length}</span> results for "{searchQuery}"
          </p>
          <button onClick={() => setSearchQuery('')} className="text-xs text-primary-400 hover:text-primary-300">Clear</button>
        </div>
      )}

      {/* ── Category Grid ─────────────────────────────────────── */}
      {!searchQuery && (
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {VOCAB_CATEGORIES_META.map(({ id, label, emoji, color, level, count }) => (
              <motion.button
                key={id}
                onClick={() => setActiveCategory(id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl border transition-all text-left group ${
                  activeCategory === id
                    ? 'border-primary-500/40 bg-primary-500/10'
                    : 'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15'
                }`}
              >
                <span className="text-xl mb-2 block">{emoji}</span>
                <p className="font-semibold text-white text-xs leading-tight">{label}</p>
                <p className="text-[10px] text-slate-500 mt-1">{count} words • {level}</p>
              </motion.button>
            ))}
            {/* Special categories */}
            {[
              { id:'idioms',         label:'Idioms',         emoji:'💬', count:20, level:'B1-C1' },
              { id:'phrasal-verbs',  label:'Phrasal Verbs',  emoji:'🔀', count:22, level:'B1' },
            ].map(({ id, label, emoji, count, level }) => (
              <motion.button
                key={id}
                onClick={() => setActiveCategory(id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl border transition-all text-left group ${
                  activeCategory === id
                    ? 'border-primary-500/40 bg-primary-500/10'
                    : 'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15'
                }`}
              >
                <span className="text-xl mb-2 block">{emoji}</span>
                <p className="font-semibold text-white text-xs leading-tight">{label}</p>
                <p className="text-[10px] text-slate-500 mt-1">{count} items • {level}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── Word List ─────────────────────────────────────────── */}
      <div>
        {activeCategory !== 'idioms' && activeCategory !== 'phrasal-verbs' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {searchQuery ? `Search Results (${displayWords.length})` : `${VOCAB_CATEGORIES_META.find(c => c.id === activeCategory)?.label || activeCategory} (${displayWords.length})`}
              </h3>
              {learnedWords.size > 0 && (
                <button
                  onClick={() => setLearnedWords(new Set())}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              )}
            </div>
            {displayWords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayWords.map((item, i) => (
                  <WordCard
                    key={`${item.word}-${i}`}
                    item={item}
                    isLearned={learnedWords.has(item.word)}
                    onToggleLearn={() => toggleLearn(item.word)}
                    showHindi={showHindi}
                  />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <Globe size={40} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No words found. Try a different search or category.</p>
              </div>
            )}
          </>
        ) : activeCategory === 'idioms' ? (
          <IdiomsSection />
        ) : (
          <PhrasalVerbsSection />
        )}
      </div>

      {/* ── Study Tips ───────────────────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          Vocabulary Learning Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { tip:'Context Method', desc:'सिर्फ word नहीं — example sentence भी याद करो। Context में याद रहता है।' },
            { tip:'Spaced Repetition', desc:'नए words को: 1 day बाद, 3 days बाद, 7 days बाद, 30 days बाद revise करो।' },
            { tip:'Use in Sentences', desc:'हर नए word से कम से कम 3 sentences बनाओ। Writing और speaking में use karo।' },
            { tip:'Word Families', desc:"'Decide' सीखो तो 'decision, decisive, indecisive' भी सीखो — एक साथ 4 words!" },
          ].map(({ tip, desc }) => (
            <div key={tip} className="flex items-start gap-3">
              <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">{tip}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
