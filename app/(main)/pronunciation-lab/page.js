'use client';
// ============================================================
// PRONUNCIATION LAB PAGE — Complete pronunciation practice
// Features: IPA chart, stress patterns, minimal pairs,
// mouth positions, common mistakes, Indian English guide
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, Mic, Brain, Target, ChevronRight, Play,
  ArrowRight, BookOpen, Star, CheckCircle2, Zap, BarChart2,
  Globe, MessageSquare, Headphones, Award,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// ── IPA Symbols grouped ──────────────────────────────────────
const IPA_VOWELS = [
  { symbol: '/iː/', word: 'see', hindi: 'सी', example: 'team, lead, seem' },
  { symbol: '/ɪ/',  word: 'sit', hindi: 'सिट', example: 'bit, hit, miss' },
  { symbol: '/e/',  word: 'bed', hindi: 'बेड', example: 'set, ten, help' },
  { symbol: '/æ/',  word: 'cat', hindi: 'कैट', example: 'bad, man, hand' },
  { symbol: '/ɑː/', word: 'car', hindi: 'कार', example: 'far, park, dark' },
  { symbol: '/ɒ/',  word: 'hot', hindi: 'हॉट', example: 'pot, box, top' },
  { symbol: '/ɔː/', word: 'law', hindi: 'लॉ',  example: 'call, ball, all' },
  { symbol: '/ʊ/',  word: 'book', hindi: 'बुक', example: 'put, good, look' },
  { symbol: '/uː/', word: 'food', hindi: 'फूड', example: 'blue, move, boot' },
  { symbol: '/ʌ/',  word: 'cup', hindi: 'कप',  example: 'but, fun, sun' },
  { symbol: '/ɜː/', word: 'bird', hindi: 'बर्ड', example: 'word, her, turn' },
  { symbol: '/ə/',  word: 'about', hindi: 'अबाउट', example: 'ago, better, teacher' },
];

const IPA_CONSONANTS = [
  { symbol: '/p/',  word: 'pen',   hindi: 'पेन',   example: 'pin, map, open' },
  { symbol: '/b/',  word: 'bad',   hindi: 'बैड',   example: 'bit, cab, job' },
  { symbol: '/t/',  word: 'ten',   hindi: 'टेन',   example: 'tip, bit, out' },
  { symbol: '/d/',  word: 'did',   hindi: 'डिड',   example: 'day, odd, bad' },
  { symbol: '/k/',  word: 'cat',   hindi: 'कैट',   example: 'key, back, act' },
  { symbol: '/g/',  word: 'go',    hindi: 'गो',    example: 'get, bag, fog' },
  { symbol: '/f/',  word: 'fat',   hindi: 'फैट',   example: 'fit, off, wife' },
  { symbol: '/v/',  word: 'van',   hindi: 'वैन',   example: 'very, live, have' },
  { symbol: '/θ/',  word: 'thin',  hindi: 'थिन',   example: 'think, bath, month' },
  { symbol: '/ð/',  word: 'this',  hindi: 'दिस',   example: 'the, other, smooth' },
  { symbol: '/s/',  word: 'see',   hindi: 'सी',    example: 'sit, yes, case' },
  { symbol: '/z/',  word: 'zoo',   hindi: 'ज़ू',   example: 'zero, quiz, is' },
  { symbol: '/ʃ/',  word: 'she',   hindi: 'शी',    example: 'shop, wish, cash' },
  { symbol: '/ʒ/',  word: 'vision',hindi: 'विज़न', example: 'pleasure, genre' },
  { symbol: '/h/',  word: 'how',   hindi: 'हाउ',   example: 'hat, behind' },
  { symbol: '/m/',  word: 'man',   hindi: 'मैन',   example: 'met, him, some' },
  { symbol: '/n/',  word: 'no',    hindi: 'नो',    example: 'not, fun, ten' },
  { symbol: '/ŋ/',  word: 'sing',  hindi: 'सिंग',  example: 'ring, long, young' },
  { symbol: '/l/',  word: 'let',   hindi: 'लेट',   example: 'lip, bell, feel' },
  { symbol: '/r/',  word: 'red',   hindi: 'रेड',   example: 'run, carry, four' },
  { symbol: '/j/',  word: 'yes',   hindi: 'येस',   example: 'year, beyond, you' },
  { symbol: '/w/',  word: 'wet',   hindi: 'वेट',   example: 'way, twin, how' },
  { symbol: '/tʃ/', word: 'chin',  hindi: 'चिन',   example: 'child, watch, teach' },
  { symbol: '/dʒ/', word: 'June',  hindi: 'जून',   example: 'jet, badge, age' },
];

// ── Minimal Pairs ─────────────────────────────────────────────
const MINIMAL_PAIRS = [
  { word1: 'ship',   word2: 'sheep', sound1: '/ɪ/',  sound2: '/iː/', tip: 'ship = short sound, sheep = long held sound' },
  { word1: 'bit',    word2: 'beat',  sound1: '/ɪ/',  sound2: '/iː/', tip: '"bit" is quick, "beat" is stretched' },
  { word1: 'cat',    word2: 'cut',   sound1: '/æ/',  sound2: '/ʌ/',  tip: '"cat" mouth wide, "cut" small O shape' },
  { word1: 'bad',    word2: 'bed',   sound1: '/æ/',  sound2: '/e/',  tip: '"bad" stretches jaw, "bed" is neutral' },
  { word1: 'thin',   word2: 'sin',   sound1: '/θ/',  sound2: '/s/',  tip: 'Put tongue BETWEEN teeth for /θ/' },
  { word1: 'think',  word2: 'sink',  sound1: '/θ/',  sound2: '/s/',  tip: 'Indian English often replaces /θ/ with /s/ or /t/' },
  { word1: 'van',    word2: 'ban',   sound1: '/v/',  sound2: '/b/',  tip: '/v/ = teeth on lower lip; /b/ = lips together' },
  { word1: 'very',   word2: 'berry', sound1: '/v/',  sound2: '/b/',  tip: 'Common Indian mistake: "wery" or "bery" for "very"' },
  { word1: 'walk',   word2: 'work',  sound1: '/ɔː/', sound2: '/ɜː/', tip: '"walk" = AW sound, "work" = ER sound' },
  { word1: 'world',  word2: 'word',  sound1: '/ɜːl/', sound2: '/ɜːd/', tip: 'Both use /ɜː/ — the "ER" sound' },
];

// ── Common Indian English Mistakes ───────────────────────────
const INDIAN_CORRECTIONS = [
  { wrong: '"Wery good"',      right: '"Very good"',         rule: '/v/ sound — put upper teeth on lower lip, not like /w/' },
  { wrong: '"Tank you"',       right: '"Thank you"',         rule: '/θ/ sound — tongue between teeth, not /t/' },
  { wrong: '"I am knowing"',   right: '"I know"',            rule: 'Stative verbs (know, want, like) don\'t use -ing form' },
  { wrong: '"She is having car"', right: '"She has a car"',  rule: '"Have" for possession = simple present, not continuous' },
  { wrong: '"Where you are going?"', right: '"Where are you going?"', rule: 'Question word order: WH + auxiliary + subject + verb' },
  { wrong: '"What is your good name?"', right: '"What is your name?"', rule: '"Good name" is a literal Hindi translation — just say "name"' },
  { wrong: '"I am a software"', right: '"I am a software engineer"', rule: 'Always use full job title, not just field name' },
  { wrong: '"Myself Rahul"',   right: '"I am Rahul" / "My name is Rahul"', rule: '"Myself" is reflexive — only used as emphasis' },
];

// ── Stress Patterns ───────────────────────────────────────────
const STRESS_EXAMPLES = [
  { word: 'PREsent',   meaning: 'noun/adjective — a gift or being here',  stress: 'First syllable', sentence: 'This is a present for you.' },
  { word: 'preSENT',   meaning: 'verb — to show or introduce',            stress: 'Second syllable', sentence: 'Please present your findings.' },
  { word: 'REcord',    meaning: 'noun — a recording',                     stress: 'First syllable', sentence: 'This is a world record.' },
  { word: 'reCORD',    meaning: 'verb — to record something',             stress: 'Second syllable', sentence: 'Can you record this video?' },
  { word: 'PROtest',   meaning: 'noun — a demonstration',                 stress: 'First syllable', sentence: 'They organized a protest.' },
  { word: 'proTEST',   meaning: 'verb — to object',                       stress: 'Second syllable', sentence: 'She protests this decision.' },
  { word: 'INcrease',  meaning: 'noun — a rise',                          stress: 'First syllable', sentence: 'There was an increase in sales.' },
  { word: 'inCREASE',  meaning: 'verb — to grow',                         stress: 'Second syllable', sentence: 'Sales will increase next month.' },
];

// ── Sub-pages ─────────────────────────────────────────────────
const SUB_PAGES = [
  { href: '/pronunciation-lab/ipa-chart',      icon: BookOpen,     title: 'IPA Chart',          desc: 'Complete guide to all 44 English phonemes', emoji: '🔤', color: 'from-indigo-500 to-blue-500' },
  { href: '/pronunciation-lab/minimal-pairs',  icon: Target,       title: 'Minimal Pairs',      desc: 'Ear training for similar-sounding words',    emoji: '🎯', color: 'from-violet-500 to-purple-500' },
  { href: '/pronunciation-lab/stress-patterns',icon: BarChart2,    title: 'Stress Patterns',    desc: 'Word & sentence stress for natural flow',    emoji: '📊', color: 'from-amber-500 to-orange-500' },
  { href: '/pronunciation-lab/intonation',     icon: Zap,          title: 'Intonation',         desc: 'Rising & falling tones for clarity',         emoji: '🎵', color: 'from-emerald-500 to-teal-500' },
  { href: '/pronunciation-lab/record-compare', icon: Mic,          title: 'Record & Compare',   desc: 'Record yourself and compare with native',    emoji: '🎤', color: 'from-pink-500 to-rose-500' },
];

const TABS = ['ipa', 'minimal-pairs', 'stress', 'corrections'];

// ── IPA Symbol Card ───────────────────────────────────────────
function IPACard({ item }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05, y: -3 }}
      className="card p-3 text-center group cursor-default hover:border-primary-500/30 transition-all"
    >
      <p className="text-2xl font-black text-primary-300 font-mono mb-1">{item.symbol}</p>
      <p className="text-xs font-bold text-white">{item.word}</p>
      <p className="text-xs text-slate-500 mt-0.5">{item.hindi}</p>
      <p className="text-[10px] text-slate-600 mt-1 line-clamp-1">{item.example}</p>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function PronunciationLabPage() {
  const [activeTab, setActiveTab] = useState('ipa');

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center">
              <Volume2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Pronunciation Lab</h1>
              <p className="text-slate-400 text-sm">Master English sounds — IPA, stress, intonation, connected speech.</p>
            </div>
          </div>
          <Link href="/pronunciation-lab/record-compare" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <Mic size={14} /> Record My Voice
          </Link>
        </div>
      </motion.div>

      {/* ── Sub-page Cards ──────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8"
      >
        {SUB_PAGES.map(page => {
          const Icon = page.icon;
          return (
            <motion.div key={page.href} variants={fadeUp}>
              <Link href={page.href} className="block card p-4 text-center hover:border-white/20 group transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${page.color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  {page.emoji}
                </div>
                <p className="text-xs font-bold text-white mb-1">{page.title}</p>
                <p className="text-[10px] text-slate-500 line-clamp-2">{page.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Tab Navigation ──────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'ipa',          label: 'IPA Chart'         },
          { id: 'minimal-pairs', label: 'Minimal Pairs'   },
          { id: 'stress',        label: 'Word Stress'     },
          { id: 'corrections',   label: 'Indian English'  },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── IPA Chart Tab ───────────────────────────────── */}
      {activeTab === 'ipa' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card p-6 mb-6 border-cyan-500/20 bg-cyan-500/5">
            <p className="text-sm text-cyan-300 font-semibold mb-2">🔤 What is IPA?</p>
            <p className="text-sm text-slate-400">The <strong className="text-white">International Phonetic Alphabet (IPA)</strong> is a system that shows exactly how to pronounce any word. Each symbol = one specific sound. Learning IPA helps you read pronunciation guides in any dictionary.</p>
          </div>

          <h3 className="text-base font-bold text-white mb-4">Vowel Sounds (12 short/long vowels)</h3>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-8">
            {IPA_VOWELS.map(v => <IPACard key={v.symbol} item={v} />)}
          </motion.div>

          <h3 className="text-base font-bold text-white mb-4">Consonant Sounds (24 consonants)</h3>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {IPA_CONSONANTS.map(c => <IPACard key={c.symbol} item={c} />)}
          </motion.div>
        </motion.div>
      )}

      {/* ── Minimal Pairs Tab ───────────────────────────── */}
      {activeTab === 'minimal-pairs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card p-5 mb-6 border-violet-500/20 bg-violet-500/5">
            <p className="text-sm text-violet-300 font-semibold mb-2">🎯 What are Minimal Pairs?</p>
            <p className="text-sm text-slate-400">Two words that differ by only ONE sound. Practicing minimal pairs trains your ear to hear and produce subtle differences that are critical for being understood clearly.</p>
          </div>
          <div className="space-y-4">
            {MINIMAL_PAIRS.map((pair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card p-5"
              >
                <div className="flex items-center gap-6 flex-wrap mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-black text-white">{pair.word1}</p>
                      <p className="text-xs font-mono text-primary-400">{pair.sound1}</p>
                    </div>
                    <div className="text-slate-600 text-xl font-light">vs</div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-white">{pair.word2}</p>
                      <p className="text-xs font-mono text-secondary-400">{pair.sound2}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 bg-white/4 rounded-lg p-3 border border-white/8">
                  💡 <span className="text-white font-semibold">Tip:</span> {pair.tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Stress Patterns Tab ─────────────────────────── */}
      {activeTab === 'stress' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card p-5 mb-6 border-amber-500/20 bg-amber-500/5">
            <p className="text-sm text-amber-300 font-semibold mb-2">📊 Word Stress Rule</p>
            <p className="text-sm text-slate-400">In English, the same word can be a noun OR a verb depending on which syllable you stress. Capital letters show the STRESSED syllable. Getting stress wrong changes the meaning completely!</p>
          </div>
          <div className="space-y-3">
            {STRESS_EXAMPLES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card p-4 flex items-start gap-4 flex-wrap"
              >
                <div className="shrink-0">
                  <p className="text-xl font-black text-white font-mono">{item.word}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.stress}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 mb-1">{item.meaning}</p>
                  <p className="text-xs text-slate-500 italic">"{item.sentence}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Indian English Corrections Tab ──────────────── */}
      {activeTab === 'corrections' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card p-5 mb-6 border-rose-500/20 bg-rose-500/5">
            <p className="text-sm text-rose-300 font-semibold mb-2">🇮🇳 Indian English vs Standard English</p>
            <p className="text-sm text-slate-400">These are common pronunciation and grammar patterns from Indian English that differ from standard British/American English. Knowing them helps you communicate more clearly globally.</p>
          </div>
          <div className="space-y-4">
            {INDIAN_CORRECTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div className="bg-rose-500/8 border border-rose-500/20 rounded-xl p-4">
                  <p className="text-xs text-rose-400 font-bold mb-2">❌ Common in Indian English</p>
                  <p className="text-base font-semibold text-white">{item.wrong}</p>
                </div>
                <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-xs text-emerald-400 font-bold mb-2">✅ Standard English</p>
                  <p className="text-base font-semibold text-white">{item.right}</p>
                  <p className="text-xs text-slate-400 mt-2 border-t border-white/8 pt-2">📌 {item.rule}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
