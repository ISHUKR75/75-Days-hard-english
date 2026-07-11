// ============================================================
// EssaySection.js - Model essay display + write your own section
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { FileText, Languages, Save, CheckCircle, PenLine, Target } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity }} />
  );
}

const ESSAY_DRAFT_KEY = 'essay_draft_';
const MIN_WORDS = 150;
const MAX_WORDS = 200;

export default function EssaySection({ data, dayNum }) {
  const [showHindi, setShowHindi] = useState({});
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(false);

  const essay = data?.essays?.essay || {};
  const paragraphs = essay.paragraphs || [];

  useEffect(() => {
    const stored = localStorage.getItem(`${ESSAY_DRAFT_KEY}${dayNum}`);
    if (stored) setDraft(stored);
  }, [dayNum]);

  const wordCount = (text) => text?.trim() ? text.trim().split(/\s+/).length : 0;
  const wc = wordCount(draft);
  const wcColor = wc >= MIN_WORDS && wc <= MAX_WORDS ? 'text-emerald-400' : wc > MAX_WORDS ? 'text-orange-400' : 'text-gray-400';

  const handleSave = () => {
    localStorage.setItem(`${ESSAY_DRAFT_KEY}${dayNum}`, draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-amber-500 top-0 -left-10" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 right-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <FileText className="w-6 h-6 text-amber-400" />
            <h1 className="text-white font-black text-2xl">Model Essay 📝</h1>
          </div>
          <p className="text-gray-400 text-sm">Study the model essay, then write your own version!</p>
        </motion.div>

        {paragraphs.length === 0 && (
          <div className="text-center text-gray-400 py-12">No essay available today 📄</div>
        )}

        {/* Model Essay Paragraphs */}
        {paragraphs.map((para, idx) => (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
            {/* Title + toggle */}
            <div className="flex items-center justify-between">
              {para.title && (
                <h3 className="text-violet-300 font-bold text-sm">{para.title}</h3>
              )}
              {para.hindiTranslation && (
                <button onClick={() => setShowHindi(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/15 text-gray-400 hover:text-white text-xs font-semibold transition-colors">
                  <Languages className="w-3.5 h-3.5" />
                  {showHindi[idx] ? 'English' : 'हिंदी'}
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.p key={showHindi[idx] ? 'hindi' : 'en'}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className={cn('text-sm leading-8', showHindi[idx] ? 'text-orange-200' : 'text-gray-200')}>
                {showHindi[idx] ? para.hindiTranslation : para.content}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Write Your Own */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <PenLine className="w-5 h-5 text-violet-400" />
            <h2 className="text-white font-bold text-lg">Write Your Own Essay ✍️</h2>
          </div>

          {/* Word count target */}
          <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2">
            <Target className="w-4 h-4 text-violet-400" />
            <p className="text-violet-300 text-xs font-medium">Target: {MIN_WORDS}–{MAX_WORDS} words on the same topic</p>
          </div>

          <textarea
            value={draft}
            onChange={e => { setDraft(e.target.value); setSaved(false); }}
            placeholder="Start writing your essay here... Take inspiration from the model above but use your own words! 📝"
            rows={8}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-600 resize-none outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 leading-relaxed"
          />

          {/* Word count + save */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-bold', wcColor)}>{wc} words</span>
              {wc >= MIN_WORDS && wc <= MAX_WORDS && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              <span className="text-gray-600 text-xs">/ target {MIN_WORDS}–{MAX_WORDS}</span>
            </div>
            <button onClick={handleSave}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
                saved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/20 text-gray-400 hover:text-white')}>
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Draft</>}
            </button>
          </div>

          {/* Word count progress bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={cn('h-full rounded-full', wc > MAX_WORDS ? 'bg-orange-500' : 'bg-gradient-to-r from-violet-500 to-emerald-500')}
              animate={{ width: `${Math.min((wc / MAX_WORDS) * 100, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
