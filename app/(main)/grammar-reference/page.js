'use client';
// ============================================================
// GRAMMAR REFERENCE — Complete grammar encyclopedia
// Features: All grammar topics organized by category,
// expandable sections, real examples, common mistakes
// Inspired by: Notion wiki, Linear docs, Apple reference
// ============================================================

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Search, ChevronDown, ChevronRight, Star,
  Target, Zap, CheckCircle2, XCircle, Lightbulb,
  ArrowRight, X, Filter, Hash, Award, Brain,
  MessageSquare, Volume2,
} from 'lucide-react';

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ── Grammar Categories ──────────────────────────────────────
// Complete grammar reference organized by category
const GRAMMAR_CATEGORIES = [
  {
    id: 'parts-of-speech',
    title: 'Parts of Speech',
    emoji: '🧩',
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    description: 'The 8 fundamental building blocks of English',
    topics: [
      {
        title: 'Nouns (संज्ञा)',
        slug: 'nouns',
        level: 'A1',
        explanation: 'A noun is a word that names a person, place, thing, or idea.',
        hindiExplanation: 'Noun किसी व्यक्ति, स्थान, वस्तु या विचार के नाम को कहते हैं।',
        types: ['Common Nouns (book, city)', 'Proper Nouns (Rahul, Delhi)', 'Abstract Nouns (love, happiness)', 'Collective Nouns (team, family)', 'Countable (chair, pen)', 'Uncountable (water, rice)'],
        examples: [
          { hindi: 'राहुल एक अच्छा लड़का है।', english: 'Rahul is a good boy.' },
          { hindi: 'दिल्ली भारत की राजधानी है।', english: 'Delhi is the capital of India.' },
          { hindi: 'प्यार सबसे बड़ी शक्ति है।', english: 'Love is the greatest power.' },
        ],
        mistakes: [
          { wrong: 'I need a water.', correct: 'I need water.', why: 'Water is uncountable — no "a/an"' },
          { wrong: 'He gave me many advices.', correct: 'He gave me much advice.', why: 'Advice is uncountable' },
        ],
        memoryTrick: '**NOUN = NAME** — अगर किसी चीज़ का नाम ले सकते हो, वो Noun है!',
      },
      {
        title: 'Pronouns (सर्वनाम)',
        slug: 'pronouns',
        level: 'A1',
        explanation: 'A pronoun replaces a noun to avoid repetition.',
        hindiExplanation: 'Pronoun संज्ञा की जगह इस्तेमाल होते हैं ताकि बार-बार एक ही नाम न दोहराना पड़े।',
        types: ['Subject (I, you, he, she, it, we, they)', 'Object (me, you, him, her, it, us, them)', 'Possessive (my, your, his, her, its, our, their)', 'Reflexive (myself, yourself, himself, herself)', 'Demonstrative (this, that, these, those)', 'Relative (who, which, that, whom, whose)', 'Indefinite (someone, anyone, nobody, everybody)'],
        examples: [
          { hindi: 'वह मेरा दोस्त है।', english: 'He is my friend.' },
          { hindi: 'यह मेरी किताब है।', english: 'This is my book.' },
          { hindi: 'कोई दरवाज़े पर है।', english: 'Someone is at the door.' },
        ],
        mistakes: [
          { wrong: 'Me and Rahul went.', correct: 'Rahul and I went.', why: 'Subject position = I, not me' },
          { wrong: 'Him is tall.', correct: 'He is tall.', why: 'Subject pronoun needed, not object pronoun' },
        ],
        memoryTrick: '**PRO = PROFESSIONAL REPLACEMENT** — Pronoun noun का professional substitute है!',
      },
      {
        title: 'Verbs (क्रिया)',
        slug: 'verbs',
        level: 'A1',
        explanation: 'A verb shows action or a state of being.',
        hindiExplanation: 'Verb किसी काम (action) या स्थिति (state) को दर्शाता है।',
        types: ['Action Verbs (run, eat, write)', 'Linking Verbs (is, am, are, was, were)', 'Helping/Auxiliary Verbs (do, does, did, have, has, had)', 'Modal Verbs (can, could, should, would, must, may, might)'],
        examples: [
          { hindi: 'मैं रोज़ दौड़ता हूँ।', english: 'I run every day.' },
          { hindi: 'वह खुश है।', english: 'She is happy.' },
          { hindi: 'क्या तुम अंग्रेज़ी बोल सकते हो?', english: 'Can you speak English?' },
        ],
        mistakes: [
          { wrong: 'She don\'t like it.', correct: 'She doesn\'t like it.', why: 'She/He/It → doesn\'t (not don\'t)' },
          { wrong: 'I am go to school.', correct: 'I go to school.', why: '"am" + base verb is wrong' },
        ],
        memoryTrick: '**VERB = ACTION HERO** — Sentence का hero verb है — बिना verb, कोई sentence complete नहीं!',
      },
      {
        title: 'Adjectives (विशेषण)',
        slug: 'adjectives',
        level: 'A1',
        explanation: 'An adjective describes or modifies a noun.',
        hindiExplanation: 'Adjective noun के बारे में अधिक जानकारी देता है — कैसा, कितना, कौन सा।',
        types: ['Descriptive (big, beautiful, smart)', 'Quantitative (some, many, few)', 'Demonstrative (this, that, these)', 'Possessive (my, your, his)', 'Comparative (bigger, smarter)', 'Superlative (biggest, smartest)'],
        examples: [
          { hindi: 'यह एक सुंदर फूल है।', english: 'This is a beautiful flower.' },
          { hindi: 'वह मेरे से लंबा है।', english: 'He is taller than me.' },
          { hindi: 'यह सबसे अच्छी किताब है।', english: 'This is the best book.' },
        ],
        mistakes: [
          { wrong: 'He is more taller.', correct: 'He is taller.', why: 'Don\'t use "more" with -er' },
          { wrong: 'She is very beautifuller.', correct: 'She is more beautiful.', why: 'Long words use "more", not "-er"' },
        ],
        memoryTrick: '**ADJ = ADD DETAILS** — Adjective noun में details ADD करता है!',
      },
      {
        title: 'Adverbs (क्रिया विशेषण)',
        slug: 'adverbs',
        level: 'A2',
        explanation: 'An adverb modifies a verb, adjective, or another adverb.',
        hindiExplanation: 'Adverb verb, adjective या दूसरे adverb के बारे में और जानकारी देता है।',
        types: ['Manner (quickly, slowly, carefully)', 'Time (now, today, yesterday)', 'Frequency (always, often, never)', 'Place (here, there, everywhere)', 'Degree (very, extremely, quite)'],
        examples: [
          { hindi: 'वह तेज़ दौड़ता है।', english: 'He runs fast.' },
          { hindi: 'मैं हमेशा सच बोलता हूँ।', english: 'I always speak the truth.' },
          { hindi: 'वह बहुत सुंदर है।', english: 'She is very beautiful.' },
        ],
        mistakes: [
          { wrong: 'He drives careful.', correct: 'He drives carefully.', why: 'Need adverb (-ly) with verbs' },
          { wrong: 'She sings good.', correct: 'She sings well.', why: '"Good" is adjective, "well" is adverb' },
        ],
        memoryTrick: '**ADVERB = ADD to VERB** — Adverb verb में extra info ADD करता है!',
      },
      {
        title: 'Prepositions (संबंधबोधक)',
        slug: 'prepositions',
        level: 'A2',
        explanation: 'A preposition shows the relationship between a noun/pronoun and other words.',
        hindiExplanation: 'Preposition दो शब्दों के बीच का संबंध बताता है — कहाँ, कब, कैसे।',
        types: ['Place (in, on, at, under, above, between)', 'Time (in, on, at, before, after, during)', 'Direction (to, from, into, out of, towards)', 'Agent (by, with)', 'Instrument (by, with)'],
        examples: [
          { hindi: 'किताब मेज पर है।', english: 'The book is on the table.' },
          { hindi: 'मैं सुबह 8 बजे उठता हूँ।', english: 'I wake up at 8 AM.' },
          { hindi: 'वह स्कूल जाता है।', english: 'He goes to school.' },
        ],
        mistakes: [
          { wrong: 'I born in 15 August.', correct: 'I was born on 15 August.', why: 'Dates use "on" not "in"' },
          { wrong: 'She arrived at Monday.', correct: 'She arrived on Monday.', why: 'Days use "on"' },
        ],
        memoryTrick: '**IN = big (month/year), ON = specific (day/date), AT = exact (time/place)**',
      },
      {
        title: 'Conjunctions (समुच्चयबोधक)',
        slug: 'conjunctions',
        level: 'A2',
        explanation: 'A conjunction connects words, phrases, or clauses.',
        hindiExplanation: 'Conjunction दो शब्दों, वाक्यांशों या वाक्यों को जोड़ता है।',
        types: ['Coordinating (and, but, or, so, yet, for, nor)', 'Subordinating (because, although, if, when, while, after, before)', 'Correlative (both...and, either...or, neither...nor, not only...but also)'],
        examples: [
          { hindi: 'मैं चाय और बिस्कुट चाहता हूँ।', english: 'I want tea and biscuits.' },
          { hindi: 'वह आया लेकिन देर से।', english: 'He came but late.' },
          { hindi: 'क्योंकि बारिश हो रही थी, मैं नहीं गया।', english: 'Because it was raining, I didn\'t go.' },
        ],
        mistakes: [
          { wrong: 'Because it rained so I stayed.', correct: 'Because it rained, I stayed.', why: 'Don\'t use "because" and "so" together' },
        ],
        memoryTrick: '**FANBOYS = For, And, Nor, But, Or, Yet, So** — ये 7 coordinating conjunctions हैं!',
      },
      {
        title: 'Interjections (विस्मयादिबोधक)',
        slug: 'interjections',
        level: 'A2',
        explanation: 'An interjection expresses sudden emotions or feelings.',
        hindiExplanation: 'Interjection अचानक भावनाओं या भावों को व्यक्त करता है।',
        types: ['Joy (Hurray! Wow! Yay!)', 'Surprise (Oh! Oops! What!)', 'Sadness (Alas! Oh no!)', 'Greeting (Hello! Hi! Hey!)', 'Agreement (Yes! Sure! Okay!)'],
        examples: [
          { hindi: 'वाह! कितना सुंदर है!', english: 'Wow! How beautiful!' },
          { hindi: 'अरे! मैं भूल गया!', english: 'Oops! I forgot!' },
          { hindi: 'हुर्रे! हम जीत गए!', english: 'Hurray! We won!' },
        ],
        mistakes: [],
        memoryTrick: '**INTERJECTION = INTERRUPT with EMOTION** — ये भावना के विस्फोट हैं!',
      },
    ],
  },
  {
    id: 'tenses',
    title: 'Tenses (काल)',
    emoji: '⏰',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    description: 'All 12 tenses with formulas, examples, and usage',
    topics: [
      {
        title: 'Simple Present Tense',
        slug: 'simple-present',
        level: 'A1',
        explanation: 'Used for habits, routines, facts, and general truths.',
        hindiExplanation: 'यह तब use होता है जब कोई काम रोज़ होता है, सच्चाई बताते हैं, या आदतें बताते हैं।',
        types: ['Formula: Subject + V1/V1+s/es', 'Negative: Subject + do/does + not + V1', 'Question: Do/Does + Subject + V1?'],
        examples: [
          { hindi: 'मैं रोज़ स्कूल जाता हूँ।', english: 'I go to school every day.' },
          { hindi: 'वह चाय पीता है।', english: 'He drinks tea.' },
          { hindi: 'क्या तुम अंग्रेज़ी बोलते हो?', english: 'Do you speak English?' },
        ],
        mistakes: [
          { wrong: 'He go to office.', correct: 'He goes to office.', why: 'He/She/It → verb + s/es' },
          { wrong: 'Does she goes?', correct: 'Does she go?', why: 'After does, use base verb' },
        ],
        memoryTrick: '**HE/SHE/IT → S ले लिट!** He eats, She goes, It rains.',
      },
      {
        title: 'Present Continuous Tense',
        slug: 'present-continuous',
        level: 'A1',
        explanation: 'Used for actions happening right now or temporary situations.',
        hindiExplanation: 'यह तब use होता है जब कोई काम अभी हो रहा है — रहा है/रही है/रहे हैं।',
        types: ['Formula: Subject + is/am/are + V1+ing', 'Negative: Subject + is/am/are + not + V1+ing', 'Question: Is/Am/Are + Subject + V1+ing?'],
        examples: [
          { hindi: 'मैं खाना खा रहा हूँ।', english: 'I am eating food.' },
          { hindi: 'वह पढ़ रही है।', english: 'She is studying.' },
          { hindi: 'क्या तुम सो रहे हो?', english: 'Are you sleeping?' },
        ],
        mistakes: [
          { wrong: 'I eating food.', correct: 'I am eating food.', why: 'Need "am/is/are" before verb+ing' },
        ],
        memoryTrick: '**"रहा/रही/रहे" = Present Continuous!** जब भी "रहा" सुनो, am/is/are + ing लगाओ!',
      },
      {
        title: 'Present Perfect Tense',
        slug: 'present-perfect',
        level: 'A2',
        explanation: 'Used for actions completed recently or with relevance to the present.',
        hindiExplanation: 'यह तब use होता है जब काम अभी-अभी पूरा हुआ हो — चुका है/चुकी है/लिया है।',
        types: ['Formula: Subject + has/have + V3', 'Negative: Subject + has/have + not + V3', 'Question: Has/Have + Subject + V3?'],
        examples: [
          { hindi: 'मैंने खाना खा लिया है।', english: 'I have eaten food.' },
          { hindi: 'वह चली गई है।', english: 'She has gone.' },
          { hindi: 'क्या तुमने होमवर्क किया?', english: 'Have you done the homework?' },
        ],
        mistakes: [
          { wrong: 'I have went there.', correct: 'I have gone there.', why: 'Use V3 (gone), not V2 (went)' },
          { wrong: 'He have finished.', correct: 'He has finished.', why: 'He/She/It → has (not have)' },
        ],
        memoryTrick: '**"चुका/चुकी/लिया/दिया" = Present Perfect!** have/has + V3 (3rd form)!',
      },
      {
        title: 'Simple Past Tense',
        slug: 'simple-past',
        level: 'A2',
        explanation: 'Used for completed actions in the past.',
        hindiExplanation: 'यह तब use होता है जब कोई काम बीते समय में हो चुका हो।',
        types: ['Formula: Subject + V2', 'Negative: Subject + did + not + V1', 'Question: Did + Subject + V1?'],
        examples: [
          { hindi: 'मैं कल स्कूल गया।', english: 'I went to school yesterday.' },
          { hindi: 'उसने खाना खाया।', english: 'He ate food.' },
          { hindi: 'क्या तुम वहाँ गए?', english: 'Did you go there?' },
        ],
        mistakes: [
          { wrong: 'Did he went?', correct: 'Did he go?', why: 'After "did", use base verb (V1)' },
          { wrong: 'I didn\'t went.', correct: 'I didn\'t go.', why: 'After "didn\'t", use V1' },
        ],
        memoryTrick: '**Past = V2!** Go→Went, Eat→Ate, Come→Came. Did के बाद हमेशा V1!',
      },
      {
        title: 'Past Continuous Tense',
        slug: 'past-continuous',
        level: 'B1',
        explanation: 'Used for ongoing actions at a specific time in the past.',
        hindiExplanation: 'यह तब use होता है जब बीते समय में कोई काम जारी था — रहा था/रही थी।',
        types: ['Formula: Subject + was/were + V1+ing'],
        examples: [
          { hindi: 'मैं खाना बना रहा था।', english: 'I was cooking food.' },
          { hindi: 'वे खेल रहे थे।', english: 'They were playing.' },
        ],
        mistakes: [
          { wrong: 'I were eating.', correct: 'I was eating.', why: 'I → was (not were)' },
        ],
        memoryTrick: '**"रहा था/रही थी" = Past Continuous!** was/were + V1+ing!',
      },
      {
        title: 'Simple Future Tense',
        slug: 'simple-future',
        level: 'A2',
        explanation: 'Used for actions that will happen in the future.',
        hindiExplanation: 'यह तब use होता है जब कोई काम आगे होगा — गा/गी/गे।',
        types: ['Formula: Subject + will + V1', 'Negative: Subject + will + not + V1', 'Question: Will + Subject + V1?'],
        examples: [
          { hindi: 'मैं कल आऊंगा।', english: 'I will come tomorrow.' },
          { hindi: 'वह नहीं जाएगी।', english: 'She will not go.' },
          { hindi: 'क्या तुम मदद करोगे?', english: 'Will you help?' },
        ],
        mistakes: [
          { wrong: 'I will goes.', correct: 'I will go.', why: 'After "will", always base verb (V1)' },
        ],
        memoryTrick: '**"गा/गी/गे" = Future!** Will + V1 — simple rule!',
      },
    ],
  },
  {
    id: 'articles',
    title: 'Articles & Determiners',
    emoji: '📌',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    description: 'When to use A, An, The — and when to skip them',
    topics: [
      {
        title: 'Indefinite Articles (A / An)',
        slug: 'a-an',
        level: 'A1',
        explanation: '"A" is used before consonant sounds, "An" before vowel sounds.',
        hindiExplanation: '"A" व्यंजन ध्वनि से पहले और "An" स्वर ध्वनि से पहले लगता है।',
        types: ['A + consonant sound (a book, a university)', 'An + vowel sound (an apple, an hour)'],
        examples: [
          { hindi: 'मेरे पास एक सेब है।', english: 'I have an apple.' },
          { hindi: 'वह एक डॉक्टर है।', english: 'He is a doctor.' },
          { hindi: 'एक घंटे बाद मिलते हैं।', english: 'See you in an hour.' },
        ],
        mistakes: [
          { wrong: 'He is a honest man.', correct: 'He is an honest man.', why: '"Honest" starts with vowel SOUND (h is silent)' },
          { wrong: 'She is an university student.', correct: 'She is a university student.', why: '"University" starts with /juː/ — consonant sound' },
        ],
        memoryTrick: '**SOUND matters, not spelling!** "Hour" = an hour (h is silent). "University" = a university (sounds like "you").',
      },
      {
        title: 'Definite Article (The)',
        slug: 'the',
        level: 'A1',
        explanation: '"The" is used when both speaker and listener know which specific thing is being discussed.',
        hindiExplanation: '"The" तब लगता है जब बोलने वाला और सुनने वाला दोनों जानते हैं किस चीज़ की बात हो रही है।',
        types: ['Specific things (the book on the table)', 'Unique things (the sun, the moon)', 'Superlatives (the best, the tallest)', 'Ordinals (the first, the second)'],
        examples: [
          { hindi: 'दरवाज़ा बंद करो।', english: 'Close the door.' },
          { hindi: 'सूरज पूर्व से उगता है।', english: 'The sun rises in the east.' },
          { hindi: 'वह सबसे अच्छा खिलाड़ी है।', english: 'He is the best player.' },
        ],
        mistakes: [
          { wrong: 'I like the music.', correct: 'I like music.', why: 'General categories don\'t need "the"' },
          { wrong: 'The life is beautiful.', correct: 'Life is beautiful.', why: 'Abstract nouns in general = no "the"' },
        ],
        memoryTrick: '**THE = THAT SPECIFIC ONE!** अगर "कौन सा/कौन सी" का जवाब clear है, तो "the" लगाओ!',
      },
    ],
  },
  {
    id: 'conditionals',
    title: 'Conditionals (If Sentences)',
    emoji: '🔀',
    color: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    description: 'Zero, First, Second, Third, and Mixed conditionals',
    topics: [
      {
        title: 'Zero Conditional (Facts)',
        slug: 'zero-conditional',
        level: 'A2',
        explanation: 'Used for things that are always true — scientific facts, general truths.',
        hindiExplanation: 'जब कुछ हमेशा सच हो — facts और natural laws के लिए।',
        types: ['Formula: If + present simple, present simple'],
        examples: [
          { hindi: 'अगर तुम पानी गरम करो, तो वो उबलता है।', english: 'If you heat water, it boils.' },
          { hindi: 'अगर बारिश हो, तो ज़मीन गीली हो जाती है।', english: 'If it rains, the ground gets wet.' },
        ],
        mistakes: [],
        memoryTrick: '**Zero = Always True!** If + present, present — दोनों sides simple present!',
      },
      {
        title: 'First Conditional (Real Future)',
        slug: 'first-conditional',
        level: 'B1',
        explanation: 'Used for real/possible future situations.',
        hindiExplanation: 'जब भविष्य में कुछ होने की संभावना हो — real possibility।',
        types: ['Formula: If + present simple, will + V1'],
        examples: [
          { hindi: 'अगर तुम मेहनत करोगे, तो पास हो जाओगे।', english: 'If you study hard, you will pass.' },
          { hindi: 'अगर बारिश हुई, तो मैं नहीं जाऊंगा।', english: 'If it rains, I will not go.' },
        ],
        mistakes: [
          { wrong: 'If you will study, you will pass.', correct: 'If you study, you will pass.', why: 'No "will" in the if-clause!' },
        ],
        memoryTrick: '**1st = will after comma!** If + present, WILL + V1. If clause में will NEVER!',
      },
      {
        title: 'Second Conditional (Imaginary)',
        slug: 'second-conditional',
        level: 'B1',
        explanation: 'Used for unreal/imaginary present or future situations.',
        hindiExplanation: 'काल्पनिक बातों के लिए — "अगर मैं होता तो..."',
        types: ['Formula: If + past simple, would + V1'],
        examples: [
          { hindi: 'अगर मैं अमीर होता, तो दुनिया घूमता।', english: 'If I were rich, I would travel the world.' },
          { hindi: 'अगर मेरे पास कार होती, तो मैं ड्राइव करता।', english: 'If I had a car, I would drive.' },
        ],
        mistakes: [
          { wrong: 'If I was you...', correct: 'If I were you...', why: 'In conditionals, use "were" for all subjects' },
        ],
        memoryTrick: '**2nd = WOULD + imagination!** If + past, WOULD + V1. "Were" for everyone!',
      },
      {
        title: 'Third Conditional (Past Regret)',
        slug: 'third-conditional',
        level: 'B2',
        explanation: 'Used for imaginary situations in the past — things that didn\'t happen.',
        hindiExplanation: 'बीते हुए समय की काल्पनिक बातें — "काश मैंने ये किया होता..."',
        types: ['Formula: If + had + V3, would have + V3'],
        examples: [
          { hindi: 'अगर मैंने मेहनत की होती, तो पास हो जाता।', english: 'If I had studied hard, I would have passed.' },
          { hindi: 'अगर बारिश नहीं हुई होती, तो हम गए होते।', english: 'If it hadn\'t rained, we would have gone.' },
        ],
        mistakes: [
          { wrong: 'If I would have known...', correct: 'If I had known...', why: 'Never "would have" in the if-clause' },
        ],
        memoryTrick: '**3rd = HAD + WOULD HAVE!** Past regret = If + had V3, would have V3!',
      },
    ],
  },
  {
    id: 'voice',
    title: 'Active & Passive Voice',
    emoji: '🔄',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    description: 'Transform sentences between active and passive voice',
    topics: [
      {
        title: 'Active Voice',
        slug: 'active-voice',
        level: 'A2',
        explanation: 'In active voice, the subject performs the action.',
        hindiExplanation: 'Active voice में subject खुद काम करता है।',
        types: ['Formula: Subject + Verb + Object'],
        examples: [
          { hindi: 'राहुल ने किताब पढ़ी।', english: 'Rahul read the book.' },
          { hindi: 'मैं खाना बनाता हूँ।', english: 'I cook food.' },
        ],
        mistakes: [],
        memoryTrick: '**Active = Subject DOES the action!** Who did it? That\'s your subject!',
      },
      {
        title: 'Passive Voice',
        slug: 'passive-voice',
        level: 'B1',
        explanation: 'In passive voice, the object of the action becomes the subject.',
        hindiExplanation: 'Passive voice में जिस पर काम हुआ वो subject बन जाता है।',
        types: ['Formula: Object + is/am/are/was/were + V3 + by + Subject'],
        examples: [
          { hindi: 'किताब राहुल द्वारा पढ़ी गई।', english: 'The book was read by Rahul.' },
          { hindi: 'खाना बनाया जाता है।', english: 'Food is cooked.' },
          { hindi: 'पत्र लिखा जा चुका है।', english: 'The letter has been written.' },
        ],
        mistakes: [
          { wrong: 'The book was readed.', correct: 'The book was read.', why: '"Read" V3 is still "read" (not readed)' },
        ],
        memoryTrick: '**Passive = Object becomes KING!** Object + be + V3 + by subject!',
      },
    ],
  },
  {
    id: 'speech',
    title: 'Direct & Indirect Speech',
    emoji: '💬',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    description: 'Report what someone said — narration changes',
    topics: [
      {
        title: 'Direct Speech',
        slug: 'direct-speech',
        level: 'B1',
        explanation: 'The exact words of the speaker are quoted.',
        hindiExplanation: 'बोलने वाले के ठीक वही शब्द quotes में लिखे जाते हैं।',
        types: ['Formula: Subject + said, "exact words"'],
        examples: [
          { hindi: 'राहुल ने कहा, "मैं स्कूल जा रहा हूँ।"', english: 'Rahul said, "I am going to school."' },
        ],
        mistakes: [],
        memoryTrick: '**Direct = COPY-PASTE!** Exactly same words in quotes!',
      },
      {
        title: 'Indirect Speech (Reported)',
        slug: 'indirect-speech',
        level: 'B1',
        explanation: 'The speaker\'s words are reported — tense and pronouns change.',
        hindiExplanation: 'बोलने वाले की बात अपने शब्दों में बताते हैं — tense और pronoun बदलते हैं।',
        types: ['Present → Past', 'Past → Past Perfect', 'Will → Would', 'Can → Could', 'Am/Is/Are → Was/Were'],
        examples: [
          { hindi: 'राहुल ने कहा कि वह स्कूल जा रहा था।', english: 'Rahul said that he was going to school.' },
          { hindi: 'उसने कहा कि वह मदद करेगा।', english: 'He said that he would help.' },
        ],
        mistakes: [
          { wrong: 'He said that he is going.', correct: 'He said that he was going.', why: 'Tense shifts back by one step' },
        ],
        memoryTrick: '**Indirect = TIME MACHINE!** Everything goes ONE STEP BACK in tense!',
      },
    ],
  },
];

// ── Animated Section Component ──────────────────────────────
function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ── Topic Card Component ────────────────────────────────────
function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={cardVariants} layout className="card overflow-hidden transition-all duration-300">
      {/* Topic header — clickable to expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm">{topic.title}</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary-500/10 text-primary-400">{topic.level}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{topic.explanation}</p>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-slate-500" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Hindi explanation */}
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs font-semibold text-amber-400 mb-1">🇮🇳 Hindi Explanation:</p>
                <p className="text-sm text-slate-300">{topic.hindiExplanation}</p>
              </div>

              {/* Types/formulas */}
              {topic.types?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-primary-400 mb-2 flex items-center gap-1">
                    <Hash size={12} /> Types / Formulas:
                  </p>
                  <div className="space-y-1">
                    {topic.types.map((t, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-primary-500 mt-0.5">•</span> {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {topic.examples?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Examples:
                  </p>
                  <div className="space-y-2">
                    {topic.examples.map((ex, i) => (
                      <div key={i} className="text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        <p className="text-slate-500">🇮🇳 {ex.hindi}</p>
                        <p className="text-white font-medium mt-0.5">🇬🇧 {ex.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes */}
              {topic.mistakes?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1">
                    <XCircle size={12} /> Common Mistakes:
                  </p>
                  <div className="space-y-2">
                    {topic.mistakes.map((m, i) => (
                      <div key={i} className="text-xs p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
                        <p className="text-rose-400">❌ {m.wrong}</p>
                        <p className="text-emerald-400">✅ {m.correct}</p>
                        <p className="text-slate-500 mt-1 italic">💡 {m.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Memory Trick */}
              {topic.memoryTrick && (
                <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10">
                  <p className="text-xs font-semibold text-violet-400 mb-1 flex items-center gap-1">
                    <Brain size={12} /> Memory Trick:
                  </p>
                  <p className="text-sm text-slate-300">{topic.memoryTrick}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT — Grammar Reference
// ============================================================
export default function GrammarReferencePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter categories and topics based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return GRAMMAR_CATEGORIES;
    const query = searchQuery.toLowerCase();
    return GRAMMAR_CATEGORIES.map((cat) => ({
      ...cat,
      topics: cat.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.explanation.toLowerCase().includes(query) ||
          t.hindiExplanation.includes(searchQuery)
      ),
    })).filter((cat) => cat.topics.length > 0 || cat.title.toLowerCase().includes(query));
  }, [searchQuery]);

  // Total topics count
  const totalTopics = GRAMMAR_CATEGORIES.reduce((sum, c) => sum + c.topics.length, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <BookOpen size={28} className="text-primary-400" /> Grammar Reference
          </h1>
          <p className="text-slate-500">
            {GRAMMAR_CATEGORIES.length} categories • {totalTopics} topics — Complete English grammar with Hindi explanations
          </p>
        </div>
      </AnimatedSection>

      {/* Search */}
      <AnimatedSection>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search grammar topics... (e.g., tenses, articles, pronouns)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-colors text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
      </AnimatedSection>

      {/* Category Navigation */}
      <AnimatedSection>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              !selectedCategory ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
            }`}
          >
            All Topics
          </button>
          {GRAMMAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.id ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
              }`}
            >
              {cat.emoji} {cat.title}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Grammar Categories */}
      {filteredCategories
        .filter((cat) => !selectedCategory || cat.id === selectedCategory)
        .map((category) => (
          <AnimatedSection key={category.id}>
            <div className="space-y-3">
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${category.bg} ${category.border} border flex items-center justify-center text-lg`}>
                  {category.emoji}
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">{category.title}</h2>
                  <p className="text-xs text-slate-500">{category.description} • {category.topics.length} topics</p>
                </div>
              </div>

              {/* Topic cards */}
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                {category.topics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} />
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        ))}

      {/* Empty state */}
      {filteredCategories.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-bold text-white mb-1">No grammar topics found</h3>
          <p className="text-slate-500 text-sm">Try a different search query</p>
        </div>
      )}
    </div>
  );
}
