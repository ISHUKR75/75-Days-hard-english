'use client';
// ============================================================
// MASTER TOPICS HUB - Links to ALL categories
// The top-level navigation for supplemental topics
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookMarked, Mic, Volume2, BookOpen, PenTool,
  Zap, Star, Headphones, Eye, Target,
  ChevronRight, Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  {
    slug: 'grammar',
    title: 'Grammar Mastery',
    emoji: '📝',
    icon: BookMarked,
    count: 94,
    questions: '94,000',
    description: 'Parts of Speech, Tenses, Conditionals, Modals, Active/Passive, and more',
    hindiDesc: 'सभी व्याकरण विषय - A1 से B2 तक',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    borderColor: 'border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/40',
  },
  {
    slug: 'spoken',
    title: 'Spoken English',
    emoji: '🗣️',
    icon: Mic,
    count: 36,
    questions: '36,000',
    description: 'Daily Conversation, Interview, Meeting, Public Speaking, Debate',
    hindiDesc: 'हर situation में अंग्रेज़ी बोलना सीखो',
    gradient: 'from-pink-600 via-rose-600 to-orange-600',
    borderColor: 'border-rose-500/20',
    hoverBorder: 'hover:border-rose-500/40',
  },
  {
    slug: 'vocabulary',
    title: 'Vocabulary Bank',
    emoji: '📚',
    icon: BookOpen,
    count: 66,
    questions: '66,000',
    description: 'Daily Vocab, Phrasal Verbs, Idioms, Proverbs, One-Word Substitutions',
    hindiDesc: '66 कैटेगरी × 1000 शब्द = 66,000+ शब्द',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    borderColor: 'border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/40',
  },
  {
    slug: 'pronunciation',
    title: 'Pronunciation',
    emoji: '🎤',
    icon: Volume2,
    count: 11,
    questions: '11,000',
    description: 'IPA Sounds, Word Stress, Intonation, Connected Speech, Minimal Pairs',
    hindiDesc: 'सही उच्चारण सीखो - native speaker जैसा',
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    borderColor: 'border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/40',
    directTopics: [
      { slug: 'sounds-ipa', title: 'Sounds & IPA' },
      { slug: 'word-stress', title: 'Word Stress' },
      { slug: 'sentence-stress', title: 'Sentence Stress' },
      { slug: 'intonation', title: 'Intonation' },
      { slug: 'connected-speech', title: 'Connected Speech' },
      { slug: 'minimal-pairs', title: 'Minimal Pairs' },
      { slug: 'silent-letters', title: 'Silent Letters' },
      { slug: 'vowels-consonants', title: 'Vowels & Consonants' },
      { slug: 'tongue-twisters', title: 'Tongue Twisters' },
      { slug: 'commonly-mispronounced', title: 'Commonly Mispronounced' },
      { slug: 'accent-training', title: 'Accent Training' },
    ],
  },
  {
    slug: 'writing',
    title: 'Writing Skills',
    emoji: '✍️',
    icon: PenTool,
    count: 17,
    questions: '17,000',
    description: 'Paragraph, Essay, Letter, Email, Report, Story, Resume, Cover Letter',
    hindiDesc: 'Professional writing सीखो',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    borderColor: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
    directTopics: [
      { slug: 'paragraph-writing', title: 'Paragraph Writing' },
      { slug: 'essay-writing', title: 'Essay Writing' },
      { slug: 'formal-letter', title: 'Formal Letter' },
      { slug: 'informal-letter', title: 'Informal Letter' },
      { slug: 'email-writing', title: 'Email Writing' },
      { slug: 'business-email', title: 'Business Email' },
      { slug: 'report-writing', title: 'Report Writing' },
      { slug: 'story-writing', title: 'Story Writing' },
      { slug: 'diary-entry', title: 'Diary Entry' },
      { slug: 'notice-writing', title: 'Notice Writing' },
      { slug: 'message-writing', title: 'Message Writing' },
      { slug: 'resume-writing', title: 'Resume Writing' },
      { slug: 'cover-letter', title: 'Cover Letter' },
      { slug: 'application-writing', title: 'Application Writing' },
      { slug: 'summary-writing', title: 'Summary Writing' },
      { slug: 'review-writing', title: 'Review Writing' },
      { slug: 'blog-writing', title: 'Blog Writing' },
    ],
  },
  {
    slug: 'real-life',
    title: 'Real-Life Situations',
    emoji: '🌍',
    icon: Zap,
    count: 20,
    questions: '20,000',
    description: 'At Hospital, Bank, Airport, Hotel, Restaurant, Shopping, Travel',
    hindiDesc: 'रोज़मर्रा की ज़िंदगी में अंग्रेज़ी',
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    borderColor: 'border-green-500/20',
    hoverBorder: 'hover:border-green-500/40',
    directTopics: [
      { slug: 'at-hospital', title: 'At Hospital' },
      { slug: 'at-bank', title: 'At Bank' },
      { slug: 'at-airport', title: 'At Airport' },
      { slug: 'at-hotel', title: 'At Hotel' },
      { slug: 'at-restaurant', title: 'At Restaurant' },
      { slug: 'at-shopping', title: 'At Shopping Mall' },
      { slug: 'at-railway-station', title: 'At Railway Station' },
      { slug: 'at-post-office', title: 'At Post Office' },
      { slug: 'at-police-station', title: 'At Police Station' },
      { slug: 'at-school', title: 'At School' },
      { slug: 'at-office', title: 'At Office' },
      { slug: 'at-gym', title: 'At Gym' },
      { slug: 'at-park', title: 'At Park' },
      { slug: 'at-temple', title: 'At Temple' },
      { slug: 'at-market', title: 'At Market' },
      { slug: 'at-cinema', title: 'At Cinema' },
      { slug: 'during-travel', title: 'During Travel' },
      { slug: 'emergency-situations', title: 'Emergency Situations' },
      { slug: 'job-interview', title: 'Job Interview' },
      { slug: 'phone-call', title: 'Phone Call' },
    ],
  },
  {
    slug: 'soft-skills',
    title: 'Soft Skills',
    emoji: '💎',
    icon: Star,
    count: 6,
    questions: '6,000',
    description: 'Communication, Leadership, Time Management, Teamwork, Problem Solving',
    hindiDesc: 'Career growth के लिए ज़रूरी skills',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    borderColor: 'border-violet-500/20',
    hoverBorder: 'hover:border-violet-500/40',
    directTopics: [
      { slug: 'communication-skills', title: 'Communication Skills' },
      { slug: 'leadership', title: 'Leadership' },
      { slug: 'time-management', title: 'Time Management' },
      { slug: 'teamwork', title: 'Teamwork' },
      { slug: 'problem-solving', title: 'Problem Solving' },
      { slug: 'emotional-intelligence', title: 'Emotional Intelligence' },
    ],
  },
  {
    slug: 'listening',
    title: 'Listening Skills',
    emoji: '🎧',
    icon: Headphones,
    count: 7,
    questions: '7,000',
    description: 'Dictation, Audio Comprehension, Conversation Listening',
    hindiDesc: 'सुनकर समझने की practice',
    gradient: 'from-cyan-600 via-sky-600 to-blue-600',
    borderColor: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/40',
    directTopics: [
      { slug: 'dictation-practice', title: 'Dictation Practice' },
      { slug: 'audio-comprehension', title: 'Audio Comprehension' },
      { slug: 'conversation-listening', title: 'Conversation Listening' },
      { slug: 'news-listening', title: 'News Listening' },
      { slug: 'song-lyrics', title: 'Song Lyrics Practice' },
      { slug: 'podcast-comprehension', title: 'Podcast Comprehension' },
      { slug: 'movie-dialogue', title: 'Movie Dialogue' },
    ],
  },
  {
    slug: 'reading',
    title: 'Reading Skills',
    emoji: '📖',
    icon: Eye,
    count: 6,
    questions: '6,000',
    description: 'Comprehension, Speed Reading, News Articles, Story Reading',
    hindiDesc: 'पढ़कर समझने की practice',
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
    borderColor: 'border-rose-500/20',
    hoverBorder: 'hover:border-rose-500/40',
    directTopics: [
      { slug: 'reading-comprehension', title: 'Reading Comprehension' },
      { slug: 'speed-reading', title: 'Speed Reading' },
      { slug: 'news-reading', title: 'News Reading' },
      { slug: 'story-reading', title: 'Story Reading' },
      { slug: 'academic-reading', title: 'Academic Reading' },
      { slug: 'critical-reading', title: 'Critical Reading' },
    ],
  },
  {
    slug: 'practice',
    title: 'General Practice',
    emoji: '🎯',
    icon: Target,
    count: 12,
    questions: '12,000',
    description: 'Mixed Practice, Revision, Mock Tests, Speed Rounds',
    hindiDesc: 'सभी टॉपिक्स का मिक्स practice',
    gradient: 'from-lime-600 via-green-600 to-emerald-600',
    borderColor: 'border-lime-500/20',
    hoverBorder: 'hover:border-lime-500/40',
    directTopics: [
      { slug: 'mixed-grammar', title: 'Mixed Grammar' },
      { slug: 'mixed-vocabulary', title: 'Mixed Vocabulary' },
      { slug: 'translation-practice', title: 'Translation Practice' },
      { slug: 'fill-in-blanks', title: 'Fill in the Blanks' },
      { slug: 'error-correction', title: 'Error Correction' },
      { slug: 'sentence-completion', title: 'Sentence Completion' },
      { slug: 'word-formation', title: 'Word Formation' },
      { slug: 'sentence-transformation', title: 'Sentence Transformation' },
      { slug: 'cloze-test', title: 'Cloze Test' },
      { slug: 'mock-test-1', title: 'Mock Test 1' },
      { slug: 'mock-test-2', title: 'Mock Test 2' },
      { slug: 'final-assessment', title: 'Final Assessment' },
    ],
  },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function TopicsHubPage() {
  const totalTopics = CATEGORIES.reduce((acc, c) => acc + c.count, 0);
  const totalQuestions = CATEGORIES.reduce((acc, c) => acc + parseInt(c.questions.replace(/,/g, '')), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-8 md:p-12 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-400" size={24} />
            <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Complete English Course</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            All Topics
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            🇮🇳 <strong className="text-white">{totalTopics} Topics</strong> • <strong className="text-white">{totalQuestions.toLocaleString()} Questions</strong> — 
            अंग्रेज़ी सीखने का सबसे comprehensive course। Grammar, Spoken, Vocabulary, Writing — सब कुछ एक जगह!
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: `${totalTopics} Topics`, icon: BookOpen },
              { label: `${totalQuestions.toLocaleString()} Questions`, icon: Target },
              { label: '10 Categories', icon: Star },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <Icon size={16} className="text-indigo-400" />
                <span className="text-white font-bold text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Cards */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const hasHub = ['grammar', 'spoken', 'vocabulary'].includes(cat.slug);
          
          return (
            <motion.div key={cat.slug} variants={cardV}>
              <div className={`relative overflow-hidden rounded-3xl bg-slate-900 border ${cat.borderColor} ${cat.hoverBorder} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
                {/* Gradient top bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${cat.gradient}`} />
                
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-black text-white mb-1">{cat.emoji} {cat.title}</h2>
                      <p className="text-slate-400 text-sm">{cat.description}</p>
                      <p className="text-indigo-400/70 text-xs mt-1">🇮🇳 {cat.hindiDesc}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 mb-4">
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white font-medium">{cat.count} Topics</span>
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white font-medium">{cat.questions} Questions</span>
                  </div>

                  {/* Hub link (for Grammar, Spoken, Vocabulary) */}
                  {hasHub && (
                    <Link
                      href={`/topics/${cat.slug}`}
                      className={`flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-gradient-to-r ${cat.gradient} text-white font-bold text-sm hover:shadow-lg transition-all mb-4`}
                    >
                      <span>Browse All {cat.count} Topics</span>
                      <ChevronRight size={18} />
                    </Link>
                  )}

                  {/* Direct topic links for categories without hubs */}
                  {cat.directTopics && (
                    <div className="grid grid-cols-2 gap-2">
                      {cat.directTopics.map(t => (
                        <Link
                          key={t.slug}
                          href={`/topics/${t.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
                        >
                          <ChevronRight size={12} className="shrink-0" />
                          {t.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
