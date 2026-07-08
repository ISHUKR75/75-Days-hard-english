'use client';
// ============================================================
// READING LAB — Comprehension passages, articles, stories
// Features: Different levels, timed reading, comprehension Qs
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, CheckCircle2, XCircle, Eye, ChevronDown, ArrowRight } from 'lucide-react';
import useUserStore from '@/store/userStore';

const READINGS = [
  {
    id: 1, level: 'A1', category: 'Daily Life', readTime: 2,
    title: 'Rahul\'s Morning',
    passage: `Rahul wakes up at 6 AM every day. He brushes his teeth and takes a shower. Then he eats breakfast with his family. He drinks a glass of milk every morning. His mother cooks breakfast for them.

After breakfast, Rahul goes to work. He takes the bus to his office. The journey takes 30 minutes. At the office, he works on his computer. He finishes work at 6 PM and comes home.

In the evening, Rahul reads books or watches TV. He goes to bed at 10 PM. Rahul follows this routine every day. He believes that a good routine makes life better.`,
    questions: [
      { q: 'What time does Rahul wake up?', options: ['5 AM', '6 AM', '7 AM', '8 AM'], correct: 1 },
      { q: 'How does Rahul go to his office?', options: ['By car', 'By train', 'By bus', 'By bicycle'], correct: 2 },
      { q: 'How long does the journey to office take?', options: ['15 min', '20 min', '30 min', '45 min'], correct: 2 },
      { q: 'What time does Rahul finish work?', options: ['4 PM', '5 PM', '6 PM', '7 PM'], correct: 2 },
      { q: 'What does Rahul do in the evening?', options: ['Goes out', 'Reads or watches TV', 'Studies', 'Exercises'], correct: 1 },
    ]
  },
  {
    id: 2, level: 'A2', category: 'Workplace', readTime: 3,
    title: 'A Day at the Office',
    passage: `Priya is a software engineer at a technology company in Bangalore. She starts her workday at 9 AM. The first thing she does is check her emails and respond to important messages.

At 10 AM, she attends the daily standup meeting. Each team member gives a brief update about their work. Priya tells her team what she completed the previous day and what she plans to do today.

After the meeting, she spends most of her time writing code and reviewing her colleagues' work. She takes a 30-minute lunch break at 1 PM. In the afternoon, she sometimes has client calls to discuss project requirements.

Priya enjoys her job because she learns something new every day. She believes that communication is just as important as technical skills in the software industry.`,
    questions: [
      { q: 'Where does Priya work?', options: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'], correct: 2 },
      { q: 'What is the purpose of the standup meeting?', options: ['Interview', 'Brief work updates', 'Lunch', 'Training'], correct: 1 },
      { q: 'How long is Priya\'s lunch break?', options: ['15 min', '30 min', '1 hour', '45 min'], correct: 1 },
      { q: 'What does Priya do in the afternoon sometimes?', options: ['Meetings', 'Client calls', 'Training', 'Shopping'], correct: 1 },
      { q: 'Why does Priya enjoy her job?', options: ['High salary', 'She learns daily', 'Free food', 'Short hours'], correct: 1 },
    ]
  },
  {
    id: 3, level: 'B1', category: 'Education', readTime: 4,
    title: 'The Power of Learning English',
    passage: `In today's globalized world, English has become the most widely spoken language for international communication. Whether in business meetings, academic conferences, or casual travel, the ability to speak English fluently opens countless doors.

Studies show that professionals who are fluent in English earn, on average, 30–40% more than those who are not. This is particularly significant in countries like India, where English proficiency is often considered a key indicator of educational achievement and professional competence.

However, learning a language is not just about career benefits. English gives you access to the largest collection of books, research papers, films, and online resources in the world. It allows you to connect with people from over 100 countries.

Many people believe that it is difficult to learn English after childhood. While children do acquire languages more naturally, adults can learn effectively with the right methods — consistent practice, exposure to authentic content, and a willingness to make mistakes and learn from them.

The key is not perfection, but progress. Even a few correct sentences can build confidence and open conversations.`,
    questions: [
      { q: 'How much more can English-fluent professionals earn on average?', options: ['10-20%', '20-30%', '30-40%', '50-60%'], correct: 2 },
      { q: 'What does English give access to according to the passage?', options: ['More jobs', 'Books, films, research', 'Free travel', 'Better health'], correct: 1 },
      { q: 'How many countries can English connect you with?', options: ['50', '75', '100+', '200'], correct: 2 },
      { q: 'What do many people believe about learning English?', options: ['It is easy', 'Difficult after childhood', 'Only for children', 'Impossible for adults'], correct: 1 },
      { q: 'What does the author say is the key to learning?', options: ['Perfect grammar', 'Expensive courses', 'Progress not perfection', 'Native tutors'], correct: 2 },
    ]
  },
  {
    id: 4, level: 'B2', category: 'Business', readTime: 5,
    title: 'The Art of Professional Communication',
    passage: `Effective communication is perhaps the most valuable skill in any professional setting. Research by the National Association of Colleges and Employers consistently ranks communication as the top attribute that employers look for when hiring new graduates.

But what exactly does professional communication mean? At its core, it involves the ability to convey information clearly, listen actively, and adapt your message to your audience. A presentation to a board of directors requires very different language and structure than a casual conversation with a colleague.

Written communication has become increasingly important in the digital age. Emails, reports, proposals, and instant messages now form the backbone of office communication. A well-written email can build credibility and trust, while a poorly written one can damage professional relationships and create misunderstandings.

One often overlooked aspect of professional communication is active listening — the practice of fully concentrating on what is being said rather than merely waiting for your turn to speak. Studies suggest that most people only remember about 25-50% of what they hear.

The good news is that communication skills can be developed through deliberate practice. Reading widely, writing regularly, seeking feedback, and engaging in meaningful conversations are all effective strategies for improvement.`,
    questions: [
      { q: 'What does NACE consistently rank as the top employer requirement?', options: ['Technical skills', 'Communication', 'Experience', 'Education'], correct: 1 },
      { q: 'What does professional communication involve at its core?', options: ['Just speaking clearly', 'Convey, listen, adapt', 'Writing only', 'Public speaking'], correct: 1 },
      { q: 'What percentage of what they hear do people typically remember?', options: ['5-10%', '15-20%', '25-50%', '75-80%'], correct: 2 },
      { q: 'What is active listening described as?', options: ['Speaking confidently', 'Waiting to speak', 'Fully concentrating on what is said', 'Taking notes'], correct: 2 },
      { q: 'Which is NOT mentioned as a strategy to improve communication?', options: ['Reading widely', 'Seeking feedback', 'Attending conferences', 'Writing regularly'], correct: 2 },
    ]
  },
];

// ── Question Card ────────────────────────────────────────────
function ComprehensionQuestions({ questions }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const { addXP } = useUserStore();
  const score = Object.entries(answers).filter(([i, a]) => questions[parseInt(i)].correct === a).length;

  const handleCheck = () => {
    setChecked(true);
    addXP(score * 10);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <div key={i} className="card p-4">
          <p className="font-semibold text-white text-sm mb-3">Q{i + 1}: {q.q}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, j) => (
              <button key={j} disabled={checked}
                onClick={() => setAnswers(prev => ({ ...prev, [i]: j }))}
                className={`text-left px-3 py-2.5 rounded-xl text-sm border transition-all ${
                  checked
                    ? j === q.correct ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-200'
                    : answers[i] === j ? 'bg-rose-500/15 border-rose-500/35 text-rose-200'
                    : 'bg-white/3 border-white/6 text-slate-500 opacity-50'
                    : answers[i] === j ? 'bg-primary-500/15 border-primary-500/35 text-primary-300'
                    : 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/8'
                }`}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + j)}.</span>{opt}
                {checked && j === q.correct && <CheckCircle2 size={14} className="inline ml-2 text-emerald-400" />}
                {checked && answers[i] === j && j !== q.correct && <XCircle size={14} className="inline ml-2 text-rose-400" />}
              </button>
            ))}
          </div>
        </div>
      ))}
      {!checked ? (
        <button onClick={handleCheck} disabled={Object.keys(answers).length < questions.length}
          className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-40">
          Check Answers ({Object.keys(answers).length}/{questions.length} answered)
        </button>
      ) : (
        <div className={`p-4 rounded-xl text-center font-bold text-lg ${score === questions.length ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
          {score}/{questions.length} Correct — {Math.round((score/questions.length)*100)}% — +{score * 10} XP
        </div>
      )}
    </div>
  );
}

export default function ReadingLabPage() {
  const [activeReading, setActiveReading] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [levelFilter, setLevelFilter] = useState('All');
  const { addXP } = useUserStore();

  const LEVELS = ['All', 'A1', 'A2', 'B1', 'B2'];
  const filtered = levelFilter === 'All' ? READINGS : READINGS.filter(r => r.level === levelFilter);
  const LEVEL_COLORS = { A1:'text-emerald-400 bg-emerald-500/10', A2:'text-sky-400 bg-sky-500/10', B1:'text-violet-400 bg-violet-500/10', B2:'text-amber-400 bg-amber-500/10' };

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-white mb-1">📖 Reading Lab</h1>
        <p className="text-slate-400">Read passages, answer comprehension questions, build vocabulary</p>
      </motion.div>

      {!activeReading ? (
        <>
          {/* Level filter */}
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => setLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  levelFilter === lvl ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'
                }`}>
                {lvl}
              </button>
            ))}
          </div>

          {/* Reading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((reading, i) => (
              <motion.div key={reading.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }} className="card p-5 cursor-pointer group"
                onClick={() => { setActiveReading(reading); setShowQuestions(false); addXP(5); }}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${LEVEL_COLORS[reading.level]}`}>{reading.level}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={11} /> {reading.readTime} min read
                  </div>
                </div>
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary-300 transition-colors">{reading.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{reading.category} · {reading.questions.length} questions</p>
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">{reading.passage.slice(0, 120)}…</p>
                <div className="flex items-center gap-1 mt-4 text-xs text-primary-400">
                  Start Reading <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-3xl space-y-5">
          {/* Back */}
          <button onClick={() => setActiveReading(null)} className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
            ← Back to Reading Lab
          </button>

          {/* Passage */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${LEVEL_COLORS[activeReading.level]}`}>{activeReading.level}</span>
              <span className="text-xs text-slate-500">{activeReading.category}</span>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={11} /> {activeReading.readTime} min</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-5">{activeReading.title}</h2>
            <div className="prose prose-invert text-slate-300 text-sm leading-loose whitespace-pre-line">
              {activeReading.passage}
            </div>
          </div>

          {/* Comprehension toggle */}
          <button onClick={() => setShowQuestions(v => !v)}
            className="w-full flex items-center justify-between p-4 card hover:border-white/20 transition-all text-sm font-semibold text-white">
            <span>📝 Comprehension Questions ({activeReading.questions.length})</span>
            <ChevronDown size={16} className={`text-slate-500 transition-transform ${showQuestions ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showQuestions && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ComprehensionQuestions questions={activeReading.questions} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
