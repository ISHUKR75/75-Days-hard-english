// ============================================================
// ReadingSection.js — Rich Reading Comprehension Experience
// Multiple passages, difficulty levels, MCQ comprehension,
// vocabulary highlights, timed reading, score tracker. 📰
// ============================================================

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  BookOpen, CheckCircle2, XCircle, ChevronLeft, ChevronRight,
  Clock, Target, Trophy, Zap, Eye, EyeOff, TrendingUp,
  Star, Volume2, Lightbulb, BarChart3
} from 'lucide-react';

// ── TTS helper ─────────────────────────────────────────────────
function speak(text, rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

// ── Sound feedback ─────────────────────────────────────────────
function playSound(correct) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (correct) { o.type = 'sine'; o.frequency.value = 880; }
    else { o.type = 'sawtooth'; o.frequency.value = 220; }
    g.gain.setValueAtTime(0.1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch (_) {}
}

// ── Blobs ─────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-rose-600/12 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Built-in Day 1 reading passages ───────────────────────────
const PASSAGES = [
  {
    id: 'p1',
    title: 'The Power of English',
    level: 'Beginner',
    levelColor: 'emerald',
    readTime: '3 min',
    hindiContext: 'यह एक आसान passage है English की importance के बारे में।',
    text: `English is the most widely spoken language in the world today. More than 1.5 billion people speak or use English in their daily lives. It is the official language of more than 60 countries and is used in international business, science, technology, and education.

Learning English opens many doors. It helps you get better jobs and higher salaries. Companies prefer employees who can communicate in English because it helps them work with international clients and partners. Many top universities and research institutions publish their work in English, so knowing the language gives you access to the world's best knowledge.

In the age of the internet, most online content is in English. By learning English, you can access millions of websites, watch educational videos, take online courses, and connect with people from around the world.

English is not just a language — it is an investment in your future. Every minute you spend learning English is a step toward a better career, better opportunities, and a more confident life. So start today, stay consistent, and never give up!`,
    vocab: [
      { word: 'widely', meaning: 'over a large area; by many people' },
      { word: 'official', meaning: 'recognized by a government or authority' },
      { word: 'international', meaning: 'between different countries' },
      { word: 'consistent', meaning: 'always doing the same way; regular' },
      { word: 'access', meaning: 'ability to use or enter something' },
    ],
    questions: [
      { q: 'How many people speak or use English daily?', options: ['500 million', '1 billion', '1.5 billion', '2 billion'], answer: '1.5 billion', explanation: 'The passage says "more than 1.5 billion people speak or use English in their daily lives."' },
      { q: 'Why do companies prefer English-speaking employees?', options: ['They look smarter', 'It helps with international clients', 'It is a company rule', 'The government requires it'], answer: 'It helps with international clients', explanation: 'The passage states companies prefer English speakers because it "helps them work with international clients and partners."' },
      { q: 'What does the author say English is — beyond just a language?', options: ['A hobby', 'A waste of time', 'An investment in your future', 'A school requirement'], answer: 'An investment in your future', explanation: '"English is not just a language — it is an investment in your future."' },
      { q: 'What is a benefit of knowing English on the internet?', options: ['You can play games', 'You can access millions of websites and courses', 'You can download movies', 'You get faster internet'], answer: 'You can access millions of websites and courses', explanation: 'The passage mentions "access millions of websites, watch educational videos, take online courses."' },
    ]
  },
  {
    id: 'p2',
    title: 'Morning Habits of Successful People',
    level: 'Elementary',
    levelColor: 'blue',
    readTime: '4 min',
    hindiContext: 'यह passage successful लोगों की morning habits के बारे में है।',
    text: `Have you ever wondered why some people seem to accomplish more in a single day than others do in a week? The secret often lies in their morning routine. Research shows that how you start your morning greatly influences your productivity and mood for the rest of the day.

Most successful people wake up early — typically between 5 and 6 AM. Apple CEO Tim Cook reportedly wakes up at 3:45 AM, while Oprah Winfrey wakes up around 6 AM. This early start gives them quiet time to plan, reflect, and exercise before the world wakes up.

Exercise is a critical component of successful mornings. A 20-30 minute workout, whether it's a walk, yoga, or weight training, releases endorphins that improve mood and mental clarity. Studies show that people who exercise in the morning are 25% more productive during the day.

Reading or learning something new in the morning is another powerful habit. Just 20 minutes of reading each morning — especially non-fiction or self-improvement books — compounds significantly over time. Reading 20 minutes daily means reading 18 to 20 books per year.

Finally, successful people also practice gratitude. Taking just 5 minutes to write down three things you are grateful for shifts your mindset from scarcity to abundance and sets a positive tone for the entire day.

You don't need to follow every habit instantly. Start with one — wake up 30 minutes earlier tomorrow and use that time to read or exercise. Small steps, taken consistently, lead to extraordinary results.`,
    vocab: [
      { word: 'accomplish', meaning: 'to successfully complete something' },
      { word: 'productivity', meaning: 'the efficiency of producing results' },
      { word: 'component', meaning: 'an important part of something' },
      { word: 'compounds', meaning: 'increases over time; grows in effect' },
      { word: 'gratitude', meaning: 'the feeling of being thankful' },
      { word: 'abundance', meaning: 'having more than enough of something' },
    ],
    questions: [
      { q: 'What time does Tim Cook reportedly wake up?', options: ['4:00 AM', '3:45 AM', '5:00 AM', '6:30 AM'], answer: '3:45 AM', explanation: '"Apple CEO Tim Cook reportedly wakes up at 3:45 AM"' },
      { q: 'By how much does morning exercise improve daytime productivity?', options: ['10%', '15%', '25%', '35%'], answer: '25%', explanation: '"People who exercise in the morning are 25% more productive during the day."' },
      { q: 'How many books can you read in a year with just 20 minutes of daily reading?', options: ['5-8 books', '10-12 books', '18-20 books', '25-30 books'], answer: '18-20 books', explanation: '"Reading 20 minutes daily means reading 18 to 20 books per year."' },
      { q: 'What does practicing gratitude do for successful people?', options: ['Helps them sleep', 'Shifts mindset from scarcity to abundance', 'Gives them more energy', 'Helps them remember dreams'], answer: 'Shifts mindset from scarcity to abundance', explanation: '"Taking just 5 minutes to write down three things you are grateful for shifts your mindset from scarcity to abundance."' },
      { q: 'What is the author\'s advice for starting new habits?', options: ['Change everything at once', 'Follow all habits immediately', 'Start with one small step consistently', 'Wait until you feel ready'], answer: 'Start with one small step consistently', explanation: '"Start with one... Small steps, taken consistently, lead to extraordinary results."' },
    ]
  },
  {
    id: 'p3',
    title: 'The Story of a Young Entrepreneur',
    level: 'Intermediate',
    levelColor: 'violet',
    readTime: '5 min',
    hindiContext: 'यह एक inspiring story है एक young entrepreneur के बारे में।',
    text: `Arjun was 24 years old when he decided to quit his stable government job and start his own business. Everyone around him thought he was making a big mistake. "You have such a secure job," his father said. "Why would you throw that away?" But Arjun had a different vision. He had noticed that small shop owners in his town struggled to reach customers outside their neighborhood, and he wanted to help them.

He started with just ₹50,000 — money he had saved over two years — and a simple website that allowed local businesses to list their products online. In the beginning, it was incredibly difficult. He worked 14-16 hours a day, handled customer complaints himself, and even delivered products on his bicycle when delivery partners failed to show up.

Six months in, he was nearly ready to give up. His savings were running out, and he had made just ₹12,000 in total revenue. But then something changed. A local newspaper wrote a story about his platform, and overnight, 200 new businesses signed up. Within a year, he had 2,000 businesses on his platform and was processing over ₹30 lakh in transactions every month.

Today, Arjun employs 45 people and has expanded to 12 cities across India. He says the most important lesson he learned was this: "The moment you almost give up is always the darkest moment before the dawn. If you can push through that, everything changes."

His story is a reminder that success does not come without struggle. But if you have a clear purpose, stay committed, and refuse to quit at the most difficult moment — extraordinary things can happen.`,
    vocab: [
      { word: 'entrepreneur', meaning: 'a person who starts and runs a business' },
      { word: 'stable', meaning: 'firm, not likely to change suddenly' },
      { word: 'vision', meaning: 'a clear idea of what you want the future to be' },
      { word: 'revenue', meaning: 'money earned by a business' },
      { word: 'transactions', meaning: 'business deals; buying and selling' },
      { word: 'committed', meaning: 'dedicated and loyal to a goal or cause' },
    ],
    questions: [
      { q: 'What problem did Arjun notice that led him to start his business?', options: ['Too many delivery companies', 'Small shops couldn\'t reach outside customers', 'No websites existed in India', 'Government jobs were unfair'], answer: 'Small shops couldn\'t reach outside customers', explanation: '"Small shop owners in his town struggled to reach customers outside their neighborhood."' },
      { q: 'How much money did Arjun start his business with?', options: ['₹10,000', '₹25,000', '₹50,000', '₹1 lakh'], answer: '₹50,000', explanation: '"He started with just ₹50,000 — money he had saved over two years."' },
      { q: 'What event dramatically changed his business prospects?', options: ['He got a bank loan', 'A newspaper wrote about his platform', 'He hired experienced managers', 'He got an investor'], answer: 'A newspaper wrote about his platform', explanation: '"A local newspaper wrote a story about his platform, and overnight, 200 new businesses signed up."' },
      { q: 'What is Arjun\'s most important lesson from his journey?', options: ['Money is everything', 'Always keep your government job', 'The darkest moment before dawn is when you almost give up — push through it', 'Never work more than 8 hours'], answer: 'The darkest moment before dawn is when you almost give up — push through it', explanation: '"The moment you almost give up is always the darkest moment before the dawn. If you can push through that, everything changes."' },
    ]
  },
];

// ── Reading passage component ────────────────────────────────
function PassageReader({ passage }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [showVocab, setShowVocab] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const correct = passage.questions.filter((q, i) => answers[i] === q.answer).length;
  const attempted = Object.keys(answers).length;
  const score = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const levelColors = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  };

  const handleAnswer = (qi, opt) => {
    if (answers[qi]) return;
    const isCorrect = opt === passage.questions[qi].answer;
    setAnswers(p => ({ ...p, [qi]: opt }));
    setRevealed(p => ({ ...p, [qi]: true }));
    playSound(isCorrect);
  };

  const handleReadAloud = () => {
    if (isReading) { window.speechSynthesis?.cancel(); setIsReading(false); return; }
    setIsReading(true);
    speak(passage.text, 0.9);
    // Estimate duration
    const dur = passage.text.split(' ').length * 0.5 * 1000;
    setTimeout(() => setIsReading(false), dur);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelColors[passage.levelColor]}`}>
              {passage.level}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} /> {passage.readTime}
            </div>
          </div>
          <h3 className="text-white font-black text-lg">{passage.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{passage.hindiContext}</p>
        </div>
        <button onClick={handleReadAloud}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            isReading ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-white/10 text-gray-300 border border-white/10 hover:bg-rose-500/20 hover:text-rose-300'
          }`}>
          <Volume2 size={14} />
          {isReading ? 'Stop Reading' : 'Read Aloud'}
        </button>
      </div>

      {/* Passage text */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {passage.text.split('\n\n').map((para, i) => (
          <p key={i} className="text-gray-200 text-sm leading-8 mb-4 last:mb-0">{para}</p>
        ))}
      </div>

      {/* Vocabulary toggle */}
      <button onClick={() => setShowVocab(p => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm font-medium text-amber-300 hover:bg-amber-500/15 transition-all">
        <div className="flex items-center gap-2">
          <BookOpen size={15} />
          Key Vocabulary ({passage.vocab.length} words)
        </div>
        {showVocab ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>

      <AnimatePresence>
        {showVocab && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {passage.vocab.map((v, i) => (
                <div key={i} className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3 flex items-start gap-2">
                  <button onClick={() => speak(v.word, 0.75)} className="text-amber-400 flex-shrink-0 mt-0.5 hover:text-amber-300 transition-colors">
                    <Volume2 size={13} />
                  </button>
                  <div>
                    <p className="text-amber-300 font-bold text-sm">{v.word}</p>
                    <p className="text-gray-400 text-xs">{v.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score bar */}
      {attempted > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">Score: {correct}/{attempted} correct</span>
          <span className={`text-sm font-black ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-blue-400' : 'text-amber-400'}`}>{score}%</span>
        </div>
      )}

      {/* Comprehension questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          <Target size={12} />
          Comprehension Questions ({passage.questions.length})
        </div>

        {passage.questions.map((q, qi) => {
          const selectedAnswer = answers[qi];
          const isAnswered = !!selectedAnswer;

          return (
            <div key={qi} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-white text-sm font-semibold">
                <span className="text-gray-500 mr-2">Q{qi + 1}.</span>{q.q}
              </p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === q.answer;
                  let cls = 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 cursor-pointer';
                  if (isAnswered) {
                    if (isCorrect) cls = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200';
                    else if (isSelected) cls = 'bg-red-500/20 border-red-500/40 text-red-200';
                    else cls = 'bg-white/5 border-white/10 text-gray-500 opacity-50';
                  }
                  return (
                    <button key={oi} onClick={() => handleAnswer(qi, opt)} disabled={isAnswered}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${cls}`}>
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle size={14} className="text-red-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {revealed[qi] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className={`overflow-hidden text-xs p-3 rounded-xl ${
                      answers[qi] === q.answer ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                    }`}>
                    <strong>{answers[qi] === q.answer ? '🎉 Correct! ' : '💡 Explanation: '}</strong>{q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Final score */}
      {attempted === passage.questions.length && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className={`p-5 rounded-2xl border text-center ${
            score >= 80 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30'
          }`}>
          <div className="text-4xl mb-2">{score >= 80 ? '🏆' : score >= 60 ? '🎯' : '💪'}</div>
          <p className="text-white font-black text-xl">{score}% — {correct}/{passage.questions.length} correct</p>
          <p className="text-gray-400 text-sm mt-1">
            {score >= 80 ? 'Excellent comprehension! You understood this passage very well.' : score >= 60 ? 'Good! Re-read any tricky parts and try again.' : 'Keep going! Reading improves with every passage you complete.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function ReadingSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const rawPassages = data?.reading?.passages;
  const passages = (rawPassages && rawPassages.length > 0) ? rawPassages : PASSAGES;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [activeTab, setActiveTab] = useState('read');

  const current = passages[currentIdx];

  const markComplete = (id) => {
    if (completedPassages.has(id)) return;
    setCompletedPassages(p => new Set([...p, id]));
    addXP(15, 'Completed reading passage!');
    recordQuestionResult(`reading-day${dayNum}-${id}`, true);
  };

  const READING_TIPS = [
    { emoji: '👀', title: 'Read the questions FIRST', desc: 'Before reading the passage, skim the questions. This tells your brain what information to look for while reading — saves time!' },
    { emoji: '📍', title: 'Find keywords, not full sentences', desc: 'Look for important words (names, numbers, dates) in the passage rather than reading every word slowly.' },
    { emoji: '🔄', title: 'Read actively — not passively', desc: 'Passive reading = eyes moving but mind wandering. Active reading = asking "what is the main point here?" after each paragraph.' },
    { emoji: '📝', title: 'Summarize in one sentence', desc: 'After reading, try to summarize the entire passage in one sentence. If you can do that, you understood it well.' },
    { emoji: '📚', title: 'Read every day — even 10 minutes', desc: 'Read a newspaper, blog, or book in English daily. Reading speed and comprehension improve dramatically with just 10 minutes/day of consistent practice.' },
    { emoji: '🎯', title: 'Learn new words from context', desc: 'Don\'t stop to look up every unknown word. Try to guess its meaning from context first — this is how native readers process text.' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">📰</div>
              <div>
                <h1 className="text-white font-black text-2xl">Reading Comprehension</h1>
                <p className="text-gray-400 text-sm mt-0.5">Padho, samjho, aur jawab do! 📖</p>
              </div>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-rose-400">{completedPassages.size}/{passages.length}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"
                animate={{ width: `${(completedPassages.size / passages.length) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>
        </motion.div>

        {/* ── TABS ─────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5">
          {[
            { id: 'read', label: '📰 Reading', shortLabel: 'Read' },
            { id: 'tips', label: '💡 Tips & Strategy', shortLabel: 'Tips' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'read' && (
            <motion.div key="read" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {/* Passage navigator */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3">
                <button onClick={() => setCurrentIdx(p => Math.max(0, p - 1))} disabled={currentIdx === 0}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft size={16} /> Prev
                </button>
                <div className="flex gap-2">
                  {passages.map((_, i) => (
                    <button key={i} onClick={() => setCurrentIdx(i)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                        i === currentIdx ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : completedPassages.has(passages[i]?.id) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}>
                      {completedPassages.has(passages[i]?.id) ? '✓' : i + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCurrentIdx(p => Math.min(passages.length - 1, p + 1))} disabled={currentIdx === passages.length - 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  Next <ChevronRight size={16} />
                </button>
              </div>

              {/* Current passage */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <PassageReader key={current?.id || currentIdx} passage={current || PASSAGES[0]} />
              </div>

              {/* Mark complete */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => { markComplete(current?.id || currentIdx); if (currentIdx < passages.length - 1) setCurrentIdx(p => p + 1); }}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedPassages.has(current?.id || currentIdx) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-500/20'
                }`}>
                {completedPassages.has(current?.id || currentIdx) ? '✓ Passage Complete — Next Passage!' : `✓ Mark Passage ${currentIdx + 1} as Done (+15 XP)`}
              </motion.button>
            </motion.div>
          )}

          {activeTab === 'tips' && (
            <motion.div key="tips" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5">
                <p className="text-rose-300 font-semibold text-sm mb-2">📰 Reading Comprehension Strategy</p>
                <p className="text-gray-400 text-sm">These are the techniques used by top English learners and exam takers. Master them and your reading speed AND accuracy will skyrocket!</p>
              </div>
              {READING_TIPS.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{tip.emoji}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1.5">{tip.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
