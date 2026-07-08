'use client';
// Vocabulary Day Page — Interactive flashcard session for a specific day's vocabulary
// Features: flippable cards, TTS text-to-speech pronunciation, mastered state tracking, confetti

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, Volume2, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import useUserStore from '@/store/userStore';
import { getTopicByDay } from '@/lib/topics';

// Direct data matching VOCABULARY_DATA in app/(main)/vocabulary/page.js
const VOCABULARY_DATA = [
  { word:'usually', hindi:'आमतौर पर', ipa:'/ˈjuːʒuəli/', meaning:'most of the time', example:'I usually wake up at 7 AM.', officeEx:'We usually have a morning standup.', category:'Daily Life', day:1, difficulty:'easy' },
  { word:'always',  hindi:'हमेशा',     ipa:'/ˈɔːlweɪz/', meaning:'at all times',     example:'She always smiles.',           officeEx:'Always send a confirmation email.', category:'Daily Life', day:1, difficulty:'easy' },
  { word:'often',   hindi:'अक्सर',     ipa:'/ˈɒf(ə)n/', meaning:'many times',       example:'They often play cricket.',     officeEx:'He often works late.',             category:'Daily Life', day:1, difficulty:'easy' },
  { word:'sometimes',hindi:'कभी-कभी',  ipa:'/ˈsʌmtaɪmz/',meaning:'occasionally',   example:'I sometimes cook at home.',    officeEx:'We sometimes work from home.',     category:'Daily Life', day:1, difficulty:'easy' },
  { word:'never',   hindi:'कभी नहीं',  ipa:'/ˈnevə/',   meaning:'not at any time',  example:'I never lie.',                  officeEx:'Never miss a deadline.',          category:'Daily Life', day:1, difficulty:'easy' },
  { word:'introduce',hindi:'परिचय देना',ipa:'/ˌɪntrəˈdjuːs/',meaning:'to present someone',example:'Let me introduce myself.',officeEx:'Please introduce the new team member.',category:'Speaking',day:2,difficulty:'easy'},
  { word:'profession',hindi:'पेशा',    ipa:'/prəˈfɛʃ(ə)n/',meaning:'job or occupation',example:'My profession is engineering.',officeEx:'Your profession determines your salary.',category:'Office',day:2,difficulty:'easy'},
  { word:'passionate',hindi:'जोशीला',  ipa:'/ˈpaʃ(ə)nɪt/',meaning:'having strong feelings about',example:'I am passionate about learning.',officeEx:'Be passionate about your work.',category:'Speaking',day:2,difficulty:'medium'},
  { word:'currently',hindi:'फिलहाल',   ipa:'/ˈkʌr(ə)ntli/',meaning:'at the present time',example:'I am currently in Delhi.',officeEx:'I am currently working on the project.',category:'Daily Life',day:2,difficulty:'easy'},
  { word:'aspire',  hindi:'आकांक्षा रखना',ipa:'/əˈspaɪə/',meaning:'to have a strong desire',example:'I aspire to become a manager.',officeEx:'We aspire to be the best team.',category:'Professional',day:2,difficulty:'medium'},
  { word:'command', hindi:'आदेश',      ipa:'/kəˈmɑːnd/', meaning:'an order',         example:'"Stand up!" is a command.',     officeEx:'The manager commands the team.',    category:'Grammar',  day:3, difficulty:'easy' },
  { word:'polite',  hindi:'विनम्र',    ipa:'/pəˈlaɪt/',  meaning:'having good manners',example:'Always be polite.',            officeEx:'Be polite in meetings.',            category:'Speaking', day:3, difficulty:'easy' },
  { word:'advise',  hindi:'सलाह देना', ipa:'/ədˈvaɪz/',  meaning:'to recommend',     example:'I advise you to rest.',         officeEx:'I advise you to document the steps.',category:'Speaking',day:3,difficulty:'medium'},
  { word:'confident',hindi:'आत्मविश्वासी',ipa:'/ˈkɒnfɪd(ə)nt/',meaning:'sure of oneself',example:'She is very confident.',   officeEx:'Be confident in your presentation.',category:'Speaking',day:4,difficulty:'easy'},
  { word:'excited', hindi:'उत्साहित',  ipa:'/ɪkˈsaɪtɪd/',meaning:'feeling happy and enthusiastic',example:'We are excited about the trip.',officeEx:'The team is excited about the launch.',category:'Daily Life',day:4,difficulty:'easy'},
  { word:'determined',hindi:'दृढ़ निश्चयी',ipa:'/dɪˈtɜːmɪnd/',meaning:'firmly decided',example:'You are very determined.',   officeEx:'Stay determined to meet the target.',category:'Professional',day:4,difficulty:'medium'},
  { word:'possess', hindi:'स्वामित्व रखना',ipa:'/pəˈzɛs/',meaning:'to own or have',   example:'She possesses great skills.', officeEx:'He possesses the required qualifications.',category:'Grammar',day:6,difficulty:'medium'},
  { word:'acquire', hindi:'हासिल करना', ipa:'/əˈkwaɪə/', meaning:'to obtain',         example:'I want to acquire new skills.',officeEx:'We need to acquire new clients.',   category:'Business', day:6, difficulty:'medium'},
  { word:'retain',  hindi:'बनाए रखना',  ipa:'/rɪˈteɪn/', meaning:'to keep or maintain',example:'Retain your composure.',      officeEx:'Retain top talent in the company.',category:'Business',day:6,difficulty:'medium'},
  { word:'previously',hindi:'पहले',    ipa:'/ˈpriːvɪəsli/',meaning:'at an earlier time',example:'I had previously worked there.',officeEx:'Previously, we used a different tool.',category:'Grammar',day:7,difficulty:'medium'},
  { word:'accomplish',hindi:'सफलतापूर्वक करना',ipa:'/əˈkɒmplɪʃ/',meaning:'to succeed in doing',example:'We will have accomplished it.',officeEx:'We accomplished the quarterly goal.',category:'Business',day:8,difficulty:'medium'},
  { word:'available',hindi:'उपलब्ध',   ipa:'/əˈveɪləb(ə)l/',meaning:'able to be used',example:'Is there parking available?',  officeEx:'Are you available for a meeting?',  category:'Office',   day:9, difficulty:'easy' },
  { word:'sufficient',hindi:'पर्याप्त', ipa:'/səˈfɪʃ(ə)nt/',meaning:'enough',          example:'There is sufficient food.',    officeEx:'We have sufficient resources.',      category:'Grammar',  day:9, difficulty:'medium'},
  { word:'shortage',hindi:'कमी',       ipa:'/ˈʃɔːtɪdʒ/', meaning:'lack of something', example:'There is a shortage of water.',officeEx:'We face a shortage of skilled workers.',category:'Business',day:9,difficulty:'medium'},
  { word:'desire',  hindi:'इच्छा',     ipa:'/dɪˈzaɪə/',  meaning:'a strong wish',     example:'I desire to speak fluently.',  officeEx:'Express your desire for promotion.',category:'Speaking',day:11,difficulty:'easy'},
  { word:'require', hindi:'ज़रूरत होना', ipa:'/rɪˈkwaɪə/',meaning:'to need',            example:'You require a lot of practice.',officeEx:'The job requires 3 years experience.',category:'Office',day:11,difficulty:'easy'},
  { word:'allow',   hindi:'अनुमति देना',ipa:'/əˈlaʊ/',   meaning:'to permit',          example:'Please allow me to explain.',   officeEx:'I allow the team to take decisions.', category:'Office',day:13,difficulty:'easy'},
  { word:'suggest', hindi:'सुझाव देना', ipa:'/səˈdʒɛst/', meaning:'to propose an idea',example:"Let's take a short break.",     officeEx:"I suggest we postpone the meeting.", category:'Speaking',day:14,difficulty:'easy'},
  { word:'prefer',  hindi:'पसंद करना',  ipa:'/prɪˈfɜː/',  meaning:'to like better',    example:'I would like to have coffee.',  officeEx:'I prefer email over phone calls.',  category:'Speaking',day:15,difficulty:'easy'},
  { word:'ability', hindi:'क्षमता',    ipa:'/əˈbɪlɪti/', meaning:'the power to do something',example:'I can speak 3 languages.',officeEx:'She has the ability to lead teams.',  category:'Grammar',  day:16, difficulty:'easy' },
  { word:'recommend',hindi:'सिफारिश करना',ipa:'/ˌrɛkəˈmɛnd/',meaning:'to suggest as good',example:'I should go to a doctor.',  officeEx:'I recommend this approach.',         category:'Speaking',day:17,difficulty:'medium'},
  { word:'possibility',hindi:'संभावना', ipa:'/ˌpɒsɪˈbɪlɪti/',meaning:'a chance that something may happen',example:'It may rain today.',officeEx:'There is a possibility of delay.',category:'Grammar',day:18,difficulty:'medium'},
  { word:'obligation',hindi:'दायित्व',  ipa:'/ˌɒblɪˈɡeɪʃ(ə)n/',meaning:'a duty or requirement',example:'You must follow the rules.',officeEx:'It is your obligation to file the report.',category:'Grammar',day:19,difficulty:'hard'},
  { word:'habitual', hindi:'आदतन',      ipa:'/həˈbɪtʃuəl/',meaning:'done regularly as a habit',example:'I used to wake up early.',officeEx:'Habitual latecomer faces action.',   category:'Grammar',day:21,difficulty:'medium'},
  { word:'regret',  hindi:'पछतावा',    ipa:'/rɪˈɡrɛt/',  meaning:'feel sorry about',  example:'I should have studied harder.', officeEx:'I regret missing the deadline.',    category:'Speaking',day:23,difficulty:'medium'},
  { word:'possibility',hindi:'संभावना', ipa:'/ˌpɒsɪˈbɪlɪti/',meaning:'a chance',       example:'May have left early.',          officeEx:'The project may have been delayed.', category:'Grammar',day:27,difficulty:'medium'},
  { word:'determine',hindi:'तय करना',   ipa:'/dɪˈtɜːmɪn/',meaning:'to decide or establish',example:'Will you finish by Friday?',  officeEx:'Let\'s determine the scope first.',  category:'Business',day:29,difficulty:'medium'},
  { word:'tense',   hindi:'काल',       ipa:'/tɛns/',      meaning:'time of an action', example:'Simple present is easy.',       officeEx:'Use past tense in formal reports.',  category:'Grammar',day:32,difficulty:'easy'},
  { word:'preposition',hindi:'संबंधसूचक अव्यय',ipa:'/ˌprɛpəˈzɪʃ(ə)n/',meaning:'shows relation between words',example:'The book is on the table.',officeEx:'Report to the manager by Monday.',category:'Grammar',day:36,difficulty:'medium'},
  { word:'obligation',hindi:'बाध्यता',  ipa:'/ˌɒblɪˈɡeɪʃ(ə)n/',meaning:'must do something',example:'I have to attend the meeting.',officeEx:'Employees have to submit timesheets.',category:'Grammar',day:38,difficulty:'medium'},
  { word:'conjunction',hindi:'समुच्चयबोधक अव्यय',ipa:'/kənˈdʒʌŋkʃ(ə)n/',meaning:'word that joins clauses',example:'I am tired but happy.',officeEx:'The project is done but needs review.',category:'Grammar',day:47,difficulty:'easy'},
  { word:'passive',  hindi:'कर्मवाच्य', ipa:'/ˈpasɪv/',   meaning:'verb form when subject receives action',example:'The work is done by him.',officeEx:'The report was written by the analyst.',category:'Grammar',day:49,difficulty:'hard'},
  { word:'vocabulary',hindi:'शब्द भंडार',ipa:'/vəˈkæbjʊləri/',meaning:'all words of a language',example:'Build your vocabulary daily.',officeEx:'Professional vocabulary is key to success.',category:'Grammar',day:55,difficulty:'easy'},
  { word:'idiom',   hindi:'मुहावरा',    ipa:'/ˈɪdɪəm/',   meaning:'phrase with non-literal meaning',example:"It's raining cats and dogs.",officeEx:'Think outside the box!',           category:'Grammar',day:54,difficulty:'medium'},
  { word:'fluent',  hindi:'धाराप्रवाह',ipa:'/ˈfluːənt/', meaning:'speaking easily',  example:'She speaks English fluently.',   officeEx:'We need a fluent English speaker.',  category:'Speaking',day:1,difficulty:'easy'},
  { word:'confidence',hindi:'आत्मविश्वास',ipa:'/ˈkɒnfɪd(ə)ns/',meaning:'belief in oneself',example:'Speak with confidence!',    officeEx:'Confidence impresses the interviewer.',category:'Speaking',day:1,difficulty:'easy'},
  { word:'communicate',hindi:'संपर्क करना',ipa:'/kəˈmjuːnɪkeɪt/',meaning:'to share information',example:'Communicate clearly.',   officeEx:'Always communicate updates to the team.',category:'Professional',day:1,difficulty:'medium'},
  { word:'professional',hindi:'पेशेवर', ipa:'/prəˈfɛʃ(ə)n(ə)l/',meaning:'expert or skilled',example:'He speaks in a professional tone.',officeEx:'Maintain professional behavior in meetings.',category:'Professional',day:1,difficulty:'medium'},
  { word:'effective', hindi:'प्रभावी',  ipa:'/ɪˈfɛktɪv/', meaning:'producing good results',example:'This is an effective method.',officeEx:'The training was highly effective.',   category:'Business',day:1,difficulty:'medium'},
  { word:'implement',hindi:'लागू करना',  ipa:'/ˈɪmplɪmɛnt/',meaning:'to put into action',example:'Let\'s implement this plan.',  officeEx:'We need to implement the new policy.',category:'Business',day:1,difficulty:'medium'},
  { word:'strategy', hindi:'रणनीति',    ipa:'/ˈstratɪdʒi/',meaning:'a plan of action',  example:'We need a new strategy.',      officeEx:'What is your business strategy?',    category:'Business',day:1,difficulty:'medium'},
  { word:'achieve',  hindi:'प्राप्त करना',ipa:'/əˈtʃiːv/',meaning:'to succeed in reaching',example:'I will achieve my goal.',    officeEx:'Achieve your targets this quarter.',  category:'Professional',day:1,difficulty:'easy'},
  { word:'opportunity',hindi:'अवसर',    ipa:'/ˌɒpəˈtjuːnɪti/',meaning:'a chance to do something',example:'This is a great opportunity.',officeEx:'Never miss an opportunity to grow.',category:'Professional',day:1,difficulty:'easy'},
  { word:'collaborate',hindi:'सहयोग करना',ipa:'/kəˈlabəreɪt/',meaning:'to work together',example:'Let\'s collaborate on this.',  officeEx:'Teams must collaborate to deliver.',  category:'Business',day:1,difficulty:'hard'},
  { word:'deadline', hindi:'समय सीमा',  ipa:'/ˈdɛdlʌɪn/', meaning:'the latest time for completion',example:'Submit before the deadline.',officeEx:'The project deadline is Friday.',   category:'Office',day:1,difficulty:'easy'},
  { word:'presentation',hindi:'प्रस्तुति',ipa:'/ˌprɛz(ə)nˈteɪʃ(ə)n/',meaning:'formal showing of information',example:'I prepared a presentation.',officeEx:'The client presentation went well.',category:'Office',day:1,difficulty:'medium'},
  { word:'negotiate',hindi:'बातचीत करना',ipa:'/nɪˈɡəʊʃɪeɪt/',meaning:'to discuss to reach agreement',example:'We need to negotiate terms.',officeEx:'Negotiate the salary professionally.',category:'Business',day:1,difficulty:'hard'},
  { word:'feedback',  hindi:'प्रतिक्रिया',ipa:'/ˈfiːdbak/',meaning:'response to work done',example:'Please give me feedback.',    officeEx:'Constructive feedback improves performance.',category:'Office',day:1,difficulty:'easy'},
  { word:'priority',  hindi:'प्राथमिकता',ipa:'/praɪˈɒrɪti/',meaning:'most important thing first',example:'What is your priority today?',officeEx:'Customer satisfaction is our top priority.',category:'Office',day:1,difficulty:'medium'},
  { word:'accurate',  hindi:'सटीक',     ipa:'/ˈakjʊrɪt/', meaning:'correct and exact',  example:'Give accurate information.',   officeEx:'Accurate data is crucial for reports.',category:'Professional',day:1,difficulty:'medium'},
  { word:'summarize', hindi:'सारांश निकालना',ipa:'/ˈsʌməraɪz/',meaning:'to give a brief account',example:'Summarize the lesson.',   officeEx:'Please summarize the meeting notes.',  category:'Writing',day:1,difficulty:'medium'},
  { word:'agenda',    hindi:'कार्यसूची',  ipa:'/əˈdʒɛndə/', meaning:'list of items to discuss',example:'What is on the agenda?',   officeEx:'Share the meeting agenda in advance.',  category:'Office',day:1,difficulty:'medium'},
  { word:'resolution',hindi:'संकल्प',    ipa:'/ˌrɛzəˈluːʃ(ə)n/',meaning:'firm decision or solution',example:'A resolution was reached.',officeEx:'The conflict needs a swift resolution.',category:'Business',day:1,difficulty:'hard'},
];

// Fallback vocabulary generator for day matching to keep content active
function getVocabForDay(dayNum) {
  const dayWords = VOCABULARY_DATA.filter((w) => w.day === dayNum);
  if (dayWords.length > 0) return dayWords;
  
  return [
    { word: 'explore', hindi: 'खोजना / घूमना', ipa: '/ɪkˈsplɔː/', meaning: 'to travel to search or learn', example: 'Let\'s explore the grammar rules.', category: 'Daily Life', day: dayNum },
    { word: 'understand', hindi: 'समझना', ipa: '/ˌʌndəˈstænd/', meaning: 'to perceive the significance of', example: 'Do you understand this day\'s topic?', category: 'Grammar', day: dayNum },
    { word: 'practice', hindi: 'अभ्यास करना', ipa: '/ˈpraktɪs/', meaning: 'to perform repeatedly to acquire skill', example: 'Practice makes you a perfect speaker.', category: 'Speaking', day: dayNum },
    { word: 'improve', hindi: 'सुधारना', ipa: '/ɪmˈpruːv/', meaning: 'to make or become better', example: 'I want to improve my accent.', category: 'Speaking', day: dayNum },
    { word: 'fluent', hindi: 'धाराप्रवाह', ipa: '/ˈfluːənt/', meaning: 'able to express oneself easily', example: 'Our goal is to speak fluently.', category: 'Speaking', day: dayNum },
  ];
}

export default function VocabularyDayPage() {
  const params  = useParams();
  const dayNum  = parseInt(String(params?.daySlug || 'day-1').replace(/^day-/, '') || '1', 10);
  const topic   = getTopicByDay(dayNum);
  
  const words = useMemo(() => getVocabForDay(dayNum), [dayNum]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState({});
  const [sessionDone, setSessionDone] = useState(false);

  const { addXP, addWordsLearned } = useUserStore();

  const currentWord = words[index];
  const totalWords = words.length;
  const masteredCount = Object.values(mastered).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / totalWords) * 100);

  const speak = (txt) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(txt);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    // Dispatch sound event for UI feedback
    window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: 'correct' } }));
  };

  const handleNext = () => {
    setFlipped(false);
    if (index < totalWords - 1) {
      setIndex(i => i + 1);
    } else {
      // Completed session
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      addXP(50); // Completed session XP bonus
      addWordsLearned(totalWords);
      setSessionDone(true);
    }
  };

  const toggleMastered = (idx) => {
    setMastered(p => {
      const next = { ...p, [idx]: !p[idx] };
      if (!p[idx]) {
        addXP(5);
      }
      return next;
    });
  };

  if (!topic) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">❓</div>
        <h2 className="text-xl font-bold text-white mb-2">Day not found</h2>
        <Link href="/75-days-challenge" className="btn-primary">← Back to Challenge</Link>
      </div>
    );
  }

  if (sessionDone) {
    return (
      <div className="max-w-md mx-auto card p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-4xl mx-auto mb-4">
          🏆
        </div>
        <h2 className="text-3xl font-black text-white">Daily Vocabulary Complete!</h2>
        <p className="text-slate-400">
          Superb! You studied all {totalWords} words for today and mastered them.
        </p>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-sm">
          +50 XP Study Reward claimed! ⚡
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setIndex(0); setSessionDone(false); setMastered({}); }}
            className="btn-secondary py-3 text-sm font-bold">
            Review Again
          </button>
          <Link href={`/75-days-challenge/${dayNum}`} className="btn-gradient py-3 text-sm font-bold flex items-center justify-center">
            Continue Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-white transition-colors">
          Day {dayNum}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Vocabulary</span>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="badge-primary text-xs">Day {dayNum} Vocabulary</span>
          <h2 className="text-2xl font-black text-white mt-1">{topic.title}</h2>
        </div>
        <Link href={`/75-days-challenge/${dayNum}`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* Progress meter */}
      <div className="card p-4 flex items-center justify-between bg-white/3 border-white/6">
        <div className="space-y-1">
          <p className="text-xs text-slate-500">Practice Session Progress</p>
          <p className="text-sm font-bold text-white">{masteredCount} of {totalWords} words mastered</p>
        </div>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Interactive Flippable Card */}
      <div className="relative" style={{ perspective: 1000, height: 260 }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          style={{ transformStyle: 'preserve-3d', position: 'absolute', inset: 0 }}
        >
          {/* Front Side */}
          <div 
            onClick={() => setFlipped(true)}
            className="absolute inset-0 card p-6 cursor-pointer backface-hidden flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Word {index + 1} of {totalWords}</span>
              <span className="badge-primary bg-primary-500/10 border border-primary-500/20 text-primary-300 text-[10px] uppercase font-bold tracking-wider">{currentWord.category || 'Vocabulary'}</span>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-black text-white tracking-tight">{currentWord.word}</h3>
              {currentWord.ipa && <p className="text-sm text-slate-400 font-mono select-none">{currentWord.ipa}</p>}
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                className="btn-secondary rounded-full w-10 h-10 flex items-center justify-center p-0 text-primary-400 hover:text-white"
                title="Hear Pronunciation"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-center text-xs text-slate-500 select-none">Tap to flip & view Hindi translation & meaning</p>
          </div>

          {/* Back Side */}
          <div 
            onClick={() => setFlipped(false)}
            className="absolute inset-0 card p-6 cursor-pointer bg-primary-500/5 border-primary-500/25 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-primary-300 font-bold uppercase tracking-wider">Meaning & Example</span>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMastered(index); }}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  mastered[index] 
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 size={12} />
                {mastered[index] ? 'Mastered!' : 'Mark Mastered'}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Hindi Translation</p>
                <p className="text-xl font-bold text-amber-200">{currentWord.hindi}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Definition</p>
                <p className="text-sm text-slate-200">{currentWord.meaning}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Example Sentence</p>
                <p className="text-xs text-emerald-300 italic">" {currentWord.example} "</p>
                {currentWord.officeEx && (
                  <p className="text-xs text-sky-300 italic mt-1">💼 " {currentWord.officeEx} "</p>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 select-none">Tap to flip back</p>
          </div>
        </motion.div>
      </div>

      {/* Nav Controls */}
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={() => { if (index > 0) { setIndex(i => i - 1); setFlipped(false); } }}
          disabled={index === 0}
          className="btn-secondary py-3 flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Prev Word
        </button>

        <button 
          onClick={handleNext}
          className="btn-gradient py-3 flex-1 flex items-center justify-center gap-2"
        >
          {index === totalWords - 1 ? 'Finish & Claim' : 'Next Word'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
