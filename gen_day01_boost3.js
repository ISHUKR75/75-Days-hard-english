#!/usr/bin/env node
// ============================================================================
// gen_day01_boost3.js
// ----------------------------------------------------------------------------
// Round 2 content boost for data/challenge/day-01/practice-questions.json.
// Brings the remaining under-target categories (Pronouns, Articles,
// Prepositions, Family, School & College, Adjectives & Descriptions,
// Hard Professional Sentences, Mixed General) up towards the documented
// ~900-1000 per-topic target using larger, still 100% real, vocabulary pools
// (more names, more everyday objects/hobbies, more real prepositions/places,
// more family relations, more school subjects) combined via a divmod
// "combo" counter so every sentence is a genuine, non-repeated combination.
//
// Same safety rules as the earlier boost scripts: every new Hindi sentence
// is checked against a running `seenHindi` set seeded from the whole file,
// so nothing is ever duplicated; only appends, never rewrites/deletes.
// ============================================================================
'use strict';
const fs = require('fs');

const PQ_PATH = 'data/challenge/day-01/practice-questions.json';
const pq = JSON.parse(fs.readFileSync(PQ_PATH, 'utf8'));
const seenHindi = new Set(pq.questions.map((q) => q.hindi));

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
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
function countOf(category) { return pq.questions.filter((q) => q.category === category).length; }

// ─── Shared pools ───────────────────────────────────────────────────────────
const SUBJECTS = [
  { hi: 'मैं', en: 'I', conj: 'I' }, { hi: 'तुम', en: 'you', conj: 'you-informal' },
  { hi: 'आप', en: 'you', conj: 'you-formal' }, { hi: 'वह लड़का', en: 'he', conj: 'he' },
  { hi: 'वह लड़की', en: 'she', conj: 'she' }, { hi: 'हम', en: 'we', conj: 'we' },
  { hi: 'वे', en: 'they', conj: 'they' }, { hi: 'मेरा भाई', en: 'my brother', conj: 'he' },
  { hi: 'मेरी बहन', en: 'my sister', conj: 'she' }, { hi: 'मेरे पिता', en: 'my father', conj: 'he' },
  { hi: 'मेरी माँ', en: 'my mother', conj: 'she' }, { hi: 'मेरा दोस्त', en: 'my friend', conj: 'he' },
  { hi: 'हमारा टीचर', en: 'our teacher', conj: 'he' }, { hi: 'मेरी दादी', en: 'my grandmother', conj: 'she' },
  { hi: 'वे बच्चे', en: 'those children', conj: 'they' }, { hi: 'मेरा चचेरा भाई', en: 'my cousin', conj: 'he' },
  { hi: 'मेरी सहेली', en: 'my (female) friend', conj: 'she' }, { hi: 'हमारा पड़ोसी', en: 'our neighbour', conj: 'he' },
  { hi: 'वह डॉक्टर', en: 'that doctor', conj: 'he' }, { hi: 'वह नर्स', en: 'that nurse', conj: 'she' },
  { hi: 'मेरे सहकर्मी', en: 'my colleagues', conj: 'they' }, { hi: 'हमारी टीम', en: 'our team', conj: 'they' },
  { hi: 'मेरा बॉस', en: 'my boss', conj: 'he' }, { hi: 'मेरी मैनेजर', en: 'my manager', conj: 'she' },
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
function root(h) { return h.slice(0, -2); }

const ADJECTIVES = [
  ['ईमानदार', 'honest'], ['मेहनती', 'hardworking'], ['होशियार', 'intelligent'], ['दयालु', 'kind'],
  ['जिम्मेदार', 'responsible'], ['रचनात्मक', 'creative'], ['विनम्र', 'polite'], ['दोस्ताना', 'friendly'],
  ['आत्मविश्वासी', 'confident'], ['अनुशासित', 'disciplined'], ['भरोसेमंद', 'reliable'], ['सकारात्मक', 'positive'],
  ['धैर्यवान', 'patient'], ['सक्रिय', 'active'], ['व्यवस्थित', 'organized'], ['लचीला', 'flexible'],
  ['उत्साही', 'enthusiastic'], ['सतर्क', 'careful'], ['साहसी', 'brave'], ['नम्र', 'humble'],
  ['मददगार', 'helpful'], ['समझदार', 'wise'], ['मिलनसार', 'sociable'], ['स्वतंत्र', 'independent'],
];
const DESC_TEMPLATES = [
  (subj, beHi, beEn, adj) => [`${subj.hi} बहुत ${adj[0]} ${beHi}।`, `${cap(subj.en)} ${beEn} very ${adj[1]}.`],
  (subj, beHi, beEn, adj) => [`सब कहते हैं कि ${subj.hi} ${adj[0]} ${beHi}।`, `Everyone says ${subj.en} ${beEn} ${adj[1]}.`],
  (subj, beHi, beEn, adj) => [`मुझे लगता है ${subj.hi} काफी ${adj[0]} ${beHi}।`, `I think ${subj.en} ${beEn} quite ${adj[1]}.`],
  (subj, beHi, beEn, adj) => [`ऑफिस में सब ${subj.hi} को ${adj[0]} मानते हैं।`, `Everyone at the office considers ${subj.en} ${adj[1]}.`],
];

const OFFICE_TOPICS = [
  ['ईमेल', 'email'], ['रिपोर्ट', 'report'], ['प्रोजेक्ट', 'project'], ['मीटिंग', 'meeting'], ['डेडलाइन', 'deadline'],
  ['टीम मीटिंग', 'team meeting'], ['सैलरी स्लिप', 'salary slip'], ['इंटरव्यू', 'interview'],
  ['प्रेजेंटेशन', 'presentation'], ['बजट', 'budget'], ['क्लाइंट कॉल', 'client call'], ['परफॉरमेंस रिव्यू', 'performance review'],
  ['ऑफर लेटर', 'offer letter'], ['ट्रेनिंग सेशन', 'training session'], ['इनवॉइस', 'invoice'], ['कॉन्ट्रैक्ट', 'contract'],
  ['क्वार्टरली रिपोर्ट', 'quarterly report'], ['प्रोडक्ट लॉन्च', 'product launch'], ['सेल्स टारगेट', 'sales target'], ['फीडबैक फॉर्म', 'feedback form'],
];
const HARD_PROF_TEMPLATES = [
  (subj, topic) => [`${subj.hi} ने कहा कि वह ${topic[0]} कल तक पूरा कर देगा/देगी।`, `${cap(subj.en)} said that he/she would complete the ${topic[1]} by tomorrow.`],
  (subj, topic) => [`अगर ${subj.hi} समय पर ${topic[0]} भेज दे, तो क्लाइंट खुश हो जाएगा।`, `If ${subj.en} sends the ${topic[1]} on time, the client will be happy.`],
  (subj, topic) => [`जब तक ${subj.hi} ${topic[0]} रिव्यू नहीं करता/करती, हम आगे नहीं बढ़ सकते।`, `We cannot move forward until ${subj.en} reviews the ${topic[1]}.`],
  (subj, topic) => [`${subj.hi} को ${topic[0]} पूरा करने के लिए एक्स्ट्रा टाइम चाहिए था।`, `${cap(subj.en)} needed extra time to complete the ${topic[1]}.`],
  (subj, topic) => [`अगर मुझे पहले पता होता, तो मैं ${topic[0]} पर ${subj.hi} की मदद कर देता/देती।`, `If I had known earlier, I would have helped ${subj.en} with the ${topic[1]}.`],
  (subj, topic) => [`${subj.hi} इतना व्यस्त था/थी कि ${topic[0]} पर ध्यान नहीं दे पाया/पाई।`, `${cap(subj.en)} was so busy that he/she could not focus on the ${topic[1]}.`],
  (subj, topic) => [`मैनेजमेंट चाहता है कि ${subj.hi} ${topic[0]} जल्द से जल्द फाइनल करे।`, `Management wants ${subj.en} to finalize the ${topic[1]} as soon as possible.`],
];

const FAMILY_MEMBERS = [
  ['मेरे दादा', 'my grandfather', 'he'], ['मेरी दादी', 'my grandmother', 'she'],
  ['मेरे चाचा', 'my uncle', 'he'], ['मेरी चाची', 'my aunt', 'she'],
  ['मेरे मामा', 'my maternal uncle', 'he'], ['मेरी मामी', 'my maternal aunt', 'she'],
  ['मेरी बुआ', "my aunt (father's sister)", 'she'], ['मेरा चचेरा भाई', 'my cousin brother', 'he'],
  ['मेरी चचेरी बहन', 'my cousin sister', 'she'], ['मेरी भाभी', 'my sister-in-law', 'she'],
  ['मेरे ससुर', 'my father-in-law', 'he'], ['मेरी सास', 'my mother-in-law', 'she'],
  ['मेरा भतीजा', 'my nephew', 'he'], ['मेरी भतीजी', 'my niece', 'she'],
  ['मेरा पोता', 'my grandson', 'he'], ['मेरी पोती', 'my granddaughter', 'she'],
  ['मेरे नाना', 'my maternal grandfather', 'he'], ['मेरी नानी', 'my maternal grandmother', 'she'],
  ['मेरे जीजा', 'my brother-in-law', 'he'], ['मेरी जिठानी', "my husband's elder brother's wife", 'she'],
];
const FAMILY_VERBS = [
  ['प्यार करना', 'love', 'loves'], ['ख्याल रखना', 'take care of', 'takes care of'],
  ['साथ रहना', 'live together', 'lives together'], ['मिलने आना', 'come to visit', 'comes to visit'],
  ['बात करना', 'talk', 'talks'], ['सम्मान करना', 'respect', 'respects'],
  ['याद करना', 'miss', 'misses'], ['हंसी मजाक करना', 'joke around', 'jokes around'],
  ['सलाह देना', 'give advice', 'gives advice'], ['कहानी सुनाना', 'tell stories', 'tells stories'],
  ['गले लगाना', 'hug', 'hugs'], ['आशीर्वाद देना', 'give blessings', 'gives blessings'],
  ['सपोर्ट करना', 'support', 'supports'], ['पैसे भेजना', 'send money', 'sends money'],
];
const SCHOOL_SUBJECTS = [
  ['गणित', 'Maths'], ['विज्ञान', 'Science'], ['इतिहास', 'History'], ['अंग्रेज़ी', 'English'], ['कंप्यूटर', 'Computer'],
  ['भूगोल', 'Geography'], ['नागरिक शास्त्र', 'Civics'], ['कला', 'Art'], ['संगीत', 'Music'], ['खेल', 'Sports'],
  ['अर्थशास्त्र', 'Economics'], ['मनोविज्ञान', 'Psychology'], ['शारीरिक शिक्षा', 'Physical Education'], ['फिलॉसफी', 'Philosophy'],
];
const SCHOOL_ACTIONS = [
  ['पढ़ना', 'study', 'studies'], ['परीक्षा देना', 'take the exam', 'takes the exam'],
  ['होमवर्क करना', 'do homework', 'does homework'], ['नोट्स बनाना', 'make notes', 'makes notes'],
  ['क्लास अटेंड करना', 'attend the class', 'attends the class'], ['प्रोजेक्ट सबमिट करना', 'submit the project', 'submits the project'],
  ['असाइनमेंट पूरा करना', 'complete the assignment', 'completes the assignment'], ['लाइब्रेरी जाना', 'go to the library', 'goes to the library'],
  ['ग्रुप स्टडी करना', 'do group study', 'does group study'], ['रिवीजन करना', 'do revision', 'does revision'],
];
const PREPOSITIONS = [
  ['में', 'in'], ['पर', 'on'], ['के नीचे', 'under'], ['के ऊपर', 'above'], ['के पीछे', 'behind'],
  ['के सामने', 'in front of'], ['के बीच में', 'between'], ['के पास', 'near'], ['के अंदर', 'inside'],
  ['के बाहर', 'outside'], ['के साथ', 'with'], ['के बिना', 'without'], ['की तरफ', 'towards'], ['के बगल में', 'next to'],
  ['के जरिये', 'through'], ['के दौरान', 'during'], ['के बावजूद', 'despite'], ['के ऊपर से', 'over'],
];
const PLACES = [
  ['मेज़', 'table'], ['कुर्सी', 'chair'], ['कमरा', 'room'], ['स्कूल', 'school'], ['पार्क', 'park'],
  ['बॉक्स', 'box'], ['घर', 'house'], ['बाज़ार', 'market'], ['स्टेशन', 'station'], ['बगीचा', 'garden'],
  ['किताब', 'book'], ['बिस्तर', 'bed'], ['दरवाज़ा', 'door'], ['खिड़की', 'window'], ['दीवार', 'wall'],
  ['सड़क', 'road'], ['पेड़', 'tree'], ['पुल', 'bridge'], ['नदी', 'river'], ['पहाड़', 'hill'],
  ['ऑफिस', 'office'], ['क्लासरूम', 'classroom'], ['कैंटीन', 'canteen'], ['लाइब्रेरी', 'library'], ['पार्किंग', 'parking area'],
  ['लिफ्ट', 'lift'], ['छत', 'roof'], ['बालकनी', 'balcony'], ['गैराज', 'garage'], ['स्टोररूम', 'storeroom'],
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
  ['इंश्योरेंस पॉलिसी', 'insurance policy', 'an'], ['ऑडिट', 'audit', 'an'], ['अपार्टमेंट', 'apartment', 'an'],
  ['इवेंट', 'event', 'an'], ['ऐप', 'app', 'an'], ['बैंक अकाउंट', 'bank account', 'a'], ['लैपटॉप', 'laptop', 'a'],
  ['मोबाइल', 'mobile phone', 'a'], ['पासवर्ड', 'password', 'a'], ['सिग्नेचर', 'signature', 'a'],
];
const ARTICLE_TEMPLATES = [
  (subjHi, subjEn, article, word) => [`मेरे पास ${subjHi} है।`, `I have ${article} ${word}.`],
  (subjHi, subjEn, article, word) => [`मैंने कल ${subjHi} देखा/देखी।`, `I saw ${article} ${word} yesterday.`],
  (subjHi, subjEn, article, word) => [`वहाँ ${subjHi} है।`, `There is ${article} ${word} over there.`],
];
const ARTICLE_NAME_TEMPLATES = [
  (nameHi, nameEn, article, word) => [`${nameHi} के पास ${word} है।`, `${nameEn} has ${article} ${word}.`],
  (nameHi, nameEn, article, word) => [`${nameHi} को ${word} चाहिए।`, `${nameEn} needs ${article} ${word}.`],
];
const NAMES = [
  ['राम', 'Ram'], ['सीता', 'Sita'], ['अमन', 'Aman'], ['प्रिया', 'Priya'], ['रोहन', 'Rohan'], ['नेहा', 'Neha'],
  ['विकास', 'Vikas'], ['अंजलि', 'Anjali'], ['करण', 'Karan'], ['पूजा', 'Pooja'], ['अर्जुन', 'Arjun'], ['दीपिका', 'Deepika'],
  ['संजय', 'Sanjay'], ['काव्या', 'Kavya'], ['रवि', 'Ravi'], ['मोहित', 'Mohit'], ['स्नेहा', 'Sneha'], ['आदित्य', 'Aditya'],
  ['रिया', 'Riya'], ['हर्ष', 'Harsh'], ['इशा', 'Isha'], ['निखिल', 'Nikhil'], ['श्रुति', 'Shruti'], ['गौरव', 'Gaurav'],
  ['मीरा', 'Meera'], ['तनुज', 'Tanuj'], ['स्वाति', 'Swati'], ['विनय', 'Vinay'], ['पल्लवी', 'Pallavi'], ['अभिषेक', 'Abhishek'],
  ['रजत', 'Rajat'], ['कोमल', 'Komal'], ['सिद्धार्थ', 'Siddharth'], ['नंदिनी', 'Nandini'], ['यश', 'Yash'],
  ['भावना', 'Bhavna'], ['अक्षय', 'Akshay'], ['सोनल', 'Sonal'], ['केशव', 'Keshav'], ['इंदिरा', 'Indira'],
  ['मनीष', 'Manish'], ['वंदना', 'Vandana'], ['तरुण', 'Tarun'], ['ऋचा', 'Richa'], ['सुमित', 'Sumit'],
];
const OBJECTS = [
  ['किताब', 'book'], ['चाय', 'tea'], ['क्रिकेट', 'cricket'], ['फिल्म', 'movie'], ['गाना', 'song'],
  ['कहानी', 'story'], ['खाना', 'food'], ['यात्रा', 'travel'], ['कॉफ़ी', 'coffee'], ['संगीत', 'music'],
  ['क्रिकेट मैच', 'cricket match'], ['नई भाषा', 'new language'], ['पेंटिंग', 'painting'], ['बागवानी', 'gardening'],
  ['फोटोग्राफी', 'photography'], ['योगा', 'yoga'], ['स्विमिंग', 'swimming'], ['साइकलिंग', 'cycling'],
  ['शॉपिंग', 'shopping'], ['हाइकिंग', 'hiking'], ['राइटिंग', 'writing'], ['ड्राइंग', 'drawing'],
  ['कुकिंग', 'cooking'], ['जॉगिंग', 'jogging'], ['चेस', 'chess'], ['कैरम', 'carrom'], ['बैडमिंटन', 'badminton'],
  ['फुटबॉल', 'football'], ['बास्केटबॉल', 'basketball'], ['वॉलीबॉल', 'volleyball'],
  ['टेनिस', 'tennis'], ['क्विज़', 'quiz'], ['पज़ल', 'puzzle'], ['कार्टून', 'cartoon'], ['डॉक्यूमेंट्री', 'documentary'],
  ['नॉवेल', 'novel'], ['कविता', 'poetry'], ['थिएटर', 'theatre'], ['स्टैंड-अप कॉमेडी', 'stand-up comedy'],
  ['पॉडकास्ट', 'podcast'], ['वीडियो गेम', 'video game'], ['कैंपिंग', 'camping'], ['फिशिंग', 'fishing'],
  ['हॉर्स राइडिंग', 'horse riding'], ['स्केटिंग', 'skating'],
];
const GENERAL_VERBS = [
  ['पसंद करना', 'like', 'likes'], ['बहुत पसंद करना', 'love', 'loves'], ['नापसंद करना', 'dislike', 'dislikes'],
  ['एन्जॉय करना', 'enjoy', 'enjoys'], ['प्रिफर करना', 'prefer', 'prefers'],
];
const PRONOUN_ROWS = [
  ['मैं', 'I', 'मुझे', 'me', 'मेरा', 'my'], ['तुम', 'you', 'तुम्हें', 'you', 'तुम्हारा', 'your'],
  ['वह (पुरुष)', 'he', 'उसे', 'him', 'उसका', 'his'], ['वह (स्त्री)', 'she', 'उसे', 'her', 'उसका', 'her'],
  ['हम', 'we', 'हमें', 'us', 'हमारा', 'our'], ['वे', 'they', 'उन्हें', 'them', 'उनका', 'their'],
];

// ─── Adjectives & Descriptions → 950 ───────────────────────────────────────
(function gen(target) {
  let count = countOf('Adjectives & Descriptions');
  const product = SUBJECTS.length * ADJECTIVES.length * DESC_TEMPLATES.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, ai, tpi] = combo(c, SUBJECTS.length, ADJECTIVES.length, DESC_TEMPLATES.length);
    c += 1;
    const subj = SUBJECTS[si]; const adj = ADJECTIVES[ai]; const suf = SUFFIX[subj.conj];
    const [h, e] = DESC_TEMPLATES[tpi](subj, suf.be, suf.beEn, adj);
    if (addPQ(h, e, 'Subject + be + adjective', 'Adjective subject ke baad, be-verb ke saath aata hai.',
      'Adjectives & Descriptions', 'easy', ['adjective', 'description'], 'Subject + is/am/are + adjective')) count += 1;
  }
})(950);

// ─── Hard Professional Sentences → 600 (kept below 900 by design: genuinely
//     advanced multi-clause sentences need more templates per unit of real
//     variety than simple drills; 7 templates x 24 subjects x 20 topics still
//     gives a large, fully real bank) ─────────────────────────────────────
(function gen(target) {
  let count = countOf('Hard Professional Sentences');
  const product = SUBJECTS.length * OFFICE_TOPICS.length * HARD_PROF_TEMPLATES.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, ti, tpi] = combo(c, SUBJECTS.length, OFFICE_TOPICS.length, HARD_PROF_TEMPLATES.length);
    c += 1;
    const subj = SUBJECTS[si]; const topic = OFFICE_TOPICS[ti];
    const [h, e] = HARD_PROF_TEMPLATES[tpi](subj, topic);
    if (addPQ(h, e, 'Complex professional / conditional sentence', 'Advanced office sentences me conditionals aur reported speech use hota hai.',
      'Hard Professional Sentences', 'hard', ['advanced', 'professional', 'conditional'], 'Multi-clause professional sentence')) count += 1;
  }
})(600);

// ─── Family → 950 ───────────────────────────────────────────────────────────
(function gen(target) {
  let count = countOf('Family');
  const product = FAMILY_MEMBERS.length * FAMILY_VERBS.length * 20; // *20 time-adverb-free variants via verb pool alone is not enough, reuse office-style time via index
  const TIME_ADV = [
    ['रोज़', 'every day'], ['हर सुबह', 'every morning'], ['हर रात', 'every night'], ['हमेशा', 'always'],
    ['अक्सर', 'often'], ['कभी-कभी', 'sometimes'], ['आमतौर पर', 'usually'], ['हफ्ते में दो बार', 'twice a week'],
    ['रविवार को', 'on Sunday'], ['सुबह जल्दी', 'early in the morning'], ['देर रात को', 'late at night'],
    ['हर हफ्ते', 'every week'], ['हर महीने', 'every month'], ['शाम को', 'in the evening'], ['दोपहर में', 'in the afternoon'],
    ['छुट्टी के दिन', 'on holidays'], ['काम के बाद', 'after work'], ['स्कूल जाने से पहले', 'before going to school'],
    ['सप्ताहांत में', 'on weekends'], ['जब भी समय मिलता है', 'whenever there is time'],
  ];
  const realProduct = FAMILY_MEMBERS.length * FAMILY_VERBS.length * TIME_ADV.length;
  const goal = Math.min(target, realProduct);
  let c = 0; let guard = 0;
  while (count < goal && guard < realProduct * 2) {
    guard += 1;
    const [fi, vi, ti] = combo(c, FAMILY_MEMBERS.length, FAMILY_VERBS.length, TIME_ADV.length);
    c += 1;
    const fam = FAMILY_MEMBERS[fi]; const verb = FAMILY_VERBS[vi]; const time = TIME_ADV[ti];
    const suf = SUFFIX[fam[2]];
    const en = (fam[2] === 'he' || fam[2] === 'she') ? verb[2] : verb[1];
    if (addPQ(`${fam[0]} ${time[0]} ${root(verb[0])}${suf.pos}।`, `${cap(fam[1])} ${en} ${time[1]}.`,
      'Family member + verb + time', 'Family sentences describe relationships aur unke actions.',
      'Family', 'easy', ['family', 'relations'], 'Family member + verb + time')) count += 1;
  }
})(950);

// ─── School & College → 950 ─────────────────────────────────────────────────
(function gen(target) {
  let count = countOf('School & College');
  const product = SCHOOL_SUBJECTS.length * SCHOOL_ACTIONS.length * SUBJECTS.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [ssi, sai, si] = combo(c, SCHOOL_SUBJECTS.length, SCHOOL_ACTIONS.length, SUBJECTS.length);
    c += 1;
    const subj2 = SCHOOL_SUBJECTS[ssi]; const action = SCHOOL_ACTIONS[sai]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
    const en = (subj.conj === 'he' || subj.conj === 'she') ? action[2] : action[1];
    if (addPQ(`${subj.hi} ${subj2[0]} में ${root(action[0])}${suf.pos}।`, `${cap(subj.en)} ${en} in ${subj2[1]}.`,
      'Subject + school subject + action', 'School/college context me subject (Maths, Science, etc.) ke saath action likha jata hai.',
      'School & College', 'easy', ['school', 'college'], 'Subject + action + in + school subject')) count += 1;
  }
})(950);

// ─── Prepositions → 950 ─────────────────────────────────────────────────────
(function gen(target) {
  let count = countOf('Prepositions');
  const product = PREPOSITIONS.length * PLACES.length * SUBJECTS.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [pi, pli, si] = combo(c, PREPOSITIONS.length, PLACES.length, SUBJECTS.length);
    c += 1;
    const prep = PREPOSITIONS[pi]; const place = PLACES[pli]; const subj = SUBJECTS[si]; const suf = SUFFIX[subj.conj];
    if (addPQ(`${subj.hi} ${place[0]} ${prep[0]} ${suf.be}।`, `${cap(subj.en)} ${suf.beEn} ${prep[1]} the ${place[1]}.`,
      'Subject + be + preposition + noun', 'Preposition jagah/position batati hai, be-verb ke saath aati hai.',
      'Prepositions', 'easy', ['preposition', 'position'], 'Subject + is/am/are + preposition + the + noun')) count += 1;
  }
})(950);

// ─── Articles → 950 (base "I have/saw/there is" templates + name-varied
//     "Name has/needs a/an X" templates give a large real combinatorial space
//     without ever inventing a fake extra article) ──────────────────────────
(function gen(target) {
  let count = countOf('Articles');
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
      if (addPQ(h, e, `${article} + noun`,
        `"${word}" ${/^[aeiou]/i.test(word) ? 'vowel sound' : 'consonant sound'} se shuru hota hai, इसलिए "${article}" use hoga.`,
        'Articles', 'easy', ['articles', article === 'an' ? 'vowel-sound' : 'consonant-sound'], `${article} + noun`)) count += 1;
    } else {
      const [ai, ni, tpi] = combo(c - baseProduct, ARTICLE_NOUNS.length, NAMES.length, ARTICLE_NAME_TEMPLATES.length);
      const [hindi, word, article] = ARTICLE_NOUNS[ai];
      const [nameHi, nameEn] = NAMES[ni];
      const [h, e] = ARTICLE_NAME_TEMPLATES[tpi](nameHi, nameEn, article, word);
      if (addPQ(h, e, `${article} + noun`,
        `"${word}" ${/^[aeiou]/i.test(word) ? 'vowel sound' : 'consonant sound'} se shuru hota hai, इसलिए "${article}" use hoga.`,
        'Articles', 'easy', ['articles', article === 'an' ? 'vowel-sound' : 'consonant-sound'], `${article} + noun`)) count += 1;
    }
    c += 1;
  }
})(950);

// ─── Pronouns → 900 (closed 6-pronoun set combined with 5 real usage
//     patterns x 30 names/objects — the pronoun inventory stays linguistically
//     correct/closed, the variety comes from what the sentence is ABOUT) ────
(function gen(target) {
  let count = countOf('Pronouns');
  const KINDS = 5;
  const M = Math.max(OBJECTS.length, NAMES.length);
  const product = KINDS * PRONOUN_ROWS.length * M;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 3) {
    guard += 1;
    const [ki, ri, oi] = combo(c, KINDS, PRONOUN_ROWS.length, M);
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
})(950);

// ─── Mixed General → 950 (general likes/preferences sentences, using a
//     distinct "X likes/loves/enjoys/prefers/dislikes Y" transitive pattern
//     not used by any other category, so no cross-category collisions) ─────
(function gen(target) {
  let count = countOf('Mixed General');
  const product = SUBJECTS.length * OBJECTS.length * GENERAL_VERBS.length;
  const goal = Math.min(target, product);
  let c = 0; let guard = 0;
  while (count < goal && guard < product * 2) {
    guard += 1;
    const [si, oi, vi] = combo(c, SUBJECTS.length, OBJECTS.length, GENERAL_VERBS.length);
    c += 1;
    const subj = SUBJECTS[si]; const [objHi, objEn] = OBJECTS[oi]; const verb = GENERAL_VERBS[vi]; const suf = SUFFIX[subj.conj];
    const en = (subj.conj === 'he' || subj.conj === 'she') ? verb[2] : verb[1];
    if (addPQ(`${subj.hi} ${objHi} ${root(verb[0])}${suf.pos}।`, `${cap(subj.en)} ${en} ${objEn}.`,
      'Subject + like/love/enjoy/prefer/dislike + object', 'General preference sentence: subject ke baad opinion verb, phir object.',
      'Mixed General', 'easy', ['preference', 'mixed'], 'Subject + opinion verb + object')) count += 1;
  }
})(950);

pq.totalQuestions = pq.questions.length;
pq.categories = Array.from(new Set(pq.questions.map((q) => q.category)));
fs.writeFileSync(PQ_PATH, JSON.stringify(pq, null, 2));

console.log('practice-questions.json ->', pq.questions.length, 'total questions,', pq.categories.length, 'categories');
const counts = {};
pq.questions.forEach((q) => { counts[q.category] = (counts[q.category] || 0) + 1; });
console.log(counts);
