'use client';
// Select Level Page — Choose CEFR level during onboarding

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';

const LEVELS = [
  {
    level: 'A0',
    name: 'Absolute Beginner',
    hindi: 'बिल्कुल शुरुआत',
    desc: 'English bilkul nahi aati. Pehli baar seekhna chahta/chahti hun.',
    example: 'I don\'t know any English words.',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  {
    level: 'A1',
    name: 'Beginner',
    hindi: 'शुरुआती स्तर',
    desc: 'Kuch basic words pata hain jaise Hello, Thank you, Yes/No.',
    example: 'I can say "My name is..." and "I am from..."',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  {
    level: 'A2',
    name: 'Elementary',
    hindi: 'प्रारंभिक',
    desc: 'Simple sentences bana sakta/sakti hun. Basic conversations ho jati hain.',
    example: 'I can talk about my family and daily routine.',
    color: 'from-amber-500 to-yellow-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  {
    level: 'B1',
    name: 'Intermediate',
    hindi: 'मध्यम स्तर',
    desc: 'Regular conversations kar sakta/sakti hun but grammar mein mistakes hoti hain.',
    example: 'I can discuss topics but make many grammar errors.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  {
    level: 'B2',
    name: 'Upper Intermediate',
    hindi: 'उच्च मध्यम',
    desc: 'Fluently baat kar sakta/sakti hun with minor mistakes.',
    example: 'I can handle most conversations comfortably.',
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  {
    level: 'C1',
    name: 'Advanced',
    hindi: 'उन्नत स्तर',
    desc: 'Complex topics discuss kar sakta/sakti hun with near-native fluency.',
    example: 'I can express ideas fluently and spontaneously.',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
  },
  {
    level: 'C2',
    name: 'Mastery',
    hindi: 'पूर्ण दक्षता',
    desc: 'Native-level English. Just want to polish certain skills.',
    example: 'I can understand virtually everything I read or hear.',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
  },
];

export default function SelectLevelPage() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const { updateProfile } = useUserStore();

  const handleContinue = () => {
    if (!selected) return;
    updateProfile({ cefrLevel: selected });
    router.push('/select-goal');
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/welcome" className="flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back
        </Link>
        <div className="flex gap-1.5">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${s === 1 ? 'w-6 bg-indigo-500' : 'w-4 bg-white/15'}`} />
          ))}
        </div>
        <span>Step 1 of 5</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white mb-1">What's your English level? 🎯</h1>
        <p className="text-slate-500 text-sm">Apna current level choose karo — bilkul honest raho, yeh sirf aapke liye better course banayega.</p>
      </motion.div>

      {/* Level cards */}
      <div className="space-y-2.5">
        {LEVELS.map((l, i) => (
          <motion.button
            key={l.level}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(l.level)}
            className={`w-full text-left p-4 rounded-2xl border transition-all group ${
              selected === l.level
                ? `${l.bg} ${l.border} ring-1 ring-current`
                : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Level badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 bg-gradient-to-br ${l.color} text-white shadow-lg`}>
                {l.level}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white text-sm">{l.name} — {l.hindi}</p>
                  {selected === l.level && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{l.desc}</p>
                <p className="text-xs text-slate-600 italic mt-1">"{l.example}"</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Continue button */}
      <motion.button
        onClick={handleContinue}
        disabled={!selected}
        whileHover={selected ? { scale: 1.02 } : {}}
        whileTap={selected ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          selected
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 cursor-pointer'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
      >
        Continue <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}
