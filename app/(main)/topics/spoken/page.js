'use client';
// ============================================================
// SPOKEN ENGLISH HUB PAGE
// Lists ALL spoken English topics in a premium animated grid
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Search, ChevronRight, Star, MessageSquare } from 'lucide-react';

const SPOKEN_TOPICS = [
  { slug: 'greetings', title: 'Greetings', emoji: '👋', level: 'A1', group: 'Basics' },
  { slug: 'self-introduction', title: 'Self Introduction', emoji: '🙋', level: 'A1', group: 'Basics' },
  { slug: 'daily-conversation', title: 'Daily Conversation', emoji: '💬', level: 'A1', group: 'Basics' },
  { slug: 'small-talk', title: 'Small Talk', emoji: '🗣️', level: 'A2', group: 'Basics' },
  { slug: 'asking-questions', title: 'Asking Questions', emoji: '❓', level: 'A1', group: 'Basics' },
  { slug: 'answering-questions', title: 'Answering Questions', emoji: '💡', level: 'A1', group: 'Basics' },
  { slug: 'giving-opinions', title: 'Giving Opinions', emoji: '🤔', level: 'A2', group: 'Communication' },
  { slug: 'agreeing-disagreeing', title: 'Agreeing & Disagreeing', emoji: '🤝', level: 'A2', group: 'Communication' },
  { slug: 'suggestions', title: 'Suggestions', emoji: '💡', level: 'A2', group: 'Communication' },
  { slug: 'advice', title: 'Advice', emoji: '🎯', level: 'A2', group: 'Communication' },
  { slug: 'requests', title: 'Requests', emoji: '🙏', level: 'A2', group: 'Communication' },
  { slug: 'permission', title: 'Permission', emoji: '🔑', level: 'A2', group: 'Communication' },
  { slug: 'invitations', title: 'Invitations', emoji: '💌', level: 'A2', group: 'Social' },
  { slug: 'compliments', title: 'Compliments', emoji: '⭐', level: 'A2', group: 'Social' },
  { slug: 'apologies', title: 'Apologies', emoji: '😔', level: 'A2', group: 'Social' },
  { slug: 'complaints', title: 'Complaints', emoji: '😤', level: 'B1', group: 'Social' },
  { slug: 'thanking', title: 'Thanking', emoji: '🙏', level: 'A1', group: 'Social' },
  { slug: 'congratulations', title: 'Congratulations', emoji: '🎉', level: 'A1', group: 'Social' },
  { slug: 'telephone-conversation', title: 'Telephone Conversation', emoji: '📞', level: 'B1', group: 'Professional' },
  { slug: 'group-discussion', title: 'Group Discussion', emoji: '👥', level: 'B1', group: 'Professional' },
  { slug: 'debate', title: 'Debate', emoji: '⚔️', level: 'B2', group: 'Professional' },
  { slug: 'storytelling', title: 'Storytelling', emoji: '📖', level: 'B1', group: 'Professional' },
  { slug: 'public-speaking', title: 'Public Speaking', emoji: '🎤', level: 'B2', group: 'Professional' },
  { slug: 'presentation-skills', title: 'Presentation Skills', emoji: '📊', level: 'B2', group: 'Professional' },
  { slug: 'interview-english', title: 'Interview English', emoji: '💼', level: 'B1', group: 'Professional' },
  { slug: 'meeting-english', title: 'Meeting English', emoji: '🏢', level: 'B1', group: 'Professional' },
  { slug: 'confidence-building', title: 'Confidence Building', emoji: '💪', level: 'A2', group: 'Skills' },
  { slug: 'classroom-english', title: 'Classroom English', emoji: '🏫', level: 'A1', group: 'Situations' },
  { slug: 'home-conversation', title: 'Home Conversation', emoji: '🏠', level: 'A1', group: 'Situations' },
  { slug: 'office-conversation', title: 'Office Conversation', emoji: '🏢', level: 'B1', group: 'Situations' },
  { slug: 'college-conversation', title: 'College Conversation', emoji: '🎓', level: 'A2', group: 'Situations' },
  { slug: 'picture-description', title: 'Picture Description', emoji: '🖼️', level: 'B1', group: 'Skills' },
  { slug: 'opinion-giving', title: 'Opinion Giving', emoji: '💭', level: 'A2', group: 'Skills' },
  { slug: 'giving-suggestions', title: 'Giving Suggestions', emoji: '🎯', level: 'A2', group: 'Skills' },
  { slug: 'giving-advice', title: 'Giving Advice', emoji: '📝', level: 'A2', group: 'Skills' },
  { slug: 'english-thinking-practice', title: 'English Thinking Practice', emoji: '🧠', level: 'B1', group: 'Skills' },
];

const GROUPS = ['All', ...new Set(SPOKEN_TOPICS.map(t => t.group))];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function SpokenHubPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  const filtered = useMemo(() => {
    return SPOKEN_TOPICS.filter(t => {
      const s = t.title.toLowerCase().includes(search.toLowerCase());
      const g = activeGroup === 'All' || t.group === activeGroup;
      return s && g;
    });
  }, [search, activeGroup]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-orange-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Mic className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Spoken English</h1>
              <p className="text-white/80 text-lg mt-1">{SPOKEN_TOPICS.length} Topics • Conversations • Fluency</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 अंग्रेज़ी बोलने का अभ्यास करो। Daily Conversation से लेकर Interview English तक, हर situation के लिए तैयार रहो!
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search spoken topics..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-sm" />
      </div>

      {/* Group Tabs */}
      <div className="flex flex-wrap gap-2">
        {GROUPS.map(group => (
          <button key={group} onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeGroup === group ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}>{group}</button>
        ))}
      </div>

      {/* Grid */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(topic => (
          <motion.div key={topic.slug} variants={cardV}>
            <Link href={`/topics/spoken/${topic.slug}`} className="group block h-full">
              <div className="h-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 to-rose-500" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{topic.emoji}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      topic.level === 'A1' ? 'bg-green-500/20 text-green-400' :
                      topic.level === 'A2' ? 'bg-blue-500/20 text-blue-400' :
                      topic.level === 'B1' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{topic.level}</span>
                  </div>
                  <h3 className="text-white font-bold text-base group-hover:text-rose-300 transition-colors">{topic.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 mb-3">{topic.group}</p>
                  <div className="flex items-center justify-between">
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
