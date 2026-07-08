'use client';
// Topic Overview Page — Shows all subtopics for a given topic
// Displays theory overview, subtopic cards, and quick-access links

import { useState }      from 'react';
import Link              from 'next/link';
import { useParams }     from 'next/navigation';
import { motion }        from 'framer-motion';
import {
  ArrowLeft, BookOpen, Target, Mic, Volume2,
  PenTool, Brain, FileText, CheckCircle2, Lock,
  Star, Flame, Trophy, ChevronRight, Play,
  MessageSquare, Headphones, Zap,
} from 'lucide-react';
import DAYS_75_TOPICS    from '@/lib/topics';
import useProgressStore  from '@/store/progressStore';
import useUserStore      from '@/store/userStore';

// ── Animation variants ────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ── Topic subtopic list (by slug) ─────────────────────────
const TOPIC_SUBTOPICS = {
  '01-basics': [
    { id: '01-sentence-structure', title: 'Sentence Structure',      emoji: '🏗️', desc: 'Subject + Verb + Object pattern' },
    { id: '02-parts-of-speech',    title: 'Parts of Speech',          emoji: '📝', desc: 'Noun, Verb, Adjective, Adverb' },
    { id: '03-simple-present',     title: 'Simple Present Tense',     emoji: '⏰', desc: 'Daily habits and facts' },
    { id: '04-yes-no-questions',   title: 'Yes/No Questions',         emoji: '❓', desc: 'Do/Does question formation' },
    { id: '05-negatives',          title: 'Negative Sentences',       emoji: '❌', desc: 'Don\'t/Doesn\'t in sentences' },
    { id: '06-basic-vocab',        title: 'Basic Vocabulary',         emoji: '🔤', desc: '100 most common English words' },
  ],
  '03-imperative': [
    { id: '01-affirmative',         title: 'Affirmative Imperatives',  emoji: '✅', desc: 'Direct commands and instructions' },
    { id: '02-negative-dont-never', title: 'Negative (Don\'t/Never)',  emoji: '🚫', desc: 'Prohibitions and warnings' },
    { id: '03-polite-please-kindly',title: 'Polite Requests',         emoji: '🙏', desc: 'Please/Kindly with imperatives' },
    { id: '04-lets',                title: "Let's Sentences",          emoji: '🤝', desc: 'Suggestions and invitations' },
    { id: '05-with-always-never',   title: 'With Always/Never',       emoji: '♾️', desc: 'Frequency with imperatives' },
    { id: '06-with-question-tags',  title: 'Question Tags',           emoji: '🏷️', desc: 'Isn\'t it? Don\'t you?' },
    { id: '07-advice-suggestions',  title: 'Advice & Suggestions',    emoji: '💡', desc: 'Should/Could/Why don\'t you' },
    { id: '08-requests-orders',     title: 'Requests & Orders',       emoji: '📋', desc: 'Office and daily requests' },
    { id: '09-warnings-instructions', title: 'Warnings & Instructions', emoji: '⚠️', desc: 'Safety instructions' },
    { id: '10-daily-life',          title: 'Daily Life Usage',        emoji: '🏠', desc: 'Home and family imperatives' },
    { id: '11-professional-settings', title: 'Professional Settings', emoji: '💼', desc: 'Office and workplace imperatives' },
    { id: '12-conversations',       title: 'Real Conversations',      emoji: '💬', desc: 'Practice dialogues' },
  ],
  '04-be-verb': [
    { id: '01-am-is-are-present', title: 'Am / Is / Are (Present)',   emoji: '🌞', desc: 'Basic present tense be verb' },
    { id: '02-was-were-past',     title: 'Was / Were (Past)',         emoji: '⏮️', desc: 'Past tense be verb' },
    { id: '03-will-be-future',    title: 'Will Be (Future)',          emoji: '🔮', desc: 'Future with will be' },
    { id: '04-being-continuous',  title: 'Being (Continuous)',        emoji: '🔄', desc: 'Progressive tense usage' },
    { id: '05-been-perfect',      title: 'Been (Perfect)',            emoji: '✨', desc: 'Perfect tense with been' },
    { id: '06-be-in-questions',   title: 'Be in Questions',          emoji: '❓', desc: 'Question formation' },
    { id: '07-be-in-negatives',   title: 'Be in Negatives',          emoji: '🚫', desc: 'Negative sentences' },
    { id: '08-be-with-adjectives','title': 'Be with Adjectives',     emoji: '🎨', desc: 'Describing people and things' },
  ],
  '06-has-have': [
    { id: '01-has-singular',      title: 'Has (Singular)',           emoji: '👆', desc: 'He/She/It has...' },
    { id: '02-have-plural',       title: 'Have (Plural)',            emoji: '👥', desc: 'I/We/You/They have...' },
    { id: '03-questions',         title: 'Questions with Has/Have',  emoji: '❓', desc: 'Does he have? Do you have?' },
    { id: '04-negatives',         title: 'Negatives',               emoji: '🚫', desc: 'Doesn\'t have / Don\'t have' },
    { id: '05-have-got',          title: 'Have Got',                emoji: '✋', desc: 'British English usage' },
    { id: '06-perfect-tense',     title: 'Present Perfect',         emoji: '✅', desc: 'Have/Has + past participle' },
  ],
};

// ── Feature links for each topic ─────────────────────────
const FEATURE_LINKS = (slug) => [
  { icon: Target,       label: 'Practice (500+ Q)',  href: `/topics/${slug}/practice`,   color: 'from-indigo-500 to-blue-500',   badge: '500+' },
  { icon: Brain,        label: 'Mini Test',          href: `/topics/${slug}/test`,       color: 'from-violet-500 to-purple-500', badge: 'Timer' },
  { icon: Mic,          label: 'Speaking',           href: `/topics/${slug}/speaking`,   color: 'from-pink-500 to-rose-500',     badge: null },
  { icon: PenTool,      label: 'Writing',            href: `/topics/${slug}/writing`,    color: 'from-amber-500 to-orange-500',  badge: null },
  { icon: Headphones,   label: 'Listening',          href: `/topics/${slug}/listening`,  color: 'from-cyan-500 to-teal-500',     badge: null },
  { icon: BookOpen,     label: 'Vocabulary',         href: `/topics/${slug}/vocabulary`, color: 'from-emerald-500 to-green-500', badge: '500+' },
  { icon: FileText,     label: 'Flashcards',         href: `/topics/${slug}/flashcards`, color: 'from-sky-500 to-blue-500',      badge: 'SRS' },
  { icon: MessageSquare,label: 'Essay Practice',     href: `/topics/${slug}/essay`,      color: 'from-rose-500 to-pink-500',     badge: null },
];

// ── Helper to get subtopics for a topic slug ──────────────
function getSubtopicsForSlug(slug) {
  // Try direct match first
  if (TOPIC_SUBTOPICS[slug]) return TOPIC_SUBTOPICS[slug];

  // Try to match by topic number (first 2 chars of slug)
  const num = slug.replace(/^0+/, '').split('-')[0];
  const key = Object.keys(TOPIC_SUBTOPICS).find(k => k.startsWith(`0${num}-`) || k.startsWith(`${num}-`));
  if (key) return TOPIC_SUBTOPICS[key];

  // Generate generic subtopics from topic title
  return [
    { id: '01-introduction',   title: 'Introduction & Overview',   emoji: '📖', desc: 'What this topic covers and why it matters' },
    { id: '02-basic-rules',    title: 'Basic Rules & Structure',   emoji: '📏', desc: 'Core grammar rules to remember' },
    { id: '03-examples',       title: 'Real-Life Examples',        emoji: '💬', desc: 'How native speakers use this' },
    { id: '04-common-mistakes', title: 'Common Mistakes',          emoji: '⚠️', desc: 'Errors to avoid and how to fix them' },
    { id: '05-practice',       title: 'Practice Questions',        emoji: '✍️', desc: '500+ Hindi → English questions' },
    { id: '06-speaking',       title: 'Speaking Practice',         emoji: '🎤', desc: 'Drills, roleplay, and conversations' },
    { id: '07-vocabulary',     title: 'Topic Vocabulary',          emoji: '🔤', desc: '500+ words with Hindi meanings' },
    { id: '08-test',           title: 'Chapter Test',              emoji: '🧪', desc: '100 questions with timer' },
  ];
}

// ── Main Page ─────────────────────────────────────────────
export default function TopicPage() {
  const params    = useParams();
  const topicSlug = params?.topicSlug || '';

  // Find matching topic from 75-days data
  const topic = DAYS_75_TOPICS.find(t => t.slug === topicSlug);
  const subtopics = getSubtopicsForSlug(topicSlug);

  const { subtopics: subtopicProgress } = useProgressStore();
  const { addXP } = useUserStore();

  // Calculate completion
  const completedCount = subtopics.filter(s => subtopicProgress[`${topicSlug}/${s.id}`]?.completed).length;
  const progressPct    = subtopics.length > 0 ? Math.round((completedCount / subtopics.length) * 100) : 0;

  // Fallback if topic not found
  const topicTitle = topic?.title || topicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const topicEmoji = topic?.emoji || '📚';
  const topicDay   = topic?.day;
  const topicCefr  = topic?.cefr || 'A1';
  const topicColor = topic?.color || '#6366f1';

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-slate-500"
      >
        <Link href="/topics" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> All Topics
        </Link>
        <span>/</span>
        <span className="text-slate-300">{topicTitle}</span>
      </motion.div>

      {/* ── Topic Hero ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 relative overflow-hidden"
        style={{ borderColor: `${topicColor}30` }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${topicColor}, transparent 60%)` }}
        />

        <div className="relative flex flex-col sm:flex-row items-start gap-5">
          {/* Emoji icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${topicColor}20`, border: `1px solid ${topicColor}30` }}
          >
            {topicEmoji}
          </motion.div>

          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {topicDay && (
                <span className="badge-primary text-xs">Day {topicDay}</span>
              )}
              <span className="badge text-slate-400 bg-white/5 border border-white/8 text-xs">{topicCefr}</span>
              {topic?.difficulty && (
                <span className="badge text-xs capitalize"
                  style={{ background: `${topicColor}15`, color: topicColor, border: `1px solid ${topicColor}30` }}>
                  {topic.difficulty}
                </span>
              )}
              {completedCount > 0 && (
                <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-xs">
                  ✅ {completedCount}/{subtopics.length} subtopics done
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black text-white mb-1">{topicTitle}</h1>
            <p className="text-sm text-slate-400 capitalize">{topic?.type || 'Grammar'} lesson — Real Hindi to English practice</p>

            {/* Progress bar */}
            {progressPct > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ boxShadow: '0 0 8px rgba(99,102,241,0.5)' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Start/Continue button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="shrink-0">
            <Link
              href={`/topics/${topicSlug}/${subtopics[completedCount < subtopics.length ? completedCount : 0]?.id}`}
              className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 whitespace-nowrap"
            >
              <Play size={14} fill="currentColor" />
              {completedCount === 0 ? 'Start Topic' : completedCount === subtopics.length ? 'Review Topic' : 'Continue'}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Quick Feature Access ────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-lg font-bold text-white mb-3">Quick Practice</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FEATURE_LINKS(topicSlug).map(({ icon: Icon, label, href, color, badge }) => (
            <motion.div key={label} variants={fadeUp}>
              <Link
                href={href}
                className="card p-4 flex flex-col items-center gap-2.5 text-center group hover:border-white/15 relative overflow-hidden"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors block">{label}</span>
                  {badge && (
                    <span className="text-[10px] text-slate-600 mt-0.5 block">{badge}</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Subtopics ───────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">
            Subtopics
            <span className="ml-2 text-sm font-normal text-slate-500">({subtopics.length} chapters)</span>
          </h2>
          <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/8">
            {completedCount}/{subtopics.length} completed
          </span>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {subtopics.map((subtopic, idx) => {
            const key        = `${topicSlug}/${subtopic.id}`;
            const isCompleted = !!subtopicProgress[key]?.completed;
            const isLocked   = false; // unlock all for now

            return (
              <motion.div key={subtopic.id} variants={fadeUp}>
                <Link
                  href={isLocked ? '#' : `/topics/${topicSlug}/${subtopic.id}`}
                  className={`card flex items-center gap-4 p-4 group transition-all ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500/30 cursor-pointer'
                  } ${isCompleted ? 'border-emerald-500/20 bg-emerald-500/3' : ''}`}
                >
                  {/* Number/Check */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : isLocked
                      ? 'bg-white/5 text-slate-600'
                      : 'bg-indigo-500/15 text-indigo-300 group-hover:bg-indigo-500/25'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={18} /> : isLocked ? <Lock size={16} /> : <span>{idx + 1}</span>}
                  </div>

                  {/* Emoji */}
                  <span className="text-xl shrink-0">{subtopic.emoji}</span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-0.5 transition-colors ${
                      isCompleted ? 'text-emerald-300' : 'text-white group-hover:text-indigo-300'
                    }`}>
                      {subtopic.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{subtopic.desc}</p>
                  </div>

                  {/* Arrow/badge */}
                  <div className="shrink-0 flex items-center gap-2">
                    {isCompleted && (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Done</span>
                    )}
                    <ChevronRight size={16} className={`transition-all ${
                      isLocked ? 'text-slate-700' : 'text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5'
                    }`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Navigation: Prev / Next Topic ───────────────── */}
      {topic && (
        <div className="grid grid-cols-2 gap-4">
          {topic.day > 1 && (() => {
            const prev = DAYS_75_TOPICS[topic.day - 2];
            return (
              <Link href={`/topics/${prev.slug}`} className="card p-4 hover:border-white/15 group flex items-center gap-3">
                <ArrowLeft size={16} className="text-slate-500 group-hover:text-white transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-600">Previous Topic</p>
                  <p className="text-sm font-semibold text-white truncate">{prev.title}</p>
                </div>
              </Link>
            );
          })()}

          {topic.day < 75 && (() => {
            const next = DAYS_75_TOPICS[topic.day];
            return (
              <Link href={`/topics/${next.slug}`} className="card p-4 hover:border-white/15 group flex items-center gap-3 col-start-2">
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs text-slate-600">Next Topic</p>
                  <p className="text-sm font-semibold text-white truncate">{next.title}</p>
                </div>
                <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors shrink-0" />
              </Link>
            );
          })()}
        </div>
      )}
    </div>
  );
}
