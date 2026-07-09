'use client';
// ============================================================
// INDIVIDUAL GRAMMAR TOPIC PAGE
// Fetches massive data, renders interactive practice engine
// with sound effects, scoring, and answer checking
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Star, CheckCircle, XCircle,
  ChevronRight, ChevronLeft, Volume2, Eye, EyeOff,
  Target, Trophy, Flame, Zap, Brain, Award,
  BarChart2, Sparkles, RefreshCw, Play, Lock,
  MessageSquare, PenTool, Mic, Send, RotateCcw,
  ArrowRight, Filter, Search, Hash, Clock,
  ThumbsUp, ThumbsDown, AlertCircle, HelpCircle,
} from 'lucide-react';

// ── Custom Sound Hook (Web Audio API) ────────────────────────
function useSound() {
  const audioCtxRef = useRef(null);
  
  const getCtx = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const play = useCallback((type) => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) { /* silently fail */ }
  }, [getCtx]);

  return play;
}

// ── Tab sections ─────────────────────────────────────────────
const SECTIONS = [
  { id: 'learn', icon: BookOpen, label: 'Learn', color: 'text-indigo-400' },
  { id: 'vocabulary', icon: Globe, label: 'Vocabulary', color: 'text-emerald-400' },
  { id: 'practice', icon: Target, label: 'Practice (1000 Q)', color: 'text-amber-400' },
  { id: 'test', icon: Trophy, label: 'Test (400 Q)', color: 'text-rose-400' },
];

// Placeholder for Globe icon (lucide doesn't have Globe in some versions)
function Globe(props) {
  return <BookOpen {...props} />;
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GrammarTopicPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug || '';
  const playSound = useSound();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });

  // Fetch massive topic data from API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/topics/grammar/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load topic data:', err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  // Score updater
  const handleAnswer = useCallback((isCorrect) => {
    if (isCorrect) {
      playSound('correct');
      setScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      playSound('wrong');
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1, total: prev.total + 1 }));
    }
  }, [playSound]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-slate-800 rounded-xl" />
          <div className="h-48 bg-slate-800 rounded-3xl" />
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-12 bg-slate-800 rounded-xl" />)}
          </div>
          <div className="h-96 bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  const title = data?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const emoji = data?.emoji || '📚';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-32">
      {/* ── Back button ──────────────────────────────────── */}
      <Link
        href="/topics/grammar"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Back to Grammar Topics
      </Link>

      {/* ── Hero Card ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-6 md:p-10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center text-4xl shrink-0">
            {emoji}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-slate-400 text-lg">
              🇮🇳 इस विषय में {data?.totalPracticeQuestions || 1000} प्रैक्टिस + {data?.totalTestQuestions || 400} टेस्ट क्वेश्चन तैयार हैं
            </p>
          </div>

          {/* Live Score */}
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-emerald-400">{score.correct}</div>
              <div className="text-xs text-emerald-400/70">Correct ✅</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-rose-400">{score.wrong}</div>
              <div className="text-xs text-rose-400/70">Wrong ❌</div>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-indigo-400">
                {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
              </div>
              <div className="text-xs text-indigo-400/70">Accuracy</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Section Tabs ─────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map(({ id, icon: Icon, label, color }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); playSound('click'); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === id
                ? 'bg-indigo-500/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Icon size={16} className={activeTab === id ? color : ''} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Content Panels ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'learn' && <LearnPanel data={data} />}
          {activeTab === 'vocabulary' && <VocabularyPanel vocabulary={data?.vocabulary || []} />}
          {activeTab === 'practice' && <PracticePanel questions={data?.practice || []} onAnswer={handleAnswer} />}
          {activeTab === 'test' && <TestPanel questions={data?.test || []} onAnswer={handleAnswer} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// LEARN PANEL - Concept explanation
// ============================================================
function LearnPanel({ data }) {
  const content = data?.content || {};
  
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="prose prose-invert prose-lg max-w-none">
          {/* Render explanation as formatted text */}
          {(content.explanation || '').split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black text-white mb-4">{line.replace('# ', '')}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-indigo-400 mt-8 mb-3">{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
            if (line.startsWith('- ')) return <li key={i} className="text-slate-300 ml-4">{line.replace('- ', '')}</li>;
            if (line.startsWith('| ')) return <p key={i} className="text-slate-400 font-mono text-sm">{line}</p>;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>;
          })}
        </div>
      </div>

      {/* Rules */}
      {content.rules && content.rules.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="text-amber-400" /> Important Rules
          </h2>
          <div className="space-y-3">
            {content.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="text-rose-400" /> Common Mistakes
          </h2>
          <div className="space-y-4">
            {content.commonMistakes.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={16} className="text-rose-400" />
                  <span className="text-rose-400 line-through text-sm">{m.wrong}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm">{m.correct}</span>
                </div>
                <p className="text-slate-400 text-xs mt-1">{m.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Trick */}
      {content.memoryTrick && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-indigo-400 mb-2 flex items-center gap-2">
            <Brain size={20} /> Memory Trick
          </h3>
          <p className="text-indigo-200">{content.memoryTrick}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// VOCABULARY PANEL - Paginated word list
// ============================================================
function VocabularyPanel({ vocabulary }) {
  const [page, setPage] = useState(1);
  const perPage = 20;
  const totalPages = Math.ceil(vocabulary.length / perPage);
  const currentWords = vocabulary.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-emerald-400" size={20} />
          Vocabulary ({vocabulary.length} words)
        </h2>
        <span className="text-sm text-slate-400">Page {page} / {totalPages}</span>
      </div>

      <div className="grid gap-3">
        {currentWords.map((w, i) => (
          <motion.div
            key={w.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-white font-bold text-lg">{w.word}</span>
                {w.ipa && <span className="text-slate-500 text-sm ml-2">{w.ipa}</span>}
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                w.difficulty === 'basic' ? 'bg-green-500/20 text-green-400' :
                w.difficulty === 'intermediate' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {w.difficulty}
              </span>
            </div>
            <p className="text-emerald-400 text-sm mb-1">🇮🇳 {w.hindi}</p>
            <p className="text-slate-400 text-sm italic">"{w.example}"</p>
            {w.synonyms?.length > 0 && (
              <p className="text-xs text-slate-500 mt-2">
                Synonyms: {w.synonyms.join(', ')}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-all text-sm"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-white text-sm font-medium">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-all text-sm"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PRACTICE PANEL - Interactive Hindi to English Translation
// ============================================================
function PracticePanel({ questions, onAnswer }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | correct | wrong | revealed
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  const q = questions[currentIdx] || {};
  const total = questions.length;

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  const checkAnswer = () => {
    if (!userInput.trim()) return;
    const isCorrect = normalize(userInput) === normalize(q.english || '');
    setStatus(isCorrect ? 'correct' : 'wrong');
    onAnswer(isCorrect);
  };

  const revealAnswer = () => {
    setStatus('revealed');
  };

  const nextQuestion = () => {
    setCurrentIdx(prev => Math.min(total - 1, prev + 1));
    setUserInput('');
    setStatus('idle');
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const prevQuestion = () => {
    setCurrentIdx(prev => Math.max(0, prev - 1));
    setUserInput('');
    setStatus('idle');
    setShowHint(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm text-slate-400 font-mono whitespace-nowrap">
          {currentIdx + 1} / {total}
        </span>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6"
        >
          {/* Difficulty badge */}
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-lg font-bold ${
              q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              q.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
              'bg-rose-500/20 text-rose-400'
            }`}>
              {q.difficulty?.toUpperCase()}
            </span>
            <span className="text-slate-600 text-xs">Q#{q.questionNumber || currentIdx + 1}</span>
          </div>

          {/* Hindi sentence */}
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5">
            <p className="text-xs text-indigo-400/70 mb-2">🇮🇳 Translate to English:</p>
            <p className="text-2xl text-white font-bold leading-relaxed">{q.hindi}</p>
          </div>

          {/* Hint */}
          {showHint && q.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3"
            >
              <p className="text-amber-400 text-sm flex items-center gap-2">
                <HelpCircle size={14} /> {q.hint}
              </p>
            </motion.div>
          )}

          {/* Input */}
          <div className="space-y-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && status === 'idle') checkAnswer(); }}
                placeholder="Type your English translation here..."
                disabled={status !== 'idle'}
                className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-lg ${
                  status === 'correct' ? 'border-emerald-500 ring-emerald-500/30 bg-emerald-500/5' :
                  status === 'wrong' ? 'border-rose-500 ring-rose-500/30 bg-rose-500/5' :
                  status === 'revealed' ? 'border-amber-500 ring-amber-500/30 bg-amber-500/5' :
                  'border-slate-700 focus:ring-indigo-500/50 focus:border-indigo-500/50'
                }`}
              />
            </div>

            {/* Result feedback */}
            {status === 'correct' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <CheckCircle className="text-emerald-400 shrink-0" size={24} />
                <div>
                  <p className="text-emerald-400 font-bold">Correct! 🎉 +10 Points</p>
                  <p className="text-emerald-400/70 text-sm">{q.english}</p>
                </div>
              </motion.div>
            )}
            {status === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20"
              >
                <XCircle className="text-rose-400 shrink-0" size={24} />
                <div>
                  <p className="text-rose-400 font-bold">Incorrect ❌</p>
                  <p className="text-rose-400/70 text-sm">Correct answer: <strong className="text-white">{q.english}</strong></p>
                </div>
              </motion.div>
            )}
            {status === 'revealed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20"
              >
                <Eye className="text-amber-400 shrink-0" size={24} />
                <div>
                  <p className="text-amber-400 font-bold">Answer Revealed</p>
                  <p className="text-white text-lg font-medium">{q.english}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {status === 'idle' ? (
              <>
                <button
                  onClick={checkAnswer}
                  disabled={!userInput.trim()}
                  className="flex-1 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Send size={18} /> Check Answer
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  <HelpCircle size={18} />
                </button>
                <button
                  onClick={revealAnswer}
                  className="px-4 py-3 rounded-2xl bg-slate-800 text-amber-400 hover:bg-slate-700 transition-all"
                >
                  <Eye size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex-1 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                Next Question <ArrowRight size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIdx === 0}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-all text-sm flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentIdx === total - 1}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-all text-sm flex items-center gap-2"
        >
          Skip <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// TEST PANEL - Assessment mode
// ============================================================
function TestPanel({ questions, onAnswer }) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-rose-500/10 border-4 border-rose-500/20 flex items-center justify-center mx-auto">
          <Trophy size={48} className="text-rose-400" />
        </div>
        <h2 className="text-3xl font-black text-white">Grammar Assessment</h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          {questions.length} questions to test your mastery. Score 80%+ to earn a badge.
          <br />
          🇮🇳 अपनी ग्रामर की समझ को परखें। 80% से ज़्यादा स्कोर करें और बैज अनलॉक करें!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-lg transition-all shadow-xl shadow-rose-500/20 flex items-center gap-3 mx-auto"
        >
          <Play size={22} /> Start Test
        </button>
      </div>
    );
  }

  // Reuse PracticePanel for the test flow
  return <PracticePanel questions={questions} onAnswer={onAnswer} />;
}
