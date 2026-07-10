'use client';
// ============================================================
// Day 2 — Grammar Theory Page
// Complete grammar theory with examples, exercises, and rules
// for self-introduction sentences.
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, ChevronDown, ChevronUp, CheckCircle2,
  XCircle, Lightbulb, AlertTriangle, Star, Target,
  Sparkles, Eye, EyeOff, Volume2, Check, RotateCcw
} from 'lucide-react';

// ── Inline exercise component ─────────────────────────────────────────────────
function InlineExercise({ exercise }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!exercise?.questions?.length) return null;

  const score = exercise.questions.filter((q, i) => answers[i] === q.correct).length;

  return (
    <div className="mt-6 bg-indigo-50 rounded-xl border border-indigo-100 p-5">
      <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
        <Target className="w-4 h-4" />
        Quick Exercise — {exercise.title}
      </h4>
      <div className="space-y-4">
        {exercise.questions.map((q, i) => {
          const answered = answers[i] !== undefined;
          const isCorrect = answers[i] === q.correct;

          return (
            <div key={i} className="bg-white rounded-xl p-4 border border-indigo-100">
              <p className="font-medium text-gray-800 mb-3 text-sm">{i + 1}. {q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options?.map(opt => {
                  let cls = 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:border-blue-300';
                  if (answered) {
                    cls = opt === q.correct ? 'border-green-400 bg-green-50 text-green-800 font-semibold' :
                          opt === answers[i] ? 'border-red-400 bg-red-50 text-red-600' :
                          'border-gray-100 text-gray-400 opacity-60';
                  }
                  return (
                    <button key={opt} onClick={() => { if (!answered) setAnswers(prev => ({ ...prev, [i]: opt })); }}
                      disabled={answered}
                      className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${cls}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && q.explanation && (
                <p className={`mt-2 text-xs p-2 rounded-lg ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {isCorrect ? '✓ Correct! ' : `✗ Wrong. Correct: ${q.correct}. `}{q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {Object.keys(answers).length === exercise.questions.length && (
        <div className="mt-4 text-center font-semibold text-indigo-700">
          Score: {score}/{exercise.questions.length}
        </div>
      )}
    </div>
  );
}

// ── Grammar section accordion ─────────────────────────────────────────────────
function GrammarSection({ section, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [showHindi, setShowHindi] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4"
    >
      {/* Section header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
            index % 6 === 0 ? 'bg-blue-600' :
            index % 6 === 1 ? 'bg-purple-600' :
            index % 6 === 2 ? 'bg-green-600' :
            index % 6 === 3 ? 'bg-orange-600' :
            index % 6 === 4 ? 'bg-red-600' :
                              'bg-indigo-600'
          }`}>
            {index + 1}
          </div>
          <div>
            <p className="font-bold text-gray-800">{section.title}</p>
            {section.hindiTitle && (
              <p className="text-xs text-gray-500">{section.hindiTitle}</p>
            )}
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
              {/* Explanation */}
              {section.explanation && (
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                  <p className="text-gray-700 leading-relaxed text-sm">{section.explanation}</p>
                </div>
              )}

              {/* Hindi explanation toggle */}
              {section.hindiExplanation && (
                <div>
                  <button
                    onClick={() => setShowHindi(v => !v)}
                    className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    {showHindi ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showHindi ? 'Hide Hindi' : 'See Hindi Explanation'}
                  </button>
                  <AnimatePresence>
                    {showHindi && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="mt-2 bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm text-gray-700">
                          {section.hindiExplanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Structure/Formula */}
              {section.structure && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Structure</p>
                  <div className="bg-gray-800 text-green-400 rounded-xl p-4 font-mono text-sm">
                    {section.structure}
                  </div>
                </div>
              )}

              {/* Rules */}
              {section.rules?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Rules</p>
                  <ul className="space-y-2">
                    {section.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples */}
              {section.examples?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</p>
                  <div className="space-y-2">
                    {section.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-xs text-gray-400 font-mono w-4 pt-0.5">{i + 1}.</span>
                        <div className="flex-1">
                          {typeof ex === 'string' ? (
                            <p className={`text-sm font-medium ${ex.includes('✓') ? 'text-green-700' : ex.includes('✗') ? 'text-red-600 line-through' : 'text-gray-700'}`}>{ex}</p>
                          ) : (
                            <div>
                              {ex.correct && <p className="text-sm text-green-700 font-medium">✓ {ex.correct}</p>}
                              {ex.wrong && <p className="text-sm text-red-600 line-through">✗ {ex.wrong}</p>}
                              {ex.note && <p className="text-xs text-gray-500 mt-1 italic">{ex.note}</p>}
                              {ex.hindi && <p className="text-xs text-orange-600 mt-1">{ex.hindi}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common mistakes */}
              {section.commonMistakes?.length > 0 && (
                <div className="bg-red-50 rounded-xl border border-red-100 p-4">
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Common Mistakes
                  </p>
                  <ul className="space-y-2">
                    {section.commonMistakes.map((m, i) => (
                      <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {typeof m === 'string' ? m : `${m.wrong} → ${m.correct}: ${m.explanation || ''}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips */}
              {section.tips?.length > 0 && (
                <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4">
                  <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Pro Tips
                  </p>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practice exercise */}
              {section.practiceExercise && (
                <InlineExercise exercise={section.practiceExercise} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main grammar page ─────────────────────────────────────────────────────────
export default function Day2GrammarPage() {
  const [grammarData, setGrammarData] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const sections = data?.grammarTheory?.sections || data?.grammarTheory || [];
        const sectionsArr = Array.isArray(sections) ? sections : Object.values(sections);
        setGrammarData(sectionsArr);
        setFiltered(sectionsArr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Search filter
  useEffect(() => {
    if (!grammarData) return;
    if (!searchQuery.trim()) {
      setFiltered(grammarData);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFiltered(grammarData.filter(s =>
      (s.title || '').toLowerCase().includes(q) ||
      (s.explanation || '').toLowerCase().includes(q) ||
      (s.hindiTitle || '').toLowerCase().includes(q)
    ));
  }, [searchQuery, grammarData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block font-medium">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Grammar Theory
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <span className="text-sm text-gray-500">{filteredSections.length} topics</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Intro banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-5 mb-6 shadow-xl">
          <h2 className="font-bold text-lg mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Self Introduction Grammar
          </h2>
          <p className="text-blue-100 text-sm">
            Yahan har grammar rule ke saath examples, Hindi explanation, aur practice exercises hain.
            Har section pe click karein aur expand karein.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search grammar topics..."
            className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          )}
        </div>

        {/* Grammar sections */}
        {filteredSections.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No grammar topics found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-3 text-sm text-blue-600 hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          filteredSections.map((section, i) => (
            <GrammarSection key={section.id || i} section={section} index={i} />
          ))
        )}

        {/* Footer nav */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Continue Learning:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { href: '/practice/day-2/vocabulary', label: 'Vocabulary', emoji: '📚' },
              { href: '/practice/day-2/test', label: 'Test', emoji: '🎯' },
              { href: '/practice/day-2/flashcards', label: 'Flashcards', emoji: '🃏' },
              { href: '/practice/day-2/revision', label: 'Revision', emoji: '🔄' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all text-sm font-medium text-gray-700 border border-transparent hover:border-blue-200">
                <span>{link.emoji}</span>{link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
