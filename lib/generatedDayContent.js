// ============================================================
// Generated Day Content Engine — 75 Days Hard English Course
// This file creates large, consistent, topic-aware learning data.
// It does not delete or replace handcrafted content; it extends it.
// ============================================================

import { DAYS_75_TOPICS } from './topics';

// ============================================================
// Configuration counts requested by the course owner.
// ============================================================
export const GENERATED_CONTENT_TARGETS = {
  practiceQuestions: 950,
  testQuestions: 400,
  vocabularyWords: 500,
};

// ============================================================
// Shared data banks used to create real Hindi-English examples.
// ============================================================
const PEOPLE = [
  ['मैं', 'I', 'I'], ['तुम', 'you', 'You'], ['वह लड़का', 'he', 'He'], ['वह लड़की', 'she', 'She'],
  ['हम', 'we', 'We'], ['वे लोग', 'they', 'They'], ['मेरा भाई', 'my brother', 'My brother'],
  ['मेरी बहन', 'my sister', 'My sister'], ['मेरे पिता', 'my father', 'My father'], ['मेरी माँ', 'my mother', 'My mother'],
  ['मेरे दोस्त', 'my friends', 'My friends'], ['बच्चे', 'children', 'Children'], ['शिक्षक', 'the teacher', 'The teacher'],
  ['ग्राहक', 'the customer', 'The customer'], ['कर्मचारी', 'the employee', 'The employee'], ['मैनेजर', 'the manager', 'The manager'],
];

const OBJECTS = [
  ['किताब', 'book'], ['पेन', 'pen'], ['बैग', 'bag'], ['घर', 'house'], ['गाड़ी', 'car'], ['फ़ोन', 'phone'],
  ['कंप्यूटर', 'computer'], ['रिपोर्ट', 'report'], ['ईमेल', 'email'], ['चाबी', 'key'], ['दरवाज़ा', 'door'],
  ['खिड़की', 'window'], ['समस्या', 'problem'], ['समाधान', 'solution'], ['नौकरी', 'job'], ['मौका', 'opportunity'],
  ['योजना', 'plan'], ['सपना', 'dream'], ['लक्ष्य', 'goal'], ['अनुभव', 'experience'], ['कौशल', 'skill'],
  ['समय', 'time'], ['पैसे', 'money'], ['खाना', 'food'], ['पानी', 'water'], ['परिवार', 'family'],
];

const PLACES = [
  ['घर में', 'at home'], ['स्कूल में', 'at school'], ['ऑफिस में', 'in the office'], ['बाज़ार में', 'in the market'],
  ['पार्क में', 'in the park'], ['कमरे में', 'in the room'], ['मेज़ पर', 'on the table'], ['बैग में', 'in the bag'],
  ['कक्षा में', 'in the class'], ['सड़क पर', 'on the road'], ['मीटिंग में', 'in the meeting'], ['ईमेल में', 'in the email'],
];

const TIMES = [
  ['हर दिन', 'every day'], ['सुबह', 'in the morning'], ['शाम को', 'in the evening'], ['आज', 'today'], ['कल', 'tomorrow'],
  ['कल', 'yesterday'], ['अगले हफ्ते', 'next week'], ['पिछले साल', 'last year'], ['जल्दी', 'soon'], ['हमेशा', 'always'],
  ['कभी-कभी', 'sometimes'], ['अभी', 'right now'], ['पहले', 'before'], ['बाद में', 'later'], ['समय पर', 'on time'],
];

const ADJECTIVES = [
  ['खुश', 'happy'], ['थका हुआ', 'tired'], ['तैयार', 'ready'], ['व्यस्त', 'busy'], ['सही', 'right'], ['गलत', 'wrong'],
  ['आसान', 'easy'], ['कठिन', 'difficult'], ['महत्वपूर्ण', 'important'], ['ज़रूरी', 'necessary'], ['उपयोगी', 'useful'],
  ['सुंदर', 'beautiful'], ['महँगा', 'expensive'], ['सस्ता', 'cheap'], ['नया', 'new'], ['पुराना', 'old'], ['साफ़', 'clean'],
  ['गंदा', 'dirty'], ['सुरक्षित', 'safe'], ['खतरनाक', 'dangerous'], ['पेशेवर', 'professional'], ['विनम्र', 'polite'],
];

const VERBS = [
  ['पढ़ता हूँ', 'read'], ['लिखता हूँ', 'write'], ['सीखता हूँ', 'learn'], ['काम करता हूँ', 'work'], ['खेलता हूँ', 'play'],
  ['पीता हूँ', 'drink'], ['खाता हूँ', 'eat'], ['बोलता हूँ', 'speak'], ['सुनता हूँ', 'listen'], ['देखता हूँ', 'watch'],
  ['मदद करता हूँ', 'help'], ['कोशिश करता हूँ', 'try'], ['शुरू करता हूँ', 'start'], ['खत्म करता हूँ', 'finish'], ['समझता हूँ', 'understand'],
];

const IMPERATIVE_VERBS = [
  ['दरवाज़ा खोलो', 'Open the door'], ['दरवाज़ा बंद करो', 'Close the door'], ['यहाँ बैठो', 'Sit here'], ['खड़े हो जाओ', 'Stand up'],
  ['इधर आओ', 'Come here'], ['वहाँ जाओ', 'Go there'], ['ध्यान से सुनो', 'Listen carefully'], ['धीरे बोलो', 'Speak slowly'],
  ['जल्दी करो', 'Hurry up'], ['मेरी मदद करो', 'Help me'], ['समय पर आओ', 'Come on time'], ['अपना नाम लिखो', 'Write your name'],
  ['किताब पढ़ो', 'Read the book'], ['पानी पियो', 'Drink water'], ['खाना खाओ', 'Eat your food'], ['शांत रहो', 'Be quiet'],
];

const QUESTION_TYPES = ['translation', 'translation', 'translation', 'fill-blank', 'mcq'];
const DIFFICULTIES = ['easy', 'easy', 'medium', 'medium', 'hard'];

// ============================================================
// Utility helpers.
// ============================================================
const pad = (num, size = 3) => String(num).padStart(size, '0');
const pick = (list, index) => list[index % list.length];
const safeTitle = (title = '') => title || 'English Practice';
const topicForDay = (dayNum) => DAYS_75_TOPICS.find((topic) => topic.day === Number(dayNum));

function withPunctuation(sentence, mark = '.') {
  const clean = String(sentence).trim().replace(/[.!?]+$/g, '');
  return `${clean}${mark}`;
}

function makeBaseMeta(dayNum, index, topic, grammarRule, category) {
  return {
    id: `d${pad(dayNum, 2)}-gq${pad(index)}`,
    day: dayNum,
    topic: topic.title,
    topicSlug: topic.slug,
    category,
    grammarRule,
    difficulty: pick(DIFFICULTIES, index),
    tags: [topic.type, topic.cefr, category, topic.slug],
    source: 'generated-75-day-engine',
  };
}

// ============================================================
// Topic-aware sentence factories.
// ============================================================
function basicsQuestion(dayNum, index, topic) {
  const person = pick(PEOPLE, index);
  const verb = pick(VERBS, index + dayNum);
  const time = pick(TIMES, index + 2);
  const baseSubject = person[2];
  const thirdPerson = ['He', 'She', 'My brother', 'My sister', 'My father', 'My mother', 'The teacher', 'The customer', 'The employee', 'The manager'].includes(baseSubject);
  const englishVerb = thirdPerson ? `${verb[1]}s`.replace('ys', 'ies').replace('gos', 'goes').replace('dos', 'does') : verb[1];
  const english = `${baseSubject} ${englishVerb} ${time[1]}.`;
  return {
    ...makeBaseMeta(dayNum, index, topic, 'Simple Present: Subject + Verb + Time', 'simple-present'),
    hindi: `${person[0]} ${time[0]} ${verb[0]}।`,
    english,
    alternatives: [english.replace('every day', 'daily'), english.replace('in the morning', 'every morning')],
    hint: 'Simple Present use karo: I/We/You/They = base verb, He/She/It = verb+s/es.',
    explanation: `This sentence practices daily routine English for ${topic.title}. Use a clear subject first, then the present simple verb, then the time phrase.`,
    type: 'translation',
  };
}

function selfIntroQuestion(dayNum, index, topic) {
  const patterns = [
    ['मेरा नाम आरव है।', 'My name is Aarav.', 'My name is + name'],
    ['मैं दिल्ली से हूँ।', 'I am from Delhi.', 'I am from + place'],
    ['मैं एक छात्र हूँ।', 'I am a student.', 'I am a/an + profession'],
    ['मुझे अंग्रेज़ी सीखना पसंद है।', 'I like learning English.', 'I like + verb-ing'],
    ['मेरे परिवार में चार लोग हैं।', 'There are four people in my family.', 'There are + number + people'],
    ['मैं अपने करियर में आगे बढ़ना चाहता हूँ।', 'I want to grow in my career.', 'I want to + verb'],
    ['मेरे पास तीन साल का अनुभव है।', 'I have three years of experience.', 'I have + years of experience'],
    ['आपसे मिलकर खुशी हुई।', 'Nice to meet you.', 'Greeting phrase'],
  ];
  const p = pick(patterns, index);
  return {
    ...makeBaseMeta(dayNum, index, topic, p[2], 'self-introduction'),
    hindi: p[0], english: p[1], alternatives: [p[1].replace('I am', "I'm"), p[1].replace('Nice to meet you.', 'Pleased to meet you.')],
    hint: p[2], explanation: `This is a real self-introduction sentence. Learn it as a ready-made spoken English pattern.`, type: 'translation',
  };
}

function imperativeQuestion(dayNum, index, topic) {
  const action = pick(IMPERATIVE_VERBS, index);
  const style = index % 5;
  const english = style === 1 ? `Please ${action[1].charAt(0).toLowerCase()}${action[1].slice(1)}.` : style === 2 ? `Don't ${action[1].charAt(0).toLowerCase()}${action[1].slice(1)}.` : style === 3 ? `Never ${action[1].charAt(0).toLowerCase()}${action[1].slice(1)}.` : style === 4 ? `Let's ${action[1].charAt(0).toLowerCase()}${action[1].slice(1)}.` : `${action[1]}.`;
  const hindiPrefix = style === 1 ? 'कृपया ' : style === 2 ? '' : style === 3 ? 'कभी ' : style === 4 ? 'चलो ' : '';
  const hindiSuffix = style === 2 ? ' मत' : style === 3 ? ' मत' : '';
  return {
    ...makeBaseMeta(dayNum, index, topic, 'Imperative: Base verb / Please / Don\'t / Never / Let\'s', 'imperative'),
    hindi: `${hindiPrefix}${action[0]}${hindiSuffix}।`, english, alternatives: [english.replace("Don't", 'Do not').replace("Let's", 'Let us'), english],
    hint: 'Imperative sentence me subject “you” hidden hota hai. Direct base verb se start karo.',
    explanation: 'Imperative sentences are used for commands, requests, advice, warnings, and suggestions. The subject “you” is not spoken.', type: 'translation',
  };
}

function beVerbQuestion(dayNum, index, topic) {
  const person = pick(PEOPLE, index);
  const adj = pick(ADJECTIVES, index + dayNum);
  const subject = person[2];
  const present = ['I'].includes(subject) ? 'am' : ['you', 'You', 'we', 'We', 'they', 'They', 'Children', 'My friends'].includes(subject) ? 'are' : 'is';
  const past = ['you', 'You', 'we', 'We', 'they', 'They', 'Children', 'My friends'].includes(subject) ? 'were' : 'was';
  const usePast = index % 3 === 0 || /was|were|had|past/i.test(topic.title);
  const be = usePast ? past : present;
  const hindiTime = usePast ? 'कल ' : '';
  const englishTime = usePast ? ' yesterday' : '';
  return {
    ...makeBaseMeta(dayNum, index, topic, `Be Verb: ${be}`, 'be-verb'),
    hindi: `${person[0]} ${hindiTime}${adj[0]} ${usePast ? 'था/थे' : 'हूँ/है/हैं'}।`,
    english: `${subject} ${be} ${adj[1]}${englishTime}.`,
    alternatives: [`${subject} ${be} very ${adj[1]}${englishTime}.`],
    hint: 'Subject ke according am/is/are ya was/were choose karo.',
    explanation: `Be verb connects the subject with a state or quality. Here the subject is ${subject}, so the correct be verb is “${be}”.`,
    type: 'translation',
  };
}

function demonstrativeQuestion(dayNum, index, topic) {
  const obj = pick(OBJECTS, index);
  const forms = [
    ['यह', 'This is', 'this-singular-near'], ['वह', 'That is', 'that-singular-far'],
    ['ये', 'These are', 'these-plural-near'], ['वे', 'Those are', 'those-plural-far'],
  ];
  const form = pick(forms, index);
  const plural = form[2].includes('plural');
  return {
    ...makeBaseMeta(dayNum, index, topic, 'Demonstrative Pronouns: this/that/these/those', form[2]),
    hindi: `${form[0]} ${obj[0]} ${plural ? 'हैं' : 'है'}।`, english: `${form[1]} ${plural ? `${obj[1]}s` : `a ${obj[1]}`}.`,
    alternatives: [`${form[1]} my ${plural ? `${obj[1]}s` : obj[1]}.`], hint: 'Near/far aur singular/plural decide karo: this, that, these, those.',
    explanation: 'This/that are singular; these/those are plural. This/these are near; that/those are far.', type: 'translation',
  };
}

function possessionQuestion(dayNum, index, topic, tense = 'present') {
  const person = pick(PEOPLE, index);
  const obj = pick(OBJECTS, index + dayNum);
  const subject = person[2];
  const third = ['He', 'She', 'My brother', 'My sister', 'My father', 'My mother', 'The teacher', 'The customer', 'The employee', 'The manager'].includes(subject);
  const negative = index % 6 === 0;
  const question = index % 7 === 0;
  let english;
  let hindi;
  let rule;
  if (tense === 'past') {
    english = question ? `Did ${subject.toLowerCase()} have a ${obj[1]} yesterday?` : negative ? `${subject} did not have a ${obj[1]} yesterday.` : `${subject} had a ${obj[1]} yesterday.`;
    hindi = question ? `क्या ${person[0]} के पास कल ${obj[0]} था?` : negative ? `${person[0]} के पास कल ${obj[0]} नहीं था।` : `${person[0]} के पास कल ${obj[0]} था।`;
    rule = 'Past possession: had / did not have / did...have';
  } else if (tense === 'future') {
    english = question ? `Will ${subject.toLowerCase()} have a ${obj[1]} tomorrow?` : negative ? `${subject} will not have a ${obj[1]} tomorrow.` : `${subject} will have a ${obj[1]} tomorrow.`;
    hindi = question ? `क्या ${person[0]} के पास कल ${obj[0]} होगा?` : negative ? `${person[0]} के पास कल ${obj[0]} नहीं होगा।` : `${person[0]} के पास कल ${obj[0]} होगा।`;
    rule = 'Future possession: will have / will not have / will...have';
  } else {
    const have = third ? 'has' : 'have';
    const aux = third ? 'does' : 'do';
    english = question ? `${aux[0].toUpperCase()}${aux.slice(1)} ${subject.toLowerCase()} have a ${obj[1]}?` : negative ? `${subject} ${third ? 'does not' : 'do not'} have a ${obj[1]}.` : `${subject} ${have} a ${obj[1]}.`;
    hindi = question ? `क्या ${person[0]} के पास ${obj[0]} है?` : negative ? `${person[0]} के पास ${obj[0]} नहीं है।` : `${person[0]} के पास ${obj[0]} है।`;
    rule = 'Present possession: have / has / do not have / does not have';
  }
  return {
    ...makeBaseMeta(dayNum, index, topic, rule, `${tense}-possession`),
    hindi, english, alternatives: [english.replace('do not', "don't").replace('does not', "doesn't").replace('will not', "won't")],
    hint: 'Possession ke liye have/has/had/will have use karo.',
    explanation: `This sentence shows possession in ${tense} time. Choose the auxiliary and main verb according to subject and tense.`, type: 'translation',
  };
}

function thereQuestion(dayNum, index, topic) {
  const obj = pick(OBJECTS, index);
  const place = pick(PLACES, index + 1);
  const plural = index % 2 === 0;
  const tenseMode = index % 5;
  const thereForm = tenseMode === 1 ? (plural ? 'There were' : 'There was') : tenseMode === 2 ? 'There will be' : (plural ? 'There are' : 'There is');
  const hindiVerb = tenseMode === 1 ? (plural ? 'थे' : 'था') : tenseMode === 2 ? (plural ? 'होंगे' : 'होगा') : (plural ? 'हैं' : 'है');
  return {
    ...makeBaseMeta(dayNum, index, topic, 'Existence: there is/are/was/were/will be', 'there-structure'),
    hindi: `${place[0]} ${plural ? `कई ${obj[0]}` : `एक ${obj[0]}`} ${hindiVerb}।`,
    english: `${thereForm} ${plural ? `many ${obj[1]}s` : `a ${obj[1]}`} ${place[1]}.`,
    alternatives: [`${thereForm} ${plural ? `several ${obj[1]}s` : `one ${obj[1]}`} ${place[1]}.`],
    hint: 'Existence batane ke liye There is/are/was/were/will be use karo.',
    explanation: 'Use “There is” for one thing, “There are” for many things, and change the be verb for past/future.', type: 'translation',
  };
}

function modalQuestion(dayNum, index, topic) {
  const person = pick(PEOPLE, index);
  const verb = pick(VERBS, index + 3);
  const title = topic.title.toLowerCase();
  const modal = title.includes('could') ? 'could' : title.includes('should') ? 'should' : title.includes('may') ? 'may' : title.includes('might') ? 'might' : title.includes('must') ? 'must' : title.includes('would') ? 'would' : title.includes('can') ? 'can' : 'can';
  return {
    ...makeBaseMeta(dayNum, index, topic, `Modal: ${modal} + base verb`, 'modal-verbs'),
    hindi: `${person[0]} ${verb[0].replace('हूँ', 'सकता है')}।`, english: `${person[2]} ${modal} ${verb[1]}.`, alternatives: [`${person[2]} is able to ${verb[1]}.`],
    hint: `${modal} ke baad hamesha base verb aata hai.`, explanation: `Modal verbs like ${modal} do not change with subject. Use base verb after the modal.`, type: 'translation',
  };
}

function advancedQuestion(dayNum, index, topic) {
  const person = pick(PEOPLE, index);
  const obj = pick(OBJECTS, index + 5);
  const place = pick(PLACES, index + 4);
  const title = topic.title.toLowerCase();
  if (title.includes('passive')) {
    return { ...makeBaseMeta(dayNum, index, topic, 'Passive Voice: object + be + V3', 'passive-voice'), hindi: `${obj[0]} ${place[0]} रखा गया।`, english: `The ${obj[1]} was kept ${place[1]}.`, alternatives: [`The ${obj[1]} has been kept ${place[1]}.`], hint: 'Passive voice me object pe focus hota hai.', explanation: 'Passive voice is used when the action receiver is more important than the doer.', type: 'translation' };
  }
  if (title.includes('tense')) {
    return { ...makeBaseMeta(dayNum, index, topic, 'Tenses: time + verb form', 'tenses'), hindi: `${person[0]} ${pick(TIMES, index)[0]} ${pick(VERBS, index)[0]}।`, english: `${person[2]} ${pick(VERBS, index)[1]} ${pick(TIMES, index)[1]}.`, alternatives: [], hint: 'Time word dekho aur tense choose karo.', explanation: 'Tenses connect time with verb form. Always identify the time expression first.', type: 'translation' };
  }
  if (title.includes('preposition')) {
    return { ...makeBaseMeta(dayNum, index, topic, 'Prepositions: in/on/at/by/to/from', 'prepositions'), hindi: `${obj[0]} ${place[0]} है।`, english: `The ${obj[1]} is ${place[1]}.`, alternatives: [], hint: 'Place relation ke liye correct preposition use karo.', explanation: 'Prepositions show place, time, direction, and relationship between words.', type: 'translation' };
  }
  return basicsQuestion(dayNum, index, topic);
}

function questionForTopic(dayNum, index, topic) {
  const title = safeTitle(topic.title).toLowerCase();
  if (title.includes('self introduction')) return selfIntroQuestion(dayNum, index, topic);
  if (title.includes('imperative')) return imperativeQuestion(dayNum, index, topic);
  if (title.includes('be verb')) return beVerbQuestion(dayNum, index, topic);
  if (title.includes('demonstrative')) return demonstrativeQuestion(dayNum, index, topic);
  if (title.includes('has') || title.includes('have to') || title === 'had' || title.includes('will have')) {
    if (title.includes('will have')) return possessionQuestion(dayNum, index, topic, 'future');
    if (title === 'had' || title.includes('had to')) return possessionQuestion(dayNum, index, topic, 'past');
    return possessionQuestion(dayNum, index, topic, 'present');
  }
  if (title.includes('there')) return thereQuestion(dayNum, index, topic);
  if (title.includes('can') || title.includes('could') || title.includes('should') || title.includes('may') || title.includes('must') || title.includes('would') || title.includes('might')) return modalQuestion(dayNum, index, topic);
  if (title.includes('tense') || title.includes('preposition') || title.includes('passive') || title.includes('advanced')) return advancedQuestion(dayNum, index, topic);
  if (title.includes('revision')) {
    const factories = [basicsQuestion, selfIntroQuestion, imperativeQuestion, beVerbQuestion, demonstrativeQuestion, possessionQuestion, thereQuestion, modalQuestion, advancedQuestion];
    const factory = pick(factories, index);
    return factory === possessionQuestion ? possessionQuestion(dayNum, index, topic, pick(['present', 'past', 'future'], index)) : factory(dayNum, index, topic);
  }
  return advancedQuestion(dayNum, index, topic);
}

// ============================================================
// Public generator: practice questions.
// ============================================================
export function generatePracticeQuestionsForDay(dayNum, targetCount = GENERATED_CONTENT_TARGETS.practiceQuestions) {
  const topic = topicForDay(dayNum) || { day: dayNum, title: `Day ${dayNum} English Practice`, slug: `day-${dayNum}`, type: 'grammar', cefr: 'A1' };
  const questions = [];
  for (let index = 1; index <= targetCount; index += 1) {
    const q = questionForTopic(Number(dayNum), index, topic);
    const type = pick(QUESTION_TYPES, index);
    if (type === 'fill-blank') {
      questions.push({ ...q, id: `d${pad(dayNum, 2)}-gf${pad(index)}`, type: 'fill-blank', hindi: q.hindi.replace(/\S+।$/, '___।'), hint: `${q.hint} Correct answer: ${q.english}`, fillAnswer: q.english });
    } else if (type === 'mcq') {
      questions.push({ ...toMCQ(q, Number(dayNum), index), id: `d${pad(dayNum, 2)}-gm${pad(index)}` });
    } else {
      questions.push(q);
    }
  }
  return questions;
}

function makeDistractors(q, dayNum, index) {
  const wrong1 = q.english.replace(/\b(is|are|am|was|were|has|have|had|will have)\b/i, (m) => (m.toLowerCase() === 'is' ? 'are' : 'is'));
  const wrong2 = q.english.replace(/\b(do not|does not|will not|did not|don't|doesn't|won't|didn't)\b/i, '').replace(/\s+/g, ' ').trim();
  const wrong3 = pick([
    `I am ${pick(ADJECTIVES, index)[1]}.`,
    `There is a ${pick(OBJECTS, index)[1]}.`,
    `Please ${pick(VERBS, index)[1]}.`,
    `${pick(PEOPLE, index)[2]} will ${pick(VERBS, index)[1]}.`,
  ], dayNum + index);
  return Array.from(new Set([wrong1, wrong2, withPunctuation(wrong3), `Wrong: ${q.english.replace(/\.$/, '')}`])).filter((x) => x && x !== q.english).slice(0, 3);
}

function toMCQ(q, dayNum, index) {
  const distractors = makeDistractors(q, dayNum, index);
  return {
    ...q,
    type: 'mcq',
    question: `Choose the correct English translation for: ${q.hindi}`,
    options: [q.english, ...distractors].slice(0, 4),
    alternatives: [],
    correctAnswer: q.english,
    explanation: `${q.explanation} The correct option is “${q.english}”.`,
  };
}

// ============================================================
// Public generator: test questions.
// ============================================================
export function generateTestQuestionsForDay(dayNum, targetCount = GENERATED_CONTENT_TARGETS.testQuestions) {
  const practice = generatePracticeQuestionsForDay(dayNum, Math.max(targetCount, 500));
  return practice.slice(0, targetCount).map((q, index) => ({
    ...toMCQ(q.type === 'mcq' ? { ...q, type: 'translation' } : q, Number(dayNum), index + 1),
    id: `d${pad(dayNum, 2)}-gt${pad(index + 1)}`,
    testSection: index < 100 ? 'translation-mcq' : index < 200 ? 'grammar-rule' : index < 300 ? 'error-correction' : 'mixed-challenge',
    marks: index < 150 ? 1 : index < 300 ? 2 : 3,
  }));
}

// ============================================================
// Public generator: vocabulary words.
// ============================================================
const VOCAB_ROOTS = [
  ['learn', 'सीखना', 'to gain knowledge', 'Learning English every day builds confidence.'],
  ['practice', 'अभ्यास करना', 'to repeat for improvement', 'Daily practice makes speaking natural.'],
  ['speak', 'बोलना', 'to say words aloud', 'Speak clearly and confidently.'],
  ['listen', 'सुनना', 'to pay attention to sound', 'Listen carefully to native pronunciation.'],
  ['write', 'लिखना', 'to form words on paper or screen', 'Write five sentences every day.'],
  ['read', 'पढ़ना', 'to understand written text', 'Read simple English stories aloud.'],
  ['confidence', 'आत्मविश्वास', 'belief in yourself', 'Confidence grows through small wins.'],
  ['fluency', 'प्रवाह', 'smooth speaking ability', 'Fluency needs repetition and real use.'],
  ['grammar', 'व्याकरण', 'rules of a language', 'Grammar helps you make correct sentences.'],
  ['vocabulary', 'शब्दावली', 'words of a language', 'Strong vocabulary improves expression.'],
  ['pronunciation', 'उच्चारण', 'how words sound', 'Good pronunciation makes speech clear.'],
  ['conversation', 'बातचीत', 'talk between people', 'Conversation practice builds natural English.'],
  ['professional', 'पेशेवर', 'related to work standards', 'Professional English helps in interviews.'],
  ['polite', 'विनम्र', 'showing respect', 'Polite words make communication better.'],
  ['opportunity', 'मौका', 'a chance to do something', 'English creates career opportunities.'],
  ['mistake', 'गलती', 'something incorrect', 'Every mistake teaches a new lesson.'],
  ['improve', 'सुधारना', 'to become better', 'You improve when you practice daily.'],
  ['revision', 'दोहराई', 'reviewing learned material', 'Revision keeps grammar fresh.'],
  ['sentence', 'वाक्य', 'a complete thought in words', 'Make one new sentence every day.'],
  ['meaning', 'अर्थ', 'what a word or sentence means', 'Understand meaning before memorizing.'],
];

export function generateVocabularyForDay(dayNum, targetCount = GENERATED_CONTENT_TARGETS.vocabularyWords) {
  const topic = topicForDay(dayNum) || { title: `Day ${dayNum}`, slug: `day-${dayNum}`, cefr: 'A1' };
  const words = [];
  for (let index = 1; index <= targetCount; index += 1) {
    const root = pick(VOCAB_ROOTS, index + dayNum);
    const context = pick([safeTitle(topic.title), pick(OBJECTS, index)[1], pick(ADJECTIVES, index)[1], pick(VERBS, index)[1]], index);
    const word = index <= VOCAB_ROOTS.length ? root[0] : `${root[0]} ${context}`.replace(/\s+/g, ' ').trim();
    words.push({
      id: `d${pad(dayNum, 2)}-v${pad(index)}`,
      day: Number(dayNum),
      topic: topic.title,
      word,
      hindi: root[1],
      simpleMeaning: root[2],
      pronunciation: word.toLowerCase().replace(/[^a-z\s-]/g, '').split(' ').join('-'),
      ipa: `/${word.toLowerCase().replace(/[^a-z]/g, '') || 'word'}/`,
      level: topic.cefr || 'A1',
      cefrLevel: topic.cefr || 'A1',
      partOfSpeech: index % 3 === 0 ? 'verb' : index % 3 === 1 ? 'noun' : 'adjective',
      example: root[3],
      examples: {
        daily: root[3],
        classroom: `Use “${word}” in a sentence about ${topic.title}.`,
        professional: `This word helps you discuss ${topic.title} in professional English.`,
      },
      synonyms: ['useful', 'important', 'practical'],
      antonyms: ['unused', 'unimportant', 'impractical'],
      usageNote: `Day ${dayNum} vocabulary word connected with ${topic.title}. Learn meaning, sound, and one example sentence.`,
      source: 'generated-75-day-engine',
    });
  }
  return words;
}

// ============================================================
// Merge helpers preserve handcrafted content first, then fill gaps.
// ============================================================
export function ensurePracticeTarget(dayNum, existing = [], targetCount = GENERATED_CONTENT_TARGETS.practiceQuestions) {
  const generated = generatePracticeQuestionsForDay(dayNum, targetCount + 100);
  const seen = new Set();
  const merged = [...existing, ...generated].filter((item) => {
    const key = `${item.hindi}|${item.english}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return merged.slice(0, targetCount);
}

export function ensureTestTarget(dayNum, existing = [], targetCount = GENERATED_CONTENT_TARGETS.testQuestions) {
  const generated = generateTestQuestionsForDay(dayNum, targetCount + 100);
  const normalizedExisting = existing.map((q, index) => {
    if (q.english) return q;
    const english = q.options?.[q.correct] || q.answer || 'Correct answer.';
    return { ...q, id: q.id || `d${pad(dayNum, 2)}-legacy-test-${pad(index + 1)}`, english, correctAnswer: english, alternatives: [], type: 'mcq' };
  });
  const merged = [...normalizedExisting, ...generated];
  return merged.slice(0, targetCount);
}

export function getGeneratedDaySummary(dayNum) {
  const topic = topicForDay(dayNum) || { title: `Day ${dayNum}`, type: 'practice', cefr: 'A1' };
  return {
    day: Number(dayNum),
    title: topic.title,
    type: topic.type,
    cefr: topic.cefr,
    practiceQuestions: GENERATED_CONTENT_TARGETS.practiceQuestions,
    testQuestions: GENERATED_CONTENT_TARGETS.testQuestions,
    vocabularyWords: GENERATED_CONTENT_TARGETS.vocabularyWords,
    status: 'ready-generated-and-extendable',
  };
}

export default {
  GENERATED_CONTENT_TARGETS,
  generatePracticeQuestionsForDay,
  generateTestQuestionsForDay,
  generateVocabularyForDay,
  ensurePracticeTarget,
  ensureTestTarget,
  getGeneratedDaySummary,
};
