'use client';
// ============================================================
// PRONUNCIATION HUB PAGE
// All pronunciation topics in a premium animated grid
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, Search, ChevronRight } from 'lucide-react';

const PRON_TOPICS = [
  { slug: 'sounds-ipa', title: 'Sounds & IPA', emoji: '🔤', desc: 'Learn the International Phonetic Alphabet' },
  { slug: 'word-stress', title: 'Word Stress', emoji: '🎯', desc: 'Where to put emphasis in words' },
  { slug: 'sentence-stress', title: 'Sentence Stress', emoji: '📢', desc: 'Rhythm and emphasis in sentences' },
  { slug: 'intonation', title: 'Intonation', emoji: '🎵', desc: 'Rising and falling pitch patterns' },
  { slug: 'connected-speech', title: 'Connected Speech', emoji: '🔗', desc: 'How sounds change in natural speech' },
  { slug: 'minimal-pairs', title: 'Minimal Pairs', emoji: '👂', desc: 'Distinguish similar sounds' },
  { slug: 'silent-letters', title: 'Silent Letters', emoji: '🤫', desc: 'Letters you see but don\'t say' },
  { slug: 'vowels-consonants', title: 'Vowels & Consonants', emoji: '🗣️', desc: 'Master all English sounds' },
  { slug: 'tongue-twisters', title: 'Tongue Twisters', emoji: '😜', desc: 'Fun practice for fluency' },
  { slug: 'commonly-mispronounced', title: 'Commonly Mispronounced', emoji: '❌', desc: 'Words Indians often mispronounce' },
  { slug: 'accent-training', title: 'Accent Training', emoji: '🌍', desc: 'Develop a neutral English accent' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PronunciationHubPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => PRON_TOPICS.filter(t => t.title.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Volume2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Pronunciation Lab</h1>
              <p className="text-white/80 text-lg mt-1">{PRON_TOPICS.length} Topics • Master English Sounds</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 सही उच्चारण सीखो! IPA sounds, word stress, intonation, और connected speech — native speaker जैसा बोलो!
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search pronunciation topics..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm" />
      </div>

      {/* Grid */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(topic => (
          <motion.div key={topic.slug} variants={cardV}>
            <Link href={`/topics/${topic.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5">
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl" />
                <div className="p-6">
                  <span className="text-4xl block mb-3">{topic.emoji}</span>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-300 transition-colors">{topic.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{topic.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs">1000 Questions</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
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
