'use client';
// ============================================================
// WRITING PRACTICE PAGE — Emails, Letters, Essays, Applications
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, ChevronRight, Check, Sparkles, Copy, RotateCcw } from 'lucide-react';
import useUserStore from '@/store/userStore';

const WRITING_TEMPLATES = [
  {
    id:'email-formal', category:'email', level:'B1',
    title:'Formal Business Email',
    icon:'📧',
    situation:'Write a formal email to your manager requesting a day off',
    hints:['Start with a formal salutation','State purpose clearly in first line','Be polite and professional','End with formal closing'],
    template:`Subject: Request for Leave on [Date]

Dear [Manager's Name],

I hope this email finds you well.

I am writing to request a day off on [Date] due to [reason - personal/medical/family]. I have ensured that all my pending work will be completed before that date and I will coordinate with my team to manage any urgent tasks in my absence.

I would be grateful if you could consider and approve my leave request at your earliest convenience.

Please let me know if you need any further information.

Warm regards,
[Your Name]
[Designation]`,
    sample:`Subject: Request for Leave on 15th July

Dear Mr. Sharma,

I hope this email finds you well.

I am writing to request a day off on 15th July due to a medical appointment. I have ensured that all my pending tasks for the Sprint will be completed by 14th July, and I have informed my colleague Priya to handle any urgent matters in my absence.

I would be grateful if you could consider and approve my leave request at your earliest convenience.

Please let me know if you need any further information.

Warm regards,
Rahul Kumar
Software Engineer`
  },
  {
    id:'email-complaint', category:'email', level:'B2',
    title:'Complaint Email',
    icon:'📩',
    situation:'Write a complaint email to customer service about a defective product',
    hints:['State the problem clearly','Include order/reference number','Be firm but polite','Request specific action'],
    template:`Subject: Complaint Regarding Defective Product — Order #[NUMBER]

Dear Customer Service Team,

I am writing to bring to your attention an issue with my recent purchase.

I ordered [product name] on [date] (Order Number: [order number]) and received it on [delivery date]. However, upon using the product, I discovered that [describe the defect/problem clearly].

I am disappointed with this experience as I expected a product of much higher quality. I kindly request that you either [replacement/refund/repair] at the earliest.

I have attached photographs of the defect for your reference.

I hope this matter will be resolved promptly. I look forward to your response within the next 3 working days.

Yours sincerely,
[Your Name]
Contact: [Phone/Email]`,
    sample:`Subject: Complaint Regarding Defective Product — Order #ABC12345

Dear Customer Service Team,

I am writing to bring to your attention an issue with my recent purchase.

I ordered a Bluetooth Earphone on 5th July (Order Number: ABC12345) and received it on 8th July. However, upon using the product, I discovered that the right earpiece produces no sound, making the product completely unusable.

I am disappointed with this experience as I expected a product of much higher quality. I kindly request a full replacement or refund at the earliest.

I have attached photographs of the defect for your reference.

I hope this matter will be resolved promptly. I look forward to your response within the next 3 working days.

Yours sincerely,
Priya Sharma
Contact: 9876543210`
  },
  {
    id:'application', category:'application', level:'B1',
    title:'Job Application Letter',
    icon:'📝',
    situation:'Write an application letter for a Software Engineer position',
    hints:['Address to the hiring manager','Mention the position you are applying for','Highlight relevant skills/experience','Express enthusiasm for the role'],
    template:`[Your Name]
[Your Address]
[Date]

The HR Manager,
[Company Name],
[Company Address]

Subject: Application for the Position of [Job Title]

Dear Sir/Madam,

I am writing to apply for the position of [Job Title] as advertised on [source/platform].

I hold a [degree] in [field] from [university] and have [X years] of experience in [relevant field]. During my time at [previous company], I have developed strong skills in [relevant skills], which I believe align well with the requirements of this role.

Some of my key accomplishments include:
• [Achievement 1]
• [Achievement 2]
• [Achievement 3]

I am confident that my skills and experience make me a strong candidate for this position. I am enthusiastic about the opportunity to contribute to [Company Name]'s growth and success.

I have enclosed my CV for your consideration. I would welcome the opportunity to discuss how my background could benefit your team.

Thank you for considering my application.

Yours sincerely,
[Your Name]
Contact: [Phone] | [Email]`,
    sample:`Rahul Kumar
42, Sector 5, New Delhi — 110001
8th July 2025

The HR Manager,
Tech Solutions Pvt. Ltd.,
Connaught Place, New Delhi

Subject: Application for the Position of Software Engineer

Dear Sir/Madam,

I am writing to apply for the position of Software Engineer as advertised on LinkedIn.

I hold a B.Tech in Computer Science from Delhi University and have 3 years of experience in full-stack web development. During my time at ABC Technologies, I have developed strong skills in React.js, Node.js, and PostgreSQL, which I believe align well with the requirements of this role.

Some of my key accomplishments include:
• Developed a customer dashboard that reduced support tickets by 40%
• Led a team of 4 developers to deliver the mobile app 2 weeks ahead of schedule
• Received "Best Employee" award for Q2 2024

I am confident that my skills and experience make me a strong candidate for this position. I am enthusiastic about the opportunity to contribute to Tech Solutions' continued growth.

I have enclosed my CV for your consideration. I would welcome the opportunity to discuss further at your convenience.

Thank you for considering my application.

Yours sincerely,
Rahul Kumar
Contact: 9876543210 | rahul@email.com`
  },
  {
    id:'paragraph-daily', category:'paragraph', level:'A2',
    title:'Paragraph: My Daily Routine',
    icon:'📄',
    situation:'Write a paragraph about your daily routine using simple present tense',
    hints:['Use simple present tense throughout','Include time expressions (at 7 AM, in the evening)','Use sequence words (first, then, after that, finally)','Write 80–120 words'],
    template:`My Daily Routine

Every day, I wake up at [time]. First, I [activity]. Then, I [activity]. After getting ready, I [activity].

I reach [workplace/school] at [time]. At work/school, I [activities]. I usually take a lunch break at [time] and eat [food].

In the evening, I [activity]. After dinner, I [activity]. I usually go to bed at [time].

I find my routine [adjective] because [reason]. On weekends, my routine is [different/similar] as I [activity].`,
    sample:`My Daily Routine

Every day, I wake up at 6:30 AM. First, I brush my teeth and take a shower. Then, I have breakfast with my family. After getting ready, I commute to the office.

I reach the office at 9 AM. At work, I attend meetings, write code, and review team updates. I usually take a lunch break at 1 PM and eat home-cooked food that I bring from home.

In the evening, I return home at 7 PM and spend time with my family. After dinner, I either read a book or practice English for 30 minutes. I usually go to bed at 11 PM.

I find my routine productive because it helps me balance work and personal life. On weekends, I sleep a bit longer and spend quality time with friends.`
  },
  {
    id:'essay-english', category:'essay', level:'B2',
    title:'Essay: Importance of English',
    icon:'📰',
    situation:'Write a short essay on "The Importance of Learning English" (200–250 words)',
    hints:['Start with an introduction','Write 2–3 body paragraphs with examples','Add conclusion','Use formal vocabulary'],
    template:`The Importance of Learning English

Introduction:
[Write 2-3 sentences about why English is important in today's world]

Body Paragraph 1 — Career Benefits:
[Write about job opportunities, global business, professional communication]

Body Paragraph 2 — Communication & Knowledge:
[Write about connecting with people worldwide, accessing information, education]

Conclusion:
[Summarize and give a strong closing statement]`,
    sample:`The Importance of Learning English

In today's globalized world, English has become the most widely spoken and important language. Whether in business, education, or daily communication, the ability to speak English fluently opens countless doors.

From a career perspective, English proficiency is one of the most sought-after skills by employers. International companies, IT firms, and multinational corporations all require employees who can communicate effectively in English. A person who speaks fluent English has a significant advantage over others in job interviews and professional settings.

Beyond careers, English enables us to connect with people from different countries and cultures. It is the primary language of the internet, science, and academics. Students who can read English have access to the world's best textbooks, research papers, and online resources.

Furthermore, English builds confidence. When we can express our thoughts clearly, we feel more capable and self-assured in social and professional situations.

In conclusion, learning English is not merely about speaking a foreign language — it is about gaining access to opportunities, knowledge, and global connections. In today's world, English is no longer optional; it is essential for personal and professional growth.`
  },
];

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [userText, setUserText]             = useState('');
  const [showSample, setShowSample]         = useState(false);
  const [copied, setCopied]                 = useState(false);

  const { addXP } = useUserStore();

  const CATEGORIES = ['all','email','application','paragraph','essay'];
  const filtered = activeCategory === 'all' ? WRITING_TEMPLATES : WRITING_TEMPLATES.filter(t => t.category === activeCategory);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">✍️ Writing Practice</h1>
        <p className="text-slate-400">Emails, letters, essays, paragraphs — professional writing mastery</p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border capitalize transition-all ${
              activeCategory === cat ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Template Cards / Active Template */}
      {!activeTemplate ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((tpl) => (
            <motion.div key={tpl.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              whileHover={{y:-3}} className="card p-5 cursor-pointer group"
              onClick={() => { setActiveTemplate(tpl); setUserText(tpl.template); setShowSample(false); addXP(5); }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">{tpl.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-primary text-[10px] capitalize">{tpl.category}</span>
                    <span className="text-[10px] text-slate-500">CEFR {tpl.level}</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{tpl.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{tpl.situation}</p>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors mt-1 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="space-y-5">
          {/* Back + Title */}
          <div className="flex items-center gap-3">
            <button onClick={() => { setActiveTemplate(null); setShowSample(false); }}
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              ← Back
            </button>
            <span className="text-white font-bold">{activeTemplate.title}</span>
          </div>

          {/* Situation */}
          <div className="card p-4 bg-amber-500/5 border-amber-500/20">
            <p className="text-sm font-semibold text-amber-300 mb-1">📌 Task:</p>
            <p className="text-slate-300 text-sm">{activeTemplate.situation}</p>
          </div>

          {/* Hints */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2"><Sparkles size={14} className="text-violet-400"/>Writing Tips</p>
            <ul className="space-y-1">{activeTemplate.hints.map((h,i) => <li key={i} className="text-xs text-slate-400">• {h}</li>)}</ul>
          </div>

          {/* Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-white">Your Writing:</label>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(userText)} className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={() => setUserText(activeTemplate.template)} className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </div>
            <textarea
              value={userText}
              onChange={e => setUserText(e.target.value)}
              rows={18}
              className="input w-full text-sm font-mono resize-none"
              placeholder="Write your response here..."
            />
            <p className="text-xs text-slate-600 mt-1">{userText.split(/\s+/).filter(Boolean).length} words</p>
          </div>

          {/* Sample Answer */}
          <div>
            <button onClick={() => setShowSample(v => !v)}
              className="flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300">
              {showSample ? '🙈 Hide Sample' : '👁️ Show Sample Answer'}
            </button>
            <AnimatePresence>
              {showSample && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                  className="mt-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <pre className="text-xs text-emerald-200 whitespace-pre-wrap font-sans leading-relaxed">{activeTemplate.sample}</pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
