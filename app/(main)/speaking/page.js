'use client';
// ============================================================
// SPEAKING LAB PAGE - Speaking practice hub
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mic, ChevronRight, Star } from 'lucide-react';

const SPEAKING_TOPICS = [
  { slug: 'greetings', title: 'Greetings & Introduction', emoji: '👋', level: 'A1' },
  { slug: 'daily-conversation', title: 'Daily Conversation', emoji: '💬', level: 'A1' },
  { slug: 'small-talk', title: 'Small Talk', emoji: '🗣️', level: 'A2' },
  { slug: 'opinion-giving', title: 'Opinion Giving', emoji: '💭', level: 'A2' },
  { slug: 'agreeing-disagreeing', title: 'Agreeing & Disagreeing', emoji: '🤝', level: 'A2' },
  { slug: 'interview-english', title: 'Interview English', emoji: '💼', level: 'B1' },
  { slug: 'meeting-english', title: 'Meeting English', emoji: '🏢', level: 'B1' },
  { slug: 'presentation-skills', title: 'Presentation Skills', emoji: '📊', level: 'B2' },
  { slug: 'public-speaking', title: 'Public Speaking', emoji: '🎤', level: 'B2' },
  { slug: 'debate', title: 'Debate', emoji: '⚔️', level: 'B2' },
  { slug: 'group-discussion', title: 'Group Discussion', emoji: '👥', level: 'B1' },
  { slug: 'storytelling', title: 'Storytelling', emoji: '📖', level: 'B1' },
  { slug: 'confidence-building', title: 'Confidence Building', emoji: '💪', level: 'A2' },
  { slug: 'english-thinking-practice', title: 'Think in English', emoji: '🧠', level: 'B1' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function SpeakingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-orange-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Mic className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Speaking Lab</h1>
              <p className="text-white/80 text-lg mt-1">14 Topics • Build Fluency & Confidence</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 अंग्रेज़ी बोलने का confidence बनाओ! Daily conversation से लेकर Interview और Public Speaking तक!
          </p>
        </div>
      </motion.div>

      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SPEAKING_TOPICS.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/spoken/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-2xl" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{t.emoji}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      t.level === 'A1' ? 'bg-green-500/20 text-green-400' :
                      t.level === 'A2' ? 'bg-blue-500/20 text-blue-400' :
                      t.level === 'B1' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{t.level}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-rose-300 transition-colors">{t.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-600 text-xs">1000 Questions</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
