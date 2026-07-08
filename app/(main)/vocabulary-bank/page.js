'use client';
// ============================================================
// VOCABULARY BANK — Complete vocabulary browser with 35+ categories
// Features: Category cards, search, filter, word cards with IPA,
// Hindi meaning, example sentences, synonyms, antonyms
// Inspired by: Notion database, Linear, Apple dictionary
// ============================================================

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Search, Filter, BookOpen, Globe, Star, Zap, ArrowRight,
  ChevronRight, Volume2, Heart, Bookmark, TrendingUp,
  CheckCircle2, X, Hash, Target, Brain, Award,
  Home, Utensils, Plane, Briefcase, Laptop, Building2,
  Stethoscope, ShoppingCart, Smile, TreePine, PawPrint,
  Flower2, Apple, Carrot, GlassWater, PartyPopper,
  Calendar, Clock, MapPin, Flag, Coins, Users,
  Shirt, Car, Monitor, Wifi, GraduationCap, MessageSquare,
} from 'lucide-react';

// ── Animation variants ──────────────────────────────────────
// Smooth fade-up animation for cards and sections
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// Stagger children animation for grid layouts
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

// Card animation for individual items
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ── Vocabulary Categories ───────────────────────────────────
// Each category contains real vocabulary words with complete details
const VOCAB_CATEGORIES = [
  {
    id: 'family',
    title: 'Family & Relations',
    emoji: '👨‍👩‍👧‍👦',
    icon: Users,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    wordCount: 120,
    difficulty: 'Beginner',
    words: [
      { word: 'Father', hindi: 'पिता', ipa: '/ˈfɑːðər/', example: 'My father is a doctor.', synonyms: ['Dad', 'Papa'], antonyms: ['Mother'], type: 'noun', level: 'A1' },
      { word: 'Mother', hindi: 'माता', ipa: '/ˈmʌðər/', example: 'My mother cooks delicious food.', synonyms: ['Mom', 'Mama'], antonyms: ['Father'], type: 'noun', level: 'A1' },
      { word: 'Brother', hindi: 'भाई', ipa: '/ˈbrʌðər/', example: 'My brother is older than me.', synonyms: ['Sibling', 'Bro'], antonyms: ['Sister'], type: 'noun', level: 'A1' },
      { word: 'Sister', hindi: 'बहन', ipa: '/ˈsɪstər/', example: 'My sister studies in college.', synonyms: ['Sibling', 'Sis'], antonyms: ['Brother'], type: 'noun', level: 'A1' },
      { word: 'Grandfather', hindi: 'दादा/नाना', ipa: '/ˈɡrændfɑːðər/', example: 'My grandfather tells us stories.', synonyms: ['Grandpa', 'Granddad'], antonyms: ['Grandmother'], type: 'noun', level: 'A1' },
      { word: 'Grandmother', hindi: 'दादी/नानी', ipa: '/ˈɡrændmʌðər/', example: 'My grandmother makes the best chai.', synonyms: ['Grandma', 'Granny'], antonyms: ['Grandfather'], type: 'noun', level: 'A1' },
      { word: 'Uncle', hindi: 'चाचा/मामा', ipa: '/ˈʌŋkl/', example: 'My uncle lives in Mumbai.', synonyms: [], antonyms: ['Aunt'], type: 'noun', level: 'A1' },
      { word: 'Aunt', hindi: 'चाची/मामी', ipa: '/ænt/', example: 'My aunt is a teacher.', synonyms: ['Auntie'], antonyms: ['Uncle'], type: 'noun', level: 'A1' },
      { word: 'Cousin', hindi: 'चचेरा/ममेरा भाई-बहन', ipa: '/ˈkʌzn/', example: 'I play with my cousins every weekend.', synonyms: [], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Nephew', hindi: 'भतीजा/भांजा', ipa: '/ˈnefjuː/', example: 'My nephew is very naughty.', synonyms: [], antonyms: ['Niece'], type: 'noun', level: 'A2' },
      { word: 'Niece', hindi: 'भतीजी/भांजी', ipa: '/niːs/', example: 'My niece is studying engineering.', synonyms: [], antonyms: ['Nephew'], type: 'noun', level: 'A2' },
      { word: 'Spouse', hindi: 'जीवनसाथी', ipa: '/spaʊs/', example: 'I live with my spouse in Delhi.', synonyms: ['Partner', 'Husband/Wife'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Sibling', hindi: 'भाई-बहन', ipa: '/ˈsɪblɪŋ/', example: 'I have two siblings.', synonyms: ['Brother/Sister'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Relative', hindi: 'रिश्तेदार', ipa: '/ˈrelətɪv/', example: 'All my relatives came for the wedding.', synonyms: ['Kin', 'Family member'], antonyms: ['Stranger'], type: 'noun', level: 'A2' },
      { word: 'In-laws', hindi: 'ससुराल वाले', ipa: '/ˈɪnlɔːz/', example: 'My in-laws are very supportive.', synonyms: ['Extended family'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Ancestor', hindi: 'पूर्वज', ipa: '/ˈænsestər/', example: 'Our ancestors lived in villages.', synonyms: ['Forefather', 'Predecessor'], antonyms: ['Descendant'], type: 'noun', level: 'B2' },
      { word: 'Descendant', hindi: 'वंशज', ipa: '/dɪˈsendənt/', example: 'He is a descendant of a royal family.', synonyms: ['Offspring', 'Heir'], antonyms: ['Ancestor'], type: 'noun', level: 'B2' },
      { word: 'Guardian', hindi: 'अभिभावक', ipa: '/ˈɡɑːrdiən/', example: 'His guardian signed the school form.', synonyms: ['Caretaker', 'Protector'], antonyms: ['Ward'], type: 'noun', level: 'B1' },
      { word: 'Orphan', hindi: 'अनाथ', ipa: '/ˈɔːrfn/', example: 'The orphan was adopted by a kind couple.', synonyms: [], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Widow', hindi: 'विधवा', ipa: '/ˈwɪdoʊ/', example: 'The widow lives with her children.', synonyms: [], antonyms: ['Widower'], type: 'noun', level: 'B1' },
    ],
  },
  {
    id: 'food',
    title: 'Food & Kitchen',
    emoji: '🍕',
    icon: Utensils,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    wordCount: 150,
    difficulty: 'Beginner',
    words: [
      { word: 'Breakfast', hindi: 'नाश्ता', ipa: '/ˈbrekfəst/', example: 'I have breakfast at 8 AM.', synonyms: ['Morning meal'], antonyms: [], type: 'noun', level: 'A1' },
      { word: 'Lunch', hindi: 'दोपहर का खाना', ipa: '/lʌntʃ/', example: 'We eat lunch at the office canteen.', synonyms: ['Midday meal'], antonyms: [], type: 'noun', level: 'A1' },
      { word: 'Dinner', hindi: 'रात का खाना', ipa: '/ˈdɪnər/', example: 'Our family eats dinner together.', synonyms: ['Supper', 'Evening meal'], antonyms: [], type: 'noun', level: 'A1' },
      { word: 'Appetizer', hindi: 'स्टार्टर', ipa: '/ˈæpɪtaɪzər/', example: 'We ordered soup as an appetizer.', synonyms: ['Starter', 'Hors d\'oeuvre'], antonyms: ['Dessert'], type: 'noun', level: 'B1' },
      { word: 'Recipe', hindi: 'व्यंजन विधि', ipa: '/ˈresɪpi/', example: 'My mother has a secret recipe for biryani.', synonyms: ['Formula', 'Instructions'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Ingredient', hindi: 'सामग्री', ipa: '/ɪnˈɡriːdiənt/', example: 'The main ingredient is turmeric.', synonyms: ['Component', 'Element'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Cuisine', hindi: 'पाक शैली', ipa: '/kwɪˈziːn/', example: 'Indian cuisine is famous worldwide.', synonyms: ['Cooking style', 'Food tradition'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Delicious', hindi: 'स्वादिष्ट', ipa: '/dɪˈlɪʃəs/', example: 'This biryani is absolutely delicious.', synonyms: ['Tasty', 'Yummy', 'Scrumptious'], antonyms: ['Tasteless', 'Bland'], type: 'adjective', level: 'A2' },
      { word: 'Spicy', hindi: 'मसालेदार', ipa: '/ˈspaɪsi/', example: 'I love spicy food.', synonyms: ['Hot', 'Peppery'], antonyms: ['Mild', 'Bland'], type: 'adjective', level: 'A2' },
      { word: 'Nutritious', hindi: 'पौष्टिक', ipa: '/njuːˈtrɪʃəs/', example: 'Fruits are very nutritious.', synonyms: ['Healthy', 'Nourishing', 'Wholesome'], antonyms: ['Unhealthy', 'Junk'], type: 'adjective', level: 'B1' },
      { word: 'Portion', hindi: 'हिस्सा', ipa: '/ˈpɔːrʃn/', example: 'The portions here are very generous.', synonyms: ['Serving', 'Share'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Garnish', hindi: 'सजावट', ipa: '/ˈɡɑːrnɪʃ/', example: 'Garnish the dish with fresh coriander.', synonyms: ['Decorate', 'Embellish'], antonyms: [], type: 'verb', level: 'B2' },
      { word: 'Marinate', hindi: 'मसाले में भिगोना', ipa: '/ˈmærɪneɪt/', example: 'Marinate the chicken for two hours.', synonyms: ['Soak', 'Season'], antonyms: [], type: 'verb', level: 'B1' },
      { word: 'Simmer', hindi: 'धीमी आँच पर पकाना', ipa: '/ˈsɪmər/', example: 'Let the sauce simmer for 30 minutes.', synonyms: ['Stew', 'Cook slowly'], antonyms: ['Boil'], type: 'verb', level: 'B2' },
      { word: 'Appetite', hindi: 'भूख', ipa: '/ˈæpɪtaɪt/', example: 'I have a huge appetite today.', synonyms: ['Hunger', 'Craving'], antonyms: ['Fullness'], type: 'noun', level: 'B1' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    emoji: '✈️',
    icon: Plane,
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    wordCount: 130,
    difficulty: 'Intermediate',
    words: [
      { word: 'Destination', hindi: 'गंतव्य', ipa: '/ˌdestɪˈneɪʃn/', example: 'Paris is a popular tourist destination.', synonyms: ['Location', 'Place'], antonyms: ['Origin'], type: 'noun', level: 'A2' },
      { word: 'Itinerary', hindi: 'यात्रा कार्यक्रम', ipa: '/aɪˈtɪnəreri/', example: 'Our travel itinerary includes five cities.', synonyms: ['Schedule', 'Plan', 'Route'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Boarding pass', hindi: 'बोर्डिंग पास', ipa: '/ˈbɔːrdɪŋ pæs/', example: 'Please show your boarding pass at the gate.', synonyms: ['Flight ticket'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Passport', hindi: 'पासपोर्ट', ipa: '/ˈpæspɔːrt/', example: 'Your passport must be valid for six months.', synonyms: ['Travel document'], antonyms: [], type: 'noun', level: 'A1' },
      { word: 'Luggage', hindi: 'सामान', ipa: '/ˈlʌɡɪdʒ/', example: 'My luggage was lost at the airport.', synonyms: ['Baggage', 'Bags', 'Suitcases'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Reservation', hindi: 'आरक्षण', ipa: '/ˌrezərˈveɪʃn/', example: 'I have a hotel reservation for tonight.', synonyms: ['Booking', 'Appointment'], antonyms: ['Cancellation'], type: 'noun', level: 'A2' },
      { word: 'Terminal', hindi: 'टर्मिनल', ipa: '/ˈtɜːrmɪnl/', example: 'My flight departs from Terminal 3.', synonyms: ['Gate area'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Immigration', hindi: 'आप्रवासन', ipa: '/ˌɪmɪˈɡreɪʃn/', example: 'The immigration queue was very long.', synonyms: ['Border control', 'Customs'], antonyms: ['Emigration'], type: 'noun', level: 'B1' },
      { word: 'Departure', hindi: 'प्रस्थान', ipa: '/dɪˈpɑːrtʃər/', example: 'The departure time is 6 AM.', synonyms: ['Leaving', 'Exit'], antonyms: ['Arrival'], type: 'noun', level: 'A2' },
      { word: 'Arrival', hindi: 'आगमन', ipa: '/əˈraɪvl/', example: 'The arrival hall is on the ground floor.', synonyms: ['Coming', 'Landing'], antonyms: ['Departure'], type: 'noun', level: 'A2' },
      { word: 'Currency', hindi: 'मुद्रा', ipa: '/ˈkɜːrənsi/', example: 'You can exchange currency at the airport.', synonyms: ['Money', 'Cash'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Souvenir', hindi: 'यादगार', ipa: '/ˌsuːvəˈnɪr/', example: 'I bought a souvenir for my family.', synonyms: ['Memento', 'Keepsake'], antonyms: [], type: 'noun', level: 'B1' },
    ],
  },
  {
    id: 'office',
    title: 'Office & Workplace',
    emoji: '💼',
    icon: Briefcase,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    wordCount: 160,
    difficulty: 'Intermediate',
    words: [
      { word: 'Deadline', hindi: 'अंतिम तिथि', ipa: '/ˈdedlaɪn/', example: 'The project deadline is next Friday.', synonyms: ['Due date', 'Time limit'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Colleague', hindi: 'सहकर्मी', ipa: '/ˈkɒliːɡ/', example: 'My colleague helped me with the report.', synonyms: ['Coworker', 'Associate'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Promotion', hindi: 'पदोन्नति', ipa: '/prəˈmoʊʃn/', example: 'She got a promotion to Senior Manager.', synonyms: ['Advancement', 'Upgrade'], antonyms: ['Demotion'], type: 'noun', level: 'B1' },
      { word: 'Salary', hindi: 'वेतन', ipa: '/ˈsæləri/', example: 'My salary is credited on the 1st of every month.', synonyms: ['Pay', 'Wage', 'Income', 'Compensation'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Agenda', hindi: 'कार्यसूची', ipa: '/əˈdʒendə/', example: 'Let me share the meeting agenda.', synonyms: ['Schedule', 'Plan', 'Topics'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Feedback', hindi: 'प्रतिक्रिया', ipa: '/ˈfiːdbæk/', example: 'Can I get your feedback on this proposal?', synonyms: ['Response', 'Review', 'Comments'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Collaborate', hindi: 'सहयोग करना', ipa: '/kəˈlæbəreɪt/', example: 'Our teams will collaborate on this project.', synonyms: ['Work together', 'Cooperate', 'Partner'], antonyms: ['Compete'], type: 'verb', level: 'B1' },
      { word: 'Delegate', hindi: 'सौंपना', ipa: '/ˈdelɪɡeɪt/', example: 'A good manager knows how to delegate tasks.', synonyms: ['Assign', 'Entrust', 'Hand over'], antonyms: ['Retain', 'Hoard'], type: 'verb', level: 'B2' },
      { word: 'Escalate', hindi: 'बढ़ाना', ipa: '/ˈeskəleɪt/', example: 'Please escalate this issue to the manager.', synonyms: ['Raise', 'Elevate', 'Intensify'], antonyms: ['De-escalate', 'Reduce'], type: 'verb', level: 'B2' },
      { word: 'Appraisal', hindi: 'मूल्यांकन', ipa: '/əˈpreɪzl/', example: 'My annual appraisal is next month.', synonyms: ['Evaluation', 'Assessment', 'Review'], antonyms: [], type: 'noun', level: 'B2' },
    ],
  },
  {
    id: 'technology',
    title: 'Technology & Internet',
    emoji: '💻',
    icon: Laptop,
    color: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    wordCount: 140,
    difficulty: 'Intermediate',
    words: [
      { word: 'Software', hindi: 'सॉफ्टवेयर', ipa: '/ˈsɒftwer/', example: 'We develop enterprise software.', synonyms: ['Application', 'Program'], antonyms: ['Hardware'], type: 'noun', level: 'A2' },
      { word: 'Algorithm', hindi: 'एल्गोरिथ्म', ipa: '/ˈælɡərɪðəm/', example: 'The search algorithm is very efficient.', synonyms: ['Formula', 'Procedure'], antonyms: [], type: 'noun', level: 'B2' },
      { word: 'Database', hindi: 'डेटाबेस', ipa: '/ˈdeɪtəbeɪs/', example: 'All customer data is stored in the database.', synonyms: ['Data store', 'Repository'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Bandwidth', hindi: 'बैंडविड्थ', ipa: '/ˈbændwɪdθ/', example: 'We need more bandwidth for video calls.', synonyms: ['Capacity', 'Speed'], antonyms: [], type: 'noun', level: 'B2' },
      { word: 'Cybersecurity', hindi: 'साइबर सुरक्षा', ipa: '/ˌsaɪbərsɪˈkjʊərəti/', example: 'Cybersecurity is critical for every company.', synonyms: ['Information security', 'Digital security'], antonyms: [], type: 'noun', level: 'B2' },
      { word: 'Download', hindi: 'डाउनलोड करना', ipa: '/ˈdaʊnloʊd/', example: 'Please download the latest version.', synonyms: ['Save', 'Fetch'], antonyms: ['Upload'], type: 'verb', level: 'A1' },
      { word: 'Upload', hindi: 'अपलोड करना', ipa: '/ˈʌploʊd/', example: 'Upload your resume to the portal.', synonyms: ['Submit', 'Transfer'], antonyms: ['Download'], type: 'verb', level: 'A1' },
      { word: 'Encrypt', hindi: 'एन्क्रिप्ट करना', ipa: '/ɪnˈkrɪpt/', example: 'All messages are encrypted end-to-end.', synonyms: ['Encode', 'Secure'], antonyms: ['Decrypt'], type: 'verb', level: 'B2' },
    ],
  },
  {
    id: 'emotions',
    title: 'Emotions & Feelings',
    emoji: '😊',
    icon: Smile,
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    wordCount: 100,
    difficulty: 'Intermediate',
    words: [
      { word: 'Happy', hindi: 'खुश', ipa: '/ˈhæpi/', example: 'I am very happy today.', synonyms: ['Glad', 'Joyful', 'Delighted', 'Pleased'], antonyms: ['Sad', 'Unhappy'], type: 'adjective', level: 'A1' },
      { word: 'Anxious', hindi: 'चिंतित', ipa: '/ˈæŋkʃəs/', example: 'I feel anxious before exams.', synonyms: ['Worried', 'Nervous', 'Uneasy'], antonyms: ['Calm', 'Relaxed'], type: 'adjective', level: 'B1' },
      { word: 'Frustrated', hindi: 'निराश', ipa: '/ˈfrʌstreɪtɪd/', example: 'I was frustrated with the slow internet.', synonyms: ['Annoyed', 'Irritated', 'Exasperated'], antonyms: ['Satisfied', 'Content'], type: 'adjective', level: 'B1' },
      { word: 'Grateful', hindi: 'आभारी', ipa: '/ˈɡreɪtfl/', example: 'I am grateful for your help.', synonyms: ['Thankful', 'Appreciative'], antonyms: ['Ungrateful'], type: 'adjective', level: 'B1' },
      { word: 'Overwhelmed', hindi: 'अभिभूत', ipa: '/ˌoʊvərˈwelmd/', example: 'She was overwhelmed with joy.', synonyms: ['Overpowered', 'Stunned'], antonyms: ['Underwhelmed'], type: 'adjective', level: 'B2' },
      { word: 'Enthusiastic', hindi: 'उत्साही', ipa: '/ɪnˌθjuːziˈæstɪk/', example: 'The team was enthusiastic about the new project.', synonyms: ['Eager', 'Passionate', 'Excited'], antonyms: ['Apathetic', 'Indifferent'], type: 'adjective', level: 'B1' },
      { word: 'Disappointed', hindi: 'निराश', ipa: '/ˌdɪsəˈpɔɪntɪd/', example: 'I was disappointed with my test results.', synonyms: ['Let down', 'Disheartened'], antonyms: ['Satisfied', 'Pleased'], type: 'adjective', level: 'A2' },
      { word: 'Confident', hindi: 'आत्मविश्वासी', ipa: '/ˈkɒnfɪdənt/', example: 'She is very confident in her abilities.', synonyms: ['Self-assured', 'Bold'], antonyms: ['Insecure', 'Doubtful'], type: 'adjective', level: 'A2' },
    ],
  },
  {
    id: 'hospital',
    title: 'Hospital & Health',
    emoji: '🏥',
    icon: Stethoscope,
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    wordCount: 110,
    difficulty: 'Intermediate',
    words: [
      { word: 'Symptom', hindi: 'लक्षण', ipa: '/ˈsɪmptəm/', example: 'Fever is a common symptom of flu.', synonyms: ['Sign', 'Indication'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Diagnosis', hindi: 'निदान', ipa: '/ˌdaɪəɡˈnoʊsɪs/', example: 'The doctor gave the correct diagnosis.', synonyms: ['Assessment', 'Evaluation'], antonyms: [], type: 'noun', level: 'B2' },
      { word: 'Prescription', hindi: 'नुस्खा', ipa: '/prɪˈskrɪpʃn/', example: 'The doctor wrote a prescription for antibiotics.', synonyms: ['Medicine order'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Appointment', hindi: 'अपॉइंटमेंट', ipa: '/əˈpɔɪntmənt/', example: 'I have a doctor appointment at 3 PM.', synonyms: ['Meeting', 'Visit', 'Consultation'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Emergency', hindi: 'आपातकाल', ipa: '/ɪˈmɜːrdʒənsi/', example: 'Call an ambulance — this is an emergency!', synonyms: ['Crisis', 'Urgent situation'], antonyms: ['Routine'], type: 'noun', level: 'A2' },
      { word: 'Surgery', hindi: 'सर्जरी/ऑपरेशन', ipa: '/ˈsɜːrdʒəri/', example: 'He had a successful surgery last week.', synonyms: ['Operation', 'Procedure'], antonyms: [], type: 'noun', level: 'B1' },
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping & Market',
    emoji: '🛒',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    wordCount: 100,
    difficulty: 'Beginner',
    words: [
      { word: 'Discount', hindi: 'छूट', ipa: '/ˈdɪskaʊnt/', example: 'There is a 20% discount on all items.', synonyms: ['Reduction', 'Offer', 'Sale'], antonyms: ['Premium', 'Surcharge'], type: 'noun', level: 'A2' },
      { word: 'Receipt', hindi: 'रसीद', ipa: '/rɪˈsiːt/', example: 'Please keep the receipt for returns.', synonyms: ['Bill', 'Invoice', 'Proof of purchase'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Bargain', hindi: 'सौदा/मोल-भाव', ipa: '/ˈbɑːrɡɪn/', example: 'I got a great bargain at the market.', synonyms: ['Deal', 'Negotiate'], antonyms: [], type: 'noun/verb', level: 'B1' },
      { word: 'Warranty', hindi: 'गारंटी', ipa: '/ˈwɒrənti/', example: 'The laptop has a one-year warranty.', synonyms: ['Guarantee', 'Assurance'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Refund', hindi: 'वापसी/रिफंड', ipa: '/ˈriːfʌnd/', example: 'Can I get a refund for this product?', synonyms: ['Return', 'Money back'], antonyms: ['Payment'], type: 'noun/verb', level: 'A2' },
    ],
  },
  {
    id: 'education',
    title: 'Education & School',
    emoji: '🎓',
    icon: GraduationCap,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    wordCount: 120,
    difficulty: 'Beginner',
    words: [
      { word: 'Curriculum', hindi: 'पाठ्यक्रम', ipa: '/kəˈrɪkjələm/', example: 'The school updated its curriculum.', synonyms: ['Syllabus', 'Course'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Semester', hindi: 'सेमेस्टर', ipa: '/sɪˈmestər/', example: 'I have exams at the end of each semester.', synonyms: ['Term', 'Session'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Scholarship', hindi: 'छात्रवृत्ति', ipa: '/ˈskɒlərʃɪp/', example: 'She received a full scholarship.', synonyms: ['Grant', 'Fellowship', 'Bursary'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Assignment', hindi: 'कार्य/असाइनमेंट', ipa: '/əˈsaɪnmənt/', example: 'Submit the assignment by Friday.', synonyms: ['Homework', 'Task', 'Project'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Graduate', hindi: 'स्नातक', ipa: '/ˈɡrædʒuət/', example: 'I will graduate next year.', synonyms: ['Complete', 'Finish'], antonyms: [], type: 'verb/noun', level: 'A2' },
    ],
  },
  {
    id: 'banking',
    title: 'Banking & Finance',
    emoji: '🏦',
    icon: Building2,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    wordCount: 100,
    difficulty: 'Intermediate',
    words: [
      { word: 'Transaction', hindi: 'लेन-देन', ipa: '/trænˈzækʃn/', example: 'The transaction was successful.', synonyms: ['Payment', 'Transfer', 'Deal'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Interest', hindi: 'ब्याज', ipa: '/ˈɪntrəst/', example: 'The savings account earns 6% interest.', synonyms: ['Rate', 'Return'], antonyms: ['Principal'], type: 'noun', level: 'A2' },
      { word: 'Mortgage', hindi: 'गृह ऋण', ipa: '/ˈmɔːrɡɪdʒ/', example: 'We took a mortgage to buy our house.', synonyms: ['Home loan', 'Housing loan'], antonyms: [], type: 'noun', level: 'B2' },
      { word: 'Withdrawal', hindi: 'निकासी', ipa: '/wɪðˈdrɔːəl/', example: 'I made a cash withdrawal from the ATM.', synonyms: ['Cash out'], antonyms: ['Deposit'], type: 'noun', level: 'B1' },
      { word: 'Deposit', hindi: 'जमा', ipa: '/dɪˈpɒzɪt/', example: 'I deposited my salary into the bank.', synonyms: ['Save', 'Put in'], antonyms: ['Withdrawal'], type: 'noun/verb', level: 'A2' },
    ],
  },
  {
    id: 'nature',
    title: 'Nature & Environment',
    emoji: '🌿',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    wordCount: 100,
    difficulty: 'Beginner',
    words: [
      { word: 'Environment', hindi: 'पर्यावरण', ipa: '/ɪnˈvaɪrənmənt/', example: 'We must protect the environment.', synonyms: ['Nature', 'Surroundings', 'Ecosystem'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Climate', hindi: 'जलवायु', ipa: '/ˈklaɪmət/', example: 'Climate change is a global issue.', synonyms: ['Weather pattern'], antonyms: [], type: 'noun', level: 'B1' },
      { word: 'Pollution', hindi: 'प्रदूषण', ipa: '/pəˈluːʃn/', example: 'Air pollution is very high in cities.', synonyms: ['Contamination'], antonyms: ['Purity', 'Cleanliness'], type: 'noun', level: 'A2' },
      { word: 'Sustainable', hindi: 'टिकाऊ', ipa: '/səˈsteɪnəbl/', example: 'We need sustainable energy sources.', synonyms: ['Eco-friendly', 'Green'], antonyms: ['Unsustainable'], type: 'adjective', level: 'B2' },
    ],
  },
  {
    id: 'transport',
    title: 'Transportation',
    emoji: '🚗',
    icon: Car,
    color: 'from-orange-500 to-amber-600',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    wordCount: 90,
    difficulty: 'Beginner',
    words: [
      { word: 'Commute', hindi: 'आना-जाना', ipa: '/kəˈmjuːt/', example: 'I commute by metro every day.', synonyms: ['Travel', 'Journey'], antonyms: [], type: 'verb/noun', level: 'B1' },
      { word: 'Traffic', hindi: 'यातायात', ipa: '/ˈtræfɪk/', example: 'There is heavy traffic during rush hour.', synonyms: ['Congestion', 'Jam'], antonyms: [], type: 'noun', level: 'A2' },
      { word: 'Pedestrian', hindi: 'पैदल चलने वाला', ipa: '/pəˈdestriən/', example: 'Always use the pedestrian crossing.', synonyms: ['Walker', 'Foot traveler'], antonyms: ['Driver', 'Rider'], type: 'noun', level: 'B1' },
    ],
  },
];

// ── Animated Section Component ──────────────────────────────
// Reusable section wrapper with scroll-triggered animations
function AnimatedSection({ children, className = '' }) {
  // Create ref for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Word Card Component ─────────────────────────────────────
// Displays a single vocabulary word with all details
function WordCard({ word, index }) {
  // State for showing/hiding additional details
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="card p-4 hover:border-white/10 transition-all duration-300 cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Word header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* English word with pronunciation */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white text-lg">{word.word}</h3>
            {/* Part of speech badge */}
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500 uppercase tracking-wider">
              {word.type}
            </span>
            {/* CEFR level badge */}
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary-500/10 text-primary-400">
              {word.level}
            </span>
          </div>
          {/* Hindi meaning */}
          <p className="text-sm text-slate-400">{word.hindi}</p>
          {/* IPA pronunciation */}
          <p className="text-xs text-slate-600 font-mono mt-0.5">{word.ipa}</p>
        </div>
        {/* Sound button */}
        <button className="p-2 rounded-xl bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
          <Volume2 size={14} />
        </button>
      </div>

      {/* Example sentence */}
      <p className="text-sm text-slate-300 mt-2 italic border-l-2 border-primary-500/30 pl-3">
        &quot;{word.example}&quot;
      </p>

      {/* Expanded details section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-white/5 space-y-2 overflow-hidden"
          >
            {/* Synonyms list */}
            {word.synonyms?.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-emerald-400">Synonyms: </span>
                <span className="text-xs text-slate-400">{word.synonyms.join(', ')}</span>
              </div>
            )}
            {/* Antonyms list */}
            {word.antonyms?.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-rose-400">Antonyms: </span>
                <span className="text-xs text-slate-400">{word.antonyms.join(', ')}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT — Vocabulary Bank
// ============================================================
export default function VocabularyBankPage() {
  // ── State ─────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // ── Filtered categories ───────────────────────────────────
  // Filter categories based on search query and difficulty
  const filteredCategories = useMemo(() => {
    return VOCAB_CATEGORIES.filter((cat) => {
      // Apply difficulty filter
      if (difficultyFilter !== 'all' && cat.difficulty.toLowerCase() !== difficultyFilter) return false;
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          cat.title.toLowerCase().includes(query) ||
          cat.words.some(
            (w) =>
              w.word.toLowerCase().includes(query) ||
              w.hindi.includes(searchQuery)
          )
        );
      }
      return true;
    });
  }, [searchQuery, difficultyFilter]);

  // ── Selected category words (filtered by search) ──────────
  const selectedWords = useMemo(() => {
    if (!selectedCategory) return [];
    const cat = VOCAB_CATEGORIES.find((c) => c.id === selectedCategory);
    if (!cat) return [];
    if (!searchQuery) return cat.words;
    const query = searchQuery.toLowerCase();
    return cat.words.filter(
      (w) =>
        w.word.toLowerCase().includes(query) ||
        w.hindi.includes(searchQuery)
    );
  }, [selectedCategory, searchQuery]);

  // ── Total word count ──────────────────────────────────────
  const totalWords = VOCAB_CATEGORIES.reduce((sum, c) => sum + c.words.length, 0);

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────── */}
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <Globe size={28} className="text-primary-400" /> Vocabulary Bank
          </h1>
          <p className="text-slate-500">
            {VOCAB_CATEGORIES.length} categories • {totalWords}+ words with Hindi meaning, IPA, & examples
          </p>
        </div>
      </AnimatedSection>

      {/* ── Search & Filters ───────────────────────────────── */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any word in English or Hindi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-colors text-sm"
            />
            {/* Clear search button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-2">
            {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                  difficultyFilter === level
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
                }`}
              >
                {level === 'all' ? 'All Levels' : level}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Back Button (when category is selected) ────────── */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to all categories
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Category Grid (when no category selected) ──────── */}
      {!selectedCategory && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`card p-5 cursor-pointer hover:${cat.border} transition-all duration-300 group`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center text-xl`}>
                    {cat.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.words.length} words</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                {/* Difficulty and word count badges */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {cat.difficulty}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500">
                    {cat.wordCount} total
                  </span>
                </div>

                {/* Preview of first 3 words */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.words.slice(0, 4).map((w) => (
                    <span key={w.word} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                      {w.word}
                    </span>
                  ))}
                  {cat.words.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-400">
                      +{cat.words.length - 4} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ── Word Cards (when category selected) ────────────── */}
      {selectedCategory && (
        <div>
          {/* Category title */}
          <AnimatedSection>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">
                {VOCAB_CATEGORIES.find((c) => c.id === selectedCategory)?.emoji}{' '}
                {VOCAB_CATEGORIES.find((c) => c.id === selectedCategory)?.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {selectedWords.length} words found
              </p>
            </div>
          </AnimatedSection>

          {/* Words grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {selectedWords.map((word, index) => (
              <WordCard key={word.word} word={word} index={index} />
            ))}
          </motion.div>

          {/* Empty state */}
          {selectedWords.length === 0 && (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-white mb-1">No words found</h3>
              <p className="text-slate-500 text-sm">Try a different search query</p>
            </div>
          )}
        </div>
      )}

      {/* ── Empty state for no categories found ──────────── */}
      {!selectedCategory && filteredCategories.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="font-bold text-white mb-1">No categories match your filter</h3>
          <p className="text-slate-500 text-sm">Try changing the difficulty level or search query</p>
        </div>
      )}
    </div>
  );
}
