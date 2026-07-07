'use client';
// Top Navbar - Shows logo, search, user stats (XP, coins, streak), and profile menu
// Displayed at the top of all authenticated pages

import { useState }       from 'react';
import Link               from 'next/link';
import { usePathname }    from 'next/navigation';
import {
  Flame, Zap, Coins, Search, Bell, Menu, X,
  Sun, Moon, ChevronDown, BookOpen, Trophy,
  Settings, LogOut, User, HelpCircle,
} from 'lucide-react';
import useUserStore    from '@/store/userStore';
import ProgressBar     from '@/components/ui/ProgressBar';

// ============================================================
// Navbar Component
// ============================================================
export default function Navbar({ onMobileMenuToggle, mobileMenuOpen }) {
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [notifOpen,     setNotifOpen]     = useState(false);

  // Pull user data from Zustand store
  const {
    user, xp, coins, streak, level, levelXP,
    levelXPRequired, getLevelProgress, settings, updateSettings,
  } = useUserStore();

  const levelProgress = getLevelProgress();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
      <div className="flex items-center h-full px-4 gap-4">

        {/* ── Mobile Menu Toggle ──────────────────────────── */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group mr-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-black text-sm shadow-glow-primary group-hover:scale-105 transition-transform">
            75
          </div>
          <span className="hidden sm:block font-bold text-white text-sm leading-tight">
            Days Hard<br />
            <span className="gradient-text text-xs font-black tracking-wider">ENGLISH</span>
          </span>
        </Link>

        {/* ── Search Bar ───────────────────────────────────── */}
        <div className="flex-1 max-w-sm hidden md:block">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search topics, words…"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/5 border border-white/8 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all"
            />
          </div>
        </div>

        {/* ── Spacer ───────────────────────────────────────── */}
        <div className="flex-1" />

        {/* ── Gamification Stats ───────────────────────────── */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 cursor-default">
            <Flame size={16} className="text-orange-400 animate-streak-fire" />
            <span className="text-sm font-bold text-orange-300">{streak}</span>
          </div>

          {/* XP + Level */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 cursor-default">
            <Zap size={16} className="text-violet-400" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-violet-300">Lv.{level}</span>
                <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-primary-500 transition-all duration-1000"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500">{xp} XP</p>
            </div>
          </div>

          {/* Coins */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 cursor-default">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-bold text-yellow-300">{coins}</span>
          </div>
        </div>

        {/* ── Action Buttons ───────────────────────────────── */}
        <div className="flex items-center gap-1">
          {/* Dark/Light toggle */}
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all"
            aria-label="Toggle theme"
          >
            {settings.darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all"
              aria-label="Notifications"
            >
              <Bell size={17} />
              {/* Red dot for unread */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 ring-2 ring-surface-950" />
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 glass rounded-2xl border border-white/8 shadow-xl z-50 overflow-hidden animate-fade-up">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  <button className="text-xs text-primary-400 hover:text-primary-300">Mark all read</button>
                </div>
                <div className="p-2">
                  {/* Sample notification */}
                  {[
                    { icon: '🔥', title: '7-day streak!', desc: 'Keep it up — you\'re on fire!', time: '2m ago' },
                    { icon: '⭐', title: 'Level Up!', desc: 'You reached Level 2!', time: '1h ago' },
                    { icon: '📚', title: 'Daily Goal', desc: 'Study 30 mins today to maintain streak', time: '3h ago' },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group">
                      <span className="text-xl shrink-0">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors">{n.title}</p>
                        <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                      </div>
                      <span className="text-xs text-slate-600 shrink-0">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/8 transition-all group"
            >
              {/* Avatar */}
              <div className="w-7 h-7 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0] || 'S'}
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {user?.name || 'Student'}
              </span>
              <ChevronDown size={14} className="text-slate-500 group-hover:text-slate-300 transition-all group-hover:rotate-180 duration-200" />
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 w-52 glass rounded-2xl border border-white/8 shadow-xl z-50 overflow-hidden animate-fade-up">
                {/* User info */}
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="font-semibold text-white text-sm">{user?.name}</p>
                  <p className="text-xs text-slate-500">Level {level} • {xp} XP</p>
                </div>

                {/* Menu items */}
                <div className="p-2">
                  {[
                    { icon: User,      label: 'Profile',   href: '/profile' },
                    { icon: Trophy,    label: 'Achievements', href: '/achievements' },
                    { icon: BookOpen,  label: 'My Progress', href: '/progress' },
                    { icon: Settings,  label: 'Settings',  href: '/settings' },
                    { icon: HelpCircle,label: 'Help',      href: '/help' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                    >
                      <Icon size={15} />
                      {label}
                    </Link>
                  ))}

                  {/* Divider */}
                  <div className="h-px bg-white/5 my-1" />

                  {/* Sign out */}
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-danger-400 hover:text-danger-300 hover:bg-danger-500/10 transition-all">
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(profileOpen || notifOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setProfileOpen(false); setNotifOpen(false); }}
        />
      )}
    </header>
  );
}
