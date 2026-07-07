'use client';
// Pronunciation Lab — IPA chart, stress patterns, minimal pairs, connected speech

import Link from 'next/link';
import { Volume2, ArrowRight, Mic, ChevronRight } from 'lucide-react';

// ============================================================
// IPA Vowel chart (simplified)
// ============================================================
const IPA_VOWELS = [
  { symbol: '/iː/', word: 'see', hindi: 'सी', example: '"meet", "feel", "team"' },
  { symbol: '/ɪ/', word: 'sit', hindi: 'सि', example: '"bit", "fin", "tip"' },
  { symbol: '/e/', word: 'get', hindi: 'गे', example: '"bed", "pen", "men"' },
  { symbol: '/æ/', word: 'cat', hindi: 'कैट', example: '"man", "bad", "flat"' },
  { symbol: '/ɑː/', word: 'car', hindi: 'का', example: '"farm", "art", "part"' },
  { symbol: '/ɒ/', word: 'got', hindi: 'गॉट', example: '"hot", "off", "stop"' },
  { symbol: '/ɔː/', word: 'saw', hindi: 'सॉ', example: '"call", "ball", "four"' },
  { symbol: '/ʊ/', word: 'put', hindi: 'पु', example: '"book", "good", "full"' },
  { symbol: '/uː/', word: 'too', hindi: 'तू', example: '"moon", "food", "blue"' },
  { symbol: '/ʌ/', word: 'cup', hindi: 'कप', example: '"bus", "fun", "sun"' },
  { symbol: '/ɜː/', word: 'bird', hindi: 'बर्ड', example: '"word", "nurse", "first"' },
  { symbol: '/ə/', word: 'about', hindi: 'श्वा', example: '"a", "the", "about"' },
];

const IPA_CONSONANTS = [
  { symbol: '/p/', word: 'pen', hindi: 'प', example: '"pay", "top", "copy"' },
  { symbol: '/b/', word: 'bad', hindi: 'ब', example: '"big", "job", "cube"' },
  { symbol: '/t/', word: 'two', hindi: 'ट', example: '"top", "sit", "tea"' },
  { symbol: '/d/', word: 'did', hindi: 'ड', example: '"day", "end", "add"' },
  { symbol: '/k/', word: 'cat', hindi: 'क', example: '"key", "back", "car"' },
  { symbol: '/g/', word: 'got', hindi: 'ग', example: '"go", "big", "dog"' },
  { symbol: '/f/', word: 'fat', hindi: 'फ', example: '"fan", "leaf", "off"' },
  { symbol: '/v/', word: 'van', hindi: 'व', example: '"very", "love", "five"' },
  { symbol: '/θ/', word: 'thin', hindi: 'थ', example: '"think", "bath", "both"' },
  { symbol: '/ð/', word: 'the', hindi: 'द', example: '"this", "them", "with"' },
  { symbol: '/s/', word: 'sun', hindi: 'स', example: '"sit", "bus", "nice"' },
  { symbol: '/z/', word: 'zoo', hindi: 'ज़', example: '"zip", "jazz", "nose"' },
  { symbol: '/ʃ/', word: 'show', hindi: 'श', example: '"ship", "cash", "push"' },
  { symbol: '/ʒ/', word: 'vision', hindi: 'ज़', example: '"usual", "beige", "vision"' },
  { symbol: '/h/', word: 'hot', hindi: 'ह', example: '"house", "ahead", "who"' },
  { symbol: '/m/', word: 'man', hindi: 'म', example: '"map", "come", "am"' },
  { symbol: '/n/', word: 'now', hindi: 'न', example: '"no", "can", "own"' },
  { symbol: '/ŋ/', word: 'sing', hindi: 'ंग', example: '"ring", "long", "wrong"' },
  { symbol: '/l/', word: 'leg', hindi: 'ल', example: '"let", "feel", "play"' },
  { symbol: '/r/', word: 'red', hindi: 'र', example: '"run", "very", "try"' },
  { symbol: '/j/', word: 'yes', hindi: 'य', example: '"you", "your", "beyond"' },
  { symbol: '/w/', word: 'wet', hindi: 'व', example: '"way", "one", "quick"' },
  { symbol: '/tʃ/', word: 'chin', hindi: 'च', example: '"chair", "match", "catch"' },
  { symbol: '/dʒ/', word: 'joy', hindi: 'ज', example: '"jump", "age", "bridge"' },
];

const MODULES = [
  { href: '/pronunciation-lab/ipa-chart',    emoji: '🔤', title: 'Full IPA Chart',      desc: 'Complete vowels, consonants, diphthongs', badge: 'Reference' },
  { href: '/pronunciation-lab/stress-patterns', emoji: '🎵', title: 'Word Stress',       desc: 'Syllable stress patterns — never sound wrong', badge: 'Important' },
  { href: '/pronunciation-lab/minimal-pairs', emoji: '👥', title: 'Minimal Pairs',      desc: '"Ship" vs "Sheep" — tricky pairs practice', badge: 'Practice' },
  { href: '/pronunciation-lab/intonation',   emoji: '🌊', title: 'Intonation',          desc: 'Rising and falling tone — question vs statement', badge: 'Advanced' },
  { href: '/pronunciation-lab/record-compare', emoji: '🎙️', title: 'Record & Compare', desc: 'Record yourself and compare with native', badge: 'Self-Test' },
];

const COMMON_MISTAKES = [
  { wrong: 'V/W confusion', hindi: '"Very" को "Wery" बोलना', correct: 'Tongue on teeth for V, lips rounded for W', emoji: '😬' },
  { wrong: 'TH sounds', hindi: '"Think" को "Tink" बोलना', correct: 'Tongue between teeth — /θ/ and /ð/', emoji: '👅' },
  { wrong: 'Final consonants', hindi: '"Fact" को "Fac" बोलना', correct: 'Always pronounce final consonants clearly', emoji: '🔤' },
  { wrong: 'Short vs Long vowels', hindi: '"Ship" को "Sheep" बोलना', correct: 'Practice minimal pairs daily', emoji: '🚢' },
  { wrong: 'Silent letters', hindi: '"Know" को "K-now" बोलना', correct: 'K is silent — just say "no"', emoji: '🤫' },
  { wrong: 'Stress patterns', hindi: '"reCORD" vs "REcord" — confusion', correct: 'Noun = 1st syllable stress, Verb = 2nd', emoji: '🎯' },
];

// ============================================================
// Pronunciation Lab Page
// ============================================================
export default function PronunciationLabPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">🔊</span> Pronunciation Lab
          </h1>
          <p className="text-slate-500">IPA se lekar connected speech tak — sound like a native speaker</p>
        </div>
        <Link href="/pronunciation-lab/ipa-chart" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Volume2 size={15} /> IPA Chart
        </Link>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map(({ href, emoji, title, desc, badge }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-cyan-500/30 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">{badge}</span>
                </div>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick IPA Reference */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-1 flex items-center gap-2">
          <span className="text-xl">🔤</span> Quick IPA Reference — Vowels
        </h2>
        <p className="text-xs text-slate-500 mb-4">English ke 12 pure vowel sounds — har ek ka IPA symbol, word, aur Hindi hint</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {IPA_VOWELS.map(({ symbol, word, hindi, example }) => (
            <div key={symbol} className="p-3 rounded-xl bg-white/3 border border-white/5 hover:border-cyan-500/20 transition-all group">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-cyan-300 font-mono font-black text-base">{symbol}</span>
                <span className="text-white text-sm font-semibold">{word}</span>
                <span className="hindi-text text-xs text-slate-500">{hindi}</span>
              </div>
              <p className="text-[10px] text-slate-600">{example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consonants */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-1 flex items-center gap-2">
          <span className="text-xl">🗣️</span> Consonants
        </h2>
        <p className="text-xs text-slate-500 mb-4">24 consonant sounds — Hindi speakers ke liye tricky ones highlighted</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {IPA_CONSONANTS.slice(0, 16).map(({ symbol, word, hindi, example }) => (
            <div key={symbol} className="p-3 rounded-xl bg-white/3 border border-white/5 hover:border-purple-500/20 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-300 font-mono font-black text-base">{symbol}</span>
                <span className="text-white text-sm font-semibold">{word}</span>
                <span className="hindi-text text-xs text-slate-500">{hindi}</span>
              </div>
              <p className="text-[10px] text-slate-600">{example}</p>
            </div>
          ))}
        </div>
        <Link href="/pronunciation-lab/ipa-chart" className="btn-secondary text-xs mt-3 w-fit flex items-center gap-1.5">
          View All Consonants <ArrowRight size={12} />
        </Link>
      </div>

      {/* Common Mistakes */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-4 flex items-center gap-2">
          <span className="text-xl">⚠️</span> Hindi Speakers Ki Common Mistakes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMMON_MISTAKES.map(({ wrong, hindi, correct, emoji }) => (
            <div key={wrong} className="p-4 rounded-xl bg-danger-400/5 border border-danger-400/15">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl shrink-0">{emoji}</span>
                <div>
                  <p className="font-semibold text-danger-300 text-sm">{wrong}</p>
                  <p className="hindi-text text-xs text-slate-500">{hindi}</p>
                </div>
              </div>
              <p className="text-xs text-accent-300 flex items-start gap-1.5">
                <span className="shrink-0">✅</span> {correct}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
