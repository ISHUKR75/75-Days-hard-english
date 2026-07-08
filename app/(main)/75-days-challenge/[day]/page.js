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
import getContentForDay from '@/lib/grammarContent';
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
  const content = getContentForDay(dayNum, topic?.title);

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
                  {id === 'concept' && <ConceptSection topic={topic} dayNum={dayNum} content={content} />}
                  {id === 'examples' && <ExamplesSection topic={topic} content={content} />}
                  {id === 'mistakes' && <MistakesSection topic={topic} content={content} />}
                  {id === 'vocabulary' && <VocabularySection topic={topic} dayNum={dayNum} content={content} />}
                  {id === 'practice' && <PracticeLink dayNum={dayNum} />}
                  {id === 'speaking' && <SpeakingSection topic={topic} content={content} />}
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

function ConceptSection({ topic, dayNum, content }) {
  const explanation = content?.explanation || '';
  const rules = content?.rules || [];
  const memoryTrick = content?.memoryTrick || '';

  // Parse markdown-ish bold text for display
  const renderBold = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="text-white font-semibold">{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="space-y-5">
      {/* Explanation */}
      <div>
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-xl">{topic.emoji}</span> {topic.title} — Complete Guide
        </h3>
        <div className="p-4 rounded-xl bg-primary-500/8 border border-primary-500/15 space-y-2">
          {explanation.trim().split('\n').filter(l => l.trim()).map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('#')) {
              const text = trimmed.replace(/^#+\s*/, '');
              return <p key={i} className="font-bold text-primary-300 text-sm mt-2">{renderBold(text)}</p>;
            }
            if (trimmed.startsWith('|') || trimmed.startsWith('---')) return null;
            if (trimmed.startsWith('🇮🇳') || trimmed.startsWith('🇬🇧')) {
              return (
                <p key={i} className={`text-sm ${trimmed.startsWith('🇮🇳') ? 'hindi-text text-slate-300' : 'english-text font-medium'}`}>
                  {renderBold(trimmed)}
                </p>
              );
            }
            if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
              return (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-primary-500 shrink-0 mt-0.5">•</span>
                  <span>{renderBold(trimmed.replace(/^[-•]\s*/, ''))}</span>
                </div>
              );
            }
            return <p key={i} className="text-slate-300 text-sm leading-relaxed">{renderBold(trimmed)}</p>;
          })}
        </div>
      </div>

      {/* Key Rules */}
      {rules.length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-300 mb-3">📌 Key Rules</h4>
          <div className="space-y-2">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-400 p-3 rounded-xl bg-white/3 border border-white/5">
                <CheckCircle2 size={15} className="text-accent-400 shrink-0 mt-0.5" />
                <span>{renderBold(rule)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Trick */}
      {memoryTrick && (
        <div>
          <h4 className="font-semibold text-slate-300 mb-3">💡 Memory Trick</h4>
          <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/15">
            <p className="text-amber-300 text-sm leading-relaxed">
              {renderBold(memoryTrick)}
            </p>
          </div>
        </div>
      )}

      {/* AI Explanation button */}
      <Link href="/ai-tutor" className="btn-secondary text-sm flex items-center gap-2 w-fit">
        <Zap size={15} className="text-violet-400" />
        Ask AI Tutor for More Help
      </Link>
    </div>
  );
}

function ExamplesSection({ topic, content }) {
  const examples = content?.examples || [
    { hindi: 'Practice sentence 1 (Hindi)', english: 'Practice sentence 1 in English', type: 'Example' },
    { hindi: 'Practice sentence 2 (Hindi)', english: 'Practice sentence 2 in English', type: 'Example' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Real-life examples — Hindi to English translation:</p>
      {examples.map(({ hindi, english, type }, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6 group hover:border-white/10 transition-all">
          <span className="text-[10px] text-primary-400 font-semibold uppercase tracking-wide">{type}</span>
          <p className="hindi-text text-sm mt-1 mb-1">🇮🇳 {hindi}</p>
          <p className="english-text text-sm font-medium">🇬🇧 {english}</p>
        </div>
      ))}
      <p className="text-xs text-slate-600 mt-2">+ 100 more examples in the full practice section →</p>
    </div>
  );
}

function MistakesSection({ topic, content }) {
  const mistakes = content?.mistakes || [
    { wrong: 'Common mistake example', correct: 'Correct version', why: 'Explanation why this is wrong.' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 mb-4">⚠️ These are the most common mistakes students make:</p>
      {mistakes.map(({ wrong, correct, why }, i) => (
        <div key={i} className="p-4 rounded-xl border border-white/8 bg-white/2">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-rose-400 text-xs font-bold mt-0.5 shrink-0">❌ Wrong:</span>
            <p className="text-rose-300 text-sm">{wrong}</p>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <span className="text-emerald-400 text-xs font-bold mt-0.5 shrink-0">✅ Correct:</span>
            <p className="text-emerald-300 text-sm">{correct}</p>
          </div>
          <p className="text-xs text-slate-500 border-t border-white/5 pt-2 mt-2">💬 {why}</p>
        </div>
      ))}
    </div>
  );
}

function VocabularySection({ topic, dayNum, content }) {
  const [showAll, setShowAll] = useState(false);
  const words = content?.vocabulary || [
    { word: 'Practice', hindi: 'अभ्यास', example: 'Practice makes perfect.' },
    { word: 'Grammar',  hindi: 'व्याकरण', example: 'Grammar is important.' },
  ];
  const displayed = showAll ? words : words.slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500">Today's key vocabulary ({words.length} words):</p>
        <Link href={`/vocabulary-bank`} className="text-xs text-primary-400 hover:text-primary-300">All vocab →</Link>
      </div>
      {displayed.map(({ word, hindi, ipa, example, meaning }, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/10 transition-all">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="font-bold text-white">{word}</span>
              {ipa && <span className="text-slate-500 text-xs ml-2">{ipa}</span>}
            </div>
            <span className="hindi-text text-sm shrink-0 text-amber-300">{hindi}</span>
          </div>
          {meaning && <p className="text-xs text-slate-400 mb-1">{meaning}</p>}
          <p className="text-xs text-emerald-400/80 italic">e.g. {example}</p>
        </div>
      ))}
      {words.length > 6 && (
        <button
          onClick={() => setShowAll(v => !v)}
          className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
        >
          {showAll ? '↑ Show less' : `↓ Show all ${words.length} words`}
        </button>
      )}
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

function SpeakingSection({ topic, content }) {
  const speakingTips = content?.speakingTips || [];
  const examples = (content?.examples || []).slice(0, 4).map(e => e.english);
  const sentences = examples.length > 0 ? examples : [
    'Hello, my name is ___. I work as a ___.',
    'I want to improve my English skills.',
    'Could you please repeat that?',
    'I would like to discuss this further.',
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Practice speaking these sentences aloud. Record yourself and compare:</p>
      <div className="space-y-3">
        {sentences.map((sentence, i) => (
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
      {speakingTips.length > 0 && (
        <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/15">
          <p className="text-xs font-semibold text-pink-300 mb-2">🎙️ Speaking Tips:</p>
          <ul className="space-y-1">
            {speakingTips.map((tip, i) => (
              <li key={i} className="text-xs text-slate-400">• {tip}</li>
            ))}
          </ul>
        </div>
      )}
      <Link href="/speaking-lab" className="btn-secondary text-sm flex items-center gap-2 w-fit">
        <Mic size={15} /> Full Speaking Lab →
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
