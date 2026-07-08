'use client';
// ============================================================
// CERTIFICATES PAGE — Course certificates with download
// ============================================================

import { motion } from 'framer-motion';
import { GraduationCap, Download, Star, Trophy, Lock, CheckCircle2 } from 'lucide-react';
import useUserStore from '@/store/userStore';

const CERTIFICATES = [
  {
    id: 'week1',
    title: 'Week 1 Completion',
    subtitle: 'Basics, Be Verb, Has/Have, There is/are',
    emoji: '🎓',
    requirement: 10,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/25',
    badge: '🏅',
  },
  {
    id: 'week2',
    title: 'Week 2 — Modals',
    subtitle: 'Want, Let, Can, Should, May, Must',
    emoji: '🏆',
    requirement: 20,
    color: 'from-sky-500 to-blue-500',
    bgColor: 'bg-sky-500/5',
    borderColor: 'border-sky-500/25',
    badge: '🏅',
  },
  {
    id: 'week5',
    title: 'Week 5 — Advanced Modals',
    subtitle: 'Should have, Must have, Could have, Would have',
    emoji: '⭐',
    requirement: 30,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/5',
    borderColor: 'border-violet-500/25',
    badge: '🎖️',
  },
  {
    id: 'tenses',
    title: 'Tenses Master',
    subtitle: 'All 12 tenses with correct usage',
    emoji: '⏰',
    requirement: 40,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/25',
    badge: '🥇',
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Master',
    subtitle: '10,000+ words — beginner to advanced',
    emoji: '📚',
    requirement: 55,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/5',
    borderColor: 'border-pink-500/25',
    badge: '💎',
  },
  {
    id: 'final',
    title: '75 Days Graduate',
    subtitle: 'Complete 75-Day Hard English Course',
    emoji: '👑',
    requirement: 75,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-500/5',
    borderColor: 'border-yellow-500/25',
    badge: '🏆',
    featured: true,
  },
];

export default function CertificatesPage() {
  const { totalTopicsCompleted } = useUserStore();
  const daysCompleted = totalTopicsCompleted || 0;

  const handleDownload = (cert) => {
    // Create SVG certificate
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#312e81;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="560" fill="url(#grad)"/>
  <rect x="20" y="20" width="760" height="520" rx="16" fill="none" stroke="#6366f1" stroke-width="2" opacity="0.4"/>
  <text x="400" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#a5b4fc" font-weight="600" letter-spacing="3">75 DAYS HARD ENGLISH COURSE</text>
  <text x="400" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="40" fill="white" font-weight="900">${cert.emoji} Certificate</text>
  <text x="400" y="180" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#d1d5db">of Completion</text>
  <text x="400" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#9ca3af">This certifies that</text>
  <text x="400" y="290" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="#818cf8" font-weight="700">English Student</text>
  <text x="400" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#9ca3af">has successfully completed</text>
  <text x="400" y="385" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="white" font-weight="700">${cert.title}</text>
  <text x="400" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#9ca3af">${cert.subtitle}</text>
  <text x="400" y="480" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#6b7280">${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</text>
  <text x="400" y="520" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#4b5563">75daysenglish.com</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `certificate-${cert.id}.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-white mb-1">🎓 Certificates</h1>
        <p className="text-slate-400">Complete milestones to earn downloadable certificates</p>
      </motion.div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-white">Overall Progress</span>
          <span className="gradient-text font-black text-xl">{daysCompleted}/75 Days</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: 0 }} animate={{ width: `${(daysCompleted / 75) * 100}%` }} transition={{ duration: 1.2 }} />
        </div>
      </div>

      {/* Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CERTIFICATES.map((cert, i) => {
          const isEarned = daysCompleted >= cert.requirement;
          return (
            <motion.div key={cert.id}
              initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              className={`card p-6 relative overflow-hidden ${cert.featured ? 'md:col-span-2' : ''} ${
                isEarned ? `${cert.borderColor} ${cert.bgColor}` : 'opacity-60'
              }`}>
              {cert.featured && isEarned && (
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5`} />
              )}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-3xl shadow-lg ${isEarned ? '' : 'filter grayscale'}`}>
                      {cert.emoji}
                    </div>
                    <div>
                      <h3 className={`font-bold ${isEarned ? 'text-white' : 'text-slate-500'} text-lg`}>{cert.title}</h3>
                      <p className="text-xs text-slate-500">{cert.subtitle}</p>
                    </div>
                  </div>
                  {isEarned
                    ? <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
                    : <Lock size={18} className="text-slate-600 shrink-0" />
                  }
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Requires: <span className={`font-bold ${isEarned ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {cert.requirement} days {isEarned ? '✅' : `(${cert.requirement - daysCompleted} more)`}
                    </span>
                  </p>
                  {isEarned && (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleDownload(cert)}
                      className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r ${cert.color} text-white`}>
                      <Download size={14} /> Download
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
