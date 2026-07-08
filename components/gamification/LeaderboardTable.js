'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { motion } from 'framer-motion'; // Simple English: Import Framer Motion for row animation sweeps.
import { Trophy, Shield, Medal, Star } from 'lucide-react'; // Simple English: Import icons for rank markings.
import { playSound } from '@/lib/sounds'; // Simple English: Import click chime.

// Simple English: Definition of the LeaderboardTable layout.
export default function LeaderboardTable({ users, activeUserId }) {
  // Simple English: Helper function to render a gold, silver, or bronze medal for top three.
  const getRankBadge = (rankNum) => {
    if (rankNum === 1) return <Trophy size={16} className="text-yellow-400" />;
    if (rankNum === 2) return <Medal size={16} className="text-slate-300" />;
    if (rankNum === 3) return <Medal size={16} className="text-amber-600" />;
    return <span className="text-[10px] text-slate-500 font-bold font-mono">#{rankNum}</span>;
  };

  return (
    // Simple English: Responsive outer table frame wrapper.
    <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-white/2">
      <table className="w-full text-left border-collapse text-xs">
        {/* Simple English: Table Header row */}
        <thead>
          <tr className="border-b border-white/5 bg-white/1 text-slate-500 uppercase tracking-widest font-black text-[9px]">
            <th className="py-3 px-4">Rank</th>
            <th className="py-3 px-4">Student</th>
            <th className="py-3 px-4 text-center">Level</th>
            <th className="py-3 px-4 text-right">XP Points</th>
          </tr>
        </thead>
        
        {/* Simple English: Table body container list */}
        <tbody>
          {users.map((user, idx) => {
            const rank = idx + 1; // Simple English: Compute 1-based ranking index.
            const isActive = user.id === activeUserId; // Simple English: Check if current row represents the active user.

            return (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -10 }} // Simple English: Slide rows from left.
                animate={{ opacity: 1, x: 0 }} // Simple English: Settle at normal position.
                transition={{ delay: idx * 0.04 }} // Simple English: Stagger rows loading.
                onClick={() => {
                  playSound('click'); // Simple English: Play chime on row click.
                }}
                className={`border-b border-white/2 hover:bg-white/4 transition-colors cursor-pointer ${
                  isActive ? 'bg-cyan-500/10 font-bold border-l-2 border-l-cyan-400' : ''
                }`}
              >
                {/* Simple English: Column 1 - Rank medals */}
                <td className="py-3.5 px-4 flex items-center gap-1.5 min-w-[60px]">
                  {getRankBadge(rank)}
                </td>

                {/* Simple English: Column 2 - User Name and details */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    {/* Simple English: User profile placeholder initial letter */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isActive ? 'bg-cyan-400 text-slate-900' : 'bg-slate-700 text-white'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={isActive ? 'text-cyan-300' : 'text-slate-200'}>{user.name}</span>
                  </div>
                </td>

                {/* Simple English: Column 3 - User active level */}
                <td className="py-3.5 px-4 text-center text-slate-300 font-bold">
                  {user.level || 1}
                </td>

                {/* Simple English: Column 4 - XP count values */}
                <td className="py-3.5 px-4 text-right text-white font-mono font-bold">
                  {user.xp.toLocaleString()} XP
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
