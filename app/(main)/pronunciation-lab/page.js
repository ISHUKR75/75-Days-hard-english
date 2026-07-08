'use client';
// ============================================================
// PRONUNCIATION LAB — IPA chart, stress, minimal pairs, practice
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, ChevronRight } from 'lucide-react';

const IPA_VOWELS = [
  { symbol:'/iː/',  word:'see',      hindi:'देखना',   example:'She can see the tree.' },
  { symbol:'/ɪ/',   word:'sit',      hindi:'बैठना',   example:'Please sit here.' },
  { symbol:'/e/',   word:'bed',      hindi:'बिस्तर',  example:'The bed is soft.' },
  { symbol:'/æ/',   word:'cat',      hindi:'बिल्ली',  example:'The cat sat on the mat.' },
  { symbol:'/ɑː/',  word:'car',      hindi:'कार',     example:'He drives a car.' },
  { symbol:'/ɒ/',   word:'hot',      hindi:'गर्म',    example:'It is very hot today.' },
  { symbol:'/ɔː/',  word:'call',     hindi:'बुलाना',  example:'Please call me.' },
  { symbol:'/ʊ/',   word:'put',      hindi:'रखना',    example:'Put it here.' },
  { symbol:'/uː/',  word:'blue',     hindi:'नीला',    example:'The sky is blue.' },
  { symbol:'/ʌ/',   word:'cup',      hindi:'कप',      example:'Have a cup of tea.' },
  { symbol:'/ɜː/',  word:'bird',     hindi:'चिड़िया', example:'The bird sings.' },
  { symbol:'/ə/',   word:'about',    hindi:'बारे में',example:'Tell me about it.' },
  { symbol:'/eɪ/',  word:'day',      hindi:'दिन',     example:'Have a nice day.' },
  { symbol:'/aɪ/',  word:'my',       hindi:'मेरा',    example:'This is my book.' },
  { symbol:'/ɔɪ/',  word:'boy',      hindi:'लड़का',   example:'The boy is smart.' },
  { symbol:'/aʊ/',  word:'now',      hindi:'अभी',     example:'Do it now.' },
  { symbol:'/əʊ/',  word:'go',       hindi:'जाना',    example:'Let\'s go.' },
  { symbol:'/ɪə/',  word:'here',     hindi:'यहाँ',    example:'Come here please.' },
];

const IPA_CONSONANTS = [
  { symbol:'/p/',   word:'pen',      hindi:'कलम',     example:'Pass me the pen.' },
  { symbol:'/b/',   word:'book',     hindi:'किताब',   example:'I read a book.' },
  { symbol:'/t/',   word:'tea',      hindi:'चाय',     example:'I love tea.' },
  { symbol:'/d/',   word:'dog',      hindi:'कुत्ता',  example:'The dog barked.' },
  { symbol:'/k/',   word:'car',      hindi:'कार',     example:'Drive the car.' },
  { symbol:'/ɡ/',   word:'go',       hindi:'जाना',    example:'We go home.' },
  { symbol:'/f/',   word:'food',     hindi:'खाना',    example:'The food is ready.' },
  { symbol:'/v/',   word:'voice',    hindi:'आवाज़',   example:'Nice voice.' },
  { symbol:'/θ/',   word:'think',    hindi:'सोचना',   example:'I think so.' },
  { symbol:'/ð/',   word:'this',     hindi:'यह',      example:'This is mine.' },
  { symbol:'/s/',   word:'sit',      hindi:'बैठना',   example:'Please sit.' },
  { symbol:'/z/',   word:'zero',     hindi:'शून्य',   example:'It is zero.' },
  { symbol:'/ʃ/',   word:'she',      hindi:'वह (महिला)', example:'She is here.' },
  { symbol:'/ʒ/',   word:'vision',   hindi:'दृष्टि',  example:'He has good vision.' },
  { symbol:'/tʃ/',  word:'chair',    hindi:'कुर्सी',  example:'Have a seat on the chair.' },
  { symbol:'/dʒ/',  word:'job',      hindi:'नौकरी',   example:'I got a job.' },
  { symbol:'/m/',   word:'man',      hindi:'आदमी',    example:'He is a good man.' },
  { symbol:'/n/',   word:'name',     hindi:'नाम',     example:'What is your name?' },
  { symbol:'/ŋ/',   word:'sing',     hindi:'गाना',    example:'She can sing.' },
  { symbol:'/h/',   word:'hello',    hindi:'हेलो',    example:'Hello everyone.' },
  { symbol:'/l/',   word:'love',     hindi:'प्यार',   example:'I love English.' },
  { symbol:'/r/',   word:'read',     hindi:'पढ़ना',   example:'Read aloud.' },
  { symbol:'/w/',   word:'work',     hindi:'काम',     example:'I work hard.' },
  { symbol:'/j/',   word:'yes',      hindi:'हाँ',     example:'Yes, I agree.' },
];

const MINIMAL_PAIRS = [
  { a:'ship', b:'sheep',  hindiA:'जहाज़', hindiB:'भेड़',   focus:'Short /ɪ/ vs Long /iː/' },
  { a:'bed',  b:'bad',    hindiA:'बिस्तर',hindiB:'बुरा',  focus:'/e/ vs /æ/' },
  { a:'live', b:'leave',  hindiA:'जीना',  hindiB:'छोड़ना', focus:'/ɪ/ vs /iː/' },
  { a:'cat',  b:'cut',    hindiA:'बिल्ली',hindiB:'काटना', focus:'/æ/ vs /ʌ/' },
  { a:'think',b:'sink',   hindiA:'सोचना', hindiB:'डूबना',  focus:'/θ/ vs /s/' },
  { a:'then', b:'den',    hindiA:'तब',    hindiB:'मांद',   focus:'/ð/ vs /d/' },
  { a:'rice', b:'lice',   hindiA:'चावल', hindiB:'जूँ',    focus:'/r/ vs /l/' },
  { a:'pull', b:'pool',   hindiA:'खींचना',hindiB:'तालाब', focus:'/ʊ/ vs /uː/' },
];

const STRESS_RULES = [
  { rule:'Two-syllable nouns/adjectives: stress on 1st syllable', examples:["'ta-ble","'hap-py","'beau-ti-ful","'pho-to"] },
  { rule:'Two-syllable verbs: stress on 2nd syllable', examples:["re-'peat","de-'cide","a-'gree","re-'move"] },
  { rule:'Words ending in -tion/-sion: stress before ending', examples:["na-'tion","de-ci-'sion","pres-en-'ta-tion","or-gan-i-'za-tion"] },
  { rule:'Words ending in -ic: stress on syllable before', examples:["e-'co-no-mic","au-to-'ma-tic","e-'lec-tric","u-'ni-ver-si-ty"] },
];

export default function PronunciationLabPage() {
  const [activeTab, setActiveTab] = useState('ipa');
  const [playing, setPlaying] = useState(null);

  const speak = (text, key) => {
    if (typeof window === 'undefined') return;
    setPlaying(key);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.7;
    u.onend = () => setPlaying(null);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const TABS = [
    { id:'ipa', label:'IPA Chart' },
    { id:'minimal', label:'Minimal Pairs' },
    { id:'stress', label:'Word Stress' },
    { id:'tips', label:'Tips' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">🔊 Pronunciation Lab</h1>
        <p className="text-slate-400">IPA chart, minimal pairs, stress patterns — sound like a native speaker</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'text-slate-500 hover:text-slate-300'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* IPA Chart */}
      {activeTab === 'ipa' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">🅰️ Vowel Sounds</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {IPA_VOWELS.map((item, i) => (
                <IPACard key={i} item={item} onSpeak={() => speak(item.word, `v${i}`)} isPlaying={playing === `v${i}`} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-3">📢 Consonant Sounds</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {IPA_CONSONANTS.map((item, i) => (
                <IPACard key={i} item={item} onSpeak={() => speak(item.word, `c${i}`)} isPlaying={playing === `c${i}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Minimal Pairs */}
      {activeTab === 'minimal' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400 mb-4">Minimal pairs are words that differ by only ONE sound. Practise them to improve your pronunciation accuracy.</p>
          {MINIMAL_PAIRS.map((pair, i) => (
            <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
              className="card p-4 flex items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <button onClick={() => speak(pair.a, `m${i}a`)} className={`flex flex-col items-center p-4 rounded-xl border transition-all hover:bg-white/8 ${playing===`m${i}a` ? 'bg-primary-500/20 border-primary-500/30' : 'bg-white/5 border-white/8'}`}>
                  <p className="text-2xl font-black text-white">{pair.a}</p>
                  <p className="text-xs hindi-text">{pair.hindiA}</p>
                  <Volume2 size={12} className="text-slate-500 mt-1" />
                </button>
                <div className="flex flex-col items-center">
                  <p className="text-slate-600 font-bold text-xl">vs</p>
                  <p className="text-[10px] text-primary-400 font-semibold text-center max-w-20">{pair.focus}</p>
                </div>
                <button onClick={() => speak(pair.b, `m${i}b`)} className={`flex flex-col items-center p-4 rounded-xl border transition-all hover:bg-white/8 ${playing===`m${i}b` ? 'bg-secondary-500/20 border-secondary-500/30' : 'bg-white/5 border-white/8'}`}>
                  <p className="text-2xl font-black text-white">{pair.b}</p>
                  <p className="text-xs hindi-text">{pair.hindiB}</p>
                  <Volume2 size={12} className="text-slate-500 mt-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Word Stress */}
      {activeTab === 'stress' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">In English, the <strong className="text-white">stressed syllable</strong> is spoken louder, longer, and higher. Wrong stress can make you hard to understand!</p>
          {STRESS_RULES.map((rule, i) => (
            <div key={i} className="card p-5">
              <p className="font-semibold text-white mb-3">📌 {rule.rule}</p>
              <div className="flex flex-wrap gap-2">
                {rule.examples.map((ex, j) => (
                  <button key={j} onClick={() => speak(ex.replace(/'/g,'').replace(/-/g,''), `s${i}${j}`)}
                    className={`px-3 py-2 rounded-xl border text-sm font-mono transition-all ${playing===`s${i}${j}` ? 'bg-primary-500/20 border-primary-500/30 text-primary-300' : 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/8'}`}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon:'🎧', title:'Shadowing Practice', desc:'Listen to a native speaker sentence, then immediately repeat it — same speed, same intonation, same stress. Do this for 10 mins daily.' },
            { icon:'🪞', title:'Mirror Practice', desc:'Watch your mouth in a mirror while practicing. Some sounds (/θ/, /ð/, /v/) require specific lip and tongue positions.' },
            { icon:'📱', title:'Record & Compare', desc:'Record yourself speaking, then compare to a native speaker. Notice differences in speed, stress, and intonation.' },
            { icon:'🔤', title:'Focus on Problem Sounds', desc:'Indians often struggle with /w/ vs /v/, /θ/, /æ/, /ɜː/. Identify YOUR problem sounds and drill them specifically.' },
            { icon:'🎵', title:'Sing English Songs', desc:'Songs help you learn natural rhythm, stress, and intonation. Pick simple songs and sing along daily.' },
            { icon:'📺', title:'Watch Without Subtitles', desc:'After getting comfortable, watch English content without subtitles. Train your ear to decode real-speed speech.' },
          ].map((tip, i) => (
            <motion.div key={i} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.08}}
              className="card p-5">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function IPACard({ item, onSpeak, isPlaying }) {
  return (
    <motion.button onClick={onSpeak} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${isPlaying ? 'bg-primary-500/20 border-primary-500/40 shadow-glow-primary' : 'bg-white/4 border-white/8 hover:bg-white/8'}`}>
      <p className="text-lg font-black text-white font-mono">{item.symbol}</p>
      <p className="text-sm font-bold text-primary-300 mt-0.5">{item.word}</p>
      <p className="text-[10px] hindi-text text-amber-400">{item.hindi}</p>
    </motion.button>
  );
}
