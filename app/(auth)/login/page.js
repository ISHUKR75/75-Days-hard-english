'use client';
// Login Page - Professional, animated sign-in form

import { useState }  from 'react';
import Link          from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast         from 'react-hot-toast';
import useUserStore  from '@/store/userStore';

// ============================================================
// Login Page
// ============================================================
export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useUserStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  // Basic validation
  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email required';
    if (!form.password) e.password = 'Password required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simulate login (replace with real API call later)
    await new Promise((r) => setTimeout(r, 1500));

    // Demo: just set user name and navigate to dashboard
    updateProfile({ name: 'English Student', email: form.email });
    toast.success('Welcome back! 🎉');
    router.push('/dashboard');
  };

  return (
    <div className="animate-fade-up">
      {/* Logo/Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow-primary mb-4">
          <span className="text-white font-black text-xl">75</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome Back!</h1>
        <p className="text-slate-500 text-sm">Continue your English journey</p>
      </div>

      {/* Form Card */}
      <div className="glass rounded-3xl p-8 border border-white/8">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="input pl-11"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-danger-400 mt-1.5">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="input pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-danger-400 mt-1.5">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-slate-600 font-medium">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Google',    icon: '🔵' },
            { label: 'GitHub',    icon: '⚫' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
          Create one free →
        </Link>
      </p>
    </div>
  );
}
