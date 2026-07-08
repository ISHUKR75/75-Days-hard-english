'use client';
// Welcome Page — First screen of onboarding
// Animated intro with feature highlights and CTA

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Mic, Brain, Zap, Star, CheckCircle2 } from 'lucide-react';

// Animated features to cycle through
const FEATURES = [
  { icon: '📚', text: '75 Structured Days', color: 'text-indigo-400' },
  { icon: '🎤', text: 'Speaking Practice',  color: 'text-purple-400' },
  { icon: '🤖', text: 'AI-Powered Tutor',   color: 'text-cyan-400'   },
  { icon: '🏆', text: 'Gamified Learning',  color: 'text-amber-400'  },
];

// Floating emoji animation
function FloatingEmoji({ emoji, delay, x, y }) {
  return (
    <motion.div
      className="absolute text-3xl pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.div>
  );
}

export default function WelcomePage() {
  const [featureIdx, setFeatureIdx] = useState(0);

  // Cycle through features
  useEffect(() => {
    const t = setInterval(() => setFeatureIdx(i => (i + 1) % FEATURES.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative text-center py-8">

      {/* Floating background emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingEmoji emoji="📚" delay={0}   x={10} y={10} />
        <FloatingEmoji emoji="🎤" delay={0.5} x={85} y={15} />
        <FloatingEmoji emoji="🏆" delay={1}   x={5}  y={70} />
        <FloatingEmoji emoji="⚡" delay={1.5} x={90} y={65} />
        <FloatingEmoji emoji="🌟" delay={0.8} x={50} y={5}  />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/30 mb-6"
      >
        <span className="text-white font-black text-2xl">75</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-black text-white mb-2"
      >
        Welcome to
        <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          75 Days Hard English! 🎉
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-slate-400 text-sm mb-8 max-w-sm mx-auto"
      >
        75 days mein zero se fluent English bolna sikho. Grammar, speaking,
        vocabulary — sab kuch ek jagah.
      </motion.p>

      {/* Animated feature pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[220px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={featureIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">{FEATURES[featureIdx].icon}</span>
              <span className={`font-semibold text-sm ${FEATURES[featureIdx].color}`}>
                {FEATURES[featureIdx].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Feature checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-5 mb-8 text-left space-y-3 max-w-sm mx-auto"
      >
        {[
          '75 days ka structured curriculum',
          'Hindi mein practice questions (500+/topic)',
          'AI Tutor for personalized help',
          'Sound effects + Gamification (XP, Coins)',
          'Pronunciation Lab + Speaking drills',
          '100% Free — No credit card needed',
        ].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span className="text-sm text-slate-300">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3"
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/select-level"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/30"
          >
            Start Setup <ArrowRight size={18} />
          </Link>
        </motion.div>
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          Skip setup → Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
