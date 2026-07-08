'use client';
// ============================================================
// REGISTER PAGE — New user sign up
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const { updateProfile } = useUserStore();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name    = 'Name is required';
    if (!form.email)           e.email   = 'Email is required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    updateProfile({ name: form.name, email: form.email });
    toast.success('🎉 Welcome to 75 Days Hard English!');
    router.push('/dashboard');
  };

  const BENEFITS = [
    'Save your progress forever',
    'Earn XP, coins & badges',
    'Track your learning streak',
    'Access all 75 lessons free',
  ];

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow-primary mb-4">
          <span className="text-white font-black text-xl">75</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Start Your Journey</h1>
        <p className="text-slate-500 text-sm">Free forever • No credit card needed</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {BENEFITS.map((b, i) => (
          <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
            className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
            {b}
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 border border-white/8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})}
                placeholder="Rahul Kumar" className="input pl-11" />
            </div>
            {errors.name && <p className="text-xs text-danger-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                placeholder="you@example.com" className="input pl-11" />
            </div>
            {errors.email && <p className="text-xs text-danger-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPass?'text':'password'} value={form.password} onChange={e => setForm({...form,password:e.target.value})}
                placeholder="••••••••" className="input pl-11 pr-11" />
              <button type="button" onClick={() => setShowPass(v=>!v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger-400 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPass?'text':'password'} value={form.confirm} onChange={e => setForm({...form,confirm:e.target.value})}
                placeholder="••••••••" className="input pl-11" />
            </div>
            {errors.confirm && <p className="text-xs text-danger-400 mt-1">{errors.confirm}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-gradient py-3.5 text-base font-bold rounded-2xl flex items-center justify-center gap-2 mt-2">
            {loading ? <><Loader2 size={18} className="animate-spin" />Creating account…</> : <>Create Free Account <ArrowRight size={18}/></>}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-slate-600">OR</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[{label:'Google',icon:'🔵'},{label:'GitHub',icon:'⚫'}].map(({label,icon}) => (
            <button key={label} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 transition-all">
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">Sign in →</Link>
      </p>
    </div>
  );
}
