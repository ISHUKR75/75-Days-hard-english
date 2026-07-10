'use client';
// ============================================================
// Day 2 — Flashcard System
// 500 flashcards with flip animation, spaced repetition,
// categories, progress tracking, and multiple study modes.
// ============================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  RotateCcw, ArrowLeft, ArrowRight, Check, X, Star, StarOff,
  Shuffle, BookOpen, Target, Trophy, Zap, ChevronLeft,
  ChevronRight, BarChart3, Timer, Play, Eye, Filter, Sparkles, Volume2
} from 'lucide-react';

// ── Flip card component ───────────────────────────────────────────────────────
function FlipCard({ card, onKnow, onDontKnow, isStarred, onToggleStar }) {
  const [isFlipped, setIsFlipped]   = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = useCallback((e, text) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window && text) {
      setIsSpeaking(true);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.85;
      u.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  }, []);

  const frontText = card.front || card.hindi || card.question || '';
  const backText  = card.back || card.english || card.answer || '';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card */}
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: '1200px', height: '320px' }}
        onClick={() => setIsFlipped(f => !f)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white"
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                {card.tag || card.category || 'Flashcard'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
                  className="text-white/70 hover:text-yellow-300 transition-colors"
                >
                  {isStarred ? <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" /> : <StarOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/60 mb-4 uppercase tracking-wider">Translate / Answer</p>
              <p className="text-2xl md:text-3xl font-bold leading-relaxed text-center">
                {frontText}
              </p>
            </div>

            <p className="absolute bottom-4 text-white/40 text-xs flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Click to flip
            </p>
          </div>

          {/* Back */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
            className="bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-green-200"
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Answer</span>
              <button
                onClick={(e) => handleSpeak(e, backText)}
                className={`text-gray-400 hover:text-blue-600 transition-colors ${isSpeaking ? 'text-blue-600' : ''}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-3">
                {backText}
              </p>
              {card.hint && (
                <p className="text-sm text-blue-600 italic">{card.hint}</p>
              )}
              {card.difficulty && (
                <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${
                  card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {card.difficulty}
                </span>
              )}
            </div>

            <p className="absolute bottom-4 text-gray-300 text-xs">Tap the card to flip back</p>
          </div>
        </motion.div>
      </div>

      {/* Action buttons (only show after flip) */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => { setIsFlipped(false); onDontKnow(); }}
              className="flex items-center gap-2 px-8 py-3 bg-red-50 border-2 border-red-200 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all shadow-md"
            >
              <X className="w-5 h-5" />
              Don't Know
            </button>
            <button
              onClick={() => { setIsFlipped(false); onKnow(); }}
              className="flex items-center gap-2 px-8 py-3 bg-green-50 border-2 border-green-200 text-green-600 rounded-2xl font-bold hover:bg-green-100 transition-all shadow-md"
            >
              <Check className="w-5 h-5" />
              I Know This!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFlipped && (
        <p className="text-sm text-gray-400 flex items-center gap-1">
          <Eye className="w-4 h-4" /> Click the card to see the answer
        </p>
      )}
    </div>
  );
}

// ── Main flashcard page ───────────────────────────────────────────────────────
export default function Day2FlashcardsPage() {
  const [allCards, setAllCards]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [sessionCards, setSessionCards] = useState([]);
  const [currentIdx, setCurrentIdx]     = useState(0);
  const [known, setKnown]               = useState(new Set());
  const [dontKnow, setDontKnow]         = useState(new Set());
  const [starred, setStarred]           = useState(new Set());
  const [mode, setMode]                 = useState('setup'); // setup | study | complete
  const [selectedCategory, setCategory] = useState('all');
  const [sessionConfig, setConfig]      = useState({ count: 20, shuffle: true });

  // Load flashcards from API or data file
  useEffect(() => {
    fetch('/data/challenge/day-02/flashcards.json')
      .then(r => r.json())
      .then(data => {
        const cards = data?.categories?.flatMap(c => c.cards) || [];
        setAllCards(cards);
        setLoading(false);
      })
      .catch(() => {
        // Fallback: load from challenge API
        fetch('/api/challenge/2')
          .then(r => r.json())
          .then(data => {
            // Generate minimal fallback cards from vocab
            const vocab = data?.vocabulary || [];
            const cards = vocab.slice(0, 100).map((w, i) => ({
              id: i + 1,
              front: `${w.hindiMeaning || w.meaning} — What is this word in English?`,
              back: w.word,
              hint: w.simpleMeaning,
              difficulty: w.difficulty || 'easy',
              tag: 'vocabulary',
            }));
            setAllCards(cards);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });

    // Load saved state
    try {
      const s = JSON.parse(localStorage.getItem('day2-fc-starred') || '[]');
      setStarred(new Set(s));
    } catch { /* ignore */ }
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allCards.map(c => c.tag || c.category || 'General'));
    return ['all', ...cats];
  }, [allCards]);

  const startSession = () => {
    let pool = [...allCards];
    if (selectedCategory !== 'all') {
      pool = pool.filter(c => (c.tag || c.category || 'General') === selectedCategory);
    }
    if (sessionConfig.shuffle) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    setSessionCards(pool.slice(0, Math.min(sessionConfig.count, pool.length)));
    setCurrentIdx(0);
    setKnown(new Set());
    setDontKnow(new Set());
    setMode('study');
  };

  const handleKnow = () => {
    const id = sessionCards[currentIdx]?.id;
    if (id !== undefined) setKnown(prev => new Set([...prev, id]));
    if (currentIdx < sessionCards.length - 1) setCurrentIdx(i => i + 1);
    else setMode('complete');
  };

  const handleDontKnow = () => {
    const id = sessionCards[currentIdx]?.id;
    if (id !== undefined) setDontKnow(prev => new Set([...prev, id]));
    if (currentIdx < sessionCards.length - 1) setCurrentIdx(i => i + 1);
    else setMode('complete');
  };

  const toggleStar = useCallback((id) => {
    setStarred(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem('day2-fc-starred', JSON.stringify([...next]));
      return next;
    });
  }, []);

  const progress = sessionCards.length ? Math.round(((currentIdx) / sessionCards.length) * 100) : 0;
  const currentCard = sessionCards[currentIdx];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  // ── Complete screen ──
  if (mode === 'complete') {
    const knownCount = known.size;
    const dontKnowCount = dontKnow.size;
    const pct = Math.round((knownCount / sessionCards.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">{pct >= 70 ? '🎉' : '💪'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h2>
          <p className="text-gray-500 mb-6">You reviewed {sessionCards.length} cards</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-600">{knownCount}</div>
              <div className="text-sm text-green-700">I Know This</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-600">{dontKnowCount}</div>
              <div className="text-sm text-red-700">Need Review</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setMode('study'); setCurrentIdx(0); }} className="py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
              Study Again
            </button>
            {dontKnowCount > 0 && (
              <button
                onClick={() => {
                  const review = sessionCards.filter(c => dontKnow.has(c.id));
                  setSessionCards(review);
                  setCurrentIdx(0);
                  setKnown(new Set());
                  setDontKnow(new Set());
                  setMode('study');
                }}
                className="py-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-bold hover:bg-orange-100"
              >
                Review {dontKnowCount} Missed Cards
              </button>
            )}
            <button onClick={() => setMode('setup')} className="py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200">
              New Session
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Setup screen ──
  if (mode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-lg mx-auto">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Day 2
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🃏</div>
              <h1 className="text-2xl font-bold text-gray-800">Flashcard Study</h1>
              <p className="text-gray-500 mt-1">Day 2 — Self Introduction</p>
              <p className="text-sm text-blue-600 mt-2">{allCards.length} cards available</p>
            </div>

            <div className="space-y-5 mb-8">
              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>

              {/* Card count */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Cards per session</label>
                <div className="grid grid-cols-5 gap-2">
                  {[10, 20, 30, 50, 100].map(n => (
                    <button key={n} onClick={() => setConfig(c => ({ ...c, count: n }))}
                      className={`py-2 rounded-xl text-sm font-medium transition-colors ${sessionConfig.count === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shuffle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Shuffle cards</span>
                <button onClick={() => setConfig(c => ({ ...c, shuffle: !c.shuffle }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${sessionConfig.shuffle ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${sessionConfig.shuffle ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <button onClick={startSession} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 to-purple-700 shadow-xl flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Start Flashcards
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Study mode ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setMode('setup')} className="p-2 text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-800">{currentIdx + 1} / {sessionCards.length}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="text-green-600 font-medium">✓ {known.size}</span>
            <span className="text-red-500 font-medium">✗ {dontKnow.size}</span>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" animate={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card area */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id || currentIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <FlipCard
                card={currentCard}
                onKnow={handleKnow}
                onDontKnow={handleDontKnow}
                isStarred={starred.has(currentCard.id)}
                onToggleStar={() => toggleStar(currentCard.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => { if (currentIdx > 0) setCurrentIdx(i => i - 1); }}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="text-xs text-gray-400">{Math.round(((currentIdx) / sessionCards.length) * 100)}% complete</div>
          <button
            onClick={() => { if (currentIdx < sessionCards.length - 1) setCurrentIdx(i => i + 1); else setMode('complete'); }}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm"
          >
            Skip
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
