#!/usr/bin/env node
// ============================================================
// One-off content-boost generator (v3) for data/challenge/day-01/.
// Each mode keeps its OWN counter and enumerates subject/verb/time
// combinations via divmod, so combinations never collide early
// regardless of how the outer loop interleaves modes (v1/v2 bugs).
// Grammar: explicit per-subject Hindi conjugation (no naive suffix
// replace that mangled multi-word verbs), correct Hindi negative
// habitual form, and true/false items whose label always matches
// the actual grammar of the generated sentence.
// Safe to delete after running; only edits the two JSON files below.
// ============================================================
'use strict';
const fs = require('fs');

const PQ_PATH = 'data/challenge/day-01/practice-questions.json';
const TEST_PATH = 'data/challenge/day-01/daily-test.json';

const pq = JSON.parse(fs.readFileSync(PQ_PATH, 'utf8'));
const test = JSON.parse(fs.readFileSync(TEST_PATH, 'utf8'));

const seenHindi = new Set(pq.questions.map((q) => q.hindi));

const SUBJECTS = [
  { hi: 'मैं', en: 'I', conj: 'I' },
  { hi: 'तुम', en: 'you', conj: 'you-informal' },
  { hi: 'आप', en: 'you', conj: 'you-formal' },
  { hi: 'वह लड़का', en: 'he', conj: 'he' },
  { hi: 'वह लड़की', en: 'she', conj: 'she' },
  { hi: 'हम', en: 'we', conj: 'we' },
  { hi: 'वे', en: 'they', conj: 'they' },
  { hi: 'मेरा भाई', en: 'my brother', conj: 'he' },
  { hi: 'मेरी बहन', en: 'my sister', conj: 'she' },
  { hi: 'मेरे पिता', en: 'my father', conj: 'he' },
  { hi: 'मेरी माँ', en: 'my mother', conj: 'she' },
  { hi: 'मेरा दोस्त', en: 'my friend', conj: 'he' },
  { hi: 'हमारा टीचर', en: 'our teacher', conj: 'he' },
  { hi: 'मेरी दादी', en: 'my grandmother', conj: 'she' },
  { hi: 'वे बच्चे', en: 'those children', conj: 'they' },
];

const SUFFIX = {
  'I':            { pos: 'ता हूँ',  neg: 'ता',  aux: 'do',   auxNeg: 'do not' },
  'you-informal': { pos: 'ते हो',   neg: 'ते',  aux: 'do',   auxNeg: 'do not' },
  'you-formal':   { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not' },
  'he':           { pos: 'ता है',   neg: 'ता',  aux: 'does', auxNeg: 'does not' },
  'she':          { pos: 'ती है',   neg: 'ती',  aux: 'does', auxNeg: 'does not' },
  'we':           { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not' },
  'they':         { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not' },
};

const VERB_BASE = [
  ['जाना', 'go', 'goes'], ['खाना', 'eat', 'eats'], ['पीना', 'drink', 'drinks'], ['पढ़ना', 'read', 'reads'],
  ['लिखना', 'write', 'writes'], ['खेलना', 'play', 'plays'], ['काम करना', 'work', 'works'], ['सोना', 'sleep', 'sleeps'],
  ['उठना', 'wake up', 'wakes up'], ['नहाना', 'take a bath', 'takes a bath'], ['सीखना', 'learn', 'learns'],
  ['बोलना', 'speak', 'speaks'], ['सुनना', 'listen', 'listens'], ['देखना', 'watch', 'watches'], ['दौड़ना', 'run', 'runs'],
  ['चलना', 'walk', 'walks'], ['हँसना', 'laugh', 'laughs'], ['गाना गाना', 'sing a song', 'sings a song'],
  ['खाना बनाना', 'cook food', 'cooks food'], ['साफ करना', 'clean', 'cleans'], ['मदद करना', 'help', 'helps'],
  ['समझना', 'understand', 'understands'], ['सिखाना', 'teach', 'teaches'], ['याद रखना', 'remember', 'remembers'],
  ['भूलना', 'forget', 'forgets'], ['मुस्कुराना', 'smile', 'smiles'],
];
function root(hindiInfinitive) { return hindiInfinitive.slice(0, -2); } // strip trailing "ना"

const TIME_ADV = [
  ['रोज़', 'every day'], ['हर सुबह', 'every morning'], ['हर रात', 'every night'], ['हमेशा', 'always'],
  ['अक्सर', 'often'], ['कभी-कभी', 'sometimes'], ['आमतौर पर', 'usually'], ['हफ्ते में दो बार', 'twice a week'],
  ['रविवार को', 'on Sunday'], ['सुबह जल्दी', 'early in the morning'],
];

const ARTICLE_NOUNS = [
  ['सेब', 'apple', 'an'], ['केला', 'banana', 'a'], ['छाता', 'umbrella', 'an'], ['किताब', 'book', 'a'],
  ['अंडा', 'egg', 'an'], ['कुर्सी', 'chair', 'a'], ['हाथी', 'elephant', 'an'], ['गाड़ी', 'car', 'a'],
  ['संतरा', 'orange', 'an'], ['टोपी', 'hat', 'a'], ['घंटा', 'hour', 'an'], ['ईमानदार आदमी', 'honest man', 'an'],
  ['टीचर', 'teacher', 'a'], ['इंजीनियर', 'engineer', 'an'], ['यूनिवर्सिटी', 'university', 'a'],
];

const PRONOUN_ROWS = [
  ['मैं', 'I', 'मुझे', 'me', 'मेरा', 'my'], ['तुम', 'you', 'तुम्हें', 'you', 'तुम्हारा', 'your'],
  ['वह (पुरुष)', 'he', 'उसे', 'him', 'उसका', 'his'], ['वह (स्त्री)', 'she', 'उसे', 'her', 'उसका', 'her'],
  ['हम', 'we', 'हमें', 'us', 'हमारा', 'our'], ['वे', 'they', 'उन्हें', 'them', 'उनका', 'their'],
];

const OBJECTS = [['किताब', 'book'], ['चाय', 'tea'], ['क्रिकेट', 'cricket'], ['फिल्म', 'movie'], ['गाना', 'song']];
const NAMES = [['राम', 'Ram'], ['सीता', 'Sita'], ['अमन', 'Aman'], ['प्रिया', 'Priya'], ['रोहन', 'Rohan'], ['नेहा', 'Neha']];
const OFFICE_TOPICS = [
  ['ईमेल', 'email'], ['रिपोर्ट', 'report'], ['प्रोजेक्ट', 'project'], ['मीटिंग', 'meeting'], ['डेडलाइन', 'deadline'],
  ['टीम मीटिंग', 'team meeting'], ['सैलरी स्लिप', 'salary slip'], ['इंटरव्यू', 'interview'],
];
const WH_WORDS = [['क्यों', 'Why'], ['कहाँ', 'Where'], ['कब', 'When'], ['कैसे', 'How']];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// divmod-based combination picker: guarantees the full cartesian product is
// enumerated in order (no collisions) before any combo repeats.
function combo(counter, ...lengths) {
  const idxs = [];
  let rem = counter;
  for (const len of lengths) { idxs.push(rem % len); rem = Math.floor(rem / len); }
  return idxs;
}

function addPQ(hindi, english, hint, explanation, category, difficulty, tags, grammarRule, alt = []) {
  if (seenHindi.has(hindi)) return false;
  seenHindi.add(hindi);
  pq.questions.push({ id: pq.questions.length + 1, hindi, english, alternatives: alt, hint, explanation, difficulty, tags, grammarRule, category });
  return true;
}

const TARGET_PQ = 1400;
const MAX_ITER_PQ = 500000;
const modeCounter = [0, 0, 0, 0, 0, 0, 0];
let iter = 0;
while (pq.questions.length < TARGET_PQ && iter < MAX_ITER_PQ) {
  const mode = iter % 7;
  iter += 1;
  const c = modeCounter[mode]++;
  if (mode === 0) {
    const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
    const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
    const en = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
    addPQ(`${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}।`, `${cap(subj.en)} ${en} ${time[1]}.`,
      'Subject + verb (he/she +s/+es) + time', `Simple Present Positive: "${subj.en}" ke saath "${en}" aata hai.`,
      'Simple Present Positive', 'easy', ['simple-present', 'svo', 'positive'], 'Subject + Verb(+s) + Time');
  } else if (mode === 1) {
    const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
    const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
    addPQ(`${subj.hi} ${time[0]} नहीं ${root(verb[0])}${suf.neg}।`, `${cap(subj.en)} ${suf.auxNeg} ${verb[1]} ${time[1]}.`,
      "Subject + don't/doesn't + base verb", `Negative sentence: he/she ke साथ "doesn't", baaki sab ke साथ "don't".`,
      'Simple Present Negative', 'medium', ['simple-present', 'negative'], "Subject + don't/doesn't + base verb + Time",
      [`${cap(subj.en)} ${suf.auxNeg.replace('do not', "don't").replace('does not', "doesn't")} ${verb[1]} ${time[1]}.`]);
  } else if (mode === 2) {
    const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
    const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
    addPQ(`क्या ${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}?`, `${cap(suf.aux)} ${subj.en} ${verb[1]} ${time[1]}?`,
      'Do/Does + subject + base verb?', 'Yes/No question ke liye Do/Does subject se pehle aata hai.',
      'Simple Present Questions', 'medium', ['simple-present', 'question'], 'Do/Does + Subject + base verb + Time?');
  } else if (mode === 3) {
    const [wi, si, vi] = combo(c, WH_WORDS.length, SUBJECTS.length, VERB_BASE.length);
    const wh = WH_WORDS[wi]; const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const suf = SUFFIX[subj.conj];
    addPQ(`${subj.hi} ${wh[0]} ${root(verb[0])}${suf.pos}?`, `${wh[1]} ${suf.aux} ${subj.en} ${verb[1]}?`,
      'WH word + do/does + subject + base verb?', `WH question me pehle question word, फिर do/does, फिर subject, फिर base verb.`,
      'WH Questions', 'medium', ['wh-question', 'simple-present'], 'WH + do/does + Subject + base verb?');
  } else if (mode === 4) {
    const [ai] = combo(c, ARTICLE_NOUNS.length);
    const [hindi, word, article] = ARTICLE_NOUNS[ai];
    addPQ(`मेरे पास ${hindi} है।`, `I have ${article} ${word}.`, `${article} + noun`,
      `"${word}" ${/^[aeiou]/i.test(word) ? 'vowel sound' : 'consonant sound'} se shuru hota hai, इसलिए "${article}" use hoga.`,
      'Articles', 'easy', ['articles', article === 'an' ? 'vowel-sound' : 'consonant-sound'], `I have ${article} + noun`);
  } else if (mode === 5) {
    const [ki, ri, oi] = combo(c, 3, PRONOUN_ROWS.length, Math.max(OBJECTS.length, NAMES.length));
    const row = PRONOUN_ROWS[ri];
    if (ki === 0) {
      const [objHi, objEn] = OBJECTS[oi % OBJECTS.length];
      const likeForm = (row[1] === 'he' || row[1] === 'she') ? 'likes' : 'like';
      addPQ(`${row[0]} ${objHi} पसंद करता/करती है।`, `${cap(row[1])} ${likeForm} ${objEn}.`,
        'Subject pronoun + verb', 'Subject pronoun sentence ke shuru me aata hai.', 'Pronouns', 'easy', ['pronoun', 'subject'], 'Subject pronoun + verb + object');
    } else if (ki === 1) {
      addPQ(`कृपया ${row[2]} बताओ।`, `Please tell ${row[3]}.`,
        'Object pronoun after verb/preposition', 'Object pronoun verb ke baad ya preposition ke baad aata hai.', 'Pronouns', 'easy', ['pronoun', 'object'], 'Verb + object pronoun');
    } else {
      const [nameHi, nameEn] = NAMES[oi % NAMES.length];
      addPQ(`${row[4]} नाम ${nameHi} है।`, `${cap(row[5])} name is ${nameEn}.`, 'Possessive adjective + noun',
        'Possessive adjective noun se pehle aata hai (my, your, his, her, our, their).', 'Pronouns', 'easy', ['pronoun', 'possessive'], 'Possessive adjective + noun + is + name');
    }
  } else {
    const [ti, si, tpi] = combo(c, OFFICE_TOPICS.length, SUBJECTS.length, 3);
    const topic = OFFICE_TOPICS[ti]; const subj = SUBJECTS[si];
    const beForm = subj.conj === 'I' ? 'am' : (subj.conj === 'he' || subj.conj === 'she') ? 'is' : 'are';
    const templates = [
      [`${subj.hi} ${topic[0]} पर काम कर रहा/रही है।`, `${cap(subj.en)} ${beForm} working on the ${topic[1]}.`],
      [`कृपया ${topic[0]} कल तक भेज दें।`, `Please send the ${topic[1]} by tomorrow.`],
      [`हमारी ${topic[0]} सुबह दस बजे है।`, `Our ${topic[1]} is at ten in the morning.`],
    ];
    const [h, e] = templates[tpi];
    addPQ(h, e, 'Office/professional sentence pattern', 'Office English me clear aur polite sentence use karna zaroori hai.',
      'Office & Professional', 'medium', ['office', 'professional'], 'Professional sentence pattern');
  }
}
pq.totalQuestions = pq.questions.length;
pq.categories = Array.from(new Set(pq.questions.map((q) => q.category)));

// ─── Test questions ─────────────────────────────────────────
function letterFor(index) { return ['A', 'B', 'C', 'D'][index]; }
function addTest(question, options, correctIndex, explanation, difficulty, type = 'mcq', marks = 1) {
  test.questions.push({ id: test.questions.length + 1, type, question, options, correct: letterFor(correctIndex), explanation, difficulty, marks });
}

// Each test question embeds the distinguishing Hindi/English content directly
// in the `question` text (not just in the options) so items never read as
// literal repeats of a generic instruction, matching the original file's style.
// Small-vocabulary modes (articles, pronouns, office topics) get exactly their
// real capacity; the remainder is split across the three large combinatorial
// modes so every item stays unique.
const TEST_TARGET = 400;
const ARTICLE_SLOTS = ARTICLE_NOUNS.length;      // 15 — full real capacity, no repeats
const PRONOUN_SLOTS = PRONOUN_ROWS.length;       // 6
const OFFICE_SLOTS = OFFICE_TOPICS.length;       // 8
const remaining = TEST_TARGET - ARTICLE_SLOTS - PRONOUN_SLOTS - OFFICE_SLOTS;
const perBigMode = Math.floor(remaining / 3);
const bigModeCounts = [perBigMode, perBigMode, remaining - perBigMode * 2]; // grammar, true/false, question-form

for (let ai = 0; ai < ARTICLE_SLOTS; ai++) {
  const [hindi, word, article] = ARTICLE_NOUNS[ai];
  const wrongArticle = article === 'a' ? 'an' : 'a';
  const options = [`I have ${article} ${word}.`, `I have ${wrongArticle} ${word}.`, `I have ${word}.`, `I have the a ${word}.`];
  addTest(`Which sentence correctly translates "मेरे पास ${hindi} है।"?`, options, 0,
    `"${word}" ${article === 'an' ? 'vowel sound se shuru hota hai' : 'consonant sound se shuru hota hai'}, इसलिए "${article}" सही है।`, 'easy', 'fill-blank');
}
for (let ri = 0; ri < PRONOUN_SLOTS; ri++) {
  const row = PRONOUN_ROWS[ri];
  const options = [row[1], row[3], row[5], 'it'];
  addTest(`In "${row[0]}" (subject/object/possessive set), which word is the SUBJECT pronoun?`, options, 0,
    `"${row[1]}" subject pronoun hai, jabki "${row[3]}" object aur "${row[5]}" possessive hai।`, 'medium');
}
for (let ti = 0; ti < OFFICE_SLOTS; ti++) {
  const topic = OFFICE_TOPICS[ti];
  const correct = `Please send the ${topic[1]} today.`;
  const options = [correct, `Please to send the ${topic[1]} today.`, `Please sending the ${topic[1]} today.`, `Please sends the ${topic[1]} today.`];
  addTest(`Choose the correct English sentence for: "कृपया ${topic[0]} आज भेज दें।"`, options, 0,
    'Imperative office request: Please + base verb + object.', 'medium', 'mcq', 2);
}
for (let c = 0; c < bigModeCounts[0]; c++) {
  const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const correctEn = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
  const wrongVerbEn = (subj.conj === 'he' || subj.conj === 'she') ? verb[1] : verb[2];
  const options = [`${cap(subj.en)} ${correctEn} ${time[1]}.`, `${cap(subj.en)} ${wrongVerbEn} ${time[1]}.`, `${cap(subj.en)} ${verb[1]}ing ${time[1]}.`, `${cap(subj.en)} to ${verb[1]} ${time[1]}.`];
  addTest(`Choose the correct English translation of: "${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}।"`, options, 0,
    `Simple Present me subject "${subj.en}" ke according verb form choose karo — he/she + verb+s, baaki subjects base verb.`, 'easy');
}
for (let c = 0; c < bigModeCounts[1]; c++) {
  const [si, vi, ti, wrongBit] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length, 2);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const makeItWrong = wrongBit === 1;
  const wrongAux = suf.auxNeg === 'does not' ? 'do not' : 'does not';
  const statement = `${cap(subj.en)} ${makeItWrong ? wrongAux : suf.auxNeg} ${verb[1]} ${time[1]}.`;
  const options = ['True', 'False'];
  addTest(`True or False: "${statement}" is a grammatically correct Simple Present Negative sentence.`, options, makeItWrong ? 1 : 0,
    makeItWrong
      ? `Galat hai: "${subj.en}" ke saath "${suf.auxNeg}" hona chahiye, "${wrongAux}" nahi.`
      : `Sahi hai: "${subj.en}" ke saath "${suf.auxNeg}" + base verb sahi structure hai.`,
    'medium', 'true-false');
}
for (let c = 0; c < bigModeCounts[2]; c++) {
  const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const options = [`${cap(suf.aux)} ${subj.en} ${verb[1]} ${time[1]}?`, `${cap(suf.aux)} ${subj.en} ${verb[2]} ${time[1]}?`,
    `${cap(subj.en)} ${suf.aux} ${verb[1]} ${time[1]}?`, `${cap(suf.aux)} ${subj.en} ${verb[1]}ing ${time[1]}?`];
  addTest(`Choose the correct English question for: "क्या ${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}?"`, options, 0,
    'Do/Does subject se pehle aata hai, verb hamesha base form me rehti hai.', 'medium');
}
test.totalQuestions = test.questions.length;

fs.writeFileSync(PQ_PATH, JSON.stringify(pq, null, 2));
fs.writeFileSync(TEST_PATH, JSON.stringify(test, null, 2));

console.log('practice-questions.json ->', pq.questions.length, 'questions,', pq.categories.length, 'categories');
console.log('daily-test.json ->', test.questions.length, 'questions');
console.log('mode saturation (pq):', modeCounter);
console.log('mode saturation (test):', tModeCounter);
