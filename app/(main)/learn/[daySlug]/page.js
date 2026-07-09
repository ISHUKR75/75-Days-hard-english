'use client';
// Single-Day Learning Page — /learn/[daySlug]
// Shows: Grammar explanation, Practice questions, Vocabulary, Speaking tips, Test tabs
// Uses: getContentForDay, getQuestionsForDay, Header component, Framer Motion

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen, Zap, Volume2, Mic, Trophy, ChevronRight,
  CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw,
  Star, Lightbulb, AlertTriangle, Play, Lock, Target,
  ChevronLeft, Flame, Clock, Users
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { getTopicBySlug, DAYS_75_TOPICS } from '@/lib/topics';
import getContentForDay from '@/lib/grammarContent';
import getQuestionsForDay from '@/lib/practiceData';
import useProgressStore from '@/store/progressStore';
import useUserStore from '@/store/userStore';

// ── Tab definitions ───────────────────────────────────────────
const TABS = [
  { id: 'grammar',   label: 'Grammar',   emoji: '📚', icon: BookOpen },
  { id: 'practice',  label: 'Practice',  emoji: '✍️', icon: Zap },
  { id: 'vocab',     label: 'Vocabulary',emoji: '🔤', icon: Star },
  { id: 'speaking',  label: 'Speaking',  emoji: '🎙️', icon: Mic },
  { id: 'test',      label: 'Test',      emoji: '🏆', icon: Trophy },
];

// ── Markdown-lite renderer (bold/italic/newlines) ─────────────
function RenderContent({ text = '' }) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**'))
          return <strong key={i} className="text-white font-bold">{p.slice(2, -2)}</strong>;
        if (p.startsWith('*') && p.endsWith('*'))
          return <em key={i} className="text-primary-300">{p.slice(1, -1)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </span>
  );
}

// ── Grammar Tab ───────────────────────────────────────────────
function GrammarTab({ content, topic }) {
  const [openSection, setOpenSection] = useState(null);
  if (!content) return (
    <div className="text-center py-12 text-slate-400">
      <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
      <p>Grammar content coming soon for this topic.</p>
    </div>
  );

  const sections = [
    { id: 'explanation', label: 'Explanation', emoji: '📖', content: content.explanation },
    { id: 'rules',       label: 'Rules',       emoji: '📋', items: content.rules },
    { id: 'examples',    label: 'Examples',    emoji: '💬', items: content.examples },
    { id: 'mistakes',    label: 'Common Mistakes', emoji: '⚠️', items: content.mistakes },
    { id: 'memory',      label: 'Memory Trick',    emoji: '🧠', content: content.memoryTrick },
  ];

  return (
    <div className="space-y-4">
      {sections.map(sec => (
        <motion.div
          key={sec.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-800/60 border border-white/8 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{sec.emoji}</span>
              <span className="font-bold text-white">{sec.label}</span>
            </div>
            <motion.div animate={{ rotate: openSection === sec.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={16} className="text-slate-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openSection === sec.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-white/5">
                  {sec.id === 'explanation' && (
                    <div className="mt-4 text-slate-300 leading-relaxed text-sm whitespace-pre-line">
                      <RenderContent text={sec.content} />
                    </div>
                  )}
                  {sec.id === 'rules' && Array.isArray(sec.items) && (
                    <ul className="mt-4 space-y-2">
                      {sec.items.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                          <span className="text-slate-300 text-sm">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.id === 'examples' && Array.isArray(sec.items) && (
                    <div className="mt-4 space-y-3">
                      {sec.items.map((ex, i) => (
                        <div key={i} className="bg-white/4 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase text-primary-400 border border-primary-500/30 bg-primary-500/10 px-1.5 py-0.5 rounded">{ex.type}</span>
                          </div>
                          <p className="text-slate-400 text-sm">🇮🇳 {ex.hindi}</p>
                          <p className="text-white font-semibold text-sm mt-1">🇬🇧 {ex.english}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.id === 'mistakes' && Array.isArray(sec.items) && (
                    <div className="mt-4 space-y-3">
                      {sec.items.map((m, i) => (
                        <div key={i} className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle size={14} className="text-red-400" />
                            <span className="text-red-300 text-sm line-through">{m.wrong}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            <span className="text-emerald-300 text-sm font-semibold">{m.correct}</span>
                          </div>
                          <p className="text-slate-400 text-xs">{m.why}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.id === 'memory' && (
                    <div className="mt-4 bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                      <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-amber-200 text-sm font-medium">
                        <RenderContent text={sec.content} />
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ── Practice Tab ──────────────────────────────────────────────
function PracticeTab({ questions = [], dayNum }) {
  const [current,  setCurrent]  = useState(0);
  const [answer,   setAnswer]   = useState('');
  const [result,   setResult]   = useState(null); // null | 'correct' | 'wrong'
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);
  const subset = questions.slice(0, 20);

  const check = useCallback(() => {
    if (!answer.trim()) return;
    const q = subset[current];
    const ans = answer.trim().toLowerCase().replace(/[.!?]/g, '');
    const correct = q.english.toLowerCase().replace(/[.!?]/g, '');
    const alts = (q.alternatives || []).map(a => a.toLowerCase().replace(/[.!?]/g, ''));
    const isCorrect = ans === correct || alts.includes(ans);
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
  }, [answer, current, subset]);

  const next = () => {
    if (current + 1 >= subset.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setAnswer('');
    setResult(null);
  };

  const reset = () => { setCurrent(0); setAnswer(''); setResult(null); setScore(0); setDone(false); };

  if (subset.length === 0) return (
    <div className="text-center py-12 text-slate-400">
      <Zap size={40} className="mx-auto mb-3 opacity-30" />
      <p>Practice questions coming soon.</p>
    </div>
  );

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <span className="text-6xl block mb-4">{score >= subset.length * 0.8 ? '🎉' : score >= subset.length * 0.5 ? '👍' : '📚'}</span>
      <h3 className="text-2xl font-black text-white mb-2">Session Complete!</h3>
      <p className="text-slate-400 mb-2">You scored <span className="text-primary-300 font-bold">{score}/{subset.length}</span></p>
      <p className="text-slate-500 text-sm mb-6">{score >= subset.length * 0.8 ? 'Excellent! Move to the next day.' : 'Keep practising to improve!'}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={reset} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={15} /> Try Again
        </button>
        <Link href={`/practice/day-${dayNum}`} className="btn-gradient flex items-center gap-2">
          <Zap size={15} /> More Questions
        </Link>
      </div>
    </motion.div>
  );

  const q = subset[current];
  const pct = Math.round((current / subset.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Question {current + 1} of {subset.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-surface-800/60 border border-white/8 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase bg-primary-500/15 text-primary-300 border border-primary-500/25 px-2 py-0.5 rounded">
              {q.type || 'translation'}
            </span>
            {q.hint && (
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Lightbulb size={10} /> {q.hint}
              </span>
            )}
          </div>
          <p className="text-2xl text-white font-bold mb-1">🇮🇳 {q.hindi}</p>
          <p className="text-slate-400 text-sm mb-5">Translate to English</p>

          <input
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !result) check(); else if (e.key === 'Enter' && result) next(); }}
            placeholder="Type your answer..."
            disabled={!!result}
            autoFocus
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 text-base transition-all ${
              result === 'correct' ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-500/5' :
              result === 'wrong'   ? 'border-red-500/60 focus:ring-red-500/40 bg-red-500/5' :
              'border-white/10 focus:ring-primary-500/40'
            }`}
          />

          {/* Feedback */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${result === 'correct' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
              >
                {result === 'correct'
                  ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  : <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                }
                <div>
                  <p className={`font-bold text-sm ${result === 'correct' ? 'text-emerald-300' : 'text-red-300'}`}>
                    {result === 'correct' ? '✅ Correct!' : '❌ Not quite'}
                  </p>
                  {result === 'wrong' && (
                    <p className="text-slate-300 text-sm mt-1">
                      Answer: <span className="text-white font-semibold">{q.english}</span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex gap-3">
        {!result
          ? <button onClick={check} disabled={!answer.trim()} className="btn-gradient flex-1 py-3 disabled:opacity-40">Check Answer</button>
          : <button onClick={next} className="btn-gradient flex-1 py-3 flex items-center justify-center gap-2">
              {current + 1 >= subset.length ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
        }
      </div>
    </div>
  );
}

// ── Vocabulary Tab ────────────────────────────────────────────
function VocabTab({ vocab = [] }) {
  const [revealed, setRevealed] = useState({});
  if (!vocab || vocab.length === 0) return (
    <div className="text-center py-12 text-slate-400">
      <Star size={40} className="mx-auto mb-3 opacity-30" />
      <p>Vocabulary coming soon for this topic.</p>
    </div>
  );
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400 mb-4">{vocab.length} words — click a card to reveal the example</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {vocab.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
            className="bg-surface-800/60 border border-white/8 rounded-xl p-4 cursor-pointer hover:border-white/15 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-white font-bold">{v.word}</p>
                <p className="text-primary-300 text-sm">{v.hindi}</p>
              </div>
              <span className="text-lg">{revealed[i] ? '👁️' : '👁️‍🗨️'}</span>
            </div>
            <AnimatePresence>
              {revealed[i] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-400 text-xs mt-2 pt-2 border-t border-white/5 italic">
                    "{v.example}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Speaking Tab ──────────────────────────────────────────────
function SpeakingTab({ tips = [], examples = [], topic }) {
  const speakingTips = tips.length ? tips : [
    'Practice saying the sentences out loud 5 times each.',
    'Record yourself and compare with the examples.',
    'Try using these patterns in real conversations.',
    'Focus on natural rhythm, not just grammar.',
  ];
  const practiceExamples = examples.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Tips */}
      <div className="bg-surface-800/60 border border-white/8 rounded-2xl p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Mic size={18} className="text-primary-400" /> Speaking Tips
        </h3>
        <ul className="space-y-3">
          {speakingTips.map((tip, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
              <span className="text-slate-300 text-sm">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Practice sentences */}
      {practiceExamples.length > 0 && (
        <div className="bg-surface-800/60 border border-white/8 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Volume2 size={18} className="text-emerald-400" /> Speak These Sentences
          </h3>
          <div className="space-y-3">
            {practiceExamples.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white/4 rounded-xl p-4"
              >
                <button className="w-9 h-9 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shrink-0 hover:bg-primary-500/30 transition-colors">
                  <Play size={13} className="text-primary-400 ml-0.5" fill="currentColor" />
                </button>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">🇮🇳 {ex.hindi}</p>
                  <p className="text-white font-semibold text-sm">🇬🇧 {ex.english}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="bg-primary-500/5 border border-primary-500/15 rounded-2xl p-5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Users size={18} className="text-primary-400" /> More Speaking Practice
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/speaking" className="btn-secondary text-sm flex items-center gap-2">
            <Mic size={14} /> Speaking Lab
          </Link>
          <Link href="/scenarios" className="btn-secondary text-sm flex items-center gap-2">
            <Play size={14} /> Real Scenarios
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Test Tab ──────────────────────────────────────────────────
function TestTab({ questions = [], dayNum }) {
  const [started,  setStarted]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState([]);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const testQs = questions.filter(q => q.type === 'mcq').slice(0, 10);
  const fallback = questions.slice(0, 10).map(q => ({
    ...q,
    options: [
      q.english,
      q.alternatives?.[0] || 'Option A',
      'Wrong answer example',
      'Another option',
    ].sort(() => Math.random() - 0.5),
    correct: q.english,
  }));
  const activeQs = testQs.length > 0 ? testQs : fallback;

  const score = answers.filter(a => a.correct).length;
  const grade = finished ? (score / activeQs.length >= 0.8 ? 'A' : score / activeQs.length >= 0.6 ? 'B' : 'C') : null;

  const handleSelect = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const isCorrect = opt === activeQs[current].correct || opt === activeQs[current].english;
    setAnswers(a => [...a, { q: current, selected: opt, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (current + 1 >= activeQs.length) { setFinished(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  };

  if (!started) return (
    <div className="text-center py-12">
      <span className="text-5xl block mb-4">🏆</span>
      <h3 className="text-2xl font-black text-white mb-2">Day {dayNum} Test</h3>
      <p className="text-slate-400 mb-2">{activeQs.length} questions • ~5 minutes</p>
      <p className="text-slate-500 text-sm mb-8">Test your knowledge of today's lesson</p>
      <button onClick={() => setStarted(true)} className="btn-gradient px-8 py-3 flex items-center gap-2 mx-auto">
        <Trophy size={16} /> Start Test
      </button>
    </div>
  );

  if (finished) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <span className="text-6xl block mb-4">{grade === 'A' ? '🏆' : grade === 'B' ? '🥈' : '📚'}</span>
      <h3 className="text-3xl font-black text-white mb-2">Grade {grade}</h3>
      <p className="text-slate-400 mb-1">Score: <span className="text-white font-bold">{score}/{activeQs.length}</span></p>
      <p className="text-slate-500 text-sm mb-8">{Math.round((score/activeQs.length)*100)}% accuracy</p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={() => { setStarted(false); setCurrent(0); setAnswers([]); setSelected(null); setFinished(false); }} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={15} /> Retry
        </button>
        <Link href={`/test/day-${dayNum}`} className="btn-gradient flex items-center gap-2">
          <Trophy size={15} /> Full Test (100 Questions)
        </Link>
      </div>
    </motion.div>
  );

  const q = activeQs[current];
  const opts = q.options || [q.english, q.alternatives?.[0] || 'Option B', 'Option C', 'Option D'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Question {current + 1} / {activeQs.length}</span>
        <span>{score} correct</span>
      </div>
      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          animate={{ width: `${(current / activeQs.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-surface-800/60 border border-white/8 rounded-2xl p-5 mb-4">
            <p className="text-slate-400 text-sm mb-1">Translate:</p>
            <p className="text-xl text-white font-bold">🇮🇳 {q.hindi}</p>
          </div>
          <div className="space-y-2">
            {opts.slice(0, 4).map((opt, i) => {
              const isSelected = selected === opt;
              const correctOpt = q.correct || q.english;
              const isCorrect  = opt === correctOpt;
              let cls = 'bg-white/4 border-white/10 text-slate-300';
              if (selected !== null) {
                if (isSelected && isCorrect)  cls = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
                else if (isSelected && !isCorrect) cls = 'bg-red-500/15 border-red-500/40 text-red-300';
                else if (isCorrect)            cls = 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  disabled={selected !== null}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${cls} ${selected === null ? 'hover:bg-white/8 hover:border-white/20 cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="text-slate-500 font-bold mr-2">{String.fromCharCode(65+i)}.</span> {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <button onClick={handleNext} className="btn-gradient w-full py-3">
                {current + 1 >= activeQs.length ? 'See Results' : 'Next Question'} →
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function DayLearningPage() {
  const params = useParams();
  const daySlug = params?.daySlug;
  const [activeTab, setActiveTab] = useState('grammar');

  const topic    = getTopicBySlug(daySlug) || DAYS_75_TOPICS.find(t => t.slug === daySlug);
  const content  = topic ? getContentForDay(topic.day, topic.title) : null;
  const questions = topic ? getQuestionsForDay(topic.day) : [];

  const { totalLessonsCompleted } = useUserStore?.() || { totalLessonsCompleted: 0 };
  const { topics: topicProgress } = useProgressStore?.() || { topics: {} };
  const currentDay = (totalLessonsCompleted || 0) + 1;

  if (!topic) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center text-center px-4">
        <div>
          <span className="text-5xl block mb-4">🔍</span>
          <h1 className="text-2xl font-black text-white mb-2">Topic Not Found</h1>
          <p className="text-slate-400 mb-6">Day slug "{daySlug}" doesn't exist in the curriculum.</p>
          <Link href="/curriculum" className="btn-primary flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  const isLocked = topic.day > currentDay + 2;
  const prevTopic = DAYS_75_TOPICS.find(t => t.day === topic.day - 1);
  const nextTopic = DAYS_75_TOPICS.find(t => t.day === topic.day + 1);
  const progress  = topicProgress?.[`day-${topic.day}`];
  const xpEarned  = progress?.xp || 0;

  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* ── Header component ────────────────────────────────── */}
        <Header
          title={`Day ${topic.day} — ${topic.title}`}
          subtitle={`${topic.cefr} • ${topic.difficulty} • ${topic.type}`}
          emoji={topic.emoji}
          breadcrumbs={[
            { label: 'Curriculum', href: '/curriculum' },
            { label: `Day ${topic.day}` },
          ]}
          actions={[
            { label: 'Practice', href: `/practice/day-${topic.day}`, variant: 'gradient', icon: Zap },
            { label: 'Test', href: `/test/day-${topic.day}`, variant: 'secondary', icon: Trophy },
          ]}
          showProgress={xpEarned > 0}
          progress={xpEarned}
          stats={[
            { key: 'questions', label: 'Questions', value: questions.length, suffix: '+', color: 'text-primary-400', bgColor: 'bg-primary-500/8', borderColor: 'border-primary-500/20' },
            { key: 'time',      label: 'Est. time',  value: '30',            suffix: 'min', color: 'text-amber-400',   bgColor: 'bg-amber-500/8',   borderColor: 'border-amber-500/20' },
            { key: 'completed', label: 'CEFR Level', value: topic.cefr,      color: 'text-emerald-400', bgColor: 'bg-emerald-500/8', borderColor: 'border-emerald-500/20' },
          ]}
        />

        {/* ── Locked banner ───────────────────────────────────── */}
        {isLocked && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 flex items-center gap-3"
          >
            <Lock size={18} className="text-amber-400 shrink-0" />
            <div>
              <p className="text-amber-300 font-semibold text-sm">This day is locked</p>
              <p className="text-amber-400/70 text-xs">Complete earlier days to unlock Day {topic.day}.</p>
            </div>
            <Link href={`/learn/${DAYS_75_TOPICS.find(t => t.day === currentDay)?.slug}`} className="ml-auto btn-secondary text-xs px-3 py-1.5">
              Go to Day {currentDay}
            </Link>
          </motion.div>
        )}

        {/* ── Tab bar ─────────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                    : 'bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:bg-white/6'
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* ── Tab content ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'grammar'  && <GrammarTab   content={content}    topic={topic} />}
            {activeTab === 'practice' && <PracticeTab  questions={questions} dayNum={topic.day} />}
            {activeTab === 'vocab'    && <VocabTab     vocab={content?.vocabulary} />}
            {activeTab === 'speaking' && <SpeakingTab  tips={content?.speakingTips} examples={content?.examples || []} topic={topic} />}
            {activeTab === 'test'     && <TestTab      questions={questions} dayNum={topic.day} />}
          </motion.div>
        </AnimatePresence>

        {/* ── Day navigation ──────────────────────────────────── */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
          {prevTopic ? (
            <Link href={`/learn/${prevTopic.slug}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-slate-600">Previous</p>
                <p className="font-semibold">{prevTopic.emoji} Day {prevTopic.day}</p>
              </div>
            </Link>
          ) : <div />}

          <Link href="/curriculum" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            All 75 Days
          </Link>

          {nextTopic ? (
            <Link href={`/learn/${nextTopic.slug}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group text-right">
              <div>
                <p className="text-xs text-slate-600">Next</p>
                <p className="font-semibold">{nextTopic.emoji} Day {nextTopic.day}</p>
              </div>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  );
}
