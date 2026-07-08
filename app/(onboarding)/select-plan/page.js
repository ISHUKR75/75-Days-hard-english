'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, Flame, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

const PLANS = [
  {
    id: 'casual',
    icon: '🐢',
    title: 'Casual',
    subtitle: '15 min/day',
    days: 90,
    mins: 15,
    desc: 'Easy pace. Perfect if you have a busy schedule.',
    topicsPerDay: '1 subtopic',
    features: ['Daily 15-minute sessions', 'Weekend revision', 'No pressure'],
    color: 'from-blue-500 to-cyan-500',
    recommended: false,
  },
  {
    id: 'regular',
    icon: '🏃',
    title: 'Regular',
    subtitle: '30 min/day',
    days: 75,
    mins: 30,
    desc: 'The perfect balance. Finish in exactly 75 days!',
    topicsPerDay: '1 topic + practice',
    features: ['30-minute daily sessions', 'Practice quizzes', 'Streak rewards'],
    color: 'from-indigo-500 to-purple-600',
    recommended: true,
  },
  {
    id: 'intensive',
    icon: '🚀',
    title: 'Intensive',
    subtitle: '60 min/day',
    days: 45,
    mins: 60,
    desc: 'Fast track. Complete the entire course in 45 days!',
    topicsPerDay: '2 topics/day',
    features: ['60-minute daily sessions', 'Extra practice', 'Speed bonuses'],
    color: 'from-orange-500 to-red-500',
    recommended: false,
  },
];

export default function SelectPlanPage() {
  const [selected, setSelected] = useState('regular');
  const router = useRouter();
  const { updateSettings } = useUserStore();

  const handleContinue = () => {
    const plan = PLANS.find(p => p.id === selected);
    if (plan) updateSettings({ dailyGoalMinutes: plan.mins });
    router.push('/complete');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/select-profession" className="flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back
        </Link>
        <div className="flex gap-1.5">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${s <= 4 ? 'w-6 bg-indigo-500' : 'w-4 bg-white/15'}`} />
          ))}
        </div>
        <span>Step 4 of 5</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white mb-1">Choose your pace ⚡</h1>
        <p className="text-slate-500 text-sm">Apni daily commitment choose karo. Baad mein change bhi kar sakte ho.</p>
      </motion.div>

      <div className="space-y-3">
        {PLANS.map((plan, i) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(plan.id)}
            className={`w-full text-left p-5 rounded-2xl border transition-all relative ${
              selected === plan.id
                ? 'bg-indigo-500/8 border-indigo-500/30 ring-1 ring-indigo-500/40'
                : 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-2.5 left-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg">
                  <Star size={10} /> Recommended
                </span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <span className="text-3xl mt-0.5">{plan.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white">{plan.title}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                      {plan.subtitle}
                    </span>
                  </div>
                  {selected === plan.id && <CheckCircle2 size={18} className="text-emerald-400" />}
                </div>
                <p className="text-sm text-slate-400 mb-2">{plan.desc}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={11} /> {plan.days} days</span>
                  <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" /> {plan.topicsPerDay}</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleContinue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
      >
        Continue <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}
