'use client';
// Listening Lab — Complete listening practice hub
// Tabs: Conversations | Pronunciation | Dictation | Speed Training

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, Play, Pause, Volume2, ChevronDown, ChevronUp,
  Mic, PenTool, Zap, BookOpen, Eye, EyeOff, Clock,
  CheckCircle2, Star, ArrowRight, RotateCcw,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// ── TABS ──────────────────────────────────────────────────────
const TABS = [
  { id: 'conversations', label: 'Conversations', emoji: '💬' },
  { id: 'pronunciation', label: 'Pronunciation', emoji: '🗣️' },
  { id: 'dictation',     label: 'Dictation',     emoji: '✍️' },
  { id: 'speed',         label: 'Speed Training', emoji: '⚡' },
];

// ── 10 DIALOGUES ──────────────────────────────────────────────
const DIALOGUES = [
  {
    id: 1, title: 'First Day at Office',
    difficulty: 'A1', topic: 'Workplace',
    context: 'Rahul is joining a new company. The HR manager is introducing him to the team.',
    lines: [
      { speaker: 'HR Manager (Sarah)', text: 'Good morning, Rahul! Welcome to TechVision. I\'m Sarah from HR.', hindi: 'सुप्रभात, राहुल! TechVision में आपका स्वागत है। मैं HR से सारा हूँ।' },
      { speaker: 'Rahul', text: 'Good morning, Sarah! Thank you so much. I\'m really excited to be here.', hindi: 'सुप्रभात, सारा! बहुत शुक्रिया। मैं यहाँ होकर वाकई बहुत खुश हूँ।' },
      { speaker: 'Sarah', text: 'Let me introduce you to the team. This is Priya — she\'s your team lead.', hindi: 'मैं आपको टीम से मिलवाती हूँ। यह प्रिया हैं — ये आपकी टीम लीड हैं।' },
      { speaker: 'Priya', text: 'Hi Rahul! Great to have you. We\'ve been looking forward to this.', hindi: 'नमस्ते राहुल! आपका होना अच्छा लगा। हम आपका इंतज़ार कर रहे थे।' },
      { speaker: 'Rahul', text: 'Nice to meet you, Priya. I\'m eager to get started and learn from the team.', hindi: 'आपसे मिलकर अच्छा लगा, प्रिया। मैं शुरू करने के लिए उत्सुक हूँ।' },
      { speaker: 'Sarah', text: 'Your workstation is set up. I\'ll send you the onboarding checklist by noon.', hindi: 'आपका वर्कस्टेशन तैयार है। मैं दोपहर तक आपको onboarding checklist भेज दूँगी।' },
    ],
  },
  {
    id: 2, title: 'Job Interview',
    difficulty: 'B1', topic: 'Career',
    context: 'Anita is being interviewed for a Marketing Manager position.',
    lines: [
      { speaker: 'Interviewer', text: 'Please tell me about yourself and your experience.', hindi: 'कृपया अपने बारे में और अपने अनुभव के बारे में बताएं।' },
      { speaker: 'Anita', text: 'I\'m Anita Sharma. I have 5 years of experience in digital marketing, mainly in SEO and content strategy.', hindi: 'मैं अनिता शर्मा हूँ। मुझे digital marketing में 5 साल का अनुभव है, मुख्यतः SEO और content strategy में।' },
      { speaker: 'Interviewer', text: 'What would you say is your greatest professional achievement so far?', hindi: 'आप अब तक की अपनी सबसे बड़ी professional उपलब्धि क्या मानती हैं?' },
      { speaker: 'Anita', text: 'At my last company, I led a campaign that increased organic traffic by 180% in six months.', hindi: 'मेरी पिछली कंपनी में, मैंने एक campaign lead किया जिसने 6 महीनों में organic traffic 180% बढ़ाया।' },
      { speaker: 'Interviewer', text: 'Excellent. Why are you interested in joining our company specifically?', hindi: 'बेहतरीन। आप specifically हमारी कंपनी में क्यों जुड़ना चाहती हैं?' },
      { speaker: 'Anita', text: 'I admire your focus on sustainable products and I believe my skills in content marketing align with your brand values.', hindi: 'मैं आपके sustainable products पर focus की सराहना करती हूँ और मेरा content marketing में skill आपके brand values से मेल खाता है।' },
    ],
  },
  {
    id: 3, title: 'Phone Call to Customer Service',
    difficulty: 'A2', topic: 'Daily Life',
    context: 'Vikram is calling his bank to report a problem with his debit card.',
    lines: [
      { speaker: 'Bank Agent', text: 'Thank you for calling ABC Bank. How may I assist you today?', hindi: 'ABC Bank को call करने के लिए शुक्रिया। मैं आज आपकी कैसे मदद कर सकती हूँ?' },
      { speaker: 'Vikram', text: 'Hi, I\'d like to report that my debit card has been blocked. I don\'t know why.', hindi: 'नमस्ते, मैं बताना चाहता हूँ कि मेरा debit card block हो गया है। मुझे नहीं पता क्यों।' },
      { speaker: 'Bank Agent', text: 'I\'m sorry to hear that. Could you please verify your account number and date of birth?', hindi: 'यह सुनकर दुख हुआ। क्या आप अपना account number और date of birth verify कर सकते हैं?' },
      { speaker: 'Vikram', text: 'Sure. My account number is 7842 and date of birth is 15th March 1990.', hindi: 'ज़रूर। मेरा account number 7842 है और date of birth 15 मार्च 1990 है।' },
      { speaker: 'Bank Agent', text: 'Thank you. I can see your card was blocked after 3 failed PIN attempts. Shall I unblock it?', hindi: 'शुक्रिया। मैं देख सकती हूँ कि 3 बार गलत PIN डालने के बाद card block हुआ। क्या मैं इसे unblock करूँ?' },
      { speaker: 'Vikram', text: 'Yes, please. And can you also send me the steps to reset my PIN?', hindi: 'हाँ, please। और क्या आप मुझे PIN reset करने के steps भी भेज सकती हैं?' },
    ],
  },
  {
    id: 4, title: 'At the Restaurant',
    difficulty: 'A1', topic: 'Food & Dining',
    context: 'Meera and Suresh are having dinner at a restaurant. The waiter comes to take their order.',
    lines: [
      { speaker: 'Waiter', text: 'Good evening! Are you ready to order, or would you like a few more minutes?', hindi: 'शुभ संध्या! क्या आप order करने के लिए तैयार हैं, या कुछ और मिनट चाहिए?' },
      { speaker: 'Meera', text: 'We\'re ready, thank you. I\'ll have the grilled chicken with a side salad.', hindi: 'हम तैयार हैं, शुक्रिया। मैं grilled chicken और side salad लूँगी।' },
      { speaker: 'Suresh', text: 'And I\'d like the pasta, please. Can I ask — is it very spicy?', hindi: 'और मुझे pasta चाहिए। क्या मैं पूछ सकता हूँ — क्या यह बहुत spicy है?' },
      { speaker: 'Waiter', text: 'It\'s mildly spiced, but we can adjust it to your preference. Less spicy?', hindi: 'यह हल्का spiced है, लेकिन हम इसे आपकी पसंद के अनुसार adjust कर सकते हैं। कम spicy?' },
      { speaker: 'Suresh', text: 'Yes, please. And two glasses of water as well.', hindi: 'हाँ, please। और दो गिलास पानी भी।' },
      { speaker: 'Waiter', text: 'Of course. Your order will be ready in about 15 minutes. Enjoy your evening!', hindi: 'बिल्कुल। आपका order लगभग 15 मिनट में तैयार होगा। अपनी शाम का आनंद लें!' },
    ],
  },
  {
    id: 5, title: 'Airport Check-In',
    difficulty: 'A2', topic: 'Travel',
    context: 'Deepak is checking in at the airport for a flight to London.',
    lines: [
      { speaker: 'Check-in Agent', text: 'Good morning. May I have your passport and booking reference, please?', hindi: 'सुप्रभात। क्या मैं आपका passport और booking reference देख सकती हूँ?' },
      { speaker: 'Deepak', text: 'Here you go. And I have one checked bag and this cabin bag.', hindi: 'लीजिए। और मेरे पास एक checked bag और यह cabin bag है।' },
      { speaker: 'Agent', text: 'Would you prefer a window or aisle seat?', hindi: 'क्या आप window seat पसंद करेंगे या aisle seat?' },
      { speaker: 'Deepak', text: 'Window, please. Also, I have a vegetarian meal request — is that noted?', hindi: 'Window please। साथ ही, मेरा vegetarian meal request था — क्या वो note हुआ है?' },
      { speaker: 'Agent', text: 'Yes, it\'s all confirmed. Your bag is 22kg — just 2kg over the limit. You\'ll need to pay a small fee.', hindi: 'हाँ, सब confirm है। आपका bag 22kg है — limit से सिर्फ 2kg ज़्यादा। आपको एक छोटी fee देनी होगी।' },
      { speaker: 'Deepak', text: 'That\'s fine. And which gate is it please?', hindi: 'ठीक है। और कृपया gate number क्या है?' },
    ],
  },
  {
    id: 6, title: 'Doctor Consultation',
    difficulty: 'A2', topic: 'Health',
    context: 'Pooja visits the doctor after feeling unwell for two days.',
    lines: [
      { speaker: 'Doctor', text: 'Hello, what seems to be the problem today?', hindi: 'नमस्ते, आज क्या तकलीफ है?' },
      { speaker: 'Pooja', text: 'I\'ve had a fever since yesterday and a bad headache. I also feel very tired.', hindi: 'कल से बुखार है और तेज़ सिरदर्द हो रहा है। बहुत थकान भी महसूस हो रही है।' },
      { speaker: 'Doctor', text: 'Have you been eating properly? Any vomiting or loose motions?', hindi: 'क्या आप ठीक से खाना खा रही थीं? कोई उल्टी या दस्त तो नहीं?' },
      { speaker: 'Pooja', text: 'No vomiting, but I haven\'t had much appetite. I\'ve been eating very little.', hindi: 'उल्टी नहीं, लेकिन ज़्यादा भूख नहीं लगी। बहुत कम खाया है।' },
      { speaker: 'Doctor', text: 'Your temperature is 101°F. Looks like viral fever. I\'m prescribing paracetamol and a vitamin supplement.', hindi: 'आपका temperature 101°F है। लगता है viral fever है। मैं paracetamol और vitamin supplement दे रहा हूँ।' },
      { speaker: 'Pooja', text: 'Should I take complete rest? I have an important meeting tomorrow.', hindi: 'क्या मुझे पूरा आराम करना चाहिए? कल मेरी एक महत्वपूर्ण meeting है।' },
    ],
  },
  {
    id: 7, title: 'Office Meeting — Project Update',
    difficulty: 'B1', topic: 'Professional',
    context: 'A weekly project status meeting between a manager and team members.',
    lines: [
      { speaker: 'Manager (Rohit)', text: 'Let\'s start. Can someone give me a quick update on the mobile app project?', hindi: 'शुरू करते हैं। क्या कोई मुझे mobile app project का quick update दे सकता है?' },
      { speaker: 'Dev Lead (Kavya)', text: 'Sure. We\'ve completed 70% of the backend. The API integration is on track for Friday.', hindi: 'ज़रूर। हमने backend का 70% complete कर लिया है। API integration शुक्रवार तक on track है।' },
      { speaker: 'Rohit', text: 'Good. Any blockers or risks I should be aware of?', hindi: 'अच्छा। कोई blocker या risk है जो मुझे पता होनी चाहिए?' },
      { speaker: 'Kavya', text: 'The third-party payment gateway is taking longer than expected. We may need one extra day.', hindi: 'Third-party payment gateway में उम्मीद से ज़्यादा वक्त लग रहा है। हमें एक extra दिन चाहिए हो सकता है।' },
      { speaker: 'Rohit', text: 'Understood. Please raise it formally in Jira and flag it to the client proactively.', hindi: 'समझ गया। कृपया इसे Jira में formally raise करें और client को proactively बताएं।' },
      { speaker: 'Kavya', text: 'Will do. I\'ll send them an update by end of day.', hindi: 'ज़रूर करूँगी। मैं उन्हें आज शाम तक update भेजूँगी।' },
    ],
  },
  {
    id: 8, title: 'Shopping for Clothes',
    difficulty: 'A1', topic: 'Shopping',
    context: 'Neha is shopping for formal wear at a clothing store.',
    lines: [
      { speaker: 'Sales Assistant', text: 'Hi! Can I help you find something today?', hindi: 'नमस्ते! क्या मैं आज आपकी कुछ खोजने में मदद कर सकता हूँ?' },
      { speaker: 'Neha', text: 'Yes, I\'m looking for a formal blazer for office. Something not too heavy.', hindi: 'हाँ, मैं ऑफिस के लिए एक formal blazer ढूंढ रही हूँ। कुछ ज़्यादा heavy नहीं।' },
      { speaker: 'Assistant', text: 'What size are you? And do you have a colour preference?', hindi: 'आपका size क्या है? और क्या कोई रंग preference है?' },
      { speaker: 'Neha', text: 'Medium. I\'d prefer navy blue or black — something versatile.', hindi: 'Medium। मुझे navy blue या black पसंद होगा — कुछ versatile।' },
      { speaker: 'Assistant', text: 'Perfect. We have a nice cotton-blend blazer on sale — 30% off today only.', hindi: 'बढ़िया। हमारे पास एक अच्छा cotton-blend blazer sale पर है — आज सिर्फ 30% off।' },
      { speaker: 'Neha', text: 'That sounds good. Can I try it on? And is there a return policy?', hindi: 'यह अच्छा लगता है। क्या मैं इसे try कर सकती हूँ? और return policy क्या है?' },
    ],
  },
  {
    id: 9, title: 'Giving Directions',
    difficulty: 'A2', topic: 'Navigation',
    context: 'A tourist asks a local for directions to the nearest metro station.',
    lines: [
      { speaker: 'Tourist', text: 'Excuse me, could you tell me how to get to the nearest metro station?', hindi: 'माफ़ कीजिए, क्या आप मुझे बता सकते हैं कि निकटतम metro station कैसे जाएँ?' },
      { speaker: 'Local (Arjun)', text: 'Sure! Go straight down this road for about 200 metres.', hindi: 'ज़रूर! इस सड़क पर सीधे लगभग 200 मीटर जाइए।' },
      { speaker: 'Tourist', text: 'Straight for 200 metres. Then what?', hindi: '200 मीटर सीधे। फिर?' },
      { speaker: 'Arjun', text: 'Then turn left at the traffic light. You\'ll see a large green sign for the metro.', hindi: 'फिर traffic light पर बाईं ओर मुड़िए। आपको metro का एक बड़ा हरा sign दिखेगा।' },
      { speaker: 'Tourist', text: 'How far is it from the traffic light? Is it walkable?', hindi: 'traffic light से कितनी दूर है? क्या पैदल जाया जा सकता है?' },
      { speaker: 'Arjun', text: 'It\'s just 2 minutes from there. You can\'t miss it — it\'s right next to a McDonald\'s.', hindi: 'वहाँ से सिर्फ 2 मिनट है। आप miss नहीं कर सकते — यह एक McDonald\'s के बगल में है।' },
    ],
  },
  {
    id: 10, title: 'Negotiating a Salary',
    difficulty: 'B2', topic: 'Professional',
    context: 'Sana has received a job offer and is negotiating salary with the HR manager.',
    lines: [
      { speaker: 'HR (Vikram)', text: 'We\'d like to offer you the position. The package is ₹8 LPA with standard benefits.', hindi: 'हम आपको यह position offer करना चाहते हैं। Package ₹8 LPA है standard benefits के साथ।' },
      { speaker: 'Sana', text: 'Thank you so much — I\'m genuinely excited about this role. I was hoping we could discuss the compensation a bit.', hindi: 'बहुत शुक्रिया — मैं इस role के बारे में वाकई excited हूँ। मैं उम्मीद कर रही थी कि हम compensation पर थोड़ी बात कर सकते हैं।' },
      { speaker: 'Vikram', text: 'Of course. What did you have in mind?', hindi: 'बिल्कुल। आपके मन में क्या था?' },
      { speaker: 'Sana', text: 'Based on my 6 years of experience and market research, I was expecting something closer to ₹10–11 LPA.', hindi: 'मेरे 6 साल के अनुभव और market research के आधार पर, मैं ₹10–11 LPA के करीब expect कर रही थी।' },
      { speaker: 'Vikram', text: 'That\'s a bit above our band for this role. We could stretch to ₹9.5 LPA. Would that work?', hindi: 'यह इस role के हमारे band से थोड़ा ऊपर है। हम ₹9.5 LPA तक जा सकते हैं। क्या यह काम करेगा?' },
      { speaker: 'Sana', text: 'I appreciate the flexibility. If we can include a performance review at 6 months, I\'m happy to accept ₹9.5.', hindi: 'मैं flexibility की सराहना करती हूँ। अगर 6 महीने में performance review include हो, तो मैं ₹9.5 accept करने में खुश हूँ।' },
    ],
  },
];

// ── PRONUNCIATION DATA ─────────────────────────────────────────
const MINIMAL_PAIRS = [
  { pair: ['ship', 'sheep'], ipa: ['/ʃɪp/', '/ʃiːp/'], hindi: ['जहाज़', 'भेड़'], tip: 'Ship = छोटी "i" sound। Sheep = लंबी "ee" sound।' },
  { pair: ['bit', 'beat'],   ipa: ['/bɪt/', '/biːt/'], hindi: ['टुकड़ा', 'धड़कन'], tip: 'bit = short। beat = long eeee' },
  { pair: ['hat', 'heart'],  ipa: ['/hæt/', '/hɑːt/'], hindi: ['टोपी', 'दिल'], tip: 'hat = flat "a"। heart = deep "aa"' },
  { pair: ['live', 'leave'],  ipa: ['/lɪv/', '/liːv/'], hindi: ['जीना', 'छोड़ना'], tip: 'live (verb) = short। leave = long ee' },
  { pair: ['pull', 'pool'],  ipa: ['/pʊl/', '/puːl/'], hindi: ['खींचना', 'तालाब'], tip: 'pull = short "u"। pool = long "oo"' },
  { pair: ['bad', 'bed'],    ipa: ['/bæd/', '/bɛd/'], hindi: ['बुरा', 'बिस्तर'], tip: 'bad = "aa" like cat। bed = "e" like pet' },
  { pair: ['think', 'sink'], ipa: ['/θɪŋk/', '/sɪŋk/'], hindi: ['सोचना', 'डूबना'], tip: 'think = tongue between teeth (th)। sink = regular s' },
  { pair: ['fan', 'van'],    ipa: ['/fæn/', '/væn/'], hindi: ['पंखा', 'गाड़ी'], tip: 'fan = lips together, blow air। van = top teeth on lower lip, vibrate' },
];

const TONGUE_TWISTERS = [
  { text: 'She sells seashells by the seashore.', focus: 'S and SH sounds', level: 'A2' },
  { text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', focus: 'W and CH sounds', level: 'B1' },
  { text: 'Peter Piper picked a peck of pickled peppers.', focus: 'P sound repetition', level: 'A2' },
  { text: 'Red lorry, yellow lorry, red lorry, yellow lorry.', focus: 'R and L distinction', level: 'B1' },
  { text: 'The thirty-three thieves thought that they thrilled the throne throughout Thursday.', focus: 'TH sound mastery', level: 'B2' },
  { text: 'Unique New York, unique New York, you know you need unique New York.', focus: 'N and Y sounds', level: 'B1' },
];

const IPA_BASICS = [
  { symbol: '/iː/', example: 'see, tea, beat', hindi: 'लंबी "ई" की आवाज़' },
  { symbol: '/ɪ/',  example: 'sit, hit, bit',  hindi: 'छोटी "इ" की आवाज़' },
  { symbol: '/æ/',  example: 'cat, hat, bad',  hindi: '"ऐ" की आवाज़ — मुँह चौड़ा' },
  { symbol: '/ɑː/', example: 'car, bar, hard', hindi: 'लंबी "आ" की आवाज़' },
  { symbol: '/ʌ/',  example: 'cup, bus, fun',  hindi: 'छोटी "अ" की आवाज़' },
  { symbol: '/uː/', example: 'food, blue, too', hindi: 'लंबी "ऊ" की आवाज़' },
  { symbol: '/ʊ/',  example: 'put, book, foot', hindi: 'छोटी "उ" की आवाज़' },
  { symbol: '/θ/',  example: 'think, three, bath', hindi: 'जीभ दाँतों के बीच — TH' },
  { symbol: '/ð/',  example: 'this, that, the', hindi: 'जीभ दाँतों के बीच — vibrate' },
  { symbol: '/ŋ/',  example: 'ring, king, song', hindi: 'नाक से निकलने वाली "ण" की आवाज़' },
  { symbol: '/ʒ/',  example: 'vision, measure', hindi: '"ज़" की नरम आवाज़' },
  { symbol: '/tʃ/', example: 'chair, cheese, watch', hindi: '"च" की आवाज़' },
];

// ── DICTATION DATA ─────────────────────────────────────────────
const DICTATION_SENTENCES = [
  { id: 1, level: 'A1', text: 'My name is Rahul. I am from Mumbai. I work in a software company.', hint: 'Simple introduction sentence.' },
  { id: 2, level: 'A1', text: 'Every morning, I wake up at six o\'clock and drink a glass of water.', hint: 'Daily routine.' },
  { id: 3, level: 'A2', text: 'She has been working at this company for three years and recently got a promotion.', hint: 'Present perfect continuous.' },
  { id: 4, level: 'A2', text: 'If you want to improve your English, you should practice speaking every single day.', hint: 'Conditional sentence.' },
  { id: 5, level: 'B1', text: 'The meeting was postponed because the manager was travelling to the head office in Bangalore.', hint: 'Past passive.' },
  { id: 6, level: 'B1', text: 'Despite the heavy rainfall, the cricket match continued and India won by five wickets.', hint: 'Contrast + despite.' },
  { id: 7, level: 'B1', text: 'I would have applied for the scholarship, but I did not know about it until it was too late.', hint: 'Third conditional.' },
  { id: 8, level: 'B2', text: 'The government has implemented several new policies aimed at reducing carbon emissions by 2030.', hint: 'Formal/news style.' },
  { id: 9, level: 'B2', text: 'Having reviewed the proposal carefully, the board decided to approve the budget with minor amendments.', hint: 'Participle clause (formal).' },
  { id: 10, level: 'C1', text: 'Notwithstanding the economic challenges, the company managed to sustain profitability through strategic cost restructuring.', hint: 'Advanced business vocabulary.' },
];

// ── SPEED TRAINING DATA ────────────────────────────────────────
const SPEED_TIPS = [
  { icon: '🔗', title: 'Linking Words', desc: 'Native speakers join words together. "What are you" sounds like "Whatcha". "Did you eat" sounds like "Didja eat". Listen for this linking.', example: '"I\'m going to" → sounds like "I\'m gonna"' },
  { icon: '✂️', title: 'Reduced Vowels', desc: 'Unstressed syllables become a "schwa" /ə/ sound. "Today" = "t-ə-day". "About" = "ə-bout". This is why fast English sounds blurred.', example: '"can" → often sounds like "kən"' },
  { icon: '💨', title: 'Dropped Sounds', desc: 'Native speakers often drop sounds in fast speech. "Going to" → "gonna". "Want to" → "wanna". "Have to" → "hafta".', example: '"I don\'t know" → "I dunno"' },
  { icon: '🎵', title: 'Sentence Stress', desc: 'In every sentence, content words (nouns, verbs, adjectives) are stressed. Function words (is, the, a, to) are unstressed and fast.', example: '"I WANT to SEE the FILM" (caps = stressed)' },
  { icon: '📺', title: 'Practice Method', desc: 'Watch English series with English subtitles. Pause every 30 seconds. Repeat out loud at the same speed. Shadowing is the fastest way to improve.', example: 'Friends, The Office, Suits — good for office English' },
  { icon: '🚀', title: 'Progressive Speed', desc: 'Start at 0.75× speed. Master comprehension at that speed. Then move to 1×. Then 1.25×. Use YouTube playback speed settings.', example: 'Aim: understand 80%+ at 1.25× within 30 days' },
];

const SPEED_VOCABULARY = [
  { full: 'Going to', fast: 'Gonna', example: 'I\'m gonna call you later.' },
  { full: 'Want to', fast: 'Wanna', example: 'Do you wanna come?' },
  { full: 'Have to', fast: 'Hafta', example: 'I hafta finish this.' },
  { full: 'Has to', fast: 'Hasta', example: 'She hasta leave early.' },
  { full: 'Kind of', fast: 'Kinda', example: 'It\'s kinda complicated.' },
  { full: 'Sort of', fast: 'Sorta', example: 'I sorta knew it.' },
  { full: 'Got you', fast: 'Gotcha', example: 'Gotcha! No problem.' },
  { full: 'Let me', fast: 'Lemme', example: 'Lemme check that for you.' },
  { full: 'Give me', fast: 'Gimme', example: 'Gimme a minute.' },
  { full: 'Out of', fast: 'Outta', example: 'I\'m outta time.' },
];

// ── Dialogue Card ──────────────────────────────────────────────
function DialogueCard({ dialogue }) {
  const [open, setOpen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playing, setPlaying] = useState(false);

  const diffColors = { A1: 'text-emerald-400 bg-emerald-500/10', A2: 'text-sky-400 bg-sky-500/10', B1: 'text-violet-400 bg-violet-500/10', B2: 'text-amber-400 bg-amber-500/10' };

  return (
    <motion.div variants={fadeUp} className="card overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/3 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-lg shrink-0">💬</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="font-semibold text-white text-sm">{dialogue.title}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${diffColors[dialogue.difficulty] || ''}`}>{dialogue.difficulty}</span>
          </div>
          <p className="text-xs text-slate-500">{dialogue.topic} · {dialogue.lines.length} lines</p>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-500 shrink-0" /> : <ChevronDown size={16} className="text-slate-600 shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
          {/* Context */}
          <div className="p-3 rounded-xl bg-white/3 border border-white/6">
            <p className="text-xs text-slate-500 mb-1">📍 Context</p>
            <p className="text-sm text-slate-300">{dialogue.context}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => { setPlaying(v => !v); setShowTranscript(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/30 transition-colors"
            >
              {playing ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              {playing ? 'Pause' : 'Play Dialogue'}
            </button>
            <button
              onClick={() => setShowTranscript(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:text-white transition-colors"
            >
              {showTranscript ? <EyeOff size={14} /> : <Eye size={14} />}
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </button>
          </div>

          {playing && (
            <div className="p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/15 text-xs text-indigo-300 flex items-center gap-2">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-indigo-400" />
              Playing... (transcript shown below — practice listening along)
            </div>
          )}

          {/* Transcript */}
          {showTranscript && (
            <div className="space-y-3">
              {dialogue.lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-xl bg-white/3 border border-white/6"
                >
                  <p className="text-xs font-bold text-primary-400 mb-1">{line.speaker}</p>
                  <p className="text-sm text-white mb-1">{line.text}</p>
                  <p className="text-xs text-slate-500 italic">{line.hindi}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Dictation Practice ─────────────────────────────────────────
function DictationCard({ sentence }) {
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const levelColors = { A1: 'text-emerald-400 bg-emerald-500/10', A2: 'text-sky-400 bg-sky-500/10', B1: 'text-violet-400 bg-violet-500/10', B2: 'text-amber-400 bg-amber-500/10', C1: 'text-rose-400 bg-rose-500/10' };

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const isCorrect = checked && normalize(input) === normalize(sentence.text);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">✍️</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${levelColors[sentence.level] || ''}`}>{sentence.level}</span>
        </div>
        <span className="text-xs text-slate-600">{sentence.hint}</span>
      </div>

      <div className="p-3 rounded-xl bg-white/3 border border-white/6 mb-3 text-center">
        <p className="text-xs text-slate-500 mb-1">🔊 Listen and write what you hear</p>
        <button
          onClick={() => {/* mock */}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-semibold"
        >
          <Play size={12} fill="currentColor" /> Play Audio
        </button>
      </div>

      <textarea
        rows={2}
        value={input}
        onChange={e => { setInput(e.target.value); setChecked(false); }}
        placeholder="Write exactly what you hear..."
        className="w-full input text-sm resize-none mb-3"
      />

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setChecked(true)}
          disabled={!input.trim()}
          className="px-4 py-1.5 rounded-lg bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-semibold disabled:opacity-40 transition-colors hover:bg-primary-500/30"
        >
          Check Answer
        </button>
        <button
          onClick={() => setShowAnswer(v => !v)}
          className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-white transition-colors"
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <button onClick={() => { setInput(''); setChecked(false); setShowAnswer(false); }} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-500 text-xs">
          <RotateCcw size={11} />
        </button>
      </div>

      {checked && (
        <div className={`mt-3 p-3 rounded-xl ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
          {isCorrect ? (
            <p className="text-sm text-green-300 flex items-center gap-2"><CheckCircle2 size={14} /> Perfect! Well done! 🎉</p>
          ) : (
            <p className="text-sm text-rose-300">Not quite. Keep trying or show the answer to check.</p>
          )}
        </div>
      )}

      {showAnswer && (
        <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-slate-500 mb-1">✅ Correct answer:</p>
          <p className="text-sm text-white">{sentence.text}</p>
        </div>
      )}
    </div>
  );
}

// ── TAB COMPONENTS ─────────────────────────────────────────────

function ConversationsTab() {
  const [diffFilter, setDiffFilter] = useState('all');
  const filtered = diffFilter === 'all' ? DIALOGUES : DIALOGUES.filter(d => d.difficulty === diffFilter);

  return (
    <div className="space-y-5">
      <div className="card p-4 border-indigo-500/20 bg-indigo-500/5">
        <p className="text-sm text-slate-400">
          <span className="text-indigo-300 font-semibold">How to use:</span> Click "Play Dialogue" to reveal the transcript and practice listening. Cover the Hindi translation and try to understand on your own first.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['all', 'A1', 'A2', 'B1', 'B2'].map(d => (
          <button key={d} onClick={() => setDiffFilter(d)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${diffFilter === d ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
            {d === 'all' ? `All (${DIALOGUES.length})` : d}
          </button>
        ))}
      </div>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
        {filtered.map(d => <DialogueCard key={d.id} dialogue={d} />)}
      </motion.div>
    </div>
  );
}

function PronunciationTab() {
  return (
    <div className="space-y-5">
      {/* IPA Basics */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Volume2 size={16} className="text-sky-400" /> IPA Sounds — Basics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {IPA_BASICS.map(({ symbol, example, hindi }) => (
            <div key={symbol} className="p-3 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg font-mono text-sky-300 font-bold">{symbol}</span>
                <span className="text-xs text-slate-400">{example}</span>
              </div>
              <p className="text-xs text-slate-600">{hindi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Pairs */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">🔊 Minimal Pairs — Sound Discrimination</h3>
        <p className="text-xs text-slate-500 mb-4">These words differ by just ONE sound. Mastering these will dramatically improve your pronunciation clarity.</p>
        <div className="space-y-3">
          {MINIMAL_PAIRS.map(({ pair, ipa, hindi, tip }) => (
            <div key={pair[0]} className="p-4 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center gap-6 mb-2 flex-wrap">
                {pair.map((word, i) => (
                  <div key={i} className="text-center">
                    <p className="font-bold text-white text-lg">{word}</p>
                    <p className="text-xs text-sky-400 font-mono">{ipa[i]}</p>
                    <p className="text-xs text-slate-500">{hindi[i]}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-300/80">💡 {tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tongue Twisters */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">👅 Tongue Twisters — Fluency Training</h3>
        <p className="text-xs text-slate-500 mb-4">Start slow, then speed up. Record yourself and compare!</p>
        <div className="space-y-3">
          {TONGUE_TWISTERS.map(({ text, focus, level }) => (
            <div key={text.slice(0, 20)} className="p-4 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-rose-400/80 font-semibold">Focus: {focus}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{level}</span>
              </div>
              <p className="text-white font-medium text-sm italic">"{text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DictationTab() {
  return (
    <div className="space-y-5">
      <div className="card p-4 border-violet-500/20 bg-violet-500/5">
        <h3 className="font-bold text-white mb-2 flex items-center gap-2"><PenTool size={15} className="text-violet-400" /> Dictation Practice — How It Works</h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>1. Click <strong className="text-white">Play Audio</strong> (mock — transcripts are revealed after checking)</p>
          <p>2. <strong className="text-white">Write exactly</strong> what you hear — punctuation counts</p>
          <p>3. Click <strong className="text-white">Check Answer</strong> to see your accuracy</p>
          <p>4. If stuck, <strong className="text-white">Show Answer</strong> to learn</p>
        </div>
      </div>
      <div className="space-y-4">
        {DICTATION_SENTENCES.map(s => <DictationCard key={s.id} sentence={s} />)}
      </div>
    </div>
  );
}

function SpeedTab() {
  return (
    <div className="space-y-5">
      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPEED_TIPS.map(({ icon, title, desc, example }) => (
          <motion.div key={title} variants={fadeUp} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-bold text-white">{title}</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">{desc}</p>
            <div className="p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
              <p className="text-xs text-emerald-300">🔊 e.g. {example}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Informal / Fast Speech Vocabulary */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">⚡ Fast Speech Contractions — Sound Like a Native</h3>
        <p className="text-xs text-slate-500 mb-4">These are NOT wrong — they are how real English sounds in casual conversation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SPEED_VOCABULARY.map(({ full, fast, example }) => (
            <div key={full} className="p-3 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm text-slate-400">{full}</span>
                <ArrowRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-sm font-bold text-amber-300">{fast}</span>
              </div>
              <p className="text-xs text-slate-500 italic">"{example}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-3">📺 Best Resources for Speed Training</h3>
        <div className="space-y-3">
          {[
            { name: 'Friends (TV Series)', why: 'Everyday American English, great pronunciation, lots of slang', level: 'A2–B1' },
            { name: 'The Office (US)', why: 'Office vocabulary, formal + informal mix, clear speech', level: 'B1–B2' },
            { name: 'TED Talks', why: 'Academic vocabulary, diverse accents, subtitles available', level: 'B2–C1' },
            { name: 'BBC News', why: 'Clear British English, formal vocabulary, current events', level: 'B1–C1' },
            { name: 'YouTube — English with Lucy', why: 'Pronunciation-focused, Hindi-friendly explanations', level: 'A2–B2' },
          ].map(({ name, why, level }) => (
            <div key={name} className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Star size={14} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{name} <span className="text-[10px] text-slate-500 font-normal ml-1">{level}</span></p>
                <p className="text-xs text-slate-500">{why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function ListeningLabPage() {
  const [activeTab, setActiveTab] = useState('conversations');

  const TAB_CONTENT = {
    conversations: <ConversationsTab />,
    pronunciation: <PronunciationTab />,
    dictation:     <DictationTab />,
    speed:         <SpeedTab />,
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-sky-600/20 via-indigo-600/15 to-blue-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg"
              >
                <Headphones size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Listening Lab</h1>
                <p className="text-sm text-sky-300 font-medium">Train your ears — samjho, suno, bolो</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              10 real conversations, pronunciation drills, dictation practice, and speed training.
              Professional se lekar daily life tak — sab kuch.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            {[
              { val: '10', label: 'Dialogues' },
              { val: 'A1–C1', label: 'Levels' },
              { val: '4', label: 'Modules' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-lg font-black text-sky-300">{val}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
              </div>
            ))}
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
                ? 'border-sky-500 text-sky-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
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
