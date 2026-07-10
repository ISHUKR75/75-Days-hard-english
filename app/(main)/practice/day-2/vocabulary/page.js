'use client';
// ============================================================
// Day 2 — Vocabulary Explorer Page
// Shows all 1000 words with search, filter, flashcard mode,
// pronunciation guide, usage examples, and progress tracking.
// ============================================================

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, BookOpen, Volume2, Star, StarOff, ChevronLeft,
  ChevronRight, ArrowLeft, Filter, Grid3X3, List, 
  Trophy, Zap, Eye, EyeOff, RotateCcw, Bookmark,
  X, Check, TrendingUp, Award, Target, Sparkles, Globe,
  CheckCircle2, XCircle, Shuffle, ChevronDown, ChevronUp
} from 'lucide-react';

// ── Difficulty badge colours ──────────────────────────────────────────────────
const DIFFICULTY_COLORS = {
  easy:   'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  hard:   'bg-red-100 text-red-700 border-red-200',
};

// ── CEFR badge colours ────────────────────────────────────────────────────────
const CEFR_COLORS = {
  A1: 'bg-blue-100 text-blue-700',
  A2: 'bg-indigo-100 text-indigo-700',
  B1: 'bg-purple-100 text-purple-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100 text-red-700',
  C2: 'bg-rose-100 text-rose-700',
};

// ── Single word card component ────────────────────────────────────────────────
function WordCard({ word, isStarred, onToggleStar, onMarkLearned, isLearned, viewMode }) {
  const [isExpanded, setIsExpanded]       = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);

  // Text-to-speech pronunciation
  const handleSpeak = useCallback((e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [word.word]);

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`bg-white rounded-xl border transition-all duration-200 ${
          isLearned ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-blue-200'
        } shadow-sm hover:shadow-md`}
      >
        {/* List row */}
        <div
          className="flex items-center gap-4 p-4 cursor-pointer"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          {/* Word */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-lg ${isLearned ? 'text-green-700' : 'text-gray-800'}`}>
                {word.word}
              </span>
              {word.pronunciation && (
                <span className="text-xs text-gray-400 font-mono">/{word.pronunciation}/</span>
              )}
              {word.cefr && (
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${CEFR_COLORS[word.cefr] || 'bg-gray-100 text-gray-600'}`}>
                  {word.cefr}
                </span>
              )}
              {word.difficulty && (
                <span className={`text-xs px-1.5 py-0.5 rounded border ${DIFFICULTY_COLORS[word.difficulty] || ''}`}>
                  {word.difficulty}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-0.5 truncate">{word.meaning || word.hindiMeaning}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg transition-colors ${isSpeaking ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
              title="Pronounce"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
              className={`p-1.5 rounded-lg transition-colors ${isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
              title="Bookmark"
            >
              {isStarred ? <Star className="w-4 h-4 fill-yellow-400" /> : <StarOff className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMarkLearned(); }}
              className={`p-1.5 rounded-lg transition-colors ${isLearned ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-600'}`}
              title="Mark as learned"
            >
              <Check className="w-4 h-4" />
            </button>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-gray-100 pt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {word.simpleMeaning && (
                  <div>
                    <span className="font-semibold text-gray-700">Simple English: </span>
                    <span className="text-gray-600">{word.simpleMeaning}</span>
                  </div>
                )}
                {(word.synonyms?.length > 0) && (
                  <div>
                    <span className="font-semibold text-gray-700">Synonyms: </span>
                    <span className="text-blue-600">{word.synonyms.join(', ')}</span>
                  </div>
                )}
                {(word.antonyms?.length > 0) && (
                  <div>
                    <span className="font-semibold text-gray-700">Antonyms: </span>
                    <span className="text-red-500">{word.antonyms.join(', ')}</span>
                  </div>
                )}
                {word.exampleSentence && (
                  <div className="md:col-span-2 bg-blue-50 rounded-lg p-2">
                    <span className="font-semibold text-gray-700">Example: </span>
                    <span className="text-gray-700 italic">{word.exampleSentence}</span>
                  </div>
                )}
                {word.officeUsage && (
                  <div className="md:col-span-2 bg-purple-50 rounded-lg p-2">
                    <span className="font-semibold text-gray-700">Office Usage: </span>
                    <span className="text-gray-700 italic">{word.officeUsage}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Grid card view
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col ${
        isLearned ? 'border-green-200 ring-2 ring-green-100' : 'border-gray-100 hover:border-blue-200'
      }`}
      onClick={() => setIsExpanded(prev => !prev)}
    >
      {/* Card top */}
      <div className="p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {word.cefr && (
                <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${CEFR_COLORS[word.cefr] || ''}`}>
                  {word.cefr}
                </span>
              )}
              {word.difficulty && (
                <span className={`text-xs px-1.5 py-0.5 rounded border ${DIFFICULTY_COLORS[word.difficulty] || ''}`}>
                  {word.difficulty}
                </span>
              )}
              {isLearned && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </div>
            <h3 className={`text-xl font-bold ${isLearned ? 'text-green-700' : 'text-gray-800'}`}>
              {word.word}
            </h3>
            {word.pronunciation && (
              <p className="text-xs text-gray-400 font-mono mt-0.5">/{word.pronunciation}/</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-1 ml-2">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg ${isSpeaking ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'} transition-colors`}
              title="Pronounce"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
              className={`p-1.5 rounded-lg ${isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'} transition-colors`}
              title="Bookmark"
            >
              {isStarred ? <Star className="w-4 h-4 fill-yellow-400" /> : <StarOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Meaning */}
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          {word.meaning || word.hindiMeaning}
        </p>
        {word.simpleMeaning && (
          <p className="text-gray-500 text-xs italic">{word.simpleMeaning}</p>
        )}
      </div>

      {/* Expanded section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-gray-100 pt-3 space-y-2 text-xs">
              {word.exampleSentence && (
                <div className="bg-blue-50 rounded-lg p-2">
                  <span className="font-semibold text-blue-700">Example: </span>
                  <span className="text-gray-700 italic">{word.exampleSentence}</span>
                </div>
              )}
              {(word.synonyms?.length > 0) && (
                <div>
                  <span className="font-semibold text-gray-600">Synonyms: </span>
                  <span className="text-blue-600">{word.synonyms.slice(0, 3).join(', ')}</span>
                </div>
              )}
              {(word.antonyms?.length > 0) && (
                <div>
                  <span className="font-semibold text-gray-600">Antonyms: </span>
                  <span className="text-red-500">{word.antonyms.slice(0, 3).join(', ')}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card footer */}
      <div className="px-5 pb-4">
        <button
          onClick={(e) => { e.stopPropagation(); onMarkLearned(); }}
          className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            isLearned
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          {isLearned ? '✓ Learned' : 'Mark as Learned'}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main vocabulary page ──────────────────────────────────────────────────────
export default function Day2VocabularyPage() {
  // State
  const [words, setWords]                   = useState([]);
  const [loading, setLoading]               = useState(true);
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedDifficulty, setDifficulty] = useState('all');
  const [selectedCEFR, setCEFR]             = useState('all');
  const [viewMode, setViewMode]             = useState('grid'); // 'grid' | 'list'
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [showLearnedOnly, setShowLearnedOnly] = useState(false);
  const [sortBy, setSortBy]                 = useState('default'); // 'default' | 'alpha' | 'difficulty'
  const [starredWords, setStarredWords]     = useState(new Set());
  const [learnedWords, setLearnedWords]     = useState(new Set());
  const [currentPage, setCurrentPage]       = useState(1);
  const [showFilters, setShowFilters]       = useState(false);
  const searchRef = useRef(null);
  const WORDS_PER_PAGE = viewMode === 'grid' ? 24 : 30;

  // Load vocabulary from API
  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const vocab = data?.vocabulary || [];
        setWords(vocab);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedStars   = JSON.parse(localStorage.getItem('day2-starred-words') || '[]');
      const savedLearned = JSON.parse(localStorage.getItem('day2-learned-words') || '[]');
      setStarredWords(new Set(savedStars));
      setLearnedWords(new Set(savedLearned));
    } catch { /* ignore */ }
  }, []);

  // Save starred words
  const toggleStar = useCallback((wordText) => {
    setStarredWords(prev => {
      const next = new Set(prev);
      next.has(wordText) ? next.delete(wordText) : next.add(wordText);
      localStorage.setItem('day2-starred-words', JSON.stringify([...next]));
      return next;
    });
  }, []);

  // Save learned words
  const toggleLearned = useCallback((wordText) => {
    setLearnedWords(prev => {
      const next = new Set(prev);
      next.has(wordText) ? next.delete(wordText) : next.add(wordText);
      localStorage.setItem('day2-learned-words', JSON.stringify([...next]));
      return next;
    });
  }, []);

  // Filter + search logic
  const filteredWords = useMemo(() => {
    let result = [...words];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w =>
        (w.word || '').toLowerCase().includes(q) ||
        (w.meaning || '').toLowerCase().includes(q) ||
        (w.hindiMeaning || '').toLowerCase().includes(q) ||
        (w.simpleMeaning || '').toLowerCase().includes(q)
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(w => w.difficulty === selectedDifficulty);
    }

    // CEFR filter
    if (selectedCEFR !== 'all') {
      result = result.filter(w => w.cefr === selectedCEFR);
    }

    // Starred only
    if (showStarredOnly) {
      result = result.filter(w => starredWords.has(w.word));
    }

    // Learned only
    if (showLearnedOnly) {
      result = result.filter(w => learnedWords.has(w.word));
    }

    // Sort
    if (sortBy === 'alpha') {
      result.sort((a, b) => (a.word || '').localeCompare(b.word || ''));
    } else if (sortBy === 'difficulty') {
      const order = { easy: 0, medium: 1, hard: 2 };
      result.sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1));
    }

    return result;
  }, [words, searchQuery, selectedDifficulty, selectedCEFR, showStarredOnly, showLearnedOnly, sortBy, starredWords, learnedWords]);

  // Reset to page 1 on filter change
  useEffect(() => { setCurrentPage(1); }, [filteredWords.length]);

  // Pagination
  const totalPages   = Math.ceil(filteredWords.length / WORDS_PER_PAGE);
  const pageWords    = filteredWords.slice((currentPage - 1) * WORDS_PER_PAGE, currentPage * WORDS_PER_PAGE);

  // Stats
  const stats = {
    total:   words.length,
    learned: learnedWords.size,
    starred: starredWords.size,
    percent: words.length ? Math.round((learnedWords.size / words.length) * 100) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/practice/day-2"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:block">Day 2</span>
            </Link>

            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Vocabulary Explorer
              </h1>
              <p className="text-xs text-gray-500 text-center">Day 2 — Self Introduction</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                title="Toggle view"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Words', value: stats.total, icon: BookOpen, color: 'blue' },
            { label: 'Learned', value: stats.learned, icon: CheckCircle2, color: 'green' },
            { label: 'Bookmarked', value: stats.starred, icon: Star, color: 'yellow' },
            { label: 'Progress', value: `${stats.percent}%`, icon: TrendingUp, color: 'purple' },
          ].map(stat => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-blue-600">{stats.learned} / {stats.total} words learned</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* ── Search and Filters ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search words, meanings, Hindi translations..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFilters(f => !f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Quick filter pills */}
            <button
              onClick={() => setShowStarredOnly(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showStarredOnly ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'}`}
            >
              <Star className="w-4 h-4" />
              Starred ({stats.starred})
            </button>
            <button
              onClick={() => setShowLearnedOnly(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showLearnedOnly ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
            >
              <Check className="w-4 h-4" />
              Learned ({stats.learned})
            </button>

            {/* Result count */}
            <span className="text-sm text-gray-500 ml-auto">
              {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''} shown
            </span>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-100 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Difficulty */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block">Difficulty</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'easy', 'medium', 'hard'].map(d => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                            selectedDifficulty === d
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CEFR */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block">CEFR Level</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map(c => (
                        <button
                          key={c}
                          onClick={() => setCEFR(c)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            selectedCEFR === c
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'default', label: 'Default' },
                        { id: 'alpha', label: 'A-Z' },
                        { id: 'difficulty', label: 'Difficulty' },
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSortBy(s.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            sortBy === s.id
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Words Grid / List ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            />
            <p className="text-gray-500 font-medium">Loading 1000+ vocabulary words...</p>
          </div>
        ) : filteredWords.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No words found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setDifficulty('all'); setCEFR('all'); setShowStarredOnly(false); setShowLearnedOnly(false); }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                  : 'flex flex-col gap-3'
              }>
                {pageWords.map((word, idx) => (
                  <WordCard
                    key={`${word.word}-${idx}`}
                    word={word}
                    isStarred={starredWords.has(word.word)}
                    isLearned={learnedWords.has(word.word)}
                    onToggleStar={() => toggleStar(word.word)}
                    onMarkLearned={() => toggleLearned(word.word)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </AnimatePresence>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-40 hover:bg-blue-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 7) {
                    page = i + 1;
                  } else if (currentPage <= 4) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    page = totalPages - 6 + i;
                  } else {
                    page = currentPage - 3 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-40 hover:bg-blue-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Quick Nav to other Day 2 sections ── */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Continue Learning — Day 2 Sections
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/practice/day-2', label: 'Practice', emoji: '📝' },
              { href: '/practice/day-2/grammar', label: 'Grammar', emoji: '📖' },
              { href: '/practice/day-2/test', label: 'Test', emoji: '🎯' },
              { href: '/practice/day-2/flashcards', label: 'Flashcards', emoji: '🃏' },
              { href: '/practice/day-2/speaking', label: 'Speaking', emoji: '🎤' },
              { href: '/practice/day-2/writing', label: 'Writing', emoji: '✍️' },
              { href: '/practice/day-2/stories', label: 'Stories', emoji: '📚' },
              { href: '/practice/day-2/revision', label: 'Revision', emoji: '🔄' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all text-sm font-medium text-gray-700 border border-transparent hover:border-blue-200"
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
