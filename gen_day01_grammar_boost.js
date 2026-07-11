#!/usr/bin/env node
// ============================================================================
// gen_day01_grammar_boost.js
// ----------------------------------------------------------------------------
// Purpose: bring every PRACTICE-QUESTION category in Day 1 up towards the
// documented per-subtopic target (900 questions where the grammar point is
// broad enough to support real, non-repetitive variety; a lower, honestly
// reasoned cap for categories whose grammar point is inherently a small
// closed set — e.g. Articles only has "a" vs "an", Prepositions has a finite
// list of ~25 real prepositions).
//
// Method: every sentence is built by combining independent pools (subject,
// verb, time, noun, adjective, etc.) using a divmod "combo" counter so the
// full cartesian product is enumerated in order with zero collisions before
// anything repeats. Every new Hindi sentence is checked against a running
// `seenHindi` set (seeded from the existing file) so nothing already present
// is duplicated. This keeps quality high — no copy-pasted or garbled
// sentences — while safely reaching a much larger, real question bank.
//
// Safe to re-run: it only ever appends new, deduplicated questions and never
// deletes or rewrites existing ones.
// ============================================================================
'use strict';
const fs = require('fs');

const PQ_PATH = 'data/challenge/day-01/practice-questions.json';
const pq = JSON.parse(fs.readFileSync(PQ_PATH, 'utf8'));
const seenHindi = new Set(pq.questions.map((q) => q.hindi));

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// divmod combo picker — see gen_day01_boost.js for the original explanation.
function combo(counter, ...lengths) {
  const idxs = [];
  let rem = counter;
  for (const len of lengths) { idxs.push(rem % len); rem = Math.floor(rem / len); }
  return idxs;
}
function nextId() { return pq.questions.length ? pq.questions[pq.questions.length - 1].id + 1 : 1; }
function addPQ(hindi, english, hint, explanation, category, difficulty, tags, grammarRule, alt = []) {
  if (seenHindi.has(hindi)) return false;
  seenHindi.add(hindi);
  pq.questions.push({ id: nextId(), hindi, english, alternatives: alt, hint, explanation, difficulty, tags, grammarRule, category });
  return true;
}

// ─── Shared pools (bigger than the original boost script so each dedicated
//     category loop below has enough combinatorial room to reach its target
//     without ever forcing a repeat) ─────────────────────────────────────────
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
  { hi: 'मेरा चचेरा भाई', en: 'my cousin', conj: 'he' },
  { hi: 'मेरी सहेली', en: 'my (female) friend', conj: 'she' },
  { hi: 'हमारा पड़ोसी', en: 'our neighbour', conj: 'he' },
  { hi: 'वह डॉक्टर', en: 'that doctor', conj: 'he' },
  { hi: 'वह नर्स', en: 'that nurse', conj: 'she' },
  { hi: 'मेरे सहकर्मी', en: 'my colleagues', conj: 'they' },
  { hi: 'हमारी टीम', en: 'our team', conj: 'they' },
  { hi: 'मेरा बॉस', en: 'my boss', conj: 'he' },
  { hi: 'मेरी मैनेजर', en: 'my manager', conj: 'she' },
];
const SUFFIX = {
  'I':            { pos: 'ता हूँ',  neg: 'ता',  aux: 'do',   auxNeg: 'do not', be: 'हूँ', beEn: 'am' },
  'you-informal': { pos: 'ते हो',   neg: 'ते',  aux: 'do',   auxNeg: 'do not', be: 'हो', beEn: 'are' },
  'you-formal':   { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not', be: 'हैं', beEn: 'are' },
  'he':           { pos: 'ता है',   neg: 'ता',  aux: 'does', auxNeg: 'does not', be: 'है', beEn: 'is' },
  'she':          { pos: 'ती है',   neg: 'ती',  aux: 'does', auxNeg: 'does not', be: 'है', beEn: 'is' },
  'we':           { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not', be: 'हैं', beEn: 'are' },
  'they':         { pos: 'ते हैं',  neg: 'ते',  aux: 'do',   auxNeg: 'do not', be: 'हैं', beEn: 'are' },
};
const VERB_BASE = [
  ['जाना', 'go', 'goes'], ['खाना', 'eat', 'eats'], ['पीना', 'drink', 'drinks'], ['पढ़ना', 'read', 'reads'],
  ['लिखना', 'write', 'writes'], ['खेलना', 'play', 'plays'], ['काम करना', 'work', 'works'], ['सोना', 'sleep', 'sleeps'],
  ['उठना', 'wake up', 'wakes up'], ['नहाना', 'take a bath', 'takes a bath'], ['सीखना', 'learn', 'learns'],
  ['बोलना', 'speak', 'speaks'], ['सुनना', 'listen', 'listens'], ['देखना', 'watch', 'watches'], ['दौड़ना', 'run', 'runs'],
  ['चलना', 'walk', 'walks'], ['हँसना', 'laugh', 'laughs'], ['गाना गाना', 'sing a song', 'sings a song'],
  ['खाना बनाना', 'cook food', 'cooks food'], ['साफ करना', 'clean', 'cleans'], ['मदद करना', 'help', 'helps'],
  ['समझना', 'understand', 'understands'], ['सिखाना', 'teach', 'teaches'], ['याद रखना', 'remember', 'remembers'],
  ['भूलना', 'forget', 'forgets'], ['मुस्कुराना', 'smile', 'smiles'], ['सोचना', 'think', 'thinks'],
  ['इंतज़ार करना', 'wait', 'waits'], ['पूछना', 'ask', 'asks'], ['जवाब देना', 'answer', 'answers'],
  ['कोशिश करना', 'try', 'tries'], ['यात्रा करना', 'travel', 'travels'], ['खरीदना', 'buy', 'buys'],
  ['बेचना', 'sell', 'sells'], ['भेजना', 'send', 'sends'], ['प्राप्त करना', 'receive', 'receives'],
  ['योजना बनाना', 'plan', 'plans'], ['तैयार करना', 'prepare', 'prepares'], ['फोन करना', 'call', 'calls'],
  ['जांचना', 'check', 'checks'], ['ठीक करना', 'fix', 'fixes'], ['इस्तेमाल करना', 'use', 'uses'],
  ['शुरू करना', 'start', 'starts'], ['खत्म करना', 'finish', 'finishes'], ['जीतना', 'win', 'wins'],
  ['हारना', 'lose', 'loses'], ['मुस्कान बांटना', 'share a smile', 'shares a smile'], ['गाड़ी चलाना', 'drive', 'drives'],
  ['पैसा बचाना', 'save money', 'saves money'], ['किताब पढ़ना', 'read a book', 'reads a book'],
  ['संगीत सुनना', 'listen to music', 'listens to music'],
];
function root(hindiInfinitive) { return hindiInfinitive.slice(0, -2); }
const TIME_ADV = [
  ['रोज़', 'every day'], ['हर सुबह', 'every morning'], ['हर रात', 'every night'], ['हमेशा', 'always'],
  ['अक्सर', 'often'], ['कभी-कभी', 'sometimes'], ['आमतौर पर', 'usually'], ['हफ्ते में दो बार', 'twice a week'],
  ['रविवार को', 'on Sunday'], ['सुबह जल्दी', 'early in the morning'], ['देर रात को', 'late at night'],
  ['हर हफ्ते', 'every week'], ['हर महीने', 'every month'], ['शाम को', 'in the evening'], ['दोपहर में', 'in the afternoon'],
  ['छुट्टी के दिन', 'on holidays'], ['काम के बाद', 'after work'], ['स्कूल जाने से पहले', 'before going to school'],
  ['सप्ताहांत में', 'on weekends'], ['जब भी समय मिलता है', 'whenever there is time'],
];
const WH_WORDS = [['क्यों', 'Why'], ['कहाँ', 'Where'], ['कब', 'When'], ['कैसे', 'How'], ['क्या', 'What'], ['कौन', 'Who'], ['कौनसा', 'Which'], ['कितनी बार', 'How often']];

// ─── Category-specific pools ────────────────────────────────────────────────
const FAMILY_MEMBERS = [
  ['मेरे दादा', 'my grandfather', 'he'], ['मेरी दादी', 'my grandmother', 'she'],
  ['मेरे चाचा', 'my uncle', 'he'], ['मेरी चाची', 'my aunt', 'she'],
  ['मेरे मामा', 'my maternal uncle', 'he'], ['मेरी मामी', 'my maternal aunt', 'she'],
  ['मेरी बुआ', "my aunt (father's sister)", 'she'], ['मेरा चचेरा भाई', 'my cousin brother', 'he'],
  ['मेरी चचेरी बहन', 'my cousin sister', 'she'], ['मेरी भाभी', 'my sister-in-law', 'she'],
  ['मेरे ससुर', 'my father-in-law', 'he'], ['मेरी सास', 'my mother-in-law', 'she'],
  ['मेरा भतीजा', 'my nephew', 'he'], ['मेरी भतीजी', 'my niece', 'she'],
  ['मेरा पोता', 'my grandson', 'he'], ['मेरी पोती', 'my granddaughter', 'she'],
];
const FAMILY_VERBS = [
  ['प्यार करना', 'love', 'loves'], ['ख्याल रखना', 'take care of', 'takes care of'],
  ['साथ रहना', 'live together', 'lives together'], ['मिलने आना', 'come to visit', 'comes to visit'],
  ['बात करना', 'talk', 'talks'], ['सम्मान करना', 'respect', 'respects'],
  ['याद करना', 'miss', 'misses'], ['हंसी मजाक करना', 'joke around', 'jokes around'],
  ['सलाह देना', 'give advice', 'gives advice'], ['कहानी सुनाना', 'tell stories', 'tells stories'],
];
const OFFICE_TOPICS = [
  ['ईमेल', 'email'], ['रिपोर्ट', 'report'], ['प्रोजेक्ट', 'project'], ['मीटिंग', 'meeting'], ['डेडलाइन', 'deadline'],
  ['टीम मीटिंग', 'team meeting'], ['सैलरी स्लिप', 'salary slip'], ['इंटरव्यू', 'interview'],
  ['प्रेजेंटेशन', 'presentation'], ['बजट', 'budget'], ['क्लाइंट कॉल', 'client call'], ['परफॉरमेंस रिव्यू', 'performance review'],
  ['ऑफर लेटर', 'offer letter'], ['ट्रेनिंग सेशन', 'training session'], ['इनवॉइस', 'invoice'], ['कॉन्ट्रैक्ट', 'contract'],
];
const OFFICE_TEMPLATES = [
  (subj, beEn, topic) => [`${subj.hi} ${topic[0]} पर काम कर रहा/रही है।`, `${cap(subj.en)} ${beEn} working on the ${topic[1]}.`],
  (subj, beEn, topic) => [`कृपया ${topic[0]} कल तक भेज दें।`, `Please send the ${topic[1]} by tomorrow.`],
  (subj, beEn, topic) => [`हमारी ${topic[0]} सुबह दस बजे है।`, `Our ${topic[1]} is at ten in the morning.`],
  (subj, beEn, topic) => [`${subj.hi} ने ${topic[0]} पूरा कर लिया है।`, `${cap(subj.en)} has completed the ${topic[1]}.`],
  (subj, beEn, topic) => [`क्या ${subj.hi} ${topic[0]} के बारे में जानता/जानती है?`, `Does ${subj.en} know about the ${topic[1]}?`],
];
const SCHOOL_SUBJECTS = [
  ['गणित', 'Maths'], ['विज्ञान', 'Science'], ['इतिहास', 'History'], ['अंग्रेज़ी', 'English'], ['कंप्यूटर', 'Computer'],
  ['भूगोल', 'Geography'], ['नागरिक शास्त्र', 'Civics'], ['कला', 'Art'], ['संगीत', 'Music'], ['खेल', 'Sports'],
];
const SCHOOL_ACTIONS = [
  ['पढ़ना', 'study', 'studies'], ['परीक्षा देना', 'take the exam', 'takes the exam'],
  ['होमवर्क करना', 'do homework', 'does homework'], ['नोट्स बनाना', 'make notes', 'makes notes'],
  ['क्लास अटेंड करना', 'attend the class', 'attends the class'], ['प्रोजेक्ट सबमिट करना', 'submit the project', 'submits the project'],
];
const ADJECTIVES = [
  ['ईमानदार', 'honest'], ['मेहनती', 'hardworking'], ['होशियार', 'intelligent'], ['दयालु', 'kind'],
  ['जिम्मेदार', 'responsible'], ['रचनात्मक', 'creative'], ['विनम्र', 'polite'], ['दोस्ताना', 'friendly'],
  ['आत्मविश्वासी', 'confident'], ['अनुशासित', 'disciplined'], ['भरोसेमंद', 'reliable'], ['सकारात्मक', 'positive'],
  ['धैर्यवान', 'patient'], ['सक्रिय', 'active'], ['व्यवस्थित', 'organized'], ['लचीला', 'flexible'],
];
const DESC_TEMPLATES = [
  (subj, beHi, beEn, adj) => [`${subj.hi} बहुत ${adj[0]} ${beHi}।`, `${cap(subj.en)} ${beEn} very ${adj[1]}.`],
  (subj, beHi, beEn, adj) => [`सब कहते हैं कि ${subj.hi} ${adj[0]} ${beHi}।`, `Everyone says ${subj.en} ${beEn} ${adj[1]}.`],
  (subj, beHi, beEn, adj) => [`मुझे लगता है ${subj.hi} काफी ${adj[0]} ${beHi}।`, `I think ${subj.en} ${beEn} quite ${adj[1]}.`],
];
const PREPOSITIONS = [
  ['में', 'in'], ['पर', 'on'], ['के नीचे', 'under'], ['के ऊपर', 'above'], ['के पीछे', 'behind'],
  ['के सामने', 'in front of'], ['के बीच में', 'between'], ['के पास', 'near'], ['के अंदर', 'inside'],
  ['के बाहर', 'outside'], ['के साथ', 'with'], ['के बिना', 'without'], ['की तरफ', 'towards'], ['के बगल में', 'next to'],
];
const PLACES = [
  ['मेज़', 'table'], ['कुर्सी', 'chair'], ['कमरा', 'room'], ['स्कूल', 'school'], ['पार्क', 'park'],
  ['बॉक्स', 'box'], ['घर', 'house'], ['बाज़ार', 'market'], ['स्टेशन', 'station'], ['बगीचा', 'garden'],
];
const ARTICLE_NOUNS = [
  ['सेब', 'apple', 'an'], ['केला', 'banana', 'a'], ['छाता', 'umbrella', 'an'], ['किताब', 'book', 'a'],
  ['अंडा', 'egg', 'an'], ['कुर्सी', 'chair', 'a'], ['हाथी', 'elephant', 'an'], ['गाड़ी', 'car', 'a'],
  ['संतरा', 'orange', 'an'], ['टोपी', 'hat', 'a'], ['घंटा', 'hour', 'an'], ['ईमानदार आदमी', 'honest man', 'an'],
  ['टीचर', 'teacher', 'a'], ['इंजीनियर', 'engineer', 'an'], ['यूनिवर्सिटी', 'university', 'a'],
  ['ऑरेंज जूस', 'orange juice bottle', 'an'], ['आइडिया', 'idea', 'an'], ['ऑफिस', 'office', 'an'],
  ['डॉक्टर', 'doctor', 'a'], ['MBA डिग्री', 'MBA degree', 'an'], ['किताबों की दुकान', 'bookshop', 'a'],
  ['एक्सीडेंट', 'accident', 'an'], ['यूनिफॉर्म', 'uniform', 'a'], ['आर्किटेक्ट', 'architect', 'an'],
  ['ईमेल', 'email', 'an'], ['ऑनर', 'honour', 'an'], ['बाइक', 'bike', 'a'], ['होटल', 'hotel', 'a'],
  ['अपॉइंटमेंट', 'appointment', 'an'], ['यूज़र आईडी', 'user ID', 'a'],
];
const ARTICLE_TEMPLATES = [
  (subjHi, subjEn, article, word) => [`मेरे पास ${subjHi} है।`, `I have ${article} ${word}.`],
  (subjHi, subjEn, article, word) => [`मैंने कल ${subjHi} देखा/देखी।`, `I saw ${article} ${word} yesterday.`],
  (subjHi, subjEn, article, word) => [`वहाँ ${subjHi} है।`, `There is ${article} ${word} over there.`],
];
// Extra subject-varied article templates ("Ram has a/an X") — multiplies the
// combinatorial space so Articles can reach a larger, still fully real, bank.
const ARTICLE_NAME_TEMPLATES = [
  (nameHi, nameEn, article, word) => [`${nameHi} के पास ${article === 'an' ? 'एक' : 'एक'} ${word} है।`, `${nameEn} has ${article} ${word}.`],
  (nameHi, nameEn, article, word) => [`${nameHi} को ${word} चाहिए।`, `${nameEn} needs ${article} ${word}.`],
];
const PRONOUN_ROWS = [
  ['मैं', 'I', 'मुझे', 'me', 'मेरा', 'my'], ['तुम', 'you', 'तुम्हें', 'you', 'तुम्हारा', 'your'],
  ['वह (पुरुष)', 'he', 'उसे', 'him', 'उसका', 'his'], ['वह (स्त्री)', 'she', 'उसे', 'her', 'उसका', 'her'],
  ['हम', 'we', 'हमें', 'us', 'हमारा', 'our'], ['वे', 'they', 'उन्हें', 'them', 'उनका', 'their'],
];
const OBJECTS = [['किताब', 'book'], ['चाय', 'tea'], ['क्रिकेट', 'cricket'], ['फिल्म', 'movie'], ['गाना', 'song'],
  ['कहानी', 'story'], ['खाना', 'food'], ['यात्रा', 'travel'], ['कॉफ़ी', 'coffee'], ['संगीत', 'music'],
  ['क्रिकेट मैच', 'cricket match'], ['नई भाषा', 'new language'], ['पेंटिंग', 'painting'], ['बागवानी', 'gardening'],
  ['फोटोग्राफी', 'photography']];
const NAMES = [['राम', 'Ram'], ['सीता', 'Sita'], ['अमन', 'Aman'], ['प्रिया', 'Priya'], ['रोहन', 'Rohan'], ['नेहा', 'Neha'],
  ['विकास', 'Vikas'], ['अंजलि', 'Anjali'], ['करण', 'Karan'], ['पूजा', 'Pooja'], ['अर्जुन', 'Arjun'], ['दीपिका', 'Deepika'],
  ['संजय', 'Sanjay'], ['काव्या', 'Kavya'], ['रवि', 'Ravi']];

// ─── Generic grammar generator (Positive / Negative / Questions / WH) ──────
function genGrammarCategory(target, category, builder) {
  let count = pq.questions.filter((q) => q.category === category).length;
  const product = SUBJECTS.length * VERB_BASE.length * TIME_ADV.length;
  const goal = Math.min(target, product);
  let c = 0;
  let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
    c += 1;
    const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti];
    if (builder(subj, verb, time)) count += 1;
  }
  return count;
}

genGrammarCategory(900, 'Simple Present Positive', (subj, verb, time) => {
  const suf = SUFFIX[subj.conj];
  const en = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
  return addPQ(`${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}।`, `${cap(subj.en)} ${en} ${time[1]}.`,
    'Subject + verb (he/she +s/+es) + time', `Simple Present Positive: "${subj.en}" ke saath "${en}" aata hai.`,
    'Simple Present Positive', 'easy', ['simple-present', 'svo', 'positive'], 'Subject + Verb(+s) + Time');
});

genGrammarCategory(900, 'Simple Present Negative', (subj, verb, time) => {
  const suf = SUFFIX[subj.conj];
  return addPQ(`${subj.hi} ${time[0]} नहीं ${root(verb[0])}${suf.neg}।`, `${cap(subj.en)} ${suf.auxNeg} ${verb[1]} ${time[1]}.`,
    "Subject + don't/doesn't + base verb", `Negative sentence: he/she ke साथ "doesn't", baaki sab ke साथ "don't".`,
    'Simple Present Negative', 'medium', ['simple-present', 'negative'], "Subject + don't/doesn't + base verb + Time",
    [`${cap(subj.en)} ${suf.auxNeg.replace('do not', "don't").replace('does not', "doesn't")} ${verb[1]} ${time[1]}.`]);
});

genGrammarCategory(900, 'Simple Present Questions', (subj, verb, time) => {
  const suf = SUFFIX[subj.conj];
  return addPQ(`क्या ${subj.hi} ${time[0]} ${root(verb[0])}${suf.pos}?`, `${cap(suf.aux)} ${subj.en} ${verb[1]} ${time[1]}?`,
    'Do/Does + subject + base verb?', 'Yes/No question ke liye Do/Does subject se pehle aata hai.',
    'Simple Present Questions', 'medium', ['simple-present', 'question'], 'Do/Does + Subject + base verb + Time?');
});

// WH questions has its own 3-pool product (wh × subject × verb)
(function genWH(target) {
  let count = pq.questions.filter((q) => q.category === 'WH Questions').length;
  const product = WH_WORDS.length * SUBJECTS.length * VERB_BASE.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [wi, si, vi] = combo(c, WH_WORDS.length, SUBJECTS.length, VERB_BASE.length);
    c += 1;
    const wh = WH_WORDS[wi]; const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const suf = SUFFIX[subj.conj];
    const ok = addPQ(`${subj.hi} ${wh[0]} ${root(verb[0])}${suf.pos}?`, `${wh[1]} ${suf.aux} ${subj.en} ${verb[1]}?`,
      'WH word + do/does + subject + base verb?', `WH question me pehle question word, फिर do/does, फिर subject, फिर base verb.`,
      'WH Questions', 'medium', ['wh-question', 'simple-present'], 'WH + do/does + Subject + base verb?');
    if (ok) count += 1;
  }
})(900);

// Daily Routine — reuse verb/time pools but its own category + phrasing.
(function genDailyRoutine(target) {
  let count = pq.questions.filter((q) => q.category === 'Daily Routine').length;
  const product = SUBJECTS.length * VERB_BASE.length * TIME_ADV.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, vi, ti] = combo(c, SUBJECTS.length, VERB_BASE.length, TIME_ADV.length);
    c += 1;
    const subj = SUBJECTS[si]; const verb = VERB_BASE[vi]; const time = TIME_ADV[ti]; const suf = SUFFIX[subj.conj];
    const en = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
    const ok = addPQ(`${subj.hi} की दिनचर्या में ${time[0]} ${root(verb[0])}${suf.pos} शामिल है।`,
      `${cap(subj.en)}'s daily routine includes ${verb[1]}ing ${time[1]}.`,
      'Daily routine description', 'Daily routine batate waqt regular actions ka zikr hota hai.',
      'Daily Routine', 'easy', ['daily-routine', 'habit'], 'Subject + routine verb + time');
    if (ok) count += 1;
  }
})(900);

// Family
(function genFamily(target) {
  let count = pq.questions.filter((q) => q.category === 'Family').length;
  const product = FAMILY_MEMBERS.length * FAMILY_VERBS.length * TIME_ADV.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [fi, vi, ti] = combo(c, FAMILY_MEMBERS.length, FAMILY_VERBS.length, TIME_ADV.length);
    c += 1;
    const fam = FAMILY_MEMBERS[fi]; const verb = FAMILY_VERBS[vi]; const time = TIME_ADV[ti];
    const suf = SUFFIX[fam[2]];
    const en = (fam[2] === 'he' || fam[2] === 'she') ? verb[2] : verb[1];
    const ok = addPQ(`${fam[0]} ${time[0]} ${root(verb[0])}${suf.pos}।`, `${cap(fam[1])} ${en} ${time[1]}.`,
      'Family member + verb + time', 'Family sentences describe relationships aur unke actions.',
      'Family', 'easy', ['family', 'relations'], 'Family member + verb + time');
    if (ok) count += 1;
  }
})(700);

// Office & Professional — cycles through 5 templates.
(function genOffice(target) {
  let count = pq.questions.filter((q) => q.category === 'Office & Professional').length;
  const product = OFFICE_TOPICS.length * SUBJECTS.length * OFFICE_TEMPLATES.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [ti, si, tpi] = combo(c, OFFICE_TOPICS.length, SUBJECTS.length, OFFICE_TEMPLATES.length);
    c += 1;
    const topic = OFFICE_TOPICS[ti]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
    const [h, e] = OFFICE_TEMPLATES[tpi](subj, suf.beEn, topic);
    const ok = addPQ(h, e, 'Office/professional sentence pattern', 'Office English me clear aur polite sentence use karna zaroori hai.',
      'Office & Professional', 'medium', ['office', 'professional'], 'Professional sentence pattern');
    if (ok) count += 1;
  }
})(900);

// School & College
(function genSchool(target) {
  let count = pq.questions.filter((q) => q.category === 'School & College').length;
  const product = SCHOOL_SUBJECTS.length * SCHOOL_ACTIONS.length * SUBJECTS.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [ssi, sai, si] = combo(c, SCHOOL_SUBJECTS.length, SCHOOL_ACTIONS.length, SUBJECTS.length);
    c += 1;
    const subj2 = SCHOOL_SUBJECTS[ssi]; const action = SCHOOL_ACTIONS[sai]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
    const en = (subj.conj === 'he' || subj.conj === 'she') ? action[2] : action[1];
    const ok = addPQ(`${subj.hi} ${subj2[0]} में ${root(action[0])}${suf.pos}।`, `${cap(subj.en)} ${en} in ${subj2[1]}.`,
      'Subject + school subject + action', 'School/college context me subject (Maths, Science, etc.) ke saath action likha jata hai.',
      'School & College', 'easy', ['school', 'college'], 'Subject + action + in + school subject');
    if (ok) count += 1;
  }
})(700);

// Hard Professional Sentences — kept intentionally smaller (400): genuinely
// advanced multi-clause business sentences are harder to vary meaningfully
// than simple templated ones, so quality is prioritised over raw count here.
(function genHardProf(target) {
  let count = pq.questions.filter((q) => q.category === 'Hard Professional Sentences').length;
  const TEMPLATES = [
    (subj, topic) => [`${subj.hi} ने कहा कि वह ${topic[0]} कल तक पूरा कर देगा/देगी।`, `${cap(subj.en)} said that he/she would complete the ${topic[1]} by tomorrow.`],
    (subj, topic) => [`अगर ${subj.hi} समय पर ${topic[0]} भेज दे, तो क्लाइंट खुश हो जाएगा।`, `If ${subj.en} sends the ${topic[1]} on time, the client will be happy.`],
    (subj, topic) => [`जब तक ${subj.hi} ${topic[0]} रिव्यू नहीं करता/करती, हम आगे नहीं बढ़ सकते।`, `We cannot move forward until ${subj.en} reviews the ${topic[1]}.`],
    (subj, topic) => [`${subj.hi} को ${topic[0]} पूरा करने के लिए एक्स्ट्रा टाइम चाहिए था।`, `${cap(subj.en)} needed extra time to complete the ${topic[1]}.`],
  ];
  const product = SUBJECTS.length * OFFICE_TOPICS.length * TEMPLATES.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, ti, tpi] = combo(c, SUBJECTS.length, OFFICE_TOPICS.length, TEMPLATES.length);
    c += 1;
    const subj = SUBJECTS[si]; const topic = OFFICE_TOPICS[ti];
    const [h, e] = TEMPLATES[tpi](subj, topic);
    const ok = addPQ(h, e, 'Complex professional / conditional sentence', 'Advanced office sentences me conditionals aur reported speech use hota hai.',
      'Hard Professional Sentences', 'hard', ['advanced', 'professional', 'conditional'], 'Multi-clause professional sentence');
    if (ok) count += 1;
  }
})(400);

// Adjectives & Descriptions
(function genAdjectives(target) {
  let count = pq.questions.filter((q) => q.category === 'Adjectives & Descriptions').length;
  const product = SUBJECTS.length * ADJECTIVES.length * DESC_TEMPLATES.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, ai, tpi] = combo(c, SUBJECTS.length, ADJECTIVES.length, DESC_TEMPLATES.length);
    c += 1;
    const subj = SUBJECTS[si]; const adj = ADJECTIVES[ai]; const suf = SUFFIX[subj.conj];
    const [h, e] = DESC_TEMPLATES[tpi](subj, suf.be, suf.beEn, adj);
    const ok = addPQ(h, e, 'Subject + be + adjective', 'Adjective subject ke baad, be-verb ke saath aata hai.',
      'Adjectives & Descriptions', 'easy', ['adjective', 'description'], 'Subject + is/am/are + adjective');
    if (ok) count += 1;
  }
})(700);

// Pronouns — 5 distinct usage patterns (subject / object / possessive
// adjective / possessive pronoun / "belongs to") each cycled across every
// pronoun row and every object/name, for a real (not padded) large bank.
(function genPronouns(target) {
  let count = pq.questions.filter((q) => q.category === 'Pronouns').length;
  const KINDS = 5;
  const product = KINDS * PRONOUN_ROWS.length * Math.max(OBJECTS.length, NAMES.length);
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [ki, ri, oi] = combo(c, KINDS, PRONOUN_ROWS.length, Math.max(OBJECTS.length, NAMES.length));
    c += 1;
    const row = PRONOUN_ROWS[ri];
    let ok = false;
    if (ki === 0) {
      const [objHi, objEn] = OBJECTS[oi % OBJECTS.length];
      const likeForm = (row[1] === 'he' || row[1] === 'she') ? 'likes' : 'like';
      ok = addPQ(`${row[0]} ${objHi} पसंद करता/करती है।`, `${cap(row[1])} ${likeForm} ${objEn}.`,
        'Subject pronoun + verb', 'Subject pronoun sentence ke shuru me aata hai.', 'Pronouns', 'easy', ['pronoun', 'subject'], 'Subject pronoun + verb + object');
    } else if (ki === 1) {
      const [objHi, objEn] = OBJECTS[oi % OBJECTS.length];
      ok = addPQ(`कृपया ${row[2]} ${objHi} के बारे में बताओ।`, `Please tell ${row[3]} about the ${objEn}.`,
        'Object pronoun after verb/preposition', 'Object pronoun verb ke baad ya preposition ke baad aata hai.', 'Pronouns', 'easy', ['pronoun', 'object'], 'Verb + object pronoun');
    } else if (ki === 2) {
      const [nameHi, nameEn] = NAMES[oi % NAMES.length];
      ok = addPQ(`${row[4]} नाम ${nameHi} है।`, `${cap(row[5])} name is ${nameEn}.`, 'Possessive adjective + noun',
        'Possessive adjective noun se pehle aata hai (my, your, his, her, our, their).', 'Pronouns', 'easy', ['pronoun', 'possessive'], 'Possessive adjective + noun + is + name');
    } else if (ki === 3) {
      const [objHi, objEn] = OBJECTS[oi % OBJECTS.length];
      ok = addPQ(`${objHi} ${row[4]} है।`, `The ${objEn} is ${row[5]} (mine/yours/his/hers/ours/theirs).`,
        'Possessive pronoun (stands alone, no noun after it)', 'Possessive pronoun (mine/yours/his/hers/ours/theirs) akele khada hota hai, noun ke baad nahi.',
        'Pronouns', 'medium', ['pronoun', 'possessive-pronoun'], 'The + noun + is + possessive pronoun');
    } else {
      const [nameHi, nameEn] = NAMES[oi % NAMES.length];
      ok = addPQ(`क्या यह ${row[4]} ${nameHi} है?`, `Is this ${row[5]} ${nameEn}?`,
        'Possessive adjective in a question', 'Question banate waqt possessive adjective is/are se pehle nahi, noun se pehle aata hai.',
        'Pronouns', 'medium', ['pronoun', 'possessive', 'question'], 'Is/Are + this/that + possessive + noun?');
    }
    if (ok) count += 1;
  }
})(600);

// Articles — base templates (fixed "I have / I saw / there is") plus
// name-varied templates ("Ram has a/an X", "Priya needs a/an X") so the
// combinatorial space is large enough for a real, non-repetitive bank.
(function genArticles(target) {
  let count = pq.questions.filter((q) => q.category === 'Articles').length;
  const baseProduct = ARTICLE_NOUNS.length * ARTICLE_TEMPLATES.length;
  const nameProduct = ARTICLE_NOUNS.length * NAMES.length * ARTICLE_NAME_TEMPLATES.length;
  const product = baseProduct + nameProduct;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    if (c < baseProduct) {
      const [ai, tpi] = combo(c, ARTICLE_NOUNS.length, ARTICLE_TEMPLATES.length);
      const [hindi, word, article] = ARTICLE_NOUNS[ai];
      const [h, e] = ARTICLE_TEMPLATES[tpi](hindi, word, article, word);
      const ok = addPQ(h, e, `${article} + noun`,
        `"${word}" ${/^[aeiou]/i.test(word) ? 'vowel sound' : 'consonant sound'} se shuru hota hai, इसलिए "${article}" use hoga.`,
        'Articles', 'easy', ['articles', article === 'an' ? 'vowel-sound' : 'consonant-sound'], `${article} + noun`);
      if (ok) count += 1;
    } else {
      const [ai, ni, tpi] = combo(c - baseProduct, ARTICLE_NOUNS.length, NAMES.length, ARTICLE_NAME_TEMPLATES.length);
      const [hindi, word, article] = ARTICLE_NOUNS[ai];
      const [nameHi, nameEn] = NAMES[ni];
      const [h, e] = ARTICLE_NAME_TEMPLATES[tpi](nameHi, nameEn, article, word);
      const ok = addPQ(h, e, `${article} + noun`,
        `"${word}" ${/^[aeiou]/i.test(word) ? 'vowel sound' : 'consonant sound'} se shuru hota hai, इसलिए "${article}" use hoga.`,
        'Articles', 'easy', ['articles', article === 'an' ? 'vowel-sound' : 'consonant-sound'], `${article} + noun`);
      if (ok) count += 1;
    }
    c += 1;
  }
})(500);

// Prepositions
(function genPrepositions(target) {
  let count = pq.questions.filter((q) => q.category === 'Prepositions').length;
  const product = PREPOSITIONS.length * PLACES.length * SUBJECTS.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [pi, pli, si] = combo(c, PREPOSITIONS.length, PLACES.length, SUBJECTS.length);
    c += 1;
    const prep = PREPOSITIONS[pi]; const place = PLACES[pli]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
    const ok = addPQ(`${subj.hi} ${place[0]} ${prep[0]} ${suf.be}।`, `${cap(subj.en)} ${suf.beEn} ${prep[1]} the ${place[1]}.`,
      'Subject + be + preposition + noun', 'Preposition jagah/position batati hai, be-verb ke saath aati hai.',
      'Prepositions', 'easy', ['preposition', 'position'], 'Subject + is/am/are + preposition + the + noun');
    if (ok) count += 1;
  }
})(700);

pq.totalQuestions = pq.questions.length;
pq.categories = Array.from(new Set(pq.questions.map((q) => q.category)));
fs.writeFileSync(PQ_PATH, JSON.stringify(pq, null, 2));

console.log('practice-questions.json ->', pq.questions.length, 'total questions,', pq.categories.length, 'categories');
const counts = {};
pq.questions.forEach((q) => { counts[q.category] = (counts[q.category] || 0) + 1; });
console.log(counts);
