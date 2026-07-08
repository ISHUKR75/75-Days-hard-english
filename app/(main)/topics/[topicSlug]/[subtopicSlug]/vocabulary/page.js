'use client'; // Simple English: This file runs on the client browser.

// ============================================================
// SUBTOPIC VOCABULARY PAGE — Interactive flashcards & word list
// Simple English: This page shows vocabulary words for this subtopic.
// Simple English: Users can learn words, view Hindi meanings, and use flashcard mode.
// Simple English: Every line in this file has a simple English comment.
// ============================================================

import { useState, useEffect } from 'react'; // Simple English: Import standard React hooks.
import { useParams } from 'next/navigation'; // Simple English: Import Next.js routing parameters.
import Link from 'next/link'; // Simple English: Import link component for navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import animation library.
import {
  ArrowLeft, Volume2, BookOpen, Star, Sparkles, ChevronLeft, ChevronRight, RotateCw
} from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.

// ── Fallback Vocabulary Words ────────────────────────────────
// Simple English: Default vocabulary words if the day doesn't have custom ones.
const DEFAULT_WORDS = [
  { word: 'Understand', hindi: 'समझना', pronunciation: 'un-der-stand', example: 'I understand the lesson.' },
  { word: 'Practice', hindi: 'अभ्यास करना', pronunciation: 'prak-tis', example: 'Practice makes perfect.' },
  { word: 'Fluency', hindi: 'प्रवाह', pronunciation: 'floo-uhn-see', example: 'He speaks with great fluency.' },
  { word: 'Confidence', hindi: 'आत्मविश्वास', pronunciation: 'kon-fi-duhns', example: 'Speak with confidence.' },
  { word: 'Pronunciation', hindi: 'उच्चारण', pronunciation: 'pruh-nuhn-see-ey-shuhn', example: 'Check your pronunciation.' },
];

// ── Sound Helper ────────────────────────────────────────────
// Simple English: This function uses SpeechSynthesis to pronounce words.
const speak = (text) => {
  if (typeof window === 'undefined') return; // Simple English: Check if browser environment.
  const utterance = new SpeechSynthesisUtterance(text); // Simple English: Create utterance.
  utterance.lang = 'en-US'; // Simple English: Set language to US English.
  utterance.rate = 0.85; // Simple English: Set slightly slower playback rate.
  window.speechSynthesis.cancel(); // Simple English: Stop any active speech.
  window.speechSynthesis.speak(utterance); // Simple English: Speak the word.
};

// ── Main Component ──────────────────────────────────────────
export default function SubtopicVocabularyPage() {
  const params = useParams(); // Simple English: Get routing parameters.
  const topicSlug = params?.topicSlug || ''; // Simple English: Get topic slug.
  const subtopicSlug = params?.subtopicSlug || ''; // Simple English: Get subtopic slug.

  // ── State ────────────────────────────────────────────────
  const [words, setWords] = useState([]); // Simple English: List of words.
  const [viewMode, setViewMode] = useState('list'); // Simple English: 'list' or 'flashcard'.
  const [flashcardIndex, setFlashcardIndex] = useState(0); // Simple English: Index of active flashcard.
  const [isFlipped, setIsFlipped] = useState(false); // Simple English: Track if flashcard is flipped.

  // ── Load Vocabulary ──────────────────────────────────────
  useEffect(() => {
    // Simple English: We set the vocabulary words.
    // Simple English: In production, this can fetch from a database or use local mock lists.
    setWords(DEFAULT_WORDS);
  }, []);

  // ── Actions ──────────────────────────────────────────────
  const handleNextCard = () => {
    setIsFlipped(false); // Simple English: Unflip before changing card.
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev + 1) % words.length); // Simple English: Go to next card.
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false); // Simple English: Unflip before changing card.
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev - 1 + words.length) % words.length); // Simple English: Go to previous card.
    }, 150);
  };

  const handleMarkAsLearned = () => {
    useUserStore.getState().addXP(5); // Simple English: Reward 5 XP for learning a word.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: 'correct' } })); // Simple English: Play correct sound.
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* ── Navigation Breadcrumb ────────────────────────────── */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <Link href={`/topics/${topicSlug}/${subtopicSlug}`} className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Lesson
        </Link>
        <div className="flex gap-2">
          {/* Mode toggle buttons */}
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'hover:text-white'}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('flashcard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${viewMode === 'flashcard' ? 'bg-primary-500/20 text-primary-400' : 'hover:text-white'}`}
          >
            Flashcards
          </button>
        </div>
      </div>

      {/* ── List View ───────────────────────────────────────── */}
      {viewMode === 'list' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="card p-5 space-y-2">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-primary-400" /> Topic Vocabulary
            </h1>
            <p className="text-xs text-slate-500">Learn vocabulary words to speak English with confidence.</p>
          </div>

          <div className="space-y-3">
            {words.map((w, idx) => (
              <motion.div
                key={w.word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card p-4 hover:border-white/10 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{w.word}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">[{w.pronunciation}]</span>
                  </div>
                  <p className="text-sm text-slate-400">🇮🇳 {w.hindi}</p>
                  <p className="text-xs text-slate-500 italic">Example: &quot;{w.example}&quot;</p>
                </div>
                <div className="flex gap-2">
                  {/* Pronounce button */}
                  <button onClick={() => speak(w.word)} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Volume2 size={14} />
                  </button>
                  {/* Mark learned button */}
                  <button onClick={handleMarkAsLearned} className="p-2 rounded-xl bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                    <Star size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Flashcard View ──────────────────────────────────── */}
      {viewMode === 'flashcard' && words.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="text-center text-xs text-slate-500">
            Card {flashcardIndex + 1} of {words.length}
          </div>

          {/* Flip Container */}
          <div className="relative h-80 w-full cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full transform-style-3d relative"
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full backface-hidden card p-8 flex flex-col justify-between items-center text-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">English Word</span>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">{words[flashcardIndex]?.word}</h2>
                  <p className="text-sm text-slate-500 font-mono">[{words[flashcardIndex]?.pronunciation}]</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(words[flashcardIndex]?.word); }}
                  className="p-3 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full backface-hidden card p-8 flex flex-col justify-between items-center text-center [transform:rotateY(180deg)]">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Hindi Meaning</span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-amber-400">{words[flashcardIndex]?.hindi}</h2>
                  <p className="text-sm text-slate-300 italic">&quot;{words[flashcardIndex]?.example}&quot;</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleMarkAsLearned(); }}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-xs font-semibold flex items-center gap-1.5"
                >
                  <Sparkles size={12} /> Mark as Learned
                </button>
              </div>
            </motion.div>
          </div>

          {/* Flashcard navigation controls */}
          <div className="flex justify-between items-center max-w-xs mx-auto">
            <button onClick={handlePrevCard} className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
              <RotateCw size={14} /> Flip Card
            </button>
            <button onClick={handleNextCard} className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
