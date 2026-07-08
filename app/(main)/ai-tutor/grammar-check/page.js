'use client';
// Grammar Check Page — Color-coded grammar analysis with 50 common mistakes

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, AlertTriangle, RefreshCw,
  ChevronDown, ChevronUp, Lightbulb, BookOpen, Zap, Star,
  ArrowRight, Copy, Trash2,
} from 'lucide-react';

// ── 50 Common Grammar Mistakes ───────────────────────────────────
const GRAMMAR_RULES = [
  { id: 1,  wrong: 'I am going to market yesterday.',        correct: 'I went to the market yesterday.',           error: 'Wrong tense',           category: 'Tenses',      hindi: 'Past action के लिए "went" use करें, "am going" नहीं।' },
  { id: 2,  wrong: 'She don\'t like coffee.',                correct: 'She doesn\'t like coffee.',                  error: 'Subject-verb agreement', category: 'Agreement',   hindi: 'He/She/It के साथ "doesn\'t" use होता है, "don\'t" नहीं।' },
  { id: 3,  wrong: 'I have visited Paris last year.',        correct: 'I visited Paris last year.',                error: 'Present perfect misuse', category: 'Tenses',      hindi: 'Specific past time (last year) के साथ Simple Past use करें।' },
  { id: 4,  wrong: 'He suggested me to go.',                 correct: 'He suggested that I should go.',            error: 'Wrong verb pattern',     category: 'Verbs',       hindi: '"Suggest" के साथ "me" नहीं आता। "suggest that + subject" use करें।' },
  { id: 5,  wrong: 'I am knowing the answer.',               correct: 'I know the answer.',                        error: 'Stative verb misuse',     category: 'Verbs',       hindi: '"Know, like, love, understand" continuous tense में नहीं होते।' },
  { id: 6,  wrong: 'Please do the needful.',                 correct: 'Please take the necessary action.',         error: 'Indian English error',   category: 'Vocabulary',  hindi: '"Do the needful" Indian English है — standard English में avoid करें।' },
  { id: 7,  wrong: 'I am having a car.',                     correct: 'I have a car.',                             error: 'Stative verb misuse',     category: 'Verbs',       hindi: '"Have" (possession) continuous में नहीं होता।' },
  { id: 8,  wrong: 'We discussed about the project.',        correct: 'We discussed the project.',                 error: 'Extra preposition',       category: 'Prepositions', hindi: '"Discuss" के बाद "about" नहीं लगाते।' },
  { id: 9,  wrong: 'She is more better than him.',           correct: 'She is better than him.',                   error: 'Double comparative',      category: 'Adjectives',  hindi: '"More better" गलत है — "better" already comparative है।' },
  { id: 10, wrong: 'I told to him to leave.',                correct: 'I told him to leave.',                      error: 'Extra preposition',       category: 'Verbs',       hindi: '"Tell" के बाद directly object आता है, "to" नहीं।' },
  { id: 11, wrong: 'They reached at the station.',           correct: 'They reached the station.',                 error: 'Extra preposition',       category: 'Prepositions', hindi: '"Reach" के साथ "at" नहीं लगता।' },
  { id: 12, wrong: 'I want that you help me.',               correct: 'I want you to help me.',                    error: 'Wrong sentence structure', category: 'Structure',  hindi: '"Want" + object + infinitive structure use करें।' },
  { id: 13, wrong: 'The news are shocking.',                 correct: 'The news is shocking.',                     error: 'Uncountable noun',        category: 'Agreement',   hindi: '"News" uncountable noun है — "is" use होगा।' },
  { id: 14, wrong: 'He is elder than me.',                   correct: 'He is older than me.',                      error: 'Wrong comparative',       category: 'Adjectives',  hindi: '"Elder" only family members के लिए — general comparison में "older" use करें।' },
  { id: 15, wrong: 'I am working since 5 years.',            correct: 'I have been working for 5 years.',          error: 'Tense + preposition',     category: 'Tenses',      hindi: 'Duration के साथ "for" और Present Perfect Continuous use करें।' },
  { id: 16, wrong: 'He could not able to come.',             correct: 'He was not able to come.',                  error: 'Modal double use',        category: 'Modals',      hindi: '"Could not" और "not able to" दोनों same meaning — एक ही use करें।' },
  { id: 17, wrong: 'Please revert back to me.',              correct: 'Please revert to me.',                      error: 'Redundancy',              category: 'Vocabulary',  hindi: '"Revert" means to return — "back" redundant है।' },
  { id: 18, wrong: 'I did a mistake.',                       correct: 'I made a mistake.',                         error: 'Wrong collocation',       category: 'Vocabulary',  hindi: '"Make a mistake" correct collocation है, "do a mistake" नहीं।' },
  { id: 19, wrong: 'She gave exam yesterday.',               correct: 'She took an exam yesterday.',               error: 'Wrong verb',              category: 'Verbs',       hindi: '"Take an exam" correct है — "give" यहाँ wrong है।' },
  { id: 20, wrong: 'I am disagree with you.',                correct: 'I disagree with you.',                      error: 'Wrong verb structure',    category: 'Verbs',       hindi: '"Disagree" verb है, adjective नहीं — "am disagree" गलत है।' },
  { id: 21, wrong: 'Let\'s discuss about this later.',       correct: 'Let\'s discuss this later.',                error: 'Extra preposition',       category: 'Prepositions', hindi: '"Discuss" के साथ "about" नहीं लगाते।' },
  { id: 22, wrong: 'He married with her last year.',         correct: 'He married her last year.',                 error: 'Extra preposition',       category: 'Prepositions', hindi: '"Marry" के साथ "with" नहीं आता।' },
  { id: 23, wrong: 'The police are came.',                   correct: 'The police have come.',                     error: 'Wrong auxiliary',         category: 'Tenses',      hindi: 'Perfect tense में "have/has" use होता है, "are" नहीं।' },
  { id: 24, wrong: 'I am having headache.',                  correct: 'I have a headache.',                        error: 'Stative + article',       category: 'Articles',    hindi: '"Headache" के साथ article "a" जरूरी है।' },
  { id: 25, wrong: 'He is more intelligent than me.',        correct: 'He is more intelligent than I am.',         error: 'Pronoun case',            category: 'Pronouns',    hindi: 'Comparison में "than I am" more formal और correct है।' },
  { id: 26, wrong: 'I will be there till 5 PM.',             correct: 'I will be there until 5 PM.',               error: 'Word choice',             category: 'Vocabulary',  hindi: '"Until" more standard है "till" से formal writing में।' },
  { id: 27, wrong: 'Can you please do it?',                  correct: 'Could you please do it?',                   error: 'Politeness level',        category: 'Modals',      hindi: '"Could" more polite है "can" से formal requests में।' },
  { id: 28, wrong: 'My cousin brother is here.',             correct: 'My cousin is here.',                        error: 'Indian English error',   category: 'Vocabulary',  hindi: '"Cousin" itself means male or female cousin — "brother/sister" extra है।' },
  { id: 29, wrong: 'I have lost my pen since morning.',      correct: 'I have had a lost pen since morning.',      error: 'Tense confusion',         category: 'Tenses',      hindi: 'State that started in past and continues: use Present Perfect.' },
  { id: 30, wrong: 'She explained me the problem.',          correct: 'She explained the problem to me.',          error: 'Wrong verb pattern',      category: 'Verbs',       hindi: '"Explain" के साथ indirect object directly नहीं आता — "to me" use करें।' },
  { id: 31, wrong: 'I am not understanding this.',           correct: 'I do not understand this.',                 error: 'Stative verb misuse',     category: 'Verbs',       hindi: '"Understand" stative verb है — continuous form में नहीं use होता।' },
  { id: 32, wrong: 'He suggested me a good book.',           correct: 'He recommended a good book to me.',         error: 'Wrong verb choice',       category: 'Verbs',       hindi: '"Suggest" के साथ direct object नहीं आता — "recommend" better है।' },
  { id: 33, wrong: 'The informations are incorrect.',        correct: 'The information is incorrect.',             error: 'Uncountable noun',        category: 'Nouns',       hindi: '"Information" uncountable noun है — plural नहीं बनता।' },
  { id: 34, wrong: 'I am too much tired.',                   correct: 'I am very tired.',                          error: 'Wrong intensifier',       category: 'Adverbs',     hindi: '"Too much" quantity के लिए है — degree/adjective के लिए "very" use करें।' },
  { id: 35, wrong: 'She is having beautiful eyes.',          correct: 'She has beautiful eyes.',                   error: 'Stative verb misuse',     category: 'Verbs',       hindi: '"Have" (description/possession) continuous form में नहीं होता।' },
  { id: 36, wrong: 'I was not knowing about it.',            correct: 'I did not know about it.',                  error: 'Stative verb misuse',     category: 'Verbs',       hindi: '"Know" stative verb है — Simple Past use करें।' },
  { id: 37, wrong: 'Both the brothers are tall.',            correct: 'Both brothers are tall.',                   error: 'Extra article',           category: 'Articles',    hindi: '"Both" के बाद "the" optional है but usually omitted।' },
  { id: 38, wrong: 'He is more taller than her.',            correct: 'He is taller than her.',                    error: 'Double comparative',      category: 'Adjectives',  hindi: '"Taller" already comparative — "more" extra है।' },
  { id: 39, wrong: 'Please send me the details on mail.',    correct: 'Please send me the details by email.',      error: 'Wrong preposition',       category: 'Prepositions', hindi: 'Communication medium के लिए "by" use होता है।' },
  { id: 40, wrong: 'I need to do some works.',               correct: 'I need to do some work.',                   error: 'Uncountable noun',        category: 'Nouns',       hindi: '"Work" (general) uncountable है — "works" only for creative works।' },
  { id: 41, wrong: 'Today morning I had tea.',               correct: 'This morning I had tea.',                   error: 'Indian English error',   category: 'Vocabulary',  hindi: '"Today morning" Indian English है — "this morning" correct है।' },
  { id: 42, wrong: 'He asked that what is my name.',         correct: 'He asked what my name was.',                error: 'Reported speech error',   category: 'Structure',   hindi: 'Reported speech में tense back-shift होता है।' },
  { id: 43, wrong: 'I have a doubt.',                        correct: 'I have a question.',                        error: 'Indian English error',   category: 'Vocabulary',  hindi: 'Academic "question" को "doubt" कहना Indian English है।' },
  { id: 44, wrong: 'She is much more better.',               correct: 'She is much better.',                       error: 'Triple comparative',      category: 'Adjectives',  hindi: '"Better" comparative form है — "more" redundant है।' },
  { id: 45, wrong: 'I will come there by 6 in the evening.', correct: 'I will be there by 6 in the evening.',    error: 'Wrong verb',              category: 'Verbs',       hindi: '"Be there" natural expression है destination के लिए।' },
  { id: 46, wrong: 'He denied that he has done it.',         correct: 'He denied that he had done it.',           error: 'Tense in reported speech', category: 'Tenses',    hindi: 'Past reporting verb के साथ past perfect use होता है।' },
  { id: 47, wrong: 'We are waiting since 2 hours.',          correct: 'We have been waiting for 2 hours.',        error: 'Tense + preposition',     category: 'Tenses',      hindi: 'Duration of action: "for" + Present Perfect Continuous।' },
  { id: 48, wrong: 'The teacher told us to not talk.',       correct: 'The teacher told us not to talk.',          error: 'Infinitive negation',     category: 'Structure',   hindi: 'Negative infinitive: "not to" — not "to not"।' },
  { id: 49, wrong: 'I am living here from 2018.',            correct: 'I have been living here since 2018.',      error: 'Tense + preposition',     category: 'Tenses',      hindi: 'Point in time: "since" + Present Perfect Continuous।' },
  { id: 50, wrong: 'He is my good friend since childhood.',  correct: 'He has been my good friend since childhood.', error: 'Tense error',          category: 'Tenses',      hindi: 'Action continuing from past to present: Present Perfect।' },
];

const CATEGORIES_LIST = ['All', ...new Set(GRAMMAR_RULES.map(r => r.category))];

// Simple local grammar checker — matches wrong phrases
function analyzeText(text) {
  if (!text.trim()) return [];
  const findings = [];
  const lower = text.toLowerCase();
  GRAMMAR_RULES.forEach(rule => {
    if (lower.includes(rule.wrong.toLowerCase())) {
      findings.push({ ...rule, found: true });
    }
  });
  // Also add generic checks
  if (/\bdon't\b/.test(lower) && /\bhe\b|\bshe\b|\bit\b/.test(lower)) {
    findings.push({ id: 'gen-1', wrong: 'he/she/it + don\'t', correct: 'he/she/it + doesn\'t', error: 'Subject-verb agreement', category: 'Agreement', hindi: 'Third person singular के साथ "doesn\'t" use करें।', found: true });
  }
  return findings;
}

export default function GrammarCheckPage() {
  const [text,        setText]        = useState('');
  const [results,     setResults]     = useState(null);
  const [filterCat,   setFilterCat]   = useState('All');
  const [expandedId,  setExpandedId]  = useState(null);
  const [activeTab,   setActiveTab]   = useState('checker'); // checker | reference

  const handleCheck = () => {
    const findings = analyzeText(text);
    setResults(findings);
  };

  const handleClear = () => {
    setText('');
    setResults(null);
  };

  const filteredRules = filterCat === 'All'
    ? GRAMMAR_RULES
    : GRAMMAR_RULES.filter(r => r.category === filterCat);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Grammar Check</h1>
            <p className="text-sm text-slate-500">Type English text to check for grammar mistakes</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit">
        {[
          { id: 'checker', label: '✏️ Grammar Checker' },
          { id: 'reference', label: '📚 50 Common Mistakes' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white/10 text-white shadow'
                : 'text-slate-500 hover:text-white'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'checker' ? (
        <div className="space-y-4">
          {/* Text input */}
          <motion.div className="card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-white">Your English Text</label>
              <div className="flex gap-2">
                <button onClick={() => setText('I am going to market yesterday. She don\'t like coffee. I have visited Paris last year.')}
                  className="text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded-lg bg-white/5">
                  Try sample
                </button>
                <button onClick={handleClear} className="text-xs text-rose-400 hover:text-rose-300 transition-colors px-2 py-1 rounded-lg bg-rose-500/10">
                  <Trash2 size={11} className="inline mr-1" />Clear
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste your English sentences here… e.g. 'I am going to market yesterday.'"
              className="input w-full text-sm resize-none"
              rows={5}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-600">{text.length} characters · {text.split(/\s+/).filter(Boolean).length} words</span>
              <button onClick={handleCheck} disabled={!text.trim()}
                className="btn-primary text-sm px-5 py-2 flex items-center gap-2 disabled:opacity-50">
                <Brain size={14} /> Check Grammar
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {results !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {results.length === 0 ? (
                  <div className="card p-6 text-center border border-emerald-500/30 bg-emerald-500/5">
                    <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                    <p className="font-bold text-emerald-400 text-base">No common mistakes found!</p>
                    <p className="text-sm text-slate-500 mt-1">Your text looks grammatically correct. Keep it up! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={15} className="text-amber-400" />
                      <p className="text-sm font-semibold text-white">{results.length} issue{results.length > 1 ? 's' : ''} found</p>
                    </div>
                    {results.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                        className="card p-4 border border-rose-500/20 bg-rose-500/5">
                        <div className="flex items-start gap-3">
                          <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full">{r.error}</span>
                              <span className="text-xs text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">{r.category}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                                <p className="text-[10px] text-rose-400 font-semibold mb-0.5">❌ Wrong</p>
                                <p className="text-xs text-rose-300 italic">{r.wrong}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <p className="text-[10px] text-emerald-400 font-semibold mb-0.5">✅ Correct</p>
                                <p className="text-xs text-emerald-300">{r.correct}</p>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 bg-amber-500/5 border border-amber-500/10 rounded-lg px-2.5 py-1.5">
                              💡 {r.hindi}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick tips */}
          {!results && (
            <motion.div className="card p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb size={14} className="text-amber-400" /> Common areas to check
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Tenses', 'Articles', 'Prepositions', 'Subject-Verb', 'Modals', 'Word Choice'].map(cat => (
                  <div key={cat} className="flex items-center gap-2 p-2 rounded-lg bg-white/3 border border-white/5 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />{cat}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Reference tab — 50 mistakes */
        <div className="space-y-4">
          {/* Stats */}
          <motion.div className="grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[
              { label: 'Total Mistakes',  value: '50', color: 'text-rose-400',     icon: XCircle },
              { label: 'Categories',      value: CATEGORIES_LIST.length - 1, color: 'text-blue-400', icon: BookOpen },
              { label: 'With Hindi Tips', value: '50', color: 'text-amber-400',    icon: Lightbulb },
            ].map(({ label, value, color, icon: Icon }) => (
              <div key={label} className="card p-3 text-center">
                <Icon size={15} className={`${color} mx-auto mb-1`} />
                <p className="text-base font-black text-white">{value}</p>
                <p className="text-[10px] text-slate-500">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES_LIST.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCat === cat
                    ? 'bg-primary-500/30 border border-primary-500/40 text-primary-300'
                    : 'bg-white/5 border border-white/8 text-slate-400 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Mistake list */}
          <div className="space-y-2">
            {filteredRules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="card border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === rule.id ? null : rule.id)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-600 w-5 shrink-0">#{rule.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">{rule.error}</span>
                      <span className="text-xs text-slate-600">{rule.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      <span className="text-rose-400">✗ </span>{rule.wrong}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {expandedId === rule.id ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === rule.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <p className="text-[10px] text-rose-400 font-bold mb-1">❌ Wrong</p>
                            <p className="text-sm text-rose-300 italic">"{rule.wrong}"</p>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <p className="text-[10px] text-emerald-400 font-bold mb-1">✅ Correct</p>
                            <p className="text-sm text-emerald-300">"{rule.correct}"</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                          <p className="text-[10px] text-amber-400 font-bold mb-1">💡 Hindi Explanation</p>
                          <p className="text-xs text-slate-400">{rule.hindi}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
