'use client';
// ============================================================
// REAL-LIFE SITUATIONS HUB PAGE
// All real-life scenarios for English practice
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Search, ChevronRight } from 'lucide-react';

const REAL_LIFE_TOPICS = [
  { slug: 'at-hospital', title: 'At Hospital', emoji: '🏥', desc: 'Doctor appointments, symptoms, prescriptions' },
  { slug: 'at-bank', title: 'At Bank', emoji: '🏦', desc: 'Account opening, transactions, loans' },
  { slug: 'at-airport', title: 'At Airport', emoji: '✈️', desc: 'Check-in, boarding, customs, immigration' },
  { slug: 'at-hotel', title: 'At Hotel', emoji: '🏨', desc: 'Booking, check-in, room service, complaints' },
  { slug: 'at-restaurant', title: 'At Restaurant', emoji: '🍽️', desc: 'Ordering food, reservations, paying bills' },
  { slug: 'at-shopping', title: 'At Shopping Mall', emoji: '🛍️', desc: 'Buying, bargaining, returns, exchanges' },
  { slug: 'at-railway-station', title: 'At Railway Station', emoji: '🚆', desc: 'Ticket booking, platforms, announcements' },
  { slug: 'at-post-office', title: 'At Post Office', emoji: '📮', desc: 'Sending parcels, stamps, registered mail' },
  { slug: 'at-police-station', title: 'At Police Station', emoji: '🚔', desc: 'FIR, complaints, emergencies' },
  { slug: 'at-school', title: 'At School', emoji: '🏫', desc: 'Teachers, classmates, homework, exams' },
  { slug: 'at-office', title: 'At Office', emoji: '🏢', desc: 'Meetings, presentations, emails, colleagues' },
  { slug: 'at-gym', title: 'At Gym', emoji: '💪', desc: 'Workout instructions, membership, trainers' },
  { slug: 'at-park', title: 'At Park', emoji: '🌳', desc: 'Outdoor activities, casual conversations' },
  { slug: 'at-temple', title: 'At Temple/Church', emoji: '🛕', desc: 'Religious places, cultural conversations' },
  { slug: 'at-market', title: 'At Market', emoji: '🏪', desc: 'Grocery shopping, street vendors' },
  { slug: 'at-cinema', title: 'At Cinema', emoji: '🎬', desc: 'Movie tickets, snacks, reviews' },
  { slug: 'during-travel', title: 'During Travel', emoji: '🗺️', desc: 'Directions, transport, sightseeing' },
  { slug: 'emergency-situations', title: 'Emergency Situations', emoji: '🚨', desc: 'Accidents, fire, medical emergencies' },
  { slug: 'job-interview', title: 'Job Interview', emoji: '💼', desc: 'Common questions, answers, body language' },
  { slug: 'phone-call', title: 'Phone Call', emoji: '📞', desc: 'Making, receiving, professional phone calls' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function RealLifeHubPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => REAL_LIFE_TOPICS.filter(t => t.title.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Real-Life Situations</h1>
              <p className="text-white/80 text-lg mt-1">{REAL_LIFE_TOPICS.length} Scenarios • Practical English</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 रोज़मर्रा की ज़िंदगी में अंग्रेज़ी — Hospital, Bank, Airport, Shopping, Interview — हर situation के लिए!
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search scenarios..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm" />
      </div>

      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl" />
                <div className="p-5">
                  <span className="text-3xl block mb-3">{t.emoji}</span>
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-emerald-300 transition-colors">{t.title}</h3>
                  <p className="text-slate-400 text-xs mb-3">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs">1000 Questions</span>
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
