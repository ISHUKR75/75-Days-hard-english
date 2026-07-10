'use client';
// ============================================================
// Day 2 — Speaking Drills Page
// Guided speaking exercises, shadowing, pronunciation drills,
// and self-recording prompts for self-introduction.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Mic, ArrowLeft, Volume2, Play, Pause, RotateCcw,
  CheckCircle2, ChevronRight, ChevronLeft, Star, Target,
  Sparkles, Timer, Trophy, Zap, Eye, EyeOff, BookOpen, X
} from 'lucide-react';

// ── Text-to-speech helper ────────────────────────────────────────────────────
function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const speak = useCallback((text, rate = 0.85) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    u.onstart = () => setIsSpeaking(true);
    u.onend   = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}

// ── Drill card ───────────────────────────────────────────────────────────────
function DrillCard({ drill, onComplete, isCompleted }) {
  const { speak, stop, isSpeaking } = useSpeech();
  const [showHindi, setShowHindi]   = useState(false);
  const [speed, setSpeed]           = useState('normal');
  const SPEED_MAP = { slow: 0.65, normal: 0.85, fast: 1.1 };

  const englishText = drill.english || drill.text || drill.sentence || '';

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-md transition-all ${isCompleted ? 'border-green-300' : 'border-gray-100'}`}>
      {/* Card header */}
      <div className={`px-6 py-3 border-b border-gray-100 flex items-center justify-between ${isCompleted ? 'bg-green-50' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            drill.type === 'shadowing' ? 'bg-blue-100 text-blue-700' :
            drill.type === 'pronunciation' ? 'bg-purple-100 text-purple-700' :
            drill.type === 'response' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {drill.type || 'Speaking'}
          </span>
          {drill.difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              drill.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              drill.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {drill.difficulty}
            </span>
          )}
        </div>
        {isCompleted && <span className="text-green-600 text-xs font-medium flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Done</span>}
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Scenario / context */}
        {drill.context && (
          <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">Situation:</p>
            <p className="text-sm text-amber-900">{drill.context}</p>
          </div>
        )}

        {/* Hindi prompt */}
        {drill.hindi && (
          <p className="text-sm text-orange-700 mb-3 font-medium">{drill.hindi}</p>
        )}

        {/* English text to say */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border border-blue-100">
          <p className="text-gray-800 font-medium leading-relaxed text-base md:text-lg">
            {englishText}
          </p>
        </div>

        {/* Pronunciation note */}
        {drill.pronunciation && (
          <div className="bg-purple-50 rounded-xl p-3 mb-4 border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">🗣️ Pronunciation tip:</p>
            <p className="text-sm text-purple-800">{drill.pronunciation}</p>
          </div>
        )}

        {/* Tips */}
        {drill.tips?.length > 0 && (
          <div className="mb-4">
            {drill.tips.map((tip, i) => (
              <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5 mb-1">
                <span className="text-yellow-500 mt-0.5">💡</span>{tip}
              </p>
            ))}
          </div>
        )}

        {/* Controls row */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Listen button */}
          <button
            onClick={() => isSpeaking ? stop() : speak(englishText, SPEED_MAP[speed])}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              isSpeaking ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            }`}
          >
            {isSpeaking ? <><Pause className="w-4 h-4" /> Stop</> : <><Volume2 className="w-4 h-4" /> Listen</>}
          </button>

          {/* Speed selector */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {['slow', 'normal', 'fast'].map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${speed === s ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
                {s}
              </button>
            ))}
          </div>

          {/* Hindi toggle */}
          {drill.translation && (
            <button
              onClick={() => setShowHindi(v => !v)}
              className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 ml-auto"
            >
              {showHindi ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showHindi ? 'Hide' : 'Hindi'}
            </button>
          )}
        </div>

        {/* Hindi translation */}
        <AnimatePresence>
          {showHindi && drill.translation && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="mt-3 bg-orange-50 rounded-xl p-3 border border-orange-100">
                <p className="text-sm text-gray-700">{drill.translation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complete button */}
        <button
          onClick={onComplete}
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all ${
            isCompleted
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg'
          }`}
        >
          {isCompleted ? '✓ Marked as Done — Click to undo' : '🎤 I Said It Aloud!'}
        </button>
      </div>
    </div>
  );
}

// ── Timer-based speaking challenge ────────────────────────────────────────────
function SpeakingChallenge() {
  const PROMPTS = [
    '60-second Introduction',
    '30-second Office Intro',
    'Phone Call Introduction',
    'College First Day Introduction',
    'Interview Introduction',
    'Video Call Introduction',
  ];
  const [active, setActive]     = useState(false);
  const [time, setTime]         = useState(60);
  const [selected, setSelected] = useState(0);
  const [done, setDone]         = useState(false);
  const timerRef = useRef(null);

  const start = (seconds) => {
    setTime(seconds);
    setDone(false);
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;
    if (time <= 0) { setActive(false); setDone(true); return; }
    timerRef.current = setTimeout(() => setTime(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [active, time]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
      <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
        <Timer className="w-5 h-5 text-purple-600" />
        Timed Speaking Challenge
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">Choose a scenario and speak for the allotted time:</p>
        <div className="flex flex-wrap gap-2">
          {PROMPTS.map((p, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`px-3 py-1.5 rounded-xl text-sm border transition-colors ${selected === i ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {done ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-bold text-gray-800">Great job!</p>
          <p className="text-gray-500 text-sm">You completed the challenge.</p>
          <button onClick={() => setDone(false)} className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold">
            Try Again
          </button>
        </div>
      ) : active ? (
        <div className="text-center py-6">
          <div className={`text-6xl font-bold mb-3 ${time <= 10 ? 'text-red-600' : 'text-purple-600'}`}>
            {fmt(time)}
          </div>
          <p className="text-gray-600 mb-2 font-medium">{PROMPTS[selected]}</p>
          <p className="text-gray-400 text-sm mb-4">Introduce yourself as if you are in this situation.</p>
          <button onClick={() => { setActive(false); clearTimeout(timerRef.current); }} className="px-6 py-2 bg-red-100 text-red-600 rounded-xl font-semibold border border-red-200">
            Stop
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          {[30, 60, 120].map(secs => (
            <button key={secs} onClick={() => start(secs)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-purple-700 hover:to-indigo-700 shadow-md">
              {secs}s
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main speaking page ────────────────────────────────────────────────────────
export default function Day2SpeakingPage() {
  const [drills, setDrills]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [completedDrills, setCompleted] = useState(new Set());
  const [activeSection, setSection] = useState('all');
  const [currentDrillIdx, setDrillIdx] = useState(0);
  const [mode, setMode]             = useState('list'); // list | single

  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const speakingData = data?.speakingDrill || [];
        const items = Array.isArray(speakingData) ? speakingData : speakingData.drills || [];
        setDrills(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    try {
      const saved = JSON.parse(localStorage.getItem('day2-speaking-done') || '[]');
      setCompleted(new Set(saved));
    } catch { /* ignore */ }
  }, []);

  const toggleComplete = useCallback((id) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem('day2-speaking-done', JSON.stringify([...next]));
      return next;
    });
  }, []);

  const sections = ['all', ...new Set(drills.map(d => d.type || d.section || 'General'))];
  const visibleDrills = activeSection === 'all' ? drills : drills.filter(d => (d.type || d.section || 'General') === activeSection);
  const doneCount = drills.filter(d => completedDrills.has(d.id || d.text)).length;

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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block font-medium">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-600" />
              Speaking Drills
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <div className="text-sm text-gray-500">{doneCount}/{drills.length}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-5 mb-6 shadow-xl">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Speaking Practice
          </h2>
          <p className="text-blue-100 text-sm">
            Listen → Repeat → Mark done. Har sentence ko zaur se padhein ya bolo. 
            Slow speed pe 3 baar dohraaein.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">{drills.length} drills</span>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">{doneCount} done</span>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">TTS included</span>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Session Progress</span>
            <span className="text-blue-600 font-bold">{doneCount}/{drills.length}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={{ width: `${drills.length ? (doneCount / drills.length) * 100 : 0}%` }}
              transition={{ duration: 0.5 }} />
          </div>
        </div>

        {/* Section filters */}
        {sections.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map(s => (
              <button key={s} onClick={() => setSection(s)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${
                  activeSection === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'
                }`}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Drills */}
        {visibleDrills.length === 0 ? (
          <div className="text-center py-16">
            <Mic className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No speaking drills found. Please check the API.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {visibleDrills.map((drill, i) => {
              const id = drill.id || drill.text || i;
              return (
                <motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <DrillCard
                    drill={drill}
                    isCompleted={completedDrills.has(id)}
                    onComplete={() => toggleComplete(id)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Timed challenge section */}
        <SpeakingChallenge />

        {/* How to practice tips */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">🎯 How to Practice Effectively</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { emoji: '👂', step: '1. Listen', tip: 'Click Listen and listen carefully to pronunciation and rhythm' },
              { emoji: '🔄', step: '2. Repeat', tip: 'Say the sentence aloud 3 times — slow, normal, fast' },
              { emoji: '🪞', step: '3. Mirror', tip: 'Stand in front of a mirror. Watch your mouth and expressions' },
              { emoji: '📝', step: '4. Record', tip: 'Record yourself on phone. Compare with the original' },
              { emoji: '🕐', step: '5. Daily', tip: '10 minutes daily is better than 2 hours once a week' },
              { emoji: '🌟', step: '6. Real use', tip: 'Use these sentences in real conversations today' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.step}</p>
                  <p className="text-xs text-gray-500">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
