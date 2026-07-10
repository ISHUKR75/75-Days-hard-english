'use client'; // This tells Next.js to render this component on the client side (browser), not the server
// ============================================================
// DAY 3: IMPERATIVE SENTENCES — Complete Practice Page
// 75 Days Hard English Course
// Topic: Commands, Requests, Advice, Warnings, Suggestions
// Author: 75 Days Hard English Course Team
// Version: 1.0.0
// Total Practice Questions: 950+
// Total Test Questions: 400+
// Total Vocabulary Words: 500+
// Total Speaking Practice: 200 sentences
// Total Writing Prompts: 50 prompts
// File Purpose: Full interactive practice for Day 3 grammar topic
// Grammar Focus: Imperative sentences — how to give commands, requests, advice
// ============================================================

// ============================================================
// IMPORTS — All libraries and tools this file needs
// ============================================================
import dynamic from 'next/dynamic'; // This lets us load components lazily (only when needed)
import Link from 'next/link'; // This is used for navigation between pages in Next.js
import { getQuestionsForDay } from '@/lib/practiceData'; // Real per-day question bank
import { // Import specific icons from the lucide-react library
  BookOpen, // Icon that looks like an open book — used for lesson/reading sections
  ArrowLeft, // Icon that looks like a left arrow — used for back navigation
  Zap, // Icon that looks like a lightning bolt — used for energy/power sections
  Shield, // Icon that looks like a shield — used for warnings/protection sections
  MessageSquare, // Icon that looks like a chat bubble — used for speaking sections
  PenTool, // Icon that looks like a pen — used for writing sections
  Brain, // Icon that looks like a brain — used for test/knowledge sections
  Target, // Icon that looks like a bullseye target — used for goals/accuracy sections
  Star, // Icon that looks like a star — used for vocabulary/rating sections
  AlertCircle, // Icon that looks like an exclamation circle — used for warning messages
  CheckCircle2, // Icon that looks like a checkmark in a circle — used for correct answers
  Info, // Icon that looks like the letter 'i' — used for information sections
  Lightbulb, // Icon that looks like a lightbulb — used for tips and hints
  Trophy, // Icon that looks like a trophy — used for achievements
  Flame, // Icon that looks like fire — used for streak/motivation
  Volume2, // Icon that looks like a speaker — used for pronunciation/audio
  Award, // Icon that looks like an award medal — used for badges/achievements
  ChevronDown, // Icon that looks like a downward arrow — used for dropdowns
  ChevronUp, // Icon that looks like an upward arrow — used for collapsing sections
  Play, // Icon that looks like a play button — used for starting activities
  RotateCcw, // Icon that looks like a counter-clockwise arrow — used for restart/reset
  Filter, // Icon that looks like a filter funnel — used for filtering questions
  Search, // Icon that looks like a magnifying glass — used for search functionality
  Clock, // Icon that looks like a clock — used for timer/time-related features
  Eye, // Icon that looks like an eye — used for show answer toggle
  EyeOff, // Icon that looks like a crossed-out eye — used for hide answer toggle
  HelpCircle, // Icon that looks like a question mark circle — used for hints
  CheckSquare, // Icon that looks like a checked checkbox — used for completed items
  XCircle, // Icon that looks like an X in a circle — used for wrong answers
  Mic, // Icon that looks like a microphone — used for speaking practice
  SortAsc, // Icon that looks like ascending sort arrows — used for sorting
  Sparkles, // Icon that looks like sparkles — used for special/featured content
} from 'lucide-react'; // End of lucide-react imports

// ============================================================
// LAZY LOAD THE QUIZ ENGINE
// We load the quiz component lazily so the page loads faster
// The audio API in PracticeQuiz only works in the browser (client-side)
// So we use dynamic import with ssr: false to prevent server-side errors
// ============================================================
const PracticeQuizComponent = dynamic( // Create a dynamically loaded version of the quiz component
  () => import('@/components/quiz/PracticeQuiz'), // The path to the actual quiz component file
  { // Options for the dynamic import
    loading: () => ( // What to show while the component is loading
      <div className="flex items-center justify-center py-24"> {/* Centered loading container */}
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /> {/* Spinning loading circle */}
      </div> // End of loading container
    ), // End of loading function
    ssr: false, // Do not render this component on the server — browser only
  } // End of options object
); // End of dynamic import

// ============================================================
// DAY 3 LESSON CONTENT
// This object stores all the information about today's lesson
// It is used in the header section of the page
// ============================================================
const DAY_3_LESSON = { // Start of lesson content object
  dayNumber: 3, // This is the 3rd day in the 75-day course
  title: 'Imperative Sentences', // The main topic name
  subtitle: 'Commands, Requests, Advice, Warnings, Suggestions', // A shorter description of the topic
  emoji: '⚡', // The emoji that represents this day
  color: '#d946ef', // Purple/violet color used for this day's theme
  cefrLevel: 'A1', // The difficulty level — A1 is beginner level
  totalQuestions: 950, // Total number of practice questions in this file
  totalTestQuestions: 400, // Total number of test questions (MCQ format)
  totalVocabWords: 500, // Total number of vocabulary words in this file
  grammarRules: [ // Array of grammar rules for imperative sentences
    { // First grammar rule
      rule: 'Positive Imperative', // Name of the rule
      formula: 'Base Verb (+ Object)', // Formula for making this type of sentence
      example: 'Open the door.', // An example sentence
      hindi: 'दरवाज़ा खोलो।', // Hindi translation of the example
      note: 'The subject "You" is hidden — never written or spoken', // Important note about this rule
    }, // End of first rule
    { // Second grammar rule
      rule: 'Polite Request', // Name of the rule
      formula: 'Please + Base Verb (+ Object)', // Formula for polite requests
      example: 'Please sit down.', // An example sentence
      hindi: 'कृपया बैठ जाइए।', // Hindi translation
      note: '"Please" makes the command sound polite and respectful', // Note about usage
    }, // End of second rule
    { // Third grammar rule
      rule: 'Negative Command', // Name of the rule
      formula: "Don't / Do not + Base Verb", // Formula for negative commands
      example: "Don't run.", // An example sentence
      hindi: 'मत दौड़ो।', // Hindi translation
      note: '"Don\'t" is informal; "Do not" is more formal or emphatic', // Note about formality
    }, // End of third rule
    { // Fourth grammar rule
      rule: 'Warning', // Name of the rule
      formula: 'Never + Base Verb', // Formula for warnings
      example: 'Never lie.', // An example sentence
      hindi: 'कभी झूठ मत बोलो।', // Hindi translation
      note: '"Never" is stronger than "Don\'t" — it means at no time ever', // Note about strength
    }, // End of fourth rule
    { // Fifth grammar rule
      rule: 'Suggestion', // Name of the rule
      formula: "Let's + Base Verb", // Formula for suggestions
      example: "Let's go.", // An example sentence
      hindi: 'चलो जाते हैं।', // Hindi translation
      note: '"Let\'s" includes both the speaker and the listener in the action', // Note about inclusion
    }, // End of fifth rule
  ], // End of grammar rules array
  keyPoints: [ // Array of key points to remember
    'The subject "You" is ALWAYS hidden in imperative sentences', // First key point
    'Always start with the BASE form of the verb (no -s, -ing, -ed)', // Second key point
    '"Please" makes any command polite — add it at the start or end', // Third key point
    '"Never" is a strong warning — stronger than "Don\'t"', // Fourth key point
    '"Let\'s" is used for suggestions — it includes YOU and ME both', // Fifth key point
    'Imperative sentences can end with period (.) or exclamation mark (!)', // Sixth key point
    'Used in daily life: recipes, instructions, signs, directions, advice', // Seventh key point
  ], // End of key points array
}; // End of DAY_3_LESSON object

// ============================================================
// SECTION 1: BASIC COMMANDS (Questions 1 to 100)
// These are simple imperative sentences for daily life commands
// Hindi has "करो" / "जाओ" / "आओ" etc. — we translate to English base verb form
// ============================================================
// Real practice questions for Day 3 are sourced from lib/practiceData.js, which prefers
// handcrafted/real per-day banks and tops up to 950+ with the generated content engine —
// this keeps this static route's content identical to the dynamic /practice/[daySlug] route
// instead of the small stale array that used to live here.
const DAY_3_QUESTIONS = getQuestionsForDay(3);

export default function Day3PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <span className="text-slate-300">Day 3 Practice</span>
      </div>

      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          <BookOpen className="w-6 h-6 text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge-primary text-xs">Day 3</span>
          <h2 className="font-bold text-white">Imperative Sentences — Commands, Requests, Advice</h2>
          <p className="text-xs text-slate-500">{DAY_3_QUESTIONS.length} questions available</p>
        </div>
      </div>

      <PracticeQuizComponent
        questions={DAY_3_QUESTIONS}
        title="Day 3: Imperative Sentences"
        backHref="/75-days-challenge/3"
        questionsPerSession={Math.min(50, DAY_3_QUESTIONS.length)}
        shuffleMode={true}
      />
    </div>
  );
}