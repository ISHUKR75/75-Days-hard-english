'use client';
import Link from 'next/link';
import { GraduationCap, Lock, ArrowRight } from 'lucide-react';
import useUserStore from '@/store/userStore';

const AVAILABLE_CERTS = [
  { id: 'beginner',   emoji: '🌱', title: 'Beginner Certificate',    req: 'Complete Days 1–10',  days: 10 },
  { id: 'elementary', emoji: '⭐', title: 'Elementary Certificate',  req: 'Complete Days 1–25',  days: 25 },
  { id: 'intermediate',emoji:'🏅', title: 'Intermediate Certificate',req: 'Complete Days 1–50',  days: 50 },
  { id: 'advanced',   emoji: '🏆', title: '75 Days Champion',        req: 'Complete all 75 days',days: 75 },
];

export default function CertificatesPage() {
  const { totalLessonsCompleted } = useUserStore();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><GraduationCap size={28} className="text-amber-400" /> Certificates</h1>
        <p className="text-slate-500">Earn certificates as you progress — share them on LinkedIn!</p>
      </div>
      <div className="space-y-4">
        {AVAILABLE_CERTS.map(({ id, emoji, title, req, days }) => {
          const unlocked = totalLessonsCompleted >= days;
          return (
            <div key={id} className={`card p-6 flex items-center gap-5 transition-all ${unlocked ? 'border-amber-500/30 bg-amber-500/5' : 'opacity-60'}`}>
              <span className="text-4xl">{emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-0.5">{title}</h3>
                <p className="text-sm text-slate-500">{req}</p>
              </div>
              {unlocked ? (
                <Link href={`/75-days-challenge/certificate`} className="btn-primary text-sm px-4 py-2 shrink-0">Download</Link>
              ) : (
                <div className="flex items-center gap-2 text-slate-600 shrink-0">
                  <Lock size={16} />
                  <span className="text-xs">{days - totalLessonsCompleted} days left</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
