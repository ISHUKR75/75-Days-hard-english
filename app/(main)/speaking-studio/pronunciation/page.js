'use client';
// Pronunciation Practice — IPA guide, common sounds, Hindi speaker mistakes
// Listen & Repeat interface with 20 key English sounds

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mic, Volume2, ChevronLeft, ChevronRight, CheckCircle2,
  Star, ArrowLeft, BookOpen, Target, Zap, RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

// ── IPA Sounds Data ───────────────────────────────────────────
const IPA_SOUNDS = [
  {
    id: 1,
    symbol: '/iː/',
    name: 'Long EE',
    category: 'Vowel',
    description: 'Like "ee" in feet — lips stretched, tongue high',
    practiceWords: ['feet', 'see', 'tree', 'read', 'need'],
    exampleSentence: 'I need to read this book.',
    hindiHint: 'Hindi की "ई" जैसी लेकिन थोड़ी ज्यादा stretched',
    commonMistake: 'Often shortened to /ɪ/ — "fit" instead of "feet"',
    difficulty: 'Easy',
    color: 'emerald',
  },
  {
    id: 2,
    symbol: '/ɪ/',
    name: 'Short I',
    category: 'Vowel',
    description: 'Like "i" in sit — lips relaxed, tongue slightly high',
    practiceWords: ['sit', 'bit', 'fill', 'mill', 'will'],
    exampleSentence: 'Will you sit here with me?',
    hindiHint: 'Hindi की "इ" से shorter — मुंह ज्यादा relaxed',
    commonMistake: 'Hindi speakers often make it too long like /iː/',
    difficulty: 'Medium',
    color: 'teal',
  },
  {
    id: 3,
    symbol: '/e/',
    name: 'Short E',
    category: 'Vowel',
    description: 'Like "e" in bed — mouth slightly open, mid tongue',
    practiceWords: ['bed', 'red', 'set', 'men', 'ten'],
    exampleSentence: 'Ten men set up the red bed.',
    hindiHint: 'Hindi की "ए" जैसी लेकिन shorter और more open',
    commonMistake: 'Often pronounced as long /eɪ/ — "bade" instead of "bed"',
    difficulty: 'Easy',
    color: 'sky',
  },
  {
    id: 4,
    symbol: '/æ/',
    name: 'Flat A',
    category: 'Vowel',
    description: 'Like "a" in cat — mouth wide open, tongue flat and low',
    practiceWords: ['cat', 'bat', 'man', 'band', 'sand'],
    exampleSentence: 'The black cat sat on the mat.',
    hindiHint: 'Hindi में यह sound नहीं है — "a" और "e" के बीच की आवाज़',
    commonMistake: 'Said as /ɑː/ (father) — "cat" sounds like "cart"',
    difficulty: 'Hard',
    color: 'blue',
  },
  {
    id: 5,
    symbol: '/ɑː/',
    name: 'Long AH',
    category: 'Vowel',
    description: 'Like "a" in father — jaw drops low, mouth wide open',
    practiceWords: ['father', 'car', 'star', 'bath', 'dance'],
    exampleSentence: 'My father drives a fast car.',
    hindiHint: 'Hindi की "आ" से बहुत मिलती-जुलती — मुंह पूरा खोलो',
    commonMistake: 'Often not open enough — sounds too short',
    difficulty: 'Easy',
    color: 'indigo',
  },
  {
    id: 6,
    symbol: '/ɒ/',
    name: 'Short O',
    category: 'Vowel',
    description: 'Like "o" in hot — lips rounded, jaw dropped',
    practiceWords: ['hot', 'dog', 'lot', 'got', 'job'],
    exampleSentence: 'The dog got a lot of hot food.',
    hindiHint: 'Hindi की "ओ" से shorter और more open',
    commonMistake: 'Made too long — "hot" sounds like "hout"',
    difficulty: 'Medium',
    color: 'violet',
  },
  {
    id: 7,
    symbol: '/uː/',
    name: 'Long OO',
    category: 'Vowel',
    description: 'Like "oo" in food — lips very rounded, tongue back and high',
    practiceWords: ['food', 'moon', 'blue', 'school', 'rule'],
    exampleSentence: 'The school rule is to eat good food.',
    hindiHint: 'Hindi की "ऊ" जैसी — lips को pouting position में रखो',
    commonMistake: 'Lips not rounded enough — sounds too flat',
    difficulty: 'Easy',
    color: 'purple',
  },
  {
    id: 8,
    symbol: '/ʌ/',
    name: 'Short UH',
    category: 'Vowel',
    description: 'Like "u" in cup — centre tongue, relaxed jaw',
    practiceWords: ['cup', 'bus', 'run', 'fun', 'sun'],
    exampleSentence: 'The bus runs under the sun.',
    hindiHint: 'Hindi में यह sound नहीं है — "अ" से थोड़ा अलग, more central',
    commonMistake: 'Replaced with /ɑː/ — "cup" sounds like "caap"',
    difficulty: 'Hard',
    color: 'amber',
  },
  {
    id: 9,
    symbol: '/ɜː/',
    name: 'ER Sound',
    category: 'Vowel',
    description: 'Like "er" in bird — lips neutral, tongue central and raised',
    practiceWords: ['bird', 'word', 'work', 'girl', 'nurse'],
    exampleSentence: 'The nurse heard every word.',
    hindiHint: 'Hindi में नहीं है — "ए" और "अ" के बीच, tongue central',
    commonMistake: 'Said as /ar/ — "bird" sounds like "baard"',
    difficulty: 'Very Hard',
    color: 'orange',
  },
  {
    id: 10,
    symbol: '/θ/',
    name: 'TH (voiceless)',
    category: 'Consonant',
    description: 'Like "th" in think — tongue lightly between teeth, no voice',
    practiceWords: ['think', 'three', 'tooth', 'both', 'mouth'],
    exampleSentence: 'I think both of them are three years old.',
    hindiHint: 'Tongue को दांतों के बीच रखो और हवा निकालो — आवाज़ नहीं',
    commonMistake: 'Replaced with /t/ — "think" sounds like "tink"',
    difficulty: 'Hard',
    color: 'red',
  },
  {
    id: 11,
    symbol: '/ð/',
    name: 'TH (voiced)',
    category: 'Consonant',
    description: 'Like "th" in the — tongue between teeth, with voice',
    practiceWords: ['the', 'this', 'that', 'them', 'other'],
    exampleSentence: 'This is the other one that they want.',
    hindiHint: '/θ/ जैसा but throat se vibration add करो',
    commonMistake: 'Replaced with /d/ — "the" sounds like "de"',
    difficulty: 'Hard',
    color: 'rose',
  },
  {
    id: 12,
    symbol: '/v/',
    name: 'V Sound',
    category: 'Consonant',
    description: 'Like "v" in very — upper teeth on lower lip, voiced',
    practiceWords: ['very', 'voice', 'value', 'have', 'love'],
    exampleSentence: 'I love the value of having a voice.',
    hindiHint: 'ऊपर के दांत नीचे के होंठ पर रखो और vibration के साथ बोलो',
    commonMistake: 'Replaced with /w/ or /b/ — "very" as "wery" or "bery"',
    difficulty: 'Hard',
    color: 'pink',
  },
  {
    id: 13,
    symbol: '/w/',
    name: 'W Sound',
    category: 'Consonant',
    description: 'Like "w" in water — lips rounded then open fast, no teeth',
    practiceWords: ['water', 'world', 'work', 'walk', 'way'],
    exampleSentence: 'Walk to the well and get water.',
    hindiHint: 'Lips को गोल करो जैसे "oo" बोलने के लिए, फिर quickly open करो',
    commonMistake: 'Replaced with /v/ — teeth touch lip incorrectly',
    difficulty: 'Medium',
    color: 'cyan',
  },
  {
    id: 14,
    symbol: '/r/',
    name: 'R Sound',
    category: 'Consonant',
    description: 'Like "r" in run — tongue curled back, no trill, no roll',
    practiceWords: ['run', 'road', 'river', 'rain', 'read'],
    exampleSentence: 'The river runs along the road.',
    hindiHint: 'Hindi का "र" नहीं — tongue को curl करो, trill मत करो',
    commonMistake: 'Trilling like Hindi "र" — English R is softer and back',
    difficulty: 'Medium',
    color: 'lime',
  },
  {
    id: 15,
    symbol: '/l/',
    name: 'L Sound',
    category: 'Consonant',
    description: 'Like "l" in light — tongue tip on gum ridge behind teeth',
    practiceWords: ['light', 'love', 'ball', 'full', 'feel'],
    exampleSentence: 'The full moon gave little light.',
    hindiHint: 'Hindi के "ल" जैसा लेकिन tongue tip upper gum ridge पर',
    commonMistake: 'Final L dropped — "ball" sounds like "baw"',
    difficulty: 'Easy',
    color: 'green',
  },
  {
    id: 16,
    symbol: '/p/',
    name: 'P Sound (aspirated)',
    category: 'Consonant',
    description: 'Like "p" in pen — both lips, with a puff of air at start',
    practiceWords: ['pen', 'paper', 'people', 'speak', 'stop'],
    exampleSentence: 'People speak, but stop to think.',
    hindiHint: 'शुरुआत में हवा का puff — Hindi "प" से ज्यादा aspirated',
    commonMistake: 'No aspiration at word start — sounds too soft',
    difficulty: 'Easy',
    color: 'yellow',
  },
  {
    id: 17,
    symbol: '/ŋ/',
    name: 'NG Sound',
    category: 'Consonant',
    description: 'Like "ng" in sing — back of tongue to soft palate, nasal',
    practiceWords: ['sing', 'ring', 'king', 'long', 'strong'],
    exampleSentence: 'The king will sing a long song.',
    hindiHint: 'Hindi के "ण" जैसा लेकिन back में — tongue back को palate पर',
    commonMistake: 'Adding a /g/ at end — "sing" as "sing-g"',
    difficulty: 'Medium',
    color: 'fuchsia',
  },
  {
    id: 18,
    symbol: '/ʃ/',
    name: 'SH Sound',
    category: 'Consonant',
    description: 'Like "sh" in shop — lips forward, tongue back, hushing sound',
    practiceWords: ['shop', 'she', 'push', 'wash', 'nation'],
    exampleSentence: 'She will wash the dish in the shop.',
    hindiHint: 'Hindi के "श" जैसा — lips थोड़े आगे करो',
    commonMistake: 'Mixed with /s/ — "shop" sounds like "sop"',
    difficulty: 'Easy',
    color: 'teal',
  },
  {
    id: 19,
    symbol: '/dʒ/',
    name: 'DJ Sound',
    category: 'Consonant',
    description: 'Like "j" in jump — tongue behind teeth, voiced /tʃ/',
    practiceWords: ['jump', 'job', 'judge', 'bridge', 'age'],
    exampleSentence: 'The judge got a job at the edge.',
    hindiHint: 'Hindi के "ज" जैसा लेकिन "d" से शुरू — "d+zh"',
    commonMistake: 'Pronounced as plain /z/ — losing the d-sound start',
    difficulty: 'Medium',
    color: 'indigo',
  },
  {
    id: 20,
    symbol: '/h/',
    name: 'H Sound',
    category: 'Consonant',
    description: 'Like "h" in house — gentle breath, no friction, no voice',
    practiceWords: ['house', 'hot', 'help', 'have', 'here'],
    exampleSentence: 'Here he has a hot house.',
    hindiHint: 'Hindi के "ह" जैसा — हल्की सी breath, बहुत soft',
    commonMistake: 'Sometimes dropped or made too harsh',
    difficulty: 'Easy',
    color: 'slate',
  },
];

// ── Difficulty badge ──────────────────────────────────────────
const DIFF_COLORS = {
  Easy:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium:    'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Hard:      'text-red-400 bg-red-500/10 border-red-500/20',
  'Very Hard':'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

// ── Sound Card ────────────────────────────────────────────────
function SoundCard({ sound, isActive, onClick }) {
  const colorMap = {
    emerald: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300',
    teal:    'bg-teal-500/15 border-teal-500/25 text-teal-300',
    sky:     'bg-sky-500/15 border-sky-500/25 text-sky-300',
    blue:    'bg-blue-500/15 border-blue-500/25 text-blue-300',
    indigo:  'bg-indigo-500/15 border-indigo-500/25 text-indigo-300',
    violet:  'bg-violet-500/15 border-violet-500/25 text-violet-300',
    purple:  'bg-purple-500/15 border-purple-500/25 text-purple-300',
    amber:   'bg-amber-500/15 border-amber-500/25 text-amber-300',
    orange:  'bg-orange-500/15 border-orange-500/25 text-orange-300',
    red:     'bg-red-500/15 border-red-500/25 text-red-300',
    rose:    'bg-rose-500/15 border-rose-500/25 text-rose-300',
    pink:    'bg-pink-500/15 border-pink-500/25 text-pink-300',
    cyan:    'bg-cyan-500/15 border-cyan-500/25 text-cyan-300',
    lime:    'bg-lime-500/15 border-lime-500/25 text-lime-300',
    green:   'bg-green-500/15 border-green-500/25 text-green-300',
    yellow:  'bg-yellow-500/15 border-yellow-500/25 text-yellow-300',
    fuchsia: 'bg-fuchsia-500/15 border-fuchsia-500/25 text-fuchsia-300',
    slate:   'bg-slate-500/15 border-slate-500/25 text-slate-300',
  };

  const cls = colorMap[sound.color] || colorMap.slate;

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`card p-3 text-left transition-all w-full ${
        isActive ? 'border-white/25 bg-white/8' : 'hover:border-white/15'
      }`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border text-base font-black mb-2 ${cls}`}>
        {sound.symbol}
      </div>
      <p className="text-xs font-bold text-white leading-tight">{sound.name}</p>
      <p className="text-[10px] text-slate-500 mt-0.5">{sound.category}</p>
      <span className={`mt-1.5 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded border ${DIFF_COLORS[sound.difficulty]}`}>
        {sound.difficulty}
      </span>
    </motion.button>
  );
}

// ── Listen & Repeat Component ─────────────────────────────────
function ListenRepeat({ sound }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [practiced, setPracticed] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const word = sound.practiceWords[currentWordIdx];

  // Simulate audio play (Web Speech API if available)
  const handleListen = () => {
    setIsPlaying(true);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 800);
    }
  };

  const handleListenSentence = () => {
    setIsPlaying(true);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(sound.exampleSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.75;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const markPracticed = () => {
    setPracticed(prev => new Set([...prev, currentWordIdx]));
  };

  const goNext = () => {
    setCurrentWordIdx(i => (i + 1) % sound.practiceWords.length);
  };

  const goPrev = () => {
    setCurrentWordIdx(i => (i - 1 + sound.practiceWords.length) % sound.practiceWords.length);
  };

  return (
    <div className="space-y-5">
      {/* Current word display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Practice Word</p>
          <p className="text-5xl font-black text-white mb-2">{word}</p>
          <p className="text-sm text-slate-500">{sound.symbol} sound</p>
          {practiced.has(currentWordIdx) && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-emerald-400 mt-2 flex items-center justify-center gap-1"
            >
              <CheckCircle2 size={12} /> Practiced!
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={handleListen}
          disabled={isPlaying}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-300 font-semibold hover:bg-rose-500/25 transition-all disabled:opacity-60"
        >
          <motion.div animate={isPlaying ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
            <Volume2 size={16} />
          </motion.div>
          {isPlaying ? 'Playing…' : '🔊 Listen'}
        </button>

        <button
          onClick={markPracticed}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-semibold hover:bg-emerald-500/25 transition-all"
        >
          <Mic size={16} /> I Repeated It
        </button>

        <button
          onClick={goNext}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Word progress dots */}
      <div className="flex justify-center gap-2">
        {sound.practiceWords.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentWordIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentWordIdx
                ? 'bg-rose-400 w-5'
                : practiced.has(i)
                ? 'bg-emerald-500'
                : 'bg-white/15'
            }`}
          />
        ))}
      </div>

      {/* Example sentence */}
      <div className="p-4 rounded-xl bg-white/3 border border-white/8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example Sentence</p>
          <button
            onClick={handleListenSentence}
            className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Volume2 size={12} /> Listen
          </button>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">{sound.exampleSentence}</p>
      </div>

      {/* Practiced count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{practiced.size}/{sound.practiceWords.length} words practiced</span>
        {practiced.size === sound.practiceWords.length && (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> All words done! ✨
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function PronunciationPage() {
  const [activeSound, setActiveSound] = useState(IPA_SOUNDS[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [completedSounds, setCompletedSounds] = useState(new Set());

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  const { xp } = useUserStore();

  const filteredSounds = activeCategory === 'all'
    ? IPA_SOUNDS
    : IPA_SOUNDS.filter(s => s.category === activeCategory);

  const markSoundComplete = () => {
    setCompletedSounds(prev => new Set([...prev, activeSound.id]));
  };

  const goToNextSound = () => {
    const idx = IPA_SOUNDS.findIndex(s => s.id === activeSound.id);
    if (idx < IPA_SOUNDS.length - 1) {
      setActiveSound(IPA_SOUNDS[idx + 1]);
    }
  };

  return (
    <div className="space-y-7">

      {/* ── Header ───────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-rose-600/20 via-pink-600/15 to-fuchsia-600/10 border border-white/10"
      >
        <div className="flex items-start gap-4">
          <Link
            href="/speaking-studio"
            className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft size={14} />
          </Link>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shrink-0"
          >
            <span className="text-xl">🔤</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-black text-white">Pronunciation Practice</h1>
              <span className="text-xs bg-rose-500/15 text-rose-300 px-2 py-0.5 rounded-md border border-rose-500/20 font-bold">
                20 Sounds
              </span>
            </div>
            <p className="text-sm text-rose-300 mt-0.5">Master the 20 most important English sounds with IPA guide</p>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
              Learn each sound with examples, practice words, and native-speaker playback. Special focus on sounds Hindi speakers find difficult.
            </p>

            {/* Progress */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden max-w-xs">
                <motion.div
                  animate={{ width: `${(completedSounds.size / IPA_SOUNDS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
                />
              </div>
              <span className="text-xs text-slate-500">{completedSounds.size}/{IPA_SOUNDS.length} mastered</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Category filter ──────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'Vowel', 'Consonant'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              activeCategory === cat
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            {cat === 'all' ? 'All Sounds' : cat + 's'} {cat !== 'all' && `(${IPA_SOUNDS.filter(s => s.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* ── Main layout ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Sound grid — left panel */}
        <div className="lg:col-span-1">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-bold">Select a Sound</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
            {filteredSounds.map((sound) => (
              <div key={sound.id} className="relative">
                <SoundCard
                  sound={sound}
                  isActive={activeSound.id === sound.id}
                  onClick={() => setActiveSound(sound)}
                />
                {completedSounds.has(sound.id) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={10} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Practice area — right panel */}
        <div className="lg:col-span-2 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSound.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Sound info */}
              <div className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-4xl font-black text-rose-300">{activeSound.symbol}</span>
                      <div>
                        <h2 className="font-black text-white text-lg">{activeSound.name}</h2>
                        <span className="text-xs text-slate-500">{activeSound.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{activeSound.description}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg border shrink-0 ${DIFF_COLORS[activeSound.difficulty]}`}>
                    {activeSound.difficulty}
                  </span>
                </div>

                {/* Hindi hint */}
                <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20 mb-4">
                  <p className="text-xs text-amber-300 flex items-start gap-2">
                    <span className="shrink-0">💡 Hindi Tip:</span>
                    <span className="text-slate-300">{activeSound.hindiHint}</span>
                  </p>
                </div>

                {/* Common mistake */}
                <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                  <p className="text-xs text-red-300 flex items-start gap-2">
                    <span className="shrink-0">⚠️ Common Mistake:</span>
                    <span className="text-slate-300">{activeSound.commonMistake}</span>
                  </p>
                </div>
              </div>

              {/* Listen & Repeat */}
              <div className="card p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Volume2 size={16} className="text-rose-400" /> Listen & Repeat
                </h3>
                <ListenRepeat sound={activeSound} />
              </div>

              {/* Mark complete + next */}
              <div className="flex gap-3">
                <button
                  onClick={markSoundComplete}
                  disabled={completedSounds.has(activeSound.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    completedSounds.has(activeSound.id)
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 cursor-default'
                      : 'bg-rose-500/15 text-rose-300 border border-rose-500/25 hover:bg-rose-500/25'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {completedSounds.has(activeSound.id) ? 'Sound Mastered! ✅' : 'Mark as Mastered'}
                </button>
                <button
                  onClick={goToNextSound}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-all"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Tips section ─────────────────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-rose-400" /> How to Use This Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { step: '1', title: 'Select a Sound', desc: 'Choose a sound from the grid on the left', icon: Target },
            { step: '2', title: 'Read the Tip', desc: 'Understand the Hindi hint and common mistake', icon: BookOpen },
            { step: '3', title: 'Listen & Repeat', desc: 'Press 🔊 to hear the word, then repeat aloud', icon: Volume2 },
            { step: '4', title: 'Mark Mastered', desc: 'Once confident, mark the sound as mastered', icon: CheckCircle2 },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-xs font-black text-rose-300 shrink-0">
                {step}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
