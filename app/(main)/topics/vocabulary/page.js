'use client';
// ============================================================
// VOCABULARY HUB PAGE - Lists ALL vocabulary categories
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight } from 'lucide-react';

const VOCAB_TOPICS = [
  { slug: 'daily-vocabulary', title: 'Daily Vocabulary', emoji: '📅', group: 'Essential' },
  { slug: 'family', title: 'Family', emoji: '👨‍👩‍👧‍👦', group: 'People' },
  { slug: 'relations', title: 'Relations', emoji: '❤️', group: 'People' },
  { slug: 'occupations', title: 'Occupations & Professions', emoji: '👔', group: 'People' },
  { slug: 'personality', title: 'Personality', emoji: '🧠', group: 'People' },
  { slug: 'emotions', title: 'Emotions', emoji: '😊', group: 'People' },
  { slug: 'body-diseases', title: 'Body & Diseases', emoji: '🏥', group: 'Health' },
  { slug: 'food', title: 'Food', emoji: '🍕', group: 'Daily Life' },
  { slug: 'drinks', title: 'Drinks', emoji: '🥤', group: 'Daily Life' },
  { slug: 'fruits', title: 'Fruits', emoji: '🍎', group: 'Daily Life' },
  { slug: 'vegetables', title: 'Vegetables', emoji: '🥕', group: 'Daily Life' },
  { slug: 'kitchen', title: 'Kitchen', emoji: '🍳', group: 'Daily Life' },
  { slug: 'home', title: 'Home', emoji: '🏠', group: 'Daily Life' },
  { slug: 'furniture', title: 'Furniture', emoji: '🛋️', group: 'Daily Life' },
  { slug: 'clothing', title: 'Clothing', emoji: '👗', group: 'Daily Life' },
  { slug: 'stationery', title: 'Stationery', emoji: '✏️', group: 'Daily Life' },
  { slug: 'colours-judiciary', title: 'Colours & Judiciary', emoji: '🌈', group: 'Daily Life' },
  { slug: 'weather', title: 'Weather', emoji: '🌤️', group: 'Nature' },
  { slug: 'nature', title: 'Nature', emoji: '🌿', group: 'Nature' },
  { slug: 'animals', title: 'Animals', emoji: '🐾', group: 'Nature' },
  { slug: 'birds', title: 'Birds', emoji: '🐦', group: 'Nature' },
  { slug: 'flowers', title: 'Flowers', emoji: '🌸', group: 'Nature' },
  { slug: 'worms-insects', title: 'Worms & Insects', emoji: '🐛', group: 'Nature' },
  { slug: 'travel', title: 'Travel', emoji: '✈️', group: 'Places' },
  { slug: 'transportation', title: 'Transportation', emoji: '🚗', group: 'Places' },
  { slug: 'airport', title: 'Airport', emoji: '🛫', group: 'Places' },
  { slug: 'railway', title: 'Railway', emoji: '🚆', group: 'Places' },
  { slug: 'hotel', title: 'Hotel', emoji: '🏨', group: 'Places' },
  { slug: 'restaurant', title: 'Restaurant', emoji: '🍽️', group: 'Places' },
  { slug: 'hospital', title: 'Hospital', emoji: '🏥', group: 'Places' },
  { slug: 'buildings', title: 'Buildings', emoji: '🏢', group: 'Places' },
  { slug: 'shopping', title: 'Shopping', emoji: '🛍️', group: 'Places' },
  { slug: 'education', title: 'Education', emoji: '📚', group: 'Professional' },
  { slug: 'office', title: 'Office', emoji: '🏢', group: 'Professional' },
  { slug: 'business', title: 'Business', emoji: '💼', group: 'Professional' },
  { slug: 'banking', title: 'Banking', emoji: '🏦', group: 'Professional' },
  { slug: 'industry', title: 'Industry', emoji: '🏭', group: 'Professional' },
  { slug: 'factory-sports-sound', title: 'Factory, Sports & Sound', emoji: '⚽', group: 'Professional' },
  { slug: 'maths', title: 'Maths', emoji: '🔢', group: 'Professional' },
  { slug: 'technology', title: 'Technology', emoji: '💻', group: 'Technology' },
  { slug: 'computer', title: 'Computer', emoji: '🖥️', group: 'Technology' },
  { slug: 'internet', title: 'Internet', emoji: '🌐', group: 'Technology' },
  { slug: 'social-media', title: 'Social Media', emoji: '📱', group: 'Technology' },
  { slug: 'ai', title: 'AI & Machine Learning', emoji: '🤖', group: 'Technology' },
  { slug: 'sports', title: 'Sports', emoji: '⚽', group: 'Lifestyle' },
  { slug: 'festivals', title: 'Festivals', emoji: '🎊', group: 'Lifestyle' },
  { slug: 'months', title: 'Months', emoji: '📆', group: 'Time' },
  { slug: 'days', title: 'Days', emoji: '📅', group: 'Time' },
  { slug: 'time', title: 'Time', emoji: '⏰', group: 'Time' },
  { slug: 'directions', title: 'Directions', emoji: '🧭', group: 'Time' },
  { slug: 'countries', title: 'Countries', emoji: '🌍', group: 'World' },
  { slug: 'nationalities', title: 'Nationalities', emoji: '🏳️', group: 'World' },
  { slug: 'currency', title: 'Currency', emoji: '💰', group: 'World' },
  { slug: 'phrasal-verbs', title: 'Phrasal Verbs', emoji: '🔗', group: 'Advanced' },
  { slug: 'idioms', title: 'Idioms', emoji: '💡', group: 'Advanced' },
  { slug: 'proverbs', title: 'Proverbs', emoji: '📜', group: 'Advanced' },
  { slug: 'synonyms', title: 'Synonyms', emoji: '🔄', group: 'Advanced' },
  { slug: 'antonyms', title: 'Antonyms', emoji: '↔️', group: 'Advanced' },
  { slug: 'one-word-substitutions', title: 'One Word Substitutions', emoji: '1️⃣', group: 'Advanced' },
  { slug: 'collocations', title: 'Collocations', emoji: '🧩', group: 'Advanced' },
  { slug: 'prefixes', title: 'Prefixes', emoji: '⬅️', group: 'Advanced' },
  { slug: 'suffixes', title: 'Suffixes', emoji: '➡️', group: 'Advanced' },
  { slug: 'root-words', title: 'Root Words', emoji: '🌱', group: 'Advanced' },
  { slug: 'commonly-confused-words', title: 'Commonly Confused Words', emoji: '😵', group: 'Advanced' },
  { slug: 'miscellaneous', title: 'Miscellaneous', emoji: '📦', group: 'Other' },
  { slug: 'important-vocabulary', title: 'Important Vocabulary', emoji: '⭐', group: 'Other' },
];

const GROUPS = ['All', ...new Set(VOCAB_TOPICS.map(t => t.group))];
const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function VocabularyHubPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  const filtered = useMemo(() => VOCAB_TOPICS.filter(t =>
    (t.title.toLowerCase().includes(search.toLowerCase())) &&
    (activeGroup === 'All' || t.group === activeGroup)
  ), [search, activeGroup]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white">Vocabulary Bank</h1>
              <p className="text-white/80 text-lg mt-1">{VOCAB_TOPICS.length} Categories • 66,000+ Words</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 हर कैटेगरी में 1000 शब्द, Hindi meaning, IPA pronunciation, और examples के साथ!
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search vocabulary categories..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm" />
      </div>

      <div className="flex flex-wrap gap-2">
        {GROUPS.map(g => (
          <button key={g} onClick={() => setActiveGroup(g)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeGroup === g ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'}`}>
            {g}
          </button>
        ))}
      </div>

      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/vocabulary/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div className="p-5">
                  <span className="text-3xl block mb-3">{t.emoji}</span>
                  <h3 className="text-white font-bold text-base group-hover:text-emerald-300 transition-colors">{t.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 mb-3">{t.group}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs">1000 Words</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
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
