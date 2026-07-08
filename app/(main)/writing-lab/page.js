'use client';
// Writing Lab — Complete professional writing skills platform
// Tabs: Email | Letter | Essay | Resume | Application | Story

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool, FileText, Mail, BookOpen, Briefcase, Copy, Check,
  ChevronRight, Star, ArrowRight, Zap, Award,
  CheckCircle2, AlertTriangle, User, Send, Hash,
} from 'lucide-react';

// ── Tab definitions ──────────────────────────────────────────
const TABS = [
  { id: 'email',       label: 'Email Writing',      emoji: '📧', color: 'from-blue-500 to-indigo-600' },
  { id: 'letter',      label: 'Letter Writing',     emoji: '✉️', color: 'from-emerald-500 to-teal-600' },
  { id: 'essay',       label: 'Essay Writing',      emoji: '📝', color: 'from-purple-500 to-violet-600' },
  { id: 'resume',      label: 'Resume Tips',        emoji: '💼', color: 'from-amber-500 to-orange-600' },
  { id: 'application', label: 'Application Writing',emoji: '📋', color: 'from-cyan-500 to-sky-600' },
  { id: 'story',       label: 'Story Writing',      emoji: '📖', color: 'from-rose-500 to-pink-600' },
];

// ── Email Templates ──────────────────────────────────────────
const EMAIL_TEMPLATES = [
  {
    id: 'formal-request',
    title: 'Formal Request Email',
    subject: 'Request for [Information/Meeting/Document]',
    body: `Dear [Name/Sir/Ma'am],

I hope this email finds you well.

I am writing to formally request [describe what you need]. This is in connection with [context/reason].

Specifically, I would appreciate if you could [specific action needed]. This is required by [date/deadline] as [brief reason for urgency].

Please let me know if you need any additional information from my side. I would be happy to clarify.

Thank you for your time and consideration.

Warm regards,
[Your Name]
[Your Designation]
[Contact Details]`,
    tips: ['Always mention the reason for your request', 'Give a specific deadline if needed', 'Keep it formal and polite', 'End with gratitude'],
    mistakes: ['Starting with "I want" instead of "I am writing to"', 'Missing subject line context', 'Not mentioning deadline'],
  },
  {
    id: 'job-application',
    title: 'Job Application Email',
    subject: 'Application for [Job Title] — [Your Name]',
    body: `Dear Hiring Manager,

I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Platform].

With [X years] of experience in [field], I have developed strong skills in [key skill 1], [key skill 2], and [key skill 3]. In my current role at [Current Company], I [specific achievement that demonstrates value].

I am particularly excited about [Company Name] because [specific reason — culture, mission, product].

I have attached my resume and portfolio for your review. I would welcome the opportunity to discuss how my skills align with [Company Name]'s goals.

Thank you for considering my application.

Sincerely,
[Your Full Name]
[Phone Number]
[Email Address]
[LinkedIn Profile]`,
    tips: ['Tailor each application to the specific job', 'Mention specific achievements with numbers', 'Research the company and mention something specific', 'Keep it under 250 words'],
    mistakes: ['Generic emails sent to all companies', 'Not attaching resume', 'Using "To Whom It May Concern"'],
  },
  {
    id: 'complaint',
    title: 'Complaint Email',
    subject: 'Complaint Regarding [Issue] — [Order/Reference Number]',
    body: `Dear Customer Service Team,

I am writing to bring to your attention a serious issue I encountered with [product/service].

On [date], I [describe what happened in detail]. Despite [any previous attempts to resolve], the issue has not been resolved.

This has caused [describe the impact — inconvenience, financial loss, etc.].

I would like to request that you:
1. [Specific resolution — refund/replacement/explanation]
2. Confirm receipt of this complaint within [X business days]

Please find attached [any relevant documents — receipts, photos, previous correspondence].

I trust this matter will be resolved promptly.

Sincerely,
[Your Name]
[Contact Details]`,
    tips: ['Stay professional — never be rude', 'State the facts clearly', 'Provide all relevant reference numbers', 'Be specific about what resolution you want'],
    mistakes: ['Being emotional or rude', 'Not providing order/reference number', 'No clear resolution requested'],
  },
  {
    id: 'apology',
    title: 'Apology Email',
    subject: 'Sincere Apology for [Issue]',
    body: `Dear [Name],

I am writing to sincerely apologize for [describe the mistake or issue].

I fully understand that this has [caused inconvenience/affected your trust/impacted your work], and I take complete responsibility for it.

To make this right, I am taking the following steps:
1. [Immediate action you have taken]
2. [Steps to prevent recurrence]
3. [Any compensation or remedy offered]

I understand if this has affected your trust in us, and I am committed to ensuring this does not happen again.

Once again, I am truly sorry for any inconvenience caused.

With sincere apologies,
[Your Name]`,
    tips: ['Take full responsibility — do not make excuses', 'Be specific about what you are apologizing for', 'Describe concrete steps to fix the issue', 'Keep a genuine and humble tone'],
    mistakes: ['Saying "I am sorry if you felt bad" (conditional apology)', 'Making excuses', 'Not offering a solution'],
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Email',
    subject: 'Follow-Up: [Previous Topic/Meeting/Application]',
    body: `Dear [Name],

I hope you are doing well.

I am following up on [the meeting/email/application] from [date]. I wanted to check if you had a chance to review [what you sent/discussed].

[Add any new information or update if applicable.]

I would appreciate an update at your earliest convenience. Please let me know if you need any additional information from my end.

Looking forward to hearing from you.

Best regards,
[Your Name]`,
    tips: ['Wait at least 3–5 business days before following up', 'Keep it brief and polite', 'Reference the previous conversation clearly'],
    mistakes: ['Following up too soon (next day)', 'Writing a long email for a follow-up', 'Sounding impatient or demanding'],
  },
  {
    id: 'thank-you',
    title: 'Thank You Email',
    subject: 'Thank You — [Interview/Meeting/Help]',
    body: `Dear [Name],

Thank you so much for [meeting with me / helping me / the interview] on [date].

I truly appreciate [what specifically you are grateful for]. [One specific thing that stood out or was helpful].

[If post-interview: I remain very interested in the [position] and am confident that my skills in [area] would be a great fit.]

Thank you again for your time and consideration.

Warm regards,
[Your Name]`,
    tips: ['Send within 24 hours of meeting/interview', 'Be specific about what you are thanking them for', 'Keep it short — 3–4 paragraphs max'],
    mistakes: ['Sending too late (after 2–3 days)', 'Generic message with no specifics', 'Re-attaching everything from before'],
  },
  {
    id: 'meeting-request',
    title: 'Meeting Request Email',
    subject: 'Meeting Request — [Topic] on [Date]',
    body: `Dear [Name],

I hope this message finds you well.

I would like to schedule a meeting to discuss [topic/purpose]. I believe this is important because [brief reason].

I am available on the following dates and times:
• [Option 1 — date and time]
• [Option 2 — date and time]
• [Option 3 — date and time]

The meeting should take approximately [duration]. We can meet [in person/via Zoom/via Google Meet]. I will send the meeting invite once you confirm.

Please let me know which time works best for you.

Best regards,
[Your Name]`,
    tips: ['Always give multiple time options', 'State the meeting purpose clearly', 'Specify expected duration and platform'],
    mistakes: ['Only giving one time slot', 'Not stating why the meeting is needed', 'Not mentioning the meeting platform'],
  },
  {
    id: 'resignation',
    title: 'Resignation Email',
    subject: 'Resignation — [Your Name] — [Last Working Day]',
    body: `Dear [Manager's Name],

I am writing to formally resign from my position as [Your Job Title] at [Company Name], effective [Last Working Day — typically 30 days from today].

This was not an easy decision. I am truly grateful for the opportunities, mentorship, and experiences I have gained here over the past [duration].

I am committed to ensuring a smooth transition and will complete all pending work and assist in training my replacement over the next [notice period].

I would like to express my sincere gratitude to you and the entire team for your support and guidance.

Thank you for everything.

Sincerely,
[Your Full Name]`,
    tips: ['Give adequate notice (check your contract — usually 30 days)', 'Stay positive — never burn bridges', 'Offer to help with transition'],
    mistakes: ['Resigning without notice', 'Expressing frustration or grievances in resignation', 'Not offering to complete pending work'],
  },
  {
    id: 'introduction',
    title: 'Business Introduction Email',
    subject: 'Introduction — [Your Name], [Your Company]',
    body: `Dear [Name],

My name is [Your Name] and I am the [Your Position] at [Your Company].

I am reaching out because [reason for contacting — common interest, referral, partnership, etc.].

[Company name] specializes in [what your company does] and has worked with clients such as [notable examples if applicable].

I believe there could be great synergy between our organizations, specifically in [area of potential collaboration].

Would you be open to a 20-minute call this week or next to explore possibilities?

Looking forward to connecting.

Best regards,
[Your Name]
[Contact Details]`,
    tips: ['Explain clearly who you are and why you are contacting', 'Personalize — show you know something about their company', 'End with a clear, easy call-to-action'],
    mistakes: ['Sending copy-paste emails to 100 people', 'No clear value proposition', 'Vague call to action like "let me know"'],
  },
  {
    id: 'leave-request',
    title: 'Leave Request Email',
    subject: 'Leave Application — [Your Name] — [Dates]',
    body: `Dear [Manager's Name],

I would like to request leave from [Start Date] to [End Date] ([Number of days] days) for [reason — personal work/medical/travel].

During my absence, [colleague's name] has agreed to handle urgent matters. I will complete all pending tasks before I leave and will remain reachable in case of emergencies.

Please let me know if this is convenient or if any adjustments are needed.

Thank you for your understanding.

Best regards,
[Your Name]`,
    tips: ['Apply at least 1–2 weeks in advance for planned leaves', 'Arrange a backup colleague', 'Keep the reason brief — you do not need to over-explain'],
    mistakes: ['Applying for leave at the last minute', 'Not arranging backup coverage', 'Too much personal detail'],
  },
];

// ── Letter Templates ────────────────────────────────────────
const LETTER_TEMPLATES = [
  {
    id: 'formal-complaint',
    title: 'Formal Complaint Letter',
    body: `[Your Name]
[Your Address]
[City, Date]

The Manager,
[Company/Department Name]
[Address]

Subject: Complaint Regarding [Issue]

Dear Sir/Madam,

I am writing to bring to your notice a serious problem I have been facing with [describe the issue] since [date].

I have already [any previous actions taken — called, visited, emailed], but the matter has not been resolved. This has caused me significant [inconvenience/loss/problem].

I request you to take immediate action to [specific remedy you seek]. I would appreciate a response within [X] days.

I hope this matter will receive your prompt attention.

Thanking you,
Yours faithfully,
[Your Signature]
[Your Name]`,
    tips: ['Use "Yours faithfully" when you do not know the recipient by name', 'Mention all facts and dates accurately', 'Be firm but polite'],
  },
  {
    id: 'leave-application',
    title: 'Leave Application Letter',
    body: `[Date]

The Principal / Manager,
[School/Company Name]
[Address]

Subject: Application for Leave

Respected Sir/Madam,

I, [Your Name], student/employee of [Class/Department], am writing to request leave for [Number of days] days from [Start Date] to [End Date].

The reason for this leave is [reason — illness/family function/personal work]. I have attached a [medical certificate/supporting document] for your reference.

I assure you that I will complete all pending [work/assignments] before my leave and will resume from [date].

I request you to kindly grant me leave for the mentioned period.

Thanking you,
Yours obediently/sincerely,
[Your Name]
[Roll No./Employee ID]`,
    tips: ['State dates clearly', 'Attach supporting documents', 'Mention you will complete pending work'],
  },
  {
    id: 'recommendation',
    title: 'Recommendation Letter',
    body: `[Date]

To Whom It May Concern,

I am writing to wholeheartedly recommend [Candidate Name] for [position/program/opportunity].

I have known [Name] for [duration] in my capacity as [your role]. During this time, I have had the opportunity to observe [his/her/their] [qualities — academic performance, professional skills, character].

[Name] consistently demonstrated [specific quality 1] and [specific quality 2]. One instance that stands out is [specific example or achievement].

I am confident that [Name] will excel in [role/program] and would be a valuable [asset/student/member].

Please feel free to contact me at [email] for further information.

Sincerely,
[Your Name]
[Your Designation]
[Contact Details]`,
    tips: ['Be specific — give real examples', 'Mention how long and in what capacity you know them', 'End with contact details for follow-up'],
  },
  {
    id: 'bank-letter',
    title: 'Letter to Bank Manager',
    body: `[Date]

The Branch Manager,
[Bank Name]
[Branch Address]

Subject: [Request for Cheque Book / Account Statement / Net Banking etc.]

Dear Sir/Madam,

I am [Your Name], holding a savings/current account (Account No.: [XXXXXXXX]) at your branch.

I am writing to request [state your specific request clearly]. This is required for [reason].

I have attached [relevant documents — ID proof, passbook copy, etc.] for your reference.

I request you to kindly process this at the earliest and confirm via [email/post/SMS].

Thanking you,
Yours faithfully,
[Your Name]
[Account No.]
[Contact No.]`,
    tips: ['Always mention your account number', 'Attach required documents proactively', 'State your request in the subject line'],
  },
  {
    id: 'job-application-letter',
    title: 'Job Application Letter',
    body: `[Date]

The HR Manager,
[Company Name]
[Company Address]

Subject: Application for the Post of [Job Title]

Respected Sir/Madam,

I am writing to apply for the position of [Job Title] as advertised on [platform/source].

I hold a [degree] in [subject] from [institution] with [percentage/CGPA]. I have [X years of experience/fresher] in [field]. My key skills include [skill 1], [skill 2], and [skill 3].

I am particularly drawn to [Company Name] because [specific reason — reputation, work culture, products]. I am confident that my background in [area] will allow me to contribute effectively to your team.

My resume is enclosed herewith for your kind consideration. I would welcome the opportunity for an interview at your convenience.

Thanking you,
Yours sincerely,
[Your Name]
[Contact No.]
[Email]`,
    tips: ['Write a fresh letter for each company', 'Highlight 2–3 most relevant skills', 'Mention your notice period if applicable'],
  },
];

// ── Essay Structures ────────────────────────────────────────
const ESSAY_SAMPLES = [
  {
    topic: 'Mobile Phones — Boon or Bane?',
    level: 'B1',
    structure: [
      { part: 'Introduction', content: 'In the 21st century, mobile phones have become an inseparable part of human life. Today, billions of people across the world own a smartphone. While mobile phones offer tremendous benefits, they also come with serious drawbacks. In my opinion, mobile phones are more of a boon than a bane, provided they are used responsibly.' },
      { part: 'Body 1 — Benefits', content: 'Firstly, mobile phones have revolutionized communication. People can now connect with family and friends across the globe instantly. Furthermore, smartphones have made information accessible to everyone. Students can learn through educational apps, watch tutorials, and access digital libraries. In addition, mobile banking, online shopping, and digital payments have made everyday life much more convenient.' },
      { part: 'Body 2 — Drawbacks', content: 'However, mobile phones also pose significant challenges. Excessive use leads to addiction, especially among teenagers, who spend hours on social media instead of studying. Moreover, constant screen time causes health problems such as eye strain and sleep disorders. There are also serious concerns about cyberbullying, privacy breaches, and online fraud.' },
      { part: 'Counter + Refute', content: 'Some argue that mobile phones are a distraction in classrooms and workplaces. While this is partially true, the solution lies in discipline and digital literacy — not in banning the technology entirely. Proper guidance and screen-time management can address these concerns effectively.' },
      { part: 'Conclusion', content: 'To conclude, mobile phones, like any tool, are neither good nor bad by themselves — their impact depends on how we use them. With responsible usage, parental guidance, and digital awareness, the benefits of mobile phones far outweigh their drawbacks. Therefore, I believe they are fundamentally a boon for modern society.' },
    ],
  },
  {
    topic: 'Importance of Education',
    level: 'A2',
    structure: [
      { part: 'Introduction', content: 'Education is often described as the most powerful weapon to change the world. It is the foundation on which individuals build their future and nations build their progress. I strongly believe that quality education is the single most important investment a society can make.' },
      { part: 'Body 1', content: 'First and foremost, education develops critical thinking and problem-solving skills. An educated person can analyze situations, make informed decisions, and adapt to change. For example, during the COVID-19 pandemic, educated healthcare workers and scientists developed vaccines in record time, saving millions of lives.' },
      { part: 'Body 2', content: 'Furthermore, education empowers people economically. It opens doors to better career opportunities and higher salaries. Studies show that each additional year of education increases a person\'s earning potential by approximately 8–10%. This directly reduces poverty and improves living standards.' },
      { part: 'Counter + Refute', content: 'Critics argue that formal education stifles creativity and that practical skills matter more. While hands-on experience is undeniably valuable, it is education that provides the theoretical foundation on which practical skills are built. The two are complementary, not contradictory.' },
      { part: 'Conclusion', content: 'In conclusion, education is not merely about acquiring degrees — it is about developing a curious, capable, and compassionate human being. Governments, families, and individuals must prioritize education as the cornerstone of a prosperous future.' },
    ],
  },
  {
    topic: 'Social Media: Impact on Youth',
    level: 'B2',
    structure: [
      { part: 'Introduction', content: 'Social media platforms such as Instagram, YouTube, and Twitter have transformed the way young people communicate, learn, and perceive the world. While these platforms offer undeniable advantages, their impact on youth is a subject of growing concern. This essay will examine both sides before presenting a balanced conclusion.' },
      { part: 'Body 1 — Positive Impact', content: 'On the positive side, social media has democratized information and given young people a global voice. Activists like Greta Thunberg used social media to start a worldwide environmental movement before the age of 20. Additionally, platforms like YouTube and LinkedIn have enabled young entrepreneurs and creators to build sustainable careers without traditional gatekeepers.' },
      { part: 'Body 2 — Negative Impact', content: 'Conversely, social media\'s negative effects on mental health are well-documented. Research by the Royal Society for Public Health found that Instagram is the most harmful social media platform for young people\'s mental health, contributing to anxiety, depression, and poor body image. Cyberbullying affects one in three young people globally, with devastating consequences.' },
      { part: 'Counter + Refute', content: 'Proponents claim that restricting social media infringes on freedom of expression. However, promoting digital literacy and mental health awareness does not mean restriction — it means equipping young users with the tools to navigate the digital world safely and responsibly.' },
      { part: 'Conclusion', content: 'To summarize, social media is a powerful but double-edged tool. The key lies in balance, critical thinking, and digital wellbeing education. With proper guidance, social media can be a force for good in the lives of young people rather than a source of harm.' },
    ],
  },
];

const ESSAY_TRANSITIONS = [
  { category: 'Adding Ideas', words: ['Furthermore', 'Moreover', 'In addition', 'Additionally', 'Also'] },
  { category: 'Contrasting', words: ['However', 'Nevertheless', 'On the other hand', 'In contrast', 'Despite this'] },
  { category: 'Concluding', words: ['To conclude', 'In summary', 'Therefore', 'As a result', 'In short'] },
  { category: 'Exemplifying', words: ['For example', 'For instance', 'Such as', 'Specifically', 'To illustrate'] },
  { category: 'Cause/Effect', words: ['Consequently', 'Hence', 'Thus', 'This leads to', 'As a result'] },
];

// ── Resume Tips ─────────────────────────────────────────────
const RESUME_DOS_DONTS = [
  { good: "Increased sales by 25% in Q3 2024 through targeted outreach", bad: "Did sales work and helped the team" },
  { good: "Managed a team of 8 developers, delivering project 2 weeks ahead of schedule", bad: "Was part of a development team" },
  { good: "B.Tech CSE — 8.5 CGPA, IIT Delhi, 2019", bad: "B.Tech from a good college" },
  { good: "Proficient in Python, SQL, Tableau, and Advanced Excel", bad: "Good with computers and technology" },
  { good: "Reduced customer complaints by 40% by implementing new SLA process", bad: "Handled customer complaints" },
  { good: "Launched mobile app that acquired 50,000 users in first 3 months", bad: "Worked on a mobile app project" },
  { good: "2-page maximum, clean font (11–12pt), consistent spacing", bad: "4-page resume with 8 different fonts" },
  { good: "Customized for each job with relevant keywords from JD", bad: "Same resume sent to 200 companies" },
];

const POWER_VERBS = [
  { category: 'Leadership', verbs: ['Directed', 'Led', 'Managed', 'Spearheaded', 'Orchestrated', 'Supervised', 'Guided', 'Mentored'] },
  { category: 'Achievement', verbs: ['Achieved', 'Exceeded', 'Delivered', 'Boosted', 'Generated', 'Surpassed', 'Maximized', 'Accelerated'] },
  { category: 'Creation', verbs: ['Developed', 'Designed', 'Built', 'Created', 'Launched', 'Pioneered', 'Engineered', 'Established'] },
  { category: 'Analysis', verbs: ['Analyzed', 'Evaluated', 'Identified', 'Assessed', 'Researched', 'Diagnosed', 'Investigated', 'Optimized'] },
  { category: 'Communication', verbs: ['Presented', 'Negotiated', 'Collaborated', 'Coordinated', 'Facilitated', 'Proposed', 'Trained', 'Advised'] },
];

const RESUME_STRUCTURE = [
  { section: 'Header', content: 'Full Name (largest font), Phone, Professional Email, LinkedIn URL, City', icon: '👤' },
  { section: 'Professional Summary', content: '3–4 lines summarizing your experience, key skills, and value proposition. No "I" — start with adjective or role.', icon: '📋' },
  { section: 'Work Experience', content: 'Reverse chronological. Company | Role | Dates. 3–5 bullet points per role. Start each with an action verb. Include numbers.', icon: '💼' },
  { section: 'Education', content: 'Degree, Institution, Year, CGPA/Percentage. Include relevant coursework only if fresher.', icon: '🎓' },
  { section: 'Skills', content: 'Technical: Python, SQL, MS Office. Soft skills: Leadership, Communication. Tools: Figma, JIRA, Salesforce', icon: '🛠️' },
  { section: 'Certifications', content: 'Course Name, Platform, Year. E.g., Google Data Analytics — Coursera, 2023', icon: '🏅' },
  { section: 'Projects (Optional)', content: 'Project Name: one-line description, technology used, outcome/link. Essential for freshers.', icon: '🚀' },
];

// ── Application Writing ─────────────────────────────────────
const APPLICATION_TEMPLATES = [
  {
    title: 'College Admission Application',
    body: `[Date]

The Admissions Committee,
[College/University Name]
[Address]

Subject: Application for Admission to [Program Name] — Academic Year [Year]

Respected Members of the Admissions Committee,

I am writing to apply for admission to the [Program Name] program at [College Name] for the academic year [Year].

I have completed my [Previous Qualification] from [Institution] with [marks/percentage/CGPA]. I am passionate about [subject/field] because [specific reason]. During my [previous education/work], I have [relevant achievement or experience].

I am particularly drawn to [College Name] because of [specific programs, faculty, labs, or reputation]. I believe the curriculum at [College Name] aligns perfectly with my academic and career goals.

I have attached the following documents:
• [Document 1]
• [Document 2]
• [Academic transcripts]

I look forward to the opportunity to contribute to and learn from the [College Name] community.

Thanking you,
Yours sincerely,
[Your Name]
[Contact Information]`,
    tips: ['Research the college — mention specific programs or faculty', 'Connect your background to your future goals', 'Keep it under 350 words'],
  },
  {
    title: 'Scholarship Application',
    body: `[Date]

The Scholarship Committee,
[Organization/College Name]
[Address]

Subject: Application for [Scholarship Name]

Respected Sir/Madam,

I am writing to apply for the [Scholarship Name] offered by [Organization]. I am a [Year] student of [Program] at [College], with a CGPA/percentage of [marks].

I come from a [mention background — middle class/rural/first-generation student], and this scholarship would significantly support my higher education goals. Despite [any challenges — financial constraints, family circumstances], I have maintained [achievement — rank, grades, extracurriculars].

My academic and professional goals are [briefly describe]. I plan to use this scholarship to [specific use — complete fees, buy books, attend conference].

I assure you that I will represent [Organization] with integrity and will work to give back to the community through [how you plan to contribute].

I have enclosed the required documents for your review.

Thanking you,
Yours faithfully,
[Your Name]
[Contact]`,
    tips: ['Be genuine and specific about your need and goals', 'Mention academic achievements with numbers', 'Explain what you will do AFTER receiving scholarship'],
  },
];

// ── Story Writing ────────────────────────────────────────────
const STORY_GUIDES = {
  structure: [
    { step: '1. Setting the Scene', tip: 'Where? When? Who? — Introduce characters and location in first 2 sentences.', example: '"It was a stormy Monday morning when Aryan realized he had forgotten his presentation at home."' },
    { step: '2. The Problem / Conflict', tip: 'Every good story has a problem. Make it relatable and clear.', example: '"With 30 minutes until the board meeting, his phone battery was at 2% and the next bus was 20 minutes away."' },
    { step: '3. Rising Action', tip: 'Show the character trying to solve the problem. Add details and emotions.', example: '"Aryan sprinted to the rickshaw stand, negotiated frantically, and called his colleague to buy him time."' },
    { step: '4. Climax', tip: 'The most exciting moment — where everything is at its peak tension.', example: '"He burst into the boardroom, laptop in hand, just as his manager said: \'I suppose we\'ll have to reschedule.\'"' },
    { step: '5. Resolution', tip: 'How does it end? What did the character learn?', example: '"Aryan delivered his presentation to a standing ovation. That evening, he set three phone reminders for every important meeting."' },
  ],
  tips: [
    'Show, don\'t tell — "Her hands trembled" is better than "She was nervous"',
    'Use dialogue to make stories come alive',
    'Start with action, not background — hook the reader in line 1',
    'Use simple past tense for most of the story',
    'End with a twist, lesson, or emotional punch',
  ],
  prompts: [
    'Write about a time when you were lost in an unfamiliar city.',
    'A stranger on a train gives you an important piece of advice.',
    'You find a wallet full of cash. What do you do?',
    'Your first day at a new job — something unexpected happens.',
    'Write a story that starts with: "Nobody believed her, but she was right all along."',
  ],
};

// ── Word Count hook ──────────────────────────────────────────
function useWordCount(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  return { words, chars };
}

// ── CopyButton ───────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded-lg bg-white/5 border border-white/8">
      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ── Writing Practice Area ────────────────────────────────────
function PracticeArea({ placeholder = 'Write your practice text here...' }) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const { words, chars } = useWordCount(text);

  const handleSave = () => {
    try {
      const notes = JSON.parse(localStorage.getItem('writing-notes') || '[]');
      notes.push({ text, savedAt: new Date().toISOString(), words });
      localStorage.setItem('writing-notes', JSON.stringify(notes.slice(-20)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-4 space-y-2">
      <textarea
        rows={6}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full input text-sm resize-none leading-relaxed"
      />
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{words} words · {chars} characters</span>
        <div className="flex gap-2">
          {text && <button onClick={() => setText('')} className="text-slate-600 hover:text-slate-400 transition-colors">Clear</button>}
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saved ? <><Check size={11} className="text-green-400" /> Saved!</> : <><Star size={11} /> Save to Notes</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TABS CONTENT ─────────────────────────────────────────────

function EmailTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-5">
      {/* Theory */}
      <div className="card p-5 border-blue-500/20 bg-blue-500/5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Mail size={16} className="text-blue-400" /> Email Writing — Key Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Subject Line', tip: 'Specific and concise — tell them exactly what the email is about in 6–8 words.' },
            { label: 'Opening', tip: 'Start with purpose: "I am writing to..." Never start with "I want..." in formal emails.' },
            { label: 'Body', tip: 'One idea per paragraph. Keep total email under 200 words unless detail is needed.' },
            { label: 'Closing', tip: 'Formal: "Yours sincerely/faithfully". Professional: "Best regards". Informal: "Cheers/Thanks".' },
          ].map(({ label, tip }) => (
            <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/8">
              <p className="text-blue-300 font-semibold text-xs mb-1">{label}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="card p-4 border-rose-500/15 bg-rose-500/5">
        <h4 className="font-semibold text-white mb-3 text-sm flex items-center gap-2"><AlertTriangle size={14} className="text-rose-400" /> Common Email Mistakes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'Using "Respected Sir" in casual/modern emails',
            'Subject: "Hi" or "Regarding" (too vague)',
            'Starting with "I hope you are fine" always',
            '"Please do the needful" — very outdated',
            'No greeting or closing salutation',
            '"Revert back to me" — "revert" already means reply',
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-rose-400 shrink-0 mt-0.5">✗</span> {m}
            </div>
          ))}
        </div>
      </div>

      {/* Templates */}
      {selected ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">{selected.title}</h3>
            <button onClick={() => setSelected(null)} className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5 transition-colors">← Back</button>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Subject Line</label>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-slate-300 flex items-center justify-between gap-3">
              <span>{selected.subject}</span>
              <CopyButton text={selected.subject} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Body</label>
              <CopyButton text={selected.body} />
            </div>
            <pre className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{selected.body}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">✅ Pro Tips</p>
              {selected.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400 mb-1.5">
                  <CheckCircle2 size={12} className="text-green-400 shrink-0 mt-0.5" /> {tip}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">❌ Avoid These</p>
              {selected.mistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400 mb-1.5">
                  <AlertTriangle size={12} className="text-rose-400 shrink-0 mt-0.5" /> {m}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">✏️ Practice: Customize this template</p>
            <PracticeArea placeholder={`Customize the "${selected.title}" — fill in all the [brackets] with real information...`} />
          </div>
        </motion.div>
      ) : (
        <div>
          <h3 className="font-semibold text-white mb-3">10 Email Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMAIL_TEMPLATES.map((t) => (
              <motion.button key={t.id} onClick={() => setSelected(t)} whileHover={{ y: -2 }} className="card p-4 text-left group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/25">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <p className="font-semibold text-white text-sm">{t.title}</p>
                </div>
                <p className="text-xs text-slate-500 mb-2 truncate">Subject: {t.subject}</p>
                <span className="text-xs text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">View Template <ChevronRight size={11} /></span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LetterTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-5">
      {/* Formal Letter Format */}
      <div className="card p-5 border-emerald-500/20 bg-emerald-500/5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><FileText size={16} className="text-emerald-400" /> Standard Formal Letter Format</h3>
        <div className="space-y-1 text-sm font-mono text-slate-400">
          {[
            { label: '[Your Name & Address]', note: 'Top left' },
            { label: '[Date]', note: '' },
            { label: '', note: '' },
            { label: "[Recipient's Name & Designation]", note: 'Top left' },
            { label: '[Organization & Address]', note: '' },
            { label: '', note: '' },
            { label: 'Subject: [Clear one-line subject]', note: 'Underlined or bold' },
            { label: '', note: '' },
            { label: 'Dear Sir/Madam,', note: 'Or name if known' },
            { label: '', note: '' },
            { label: '[Opening para — state purpose]', note: '' },
            { label: '[Body para — details, facts]', note: '' },
            { label: '[Closing para — request/action]', note: '' },
            { label: '', note: '' },
            { label: 'Yours faithfully/sincerely,', note: 'faithfully = unknown, sincerely = known' },
            { label: '[Signature]', note: '' },
            { label: '[Printed Name & Designation]', note: '' },
          ].map(({ label, note }, i) => label ? (
            <div key={i} className="flex gap-3">
              <span className="text-slate-300">{label}</span>
              {note && <span className="text-slate-600 text-xs self-center">← {note}</span>}
            </div>
          ) : <div key={i} className="h-2" />)}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="card p-4 border-rose-500/15 bg-rose-500/5">
        <h4 className="font-semibold text-white mb-2 text-sm flex items-center gap-2"><AlertTriangle size={14} className="text-rose-400" /> Common Letter Writing Mistakes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Not writing subject line', 'Using "Respected" for modern business letters', '"Your obediently" for adults (use "sincerely")', 'No date or wrong date format', 'Long paragraphs without breaks', 'Missing reference numbers when replying'].map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-400"><span className="text-rose-400 shrink-0">✗</span> {m}</div>
          ))}
        </div>
      </div>

      {/* Templates */}
      {selected ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">{selected.title}</h3>
            <button onClick={() => setSelected(null)} className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5">← Back</button>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Letter Template</label>
            <CopyButton text={selected.body} />
          </div>
          <pre className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{selected.body}</pre>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">✅ Tips</p>
            {selected.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-400 mb-1.5">
                <CheckCircle2 size={12} className="text-green-400 shrink-0 mt-0.5" /> {tip}
              </div>
            ))}
          </div>
          <PracticeArea placeholder="Write your own version of this letter here..." />
        </motion.div>
      ) : (
        <div>
          <h3 className="font-semibold text-white mb-3">5 Sample Letters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {LETTER_TEMPLATES.map((t) => (
              <motion.button key={t.id} onClick={() => setSelected(t)} whileHover={{ y: -2 }} className="card p-4 text-left group hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                    <FileText size={16} className="text-emerald-400" />
                  </div>
                  <p className="font-semibold text-white text-sm">{t.title}</p>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">View Letter <ChevronRight size={11} /></span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EssayTab() {
  const [selectedEssay, setSelectedEssay] = useState(null);

  return (
    <div className="space-y-5">
      {/* 5-paragraph structure */}
      <div className="card p-5 border-purple-500/20 bg-purple-500/5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BookOpen size={16} className="text-purple-400" /> 5-Paragraph Essay Structure</h3>
        <div className="space-y-3">
          {[
            { part: '① Introduction (60–80 words)', tips: ['Hook sentence — surprising fact, quote, or question', 'Brief background on topic', 'Thesis statement — your clear opinion/argument'] },
            { part: '② Body Paragraph 1 (80–100 words)', tips: ['Topic sentence — main point of this paragraph', 'Evidence or example to support it', 'Explanation of why it matters', 'Link to next paragraph'] },
            { part: '③ Body Paragraph 2 (80–100 words)', tips: ['Second main point', 'Statistics, examples, or real-life evidence', 'Analysis and explanation'] },
            { part: '④ Counter-Argument (50–70 words)', tips: ['Acknowledge the opposing view', 'Immediately refute it with logic', 'Shows maturity and depth of argument'] },
            { part: '⑤ Conclusion (50–70 words)', tips: ['Restate your thesis (in different words)', 'Briefly summarize key points', 'Ending thought — call to action or future view'] },
          ].map(({ part, tips }, i) => (
            <div key={i} className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-xs">{i + 1}</div>
                {i < 4 && <div className="w-px h-4 bg-white/5 my-1" />}
              </div>
              <div className="flex-1 pb-2">
                <p className="font-semibold text-white text-sm mb-1">{part}</p>
                <ul className="space-y-0.5">
                  {tips.map((t, j) => <li key={j} className="text-xs text-slate-400">• {t}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transition words */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-3">Transition Words Toolkit</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ESSAY_TRANSITIONS.map(({ category, words }) => (
            <div key={category}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</p>
              {words.map(w => <div key={w} className="text-xs text-slate-400 py-1 border-b border-white/5 last:border-0">{w}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Sample essays */}
      {selectedEssay ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white">{selectedEssay.topic}</h3>
              <span className="text-xs text-purple-400">CEFR Level: {selectedEssay.level}</span>
            </div>
            <button onClick={() => setSelectedEssay(null)} className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5">← Back</button>
          </div>
          {selectedEssay.structure.map(({ part, content }, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">{part}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{content}</p>
            </div>
          ))}
          <PracticeArea placeholder="Write your own essay on this topic or a similar one..." />
        </motion.div>
      ) : (
        <div>
          <h3 className="font-semibold text-white mb-3">3 Sample Essays</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ESSAY_SAMPLES.map((e) => (
              <motion.button key={e.topic} onClick={() => setSelectedEssay(e)} whileHover={{ y: -2 }} className="card p-4 text-left group hover:border-purple-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3">
                  <BookOpen size={16} className="text-purple-400" />
                </div>
                <p className="font-semibold text-white text-sm mb-1">{e.topic}</p>
                <p className="text-xs text-slate-500 mb-2">Level: {e.level}</p>
                <span className="text-xs text-purple-400 flex items-center gap-1">Read Essay <ChevronRight size={11} /></span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResumeTab() {
  return (
    <div className="space-y-5">
      {/* Resume structure */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Briefcase size={16} className="text-amber-400" /> Resume Sections — Complete Structure</h3>
        <div className="space-y-3">
          {RESUME_STRUCTURE.map(({ section, content, icon }, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-white text-sm mb-0.5">{section}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">Do's & Don'ts — Side by Side</h3>
        <div className="space-y-3">
          {RESUME_DOS_DONTS.map(({ good, bad }, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                <p className="text-xs text-green-300 leading-relaxed">{good}</p>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">{bad}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Power verbs */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">💥 Power Action Verbs for Resume</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {POWER_VERBS.map(({ category, verbs }) => (
            <div key={category}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</p>
              {verbs.map(v => (
                <div key={v} className="text-xs text-slate-400 py-1 border-b border-white/5 last:border-0">{v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Professional summary practice */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-2">✏️ Practice: Write Your Professional Summary</h3>
        <p className="text-xs text-slate-500 mb-3">3–4 lines. No "I". Start with role or key adjective. Include years of experience and 2 key skills.</p>
        <p className="text-xs text-amber-400/80 mb-3">Example: "Results-driven Software Engineer with 4+ years of experience in full-stack development. Proven track record of delivering scalable web applications. Expertise in React, Node.js, and cloud architecture."</p>
        <PracticeArea placeholder="Write your own professional summary here (3-4 lines, no 'I')..." />
      </div>
    </div>
  );
}

function ApplicationTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-5">
      <div className="card p-5 border-cyan-500/20 bg-cyan-500/5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Hash size={16} className="text-cyan-400" /> Application Writing — Key Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {[
            { label: 'Be Specific', tip: 'State exactly what you are applying for — program name, position, reference number.' },
            { label: 'Show Fit', tip: 'Explain why YOU are right for THEM — connect your background to their requirements.' },
            { label: 'Attach Documents', tip: 'List all documents at the end. Never say "attached" without actually attaching.' },
            { label: 'Proofread', tip: 'A single spelling mistake in a formal application can lead to rejection. Read 3 times.' },
          ].map(({ label, tip }) => (
            <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/8">
              <p className="text-cyan-300 font-semibold mb-1">{label}</p>
              <p className="text-slate-400 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {selected ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">{selected.title}</h3>
            <button onClick={() => setSelected(null)} className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5">← Back</button>
          </div>
          <div className="flex items-center justify-between mb-1"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Template</label><CopyButton text={selected.body} /></div>
          <pre className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{selected.body}</pre>
          <div>
            {selected.tips.map((t, i) => <div key={i} className="flex items-start gap-2 text-xs text-slate-400 mb-1.5"><CheckCircle2 size={12} className="text-green-400 shrink-0 mt-0.5" /> {t}</div>)}
          </div>
          <PracticeArea placeholder="Write your own application using this template..." />
        </motion.div>
      ) : (
        <div>
          <h3 className="font-semibold text-white mb-3">Application Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {APPLICATION_TEMPLATES.map((t) => (
              <motion.button key={t.title} onClick={() => setSelected(t)} whileHover={{ y: -2 }} className="card p-4 text-left group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/25">
                    <FileText size={16} className="text-cyan-400" />
                  </div>
                  <p className="font-semibold text-white text-sm">{t.title}</p>
                </div>
                <span className="text-xs text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">View Template <ChevronRight size={11} /></span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StoryTab() {
  return (
    <div className="space-y-5">
      <div className="card p-5 border-rose-500/20 bg-rose-500/5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><PenTool size={16} className="text-rose-400" /> 5-Step Story Structure</h3>
        <div className="space-y-4">
          {STORY_GUIDES.structure.map(({ step, tip, example }, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6">
              <p className="font-semibold text-white text-sm mb-1">{step}</p>
              <p className="text-xs text-slate-400 mb-2">{tip}</p>
              <p className="text-xs text-rose-300/80 italic border-l-2 border-rose-500/30 pl-3">{example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Tips */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-3">Story Writing Tips</h3>
        <div className="space-y-2">
          {STORY_GUIDES.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <Star size={12} className="text-amber-400 shrink-0 mt-1" /> {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Writing Prompts */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-3">✍️ Story Writing Prompts</h3>
        <div className="space-y-3">
          {STORY_GUIDES.prompts.map((prompt, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/6">
              <p className="text-xs font-semibold text-slate-500 mb-1">Prompt {i + 1}</p>
              <p className="text-sm text-slate-300">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practice */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-2">✏️ Write Your Story</h3>
        <p className="text-xs text-slate-500 mb-3">Choose any prompt above. Aim for 150–250 words. Use all 5 story steps.</p>
        <PracticeArea placeholder="Write your story here (150–250 words). Use past tense. Start with action or intrigue!" />
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function WritingLabPage() {
  const [activeTab, setActiveTab] = useState('email');

  const TAB_CONTENT = {
    email:       <EmailTab />,
    letter:      <LetterTab />,
    essay:       <EssayTab />,
    resume:      <ResumeTab />,
    application: <ApplicationTab />,
    story:       <StoryTab />,
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-rose-600/20 via-pink-600/15 to-orange-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg"
              >
                <PenTool size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Writing Lab</h1>
                <p className="text-sm text-rose-300 font-medium">Professional writing — har situation ke liye</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Emails, letters, essays, resumes, applications, stories — real templates + practice areas.
              Confidence se likho koi bhi professional document.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-rose-300">62+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Templates</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-pink-300">6</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Modules</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/8 pb-0">
        {TABS.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === id
                ? 'border-primary-500 text-primary-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {TAB_CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
