'use client';
// Knowledge Graph Page — Visual 75-day learning path with interactive nodes

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, BookOpen, MessageSquare, PenTool, Mic, Brain,
  ChevronRight, Star, CheckCircle2, Lock, Zap, Target,
  TrendingUp, Award, X, ArrowRight,
} from 'lucide-react';

// ── CEFR Color mapping ───────────────────────────────────────────
const CEFR_COLORS = {
  A0: { bg: 'from-emerald-500 to-green-400',   border: 'border-emerald-500/40',  text: 'text-emerald-400',   badge: 'bg-emerald-500/20 text-emerald-300' },
  A1: { bg: 'from-blue-500 to-sky-400',         border: 'border-blue-500/40',     text: 'text-blue-400',      badge: 'bg-blue-500/20 text-blue-300' },
  A2: { bg: 'from-violet-500 to-purple-400',    border: 'border-violet-500/40',   text: 'text-violet-400',    badge: 'bg-violet-500/20 text-violet-300' },
  B1: { bg: 'from-amber-500 to-orange-400',     border: 'border-amber-500/40',    text: 'text-amber-400',     badge: 'bg-amber-500/20 text-amber-300' },
  B2: { bg: 'from-rose-500 to-pink-400',        border: 'border-rose-500/40',     text: 'text-rose-400',      badge: 'bg-rose-500/20 text-rose-300' },
};

// ── Node Data ────────────────────────────────────────────────────
const NODES = [
  {
    id: 'grammar',
    label: 'Grammar',
    icon: BookOpen,
    cefr: 'A0',
    x: 50, y: 15,
    topicCount: 18,
    completion: 45,
    connectedTo: ['tenses', 'vocabulary'],
    topics: ['Nouns & Pronouns', 'Articles (a/an/the)', 'Adjectives', 'Adverbs', 'Prepositions', 'Conjunctions', 'Sentence Structure', 'Question Formation', 'Negation'],
    days: 'Days 1–15',
    description: 'Foundation of English language — parts of speech, sentence structure, and core rules.',
  },
  {
    id: 'tenses',
    label: 'Tenses',
    icon: Brain,
    cefr: 'A1',
    x: 25, y: 40,
    topicCount: 16,
    completion: 30,
    connectedTo: ['modals', 'writing'],
    topics: ['Simple Present', 'Simple Past', 'Simple Future', 'Present Continuous', 'Past Continuous', 'Present Perfect', 'Past Perfect', 'Future Perfect'],
    days: 'Days 10–30',
    description: 'All 12 English tenses with Hindi explanations and daily practice exercises.',
  },
  {
    id: 'modals',
    label: 'Modals',
    icon: Zap,
    cefr: 'A2',
    x: 75, y: 40,
    topicCount: 12,
    completion: 20,
    connectedTo: ['speaking', 'writing'],
    topics: ['Can / Could', 'Will / Would', 'Shall / Should', 'May / Might', 'Must / Have to', 'Need to / Ought to'],
    days: 'Days 25–40',
    description: 'Modal verbs for expressing ability, permission, obligation, and possibility.',
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    icon: Star,
    cefr: 'A1',
    x: 50, y: 42,
    topicCount: 22,
    completion: 60,
    connectedTo: ['speaking', 'writing'],
    topics: ['Office Vocabulary', 'Daily Life Words', 'Action Verbs', 'Describing Words', 'Phrasal Verbs', 'Idioms & Phrases', 'Collocations', 'Word Families'],
    days: 'Days 1–75 (ongoing)',
    description: '1000+ essential words organized by topic with pronunciation and example sentences.',
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: PenTool,
    cefr: 'B1',
    x: 25, y: 70,
    topicCount: 14,
    completion: 10,
    connectedTo: ['speaking'],
    topics: ['Email Writing', 'Letter Formats', 'Report Writing', 'Essay Structure', 'Paragraph Writing', 'Punctuation', 'Formal vs Informal'],
    days: 'Days 35–60',
    description: 'Professional writing skills for emails, reports, letters, and formal communication.',
  },
  {
    id: 'speaking',
    label: 'Speaking',
    icon: Mic,
    cefr: 'B2',
    x: 75, y: 70,
    topicCount: 20,
    completion: 5,
    connectedTo: [],
    topics: ['Introduction & Greetings', 'Office Conversations', 'Presentations', 'Negotiations', 'Interviews', 'Debates & Discussions', 'Storytelling', 'Giving Opinions'],
    days: 'Days 45–75',
    description: 'Fluent spoken English for professional and social situations with confidence.',
  },
];

// Connections list (pairs of node IDs)
const CONNECTIONS = [
  ['grammar', 'tenses'],
  ['grammar', 'vocabulary'],
  ['tenses', 'modals'],
  ['tenses', 'writing'],
  ['modals', 'speaking'],
  ['modals', 'writing'],
  ['vocabulary', 'speaking'],
  ['vocabulary', 'writing'],
  ['writing', 'speaking'],
];

// ── Stats ────────────────────────────────────────────────────────
const STATS = [
  { icon: CheckCircle2, label: 'Topics Mastered',   value: '23', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Network,      label: 'Connections Made',  value: '9',  color: 'text-blue-400',    bg: 'bg-blue-500/10' },
  { icon: TrendingUp,   label: 'Knowledge Score',   value: '38%', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Award,        label: 'Days Completed',    value: '12', color: 'text-amber-400',   bg: 'bg-amber-500/10' },
];

// ── SVG Connection Lines ─────────────────────────────────────────
function ConnectionLines({ nodes, activeNode }) {
  // Map id → {x, y}
  const pos = {};
  nodes.forEach(n => { pos[n.id] = { x: n.x, y: n.y }; });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {CONNECTIONS.map(([a, b]) => {
        const from = pos[a];
        const to   = pos[b];
        if (!from || !to) return null;
        const isActive = activeNode === a || activeNode === b;
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={from.x} y1={from.y}
            x2={to.x}   y2={to.y}
            stroke={isActive ? 'rgba(99,102,241,0.7)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={isActive ? '0.5' : '0.3'}
            strokeDasharray={isActive ? '0' : '1 1'}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        );
      })}
    </svg>
  );
}

// ── Single Graph Node ────────────────────────────────────────────
function GraphNode({ node, isActive, onClick }) {
  const color = CEFR_COLORS[node.cefr];
  const Icon  = node.icon;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      whileHover={{ scale: 1.12 }}
    >
      <button
        onClick={() => onClick(node)}
        className={`relative flex flex-col items-center gap-1.5 group cursor-pointer`}
      >
        {/* Glow ring when active */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${color.bg} opacity-30 blur-xl`}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}

        {/* Node circle */}
        <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-xl
          border-2 ${isActive ? color.border.replace('/40', '') : color.border}
          group-hover:shadow-2xl transition-all duration-300`}>
          <Icon size={22} className="text-white" />

          {/* Completion ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"
              strokeDasharray={`${(node.completion / 100) * 163} 163`}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Label */}
        <span className={`text-xs font-bold ${isActive ? color.text : 'text-slate-400'} group-hover:text-white transition-colors whitespace-nowrap`}>
          {node.label}
        </span>

        {/* Topic count badge */}
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${color.badge}`}>
          {node.topicCount} topics
        </span>
      </button>
    </motion.div>
  );
}

// ── Node Detail Panel ────────────────────────────────────────────
function NodeDetail({ node, onClose }) {
  const color = CEFR_COLORS[node.cefr];
  const Icon  = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="card p-5 border border-white/10 h-full overflow-y-auto scrollbar-hide"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-lg`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-black text-white text-lg">{node.label}</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color.badge}`}>
              CEFR {node.cefr}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all">
          <X size={14} />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{node.description}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500 font-medium">Completion</span>
          <span className={`text-xs font-bold ${color.text}`}>{node.completion}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${color.bg} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${node.completion}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-2.5 rounded-xl bg-white/3 border border-white/5">
          <p className="text-[10px] text-slate-500 mb-0.5">Topics</p>
          <p className="text-sm font-bold text-white">{node.topicCount}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/3 border border-white/5">
          <p className="text-[10px] text-slate-500 mb-0.5">Schedule</p>
          <p className="text-[11px] font-bold text-white">{node.days}</p>
        </div>
      </div>

      {/* Topics list */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topics Covered</p>
        <div className="space-y-1.5">
          {node.topics.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/3 hover:bg-white/6 transition-colors group cursor-pointer"
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${color.bg} shrink-0`} />
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{t}</span>
              {i < Math.floor(node.topicCount * node.completion / 100) && (
                <CheckCircle2 size={11} className="text-emerald-400 ml-auto" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2 text-sm">
        Start Learning <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function KnowledgeGraphPage() {
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNode(prev => prev?.id === node.id ? null : node);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Network size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Knowledge Graph</h1>
            <p className="text-sm text-slate-500">Your 75-day English learning path — visualized</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        {STATS.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`card p-4 flex items-center gap-3 ${bg} border-white/5`}>
            <Icon size={18} className={color} />
            <div>
              <p className="text-lg font-black text-white">{value}</p>
              <p className="text-[11px] text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CEFR Legend */}
      <motion.div
        className="card p-3 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      >
        <span className="text-xs text-slate-500 font-semibold mr-1">CEFR Level:</span>
        {Object.entries(CEFR_COLORS).map(([level, c]) => (
          <span key={level} className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.badge}`}>
            {level}
          </span>
        ))}
        <span className="text-xs text-slate-600 ml-auto">Click any node to explore</span>
      </motion.div>

      {/* Graph + Detail Panel */}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Graph canvas */}
        <motion.div
          className="flex-1 card overflow-hidden relative"
          style={{ minHeight: 420 }}
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

          {/* SVG connections */}
          <div className="absolute inset-0">
            <ConnectionLines nodes={NODES} activeNode={activeNode?.id} />
          </div>

          {/* Nodes */}
          <div className="relative w-full h-full" style={{ minHeight: 420 }}>
            {NODES.map(node => (
              <GraphNode
                key={node.id}
                node={node}
                isActive={activeNode?.id === node.id}
                onClick={handleNodeClick}
              />
            ))}
          </div>

          {/* Empty state hint */}
          {!activeNode && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-500"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <Target size={12} /> Click a node to explore topics
            </motion.div>
          )}
        </motion.div>

        {/* Detail Panel */}
        <div className={`transition-all duration-300 ${activeNode ? 'w-full lg:w-80 shrink-0' : 'w-0 overflow-hidden'}`}>
          <AnimatePresence>
            {activeNode && (
              <NodeDetail node={activeNode} onClose={() => setActiveNode(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Path Timeline */}
      <motion.div
        className="card p-5"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      >
        <h2 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <ChevronRight size={16} className="text-primary-400" /> 75-Day Learning Path
        </h2>
        <div className="relative">
          {/* Track line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/5" />

          <div className="space-y-3">
            {NODES.map((node, i) => {
              const color = CEFR_COLORS[node.cefr];
              const Icon  = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="flex items-center gap-4 pl-2 group cursor-pointer"
                  onClick={() => handleNodeClick(node)}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-6 h-6 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={12} className="text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex items-center justify-between p-2.5 rounded-xl bg-white/3 hover:bg-white/6 transition-colors border border-white/5 hover:border-white/10">
                    <div>
                      <p className="font-semibold text-white text-sm">{node.label}</p>
                      <p className="text-[11px] text-slate-500">{node.days} · {node.topicCount} topics</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-xs font-bold ${color.text}`}>{node.completion}%</p>
                        <p className="text-[10px] text-slate-600">done</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color.badge}`}>{node.cefr}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
