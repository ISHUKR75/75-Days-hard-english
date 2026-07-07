'use client';
import Link from 'next/link';
import { Briefcase, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { href: '/professional-english/it',      emoji: '💻', title: 'IT & Software',      desc: 'Emails, stand-ups, code reviews, client calls.' },
  { href: '/professional-english/banking',  emoji: '🏦', title: 'Banking & Finance',  desc: 'Reports, presentations, customer communication.' },
  { href: '/professional-english/sales',    emoji: '📈', title: 'Sales & Marketing',   desc: 'Pitches, follow-ups, negotiations.' },
  { href: '/professional-english/hr',       emoji: '👥', title: 'HR & Management',     desc: 'Interviews, appraisals, team communication.' },
  { href: '/professional-english/medical',  emoji: '🏥', title: 'Medical & Healthcare',desc: 'Patient communication, reports, prescriptions.' },
  { href: '/professional-english/teaching', emoji: '🎓', title: 'Education & Teaching', desc: 'Classroom English, parent communication, reports.' },
];

export default function ProfessionalEnglishPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Briefcase size={28} className="text-teal-400" /> Professional English</h1>
        <p className="text-slate-500">Industry-specific English for your career — office, emails, presentations.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(({ href, emoji, title, desc }) => (
          <Link key={href} href={href} className="card p-6 group hover:border-teal-500/30 transition-all">
            <span className="text-3xl block mb-3">{emoji}</span>
            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-teal-300 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{desc}</p>
            <span className="text-sm font-semibold text-teal-400 flex items-center gap-1">Explore <ArrowRight size={14} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
