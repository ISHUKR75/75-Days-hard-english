'use client';
// ============================================================
// LISTENING LAB PAGE - All listening practice topics
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Headphones, ChevronRight } from 'lucide-react';

const LISTENING_TOPICS = [
  { slug: 'dictation-practice', title: 'Dictation Practice', emoji: '📝', desc: 'Listen and write what you hear' },
  { slug: 'audio-comprehension', title: 'Audio Comprehension', emoji: '🎧', desc: 'Understand spoken English passages' },
  { slug: 'conversation-listening', title: 'Conversation Listening', emoji: '💬', desc: 'Real-world conversation practice' },
  { slug: 'news-listening', title: 'News Listening', emoji: '📰', desc: 'Understand news broadcasts' },
  { slug: 'song-lyrics', title: 'Song Lyrics Practice', emoji: '🎵', desc: 'Learn English through songs' },
  { slug: 'podcast-comprehension', title: 'Podcast Comprehension', emoji: '🎙️', desc: 'Understand podcast discussions' },
  { slug: 'movie-dialogue', title: 'Movie Dialogue', emoji: '🎬', desc: 'Learn from movie conversations' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const cardV = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };

export default function ListeningLabPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Headphones className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Listening Lab</h1>
              <p className="text-white/80 text-lg mt-1">7 Practice Types • Sharpen Your Ears</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 सुनकर समझने का अभ्यास करो — Dictation, Conversations, News, Songs, Movies — सब कुछ यहाँ!
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LISTENING_TOPICS.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-t-2xl" />
                <div className="p-6">
                  <span className="text-4xl block mb-3">{t.emoji}</span>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-sky-300 transition-colors">{t.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs">1000 Questions</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
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
