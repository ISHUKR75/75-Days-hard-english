// ============================================================
// TheorySection.js — World-class Grammar Theory Experience
// Teacher-like, deeply engaging, Gen Z friendly tone.
// Tabs, formulas, examples, audio, interactive quizzes.
// Think Duolingo meets Linear meets Apple's clarity.
// ============================================================

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  BookOpen, ChevronDown, ChevronUp, CheckCircle2, Lightbulb,
  Volume2, Star, Zap, Target, AlertTriangle, Brain,
  Play, Pause, RotateCcw, Trophy, ArrowRight, Sparkles,
  MessageCircle, Eye, EyeOff, Clock, TrendingUp, Award,
  X, Check, HelpCircle
} from 'lucide-react';

// ── Speak text using Web Speech API ─────────────────────────
function speak(text, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US';
  utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

// ── Play sound effect ─────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.value = 523;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'understood') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (_) {}
}

// ── Animation variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const expandDown = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

// ── Gradient blob background ───────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-3xl -top-32 -right-40"
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl bottom-0 -left-24"
        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-3xl top-1/2 left-1/3"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
}

// ── Formula display card ───────────────────────────────────────
function FormulaCard({ formula, color = 'violet' }) {
  const colors = {
    violet: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-200',
    cyan:   'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-200',
    emerald:'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-200',
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-200',
    pink:   'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-200',
  };
  return (
    <div className={`bg-gradient-to-r ${colors[color]} border rounded-xl px-5 py-3 font-mono text-sm font-bold tracking-wide`}>
      {formula}
    </div>
  );
}

// ── Example sentence card ─────────────────────────────────────
function ExampleCard({ hindi, english, index }) {
  const [played, setPlayed] = useState(false);

  const handlePlay = () => {
    speak(english, 0.85);
    setPlayed(true);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Hindi */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              Hindi
            </span>
            <p className="text-gray-300 text-sm">{hindi}</p>
          </div>
          {/* English */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              English
            </span>
            <p className="text-white font-semibold text-sm">{english}</p>
          </div>
        </div>
        {/* TTS Button */}
        <button
          onClick={handlePlay}
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            played
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/10 text-gray-400 border border-white/10 hover:bg-violet-500/20 hover:text-violet-300 hover:border-violet-500/30'
          }`}
          title="Listen to pronunciation"
        >
          <Volume2 size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Mini Quiz Card ─────────────────────────────────────────────
function QuizCard({ question, options, answer, explanation }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (opt) => {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    const correct = opt === answer;
    playSound(correct ? 'correct' : 'understood');
  };

  const isCorrect = selected === answer;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
          <HelpCircle size={14} className="text-violet-400" />
        </div>
        <p className="text-white font-semibold text-sm leading-relaxed">{question}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === answer;
          let cls = 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 cursor-pointer';
          if (revealed) {
            if (isAnswer) cls = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200';
            else if (isSelected && !isCorrect) cls = 'bg-red-500/20 border-red-500/40 text-red-200';
            else cls = 'bg-white/5 border-white/10 text-gray-400 opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3 ${cls}`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {revealed && isAnswer && <CheckCircle2 size={15} className="ml-auto text-emerald-400" />}
              {revealed && isSelected && !isCorrect && <X size={15} className="ml-auto text-red-400" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl text-sm ${
              isCorrect
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
            }`}
          >
            <span className="font-semibold">{isCorrect ? '🎉 Correct! ' : '💡 Right answer: '}</span>
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section accordion item ─────────────────────────────────────
function TheoryAccordion({ section, index, isOpen, onToggle, onMarkUnderstood, understood }) {
  const accentColors = [
    { border: 'border-violet-500/40', dot: 'bg-violet-500', icon: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300' },
    { border: 'border-cyan-500/40',   dot: 'bg-cyan-500',   icon: 'text-cyan-400',   badge: 'bg-cyan-500/20 text-cyan-300' },
    { border: 'border-emerald-500/40',dot: 'bg-emerald-500',icon: 'text-emerald-400',badge: 'bg-emerald-500/20 text-emerald-300' },
    { border: 'border-orange-500/40', dot: 'bg-orange-500', icon: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
    { border: 'border-pink-500/40',   dot: 'bg-pink-500',   icon: 'text-pink-400',   badge: 'bg-pink-500/20 text-pink-300' },
    { border: 'border-amber-500/40',  dot: 'bg-amber-500',  icon: 'text-amber-400',  badge: 'bg-amber-500/20 text-amber-300' },
    { border: 'border-blue-500/40',   dot: 'bg-blue-500',   icon: 'text-blue-400',   badge: 'bg-blue-500/20 text-blue-300' },
    { border: 'border-teal-500/40',   dot: 'bg-teal-500',   icon: 'text-teal-400',   badge: 'bg-teal-500/20 text-teal-300' },
  ];
  const accent = accentColors[index % accentColors.length];

  // Format theory text (supports \n newlines, numbered lists, bold *text*)
  const formatText = (text = '') =>
    text.split('\n').map((line, i) => {
      if (!line.trim()) return null;
      const isNum = /^\d+[\.\)]/.test(line.trim());
      const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
      return (
        <p
          key={i}
          className={`text-gray-300 text-sm leading-relaxed ${isNum ? 'pl-4' : ''}`}
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    }).filter(Boolean);

  const examples = section.examples || [];
  const miniQuiz = section.quiz || null;

  return (
    <motion.div
      variants={fadeUp}
      className={`relative bg-white/5 backdrop-blur-xl border ${understood ? 'border-emerald-500/40 shadow-emerald-500/5 shadow-lg' : `border-white/10 hover:${accent.border}`} rounded-2xl overflow-hidden transition-all duration-300`}
    >
      {/* Understood glow */}
      {understood && (
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none rounded-2xl" />
      )}

      {/* Accordion header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left group"
      >
        {/* Number badge */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
          understood ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : `bg-white/5 text-white border border-white/10 group-hover:bg-white/10`
        }`}>
          {understood ? <CheckCircle2 size={18} /> : index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-bold text-sm ${understood ? 'text-emerald-300' : 'text-white'}`}>
              {section.title}
            </h3>
            {section.hindiTitle && (
              <span className="text-xs text-gray-400">— {section.hindiTitle}</span>
            )}
          </div>
          {section.subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
          )}
        </div>

        {/* Tags */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          {section.type && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${accent.badge}`}>
              {section.type}
            </span>
          )}
          {understood && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✓ Got it!
            </span>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={understood ? 'text-emerald-400' : 'text-gray-400'} />
        </motion.div>
      </button>

      {/* Accordion body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={expandDown}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 space-y-5 border-t border-white/10 pt-5">

              {/* Theory text */}
              {section.theory && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    <BookOpen size={12} />
                    Explanation
                  </div>
                  <div className="space-y-2">{formatText(section.theory)}</div>
                </div>
              )}

              {/* Formula */}
              {section.formula && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <Zap size={12} />
                    Formula
                  </div>
                  <FormulaCard formula={section.formula} color={['violet','cyan','emerald','orange','pink','amber','blue','teal'][index % 8]} />
                </div>
              )}

              {/* Positive Examples */}
              {section.positiveExamples && section.positiveExamples.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                    <CheckCircle2 size={12} />
                    Correct Examples ✅
                  </div>
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                    {section.positiveExamples.slice(0, 5).map((ex, i) => (
                      <ExampleCard key={i} hindi={ex.hindi} english={ex.english} index={i} />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Fallback: generic examples */}
              {!section.positiveExamples && examples.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">
                    <MessageCircle size={12} />
                    Examples
                  </div>
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                    {examples.slice(0, 6).map((ex, i) => (
                      <ExampleCard
                        key={i}
                        hindi={ex.hindi || ex.sentence || ''}
                        english={ex.english || ex.translation || ''}
                        index={i}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Negative Examples (common mistakes) */}
              {section.negativeExamples && section.negativeExamples.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
                    <AlertTriangle size={12} />
                    Common Mistakes ❌
                  </div>
                  <div className="space-y-2">
                    {section.negativeExamples.slice(0, 4).map((ex, i) => (
                      <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-red-300 line-through text-sm">{ex.wrong}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-emerald-300 text-sm font-medium">{ex.correct}</p>
                        </div>
                        {ex.reason && (
                          <p className="text-gray-400 text-xs mt-2 pl-5">{ex.reason}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {section.tips && section.tips.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    <Lightbulb size={12} />
                    Pro Tips 💡
                  </div>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-amber-400 font-bold flex-shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mini Quiz */}
              {miniQuiz && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">
                    <Brain size={12} />
                    Quick Check 🧠
                  </div>
                  <QuizCard
                    question={miniQuiz.question}
                    options={miniQuiz.options}
                    answer={miniQuiz.answer}
                    explanation={miniQuiz.explanation}
                  />
                </div>
              )}

              {/* Mark as understood */}
              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {understood ? '✓ You marked this section as understood!' : 'Mark this section as understood when ready'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onMarkUnderstood(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    understood
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                  }`}
                >
                  <CheckCircle2 size={15} />
                  {understood ? 'Got it! ✓' : 'Mark as Understood'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Golden Rule Card ───────────────────────────────────────────
function GoldenRuleCard({ rule, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20 rounded-xl p-4"
    >
      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm flex-shrink-0">
        {index + 1}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{rule.rule || rule}</p>
        {rule.example && (
          <p className="text-gray-400 text-xs mt-1 italic">e.g. "{rule.example}"</p>
        )}
      </div>
    </motion.div>
  );
}

// ── TAB NAV ────────────────────────────────────────────────────
const TABS = [
  { id: 'theory',  label: 'Grammar Rules',  icon: BookOpen,     shortLabel: 'Rules'    },
  { id: 'rules',   label: 'Golden Rules',   icon: Star,         shortLabel: 'Golden'   },
  { id: 'quiz',    label: 'Quick Quiz',     icon: Brain,        shortLabel: 'Quiz'     },
  { id: 'tips',    label: 'Study Tips',     icon: Lightbulb,    shortLabel: 'Tips'     },
];

// ── Hardcoded Day 1 extra content (teacher's perspective) ──────
const DAY1_TEACHER_TIPS = [
  { emoji: '🎯', tip: "English ka sabse bada secret? — Practice every single day. Even 15 minutes is enough to build fluency.", hindi: "Roz practice karo, chahe 15 minute hee sahi" },
  { emoji: '🧠', tip: "Don't just memorize rules. Understand WHY the rule exists — that's how fluency actually happens.", hindi: "Rule ko sirf yaad mat karo, samjho kyun hai" },
  { emoji: '💬', tip: "Read your sentences OUT LOUD. Your mouth needs practice just as much as your brain does.", hindi: "Sentences ko zor se bolkar padho" },
  { emoji: '✍️', tip: "Write 5 new sentences every day using today's topic. Writing cements grammar into your memory.", hindi: "Roz 5 nayi sentences likho aaj ke topic par" },
  { emoji: '🔄', tip: "Made a mistake? GREAT! Mistakes are your best teachers. Note them down and fix them.", hindi: "Galti ki? Wonderful! Galti se hee seekhte hain" },
  { emoji: '🎤', tip: "Talk to yourself in English. Yes, seriously! This builds confidence faster than any textbook.", hindi: "Apne aap se English mein baat karo — seriously!" },
  { emoji: '📱', tip: "Change your phone's language to English. Small hacks build big habits over 75 days.", hindi: "Phone ki language English kar do — chota step, bada farak" },
  { emoji: '🌙', tip: "Review today's content just before sleeping. Your brain consolidates memory during sleep.", hindi: "Sone se pehle aaj ka content ek baar review karo" },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function TheorySection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  // Grammar sections from JSON data
  const sections = data?.grammarTheory?.sections || [];
  const goldenRules = data?.grammarTheory?.goldenRules || [];
  const topicTitle = data?.grammarTheory?.title || `Day ${dayNum} — Grammar Theory`;
  const description = data?.grammarTheory?.description || 'Deep dive into grammar rules, formulas, and examples.';

  // Local state
  const [openId, setOpenId] = useState(sections[0]?.id || null); // First section open by default
  const [understood, setUnderstood] = useState({});
  const [activeTab, setActiveTab] = useState('theory');
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Counts
  const understoodCount = Object.values(understood).filter(Boolean).length;
  const progress = sections.length > 0 ? Math.round((understoodCount / sections.length) * 100) : 0;

  // Toggle accordion
  const toggle = useCallback((id) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);

  // Mark section as understood
  const markUnderstood = useCallback((id) => {
    setUnderstood(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const doneCount = Object.values(next).filter(Boolean).length;

      // Award XP for each newly understood section
      if (!prev[id]) {
        playSound('understood');
        addXP(5, `Understood grammar section!`);
        recordQuestionResult(`theory-day${dayNum}-${id}`, true);
      }

      // Celebrate 100%
      if (doneCount === sections.length && sections.length > 0 && !xpAwarded) {
        setXpAwarded(true);
        setShowCelebration(true);
        addXP(25, 'Completed all grammar sections!');
        setTimeout(() => setShowCelebration(false), 4000);
      }

      return next;
    });
  }, [sections.length, xpAwarded, addXP, recordQuestionResult, dayNum]);

  // Built-in quiz questions for Day 1 grammar
  const BUILT_IN_QUIZZES = [
    {
      question: "Which sentence has correct Subject-Verb-Object order?",
      options: ["Ball the kicked boy.", "Boy kicked ball the.", "The boy kicked the ball.", "Kicked the boy ball."],
      answer: "The boy kicked the ball.",
      explanation: "English sentences follow Subject + Verb + Object order. 'The boy' (S) + 'kicked' (V) + 'the ball' (O)."
    },
    {
      question: "Which is the correct use of a NOUN?",
      options: ["She runs quickly.", "The beautiful garden.", "Book is on table.", "The book is on the table."],
      answer: "The book is on the table.",
      explanation: "A complete sentence needs Subject + Verb. 'The book' is the noun (subject), 'is' is the verb."
    },
    {
      question: "In 'She sings beautifully', what is 'beautifully'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      answer: "Adverb",
      explanation: "'Beautifully' describes HOW she sings (modifies the verb 'sings'), so it's an adverb."
    },
    {
      question: "Which word is an ADJECTIVE in 'She has a beautiful voice'?",
      options: ["She", "has", "beautiful", "voice"],
      answer: "beautiful",
      explanation: "'Beautiful' describes the noun 'voice' — that makes it an adjective."
    },
    {
      question: "What type of sentence is 'Close the door'?",
      options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
      answer: "Imperative",
      explanation: "Imperative sentences give commands or requests. They usually start with a verb and the subject 'you' is implied."
    },
    {
      question: "Which sentence uses PRESENT SIMPLE correctly?",
      options: ["She go to school daily.", "She goes to school daily.", "She going to school daily.", "She is go to school daily."],
      answer: "She goes to school daily.",
      explanation: "For 3rd person singular (she/he/it) in Present Simple, add '-s' or '-es' to the verb."
    },
  ];

  // Study tips for Day 1
  const STUDY_TIPS_EXTRA = [
    {
      title: "The 'WHY' First Rule 🎯",
      desc: "Before memorizing any rule, ask yourself: WHY does this rule exist? Understanding the logic behind grammar makes it 10x easier to remember.",
      color: "violet"
    },
    {
      title: "Speak Every Example 🗣️",
      desc: "Don't just read examples — SAY THEM OUT LOUD. Your mouth needs training just as much as your brain. Speaking activates muscle memory.",
      color: "emerald"
    },
    {
      title: "The 5-Sentence Method ✍️",
      desc: "After each grammar topic, write exactly 5 sentences of your own. This forces active recall and cements the rule in your memory.",
      color: "cyan"
    },
    {
      title: "Error Journal 📔",
      desc: "Keep a dedicated notebook for your mistakes. Every time you make an error, write the wrong sentence and then the correct one below it. Review weekly.",
      color: "orange"
    },
    {
      title: "Spaced Repetition 🔄",
      desc: "Review Day 1 grammar on Day 2, Day 4, Day 8, Day 15 and Day 30. This spacing technique is scientifically proven to maximize retention.",
      color: "pink"
    },
    {
      title: "The Mirror Technique 🪞",
      desc: "Practice speaking English in front of a mirror. Watch your mouth movements. Confidence is built by watching yourself succeed.",
      color: "amber"
    },
  ];

  const tipColors = {
    violet: 'from-violet-500/10 to-purple-500/5 border-violet-500/20 text-violet-300',
    emerald: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-300',
    cyan: 'from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-300',
    orange: 'from-orange-500/10 to-amber-500/5 border-orange-500/20 text-orange-300',
    pink: 'from-pink-500/10 to-rose-500/5 border-pink-500/20 text-pink-300',
    amber: 'from-amber-500/10 to-yellow-500/5 border-amber-500/20 text-amber-300',
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Blobs />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO HEADER ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl shadow-lg">
                📖
              </div>
              <div>
                <h1 className="text-white font-black text-2xl leading-tight">Concept & Theory</h1>
                <p className="text-gray-400 text-sm mt-0.5">{description.slice(0, 80)}{description.length > 80 ? '...' : ''}</p>
              </div>
            </div>

            {/* Progress ring */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-white">{progress}%</div>
                <div className="text-xs text-gray-400">{understoodCount}/{sections.length} done</div>
              </div>
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <motion.circle
                  cx="28" cy="28" r="22" fill="none"
                  stroke={progress === 100 ? '#10b981' : '#7c3aed'}
                  strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - progress / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mark sections as understood to track progress</span>
              <span className="text-cyan-400 font-semibold">{understoodCount * 5} XP earned</span>
            </div>
          </div>
        </motion.div>

        {/* ── CELEBRATION ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="text-4xl">🏆</div>
              <div>
                <p className="text-emerald-300 font-black text-lg">Grammar Legend!</p>
                <p className="text-emerald-400/80 text-sm">You understood ALL grammar sections! +25 XP earned. You're crushing it! 🔥</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TAB NAV ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} className="hidden sm:block" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {/* GRAMMAR THEORY TAB */}
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {sections.length > 0 ? (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {/* Teacher intro card */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">👨‍🏫</div>
                      <div>
                        <p className="text-violet-300 font-semibold text-sm mb-1">Your Teacher Says...</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {data?.grammarTheory?.teacherNote ||
                            `Yaar, grammar rules sunne mein boring lagte hain — but trust me, these are your superpowers. 
                            Ek baar ye samajh gaye toh fluent English bolna bahut easy ho jaata hai. 
                            Har section ko carefully padho, examples ke saath practice karo, aur "Got it!" press karo jab samajh aa jaaye. Let's go! 💪`
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Accordion sections */}
                  {sections.map((section, i) => (
                    <TheoryAccordion
                      key={section.id || i}
                      section={section}
                      index={i}
                      isOpen={openId === (section.id || i)}
                      onToggle={() => toggle(section.id || i)}
                      onMarkUnderstood={markUnderstood}
                      understood={understood[section.id || i]}
                    />
                  ))}

                  {/* Completion CTA */}
                  {understoodCount === sections.length && sections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 rounded-2xl p-6 text-center"
                    >
                      <div className="text-5xl mb-3">🎉</div>
                      <h3 className="text-emerald-300 font-black text-xl mb-2">You're a Grammar Master!</h3>
                      <p className="text-gray-400 text-sm">All {sections.length} grammar sections understood. Now move to Common Mistakes to level up!</p>
                      <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Trophy size={16} />
                        +{sections.length * 5 + 25} XP Total Earned
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* No data — fallback rich content */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {/* Teacher intro */}
                  <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">👨‍🏫</div>
                      <div>
                        <p className="text-violet-300 font-semibold text-sm mb-1">Your Teacher Says...</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Day 1 mein hum English ki foundation rakhte hain. Yahan aap seekhoge ki English kaise kaam karti hai — 
                          sentences kaise bante hain, words ke types kya hote hain, aur fluent English bolne ka shortcut kya hai. 
                          Dhyaan se padho, har example ko samjho, aur practice karo! Let's begin! 🚀
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Static Day 1 grammar content */}
                  {[
                    {
                      id: 'parts-of-speech',
                      title: 'Parts of Speech — 8 Building Blocks',
                      hindiTitle: 'वाणी के भाग',
                      subtitle: 'Every English word belongs to one of these 8 types',
                      theory: `English mein har ek word ek "category" mein aata hai. In categories ko "Parts of Speech" kehte hain.\n\nAap English ke is sabse important rule ko yaad karo:\n\n1. NOUN (संज्ञा) — Name of person, place, thing: Dog, Delhi, Love\n2. PRONOUN (सर्वनाम) — Replaces noun: I, She, They, We\n3. VERB (क्रिया) — Action or state: Run, Is, Eat, Think\n4. ADJECTIVE (विशेषण) — Describes noun: Big, Beautiful, Fast\n5. ADVERB (क्रिया विशेषण) — Describes verb/adj: Quickly, Very, Well\n6. PREPOSITION (पूर्वसर्ग) — Shows relationship: In, On, At, For\n7. CONJUNCTION (संयोजक) — Joins words/sentences: And, But, Or, So\n8. INTERJECTION (विस्मयादिबोधक) — Emotion: Oh! Wow! Ouch!`,
                      formula: 'Every word = 1 of 8 Parts of Speech',
                      positiveExamples: [
                        { hindi: 'कुत्ता तेज़ दौड़ता है।', english: 'The dog runs fast.' },
                        { hindi: 'वह बहुत खूबसूरत गाती है।', english: 'She sings very beautifully.' },
                        { hindi: 'मैं और वो स्कूल जाते हैं।', english: 'I and she go to school.' },
                        { hindi: 'ओह! यह कमाल है।', english: 'Oh! This is amazing.' },
                        { hindi: 'बड़ी गाय मैदान में है।', english: 'The big cow is in the field.' },
                      ],
                      tips: [
                        "Trick: NAVPACI — Noun, Adjective, Verb, Pronoun, Adverb, Conjunction, Interjection",
                        "Focus on Noun, Verb, and Adjective first — they appear 80% of the time",
                        "Every complete sentence MUST have at least a Noun + Verb"
                      ],
                    },
                    {
                      id: 'sentence-structure',
                      title: 'Sentence Structure — SVO Pattern',
                      hindiTitle: 'वाक्य संरचना',
                      subtitle: 'The secret to building any English sentence',
                      theory: `English sentences follow a fixed order called SVO:\n\nSubject → Verb → Object\n\nSubject (कर्ता): WHO does the action\nVerb (क्रिया): WHAT action they do\nObject (कर्म): WHO/WHAT is affected\n\nExample: Ram (S) + eats (V) + food (O)\n\nIndi difference: Hindi uses SOV (Subject + Object + Verb)\nHindi: Ram + khana + khata hai\nEnglish: Ram + eats + food (verb comes before object!)`,
                      formula: 'Subject + Verb + Object (SVO)',
                      positiveExamples: [
                        { hindi: 'राम खाना खाता है।', english: 'Ram eats food.' },
                        { hindi: 'वह किताब पढ़ती है।', english: 'She reads a book.' },
                        { hindi: 'मैं अंग्रेज़ी सीखता हूँ।', english: 'I learn English.' },
                        { hindi: 'बच्चे फुटबॉल खेलते हैं।', english: 'Children play football.' },
                        { hindi: 'टीचर मैथ पढ़ाती है।', english: 'The teacher teaches maths.' },
                      ],
                      negativeExamples: [
                        { wrong: 'Food Ram eats.', correct: 'Ram eats food.', reason: 'SVO order must be maintained' },
                        { wrong: 'She book reads.', correct: 'She reads a book.', reason: 'Verb comes before object in English' },
                      ],
                      tips: [
                        "Hindi to English mein translate karte waqt verb ko pehle rakh do (before object)",
                        "Subject (doer) hamesha sentence ki shuruat mein aata hai",
                        "Practice: Aaj 10 Hindi sentences ko SVO mein convert karo"
                      ],
                    },
                    {
                      id: 'articles',
                      title: 'Articles — A, An, The',
                      hindiTitle: 'आर्टिकल्स',
                      subtitle: 'The most commonly misused words in English',
                      theory: `Articles English mein sabse zyada use hone wale words hain. Lekin Hindi mein inke equivalent nahi hote, isliye yahan bahut galatiyaan hoti hain!\n\nA — koi bhi ek (before consonant sounds)\nAn — koi bhi ek (before vowel sounds: a,e,i,o,u)\nThe — ek specific cheez jo dono jaante hain\n\nA/An = Indefinite (koi specific nahi)\nThe = Definite (specific, jo pehle mention hua)\n\nRule: A+consonant: a book, a car, a dog\nRule: An+vowel: an apple, an egg, an umbrella\nRule: The+specific: Please pass the salt (woh namak jo table par hai)`,
                      formula: 'A / An = any one thing | The = that specific thing',
                      positiveExamples: [
                        { hindi: 'मैंने एक किताब पढ़ी।', english: 'I read a book.' },
                        { hindi: 'मुझे एक सेब दो।', english: 'Give me an apple.' },
                        { hindi: 'नमक पास करो (वो जो टेबल पर है)।', english: 'Pass the salt.' },
                        { hindi: 'मैं एक डॉक्टर हूँ।', english: 'I am a doctor.' },
                        { hindi: 'सूरज उगता है।', english: 'The sun rises.' },
                      ],
                      negativeExamples: [
                        { wrong: 'I am engineer.', correct: 'I am an engineer.', reason: "Use 'an' before vowel sound 'e'" },
                        { wrong: 'She is a honest person.', correct: 'She is an honest person.', reason: "'Honest' starts with vowel sound 'o'" },
                      ],
                      tips: [
                        "Trick: 'An' before vowel SOUND, not just vowel letter. 'An hour' (h is silent, sounds like 'our')",
                        "The = specific + both speaker and listener know what it refers to",
                        "No article for: general things (I love music ✅, not 'I love the music')"
                      ],
                    },
                    {
                      id: 'tenses-intro',
                      title: 'Tenses — Time of Action',
                      hindiTitle: 'काल',
                      subtitle: 'Understanding WHEN things happen',
                      theory: `Tenses tell us WHEN an action happens:\n\n⏪ PAST — already happened\n⏺ PRESENT — happening now / always true\n⏩ FUTURE — will happen\n\nEach has 4 forms = 12 tenses total\n\nSimple | Continuous | Perfect | Perfect Continuous\n\nFor Day 1, focus on the 3 Simple Tenses:\n\n1. SIMPLE PRESENT: I eat. She eats. (routine/fact)\n2. SIMPLE PAST: I ate. She ate. (happened before)\n3. SIMPLE FUTURE: I will eat. She will eat. (will happen)`,
                      formula: 'Present: V1 | Past: V2 | Future: Will + V1',
                      positiveExamples: [
                        { hindi: 'मैं रोज़ खाना खाता हूँ।', english: 'I eat food every day. (Present)' },
                        { hindi: 'मैंने कल खाना खाया।', english: 'I ate food yesterday. (Past)' },
                        { hindi: 'मैं कल खाना खाऊँगा।', english: 'I will eat food tomorrow. (Future)' },
                        { hindi: 'वो रोज़ पानी पीती है।', english: 'She drinks water every day.' },
                        { hindi: 'उसने काम किया।', english: 'He did the work.' },
                      ],
                      tips: [
                        "Present Simple: add -s/-es for She/He/It (she runs, he eats)",
                        "Past Simple: Most verbs add -ed (work→worked, play→played), but irregular verbs change completely (go→went, eat→ate)",
                        "Future: Will + base verb, never 'will+verb+s' (wrong: she will goes)"
                      ],
                    },
                    {
                      id: 'sentence-types',
                      title: 'Types of Sentences',
                      hindiTitle: 'वाक्यों के प्रकार',
                      subtitle: '4 types every English speaker must know',
                      theory: `English mein 4 types of sentences hote hain:\n\n1. DECLARATIVE (Statement): Kuch batana\n   - I am a student.\n   - She loves music.\n\n2. INTERROGATIVE (Question): Kuch poochna\n   - Are you a student?\n   - What is your name?\n\n3. IMPERATIVE (Command/Request): Kuch karne kehna\n   - Close the door.\n   - Please help me.\n\n4. EXCLAMATORY (Strong emotion): Josh mein bolna\n   - What a beautiful day!\n   - How amazing!\n\nAffirmative (Positive) vs Negative:\nPositive: I eat food.\nNegative: I do not eat food. (don't)`,
                      formula: 'S + V + O (Declarative) | Aux + S + V? (Question)',
                      positiveExamples: [
                        { hindi: 'मैं छात्र हूँ। (Statement)', english: 'I am a student.' },
                        { hindi: 'क्या तुम छात्र हो? (Question)', english: 'Are you a student?' },
                        { hindi: 'दरवाज़ा बंद करो। (Command)', english: 'Close the door.' },
                        { hindi: 'कितना सुंदर दिन है! (Exclamation)', english: 'What a beautiful day!' },
                        { hindi: 'मैं खाना नहीं खाता। (Negative)', english: "I don't eat food." },
                      ],
                      negativeExamples: [
                        { wrong: 'You student are?', correct: 'Are you a student?', reason: 'Questions: Auxiliary verb comes first' },
                        { wrong: 'He not eat.', correct: "He doesn't eat.", reason: "Use do/does+not for negatives in Simple Present" },
                      ],
                      tips: [
                        "Questions mein: Auxiliary verb (is/are/do/does/did/will) sentence ke shuruat mein aata hai",
                        "Negative mein: do not = don't | does not = doesn't | did not = didn't",
                        "Exclamatory: 'What a + adj + noun!' ya 'How + adj!'"
                      ],
                    },
                    {
                      id: 'pronouns',
                      title: 'Pronouns — Replace Nouns',
                      hindiTitle: 'सर्वनाम',
                      subtitle: 'Stop repeating names — use pronouns!',
                      theory: `Pronouns noun ki jagah use hote hain. Without pronouns, English bahut repetitive ho jaati hai!\n\nSUBJECT PRONOUNS (Subject ki jagah):\nI, You, He, She, It, We, They\n\nOBJECT PRONOUNS (Object ki jagah):\nMe, You, Him, Her, It, Us, Them\n\nPOSSESSIVE ADJECTIVES (Ownership):\nMy, Your, His, Her, Its, Our, Their\n\nPOSSESSIVE PRONOUNS:\nMine, Yours, His, Hers, Its, Ours, Theirs\n\nREFLEXIVE:\nMyself, Yourself, Himself, Herself, Themselves`,
                      formula: 'Subject Pronoun: I/You/He/She/It/We/They',
                      positiveExamples: [
                        { hindi: 'राम पढ़ता है। वो स्मार्ट है।', english: 'Ram studies. He is smart.' },
                        { hindi: 'मेरी किताब यहाँ है।', english: 'My book is here.' },
                        { hindi: 'यह मेरा है।', english: 'This is mine.' },
                        { hindi: 'उन्होंने खुद किया।', english: 'They did it themselves.' },
                        { hindi: 'हम स्कूल जाते हैं।', english: 'We go to school.' },
                      ],
                      negativeExamples: [
                        { wrong: 'Me and Ram went.', correct: 'Ram and I went.', reason: "Subject pronoun 'I' not 'me'; also put yourself last as courtesy" },
                        { wrong: 'Her book is beautiful.', correct: 'Her book is beautiful.', reason: "Actually correct! Her = possessive adjective" },
                        { wrong: 'Give it to I.', correct: 'Give it to me.', reason: "After prepositions, use object pronouns (me, him, her, us, them)" },
                      ],
                      tips: [
                        "Subject pronouns: Do the action (She sings). Object pronouns: Receive the action (I hear her)",
                        "Possessive pronouns stand alone (This is mine ✅), possessive adjectives are before nouns (My book ✅)",
                        "Golden rule: Never say 'Me and Ram' — always 'Ram and I' for subjects"
                      ],
                    },
                  ].map((section, i) => (
                    <TheoryAccordion
                      key={section.id}
                      section={section}
                      index={i}
                      isOpen={openId === section.id}
                      onToggle={() => toggle(section.id)}
                      onMarkUnderstood={markUnderstood}
                      understood={understood[section.id]}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* GOLDEN RULES TAB */}
          {activeTab === 'rules' && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="text-amber-400" size={20} />
                  <h2 className="text-amber-300 font-black text-lg">Golden Rules of English 🌟</h2>
                </div>
                <p className="text-gray-400 text-sm">These are the non-negotiable rules that native speakers follow naturally. Master these and you'll sound 10x more fluent instantly.</p>
              </div>

              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
                {(goldenRules.length > 0 ? goldenRules : [
                  { rule: "Every sentence must have a Subject and a Verb. No exceptions!", example: "I run. (not just 'run')" },
                  { rule: "Subject and Verb must AGREE in number. Singular subject = singular verb.", example: "She runs (not 'She run')" },
                  { rule: "Adjectives come BEFORE the noun in English (unlike Hindi/Urdu).", example: "Beautiful girl (not 'girl beautiful')" },
                  { rule: "Questions start with Auxiliary Verb or WH-word, not with subject.", example: "Are you ready? / What is your name?" },
                  { rule: "Negatives are formed with do/does/did + not, not by just adding 'not'.", example: "I don't eat (not 'I not eat')" },
                  { rule: "Time expressions with 'since' use Present Perfect, not Simple Present.", example: "I have lived here since 2020 (not 'I live here since')" },
                  { rule: "Use 'the' for specific things you've mentioned before or that both parties know.", example: "Close the door. (the specific door in front of you)" },
                  { rule: "Use 'a/an' when mentioning something for the first time or as one of many.", example: "I saw a dog. (some dog, not a specific one)" },
                  { rule: "Present Simple is for habits/facts, NOT for things happening right now.", example: "I eat rice (habit) vs I am eating rice (right now)" },
                  { rule: "Prepositions are fixed. Learn them by example, not by translation.", example: "Interested IN (not 'interested on/at')" },
                  { rule: "Never use double negatives. One negative is enough.", example: "I don't know anything (not 'I don't know nothing')" },
                  { rule: "'This/These' for near things. 'That/Those' for far things.", example: "This book here. That book over there." },
                ]).map((rule, i) => (
                  <GoldenRuleCard key={i} rule={rule} index={i} />
                ))}
              </motion.div>

              {/* Cheat sheet */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  Quick Reference Cheat Sheet
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Subject Pronouns', value: 'I, You, He, She, It, We, They' },
                    { label: 'Object Pronouns', value: 'Me, You, Him, Her, It, Us, Them' },
                    { label: 'Articles', value: 'A (consonant), An (vowel), The (specific)' },
                    { label: 'Question Starters', value: 'Is/Are/Do/Does/Did/Will/Can/Would' },
                    { label: 'WH Words', value: 'What, Where, When, Who, Why, How' },
                    { label: 'Conjunctions', value: 'And, But, Or, So, Because, Although' },
                    { label: 'Prepositions', value: 'In, On, At, For, From, To, With, By' },
                    { label: 'Sentence Order', value: 'Subject + Verb + Object (SVO)' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                      <p className="text-white text-xs font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* QUICK QUIZ TAB */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="text-violet-400" size={20} />
                  <h2 className="text-violet-300 font-black text-lg">Grammar Quick Check 🧠</h2>
                </div>
                <p className="text-gray-400 text-sm">Test your understanding! Choose the correct answer for each question. Instant feedback + explanation included.</p>
              </div>

              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                {BUILT_IN_QUIZZES.map((q, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <div className="text-xs text-gray-500 mb-2 font-medium">Question {i + 1} of {BUILT_IN_QUIZZES.length}</div>
                    <QuizCard
                      question={q.question}
                      options={q.options}
                      answer={q.answer}
                      explanation={q.explanation}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-cyan-300 font-semibold">Pro Tip</p>
                <p className="text-gray-400 text-sm mt-1">After finishing here, go to Practice section for 9,000+ Hindi→English questions to solidify these grammar rules!</p>
              </motion.div>
            </motion.div>
          )}

          {/* STUDY TIPS TAB */}
          {activeTab === 'tips' && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="text-amber-400" size={20} />
                  <h2 className="text-amber-300 font-black text-lg">Pro Study Techniques 💡</h2>
                </div>
                <p className="text-gray-400 text-sm">These are real techniques used by people who became fluent in English in 6-12 months. Steal all of them!</p>
              </div>

              {/* Teacher tips */}
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-3">
                {STUDY_TIPS_EXTRA.map((tip, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`bg-gradient-to-r ${tipColors[tip.color]} border rounded-2xl p-5`}
                  >
                    <h3 className="font-bold text-white text-sm mb-2">{tip.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Daily habits */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-400" />
                  Your Daily English Habit Checklist
                </h3>
                <div className="space-y-2">
                  {DAY1_TEACHER_TIPS.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                      <span className="text-xl flex-shrink-0">{t.emoji}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{t.tip}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{t.hindi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gradient-to-br from-violet-500/15 to-pink-500/10 border border-violet-500/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🔥</div>
                <p className="text-white font-black text-lg mb-2">"Consistency beats intensity every time."</p>
                <p className="text-gray-400 text-sm">15 minutes every day is better than 3 hours once a week. You're already on Day 1 — you've started, and that's the hardest part!</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-violet-400 text-sm font-semibold">
                  <Zap size={14} />
                  75 days × 15 min = fluent English. Let's go!
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
