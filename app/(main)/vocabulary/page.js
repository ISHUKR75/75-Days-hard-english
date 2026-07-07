'use client';
// Vocabulary Page — Browse and learn vocabulary words
// Filter by topic, CEFR level, category

import { useState } from 'react';
import {
  Search, Filter, BookOpen, Volume2, Star,
  CheckCircle2, RefreshCw, Zap, ArrowRight, Globe,
} from 'lucide-react';

// Sample vocabulary data
const SAMPLE_WORDS = [
  { word: 'Accomplish',  hindi: 'हासिल करना',   ipa: '/əˈkʌmplɪʃ/', meaning: 'To achieve or complete successfully', example: 'She accomplished all her goals.', level: 'B1', category: 'Professional' },
  { word: 'Resilient',   hindi: 'लचीला/मजबूत',  ipa: '/rɪˈzɪliənt/', meaning: 'Able to recover quickly from difficulties', example: 'He remained resilient through hardship.', level: 'B2', category: 'Professional' },
  { word: 'Collaborate', hindi: 'सहयोग करना',   ipa: '/kəˈlæbəreɪt/', meaning: 'To work together on a project', example: 'We collaborate with the team daily.', level: 'B1', category: 'Office' },
  { word: 'Efficient',   hindi: 'कुशल',          ipa: '/ɪˈfɪʃnt/',  meaning: 'Working in a productive way without waste', example: 'Use an efficient system at work.', level: 'A2', category: 'Office' },
  { word: 'Appreciate',  hindi: 'सराहना करना',  ipa: '/əˈpriːʃieɪt/', meaning: 'To recognize the value of something', example: 'I appreciate your help.', level: 'A2', category: 'Daily' },
  { word: 'Pursue',      hindi: 'पीछा करना/हासिल करने की कोशिश', ipa: '/pəˈsjuː/', meaning: 'To follow or chase a goal', example: 'Pursue your dreams with passion.', level: 'B1', category: 'Daily' },
  { word: 'Integrity',   hindi: 'ईमानदारी/सत्यनिष्ठा', ipa: '/ɪnˈteɡrɪti/', meaning: 'The quality of being honest and moral', example: 'He is known for his integrity.', level: 'C1', category: 'Professional' },
  { word: 'Fluent',      hindi: 'प्रवाहमान/धाराप्रवाह', ipa: '/ˈfluːənt/', meaning: 'Able to speak smoothly and naturally', example: 'She speaks fluent English.', level: 'B1', category: 'Language' },
];

const CATEGORIES = ['All', 'Daily', 'Office', 'Professional', 'Language', 'Academic'];
const LEVELS     = ['All', 'A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ============================================================
// Vocabulary Page
// ============================================================
export default function VocabularyPage() {
  const [search,    setSearch]   = useState('');
  const [category,  setCategory] = useState('All');
  const [level,     setLevel]    = useState('All');
  const [flipped,   setFlipped]  = useState(null);
  const [mastered,  setMastered] = useState(new Set());

  const filtered = SAMPLE_WORDS.filter((w) => {
    const matchSearch   = !search || w.word.toLowerCase().includes(search.toLowerCase()) || w.hindi.includes(search);
    const matchCategory = category === 'All' || w.category === category;
    const matchLevel    = level === 'All' || w.level === level;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Globe size={28} className="text-primary-400" /> Vocabulary
        </h1>
        <p className="text-slate-500">500–1000 words per topic — learn with flashcards, IPA, and examples.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '📖', value: '10,000+', label: 'Total Words' },
          { icon: '✅', value: mastered.size, label: 'Mastered' },
          { icon: '🎯', value: '0%', label: 'Today\'s Goal' },
        ].map(({ icon, value, label }) => (
          <div key={label} className="card p-4 text-center">
            <span className="text-2xl block mb-1">{icon}</span>
            <p className="text-xl font-black text-white">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words or Hindi meaning…"
            className="input pl-10 text-sm w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                category === c ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
              }`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all ${
                level === l ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
              }`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Word Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((word) => {
          const isMastered = mastered.has(word.word);
          const isFlipped  = flipped === word.word;
          return (
            <div
              key={word.word}
              onClick={() => setFlipped(isFlipped ? null : word.word)}
              className={`card p-5 cursor-pointer group relative overflow-hidden transition-all hover:border-primary-500/30 ${
                isMastered ? 'border-accent-500/30 bg-accent-500/5' : ''
              }`}
            >
              {/* Front */}
              {!isFlipped ? (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-black text-white mb-0.5">{word.word}</h3>
                      <p className="text-xs text-slate-500">{word.ipa}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`badge text-xs ${word.level === 'C1' || word.level === 'C2' ? 'diff-hard' : word.level.startsWith('B') ? 'diff-medium' : 'diff-easy'}`}>
                        {word.level}
                      </span>
                      <span className="text-xs text-slate-600 bg-white/5 px-2 py-0.5 rounded-md">{word.category}</span>
                    </div>
                  </div>
                  <p className="hindi-text text-base mb-2">{word.hindi}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{word.meaning}</p>
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-white/5 italic">
                    "{word.example}"
                  </p>
                  <p className="text-xs text-primary-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to see full details →
                  </p>
                </div>
              ) : (
                // Back — more details
                <div>
                  <h3 className="text-xl font-black gradient-text mb-4">{word.word}</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-slate-500 text-xs">HINDI</span><p className="hindi-text">{word.hindi}</p></div>
                    <div><span className="text-slate-500 text-xs">MEANING</span><p className="text-slate-300">{word.meaning}</p></div>
                    <div><span className="text-slate-500 text-xs">EXAMPLE</span><p className="example-text">"{word.example}"</p></div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={(e) => { e.stopPropagation(); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs text-slate-400 hover:text-white transition-all">
                        <Volume2 size={12} /> Listen
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMastered((prev) => {
                            const n = new Set(prev);
                            if (n.has(word.word)) n.delete(word.word); else n.add(word.word);
                            return n;
                          });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isMastered ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30' : 'bg-white/5 text-slate-400 border border-white/8 hover:text-white'
                        }`}>
                        <CheckCircle2 size={12} />
                        {isMastered ? 'Mastered!' : 'Mark Mastered'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mastered badge */}
              {isMastered && !isFlipped && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 size={16} className="text-accent-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={32} className="text-slate-600 mb-3" />
          <p className="text-slate-500">No words found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
