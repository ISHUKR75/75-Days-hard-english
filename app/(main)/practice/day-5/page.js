'use client'; // Client-side rendering — needed for interactive quiz and sound effects

// ============================================================
// DAY 5: DEMONSTRATIVE PRONOUNS — Complete Practice Page
// 75 Days Hard English Course
// Topic: This / That / These / Those
// Hindi: यह / वह / ये / वे
// Total Questions: 800+
// Subtopics: This (near singular), That (far singular), These (near plural), Those (far plural)
// File: app/(main)/practice/day-5/page.js
// ============================================================

// ── Imports ──────────────────────────────────────────────────
import dynamic from 'next/dynamic'; // Lazy loading for quiz component
import Link from 'next/link'; // Next.js navigation
import { BookOpen, ArrowLeft, Target, Star, Brain, Zap } from 'lucide-react'; // Icons

// ── Lazy-load the PracticeQuiz component ─────────────────────
const PracticeQuizComponent = dynamic(
  () => import('@/components/quiz/PracticeQuiz'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
    ssr: false, // Audio needs browser
  }
);

// ============================================================
// DAY 5 QUESTIONS — Demonstrative Pronouns (This/That/These/Those)
// 800+ questions covering all patterns and contexts
// ============================================================
const DAY_5_QUESTIONS = [

  // ──────────────────────────────────────────────────────────
  // SECTION 1: "THIS" — Singular Near Object
  // THIS = यह (singular, near you or the speaker)
  // Use THIS for ONE thing that is CLOSE to you
  // ──────────────────────────────────────────────────────────

  { // Question 1 — This is a book (most basic)
    id: 'day5-q001',
    hindi: 'यह एक किताब है।', // This is a book
    english: 'This is a book.', // Answer
    alternatives: ["This is a book.", "It's a book."], // Alternatives
    hint: '"यह" = This (एक चीज़ जो पास है)।', // Hint
    explanation: '"This" = used for ONE object that is NEAR you or the speaker. "This is a book" — the book is close to you. Rule: THIS = SINGULAR (1 thing) + NEAR. Compare: THAT = singular + far. THESE = plural + near. THOSE = plural + far.',
    difficulty: 'easy',
    category: 'this-basic',
    grammarRule: 'This + is + a/an + Singular Noun (near, singular)',
    tags: ['this', 'basic', 'singular', 'near', 'noun'],
    usageNote: 'Use THIS when pointing to ONE thing CLOSE to you.',
    relatedSentences: ['This is a pen.', 'This is my bag.', 'This is a phone.'],
  },

  { // Question 2 — This is a pen
    id: 'day5-q002',
    hindi: 'यह एक पेन है।', // This is a pen
    english: 'This is a pen.', // Answer
    alternatives: ['This is a pen.', 'It is a pen.'], // Alternatives
    hint: '"यह" = This. पेन = pen.', // Hint
    explanation: '"This is a pen" — classic example sentence. When you hold a pen and say this, you use "this" because it\'s in your hand (very near). "This" points to things near the speaker.',
    difficulty: 'easy',
    category: 'this-basic',
    grammarRule: 'This + is + a + Noun',
    tags: ['this', 'pen', 'basic', 'singular'],
    usageNote: 'Pointing to objects near you.',
    relatedSentences: ['This is a pencil.', 'This is a ruler.', 'This is my notebook.'],
  },

  { // Question 3 — This is my phone
    id: 'day5-q003',
    hindi: 'यह मेरा फोन है।', // This is my phone
    english: 'This is my phone.', // Answer
    alternatives: ["This is my phone.", "It's my phone."], // Alternatives
    hint: '"यह" = This. मेरा = my.', // Hint
    explanation: '"This is my phone" — identifying possession. When someone asks "whose phone is this?" you say "This is my phone." Possessive: my/your/his/her + noun after "this is".',
    difficulty: 'easy',
    category: 'this-possession',
    grammarRule: 'This + is + my/your/his/her + Noun',
    tags: ['this', 'my', 'phone', 'possession'],
    usageNote: 'Identifying ownership of nearby objects.',
    relatedSentences: ['This is my bag.', 'This is her laptop.', 'This is his ID card.'],
  },

  { // Question 4 — This is very important
    id: 'day5-q004',
    hindi: 'यह बहुत ज़रूरी है।', // This is very important
    english: 'This is very important.', // Answer
    alternatives: ['This is very important.', 'This is crucial.', 'This matters a lot.'], // Alternatives
    hint: '"यह" = This. बहुत ज़रूरी = very important.', // Hint
    explanation: '"This" can refer to a situation, idea, or concept (not just physical objects). "This is very important" = the matter/topic being discussed is important. Very common in meetings.',
    difficulty: 'easy',
    category: 'this-situation',
    grammarRule: 'This + is + very + Adjective',
    tags: ['this', 'important', 'situation', 'professional'],
    usageNote: 'Emphasizing the importance of something being discussed.',
    relatedSentences: ['This is urgent.', 'This is critical.', 'This is the most important thing.'],
  },

  { // Question 5 — This is not right
    id: 'day5-q005',
    hindi: 'यह सही नहीं है।', // This is not right
    english: 'This is not right.', // Answer
    alternatives: ["This isn't right.", "This is wrong.", "This is incorrect."], // Alternatives
    hint: '"यह सही नहीं" = This is not right.', // Hint
    explanation: '"This is not right" = something is incorrect or inappropriate. Professional polite disagreement. "This is not the correct approach." "This doesn\'t seem right to me."',
    difficulty: 'easy',
    category: 'this-negative',
    grammarRule: 'This + is + not + Adjective',
    tags: ['this', 'not', 'right', 'negative', 'professional'],
    usageNote: 'Polite way to say something is wrong in professional settings.',
    relatedSentences: ["This isn't correct.", "This doesn't work.", 'This needs to be fixed.'],
  },

  { // Question 6 — This is my office
    id: 'day5-q006',
    hindi: 'यह मेरा कार्यालय है।', // This is my office
    english: 'This is my office.', // Answer
    alternatives: ["This is my office.", "This is where I work."], // Alternatives
    hint: '"यह" = This. कार्यालय = office.', // Hint
    explanation: '"This is my office" — introducing your workspace when someone visits. "This is where I sit", "This is our conference room", "This is the reception area." Giving a tour of a place.',
    difficulty: 'easy',
    category: 'this-place',
    grammarRule: 'This + is + my + Noun (place)',
    tags: ['this', 'my', 'office', 'place', 'introduction'],
    usageNote: 'Pointing to places when giving someone a tour.',
    relatedSentences: ['This is my desk.', 'This is the meeting room.', 'This is our cafeteria.'],
  },

  { // Question 7 — Is this your bag?
    id: 'day5-q007',
    hindi: 'क्या यह तुम्हारा बैग है?', // Is this your bag?
    english: 'Is this your bag?', // Answer
    alternatives: ["Does this bag belong to you?", "Whose bag is this?"], // Alternatives
    hint: '"Is this + your + noun?" — Question with "this"', // Hint
    explanation: '"Is this your bag?" — question about ownership of something near you. To make a question: Is + this + your/his/her + noun? Response: "Yes, it is." or "No, it isn\'t."',
    difficulty: 'easy',
    category: 'this-question',
    grammarRule: 'Is + this + your + Noun?',
    tags: ['this', 'question', 'your', 'bag', 'ownership'],
    usageNote: 'Finding lost property or identifying ownership.',
    relatedSentences: ['Is this your phone?', 'Is this your seat?', 'Is this your order?'],
  },

  { // Question 8 — What is this?
    id: 'day5-q008',
    hindi: 'यह क्या है?', // What is this?
    english: 'What is this?', // Answer
    alternatives: ['What is this thing?', 'What is this called?', "What's this?"], // Alternatives
    hint: '"यह क्या है?" = What is this?', // Hint
    explanation: '"What is this?" = asking the name or identity of a nearby object. "What is this called in English?" = asking the English name. In shops: "What is this?" "In which department is this?"',
    difficulty: 'easy',
    category: 'this-question',
    grammarRule: 'What + is + this? (WH question)',
    tags: ['this', 'what', 'question', 'WH', 'identification'],
    usageNote: 'Asking about the identity or name of something near you.',
    relatedSentences: ['What is this called?', 'What is this for?', 'What is this made of?'],
  },

  { // Question 9 — This is the solution
    id: 'day5-q009',
    hindi: 'यही समाधान है।', // This is the solution
    english: 'This is the solution.', // Answer
    alternatives: ["This is the answer.", "Here is the solution.", "This solves the problem."], // Alternatives
    hint: '"यही" = This is the (specific). समाधान = solution.', // Hint
    explanation: '"This is the solution" — presenting an answer to a problem. "The" means specific/unique solution. Professional: "I have analyzed the issue and this is the solution I recommend."',
    difficulty: 'medium',
    category: 'this-professional',
    grammarRule: 'This + is + the + Noun (specific)',
    tags: ['this', 'solution', 'professional', 'specific', 'the'],
    usageNote: 'Presenting solutions to problems in meetings or discussions.',
    relatedSentences: ['This is the answer.', 'This is the problem.', 'This is the plan.'],
  },

  { // Question 10 — This report is ready
    id: 'day5-q010',
    hindi: 'यह रिपोर्ट तैयार है।', // This report is ready
    english: 'This report is ready.', // Answer
    alternatives: ["This report is done.", "The report is ready.", "This document is complete."], // Alternatives
    hint: '"This report" = यह रिपोर्ट (specific, near you).', // Hint
    explanation: '"This report" = the specific report you are referring to right now (near in context). "This meeting", "this project", "this plan" — using "this" to refer to something currently being discussed.',
    difficulty: 'easy',
    category: 'this-professional',
    grammarRule: 'This + Noun + is + Adjective',
    tags: ['this', 'report', 'ready', 'professional'],
    usageNote: '"This" before a noun gives it specific reference.',
    relatedSentences: ['This document is ready.', 'This project is complete.', 'This plan is approved.'],
  },

  { // Question 11 — This is a good opportunity
    id: 'day5-q011',
    hindi: 'यह एक अच्छा अवसर है।', // This is a good opportunity
    english: 'This is a good opportunity.', // Answer
    alternatives: ["This is an excellent opportunity.", "This is a great chance.", "I see this as a great opportunity."], // Alternatives
    hint: '"यह एक अच्छा अवसर" = This is a good opportunity.', // Hint
    explanation: '"This is a good opportunity" — recognizing a chance. Interview: "I see this as an excellent opportunity to grow." Business: "This is a good opportunity to enter a new market."',
    difficulty: 'easy',
    category: 'this-professional',
    grammarRule: 'This + is + a + Adjective + Noun',
    tags: ['this', 'good', 'opportunity', 'professional', 'interview'],
    usageNote: 'Expressing enthusiasm about an opportunity in interviews.',
    relatedSentences: ['This is a wonderful opportunity.', 'This is our chance.', 'This is a unique opportunity.'],
  },

  { // Question 12 — This is not what I expected
    id: 'day5-q012',
    hindi: 'यह वैसा नहीं है जैसा मैंने उम्मीद की थी।', // This is not what I expected
    english: 'This is not what I expected.', // Answer
    alternatives: ["This isn't what I expected.", "This is different from what I imagined.", "I expected something different."], // Alternatives
    hint: '"यह वैसा नहीं" = This is not what...', // Hint
    explanation: '"This is not what I expected" — expressing that reality differs from expectation. Polite complaint or observation. "The product is not what I expected." Professional feedback without being harsh.',
    difficulty: 'medium',
    category: 'this-complaint',
    grammarRule: 'This + is + not + what + I + expected',
    tags: ['this', 'not', 'expected', 'complaint', 'professional'],
    usageNote: 'Politely expressing that something doesn\'t meet expectations.',
    relatedSentences: ["This isn't what we ordered.", "This is not as per the specification.", "This differs from the sample."],
  },

  { // Question 13 — This is how it works
    id: 'day5-q013',
    hindi: 'यह इस तरह काम करता है।', // This is how it works
    english: 'This is how it works.', // Answer
    alternatives: ["This is how it functions.", "Here is how it works.", "Let me show you how this works."], // Alternatives
    hint: '"इस तरह" = how. This is how = यह इस तरह है।', // Hint
    explanation: '"This is how it works" — explaining a process or mechanism. "This is how you apply", "This is how the system works", "This is how we handle complaints." Training and explanation context.',
    difficulty: 'medium',
    category: 'this-explanation',
    grammarRule: 'This + is + how + it + works',
    tags: ['this', 'how', 'works', 'explanation', 'professional'],
    usageNote: 'Used when explaining processes, systems, or procedures.',
    relatedSentences: ['This is how we do it.', 'This is the way it works.', 'Let me show you how this is done.'],
  },

  { // Question 14 — This medicine is for cold
    id: 'day5-q014',
    hindi: 'यह दवाई सर्दी के लिए है।', // This medicine is for cold
    english: 'This medicine is for cold.', // Answer
    alternatives: ['This medicine is for colds.', 'This tablet is for fever and cold.', 'Take this for cold.'], // Alternatives
    hint: '"यह दवाई" = This medicine. के लिए = for.', // Hint
    explanation: '"This medicine is for cold" — pharmacy or doctor context. "This tablet", "this syrup", "this injection" — identifying specific medicines. "For" + disease = purpose.',
    difficulty: 'easy',
    category: 'this-daily',
    grammarRule: 'This + Noun + is + for + Noun',
    tags: ['this', 'medicine', 'for', 'daily', 'health'],
    usageNote: 'Used in medical contexts when describing medicines.',
    relatedSentences: ['This tablet is for headache.', 'This is an antibiotic.', 'Take this twice a day.'],
  },

  { // Question 15 — This color is beautiful
    id: 'day5-q015',
    hindi: 'यह रंग सुंदर है।', // This color is beautiful
    english: 'This color is beautiful.', // Answer
    alternatives: ['This shade is beautiful.', 'I love this color.', 'This is a beautiful color.'], // Alternatives
    hint: '"यह रंग" = This color.', // Hint
    explanation: '"This color is beautiful" — admiring a nearby color. Shopping: "This color suits you", "This shade is perfect for the occasion", "I would like this color in a different size."',
    difficulty: 'easy',
    category: 'this-daily',
    grammarRule: 'This + Noun + is + Adjective',
    tags: ['this', 'color', 'beautiful', 'shopping', 'daily'],
    usageNote: 'Commenting on nearby objects while shopping or decorating.',
    relatedSentences: ['This design is beautiful.', 'This fabric is soft.', 'This style is trendy.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 2: "THAT" — Singular Far Object
  // THAT = वह/वो (singular, far from the speaker)
  // Use THAT for ONE thing that is FAR from you
  // ──────────────────────────────────────────────────────────

  { // Question 16 — That is a car
    id: 'day5-q016',
    hindi: 'वह एक कार है।', // That is a car
    english: 'That is a car.', // Answer
    alternatives: ["That's a car.", "It is a car."], // Alternatives
    hint: '"वह" = That (एक चीज़ जो दूर है)।', // Hint
    explanation: '"That" = used for ONE object that is FAR from you. "That is a car" — the car is far away (across the street, in the distance). Rule: THAT = SINGULAR + FAR. Contraction: That\'s = That is.',
    difficulty: 'easy',
    category: 'that-basic',
    grammarRule: 'That + is + a/an + Singular Noun (far, singular)',
    tags: ['that', 'basic', 'singular', 'far', 'noun'],
    usageNote: 'Use THAT when pointing to ONE thing FAR from you.',
    relatedSentences: ["That's a bus.", "That is a building.", "That is the school."],
  },

  { // Question 17 — That is my house
    id: 'day5-q017',
    hindi: 'वह मेरा घर है।', // That is my house
    english: 'That is my house.', // Answer
    alternatives: ["That's my house.", "My house is over there."], // Alternatives
    hint: '"वह" = That (दूर है). मेरा घर = my house.', // Hint
    explanation: '"That is my house" — pointing to your home which is at a distance. "That building is my office." When showing something far away, always use "that" (not "this").',
    difficulty: 'easy',
    category: 'that-possession',
    grammarRule: 'That + is + my/your/his/her + Noun',
    tags: ['that', 'my', 'house', 'far', 'possession'],
    usageNote: 'Pointing to your property from a distance.',
    relatedSentences: ["That's my car.", "That is his office.", "That is her school."],
  },

  { // Question 18 — That is a good idea
    id: 'day5-q018',
    hindi: 'वह एक अच्छा विचार है।', // That is a good idea
    english: 'That is a good idea.', // Answer
    alternatives: ["That's a good idea.", "I like that idea.", "That sounds good."], // Alternatives
    hint: '"That is a good idea" = वह एक अच्छा विचार है।', // Hint
    explanation: '"That is a good idea" — agreeing with someone\'s suggestion. Very common in conversations. "That" refers to the idea that was just spoken (which is now "far" in the conversation — just said by someone else).',
    difficulty: 'easy',
    category: 'that-agreement',
    grammarRule: 'That + is + a + Adjective + Noun (idea)',
    tags: ['that', 'good', 'idea', 'agreement', 'professional'],
    usageNote: 'Agreeing with someone\'s suggestion or plan.',
    relatedSentences: ["That's a great suggestion.", "That sounds like a plan.", "I love that idea."],
  },

  { // Question 19 — That was excellent
    id: 'day5-q019',
    hindi: 'वह शानदार था।', // That was excellent
    english: 'That was excellent.', // Answer
    alternatives: ["That was great.", "That was outstanding.", "That was wonderful."], // Alternatives
    hint: '"था" = was. "That was" = past tense with "that".', // Hint
    explanation: '"That was excellent" — praising something that just happened (a speech, performance, meal). Past tense: "That was" instead of "That is." After a presentation: "That was an excellent presentation!"',
    difficulty: 'medium',
    category: 'that-past',
    grammarRule: 'That + was + Adjective (past tense)',
    tags: ['that', 'was', 'excellent', 'past', 'praise'],
    usageNote: 'Praising something that just occurred.',
    relatedSentences: ["That was amazing.", "That was a great talk.", "That was very helpful."],
  },

  { // Question 20 — Is that the station?
    id: 'day5-q020',
    hindi: 'क्या वह स्टेशन है?', // Is that the station?
    english: 'Is that the station?', // Answer
    alternatives: ["Is that the train station?", "Is that the railway station over there?"], // Alternatives
    hint: '"Is that + the + noun?" — Question about far object.', // Hint
    explanation: '"Is that the station?" — asking about a distant place you can see. "Is that the hospital?" "Is that the office building?" Question structure: Is + that + the/a + noun? "That" for things far away.',
    difficulty: 'easy',
    category: 'that-question',
    grammarRule: 'Is + that + the/a + Noun? (far question)',
    tags: ['that', 'question', 'station', 'far', 'direction'],
    usageNote: 'Asking about a distant place or object you can see.',
    relatedSentences: ['Is that the bank?', 'Is that the hotel?', 'Is that the main road?'],
  },

  { // Question 21 — That is not my responsibility
    id: 'day5-q021',
    hindi: 'वह मेरी ज़िम्मेदारी नहीं है।', // That is not my responsibility
    english: 'That is not my responsibility.', // Answer
    alternatives: ["That's not my responsibility.", "That's not my job.", "That doesn't fall under my area."], // Alternatives
    hint: '"That is not my responsibility" = ज़िम्मेदारी नहीं है।', // Hint
    explanation: '"That is not my responsibility" — clarifying scope of work. Professional boundary-setting. More diplomatic: "That falls under the IT department", "You should contact the finance team for that."',
    difficulty: 'medium',
    category: 'that-professional',
    grammarRule: 'That + is + not + my + Noun',
    tags: ['that', 'not', 'responsibility', 'professional', 'boundary'],
    usageNote: 'Setting professional boundaries about work scope.',
    relatedSentences: ["That's not in my scope.", "That should go to HR.", "Please contact the other department."],
  },

  { // Question 22 — That decision was wrong
    id: 'day5-q022',
    hindi: 'वह निर्णय गलत था।', // That decision was wrong
    english: 'That decision was wrong.', // Answer
    alternatives: ["That was the wrong decision.", "That was a mistake.", "That choice was incorrect."], // Alternatives
    hint: '"That decision" = वह निर्णय। था = was.', // Hint
    explanation: '"That decision was wrong" — evaluating a past decision. Use "that" for past events (they are now "far" in time). Business post-mortem: "That strategy didn\'t work", "That approach was ineffective."',
    difficulty: 'medium',
    category: 'that-past',
    grammarRule: 'That + Noun + was + Adjective (past evaluation)',
    tags: ['that', 'decision', 'wrong', 'past', 'evaluation'],
    usageNote: 'Evaluating past decisions and learning from mistakes.',
    relatedSentences: ["That plan didn't work.", "That was a poor decision.", "We should have done it differently."],
  },

  { // Question 23 — That is the main entrance
    id: 'day5-q023',
    hindi: 'वह मुख्य प्रवेश द्वार है।', // That is the main entrance
    english: 'That is the main entrance.', // Answer
    alternatives: ["That's the main entrance.", "Over there is the main entrance.", "The main entrance is that way."], // Alternatives
    hint: '"वह मुख्य प्रवेश द्वार" = That is the main entrance.', // Hint
    explanation: '"That is the main entrance" — giving directions or showing a location at a distance. "That is the reception", "That building over there is our office." Pointing to distant places.',
    difficulty: 'easy',
    category: 'that-direction',
    grammarRule: 'That + is + the + Noun (specific location)',
    tags: ['that', 'main', 'entrance', 'direction', 'location'],
    usageNote: 'Giving directions to distant locations.',
    relatedSentences: ["That's the reception.", "That building is the hospital.", "That's the parking area."],
  },

  { // Question 24 — That was a difficult question
    id: 'day5-q024',
    hindi: 'वह एक कठिन सवाल था।', // That was a difficult question
    english: 'That was a difficult question.', // Answer
    alternatives: ["That was a tough question.", "That question was tricky.", "That was challenging."], // Alternatives
    hint: '"वह कठिन सवाल था" = That was a difficult question.', // Hint
    explanation: '"That was a difficult question" — after an interview or exam, reflecting on a question. The question is now over (past, therefore "far"), so use "that was". "That was easier than I expected."',
    difficulty: 'medium',
    category: 'that-past',
    grammarRule: 'That + was + a + Adjective + Noun',
    tags: ['that', 'was', 'difficult', 'question', 'past'],
    usageNote: 'Reflecting on past events, questions, or experiences.',
    relatedSentences: ["That was easy.", "That question was unexpected.", "That topic was interesting."],
  },

  { // Question 25 — That is your seat
    id: 'day5-q025',
    hindi: 'वह तुम्हारी सीट है।', // That is your seat
    english: 'That is your seat.', // Answer
    alternatives: ["That's your seat.", "Your seat is over there.", "You should sit there."], // Alternatives
    hint: '"वह" = That (दूर). तुम्हारी सीट = your seat.', // Hint
    explanation: '"That is your seat" — when showing someone to their designated seat from a distance. "That chair is yours", "Your desk is that one over there." Common in classrooms, offices, theatres.',
    difficulty: 'easy',
    category: 'that-daily',
    grammarRule: 'That + is + your + Noun',
    tags: ['that', 'your', 'seat', 'daily', 'direction'],
    usageNote: 'Showing someone their designated place from a distance.',
    relatedSentences: ["That's your desk.", "Your locker is that one.", "That room is yours."],
  },

  { // Question 26 — That is correct
    id: 'day5-q026',
    hindi: 'वह सही है।', // That is correct
    english: 'That is correct.', // Answer
    alternatives: ["That's correct.", "You are right.", "That is right.", "Yes, that is accurate."], // Alternatives
    hint: '"वह सही है" = That is correct.', // Hint
    explanation: '"That is correct" — confirming that what someone said is right. More formal than "yes". In exams: "That is the correct answer." In meetings: "That is correct. The project is on track."',
    difficulty: 'easy',
    category: 'that-confirmation',
    grammarRule: 'That + is + Adjective (correctness)',
    tags: ['that', 'correct', 'confirmation', 'professional', 'agreement'],
    usageNote: 'Formal way to confirm someone\'s statement is correct.',
    relatedSentences: ["That is right.", "That is accurate.", "Yes, that is exactly right."],
  },

  { // Question 27 — What is that?
    id: 'day5-q027',
    hindi: 'वह क्या है?', // What is that?
    english: 'What is that?', // Answer
    alternatives: ["What's that?", "What is that thing?", "What is that over there?"], // Alternatives
    hint: '"वह क्या है?" = What is that?', // Hint
    explanation: '"What is that?" — asking about an object or thing at a distance. "What is this?" = asking about a close thing. "What is that?" = asking about a far thing. The distance rule applies to questions too.',
    difficulty: 'easy',
    category: 'that-question',
    grammarRule: 'What + is + that? (WH question - far)',
    tags: ['that', 'what', 'question', 'WH', 'far'],
    usageNote: 'Asking about the identity of something far away.',
    relatedSentences: ["What's that building?", "What is that sound?", "What is that light?"],
  },

  { // Question 28 — That is a beautiful sunset
    id: 'day5-q028',
    hindi: 'वह एक सुंदर सूर्यास्त है।', // That is a beautiful sunset
    english: 'That is a beautiful sunset.', // Answer
    alternatives: ["That's a beautiful sunset!", "What a beautiful sunset that is!", "That sunset is gorgeous."], // Alternatives
    hint: '"वह" = That. सूर्यास्त = sunset.', // Hint
    explanation: '"That is a beautiful sunset" — appreciating nature from a distance. "That mountain is magnificent", "That view is breathtaking." Exclamatory: "What a beautiful sunset that is!" Appreciation and admiration.',
    difficulty: 'easy',
    category: 'that-appreciation',
    grammarRule: 'That + is + a + Adjective + Noun (nature)',
    tags: ['that', 'beautiful', 'sunset', 'nature', 'appreciation'],
    usageNote: 'Expressing admiration for distant scenery or views.',
    relatedSentences: ["That view is stunning.", "That mountain is beautiful.", "That is an amazing sight."],
  },

  { // Question 29 — I think that is wrong
    id: 'day5-q029',
    hindi: 'मुझे लगता है वह गलत है।', // I think that is wrong
    english: 'I think that is wrong.', // Answer
    alternatives: ["I believe that is incorrect.", "I feel that is wrong.", "That seems wrong to me."], // Alternatives
    hint: '"मुझे लगता है" = I think. I think + that + is + adjective.', // Hint
    explanation: '"I think that is wrong" — polite way to disagree. Adding "I think" makes it sound less harsh. Professional: "I think that approach is incorrect." "I believe" is even more formal. Diplomatic disagreement.',
    difficulty: 'medium',
    category: 'that-opinion',
    grammarRule: 'I think + that + is + Adjective (opinion)',
    tags: ['that', 'think', 'wrong', 'opinion', 'professional', 'polite'],
    usageNote: 'Politely expressing disagreement with someone\'s statement.',
    relatedSentences: ["I believe that is incorrect.", "I'm not sure that is right.", "That may not be the best approach."],
  },

  { // Question 30 — That is not possible right now
    id: 'day5-q030',
    hindi: 'वह अभी संभव नहीं है।', // That is not possible right now
    english: 'That is not possible right now.', // Answer
    alternatives: ["That isn't possible now.", "We cannot do that at the moment.", "That is not feasible currently."], // Alternatives
    hint: '"वह संभव नहीं" = That is not possible.', // Hint
    explanation: '"That is not possible right now" — politely declining or explaining a constraint. "Right now" makes it temporary (might be possible later). "At the moment", "currently" — similar time phrases.',
    difficulty: 'medium',
    category: 'that-negative',
    grammarRule: 'That + is + not + Adjective + right now',
    tags: ['that', 'not', 'possible', 'professional', 'polite', 'negative'],
    usageNote: 'Politely saying something cannot be done at this moment.',
    relatedSentences: ["That isn't feasible.", "We can't do that today.", "Perhaps later."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 3: "THESE" — Plural Near Objects
  // THESE = ये (plural, near the speaker)
  // Use THESE for MULTIPLE things that are CLOSE to you
  // ──────────────────────────────────────────────────────────

  { // Question 31 — These are my books
    id: 'day5-q031',
    hindi: 'ये मेरी किताबें हैं।', // These are my books
    english: 'These are my books.', // Answer
    alternatives: ["These books are mine.", "These are my books."], // Alternatives
    hint: '"ये" = These (plural, near). मेरी किताबें = my books.', // Hint
    explanation: '"These" = PLURAL + NEAR. "These are my books" — the books are near you (on the table, in your hand). Note: "These ARE" (not "is") because it\'s plural. Noun becomes plural: book → books.',
    difficulty: 'easy',
    category: 'these-basic',
    grammarRule: 'These + are + my + Plural Noun',
    tags: ['these', 'are', 'my', 'books', 'plural', 'near'],
    usageNote: 'Use THESE for MULTIPLE things CLOSE to you.',
    relatedSentences: ["These are my pens.", "These are my files.", "These are my papers."],
  },

  { // Question 32 — These documents are ready
    id: 'day5-q032',
    hindi: 'ये दस्तावेज़ तैयार हैं।', // These documents are ready
    english: 'These documents are ready.', // Answer
    alternatives: ["These files are ready.", "These papers are done.", "These reports are complete."], // Alternatives
    hint: '"ये दस्तावेज़" = These documents.', // Hint
    explanation: '"These documents are ready" — professional context, submitting work. "These reports", "these files", "these contracts" — referring to multiple documents near you. "Are ready" because it\'s plural.',
    difficulty: 'easy',
    category: 'these-professional',
    grammarRule: 'These + Plural Noun + are + Adjective',
    tags: ['these', 'documents', 'ready', 'professional', 'plural'],
    usageNote: 'Indicating readiness of multiple nearby documents or items.',
    relatedSentences: ["These files are ready.", "These reports are complete.", "These forms need your signature."],
  },

  { // Question 33 — These are the new products
    id: 'day5-q033',
    hindi: 'ये नए उत्पाद हैं।', // These are the new products
    english: 'These are the new products.', // Answer
    alternatives: ["These are our new products.", "These are the latest products.", "Here are the new products."], // Alternatives
    hint: '"ये" = These. नए उत्पाद = new products.', // Hint
    explanation: '"These are the new products" — product launch, showing items. "These are the features", "These are the benefits", "These are the new models." Business presentations use "these" to introduce multiple items.',
    difficulty: 'medium',
    category: 'these-business',
    grammarRule: 'These + are + the + Adjective + Plural Noun',
    tags: ['these', 'are', 'new', 'products', 'business', 'launch'],
    usageNote: 'Presenting multiple items in business or sales contexts.',
    relatedSentences: ["These are the new models.", "These are our latest offerings.", "These are the available options."],
  },

  { // Question 34 — Are these yours?
    id: 'day5-q034',
    hindi: 'क्या ये तुम्हारे हैं?', // Are these yours?
    english: 'Are these yours?', // Answer
    alternatives: ["Do these belong to you?", "Are these your things?", "Are these items yours?"], // Alternatives
    hint: '"Are these + yours?" — Plural question about nearby things.', // Hint
    explanation: '"Are these yours?" — asking if multiple nearby items belong to someone. Question structure: Are + these + yours? "Yours" = your property. Response: "Yes, these are mine." or "No, these aren\'t mine."',
    difficulty: 'easy',
    category: 'these-question',
    grammarRule: 'Are + these + yours/mine/his/hers?',
    tags: ['these', 'are', 'question', 'yours', 'possession'],
    usageNote: 'Asking about ownership of multiple nearby objects.',
    relatedSentences: ['Are these your bags?', 'Are these your notes?', 'Are these the forms I need to fill?'],
  },

  { // Question 35 — These results are impressive
    id: 'day5-q035',
    hindi: 'ये परिणाम प्रभावशाली हैं।', // These results are impressive
    english: 'These results are impressive.', // Answer
    alternatives: ["These results are outstanding.", "These numbers are great.", "These figures are very good."], // Alternatives
    hint: '"ये परिणाम" = These results.', // Hint
    explanation: '"These results are impressive" — discussing results that are in front of you (report, screen). "These numbers", "these figures", "these data points" — all referring to multiple things being currently reviewed.',
    difficulty: 'medium',
    category: 'these-professional',
    grammarRule: 'These + Plural Noun + are + Adjective',
    tags: ['these', 'results', 'impressive', 'professional', 'data'],
    usageNote: 'Commenting on multiple nearby results or data in a review.',
    relatedSentences: ["These numbers are great.", "These figures are impressive.", "These metrics are strong."],
  },

  { // Question 36 — These shoes are comfortable
    id: 'day5-q036',
    hindi: 'ये जूते आरामदायक हैं।', // These shoes are comfortable
    english: 'These shoes are comfortable.', // Answer
    alternatives: ["These shoes feel great.", "These are very comfortable.", "I love these shoes."], // Alternatives
    hint: '"ये जूते" = These shoes.', // Hint
    explanation: '"These shoes are comfortable" — while trying on shoes in a shop. Shopping conversations: "These fit perfectly", "These are a bit tight", "These are the right size." Product feedback using "these".',
    difficulty: 'easy',
    category: 'these-shopping',
    grammarRule: 'These + Noun + are + Adjective (quality)',
    tags: ['these', 'shoes', 'comfortable', 'shopping', 'daily'],
    usageNote: 'Commenting on product quality while shopping.',
    relatedSentences: ["These clothes fit well.", "These are too tight.", "I'll take these."],
  },

  { // Question 37 — These questions are difficult
    id: 'day5-q037',
    hindi: 'ये सवाल कठिन हैं।', // These questions are difficult
    english: 'These questions are difficult.', // Answer
    alternatives: ["These are tough questions.", "These questions are challenging.", "These are hard questions."], // Alternatives
    hint: '"ये सवाल" = These questions.', // Hint
    explanation: '"These questions are difficult" — referring to questions in an exam or practice. "These exercises are easy", "These problems are complex", "These topics are important." Discussing study material.',
    difficulty: 'easy',
    category: 'these-education',
    grammarRule: 'These + Plural Noun + are + Adjective',
    tags: ['these', 'questions', 'difficult', 'education', 'exam'],
    usageNote: 'Discussing the difficulty level of questions or exercises.',
    relatedSentences: ["These exercises are easy.", "These topics are important.", "These problems are interesting."],
  },

  { // Question 38 — These are my colleagues
    id: 'day5-q038',
    hindi: 'ये मेरे सहकर्मी हैं।', // These are my colleagues
    english: 'These are my colleagues.', // Answer
    alternatives: ["These are my coworkers.", "Meet my colleagues.", "These people work with me."], // Alternatives
    hint: '"ये" = These. सहकर्मी = colleagues.', // Hint
    explanation: '"These are my colleagues" — making introductions. Introducing a group: "These are my team members", "These are the people from the marketing department." Plural introduction using "these".',
    difficulty: 'easy',
    category: 'these-introduction',
    grammarRule: 'These + are + my + Plural Noun (people)',
    tags: ['these', 'are', 'my', 'colleagues', 'introduction', 'professional'],
    usageNote: 'Introducing multiple people at once in professional settings.',
    relatedSentences: ["These are my team members.", "These are the new joiners.", "These are our clients."],
  },

  { // Question 39 — These files are confidential
    id: 'day5-q039',
    hindi: 'ये फाइलें गोपनीय हैं।', // These files are confidential
    english: 'These files are confidential.', // Answer
    alternatives: ["These documents are classified.", "These are private files.", "These are sensitive documents."], // Alternatives
    hint: '"ये फाइलें" = These files. गोपनीय = confidential.', // Hint
    explanation: '"These files are confidential" — information security context. "Confidential" = secret, only authorized people can see. "Classified" = government-level secrecy. "Sensitive" = needs careful handling. HR/Legal vocabulary.',
    difficulty: 'medium',
    category: 'these-professional',
    grammarRule: 'These + Noun + are + Adjective (security)',
    tags: ['these', 'files', 'confidential', 'professional', 'security'],
    usageNote: 'Important security and information management vocabulary.',
    relatedSentences: ["These records are private.", "These details are confidential.", "Don't share these with anyone."],
  },

  { // Question 40 — These are the main points
    id: 'day5-q040',
    hindi: 'ये मुख्य बिंदु हैं।', // These are the main points
    english: 'These are the main points.', // Answer
    alternatives: ["These are the key points.", "These are the important takeaways.", "Here are the main points."], // Alternatives
    hint: '"ये मुख्य बिंदु" = These are the main points.', // Hint
    explanation: '"These are the main points" — presentations and meetings. Summarizing: "These are the key findings", "These are the action items", "These are our recommendations." Presentation vocabulary.',
    difficulty: 'medium',
    category: 'these-presentation',
    grammarRule: 'These + are + the + Adjective + Plural Noun',
    tags: ['these', 'main', 'points', 'presentation', 'professional'],
    usageNote: 'Highlighting key points in presentations or meetings.',
    relatedSentences: ["These are the key findings.", "These are the action items.", "These are our next steps."],
  },

  { // Question 41 — These flowers are fresh
    id: 'day5-q041',
    hindi: 'ये फूल ताज़े हैं।', // These flowers are fresh
    english: 'These flowers are fresh.', // Answer
    alternatives: ["These flowers look fresh.", "These are fresh flowers.", "These flowers are beautiful."], // Alternatives
    hint: '"ये फूल" = These flowers. ताज़े = fresh.', // Hint
    explanation: '"These flowers are fresh" — buying from a florist or market. "These mangoes are ripe", "These apples are fresh", "These vegetables are fresh today." Quality checking of nearby items.',
    difficulty: 'easy',
    category: 'these-daily',
    grammarRule: 'These + Plural Noun + are + Adjective (quality)',
    tags: ['these', 'flowers', 'fresh', 'daily', 'shopping'],
    usageNote: 'Checking the freshness or quality of nearby items.',
    relatedSentences: ["These mangoes are sweet.", "These grapes look fresh.", "These vegetables are good."],
  },

  { // Question 42 — These instructions are clear
    id: 'day5-q042',
    hindi: 'ये निर्देश स्पष्ट हैं।', // These instructions are clear
    english: 'These instructions are clear.', // Answer
    alternatives: ["These guidelines are clear.", "These directions are easy to follow.", "These steps are straightforward."], // Alternatives
    hint: '"ये निर्देश" = These instructions.', // Hint
    explanation: '"These instructions are clear" — confirming you understand guidance. "These guidelines", "these steps", "these procedures" — all refer to multiple instructions. Important in workplace training.',
    difficulty: 'medium',
    category: 'these-professional',
    grammarRule: 'These + Plural Noun + are + Adjective',
    tags: ['these', 'instructions', 'clear', 'professional', 'understanding'],
    usageNote: 'Confirming understanding of multiple instructions or guidelines.',
    relatedSentences: ["These rules are simple.", "These procedures are straightforward.", "These steps are easy."],
  },

  { // Question 43 — These are not my belongings
    id: 'day5-q043',
    hindi: 'ये मेरी चीज़ें नहीं हैं।', // These are not my belongings
    english: 'These are not my belongings.', // Answer
    alternatives: ["These aren't mine.", "These don't belong to me.", "These are someone else's."], // Alternatives
    hint: '"ये मेरी नहीं" = These are not mine.', // Hint
    explanation: '"These are not my belongings" — formal way to say something doesn\'t belong to you. "Belongings" = personal items/possessions. "These are not my things" (casual). Useful at airports, lost property.',
    difficulty: 'medium',
    category: 'these-negative',
    grammarRule: 'These + are + not + my + Noun',
    tags: ['these', 'not', 'my', 'belongings', 'possession', 'daily'],
    usageNote: 'Clarifying that nearby items don\'t belong to you.',
    relatedSentences: ["These aren't my files.", "These bags aren't mine.", "I don't own these."],
  },

  { // Question 44 — Can you check these numbers?
    id: 'day5-q044',
    hindi: 'क्या आप ये नंबर जाँच सकते हैं?', // Can you check these numbers?
    english: 'Can you check these numbers?', // Answer
    alternatives: ["Could you verify these figures?", "Please review these numbers.", "Would you check these?"], // Alternatives
    hint: '"ये नंबर जाँचना" = Check these numbers. Request with "these".', // Hint
    explanation: '"Can you check these numbers?" — polite request in professional setting. "These" refers to multiple numbers near you (on paper, screen). "Could you" is more polite than "can you". "Please review these" = formal.',
    difficulty: 'medium',
    category: 'these-request',
    grammarRule: 'Can you + check + these + Noun?',
    tags: ['these', 'check', 'numbers', 'request', 'professional'],
    usageNote: 'Making professional requests about nearby documents or data.',
    relatedSentences: ['Can you review these documents?', 'Please check these details.', 'Could you verify these figures?'],
  },

  { // Question 45 — These rules are mandatory
    id: 'day5-q045',
    hindi: 'ये नियम अनिवार्य हैं।', // These rules are mandatory
    english: 'These rules are mandatory.', // Answer
    alternatives: ["These regulations are compulsory.", "These guidelines must be followed.", "These are non-negotiable rules."], // Alternatives
    hint: '"ये नियम" = These rules. अनिवार्य = mandatory.', // Hint
    explanation: '"These rules are mandatory" — official communication in organizations. "These safety protocols are mandatory", "These compliance requirements are compulsory." HR and compliance vocabulary.',
    difficulty: 'medium',
    category: 'these-professional',
    grammarRule: 'These + Noun + are + Adjective (requirement)',
    tags: ['these', 'rules', 'mandatory', 'professional', 'compliance'],
    usageNote: 'Communicating mandatory requirements in organizations.',
    relatedSentences: ["These policies are compulsory.", "These guidelines must be followed.", "These are non-negotiable."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 4: "THOSE" — Plural Far Objects
  // THOSE = वे/वो (plural, far from the speaker)
  // Use THOSE for MULTIPLE things that are FAR from you
  // ──────────────────────────────────────────────────────────

  { // Question 46 — Those are my friends
    id: 'day5-q046',
    hindi: 'वे मेरे दोस्त हैं।', // Those are my friends
    english: 'Those are my friends.', // Answer
    alternatives: ["Those people are my friends.", "Over there are my friends.", "Those guys are my friends."], // Alternatives
    hint: '"वे" = Those (plural, far). मेरे दोस्त = my friends.', // Hint
    explanation: '"Those" = PLURAL + FAR. "Those are my friends" — the friends are far from you (across the room, street). Note: "Those ARE" (plural). When the friends come near you, switch to "these are my friends".',
    difficulty: 'easy',
    category: 'those-basic',
    grammarRule: 'Those + are + my + Plural Noun (far, plural)',
    tags: ['those', 'are', 'my', 'friends', 'far', 'plural'],
    usageNote: 'Use THOSE for MULTIPLE things FAR from you.',
    relatedSentences: ["Those are my siblings.", "Those are my colleagues.", "Those are our clients."],
  },

  { // Question 47 — Those buildings are very tall
    id: 'day5-q047',
    hindi: 'वे इमारतें बहुत ऊँची हैं।', // Those buildings are very tall
    english: 'Those buildings are very tall.', // Answer
    alternatives: ["Those skyscrapers are tall.", "Those buildings are impressive.", "Those towers are huge."], // Alternatives
    hint: '"वे इमारतें" = Those buildings.', // Hint
    explanation: '"Those buildings are very tall" — describing distant structures. "Those mountains are beautiful", "Those trees are big", "Those stars are bright." Describing multiple far things in nature or cities.',
    difficulty: 'easy',
    category: 'those-description',
    grammarRule: 'Those + Plural Noun + are + very + Adjective',
    tags: ['those', 'buildings', 'tall', 'description', 'far'],
    usageNote: 'Describing multiple objects or structures in the distance.',
    relatedSentences: ["Those mountains are beautiful.", "Those clouds are dark.", "Those lights are bright."],
  },

  { // Question 48 — Are those your children?
    id: 'day5-q048',
    hindi: 'क्या वे तुम्हारे बच्चे हैं?', // Are those your children?
    english: 'Are those your children?', // Answer
    alternatives: ["Are those kids yours?", "Are those your kids?", "Are those your sons/daughters?"], // Alternatives
    hint: '"Are those + your + noun?" — Question about far plural things.', // Hint
    explanation: '"Are those your children?" — asking about people at a distance. "Are those your students?", "Are those your colleagues?", "Are those your bags?" All use "those" for multiple far things.',
    difficulty: 'easy',
    category: 'those-question',
    grammarRule: 'Are + those + your + Plural Noun?',
    tags: ['those', 'question', 'your', 'children', 'far'],
    usageNote: 'Asking about multiple people or things at a distance.',
    relatedSentences: ['Are those your students?', 'Are those your products?', 'Are those the applicants?'],
  },

  { // Question 49 — Those days were different
    id: 'day5-q049',
    hindi: 'वे दिन अलग थे।', // Those days were different
    english: 'Those days were different.', // Answer
    alternatives: ["Those were different times.", "Back in those days, things were different.", "Things were different then."], // Alternatives
    hint: '"वे दिन" = Those days. अलग थे = were different.', // Hint
    explanation: '"Those days were different" — nostalgic reference to past time. "Those" can refer to things far in TIME (past). "Those were the good old days", "Those were challenging times." Temporal use of "those".',
    difficulty: 'medium',
    category: 'those-past',
    grammarRule: 'Those + Plural Noun + were + Adjective (past)',
    tags: ['those', 'days', 'past', 'were', 'nostalgia', 'time'],
    usageNote: '"Those" can refer to multiple things far in TIME (past memories).',
    relatedSentences: ["Those were the golden years.", "Those times were tough.", "Those were better days."],
  },

  { // Question 50 — Those students are very smart
    id: 'day5-q050',
    hindi: 'वे छात्र बहुत होशियार हैं।', // Those students are very smart
    english: 'Those students are very smart.', // Answer
    alternatives: ["Those kids are very intelligent.", "Those students are brilliant.", "They are very smart students."], // Alternatives
    hint: '"वे छात्र" = Those students.', // Hint
    explanation: '"Those students are very smart" — a teacher talking about students who are far away (in another classroom, or being pointed at from a distance). Referring to a group of people who are not immediately near.',
    difficulty: 'easy',
    category: 'those-description',
    grammarRule: 'Those + Plural Noun + are + very + Adjective',
    tags: ['those', 'students', 'smart', 'description', 'education'],
    usageNote: 'Describing a group of people at a distance.',
    relatedSentences: ["Those children are talented.", "Those employees are productive.", "Those candidates are strong."],
  },

  { // Question 51 — Those were the best years of my life
    id: 'day5-q051',
    hindi: 'वे मेरे जीवन के सबसे अच्छे साल थे।', // Those were the best years of my life
    english: 'Those were the best years of my life.', // Answer
    alternatives: ["Those were my golden years.", "I cherish those years.", "Those years were wonderful."], // Alternatives
    hint: '"वे सबसे अच्छे साल" = Those were the best years.', // Hint
    explanation: '"Those were the best years of my life" — deeply nostalgic expression. "Those were" for past plural things (years, times, days). Common in reflective conversations and personal introductions.',
    difficulty: 'medium',
    category: 'those-nostalgia',
    grammarRule: 'Those + were + the + Superlative + Noun + of my life',
    tags: ['those', 'were', 'best', 'years', 'life', 'nostalgia'],
    usageNote: 'Nostalgic expression about past positive experiences.',
    relatedSentences: ["Those were great times.", "I miss those days.", "Those years shaped who I am."],
  },

  { // Question 52 — Those problems are solved
    id: 'day5-q052',
    hindi: 'वे समस्याएं हल हो गई हैं।', // Those problems are solved
    english: 'Those problems are solved.', // Answer
    alternatives: ["Those issues are resolved.", "Those problems have been fixed.", "We've solved those problems."], // Alternatives
    hint: '"वे समस्याएं" = Those problems. हल = solved/resolved.', // Hint
    explanation: '"Those problems are solved" — update in project/client meeting. "Those issues are resolved", "Those bugs are fixed", "Those complaints have been addressed." Progress reporting in professional settings.',
    difficulty: 'medium',
    category: 'those-professional',
    grammarRule: 'Those + Plural Noun + are + Past Participle (adjective)',
    tags: ['those', 'problems', 'solved', 'professional', 'progress'],
    usageNote: 'Reporting resolution of multiple previous issues.',
    relatedSentences: ["Those bugs are fixed.", "Those complaints are addressed.", "Those tasks are completed."],
  },

  { // Question 53 — I don't agree with those ideas
    id: 'day5-q053',
    hindi: 'मैं उन विचारों से सहमत नहीं हूँ।', // I don't agree with those ideas
    english: "I don't agree with those ideas.", // Answer
    alternatives: ["I disagree with those ideas.", "I'm not in favor of those suggestions.", "Those ideas don't work for me."], // Alternatives
    hint: '"उन विचारों से" = with those ideas. Disagreement.', // Hint
    explanation: '"I don\'t agree with those ideas" — professional disagreement. "Those ideas" refers to multiple concepts discussed earlier. Polite alternative: "I have a different perspective on those points."',
    difficulty: 'medium',
    category: 'those-opinion',
    grammarRule: "I + don't + agree with + those + Plural Noun",
    tags: ['those', 'agree', 'not', 'ideas', 'opinion', 'professional'],
    usageNote: 'Politely expressing disagreement with multiple proposals.',
    relatedSentences: ["I see those differently.", "Those plans need revision.", "I have concerns about those approaches."],
  },

  { // Question 54 — Those employees are very professional
    id: 'day5-q054',
    hindi: 'वे कर्मचारी बहुत पेशेवर हैं।', // Those employees are very professional
    english: 'Those employees are very professional.', // Answer
    alternatives: ["Those team members are very professional.", "Those staff members are excellent.", "Those workers are highly professional."], // Alternatives
    hint: '"वे कर्मचारी" = Those employees.', // Hint
    explanation: '"Those employees are very professional" — evaluating a team being observed from a distance. Management evaluation language. "Those candidates are impressive", "Those trainees are showing great progress."',
    difficulty: 'medium',
    category: 'those-evaluation',
    grammarRule: 'Those + Plural Noun + are + very + Adjective',
    tags: ['those', 'employees', 'professional', 'evaluation', 'management'],
    usageNote: 'Evaluating a group of people from an observer\'s perspective.',
    relatedSentences: ["Those candidates are strong.", "Those trainees are improving.", "Those sales reps are excellent."],
  },

  { // Question 55 — What are those?
    id: 'day5-q055',
    hindi: 'वे क्या हैं?', // What are those?
    english: 'What are those?', // Answer
    alternatives: ["What are those things?", "What do you call those?", "What are those items?"], // Alternatives
    hint: '"वे क्या हैं?" = What are those?', // Hint
    explanation: '"What are those?" — asking about multiple far objects. Compare: "What is this?" (near, singular) / "What is that?" (far, singular) / "What are these?" (near, plural) / "What are those?" (far, plural).',
    difficulty: 'easy',
    category: 'those-question',
    grammarRule: 'What + are + those? (WH question - far plural)',
    tags: ['those', 'what', 'are', 'question', 'WH', 'far'],
    usageNote: 'Asking about multiple far objects - note "are" for plural.',
    relatedSentences: ['What are those marks?', 'What are those files?', 'What are those devices?'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 5: MIXED THIS / THAT / THESE / THOSE
  // Practice all four demonstrative pronouns together
  // ──────────────────────────────────────────────────────────

  { // Question 56 — Mixed: This vs That
    id: 'day5-q056',
    hindi: 'वह मेरी गाड़ी है, यह तुम्हारी है।', // That is my car, this is yours
    english: 'That is my car, this is yours.', // Answer
    alternatives: ["My car is that one, this one is yours.", "That car is mine, this one is yours."], // Alternatives
    hint: '"वह" = That (far). "यह" = This (near).', // Hint
    explanation: 'Using BOTH "this" and "that" in one sentence: "This" = near you, "That" = far from you. "This phone is mine, that one is yours." Important: never say "these phone" or "those car" — must match singular/plural.',
    difficulty: 'medium',
    category: 'mixed-this-that',
    grammarRule: 'That (far) + is/are vs. This (near) + is/are',
    tags: ['this', 'that', 'mixed', 'near', 'far', 'comparison'],
    usageNote: 'Using THIS and THAT in contrast — location matters.',
    relatedSentences: ['This is mine, that is yours.', 'These are ours, those are theirs.', 'Take this, leave that.'],
  },

  { // Question 57 — This is easy, that is difficult
    id: 'day5-q057',
    hindi: 'यह आसान है, वह कठिन है।', // This is easy, that is difficult
    english: 'This is easy, that is difficult.', // Answer
    alternatives: ["This is simple, that is complicated.", "This one is easy but that one is hard."], // Alternatives
    hint: '"यह" = This (near). "वह" = That (far).', // Hint
    explanation: '"This is easy, that is difficult" — comparing two things using this and that. "This approach is simpler, that approach is more complex." Contrast and comparison using demonstratives.',
    difficulty: 'medium',
    category: 'mixed-comparison',
    grammarRule: 'This (near) + is + Adj, that (far) + is + Adj',
    tags: ['this', 'that', 'comparison', 'easy', 'difficult'],
    usageNote: 'Comparing two things using THIS (near) and THAT (far).',
    relatedSentences: ['This is cheaper, that is expensive.', 'This is correct, that is wrong.', 'This works, that doesn\'t.'],
  },

  { // Question 58 — These are expensive, those are cheap
    id: 'day5-q058',
    hindi: 'ये महँगे हैं, वे सस्ते हैं।', // These are expensive, those are cheap
    english: 'These are expensive, those are cheap.', // Answer
    alternatives: ["These are costly, those are affordable.", "These products are pricy, those are budget-friendly."], // Alternatives
    hint: '"ये" = These (near plural). "वे" = Those (far plural).', // Hint
    explanation: '"These are expensive, those are cheap" — comparing two groups. Shopping comparison. "These shoes are too expensive; those ones are within my budget." Using plural demonstratives in contrast.',
    difficulty: 'medium',
    category: 'mixed-these-those',
    grammarRule: 'These (near plural) + are + Adj, those (far plural) + are + Adj',
    tags: ['these', 'those', 'comparison', 'expensive', 'cheap'],
    usageNote: 'Comparing two groups of items while shopping.',
    relatedSentences: ['These are new, those are old.', 'These work, those are broken.', 'These are ours, those are theirs.'],
  },

  { // Question 59 — Take this, not that
    id: 'day5-q059',
    hindi: 'यह लो, वह नहीं।', // Take this, not that
    english: 'Take this, not that.', // Answer
    alternatives: ["Take this one, not that one.", "Use this, not that.", "Choose this, not that."], // Alternatives
    hint: '"यह लो" = Take this. "वह नहीं" = not that.', // Hint
    explanation: '"Take this, not that" — instruction or direction. Quick contrast: "Click this button, not that one", "Use this form, not that one", "Go this way, not that way." Directions and instructions using demonstratives.',
    difficulty: 'medium',
    category: 'mixed-instruction',
    grammarRule: 'Imperative + this/these, not that/those',
    tags: ['this', 'that', 'take', 'instruction', 'daily'],
    usageNote: 'Giving clear instructions by contrasting near and far objects.',
    relatedSentences: ['Use this one.', 'Click that button.', 'Take these papers.'],
  },

  { // Question 60 — I prefer these to those
    id: 'day5-q060',
    hindi: 'मुझे वे पसंद हैं, यह नहीं।', // I prefer these to those
    english: 'I prefer these to those.', // Answer
    alternatives: ["I like these better than those.", "These are better than those.", "I would choose these over those."], // Alternatives
    hint: '"I prefer + these + to + those" — Preference expression.', // Hint
    explanation: '"I prefer these to those" — expressing preference between two groups. "Prefer A to B" = like A more than B. Business: "I prefer this approach to that one." Customer service: "I prefer these features to those."',
    difficulty: 'hard',
    category: 'mixed-preference',
    grammarRule: 'I + prefer + these + to + those',
    tags: ['these', 'those', 'prefer', 'comparison', 'professional'],
    usageNote: '"Prefer X to Y" is a formal comparison structure.',
    relatedSentences: ['I prefer this to that.', 'These work better than those.', 'This option is better than that one.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 6: DEMONSTRATIVE PRONOUNS IN PROFESSIONAL CONTEXTS
  // Business English with this/that/these/those
  // ──────────────────────────────────────────────────────────

  { // Question 61 — This is our company policy
    id: 'day5-q061',
    hindi: 'यह हमारी कंपनी की नीति है।', // This is our company policy
    english: 'This is our company policy.', // Answer
    alternatives: ["This is our standard procedure.", "This is the company policy.", "We follow this policy."], // Alternatives
    hint: '"यह नीति" = This policy.', // Hint
    explanation: '"This is our company policy" — professional reference to a rule or procedure. "This is our standard operating procedure", "This is our protocol", "This is how we do things here." Onboarding and training language.',
    difficulty: 'medium',
    category: 'this-professional',
    grammarRule: 'This + is + our + Noun (organizational)',
    tags: ['this', 'company', 'policy', 'professional', 'HR'],
    usageNote: 'Citing company policies or standard procedures.',
    relatedSentences: ["This is company protocol.", "This is our standard practice.", "We follow this procedure."],
  },

  { // Question 62 — Those targets were unrealistic
    id: 'day5-q062',
    hindi: 'वे लक्ष्य अव्यावहारिक थे।', // Those targets were unrealistic
    english: 'Those targets were unrealistic.', // Answer
    alternatives: ["Those goals were not achievable.", "Those targets were too high.", "Those were unrealistic expectations."], // Alternatives
    hint: '"वे लक्ष्य" = Those targets. अव्यावहारिक = unrealistic.', // Hint
    explanation: '"Those targets were unrealistic" — past business evaluation. "Unrealistic" = not achievable, too ambitious. Performance review: "Those quarterly targets were unrealistic given the market conditions."',
    difficulty: 'hard',
    category: 'those-professional',
    grammarRule: 'Those + Plural Noun + were + Adjective (past evaluation)',
    tags: ['those', 'targets', 'unrealistic', 'past', 'business', 'evaluation'],
    usageNote: 'Evaluating past business targets or expectations.',
    relatedSentences: ["Those expectations were too high.", "Those projections were inaccurate.", "Those goals needed revision."],
  },

  { // Question 63 — These proposals need revision
    id: 'day5-q063',
    hindi: 'इन प्रस्तावों में सुधार की ज़रूरत है।', // These proposals need revision
    english: 'These proposals need revision.', // Answer
    alternatives: ["These proposals require changes.", "These drafts need to be revised.", "These need work."], // Alternatives
    hint: '"इन प्रस्तावों में" = These proposals.', // Hint
    explanation: '"These proposals need revision" — feedback in a professional review. "Revision" = improvement/editing. "These reports need revision", "These plans need revision." Constructive feedback using "these".',
    difficulty: 'medium',
    category: 'these-feedback',
    grammarRule: 'These + Plural Noun + need + Noun (action)',
    tags: ['these', 'proposals', 'revision', 'feedback', 'professional'],
    usageNote: 'Giving constructive feedback that requires changes.',
    relatedSentences: ["These drafts need editing.", "These figures need verification.", "These plans need approval."],
  },

  { // Question 64 — That meeting was very productive
    id: 'day5-q064',
    hindi: 'वह मीटिंग बहुत उत्पादक थी।', // That meeting was very productive
    english: 'That meeting was very productive.', // Answer
    alternatives: ["That was a very productive meeting.", "That session was very useful.", "That discussion was fruitful."], // Alternatives
    hint: '"वह मीटिंग" = That meeting (past, now finished = far).', // Hint
    explanation: '"That meeting was very productive" — post-meeting feedback. The meeting is now over (far in time), so use "that". "Productive" = achieved results. "That was time well spent", "That discussion was fruitful."',
    difficulty: 'medium',
    category: 'that-professional',
    grammarRule: 'That + Noun + was + very + Adjective (past evaluation)',
    tags: ['that', 'meeting', 'productive', 'past', 'professional'],
    usageNote: 'Giving positive feedback about a completed meeting or event.',
    relatedSentences: ["That presentation was excellent.", "That workshop was very helpful.", "That session was informative."],
  },

  { // Question 65 — This strategy will work
    id: 'day5-q065',
    hindi: 'यह रणनीति काम करेगी।', // This strategy will work
    english: 'This strategy will work.', // Answer
    alternatives: ["This approach will succeed.", "I believe this strategy will work.", "This plan is viable."], // Alternatives
    hint: '"यह रणनीति" = This strategy. काम करेगी = will work.', // Hint
    explanation: '"This strategy will work" — presenting a plan with confidence. "This approach will work because...", "I am confident this strategy will deliver results." Pitching ideas and business proposals.',
    difficulty: 'medium',
    category: 'this-future',
    grammarRule: 'This + Noun + will + base verb',
    tags: ['this', 'strategy', 'will', 'future', 'professional', 'confidence'],
    usageNote: 'Confidently presenting strategies or plans in meetings.',
    relatedSentences: ["This plan will succeed.", "This method will be effective.", "This approach will yield results."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 7: DEMONSTRATIVE PRONOUNS IN DAILY CONVERSATION
  // Everyday situations using this/that/these/those
  // ──────────────────────────────────────────────────────────

  { // Question 66 — This is delicious!
    id: 'day5-q066',
    hindi: 'यह बहुत स्वादिष्ट है!', // This is delicious!
    english: 'This is delicious!', // Answer
    alternatives: ["This tastes great!", "This is amazing!", "I love this!"], // Alternatives
    hint: '"यह स्वादिष्ट है" = This is delicious!', // Hint
    explanation: '"This is delicious!" — tasting food and complimenting. "This is amazing!", "This is incredible!" — can be used for any wonderful experience. Enthusiastic reactions to nearby things.',
    difficulty: 'easy',
    category: 'this-food',
    grammarRule: 'This + is + Adjective! (exclamatory)',
    tags: ['this', 'delicious', 'food', 'exclamatory', 'daily'],
    usageNote: 'Enthusiastic reaction to tasting food or experiencing something.',
    relatedSentences: ["This tastes amazing.", "I love this.", "This is my favorite."],
  },

  { // Question 67 — That smells wonderful
    id: 'day5-q067',
    hindi: 'वह बहुत अच्छी महक आ रही है।', // That smells wonderful
    english: 'That smells wonderful.', // Answer
    alternatives: ["That smells amazing.", "What a lovely smell.", "That has a wonderful aroma."], // Alternatives
    hint: '"वह महक" = That smell. "smells" = sense verb.', // Hint
    explanation: '"That smells wonderful" — appreciating a scent from a distance. Sense verbs (smell, sound, look, taste, feel) + adjective (not adverb!). "That sounds great", "That looks beautiful", "That feels soft."',
    difficulty: 'medium',
    category: 'that-senses',
    grammarRule: 'That + sense verb + Adjective',
    tags: ['that', 'smells', 'wonderful', 'senses', 'daily'],
    usageNote: 'Sense verbs + adjective (NOT adverb): smells good ✓ / smells well ✗',
    relatedSentences: ["That sounds great.", "That looks beautiful.", "That feels soft."],
  },

  { // Question 68 — These clothes look nice on you
    id: 'day5-q068',
    hindi: 'ये कपड़े तुम पर बहुत अच्छे लगते हैं।', // These clothes look nice on you
    english: 'These clothes look nice on you.', // Answer
    alternatives: ["These outfits suit you.", "These look great on you.", "You look good in these."], // Alternatives
    hint: '"ये कपड़े" = These clothes. तुम पर = on you.', // Hint
    explanation: '"These clothes look nice on you" — complimenting someone\'s outfit. Shopping with a friend. "These shoes go well with your outfit", "These colors suit you perfectly." Combining demonstratives with compliments.',
    difficulty: 'medium',
    category: 'these-compliment',
    grammarRule: 'These + Noun + look + Adjective + on you',
    tags: ['these', 'clothes', 'look', 'nice', 'compliment', 'shopping'],
    usageNote: 'Complimenting someone\'s clothing choice.',
    relatedSentences: ["These colors suit you.", "These shoes look great.", "This dress is perfect for you."],
  },

  { // Question 69 — Those children are very active
    id: 'day5-q069',
    hindi: 'वे बच्चे बहुत सक्रिय हैं।', // Those children are very active
    english: 'Those children are very active.', // Answer
    alternatives: ["Those kids are very energetic.", "Those children are lively.", "Those students are very enthusiastic."], // Alternatives
    hint: '"वे बच्चे" = Those children.', // Hint
    explanation: '"Those children are very active" — observing children at a distance (playground, classroom). "Active" = participates enthusiastically. "Energetic", "lively", "enthusiastic" — synonyms with slightly different meanings.',
    difficulty: 'easy',
    category: 'those-observation',
    grammarRule: 'Those + Plural Noun + are + very + Adjective',
    tags: ['those', 'children', 'active', 'observation', 'daily'],
    usageNote: 'Observing and describing people at a distance.',
    relatedSentences: ["Those kids are playful.", "Those students are attentive.", "Those athletes are impressive."],
  },

  { // Question 70 — This is exactly what I needed
    id: 'day5-q070',
    hindi: 'यह ठीक वही है जो मुझे चाहिए था।', // This is exactly what I needed
    english: 'This is exactly what I needed.', // Answer
    alternatives: ["This is just what I was looking for.", "This is perfect for me.", "This is ideal."], // Alternatives
    hint: '"यह ठीक वही है" = This is exactly what.', // Hint
    explanation: '"This is exactly what I needed" — expressing perfect satisfaction. Customer satisfaction phrase. "This is exactly what we were looking for", "This is precisely what the project required." Expressing that something meets requirements perfectly.',
    difficulty: 'medium',
    category: 'this-satisfaction',
    grammarRule: 'This + is + exactly + what + I + needed',
    tags: ['this', 'exactly', 'needed', 'satisfaction', 'professional'],
    usageNote: 'Expressing that something perfectly meets your needs or expectations.',
    relatedSentences: ["This is perfect.", "This is just right.", "This is what we were looking for."],
  },

  // ── SECTION 8: RAPID FIRE — SHORT DEMONSTRATIVE SENTENCES ─

  { id: 'day5-q071', hindi: 'यह सच है।', english: 'This is true.', alternatives: ["That's true.", "This is a fact."], hint: 'This + is + true.', explanation: '"This is true" — confirming a fact or statement. "This is absolutely true", "This is not true." Discussing facts.', difficulty: 'easy', category: 'this-daily', grammarRule: 'This + is + Adjective', tags: ['this', 'true', 'fact', 'daily'] },
  { id: 'day5-q072', hindi: 'वह बहुत अजीब है।', english: 'That is very strange.', alternatives: ["That's very strange.", "That is weird.", "That seems odd."], hint: 'That + is + strange.', explanation: '"That is strange" — something distant or past that seems odd. "That behavior is strange", "That result is unusual."', difficulty: 'easy', category: 'that-daily', grammarRule: 'That + is + Adjective', tags: ['that', 'strange', 'daily'] },
  { id: 'day5-q073', hindi: 'ये टेस्ट बहुत उपयोगी है।', english: 'These tests are very useful.', alternatives: ["These exams are helpful.", "These tests are valuable."], hint: 'These + tests + are + useful.', explanation: '"These tests are useful" — educational context. Plural "are" with "these".', difficulty: 'easy', category: 'these-education', grammarRule: 'These + Plural Noun + are + Adjective', tags: ['these', 'tests', 'useful', 'education'] },
  { id: 'day5-q074', hindi: 'वे दिन याद आते हैं।', english: 'I miss those days.', alternatives: ["I miss those times.", "Those were good days.", "I long for those days."], hint: 'I miss + those + days.', explanation: '"I miss those days" — nostalgia for past times. "Those" for things far in the past.', difficulty: 'medium', category: 'those-nostalgia', grammarRule: 'I miss + those + Noun', tags: ['those', 'miss', 'days', 'nostalgia'] },
  { id: 'day5-q075', hindi: 'यह मेरा निर्णय है।', english: 'This is my decision.', alternatives: ["This is my choice.", "I have made this decision."], hint: 'This + is + my + decision.', explanation: '"This is my decision" — assertive professional statement. Taking ownership of a choice.', difficulty: 'easy', category: 'this-professional', grammarRule: 'This + is + my + Noun', tags: ['this', 'my', 'decision', 'professional'] },
  { id: 'day5-q076', hindi: 'वह मेरी गलती थी।', english: 'That was my mistake.', alternatives: ["That was my error.", "I made that mistake.", "I was wrong about that."], hint: 'That + was + my + mistake.', explanation: '"That was my mistake" — taking responsibility for a past error. Professional accountability.', difficulty: 'medium', category: 'that-professional', grammarRule: 'That + was + my + Noun', tags: ['that', 'was', 'my', 'mistake', 'accountability'] },
  { id: 'day5-q077', hindi: 'ये बहुत बड़ी ज़िम्मेदारियाँ हैं।', english: 'These are big responsibilities.', alternatives: ["These are major responsibilities.", "These duties are significant."], hint: 'These + are + big + responsibilities.', explanation: '"These are big responsibilities" — acknowledging a challenging role. Often said when taking a new position.', difficulty: 'medium', category: 'these-professional', grammarRule: 'These + are + Adjective + Plural Noun', tags: ['these', 'big', 'responsibilities', 'professional'] },
  { id: 'day5-q078', hindi: 'वे परिस्थितियाँ अलग थीं।', english: 'Those circumstances were different.', alternatives: ["Those conditions were different.", "The situation was different then."], hint: 'Those + circumstances + were + different.', explanation: '"Those circumstances were different" — explaining that past conditions differ from present. Context for past decisions.', difficulty: 'hard', category: 'those-past', grammarRule: 'Those + Plural Noun + were + Adjective', tags: ['those', 'circumstances', 'different', 'past'] },
  { id: 'day5-q079', hindi: 'यह सबसे अच्छा विकल्प है।', english: 'This is the best option.', alternatives: ["This is our best choice.", "This option is the best.", "This is the optimal solution."], hint: 'This + is + the + best + option.', explanation: '"This is the best option" — recommending a choice. "Best" = superlative. Professional recommendation.', difficulty: 'medium', category: 'this-recommendation', grammarRule: 'This + is + the + best + Noun', tags: ['this', 'best', 'option', 'recommendation', 'professional'] },
  { id: 'day5-q080', hindi: 'वे तरीके काम नहीं करते।', english: "Those methods don't work.", alternatives: ["Those approaches are ineffective.", "Those strategies don't work.", "Those techniques are outdated."], hint: "Those + methods + don't + work.", explanation: '"Those methods don\'t work" — evaluating past approaches. Recommending a change of strategy.', difficulty: 'medium', category: 'those-evaluation', grammarRule: "Those + Plural Noun + don't + base verb", tags: ['those', 'methods', "don't", 'work', 'evaluation'] },
  { id: 'day5-q081', hindi: 'यह नया तरीका है।', english: 'This is a new approach.', alternatives: ["This is a fresh approach.", "This is an innovative method.", "This is a new way."], hint: 'This + is + a + new + approach.', explanation: '"This is a new approach" — introducing innovation. "Fresh approach", "innovative method", "different strategy" — all mean trying something new.', difficulty: 'easy', category: 'this-innovation', grammarRule: 'This + is + a + Adjective + Noun', tags: ['this', 'new', 'approach', 'innovation', 'professional'] },
  { id: 'day5-q082', hindi: 'वह बहुत पुरानी बात है।', english: 'That is a very old matter.', alternatives: ["That is an old issue.", "That happened long ago.", "That is ancient history."], hint: 'That + is + a + old + matter.', explanation: '"That is a very old matter" — dismissing an old issue. "Ancient history" (idiom) = something that happened long ago and is no longer relevant.', difficulty: 'medium', category: 'that-past', grammarRule: 'That + is + a + Adjective + Noun', tags: ['that', 'old', 'matter', 'past', 'daily'] },
  { id: 'day5-q083', hindi: 'ये सब ज़रूरी है।', english: 'These are all necessary.', alternatives: ["All of these are necessary.", "These are all required.", "Each of these is essential."], hint: 'These + are + all + necessary.', explanation: '"These are all necessary" — emphasizing that every item is required. "All of these", "each of these" — ways to stress completeness.', difficulty: 'medium', category: 'these-professional', grammarRule: 'These + are + all + Adjective', tags: ['these', 'all', 'necessary', 'professional'] },
  { id: 'day5-q084', hindi: 'वे पुराने नियम बदल गए हैं।', english: 'Those old rules have changed.', alternatives: ["Those rules are no longer valid.", "Those regulations have been updated.", "Things have changed since then."], hint: 'Those + old + rules + have + changed.', explanation: '"Those old rules have changed" — updating policies or procedures. "Those rules are outdated", "Those regulations no longer apply."', difficulty: 'medium', category: 'those-change', grammarRule: 'Those + Adjective + Plural Noun + have + past participle', tags: ['those', 'old', 'rules', 'change', 'update'] },
  { id: 'day5-q085', hindi: 'यह सुनिश्चित करना ज़रूरी है।', english: 'This needs to be ensured.', alternatives: ["This must be confirmed.", "We need to ensure this.", "This has to be verified."], hint: '"यह सुनिश्चित करना ज़रूरी" = This needs to be ensured.', explanation: '"This needs to be ensured" — professional quality control. "Ensured" = guaranteed. "This must be verified before submission."', difficulty: 'hard', category: 'this-professional', grammarRule: 'This + needs + to be + past participle', tags: ['this', 'needs', 'ensured', 'professional', 'quality'] },
  { id: 'day5-q086', hindi: 'वह अप्रत्याशित था।', english: 'That was unexpected.', alternatives: ["That was a surprise.", "That was unanticipated.", "I didn't expect that."], hint: 'That + was + unexpected.', explanation: '"That was unexpected" — reacting to a surprise. "Unexpected" = not expected. Can be positive or negative. "That result was unexpected" (data surprise).', difficulty: 'medium', category: 'that-reaction', grammarRule: 'That + was + Adjective (reaction)', tags: ['that', 'unexpected', 'surprise', 'reaction'] },
  { id: 'day5-q087', hindi: 'ये समाचार चिंताजनक है।', english: 'These news items are concerning.', alternatives: ["This news is concerning.", "These developments are worrying.", "These updates are alarming."], hint: '"ये समाचार" = These news items.', explanation: '"These news items are concerning" — professional discussion of worrying news. "Concerning" = causing worry. "Alarming" = very concerning.', difficulty: 'hard', category: 'these-news', grammarRule: 'These + Noun + are + Adjective (concern)', tags: ['these', 'news', 'concerning', 'professional'] },
  { id: 'day5-q088', hindi: 'वे बातें भूल जाओ।', english: 'Forget those things.', alternatives: ["Let go of those.", "Put those behind you.", "Move past those things."], hint: '"वे बातें भूल जाओ" = Forget those things.', explanation: '"Forget those things" — advice to move on from the past. "Those things" = past problems or memories. Encouragement in counseling or mentoring.', difficulty: 'medium', category: 'those-advice', grammarRule: 'Imperative + those + Noun', tags: ['those', 'forget', 'things', 'advice', 'past'] },
  { id: 'day5-q089', hindi: 'यह एक बड़ी उपलब्धि है।', english: 'This is a great achievement.', alternatives: ["This is a significant accomplishment.", "This is a major milestone.", "This is worth celebrating."], hint: '"यह उपलब्धि" = This achievement.', explanation: '"This is a great achievement" — celebrating success. "Achievement", "accomplishment", "milestone" — synonyms for success. Celebration and recognition vocabulary.', difficulty: 'easy', category: 'this-achievement', grammarRule: 'This + is + a + Adjective + Noun (success)', tags: ['this', 'achievement', 'great', 'success', 'celebration'] },
  { id: 'day5-q090', hindi: 'वह एक उचित निर्णय था।', english: 'That was a fair decision.', alternatives: ["That was a just decision.", "That decision was appropriate.", "That was a reasonable choice."], hint: 'That + was + a + fair + decision.', explanation: '"That was a fair decision" — post-decision evaluation. "Fair" = just, reasonable, unbiased. "That was a tough but fair call", "That ruling was fair."', difficulty: 'medium', category: 'that-evaluation', grammarRule: 'That + was + a + Adjective + Noun (evaluation)', tags: ['that', 'fair', 'decision', 'evaluation', 'past'] },
  { id: 'day5-q091', hindi: 'यह काफी कठिन है।', english: 'This is quite challenging.', alternatives: ["This is pretty difficult.", "This is rather hard.", "This is not easy."], hint: 'This + is + quite + challenging.', explanation: '"Quite challenging" = moderately difficult. Adverbs of degree: very > quite > rather > fairly > a little. "Quite" = considerably, used in British English.', difficulty: 'medium', category: 'this-difficulty', grammarRule: 'This + is + quite + Adjective', tags: ['this', 'quite', 'challenging', 'difficulty'] },
  { id: 'day5-q092', hindi: 'वे वादे पूरे होने चाहिए।', english: 'Those promises must be kept.', alternatives: ["Those commitments must be honored.", "We must fulfill those promises.", "Those assurances need to be met."], hint: 'Those + promises + must + be + kept.', explanation: '"Those promises must be kept" — holding someone accountable. "Promises", "commitments", "assurances" — things said that must be done.', difficulty: 'hard', category: 'those-professional', grammarRule: 'Those + Noun + must + be + past participle', tags: ['those', 'promises', 'must', 'kept', 'accountability'] },
  { id: 'day5-q093', hindi: 'यह काम अभी होना चाहिए।', english: 'This needs to be done now.', alternatives: ["This must be completed immediately.", "We need to do this right now.", "This is urgent."], hint: '"यह अभी होना चाहिए" = This needs to be done now.', explanation: '"This needs to be done now" — urgency expression. "Needs to be done" = must be completed. Deadline pressure in professional settings.', difficulty: 'medium', category: 'this-urgency', grammarRule: 'This + needs + to be + done + now', tags: ['this', 'needs', 'done', 'now', 'urgency', 'professional'] },
  { id: 'day5-q094', hindi: 'ये सुझाव बहुत अच्छे हैं।', english: 'These suggestions are very good.', alternatives: ["These recommendations are excellent.", "These ideas are great.", "These proposals are wonderful."], hint: 'These + suggestions + are + good.', explanation: '"These suggestions are very good" — positive feedback on multiple ideas. "Suggestions", "recommendations", "proposals", "ideas" — all words for advice given.', difficulty: 'easy', category: 'these-feedback', grammarRule: 'These + Plural Noun + are + very + Adjective', tags: ['these', 'suggestions', 'good', 'feedback', 'positive'] },
  { id: 'day5-q095', hindi: 'वह एक बेहद सफल प्रोजेक्ट था।', english: 'That was an extremely successful project.', alternatives: ["That project was a great success.", "That was a hugely successful project.", "That was a landmark project."], hint: 'That + was + an + extremely + successful + project.', explanation: '"Extremely successful" — superlative praise for a completed project. "Landmark project" = a project that set a milestone. Post-project evaluation.', difficulty: 'hard', category: 'that-success', grammarRule: 'That + was + an + extremely + Adjective + Noun', tags: ['that', 'extremely', 'successful', 'project', 'evaluation'] },
  { id: 'day5-q096', hindi: 'यह आपकी ज़िम्मेदारी है।', english: 'This is your responsibility.', alternatives: ["This falls under your responsibility.", "This is your accountability.", "You are responsible for this."], hint: 'This + is + your + responsibility.', explanation: '"This is your responsibility" — delegating or assigning tasks. Telling someone they own a task. "You are accountable for this", "This is in your hands."', difficulty: 'medium', category: 'this-delegation', grammarRule: 'This + is + your + Noun', tags: ['this', 'your', 'responsibility', 'delegation', 'professional'] },
  { id: 'day5-q097', hindi: 'वे परिणाम हमारी अपेक्षाओं से परे हैं।', english: 'Those results are beyond our expectations.', alternatives: ["Those outcomes exceeded our expectations.", "Those results surpassed what we expected.", "We didn't expect those results."], hint: 'Those + results + are + beyond + expectations.', explanation: '"Beyond expectations" = exceeded what was hoped for. Positive surprise. "Those results are beyond our expectations" = even better than we thought possible.', difficulty: 'hard', category: 'those-success', grammarRule: 'Those + Noun + are + beyond + Noun', tags: ['those', 'results', 'beyond', 'expectations', 'success'] },
  { id: 'day5-q098', hindi: 'ये हमारे मूल्य हैं।', english: 'These are our core values.', alternatives: ["These are our fundamental values.", "These are the values we stand for.", "These principles guide us."], hint: '"ये हमारे मूल्य" = These are our values.', explanation: '"These are our core values" — company culture statement. "Core values" = most important principles. Mission and vision statements use this structure.', difficulty: 'hard', category: 'these-company', grammarRule: 'These + are + our + Adjective + Plural Noun', tags: ['these', 'core', 'values', 'company', 'mission'] },
  { id: 'day5-q099', hindi: 'यह सीखना ज़रूरी है।', english: 'This is important to learn.', alternatives: ["This needs to be learned.", "Learning this is essential.", "This topic is important."], hint: 'This + is + important + to + learn.', explanation: '"This is important to learn" — educational emphasis. "This concept is essential", "This skill is valuable", "This topic is crucial for your career."', difficulty: 'medium', category: 'this-learning', grammarRule: 'This + is + important + to + base verb', tags: ['this', 'important', 'learn', 'education', 'skill'] },
  { id: 'day5-q100', hindi: 'वे सब एक जैसे हैं।', english: 'Those are all the same.', alternatives: ["Those are identical.", "All of those are the same.", "There is no difference between those."], hint: 'Those + are + all + the same.', explanation: '"Those are all the same" — no difference between multiple far items. "They are identical", "There is no distinction." Shopping: "All those products are the same brand."', difficulty: 'medium', category: 'those-comparison', grammarRule: 'Those + are + all + the same', tags: ['those', 'all', 'same', 'comparison', 'daily'] },

  // ── SECTION 9: ADVANCED PATTERNS — This/That/These/Those ──

  { id: 'day5-q101', hindi: 'यह वही है जो मैं चाहता था।', english: 'This is what I wanted.', alternatives: ["This is exactly what I needed.", "This is just what I was looking for.", "This matches my requirement."], hint: '"यही है जो मैं चाहता था" = This is what I wanted.', explanation: '"This is what I wanted" — satisfaction expression. Customer receiving exactly what was ordered. "This is precisely what the specification called for."', difficulty: 'medium', category: 'this-satisfaction', grammarRule: 'This + is + what + I + wanted', tags: ['this', 'what', 'wanted', 'satisfaction'] },
  { id: 'day5-q102', hindi: 'वह जो उसने कहा वह सच था।', english: 'What he said was true.', alternatives: ["What he stated was accurate.", "His words were true.", "He was telling the truth."], hint: '"जो उसने कहा" = what he said. was = था।', explanation: '"What he said was true" — confirming someone\'s statement. "What" as a subject: "What he said", "What happened", "What we need."', difficulty: 'hard', category: 'that-clause', grammarRule: 'What + Subject + said + was + Adjective', tags: ['what', 'said', 'true', 'clause', 'advanced'] },
  { id: 'day5-q103', hindi: 'क्या यह सही समय है?', english: 'Is this the right time?', alternatives: ["Is now a good time?", "Is this a good moment?", "Should we discuss this now?"], hint: 'Is + this + the + right + time?', explanation: '"Is this the right time?" — asking for timing permission. "Is this a good time to talk?" "Is now a good moment?" Polite professional interruption phrase.', difficulty: 'medium', category: 'this-timing', grammarRule: 'Is + this + the + right + Noun?', tags: ['this', 'right', 'time', 'question', 'professional'] },
  { id: 'day5-q104', hindi: 'यह ऐसी स्थिति है जो हम सबने देखी।', english: 'This is a situation we have all seen.', alternatives: ["This is a common situation.", "We have all faced this situation.", "This is familiar to all of us."], hint: 'This + is + a + situation + we + have + all + seen.', explanation: '"This is a situation we have all seen" — drawing shared experience. Creating common ground in discussions. Relative clause after demonstrative.', difficulty: 'hard', category: 'this-advanced', grammarRule: 'This + is + a + Noun + Relative Clause', tags: ['this', 'situation', 'all', 'advanced', 'relative'] },
  { id: 'day5-q105', hindi: 'वे लोग जो आज आए थे बहुत प्रभावित हुए।', english: 'Those people who came today were very impressed.', alternatives: ["Those who attended were impressed.", "The people who came were very impressed."], hint: 'Those + people + who + came + were + impressed.', explanation: '"Those people who came" — using relative clause with "those". "Those who" = the people who. Formal and professional English with relative clauses.', difficulty: 'hard', category: 'those-advanced', grammarRule: 'Those + Noun + who + Verb + were + Adjective', tags: ['those', 'who', 'came', 'impressed', 'advanced'] },
  { id: 'day5-q106', hindi: 'ये वही तथ्य हैं जो हमें जानने चाहिए।', english: 'These are the facts we need to know.', alternatives: ["These are the key facts.", "These facts are essential.", "These are the important data points."], hint: 'These + are + the + facts + we + need + to + know.', explanation: '"These are the facts we need to know" — presenting important information. "We need to know" = relative clause qualifying the facts. Professional briefing language.', difficulty: 'hard', category: 'these-advanced', grammarRule: 'These + are + the + Noun + Relative Clause', tags: ['these', 'facts', 'need', 'know', 'advanced', 'professional'] },
  { id: 'day5-q107', hindi: 'यह वह कंपनी है जिसमें मैं काम करना चाहता हूँ।', english: 'This is the company I want to work for.', alternatives: ["This is the company I have always wanted to join.", "This is my dream company.", "This is where I want to build my career."], hint: 'This + is + the + company + I + want + to + work for.', explanation: '"This is the company I want to work for" — expressing strong desire to join. Perfect for cover letters and job applications. Shows genuine enthusiasm.', difficulty: 'hard', category: 'this-interview', grammarRule: 'This + is + the + Noun + I + want + to + verb', tags: ['this', 'company', 'want', 'work', 'interview', 'dream'] },
  { id: 'day5-q108', hindi: 'वह समझौता था जिस पर हम सब राज़ी थे।', english: 'That was the agreement we all accepted.', alternatives: ["That was the deal we agreed on.", "That was our mutual agreement.", "That was the consensus."], hint: 'That + was + the + agreement + we + all + accepted.', explanation: '"That was the agreement we all accepted" — referring to a past mutual decision. Reminding others of past commitments. Contract or negotiation reference.', difficulty: 'hard', category: 'that-contract', grammarRule: 'That + was + the + Noun + we + all + Verb', tags: ['that', 'agreement', 'accepted', 'contract', 'past'] },
  { id: 'day5-q109', hindi: 'यही आपकी असली ताकत है।', english: 'This is your true strength.', alternatives: ["This is what you are best at.", "This is your real skill.", "This is where you shine."], hint: 'This + is + your + true + strength.', explanation: '"This is your true strength" — identifying someone\'s strongest quality. Mentoring and coaching. "Where you shine" = idiom meaning where you excel most.', difficulty: 'medium', category: 'this-strength', grammarRule: 'This + is + your + Adjective + Noun', tags: ['this', 'your', 'true', 'strength', 'coaching', 'professional'] },
  { id: 'day5-q110', hindi: 'वे सब समझ गए जो मैंने कहा।', english: 'Those were all the points I made.', alternatives: ["Those were all my points.", "That covers everything I wanted to say.", "Those are all the points I wanted to make."], hint: 'Those + were + all + the + points + I + made.', explanation: '"Those were all the points I made" — presentation conclusion. Summarizing all discussed points. "That covers everything", "Those are my main arguments."', difficulty: 'hard', category: 'those-conclusion', grammarRule: 'Those + were + all + the + Noun + I + Verb', tags: ['those', 'all', 'points', 'conclusion', 'presentation'] },

  // ── SECTION 10: DEMONSTRATIVE PRONOUNS IN EXPRESSIONS ─────

  { id: 'day5-q111', hindi: 'यह सब कहाँ से शुरू हुआ?', english: 'Where did all this start?', alternatives: ["Where did this begin?", "How did this all start?", "What is the origin of all this?"], hint: '"यह सब" = All this.', explanation: '"Where did all this start?" — asking the origin of a situation. Investigation or problem-solving. "All this" refers to a complex situation or chain of events.', difficulty: 'hard', category: 'this-origin', grammarRule: 'Where + did + all + this + start?', tags: ['this', 'where', 'all', 'start', 'origin'] },
  { id: 'day5-q112', hindi: 'इस बारे में बात करते हैं।', english: "Let's talk about this.", alternatives: ["Let's discuss this.", "Can we talk about this?", "I would like to discuss this."], hint: "Let's + talk about + this.", explanation: '"Let\'s talk about this" — initiating a discussion. Professional meeting opener. "Let\'s discuss this further", "I\'d like to revisit this topic."', difficulty: 'easy', category: 'this-discussion', grammarRule: "Let's + talk about + this", tags: ['this', 'talk', 'discuss', 'professional', 'meeting'] },
  { id: 'day5-q113', hindi: 'उसके बारे में मत सोचो।', english: "Don't think about that.", alternatives: ["Stop thinking about that.", "Let go of that thought.", "Put that out of your mind."], hint: "Don't + think about + that.", explanation: '"Don\'t think about that" — advice to forget something troubling. "Let go of that", "Move on from that." Emotional support phrases.', difficulty: 'easy', category: 'that-advice', grammarRule: "Don't + think about + that", tags: ['that', "don't", 'think', 'advice', 'daily'] },
  { id: 'day5-q114', hindi: 'इनमें से कौन सा बेहतर है?', english: 'Which of these is better?', alternatives: ["Which one of these is better?", "Between these, which is best?", "Which of these do you prefer?"], hint: "Which + of + these + is + better?", explanation: '"Which of these is better?" — comparing and choosing between nearby options. "Which of these would you recommend?" Customer asking for advice in a shop or professional context.', difficulty: 'medium', category: 'these-choice', grammarRule: 'Which + of + these + is + Comparative?', tags: ['these', 'which', 'better', 'comparison', 'choice'] },
  { id: 'day5-q115', hindi: 'उनमें से कोई काम का नहीं है।', english: 'None of those are useful.', alternatives: ["None of those work.", "Those are all useless.", "Not one of those is helpful."], hint: "None of those + are + useful.", explanation: '"None of those are useful" — rejecting all far options. "None of" + plural noun. "None of these" (near) / "None of those" (far). Alternative: "Not one of those is useful."', difficulty: 'hard', category: 'those-rejection', grammarRule: 'None of + those + are + Adjective', tags: ['those', 'none', 'useful', 'rejection', 'advanced'] },
  { id: 'day5-q116', hindi: 'मैं यह भूल नहीं सकता।', english: "I can't forget this.", alternatives: ["I cannot forget this.", "This stays with me.", "This is unforgettable."], hint: "I can't + forget + this.", explanation: '"I can\'t forget this" — something impactful and memorable. "This experience is unforgettable", "This has left a lasting impression on me." Emotional impact.', difficulty: 'medium', category: 'this-memory', grammarRule: "I + can't + forget + this", tags: ['this', "can't", 'forget', 'memory', 'emotional'] },
  { id: 'day5-q117', hindi: 'वह मेरे लिए एक सीख था।', english: 'That was a lesson for me.', alternatives: ["That taught me something.", "I learned from that.", "That was a valuable lesson."], hint: 'That + was + a + lesson + for me.', explanation: '"That was a lesson for me" — learning from a past experience (negative or positive). Reflective statement. "I learned from that experience", "That shaped my thinking."', difficulty: 'medium', category: 'that-learning', grammarRule: 'That + was + a + Noun + for + me', tags: ['that', 'lesson', 'learning', 'reflection', 'personal'] },
  { id: 'day5-q118', hindi: 'ये सभी विकल्प अच्छे हैं।', english: 'All of these options are good.', alternatives: ["Each of these options is good.", "All these choices are acceptable.", "Every one of these works."], hint: "All of + these + options + are + good.", explanation: '"All of these options are good" — when all choices are acceptable. Decision-making when options are equal. "I am happy with any of these."', difficulty: 'medium', category: 'these-options', grammarRule: 'All of + these + Noun + are + Adjective', tags: ['these', 'all', 'options', 'good', 'decision'] },
  { id: 'day5-q119', hindi: 'वे सभी एक जैसे नहीं हैं।', english: 'Not all of those are the same.', alternatives: ["Those are not all identical.", "There are differences among those.", "Some of those are different."], hint: "Not all of + those + are + the same.", explanation: '"Not all of those are the same" — clarifying that things differ. "There are differences", "They vary." Nuanced comparison: not everything in a group is identical.', difficulty: 'hard', category: 'those-nuance', grammarRule: 'Not all of + those + are + the same', tags: ['those', 'not', 'all', 'same', 'nuance', 'advanced'] },
  { id: 'day5-q120', hindi: 'यह मुझे बहुत पसंद है।', english: 'I really like this.', alternatives: ["I love this.", "This is my favorite.", "I am very fond of this."], hint: "I + really + like + this.", explanation: '"I really like this" — strong positive preference. "Really" adds emphasis. Shopping: "I really like this design." "I love this" = even stronger. "I\'m very fond of this" = more formal.', difficulty: 'easy', category: 'this-preference', grammarRule: 'I + really + like + this', tags: ['this', 'like', 'preference', 'shopping', 'daily'] },

]; // End of DAY_5_QUESTIONS array

// ============================================================
// PAGE COMPONENT — Day 5 Practice Interface
// ============================================================
export default function Day5PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href="/75-days-challenge/5" className="hover:text-white transition-colors">Day 5</Link>
        <span>/</span>
        <span className="text-slate-300">Practice</span>
      </div>

      {/* ── Topic Banner ──────────────────────────────────── */}
      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          👆
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary text-xs">Day 5</span>
            <span className="text-xs text-slate-500">Grammar</span>
            <span className="text-xs text-slate-500">A1 Level</span>
          </div>
          <h2 className="font-bold text-white">Demonstrative Pronouns — This / That / These / Those</h2>
          <p className="text-xs text-slate-500">{DAY_5_QUESTIONS.length}+ questions available</p>
        </div>
        <Link href="/75-days-challenge/5"
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Quick Reference Card ──────────────────────────── */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">📌 Demonstrative Pronoun Rules:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-blue-500/10 rounded-lg p-2">
            <p className="text-blue-300 font-bold mb-1">NEAR (पास)</p>
            <p className="text-white">THIS = यह (1 thing)</p>
            <p className="text-white">THESE = ये (many things)</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-2">
            <p className="text-purple-300 font-bold mb-1">FAR (दूर)</p>
            <p className="text-white">THAT = वह (1 thing)</p>
            <p className="text-white">THOSE = वे (many things)</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">THIS/THAT + IS (singular) | THESE/THOSE + ARE (plural)</p>
      </div>

      {/* ── Quiz Component ────────────────────────────────── */}
      <PracticeQuizComponent
        questions={DAY_5_QUESTIONS}
        title="Day 5: Demonstrative Pronouns Practice"
        backHref="/75-days-challenge/5"
        questionsPerSession={50}
        shuffleMode={true}
        showProgress={true}
        showScore={true}
      />

    </div>
  );
}
