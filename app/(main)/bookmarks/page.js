'use client';
// ============================================================
// BOOKMARKS PAGE — Save topics, vocabulary, grammar rules
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Trash2, BookOpen, Globe, Mic, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_BOOKMARKS = [
  { id:1, type:'topic',      title:'Day 4 — Be Verb',               subtitle:'Grammar — A1',    href:'/75-days-challenge/4',  icon:'🔤', color:'from-indigo-500 to-blue-500',   savedAt:'2 days ago' },
  { id:2, type:'grammar',    title:'Modal Verbs Complete Guide',     subtitle:'A2 Grammar',      href:'/grammar-reference',    icon:'🔑', color:'from-violet-500 to-purple-500', savedAt:'3 days ago' },
  { id:3, type:'vocabulary', title:'Professional Office Words',      subtitle:'50 key words',    href:'/vocabulary',           icon:'💼', color:'from-emerald-500 to-teal-500',  savedAt:'4 days ago' },
  { id:4, type:'speaking',   title:'Job Interview Phrases',          subtitle:'B2 Speaking',     href:'/speaking',             icon:'🎤', color:'from-pink-500 to-rose-500',     savedAt:'5 days ago' },
  { id:5, type:'topic',      title:'Day 17 — Should',               subtitle:'Grammar — A2',    href:'/75-days-challenge/17', icon:'💡', color:'from-amber-500 to-orange-500',  savedAt:'1 week ago' },
  { id:6, type:'writing',    title:'Formal Email Templates',         subtitle:'B1 Writing',      href:'/writing',              icon:'📧', color:'from-sky-500 to-cyan-500',      savedAt:'1 week ago' },
];

const TYPE_ICONS = { topic: BookOpen, grammar: BookOpen, vocabulary: Globe, speaking: Mic };
const TYPE_COLORS = {
  topic:      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  grammar:    'bg-violet-500/10 text-violet-400 border-violet-500/20',
  vocabulary: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  speaking:   'bg-pink-500/10 text-pink-400 border-pink-500/20',
  writing:    'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('all');

  const types = ['all', 'topic', 'grammar', 'vocabulary', 'speaking', 'writing'];
  const filtered = bookmarks.filter(b => {
    const matchFilter = filter === 'all' || b.type === filter;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const remove = (id) => setBookmarks(b => b.filter(bk => bk.id !== id));

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-white mb-1">❤️ Bookmarks</h1>
        <p className="text-slate-400">{bookmarks.length} saved items — topics, vocabulary, grammar</p>
      </motion.div>

      {/* Search + Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search bookmarks…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 text-sm" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={15}/></button>}
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border capitalize transition-all ${
                filter === t ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks */}
      {filtered.length > 0 ? (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="visible">
          {filtered.map((bk) => (
            <motion.div key={bk.id}
              variants={{ hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1 } }}
              layout className="card p-5 group relative overflow-hidden hover:border-white/20 transition-all">
              <div className={`absolute inset-0 bg-gradient-to-br ${bk.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{bk.icon}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${TYPE_COLORS[bk.type]}`}>{bk.type}</span>
                    <button onClick={() => remove(bk.id)}
                      className="p-1 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1 line-clamp-2">{bk.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{bk.subtitle} · Saved {bk.savedAt}</p>
                <Link href={bk.href}
                  className="flex items-center gap-1 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  Open <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">❤️</div>
          <p className="text-slate-400 font-semibold mb-2">{search || filter !== 'all' ? 'No matching bookmarks' : 'No bookmarks yet'}</p>
          <p className="text-slate-600 text-sm mb-5">
            {search || filter !== 'all' ? 'Try different search' : 'Save topics and vocabulary while learning'}
          </p>
          {!search && filter === 'all' && (
            <Link href="/75-days-challenge" className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5">
              Start Learning <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
