'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useRef } from 'react'; // Simple English: Import useRef hook to reference DOM elements for in-view animations.
import { motion, useInView } from 'framer-motion'; // Simple English: Import Framer Motion for smooth hover and entrance animations.
import { Lock, Award } from 'lucide-react'; // Simple English: Import Lock and Award icons for badge states.
import { playSound } from '@/lib/sounds'; // Simple English: Import click chime from local sound utility.

export default function BadgeCard({ badge, unlocked, index }) {
  const cardRef = useRef(null); // Simple English: Create reference to bind on the wrapper div.
  const isInView = useInView(cardRef, { once: true }); // Simple English: Animate the card only the first time it scrolls into view.

  return (
    <motion.div
      ref={cardRef} // Simple English: Bind the scroll-in-view tracker to this div.
      initial={{ opacity: 0, scale: 0.8 }} // Simple English: Start slightly faded and shrunk.
      animate={isInView ? { opacity: 1, scale: 1 } : {}} // Simple English: Scale up to normal size once visible.
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 180 }} // Simple English: Apply spring physics animation staggered by index.
      onClick={() => {
        if (unlocked) {
          playSound('click'); // Simple English: Play chime if user clicks on an unlocked badge.
        }
      }}
      className={`relative flex flex-col items-center p-5 rounded-2xl border text-center transition-all ${
        unlocked
          ? 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 cursor-pointer shadow-lg shadow-yellow-500/5'
          : 'border-white/5 bg-white/2 opacity-40 grayscale select-none'
      }`}
    >
      {/* Simple English: Render a golden glow background behind the badge if it is unlocked. */}
      {unlocked && (
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-2xl pointer-events-none" />
      )}

      {/* Simple English: Display big badge emoji avatar. */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 ${
        unlocked ? 'bg-yellow-500/10' : 'bg-white/5'
      }`}>
        {unlocked ? badge.emoji : '🔒'}
      </div>

      {/* Simple English: Display badge name text. */}
      <h3 className="font-bold text-xs text-white tracking-wide">{badge.name}</h3>
      
      {/* Simple English: Display short description details. */}
      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{badge.desc}</p>

      {/* Simple English: Display XP bonus pill if unlocked. */}
      {unlocked && (
        <span className="mt-3 text-[9px] font-black text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
          <Award size={8} /> +{badge.xp} XP
        </span>
      )}
    </motion.div>
  );
}
