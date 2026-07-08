'use client';
// ============================================================
// ALL TOPICS PAGE - Shows all 75 days with progress
// Features: Topic cards, progress indicators, locked/unlocked states
// ============================================================

import { motion } from 'framer-motion';
import { CheckCircle2, Lock, PlayCircle, BookOpen, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import { useGamificationStore } from '@/store/useGamificationStore';

// All 75 days topics data
const ALL_TOPICS = [
  { day: 1, title: 'Basics of English', slug: 'basics-of-english', category: 'grammar', difficulty: 'easy' },
  { day: 2, title: 'Self Introduction', slug: 'self-introduction', category: 'speaking', difficulty: 'easy' },
  { day: 3, title: 'Imperative Sentence', slug: 'imperative-sentence', category: 'grammar', difficulty: 'easy' },
  { day: 4, title: 'Be Verb', slug: 'be-verb', category: 'grammar', difficulty: 'easy' },
  { day: 5, title: 'Demonstrative Pronoun', slug: 'demonstrative-pronoun', category: 'grammar', difficulty: 'easy' },
  { day: 6, title: 'Has / Have', slug: 'has-have', category: 'grammar', difficulty: 'easy' },
  { day: 7, title: 'Had', slug: 'had', category: 'grammar', difficulty: 'easy' },
  { day: 8, title: 'Will Have', slug: 'will-have', category: 'grammar', difficulty: 'easy' },
  { day: 9, title: 'Use of There', slug: 'use-of-there', category: 'grammar', difficulty: 'easy' },
  { day: 10, title: 'Revision + Practice', slug: 'revision-1', category: 'revision', difficulty: 'easy' },
  // Days 11-75 will follow same pattern
];

export default function TopicsPage() {
  const { topicsCompleted } = useGamificationStore();

  return (
    <div className="min-h-screen bg-surface-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black text-white mb-3">
            75-Day Curriculum
          </h1>
          <p className="text-xl text-slate-400">
            Master English step-by-step. Complete {75 - topicsCompleted} more days!
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Your Progress</h2>
            <span className="text-2xl font-black gradient-text">
              {Math.round((topicsCompleted / 75) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(topicsCompleted / 75) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ALL_TOPICS.map((topic, index) => (
            <TopicCard
              key={topic.day}
              topic={topic}
              isCompleted={topicsCompleted >= topic.day}
              isLocked={topic.day > topicsCompleted + 1}
              isCurrent={topic.day === topicsCompleted + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Topic Card Component
function TopicCard({ topic, isCompleted, isLocked, isCurrent }) {
  const categoryColors = {
    grammar: 'from-indigo-500 to-blue-600',
    speaking: 'from-purple-500 to-pink-600',
    vocabulary: 'from-emerald-500 to-teal-600',
    writing: 'from-amber-500 to-orange-600',
    revision: 'from-rose-500 to-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: topic.day * 0.02 }}
      whileHover={!isLocked ? { y: -4 } : {}}
      className={`day-card p-5 border ${
        isCompleted ? 'completed' :
        isCurrent ? 'current' :
        isLocked ? 'locked' : 'border-white/10'
      }`}
    >
      <Link href={isLocked ? '#' : `/topics/${topic.slug}`} className={isLocked ? 'pointer-events-none' : ''}>
        {/* Day Number */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500">Day {topic.day}</span>
          {isCompleted && <CheckCircle2 size={18} className="text-emerald-400" />}
          {isCurrent && <PlayCircle size={18} className="text-primary-400" />}
          {isLocked && <Lock size={16} className="text-slate-600" />}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {topic.title}
        </h3>

        {/* Category Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[topic.category]} bg-opacity-20`}>
          {topic.category}
        </div>
      </Link>
    </motion.div>
  );
}
