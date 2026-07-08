'use client';
// ============================================================
// NOTES PAGE — Personal study notes organizer
// Features: Create/edit/delete notes, tags, search, pin,
// rich content, topic-linked notes, markdown-lite support
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Search, Pin, Trash2, Edit2, Save,
  X, Tag, BookOpen, Clock, Star, Filter, ChevronDown,
  PenTool, Zap, Brain, CheckCircle2, Eye,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const NOTE_COLORS = [
  { id: 'indigo', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25', dot: 'bg-indigo-400' },
  { id: 'violet', bg: 'bg-violet-500/10', border: 'border-violet-500/25', dot: 'bg-violet-400' },
  { id: 'amber',  bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  dot: 'bg-amber-400'  },
  { id: 'emerald',bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',dot: 'bg-emerald-400'},
  { id: 'rose',   bg: 'bg-rose-500/10',   border: 'border-rose-500/25',   dot: 'bg-rose-400'   },
  { id: 'cyan',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/25',   dot: 'bg-cyan-400'   },
];

const NOTE_TAGS = ['Grammar', 'Vocabulary', 'Speaking', 'Writing', 'Pronunciation', 'Idioms', 'Business', 'General'];

const DEFAULT_NOTES = [
  {
    id: 1,
    title: 'Tense Formula Quick Reference',
    content: `PRESENT TENSES:
• Simple Present: I work / She works
• Present Continuous: I am working
• Present Perfect: I have worked
• Present Perfect Continuous: I have been working

PAST TENSES:
• Simple Past: I worked
• Past Continuous: I was working
• Past Perfect: I had worked

FUTURE:
• Simple Future: I will work
• Future Continuous: I will be working`,
    tags: ['Grammar'],
    color: 'indigo',
    pinned: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Modal Verbs — Key Uses',
    content: `CAN = ability (present)
→ I can speak English.

COULD = ability (past) or polite request
→ Could you help me, please?

SHOULD = advice
→ You should practice daily.

MUST = strong obligation
→ You must submit the report.

WOULD = conditional / polite
→ I would like some water.

MAY / MIGHT = possibility
→ It may rain tomorrow.`,
    tags: ['Grammar'],
    color: 'violet',
    pinned: true,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
  },
  {
    id: 3,
    title: 'Power Words for Emails',
    content: `OPENING LINES:
• I hope this email finds you well.
• I am writing to inform you about...
• Further to our conversation...

MAKING REQUESTS:
• Could you please...
• I would be grateful if...
• It would be great if you could...

CLOSING LINES:
• Please let me know if you have any questions.
• Looking forward to your response.
• I appreciate your help with this matter.

GREETINGS:
• Dear Sir/Madam (very formal)
• Dear Mr./Ms. [Name] (formal)
• Hi [Name] (informal)`,
    tags: ['Writing', 'Business'],
    color: 'emerald',
    pinned: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
  {
    id: 4,
    title: 'Common Mistakes to Avoid',
    content: `❌ "I am agree" → ✅ "I agree"
❌ "She don't know" → ✅ "She doesn't know"
❌ "I did not went" → ✅ "I did not go"
❌ "Myself Rahul" → ✅ "I am Rahul"
❌ "What is your good name?" → ✅ "What is your name?"
❌ "Please do the needful" → ✅ "Please take necessary action"
❌ "I am having headache" → ✅ "I have a headache"
❌ "Today morning" → ✅ "This morning"`,
    tags: ['Grammar'],
    color: 'rose',
    pinned: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
  {
    id: 5,
    title: 'Useful Idioms — Office',
    content: `1. "Hit the ground running" = शुरू से ही पूरे जोश से काम करना
   → "She hit the ground running on her first day."

2. "Think outside the box" = नए तरीके से सोचना
   → "We need to think outside the box."

3. "Touch base" = संपर्क करना / update लेना
   → "Let's touch base after the meeting."

4. "Back to the drawing board" = फिर से शुरू करना
   → "The plan failed; back to the drawing board."

5. "Keep someone in the loop" = किसी को जानकारी में रखना
   → "Keep me in the loop on this project."`,
    tags: ['Idioms', 'Business'],
    color: 'amber',
    pinned: false,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
  },
];

// ── Note Editor ───────────────────────────────────────────────
function NoteEditor({ note, onSave, onClose }) {
  const [title,   setTitle]   = useState(note?.title   || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags,    setTags]    = useState(note?.tags    || []);
  const [color,   setColor]   = useState(note?.color   || 'indigo');

  const isNew = !note?.id;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id:        note?.id   || Date.now(),
      title,
      content,
      tags,
      color,
      pinned:    note?.pinned    || false,
      createdAt: note?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const toggleTag = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h3 className="font-bold text-white">{isNew ? 'New Note' : 'Edit Note'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Title */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Note title…"
            className="w-full text-xl font-bold bg-transparent border-none text-white placeholder:text-slate-600 focus:outline-none"
          />

          {/* Tags */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {NOTE_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${tags.includes(tag) ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/5 text-slate-500 border-white/8 hover:text-white'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Color</p>
            <div className="flex gap-2">
              {NOTE_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-6 h-6 rounded-full ${c.dot} transition-all ${color === c.id ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-900 scale-125' : 'hover:scale-110'}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your note here… (plain text, bullet points work great)"
            className="w-full h-48 bg-white/4 border border-white/8 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/40 resize-none leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-white/8">
          <p className="text-xs text-slate-600">{content.length} characters</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-xl transition-all">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="btn-primary text-sm px-5 py-2 disabled:opacity-40 flex items-center gap-2"
            >
              <Save size={13} /> {isNew ? 'Create Note' : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Note Card ─────────────────────────────────────────────────
function NoteCard({ note, onEdit, onDelete, onPin }) {
  const colorMeta = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`rounded-2xl border p-5 relative group overflow-hidden ${colorMeta.bg} ${colorMeta.border}`}
    >
      {/* Pin indicator */}
      {note.pinned && (
        <div className="absolute top-3 right-3">
          <Pin size={14} className="text-primary-400" fill="currentColor" />
        </div>
      )}

      {/* Title */}
      <h3 className={`font-bold text-white mb-2 ${note.pinned ? 'pr-6' : ''} line-clamp-1`}>{note.title}</h3>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-slate-400">{tag}</span>
          ))}
        </div>
      )}

      {/* Content preview */}
      <p className={`text-xs text-slate-400 leading-relaxed whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
        {note.content}
      </p>

      {note.content.length > 150 && (
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary-400 hover:text-primary-300 mt-1.5 transition-colors">
          {expanded ? '↑ Show less' : '↓ Show more'}
        </button>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/8">
        <span className="text-[10px] text-slate-600">{note.updatedAt}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onPin(note.id)} className={`p-1.5 rounded-lg transition-colors ${note.pinned ? 'text-primary-400 bg-primary-500/15' : 'text-slate-500 hover:text-white hover:bg-white/10'}`}>
            <Pin size={13} />
          </button>
          <button onClick={() => onEdit(note)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
            <Edit2 size={13} />
          </button>
          <button onClick={() => onDelete(note.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function NotesPage() {
  const [notes,      setNotes]      = useState(DEFAULT_NOTES);
  const [search,     setSearch]     = useState('');
  const [tagFilter,  setTagFilter]  = useState('All');
  const [editing,    setEditing]    = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const filtered = useMemo(() => {
    const pinned    = notes.filter(n => n.pinned);
    const unpinned  = notes.filter(n => !n.pinned);
    const sorted    = [...pinned, ...unpinned];
    return sorted.filter(n => {
      const matchTag    = tagFilter === 'All' || n.tags.includes(tagFilter);
      const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [notes, search, tagFilter]);

  const handleSave = (note) => {
    setNotes(prev => editing?.id ? prev.map(n => n.id === note.id ? note : n) : [note, ...prev]);
    setShowEditor(false);
    setEditing(null);
  };

  const handleEdit = (note) => {
    setEditing(note);
    setShowEditor(true);
  };

  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handlePin = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const openNew = () => {
    setEditing(null);
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">My Notes</h1>
              <p className="text-slate-400 text-sm">{notes.length} notes · {notes.filter(n => n.pinned).length} pinned</p>
            </div>
          </div>
          <motion.button
            onClick={openNew}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
          >
            <Plus size={16} /> New Note
          </motion.button>
        </div>
      </motion.div>

      {/* ── Search + Filter ──────────────────────────────── */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 text-sm" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...NOTE_TAGS].map(tag => (
            <button key={tag} onClick={() => setTagFilter(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${tagFilter === tag ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Notes Grid ──────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        <AnimatePresence>
          {filtered.map(note => (
            <div key={note.id} className="break-inside-avoid mb-4">
              <NoteCard note={note} onEdit={handleEdit} onDelete={handleDelete} onPin={handlePin} />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-slate-400 font-semibold mb-2">{search || tagFilter !== 'All' ? 'No matching notes' : 'No notes yet'}</p>
          <p className="text-slate-600 text-sm mb-6">
            {search || tagFilter !== 'All' ? 'Try a different search or filter' : 'Create your first note to get started'}
          </p>
          {!search && tagFilter === 'All' && (
            <button onClick={openNew} className="btn-primary flex items-center gap-2 mx-auto text-sm">
              <Plus size={14} /> Create First Note
            </button>
          )}
        </div>
      )}

      {/* ── Editor Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {showEditor && (
          <NoteEditor
            note={editing}
            onSave={handleSave}
            onClose={() => { setShowEditor(false); setEditing(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
