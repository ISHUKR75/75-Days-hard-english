#!/usr/bin/env node
'use strict';
const fs = require('fs');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (i * 2654435761 + arr.length) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dedup(arr, keyFn) {
  const seen = new Set();
  return arr.filter(x => {
    const k = keyFn(x).toLowerCase().trim();
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
}

function assignIDs(arr) {
  return arr.map((x, i) => ({ id: i + 1, ...x }));
}

function makeMCQOptions(correct, wrongs) {
  const all = shuffle([correct, ...wrongs.slice(0, 3)]);
  const idx = all.indexOf(correct);
  return { options: all, correct: ['A','B','C','D'][idx] };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: OBJECT PRONOUNS
// ═══════════════════════════════════════════════════════════════════════════
function buildObjectPronouns() {
  const SEC = 'object-pronouns', CAT = 'Object Pronouns';
  const practice = [];
  const test = [];

  // Pronoun reference table
  const objMap = {
    me: { subj: 'I', subHi: 'मैं', possAdj: 'my' },
    him: { subj: 'he', subHi: 'वो (लड़का)', possAdj: 'his' },
    her: { subj: 'she', subHi: 'वो (लड़की)', possAdj: 'her' },
    us: { subj: 'we', subHi: 'हम', possAdj: 'our' },
    them: { subj: 'they', subHi: 'वो (plural)', possAdj: 'their' },
    you: { subj: 'you', subHi: 'तुम', possAdj: 'your' },
    it: { subj: 'it', subHi: 'यह/वो', possAdj: 'its' },
  };

  const objPronouns = ['me','him','her','us','them','you','it'];

  // Domain contexts
  const domains = [
    { tag: 'daily-life', hi: 'रोज़मर्रा की ज़िंदगी' },
    { tag: 'family', hi: 'परिवार' },
    { tag: 'school', hi: 'स्कूल' },
    { tag: 'office', hi: 'ऑफ़िस' },
    { tag: 'travel', hi: 'यात्रा' },
    { tag: 'food', hi: 'खाना' },
    { tag: 'health', hi: 'स्वास्थ्य' },
    { tag: 'technology', hi: 'टेक्नोलॉजी' },
    { tag: 'weather', hi: 'मौसम' },
    { tag: 'shopping', hi: 'खरीदारी' },
    { tag: 'festivals', hi: 'त्योहार' },
    { tag: 'sports', hi: 'खेल' },
  ];

  // Agent nouns for subjects (Hindi → English)
  const agents = [
    { hi: 'Teacher ने', en: 'The teacher' },
    { hi: 'Manager ने', en: 'The manager' },
    { hi: 'Doctor ने', en: 'The doctor' },
    { hi: 'माँ ने', en: 'Mother' },
    { hi: 'पिता ने', en: 'Father' },
    { hi: 'Coach ने', en: 'The coach' },
    { hi: 'Boss ने', en: 'The boss' },
    { hi: 'Principal ने', en: 'The principal' },
    { hi: 'दोस्त ने', en: 'My friend' },
    { hi: 'बड़े भाई ने', en: 'My elder brother' },
    { hi: 'Nurse ने', en: 'The nurse' },
    { hi: 'Waiter ने', en: 'The waiter' },
    { hi: 'Guide ने', en: 'The guide' },
    { hi: 'Shopkeeper ने', en: 'The shopkeeper' },
    { hi: 'Company ने', en: 'The company' },
    { hi: 'Coach ने', en: 'The coach' },
    { hi: 'दादी ने', en: 'Grandmother' },
    { hi: 'Captain ने', en: 'The captain' },
    { hi: 'Director ने', en: 'The director' },
    { hi: 'Client ने', en: 'The client' },
  ];

  // Transitive verbs in past tense with Hindi
  const verbsPast = [
    { hi: 'help किया', en: 'helped', tag: 'help' },
    { hi: 'call किया', en: 'called', tag: 'communication' },
    { hi: 'inform किया', en: 'informed', tag: 'communication' },
    { hi: 'support किया', en: 'supported', tag: 'support' },
    { hi: 'encourage किया', en: 'encouraged', tag: 'motivation' },
    { hi: 'select किया', en: 'selected', tag: 'professional' },
    { hi: 'promote किया', en: 'promoted', tag: 'professional' },
    { hi: 'invite किया', en: 'invited', tag: 'social' },
    { hi: 'thank किया', en: 'thanked', tag: 'social' },
    { hi: 'forgive किया', en: 'forgave', tag: 'emotional' },
    { hi: 'punish किया', en: 'punished', tag: 'school' },
    { hi: 'remind किया', en: 'reminded', tag: 'office' },
    { hi: 'surprise किया', en: 'surprised', tag: 'social' },
    { hi: 'motivate किया', en: 'motivated', tag: 'motivation' },
    { hi: 'train किया', en: 'trained', tag: 'sports' },
    { hi: 'blame किया', en: 'blamed', tag: 'conflict' },
    { hi: 'trust किया', en: 'trusted', tag: 'social' },
    { hi: 'respect किया', en: 'respected', tag: 'social' },
    { hi: 'reject किया', en: 'rejected', tag: 'professional' },
    { hi: 'nominate किया', en: 'nominated', tag: 'professional' },
    { hi: 'arrest किया', en: 'arrested', tag: 'social' },
    { hi: 'inspire किया', en: 'inspired', tag: 'motivation' },
    { hi: 'hire किया', en: 'hired', tag: 'professional' },
    { hi: 'recommend किया', en: 'recommended', tag: 'professional' },
    { hi: 'protect किया', en: 'protected', tag: 'family' },
  ];

  // Indirect object verbs (give/send/show/tell/teach/ask)
  const verbsGive = [
    { hi: 'gift दिया', en: 'gave', obj2hi: 'एक gift', obj2en: 'a gift', tag: 'social' },
    { hi: 'letter भेजा', en: 'sent', obj2hi: 'एक letter', obj2en: 'a letter', tag: 'communication' },
    { hi: 'advice दी', en: 'gave', obj2hi: 'advice', obj2en: 'advice', tag: 'social' },
    { hi: 'खाना दिया', en: 'gave', obj2hi: 'खाना', obj2en: 'food', tag: 'food' },
    { hi: 'homework दिया', en: 'gave', obj2hi: 'homework', obj2en: 'homework', tag: 'school' },
    { hi: 'bonus दिया', en: 'gave', obj2hi: 'bonus', obj2en: 'a bonus', tag: 'office' },
    { hi: 'दवाई दी', en: 'gave', obj2hi: 'दवाई', obj2en: 'medicine', tag: 'health' },
    { hi: 'award दिया', en: 'gave', obj2hi: 'award', obj2en: 'an award', tag: 'school' },
    { hi: 'project दिया', en: 'gave', obj2hi: 'project', obj2en: 'a project', tag: 'office' },
    { hi: 'ticket दिया', en: 'gave', obj2hi: 'ticket', obj2en: 'a ticket', tag: 'travel' },
    { hi: 'scholarship दी', en: 'gave', obj2hi: 'scholarship', obj2en: 'a scholarship', tag: 'school' },
    { hi: 'laptop दिया', en: 'gave', obj2hi: 'laptop', obj2en: 'a laptop', tag: 'technology' },
    { hi: 'menu दिया', en: 'gave', obj2hi: 'menu', obj2en: 'the menu', tag: 'food' },
    { hi: 'discount दिया', en: 'gave', obj2hi: 'discount', obj2en: 'a discount', tag: 'shopping' },
  ];

  // Preposition + object pronoun
  const prepsWithHi = [
    { en: 'for', hi: 'के लिए' },
    { en: 'with', hi: 'के साथ' },
    { en: 'to', hi: 'को' },
    { en: 'about', hi: 'के बारे में' },
    { en: 'without', hi: 'के बिना' },
    { en: 'near', hi: 'के पास' },
    { en: 'behind', hi: 'के पीछे' },
    { en: 'from', hi: 'की तरफ से' },
    { en: 'towards', hi: 'की ओर' },
    { en: 'beside', hi: 'के बगल में' },
    { en: 'against', hi: 'के खिलाफ' },
    { en: 'between', hi: 'के बीच में' },
  ];

  const objPronounsFull = [
    { en: 'me', hi: 'मुझे', wrongSubj: 'I', wrongPoss: 'my', wrongPossP: 'mine' },
    { en: 'him', hi: 'उसे (male)', wrongSubj: 'he', wrongPoss: 'his', wrongPossP: 'his' },
    { en: 'her', hi: 'उसे (female)', wrongSubj: 'she', wrongPoss: 'her', wrongPossP: 'hers' },
    { en: 'us', hi: 'हमें', wrongSubj: 'we', wrongPoss: 'our', wrongPossP: 'ours' },
    { en: 'them', hi: 'उन्हें', wrongSubj: 'they', wrongPoss: 'their', wrongPossP: 'theirs' },
    { en: 'you', hi: 'तुम्हें', wrongSubj: 'you', wrongPoss: 'your', wrongPossP: 'yours' },
    { en: 'it', hi: 'इसे', wrongSubj: 'it', wrongPoss: 'its', wrongPossP: 'its' },
  ];

  const diffCycle = ['easy','easy','medium','medium','medium','hard'];
  let dc = 0;

  // BLOCK 1: Agent + transitive verb past + object pronoun (420 items = 20 agents × 21 verbs but deduped)
  for (const ag of agents) {
    for (const vb of verbsPast) {
      for (const op of objPronounsFull.slice(0, 5)) { // me/him/her/us/them
        if (op.en === 'you' || op.en === 'it') continue;
        const hindi = `${ag.hi} ${op.hi} ${vb.hi}।`;
        const english = `${ag.en} ${vb.en} ${op.en}.`;
        practice.push({
          hindi, english, alternatives: [],
          hint: `${vb.en} + ${op.en}`,
          explanation: `'${op.en}' object pronoun hai — '${vb.en}' ke baad aata hai. '${op.wrongSubj}' subject form hai, object position mein nahi aata.`,
          difficulty: diffCycle[dc++ % diffCycle.length],
          tags: ['object-pronouns', vb.tag, domains[dc % domains.length].tag],
          grammarRule: 'Subject + Verb(past) + Object Pronoun',
          category: CAT, sectionId: SEC,
        });
      }
    }
  }

  // BLOCK 2: Indirect object (give/send) sentences (280 items)
  for (const ag of agents) {
    for (const vg of verbsGive) {
      for (const op of objPronounsFull.slice(0, 5)) {
        const hindi = `${ag.hi} ${op.hi} ${vg.hi}।`;
        const english = `${ag.en} ${vg.en} ${op.en} ${vg.obj2en}.`;
        practice.push({
          hindi, english, alternatives: [],
          hint: `${vg.en} + ${op.en} + ${vg.obj2en}`,
          explanation: `'${op.en}' indirect object pronoun — '${vg.en}' ke baad person pehle aata hai. '${op.wrongSubj}' galat hoga.`,
          difficulty: diffCycle[dc++ % diffCycle.length],
          tags: ['object-pronouns', 'indirect-object', vg.tag],
          grammarRule: 'Subject + Verb + Object Pronoun (indirect)',
          category: CAT, sectionId: SEC,
        });
      }
    }
  }

  // BLOCK 3: Preposition + object pronoun sentences (168 items = 12 preps × 7 pronouns × 2 contexts)
  const prepContexts = [
    { hi: (p, o) => `यह ${o.hi} ${p.hi} है।`, en: (p, o) => `This is ${p.en} ${o.en}.` },
    { hi: (p, o) => `वो ${o.hi} ${p.hi} आया।`, en: (p, o) => `He came ${p.en} ${o.en}.` },
    { hi: (p, o) => `क्या तुम ${o.hi} ${p.hi} जाओगे?`, en: (p, o) => `Will you go ${p.en} ${o.en}?` },
  ];
  for (const pp of prepsWithHi) {
    for (const op of objPronounsFull.slice(0, 5)) {
      for (const ctx of prepContexts) {
        const hindi = ctx.hi(pp, op);
        const english = ctx.en(pp, op);
        practice.push({
          hindi, english, alternatives: [],
          hint: `${pp.en} + ${op.en}`,
          explanation: `Preposition '${pp.en}' ke baad object pronoun '${op.en}' aata hai — '${op.wrongSubj}' nahi.`,
          difficulty: pp.en === 'between' ? 'hard' : 'medium',
          tags: ['object-pronouns', 'preposition', domains[dc++ % 6].tag],
          grammarRule: 'Preposition + Object Pronoun',
          category: CAT, sectionId: SEC,
        });
      }
    }
  }

  // BLOCK 4: Hand-crafted varied sentences across all domains
  const handcrafted = [
    { h: 'वो मुझे रोज़ message करता है।', e: 'He messages me every day.', d: 'easy', tags: ['daily-life','messaging'] },
    { h: 'मैं उसे (female) रोज़ देखती हूँ।', e: 'I see her every day.', d: 'easy', tags: ['daily-life'] },
    { h: 'माँ हमें कहानी सुनाती हैं।', e: 'Mother tells us a story.', d: 'easy', tags: ['family'] },
    { h: 'मैंने उसे (male) किताब दी।', e: 'I gave him the book.', d: 'easy', tags: ['school'] },
    { h: 'वो उन्हें party में invite करेगा।', e: 'He will invite them to the party.', d: 'easy', tags: ['social'] },
    { h: 'क्या तुम उसे (female) जानते हो?', e: 'Do you know her?', d: 'easy', tags: ['social'] },
    { h: 'मैं इसे नहीं समझता।', e: "I don't understand it.", d: 'easy', tags: ['daily-life'] },
    { h: 'Boss ने उसे (female) promote किया।', e: 'The boss promoted her.', d: 'easy', tags: ['office'] },
    { h: 'दादी हमें कहानियाँ सुनाती हैं।', e: 'Grandmother tells us stories.', d: 'easy', tags: ['family'] },
    { h: 'पिता मुझे बहुत प्यार करते हैं।', e: 'Father loves me very much.', d: 'easy', tags: ['family'] },
    { h: 'मेरी बहन उसे (male) पसंद करती है।', e: 'My sister likes him.', d: 'easy', tags: ['family','social'] },
    { h: 'बच्चे उन्हें बहुत याद करते हैं।', e: 'The children miss them a lot.', d: 'easy', tags: ['family'] },
    { h: 'नाना-नानी हमें हर साल मिलने आते हैं।', e: 'My grandparents visit us every year.', d: 'medium', tags: ['family'] },
    { h: 'वो हमें Math सिखाता है।', e: 'He teaches us Math.', d: 'easy', tags: ['school'] },
    { h: 'क्या तुम मुझे swim सिखाओगे?', e: 'Will you teach me to swim?', d: 'medium', tags: ['sports'] },
    { h: 'उसने (female) मुझे photo दिखाई।', e: 'She showed me her photo.', d: 'easy', tags: ['social'] },
    { h: 'मैंने उन्हें project दिखाया।', e: 'I showed them the project.', d: 'easy', tags: ['office'] },
    { h: 'कृपया उसे (male) याद दिलाओ।', e: 'Please remind him.', d: 'easy', tags: ['office'] },
    { h: 'उन्होंने हमें dinner पर invite किया।', e: 'They invited us to dinner.', d: 'easy', tags: ['food','social'] },
    { h: 'सब उसे (female) पसंद करते हैं।', e: 'Everyone likes her.', d: 'easy', tags: ['social'] },
    { h: 'हम उन्हें हमेशा support करते हैं।', e: 'We always support them.', d: 'easy', tags: ['social'] },
    { h: 'कृपया मुझसे contact करो।', e: 'Please contact me.', d: 'easy', tags: ['professional'] },
    { h: 'मैं उसे (male) baad में contact करूँगा।', e: 'I will contact him later.', d: 'easy', tags: ['professional'] },
    { h: 'सब उसे (female) social media पर follow करते हैं।', e: 'Everyone follows her on social media.', d: 'easy', tags: ['technology'] },
    { h: 'कृपया हमसे join हो जाओ।', e: 'Please join us.', d: 'easy', tags: ['social'] },
    { h: 'उन्होंने मुझे blame किया।', e: 'They blamed me.', d: 'easy', tags: ['office'] },
    { h: 'मत उसे (male) blame करो।', e: "Don't blame him.", d: 'easy', tags: ['daily-life'] },
    { h: 'मैं उस पर (female) trust करता हूँ।', e: 'I trust her.', d: 'easy', tags: ['social'] },
    { h: 'वो हमें हर situation में protect करता है।', e: 'He protects us in every situation.', d: 'medium', tags: ['family'] },
    { h: 'कृपया उन्हें जल्दी inform करो।', e: 'Please inform them quickly.', d: 'easy', tags: ['office'] },
    { h: 'कृपया मुझे माफ करो।', e: 'Please forgive me.', d: 'easy', tags: ['social'] },
    { h: 'मैं उसे (male) माफ कर दूँगा।', e: 'I will forgive him.', d: 'easy', tags: ['social'] },
    { h: 'Driver ने हमें airport पर छोड़ दिया।', e: 'The driver dropped us at the airport.', d: 'easy', tags: ['travel'] },
    { h: 'Hotel ने हमें free breakfast दिया।', e: 'The hotel gave us free breakfast.', d: 'easy', tags: ['travel','food'] },
    { h: 'Captain ने मुझे window seat दी।', e: 'The captain gave me the window seat.', d: 'easy', tags: ['travel'] },
    { h: 'Waiter ने हमें menu दिया।', e: 'The waiter gave us the menu.', d: 'easy', tags: ['food'] },
    { h: 'Chef ने उन्हें special dish बनाई।', e: 'The chef made them a special dish.', d: 'medium', tags: ['food'] },
    { h: 'उसने (male) मुझे अपना tiffin share किया।', e: 'He shared his tiffin with me.', d: 'easy', tags: ['food','school'] },
    { h: 'बारिश ने हमें घर पर रोक दिया।', e: 'The rain kept us at home.', d: 'medium', tags: ['weather'] },
    { h: 'ठंड ने उसे (male) बीमार कर दिया।', e: 'The cold made him sick.', d: 'easy', tags: ['weather','health'] },
    { h: 'Shopkeeper ने हमें discount दिया।', e: 'The shopkeeper gave us a discount.', d: 'easy', tags: ['shopping'] },
    { h: 'उसने (female) मुझे best deal दिखाई।', e: 'She showed me the best deal.', d: 'easy', tags: ['shopping'] },
    { h: 'दादी ने हमें Diwali पर gift दिया।', e: 'Grandmother gave us a gift on Diwali.', d: 'easy', tags: ['festivals','family'] },
    { h: 'दोस्तों ने मुझे birthday पर surprise दिया।', e: 'Friends surprised me on my birthday.', d: 'easy', tags: ['festivals','social'] },
    { h: 'उसने (female) उसे (male) Holi पर रंग लगाया।', e: 'She applied color to him on Holi.', d: 'medium', tags: ['festivals'] },
    { h: 'वो मेरे साथ आया।', e: 'He came with me.', d: 'easy', tags: ['preposition','daily-life'] },
    { h: 'यह letter उसके (male) लिए है।', e: 'This letter is for him.', d: 'easy', tags: ['preposition'] },
    { h: 'मैं उसके (female) बिना नहीं रह सकता।', e: "I can't live without her.", d: 'medium', tags: ['preposition'] },
    { h: 'वो हमारे साथ है।', e: 'She is with us.', d: 'easy', tags: ['preposition'] },
    { h: 'यह उन्हीं के बारे में है।', e: 'This is about them.', d: 'easy', tags: ['preposition'] },
    { h: 'वो मेरे लिए रुका।', e: 'He waited for me.', d: 'easy', tags: ['preposition','daily-life'] },
    { h: 'मैं उसके (male) साथ gym जाता हूँ।', e: 'I go to the gym with him.', d: 'easy', tags: ['preposition','health'] },
    { h: 'यह काम उसके (female) लिए मुश्किल है।', e: 'This task is difficult for her.', d: 'easy', tags: ['preposition','office'] },
    { h: 'मुझसे बात करो।', e: 'Talk to me.', d: 'easy', tags: ['preposition'] },
    { h: 'वो मेरे घर के पास रहती है।', e: 'She lives near me.', d: 'easy', tags: ['preposition','daily-life'] },
    { h: 'वो लोग हमारे खिलाफ नहीं हैं।', e: 'They are not against us.', d: 'medium', tags: ['preposition'] },
    { h: 'वो मुझसे बड़ी है।', e: 'She is older than me.', d: 'medium', tags: ['comparison'] },
    { h: 'वो उससे (male) छोटा है।', e: 'He is younger than him.', d: 'medium', tags: ['comparison','family'] },
    { h: 'यह तुम्हारे लिए है।', e: 'This is for you.', d: 'easy', tags: ['preposition'] },
    { h: 'वो मेरे पीछे था।', e: 'He was behind me.', d: 'easy', tags: ['preposition'] },
    { h: 'वो मुझे ignore नहीं करता।', e: "He doesn't ignore me.", d: 'easy', tags: ['negation'] },
    { h: 'मैं उसे (female) नहीं जानता।', e: "I don't know her.", d: 'easy', tags: ['negation'] },
    { h: 'वो उन्हें कभी miss नहीं करती।', e: 'She never misses them.', d: 'easy', tags: ['negation'] },
    { h: 'वो मुझे जानता है लेकिन मुझसे बात नहीं करता।', e: "He knows me but doesn't talk to me.", d: 'hard', tags: ['compound'] },
    { h: 'मैंने उसे (female) बुलाया क्योंकि मुझे उसकी ज़रूरत थी।', e: 'I called her because I needed her.', d: 'hard', tags: ['compound'] },
    { h: 'वो हमें help करता है और हम उसे (male) respect करते हैं।', e: 'He helps us and we respect him.', d: 'hard', tags: ['compound'] },
    { h: 'उसने मुझे बुलाया और मुझे gift दिया।', e: 'He called me and gave me a gift.', d: 'hard', tags: ['compound','social'] },
    { h: 'उस बात ने हमें सोचने पर मजबूर किया।', e: 'That thing made us think.', d: 'hard', tags: ['compound'] },
    { h: 'IT team ने हमें नया software दिया।', e: 'The IT team gave us new software.', d: 'easy', tags: ['technology','office'] },
    { h: 'उसने (male) मुझे WiFi password बताया।', e: 'He told me the WiFi password.', d: 'easy', tags: ['technology'] },
    { h: 'App ने मुझे notification भेजी।', e: 'The app sent me a notification.', d: 'easy', tags: ['technology'] },
    { h: 'System ने हमें automatically logout कर दिया।', e: 'The system automatically logged us out.', d: 'medium', tags: ['technology'] },
    { h: 'धूप ने मुझे बहुत परेशान किया।', e: 'The sun bothered me a lot.', d: 'easy', tags: ['weather'] },
    { h: 'मौसम ने उन्हें घर से बाहर नहीं निकलने दिया।', e: "The weather didn't let them go out.", d: 'hard', tags: ['weather'] },
    { h: 'उसने (male) उसकी (female) मदद की क्योंकि वो उसे जानता था।', e: 'He helped her because he knew her.', d: 'hard', tags: ['compound'] },
    { h: 'मेरे teacher ने उसे (female) best student बताया।', e: 'My teacher called her the best student.', d: 'medium', tags: ['school'] },
    { h: 'वो हमें हमारी गलतियाँ बताता है।', e: 'He tells us our mistakes.', d: 'medium', tags: ['school','office'] },
    { h: 'उन्होंने मुझे एक बड़ी जिम्मेदारी दी।', e: 'They gave me a big responsibility.', d: 'medium', tags: ['office'] },
    { h: 'माँ ने हम सबको एक साथ बुलाया।', e: 'Mother called all of us together.', d: 'medium', tags: ['family'] },
    { h: 'प्रतियोगिता ने उन्हें बहुत motivate किया।', e: 'The competition motivated them a lot.', d: 'medium', tags: ['sports'] },
    { h: 'इस news ने मुझे हैरान कर दिया।', e: 'This news shocked me.', d: 'easy', tags: ['news'] },
    { h: 'Film ने हमें बहुत touch किया।', e: 'The film touched us deeply.', d: 'easy', tags: ['entertainment'] },
    { h: 'उसने (male) मुझे lunch पर invite किया।', e: 'He invited me for lunch.', d: 'easy', tags: ['food','social'] },
    { h: 'Examiner ने उसे (male) pass किया।', e: 'The examiner passed him.', d: 'easy', tags: ['school'] },
    { h: 'Society ने उन्हें बाहर कर दिया।', e: 'Society excluded them.', d: 'hard', tags: ['social'] },
    { h: 'Doctor ने उसे (male) bed rest बताया।', e: 'The doctor advised him to take bed rest.', d: 'medium', tags: ['health'] },
    { h: 'उसने (female) हमें अपनी wedding में बुलाया।', e: 'She invited us to her wedding.', d: 'easy', tags: ['festivals','social'] },
    { h: 'मैंने उन्हें exam से पहले तैयार किया।', e: 'I prepared them before the exam.', d: 'medium', tags: ['school'] },
    { h: 'Company ने मुझे training के लिए Pune भेजा।', e: 'The company sent me to Pune for training.', d: 'medium', tags: ['office','travel'] },
    { h: 'Festival ने हमें एक साथ ला दिया।', e: 'The festival brought us together.', d: 'medium', tags: ['festivals'] },
    { h: 'किसने उन्हें यह information दी?', e: 'Who gave them this information?', d: 'medium', tags: ['question'] },
    { h: 'मैं उसे (male) कभी नहीं भूलूँगा।', e: 'I will never forget him.', d: 'medium', tags: ['social'] },
    { h: 'वो तुम्हें personally thank करना चाहती है।', e: 'She wants to thank you personally.', d: 'medium', tags: ['professional'] },
    { h: 'इस किताब ने मुझे बहुत कुछ सिखाया।', e: 'This book taught me a lot.', d: 'easy', tags: ['books'] },
    { h: 'उसने (female) मुझे एक important deadline याद दिलाई।', e: 'She reminded me of an important deadline.', d: 'medium', tags: ['office'] },
    { h: 'Interview panel ने उसे (female) तुरंत select किया।', e: 'The interview panel selected her immediately.', d: 'medium', tags: ['office'] },
    { h: 'माँ ने हमें अच्छे संस्कार दिए।', e: 'Mother gave us good values.', d: 'medium', tags: ['family'] },
    { h: 'Diwali ने हम सबको साथ ला दिया।', e: 'Diwali brought all of us together.', d: 'medium', tags: ['festivals'] },
    { h: 'विपदा ने उन्हें मजबूत बनाया।', e: 'Adversity made them stronger.', d: 'hard', tags: ['motivation'] },
    { h: 'रात की shift ने मुझे थका दिया।', e: 'The night shift exhausted me.', d: 'medium', tags: ['office'] },
    { h: 'मौसम ने हमें घर पर रोक दिया।', e: 'The weather kept us at home.', d: 'medium', tags: ['weather'] },
    { h: 'उनकी success ने मुझे inspire किया।', e: 'Their success inspired me.', d: 'medium', tags: ['motivation'] },
    { h: 'Flood ने उन्हें बेघर कर दिया।', e: 'The flood left them homeless.', d: 'hard', tags: ['weather','social'] },
    { h: 'यह poem मुझे हमेशा रुलाती है।', e: 'This poem always makes me cry.', d: 'medium', tags: ['entertainment'] },
    { h: 'उस mentor ने हमें बहुत कुछ सिखाया।', e: 'That mentor taught us a great deal.', d: 'medium', tags: ['motivation'] },
    { h: 'Society ने उसे (female) अकेला छोड़ दिया।', e: 'Society left her alone.', d: 'hard', tags: ['social'] },
    { h: 'उसकी मेहनत ने हम सबको proud किया।', e: 'Her hard work made all of us proud.', d: 'hard', tags: ['motivation'] },
    { h: 'Coach ने हमें final match के लिए select किया।', e: 'The coach selected us for the final match.', d: 'medium', tags: ['sports'] },
    { h: 'उसकी आवाज़ ने मुझे रोक लिया।', e: 'His voice stopped me.', d: 'medium', tags: ['daily-life'] },
    { h: 'सरकार ने उन्हें free ration दिया।', e: 'The government gave them free rations.', d: 'medium', tags: ['social'] },
    { h: 'मुझे उनसे बात करनी है।', e: 'I need to talk to them.', d: 'medium', tags: ['preposition'] },
    { h: 'App ने हमें एक notification भेजी।', e: 'The app sent us a notification.', d: 'easy', tags: ['technology'] },
    { h: 'Game ने उसे (male) बहुत hours waste करवाए।', e: 'The game made him waste many hours.', d: 'hard', tags: ['technology'] },
    { h: 'उस teacher ने मुझे अपना hero बना दिया।', e: 'That teacher made me his hero.', d: 'hard', tags: ['school','motivation'] },
    { h: 'तुम्हारी बात ने उसे (female) बहुत hurt किया।', e: 'Your words hurt her a lot.', d: 'medium', tags: ['emotional'] },
    { h: 'माँ हमेशा हमें सही रास्ता दिखाती हैं।', e: 'Mother always shows us the right path.', d: 'medium', tags: ['family','motivation'] },
    { h: 'उसने (male) मुझे किसी और को refer किया।', e: 'He referred me to someone else.', d: 'hard', tags: ['professional'] },
    { h: 'मैंने उसे (female) एक किताब recommend की।', e: 'I recommended a book to her.', d: 'medium', tags: ['books','preposition'] },
    { h: 'वो उनके बारे में बहुत care करता है।', e: 'He cares a lot about them.', d: 'easy', tags: ['family','preposition'] },
    { h: 'मेरे boss ने मुझे एक नया project दिया।', e: 'My boss gave me a new project.', d: 'easy', tags: ['office'] },
    { h: 'वो तुम्हें वापस बुलाएगा।', e: 'He will call you back.', d: 'easy', tags: ['professional'] },
    { h: 'Farewell party ने उसे (male) emotional कर दिया।', e: 'The farewell party made him emotional.', d: 'medium', tags: ['office','social'] },
    { h: 'उसने (female) हम सबको inspire किया।', e: 'She inspired all of us.', d: 'medium', tags: ['motivation'] },
  ];

  for (const hc of handcrafted) {
    practice.push({
      hindi: hc.h, english: hc.e, alternatives: [],
      hint: hc.e.split(' ').slice(-2).join(' '),
      explanation: `Object pronoun correct use — verb ya preposition ke baad subject pronoun kabhi nahi aata.`,
      difficulty: hc.d,
      tags: ['object-pronouns', ...hc.tags],
      grammarRule: 'Subject + Verb + Object Pronoun',
      category: CAT, sectionId: SEC,
    });
  }

  // Deduplicate practice
  const practiceUniq = dedup(practice, x => x.hindi);
  const practiceOut = assignIDs(practiceUniq.slice(0, 950));

  // ── TEST ITEMS ──
  // Type A: Fill in blank (choose correct object pronoun)
  const fillBlanks = [
    ...objPronounsFull.flatMap(op => [
      { q: `Fill in: 'The teacher called ___ to the stage.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `'${op.en}' object pronoun — verb ke baad subject form nahi aata.`, d: 'easy' },
      { q: `Fill in: 'She helped ___ with the project.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `'${op.en}' object pronoun — helped ke baad.`, d: 'easy' },
      { q: `Fill in: 'Please call ___.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `Imperative mein bhi object pronoun '${op.en}'.`, d: 'easy' },
      { q: `Fill in: 'This gift is for ___.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `Preposition 'for' ke baad '${op.en}'.`, d: 'easy' },
      { q: `Fill in: 'I came with ___.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `Preposition 'with' ke baad '${op.en}'.`, d: 'easy' },
      { q: `Fill in: 'She reminded ___ about the deadline.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `'${op.en}' object pronoun — reminded ke baad.`, d: 'medium' },
      { q: `Fill in: 'My father trusts ___ completely.'`, opts: [op.wrongSubj, op.en, op.wrongPoss, op.wrongPossP], c: 'B', exp: `'${op.en}' object pronoun.`, d: 'medium' },
    ])
  ].filter(x => x.opts[0] !== x.opts[1]); // filter out 'you' where subj=obj

  // Type B: Spot the error
  const spotErrors = [
    { q: "Which word is wrong? 'She gave he the book.'", opts: ['She','gave','he','book'], c: 'C', exp: "'He' wrong — object pronoun 'him' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'They called we for help.'", opts: ['They','called','we','for help'], c: 'C', exp: "'We' wrong — 'us' chahiye verb ke baad.", d: 'easy' },
    { q: "Which word is wrong? 'Please inform they quickly.'", opts: ['Please','inform','they','quickly'], c: 'C', exp: "'They' wrong — 'them' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'My father loves I very much.'", opts: ['father','loves','I','very much'], c: 'C', exp: "'I' kabhi object nahi — 'me' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'He visited we last week.'", opts: ['He','visited','we','last week'], c: 'C', exp: "'We' wrong — 'us' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'She cooked for he.'", opts: ['She','cooked','for','he'], c: 'D', exp: "'He' wrong after preposition — 'him' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'I came without she.'", opts: ['I','came','without','she'], c: 'D', exp: "'She' wrong after preposition — 'her' chahiye.", d: 'easy' },
    { q: "Which word is wrong? 'He talked about we.'", opts: ['He','talked','about','we'], c: 'D', exp: "'We' wrong after preposition — 'us' chahiye.", d: 'medium' },
    { q: "Which word is wrong? 'Between you and I, this is private.'", opts: ['Between','you','and','I'], c: 'D', exp: "'I' wrong after preposition 'between' — 'me' chahiye.", d: 'hard' },
    { q: "Which word is wrong? 'The award surprised they.'", opts: ['award','surprised','they','(correct)'], c: 'C', exp: "'They' wrong — verb ke baad 'them' chahiye.", d: 'easy' },
  ];

  // Type C: Choose correct sentence
  const correctSentence = [
    { q: 'Choose the correct sentence:', opts: ['She invited I to the party.','She invited me to the party.','She invited my to the party.','She invited mine to the party.'], c: 'B', exp: "'Me' object pronoun.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['He helped she with the work.','He helped her with the work.','He helped hers with the work.','He helped herself with the work.'], c: 'B', exp: "'Her' = she ka object form.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['They gave we the books.','They gave us the books.','They gave our the books.','They gave ours the books.'], c: 'B', exp: "'Us' = we ka object form.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['I respect he a lot.','I respect him a lot.','I respect his a lot.','I respect himself a lot.'], c: 'B', exp: "'Him' object pronoun.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['She always supports they.','She always supports them.','She always supports their.','She always supports theirs.'], c: 'B', exp: "'Them' = they ka object form.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['He came with I to the office.','He came with me to the office.','He came with my to the office.','He came with mine to the office.'], c: 'B', exp: "Preposition 'with' ke baad 'me'.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['This letter is for he.','This letter is for him.','This letter is for his.','This letter is for himself.'], c: 'B', exp: "Preposition 'for' ke baad 'him'.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ["I can't live without she.","I can't live without her.","I can't live without hers.","I can't live without herself."], c: 'B', exp: "Preposition 'without' ke baad 'her'.", d: 'medium' },
    { q: 'Choose the correct sentence:', opts: ['She is talking about we.','She is talking about us.','She is talking about our.','She is talking about ours.'], c: 'B', exp: "Preposition 'about' ke baad 'us'.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['He called both he and she.','He called both him and her.','He called both his and her.','He called both him and hers.'], c: 'B', exp: "'Both him and her' — dono object pronouns.", d: 'hard' },
    { q: 'Choose the correct sentence:', opts: ['Between you and I, this is a secret.','Between you and me, this is a secret.','Between you and my, this is a secret.','Between you and mine, this is a secret.'], c: 'B', exp: "'Between you and me' — preposition ke baad object pronoun.", d: 'hard' },
    { q: 'Choose the correct sentence:', opts: ['She is smarter than I.','She is smarter than me.','She is smarter than my.','She is smarter than mine.'], c: 'B', exp: "Comparison 'than' ke baad 'me'.", d: 'hard' },
    { q: 'Choose the correct sentence:', opts: ['He knows I well.','He knows me well.','He knows my well.','He knows mine well.'], c: 'B', exp: "'Me' object pronoun.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['Please forgive I.','Please forgive me.','Please forgive my.','Please forgive mine.'], c: 'B', exp: "Imperative mein bhi 'me'.", d: 'easy' },
    { q: 'Choose the correct sentence:', opts: ['Call she immediately.','Call her immediately.','Call hers immediately.','Call herself immediately.'], c: 'B', exp: "Imperative verb ke baad 'her'.", d: 'easy' },
  ];

  // Type D: Hindi → MCQ translation
  const translateMCQ = [
    { q: "Translate: 'माँ ने हमें खाना दिया।'", opts: ['Mother gave we food.','Mother gave us food.','Mother gave our food.','Mother gave ours food.'], c: 'B', exp: "'Us' = we ka object form.", d: 'easy' },
    { q: "Translate: 'मैंने उसे (male) किताब दी।'", opts: ['I gave he the book.','I gave him the book.','I gave his the book.','I gave himself the book.'], c: 'B', exp: "'Him' = he ka object form.", d: 'easy' },
    { q: "Translate: 'Teacher ने उन्हें homework दिया।'", opts: ['The teacher gave they homework.','The teacher gave them homework.','The teacher gave their homework.','The teacher gave theirs homework.'], c: 'B', exp: "'Them' = they ka object form.", d: 'easy' },
    { q: "Translate: 'वो मुझे याद करता है।'", opts: ['He misses I.','He misses me.','He misses my.','He misses mine.'], c: 'B', exp: "'Me' = I ka object form.", d: 'easy' },
    { q: "Translate: 'क्या वो उसे (female) जानता है?'", opts: ['Does he know she?','Does he know her?','Does he know hers?','Does he know herself?'], c: 'B', exp: "'Her' = she ka object form.", d: 'easy' },
    { q: "Translate: 'वो मेरे साथ आया।'", opts: ['He came with I.','He came with me.','He came with my.','He came with mine.'], c: 'B', exp: "Preposition 'with' ke baad 'me'.", d: 'easy' },
    { q: "Translate: 'यह letter उसके (male) लिए है।'", opts: ['This is for he.','This is for him.','This is for his.','This is for himself.'], c: 'B', exp: "Preposition 'for' ke baad 'him'.", d: 'easy' },
    { q: "Translate: 'Coach ने हमें train किया।'", opts: ['The coach trained we.','The coach trained us.','The coach trained our.','The coach trained ours.'], c: 'B', exp: "'Us' object pronoun.", d: 'easy' },
    { q: "Translate: 'Police ने उन्हें arrest किया।'", opts: ['The police arrested they.','The police arrested them.','The police arrested their.','The police arrested theirs.'], c: 'B', exp: "'Them' object pronoun.", d: 'easy' },
    { q: "Translate: 'उसने (female) मुझे advice दी।'", opts: ['She gave I advice.','She gave me advice.','She gave my advice.','She gave mine advice.'], c: 'B', exp: "'Me' = I ka object form.", d: 'easy' },
    { q: "Translate: 'बारिश ने उन्हें रोका।'", opts: ['The rain stopped they.','The rain stopped them.','The rain stopped their.','The rain stopped theirs.'], c: 'B', exp: "'Them' object pronoun.", d: 'easy' },
    { q: "Translate: 'Film ने हमें बहुत touch किया।'", opts: ['The film moved we deeply.','The film moved us deeply.','The film moved our deeply.','The film moved ours deeply.'], c: 'B', exp: "'Us' = we ka object form.", d: 'easy' },
    { q: "Translate: 'इस news ने मुझे हैरान कर दिया।'", opts: ['This news shocked I.','This news shocked me.','This news shocked my.','This news shocked mine.'], c: 'B', exp: "'Me' = I ka object form.", d: 'easy' },
    { q: "Translate: 'वो तुम्हें हमेशा याद करती है।'", opts: ['She always misses your.','She always misses you.','She always misses yours.','She always misses yourself.'], c: 'B', exp: "'You' object form same hai.", d: 'easy' },
    { q: "Translate: 'उन्होंने मुझे और उसे (female) invite किया।'", opts: ['They invited I and she.','They invited me and her.','They invited me and she.','They invited I and her.'], c: 'B', exp: "Dono object pronouns: 'me' aur 'her'.", d: 'hard' },
  ];

  // Compile test items
  const allTest = [
    ...fillBlanks.map(x => ({ type: 'mcq', question: x.q, options: x.opts, correct: x.c, explanation: x.exp, difficulty: x.d, marks: 1, category: CAT, sectionId: SEC })),
    ...spotErrors.map(x => ({ type: 'mcq', question: x.q, options: x.opts, correct: x.c, explanation: x.exp, difficulty: x.d, marks: 1, category: CAT, sectionId: SEC })),
    ...correctSentence.map(x => ({ type: 'mcq', question: x.q, options: x.opts, correct: x.c, explanation: x.exp, difficulty: x.d, marks: 1, category: CAT, sectionId: SEC })),
    ...translateMCQ.map(x => ({ type: 'mcq', question: x.q, options: x.opts, correct: x.c, explanation: x.exp, difficulty: x.d, marks: 1, category: CAT, sectionId: SEC })),
  ];

  // Programmatic expansion of test items to hit 350
  const testExpVerbs = ['helped','called','informed','supported','invited','reminded','thanked','taught','selected','encouraged','trained','motivated','inspired','gave','sent'];
  const testExpObjs = [
    { en:'me', w1:'I', w2:'my', w3:'mine' },
    { en:'him', w1:'he', w2:'his', w3:'himself' },
    { en:'her', w1:'she', w2:'hers', w3:'herself' },
    { en:'us', w1:'we', w2:'our', w3:'ours' },
    { en:'them', w1:'they', w2:'their', w3:'theirs' },
  ];
  const testExpSubjs = ['The teacher','The manager','My mother','The coach','The doctor','My friend','The principal'];
  let tec = 0;
  for (const subj of testExpSubjs) {
    for (const vb of testExpVerbs) {
      for (const op of testExpObjs) {
        const opts = shuffle([op.en, op.w1, op.w2, op.w3]);
        const ci = opts.indexOf(op.en);
        allTest.push({
          type: 'mcq',
          question: `Fill in: '${subj} ${vb} ___ yesterday.'`,
          options: opts,
          correct: ['A','B','C','D'][ci],
          explanation: `'${op.en}' object pronoun — '${vb}' ke baad subject form nahi aata.`,
          difficulty: tec++ % 3 === 0 ? 'easy' : tec % 3 === 1 ? 'medium' : 'hard',
          marks: 1, category: CAT, sectionId: SEC,
        });
      }
    }
  }

  const testUniq = dedup(allTest, x => x.question);
  const testOut = assignIDs(testUniq.slice(0, 350));

  return { practice: practiceOut, test: testOut };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: POSSESSIVE ADJECTIVES
// ═══════════════════════════════════════════════════════════════════════════
function buildPossessiveAdjectives() {
  const SEC = 'possessive-adjectives', CAT = 'Possessive Adjectives';
  const practice = [];
  const test = [];

  const possAdjs = [
    { adj: 'my', hi: 'मेरा/मेरी/मेरे', wrongObj: 'me', wrongPron: 'mine', wrongRef: "I's" },
    { adj: 'your', hi: 'तुम्हारा/तुम्हारी', wrongObj: 'you', wrongPron: 'yours', wrongRef: "you's" },
    { adj: 'his', hi: 'उसका (male)', wrongObj: 'him', wrongPron: 'his', wrongRef: "he's" },
    { adj: 'her', hi: 'उसकी (female)', wrongObj: 'her', wrongPron: 'hers', wrongRef: "she's" },
    { adj: 'its', hi: 'इसका', wrongObj: 'it', wrongPron: 'its', wrongRef: "it's" },
    { adj: 'our', hi: 'हमारा/हमारी', wrongObj: 'us', wrongPron: 'ours', wrongRef: "we's" },
    { adj: 'their', hi: 'उनका/उनकी', wrongObj: 'them', wrongPron: 'theirs', wrongRef: "they's" },
  ];

  const nouns = [
    // Body/personal
    { hi: 'नाम', en: 'name' }, { hi: 'घर', en: 'house' }, { hi: 'काम', en: 'work' },
    { hi: 'किताब', en: 'book' }, { hi: 'दोस्त', en: 'friend' }, { hi: 'परिवार', en: 'family' },
    { hi: 'माँ', en: 'mother' }, { hi: 'पिता', en: 'father' }, { hi: 'भाई', en: 'brother' },
    { hi: 'बहन', en: 'sister' }, { hi: 'स्कूल', en: 'school' }, { hi: 'office', en: 'office' },
    { hi: 'phone', en: 'phone' }, { hi: 'bag', en: 'bag' }, { hi: 'pen', en: 'pen' },
    { hi: 'idea', en: 'idea' }, { hi: 'dream', en: 'dream' }, { hi: 'life', en: 'life' },
    { hi: 'job', en: 'job' }, { hi: 'teacher', en: 'teacher' }, { hi: 'car', en: 'car' },
    { hi: 'birthday', en: 'birthday' }, { hi: 'room', en: 'room' }, { hi: 'laptop', en: 'laptop' },
    { hi: 'project', en: 'project' }, { hi: 'team', en: 'team' }, { hi: 'salary', en: 'salary' },
    { hi: 'opinion', en: 'opinion' }, { hi: 'decision', en: 'decision' }, { hi: 'health', en: 'health' },
    { hi: 'dog', en: 'dog' }, { hi: 'cat', en: 'cat' }, { hi: 'city', en: 'city' },
    { hi: 'country', en: 'country' }, { hi: 'language', en: 'language' }, { hi: 'heart', en: 'heart' },
    { hi: 'story', en: 'story' }, { hi: 'future', en: 'future' }, { hi: 'child', en: 'child' },
    { hi: 'problem', en: 'problem' }, { hi: 'address', en: 'address' }, { hi: 'smile', en: 'smile' },
    { hi: 'mistake', en: 'mistake' }, { hi: 'success', en: 'success' }, { hi: 'plan', en: 'plan' },
    { hi: 'hobby', en: 'hobby' }, { hi: 'goal', en: 'goal' }, { hi: 'talent', en: 'talent' },
    { hi: 'experience', en: 'experience' }, { hi: 'bicycle', en: 'bicycle' },
  ];

  const verbsPres = ['is','was','are','were'];
  const verbSentTemplates = [
    { hi: (adj, noun) => `${noun.hi.charAt(0).toUpperCase() + noun.hi.slice(1)} ${adj.hi} है।`,
      en: (adj, noun) => `${noun.en.charAt(0).toUpperCase() + noun.en.slice(1)} is ${adj.adj}.`,
      hint: (adj, noun) => `${adj.adj} + ${noun.en}`,
      diff: 'easy' },
  ];

  // Main sentence patterns
  const sentencePatterns = [
    { hi: (adj, noun) => `यह ${adj.hi} ${noun.hi} है।`, en: (adj, noun) => `This is ${adj.adj} ${noun.en}.`, diff: 'easy' },
    { hi: (adj, noun) => `${adj.hi} ${noun.hi} बहुत अच्छा है।`, en: (adj, noun) => `${adj.adj.charAt(0).toUpperCase() + adj.adj.slice(1)} ${noun.en} is very good.`, diff: 'easy' },
    { hi: (adj, noun) => `मुझे ${adj.hi} ${noun.hi} पसंद है।`, en: (adj, noun) => `I like ${adj.adj} ${noun.en}.`, diff: 'easy' },
    { hi: (adj, noun) => `वो अपना ${adj.hi} ${noun.hi} भूल गया।`, en: (adj, noun) => `He forgot ${adj.adj} ${noun.en}.`, diff: 'medium' },
    { hi: (adj, noun) => `क्या यह ${adj.hi} ${noun.hi} है?`, en: (adj, noun) => `Is this ${adj.adj} ${noun.en}?`, diff: 'easy' },
    { hi: (adj, noun) => `${adj.hi} ${noun.hi} कहाँ है?`, en: (adj, noun) => `Where is ${adj.adj} ${noun.en}?`, diff: 'easy' },
    { hi: (adj, noun) => `वो ${adj.hi} ${noun.hi} की परवाह करती है।`, en: (adj, noun) => `She cares about ${adj.adj} ${noun.en}.`, diff: 'medium' },
    { hi: (adj, noun) => `मैंने ${adj.hi} ${noun.hi} खो दिया।`, en: (adj, noun) => `I lost ${adj.adj} ${noun.en}.`, diff: 'medium' },
  ];

  const diffCycle = ['easy','easy','medium','medium','hard'];
  let dc = 0;

  for (const pa of possAdjs) {
    for (const noun of nouns) {
      for (const pat of sentencePatterns.slice(0, 4)) {
        practice.push({
          hindi: pat.hi(pa, noun),
          english: pat.en(pa, noun),
          alternatives: [],
          hint: `${pa.adj} + ${noun.en}`,
          explanation: `'${pa.adj}' possessive adjective hai — noun '${noun.en}' ke pehle aata hai. Isse akela use nahi karte (woh possessive pronoun hoga).`,
          difficulty: diffCycle[dc++ % diffCycle.length],
          tags: ['possessive-adjectives', 'ownership', domains_pa[dc % 8]],
          grammarRule: 'Possessive Adjective + Noun',
          category: CAT, sectionId: SEC,
        });
      }
    }
  }

  // BLOCK 2: Richer sentence patterns
  const richSentences = [
    // MY
    { h: 'मेरा नाम Priya है।', e: 'My name is Priya.', d: 'easy', t: ['daily-life','introduction'] },
    { h: 'मेरे पिता एक doctor हैं।', e: 'My father is a doctor.', d: 'easy', t: ['family'] },
    { h: 'मेरी माँ बहुत hardworking हैं।', e: 'My mother is very hardworking.', d: 'easy', t: ['family'] },
    { h: 'मेरा सपना engineer बनने का है।', e: 'My dream is to become an engineer.', d: 'medium', t: ['motivation','daily-life'] },
    { h: 'मेरी बहन मुझसे बड़ी है।', e: 'My sister is older than me.', d: 'medium', t: ['family'] },
    { h: 'मेरे दोस्त बहुत helpful हैं।', e: 'My friends are very helpful.', d: 'easy', t: ['social'] },
    { h: 'मेरा घर school के पास है।', e: 'My house is near the school.', d: 'easy', t: ['daily-life'] },
    { h: 'मेरी पसंदीदा color blue है।', e: 'My favourite color is blue.', d: 'easy', t: ['daily-life'] },
    { h: 'मेरे विचार अलग हैं।', e: 'My thoughts are different.', d: 'medium', t: ['daily-life'] },
    { h: 'मेरा birthday October में है।', e: 'My birthday is in October.', d: 'easy', t: ['festivals'] },
    // YOUR
    { h: 'तुम्हारा नाम क्या है?', e: 'What is your name?', d: 'easy', t: ['introduction'] },
    { h: 'तुम्हारे teachers बहुत strict हैं।', e: 'Your teachers are very strict.', d: 'easy', t: ['school'] },
    { h: 'तुम्हारा presentation बहुत अच्छा था।', e: 'Your presentation was very good.', d: 'easy', t: ['office'] },
    { h: 'क्या यह तुम्हारी किताब है?', e: 'Is this your book?', d: 'easy', t: ['school'] },
    { h: 'तुम्हारा phone कहाँ है?', e: 'Where is your phone?', d: 'easy', t: ['technology'] },
    { h: 'तुम्हारी मदद के लिए शुक्रिया।', e: 'Thank you for your help.', d: 'medium', t: ['social'] },
    { h: 'तुम्हारी आवाज़ बहुत मधुर है।', e: 'Your voice is very sweet.', d: 'easy', t: ['daily-life'] },
    { h: 'तुम्हारा career बहुत bright है।', e: 'Your career is very bright.', d: 'medium', t: ['professional'] },
    { h: 'क्या तुम्हारा घर यहाँ पास में है?', e: 'Is your house nearby?', d: 'easy', t: ['daily-life'] },
    { h: 'तुम्हारी बात से मैं agree करता हूँ।', e: 'I agree with your point.', d: 'medium', t: ['office'] },
    // HIS
    { h: 'उसका नाम Rahul है।', e: 'His name is Rahul.', d: 'easy', t: ['introduction'] },
    { h: 'उसकी माँ बहुत प्यारी हैं।', e: 'His mother is very kind.', d: 'easy', t: ['family'] },
    { h: 'उसका phone खो गया।', e: 'His phone is lost.', d: 'easy', t: ['technology'] },
    { h: 'उसका performance बहुत अच्छा था।', e: 'His performance was very good.', d: 'easy', t: ['office','school'] },
    { h: 'उसका सपना IAS officer बनना है।', e: 'His dream is to become an IAS officer.', d: 'medium', t: ['motivation'] },
    { h: 'उसके दोस्त उसकी बहुत help करते हैं।', e: 'His friends help him a lot.', d: 'medium', t: ['social'] },
    { h: 'उसकी writing बहुत clear है।', e: 'His writing is very clear.', d: 'easy', t: ['school'] },
    { h: 'उसका interview अच्छा गया।', e: 'His interview went well.', d: 'medium', t: ['office'] },
    // HER
    { h: 'उसका नाम Neha है।', e: 'Her name is Neha.', d: 'easy', t: ['introduction'] },
    { h: 'उसकी smile बहुत beautiful है।', e: 'Her smile is very beautiful.', d: 'easy', t: ['daily-life'] },
    { h: 'उसकी बहन doctor है।', e: 'Her sister is a doctor.', d: 'easy', t: ['family'] },
    { h: 'उसका performance बेहतरीन था।', e: 'Her performance was excellent.', d: 'easy', t: ['school'] },
    { h: 'उसकी cooking बहुत tasty है।', e: 'Her cooking is very tasty.', d: 'easy', t: ['food'] },
    { h: 'उसका career बहुत successful है।', e: 'Her career is very successful.', d: 'medium', t: ['professional'] },
    { h: 'उसके teachers उसकी तारीफ करते हैं।', e: 'Her teachers praise her.', d: 'medium', t: ['school'] },
    { h: 'उसकी आँखें बहुत beautiful हैं।', e: 'Her eyes are very beautiful.', d: 'easy', t: ['daily-life'] },
    // ITS
    { h: 'इस कुत्ते का नाम Tommy है।', e: 'Its name is Tommy.', d: 'easy', t: ['daily-life'] },
    { h: 'इस phone की battery कमज़ोर है।', e: 'Its battery is weak.', d: 'easy', t: ['technology'] },
    { h: 'इस company का product बहुत अच्छा है।', e: 'Its product is very good.', d: 'easy', t: ['office'] },
    { h: 'इस पेड़ की छाया बहुत ठंडी है।', e: 'Its shade is very cool.', d: 'medium', t: ['weather'] },
    { h: 'इस school की reputation बहुत अच्छी है।', e: 'Its reputation is very good.', d: 'medium', t: ['school'] },
    // OUR
    { h: 'हमारा देश बहुत बड़ा है।', e: 'Our country is very big.', d: 'easy', t: ['general'] },
    { h: 'हमारी team बहुत strong है।', e: 'Our team is very strong.', d: 'easy', t: ['office','sports'] },
    { h: 'हमारे teacher बहुत अच्छे हैं।', e: 'Our teachers are very good.', d: 'easy', t: ['school'] },
    { h: 'हमारा घर बहुत सुंदर है।', e: 'Our house is very beautiful.', d: 'easy', t: ['daily-life'] },
    { h: 'हमारी culture बहुत rich है।', e: 'Our culture is very rich.', d: 'medium', t: ['festivals'] },
    { h: 'हमारे माता-पिता हमें बहुत प्यार करते हैं।', e: 'Our parents love us very much.', d: 'medium', t: ['family'] },
    { h: 'हमारा project time पर submit होना चाहिए।', e: 'Our project should be submitted on time.', d: 'hard', t: ['school','office'] },
    { h: 'हमारी city में traffic बहुत है।', e: 'Our city has a lot of traffic.', d: 'medium', t: ['travel'] },
    // THEIR
    { h: 'उनका घर बहुत बड़ा है।', e: 'Their house is very big.', d: 'easy', t: ['daily-life'] },
    { h: 'उनके बच्चे बहुत smart हैं।', e: 'Their children are very smart.', d: 'easy', t: ['family'] },
    { h: 'उनकी company बहुत successful है।', e: 'Their company is very successful.', d: 'easy', t: ['office'] },
    { h: 'उनका culture अलग है।', e: 'Their culture is different.', d: 'easy', t: ['festivals'] },
    { h: 'उनकी team ने match जीता।', e: 'Their team won the match.', d: 'easy', t: ['sports'] },
    { h: 'उनके dreams बहुत बड़े हैं।', e: 'Their dreams are very big.', d: 'easy', t: ['motivation'] },
    { h: 'उनकी service बहुत अच्छी है।', e: 'Their service is very good.', d: 'medium', t: ['shopping'] },
    { h: 'उनका plan बहुत clever है।', e: 'Their plan is very clever.', d: 'medium', t: ['office'] },
    // Mixed
    { h: 'यह मेरी गलती नहीं है।', e: 'This is not my mistake.', d: 'easy', t: ['daily-life'] },
    { h: 'वो अपनी hobby को serious लेता है।', e: 'He takes his hobby seriously.', d: 'hard', t: ['daily-life'] },
    { h: 'क्या यह तुम्हारा bag है या मेरा?', e: 'Is this your bag or mine?', d: 'hard', t: ['daily-life'] },
    { h: 'हमारी और उनकी teams एक साथ काम करती हैं।', e: 'Our team and their team work together.', d: 'hard', t: ['office'] },
    { h: 'मेरे और उसके (female) ideas बहुत अलग हैं।', e: 'My ideas and her ideas are very different.', d: 'hard', t: ['office'] },
    { h: 'उसका phone और उसकी (female) laptop दोनों नए हैं।', e: 'His phone and her laptop are both new.', d: 'hard', t: ['technology'] },
    { h: 'मेरी मेहनत मेरी success की वजह है।', e: 'My hard work is the reason for my success.', d: 'hard', t: ['motivation'] },
    { h: 'उनका खाना और हमारी service दोनों बेहतरीन हैं।', e: 'Their food and our service are both excellent.', d: 'hard', t: ['food','shopping'] },
  ];

  for (const s of richSentences) {
    practice.push({
      hindi: s.h, english: s.e, alternatives: [],
      hint: s.e.split(' ').slice(0, 3).join(' '),
      explanation: `Possessive adjective noun ke pehle aata hai ownership/relationship show karne ke liye.`,
      difficulty: s.d,
      tags: ['possessive-adjectives', ...s.t],
      grammarRule: 'Possessive Adjective + Noun',
      category: CAT, sectionId: SEC,
    });
  }

  const practiceUniq = dedup(practice, x => x.hindi);
  const practiceOut = assignIDs(practiceUniq.slice(0, 950));

  // ── TEST ──
  const testItems = [];

  // Fill in blank
  const paFills = [
    ...possAdjs.flatMap(pa => nouns.slice(0, 15).map(noun => ({
      q: `Fill in the blank: '___ ${noun.en} is important.'`,
      opts: shuffle([pa.adj, pa.wrongObj, pa.wrongPron, pa.wrongRef !== pa.adj ? pa.wrongRef : 'myself']),
      c: null, exp: `'${pa.adj}' possessive adjective — noun ke pehle.`, d: 'easy',
      correctAns: pa.adj,
    })))
  ];

  for (const f of paFills.slice(0, 100)) {
    const ci = f.opts.indexOf(f.correctAns);
    testItems.push({
      type: 'mcq', question: f.q, options: f.opts,
      correct: ['A','B','C','D'][ci], explanation: f.exp,
      difficulty: f.d, marks: 1, category: CAT, sectionId: SEC,
    });
  }

  // Identify possessive adjective in sentence
  const identifyPA = [
    { q: "Which word is a possessive adjective? 'My book is on the table.'", opts: ['My','book','is','table'], c: 'A', exp: "'My' is possessive adjective — noun 'book' ke pehle.", d: 'easy' },
    { q: "Which word is a possessive adjective? 'Her smile is beautiful.'", opts: ['Her','smile','is','beautiful'], c: 'A', exp: "'Her' is possessive adjective — 'smile' ke pehle.", d: 'easy' },
    { q: "Which word is a possessive adjective? 'Their plan was brilliant.'", opts: ['Their','plan','was','brilliant'], c: 'A', exp: "'Their' is possessive adjective.", d: 'easy' },
    { q: "Which word is a possessive adjective? 'His performance impressed everyone.'", opts: ['His','performance','impressed','everyone'], c: 'A', exp: "'His' is possessive adjective.", d: 'easy' },
    { q: "Which word is a possessive adjective? 'Our team won the match.'", opts: ['Our','team','won','match'], c: 'A', exp: "'Our' is possessive adjective.", d: 'easy' },
  ];
  testItems.push(...identifyPA.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // Choose correct possessive adjective
  const choosePossAdj = [
    { q: "Fill in: '___ name is Ravi.' (about him)", opts: ['Him','His','He','Himself'], c: 'B', exp: "'His' possessive adjective — 'him' object pronoun hai, noun ke pehle nahi aata.", d: 'easy' },
    { q: "Fill in: '___ mother is very kind.' (about her)", opts: ['Her','She','Hers','Herself'], c: 'A', exp: "'Her' possessive adjective — 'she' subject form hai.", d: 'easy' },
    { q: "Fill in: '___ house is very big.' (plural people)", opts: ['They','Them','Their','Theirs'], c: 'C', exp: "'Their' possessive adjective — 'they/them' pronouns, 'theirs' pronoun without noun.", d: 'easy' },
    { q: "Fill in: '___ team won the match.' (we)", opts: ['We','Us','Our','Ours'], c: 'C', exp: "'Our' possessive adjective — 'ours' akele use hota noun ke bina.", d: 'easy' },
    { q: "Fill in: 'Is this ___ book?' (you)", opts: ['You','Your','Yours','Yourself'], c: 'B', exp: "'Your' possessive adjective — noun 'book' ke pehle.", d: 'easy' },
    { q: "Fill in: 'I lost ___ phone.' (myself)", opts: ['I','Me','Mine','My'], c: 'D', exp: "'My' possessive adjective — noun ke pehle. 'Mine' akela noun replace karta hai.", d: 'easy' },
    { q: "Fill in: 'The dog wagged ___ tail.'", opts: ['it','its','it\\'s','itself'], c: 'B', exp: "'Its' possessive adjective. 'It\\'s' = 'it is' — alag cheez hai!", d: 'medium' },
    { q: "Fill in: 'The company launched ___ new product.'", opts: ['it','its','it\\'s','itself'], c: 'B', exp: "'Its' possessive adjective — company ke product ke liye.", d: 'medium' },
    { q: "Fill in: '___ birthday is tomorrow.' (she)", opts: ['She','Her','Hers','Herself'], c: 'B', exp: "'Her' possessive adjective before 'birthday'.", d: 'easy' },
    { q: "Fill in: 'Please give me ___ address.' (you)", opts: ['you','your','yours','yourself'], c: 'B', exp: "'Your' possessive adjective before noun.", d: 'easy' },
  ];
  testItems.push(...choosePossAdj.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // its vs it's
  const itsQuestions = [
    { q: "Which is correct? 'The phone lost ___ signal.'", opts: ["it's",'its','its\\'','its(s)'], c: 'B', exp: "'Its' possessive adjective. 'It\\'s' = 'it is' — yahan ownership show ho raha hai.", d: 'medium' },
    { q: "Which is correct? 'The cat licked ___ paw.'", opts: ["it's",'its','its\\'','it is'], c: 'B', exp: "'Its' = possessive. 'It\\'s' = it is.", d: 'medium' },
    { q: "Which is correct? '___ raining outside.' (it is raining)", opts: ["its",'its\\'','It\\'s','It is\\'s'], c: 'C', exp: "'It\\'s' = It is. 'Its' without apostrophe = possessive adjective.", d: 'medium' },
    { q: "Which sentence is correct?", opts: ["The company lost it's reputation.","The company lost its reputation.","The company lost their reputation (for company).","The company lost it reputation."], c: 'B', exp: "'Its' possessive adjective for company. 'It\\'s' = it is — wrong here.", d: 'medium' },
  ];
  testItems.push(...itsQuestions.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // Error spotting
  const errSpot = [
    { q: "Spot the error: 'She lost her phone but him phone was safe.'", opts: ['She','lost','her','him phone'], c: 'D', exp: "'Him phone' galat — 'him' object pronoun hai, possessive adjective 'his' chahiye.", d: 'medium' },
    { q: "Spot the error: 'We love our culture and they love they culture.'", opts: ['We love','our culture','they love','they culture'], c: 'D', exp: "'They culture' galat — 'their culture' hona chahiye.", d: 'medium' },
    { q: "Spot the error: 'I forgot me phone at home.'", opts: ['I','forgot','me phone','at home'], c: 'C', exp: "'Me phone' galat — 'me' object pronoun, possessive 'my' chahiye.", d: 'easy' },
    { q: "Spot the error: 'He shared him ideas with us.'", opts: ['He','shared','him ideas','with us'], c: 'C', exp: "'Him ideas' galat — 'him' object pronoun, 'his ideas' hona chahiye.", d: 'easy' },
    { q: "Spot the error: 'They completed they project on time.'", opts: ['They','completed','they project','on time'], c: 'C', exp: "'They project' galat — 'their project' hona chahiye.", d: 'easy' },
  ];
  testItems.push(...errSpot.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // Programmatic expansion to hit 350
  const testExpPA = [
    ...possAdjs.flatMap(pa => nouns.slice(0, 20).flatMap(noun => [
      { q: `Choose: '___ ${noun.en} is ready.' (possession by ${pa.adj.replace('our','we').replace('their','they')})`, opts: shuffle([pa.adj, pa.wrongObj, pa.wrongPron, 'self']).slice(0,4), correctAns: pa.adj, exp: `'${pa.adj}' possessive adjective before '${noun.en}'.`, d: 'easy' },
      { q: `Translate: '${pa.hi} ${noun.hi}'`, opts: shuffle([`${pa.adj} ${noun.en}`, `${pa.wrongObj} ${noun.en}`, `${pa.wrongPron} ${noun.en}`, `${pa.wrongObj}'s ${noun.en}`]).slice(0,4), correctAns: `${pa.adj} ${noun.en}`, exp: `'${pa.adj}' is the correct possessive adjective.`, d: 'easy' },
    ]))
  ];

  for (const t of testExpPA.slice(0, 180)) {
    const ci = t.opts.indexOf(t.correctAns);
    if (ci === -1) continue;
    testItems.push({
      type: 'mcq', question: t.q, options: t.opts.slice(0,4),
      correct: ['A','B','C','D'][ci], explanation: t.exp,
      difficulty: t.d, marks: 1, category: CAT, sectionId: SEC,
    });
  }

  const testUniq = dedup(testItems, x => x.question);
  const testOut = assignIDs(testUniq.slice(0, 350));

  return { practice: practiceOut, test: testOut };
}

const domains_pa = ['daily-life','family','school','office','travel','food','health','technology','weather','shopping','festivals','sports'];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: ARTICLES
// ═══════════════════════════════════════════════════════════════════════════
function buildArticles() {
  const SEC = 'articles', CAT = 'Articles';
  const practice = [];
  const test = [];

  // Nouns grouped by article type
  const aNounsCons = [
    { hi: 'किताब', en: 'book' }, { hi: 'कुत्ता', en: 'dog' }, { hi: 'लड़की', en: 'girl' },
    { hi: 'लड़का', en: 'boy' }, { hi: 'कमरा', en: 'room' }, { hi: 'car', en: 'car' },
    { hi: 'teacher', en: 'teacher' }, { hi: 'सवाल', en: 'question' }, { hi: 'बिल्ली', en: 'cat' },
    { hi: 'phone', en: 'phone' }, { hi: 'नौकरी', en: 'job' }, { hi: 'सपना', en: 'dream' },
    { hi: 'plan', en: 'plan' }, { hi: 'project', en: 'project' }, { hi: 'मीटिंग', en: 'meeting' },
    { hi: 'bus', en: 'bus' }, { hi: 'movie', en: 'movie' }, { hi: 'laptop', en: 'laptop' },
    { hi: 'problem', en: 'problem' }, { hi: 'solution', en: 'solution' }, { hi: 'birthday', en: 'birthday' },
    { hi: 'match', en: 'match' }, { hi: 'doctor', en: 'doctor' }, { hi: 'hospital', en: 'hospital' },
    { hi: 'कप', en: 'cup' }, { hi: 'ताल', en: 'pond' }, { hi: 'पेड़', en: 'tree' },
    { hi: 'concert', en: 'concert' }, { hi: 'festival', en: 'festival' }, { hi: 'गाना', en: 'song' },
  ];

  const anNounsVowel = [
    { hi: 'apple', en: 'apple', sound: 'vowel-a' },
    { hi: 'orange', en: 'orange', sound: 'vowel-o' },
    { hi: 'umbrella', en: 'umbrella', sound: 'vowel-u' },
    { hi: 'egg', en: 'egg', sound: 'vowel-e' },
    { hi: 'animal', en: 'animal', sound: 'vowel-a' },
    { hi: 'island', en: 'island', sound: 'vowel-i' },
    { hi: 'engineer', en: 'engineer', sound: 'vowel-e' },
    { hi: 'actor', en: 'actor', sound: 'vowel-a' },
    { hi: 'office', en: 'office', sound: 'vowel-o' },
    { hi: 'exam', en: 'exam', sound: 'vowel-e' },
    { hi: 'idea', en: 'idea', sound: 'vowel-i' },
    { hi: 'accident', en: 'accident', sound: 'vowel-a' },
    { hi: 'email', en: 'email', sound: 'vowel-e' },
    { hi: 'air conditioner', en: 'air conditioner', sound: 'vowel-a' },
    { hi: 'honor', en: 'honor', sound: 'vowel-h-silent' }, // "an honor"
    { hi: 'hour', en: 'hour', sound: 'vowel-h-silent' },
    { hi: 'honest person', en: 'honest person', sound: 'vowel-h-silent' },
    { hi: 'MBA', en: 'MBA', sound: 'vowel-m-em' },
    { hi: 'FIR', en: 'FIR', sound: 'vowel-f-ef' },
    { hi: 'MRI', en: 'MRI', sound: 'vowel-m-em' },
  ];

  const theNouns = [
    { hi: 'सूरज', en: 'sun' }, { hi: 'चाँद', en: 'moon' }, { hi: 'आसमान', en: 'sky' },
    { hi: 'पृथ्वी', en: 'earth' }, { hi: 'समुद्र', en: 'sea' }, { hi: 'Ganga नदी', en: 'Ganges' },
    { hi: 'Taj Mahal', en: 'Taj Mahal' }, { hi: 'Prime Minister', en: 'Prime Minister' },
    { hi: 'President', en: 'President' }, { hi: 'best student', en: 'best student' },
    { hi: 'nearest hospital', en: 'nearest hospital' }, { hi: 'last train', en: 'last train' },
    { hi: 'first question', en: 'first question' }, { hi: 'same problem', en: 'same problem' },
    { hi: 'only option', en: 'only option' }, { hi: 'main door', en: 'main door' },
    { hi: 'capital city', en: 'capital city' }, { hi: 'highest peak', en: 'highest peak' },
    { hi: 'richest person', en: 'richest person' }, { hi: 'tallest building', en: 'tallest building' },
  ];

  const zeroNounsPlural = [
    { hi: 'कुत्ते', en: 'Dogs', plural: true },
    { hi: 'बच्चे', en: 'Children', plural: true },
    { hi: 'लोग', en: 'People', plural: true },
    { hi: 'students', en: 'Students', plural: true },
    { hi: 'teachers', en: 'Teachers', plural: true },
    { hi: 'birds', en: 'Birds', plural: true },
    { hi: 'doctors', en: 'Doctors', plural: true },
  ];

  const zeroNounsUncount = [
    { hi: 'पानी', en: 'Water', unc: true },
    { hi: 'दूध', en: 'Milk', unc: true },
    { hi: 'चाय', en: 'Tea', unc: true },
    { hi: 'knowledge', en: 'Knowledge', unc: true },
    { hi: 'advice', en: 'Advice', unc: true },
    { hi: 'information', en: 'Information', unc: true },
    { hi: 'furniture', en: 'Furniture', unc: true },
    { hi: 'money', en: 'Money', unc: true },
    { hi: 'patience', en: 'Patience', unc: true },
    { hi: 'rice', en: 'Rice', unc: true },
  ];

  const diffCycle = ['easy','easy','medium','medium','hard'];
  let dc = 0;

  // A + consonant noun
  for (const noun of aNounsCons) {
    practice.push({
      hindi: `मैंने एक ${noun.hi} देखा।`,
      english: `I saw a ${noun.en}.`,
      alternatives: [],
      hint: `a + ${noun.en} (consonant sound)`,
      explanation: `'${noun.en}' consonant sound se shuru hota hai, isliye 'a' use karte hain.`,
      difficulty: diffCycle[dc++ % diffCycle.length],
      tags: ['articles', 'a-an', 'consonant-sound', domains_pa[dc % 12]],
      grammarRule: 'a + consonant sound noun',
      category: CAT, sectionId: SEC,
    });
    practice.push({
      hindi: `वो एक ${noun.hi} है।`,
      english: `He is a ${noun.en}.`,
      alternatives: [],
      hint: `a + ${noun.en}`,
      explanation: `Consonant sound ke saath 'a' article.`,
      difficulty: diffCycle[dc++ % diffCycle.length],
      tags: ['articles', 'a-an'],
      grammarRule: 'a + consonant sound noun',
      category: CAT, sectionId: SEC,
    });
    practice.push({
      hindi: `मुझे एक ${noun.hi} चाहिए।`,
      english: `I need a ${noun.en}.`,
      alternatives: [],
      hint: `a + ${noun.en}`,
      explanation: `Indefinite article 'a' pehli baar mention ke liye.`,
      difficulty: 'easy',
      tags: ['articles', 'a-an', 'indefinite'],
      grammarRule: 'a + consonant sound noun',
      category: CAT, sectionId: SEC,
    });
  }

  // AN + vowel sound noun
  for (const noun of anNounsVowel) {
    practice.push({
      hindi: `उसने एक ${noun.hi} खाया।`,
      english: `She ate an ${noun.en}.`,
      alternatives: [],
      hint: `an + ${noun.en} (vowel sound)`,
      explanation: `'${noun.en}' vowel sound se shuru hota hai, isliye 'an' use karte hain. Sound dekho spelling nahi!`,
      difficulty: noun.sound === 'vowel-h-silent' ? 'hard' : 'easy',
      tags: ['articles', 'a-an', 'vowel-sound', noun.sound],
      grammarRule: 'an + vowel sound noun',
      category: CAT, sectionId: SEC,
    });
    practice.push({
      hindi: `वो एक ${noun.hi} है।`,
      english: `She is an ${noun.en}.`,
      alternatives: noun.en === 'actor' ? ['He is an actor.'] : [],
      hint: `an + ${noun.en} (starts with vowel sound)`,
      explanation: `'an' vowel sound ke saath. Common mistake: 'a engineer' — wrong! 'an engineer' sahi.`,
      difficulty: noun.sound.includes('h-silent') || noun.en.includes('MBA') ? 'hard' : 'medium',
      tags: ['articles', 'a-an', 'vowel-sound'],
      grammarRule: 'an + vowel sound noun',
      category: CAT, sectionId: SEC,
    });
  }

  // THE + specific noun
  for (const noun of theNouns) {
    practice.push({
      hindi: `${noun.hi} बहुत beautiful है।`,
      english: `The ${noun.en} is very beautiful.`,
      alternatives: [],
      hint: `the + ${noun.en} (unique/specific)`,
      explanation: `'The' unique ya specific noun ke saath — '${noun.en}' ek hi hai ya already mentioned hai.`,
      difficulty: 'easy',
      tags: ['articles', 'the', 'specific', 'unique'],
      grammarRule: 'the + specific/unique noun',
      category: CAT, sectionId: SEC,
    });
    practice.push({
      hindi: `मुझे ${noun.hi} पसंद है।`,
      english: `I like the ${noun.en}.`,
      alternatives: [],
      hint: `the + specific ${noun.en}`,
      explanation: `'The' already known/specific noun ke saath.`,
      difficulty: 'easy',
      tags: ['articles', 'the', 'specific'],
      grammarRule: 'the + specific/unique noun',
      category: CAT, sectionId: SEC,
    });
  }

  // Zero article (general/plural/uncountable)
  for (const noun of zeroNounsPlural) {
    practice.push({
      hindi: `${noun.hi} बहुत smart होते हैं।`,
      english: `${noun.en} are very smart.`,
      alternatives: [],
      hint: `No article before general plural noun`,
      explanation: `General category ke saath article nahi lagta. 'The dogs' means specific dogs, 'dogs' means dogs in general.`,
      difficulty: 'medium',
      tags: ['articles', 'zero-article', 'plural', 'general'],
      grammarRule: 'Zero article for general plural nouns',
      category: CAT, sectionId: SEC,
    });
  }
  for (const noun of zeroNounsUncount) {
    practice.push({
      hindi: `${noun.hi} बहुत ज़रूरी है।`,
      english: `${noun.en} is very important.`,
      alternatives: [],
      hint: `No article before uncountable noun (general)`,
      explanation: `Uncountable noun ke saath general sense mein article nahi lagta.`,
      difficulty: 'medium',
      tags: ['articles', 'zero-article', 'uncountable'],
      grammarRule: 'Zero article for uncountable nouns (general)',
      category: CAT, sectionId: SEC,
    });
  }

  // Rich hand-crafted sentences
  const richArticle = [
    { h: 'वो एक अच्छा इंसान है।', e: 'He is a good person.', d: 'easy', r: 'a + consonant' },
    { h: 'वो एक honest इंसान है।', e: 'He is an honest person.', d: 'hard', r: 'an + h-silent sound' },
    { h: 'उसने एक umbrella खरीदी।', e: 'She bought an umbrella.', d: 'easy', r: 'an + vowel-u' },
    { h: 'यह एक unique idea है।', e: 'This is a unique idea.', d: 'hard', r: "a + 'you' sound (unique=yoo-neek)" },
    { h: 'मैं एक university में पढ़ता हूँ।', e: 'I study at a university.', d: 'hard', r: "a + university (yoo sound)" },
    { h: 'वो एक European देश है।', e: 'It is a European country.', d: 'hard', r: "a + European (yoo sound)" },
    { h: 'मुझे एक one-way ticket चाहिए।', e: 'I need a one-way ticket.', d: 'hard', r: "a + one (wun sound)" },
    { h: 'वो एक MBA कर रहा है।', e: 'He is doing an MBA.', d: 'hard', r: 'an + MBA (em-bee-ay = vowel)' },
    { h: 'मैंने एक FIR दर्ज की।', e: 'I filed an FIR.', d: 'hard', r: 'an + FIR (ef = vowel sound)' },
    { h: 'क्या यह एक hour दूर है?', e: 'Is it an hour away?', d: 'medium', r: 'an + hour (h silent)' },
    { h: 'उसे एक MRI करानी है।', e: 'She needs to get an MRI.', d: 'hard', r: 'an + MRI (em = vowel)' },
    // The use cases
    { h: 'सूरज पूरब में उगता है।', e: 'The sun rises in the east.', d: 'easy', r: 'the + unique noun' },
    { h: 'Taj Mahal भारत में है।', e: 'The Taj Mahal is in India.', d: 'easy', r: 'the + unique monument' },
    { h: 'Prime Minister ने भाषण दिया।', e: 'The Prime Minister gave a speech.', d: 'medium', r: 'the + unique position' },
    { h: 'नज़दीकी hospital कहाँ है?', e: 'Where is the nearest hospital?', d: 'medium', r: 'the + superlative' },
    { h: 'आखिरी train कब जाती है?', e: 'When does the last train leave?', d: 'medium', r: 'the + last (specific)' },
    { h: 'वही problem फिर आ गई।', e: 'The same problem came back.', d: 'medium', r: 'the + same (specific)' },
    { h: 'पहला सवाल आसान था।', e: 'The first question was easy.', d: 'easy', r: 'the + ordinal (first)' },
    { h: 'सबसे लंबा पेड़ कौनसा है?', e: 'Which is the tallest tree?', d: 'medium', r: 'the + superlative' },
    { h: 'क्या तुम best student हो?', e: 'Are you the best student?', d: 'medium', r: 'the + superlative best' },
    // Zero article examples
    { h: 'हिंदी भारत की मुख्य भाषा है।', e: 'Hindi is the main language of India.', d: 'medium', r: 'the + specific language in context' },
    { h: 'Love बहुत powerful emotion है।', e: 'Love is a very powerful emotion.', d: 'medium', r: 'a + emotion (countable)' },
    { h: 'पानी पीना ज़रूरी है।', e: 'Drinking water is important.', d: 'medium', r: 'zero article + uncountable gerund' },
    { h: 'Knowledge is power. (ज्ञान शक्ति है।)', e: 'Knowledge is power.', d: 'easy', r: 'zero article both sides' },
    { h: 'Children need love and care.', e: 'Children need love and care.', d: 'medium', r: 'zero article for general plural + uncountable' },
    // Second mention = the
    { h: 'मैंने एक कुत्ता देखा। कुत्ता बहुत cute था।', e: 'I saw a dog. The dog was very cute.', d: 'hard', r: 'a (first mention) → the (second mention)' },
    { h: 'उसने एक book खरीदी। वो book बहुत informative थी।', e: 'She bought a book. The book was very informative.', d: 'hard', r: 'a → the (second mention)' },
    { h: 'मैंने एक interview दिया। Interview बहुत अच्छा गया।', e: 'I gave an interview. The interview went very well.', d: 'hard', r: 'an → the (second mention)' },
    // More varied
    { h: 'वो एक actor है।', e: 'He is an actor.', d: 'easy', r: 'an + vowel-a' },
    { h: 'मुझे एक apple चाहिए।', e: 'I want an apple.', d: 'easy', r: 'an + vowel-a' },
    { h: 'उसने एक email भेजी।', e: 'He sent an email.', d: 'easy', r: 'an + vowel-e' },
    { h: 'वो एक engineer है।', e: 'She is an engineer.', d: 'easy', r: 'an + vowel-e' },
    { h: 'यह एक excellent idea है।', e: 'This is an excellent idea.', d: 'medium', r: 'an + vowel-e' },
    { h: 'मुझे एक exam देनी है।', e: 'I have to take an exam.', d: 'easy', r: 'an + vowel-e' },
    { h: 'वो office में गई।', e: 'She went to the office.', d: 'medium', r: 'the + specific office' },
    { h: 'वो hospital गया।', e: 'He went to the hospital.', d: 'medium', r: 'the + specific institution' },
    { h: 'माँ market गई हैं।', e: 'Mother went to the market.', d: 'easy', r: 'the + specific place' },
    { h: 'बच्चे school गए।', e: 'The children went to school.', d: 'medium', r: 'school: institution → no article' },
    { h: 'वो college पढ़ता है।', e: 'He studies at college.', d: 'medium', r: 'institution without article' },
    { h: 'She plays guitar.', e: 'She plays the guitar.', d: 'hard', r: 'the + musical instrument' },
    { h: 'वो piano बजाता है।', e: 'He plays the piano.', d: 'hard', r: 'the + musical instrument' },
    { h: 'मुझे cricket खेलना पसंद है।', e: 'I like to play cricket.', d: 'easy', r: 'zero article for sports' },
    { h: 'वो football खेलता है।', e: 'He plays football.', d: 'easy', r: 'zero article for sports' },
    { h: 'वो breakfast खा रहा है।', e: 'He is having breakfast.', d: 'easy', r: 'zero article for meals' },
    { h: 'Dinner तैयार है।', e: 'Dinner is ready.', d: 'easy', r: 'zero article for meals' },
    { h: 'वो Tuesday को आएगा।', e: 'He will come on Tuesday.', d: 'medium', r: 'no article before days' },
    { h: 'मेरा birthday April में है।', e: 'My birthday is in April.', d: 'easy', r: 'no article before months' },
    { h: 'वो English बोलता है।', e: 'He speaks English.', d: 'easy', r: 'no article before languages' },
    { h: 'वो Hindi और Punjabi जानती है।', e: 'She knows Hindi and Punjabi.', d: 'easy', r: 'no article before languages' },
    { h: 'वो India में रहता है।', e: 'He lives in India.', d: 'easy', r: 'no article before countries (most)' },
    { h: 'वो USA में पढ़ रही है।', e: 'She is studying in the USA.', d: 'medium', r: 'the + countries that are unions/plurals' },
    { h: 'उसके पास बहुत knowledge है।', e: 'She has a lot of knowledge.', d: 'medium', r: 'a lot of + uncountable' },
    { h: 'She has a fair complexion.', e: 'She has a fair complexion.', d: 'medium', r: 'a + countable noun' },
  ];

  for (const s of richArticle) {
    practice.push({
      hindi: s.h, english: s.e, alternatives: [],
      hint: s.r,
      explanation: `Article rule: ${s.r}`,
      difficulty: s.d,
      tags: ['articles', s.r.includes('vowel') ? 'an' : s.r.includes('the') ? 'the' : s.r.includes('zero') ? 'zero-article' : 'a'],
      grammarRule: s.r,
      category: CAT, sectionId: SEC,
    });
  }

  const practiceUniq = dedup(practice, x => x.hindi);
  const practiceOut = assignIDs(practiceUniq.slice(0, 950));

  // ── TEST ──
  const testItems = [];

  // A vs AN
  const aVsAn = [
    { q: "Which is correct? '___ umbrella'", opts: ['a umbrella','an umbrella','the umbrella','umbrella'], c: 'B', exp: "'An' vowel sound (u) ke saath.", d: 'easy' },
    { q: "Which is correct? '___ book'", opts: ['an book','a book','the book','books'], c: 'B', exp: "'A' consonant sound (b) ke saath.", d: 'easy' },
    { q: "Which is correct? '___ engineer'", opts: ['a engineer','an engineer','the engineer','no article'], c: 'B', exp: "'An' vowel sound (e) ke saath.", d: 'easy' },
    { q: "Which is correct? '___ university'", opts: ['an university','a university','the university','no article'], c: 'B', exp: "'A university' — 'university' ka sound 'yoo' se shuru hota hai, consonant sound!", d: 'hard' },
    { q: "Which is correct? '___ honest person'", opts: ['a honest person','an honest person','the honest person','no article'], c: 'B', exp: "'An' — 'honest' mein 'h' silent hai, vowel sound 'o' se shuru hota hai.", d: 'hard' },
    { q: "Which is correct? '___ one-way ticket'", opts: ['an one-way ticket','a one-way ticket','the one-way ticket','no article'], c: 'B', exp: "'A one-way' — 'one' ka sound 'wun' (w) se shuru hai, consonant!", d: 'hard' },
    { q: "Which is correct? '___ hour'", opts: ['a hour','an hour','the hour','hours'], c: 'B', exp: "'An hour' — 'h' silent hai, 'our' vowel sound se shuru.", d: 'medium' },
    { q: "Which is correct? '___ MBA'", opts: ['a MBA','an MBA','the MBA','no article'], c: 'B', exp: "'An MBA' — letters padhte hain: 'em-bee-ay' — 'em' vowel sound!", d: 'hard' },
    { q: "Which is correct? '___ apple'", opts: ['a apple','an apple','the apple','no article'], c: 'B', exp: "'An apple' — vowel 'a' sound.", d: 'easy' },
    { q: "Which is correct? '___ European country'", opts: ['an European country','a European country','the European country','no article'], c: 'B', exp: "'A European' — 'eu' ka sound 'yoo' (consonant y).", d: 'hard' },
    { q: "Which is correct? '___ dog'", opts: ['an dog','a dog','the dog','no article'], c: 'B', exp: "'A dog' — consonant 'd' sound.", d: 'easy' },
    { q: "Which is correct? '___ email'", opts: ['a email','an email','the email','no article'], c: 'B', exp: "'An email' — vowel 'e' sound.", d: 'easy' },
    { q: "Which is correct? '___ old man'", opts: ['a old man','an old man','the old man','no article'], c: 'B', exp: "'An old man' — 'old' vowel 'o' se shuru.", d: 'easy' },
    { q: "Which is correct? '___ exam'", opts: ['a exam','an exam','the exam','no article'], c: 'B', exp: "'An exam' — vowel 'e' sound.", d: 'easy' },
    { q: "Which is correct? '___ interesting book'", opts: ['a interesting book','an interesting book','the interesting book','interesting book'], c: 'B', exp: "'An interesting' — 'i' vowel sound.", d: 'easy' },
  ];

  // A/AN vs THE
  const aVsThe = [
    { q: "Fill in: 'I saw ___ dog. ___ dog was barking.'", opts: ['a/the','the/a','a/a','the/the'], c: 'A', exp: "Pehli baar 'a' (indefinite), doosri baar 'the' (already known).", d: 'medium' },
    { q: "Fill in: '___ sun rises in the east.'", opts: ['A','An','The','No article'], c: 'C', exp: "'The sun' — ek hi sun hai, unique noun.", d: 'easy' },
    { q: "Fill in: 'She is ___ best student in class.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The best' — superlative ke saath 'the'.", d: 'easy' },
    { q: "Fill in: 'He gave me ___ book I asked for.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The book' — specific book jo maangi thi.", d: 'medium' },
    { q: "Fill in: '___ Taj Mahal is in Agra.'", opts: ['A','An','The','No article'], c: 'C', exp: "'The Taj Mahal' — unique monument.", d: 'easy' },
    { q: "Fill in: 'He wants to become ___ doctor.'", opts: ['a','an','the','no article'], c: 'A', exp: "'A doctor' — profession (first mention, consonant sound).", d: 'easy' },
    { q: "Fill in: 'Please close ___ door.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The door' — specific door we are near.", d: 'easy' },
    { q: "Fill in: 'I play ___ cricket every evening.'", opts: ['a','an','the','no article'], c: 'D', exp: "Sports ke saath article nahi lagta generally.", d: 'medium' },
    { q: "Fill in: 'He plays ___ guitar very well.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The guitar' — musical instruments ke saath 'the'.", d: 'hard' },
    { q: "Fill in: '___ knowledge is power.'", opts: ['A','An','The','No article'], c: 'D', exp: "Uncountable general noun ke saath zero article.", d: 'medium' },
  ];

  // Error spotting
  const errSpotArticle = [
    { q: "Which is wrong? 'She is a honest worker.'", opts: ['She','is','a','honest'], c: 'C', exp: "'A' wrong — 'honest' mein h silent, vowel sound — 'an honest' chahiye.", d: 'medium' },
    { q: "Which is wrong? 'He bought an book yesterday.'", opts: ['He','bought','an','book'], c: 'C', exp: "'An' wrong — 'book' consonant b sound — 'a book' chahiye.", d: 'easy' },
    { q: "Which is wrong? 'I am studying at an university.'", opts: ['I am','studying','at an','university'], c: 'C', exp: "'An university' wrong — 'university' yoo sound (consonant) — 'a university' chahiye.", d: 'hard' },
    { q: "Which is wrong? 'A sun rises in the east.'", opts: ['A','sun','rises','in the east'], c: 'A', exp: "'A sun' wrong — sun unique hai — 'The sun' chahiye.", d: 'easy' },
    { q: "Which is wrong? 'She has lot of knowledge.'", opts: ['She','has','lot of','knowledge'], c: 'C', exp: "'lot of' wrong — 'a lot of' hona chahiye.", d: 'medium' },
    { q: "Which is wrong? 'He is a engineer.'", opts: ['He','is','a','engineer'], c: 'C', exp: "'A engineer' wrong — 'engineer' vowel e sound — 'an engineer' chahiye.", d: 'easy' },
  ];

  // Translate Hindi to MCQ
  const translateArticle = [
    { q: "Translate: 'मैं एक doctor हूँ।'", opts: ['I am a doctor.','I am an doctor.','I am the doctor.','I am doctor.'], c: 'A', exp: "'A doctor' — consonant d sound.", d: 'easy' },
    { q: "Translate: 'वो एक engineer है।'", opts: ['She is a engineer.','She is an engineer.','She is the engineer.','She is engineer.'], c: 'B', exp: "'An engineer' — vowel e sound.", d: 'easy' },
    { q: "Translate: 'सूरज उग रहा है।'", opts: ['A sun is rising.','An sun is rising.','The sun is rising.','Sun is rising.'], c: 'C', exp: "'The sun' — unique noun.", d: 'easy' },
    { q: "Translate: 'मैंने एक apple खाई।'", opts: ['I ate a apple.','I ate an apple.','I ate the apple.','I ate apple.'], c: 'B', exp: "'An apple' — vowel a sound.", d: 'easy' },
    { q: "Translate: 'उसने एक honest mistake की।'", opts: ['He made a honest mistake.','He made an honest mistake.','He made the honest mistake.','He made honest mistake.'], c: 'B', exp: "'An honest' — h silent, vowel o sound.", d: 'hard' },
    { q: "Translate: 'वो university में पढ़ रही है।'", opts: ['She studies at an university.','She studies at a university.','She studies at the university.','She studies at university.'], c: 'B', exp: "'A university' — yoo consonant sound.", d: 'hard' },
    { q: "Translate: 'पानी ज़रूरी है।' (general)", opts: ['A water is important.','An water is important.','The water is important.','Water is important.'], c: 'D', exp: "Uncountable general noun — zero article.", d: 'medium' },
    { q: "Translate: 'वो guitar बजाती है।'", opts: ['She plays a guitar.','She plays an guitar.','She plays the guitar.','She plays guitar.'], c: 'C', exp: "'The guitar' — musical instruments ke saath 'the'.", d: 'hard' },
    { q: "Translate: 'मैंने एक book खरीदी। वो book अच्छी थी।'", opts: ['I bought a book. A book was good.','I bought a book. The book was good.','I bought the book. A book was good.','I bought the book. The book was good.'], c: 'B', exp: "Pehli baar 'a', doosri baar 'the'.", d: 'medium' },
    { q: "Translate: 'वो एक MBA कर रहा है।'", opts: ['He is doing a MBA.','He is doing an MBA.','He is doing the MBA.','He is doing MBA.'], c: 'B', exp: "'An MBA' — em vowel sound.", d: 'hard' },
  ];

  testItems.push(...aVsAn.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...aVsThe.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...errSpotArticle.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...translateArticle.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // Programmatic expansion
  const artExpNouns = [...aNounsCons.slice(0,15).map(n => ({ n, art: 'a', w: 'an' })),
    ...anNounsVowel.slice(0,10).map(n => ({ n, art: 'an', w: 'a' }))];
  let artC = 0;
  for (const { n, art, w } of artExpNouns) {
    testItems.push({
      type: 'mcq',
      question: `Fill in: 'I want to buy ___ ${n.en}.'`,
      options: shuffle([art, w, 'the', 'no article']),
      correct: null,
      explanation: `'${art} ${n.en}' — ${art === 'a' ? 'consonant' : 'vowel'} sound ke saath '${art}'.`,
      difficulty: art === 'an' && (n.sound === 'vowel-h-silent' || n.en.includes('MBA')) ? 'hard' : 'easy',
      marks: 1, category: CAT, sectionId: SEC,
    });
    const last = testItems[testItems.length - 1];
    const ci = last.options.indexOf(art);
    last.correct = ci === -1 ? 'A' : ['A','B','C','D'][ci];
    artC++;
  }

  // More unique MCQs
  const moreArticleMCQ = [
    { q: "Fill in: 'She is ___ actress.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An actress' — vowel 'a'.", d: 'easy' },
    { q: "Fill in: 'This is ___ best movie I have seen.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The best' — superlative.", d: 'easy' },
    { q: "Fill in: 'He is ___ Prime Minister of India.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The Prime Minister' — unique position.", d: 'medium' },
    { q: "Fill in: '___ dogs bark at strangers.' (general)", opts: ['A','An','The','No article'], c: 'D', exp: "General plural noun — no article.", d: 'medium' },
    { q: "Fill in: 'I drink ___ tea every morning.' (general)", opts: ['a','an','the','no article'], c: 'D', exp: "Uncountable noun general — no article.", d: 'medium' },
    { q: "Fill in: 'He plays ___ football on weekends.'", opts: ['a','an','the','no article'], c: 'D', exp: "Sports — no article.", d: 'easy' },
    { q: "Fill in: 'She goes to ___ school every day.'", opts: ['a','an','the','no article'], c: 'D', exp: "'School' as institution — no article.", d: 'medium' },
    { q: "Fill in: 'Can you open ___ window please?'", opts: ['a','an','the','no article'], c: 'C', exp: "'The window' — specific window.", d: 'easy' },
    { q: "Fill in: 'I need ___ advice.' (general)", opts: ['a','an','the','no article'], c: 'D', exp: "'Advice' uncountable — no article.", d: 'medium' },
    { q: "Fill in: 'She bought ___ umbrella and ___ raincoat.'", opts: ['a/a','an/a','an/an','a/an'], c: 'B', exp: "'An umbrella' (vowel u) + 'a raincoat' (consonant r).", d: 'medium' },
    { q: "Fill in: '___ Ganges is a holy river.'", opts: ['A','An','The','No article'], c: 'C', exp: "'The Ganges' — specific river (unique named rivers use 'the').", d: 'medium' },
    { q: "Fill in: 'He is ___ honest man.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An honest' — h silent, vowel o sound.", d: 'hard' },
    { q: "Fill in: 'It took ___ hour to complete.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An hour' — h silent.", d: 'medium' },
    { q: "Fill in: '___ USA is a powerful country.'", opts: ['A','An','The','No article'], c: 'C', exp: "'The USA' — abbreviation of The United States.", d: 'hard' },
    { q: "Fill in: 'She speaks ___ Hindi fluently.'", opts: ['a','an','the','no article'], c: 'D', exp: "Languages ke saath article nahi.", d: 'medium' },
    { q: "Fill in: 'I had ___ breakfast at 8 AM.'", opts: ['a','an','the','no article'], c: 'D', exp: "Meals ke saath article nahi generally.", d: 'medium' },
    { q: "Fill in: 'He is ___ tallest person here.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The tallest' — superlative.", d: 'easy' },
    { q: "Fill in: 'We need ___ information.'", opts: ['a','an','the','no article'], c: 'D', exp: "'Information' uncountable — no article generally.", d: 'medium' },
    { q: "Fill in: 'He reads ___ newspaper every morning.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The newspaper' — specific newspaper he reads regularly.", d: 'medium' },
    { q: "Fill in: 'She has ___ lot of patience.'", opts: ['a','an','the','no article'], c: 'A', exp: "'A lot of' — fixed phrase.", d: 'easy' },
    { q: "Fill in: 'That was ___ unique experience.'", opts: ['a','an','the','no article'], c: 'A', exp: "'A unique' — 'yoo-neek' consonant y sound.", d: 'hard' },
    { q: "Fill in: 'He joined ___ army.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The army' — specific institution.", d: 'medium' },
    { q: "Fill in: 'She won ___ gold medal.'", opts: ['a','an','the','no article'], c: 'A', exp: "'A gold medal' — first mention, consonant g.", d: 'easy' },
    { q: "Fill in: '___ earth revolves around ___ sun.'", opts: ['The/a','A/the','The/the','No art/the'], c: 'C', exp: "Dono unique — 'the earth', 'the sun'.", d: 'medium' },
    { q: "Fill in: 'He is ___ heir to the throne.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An heir' — 'h' silent, vowel 'e' sound.", d: 'hard' },
    { q: "Fill in: 'This is ___ interesting question.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An interesting' — vowel 'i' sound.", d: 'easy' },
    { q: "Fill in: 'It happened ___ year ago.'", opts: ['a','an','the','no article'], c: 'A', exp: "'A year' — consonant 'y' sound.", d: 'easy' },
    { q: "Fill in: 'He gave ___ answer I expected.'", opts: ['a','an','the','no article'], c: 'C', exp: "'The answer' — specific answer that was expected.", d: 'medium' },
    { q: "Fill in: 'She is studying to be ___ IAS officer.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An IAS' — 'eye' vowel sound.", d: 'hard' },
    { q: "Fill in: 'It was ___ honor to meet you.'", opts: ['a','an','the','no article'], c: 'B', exp: "'An honor' — 'h' silent.", d: 'hard' },
  ];
  testItems.push(...moreArticleMCQ.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  const testUniq = dedup(testItems, x => x.question);
  const testOut = assignIDs(testUniq.slice(0, 350));

  return { practice: practiceOut, test: testOut };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: DO/DOES
// ═══════════════════════════════════════════════════════════════════════════
function buildDoDoes() {
  const SEC = 'do-does', CAT = 'Do/Does Helper Verbs';
  const practice = [];
  const test = [];

  // Subjects with do/does
  const doSubjects = ['I','You','We','They'];
  const doesSubjects = ['He','She','It'];

  // Verbs for do/does
  const verbs = [
    { base: 'like', hi: 'पसंद करना', thirdP: 'likes' },
    { base: 'eat', hi: 'खाना', thirdP: 'eats' },
    { base: 'drink', hi: 'पीना', thirdP: 'drinks' },
    { base: 'go', hi: 'जाना', thirdP: 'goes' },
    { base: 'come', hi: 'आना', thirdP: 'comes' },
    { base: 'work', hi: 'काम करना', thirdP: 'works' },
    { base: 'study', hi: 'पढ़ना', thirdP: 'studies' },
    { base: 'play', hi: 'खेलना', thirdP: 'plays' },
    { base: 'know', hi: 'जानना', thirdP: 'knows' },
    { base: 'understand', hi: 'समझना', thirdP: 'understands' },
    { base: 'speak', hi: 'बोलना', thirdP: 'speaks' },
    { base: 'watch', hi: 'देखना', thirdP: 'watches' },
    { base: 'cook', hi: 'खाना बनाना', thirdP: 'cooks' },
    { base: 'teach', hi: 'पढ़ाना', thirdP: 'teaches' },
    { base: 'help', hi: 'मदद करना', thirdP: 'helps' },
    { base: 'think', hi: 'सोचना', thirdP: 'thinks' },
    { base: 'want', hi: 'चाहना', thirdP: 'wants' },
    { base: 'need', hi: 'ज़रूरत होना', thirdP: 'needs' },
    { base: 'sleep', hi: 'सोना', thirdP: 'sleeps' },
    { base: 'run', hi: 'दौड़ना', thirdP: 'runs' },
    { base: 'read', hi: 'पढ़ना', thirdP: 'reads' },
    { base: 'write', hi: 'लिखना', thirdP: 'writes' },
    { base: 'travel', hi: 'यात्रा करना', thirdP: 'travels' },
    { base: 'exercise', hi: 'exercise करना', thirdP: 'exercises' },
    { base: 'drive', hi: 'drive करना', thirdP: 'drives' },
  ];

  const objects = [
    'English','Hindi','coffee','tea','milk','food','vegetables','fruits','books','movies',
    'music','football','cricket','the guitar','the news','newspapers','online classes',
    'office','school','the gym','the market','home early','late','well','hard',
  ];

  const subjects3rd = [
    { hi: 'वो (male)', en: 'He' }, { hi: 'वो (female)', en: 'She' },
    { hi: 'मेरा भाई', en: 'My brother' }, { hi: 'मेरी बहन', en: 'My sister' },
    { hi: 'मेरी माँ', en: 'My mother' }, { hi: 'मेरे पिता', en: 'My father' },
    { hi: 'यह train', en: 'This train' }, { hi: 'मेरी class', en: 'My class' },
    { hi: 'मेरा दोस्त', en: 'My friend' }, { hi: 'वो teacher', en: 'The teacher' },
    { hi: 'यह app', en: 'This app' }, { hi: 'मेरी company', en: 'My company' },
  ];

  const subjectsPlural = [
    { hi: 'हम', en: 'We' }, { hi: 'वो लोग', en: 'They' }, { hi: 'मेरे दोस्त', en: 'My friends' },
    { hi: 'बच्चे', en: 'The children' }, { hi: 'Students', en: 'Students' }, { hi: 'हमारे parents', en: 'Our parents' },
  ];

  const diffCycle = ['easy','easy','medium','medium','hard'];
  let dc = 0;

  // BLOCK 1: Negative sentences (doesn't + base verb)
  for (const subj of subjects3rd) {
    for (const vb of verbs.slice(0, 12)) {
      const obj = objects[dc % objects.length];
      practice.push({
        hindi: `${subj.hi} ${obj} ${vb.hi} नहीं ${subj.hi.includes('train') || subj.hi.includes('app') ? 'करता' : (subj.hi.includes('माँ') || subj.hi.includes('बहन') || subj.hi.includes('class') ? 'करती' : 'करता')}।`,
        english: `${subj.en} doesn't ${vb.base} ${obj}.`,
        alternatives: [`${subj.en} does not ${vb.base} ${obj}.`],
        hint: `${subj.en} + doesn't + ${vb.base} (not ${vb.thirdP})`,
        explanation: `He/She/It ke saath negative mein 'doesn't' + base verb. '${vb.thirdP}' nahi — 'doesn't' already He/She/It indicate karta hai.`,
        difficulty: diffCycle[dc++ % diffCycle.length],
        tags: ['do-does','negative','simple-present', domains_pa[dc % 12]],
        grammarRule: 'He/She/It + doesn\'t + base verb',
        category: CAT, sectionId: SEC,
      });
    }
  }

  // BLOCK 2: Doesn't questions (Does + subject + base verb?)
  for (const subj of subjects3rd.slice(0, 8)) {
    for (const vb of verbs.slice(0, 10)) {
      const obj = objects[(dc + 3) % objects.length];
      practice.push({
        hindi: `क्या ${subj.hi} ${obj} ${vb.hi}?`,
        english: `Does ${subj.en.toLowerCase()} ${vb.base} ${obj}?`,
        alternatives: [],
        hint: `Does + ${subj.en.toLowerCase()} + ${vb.base}?`,
        explanation: `He/She/It ke saath question mein 'Does' — verb base form mein aati hai, '${vb.thirdP}' nahi.`,
        difficulty: diffCycle[dc++ % diffCycle.length],
        tags: ['do-does','question','simple-present', domains_pa[dc % 12]],
        grammarRule: 'Does + he/she/it + base verb?',
        category: CAT, sectionId: SEC,
      });
    }
  }

  // BLOCK 3: Don't sentences (I/We/You/They)
  for (const subj of subjectsPlural) {
    for (const vb of verbs.slice(0, 10)) {
      const obj = objects[(dc + 7) % objects.length];
      practice.push({
        hindi: `${subj.hi} ${obj} ${vb.hi} नहीं ${subj.hi.includes('बच्चे') ? 'करते' : 'करते'}।`,
        english: `${subj.en} don't ${vb.base} ${obj}.`,
        alternatives: [`${subj.en} do not ${vb.base} ${obj}.`],
        hint: `${subj.en} + don't + ${vb.base}`,
        explanation: `I/We/You/They ke saath negative mein 'don't' + base verb.`,
        difficulty: diffCycle[dc++ % diffCycle.length],
        tags: ['do-does','negative','simple-present'],
        grammarRule: 'I/We/You/They + don\'t + base verb',
        category: CAT, sectionId: SEC,
      });
    }
  }

  // BLOCK 4: Do questions
  for (const subj of ['You','They','We']) {
    for (const vb of verbs.slice(0, 10)) {
      const obj = objects[(dc + 11) % objects.length];
      practice.push({
        hindi: `क्या ${subj === 'You' ? 'तुम' : subj === 'They' ? 'वो लोग' : 'हम'} ${obj} ${vb.hi}?`,
        english: `Do ${subj.toLowerCase()} ${vb.base} ${obj}?`,
        alternatives: [],
        hint: `Do + ${subj.toLowerCase()} + ${vb.base}?`,
        explanation: `I/You/We/They ke saath question mein 'Do'.`,
        difficulty: diffCycle[dc++ % diffCycle.length],
        tags: ['do-does','question','simple-present'],
        grammarRule: 'Do + I/you/we/they + base verb?',
        category: CAT, sectionId: SEC,
      });
    }
  }

  // Hand-crafted rich sentences
  const richDoDoes = [
    // Doesn't
    { h: 'वो coffee नहीं पीता।', e: "He doesn't drink coffee.", hint: "doesn't + drink (not drinks)", d: 'easy', t: ['food'] },
    { h: 'मेरी बहन TV नहीं देखती।', e: "My sister doesn't watch TV.", hint: "doesn't + watch (not watches)", d: 'easy', t: ['entertainment'] },
    { h: 'यह phone अच्छे से काम नहीं करता।', e: "This phone doesn't work well.", hint: "doesn't + work (not works)", d: 'easy', t: ['technology'] },
    { h: 'Teacher यहाँ Sunday को नहीं आते।', e: "The teacher doesn't come here on Sundays.", hint: "doesn't + come (not comes)", d: 'medium', t: ['school'] },
    { h: 'वो झूठ नहीं बोलती।', e: "She doesn't tell lies.", hint: "doesn't + tell (not tells)", d: 'easy', t: ['social'] },
    { h: 'मेरा भाई meat नहीं खाता।', e: "My brother doesn't eat meat.", hint: "doesn't + eat (not eats)", d: 'easy', t: ['food'] },
    { h: 'वो इस बात से agree नहीं करती।', e: "She doesn't agree with this.", hint: "doesn't + agree (not agrees)", d: 'medium', t: ['social'] },
    { h: 'यह train समय पर नहीं आती।', e: "This train doesn't arrive on time.", hint: "doesn't + arrive (not arrives)", d: 'medium', t: ['travel'] },
    { h: 'मेरा दोस्त gym नहीं जाता।', e: "My friend doesn't go to the gym.", hint: "doesn't + go (not goes)", d: 'easy', t: ['health'] },
    { h: 'वो English बहुत अच्छे से नहीं बोलता।', e: "He doesn't speak English very well.", hint: "doesn't + speak", d: 'medium', t: ['daily-life'] },
    // Don't
    { h: 'हम late नहीं आते।', e: "We don't come late.", hint: "don't + come", d: 'easy', t: ['office'] },
    { h: 'मेरे बच्चे junk food नहीं खाते।', e: "My children don't eat junk food.", hint: "don't + eat", d: 'easy', t: ['food','family'] },
    { h: 'हम इस बात से agree नहीं करते।', e: "We don't agree with this.", hint: "don't + agree", d: 'easy', t: ['office'] },
    { h: 'वो लोग English नहीं समझते।', e: "They don't understand English.", hint: "don't + understand", d: 'easy', t: ['daily-life'] },
    { h: 'मैं coffee नहीं पीता।', e: "I don't drink coffee.", hint: "don't + drink", d: 'easy', t: ['food'] },
    { h: 'मैं smoking नहीं करता।', e: "I don't smoke.", hint: "don't + smoke", d: 'easy', t: ['health'] },
    { h: 'Students यहाँ Hindi नहीं बोलते।', e: "Students don't speak Hindi here.", hint: "don't + speak", d: 'easy', t: ['school'] },
    { h: 'हम रोज़ TV नहीं देखते।', e: "We don't watch TV every day.", hint: "don't + watch", d: 'easy', t: ['entertainment'] },
    { h: 'वो लोग office time पर नहीं आते।', e: "They don't come to office on time.", hint: "don't + come", d: 'medium', t: ['office'] },
    { h: 'मैं उसे नहीं जानता।', e: "I don't know him.", hint: "don't + know", d: 'easy', t: ['social'] },
    // Does questions
    { h: 'क्या वो office जाता है?', e: 'Does he go to office?', hint: 'Does + he + go?', d: 'easy', t: ['office'] },
    { h: 'क्या वो English बोलती है?', e: 'Does she speak English?', hint: 'Does + she + speak?', d: 'easy', t: ['daily-life'] },
    { h: 'क्या यह train Delhi जाती है?', e: 'Does this train go to Delhi?', hint: 'Does + this train + go?', d: 'easy', t: ['travel'] },
    { h: 'वो क्या करती है?', e: 'What does she do?', hint: 'What + does + she + do?', d: 'medium', t: ['daily-life'] },
    { h: 'क्या मेरा दोस्त यहाँ रहता है?', e: 'Does my friend live here?', hint: 'Does + my friend + live?', d: 'easy', t: ['daily-life'] },
    { h: 'क्या वो gym जाती है?', e: 'Does she go to the gym?', hint: 'Does + she + go?', d: 'easy', t: ['health'] },
    { h: 'क्या boss ने approve किया? (Does boss approve of it?)', e: 'Does the boss approve of it?', hint: 'Does + the boss + approve?', d: 'medium', t: ['office'] },
    // Do questions
    { h: 'क्या तुम English बोलते हो?', e: 'Do you speak English?', hint: 'Do + you + speak?', d: 'easy', t: ['daily-life'] },
    { h: 'तुम कहाँ रहते हो?', e: 'Where do you live?', hint: 'Where + do + you + live?', d: 'easy', t: ['daily-life'] },
    { h: 'तुम क्यों English सीखते हो?', e: 'Why do you learn English?', hint: 'Why + do + you + learn?', d: 'easy', t: ['motivation'] },
    { h: 'क्या वो लोग cricket खेलते हैं?', e: 'Do they play cricket?', hint: 'Do + they + play?', d: 'easy', t: ['sports'] },
    { h: 'हम सब क्या खाते हैं?', e: 'What do we eat?', hint: 'What + do + we + eat?', d: 'easy', t: ['food'] },
    { h: 'वो लोग कहाँ काम करते हैं?', e: 'Where do they work?', hint: 'Where + do + they + work?', d: 'easy', t: ['office'] },
    { h: 'क्या students यहाँ English पढ़ते हैं?', e: 'Do students learn English here?', hint: 'Do + students + learn?', d: 'easy', t: ['school'] },
    // Emphasis do/does
    { h: 'मैं सच में उसे जानता हूँ।', e: 'I do know him.', hint: 'I + do + know (emphatic)', d: 'hard', t: ['emphasis'] },
    { h: 'वो सच में यहाँ आता है।', e: 'He does come here.', hint: 'He + does + come (emphatic)', d: 'hard', t: ['emphasis'] },
    { h: 'हम सच में care करते हैं।', e: 'We do care.', hint: 'We + do + care (emphatic)', d: 'hard', t: ['emphasis'] },
    // Mixed negation + question
    { h: 'क्यों वो office नहीं आता?', e: "Why doesn't he come to the office?", hint: "Why + doesn't + he + come?", d: 'medium', t: ['office'] },
    { h: 'क्या तुम coffee नहीं पीते?', e: "Don't you drink coffee?", hint: "Don't + you + drink?", d: 'hard', t: ['food'] },
    { h: 'क्या वो Hindi नहीं जानती?', e: "Doesn't she know Hindi?", hint: "Doesn't + she + know?", d: 'medium', t: ['daily-life'] },
    { h: 'क्यों वो लोग help नहीं करते?', e: "Why don't they help?", hint: "Why + don't + they + help?", d: 'medium', t: ['social'] },
    // Compound
    { h: 'मैं coffee नहीं पीता, लेकिन चाय पीता हूँ।', e: "I don't drink coffee, but I drink tea.", hint: "don't + drink...drink", d: 'hard', t: ['food','compound'] },
    { h: 'वो Hindi जानता है लेकिन English नहीं बोलता।', e: "He knows Hindi but doesn't speak English.", hint: "knows...doesn't + speak", d: 'hard', t: ['daily-life','compound'] },
    { h: 'क्या तुम gym जाते हो या घर पर exercise करते हो?', e: 'Do you go to the gym or exercise at home?', hint: 'Do + you + go...exercise?', d: 'hard', t: ['health','compound'] },
  ];

  for (const s of richDoDoes) {
    practice.push({
      hindi: s.h, english: s.e, alternatives: [],
      hint: s.hint,
      explanation: `Do/Does rule: ${s.hint}`,
      difficulty: s.d,
      tags: ['do-does', ...s.t],
      grammarRule: s.hint.includes("doesn't") ? "He/She/It + doesn't + base verb" :
                   s.hint.includes("don't") ? "I/We/You/They + don't + base verb" :
                   s.hint.includes('Does') ? "Does + he/she/it + base verb?" :
                   "Do + I/you/we/they + base verb?",
      category: CAT, sectionId: SEC,
    });
  }

  const practiceUniq = dedup(practice, x => x.hindi);
  const practiceOut = assignIDs(practiceUniq.slice(0, 950));

  // ── TEST ──
  const testItems = [];

  const doDoesChoose = [
    // Choose do vs does
    { q: "Fill in: '___ he speak English?'", opts: ['Do','Does','Is','Has'], c: 'B', exp: "'Does' He ke saath — He/She/It → does.", d: 'easy' },
    { q: "Fill in: '___ they play cricket?'", opts: ['Does','Do','Is','Have'], c: 'B', exp: "'Do' They ke saath — I/We/You/They → do.", d: 'easy' },
    { q: "Fill in: '___ she go to school?'", opts: ['Do','Does','Is','Has'], c: 'B', exp: "'Does' She ke saath.", d: 'easy' },
    { q: "Fill in: '___ you know him?'", opts: ['Does','Do','Is','Have'], c: 'B', exp: "'Do' You ke saath.", d: 'easy' },
    { q: "Fill in: '___ we need to come early?'", opts: ['Does','Do','Is','Has'], c: 'B', exp: "'Do' We ke saath.", d: 'easy' },
    { q: "Fill in: '___ this train go to Mumbai?'", opts: ['Do','Does','Is','Has'], c: 'B', exp: "'Does' singular noun (this train).", d: 'easy' },
    { q: "Fill in: 'He ___ not like spicy food.'", opts: ['do','does','is','has'], c: 'B', exp: "'Does not' He ke saath.", d: 'easy' },
    { q: "Fill in: 'They ___ not understand Hindi.'", opts: ['does','do','is','has'], c: 'B', exp: "'Do not' They ke saath.", d: 'easy' },
    { q: "Fill in: 'She ___ not eat meat.'", opts: ['do','does','is','are'], c: 'B', exp: "'Does not' She ke saath.", d: 'easy' },
    { q: "Fill in: 'I ___ not know the answer.'", opts: ['does','do','am','have'], c: 'B', exp: "'Do not' I ke saath.", d: 'easy' },
    // Choose correct sentence
    { q: 'Choose correct negative:', opts: ['He don\'t go.','He doesn\'t go.','He not go.','He isn\'t go.'], c: 'B', exp: "'He doesn't go' — He ke saath doesn't + base verb.", d: 'easy' },
    { q: 'Choose correct negative:', opts: ['She doesn\'t goes.','She don\'t go.','She doesn\'t go.','She not go.'], c: 'C', exp: "'She doesn't go' — doesn't ke baad base verb (go, not goes).", d: 'easy' },
    { q: 'Choose correct question:', opts: ['Do he speaks English?','Does he speaks English?','Does he speak English?','Do he speak English?'], c: 'C', exp: "'Does he speak' — He ke saath Does, verb base form.", d: 'easy' },
    { q: 'Choose correct question:', opts: ['Does you live here?','Do you lives here?','Do you live here?','Does you lives here?'], c: 'C', exp: "'Do you live' — You ke saath Do, base verb.", d: 'easy' },
    { q: 'Choose correct sentence:', opts: ['She don\'t watches TV.','She doesn\'t watches TV.','She doesn\'t watch TV.','She do not watch TV.'], c: 'C', exp: "'She doesn't watch' — doesn't ke baad base verb (watch, not watches).", d: 'medium' },
  ];

  const doDoesTranslate = [
    { q: "Translate: 'क्या वो office जाता है?'", opts: ['Do he go to office?','Does he goes to office?','Does he go to office?','Is he go to office?'], c: 'C', exp: "'Does he go' — He ke saath Does, base verb.", d: 'easy' },
    { q: "Translate: 'वो coffee नहीं पीती।'", opts: ['She don\'t drink coffee.','She doesn\'t drinks coffee.','She doesn\'t drink coffee.','She not drinks coffee.'], c: 'C', exp: "'She doesn't drink' — doesn't ke baad base verb.", d: 'easy' },
    { q: "Translate: 'क्या तुम English बोलते हो?'", opts: ['Does you speak English?','Do you speaks English?','Do you speak English?','Are you speak English?'], c: 'C', exp: "'Do you speak' — You ke saath Do, base verb.", d: 'easy' },
    { q: "Translate: 'हम late नहीं आते।'", opts: ['We doesn\'t come late.','We don\'t comes late.','We don\'t come late.','We not come late.'], c: 'C', exp: "'We don't come' — don't ke baad base verb.", d: 'easy' },
    { q: "Translate: 'क्यों वो यहाँ नहीं आता?'", opts: ['Why he doesn\'t comes here?','Why doesn\'t he comes here?','Why doesn\'t he come here?','Why don\'t he come here?'], c: 'C', exp: "'Why doesn't he come?' — He ke saath doesn't, base verb.", d: 'medium' },
    { q: "Translate: 'क्या वो Hindi जानती है?'", opts: ['Do she know Hindi?','Does she knows Hindi?','Does she know Hindi?','Is she know Hindi?'], c: 'C', exp: "'Does she know' — She ke saath Does, base verb.", d: 'easy' },
    { q: "Translate: 'मेरे दोस्त English नहीं बोलते।'", opts: ['My friends doesn\'t speak English.','My friends don\'t speaks English.','My friends don\'t speak English.','My friends not speak English.'], c: 'C', exp: "'My friends don't speak' — plural ke saath don't.", d: 'medium' },
    { q: "Translate: 'क्या यह train Delhi जाती है?'", opts: ['Do this train go to Delhi?','Does this train goes to Delhi?','Does this train go to Delhi?','Is this train goes to Delhi?'], c: 'C', exp: "'Does this train go' — singular noun ke saath Does.", d: 'medium' },
  ];

  const doDoesError = [
    { q: "Spot the error: 'He don't eat vegetables.'", opts: ['He','don\'t','eat','vegetables'], c: 'B', exp: "'Don't' galat — He ke saath 'doesn't' chahiye.", d: 'easy' },
    { q: "Spot the error: 'She doesn't goes to school.'", opts: ['She','doesn\'t','goes','to school'], c: 'C', exp: "'Goes' galat — doesn't ke baad base verb 'go' chahiye.", d: 'easy' },
    { q: "Spot the error: 'Do he speaks English?'", opts: ['Do','he','speaks','English'], c: 'A', exp: "'Do' galat — He ke saath 'Does' chahiye.", d: 'easy' },
    { q: "Spot the error: 'Does they play cricket?'", opts: ['Does','they','play','cricket'], c: 'A', exp: "'Does' galat — They ke saath 'Do' chahiye.", d: 'easy' },
    { q: "Spot the error: 'I not like this.'", opts: ['I','not','like','this'], c: 'B', exp: "'Not' alone galat — 'do not' ya 'don't' chahiye.", d: 'medium' },
    { q: "Spot the error: 'Why he doesn't comes here?'", opts: ['Why he','doesn\'t','comes','here'], c: 'C', exp: "'Comes' galat — doesn't ke baad base verb 'come'.", d: 'medium' },
  ];

  // Programmatic expansion
  let testDc = 0;
  for (const subj3 of ['He','She','It','My mother','The teacher','My friend']) {
    for (const vb of verbs.slice(0, 15)) {
      const opts = shuffle([`${subj3} doesn't ${vb.base}.`, `${subj3} don't ${vb.base}.`, `${subj3} doesn't ${vb.thirdP}.`, `${subj3} not ${vb.base}.`]);
      const correctSent = `${subj3} doesn't ${vb.base}.`;
      const ci = opts.indexOf(correctSent);
      testItems.push({
        type: 'mcq',
        question: `Choose the correct negative: (${subj3} / ${vb.hi})`,
        options: opts,
        correct: ci === -1 ? 'A' : ['A','B','C','D'][ci],
        explanation: `'Doesn't + ${vb.base}' — He/She/It ke saath doesn't, aur verb base form.`,
        difficulty: testDc++ % 3 === 0 ? 'easy' : 'medium',
        marks: 1, category: CAT, sectionId: SEC,
      });
    }
  }
  for (const subjPl of ['I','We','You','They','Students','My friends']) {
    for (const vb of verbs.slice(0, 8)) {
      const opts = shuffle([`${subjPl} don't ${vb.base}.`, `${subjPl} doesn't ${vb.base}.`, `${subjPl} don't ${vb.thirdP}.`, `${subjPl} not ${vb.base}.`]);
      const correctSent = `${subjPl} don't ${vb.base}.`;
      const ci = opts.indexOf(correctSent);
      testItems.push({
        type: 'mcq',
        question: `Choose the correct negative: (${subjPl} / ${vb.hi})`,
        options: opts,
        correct: ci === -1 ? 'A' : ['A','B','C','D'][ci],
        explanation: `'Don't + ${vb.base}' — I/We/You/They ke saath don't.`,
        difficulty: 'easy',
        marks: 1, category: CAT, sectionId: SEC,
      });
    }
  }

  testItems.push(...doDoesChoose.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...doDoesTranslate.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...doDoesError.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  const testUniq = dedup(testItems, x => x.question);
  const testOut = assignIDs(testUniq.slice(0, 350));

  return { practice: practiceOut, test: testOut };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: WH QUESTIONS
// ═══════════════════════════════════════════════════════════════════════════
function buildWHQuestions() {
  const SEC = 'wh-questions', CAT = 'WH Questions';
  const practice = [];
  const test = [];

  const whWords = [
    { wh: 'What', hi: 'क्या/कौनसा', use: 'thing/action' },
    { wh: 'Where', hi: 'कहाँ', use: 'place' },
    { wh: 'When', hi: 'कब', use: 'time' },
    { wh: 'Who', hi: 'कौन', use: 'person' },
    { wh: 'Why', hi: 'क्यों', use: 'reason' },
    { wh: 'How', hi: 'कैसे', use: 'manner' },
    { wh: 'Which', hi: 'कौनसा', use: 'choice' },
    { wh: 'Whose', hi: 'किसका', use: 'possession' },
    { wh: 'Whom', hi: 'किसे/किसको', use: 'object-person' },
    { wh: 'How many', hi: 'कितने (countable)', use: 'quantity-count' },
    { wh: 'How much', hi: 'कितना (uncountable)', use: 'quantity-mass' },
    { wh: 'How long', hi: 'कितने समय से', use: 'duration' },
    { wh: 'How often', hi: 'कितनी बार', use: 'frequency' },
    { wh: 'How far', hi: 'कितनी दूर', use: 'distance' },
  ];

  const verbs3rd = [
    { base: 'do', v3: 'does', hi: 'करना' },
    { base: 'go', v3: 'goes', hi: 'जाना' },
    { base: 'eat', v3: 'eats', hi: 'खाना' },
    { base: 'work', v3: 'works', hi: 'काम करना' },
    { base: 'live', v3: 'lives', hi: 'रहना' },
    { base: 'study', v3: 'studies', hi: 'पढ़ना' },
    { base: 'like', v3: 'likes', hi: 'पसंद करना' },
    { base: 'come', v3: 'comes', hi: 'आना' },
    { base: 'speak', v3: 'speaks', hi: 'बोलना' },
    { base: 'teach', v3: 'teaches', hi: 'पढ़ाना' },
    { base: 'play', v3: 'plays', hi: 'खेलना' },
    { base: 'know', v3: 'knows', hi: 'जानना' },
    { base: 'travel', v3: 'travels', hi: 'यात्रा करना' },
    { base: 'prefer', v3: 'prefers', hi: 'prefer करना' },
  ];

  const subjs3rd = ['he','she','my friend','my brother','my sister','my teacher','the manager','the doctor','your father'];
  const subjsYou = ['you','we','they'];

  const contexts = [
    { ctx: 'daily-life', objs: ['every day','in the morning','at night','usually','often'] },
    { ctx: 'food', objs: ['for breakfast','for lunch','for dinner','at the restaurant','at home'] },
    { ctx: 'school', objs: ['in school','in class','every day','after school','for the exam'] },
    { ctx: 'office', objs: ['at work','in the office','every morning','after meetings','on weekends'] },
    { ctx: 'travel', objs: ['to office','to school','to Mumbai','to the market','on weekends'] },
  ];

  const diffCycle = ['easy','easy','medium','medium','hard'];
  let dc = 0;

  // BLOCK 1: What questions
  const whatSentences = [
    { h: 'तुम क्या करते हो?', e: 'What do you do?', hint: 'What + do + you + do?', d: 'easy' },
    { h: 'वो क्या काम करती है?', e: 'What does she do?', hint: 'What + does + she + do?', d: 'easy' },
    { h: 'तुम क्या खाते हो?', e: 'What do you eat?', hint: 'What + do + you + eat?', d: 'easy' },
    { h: 'वो क्या पढ़ता है?', e: 'What does he study?', hint: 'What + does + he + study?', d: 'easy' },
    { h: 'तुम्हें क्या पसंद है?', e: 'What do you like?', hint: 'What + do + you + like?', d: 'easy' },
    { h: 'वो teacher क्या पढ़ाते हैं?', e: 'What does the teacher teach?', hint: 'What + does + the teacher + teach?', d: 'medium' },
    { h: 'तुम क्या सोचते हो?', e: 'What do you think?', hint: 'What + do + you + think?', d: 'easy' },
    { h: 'वो क्या पीती है?', e: 'What does she drink?', hint: 'What + does + she + drink?', d: 'easy' },
    { h: 'वो लोग office में क्या करते हैं?', e: 'What do they do in the office?', hint: 'What + do + they + do?', d: 'medium' },
    { h: 'तुम्हारा नाम क्या है?', e: 'What is your name?', hint: 'What + is + your name? (be verb)', d: 'easy' },
    { h: 'तुम्हारी hobby क्या है?', e: 'What is your hobby?', hint: 'What + is + your hobby?', d: 'easy' },
    { h: 'वो problem क्या है?', e: 'What is the problem?', hint: 'What + is + the problem?', d: 'easy' },
    { h: 'अगला exam कब है?', e: 'When is the next exam?', hint: 'When + is + the next exam?', d: 'medium' },
    { h: 'यह कौनसी किताब है?', e: 'Which book is this?', hint: 'Which + book + is + this?', d: 'easy' },
  ];

  // BLOCK 2: Where questions
  const whereSentences = [
    { h: 'तुम कहाँ रहते हो?', e: 'Where do you live?', hint: 'Where + do + you + live?', d: 'easy' },
    { h: 'वो कहाँ काम करता है?', e: 'Where does he work?', hint: 'Where + does + he + work?', d: 'easy' },
    { h: 'तुम्हारे parents कहाँ रहते हैं?', e: 'Where do your parents live?', hint: 'Where + do + your parents + live?', d: 'medium' },
    { h: 'वो कहाँ पढ़ती है?', e: 'Where does she study?', hint: 'Where + does + she + study?', d: 'easy' },
    { h: 'तुम lunch कहाँ खाते हो?', e: 'Where do you have lunch?', hint: 'Where + do + you + have?', d: 'easy' },
    { h: 'वो school कहाँ है?', e: 'Where is the school?', hint: 'Where + is + the school? (be verb)', d: 'easy' },
    { h: 'तुम्हारा घर कहाँ है?', e: 'Where is your house?', hint: 'Where + is + your house?', d: 'easy' },
    { h: 'नज़दीकी hospital कहाँ है?', e: 'Where is the nearest hospital?', hint: 'Where + is + the nearest hospital?', d: 'medium' },
    { h: 'वो लोग weekend पर कहाँ जाते हैं?', e: 'Where do they go on weekends?', hint: 'Where + do + they + go?', d: 'medium' },
    { h: 'तुम्हारी company कहाँ है?', e: 'Where is your company?', hint: 'Where + is + your company?', d: 'easy' },
  ];

  // BLOCK 3: When questions
  const whenSentences = [
    { h: 'तुम school कब जाते हो?', e: 'When do you go to school?', hint: 'When + do + you + go?', d: 'easy' },
    { h: 'वो office कब जाता है?', e: 'When does he go to office?', hint: 'When + does + he + go?', d: 'easy' },
    { h: 'तुम्हारा birthday कब है?', e: 'When is your birthday?', hint: 'When + is + your birthday?', d: 'easy' },
    { h: 'मीटिंग कब शुरू होती है?', e: 'When does the meeting start?', hint: 'When + does + the meeting + start?', d: 'medium' },
    { h: 'train कब आती है?', e: 'When does the train arrive?', hint: 'When + does + the train + arrive?', d: 'easy' },
    { h: 'वो लोग कब आते हैं?', e: 'When do they arrive?', hint: 'When + do + they + arrive?', d: 'easy' },
    { h: 'exam कब होता है?', e: 'When does the exam take place?', hint: 'When + does + the exam + take place?', d: 'medium' },
    { h: 'तुम generally कब सोते हो?', e: 'When do you generally sleep?', hint: 'When + do + you + sleep?', d: 'easy' },
  ];

  // BLOCK 4: Who questions
  const whoSentences = [
    { h: 'तुम्हें English कौन पढ़ाता है?', e: 'Who teaches you English?', hint: "Who + teaches (no do/does when who=subject)", d: 'medium' },
    { h: 'कौन यहाँ रहता है?', e: 'Who lives here?', hint: "Who + lives (no do/does when who=subject)", d: 'medium' },
    { h: 'तुम किसे जानते हो?', e: 'Who do you know?', hint: "Who + do + you + know? (who=object)", d: 'medium' },
    { h: 'तुम किससे मिलना चाहते हो?', e: 'Who do you want to meet?', hint: "Who + do + you + want?", d: 'medium' },
    { h: 'इस office का boss कौन है?', e: 'Who is the boss of this office?', hint: "Who + is (be verb)", d: 'easy' },
    { h: 'कौन आया?', e: 'Who came?', hint: "Who + came (past, subject position)", d: 'easy' },
    { h: 'कौन best singer है?', e: 'Who is the best singer?', hint: "Who + is + the best singer?", d: 'easy' },
    { h: 'तुम्हारा favorite actor कौन है?', e: 'Who is your favourite actor?', hint: "Who + is + your favourite actor?", d: 'easy' },
    { h: 'कौन match जीतेगा?', e: 'Who will win the match?', hint: "Who + will + win?", d: 'medium' },
    { h: 'तुम किसके साथ रहते हो?', e: 'Who do you live with?', hint: "Who + do + you + live + with?", d: 'hard' },
  ];

  // BLOCK 5: Why questions
  const whySentences = [
    { h: 'तुम English क्यों सीखते हो?', e: 'Why do you learn English?', hint: 'Why + do + you + learn?', d: 'easy' },
    { h: 'वो school क्यों नहीं आता?', e: "Why doesn't he come to school?", hint: "Why + doesn't + he + come?", d: 'medium' },
    { h: 'तुम late क्यों आए?', e: 'Why did you come late?', hint: 'Why + did + you + come? (past)', d: 'medium' },
    { h: 'वो इतना busy क्यों है?', e: 'Why is she so busy?', hint: 'Why + is + she + so busy?', d: 'easy' },
    { h: 'वो लोग English क्यों नहीं बोलते?', e: "Why don't they speak English?", hint: "Why + don't + they + speak?", d: 'medium' },
    { h: 'यह problem क्यों हो रही है?', e: 'Why is this problem happening?', hint: 'Why + is + this problem + happening?', d: 'medium' },
    { h: 'वो रो क्यों रही है?', e: 'Why is she crying?', hint: 'Why + is + she + crying?', d: 'easy' },
    { h: 'तुम gym क्यों नहीं जाते?', e: "Why don't you go to the gym?", hint: "Why + don't + you + go?", d: 'medium' },
    { h: 'India इतना diverse क्यों है?', e: 'Why is India so diverse?', hint: 'Why + is + India + so diverse?', d: 'hard' },
    { h: 'boss ने उसे क्यों promote किया?', e: 'Why did the boss promote him?', hint: 'Why + did + the boss + promote?', d: 'hard' },
  ];

  // BLOCK 6: How questions
  const howSentences = [
    { h: 'तुम यहाँ कैसे आते हो?', e: 'How do you come here?', hint: 'How + do + you + come?', d: 'easy' },
    { h: 'वो इतनी fast कैसे काम करती है?', e: 'How does she work so fast?', hint: 'How + does + she + work?', d: 'medium' },
    { h: 'तुम English कैसे सीख रहे हो?', e: 'How are you learning English?', hint: 'How + are + you + learning? (continuous)', d: 'medium' },
    { h: 'तुम्हारे parents कैसे हैं?', e: 'How are your parents?', hint: 'How + are + your parents? (be verb)', d: 'easy' },
    { h: 'यह machine कैसे काम करती है?', e: 'How does this machine work?', hint: 'How + does + this machine + work?', d: 'medium' },
    { h: 'तुम office कैसे जाते हो?', e: 'How do you go to the office?', hint: 'How + do + you + go?', d: 'easy' },
    { h: 'वो English इतनी अच्छी कैसे बोलता है?', e: 'How does he speak English so well?', hint: 'How + does + he + speak?', d: 'medium' },
    { h: 'यह recipe कैसे बनाते हैं?', e: 'How do you make this recipe?', hint: 'How + do + you + make?', d: 'easy' },
    { h: 'तुम इतने calm कैसे रहते हो?', e: 'How do you stay so calm?', hint: 'How + do + you + stay?', d: 'medium' },
    { h: 'वो किसी को कैसे motivate करती है?', e: 'How does she motivate others?', hint: 'How + does + she + motivate?', d: 'hard' },
  ];

  // BLOCK 7: Extended WH (Which, Whose, Whom, How many, etc.)
  const extendedWH = [
    { h: 'तुम्हें कौनसी movie पसंद है?', e: 'Which movie do you like?', hint: 'Which + movie + do + you + like?', d: 'easy' },
    { h: 'यह किसका phone है?', e: 'Whose phone is this?', hint: 'Whose + phone + is + this?', d: 'easy' },
    { h: 'तुम किससे बात कर रहे हो?', e: 'Whom are you talking to?', hint: 'Whom + are + you + talking to? (formal)', d: 'hard' },
    { h: 'तुम्हारे कितने दोस्त हैं?', e: 'How many friends do you have?', hint: 'How many + noun + do + you + have?', d: 'medium' },
    { h: 'तुम कितना पानी पीते हो?', e: 'How much water do you drink?', hint: 'How much + uncountable + do + you + drink?', d: 'medium' },
    { h: 'तुम कब से English सीख रहे हो?', e: 'How long have you been learning English?', hint: 'How long + have + you + been + V-ing?', d: 'hard' },
    { h: 'तुम कितनी बार gym जाते हो?', e: 'How often do you go to the gym?', hint: 'How often + do + you + go?', d: 'medium' },
    { h: 'तुम्हारा घर school से कितनी दूर है?', e: 'How far is your house from school?', hint: 'How far + is + your house?', d: 'medium' },
    { h: 'कौनसा रंग तुम्हें पसंद है?', e: 'Which colour do you like?', hint: 'Which + colour + do + you + like?', d: 'easy' },
    { h: 'तुम किस team के लिए खेलते हो?', e: 'Which team do you play for?', hint: 'Which team + do + you + play for?', d: 'medium' },
    { h: 'यह किसकी book है?', e: 'Whose book is this?', hint: 'Whose + book + is?', d: 'easy' },
    { h: 'तुम किससे मिले?', e: 'Whom did you meet?', hint: 'Whom + did + you + meet?', d: 'hard' },
    { h: 'Meeting में कितने लोग थे?', e: 'How many people were in the meeting?', hint: 'How many + people + were?', d: 'medium' },
    { h: 'तुम कितना earn करते हो?', e: 'How much do you earn?', hint: 'How much + do + you + earn?', d: 'hard' },
    { h: 'तुम daily कितने घंटे पढ़ते हो?', e: 'How many hours do you study daily?', hint: 'How many + hours + do + you + study?', d: 'medium' },
    { h: 'वो office कब से आ रहा है?', e: 'How long has he been coming to the office?', hint: 'How long + has + he + been + coming?', d: 'hard' },
    { h: 'तुम कितनी बार market जाते हो?', e: 'How often do you go to the market?', hint: 'How often + do + you + go?', d: 'medium' },
    { h: 'Mumbai Delhi से कितनी दूर है?', e: 'How far is Mumbai from Delhi?', hint: 'How far + is + subject?', d: 'medium' },
  ];

  // Combined all rich sentences + hand-crafted
  const allRich = [...whatSentences, ...whereSentences, ...whenSentences, ...whoSentences,
    ...whySentences, ...howSentences, ...extendedWH];

  for (const s of allRich) {
    practice.push({
      hindi: s.h, english: s.e, alternatives: [],
      hint: s.hint,
      explanation: `WH question formula: ${s.hint}`,
      difficulty: s.d,
      tags: ['wh-questions', s.hint.split('+')[0].trim().toLowerCase().replace(' ', '-'), domains_pa[dc++ % 12]],
      grammarRule: s.hint,
      category: CAT, sectionId: SEC,
    });
  }

  // Programmatic expansion
  for (const wh of whWords.slice(0, 6)) {
    for (const subj of subjs3rd.slice(0, 7)) {
      for (const vb of verbs3rd.slice(0, 8)) {
        const obj = contexts[dc % contexts.length].objs[dc % 5];
        const h = `${subj === 'you' ? 'तुम' : 'वो'} ${wh.hi} ${vb.hi}?`;
        const e = wh.wh === 'Who' ? `${wh.wh} ${vb.v3}s ${obj}?` :
                  subj === 'he' || subj === 'she' || subj.includes('friend') || subj.includes('teacher') || subj.includes('doctor') || subj.includes('brother') || subj.includes('sister') || subj.includes('manager') || subj.includes('father') ?
                  `${wh.wh} does ${subj} ${vb.base} ${obj}?` :
                  `${wh.wh} do ${subj} ${vb.base} ${obj}?`;
        practice.push({
          hindi: h, english: e, alternatives: [],
          hint: `${wh.wh} + do/does + subject + ${vb.base}?`,
          explanation: `WH question: ${wh.wh} pehle, phir do/does (He/She/It ke saath does, baaki ke saath do), phir base verb.`,
          difficulty: diffCycle[dc++ % diffCycle.length],
          tags: ['wh-questions', wh.wh.toLowerCase(), domains_pa[dc % 12]],
          grammarRule: `${wh.wh} + do/does + subject + base verb?`,
          category: CAT, sectionId: SEC,
        });
      }
    }
  }

  // Extra domain-specific sentences
  const extraWH = [
    { h: 'Restaurant कहाँ है?', e: 'Where is the restaurant?', d: 'easy', t: ['food'] },
    { h: 'तुम्हारा favorite food क्या है?', e: 'What is your favourite food?', d: 'easy', t: ['food'] },
    { h: 'वो कौनसी भाषा बोलता है?', e: 'Which language does he speak?', d: 'easy', t: ['daily-life'] },
    { h: 'Doctor कब available होगा?', e: 'When will the doctor be available?', d: 'medium', t: ['health'] },
    { h: 'तुम gym में कितने घंटे काम करते हो?', e: 'How many hours do you work out at the gym?', d: 'medium', t: ['health'] },
    { h: 'Sale कब तक है?', e: 'How long does the sale last?', d: 'medium', t: ['shopping'] },
    { h: 'Festival कब मनाते हैं?', e: 'When do we celebrate the festival?', d: 'easy', t: ['festivals'] },
    { h: 'वो इतना खुश क्यों है?', e: 'Why is he so happy?', d: 'easy', t: ['daily-life'] },
    { h: 'तुम्हारी team में कितने लोग हैं?', e: 'How many people are in your team?', d: 'medium', t: ['office'] },
    { h: 'यह project कब submit होगा?', e: 'When will this project be submitted?', d: 'medium', t: ['office'] },
    { h: 'तुम कौनसा phone use करते हो?', e: 'Which phone do you use?', d: 'easy', t: ['technology'] },
    { h: 'Password कैसे reset करते हैं?', e: 'How do you reset the password?', d: 'medium', t: ['technology'] },
    { h: 'WiFi कहाँ connected होगी?', e: 'Where will the WiFi be connected?', d: 'medium', t: ['technology'] },
    { h: 'तुम्हारी flight कब है?', e: 'When is your flight?', d: 'easy', t: ['travel'] },
    { h: 'Airport यहाँ से कितनी दूर है?', e: 'How far is the airport from here?', d: 'medium', t: ['travel'] },
    { h: 'तुम train से जाते हो या bus से?', e: 'Do you go by train or by bus?', d: 'medium', t: ['travel'] },
    { h: 'Hotel कहाँ है?', e: 'Where is the hotel?', d: 'easy', t: ['travel'] },
    { h: 'तुम्हारा favorite dish कौनसा है?', e: 'Which is your favourite dish?', d: 'easy', t: ['food'] },
    { h: 'यह weather क्यों इतना खराब है?', e: 'Why is the weather so bad?', d: 'easy', t: ['weather'] },
    { h: 'कब बारिश आएगी?', e: 'When will it rain?', d: 'easy', t: ['weather'] },
    { h: 'Mall कहाँ है?', e: 'Where is the mall?', d: 'easy', t: ['shopping'] },
    { h: 'Sale कब है?', e: 'When is the sale?', d: 'easy', t: ['shopping'] },
    { h: 'Diwali कब है इस साल?', e: 'When is Diwali this year?', d: 'easy', t: ['festivals'] },
    { h: 'Holi क्यों मनाते हैं?', e: 'Why do we celebrate Holi?', d: 'medium', t: ['festivals'] },
    { h: 'यह game कैसे खेलते हैं?', e: 'How do you play this game?', d: 'easy', t: ['sports'] },
    { h: 'Match कहाँ होगा?', e: 'Where will the match be held?', d: 'easy', t: ['sports'] },
    { h: 'Team captain कौन है?', e: 'Who is the team captain?', d: 'easy', t: ['sports'] },
    { h: 'तुम रोज़ कितना पानी पीते हो?', e: 'How much water do you drink daily?', d: 'medium', t: ['health'] },
    { h: 'वो क्यों hospital गया?', e: 'Why did he go to the hospital?', d: 'medium', t: ['health'] },
    { h: 'तुम्हारा blood group क्या है?', e: 'What is your blood group?', d: 'easy', t: ['health'] },
    // Compound/complex WH
    { h: 'तुम क्यों English सीखते हो और कब से?', e: 'Why do you learn English and since when?', d: 'hard', t: ['compound','motivation'] },
    { h: 'वो कब और कहाँ काम करता है?', e: 'When and where does he work?', d: 'hard', t: ['compound','office'] },
    { h: 'तुम्हें कौनसी movie पसंद है और क्यों?', e: 'Which movie do you like and why?', d: 'hard', t: ['compound','entertainment'] },
    { h: 'Who teaches you and what do they teach?', e: 'Who teaches you and what do they teach?', d: 'hard', t: ['compound','school'] },
  ];

  for (const s of extraWH) {
    practice.push({
      hindi: s.h, english: s.e, alternatives: [],
      hint: s.e.split(' ').slice(0, 3).join(' '),
      explanation: `WH question: correct WH word + do/does + subject + base verb.`,
      difficulty: s.d,
      tags: ['wh-questions', ...s.t],
      grammarRule: 'WH word + do/does + subject + base verb?',
      category: CAT, sectionId: SEC,
    });
  }

  const practiceUniq = dedup(practice, x => x.hindi);
  const practiceOut = assignIDs(practiceUniq.slice(0, 950));

  // ── TEST ──
  const testItems = [];

  // Choose correct WH word
  const whChoose = [
    { q: "Fill in: '___ do you live?' (place)", opts: ['What','Where','When','Why'], c: 'B', exp: "'Where' place ke liye.", d: 'easy' },
    { q: "Fill in: '___ does she come to school?' (time)", opts: ['Where','What','When','Who'], c: 'C', exp: "'When' time ke liye.", d: 'easy' },
    { q: "Fill in: '___ teaches you English?' (person)", opts: ['What','Where','Who','When'], c: 'C', exp: "'Who' person ke liye.", d: 'easy' },
    { q: "Fill in: '___ do you learn English?' (reason)", opts: ['When','Where','How','Why'], c: 'D', exp: "'Why' reason ke liye.", d: 'easy' },
    { q: "Fill in: '___ do you go to office?' (manner/transport)", opts: ['What','When','How','Which'], c: 'C', exp: "'How' manner/method ke liye.", d: 'easy' },
    { q: "Fill in: '___ movie do you like?' (choice)", opts: ['What','Where','Which','Who'], c: 'C', exp: "'Which' choice ke liye.", d: 'easy' },
    { q: "Fill in: '___ phone is this?' (possession)", opts: ['Who','Whose','Whom','Which'], c: 'B', exp: "'Whose' possession ke liye.", d: 'medium' },
    { q: "Fill in: '___ do you want to meet?' (object person)", opts: ['Who','Whose','Whom','Which'], c: 'C', exp: "'Whom' object position mein person ke liye (formal).", d: 'hard' },
    { q: "Fill in: '___ friends do you have?' (count)", opts: ['How much','How many','How long','How often'], c: 'B', exp: "'How many' countable noun ke saath.", d: 'medium' },
    { q: "Fill in: '___ water do you drink daily?' (measure)", opts: ['How many','How much','How long','How often'], c: 'B', exp: "'How much' uncountable noun ke saath.", d: 'medium' },
    { q: "Fill in: '___ have you been studying English?' (duration)", opts: ['How many','How much','How long','How often'], c: 'C', exp: "'How long' duration ke liye.", d: 'hard' },
    { q: "Fill in: '___ do you exercise?' (frequency)", opts: ['How many','How much','How long','How often'], c: 'D', exp: "'How often' frequency ke liye.", d: 'medium' },
    { q: "Fill in: '___ is your office from your home?' (distance)", opts: ['How many','How much','How long','How far'], c: 'D', exp: "'How far' distance ke liye.", d: 'medium' },
    { q: "Fill in: '___ is the Prime Minister of India?'", opts: ['What','When','Who','Where'], c: 'C', exp: "'Who' person (position holder) ke liye.", d: 'easy' },
    { q: "Fill in: '___ is the capital of India?'", opts: ['Who','When','What','Where'], c: 'C', exp: "'What' thing ke liye (though 'where' also possible, 'what' for identity).", d: 'easy' },
  ];

  // Do vs Does in WH questions
  const doDoes_WH = [
    { q: "Fill in: 'What ___ she do?'", opts: ['do','does','is','has'], c: 'B', exp: "'Does' She ke saath.", d: 'easy' },
    { q: "Fill in: 'Where ___ they live?'", opts: ['does','do','is','are'], c: 'B', exp: "'Do' They ke saath.", d: 'easy' },
    { q: "Fill in: 'When ___ the train arrive?'", opts: ['do','does','is','has'], c: 'B', exp: "'Does' singular noun ke saath.", d: 'easy' },
    { q: "Fill in: 'Why ___ you study English?'", opts: ['does','do','are','is'], c: 'B', exp: "'Do' You ke saath.", d: 'easy' },
    { q: "Fill in: 'How ___ he go to school?'", opts: ['do','does','is','was'], c: 'B', exp: "'Does' He ke saath.", d: 'easy' },
    { q: "Fill in: 'What ___ your parents do?'", opts: ['does','do','are','is'], c: 'B', exp: "'Do' plural subject ke saath.", d: 'medium' },
    { q: "Fill in: 'How often ___ she exercise?'", opts: ['do','does','is','has'], c: 'B', exp: "'Does' She ke saath.", d: 'medium' },
    { q: "Fill in: 'How much water ___ you drink?'", opts: ['does','do','is','are'], c: 'B', exp: "'Do' You ke saath.", d: 'easy' },
    { q: "Fill in: 'Why ___ the manager come late?'", opts: ['do','does','is','has'], c: 'B', exp: "'Does' singular subject ke saath.", d: 'medium' },
    { q: "Fill in: 'Which team ___ they support?'", opts: ['does','do','are','is'], c: 'B', exp: "'Do' They ke saath.", d: 'easy' },
  ];

  // Error spotting
  const errSpotWH = [
    { q: "Spot the error: 'What you want?'", opts: ['What','you','want','(no error)'], c: 'A', exp: "WH question mein 'do' zaroori hai — 'What do you want?' sahi.", d: 'easy' },
    { q: "Spot the error: 'Where does she lives?'", opts: ['Where','does','she','lives'], c: 'D', exp: "'Lives' galat — does ke baad base verb 'live' chahiye.", d: 'easy' },
    { q: "Spot the error: 'Why he doesn't comes here?'", opts: ['Why he','doesn\'t','comes','here'], c: 'C', exp: "'Comes' galat — doesn't ke baad 'come' (base verb) chahiye.", d: 'medium' },
    { q: "Spot the error: 'When do he go to office?'", opts: ['When','do','he','go'], c: 'B', exp: "'Do' galat — He ke saath 'does' chahiye: 'When does he go?'", d: 'easy' },
    { q: "Spot the error: 'How many water do you drink?'", opts: ['How many','water','do','drink'], c: 'A', exp: "'How many' galat — 'water' uncountable hai, 'how much' chahiye.", d: 'medium' },
    { q: "Spot the error: 'Who does live here?' (Who as subject)", opts: ['Who','does','live','here'], c: 'B', exp: "'Does' galat — 'Who' subject position mein ho toh do/does nahi aata: 'Who lives here?'", d: 'hard' },
    { q: "Spot the error: 'Which book do he prefer?'", opts: ['Which book','do','he','prefer'], c: 'B', exp: "'Do' galat — He ke saath 'does' chahiye.", d: 'easy' },
    { q: "Spot the error: 'Where you live?'", opts: ['Where','you','live','(no error)'], c: 'A', exp: "WH question mein do/does zaroori — 'Where do you live?' sahi.", d: 'easy' },
  ];

  // Translate Hindi → MCQ
  const translateWH = [
    { q: "Translate: 'तुम कहाँ रहते हो?'", opts: ['Where you live?','Where do you lives?','Where do you live?','Where does you live?'], c: 'C', exp: "'Where do you live?' — You ke saath Do, base verb.", d: 'easy' },
    { q: "Translate: 'वो क्या करता है?'", opts: ['What he does?','What does he do?','What does he does?','What do he do?'], c: 'B', exp: "'What does he do?' — He ke saath does, base verb.", d: 'easy' },
    { q: "Translate: 'वो school क्यों नहीं आती?'", opts: ["Why she doesn't come?","Why doesn't she comes?","Why doesn't she come?","Why don't she come?"], c: 'C', exp: "'Why doesn't she come?' — She ke saath doesn't, base verb.", d: 'medium' },
    { q: "Translate: 'तुम्हें English कौन पढ़ाता है?'", opts: ['Who does teach you English?','Who teach you English?','Who teaches you English?','Who do teach you English?'], c: 'C', exp: "'Who teaches you English?' — Who subject position mein, do/does nahi.", d: 'hard' },
    { q: "Translate: 'वो कितनी बार gym जाती है?'", opts: ['How often she go?','How often does she goes?','How often does she go?','How often do she go?'], c: 'C', exp: "'How often does she go?' — She ke saath does, base verb.", d: 'medium' },
    { q: "Translate: 'तुम कितना पानी पीते हो?'", opts: ['How many water do you drink?','How much water do you drinks?','How much water do you drink?','How much water does you drink?'], c: 'C', exp: "'How much water do you drink?' — uncountable ke saath 'how much', You ke saath 'do'.", d: 'medium' },
    { q: "Translate: 'वो कब office जाता है?'", opts: ['When he goes to office?','When does he goes to office?','When does he go to office?','When do he go to office?'], c: 'C', exp: "'When does he go?' — He ke saath does, base verb.", d: 'easy' },
    { q: "Translate: 'यह किसकी book है?'", opts: ['Who book is this?','Which book is this?','Whose book is this?','Whom book is this?'], c: 'C', exp: "'Whose' possession ke liye.", d: 'medium' },
    { q: "Translate: 'तुम office कैसे जाते हो?'", opts: ['How you go to office?','How do you goes to office?','How do you go to office?','How does you go to office?'], c: 'C', exp: "'How do you go?' — You ke saath do, base verb.", d: 'easy' },
    { q: "Translate: 'Meeting में कितने लोग थे?'", opts: ['How much people were?','How many peoples were?','How many people were in the meeting?','How many people was in the meeting?'], c: 'C', exp: "'How many people were' — countable ke saath 'how many'.", d: 'medium' },
  ];

  // Programmatic MCQ expansion
  let whTestC = 0;
  for (const wh of whWords.slice(0, 6)) {
    for (const subj of ['he','she','they','you','we']) {
      const needsDoes = (subj === 'he' || subj === 'she');
      const auxCorrect = needsDoes ? 'does' : 'do';
      const auxWrong = needsDoes ? 'do' : 'does';
      testItems.push({
        type: 'mcq',
        question: `Fill in: '${wh.wh} ___ ${subj} usually do?'`,
        options: shuffle([auxCorrect, auxWrong, 'is', 'are']),
        correct: null,
        explanation: `'${auxCorrect}' — ${needsDoes ? 'He/She/It' : 'I/We/You/They'} ke saath '${auxCorrect}'.`,
        difficulty: whTestC++ % 3 === 0 ? 'easy' : 'medium',
        marks: 1, category: CAT, sectionId: SEC,
      });
      const last = testItems[testItems.length - 1];
      const ci = last.options.indexOf(auxCorrect);
      last.correct = ci === -1 ? 'A' : ['A','B','C','D'][ci];
    }
  }

  testItems.push(...whChoose.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...doDoes_WH.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...errSpotWH.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));
  testItems.push(...translateWH.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  // More expansion to hit 350
  const moreWHTest = [
    { q: "Which WH word asks about a place?", opts: ['What','When','Where','Why'], c: 'C', exp: "'Where' place ke liye.", d: 'easy' },
    { q: "Which WH word asks about time?", opts: ['Why','When','Where','How'], c: 'B', exp: "'When' time ke liye.", d: 'easy' },
    { q: "Which WH word asks about a person?", opts: ['What','Where','When','Who'], c: 'D', exp: "'Who' person ke liye.", d: 'easy' },
    { q: "Which WH word asks about a reason?", opts: ['When','What','Where','Why'], c: 'D', exp: "'Why' reason ke liye.", d: 'easy' },
    { q: "Which WH word asks about manner/method?", opts: ['What','How','Who','Where'], c: 'B', exp: "'How' manner ke liye.", d: 'easy' },
    { q: "Which WH word asks about possession?", opts: ['Who','Whom','Whose','Which'], c: 'C', exp: "'Whose' possession ke liye.", d: 'medium' },
    { q: "Which WH word is used for countable quantity?", opts: ['How much','How long','How many','How often'], c: 'C', exp: "'How many' countable nouns ke saath.", d: 'medium' },
    { q: "Which WH word is used for uncountable quantity?", opts: ['How many','How much','How long','How often'], c: 'B', exp: "'How much' uncountable nouns ke saath.", d: 'medium' },
    { q: "Choose correct: 'Kahan rehte ho?' in English", opts: ['Where you live?','Where do you live?','Where does you live?','Where do you lives?'], c: 'B', exp: "'Where do you live?' sahi — do + you + base verb.", d: 'easy' },
    { q: "Choose correct: 'Vo kya karta hai?' in English", opts: ['What he does?','What does he do?','What do he do?','What does he does?'], c: 'B', exp: "'What does he do?' — He ke saath does, base verb.", d: 'easy' },
    { q: "Choose correct WH question form:", opts: ['How she goes to office?','How does she goes to office?','How does she go to office?','How do she go to office?'], c: 'C', exp: "'How does she go?' — She ke saath does, base verb.", d: 'easy' },
    { q: "Choose correct WH question form:", opts: ['When do he wake up?','When does he wakes up?','When does he wake up?','When he wakes up?'], c: 'C', exp: "'When does he wake up?' sahi.", d: 'easy' },
    { q: "Choose correct WH question form:", opts: ['Why they don\'t come?','Why don\'t they comes?','Why don\'t they come?','Why doesn\'t they come?'], c: 'C', exp: "'Why don't they come?' — They ke saath don't.", d: 'medium' },
    { q: "Choose correct WH question form:", opts: ['Which language do she speak?','Which language does she speaks?','Which language does she speak?','Which language she speaks?'], c: 'C', exp: "'Which language does she speak?' — does + base verb.", d: 'medium' },
    { q: "When 'Who' is the subject, which is correct?", opts: ['Who does live here?','Who do live here?','Who lives here?','Who is live here?'], c: 'C', exp: "'Who lives here?' — Who subject position mein — do/does ki zarurat nahi.", d: 'hard' },
    { q: "When 'Who' is the subject, which is correct?", opts: ['Who does teach English?','Who do teach English?','Who teaches English?','Who is teaching English (simple present)?'], c: 'C', exp: "'Who teaches English?' — subject position mein who, no auxiliary.", d: 'hard' },
    { q: "Fill in: 'How ___ students are in your class?'", opts: ['much','many','long','often'], c: 'B', exp: "'How many' — students countable hain.", d: 'easy' },
    { q: "Fill in: 'How ___ time does it take?'", opts: ['many','much','long','often'], c: 'C', exp: "'How long' — duration/time span ke liye.", d: 'medium' },
    { q: "Fill in: 'How ___ do you eat outside?'", opts: ['many','much','long','often'], c: 'D', exp: "'How often' — frequency ke liye.", d: 'medium' },
    { q: "Fill in: 'How ___ does this book cost?'", opts: ['many','much','long','often'], c: 'B', exp: "'How much' — price/cost uncountable.", d: 'medium' },
    { q: "Translate: 'वो teacher कब आते हैं?'", opts: ['When do the teacher comes?','When does the teacher comes?','When does the teacher come?','When the teacher comes?'], c: 'C', exp: "'When does the teacher come?' — singular subject ke saath does.", d: 'medium' },
    { q: "Translate: 'तुम कितनी बार market जाते हो?'", opts: ['How often you go?','How often do you goes?','How often do you go?','How often does you go?'], c: 'C', exp: "'How often do you go?' — You ke saath do.", d: 'medium' },
    { q: "Which question is asking about manner?", opts: ['What do you eat?','Where do you go?','How do you travel?','When do you sleep?'], c: 'C', exp: "'How do you travel?' — how = manner/method.", d: 'easy' },
    { q: "Which question has a grammar error?", opts: ['Where do you live?','When does she work?','Why don\'t they come?','How he does go?'], c: 'D', exp: "'How he does go?' galat — 'How does he go?' hona chahiye.", d: 'medium' },
    { q: "Which question has a grammar error?", opts: ['What do they want?','Where does he live?','When do we meet?','Why she doesn\'t come?'], c: 'D', exp: "'Why she doesn't come?' galat — 'Why doesn't she come?' (inversion).", d: 'medium' },
  ];
  testItems.push(...moreWHTest.map(x => ({ type:'mcq', ...x, marks:1, category:CAT, sectionId:SEC })));

  const testUniq = dedup(testItems, x => x.question);
  const testOut = assignIDs(testUniq.slice(0, 350));

  return { practice: practiceOut, test: testOut };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════
const sections = [
  { fn: buildObjectPronouns, pPath: 'data/challenge/day-01/generated/practice/object-pronouns.json', tPath: 'data/challenge/day-01/generated/test/object-pronouns.json', name: 'object-pronouns' },
  { fn: buildPossessiveAdjectives, pPath: 'data/challenge/day-01/generated/practice/possessive-adjectives.json', tPath: 'data/challenge/day-01/generated/test/possessive-adjectives.json', name: 'possessive-adjectives' },
  { fn: buildArticles, pPath: 'data/challenge/day-01/generated/practice/articles.json', tPath: 'data/challenge/day-01/generated/test/articles.json', name: 'articles' },
  { fn: buildDoDoes, pPath: 'data/challenge/day-01/generated/practice/do-does.json', tPath: 'data/challenge/day-01/generated/test/do-does.json', name: 'do-does' },
  { fn: buildWHQuestions, pPath: 'data/challenge/day-01/generated/practice/wh-questions.json', tPath: 'data/challenge/day-01/generated/test/wh-questions.json', name: 'wh-questions' },
];

const results = [];
for (const sec of sections) {
  try {
    const { practice, test } = sec.fn();
    fs.writeFileSync(sec.pPath, JSON.stringify(practice, null, 2));
    fs.writeFileSync(sec.tPath, JSON.stringify(test, null, 2));

    // Verify JSON parse and duplicate check
    const pJson = JSON.parse(fs.readFileSync(sec.pPath, 'utf8'));
    const tJson = JSON.parse(fs.readFileSync(sec.tPath, 'utf8'));
    const pHindis = pJson.map(x => x.hindi?.toLowerCase().trim()).filter(Boolean);
    const pDups = pHindis.length - new Set(pHindis).size;
    const tQs = tJson.map(x => x.question?.toLowerCase().trim()).filter(Boolean);
    const tDups = tQs.length - new Set(tQs).size;

    results.push({ name: sec.name, pCount: pJson.length, tCount: tJson.length, pDups, tDups });
    console.log(`[${sec.name}] practice=${pJson.length} test=${tJson.length} pDups=${pDups} tDups=${tDups}`);
  } catch (e) {
    console.error(`ERROR in ${sec.name}:`, e.message);
  }
}

console.log('\n=== SUMMARY ===');
for (const r of results) {
  console.log(`${r.name}: practice=${r.pCount} test=${r.tCount} | pDups=${r.pDups} tDups=${r.tDups}`);
}
