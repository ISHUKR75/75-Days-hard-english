'use client';
// Blog Post Dynamic Page — Full article view

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';

// Post content lookup — real content per slug
const POST_CONTENT = {
  'how-i-learned-english-in-75-days': {
    title: 'How I Learned English in 75 Days — From Zero to Office Meetings',
    emoji: '🏆',
    category: 'Success Stories',
    author: 'Rahul Kumar',
    date: 'July 2, 2026',
    readTime: '5 min',
    color: 'from-amber-500 to-orange-600',
    content: `
Mera naam Rahul Kumar hai. Main ek 3rd-year B.Tech student hoon. Mujhe always ek badi problem thi — main English mein bakwas nahi karta tha, lekin jab koi interviewer ya professor se baat karni padti thi... main blank ho jaata tha.

## Meri Problem

Mere marks achhe the. Mera technical knowledge solid tha. But jab placement season aaya — every company ki first round conversational thi.

Main pehle 8 companies ke interviews fail kiya — sirf English ki wajah se. "Communication skills weak hai" yahi feedback aata tha.

Bahut dukh hua. Lagta tha ki merit se zyada fluency matter karti hai.

## 75 Days Hard English ka Pata Chala

Ek friend ne suggest kiya. "Yaar yeh try karo — real practice hai, bakwaas theory nahi."

Main skeptical tha. But kuch nahi tha khoone ko.

Day 1 se mujhe difference dikh gaya. Questions Hindi mein the — translate karo English mein. Exactly meri weakness target kar raha tha.

## The Journey — Week by Week

**Week 1-2:** Basics — tenses, imperatives, be verb. Boring lag raha tha. But maine streak maintain ki.

**Week 3-4:** Modal verbs aur professional phrases. "Should I proceed?" "May I?" — yeh phrases office mein actually kaam aate hain!

**Week 5-8:** Questions, conditionals, reported speech. Ek din realize kiya — main Hindi mein sochna band kar ke directly English mein soch raha tha. Yeh moment game-changer tha.

**Week 9-11:** Professional English — emails, presentations, interviews. Is section ne meri life badal di literally.

## Day 75 — The Test

Final mock interview diya — AI ke saath 45 minutes. 

Result: 87% fluency score. "Communication skills: Strong" ka feedback.

## After 75 Days

Agli company ka interview liya — Infosys. HR round mein smooth conversation ki. Technical round mein questions clearly explain kiya.

Result: Selected. ₹6 LPA offer.

Wo moment jab offer letter aaya... main roya. Seriously.

## Meri Advice

1. Roz 30 minutes — no excuses
2. Streak mat todna — motivation milti hai
3. Practice questions bilkul skip mat karo
4. Speaking Lab use karo — daily 5 minutes loud reading

75 Days Hard English ne mujhe job nahi di. Mujhe confidence diya. Job toh merit se mili. But confidence ke bina merit bhi kaam nahi aati.

All the best to everyone on their journey! 💪
    `,
  },
  'modal-verbs-complete-guide': {
    title: 'Modal Verbs Complete Guide — Can, Should, Must, May, Might',
    emoji: '🔑',
    category: 'Grammar',
    author: 'Editorial Team',
    date: 'June 28, 2026',
    readTime: '12 min',
    color: 'from-purple-500 to-pink-600',
    content: `
Modal Verbs English grammar ka ek important part hain. Hindi speakers ke liye yeh confusing ho jaate hain kyunki Hindi mein modals ka usage English se alag hai.

## Modal Verbs Kya Hote Hain?

Modal verbs helping verbs hain jo main verb ke saath use hote hain. Yeh show karte hain: ability, possibility, permission, obligation.

Main modal verbs: **Can, Could, Will, Would, Should, Must, May, Might, Shall, Ought to**

**Formula:** Subject + Modal + Base Verb (no -s, no -ing, no -ed)

---

## CAN — Ability / Permission

**Uses:**
- Ability: मैं English बोल सकता हूँ। → I can speak English.
- Permission: क्या मैं जा सकता हूँ? → Can I go?
- Possibility: यह हो सकता है। → This can happen.

**❌ Wrong:** I can speaks English.
**✅ Correct:** I can speak English.

---

## COULD — Past Ability / Polite Request

**Uses:**
- Past ability: जब मैं छोटा था, तेज़ दौड़ सकता था। → When I was young, I could run fast.
- Polite request: क्या आप मेरी help कर सकते हैं? → Could you help me? (more polite than "Can you?")
- Possibility: शायद वह आए। → He could come.

---

## SHOULD — Advice / Recommendation

**Uses:**
- Advice: तुम्हें डॉक्टर के पास जाना चाहिए। → You should see a doctor.
- Recommendation: तुम्हें यह film देखनी चाहिए। → You should watch this film.
- Expectation: वह अब तक आ जाना चाहिए था। → He should have come by now.

---

## MUST — Strong Obligation / Certainty

**Uses:**
- Obligation: तुम्हें समय से आना MUST है। → You must come on time.
- Certainty: वह बहुत थका हुआ होगा। → He must be very tired.

**Must vs Should:**
- Must = compulsory (ज़रूरी)
- Should = recommended (सलाह)

---

## MAY / MIGHT — Possibility

**May:** 50% possibility → वह आ सकता है। → He may come.
**Might:** 30% possibility → शायद वह आए। → He might come.

**May:** Permission (formal) → क्या मैं अंदर आ सकता हूँ? → May I come in?

---

## Quick Reference Table

| Modal | Use | Example |
|-------|-----|---------|
| Can | Ability | I can swim |
| Could | Past / Polite | Could you help? |
| Should | Advice | You should rest |
| Must | Strong obligation | You must go |
| May | Permission / Possibility | May I? / It may rain |
| Might | Low possibility | It might rain |

---

## Common Mistakes

**❌ Wrong:** You should to go.
**✅ Correct:** You should go. (No "to" after modals)

**❌ Wrong:** He can swims.
**✅ Correct:** He can swim. (Base verb after modals)

**❌ Wrong:** She musts come.
**✅ Correct:** She must come. (Modals never take -s)

Practice these on 75 Days Hard English — 500+ questions per modal! 🚀
    `,
  },
  'how-to-improve-pronunciation': {
    title: 'How to Improve English Pronunciation — 7 Daily Exercises',
    emoji: '🎤',
    category: 'Speaking',
    author: 'Priya Verma',
    date: 'June 15, 2026',
    readTime: '7 min',
    color: 'from-cyan-500 to-sky-600',
    content: `
Pronunciation improve karna mushkil nahi hai — agar sahi exercises karo. Yeh 7 exercises daily 10 minutes mein karo aur 30 days mein clear difference aayega.

## Why Pronunciation Matters

Fluent grammar ke bawajood, agar pronunciation clear nahi hai toh native speakers ko samajhna mushkil ho jaata hai.

Good pronunciation matlab: **clarity** — sirf accent nahi.

---

## Exercise 1: Shadowing (5 min/day)

**What:** Koi English video ya podcast sunao aur simultaneously saath mein bolo.

**How:** 
1. English show ke ek 1-minute clip lo
2. Pehli baar sirf suno
3. Doosri baar slowly saath mein bolo
4. Teesri baar match karne ki koshish karo

**Best sources:** TED Talks, BBC Learning English, American news anchors

---

## Exercise 2: Minimal Pairs Practice (3 min/day)

Hindi speakers commonly mix up these pairs:

- **v / w:** vine vs wine, vest vs west
- **p / b:** pin vs bin, pack vs back  
- **th / d/t:** this vs dis, three vs tree
- **ship / sheep:** ship 🚢 vs sheep 🐑

**Practice:** Say each pair 10 times, exaggerating the difference.

---

## Exercise 3: Record Yourself (2 min/day)

**The most powerful exercise.** Record one paragraph daily and listen back.

You'll immediately hear what others hear. It's uncomfortable at first — but gold for improvement.

**App suggestion:** Use your phone's voice recorder. Keep a week's worth of recordings to track progress.

---

## Exercise 4: Stress and Rhythm (2 min/day)

English is a **stress-timed** language — certain syllables are stressed, others are reduced.

**PHOtograph, phoTOgraphy, photoGRAPHic** — same word, different stress!

**Practice:** Clap on stressed syllables.

---

## Exercise 5: The "TH" Sound (1 min/day)

This is the #1 difficulty for Hindi speakers.

**Voiced TH (this, that, the):** Tongue between teeth, voice on.
**Voiceless TH (think, three, thanks):** Tongue between teeth, no voice.

**Daily practice:** "This, that, think, three, thanks, the" — 20 times each morning.

---

## Exercise 6: Connected Speech (2 min/day)

Native speakers connect words together:
- "Did you" → "Didja"
- "Going to" → "Gonna"  
- "Want to" → "Wanna"

**Exercise:** Listen for these in movies and mark them in subtitles.

---

## Exercise 7: Tongue Twisters (1 min/day)

Classic but works!

- "She sells seashells by the seashore"
- "Peter Piper picked a peck of pickled peppers"
- "How much wood would a woodchuck chuck"

Start slow, then increase speed while maintaining clarity.

---

## 30-Day Plan

| Week | Focus | Daily Time |
|------|-------|------------|
| 1 | Shadowing + Recording | 10 min |
| 2 | Add Minimal Pairs | 12 min |
| 3 | Add TH Sound + Connected Speech | 15 min |
| 4 | Full routine + Tongue Twisters | 15 min |

Consistency beats intensity. 10 minutes daily > 2 hours once a week.

Practice on 75 Days Hard English Pronunciation Lab for guided exercises! 🎤
    `,
  },
  'top-10-english-grammar-mistakes': {
    title: 'Top 10 Grammar Mistakes Hindi Speakers Make',
    emoji: '📝',
    category: 'Grammar',
    author: 'Priya Verma',
    date: 'July 5, 2026',
    readTime: '8 min',
    color: 'from-indigo-500 to-blue-600',
    content: `
Hindi speakers English mein kuch specific mistakes repeatedly karte hain. Yeh mistakes isliye hoti hain kyunki Hindi aur English ke grammar rules alag hote hain.

## Mistake 1: "He eat" instead of "He eats"

**❌ Wrong:** He eat rice every day.
**✅ Correct:** He eats rice every day.

**Why?** He/She/It ke saath verb mein -s/-es lagta hai. Hindi mein yeh rule nahi hai isliye bhool jaate hain.

**Rule:** I/We/You/They → eat | He/She/It → eats

---

## Mistake 2: "I am go" instead of "I go"

**❌ Wrong:** I am go to school.
**✅ Correct:** I go to school.

**Why?** "Am/Is/Are" aur base verb saath nahi aate simple tense mein. "Am" ke baath -ing form chahiye.

**Rule:** I go (simple) | I am going (continuous)

---

## Mistake 3: "Since 2 years" instead of "For 2 years"

**❌ Wrong:** I have been here since 2 years.
**✅ Correct:** I have been here for 2 years.

**Why?** "Since" specific point of time ke liye | "For" duration ke liye

**Rule:** Since 2022 ✅ | For 2 years ✅

---

## Mistake 4: "Discuss about" instead of "Discuss"

**❌ Wrong:** Let's discuss about the project.
**✅ Correct:** Let's discuss the project.

**Why?** "Discuss" already means "talk about" — "about" redundant hai.

---

## Mistake 5: "Revert back" instead of "Revert"

**❌ Wrong:** Please revert back to me.
**✅ Correct:** Please revert to me. (Or: "Please reply")

**Why?** "Revert" already means "go back" — "back" unnecessary hai.

---

## Mistake 6: "Do the needful"

**❌ Wrong:** Kindly do the needful.
**✅ Correct:** Kindly take the required action. / Please handle this.

**Why?** "Do the needful" is old British English — modern professional English mein nahi use karte.

---

## Mistake 7: "Prepone" instead of "Move up / Reschedule earlier"

**❌ Wrong:** Let's prepone the meeting.
**✅ Correct:** Let's move the meeting to an earlier time.

**Why?** "Prepone" Indian English mein use hota hai but globally nahi pehchana jaata.

---

## Mistake 8: "I am having" instead of "I have"

**❌ Wrong:** I am having a car.
**✅ Correct:** I have a car.

**Why?** "Have" possession ke liye present simple mein hota hai. Continuous form nahi.

**Exception:** "I am having lunch" (eating) ✅ — action ho toh continuous theek hai.

---

## Mistake 9: Yesterday I have gone vs I went

**❌ Wrong:** Yesterday, I have gone to the market.
**✅ Correct:** Yesterday, I went to the market.

**Why?** "Yesterday" specific past time hai — Past Simple use hota hai, not Present Perfect.

**Rule:** Yesterday/Last week/In 2020 → Past Simple (went, ate, came)

---

## Mistake 10: "More better" instead of "Better"

**❌ Wrong:** This phone is more better.
**✅ Correct:** This phone is better.

**Why?** "Better" already comparative hai — "more" add nahi karte.

**Rule:** good → better → best (no "more" needed)

---

## Summary

In 10 mistakes ko avoid karo aur aapki English automatically improve ho jaayegi. Ek ek rule practice karo — roz 5 sentences banao in rules pe. 75 Days Hard English pe practice karo!
    `,
  },
};

const RELATED_POSTS = [
  { slug: 'modal-verbs-complete-guide', title: 'Modal Verbs Complete Guide', emoji: '🔑', readTime: '12 min' },
  { slug: '500-daily-use-english-words', title: '500 Daily Use English Words', emoji: '📖', readTime: '15 min' },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = POST_CONTENT[slug] || {
    title: 'Article Not Found',
    emoji: '📝',
    category: 'Blog',
    author: 'Editorial Team',
    date: 'June 2026',
    readTime: '5 min',
    color: 'from-slate-500 to-slate-600',
    content: 'This article is coming soon. Check back later!',
  };

  // Render markdown-like content
  const renderContent = (content) => {
    return content.trim().split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-white mt-8 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('**❌ Wrong:**')) return <div key={i} className="flex items-start gap-2 my-1.5"><span className="text-xs font-bold text-red-400 shrink-0 mt-0.5">❌</span><p className="text-sm text-red-300">{line.replace('**❌ Wrong:** ', '')}</p></div>;
      if (line.startsWith('**✅ Correct:**')) return <div key={i} className="flex items-start gap-2 my-1.5 mb-3"><span className="text-xs font-bold text-emerald-400 shrink-0 mt-0.5">✅</span><p className="text-sm text-emerald-300 font-semibold">{line.replace('**✅ Correct:** ', '')}</p></div>;
      if (line.startsWith('**Why?**')) return <p key={i} className="text-sm text-slate-400 my-2 pl-4 border-l-2 border-amber-500/40">{line.replace('**Why?** ', '')}</p>;
      if (line.startsWith('**Rule:**')) return <div key={i} className="my-2 px-3 py-2 rounded-lg bg-indigo-500/8 border border-indigo-500/15"><p className="text-xs font-semibold text-indigo-300">{line.replace('**Rule:** ', '📌 ')}</p></div>;
      if (line.startsWith('**Exception:**')) return <div key={i} className="my-2 px-3 py-2 rounded-lg bg-amber-500/8 border border-amber-500/15"><p className="text-xs text-amber-300">{line.replace('**Exception:**', '⚠️')}</p></div>;
      if (line === '---') return <hr key={i} className="border-white/8 my-6" />;
      if (!line.trim()) return <br key={i} />;
      return <p key={i} className="text-slate-300 text-sm leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${post.color} text-white text-xs font-bold mb-4`}>
              {post.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
              {post.emoji} {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article content ───────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-sm max-w-none"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* CTA */}
          <div className="mt-10 p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center">
            <p className="font-bold text-white mb-2">Is topic ko aur depth mein practice karo 🚀</p>
            <p className="text-sm text-slate-400 mb-4">500+ practice questions available on 75 Days Hard English</p>
            <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold">
              Start Practicing Free <ArrowRight size={14} />
            </Link>
          </div>

          {/* Related posts */}
          <div className="mt-10">
            <h3 className="font-bold text-white mb-4 text-sm">Related Articles</h3>
            <div className="space-y-3">
              {RELATED_POSTS.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all group">
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.readTime} read</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
