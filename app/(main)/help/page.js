'use client';
import { useState } from 'react';
import { HelpCircle, MessageSquare, BookOpen, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const FAQS = [
  { q: 'Is 75 Days Hard English completely free?', a: 'Haan, bilkul free hai! No credit card, no hidden charges. Start karo aaj se.' },
  { q: 'Kya main beginner hun to bhi kar sakta hun?', a: 'Bilkul! Day 1 se shuru hota hai — zero knowledge chahiye. Sab Hindi mein samjhaya gaya hai.' },
  { q: 'Ek din mein kitna time lagega?', a: 'Daily 30-45 minutes kaafi hai. Morning ya evening — apni convenience se.' },
  { q: 'Kya certificate milega?', a: 'Haan! 75 days complete karne par official certificate milega jo aap share kar sakte hain.' },
  { q: 'Kya mobile par kaam karta hai?', a: 'Haan, fully responsive hai. Kisi bhi device par use kar sakte hain.' },
  { q: 'Mera progress save hota hai?', a: 'Haan, aapka XP, streak, aur progress automatically save hota hai.' },
];

export default function HelpPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><HelpCircle size={28} className="text-primary-400" /> Help & FAQ</h1>
        <p className="text-slate-500">Frequently asked questions — koi bhi doubt ho to yahan dekho.</p>
      </div>
      <div className="space-y-3">
        {FAQS.map(({ q, a }, i) => (
          <div key={i} className="card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors">
              <span className="font-semibold text-white text-sm pr-4">{q}</span>
              {open === i ? <ChevronUp size={16} className="text-slate-500 shrink-0" /> : <ChevronDown size={16} className="text-slate-600 shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card p-5 border-primary-500/20 bg-primary-500/5 text-center">
        <Mail size={24} className="text-primary-400 mx-auto mb-3" />
        <h3 className="font-bold text-white mb-2">Still have questions?</h3>
        <p className="text-slate-400 text-sm mb-4">Hame email karo — hum help karenge!</p>
        <a href="mailto:help@75daysenglish.com" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          Contact Support
        </a>
      </div>
    </div>
  );
}
