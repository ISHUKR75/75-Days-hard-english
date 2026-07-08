'use client';
// Select Goal Page — Choose learning goals during onboarding

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

const GOALS = [
  { id: 'job-interview',    icon: '💼', title: 'Job Interview',       desc: 'HR interviews, Technical rounds, Salary negotiation' },
  { id: 'daily-convo',      icon: '🗣️', title: 'Daily Conversation',  desc: 'Friends, family, market, daily life situations' },
  { id: 'office-english',   icon: '🏢', title: 'Office / Professional', desc: 'Meetings, emails, presentations, client calls' },
  { id: 'it-tech',          icon: '💻', title: 'IT / Tech English',    desc: 'Software jobs, coding interviews, tech discussions' },
  { id: 'academic',         icon: '📚', title: 'Academic English',     desc: 'College, exams, writing, research papers' },
  { id: 'travel',           icon: '✈️', title: 'Travel English',       desc: 'Airport, hotel, tourism, international travel' },
  { id: 'writing',          icon: '📧', title: 'Email / Writing',      desc: 'Professional emails, reports, business writing' },
  { id: 'public-speaking',  icon: '🎤', title: 'Public Speaking',      desc: 'Presentations, speeches, group discussions' },
];

export default function SelectGoalPage() {
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const { updateProfile } = useUserStore();

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (!selected.length) return;
    updateProfile({ goals: selected });
    router.push('/select-profession');
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/select-level" className="flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back
        </Link>
        <div className="flex gap-1.5">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${s <= 2 ? 'w-6 bg-indigo-500' : 'w-4 bg-white/15'}`} />
          ))}
        </div>
        <span>Step 2 of 5</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white mb-1">What's your goal? 🎯</h1>
        <p className="text-slate-500 text-sm">Multiple select kar sakte ho — jitne bhi goals hain sab choose karo.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-2.5">
        {GOALS.map((g, i) => (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggle(g.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              selected.includes(g.id)
                ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/30'
                : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{g.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{g.title}</p>
                <p className="text-xs text-slate-500">{g.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                selected.includes(g.id) ? 'bg-indigo-500 border-indigo-500' : 'border-white/20'
              }`}>
                {selected.includes(g.id) && <CheckCircle2 size={12} className="text-white" />}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!selected.length}
        whileHover={selected.length ? { scale: 1.02 } : {}}
        whileTap={selected.length ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          selected.length
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
      >
        Continue ({selected.length} selected) <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}
