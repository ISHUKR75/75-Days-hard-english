'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

const PROFESSIONS = [
  { id: 'student',      icon: '🎓', title: 'Student',             desc: 'School/College student' },
  { id: 'software',     icon: '💻', title: 'Software Engineer',   desc: 'IT/Tech professional' },
  { id: 'doctor',       icon: '🏥', title: 'Doctor / Healthcare', desc: 'Medical professional' },
  { id: 'teacher',      icon: '📚', title: 'Teacher',             desc: 'Education sector' },
  { id: 'business',     icon: '💼', title: 'Business / Manager',  desc: 'Business professional' },
  { id: 'sales',        icon: '📈', title: 'Sales / Marketing',   desc: 'Sales and marketing' },
  { id: 'hr',           icon: '👥', title: 'HR / Recruiter',      desc: 'Human resources' },
  { id: 'finance',      icon: '💰', title: 'Finance / Banking',   desc: 'Finance sector' },
  { id: 'engineering',  icon: '⚙️', title: 'Engineer (Non-IT)',   desc: 'Civil, Mechanical, etc.' },
  { id: 'govt',         icon: '🏛️', title: 'Government Employee', desc: 'Public sector' },
  { id: 'freelancer',   icon: '🌐', title: 'Freelancer',          desc: 'Remote / Freelance work' },
  { id: 'other',        icon: '✨', title: 'Other',               desc: 'Not listed above' },
];

export default function SelectProfessionPage() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const { updateProfile } = useUserStore();

  const handleContinue = () => {
    if (!selected) return;
    updateProfile({ profession: selected });
    router.push('/select-plan');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/select-goal" className="flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back
        </Link>
        <div className="flex gap-1.5">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${s <= 3 ? 'w-6 bg-indigo-500' : 'w-4 bg-white/15'}`} />
          ))}
        </div>
        <span>Step 3 of 5</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white mb-1">What do you do? 💼</h1>
        <p className="text-slate-500 text-sm">Your profession helps us personalize your English practice.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2.5">
        {PROFESSIONS.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(p.id)}
            className={`text-left p-4 rounded-2xl border transition-all relative ${
              selected === p.id
                ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/30'
                : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'
            }`}
          >
            {selected === p.id && (
              <CheckCircle2 size={14} className="text-emerald-400 absolute top-2 right-2" />
            )}
            <span className="text-2xl block mb-2">{p.icon}</span>
            <p className="font-semibold text-white text-sm leading-tight">{p.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!selected}
        whileHover={selected ? { scale: 1.02 } : {}}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          selected
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
      >
        Continue <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}
