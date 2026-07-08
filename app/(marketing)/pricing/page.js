'use client';
// Pricing Page — Free forever plan + optional Pro features

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, X, ArrowRight, Zap, Star, Shield, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21,0.47,0.32,0.98] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'Forever',
    desc: 'Everything you need to become fluent in 75 days.',
    color: 'border-white/10',
    badge: null,
    cta: 'Start Free Now',
    ctaStyle: 'border border-white/15 text-white hover:bg-white/5',
    features: [
      { label: 'All 75 Days curriculum',         included: true  },
      { label: '500+ practice questions/topic',  included: true  },
      { label: 'Grammar lessons (all topics)',   included: true  },
      { label: 'Vocabulary (10,000+ words)',     included: true  },
      { label: 'XP, Coins & Gamification',       included: true  },
      { label: 'Daily Streak tracking',          included: true  },
      { label: 'Basic Progress Dashboard',       included: true  },
      { label: 'Flashcards & Memory Lab',        included: true  },
      { label: 'AI Tutor (10 queries/day)',       included: true  },
      { label: 'Unlimited AI queries',           included: false },
      { label: 'Advanced Analytics',             included: false },
      { label: 'Certificate of Completion',      included: false },
      { label: 'Priority Support',               included: false },
    ],
  },
  {
    name: 'Pro',
    price: '₹299',
    period: 'per month',
    desc: 'Advanced tools for serious learners.',
    color: 'border-indigo-500/40',
    badge: 'Most Popular',
    badgeColor: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    cta: 'Start Pro Trial',
    ctaStyle: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25',
    features: [
      { label: 'Everything in Free',             included: true  },
      { label: 'Unlimited AI Tutor queries',     included: true  },
      { label: 'AI Speaking Evaluator',          included: true  },
      { label: 'AI Essay & Writing Checker',     included: true  },
      { label: 'Advanced Analytics Dashboard',   included: true  },
      { label: 'Pronunciation Lab (full access)',included: true  },
      { label: 'Certificate of Completion',      included: true  },
      { label: 'Export Progress PDF',           included: true  },
      { label: 'Ad-free experience',             included: true  },
      { label: 'Priority Support (24h)',         included: true  },
      { label: 'Early access to new features',   included: true  },
      { label: 'Team / Organization plan',       included: false },
    ],
  },
  {
    name: 'Team',
    price: '₹999',
    period: 'per month',
    desc: 'For organizations, schools, and coaching institutes.',
    color: 'border-purple-500/30',
    badge: 'For Organizations',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    cta: 'Contact Sales',
    ctaStyle: 'border border-purple-500/30 text-purple-300 hover:bg-purple-500/10',
    features: [
      { label: 'Everything in Pro',              included: true  },
      { label: 'Up to 50 team members',          included: true  },
      { label: 'Admin dashboard',                included: true  },
      { label: 'Progress reports for all users', included: true  },
      { label: 'Custom branding',                included: true  },
      { label: 'Dedicated account manager',      included: true  },
      { label: 'API access',                     included: true  },
      { label: 'Custom content upload',          included: true  },
      { label: 'Bulk certificates',              included: true  },
      { label: 'SLA guarantee',                  included: true  },
    ],
  },
];

const FAQS = [
  { q: 'Is the Free plan really free forever?',            a: 'Yes! The free plan includes ALL 75 days of curriculum, practice questions, and gamification. No credit card, no trial period.' },
  { q: 'Can I cancel Pro anytime?',                        a: 'Absolutely. Cancel anytime from your account settings. No questions asked, no hidden fees.' },
  { q: 'What payment methods are accepted?',               a: 'We accept UPI, Credit/Debit cards, Net Banking, and Wallets (Paytm, PhonePe, etc.).' },
  { q: 'Is there a student discount?',                     a: 'Yes! Students get 50% off Pro with a valid .edu email. Contact us with proof of enrollment.' },
  { q: 'What happens to my data if I cancel?',             a: 'Your progress, XP, and settings are saved. You can resume anytime, even on the free plan.' },
];

export default function PricingPage() {
  const [faqOpen, setFaqOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-5">
              FREE FOREVER — No Credit Card
            </span>
            <h1 className="text-5xl font-black mb-4">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Start completely free. Upgrade when you want more power. No hidden fees. Ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Plans ──────────────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className={`rounded-3xl border ${plan.color} bg-surface-800/60 p-7 relative flex flex-col ${
                  plan.badge === 'Most Popular' ? 'ring-1 ring-indigo-500/30' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`inline-block px-3 py-1 rounded-full ${plan.badgeColor} text-white text-xs font-bold shadow-lg whitespace-nowrap`}>
                      {plan.badge === 'Most Popular' ? <><Star size={10} className="inline mr-1" />Most Popular</> : plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-black text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{plan.desc}</p>
                </div>

                <ul className="flex-1 space-y-2.5 mb-7">
                  {plan.features.map(({ label, included }) => (
                    <li key={label} className={`flex items-center gap-2.5 text-sm ${included ? 'text-slate-300' : 'text-slate-600'}`}>
                      {included
                        ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        : <X size={15} className="text-slate-700 shrink-0" />
                      }
                      {label}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Team' ? '/contact' : '/register'}
                  className={`w-full py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trust badges ──────────────────────────────────── */}
      <section className="py-14 px-4 bg-white/2 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, text: 'No Credit Card', color: 'text-emerald-400' },
              { icon: Zap,    text: 'Instant Access', color: 'text-indigo-400'  },
              { icon: Users,  text: '10,000+ Users',  color: 'text-purple-400'  },
              { icon: Star,   text: 'Open Source',    color: 'text-amber-400'   },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex flex-col items-center gap-2">
                <Icon size={22} className={color} />
                <span className="text-sm text-slate-400">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white mb-2">Pricing FAQ</h2>
            <p className="text-slate-500 text-sm">Common questions about plans and billing</p>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={q} className="rounded-2xl border border-white/5 bg-white/2 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3"
                >
                  <span className="font-semibold text-white text-sm">{q}</span>
                  <span className="text-slate-500 text-lg">{faqOpen === i ? '−' : '+'}</span>
                </button>
                {faqOpen === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-white/5 px-5 py-4"
                  >
                    <p className="text-sm text-slate-400">{a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
