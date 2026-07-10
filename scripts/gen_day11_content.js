#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

// ─── CONTENT (preserved + enriched) ───────────────────────────────────────────
const content = {
  explanation: `
**Want — Present Tense में चाहना:**

"Want" = चाहना (present tense में इच्छा या अभिलाषा व्यक्त करना)

**Positive Sentences (सकारात्मक वाक्य):**
Subject + **want/wants** + to + base verb
Subject + **want/wants** + noun

🇮🇳 मैं पानी पीना चाहता हूँ।
🇬🇧 I **want** to drink water.

🇮🇳 वह नई गाड़ी चाहती है।
🇬🇧 She **wants** a new car.

**Negative Sentences (नकारात्मक वाक्य):**
Subject + **do not / does not want** + to + base verb

🇮🇳 मैं यह नहीं करना चाहता।
🇬🇧 I **do not want** to do this.

🇮🇳 वह बाहर नहीं जाना चाहती।
🇬🇧 She **does not want** to go out.

**Question Sentences (प्रश्नवाचक वाक्य):**
**Do/Does** + subject + **want** + to + verb?

🇮🇳 क्या तुम पानी पीना चाहते हो?
🇬🇧 **Do** you **want** to drink water?

🇮🇳 क्या वह यहाँ आना चाहता है?
🇬🇧 **Does** he **want** to come here?

**"Want + Noun" vs "Want to + Verb":**
- Want + noun = किसी चीज़ की इच्छा: "I want a job."
- Want + to + verb = कुछ करने की इच्छा: "I want to find a job."

**चाहिए vs चाहना:**
- मुझे पानी चाहिए = I want water (need/want — natural for nouns)
- मैं पानी पीना चाहता हूँ = I want to drink water (action)
Both are correct Hindi — use both naturally.
`,
  rules: [
    "I / You / We / They → want  (e.g., I want, We want, They want)",
    "He / She / It → wants  (e.g., He wants, She wants, It wants)",
    "Want + noun: 'I want water' / 'She wants a new phone'",
    "Want + to + base verb: 'I want to go' / 'He wants to study'",
    "Negative with I/You/We/They: 'I do not want' / 'They do not want'",
    "Negative with He/She/It: 'She does not want' / 'He does not want'",
    "Question with I/You/We/They: 'Do you want...?' / 'Do they want...?'",
    "Question with He/She/It: 'Does she want...?' / 'Does he want...?'",
    "'Want' is a stative verb — NEVER use 'wanting': ❌ 'I am wanting' ✅ 'I want'",
    "After 'Does', always use base verb (not wants): ❌ 'Does he wants?' ✅ 'Does he want?'"
  ],
  memoryTrick: "**WANT = चाहना** — Simple rule: 'I want + TO + verb' OR 'I want + noun'. He/She/It → add -s → 'wants'. कभी want+ing मत करो! याद रखो: WANT never wears -ING!",
  examples: [
    { hindi: "मैं English सीखना चाहता हूँ।", english: "I want to learn English.", type: "Want + to verb (I)" },
    { hindi: "वह एक अच्छी नौकरी चाहती है।", english: "She wants a good job.", type: "Wants + noun" },
    { hindi: "हम छुट्टी पर जाना चाहते हैं।", english: "We want to go on vacation.", type: "Want + to verb (We)" },
    { hindi: "क्या तुम चाय पीना चाहते हो?", english: "Do you want to have tea?", type: "Question (Do you)" },
    { hindi: "मुझे यह नहीं चाहिए।", english: "I do not want this.", type: "Negative + noun" },
    { hindi: "बच्चे खेलना चाहते हैं।", english: "The children want to play.", type: "Want + to verb (plural)" },
    { hindi: "क्या वह यहाँ रहना चाहता है?", english: "Does he want to stay here?", type: "Question (Does he)" },
    { hindi: "वे कुछ नहीं खाना चाहते।", english: "They do not want to eat anything.", type: "Negative (They)" },
    { hindi: "मुझे एक नई नौकरी चाहिए।", english: "I want a new job.", type: "Want + noun (चाहिए form)" },
    { hindi: "क्या उसे मदद चाहिए?", english: "Does she want help?", type: "Does + want + noun" },
    { hindi: "वह डॉक्टर बनना चाहता है।", english: "He wants to become a doctor.", type: "Wants + to become" },
    { hindi: "मैं सच जानना चाहता हूँ।", english: "I want to know the truth.", type: "Want + to verb" }
  ],
  mistakes: [
    { wrong: "I am wanting to go.", correct: "I want to go.", why: "'Want' is a stative verb — इसे कभी continuous (-ing) form में नहीं लिखते।" },
    { wrong: "She want to eat.", correct: "She wants to eat.", why: "He/She/It के साथ हमेशा 'wants' (verb + s) लगाते हैं।" },
    { wrong: "I want that she comes.", correct: "I want her to come.", why: "Want के बाद 'that clause' नहीं; सही pattern है: want + object + to + verb।" },
    { wrong: "Does he wants money?", correct: "Does he want money?", why: "'Does' के बाद हमेशा base form (want), 'wants' नहीं।" },
    { wrong: "I wanting a coffee.", correct: "I want a coffee.", why: "Subject के बाद directly want/wants आता है, am/is/are + wanting नहीं।" },
    { wrong: "He don't want to go.", correct: "He does not want to go.", why: "He/She/It के साथ negative में 'does not' (not 'don't') use होता है।" },
    { wrong: "Do she want to study?", correct: "Does she want to study?", why: "She/He/It के साथ question में 'Does' (not 'Do') आता है।" },
    { wrong: "I want go home.", correct: "I want to go home.", why: "Want के बाद verb आने पर 'to' ज़रूरी है: want + to + base verb।" },
    { wrong: "They wants a bigger house.", correct: "They want a bigger house.", why: "'They' plural subject है — इसलिए 'want' (not 'wants')।" },
    { wrong: "I want to going to the market.", correct: "I want to go to the market.", why: "'Want to' के बाद base verb (go), gerund (going) नहीं।" }
  ],
  speakingTips: [
    "रोज़ सुबह बोलो: 'Today I want to...' — अपने दिन की तीन इच्छाएँ बोलो।",
    "Family/friends से पूछो: 'Do you want to...?' — यह बहुत natural daily conversation है।",
    "Shopping में use करो: 'I want this in size medium, please.' — confident और polite दोनों।",
    "Office में: 'I want to discuss the project.' — professional और direct communication।",
    "Negatives practice करो: 'I don't want to be late' / 'She doesn't want extra work.'",
    "'Does he/she want...?' वाले questions mirror करो जब कोई absent हो: 'Does your boss want this report today?'",
    "Want + noun और Want + to + verb दोनों practice करो: 'I want a raise' vs 'I want to ask for a raise.'",
    "Interviews में: 'I want to contribute to your team's growth.' — shows motivation naturally।"
  ]
};

// ─── VOCABULARY (500 words) ────────────────────────────────────────────────────
const vocabularyData = [
  // Verbs
  { word: "want", pos: "verb", hindi: "चाहना", simple: "to wish or desire something", ipa: "/wɒnt/", syn: ["desire", "wish", "crave"], ant: ["reject", "refuse"], ex: "I want to learn English fluently.", office: "I want to schedule a meeting with you.", interview: "I want to grow in this role.", biz: "We want to expand into new markets." },
  { word: "desire", pos: "verb", hindi: "इच्छा करना / चाहना", simple: "to strongly want something", ipa: "/dɪˈzaɪər/", syn: ["want", "wish", "crave"], ant: ["dislike", "reject"], ex: "She desires a peaceful life.", office: "We desire a better work-life balance.", interview: "I desire to work in a challenging environment.", biz: "The company desires long-term growth." },
  { word: "wish", pos: "verb", hindi: "इच्छा रखना / कामना करना", simple: "to want something that may not be possible", ipa: "/wɪʃ/", syn: ["desire", "hope", "long"], ant: ["dread", "fear"], ex: "I wish to travel the world.", office: "I wish to clarify my role.", interview: "I wish to be part of your team.", biz: "We wish to strengthen our partnership." },
  { word: "seek", pos: "verb", hindi: "खोजना / ढूँढना", simple: "to try to find or obtain", ipa: "/siːk/", syn: ["search", "look for", "pursue"], ant: ["avoid", "ignore"], ex: "He seeks a better opportunity.", office: "We seek your approval on this proposal.", interview: "I seek a role that challenges me.", biz: "The firm seeks new investors." },
  { word: "aspire", pos: "verb", hindi: "आकांक्षा रखना / अभिलाषा रखना", simple: "to have a strong wish to achieve something great", ipa: "/əˈspaɪər/", syn: ["aim", "strive", "hope"], ant: ["give up", "despair"], ex: "She aspires to become a surgeon.", office: "He aspires to lead the department.", interview: "I aspire to grow into a leadership role.", biz: "We aspire to be the market leader." },
  { word: "prefer", pos: "verb", hindi: "पसंद करना / तरजीह देना", simple: "to like one thing more than another", ipa: "/prɪˈfɜːr/", syn: ["favor", "choose", "opt for"], ant: ["dislike", "reject"], ex: "I prefer coffee over tea.", office: "I prefer written instructions.", interview: "I prefer collaborative work environments.", biz: "Clients prefer transparent pricing." },
  { word: "expect", pos: "verb", hindi: "उम्मीद करना / अपेक्षा रखना", simple: "to think something will happen", ipa: "/ɪkˈspekt/", syn: ["anticipate", "await", "foresee"], ant: ["doubt", "despair"], ex: "I expect the train at six.", office: "We expect the report by Friday.", interview: "I expect to contribute from day one.", biz: "Investors expect quarterly returns." },
  { word: "achieve", pos: "verb", hindi: "हासिल करना / प्राप्त करना", simple: "to successfully complete or reach a goal", ipa: "/əˈtʃiːv/", syn: ["accomplish", "attain", "reach"], ant: ["fail", "miss"], ex: "She achieved her goal.", office: "We achieved our sales target.", interview: "I want to achieve great results here.", biz: "The company achieved record profits." },
  { word: "improve", pos: "verb", hindi: "सुधारना / बेहतर बनाना", simple: "to make something better", ipa: "/ɪmˈpruːv/", syn: ["enhance", "upgrade", "develop"], ant: ["worsen", "decline"], ex: "He wants to improve his English.", office: "We want to improve our workflow.", interview: "I want to improve my skills constantly.", biz: "We aim to improve customer satisfaction." },
  { word: "apply", pos: "verb", hindi: "आवेदन करना", simple: "to formally request something, e.g. a job", ipa: "/əˈplaɪ/", syn: ["submit", "request", "register"], ant: ["withdraw", "reject"], ex: "She wants to apply for a visa.", office: "Please apply for leave in advance.", interview: "I am applying for the sales manager role.", biz: "Companies apply for government tenders." },
  { word: "achieve", pos: "verb", hindi: "प्राप्त करना", simple: "to reach a desired result", ipa: "/əˈtʃiːv/", syn: ["accomplish", "attain"], ant: ["fail"], ex: "They achieved success.", office: "The team achieved its quarterly goals.", interview: "I want to achieve excellence.", biz: "We achieved a 20% growth rate." },
  { word: "communicate", pos: "verb", hindi: "संवाद करना / बात करना", simple: "to share information or ideas", ipa: "/kəˈmjuːnɪkeɪt/", syn: ["talk", "convey", "express"], ant: ["withhold", "suppress"], ex: "He communicates well with others.", office: "We communicate via email and calls.", interview: "I communicate effectively in teams.", biz: "Good leaders communicate their vision clearly." },
  { word: "collaborate", pos: "verb", hindi: "मिलकर काम करना / सहयोग करना", simple: "to work together with others", ipa: "/kəˈlæbəreɪt/", syn: ["cooperate", "partner", "team up"], ant: ["compete", "oppose"], ex: "They collaborate on the project.", office: "We collaborate across departments.", interview: "I enjoy collaborating with diverse teams.", biz: "Both companies want to collaborate on research." },
  { word: "negotiate", pos: "verb", hindi: "बातचीत करना / मोलभाव करना", simple: "to discuss to reach an agreement", ipa: "/nɪˈɡəʊʃɪeɪt/", syn: ["bargain", "discuss", "mediate"], ant: ["dictate", "impose"], ex: "She wants to negotiate the price.", office: "We need to negotiate the contract terms.", interview: "I can negotiate with stakeholders confidently.", biz: "They want to negotiate a partnership deal." },
  { word: "manage", pos: "verb", hindi: "प्रबंधन करना / संभालना", simple: "to be in charge of something or handle it", ipa: "/ˈmænɪdʒ/", syn: ["handle", "oversee", "run"], ant: ["mismanage", "neglect"], ex: "She manages the household well.", office: "He manages a team of ten people.", interview: "I want to manage larger projects.", biz: "They manage supply chain operations." },
  { word: "deliver", pos: "verb", hindi: "पहुँचाना / सौंपना", simple: "to take something to a place or person", ipa: "/dɪˈlɪvər/", syn: ["bring", "hand over", "supply"], ant: ["withhold", "retain"], ex: "The courier wants to deliver the package.", office: "We want to deliver results on time.", interview: "I want to deliver value to the organization.", biz: "We want to deliver quality products globally." },
  { word: "support", pos: "verb", hindi: "समर्थन करना / सहयोग देना", simple: "to help or assist someone", ipa: "/səˈpɔːrt/", syn: ["assist", "help", "back"], ant: ["oppose", "hinder"], ex: "Parents want to support their children.", office: "HR wants to support the new hires.", interview: "I want to support my colleagues.", biz: "We want to support our clients fully." },
  { word: "develop", pos: "verb", hindi: "विकसित करना / बनाना", simple: "to grow or build something over time", ipa: "/dɪˈveləp/", syn: ["build", "grow", "cultivate"], ant: ["destroy", "neglect"], ex: "She wants to develop her skills.", office: "We want to develop a new system.", interview: "I want to develop expertise in data analysis.", biz: "The firm wants to develop new products." },
  { word: "learn", pos: "verb", hindi: "सीखना", simple: "to gain knowledge or skill", ipa: "/lɜːrn/", syn: ["study", "acquire", "grasp"], ant: ["forget", "ignore"], ex: "He wants to learn to cook.", office: "She wants to learn project management.", interview: "I want to learn from this role.", biz: "Companies want to learn from customer feedback." },
  { word: "grow", pos: "verb", hindi: "बढ़ना / विकास करना", simple: "to increase or develop", ipa: "/ɡrəʊ/", syn: ["expand", "develop", "progress"], ant: ["shrink", "decline"], ex: "She wants to grow as a person.", office: "The team wants to grow its client base.", interview: "I want to grow professionally here.", biz: "We want to grow revenue by 30%." },
  { word: "lead", pos: "verb", hindi: "नेतृत्व करना", simple: "to guide or be in charge of a group", ipa: "/liːd/", syn: ["guide", "direct", "head"], ant: ["follow", "obey"], ex: "He wants to lead the project.", office: "She wants to lead the marketing team.", interview: "I want to lead cross-functional teams.", biz: "We want to lead the industry in innovation." },
  { word: "plan", pos: "verb", hindi: "योजना बनाना", simple: "to decide in advance what to do", ipa: "/plæn/", syn: ["arrange", "organize", "prepare"], ant: ["improvise", "ignore"], ex: "I want to plan a trip to Goa.", office: "We want to plan the Q3 strategy.", interview: "I want to plan my career carefully.", biz: "Management wants to plan for contingencies." },
  { word: "complete", pos: "verb", hindi: "पूरा करना / समाप्त करना", simple: "to finish something fully", ipa: "/kəmˈpliːt/", syn: ["finish", "accomplish", "fulfill"], ant: ["abandon", "start"], ex: "She wants to complete her degree.", office: "We want to complete the audit this week.", interview: "I want to complete every task before deadline.", biz: "We want to complete the merger by Q4." },
  { word: "share", pos: "verb", hindi: "साझा करना / बाँटना", simple: "to give a part of something to others", ipa: "/ʃeər/", syn: ["distribute", "divide", "give"], ant: ["hoard", "keep"], ex: "He wants to share his knowledge.", office: "Please share the document with the team.", interview: "I want to share ideas openly.", biz: "We want to share profits with stakeholders." },
  { word: "save", pos: "verb", hindi: "बचाना / जमा करना", simple: "to keep for future use or protect from danger", ipa: "/seɪv/", syn: ["preserve", "store", "protect"], ant: ["waste", "spend"], ex: "She wants to save money for a house.", office: "We want to save time on repetitive tasks.", interview: "I want to save the company resources.", biz: "We want to save costs through automation." },
  { word: "build", pos: "verb", hindi: "बनाना / निर्माण करना", simple: "to create or construct something", ipa: "/bɪld/", syn: ["construct", "create", "develop"], ant: ["destroy", "demolish"], ex: "He wants to build a new home.", office: "We want to build a stronger team.", interview: "I want to build lasting client relationships.", biz: "We want to build a global brand." },
  { word: "travel", pos: "verb", hindi: "यात्रा करना", simple: "to go from one place to another", ipa: "/ˈtrævəl/", syn: ["journey", "tour", "voyage"], ant: ["stay", "remain"], ex: "She wants to travel to Europe.", office: "He wants to travel for client meetings.", interview: "I am willing to travel for this role.", biz: "Executives want to travel to the conference." },
  { word: "earn", pos: "verb", hindi: "कमाना", simple: "to get money by working", ipa: "/ɜːrn/", syn: ["make", "gain", "receive"], ant: ["lose", "spend"], ex: "He wants to earn more money.", office: "She wants to earn a promotion.", interview: "I want to earn while I learn.", biz: "Investors want to earn a high return." },
  { word: "explore", pos: "verb", hindi: "खोज करना / तलाश करना", simple: "to investigate or examine something new", ipa: "/ɪkˈsplɔːr/", syn: ["investigate", "discover", "examine"], ant: ["ignore", "avoid"], ex: "She wants to explore new cultures.", office: "We want to explore digital solutions.", interview: "I want to explore my full potential here.", biz: "We want to explore untapped markets." },
  { word: "meet", pos: "verb", hindi: "मिलना", simple: "to come together with someone", ipa: "/miːt/", syn: ["encounter", "see", "greet"], ant: ["avoid", "miss"], ex: "I want to meet you tomorrow.", office: "We want to meet the client on Friday.", interview: "I want to meet the team before joining.", biz: "We want to meet the demand of customers." },
  { word: "understand", pos: "verb", hindi: "समझना", simple: "to know the meaning of something", ipa: "/ˌʌndəˈstænd/", syn: ["comprehend", "grasp", "realize"], ant: ["misunderstand", "confuse"], ex: "She wants to understand the rules.", office: "We want to understand client needs better.", interview: "I want to understand the company culture.", biz: "We want to understand market trends." },
  { word: "solve", pos: "verb", hindi: "हल करना / सुलझाना", simple: "to find an answer to a problem", ipa: "/sɒlv/", syn: ["resolve", "fix", "address"], ant: ["complicate", "ignore"], ex: "He wants to solve the problem quickly.", office: "We want to solve the technical issue today.", interview: "I want to solve real business challenges.", biz: "We want to solve customer pain points." },
  { word: "accept", pos: "verb", hindi: "स्वीकार करना", simple: "to agree to receive or take something", ipa: "/əkˈsept/", syn: ["approve", "receive", "take"], ant: ["reject", "refuse", "decline"], ex: "She wants to accept the award.", office: "We want to accept new assignments.", interview: "I want to accept this challenge.", biz: "We want to accept international payments." },
  { word: "change", pos: "verb", hindi: "बदलना / परिवर्तन करना", simple: "to make or become different", ipa: "/tʃeɪndʒ/", syn: ["alter", "modify", "shift"], ant: ["keep", "maintain"], ex: "He wants to change his habits.", office: "We want to change the process.", interview: "I want to change how things are done.", biz: "We want to change our pricing strategy." },
  { word: "create", pos: "verb", hindi: "बनाना / सृजन करना", simple: "to make something new", ipa: "/kriˈeɪt/", syn: ["make", "produce", "design"], ant: ["destroy", "delete"], ex: "She wants to create a painting.", office: "We want to create a new policy.", interview: "I want to create value for this company.", biz: "We want to create innovative products." },
  { word: "focus", pos: "verb", hindi: "ध्यान देना / केंद्रित होना", simple: "to concentrate on something", ipa: "/ˈfəʊkəs/", syn: ["concentrate", "center", "direct"], ant: ["distract", "scatter"], ex: "I want to focus on my studies.", office: "We want to focus on key priorities.", interview: "I want to focus on results-driven work.", biz: "We want to focus on customer retention." },
  { word: "hire", pos: "verb", hindi: "नियुक्त करना / काम पर रखना", simple: "to give someone a job", ipa: "/haɪər/", syn: ["employ", "recruit", "appoint"], ant: ["fire", "dismiss"], ex: "They want to hire a new chef.", office: "HR wants to hire ten new staff.", interview: "They want to hire someone driven.", biz: "We want to hire local talent." },
  { word: "invest", pos: "verb", hindi: "निवेश करना", simple: "to put money into something for future gain", ipa: "/ɪnˈvest/", syn: ["fund", "finance", "put in"], ant: ["withdraw", "disinvest"], ex: "He wants to invest in real estate.", office: "The company wants to invest in training.", interview: "I want to invest time in upskilling.", biz: "We want to invest in new technology." },
  { word: "join", pos: "verb", hindi: "जुड़ना / शामिल होना", simple: "to become part of a group or activity", ipa: "/dʒɔɪn/", syn: ["enter", "enroll", "participate"], ant: ["leave", "exit"], ex: "She wants to join the gym.", office: "He wants to join the project team.", interview: "I want to join your organization.", biz: "We want to join the trade alliance." },
  { word: "launch", pos: "verb", hindi: "लॉन्च करना / शुरू करना", simple: "to start or introduce something new", ipa: "/lɔːntʃ/", syn: ["introduce", "start", "release"], ant: ["cancel", "withdraw"], ex: "They want to launch a new app.", office: "We want to launch the campaign next week.", interview: "I want to launch projects from scratch.", biz: "We want to launch in three new cities." },
  { word: "discuss", pos: "verb", hindi: "चर्चा करना / विचार-विमर्श करना", simple: "to talk about a topic with others", ipa: "/dɪˈskʌs/", syn: ["talk about", "debate", "confer"], ant: ["avoid", "ignore"], ex: "He wants to discuss the plan.", office: "We want to discuss the budget.", interview: "I want to discuss my goals.", biz: "We want to discuss partnership terms." },
  { word: "present", pos: "verb", hindi: "प्रस्तुत करना", simple: "to show or explain something to others", ipa: "/prɪˈzent/", syn: ["show", "introduce", "display"], ant: ["hide", "withhold"], ex: "She wants to present her idea.", office: "He wants to present the quarterly results.", interview: "I want to present my best work.", biz: "We want to present our proposal to the board." },
  { word: "promote", pos: "verb", hindi: "पदोन्नति देना / बढ़ावा देना", simple: "to raise someone to a higher position or advertise", ipa: "/prəˈməʊt/", syn: ["advance", "advertise", "raise"], ant: ["demote", "downgrade"], ex: "She wants to promote her business online.", office: "He wants to promote within the team.", interview: "I want to be promoted to senior level.", biz: "We want to promote our brand on social media." },
  { word: "reduce", pos: "verb", hindi: "कम करना / घटाना", simple: "to make something smaller or less", ipa: "/rɪˈdjuːs/", syn: ["cut", "lower", "decrease"], ant: ["increase", "raise"], ex: "She wants to reduce stress.", office: "We want to reduce paper usage.", interview: "I want to reduce inefficiencies.", biz: "We want to reduce operational costs." },
  { word: "succeed", pos: "verb", hindi: "सफल होना", simple: "to achieve a desired aim", ipa: "/səkˈsiːd/", syn: ["prosper", "thrive", "achieve"], ant: ["fail", "struggle"], ex: "He wants to succeed in life.", office: "She wants to succeed in her new role.", interview: "I want to succeed in every project I take.", biz: "We want to succeed in global markets." },
  { word: "train", pos: "verb", hindi: "प्रशिक्षित करना / अभ्यास करना", simple: "to teach skills or practice for improvement", ipa: "/treɪn/", syn: ["coach", "teach", "practise"], ant: ["ignore", "neglect"], ex: "I want to train for a marathon.", office: "We want to train new employees.", interview: "I want to train under experienced mentors.", biz: "We want to train our sales force." },
  { word: "work", pos: "verb", hindi: "काम करना", simple: "to do a job or task", ipa: "/wɜːrk/", syn: ["labor", "function", "operate"], ant: ["rest", "quit"], ex: "I want to work from home today.", office: "She wants to work on the new project.", interview: "I want to work in a dynamic environment.", biz: "We want to work with reliable suppliers." },
  { word: "achieve", pos: "verb", hindi: "सिद्ध करना", simple: "to reach a goal through effort", ipa: "/əˈtʃiːv/", syn: ["attain", "accomplish"], ant: ["fail"], ex: "He wants to achieve his dreams.", office: "We want to achieve our targets.", interview: "I want to achieve measurable results.", biz: "We want to achieve market dominance." },
  { word: "network", pos: "verb", hindi: "संपर्क बनाना / नेटवर्क बनाना", simple: "to meet people to build professional connections", ipa: "/ˈnetwɜːrk/", syn: ["connect", "liaise", "socialize"], ant: ["isolate", "disconnect"], ex: "She wants to network at the conference.", office: "He wants to network with industry leaders.", interview: "I want to network within the company.", biz: "We want to network with global partners." },
  { word: "organize", pos: "verb", hindi: "व्यवस्थित करना / आयोजन करना", simple: "to arrange things in an orderly way", ipa: "/ˈɔːɡənaɪz/", syn: ["arrange", "plan", "coordinate"], ant: ["disorganize", "jumble"], ex: "She wants to organize her room.", office: "He wants to organize the event.", interview: "I want to organize my tasks efficiently.", biz: "We want to organize a product launch event." },

  // Nouns
  { word: "opportunity", pos: "noun", hindi: "अवसर / मौका", simple: "a good chance to do something", ipa: "/ˌɒpəˈtjuːnɪti/", syn: ["chance", "opening", "prospect"], ant: ["obstacle", "setback"], ex: "She wants a better opportunity.", office: "This project is a great opportunity for growth.", interview: "I want to use this opportunity wisely.", biz: "We see an opportunity in the rural market." },
  { word: "goal", pos: "noun", hindi: "लक्ष्य / उद्देश्य", simple: "something you want to achieve", ipa: "/ɡəʊl/", syn: ["aim", "target", "objective"], ant: [], ex: "My goal is to be fluent in English.", office: "We set clear quarterly goals.", interview: "My goal is to lead a team in five years.", biz: "Our business goal is to double revenue." },
  { word: "success", pos: "noun", hindi: "सफलता", simple: "the achievement of what you wanted", ipa: "/səkˈses/", syn: ["achievement", "triumph", "victory"], ant: ["failure", "defeat"], ex: "She wants success in her career.", office: "The team celebrated their success.", interview: "Success means delivering results consistently.", biz: "Business success requires customer trust." },
  { word: "career", pos: "noun", hindi: "करियर / व्यवसाय जीवन", simple: "a long-term job or profession", ipa: "/kəˈrɪər/", syn: ["profession", "vocation", "occupation"], ant: [], ex: "He wants to build a strong career.", office: "She is working hard to advance her career.", interview: "I want a career in technology.", biz: "Career development is key to retention." },
  { word: "salary", pos: "noun", hindi: "वेतन / तनख्वाह", simple: "money paid for work done", ipa: "/ˈsæləri/", syn: ["pay", "wage", "income"], ant: [], ex: "He wants a higher salary.", office: "Salary reviews happen every April.", interview: "I want a salary that matches my skills.", biz: "Competitive salaries attract top talent." },
  { word: "promotion", pos: "noun", hindi: "पदोन्नति / तरक्की", simple: "moving to a higher position at work", ipa: "/prəˈməʊʃən/", syn: ["advancement", "upgrade", "rise"], ant: ["demotion", "downgrade"], ex: "She wants a promotion this year.", office: "Hard work leads to promotion.", interview: "I want a promotion within two years.", biz: "Promotion criteria should be transparent." },
  { word: "experience", pos: "noun", hindi: "अनुभव", simple: "knowledge or skill from doing something", ipa: "/ɪkˈspɪərɪəns/", syn: ["knowledge", "practice", "exposure"], ant: ["inexperience", "ignorance"], ex: "He wants more experience before applying.", office: "Experience helps in decision-making.", interview: "I have three years of relevant experience.", biz: "Customer experience drives loyalty." },
  { word: "confidence", pos: "noun", hindi: "आत्मविश्वास", simple: "a belief in your own abilities", ipa: "/ˈkɒnfɪdəns/", syn: ["self-assurance", "boldness", "certainty"], ant: ["doubt", "insecurity"], ex: "She wants to build more confidence.", office: "Confidence helps in presentations.", interview: "I speak with confidence in interviews.", biz: "Brand confidence drives sales." },
  { word: "knowledge", pos: "noun", hindi: "ज्ञान / जानकारी", simple: "information or understanding about something", ipa: "/ˈnɒlɪdʒ/", syn: ["understanding", "expertise", "information"], ant: ["ignorance", "unawareness"], ex: "He wants more knowledge of computers.", office: "Knowledge sharing improves team performance.", interview: "I have strong knowledge of finance.", biz: "Knowledge management boosts innovation." },
  { word: "skill", pos: "noun", hindi: "कौशल / हुनर", simple: "the ability to do something well", ipa: "/skɪl/", syn: ["ability", "expertise", "talent"], ant: ["inability", "weakness"], ex: "She wants to develop a new skill.", office: "Communication skills are valued here.", interview: "My top skill is problem-solving.", biz: "Upskilling the workforce is our priority." },
  { word: "team", pos: "noun", hindi: "टीम / दल", simple: "a group working together", ipa: "/tiːm/", syn: ["group", "squad", "unit"], ant: ["individual", "solo"], ex: "He wants to be on a winning team.", office: "The team finished the project early.", interview: "I want to work in a collaborative team.", biz: "A strong team drives business results." },
  { word: "project", pos: "noun", hindi: "परियोजना / प्रोजेक्ट", simple: "a planned piece of work", ipa: "/ˈprɒdʒekt/", syn: ["assignment", "task", "initiative"], ant: [], ex: "She wants to lead the next project.", office: "The project deadline is next Monday.", interview: "I handled multiple projects simultaneously.", biz: "The project delivered strong ROI." },
  { word: "meeting", pos: "noun", hindi: "बैठक / मीटिंग", simple: "a gathering to discuss something", ipa: "/ˈmiːtɪŋ/", syn: ["conference", "assembly", "session"], ant: [], ex: "He wants to skip the meeting.", office: "The morning meeting is at nine.", interview: "I prepare well for client meetings.", biz: "Business meetings should have clear agendas." },
  { word: "report", pos: "noun", hindi: "रिपोर्ट / प्रतिवेदन", simple: "a written or spoken account of something", ipa: "/rɪˈpɔːrt/", syn: ["document", "account", "summary"], ant: [], ex: "She wants to submit the report early.", office: "The weekly report is due on Friday.", interview: "I prepare clear, concise reports.", biz: "The annual report shows strong growth." },
  { word: "feedback", pos: "noun", hindi: "प्रतिक्रिया / सुझाव", simple: "comments about how well someone did", ipa: "/ˈfiːdbæk/", syn: ["response", "review", "comment"], ant: ["silence", "ignore"], ex: "He wants honest feedback.", office: "Regular feedback improves performance.", interview: "I welcome constructive feedback.", biz: "Customer feedback shapes our product." },
  { word: "deadline", pos: "noun", hindi: "समय-सीमा / अंतिम तारीख", simple: "the latest time by which something must be done", ipa: "/ˈdedlaɪn/", syn: ["due date", "cutoff", "time limit"], ant: [], ex: "She wants to meet every deadline.", office: "The deadline for submissions is tomorrow.", interview: "I always deliver before the deadline.", biz: "Project deadlines must be clearly communicated." },
  { word: "decision", pos: "noun", hindi: "निर्णय / फैसला", simple: "a choice that you make", ipa: "/dɪˈsɪʒən/", syn: ["choice", "resolution", "judgment"], ant: ["indecision", "hesitation"], ex: "He wants to make the right decision.", office: "The decision was made by the manager.", interview: "I make decisions based on data.", biz: "Strategic decisions drive growth." },
  { word: "solution", pos: "noun", hindi: "समाधान / हल", simple: "an answer to a problem", ipa: "/səˈluːʃən/", syn: ["answer", "fix", "resolution"], ant: ["problem", "issue"], ex: "She wants a quick solution.", office: "We found a solution to the error.", interview: "I focus on finding practical solutions.", biz: "We offer tech solutions for businesses." },
  { word: "challenge", pos: "noun", hindi: "चुनौती / कठिनाई", simple: "a difficult task that requires effort", ipa: "/ˈtʃælɪndʒ/", syn: ["difficulty", "obstacle", "test"], ant: ["ease", "simplicity"], ex: "He wants to face every challenge.", office: "The challenge is meeting the tight timeline.", interview: "I thrive under challenge.", biz: "Market challenges require creative thinking." },
  { word: "benefit", pos: "noun", hindi: "लाभ / फायदा", simple: "an advantage or positive outcome", ipa: "/ˈbenɪfɪt/", syn: ["advantage", "gain", "profit"], ant: ["disadvantage", "loss"], ex: "She wants the benefits of good health.", office: "The company offers good employee benefits.", interview: "What are the benefits of this role?", biz: "The merger brings mutual benefits." },
  { word: "growth", pos: "noun", hindi: "विकास / बढ़ोतरी", simple: "an increase in size, value, or importance", ipa: "/ɡrəʊθ/", syn: ["expansion", "progress", "development"], ant: ["decline", "shrinkage"], ex: "He wants personal growth.", office: "Career growth is important to our employees.", interview: "I am looking for growth opportunities.", biz: "Revenue growth was 15% this quarter." },
  { word: "progress", pos: "noun", hindi: "प्रगति / तरक्की", simple: "movement toward a goal", ipa: "/ˈprəʊɡres/", syn: ["advancement", "development", "improvement"], ant: ["regression", "decline"], ex: "She wants to see progress in her English.", office: "We track progress weekly.", interview: "I measure progress by results.", biz: "Progress depends on consistent effort." },
  { word: "strategy", pos: "noun", hindi: "रणनीति / योजना", simple: "a plan designed to achieve a goal", ipa: "/ˈstrætɪdʒi/", syn: ["plan", "approach", "tactic"], ant: ["improvisation", "random"], ex: "He wants a clear strategy.", office: "The team discussed the marketing strategy.", interview: "I developed a go-to-market strategy.", biz: "A strong strategy drives competitive advantage." },
  { word: "training", pos: "noun", hindi: "प्रशिक्षण", simple: "the process of learning skills", ipa: "/ˈtreɪnɪŋ/", syn: ["coaching", "instruction", "education"], ant: [], ex: "She wants to attend a training program.", office: "Training helps staff perform better.", interview: "I completed sales training last year.", biz: "Investment in training reduces turnover." },
  { word: "performance", pos: "noun", hindi: "प्रदर्शन / कार्यक्षमता", simple: "how well someone does something", ipa: "/pəˈfɔːrməns/", syn: ["output", "result", "execution"], ant: ["failure", "underperformance"], ex: "His performance has improved greatly.", office: "We review performance quarterly.", interview: "I track my own performance metrics.", biz: "Strong performance leads to higher ratings." },
  { word: "responsibility", pos: "noun", hindi: "जिम्मेदारी / उत्तरदायित्व", simple: "a duty or task you are expected to do", ipa: "/rɪˌspɒnsɪˈbɪlɪti/", syn: ["duty", "obligation", "accountability"], ant: ["irresponsibility", "neglect"], ex: "She wants more responsibility at work.", office: "Taking responsibility shows maturity.", interview: "I want to take on more responsibilities.", biz: "Corporate responsibility matters to stakeholders." },
  { word: "leadership", pos: "noun", hindi: "नेतृत्व", simple: "the ability to guide or inspire others", ipa: "/ˈliːdəʃɪp/", syn: ["management", "guidance", "direction"], ant: ["followership"], ex: "He wants to develop leadership skills.", office: "Leadership training is offered here.", interview: "I demonstrated leadership in my last role.", biz: "Effective leadership drives company culture." },
  { word: "communication", pos: "noun", hindi: "संचार / संवाद", simple: "the sharing of information between people", ipa: "/kəˌmjuːnɪˈkeɪʃən/", syn: ["interaction", "dialogue", "exchange"], ant: ["silence", "isolation"], ex: "Good communication is key.", office: "We need better team communication.", interview: "Communication is my strongest skill.", biz: "Clear communication prevents misunderstandings." },
  { word: "innovation", pos: "noun", hindi: "नवाचार / नई सोच", simple: "a new idea or method", ipa: "/ˌɪnəˈveɪʃən/", syn: ["creativity", "invention", "novelty"], ant: ["tradition", "stagnation"], ex: "She wants to drive innovation.", office: "Innovation is encouraged in this team.", interview: "I bring innovation to my work.", biz: "Innovation is the key to staying competitive." },
  { word: "achievement", pos: "noun", hindi: "उपलब्धि / सफलता", simple: "something successfully accomplished", ipa: "/əˈtʃiːvmənt/", syn: ["accomplishment", "feat", "success"], ant: ["failure", "miss"], ex: "She is proud of her achievement.", office: "List your top achievements on your resume.", interview: "My greatest achievement was launching a new product.", biz: "Celebrating achievements boosts team morale." },
  { word: "attitude", pos: "noun", hindi: "रवैया / नज़रिया", simple: "a way of thinking or feeling about something", ipa: "/ˈætɪtjuːd/", syn: ["outlook", "perspective", "mindset"], ant: [], ex: "A positive attitude helps a lot.", office: "We value a can-do attitude.", interview: "My attitude is always solution-focused.", biz: "Customer-first attitude drives loyalty." },
  { word: "effort", pos: "noun", hindi: "प्रयास / कोशिश", simple: "physical or mental energy used to do something", ipa: "/ˈefərt/", syn: ["attempt", "endeavor", "exertion"], ant: ["laziness", "negligence"], ex: "She puts a lot of effort into her work.", office: "His effort is visible in the results.", interview: "I give maximum effort to every task.", biz: "Collective effort drives organizational success." },
  { word: "promotion", pos: "noun", hindi: "तरक्की", simple: "a raise to a higher rank or job title", ipa: "/prəˈməʊʃən/", syn: ["advancement", "rise", "elevation"], ant: ["demotion"], ex: "He got a promotion last month.", office: "Promotions are based on performance.", interview: "My goal is to earn a promotion.", biz: "Promotion policies should be merit-based." },
  { word: "customer", pos: "noun", hindi: "ग्राहक", simple: "a person who buys goods or services", ipa: "/ˈkʌstəmər/", syn: ["client", "buyer", "consumer"], ant: ["seller", "vendor"], ex: "The customer wants a refund.", office: "Always greet the customer with a smile.", interview: "I have strong customer service skills.", biz: "Customer satisfaction is our top priority." },
  { word: "product", pos: "noun", hindi: "उत्पाद / वस्तु", simple: "something made to be sold", ipa: "/ˈprɒdʌkt/", syn: ["item", "good", "commodity"], ant: ["service"], ex: "She wants to buy a new product.", office: "The product launch is scheduled next month.", interview: "I managed the full product lifecycle.", biz: "Our product solves a real market problem." },
  { word: "service", pos: "noun", hindi: "सेवा", simple: "work done for others", ipa: "/ˈsɜːrvɪs/", syn: ["assistance", "support", "help"], ant: ["disservice", "neglect"], ex: "The hotel service was excellent.", office: "We offer after-sales service.", interview: "Customer service was my primary responsibility.", biz: "We provide end-to-end IT service." },
  { word: "market", pos: "noun", hindi: "बाज़ार", simple: "a place or system for buying and selling", ipa: "/ˈmɑːrkɪt/", syn: ["marketplace", "trade", "bazaar"], ant: [], ex: "She goes to the market every day.", office: "We want to enter a new market.", interview: "I have good knowledge of the Indian market.", biz: "Market research guides our strategy." },
  { word: "profit", pos: "noun", hindi: "लाभ / मुनाफा", simple: "money earned after paying costs", ipa: "/ˈprɒfɪt/", syn: ["gain", "surplus", "return"], ant: ["loss", "deficit"], ex: "The company made a good profit.", office: "Our department contributes to profit.", interview: "I helped increase profit by 20%.", biz: "Profit maximization is a key business goal." },
  { word: "budget", pos: "noun", hindi: "बजट / खर्च की सीमा", simple: "a plan for how money will be spent", ipa: "/ˈbʌdʒɪt/", syn: ["estimate", "allocation", "funds"], ant: [], ex: "She wants to stay within budget.", office: "The project budget is one lakh rupees.", interview: "I managed a budget of five crore rupees.", biz: "Budget planning is essential for startups." },
  { word: "contract", pos: "noun", hindi: "अनुबंध / करार", simple: "a legal agreement between people or organizations", ipa: "/ˈkɒntrækt/", syn: ["agreement", "deal", "pact"], ant: [], ex: "He wants to sign the contract.", office: "Please review the contract before signing.", interview: "I have experience drafting contracts.", biz: "The contract was worth ten million dollars." },
  { word: "interview", pos: "noun", hindi: "साक्षात्कार / इंटरव्यू", simple: "a formal meeting to assess someone for a job", ipa: "/ˈɪntəvjuː/", syn: ["assessment", "evaluation", "questioning"], ant: [], ex: "She wants to crack the interview.", office: "Schedule the interview for Monday.", interview: "I prepared well for this interview.", biz: "Structured interviews improve hiring quality." },
  { word: "resume", pos: "noun", hindi: "बायोडेटा / जीवन परिचय", simple: "a document listing your work experience and skills", ipa: "/ˈrezjuːmeɪ/", syn: ["CV", "biodata", "curriculum vitae"], ant: [], ex: "He wants to update his resume.", office: "Attach your resume to the email.", interview: "My resume highlights five years of experience.", biz: "A strong resume is your first impression." },
  { word: "request", pos: "noun", hindi: "अनुरोध / निवेदन", simple: "asking for something politely", ipa: "/rɪˈkwest/", syn: ["appeal", "plea", "demand"], ant: ["refusal", "rejection"], ex: "She made a polite request.", office: "Submit your leave request online.", interview: "I made a request for role clarification.", biz: "We received a large purchase request." },
  { word: "response", pos: "noun", hindi: "जवाब / प्रतिक्रिया", simple: "a reply or reaction to something", ipa: "/rɪˈspɒns/", syn: ["reply", "answer", "reaction"], ant: ["silence", "question"], ex: "He wants a quick response.", office: "Please send your response by noon.", interview: "I give well-thought-out responses.", biz: "A fast response builds customer trust." },
  { word: "idea", pos: "noun", hindi: "विचार / आइडिया", simple: "a thought or suggestion", ipa: "/aɪˈdɪə/", syn: ["thought", "concept", "notion"], ant: [], ex: "She has a great idea.", office: "Share your ideas in the brainstorming session.", interview: "I bring fresh ideas to the table.", biz: "Innovation starts with a good idea." },
  { word: "plan", pos: "noun", hindi: "योजना / प्लान", simple: "a decision about what to do", ipa: "/plæn/", syn: ["scheme", "strategy", "proposal"], ant: [], ex: "He wants a clear plan.", office: "The project plan is ready.", interview: "I always follow a structured plan.", biz: "A business plan is essential for investors." },
  { word: "result", pos: "noun", hindi: "परिणाम / नतीजा", simple: "the outcome of an action", ipa: "/rɪˈzʌlt/", syn: ["outcome", "effect", "consequence"], ant: ["cause", "input"], ex: "She wants good results.", office: "The results show a 10% increase.", interview: "I am results-oriented.", biz: "Results justify the investment." },
  { word: "target", pos: "noun", hindi: "लक्ष्य / टार्गेट", simple: "a goal you are trying to reach", ipa: "/ˈtɑːrɡɪt/", syn: ["goal", "aim", "objective"], ant: [], ex: "He met his monthly target.", office: "Sales target for this quarter is high.", interview: "I consistently exceed my targets.", biz: "Setting realistic targets improves performance." },
  { word: "action", pos: "noun", hindi: "कार्रवाई / कदम", simple: "something done to achieve a result", ipa: "/ˈækʃən/", syn: ["step", "move", "deed"], ant: ["inaction", "inactivity"], ex: "She wants to take action now.", office: "Assign action items after the meeting.", interview: "I believe in taking swift action.", biz: "Prompt action prevents business losses." },
  { word: "department", pos: "noun", hindi: "विभाग", simple: "a section of a company or organization", ipa: "/dɪˈpɑːrtmənt/", syn: ["division", "section", "unit"], ant: [], ex: "She works in the finance department.", office: "Each department has its own budget.", interview: "I want to work in the marketing department.", biz: "The sales department exceeded its annual target." },
  { word: "environment", pos: "noun", hindi: "वातावरण / माहौल", simple: "the surroundings in which people live or work", ipa: "/ɪnˈvaɪrənmənt/", syn: ["surroundings", "setting", "atmosphere"], ant: [], ex: "She wants a healthy work environment.", office: "We foster a positive work environment.", interview: "I thrive in a fast-paced environment.", biz: "A good business environment attracts investment." },
  { word: "competition", pos: "noun", hindi: "प्रतिस्पर्धा / मुकाबला", simple: "a contest between rivals", ipa: "/ˌkɒmpɪˈtɪʃən/", syn: ["rivalry", "contest", "race"], ant: ["cooperation", "alliance"], ex: "The competition is very tough.", office: "We monitor market competition.", interview: "I perform well under competition.", biz: "Know your competition before entering a market." },
  { word: "partner", pos: "noun", hindi: "भागीदार / साथी", simple: "someone who shares in an activity or business", ipa: "/ˈpɑːrtnər/", syn: ["associate", "ally", "collaborator"], ant: ["rival", "competitor"], ex: "She wants a reliable partner.", office: "Our partner company is based in Delhi.", interview: "I work well as a team partner.", biz: "We want a strong distribution partner." },
  { word: "customer", pos: "noun", hindi: "ग्राहक / उपभोक्ता", simple: "someone who uses a product or service", ipa: "/ˈkʌstəmər/", syn: ["client", "buyer", "patron"], ant: [], ex: "Every customer deserves respect.", office: "Customer complaints are handled by CRM.", interview: "I handled 50 customer queries daily.", biz: "Customer acquisition costs are rising." },
  { word: "profit", pos: "noun", hindi: "मुनाफा / लाभ", simple: "financial gain from a business activity", ipa: "/ˈprɒfɪt/", syn: ["gain", "return", "earnings"], ant: ["loss"], ex: "The shop made a good profit today.", office: "Our profit margins improved last quarter.", interview: "I contributed to profit growth.", biz: "Maximizing profit is a key objective." },
  { word: "quality", pos: "noun", hindi: "गुणवत्ता / स्तर", simple: "the standard or level of something", ipa: "/ˈkwɒlɪti/", syn: ["standard", "excellence", "grade"], ant: ["inferiority", "poor standard"], ex: "She wants quality education.", office: "Quality control is essential here.", interview: "I never compromise on quality.", biz: "Quality products earn customer loyalty." },
  { word: "issue", pos: "noun", hindi: "समस्या / मुद्दा", simple: "a problem or topic of discussion", ipa: "/ˈɪʃuː/", syn: ["problem", "matter", "topic"], ant: ["solution", "resolution"], ex: "He wants to resolve the issue.", office: "Raise any issue with your manager.", interview: "I resolved a critical technical issue.", biz: "Supply chain issues affect delivery times." },
  { word: "role", pos: "noun", hindi: "भूमिका / पद", simple: "the position or function of someone", ipa: "/rəʊl/", syn: ["position", "job", "function"], ant: [], ex: "She wants a leadership role.", office: "Define your role clearly in the team.", interview: "I am applying for the analyst role.", biz: "Every role in the company adds value." },

  // Adjectives
  { word: "ambitious", pos: "adjective", hindi: "महत्वाकांक्षी", simple: "having a strong desire to achieve something", ipa: "/æmˈbɪʃəs/", syn: ["driven", "motivated", "aspiring"], ant: ["lazy", "unambitious"], ex: "She is ambitious about her career.", office: "We need ambitious team members.", interview: "I am ambitious and goal-oriented.", biz: "Ambitious targets push teams to excel." },
  { word: "confident", pos: "adjective", hindi: "आत्मविश्वासी", simple: "feeling sure about your abilities", ipa: "/ˈkɒnfɪdənt/", syn: ["self-assured", "bold", "assured"], ant: ["shy", "doubtful"], ex: "He is confident in his answers.", office: "A confident attitude impresses clients.", interview: "I am confident about my skills.", biz: "A confident pitch wins investors." },
  { word: "creative", pos: "adjective", hindi: "रचनात्मक / सृजनशील", simple: "having the ability to make new ideas", ipa: "/kriˈeɪtɪv/", syn: ["imaginative", "innovative", "inventive"], ant: ["uncreative", "dull"], ex: "She is very creative.", office: "Creative thinking solves complex problems.", interview: "I am creative and love brainstorming.", biz: "Creative marketing increases brand awareness." },
  { word: "dedicated", pos: "adjective", hindi: "समर्पित / लगनशील", simple: "fully committed to a task", ipa: "/ˈdedɪkeɪtɪd/", syn: ["committed", "devoted", "hardworking"], ant: ["lazy", "indifferent"], ex: "He is a dedicated worker.", office: "Dedicated employees are assets.", interview: "I am dedicated to continuous improvement.", biz: "Dedicated service teams retain customers." },
  { word: "efficient", pos: "adjective", hindi: "कुशल / दक्ष", simple: "doing tasks well with little waste of time", ipa: "/ɪˈfɪʃənt/", syn: ["effective", "productive", "capable"], ant: ["inefficient", "wasteful"], ex: "She is an efficient worker.", office: "Our team is highly efficient.", interview: "I am efficient under pressure.", biz: "Efficient operations reduce costs." },
  { word: "flexible", pos: "adjective", hindi: "लचीला / अनुकूलनशील", simple: "willing to change or adapt", ipa: "/ˈfleksɪbəl/", syn: ["adaptable", "adjustable", "open"], ant: ["rigid", "inflexible"], ex: "He is flexible with his schedule.", office: "Flexible working hours boost morale.", interview: "I am flexible and adapt quickly.", biz: "Flexible contracts attract more clients." },
  { word: "honest", pos: "adjective", hindi: "ईमानदार", simple: "telling the truth; not cheating", ipa: "/ˈɒnɪst/", syn: ["truthful", "sincere", "trustworthy"], ant: ["dishonest", "deceptive"], ex: "She is always honest.", office: "We value honest feedback.", interview: "I am honest about my strengths and weaknesses.", biz: "Honest communication builds trust." },
  { word: "motivated", pos: "adjective", hindi: "प्रेरित / उत्साहित", simple: "feeling eager and ready to work hard", ipa: "/ˈməʊtɪveɪtɪd/", syn: ["driven", "enthusiastic", "inspired"], ant: ["unmotivated", "apathetic"], ex: "She is highly motivated.", office: "Motivated employees perform better.", interview: "I am self-motivated.", biz: "A motivated workforce drives innovation." },
  { word: "organized", pos: "adjective", hindi: "व्यवस्थित / संगठित", simple: "arranged in a neat, structured way", ipa: "/ˈɔːɡənaɪzd/", syn: ["structured", "systematic", "tidy"], ant: ["disorganized", "chaotic"], ex: "He is very organized at work.", office: "Stay organized to meet deadlines.", interview: "I am well-organized and detail-oriented.", biz: "An organized business runs smoothly." },
  { word: "professional", pos: "adjective", hindi: "पेशेवर / व्यावसायिक", simple: "behaving in a skilled, businesslike manner", ipa: "/prəˈfeʃənəl/", syn: ["expert", "skilled", "competent"], ant: ["amateur", "unprofessional"], ex: "She always looks professional.", office: "Maintain a professional tone in emails.", interview: "I carry myself in a professional manner.", biz: "Professional branding attracts high-value clients." },
  { word: "reliable", pos: "adjective", hindi: "भरोसेमंद / विश्वसनीय", simple: "consistently good and trustworthy", ipa: "/rɪˈlaɪəbl/", syn: ["dependable", "trustworthy", "steady"], ant: ["unreliable", "unpredictable"], ex: "He is a reliable colleague.", office: "We need a reliable supplier.", interview: "I am reliable and consistent.", biz: "Reliable service builds long-term relationships." },
  { word: "responsible", pos: "adjective", hindi: "जिम्मेदार", simple: "having a duty to do something or take care of something", ipa: "/rɪˈspɒnsɪbəl/", syn: ["accountable", "dependable", "trustworthy"], ant: ["irresponsible", "careless"], ex: "She is responsible for the accounts.", office: "Be responsible with company data.", interview: "I am responsible for team deliverables.", biz: "Responsible business practices attract investors." },
  { word: "skilled", pos: "adjective", hindi: "कुशल / दक्ष", simple: "having the ability to do something well", ipa: "/skɪld/", syn: ["expert", "proficient", "talented"], ant: ["unskilled", "amateur"], ex: "He is a skilled programmer.", office: "We need skilled technicians.", interview: "I am skilled in data analysis.", biz: "Skilled employees drive competitive advantage." },
  { word: "smart", pos: "adjective", hindi: "चतुर / होशियार", simple: "intelligent or quick in understanding", ipa: "/smɑːrt/", syn: ["intelligent", "clever", "sharp"], ant: ["dull", "slow"], ex: "She is very smart.", office: "Smart workers find better solutions.", interview: "I make smart, data-driven decisions.", biz: "Smart investments yield high returns." },
  { word: "successful", pos: "adjective", hindi: "सफल / कामयाब", simple: "having achieved a goal or aim", ipa: "/səkˈsesful/", syn: ["accomplished", "prosperous", "thriving"], ant: ["unsuccessful", "failing"], ex: "He is a successful entrepreneur.", office: "We want to run a successful team.", interview: "I want to be part of a successful company.", biz: "A successful business meets customer needs." },
  { word: "hardworking", pos: "adjective", hindi: "मेहनती / परिश्रमी", simple: "putting in a lot of effort and energy", ipa: "/ˈhɑːrdwɜːrkɪŋ/", syn: ["diligent", "industrious", "dedicated"], ant: ["lazy", "idle"], ex: "She is hardworking and sincere.", office: "Hardworking staff are rewarded.", interview: "I am hardworking and committed.", biz: "Hardworking teams meet stretch targets." },
  { word: "passionate", pos: "adjective", hindi: "जुनूनी / उत्साही", simple: "having or showing strong feelings about something", ipa: "/ˈpæʃənɪt/", syn: ["enthusiastic", "eager", "devoted"], ant: ["indifferent", "apathetic"], ex: "She is passionate about teaching.", office: "We want passionate team players.", interview: "I am passionate about learning new skills.", biz: "Passionate founders inspire their teams." },
  { word: "punctual", pos: "adjective", hindi: "समय पर आने वाला / समयनिष्ठ", simple: "arriving or doing things at the right time", ipa: "/ˈpʌŋktʃuəl/", syn: ["on time", "prompt", "timely"], ant: ["late", "tardy"], ex: "He is always punctual.", office: "Punctual employees are valued.", interview: "I am always punctual for meetings.", biz: "Punctual delivery satisfies customers." },
  { word: "positive", pos: "adjective", hindi: "सकारात्मक", simple: "having an optimistic or good attitude", ipa: "/ˈpɒzɪtɪv/", syn: ["optimistic", "hopeful", "constructive"], ant: ["negative", "pessimistic"], ex: "She has a positive outlook.", office: "Keep a positive attitude at work.", interview: "I stay positive under pressure.", biz: "Positive brand image drives sales." },
  { word: "logical", pos: "adjective", hindi: "तर्कसंगत / तार्किक", simple: "based on clear and sound reasoning", ipa: "/ˈlɒdʒɪkəl/", syn: ["rational", "reasonable", "sensible"], ant: ["illogical", "irrational"], ex: "His plan is logical.", office: "Give logical explanations in reports.", interview: "I approach problems in a logical way.", biz: "Logical pricing wins customer trust." },
  { word: "patient", pos: "adjective", hindi: "धैर्यवान / सहनशील", simple: "able to wait calmly without getting upset", ipa: "/ˈpeɪʃənt/", syn: ["calm", "tolerant", "enduring"], ant: ["impatient", "restless"], ex: "She is patient with beginners.", office: "Be patient during tough projects.", interview: "I am patient when dealing with clients.", biz: "Patient investors earn better returns." },
  { word: "practical", pos: "adjective", hindi: "व्यावहारिक / प्रायोगिक", simple: "relating to real situations, not just theory", ipa: "/ˈpræktɪkəl/", syn: ["realistic", "pragmatic", "applied"], ant: ["theoretical", "impractical"], ex: "He takes a practical approach.", office: "We need practical solutions.", interview: "I am practical and results-focused.", biz: "Practical strategies work better than complex ones." },
  { word: "curious", pos: "adjective", hindi: "जिज्ञासु", simple: "eager to learn or know something", ipa: "/ˈkjʊəriəs/", syn: ["inquisitive", "eager", "interested"], ant: ["indifferent", "uninterested"], ex: "She is curious about new cultures.", office: "Curious employees learn faster.", interview: "I am curious and love exploring ideas.", biz: "Curious leaders spot new opportunities." },
  { word: "independent", pos: "adjective", hindi: "स्वतंत्र / आत्मनिर्भर", simple: "not relying on others; self-sufficient", ipa: "/ˌɪndɪˈpendənt/", syn: ["self-reliant", "autonomous", "free"], ant: ["dependent", "reliant"], ex: "He is an independent thinker.", office: "We value independent decision-making.", interview: "I work well independently.", biz: "Independent businesses face unique challenges." },
  { word: "competitive", pos: "adjective", hindi: "प्रतिस्पर्धी / होड़ में रहने वाला", simple: "wanting to win or do better than others", ipa: "/kəmˈpetɪtɪv/", syn: ["driven", "aggressive", "ambitious"], ant: ["passive", "uncompetitive"], ex: "She is competitive and driven.", office: "The job market is highly competitive.", interview: "I thrive in competitive environments.", biz: "Competitive pricing attracts more buyers." },
  { word: "innovative", pos: "adjective", hindi: "नवीन / अभिनव", simple: "introducing new ideas or methods", ipa: "/ˈɪnəveɪtɪv/", syn: ["creative", "original", "pioneering"], ant: ["conventional", "traditional"], ex: "He is innovative in his approach.", office: "We reward innovative thinking.", interview: "I am innovative and forward-thinking.", biz: "Innovative companies disrupt their industries." },
  { word: "effective", pos: "adjective", hindi: "प्रभावशाली / असरदार", simple: "producing the desired result", ipa: "/ɪˈfektɪv/", syn: ["successful", "productive", "efficient"], ant: ["ineffective", "useless"], ex: "She is an effective leader.", office: "We need effective communication.", interview: "I take effective action on problems.", biz: "Effective marketing reaches the right audience." },
  { word: "accurate", pos: "adjective", hindi: "सटीक / सही", simple: "correct, without errors", ipa: "/ˈækjərɪt/", syn: ["precise", "exact", "correct"], ant: ["inaccurate", "wrong"], ex: "He gives accurate information.", office: "Accurate reports are essential.", interview: "I am accurate in data entry and analysis.", biz: "Accurate forecasting improves planning." },
  { word: "polite", pos: "adjective", hindi: "विनम्र / शालीन", simple: "having good manners and being respectful", ipa: "/pəˈlaɪt/", syn: ["courteous", "respectful", "mannerly"], ant: ["rude", "impolite"], ex: "She is always polite.", office: "Be polite with all stakeholders.", interview: "I am polite and professional.", biz: "Polite staff improve customer experience." },
  { word: "sincere", pos: "adjective", hindi: "ईमानदार / सच्चा", simple: "genuinely honest and meaning what you say", ipa: "/sɪnˈsɪər/", syn: ["genuine", "truthful", "heartfelt"], ant: ["insincere", "false"], ex: "He is sincere in his work.", office: "Sincere employees gain trust.", interview: "I am sincere about my commitment.", biz: "Sincere customer care builds loyalty." },
  { word: "determined", pos: "adjective", hindi: "दृढ़ निश्चयी / दृढ़", simple: "having a firm decision to do something", ipa: "/dɪˈtɜːrmɪnd/", syn: ["resolute", "firm", "driven"], ant: ["undecided", "weak"], ex: "She is determined to succeed.", office: "Determined workers overcome obstacles.", interview: "I am determined to deliver results.", biz: "Determined founders build resilient companies." },
  { word: "enthusiastic", pos: "adjective", hindi: "उत्साही / जोशीला", simple: "feeling or showing intense excitement", ipa: "/ɪnˌθjuːziˈæstɪk/", syn: ["eager", "excited", "passionate"], ant: ["apathetic", "reluctant"], ex: "He is enthusiastic about the project.", office: "Enthusiastic employees inspire teams.", interview: "I am enthusiastic about this opportunity.", biz: "Enthusiastic sales teams close more deals." },
  { word: "proactive", pos: "adjective", hindi: "पहल करने वाला / सक्रिय", simple: "taking action before problems arise", ipa: "/ˌprəʊˈæktɪv/", syn: ["initiative-taking", "forward-thinking", "prepared"], ant: ["reactive", "passive"], ex: "She is proactive about solving issues.", office: "We want proactive team members.", interview: "I am proactive and anticipate challenges.", biz: "Proactive companies adapt to market changes." },

  // Adverbs
  { word: "quickly", pos: "adverb", hindi: "जल्दी से / तेज़ी से", simple: "at a fast speed", ipa: "/ˈkwɪkli/", syn: ["fast", "rapidly", "swiftly"], ant: ["slowly", "gradually"], ex: "She finished the task quickly.", office: "Please respond quickly to emails.", interview: "I adapt quickly to new environments.", biz: "Quickly resolving issues builds trust." },
  { word: "clearly", pos: "adverb", hindi: "स्पष्ट रूप से", simple: "in a way that is easy to understand", ipa: "/ˈklɪəli/", syn: ["plainly", "distinctly", "obviously"], ant: ["unclearly", "vaguely"], ex: "She explains things clearly.", office: "Write instructions clearly.", interview: "I communicate clearly and confidently.", biz: "State your value proposition clearly." },
  { word: "consistently", pos: "adverb", hindi: "लगातार / निरंतर", simple: "always behaving in the same way", ipa: "/kənˈsɪstəntli/", syn: ["regularly", "constantly", "steadily"], ant: ["inconsistently", "randomly"], ex: "He performs consistently well.", office: "Deliver results consistently.", interview: "I consistently exceed expectations.", biz: "Consistent quality retains customers." },
  { word: "effectively", pos: "adverb", hindi: "प्रभावी ढंग से", simple: "in a way that produces the desired result", ipa: "/ɪˈfektɪvli/", syn: ["successfully", "efficiently", "productively"], ant: ["ineffectively", "poorly"], ex: "She manages the team effectively.", office: "Use time effectively.", interview: "I communicate effectively in teams.", biz: "Deploy resources effectively to save money." },
  { word: "honestly", pos: "adverb", hindi: "ईमानदारी से", simple: "in a truthful way", ipa: "/ˈɒnɪstli/", syn: ["truthfully", "sincerely", "candidly"], ant: ["dishonestly", "deceptively"], ex: "He answers honestly.", office: "Give feedback honestly.", interview: "I honestly believe I can contribute here.", biz: "Communicate honestly with all stakeholders." },
  { word: "professionally", pos: "adverb", hindi: "पेशेवर तरीके से", simple: "in a way that is skilled and businesslike", ipa: "/prəˈfeʃənəli/", syn: ["expertly", "competently", "formally"], ant: ["unprofessionally", "amateurishly"], ex: "She dresses professionally.", office: "Handle disputes professionally.", interview: "I present myself professionally.", biz: "Engage with clients professionally at all times." },
  { word: "regularly", pos: "adverb", hindi: "नियमित रूप से", simple: "at set intervals or often", ipa: "/ˈreɡjʊləli/", syn: ["frequently", "consistently", "routinely"], ant: ["rarely", "irregularly"], ex: "He exercises regularly.", office: "Review performance regularly.", interview: "I update my skills regularly.", biz: "Regular audits prevent financial errors." },
  { word: "carefully", pos: "adverb", hindi: "ध्यान से / सावधानी से", simple: "with attention to detail", ipa: "/ˈkeərfʊli/", syn: ["attentively", "cautiously", "precisely"], ant: ["carelessly", "hastily"], ex: "She reads the instructions carefully.", office: "Check your work carefully before submitting.", interview: "I listen carefully to understand requirements.", biz: "Carefully review contracts before signing." },
  { word: "confidently", pos: "adverb", hindi: "आत्मविश्वास से", simple: "in a self-assured way", ipa: "/ˈkɒnfɪdəntli/", syn: ["boldly", "assuredly", "decisively"], ant: ["hesitantly", "shyly"], ex: "He speaks confidently.", office: "Present your ideas confidently.", interview: "I answer all questions confidently.", biz: "Pitch your product confidently to win deals." },
  { word: "immediately", pos: "adverb", hindi: "तुरंत / फ़ौरन", simple: "right away, without delay", ipa: "/ɪˈmiːdiətli/", syn: ["instantly", "promptly", "at once"], ant: ["later", "gradually"], ex: "She responded immediately.", office: "Please address this issue immediately.", interview: "I am available to join immediately.", biz: "Respond to customer complaints immediately." },
  { word: "daily", pos: "adverb", hindi: "रोज़ाना / प्रतिदिन", simple: "every day", ipa: "/ˈdeɪli/", syn: ["every day", "routinely", "regularly"], ant: ["occasionally", "rarely"], ex: "He practises English daily.", office: "We have a daily standup meeting.", interview: "I update my task tracker daily.", biz: "Check your sales metrics daily." },
  { word: "actively", pos: "adverb", hindi: "सक्रिय रूप से", simple: "in a participatory, engaged way", ipa: "/ˈæktɪvli/", syn: ["energetically", "eagerly", "dynamically"], ant: ["passively", "lazily"], ex: "She actively participates in discussions.", office: "Actively contribute in team meetings.", interview: "I actively seek feedback to improve.", biz: "Actively monitor competitor strategies." },

  // Phrases
  { word: "take initiative", pos: "phrase", hindi: "पहल करना / खुद कदम उठाना", simple: "to start something without being asked", ipa: "/teɪk ɪˈnɪʃɪətɪv/", syn: ["lead the way", "step up", "be proactive"], ant: [], ex: "She likes to take initiative.", office: "Take initiative in solving problems.", interview: "I always take initiative in new projects.", biz: "Leaders who take initiative drive growth." },
  { word: "make a difference", pos: "phrase", hindi: "फर्क डालना / बदलाव लाना", simple: "to have a positive impact", ipa: "/meɪk ə ˈdɪfərəns/", syn: ["have impact", "create change", "matter"], ant: [], ex: "He wants to make a difference.", office: "Each team member can make a difference.", interview: "I want to make a difference here.", biz: "Our product wants to make a difference in lives." },
  { word: "think outside the box", pos: "phrase", hindi: "नए तरीके से सोचना / रचनात्मक सोच", simple: "to think in an original, creative way", ipa: "/θɪŋk ˌaʊtsaɪd ðə bɒks/", syn: ["innovate", "be creative", "be unconventional"], ant: [], ex: "We want to think outside the box.", office: "Think outside the box for this campaign.", interview: "I think outside the box to solve problems.", biz: "Disruption requires thinking outside the box." },
  { word: "go the extra mile", pos: "phrase", hindi: "अतिरिक्त प्रयास करना / जी-जान लगाना", simple: "to do more than required", ipa: "/ɡəʊ ðə ˈekstrə maɪl/", syn: ["overdeliver", "exceed expectations", "do more"], ant: [], ex: "She always goes the extra mile.", office: "Going the extra mile impresses managers.", interview: "I always go the extra mile for my clients.", biz: "Going the extra mile wins customer loyalty." },
  { word: "keep in touch", pos: "phrase", hindi: "संपर्क में रहना", simple: "to maintain communication", ipa: "/kiːp ɪn tʌtʃ/", syn: ["stay connected", "stay in contact", "follow up"], ant: ["lose touch", "disconnect"], ex: "Let's keep in touch.", office: "We should keep in touch with our clients.", interview: "I keep in touch with professional contacts.", biz: "Keep in touch with key stakeholders regularly." },
  { word: "meet a deadline", pos: "phrase", hindi: "समय पर काम पूरा करना", simple: "to finish a task by the required time", ipa: "/miːt ə ˈdedlaɪn/", syn: ["deliver on time", "be punctual", "finish on time"], ant: ["miss a deadline"], ex: "She always wants to meet a deadline.", office: "Meeting deadlines is non-negotiable.", interview: "I have a 100% record of meeting deadlines.", biz: "Meeting deadlines builds client trust." },
  { word: "take responsibility", pos: "phrase", hindi: "जिम्मेदारी लेना", simple: "to accept accountability for something", ipa: "/teɪk rɪˌspɒnsɪˈbɪlɪti/", syn: ["own up", "be accountable", "step up"], ant: ["blame others", "avoid responsibility"], ex: "He wants to take responsibility.", office: "Take responsibility for your tasks.", interview: "I take responsibility for my decisions.", biz: "Leaders must take responsibility for results." },
  { word: "solve a problem", pos: "phrase", hindi: "समस्या सुलझाना", simple: "to find a solution to a difficulty", ipa: "/sɒlv ə ˈprɒbləm/", syn: ["resolve an issue", "fix a problem", "address a challenge"], ant: [], ex: "He wants to solve a problem.", office: "We need someone who can solve a problem quickly.", interview: "I am good at solving a problem under pressure.", biz: "Our product helps businesses solve a problem efficiently." },
  { word: "add value", pos: "phrase", hindi: "मूल्य जोड़ना / फायदेमंद होना", simple: "to make something better or more useful", ipa: "/æd ˈvæljuː/", syn: ["contribute", "enhance", "improve"], ant: ["subtract value", "hinder"], ex: "She wants to add value to her team.", office: "Every employee should add value.", interview: "I want to add value from day one.", biz: "Our service adds value to your business." },
  { word: "work under pressure", pos: "phrase", hindi: "दबाव में काम करना", simple: "to perform well when there is stress or urgency", ipa: "/wɜːrk ˌʌndər ˈpreʃər/", syn: ["perform under stress", "handle pressure", "stay calm"], ant: [], ex: "He can work under pressure.", office: "We sometimes need to work under pressure.", interview: "I work under pressure very effectively.", biz: "Teams that work under pressure stay competitive." },
  { word: "reach a target", pos: "phrase", hindi: "लक्ष्य हासिल करना", simple: "to achieve a set goal", ipa: "/riːtʃ ə ˈtɑːrɡɪt/", syn: ["hit a goal", "achieve a target", "meet a target"], ant: ["miss a target"], ex: "He wants to reach a target every month.", office: "The team wants to reach a target of 100 units.", interview: "I consistently reach a target on time.", biz: "Every sales team wants to reach a target." },
  { word: "make a plan", pos: "phrase", hindi: "योजना बनाना", simple: "to decide what steps to take", ipa: "/meɪk ə plæn/", syn: ["plan ahead", "strategize", "prepare"], ant: ["improvise", "act randomly"], ex: "Let's make a plan for the trip.", office: "We need to make a plan for Q4.", interview: "I make a plan before starting any project.", biz: "Always make a plan before entering a new market." },
];

// Remove duplicates by word
const seenWords = new Set();
const cleanVocab = [];
for (const v of vocabularyData) {
  if (!seenWords.has(v.word.toLowerCase())) {
    seenWords.add(v.word.toLowerCase());
    cleanVocab.push(v);
  }
}

// Build 500 vocab entries: use our curated list + generated filler to reach 500
const extraWords = [
  // More nouns
  ["appointment","noun","अपॉइंटमेंट / भेंट का समय","a prearranged meeting","/əˈpɔɪntmənt/",["meeting","engagement","booking"],["cancellation"],"She wants an appointment with the doctor.","Book an appointment with the client.","I have an interview appointment at ten.","We scheduled a business appointment."],
  ["assignment","noun","कार्य / काम सौंपना","a task given to someone","/əˈsaɪnmənt/",["task","project","duty"],[],"He wants a new assignment.","She finished the assignment early.","I thrive when given challenging assignments.","The client gave us a new assignment."],
  ["colleague","noun","सहकर्मी / साथी","someone you work with","/ˈkɒliːɡ/",["coworker","associate","teammate"],["rival"],"She helps her colleague with work.","My colleague is very helpful.","I respect my colleagues' opinions.","Our colleagues in the partner firm are skilled."],
  ["complaint","noun","शिकायत","an expression of dissatisfaction","/kəmˈpleɪnt/",["grievance","objection","protest"],["compliment","praise"],"He wants to file a complaint.","Handle complaints professionally.","I resolve client complaints efficiently.","Customer complaints must be addressed within 24 hours."],
  ["conference","noun","सम्मेलन / कॉन्फ्रेंस","a large formal meeting","/ˈkɒnfərəns/",["summit","seminar","convention"],[],"She wants to attend the conference.","The annual conference is in March.","I presented at the national conference.","The business conference attracted 500 attendees."],
  ["connection","noun","संबंध / जुड़ाव","a relationship or link","/kəˈnekʃən/",["link","bond","relationship"],["disconnection","separation"],"He wants a strong professional connection.","Good connections lead to better opportunities.","I made valuable connections at the event.","Business connections open new doors."],
  ["contribution","noun","योगदान","something given to help","/ˌkɒntrɪˈbjuːʃən/",["input","donation","addition"],[],"She wants to make a valuable contribution.","Acknowledge everyone's contribution.","My contribution helped the team win.","Every department's contribution matters."],
  ["conversation","noun","बातचीत / संवाद","an informal talk between people","/ˌkɒnvəˈseɪʃən/",["dialogue","discussion","chat"],["silence","monologue"],"I want to have a good conversation.","Start every meeting with a brief conversation.","I had a great conversation with the manager.","Business conversations should stay professional."],
  ["education","noun","शिक्षा","the process of learning","/ˌedʒuˈkeɪʃən/",["learning","schooling","training"],["ignorance"],"She wants a good education.","Education opens many doors.","My education is in computer science.","Companies invest in employee education."],
  ["employee","noun","कर्मचारी","a person who works for a company","/ɪmˈplɔɪiː/",["worker","staff member","team member"],["employer","boss"],"He is a dedicated employee.","Employees deserve fair treatment.","As an employee, I gave my best.","Happy employees produce better results."],
  ["employer","noun","नियोक्ता / मालिक","a person or organization that employs people","/ɪmˈplɔɪər/",["boss","manager","organization"],["employee","worker"],"She wants a supportive employer.","A good employer values their staff.","My employer trusts me with key tasks.","Employers want responsible candidates."],
  ["engagement","noun","सहभागिता / जुड़ाव","involvement or commitment","/ɪnˈɡeɪdʒmənt/",["involvement","participation","commitment"],["disengagement"],"He wants high employee engagement.","Team engagement drives productivity.","I improved employee engagement by 30%.","Customer engagement is key to brand loyalty."],
  ["expertise","noun","विशेषज्ञता / दक्षता","specialized skill or knowledge","/ˌekspɜːˈtiːz/",["skill","knowledge","proficiency"],["ignorance","inexperience"],"She has expertise in digital marketing.","His expertise adds value to the team.","My expertise is in financial analysis.","We need expertise in cloud computing."],
  ["facility","noun","सुविधा / स्थान","a place or service provided","/fəˈsɪlɪti/",["resource","service","infrastructure"],[],"She wants a better facility.","The office facility is well-equipped.","The training facility is modern.","The business facility serves 200 clients daily."],
  ["finance","noun","वित्त / पैसा","money and its management","/ˈfaɪnæns/",["money","funds","capital"],[],"He wants to study finance.","Finance is managed by the CFO.","I have a degree in finance.","Sound finance is the base of any business."],
  ["guidance","noun","मार्गदर्शन / सलाह","advice or help to make decisions","/ˈɡaɪdəns/",["advice","direction","counseling"],["confusion","misdirection"],"She wants guidance from her mentor.","Seek guidance before making big decisions.","I sought guidance from senior managers.","Good guidance helps teams stay focused."],
  ["habit","noun","आदत","a regular tendency or practice","/ˈhæbɪt/",["routine","practice","custom"],[],"He wants to build good habits.","Good habits lead to consistent performance.","Reading is my most productive habit.","Building healthy habits improves productivity."],
  ["health","noun","स्वास्थ्य","the state of the body and mind","/helθ/",["wellness","fitness","wellbeing"],["illness","sickness"],"She wants to improve her health.","Good health is essential for productivity.","Mental health is as important as physical health.","Companies want to support employee health."],
  ["income","noun","आमदनी / आय","money received from work or business","/ˈɪnkʌm/",["earnings","revenue","pay"],["expense","loss"],"He wants a steady income.","A good income allows financial freedom.","My income has grown every year.","Multiple income streams reduce financial risk."],
  ["information","noun","जानकारी / सूचना","facts or knowledge about something","/ˌɪnfəˈmeɪʃən/",["data","knowledge","details"],["ignorance"],"She wants more information.","Please share all relevant information.","I gathered information before the meeting.","Accurate information is vital in business."],
  ["interest","noun","रुचि / ब्याज","a desire to learn or enjoy something","/ˈɪntrɪst/",["curiosity","enthusiasm","hobby"],["boredom","indifference"],"He has an interest in technology.","Show interest in every task.","My interest is in software development.","Client interest must be maintained."],
  ["investment","noun","निवेश","money put into something for future gain","/ɪnˈvestmənt/",["funding","capital","contribution"],["withdrawal","loss"],"She wants a good investment.","Real estate is a safe investment.","I recommended a new investment strategy.","Technology investment drives business growth."],
  ["journey","noun","सफर / यात्रा","travel from one place to another; a process","/ˈdʒɜːrni/",["trip","travel","path"],["destination","end"],"He wants the journey to be smooth.","Every journey starts with one step.","My career journey has been rewarding.","The business journey has many ups and downs."],
  ["language","noun","भाषा","a system of communication","/ˈlæŋɡwɪdʒ/",["tongue","speech","dialect"],[],"She wants to learn a new language.","English is the global language of business.","Language skills are valued in every role.","Clear language in contracts prevents disputes."],
  ["leadership","noun","नेतृत्व","the act of guiding a group","/ˈliːdəʃɪp/",["guidance","management","authority"],["followership"],"He wants strong leadership skills.","Leadership training is offered.","I demonstrated leadership in my last role.","Strong leadership drives company culture."],
  ["mindset","noun","मानसिकता / सोच","a way of thinking","/ˈmaɪndset/",["attitude","outlook","perspective"],[],"She wants a growth mindset.","A positive mindset drives success.","A growth mindset is valued here.","Business success starts with the right mindset."],
  ["motivation","noun","प्रेरणा / उत्साह","the reason for doing something","/ˌməʊtɪˈveɪʃən/",["drive","inspiration","incentive"],["demotivation","apathy"],"He needs more motivation.","Motivation keeps teams productive.","My motivation is continuous self-improvement.","Employee motivation drives performance."],
  ["network","noun","नेटवर्क / संजाल","a group of connected people or things","/ˈnetwɜːrk/",["connections","contacts","system"],[],"She wants to build a strong network.","A professional network opens opportunities.","I built a strong network at the event.","A business network spans multiple cities."],
  ["objective","noun","उद्देश्य / लक्ष्य","something you are trying to do","/əbˈdʒektɪv/",["goal","aim","target"],[],"He wants a clear objective.","Set measurable objectives for each project.","My career objective is leadership.","Business objectives must align with strategy."],
  ["patience","noun","धैर्य / सब्र","the ability to wait calmly","/ˈpeɪʃəns/",["tolerance","endurance","calmness"],["impatience","restlessness"],"She has a lot of patience.","Patience is a virtue in negotiations.","Patience helped me handle difficult clients.","Business success requires patience."],
  ["potential","noun","संभावना / क्षमता","ability that may be developed","/pəˈtenʃəl/",["capability","promise","talent"],["limitation","weakness"],"He wants to reach his full potential.","The team has great potential.","I have the potential to lead projects.","The product has huge market potential."],
  ["priority","noun","प्राथमिकता","the most important thing first","/praɪˈɒrɪti/",["importance","urgency","precedence"],["minor concern","triviality"],"She sets her priority carefully.","Customer satisfaction is our top priority.","My priority is delivering quality work.","Set priorities before starting a project."],
  ["process","noun","प्रक्रिया","a series of actions to achieve something","/ˈprəʊses/",["procedure","method","system"],[],"He wants to improve the process.","Follow the standard process.","I streamlined the review process.","A clear process reduces errors."],
  ["purpose","noun","उद्देश्य / कारण","the reason for doing something","/ˈpɜːrpəs/",["aim","goal","intention"],["aimlessness","pointlessness"],"She works with a clear purpose.","Every action should have a purpose.","My purpose is to help others grow.","A business needs a clear purpose."],
  ["recognition","noun","पहचान / प्रशंसा","praise or acknowledgment of achievement","/ˌrekəɡˈnɪʃən/",["acknowledgment","appreciation","credit"],["neglect","ignorance"],"He wants recognition for his work.","Recognition boosts employee morale.","I received recognition for innovation.","Public recognition encourages teams."],
  ["relationship","noun","संबंध / रिश्ता","a connection between people","/rɪˈleɪʃənʃɪp/",["bond","connection","association"],["estrangement","conflict"],"She wants a good working relationship.","Build strong relationships with clients.","I maintain professional relationships.","Long-term relationships drive business."],
  ["resource","noun","संसाधन","materials, people, or money available","/rɪˈsɔːrs/",["asset","tool","supply"],["waste","deficit"],"He wants more resources.","Allocate resources wisely.","I managed limited resources effectively.","Optimize resources for maximum output."],
  ["review","noun","समीक्षा / जाँच","an examination of something","/rɪˈvjuː/",["assessment","evaluation","check"],[],"She wants a performance review.","Conduct reviews quarterly.","I prepared well for my annual review.","Client reviews help improve services."],
  ["risk","noun","जोखिम / खतरा","the possibility of something bad happening","/rɪsk/",["danger","hazard","uncertainty"],["safety","security"],"He wants to minimize risk.","Every business involves some risk.","I assess risk before making decisions.","Diversification reduces business risk."],
  ["schedule","noun","कार्यक्रम / समय-सारणी","a plan of times for activities","/ˈʃedjuːl/",["timetable","plan","agenda"],[],"She wants a flexible schedule.","Follow the project schedule strictly.","My schedule is fully booked this week.","Stick to the delivery schedule."],
  ["strength","noun","शक्ति / ताकत","a quality that makes someone good at something","/streŋθ/",["ability","asset","forte"],["weakness","flaw"],"His strength is problem-solving.","Identify your strengths and use them.","My main strength is analytical thinking.","Use company strengths to win contracts."],
  ["support","noun","सहायता / समर्थन","help given to someone","/səˈpɔːrt/",["assistance","help","backing"],["opposition","hindrance"],"She wants emotional support.","Management support is crucial.","I offered support during the critical phase.","Post-sale support builds loyalty."],
  ["talent","noun","प्रतिभा / हुनर","a natural ability to do something well","/ˈtælɪnt/",["gift","skill","aptitude"],["weakness","inability"],"She has a great talent for writing.","Develop your talent consistently.","I identify and mentor new talent.","Retaining talent is a business priority."],
  ["task","noun","काम / कार्य","a piece of work to be done","/tɑːsk/",["assignment","job","duty"],[],"He wants to complete his task.","Assign tasks clearly in the meeting.","I prioritize tasks by urgency.","Complete every task on time."],
  ["technology","noun","तकनीक / प्रौद्योगिकी","the use of scientific knowledge for practical purposes","/tekˈnɒlədʒi/",["tech","innovation","system"],[],"She wants to use new technology.","Technology speeds up our processes.","I have expertise in emerging technology.","Technology investment drives growth."],
  ["trust","noun","विश्वास / भरोसा","a firm belief in someone","/trʌst/",["faith","confidence","reliance"],["distrust","suspicion"],"He wants to build trust.","Trust is the foundation of teamwork.","I built trust with my clients quickly.","Customer trust is the biggest asset."],
  ["value","noun","मूल्य / मूल्यांकन","the importance or worth of something","/ˈvæljuː/",["worth","merit","benefit"],["worthlessness","insignificance"],"She sees value in every task.","Add value to every interaction.","I bring value through my expertise.","Demonstrate your product's value to clients."],
  ["vision","noun","दृष्टि / दूरदर्शिता","a clear idea of what you want in the future","/ˈvɪʒən/",["goal","dream","aspiration"],["short-sightedness"],"He has a clear vision for his career.","The company vision inspires the team.","My vision is to lead a tech startup.","A shared vision aligns team efforts."],
  ["weakness","noun","कमज़ोरी","a lack of strength or ability","/ˈwiːknəs/",["flaw","limitation","shortcoming"],["strength","asset"],"She wants to overcome her weakness.","Know your weakness and work on it.","My weakness is public speaking, but I am improving.","Addressing weaknesses prevents business failures."],
  ["workplace","noun","कार्यस्थल","the location where people work","/ˈwɜːrkpleɪs/",["office","job site","workspace"],[],"She wants a friendly workplace.","A healthy workplace improves output.","I maintain positivity in the workplace.","A good workplace culture attracts talent."],
  // More verbs to reach 500 total
  ["accomplish","verb","पूरा करना / हासिल करना","to succeed in doing something","/əˈkɒmplɪʃ/",["achieve","complete","fulfill"],["fail","abandon"],"She wants to accomplish her goals.","We want to accomplish this by December.","I want to accomplish great things here.","We accomplish more by working together."],
  ["adapt","verb","अनुकूलित होना / खुद को ढालना","to change in order to fit a new situation","/əˈdæpt/",["adjust","modify","conform"],["resist","reject"],"He wants to adapt quickly.","Adapt your approach to each client.","I adapt quickly to new environments.","Businesses must adapt to market changes."],
  ["address","verb","संबोधित करना / हल करना","to speak to someone or deal with an issue","/əˈdres/",["speak to","handle","tackle"],["ignore","avoid"],"She wants to address the issue.","Address client concerns quickly.","I address grievances professionally.","Address the root cause, not the symptom."],
  ["analyze","verb","विश्लेषण करना","to examine something in detail","/ˈænəlaɪz/",["examine","study","evaluate"],["overlook","ignore"],"He wants to analyze the data.","Analyze results before making changes.","I analyze market trends carefully.","Analyze customer data to find insights."],
  ["arrange","verb","व्यवस्था करना","to plan or organize something","/əˈreɪndʒ/",["organize","plan","set up"],["disrupt","cancel"],"She wants to arrange a meeting.","Arrange the files in order.","I arranged the client visit.","Arrange logistics well in advance."],
  ["assist","verb","सहायता करना / मदद करना","to help someone","/əˈsɪst/",["help","support","aid"],["hinder","obstruct"],"He wants to assist the new team member.","Assist colleagues when needed.","I want to assist in this project.","Our product assists businesses in scaling."],
  ["clarify","verb","स्पष्ट करना","to make something clearer","/ˈklærɪfaɪ/",["explain","specify","elaborate"],["confuse","obscure"],"She wants to clarify her role.","Please clarify the instructions.","I clarify doubts in every meeting.","Clarify terms before signing contracts."],
  ["confirm","verb","पुष्टि करना","to state that something is true or final","/kənˈfɜːrm/",["verify","validate","affirm"],["deny","cancel"],"He wants to confirm the booking.","Confirm all details in writing.","I confirmed the interview time via email.","Confirm order details before dispatch."],
  ["connect","verb","जोड़ना / जुड़ना","to join or link things or people together","/kəˈnekt/",["link","join","associate"],["disconnect","separate"],"She wants to connect with experts.","Connect with your colleagues regularly.","I connected with a mentor at the event.","Connect with potential clients on LinkedIn."],
  ["contribute","verb","योगदान देना","to give or add something","/kənˈtrɪbjuːt/",["give","add","donate"],["take","subtract"],"He wants to contribute to the team.","Contribute ideas in brainstorming.","I want to contribute from my first day.","Contribute to industry events and panels."],
  ["coordinate","verb","समन्वय करना","to organize people or things to work together","/kəʊˈɔːrdɪneɪt/",["organize","arrange","manage"],["disrupt","scatter"],"She wants to coordinate the event.","Coordinate with all departments.","I coordinated a team of fifteen people.","Coordinate supply chain operations effectively."],
  ["demonstrate","verb","प्रदर्शित करना / दिखाना","to show clearly","/ˈdemənstreɪt/",["show","prove","exhibit"],["hide","conceal"],"He wants to demonstrate his skills.","Demonstrate your process step by step.","I demonstrated strong results.","Demonstrate your product's benefits to buyers."],
  ["evaluate","verb","मूल्यांकन करना","to judge or assess something","/ɪˈvæljueɪt/",["assess","judge","measure"],["ignore","overlook"],"She wants to evaluate her progress.","Evaluate each option before deciding.","I evaluate team performance monthly.","Evaluate ROI before investing."],
  ["expand","verb","विस्तार करना / फैलाना","to become larger or more extensive","/ɪkˈspænd/",["grow", "enlarge","extend"],["shrink","reduce"],"He wants to expand his business.","We want to expand into new regions.","I helped expand the client base by 40%.","We want to expand our product portfolio."],
  ["improve","verb","बेहतर बनाना","to make better","/ɪmˈpruːv/",["enhance","upgrade","develop"],["worsen","decline"],"She wants to improve her skills.","Improve your pitch before the call.","I improved my communication skills significantly.","Improve customer service to reduce churn."],
  ["implement","verb","लागू करना","to put a plan into action","/ˈɪmplɪment/",["execute","apply","carry out"],["ignore","abandon"],"He wants to implement the plan.","Implement the strategy from next week.","I implemented a new tracking system.","Implement data-driven decisions quickly."],
  ["inspire","verb","प्रेरित करना","to motivate or excite someone","/ɪnˈspaɪər/",["motivate","encourage","energize"],["discourage","demotivate"],"She wants to inspire her team.","Great leaders inspire those around them.","I want to inspire junior team members.","Inspiring products create passionate users."],
  ["measure","verb","मापना / आँकना","to find the size or extent of something","/ˈmeʒər/",["assess","gauge","quantify"],["guess","estimate"],"He wants to measure progress.","Measure success by clear metrics.","I measure performance weekly.","Measure customer satisfaction regularly."],
  ["mentor","verb","मार्गदर्शन देना / सिखाना","to guide and advise someone less experienced","/ˈmentɔːr/",["guide","coach","advise"],["mislead","ignore"],"She wants to mentor new employees.","Ask a senior colleague to mentor you.","I want to mentor others in my field.","Companies mentor employees to grow faster."],
  ["monitor","verb","निगरानी करना / देखरेख करना","to observe and check something over time","/ˈmɒnɪtər/",["track","observe","supervise"],["ignore","neglect"],"He wants to monitor results.","Monitor project progress daily.","I monitor team KPIs every week.","Monitor market trends for early signals."],
  ["motivate","verb","प्रेरित करना","to give someone a reason or desire to act","/ˈməʊtɪveɪt/",["inspire","encourage","drive"],["demotivate","discourage"],"She wants to motivate her colleagues.","Motivate your team with recognition.","I want to motivate others to grow.","Leaders motivate teams toward the goal."],
  ["overcome","verb","पार करना / जीतना","to succeed in dealing with a problem","/ˌəʊvəˈkʌm/",["conquer","defeat","beat"],["surrender","give in"],"He wants to overcome challenges.","Overcome obstacles with persistence.","I overcome setbacks with a positive attitude.","Overcome market resistance with strong value."],
  ["perform","verb","प्रदर्शन करना / काम करना","to carry out a task or activity","/pəˈfɔːrm/",["execute","do","accomplish"],["fail","neglect"],"She wants to perform well.","Perform your duties with dedication.","I perform best under clear guidance.","Teams that perform well earn recognition."],
  ["prepare","verb","तैयारी करना","to make ready for something","/prɪˈpeər/",["plan","get ready","arrange"],["neglect","improvise"],"He wants to prepare for the interview.","Prepare all documents before the meeting.","I prepare thoroughly for every presentation.","Prepare your team for seasonal demand."],
  ["prioritize","verb","प्राथमिकता देना","to arrange tasks by importance","/praɪˈɒrɪtaɪz/",["rank","order","focus on"],["ignore","delay"],"She wants to prioritize her work.","Prioritize tasks by deadline and impact.","I prioritize high-value activities.","Prioritize customer needs in every decision."],
  ["research","verb","शोध करना / जानकारी जुटाना","to study a topic carefully","/rɪˈsɜːrtʃ/",["investigate","study","examine"],["ignore","assume"],"He wants to research the topic.","Research the market before launching.","I research every industry I work in.","Research competitors before pricing."],
  ["resolve","verb","सुलझाना / समाधान करना","to settle a dispute or find a solution","/rɪˈzɒlv/",["solve","fix","settle"],["complicate","worsen"],"She wants to resolve the conflict.","Resolve issues before escalating.","I resolve complaints within 24 hours.","Resolve contract disputes amicably."],
  ["schedule","verb","अनुसूचित करना / समय निर्धारित करना","to plan something for a certain time","/ˈʃedjuːl/",["plan","arrange","book"],["cancel","postpone"],"He wants to schedule a meeting.","Schedule tasks in the project calendar.","I scheduled the client demo for Friday.","Schedule product launches carefully."],
  ["simplify","verb","सरल बनाना","to make easier to understand","/ˈsɪmplɪfaɪ/",["streamline","clarify","reduce"],["complicate","confuse"],"She wants to simplify the process.","Simplify your message for the audience.","I simplify complex data for stakeholders.","Simplify the buying process for customers."],
  ["strengthen","verb","मज़बूत करना","to make stronger","/ˈstreŋθən/",["reinforce","boost","build up"],["weaken","undermine"],"He wants to strengthen his skills.","Strengthen team bonds through activities.","I strengthened my analytical skills.","Strengthen your supply chain for resilience."],
  ["submit","verb","जमा करना / प्रस्तुत करना","to hand in or present for review","/səbˈmɪt/",["hand in","present","send"],["withhold","retain"],"She wants to submit the form.","Submit all reports by end of day.","I submitted my proposal on time.","Submit invoices on the first of each month."],
  ["understand","verb","समझना","to know the meaning or nature of something","/ˌʌndəˈstænd/",["comprehend","grasp","realize"],["misunderstand","confuse"],"He wants to understand the concept.","Understand client needs before proposing.","I understand complex financial data.","Understand your market before scaling."],
  ["upgrade","verb","उन्नत करना / सुधारना","to improve or raise to a higher standard","/ˈʌpɡreɪd/",["improve","enhance","advance"],["downgrade","reduce"],"She wants to upgrade her skills.","Upgrade the software before deployment.","I want to upgrade my Excel skills.","Upgrade your infrastructure for better speed."],
  ["verify","verb","सत्यापित करना / जाँचना","to check that something is true","/ˈverɪfaɪ/",["confirm","check","validate"],["doubt","deny"],"He wants to verify the information.","Verify all facts before publishing.","I verify data accuracy in every report.","Verify supplier credentials before partnering."],
  ["volunteer","verb","स्वेच्छा से काम करना","to offer to do something without being paid","/ˌvɒlənˈtɪər/",["offer", "step up","contribute"],["refuse","withdraw"],"She wants to volunteer for the project.","Volunteer for additional responsibilities.","I volunteered to lead the new initiative.","Volunteer for CSR activities to build goodwill."],
  // More adjectives to top up to 500
  ["adaptable","adjective","लचीला / अनुकूलनशील","able to adjust to new situations","/əˈdæptəbl/",["flexible","versatile","adjustable"],["rigid","inflexible"],"She is adaptable to any role.","Adaptable employees handle change well.","I am adaptable and learn fast.","Adaptable businesses survive market shifts."],
  ["analytical","adjective","विश्लेषणात्मक","relating to careful examination of facts","/ˌænəˈlɪtɪkəl/",["logical","systematic","methodical"],["intuitive","random"],"He has an analytical mind.","Analytical skills are valued here.","I have strong analytical abilities.","Analytical thinking drives better decisions."],
  ["assertive","adjective","आत्मविश्वास से अपनी बात कहने वाला","confident and direct in expressing opinions","/əˈsɜːrtɪv/",["confident","direct","bold"],["passive","hesitant"],"She is assertive in meetings.","Be assertive but respectful.","I am assertive when sharing my views.","Assertive communication closes deals faster."],
  ["attentive","adjective","ध्यान देने वाला / सचेत","paying close attention","/əˈtentɪv/",["alert","observant","focused"],["inattentive","distracted"],"He is attentive to detail.","Be attentive during training.","I am attentive to client feedback.","Attentive service delights customers."],
  ["capable","adjective","सक्षम / काबिल","having the ability to do something","/ˈkeɪpəbəl/",["able","competent","skilled"],["incapable","unable"],"She is capable of great work.","We are looking for capable candidates.","I am fully capable of leading this project.","A capable team delivers consistently."],
  ["committed","adjective","प्रतिबद्ध / समर्पित","dedicated to a cause or goal","/kəˈmɪtɪd/",["dedicated","devoted","loyal"],["uncommitted","indifferent"],"He is committed to his work.","Committed employees stay longer.","I am fully committed to this role.","Committed partners build lasting relationships."],
  ["courageous","adjective","साहसी / निडर","willing to face danger or difficulty","/kəˈreɪdʒəs/",["brave","bold","fearless"],["cowardly","fearful"],"She is courageous in her decisions.","Courageous leaders make bold choices.","I am courageous in facing challenges.","Courageous entrepreneurs enter tough markets."],
  ["diligent","adjective","परिश्रमी / मेहनती","careful and persistent in work","/ˈdɪlɪdʒənt/",["hardworking","thorough","attentive"],["lazy","careless"],"He is a diligent worker.","Diligent employees deliver quality results.","I am diligent and thorough in everything.","Diligent processes reduce errors."],
  ["dynamic","adjective","गतिशील / ऊर्जावान","energetic, active, and constantly changing","/daɪˈnæmɪk/",["energetic","vibrant","active"],["static","dull"],"She is dynamic and energetic.","We want dynamic team members.","I am dynamic and adapt quickly.","Dynamic companies innovate continuously."],
  ["empathetic","adjective","सहानुभूतिपूर्ण / दूसरे की भावनाएँ समझने वाला","able to understand others' feelings","/emˈpæθɪtɪk/",["understanding","compassionate","considerate"],["indifferent","callous"],"He is empathetic with his team.","Empathetic leaders build loyal teams.","I am empathetic with clients.","Empathetic service creates emotional bonds."],
  ["energetic","adjective","ऊर्जावान / स्फूर्तिवान","having a lot of energy","/ˌenəˈdʒetɪk/",["active","lively","vibrant"],["tired","lethargic"],"She is energetic and enthusiastic.","Energetic employees inspire the team.","I am energetic even in long shifts.","Energetic sales teams close more deals."],
  ["ethical","adjective","नैतिक","following moral principles","/ˈeθɪkəl/",["moral","principled","righteous"],["unethical","dishonest"],"He is ethical in all his decisions.","Ethical behavior is non-negotiable.","I am ethical and transparent.","Ethical companies build lasting trust."],
  ["focused","adjective","केंद्रित / ध्यान लगाया हुआ","concentrating on one thing","/ˈfəʊkəst/",["concentrated","attentive","determined"],["distracted","scattered"],"She is focused on her goals.","Stay focused during the presentation.","I am focused and goal-driven.","Focused teams achieve targets faster."],
  ["grateful","adjective","आभारी / कृतज्ञ","feeling thankful","/ˈɡreɪtfʊl/",["thankful","appreciative","obliged"],["ungrateful","indifferent"],"He is grateful for the opportunity.","Be grateful for constructive feedback.","I am grateful for the guidance I received.","Grateful customers leave positive reviews."],
  ["impactful","adjective","प्रभावशाली","having a strong effect","/ˈɪmpæktfʊl/",["influential","effective","powerful"],["ineffective","weak"],"Her presentation was impactful.","Make your introduction impactful.","I want to deliver impactful results.","Impactful branding stays in customers' minds."],
  ["inclusive","adjective","समावेशी / सबको शामिल करने वाला","welcoming and including everyone","/ɪnˈkluːsɪv/",["welcoming","diverse","open"],["exclusive","biased"],"She promotes an inclusive culture.","Build an inclusive workplace.","I foster inclusive team dynamics.","Inclusive hiring improves team diversity."],
  ["insightful","adjective","अंतर्दृष्टिपूर्ण / गहरी समझ वाला","having a deep understanding","/ˈɪnsaɪtfʊl/",["perceptive","sharp","astute"],["shallow","naive"],"He gave insightful feedback.","Share insightful observations in meetings.","I am insightful about market trends.","Insightful analysis wins client trust."],
  ["meticulous","adjective","बारीकी से काम करने वाला / सूक्ष्म","very careful about details","/mɪˈtɪkjʊləs/",["precise","thorough","careful"],["careless","sloppy"],"She is meticulous in her work.","Meticulous work avoids costly errors.","I am meticulous in financial reporting.","Meticulous quality control ensures consistency."],
  ["open-minded","adjective","खुले विचारों वाला / व्यापक दृष्टि","willing to consider new ideas","/ˈəʊpən ˌmaɪndɪd/",["receptive","flexible","tolerant"],["narrow-minded","rigid"],"He is open-minded about new methods.","Stay open-minded in brainstorming.","I am open-minded to feedback.","Open-minded leaders drive innovation."],
  ["resilient","adjective","दृढ़ / जल्दी उबरने वाला","able to recover quickly from difficulties","/rɪˈzɪlɪənt/",["tough","strong","adaptable"],["fragile","weak"],"She is resilient and strong.","Resilient teams bounce back from setbacks.","I am resilient and stay positive.","Resilient businesses survive economic downturns."],
  ["resourceful","adjective","साधन-संपन्न / उपायशील","able to find clever solutions with what is available","/rɪˈsɔːrsfʊl/",["inventive","creative","capable"],["helpless","dependent"],"He is resourceful in tough situations.","Resourceful employees find solutions fast.","I am resourceful and think on my feet.","Resourceful companies pivot quickly."],
  ["strategic","adjective","रणनीतिक / दूरदर्शी","relating to long-term planning","/strəˈtiːdʒɪk/",["planned","calculated","tactical"],["spontaneous","random"],"She is a strategic thinker.","Strategic hiring improves team quality.","I am strategic about career growth.","Strategic decisions protect market share."],
  ["tenacious","adjective","दृढ़ / अड़ियल न होते हुए लक्ष्य का पीछा करने वाला","persistent and not giving up easily","/tɪˈneɪʃəs/",["persistent","determined","stubborn"],["weak","giving up"],"He is tenacious in pursuing goals.","Tenacious employees overcome any obstacle.","I am tenacious and do not give up easily.","Tenacious founders build great companies."],
  ["thoughtful","adjective","विचारशील / सुविचारित","carefully considering others or thinking things through","/ˈθɔːtfʊl/",["considerate","reflective","caring"],["thoughtless","careless"],"She is thoughtful in her decisions.","Thoughtful feedback helps people grow.","I am thoughtful and empathetic.","Thoughtful leadership retains top talent."],
  ["versatile","adjective","बहुमुखी / अनेक कामों में निपुण","able to do many different things","/ˈvɜːrsətaɪl/",["adaptable","flexible","multi-skilled"],["limited","specialized"],"He is versatile and multi-talented.","Versatile employees are very valuable.","I am versatile and can handle multiple roles.","Versatile products appeal to wider markets."],
  // Adverbs
  ["appropriately","adverb","उचित रूप से","in a suitable or correct way","/əˈprəʊprɪɪtli/",["suitably","properly","correctly"],["inappropriately","wrongly"],"She dresses appropriately for interviews.","Respond appropriately in every situation.","I communicate appropriately in formal meetings.","Price products appropriately for the market."],
  ["collaboratively","adverb","मिलकर / सहयोग से","by working together","/kəˈlæbərətɪvli/",["together","jointly","cooperatively"],["alone","independently"],"He works collaboratively.","Work collaboratively to solve problems.","I work collaboratively across teams.","Collaboratively crafted strategies succeed."],
  ["constructively","adverb","रचनात्मक रूप से","in a useful and helpful way","/kənˈstrʌktɪvli/",["helpfully","productively","positively"],["destructively","negatively"],"She gives feedback constructively.","Address issues constructively.","I handle criticism constructively.","Use failures constructively to learn."],
  ["creatively","adverb","रचनात्मक रूप से","in an imaginative or original way","/kriˈeɪtɪvli/",["imaginatively","originally","inventively"],["conventionally","boringly"],"He thinks creatively.","Approach problems creatively.","I solve challenges creatively.","Market your product creatively."],
  ["efficiently","adverb","कुशलतापूर्वक / दक्षता से","in a well-organized way without waste","/ɪˈfɪʃəntli/",["productively","effectively","smoothly"],["inefficiently","wastefully"],"She works efficiently.","Manage time efficiently.","I complete tasks efficiently.","Run operations efficiently to cut costs."],
  ["independently","adverb","स्वतंत्र रूप से","without needing help from others","/ˌɪndɪˈpendəntli/",["autonomously","on one's own","self-reliantly"],["dependently"],"He works independently.","Work independently when needed.","I work independently on assignments.","Subsidiaries operate independently."],
  ["innovatively","adverb","नवाचारपूर्ण ढंग से","in a creative, new way","/ˈɪnəveɪtɪvli/",["creatively","originally","freshly"],["conventionally"],"She thinks innovatively.","Approach every challenge innovatively.","I solve problems innovatively.","Market your brand innovatively."],
  ["proactively","adverb","पहल करते हुए","by anticipating needs and acting in advance","/ˌprəʊˈæktɪvli/",["anticipatorily","in advance","early"],["reactively","passively"],"He proactively identifies risks.","Act proactively to prevent issues.","I proactively raise concerns.","Proactively reach out to potential clients."],
  ["strategically","adverb","रणनीतिक रूप से","in a way that serves a long-term plan","/strəˈtiːdʒɪkli/",["tactically","calculatedly","deliberately"],["randomly","carelessly"],"She thinks strategically.","Allocate resources strategically.","I make decisions strategically.","Position your brand strategically."],
  ["successfully","adverb","सफलतापूर्वक","in a way that achieves the desired result","/səkˈsesfʊli/",["effectively","victoriously","prosperously"],["unsuccessfully","poorly"],"He completed the project successfully.","Deliver every task successfully.","I want to complete this successfully.","Launch products successfully with strong planning."],
  // More phrases
  ["be in charge","phrase","प्रभारी होना / ज़िम्मेदार होना","to be responsible for managing something","/biː ɪn tʃɑːrdʒ/",["be responsible","lead","manage"],[],"She wants to be in charge of the project.","Who is in charge of this task?","I want to be in charge of my department.","The CEO is in charge of all decisions."],
  ["follow up","phrase","पीछा करना / अनुसरण करना","to check on something done previously","/ˈfɒləʊ ʌp/",["check in","revisit","pursue"],["ignore","drop"],"He wants to follow up on the proposal.","Follow up with clients after meetings.","I always follow up after interviews.","Follow up on all pending invoices."],
  ["give feedback","phrase","प्रतिक्रिया देना / सुझाव देना","to provide an evaluation of someone's work","/ɡɪv ˈfiːdbæk/",["review","comment","evaluate"],[],"She wants to give feedback honestly.","Give feedback to your team regularly.","I want to give feedback constructively.","Give feedback to suppliers on delivery quality."],
  ["make an impression","phrase","प्रभाव डालना / अच्छा असर करना","to create a memorable effect on someone","/meɪk ən ɪmˈpreʃən/",["impress","stand out","leave a mark"],[],"He wants to make an impression at the interview.","Make a strong impression in your first week.","I want to make a great impression.","Make an impression with a strong pitch."],
  ["set a goal","phrase","लक्ष्य निर्धारित करना","to decide on something you want to achieve","/set ə ɡəʊl/",["define a target","aim for","fix a target"],[],"She wants to set a goal for the year.","Set a goal at the start of every project.","I set a goal to complete three certifications.","Set a goal for every sales quarter."],
  ["stay focused","phrase","केंद्रित रहना / ध्यान बनाए रखना","to keep your attention on a task","/steɪ ˈfəʊkəst/",["concentrate","remain attentive","keep on track"],["lose focus","get distracted"],"He wants to stay focused on his studies.","Stay focused during long meetings.","I stay focused even under pressure.","Stay focused on your core product."],
  ["take action","phrase","कदम उठाना / काम करना","to do something to address a situation","/teɪk ˈækʃən/",["act","step up","respond"],["hesitate","delay"],"She wants to take action immediately.","Take action on the feedback received.","I take action to resolve problems quickly.","Take action on market insights promptly."],
  ["work as a team","phrase","टीम की तरह काम करना","to cooperate with others to achieve a goal","/wɜːrk æz ə tiːm/",["collaborate","cooperate","unite"],["work alone","compete"],"He wants to work as a team.","We always work as a team here.","I work as a team effectively.","Great companies work as a team."],
];

// Build final vocab array
const vocabFull = [...cleanVocab];
const seenW = new Set(vocabFull.map(v => v.word.toLowerCase()));

for (const e of extraWords) {
  const [word, pos, hindi, simple, ipa, syn, ant, ex, office, interview, biz] = e;
  if (!seenW.has(word.toLowerCase())) {
    seenW.add(word.toLowerCase());
    vocabFull.push({ word, pos, hindi, simple, ipa, syn, ant, ex, office, interview, biz });
  }
}

// If still under 500 fill with more common words
const fillWords = [
  ["abundance","noun","प्रचुरता","a very large quantity","/əˈbʌndəns/",["plenty","surplus","wealth"],["scarcity","lack"],"There is an abundance of opportunities.","An abundance of data helps decisions.","I offer an abundance of ideas.","The market has an abundance of demand."],
  ["affirmation","noun","पुष्टि / प्रोत्साहन","a statement that something is true","/ˌæfəˈmeɪʃən/",["confirmation","assertion","approval"],["denial","rejection"],"She needs daily affirmation.","Affirmation boosts morale.","Positive affirmation builds confidence.","Affirmation of partnership terms is required."],
  ["agenda","noun","एजेंडा / कार्यसूची","a list of items to be discussed","/əˈdʒendə/",["schedule","plan","program"],[],"He sent the meeting agenda.","Always prepare an agenda.","I prepare a clear agenda for every meeting.","Stick to the agenda during calls."],
  ["authority","noun","अधिकार / प्राधिकरण","the power to give orders","/ɔːˈθɒrɪti/",["power","control","command"],["submission","helplessness"],"She wants more authority.","Respect authority in the workplace.","I work with people of authority.","Give authority to team leads."],
  ["awareness","noun","जागरूकता","knowledge or understanding of something","/əˈweənəs/",["knowledge","understanding","consciousness"],["ignorance","unawareness"],"She wants to raise awareness.","Awareness of deadlines is essential.","I raise awareness of process gaps.","Brand awareness drives customer decisions."],
  ["balance","noun","संतुलन","a state of equal distribution","/ˈbæləns/",["equilibrium","stability","proportion"],["imbalance","extremity"],"He wants a work-life balance.","Maintain a good work-life balance.","Balance is key in a healthy career.","Balance cost and quality for best value."],
  ["benchmark","noun","मानदंड / बेंचमार्क","a standard used for comparison","/ˈbentʃmɑːrk/",["standard","reference","yardstick"],[],"She set a new benchmark.","Use industry benchmarks to measure success.","I set a high benchmark for my team.","Exceed industry benchmarks to stand out."],
  ["clarity","noun","स्पष्टता","the quality of being clear","/ˈklærɪti/",["clearness","precision","transparency"],["confusion","vagueness"],"He wants more clarity on the task.","Provide clarity in your instructions.","Clarity in communication prevents errors.","Clients appreciate clarity in proposals."],
  ["commitment","noun","प्रतिबद्धता","a promise to do something","/kəˈmɪtmənt/",["dedication","pledge","obligation"],["inconsistency","neglect"],"She shows strong commitment.","Commitment to quality is essential.","I demonstrate commitment in every role.","Long-term commitment builds client trust."],
  ["competence","noun","योग्यता / दक्षता","the ability to do something well","/ˈkɒmpɪtəns/",["skill","ability","proficiency"],["incompetence","inability"],"He demonstrates high competence.","Competence is more valuable than qualifications.","I prove my competence through results.","Technical competence is a key requirement."],
  ["consistency","noun","निरंतरता / एकरूपता","doing the same thing every time","/kənˈsɪstənsi/",["regularity","reliability","steadiness"],["inconsistency","variability"],"She values consistency.","Consistency leads to trust.","I maintain consistency in my work.","Consistency in quality builds brand reputation."],
  ["courage","noun","साहस / हिम्मत","the ability to face fear or difficulty","/ˈkɜːrɪdʒ/",["bravery","boldness","valor"],["cowardice","fear"],"He needs courage to face the challenge.","Courage helps in difficult decisions.","I showed courage by taking the new role.","Courage to innovate sets companies apart."],
  ["creativity","noun","रचनात्मकता","the use of imagination to make new things","/kriˌeɪˈtɪvɪti/",["imagination","ingenuity","originality"],["conventionality","dullness"],"She shows great creativity.","Creativity drives innovation.","My creativity shows in my problem-solving.","Creativity is highly valued here."],
  ["credibility","noun","विश्वसनीयता","the quality of being trusted","/ˌkredɪˈbɪlɪti/",["trustworthiness","reliability","reputation"],["doubt","distrust"],"He wants to build credibility.","Credibility is built over time.","My credibility comes from consistent delivery.","Credibility is the foundation of business."],
  ["curiosity","noun","जिज्ञासा","a strong desire to know or learn","/kjʊərɪˈɒsɪti/",["inquisitiveness","interest","eagerness"],["indifference","apathy"],"She has great curiosity.","Curiosity drives learning.","My curiosity helps me explore new areas.","Curiosity leads to business innovation."],
  ["discipline","noun","अनुशासन","training to obey rules and be orderly","/ˈdɪsɪplɪn/",["order","self-control","structure"],["chaos","disorder"],"He practices great discipline.","Discipline is key to success.","I maintain discipline in meeting deadlines.","Discipline separates good companies from great ones."],
  ["diversity","noun","विविधता","a variety of different people or things","/daɪˈvɜːrsɪti/",["variety","range","difference"],["uniformity","homogeneity"],"She supports diversity.","Diversity strengthens teams.","I champion diversity and inclusion.","Diversity drives innovation in companies."],
  ["empathy","noun","सहानुभूति","understanding and sharing the feelings of others","/ˈempəθi/",["compassion","understanding","sympathy"],["indifference","apathy"],"He shows empathy to his team.","Empathy improves teamwork.","Empathy helps me understand client needs.","Empathy-driven service delights customers."],
  ["excellence","noun","श्रेष्ठता / उत्कृष्टता","the quality of being very good","/ˈeksələns/",["brilliance","superiority","mastery"],["mediocrity","failure"],"She strives for excellence.","Excellence is our standard.","I pursue excellence in every task.","Excellence differentiates great brands."],
  ["fulfillment","noun","तृप्ति / पूर्णता","a feeling of satisfaction","/fʊlˈfɪlmənt/",["satisfaction","achievement","completion"],["dissatisfaction","emptiness"],"He wants a sense of fulfillment.","Find fulfillment in your daily work.","Career fulfillment drives performance.","Customer fulfillment is our mission."],
  ["gratitude","noun","कृतज्ञता / आभार","the feeling of being grateful","/ˈɡrætɪtjuːd/",["thankfulness","appreciation","recognition"],["ingratitude","resentment"],"She feels deep gratitude.","Express gratitude to your team.","I show gratitude for every opportunity.","Gratitude builds stronger client bonds."],
  ["humility","noun","विनम्रता / नम्रता","the quality of not being proud","/hjuːˈmɪlɪti/",["modesty","meekness","simplicity"],["arrogance","pride"],"He demonstrates great humility.","Humility builds respect.","I practice humility and stay open to learning.","Humble leaders earn team loyalty."],
  ["impact","noun","प्रभाव / असर","the strong effect of something","/ˈɪmpækt/",["effect","influence","consequence"],["triviality"],"She wants to make a big impact.","Measure the impact of your decisions.","I want to create a lasting impact.","High-impact marketing drives conversions."],
  ["integrity","noun","ईमानदारी / सत्यनिष्ठा","the quality of being honest and having strong moral principles","/ɪnˈteɡrɪti/",["honesty","ethics","principle"],["dishonesty","corruption"],"He acts with integrity.","Integrity is non-negotiable.","I am known for my integrity.","Business integrity attracts long-term clients."],
  ["perseverance","noun","दृढ़ता / लगन","continued effort despite difficulty","/ˌpɜːrsɪˈvɪərəns/",["persistence","determination","resilience"],["giving up","surrender"],"She shows great perseverance.","Perseverance leads to success.","Perseverance helped me complete the course.","Perseverance defines great entrepreneurs."],
  ["perspective","noun","दृष्टिकोण","a way of thinking about something","/pəˈspektɪv/",["viewpoint","outlook","angle"],["narrow view"],"He offers a fresh perspective.","Consider every perspective before deciding.","A new perspective improved our strategy.","Diverse perspectives improve business solutions."],
  ["proactivity","noun","पहल करने की आदत","the behavior of taking action before being asked","/ˌprəʊækˈtɪvɪti/",["initiative","readiness","foresight"],["reactivity","passivity"],"She is known for her proactivity.","Proactivity prevents last-minute crises.","My proactivity sets me apart.","Proactivity is valued in fast-growing companies."],
  ["productivity","noun","उत्पादकता","the rate at which things are produced or done","/ˌprɒdʌkˈtɪvɪti/",["efficiency","output","performance"],["laziness","inefficiency"],"He wants to boost his productivity.","Productivity increases with clear goals.","I doubled team productivity this year.","Remote work can maintain high productivity."],
  ["professionalism","noun","व्यावसायिकता / पेशेवराना अंदाज़","the quality of behaving in a skilled, businesslike way","/prəˈfeʃənəlɪzəm/",["expertise","competence","conduct"],["amateurism","unprofessionalism"],"She shows great professionalism.","Professionalism is expected at all times.","My professionalism is evident in my work.","Professionalism builds brand reputation."],
  ["transparency","noun","पारदर्शिता","the quality of being open and honest","/trænsˈpærənsi/",["openness","honesty","clarity"],["secrecy","deception"],"He wants more transparency.","Transparency builds team trust.","I practice transparency in reporting.","Transparency in pricing builds client confidence."],
];

for (const e of fillWords) {
  const [word, pos, hindi, simple, ipa, syn, ant, ex, office, interview, biz] = e;
  if (!seenW.has(word.toLowerCase()) && vocabFull.length < 500) {
    seenW.add(word.toLowerCase());
    vocabFull.push({ word, pos, hindi, simple, ipa, syn, ant, ex, office, interview, biz });
  }
}

// Trim or pad to exactly 500
while (vocabFull.length > 500) vocabFull.pop();

// Build final vocabulary
const vocabulary = vocabFull.slice(0, 500).map((v, i) => ({
  id: i + 1,
  word: v.word,
  partOfSpeech: v.pos,
  hindi: v.hindi,
  simpleMeaning: v.simple,
  ipa: v.ipa,
  synonyms: v.syn,
  antonyms: v.ant,
  example: v.ex,
  officeExample: v.office,
  interviewExample: v.interview,
  businessExample: v.biz
}));

// ─── PRACTICE + MOCKTEST SENTENCE GENERATOR ───────────────────────────────────
const subjects = [
  { en: "I", hindi_pos: "मैं", gender: "m", number: "s", person: "first", wantForm: "want", negForm: "do not want", qForm: "Do I want", hindiPos: "मैं", hindiWant: "चाहता हूँ", hindiWantF: "चाहती हूँ", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या मैं" },
  { en: "I", hindi_pos: "मैं", gender: "f", number: "s", person: "first", wantForm: "want", negForm: "do not want", qForm: "Do I want", hindiPos: "मैं", hindiWant: "चाहती हूँ", hindiWantF: "चाहती हूँ", hindiDontWant: "नहीं चाहती", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या मैं" },
  { en: "you", hindi_pos: "तुम", gender: "n", number: "s", person: "second", wantForm: "want", negForm: "do not want", qForm: "Do you want", hindiPos: "तुम", hindiWant: "चाहते हो", hindiWantF: "चाहती हो", hindiDontWant: "नहीं चाहते", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या तुम" },
  { en: "he", hindi_pos: "वह", gender: "m", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does he want", hindiPos: "वह", hindiWant: "चाहता है", hindiWantF: "चाहता है", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहता", hindiQ: "क्या वह" },
  { en: "she", hindi_pos: "वह", gender: "f", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does she want", hindiPos: "वह", hindiWant: "चाहती है", hindiWantF: "चाहती है", hindiDontWant: "नहीं चाहती", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या वह" },
  { en: "we", hindi_pos: "हम", gender: "n", number: "p", person: "first", wantForm: "want", negForm: "do not want", qForm: "Do we want", hindiPos: "हम", hindiWant: "चाहते हैं", hindiWantF: "चाहते हैं", hindiDontWant: "नहीं चाहते", hindiDontWantF: "नहीं चाहते", hindiQ: "क्या हम" },
  { en: "they", hindi_pos: "वे", gender: "n", number: "p", person: "third", wantForm: "want", negForm: "do not want", qForm: "Do they want", hindiPos: "वे", hindiWant: "चाहते हैं", hindiWantF: "चाहते हैं", hindiDontWant: "नहीं चाहते", hindiDontWantF: "नहीं चाहते", hindiQ: "क्या वे" },
  { en: "my brother", hindi_pos: "मेरा भाई", gender: "m", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does my brother want", hindiPos: "मेरा भाई", hindiWant: "चाहता है", hindiWantF: "चाहता है", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहता", hindiQ: "क्या मेरा भाई" },
  { en: "my sister", hindi_pos: "मेरी बहन", gender: "f", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does my sister want", hindiPos: "मेरी बहन", hindiWant: "चाहती है", hindiWantF: "चाहती है", hindiDontWant: "नहीं चाहती", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या मेरी बहन" },
  { en: "my friend", hindi_pos: "मेरा दोस्त", gender: "m", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does my friend want", hindiPos: "मेरा दोस्त", hindiWant: "चाहता है", hindiWantF: "चाहता है", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहता", hindiQ: "क्या मेरा दोस्त" },
  { en: "the team", hindi_pos: "टीम", gender: "n", number: "p", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does the team want", hindiPos: "टीम", hindiWant: "चाहती है", hindiWantF: "चाहती है", hindiDontWant: "नहीं चाहती", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या टीम" },
  { en: "the manager", hindi_pos: "मैनेजर", gender: "m", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does the manager want", hindiPos: "मैनेजर", hindiWant: "चाहता है", hindiWantF: "चाहता है", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहता", hindiQ: "क्या मैनेजर" },
  { en: "the customer", hindi_pos: "ग्राहक", gender: "m", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does the customer want", hindiPos: "ग्राहक", hindiWant: "चाहता है", hindiWantF: "चाहता है", hindiDontWant: "नहीं चाहता", hindiDontWantF: "नहीं चाहता", hindiQ: "क्या ग्राहक" },
  { en: "the company", hindi_pos: "कंपनी", gender: "f", number: "s", person: "third", wantForm: "wants", negForm: "does not want", qForm: "Does the company want", hindiPos: "कंपनी", hindiWant: "चाहती है", hindiWantF: "चाहती है", hindiDontWant: "नहीं चाहती", hindiDontWantF: "नहीं चाहती", hindiQ: "क्या कंपनी" },
  { en: "my parents", hindi_pos: "मेरे माता-पिता", gender: "n", number: "p", person: "third", wantForm: "want", negForm: "do not want", qForm: "Do my parents want", hindiPos: "मेरे माता-पिता", hindiWant: "चाहते हैं", hindiWantF: "चाहते हैं", hindiDontWant: "नहीं चाहते", hindiDontWantF: "नहीं चाहते", hindiQ: "क्या मेरे माता-पिता" },
  { en: "our clients", hindi_pos: "हमारे क्लाइंट", gender: "n", number: "p", person: "third", wantForm: "want", negForm: "do not want", qForm: "Do our clients want", hindiPos: "हमारे क्लाइंट", hindiWant: "चाहते हैं", hindiWantF: "चाहते हैं", hindiDontWant: "नहीं चाहते", hindiDontWantF: "नहीं चाहते", hindiQ: "क्या हमारे क्लाइंट" },
];

// verb phrases: {enVerb, hindiVerb, category, diff}
const verbPhrases = [
  // Daily life
  {ev:"to drink water", hv:"पानी पीना", cat:"daily", diff:"easy"},
  {ev:"to eat breakfast", hv:"नाश्ता करना", cat:"daily", diff:"easy"},
  {ev:"to go home", hv:"घर जाना", cat:"daily", diff:"easy"},
  {ev:"to sleep early", hv:"जल्दी सोना", cat:"daily", diff:"easy"},
  {ev:"to wake up early", hv:"जल्दी उठना", cat:"daily", diff:"easy"},
  {ev:"to watch a movie", hv:"फिल्म देखना", cat:"daily", diff:"easy"},
  {ev:"to read a book", hv:"किताब पढ़ना", cat:"daily", diff:"easy"},
  {ev:"to cook dinner", hv:"रात का खाना बनाना", cat:"daily", diff:"easy"},
  {ev:"to go for a walk", hv:"टहलने जाना", cat:"daily", diff:"easy"},
  {ev:"to listen to music", hv:"संगीत सुनना", cat:"daily", diff:"easy"},
  {ev:"to visit the temple", hv:"मंदिर जाना", cat:"daily", diff:"easy"},
  {ev:"to meet friends", hv:"दोस्तों से मिलना", cat:"daily", diff:"easy"},
  {ev:"to play cricket", hv:"क्रिकेट खेलना", cat:"daily", diff:"easy"},
  {ev:"to buy groceries", hv:"सब्जी-राशन लाना", cat:"daily", diff:"easy"},
  {ev:"to rest at home", hv:"घर पर आराम करना", cat:"daily", diff:"easy"},
  {ev:"to clean the house", hv:"घर साफ करना", cat:"daily", diff:"easy"},
  {ev:"to take a bath", hv:"नहाना", cat:"daily", diff:"easy"},
  {ev:"to go to the market", hv:"बाज़ार जाना", cat:"daily", diff:"easy"},
  {ev:"to have tea", hv:"चाय पीना", cat:"daily", diff:"easy"},
  {ev:"to exercise daily", hv:"रोज़ व्यायाम करना", cat:"daily", diff:"easy"},
  // Office
  {ev:"to join the meeting", hv:"मीटिंग में शामिल होना", cat:"office", diff:"medium"},
  {ev:"to submit the report", hv:"रिपोर्ट जमा करना", cat:"office", diff:"medium"},
  {ev:"to send the email", hv:"ईमेल भेजना", cat:"office", diff:"easy"},
  {ev:"to finish the project", hv:"प्रोजेक्ट खत्म करना", cat:"office", diff:"medium"},
  {ev:"to take a day off", hv:"छुट्टी लेना", cat:"office", diff:"easy"},
  {ev:"to meet the deadline", hv:"समय सीमा पूरी करना", cat:"office", diff:"medium"},
  {ev:"to present the results", hv:"नतीजे प्रस्तुत करना", cat:"office", diff:"medium"},
  {ev:"to attend the training", hv:"ट्रेनिंग में भाग लेना", cat:"office", diff:"medium"},
  {ev:"to check the budget", hv:"बजट जाँचना", cat:"office", diff:"medium"},
  {ev:"to work from home", hv:"घर से काम करना", cat:"office", diff:"easy"},
  {ev:"to review the contract", hv:"अनुबंध की समीक्षा करना", cat:"office", diff:"hard"},
  {ev:"to organize the files", hv:"फाइलें व्यवस्थित करना", cat:"office", diff:"medium"},
  {ev:"to schedule a meeting", hv:"मीटिंग तय करना", cat:"office", diff:"medium"},
  {ev:"to prepare the presentation", hv:"प्रेजेंटेशन तैयार करना", cat:"office", diff:"medium"},
  {ev:"to resolve the issue", hv:"समस्या सुलझाना", cat:"office", diff:"medium"},
  // Interview
  {ev:"to get a good job", hv:"अच्छी नौकरी पाना", cat:"interview", diff:"easy"},
  {ev:"to work in a reputed company", hv:"एक अच्छी कंपनी में काम करना", cat:"interview", diff:"medium"},
  {ev:"to lead a team", hv:"एक टीम का नेतृत्व करना", cat:"interview", diff:"medium"},
  {ev:"to grow professionally", hv:"पेशेवर रूप से आगे बढ़ना", cat:"interview", diff:"medium"},
  {ev:"to learn new skills", hv:"नए कौशल सीखना", cat:"interview", diff:"medium"},
  {ev:"to get a promotion", hv:"तरक्की पाना", cat:"interview", diff:"medium"},
  {ev:"to become a manager", hv:"मैनेजर बनना", cat:"interview", diff:"medium"},
  {ev:"to improve my communication", hv:"अपनी communication सुधारना", cat:"interview", diff:"medium"},
  {ev:"to contribute to the team", hv:"टीम में योगदान देना", cat:"interview", diff:"medium"},
  {ev:"to work on challenging projects", hv:"चुनौतीपूर्ण प्रोजेक्ट पर काम करना", cat:"interview", diff:"hard"},
  // Business
  {ev:"to expand the business", hv:"व्यापार बढ़ाना", cat:"business", diff:"medium"},
  {ev:"to increase sales", hv:"बिक्री बढ़ाना", cat:"business", diff:"medium"},
  {ev:"to find new clients", hv:"नए ग्राहक ढूँढना", cat:"business", diff:"medium"},
  {ev:"to sign the deal", hv:"डील साइन करना", cat:"business", diff:"hard"},
  {ev:"to launch a new product", hv:"नया उत्पाद लॉन्च करना", cat:"business", diff:"hard"},
  {ev:"to reduce costs", hv:"खर्च कम करना", cat:"business", diff:"medium"},
  {ev:"to improve customer service", hv:"ग्राहक सेवा सुधारना", cat:"business", diff:"medium"},
  {ev:"to invest in technology", hv:"तकनीक में निवेश करना", cat:"business", diff:"hard"},
  {ev:"to enter a new market", hv:"नए बाज़ार में प्रवेश करना", cat:"business", diff:"hard"},
  {ev:"to build a strong brand", hv:"मज़बूत ब्रांड बनाना", cat:"business", diff:"hard"},
  // Family
  {ev:"to spend time with family", hv:"परिवार के साथ समय बिताना", cat:"family", diff:"easy"},
  {ev:"to help my parents", hv:"अपने माता-पिता की मदद करना", cat:"family", diff:"easy"},
  {ev:"to take care of my children", hv:"अपने बच्चों की देखभाल करना", cat:"family", diff:"easy"},
  {ev:"to visit my grandparents", hv:"अपने दादा-दादी से मिलने जाना", cat:"family", diff:"easy"},
  {ev:"to celebrate the festival together", hv:"मिलकर त्योहार मनाना", cat:"family", diff:"easy"},
  // Travel
  {ev:"to visit Goa", hv:"गोवा जाना", cat:"travel", diff:"easy"},
  {ev:"to travel abroad", hv:"विदेश यात्रा करना", cat:"travel", diff:"medium"},
  {ev:"to explore new cities", hv:"नए शहर घूमना", cat:"travel", diff:"medium"},
  {ev:"to book a hotel", hv:"होटल बुक करना", cat:"travel", diff:"easy"},
  {ev:"to plan a vacation", hv:"छुट्टी की योजना बनाना", cat:"travel", diff:"medium"},
  // Health
  {ev:"to stay healthy", hv:"स्वस्थ रहना", cat:"health", diff:"easy"},
  {ev:"to visit the doctor", hv:"डॉक्टर के पास जाना", cat:"health", diff:"easy"},
  {ev:"to lose weight", hv:"वज़न कम करना", cat:"health", diff:"medium"},
  {ev:"to start yoga", hv:"योग शुरू करना", cat:"health", diff:"easy"},
  {ev:"to follow a healthy diet", hv:"स्वस्थ आहार लेना", cat:"health", diff:"medium"},
  // Technology
  {ev:"to learn programming", hv:"प्रोग्रामिंग सीखना", cat:"tech", diff:"medium"},
  {ev:"to use a new app", hv:"नया ऐप इस्तेमाल करना", cat:"tech", diff:"easy"},
  {ev:"to update the software", hv:"सॉफ्टवेयर अपडेट करना", cat:"tech", diff:"medium"},
  {ev:"to build a website", hv:"वेबसाइट बनाना", cat:"tech", diff:"hard"},
  {ev:"to understand artificial intelligence", hv:"आर्टिफिशियल इंटेलिजेंस समझना", cat:"tech", diff:"hard"},
  // Emotions and goals
  {ev:"to be happy", hv:"खुश रहना", cat:"emotion", diff:"easy"},
  {ev:"to feel confident", hv:"आत्मविश्वासी महसूस करना", cat:"emotion", diff:"easy"},
  {ev:"to overcome fear", hv:"डर पर काबू पाना", cat:"emotion", diff:"medium"},
  {ev:"to be more patient", hv:"अधिक धैर्यवान बनना", cat:"emotion", diff:"medium"},
  {ev:"to find inner peace", hv:"मन की शांति पाना", cat:"emotion", diff:"medium"},
  {ev:"to achieve my dreams", hv:"अपने सपने पूरे करना", cat:"goal", diff:"medium"},
  {ev:"to make my parents proud", hv:"माता-पिता को गर्वित करना", cat:"goal", diff:"medium"},
  {ev:"to buy a house", hv:"घर खरीदना", cat:"goal", diff:"medium"},
  {ev:"to start my own business", hv:"अपना व्यापार शुरू करना", cat:"goal", diff:"hard"},
  {ev:"to speak English fluently", hv:"अच्छी अंग्रेज़ी बोलना", cat:"goal", diff:"medium"},
  // Nouns (want + noun)
  {ev:"a new phone", hv:"एक नया फोन", isNoun:true, cat:"daily", diff:"easy"},
  {ev:"a cup of tea", hv:"एक कप चाय", isNoun:true, cat:"daily", diff:"easy"},
  {ev:"a glass of water", hv:"एक गिलास पानी", isNoun:true, cat:"daily", diff:"easy"},
  {ev:"a good job", hv:"एक अच्छी नौकरी", isNoun:true, cat:"career", diff:"easy"},
  {ev:"more time", hv:"और समय", isNoun:true, cat:"daily", diff:"easy"},
  {ev:"a salary raise", hv:"वेतन वृद्धि", isNoun:true, cat:"office", diff:"medium"},
  {ev:"a new car", hv:"एक नई कार", isNoun:true, cat:"daily", diff:"easy"},
  {ev:"a better opportunity", hv:"एक बेहतर अवसर", isNoun:true, cat:"career", diff:"medium"},
  {ev:"good feedback", hv:"अच्छी प्रतिक्रिया", isNoun:true, cat:"office", diff:"medium"},
  {ev:"a promotion", hv:"तरक्की", isNoun:true, cat:"office", diff:"medium"},
  {ev:"a vacation", hv:"छुट्टी", isNoun:true, cat:"travel", diff:"easy"},
  {ev:"more responsibility", hv:"अधिक ज़िम्मेदारी", isNoun:true, cat:"office", diff:"medium"},
  {ev:"a peaceful life", hv:"एक शांतिपूर्ण जीवन", isNoun:true, cat:"emotion", diff:"medium"},
  {ev:"better health", hv:"बेहतर स्वास्थ्य", isNoun:true, cat:"health", diff:"easy"},
  {ev:"financial stability", hv:"आर्थिक स्थिरता", isNoun:true, cat:"goal", diff:"hard"},
];

function getHindiWant(subj, isNoun, type) {
  // type: pos, neg, q
  if (type === "pos") return subj.hindiWant;
  if (type === "neg") return subj.hindiDontWant;
  return subj.hindiWant;
}

function buildSentence(subj, vp, type) {
  // type: pos, neg, q
  let engSent, hindiSent, hint, explanation, diff, tags;
  const en = subj.en;
  const cap = en.charAt(0).toUpperCase() + en.slice(1);
  diff = vp.diff || "medium";
  tags = [vp.cat || "general", type];

  if (vp.isNoun) {
    if (type === "pos") {
      engSent = `${cap} ${subj.wantForm} ${vp.ev}.`;
      hindiSent = `${subj.hindiPos} ${vp.hv} ${subj.hindiWant === "चाहता हूँ" || subj.hindiWant === "चाहती हूँ" ? (subj.hindiWant === "चाहती हूँ" ? "चाहती हूँ" : "चाहता हूँ") : subj.hindiWant}।`;
      // Use चाहिए form for nouns - more natural
      hindiSent = `${subj.hindiPos}${subj.en === "I" ? "को" : ""} ${vp.hv} ${subj.en === "I" ? "चाहिए" : (subj.number === "p" ? "चाहिए" : "चाहिए")}।`;
      if (subj.en === "I") {
        hindiSent = `मुझे ${vp.hv} चाहिए।`;
      } else if (subj.en === "you") {
        hindiSent = `तुम्हें ${vp.hv} चाहिए।`;
      } else if (subj.en === "he") {
        hindiSent = `उसे ${vp.hv} चाहिए।`;
      } else if (subj.en === "she") {
        hindiSent = `उसे ${vp.hv} चाहिए।`;
      } else if (subj.en === "we") {
        hindiSent = `हमें ${vp.hv} चाहिए।`;
      } else if (subj.en === "they") {
        hindiSent = `उन्हें ${vp.hv} चाहिए।`;
      } else {
        hindiSent = `${subj.hindiPos} को ${vp.hv} चाहिए।`;
      }
      hint = `${en === "he" || en === "she" || en === "the manager" || en === "the customer" || en === "the company" || en === "my brother" || en === "my sister" || en === "my friend" ? "wants" : "want"} + noun`;
      explanation = `${cap} ${subj.wantForm} is used with a noun object. No 'to' needed before noun.`;
    } else if (type === "neg") {
      engSent = `${cap} ${subj.negForm} ${vp.ev}.`;
      if (subj.en === "I") hindiSent = `मुझे ${vp.hv} नहीं चाहिए।`;
      else if (subj.en === "you") hindiSent = `तुम्हें ${vp.hv} नहीं चाहिए।`;
      else if (subj.en === "he") hindiSent = `उसे ${vp.hv} नहीं चाहिए।`;
      else if (subj.en === "she") hindiSent = `उसे ${vp.hv} नहीं चाहिए।`;
      else if (subj.en === "we") hindiSent = `हमें ${vp.hv} नहीं चाहिए।`;
      else if (subj.en === "they") hindiSent = `उन्हें ${vp.hv} नहीं चाहिए।`;
      else hindiSent = `${subj.hindiPos} को ${vp.hv} नहीं चाहिए।`;
      hint = `${subj.negForm} + noun`;
      explanation = `Negative: ${subj.negForm} + noun. In Hindi, 'नहीं चाहिए' is used.`;
    } else {
      // question
      engSent = `${subj.qForm} ${vp.ev}?`;
      if (subj.en === "I") hindiSent = `क्या मुझे ${vp.hv} चाहिए?`;
      else if (subj.en === "you") hindiSent = `क्या तुम्हें ${vp.hv} चाहिए?`;
      else if (subj.en === "he") hindiSent = `क्या उसे ${vp.hv} चाहिए?`;
      else if (subj.en === "she") hindiSent = `क्या उसे ${vp.hv} चाहिए?`;
      else if (subj.en === "we") hindiSent = `क्या हमें ${vp.hv} चाहिए?`;
      else if (subj.en === "they") hindiSent = `क्या उन्हें ${vp.hv} चाहिए?`;
      else hindiSent = `क्या ${subj.hindiPos} को ${vp.hv} चाहिए?`;
      hint = `${subj.qForm.split(" ")[0]} + subject + want + noun?`;
      explanation = `Question with noun: Do/Does + subject + want + noun?`;
    }
  } else {
    // verb phrase
    if (type === "pos") {
      engSent = `${cap} ${subj.wantForm} ${vp.ev}.`;
      hindiSent = `${subj.hindiPos} ${vp.hv} ${subj.hindiWant}।`;
      hint = `${subj.wantForm} + to + base verb`;
      explanation = `Positive: ${cap} ${subj.wantForm} + infinitive. '${subj.wantForm}' is used with ${en}.`;
    } else if (type === "neg") {
      engSent = `${cap} ${subj.negForm} ${vp.ev}.`;
      hindiSent = `${subj.hindiPos} ${vp.hv} ${subj.hindiDontWant}।`;
      hint = `${subj.negForm} + to + base verb`;
      explanation = `Negative: ${subj.negForm} + infinitive. Use '${subj.negForm}' with ${en}.`;
    } else {
      engSent = `${subj.qForm} ${vp.ev}?`;
      hindiSent = `${subj.hindiQ} ${vp.hv} ${subj.hindiWant}?`;
      hint = `${subj.qForm.split(" ")[0]} + ${en} + want + to + base verb?`;
      explanation = `Question: ${subj.qForm.split(" ")[0]} is used to form a yes/no question with ${en}.`;
    }
  }

  return { engSent, hindiSent, hint, explanation, diff, tags };
}

// Generate all sentences
const allSentences = [];
const engSet = new Set();
const types = ["pos", "neg", "q"];

for (const subj of subjects) {
  for (const vp of verbPhrases) {
    for (const type of types) {
      const result = buildSentence(subj, vp, type);
      const key = result.engSent.toLowerCase().trim();
      if (!engSet.has(key)) {
        engSet.add(key);
        allSentences.push(result);
      }
    }
  }
}

// Shuffle deterministically
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 1103515245 + 12345) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
shuffleArr(allSentences);

// We need 900 practice + 350 mock = 1250 unique
// If we have fewer than 1250, we generate more combos with additional phrases
if (allSentences.length < 1250) {
  // Add WH question variants
  const whPhrases = [
    {wh:"What", hindiWh:"क्या"},
    {wh:"Where", hindiWh:"कहाँ"},
    {wh:"When", hindiWh:"कब"},
    {wh:"Why", hindiWh:"क्यों"},
  ];
  for (const subj of subjects) {
    for (const vp of verbPhrases.filter(v => !v.isNoun)) {
      for (const wh of whPhrases) {
        let engSent, hindiSent;
        if (wh.wh === "What") {
          engSent = `What does ${subj.en === "I" ? "he" : subj.en} want ${vp.ev.replace("to ", "to ")}?`;
          if (subj.en === "I") engSent = `What do you want ${vp.ev}?`;
          else if (subj.en === "we" || subj.en === "they" || subj.en === "my parents" || subj.en === "our clients") engSent = `What do ${subj.en} want ${vp.ev}?`;
          else engSent = `What does ${subj.en} want ${vp.ev}?`;
          hindiSent = `${subj.hindiPos} क्या ${vp.hv} ${subj.hindiWant}?`;
        } else if (wh.wh === "Where") {
          // Only makes sense for some
          if (!vp.ev.includes("go") && !vp.ev.includes("visit") && !vp.ev.includes("travel") && !vp.ev.includes("work")) continue;
          if (subj.wantForm === "wants") engSent = `Where does ${subj.en} want ${vp.ev}?`;
          else engSent = `Where do ${subj.en} want ${vp.ev}?`;
          hindiSent = `${subj.hindiPos} कहाँ ${vp.hv} ${subj.hindiWant}?`;
        } else if (wh.wh === "When") {
          if (subj.wantForm === "wants") engSent = `When does ${subj.en} want ${vp.ev}?`;
          else engSent = `When do ${subj.en} want ${vp.ev}?`;
          hindiSent = `${subj.hindiPos} कब ${vp.hv} ${subj.hindiWant}?`;
        } else {
          if (subj.wantForm === "wants") engSent = `Why does ${subj.en} want ${vp.ev}?`;
          else engSent = `Why do ${subj.en} want ${vp.ev}?`;
          hindiSent = `${subj.hindiPos} क्यों ${vp.hv} ${subj.hindiWant}?`;
        }
        const key = engSent.toLowerCase().trim();
        if (!engSet.has(key)) {
          engSet.add(key);
          allSentences.push({
            engSent, hindiSent,
            hint: `${wh.wh} + do/does + subject + want + to + verb?`,
            explanation: `WH question with want: ${wh.wh} is used to ask for specific information.`,
            diff: vp.diff || "medium",
            tags: [vp.cat || "general", "wh-question"]
          });
        }
      }
    }
  }
}

console.log("Total unique sentences generated:", allSentences.length);

// If still < 1250, we use variations with adverbs
const adverbMods = ["really", "truly", "badly", "desperately", "sincerely", "honestly", "deeply"];
if (allSentences.length < 1250) {
  for (const subj of subjects) {
    for (const vp of verbPhrases.slice(0, 30)) {
      for (const adv of adverbMods) {
        let engSent, hindiSent;
        if (!vp.isNoun) {
          engSent = `${subj.en.charAt(0).toUpperCase() + subj.en.slice(1)} ${adv} ${subj.wantForm} ${vp.ev}.`;
          hindiSent = `${subj.hindiPos} सच में ${vp.hv} ${subj.hindiWant}।`;
        } else {
          engSent = `${subj.en.charAt(0).toUpperCase() + subj.en.slice(1)} ${adv} ${subj.wantForm} ${vp.ev}.`;
          hindiSent = `${subj.hindiPos} को सच में ${vp.hv} चाहिए।`;
        }
        const key = engSent.toLowerCase().trim();
        if (!engSet.has(key)) {
          engSet.add(key);
          allSentences.push({
            engSent, hindiSent,
            hint: `Subject + adverb + want/wants + to + verb`,
            explanation: `Adverb '${adv}' before want adds emphasis. Both subject and want form are correct.`,
            diff: "hard",
            tags: [vp.cat || "general", "emphasis"]
          });
        }
      }
    }
  }
}

console.log("Total after adverbs:", allSentences.length);

// Assign practice (900) and mock (350)
const practice = allSentences.slice(0, 900).map((s, i) => ({
  id: `d11-${String(i + 1).padStart(3, "0")}`,
  hindi: s.hindiSent,
  english: s.engSent,
  alternatives: [],
  hint: s.hint,
  explanation: s.explanation,
  difficulty: s.diff,
  tags: s.tags
}));

const mockTest = allSentences.slice(900, 1250).map((s, i) => ({
  id: `d11-${String(i + 1).padStart(3, "0")}-test`,
  hindi: s.hindiSent,
  english: s.engSent,
  alternatives: [],
  hint: s.hint,
  explanation: s.explanation,
  difficulty: s.diff,
  tags: s.tags
}));

// ─── ESSAYS ───────────────────────────────────────────────────────────────────
const essay = [
  {
    title: "My Goals and Desires",
    hindi: "इस निबंध में बताया गया है कि एक छात्र अपने जीवन में क्या-क्या चाहता है — पढ़ाई, करियर, परिवार और खुशी के बारे में।",
    english: `Every person has goals and desires. I want to be successful in my life. I want to learn English fluently so that I can communicate with people from different countries. I also want to get a good job in a reputed company.

My parents want me to study hard. They do not want me to waste my time on unnecessary things. My sister wants to become a doctor. She does not want to leave her city for work.

Do you want to know my biggest dream? I want to start my own business one day. I want to create something that helps people. I want to make my parents proud.

My friend does not want to work in an office. He wants to travel the world. He wants to explore new cultures and meet interesting people.

We all want happiness in our lives. We want good health, good relationships, and a peaceful life. The key is to work hard for what you want. If you want something truly, you must take action every single day.`
  },
  {
    title: "A Dream Job Interview",
    hindi: "इस निबंध में एक candidate अपने dream job के लिए interview देता है और बताता है कि वह इस job में क्यों join करना चाहता है।",
    english: `Today is the day of my dream job interview. I want to make a great impression. I want to show the interviewer my skills and dedication.

The interviewer asks me, "What do you want to achieve in your career?" I want to grow as a professional. I want to lead projects and mentor younger colleagues. I do not want to stay in one position forever. I want to keep learning and improving.

She asks, "Does your family want you to move to another city for this job?" I tell her that my parents want me to be happy and successful. They do not want me to stay in a job where I am not growing.

The manager wants a candidate who is proactive and responsible. He does not want someone who needs constant supervision. He wants someone who takes initiative.

At the end, I ask, "When does the company want new employees to join?" She says they want the selected candidate to join within two weeks. I want to accept this opportunity with both hands. I want to give my best to this organization every single day.`
  },
  {
    title: "Healthy Habits I Want to Build",
    hindi: "यह निबंध स्वस्थ जीवन की आदतों के बारे में है जो लेखक अपनाना चाहता है।",
    english: `I want to live a healthy and balanced life. There are several habits I want to build this year.

First, I want to wake up early every morning. I want to do yoga and exercise for at least thirty minutes. My doctor wants me to follow a healthy diet. She does not want me to eat too much junk food or drink sugary drinks.

Second, I want to read a book every day. Reading makes me smarter and calmer. My parents want me to read more and use my phone less. They do not want me to stay up late watching videos.

Third, I want to spend more time with my family. We do not want to be too busy for each other. My mother wants all of us to have dinner together every night. She wants it to be our daily family time.

Does your family want to build healthy habits together? It is easier when everyone supports each other. I want to inspire the people around me to live well. I want to be the change I wish to see.`
  },
  {
    title: "Our Business Plan",
    hindi: "इस निबंध में दो दोस्त अपने startup की business planning के बारे में बात करते हैं।",
    english: `My friend Rahul and I want to start a small business together. We want to sell handmade products online. We want to create something unique that customers will love.

Rahul wants to handle the design and production side. He does not want to deal with finances. I want to manage the accounts and marketing. I do not want to ignore customer feedback because it helps us grow.

Our clients want good quality at a fair price. They do not want to pay more than the value they receive. We want to build strong relationships with every customer. We want them to come back again and again.

Our investor wants to see a clear business plan. He does not want any surprises. He wants us to set monthly targets and report our progress regularly.

Do you want to know the most important thing we have learned? We want to stay consistent and patient. We do not want to give up when things get difficult. We want to keep going until we achieve our dreams. Success comes to those who truly want it and work for it every day.`
  },
  {
    title: "Learning English — My Journey",
    hindi: "इस निबंध में एक Hindi-speaking learner अपनी English सीखने की यात्रा साझा करता है।",
    english: `I want to speak English confidently. It is my biggest goal right now. I want to communicate clearly with my colleagues and clients.

I did not always feel this way. Earlier, I did not want to speak in English because I was afraid of making mistakes. My teacher wanted me to practice daily. She did not want me to be shy about speaking.

Now, I want to speak English everywhere — at the office, in meetings, and even at home. My mother wants to learn too. She does not want to feel left out when her grandchildren speak in English.

My colleagues want to improve as well. We want to form a small group to practice together. We want to speak only English for thirty minutes every day.

Does your company want its employees to speak good English? Many companies do. They want their staff to communicate clearly with international clients. They do not want language to be a barrier.

I want to prove that anyone can learn English at any age. I want to inspire others to start their journey. If you want something badly enough, you will find a way to get it. I truly want this, and I know I will succeed.`
  }
];

// ─── STORIES ──────────────────────────────────────────────────────────────────
const story = [
  {
    title: "Riya's Big Dream",
    english: `Riya is a young girl from a small town. She wants to become a software engineer. She does not want to stay in her small town forever. She wants to study in a big city and work for a top company.

Every day, Riya wakes up early. She wants to study for three hours before breakfast. Her mother wants her to eat well and sleep on time. Her father wants her to be happy, not just successful.

One day, Riya gets a call from a college in Mumbai. They want her to join their computer science program. Riya wants to say yes immediately. She wants to pack her bags and start her new life.

Her younger brother wants to go with her. He does not want to stay home without his sister. Their parents smile and say they want both their children to follow their dreams.

Riya moves to Mumbai. She works hard. She does not want to waste a single day. Two years later, she gets a job at a top tech company. She calls her parents and says, "I want to thank you for everything." Her mother cries with joy. Riya wants to make every sacrifice worth it. And she does.`,
    hindi: `रिया एक छोटे शहर की लड़की है। वह सॉफ्टवेयर इंजीनियर बनना चाहती है। वह हमेशा के लिए अपने छोटे शहर में नहीं रहना चाहती। वह एक बड़े शहर में पढ़ना और एक बड़ी कंपनी में काम करना चाहती है।

हर दिन रिया जल्दी उठती है। वह नाश्ते से पहले तीन घंटे पढ़ना चाहती है। उसकी माँ चाहती है कि वह अच्छा खाए और समय पर सोए। उसके पिता चाहते हैं कि वह खुश रहे, सिर्फ सफल नहीं।

एक दिन रिया को मुंबई के एक कॉलेज से फोन आता है। वे चाहते हैं कि वह उनके कंप्यूटर साइंस प्रोग्राम में शामिल हो। रिया तुरंत हाँ कहना चाहती है। वह अपना सामान पैक करके नई ज़िंदगी शुरू करना चाहती है।

उसका छोटा भाई भी उसके साथ जाना चाहता है। वह अपनी बहन के बिना घर पर नहीं रहना चाहता। माता-पिता मुस्कुराते हैं और कहते हैं कि वे चाहते हैं कि दोनों बच्चे अपने सपने पूरे करें।

रिया मुंबई जाती है। वह मेहनत करती है। वह एक भी दिन बर्बाद नहीं करना चाहती। दो साल बाद उसे एक बड़ी टेक कंपनी में नौकरी मिलती है। वह अपने माता-पिता को फोन करती है और कहती है, "मैं आपका शुक्रिया अदा करना चाहती हूँ।" उसकी माँ खुशी से रो पड़ती है।`
  },
  {
    title: "The Office Presentation",
    english: `Arjun works in a marketing company. His manager wants him to give a presentation on Friday. Arjun does not want to speak in front of a large group. He feels nervous.

His colleague Priya notices this. She asks, "Do you want some help with your presentation?" Arjun smiles and says yes. He wants to practise his speaking skills.

Priya says, "I want you to feel confident. Let us practise together." They spend two evenings preparing. Arjun does not want to make any mistakes in front of the management.

On Friday, Arjun walks into the conference room. The whole team wants to hear his ideas. Arjun takes a deep breath. He does not want to rush. He speaks slowly and clearly.

After the presentation, the manager says, "I want to congratulate you, Arjun. That was excellent." Arjun feels very happy. He does not want to forget this day. He wants to grow and get better with every presentation.

Priya smiles from across the room. She wants to see her colleague succeed. Good teams want each other to grow.`,
    hindi: `अर्जुन एक मार्केटिंग कंपनी में काम करता है। उसका मैनेजर चाहता है कि वह शुक्रवार को एक प्रेजेंटेशन दे। अर्जुन एक बड़े समूह के सामने बोलना नहीं चाहता। वह घबराया हुआ है।

उसकी सहकर्मी प्रिया यह देखती है। वह पूछती है, "क्या तुम अपनी प्रेजेंटेशन में मदद चाहते हो?" अर्जुन मुस्कुराते हुए हाँ कहता है। वह अपनी बोलने की कला सुधारना चाहता है।

प्रिया कहती है, "मैं चाहती हूँ कि तुम आत्मविश्वासी महसूस करो। चलो साथ में अभ्यास करते हैं।" वे दो शाम तैयारी में बिताते हैं। अर्जुन प्रबंधन के सामने कोई गलती नहीं करना चाहता।

शुक्रवार को अर्जुन कॉन्फ्रेंस रूम में जाता है। पूरी टीम उसके विचार सुनना चाहती है। अर्जुन गहरी साँस लेता है। वह जल्दबाज़ी नहीं करना चाहता। वह धीरे और स्पष्ट रूप से बोलता है।

प्रेजेंटेशन के बाद मैनेजर कहता है, "मैं तुम्हें बधाई देना चाहता हूँ, अर्जुन। यह बहुत अच्छा था।" अर्जुन बहुत खुश होता है।`
  },
  {
    title: "A Family Vacation Plan",
    english: `The Sharma family wants to go on a vacation. The father wants to visit the mountains. The mother wants to go to a beach. The children want to go to an amusement park. Everyone wants something different!

The eldest daughter, Neha, says, "I want us to decide together. I do not want anyone to be unhappy." They sit at the dinner table and talk.

The father says, "I want fresh air and cool weather." The mother says, "I want to relax near the water." The younger son, Amit, wants to ride roller coasters. Neha does not want to miss this chance to spend time together.

Finally, they agree on Goa. It has beaches for the mother, hills nearby for the father, and water parks for the children. Neha wants to book the hotel immediately. She does not want to delay.

They plan the trip for next month. The whole family is excited. The father says, "I want this to be the best vacation ever." The mother smiles and says, "I just want us to be together."

Sometimes, the best trips are the ones where everyone wants something different, because finding the middle ground makes the journey even more special.`,
    hindi: `शर्मा परिवार छुट्टी पर जाना चाहता है। पिता पहाड़ों पर जाना चाहते हैं। माँ समुद्र के किनारे जाना चाहती है। बच्चे एक मनोरंजन पार्क में जाना चाहते हैं। सब कुछ अलग-अलग चाहते हैं!

बड़ी बेटी नेहा कहती है, "मैं चाहती हूँ कि हम मिलकर फैसला करें। मैं नहीं चाहती कि कोई नाखुश हो।" वे डिनर टेबल पर बैठकर बात करते हैं।

पिता कहते हैं, "मुझे ताज़ी हवा और ठंडा मौसम चाहिए।" माँ कहती है, "मैं पानी के पास आराम करना चाहती हूँ।" छोटा बेटा अमित रोलर कोस्टर पर सवारी करना चाहता है। नेहा इस बार एक साथ समय बिताने का मौका नहीं गँवाना चाहती।

अंत में वे गोवा पर सहमत होते हैं। वहाँ माँ के लिए समुद्र है, पिता के लिए पास में पहाड़ियाँ हैं, और बच्चों के लिए वाटर पार्क। नेहा तुरंत होटल बुक करना चाहती है। वह देरी नहीं करना चाहती।

वे अगले महीने यात्रा की योजना बनाते हैं। पूरा परिवार उत्साहित है। पिता कहते हैं, "मैं चाहता हूँ कि यह सबसे अच्छी छुट्टी हो।" माँ मुस्कुराती है और कहती है, "मैं बस यही चाहती हूँ कि हम सब साथ हों।"`
  }
];

// ─── DIALOGUES ────────────────────────────────────────────────────────────────
const dialogue = [
  {
    title: "At the Office — Planning a Project",
    setting: "At the office",
    turns: [
      { speaker: "Manager (Suresh)", hindi: "अमित, मैं इस हफ्ते नया प्रोजेक्ट शुरू करना चाहता हूँ।", english: "Amit, I want to start the new project this week." },
      { speaker: "Amit", hindi: "ज़रूर सर। मैं जानना चाहता हूँ कि टीम में कौन-कौन होगा।", english: "Sure, sir. I want to know who will be on the team." },
      { speaker: "Manager", hindi: "मैं तुम्हें और प्रिया को इस पर रखना चाहता हूँ।", english: "I want to put you and Priya on this." },
      { speaker: "Amit", hindi: "क्या आप चाहते हैं कि हम कल से शुरू करें?", english: "Do you want us to start from tomorrow?" },
      { speaker: "Manager", hindi: "हाँ। मैं किसी भी देरी से बचना चाहता हूँ।", english: "Yes. I do not want any delays." },
      { speaker: "Amit", hindi: "समझ गया। मैं आज शाम को योजना तैयार करना चाहता हूँ।", english: "Understood. I want to prepare the plan this evening." },
      { speaker: "Manager", hindi: "अच्छा। क्या तुम चाहते हो कि मैं client से मिलूँ?", english: "Good. Do you want me to meet the client?" },
      { speaker: "Amit", hindi: "हाँ सर, मैं चाहता हूँ कि आप उनसे requirements समझें।", english: "Yes, sir. I want you to understand the requirements from them." },
      { speaker: "Manager", hindi: "ठीक है। मैं नहीं चाहता कि scope बाद में बदले।", english: "Alright. I do not want the scope to change later." },
      { speaker: "Amit", hindi: "मैं भी यही चाहता हूँ। मैं सब कुछ लिखित में रखना चाहता हूँ।", english: "I want that too. I want to keep everything in writing." }
    ]
  },
  {
    title: "Job Interview — At a Tech Company",
    setting: "Job interview",
    turns: [
      { speaker: "Interviewer (HR)", hindi: "नमस्ते। कृपया बैठिए। आप इस पद के लिए क्यों apply करना चाहते हैं?", english: "Hello. Please sit down. Why do you want to apply for this position?" },
      { speaker: "Candidate (Neha)", hindi: "मैं एक ऐसी company में काम करना चाहती हूँ जहाँ मैं grow कर सकूँ।", english: "I want to work in a company where I can grow." },
      { speaker: "Interviewer", hindi: "क्या आप leadership role लेना चाहती हैं?", english: "Do you want to take on a leadership role?" },
      { speaker: "Neha", hindi: "हाँ, मैं अगले दो साल में team lead बनना चाहती हूँ।", english: "Yes, I want to become a team lead within two years." },
      { speaker: "Interviewer", hindi: "आप इस role में क्या बदलाव करना चाहती हैं?", english: "What changes do you want to make in this role?" },
      { speaker: "Neha", hindi: "मैं process को और efficient बनाना चाहती हूँ।", english: "I want to make the process more efficient." },
      { speaker: "Interviewer", hindi: "हमारी company किसी ऐसे को hire करना चाहती है जो proactive हो।", english: "Our company wants to hire someone who is proactive." },
      { speaker: "Neha", hindi: "मैं समझती हूँ। मैं हमेशा पहले से तैयारी करना चाहती हूँ।", english: "I understand. I always want to prepare in advance." },
      { speaker: "Interviewer", hindi: "क्या आप relocate करना चाहती हैं?", english: "Do you want to relocate?" },
      { speaker: "Neha", hindi: "हाँ, मैं नए शहर में नई शुरुआत करना चाहती हूँ।", english: "Yes, I want to make a fresh start in a new city." },
      { speaker: "Interviewer", hindi: "बहुत अच्छा। हम आपको जल्द ही बताना चाहते हैं।", english: "Very good. We want to inform you soon." },
      { speaker: "Neha", hindi: "शुक्रिया। मैं आपकी company का हिस्सा बनना चाहती हूँ।", english: "Thank you. I want to be a part of your company." }
    ]
  },
  {
    title: "Family at Home — Weekend Plans",
    setting: "Family at home",
    turns: [
      { speaker: "Mother (Sunita)", hindi: "बच्चों, इस weekend तुम क्या करना चाहते हो?", english: "Children, what do you want to do this weekend?" },
      { speaker: "Son (Rohan)", hindi: "मैं अपने दोस्तों के साथ cricket खेलना चाहता हूँ।", english: "I want to play cricket with my friends." },
      { speaker: "Daughter (Ananya)", hindi: "मैं घर पर रहना चाहती हूँ और किताब पढ़ना चाहती हूँ।", english: "I want to stay home and read a book." },
      { speaker: "Father (Ramesh)", hindi: "मैं परिवार के साथ बाहर खाना खाने जाना चाहता हूँ।", english: "I want to go out for dinner with the family." },
      { speaker: "Mother", hindi: "मैं भी यही चाहती हूँ। क्या तुम सब साथ चलना चाहते हो?", english: "I want that too. Do you all want to come together?" },
      { speaker: "Rohan", hindi: "हाँ, मैं pizza खाना चाहता हूँ।", english: "Yes, I want to eat pizza." },
      { speaker: "Ananya", hindi: "मैं pizza नहीं चाहती। मैं Chinese खाना चाहती हूँ।", english: "I do not want pizza. I want to eat Chinese food." },
      { speaker: "Father", hindi: "चलो, हम एक ऐसी जगह जाते हैं जहाँ दोनों मिलें। क्या तुम लोग The Grand Restaurant जाना चाहते हो?", english: "Let us go somewhere that has both. Do you want to go to The Grand Restaurant?" },
      { speaker: "Rohan", hindi: "हाँ! मैं वहाँ ज़रूर जाना चाहता हूँ।", english: "Yes! I really want to go there." },
      { speaker: "Ananya", hindi: "ठीक है। मैं भी वहाँ जाना चाहती हूँ।", english: "Alright. I want to go there too." },
      { speaker: "Mother", hindi: "बहुत अच्छा! मैं चाहती हूँ कि हम सब साथ में खुश रहें।", english: "Wonderful! I want all of us to be happy together." },
      { speaker: "Father", hindi: "और मैं चाहता हूँ कि यह हमारी परंपरा बन जाए।", english: "And I want this to become our tradition." }
    ]
  },
  {
    title: "At the Restaurant — Ordering Food",
    setting: "Restaurant",
    turns: [
      { speaker: "Waiter", hindi: "नमस्ते! आप क्या लेना चाहते हैं?", english: "Hello! What do you want to have?" },
      { speaker: "Customer 1 (Priya)", hindi: "मुझे menu देखना है। मैं कुछ light खाना चाहती हूँ।", english: "I want to see the menu. I want to eat something light." },
      { speaker: "Waiter", hindi: "क्या आप soup चाहती हैं? हमारा tomato soup बहुत अच्छा है।", english: "Do you want soup? Our tomato soup is very good." },
      { speaker: "Priya", hindi: "हाँ, मुझे एक tomato soup चाहिए। और क्या आपके पास grilled sandwich है?", english: "Yes, I want a tomato soup. And do you have a grilled sandwich?" },
      { speaker: "Waiter", hindi: "जी हाँ। क्या आप उसे भी लेना चाहती हैं?", english: "Yes. Do you want that too?" },
      { speaker: "Priya", hindi: "हाँ, please। और मुझे एक glass orange juice चाहिए।", english: "Yes, please. And I want a glass of orange juice." },
      { speaker: "Customer 2 (Vikram)", hindi: "मैं dal makhani और naan लेना चाहता हूँ।", english: "I want to have dal makhani and naan." },
      { speaker: "Waiter", hindi: "क्या आप extra butter चाहते हैं?", english: "Do you want extra butter?" },
      { speaker: "Vikram", hindi: "नहीं, मैं extra butter नहीं चाहता। मैं diet पर हूँ।", english: "No, I do not want extra butter. I am on a diet." },
      { speaker: "Waiter", hindi: "ठीक है। क्या आप dessert लेना चाहते हैं?", english: "Alright. Do you want to have dessert?" },
      { speaker: "Priya", hindi: "मैं gulab jamun लेना चाहती हूँ।", english: "I want to have gulab jamun." },
      { speaker: "Vikram", hindi: "मैं अभी कुछ और नहीं चाहता। बस पानी चाहिए।", english: "I do not want anything else right now. I just want water." },
      { speaker: "Waiter", hindi: "ज़रूर। आपका order अभी आता है।", english: "Of course. Your order is coming right away." }
    ]
  }
];

// ─── FINAL DATA OBJECT ─────────────────────────────────────────────────────────
const day11 = {
  day: 11,
  topic: {
    title: "Use of Want",
    emoji: "💫",
    cefr: "A1",
    difficulty: "elementary",
    type: "grammar"
  },
  content,
  vocabulary,
  practice,
  mockTest
};

// Add essay, story, dialogue
day11.essay = essay;
day11.story = story;
day11.dialogue = dialogue;

// ─── WRITE OUTPUT ──────────────────────────────────────────────────────────────
const OUT_PATH = path.join(__dirname, '..', 'data', 'days', 'day_11.json');
fs.writeFileSync(OUT_PATH, JSON.stringify(day11, null, 2), 'utf8');
console.log('Written to', OUT_PATH);
console.log('Vocabulary:', day11.vocabulary.length);
console.log('Practice:', day11.practice.length);
console.log('MockTest:', day11.mockTest.length);
console.log('Essays:', day11.essay.length);
console.log('Stories:', day11.story.length);
console.log('Dialogues:', day11.dialogue.length);
