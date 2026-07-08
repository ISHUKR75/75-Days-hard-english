'use client';
// Pronunciation Lab — IPA, minimal pairs, word stress, connected speech
// Complete pronunciation training with real examples

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Volume2, ChevronRight, CheckCircle2, Zap, Target, BookOpen, Star, Copy, Check, ArrowRight } from 'lucide-react';

// ── Vowel Sounds ─────────────────────────────────────────────
const VOWEL_SOUNDS = [
  { ipa:'/iː/', word:'Meet, Feet, See',     hindi:'मीत, सी',    tip:'Lips spread wide — smile while saying it' },
  { ipa:'/ɪ/',  word:'Sit, Hit, Big',       hindi:'सिट, बिग',   tip:'Shorter than /iː/ — relax your lips' },
  { ipa:'/e/',  word:'Bed, Red, Said',      hindi:'बेड, रेड',   tip:'Open your mouth slightly' },
  { ipa:'/æ/',  word:'Cat, Hat, Bat',       hindi:'कैट, हैट',   tip:'Open wide — lower jaw drops' },
  { ipa:'/ɑː/', word:'Car, Farm, Heart',    hindi:'कार, फार्म', tip:'Long ah sound — like saying "aah" at doctor' },
  { ipa:'/ɒ/',  word:'Hot, Dog, Stop',      hindi:'हॉट, डॉग',  tip:'Rounded lips, open mouth' },
  { ipa:'/ɔː/', word:'Law, Ball, Call',     hindi:'लॉ, बॉल',   tip:'Very rounded lips, long sound' },
  { ipa:'/ʊ/',  word:'Book, Look, Cook',    hindi:'बुक, कुक',   tip:'Short — lips slightly rounded' },
  { ipa:'/uː/', word:'Food, Moon, True',    hindi:'फूड, मून',   tip:'Long — lips very rounded and forward' },
  { ipa:'/ʌ/',  word:'Cup, But, Love',      hindi:'कप, लव',     tip:'Central mouth — like a short "ah"' },
  { ipa:'/ɜː/', word:'Bird, Word, Girl',    hindi:'बर्ड, गर्ल', tip:'Tongue in middle — "er" sound, no R rolling' },
  { ipa:'/ə/',  word:'About, Teacher, The', hindi:'अबाउट',      tip:'Most common English sound — unstressed, relaxed' },
];

// ── Consonant Sounds (Common Indian Difficulties) ────────────
const CONSONANT_CHALLENGES = [
  { sound:'V vs W',   v_word:'Vine/Wine', issue:"Indians often say 'W' for both 'V' and 'W'",
    tip:"For V: bite your upper teeth on lower lip. For W: round lips without tooth contact",
    examples:[['Very', 'Wary'],['Vest', 'West'],['Vet', 'Wet'],['Vine', 'Wine']] },
  { sound:'TH sounds', v_word:'This/Thin', issue:"'TH' does not exist in Hindi — often replaced by D or T",
    tip:'Tongue between teeth or touching upper teeth from inside. Try to push air over tongue',
    examples:[['This (ð)', 'Dis ❌'],['Think (θ)', 'Tink ❌'],['The (ð)', 'De ❌'],['Three (θ)', 'Tree ❌']] },
  { sound:'Final Consonants', v_word:'Worked/Asked', issue:'Indians often add an extra vowel at the end',
    tip:"Silent ending — 'worked' = /wɜːkt/ not /wɜːkɪd/. Train your mouth to stop cleanly.",
    examples:[['Worked = /wɜːkt/', 'Workid ❌'],['Stopped = /stɒpt/', 'Stoppid ❌'],['Asked = /ɑːskt/', 'Askid ❌'],['Finished = /fɪnɪʃt/', 'Finishid ❌']] },
  { sound:'R sound', v_word:'Red/Read', issue:'Indian R is often rolled — English R is different',
    tip:"English R: tongue curls back slightly, doesn't touch roof of mouth, lips slightly rounded",
    examples:[['Right', 'Raight ❌'],['Read', 'Rread ❌'],['Around', 'Arround ❌'],['Work', 'Wark ❌']] },
  { sound:'L vs R', v_word:'Light/Right', issue:'Light and right sound similar to many Indians',
    tip:"L: tongue tip touches back of upper teeth. R: tongue curls up without touching.",
    examples:[['Light', 'Right'],['Lock', 'Rock'],['Lead', 'Read'],['Lamp', 'Ramp']] },
];

// ── Word Stress Rules ─────────────────────────────────────────
const WORD_STRESS_RULES = [
  {
    rule:'2-syllable NOUNS → stress on 1st syllable',
    examples:[
      { word:'PREsent (n)', wrong:'preSENT', right:'PREsent — "Here is a PREsent for you"' },
      { word:'REcord (n)',  wrong:'reCORD',  right:'REcord — "I broke the REcord"' },
      { word:'CONtest (n)', wrong:'conTEST', right:'CONtest — "Enter the CONtest"' },
    ],
  },
  {
    rule:'2-syllable VERBS → stress on 2nd syllable',
    examples:[
      { word:'preSENT (v)', wrong:'PREsent', right:'preSENT — "Let me preSENT my idea"' },
      { word:'reCORD (v)',  wrong:'REcord',  right:'reCORD — "Please reCORD this meeting"' },
      { word:'conTEST (v)', wrong:'CONtest', right:'conTEST — "We conTEST this decision"' },
    ],
  },
  {
    rule:'Words ending in -ion → stress on 2nd-to-last syllable',
    examples:[
      { word:'educaAtion',   wrong:'EDucation',  right:'eduCAtion — edu-CA-tion' },
      { word:'communicaAtion',wrong:'COMMunication',right:'communicAtion — communi-CA-tion' },
      { word:'presenTAtion', wrong:'PRESentation',right:'presentAtion — presen-TA-tion' },
    ],
  },
];

// ── Connected Speech Patterns ─────────────────────────────────
const CONNECTED_SPEECH = [
  {
    name:'Linking',
    desc:'When a word ends in a consonant and the next starts with a vowel — they link together',
    examples:[
      { written:'Turn it off',  spoken:'Tur-nit-off (one smooth flow)' },
      { written:'Come on in',   spoken:'Co-mo-nin' },
      { written:'Pick it up',   spoken:'Pi-ki-tup' },
      { written:'Not at all',   spoken:'No-ta-tall' },
    ],
  },
  {
    name:'Reduction (Weak Forms)',
    desc:'Common words get "reduced" in natural fast speech',
    examples:[
      { written:'I want to go',       spoken:"I wanna go (wanna = want to)" },
      { written:'Are you going to?',  spoken:"Are you gonna? (gonna = going to)" },
      { written:'I have to leave',    spoken:"I hafta leave (hafta = have to)" },
      { written:'Give him the book',  spoken:"Give 'im the book (him → 'im)" },
    ],
  },
  {
    name:'Elision',
    desc:'Some sounds disappear in fast speech',
    examples:[
      { written:'Next door',       spoken:"Nex' door (T disappears)" },
      { written:'Exactly',         spoken:"Exac'ly (T disappears)" },
      { written:'Interesting',     spoken:"In'resting (te disappears)" },
      { written:'Government',      spoken:"Gov'nment (ern disappears)" },
    ],
  },
];

// ── Minimal Pairs Practice ────────────────────────────────────
const MINIMAL_PAIRS = [
  { pair:['Ship', 'Sheep'],   focus:'Short /ɪ/ vs Long /iː/',   tip:'/ɪ/ = short and relaxed, /iː/ = long and tense' },
  { pair:['Live', 'Leave'],   focus:'Short /ɪ/ vs Long /iː/',   tip:'I live here (short). I will leave now (long).' },
  { pair:['Pull', 'Pool'],    focus:'Short /ʊ/ vs Long /uː/',   tip:'Pull = short. Pool = long with rounded lips.' },
  { pair:['Bit', 'Beat'],     focus:'/ɪ/ vs /iː/',              tip:'Bit is very short. Beat is stretched out.' },
  { pair:['Fool', 'Full'],    focus:'Long /uː/ vs Short /ʊ/',   tip:'Fool = stretched. Full = quick and relaxed.' },
  { pair:['Think', 'Sink'],   focus:'/θ/ vs /s/',               tip:'Think: tongue between teeth. Sink: no tongue.' },
  { pair:['Vine', 'Wine'],    focus:'/v/ vs /w/',               tip:'V: upper teeth on lower lip. W: just rounded lips.' },
  { pair:['Cat', 'Cut'],      focus:'/æ/ vs /ʌ/',               tip:'Cat: wide open mouth. Cut: shorter, neutral.' },
];

// ── Component ─────────────────────────────────────────────────
export default function PronunciationLabPage() {
  const [activeTab, setActiveTab] = useState('vowels');
  const [expandedPair, setExpandedPair] = useState(null);
  const [expandedStress, setExpandedStress] = useState(null);

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  const TABS = [
    { id:'vowels',     label:'Vowel Sounds',     icon: Volume2  },
    { id:'consonants', label:'Common Mistakes',  icon: Target   },
    { id:'stress',     label:'Word Stress',       icon: Zap      },
    { id:'connected',  label:'Connected Speech',  icon: BookOpen },
    { id:'minimal',    label:'Minimal Pairs',     icon: Star     },
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-cyan-600/20 via-sky-600/15 to-blue-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg"
              >
                <Volume2 size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Pronunciation Lab</h1>
                <p className="text-sm text-cyan-300 font-medium">Native-like pronunciation — scientifically</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              IPA sounds, common Indian English mistakes, word stress, connected speech — 
              sound like a native speaker with targeted practice.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-cyan-300">44</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">English Sounds</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-sky-300">5</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Modules</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Vowel Sounds ─────────────────────────────────── */}
        {activeTab === 'vowels' && (
          <motion.div key="vowels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="card p-4 border border-cyan-500/20 bg-cyan-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-cyan-300 font-semibold">English में 12 vowel sounds हैं</span> — Hindi में सिर्फ़ 5-6 vowels हैं। 
                इसीलिए Indians को English pronunciation difficult लगती है। 
                हर sound को IPA (International Phonetic Alphabet) symbol के साथ practice karo।
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {VOWEL_SOUNDS.map(({ ipa, word, hindi, tip }) => (
                <motion.div
                  key={ipa}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-4 hover:border-cyan-500/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-black text-cyan-400 font-mono w-12 shrink-0">{ipa}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{word}</p>
                      <p className="text-xs text-slate-500">{hindi}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-relaxed">💡 {tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Consonant Challenges ─────────────────────────── */}
        {activeTab === 'consonants' && (
          <motion.div key="consonants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="card p-4 border border-amber-500/20 bg-amber-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-amber-300 font-semibold">Most Common Indian English Pronunciation Mistakes</span> — 
                ये वो sounds हैं जो Hindi में exist नहीं करती। इन पर focus karo। Regular practice से ये naturally आने लगेंगी।
              </p>
            </div>
            {CONSONANT_CHALLENGES.map(({ sound, issue, tip, examples }) => (
              <motion.div key={sound} variants={{ hidden:{ opacity:0, y:10 }, visible:{ opacity:1, y:0 } }} initial="hidden" animate="visible" className="card p-5">
                <h3 className="font-bold text-white text-base mb-1">{sound}</h3>
                <p className="text-sm text-amber-300 mb-2">⚠️ Common Error: {issue}</p>
                <p className="text-sm text-slate-400 mb-4">✅ Fix: {tip}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {examples.map(([e1, e2]) => (
                    <div key={e1} className="p-2 rounded-xl bg-white/5 text-center">
                      <p className="text-sm font-semibold text-white">{e1}</p>
                      <p className="text-xs text-slate-600">{e2}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Word Stress ──────────────────────────────────── */}
        {activeTab === 'stress' && (
          <motion.div key="stress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="card p-4 border border-violet-500/20 bg-violet-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-violet-300 font-semibold">Word Stress</span> — English में हर word में एक syllable ज़्यादा LOUDER और LONGER बोला जाता है।
                Capital letters stress को दिखाते हैं।
                Wrong stress से native speakers को समझना मुश्किल हो जाता है!
              </p>
            </div>
            {WORD_STRESS_RULES.map(({ rule, examples }) => (
              <div key={rule} className="card p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  {rule}
                </h3>
                <div className="space-y-3">
                  {examples.map(({ word, wrong, right }) => (
                    <div key={word} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                      <span className="font-semibold text-white text-sm">{word}</span>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-red-500/8 border border-red-500/20">
                        <span className="text-red-400 text-xs">❌</span>
                        <span className="text-sm text-red-300">{wrong}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-green-500/8 border border-green-500/20">
                        <span className="text-green-400 text-xs">✅</span>
                        <span className="text-sm text-green-300">{right}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Connected Speech ─────────────────────────────── */}
        {activeTab === 'connected' && (
          <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="card p-4 border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-emerald-300 font-semibold">Connected Speech</span> — Native speakers इतना fast क्यों बोलते हैं?
                क्योंकि words एक-दूसरे से connect हो जाते हैं। 
                ये patterns सीखने से तुम्हारी listening AND speaking दोनों improve होंगी।
              </p>
            </div>
            {CONNECTED_SPEECH.map(({ name, desc, examples }) => (
              <div key={name} className="card p-5">
                <h3 className="font-bold text-white mb-2">{name}</h3>
                <p className="text-sm text-slate-400 mb-4">{desc}</p>
                <div className="space-y-2">
                  {examples.map(({ written, spoken }) => (
                    <div key={written} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/8">
                        <p className="text-xs text-slate-500 mb-1">Written</p>
                        <p className="text-sm text-slate-300 font-semibold">{written}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                        <p className="text-xs text-emerald-500 mb-1">Natural Speech</p>
                        <p className="text-sm text-emerald-300 font-semibold">{spoken}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Minimal Pairs ─────────────────────────────────── */}
        {activeTab === 'minimal' && (
          <motion.div key="minimal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="card p-4 border border-pink-500/20 bg-pink-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-pink-300 font-semibold">Minimal Pairs</span> — ऐसे two words जो सिर्फ एक sound में differ करते हैं।
                इन्हें practice करने से तुम्हारा ear train होता है और pronunciation accurate बनती है।
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MINIMAL_PAIRS.map(({ pair, focus, tip }) => (
                <motion.div
                  key={pair[0]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-5"
                >
                  <div className="flex items-center justify-center gap-6 mb-3">
                    {pair.map((word, i) => (
                      <div key={word} className="text-center">
                        <p className="text-2xl font-black text-white mb-1">{word}</p>
                        {i === 0 && <div className="absolute w-px h-8 bg-white/10" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs font-bold text-pink-300 mb-2">{focus}</p>
                  <p className="text-center text-xs text-slate-500 leading-relaxed">💡 {tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
