'use client';
// Subtopic Lesson Page — Full lesson with theory, examples, vocabulary, and practice links
// The core learning unit of the 75 Days Hard English platform

import { useState, useRef }  from 'react';
import Link                  from 'next/link';
import { useParams }         from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Target, Mic, Volume2, PenTool,
  Brain, FileText, CheckCircle2, ChevronRight, Play,
  MessageSquare, Star, Zap, AlertTriangle, Lightbulb,
  Headphones, Trophy, ArrowRight, Eye, EyeOff,
  ChevronDown, ChevronUp, Copy, Check,
} from 'lucide-react';
import DAYS_75_TOPICS       from '@/lib/topics';
import useProgressStore     from '@/store/progressStore';
import useUserStore         from '@/store/userStore';

// ── Animation variants ────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// ── Rich subtopic content by topic/subtopic id ────────────
// These are real, detailed English grammar lessons
const SUBTOPIC_CONTENT = {
  // ── Day 1: Basics
  '01-sentence-structure': {
    title:       'English Sentence Structure',
    emoji:       '🏗️',
    explanation: `
**English Sentence Structure — The Foundation**

हर English sentence में 3 parts होते हैं:

**Subject (कर्ता) → Verb (क्रिया) → Object (कर्म)**

🇮🇳 मैं → खाना → खाता हूँ।
🇬🇧 I → eat → food.

यही basic pattern है — और यही pattern हमेशा काम करता है!
    `,
    rules: [
      'हर sentence में Subject + Verb ज़रूरी है',
      'Object optional होता है (कुछ verbs को object नहीं चाहिए)',
      'Adjectives Subject/Object के पहले आते हैं',
      'Adverbs Verb के बाद आते हैं',
      'Questions में: Auxiliary Verb + Subject + Main Verb',
    ],
    examples: [
      { hindi: 'मैं खाना खाता हूँ।',         english: 'I eat food.',              type: 'Simple' },
      { hindi: 'वह सुंदर लड़की है।',          english: 'She is a beautiful girl.',  type: 'Adjective' },
      { hindi: 'क्या तुम पढ़ते हो?',          english: 'Do you study?',            type: 'Question' },
      { hindi: 'वह तेज़ दौड़ता है।',          english: 'He runs fast.',            type: 'Adverb' },
      { hindi: 'मेरी माँ रोज़ खाना बनाती है।', english: 'My mother cooks daily.',   type: 'Daily Life' },
      { hindi: 'हम मिलकर काम करते हैं।',      english: 'We work together.',        type: 'Plural' },
    ],
    mistakes: [
      { wrong: 'I food eat.',      correct: 'I eat food.',       why: 'Verb Object के पहले आता है Hindi में नहीं' },
      { wrong: 'He beautiful is.', correct: 'He is beautiful.',  why: 'Verb पहले, फिर Adjective' },
      { wrong: 'Fast he runs.',    correct: 'He runs fast.',     why: 'Subject पहले, Adverb last में' },
    ],
    memoryTrick: '**S-V-O = Simple Verb Order!** Subject पहले, फिर Verb, फिर Object — बस यही pattern याद रखो।',
    vocabulary: [
      { word: 'Subject',   hindi: 'कर्ता',   example: 'I am the subject here.' },
      { word: 'Predicate', hindi: 'विधेय',   example: 'Goes to school is the predicate.' },
      { word: 'Clause',    hindi: 'उपवाक्य', example: 'When I go — this is a clause.' },
      { word: 'Phrase',    hindi: 'पदबंध',   example: 'In the morning — this is a phrase.' },
      { word: 'Simple',    hindi: 'सरल',     example: 'I eat. (simple sentence)' },
      { word: 'Compound',  hindi: 'संयुक्त', example: 'I eat and I sleep.' },
      { word: 'Complex',   hindi: 'मिश्रित', example: 'I eat because I am hungry.' },
    ],
    speakingTips: [
      'रोज़ 5 नई sentences बनाओ — S+V+O pattern में',
      'Mirror के सामने बोलो — confidence बढ़ेगा',
      'Hindi sentence को directly English में convert करो',
    ],
  },

  // ── Affirmative Imperatives
  '01-affirmative': {
    title:       'Affirmative Imperatives',
    emoji:       '✅',
    explanation: `
**Affirmative Imperative Sentences — Direct Commands**

जब हम किसी को कुछ **करने के लिए** कहते हैं, उसे Imperative sentence कहते हैं।

📌 **Formula:**
Verb (Base Form) + Object/Complement

⚡ कोई Subject नहीं होता — "You" implied है!

🇮🇳 पानी पियो।
🇬🇧 Drink water.

🇮🇳 यहाँ बैठो।
🇬🇧 Sit here.

**Polite Versions:**
→ Please + Verb → "Please drink water."
→ Kindly + Verb → "Kindly take a seat."
    `,
    rules: [
      'Imperative में Subject (You) नहीं लिखते — implied होता है',
      'हमेशा Verb की Base Form use होती है (drink, sit, come)',
      'Polite बनाने के लिए "Please" start में या end में',
      '"Kindly" का use formal/office situations में होता है',
      'Negative imperative के लिए "Don\'t" + base verb',
    ],
    examples: [
      { hindi: 'दरवाज़ा बंद करो।',         english: 'Close the door.',             type: 'Home' },
      { hindi: 'मेरी बात सुनो।',            english: 'Listen to me.',               type: 'Daily' },
      { hindi: 'यहाँ साइन करें।',          english: 'Sign here, please.',          type: 'Office' },
      { hindi: 'सावधान रहो।',              english: 'Be careful.',                 type: 'Warning' },
      { hindi: 'अपना काम करो।',            english: 'Do your work.',               type: 'Instruction' },
      { hindi: 'रिपोर्ट submit करें।',     english: 'Please submit the report.',   type: 'Professional' },
      { hindi: 'खिड़की खोलो।',             english: 'Open the window.',            type: 'Home' },
      { hindi: 'मुझे call करना।',          english: 'Call me.',                    type: 'Casual' },
      { hindi: 'समय से आओ।',              english: 'Come on time.',               type: 'Office' },
      { hindi: 'ध्यान से पढ़ो।',           english: 'Read carefully.',             type: 'Study' },
    ],
    mistakes: [
      { wrong: 'You close the door.',    correct: 'Close the door.',           why: '"You" imperative में नहीं लिखते' },
      { wrong: 'Please to sit here.',    correct: 'Please sit here.',          why: '"Please to" गलत है — "Please sit" सही' },
      { wrong: 'Kindly be coming now.',  correct: 'Kindly come now.',          why: 'Imperative में -ing form नहीं' },
      { wrong: 'Drink the waters.',      correct: 'Drink water.',              why: 'Water uncountable है — "the" नहीं' },
    ],
    memoryTrick: '**VERB से शुरू = Imperative!** जब sentence Verb (close, sit, go, open) से start हो — Imperative है।',
    vocabulary: [
      { word: 'Submit',   hindi: 'जमा करना',    example: 'Submit your assignment.' },
      { word: 'Proceed',  hindi: 'आगे बढ़ना',  example: 'Please proceed to the exit.' },
      { word: 'Ensure',   hindi: 'सुनिश्चित करना', example: 'Ensure everything is correct.' },
      { word: 'Confirm',  hindi: 'पुष्टि करना', example: 'Please confirm your attendance.' },
      { word: 'Avoid',    hindi: 'बचना',       example: 'Avoid making mistakes.' },
      { word: 'Consider', hindi: 'विचार करना', example: 'Consider all options.' },
      { word: 'Maintain', hindi: 'बनाए रखना',  example: 'Maintain silence here.' },
      { word: 'Report',   hindi: 'रिपोर्ट करना', example: 'Report to HR immediately.' },
    ],
    speakingTips: [
      'रोज़ office या घर में 10 imperatives बोलो',
      'Tone बदलो: friendly vs strict — practice करो दोनों',
      'Role-play: Teacher, Boss, Friend — different tones',
    ],
  },

  // Default fallback content
  '_default': {
    title:       'English Grammar Lesson',
    emoji:       '📚',
    explanation: `
**Complete Explanation Coming Soon**

यह topic English grammar का एक important हिस्सा है।
Is lesson में आपको मिलेगा:

• Full theory explanation (Hindi + English)
• 20+ real-life examples
• Common mistakes और corrections
• 500+ practice questions
• Vocabulary (500+ words)
• Speaking practice
    `,
    rules: [
      'इस topic के basic rules यहाँ दिए जाएंगे',
      'हर rule को example के साथ समझाया जाएगा',
      'Common mistakes clearly बताई जाएंगी',
      'Daily और professional usage दोनों cover होंगे',
    ],
    examples: [
      { hindi: 'यह एक example sentence है।', english: 'This is an example sentence.', type: 'Example' },
      { hindi: 'अभ्यास से perfection आती है।', english: 'Practice makes perfect.',    type: 'Proverb' },
    ],
    mistakes: [
      { wrong: 'Common mistake here', correct: 'Correct version', why: 'Explanation of why' },
    ],
    memoryTrick: 'इस topic को याद रखने के लिए pattern याद करो और daily use करो।',
    vocabulary: [
      { word: 'Practice', hindi: 'अभ्यास',    example: 'Practice makes perfect.' },
      { word: 'Grammar',  hindi: 'व्याकरण',   example: 'Good grammar is important.' },
      { word: 'Fluency',  hindi: 'प्रवाह',    example: 'Aim for fluency in English.' },
    ],
    speakingTips: [
      'रोज़ इस topic पर 5 sentences बोलो',
      'Conversations में naturally use karo',
    ],
  },
};

// ── Collapsible section ───────────────────────────────────
function Section({ icon: Icon, title, color, children, defaultOpen = false }) {
  const [open, setOpen]  = useState(defaultOpen);
  const ref              = useRef(null);
  const isInView         = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="card overflow-hidden"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={17} className="text-white" />
          </div>
          <h3 className="font-bold text-white text-sm">{title}</h3>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/5"
        >
          <div className="p-5">
            {children}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Example card ──────────────────────────────────────────
function ExampleCard({ hindi, english, type, index }) {
  const [revealed, setRevealed] = useState(false);
  const [copied,   setCopied]   = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(english);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all p-4"
    >
      {/* Type badge */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
        {type}
      </span>

      {/* Hindi */}
      <p className="mt-2 text-slate-300 text-sm font-medium">🇮🇳 {hindi}</p>

      {/* English — reveal on click */}
      <div className="mt-1.5 flex items-center justify-between gap-2">
        {revealed ? (
          <p className="text-emerald-300 text-sm font-semibold">🇬🇧 {english}</p>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition-colors"
          >
            <Eye size={14} /> Click to see English
          </button>
        )}
        {revealed && (
          <button onClick={handleCopy} className="shrink-0 text-slate-600 hover:text-white transition-colors">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function SubtopicPage() {
  const params       = useParams();
  const topicSlug    = params?.topicSlug    || '';
  const subtopicSlug = params?.subtopicSlug || '';

  // Get content
  const content = SUBTOPIC_CONTENT[subtopicSlug] || SUBTOPIC_CONTENT['_default'];
  const topic   = DAYS_75_TOPICS.find(t => t.slug === topicSlug);

  const { updateSubtopicProgress } = useProgressStore();
  const { addXP, addCoins }        = useUserStore();

  // Mark subtopic as started when page mounts
  // (completion is marked when user clicks "Start Practice" → returns to this page)
  /* eslint-disable react-hooks/exhaustive-deps */
  // Note: we intentionally run this only once on mount


  const topicTitle    = topic?.title    || topicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const subtopicTitle = subtopicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const displayTitle  = content.title  || subtopicTitle;

  // Practice links
  const practiceLinks = [
    { icon: Target,       label: 'Practice Quiz',   href: `/topics/${topicSlug}/${subtopicSlug}/practice`,  color: 'bg-indigo-500',  desc: '500+ Questions' },
    { icon: Brain,        label: 'Mini Test',        href: `/topics/${topicSlug}/${subtopicSlug}/test`,      color: 'bg-violet-500',  desc: '100 Questions, Timed' },
    { icon: Mic,          label: 'Speaking',         href: `/topics/${topicSlug}/${subtopicSlug}/speaking`,  color: 'bg-pink-500',    desc: 'Drills & Roleplay' },
    { icon: PenTool,      label: 'Writing',          href: `/topics/${topicSlug}/${subtopicSlug}/writing`,   color: 'bg-amber-500',   desc: 'Emails, Essays' },
    { icon: Headphones,   label: 'Listening',        href: `/topics/${topicSlug}/${subtopicSlug}/listening`, color: 'bg-cyan-500',    desc: 'Audio Practice' },
    { icon: FileText,     label: 'Vocabulary',       href: `/topics/${topicSlug}/${subtopicSlug}/vocabulary`,color: 'bg-emerald-500', desc: '500+ Words' },
    { icon: BookOpen,     label: 'Flashcards',       href: `/topics/${topicSlug}/${subtopicSlug}/flashcards`,color: 'bg-sky-500',     desc: 'SRS Review' },
    { icon: FileText,     label: 'Essay',            href: `/topics/${topicSlug}/${subtopicSlug}/essay`,     color: 'bg-rose-500',    desc: 'Writing Practice' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-slate-500 flex-wrap"
      >
        <Link href="/topics" className="hover:text-white transition-colors">Topics</Link>
        <span>/</span>
        <Link href={`/topics/${topicSlug}`} className="hover:text-white transition-colors">{topicTitle}</Link>
        <span>/</span>
        <span className="text-slate-300">{displayTitle}</span>
      </motion.div>

      {/* ── Header ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 border-indigo-500/20 bg-indigo-500/3 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-start gap-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-3xl shrink-0"
          >
            {content.emoji || '📚'}
          </motion.div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="badge-primary text-xs">{topicTitle}</span>
              {topic?.cefr && <span className="badge text-slate-400 bg-white/5 border border-white/8 text-xs">{topic.cefr}</span>}
            </div>
            <h1 className="text-xl font-black text-white mb-1">{displayTitle}</h1>
            <p className="text-sm text-slate-400">
              {content.examples?.length || 10}+ examples • {content.vocabulary?.length || 8}+ words • 500+ practice questions
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Concept & Theory ────────────────────────────── */}
      <Section icon={BookOpen} title="Concept & Explanation" color="bg-indigo-600" defaultOpen={true}>
        {/* Explanation text */}
        <div className="prose prose-invert prose-sm max-w-none mb-5">
          {content.explanation.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h4 key={i} className="font-bold text-white mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
            }
            if (line.startsWith('•') || line.startsWith('→')) {
              return <p key={i} className="text-slate-300 text-sm pl-2 my-0.5">{line}</p>;
            }
            return <p key={i} className="text-slate-300 text-sm">{line.replace(/\*\*/g, '')}</p>;
          })}
        </div>

        {/* Rules list */}
        <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <Star size={14} className="text-amber-400" /> Key Rules
        </h4>
        <div className="space-y-2">
          {(content.rules || []).map((rule, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-indigo-400 text-xs font-bold">{i + 1}</span>
              </div>
              {rule}
            </div>
          ))}
        </div>

        {/* Memory trick */}
        {content.memoryTrick && (
          <div className="mt-5 p-4 rounded-xl bg-amber-500/8 border border-amber-500/15">
            <div className="flex items-start gap-2.5">
              <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-300 mb-1">Memory Trick 💡</p>
                <p className="text-sm text-slate-300">{content.memoryTrick.replace(/\*\*/g, '')}</p>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ── Real-Life Examples ───────────────────────────── */}
      <Section icon={MessageSquare} title={`Real-Life Examples (${content.examples?.length || 0})`} color="bg-purple-600" defaultOpen={true}>
        <p className="text-xs text-slate-500 mb-4">Hindi sentence dekho → English answer khud sochne ki koshish karo → reveal karo</p>
        <div className="space-y-3">
          {(content.examples || []).map((ex, i) => (
            <ExampleCard key={i} {...ex} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Common Mistakes ──────────────────────────────── */}
      <Section icon={AlertTriangle} title="Common Mistakes to Avoid" color="bg-red-600">
        <div className="space-y-4">
          {(content.mistakes || []).map((m, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-4">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/15">
                  <p className="text-[10px] font-bold text-red-400 mb-1">❌ Wrong</p>
                  <p className="text-sm text-red-300 font-medium">{m.wrong}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">✅ Correct</p>
                  <p className="text-sm text-emerald-300 font-medium">{m.correct}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-start gap-1.5">
                <Lightbulb size={12} className="text-amber-400 shrink-0 mt-0.5" /> {m.why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Vocabulary ───────────────────────────────────── */}
      <Section icon={BookOpen} title={`Vocabulary — ${content.vocabulary?.length || 0} Key Words`} color="bg-emerald-600">
        <div className="grid grid-cols-1 gap-2">
          {(content.vocabulary || []).map(({ word, hindi, example }, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-sm">{word}</span>
                  <span className="text-xs text-slate-500">— {hindi}</span>
                </div>
                <p className="text-xs text-slate-500 italic truncate">{example}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href={`/topics/${topicSlug}/${subtopicSlug}/vocabulary`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/8 transition-all">
          See all 500+ words <ArrowRight size={14} />
        </Link>
      </Section>

      {/* ── Speaking Tips ────────────────────────────────── */}
      <Section icon={Mic} title="Speaking Tips" color="bg-pink-600">
        <div className="space-y-3">
          {(content.speakingTips || []).map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
              <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-bold shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-slate-300">{tip}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Practice & Test Links ────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target size={18} className="text-indigo-400" />
          Practice This Topic
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {practiceLinks.map(({ icon: Icon, label, href, color, desc }) => (
            <Link
              key={label}
              href={href}
              className="card p-4 flex flex-col items-center gap-2 text-center group hover:border-white/15 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Complete & Next ──────────────────────────────── */}
      <div className="card p-5 border-indigo-500/20 bg-indigo-500/3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-white">Done with this subtopic? ✅</p>
          <p className="text-xs text-slate-500 mt-0.5">Practice करो → Test दो → Next subtopic pe jao</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/topics/${topicSlug}/${subtopicSlug}/practice`}
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
          >
            <Target size={14} /> Start Practice
          </Link>
          <Link
            href={`/topics/${topicSlug}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2.5"
          >
            Back <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
