'use client';
// ============================================================
// REAL-LIFE SCENARIOS — Practice English for real situations
// Features: Airport, Hospital, Bank, Hotel, Restaurant, Police,
// Post Office, Shopping, Interview, Phone Call scenarios
// Each with dialogues, vocabulary, practice exercises
// ============================================================

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Plane, Building2, Stethoscope, Hotel, UtensilsCrossed,
  Shield, Mail, ShoppingCart, Briefcase, Phone,
  ChevronRight, Star, Zap, Clock, Target, CheckCircle2,
  ArrowLeft, MessageSquare, BookOpen, Volume2, Play,
  Users, Globe, Award,
} from 'lucide-react';

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Animated Section ────────────────────────────────────────
function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ── Scenario Data ───────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'airport',
    title: 'At the Airport',
    emoji: '✈️',
    icon: Plane,
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    difficulty: 'Intermediate',
    duration: '20 min',
    xp: 80,
    description: 'Check-in, immigration, boarding, customs, and asking for help at the airport.',
    vocabulary: ['Boarding pass', 'Terminal', 'Gate', 'Luggage', 'Immigration', 'Customs', 'Departure', 'Arrival', 'Delay', 'Announcement'],
    dialogues: [
      {
        title: 'Checking In',
        speakers: ['You', 'Airline Staff'],
        lines: [
          { speaker: 'You', text: 'Good morning. I would like to check in for my flight to Mumbai.' },
          { speaker: 'Staff', text: 'Good morning! May I see your passport and booking confirmation?' },
          { speaker: 'You', text: 'Here you go. I have one checked bag and one carry-on.' },
          { speaker: 'Staff', text: 'Would you like a window or aisle seat?' },
          { speaker: 'You', text: 'Window seat, please.' },
          { speaker: 'Staff', text: 'Here is your boarding pass. Your gate is B12. Boarding starts at 10:30 AM.' },
          { speaker: 'You', text: 'Thank you! Where is the security checkpoint?' },
          { speaker: 'Staff', text: 'Go straight and turn right. Have a pleasant flight!' },
        ],
      },
      {
        title: 'At Immigration',
        speakers: ['You', 'Officer'],
        lines: [
          { speaker: 'Officer', text: 'Passport please. What is the purpose of your visit?' },
          { speaker: 'You', text: 'I am here for a business meeting. It will last three days.' },
          { speaker: 'Officer', text: 'Where will you be staying?' },
          { speaker: 'You', text: 'I will be staying at the Hilton Hotel in downtown.' },
          { speaker: 'Officer', text: 'Do you have a return ticket?' },
          { speaker: 'You', text: 'Yes, I have a return flight on Friday.' },
          { speaker: 'Officer', text: 'Welcome. Enjoy your stay.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'Excuse me, where is Gate B12?', hindi: 'माफ़ कीजिए, गेट B12 कहाँ है?' },
      { phrase: 'My flight has been delayed. What should I do?', hindi: 'मेरी फ्लाइट देरी से है। मुझे क्या करना चाहिए?' },
      { phrase: 'Can I have an extra blanket, please?', hindi: 'क्या मुझे एक और कंबल मिल सकता है?' },
      { phrase: 'I think my luggage is lost.', hindi: 'मुझे लगता है मेरा सामान खो गया है।' },
    ],
  },
  {
    id: 'hospital',
    title: 'At the Hospital',
    emoji: '🏥',
    icon: Stethoscope,
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    difficulty: 'Intermediate',
    duration: '15 min',
    xp: 70,
    description: 'Describing symptoms, talking to a doctor, getting a prescription, and emergency situations.',
    vocabulary: ['Symptom', 'Diagnosis', 'Prescription', 'Appointment', 'Emergency', 'Surgery', 'Ward', 'OPD', 'Blood test', 'X-ray'],
    dialogues: [
      {
        title: 'Visiting the Doctor',
        speakers: ['You', 'Doctor'],
        lines: [
          { speaker: 'Doctor', text: 'Hello! What seems to be the problem?' },
          { speaker: 'You', text: 'I have been having a headache and fever for two days.' },
          { speaker: 'Doctor', text: 'Are you experiencing any other symptoms? Cough or body pain?' },
          { speaker: 'You', text: 'Yes, I also have body pain and a sore throat.' },
          { speaker: 'Doctor', text: 'Let me check your temperature. It is 101°F. You have viral fever.' },
          { speaker: 'You', text: 'Is it serious? Do I need any tests?' },
          { speaker: 'Doctor', text: 'No, it is not serious. I am prescribing some medicines. Take rest for 2 days.' },
          { speaker: 'You', text: 'Thank you, doctor. Should I come for a follow-up?' },
          { speaker: 'Doctor', text: 'Yes, come back if the fever doesn\'t go down in 3 days.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'I need to see a doctor urgently.', hindi: 'मुझे जल्दी से डॉक्टर से मिलना है।' },
      { phrase: 'I am allergic to penicillin.', hindi: 'मुझे पेनिसिलिन से एलर्जी है।' },
      { phrase: 'Where is the pharmacy?', hindi: 'फार्मेसी कहाँ है?' },
      { phrase: 'How many times a day should I take this medicine?', hindi: 'यह दवा दिन में कितनी बार लेनी है?' },
    ],
  },
  {
    id: 'bank',
    title: 'At the Bank',
    emoji: '🏦',
    icon: Building2,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    difficulty: 'Intermediate',
    duration: '15 min',
    xp: 70,
    description: 'Opening an account, making deposits/withdrawals, and asking about loans.',
    vocabulary: ['Account', 'Deposit', 'Withdrawal', 'Balance', 'Interest', 'Loan', 'EMI', 'KYC', 'Cheque', 'Statement'],
    dialogues: [
      {
        title: 'Opening a Savings Account',
        speakers: ['You', 'Bank Officer'],
        lines: [
          { speaker: 'You', text: 'Hello, I would like to open a savings account.' },
          { speaker: 'Officer', text: 'Sure. Do you have your ID proof and address proof?' },
          { speaker: 'You', text: 'Yes, I have my Aadhaar card and passport.' },
          { speaker: 'Officer', text: 'The minimum balance required is ₹10,000. Would you like a debit card?' },
          { speaker: 'You', text: 'Yes, please. I also want internet banking activated.' },
          { speaker: 'Officer', text: 'Fill this form and we will process your account in 24 hours.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'I would like to transfer money to another account.', hindi: 'मैं दूसरे खाते में पैसे ट्रांसफर करना चाहता/चाहती हूँ।' },
      { phrase: 'What is the current interest rate on fixed deposits?', hindi: 'फिक्स्ड डिपॉजिट पर अभी ब्याज दर क्या है?' },
      { phrase: 'My ATM card is blocked. Can you help?', hindi: 'मेरा ATM कार्ड ब्लॉक हो गया है। क्या आप मदद कर सकते हैं?' },
    ],
  },
  {
    id: 'restaurant',
    title: 'At a Restaurant',
    emoji: '🍽️',
    icon: UtensilsCrossed,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    difficulty: 'Beginner',
    duration: '10 min',
    xp: 50,
    description: 'Ordering food, making reservations, and handling the bill at a restaurant.',
    vocabulary: ['Menu', 'Appetizer', 'Main course', 'Dessert', 'Bill', 'Tip', 'Waiter', 'Reservation', 'Takeaway', 'Compliment'],
    dialogues: [
      {
        title: 'Ordering Food',
        speakers: ['You', 'Waiter'],
        lines: [
          { speaker: 'Waiter', text: 'Good evening! Welcome. Table for how many?' },
          { speaker: 'You', text: 'Table for two, please.' },
          { speaker: 'Waiter', text: 'Here is the menu. Can I get you something to drink first?' },
          { speaker: 'You', text: 'I will have a mango juice, and she will have a lemonade.' },
          { speaker: 'Waiter', text: 'Are you ready to order your food?' },
          { speaker: 'You', text: 'Yes. I will have the paneer butter masala with naan, and she will have the chicken biryani.' },
          { speaker: 'Waiter', text: 'Would you like any dessert?' },
          { speaker: 'You', text: 'We will decide later. Thank you.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'Could we have the bill, please?', hindi: 'क्या हमें बिल मिल सकता है?' },
      { phrase: 'Is this dish spicy?', hindi: 'क्या यह डिश मसालेदार है?' },
      { phrase: 'I am vegetarian. What do you recommend?', hindi: 'मैं शाकाहारी हूँ। आप क्या सुझाव देंगे?' },
      { phrase: 'The food was excellent. Compliments to the chef!', hindi: 'खाना बहुत बढ़िया था। शेफ को बधाई!' },
    ],
  },
  {
    id: 'hotel',
    title: 'At a Hotel',
    emoji: '🏨',
    icon: Hotel,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    difficulty: 'Intermediate',
    duration: '15 min',
    xp: 70,
    description: 'Check-in, room service, complaints, and check-out at a hotel.',
    vocabulary: ['Reception', 'Check-in', 'Check-out', 'Room service', 'Housekeeping', 'Suite', 'Complimentary', 'Amenities', 'Concierge', 'Laundry'],
    dialogues: [
      {
        title: 'Hotel Check-In',
        speakers: ['You', 'Receptionist'],
        lines: [
          { speaker: 'You', text: 'Hello, I have a reservation under the name Sharma.' },
          { speaker: 'Receptionist', text: 'Yes, Mr. Sharma. You have booked a deluxe room for 3 nights.' },
          { speaker: 'You', text: 'That is correct. Is breakfast included?' },
          { speaker: 'Receptionist', text: 'Yes, complimentary breakfast is served from 7 to 10 AM at the ground floor restaurant.' },
          { speaker: 'You', text: 'Great. What time is check-out?' },
          { speaker: 'Receptionist', text: 'Check-out is at 12 noon. Here is your room key — Room 305, third floor.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'Could I get an extra pillow, please?', hindi: 'क्या मुझे एक अतिरिक्त तकिया मिल सकता है?' },
      { phrase: 'The air conditioning is not working in my room.', hindi: 'मेरे कमरे में AC काम नहीं कर रहा।' },
      { phrase: 'I would like to extend my stay by one night.', hindi: 'मैं एक और रात रुकना चाहूंगा।' },
    ],
  },
  {
    id: 'interview',
    title: 'Job Interview',
    emoji: '💼',
    icon: Briefcase,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    difficulty: 'Advanced',
    duration: '25 min',
    xp: 100,
    description: 'Self introduction, answering common interview questions, salary negotiation, and follow-up.',
    vocabulary: ['Resume', 'Cover letter', 'Strengths', 'Weaknesses', 'Experience', 'Qualification', 'Vacancy', 'Notice period', 'CTC', 'HR'],
    dialogues: [
      {
        title: 'Common Interview',
        speakers: ['You', 'Interviewer'],
        lines: [
          { speaker: 'Interviewer', text: 'Please tell me about yourself.' },
          { speaker: 'You', text: 'My name is Priya. I am from Delhi. I have completed my B.Tech in Computer Science from DTU. I have 3 years of experience as a software developer.' },
          { speaker: 'Interviewer', text: 'What are your strengths?' },
          { speaker: 'You', text: 'I am a fast learner, a team player, and I work well under pressure.' },
          { speaker: 'Interviewer', text: 'Where do you see yourself in 5 years?' },
          { speaker: 'You', text: 'I see myself in a leadership role, managing a team and contributing to the company\'s growth.' },
          { speaker: 'Interviewer', text: 'Do you have any questions for us?' },
          { speaker: 'You', text: 'Yes. What does a typical day look like for this role? And what are the opportunities for professional growth?' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'I am very interested in this position.', hindi: 'मुझे इस पद में बहुत रुचि है।' },
      { phrase: 'My expected salary is between 8 to 10 lakhs per annum.', hindi: 'मेरी अपेक्षित सैलरी 8 से 10 लाख प्रति वर्ष है।' },
      { phrase: 'I can join within 30 days after receiving the offer.', hindi: 'ऑफर मिलने के बाद मैं 30 दिनों में ज्वाइन कर सकता/सकती हूँ।' },
      { phrase: 'Thank you for the opportunity. I look forward to hearing from you.', hindi: 'इस अवसर के लिए धन्यवाद। मैं आपकी प्रतिक्रिया की प्रतीक्षा करूंगा।' },
    ],
  },
  {
    id: 'phone',
    title: 'Phone Conversation',
    emoji: '📱',
    icon: Phone,
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    difficulty: 'Beginner',
    duration: '10 min',
    xp: 50,
    description: 'Making calls, leaving voicemails, and professional phone etiquette.',
    vocabulary: ['Call', 'Hold', 'Transfer', 'Voicemail', 'Extension', 'Dial', 'Hang up', 'Speaker', 'Conference call', 'Reception'],
    dialogues: [
      {
        title: 'Making a Business Call',
        speakers: ['You', 'Receptionist'],
        lines: [
          { speaker: 'Receptionist', text: 'Good morning, ABC Technologies. How may I help you?' },
          { speaker: 'You', text: 'Hello, may I speak with Mr. Kapoor from the marketing department?' },
          { speaker: 'Receptionist', text: 'May I know who is calling and what this is regarding?' },
          { speaker: 'You', text: 'This is Amit Sharma from XYZ Solutions. I am calling regarding our partnership proposal.' },
          { speaker: 'Receptionist', text: 'Please hold for a moment. I will transfer your call.' },
          { speaker: 'You', text: 'Thank you.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'May I speak with Mr. Sharma, please?', hindi: 'क्या मैं श्री शर्मा से बात कर सकता/सकती हूँ?' },
      { phrase: 'Could you please hold for a moment?', hindi: 'क्या आप एक पल रुक सकते हैं?' },
      { phrase: 'I will call you back in 10 minutes.', hindi: 'मैं 10 मिनट में वापस कॉल करूंगा।' },
      { phrase: 'Sorry, I think you have the wrong number.', hindi: 'माफ़ कीजिए, आपने गलत नंबर मिलाया है।' },
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping',
    emoji: '🛍️',
    icon: ShoppingCart,
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    difficulty: 'Beginner',
    duration: '10 min',
    xp: 50,
    description: 'Asking prices, bargaining, returns, and making complaints.',
    vocabulary: ['Price', 'Discount', 'Size', 'Color', 'Receipt', 'Exchange', 'Refund', 'Trial room', 'Cash', 'Card payment'],
    dialogues: [
      {
        title: 'Shopping for Clothes',
        speakers: ['You', 'Shopkeeper'],
        lines: [
          { speaker: 'You', text: 'Excuse me, how much is this shirt?' },
          { speaker: 'Shopkeeper', text: 'This one is ₹1,200. We have a 20% discount today.' },
          { speaker: 'You', text: 'Do you have this in a larger size? I need XL.' },
          { speaker: 'Shopkeeper', text: 'Yes, let me check. Here you go — XL in the same color.' },
          { speaker: 'You', text: 'Can I try it on? Where is the trial room?' },
          { speaker: 'Shopkeeper', text: 'The trial room is on the right side. Please go ahead.' },
          { speaker: 'You', text: 'I will take this one. Do you accept UPI payments?' },
          { speaker: 'Shopkeeper', text: 'Yes, we accept UPI, cards, and cash. Here is the QR code.' },
        ],
      },
    ],
    usefulPhrases: [
      { phrase: 'Can you give me a better price?', hindi: 'क्या आप थोड़ा कम कर सकते हैं?' },
      { phrase: 'I would like to return this item.', hindi: 'मैं यह चीज़ वापस करना चाहता/चाहती हूँ।' },
      { phrase: 'Do you have this in blue?', hindi: 'क्या यह नीले रंग में है?' },
      { phrase: 'Can I get a receipt, please?', hindi: 'क्या मुझे रसीद मिल सकती है?' },
    ],
  },
];

// ── Dialogue Component ──────────────────────────────────────
function DialogueViewer({ dialogue }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-white">{dialogue.title}</h4>
      <div className="space-y-2">
        {dialogue.lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: line.speaker === 'You' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`flex gap-2 ${line.speaker === 'You' ? 'flex-row-reverse' : ''}`}
          >
            {/* Speaker avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              line.speaker === 'You' ? 'bg-primary-500/20 text-primary-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {line.speaker === 'You' ? '🧑' : '👤'}
            </div>
            {/* Message bubble */}
            <div className={`max-w-[80%] p-2.5 rounded-xl text-sm ${
              line.speaker === 'You'
                ? 'bg-primary-500/10 border border-primary-500/20 text-slate-200'
                : 'bg-white/5 border border-white/10 text-slate-300'
            }`}>
              <p className="text-[10px] font-semibold mb-0.5 text-slate-500">{line.speaker}</p>
              <p>{line.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT — Scenarios
// ============================================================
export default function ScenariosPage() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const scenario = SCENARIOS.find((s) => s.id === selectedScenario);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <Globe size={28} className="text-primary-400" /> Real-Life Scenarios
          </h1>
          <p className="text-slate-500">
            {SCENARIOS.length} real-world situations — Practice English for airports, hospitals, banks, interviews, and more
          </p>
        </div>
      </AnimatedSection>

      {/* Back button */}
      <AnimatePresence>
        {selectedScenario && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setSelectedScenario(null)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to all scenarios
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scenario Grid */}
      {!selectedScenario && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedScenario(s.id)}
                className="card p-5 cursor-pointer hover:border-white/15 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center text-xl`}>
                    {s.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500 flex items-center gap-1">
                        <Clock size={10} /> {s.duration}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 flex items-center gap-1">
                        <Zap size={10} /> +{s.xp} XP
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{s.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {s.vocabulary.slice(0, 4).map((v) => (
                    <span key={v} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">{v}</span>
                  ))}
                  {s.vocabulary.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-400">+{s.vocabulary.length - 4}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Scenario Detail */}
      {scenario && (
        <div className="space-y-6">
          {/* Scenario header */}
          <AnimatedSection>
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl ${scenario.bg} ${scenario.border} border flex items-center justify-center text-3xl`}>
                  {scenario.emoji}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
                  <p className="text-sm text-slate-500">{scenario.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400">{scenario.difficulty}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500">{scenario.duration}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400">+{scenario.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vocabulary section */}
          <AnimatedSection>
            <div className="card p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-primary-400" /> Key Vocabulary
              </h3>
              <div className="flex flex-wrap gap-2">
                {scenario.vocabulary.map((word) => (
                  <span key={word} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Dialogues */}
          {scenario.dialogues.map((d, i) => (
            <AnimatedSection key={i}>
              <div className="card p-5">
                <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                  <MessageSquare size={14} className="text-emerald-400" /> Dialogue: {d.title}
                </h3>
                <DialogueViewer dialogue={d} />
              </div>
            </AnimatedSection>
          ))}

          {/* Useful Phrases */}
          <AnimatedSection>
            <div className="card p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Star size={14} className="text-amber-400" /> Useful Phrases
              </h3>
              <div className="space-y-2">
                {scenario.usefulPhrases.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-sm text-white font-medium">🇬🇧 {p.phrase}</p>
                    <p className="text-xs text-slate-500 mt-0.5">🇮🇳 {p.hindi}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
}
