#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

// ─── WORD BANKS ────────────────────────────────────────────────────────────────
// All subject keys are lowercase
const subjects = {
  i:    { pronoun:"I",    form:"base", neg:"don't",   does:"do",   hindi:"मैं" },
  we:   { pronoun:"We",   form:"base", neg:"don't",   does:"do",   hindi:"हम" },
  you:  { pronoun:"You",  form:"base", neg:"don't",   does:"do",   hindi:"तुम" },
  they: { pronoun:"They", form:"base", neg:"don't",   does:"do",   hindi:"वे" },
  he:   { pronoun:"He",   form:"s",   neg:"doesn't", does:"does", hindi:"वो" },
  she:  { pronoun:"She",  form:"s",   neg:"doesn't", does:"does", hindi:"वो" },
  it:   { pronoun:"It",   form:"s",   neg:"doesn't", does:"does", hindi:"यह" },
};

const verbs = [
  {base:"eat",        s:"eats",        hindiM:"खाता",    hindiF:"खाती"},
  {base:"drink",      s:"drinks",      hindiM:"पीता",    hindiF:"पीती"},
  {base:"go",         s:"goes",        hindiM:"जाता",    hindiF:"जाती"},
  {base:"come",       s:"comes",       hindiM:"आता",     hindiF:"आती"},
  {base:"read",       s:"reads",       hindiM:"पढ़ता",   hindiF:"पढ़ती"},
  {base:"write",      s:"writes",      hindiM:"लिखता",   hindiF:"लिखती"},
  {base:"play",       s:"plays",       hindiM:"खेलता",   hindiF:"खेलती"},
  {base:"watch",      s:"watches",     hindiM:"देखता",   hindiF:"देखती"},
  {base:"work",       s:"works",       hindiM:"काम करता",hindiF:"काम करती"},
  {base:"study",      s:"studies",     hindiM:"पढ़ता",   hindiF:"पढ़ती"},
  {base:"teach",      s:"teaches",     hindiM:"पढ़ाता",  hindiF:"पढ़ाती"},
  {base:"learn",      s:"learns",      hindiM:"सीखता",   hindiF:"सीखती"},
  {base:"sleep",      s:"sleeps",      hindiM:"सोता",    hindiF:"सोती"},
  {base:"wake up",    s:"wakes up",    hindiM:"उठता",    hindiF:"उठती"},
  {base:"run",        s:"runs",        hindiM:"दौड़ता",  hindiF:"दौड़ती"},
  {base:"walk",       s:"walks",       hindiM:"चलता",    hindiF:"चलती"},
  {base:"cook",       s:"cooks",       hindiM:"बनाता",   hindiF:"बनाती"},
  {base:"clean",      s:"cleans",      hindiM:"साफ़ करता",hindiF:"साफ़ करती"},
  {base:"wash",       s:"washes",      hindiM:"धोता",    hindiF:"धोती"},
  {base:"buy",        s:"buys",        hindiM:"खरीदता",  hindiF:"खरीदती"},
  {base:"sell",       s:"sells",       hindiM:"बेचता",   hindiF:"बेचती"},
  {base:"speak",      s:"speaks",      hindiM:"बोलता",   hindiF:"बोलती"},
  {base:"listen",     s:"listens",     hindiM:"सुनता",   hindiF:"सुनती"},
  {base:"sing",       s:"sings",       hindiM:"गाता",    hindiF:"गाती"},
  {base:"dance",      s:"dances",      hindiM:"नाचता",   hindiF:"नाचती"},
  {base:"drive",      s:"drives",      hindiM:"चलाता",   hindiF:"चलाती"},
  {base:"travel",     s:"travels",     hindiM:"यात्रा करता",hindiF:"यात्रा करती"},
  {base:"visit",      s:"visits",      hindiM:"जाता",    hindiF:"जाती"},
  {base:"help",       s:"helps",       hindiM:"मदद करता",hindiF:"मदद करती"},
  {base:"use",        s:"uses",        hindiM:"इस्तेमाल करता",hindiF:"इस्तेमाल करती"},
  {base:"like",       s:"likes",       hindiM:"पसंद करता",hindiF:"पसंद करती"},
  {base:"love",       s:"loves",       hindiM:"प्यार करता",hindiF:"प्यार करती"},
  {base:"know",       s:"knows",       hindiM:"जानता",   hindiF:"जानती"},
  {base:"understand", s:"understands", hindiM:"समझता",   hindiF:"समझती"},
  {base:"think",      s:"thinks",      hindiM:"सोचता",   hindiF:"सोचती"},
  {base:"want",       s:"wants",       hindiM:"चाहता",   hindiF:"चाहती"},
  {base:"need",       s:"needs",       hindiM:"ज़रूरत है",hindiF:"ज़रूरत है"},
  {base:"ask",        s:"asks",        hindiM:"पूछता",   hindiF:"पूछती"},
  {base:"call",       s:"calls",       hindiM:"फ़ोन करता",hindiF:"फ़ोन करती"},
  {base:"meet",       s:"meets",       hindiM:"मिलता",   hindiF:"मिलती"},
  {base:"send",       s:"sends",       hindiM:"भेजता",   hindiF:"भेजती"},
  {base:"check",      s:"checks",      hindiM:"चेक करता",hindiF:"चेक करती"},
  {base:"open",       s:"opens",       hindiM:"खोलता",   hindiF:"खोलती"},
  {base:"close",      s:"closes",      hindiM:"बंद करता",hindiF:"बंद करती"},
  {base:"start",      s:"starts",      hindiM:"शुरू करता",hindiF:"शुरू करती"},
  {base:"finish",     s:"finishes",    hindiM:"खत्म करता",hindiF:"खत्म करती"},
  {base:"try",        s:"tries",       hindiM:"कोशिश करता",hindiF:"कोशिश करती"},
  {base:"enjoy",      s:"enjoys",      hindiM:"enjoy करता",hindiF:"enjoy करती"},
  {base:"remember",   s:"remembers",   hindiM:"याद रखता",hindiF:"याद रखती"},
  {base:"forget",     s:"forgets",     hindiM:"भूल जाता",hindiF:"भूल जाती"},
  {base:"earn",       s:"earns",       hindiM:"कमाता",   hindiF:"कमाती"},
  {base:"spend",      s:"spends",      hindiM:"खर्च करता",hindiF:"खर्च करती"},
  {base:"save",       s:"saves",       hindiM:"बचाता",   hindiF:"बचाती"},
  {base:"join",       s:"joins",       hindiM:"join करता",hindiF:"join करती"},
  {base:"attend",     s:"attends",     hindiM:"attend करता",hindiF:"attend करती"},
  {base:"prepare",    s:"prepares",    hindiM:"तैयारी करता",hindiF:"तैयारी करती"},
  {base:"plan",       s:"plans",       hindiM:"plan करता",hindiF:"plan करती"},
  {base:"exercise",   s:"exercises",   hindiM:"exercise करता",hindiF:"exercise करती"},
  {base:"swim",       s:"swims",       hindiM:"तैरता",   hindiF:"तैरती"},
  {base:"paint",      s:"paints",      hindiM:"paint करता",hindiF:"paint करती"},
  {base:"draw",       s:"draws",       hindiM:"draw करता",hindiF:"draw करती"},
  {base:"repair",     s:"repairs",     hindiM:"ठीक करता",hindiF:"ठीक करती"},
  {base:"ride",       s:"rides",       hindiM:"चलाता",   hindiF:"चलाती"},
  {base:"carry",      s:"carries",     hindiM:"ले जाता",  hindiF:"ले जाती"},
  {base:"bring",      s:"brings",      hindiM:"लाता",    hindiF:"लाती"},
  {base:"take",       s:"takes",       hindiM:"लेता",    hindiF:"लेती"},
  {base:"give",       s:"gives",       hindiM:"देता",    hindiF:"देती"},
  {base:"show",       s:"shows",       hindiM:"दिखाता",  hindiF:"दिखाती"},
  {base:"share",      s:"shares",      hindiM:"share करता",hindiF:"share करती"},
  {base:"follow",     s:"follows",     hindiM:"follow करता",hindiF:"follow करती"},
  {base:"explain",    s:"explains",    hindiM:"समझाता",  hindiF:"समझाती"},
  {base:"manage",     s:"manages",     hindiM:"manage करता",hindiF:"manage करती"},
  {base:"reach",      s:"reaches",     hindiM:"पहुँचता", hindiF:"पहुँचती"},
  {base:"search",     s:"searches",    hindiM:"ढूँढता",  hindiF:"ढूँढती"},
  {base:"type",       s:"types",       hindiM:"type करता",hindiF:"type करती"},
  {base:"upload",     s:"uploads",     hindiM:"upload करता",hindiF:"upload करती"},
  {base:"download",   s:"downloads",   hindiM:"download करता",hindiF:"download करती"},
  {base:"charge",     s:"charges",     hindiM:"charge करता",hindiF:"charge करती"},
  {base:"practice",   s:"practices",   hindiM:"practice करता",hindiF:"practice करती"},
  {base:"train",      s:"trains",      hindiM:"train करता",hindiF:"train करती"},
  {base:"win",        s:"wins",        hindiM:"जीतता",   hindiF:"जीतती"},
  {base:"celebrate",  s:"celebrates",  hindiM:"celebrate करता",hindiF:"celebrate करती"},
  {base:"invite",     s:"invites",     hindiM:"invite करता",hindiF:"invite करती"},
  {base:"accept",     s:"accepts",     hindiM:"accept करता",hindiF:"accept करती"},
  {base:"order",      s:"orders",      hindiM:"order करता",hindiF:"order करती"},
  {base:"pay",        s:"pays",        hindiM:"pay करता",hindiF:"pay करती"},
  {base:"return",     s:"returns",     hindiM:"वापस करता",hindiF:"वापस करती"},
  {base:"choose",     s:"chooses",     hindiM:"चुनता",   hindiF:"चुनती"},
  {base:"apply",      s:"applies",     hindiM:"apply करता",hindiF:"apply करती"},
  {base:"wait",       s:"waits",       hindiM:"इंतज़ार करता",hindiF:"इंतज़ार करती"},
  {base:"borrow",     s:"borrows",     hindiM:"उधार लेता",hindiF:"उधार लेती"},
  {base:"score",      s:"scores",      hindiM:"score करता",hindiF:"score करती"},
  {base:"miss",       s:"misses",      hindiM:"miss करता",hindiF:"miss करती"},
  {base:"print",      s:"prints",      hindiM:"print करता",hindiF:"print करती"},
  {base:"click",      s:"clicks",      hindiM:"click करता",hindiF:"click करती"},
  {base:"handle",     s:"handles",     hindiM:"handle करता",hindiF:"handle करती"},
  {base:"answer",     s:"answers",     hindiM:"जवाब देता",hindiF:"जवाब देती"},
  {base:"feel",       s:"feels",       hindiM:"महसूस करता",hindiF:"महसूस करती"},
  {base:"fix",        s:"fixes",       hindiM:"ठीक करता",hindiF:"ठीक करती"},
];

const objects = [
  {eng:"tea",             hindi:"चाय"},
  {eng:"coffee",          hindi:"coffee"},
  {eng:"water",           hindi:"पानी"},
  {eng:"food",            hindi:"खाना"},
  {eng:"rice",            hindi:"चावल"},
  {eng:"bread",           hindi:"रोटी"},
  {eng:"milk",            hindi:"दूध"},
  {eng:"fruit",           hindi:"फल"},
  {eng:"vegetables",      hindi:"सब्ज़ियाँ"},
  {eng:"pizza",           hindi:"pizza"},
  {eng:"biryani",         hindi:"biryani"},
  {eng:"a book",          hindi:"किताब"},
  {eng:"books",           hindi:"किताबें"},
  {eng:"a newspaper",     hindi:"अखबार"},
  {eng:"English",         hindi:"English"},
  {eng:"Hindi",           hindi:"Hindi"},
  {eng:"a story",         hindi:"कहानी"},
  {eng:"a letter",        hindi:"चिट्ठी"},
  {eng:"an email",        hindi:"email"},
  {eng:"a report",        hindi:"report"},
  {eng:"cricket",         hindi:"cricket"},
  {eng:"football",        hindi:"football"},
  {eng:"badminton",       hindi:"badminton"},
  {eng:"chess",           hindi:"chess"},
  {eng:"a movie",         hindi:"movie"},
  {eng:"movies",          hindi:"movies"},
  {eng:"a song",          hindi:"गाना"},
  {eng:"songs",           hindi:"गाने"},
  {eng:"music",           hindi:"music"},
  {eng:"TV",              hindi:"TV"},
  {eng:"a phone",         hindi:"phone"},
  {eng:"a laptop",        hindi:"laptop"},
  {eng:"a computer",      hindi:"computer"},
  {eng:"the internet",    hindi:"internet"},
  {eng:"social media",    hindi:"social media"},
  {eng:"a photo",         hindi:"photo"},
  {eng:"a video",         hindi:"video"},
  {eng:"a bike",          hindi:"bike"},
  {eng:"a car",           hindi:"car"},
  {eng:"the bus",         hindi:"bus"},
  {eng:"the train",       hindi:"train"},
  {eng:"school",          hindi:"school"},
  {eng:"college",         hindi:"college"},
  {eng:"the office",      hindi:"office"},
  {eng:"the market",      hindi:"बाज़ार"},
  {eng:"the hospital",    hindi:"hospital"},
  {eng:"the gym",         hindi:"gym"},
  {eng:"the temple",      hindi:"मंदिर"},
  {eng:"the park",        hindi:"park"},
  {eng:"a lesson",        hindi:"lesson"},
  {eng:"homework",        hindi:"homework"},
  {eng:"a project",       hindi:"project"},
  {eng:"a test",          hindi:"test"},
  {eng:"an exam",         hindi:"exam"},
  {eng:"results",         hindi:"results"},
  {eng:"a meeting",       hindi:"meeting"},
  {eng:"a presentation",  hindi:"presentation"},
  {eng:"a plan",          hindi:"plan"},
  {eng:"clothes",         hindi:"कपड़े"},
  {eng:"shoes",           hindi:"जूते"},
  {eng:"a bag",           hindi:"bag"},
  {eng:"medicine",        hindi:"दवाई"},
  {eng:"a gift",          hindi:"gift"},
  {eng:"flowers",         hindi:"फूल"},
  {eng:"the menu",        hindi:"menu"},
  {eng:"an application",  hindi:"application"},
  {eng:"the bill",        hindi:"bill"},
  {eng:"salary",          hindi:"salary"},
  {eng:"a form",          hindi:"form"},
  {eng:"a file",          hindi:"file"},
  {eng:"the news",        hindi:"news"},
  {eng:"a recipe",        hindi:"recipe"},
  {eng:"tickets",         hindi:"tickets"},
  {eng:"a map",           hindi:"map"},
  {eng:"a joke",          hindi:"joke"},
  {eng:"a speech",        hindi:"speech"},
  {eng:"yoga",            hindi:"yoga"},
  {eng:"a diary",         hindi:"diary"},
  {eng:"notes",           hindi:"notes"},
  {eng:"a resume",        hindi:"resume"},
  {eng:"the problem",     hindi:"problem"},
  {eng:"the answer",      hindi:"जवाब"},
  {eng:"a question",      hindi:"सवाल"},
  {eng:"a drawing",       hindi:"drawing"},
  {eng:"an appointment",  hindi:"appointment"},
  {eng:"the route",       hindi:"रास्ता"},
  {eng:"prayers",         hindi:"prayer"},
  {eng:"a poem",          hindi:"कविता"},
  {eng:"a recipe",        hindi:"recipe"},
  {eng:"exercise",        hindi:"exercise"},
];

const adverbs = [
  "every day","every morning","every evening","every night",
  "every Sunday","every Monday","on weekdays","on weekends",
  "daily","regularly","always","usually","often","sometimes","rarely",
  "twice a week","once a week","in the morning","in the evening","at night",
  "at home","in school","in the office","in college","at the gym","at the park",
  "in Mumbai","in Delhi","very well","carefully","quickly","slowly",
  "together","alone","here","there","online","early","late",
];

// Named subjects — pronoun key is lowercase
const namedSubjects = [
  {name:"Ram",         pk:"he",   hindiName:"राम"},
  {name:"Priya",       pk:"she",  hindiName:"प्रिया"},
  {name:"Arjun",       pk:"he",   hindiName:"अर्जुन"},
  {name:"Meena",       pk:"she",  hindiName:"मीना"},
  {name:"Rohit",       pk:"he",   hindiName:"रोहित"},
  {name:"Sunita",      pk:"she",  hindiName:"सुनीता"},
  {name:"Kiran",       pk:"she",  hindiName:"किरण"},
  {name:"Vijay",       pk:"he",   hindiName:"विजय"},
  {name:"Anjali",      pk:"she",  hindiName:"अंजलि"},
  {name:"Suresh",      pk:"he",   hindiName:"सुरेश"},
  {name:"My father",   pk:"he",   hindiName:"मेरे पिताजी"},
  {name:"My mother",   pk:"she",  hindiName:"मेरी माँ"},
  {name:"My brother",  pk:"he",   hindiName:"मेरा भाई"},
  {name:"My sister",   pk:"she",  hindiName:"मेरी बहन"},
  {name:"My friend",   pk:"he",   hindiName:"मेरा दोस्त"},
  {name:"The teacher", pk:"she",  hindiName:"teacher"},
  {name:"The doctor",  pk:"he",   hindiName:"doctor"},
  {name:"The student", pk:"he",   hindiName:"student"},
  {name:"The driver",  pk:"he",   hindiName:"driver"},
  {name:"The chef",    pk:"he",   hindiName:"chef"},
  {name:"My uncle",    pk:"he",   hindiName:"मेरे चाचा"},
  {name:"My aunt",     pk:"she",  hindiName:"मेरी चाची"},
  {name:"My boss",     pk:"he",   hindiName:"मेरा boss"},
  {name:"The manager", pk:"he",   hindiName:"manager"},
  {name:"The girl",    pk:"she",  hindiName:"लड़की"},
  {name:"The boy",     pk:"he",   hindiName:"लड़का"},
  {name:"The team",    pk:"they", hindiName:"team"},
  {name:"The students",pk:"they", hindiName:"students"},
  {name:"The workers", pk:"they", hindiName:"workers"},
  {name:"My parents",  pk:"they", hindiName:"मेरे माता-पिता"},
];

// ─── HELPERS ────────────────────────────────────────────────────────────────────
function isSForm(pk) { return pk==="he"||pk==="she"||pk==="it"; }
function getVF(verb, pk) { return isSForm(pk) ? verb.s : verb.base; }
function getWrongVF(verb, pk) { return isSForm(pk) ? verb.base : verb.s; }
function getSubj(pk) { return subjects[pk]; }
function cap(str) { return str.charAt(0).toUpperCase()+str.slice(1); }
function verbHindi(verb, pk) { return isSForm(pk) ? verb.hindiF : verb.hindiM; }

function dedup(items, keyFn) {
  const seen = new Set();
  return items.filter(item => {
    const k = keyFn(item).toLowerCase().trim().replace(/\s+/g," ");
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function assignIds(items) {
  return items.map((item,i)=>({...item,id:i+1}));
}

// ─── 1. SVO STRUCTURE ─────────────────────────────────────────────────────────
function generateSVOPractice() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // A: pronoun + verb + object
  for (const pk of pks) {
    const sub = subjects[pk];
    for (const verb of verbs) {
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,28)) {
        const suffix = isSForm(pk) ? " है।" : " हैं।";
        const hindi = `${sub.hindi} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${vf} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives: [],
          hint: `${sub.pronoun} + ${vf} + ${obj.eng} (SVO order)`,
          explanation: `SVO order: ${sub.pronoun} (Subject) → ${vf} (Verb) → ${obj.eng} (Object). Hindi mein verb end mein hoti hai, English mein beech mein.`,
          difficulty: isSForm(pk) ? "medium" : "easy",
          tags: ["svo-structure","simple-present",`pronoun-${pk}`],
          grammarRule: "Subject + Verb + Object",
          category: "SVO Structure",
          sectionId: "svo-structure",
        });
      }
    }
  }

  // B: named subject + verb + object
  for (const ns of namedSubjects) {
    const { pk } = ns;
    for (const verb of verbs.slice(0,30)) {
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,14)) {
        const suffix = (pk==="they") ? " हैं।" : isSForm(pk) ? " है।" : " हैं।";
        const hindi = `${ns.hindiName} ${obj.hindi} ${vh}${suffix}`;
        const english = `${ns.name} ${vf} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives: [],
          hint: `${ns.name} (Subject) + ${vf} (Verb) + ${obj.eng} (Object)`,
          explanation: `SVO: ${ns.name} = Subject, ${vf} = Verb, ${obj.eng} = Object. Verb middle mein aata hai.`,
          difficulty: isSForm(pk) ? "medium" : "easy",
          tags: ["svo-structure","named-subject"],
          grammarRule: "Subject + Verb + Object",
          category: "SVO Structure",
          sectionId: "svo-structure",
        });
      }
    }
  }

  // C: pronoun + verb + object + adverb
  for (const pk of pks) {
    const sub = subjects[pk];
    for (let vi = 0; vi < Math.min(25,verbs.length); vi++) {
      const verb = verbs[vi];
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (let ai = 0; ai < 10; ai++) {
        const adv = adverbs[ai];
        const obj = objects[(vi*3+ai) % objects.length];
        const suffix = isSForm(pk) ? " है।" : " हैं।";
        const hindi = `${sub.hindi} ${adv} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${vf} ${obj.eng} ${adv}.`;
        items.push({
          hindi, english,
          alternatives: [],
          hint: `Subject + Verb + Object + Adverb`,
          explanation: `SVO ke baad adverb: ${sub.pronoun} ${vf} ${obj.eng} ${adv}.`,
          difficulty: "medium",
          tags: ["svo-structure","with-adverb"],
          grammarRule: "Subject + Verb + Object (+ Adverb)",
          category: "SVO Structure",
          sectionId: "svo-structure",
        });
      }
    }
  }

  // D: compound with and/but/because
  const conjs = [{c:"and",h:"और"},{c:"but",h:"लेकिन"},{c:"because",h:"क्योंकि"}];
  for (const pk of ["i","he","she","we","they"]) {
    const sub = subjects[pk];
    for (let vi = 0; vi < 12; vi++) {
      const v1 = verbs[vi], v2 = verbs[(vi+7)%verbs.length];
      const vf1 = getVF(v1,pk), vf2 = getVF(v2,pk);
      const o1 = objects[vi%objects.length], o2 = objects[(vi+5)%objects.length];
      const vh1 = verbHindi(v1,pk), vh2 = verbHindi(v2,pk);
      for (const conj of conjs) {
        const suffix = isSForm(pk) ? " है" : " हैं";
        const hindi = `${sub.hindi} ${o1.hindi} ${vh1}${suffix} ${conj.h} ${o2.hindi} भी ${vh2}${suffix}।`;
        const english = `${sub.pronoun} ${vf1} ${o1.eng} ${conj.c} ${sub.pronoun.toLowerCase()} ${vf2} ${o2.eng}.`;
        items.push({
          hindi, english,
          alternatives: [],
          hint: `Compound SVO: S+V+O ${conj.c} S+V+O`,
          explanation: `Do SVO clauses ko '${conj.c}' se connect kiya. Dono mein SVO order maintain hoti hai.`,
          difficulty: "hard",
          tags: ["svo-structure","compound-sentence",`conjunction-${conj.c}`],
          grammarRule: "S+V+O (compound)",
          category: "SVO Structure",
          sectionId: "svo-structure",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.hindi).slice(0,950));
}

function generateSVOTest() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // Type 1: translate Hindi → pick correct English SVO
  for (const pk of pks) {
    const sub = subjects[pk];
    for (const verb of verbs.slice(0,35)) {
      const vf = getVF(verb, pk);
      const wv = getWrongVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,8)) {
        const suffix = isSForm(pk) ? " है।" : " हैं।";
        const correct = `${sub.pronoun} ${vf} ${obj.eng}.`;
        const w1 = `${sub.pronoun} ${obj.eng} ${vf}.`;   // SOV
        const w2 = `${vf} ${sub.pronoun} ${obj.eng}.`;   // VSO
        const w3 = `${sub.pronoun} ${wv} ${obj.eng}.`;   // wrong verb form
        items.push({
          type:"mcq",
          question:`'${sub.hindi} ${obj.hindi} ${vh}${suffix}' — सही English translation?`,
          options:[correct,w1,w2,w3],
          correct:"A",
          explanation:`SVO: ${sub.pronoun} (S) + ${vf} (V) + ${obj.eng} (O). Hindi jaise verb end mein nahi rakhte. Option B aur C word-order galat, D mein verb form galat.`,
          difficulty: isSForm(pk) ? "medium" : "easy",
          marks:1, category:"SVO Structure", sectionId:"svo-structure",
        });
      }
    }
  }

  // Type 2: spot correct sentence among word-order errors
  for (const pk of ["he","she","i","we","they"]) {
    const sub = subjects[pk];
    for (const verb of verbs.slice(0,18)) {
      const vf = getVF(verb, pk);
      for (const obj of objects.slice(0,6)) {
        const correct = `${sub.pronoun} ${vf} ${obj.eng}.`;
        const sov = `${sub.pronoun} ${obj.eng} ${vf}.`;
        const vso = `${vf} ${sub.pronoun} ${obj.eng}.`;
        const osv = `${obj.eng} ${sub.pronoun} ${vf}.`;
        items.push({
          type:"mcq",
          question:`Choose the grammatically correct sentence (SVO):`,
          options:[sov,vso,correct,osv],
          correct:"C",
          explanation:`'${correct}' sahi SVO order hai. Baaki options mein word order galat hai — English mein verb hamesha subject ke baad aur object ke pehle aata hai.`,
          difficulty:"medium",
          marks:1, category:"SVO Structure", sectionId:"svo-structure",
        });
      }
    }
  }

  // Type 3: named subject MCQ
  for (const ns of namedSubjects.slice(0,18)) {
    const { pk } = ns;
    for (const verb of verbs.slice(0,12)) {
      const vf = getVF(verb, pk);
      const wv = getWrongVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,4)) {
        const suffix = (pk==="they")?" हैं।":isSForm(pk)?" है।":" हैं।";
        const correct = `${ns.name} ${vf} ${obj.eng}.`;
        const w1 = `${ns.name} ${obj.eng} ${vf}.`;
        const w2 = `${ns.name} ${wv} ${obj.eng}.`;
        const w3 = `${vf} ${ns.name} ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`'${ns.hindiName} ${obj.hindi} ${vh}${suffix}' — Correct English?`,
          options:[correct,w1,w2,w3],
          correct:"A",
          explanation:`SVO: ${ns.name} + ${vf} + ${obj.eng}. B mein word-order (SOV) galat, C mein verb form galat, D mein verb pehle aa gaya (VSO).`,
          difficulty: isSForm(pk) ? "medium" : "easy",
          marks:1, category:"SVO Structure", sectionId:"svo-structure",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.question).slice(0,350));
}

// ─── 2. SIMPLE PRESENT POSITIVE ───────────────────────────────────────────────
function generateSPPosPractice() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // A: pronoun + verb + object
  for (const pk of pks) {
    const sub = subjects[pk];
    for (const verb of verbs) {
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,12)) {
        const suffix = isSForm(pk)?" है।":" हैं।";
        const hindi = `${sub.hindi} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${vf} ${obj.eng}.`;
        const rule = isSForm(pk)
          ? `He/She/It + ${verb.base}→${vf}`
          : `${sub.pronoun} + base verb (${vf})`;
        items.push({
          hindi, english,
          alternatives:[],
          hint: rule,
          explanation: isSForm(pk)
            ? `He/She/It ke saath verb mein s/es lagta hai: ${verb.base}→${vf}.`
            : `${sub.pronoun} ke saath base verb: ${vf}.`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["simple-present-positive",`pronoun-${pk}`,"positive"],
          grammarRule: isSForm(pk)?"He/She/It + V+s/es":"I/We/You/They + base verb",
          category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  // B: pronoun + verb + object + adverb
  for (const pk of pks) {
    const sub = subjects[pk];
    for (let vi = 0; vi < Math.min(30,verbs.length); vi++) {
      const verb = verbs[vi];
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (let ai = 0; ai < 8; ai++) {
        const adv = adverbs[ai];
        const obj = objects[(vi*2+ai)%objects.length];
        const suffix = isSForm(pk)?" है।":" हैं।";
        const hindi = `${sub.hindi} ${adv} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${vf} ${obj.eng} ${adv}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${sub.pronoun} + ${vf} + ${obj.eng} + frequency adverb`,
          explanation:`Simple Present mein frequency adverb: ${english}`,
          difficulty:"medium",
          tags:["simple-present-positive","frequency-adverb"],
          grammarRule: isSForm(pk)?"He/She/It + V+s/es":"I/We/You/They + base verb",
          category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  // C: named subjects
  for (const ns of namedSubjects) {
    const { pk } = ns;
    for (const verb of verbs.slice(0,25)) {
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,8)) {
        const suffix = (pk==="they")?" हैं।":isSForm(pk)?" है।":" हैं।";
        const hindi = `${ns.hindiName} ${obj.hindi} ${vh}${suffix}`;
        const english = `${ns.name} ${vf} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${ns.name}→${isSForm(pk)?"3rd sing.":ns.pk} → ${vf}`,
          explanation: isSForm(pk)
            ? `${ns.name} = 3rd person singular. ${verb.base}→${vf}.`
            : `${ns.name} (${cap(pk)}) ke saath base verb: ${vf}.`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["simple-present-positive","named-subject"],
          grammarRule: isSForm(pk)?"He/She/It + V+s/es":"They/We + base verb",
          category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.hindi).slice(0,950));
}

function generateSPPosTest() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // Type 1: fill blank verb form
  for (const pk of pks) {
    const sub = subjects[pk];
    for (const verb of verbs.slice(0,40)) {
      const vf = getVF(verb, pk);
      const wv = getWrongVF(verb, pk);
      for (const obj of objects.slice(0,7)) {
        items.push({
          type:"mcq",
          question:`'${sub.pronoun} ___ ${obj.eng}.' — Choose the correct verb form:`,
          options:[vf, wv, `is ${verb.base}`, `are ${verb.base}`],
          correct:"A",
          explanation: isSForm(pk)
            ? `${sub.pronoun} (3rd person singular) → ${verb.base}+s/es = ${vf}.`
            : `${sub.pronoun} ke saath base verb (${vf}) aata hai.`,
          difficulty: isSForm(pk)?"medium":"easy",
          marks:1, category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  // Type 2: choose correct sentence
  for (const pk of ["he","she","i","we","they"]) {
    const sub = subjects[pk];
    for (const verb of verbs.slice(0,25)) {
      const vf = getVF(verb, pk);
      const wv = getWrongVF(verb, pk);
      for (const obj of objects.slice(0,5)) {
        const correct = `${sub.pronoun} ${vf} ${obj.eng}.`;
        const w1 = `${sub.pronoun} ${wv} ${obj.eng}.`;
        const w2 = `${sub.pronoun} is ${verb.base} ${obj.eng}.`;
        const w3 = `${sub.pronoun} ${verb.base}ing ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`Which is correct Simple Present Positive?`,
          options:[w1, correct, w2, w3],
          correct:"B",
          explanation:`'${correct}' sahi hai. '${w1}' mein verb form galat, '${w2}' mein 'is' extra hai, '${w3}' continuous tense galat hai.`,
          difficulty:"medium",
          marks:1, category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  // Type 3: Hindi→English named subject MCQ
  for (const ns of namedSubjects.slice(0,15)) {
    const { pk } = ns;
    for (const verb of verbs.slice(0,15)) {
      const vf = getVF(verb, pk);
      const wv = getWrongVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,5)) {
        const suffix = (pk==="they")?" हैं।":isSForm(pk)?" है।":" हैं।";
        const correct = `${ns.name} ${vf} ${obj.eng}.`;
        const w1 = `${ns.name} ${wv} ${obj.eng}.`;
        const w2 = `${ns.name} is ${verb.base} ${obj.eng}.`;
        const w3 = `${ns.name} ${verb.base}ing ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`'${ns.hindiName} ${obj.hindi} ${vh}${suffix}' — Correct English?`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation: isSForm(pk)
            ? `${ns.name} = 3rd person singular. ${verb.base}→${vf}. '${w1}' mein ${wv} galat verb form.`
            : `${ns.name} ke liye base verb ${vf}. '${w1}' galat form.`,
          difficulty: isSForm(pk)?"medium":"easy",
          marks:1, category:"Simple Present Positive", sectionId:"simple-present-positive",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.question).slice(0,350));
}

// ─── 3. SIMPLE PRESENT NEGATIVE ───────────────────────────────────────────────
function generateSPNegPractice() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // A: pronoun + don't/doesn't + base verb + object
  for (const pk of pks) {
    const sub = subjects[pk];
    const neg = sub.neg;
    const fullNeg = neg==="don't"?"do not":"does not";
    for (const verb of verbs) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,12)) {
        const suffix = isSForm(pk)?" नहीं।":" नहीं।";
        const hindi = `${sub.hindi} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${neg} ${verb.base} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives:[`${sub.pronoun} ${fullNeg} ${verb.base} ${obj.eng}.`],
          hint:`${sub.pronoun} + ${neg} + base verb (no s/es after ${neg})`,
          explanation: isSForm(pk)
            ? `He/She/It ke saath 'doesn't' use hota hai aur main verb base form mein: doesn't ${verb.base} (not ${verb.s}).`
            : `${sub.pronoun} ke saath 'don't' + base verb: don't ${verb.base}.`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["simple-present-negative",`pronoun-${pk}`,"negative"],
          grammarRule: isSForm(pk)?"He/She/It + doesn't + V1":"I/We/You/They + don't + V1",
          category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  // B: with adverb
  for (const pk of pks) {
    const sub = subjects[pk];
    const neg = sub.neg;
    for (let vi = 0; vi < Math.min(20,verbs.length); vi++) {
      const verb = verbs[vi];
      const vh = verbHindi(verb, pk);
      for (let ai = 0; ai < 5; ai++) {
        const adv = adverbs[ai];
        const obj = objects[(vi*2+ai)%objects.length];
        const suffix = " नहीं।";
        const hindi = `${sub.hindi} ${adv} ${obj.hindi} ${vh}${suffix}`;
        const english = `${sub.pronoun} ${neg} ${verb.base} ${obj.eng} ${adv}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${sub.pronoun} + ${neg} + base verb + adverb`,
          explanation:`Negative mein adverb object ke baad: ${english}`,
          difficulty:"medium",
          tags:["simple-present-negative","with-adverb"],
          grammarRule: isSForm(pk)?"He/She/It + doesn't + V1":"don't + V1",
          category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  // C: named subjects
  for (const ns of namedSubjects) {
    const { pk } = ns;
    const neg = isSForm(pk)?"doesn't":"don't";
    for (const verb of verbs.slice(0,20)) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,6)) {
        const hindi = `${ns.hindiName} ${obj.hindi} ${vh} नहीं।`;
        const english = `${ns.name} ${neg} ${verb.base} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${ns.name}→${neg} + base verb`,
          explanation:`${ns.name} ke liye '${neg}' use hota hai, aur verb always base form: ${verb.base} (not ${verb.s}).`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["simple-present-negative","named-subject"],
          grammarRule: isSForm(pk)?"He/She/It + doesn't + V1":"don't + V1",
          category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.hindi).slice(0,950));
}

function generateSPNegTest() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // Type 1: choose correct negative
  for (const pk of pks) {
    const sub = subjects[pk];
    const neg = sub.neg;
    const wrongNeg = neg==="don't"?"doesn't":"don't";
    for (const verb of verbs.slice(0,40)) {
      for (const obj of objects.slice(0,6)) {
        const correct = `${sub.pronoun} ${neg} ${verb.base} ${obj.eng}.`;
        const w1 = `${sub.pronoun} ${wrongNeg} ${verb.base} ${obj.eng}.`;  // wrong helper
        const w2 = `${sub.pronoun} ${neg} ${verb.s} ${obj.eng}.`;          // s kept
        const w3 = `${sub.pronoun} not ${verb.base} ${obj.eng}.`;          // no do/does
        items.push({
          type:"mcq",
          question:`Negative sentence banao: '${sub.pronoun} ___ ${verb.base} ${obj.eng}.'`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation: isSForm(pk)
            ? `He/She/It ke saath 'doesn't' + base verb: doesn't ${verb.base}. '${w1}' galat (don't nahi), '${w2}' galat (${verb.s} doesn't ke baad nahi).`
            : `${sub.pronoun} ke saath 'don't' + base verb. '${w1}' galat (doesn't nahi chahiye ${sub.pronoun} ke saath).`,
          difficulty: isSForm(pk)?"medium":"easy",
          marks:1, category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  // Type 2: find correct negative sentence
  for (const pk of ["he","she","i","they"]) {
    const sub = subjects[pk];
    const neg = sub.neg;
    const wrongNeg = neg==="don't"?"doesn't":"don't";
    for (const verb of verbs.slice(0,25)) {
      for (const obj of objects.slice(0,5)) {
        const correct = `${sub.pronoun} ${neg} ${verb.base} ${obj.eng}.`;
        const e1 = `${sub.pronoun} ${wrongNeg} ${verb.base} ${obj.eng}.`;
        const e2 = `${sub.pronoun} ${neg} ${verb.s} ${obj.eng}.`;
        const e3 = `${sub.pronoun} not ${verb.base} ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`Which is the CORRECT simple present negative?`,
          options:[e1, e2, correct, e3],
          correct:"C",
          explanation:`'${correct}' sahi hai. '${e1}' mein wrong helper, '${e2}' mein ${neg} ke baad ${verb.s} galat (base verb chahiye), '${e3}' mein do/does missing.`,
          difficulty:"medium",
          marks:1, category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  // Type 3: named subject Hindi→English negative MCQ
  for (const ns of namedSubjects.slice(0,15)) {
    const { pk } = ns;
    const neg = isSForm(pk)?"doesn't":"don't";
    const wrongNeg = neg==="doesn't"?"don't":"doesn't";
    for (const verb of verbs.slice(0,12)) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,4)) {
        const correct = `${ns.name} ${neg} ${verb.base} ${obj.eng}.`;
        const w1 = `${ns.name} ${wrongNeg} ${verb.base} ${obj.eng}.`;
        const w2 = `${ns.name} ${neg} ${verb.s} ${obj.eng}.`;
        const w3 = `${ns.name} not ${verb.base} ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`'${ns.hindiName} ${obj.hindi} ${vh} नहीं।' — Correct English?`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation:`${ns.name} ke liye '${neg}' + base verb (${verb.base}). '${w2}' galat: ${neg} ke baad ${verb.s} nahi aata.`,
          difficulty: isSForm(pk)?"medium":"easy",
          marks:1, category:"Simple Present Negative", sectionId:"simple-present-negative",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.question).slice(0,350));
}

// ─── 4. SIMPLE PRESENT QUESTIONS ─────────────────────────────────────────────
function generateSPQPractice() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // A: Yes/No questions
  for (const pk of pks) {
    const sub = subjects[pk];
    const doesW = sub.does; // "do" or "does"
    for (const verb of verbs.slice(0,50)) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,10)) {
        const suffix = isSForm(pk)?" है?":"?";
        const hindi = `क्या ${sub.hindi} ${obj.hindi} ${vh}${suffix}`;
        const english = `${cap(doesW)} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${cap(doesW)} + ${sub.pronoun} + base verb?`,
          explanation: isSForm(pk)
            ? `He/She/It ke saath 'Does': Does ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`
            : `${sub.pronoun} ke saath 'Do': Do ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["simple-present-question","yes-no-question",`pronoun-${pk}`],
          grammarRule: isSForm(pk)?"Does + Subject + V1?":"Do + Subject + V1?",
          category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  // B: WH questions
  const whList = [
    {wh:"What",  hindiWh:"क्या",  tag:"what"},
    {wh:"Where", hindiWh:"कहाँ", tag:"where"},
    {wh:"When",  hindiWh:"कब",   tag:"when"},
    {wh:"Why",   hindiWh:"क्यों",tag:"why"},
    {wh:"How",   hindiWh:"कैसे", tag:"how"},
    {wh:"Which", hindiWh:"कौनसा",tag:"which"},
  ];
  for (const pk of pks) {
    const sub = subjects[pk];
    const doesW = sub.does;
    for (const verb of verbs.slice(0,30)) {
      const vh = verbHindi(verb, pk);
      for (const whW of whList) {
        const obj = objects[verbs.indexOf(verb)%objects.length];
        const suffix = isSForm(pk)?" है?":"?";
        const hindi = `${sub.hindi} ${whW.hindiWh} ${vh}${suffix}`;
        const english = `${whW.wh} ${doesW} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${whW.wh} + ${doesW} + ${sub.pronoun} + base verb?`,
          explanation:`WH question: ${whW.wh} (${whW.hindiWh}) + ${doesW} + ${sub.pronoun.toLowerCase()} + ${verb.base}.`,
          difficulty:"medium",
          tags:["simple-present-question","wh-question",whW.tag],
          grammarRule:"WH + Do/Does + Subject + V1?",
          category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  // C: Negative questions (Why don't/doesn't)
  for (const pk of ["he","she","i","we","they"]) {
    const sub = subjects[pk];
    const neg = subjects[pk].neg;
    for (const verb of verbs.slice(0,15)) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,6)) {
        const hindi = `${sub.hindi} ${obj.hindi} क्यों नहीं ${vh}?`;
        const english = `Why ${neg} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`Why + ${neg} + ${sub.pronoun} + base verb?`,
          explanation:`Negative question: Why + ${neg} + ${sub.pronoun.toLowerCase()} + ${verb.base} ${obj.eng}?`,
          difficulty:"hard",
          tags:["simple-present-question","negative-question","why"],
          grammarRule:"Why + don't/doesn't + Subject + V1?",
          category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.hindi).slice(0,950));
}

function generateSPQTest() {
  const items = [];
  const pks = ["i","we","you","they","he","she","it"];

  // Type 1: Yes/No question MCQ
  for (const pk of pks) {
    const sub = subjects[pk];
    const doesW = sub.does;
    const wrongDoes = doesW==="do"?"does":"do";
    for (const verb of verbs.slice(0,40)) {
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,6)) {
        const correct = `${cap(doesW)} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        const w1 = `${cap(wrongDoes)} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;  // wrong do/does
        const w2 = `${sub.pronoun} ${getVF(verb,pk)} ${obj.eng}?`;      // statement form
        const w3 = `${cap(doesW)} ${sub.pronoun.toLowerCase()} ${verb.s} ${obj.eng}?`; // s kept
        items.push({
          type:"mcq",
          question:`'क्या ${sub.hindi} ${obj.hindi} ${vh}?' — Correct English question?`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation: isSForm(pk)
            ? `He/She/It ke saath 'Does': Does ${sub.pronoun.toLowerCase()} ${verb.base}? '${w3}' galat kyunki does ke baad ${verb.s} nahi aata.`
            : `${sub.pronoun} ke saath 'Do': Do ${sub.pronoun.toLowerCase()} ${verb.base}? '${w1}' mein does galat.`,
          difficulty: isSForm(pk)?"medium":"easy",
          marks:1, category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  // Type 2: WH question MCQ
  const whList = [
    {wh:"What",hindiWh:"क्या"},
    {wh:"Where",hindiWh:"कहाँ"},
    {wh:"When",hindiWh:"कब"},
    {wh:"Why",hindiWh:"क्यों"},
    {wh:"How",hindiWh:"कैसे"},
  ];
  for (const pk of ["i","you","he","she","they"]) {
    const sub = subjects[pk];
    const doesW = sub.does;
    for (const verb of verbs.slice(0,20)) {
      for (const whW of whList) {
        const obj = objects[verbs.indexOf(verb)%objects.length];
        const correct = `${whW.wh} ${doesW} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        const w1 = `${whW.wh} ${sub.pronoun.toLowerCase()} ${doesW} ${verb.base} ${obj.eng}?`; // order error
        const w2 = `${whW.wh} ${doesW} ${sub.pronoun.toLowerCase()} ${verb.s} ${obj.eng}?`;   // s kept
        const w3 = `${whW.wh} ${sub.pronoun} ${verb.base} ${obj.eng}?`;  // no do/does
        items.push({
          type:"mcq",
          question:`'${sub.hindi} ${whW.hindiWh} ${verb.hindiM}?' — सही English question?`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation:`WH question: ${whW.wh} + ${doesW} + ${sub.pronoun.toLowerCase()} + ${verb.base}. '${w1}' mein order galat, '${w3}' mein do/does missing.`,
          difficulty:"medium",
          marks:1, category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  // Type 3: error identification
  for (const pk of ["he","she","i","we"]) {
    const sub = subjects[pk];
    const doesW = sub.does;
    const wrongDoes = doesW==="do"?"does":"do";
    for (const verb of verbs.slice(0,15)) {
      for (const obj of objects.slice(0,4)) {
        const correct = `${cap(doesW)} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        const e1 = `${cap(wrongDoes)} ${sub.pronoun.toLowerCase()} ${verb.base} ${obj.eng}?`;
        const e2 = `${cap(doesW)} ${sub.pronoun.toLowerCase()} ${verb.s} ${obj.eng}?`;
        const e3 = `${sub.pronoun} ${verb.s} ${obj.eng}?`;
        items.push({
          type:"mcq",
          question:`Identify the CORRECT question:`,
          options:[e1, e2, correct, e3],
          correct:"C",
          explanation:`'${correct}' sahi hai. '${e1}' mein ${wrongDoes} galat (${doesW} chahiye). '${e2}' mein ${verb.s} galat (base verb ${verb.base} chahiye). '${e3}' mein do/does missing.`,
          difficulty:"hard",
          marks:1, category:"Simple Present Questions", sectionId:"simple-present-question",
        });
      }
    }
  }

  return assignIds(dedup(items, i=>i.question).slice(0,350));
}

// ─── 5. SUBJECT PRONOUNS ─────────────────────────────────────────────────────
function generateSPronounsPractice() {
  const items = [];
  const beMap = {i:"am",we:"are",you:"are",they:"are",he:"is",she:"is",it:"is"};
  const pks = ["i","we","you","they","he","she","it"];

  const pronounInfo = [
    {pk:"i",   pronoun:"I",    hindiEquiv:"मैं",        person:"1st", number:"singular"},
    {pk:"we",  pronoun:"We",   hindiEquiv:"हम",         person:"1st", number:"plural"},
    {pk:"you", pronoun:"You",  hindiEquiv:"तुम/आप",     person:"2nd", number:"any"},
    {pk:"he",  pronoun:"He",   hindiEquiv:"वो (लड़का)", person:"3rd", number:"singular"},
    {pk:"she", pronoun:"She",  hindiEquiv:"वो (लड़की)", person:"3rd", number:"singular"},
    {pk:"it",  pronoun:"It",   hindiEquiv:"यह/वो",      person:"3rd", number:"singular"},
    {pk:"they",pronoun:"They", hindiEquiv:"वे/वो",      person:"3rd", number:"plural"},
  ];

  // A: pronoun + verb + object (all verbs × objects)
  for (const pi of pronounInfo) {
    const sub = subjects[pi.pk];
    for (const verb of verbs) {
      const vf = getVF(verb, pi.pk);
      const vh = verbHindi(verb, pi.pk);
      for (const obj of objects.slice(0,10)) {
        const suffix = isSForm(pi.pk)?" है।":" हैं।";
        const hindi = `${pi.hindiEquiv} ${obj.hindi} ${vh}${suffix}`;
        const english = `${pi.pronoun} ${vf} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${pi.hindiEquiv} = ${pi.pronoun} (${pi.person} person ${pi.number})`,
          explanation:`'${pi.hindiEquiv}' ka English pronoun '${pi.pronoun}' hai. Verb: ${vf}.`,
          difficulty: isSForm(pi.pk)?"medium":"easy",
          tags:["subject-pronouns",`pronoun-${pi.pk}`,"simple-present"],
          grammarRule:`${pi.pronoun} + ${isSForm(pi.pk)?"V+s/es":"base verb"}`,
          category:"Subject Pronouns", sectionId:"subject-pronouns",
        });
      }
    }
  }

  // B: noun → pronoun replacement (named subjects)
  for (const ns of namedSubjects) {
    const { pk } = ns;
    const pronoun = subjects[pk].pronoun;
    for (const verb of verbs.slice(0,22)) {
      const vf = getVF(verb, pk);
      const vh = verbHindi(verb, pk);
      for (const obj of objects.slice(0,8)) {
        const suffix = (pk==="they")?" हैं।":isSForm(pk)?" है।":" हैं।";
        const hindi = `${ns.hindiName} को pronoun से replace करें: ${ns.hindiName} ${obj.hindi} ${vh}${suffix}`;
        const english = `${pronoun} ${vf} ${obj.eng}.`;
        items.push({
          hindi, english,
          alternatives:[],
          hint:`${ns.name} → ${pronoun}`,
          explanation:`'${ns.name}' ko '${pronoun}' se replace karte hain. Verb accordingly: ${vf}.`,
          difficulty: isSForm(pk)?"medium":"easy",
          tags:["subject-pronouns","noun-to-pronoun"],
          grammarRule:`Replace noun with correct subject pronoun`,
          category:"Subject Pronouns", sectionId:"subject-pronouns",
        });
      }
    }
  }

  // C: be verb (am/is/are) + professions/descriptions
  const professions = [
    {eng:"a student",    hindi:"student"},
    {eng:"a teacher",    hindi:"teacher"},
    {eng:"a doctor",     hindi:"doctor"},
    {eng:"an engineer",  hindi:"engineer"},
    {eng:"a nurse",      hindi:"nurse"},
    {eng:"a manager",    hindi:"manager"},
    {eng:"a chef",       hindi:"chef"},
    {eng:"a pilot",      hindi:"pilot"},
    {eng:"a lawyer",     hindi:"lawyer"},
    {eng:"an artist",    hindi:"artist"},
    {eng:"a scientist",  hindi:"scientist"},
    {eng:"a farmer",     hindi:"farmer"},
    {eng:"a writer",     hindi:"writer"},
    {eng:"a journalist", hindi:"journalist"},
    {eng:"a businessman",hindi:"businessman"},
    {eng:"a programmer", hindi:"programmer"},
    {eng:"a singer",     hindi:"singer"},
    {eng:"a player",     hindi:"player"},
    {eng:"an officer",   hindi:"officer"},
    {eng:"a driver",     hindi:"driver"},
  ];
  for (const pi of pronounInfo) {
    const be = beMap[pi.pk];
    for (const prof of professions) {
      const hindi = `${pi.hindiEquiv} ${prof.hindi} हूँ/हो/हैं/है।`;
      const english = `${pi.pronoun} ${be} ${prof.eng}.`;
      items.push({
        hindi, english,
        alternatives:[],
        hint:`${pi.pronoun} + ${be} (be verb)`,
        explanation:`'${pi.pronoun}' ke saath be verb '${be}': ${english}`,
        difficulty:"easy",
        tags:["subject-pronouns","be-verb","profession"],
        grammarRule:"I=am, You/We/They=are, He/She/It=is",
        category:"Subject Pronouns", sectionId:"subject-pronouns",
      });
    }
  }

  return assignIds(dedup(items, i=>i.hindi).slice(0,950));
}

function generateSPronounsTest() {
  const items = [];
  const beMap = {i:"am",we:"are",you:"are",they:"are",he:"is",she:"is",it:"is"};

  const pronounInfo = [
    {pk:"i",   pronoun:"I",    hindiEquiv:"मैं",        be:"am",  verbForm:"base"},
    {pk:"we",  pronoun:"We",   hindiEquiv:"हम",         be:"are", verbForm:"base"},
    {pk:"you", pronoun:"You",  hindiEquiv:"तुम/आप",     be:"are", verbForm:"base"},
    {pk:"he",  pronoun:"He",   hindiEquiv:"वो (लड़का)", be:"is",  verbForm:"s"},
    {pk:"she", pronoun:"She",  hindiEquiv:"वो (लड़की)", be:"is",  verbForm:"s"},
    {pk:"it",  pronoun:"It",   hindiEquiv:"यह/वो",      be:"is",  verbForm:"s"},
    {pk:"they",pronoun:"They", hindiEquiv:"वे/वो",      be:"are", verbForm:"base"},
  ];

  // Type 1: choose correct pronoun for named subject
  for (const ns of namedSubjects) {
    const { pk } = ns;
    const correctP = subjects[pk].pronoun;
    const allProns = ["I","He","She","We","They","It","You"];
    const wrongs = allProns.filter(p=>p!==correctP).slice(0,3);
    const opts = [correctP, ...wrongs];
    for (const verb of verbs.slice(0,12)) {
      const obj = objects[verbs.indexOf(verb)%objects.length];
      items.push({
        type:"mcq",
        question:`'${ns.hindiName}' ko pronoun se replace karo: '${ns.hindiName} ${verbHindi(verb,pk)} ${obj.hindi}.'`,
        options: opts,
        correct:"A",
        explanation:`'${ns.name}' ke liye pronoun '${correctP}' sahi hai (${isSForm(pk)?"3rd person singular":"plural/other"}). Baki options galat category ke pronouns hain.`,
        difficulty:"easy",
        marks:1, category:"Subject Pronouns", sectionId:"subject-pronouns",
      });
    }
  }

  // Type 2: pronoun + verb agreement
  for (const pi of pronounInfo) {
    const vf_type = pi.verbForm;
    for (const verb of verbs.slice(0,30)) {
      const vf = vf_type==="s" ? verb.s : verb.base;
      const wv = vf_type==="s" ? verb.base : verb.s;
      const vh = verbHindi(verb, pi.pk);
      for (const obj of objects.slice(0,5)) {
        const correct = `${pi.pronoun} ${vf} ${obj.eng}.`;
        const w1 = `${pi.pronoun} ${wv} ${obj.eng}.`;
        const w2 = `${pi.pronoun} is ${verb.base} ${obj.eng}.`;
        const w3 = `${pi.pronoun} ${verb.base}ing ${obj.eng}.`;
        items.push({
          type:"mcq",
          question:`'${pi.hindiEquiv} ${obj.hindi} ${vh}' — Choose correct sentence:`,
          options:[correct, w1, w2, w3],
          correct:"A",
          explanation:`'${pi.pronoun}' ke saath ${vf_type==="s"?`V+s/es: ${verb.base}→${vf}`:`base verb: ${vf}`}. '${w1}' mein ${wv} galat form.`,
          difficulty: isSForm(pi.pk)?"medium":"easy",
          marks:1, category:"Subject Pronouns", sectionId:"subject-pronouns",
        });
      }
    }
  }

  // Type 3: be verb with pronoun
  const professions = ["a student","a teacher","a doctor","an engineer","a nurse","a manager","a chef","a pilot","a lawyer","an artist","a scientist","a farmer"];
  for (const pi of pronounInfo) {
    const be = pi.be;
    const allBe = ["am","is","are"].filter(b=>b!==be);
    for (const prof of professions) {
      const correct = `${pi.pronoun} ${be} ${prof}.`;
      const w1 = `${pi.pronoun} ${allBe[0]} ${prof}.`;
      const w2 = `${pi.pronoun} ${allBe[1]} ${prof}.`;
      const w3 = `${pi.pronoun} be ${prof}.`;
      items.push({
        type:"mcq",
        question:`Choose the correct sentence with '${pi.pronoun}':`,
        options:[correct, w1, w2, w3],
        correct:"A",
        explanation:`'${pi.pronoun}' ke saath '${be}' aata hai: ${correct}. '${w1}' aur '${w2}' galat be verb use karte hain.`,
        difficulty:"easy",
        marks:1, category:"Subject Pronouns", sectionId:"subject-pronouns",
      });
    }
  }

  // Type 4: "Myself" Indian English error
  const selfErrors = [
    {
      question:`Which sentence correctly introduces a person?`,
      options:["Myself Rohan.","I am Rohan.","My name Rohan.","Me am Rohan."],
      correct:"B",
      explanation:`'Myself' as subject pronoun is wrong — Indian English error. 'I am Rohan' ya 'My name is Rohan' sahi hai.`,
    },
    {
      question:`'मैं doctor हूँ।' — Correct English?`,
      options:["Myself a doctor.","I am a doctor.","Me a doctor.","Mine am a doctor."],
      correct:"B",
      explanation:`'I' is the correct subject pronoun for 1st person singular. 'Myself' subject position mein galat hai.`,
    },
    {
      question:`Which uses subject pronouns CORRECTLY?`,
      options:["Him works here.","Her is a nurse.","They study together.","Them go to school."],
      correct:"C",
      explanation:`'They' is the correct subject pronoun (plural). Him/Her/Them are object pronouns, not subject pronouns.`,
    },
    {
      question:`Choose the sentence with correct subject pronoun agreement:`,
      options:["Me loves pizza.","He love cricket.","She reads books.","They studies English."],
      correct:"C",
      explanation:`'She reads books' — She (3rd sing) + reads (V+s) sahi hai. Baki options mein pronoun-verb agreement galat hai.`,
    },
  ];
  for (const se of selfErrors) {
    items.push({ type:"mcq", ...se, difficulty:"medium", marks:1, category:"Subject Pronouns", sectionId:"subject-pronouns" });
  }

  return assignIds(dedup(items, i=>i.question).slice(0,350));
}

// ─── WRITE FILES ───────────────────────────────────────────────────────────────
function writeJSON(filePath, data) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✅ Written: ${filePath} (${data.length} items)`);
}

console.log("=== Generating SVO Structure ===");
const svoPractice = generateSVOPractice();
const svoTest     = generateSVOTest();
writeJSON("data/challenge/day-01/generated/practice/svo-structure.json", svoPractice);
writeJSON("data/challenge/day-01/generated/test/svo-structure.json", svoTest);

console.log("=== Generating Simple Present Positive ===");
const sppPractice = generateSPPosPractice();
const sppTest     = generateSPPosTest();
writeJSON("data/challenge/day-01/generated/practice/simple-present-positive.json", sppPractice);
writeJSON("data/challenge/day-01/generated/test/simple-present-positive.json", sppTest);

console.log("=== Generating Simple Present Negative ===");
const spnPractice = generateSPNegPractice();
const spnTest     = generateSPNegTest();
writeJSON("data/challenge/day-01/generated/practice/simple-present-negative.json", spnPractice);
writeJSON("data/challenge/day-01/generated/test/simple-present-negative.json", spnTest);

console.log("=== Generating Simple Present Questions ===");
const spqPractice = generateSPQPractice();
const spqTest     = generateSPQTest();
writeJSON("data/challenge/day-01/generated/practice/simple-present-question.json", spqPractice);
writeJSON("data/challenge/day-01/generated/test/simple-present-question.json", spqTest);

console.log("=== Generating Subject Pronouns ===");
const spronPractice = generateSPronounsPractice();
const spronTest     = generateSPronounsTest();
writeJSON("data/challenge/day-01/generated/practice/subject-pronouns.json", spronPractice);
writeJSON("data/challenge/day-01/generated/test/subject-pronouns.json", spronTest);

console.log("\n✨ All 10 files generated!");
