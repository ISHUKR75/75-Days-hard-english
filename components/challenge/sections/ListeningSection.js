// ============================================================
// ListeningSection.js — Rich Listening Practice Experience
// TTS-powered audio exercises, speed controls, MCQs, transcripts,
// dictation mode, and a full score tracker. Gen Z vibes ✨
// ============================================================

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Play, Pause, Square, Volume2, VolumeX, FileText,
  CheckCircle2, XCircle, ChevronRight, ChevronLeft,
  Headphones, Clock, Zap, Trophy, RotateCcw, Star,
  Eye, EyeOff, Target, TrendingUp, Mic, AlertCircle,
  BookOpen, Brain
} from 'lucide-react';

// ── Speak text via Web Speech API ────────────────────────────
function speak(text, rate = 0.9, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US';
  utt.rate = rate;
  utt.pitch = 1;
  if (onEnd) utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
  return utt;
}

// ── Sound feedback ─────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type === 'correct') {
      o.type = 'sine'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    } else {
      o.type = 'sawtooth'; o.frequency.value = 200;
      g.gain.setValueAtTime(0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    }
    o.start(); o.stop(ctx.currentTime + (type === 'correct' ? 0.5 : 0.3));
  } catch (_) {}
}

// ── Animation variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ── Blobs ──────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-blue-600/15 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Built-in Day 1 listening exercises ────────────────────────
const DAY1_EXERCISES = [
  {
    id: 'ex1',
    title: 'Classroom Introduction',
    level: 'Beginner',
    levelColor: 'emerald',
    speed: 0.85,
    audioScript: "Hello, my name is Priya. I am a student. I study at Delhi Public School. I am in class 10. My favourite subject is English. I want to speak English fluently. I practice every day for 30 minutes. English helps me in my career and daily life.",
    hindiContext: "एक छात्र खुद का परिचय दे रही है। ध्यान से सुनो और सवालों के जवाब दो।",
    questions: [
      {
        q: "What is the speaker's name?",
        options: ["Rita", "Priya", "Kavya", "Sunita"],
        answer: "Priya",
        explanation: "She clearly says 'my name is Priya' at the start."
      },
      {
        q: "Why does she want to learn English?",
        options: ["For fun only", "To impress friends", "For career and daily life", "To move abroad"],
        answer: "For career and daily life",
        explanation: "She says 'English helps me in my career and daily life.'"
      },
      {
        q: "How long does she practice English every day?",
        options: ["15 minutes", "1 hour", "30 minutes", "45 minutes"],
        answer: "30 minutes",
        explanation: "She says 'I practice every day for 30 minutes.'"
      },
    ]
  },
  {
    id: 'ex2',
    title: 'Office Morning Conversation',
    level: 'Elementary',
    levelColor: 'blue',
    speed: 0.9,
    audioScript: "Good morning, Rahul! How are you doing today? — I am doing great, thank you! I just had a very productive meeting with the client. — Oh really? How did it go? — It went really well. They liked our proposal and want to move forward. — That is amazing news! Let us celebrate with some coffee. — Great idea! I will join you in five minutes.",
    hindiContext: "दो office colleagues सुबह की conversation कर रहे हैं। meeting के बारे में बात हो रही है।",
    questions: [
      {
        q: "How did the meeting go?",
        options: ["It was cancelled", "It went badly", "It went really well", "It was average"],
        answer: "It went really well",
        explanation: "'It went really well' — the client liked the proposal."
      },
      {
        q: "What do they decide to do to celebrate?",
        options: ["Have lunch", "Take a day off", "Have coffee", "Call the client again"],
        answer: "Have coffee",
        explanation: "One person says 'Let us celebrate with some coffee.'"
      },
      {
        q: "In how many minutes will Rahul join for coffee?",
        options: ["Two minutes", "Five minutes", "Ten minutes", "Fifteen minutes"],
        answer: "Five minutes",
        explanation: "Rahul says 'I will join you in five minutes.'"
      },
    ]
  },
  {
    id: 'ex3',
    title: 'Daily Routine Description',
    level: 'Beginner',
    levelColor: 'emerald',
    speed: 0.85,
    audioScript: "Every morning, I wake up at six o'clock. I brush my teeth and take a shower. Then I have breakfast with my family. I usually eat bread, eggs, and drink tea. After breakfast, I go to school by bus. School starts at eight thirty. I study hard and come home at three thirty in the afternoon. In the evening, I do my homework and then watch some English videos online to practice.",
    hindiContext: "कोई अपनी daily routine बता रहा है। हर detail ध्यान से सुनो।",
    questions: [
      {
        q: "What time does the person wake up?",
        options: ["5 AM", "6 AM", "7 AM", "8 AM"],
        answer: "6 AM",
        explanation: "They say 'I wake up at six o'clock.'"
      },
      {
        q: "How does the person go to school?",
        options: ["By car", "By train", "By bike", "By bus"],
        answer: "By bus",
        explanation: "'I go to school by bus' — clear mention."
      },
      {
        q: "What does the person do in the evening to practice English?",
        options: ["Reads books", "Watches English videos online", "Listens to radio", "Talks to friends"],
        answer: "Watches English videos online",
        explanation: "'I watch some English videos online to practice.'"
      },
    ]
  },
  {
    id: 'ex4',
    title: 'Job Interview Snippet',
    level: 'Intermediate',
    levelColor: 'violet',
    speed: 1.0,
    audioScript: "Good afternoon. Please have a seat. Thank you for coming today. — Thank you for the opportunity. I am really excited about this position. — Great. Could you please tell me about yourself? — Of course. My name is Amit Kumar. I have five years of experience in customer service. I am very good at communication and problem solving. I believe I can contribute significantly to your team.",
    hindiContext: "एक job interview हो रही है। interviewer और candidate के बीच conversation है।",
    questions: [
      {
        q: "How many years of experience does Amit have?",
        options: ["Three years", "Four years", "Five years", "Six years"],
        answer: "Five years",
        explanation: "'I have five years of experience in customer service.'"
      },
      {
        q: "What skills does Amit mention?",
        options: ["Programming and design", "Communication and problem solving", "Leadership and finance", "Marketing and sales"],
        answer: "Communication and problem solving",
        explanation: "He says 'I am very good at communication and problem solving.'"
      },
      {
        q: "What field is Amit's experience in?",
        options: ["Sales", "Marketing", "Customer service", "Finance"],
        answer: "Customer service",
        explanation: "'I have five years of experience in customer service.'"
      },
    ]
  },
  {
    id: 'ex5',
    title: 'News Headline Reading',
    level: 'Intermediate',
    levelColor: 'violet',
    speed: 1.0,
    audioScript: "Good evening. Here is today's top news. Scientists have discovered a new method to reduce air pollution using plant-based filters. The technology can clean up to ninety percent of harmful particles from the air. Several cities across the world are planning to test this technology next year. In sports news, the Indian cricket team won the series against Australia by three matches to two. In weather, expect heavy rain in northern India this weekend.",
    hindiContext: "एक news bulletin सुनाई दे रही है। अलग-अलग topics के बारे में news हैं।",
    questions: [
      {
        q: "What can the new plant-based filter clean from air?",
        options: ["50% of particles", "70% of particles", "90% of particles", "100% of particles"],
        answer: "90% of particles",
        explanation: "'Clean up to ninety percent of harmful particles from the air.'"
      },
      {
        q: "What was the cricket series score?",
        options: ["India won 2-1", "India won 3-2", "Australia won 3-2", "It was a draw"],
        answer: "India won 3-2",
        explanation: "'Indian cricket team won the series by three matches to two.'"
      },
      {
        q: "Where is heavy rain expected?",
        options: ["Southern India", "Eastern India", "Northern India", "Western India"],
        answer: "Northern India",
        explanation: "'Expect heavy rain in northern India this weekend.'"
      },
    ]
  },
  {
    id: 'ex6',
    title: 'Dictation — Write What You Hear',
    level: 'Beginner',
    levelColor: 'emerald',
    speed: 0.75,
    audioScript: "I want to learn English. English is very important. I practice every day. I read books and watch videos. I speak English with my friends. My English is getting better every day.",
    hindiContext: "यह dictation exercise है। ध्यान से सुनो और जो सुना वो लिखने की कोशिश करो।",
    isDictation: true,
    sentences: [
      "I want to learn English.",
      "English is very important.",
      "I practice every day.",
      "I read books and watch videos.",
      "I speak English with my friends.",
      "My English is getting better every day.",
    ],
    questions: [
      {
        q: "What does the person want to do?",
        options: ["Learn Hindi", "Learn English", "Learn French", "Learn Spanish"],
        answer: "Learn English",
        explanation: "The first sentence clearly states the goal."
      },
    ]
  },
];

// ── Speed options ──────────────────────────────────────────────
const SPEEDS = [
  { label: '0.5×', value: 0.5, desc: 'Very slow' },
  { label: '0.75×', value: 0.75, desc: 'Slow' },
  { label: '1×', value: 1.0, desc: 'Normal' },
  { label: '1.25×', value: 1.25, desc: 'Fast' },
  { label: '1.5×', value: 1.5, desc: 'Very fast' },
];

// ── Waveform animation ─────────────────────────────────────────
function Waveform({ isPlaying }) {
  return (
    <div className="flex items-center gap-0.5 h-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-blue-400"
          animate={isPlaying ? {
            height: [6, Math.random() * 24 + 8, 6],
          } : { height: 6 }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Single exercise component ──────────────────────────────────
function ExerciseCard({ ex, exerciseIndex, speed }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState({}); // q_index → option
  const [revealed, setRevealed] = useState({});
  const [dictInput, setDictInput] = useState('');
  const [dictRevealed, setDictRevealed] = useState(false);

  const correct = ex.questions.filter((q, i) => answers[i] === q.answer).length;
  const attempted = Object.keys(answers).length;

  const levelColors = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    setPlayCount(p => p + 1);
    speak(ex.audioScript, speed, () => setIsPlaying(false));
  };

  const handleAnswer = (qIdx, opt) => {
    if (answers[qIdx]) return;
    const isCorrect = opt === ex.questions[qIdx].answer;
    setAnswers(prev => ({ ...prev, [qIdx]: opt }));
    setRevealed(prev => ({ ...prev, [qIdx]: true }));
    playSound(isCorrect ? 'correct' : 'wrong');
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelColors[ex.levelColor]}`}>
                {ex.level}
              </span>
              {ex.isDictation && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Dictation
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-base">{ex.title}</h3>
            <p className="text-gray-400 text-xs mt-1">{ex.hindiContext}</p>
          </div>
          {attempted > 0 && (
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-black text-white">{correct}/{attempted}</div>
              <div className="text-xs text-gray-400">correct</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Audio Player */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-4">
            {/* Play/Stop button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                isPlaying
                  ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/30'
              }`}
            >
              {isPlaying ? <Square size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
            </motion.button>

            <div className="flex-1">
              {/* Waveform */}
              <Waveform isPlaying={isPlaying} />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-blue-300 font-medium">
                  {isPlaying ? 'Playing...' : playCount > 0 ? `Played ${playCount}× — play again anytime!` : 'Press play to listen'}
                </span>
                <span className="text-xs text-gray-500">EN-US voice</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          {playCount === 0 && (
            <div className="mt-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
              <p className="text-blue-300 text-xs">
                💡 <strong>Tip:</strong> Listen once without pausing. Then listen again focusing on specific words. You can play as many times as needed!
              </p>
            </div>
          )}
        </div>

        {/* Transcript toggle */}
        <button
          onClick={() => setShowTranscript(p => !p)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all"
        >
          <div className="flex items-center gap-2">
            <FileText size={15} />
            {showTranscript ? 'Hide Transcript' : 'Show Transcript (click after answering)'}
          </div>
          {showTranscript ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Transcript</p>
                <p className="text-gray-200 text-sm leading-relaxed italic">"{ex.audioScript}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dictation mode */}
        {ex.isDictation && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <Mic size={12} />
              Dictation Practice
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-300 text-xs mb-3">
                🎧 Listen to the audio, then write what you heard below. Focus on spelling and punctuation!
              </p>
              <textarea
                value={dictInput}
                onChange={e => setDictInput(e.target.value)}
                placeholder="Write what you hear here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none outline-none focus:border-amber-500/40 placeholder:text-gray-600 min-h-[100px]"
              />
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setDictRevealed(true)}
                  className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all"
                >
                  Check Answer
                </button>
              </div>
            </div>

            <AnimatePresence>
              {dictRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {ex.sentences?.map((sentence, i) => (
                    <div key={i} className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-emerald-300 text-sm">{sentence}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <Brain size={12} />
            Comprehension Questions ({ex.questions.length})
          </div>

          {ex.questions.map((q, qi) => {
            const selectedAnswer = answers[qi];
            const isAnswered = !!selectedAnswer;

            return (
              <div key={qi} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <p className="text-white text-sm font-semibold">
                  <span className="text-gray-500 mr-2">Q{qi + 1}.</span>
                  {q.q}
                </p>

                {/* Recommend listening before answering */}
                {playCount === 0 && !isAnswered && (
                  <p className="text-xs text-blue-400 bg-blue-400/5 border border-blue-400/10 rounded-lg px-3 py-2">
                    👆 Listen to the audio first, then answer!
                  </p>
                )}

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
                      <button
                        key={oi}
                        onClick={() => handleAnswer(qi, opt)}
                        disabled={isAnswered}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3 ${cls}`}
                      >
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

                {/* Explanation */}
                <AnimatePresence>
                  {revealed[qi] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`overflow-hidden text-xs p-3 rounded-xl ${
                        answers[qi] === q.answer
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                      }`}
                    >
                      <strong>{answers[qi] === q.answer ? '🎉 Correct! ' : '💡 Explanation: '}</strong>
                      {q.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Score summary */}
        {attempted === ex.questions.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl border text-center ${
              correct === ex.questions.length
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : correct >= ex.questions.length * 0.6
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <div className="text-3xl mb-2">
              {correct === ex.questions.length ? '🏆' : correct >= ex.questions.length * 0.6 ? '🎯' : '💪'}
            </div>
            <p className="text-white font-black text-lg">{correct}/{ex.questions.length} correct</p>
            <p className="text-gray-400 text-xs mt-1">
              {correct === ex.questions.length
                ? 'Perfect score! You are a listening pro! 🔥'
                : correct >= ex.questions.length * 0.6
                ? 'Good job! Play the audio again to catch what you missed.'
                : 'Keep practicing! Listening improves with repetition.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function ListeningSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  // Use data from JSON or fallback to built-in exercises
  const rawExercises = data?.listening?.exercises;
  const exercises = (rawExercises && rawExercises.length > 0) ? rawExercises : DAY1_EXERCISES;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [speed, setSpeed] = useState(0.9);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [activeTab, setActiveTab] = useState('exercises'); // 'exercises' | 'guide'
  const [xpEarned, setXpEarned] = useState(0);

  const currentEx = exercises[currentIdx] || {};
  const totalExercises = exercises.length;

  const markComplete = (id) => {
    if (completedExercises.has(id)) return;
    setCompletedExercises(prev => new Set([...prev, id]));
    addXP(10, 'Completed listening exercise!');
    setXpEarned(p => p + 10);
  };

  // Tips for listening improvement
  const LISTENING_TIPS = [
    { icon: '🎬', title: 'Watch English Movies with Subtitles', desc: 'First watch with English subtitles, then watch again without. Your brain will fill in the gaps over time.' },
    { icon: '🎵', title: 'Listen to English Songs', desc: "Read the lyrics while listening. Learn the vocabulary from songs you love — you'll never forget words this way." },
    { icon: '📻', title: 'BBC Learning English Podcast', desc: 'Free daily 6-minute English episodes on real-world topics. Perfect for daily practice on your commute or walk.' },
    { icon: '🎤', title: 'Shadow Native Speakers', desc: 'Listen to a sentence, pause, then repeat it exactly — same speed, same intonation. This is the #1 pronunciation hack.' },
    { icon: '📝', title: 'Dictation Practice Daily', desc: 'Write what you hear in English without looking. Start slow, then increase speed as your accuracy improves.' },
    { icon: '🔄', title: 'Active Listening vs Passive Listening', desc: 'Active = focused, taking notes, answering questions. Passive = background music/TV. Both help! Do active daily, passive whenever possible.' },
    { icon: '🎯', title: "Don't Aim for 100% First", desc: "Getting 60-70% on first listen is NORMAL and GOOD. Understanding improves with repetition. Don't get discouraged!" },
    { icon: '⚡', title: 'Speed Practice', desc: 'Once comfortable at normal speed, switch to 1.25x or 1.5x. This trains your brain to process English faster — crucial for real conversations.' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO HEADER ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl shadow-lg">
                🎧
              </div>
              <div>
                <h1 className="text-white font-black text-2xl">Listening Practice</h1>
                <p className="text-gray-400 text-sm mt-0.5">Sunte hain, samajhte hain, aur seekhte hain! 👂</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-400">{completedExercises.size}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{xpEarned}</div>
                <div className="text-xs text-gray-400">XP</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                animate={{ width: `${(completedExercises.size / totalExercises) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{completedExercises.size}/{totalExercises} exercises completed</span>
              <span className="text-blue-400">+10 XP per exercise</span>
            </div>
          </div>
        </motion.div>

        {/* ── SPEED SELECTOR ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 text-sm font-medium flex items-center gap-2 flex-shrink-0">
              <Volume2 size={15} /> Playback Speed:
            </span>
            <div className="flex gap-2 flex-wrap">
              {SPEEDS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSpeed(s.value)}
                  title={s.desc}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    speed === s.value
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-auto hidden sm:block">
              💡 Start at 0.75× if you struggle. Move to 1× as you improve.
            </span>
          </div>
        </motion.div>

        {/* ── TABS ────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5">
          {[
            { id: 'exercises', label: '🎧 Exercises', count: totalExercises },
            { id: 'guide', label: '💡 Tips & Guide', count: null },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* EXERCISES TAB */}
          {activeTab === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Navigator */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3">
                <button
                  onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <div className="flex items-center gap-2">
                  {exercises.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(i)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        i === currentIdx
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : completedExercises.has(exercises[i]?.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                    >
                      {completedExercises.has(exercises[i]?.id) ? '✓' : i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentIdx(p => Math.min(totalExercises - 1, p + 1))}
                  disabled={currentIdx === totalExercises - 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>

              {/* Current exercise */}
              <ExerciseCard
                key={currentEx.id || currentIdx}
                ex={currentEx}
                exerciseIndex={currentIdx}
                speed={speed}
              />

              {/* Mark complete button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  markComplete(currentEx.id || currentIdx);
                  if (currentIdx < totalExercises - 1) setCurrentIdx(p => p + 1);
                }}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedExercises.has(currentEx.id || currentIdx)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                }`}
              >
                {completedExercises.has(currentEx.id || currentIdx)
                  ? '✓ Exercise Complete — Move to Next!'
                  : `✓ Mark Exercise ${currentIdx + 1} as Done (+10 XP)`}
              </motion.button>
            </motion.div>
          )}

          {/* GUIDE TAB */}
          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Headphones className="text-blue-400" size={20} />
                  <h2 className="text-blue-300 font-black text-lg">How to Improve Listening 🎧</h2>
                </div>
                <p className="text-gray-400 text-sm">
                  Listening is THE most important skill — it's how babies learn language! These expert techniques will level up your comprehension fast.
                </p>
              </div>

              <div className="grid gap-3">
                {LISTENING_TIPS.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{tip.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Resources */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-cyan-400" />
                  Free Resources for Daily Listening
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'BBC Learning English (6 Minute English)', url: 'bbc.co.uk/learningenglish', emoji: '🇬🇧' },
                    { name: 'VOA Learning English (Special English)', url: 'learningenglish.voanews.com', emoji: '🇺🇸' },
                    { name: 'Ted-Ed YouTube Channel', url: 'youtube.com/TedEd', emoji: '🎬' },
                    { name: 'Speak English with VancouverLearningCenter', url: 'YouTube', emoji: '🎤' },
                    { name: 'EnglishClass101 Podcast', url: 'Free on Spotify', emoji: '🎵' },
                    { name: 'Cambridge English Exam Listening', url: 'Free practice tests', emoji: '📚' },
                  ].map((res, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                      <span className="text-xl">{res.emoji}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{res.name}</p>
                        <p className="text-gray-500 text-xs">{res.url}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
