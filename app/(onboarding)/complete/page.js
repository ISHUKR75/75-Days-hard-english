'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Zap, Star, Trophy } from 'lucide-react';
import useUserStore from '@/store/userStore';

export default function CompletePage() {
  const { user, updateStreak } = useUserStore();

  useEffect(() => {
    // Trigger confetti
    import('canvas-confetti').then(m => {
      const confetti = m.default;
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#6366f1', '#d946ef', '#10b981', '#f59e0b'] });
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.4 } }), 500);
    });
    updateStreak();
  }, []);

  const perks = [
    { icon: Flame,  text: 'Day 1 Streak Started! 🔥', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: Zap,    text: '+50 Bonus XP Earned ⚡',    color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: Star,   text: 'First Badge Unlocked 🌟',   color: 'text-amber-400',  bg: 'bg-amber-500/10'  },
    { icon: Trophy, text: 'Journey Begins Today! 🏆',  color: 'text-emerald-400',bg: 'bg-emerald-500/10'},
  ];

  return (
    <div className="text-center space-y-8 py-8">
      {/* Trophy */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        className="text-7xl"
      >
        🎊
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h1 className="text-3xl font-black text-white mb-2">
          You're All Set,{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {user?.name || 'Champion'}! 🎉
          </span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Your personalized 75-day English journey starts NOW. Let's make you fluent!
        </p>
      </motion.div>

      {/* Perks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-5 text-left space-y-3"
      >
        {perks.map(({ icon: Icon, text, color, bg }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={16} className={color} />
            </div>
            <span className="text-sm font-semibold text-white">{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/30"
          >
            Start Learning Now! <ArrowRight size={18} />
          </Link>
        </motion.div>
        <p className="text-xs text-slate-600 mt-3">Day 1 is waiting for you on the dashboard</p>
      </motion.div>
    </div>
  );
}
