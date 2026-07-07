'use client';
// Assessment Page — All tests and quizzes

import Link from 'next/link';
import {
  Brain, Target, Trophy, Clock, Star,
  CheckCircle2, ArrowRight, Zap, BarChart2,
} from 'lucide-react';

const ASSESSMENTS = [
  {
    id: 'placement',
    icon: '🎯',
    title: 'Placement Test',
    desc: 'Pata karo aapka English level kya hai — A0 se C2 tak.',
    duration: '30 min',
    questions: 60,
    href: '/assessment/placement-test',
    color: 'from-indigo-500 to-blue-500',
    badge: 'Start Here',
  },
  {
    id: 'cefr',
    icon: '🌍',
    title: 'CEFR Level Test',
    desc: 'International standard test — A1, A2, B1, B2, C1, C2.',
    duration: '45 min',
    questions: 80,
    href: '/assessment/cefr-test',
    color: 'from-violet-500 to-purple-500',
    badge: 'International',
  },
  {
    id: 'mock',
    icon: '📝',
    title: 'Full Mock Test',
    desc: 'Complete English test — Grammar, Vocabulary, Reading, Writing.',
    duration: '90 min',
    questions: 150,
    href: '/assessment/mock-test',
    color: 'from-emerald-500 to-teal-500',
    badge: 'Comprehensive',
  },
  {
    id: 'grammar',
    icon: '📚',
    title: 'Grammar Test',
    desc: 'Test all grammar topics you have studied so far.',
    duration: '20 min',
    questions: 50,
    href: '/assessment/grammar',
    color: 'from-amber-500 to-orange-500',
    badge: null,
  },
  {
    id: 'vocabulary',
    icon: '📖',
    title: 'Vocabulary Quiz',
    desc: 'How many words do you know? Find out now.',
    duration: '15 min',
    questions: 40,
    href: '/assessment/vocabulary',
    color: 'from-rose-500 to-pink-500',
    badge: null,
  },
  {
    id: 'speaking',
    icon: '🎤',
    title: 'Speaking Assessment',
    desc: 'AI evaluates your spoken English — fluency, pronunciation, grammar.',
    duration: '20 min',
    questions: 10,
    href: '/assessment/speaking',
    color: 'from-cyan-500 to-sky-500',
    badge: 'AI Powered',
  },
];

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <span>🧪</span> Tests & Assessments
        </h1>
        <p className="text-slate-500">Aapki English kitni strong hai — test karo aur pata karo!</p>
      </div>

      {/* Assessment cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ASSESSMENTS.map(({ id, icon, title, desc, duration, questions, href, color, badge }) => (
          <Link key={id} href={href}
            className="card p-6 group hover:border-primary-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              {badge && (
                <span className="badge-primary text-xs">{badge}</span>
              )}
            </div>

            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{desc}</p>

            <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {duration}
              </span>
              <span className="flex items-center gap-1">
                <Target size={12} /> {questions} questions
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary-400 group-hover:gap-3 transition-all">
              Start Test <ArrowRight size={15} />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent test results */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <BarChart2 size={18} className="text-primary-400" />
          Your Test History
        </h3>
        <div className="empty-state">
          <div className="text-3xl mb-3">📋</div>
          <p className="text-slate-500 text-sm">No tests taken yet.</p>
          <p className="text-slate-600 text-xs mt-1">Take your first test to see results here.</p>
        </div>
      </div>
    </div>
  );
}
