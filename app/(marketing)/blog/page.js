'use client';
// Blog Page — Learning tips, grammar guides, student stories

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Search, Tag, TrendingUp } from 'lucide-react';

const CATEGORIES = ['All', 'Grammar', 'Vocabulary', 'Speaking', 'Tips & Tricks', 'Success Stories', 'Career'];

const POSTS = [
  {
    slug: 'top-10-english-grammar-mistakes',
    category: 'Grammar',
    emoji: '📝',
    title: 'Top 10 Grammar Mistakes Hindi Speakers Make (And How to Fix Them)',
    excerpt: 'Hindi background se aane wale students yeh 10 mistakes sabse zyada karte hain. Ek ek explain kar dete hain with corrections.',
    author: 'Priya Verma',
    date: 'July 5, 2026',
    readTime: '8 min',
    featured: true,
    tags: ['Grammar', 'Mistakes', 'Beginner'],
    color: 'from-indigo-500 to-blue-600',
  },
  {
    slug: 'how-i-learned-english-in-75-days',
    category: 'Success Stories',
    emoji: '🏆',
    title: 'How I Learned English in 75 Days — From Zero to Office Meetings',
    excerpt: 'Rahul Kumar ki story: IT company join karne ke baad English mein struggle kiya, phir 75 Days Hard English se transform hua.',
    author: 'Rahul Kumar',
    date: 'July 2, 2026',
    readTime: '5 min',
    featured: false,
    tags: ['Success', 'Motivation', 'Real Story'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'modal-verbs-complete-guide',
    category: 'Grammar',
    emoji: '🔑',
    title: 'Modal Verbs Complete Guide — Can, Should, Must, May, Might',
    excerpt: 'Hindi speakers ke liye Modal Verbs confusing hote hain. Is guide mein sab kuch clear ho jaayega examples ke saath.',
    author: 'Editorial Team',
    date: 'June 28, 2026',
    readTime: '12 min',
    featured: false,
    tags: ['Grammar', 'Modals', 'Intermediate'],
    color: 'from-purple-500 to-pink-600',
  },
  {
    slug: '500-daily-use-english-words',
    category: 'Vocabulary',
    emoji: '📖',
    title: '500 Daily Use English Words Every Hindi Speaker Should Know',
    excerpt: 'In 500 words ko yaad kar lo — aur aapki daily conversations 80% improve ho jaayengi. Hindi meaning ke saath complete list.',
    author: 'Editorial Team',
    date: 'June 25, 2026',
    readTime: '15 min',
    featured: false,
    tags: ['Vocabulary', 'Daily Use', 'Practical'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'job-interview-english-preparation',
    category: 'Career',
    emoji: '💼',
    title: 'Job Interview English — 50 Questions & Perfect Answers',
    excerpt: 'HR interviews mein yeh 50 questions sabse common hain. In sab ke fluent aur professional answers prepare karo.',
    author: 'Amit Singh',
    date: 'June 20, 2026',
    readTime: '10 min',
    featured: false,
    tags: ['Interview', 'Career', 'Professional'],
    color: 'from-rose-500 to-red-600',
  },
  {
    slug: 'how-to-improve-pronunciation',
    category: 'Speaking',
    emoji: '🎤',
    title: 'How to Improve English Pronunciation — 7 Daily Exercises',
    excerpt: 'Pronunciation improve karna mushkil nahi hai agar sahi exercises karo. Yeh 7 exercises daily 10 minute mein karo.',
    author: 'Priya Verma',
    date: 'June 15, 2026',
    readTime: '7 min',
    featured: false,
    tags: ['Pronunciation', 'Speaking', 'Practice'],
    color: 'from-cyan-500 to-sky-600',
  },
];

function PostCard({ post, featured = false }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl border border-white/5 bg-surface-800/60 overflow-hidden group ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* Color header */}
      <div className={`h-2 bg-gradient-to-r ${post.color}`} />

      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        <div className="flex items-start justify-between mb-3 gap-3">
          <span className="text-2xl">{post.emoji}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-400 whitespace-nowrap">
            {post.category}
          </span>
        </div>

        <h3 className={`font-black text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug ${featured ? 'text-xl' : 'text-base'}`}>
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/8 text-indigo-400 border border-indigo-500/15">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
          <Link href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  const filtered = POSTS.filter(p => {
    const matchesCat = category === 'All' || p.category === category;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered.find(p => p.featured);
  const rest     = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-24 pb-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-5xl mb-4">📰</div>
            <h1 className="text-4xl font-black mb-3">Learning Blog</h1>
            <p className="text-slate-400 mb-6">Grammar guides, vocabulary tips, student stories aur career advice</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Blog content ──────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATEGORIES.map(cat => (
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

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No articles found for "{search}"</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured && <PostCard post={featured} featured />}
              {rest.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
