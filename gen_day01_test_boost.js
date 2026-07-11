#!/usr/bin/env node
// ============================================================================
// gen_day01_test_boost.js
// ----------------------------------------------------------------------------
// Purpose: grow Day 1's daily-test.json (currently 400 untagged questions)
// into a category-tagged test bank, roughly matching each grammar category's
// practice-question ceiling at the documented ~35% test/practice ratio
// (900 practice -> ~315 test, etc.) so the "test with N% of the bank"
// picker has a real, per-category-aware pool to sample from.
//
// New questions get a `category` field (existing 400 legacy questions are
// left untouched — they stay generic/uncategorised, which is fine, they are
// still served in the "Mixed" pool). Safe to re-run: only appends, dedupes
// by exact question text.
// ============================================================================
'use strict';
const fs = require('fs');

const TEST_PATH = 'data/challenge/day-01/daily-test.json';
const test = JSON.parse(fs.readFileSync(TEST_PATH, 'utf8'));
const seenQ = new Set(test.questions.map((q) => q.question + '|' + q.options.join(',')));

function nextId() { return test.questions.length ? test.questions[test.questions.length - 1].id + 1 : 1; }
function letterFor(i) { return ['A', 'B', 'C', 'D'][i]; }
function addTest(question, options, correctIndex, explanation, category, difficulty, type = 'mcq', marks = 1) {
  const key = question + '|' + options.join(',');
  if (seenQ.has(key)) return false;
  seenQ.add(key);
  test.questions.push({ id: nextId(), type, question, options, correct: letterFor(correctIndex), explanation, difficulty, marks, category });
  return true;
}
function combo(counter, ...lengths) {
  const idxs = [];
  let rem = counter;
  for (const len of lengths) { idxs.push(rem % len); rem = Math.floor(rem / len); }
  return idxs;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const SUBJECTS = [
  { hi: 'मैं', en: 'I', conj: 'I' }, { hi: 'तुम', en: 'you', conj: 'you-informal' },
  { hi: 'वह लड़का', en: 'he', conj: 'he' }, { hi: 'वह लड़की', en: 'she', conj: 'she' },
  { hi: 'हम', en: 'we', conj: 'we' }, { hi: 'वे', en: 'they', conj: 'they' },
  { hi: 'मेरा भाई', en: 'my brother', conj: 'he' }, { hi: 'मेरी बहन', en: 'my sister', conj: 'she' },
  { hi: 'मेरे पिता', en: 'my father', conj: 'he' }, { hi: 'मेरे सहकर्मी', en: 'my colleagues', conj: 'they' },
  { hi: 'मेरी माँ', en: 'my mother', conj: 'she' }, { hi: 'मेरा दोस्त', en: 'my friend', conj: 'he' },
  { hi: 'हमारा टीचर', en: 'our teacher', conj: 'he' }, { hi: 'मेरी दादी', en: 'my grandmother', conj: 'she' },
  { hi: 'वे बच्चे', en: 'those children', conj: 'they' }, { hi: 'मेरा चचेरा भाई', en: 'my cousin', conj: 'he' },
  { hi: 'हमारा पड़ोसी', en: 'our neighbour', conj: 'he' }, { hi: 'वह डॉक्टर', en: 'that doctor', conj: 'he' },
  { hi: 'मेरे सहकर्मी', en: 'my teammates', conj: 'they' }, { hi: 'मेरा बॉस', en: 'my boss', conj: 'he' },
  { hi: 'मेरी मैनेजर', en: 'my manager', conj: 'she' }, { hi: 'आप', en: 'you', conj: 'you-formal' },
  { hi: 'हमारी टीम', en: 'our team', conj: 'they' }, { hi: 'मेरी सहेली', en: 'my (female) friend', conj: 'she' },
];
const SUFFIX = {
  'I': { pos: 'ता हूँ', neg: 'ता', aux: 'do', auxNeg: 'do not', be: 'हूँ', beEn: 'am' },
  'you-informal': { pos: 'ते हो', neg: 'ते', aux: 'do', auxNeg: 'do not', be: 'हो', beEn: 'are' },
  'you-formal': { pos: 'ते हैं', neg: 'ते', aux: 'do', auxNeg: 'do not', be: 'हैं', beEn: 'are' },
  'he': { pos: 'ता है', neg: 'ता', aux: 'does', auxNeg: 'does not', be: 'है', beEn: 'is' },
  'she': { pos: 'ती है', neg: 'ती', aux: 'does', auxNeg: 'does not', be: 'है', beEn: 'is' },
  'we': { pos: 'ते हैं', neg: 'ते', aux: 'do', auxNeg: 'do not', be: 'हैं', beEn: 'are' },
  'they': { pos: 'ते हैं', neg: 'ते', aux: 'do', auxNeg: 'do not', be: 'हैं', beEn: 'are' },
};
const VERB_BASE = [
  ['जाना', 'go', 'goes'], ['खाना', 'eat', 'eats'], ['पढ़ना', 'read', 'reads'], ['लिखना', 'write', 'writes'],
  ['खेलना', 'play', 'plays'], ['काम करना', 'work', 'works'], ['सोना', 'sleep', 'sleeps'], ['सीखना', 'learn', 'learns'],
  ['बोलना', 'speak', 'speaks'], ['देखना', 'watch', 'watches'], ['समझना', 'understand', 'understands'],
  ['भेजना', 'send', 'sends'], ['खरीदना', 'buy', 'buys'], ['शुरू करना', 'start', 'starts'],
];
function root(h) { return h.slice(0, -2); }
const TIME_ADV = [
  ['रोज़', 'every day'], ['हर सुबह', 'every morning'], ['हमेशा', 'always'], ['अक्सर', 'often'],
  ['आमतौर पर', 'usually'], ['हफ्ते में दो बार', 'twice a week'], ['सुबह जल्दी', 'early in the morning'],
  ['हर हफ्ते', 'every week'], ['शाम को', 'in the evening'], ['सप्ताहांत में', 'on weekends'],
];
const WH_WORDS = [['क्यों', 'Why'], ['कहाँ', 'Where'], ['कब', 'When'], ['कैसे', 'How'], ['क्या', 'What'], ['कौन', 'Who']];
const ARTICLE_NOUNS = [
  ['सेब', 'apple', 'an'], ['केला', 'banana', 'a'], ['छाता', 'umbrella', 'an'], ['किताब', 'book', 'a'],
  ['अंडा', 'egg', 'an'], ['कुर्सी', 'chair', 'a'], ['हाथी', 'elephant', 'an'], ['गाड़ी', 'car', 'a'],
  ['संतरा', 'orange', 'an'], ['टोपी', 'hat', 'a'], ['टीचर', 'teacher', 'a'], ['इंजीनियर', 'engineer', 'an'],
  ['घंटा', 'hour', 'an'], ['यूनिवर्सिटी', 'university', 'a'], ['आइडिया', 'idea', 'an'], ['ऑफिस', 'office', 'an'],
  ['डॉक्टर', 'doctor', 'a'], ['किताबों की दुकान', 'bookshop', 'a'], ['एक्सीडेंट', 'accident', 'an'],
  ['यूनिफॉर्म', 'uniform', 'a'], ['आर्किटेक्ट', 'architect', 'an'], ['ईमेल', 'email', 'an'], ['बाइक', 'bike', 'a'],
  ['होटल', 'hotel', 'a'], ['अपॉइंटमेंट', 'appointment', 'an'],
];
const PRONOUN_ROWS = [
  ['मैं', 'I', 'मुझे', 'me', 'मेरा', 'my'], ['तुम', 'you', 'तुम्हें', 'you', 'तुम्हारा', 'your'],
  ['वह (पुरुष)', 'he', 'उसे', 'him', 'उसका', 'his'], ['वह (स्त्री)', 'she', 'उसे', 'her', 'उसका', 'her'],
  ['हम', 'we', 'हमें', 'us', 'हमारा', 'our'], ['वे', 'they', 'उन्हें', 'them', 'उनका', 'their'],
];
const OFFICE_TOPICS = [
  ['ईमेल', 'email'], ['रिपोर्ट', 'report'], ['प्रोजेक्ट', 'project'], ['मीटिंग', 'meeting'], ['डेडलाइन', 'deadline'],
  ['प्रेजेंटेशन', 'presentation'], ['बजट', 'budget'], ['इनवॉइस', 'invoice'],
  ['टीम मीटिंग', 'team meeting'], ['सैलरी स्लिप', 'salary slip'], ['इंटरव्यू', 'interview'],
  ['परफॉरमेंस रिव्यू', 'performance review'], ['ऑफर लेटर', 'offer letter'], ['ट्रेनिंग सेशन', 'training session'],
  ['कॉन्ट्रैक्ट', 'contract'], ['क्लाइंट कॉल', 'client call'],
];
const SCHOOL_SUBJECTS = [['गणित', 'Maths'], ['विज्ञान', 'Science'], ['इतिहास', 'History'], ['अंग्रेज़ी', 'English'], ['कंप्यूटर', 'Computer'], ['भूगोल', 'Geography'],
  ['नागरिक शास्त्र', 'Civics'], ['कला', 'Art'], ['संगीत', 'Music'], ['खेल', 'Sports']];
const FAMILY_MEMBERS = [
  ['मेरे दादा', 'my grandfather', 'he'], ['मेरी दादी', 'my grandmother', 'she'], ['मेरे चाचा', 'my uncle', 'he'],
  ['मेरी चाची', 'my aunt', 'she'], ['मेरा चचेरा भाई', 'my cousin brother', 'he'], ['मेरी चचेरी बहन', 'my cousin sister', 'she'],
  ['मेरे मामा', 'my maternal uncle', 'he'], ['मेरी मामी', 'my maternal aunt', 'she'], ['मेरी भाभी', 'my sister-in-law', 'she'],
  ['मेरे ससुर', 'my father-in-law', 'he'], ['मेरी सास', 'my mother-in-law', 'she'], ['मेरा भतीजा', 'my nephew', 'he'],
  ['मेरी भतीजी', 'my niece', 'she'], ['मेरा पोता', 'my grandson', 'he'], ['मेरी पोती', 'my granddaughter', 'she'],
  ['मेरी बुआ', "my aunt (father's sister)", 'she'],
];
const ADJECTIVES = [
  ['ईमानदार', 'honest'], ['मेहनती', 'hardworking'], ['होशियार', 'intelligent'], ['दयालु', 'kind'],
  ['जिम्मेदार', 'responsible'], ['रचनात्मक', 'creative'], ['विनम्र', 'polite'], ['भरोसेमंद', 'reliable'],
  ['दोस्ताना', 'friendly'], ['आत्मविश्वासी', 'confident'], ['अनुशासित', 'disciplined'], ['सकारात्मक', 'positive'],
  ['धैर्यवान', 'patient'], ['सक्रिय', 'active'], ['व्यवस्थित', 'organized'], ['लचीला', 'flexible'],
];
const PREPOSITIONS = [['में', 'in'], ['पर', 'on'], ['के नीचे', 'under'], ['के ऊपर', 'above'], ['के पीछे', 'behind'], ['के पास', 'near'], ['के अंदर', 'inside'], ['के साथ', 'with'],
  ['के सामने', 'in front of'], ['के बीच में', 'between'], ['के बाहर', 'outside'], ['के बिना', 'without'], ['की तरफ', 'towards'], ['के बगल में', 'next to']];
const PLACES = [['मेज़', 'table'], ['कुर्सी', 'chair'], ['कमरा', 'room'], ['स्कूल', 'school'], ['पार्क', 'park'], ['घर', 'house'],
  ['बॉक्स', 'box'], ['बाज़ार', 'market'], ['स्टेशन', 'station'], ['बगीचा', 'garden']];

function genFromProduct(target, category, difficulty, poolLen, builder) {
  const goal = Math.min(target, poolLen);
  let count = 0; let c = 0; let guard = 0;
  while (count < goal && guard < poolLen * 3) {
    guard += 1;
    if (builder(c)) count += 1;
    c += 1;
  }
  return count;
}

// Simple Present Positive
genFromProduct(315, 'Simple Present Positive', 'easy', SUBJECTS.length * VERB_BASE.length * TIME_ADV.length, (c) => {
  const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const correctEn = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
  const wrongVerbEn = (subj.conj === 'he' || subj.conj === 'she') ? verb[1] : verb[2];
  const options = [`${cap(subj.en)} ${correctEn} ${time[1]}.`, `${cap(subj.en)} ${wrongVerbEn} ${time[1]}.`, `${cap(subj.en)} ${verb[1]}ing ${time[1]}.`, `${cap(subj.en)} to ${verb[1]} ${time[1]}.`];
  return addTest(`Choose the correct English translation of: "${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}।"`, options, 0,
    `Simple Present me subject "${subj.en}" ke according verb form choose karo.`, 'Simple Present Positive', 'easy');
});

// Simple Present Negative
genFromProduct(315, 'Simple Present Negative', 'medium', SUBJECTS.length * VERB_BASE.length * TIME_ADV.length * 2, (c) => {
  const [si, vi, ti, wrongBit] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length, 2);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const makeItWrong = wrongBit === 1;
  const wrongAux = suf.auxNeg === 'does not' ? 'do not' : 'does not';
  const statement = `${cap(subj.en)} ${makeItWrong ? wrongAux : suf.auxNeg} ${verb[1]} ${time[1]}.`;
  return addTest(`True or False: "${statement}" is a grammatically correct Simple Present Negative sentence.`, ['True', 'False'], makeItWrong ? 1 : 0,
    makeItWrong ? `Galat hai: "${subj.en}" ke saath "${suf.auxNeg}" hona chahiye.` : `Sahi hai: "${subj.en}" ke saath "${suf.auxNeg}" + base verb sahi hai.`,
    'Simple Present Negative', 'medium', 'true-false');
});

// Simple Present Questions
genFromProduct(315, 'Simple Present Questions', 'medium', SUBJECTS.length * VERB_BASE.length * TIME_ADV.length, (c) => {
  const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const options = [`${cap(suf.aux)} ${subj.en} ${verb[1]} ${time[1]}?`, `${cap(suf.aux)} ${subj.en} ${verb[2]} ${time[1]}?`,
    `${cap(subj.en)} ${suf.aux} ${verb[1]} ${time[1]}?`, `${cap(suf.aux)} ${subj.en} ${verb[1]}ing ${time[1]}?`];
  return addTest(`Choose the correct English question for: "क्या ${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}?"`, options, 0,
    'Do/Does subject se pehle aata hai, verb hamesha base form me rehti hai.', 'Simple Present Questions', 'medium');
});

// WH Questions
genFromProduct(315, 'WH Questions', 'medium', WH_WORDS.length * SUBJECTS.length * VERB_BASE.length, (c) => {
  const [wi, si, vi] = combo(c, WH_WORDS.length, SUBJECTS.length, VERB_BASE.length);
  const wh = WH_WORDS[wi]; const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const suf = SUFFIX[subj.conj];
  const options = [`${wh[1]} ${suf.aux} ${subj.en} ${verb[1]}?`, `${wh[1]} ${subj.en} ${suf.aux} ${verb[1]}?`,
    `${suf.aux} ${wh[1]} ${subj.en} ${verb[1]}?`, `${wh[1]} ${suf.aux} ${subj.en} ${verb[2]}?`];
  return addTest(`Choose the correct WH-question for: "${subj.hi} ${wh[0]} ${root(verb[0])}${suf.pos}?"`, options, 0,
    'WH word + do/does + subject + base verb — yehi sahi order hai.', 'WH Questions', 'medium');
});

// Articles
genFromProduct(175, 'Articles', 'easy', ARTICLE_NOUNS.length, (c) => {
  const [hindi, word, article] = ARTICLE_NOUNS[c % ARTICLE_NOUNS.length];
  const wrongArticle = article === 'a' ? 'an' : 'a';
  const options = [`I have ${article} ${word}.`, `I have ${wrongArticle} ${word}.`, `I have ${word}.`, `I have the a ${word}.`];
  return addTest(`Which sentence correctly translates "मेरे पास ${hindi} है।" (attempt #${Math.floor(c / ARTICLE_NOUNS.length) + 1})?`, options, 0,
    `"${word}" ${article === 'an' ? 'vowel sound se shuru hota hai' : 'consonant sound se shuru hota hai'}.`, 'Articles', 'easy', 'fill-blank');
});

// Pronouns
genFromProduct(145, 'Pronouns', 'medium', PRONOUN_ROWS.length * 3, (c) => {
  const [ri, kind] = combo(c, PRONOUN_ROWS.length, 3);
  const row = PRONOUN_ROWS[ri];
  if (kind === 0) {
    const options = [row[1], row[3], row[5], 'it'];
    return addTest(`In the set "${row[0]} / ${row[2]} / ${row[4]}", which word is the SUBJECT pronoun?`, options, 0,
      `"${row[1]}" subject pronoun hai.`, 'Pronouns', 'medium');
  } else if (kind === 1) {
    const options = [row[3], row[1], row[5], 'them'];
    return addTest(`Which word is the OBJECT pronoun in "${row[0]} / ${row[2]} / ${row[4]}"?`, options, 0,
      `"${row[3]}" object pronoun hai — verb ke baad aata hai.`, 'Pronouns', 'medium');
  } else {
    const options = [row[5], row[1], row[3], 'theirs'];
    return addTest(`Which word is the POSSESSIVE adjective in "${row[0]} / ${row[2]} / ${row[4]}"?`, options, 0,
      `"${row[5]}" possessive adjective hai — noun se pehle aata hai.`, 'Pronouns', 'medium');
  }
});

// Adjectives & Descriptions
genFromProduct(245, 'Adjectives & Descriptions', 'easy', SUBJECTS.length * ADJECTIVES.length, (c) => {
  const [si, ai] = combo(c, SUBJECTS.length, ADJECTIVES.length);
  const subj = SUBJECTS[si]; const adj = ADJECTIVES[ai]; const suf = SUFFIX[subj.conj];
  const wrongBe = suf.beEn === 'is' ? 'are' : suf.beEn === 'are' ? 'is' : 'is';
  const options = [`${cap(subj.en)} ${suf.beEn} very ${adj[1]}.`, `${cap(subj.en)} ${wrongBe} very ${adj[1]}.`,
    `${cap(subj.en)} very ${adj[1]}.`, `${cap(subj.en)} ${suf.beEn} very ${adj[1]}ly.`];
  return addTest(`Choose the correct translation of: "${subj.hi} बहुत ${adj[0]} ${suf.be}।"`, options, 0,
    `Subject ke agreement ke hisaab se sahi "be" verb (is/am/are) use karo.`, 'Adjectives & Descriptions', 'easy');
});

// Prepositions
genFromProduct(245, 'Prepositions', 'easy', PREPOSITIONS.length * PLACES.length, (c) => {
  const [pi, pli] = combo(c, PREPOSITIONS.length, PLACES.length);
  const prep = PREPOSITIONS[pi]; const place = PLACES[pli];
  const wrongPrep = PREPOSITIONS[(pi + 1) % PREPOSITIONS.length];
  const options = [`It is ${prep[1]} the ${place[1]}.`, `It is ${wrongPrep[1]} the ${place[1]}.`, `It is the ${place[1]} ${prep[1]}.`, `It ${prep[1]} the ${place[1]}.`];
  return addTest(`Choose the correct sentence for: "यह ${place[0]} ${prep[0]} है।"`, options, 0,
    `Preposition jagah/position batati hai aur noun se pehle aati hai.`, 'Prepositions', 'easy');
});

// Family
genFromProduct(245, 'Family', 'easy', FAMILY_MEMBERS.length * VERB_BASE.length, (c) => {
  const [fi, vi] = combo(c, FAMILY_MEMBERS.length, VERB_BASE.length);
  const fam = FAMILY_MEMBERS[fi]; const verb = VERB_BASE[vi]; const suf = SUFFIX[fam[2]];
  const correctEn = (fam[2] === 'he' || fam[2] === 'she') ? verb[2] : verb[1];
  const wrongEn = (fam[2] === 'he' || fam[2] === 'she') ? verb[1] : verb[2];
  const options = [`${cap(fam[1])} ${correctEn} every day.`, `${cap(fam[1])} ${wrongEn} every day.`, `${cap(fam[1])} ${verb[1]}ing every day.`, `${cap(fam[1])} to ${verb[1]} every day.`];
  return addTest(`Choose the correct sentence for: "${fam[0]} रोज़ ${root(verb[0])}${suf.pos}।"`, options, 0,
    'He/she ke saath verb+s/es, baaki subjects ke saath base verb.', 'Family', 'easy');
});

// School & College
genFromProduct(245, 'School & College', 'easy', SCHOOL_SUBJECTS.length * SUBJECTS.length, (c) => {
  const [ssi, si] = combo(c, SCHOOL_SUBJECTS.length, SUBJECTS.length);
  const subj2 = SCHOOL_SUBJECTS[ssi]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
  const correctEn = (subj.conj === 'he' || subj.conj === 'she') ? 'studies' : 'study';
  const wrongEn = (subj.conj === 'he' || subj.conj === 'she') ? 'study' : 'studies';
  const options = [`${cap(subj.en)} ${correctEn} ${subj2[1]}.`, `${cap(subj.en)} ${wrongEn} ${subj2[1]}.`, `${cap(subj.en)} studying ${subj2[1]}.`, `${cap(subj.en)} to study ${subj2[1]}.`];
  return addTest(`Choose the correct sentence for: "${subj.hi} ${subj2[0]} पढ़ता/पढ़ती है।"`, options, 0,
    'Subject-verb agreement: he/she + studies, baaki + study.', 'School & College', 'easy');
});

// Office & Professional
genFromProduct(315, 'Office & Professional', 'medium', OFFICE_TOPICS.length * SUBJECTS.length, (c) => {
  const [ti, si] = combo(c, OFFICE_TOPICS.length, SUBJECTS.length);
  const topic = OFFICE_TOPICS[ti]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
  const correct = `Please send the ${topic[1]} today.`;
  const options = [correct, `Please to send the ${topic[1]} today.`, `Please sending the ${topic[1]} today.`, `Please sends the ${topic[1]} today.`];
  return addTest(`Choose the correct English sentence for: "कृपया ${topic[0]} आज भेज दें।" (${subj.en} version #${si + 1})`, options, 0,
    'Imperative office request: Please + base verb + object.', 'Office & Professional', 'medium', 'mcq', 2);
});

// Hard Professional Sentences — kept smaller, matching its practice cap.
genFromProduct(140, 'Hard Professional Sentences', 'hard', SUBJECTS.length * OFFICE_TOPICS.length, (c) => {
  const [si, ti] = combo(c, SUBJECTS.length, OFFICE_TOPICS.length);
  const subj = SUBJECTS[si]; const topic = OFFICE_TOPICS[ti];
  const correct = `${cap(subj.en)} said that he/she would complete the ${topic[1]} by tomorrow.`;
  const options = [correct, `${cap(subj.en)} said that he/she complete the ${topic[1]} by tomorrow.`,
    `${cap(subj.en)} says that he/she will completed the ${topic[1]} by tomorrow.`, `${cap(subj.en)} say that he/she would complete the ${topic[1]} by tomorrow.`];
  return addTest(`Choose the correct reported-speech sentence for: "${subj.hi} ने कहा कि वह ${topic[0]} कल तक पूरा कर देगा/देगी।"`, options, 0,
    'Reported speech me tense ek step peeche shift hota hai (will -> would).', 'Hard Professional Sentences', 'hard', 'mcq', 2);
});

// Daily Routine — reuse VERB_BASE + TIME_ADV
genFromProduct(315, 'Daily Routine', 'easy', SUBJECTS.length * VERB_BASE.length * TIME_ADV.length, (c) => {
  const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
  const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
  const correctEn = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
  const options = [`${cap(subj.en)}'s routine includes ${verb[1]}ing ${time[1]}.`, `${cap(subj.en)}'s routine include ${verb[1]}ing ${time[1]}.`,
    `${cap(subj.en)}'s routine including ${verb[1]}ing ${time[1]}.`, `${cap(subj.en)}'s routine includes ${correctEn} ${time[1]}.`];
  return addTest(`Choose the correct sentence describing: "${subj.hi} की दिनचर्या में ${time[0]} ${root(verb[0])}${suf.pos} शामिल है।"`, options, 0,
    '"Routine" singular hai, isliye "includes" (not "include") aata hai.', 'Daily Routine', 'easy');
});

test.totalQuestions = test.questions.length;
fs.writeFileSync(TEST_PATH, JSON.stringify(test, null, 2));
console.log('daily-test.json ->', test.questions.length, 'total questions');
const counts = {};
test.questions.forEach((q) => { counts[q.category || 'Uncategorised (legacy)'] = (counts[q.category || 'Uncategorised (legacy)'] || 0) + 1; });
console.log(counts);
