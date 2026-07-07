'use client';
import Link from 'next/link';
import { Flame, ArrowRight, Calendar } from 'lucide-react';
import useUserStore from '@/store/userStore';
export default function StreakPage() {
  const { streak } = useUserStore();
  return (
    <div className="max-w-lg mx-auto text-center py-12 space-y-6">
      <div className="text-6xl animate-streak-fire">🔥</div>
      <h1 className="text-4xl font-black text-white">{streak}-Day Streak!</h1>
      <p className="text-slate-400">Keep studying every day to maintain your streak and unlock exclusive badges.</p>
      <div className="grid grid-cols-3 gap-4">
        {[3, 7, 14, 30, 50, 75].map((d) => (
          <div key={d} className={`card p-4 text-center ${streak >= d ? 'border-orange-500/30 bg-orange-500/5' : 'opacity-40'}`}>
            <p className={`text-2xl font-black ${streak >= d ? 'text-orange-400' : 'text-slate-600'}`}>{d}🔥</p>
            <p className="text-xs text-slate-500 mt-1">{streak >= d ? 'Unlocked!' : `${d} days`}</p>
          </div>
        ))}
      </div>
      <Link href="/75-days-challenge" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        Continue Challenge <ArrowRight size={16} />
      </Link>
    </div>
  );
}
