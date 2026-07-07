'use client';
// Individual Day Learning Page — Full lesson with theory, examples, and practice
// Shows concept explanation, vocabulary, and links to quiz/practice

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, BookOpen, Target, Mic,
  CheckCircle2, ChevronDown, ChevronUp, Star,
  Play, Volume2, PenTool, Brain, Zap, Lock,
  MessageSquare, FileText, Trophy,
} from 'lucide-react';
import DAYS_75_TOPICS, { getTopicByDay } from '@/lib/topics';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ============================================================
// Lesson sections that every topic has
// ============================================================
const LESSON_SECTIONS = [
  { id: 'concept',      icon: BookOpen,     label: 'Concept & Theory',          color: 'text-indigo-400' },
  { id: 'examples',     icon: MessageSquare,label: 'Real-Life Examples',         color: 'text-purple-400' },
  { id: 'mistakes',     icon: Star,         label: 'Common Mistakes',            color: 'text-amber-400' },
  { id: 'vocabulary',   icon: FileText,     label: 'Vocabulary (500+ Words)',    color: 'text-cyan-400' },
  { id: 'practice',     icon: Target,       label: 'Practice Questions (500+)',  color: 'text-emerald-400' },
  { id: 'speaking',     icon: Mic,          label: 'Speaking Practice',          color: 'text-pink-400' },
  { id: 'writing',      icon: PenTool,      label: 'Writing Practice',           color: 'text-rose-400' },
  { id: 'test',         icon: Brain,        label: 'Mini Test',                  color: 'text-violet-400' },
];

// ============================================================
// Day Lesson Page
// ============================================================
export default function DayPage() {
  const params = useParams();
  const dayNum = parseInt(params?.day || '1', 10);
  const topic  = getTopicByDay(dayNum);

  const { completeLesson, addXP, addCoins } = useUserStore();
  const { startTopic, completeTopic }        = useProgressStore();

  const [activeSection, setActiveSection] = useState('concept');
  const [sectionsDone,  setSectionsDone]  = useState({});
  const [loading,       setLoading]       = useState(false);

  // Track which sections the user has opened
  const markSectionDone = (id) => {
    setSectionsDone((prev) => ({ ...prev, [id]: true }));
    addXP(10); // 10 XP per section
  };

  // Prev/Next days
  const prevDay = dayNum > 1  ? dayNum - 1 : null;
  const nextDay = dayNum < 75 ? dayNum + 1 : null;

  if (!topic) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">❓</div>
        <h2 className="text-xl font-bold text-white mb-2">Day not found</h2>
        <Link href="/75-days-challenge" className="btn-primary">← Back to Challenge</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <span className="text-slate-300">Day {dayNum}</span>
      </div>

      {/* ── Topic Header ──────────────────────────────────── */}
      <div className="card p-6 border-primary-500/20 bg-primary-500/5">
        <div className="flex items-start gap-5">
          {/* Big emoji */}
          <div className="w-16 h-16 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-3xl shrink-0">
            {topic.emoji}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="badge-primary">Day {dayNum}</span>
              <span className="badge text-slate-400 bg-white/5 border border-white/8">{topic.cefr}</span>
              <span className={`badge capitalize ${
                topic.difficulty === 'beginner'     ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                topic.difficulty === 'elementary'   ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                topic.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>{topic.difficulty}</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-1">{topic.title}</h1>
            <p className="text-sm text-slate-400 capitalize">{topic.type} lesson</p>
          </div>
        </div>

        {/* Overall progress for this day */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Lesson Progress</span>
            <span>{Object.keys(sectionsDone).length}/{LESSON_SECTIONS.length} sections</span>
          </div>
          <div className="h-2 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-700"
              style={{ width: `${(Object.keys(sectionsDone).length / LESSON_SECTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Lesson Sections List ──────────────────────────── */}
      <div className="space-y-3">
        {LESSON_SECTIONS.map(({ id, icon: Icon, label, color }) => {
          const isDone = sectionsDone[id];
          const isActive = activeSection === id;

          return (
            <div key={id} className={`card overflow-hidden transition-all ${isActive ? 'border-primary-500/30' : ''}`}>
              {/* Section Header — click to expand */}
              <button
                onClick={() => {
                  setActiveSection(isActive ? null : id);
                  if (!isDone) markSectionDone(id);
                }}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/3 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${isDone ? 'bg-accent-500/15' : 'bg-white/5'} flex items-center justify-center shrink-0`}>
                  {isDone
                    ? <CheckCircle2 size={18} className="text-accent-400" />
                    : <Icon size={18} className={color} />
                  }
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{label}</p>
                  {isDone && <p className="text-xs text-accent-400">Completed ✓</p>}
                </div>
                <div className="flex items-center gap-3">
                  {!isDone && (
                    <span className="text-xs text-primary-400 font-semibold bg-primary-500/10 px-2 py-1 rounded-lg">+10 XP</span>
                  )}
                  {isActive ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-600" />}
                </div>
              </button>

              {/* Section Content */}
              {isActive && (
                <div className="px-5 pb-6 border-t border-white/5 pt-5">
                  {id === 'concept' && <ConceptSection topic={topic} dayNum={dayNum} />}
                  {id === 'examples' && <ExamplesSection topic={topic} />}
                  {id === 'mistakes' && <MistakesSection topic={topic} />}
                  {id === 'vocabulary' && <VocabularySection topic={topic} dayNum={dayNum} />}
                  {id === 'practice' && <PracticeLink dayNum={dayNum} />}
                  {id === 'speaking' && <SpeakingSection topic={topic} />}
                  {id === 'writing' && <WritingSection topic={topic} />}
                  {id === 'test' && <TestLink dayNum={dayNum} />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Navigation ─────────────────────────────────────── */}
      <div className="flex justify-between gap-4">
        {prevDay ? (
          <Link href={`/75-days-challenge/${prevDay}`}
            className="btn-secondary flex items-center gap-2 text-sm">
            <ArrowLeft size={15} /> Day {prevDay}
          </Link>
        ) : <div />}

        {nextDay ? (
          <Link href={`/75-days-challenge/${nextDay}`}
            className="btn-primary flex items-center gap-2 text-sm">
            Day {nextDay} <ArrowRight size={15} />
          </Link>
        ) : (
          <div className="text-center text-sm text-slate-500">🎉 Last Day!</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Section Components
// ============================================================

function ConceptSection({ topic, dayNum }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-xl">{topic.emoji}</span> {topic.title} — What is it?
        </h3>
        <div className="p-4 rounded-xl bg-primary-500/8 border border-primary-500/15">
          <p className="text-slate-300 text-sm leading-relaxed">
            {/* Placeholder — will be filled from data files */}
            <span className="hindi-text">अभी इस topic का explanation यहाँ आएगा।</span>
            <br /><br />
            This section contains the complete theory, rules, and concept explanation for <strong className="text-white">{topic.title}</strong>.
            The explanation covers both Hindi and English with visual examples, sentence patterns, and usage rules.
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-300 mb-3">📌 Key Rules</h4>
        <div className="space-y-2">
          {[
            'Rule 1: Basic sentence structure and formation',
            'Rule 2: When to use and when not to use',
            'Rule 3: Common patterns and variations',
            'Rule 4: Formal vs informal usage',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
              <CheckCircle2 size={15} className="text-accent-400 shrink-0 mt-0.5" />
              {rule}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-300 mb-3">💡 Memory Trick</h4>
        <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/15">
          <p className="text-amber-300 text-sm">
            <strong>Easy Trick:</strong> Remember this pattern to never forget this rule!
            This memory trick helps you recall the concept instantly.
          </p>
        </div>
      </div>

      {/* AI Explanation button */}
      <button className="btn-secondary text-sm flex items-center gap-2">
        <Zap size={15} className="text-violet-400" />
        Ask AI to Explain in Detail
      </button>
    </div>
  );
}

function ExamplesSection({ topic }) {
  const examples = [
    { hindi: 'मैं पानी पीना चाहता हूँ।',   english: 'I want to drink water.',        type: 'daily' },
    { hindi: 'वह ऑफिस जाना चाहती है।',     english: 'She wants to go to the office.', type: 'office' },
    { hindi: 'हम मिलना चाहते हैं।',        english: 'We want to meet.',               type: 'conversation' },
    { hindi: 'क्या आप कुछ कहना चाहते हैं?', english: 'Do you want to say something?',  type: 'question' },
    { hindi: 'मैं यह नहीं चाहता।',          english: 'I don\'t want this.',            type: 'negative' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Real-life examples — Hindi to English translation:</p>
      {examples.map(({ hindi, english, type }, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6 group hover:border-white/10 transition-all">
          <p className="hindi-text text-sm mb-1">🇮🇳 {hindi}</p>
          <p className="english-text text-sm">🇬🇧 {english}</p>
          <span className="text-[10px] text-slate-600 capitalize mt-1 inline-block">{type}</span>
        </div>
      ))}
      <p className="text-xs text-slate-600 mt-2">+ 100 more examples in the full practice section →</p>
    </div>
  );
}

function MistakesSection({ topic }) {
  const mistakes = [
    { wrong: 'I am want to go.',           correct: 'I want to go.',             explanation: '"Am" should not be used with "want".' },
    { wrong: 'She is wanting a car.',      correct: 'She wants a car.',           explanation: '"Want" is a stative verb — no -ing form.' },
    { wrong: 'I want that you come here.', correct: 'I want you to come here.',   explanation: 'Use "want + object + to + verb".' },
    { wrong: 'Do you wanting tea?',        correct: 'Do you want tea?',           explanation: 'Never use -ing form with want in questions.' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 mb-4">⚠️ These are the most common mistakes students make:</p>
      {mistakes.map(({ wrong, correct, explanation }, i) => (
        <div key={i} className="p-4 rounded-xl border">
          <div className="flex items-start gap-2 mb-2">
            <span className="error-text text-xs font-bold mt-0.5 shrink-0">❌ Wrong:</span>
            <p className="error-text text-sm">{wrong}</p>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <span className="correct-text text-xs font-bold mt-0.5 shrink-0">✅ Correct:</span>
            <p className="correct-text text-sm">{correct}</p>
          </div>
          <p className="text-xs text-slate-500 border-t border-white/5 pt-2 mt-2">{explanation}</p>
        </div>
      ))}
    </div>
  );
}

function VocabularySection({ topic, dayNum }) {
  const words = [
    { word: 'Want',     hindi: 'चाहना',    ipa: '/wɒnt/',   meaning: 'To desire or wish for something', example: 'I want a new book.' },
    { word: 'Desire',   hindi: 'इच्छा',    ipa: '/dɪˈzaɪər/', meaning: 'A strong feeling of wanting', example: 'She has a desire to learn.' },
    { word: 'Wish',     hindi: 'इच्छा करना', ipa: '/wɪʃ/', meaning: 'To hope for something',         example: 'I wish you success.' },
    { word: 'Require',  hindi: 'आवश्यकता',  ipa: '/rɪˈkwaɪər/', meaning: 'To need something',        example: 'This job requires patience.' },
    { word: 'Expect',   hindi: 'उम्मीद',    ipa: '/ɪkˈspekt/', meaning: 'To think something will happen', example: 'I expect him to call.' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500">Today's vocabulary words (showing 5 of 500+):</p>
        <Link href={`/vocabulary/day-${dayNum}`} className="text-xs text-primary-400 hover:text-primary-300">See all 500+ →</Link>
      </div>
      {words.map(({ word, hindi, ipa, meaning, example }) => (
        <div key={word} className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/10 transition-all">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="font-bold text-white">{word}</span>
              <span className="text-slate-500 text-xs ml-2">{ipa}</span>
            </div>
            <span className="hindi-text text-sm shrink-0">{hindi}</span>
          </div>
          <p className="text-xs text-slate-400 mb-1">{meaning}</p>
          <p className="text-xs example-text">e.g. {example}</p>
        </div>
      ))}
    </div>
  );
}

function PracticeLink({ dayNum }) {
  return (
    <div className="text-center py-4">
      <div className="text-3xl mb-3">🎯</div>
      <h4 className="font-bold text-white mb-2">500+ Practice Questions</h4>
      <p className="text-sm text-slate-400 mb-5">
        Hindi mein questions diye gaye hain — aapko English mein answer karna hai.
        Sahi answer par sound effect aur XP milega!
      </p>
      <Link href={`/practice/day-${dayNum}`}
        className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        <Target size={16} />
        Start Practice (500+ Questions)
      </Link>
    </div>
  );
}

function SpeakingSection({ topic }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Practice speaking these sentences aloud. Record yourself and compare:</p>
      <div className="space-y-3">
        {[
          'Hello, my name is ___. I work as a ___.',
          'I want to improve my English skills.',
          'Could you please repeat that?',
          'I would like to discuss this further.',
        ].map((sentence, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
            <button className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shrink-0 hover:bg-primary-500/30 transition-all">
              <Play size={14} className="text-primary-400" fill="currentColor" />
            </button>
            <p className="text-sm text-slate-300 flex-1">{sentence}</p>
            <button className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 hover:bg-pink-500/30 transition-all">
              <Mic size={14} className="text-pink-400" />
            </button>
          </div>
        ))}
      </div>
      <Link href="/speaking" className="btn-secondary text-sm flex items-center gap-2 w-fit">
        <Mic size={15} /> Full Speaking Practice →
      </Link>
    </div>
  );
}

function WritingSection({ topic }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 mb-4">Writing exercises — practice writing in English:</p>
      <div className="space-y-3">
        {[
          { task: 'Write 5 sentences using today\'s grammar point.', type: 'Exercise' },
          { task: 'Write a short email using the vocabulary words.',  type: 'Email' },
          { task: 'Write a paragraph (50–80 words) on any daily topic.', type: 'Paragraph' },
        ].map(({ task, type }, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-primary text-xs">{type}</span>
            </div>
            <p className="text-sm text-slate-300 mb-3">{task}</p>
            <textarea
              rows={3}
              placeholder="Write your answer here..."
              className="w-full input text-sm resize-none"
            />
            <button className="btn-secondary text-xs mt-2 flex items-center gap-1.5">
              <Zap size={12} className="text-violet-400" /> Check with AI
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestLink({ dayNum }) {
  return (
    <div className="text-center py-4">
      <div className="text-3xl mb-3">🧪</div>
      <h4 className="font-bold text-white mb-2">Mini Test — 20 Questions</h4>
      <p className="text-sm text-slate-400 mb-5">
        Test your understanding of today's lesson. Timed quiz with instant feedback and scoring.
      </p>
      <Link href={`/assessment/day-${dayNum}-test`}
        className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        <Brain size={16} /> Start Mini Test
      </Link>
    </div>
  );
}
