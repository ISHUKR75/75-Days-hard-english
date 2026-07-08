'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import hook to manage state for active category filters.
import Link from 'next/link'; // Simple English: Import Next.js link component for navigation.
import { motion } from 'framer-motion'; // Simple English: Import Framer Motion for premium card animations.
import { ArrowLeft, Volume2, Info, Star } from 'lucide-react'; // Simple English: Import icons for visual UI structure.
import { playSound } from '@/lib/sounds'; // Simple English: Import the playSound function for gamification chimes.

// Simple English: Define phonetic IPA sound list with type categorizations, examples, and pronunciation descriptions.
const IPA_SOUNDS = [
  // Simple English: Short Vowels subgroup.
  { ipa: '/iː/', type: 'Vowel (Long)', word: 'sheep', examples: ['meet', 'see'], hindi: 'शीप', tip: 'Smile and stretch your lips wide.' },
  { ipa: '/ɪ/', type: 'Vowel (Short)', word: 'ship', examples: ['sit', 'hit'], hindi: 'शिप', tip: 'Relax your lips, make it quick and short.' },
  { ipa: '/e/', type: 'Vowel (Short)', word: 'bed', examples: ['red', 'said'], hindi: 'बेड', tip: 'Open your mouth slightly, like saying "eh".' },
  { ipa: '/æ/', type: 'Vowel (Short)', word: 'bad', examples: ['cat', 'hat'], hindi: 'बैड', tip: 'Open your jaw wide, drop your lower chin.' },
  { ipa: '/ɑː/', type: 'Vowel (Long)', word: 'father', examples: ['car', 'farm'], hindi: 'फादर', tip: 'Say "ah" as if you are at the doctor.' },
  { ipa: '/ɒ/', type: 'Vowel (Short)', word: 'got', examples: ['hot', 'dog'], hindi: 'गॉट', tip: 'Round your lips and open your mouth briefly.' },
  { ipa: '/ɔː/', type: 'Vowel (Long)', word: 'caught', examples: ['law', 'ball'], hindi: 'कॉट', tip: 'Stretch your lips forward into a long O shape.' },
  { ipa: '/ʊ/', type: 'Vowel (Short)', word: 'put', examples: ['book', 'look'], hindi: 'पुट', tip: 'Make a quick sound with lips slightly pushed out.' },
  { ipa: '/uː/', type: 'Vowel (Long)', word: 'boot', examples: ['food', 'moon'], hindi: 'बूट', tip: 'Round your lips tightly and push them forward.' },
  { ipa: '/ʌ/', type: 'Vowel (Short)', word: 'cup', examples: ['but', 'love'], hindi: 'कप', tip: 'Make a very short, neutral "uhr" sound.' },
  { ipa: '/ɜː/', type: 'Vowel (Long)', word: 'bird', examples: ['girl', 'word'], hindi: 'बर्ड', tip: 'Hold tongue in middle, do not roll your R sound.' },
  { ipa: '/ə/', type: 'Vowel (Short)', word: 'about', examples: ['teacher', 'the'], hindi: 'अबाउट', tip: 'The "Schwa" sound — relaxed, fast and neutral.' },

  // Simple English: Diphthongs subgroup (vowels that change sound mid-pronunciation).
  { ipa: '/eɪ/', type: 'Diphthong', word: 'say', examples: ['make', 'rain'], hindi: 'से', tip: 'Start with /e/ and glide smoothly into /ɪ/.' },
  { ipa: '/aɪ/', type: 'Diphthong', word: 'my', examples: ['fine', 'sky'], hindi: 'माई', tip: 'Start with /ɑː/ and glide into /ɪ/.' },
  { ipa: '/ɔɪ/', type: 'Diphthong', word: 'boy', examples: ['voice', 'coin'], hindi: 'बॉय', tip: 'Start with /ɔː/ and glide into /ɪ/.' },
  { ipa: '/əʊ/', type: 'Diphthong', word: 'go', examples: ['home', 'show'], hindi: 'गो', tip: 'Start with /ə/ and glide into /ʊ/.' },
  { ipa: '/aʊ/', type: 'Diphthong', word: 'out', examples: ['cow', 'house'], hindi: 'आउट', tip: 'Start with /ɑː/ and glide into /ʊ/.' },
  { ipa: '/ɪə/', type: 'Diphthong', word: 'hear', examples: ['near', 'beer'], hindi: 'हियर', tip: 'Start with /ɪ/ and glide into /ə/.' },
  { ipa: '/eə/', type: 'Diphthong', word: 'hair', examples: ['wear', 'care'], hindi: 'हेयर', tip: 'Start with /e/ and glide into /ə/.' },
  { ipa: '/ʊə/', type: 'Diphthong', word: 'pure', examples: ['tour', 'cure'], hindi: 'प्योर', tip: 'Start with /ʊ/ and glide into /ə/.' },

  // Simple English: Consonants subgroup.
  { ipa: '/p/', type: 'Consonant', word: 'pen', examples: ['pop', 'pin'], hindi: 'पेन', tip: 'Press lips together and release a puff of air.' },
  { ipa: '/b/', type: 'Consonant', word: 'bad', examples: ['boy', 'big'], hindi: 'बैड', tip: 'Press lips together, use your voice box.' },
  { ipa: '/t/', type: 'Consonant', word: 'tea', examples: ['top', 'two'], hindi: 'टी', tip: 'Tap tongue tip behind front upper teeth.' },
  { ipa: '/d/', type: 'Consonant', word: 'did', examples: ['dog', 'day'], hindi: 'डिड', tip: 'Tap tongue tip behind front teeth, use voice.' },
  { ipa: '/k/', type: 'Consonant', word: 'cat', examples: ['key', 'car'], hindi: 'कैट', tip: 'Block air with back of tongue, release puff.' },
  { ipa: '/g/', type: 'Consonant', word: 'go', examples: ['get', 'big'], hindi: 'गो', tip: 'Block air with back of tongue, use voice.' },
  { ipa: '/f/', type: 'Consonant', word: 'fall', examples: ['five', 'off'], hindi: 'फॉल', tip: 'Touch top teeth to bottom lip, blow air.' },
  { ipa: '/v/', type: 'Consonant', word: 'van', examples: ['very', 'voice'], hindi: 'वैन', tip: 'Touch teeth to bottom lip, add vibration.' },
  { ipa: '/θ/', type: 'Consonant', word: 'thin', examples: ['think', 'three'], hindi: 'थिन', tip: 'Put tongue between teeth, blow quiet air.' },
  { ipa: '/ð/', type: 'Consonant', word: 'this', examples: ['the', 'they'], hindi: 'दिस', tip: 'Put tongue between teeth, add voice vibration.' },
  { ipa: '/s/', type: 'Consonant', word: 'see', examples: ['sing', 'sit'], hindi: 'सी', tip: 'Put tongue close to teeth, hiss air out.' },
  { ipa: '/z/', type: 'Consonant', word: 'zoo', examples: ['zero', 'buzz'], hindi: 'ज़ू', tip: 'Put tongue close to teeth, buzz like a bee.' },
  { ipa: '/ʃ/', type: 'Consonant', word: 'she', examples: ['shop', 'sure'], hindi: 'शी', tip: 'Push lips out, blow quiet "shh" sound.' },
  { ipa: '/ʒ/', type: 'Consonant', word: 'vision', examples: ['measure', 'casual'], hindi: 'विज़न', tip: 'Push lips out, say "zhh" with voice.' },
  { ipa: '/h/', type: 'Consonant', word: 'how', examples: ['hat', 'hot'], hindi: 'हाउ', tip: 'Blow warm air out from back of throat.' },
  { ipa: '/tʃ/', type: 'Consonant', word: 'chin', examples: ['chair', 'cheap'], hindi: 'चिन', tip: 'Start with /t/ and push directly into /ʃ/.' },
  { ipa: '/dʒ/', type: 'Consonant', word: 'joy', examples: ['job', 'general'], hindi: 'जॉय', tip: 'Start with /d/ and push directly into /ʒ/.' },
  { ipa: '/m/', type: 'Consonant', word: 'man', examples: ['my', 'more'], hindi: 'मैन', tip: 'Close your lips, push air out through nose.' },
  { ipa: '/n/', type: 'Consonant', word: 'no', examples: ['name', 'new'], hindi: 'नो', tip: 'Touch tongue behind teeth, air through nose.' },
  { ipa: '/ŋ/', type: 'Consonant', word: 'sing', examples: ['song', 'ring'], hindi: 'सिंग', tip: 'Back of tongue blocks throat, air through nose.' },
  { ipa: '/l/', type: 'Consonant', word: 'love', examples: ['light', 'look'], hindi: 'लव', tip: 'Press tongue tip behind teeth, air goes past sides.' },
  { ipa: '/r/', type: 'Consonant', word: 'red', examples: ['run', 'right'], hindi: 'रेड', tip: 'Curl tongue back slightly, do not touch roof.' },
  { ipa: '/j/', type: 'Consonant', word: 'yes', examples: ['you', 'year'], hindi: 'यस', tip: 'Glide quickly from a high /i/ shape.' },
  { ipa: '/w/', type: 'Consonant', word: 'wet', examples: ['win', 'west'], hindi: 'वेट', tip: 'Round lips into a tight O and open them.' }
];

// Simple English: Export default React page layout.
export default function IPAChartPage() {
  // Simple English: Track selected sound filter tab.
  const [filter, setFilter] = useState('All');
  // Simple English: Track currently selected sound to display in detail box.
  const [selectedSound, setSelectedSound] = useState(IPA_SOUNDS[0]);

  // Simple English: Play word pronunciation using browser SpeechSynthesis.
  const speakWord = (wordText) => {
    // Simple English: Check if speech synthesis exists in user browser.
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Simple English: Stop any currently speaking sounds.
      window.speechSynthesis.cancel();
      // Simple English: Create a speech request for the target word.
      const utterance = new SpeechSynthesisUtterance(wordText);
      // Simple English: Set language accent to United States English.
      utterance.lang = 'en-US';
      // Simple English: Adjust speed rate to normal speech.
      utterance.rate = 0.9;
      // Simple English: Trigger voice synthesis.
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Filter sound list according to selected category tab.
  const filteredSounds = IPA_SOUNDS.filter((sound) => {
    if (filter === 'All') return true; // Simple English: Show all sounds.
    if (filter === 'Vowels') return sound.type.includes('Vowel'); // Simple English: Show Monophthongs.
    if (filter === 'Diphthongs') return sound.type === 'Diphthong'; // Simple English: Show glided vowels.
    if (filter === 'Consonants') return sound.type === 'Consonant'; // Simple English: Show consonants.
    return true;
  });

  return (
    // Simple English: Outer layout wrapper with vertical spacing.
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Simple English: Navigation link back to Pronunciation Lab dashboard */}
      <Link href="/pronunciation-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Pronunciation Lab
      </Link>

      {/* Simple English: Bento-style header panel */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-cyan-600/10 via-sky-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <span>🗣️</span> Interactive IPA Chart
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            English language has 44 core sounds representing vowels and consonants. 
            Click any sound to hear the audio representation and read mouth-position tips!
          </p>
        </div>
      </div>

      {/* Simple English: Two-column responsive bento layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simple English: Left and middle column (sound grids) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simple English: Tabs bar for selecting categories */}
          <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/5 w-fit">
            {['All', 'Vowels', 'Diphthongs', 'Consonants'].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setFilter(tabName)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === tabName
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Simple English: Fluid grid container for the phonetic sounds */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {filteredSounds.map((sound, i) => (
              <motion.button
                key={sound.ipa}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.01 }}
                onClick={() => {
                  setSelectedSound(sound); // Simple English: Show details on right box.
                  speakWord(sound.word); // Simple English: Audibly play key word.
                }}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedSound.ipa === sound.ipa
                    ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/5'
                    : 'border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                {/* Simple English: IPA notation symbol */}
                <span className="text-xl font-bold text-white">{sound.ipa}</span>
                {/* Simple English: Key example word */}
                <span className="text-xs text-slate-400 font-medium">{sound.word}</span>
                {/* Simple English: Hindi equivalents */}
                <span className="text-[10px] text-cyan-300/60">{sound.hindi}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Simple English: Right column (Detail inspector panel) */}
        <div className="space-y-6">
          <div className="card p-6 border border-white/10 bg-white/3 rounded-2xl flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* Simple English: Display category category */}
                <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md">
                  {selectedSound.type}
                </span>
                {/* Simple English: Button to speak current sound word */}
                <button
                  onClick={() => speakWord(selectedSound.word)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              {/* Simple English: Big IPA symbol display */}
              <div className="text-center py-6">
                <h2 className="text-6xl font-black text-white tracking-wide">{selectedSound.ipa}</h2>
                <p className="text-lg text-slate-300 mt-2 font-bold capitalize">"{selectedSound.word}"</p>
                <p className="text-sm text-cyan-400">Hindi pronunciation: {selectedSound.hindi}</p>
              </div>

              {/* Simple English: Sound instructions and guidelines */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info size={12} /> Mouth Placement & Tip
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/2 p-3 rounded-xl border border-white/5">
                  {selectedSound.tip}
                </p>
              </div>

              {/* Simple English: More examples mapping */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Star size={12} /> Practice Words
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSound.examples.map((exampleWord) => (
                    <button
                      key={exampleWord}
                      onClick={() => speakWord(exampleWord)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-xs text-white font-medium transition-all flex items-center gap-1"
                    >
                      <Volume2 size={10} />
                      {exampleWord}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simple English: Play audio chimes button */}
            <div className="pt-6 border-t border-white/5">
              <button
                onClick={() => {
                  speakWord(selectedSound.word); // Simple English: Pronounce key word.
                  playSound('click'); // Simple English: Play sound system chime.
                }}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2"
              >
                <Volume2 size={14} /> Listen Pronunciation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
