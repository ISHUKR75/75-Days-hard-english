'use client';
// ============================================================
// GRAMMAR REFERENCE PAGE — Complete English grammar guide
// Features: All 12 tenses, modal verbs, sentence types,
// clause types, punctuation, common mistakes, examples
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronDown, ChevronUp, Search, Star,
  CheckCircle2, Target, ArrowRight, Zap, Brain,
  BookMarked, X, ChevronRight,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// ── Grammar sections ──────────────────────────────────────────
const GRAMMAR_SECTIONS = [
  {
    id: 'tenses',
    title: '12 Tenses',
    emoji: '⏰',
    color: 'from-indigo-500 to-blue-500',
    border: 'border-indigo-500/25',
    bg: 'bg-indigo-500/8',
    topics: [
      {
        name: 'Simple Present',
        hindi: 'सामान्य वर्तमान काल',
        structure: 'Subject + V1 (+ s/es for he/she/it)',
        use: 'Habits, facts, routines, universal truths',
        examples: [
          { e: 'I drink coffee every morning.', h: 'मैं हर सुबह कॉफ़ी पीता हूँ।' },
          { e: 'She works at a hospital.', h: 'वह अस्पताल में काम करती है।' },
          { e: 'The sun rises in the east.', h: 'सूरज पूर्व में उगता है।' },
        ],
        negation: 'Subject + do/does + not + V1',
        question: 'Do/Does + Subject + V1?',
        signal: 'always, usually, every day, often, sometimes, never',
      },
      {
        name: 'Present Continuous',
        hindi: 'अपूर्ण वर्तमान काल',
        structure: 'Subject + is/am/are + V-ing',
        use: 'Action happening right now; temporary situations',
        examples: [
          { e: 'I am studying English right now.', h: 'मैं अभी English पढ़ रहा हूँ।' },
          { e: 'She is cooking dinner.', h: 'वह रात का खाना बना रही है।' },
          { e: 'They are playing cricket.', h: 'वे क्रिकेट खेल रहे हैं।' },
        ],
        negation: 'Subject + is/am/are + not + V-ing',
        question: 'Is/Am/Are + Subject + V-ing?',
        signal: 'now, right now, at the moment, currently, look! listen!',
      },
      {
        name: 'Present Perfect',
        hindi: 'पूर्ण वर्तमान काल',
        structure: 'Subject + has/have + V3 (past participle)',
        use: 'Completed action with present relevance; life experience; recent news',
        examples: [
          { e: 'I have finished my homework.', h: 'मैंने अपना होमवर्क पूरा कर लिया है।' },
          { e: 'She has never visited London.', h: 'वह कभी London नहीं गई।' },
          { e: 'They have just arrived.', h: 'वे अभी-अभी पहुँचे हैं।' },
        ],
        negation: 'Subject + has/have + not + V3',
        question: 'Has/Have + Subject + V3?',
        signal: 'just, already, yet, ever, never, so far, recently, since, for',
      },
      {
        name: 'Present Perfect Continuous',
        hindi: 'पूर्ण-अपूर्ण वर्तमान काल',
        structure: 'Subject + has/have + been + V-ing',
        use: 'Action started in the past and still continuing',
        examples: [
          { e: 'I have been learning English for 3 months.', h: 'मैं 3 महीनों से English सीख रहा हूँ।' },
          { e: 'She has been working here since 2020.', h: 'वह 2020 से यहाँ काम कर रही है।' },
        ],
        negation: 'Subject + has/have + not + been + V-ing',
        question: 'Has/Have + Subject + been + V-ing?',
        signal: 'since, for, how long',
      },
      {
        name: 'Simple Past',
        hindi: 'सामान्य भूतकाल',
        structure: 'Subject + V2 (past form)',
        use: 'Completed action at a specific past time',
        examples: [
          { e: 'I watched a movie yesterday.', h: 'मैंने कल एक movie देखी।' },
          { e: 'She went to Delhi last week.', h: 'वह पिछले हफ़्ते Delhi गई।' },
          { e: 'They played cricket in the evening.', h: 'उन्होंने शाम को cricket खेली।' },
        ],
        negation: 'Subject + did + not + V1',
        question: 'Did + Subject + V1?',
        signal: 'yesterday, last week/month/year, ago, in 2020, then, at that time',
      },
      {
        name: 'Past Continuous',
        hindi: 'अपूर्ण भूतकाल',
        structure: 'Subject + was/were + V-ing',
        use: 'Action in progress at a specific past time; background action',
        examples: [
          { e: 'I was sleeping when you called.', h: 'जब तुमने call किया, मैं सो रहा था।' },
          { e: 'She was cooking at 7 PM.', h: 'रात 7 बजे वह खाना बना रही थी।' },
        ],
        negation: 'Subject + was/were + not + V-ing',
        question: 'Was/Were + Subject + V-ing?',
        signal: 'while, when, at that time, at 5 o\'clock yesterday',
      },
      {
        name: 'Past Perfect',
        hindi: 'पूर्ण भूतकाल',
        structure: 'Subject + had + V3',
        use: 'Action completed before another past action',
        examples: [
          { e: 'I had eaten before she arrived.', h: 'वह आने से पहले मैंने खाना खा लिया था।' },
          { e: 'He had finished his work when we called.', h: 'जब हमने call किया, वह काम पूरा कर चुका था।' },
        ],
        negation: 'Subject + had + not + V3',
        question: 'Had + Subject + V3?',
        signal: 'before, after, already, by the time, when',
      },
      {
        name: 'Simple Future',
        hindi: 'सामान्य भविष्य काल',
        structure: 'Subject + will + V1',
        use: 'Future predictions, spontaneous decisions, promises',
        examples: [
          { e: 'I will call you tomorrow.', h: 'मैं तुम्हें कल call करूँगा।' },
          { e: 'She will pass the exam.', h: 'वह exam pass करेगी।' },
          { e: 'It will rain tonight.', h: 'आज रात बारिश होगी।' },
        ],
        negation: 'Subject + will + not (won\'t) + V1',
        question: 'Will + Subject + V1?',
        signal: 'tomorrow, next week, soon, in the future, later',
      },
      {
        name: 'Future Continuous',
        hindi: 'अपूर्ण भविष्य काल',
        structure: 'Subject + will + be + V-ing',
        use: 'Action in progress at a specific future time',
        examples: [
          { e: 'I will be working at 8 PM tomorrow.', h: 'कल रात 8 बजे मैं काम कर रहा होऊँगा।' },
          { e: 'She will be traveling this time next week.', h: 'अगले हफ़्ते इसी समय वह यात्रा कर रही होगी।' },
        ],
        negation: 'Subject + will + not + be + V-ing',
        question: 'Will + Subject + be + V-ing?',
        signal: 'at this time tomorrow, at 8 PM, this time next week',
      },
      {
        name: 'Future Perfect',
        hindi: 'पूर्ण भविष्य काल',
        structure: 'Subject + will + have + V3',
        use: 'Action completed before a specific future time',
        examples: [
          { e: 'I will have finished by 6 PM.', h: 'मैं शाम 6 बजे तक काम पूरा कर चुका होऊँगा।' },
          { e: 'She will have left by the time you arrive.', h: 'तुम्हारे आने से पहले वह जा चुकी होगी।' },
        ],
        negation: 'Subject + will + not + have + V3',
        question: 'Will + Subject + have + V3?',
        signal: 'by, by the time, before, by tomorrow',
      },
    ],
  },
  {
    id: 'modals',
    title: 'Modal Verbs',
    emoji: '🔑',
    color: 'from-violet-500 to-purple-500',
    border: 'border-violet-500/25',
    bg: 'bg-violet-500/8',
    topics: [
      {
        name: 'Can / Could',
        hindi: 'सकना (वर्तमान/भूतकाल)',
        structure: 'Subject + can/could + V1',
        use: 'Ability (can), Past ability (could), Polite request (could)',
        examples: [
          { e: 'I can speak English.', h: 'मैं English बोल सकता हूँ।' },
          { e: 'She could swim when she was young.', h: 'वह बचपन में तैर सकती थी।' },
          { e: 'Could you help me, please?', h: 'क्या आप मेरी मदद कर सकते हैं?' },
        ],
        negation: "Subject + can't/couldn't + V1",
        question: 'Can/Could + Subject + V1?',
        signal: 'ability, possibility, permission',
      },
      {
        name: 'Should / Must / Have to',
        hindi: 'चाहिए / जरूरी है / करना पड़ेगा',
        structure: 'Subject + should/must/have to + V1',
        use: 'Advice (should), Strong obligation (must), External obligation (have to)',
        examples: [
          { e: 'You should practice daily.', h: 'तुम्हें रोज़ अभ्यास करना चाहिए।' },
          { e: 'You must wear a seatbelt.', h: 'तुम्हें सीटबेल्ट पहननी ही होगी।' },
          { e: 'I have to submit the report today.', h: 'मुझे आज report जमा करनी है।' },
        ],
        negation: "You shouldn't / mustn't / don't have to",
        question: 'Should/Must + Subject + V1?',
        signal: 'advice, obligation, necessity',
      },
      {
        name: 'Will / Would',
        hindi: 'भविष्य में करना / विनम्र अनुरोध',
        structure: 'Subject + will/would + V1',
        use: 'Future (will), Conditional (would), Polite request (would)',
        examples: [
          { e: 'I will help you.', h: 'मैं तुम्हारी मदद करूँगा।' },
          { e: 'I would like some water, please.', h: 'मुझे थोड़ा पानी चाहिए, कृपया।' },
          { e: 'Would you like to join us?', h: 'क्या आप हमारे साथ आना चाहेंगे?' },
        ],
        negation: "Subject + won't/wouldn't + V1",
        question: 'Will/Would + Subject + V1?',
        signal: 'future prediction, conditional, polite request',
      },
      {
        name: 'May / Might',
        hindi: 'हो सकता है / शायद',
        structure: 'Subject + may/might + V1',
        use: 'Possibility (may = more likely, might = less likely), Permission (may)',
        examples: [
          { e: 'It may rain tomorrow.', h: 'कल बारिश हो सकती है।' },
          { e: 'She might come to the party.', h: 'वह party में आ सकती है (शायद)।' },
          { e: 'May I come in?', h: 'क्या मैं अंदर आ सकता हूँ?' },
        ],
        negation: 'Subject + may/might + not + V1',
        question: 'May + Subject + V1?',
        signal: 'possibility, permission',
      },
    ],
  },
  {
    id: 'sentences',
    title: 'Sentence Types',
    emoji: '📝',
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-500/8',
    topics: [
      {
        name: 'Declarative (Statement)',
        hindi: 'कथनात्मक वाक्य',
        structure: 'Subject + Verb + Object',
        use: 'To state a fact or give information',
        examples: [
          { e: 'I am learning English.', h: 'मैं English सीख रहा हूँ।' },
          { e: 'She works at a bank.', h: 'वह एक बैंक में काम करती है।' },
        ],
        negation: 'Add "not" after the auxiliary verb',
        question: 'N/A — this is a statement form',
        signal: 'Ends with a full stop (.)',
      },
      {
        name: 'Interrogative (Question)',
        hindi: 'प्रश्नवाचक वाक्य',
        structure: 'Auxiliary/WH-word + Subject + Verb?',
        use: 'To ask for information',
        examples: [
          { e: 'Where do you work?', h: 'तुम कहाँ काम करते हो?' },
          { e: 'Can you speak English?', h: 'क्या तुम English बोल सकते हो?' },
        ],
        negation: 'Add "not" — "Isn\'t she...? / Didn\'t he...?"',
        question: 'This IS the question form',
        signal: 'Ends with question mark (?)',
      },
      {
        name: 'Imperative (Command)',
        hindi: 'आज्ञावाचक वाक्य',
        structure: 'V1 + Object (no subject needed)',
        use: 'To give orders, instructions, requests, or advice',
        examples: [
          { e: 'Please open the door.', h: 'कृपया दरवाज़ा खोलिए।' },
          { e: 'Don\'t make noise.', h: 'शोर मत करो।' },
          { e: 'Be quiet!', h: 'चुप रहो!' },
        ],
        negation: 'Don\'t + V1',
        question: 'N/A',
        signal: 'Often ends with ! or . Subject is "you" (implied)',
      },
      {
        name: 'Exclamatory (Exclamation)',
        hindi: 'विस्मयादिबोधक वाक्य',
        structure: 'What a/an + Adj + Noun! / How + Adj + Subject + Verb!',
        use: 'To express strong emotion or feeling',
        examples: [
          { e: 'What a beautiful morning!', h: 'कितनी सुंदर सुबह है!' },
          { e: 'How brilliant she is!', h: 'वह कितनी प्रतिभाशाली है!' },
        ],
        negation: 'N/A',
        question: 'N/A',
        signal: 'Always ends with exclamation mark (!)',
      },
    ],
  },
  {
    id: 'voice',
    title: 'Active & Passive Voice',
    emoji: '🔄',
    color: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/8',
    topics: [
      {
        name: 'Active Voice',
        hindi: 'कर्तृवाच्य',
        structure: 'Subject + Verb + Object',
        use: 'The subject performs the action — direct, clear, concise',
        examples: [
          { e: 'The manager approved the project.', h: 'मैनेजर ने प्रोजेक्ट मंजूर किया।' },
          { e: 'She writes emails every day.', h: 'वह हर दिन email लिखती है।' },
        ],
        negation: 'Normal negation with do/does/did + not',
        question: 'Normal question with do/does/did',
        signal: 'Subject = doer of the action',
      },
      {
        name: 'Passive Voice',
        hindi: 'कर्मवाच्य',
        structure: 'Object + is/was/will be + V3 + (by + Subject)',
        use: 'The action is more important than who does it; doer unknown or obvious',
        examples: [
          { e: 'The project was approved by the manager.', h: 'प्रोजेक्ट मैनेजर द्वारा मंजूर किया गया।' },
          { e: 'Emails are written every day.', h: 'हर दिन email लिखी जाती है।' },
          { e: 'The report will be submitted tomorrow.', h: 'रिपोर्ट कल जमा की जाएगी।' },
        ],
        negation: 'Object + is/was + not + V3',
        question: 'Is/Was + Object + V3?',
        signal: 'Subject = receiver of action; often includes "by"',
      },
    ],
  },
  {
    id: 'articles',
    title: 'Articles — a, an, the',
    emoji: '📌',
    color: 'from-rose-500 to-pink-500',
    border: 'border-rose-500/25',
    bg: 'bg-rose-500/8',
    topics: [
      {
        name: 'A vs An',
        hindi: 'अनिश्चित उपवाक्य',
        structure: 'A + consonant sound; An + vowel sound',
        use: 'Used with singular countable nouns, first mention',
        examples: [
          { e: 'a book, a university, a European (not vowel sound!)', h: 'एक किताब, एक विश्वविद्यालय' },
          { e: 'an apple, an hour, an honest man (h is silent!)', h: 'एक सेब, एक घंटा, एक ईमानदार आदमी' },
        ],
        negation: 'N/A',
        question: 'N/A',
        signal: 'Depends on SOUND (not letter) that follows',
      },
      {
        name: 'The (Definite Article)',
        hindi: 'निश्चित उपवाक्य',
        structure: 'The + noun (singular or plural)',
        use: 'Specific/known noun, second mention, unique things, superlatives',
        examples: [
          { e: 'I saw a dog. The dog was friendly.', h: 'मैंने एक कुत्ता देखा। वह कुत्ता मिलनसार था।' },
          { e: 'The sun, the moon, the earth', h: 'सूरज, चाँद, धरती' },
          { e: 'He is the best student.', h: 'वह सबसे अच्छा छात्र है।' },
        ],
        negation: 'Omit "the" for: languages, sports, meals, plural generics',
        question: 'N/A',
        signal: 'Both listener and speaker know which one',
      },
    ],
  },
];

// ── Common Mistakes ────────────────────────────────────────────
const COMMON_MISTAKES = [
  { wrong: 'I am agree with you.',        right: 'I agree with you.',              rule: '"Agree" is not used with "am/is/are"' },
  { wrong: 'She is more better.',         right: 'She is better.',                 rule: 'Never use "more" with comparative adjectives (-er)' },
  { wrong: 'I did not went there.',       right: 'I did not go there.',            rule: 'After "did not", always use V1 (base form)' },
  { wrong: 'He is knowing the answer.',   right: 'He knows the answer.',           rule: '"Know" is a stative verb — no -ing form for states' },
  { wrong: 'I have told him yesterday.',  right: 'I told him yesterday.',          rule: 'Past tense with time markers — use Simple Past' },
  { wrong: 'She don\'t know.',            right: 'She doesn\'t know.',             rule: 'He/She/It → use "doesn\'t" in simple present' },
  { wrong: 'What is your good name?',     right: 'What is your name?',             rule: 'Direct Hindi translation — "good name" not used in English' },
  { wrong: 'I am having a headache.',     right: 'I have a headache.',             rule: '"Have" for states/conditions — no continuous form' },
  { wrong: 'He told to me.',              right: 'He told me.',                    rule: '"Tell" takes indirect object directly (no "to")' },
  { wrong: 'Today morning I woke up.',    right: 'This morning I woke up.',        rule: '"Today morning" not used — say "this morning"' },
];

// ── Topic Card ─────────────────────────────────────────────────
function TopicCard({ topic, sectionColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className="border border-white/8 rounded-2xl overflow-hidden bg-white/3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
      >
        <div>
          <p className="font-bold text-white">{topic.name}</p>
          <p className="text-sm text-slate-500">{topic.hindi}</p>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/6 pt-4 space-y-4">
              {/* Structure */}
              <div className="bg-white/4 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Structure</p>
                <p className="text-sm font-mono font-semibold text-primary-300">{topic.structure}</p>
              </div>

              {/* Use */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">When to use</p>
                <p className="text-sm text-slate-300">{topic.use}</p>
              </div>

              {/* Examples */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Examples</p>
                <div className="space-y-2">
                  {topic.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-white/4 rounded-xl border border-white/6">
                      <p className="text-sm text-white font-medium">{ex.e}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{ex.h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negation & Question */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-rose-500/8 rounded-xl border border-rose-500/15">
                  <p className="text-xs text-rose-400 font-bold mb-1">❌ Negative</p>
                  <p className="text-xs text-slate-300 font-mono">{topic.negation}</p>
                </div>
                <div className="p-3 bg-sky-500/8 rounded-xl border border-sky-500/15">
                  <p className="text-xs text-sky-400 font-bold mb-1">❓ Question</p>
                  <p className="text-xs text-slate-300 font-mono">{topic.question}</p>
                </div>
              </div>

              {/* Signal words */}
              {topic.signal && (
                <div className="p-3 bg-amber-500/8 rounded-xl border border-amber-500/15">
                  <p className="text-xs text-amber-400 font-bold mb-1">🔔 Signal Words</p>
                  <p className="text-xs text-slate-300">{topic.signal}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function GrammarReferencePage() {
  const [search, setSearch]         = useState('');
  const [activeSection, setActiveSection] = useState('tenses');
  const [activeTab, setActiveTab]   = useState('sections'); // sections | mistakes

  const section = GRAMMAR_SECTIONS.find(s => s.id === activeSection);

  const filteredTopics = search
    ? GRAMMAR_SECTIONS.flatMap(s => s.topics.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.hindi.includes(search)
      ).map(t => ({ ...t, sectionId: s.id })))
    : section?.topics || [];

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Grammar Reference</h1>
        </div>
        <p className="text-slate-400 pl-1">Complete English grammar guide — all tenses, modals, voice, articles, and more.</p>
      </motion.div>

      {/* ── Search ──────────────────────────────────────── */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search grammar topics…"
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-all text-sm" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={15} /></button>}
      </div>

      {/* ── Tabs ────────────────────────────────────────── */}
      {!search && (
        <div className="flex gap-2 mb-6">
          {[{ id: 'sections', label: 'Grammar Sections' }, { id: 'mistakes', label: 'Common Mistakes' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeTab === tab.id ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Section Selector ────────────────────────────── */}
      {activeTab === 'sections' && !search && (
        <div className="flex flex-wrap gap-2 mb-6">
          {GRAMMAR_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeSection === s.id ? `${s.bg} border-current/30` : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
              <span>{s.emoji}</span>
              <span className={activeSection === s.id ? 'text-white' : ''}>{s.title}</span>
              <span className="text-xs opacity-60">({s.topics.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Topics ──────────────────────────────────────── */}
      {(activeTab === 'sections' || search) && (
        <motion.div layout className="space-y-3">
          {filteredTopics.map((topic, i) => (
            <motion.div
              key={`${topic.name}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TopicCard topic={topic} sectionColor={section?.color} />
            </motion.div>
          ))}
          {filteredTopics.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-slate-400">No grammar topics match your search.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Common Mistakes ─────────────────────────────── */}
      {activeTab === 'mistakes' && !search && (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm mb-4">These are the most common grammar mistakes made by Hindi speakers learning English.</p>
          {COMMON_MISTAKES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div className="p-4 bg-rose-500/8 border border-rose-500/20 rounded-xl">
                <p className="text-xs text-rose-400 font-bold mb-2">❌ Wrong</p>
                <p className="text-sm text-white italic">"{item.wrong}"</p>
              </div>
              <div className="p-4 bg-emerald-500/8 border border-emerald-500/20 rounded-xl">
                <p className="text-xs text-emerald-400 font-bold mb-2">✅ Correct</p>
                <p className="text-sm text-white italic">"{item.right}"</p>
                <p className="text-xs text-slate-400 border-t border-white/8 pt-2 mt-2">📌 {item.rule}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
