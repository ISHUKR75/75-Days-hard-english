// ============================================================
// TestSection.js — Mock Test / Quiz Section
// Gen Z styled MCQ test with sessions, timer, results
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Trophy, Clock, Zap, ChevronRight, ChevronLeft, RotateCcw,
  Share2, CheckCircle, XCircle, AlertCircle, Target, Star,
  BarChart2, Award, ArrowLeft, Play, BookOpen, Flame
} from 'lucide-react';

// ── Session config ──────────────────────────────────────────
const SESSIONS = [
  { pct: 20, label: '20%', desc: 'Quick warmup', time: 6,  color: 'from-emerald-500 to-teal-500' },
  { pct: 40, label: '40%', desc: 'Half session',  time: 12, color: 'from-cyan-500 to-blue-500' },
  { pct: 60, label: '60%', desc: 'Deep dive',     time: 18, color: 'from-blue-500 to-indigo-500' },
  { pct: 80, label: '80%', desc: 'Almost full',   time: 24, color: 'from-violet-500 to-purple-500' },
  { pct: 100, label: '100%', desc: 'Full beast mode 🔥', time: 30, color: 'from-fuchsia-500 to-pink-500' },
];

const GRADE = (pct) => {
  if (pct >= 90) return { grade: 'A+', color: 'text-emerald-400', bg: 'bg-emerald-400/20', msg: 'Absolute legend! 🏆' };
  if (pct >= 80) return { grade: 'A',  color: 'text-cyan-400',    bg: 'bg-cyan-400/20',    msg: 'Slaying it! 🔥' };
  if (pct >= 70) return { grade: 'B',  color: 'text-blue-400',    bg: 'bg-blue-400/20',    msg: 'Pretty solid! 💪' };
  if (pct >= 60) return { grade: 'C',  color: 'text-yellow-400',  bg: 'bg-yellow-400/20',  msg: 'Getting there! 📈' };
  return              { grade: 'D',  color: 'text-red-400',    bg: 'bg-red-400/20',    msg: 'Practice more! 💡' };
};

// ── Animated ring component ─────────────────────────────────
function ScoreRing({ pct }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const { color } = GRADE(pct);
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none"
          stroke={pct >= 80 ? '#34d399' : pct >= 60 ? '#60a5fa' : '#f87171'}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black ${color}`}>{pct}%</span>
        <span className="text-xs text-gray-400">score</span>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function TestSection({ data, dayNum }) {
  const questions = data?.mockTest ?? [];
  const totalQ = questions.length || 400;

  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  // screen: 'start' | 'test' | 'results'
  const [screen, setScreen] = useState('start');
  const [session, setSession] = useState(null);         // selected SESSIONS item
  const [sessionQs, setSessionQs] = useState([]);       // slice of questions
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);       // index of chosen option
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);           // {idx, correct, marks}
  const [timeLeft, setTimeLeft] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(`test_best_day${dayNum}`) || 'null');
    }
    return null;
  });
  const [skipped, setSkipped] = useState(new Set());
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // ── Start session ────────────────────────────────────────
  const startSession = useCallback((s) => {
    const count = Math.max(1, Math.round((s.pct / 100) * totalQ));
    const slice = questions.length
      ? questions.slice(0, count)
      : Array.from({ length: count }, (_, i) => ({
          id: i,
          question: `Sample question ${i + 1}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 'A',
          explanation: 'This is the explanation.',
          difficulty: ['easy', 'medium', 'hard'][i % 3],
          marks: 1,
        }));
    setSession(s);
    setSessionQs(slice);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setXpEarned(0);
    setSkipped(new Set());
    setTimeLeft(s.time * 60);
    startTimeRef.current = Date.now();
    setScreen('test');
  }, [questions, totalQ]);

  // ── Timer ────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== 'test') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          finishTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, session]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ── Answer logic ─────────────────────────────────────────
  const handleAnswer = useCallback((optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);

    const q = sessionQs[current];
    const letters = ['A', 'B', 'C', 'D'];
    const isCorrect = letters[optionIndex] === q.correct;
    const marks = isCorrect ? (q.marks || 1) : 0;
    const xp = isCorrect ? (q.marks || 1) * 10 : 0;

    if (xp > 0) {
      addXP(xp);
      setXpEarned(prev => prev + xp);
    }
    recordQuestionResult?.(q.id, isCorrect);
    setAnswers(prev => [...prev, { qIndex: current, correct: isCorrect, marks, selected: optionIndex }]);

    setTimeout(() => advanceQuestion(), 1500);
  }, [answered, current, sessionQs, addXP, recordQuestionResult]);

  const advanceQuestion = () => {
    if (current + 1 >= sessionQs.length) {
      finishTest();
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const skipQuestion = () => {
    setSkipped(prev => new Set([...prev, current]));
    advanceQuestion();
  };

  const goBack = () => {
    if (current === 0) return;
    setCurrent(c => c - 1);
    setSelected(null);
    setAnswered(false);
  };

  // ── Finish test ──────────────────────────────────────────
  const finishTest = useCallback(() => {
    clearInterval(timerRef.current);
    const elapsed = Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000);
    setTimeTaken(elapsed);

    const score = answers.reduce((s, a) => s + a.marks, 0);
    const total = sessionQs.reduce((s, q) => s + (q.marks || 1), 0);
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    // Save best
    const prev = JSON.parse(localStorage.getItem(`test_best_day${dayNum}`) || 'null');
    if (!prev || pct > prev.pct) {
      const best = { pct, score, total, date: new Date().toISOString() };
      localStorage.setItem(`test_best_day${dayNum}`, JSON.stringify(best));
      setBestScore(best);
    }
    setScreen('results');
  }, [answers, sessionQs, dayNum]);

  // ── Keyboard shortcuts ───────────────────────────────────
  useEffect(() => {
    if (screen !== 'test') return;
    const handler = (e) => {
      if (['a','b','c','d'].includes(e.key.toLowerCase())) {
        const idx = ['a','b','c','d'].indexOf(e.key.toLowerCase());
        handleAnswer(idx);
      }
      if (e.key === 'ArrowRight') skipQuestion();
      if (e.key === 'ArrowLeft') goBack();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [screen, handleAnswer]);

  // ── Derived stats ────────────────────────────────────────
  const scoreNow = answers.reduce((s, a) => s + a.marks, 0);
  const totalMarks = sessionQs.reduce((s, q) => s + (q.marks || 1), 0);
  const accuracy = answers.length ? Math.round((answers.filter(a => a.correct).length / answers.length) * 100) : 0;

  // ── Option style helper ───────────────────────────────────
  const optionStyle = (i, q) => {
    const letters = ['A', 'B', 'C', 'D'];
    if (!answered) return 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-violet-400/50 cursor-pointer';
    const isCorrect = letters[i] === q.correct;
    const isSelected = i === selected;
    if (isCorrect) return 'bg-emerald-500/20 border-emerald-400 cursor-default';
    if (isSelected && !isCorrect) return 'bg-red-500/20 border-red-400 cursor-default';
    return 'bg-white/5 border-white/5 opacity-50 cursor-default';
  };

  // ──────────────────────────────────────────────────────────
  // RENDER: START SCREEN
  // ──────────────────────────────────────────────────────────
  if (screen === 'start') return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-4xl font-black text-white mb-2">Final Mock Test</h1>
        <p className="text-gray-400 text-lg">Prove what you've learned, no cap 😤</p>
        {bestScore && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">Best: {bestScore.pct}%</span>
          </motion.div>
        )}
      </motion.div>

      {/* Rules card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><BookOpen size={18} className="text-violet-400" /> Rules</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> Each question has 4 options — pick the best one</li>
          <li className="flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> Wrong answers show the correct one instantly</li>
          <li className="flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> Earn XP for every correct answer 🔥</li>
          <li className="flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> Timer runs — finish before it hits zero!</li>
          <li className="flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> Keyboard: A/B/C/D to answer, → to skip</li>
        </ul>
      </motion.div>

      {/* Total questions badge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-center mb-6">
        <span className="bg-violet-500/20 border border-violet-400/30 rounded-full px-6 py-2 text-violet-300 font-semibold">
          📝 {totalQ} Total Questions
        </span>
      </motion.div>

      {/* Session buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
        {SESSIONS.map((s, i) => (
          <motion.button key={s.pct}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => startSession(s)}
            className={`bg-gradient-to-br ${s.color} p-0.5 rounded-2xl group`}>
            <div className="bg-[#0a0a0f] rounded-2xl p-4 h-full group-hover:bg-white/5 transition-all">
              <div className="text-3xl font-black text-white mb-1">{s.label}</div>
              <div className="text-white/70 text-xs mb-3">{s.desc}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} /> {s.time} min
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((s.pct / 100) * totalQ)} questions
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // ──────────────────────────────────────────────────────────
  // RENDER: TEST SCREEN
  // ──────────────────────────────────────────────────────────
  if (screen === 'test') {
    const q = sessionQs[current];
    const diffColor = q?.difficulty === 'hard' ? 'text-red-400 bg-red-400/10' :
                      q?.difficulty === 'medium' ? 'text-orange-400 bg-orange-400/10' :
                      'text-emerald-400 bg-emerald-400/10';
    const letters = ['A', 'B', 'C', 'D'];
    const timerPct = session ? (timeLeft / (session.time * 60)) * 100 : 100;
    const timerColor = timerPct > 50 ? 'bg-emerald-500' : timerPct > 20 ? 'bg-orange-500' : 'bg-red-500';

    return (
      <div className="min-h-screen bg-[#0a0a0f] px-4 py-6">
        {/* Top bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">Q {current + 1} / {sessionQs.length}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${timerPct < 20 ? 'text-red-400 bg-red-400/10 animate-pulse' : 'text-white bg-white/10'}`}>
              <Clock size={13} /> {formatTime(timeLeft)}
            </div>
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${diffColor}`}>
              {q?.difficulty || 'medium'}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
              animate={{ width: `${((current + 1) / sessionQs.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
          {/* Timer bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
            <motion.div className={`h-full rounded-full ${timerColor}`}
              animate={{ width: `${timerPct}%` }}
              transition={{ duration: 1 }} />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-5">
            <div className="flex items-start gap-3 mb-6">
              <span className="text-violet-400 font-black text-lg">Q{current + 1}.</span>
              <p className="text-white text-lg font-semibold leading-relaxed">{q?.question || 'Loading question...'}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {(q?.options || ['A', 'B', 'C', 'D']).map((opt, i) => (
                <motion.button key={i}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswer(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${optionStyle(i, q)}`}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0
                    ${answered && letters[i] === q?.correct ? 'bg-emerald-500 text-white' :
                      answered && i === selected && letters[i] !== q?.correct ? 'bg-red-500 text-white' :
                      'bg-white/10 text-gray-300'}`}>
                    {letters[i]}
                  </span>
                  <span className="text-white text-sm flex-1">{opt}</span>
                  {answered && letters[i] === q?.correct && <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />}
                  {answered && i === selected && letters[i] !== q?.correct && <XCircle size={18} className="text-red-400 flex-shrink-0" />}
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {answered && q?.explanation && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                  className="mt-4 bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">{q.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Action bar */}
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={goBack} disabled={current === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm disabled:opacity-30 hover:bg-white/10 transition-all">
            <ChevronLeft size={16} /> Back
          </motion.button>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-emerald-400 font-bold">✅ {answers.filter(a => a.correct).length}</span>
            <span className="text-red-400 font-bold">❌ {answers.filter(a => !a.correct).length}</span>
            <span className="text-violet-400 font-bold">🎯 {accuracy}%</span>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={skipQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm hover:bg-white/10 transition-all">
            Skip <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* XP flash */}
        <AnimatePresence>
          {answered && answers[answers.length - 1]?.correct && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="fixed bottom-8 right-8 bg-emerald-500 text-white font-black px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30">
              +{(sessionQs[current]?.marks || 1) * 10} XP 🔥
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // RENDER: RESULTS SCREEN
  // ──────────────────────────────────────────────────────────
  const score = answers.reduce((s, a) => s + a.marks, 0);
  const total = sessionQs.reduce((s, q) => s + (q.marks || 1), 0);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const { grade, color: gradeColor, bg: gradeBg, msg } = GRADE(pct);

  // Per-difficulty breakdown
  const diffBreakdown = ['easy', 'medium', 'hard'].map(d => {
    const dqs = sessionQs.map((q, i) => ({ q, ans: answers[i] })).filter(x => x.q.difficulty === d);
    const correct = dqs.filter(x => x.ans?.correct).length;
    return { d, total: dqs.length, correct };
  });

  // Wrong questions
  const wrongQs = sessionQs.map((q, i) => ({ q, ans: answers[i] }))
    .filter(x => x.ans && !x.ans.correct);

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        {/* Score card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="text-5xl mb-4">🏆</motion.div>
          <h2 className="text-2xl font-black text-white mb-6">Test Complete!</h2>

          {/* Score ring */}
          <ScoreRing pct={pct} />

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mt-4 ${gradeBg}`}>
            <span className={`text-3xl font-black ${gradeColor}`}>{grade}</span>
            <span className={`text-sm ${gradeColor}`}>{msg}</span>
          </motion.div>

          <div className="text-4xl font-black text-white mt-4">{score} <span className="text-gray-400 text-2xl">/ {total}</span></div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <Clock size={16} />, label: 'Time', val: formatTime(timeTaken), color: 'text-blue-400' },
              { icon: <Zap size={16} />, label: 'XP Earned', val: `+${xpEarned}`, color: 'text-yellow-400' },
              { icon: <Target size={16} />, label: 'Accuracy', val: `${accuracy}%`, color: 'text-violet-400' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 rounded-xl p-3">
                <div className={`${item.color} flex justify-center mb-1`}>{item.icon}</div>
                <div className={`${item.color} font-bold text-lg`}>{item.val}</div>
                <div className="text-gray-500 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-violet-400" /> Difficulty Breakdown
          </h3>
          {diffBreakdown.filter(d => d.total > 0).map(({ d, total: dt, correct }) => (
            <div key={d} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300 capitalize font-medium">{d}</span>
                <span className="text-gray-400">{correct}/{dt}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${dt > 0 ? (correct / dt) * 100 : 0}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full rounded-full ${d === 'easy' ? 'bg-emerald-500' : d === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Wrong questions */}
        {wrongQs.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <XCircle size={18} className="text-red-400" /> Review Wrong Answers ({wrongQs.length})
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {wrongQs.slice(0, 10).map(({ q, ans }, i) => (
                <div key={i} className="bg-red-500/5 border border-red-400/10 rounded-xl p-4">
                  <p className="text-white text-sm font-medium mb-2">{q.question}</p>
                  <p className="text-red-400 text-xs mb-1">❌ You chose: {q.options?.[ans?.selected] || 'Skipped'}</p>
                  <p className="text-emerald-400 text-xs mb-2">✅ Correct: {q.options?.['ABCD'.indexOf(q.correct)] || q.correct}</p>
                  {q.explanation && <p className="text-gray-400 text-xs">{q.explanation}</p>}
                </div>
              ))}
              {wrongQs.length > 10 && <p className="text-gray-500 text-sm text-center">+{wrongQs.length - 10} more...</p>}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('start')}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 transition-all text-sm">
            <ArrowLeft size={20} /> Back
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => startSession(session)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-violet-600 to-purple-500 rounded-xl text-white font-bold text-sm shadow-lg shadow-violet-500/30">
            <RotateCcw size={20} /> Retry
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigator.share?.({ title: `Day ${dayNum} Test`, text: `I scored ${pct}% on the mock test! 🎯` })}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 transition-all text-sm">
            <Share2 size={20} /> Share
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
