#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

// ── helpers ────────────────────────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── word banks ─────────────────────────────────────────────────────────────
const SUBJECTS = [
  { en: 'I', hi: 'मैं', obj: 'me' },
  { en: 'She', hi: 'वो (लड़की)', obj: 'her' },
  { en: 'He', hi: 'वो (लड़का)', obj: 'him' },
  { en: 'We', hi: 'हम', obj: 'us' },
  { en: 'They', hi: 'वो (plural)', obj: 'them' },
  { en: 'The teacher', hi: 'teacher', obj: 'them' },
  { en: 'My mother', hi: 'मेरी माँ', obj: 'her' },
  { en: 'My father', hi: 'मेरे पिता', obj: 'him' },
  { en: 'My friend', hi: 'मेरा दोस्त', obj: 'him' },
  { en: 'My sister', hi: 'मेरी बहन', obj: 'her' },
];

const OBJ_PRONOUNS = ['me', 'you', 'him', 'her', 'it', 'us', 'them'];

// Template definitions: {hindi, english, tags, difficulty, hint, explanation, grammarRule, category, sectionId}
const templates = [];

// ── TEMPLATE GROUP 1: verb + object pronoun (direct object) ────────────────
const verbObjTemplates = [
  // call
  {
    verbs: [
      { hi: 'मुझे call करो।', en: 'Call me.', obj: 'me', diff: 'easy' },
      { hi: 'उसे (लड़की) call करो।', en: 'Call her.', obj: 'her', diff: 'easy' },
      { hi: 'उसे (लड़के को) call करो।', en: 'Call him.', obj: 'him', diff: 'easy' },
      { hi: 'हमें call करो।', en: 'Call us.', obj: 'us', diff: 'easy' },
      { hi: 'उन्हें call करो।', en: 'Call them.', obj: 'them', diff: 'easy' },
    ],
    hint: 'Imperative + object pronoun',
    explanation: "Imperative sentence mein verb pehle aati hai, phir object pronoun. 'Call me' mein 'me' object hai subject nahi.",
    grammarRule: 'Verb + Object Pronoun (imperative)',
    tags: ['object-pronouns', 'imperative', 'daily-life'],
  },
  // help
  {
    verbs: [
      { hi: 'वो मुझे help करता है।', en: 'He helps me.', obj: 'me', diff: 'easy' },
      { hi: 'वो उसे (लड़की को) help करता है।', en: 'He helps her.', obj: 'her', diff: 'easy' },
      { hi: 'वो उसे (लड़के को) help करता है।', en: 'He helps him.', obj: 'him', diff: 'easy' },
      { hi: 'वो हमें help करता है।', en: 'He helps us.', obj: 'us', diff: 'easy' },
      { hi: 'वो उन्हें help करता है।', en: 'He helps them.', obj: 'them', diff: 'easy' },
      { hi: 'क्या तुम मुझे help करोगे?', en: 'Will you help me?', obj: 'me', diff: 'easy' },
      { hi: 'माँ उसे (बच्चे को) help करती हैं।', en: 'Mother helps him.', obj: 'him', diff: 'easy' },
    ],
    hint: 'Subject + helps/help + object pronoun',
    explanation: "'Help' ke baad object pronoun aata hai — 'me/him/her/us/them'. Subject pronoun ('I/he') kabhi object position mein nahi aata.",
    grammarRule: 'Subject + Verb + Object Pronoun',
    tags: ['object-pronouns', 'daily-life', 'help'],
  },
];

// ── Build a large set of unique practice items ─────────────────────────────
const practiceRaw = [];

// ─── Domain-based sentence patterns ────────────────────────────────────────
const domainTemplates = [
  // DAILY LIFE
  {
    hindi: 'वो मुझे रोज़ message करता है।',
    english: 'He messages me every day.',
    hint: 'He + messages + me',
    explanation: "'Me' object pronoun hai. 'He messages I' galat hai — I kabhi object nahi hota.",
    difficulty: 'easy', tags: ['object-pronouns','daily-life','messaging'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मैं उसे (लड़की को) रोज़ देखती हूँ।',
    english: 'I see her every day.',
    hint: 'I + see + her',
    explanation: "'Her' object pronoun hai — usse verb ke baad use karte hain. 'I see she' bilkul galat hai.",
    difficulty: 'easy', tags: ['object-pronouns','daily-life'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'टीचर हमें homework देते हैं।',
    english: 'The teacher gives us homework.',
    hint: 'gives + us',
    explanation: "'Us' object pronoun hai (we ka object form). 'Gives we' galat hai.",
    difficulty: 'easy', tags: ['object-pronouns','school'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मैंने उसे (लड़के को) किताब दी।',
    english: 'I gave him the book.',
    hint: 'gave + him',
    explanation: "'Him' object pronoun hai (he ka object form). Verb ke baad object pronoun aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','school','books'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'माँ हमें खाना बनाकर देती हैं।',
    english: 'Mother cooks food for us.',
    hint: 'for + us (preposition + object pronoun)',
    explanation: "Preposition 'for' ke baad object pronoun 'us' aata hai, na ki 'we'.",
    difficulty: 'easy', tags: ['object-pronouns','family','food'],
    grammarRule: 'Preposition + Object Pronoun',
  },
  {
    hindi: 'मेरा भाई मुझे station तक छोड़ता है।',
    english: 'My brother drops me at the station.',
    hint: 'drops + me',
    explanation: "'Drops' verb ke baad object pronoun 'me' aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','travel','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'वो उन्हें party में invite करेगा।',
    english: 'He will invite them to the party.',
    hint: 'invite + them',
    explanation: "'Them' they ka object form hai. Verb ke baad aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','social','party'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'क्या तुम उसे (लड़की को) जानते हो?',
    english: 'Do you know her?',
    hint: 'know + her',
    explanation: "'Her' object pronoun hai. Question mein bhi object pronoun hi aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','question','social'],
    grammarRule: 'Do + Subject + Verb + Object Pronoun?',
  },
  {
    hindi: 'मैं इसे (चीज़ को) नहीं समझता।',
    english: "I don't understand it.",
    hint: "don't + understand + it",
    explanation: "'It' non-human/thing ke liye object pronoun hai.",
    difficulty: 'easy', tags: ['object-pronouns','negation'],
    grammarRule: 'Subject + Verb + Object Pronoun (it)',
  },
  {
    hindi: 'Boss ने उसे (लड़की को) promote किया।',
    english: 'The boss promoted her.',
    hint: 'promoted + her',
    explanation: "'Her' object pronoun hai — verb ke baad direct object ke roop mein aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','office','professional'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // FAMILY
  {
    hindi: 'दादी हमें कहानियाँ सुनाती हैं।',
    english: 'Grandmother tells us stories.',
    hint: 'tells + us + stories',
    explanation: "'Us' indirect object hai — 'we' kabhi object position mein nahi aata.",
    difficulty: 'easy', tags: ['object-pronouns','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मेरे पिता मुझे बहुत प्यार करते हैं।',
    english: 'My father loves me very much.',
    hint: 'loves + me',
    explanation: "'Me' = I ka object form. 'Loves I' completely wrong hai.",
    difficulty: 'easy', tags: ['object-pronouns','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मेरी बहन उसे (लड़के को) पसंद करती है।',
    english: 'My sister likes him.',
    hint: 'likes + him',
    explanation: "'Him' object pronoun hai. 'Likes he' galat hai.",
    difficulty: 'easy', tags: ['object-pronouns','family','social'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'बच्चे उन्हें बहुत याद करते हैं।',
    english: 'The children miss them a lot.',
    hint: 'miss + them',
    explanation: "'Them' = they ka object form. Verb ke baad aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'नाना-नानी हमें हर साल मिलने आते हैं।',
    english: 'My grandparents visit us every year.',
    hint: 'visit + us',
    explanation: "'Us' = we ka object form. Preposition ya verb ke baad object pronoun.",
    difficulty: 'medium', tags: ['object-pronouns','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // SCHOOL
  {
    hindi: 'सर हमें science पढ़ाते हैं।',
    english: 'Sir teaches us science.',
    hint: 'teaches + us',
    explanation: "'Teaches' verb ke baad 'us' object pronoun aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','school'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'वो लड़की मुझसे pencil माँग रही है।',
    english: 'That girl is asking me for a pencil.',
    hint: 'asking + me',
    explanation: "'Me' object pronoun — verb 'asking' ke baad direct object hai.",
    difficulty: 'medium', tags: ['object-pronouns','school'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'प्रिंसिपल ने उसे (लड़के को) award दिया।',
    english: 'The principal gave him an award.',
    hint: 'gave + him',
    explanation: "'Him' indirect object pronoun hai — 'gave him' sahi order hai.",
    difficulty: 'easy', tags: ['object-pronouns','school'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Teacher ने उसे (लड़की को) stage पर बुलाया।',
    english: 'The teacher called her to the stage.',
    hint: 'called + her',
    explanation: "'Her' object pronoun. Verb ke baad direct object.",
    difficulty: 'easy', tags: ['object-pronouns','school'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'क्या सर ने तुम्हें marks बता दिए?',
    english: 'Did sir tell you the marks?',
    hint: 'tell + you',
    explanation: "'You' object pronoun — verb ke baad aata hai.",
    difficulty: 'medium', tags: ['object-pronouns','school','question'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // OFFICE / PROFESSIONAL
  {
    hindi: 'Manager ने मुझे एक project assign किया।',
    english: 'The manager assigned me a project.',
    hint: 'assigned + me',
    explanation: "'Me' indirect object. Assign ke baad pehle person aata hai phir thing.",
    difficulty: 'medium', tags: ['object-pronouns','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Client ने उसे (male) एक email भेजा।',
    english: 'The client sent him an email.',
    hint: 'sent + him',
    explanation: "'Him' object pronoun — 'sent he' bilkul wrong hoga.",
    difficulty: 'medium', tags: ['object-pronouns','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'हमें meeting में देर से आने की permission नहीं है।',
    english: 'They do not allow us to come late to the meeting.',
    hint: 'allow + us',
    explanation: "'Us' object pronoun hai — 'allow we' wrong hai.",
    difficulty: 'hard', tags: ['object-pronouns','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Director ने उसे (female) नया role दिया।',
    english: 'The director gave her a new role.',
    hint: 'gave + her',
    explanation: "'Her' object pronoun — verb ke baad direct/indirect object.",
    difficulty: 'medium', tags: ['object-pronouns','office','professional'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Company ने उन्हें bonus दिया।',
    english: 'The company gave them a bonus.',
    hint: 'gave + them',
    explanation: "'Them' = they ka object form. Plural ke liye.",
    difficulty: 'easy', tags: ['object-pronouns','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // TRAVEL
  {
    hindi: 'Driver ने हमें airport drop किया।',
    english: 'The driver dropped us at the airport.',
    hint: 'dropped + us',
    explanation: "'Us' object pronoun — 'we' kabhi yahan nahi aayega.",
    difficulty: 'easy', tags: ['object-pronouns','travel'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Guide ने उन्हें museum दिखाया।',
    english: 'The guide showed them the museum.',
    hint: 'showed + them',
    explanation: "'Them' plural object pronoun. Show verb ke baad pehle person phir thing.",
    difficulty: 'medium', tags: ['object-pronouns','travel'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मैंने उसे (male) train ticket भेजी।',
    english: 'I sent him the train ticket.',
    hint: 'sent + him',
    explanation: "'Him' object pronoun. 'Sent he' galat hai.",
    difficulty: 'easy', tags: ['object-pronouns','travel'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Hotel ने हमें free breakfast दिया।',
    english: 'The hotel gave us free breakfast.',
    hint: 'gave + us',
    explanation: "Preposition ya verb ke baad 'us' aata hai, 'we' nahi.",
    difficulty: 'easy', tags: ['object-pronouns','travel','food'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Captain ने मुझे window seat दी।',
    english: 'The captain gave me the window seat.',
    hint: 'gave + me',
    explanation: "'Me' = I ka object form. Indirect object ke roop mein verb ke baad.",
    difficulty: 'easy', tags: ['object-pronouns','travel'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // FOOD
  {
    hindi: 'Waiter ने हमें menu दिया।',
    english: 'The waiter gave us the menu.',
    hint: 'gave + us',
    explanation: "'Us' object pronoun. Give ke baad indirect object pehle aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','food','restaurant'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'माँ ने उसे (लड़की को) extra मिठाई दी।',
    english: 'Mother gave her extra sweets.',
    hint: 'gave + her',
    explanation: "'Her' object pronoun — 'gave she' bilkul wrong.",
    difficulty: 'easy', tags: ['object-pronouns','food','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Chef ने उन्हें special dish बनाई।',
    english: 'The chef made them a special dish.',
    hint: 'made + them',
    explanation: "'Them' plural object pronoun.",
    difficulty: 'medium', tags: ['object-pronouns','food'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'दोस्त ने मुझे cake खिलाया।',
    english: 'My friend fed me cake.',
    hint: 'fed + me',
    explanation: "'Me' = I ka object form. Feed verb ke baad object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','food','social'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'उसने (male) मुझे अपना tiffin share किया।',
    english: 'He shared his tiffin with me.',
    hint: 'with + me (preposition + object pronoun)',
    explanation: "Preposition 'with' ke baad object pronoun 'me' aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','food','school'],
    grammarRule: 'Preposition + Object Pronoun',
  },
  // HEALTH
  {
    hindi: 'Doctor ने मुझे दवाई दी।',
    english: 'The doctor gave me medicine.',
    hint: 'gave + me',
    explanation: "'Me' object pronoun — verb ke baad direct/indirect object.",
    difficulty: 'easy', tags: ['object-pronouns','health'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Nurse ने उसे (female) injection दिया।',
    english: 'The nurse gave her an injection.',
    hint: 'gave + her',
    explanation: "'Her' object pronoun — 'gave she' galat hai.",
    difficulty: 'easy', tags: ['object-pronouns','health'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'माँ ने हमें cough syrup पिलाई।',
    english: 'Mother gave us cough syrup.',
    hint: 'gave + us',
    explanation: "'Us' = we ka object form.",
    difficulty: 'easy', tags: ['object-pronouns','health','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Doctor ने उन्हें exercise करने को कहा।',
    english: 'The doctor told them to exercise.',
    hint: 'told + them',
    explanation: "'Them' object pronoun. Tell + person + to + verb.",
    difficulty: 'medium', tags: ['object-pronouns','health'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'उसने (male) मुझे अपनी problem बताई।',
    english: 'He told me about his problem.',
    hint: 'told + me',
    explanation: "'Me' object pronoun — tell + person.",
    difficulty: 'medium', tags: ['object-pronouns','health','social'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // TECHNOLOGY
  {
    hindi: 'उसने (female) मुझे app install करने में help की।',
    english: 'She helped me install the app.',
    hint: 'helped + me',
    explanation: "'Me' object pronoun — help + person + verb.",
    difficulty: 'medium', tags: ['object-pronouns','technology'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'IT team ने हमें नया software दिया।',
    english: 'The IT team gave us new software.',
    hint: 'gave + us',
    explanation: "'Us' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','technology','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'उसने (male) मुझे WiFi password बताया।',
    english: 'He told me the WiFi password.',
    hint: 'told + me',
    explanation: "'Me' = I ka object form. Tell + person.",
    difficulty: 'easy', tags: ['object-pronouns','technology'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Company ने उसे (female) laptop दिया।',
    english: 'The company gave her a laptop.',
    hint: 'gave + her',
    explanation: "'Her' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','technology','office'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'App ने मुझे notification भेजी।',
    english: 'The app sent me a notification.',
    hint: 'sent + me',
    explanation: "'Me' object pronoun — sent + person + thing.",
    difficulty: 'easy', tags: ['object-pronouns','technology'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // WEATHER
  {
    hindi: 'बारिश ने हमें घर पर रोक दिया।',
    english: 'The rain kept us at home.',
    hint: 'kept + us',
    explanation: "'Us' = we ka object form.",
    difficulty: 'medium', tags: ['object-pronouns','weather'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'धूप ने मुझे बहुत परेशान किया।',
    english: 'The sun bothered me a lot.',
    hint: 'bothered + me',
    explanation: "'Me' = I ka object form.",
    difficulty: 'easy', tags: ['object-pronouns','weather'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'ठंड ने उसे (male) बीमार कर दिया।',
    english: 'The cold made him sick.',
    hint: 'made + him',
    explanation: "'Him' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','weather','health'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // SHOPPING
  {
    hindi: 'Shopkeeper ने हमें discount दिया।',
    english: 'The shopkeeper gave us a discount.',
    hint: 'gave + us',
    explanation: "'Us' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','shopping'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'उसने (female) मुझे best deal दिखाई।',
    english: 'She showed me the best deal.',
    hint: 'showed + me',
    explanation: "'Me' = I ka object form.",
    difficulty: 'easy', tags: ['object-pronouns','shopping'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'दुकानदार ने उसे (male) गलत सामान दे दिया।',
    english: 'The shopkeeper gave him the wrong item.',
    hint: 'gave + him',
    explanation: "'Him' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','shopping'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'Sale ने उन्हें बहुत attract किया।',
    english: 'The sale attracted them a lot.',
    hint: 'attracted + them',
    explanation: "'Them' plural object pronoun.",
    difficulty: 'medium', tags: ['object-pronouns','shopping'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  // FESTIVALS
  {
    hindi: 'दादी ने हमें Diwali पर gift दिया।',
    english: 'Grandmother gave us a gift on Diwali.',
    hint: 'gave + us',
    explanation: "'Us' object pronoun. Give ke baad person aata hai.",
    difficulty: 'easy', tags: ['object-pronouns','festivals','family'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'मित्रों ने मुझे birthday पर surprise दिया।',
    english: 'Friends gave me a surprise on my birthday.',
    hint: 'gave + me',
    explanation: "'Me' object pronoun.",
    difficulty: 'easy', tags: ['object-pronouns','festivals','social'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'नेता ने उन्हें Eid पर बधाई दी।',
    english: 'The leader congratulated them on Eid.',
    hint: 'congratulated + them',
    explanation: "'Them' object pronoun.",
    difficulty: 'medium', tags: ['object-pronouns','festivals'],
    grammarRule: 'Subject + Verb + Object Pronoun',
  },
  {
    hindi: 'उसने (female) उसे (male) Holi पर रंग लगाया।',
    english: 'She applied color to him on Holi.',
    hint: 'applied color to + him',
    explanation: "Preposition 'to' ke baad object pronoun 'him' aata hai.",
    difficulty: 'medium', tags: ['object-pronouns','festivals'],
    grammarRule: 'Preposition + Object Pronoun',
  },
];

// PREPOSITION + OBJECT PRONOUN patterns (large batch)
const prepObjTemplates = [
  { hindi: 'वो मेरे साथ आया।', english: 'He came with me.', hint: 'with + me', explanation: "Preposition 'with' ke baad object pronoun 'me' aata hai, 'I' nahi.", diff: 'easy', tags: ['object-pronouns','preposition','daily-life'] },
  { hindi: 'यह letter उसके (male) लिए है।', english: 'This letter is for him.', hint: 'for + him', explanation: "Preposition 'for' ke baad 'him' aata hai, 'he' nahi.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'मैं उसके (female) बिना नहीं रह सकता।', english: "I can't live without her.", hint: 'without + her', explanation: "Preposition 'without' ke baad object pronoun 'her' lagta hai.", diff: 'medium', tags: ['object-pronouns','preposition'] },
  { hindi: 'वो हमारे साथ है।', english: 'She is with us.', hint: 'with + us', explanation: "Preposition ke baad 'us' aata hai, 'we' nahi.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'यह उन्हीं के बारे में है।', english: 'This is about them.', hint: 'about + them', explanation: "Preposition 'about' ke baad object pronoun 'them'.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'वो मेरे लिए रुका।', english: 'He waited for me.', hint: 'for + me', explanation: "Preposition 'for' ke baad 'me' aata hai.", diff: 'easy', tags: ['object-pronouns','preposition','daily-life'] },
  { hindi: 'मैं उसके (male) साथ gym जाता हूँ।', english: 'I go to the gym with him.', hint: 'with + him', explanation: "Preposition ke baad object pronoun.", diff: 'easy', tags: ['object-pronouns','preposition','health'] },
  { hindi: 'क्या वो तुम्हारे बिना जाएगा?', english: 'Will he go without you?', hint: 'without + you', explanation: "'You' both subject aur object position mein same form hota hai.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'यह काम उसके (female) लिए मुश्किल है।', english: 'This task is difficult for her.', hint: 'for + her', explanation: "Preposition 'for' ke baad 'her'.", diff: 'easy', tags: ['object-pronouns','preposition','office'] },
  { hindi: 'Manager हमारे साथ meeting करेगा।', english: 'The manager will have a meeting with us.', hint: 'with + us', explanation: "'With us' — preposition ke baad object pronoun.", diff: 'medium', tags: ['object-pronouns','preposition','office'] },
  { hindi: 'मुझसे बात करो।', english: 'Talk to me.', hint: 'to + me', explanation: "Preposition 'to' ke baad 'me' aata hai, 'I' nahi.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'यह problem सिर्फ उनके बारे में नहीं है।', english: 'This problem is not just about them.', hint: 'about + them', explanation: "Preposition 'about' ke baad 'them'.", diff: 'medium', tags: ['object-pronouns','preposition'] },
  { hindi: 'वो मेरे घर के पास रहती है।', english: 'She lives near me.', hint: 'near + me', explanation: "Preposition 'near' ke baad 'me'.", diff: 'easy', tags: ['object-pronouns','preposition','daily-life'] },
  { hindi: 'उसने (male) उसके (female) बिना खाना नहीं खाया।', english: 'He did not eat without her.', hint: 'without + her', explanation: "Preposition ke baad object pronoun.", diff: 'medium', tags: ['object-pronouns','preposition','food'] },
  { hindi: 'वो लोग हमारे खिलाफ नहीं हैं।', english: 'They are not against us.', hint: 'against + us', explanation: "Preposition 'against' ke baad 'us'.", diff: 'medium', tags: ['object-pronouns','preposition'] },
  { hindi: 'यह उसके (female) लिए बहुत खुशी की बात है।', english: 'This is great news for her.', hint: 'for + her', explanation: "Preposition 'for' + object pronoun 'her'.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'वो मुझसे बड़ी है।', english: 'She is older than me.', hint: 'than + me', explanation: "Comparison mein 'than' ke baad object pronoun 'me' aata hai.", diff: 'medium', tags: ['object-pronouns','comparison'] },
  { hindi: 'वो उससे (male) छोटा है।', english: 'He is younger than him.', hint: 'than + him', explanation: "Comparison mein 'than' ke baad object pronoun.", diff: 'medium', tags: ['object-pronouns','comparison','family'] },
  { hindi: 'यह तुम्हारे लिए है।', english: 'This is for you.', hint: 'for + you', explanation: "'You' aane par form same rehta hai.", diff: 'easy', tags: ['object-pronouns','preposition'] },
  { hindi: 'वो मेरे पीछे था।', english: 'He was behind me.', hint: 'behind + me', explanation: "Preposition ke baad object pronoun.", diff: 'easy', tags: ['object-pronouns','preposition'] },
];

// VERB PATTERNS — expanded
const verbPatterns = [
  // ask
  { hindi: 'मैंने उसे (male) एक सवाल पूछा।', english: 'I asked him a question.', hint: 'asked + him', explanation: "'Him' indirect object pronoun. Ask + person + thing.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'वो मुझसे help माँगती है।', english: 'She asks me for help.', hint: 'asks + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','daily-life'] },
  { hindi: 'Teacher ने उसे (female) question पूछा।', english: 'The teacher asked her a question.', hint: 'asked + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  // teach
  { hindi: 'वो हमें Math सिखाता है।', english: 'He teaches us Math.', hint: 'teaches + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'वो उसे (female) guitar सिखा रहा है।', english: 'He is teaching her guitar.', hint: 'teaching + her', explanation: "'Her' object pronoun — continuous tense mein bhi same rule.", diff: 'medium', tags: ['object-pronouns','music','school'] },
  { hindi: 'क्या तुम मुझे swim करना सिखाओगे?', english: 'Will you teach me to swim?', hint: 'teach + me', explanation: "'Me' = I ka object form. Teach + person + to + verb.", diff: 'medium', tags: ['object-pronouns','sports'] },
  // show
  { hindi: 'उसने (female) मुझे अपनी photo दिखाई।', english: 'She showed me her photo.', hint: 'showed + me', explanation: "'Me' indirect object.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'Guide ने हमें रास्ता दिखाया।', english: 'The guide showed us the way.', hint: 'showed + us', explanation: "'Us' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','travel'] },
  { hindi: 'मैंने उन्हें project दिखाया।', english: 'I showed them the project.', hint: 'showed + them', explanation: "'Them' object pronoun.", diff: 'easy', tags: ['object-pronouns','office'] },
  // remind
  { hindi: 'उसने (female) मुझे meeting याद दिलाई।', english: 'She reminded me about the meeting.', hint: 'reminded + me', explanation: "'Me' object pronoun.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'कृपया उसे (male) yaad दिलाओ।', english: 'Please remind him.', hint: 'remind + him', explanation: "'Him' object pronoun. Imperative mein bhi same rule.", diff: 'easy', tags: ['object-pronouns','office'] },
  // invite
  { hindi: 'मैंने उसे (female) party में invite किया।', english: 'I invited her to the party.', hint: 'invited + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'उन्होंने हमें dinner पर invite किया।', english: 'They invited us to dinner.', hint: 'invited + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','social','food'] },
  // love / like
  { hindi: 'हम उसे (male) बहुत respect करते हैं।', english: 'We respect him a lot.', hint: 'respect + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'बच्चे उसे (teacher को) बहुत पसंद करते हैं।', english: 'The children like her very much.', hint: 'like + her', explanation: "'Her' object pronoun — verb ke baad.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'सभी उन्हें पसंद करते हैं।', english: 'Everyone likes them.', hint: 'likes + them', explanation: "'Them' = they ka object form.", diff: 'easy', tags: ['object-pronouns','social'] },
  // meet
  { hindi: 'मैं उसे (female) कल मिला।', english: 'I met her yesterday.', hint: 'met + her', explanation: "'Her' object pronoun — past tense mein bhi same rule.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'वो मुझे office में मिला।', english: 'He met me at the office.', hint: 'met + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','office'] },
  // support
  { hindi: 'हम उन्हें हमेशा support करते हैं।', english: 'We always support them.', hint: 'support + them', explanation: "'Them' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'परिवार ने हमें बहुत support किया।', english: 'The family supported us a lot.', hint: 'supported + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','family'] },
  // contact
  { hindi: 'कृपया मुझसे contact करो।', english: 'Please contact me.', hint: 'contact + me', explanation: "'Me' object pronoun imperative mein.", diff: 'easy', tags: ['object-pronouns','professional'] },
  { hindi: 'मैं उसे (male) baad में contact करूँगा।', english: 'I will contact him later.', hint: 'contact + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','professional'] },
  // follow
  { hindi: 'सब उसे (female) social media पर follow करते हैं।', english: 'Everyone follows her on social media.', hint: 'follows + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','technology','social'] },
  { hindi: 'क्या तुम उन्हें follow करते हो?', english: 'Do you follow them?', hint: 'follow + them', explanation: "'Them' object pronoun — question mein bhi same.", diff: 'easy', tags: ['object-pronouns','technology'] },
  // join
  { hindi: 'उसने (female) हमें team में join किया।', english: 'She joined us on the team.', hint: 'joined + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','office','sports'] },
  { hindi: 'कृपया हमसे join हो जाओ।', english: 'Please join us.', hint: 'join + us', explanation: "'Us' object pronoun imperative mein.", diff: 'easy', tags: ['object-pronouns','social'] },
  // blame
  { hindi: 'उन्होंने मुझे blame किया।', english: 'They blamed me.', hint: 'blamed + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','office'] },
  { hindi: 'मत उसे (male) blame करो।', english: "Don't blame him.", hint: "Don't + blame + him", explanation: "'Him' object pronoun — negative imperative mein bhi same.", diff: 'easy', tags: ['object-pronouns','daily-life'] },
  // trust
  { hindi: 'मैं उस पर (female) trust करता हूँ।', english: 'I trust her.', hint: 'trust + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'क्या वो मुझ पर trust करता है?', english: 'Does he trust me?', hint: 'trust + me', explanation: "'Me' object pronoun — question mein bhi same.", diff: 'easy', tags: ['object-pronouns','social'] },
  // protect
  { hindi: 'वो हमें हर situation में protect करता है।', english: 'He protects us in every situation.', hint: 'protects + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','family'] },
  { hindi: 'भगवान हम सबको protect करे।', english: 'May God protect us all.', hint: 'protect + us', explanation: "'Us' object pronoun in prayer/wish sentences too.", diff: 'medium', tags: ['object-pronouns','festivals'] },
  // encourage
  { hindi: 'Teacher ने उसे (male) बहुत encourage किया।', english: 'The teacher encouraged him a lot.', hint: 'encouraged + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'माँ हमें हमेशा encourage करती हैं।', english: 'Mother always encourages us.', hint: 'encourages + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','family'] },
  // inform
  { hindi: 'कृपया उन्हें जल्दी inform करो।', english: 'Please inform them quickly.', hint: 'inform + them', explanation: "'Them' object pronoun.", diff: 'easy', tags: ['object-pronouns','office'] },
  { hindi: 'उसने (female) मुझे सारी बात inform की।', english: 'She informed me about everything.', hint: 'informed + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','office'] },
  // forgive
  { hindi: 'कृपया मुझे माफ करो।', english: 'Please forgive me.', hint: 'forgive + me', explanation: "'Me' object pronoun imperative mein.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'मैं उसे (male) माफ कर दूँगा।', english: 'I will forgive him.', hint: 'will forgive + him', explanation: "'Him' = he ka object form.", diff: 'easy', tags: ['object-pronouns','social'] },
  // punish
  { hindi: 'Teacher ने उसे (female) punish किया।', english: 'The teacher punished her.', hint: 'punished + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'Principal ने हमें punish किया।', english: 'The principal punished us.', hint: 'punished + us', explanation: "'Us' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  // surprise
  { hindi: 'उसने (female) मुझे surprise किया।', english: 'She surprised me.', hint: 'surprised + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'उनका जवाब हमें surprise कर गया।', english: 'Their answer surprised us.', hint: 'surprised + us', explanation: "'Us' object pronoun.", diff: 'medium', tags: ['object-pronouns','school','office'] },
  // recognize
  { hindi: 'उसने (male) मुझे पहचाना नहीं।', english: "He didn't recognize me.", hint: "didn't + recognize + me", explanation: "'Me' object pronoun — past negative mein bhi same.", diff: 'medium', tags: ['object-pronouns','daily-life'] },
  { hindi: 'मैंने उसे (female) तुरंत पहचाना।', english: 'I recognized her immediately.', hint: 'recognized + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','daily-life'] },
  // watch / see
  { hindi: 'मैंने उसे (male) office में देखा।', english: 'I saw him at the office.', hint: 'saw + him', explanation: "'Him' = he ka object form.", diff: 'easy', tags: ['object-pronouns','office'] },
  { hindi: 'वो हमें देख रहा था।', english: 'He was watching us.', hint: 'watching + us', explanation: "'Us' object pronoun — continuous tense mein bhi same.", diff: 'medium', tags: ['object-pronouns','daily-life'] },
  // carry / bring
  { hindi: 'वो हमारे लिए खाना लाया।', english: 'He brought food for us.', hint: 'brought...for + us', explanation: "Preposition 'for' ke baad 'us'.", diff: 'easy', tags: ['object-pronouns','food'] },
  { hindi: 'माँ ने उसे (male) school bag दी।', english: 'Mother gave him a school bag.', hint: 'gave + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','school','family'] },
  // negative sentences
  { hindi: 'वो मुझे ignore नहीं करता।', english: "He doesn't ignore me.", hint: "doesn't + ignore + me", explanation: "'Me' object pronoun — negative sentence mein bhi verb ke baad.", diff: 'easy', tags: ['object-pronouns','negation'] },
  { hindi: 'मैं उसे (female) nahi जानता।', english: "I don't know her.", hint: "don't + know + her", explanation: "'Her' = she ka object form.", diff: 'easy', tags: ['object-pronouns','negation'] },
  { hindi: 'वो उन्हें कभी miss नहीं करती।', english: 'She never misses them.', hint: 'never + misses + them', explanation: "'Them' object pronoun.", diff: 'easy', tags: ['object-pronouns','negation'] },
  // compound with and/but/because
  { hindi: 'वो मुझे जानता है लेकिन मुझसे बात नहीं करता।', english: "He knows me but doesn't talk to me.", hint: 'knows + me ... to + me', explanation: "Compound sentence mein bhi object pronouns same rahte hain.", diff: 'hard', tags: ['object-pronouns','compound'] },
  { hindi: 'मैंने उसे (female) बुलाया क्योंकि मुझे उसकी ज़रूरत थी।', english: 'I called her because I needed her.', hint: 'called + her ... needed + her', explanation: "Because clause mein bhi object pronoun.", diff: 'hard', tags: ['object-pronouns','compound'] },
  { hindi: 'वो हमें help करता है और हम उसे (male) respect करते हैं।', english: 'He helps us and we respect him.', hint: 'helps + us ... respect + him', explanation: "And se joined sentences mein dono mein object pronouns sahi hone chahiye.", diff: 'hard', tags: ['object-pronouns','compound'] },
  { hindi: 'Teacher ने उसे (male) और उसे (female) दोनों को award दिया।', english: 'The teacher gave both him and her an award.', hint: 'gave + him + and + her', explanation: "Both ke baad bhi object pronouns: him/her, na he/she.", diff: 'hard', tags: ['object-pronouns','compound','school'] },
  { hindi: 'वो मुझसे मिला और मुझे gift दिया।', english: 'He met me and gave me a gift.', hint: 'met + me ... gave + me', explanation: "Compound sentence mein repeated object pronoun same form.", diff: 'hard', tags: ['object-pronouns','compound','social'] },
];

// More varied sentences to reach 950
const extraVaried = [
  { hindi: 'क्या वो तुम्हें पहचानता है?', english: 'Does he recognize you?', hint: 'recognize + you', explanation: "'You' object aur subject dono positions mein same form.", diff: 'easy', tags: ['object-pronouns','question'] },
  { hindi: 'वो हमारे बारे में क्या सोचता है?', english: 'What does he think about us?', hint: 'about + us', explanation: "Preposition 'about' ke baad 'us' aata hai.", diff: 'medium', tags: ['object-pronouns','question','preposition'] },
  { hindi: 'तुमने उसे (male) क्यों नहीं बुलाया?', english: "Why didn't you call him?", hint: "didn't + call + him", explanation: "'Him' object pronoun — past negative question mein bhi same rule.", diff: 'medium', tags: ['object-pronouns','question'] },
  { hindi: 'क्या तुम उसे (female) office में जानते हो?', english: 'Do you know her at the office?', hint: 'know + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','office','question'] },
  { hindi: 'Police ने उसे (male) arrest किया।', english: 'The police arrested him.', hint: 'arrested + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'मेरी माँ ने हमें बहुत कुछ सिखाया।', english: 'My mother taught us a lot.', hint: 'taught + us', explanation: "'Us' = we ka object form — past tense mein bhi same.", diff: 'easy', tags: ['object-pronouns','family'] },
  { hindi: 'उसने (male) मुझे धोखा दिया।', english: 'He deceived me.', hint: 'deceived + me', explanation: "'Me' object pronoun.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'मैंने उन्हें सच बताया।', english: 'I told them the truth.', hint: 'told + them', explanation: "'Them' = they ka object form.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'उसने (female) हमें बहुत inspire किया।', english: 'She inspired us a lot.', hint: 'inspired + us', explanation: "'Us' object pronoun.", diff: 'easy', tags: ['object-pronouns','motivation'] },
  { hindi: 'वो मुझे हर रोज़ motivate करती है।', english: 'She motivates me every day.', hint: 'motivates + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','motivation'] },
  { hindi: 'क्या कोई उन्हें देख रहा है?', english: 'Is anyone watching them?', hint: 'watching + them', explanation: "'Them' object pronoun — continuous tense mein bhi same.", diff: 'medium', tags: ['object-pronouns','question'] },
  { hindi: 'तुम उसे (male) कब से जानते हो?', english: 'How long have you known him?', hint: 'known + him', explanation: "'Him' object pronoun — perfect tense mein bhi same.", diff: 'hard', tags: ['object-pronouns','question'] },
  { hindi: 'वो हमेशा उसे (female) याद करता है।', english: 'He always misses her.', hint: 'misses + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'मैंने उसे (male) एक important message भेजा।', english: 'I sent him an important message.', hint: 'sent + him', explanation: "'Him' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','technology'] },
  { hindi: 'क्या कोई हमें देख रहा है?', english: 'Is anyone watching us?', hint: 'watching + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','daily-life'] },
  { hindi: 'बच्चे उसे (grandfather) बहुत प्यार करते हैं।', english: 'The children love him very much.', hint: 'love + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','family'] },
  { hindi: 'वो तुमसे मिलना चाहती है।', english: 'She wants to meet you.', hint: 'meet + you', explanation: "'You' both positions mein same form.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'मैंने उसे (female) नौकरी के लिए recommend किया।', english: 'I recommended her for the job.', hint: 'recommended + her', explanation: "'Her' object pronoun — professional context mein bhi same.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'Principal ने उसे (male) award से सम्मानित किया।', english: 'The principal honored him with an award.', hint: 'honored + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','school'] },
  { hindi: 'यह काम सिर्फ मुझे पता है।', english: 'Only I know this work. / This work is known only to me.', hint: 'to + me (preposition)', explanation: "'Me' preposition ke baad aata hai. 'Known to me' pattern.", diff: 'hard', tags: ['object-pronouns','preposition','office'] },
  { hindi: 'वो उन्हें देखकर मुस्कुराया।', english: 'He smiled when he saw them.', hint: 'saw + them', explanation: "'Them' object pronoun.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'मेरे boss ने मुझे एक नया project दिया।', english: 'My boss gave me a new project.', hint: 'gave + me', explanation: "'Me' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','office'] },
  { hindi: 'पुलिस उन्हें ढूंढ रही है।', english: 'The police are looking for them.', hint: 'for + them', explanation: "Preposition 'for' ke baad 'them'.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'स्कूल ने उसे (female) scholarship दी।', english: 'The school gave her a scholarship.', hint: 'gave + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'वो आपको बहुत miss करते हैं।', english: 'They miss you a lot.', hint: 'miss + you', explanation: "'You' object position mein same form.", diff: 'easy', tags: ['object-pronouns','family'] },
  { hindi: 'किसने उसे (male) यह idea दिया?', english: 'Who gave him this idea?', hint: 'gave + him', explanation: "'Him' object pronoun — who question mein bhi same.", diff: 'medium', tags: ['object-pronouns','question'] },
  { hindi: 'दोस्तों ने उसे (female) surprise party दी।', english: 'Friends gave her a surprise party.', hint: 'gave + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'वो हमें हमारी गलतियाँ बताता है।', english: 'He tells us our mistakes.', hint: 'tells + us', explanation: "'Us' indirect object pronoun.", diff: 'medium', tags: ['object-pronouns','school','office'] },
  { hindi: 'Company ने उसे (male) foreign trip पर भेजा।', english: 'The company sent him on a foreign trip.', hint: 'sent + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','office','travel'] },
  { hindi: 'क्या तुम उन्हें जानते हो?', english: 'Do you know them?', hint: 'know + them', explanation: "'Them' object pronoun — question mein bhi same.", diff: 'easy', tags: ['object-pronouns','question'] },
  { hindi: 'मुझे उससे (female) मिलना है।', english: 'I need to meet her.', hint: 'meet + her', explanation: "'Her' object pronoun after verb 'meet'.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'उसने (male) हमें एक अच्छी सलाह दी।', english: 'He gave us good advice.', hint: 'gave + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'वो तुम्हें बहुत याद करती है।', english: 'She misses you a lot.', hint: 'misses + you', explanation: "'You' object position mein same form.", diff: 'easy', tags: ['object-pronouns','family','social'] },
  { hindi: 'मेरे teacher ने उसे (female) best student बताया।', english: 'My teacher called her the best student.', hint: 'called + her', explanation: "'Her' object pronoun.", diff: 'medium', tags: ['object-pronouns','school'] },
  { hindi: 'उन्होंने मुझे एक बड़ी जिम्मेदारी दी।', english: 'They gave me a big responsibility.', hint: 'gave + me', explanation: "'Me' indirect object pronoun.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'क्या coach ने उसे (male) select किया?', english: 'Did the coach select him?', hint: 'select + him', explanation: "'Him' object pronoun — past question mein bhi same.", diff: 'medium', tags: ['object-pronouns','sports','question'] },
  { hindi: 'माँ ने हम सबको एक साथ बुलाया।', english: 'Mother called all of us together.', hint: 'called + us', explanation: "'Us' = we ka object form — 'all of us' mein bhi 'us'.", diff: 'medium', tags: ['object-pronouns','family'] },
  { hindi: 'वो उसे (female) हमेशा खुश रखता है।', english: 'He always keeps her happy.', hint: 'keeps + her + happy', explanation: "'Her' object pronoun + adjective complement.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'प्रतियोगिता ने उन्हें बहुत motivate किया।', english: 'The competition motivated them a lot.', hint: 'motivated + them', explanation: "'Them' object pronoun.", diff: 'medium', tags: ['object-pronouns','sports'] },
  { hindi: 'इस news ने मुझे हैरान कर दिया।', english: 'This news shocked me.', hint: 'shocked + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','news'] },
  { hindi: 'Film ने हमें बहुत touch किया।', english: 'The film touched us deeply.', hint: 'touched + us', explanation: "'Us' object pronoun.", diff: 'easy', tags: ['object-pronouns','entertainment'] },
  { hindi: 'इस song ने उसे (female) याद दिला दिया।', english: 'This song reminded her.', hint: 'reminded + her', explanation: "'Her' object pronoun.", diff: 'easy', tags: ['object-pronouns','entertainment'] },
  { hindi: 'उसने (male) मुझे lunch पर invite किया।', english: 'He invited me for lunch.', hint: 'invited + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','food','social'] },
  { hindi: 'क्या तुम उसे (male) respect करते हो?', english: 'Do you respect him?', hint: 'respect + him', explanation: "'Him' object pronoun — question mein bhi same.", diff: 'easy', tags: ['object-pronouns','social','question'] },
  { hindi: 'वो उसे (female) phone करने से डरता है।', english: 'He is afraid to call her.', hint: 'call + her', explanation: "'Her' object pronoun after verb.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'Examiner ने उसे (male) pass किया।', english: 'The examiner passed him.', hint: 'passed + him', explanation: "'Him' object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'वो हमें office के बाद छोड़ देता है।', english: 'He drops us off after work.', hint: 'drops + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','office','travel'] },
  { hindi: 'Society ने उन्हें बाहर कर दिया।', english: 'Society excluded them.', hint: 'excluded + them', explanation: "'Them' object pronoun.", diff: 'hard', tags: ['object-pronouns','social'] },
  { hindi: 'मैं उससे (female) मिलने जाऊँगा।', english: 'I will go to meet her.', hint: 'meet + her', explanation: "'Her' object pronoun.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'Doctor ने उसे (male) bed rest बताया।', english: 'The doctor advised him to take bed rest.', hint: 'advised + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','health'] },
  { hindi: 'उसने (female) हमें अपनी wedding में बुलाया।', english: 'She invited us to her wedding.', hint: 'invited + us', explanation: "'Us' = we ka object form.", diff: 'easy', tags: ['object-pronouns','festivals','social'] },
  { hindi: 'बारिश ने उन्हें घर से बाहर नहीं निकलने दिया।', english: "The rain didn't let them go out.", hint: "let + them", explanation: "'Them' object pronoun after 'let'.", diff: 'hard', tags: ['object-pronouns','weather'] },
  { hindi: 'मैंने उन्हें exam से पहले तैयार किया।', english: 'I prepared them before the exam.', hint: 'prepared + them', explanation: "'Them' object pronoun.", diff: 'medium', tags: ['object-pronouns','school'] },
  { hindi: 'वो उसे (male) हर problem में support करती है।', english: 'She supports him in every problem.', hint: 'supports + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','social','family'] },
  { hindi: 'Company ने मुझे training के लिए Pune भेजा।', english: 'The company sent me to Pune for training.', hint: 'sent + me', explanation: "'Me' = I ka object form.", diff: 'medium', tags: ['object-pronouns','office','travel'] },
  { hindi: 'Festival ने हमें एक साथ ला दिया।', english: 'The festival brought us together.', hint: 'brought + us', explanation: "'Us' object pronoun.", diff: 'medium', tags: ['object-pronouns','festivals'] },
  { hindi: 'वो हम सबको inspire करती हैं।', english: 'She inspires all of us.', hint: 'inspires + us', explanation: "'Us' = we ka object form — 'all of us' mein bhi.", diff: 'medium', tags: ['object-pronouns','motivation'] },
  { hindi: 'किसने उन्हें यह information दी?', english: 'Who gave them this information?', hint: 'gave + them', explanation: "'Them' object pronoun.", diff: 'medium', tags: ['object-pronouns','question'] },
  { hindi: 'मैं उसे (male) कभी नहीं भूलूँगा।', english: 'I will never forget him.', hint: 'never forget + him', explanation: "'Him' = he ka object form.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'वो तुम्हें personally thank करना चाहती है।', english: 'She wants to thank you personally.', hint: 'thank + you', explanation: "'You' object position mein same form hai.", diff: 'medium', tags: ['object-pronouns','professional'] },
  { hindi: 'इस किताब ने मुझे बहुत कुछ सिखाया।', english: 'This book taught me a lot.', hint: 'taught + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','books'] },
  { hindi: 'क्या कोई उन्हें यहाँ देख सकता है?', english: 'Can anyone see them here?', hint: 'see + them', explanation: "'Them' object pronoun — modal verb ke baad bhi same rule.", diff: 'medium', tags: ['object-pronouns','question'] },
  { hindi: 'उसने (female) मुझे अपना phone number दिया।', english: 'She gave me her phone number.', hint: 'gave + me', explanation: "'Me' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','social','technology'] },
  { hindi: 'Interviewer ने उसे (male) reject कर दिया।', english: 'The interviewer rejected him.', hint: 'rejected + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'वो हमें हमेशा सही रास्ता दिखाती हैं।', english: 'She always shows us the right path.', hint: 'shows + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','motivation','family'] },
  { hindi: 'इस बात ने मुझे बहुत hurt किया।', english: 'This thing hurt me a lot.', hint: 'hurt + me', explanation: "'Me' = I ka object form.", diff: 'easy', tags: ['object-pronouns','emotional'] },
  { hindi: 'उसकी बात ने हमें सोचने पर मजबूर किया।', english: 'His words made us think.', hint: 'made + us', explanation: "'Us' = we ka object form. Make + object + verb.", diff: 'hard', tags: ['object-pronouns','compound'] },
  { hindi: 'वो तुम्हें वापस बुलाएगा।', english: 'He will call you back.', hint: 'call + you + back', explanation: "'You' object position mein same form.", diff: 'easy', tags: ['object-pronouns','professional'] },
  { hindi: 'मैंने उसे (female) एक अच्छी किताब recommend की।', english: 'I recommended a good book to her.', hint: 'recommended...to + her', explanation: "Preposition 'to' ke baad 'her' aata hai.", diff: 'medium', tags: ['object-pronouns','books','preposition'] },
  { hindi: 'वो उनके बारे में बहुत care करता है।', english: 'He cares a lot about them.', hint: 'about + them', explanation: "Preposition 'about' ke baad 'them'.", diff: 'easy', tags: ['object-pronouns','family'] },
  { hindi: 'Teacher ने हमें project deadline बताई।', english: 'The teacher told us the project deadline.', hint: 'told + us', explanation: "'Us' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','school'] },
  { hindi: 'उसने (male) मुझे एक gift लाकर दिया।', english: 'He brought me a gift.', hint: 'brought + me', explanation: "'Me' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','social'] },
  { hindi: 'वो उसे (female) coffee बनाकर देता है।', english: 'He makes her coffee.', hint: 'makes + her + coffee', explanation: "'Her' indirect object pronoun.", diff: 'easy', tags: ['object-pronouns','food','social'] },
  { hindi: 'System ने हमें automatically logout कर दिया।', english: 'The system automatically logged us out.', hint: 'logged + us', explanation: "'Us' object pronoun — technology context mein.", diff: 'medium', tags: ['object-pronouns','technology'] },
  { hindi: 'Coach ने हमें final match के लिए select किया।', english: 'The coach selected us for the final match.', hint: 'selected + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','sports'] },
  { hindi: 'उसकी आवाज़ ने मुझे रोक लिया।', english: 'His voice stopped me.', hint: 'stopped + me', explanation: "'Me' = I ka object form.", diff: 'medium', tags: ['object-pronouns','daily-life'] },
  { hindi: 'वो उसे (male) अपना बेटा मानती है।', english: 'She considers him her son.', hint: 'considers + him', explanation: "'Him' object pronoun after 'considers'.", diff: 'hard', tags: ['object-pronouns','family'] },
  { hindi: 'सरकार ने उन्हें free ration दिया।', english: 'The government gave them free rations.', hint: 'gave + them', explanation: "'Them' object pronoun.", diff: 'medium', tags: ['object-pronouns','social'] },
  { hindi: 'मुझे उनसे बात करनी है।', english: 'I need to talk to them.', hint: 'to + them', explanation: "Preposition 'to' ke baad 'them'.", diff: 'medium', tags: ['object-pronouns','preposition'] },
  { hindi: 'App ने हमें एक notification भेजी।', english: 'The app sent us a notification.', hint: 'sent + us', explanation: "'Us' object pronoun.", diff: 'easy', tags: ['object-pronouns','technology'] },
  { hindi: 'उसने (female) मुझे एक important deadline याद दिलाई।', english: 'She reminded me of an important deadline.', hint: 'reminded + me', explanation: "'Me' = I ka object form.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'वो हमें challenge करती रहती है।', english: 'She keeps challenging us.', hint: 'challenging + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','motivation'] },
  { hindi: 'Interview panel ने उसे (female) तुरंत select किया।', english: 'The interview panel selected her immediately.', hint: 'selected + her', explanation: "'Her' object pronoun.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'माँ ने हमें अच्छे संस्कार दिए।', english: 'Mother gave us good values.', hint: 'gave + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','family'] },
  { hindi: 'Diwali ने हम सबको साथ ला दिया।', english: 'Diwali brought all of us together.', hint: 'brought + us', explanation: "'Us' object pronoun.", diff: 'medium', tags: ['object-pronouns','festivals'] },
  { hindi: 'विपदा ने उन्हें मजबूत बनाया।', english: 'Adversity made them stronger.', hint: 'made + them', explanation: "'Them' = they ka object form.", diff: 'hard', tags: ['object-pronouns','motivation'] },
  { hindi: 'रात की shift ने मुझे थका दिया।', english: 'The night shift exhausted me.', hint: 'exhausted + me', explanation: "'Me' = I ka object form.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'Farewell party ने उसे (male) emotional कर दिया।', english: 'The farewell party made him emotional.', hint: 'made + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','office','social'] },
  { hindi: 'मौसम ने हमें घर पर रोक दिया।', english: 'The weather kept us at home.', hint: 'kept + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','weather'] },
  { hindi: 'उनकी success ने मुझे inspire किया।', english: 'Their success inspired me.', hint: 'inspired + me', explanation: "'Me' = I ka object form.", diff: 'medium', tags: ['object-pronouns','motivation'] },
  { hindi: 'Principal ने हमें school anthem याद करने को कहा।', english: 'The principal asked us to memorize the school anthem.', hint: 'asked + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','school'] },
  { hindi: 'Flood ने उन्हें बेघर कर दिया।', english: 'The flood left them homeless.', hint: 'left + them', explanation: "'Them' object pronoun — leave + object + adjective.", diff: 'hard', tags: ['object-pronouns','weather','social'] },
  { hindi: 'क्या traffic ने तुम्हें late किया?', english: 'Did the traffic make you late?', hint: 'make + you + late', explanation: "'You' object position mein same form.", diff: 'medium', tags: ['object-pronouns','travel','question'] },
  { hindi: 'Game ने उसे (male) बहुत hours waste करवाए।', english: 'The game made him waste many hours.', hint: 'made + him', explanation: "'Him' object pronoun.", diff: 'hard', tags: ['object-pronouns','technology'] },
  { hindi: 'यह poem मुझे हमेशा रुलाती है।', english: 'This poem always makes me cry.', hint: 'makes + me + cry', explanation: "'Me' = I ka object form. Make + object + verb.", diff: 'medium', tags: ['object-pronouns','entertainment'] },
  { hindi: 'क्या तुम उसे (female) office में जानते हो?', english: 'Do you know her at the office?', hint: 'know + her', explanation: "'Her' object pronoun — question mein bhi.", diff: 'easy', tags: ['object-pronouns','office'] },
  { hindi: 'उस समझाने वाले ने हमें बहुत कुछ सिखाया।', english: 'That mentor taught us a great deal.', hint: 'taught + us', explanation: "'Us' = we ka object form.", diff: 'medium', tags: ['object-pronouns','motivation'] },
  { hindi: 'Society ने उसे (female) अकेला छोड़ दिया।', english: 'Society left her alone.', hint: 'left + her', explanation: "'Her' object pronoun — leave + object + adjective.", diff: 'hard', tags: ['object-pronouns','social'] },
  { hindi: 'Customer ने उसे (male) बहुत abuse किया।', english: 'The customer abused him a lot.', hint: 'abused + him', explanation: "'Him' object pronoun.", diff: 'medium', tags: ['object-pronouns','office'] },
  { hindi: 'उसकी मेहनत ने हम सबको proud किया।', english: 'Her hard work made all of us proud.', hint: 'made + us + proud', explanation: "'Us' = we ka object form.", diff: 'hard', tags: ['object-pronouns','motivation'] },
];

// Add all seed data to practiceRaw
const allSeedData = [...domainTemplates, ...prepObjTemplates, ...verbPatterns, ...extraVaried];
allSeedData.forEach(t => {
  practiceRaw.push({
    hindi: t.hindi,
    english: t.english,
    hint: t.hint,
    explanation: t.explanation,
    difficulty: t.diff || t.difficulty || 'easy',
    tags: t.tags || ['object-pronouns'],
    grammarRule: t.grammarRule || 'Subject + Verb + Object Pronoun',
    category: 'Object Pronouns',
    sectionId: 'object-pronouns',
    alternatives: t.alternatives || [],
  });
});

// ── Programmatic expansion using templates ─────────────────────────────────
const expandVerbs = [
  { verb: 'help', verbHi: 'help करना', past: 'helped' },
  { verb: 'call', verbHi: 'call करना', past: 'called' },
  { verb: 'visit', verbHi: 'visit करना', past: 'visited' },
  { verb: 'inform', verbHi: 'inform करना', past: 'informed' },
  { verb: 'contact', verbHi: 'contact करना', past: 'contacted' },
  { verb: 'remind', verbHi: 'याद दिलाना', past: 'reminded' },
  { verb: 'thank', verbHi: 'thank करना', past: 'thanked' },
  { verb: 'select', verbHi: 'select करना', past: 'selected' },
  { verb: 'invite', verbHi: 'invite करना', past: 'invited' },
  { verb: 'teach', verbHi: 'सिखाना', past: 'taught' },
  { verb: 'meet', verbHi: 'मिलना', past: 'met' },
  { verb: 'support', verbHi: 'support करना', past: 'supported' },
  { verb: 'trust', verbHi: 'trust करना', past: 'trusted' },
  { verb: 'encourage', verbHi: 'encourage करना', past: 'encouraged' },
  { verb: 'forgive', verbHi: 'माफ करना', past: 'forgave' },
  { verb: 'punish', verbHi: 'punish करना', past: 'punished' },
  { verb: 'follow', verbHi: 'follow करना', past: 'followed' },
  { verb: 'respect', verbHi: 'respect करना', past: 'respected' },
  { verb: 'blame', verbHi: 'blame करना', past: 'blamed' },
  { verb: 'motivate', verbHi: 'motivate करना', past: 'motivated' },
];

const pronounPairs = [
  { subHi: 'Teacher', subEn: 'The teacher', objHi: 'मुझे', objEn: 'me', tags: ['school'] },
  { subHi: 'Teacher', subEn: 'The teacher', objHi: 'उसे (लड़के को)', objEn: 'him', tags: ['school'] },
  { subHi: 'Teacher', subEn: 'The teacher', objHi: 'उसे (लड़की को)', objEn: 'her', tags: ['school'] },
  { subHi: 'Teacher', subEn: 'The teacher', objHi: 'हमें', objEn: 'us', tags: ['school'] },
  { subHi: 'Teacher', subEn: 'The teacher', objHi: 'उन्हें', objEn: 'them', tags: ['school'] },
  { subHi: 'Manager', subEn: 'The manager', objHi: 'मुझे', objEn: 'me', tags: ['office'] },
  { subHi: 'Manager', subEn: 'The manager', objHi: 'उसे (male को)', objEn: 'him', tags: ['office'] },
  { subHi: 'Manager', subEn: 'The manager', objHi: 'उसे (female को)', objEn: 'her', tags: ['office'] },
  { subHi: 'Manager', subEn: 'The manager', objHi: 'हमें', objEn: 'us', tags: ['office'] },
  { subHi: 'Manager', subEn: 'The manager', objHi: 'उन्हें', objEn: 'them', tags: ['office'] },
  { subHi: 'माँ', subEn: 'Mother', objHi: 'मुझे', objEn: 'me', tags: ['family'] },
  { subHi: 'माँ', subEn: 'Mother', objHi: 'उसे (बेटे को)', objEn: 'him', tags: ['family'] },
  { subHi: 'माँ', subEn: 'Mother', objHi: 'उसे (बेटी को)', objEn: 'her', tags: ['family'] },
  { subHi: 'माँ', subEn: 'Mother', objHi: 'हमें', objEn: 'us', tags: ['family'] },
  { subHi: 'Doctor', subEn: 'The doctor', objHi: 'मुझे', objEn: 'me', tags: ['health'] },
  { subHi: 'Doctor', subEn: 'The doctor', objHi: 'उसे (patient को)', objEn: 'him', tags: ['health'] },
  { subHi: 'Doctor', subEn: 'The doctor', objHi: 'उसे (female patient को)', objEn: 'her', tags: ['health'] },
  { subHi: 'Doctor', subEn: 'The doctor', objHi: 'हमें', objEn: 'us', tags: ['health'] },
  { subHi: 'Coach', subEn: 'The coach', objHi: 'मुझे', objEn: 'me', tags: ['sports'] },
  { subHi: 'Coach', subEn: 'The coach', objHi: 'उसे (player को)', objEn: 'him', tags: ['sports'] },
  { subHi: 'Coach', subEn: 'The coach', objHi: 'हमें', objEn: 'us', tags: ['sports'] },
  { subHi: 'Coach', subEn: 'The coach', objHi: 'उन्हें', objEn: 'them', tags: ['sports'] },
];

const diffs = ['easy', 'medium', 'hard'];
let progCount = 0;
for (const pair of pronounPairs) {
  for (const vb of expandVerbs) {
    const d = diffs[progCount % 3];
    practiceRaw.push({
      hindi: `${pair.subHi} ने ${pair.objHi} ${vb.verbHi} किया।`,
      english: `The ${pair.subEn.toLowerCase().replace('the ','')} ${vb.past} ${pair.objEn}.`,
      hint: `${vb.past} + ${pair.objEn}`,
      explanation: `'${pair.objEn}' object pronoun hai — verb '${vb.past}' ke baad aata hai.`,
      difficulty: d,
      tags: ['object-pronouns', 'past-tense', ...pair.tags],
      grammarRule: 'Subject + Verb(past) + Object Pronoun',
      category: 'Object Pronouns',
      sectionId: 'object-pronouns',
      alternatives: [],
    });
    progCount++;
  }
}

// Preposition expansion
const preps = ['for', 'with', 'to', 'about', 'without', 'near', 'behind', 'from'];
const objForms = [
  { hi: 'मुझे/मेरे', en: 'me', sub: 'I' },
  { hi: 'उसे (male)', en: 'him', sub: 'he' },
  { hi: 'उसे (female)', en: 'her', sub: 'she' },
  { hi: 'हमें/हमारे', en: 'us', sub: 'we' },
  { hi: 'उन्हें/उनके', en: 'them', sub: 'they' },
  { hi: 'तुम्हें/तुम्हारे', en: 'you', sub: 'you' },
];

const contextSentenceTemplates = [
  { hiTemplate: (p, o) => `यह ${p === 'for' ? 'letter' : p === 'with' ? 'काम' : p === 'to' ? 'message' : p === 'about' ? 'बात' : p === 'without' ? 'project' : p === 'near' ? 'घर' : p === 'behind' ? 'person' : 'call'} ${o.hi} ${p === 'for' ? 'के लिए' : p === 'with' ? 'के साथ' : p === 'to' ? 'को' : p === 'about' ? 'के बारे में' : p === 'without' ? 'के बिना' : p === 'near' ? 'के पास' : p === 'behind' ? 'के पीछे' : 'की तरफ से'} है।`, enTemplate: (p, o) => `This is ${p} ${o.en}.`, tags: ['preposition', 'daily-life'] },
  { hiTemplate: (p, o) => `वो ${o.hi} ${p === 'for' ? 'के लिए wait कर रहा है' : p === 'with' ? 'के साथ जाएगा' : p === 'to' ? 'को call करेगा' : p === 'about' ? 'के बारे में सोच रहा है' : p === 'without' ? 'के बिना नहीं जाएगा' : p === 'near' ? 'के पास रहता है' : p === 'behind' ? 'के पीछे खड़ा है' : 'की तरफ से आया'}।`, enTemplate: (p, o) => p === 'for' ? `He is waiting for ${o.en}.` : p === 'with' ? `He will go with ${o.en}.` : p === 'to' ? `He will call ${o.en}.` : p === 'about' ? `He is thinking about ${o.en}.` : p === 'without' ? `He will not go without ${o.en}.` : p === 'near' ? `He lives near ${o.en}.` : p === 'behind' ? `He is standing behind ${o.en}.` : `He came from ${o.en}.`, tags: ['preposition'] },
];

for (const prep of preps.slice(0, 5)) {
  for (const obj of objForms) {
    for (const tpl of contextSentenceTemplates) {
      const hi = tpl.hiTemplate(prep, obj);
      const en = tpl.enTemplate(prep, obj);
      practiceRaw.push({
        hindi: hi,
        english: en,
        hint: `${prep} + ${obj.en}`,
        explanation: `Preposition '${prep}' ke baad object pronoun '${obj.en}' aata hai, '${obj.sub}' nahi.`,
        difficulty: 'medium',
        tags: ['object-pronouns', ...tpl.tags],
        grammarRule: 'Preposition + Object Pronoun',
        category: 'Object Pronouns',
        sectionId: 'object-pronouns',
        alternatives: [],
      });
    }
  }
}

// ── De-duplicate ───────────────────────────────────────────────────────────
const seen = new Set();
const practiceUnique = [];
for (const item of practiceRaw) {
  const key = item.hindi.toLowerCase().trim();
  if (!seen.has(key)) {
    seen.add(key);
    practiceUnique.push(item);
  }
}

// Assign sequential IDs
const practice = practiceUnique.map((item, idx) => ({ id: idx + 1, ...item }));
console.log('Practice unique count:', practice.length);

// ── Build MCQ test items ───────────────────────────────────────────────────
const testRaw = [];

// Wrong option generators for object pronouns
function makeWrongOptions(correct, wrongPool) {
  const wrongs = wrongPool.filter(w => w !== correct);
  return shuffle(wrongs).slice(0, 3);
}

const subjectFormsPool = ['I', 'he', 'she', 'we', 'they', 'us', 'me', 'him', 'her', 'them'];

// MCQ Type 1: Choose correct sentence (object pronoun position)
const mcqType1 = [
  {
    q: 'Choose the correct sentence:',
    opts: ['The teacher called I to the stage.', 'The teacher called me to the stage.', 'The teacher called my to the stage.', 'The teacher called mine to the stage.'],
    correct: 'B', exp: "'Me' object pronoun hai — verb 'called' ke baad subject pronoun 'I' nahi aata, 'me' aata hai.",
    diff: 'easy',
  },
  {
    q: 'Choose the correct sentence:',
    opts: ['She helped he with the project.', 'She helped him with the project.', 'She helped his with the project.', 'She helped himself with the project.'],
    correct: 'B', exp: "'Him' = he ka object form. Verb ke baad object pronoun aata hai, subject pronoun nahi.",
    diff: 'easy',
  },
  {
    q: 'Which sentence uses the correct object pronoun?',
    opts: ['I gave she the book.', 'I gave her the book.', 'I gave hers the book.', 'I gave herself the book.'],
    correct: 'B', exp: "'Her' = she ka object form. 'I gave she' galat hai — verb ke baad object pronoun.",
    diff: 'easy',
  },
  {
    q: 'Choose the correct sentence:',
    opts: ['They invited we to the party.', 'They invited us to the party.', 'They invited our to the party.', 'They invited ours to the party.'],
    correct: 'B', exp: "'Us' = we ka object form. 'Invited we' common Hindi speaker mistake hai.",
    diff: 'easy',
  },
  {
    q: 'Choose the correct sentence:',
    opts: ['My friend called they for help.', 'My friend called them for help.', 'My friend called their for help.', 'My friend called theirs for help.'],
    correct: 'B', exp: "'Them' = they ka object form. Verb ke baad 'they' galat, 'them' sahi hai.",
    diff: 'easy',
  },
  {
    q: "Fill in the blank: 'The manager assigned ___ a new task.'",
    opts: ['I', 'me', 'my', 'mine'],
    correct: 'B', exp: "'Me' object pronoun — verb 'assigned' ke baad indirect object ke roop mein aata hai.",
    diff: 'easy',
  },
  {
    q: "Fill in the blank: 'She always helps ___.'",
    opts: ['he', 'him', 'his', 'himself'],
    correct: 'B', exp: "'Him' = he ka object form. Verb ke baad subject pronoun nahi aata.",
    diff: 'easy',
  },
  {
    q: "Fill in the blank: 'Please call ___.'",
    opts: ['she', 'her', 'hers', 'herself'],
    correct: 'B', exp: "Imperative sentence mein bhi object pronoun 'her' aata hai, 'she' nahi.",
    diff: 'easy',
  },
  {
    q: "Fill in the blank: 'My mother taught ___ good values.'",
    opts: ['we', 'us', 'our', 'ours'],
    correct: 'B', exp: "'Us' = we ka object form. 'Taught we' galat — taught ke baad object pronoun.",
    diff: 'easy',
  },
  {
    q: "Fill in the blank: 'The coach selected ___ for the team.'",
    opts: ['they', 'them', 'their', 'theirs'],
    correct: 'B', exp: "'Them' = they ka object form. Verb ke baad 'they' nahi 'them' aata hai.",
    diff: 'easy',
  },
  {
    q: "Choose correct: 'He waited ___.'",
    opts: ['for I', 'for me', 'for my', 'for mine'],
    correct: 'B', exp: "Preposition 'for' ke baad object pronoun 'me' aata hai, 'I' nahi. Very common Hindi speaker error!",
    diff: 'easy',
  },
  {
    q: "Choose correct: 'This letter is ___.'",
    opts: ['for he', 'for him', 'for his', 'for himself'],
    correct: 'B', exp: "Preposition 'for' ke baad object pronoun. 'For he' galat — 'for him' sahi.",
    diff: 'easy',
  },
  {
    q: "Choose correct: 'She came with ___.'",
    opts: ['I', 'me', 'my', 'myself'],
    correct: 'B', exp: "Preposition 'with' ke baad object pronoun 'me' — 'with I' bilkul wrong.",
    diff: 'easy',
  },
  {
    q: "Choose correct: 'The result surprised ___.'",
    opts: ['we', 'us', 'our', 'ours'],
    correct: 'B', exp: "'Us' = we ka object form. Verb ke baad 'we' kabhi nahi.",
    diff: 'easy',
  },
  {
    q: "Which is correct? 'Tell ___ the answer.'",
    opts: ['he', 'him', 'his', 'himself'],
    correct: 'B', exp: "Imperative mein 'tell' ke baad object pronoun 'him' aata hai.",
    diff: 'easy',
  },
  // Translate Hindi to correct MCQ
  {
    q: "Translate: 'माँ ने हमें खाना दिया।'",
    opts: ['Mother gave we food.', 'Mother gave us food.', 'Mother gave our food.', 'Mother gave ours food.'],
    correct: 'B', exp: "'Us' = we ka object form. 'Gave we' common mistake — verb ke baad object pronoun.",
    diff: 'easy',
  },
  {
    q: "Translate: 'मैंने उसे (male) किताब दी।'",
    opts: ['I gave he the book.', 'I gave him the book.', 'I gave his the book.', 'I gave himself the book.'],
    correct: 'B', exp: "'Him' = he ka object form. 'Gave he' galat — gave ke baad object pronoun.",
    diff: 'easy',
  },
  {
    q: "Translate: 'Teacher ने उन्हें homework दिया।'",
    opts: ['The teacher gave they homework.', 'The teacher gave them homework.', 'The teacher gave their homework.', 'The teacher gave theirs homework.'],
    correct: 'B', exp: "'Them' = they ka object form. Verb ke baad 'they' kabhi nahi aata.",
    diff: 'easy',
  },
  {
    q: "Translate: 'वो मुझे याद करता है।'",
    opts: ['He misses I.', 'He misses me.', 'He misses my.', 'He misses mine.'],
    correct: 'B', exp: "'Me' = I ka object form. 'Misses I' wrong — verb ke baad object pronoun.",
    diff: 'easy',
  },
  {
    q: "Translate: 'क्या वो उसे (female) जानता है?'",
    opts: ['Does he know she?', 'Does he know her?', 'Does he know hers?', 'Does he know herself?'],
    correct: 'B', exp: "'Her' = she ka object form. 'Know she' galat — know ke baad object pronoun.",
    diff: 'easy',
  },
  // Preposition MCQs
  {
    q: "Choose the correct preposition + pronoun: 'He came ___ to discuss the plan.'",
    opts: ['to I', 'to me', 'to my', 'to mine'],
    correct: 'B', exp: "Preposition 'to' ke baad object pronoun 'me'. 'To I' Indian English mein very common galat use.",
    diff: 'medium',
  },
  {
    q: "Which is correct? 'She is standing behind ___.'",
    opts: ['I', 'me', 'my', 'mine'],
    correct: 'B', exp: "Preposition 'behind' ke baad object pronoun 'me'.",
    diff: 'medium',
  },
  {
    q: "Fill in: 'Don't go without ___.'",
    opts: ['she', 'her', 'hers', 'herself'],
    correct: 'B', exp: "Preposition 'without' ke baad object pronoun 'her'.",
    diff: 'medium',
  },
  {
    q: "Choose correct: 'This task is about ___.'",
    opts: ['they', 'them', 'their', 'theirs'],
    correct: 'B', exp: "Preposition 'about' ke baad object pronoun 'them'.",
    diff: 'medium',
  },
  {
    q: "Which is correct? 'Are you talking about ___?'",
    opts: ['we', 'us', 'our', 'ours'],
    correct: 'B', exp: "Preposition 'about' ke baad 'us'. 'About we' common error.",
    diff: 'medium',
  },
  // Error spotting
  {
    q: "Spot the error: 'He asked I to come early.'",
    opts: ['He', 'asked', 'I', 'to come early'],
    correct: 'C', exp: "'I' galat hai yahan — verb 'asked' ke baad object pronoun 'me' hona chahiye: 'He asked me to come early.'",
    diff: 'medium',
  },
  {
    q: "Spot the error: 'She gave we the assignment.'",
    opts: ['She', 'gave', 'we', 'the assignment'],
    correct: 'C', exp: "'We' galat hai — 'gave' ke baad object pronoun 'us' hona chahiye.",
    diff: 'medium',
  },
  {
    q: "Spot the error: 'Please inform they about the meeting.'",
    opts: ['Please', 'inform', 'they', 'about'],
    correct: 'C', exp: "'They' galat — verb 'inform' ke baad 'them' hona chahiye, not 'they'.",
    diff: 'medium',
  },
  {
    q: "Spot the error: 'The news shocked we all.'",
    opts: ['The news', 'shocked', 'we', 'all'],
    correct: 'C', exp: "'We' galat — verb ke baad 'us' hona chahiye: 'shocked us all'.",
    diff: 'medium',
  },
  {
    q: "Spot the error: 'My father loves I very much.'",
    opts: ['My father', 'loves', 'I', 'very much'],
    correct: 'C', exp: "'I' kabhi object nahi hota — 'me' hona chahiye: 'loves me very much'.",
    diff: 'easy',
  },
  // Hard / compound sentences
  {
    q: "Choose correct: 'He knows ___ but doesn't talk to ___.' (both blanks = same person, speaking about yourself)",
    opts: ['me ... I', 'me ... me', 'I ... me', 'I ... I'],
    correct: 'B', exp: "Dono positions mein object pronoun 'me' aata hai — verb 'knows' aur preposition 'to' dono ke baad.",
    diff: 'hard',
  },
  {
    q: "Which is correct? 'They gave both ___ and ___ an award.'",
    opts: ['he and she', 'him and her', 'his and her', 'him and hers'],
    correct: 'B', exp: "'Both him and her' — gave ke baad dono object pronouns chahiye, subject forms nahi.",
    diff: 'hard',
  },
  {
    q: "Choose correct: 'She invited ___ and ___ to the wedding.'",
    opts: ['I and he', 'me and him', 'I and him', 'me and he'],
    correct: 'B', exp: "'Me and him' — invited ke baad dono object pronouns. 'Invited I' aur 'invited he' dono wrong hain.",
    diff: 'hard',
  },
  {
    q: "Which is correct? 'Between you and ___, this is a secret.'",
    opts: ['I', 'me', 'my', 'mine'],
    correct: 'B', exp: "Preposition 'between' ke baad object pronoun 'me'. 'Between you and I' common but wrong — 'between you and me' sahi hai.",
    diff: 'hard',
  },
  {
    q: "Choose the correct sentence with a compound object:",
    opts: ['He called she and I.', 'He called her and me.', 'He called her and I.', 'He called she and me.'],
    correct: 'B', exp: "'Her and me' — dono object pronouns chahiye. 'Called she' aur 'called I' dono wrong.",
    diff: 'hard',
  },
  // More unique MCQs to reach 350
];

// Generate more MCQs programmatically
const mcqPronounFills = [
  { hi: "The boss promoted ___.", choices: [['she','her','hers','herself'], 'B'], exp: "'Her' = she ka object form — verb ke baad.", diff: 'easy' },
  { hi: "They always support ___.", choices: [['we','us','our','ours'], 'B'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: "Please call ___ tomorrow.", choices: [['I','me','my','mine'], 'B'], exp: "'Me' object pronoun — imperative mein bhi verb ke baad.", diff: 'easy' },
  { hi: "Did you see ___?", choices: [['he','him','his','himself'], 'B'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: "The rain bothered ___ all day.", choices: [['I','me','my','mine'], 'B'], exp: "'Me' = I ka object form.", diff: 'easy' },
  { hi: "Mother always encourages ___.", choices: [['we','us','our','ours'], 'B'], exp: "'Us' object pronoun.", diff: 'easy' },
  { hi: "She reminded ___ about the event.", choices: [['I','me','my','mine'], 'B'], exp: "'Me' = I ka object form.", diff: 'easy' },
  { hi: "Everyone trusts ___.", choices: [['she','her','hers','herself'], 'B'], exp: "'Her' object pronoun.", diff: 'easy' },
  { hi: "The guide showed ___ the museum.", choices: [['we','us','our','ours'], 'B'], exp: "'Us' indirect object pronoun.", diff: 'easy' },
  { hi: "Can you help ___?", choices: [['he','him','his','himself'], 'B'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: "This result surprised ___.", choices: [['they','them','their','theirs'], 'B'], exp: "'Them' object pronoun.", diff: 'easy' },
  { hi: "The teacher punished ___.", choices: [['she','her','hers','herself'], 'B'], exp: "'Her' object pronoun.", diff: 'easy' },
  { hi: "Please forgive ___.", choices: [['I','me','my','mine'], 'B'], exp: "'Me' = I ka object form — imperative mein bhi.", diff: 'easy' },
  { hi: "I respect ___ a lot.", choices: [['he','him','his','himself'], 'B'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: "She inspired ___ to work hard.", choices: [['we','us','our','ours'], 'B'], exp: "'Us' object pronoun.", diff: 'easy' },
  { hi: "The company gave ___ a bonus.", choices: [['they','them','their','theirs'], 'B'], exp: "'Them' = they ka object form.", diff: 'easy' },
  { hi: "My dad loves ___ unconditionally.", choices: [['I','me','my','mine'], 'B'], exp: "'Me' = I ka object form.", diff: 'easy' },
  { hi: "The principal selected ___ for the event.", choices: [['she','her','hers','herself'], 'B'], exp: "'Her' object pronoun.", diff: 'easy' },
  { hi: "The coach trained ___ for the finals.", choices: [['we','us','our','ours'], 'B'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: "Do you know ___?", choices: [['they','them','their','theirs'], 'B'], exp: "'Them' object pronoun — question mein bhi same.", diff: 'easy' },
  // Preposition fill-in
  { hi: "This gift is for ___.", choices: [['she','her','hers','herself'], 'B'], exp: "Preposition 'for' ke baad object pronoun 'her'.", diff: 'easy' },
  { hi: "He came with ___.", choices: [['I','me','my','mine'], 'B'], exp: "Preposition 'with' ke baad 'me'.", diff: 'easy' },
  { hi: "She is talking about ___.", choices: [['he','him','his','himself'], 'B'], exp: "Preposition 'about' ke baad 'him'.", diff: 'easy' },
  { hi: "Don't go without ___.", choices: [['we','us','our','ours'], 'B'], exp: "Preposition 'without' ke baad 'us'.", diff: 'easy' },
  { hi: "The message is from ___.", choices: [['they','them','their','theirs'], 'B'], exp: "Preposition 'from' ke baad 'them'.", diff: 'easy' },
  { hi: "He is standing near ___.", choices: [['she','her','hers','herself'], 'B'], exp: "Preposition 'near' ke baad 'her'.", diff: 'medium' },
  { hi: "Between you and ___, this is confidential.", choices: [['I','me','my','mine'], 'B'], exp: "Preposition 'between' ke baad 'me' — 'between you and I' galat hai.", diff: 'hard' },
  { hi: "I live near ___.", choices: [['he','him','his','himself'], 'B'], exp: "Preposition 'near' ke baad 'him'.", diff: 'medium' },
  { hi: "Please wait for ___.", choices: [['we','us','our','ours'], 'B'], exp: "Preposition 'for' ke baad 'us'.", diff: 'easy' },
  { hi: "She ran towards ___.", choices: [['they','them','their','theirs'], 'B'], exp: "Preposition 'towards' ke baad 'them'.", diff: 'medium' },
  // Error identification
  { hi: "Which word is WRONG? 'She gave he the book.'", choices: [['She','gave','he','book'], 'C'], exp: "'He' galat hai — 'gave' ke baad object pronoun 'him' hona chahiye.", diff: 'easy' },
  { hi: "Which word is WRONG? 'They called we for help.'", choices: [['They','called','we','for help'], 'C'], exp: "'We' galat hai — 'called' ke baad 'us' hona chahiye.", diff: 'easy' },
  { hi: "Which word is WRONG? 'Please inform they quickly.'", choices: [['Please','inform','they','quickly'], 'C'], exp: "'They' galat — 'inform' ke baad 'them' chahiye.", diff: 'easy' },
  { hi: "Which word is WRONG? 'My mother loves I very much.'", choices: [['mother','loves','I','very much'], 'C'], exp: "'I' kabhi object nahi — 'me' hona chahiye.", diff: 'easy' },
  { hi: "Which word is WRONG? 'He visited we last week.'", choices: [['He','visited','we','last week'], 'C'], exp: "'We' galat — visited ke baad 'us' chahiye.", diff: 'easy' },
];

for (const m of mcqPronounFills) {
  const [optArr, correct] = m.choices;
  testRaw.push({
    type: 'mcq',
    question: m.hi,
    options: optArr,
    correct,
    explanation: m.exp,
    difficulty: m.diff,
    marks: 1,
    category: 'Object Pronouns',
    sectionId: 'object-pronouns',
  });
}

// Add the hand-crafted MCQs
for (const m of mcqType1) {
  testRaw.push({
    type: 'mcq',
    question: m.q,
    options: m.opts,
    correct: m.correct,
    explanation: m.exp,
    difficulty: m.diff,
    marks: 1,
    category: 'Object Pronouns',
    sectionId: 'object-pronouns',
  });
}

// Programmatic MCQ generation — translate Hindi sentences
const hindiToMCQ = [
  { hi: 'वो मुझे रोज़ call करती है।', correct: 'She calls me every day.', wrongs: ['She calls I every day.', 'She calls my every day.', 'She calls mine every day.'], exp: "'Me' object pronoun — 'calls I' galat.", diff: 'easy' },
  { hi: 'Manager ने उसे (male) promote किया।', correct: 'The manager promoted him.', wrongs: ['The manager promoted he.', 'The manager promoted his.', 'The manager promoted himself.'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: 'Doctor ने हमें दवाई दी।', correct: 'The doctor gave us medicine.', wrongs: ['The doctor gave we medicine.', 'The doctor gave our medicine.', 'The doctor gave ours medicine.'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: 'Police ने उन्हें arrest किया।', correct: 'The police arrested them.', wrongs: ['The police arrested they.', 'The police arrested their.', 'The police arrested theirs.'], exp: "'Them' = they ka object form.", diff: 'easy' },
  { hi: 'उसने (female) मुझे advice दी।', correct: 'She gave me advice.', wrongs: ['She gave I advice.', 'She gave my advice.', 'She gave mine advice.'], exp: "'Me' = I ka object form.", diff: 'easy' },
  { hi: 'Teacher ने उसे (female) award दिया।', correct: 'The teacher gave her an award.', wrongs: ['The teacher gave she an award.', 'The teacher gave hers an award.', 'The teacher gave herself an award.'], exp: "'Her' = she ka object form.", diff: 'easy' },
  { hi: 'Client ने हमें project दिया।', correct: 'The client gave us a project.', wrongs: ['The client gave we a project.', 'The client gave our a project.', 'The client gave ours a project.'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: 'बारिश ने उन्हें रोक दिया।', correct: 'The rain stopped them.', wrongs: ['The rain stopped they.', 'The rain stopped their.', 'The rain stopped theirs.'], exp: "'Them' object pronoun.", diff: 'easy' },
  { hi: 'वो मेरे साथ आया।', correct: 'He came with me.', wrongs: ['He came with I.', 'He came with my.', 'He came with mine.'], exp: "Preposition 'with' ke baad 'me', 'I' nahi.", diff: 'easy' },
  { hi: 'यह letter उसके (male) लिए है।', correct: 'This letter is for him.', wrongs: ['This letter is for he.', 'This letter is for his.', 'This letter is for himself.'], exp: "Preposition 'for' ke baad 'him'.", diff: 'easy' },
  { hi: 'मैं उसके (female) बिना नहीं रह सकता।', correct: "I can't live without her.", wrongs: ["I can't live without she.", "I can't live without hers.", "I can't live without herself."], exp: "Preposition 'without' ke baad 'her'.", diff: 'medium' },
  { hi: 'वो हमारे साथ आई।', correct: 'She came with us.', wrongs: ['She came with we.', 'She came with our.', 'She came with ours.'], exp: "Preposition 'with' ke baad 'us'.", diff: 'easy' },
  { hi: 'क्या तुम उन्हें जानते हो?', correct: 'Do you know them?', wrongs: ['Do you know they?', 'Do you know their?', 'Do you know theirs?'], exp: "'Them' object pronoun — know ke baad.", diff: 'easy' },
  { hi: 'वो मुझसे मिलना चाहता है।', correct: 'He wants to meet me.', wrongs: ['He wants to meet I.', 'He wants to meet my.', 'He wants to meet mine.'], exp: "Verb 'meet' ke baad 'me'.", diff: 'easy' },
  { hi: 'इस news ने उसे (male) shock किया।', correct: 'This news shocked him.', wrongs: ['This news shocked he.', 'This news shocked his.', 'This news shocked himself.'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: 'Film ने हमें बहुत touch किया।', correct: 'The film moved us deeply.', wrongs: ['The film moved we deeply.', 'The film moved our deeply.', 'The film moved ours deeply.'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: 'Coach ने उन्हें finals के लिए train किया।', correct: 'The coach trained them for the finals.', wrongs: ['The coach trained they for the finals.', 'The coach trained their for the finals.', 'The coach trained theirs for the finals.'], exp: "'Them' object pronoun.", diff: 'medium' },
  { hi: 'उसने (male) मुझे बहुत inspire किया।', correct: 'He inspired me a lot.', wrongs: ['He inspired I a lot.', 'He inspired my a lot.', 'He inspired mine a lot.'], exp: "'Me' = I ka object form.", diff: 'easy' },
  { hi: 'क्या कोई उसे (female) देख रहा है?', correct: 'Is anyone watching her?', wrongs: ['Is anyone watching she?', 'Is anyone watching hers?', 'Is anyone watching herself?'], exp: "'Her' = she ka object form.", diff: 'medium' },
  { hi: 'Manager ने उसे (female) foreign trip पर भेजा।', correct: 'The manager sent her on a foreign trip.', wrongs: ['The manager sent she on a foreign trip.', 'The manager sent hers on a foreign trip.', 'The manager sent herself on a foreign trip.'], exp: "'Her' object pronoun.", diff: 'medium' },
  { hi: 'दोस्त ने हमें surprise दिया।', correct: 'The friend gave us a surprise.', wrongs: ['The friend gave we a surprise.', 'The friend gave our a surprise.', 'The friend gave ours a surprise.'], exp: "'Us' = we ka object form.", diff: 'easy' },
  { hi: 'क्या तुम उसे (male) याद करते हो?', correct: 'Do you miss him?', wrongs: ['Do you miss he?', 'Do you miss his?', 'Do you miss himself?'], exp: "'Him' = he ka object form.", diff: 'easy' },
  { hi: 'उसने (female) हमें बहुत motivate किया।', correct: 'She motivated us a lot.', wrongs: ['She motivated we a lot.', 'She motivated our a lot.', 'She motivated ours a lot.'], exp: "'Us' object pronoun.", diff: 'easy' },
  { hi: 'Principal ने उसे (male) scholarship दी।', correct: 'The principal gave him a scholarship.', wrongs: ['The principal gave he a scholarship.', 'The principal gave his a scholarship.', 'The principal gave himself a scholarship.'], exp: "'Him' = he ka object form.", diff: 'medium' },
  { hi: 'Company ने उन्हें training दी।', correct: 'The company gave them training.', wrongs: ['The company gave they training.', 'The company gave their training.', 'The company gave theirs training.'], exp: "'Them' object pronoun.", diff: 'easy' },
  // HARD compound
  { hi: 'उसने मुझे बुलाया और मुझे gift दिया।', correct: 'He called me and gave me a gift.', wrongs: ['He called I and gave me a gift.', 'He called me and gave I a gift.', 'He called I and gave I a gift.'], exp: "Dono positions mein 'me' chahiye.", diff: 'hard' },
  { hi: 'Teacher ने उसे और उसे award दिए।', correct: 'The teacher gave him and her awards.', wrongs: ['The teacher gave he and her awards.', 'The teacher gave him and she awards.', 'The teacher gave he and she awards.'], exp: "Dono object positions mein object pronouns: him, her.", diff: 'hard' },
  { hi: 'वो मुझे जानता है लेकिन मुझसे बात नहीं करता।', correct: "He knows me but doesn't talk to me.", wrongs: ["He knows I but doesn't talk to me.", "He knows me but doesn't talk to I.", "He knows I but doesn't talk to I."], exp: "Verb aur preposition dono ke baad 'me'.", diff: 'hard' },
  { hi: 'She helped both him and me with the project.', correct: 'She helped both him and me with the project.', wrongs: ['She helped both he and me.', 'She helped both him and I.', 'She helped both he and I.'], exp: "'Both him and me' — dono object pronouns.", diff: 'hard' },
  { hi: 'Between you and me, this is confidential.', correct: 'Between you and me, this is confidential.', wrongs: ['Between you and I, this is confidential.', 'Between you and my, this is confidential.', 'Between you and mine, this is confidential.'], exp: "'Between you and me' — 'between you and I' galat hai. Preposition ke baad object pronoun.", diff: 'hard' },
];

for (const m of hindiToMCQ) {
  const allOpts = shuffle([m.correct, ...m.wrongs]);
  const correctIdx = allOpts.indexOf(m.correct);
  const correctLetter = ['A', 'B', 'C', 'D'][correctIdx];
  testRaw.push({
    type: 'mcq',
    question: m.hi.startsWith('She ') || m.hi.startsWith('Between') ? `Choose the correct sentence: '${m.hi}'` : `Translate to English: '${m.hi}'`,
    options: allOpts,
    correct: correctLetter,
    explanation: m.exp,
    difficulty: m.diff,
    marks: 1,
    category: 'Object Pronouns',
    sectionId: 'object-pronouns',
  });
}

// Programmatic MCQ expansion: verb + pronoun pairs
const mcqVerbPairs = [
  { verb: 'call', subject: 'She', subjHi: 'वो (female)' },
  { verb: 'help', subject: 'He', subjHi: 'वो (male)' },
  { verb: 'teach', subject: 'The teacher', subjHi: 'Teacher' },
  { verb: 'visit', subject: 'They', subjHi: 'वो लोग' },
  { verb: 'invite', subject: 'My friend', subjHi: 'मेरा दोस्त' },
  { verb: 'inform', subject: 'The manager', subjHi: 'Manager' },
  { verb: 'remind', subject: 'She', subjHi: 'वो (female)' },
  { verb: 'support', subject: 'We', subjHi: 'हम' },
  { verb: 'trust', subject: 'Everyone', subjHi: 'सब' },
  { verb: 'encourage', subject: 'My parents', subjHi: 'माता-पिता' },
];

const mcqObjCombos = [
  { correct: 'me', wrong1: 'I', wrong2: 'my', wrong3: 'mine', hi: 'मुझे', exp: "'Me' = I ka object form." },
  { correct: 'him', wrong1: 'he', wrong2: 'his', wrong3: 'himself', hi: 'उसे (male)', exp: "'Him' = he ka object form." },
  { correct: 'her', wrong1: 'she', wrong2: 'hers', wrong3: 'herself', hi: 'उसे (female)', exp: "'Her' = she ka object form." },
  { correct: 'us', wrong1: 'we', wrong2: 'our', wrong3: 'ours', hi: 'हमें', exp: "'Us' = we ka object form." },
  { correct: 'them', wrong1: 'they', wrong2: 'their', wrong3: 'theirs', hi: 'उन्हें', exp: "'Them' = they ka object form." },
];

let mcqCount = 0;
for (const vp of mcqVerbPairs) {
  for (const oc of mcqObjCombos) {
    const allOpts = shuffle([oc.correct, oc.wrong1, oc.wrong2, oc.wrong3]);
    const correctIdx = allOpts.indexOf(oc.correct);
    const correctLetter = ['A', 'B', 'C', 'D'][correctIdx];
    testRaw.push({
      type: 'mcq',
      question: `Fill in the blank: '${vp.subject} ${vp.verb}s ___ every day.'`,
      options: allOpts,
      correct: correctLetter,
      explanation: `${oc.exp} Verb '${vp.verb}' ke baad object pronoun aata hai.`,
      difficulty: mcqCount % 3 === 0 ? 'easy' : mcqCount % 3 === 1 ? 'medium' : 'hard',
      marks: 1,
      category: 'Object Pronouns',
      sectionId: 'object-pronouns',
    });
    mcqCount++;
  }
}

// More preposition MCQs
const prepMCQs = [
  { q: "Choose correct: 'Please wait for ___.'", opts: ['I','me','my','mine'], c: 'B', exp: "Preposition 'for' + 'me'.", d: 'easy' },
  { q: "Choose correct: 'She lives near ___.'", opts: ['he','him','his','himself'], c: 'B', exp: "Preposition 'near' + 'him'.", d: 'medium' },
  { q: "Choose correct: 'Don't talk about ___.'", opts: ['we','us','our','ours'], c: 'B', exp: "Preposition 'about' + 'us'.", d: 'easy' },
  { q: "Choose correct: 'He came towards ___.'", opts: ['they','them','their','theirs'], c: 'B', exp: "Preposition 'towards' + 'them'.", d: 'medium' },
  { q: "Choose correct: 'This problem is beyond ___.'", opts: ['she','her','hers','herself'], c: 'B', exp: "Preposition 'beyond' + 'her'.", d: 'medium' },
  { q: "Choose correct: 'Can you do this for ___?'", opts: ['I','me','my','mine'], c: 'B', exp: "Preposition 'for' ke baad 'me'.", d: 'easy' },
  { q: "Choose correct: 'We rely on ___.'", opts: ['he','him','his','himself'], c: 'B', exp: "Preposition 'on' ke baad 'him'.", d: 'medium' },
  { q: "Choose correct: 'She is popular among ___.'", opts: ['we','us','our','ours'], c: 'B', exp: "Preposition 'among' + 'us'.", d: 'medium' },
  { q: "Choose correct: 'I agree with ___.'", opts: ['they','them','their','theirs'], c: 'B', exp: "Preposition 'with' + 'them'.", d: 'easy' },
  { q: "Choose correct: 'He was standing beside ___.'", opts: ['she','her','hers','herself'], c: 'B', exp: "Preposition 'beside' + 'her'.", d: 'easy' },
  { q: "Choose correct: 'The message came from ___.'", opts: ['he','him','his','himself'], c: 'B', exp: "Preposition 'from' + 'him'.", d: 'easy' },
  { q: "Choose correct: 'She is ahead of ___.'", opts: ['we','us','our','ours'], c: 'B', exp: "Preposition 'of' + 'us'.", d: 'medium' },
  { q: "Choose correct: 'Nobody likes fighting against ___.'", opts: ['they','them','their','theirs'], c: 'B', exp: "Preposition 'against' + 'them'.", d: 'medium' },
  { q: "Choose correct: 'He sat next to ___.'", opts: ['I','me','my','mine'], c: 'B', exp: "Preposition 'to' ke baad 'me'.", d: 'easy' },
  { q: "Choose correct: 'She is different from ___.'", opts: ['he','him','his','himself'], c: 'B', exp: "Preposition 'from' + 'him'.", d: 'medium' },
  { q: "Choose correct: 'Can they come without ___?'", opts: ['we','us','our','ours'], c: 'B', exp: "Preposition 'without' ke baad 'us'.", d: 'medium' },
  { q: "Choose correct: 'The victory belongs to ___.'", opts: ['they','them','their','theirs'], c: 'B', exp: "Preposition 'to' + 'them'.", d: 'medium' },
  { q: "Choose correct: 'She is smarter than ___.'", opts: ['I','me','my','mine'], c: 'B', exp: "Comparison 'than' ke baad 'me'.", d: 'hard' },
  { q: "Choose correct: 'He is taller than ___.'", opts: ['she','her','hers','herself'], c: 'B', exp: "Comparison 'than' ke baad 'her'.", d: 'hard' },
  { q: "Choose correct: 'They are faster than ___.'", opts: ['we','us','our','ours'], c: 'B', exp: "Comparison 'than' ke baad 'us'.", d: 'hard' },
];
for (const m of prepMCQs) {
  const allOpts = m.opts;
  testRaw.push({
    type: 'mcq',
    question: m.q,
    options: allOpts,
    correct: m.c,
    explanation: m.exp,
    difficulty: m.d,
    marks: 1,
    category: 'Object Pronouns',
    sectionId: 'object-pronouns',
  });
}

// De-dup test items by question
const seenQ = new Set();
const testUnique = [];
for (const item of testRaw) {
  const key = item.question.toLowerCase().trim();
  if (!seenQ.has(key)) {
    seenQ.add(key);
    testUnique.push(item);
  }
}
const test = testUnique.map((item, idx) => ({ id: idx + 1, ...item }));
console.log('Test unique count:', test.length);

// ── Write files ────────────────────────────────────────────────────────────
const PRACTICE_PATH = 'data/challenge/day-01/generated/practice/object-pronouns.json';
const TEST_PATH = 'data/challenge/day-01/generated/test/object-pronouns.json';

fs.writeFileSync(PRACTICE_PATH, JSON.stringify(practice, null, 2));
fs.writeFileSync(TEST_PATH, JSON.stringify(test, null, 2));

console.log(`Written ${practice.length} practice items to ${PRACTICE_PATH}`);
console.log(`Written ${test.length} test items to ${TEST_PATH}`);
