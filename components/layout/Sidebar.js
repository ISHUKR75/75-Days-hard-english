'use client';
// Sidebar Navigation - Left-side navigation for the main app
// Shows all major sections with icons and labels

import Link        from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx }    from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  LayoutDashboard, BookOpen, Mic, Volume2, PenTool,
  Brain, BarChart2, Target, Trophy, Star, Flame,
  Calendar, MessageSquare, Headphones, Globe, Users,
  Briefcase, FlaskConical, Zap, BookMarked, Heart,
  FileText, GraduationCap, ChevronRight, Lock,
} from 'lucide-react';
import useUserStore from '@/store/userStore';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// ============================================================
// Navigation structure - grouped by category
// ============================================================
const NAV_SECTIONS = [
  {
    title: 'Main',
    items: [
      { href: '/dashboard',         label: 'Dashboard',         icon: LayoutDashboard, badge: null },
      { href: '/75-days-challenge', label: '75 Days Challenge',  icon: Calendar,        badge: '75' },
      { href: '/daily-practice',    label: 'Daily Practice',     icon: Target,          badge: 'Today' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { href: '/topics',            label: 'All Topics',         icon: BookOpen,        badge: null },
      { href: '/grammar-reference', label: 'Grammar',            icon: BookMarked,      badge: null },
      { href: '/vocabulary',        label: 'Vocabulary',         icon: Globe,           badge: null },
      { href: '/pronunciation-lab', label: 'Pronunciation',      icon: Volume2,         badge: null },
    ],
  },
  {
    title: 'Practice',
    items: [
      { href: '/assessment',        label: 'Tests & Quizzes',    icon: FlaskConical,    badge: null },
      { href: '/listening-lab',     label: 'Listening Lab',      icon: Headphones,      badge: null },
      { href: '/brain-training',    label: 'Brain Training',     icon: Brain,           badge: null },
      { href: '/memory-lab',        label: 'Memory Lab',         icon: Zap,             badge: null },
    ],
  },
  {
    title: 'Professional',
    items: [
      { href: '/professional-english', label: 'Professional',   icon: Briefcase,       badge: 'Pro' },
      { href: '/speaking',             label: 'Speaking',        icon: Mic,             badge: null },
      { href: '/writing',              label: 'Writing',         icon: PenTool,         badge: null },
      { href: '/ai-tutor',             label: 'AI Tutor',        icon: MessageSquare,   badge: '✨' },
    ],
  },
  {
    title: 'Track',
    items: [
      { href: '/progress',          label: 'My Progress',        icon: BarChart2,       badge: null },
      { href: '/analytics',         label: 'Analytics',          icon: Star,            badge: null },
      { href: '/achievements',      label: 'Achievements',       icon: Trophy,          badge: null },
      { href: '/leaderboard',       label: 'Leaderboard',        icon: Users,           badge: null },
    ],
  },
  {
    title: 'More',
    items: [
      { href: '/notes',             label: 'My Notes',           icon: FileText,        badge: null },
      { href: '/bookmarks',         label: 'Bookmarks',          icon: Heart,           badge: null },
      { href: '/certificates',      label: 'Certificates',       icon: GraduationCap,   badge: null },
    ],
  },
];

// ============================================================
// Sidebar Component
// ============================================================
export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { streak, level, coins } = useUserStore();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 z-40 flex flex-col',
          'w-64 bg-surface-950/95 backdrop-blur-xl border-r border-white/5',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* ── Quick Stats Bar ─────────────────────────────── */}
        <div className="flex items-center justify-around px-4 py-3 border-b border-white/5 bg-white/2">
          {/* Streak */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-bold text-orange-300">{streak}</span>
            </div>
            <span className="text-[10px] text-slate-600">Streak</span>
          </div>
          <div className="w-px h-8 bg-white/5" />
          {/* Level */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-violet-400" />
              <span className="text-sm font-bold text-violet-300">{level}</span>
            </div>
            <span className="text-[10px] text-slate-600">Level</span>
          </div>
          <div className="w-px h-8 bg-white/5" />
          {/* Coins */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <span className="text-sm">🪙</span>
              <span className="text-sm font-bold text-yellow-300">{coins}</span>
            </div>
            <span className="text-[10px] text-slate-600">Coins</span>
          </div>
        </div>

        {/* ── Navigation ──────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-hide">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {/* Section title */}
              <p className="px-3 mb-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-600">
                {section.title}
              </p>

              {/* Nav items */}
              <div className="space-y-0.5">
                {section.items.map(({ href, label, icon: Icon, badge }) => {
                  // Check if this route is active
                  const isActive = pathname === href || pathname.startsWith(href + '/');

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                        isActive
                          ? 'bg-primary-500/15 text-primary-300 border border-primary-500/20'
                          : 'text-slate-500 hover:text-slate-200 hover:bg-white/5',
                      )}
                    >
                      {/* Icon */}
                      <Icon
                        size={16}
                        className={cn(
                          'shrink-0 transition-colors',
                          isActive ? 'text-primary-400' : 'text-slate-600 group-hover:text-slate-300',
                        )}
                      />

                      {/* Label */}
                      <span className="flex-1">{label}</span>

                      {/* Badge or arrow */}
                      {badge ? (
                        <span className={cn(
                          'text-[10px] font-bold px-1.5 py-0.5 rounded-md',
                          badge === 'Pro' && 'bg-amber-500/20 text-amber-300',
                          badge === '✨'  && 'bg-violet-500/20 text-violet-300',
                          badge === 'Today' && 'bg-accent-500/20 text-accent-300',
                          badge === '75' && 'bg-primary-500/20 text-primary-300',
                        )}>
                          {badge}
                        </span>
                      ) : isActive ? (
                        <ChevronRight size={14} className="text-primary-400 opacity-50" />
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Bottom - Daily Goal ─────────────────────────── */}
        <div className="px-4 py-4 border-t border-white/5">
          <div className="p-3 rounded-xl bg-primary-500/8 border border-primary-500/15">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">Daily Goal</span>
              <span className="text-xs text-slate-500">0 / 30 min</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-[10px] text-slate-600 mt-1.5">Study 30 minutes to keep your streak!</p>
          </div>
        </div>
      </aside>
    </>
  );
}
