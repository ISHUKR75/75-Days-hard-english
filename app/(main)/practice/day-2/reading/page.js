'use client';
// ============================================================
// Day 2 — Reading Practice Page
// Passages about self-introduction with comprehension questions,
// vocabulary highlighting, and reading speed timer.
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Volume2, Timer, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, Eye, EyeOff, Target, Sparkles,
  Star, RotateCcw, Lightbulb, Play, Pause
} from 'lucide-react';

// ── Reading passage component ─────────────────────────────────────────────────
function ReadingPassage({ passage, index }) {
  const [expanded, setExpanded]       = useState(index === 0);
  const [showHindi, setShowHindi]     = useState(false);
  const [answers, setAnswers]         = useState({});
  const [showVocab, setShowVocab]     = useState(false);
  const [isSpeaking, setIsSpeaking]   = useState(false);
  const [readTime, setReadTime]       = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed]         = useState(0);
  const timerRef = useRef(null);

  const handleSpeak = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const u = new SpeechSynthesisUtterance(passage.passage || passage.text || '');
      u.lang = 'en-US'; u.rate = 0.85;
      u.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
      setIsSpeaking(true);
    }
  }, [isSpeaking, passage]);

  // Reading timer
  const startTimer = () => {
    setElapsed(0);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setReadTime(elapsed);
  };

  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setTimeout(() => setElapsed(e => e + 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timerActive, elapsed]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleAnswer = (qId, opt) => {
    if (answers[qId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const qs = passage.comprehensionQuestions || passage.questions || [];
  const score = qs.filter(q => answers[q.id || q.question] === q.correct).length;

  const LEVEL_COLOR = {
    'A1': 'bg-green-100 text-green-700',
    'A2': 'bg-teal-100 text-teal-700',
    'B1': 'bg-blue-100 text-blue-700',
    'B2': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
            index % 6 === 0 ? 'bg-blue-600' : index % 6 === 1 ? 'bg-purple-600' :
            index % 6 === 2 ? 'bg-green-600' : index % 6 === 3 ? 'bg-orange-600' :
            index % 6 === 4 ? 'bg-red-600' : 'bg-indigo-600'
          }`}>{index + 1}</div>
          <div>
            <p className="font-bold text-gray-800">{passage.title}</p>
            <div className="flex gap-2 mt-0.5 flex-wrap">
              {passage.cefr && <span className={`text-xs px-2 py-0.5 rounded-full ${LEVEL_COLOR[passage.cefr] || 'bg-gray-100 text-gray-600'}`}>{passage.cefr}</span>}
              {passage.wordCount && <span className="text-xs text-gray-400">{passage.wordCount} words</span>}
              {passage.type && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{passage.type}</span>}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
              {/* Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                <button onClick={handleSpeak}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  <Volume2 className="w-4 h-4" />
                  {isSpeaking ? 'Stop Audio' : 'Listen'}
                </button>

                {/* Reading timer */}
                {!timerActive && !readTime && (
                  <button onClick={startTimer} className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-100 border border-purple-200">
                    <Timer className="w-4 h-4" />
                    Start Timer
                  </button>
                )}
                {timerActive && (
                  <button onClick={stopTimer} className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-medium">
                    <span className="font-mono">{fmt(elapsed)}</span> — Done Reading
                  </button>
                )}
                {readTime !== null && !timerActive && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Read in {fmt(readTime)}
                  </div>
                )}

                <button onClick={() => setShowHindi(v => !v)} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 ml-auto">
                  {showHindi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Hindi
                </button>
              </div>

              {/* Reading passage */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 leading-relaxed text-gray-800 text-base">
                {passage.passage || passage.text}
              </div>

              {/* Hindi summary */}
              <AnimatePresence>
                {showHindi && (passage.hindiSummary || passage.hindi) && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <p className="text-xs font-semibold text-orange-700 mb-2">Hindi Summary:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{passage.hindiSummary || passage.hindi}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vocabulary */}
              {passage.vocabulary?.length > 0 && (
                <div>
                  <button onClick={() => setShowVocab(v => !v)} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700">
                    <BookOpen className="w-4 h-4" />
                    {showVocab ? 'Hide' : 'Show'} Vocabulary ({passage.vocabulary.length} words)
                  </button>
                  <AnimatePresence>
                    {showVocab && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {passage.vocabulary.map((v, i) => (
                            <div key={i} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                              <span className="font-bold text-blue-700">{v.word || v}</span>
                              {v.meaning && <span className="text-gray-600 text-sm ml-2">— {v.meaning}</span>}
                              {v.usage && <p className="text-xs text-gray-500 mt-1 italic">e.g. {v.usage}</p>}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Comprehension questions */}
              {qs.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Comprehension Questions
                    </h4>
                    {Object.keys(answers).length > 0 && (
                      <span className="text-sm text-blue-600 font-medium">{score}/{qs.length} correct</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    {qs.map((q, qi) => {
                      const qId = q.id || q.question;
                      const userAns = answers[qId];
                      const answered = userAns !== undefined;
                      const correct  = userAns === q.correct;
                      return (
                        <div key={qi} className={`rounded-xl border p-4 ${answered ? (correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50') : 'border-gray-100 bg-white'}`}>
                          <p className="font-medium text-gray-800 mb-1 text-sm">{qi + 1}. {q.question}</p>
                          {q.hindi && <p className="text-xs text-gray-500 italic mb-3">{q.hindi}</p>}
                          <div className="flex flex-wrap gap-2">
                            {q.options?.map(opt => {
                              let cls = 'border-gray-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300';
                              if (answered) {
                                cls = opt === q.correct ? 'border-green-400 bg-green-100 text-green-800 font-semibold' :
                                      opt === userAns ? 'border-red-400 bg-red-100 text-red-700' :
                                      'border-gray-100 text-gray-400 opacity-50';
                              }
                              return (
                                <button key={opt} onClick={() => handleAnswer(qId, opt)} disabled={answered}
                                  className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${cls}`}>
                                  {answered && opt === q.correct && '✓ '}{opt}
                                </button>
                              );
                            })}
                          </div>
                          {answered && q.explanation && (
                            <p className="mt-2 text-xs text-gray-600 bg-white p-2 rounded-lg italic">{q.explanation}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grammar focus */}
              {passage.grammarFocus && (
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                  <p className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Grammar Focus:
                  </p>
                  <p className="text-sm text-gray-700">{passage.grammarFocus}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Built-in reading passages ─────────────────────────────────────────────────
const BUILTIN_PASSAGES = [
  {
    id: 1,
    title: "Rahul's Interview Introduction",
    cefr: 'A2',
    type: 'interview',
    wordCount: 118,
    passage: `Good morning. My name is Rahul Sharma. I am from Delhi. I completed my Bachelor of Technology in Computer Science from Delhi Technological University in 2021 with a CGPA of 8.5.

After graduation, I joined Infosys as a Software Developer. I have been working there for two years. My primary role involves building web applications using React and Node.js.

My greatest strength is problem-solving. I enjoy breaking complex problems into smaller, manageable steps.

My hobbies include reading technology blogs and playing chess. Both activities help me stay sharp and think strategically.

My goal is to become a full-stack developer and eventually lead a development team. I am very excited about this opportunity and look forward to contributing to your company. Thank you.`,
    hindiSummary: 'Rahul Delhi ka hai. DTU se B.Tech kiya. 2 saal se Infosys mein kaam kar raha hai. Goal hai full-stack developer banana. Interview mein confident aur formal tha.',
    vocabulary: [
      { word: 'CGPA', meaning: 'Cumulative Grade Point Average — total marks average', usage: 'I scored 8.5 CGPA in my B.Tech.' },
      { word: 'manageable', meaning: 'possible to handle or deal with', usage: 'Break the problem into manageable steps.' },
      { word: 'strategically', meaning: 'in a way that involves careful planning', usage: 'Chess teaches you to think strategically.' },
      { word: 'contributing', meaning: 'giving or providing something useful', usage: 'I look forward to contributing to your team.' },
    ],
    comprehensionQuestions: [
      { id: 'r1q1', question: 'From which city is Rahul?', options: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'], correct: 'Delhi', explanation: 'Rahul says "I am from Delhi" in the introduction.' },
      { id: 'r1q2', question: 'What is his CGPA?', options: ['7.5', '8.0', '8.5', '9.0'], correct: '8.5', explanation: 'He says "a CGPA of 8.5".' },
      { id: 'r1q3', question: 'How long has he been working at Infosys?', options: ['1 year', '2 years', '3 years', '6 months'], correct: '2 years', explanation: '"I have been working there for two years."' },
      { id: 'r1q4', question: 'What is his greatest strength?', options: ['Communication', 'Problem-solving', 'Teamwork', 'Leadership'], correct: 'Problem-solving', explanation: '"My greatest strength is problem-solving."' },
    ],
    grammarFocus: 'Notice: "I have been working" — Present Perfect Continuous for ongoing action. "I completed" — Simple Past for finished event. "I look forward to contributing" — "forward to" always takes gerund (-ing).'
  },
  {
    id: 2,
    title: "Priya's College Introduction",
    cefr: 'A1',
    type: 'casual',
    wordCount: 89,
    passage: `Hi everyone! My name is Priya Singh. My friends call me Piyu. I am 19 years old and I am from Jaipur, Rajasthan.

I have just started my Bachelor of Commerce here at Delhi University. Before this, I completed my Class 12 from a school in Jaipur with 89%.

I love dancing and painting. I have been learning Kathak dance for seven years. I also enjoy cooking traditional Rajasthani food.

My goal is to become a Chartered Accountant. I am very excited to be here and I hope we all become great friends. Feel free to say hi!`,
    hindiSummary: 'Priya Jaipur se hai. Delhi University mein B.Com shuru ki hai. Kathak dance seekhti hai — 7 saal se. Goal hai CA banana. Friendly aur casual tone hai yahan.',
    vocabulary: [
      { word: 'Bachelor of Commerce', meaning: 'B.Com — 3-year degree in commerce and accounting', usage: 'I am pursuing a Bachelor of Commerce.' },
      { word: 'Chartered Accountant', meaning: 'CA — a professional accounting qualification', usage: 'Her goal is to become a Chartered Accountant.' },
      { word: 'traditional', meaning: 'following long-established customs', usage: 'I enjoy cooking traditional Rajasthani food.' },
    ],
    comprehensionQuestions: [
      { id: 'r2q1', question: 'What is Priya\'s nickname?', options: ['Pri', 'Piyu', 'Pinky', 'Pari'], correct: 'Piyu', explanation: '"My friends call me Piyu."' },
      { id: 'r2q2', question: 'Which dance form does she practice?', options: ['Bharatanatyam', 'Odissi', 'Kathak', 'Mohiniyattam'], correct: 'Kathak', explanation: '"I have been learning Kathak dance for seven years."' },
      { id: 'r2q3', question: 'What is her career goal?', options: ['Software Engineer', 'Doctor', 'Chartered Accountant', 'Lawyer'], correct: 'Chartered Accountant', explanation: '"My goal is to become a Chartered Accountant."' },
    ],
    grammarFocus: 'Notice: "I have just started" — Present Perfect with "just". "I have been learning Kathak for seven years" — Present Perfect Continuous (ongoing hobby + duration).'
  },
  {
    id: 3,
    title: "Amit's LinkedIn Profile Bio",
    cefr: 'B1',
    type: 'professional bio',
    wordCount: 132,
    passage: `I am Amit Verma, a Data Scientist with three years of experience in machine learning and data analytics.

I graduated from IIT Bombay with a degree in Electrical Engineering in 2020. During my studies, I developed a keen interest in data and statistics, which led me to transition into data science.

At my current company, DataBridge Analytics, I work on building predictive models that help businesses make data-driven decisions. I have successfully deployed five production models that collectively reduced operational costs by 30%.

I am passionate about making AI accessible to non-technical teams. I regularly write articles about data science on Medium and mentor college students on weekends.

My goal is to lead an AI research team by 2027. I believe that the best data scientists are not just technical experts — they are effective communicators.`,
    hindiSummary: 'Amit IIT Bombay se hai. 3 saal ka data science experience hai. 5 models deploy kiye jo 30% cost reduce karte hain. Articles likhta hai aur students mentor karta hai. Ek thoughtful aur experienced professional hai.',
    vocabulary: [
      { word: 'predictive models', meaning: 'machine learning models that predict future outcomes', usage: 'I build predictive models for business decisions.' },
      { word: 'data-driven decisions', meaning: 'decisions based on data and analysis, not guesses', usage: 'Companies prefer data-driven decisions.' },
      { word: 'operational costs', meaning: 'day-to-day running expenses of a business', usage: 'We reduced operational costs by 30%.' },
      { word: 'transition', meaning: 'change from one state or role to another', usage: 'I transitioned from engineering to data science.' },
    ],
    comprehensionQuestions: [
      { id: 'r3q1', question: 'Which university did Amit graduate from?', options: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kharagpur'], correct: 'IIT Bombay', explanation: '"I graduated from IIT Bombay".' },
      { id: 'r3q2', question: 'By how much did his models reduce operational costs?', options: ['10%', '20%', '25%', '30%'], correct: '30%', explanation: '"...collectively reduced operational costs by 30%."' },
      { id: 'r3q3', question: 'Where does he write articles?', options: ['LinkedIn', 'Medium', 'Quora', 'Reddit'], correct: 'Medium', explanation: '"I regularly write articles about data science on Medium."' },
      { id: 'r3q4', question: 'According to Amit, what makes the best data scientists?', options: ['Coding skills', 'Mathematical ability', 'Being effective communicators', 'Having big data experience'], correct: 'Being effective communicators', explanation: '"...they are effective communicators."' },
    ],
    grammarFocus: 'Notice: "I have successfully deployed" — Present Perfect for recent achievement. "...that collectively reduced" — Relative clause with Simple Past. Professional writing avoids contractions (not "I\'ve", but "I have").'
  },
  {
    id: 4,
    title: 'Common Mistakes in English Introductions',
    cefr: 'A2',
    type: 'educational',
    wordCount: 155,
    passage: `Many Indian English speakers make predictable mistakes when introducing themselves in English. Understanding these mistakes helps you sound more professional and confident.

The most common error is saying "Myself Rahul." In standard English, "myself" is a reflexive pronoun — it refers back to the subject. You should always say "My name is Rahul" or simply "I am Rahul."

Another frequent mistake involves tense. Many people say "I am born in Delhi." Since birth is a past event, the correct form is "I was born in Delhi."

Preposition errors are also very common. People say "I work in TCS" when they should say "I work at TCS" — we use "at" for specific organizations and "in" for general industries.

Finally, Indian speakers often say "passed out from college" meaning they graduated. However, in standard English, "passed out" means to faint or lose consciousness. The correct phrase is "graduated from" or "completed my degree from."

Awareness of these patterns is the first step to speaking more naturally and confidently.`,
    hindiSummary: 'Yeh passage common English mistakes explain karta hai: "myself" ka galat use, "am born" vs "was born", "in TCS" vs "at TCS", aur "passed out" ka galat meaning. Ye mistakes jaanna improvement ka pehla step hai.',
    vocabulary: [
      { word: 'reflexive pronoun', meaning: 'a pronoun like myself, yourself, himself — refers back to the subject', usage: '"Myself" is a reflexive pronoun.' },
      { word: 'frequent', meaning: 'happening often', usage: 'Tense errors are a frequent mistake.' },
      { word: 'preposition', meaning: 'a word like at, in, on, from that shows relationship', usage: 'Use the correct preposition — "at" for companies.' },
      { word: 'faint', meaning: 'to suddenly lose consciousness', usage: 'She fainted in the heat.' },
      { word: 'consciousness', meaning: 'the state of being awake and aware', usage: 'He lost consciousness after the accident.' },
    ],
    comprehensionQuestions: [
      { id: 'r4q1', question: 'Why is "Myself Rahul" incorrect?', options: ['It is too informal', '"Myself" is a reflexive pronoun, not used for introductions', 'It is not complete', 'It uses wrong tense'], correct: '"Myself" is a reflexive pronoun, not used for introductions', explanation: 'The passage explains that "myself" is a reflexive pronoun that refers back to the subject.' },
      { id: 'r4q2', question: 'Which preposition should follow "I work ___" + company name?', options: ['in', 'on', 'at', 'for'], correct: 'at', explanation: '"at" is used for specific organizations. "I work at TCS." (But "I work for TCS" also works!)' },
      { id: 'r4q3', question: 'What does "passed out" mean in standard English?', options: ['To graduate', 'To faint or lose consciousness', 'To leave college early', 'To fail an exam'], correct: 'To faint or lose consciousness', explanation: '"Passed out" in standard English means to faint — not to graduate.' },
    ],
    grammarFocus: 'This is a meta-lesson about grammar itself. Key point: "I was born" (Past Simple) because birth happened in the past. Present tense "I am born" is always wrong.'
  },
  {
    id: 5,
    title: 'The Art of a Perfect Self Introduction',
    cefr: 'B1',
    type: 'article',
    wordCount: 178,
    passage: `A self-introduction is not just sharing facts — it is your opportunity to create a lasting first impression. The way you introduce yourself shapes how others perceive you, whether in a job interview, a social gathering, or a professional meeting.

An effective introduction has three essential qualities: clarity, confidence, and conciseness.

Clarity means your listener should understand exactly who you are and what you do. Avoid using jargon or overly complex language. Speak in simple, direct sentences.

Confidence does not mean being arrogant. It means speaking at a steady pace, maintaining eye contact, and avoiding filler words like "um," "uh," and "you know." Practice your introduction in front of a mirror until it feels natural — not memorized.

Conciseness is perhaps the most underrated quality. A good introduction is between 30 seconds and 2 minutes long, depending on the context. Nobody enjoys listening to someone who talks about themselves endlessly.

Remember: your goal is not to tell your entire life story. Your goal is to make the other person interested in knowing more about you. Leave them wanting to continue the conversation.`,
    hindiSummary: 'Ek achha introduction sirf facts share karna nahi hai — yeh first impression create karne ka mauka hai. Teen cheezein zaroori hain: Clarity, Confidence, aur Conciseness. Apne baare mein sab kuch mat batao — sirf itna batao ki dusra insaan aur jaanna chahey.',
    vocabulary: [
      { word: 'lasting first impression', meaning: 'a first impression that stays in memory for a long time', usage: 'A confident introduction creates a lasting first impression.' },
      { word: 'perceive', meaning: 'to see, understand, or interpret', usage: 'How others perceive you matters in interviews.' },
      { word: 'jargon', meaning: 'technical language that only specialists understand', usage: 'Avoid using jargon in introductions.' },
      { word: 'arrogant', meaning: 'having an exaggerated sense of one\'s own importance', usage: 'Confidence is not the same as being arrogant.' },
      { word: 'conciseness', meaning: 'the quality of being brief and to the point', usage: 'Conciseness is a sign of good communication.' },
      { word: 'underrated', meaning: 'not appreciated as much as it deserves', usage: 'Conciseness is an underrated quality.' },
    ],
    comprehensionQuestions: [
      { id: 'r5q1', question: 'What are the three essential qualities of an effective introduction?', options: ['Humor, Length, Detail', 'Clarity, Confidence, Conciseness', 'Facts, Speed, Grammar', 'Name, Role, Company'], correct: 'Clarity, Confidence, Conciseness', explanation: 'The passage states: "An effective introduction has three essential qualities: clarity, confidence, and conciseness."' },
      { id: 'r5q2', question: 'What does confidence NOT mean according to the passage?', options: ['Speaking steadily', 'Maintaining eye contact', 'Being arrogant', 'Avoiding filler words'], correct: 'Being arrogant', explanation: '"Confidence does not mean being arrogant." It is about calm, clear communication.' },
      { id: 'r5q3', question: 'What is the ideal length of a good introduction?', options: ['5-10 minutes', '30 seconds to 2 minutes', 'Exactly 1 minute', 'As long as needed'], correct: '30 seconds to 2 minutes', explanation: '"A good introduction is between 30 seconds and 2 minutes long."' },
      { id: 'r5q4', question: 'What is the true goal of a self-introduction, according to the passage?', options: ['To share your complete resume', 'To impress with vocabulary', 'To make the other person want to know more', 'To finish as fast as possible'], correct: 'To make the other person want to know more', explanation: '"Your goal is to make the other person interested in knowing more about you."' },
    ],
    grammarFocus: 'Notice the use of gerunds: "knowing more", "listening to someone", "maintaining eye contact", "avoiding filler words". After prepositions and certain verbs, always use the -ing form.'
  },
];

// ── Main reading page ─────────────────────────────────────────────────────────
export default function Day2ReadingPage() {
  const [passages, setPassages]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selectedLevel, setLevel] = useState('all');

  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const readingData = data?.readingExercise;
        const items = readingData?.passages || readingData || [];
        const arr = Array.isArray(items) ? items : Object.values(items);
        setPassages(arr.length > 0 ? arr : BUILTIN_PASSAGES);
        setLoading(false);
      })
      .catch(() => { setPassages(BUILTIN_PASSAGES); setLoading(false); });
  }, []);

  const levels = ['all', ...new Set(passages.map(p => p.cefr || 'General'))];
  const visible = selectedLevel === 'all' ? passages : passages.filter(p => (p.cefr || 'General') === selectedLevel);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block font-medium">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Reading Practice
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <span className="text-sm text-gray-500">{visible.length} passages</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-5 mb-6 shadow-xl">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Reading Comprehension
          </h2>
          <p className="text-blue-100 text-sm">
            Padhein → Hindi dekhen (zaroorat ho to) → Questions answer karein.
            Timer use karein — track karein kab faster padhte hain!
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full">{passages.length} passages</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Audio pronunciation</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Reading timer</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Grammar notes</span>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {levels.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${selectedLevel === l ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'}`}>
              {l === 'all' ? 'All Levels' : `CEFR ${l}`}
            </button>
          ))}
        </div>

        {/* Passages */}
        <div className="space-y-4">
          {visible.map((passage, i) => (
            <ReadingPassage key={passage.id || i} passage={passage} index={i} />
          ))}
        </div>

        {/* Reading tips */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Reading Tips for Better Comprehension
          </h3>
          <div className="space-y-2">
            {[
              'Pehli reading mein samajhne ki koshish karein — dictionary mat kholen',
              'Second reading mein highlighted vocabulary dekhen',
              'Questions answer karne se pehle passage ko ek aur baar padhein',
              'Audio sun ke padhein — pronunciation naturally improve hogi',
              'Timer use karein — pata chalega time ke saath kaise improve ho rahe ho',
            ].map((tip, i) => (
              <p key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {tip}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
