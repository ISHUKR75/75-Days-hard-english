// ============================================================
// SpeakingSection.js — World-class Speaking & Pronunciation
// TTS shadowing, IPA guide, speed drills, roleplay, confidence
// Web Speech API for listening + speaking feedback. Gen Z vibes 🎤
// ============================================================

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Mic, MicOff, Volume2, Play, Square, CheckCircle2,
  ChevronDown, ChevronUp, Star, Zap, Trophy, Target,
  RotateCcw, BookOpen, TrendingUp, Clock, Flame,
  MessageCircle, Sparkles, Eye, EyeOff, ChevronRight
} from 'lucide-react';

// ── TTS speak ─────────────────────────────────────────────────
function speak(text, rate = 0.85, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate; utt.pitch = 1;
  if (onEnd) utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
}

// ── Sound effect ──────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type === 'done') {
      o.type = 'sine'; o.frequency.value = 660;
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    }
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch (_) {}
}

// ── Animation ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

// ── Background blobs ──────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-600/12 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Built-in Day 1 shadowing exercises ────────────────────────
const SHADOWING_DRILLS = [
  {
    id: 'greetings',
    title: 'Greetings & Basic Phrases',
    emoji: '👋',
    category: 'Daily',
    sentences: [
      { text: 'Good morning! How are you today?', hindi: 'सुप्रभात! आप आज कैसे हैं?', tip: 'Stress on "morning" and "today"' },
      { text: 'I am doing great, thank you!', hindi: 'मैं बिल्कुल ठीक हूँ, धन्यवाद!', tip: '"Great" should sound energetic and confident' },
      { text: 'Nice to meet you. My name is Rahul.', hindi: 'आपसे मिलकर अच्छा लगा। मेरा नाम राहुल है।', tip: 'Slight pause after "meet you"' },
      { text: 'Please come in and have a seat.', hindi: 'कृपया अंदर आइए और बैठिए।', tip: 'Polite and warm tone throughout' },
      { text: 'Thank you so much for your help!', hindi: 'आपकी मदद के लिए बहुत-बहुत धन्यवाद!', tip: '"So much" carries emotional emphasis' },
      { text: 'See you tomorrow. Have a great day!', hindi: 'कल मिलते हैं। आपका दिन अच्छा हो!', tip: 'Rising intonation on "tomorrow"' },
    ]
  },
  {
    id: 'office',
    title: 'Office & Professional Phrases',
    emoji: '💼',
    category: 'Professional',
    sentences: [
      { text: 'Could you please send me the report by Friday?', hindi: 'क्या आप मुझे शुक्रवार तक रिपोर्ट भेज सकते हैं?', tip: 'Polite request — softer tone than command' },
      { text: 'I will get back to you as soon as possible.', hindi: 'मैं जल्द से जल्द आपसे संपर्क करूंगा।', tip: 'Confidence in voice — not hesitant' },
      { text: 'Can we schedule a meeting for tomorrow morning?', hindi: 'क्या हम कल सुबह के लिए मीटिंग शेड्यूल कर सकते हैं?', tip: 'Natural question intonation — voice rises at end' },
      { text: 'I understand your concern. Let me look into it.', hindi: 'मैं आपकी चिंता समझता हूँ। मैं इसे देखता हूँ।', tip: 'Empathetic tone on "understand your concern"' },
      { text: 'The deadline has been moved to next Monday.', hindi: 'डेडलाइन अगले सोमवार को कर दी गई है।', tip: 'Clear and direct — professional delivery' },
      { text: 'Thank you for the opportunity. I am excited to contribute.', hindi: 'अवसर के लिए धन्यवाद। मैं योगदान करने के लिए उत्साहित हूँ।', tip: 'Warm but professional — genuine enthusiasm' },
    ]
  },
  {
    id: 'interview',
    title: 'Job Interview Sentences',
    emoji: '🎯',
    category: 'Interview',
    sentences: [
      { text: 'I have always been passionate about this field.', hindi: 'मैं हमेशा से इस क्षेत्र के प्रति उत्साही रहा हूँ।', tip: '"Always" and "passionate" need strong emphasis' },
      { text: 'My greatest strength is my ability to learn quickly.', hindi: 'मेरी सबसे बड़ी ताकत है तेज़ी से सीखने की क्षमता।', tip: 'Speak slowly and confidently — this is your selling point' },
      { text: 'I work very well under pressure and meet deadlines.', hindi: 'मैं दबाव में बहुत अच्छा काम करता हूँ और समय सीमा को पूरा करता हूँ।', tip: 'Steady, confident pace' },
      { text: 'I am a team player and I also lead effectively.', hindi: 'मैं एक टीम प्लेयर हूँ और प्रभावी ढंग से नेतृत्व भी करता हूँ।', tip: 'Balance both parts — equal emphasis' },
      { text: 'Where do I see myself in five years? In a leadership role.', hindi: 'मैं खुद को पाँच साल में कहाँ देखता हूँ? एक नेतृत्व की भूमिका में।', tip: 'Pause after the question before answering' },
      { text: 'I would be a great fit for this position because...', hindi: 'मैं इस पद के लिए एक अच्छा फिट होऊंगा क्योंकि...', tip: 'Start strong — the first word sets the tone' },
    ]
  },
  {
    id: 'daily',
    title: 'Daily Life Conversations',
    emoji: '☀️',
    category: 'Daily',
    sentences: [
      { text: 'What time does the bus arrive at the station?', hindi: 'बस स्टेशन पर किस समय आती है?', tip: '"Time" and "arrive" — key information words' },
      { text: 'Can you recommend a good restaurant nearby?', hindi: 'क्या आप कोई पास का अच्छा रेस्टोरेंट सुझा सकते हैं?', tip: 'Curious, friendly tone' },
      { text: 'I would like to open a savings account, please.', hindi: 'मैं एक बचत खाता खोलना चाहूंगा, कृपया।', tip: 'Polite, formal — "please" at end is softener' },
      { text: 'Could you please speak more slowly? I am learning English.', hindi: 'क्या आप धीरे बोल सकते हैं? मैं अंग्रेज़ी सीख रहा हूँ।', tip: "Never be shy to say you're learning — it's brave!" },
      { text: 'I need to buy a train ticket to Mumbai.', hindi: 'मुझे मुंबई के लिए ट्रेन टिकट खरीदनी है।', tip: 'Clear purpose — "Mumbai" gets the emphasis' },
      { text: 'The weather is so nice today! Shall we go for a walk?', hindi: 'आज मौसम कितना अच्छा है! क्या हम टहलने जाएं?', tip: 'Light, enthusiastic tone — small talk energy' },
    ]
  },
];

// ── Pronunciation guide ───────────────────────────────────────
const PRONUNCIATION_GUIDE = [
  {
    sound: '/θ/ — "th" (voiceless)',
    examples: ['Think', 'Three', 'Thank', 'Thursday', 'Through'],
    howTo: "Put your tongue gently between your teeth and blow air. Don't say 'T' or 'D'!",
    mistake: "Indians often say 'tink' instead of 'think'. Tongue between teeth is the key!",
    emoji: '👅'
  },
  {
    sound: '/ð/ — "th" (voiced)',
    examples: ['The', 'This', 'That', 'They', 'There'],
    howTo: "Same as above but vibrate your vocal cords. Feel the buzz in your throat!",
    mistake: "Often sounds like 'D'. The vibration makes the difference.",
    emoji: '🔊'
  },
  {
    sound: '/v/ — "v" sound',
    examples: ['Very', 'Vocabulary', 'Voice', 'Vital', 'View'],
    howTo: "Upper teeth on lower lip. Feel air coming through — not like 'W' or 'B'!",
    mistake: "Hindi speakers sometimes say 'wery' instead of 'very'. Upper teeth must touch lower lip.",
    emoji: '💋'
  },
  {
    sound: '/w/ — "w" sound',
    examples: ['Water', 'Work', 'World', 'When', 'Why'],
    howTo: "Round your lips like you're going to whistle, then open as you say the vowel.",
    mistake: "Don't say 'v' — 'V' needs teeth. 'W' is just rounded lips with no tooth contact.",
    emoji: '🫦'
  },
  {
    sound: 'Silent letters',
    examples: ['Know (K is silent)', 'Write (W is silent)', 'Hour (H is silent)', 'Island (S is silent)'],
    howTo: "Many English words have letters that aren't pronounced at all. Just ignore them!",
    mistake: "Never say 'K-now' — it's just 'now'. Never say 'W-rite' — just 'right' sound.",
    emoji: '🤫'
  },
  {
    sound: 'Word Stress — syllables',
    examples: ['PHOtograph', 'phoTOGraphy', 'photoGRAPHic', 'comPUter', 'IMportant'],
    howTo: "Every word has one syllable that gets emphasized (louder + longer). Get this right!",
    mistake: "Many learners stress all syllables equally. Listen carefully to where native speakers emphasize.",
    emoji: '⬆️'
  },
];

// ── Tongue twister drills ─────────────────────────────────────
const TONGUE_TWISTERS = [
  { text: 'She sells seashells by the seashore.', speed: 0.7, tip: 'Focus on the "sh" and "s" sounds' },
  { text: 'Peter Piper picked a peck of pickled peppers.', speed: 0.7, tip: 'Practice the "p" sound cleanly' },
  { text: 'How much wood would a woodchuck chuck?', speed: 0.7, tip: 'The "w" sound — round your lips' },
  { text: 'Red lorry, yellow lorry. Red lorry, yellow lorry.', speed: 0.7, tip: 'Perfect for the "l" and "r" difference' },
  { text: 'Whether the weather be cold, whether the weather be hot.', speed: 0.65, tip: 'Excellent for the "wh/th" sounds' },
  { text: 'I saw Susie sitting in a shoeshine shop.', speed: 0.7, tip: 'Sh vs S sound distinction' },
];

// ── ShadowCard component ───────────────────────────────────────
function ShadowCard({ drill, speed, onComplete, isCompleted }) {
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [completedSents, setCompletedSents] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [showHindi, setShowHindi] = useState({});

  const total = drill.sentences.length;
  const done = completedSents.size;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const handleSpeak = (idx, text) => {
    setSpeakingIdx(idx);
    speak(text, speed, () => setSpeakingIdx(null));
  };

  const toggleComplete = (idx) => {
    setCompletedSents(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else { next.add(idx); playSound('done'); }
      return next;
    });
    if (completedSents.size + 1 === total) onComplete?.();
  };

  const categoryColors = {
    Daily: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Professional: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Interview: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  };

  return (
    <div className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all ${isCompleted ? 'border-emerald-500/40' : 'border-white/10'}`}>
      {/* Header */}
      <button onClick={() => setIsOpen(p => !p)} className="w-full p-5 flex items-center gap-4 text-left">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/20 flex items-center justify-center text-xl flex-shrink-0">
          {drill.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-white font-bold text-sm">{drill.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[drill.category]}`}>
              {drill.category}
            </span>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{done}/{total}</span>
          </div>
        </div>
        {isCompleted ? (
          <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
        ) : (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
          </motion.div>
        )}
      </button>

      {/* Sentences */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-white/10 pt-4">
              {/* How-to */}
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 flex items-start gap-2">
                <span className="text-emerald-400 text-sm font-bold flex-shrink-0">🎯</span>
                <p className="text-emerald-300 text-xs leading-relaxed">
                  <strong>Shadowing method:</strong> Listen to TTS → pause → repeat OUT LOUD exactly as you heard it. Mirror the speed, rhythm, and emphasis. Do each sentence at least 3 times!
                </p>
              </div>

              {drill.sentences.map((sent, i) => {
                const isDone = completedSents.has(i);
                const isSpeaking = speakingIdx === i;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border rounded-xl p-4 transition-all ${isDone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Done checkbox */}
                      <button
                        onClick={() => toggleComplete(i)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all border ${
                          isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 hover:border-emerald-500/50'
                        }`}
                      >
                        {isDone && <CheckCircle2 size={14} />}
                      </button>

                      <div className="flex-1 min-w-0">
                        {/* English text */}
                        <p className={`font-semibold text-sm leading-relaxed ${isDone ? 'text-emerald-200' : 'text-white'}`}>
                          "{sent.text}"
                        </p>

                        {/* Hindi toggle */}
                        <button
                          onClick={() => setShowHindi(p => ({ ...p, [i]: !p[i] }))}
                          className="text-xs text-gray-500 hover:text-gray-300 mt-1 flex items-center gap-1 transition-colors"
                        >
                          {showHindi[i] ? <EyeOff size={11} /> : <Eye size={11} />}
                          {showHindi[i] ? 'Hide Hindi' : 'Show Hindi'}
                        </button>

                        <AnimatePresence>
                          {showHindi[i] && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-amber-300/80 text-xs mt-1"
                            >
                              {sent.hindi}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Pronunciation tip */}
                        {sent.tip && (
                          <p className="text-gray-500 text-xs mt-1.5 italic">💡 {sent.tip}</p>
                        )}
                      </div>

                      {/* Play button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSpeak(i, sent.text)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isSpeaking
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'bg-white/10 text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 border border-white/10'
                        }`}
                        title="Listen to pronunciation"
                      >
                        {isSpeaking ? <Square size={13} /> : <Volume2 size={14} />}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Done CTA */}
              {done === total && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center"
                >
                  <p className="text-emerald-300 font-bold text-sm">🎉 Drill complete! Amazing job! Move to the next drill.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function SpeakingSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const rawExercises = data?.speaking?.exercises;

  const [speed, setSpeed] = useState(0.85);
  const [activeTab, setActiveTab] = useState('shadowing');
  const [completedDrills, setCompletedDrills] = useState(new Set());
  const [twisterIdx, setTwisterIdx] = useState(0);
  const [twisterPlaying, setTwisterPlaying] = useState(false);
  const [twisterAttempts, setTwisterAttempts] = useState({});
  const [xpEarned, setXpEarned] = useState(0);

  const drills = SHADOWING_DRILLS;
  const totalDone = completedDrills.size;
  const total = drills.length;

  const SPEED_OPTIONS = [
    { label: '0.5×', value: 0.5 },
    { label: '0.75×', value: 0.75 },
    { label: '1×', value: 1.0 },
    { label: '1.25×', value: 1.25 },
  ];

  const markDrillComplete = (id) => {
    if (completedDrills.has(id)) return;
    setCompletedDrills(p => new Set([...p, id]));
    addXP(15, 'Completed speaking drill!');
    setXpEarned(p => p + 15);
  };

  const handleTwisterPlay = () => {
    const t = TONGUE_TWISTERS[twisterIdx];
    setTwisterPlaying(true);
    speak(t.text, speed * t.speed, () => setTwisterPlaying(false));
    setTwisterAttempts(p => ({ ...p, [twisterIdx]: (p[twisterIdx] || 0) + 1 }));
  };

  const TABS = [
    { id: 'shadowing', label: '🪞 Shadowing', shortLabel: 'Shadow' },
    { id: 'pronunciation', label: '🗣️ Pronunciation', shortLabel: 'Pronun.' },
    { id: 'tongue', label: '👅 Tongue Twisters', shortLabel: 'Twisters' },
    { id: 'tips', label: '💡 Tips', shortLabel: 'Tips' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg">
                🎙️
              </div>
              <div>
                <h1 className="text-white font-black text-2xl">Speaking & Pronunciation</h1>
                <p className="text-gray-400 text-sm mt-0.5">Listen → Shadow → Repeat → Confidence! 🔥</p>
              </div>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-400">{totalDone}/{total}</div>
                <div className="text-xs text-gray-400">drills done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{xpEarned}</div>
                <div className="text-xs text-gray-400">XP earned</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${total ? (totalDone / total) * 100 : 0}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{totalDone * 15} XP earned from speaking practice</p>
          </div>
        </motion.div>

        {/* ── SPEED SELECTOR ────────────────────────────────────── */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 flex-wrap">
          <span className="text-gray-400 text-sm font-medium flex-shrink-0">🔊 TTS Speed:</span>
          <div className="flex gap-2">
            {SPEED_OPTIONS.map(s => (
              <button
                key={s.value}
                onClick={() => setSpeed(s.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  speed === s.value ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 ml-auto hidden sm:block">💡 Beginners: start at 0.75×. Aim for 1× within a week!</p>
        </div>

        {/* ── TABS ────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SHADOWING TAB */}
          {activeTab === 'shadowing' && (
            <motion.div key="shadowing" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {/* Intro card */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-5">
                <p className="text-emerald-300 font-semibold text-sm mb-2">🪞 What is Shadowing?</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Shadowing is the #1 technique used by polyglots (people who speak 5+ languages). 
                  You listen to native audio, then immediately repeat it — same speed, same rhythm, same emphasis. 
                  Your brain creates a "muscle memory" for English patterns. Do this daily for 30 days and you'll speak naturally! 🔥
                </p>
              </div>

              {drills.map(drill => (
                <ShadowCard
                  key={drill.id}
                  drill={drill}
                  speed={speed}
                  onComplete={() => markDrillComplete(drill.id)}
                  isCompleted={completedDrills.has(drill.id)}
                />
              ))}
            </motion.div>
          )}

          {/* PRONUNCIATION TAB */}
          {activeTab === 'pronunciation' && (
            <motion.div key="pronunciation" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/5 border border-teal-500/20 rounded-2xl p-5">
                <p className="text-teal-300 font-semibold text-sm mb-2">🗣️ Pronunciation Guide for Hindi Speakers</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  These are the sounds that trip up Hindi speakers the most. Practice each one carefully — 
                  even 5 minutes a day will show a HUGE difference in 2 weeks!
                </p>
              </div>

              <div className="space-y-3">
                {PRONUNCIATION_GUIDE.map((guide, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{guide.emoji}</span>
                      <h3 className="text-white font-bold">{guide.sound}</h3>
                    </div>

                    {/* Examples */}
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Examples</p>
                      <div className="flex flex-wrap gap-2">
                        {guide.examples.map((ex, j) => (
                          <button
                            key={j}
                            onClick={() => speak(ex.split(' ')[0], 0.75)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm font-semibold hover:bg-emerald-500/20 transition-all"
                          >
                            <Volume2 size={11} />
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* How to */}
                    <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3">
                      <p className="text-blue-300 text-xs font-semibold mb-1">How to produce this sound:</p>
                      <p className="text-gray-300 text-sm">{guide.howTo}</p>
                    </div>

                    {/* Common mistake */}
                    <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
                      <p className="text-red-300 text-xs font-semibold mb-1">⚠️ Common mistake for Hindi speakers:</p>
                      <p className="text-gray-300 text-sm">{guide.mistake}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TONGUE TWISTERS TAB */}
          {activeTab === 'tongue' && (
            <motion.div key="tongue" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-2xl p-5">
                <p className="text-violet-300 font-semibold text-sm mb-2">👅 Tongue Twisters</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Tongue twisters train your mouth muscles to produce English sounds quickly and accurately. 
                  Start slow (0.5× speed), then increase to 1× and beyond. It's supposed to be hard at first — that's the point!
                </p>
              </div>

              {/* Current twister */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-5">
                <div className="text-sm text-gray-400 font-medium">
                  Twister {twisterIdx + 1} of {TONGUE_TWISTERS.length}
                </div>

                <p className="text-white font-black text-xl leading-relaxed">
                  "{TONGUE_TWISTERS[twisterIdx].text}"
                </p>

                <p className="text-amber-300 text-sm">
                  💡 {TONGUE_TWISTERS[twisterIdx].tip}
                </p>

                {twisterAttempts[twisterIdx] > 0 && (
                  <p className="text-emerald-400 text-xs">
                    Practiced {twisterAttempts[twisterIdx]}× on this twister!
                  </p>
                )}

                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTwisterPlay}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                      twisterPlaying
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    }`}
                  >
                    {twisterPlaying ? <><Square size={16} /> Stop</> : <><Play size={16} /> Listen</>}
                  </motion.button>
                </div>
              </div>

              {/* Navigator */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTwisterIdx(p => Math.max(0, p - 1))}
                  disabled={twisterIdx === 0}
                  className="flex-1 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setTwisterIdx(p => Math.min(TONGUE_TWISTERS.length - 1, p + 1))}
                  disabled={twisterIdx === TONGUE_TWISTERS.length - 1}
                  className="flex-1 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>

              {/* All twisters list */}
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">All Tongue Twisters</p>
                {TONGUE_TWISTERS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTwisterIdx(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      i === twisterIdx ? 'bg-violet-500/20 border-violet-500/40 text-violet-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-semibold">{i + 1}. </span>{t.text}
                    {(twisterAttempts[i] || 0) > 0 && (
                      <span className="text-xs text-emerald-400 ml-2">({twisterAttempts[i]}× done)</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* TIPS TAB */}
          {activeTab === 'tips' && (
            <motion.div key="tips" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {[
                { emoji: '🪞', title: 'Mirror Practice — Non-Negotiable', desc: 'Practice speaking in front of a mirror every day. Watch your mouth, your expression, your confidence. This is how speakers remove "shyness" from their voice.' },
                { emoji: '🎬', title: 'Record Yourself', desc: "Record a 1-minute video of yourself speaking English daily. Watch it back. Notice what sounds natural and what doesn't. Improve. This technique is used by language coaches worldwide." },
                { emoji: '📞', title: 'Speak with Strangers Online', desc: 'Use Omegle, Tandem, HelloTalk, or Discord English practice servers. Real conversations with native speakers will push you faster than any drill.' },
                { emoji: '🎵', title: 'Sing English Songs', desc: "Pick your favorite English song. Learn the lyrics. Sing along while listening. You'll master pronunciation, rhythm, and intonation simultaneously." },
                { emoji: '📺', title: 'Imitate Movie Characters', desc: 'Choose a character from an English movie you love. Copy their lines exactly — same speed, same emotion. This is acting, and it makes your English alive.' },
                { emoji: '⏱️', title: 'The 30-Second Rule', desc: 'Every day, pick one topic (your work, your day, your dream) and speak about it in English for 30 seconds non-stop. Increase by 30 seconds each week.' },
                { emoji: '🧠', title: 'Think in English (Most Powerful Hack)', desc: "Stop translating Hindi→English. Start thinking directly in English. When you see a dog, think 'dog'. When you're hungry, think 'I am hungry'. Make it automatic!" },
                { emoji: '🎯', title: "Don't Fear Mistakes — Celebrate Them!", desc: "Every mistake you make is a milestone. Native speakers make grammar mistakes too! The goal is to be understood, not to be perfect. Speak freely, fix later." },
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4"
                >
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
