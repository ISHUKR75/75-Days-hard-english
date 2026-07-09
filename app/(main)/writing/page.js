'use client';
// ============================================================
// WRITING HUB PAGE - All writing skills topics
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PenTool, Search, ChevronRight } from 'lucide-react';

const WRITING_TOPICS = [
  { slug: 'paragraph-writing', title: 'Paragraph Writing', emoji: '📝', desc: 'Structure clear, logical paragraphs' },
  { slug: 'essay-writing', title: 'Essay Writing', emoji: '📄', desc: 'Argumentative, descriptive, narrative essays' },
  { slug: 'formal-letter', title: 'Formal Letter', emoji: '✉️', desc: 'Business and official letter format' },
  { slug: 'informal-letter', title: 'Informal Letter', emoji: '💌', desc: 'Personal and friendly letters' },
  { slug: 'email-writing', title: 'Email Writing', emoji: '📧', desc: 'Professional and casual emails' },
  { slug: 'business-email', title: 'Business Email', emoji: '💼', desc: 'Corporate communication essentials' },
  { slug: 'report-writing', title: 'Report Writing', emoji: '📊', desc: 'Formal report structure and style' },
  { slug: 'story-writing', title: 'Story Writing', emoji: '📖', desc: 'Creative narrative writing' },
  { slug: 'diary-entry', title: 'Diary Entry', emoji: '📓', desc: 'Personal reflective writing' },
  { slug: 'notice-writing', title: 'Notice Writing', emoji: '📋', desc: 'Official notice format' },
  { slug: 'message-writing', title: 'Message Writing', emoji: '💬', desc: 'Concise message composition' },
  { slug: 'resume-writing', title: 'Resume Writing', emoji: '📃', desc: 'Professional resume/CV creation' },
  { slug: 'cover-letter', title: 'Cover Letter', emoji: '📨', desc: 'Job application cover letters' },
  { slug: 'application-writing', title: 'Application Writing', emoji: '📋', desc: 'Official applications' },
  { slug: 'summary-writing', title: 'Summary Writing', emoji: '📌', desc: 'Condensing information effectively' },
  { slug: 'review-writing', title: 'Review Writing', emoji: '⭐', desc: 'Product, book, movie reviews' },
  { slug: 'blog-writing', title: 'Blog Writing', emoji: '🌐', desc: 'Online content creation' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const cardV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function WritingHubPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => WRITING_TOPICS.filter(t => t.title.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PenTool className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Writing Skills</h1>
              <p className="text-white/80 text-lg mt-1">{WRITING_TOPICS.length} Topics • Professional Writing</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl text-lg mt-4">
            🇮🇳 Professional writing सीखो — Essay, Letter, Email, Resume, Report, Blog — सब कुछ एक जगह!
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search writing topics..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
      </div>

      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(t => (
          <motion.div key={t.slug} variants={cardV}>
            <Link href={`/topics/${t.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
                <div className="p-6">
                  <span className="text-4xl block mb-3">{t.emoji}</span>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">{t.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs">1000 Questions</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
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
