'use client';
// Listening Lab — Complete listening practice with exercises, dictation, comprehension
// Real exercises with conversations, passages, and fill-in-the-blank

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Headphones, Play, Pause, Volume2, CheckCircle2, XCircle,
  ChevronRight, Star, Target, BookOpen, Zap, ArrowRight,
  RefreshCw, Eye, EyeOff, Award,
} from 'lucide-react';

// ── Listening Categories ──────────────────────────────────────
const CATEGORIES = [
  { id:'daily',    label:'Daily Life',       emoji:'🏠', desc:'Everyday conversations at home, market, and neighbourhood' },
  { id:'office',   label:'Office & Work',    emoji:'💼', desc:'Meetings, calls, presentations, workplace conversations' },
  { id:'travel',   label:'Travel',           emoji:'✈️', desc:'Airport, hotel, railway — travel English' },
  { id:'academic', label:'Academic',         emoji:'📚', desc:'Lectures, discussions, educational conversations' },
  { id:'news',     label:'News & Media',     emoji:'📺', desc:'News reports, interviews, announcements' },
];

// ── Listening Exercises ───────────────────────────────────────
const EXERCISES = {
  daily: [
    {
      id:'d1',
      title:'At the Grocery Store',
      level:'A1',
      duration:'1:30',
      script:`
Customer: Excuse me, where can I find the milk?
Shopkeeper: It's in aisle 3, right next to the bread section.
Customer: Thank you. And do you have fresh yogurt?
Shopkeeper: Yes, we do. It's on the same shelf, at the back.
Customer: Great! How much is this pack of cheese?
Shopkeeper: That's 150 rupees. We also have a buy-one-get-one offer today.
Customer: Perfect! I'll take two then. Can I also get a carry bag?
Shopkeeper: Sure, carry bags are 5 rupees each.
Customer: No problem. I'll take one. Thank you so much!
Shopkeeper: My pleasure! Have a great day.
      `.trim(),
      questions:[
        { q:'Where is the milk?',                      a:'In aisle 3, next to bread' },
        { q:'What offer is available today?',           a:'Buy-one-get-one' },
        { q:'How much does the cheese cost?',           a:'150 rupees' },
        { q:'How much does a carry bag cost?',          a:'5 rupees' },
      ],
      blanks:[
        { sentence:'The milk is in aisle ___, right next to the ___ section.', answers:['3','bread'] },
        { sentence:'We have a buy-one-get-___ offer today.', answers:['one'] },
        { sentence:'Carry bags are ___ rupees each.', answers:['5'] },
      ],
      vocabulary:['Aisle','Yogurt','Section','Carry bag','Offer'],
    },
    {
      id:'d2',
      title:'Planning a Weekend',
      level:'A2',
      duration:'2:00',
      script:`
Priya: Hey Rahul! Are you free this weekend?
Rahul: Yes, actually. No plans yet. What are you thinking?
Priya: I was thinking we could go to that new café near the park. They have really good coffee.
Rahul: That sounds nice. What time were you thinking?
Priya: Maybe around 11 in the morning? We could have brunch there.
Rahul: Perfect! Should I invite Ankit and Sara as well?
Priya: Absolutely! The more the merrier. Can you message them?
Rahul: Sure, I'll send them a WhatsApp message right now.
Priya: Great! And if the weather is good, maybe we can walk through the park after?
Rahul: I love that idea. It's been ages since we all hung out together.
Priya: Exactly! See you Saturday then?
Rahul: Looking forward to it!
      `.trim(),
      questions:[
        { q:'Where does Priya want to go?',            a:'A new café near the park' },
        { q:'What time are they meeting?',             a:'Around 11 in the morning' },
        { q:'Who will Rahul invite?',                  a:'Ankit and Sara' },
        { q:'What might they do after the café?',      a:'Walk through the park' },
      ],
      blanks:[
        { sentence:'I was thinking we could go to the new ___ near the ___.',  answers:['café','park'] },
        { sentence:'Maybe around ___ in the morning? We could have ___ there.', answers:['11','brunch'] },
        { sentence:'The ___ the ___.', answers:['more','merrier'] },
      ],
      vocabulary:['Brunch','Merrier','Invite','Ages','Looking forward to'],
    },
  ],
  office: [
    {
      id:'o1',
      title:'Project Status Meeting',
      level:'B1',
      duration:'3:00',
      script:`
Manager: Good morning everyone. Let's get started. Priya, can you give us a quick update on the website project?
Priya: Of course. We've completed the design phase and started development. We're currently about 60% done with the backend.
Manager: Great progress! Any blockers or challenges?
Priya: We had an issue with the database integration, but Amit resolved it yesterday. We should be back on track.
Manager: Excellent work, Amit. What's the expected timeline for completion?
Priya: We're targeting the end of next week for the first working demo.
Manager: That aligns with the client's expectation. What about testing?
Priya: We've planned two days for testing after the demo. So the final delivery would be around the 15th.
Manager: Perfect. Let's make sure we document everything properly. Any other updates?
Amit: I wanted to mention that we might need extra support for the payment gateway integration.
Manager: Noted. I'll arrange for an additional resource. Keep up the good work, team!
      `.trim(),
      questions:[
        { q:'What phase has been completed?',                   a:'Design phase' },
        { q:'What percentage of the backend is done?',          a:'60%' },
        { q:'Who resolved the database issue?',                 a:'Amit' },
        { q:'When is the first working demo targeted?',         a:'End of next week' },
        { q:'How many days are planned for testing?',           a:'Two days' },
      ],
      blanks:[
        { sentence:"We're currently about ___% done with the ___.", answers:['60','backend'] },
        { sentence:'We\'re targeting the end of next ___ for the first working ___.', answers:['week','demo'] },
        { sentence:'The final ___ would be around the ___.', answers:['delivery','15th'] },
      ],
      vocabulary:['Status update','Blocker','Timeline','Integration','Resource','Demo'],
    },
  ],
  travel: [
    {
      id:'t1',
      title:'At the Airport Check-in',
      level:'A2',
      duration:'2:30',
      script:`
Passenger: Hello, I'd like to check in for flight AI302 to Delhi.
Agent: Of course! May I see your passport and booking confirmation?
Passenger: Sure, here you go.
Agent: Thank you, Mr. Sharma. You have one checked bag and one carry-on, correct?
Passenger: Yes, that's right. Can I get a window seat if possible?
Agent: Let me check... Yes, I can assign you seat 22A. It's a window seat.
Passenger: That's perfect, thank you!
Agent: Your flight is boarding at Gate 7B. Boarding begins at 14:30, so please be at the gate by 14:15.
Passenger: Do I need to remove my laptop at security?
Agent: Yes, please remove all electronics and liquids from your bag at the security checkpoint.
Passenger: Got it. And how much luggage can I check in?
Agent: Your allowance is 23 kilograms for checked baggage. Your bag appears to be within that limit.
Passenger: Wonderful! Thank you for your help.
Agent: Have a pleasant flight, Mr. Sharma!
      `.trim(),
      questions:[
        { q:'What flight is the passenger checking in for?',     a:'AI302 to Delhi' },
        { q:'What seat was assigned to the passenger?',          a:'22A — window seat' },
        { q:'At which gate does the flight board?',              a:'Gate 7B' },
        { q:'What is the checked baggage allowance?',            a:'23 kilograms' },
      ],
      blanks:[
        { sentence:'Your flight is boarding at Gate ___. Boarding begins at ___, so please be at the gate by ___.', answers:['7B','14:30','14:15'] },
        { sentence:'Please remove all ___ and ___ from your bag at the security checkpoint.', answers:['electronics','liquids'] },
      ],
      vocabulary:['Check-in','Boarding pass','Carry-on','Security checkpoint','Allowance','Gate'],
    },
  ],
};

// ── Dictation Exercises ───────────────────────────────────────
const DICTATION_SENTENCES = [
  { text:'The meeting has been rescheduled to Monday morning.',   level:'A2', topic:'Office' },
  { text:'Please submit the report before the end of the day.',   level:'A2', topic:'Office' },
  { text:'I would like to book a table for four people please.',  level:'A2', topic:'Restaurant' },
  { text:'Could you please repeat that more slowly?',             level:'A1', topic:'Communication' },
  { text:'The flight is delayed by approximately two hours.',     level:'B1', topic:'Travel' },
  { text:'We need to finalize the budget before the presentation.',level:'B1', topic:'Business' },
  { text:'I apologize for the inconvenience caused.',             level:'B1', topic:'Formal' },
  { text:'The project deadline has been extended by one week.',   level:'B1', topic:'Work' },
];

// ── Comprehension Quiz Component ──────────────────────────────
function ComprehensionQuiz({ exercise, onClose }) {
  const [answers, setAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);

  const submit = () => {
    let correct = 0;
    exercise.questions.forEach((q, i) => {
      if (answers[i]?.trim().toLowerCase().includes(q.a.toLowerCase().split(' ')[0])) correct++;
    });
    setScore(correct);
    setShowAnswers(true);
  };

  return (
    <div className="space-y-5">
      {/* Script */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white">Conversation Transcript</h4>
        </div>
        <pre className="p-4 rounded-xl bg-white/5 border border-white/8 text-sm text-slate-400 whitespace-pre-wrap leading-relaxed font-sans overflow-auto max-h-48">
          {exercise.script}
        </pre>
      </div>

      {/* Questions */}
      <div>
        <h4 className="text-sm font-bold text-white mb-3">Comprehension Questions</h4>
        <div className="space-y-3">
          {exercise.questions.map((q, i) => (
            <div key={i}>
              <p className="text-sm text-slate-300 mb-1.5">{i + 1}. {q.q}</p>
              {showAnswers ? (
                <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${
                  answers[i]?.trim() ? 'bg-green-500/8 border border-green-500/20 text-green-300' : 'bg-white/5 border border-white/8 text-slate-400'
                }`}>
                  <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                  Answer: {q.a}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[i] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                  placeholder="Type your answer..."
                  className="input text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {!showAnswers ? (
        <button onClick={submit} className="btn-primary w-full flex items-center justify-center gap-2">
          Submit Answers <CheckCircle2 size={16} />
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-between">
          <div>
            <p className="font-bold text-white">Score: {score}/{exercise.questions.length}</p>
            <p className="text-sm text-slate-400">{score === exercise.questions.length ? '🎉 Perfect!' : 'Keep practicing!'}</p>
          </div>
          <button onClick={onClose} className="btn-primary text-sm px-4 py-2">Done</button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function ListeningLabPage() {
  const [activeCategory, setActiveCategory] = useState('daily');
  const [activeTab, setActiveTab]           = useState('exercises');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showScript, setShowScript]         = useState(false);
  const [dictationInput, setDictationInput] = useState('');
  const [dictIndex, setDictIndex]           = useState(0);
  const [dictResult, setDictResult]         = useState(null);

  const headerRef = useRef(null);
  const isInView  = useInView(headerRef, { once: true });

  const exercises = EXERCISES[activeCategory] || [];
  const currentDictation = DICTATION_SENTENCES[dictIndex];

  const checkDictation = () => {
    const correct = dictationInput.trim().toLowerCase().replace(/[.,!?]/g, '');
    const expected = currentDictation.text.toLowerCase().replace(/[.,!?]/g, '');
    const isCorrect = correct === expected;
    setDictResult(isCorrect);
  };

  const nextDictation = () => {
    setDictIndex(i => (i + 1) % DICTATION_SENTENCES.length);
    setDictationInput('');
    setDictResult(null);
  };

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-sky-600/20 via-blue-600/15 to-indigo-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shrink-0"
            >
              <Headphones size={22} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">Listening Lab</h1>
              <p className="text-sm text-sky-300 font-medium">Real conversations — Train your English ear</p>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Authentic conversations, dictation practice, fill-in-the-blank — improve your listening comprehension step by step.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Mode Tabs ────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id:'exercises',  label:'Comprehension',  icon: Headphones },
          { id:'dictation',  label:'Dictation',       icon: BookOpen  },
          { id:'tips',       label:'Listening Tips',  icon: Star       },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Comprehension Exercises ──────────────────────── */}
        {activeTab === 'exercises' && (
          <motion.div key="exercises" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Category selector */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  onClick={() => { setActiveCategory(id); setSelectedExercise(null); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                    activeCategory === id
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
                  }`}
                >
                  <span>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>

            {selectedExercise ? (
              <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-white text-lg">{selectedExercise.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-300">Level: {selectedExercise.level}</span>
                      <span className="text-xs text-slate-500">{selectedExercise.duration}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedExercise(null)} className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5 transition-colors">
                    ← Back
                  </button>
                </div>
                <ComprehensionQuiz exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
              </motion.div>
            ) : exercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exercises.map((ex) => (
                  <motion.button
                    key={ex.id}
                    onClick={() => setSelectedExercise(ex)}
                    whileHover={{ y: -2 }}
                    className="card p-5 text-left group hover:border-sky-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center border border-sky-500/20">
                          <Headphones size={18} className="text-sky-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{ex.title}</h3>
                          <p className="text-xs text-slate-500">{ex.duration} • {ex.questions.length} questions</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">{ex.level}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{ex.vocabulary.join(' • ')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">Comprehension + Vocab</span>
                      <span className="text-xs text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Start <ChevronRight size={12} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <Headphones size={40} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">More {CATEGORIES.find(c => c.id === activeCategory)?.label} exercises coming soon!</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Dictation Tab ─────────────────────────────────── */}
        {activeTab === 'dictation' && (
          <motion.div key="dictation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="card p-4 border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-emerald-300 font-semibold">Dictation Practice:</span>{' '}
                Read the sentence below, cover it, then type what you remember. Great for improving listening + writing + memory together!
              </p>
            </div>

            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sentence {dictIndex + 1} of {DICTATION_SENTENCES.length}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg bg-primary-500/15 text-primary-300">{currentDictation.level}</span>
                  <span className="text-xs text-slate-500">{currentDictation.topic}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white text-center leading-relaxed">
                  "{currentDictation.text}"
                </p>
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Type the sentence:</label>
                <input
                  type="text"
                  value={dictationInput}
                  onChange={(e) => { setDictationInput(e.target.value); setDictResult(null); }}
                  placeholder="Type what you read/remember..."
                  className="input text-sm"
                />
              </div>

              {dictResult !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border flex items-center gap-3 ${
                    dictResult
                      ? 'bg-green-500/10 border-green-500/25 text-green-300'
                      : 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                  }`}
                >
                  {dictResult ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <div>
                    <p className="font-semibold text-sm">{dictResult ? 'Perfect! ✨' : 'Not quite — check the original'}</p>
                    {!dictResult && (
                      <p className="text-xs mt-1 opacity-80">Correct: "{currentDictation.text}"</p>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                {dictResult === null ? (
                  <button onClick={checkDictation} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    Check Answer <CheckCircle2 size={16} />
                  </button>
                ) : (
                  <button onClick={nextDictation} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    Next Sentence <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Tips Tab ──────────────────────────────────────── */}
        {activeTab === 'tips' && (
          <motion.div key="tips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {[
              { title:'Start with Subtitles',  icon:'🎬', tip:'English shows aur movies देखो English subtitles ke saath (not Hindi). धीरे-धीरे subtitles हटाते जाओ।' },
              { title:'Active Listening',      icon:'👂', tip:"Passively sunna काफी नहीं — actively listen करो: key words, numbers, names note karo जब suno।" },
              { title:'Listen Multiple Times', icon:'🔁', tip:'Same audio 3 बार सुनो: 1st for overall meaning, 2nd for detail, 3rd while reading transcript।' },
              { title:'Shadowing Technique',   icon:'🎤', tip:'Audio के साथ exactly वैसे ही simultaneously bolo — same speed, same stress, same rhythm। Game changer!' },
              { title:'Podcast Daily',         icon:'🎧', tip:'BBC Learning English, VOA Learning English — रोज़ 10-15 minute का episode सुनो।' },
              { title:'News in English',       icon:'📺', tip:"NDTV, CNN, BBC news रोज़ 5 minute सुनो। Initially 50% hi समझ आएगा — that's completely okay!" },
              { title:'Write While Listening', icon:'✍️', tip:'Key points नोट करते जाओ while listening — improves focus और retention dramatically।' },
              { title:'Accept Imperfection',   icon:'✅', tip:"Every single word समझना ज़रूरी नहीं। Overall meaning और context पर focus karo. It gets easier with practice!" },
            ].map(({ title, icon, tip }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-5 flex items-start gap-4"
              >
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{tip}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
