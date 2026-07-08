'use client';
// FAQ Page — Comprehensive FAQ with search and categories

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const FAQ_DATA = [
  // Getting Started
  {
    category: 'Getting Started',
    emoji: '🚀',
    questions: [
      { q: 'Kya 75 Days Hard English bilkul beginners ke liye bhi hai?',           a: 'Haan! Platform A0 (zero English) se start hota hai. Day 1 se ekdum basics sikhayi jaati hai — sentence structure, parts of speech, sab kuch step-by-step.' },
      { q: 'Mujhe koi app download karni padegi?',                                  a: 'Nahi! 75 Days Hard English ek PWA (Progressive Web App) hai. Browser mein kholo aur Install karo — works on phone, tablet, laptop, sab pe.' },
      { q: 'Kya mujhe register karna zaroori hai?',                                 a: 'Register karna recommended hai taaki aapka progress save ho sake. But aap bina register ke bhi kuch lessons try kar sakte ho.' },
      { q: 'Pehle kaunsa topic se start karna chahiye?',                            a: 'Start from Day 1 — "Basics of English". Platform automatically aapko next topic tak guide karta hai.' },
      { q: 'Ek din mein kitna time lagega?',                                        a: 'Regular plan: sirf 30 minutes/day. Casual: 15 min. Intensive: 60 min. Aap apni pace choose kar sakte ho.' },
    ],
  },
  // Content & Curriculum
  {
    category: 'Content & Curriculum',
    emoji: '📚',
    questions: [
      { q: 'Kya 75 days ke baad English fluent ho jaungi/jaaunga?',                a: 'Agar aap daily practice karo — haan, bohot significant improvement hoga. 75 days mein grammar, vocabulary, aur basic fluency strong ho jaayegi.' },
      { q: 'Questions Hindi mein hain ya English mein?',                           a: 'Practice questions Hindi mein hote hain — aapko unka English translation karna hota hai. Yahi method fastest fluency deta hai.' },
      { q: 'Kya vocabulary words real-life mein use hote hain?',                   a: 'Haan! Har word ke saath office example, daily life example, aur interview example diya jaata hai.' },
      { q: 'Speaking practice kaise hoga?',                                         a: 'Speaking Lab mein drills, roleplay scenarios, shadowing exercises, aur AI speaking partner available hai.' },
      { q: 'Kya professional English (office, interview) bhi cover hoti hai?',     a: 'Bilkul! Days 51-75 specifically professional English pe focus karta hai — emails, meetings, presentations, interviews.' },
    ],
  },
  // Technical
  {
    category: 'Technical',
    emoji: '💻',
    questions: [
      { q: 'Kya app offline bhi kaam karta hai?',                                  a: 'Basic lessons aur flashcards offline available hain. Full features ke liye internet connection recommended hai.' },
      { q: 'Mera progress delete ho sakta hai kya?',                                a: 'Nahi! Progress browser ke localStorage mein aur account mein dono jagah save hota hai. Account se login karo — sab data safe rehta hai.' },
      { q: 'Kaun se browsers support karte hain?',                                  a: 'Chrome, Firefox, Safari, Edge — sabpe perfectly kaam karta hai. Mobile pe bhi.' },
      { q: 'Sound effects band kar sakte hain?',                                    a: 'Haan! Dashboard → Settings mein jaao aur Sound Effects toggle band karo.' },
    ],
  },
  // Gamification
  {
    category: 'Gamification & Progress',
    emoji: '🎮',
    questions: [
      { q: 'XP aur Coins kaise earn hote hain?',                                   a: 'Sahi answer pe +5 XP aur +1 Coin milta hai. Lesson complete karne pe bonus XP. Daily streak maintain karne pe bonus coins.' },
      { q: 'Agar ek din miss ho jaaye toh streak toot jaata hai kya?',              a: 'Haan, streak toot jaata hai. But don\'t worry — "Streak Shield" use kar sakte ho ek emergency skip ke liye.' },
      { q: 'Leaderboard mein kaise aaye?',                                          a: 'Zyada XP earn karo! Daily practice aur correct answers se XP milta hai. Weekly aur monthly leaderboards reset hote hain.' },
      { q: 'Certificate milega kya?',                                               a: 'Haan! All 75 days complete karne pe aur final test pass karne pe certificate milta hai. Pro users ko verified digital certificate milti hai.' },
    ],
  },
  // AI Features
  {
    category: 'AI Features',
    emoji: '🤖',
    questions: [
      { q: 'AI Tutor kya karta hai?',                                              a: 'AI Tutor aapke grammar mistakes check karta hai, sentences improve karta hai, questions ka answer deta hai, aur personalized guidance deta hai.' },
      { q: 'Kya AI mere writing ko check kar sakta hai?',                           a: 'Haan! Writing Lab mein "AI Check" button hai. Aapki writing grammar, vocabulary, aur style ke hisaab se check hoti hai.' },
      { q: 'Free mein AI kitna use kar sakte hain?',                               a: 'Free plan mein 10 AI queries/day. Pro plan mein unlimited.' },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [open, setOpen]         = useState(null);

  const categories = ['All', ...FAQ_DATA.map(c => c.category)];

  // Filter FAQs based on search and category
  const filtered = useMemo(() => {
    return FAQ_DATA
      .filter(cat => category === 'All' || cat.category === category)
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          ({ q, a }) =>
            !search ||
            q.toLowerCase().includes(search.toLowerCase()) ||
            a.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter(cat => cat.questions.length > 0);
  }, [search, category]);

  const totalQ = FAQ_DATA.reduce((s, c) => s + c.questions.length, 0);

  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-24 pb-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-5xl mb-4">❓</div>
            <h1 className="text-4xl font-black text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-slate-400 mb-6">{totalQ}+ common questions answered</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                    : 'bg-white/5 border border-white/8 text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ sections */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">No results for "{search}"</p>
              <button onClick={() => setSearch('')} className="text-indigo-400 text-sm mt-2 hover:text-indigo-300">Clear search</button>
            </div>
          ) : (
            filtered.map(({ category: cat, emoji, questions }) => (
              <div key={cat} className="mb-8">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  {emoji} {cat}
                </h2>
                <div className="space-y-2">
                  {questions.map(({ q, a }, i) => {
                    const key = `${cat}-${i}`;
                    const isOpen = open === key;
                    return (
                      <div key={q} className="rounded-2xl border border-white/5 bg-white/2 overflow-hidden">
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          className="w-full px-5 py-4 text-left flex items-start justify-between gap-3"
                        >
                          <span className="font-semibold text-white text-sm leading-snug">{q}</span>
                          {isOpen ? <ChevronUp size={16} className="text-slate-500 shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-slate-500 shrink-0 mt-0.5" />}
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-white/5"
                            >
                              <p className="px-5 py-4 text-sm text-slate-400 leading-relaxed">{a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Contact CTA */}
          <div className="mt-10 text-center p-6 rounded-2xl border border-white/5 bg-white/2">
            <MessageSquare size={24} className="text-indigo-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">Still have questions?</h3>
            <p className="text-slate-500 text-sm mb-4">We're here to help!</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/20 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
