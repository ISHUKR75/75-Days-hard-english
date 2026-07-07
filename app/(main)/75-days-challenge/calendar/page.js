'use client';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import DAYS_75_TOPICS from '@/lib/topics';
import useUserStore from '@/store/userStore';

export default function CalendarPage() {
  const { totalLessonsCompleted } = useUserStore();
  const currentDay = totalLessonsCompleted + 1;
  const weeks = [];
  for (let i = 0; i < 75; i += 7) {
    weeks.push(DAYS_75_TOPICS.slice(i, i + 7));
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Calendar size={28} className="text-primary-400" /> Calendar View</h1>
        <p className="text-slate-500">Week-by-week overview of your 75-day journey.</p>
      </div>
      <div className="space-y-4">
        {weeks.map((week, wi) => (
          <div key={wi} className="card p-4">
            <p className="text-xs font-bold text-slate-500 mb-3">Week {wi + 1}</p>
            <div className="grid grid-cols-7 gap-2">
              {week.map((topic) => {
                const done = topic.day < currentDay;
                const cur  = topic.day === currentDay;
                return (
                  <Link key={topic.day} href={topic.day <= currentDay ? `/75-days-challenge/${topic.day}` : '#'}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                      cur  ? 'border-primary-500/40 bg-primary-500/15' :
                      done ? 'border-accent-500/30 bg-accent-500/5' :
                             'border-white/5 bg-white/2 opacity-40'
                    }`}>
                    <span className="text-[10px] text-slate-500">{topic.day}</span>
                    <span className="text-sm">{topic.emoji}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
