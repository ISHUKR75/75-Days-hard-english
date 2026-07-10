'use client';
// Vocabulary Day Page — Interactive flashcard session for a specific day's vocabulary
// Features: flippable cards, TTS text-to-speech pronunciation, mastered state tracking, confetti

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, Volume2, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import useUserStore from '@/store/userStore';
import { getTopicByDay } from '@/lib/topics';
import { getVocabularyForDay } from '@/lib/vocabularyData';

export default function VocabularyDayPage() {
  const params  = useParams();
  const dayNum  = parseInt(String(params?.daySlug || 'day-1').replace(/^day-/, '') || '1', 10);
  const topic   = getTopicByDay(dayNum);

  // Real handcrafted words (when authored for this day) always come first,
  // topped up with generated words to a rich 500-word bank for every day.
  // This is the initial/fallback bank shown instantly on mount.
  const fallbackWords = useMemo(() => getVocabularyForDay(dayNum, 500), [dayNum]);
  const [words, setWords] = useState(fallbackWords);
  const [index, setIndex] = useState(0);

  // Fetch the full vocabulary bank for this day from the API, which reads
  // data/challenge/day-XX/vocabulary.json (500-1000 words per day). Falls
  // back to the fallback bank above if the fetch fails or the day
  // has no generated file yet — whichever bank is bigger, so the learner
  // never sees fewer words than what was actually generated for this day.
  useEffect(() => {
    let cancelled = false;
    setWords(fallbackWords);
    setIndex(0);
    fetch(`/api/challenge/${dayNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.vocabulary) && data.vocabulary.length > 0) {
          // Normalize the richer API word shape to this page's simple shape
          const normalized = data.vocabulary.map((w) => ({
            word: w.word,
            hindi: w.hindi,
            ipa: w.ipa || '',
            meaning: w.simpleMeaning || w.meaning || '',
            example: w.sentences?.daily || w.example || '',
            officeEx: w.sentences?.office || w.officeEx || '',
            category: w.category || 'Vocabulary',
            day: dayNum,
            difficulty: w.difficulty || 'medium',
          }));
          // Use whichever source has more real words for this day.
          setWords(normalized.length > fallbackWords.length ? normalized : fallbackWords);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [dayNum, fallbackWords]);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState({});
  const [sessionDone, setSessionDone] = useState(false);

  const { addXP, addWordsLearned } = useUserStore();

  const currentWord = words[index];
  const totalWords = words.length;
  const masteredCount = Object.values(mastered).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / totalWords) * 100);

  const speak = (txt) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(txt);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    // Dispatch sound event for UI feedback
    window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: 'correct' } }));
  };

  const handleNext = () => {
    setFlipped(false);
    if (index < totalWords - 1) {
      setIndex(i => i + 1);
    } else {
      // Completed session
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      addXP(50); // Completed session XP bonus
      addWordsLearned(totalWords);
      setSessionDone(true);
    }
  };

  const toggleMastered = (idx) => {
    setMastered(p => {
      const next = { ...p, [idx]: !p[idx] };
      if (!p[idx]) {
        addXP(5);
      }
      return next;
    });
  };

  if (!topic) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">❓</div>
        <h2 className="text-xl font-bold text-white mb-2">Day not found</h2>
        <Link href="/75-days-challenge" className="btn-primary">← Back to Challenge</Link>
      </div>
    );
  }

  if (sessionDone) {
    return (
      <div className="max-w-md mx-auto card p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-4xl mx-auto mb-4">
          🏆
        </div>
        <h2 className="text-3xl font-black text-white">Daily Vocabulary Complete!</h2>
        <p className="text-slate-400">
          Superb! You studied all {totalWords} words for today and mastered them.
        </p>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-sm">
          +50 XP Study Reward claimed! ⚡
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setIndex(0); setSessionDone(false); setMastered({}); }}
            className="btn-secondary py-3 text-sm font-bold">
            Review Again
          </button>
          <Link href={`/75-days-challenge/${dayNum}`} className="btn-gradient py-3 text-sm font-bold flex items-center justify-center">
            Continue Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-white transition-colors">
          Day {dayNum}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Vocabulary</span>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="badge-primary text-xs">Day {dayNum} Vocabulary</span>
          <h2 className="text-2xl font-black text-white mt-1">{topic.title}</h2>
        </div>
        <Link href={`/75-days-challenge/${dayNum}`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* Progress meter */}
      <div className="card p-4 flex items-center justify-between bg-white/3 border-white/6">
        <div className="space-y-1">
          <p className="text-xs text-slate-500">Practice Session Progress</p>
          <p className="text-sm font-bold text-white">{masteredCount} of {totalWords} words mastered</p>
        </div>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Interactive Flippable Card */}
      <div className="relative" style={{ perspective: 1000, height: 260 }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          style={{ transformStyle: 'preserve-3d', position: 'absolute', inset: 0 }}
        >
          {/* Front Side */}
          <div 
            onClick={() => setFlipped(true)}
            className="absolute inset-0 card p-6 cursor-pointer backface-hidden flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Word {index + 1} of {totalWords}</span>
              <span className="badge-primary bg-primary-500/10 border border-primary-500/20 text-primary-300 text-[10px] uppercase font-bold tracking-wider">{currentWord.category || 'Vocabulary'}</span>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-black text-white tracking-tight">{currentWord.word}</h3>
              {currentWord.ipa && <p className="text-sm text-slate-400 font-mono select-none">{currentWord.ipa}</p>}
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                className="btn-secondary rounded-full w-10 h-10 flex items-center justify-center p-0 text-primary-400 hover:text-white"
                title="Hear Pronunciation"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-center text-xs text-slate-500 select-none">Tap to flip & view Hindi translation & meaning</p>
          </div>

          {/* Back Side */}
          <div 
            onClick={() => setFlipped(false)}
            className="absolute inset-0 card p-6 cursor-pointer bg-primary-500/5 border-primary-500/25 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-primary-300 font-bold uppercase tracking-wider">Meaning & Example</span>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMastered(index); }}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  mastered[index] 
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 size={12} />
                {mastered[index] ? 'Mastered!' : 'Mark Mastered'}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Hindi Translation</p>
                <p className="text-xl font-bold text-amber-200">{currentWord.hindi}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Definition</p>
                <p className="text-sm text-slate-200">{currentWord.meaning}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Example Sentence</p>
                <p className="text-xs text-emerald-300 italic">" {currentWord.example} "</p>
                {currentWord.officeEx && (
                  <p className="text-xs text-sky-300 italic mt-1">💼 " {currentWord.officeEx} "</p>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 select-none">Tap to flip back</p>
          </div>
        </motion.div>
      </div>

      {/* Nav Controls */}
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={() => { if (index > 0) { setIndex(i => i - 1); setFlipped(false); } }}
          disabled={index === 0}
          className="btn-secondary py-3 flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Prev Word
        </button>

        <button 
          onClick={handleNext}
          className="btn-gradient py-3 flex-1 flex items-center justify-center gap-2"
        >
          {index === totalWords - 1 ? 'Finish & Claim' : 'Next Word'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
