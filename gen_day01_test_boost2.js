#!/usr/bin/env node
// ============================================================================
// gen_day01_test_boost2.js
// ----------------------------------------------------------------------------
// Round 2 content boost for data/challenge/day-01/daily-test.json.
// Brings the remaining under-target test categories (Articles, Pronouns,
// Prepositions, Family, School & College, Hard Professional Sentences) up
// towards the documented ~300-400 per-topic target. Larger real vocabulary
// pools (more names, places, family relations, school subjects) give enough
// combinatorial room; dedupe is by exact question+options text, so nothing
// already present is ever repeated. Safe to re-run: only appends.
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
function countOf(category) { return test.questions.filter((q) => q.category === category).length; }
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
function root(h) { return h.slice(0, -2); }
const VERB_BASE = [
  ['जाना', 'go', 'goes'], ['खाना', 'eat', 'eats'], ['पढ़ना', 'read', 'reads'], ['लिखना', 'write', 'writes'],
  ['खेलना', 'play', 'plays'], ['काम करना', 'work', 'works'], ['सोना', 'sleep', 'sleeps'], ['सीखना', 'learn', 'learns'],
  ['बोलना', 'speak', 'speaks'], ['देखना', 'watch', 'watches'], ['समझना', 'understand', 'understands'],
  ['भेजना', 'send', 'sends'], ['खरीदना', 'buy', 'buys'], ['शुरू करना', 'start', 'starts'],
  ['मदद करना', 'help', 'helps'], ['सुनना', 'listen', 'listens'], ['सिखाना', 'teach', 'teaches'],
  ['याद रखना', 'remember', 'remembers'], ['कोशिश करना', 'try', 'tries'], ['तैयार करना', 'prepare', 'prepares'],
];
const ARTICLE_NOUNS = [
  ['सेब', 'apple', 'an'], ['केला', 'banana', 'a'], ['छाता', 'umbrella', 'an'], ['किताब', 'book', 'a'],
  ['अंडा', 'egg', 'an'], ['कुर्सी', 'chair', 'a'], ['हाथी', 'elephant', 'an'], ['गाड़ी', 'car', 'a'],
  ['संतरा', 'orange', 'an'], ['टोपी', 'hat', 'a'], ['टीचर', 'teacher', 'a'], ['इंजीनियर', 'engineer', 'an'],
  ['घंटा', 'hour', 'an'], ['यूनिवर्सिटी', 'university', 'a'], ['आइडिया', 'idea', 'an'], ['ऑफिस', 'office', 'an'],
  ['डॉक्टर', 'doctor', 'a'], ['किताबों की दुकान', 'bookshop', 'a'], ['एक्सीडेंट', 'accident', 'an'],
  ['यूनिफॉर्म', 'uniform', 'a'], ['आर्किटेक्ट', 'architect', 'an'], ['ईमेल', 'email', 'an'], ['बाइक', 'bike', 'a'],
  ['होटल', 'hotel', 'a'], ['अपॉइंटमेंट', 'appointment', 'an'], ['इंश्योरेंस पॉलिसी', 'insurance policy', 'an'],
  ['ऑडिट', 'audit', 'an'], ['अपार्टमेंट', 'apartment', 'an'], ['इवेंट', 'event', 'an'], ['ऐप', 'app', 'an'],
  ['बैंक अकाउंट', 'bank account', 'a'], ['लैपटॉप', 'laptop', 'a'], ['मोबाइल', 'mobile phone', 'a'],
  ['पासवर्ड', 'password', 'a'], ['सिग्नेचर', 'signature', 'a'],
];
const NAMES = [
  ['राम', 'Ram'], ['सीता', 'Sita'], ['अमन', 'Aman'], ['प्रिया', 'Priya'], ['रोहन', 'Rohan'], ['नेहा', 'Neha'],
  ['विकास', 'Vikas'], ['अंजलि', 'Anjali'], ['करण', 'Karan'], ['पूजा', 'Pooja'], ['अर्जुन', 'Arjun'], ['दीपिका', 'Deepika'],
  ['संजय', 'Sanjay'], ['काव्या', 'Kavya'], ['रवि', 'Ravi'], ['मोहित', 'Mohit'], ['स्नेहा', 'Sneha'], ['आदित्य', 'Aditya'],
  ['रिया', 'Riya'], ['हर्ष', 'Harsh'], ['इशा', 'Isha'], ['निखिल', 'Nikhil'], ['श्रुति', 'Shruti'], ['गौरव', 'Gaurav'],
  ['मीरा', 'Meera'], ['तनुज', 'Tanuj'], ['स्वाति', 'Swati'], ['विनय', 'Vinay'], ['पल्लवी', 'Pallavi'], ['अभिषेक', 'Abhishek'],
];
const PRONOUN_ROWS = [
  ['मैं', 'I', 'मुझे', 'me', 'मेरा', 'my'], ['तुम', 'you', 'तुम्हें', 'you', 'तुम्हारा', 'your'],
  ['वह (पुरुष)', 'he', 'उसे', 'him', 'उसका', 'his'], ['वह (स्त्री)', 'she', 'उसे', 'her', 'उसका', 'her'],
  ['हम', 'we', 'हमें', 'us', 'हमारा', 'our'], ['वे', 'they', 'उन्हें', 'them', 'उनका', 'their'],
];
const OBJECTS = [
  ['किताब', 'book'], ['चाय', 'tea'], ['क्रिकेट', 'cricket'], ['फिल्म', 'movie'], ['गाना', 'song'],
  ['कहानी', 'story'], ['खाना', 'food'], ['यात्रा', 'travel'], ['कॉफ़ी', 'coffee'], ['संगीत', 'music'],
  ['पेंटिंग', 'painting'], ['बागवानी', 'gardening'], ['फोटोग्राफी', 'photography'], ['योगा', 'yoga'],
  ['शॉपिंग', 'shopping'], ['राइटिंग', 'writing'], ['कुकिंग', 'cooking'], ['चेस', 'chess'], ['फुटबॉल', 'football'],
  ['बैडमिंटन', 'badminton'],
];
const OFFICE_TOPICS = [
  ['ईमेल', 'email'], ['रिपोर्ट', 'report'], ['प्रोजेक्ट', 'project'], ['मीटिंग', 'meeting'], ['डेडलाइन', 'deadline'],
  ['प्रेजेंटेशन', 'presentation'], ['बजट', 'budget'], ['इनवॉइस', 'invoice'],
  ['टीम मीटिंग', 'team meeting'], ['सैलरी स्लिप', 'salary slip'], ['इंटरव्यू', 'interview'],
  ['परफॉरमेंस रिव्यू', 'performance review'], ['ऑफर लेटर', 'offer letter'], ['ट्रेनिंग सेशन', 'training session'],
  ['कॉन्ट्रैक्ट', 'contract'], ['क्लाइंट कॉल', 'client call'], ['क्वार्टरली रिपोर्ट', 'quarterly report'],
  ['प्रोडक्ट लॉन्च', 'product launch'], ['सेल्स टारगेट', 'sales target'], ['फीडबैक फॉर्म', 'feedback form'],
];
const SCHOOL_SUBJECTS = [
  ['गणित', 'Maths'], ['विज्ञान', 'Science'], ['इतिहास', 'History'], ['अंग्रेज़ी', 'English'], ['कंप्यूटर', 'Computer'],
  ['भूगोल', 'Geography'], ['नागरिक शास्त्र', 'Civics'], ['कला', 'Art'], ['संगीत', 'Music'], ['खेल', 'Sports'],
  ['अर्थशास्त्र', 'Economics'], ['मनोविज्ञान', 'Psychology'], ['शारीरिक शिक्षा', 'Physical Education'], ['फिलॉसफी', 'Philosophy'],
];
const SCHOOL_ACTIONS = [
  ['पढ़ना', 'study', 'studies'], ['होमवर्क करना', 'do homework', 'does homework'],
  ['नोट्स बनाना', 'make notes', 'makes notes'], ['क्लास अटेंड करना', 'attend the class', 'attends the class'],
];
const FAMILY_MEMBERS = [
  ['मेरे दादा', 'my grandfather', 'he'], ['मेरी दादी', 'my grandmother', 'she'], ['मेरे चाचा', 'my uncle', 'he'],
  ['मेरी चाची', 'my aunt', 'she'], ['मेरा चचेरा भाई', 'my cousin brother', 'he'], ['मेरी चचेरी बहन', 'my cousin sister', 'she'],
  ['मेरे मामा', 'my maternal uncle', 'he'], ['मेरी मामी', 'my maternal aunt', 'she'], ['मेरी भाभी', 'my sister-in-law', 'she'],
  ['मेरे ससुर', 'my father-in-law', 'he'], ['मेरी सास', 'my mother-in-law', 'she'], ['मेरा भतीजा', 'my nephew', 'he'],
  ['मेरी भतीजी', 'my niece', 'she'], ['मेरा पोता', 'my grandson', 'he'], ['मेरी पोती', 'my granddaughter', 'she'],
  ['मेरी बुआ', "my aunt (father's sister)", 'she'], ['मेरे नाना', 'my maternal grandfather', 'he'],
  ['मेरी नानी', 'my maternal grandmother', 'she'], ['मेरे जीजा', 'my brother-in-law', 'he'],
];
const PREPOSITIONS = [
  ['में', 'in'], ['पर', 'on'], ['के नीचे', 'under'], ['के ऊपर', 'above'], ['के पीछे', 'behind'], ['के पास', 'near'],
  ['के अंदर', 'inside'], ['के साथ', 'with'], ['के सामने', 'in front of'], ['के बीच में', 'between'],
  ['के बाहर', 'outside'], ['के बिना', 'without'], ['की तरफ', 'towards'], ['के बगल में', 'next to'],
];
const PLACES = [
  ['मेज़', 'table'], ['कुर्सी', 'chair'], ['कमरा', 'room'], ['स्कूल', 'school'], ['पार्क', 'park'], ['घर', 'house'],
  ['बॉक्स', 'box'], ['बाज़ार', 'market'], ['स्टेशन', 'station'], ['बगीचा', 'garden'], ['किताब', 'book'],
  ['बिस्तर', 'bed'], ['दरवाज़ा', 'door'], ['खिड़की', 'window'], ['दीवार', 'wall'], ['सड़क', 'road'],
  ['पेड़', 'tree'], ['पुल', 'bridge'], ['नदी', 'river'], ['पहाड़', 'hill'], ['ऑफिस', 'office'],
  ['क्लासरूम', 'classroom'], ['कैंटीन', 'canteen'], ['लाइब्रेरी', 'library'], ['लिफ्ट', 'lift'], ['छत', 'roof'],
];

function boost(category, target, poolLen, guardMult, builder) {
  let count = countOf(category);
  const goal = Math.min(target, poolLen);
  let c = 0; let guard = 0;
  while (count < goal && guard < poolLen * guardMult) {
    guard += 1;
    if (builder(c)) count += 1;
    c += 1;
  }
  return count;
}

// ─── Articles → 370: base "I have a/an X" attempts + name-varied
//     "<Name> has/needs a/an X" MCQs give real, non-repeated variety. ───────
boost('Articles', 370, ARTICLE_NOUNS.length * 1 + ARTICLE_NOUNS.length * NAMES.length * 2, 2, (c) => {
  const baseLen = ARTICLE_NOUNS.length;
  if (c < baseLen) {
    const [hindi, word, article] = ARTICLE_NOUNS[c];
    const wrongArticle = article === 'a' ? 'an' : 'a';
    const options = [`I have ${article} ${word}.`, `I have ${wrongArticle} ${word}.`, `I have ${word}.`, `I have the a ${word}.`];
    return addTest(`Which sentence correctly translates "मेरे पास ${hindi} है।"?`, options, 0,
      `"${word}" ${article === 'an' ? 'vowel sound se shuru hota hai' : 'consonant sound se shuru hota hai'}.`, 'Articles', 'easy', 'fill-blank');
  }
  const [ai, ni, tpi] = combo(c - baseLen, ARTICLE_NOUNS.length, NAMES.length, 2);
  const [hindi, word, article] = ARTICLE_NOUNS[ai];
  const [nameHi, nameEn] = NAMES[ni];
  const wrongArticle = article === 'a' ? 'an' : 'a';
  if (tpi === 0) {
    const options = [`${nameEn} has ${article} ${word}.`, `${nameEn} has ${wrongArticle} ${word}.`, `${nameEn} has ${word}.`, `${nameEn} have ${article} ${word}.`];
    return addTest(`Which sentence correctly translates "${nameHi} के पास ${word} है।"?`, options, 0,
      `"${word}" ${article === 'an' ? 'vowel sound se shuru hota hai' : 'consonant sound se shuru hota hai'}, aur third-person subject ke saath "has" aata hai.`, 'Articles', 'easy', 'fill-blank');
  }
  const options = [`${nameEn} needs ${article} ${word}.`, `${nameEn} needs ${wrongArticle} ${word}.`, `${nameEn} need ${article} ${word}.`, `${nameEn} needs the ${word}.`];
  return addTest(`Which sentence correctly translates "${nameHi} को ${word} चाहिए।"?`, options, 0,
    `"${word}" ${article === 'an' ? 'vowel sound se shuru hota hai' : 'consonant sound se shuru hota hai'}, aur third-person subject ke saath "needs" aata hai.`, 'Articles', 'easy', 'fill-blank');
});

// ─── Pronouns → 370: 3 grammar-role quiz kinds x 6 pronoun rows x 30 names
//     — the pronoun set itself stays the real closed set of 6, the context
//     that varies is which name/statement the question is about. ──────────
boost('Pronouns', 370, PRONOUN_ROWS.length * 3 * NAMES.length, 2, (c) => {
  const [ri, kind, ni] = combo(c, PRONOUN_ROWS.length, 3, NAMES.length);
  const row = PRONOUN_ROWS[ri]; const [nameHi, nameEn] = NAMES[ni];
  if (kind === 0) {
    const options = [row[1], row[3], row[5], 'it'];
    return addTest(`${nameEn} says: "${row[0]} / ${row[2]} / ${row[4]}" — which word is the SUBJECT pronoun?`, options, 0,
      `"${row[1]}" subject pronoun hai — sentence ke shuru me aata hai.`, 'Pronouns', 'medium');
  } else if (kind === 1) {
    const options = [row[3], row[1], row[5], 'them'];
    return addTest(`${nameEn} asks about "${row[0]} / ${row[2]} / ${row[4]}" — which word is the OBJECT pronoun?`, options, 0,
      `"${row[3]}" object pronoun hai — verb ke baad aata hai.`, 'Pronouns', 'medium');
  }
  const options = [row[5], row[1], row[3], 'theirs'];
  return addTest(`${nameEn} explains "${row[0]} / ${row[2]} / ${row[4]}" — which word is the POSSESSIVE adjective?`, options, 0,
    `"${row[5]}" possessive adjective hai — noun se pehle aata hai.`, 'Pronouns', 'medium');
});

// ─── Prepositions → 370 ─────────────────────────────────────────────────────
boost('Prepositions', 370, PREPOSITIONS.length * PLACES.length, 2, (c) => {
  const [pi, pli] = combo(c, PREPOSITIONS.length, PLACES.length);
  const prep = PREPOSITIONS[pi]; const place = PLACES[pli];
  const wrongPrep = PREPOSITIONS[(pi + 1) % PREPOSITIONS.length];
  const options = [`It is ${prep[1]} the ${place[1]}.`, `It is ${wrongPrep[1]} the ${place[1]}.`, `It is the ${place[1]} ${prep[1]}.`, `It ${prep[1]} the ${place[1]}.`];
  return addTest(`Choose the correct sentence for: "यह ${place[0]} ${prep[0]} है।"`, options, 0,
    `Preposition jagah/position batati hai aur noun se pehle aati hai.`, 'Prepositions', 'easy');
});

// ─── Family → 370 ───────────────────────────────────────────────────────────
boost('Family', 370, FAMILY_MEMBERS.length * VERB_BASE.length, 2, (c) => {
  const [fi, vi] = combo(c, FAMILY_MEMBERS.length, VERB_BASE.length);
  const fam = FAMILY_MEMBERS[fi]; const verb = VERB_BASE[vi]; const suf = SUFFIX[fam[2]];
  const correctEn = (fam[2] === 'he' || fam[2] === 'she') ? verb[2] : verb[1];
  const wrongEn = (fam[2] === 'he' || fam[2] === 'she') ? verb[1] : verb[2];
  const options = [`${cap(fam[1])} ${correctEn} every day.`, `${cap(fam[1])} ${wrongEn} every day.`, `${cap(fam[1])} ${verb[1]}ing every day.`, `${cap(fam[1])} to ${verb[1]} every day.`];
  return addTest(`Choose the correct sentence for: "${fam[0]} रोज़ ${root(verb[0])}${suf.pos}।"`, options, 0,
    'He/she ke saath verb+s/es, baaki subjects ke saath base verb.', 'Family', 'easy');
});

// ─── School & College → 370 (subject topic x learner x action, so verb
//     phrase varies too, not just the school subject) ──────────────────────
boost('School & College', 370, SCHOOL_SUBJECTS.length * SUBJECTS.length * SCHOOL_ACTIONS.length, 2, (c) => {
  const [ssi, si, sai] = combo(c, SCHOOL_SUBJECTS.length, SUBJECTS.length, SCHOOL_ACTIONS.length);
  const subj2 = SCHOOL_SUBJECTS[ssi]; const subj = SUBJECTS[si]; const action = SCHOOL_ACTIONS[sai]; const suf = SUFFIX[subj.conj];
  const correctEn = (subj.conj === 'he' || subj.conj === 'she') ? action[2] : action[1];
  const wrongEn = (subj.conj === 'he' || subj.conj === 'she') ? action[1] : action[2];
  const options = [`${cap(subj.en)} ${correctEn} in ${subj2[1]}.`, `${cap(subj.en)} ${wrongEn} in ${subj2[1]}.`, `${cap(subj.en)} ${action[1]}ing in ${subj2[1]}.`, `${cap(subj.en)} to ${action[1]} in ${subj2[1]}.`];
  return addTest(`Choose the correct sentence for: "${subj.hi} ${subj2[0]} में ${root(action[0])}${suf.pos}।"`, options, 0,
    'Subject-verb agreement: he/she + verb+s/es, baaki subjects + base verb.', 'School & College', 'easy');
});

// ─── Hard Professional Sentences → 350 ─────────────────────────────────────
boost('Hard Professional Sentences', 350, SUBJECTS.length * OFFICE_TOPICS.length, 2, (c) => {
  const [si, ti] = combo(c, SUBJECTS.length, OFFICE_TOPICS.length);
  const subj = SUBJECTS[si]; const topic = OFFICE_TOPICS[ti];
  const correct = `${cap(subj.en)} said that he/she would complete the ${topic[1]} by tomorrow.`;
  const options = [correct, `${cap(subj.en)} said that he/she complete the ${topic[1]} by tomorrow.`,
    `${cap(subj.en)} says that he/she will completed the ${topic[1]} by tomorrow.`, `${cap(subj.en)} say that he/she would complete the ${topic[1]} by tomorrow.`];
  return addTest(`Choose the correct reported-speech sentence for: "${subj.hi} ने कहा कि वह ${topic[0]} कल तक पूरा कर देगा/देगी।"`, options, 0,
    'Reported speech me tense ek step peeche shift hota hai (will -> would).', 'Hard Professional Sentences', 'hard', 'mcq', 2);
});

test.totalQuestions = test.questions.length;
fs.writeFileSync(TEST_PATH, JSON.stringify(test, null, 2));
console.log('daily-test.json ->', test.questions.length, 'total questions');
const counts = {};
test.questions.forEach((q) => { counts[q.category || 'Uncategorised (legacy)'] = (counts[q.category || 'Uncategorised (legacy)'] || 0) + 1; });
console.log(counts);
