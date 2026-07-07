'use client';
// Real-Life English Scenarios — 16 situations with full conversation practice

import Link from 'next/link';
import { MessageSquare, ChevronRight, Play, Users, ArrowRight } from 'lucide-react';

const SCENARIOS = [
  { slug:'shopping', emoji:'🛒', title:'Shopping', desc:'Bargaining, asking for products, paying, returning items', level:'A1', color:'from-emerald-500 to-teal-500' },
  { slug:'restaurant', emoji:'🍽️', title:'At Restaurant', desc:'Ordering food, asking for bill, complaining, complimenting', level:'A1', color:'from-amber-500 to-yellow-500' },
  { slug:'doctor', emoji:'🏥', title:'Doctor Visit', desc:'Describing symptoms, asking questions, getting medicines', level:'A2', color:'from-rose-500 to-red-500' },
  { slug:'airport', emoji:'✈️', title:'Airport & Travel', desc:'Check-in, immigration, asking for directions', level:'A2', color:'from-sky-500 to-blue-500' },
  { slug:'job-interview', emoji:'💼', title:'Job Interview', desc:'Common interview questions, professional answers', level:'B1', color:'from-violet-500 to-purple-500' },
  { slug:'office', emoji:'🏢', title:'Office Conversations', desc:'Meetings, emails, presentations, small talk', level:'B1', color:'from-indigo-500 to-blue-600' },
  { slug:'phone-call', emoji:'📞', title:'Phone Calls', desc:'Making/taking calls, voicemail, professional tone', level:'A2', color:'from-cyan-500 to-sky-500' },
  { slug:'bank', emoji:'🏦', title:'Banking', desc:'Opening account, transactions, queries, complaints', level:'A2', color:'from-green-500 to-emerald-500' },
  { slug:'hotel', emoji:'🏨', title:'Hotel Check-in', desc:'Booking, checking in/out, requesting services', level:'A2', color:'from-orange-500 to-amber-500' },
  { slug:'directions', emoji:'🗺️', title:'Asking Directions', desc:'Finding places, giving directions, landmarks', level:'A1', color:'from-lime-500 to-green-500' },
  { slug:'small-talk', emoji:'💬', title:'Small Talk', desc:'Weather, weekend, hobbies — casual conversation starters', level:'A2', color:'from-pink-500 to-rose-500' },
  { slug:'networking', emoji:'🤝', title:'Networking', desc:'Professional networking, LinkedIn, referrals', level:'B2', color:'from-teal-500 to-cyan-500' },
  { slug:'complaint', emoji:'😤', title:'Making Complaints', desc:'Politely complaining to service providers, shops', level:'B1', color:'from-red-500 to-rose-500' },
  { slug:'negotiation', emoji:'🤜', title:'Negotiation', desc:'Salary negotiation, business deals, compromises', level:'B2', color:'from-purple-500 to-violet-500' },
  { slug:'presentation', emoji:'🎤', title:'Giving Presentation', desc:'Structure, transitions, Q&A handling', level:'B1', color:'from-fuchsia-500 to-pink-500' },
  { slug:'social-media', emoji:'📱', title:'Social Media English', desc:'Comments, captions, posts, DMs — modern digital English', level:'A2', color:'from-blue-500 to-indigo-500' },
];

const LEVEL_COLORS = {
  A1: 'text-emerald-400 bg-emerald-500/15',
  A2: 'text-sky-400 bg-sky-500/15',
  B1: 'text-amber-400 bg-amber-500/15',
  B2: 'text-orange-400 bg-orange-500/15',
};

// Sample conversation
const SAMPLE_CONVO = {
  title: 'At a Restaurant — Ordering Food',
  lines: [
    { speaker: 'Waiter', text: 'Good evening! Welcome to Spice Garden. How many people?', hindi: 'शुभ संध्या! स्वागत है। कितने लोग हैं?' },
    { speaker: 'You', text: 'Just two, please.', hindi: 'बस दो लोग हैं, शुक्रिया।' },
    { speaker: 'Waiter', text: 'Right this way. Here are your menus. Can I get you something to drink?', hindi: 'इस तरफ आइए। यह मेनू है। पीने के लिए कुछ मंगाएं?' },
    { speaker: 'You', text: 'Two glasses of water, please. And could you give us a few minutes to look at the menu?', hindi: 'दो गिलास पानी, और क्या मेनू देखने के लिए थोड़ा वक्त दे सकते हैं?' },
    { speaker: 'Waiter', text: 'Of course! I will be back in five minutes.', hindi: 'बिल्कुल! मैं 5 मिनट में वापस आता हूँ।' },
    { speaker: 'You', text: 'Excuse me, I would like to order now. I will have the paneer tikka and naan.', hindi: 'माफ़ करें, मैं अब order करना चाहता हूँ। पनीर टिक्का और नान चाहिए।' },
    { speaker: 'Waiter', text: 'Excellent choice! Any dessert?', hindi: 'बहुत अच्छा! मिठाई कुछ चाहिए?' },
    { speaker: 'You', text: 'No, thank you. Could we have the bill when you are ready?', hindi: 'नहीं, धन्यवाद। जब तैयार हों तो बिल दे दीजिए।' },
  ],
};

export default function ScenariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <Users size={26} className="text-emerald-400" /> Real-Life Scenarios
          </h1>
          <p className="text-slate-500">16 real-world situations — asli conversations practice karo confidence ke saath</p>
        </div>
        <Link href="/scenarios/job-interview" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Play size={14} fill="currentColor" /> Job Interview
        </Link>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SCENARIOS.map(({ slug, emoji, title, desc, level, color }) => (
          <Link
            key={slug}
            href={`/scenarios/${slug}`}
            className="card p-4 group hover:border-white/20 transition-all cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform shadow-md`}>
              {emoji}
            </div>
            <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-primary-300 transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-[10px] text-slate-500 line-clamp-2 mb-2">{desc}</p>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[level] || 'text-slate-400 bg-slate-500/15'}`}>
              {level}
            </span>
          </Link>
        ))}
      </div>

      {/* Sample Conversation */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-black text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-400" /> Sample Conversation
          </h2>
          <span className="badge text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/20">Restaurant</span>
        </div>
        <h3 className="font-semibold text-slate-300 text-sm mb-4">{SAMPLE_CONVO.title}</h3>
        <div className="space-y-3">
          {SAMPLE_CONVO.lines.map(({ speaker, text, hindi }, i) => (
            <div
              key={i}
              className={`flex gap-3 ${speaker === 'You' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                speaker === 'You' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/8 text-slate-300 border border-white/10'
              }`}>
                {speaker === 'You' ? 'U' : 'W'}
              </div>
              <div className={`flex-1 max-w-md ${speaker === 'You' ? 'text-right' : ''}`}>
                <p className="text-[10px] text-slate-500 mb-0.5">{speaker}</p>
                <div className={`p-3 rounded-xl text-sm ${
                  speaker === 'You'
                    ? 'bg-primary-500/15 border border-primary-500/20 text-primary-100 ml-auto'
                    : 'bg-white/5 border border-white/8 text-slate-200'
                }`}>
                  <p>{text}</p>
                  <p className="hindi-text text-[10px] text-slate-400 mt-0.5">{hindi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/scenarios/restaurant" className="btn-secondary text-xs mt-4 flex items-center gap-1.5 w-fit">
          Full Practice <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
