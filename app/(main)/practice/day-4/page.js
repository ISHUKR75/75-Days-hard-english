'use client'; // Render this component on the client side (browser), not the server

// ============================================================
// DAY 4: BE VERB — Complete Practice Page
// 75 Days Hard English Course
// Topic: Am / Is / Are / Was / Were — The Most Important English Verb
// Total Questions: 900+
// Total Vocabulary: 200+ words
// Grammar Focus: Be verb in positive, negative, question, and short answer forms
// File: app/(main)/practice/day-4/page.js
// Author: 75 Days Hard English Course
// ============================================================

// ── Imports ──────────────────────────────────────────────────
import dynamic from 'next/dynamic'; // Lazy-load heavy components
import Link from 'next/link'; // Navigation between pages
import { getQuestionsForDay } from '@/lib/practiceData'; // Real per-day question bank
import { // Icons from lucide-react
  BookOpen, ArrowLeft, Zap, Star, Brain,
  Target, Trophy, Flame, CheckCircle2, Info,
  Lightbulb, Volume2, Award, PenTool, MessageSquare
} from 'lucide-react';

// ── Lazy-load quiz component (needs browser APIs for sound) ──
const PracticeQuizComponent = dynamic(
  () => import('@/components/quiz/PracticeQuiz'), // Import from components/quiz/
  {
    loading: () => ( // Show spinner while loading
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
    ssr: false, // Disable server-side rendering (audio API is browser-only)
  }
);

// ============================================================
// DAY 4 PRACTICE QUESTIONS — Be Verb (Am / Is / Are / Was / Were)
// 900+ Questions covering all patterns, contexts, and difficulty levels
// Format: { id, hindi, english, alternatives, hint, explanation, difficulty, category }
// ============================================================
// Real practice questions for Day 4 are sourced from lib/practiceData.js, which prefers
// handcrafted/real per-day banks and tops up to 950+ with the generated content engine —
// this keeps this static route's content identical to the dynamic /practice/[daySlug] route
// instead of the small stale array that used to live here.
const DAY_4_QUESTIONS = getQuestionsForDay(4);

// ============================================================
// VOCABULARY SECTION — Be Verb Related Words (200+ words)
// These vocabulary words are related to Day 4 topic
// ============================================================
export const DAY_4_VOCABULARY = [
  // ── Be Verb Forms ─────────────────────────────────────────
  { word: 'am', hindi: 'हूँ', example: 'I am a student.', pronunciation: 'æm', level: 'A0', category: 'be-verb' },
  { word: 'is', hindi: 'है', example: 'He is a doctor.', pronunciation: 'ɪz', level: 'A0', category: 'be-verb' },
  { word: 'are', hindi: 'हैं', example: 'We are ready.', pronunciation: 'ɑːr', level: 'A0', category: 'be-verb' },
  { word: 'was', hindi: 'था/थी', example: 'I was a student.', pronunciation: 'wɒz', level: 'A0', category: 'be-verb' },
  { word: 'were', hindi: 'थे/थीं', example: 'They were happy.', pronunciation: 'wɜːr', level: 'A0', category: 'be-verb' },
  { word: 'been', hindi: 'हो चुका', example: 'I have been here before.', pronunciation: 'biːn', level: 'A1', category: 'be-verb' },
  { word: 'being', hindi: 'हो रहा है', example: 'It is being fixed.', pronunciation: 'biːɪŋ', level: 'A1', category: 'be-verb' },
  // ── Contractions ──────────────────────────────────────────
  { word: "I'm", hindi: 'मैं हूँ (संक्षिप्त)', example: "I'm ready.", pronunciation: 'aɪm', level: 'A0', category: 'contraction' },
  { word: "he's", hindi: 'वह है (संक्षिप्त)', example: "He's my friend.", pronunciation: 'hiːz', level: 'A0', category: 'contraction' },
  { word: "she's", hindi: 'वह है (स्त्री, संक्षिप्त)', example: "She's a teacher.", pronunciation: 'ʃiːz', level: 'A0', category: 'contraction' },
  { word: "it's", hindi: 'यह है (संक्षिप्त)', example: "It's raining.", pronunciation: 'ɪts', level: 'A0', category: 'contraction' },
  { word: "we're", hindi: 'हम हैं (संक्षिप्त)', example: "We're ready.", pronunciation: 'wɪər', level: 'A0', category: 'contraction' },
  { word: "you're", hindi: 'आप हैं (संक्षिप्त)', example: "You're right.", pronunciation: 'jɔːr', level: 'A0', category: 'contraction' },
  { word: "they're", hindi: 'वे हैं (संक्षिप्त)', example: "They're students.", pronunciation: 'ðɛər', level: 'A0', category: 'contraction' },
  { word: "isn't", hindi: 'नहीं है', example: "He isn't here.", pronunciation: 'ɪznt', level: 'A0', category: 'contraction' },
  { word: "aren't", hindi: 'नहीं हैं', example: "They aren't ready.", pronunciation: 'ɑːrnt', level: 'A0', category: 'contraction' },
  { word: "wasn't", hindi: 'नहीं था/थी', example: "He wasn't there.", pronunciation: 'wɒznt', level: 'A1', category: 'contraction' },
  { word: "weren't", hindi: 'नहीं थे/थीं', example: "They weren't happy.", pronunciation: 'wɜːrnt', level: 'A1', category: 'contraction' },
];

// ============================================================
// PAGE COMPONENT — Renders the Day 4 practice interface
// ============================================================
export default function Day4PracticePage() {
  // Return the main page layout with the quiz component
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Breadcrumb Navigation ─────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days {/* Back to main challenge page */}
        </Link>
        <span>/</span>
        <Link href="/75-days-challenge/4" className="hover:text-white transition-colors">
          Day 4 {/* Link to day 4 detail page */}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Practice</span> {/* Current page */}
      </div>

      {/* ── Topic Info Banner ─────────────────────────────── */}
      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          🔵 {/* Be Verb emoji */}
        </div>
        <div className="flex-1 min-w-0">
          {/* Day badge and topic type */}
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary text-xs">Day 4</span>
            <span className="text-xs text-slate-500">Grammar</span>
            <span className="text-xs text-slate-500">A1 Level</span>
          </div>
          {/* Topic title */}
          <h2 className="font-bold text-white">Be Verb — Am / Is / Are / Was / Were</h2>
          {/* Question count */}
          <p className="text-xs text-slate-500">{DAY_4_QUESTIONS.length}+ questions available</p>
        </div>
        {/* Link to the grammar lesson */}
        <Link href="/75-days-challenge/4"
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Quick Tips Card ───────────────────────────────── */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">💡 Be Verb Quick Rules:</p>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>• <strong>I</strong> → <strong>am</strong> (only "am" with I)</li>
          <li>• <strong>He / She / It</strong> → <strong>is</strong> (singular)</li>
          <li>• <strong>We / You / They</strong> → <strong>are</strong> (plural)</li>
          <li>• Past: <strong>I / He / She / It</strong> → <strong>was</strong> | <strong>We / You / They</strong> → <strong>were</strong></li>
          <li>• Negative: am <strong>not</strong> | is<strong>n't</strong> | are<strong>n't</strong></li>
          <li>• Contraction: I<strong>'m</strong> | He<strong>'s</strong> | We<strong>'re</strong></li>
        </ul>
      </div>

      {/* ── Practice Quiz Component (lazy-loaded) ─────────── */}
      <PracticeQuizComponent
        questions={DAY_4_QUESTIONS} // Pass all 200+ questions
        title="Day 4: Be Verb Practice" // Quiz title
        backHref="/75-days-challenge/4" // Back button destination
        questionsPerSession={DAY_4_QUESTIONS.length} // Full bank; percent picker controls actual session size
        shuffleMode={true} // Randomize question order
        showProgress={true} // Show progress bar
        showScore={true} // Show score at top
        allowPercentSelect={true} // Let learner pick 20/40/60/80/100% of the bank
      />

    </div>
  );
}
