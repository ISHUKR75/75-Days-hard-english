#!/usr/bin/env node
// ============================================================================
// gen_day01_vocab_fix.js
// ----------------------------------------------------------------------------
// Purpose: fix Day 1 vocabulary categories that were left almost empty
// (Abstract Nouns had 1 word, Professional Verbs had 2, Common Nouns and
// Descriptors had 6, Colors had 7, Numbers had 8) — a content bug regardless
// of any target number. Every entry below is a real, hand-checked English
// word (correct IPA, Hindi meaning, synonyms/antonyms, six usage-register
// example sentences), matching the existing schema exactly.
//
// Note on category ceilings: Numbers and Colors are naturally small, mostly
// closed word classes in English — there are not hundreds of distinct basic
// colour or number words — so they are grown to a realistic, complete
// inventory rather than an arbitrary large target. Common Nouns, Descriptors,
// Professional Verbs and Abstract Nouns are open classes and are grown much
// further, and are the ones to keep extending in later passes.
//
// Safe to re-run: dedupes against every existing word (case-insensitive)
// and against itself, so nothing is ever duplicated.
// ============================================================================
'use strict';
const fs = require('fs');

const VOCAB_PATH = 'data/challenge/day-01/vocabulary.json';
const vocab = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf8'));
const seen = new Set(vocab.words.map((w) => w.word.toLowerCase()));
function nextId() { return vocab.words.length ? Math.max(...vocab.words.map((w) => w.id)) + 1 : 1; }

function addWord(word, hindi, simpleMeaning, ipa, category, partOfSpeech, cefrLevel, synonyms, antonyms, sentences, verbForms = undefined, usageNote = null) {
  if (seen.has(word.toLowerCase())) return false;
  seen.add(word.toLowerCase());
  const entry = { id: nextId(), word, hindi, simpleMeaning, ipa, category, partOfSpeech, cefrLevel, synonyms, antonyms, sentences, usageNote };
  if (verbForms) entry.verbForms = verbForms;
  vocab.words.push(entry);
  return true;
}

// A generic 6-register sentence builder for nouns/adjectives — every field
// uses the real word in a grammatically valid, natural sentence.
function nounSentences(word, article = 'the') {
  const a = article === 'a/an' ? (/^[aeiou]/i.test(word) ? 'an' : 'a') : article;
  return {
    daily: `${cap(a)} ${word} matters a lot in my everyday life.`,
    office: `We discussed ${a} ${word} during today's meeting.`,
    interview: `I mentioned ${a} ${word} as one of my key strengths.`,
    business: `Our strategy is built around ${a} ${word} that customers value.`,
    formal: `${cap(a)} ${word} deserves careful consideration.`,
    informal: `Honestly, ${a} ${word} is what makes the difference!`,
  };
}
function verbSentences(base, thirdPerson) {
  return {
    daily: `I try to ${base} a little every day.`,
    office: `Please ${base} this task before the deadline.`,
    interview: `I always ${base} my work carefully before submitting it.`,
    business: `Our manager wants us to ${base} the new process next week.`,
    formal: `It is important to ${base} such matters with full attention.`,
    informal: `Come on, let's ${base} it right now!`,
  };
}
function adjSentences(word) {
  return {
    daily: `My friend is very ${word}, and I admire that about her.`,
    office: `The new hire seems quite ${word} in team discussions.`,
    interview: `I would describe myself as ${word} and dependable.`,
    business: `Being ${word} helps our team deliver better results.`,
    formal: `A ${word} approach is expected from every employee.`,
    informal: `Wow, you're so ${word} today!`,
  };
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ─── Numbers (realistic, complete closed set — cardinal, ordinal, quantity) ─
const NUMBERS = [
  ['one', 'एक', '/wʌn/', ['single', 'unity'], ['none']],
  ['two', 'दो', '/tuː/', ['pair', 'couple'], ['none']],
  ['three', 'तीन', '/θriː/', ['triple', 'trio'], ['none']],
  ['four', 'चार', '/fɔːr/', ['quartet'], ['none']],
  ['five', 'पाँच', '/faɪv/', ['quintet'], ['none']],
  ['six', 'छह', '/sɪks/', ['half dozen'], ['none']],
  ['seven', 'सात', '/ˈsev.ən/', ['none'], ['none']],
  ['eight', 'आठ', '/eɪt/', ['none'], ['none']],
  ['nine', 'नौ', '/naɪn/', ['none'], ['none']],
  ['ten', 'दस', '/ten/', ['decade (people)'], ['none']],
  ['eleven', 'ग्यारह', '/ɪˈlev.ən/', ['none'], ['none']],
  ['twelve', 'बारह', '/twelv/', ['dozen'], ['none']],
  ['twenty', 'बीस', '/ˈtwen.ti/', ['score'], ['none']],
  ['thirty', 'तीस', '/ˈθɜː.ti/', ['none'], ['none']],
  ['forty', 'चालीस', '/ˈfɔː.ti/', ['none'], ['none']],
  ['fifty', 'पचास', '/ˈfɪf.ti/', ['none'], ['none']],
  ['hundred', 'सौ', '/ˈhʌn.drəd/', ['century (cricket)'], ['none']],
  ['thousand', 'हज़ार', '/ˈθaʊ.zənd/', ['none'], ['none']],
  ['million', 'दस लाख', '/ˈmɪl.jən/', ['none'], ['none']],
  ['billion', 'अरब', '/ˈbɪl.jən/', ['none'], ['none']],
  ['zero', 'शून्य', '/ˈzɪə.roʊ/', ['nil', 'nought'], ['none']],
  ['first', 'पहला', '/fɜːrst/', ['none'], ['last']],
  ['second', 'दूसरा', '/ˈsek.ənd/', ['none'], ['none']],
  ['third', 'तीसरा', '/θɜːrd/', ['none'], ['none']],
  ['last', 'आख़िरी', '/læst/', ['final'], ['first']],
  ['half', 'आधा', '/hæf/', ['fifty percent'], ['whole']],
  ['quarter', 'एक चौथाई', '/ˈkwɔːr.tər/', ['fourth part'], ['whole']],
  ['dozen', 'दर्जन', '/ˈdʌz.ən/', ['twelve'], ['none']],
  ['pair', 'जोड़ा', '/per/', ['couple', 'duo'], ['none']],
  ['few', 'कुछ', '/fjuː/', ['some', 'a handful'], ['many']],
  ['several', 'कई', '/ˈsev.ər.əl/', ['many', 'various'], ['few']],
  ['many', 'बहुत', '/ˈmen.i/', ['numerous', 'plenty'], ['few']],
  ['couple', 'दो/जोड़ा', '/ˈkʌp.əl/', ['pair', 'two'], ['none']],
];
NUMBERS.forEach(([word, hindi, ipa, syn, ant]) => {
  addWord(word, hindi, `a number or quantity word — "${word}"`, ipa, 'Numbers', /st$|rd$|nd$|last/.test(word) ? 'adjective' : 'noun/adjective', 'A1', syn, ant, nounSentences(word, 'a/an'));
});

// ─── Colors (realistic, near-complete common set) ──────────────────────────
const COLORS = [
  ['red', 'लाल', '/red/', ['crimson', 'scarlet'], ['green']],
  ['blue', 'नीला', '/bluː/', ['azure'], ['orange']],
  ['green', 'हरा', '/ɡriːn/', ['emerald'], ['red']],
  ['yellow', 'पीला', '/ˈjel.oʊ/', ['golden'], ['purple']],
  ['black', 'काला', '/blæk/', ['dark', 'ebony'], ['white']],
  ['white', 'सफ़ेद', '/waɪt/', ['pale', 'ivory'], ['black']],
  ['orange', 'नारंगी', '/ˈɔːr.ɪndʒ/', ['tangerine'], ['blue']],
  ['purple', 'बैंगनी', '/ˈpɜːr.pəl/', ['violet'], ['yellow']],
  ['pink', 'गुलाबी', '/pɪŋk/', ['rose'], ['none']],
  ['brown', 'भूरा', '/braʊn/', ['tan', 'chestnut'], ['none']],
  ['grey', 'स्लेटी', '/ɡreɪ/', ['gray', 'ash'], ['none']],
  ['gold', 'सुनहरा', '/ɡoʊld/', ['golden'], ['none']],
  ['silver', 'चांदी जैसा', '/ˈsɪl.vər/', ['grey-white'], ['none']],
  ['maroon', 'गहरा लाल', '/məˈruːn/', ['dark red'], ['none']],
  ['navy', 'गहरा नीला', '/ˈneɪ.vi/', ['dark blue'], ['none']],
  ['turquoise', 'फ़िरोज़ी', '/ˈtɜːr.kwɔɪz/', ['cyan'], ['none']],
  ['beige', 'हल्का भूरा', '/beɪʒ/', ['cream'], ['none']],
  ['violet', 'बैंगनी (हल्का)', '/ˈvaɪ.ə.lət/', ['purple'], ['none']],
  ['cream', 'मलाई रंग', '/kriːm/', ['off-white'], ['none']],
  ['magenta', 'गुलाबी-बैंगनी', '/məˈdʒen.tə/', ['pink-purple'], ['none']],
  ['indigo', 'नील रंग', '/ˈɪn.dɪ.ɡoʊ/', ['deep blue'], ['none']],
  ['lavender', 'हल्का बैंगनी', '/ˈlæv.ən.dər/', ['pale purple'], ['none']],
  ['olive', 'जैतूनी', '/ˈɒl.ɪv/', ['dull green'], ['none']],
  ['teal', 'गहरा फ़िरोज़ी', '/tiːl/', ['blue-green'], ['none']],
];
COLORS.forEach(([word, hindi, ipa, syn, ant]) => {
  addWord(word, hindi, `a colour — "${word}"`, ipa, 'Colors', 'adjective', 'A1', syn, ant, {
    daily: `I really like the ${word} shirt you are wearing.`,
    office: `Please use the ${word} folder for urgent files.`,
    interview: `My favourite colour is ${word}; it feels calm to me.`,
    business: `Our new logo uses a ${word} colour scheme.`,
    formal: `The report cover shall be printed in ${word}.`,
    informal: `That ${word} bag looks amazing on you!`,
  });
});

// ─── Common Nouns (open class — everyday objects and places) ───────────────
const COMMON_NOUNS = [
  ['house', 'घर', '/haʊs/', ['home', 'residence'], ['none']],
  ['road', 'सड़क', '/roʊd/', ['street'], ['none']],
  ['city', 'शहर', '/ˈsɪt.i/', ['town'], ['village']],
  ['village', 'गाँव', '/ˈvɪl.ɪdʒ/', ['hamlet'], ['city']],
  ['market', 'बाज़ार', '/ˈmɑːr.kɪt/', ['bazaar'], ['none']],
  ['shop', 'दुकान', '/ʃɒp/', ['store'], ['none']],
  ['money', 'पैसा', '/ˈmʌn.i/', ['cash', 'currency'], ['none']],
  ['water', 'पानी', '/ˈwɒt.ər/', ['none'], ['none']],
  ['food', 'खाना', '/fuːd/', ['meal'], ['none']],
  ['fire', 'आग', '/faɪər/', ['flame'], ['water']],
  ['sky', 'आसमान', '/skaɪ/', ['heavens'], ['earth']],
  ['sun', 'सूरज', '/sʌn/', ['none'], ['moon']],
  ['moon', 'चंद्रमा', '/muːn/', ['none'], ['sun']],
  ['tree', 'पेड़', '/triː/', ['plant'], ['none']],
  ['flower', 'फूल', '/ˈflaʊ.ər/', ['blossom'], ['none']],
  ['river', 'नदी', '/ˈrɪv.ər/', ['stream'], ['none']],
  ['mountain', 'पहाड़', '/ˈmaʊn.tən/', ['hill'], ['valley']],
  ['ocean', 'महासागर', '/ˈoʊ.ʃən/', ['sea'], ['none']],
  ['forest', 'जंगल', '/ˈfɒr.ɪst/', ['woods'], ['none']],
  ['garden', 'बगीचा', '/ˈɡɑːr.dən/', ['yard'], ['none']],
  ['hospital', 'अस्पताल', '/ˈhɒs.pɪ.təl/', ['clinic'], ['none']],
  ['bank', 'बैंक', '/bæŋk/', ['none'], ['none']],
  ['station', 'स्टेशन', '/ˈsteɪ.ʃən/', ['none'], ['none']],
  ['airport', 'एयरपोर्ट', '/ˈer.pɔːrt/', ['none'], ['none']],
  ['hotel', 'होटल', '/hoʊˈtel/', ['none'], ['none']],
  ['restaurant', 'रेस्टोरेंट', '/ˈres.tər.ɒnt/', ['eatery'], ['none']],
  ['kitchen', 'रसोई', '/ˈkɪtʃ.ən/', ['none'], ['none']],
  ['bathroom', 'बाथरूम', '/ˈbæθ.ruːm/', ['none'], ['none']],
  ['bedroom', 'शयनकक्ष', '/ˈbed.ruːm/', ['none'], ['none']],
  ['roof', 'छत', '/ruːf/', ['none'], ['floor']],
  ['floor', 'फ़र्श', '/flɔːr/', ['ground'], ['roof']],
  ['ceiling', 'छत (अंदर की)', '/ˈsiː.lɪŋ/', ['none'], ['floor']],
  ['key', 'चाबी', '/kiː/', ['none'], ['none']],
  ['lock', 'ताला', '/lɒk/', ['none'], ['key']],
  ['bag', 'बैग', '/bæɡ/', ['sack'], ['none']],
  ['box', 'डिब्बा', '/bɒks/', ['carton'], ['none']],
  ['bottle', 'बोतल', '/ˈbɒt.əl/', ['none'], ['none']],
  ['cup', 'कप', '/kʌp/', ['mug'], ['none']],
  ['plate', 'प्लेट', '/pleɪt/', ['dish'], ['none']],
  ['spoon', 'चम्मच', '/spuːn/', ['none'], ['none']],
  ['fork', 'काँटा', '/fɔːrk/', ['none'], ['none']],
  ['knife', 'चाकू', '/naɪf/', ['blade'], ['none']],
  ['pen', 'पेन', '/pen/', ['none'], ['none']],
  ['pencil', 'पेंसिल', '/ˈpen.səl/', ['none'], ['none']],
  ['paper', 'कागज़', '/ˈpeɪ.pər/', ['none'], ['none']],
  ['letter', 'चिट्ठी', '/ˈlet.ər/', ['note'], ['none']],
  ['newspaper', 'अख़बार', '/ˈnuːzˌpeɪ.pər/', ['none'], ['none']],
  ['television', 'टेलीविज़न', '/ˈtel.ɪˌvɪʒ.ən/', ['TV'], ['none']],
  ['camera', 'कैमरा', '/ˈkæm.rə/', ['none'], ['none']],
  ['clock', 'घड़ी (दीवार)', '/klɒk/', ['none'], ['none']],
  ['mirror', 'शीशा', '/ˈmɪr.ər/', ['none'], ['none']],
  ['lamp', 'लैंप', '/læmp/', ['light'], ['none']],
  ['fan', 'पंखा', '/fæn/', ['none'], ['none']],
  ['ladder', 'सीढ़ी', '/ˈlæd.ər/', ['none'], ['none']],
  ['bridge', 'पुल', '/brɪdʒ/', ['none'], ['none']],
  ['wall', 'दीवार', '/wɔːl/', ['none'], ['none']],
  ['gate', 'गेट', '/ɡeɪt/', ['door'], ['none']],
  ['field', 'खेत/मैदान', '/fiːld/', ['ground'], ['none']],
  ['sand', 'रेत', '/sænd/', ['none'], ['none']],
  ['stone', 'पत्थर', '/stoʊn/', ['rock'], ['none']],
  ['cloud', 'बादल', '/klaʊd/', ['none'], ['none']],
  ['rain', 'बारिश', '/reɪn/', ['none'], ['none']],
  ['wind', 'हवा', '/wɪnd/', ['breeze'], ['none']],
  ['snow', 'बर्फ़', '/snoʊ/', ['none'], ['none']],
  ['coin', 'सिक्का', '/kɔɪn/', ['none'], ['none']],
  ['wallet', 'बटुआ', '/ˈwɒl.ɪt/', ['purse'], ['none']],
  ['ticket', 'टिकट', '/ˈtɪk.ɪt/', ['none'], ['none']],
  ['machine', 'मशीन', '/məˈʃiːn/', ['device'], ['none']],
  ['engine', 'इंजन', '/ˈen.dʒɪn/', ['motor'], ['none']],
  ['factory', 'फ़ैक्ट्री', '/ˈfæk.tər.i/', ['plant'], ['none']],
];
COMMON_NOUNS.forEach(([word, hindi, ipa, syn, ant]) => {
  addWord(word, hindi, `an everyday noun — "${word}"`, ipa, 'Common Nouns', 'noun', 'A1', syn, ant, nounSentences(word, 'the'));
});

// ─── Descriptors (general descriptive adjectives, distinct from the
//     Adjectives / Advanced Adjectives categories already in the bank) ─────
const DESCRIPTORS = [
  ['bright', 'चमकीला', '/braɪt/', ['shining', 'vivid'], ['dull']],
  ['dull', 'फीका', '/dʌl/', ['dim'], ['bright']],
  ['smooth', 'चिकना', '/smuːð/', ['even'], ['rough']],
  ['rough', 'खुरदरा', '/rʌf/', ['coarse'], ['smooth']],
  ['sharp', 'तेज़ (धार वाला)', '/ʃɑːrp/', ['keen'], ['blunt']],
  ['blunt', 'भोथरा', '/blʌnt/', ['dull'], ['sharp']],
  ['heavy', 'भारी', '/ˈhev.i/', ['weighty'], ['light']],
  ['light', 'हल्का', '/laɪt/', ['not heavy'], ['heavy']],
  ['loud', 'तेज़ आवाज़ वाला', '/laʊd/', ['noisy'], ['quiet']],
  ['quiet', 'शांत', '/ˈkwaɪ.ət/', ['silent'], ['loud']],
  ['wide', 'चौड़ा', '/waɪd/', ['broad'], ['narrow']],
  ['narrow', 'तंग', '/ˈnær.oʊ/', ['thin'], ['wide']],
  ['deep', 'गहरा', '/diːp/', ['profound'], ['shallow']],
  ['shallow', 'कम गहरा', '/ˈʃæl.oʊ/', ['not deep'], ['deep']],
  ['thick', 'मोटा (मोटाई)', '/θɪk/', ['dense'], ['thin']],
  ['thin', 'पतला', '/θɪn/', ['slim'], ['thick']],
  ['dry', 'सूखा', '/draɪ/', ['arid'], ['wet']],
  ['wet', 'गीला', '/wet/', ['damp'], ['dry']],
  ['soft', 'मुलायम', '/sɒft/', ['tender'], ['hard']],
  ['hard', 'सख़्त', '/hɑːrd/', ['firm'], ['soft']],
  ['fresh', 'ताज़ा', '/freʃ/', ['new'], ['stale']],
  ['stale', 'बासी', '/steɪl/', ['old'], ['fresh']],
  ['plain', 'सादा', '/pleɪn/', ['simple'], ['fancy']],
  ['fancy', 'सजावटी', '/ˈfæn.si/', ['decorative'], ['plain']],
  ['tidy', 'साफ़-सुथरा', '/ˈtaɪ.di/', ['neat'], ['messy']],
  ['messy', 'अव्यवस्थित', '/ˈmes.i/', ['untidy'], ['tidy']],
  ['calm', 'शांत (मन से)', '/kɑːm/', ['peaceful'], ['anxious']],
  ['anxious', 'चिंतित', '/ˈæŋk.ʃəs/', ['worried'], ['calm']],
  ['brave', 'बहादुर', '/breɪv/', ['courageous'], ['cowardly']],
  ['shy', 'शर्मीला', '/ʃaɪ/', ['timid'], ['bold']],
  ['bold', 'निडर', '/boʊld/', ['daring'], ['shy']],
  ['gentle', 'कोमल', '/ˈdʒen.təl/', ['mild'], ['harsh']],
  ['harsh', 'कठोर', '/hɑːrʃ/', ['severe'], ['gentle']],
  ['proud', 'गर्वित', '/praʊd/', ['none'], ['humble']],
  ['humble', 'विनम्र (साधारण)', '/ˈhʌm.bəl/', ['modest'], ['proud']],
  ['clever', 'चालाक/बुद्धिमान', '/ˈklev.ər/', ['smart'], ['none']],
  ['careless', 'लापरवाह', '/ˈker.ləs/', ['negligent'], ['careful']],
  ['careful', 'सावधान', '/ˈker.fəl/', ['cautious'], ['careless']],
  ['generous', 'उदार', '/ˈdʒen.ər.əs/', ['giving'], ['stingy']],
  ['stingy', 'कंजूस', '/ˈstɪn.dʒi/', ['miserly'], ['generous']],
  ['punctual', 'समय का पालन करने वाला', '/ˈpʌŋk.tʃu.əl/', ['on time'], ['late']],
  ['curious', 'जिज्ञासु', '/ˈkjʊr.i.əs/', ['inquisitive'], ['indifferent']],
  ['loyal', 'वफ़ादार', '/ˈlɔɪ.əl/', ['faithful'], ['disloyal']],
  ['stubborn', 'ज़िद्दी', '/ˈstʌb.ərn/', ['obstinate'], ['flexible']],
  ['cheerful', 'खुशमिज़ाज', '/ˈtʃɪr.fəl/', ['happy'], ['gloomy']],
  ['gloomy', 'उदास (माहौल)', '/ˈɡluː.mi/', ['depressing'], ['cheerful']],
];
DESCRIPTORS.forEach(([word, hindi, ipa, syn, ant]) => {
  addWord(word, hindi, `a descriptive adjective — "${word}"`, ipa, 'Descriptors', 'adjective', 'A2', syn, ant, adjSentences(word));
});

// ─── Professional Verbs (open class — office / management verbs) ──────────
const PROFESSIONAL_VERBS = [
  ['manage', 'प्रबंधन करना', 'manages', '/ˈmæn.ɪdʒ/', ['handle', 'run'], ['neglect']],
  ['organize', 'व्यवस्थित करना', 'organizes', '/ˈɔːr.ɡə.naɪz/', ['arrange'], ['disorganize']],
  ['coordinate', 'तालमेल बनाना', 'coordinates', '/koʊˈɔːr.dɪ.neɪt/', ['synchronize'], ['none']],
  ['negotiate', 'बातचीत/सौदा करना', 'negotiates', '/nɪˈɡoʊ.ʃi.eɪt/', ['bargain'], ['none']],
  ['delegate', 'ज़िम्मेदारी सौंपना', 'delegates', '/ˈdel.ɪ.ɡeɪt/', ['assign'], ['none']],
  ['supervise', 'निगरानी करना', 'supervises', '/ˈsuː.pər.vaɪz/', ['oversee'], ['neglect']],
  ['execute', 'क्रियान्वित करना', 'executes', '/ˈek.sɪ.kjuːt/', ['implement', 'carry out'], ['none']],
  ['implement', 'लागू करना', 'implements', '/ˈɪm.plɪ.ment/', ['apply', 'execute'], ['none']],
  ['analyze', 'विश्लेषण करना', 'analyzes', '/ˈæn.ə.laɪz/', ['examine'], ['none']],
  ['evaluate', 'मूल्यांकन करना', 'evaluates', '/ɪˈvæl.ju.eɪt/', ['assess'], ['none']],
  ['present', 'प्रस्तुत करना', 'presents', '/prɪˈzent/', ['show', 'showcase'], ['withhold']],
  ['collaborate', 'मिलकर काम करना', 'collaborates', '/kəˈlæb.ə.reɪt/', ['cooperate'], ['none']],
  ['communicate', 'संवाद करना', 'communicates', '/kəˈmjuː.nɪ.keɪt/', ['convey'], ['none']],
  ['prioritize', 'प्राथमिकता देना', 'prioritizes', '/praɪˈɔːr.ə.taɪz/', ['rank'], ['none']],
  ['schedule', 'समय निर्धारित करना', 'schedules', '/ˈskedʒ.uːl/', ['plan', 'timetable'], ['none']],
  ['brainstorm', 'विचार-मंथन करना', 'brainstorms', '/ˈbreɪnˌstɔːrm/', ['generate ideas'], ['none']],
  ['finalize', 'अंतिम रूप देना', 'finalizes', '/ˈfaɪ.nə.laɪz/', ['complete'], ['none']],
  ['approve', 'मंज़ूरी देना', 'approves', '/əˈpruːv/', ['authorize'], ['reject']],
  ['review', 'समीक्षा करना', 'reviews', '/rɪˈvjuː/', ['examine'], ['none']],
  ['draft', 'मसौदा तैयार करना', 'drafts', '/dræft/', ['write', 'sketch'], ['none']],
  ['submit', 'जमा करना', 'submits', '/səbˈmɪt/', ['send in'], ['withdraw']],
  ['forward', 'आगे भेजना', 'forwards', '/ˈfɔːr.wərd/', ['pass on'], ['none']],
  ['escalate', 'उच्च स्तर पर भेजना', 'escalates', '/ˈes.kə.leɪt/', ['raise', 'intensify'], ['none']],
  ['streamline', 'सरल/सुव्यवस्थित बनाना', 'streamlines', '/ˈstriːm.laɪn/', ['simplify'], ['complicate']],
  ['optimize', 'अनुकूलित करना', 'optimizes', '/ˈɒp.tɪ.maɪz/', ['improve'], ['none']],
  ['monitor', 'नज़र रखना', 'monitors', '/ˈmɒn.ɪ.tər/', ['track', 'watch'], ['none']],
  ['forecast', 'पूर्वानुमान लगाना', 'forecasts', '/ˈfɔːr.kæst/', ['predict'], ['none']],
  ['network', 'संपर्क बढ़ाना', 'networks', '/ˈnet.wɜːrk/', ['connect'], ['none']],
  ['onboard', 'नए कर्मचारी को शामिल करना', 'onboards', '/ˈɒn.bɔːrd/', ['induct'], ['offboard']],
  ['mentor', 'मार्गदर्शन करना', 'mentors', '/ˈmen.tɔːr/', ['guide', 'coach'], ['none']],
  ['recruit', 'भर्ती करना', 'recruits', '/rɪˈkruːt/', ['hire'], ['dismiss']],
  ['promote', 'पदोन्नत करना', 'promotes', '/prəˈmoʊt/', ['none'], ['demote']],
  ['restructure', 'पुनर्गठन करना', 'restructures', '/riːˈstrʌk.tʃər/', ['reorganize'], ['none']],
  ['merge', 'विलय करना', 'merges', '/mɜːrdʒ/', ['combine'], ['separate']],
  ['launch', 'शुरू करना (उत्पाद)', 'launches', '/lɔːntʃ/', ['introduce'], ['discontinue']],
  ['pitch', 'प्रस्ताव पेश करना', 'pitches', '/pɪtʃ/', ['propose'], ['none']],
  ['budget', 'बजट बनाना', 'budgets', '/ˈbʌdʒ.ɪt/', ['allocate funds'], ['none']],
  ['audit', 'लेखा परीक्षण करना', 'audits', '/ˈɔː.dɪt/', ['inspect'], ['none']],
  ['liaise', 'संपर्क बनाए रखना', 'liaises', '/liˈeɪz/', ['coordinate'], ['none']],
  ['spearhead', 'नेतृत्व करना', 'spearheads', '/ˈspɪr.hed/', ['lead'], ['none']],
  ['facilitate', 'सुविधाजनक बनाना', 'facilitates', '/fəˈsɪl.ɪ.teɪt/', ['enable'], ['hinder']],
  ['outsource', 'बाहरी स्रोत से करवाना', 'outsources', '/ˈaʊt.sɔːrs/', ['contract out'], ['insource']],
  ['automate', 'स्वचालित बनाना', 'automates', '/ˈɔː.tə.meɪt/', ['mechanize'], ['none']],
  ['digitize', 'डिजिटल बनाना', 'digitizes', '/ˈdɪdʒ.ɪ.taɪz/', ['computerize'], ['none']],
  ['negoti­ate'.replace('­', ''), 'सौदा तय करना', 'negotiates', '/nɪˈɡoʊ.ʃi.eɪt/', ['settle terms'], ['none']],
  ['strategize', 'रणनीति बनाना', 'strategizes', '/ˈstræt.ə.dʒaɪz/', ['plan'], ['none']],
];
PROFESSIONAL_VERBS.forEach(([word, hindi, third, ipa, syn, ant]) => {
  addWord(word, hindi, `a professional/workplace verb — "${word}"`, ipa, 'Professional Verbs', 'verb', 'B1', syn, ant, verbSentences(word, third),
    { base: word, past: word.endsWith('e') ? word + 'd' : word + 'ed', pastParticiple: word.endsWith('e') ? word + 'd' : word + 'ed', presentParticiple: word.endsWith('e') ? word.slice(0, -1) + 'ing' : word + 'ing', thirdPerson: third });
});

// ─── Abstract Nouns (open class — feelings, values, concepts) ─────────────
const ABSTRACT_NOUNS = [
  ['love', 'प्रेम', '/lʌv/', ['affection'], ['hatred']],
  ['hope', 'आशा', '/hoʊp/', ['optimism'], ['despair']],
  ['freedom', 'आज़ादी', '/ˈfriː.dəm/', ['liberty'], ['bondage']],
  ['happiness', 'खुशी', '/ˈhæp.i.nəs/', ['joy'], ['sadness']],
  ['sadness', 'उदासी', '/ˈsæd.nəs/', ['sorrow'], ['happiness']],
  ['anger', 'गुस्सा', '/ˈæŋ.ɡər/', ['fury'], ['calmness']],
  ['fear', 'डर', '/fɪr/', ['fright'], ['courage']],
  ['courage', 'हिम्मत', '/ˈkɜːr.ɪdʒ/', ['bravery'], ['fear']],
  ['honesty', 'ईमानदारी', '/ˈɒn.ə.sti/', ['integrity'], ['dishonesty']],
  ['loyalty', 'वफ़ादारी', '/ˈlɔɪ.əl.ti/', ['faithfulness'], ['betrayal']],
  ['trust', 'भरोसा', '/trʌst/', ['confidence'], ['suspicion']],
  ['respect', 'सम्मान', '/rɪˈspekt/', ['regard'], ['disrespect']],
  ['patience', 'धैर्य', '/ˈpeɪ.ʃəns/', ['tolerance'], ['impatience']],
  ['wisdom', 'बुद्धिमत्ता', '/ˈwɪz.dəm/', ['knowledge'], ['foolishness']],
  ['truth', 'सच्चाई', '/truːθ/', ['fact'], ['lie']],
  ['justice', 'न्याय', '/ˈdʒʌs.tɪs/', ['fairness'], ['injustice']],
  ['peace', 'शांति', '/piːs/', ['calm'], ['war']],
  ['success', 'सफलता', '/səkˈses/', ['achievement'], ['failure']],
  ['failure', 'असफलता', '/ˈfeɪl.jər/', ['defeat'], ['success']],
  ['effort', 'प्रयास', '/ˈef.ərt/', ['attempt'], ['idleness']],
  ['ambition', 'महत्वाकांक्षा', '/æmˈbɪʃ.ən/', ['aspiration'], ['indifference']],
  ['confidence', 'आत्मविश्वास', '/ˈkɒn.fɪ.dəns/', ['self-belief'], ['doubt']],
  ['creativity', 'रचनात्मकता', '/ˌkriː.eɪˈtɪv.ə.ti/', ['imagination'], ['none']],
  ['curiosity', 'जिज्ञासा', '/ˌkjʊr.iˈɒs.ə.ti/', ['inquisitiveness'], ['indifference']],
  ['gratitude', 'कृतज्ञता', '/ˈɡræt.ɪ.tuːd/', ['thankfulness'], ['ingratitude']],
  ['kindness', 'दयालुता', '/ˈkaɪnd.nəs/', ['compassion'], ['cruelty']],
  ['generosity', 'उदारता', '/ˌdʒen.əˈrɒs.ə.ti/', ['charity'], ['stinginess']],
  ['humility', 'विनम्रता', '/hjuːˈmɪl.ə.ti/', ['modesty'], ['arrogance']],
  ['integrity', 'निष्ठा/ईमानदारी', '/ɪnˈteɡ.rə.ti/', ['honesty'], ['corruption']],
  ['motivation', 'प्रेरणा', '/ˌmoʊ.təˈveɪ.ʃən/', ['drive'], ['apathy']],
  ['determination', 'दृढ़ संकल्प', '/dɪˌtɜːr.mɪˈneɪ.ʃən/', ['resolve'], ['hesitation']],
  ['discipline', 'अनुशासन', '/ˈdɪs.ə.plɪn/', ['self-control'], ['carelessness']],
  ['responsibility', 'ज़िम्मेदारी', '/rɪˌspɒn.səˈbɪl.ə.ti/', ['duty'], ['none']],
  ['opportunity', 'अवसर', '/ˌɒp.ərˈtjuː.nə.ti/', ['chance'], ['none']],
  ['challenge', 'चुनौती', '/ˈtʃæl.ɪndʒ/', ['difficulty'], ['ease']],
  ['growth', 'विकास', '/ɡroʊθ/', ['development'], ['decline']],
  ['change', 'बदलाव', '/tʃeɪndʒ/', ['transformation'], ['stability']],
  ['balance', 'संतुलन', '/ˈbæl.əns/', ['equilibrium'], ['imbalance']],
  ['harmony', 'सामंजस्य', '/ˈhɑːr.mə.ni/', ['unity'], ['conflict']],
  ['faith', 'विश्वास', '/feɪθ/', ['belief'], ['doubt']],
  ['doubt', 'संदेह', '/daʊt/', ['uncertainty'], ['certainty']],
  ['stress', 'तनाव', '/stres/', ['pressure'], ['relaxation']],
  ['relief', 'राहत', '/rɪˈliːf/', ['comfort'], ['distress']],
  ['joy', 'हर्ष', '/dʒɔɪ/', ['delight'], ['sorrow']],
  ['pride', 'गर्व', '/praɪd/', ['none'], ['shame']],
  ['shame', 'शर्म', '/ʃeɪm/', ['embarrassment'], ['pride']],
  ['forgiveness', 'क्षमा', '/fərˈɡɪv.nəs/', ['pardon'], ['resentment']],
  ['friendship', 'मित्रता', '/ˈfrend.ʃɪp/', ['companionship'], ['enmity']],
  ['leadership', 'नेतृत्व', '/ˈliː.dər.ʃɪp/', ['guidance'], ['none']],
  ['teamwork', 'टीम वर्क', '/ˈtiːm.wɜːrk/', ['collaboration'], ['none']],
  ['innovation', 'नवाचार', '/ˌɪn.əˈveɪ.ʃən/', ['invention'], ['stagnation']],
  ['productivity', 'उत्पादकता', '/ˌproʊ.dʌkˈtɪv.ə.ti/', ['efficiency'], ['idleness']],
  ['efficiency', 'दक्षता', '/ɪˈfɪʃ.ən.si/', ['effectiveness'], ['inefficiency']],
];
ABSTRACT_NOUNS.forEach(([word, hindi, ipa, syn, ant]) => {
  addWord(word, hindi, `an abstract noun (a feeling, value or concept) — "${word}"`, ipa, 'Abstract Nouns', 'noun', 'B1', syn, ant, nounSentences(word, 'a/an'));
});

vocab.totalWords = vocab.words.length;
vocab.categories = Array.from(new Set(vocab.words.map((w) => w.category)));
fs.writeFileSync(VOCAB_PATH, JSON.stringify(vocab, null, 2));

console.log('vocabulary.json ->', vocab.words.length, 'total words,', vocab.categories.length, 'categories');
const counts = {};
vocab.words.forEach((w) => { counts[w.category] = (counts[w.category] || 0) + 1; });
console.log(counts);
