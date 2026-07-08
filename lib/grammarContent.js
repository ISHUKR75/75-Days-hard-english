// Grammar Content Library — Real explanations for all 75 days
// Each entry: { explanation (Hindi+English), rules[], examples[], mistakes[], memoryTrick, vocabulary[], speakingTips[] }

import { DAYS_75_TOPICS } from './topics';

// ============================================================
// Day 1 — Basics of English
// ============================================================
export const DAY_01_CONTENT = {
  explanation: `
**English ka Basic Structure:**

Hindi mein hum kehte hain: **Subject + Verb + Object**
English mein bhi same hota hai!

🇮🇳 मैं खाना खाता हूँ।
🇬🇧 **I** eat **food**.
(Subject = I, Verb = eat, Object = food)

**Simple Present Tense ke 3 Forms:**
• I/We/You/They → base verb (eat, drink, go)
• He/She/It → verb + s/es (eats, drinks, goes)
  `,
  rules: [
    'I / We / You / They के साथ base verb — "I eat", "We go"',
    'He / She / It के साथ verb+s — "He eats", "She goes"',
    'Question बनाने के लिए: Do/Does + subject + base verb?',
    'Negative बनाने के लिए: Subject + do/does + not + base verb',
    'Facts और daily routines के लिए Simple Present use होता है',
  ],
  examples: [
    { hindi: 'मैं पानी पीता हूँ।', english: 'I drink water.', type: 'Daily Routine' },
    { hindi: 'वह स्कूल जाती है।', english: 'She goes to school.', type: 'Daily Routine' },
    { hindi: 'सूरज पूर्व से उगता है।', english: 'The sun rises in the east.', type: 'Fact' },
    { hindi: 'क्या तुम चाय पीते हो?', english: 'Do you drink tea?', type: 'Question' },
    { hindi: 'वह खाना नहीं खाती।', english: 'She does not eat food.', type: 'Negative' },
    { hindi: 'हम रोज़ पढ़ते हैं।', english: 'We study every day.', type: 'Habit' },
  ],
  mistakes: [
    { wrong: 'He eat rice.', correct: 'He eats rice.', why: 'He/She/It के साथ verb+s लगता है' },
    { wrong: 'I am go to school.', correct: 'I go to school.', why: '"Am" और base verb साथ नहीं आते' },
    { wrong: 'She don\'t like it.', correct: 'She doesn\'t like it.', why: 'She के साथ doesn\'t (does not)' },
    { wrong: 'Does he goes?', correct: 'Does he go?', why: 'Does के बाद base verb (no +s)' },
  ],
  memoryTrick: '**HE-SHE-IT = S ले लिट!** — He/She/It के साथ verb में S जोड़ दो। बाकी सब (I, We, You, They) base form।',
  vocabulary: [
    { word: 'Usually', hindi: 'आमतौर पर', example: 'I usually wake up at 7.' },
    { word: 'Always', hindi: 'हमेशा', example: 'She always helps others.' },
    { word: 'Often', hindi: 'अक्सर', example: 'They often play cricket.' },
    { word: 'Sometimes', hindi: 'कभी-कभी', example: 'He sometimes cooks food.' },
    { word: 'Never', hindi: 'कभी नहीं', example: 'I never lie.' },
    { word: 'Rarely', hindi: 'शायद ही', example: 'She rarely goes out.' },
    { word: 'Daily', hindi: 'रोज़', example: 'We exercise daily.' },
    { word: 'Frequently', hindi: 'बार-बार', example: 'He frequently travels.' },
  ],
  speakingTips: [
    'रोज़ 5 sentences simple present में बोलने की आदत बनाओ',
    'अपनी daily routine को English में describe करो',
    '"I wake up, I brush my teeth, I eat breakfast..." — इस तरह practice करो',
  ],
};

// ============================================================
// Day 2 — Self Introduction
// ============================================================
export const DAY_02_CONTENT = {
  explanation: `
**Self Introduction — खुद को कैसे Present करें:**

Interview हो, नया दोस्त बनाना हो, या ऑफिस में पहला दिन —
Introduction ही पहली impression बनाता है।

**Basic Template:**
"My name is [Name]. I am from [City]. I am a [Profession/Student].
I have been [doing something] for [time]. I like [hobby]."

**Formal vs Informal:**
- Formal (Interview): "I would like to introduce myself..."
- Informal (Friends): "Hi, I'm Rahul. What's your name?"
  `,
  rules: [
    'नाम बताने के लिए: My name is... / I am... / I\'m...',
    'शहर बताने के लिए: I am from... / I belong to... / I come from...',
    'काम बताने के लिए: I work as... / I am a... / I am working at...',
    'Hobby: I like/love/enjoy + verb+ing',
    'Experience: I have been + verb+ing + for + time',
  ],
  examples: [
    { hindi: 'मेरा नाम प्रिया है।', english: 'My name is Priya.', type: 'Name' },
    { hindi: 'मैं दिल्ली से हूँ।', english: 'I am from Delhi.', type: 'City' },
    { hindi: 'मैं एक IT इंजीनियर हूँ।', english: 'I am an IT engineer.', type: 'Job' },
    { hindi: 'मुझे पढ़ना पसंद है।', english: 'I like reading.', type: 'Hobby' },
    { hindi: 'मेरे परिवार में 4 लोग हैं।', english: 'There are 4 people in my family.', type: 'Family' },
    { hindi: 'आपसे मिलकर खुशी हुई।', english: 'Nice to meet you.', type: 'Greeting' },
  ],
  mistakes: [
    { wrong: 'I am belong to Delhi.', correct: 'I belong to Delhi.', why: '"Am" + belong साथ नहीं आते' },
    { wrong: 'My name Rahul.', correct: 'My name is Rahul.', why: '"is" ज़रूरी है' },
    { wrong: 'I am doing job in TCS.', correct: 'I work at TCS.', why: 'Work at company (not doing job in)' },
    { wrong: 'I like to reading.', correct: 'I like reading.', why: 'like + verb+ing (no "to" before -ing)' },
  ],
  memoryTrick: '**NAME-PLACE-PROFESSION-HOBBY = NPPH** — इस order में introduce करो, कभी नहीं भूलोगे!',
  vocabulary: [
    { word: 'Introduce', hindi: 'परिचय देना', example: 'Let me introduce myself.' },
    { word: 'Profession', hindi: 'पेशा', example: 'My profession is engineering.' },
    { word: 'Hobby', hindi: 'शौक', example: 'My hobby is painting.' },
    { word: 'Background', hindi: 'पृष्ठभूमि', example: 'I have a technical background.' },
    { word: 'Passionate', hindi: 'जोशीला', example: 'I am passionate about learning.' },
    { word: 'Currently', hindi: 'फिलहाल', example: 'I am currently studying MBA.' },
    { word: 'Experience', hindi: 'अनुभव', example: 'I have 3 years of experience.' },
    { word: 'Aspire', hindi: 'आकांक्षा रखना', example: 'I aspire to become a manager.' },
  ],
  speakingTips: [
    '30-second, 1-minute, aur 2-minute introduction taiyar rakho',
    'Mirror ke saamne khade hokar practice karo',
    'Confident voice, eye contact, aur smile — teen zaroori cheezein',
  ],
};

// ============================================================
// Day 3 — Imperative Sentences
// ============================================================
export const DAY_03_CONTENT = {
  explanation: `
**Imperative Sentences — आदेश, अनुरोध, सलाह:**

Imperative sentences woh hote hain jo:
- Command dete hain: "Sit down!"
- Request karte hain: "Please help me."
- Advice dete hain: "Drink water daily."
- Warning dete hain: "Do not touch!"

**Subject hamesha "You" hota hai (lekin bolte nahi)**

🇮🇳 बंद करो दरवाज़ा।
🇬🇧 Close the door.
(You = hidden subject)
  `,
  rules: [
    'Positive: Base verb से shuru karo — "Open, Close, Come, Go"',
    'Polite: Please + base verb — "Please sit down"',
    'Negative: Do not / Don\'t + base verb — "Don\'t run"',
    'Warning: Never + base verb — "Never lie"',
    'Suggestion: Let\'s + base verb — "Let\'s go" (invitation)',
  ],
  examples: [
    { hindi: 'दरवाज़ा खोलो।', english: 'Open the door.', type: 'Command' },
    { hindi: 'कृपया बैठ जाइए।', english: 'Please have a seat.', type: 'Polite' },
    { hindi: 'शोर मत करो।', english: 'Do not make noise.', type: 'Negative' },
    { hindi: 'कभी झूठ मत बोलो।', english: 'Never lie.', type: 'Warning' },
    { hindi: 'चलो खाना खाएं।', english: "Let's eat.", type: 'Suggestion' },
    { hindi: 'अपना ख्याल रखो।', english: 'Take care of yourself.', type: 'Advice' },
  ],
  mistakes: [
    { wrong: 'You open the door.', correct: 'Open the door.', why: 'Imperative में "You" नहीं बोलते' },
    { wrong: 'Don\'t to run.', correct: "Don't run.", why: "Don't के बाद 'to' नहीं आता" },
    { wrong: 'Please to sit.', correct: 'Please sit.', why: "Please के बाद 'to' नहीं आता" },
    { wrong: 'Not go there.', correct: "Don't go there.", why: "Negative में 'Do not / Don't' लगाओ" },
  ],
  memoryTrick: '**JUMP!** — Just Use Meaningful Phrase! Imperative = सीधे verb से शुरू। No subject needed.',
  vocabulary: [
    { word: 'Command', hindi: 'आदेश', example: '"Stand up!" is a command.' },
    { word: 'Request', hindi: 'अनुरोध', example: '"Please help me." is a request.' },
    { word: 'Warning', hindi: 'चेतावनी', example: '"Be careful!" is a warning.' },
    { word: 'Instruction', hindi: 'निर्देश', example: 'Follow the instructions.' },
    { word: 'Permit', hindi: 'अनुमति देना', example: 'You may leave now.' },
    { word: 'Forbid', hindi: 'मना करना', example: 'Smoking is forbidden here.' },
    { word: 'Advise', hindi: 'सलाह देना', example: 'I advise you to rest.' },
    { word: 'Polite', hindi: 'विनम्र', example: 'Always be polite.' },
  ],
  speakingTips: [
    'Office mein polite imperatives use karo: "Could you please...?"',
    'Tone important hai — same words, alag tone = alag meaning!',
    'Emergency mein: short, loud, clear imperatives use karo',
  ],
};

// ============================================================
// Day 4 — Be Verb
// ============================================================
export const DAY_04_CONTENT = {
  explanation: `
**Be Verb — am/is/are/was/were:**

"Be" verb English ki sabse important verb hai!
Iske bina koi sentence complete nahi hota.

**Present:**
| Subject | Be Verb |
|---------|---------|
| I       | am      |
| He/She/It | is   |
| You/We/They | are |

**Past:**
| Subject | Be Verb |
|---------|---------|
| I/He/She/It | was |
| You/We/They | were |
  `,
  rules: [
    'I → am (always, no exception)',
    'He/She/It + singular noun → is',
    'You/We/They + plural noun → are',
    'Past singular (I/He/She/It) → was',
    'Past plural (You/We/They) → were',
    'Question: Am/Is/Are + subject + ...?',
    'Negative: subject + am/is/are + not',
  ],
  examples: [
    { hindi: 'मैं खुश हूँ।', english: 'I am happy.', type: 'am + adjective' },
    { hindi: 'वह एक डॉक्टर है।', english: 'He is a doctor.', type: 'is + profession' },
    { hindi: 'हम भारतीय हैं।', english: 'We are Indians.', type: 'are + nationality' },
    { hindi: 'मैं कल बीमार था।', english: 'I was sick yesterday.', type: 'was + adjective (past)' },
    { hindi: 'वे कल यहाँ थे।', english: 'They were here yesterday.', type: 'were + place (past)' },
    { hindi: 'क्या तुम तैयार हो?', english: 'Are you ready?', type: 'Question' },
  ],
  mistakes: [
    { wrong: 'I is a student.', correct: 'I am a student.', why: 'I के साथ हमेशा "am"' },
    { wrong: 'He are a teacher.', correct: 'He is a teacher.', why: 'He के साथ "is"' },
    { wrong: 'They was happy.', correct: 'They were happy.', why: 'They के साथ "were" (past)' },
    { wrong: 'She were at home.', correct: 'She was at home.', why: 'She के साथ "was" (past)' },
  ],
  memoryTrick: '**"Am I? Is he? Are they?" — AIA = A I A** याद रखो:\n• "A"m — I\n• "I"s — He/She/It\n• "A"re — You/We/They',
  vocabulary: [
    { word: 'Tired', hindi: 'थका हुआ', example: 'I am tired after work.' },
    { word: 'Confident', hindi: 'आत्मविश्वासी', example: 'She is very confident.' },
    { word: 'Excited', hindi: 'उत्साहित', example: 'We are excited about the trip.' },
    { word: 'Nervous', hindi: 'घबराया हुआ', example: 'He was nervous in the interview.' },
    { word: 'Proud', hindi: 'गर्वित', example: 'I am proud of you.' },
    { word: 'Disappointed', hindi: 'निराश', example: 'She was disappointed with results.' },
    { word: 'Enthusiastic', hindi: 'उत्साही', example: 'They are enthusiastic learners.' },
    { word: 'Determined', hindi: 'दृढ़ निश्चयी', example: 'You are very determined.' },
  ],
  speakingTips: [
    'Daily describe yourself: "I am [adjective] today because..."',
    'Describe others around you in English',
    'Weather, feelings, locations — be verb se sab describe hota hai',
  ],
};

// ============================================================
// Day 5 — Demonstrative Pronouns
// ============================================================
export const DAY_05_CONTENT = {
  explanation: `
**Demonstrative Pronouns — This/That/These/Those:**

| Distance | Singular | Plural |
|----------|----------|--------|
| Near     | **This** | **These** |
| Far      | **That** | **Those** |

🇮🇳 यह मेरी किताब है। (पास)
🇬🇧 **This** is my book.

🇮🇳 वह घर बड़ा है। (दूर)
🇬🇧 **That** house is big.

🇮🇳 ये मेरे कपड़े हैं। (पास + plural)
🇬🇧 **These** are my clothes.

🇮🇳 वे पेड़ पुराने हैं। (दूर + plural)
🇬🇧 **Those** trees are old.
  `,
  rules: [
    'This = nearby singular (यह/ये for singular)',
    'That = far singular (वह far object)',
    'These = nearby plural (ये सब पास वाले)',
    'Those = far plural (वे सब दूर वाले)',
    'This/That + singular verb (is/was)',
    'These/Those + plural verb (are/were)',
  ],
  examples: [
    { hindi: 'यह मेरा फोन है।', english: 'This is my phone.', type: 'This (near, singular)' },
    { hindi: 'वह एक बड़ा पेड़ है।', english: 'That is a big tree.', type: 'That (far, singular)' },
    { hindi: 'ये मेरी किताबें हैं।', english: 'These are my books.', type: 'These (near, plural)' },
    { hindi: 'वे लड़के शोर मचा रहे हैं।', english: 'Those boys are making noise.', type: 'Those (far, plural)' },
    { hindi: 'क्या यह सही है?', english: 'Is this correct?', type: 'Question with This' },
    { hindi: 'ये दिन बहुत अच्छे थे।', english: 'Those days were very good.', type: 'Those (past)' },
  ],
  mistakes: [
    { wrong: 'This books are good.', correct: 'These books are good.', why: 'Plural के लिए These' },
    { wrong: 'Those is my bag.', correct: 'That is my bag.', why: 'Singular far के लिए That' },
    { wrong: 'This are my friends.', correct: 'These are my friends.', why: 'Plural के साथ These' },
    { wrong: 'These book is heavy.', correct: 'This book is heavy.', why: 'Singular के साथ This' },
  ],
  memoryTrick: '**TNTP: "Two Near, Two Far"**\n• Near: This (1), These (many)\n• Far: That (1), Those (many)\nYaad rakho: THiS = Small S = Singular | TheSE = Long SE = Several',
  vocabulary: [
    { word: 'Nearby', hindi: 'पास में', example: 'The school is nearby.' },
    { word: 'Distant', hindi: 'दूर', example: 'That is a distant city.' },
    { word: 'Adjacent', hindi: 'बगल में', example: 'This is the adjacent room.' },
    { word: 'Specific', hindi: 'विशेष', example: 'This specific topic is important.' },
    { word: 'Particular', hindi: 'खास', example: 'That particular student is brilliant.' },
    { word: 'Former', hindi: 'पहला वाला', example: 'The former option is better.' },
    { word: 'Latter', hindi: 'बाद वाला', example: 'I prefer the latter choice.' },
    { word: 'Above', hindi: 'ऊपर वाला', example: 'Those above rules apply here.' },
  ],
  speakingTips: [
    'Around you jo bhi dikhe, wo sab describe karo (This is..., That is...)',
    'Shopping karte waqt: "I want this one" / "Can I see that one?"',
    'Office mein: "This report is ready" / "Those files are pending"',
  ],
};

// ============================================================
// Day 6 — Has / Have
// ============================================================
export const DAY_06_CONTENT = {
  explanation: `
**Has / Have — Possession & Present Perfect:**

**Use 1: Possession (Kisi ke paas hona)**
| Subject | Verb |
|---------|------|
| I/You/We/They | have |
| He/She/It | has |

🇮🇳 मेरे पास एक गाड़ी है।
🇬🇧 I **have** a car.

🇮🇳 उसके पास टाइम है।
🇬🇧 He **has** time.

**Use 2: Experience (kabhi kiya hai?)**
🇬🇧 I **have** visited Delhi.
🇬🇧 She **has** eaten sushi.
  `,
  rules: [
    'I/You/We/They → have',
    'He/She/It → has',
    'Possession: I have + noun',
    'Experience: I have + past participle (visited, eaten, seen)',
    'Question: Do/Does + subject + have...?',
    'Negative: Subject + do/does + not + have',
    'Got: "I have got" = "I have" (British English)',
  ],
  examples: [
    { hindi: 'मेरे पास एक नई गाड़ी है।', english: 'I have a new car.', type: 'have + possession' },
    { hindi: 'उसके दो बच्चे हैं।', english: 'She has two children.', type: 'has + possession' },
    { hindi: 'क्या तुम्हारे पास पेन है?', english: 'Do you have a pen?', type: 'Question' },
    { hindi: 'उसके पास कोई जानकारी नहीं है।', english: 'He has no information.', type: 'Negative' },
    { hindi: 'हमारे पास बहुत काम है।', english: 'We have a lot of work.', type: 'have + noun' },
    { hindi: 'इस कमरे में AC है।', english: 'This room has an AC.', type: 'has + feature' },
  ],
  mistakes: [
    { wrong: 'He have a car.', correct: 'He has a car.', why: 'He/She/It के साथ has' },
    { wrong: 'I has two books.', correct: 'I have two books.', why: 'I/You/We/They के साथ have' },
    { wrong: 'Does he has time?', correct: 'Does he have time?', why: 'Does के बाद base verb (have, not has)' },
    { wrong: 'I have got lots of works.', correct: 'I have a lot of work.', why: '"work" uncountable है, "works" गलत' },
  ],
  memoryTrick: '**"HE HAS, YOU HAVE"** — He/She/It के साथ HAS (छोटा word = singular)\nI/You/We/They के साथ HAVE (बड़ा group = बड़ा word)',
  vocabulary: [
    { word: 'Possess', hindi: 'स्वामित्व रखना', example: 'She possesses great skills.' },
    { word: 'Own', hindi: 'खुद का होना', example: 'He owns a restaurant.' },
    { word: 'Belong to', hindi: 'का होना', example: 'This bag belongs to me.' },
    { word: 'Afford', hindi: 'खर्च उठा सकना', example: 'Can you afford this house?' },
    { word: 'Lack', hindi: 'कमी होना', example: 'He lacks confidence.' },
    { word: 'Obtain', hindi: 'प्राप्त करना', example: 'She obtained a visa.' },
    { word: 'Acquire', hindi: 'हासिल करना', example: 'I want to acquire new skills.' },
    { word: 'Retain', hindi: 'बनाए रखना', example: 'Retain your composure.' },
  ],
  speakingTips: [
    'Apni assets describe karo: "I have a laptop, a phone, and..." ',
    'Interview mein: "I have 3 years of experience in..."',
    'Offer karo: "I have something for you" / "Do you have time?"',
  ],
};

// ============================================================
// Day 7 — Had (Past Possession & Past Perfect)
// ============================================================
export const DAY_07_CONTENT = {
  explanation: `
**Had — Past mein kisi ke paas kuch tha / Past Perfect:**

"Had" = "Have/Has" ka past form
Sabke liye same: I/He/She/We/They → **had**

**Use 1: Past Possession**
🇮🇳 मेरे पास पहले एक साइकिल थी।
🇬🇧 I **had** a bicycle before.

**Use 2: Past Perfect (ek action dusre se pehle hua)**
🇮🇳 जब वह आया, मैं खाना खा चुका था।
🇬🇧 When he came, I **had** already eaten.

**Use 3: Conditional (काश...)**
🇮🇳 काश मेरे पास पैसे होते!
🇬🇧 I wish I **had** money!
  `,
  rules: [
    'Had = have/has का past tense (सभी subjects के साथ)',
    'Possession in past: I/He/She/They + had + noun',
    'Negative: Subject + had + not (hadn\'t)',
    'Question: Had + subject + ...?',
    'Past Perfect: subject + had + past participle (eaten, gone, done)',
    '"Had better" = should (I had better go now = I should go now)',
  ],
  examples: [
    { hindi: 'मेरे पास एक पुरानी घड़ी थी।', english: 'I had an old watch.', type: 'Past Possession' },
    { hindi: 'क्या तुम्हारे पास गाड़ी थी?', english: 'Did you have a car?', type: 'Question' },
    { hindi: 'वह घर पहुँचने से पहले खा चुकी थी।', english: 'She had eaten before reaching home.', type: 'Past Perfect' },
    { hindi: 'उनके पास कोई विकल्प नहीं था।', english: 'They had no option.', type: 'Negative Possession' },
    { hindi: 'हमें पहले कभी ऐसी समस्या नहीं थी।', english: 'We had never had such a problem.', type: 'Past Perfect Negative' },
    { hindi: 'उसने अपना काम खत्म कर लिया था।', english: 'He had finished his work.', type: 'Past Perfect' },
  ],
  mistakes: [
    { wrong: 'I had went there.', correct: 'I had gone there.', why: 'Had के बाद Past Participle (gone, not went)' },
    { wrong: 'She have had a bag.', correct: 'She had a bag.', why: 'Past में सिर्फ "had"' },
    { wrong: 'Did he had money?', correct: 'Did he have money?', why: 'Did के बाद base verb "have" (not had)' },
    { wrong: 'I had seen him yesterday.', correct: 'I saw him yesterday.', why: 'Simple past enough when no sequence' },
  ],
  memoryTrick: '**"Had = Have ka Dada"** — Had सबसे पुराना है, सबसे पहले हुई चीज़ बताता है।\nHAD = Happened After (some other) Date',
  vocabulary: [
    { word: 'Previously', hindi: 'पहले', example: 'I had previously worked there.' },
    { word: 'Already', hindi: 'पहले से', example: 'She had already left.' },
    { word: 'Just', hindi: 'अभी-अभी', example: 'He had just arrived.' },
    { word: 'Yet', hindi: 'अभी तक', example: "They hadn't started yet." },
    { word: 'By then', hindi: 'तब तक', example: 'By then, I had learned a lot.' },
    { word: 'Once', hindi: 'एक बार', example: 'Once he had finished, he left.' },
    { word: 'Formerly', hindi: 'पहले के समय', example: 'I had formerly lived here.' },
    { word: 'Prior to', hindi: 'से पहले', example: 'Prior to joining, I had studied.' },
  ],
  speakingTips: [
    'Story sunate waqt "had" use karo: "When I was young, I had..."',
    'Interview story: "Before this job, I had worked at..."',
    'Sequence explain karo: "By the time they arrived, we had already..."',
  ],
};

// ============================================================
// Days 8-75 content (abbreviated — full content follows pattern above)
// ============================================================

export const DAY_08_CONTENT = {
  explanation: `
**Will Have — Future Perfect Tense:**

Yeh tense ek aisi future activity batata hai jo ek certain future time se PEHLE complete ho jayegi.

**Structure:**
Subject + **will have** + Past Participle (V3)

🇮🇳 कल शाम तक वह काम खत्म कर चुका होगा।
🇬🇧 By tomorrow evening, he **will have finished** the work.

**Key words: By, By the time, Before, Until**
  `,
  rules: [
    'Will have + Past Participle (V3)',
    'Sabhi subjects ke saath same: I/He/She/We/They + will have',
    'Negative: Subject + will + not + have + V3',
    'Question: Will + subject + have + V3?',
    '"By" + time expression = most common trigger',
    'Perfect tense ka main feature = completion BEFORE a future time',
  ],
  examples: [
    { hindi: 'अगले साल तक मैं English fluent हो जाऊँगा।', english: 'By next year, I will have become fluent in English.', type: 'Personal Goal' },
    { hindi: 'कल तक वह किताब पढ़ चुकी होगी।', english: 'By tomorrow, she will have read the book.', type: 'By + time' },
    { hindi: 'जब तुम आओगे, हम खाना खा चुके होंगे।', english: 'By the time you come, we will have eaten.', type: 'By the time' },
    { hindi: 'क्या आप तब तक तैयार हो जाएंगे?', english: 'Will you have been ready by then?', type: 'Question' },
    { hindi: 'वह अगले महीने तक 5 projects पूरे कर चुकी होगी।', english: 'She will have completed 5 projects by next month.', type: 'Achievement' },
    { hindi: '2030 तक यह शहर बहुत बदल चुका होगा।', english: 'By 2030, this city will have changed a lot.', type: 'Future Prediction' },
  ],
  mistakes: [
    { wrong: 'I will have went there.', correct: 'I will have gone there.', why: 'Will have + Past Participle (gone not went)' },
    { wrong: 'By tomorrow, he will finished.', correct: 'By tomorrow, he will have finished.', why: '"will have" + V3 required' },
    { wrong: 'She will has done it.', correct: 'She will have done it.', why: 'Will के बाद always "have" (not has)' },
    { wrong: 'Will have you eaten?', correct: 'Will you have eaten?', why: 'Question: Will + subject + have + V3' },
  ],
  memoryTrick: '**"By + Time = Will Have Done"** — जब भी "तब तक" या "by" आए, Future Perfect समझो।',
  vocabulary: [
    { word: 'Complete', hindi: 'पूरा करना', example: 'I will have completed the task.' },
    { word: 'Achieve', hindi: 'हासिल करना', example: 'She will have achieved her goal.' },
    { word: 'Graduate', hindi: 'डिग्री पाना', example: 'He will have graduated by June.' },
    { word: 'Retire', hindi: 'रिटायर होना', example: 'She will have retired by then.' },
    { word: 'Accomplish', hindi: 'सफलतापूर्वक करना', example: 'We will have accomplished it.' },
    { word: 'Expire', hindi: 'समाप्त होना', example: 'The offer will have expired.' },
    { word: 'Launch', hindi: 'शुरू करना', example: 'They will have launched it.' },
    { word: 'Submit', hindi: 'जमा करना', example: 'You will have submitted the form.' },
  ],
  speakingTips: [
    '"By the time" wale sentences practice karo',
    'Planning meetings mein use karo: "By Friday, I will have..."',
    'Predictions: "In 10 years, AI will have changed everything"',
  ],
};

export const DAY_09_CONTENT = {
  explanation: `
**There is / There are — Existence batana:**

"There is/are" ka use hota hai jab hum batate hain ki koi cheez **exist karti hai** ya **kisi jagah hai**.

🇮🇳 मेज़ पर एक किताब है।
🇬🇧 **There is** a book on the table.

🇮🇳 पार्क में बहुत बच्चे हैं।
🇬🇧 **There are** many children in the park.

**Key:** Subject ke hisaab se verb decide hoti hai
- Singular noun → There **is**
- Plural noun → There **are**
  `,
  rules: [
    'There + is + singular noun + place/time',
    'There + are + plural noun + place/time',
    'Past: There was (singular) / There were (plural)',
    'Future: There will be + noun',
    'Negative: There is no... / There are no... / There is not any...',
    'Question: Is there...? / Are there...?',
    '"There" = existential placeholder (real subject baad mein aata hai)',
  ],
  examples: [
    { hindi: 'फ्रिज में दूध है।', english: 'There is milk in the fridge.', type: 'There is' },
    { hindi: 'बस में 50 सीटें हैं।', english: 'There are 50 seats in the bus.', type: 'There are' },
    { hindi: 'कोई समस्या नहीं है।', english: 'There is no problem.', type: 'Negative' },
    { hindi: 'क्या यहाँ कोई होटल है?', english: 'Is there a hotel here?', type: 'Question' },
    { hindi: 'उस घर में 3 कमरे थे।', english: 'There were 3 rooms in that house.', type: 'There were (past)' },
    { hindi: 'कल एक मीटिंग होगी।', english: 'There will be a meeting tomorrow.', type: 'There will be' },
  ],
  mistakes: [
    { wrong: 'There is many students.', correct: 'There are many students.', why: 'Many students = plural → are' },
    { wrong: 'There are a dog.', correct: 'There is a dog.', why: 'A dog = singular → is' },
    { wrong: 'There have some books.', correct: 'There are some books.', why: '"have" नहीं, "are" use करो' },
    { wrong: 'Is there any chairs?', correct: 'Are there any chairs?', why: 'Chairs = plural → Are there?' },
  ],
  memoryTrick: '**"S = S"** — Singular noun → There **i**S (S for Singular)\nPlural noun → There **are** (A for All/plural)',
  vocabulary: [
    { word: 'Available', hindi: 'उपलब्ध', example: 'Is there parking available?' },
    { word: 'Sufficient', hindi: 'पर्याप्त', example: 'There is sufficient food.' },
    { word: 'Numerous', hindi: 'बहुत सारे', example: 'There are numerous options.' },
    { word: 'Adequate', hindi: 'उचित', example: 'There is adequate space.' },
    { word: 'Vacant', hindi: 'खाली', example: 'Is there a vacant seat?' },
    { word: 'Shortage', hindi: 'कमी', example: 'There is a shortage of water.' },
    { word: 'Abundance', hindi: 'बहुलता', example: 'There is an abundance of talent.' },
    { word: 'Existence', hindi: 'अस्तित्व', example: 'There is evidence of life.' },
  ],
  speakingTips: [
    'Kisi jagah describe karte waqt: "There is a park near my house"',
    'Problems batate waqt: "There is a problem with this"',
    'Options batate waqt: "There are many ways to learn English"',
  ],
};

// (CONTENT_MAP and exports moved to end of file — after all content declarations)

// ============================================================
// Day 10 — Revision + Practice (Days 1-9 Mixed Review)
// ============================================================
export const DAY_10_CONTENT = {
  explanation: `
**Revision Day — Days 1-9 ka Quick Summary:**

आज हम पिछले 9 दिनों का revision करेंगे। हर topic का एक quick recap:

**Day 1 — Simple Present:** I eat, She eats, They go
**Day 2 — Introduction:** My name is..., I am from..., I work as...
**Day 3 — Imperatives:** Open!, Don't run!, Please sit down.
**Day 4 — Be Verb:** I am, He is, They are, I was, They were
**Day 5 — Demonstratives:** This/That (singular), These/Those (plural)
**Day 6 — Has/Have:** I have, She has, Do you have?
**Day 7 — Had:** I had, She had, Did you have?
**Day 8 — Will Have:** By tomorrow, I will have finished.
**Day 9 — There is/are:** There is a book. There are 5 chairs.
  `,
  rules: [
    'Simple Present: I/We/You/They + base verb; He/She/It + verb+s',
    'Be Verb: I am / He is / They are / I was / They were',
    'Imperatives: base verb se shuru — Open!, Don\'t run!, Please sit.',
    'Demonstratives: This/These (near), That/Those (far)',
    'Have/Has: I have / She has — Do you have? / Does she have?',
    'Had: I/He/She/They had — Did you have?',
    'Will Have: By + time + will have + V3',
    'There is/are: There is (singular), There are (plural)',
  ],
  examples: [
    { hindi: 'मैं रोज़ काम पर जाता हूँ।', english: 'I go to work every day.', type: 'Day 1 — Simple Present' },
    { hindi: 'मेरा नाम अनिल है और मैं इंजीनियर हूँ।', english: 'My name is Anil and I am an engineer.', type: 'Day 2 — Introduction' },
    { hindi: 'शोर मत करो।', english: "Don't make noise.", type: 'Day 3 — Imperative' },
    { hindi: 'वह बहुत होशियार है।', english: 'He is very intelligent.', type: 'Day 4 — Be Verb' },
    { hindi: 'ये किताबें मेरी हैं।', english: 'These books are mine.', type: 'Day 5 — Demonstrative' },
    { hindi: 'उसके पास एक बड़ी गाड़ी है।', english: 'She has a big car.', type: 'Day 6 — Has' },
    { hindi: 'पहले मेरे पास एक कुत्ता था।', english: 'Earlier I had a dog.', type: 'Day 7 — Had' },
    { hindi: 'कल तक वह पहुँच चुका होगा।', english: 'By tomorrow, he will have arrived.', type: 'Day 8 — Will Have' },
    { hindi: 'घर में तीन कमरे हैं।', english: 'There are three rooms in the house.', type: 'Day 9 — There are' },
  ],
  mistakes: [
    { wrong: 'He go to school.', correct: 'He goes to school.', why: 'He/She/It के साथ verb+s' },
    { wrong: 'I am have a car.', correct: 'I have a car.', why: '"Am" और "have" एक साथ नहीं' },
    { wrong: 'There are a problem.', correct: 'There is a problem.', why: 'Singular noun → There is' },
    { wrong: 'This books are mine.', correct: 'These books are mine.', why: 'Plural → These, not This' },
  ],
  memoryTrick: '**R-E-V-I-S-E:** Review Every Verb In Simple English! आज आप 9 topics के master हो गए!',
  vocabulary: [
    { word: 'Review', hindi: 'समीक्षा', example: 'Let us review what we learned.' },
    { word: 'Practice', hindi: 'अभ्यास', example: 'Daily practice makes perfect.' },
    { word: 'Revise', hindi: 'दोहराना', example: 'Revise your notes every day.' },
    { word: 'Master', hindi: 'महारत हासिल करना', example: 'I want to master English.' },
    { word: 'Fluent', hindi: 'धाराप्रवाह', example: 'She speaks fluent English.' },
    { word: 'Consistent', hindi: 'लगातार', example: 'Be consistent in your practice.' },
  ],
  speakingTips: [
    'आज के दिन 9 topics में से हर एक पर 2-2 sentences बोलो',
    'Mirror के सामने खड़े होकर self-introduction दो',
    'किसी दोस्त से simple English में conversation करने की कोशिश करो',
  ],
};

// ============================================================
// Day 11 — Use of Want (चाहना)
// ============================================================
export const DAY_11_CONTENT = {
  explanation: `
**Want — Present Tense में चाहना:**

"Want" = चाहना (present tense)

**Positive:**
Subject + **want/wants** + to + base verb
Subject + **want/wants** + noun

🇮🇳 मैं पानी पीना चाहता हूँ।
🇬🇧 I **want** to drink water.

🇮🇳 वह नई गाड़ी चाहती है।
🇬🇧 She **wants** a new car.

**Negative:**
Subject + **do/does not want** + to + base verb

**Question:**
**Do/Does** + subject + **want** + to + verb?
  `,
  rules: [
    'I/You/We/They → want (I want, We want)',
    'He/She/It → wants (He wants, She wants)',
    'Want + noun: "I want water" / "She wants a job"',
    'Want + to + verb: "I want to go" / "He wants to study"',
    'Negative: I do not want / She does not want',
    'Question: Do you want...? / Does she want...?',
    '"Want" stative verb hai — "I am wanting" GALAT hai!',
  ],
  examples: [
    { hindi: 'मैं English सीखना चाहता हूँ।', english: 'I want to learn English.', type: 'Want + to verb' },
    { hindi: 'वह एक अच्छी नौकरी चाहती है।', english: 'She wants a good job.', type: 'Wants + noun' },
    { hindi: 'हम छुट्टी पर जाना चाहते हैं।', english: 'We want to go on vacation.', type: 'Want + to verb' },
    { hindi: 'क्या तुम चाय पीना चाहते हो?', english: 'Do you want to have tea?', type: 'Question' },
    { hindi: 'मुझे यह नहीं चाहिए।', english: 'I do not want this.', type: 'Negative' },
    { hindi: 'बच्चे खेलना चाहते हैं।', english: 'The children want to play.', type: 'Want + to verb (plural)' },
  ],
  mistakes: [
    { wrong: 'I am wanting to go.', correct: 'I want to go.', why: '"Want" stative verb — कभी -ing form नहीं' },
    { wrong: 'She want to eat.', correct: 'She wants to eat.', why: 'She के साथ wants (verb+s)' },
    { wrong: 'I want that she comes.', correct: 'I want her to come.', why: 'Want + object + to + verb (not want that...)' },
    { wrong: 'Does he wants money?', correct: 'Does he want money?', why: 'Does के बाद base verb (want, not wants)' },
  ],
  memoryTrick: '**WANT = चाहना** — Simple rule: "I want + TO + verb" OR "I want + noun". कभी want+ing मत करो!',
  vocabulary: [
    { word: 'Want', hindi: 'चाहना', example: 'I want to be successful.' },
    { word: 'Desire', hindi: 'इच्छा', example: 'My desire is to travel the world.' },
    { word: 'Wish', hindi: 'इच्छा करना', example: 'I wish to meet you.' },
    { word: 'Crave', hindi: 'तरसना', example: 'She craves for appreciation.' },
    { word: 'Seek', hindi: 'ढूंढना', example: 'I seek a good opportunity.' },
    { word: 'Aspire', hindi: 'आकांक्षा रखना', example: 'He aspires to become a doctor.' },
    { word: 'Prefer', hindi: 'पसंद करना', example: 'I prefer coffee to tea.' },
    { word: 'Expect', hindi: 'उम्मीद करना', example: 'I expect a reply soon.' },
  ],
  speakingTips: [
    'रोज़ सुबह बोलो: "Today I want to..."',
    'Family/friends से पूछो: "Do you want to...?"',
    'Shopping mein use karo: "I want this in size medium please"',
  ],
};

// ============================================================
// Day 12 — Use of Wanted (चाहता था)
// ============================================================
export const DAY_12_CONTENT = {
  explanation: `
**Wanted — Past Tense में चाहना:**

"Wanted" = चाहता था / चाहती थी (past tense of want)
सभी subjects के साथ same: I/He/She/We/They → **wanted**

**Positive:**
Subject + **wanted** + to + base verb
Subject + **wanted** + noun

🇮🇳 मैं डॉक्टर बनना चाहता था।
🇬🇧 I **wanted** to become a doctor.

**Negative:**
Subject + **did not want** + to + base verb

**Question:**
**Did** + subject + **want** + to + verb?
  `,
  rules: [
    'Wanted — same for ALL subjects (I/He/She/We/They + wanted)',
    'Positive: I wanted to + verb / I wanted + noun',
    'Negative: I did not want / He did not want (did + not + want)',
    'Question: Did you want...? / Did she want...?',
    '"Wanted" can also mean "required/needed": "Wanted: English teacher"',
    'Difference: want (present desire) vs wanted (past desire)',
  ],
  examples: [
    { hindi: 'मैं पहले पायलट बनना चाहता था।', english: 'I wanted to become a pilot.', type: 'Wanted + to verb' },
    { hindi: 'उसने नई किताब चाही थी।', english: 'She wanted a new book.', type: 'Wanted + noun' },
    { hindi: 'क्या तुम वहाँ जाना चाहते थे?', english: 'Did you want to go there?', type: 'Question' },
    { hindi: 'हम पहले यहाँ नहीं आना चाहते थे।', english: 'We did not want to come here before.', type: 'Negative' },
    { hindi: 'वह बचपन में खिलाड़ी बनना चाहती थी।', english: 'She wanted to become a player in childhood.', type: 'Past desire' },
    { hindi: 'उन्होंने जवाब नहीं चाहा था।', english: 'They did not want an answer.', type: 'Negative past' },
  ],
  mistakes: [
    { wrong: 'I was wanting to go.', correct: 'I wanted to go.', why: 'Was + wanting = गलत। Simple "wanted" use करो' },
    { wrong: 'She wanted that I come.', correct: 'She wanted me to come.', why: 'Wanted + object + to + verb' },
    { wrong: 'Did he wanted money?', correct: 'Did he want money?', why: 'Did के बाद base verb (want, not wanted)' },
    { wrong: 'He wantted to go.', correct: 'He wanted to go.', why: 'Spelling: wanted (एक t)' },
  ],
  memoryTrick: '**"WANTED = Past WANT"** — बस want का past version है। सबके साथ same: wanted.\nDid के बाद हमेशा want (base form).',
  vocabulary: [
    { word: 'Previously', hindi: 'पहले', example: 'I previously wanted to study abroad.' },
    { word: 'Childhood', hindi: 'बचपन', example: 'In childhood, I wanted to be a cricketer.' },
    { word: 'Dream', hindi: 'सपना', example: 'My dream was to fly.' },
    { word: 'Goal', hindi: 'लक्ष्य', example: 'My goal was to get a promotion.' },
    { word: 'Aim', hindi: 'उद्देश्य', example: 'Her aim was to travel the world.' },
    { word: 'Intention', hindi: 'इरादा', example: 'My intention was good.' },
    { word: 'Ambition', hindi: 'महत्वाकांक्षा', example: 'His ambition was to start a business.' },
    { word: 'Regret', hindi: 'पछतावा', example: 'I regret not working harder.' },
  ],
  speakingTips: [
    'अपनी childhood dreams बताओ: "When I was young, I wanted to..."',
    'Past plans: "I wanted to call you but..."',
    'Interview में: "I wanted to join your company because..."',
  ],
};

// ============================================================
// Day 13 — Use of Let (होने देना / करने देना)
// ============================================================
export const DAY_13_CONTENT = {
  explanation: `
**Let — Permission & Suggestion:**

"Let" = होने देना / करने देना / अनुमति देना

**3 Main Uses:**

**Use 1: Permission देना**
Let + object + base verb
🇮🇳 मुझे जाने दो।
🇬🇧 Let me go.

**Use 2: Causative (करवाना)**
🇮🇳 उसे बोलने दो।
🇬🇧 Let him speak.

**Use 3: Suggestion (Let's)**
🇮🇳 चलो खाना खाते हैं।
🇬🇧 Let's eat. (Let us eat)
  `,
  rules: [
    'Let + object (me/him/her/them/us) + base verb (no "to")',
    'Let me + verb = मुझे [verb] करने दो',
    'Let him/her + verb = उसे [verb] करने दो',
    "Let's = Let us (suggestion for group)",
    'Negative of Let\'s: Let\'s not + verb',
    'Don\'t let + object + verb = मत करने दो',
    'Formal: Please let me know / Do not let them enter',
  ],
  examples: [
    { hindi: 'मुझे समझाने दो।', english: 'Let me explain.', type: 'Let me + verb' },
    { hindi: 'उसे जाने दो।', english: 'Let him go.', type: 'Let him + verb' },
    { hindi: 'चलो मिलकर काम करते हैं।', english: "Let's work together.", type: "Let's (suggestion)" },
    { hindi: 'मुझे एक मिनट दो।', english: 'Let me have a minute.', type: 'Let me + verb' },
    { hindi: 'उन्हें अंदर आने दो।', english: 'Let them come in.', type: 'Let them + verb' },
    { hindi: 'चलो यह भूल जाते हैं।', english: "Let's forget about it.", type: "Let's + verb" },
  ],
  mistakes: [
    { wrong: 'Let me to go.', correct: 'Let me go.', why: 'Let के बाद "to" नहीं आता' },
    { wrong: "Let's to eat.", correct: "Let's eat.", why: "Let's के बाद base verb (no to)" },
    { wrong: 'Let him going.', correct: 'Let him go.', why: 'Let + object + base verb (no -ing)' },
    { wrong: "Don't lets go.", correct: "Let's not go.", why: "Negative suggestion = Let's not + verb" },
  ],
  memoryTrick: "**LET = Allow (अनुमति)** — Let me / Let him / Let's — इनके बाद हमेशा base verb (no to, no -ing).",
  vocabulary: [
    { word: 'Allow', hindi: 'अनुमति देना', example: 'Please allow me to help.' },
    { word: 'Permit', hindi: 'अनुमति', example: 'The boss permitted early leave.' },
    { word: 'Enable', hindi: 'सक्षम करना', example: 'This will enable us to grow.' },
    { word: 'Suggest', hindi: 'सुझाव देना', example: "I suggest we leave early." },
    { word: 'Propose', hindi: 'प्रस्ताव करना', example: "Let's propose a new idea." },
    { word: 'Refuse', hindi: 'मना करना', example: 'He refused to let me in.' },
    { word: 'Grant', hindi: 'मंज़ूर करना', example: 'The manager granted permission.' },
    { word: 'Approve', hindi: 'स्वीकृति देना', example: 'The plan was approved.' },
  ],
  speakingTips: [
    'Office mein: "Let me check and get back to you."',
    'Friends ke saath: "Let\'s go for dinner tonight!"',
    'Meetings mein: "Let\'s start the meeting." / "Let me share my screen."',
  ],
};

// ============================================================
// Day 14 — Use of Let's (चलो... करते हैं)
// ============================================================
export const DAY_14_CONTENT = {
  explanation: `
**Let's — Suggestion & Invitation:**

"Let's" = "Let us" ka short form
Use hota hai jab hum kisi ko kuch karne ki **suggestion** dete hain.

🇮🇳 चलो बाहर जाते हैं।
🇬🇧 **Let's** go outside.

🇮🇳 चलो इसके बारे में बात करते हैं।
🇬🇧 **Let's** talk about this.

**Patterns:**
- Let's + base verb (positive suggestion)
- Let's not + base verb (negative suggestion)
- Shall we + base verb? (question form)
  `,
  rules: [
    "Let's = Let us (always for group/both people)",
    "Let's + base verb: Let's go, Let's eat, Let's start",
    "Let's not + verb: Let's not waste time",
    "Shall we + verb? = Let's ke question form",
    "Response: Yes, let's! / No, let's not. / Good idea!",
    "Don't confuse: Let's (suggestion) vs Let (permission)",
  ],
  examples: [
    { hindi: 'चलो English practice करते हैं।', english: "Let's practice English.", type: "Let's + verb" },
    { hindi: 'चलो एक break लेते हैं।', english: "Let's take a break.", type: "Let's + verb" },
    { hindi: 'चलो इस topic को दोबारा नहीं करते।', english: "Let's not repeat this topic.", type: "Let's not + verb" },
    { hindi: 'क्या हम मिलकर lunch करें?', english: 'Shall we have lunch together?', type: 'Shall we? (question)' },
    { hindi: 'चलो इसे मिलकर solve करते हैं।', english: "Let's solve this together.", type: "Let's + verb" },
    { hindi: 'चलो पानी पीते हैं।', english: "Let's drink some water.", type: "Let's + noun phrase" },
  ],
  mistakes: [
    { wrong: "Let's to go.", correct: "Let's go.", why: "Let's के बाद 'to' नहीं लगता" },
    { wrong: "Let's going.", correct: "Let's go.", why: "Let's के बाद base verb (-ing नहीं)" },
    { wrong: "Lets go! (no apostrophe)", correct: "Let's go!", why: "Apostrophe ज़रूरी है: Let's = Let us" },
    { wrong: "Let's not to argue.", correct: "Let's not argue.", why: "Let's not के बाद base verb" },
  ],
  memoryTrick: "**Let's = चलो!** — हिंदी में 'चलो' = English में 'Let's'. दोनों group suggestion के लिए हैं!",
  vocabulary: [
    { word: 'Together', hindi: 'मिलकर', example: "Let's do this together." },
    { word: 'Celebrate', hindi: 'जश्न मनाना', example: "Let's celebrate your success!" },
    { word: 'Collaborate', hindi: 'सहयोग करना', example: "Let's collaborate on this project." },
    { word: 'Discuss', hindi: 'चर्चा करना', example: "Let's discuss the plan." },
    { word: 'Organize', hindi: 'व्यवस्थित करना', example: "Let's organize the event." },
    { word: 'Plan', hindi: 'योजना बनाना', example: "Let's plan the trip." },
    { word: 'Begin', hindi: 'शुरू करना', example: "Let's begin the lesson." },
    { word: 'Focus', hindi: 'ध्यान देना', example: "Let's focus on the main point." },
  ],
  speakingTips: [
    "रोज़ किसी को 'Let's + verb' वाला suggestion दो",
    "Meeting में: 'Let's get started' / 'Let's move on'",
    "Informally: 'Let's hang out sometime!' / 'Let's catch up soon!'",
  ],
};

// ============================================================
// Day 15 — Would Like To (विनम्रता से चाहना)
// ============================================================
export const DAY_15_CONTENT = {
  explanation: `
**Would Like To — Polite Desire:**

"Would like to" = "Want to" का polite version
यह बहुत ही formal और विनम्र तरीका है कुछ माँगने का।

**Want vs Would Like:**
• "I want coffee." → Direct (थोड़ा rude सुनाई दे सकता है)
• "I would like coffee." → Polite ✅
• "I would like to have coffee." → More polite ✅✅

**Structure:**
Subject + **would like** + noun
Subject + **would like to** + base verb

🇮🇳 मैं एक कॉफी लेना चाहूँगा।
🇬🇧 I **would like** a coffee.
  `,
  rules: [
    'Would like = want का polite form (सबके साथ same: I/He/She/They)',
    'I would like + noun: "I would like a cup of tea"',
    'I would like to + verb: "I would like to speak to the manager"',
    'Question: Would you like...? / Would you like to...?',
    'Negative: I would not like... (very formal)',
    'Short form: I\'d like / He\'d like / She\'d like',
    'Response: Yes, please. / No, thank you.',
  ],
  examples: [
    { hindi: 'मैं एक ग्लास पानी चाहूँगा।', english: "I'd like a glass of water.", type: "Would like + noun" },
    { hindi: 'मैं आपसे मिलना चाहूँगा।', english: "I'd like to meet you.", type: "Would like to + verb" },
    { hindi: 'क्या आप कुछ खाना चाहेंगे?', english: 'Would you like something to eat?', type: 'Question' },
    { hindi: 'वह इस नौकरी के लिए apply करना चाहेगी।', english: "She'd like to apply for this job.", type: "Would like to + verb" },
    { hindi: 'हम आपकी मदद करना चाहेंगे।', english: "We'd like to help you.", type: "We'd like to + verb" },
    { hindi: 'क्या आप कॉफी या चाय लेंगे?', english: 'Would you like coffee or tea?', type: 'Choice question' },
  ],
  mistakes: [
    { wrong: 'I would like to going.', correct: "I'd like to go.", why: "'Would like to' के बाद base verb" },
    { wrong: 'Would you like to came?', correct: 'Would you like to come?', why: "'To' के बाद base verb (not past tense)" },
    { wrong: 'She would likes to go.', correct: "She'd like to go.", why: "'Would' के बाद always 'like' (no s)" },
    { wrong: 'I am liking to meet you.', correct: "I'd like to meet you.", why: "Would like — stative verb, no -ing" },
  ],
  memoryTrick: "**Would Like = Polite Want** — Restaurant/Office में हमेशा 'Would like' use करो, never just 'want'. More polite = more professional!",
  vocabulary: [
    { word: 'Polite', hindi: 'विनम्र', example: 'Always be polite with customers.' },
    { word: 'Request', hindi: 'अनुरोध', example: 'I have a request for you.' },
    { word: 'Prefer', hindi: 'पसंद करना', example: 'I prefer tea over coffee.' },
    { word: 'Recommend', hindi: 'सिफारिश करना', example: 'I would recommend this hotel.' },
    { word: 'Suggest', hindi: 'सुझाव देना', example: 'I would suggest taking a break.' },
    { word: 'Appreciate', hindi: 'आभारी होना', example: "I'd appreciate your help." },
    { word: 'Reserve', hindi: 'आरक्षित करना', example: "I'd like to reserve a table." },
    { word: 'Inquire', hindi: 'पूछताछ करना', example: "I'd like to inquire about the price." },
  ],
  speakingTips: [
    "Restaurant में: 'I'd like the chicken biryani, please.'",
    "Office में: 'I'd like to schedule a meeting with you.'",
    "Phone पर: 'I'd like to speak to Mr. Sharma, please.'",
  ],
};

// ============================================================
// Day 16 — Can (सकता हूँ / कर सकते हैं)
// ============================================================
export const DAY_16_CONTENT = {
  explanation: `
**Can — Ability, Permission, Possibility:**

"Can" के 3 main uses हैं:

**Use 1: Ability (योग्यता)**
🇮🇳 मैं तैर सकता हूँ।
🇬🇧 I **can** swim.

**Use 2: Permission (अनुमति)**
🇮🇳 क्या मैं अंदर आ सकता हूँ?
🇬🇧 **Can** I come in?

**Use 3: Possibility (संभावना)**
🇮🇳 यह हो सकता है।
🇬🇧 This **can** happen.

**Structure:**
Subject + **can** + base verb (always!)
  `,
  rules: [
    'Can + base verb (always): I can go, She can speak, They can swim',
    'All subjects: I/He/She/We/They → CAN (same, no changes)',
    'Question: Can + subject + verb?: Can you help me?',
    'Negative: Cannot / Can\'t + verb: I can\'t swim',
    'Can = ability (present), could = ability (past)',
    'Can I? = informal permission request',
    'Could I? = more polite permission request',
  ],
  examples: [
    { hindi: 'मैं अंग्रेज़ी बोल सकता हूँ।', english: 'I can speak English.', type: 'Ability' },
    { hindi: 'वह पियानो बजा सकती है।', english: 'She can play the piano.', type: 'Ability (skill)' },
    { hindi: 'क्या आप मेरी मदद कर सकते हैं?', english: 'Can you help me?', type: 'Request' },
    { hindi: 'क्या मैं यहाँ बैठ सकता हूँ?', english: 'Can I sit here?', type: 'Permission' },
    { hindi: 'मैं यह नहीं कर सकता।', english: "I can't do this.", type: 'Negative ability' },
    { hindi: 'यह कहीं भी हो सकता है।', english: 'This can happen anywhere.', type: 'Possibility' },
  ],
  mistakes: [
    { wrong: 'She cans speak English.', correct: 'She can speak English.', why: 'Can = modal verb, never adds -s' },
    { wrong: 'I can to swim.', correct: 'I can swim.', why: 'Can के बाद "to" नहीं आता' },
    { wrong: 'Can I am go?', correct: 'Can I go?', why: 'Can के बाद direct base verb' },
    { wrong: 'I not can drive.', correct: "I can't drive.", why: "Negative = can't / cannot (not 'not can')" },
  ],
  memoryTrick: '**CAN = Capability** — अगर Hindi में "सकता/सकती/सकते" है, तो English में "can" use करो। और हमेशा base verb के साथ!',
  vocabulary: [
    { word: 'Ability', hindi: 'क्षमता', example: 'I have the ability to lead.' },
    { word: 'Skill', hindi: 'कौशल', example: 'Communication skill is important.' },
    { word: 'Capable', hindi: 'सक्षम', example: 'She is capable of doing it.' },
    { word: 'Competent', hindi: 'योग्य', example: 'He is a competent engineer.' },
    { word: 'Talented', hindi: 'प्रतिभाशाली', example: 'She is a talented singer.' },
    { word: 'Fluent', hindi: 'धाराप्रवाह', example: 'I can speak fluent English.' },
    { word: 'Manage', hindi: 'संभालना', example: 'I can manage this project.' },
    { word: 'Handle', hindi: 'निपटना', example: 'She can handle any situation.' },
  ],
  speakingTips: [
    "'Can' को natural speed पर बोलो — 'kn' silent है, 'can' = /kæn/",
    "Positive: 'I can do this!' (confident tone)",
    "Office में: 'Can we schedule a meeting?' / 'Can you send me the report?'",
  ],
};

// ============================================================
// Day 17 — Should (चाहिए)
// ============================================================
export const DAY_17_CONTENT = {
  explanation: `
**Should — Advice, Duty, Expectation:**

"Should" = चाहिए / करना चाहिए

**3 Main Uses:**

**Use 1: Advice (सलाह)**
🇮🇳 तुम्हें रोज़ exercise करनी चाहिए।
🇬🇧 You **should** exercise daily.

**Use 2: Duty / Obligation (कर्तव्य)**
🇮🇳 हमें अपने माता-पिता की care करनी चाहिए।
🇬🇧 We **should** take care of our parents.

**Use 3: Expectation (उम्मीद)**
🇮🇳 वह अब तक पहुँच जाना चाहिए था।
🇬🇧 He **should** have arrived by now.
  `,
  rules: [
    'Should + base verb (same for all subjects)',
    'Positive: I/He/She/We/They + should + base verb',
    'Negative: Subject + should not (shouldn\'t) + base verb',
    'Question: Should + subject + verb?',
    'Advice: "You should drink more water."',
    'Should have + V3 = past regret/criticism',
    'Weaker than "must" — suggestion, not strict obligation',
  ],
  examples: [
    { hindi: 'तुम्हें ज़्यादा पानी पीना चाहिए।', english: 'You should drink more water.', type: 'Health advice' },
    { hindi: 'हमें समय पर पहुँचना चाहिए।', english: 'We should arrive on time.', type: 'Obligation' },
    { hindi: 'क्या मुझे यह job लेनी चाहिए?', english: 'Should I take this job?', type: 'Asking advice' },
    { hindi: 'उसे माफ़ी माँगनी चाहिए।', english: 'He should apologize.', type: 'Moral duty' },
    { hindi: 'तुम्हें अपना homework करना चाहिए।', english: 'You should do your homework.', type: 'Advice to student' },
    { hindi: 'तुम्हें ऐसा नहीं कहना चाहिए था।', english: 'You should not have said that.', type: 'Past criticism' },
  ],
  mistakes: [
    { wrong: 'She shoulds go.', correct: 'She should go.', why: 'Modal verbs never take -s' },
    { wrong: 'I should to eat.', correct: 'I should eat.', why: "Should के बाद 'to' नहीं" },
    { wrong: 'You should went.', correct: 'You should have gone.', why: "Past regret = should have + V3" },
    { wrong: 'Should I to study?', correct: 'Should I study?', why: 'Should के बाद base verb' },
  ],
  memoryTrick: '**SHOULD = चाहिए** — जब Hindi में "चाहिए" आए, English में "should" use करो। + हमेशा base verb!',
  vocabulary: [
    { word: 'Advice', hindi: 'सलाह', example: 'Take the advice of your mentor.' },
    { word: 'Recommend', hindi: 'सिफारिश', example: 'I recommend you should study daily.' },
    { word: 'Suggest', hindi: 'सुझाव देना', example: 'I suggest you should sleep early.' },
    { word: 'Obligate', hindi: 'बाध्य करना', example: 'We are obligated to follow rules.' },
    { word: 'Appropriate', hindi: 'उचित', example: 'This is the appropriate time to act.' },
    { word: 'Ideal', hindi: 'आदर्श', example: 'You should find the ideal solution.' },
    { word: 'Responsible', hindi: 'ज़िम्मेदार', example: 'We should be responsible citizens.' },
    { word: 'Beneficial', hindi: 'लाभकारी', example: 'Exercise is beneficial for health.' },
  ],
  speakingTips: [
    "Advice देते वक्त: 'You should try this restaurant.'",
    "Polite suggestion: 'I think you should...' (softer than should alone)",
    "Self-reminder: 'I should call my parents today.'",
  ],
};

// ============================================================
// Day 18 — May (शायद / हो सकता है)
// ============================================================
export const DAY_18_CONTENT = {
  explanation: `
**May — Possibility & Formal Permission:**

"May" के 2 main uses हैं:

**Use 1: Possibility (शायद होना)**
🇮🇳 कल बारिश हो सकती है।
🇬🇧 It **may** rain tomorrow.

**Use 2: Formal Permission**
🇮🇳 क्या मैं अंदर आ सकता हूँ? (formal)
🇬🇧 **May** I come in?

**May vs Might:**
• May = 50% chance (थोड़ा ज़्यादा possible)
• Might = 30% chance (थोड़ा कम possible)

"May I?" = very polite, formal permission
"Can I?" = informal, casual permission
  `,
  rules: [
    'May + base verb (all subjects: I/He/She/We/They)',
    'Possibility: It may rain. She may come. (50% chance)',
    'Permission (formal): May I help you? May I come in?',
    'Negative: may not + verb: It may not work.',
    'May have + V3 = possibility about past: He may have left.',
    'More formal than "can" for permission',
    'In written English, prefer "may" over "might" for higher probability',
  ],
  examples: [
    { hindi: 'कल मीटिंग cancel हो सकती है।', english: 'The meeting may be cancelled tomorrow.', type: 'Possibility (future)' },
    { hindi: 'क्या मैं आपकी फ़ाइल देख सकता हूँ?', english: 'May I see your file?', type: 'Formal permission' },
    { hindi: 'शायद वह आज नहीं आएगा।', english: 'He may not come today.', type: 'Negative possibility' },
    { hindi: 'वह शायद ऑफिस में हो।', english: 'She may be in the office.', type: 'Present possibility' },
    { hindi: 'क्या मैं यह question पूछ सकता हूँ?', english: 'May I ask a question?', type: 'Formal permission' },
    { hindi: 'शायद उसने call कर लिया हो।', english: 'He may have called.', type: 'Past possibility' },
  ],
  mistakes: [
    { wrong: 'She mays come.', correct: 'She may come.', why: 'Modal verbs never take -s' },
    { wrong: 'May I to enter?', correct: 'May I enter?', why: "May के बाद 'to' नहीं" },
    { wrong: 'It may rains.', correct: 'It may rain.', why: 'May के बाद base verb (no -s)' },
    { wrong: 'I may can go.', correct: 'I may go.', why: 'Two modals एक साथ नहीं' },
  ],
  memoryTrick: "**MAY = शायद (50%)** — 'May' जब Indian weather forecast देखो: 'It MAY rain' — सच भी हो सकता है, नहीं भी!",
  vocabulary: [
    { word: 'Possibility', hindi: 'संभावना', example: 'There is a possibility of rain.' },
    { word: 'Perhaps', hindi: 'शायद', example: 'Perhaps she is right.' },
    { word: 'Probably', hindi: 'संभवतः', example: 'He will probably come.' },
    { word: 'Uncertain', hindi: 'अनिश्चित', example: 'The situation is uncertain.' },
    { word: 'Likely', hindi: 'संभव', example: 'It is likely to rain.' },
    { word: 'Permission', hindi: 'अनुमति', example: 'I need permission to leave.' },
    { word: 'Formal', hindi: 'औपचारिक', example: 'Use formal language in emails.' },
    { word: 'Opportunity', hindi: 'अवसर', example: 'This may be a great opportunity.' },
  ],
  speakingTips: [
    "Formal meetings में: 'May I add something here?'",
    "Uncertainty express करने के लिए: 'I may be late today'",
    "Emails में: 'This may cause a delay. Please let me know.'",
  ],
};

// ============================================================
// Day 19 — Must (ज़रूर / अवश्य)
// ============================================================
export const DAY_19_CONTENT = {
  explanation: `
**Must — Strong Obligation & Certainty:**

"Must" के 2 main uses हैं:

**Use 1: Strong Obligation (ज़रूरी है)**
🇮🇳 तुम्हें यह ज़रूर करना होगा।
🇬🇧 You **must** do this.

**Use 2: Logical Certainty (निश्चित रूप से)**
🇮🇳 वह ज़रूर थका होगा।
🇬🇧 He **must** be tired.

**Must vs Should vs Have to:**
• Must = internal obligation (मैं खुद महसूस करता हूँ)
• Have to = external obligation (rule/someone says so)
• Should = mild advice

🇮🇳 मुझे exercise करनी ही है। (खुद decide किया)
🇬🇧 I **must** exercise.
  `,
  rules: [
    'Must + base verb (all subjects, no -s)',
    'Strong obligation: You must submit by Friday.',
    'Certainty: She must be the manager. (logical deduction)',
    'Negative: must not / mustn\'t = absolutely forbidden',
    'Must not ≠ do not have to (different meaning!)',
    'Must have + V3 = certainty about past: He must have left early.',
    'No past tense of must — use "had to" for past obligation',
  ],
  examples: [
    { hindi: 'तुम्हें यह किताब ज़रूर पढ़नी चाहिए।', english: 'You must read this book.', type: 'Strong recommendation' },
    { hindi: 'मुझे कल तक काम खत्म करना ही है।', english: 'I must finish the work by tomorrow.', type: 'Self-obligation' },
    { hindi: 'यहाँ शोर नहीं करना चाहिए।', english: 'You must not make noise here.', type: 'Prohibition' },
    { hindi: 'वह ज़रूर थकी होगी।', english: 'She must be tired.', type: 'Logical certainty' },
    { hindi: 'आपका passport valid होना ज़रूरी है।', english: 'Your passport must be valid.', type: 'Requirement' },
    { hindi: 'उसने ज़रूर यह किया होगा।', english: 'He must have done this.', type: 'Past certainty' },
  ],
  mistakes: [
    { wrong: 'She musts go.', correct: 'She must go.', why: 'Must = modal verb, never adds -s' },
    { wrong: 'I must to eat.', correct: 'I must eat.', why: "Must के बाद 'to' नहीं" },
    { wrong: 'You must not to enter.', correct: 'You must not enter.', why: 'Must not के बाद base verb' },
    { wrong: 'I musted call.', correct: 'I had to call.', why: "Must का past = 'had to'" },
  ],
  memoryTrick: "**MUST = MUST** — इसका Hindi मतलब 'ज़रूर/अवश्य'. Must not = absolutely forbidden (बिल्कुल मत करो). Don't have to = optional hai.",
  vocabulary: [
    { word: 'Compulsory', hindi: 'अनिवार्य', example: 'Attendance is compulsory.' },
    { word: 'Mandatory', hindi: 'बाध्यकारी', example: 'This training is mandatory.' },
    { word: 'Essential', hindi: 'आवश्यक', example: 'Water is essential for life.' },
    { word: 'Obligatory', hindi: 'अनिवार्य', example: 'Payment is obligatory.' },
    { word: 'Prohibit', hindi: 'मना करना', example: 'Smoking is prohibited here.' },
    { word: 'Strictly', hindi: 'सख्ती से', example: 'Rules must be followed strictly.' },
    { word: 'Forbidden', hindi: 'वर्जित', example: 'Entry is forbidden.' },
    { word: 'Certain', hindi: 'निश्चित', example: 'She must be certain about this.' },
  ],
  speakingTips: [
    "Health advice: 'You must drink 8 glasses of water daily.'",
    "Rules: 'You must wear a helmet while riding.'",
    "Certainty: 'This must be the right answer.'",
  ],
};

// ============================================================
// Day 20 — Revision + Speaking Practice
// ============================================================
export const DAY_20_CONTENT = {
  explanation: `
**Revision Day 2 — Days 11-19 Quick Recap:**

आज revision + speaking practice! हर modal verb एक बार देखते हैं:

**Day 11: Want** = चाहना (present)
I want to + verb / She wants to + verb

**Day 12: Wanted** = चाहता था (past)
I wanted to + verb / Did you want?

**Day 13: Let** = करने दो
Let me / Let him / Don't let

**Day 14: Let's** = चलो
Let's go! / Let's not + verb

**Day 15: Would Like To** = विनम्रता से चाहना
I'd like to + verb / Would you like?

**Day 16: Can** = सकना (ability/permission)
I can swim / Can you help?

**Day 17: Should** = चाहिए
You should + verb / Should I?

**Day 18: May** = शायद (50% possibility)
It may rain / May I come in?

**Day 19: Must** = ज़रूर / अवश्य
You must + verb / She must be tired
  `,
  rules: [
    'Want/Wants → present desire (cheat: He/She/It + WANTS)',
    "Let's + verb → suggestion for group",
    "Would like → polite want (formal situations)",
    "Can → ability; May → formal permission; Must → strong obligation",
    "All modal verbs → always + BASE verb (no to, no -s, no -ing)",
    'Should → advice; Must → strong duty; May → possibility',
  ],
  examples: [
    { hindi: 'मुझे पानी चाहिए।', english: 'I want water.', type: 'Day 11 — Want' },
    { hindi: 'चलो बाहर जाते हैं।', english: "Let's go outside.", type: "Day 14 — Let's" },
    { hindi: 'क्या आप चाय लेंगे?', english: 'Would you like tea?', type: 'Day 15 — Would Like' },
    { hindi: 'मैं गिटार बजा सकता हूँ।', english: 'I can play guitar.', type: 'Day 16 — Can' },
    { hindi: 'तुम्हें अभी सोना चाहिए।', english: 'You should sleep now.', type: 'Day 17 — Should' },
    { hindi: 'शायद कल बारिश होगी।', english: 'It may rain tomorrow.', type: 'Day 18 — May' },
    { hindi: 'तुम्हें यह ज़रूर करना है।', english: 'You must do this.', type: 'Day 19 — Must' },
  ],
  mistakes: [
    { wrong: 'She wants to going.', correct: 'She wants to go.', why: 'Want/wants + to + base verb' },
    { wrong: "Let's to eat.", correct: "Let's eat.", why: "Let's + base verb (no 'to')" },
    { wrong: 'Can I to come?', correct: 'Can I come?', why: 'Modal verbs → no to' },
    { wrong: 'She shoulds rest.', correct: 'She should rest.', why: 'Modal verbs → no -s ever' },
  ],
  memoryTrick: '**MODAL GOLDEN RULE:** Can/Should/May/Must/Would + ALWAYS base verb. No -s. No -ing. No "to". Simple!',
  vocabulary: [
    { word: 'Modal', hindi: 'सहायक क्रिया', example: 'Can, should, must are modal verbs.' },
    { word: 'Revise', hindi: 'दोहराना', example: 'Revise everything daily.' },
    { word: 'Speak', hindi: 'बोलना', example: 'Speak confidently.' },
    { word: 'Fluently', hindi: 'धाराप्रवाह', example: 'She speaks fluently.' },
    { word: 'Correctly', hindi: 'सही तरीके से', example: 'Speak correctly, not just fast.' },
    { word: 'Natural', hindi: 'स्वाभाविक', example: 'Practice until it sounds natural.' },
  ],
  speakingTips: [
    'आज 10 sentences बनाओ — हर modal verb पर 1-2 sentences',
    'Mirror के सामने खड़े होकर loud बोलो',
    'Record yourself — अपनी voice सुनो और improve करो',
  ],
};

// ============================================================
// Days 21-30 content
// ============================================================

export const DAY_21_CONTENT = {
  explanation: `
**Used To — Past Habits & States:**

"Used to" = पहले करता था / करती थी (जो अब नहीं करते)

🇮🇳 मैं पहले रोज़ दौड़ता था।
🇬🇧 I **used to** run every day.

**Used to vs Simple Past:**
• Used to = regular past habit/state (NO MORE)
• Simple past = specific past event

"I used to eat fast food." ✅ (childhood habit, now changed)
"I ate fast food yesterday." ✅ (specific event)

**Negative:**
I **didn't use to** + verb (OR: I used not to)

**Question:**
**Did** you **use to** + verb?
  `,
  rules: [
    'Used to + base verb (for past habits/states that no longer exist)',
    'Same for all subjects: I/He/She/We/They used to',
    "Negative: didn't use to / used not to + base verb",
    'Question: Did + subject + use to + verb?',
    "Note: 'use to' in questions/negatives (not 'used to')",
    'No present tense: "I use to" is wrong. Use present tense for current habits.',
  ],
  examples: [
    { hindi: 'मैं बचपन में रोज़ खेलता था।', english: 'I used to play every day in childhood.', type: 'Past habit' },
    { hindi: 'वह यहाँ काम करती थी।', english: 'She used to work here.', type: 'Past state/job' },
    { hindi: 'हम पहले साथ पढ़ते थे।', english: 'We used to study together.', type: 'Past habit (plural)' },
    { hindi: 'क्या तुम पहले smoking करते थे?', english: 'Did you use to smoke?', type: 'Question' },
    { hindi: 'वह पहले यहाँ नहीं रहता था।', english: "He didn't use to live here.", type: 'Negative' },
    { hindi: 'यह शहर पहले बहुत शांत था।', english: 'This city used to be very peaceful.', type: 'Past state' },
  ],
  mistakes: [
    { wrong: 'I use to go.', correct: 'I used to go.', why: "'Used to' (with -d) except in questions/negatives" },
    { wrong: 'I am used to go.', correct: 'I used to go.', why: "'Am used to' = अलग meaning (accustomed to)" },
    { wrong: 'Did she used to dance?', correct: 'Did she use to dance?', why: "Did के बाद base form: 'use to'" },
    { wrong: 'I used to went there.', correct: 'I used to go there.', why: "'Used to' + base verb always" },
  ],
  memoryTrick: '**"Used to = Was used to doing"** — जो पहले था, अब नहीं। Past habit का सबसे clear indicator!',
  vocabulary: [
    { word: 'Habit', hindi: 'आदत', example: 'I used to have a habit of reading.' },
    { word: 'Routine', hindi: 'दिनचर्या', example: 'My old routine was different.' },
    { word: 'Childhood', hindi: 'बचपन', example: 'I used to play in childhood.' },
    { word: 'Formerly', hindi: 'पहले', example: 'I formerly used to work here.' },
    { word: 'Previously', hindi: 'पूर्व में', example: 'She previously used to sing.' },
    { word: 'Nowadays', hindi: 'आजकल', example: 'Nowadays, I go to the gym.' },
    { word: 'Lifestyle', hindi: 'जीवनशैली', example: 'My lifestyle used to be different.' },
    { word: 'Tradition', hindi: 'परंपरा', example: 'We used to follow this tradition.' },
  ],
  speakingTips: [
    "'I used to...' से अपनी childhood describe करो",
    "Compare: 'I used to eat junk food, but now I eat healthy.'",
    "Storytelling: 'There used to be a big tree here...'",
  ],
};

export const DAY_22_CONTENT = {
  explanation: `
**Could — Past Ability & Polite Requests:**

"Could" के 3 main uses:

**Use 1: Past Ability** (past form of "can")
🇮🇳 मैं बचपन में बहुत तेज़ दौड़ सकता था।
🇬🇧 I **could** run very fast as a child.

**Use 2: Polite Request** (more polite than "can")
🇮🇳 क्या आप मेरी मदद कर सकते हैं? (polite)
🇬🇧 **Could** you help me please?

**Use 3: Possibility** (less certain than "may")
🇮🇳 वह शायद late हो सकता है।
🇬🇧 He **could** be late.
  `,
  rules: [
    'Could = past tense of can (for past ability)',
    'All subjects: I/He/She/We/They + could + base verb',
    'Polite request: Could you...? (more polite than Can you?)',
    'Negative: could not (couldn\'t) + base verb',
    'Possibility: It could happen. (less certain than may)',
    'Could have + V3 = past possibility/missed opportunity',
    'Conditional: If I had time, I could help you.',
  ],
  examples: [
    { hindi: 'मैं बचपन में तैर सकता था।', english: 'I could swim as a child.', type: 'Past ability' },
    { hindi: 'क्या आप थोड़ा और ज़ोर से बोल सकते हैं?', english: 'Could you speak a bit louder?', type: 'Polite request' },
    { hindi: 'वह पहले 5 भाषाएँ बोल सकती थी।', english: 'She could speak 5 languages before.', type: 'Past ability' },
    { hindi: 'तुम वह कर सकते थे।', english: 'You could have done that.', type: 'Past missed opportunity' },
    { hindi: 'क्या आप मुझे रास्ता बता सकते हैं?', english: 'Could you tell me the way?', type: 'Polite request' },
    { hindi: 'यह आसानी से हो सकता है।', english: 'This could easily happen.', type: 'Possibility' },
  ],
  mistakes: [
    { wrong: 'I could to swim.', correct: 'I could swim.', why: "Could के बाद 'to' नहीं" },
    { wrong: 'She coulds speak.', correct: 'She could speak.', why: 'Modal verbs — no -s' },
    { wrong: 'Could I to help you?', correct: 'Could I help you?', why: 'Base verb (no to after modal)' },
    { wrong: 'I could went there.', correct: 'I could go there.', why: 'Could + base verb (not past participle)' },
  ],
  memoryTrick: '**COULD = Can का Past + Politeness Upgrade** — Past ability = "I could fly kites." Request = "Could you help?" — More polite than "can"!',
  vocabulary: [
    { word: 'Politely', hindi: 'विनम्रता से', example: 'Ask politely.' },
    { word: 'Request', hindi: 'अनुरोध', example: 'Could you fulfill my request?' },
    { word: 'Capable', hindi: 'सक्षम', example: 'She was capable of great things.' },
    { word: 'Potential', hindi: 'संभावना', example: 'You could reach your full potential.' },
    { word: 'Talented', hindi: 'प्रतिभाशाली', example: 'He could have been a great singer.' },
    { word: 'Opportunity', hindi: 'अवसर', example: 'I could have used this opportunity.' },
    { word: 'Regret', hindi: 'पछतावा', example: 'He regrets he could not attend.' },
    { word: 'Formal', hindi: 'औपचारिक', example: 'Use formal language in interviews.' },
  ],
  speakingTips: [
    "Requests के लिए: 'Could you please send me the report?'",
    "Past ability stories: 'When I was young, I could...'",
    "'Could' से interview में impress करो: 'Could I ask a question?'",
  ],
};

export const DAY_23_CONTENT = {
  explanation: `
**Should Have — Past Regret & Criticism:**

"Should have" = काश ऐसा किया होता / ऐसा करना चाहिए था (but didn't)

**Structure:** Subject + should have + Past Participle (V3)

🇮🇳 मुझे पहले शुरू करना चाहिए था।
🇬🇧 I **should have** started earlier.

🇮🇳 उसे माफ़ी माँगनी चाहिए थी।
🇬🇧 She **should have** apologized.

**Negative:**
Subject + **shouldn't have** + V3 (= गलती की)
🇮🇳 तुम्हें ऐसा नहीं करना चाहिए था।
🇬🇧 You **shouldn't have** done that.
  `,
  rules: [
    'Should have + V3 = past duty not fulfilled (should kiya tha, but didn\'t)',
    "Shouldn't have + V3 = past mistake (shouldn't kiya, but did)",
    'V3 = past participle: done, gone, eaten, said, told, called',
    'Expresses regret, criticism, or advice about the past',
    'Same for all subjects',
    'Spoken contraction: should\'ve (should have)',
  ],
  examples: [
    { hindi: 'मुझे उससे माफ़ी माँगनी चाहिए थी।', english: 'I should have apologized to him.', type: 'Personal regret' },
    { hindi: 'उसे यह secret नहीं बताना चाहिए था।', english: "She shouldn't have told that secret.", type: 'Criticism' },
    { hindi: 'तुम्हें डॉक्टर के पास पहले जाना चाहिए था।', english: 'You should have gone to the doctor earlier.', type: 'Advice about past' },
    { hindi: 'हमें उसकी बात सुननी चाहिए थी।', english: 'We should have listened to him.', type: 'Regret (plural)' },
    { hindi: 'उसे इतने पैसे नहीं खर्च करने चाहिए थे।', english: "He shouldn't have spent so much money.", type: 'Financial criticism' },
    { hindi: 'क्या मुझे वह email भेजनी चाहिए थी?', english: 'Should I have sent that email?', type: 'Question about past' },
  ],
  mistakes: [
    { wrong: 'I should have went.', correct: 'I should have gone.', why: 'V3 = gone (not went)' },
    { wrong: 'You should have catched.', correct: 'You should have caught.', why: 'V3 = caught (not catched)' },
    { wrong: "She shouldn't have to do it.", correct: "She shouldn't have done it.", why: "'Should have' + V3 directly" },
    { wrong: "I should've went there.", correct: "I should've gone there.", why: 'V3 = gone even in spoken form' },
  ],
  memoryTrick: "**Should Have = 'काश' का English** — जब मन में 'काश मैंने...' आए = 'I should have...' जब मन में 'काश नहीं किया' = 'I shouldn't have...'",
  vocabulary: [
    { word: 'Regret', hindi: 'पछतावा', example: 'I regret not calling you.' },
    { word: 'Mistake', hindi: 'गलती', example: "I shouldn't have made that mistake." },
    { word: 'Opportunity', hindi: 'अवसर', example: 'I should have grabbed that opportunity.' },
    { word: 'Apologize', hindi: 'माफ़ी माँगना', example: 'I should have apologized sooner.' },
    { word: 'Prepare', hindi: 'तैयारी करना', example: 'I should have prepared better.' },
    { word: 'Invest', hindi: 'निवेश करना', example: 'I should have invested early.' },
    { word: 'Save', hindi: 'बचाना', example: 'I should have saved more money.' },
    { word: 'Listen', hindi: 'सुनना', example: 'I should have listened to my parents.' },
  ],
  speakingTips: [
    "Life lessons share करो: 'I should have studied harder in school.'",
    "Giving feedback: 'You should have informed us earlier.'",
    "Polite criticism: 'Perhaps we should have planned better.'",
  ],
};

// ============================================================
// Day 24 — Must Have (Strong Past Certainty / Deduction)
// ============================================================
export const DAY_24_CONTENT = {
  explanation: `
**Must Have — Past Certainty (Logical Deduction):**

"Must have" = ज़रूर...हुआ होगा (You are 99% sure something happened in the past)

**Structure:** Subject + must have + Past Participle (V3)

🇮🇳 वह ज़रूर भूल गया होगा।
🇬🇧 He **must have** forgotten.

🇮🇳 ज़रूर कुछ problem हुई होगी।
🇬🇧 There **must have** been some problem.

**Negative (Impossible):** Subject + **can't have / couldn't have** + V3
🇮🇳 वह ज़रूर वहाँ नहीं गया होगा।
🇬🇧 He **can't have gone** there.

**Key Difference:**
- Must have = 99% certain it DID happen
- Can't have = 99% certain it did NOT happen
- Should have = duty (not about certainty)
  `,
  rules: [
    'Must have + V3 = logical deduction about past (almost certain it happened)',
    "Can't have / Couldn't have + V3 = logical deduction it did NOT happen",
    'V3 = past participle (gone, done, eaten, forgotten, left, seen)',
    "Based on evidence: 'He must have left — his bag is gone.'",
    'Not the same as "should have" (duty) — must have is about logical conclusion',
    'Same structure for all subjects (I/he/she/they/we)',
  ],
  examples: [
    { hindi: 'वह ज़रूर बहुत थका हुआ होगा।', english: 'He must have been very tired.', type: 'Deduction from evidence' },
    { hindi: 'ज़रूर रात को बारिश हुई होगी।', english: 'It must have rained last night.', type: 'Weather deduction' },
    { hindi: 'उसने ज़रूर train miss की होगी।', english: 'She must have missed the train.', type: 'Logical conclusion' },
    { hindi: 'वह ज़रूर इस बारे में पहले से जानता होगा।', english: 'He must have known about this already.', type: 'Prior knowledge' },
    { hindi: 'उन्होंने ज़रूर बहुत मेहनत की होगी।', english: 'They must have worked very hard.', type: 'Admiring conclusion' },
    { hindi: 'यह काम ज़रूर बहुत मुश्किल रहा होगा।', english: 'This work must have been very difficult.', type: 'Empathy' },
  ],
  mistakes: [
    { wrong: 'He must have forget.', correct: 'He must have forgotten.', why: 'Always use V3 (past participle) after "must have"' },
    { wrong: "She must haven't come.", correct: "She can't have come.", why: 'Negative of must have = can\'t have (not must haven\'t)' },
    { wrong: 'He must have went.', correct: 'He must have gone.', why: 'V3 of "go" is "gone", not "went"' },
    { wrong: 'You must have to call.', correct: 'You must have called.', why: 'No "to" between "must have" and V3' },
  ],
  memoryTrick: "**Must Have = Detective Logic 🔍** — जब Sherlock Holmes कहता है 'You must have been in Afghanistan' — वो evidence देखकर 99% sure conclusion निकालता है। Must have = evidence देखकर past conclusion।",
  vocabulary: [
    { word: 'Deduction', hindi: 'निष्कर्ष/अनुमान', example: 'That is a logical deduction.' },
    { word: 'Evidence', hindi: 'सबूत', example: 'The evidence must have been destroyed.' },
    { word: 'Exhausted', hindi: 'बिल्कुल थका हुआ', example: 'She must have been exhausted.' },
    { word: 'Forgotten', hindi: 'भूला हुआ', example: 'He must have forgotten the meeting.' },
    { word: 'Confused', hindi: 'भ्रमित', example: 'They must have been confused.' },
    { word: 'Nervous', hindi: 'घबराया हुआ', example: 'She must have been nervous.' },
    { word: 'Obvious', hindi: 'स्पष्ट', example: 'It must have been obvious.' },
    { word: 'Conclude', hindi: 'निष्कर्ष निकालना', example: 'I can conclude he must have left.' },
  ],
  speakingTips: [
    "Evidence देखकर बोलो: 'The food is gone — someone must have eaten it!'",
    "Empathy show करो: 'You must have been very stressed during the exam.'",
    "Workplace में: 'The system must have crashed during the update.'",
  ],
};

// ============================================================
// Day 25 — Could Have (Past Possibility / Missed Opportunity)
// ============================================================
export const DAY_25_CONTENT = {
  explanation: `
**Could Have — Past Possibility & Missed Opportunity:**

"Could have" के 3 uses हैं:

**Use 1 — Past Ability Not Used:** (हो सकता था — but didn't)
🇮🇳 मैं जीत सकता था। (but I didn't)
🇬🇧 I **could have won**.

**Use 2 — Past Possibility:** (संभावना थी)
🇮🇳 और बुरा हो सकता था।
🇬🇧 It **could have been** worse.

**Use 3 — Criticism/Missed Opportunity:**
🇮🇳 तुम मुझे call कर सकते थे!
🇬🇧 You **could have called** me!

**Structure:** Subject + could have + V3

**Negative:** Subject + **couldn't have** + V3
🇮🇳 मैं बिना तुम्हारी मदद के नहीं कर सकता था।
🇬🇧 I **couldn't have done** it without your help.
  `,
  rules: [
    'Could have + V3 = past ability that was NOT used',
    'Could have + V3 = past possibility (might have happened)',
    'Could have + V3 = mild criticism about missed opportunity',
    "Couldn't have + V3 = impossible in the past",
    'Polite suggestion about past: "We could have taken a taxi."',
    'Compare: Must have (certain) vs Could have (possible) vs Should have (duty)',
  ],
  examples: [
    { hindi: 'मैं पहले बेहतर तैयारी कर सकता था।', english: 'I could have prepared better earlier.', type: 'Self-reflection' },
    { hindi: 'वह doctor बन सकता था, पर engineer बना।', english: 'He could have become a doctor, but became an engineer.', type: 'Life choice' },
    { hindi: 'accident और बुरा हो सकता था।', english: 'The accident could have been worse.', type: 'Lucky escape' },
    { hindi: 'तुम कम से कम message कर सकते थे!', english: 'You could have at least sent a message!', type: 'Mild frustration' },
    { hindi: 'हम यह deal बहुत पहले close कर सकते थे।', english: 'We could have closed this deal much earlier.', type: 'Business regret' },
    { hindi: 'उसकी मदद के बिना मैं यह नहीं कर सकता था।', english: "I couldn't have done this without her help.", type: 'Gratitude' },
  ],
  mistakes: [
    { wrong: 'I could have went.', correct: 'I could have gone.', why: 'V3 of go = gone, not went' },
    { wrong: "I couldn't have to do it.", correct: "I couldn't have done it.", why: 'Direct V3 after "could have" — no "to"' },
    { wrong: 'He could has won.', correct: 'He could have won.', why: 'Always "have" — not "has" (modal + have + V3)' },
    { wrong: 'We could have be there.', correct: 'We could have been there.', why: 'V3 of "be" is "been"' },
  ],
  memoryTrick: "**Could Have = Doors That Were Open 🚪** — 'Could have' का मतलब है एक door open थी, पर हमने उसमें walk नहीं किया। आज उस open door को याद कर रहे हैं।",
  vocabulary: [
    { word: 'Opportunity', hindi: 'अवसर/मौका', example: 'I could have used that opportunity.' },
    { word: 'Capable', hindi: 'सक्षम', example: 'I was capable — I could have done it.' },
    { word: 'Regret', hindi: 'पछतावा', example: 'No regrets — but I could have tried harder.' },
    { word: 'Potential', hindi: 'क्षमता', example: 'She had the potential — she could have succeeded.' },
    { word: 'Alternative', hindi: 'विकल्प', example: 'We could have taken an alternative route.' },
    { word: 'Fortunate', hindi: 'भाग्यशाली', example: 'We are fortunate — it could have been disastrous.' },
    { word: 'Achievement', hindi: 'उपलब्धि', example: 'You could have achieved much more.' },
    { word: 'Prevent', hindi: 'रोकना', example: 'We could have prevented this mistake.' },
  ],
  speakingTips: [
    "Appreciating others: 'I couldn't have done this without you.'",
    "Near-miss situations: 'It could have been a serious accident.'",
    "Office feedback: 'We could have communicated better on this project.'",
  ],
};

// ============================================================
// Day 26 — Would Have (Conditional Perfect — Imaginary Past)
// ============================================================
export const DAY_26_CONTENT = {
  explanation: `
**Would Have — Conditional Perfect (Imaginary Past):**

"Would have" = होता / करता / मिलता (imaginary past — what WOULD have happened IF something had been different)

**Structure:**
**If** + Subject + **had** + V3 → Subject + **would have** + V3

🇮🇳 अगर मैंने पढ़ाई की होती, तो मैं pass हो जाता।
🇬🇧 If I **had studied**, I **would have passed**.

🇮🇳 अगर तुम जल्दी आते, तो हम मिल सकते थे।
🇬🇧 If you **had come** early, we **would have met**.

**Without "if" (standalone):**
🇮🇳 मैं तुम्हारी मदद करता।
🇬🇧 I **would have helped** you. (implied: if you had asked)

**Negative:**
Subject + **wouldn't have** + V3
🇮🇳 मैं यह कभी नहीं करता।
🇬🇧 I **wouldn't have done** this.
  `,
  rules: [
    'Would have + V3 = 3rd conditional — imaginary past (opposite of what happened)',
    'Full structure: If + had + V3 → would have + V3',
    'If clause (had + V3) can come first or last',
    "Standalone 'would have' implies an understood condition",
    "Negative: wouldn't have + V3",
    'Spoken contraction: would\'ve (= would have)',
    'All subjects same: I/he/she/we/they + would have + V3',
  ],
  examples: [
    { hindi: 'अगर वह समय पर आता, तो वे interview नहीं miss करते।', english: 'If he had come on time, he would not have missed the interview.', type: '3rd Conditional' },
    { hindi: 'अगर मैंने उससे पहले बात की होती, तो गलतफहमी नहीं होती।', english: 'If I had talked to him earlier, there would not have been a misunderstanding.', type: '3rd Conditional' },
    { hindi: 'अगर हम map देखते, तो रास्ता नहीं भूलते।', english: 'If we had checked the map, we would not have gotten lost.', type: 'Navigation' },
    { hindi: 'मैं तुम्हारी party में ज़रूर आता।', english: 'I would have definitely come to your party.', type: 'Standalone expression' },
    { hindi: 'अगर उसने invest किया होता, तो आज वह अमीर होता।', english: 'If he had invested, he would have been rich today.', type: 'Financial' },
    { hindi: 'मैं यह नौकरी कभी नहीं छोड़ता।', english: 'I would never have left this job.', type: 'Hypothetical decision' },
  ],
  mistakes: [
    { wrong: 'If I would have studied, I would have passed.', correct: 'If I had studied, I would have passed.', why: 'If clause = "had + V3" NOT "would have"' },
    { wrong: 'I would have went there.', correct: 'I would have gone there.', why: 'V3 of go = gone, not went' },
    { wrong: 'If she had gone, she will have met him.', correct: 'If she had gone, she would have met him.', why: '3rd conditional uses "would have" not "will have"' },
    { wrong: "We wouldn't have not done it.", correct: "We wouldn't have done it.", why: 'Only ONE negative — not double negative' },
  ],
  memoryTrick: "**Would Have = Time Machine 🕰️** — 'Would have' एक time machine की तरह है — हम imaginary past में जाकर सोचते हैं 'अगर ऐसा होता तो...' Reality different थी, हम IMAGINE कर रहे हैं।",
  vocabulary: [
    { word: 'Hypothetical', hindi: 'काल्पनिक', example: 'This is a hypothetical situation — what would have happened?' },
    { word: 'Consequence', hindi: 'परिणाम', example: 'The consequence would have been different.' },
    { word: 'Imaginary', hindi: 'काल्पनिक', example: 'This is an imaginary past scenario.' },
    { word: 'Different', hindi: 'अलग', example: 'Things would have been different.' },
    { word: 'Outcome', hindi: 'नतीजा', example: 'The outcome would have been better.' },
    { word: 'Scenario', hindi: 'परिदृश्य', example: 'In that scenario, I would have helped.' },
    { word: 'Decision', hindi: 'निर्णय', example: 'A different decision would have changed everything.' },
    { word: 'Impact', hindi: 'प्रभाव', example: 'The impact would have been huge.' },
  ],
  speakingTips: [
    "Life reflection: 'If I had started earlier, I would have reached my goal by now.'",
    "Business analysis: 'If we had planned better, we would have avoided this loss.'",
    "Personal growth: 'I would have handled that situation differently today.'",
  ],
};

// ============================================================
// Day 27 — May Have (Past Possibility — 50% Certainty)
// ============================================================
export const DAY_27_CONTENT = {
  explanation: `
**May Have — Past Possibility (50% Certainty):**

"May have" = शायद...हुआ हो (50% possibility — you think it happened but not sure)

**Structure:** Subject + may have + Past Participle (V3)

🇮🇳 वह शायद घर चला गया हो।
🇬🇧 He **may have gone** home.

🇮🇳 उसने शायद phone switch off किया हो।
🇬🇧 She **may have switched** off her phone.

**Negative:** Subject + **may not have** + V3
🇮🇳 शायद उसे पता नहीं था।
🇬🇧 He **may not have known** about it.

**May Have vs Might Have:**
- May have = 50% possibility (more likely)
- Might have = 30% possibility (less likely, more remote)
  `,
  rules: [
    'May have + V3 = 50% past possibility (moderate uncertainty)',
    'May not have + V3 = negative past possibility',
    'Used when you have some reason to believe it happened, but not 100% sure',
    'Compare: Must have (99%), May have (50%), Might have (30%)',
    'Different from "may have to" — that means "possibly need to" (present/future)',
    'Question: "Could he have...?" not "May he have...?" (questions use could/might)',
  ],
  examples: [
    { hindi: 'वे शायद पहले ही निकल गए हों।', english: 'They may have already left.', type: 'Speculation' },
    { hindi: 'उसे शायद address पता नहीं था।', english: 'He may not have known the address.', type: 'Negative possibility' },
    { hindi: 'वह शायद busy रही हो इसीलिए reply नहीं किया।', english: 'She may have been busy, that is why she did not reply.', type: 'Giving benefit of doubt' },
    { hindi: 'Package शायद deliver हो गया हो।', english: 'The package may have been delivered.', type: 'Daily life' },
    { hindi: 'उसने शायद आपका message पढ़ा ही नहीं हो।', english: 'He may not have read your message.', type: 'Tech situation' },
    { hindi: 'Meeting शायद cancel हो गई हो।', english: 'The meeting may have been cancelled.', type: 'Office situation' },
  ],
  mistakes: [
    { wrong: 'He may have went.', correct: 'He may have gone.', why: 'V3 = gone, not went' },
    { wrong: 'She may has done it.', correct: 'She may have done it.', why: 'Always "have" — not "has" after modal' },
    { wrong: 'May he have arrived?', correct: 'Could he have arrived? / Has he arrived?', why: '"May have" questions use could/might, not may' },
    { wrong: 'They may have not seen.', correct: 'They may not have seen.', why: 'Negation: "may not have" — not "may have not"' },
  ],
  memoryTrick: "**May Have = Coin Flip 🪙** — May have का मतलब है 50-50 chance। जैसे coin flip करो — head आए या tail, कह नहीं सकते। 'He may have called' = 50% chance उसने call किया।",
  vocabulary: [
    { word: 'Perhaps', hindi: 'शायद', example: 'Perhaps he may have misunderstood.' },
    { word: 'Uncertain', hindi: 'अनिश्चित', example: 'I am uncertain — she may have known.' },
    { word: 'Possible', hindi: 'संभव', example: 'It is possible — he may have arrived.' },
    { word: 'Apparently', hindi: 'ऐसा लगता है', example: 'Apparently, he may have changed his plan.' },
    { word: 'Seemingly', hindi: 'प्रतीत होता है', example: 'Seemingly, things may have gone wrong.' },
    { word: 'Supposedly', hindi: 'माना जाता है', example: 'He supposedly may have been informed.' },
    { word: 'Presumably', hindi: 'अनुमान से', example: 'Presumably, she may have taken a different route.' },
    { word: 'Speculate', hindi: 'अनुमान लगाना', example: 'We can only speculate — he may have left early.' },
  ],
  speakingTips: [
    "Giving benefit of doubt: 'She may have had an emergency — let's wait.'",
    "When you're not sure: 'The files may have been accidentally deleted.'",
    "Professional setting: 'The client may have missed the email — let's follow up.'",
  ],
};

// ============================================================
// Day 28 — Might Have (Remote Past Possibility — 30% Certainty)
// ============================================================
export const DAY_28_CONTENT = {
  explanation: `
**Might Have — Remote Past Possibility (30% Certainty):**

"Might have" = शायद...हुआ हो (30% — less likely, more remote possibility)

**Structure:** Subject + might have + Past Participle (V3)

🇮🇳 वह शायद bus miss कर गई हो।
🇬🇧 She **might have missed** the bus.

🇮🇳 शायद उन्होंने अभी तक decision नहीं किया हो।
🇬🇧 They **might not have decided** yet.

**Might Have vs May Have:**
| May Have | Might Have |
|----------|------------|
| 50% likely | 30% likely |
| More confident | Less confident |
| "He may have called" | "He might have called" |

**Negative:** Subject + **might not have** + V3

**Might Have for Criticism (like Could Have):**
🇮🇳 तुम कम से कम बता सकते थे!
🇬🇧 You **might have** at least told us!
  `,
  rules: [
    'Might have + V3 = less certain past possibility (30% likelihood)',
    'Slightly less certain than "may have" (50%)',
    'Might not have + V3 = negative remote possibility',
    "Can express mild criticism: 'You might have warned us!'",
    'Used when evidence is weak or you have low confidence',
    'In informal speech, might have ≈ may have (distinction is subtle)',
  ],
  examples: [
    { hindi: 'उसे शायद रास्ता नहीं पता होगा।', english: 'He might not have known the way.', type: 'Speculation' },
    { hindi: 'वह शायद train से गई हो।', english: 'She might have gone by train.', type: 'Guessing transport' },
    { hindi: 'शायद उन्होंने हमारी plan के बारे में सुना हो।', english: 'They might have heard about our plan.', type: 'Workplace possibility' },
    { hindi: 'मेरा phone शायद charging पर लगा हो।', english: 'My phone might have been on charge.', type: 'Everyday situation' },
    { hindi: 'तुम पहले बता सकते थे — इससे बहुत फर्क पड़ता।', english: 'You might have told us before — it would have made a difference.', type: 'Mild criticism' },
    { hindi: 'वह interview में शायद बहुत घबरा गई हो।', english: 'She might have been very nervous in the interview.', type: 'Empathy' },
  ],
  mistakes: [
    { wrong: 'He might have went there.', correct: 'He might have gone there.', why: 'V3 of go = gone' },
    { wrong: 'She might has eaten.', correct: 'She might have eaten.', why: '"might" + "have" (not has) + V3' },
    { wrong: 'They might not have been not there.', correct: 'They might not have been there.', why: 'One negative only — not double negative' },
    { wrong: 'Might have he called?', correct: 'Might he have called? / Could he have called?', why: 'Question inversion with might: Might + subject + have + V3' },
  ],
  memoryTrick: "**Might Have = Slim Chance 🎰** — अगर may have 50% coin flip है, तो might have 30% का Lottery है। 'He might have won' = slim chance था, पर शायद! जितना कम confident हो उतना might have।",
  vocabulary: [
    { word: 'Remote', hindi: 'बहुत कम संभव', example: 'There is a remote chance he might have come.' },
    { word: 'Unlikely', hindi: 'असंभव-सा', example: 'It seems unlikely but she might have agreed.' },
    { word: 'Slim chance', hindi: 'बहुत कम उम्मीद', example: 'There is a slim chance they might have survived.' },
    { word: 'Doubtful', hindi: 'संदिग्ध', example: 'It is doubtful — he might have changed his mind.' },
    { word: 'Barely', hindi: 'मुश्किल से', example: 'He barely replied — he might have been upset.' },
    { word: 'Vaguely', hindi: 'अस्पष्ट रूप से', example: 'I vaguely feel she might have understood.' },
    { word: 'Improbable', hindi: 'असंभव-सा', example: 'Improbable, but he might have been there.' },
    { word: 'Conjecture', hindi: 'अटकल', example: 'This is all conjecture — he might have left.' },
  ],
  speakingTips: [
    "When totally unsure: 'I don't know for sure — she might have taken a different flight.'",
    "Soft criticism: 'You might have given us more notice about this change.'",
    "Being diplomatic at work: 'The report might have been sent to the wrong email.'",
  ],
};

// ============================================================
// Day 29 — Will / Shall (Future Tense)
// ============================================================
export const DAY_29_CONTENT = {
  explanation: `
**Will / Shall — Expressing Future:**

**WILL (सबसे common future modal):**

1. **Predictions / Beliefs:**
🇮🇳 कल बारिश होगी।
🇬🇧 It **will** rain tomorrow.

2. **Promises:**
🇮🇳 मैं ज़रूर वापस आऊँगा।
🇬🇧 I **will** definitely come back.

3. **Spontaneous Decisions (on the spot):**
🇮🇳 मैं phone उठाता हूँ।
🇬🇧 I'**ll** get the phone. (just decided NOW)

4. **Offers/Willingness:**
🇮🇳 मैं तुम्हारी help करूँगा।
🇬🇧 I **will** help you.

**SHALL (formal / British / offers + suggestions):**
- Shall I open the window? (Can I / Should I?)
- Shall we begin? (Let's begin?)
- We shall overcome. (formal promise)

**Structure:** Subject + will/shall + Base Verb (V1)
**Negative:** Subject + **won't / shan't** + V1
**Question:** **Will** + subject + V1?
  `,
  rules: [
    'Will + V1 = future (predictions, promises, offers, spontaneous decisions)',
    'Shall + V1 = formal future, offers (shall I/we?), British English',
    'Contraction: I will → I\'ll, he will → he\'ll, she will → she\'ll',
    "Won't = will not (negative); shan't = shall not (very formal)",
    "Question: Will you...? / Shall I...? / Shall we...?",
    "Going to = planned future; Will = unplanned/prediction at time of speaking",
  ],
  examples: [
    { hindi: 'मैं कल office जाऊँगा।', english: 'I will go to the office tomorrow.', type: 'Future plan' },
    { hindi: 'क्या आप मेरी मदद करेंगे?', english: 'Will you help me?', type: 'Request' },
    { hindi: 'मैं यह secret किसी को नहीं बताऊँगा।', english: 'I will not tell this secret to anyone.', type: 'Promise' },
    { hindi: 'वह interview में ज़रूर अच्छा करेगा।', english: 'He will definitely do well in the interview.', type: 'Prediction' },
    { hindi: 'क्या हम शुरू करें?', english: 'Shall we begin?', type: 'Formal suggestion' },
    { hindi: 'क्या मैं door खोलूँ?', english: 'Shall I open the door?', type: 'Polite offer' },
  ],
  mistakes: [
    { wrong: 'I will to go tomorrow.', correct: 'I will go tomorrow.', why: 'Will + V1 directly — no "to"' },
    { wrong: 'He wills come.', correct: 'He will come.', why: '"Will" never changes form — no -s with he/she/it' },
    { wrong: 'I will can do it.', correct: 'I will be able to do it.', why: 'Two modals not together — use "be able to"' },
    { wrong: 'She will not coming.', correct: 'She will not come.', why: 'Will + V1 (base form), not V+ing' },
  ],
  memoryTrick: "**Will = Your Promise Ring 💍** — जब आप 'will' use करते हो, आप future का एक promise/commitment दे रहे हो। 'I will be there' = मेरा वादा है। Shall = पूछना है — Shall I? = क्या मैं?",
  vocabulary: [
    { word: 'Promise', hindi: 'वादा', example: 'I will keep my promise.' },
    { word: 'Prediction', hindi: 'भविष्यवाणी', example: 'I predict it will be sunny.' },
    { word: 'Definitely', hindi: 'ज़रूर/निश्चित रूप से', example: 'I will definitely attend.' },
    { word: 'Eventually', hindi: 'अंततः', example: 'Things will eventually get better.' },
    { word: 'Shortly', hindi: 'जल्द ही', example: 'The manager will arrive shortly.' },
    { word: 'Confirm', hindi: 'पुष्टि करना', example: 'I will confirm by tomorrow.' },
    { word: 'Ensure', hindi: 'सुनिश्चित करना', example: 'We will ensure the quality.' },
    { word: 'Deliver', hindi: 'डिलीवर करना', example: 'We will deliver it on time.' },
  ],
  speakingTips: [
    "Spontaneous office help: 'I'll send you that file right now.'",
    "Making commitments: 'I will complete this by Friday, I promise.'",
    "Polite offers: 'Shall I make tea for everyone in the meeting?'",
  ],
};

// ============================================================
// Day 30 — Would + Ought To + Dare
// ============================================================
export const DAY_30_CONTENT = {
  explanation: `
**Would + Ought To + Dare — Advanced Modals:**

**WOULD (3 main uses):**

1. **Polite Requests:**
🇬🇧 **Would** you please send the report? (बेहद polite)

2. **Past Habits (recurring past actions):**
🇮🇳 जब मैं छोटा था, तो रोज़ football खेलता था।
🇬🇧 When I was young, I **would** play football every day.

3. **Conditional (with "if" or imaginary):**
🇮🇳 मैं help करता, अगर मेरे पास time होता।
🇬🇧 I **would** help if I had time.

---

**OUGHT TO (moral duty — stronger than should):**
🇮🇳 तुम्हें honest होना चाहिए।
🇬🇧 You **ought to** be honest.

Structure: Subject + **ought to** + V1
Negative: Subject + **ought not to** / **oughtn't to** + V1

---

**DARE (हिम्मत करना / challenge):**
🇮🇳 वह सच बोलने की हिम्मत रखती है।
🇬🇧 She **dares to** speak the truth.

Negative: I **dare not** / **don't dare to** speak.
Challenge: **How dare** you say that!
Question: **Dare** she ask? (formal/literary)
  `,
  rules: [
    'Would + V1 = polite request, past habit, conditional',
    "'Would' is past form of 'will' — but often used independently",
    'Ought to + V1 = moral obligation (like should, but stronger)',
    "Ought not to + V1 = negative duty",
    'Dare to + V1 = to have courage to do something',
    "'How dare you!' = expression of shock/anger (not a question)",
    "'Dare not' (modal use) = very formal literary English",
    "I wouldn't do that = strong negative advice",
  ],
  examples: [
    { hindi: 'क्या आप please window बंद कर देंगे?', english: 'Would you please close the window?', type: 'Polite request' },
    { hindi: 'बचपन में वह रोज़ library जाता था।', english: 'He would go to the library every day as a child.', type: 'Past habit' },
    { hindi: 'तुम्हें अपने parents को respect करना चाहिए।', english: 'You ought to respect your parents.', type: 'Moral duty' },
    { hindi: 'उसे ऐसा नहीं करना चाहिए था।', english: 'He ought not to have done that.', type: 'Past moral criticism' },
    { hindi: 'वह अकेले stage पर जाने की हिम्मत रखता है।', english: 'He dares to go on stage alone.', type: 'Courage' },
    { hindi: 'तुम्हारी यह हिम्मत कैसे हुई ऐसा बोलने की!', english: 'How dare you say something like that!', type: 'Strong reaction' },
  ],
  mistakes: [
    { wrong: 'You ought respect elders.', correct: 'You ought to respect elders.', why: 'Ought TO + V1 — "to" is required' },
    { wrong: 'Would you to help me?', correct: 'Would you help me?', why: 'Would + V1 directly — no "to" with would' },
    { wrong: "He dares not to go.", correct: "He dares not go. / He doesn't dare to go.", why: "'Dare not' (modal) takes V1; 'doesn't dare' (main verb) takes 'to'" },
    { wrong: 'How dare you to say that!', correct: 'How dare you say that!', why: 'How dare you + V1 directly (no "to")' },
  ],
  memoryTrick: "**Would = Soft Cushion 🛋️** — Would request पर एक soft cushion है — Will से ज़्यादा polite। **Ought = Moral Compass 🧭** — Ought to अंदर से moral direction देता है। **Dare = Lion Heart 🦁** — Dare = हिम्मत जो lion की होती है।",
  vocabulary: [
    { word: 'Polite', hindi: 'विनम्र', example: 'Would you please be more polite?' },
    { word: 'Obligation', hindi: 'दायित्व/फ़र्ज़', example: 'We ought to fulfill our obligations.' },
    { word: 'Courage', hindi: 'साहस/हिम्मत', example: 'You must dare to show courage.' },
    { word: 'Honest', hindi: 'ईमानदार', example: 'You ought to be honest in all matters.' },
    { word: 'Respectful', hindi: 'सम्मानजनक', example: 'You ought to be respectful to elders.' },
    { word: 'Genuine', hindi: 'वास्तविक', example: 'Would you give a genuine opinion?' },
    { word: 'Challenging', hindi: 'चुनौतीपूर्ण', example: 'Do you dare to take on challenging work?' },
    { word: 'Principled', hindi: 'सिद्धांतनिष्ठ', example: 'A principled person ought to speak the truth.' },
  ],
  speakingTips: [
    "Ultra-polite office requests: 'Would you mind sharing the presentation link?'",
    "Giving moral advice: 'You ought to inform your manager before taking leave.'",
    "Inspirational: 'Dare to dream big — success will follow!'",
  ],
};

// ============================================================
// Day 31 — Revision (Days 21-30 Review)
// ============================================================
export const DAY_31_CONTENT = {
  explanation: `
**Revision Day 3 — Days 21-30 ka Complete Review:**

आज हम पिछले 10 दिनों के सभी Advanced Modal Verbs का revision करेंगे।

**Day 21: Used To** = पहले करता था
"I used to play cricket." (now I don't)

**Day 22: Could** = Past ability / Polite request
"I could swim as a child." / "Could you help me?"

**Day 23: Should Have** = काश किया होता
"I should have called earlier."

**Day 24: Must Have** = ज़रूर हुआ होगा (99% certainty)
"He must have forgotten."

**Day 25: Could Have** = हो सकता था (missed opportunity)
"I could have won."

**Day 26: Would Have** = होता (imaginary past, 3rd conditional)
"If I had studied, I would have passed."

**Day 27: May Have** = शायद हुआ हो (50% past possibility)
"She may have left already."

**Day 28: Might Have** = शायद हुआ हो (30% — less certain)
"He might have taken a different route."

**Day 29: Will / Shall** = Future tense
"I will come." / "Shall we begin?"

**Day 30: Would / Ought To / Dare**
"Would you help?" / "You ought to be honest." / "How dare you!"
  `,
  rules: [
    'Used to + V1 = Past habit (no longer happening)',
    'Could + V1 = Past ability; Could you? = Polite request',
    'Should have / Could have / Would have / Must have + V3 = Perfect modals',
    'Must have = 99% certain; May have = 50%; Might have = 30%',
    'Would have + V3 = 3rd conditional (imaginary past)',
    'Will + V1 = Future; Shall = formal offers/suggestions',
    'Ought to + V1 = moral duty (must have "to" unlike other modals)',
  ],
  examples: [
    { hindi: 'मैं बचपन में बहुत तेज़ दौड़ता था।', english: 'I used to run very fast in childhood.', type: 'Day 21 — Used To' },
    { hindi: 'क्या आप यह document send कर सकते हैं?', english: 'Could you please send this document?', type: 'Day 22 — Could (polite)' },
    { hindi: 'मुझे पहले उसे inform करना चाहिए था।', english: 'I should have informed him earlier.', type: 'Day 23 — Should Have' },
    { hindi: 'वह ज़रूर बहुत busy रही होगी।', english: 'She must have been very busy.', type: 'Day 24 — Must Have' },
    { hindi: 'तुम कम से कम message कर सकते थे।', english: 'You could have at least messaged.', type: 'Day 25 — Could Have' },
    { hindi: 'अगर मैंने मेहनत की होती, तो pass हो जाता।', english: 'If I had worked hard, I would have passed.', type: 'Day 26 — Would Have' },
    { hindi: 'शायद उसने अभी तक reply नहीं किया हो।', english: 'He may not have replied yet.', type: 'Day 27 — May Have' },
    { hindi: 'वह शायद train miss कर गई हो।', english: 'She might have missed the train.', type: 'Day 28 — Might Have' },
  ],
  mistakes: [
    { wrong: 'I use to go there.', correct: 'I used to go there.', why: "'Used to' (with -d) in positive sentences" },
    { wrong: 'He must have went.', correct: 'He must have gone.', why: 'Perfect modals always need V3 (past participle)' },
    { wrong: 'If I would have known, I would have helped.', correct: 'If I had known, I would have helped.', why: "If clause = 'had + V3', not 'would have'" },
    { wrong: 'You ought respect elders.', correct: 'You ought to respect elders.', why: "Ought TO + V1 — 'to' is always required" },
  ],
  memoryTrick: "**Perfect Modal Formula: Subject + [Modal] + have + V3**\nMust have / Could have / Should have / Would have / May have / Might have — सब ने V3 चाहिए!",
  vocabulary: [
    { word: 'Revise', hindi: 'दोहराना', example: 'Revise all modal verbs today.' },
    { word: 'Certainty', hindi: 'निश्चितता', example: 'Must have = high certainty.' },
    { word: 'Possibility', hindi: 'संभावना', example: 'May have = 50% possibility.' },
    { word: 'Obligation', hindi: 'दायित्व', example: 'Ought to = moral obligation.' },
    { word: 'Habit', hindi: 'आदत', example: 'I used to have good habits.' },
    { word: 'Conditional', hindi: 'शर्त वाला', example: 'Would have = conditional past.' },
  ],
  speakingTips: [
    'हर perfect modal पर 2 sentences बनाओ — आज 14 sentences का target रखो',
    'Record करो और check करो कि V3 सही use हुई या नहीं',
    'एक दोस्त के साथ roleplay करो — past situations discuss करो',
  ],
};

// ============================================================
// Day 32 — Tenses Part 1 (Simple Present, Past, Future)
// ============================================================
export const DAY_32_CONTENT = {
  explanation: `
**Tenses Part 1 — Simple Tenses (Simple Present, Simple Past, Simple Future):**

Tense बताता है कि कोई action **कब** होता है — Past, Present, या Future में।

**1. Simple Present Tense (वर्तमान काल — सामान्य):**
Use: Daily habits, facts, general truths
🇮🇳 मैं रोज़ काम पर जाता हूँ।
🇬🇧 I **go** to work every day.
Formula: Subject + V1 (He/She/It → V1+s)

**2. Simple Past Tense (भूतकाल — सामान्य):**
Use: Completed actions in the past
🇮🇳 मैंने कल खाना खाया।
🇬🇧 I **ate** food yesterday.
Formula: Subject + V2 (for all subjects)

**3. Simple Future Tense (भविष्यकाल — सामान्य):**
Use: Future plans, predictions, promises
🇮🇳 मैं कल आऊँगा।
🇬🇧 I **will come** tomorrow.
Formula: Subject + will + V1
  `,
  rules: [
    'Simple Present: I/We/You/They + V1; He/She/It + V1+s/es',
    'Simple Present Negative: Subject + do/does not + V1',
    'Simple Past: Subject + V2 (same for all — went, ate, spoke)',
    'Simple Past Negative: Subject + did not + V1 (base form)',
    'Simple Future: Subject + will + V1 (same for all subjects)',
    'Simple Future Negative: Subject + will not (won\'t) + V1',
    'Key time words: Past: yesterday, ago, last; Future: tomorrow, next, soon',
  ],
  examples: [
    { hindi: 'सूरज पूर्व से उगता है।', english: 'The sun rises in the east.', type: 'Simple Present — Fact' },
    { hindi: 'वह रोज़ gym जाती है।', english: 'She goes to the gym every day.', type: 'Simple Present — Habit' },
    { hindi: 'हम कल दिल्ली गए।', english: 'We went to Delhi yesterday.', type: 'Simple Past' },
    { hindi: 'उसने मुझे call नहीं किया।', english: 'He did not call me.', type: 'Simple Past Negative' },
    { hindi: 'मैं अगले साल job बदलूँगा।', english: 'I will change my job next year.', type: 'Simple Future' },
    { hindi: 'क्या तुम कल आओगे?', english: 'Will you come tomorrow?', type: 'Simple Future Question' },
  ],
  mistakes: [
    { wrong: 'He go to school.', correct: 'He goes to school.', why: 'He/She/It के साथ V1+s लगाओ' },
    { wrong: 'I did not went.', correct: 'I did not go.', why: "Did के बाद base verb V1 (went नहीं, go चाहिए)" },
    { wrong: 'She will comes tomorrow.', correct: 'She will come tomorrow.', why: 'Will के बाद always base verb V1' },
    { wrong: 'Yesterday I eat rice.', correct: 'Yesterday I ate rice.', why: 'Yesterday = past tense → V2 (ate)' },
  ],
  memoryTrick: '**P-P-F = Past-Present-Future**\n• Present = V1 (+ s for He/She/It)\n• Past = V2 (just change the verb)\n• Future = will + V1\nSimple tenses — सबसे straightforward!',
  vocabulary: [
    { word: 'Yesterday', hindi: 'कल (बीता हुआ)', example: 'Yesterday I met an old friend.' },
    { word: 'Tomorrow', hindi: 'कल (आने वाला)', example: 'Tomorrow will be a great day.' },
    { word: 'Daily', hindi: 'रोज़', example: 'I practice English daily.' },
    { word: 'Currently', hindi: 'अभी', example: 'She currently works in Mumbai.' },
    { word: 'Previously', hindi: 'पहले', example: 'He previously lived in Pune.' },
    { word: 'Eventually', hindi: 'अंततः', example: 'You will eventually succeed.' },
  ],
  speakingTips: [
    "रोज़ अपनी diary simple tenses में लिखो: 'Today I... Yesterday I... Tomorrow I will...'",
    "3 facts simple present में बताओ: 'Water boils at 100 degrees.'",
    "अपनी last week की activities simple past में describe करो",
  ],
};

// ============================================================
// Day 33 — Tenses Part 2 (Continuous Tenses)
// ============================================================
export const DAY_33_CONTENT = {
  explanation: `
**Tenses Part 2 — Continuous Tenses:**

Continuous tenses बताते हैं कि कोई action **चल रहा है / चल रहा था / चल रहा होगा।**

**1. Present Continuous (अभी हो रहा है):**
🇮🇳 मैं अभी पढ़ रहा हूँ।
🇬🇧 I **am reading** right now.
Formula: Subject + is/am/are + V1+ing

**2. Past Continuous (तब हो रहा था):**
🇮🇳 जब वह आया, मैं सो रहा था।
🇬🇧 When he came, I **was sleeping**.
Formula: Subject + was/were + V1+ing

**3. Future Continuous (तब हो रहा होगा):**
🇮🇳 कल इसी वक्त मैं train में होऊँगा।
🇬🇧 Tomorrow at this time, I **will be travelling** by train.
Formula: Subject + will be + V1+ing
  `,
  rules: [
    'Present Continuous: am/is/are + V+ing (I am, He is, They are)',
    'Past Continuous: was/were + V+ing (I was, They were)',
    'Future Continuous: will be + V+ing (all subjects)',
    'Continuous tenses show ongoing / in-progress actions',
    'Stative verbs (know, love, want, have, believe) — NOT used in continuous',
    'Signal words: now, at this moment, at that time, while, when',
    'Interrupted action: "I was watching TV when the power went off."',
  ],
  examples: [
    { hindi: 'वह अभी phone पर बात कर रही है।', english: 'She is talking on the phone right now.', type: 'Present Continuous' },
    { hindi: 'बच्चे बाहर खेल रहे हैं।', english: 'The children are playing outside.', type: 'Present Continuous (plural)' },
    { hindi: 'जब मैं खाना बना रहा था, बिजली चली गई।', english: 'While I was cooking, the power went off.', type: 'Past Continuous (interrupted)' },
    { hindi: 'वे कल सुबह 8 बजे meeting में होंगे।', english: 'They will be attending a meeting at 8 AM tomorrow.', type: 'Future Continuous' },
    { hindi: 'क्या तुम कल शाम काम कर रहे होगे?', english: 'Will you be working tomorrow evening?', type: 'Future Continuous Question' },
    { hindi: 'मैं TV नहीं देख रहा था।', english: 'I was not watching TV.', type: 'Past Continuous Negative' },
  ],
  mistakes: [
    { wrong: 'I am knowing the answer.', correct: 'I know the answer.', why: 'Know = stative verb — never use -ing form' },
    { wrong: 'She was ran when it rained.', correct: 'She was running when it rained.', why: 'Was/were + V+ing (present participle)' },
    { wrong: 'They are play cricket.', correct: 'They are playing cricket.', why: 'Continuous = be verb + V+ing' },
    { wrong: 'I will be go there.', correct: 'I will be going there.', why: 'Future Continuous: will be + V+ing' },
  ],
  memoryTrick: "**ING = In the middle of doinG** — जब भी '-ing' दिखे, action अभी बीच में है। Is/Am/Are = Present में; Was/Were = Past में; Will be = Future में!",
  vocabulary: [
    { word: 'Meanwhile', hindi: 'इसी दौरान', example: 'Meanwhile, she was preparing the report.' },
    { word: 'Simultaneously', hindi: 'एक साथ', example: 'They were working simultaneously.' },
    { word: 'Ongoing', hindi: 'जारी', example: 'The project is ongoing.' },
    { word: 'Interrupt', hindi: 'बाधा डालना', example: 'Please do not interrupt while I am speaking.' },
    { word: 'Currently', hindi: 'फिलहाल', example: 'I am currently learning English.' },
    { word: 'Progress', hindi: 'प्रगति', example: 'The work is progressing well.' },
  ],
  speakingTips: [
    "अभी क्या हो रहा है describe करो: 'Right now I am sitting and studying English.'",
    "Past story में continuous use करो: 'It was raining when I left the house.'",
    "Future plans: 'This time next week, I will be travelling to Jaipur.'",
  ],
};

// ============================================================
// Day 34 — Tenses Part 3 (Perfect Tenses)
// ============================================================
export const DAY_34_CONTENT = {
  explanation: `
**Tenses Part 3 — Perfect Tenses:**

Perfect tenses किसी action की **completion** बताते हैं।

**1. Present Perfect (अभी तक हो चुका है):**
🇮🇳 मैं यह फ़िल्म देख चुका हूँ।
🇬🇧 I **have seen** this movie.
Formula: Subject + have/has + V3

**2. Past Perfect (पहले की action से भी पहले हो चुकी थी):**
🇮🇳 जब वह घर पहुँची, बच्चे सो चुके थे।
🇬🇧 When she arrived, the children **had slept**.
Formula: Subject + had + V3

**3. Future Perfect (तब तक हो चुका होगा):**
🇮🇳 जब तुम आओगे, मैं खाना बना चुका होऊँगा।
🇬🇧 By the time you arrive, I **will have cooked** the food.
Formula: Subject + will have + V3

**Key Trigger Words:**
- Present Perfect: ever, never, already, yet, just, since, for
- Past Perfect: before, by the time, already, when
- Future Perfect: by, by the time, before
  `,
  rules: [
    'Present Perfect: have/has + V3 (I/We/You/They → have; He/She/It → has)',
    'Past Perfect: had + V3 (same for all subjects)',
    'Future Perfect: will have + V3 (same for all subjects)',
    'Perfect tenses = completion of action',
    'Present Perfect: connects past to present ("I have lived here for 5 years")',
    'Past Perfect: the earlier of two past actions',
    'Never use specific past time (yesterday, last year) with Present Perfect',
  ],
  examples: [
    { hindi: 'मैं तीन बार दिल्ली जा चुका हूँ।', english: 'I have been to Delhi three times.', type: 'Present Perfect — Experience' },
    { hindi: 'क्या उसने खाना खाया?', english: 'Has she eaten?', type: 'Present Perfect Question' },
    { hindi: 'जब train आई, हम पहले से तैयार हो चुके थे।', english: 'When the train arrived, we had already got ready.', type: 'Past Perfect' },
    { hindi: 'अगले साल तक वह degree complete कर चुकी होगी।', english: 'By next year, she will have completed her degree.', type: 'Future Perfect' },
    { hindi: 'उसने अभी तक रिपोर्ट नहीं लिखी है।', english: 'He has not written the report yet.', type: 'Present Perfect Negative' },
    { hindi: 'जब मैं वहाँ पहुँचा, वह जा चुकी थी।', english: 'When I reached there, she had already left.', type: 'Past Perfect' },
  ],
  mistakes: [
    { wrong: 'I have went yesterday.', correct: 'I went yesterday.', why: "'Yesterday' = specific past → Simple Past, not Present Perfect" },
    { wrong: 'She has went to Paris.', correct: 'She has gone to Paris.', why: 'V3 of go = gone (not went)' },
    { wrong: 'I had saw him before.', correct: 'I had seen him before.', why: 'V3 of see = seen (not saw)' },
    { wrong: 'He will has done it.', correct: 'He will have done it.', why: 'Future Perfect: will + have (not has)' },
  ],
  memoryTrick: "**Perfect = Completed ✅** — Have/Has/Had/Will Have + V3 — यह formula याद रखो।\nPresent Perfect = अभी तक; Past Perfect = पहले भी पहले; Future Perfect = तब तक",
  vocabulary: [
    { word: 'Already', hindi: 'पहले से', example: 'I have already finished the work.' },
    { word: 'Yet', hindi: 'अभी तक', example: 'Have you eaten yet?' },
    { word: 'Just', hindi: 'अभी-अभी', example: 'She has just arrived.' },
    { word: 'Ever', hindi: 'कभी', example: 'Have you ever visited Agra?' },
    { word: 'Never', hindi: 'कभी नहीं', example: 'I have never seen snow.' },
    { word: 'Since', hindi: 'से (शुरुआत से)', example: 'I have lived here since 2015.' },
  ],
  speakingTips: [
    "Experience share करो: 'Have you ever eaten sushi? I have never tried it.'",
    "Office में: 'I have already sent the email.' / 'I haven't received a reply yet.'",
    "Story: 'By the time I reached, the movie had already started.'",
  ],
};

// ============================================================
// Day 35 — Tenses Part 4 (Perfect Continuous Tenses)
// ============================================================
export const DAY_35_CONTENT = {
  explanation: `
**Tenses Part 4 — Perfect Continuous Tenses:**

ये tenses बताते हैं कि कोई action **कब से** चल रही है और **अभी भी जारी है** (या तब भी थी)।

**1. Present Perfect Continuous:**
🇮🇳 मैं 2 घंटे से पढ़ रहा हूँ।
🇬🇧 I **have been studying** for 2 hours.
Formula: Subject + have/has been + V+ing

**2. Past Perfect Continuous:**
🇮🇳 वह 3 घंटे से काम कर रहा था जब boss आया।
🇬🇧 He **had been working** for 3 hours when the boss arrived.
Formula: Subject + had been + V+ing

**3. Future Perfect Continuous:**
🇮🇳 अगले साल तक मैं 5 साल से यहाँ काम कर रहा होऊँगा।
🇬🇧 By next year, I **will have been working** here for 5 years.
Formula: Subject + will have been + V+ing

**Key Signal Words:** for, since, how long, all day, all morning
  `,
  rules: [
    'Present Perfect Continuous: have/has been + V+ing (duration up to now)',
    'Past Perfect Continuous: had been + V+ing (duration before another past event)',
    'Future Perfect Continuous: will have been + V+ing (duration by a future time)',
    'Use "for" with duration (for 2 hours, for 3 years)',
    'Use "since" with starting point (since morning, since 2020)',
    'Perfect continuous = emphasis on DURATION of an ongoing action',
    'Stative verbs cannot be used in continuous forms',
  ],
  examples: [
    { hindi: 'वह सुबह से बारिश हो रही है।', english: 'It has been raining since morning.', type: 'Present Perfect Continuous' },
    { hindi: 'मैं कितने समय से यहाँ wait कर रहा हूँ?', english: 'How long have I been waiting here?', type: 'Present Perfect Continuous Question' },
    { hindi: 'जब मैं पहुँचा, वे 2 घंटे से बात कर रहे थे।', english: 'When I arrived, they had been talking for 2 hours.', type: 'Past Perfect Continuous' },
    { hindi: '2030 तक वह 10 साल से teach कर रही होगी।', english: 'By 2030, she will have been teaching for 10 years.', type: 'Future Perfect Continuous' },
    { hindi: 'वह रात भर पढ़ रहा था।', english: 'He had been studying all night.', type: 'Past Perfect Continuous' },
    { hindi: 'हम 3 बजे से meeting में हैं।', english: 'We have been in the meeting since 3 o\'clock.', type: 'Present Perfect Continuous' },
  ],
  mistakes: [
    { wrong: 'I am studying since 2 hours.', correct: 'I have been studying for 2 hours.', why: "Duration needs 'for', and it needs Present Perfect Continuous" },
    { wrong: 'She has been knew him.', correct: 'She has known him.', why: "'Know' = stative verb, never use -ing form" },
    { wrong: 'They had been went there.', correct: 'They had been going there.', why: 'Perfect continuous = had been + V+ing (not V2)' },
    { wrong: 'I have been study.', correct: 'I have been studying.', why: "Perfect continuous always needs V+ing" },
  ],
  memoryTrick: "**'For' = Duration, 'Since' = Starting Point**\n'For 2 hours' = kitna time | 'Since morning' = kab se\nPerfect Continuous = Have/Has/Had/Will Have + been + V+ing",
  vocabulary: [
    { word: 'Duration', hindi: 'अवधि', example: 'I have been working for a long duration.' },
    { word: 'Continuous', hindi: 'लगातार', example: 'She has been continuously improving.' },
    { word: 'Throughout', hindi: 'पूरे समय', example: 'He had been working throughout the night.' },
    { word: 'Persistent', hindi: 'लगातार/दृढ़', example: 'She has been persistent in her efforts.' },
    { word: 'Steadily', hindi: 'धीरे-धीरे लेकिन लगातार', example: 'He has been steadily improving.' },
    { word: 'Endure', hindi: 'सहना', example: 'They had been enduring hardships for years.' },
  ],
  speakingTips: [
    "अपनी ongoing activities describe करो: 'I have been learning English for 35 days now!'",
    "Stories में: 'I had been waiting for an hour when she finally called.'",
    "Future goals: 'By 2026, I will have been working here for 3 years.'",
  ],
};

// ============================================================
// Day 36 — Prepositions Part 1 (in, on, at, by, for, since)
// ============================================================
export const DAY_36_CONTENT = {
  explanation: `
**Prepositions Part 1 — in, on, at, by, for, since:**

Prepositions वो words हैं जो किसी noun/pronoun का relation दूसरे word से बताते हैं।

**IN — अंदर / के अंदर:**
• Place: in the box, in the room, in India
• Time: in January, in 2024, in the morning

**ON — ऊपर (surface) / पर:**
• Place: on the table, on the wall, on the bus
• Time: on Monday, on 15 August, on my birthday

**AT — किसी specific point पर:**
• Place: at the station, at home, at school
• Time: at 5 o'clock, at noon, at night

**BY — के द्वारा / तक:**
• Agent: written by Premchand
• Deadline: finish by Friday, ready by 6 PM

**FOR — के लिए / कितने समय से:**
• Purpose: this gift is for you
• Duration: I waited for 2 hours

**SINCE — से (starting point):**
• Time start: I have lived here since 2015
• Always with Perfect tense
  `,
  rules: [
    'IN = enclosed spaces, months, years, countries, morning/evening/night',
    'ON = surfaces, specific days (on Monday), dates (on 5 March)',
    'AT = specific points/locations (at home, at 5 PM, at the corner)',
    'BY = deadline (by Friday), means of transport (by bus), agent in passive',
    'FOR = duration of time (for 2 hours), purpose (for you)',
    'SINCE = starting point in time (since 2020) — used with Perfect tenses',
    'Common errors: "in school" vs "at school" — at school = वहाँ पढ़ रहे हैं',
  ],
  examples: [
    { hindi: 'किताब बैग में है।', english: 'The book is in the bag.', type: 'IN — place (inside)' },
    { hindi: 'फ़ोन मेज़ पर है।', english: 'The phone is on the table.', type: 'ON — surface' },
    { hindi: 'मिलते हैं station पर।', english: 'Meet me at the station.', type: 'AT — specific point' },
    { hindi: 'कल तक report दे दो।', english: 'Submit the report by tomorrow.', type: 'BY — deadline' },
    { hindi: 'मैं 2 घंटे से wait कर रहा हूँ।', english: 'I have been waiting for 2 hours.', type: 'FOR — duration' },
    { hindi: 'मैं 2010 से यहाँ रह रहा हूँ।', english: 'I have been living here since 2010.', type: 'SINCE — starting point' },
  ],
  mistakes: [
    { wrong: 'I will go on home.', correct: 'I will go home. / I am at home.', why: "'Home' के साथ no preposition when going there; use 'at home' for location" },
    { wrong: 'She is at the bed.', correct: 'She is in bed. / She is on the bed.', why: "'In bed' = सो रही है; 'on the bed' = बैठी है" },
    { wrong: 'I waited since 2 hours.', correct: 'I waited for 2 hours.', why: "Duration = 'for'; starting point = 'since'" },
    { wrong: 'The meeting is in Monday.', correct: 'The meeting is on Monday.', why: "Days of week = 'on' (on Monday, on Friday)" },
  ],
  memoryTrick: "**PIE Rule:**\n• **P**oint = AT (at 5 PM, at home)\n• **I**nside = IN (in the room, in January)\n• **E**xtended Surface = ON (on the table, on Monday)\nFor = कितने समय; Since = कब से",
  vocabulary: [
    { word: 'Beneath', hindi: 'नीचे', example: 'The keys are beneath the pillow.' },
    { word: 'Adjacent', hindi: 'बगल में', example: 'The ATM is adjacent to the bank.' },
    { word: 'Regarding', hindi: 'के बारे में', example: 'Regarding your query, here is the answer.' },
    { word: 'Among', hindi: 'के बीच (कई में)', example: 'She is popular among her colleagues.' },
    { word: 'Opposite', hindi: 'सामने', example: 'The park is opposite the school.' },
    { word: 'Beyond', hindi: 'परे / आगे', example: 'Success is beyond hard work alone.' },
  ],
  speakingTips: [
    "अपने घर को describe करो using prepositions: 'My house is at... In the house there is a... On the wall there is...'",
    "Time का use करो: 'I wake up at 6, in the morning I exercise, on Sundays I relax.'",
    "Office emails: 'Please submit the report by 5 PM on Friday.'",
  ],
};

// ============================================================
// Day 37 — Prepositions Part 2 (above, below, between, among, through, across)
// ============================================================
export const DAY_37_CONTENT = {
  explanation: `
**Prepositions Part 2 — Position & Direction Prepositions:**

**ABOVE / BELOW — ऊपर / नीचे (without touching):**
🇮🇳 तस्वीर मेज़ के ऊपर है।
🇬🇧 The picture is **above** the table. (touching नहीं)
ON = ऊपर (touching); ABOVE = ऊपर (not touching)

**BETWEEN / AMONG — के बीच:**
• Between = 2 चीज़ों/लोगों के बीच
🇬🇧 The bank is **between** the post office and the school.
• Among = 3 या अधिक चीज़ों/लोगों के बीच
🇬🇧 She is the best **among** all the students.

**THROUGH — के बीच से (अंदर से गुज़रना):**
🇮🇳 हम जंगल के बीच से निकले।
🇬🇧 We walked **through** the forest.

**ACROSS — के पार / आर-पार:**
🇮🇳 वह नदी के उस पार है।
🇬🇧 She swam **across** the river.

**Other Important Prepositions:**
• **Behind** = पीछे | **In front of** = सामने
• **Over** = ऊपर से (motion) | **Under** = नीचे
• **Along** = के साथ-साथ | **Around** = चारों तरफ
  `,
  rules: [
    'Above/Below = without physical contact (above the cloud, below zero)',
    'On/Under = with surface contact (on the table, under the table)',
    'Between = exactly 2 people/things (between you and me)',
    'Among = 3 or more in a group (among friends, among the crowd)',
    'Through = movement inside and out (through the tunnel)',
    'Across = movement from one side to the other (across the street)',
    'Over = above with movement or covering (jumped over, spread over)',
  ],
  examples: [
    { hindi: 'Fan छत के नीचे लगा है।', english: 'The fan is below the ceiling.', type: 'BELOW — position' },
    { hindi: 'हम आपस में बात कर रहे थे।', english: 'We were talking among ourselves.', type: 'AMONG — group' },
    { hindi: 'दो दोस्तों के बीच में झगड़ा हुआ।', english: 'There was a fight between two friends.', type: 'BETWEEN — two' },
    { hindi: 'ट्रेन tunnel के अंदर से गुज़री।', english: 'The train went through the tunnel.', type: 'THROUGH — inside movement' },
    { hindi: 'वह सड़क पार कर रहा है।', english: 'He is walking across the road.', type: 'ACROSS — from one side to other' },
    { hindi: 'Bridge नदी के ऊपर बना है।', english: 'The bridge is over the river.', type: 'OVER — above with span' },
  ],
  mistakes: [
    { wrong: 'She sits between all her friends.', correct: 'She sits among all her friends.', why: "Between = 2 only; Among = 3 या ज़्यादा" },
    { wrong: 'The bird flew across the trees.', correct: 'The bird flew through the trees.', why: "'Through' = अंदर से; 'across' = एक side से दूसरी side" },
    { wrong: 'There is a bridge above the river.', correct: 'There is a bridge over the river.', why: "Spanning = 'over'; simply higher = 'above'" },
    { wrong: 'She swam over the river.', correct: 'She swam across the river.', why: "'Across' for swimming/crossing from one side to another" },
  ],
  memoryTrick: "**B-A-T**:\n• **B**etween = 2 things\n• **A**mong = 3+ in a group\n• **T**hrough = enter one side, exit other\n\nACROSS = A+CROSS (सड़क को cross करना) → surface को cross करना",
  vocabulary: [
    { word: 'Vicinity', hindi: 'आस-पास', example: 'There is a hospital in the vicinity.' },
    { word: 'Adjacent', hindi: 'बगल में', example: 'The library is adjacent to the college.' },
    { word: 'Peripheral', hindi: 'किनारे पर', example: 'He sits on the peripheral seat.' },
    { word: 'Overhead', hindi: 'ऊपर से', example: 'An airplane flew overhead.' },
    { word: 'Beneath', hindi: 'नीचे', example: 'The treasure is buried beneath the ground.' },
    { word: 'Surrounding', hindi: 'चारों ओर', example: 'Mountains surround the valley.' },
  ],
  speakingTips: [
    "अपने office/school का description दो: 'My desk is between the window and the door.'",
    "Directions देते समय: 'Go through the market, across the bridge, then turn right.'",
    "रोज़ 3 sentences different prepositions से बनाओ",
  ],
};

// ============================================================
// Day 38 — Has To / Have To (Obligation)
// ============================================================
export const DAY_38_CONTENT = {
  explanation: `
**Has To / Have To — External Obligation (बाहरी ज़रूरत):**

"Have to / Has to" = करना पड़ता है / करना होता है
यह external obligation है — rules, circumstances, या someone else की requirement से।

**Have To vs Must:**
• Must = internal obligation (मैं खुद feel करता हूँ)
• Have to = external obligation (कोई rule या situation force करती है)

**Structure:**
• I/We/You/They → **have to** + V1
• He/She/It → **has to** + V1

🇮🇳 मुझे हर रोज़ office जाना पड़ता है।
🇬🇧 I **have to** go to office every day.

🇮🇳 उसे uniform पहनना पड़ता है।
🇬🇧 She **has to** wear a uniform.

**Negative (Don't have to = ज़रूरी नहीं):**
I don't have to = मुझे ज़रूरी नहीं (choice है!)
(यह "must not" से बिल्कुल अलग है — must not = absolutely forbidden)
  `,
  rules: [
    'I/We/You/They → have to + V1',
    'He/She/It → has to + V1',
    'Negative: do not have to / does not have to (= not necessary, optional)',
    'Question: Do I have to...? / Does she have to...?',
    'Must not = forbidden (बिल्कुल मत करो)',
    "Don't have to = optional (ज़रूरी नहीं, but you can if you want)",
    'Have to = more common in spoken English than must',
  ],
  examples: [
    { hindi: 'मुझे कल जल्दी उठना पड़ेगा।', english: 'I have to wake up early tomorrow.', type: 'Personal obligation' },
    { hindi: 'उसे daily report submit करनी पड़ती है।', english: 'He has to submit a daily report.', type: 'Job requirement' },
    { hindi: 'क्या तुम्हें वहाँ जाना पड़ेगा?', english: 'Do you have to go there?', type: 'Question' },
    { hindi: 'उसे चश्मा पहनना पड़ता है।', english: 'She has to wear glasses.', type: 'Physical necessity' },
    { hindi: 'मुझे आज office नहीं जाना है। (छुट्टी है)', english: "I don't have to go to office today. (It's a holiday)", type: "Don't have to — no obligation" },
    { hindi: 'हमें सभी rules follow करने पड़ते हैं।', english: 'We have to follow all the rules.', type: 'External rule' },
  ],
  mistakes: [
    { wrong: 'She have to study.', correct: 'She has to study.', why: 'She/He/It → has to (not have to)' },
    { wrong: 'I have to studied.', correct: 'I have to study.', why: 'Have to + V1 (base form always)' },
    { wrong: "I don't have to go = I must not go.", correct: "Don't have to = optional; Must not = forbidden", why: 'These have completely different meanings!' },
    { wrong: 'Does she has to go?', correct: 'Does she have to go?', why: 'Does already adds the present tense — base form "have to" follows' },
  ],
  memoryTrick: "**Have To = RULE BOOK 📋** — जब कोई rule, boss, या situation कहे 'करो' = have to/has to.\n**Don't have to = FREE CHOICE 🆓** — ज़रूरी नहीं, तुम्हारी मर्ज़ी!\nMust Not ≠ Don't have to",
  vocabulary: [
    { word: 'Compulsory', hindi: 'अनिवार्य', example: 'Wearing helmets is compulsory.' },
    { word: 'Mandatory', hindi: 'अनिवार्य (law)', example: 'Training is mandatory for new staff.' },
    { word: 'Necessary', hindi: 'ज़रूरी', example: 'It is necessary to submit the form.' },
    { word: 'Optional', hindi: 'वैकल्पिक', example: "Attendance on Saturday is optional — you don't have to come." },
    { word: 'Requirement', hindi: 'शर्त/ज़रूरत', example: 'Meeting this requirement is important.' },
    { word: 'Exempt', hindi: 'छूट/मुक्त', example: 'Senior citizens are exempt from this rule.' },
  ],
  speakingTips: [
    "अपनी daily obligations बताओ: 'I have to wake up at 6, I have to cook breakfast...'",
    "Office में: 'I have to submit this report by end of day.'",
    "Difference practice करो: 'I have to go.' (must) vs 'I don't have to go.' (optional)",
  ],
};

// ============================================================
// Day 39 — Had To / Will Have To
// ============================================================
export const DAY_39_CONTENT = {
  explanation: `
**Had To / Will Have To — Past & Future Obligation:**

"Have to" का past और future form:
• **Had to** = Past obligation (करना पड़ा था)
• **Will have to** = Future obligation (करना पड़ेगा)

**HAD TO (Past — सभी subjects के साथ same):**
🇮🇳 मुझे कल रात देर तक काम करना पड़ा।
🇬🇧 I **had to** work late last night.

🇮🇳 उसे doctor के पास जाना पड़ा।
🇬🇧 She **had to** go to the doctor.

**WILL HAVE TO (Future obligation):**
🇮🇳 तुम्हें कड़ी मेहनत करनी पड़ेगी।
🇬🇧 You **will have to** work hard.

🇮🇳 अगर traffic रहा, तो हमें जल्दी निकलना पड़ेगा।
🇬🇧 If there is traffic, we **will have to** leave early.

**Negative:**
• Did not have to = past में ज़रूरी नहीं था
• Will not have to = future में ज़रूरी नहीं होगा
  `,
  rules: [
    'Had to + V1 = past obligation (all subjects: I/he/she/we/they + had to)',
    'Will have to + V1 = future obligation (all subjects)',
    'Negative past: did not have to + V1 (past was optional)',
    'Negative future: will not have to + V1 (future will be optional)',
    'Question past: Did you have to...? / Did she have to...?',
    'Question future: Will I have to...? / Will she have to...?',
    '"Had to" replaces "must" in past tense (must has no past form)',
  ],
  examples: [
    { hindi: 'उसे अचानक दिल्ली जाना पड़ा।', english: 'He had to go to Delhi suddenly.', type: 'Had to — sudden obligation' },
    { hindi: 'हमें सारी रात जागना पड़ा।', english: 'We had to stay up all night.', type: 'Had to — effort' },
    { hindi: 'क्या तुम्हें exam देना पड़ा?', english: 'Did you have to give the exam?', type: 'Had to — question' },
    { hindi: 'तुम्हें नया laptop खरीदना पड़ेगा।', english: 'You will have to buy a new laptop.', type: 'Will have to — future' },
    { hindi: 'अगर बारिश रही, तो plan बदलना पड़ेगा।', english: 'If it rains, we will have to change the plan.', type: 'Will have to — conditional' },
    { hindi: 'उसे कल exam नहीं देना पड़ा।', english: 'He did not have to give the exam yesterday.', type: 'Did not have to' },
  ],
  mistakes: [
    { wrong: 'I had to went.', correct: 'I had to go.', why: 'Had to + V1 (base form always)' },
    { wrong: 'She will has to work.', correct: 'She will have to work.', why: "'Will have to' — 'have' stays the same (not 'has')" },
    { wrong: 'He musted go.', correct: 'He had to go.', why: "'Must' has no past form — use 'had to' for past obligation" },
    { wrong: 'Did she had to leave?', correct: 'Did she have to leave?', why: "'Did' + base form: 'have to' (not 'had to')" },
  ],
  memoryTrick: "**Must → Had To (Past) → Will Have To (Future)**\n'Must' present के लिए है; Past में 'had to'; Future में 'will have to'। यह obligation का पूरा family है!",
  vocabulary: [
    { word: 'Urgent', hindi: 'तत्काल', example: 'There was an urgent need — I had to leave.' },
    { word: 'Inevitable', hindi: 'अनिवार्य', example: 'Change is inevitable — you will have to adapt.' },
    { word: 'Reluctantly', hindi: 'अनिच्छा से', example: 'He had to reluctantly agree.' },
    { word: 'Cope', hindi: 'सामना करना', example: 'She had to cope with many challenges.' },
    { word: 'Deadline', hindi: 'समय-सीमा', example: 'I will have to meet the deadline.' },
    { word: 'Sacrifice', hindi: 'बलिदान', example: 'He had to sacrifice his holidays for work.' },
  ],
  speakingTips: [
    "Past stories: 'Last week I had to work on Sunday because of the deadline.'",
    "Future plans: 'If I want to get promoted, I will have to improve my skills.'",
    "Empathy: 'You had to handle so much alone — I appreciate your effort.'",
  ],
};

// ============================================================
// Day 40 — Make / Get (Causative Verbs)
// ============================================================
export const DAY_40_CONTENT = {
  explanation: `
**Make / Get — Causative Verbs (किसी से कुछ करवाना):**

Causative verbs बताते हैं कि कोई person किसी **दूसरे से** कुछ **करवाता** है।

**MAKE (force करना / मजबूर करना):**
Structure: Make + object + V1 (base verb)
🇮🇳 उसने मुझे हँसाया।
🇬🇧 She **made me laugh**.

🇮🇳 Teacher ने बच्चों को दौड़ाया।
🇬🇧 The teacher **made** the children **run**.

**GET (persuade करना / काम करवाना — more informal):**
Structure: Get + object + to + V1
🇮🇳 उसने mechanic से गाड़ी ठीक करवाई।
🇬🇧 She **got** the mechanic **to fix** the car.

🇮🇳 मैंने बच्चे से homework करवाया।
🇬🇧 I **got** the child **to do** the homework.

**HAVE (professional service करवाना):**
Structure: Have + object + V3 (passive sense)
🇬🇧 I **had** my hair **cut**. (haircut करवाया)
🇬🇧 She **had** the report **written**. (report लिखवाई)
  `,
  rules: [
    'Make + object + V1 (base) = force/compel someone to do something',
    'Get + object + to + V1 = persuade/arrange for someone to do something',
    'Have + object + V3 = arrange a service (professional context)',
    'Let + object + V1 = allow someone to do something (Day 13)',
    'Make is stronger (force); Get is gentler (persuade/arrange)',
    'Make can also mean "create": make a cake, make a decision',
    'Get can also mean "obtain/receive": get a job, get a message',
  ],
  examples: [
    { hindi: 'उसने मुझे रोया।', english: 'He made me cry.', type: 'Make — emotional cause' },
    { hindi: 'Boss ने उसे दोबारा काम करवाया।', english: 'The boss made him redo the work.', type: 'Make — professional' },
    { hindi: 'उसने doctor को time पर बुलवा लिया।', english: 'She got the doctor to come on time.', type: 'Get — arrange' },
    { hindi: 'मैंने अपना phone repair करवाया।', english: 'I got my phone repaired.', type: 'Get — service (informal)' },
    { hindi: 'उसने घर पेंट करवाया।', english: 'He had his house painted.', type: 'Have — professional service' },
    { hindi: 'माँ ने बच्चों से कमरा साफ करवाया।', english: 'Mother made the children clean the room.', type: 'Make — household' },
  ],
  mistakes: [
    { wrong: 'She made me to cry.', correct: 'She made me cry.', why: "Make + object + V1 (no 'to')" },
    { wrong: 'He got me repair the bike.', correct: 'He got me to repair the bike.', why: "Get + object + TO + V1 ('to' is required)" },
    { wrong: 'I had my car fixing.', correct: 'I had my car fixed.', why: 'Have + object + V3 (past participle)' },
    { wrong: 'He maked me laugh.', correct: 'He made me laugh.', why: "'Make' का past = 'made' (not maked — irregular verb)" },
  ],
  memoryTrick: "**MAKE = Force 💪, GET = Ask/Arrange 🤝, HAVE = Hire/Service 🔧**\nMake + V1 (no to) | Get + TO + V1 | Have + V3\nYaad rakho: Make = forceful (no to); Get = gentle with TO!",
  vocabulary: [
    { word: 'Persuade', hindi: 'मनाना', example: 'She persuaded me to join the club.' },
    { word: 'Compel', hindi: 'मजबूर करना', example: 'The rules compel employees to be on time.' },
    { word: 'Authorize', hindi: 'अधिकृत करना', example: 'I authorized the team to proceed.' },
    { word: 'Delegate', hindi: 'सौंपना', example: 'He delegated the work to his assistant.' },
    { word: 'Assign', hindi: 'काम देना', example: 'The teacher assigned homework to students.' },
    { word: 'Hire', hindi: 'किराए पर लेना', example: 'We hired a plumber to fix the pipe.' },
  ],
  speakingTips: [
    "Daily life में use करो: 'I got my shoes polished.' / 'She made me wait for an hour!'",
    "Professional: 'I had the report proofread before sending.'",
    "Story telling: 'The teacher made the entire class repeat the poem three times.'",
  ],
};

// ============================================================
// Day 41 — Going To (Future Plans)
// ============================================================
export const DAY_41_CONTENT = {
  explanation: `
**Going To — Future Plans & Predictions:**

"Going to" का use होता है जब:
1. **पहले से plan बना हुआ हो** (decided before speaking)
2. **Evidence से future predict कर रहे हों** (something obvious is about to happen)

**Structure:**
Subject + **am/is/are + going to** + V1

🇮🇳 मैं अगले महीने दिल्ली जाने वाला हूँ।
🇬🇧 I **am going to** visit Delhi next month. (planned)

🇮🇳 देखो काले बादल हैं — बारिश होने वाली है।
🇬🇧 Look at those dark clouds — it **is going to** rain. (evidence)

**Going To vs Will:**
| Going To | Will |
|----------|------|
| Pre-planned | Spontaneous decision |
| "I am going to study" (planned) | "OK, I will study now" (just decided) |
| Evidence-based prediction | General prediction |
  `,
  rules: [
    'Am/Is/Are + going to + V1 (all subjects: correct be verb)',
    'I → am going to; He/She/It → is going to; We/You/They → are going to',
    'Negative: am/is/are + NOT going to + V1',
    'Question: Am/Is/Are + subject + going to + V1?',
    'Going to = future plans already decided (vs Will = spontaneous)',
    'Going to = evidence-based predictions (vs Will = general beliefs)',
    'Spoken: "gonna" = informal short form of "going to"',
  ],
  examples: [
    { hindi: 'हम कल picnic पर जाने वाले हैं।', english: 'We are going to go on a picnic tomorrow.', type: 'Future plan' },
    { hindi: 'वह MBA करने वाला है।', english: 'He is going to do an MBA.', type: 'Career plan' },
    { hindi: 'देखो — वह गिरने वाला है!', english: 'Look — he is going to fall!', type: 'Immediate prediction' },
    { hindi: 'क्या तुम party में आने वाले हो?', english: 'Are you going to come to the party?', type: 'Question' },
    { hindi: 'मैं आज chocolate नहीं खाने वाला।', english: 'I am not going to eat chocolate today.', type: 'Negative plan' },
    { hindi: 'उनकी company expand होने वाली है।', english: 'Their company is going to expand.', type: 'Business prediction' },
  ],
  mistakes: [
    { wrong: 'I am going to went there.', correct: 'I am going to go there.', why: 'Going to + V1 (base form always)' },
    { wrong: 'She going to leave.', correct: 'She is going to leave.', why: "Be verb (is/am/are) required before 'going to'" },
    { wrong: 'He is go to study.', correct: 'He is going to study.', why: "Full form: 'going to' (not just 'go to')" },
    { wrong: 'Are you going to came?', correct: 'Are you going to come?', why: 'Going to + V1 (not past tense)' },
  ],
  memoryTrick: "**Going To = Already Decided ✅ OR Evidence Seen 👀**\nजब plan पहले से ready हो = Going To\nजब कुछ obvious दिख रहा हो = Going To\nWill = अभी सोचा, अभी कहा!",
  vocabulary: [
    { word: 'Plan', hindi: 'योजना', example: 'I am going to plan a road trip.' },
    { word: 'Intend', hindi: 'इरादा रखना', example: 'I intend to improve my English.' },
    { word: 'Schedule', hindi: 'समय-सारणी', example: 'The meeting is going to be rescheduled.' },
    { word: 'Anticipate', hindi: 'उम्मीद करना', example: 'We anticipate the project is going to succeed.' },
    { word: 'Upcoming', hindi: 'आने वाला', example: 'I am going to prepare for the upcoming exam.' },
    { word: 'Initiative', hindi: 'पहल', example: 'She is going to take a new initiative.' },
  ],
  speakingTips: [
    "Weekly planning: 'This week I am going to practice speaking for 30 minutes daily.'",
    "Evidence prediction: 'Look at the traffic — we are going to be late!'",
    "Career goals: 'I am going to get a promotion by the end of this year.'",
  ],
};

// ============================================================
// Day 42 — About To (Immediate Future)
// ============================================================
export const DAY_42_CONTENT = {
  explanation: `
**About To — Immediate Future (अभी होने वाला है!):**

"About to" = अभी-अभी / बस अभी होने वाला है (happening very very soon!)

🇮🇳 ट्रेन अभी चलने वाली है।
🇬🇧 The train **is about to** leave.

🇮🇳 मैं अभी खाना खाने वाला हूँ।
🇬🇧 I **am about to** eat.

**Structure:** Subject + am/is/are + **about to** + V1

**About To vs Going To:**
| About To | Going To |
|----------|----------|
| बस अभी (seconds/minutes) | Future में (hours/days) |
| "I am about to call" (dialing now!) | "I am going to call later" (plan) |
| Very immediate | Not necessarily immediate |

**Negative (was/were just about to = पर रोक दिया):**
🇮🇳 मैं जाने ही वाला था कि बारिश शुरू हो गई।
🇬🇧 I **was about to** leave when it started raining.
  `,
  rules: [
    'Am/Is/Are + about to + V1 = something happening in seconds/minutes',
    'I → am about to; He/She/It → is about to; We/You/They → are about to',
    'Past: was/were + about to (something was imminent but may have been interrupted)',
    'Negative: am/is/are NOT about to + V1 (= definitely not happening soon)',
    'About to = most immediate future (more urgent than "going to")',
    'Common in announcements: "The flight is about to depart."',
    'Interrupted: "I was about to call when..." = something stopped it',
  ],
  examples: [
    { hindi: 'Film शुरू होने वाली है — जल्दी बैठो।', english: 'The movie is about to start — sit down quickly.', type: 'Announcement' },
    { hindi: 'वह रोने ही वाली थी।', english: 'She was about to cry.', type: 'Past — about to' },
    { hindi: 'मैं अभी call करने वाला हूँ।', english: 'I am about to call.', type: 'Very immediate' },
    { hindi: 'हम खाने वाले ही थे कि phone बजा।', english: 'We were about to eat when the phone rang.', type: 'Interrupted action' },
    { hindi: 'Meeting शुरू होने वाली है।', english: 'The meeting is about to begin.', type: 'Professional announcement' },
    { hindi: 'वह अपना पासवर्ड भूलने ही वाला था।', english: 'He was about to forget his password.', type: 'Near miss' },
  ],
  mistakes: [
    { wrong: 'I about to go.', correct: 'I am about to go.', why: "Be verb (am/is/are) required before 'about to'" },
    { wrong: 'She is about to went.', correct: 'She is about to go.', why: 'About to + V1 (base form, not past tense)' },
    { wrong: 'He was about to leaving.', correct: 'He was about to leave.', why: 'About to + V1 (not V+ing)' },
    { wrong: 'The train is going to leave now.', correct: 'The train is about to leave.', why: "'About to' for immediate seconds — 'going to' for future plans" },
  ],
  memoryTrick: "**ABOUT TO = LAUNCHING 🚀** — जैसे rocket launch countdown में 3...2...1...🚀 — About To बताता है वो last second वाला moment। 'Going to' = next week; 'About to' = 3...2...1!",
  vocabulary: [
    { word: 'Imminent', hindi: 'आसन्न/बस होने वाला', example: 'Danger is imminent — leave now!' },
    { word: 'Shortly', hindi: 'बस थोड़ी देर में', example: 'The doctor will see you shortly.' },
    { word: 'Momentarily', hindi: 'एक पल में', example: 'The show will begin momentarily.' },
    { word: 'Impending', hindi: 'नज़दीक आता हुआ', example: 'An impending storm is about to hit.' },
    { word: 'Interrupt', hindi: 'रोकना', example: 'I was about to speak when he interrupted me.' },
    { word: 'Announce', hindi: 'घोषणा करना', example: 'The principal is about to announce the results.' },
  ],
  speakingTips: [
    "Announcements में: 'Attention please, the bus is about to depart.'",
    "Dramatic stories: 'I was about to sign the contract when I noticed an error.'",
    "Daily use: 'I am about to head out — do you need anything?'",
  ],
};

// ============================================================
// Day 43 — Want To / Wanted To
// ============================================================
export const DAY_43_CONTENT = {
  explanation: `
**Want To / Wanted To — Expressing Desire:**

**WANT TO (Present Desire — अभी चाहना):**
Structure: Subject + want/wants + to + V1

🇮🇳 मैं English fluent बोलना चाहता हूँ।
🇬🇧 I **want to** speak English fluently.

He/She/It → **wants to** + V1
I/You/We/They → **want to** + V1

**WANTED TO (Past Desire — पहले चाहता था):**
Structure: Subject + **wanted to** + V1 (same for all)

🇮🇳 मैं बचपन में cricketer बनना चाहता था।
🇬🇧 I **wanted to** become a cricketer in childhood.

**Important Patterns:**
• I want + noun: "I want a coffee."
• I want + to + V1: "I want to learn."
• I want + object + to + V1: "I want you to help me."
• I wanted + object + to + V1: "I wanted him to come."
  `,
  rules: [
    'Want to + V1 = present desire (want/wants based on subject)',
    'Wanted to + V1 = past desire (same for all subjects)',
    'Want + noun: "I want water" (direct object)',
    'Want + object + to + V1: "I want you to stay."',
    'Want is a stative verb — never use "wanting" or "am wanting"',
    'Question: Do you want to...? / Did you want to...?',
    'Negative: do not want to / did not want to',
  ],
  examples: [
    { hindi: 'मैं एक नई गाड़ी खरीदना चाहता हूँ।', english: 'I want to buy a new car.', type: 'Want to — present' },
    { hindi: 'वह यहाँ नहीं आना चाहती।', english: 'She does not want to come here.', type: 'Does not want to' },
    { hindi: 'क्या तुम कुछ खाना चाहते हो?', english: 'Do you want to eat something?', type: 'Question' },
    { hindi: 'मैं चाहता हूँ कि तुम यहाँ रहो।', english: 'I want you to stay here.', type: 'Want + object + to' },
    { hindi: 'मैं पहले IAS बनना चाहता था।', english: 'I wanted to become an IAS officer.', type: 'Wanted to — childhood dream' },
    { hindi: 'उसने चाहा था कि meeting रद्द हो।', english: 'She wanted the meeting to be cancelled.', type: 'Wanted + object + to' },
  ],
  mistakes: [
    { wrong: 'I am wanting to go.', correct: 'I want to go.', why: 'Want = stative verb — never use am/is/are + wanting' },
    { wrong: 'She want to study.', correct: 'She wants to study.', why: 'She/He/It → wants (add s)' },
    { wrong: 'Did he wanted to come?', correct: 'Did he want to come?', why: "'Did' + base form: 'want to' (not 'wanted to')" },
    { wrong: 'I want that he leaves.', correct: 'I want him to leave.', why: "Want + object + to + V1 (not 'want that + clause')" },
  ],
  memoryTrick: "**Want = Direct Desire Express करना**\nWant TO + verb = मेरी खुद की इच्छा\nWant + someone + TO + verb = किसी और की इच्छा करना\nWanting = कभी नहीं (stative verb है!)",
  vocabulary: [
    { word: 'Desire', hindi: 'इच्छा', example: 'My desire is to speak fluent English.' },
    { word: 'Aspire', hindi: 'आकांक्षा', example: 'I aspire to become a great leader.' },
    { word: 'Crave', hindi: 'तरसना', example: 'He craves recognition for his work.' },
    { word: 'Yearn', hindi: 'लालसा करना', example: 'She yearns to travel the world.' },
    { word: 'Ambition', hindi: 'महत्वाकांक्षा', example: 'His ambition is to start his own company.' },
    { word: 'Pursue', hindi: 'पाने की कोशिश करना', example: 'I want to pursue my passion.' },
  ],
  speakingTips: [
    "Daily goals: 'Today I want to complete 5 lessons and practice speaking.'",
    "Expressing feelings: 'I wanted to tell you this earlier but...'",
    "Professional: 'I want this project to be completed by Friday.'",
  ],
};

// ============================================================
// Day 44 — Need To / Needed To
// ============================================================
export const DAY_44_CONTENT = {
  explanation: `
**Need To / Needed To — Necessity & Requirement:**

"Need to" = ज़रूरत है / करना ज़रूरी है
"Needed to" = ज़रूरत थी / करना ज़रूरी था

**NEED TO (Present Necessity):**
Structure: Subject + need/needs + to + V1

🇮🇳 मुझे यह form भरना है।
🇬🇧 I **need to** fill this form.

🇮🇳 उसे और practice चाहिए।
🇬🇧 She **needs to** practice more.

**NEEDED TO (Past Necessity):**
Structure: Subject + **needed to** + V1 (same for all)

🇮🇳 उसे कल doctor के पास जाना था।
🇬🇧 She **needed to** visit the doctor yesterday.

**Need To vs Have To:**
• Need to = felt necessity (personal feeling)
• Have to = external rule/obligation
• Both are similar in practice — use interchangeably in daily speech

**Don't need to = Needn't = ज़रूरत नहीं**
  `,
  rules: [
    'I/You/We/They → need to + V1',
    'He/She/It → needs to + V1',
    'Past: needed to + V1 (all subjects)',
    "Negative: don't/doesn't need to = not necessary (optional)",
    'Negative past: did not need to + V1',
    "Question: Do you need to...? / Does she need to...?",
    'Need can also take a noun: "I need water." / "She needed help."',
  ],
  examples: [
    { hindi: 'मुझे कल जल्दी उठना है।', english: 'I need to wake up early tomorrow.', type: 'Personal need' },
    { hindi: 'इस project को update करने की ज़रूरत है।', english: 'This project needs to be updated.', type: 'Professional need' },
    { hindi: 'क्या तुम्हें कुछ मदद चाहिए?', english: 'Do you need any help?', type: 'Question (need + noun)' },
    { hindi: 'उसे एक break की ज़रूरत थी।', english: 'She needed a break.', type: 'Needed — past noun' },
    { hindi: 'तुम्हें घबराने की ज़रूरत नहीं।', english: "You don't need to worry.", type: "Don't need to" },
    { hindi: 'मुझे कल सुबह जल्दी office जाना था।', english: 'I needed to go to the office early yesterday morning.', type: 'Needed to — past' },
  ],
  mistakes: [
    { wrong: 'She need to call.', correct: 'She needs to call.', why: 'She/He/It → needs to (add -s)' },
    { wrong: 'I am needing to go.', correct: 'I need to go.', why: 'Need = stative verb — no -ing form' },
    { wrong: 'Did he needed to stay?', correct: 'Did he need to stay?', why: "'Did' + base form: 'need to' (not 'needed to')" },
    { wrong: 'I neededn\'t to go.', correct: "I didn't need to go. / I needn't go.", why: 'Use did not need to (or needn\'t + V1 without "to") for negative past' },
  ],
  memoryTrick: "**NEED TO = Personal Necessity 🎯**\nNeed to = मुझे feel होता है ज़रूरत\nHave to = rule/situation force करती है\nDon't need to = No compulsion (relief! 😌)\nSame pattern as Want to — S के लिए needs!",
  vocabulary: [
    { word: 'Necessity', hindi: 'ज़रूरत', example: 'Water is a basic necessity.' },
    { word: 'Essential', hindi: 'आवश्यक', example: 'It is essential to practice daily.' },
    { word: 'Crucial', hindi: 'अत्यंत महत्वपूर्ण', example: 'Sleep is crucial for good health.' },
    { word: 'Urgent', hindi: 'तत्काल', example: 'I urgently need to speak with you.' },
    { word: 'Require', hindi: 'आवश्यकता होना', example: 'The project requires immediate attention.' },
    { word: 'Indispensable', hindi: 'अपरिहार्य', example: 'Communication skills are indispensable.' },
  ],
  speakingTips: [
    "Health advice: 'You need to drink more water and sleep properly.'",
    "Project discussion: 'We need to finalize the budget by Thursday.'",
    "Casual: 'You don't need to bring anything — just come!'",
  ],
};

// ============================================================
// Day 45 — Fond Of (Liking Something)
// ============================================================
export const DAY_45_CONTENT = {
  explanation: `
**Fond Of — Expressing Liking (पसंद करना / शौक होना):**

"Fond of" = किसी चीज़ का शौक होना / पसंद करना
(Strong liking — like + like से ज़्यादा affectionate)

**Structure:** Subject + am/is/are + **fond of** + noun/V+ing

🇮🇳 मुझे music का बहुत शौक है।
🇬🇧 I **am fond of** music.

🇮🇳 वह बच्चों से बहुत प्यार करती है।
🇬🇧 She **is fond of** children.

🇮🇳 उसे पढ़ने का बहुत शौक है।
🇬🇧 He **is fond of** reading.

**Related Expressions:**
• Keen on: I am keen on photography. (enthusiastic about)
• Passionate about: She is passionate about dancing.
• Crazy about: He is crazy about cricket.
• Interested in: I am interested in learning French.
• Addicted to: She is addicted to social media. (negative)
  `,
  rules: [
    'Fond of + noun: "She is fond of cats."',
    'Fond of + V+ing: "I am fond of cooking."',
    'Subject + am/is/are + fond of (be verb changes with subject)',
    'Past: was/were fond of (He was fond of painting.)',
    '"Not fond of" = does not like much',
    'Fond of = warmer/deeper than "like" — often for people, hobbies, things we love',
    'Do not say "fond to" — always "fond OF"',
  ],
  examples: [
    { hindi: 'मुझे यात्रा करने का बहुत शौक है।', english: 'I am fond of travelling.', type: 'Fond of + V+ing' },
    { hindi: 'वह मिठाई का बहुत शौकीन है।', english: 'He is very fond of sweets.', type: 'Fond of + noun' },
    { hindi: 'दादी को बच्चों से बहुत प्यार है।', english: 'Grandmother is very fond of children.', type: 'Fond of + people' },
    { hindi: 'वह photography की शौकीन थी।', english: 'She was fond of photography.', type: 'Was fond of — past' },
    { hindi: 'मुझे तेज़ खाने का शौक नहीं है।', english: 'I am not fond of spicy food.', type: 'Not fond of' },
    { hindi: 'हम दोनों किताबों के शौकीन हैं।', english: 'Both of us are fond of books.', type: 'Plural' },
  ],
  mistakes: [
    { wrong: 'I am fond to dance.', correct: 'I am fond of dancing.', why: "'Fond of' + V+ing (not fond to + V1)" },
    { wrong: 'She is fond for music.', correct: 'She is fond of music.', why: "'Fond of' — always use 'of' preposition" },
    { wrong: 'He fond of cricket.', correct: 'He is fond of cricket.', why: "Be verb 'is' is required: 'He IS fond of'" },
    { wrong: 'I am fond of to read.', correct: 'I am fond of reading.', why: "'Fond of' + V+ing (not 'to + V1')" },
  ],
  memoryTrick: "**FOND OF = OF से याद रखो 💝**\nFOND + OF + noun/V+ing\nFOND + TO = WRONG ❌\nFond = affectionate liking — like से ज़्यादा warm feeling!",
  vocabulary: [
    { word: 'Enthusiastic', hindi: 'उत्साही', example: 'She is enthusiastic about her work.' },
    { word: 'Passionate', hindi: 'जुनूनी', example: 'He is passionate about music.' },
    { word: 'Keen', hindi: 'उत्सुक', example: 'I am keen on learning new languages.' },
    { word: 'Affectionate', hindi: 'स्नेही', example: 'She is affectionate towards animals.' },
    { word: 'Devoted', hindi: 'समर्पित', example: 'He is devoted to his hobby.' },
    { word: 'Addicted', hindi: 'आदी (negatively)', example: 'Try not to be addicted to screens.' },
  ],
  speakingTips: [
    "Introduction में: 'I am very fond of reading novels and watching documentaries.'",
    "About family: 'My father is very fond of gardening.'",
    "Office small talk: 'Are you fond of any particular cuisine?'",
  ],
};

// ============================================================
// Day 46 — Able To (Ability)
// ============================================================
export const DAY_46_CONTENT = {
  explanation: `
**Able To — Expressing Ability (क्षमता):**

"Able to" = सकना / करने में सक्षम होना
यह "can" का formal alternative है और सभी tenses में use होता है।

**CAN vs ABLE TO:**
| Can | Able To |
|-----|---------|
| Present ability | All tenses |
| "I can swim" | "I am able to swim" |
| More common/natural | More formal |

**Structures in Different Tenses:**
• Present: I **am able to** + V1 (= I can)
• Past: I **was able to** + V1 (= I could)
• Future: I **will be able to** + V1
• Perfect: I **have been able to** + V1

🇮🇳 मैं 10 बजे तक काम खत्म कर पाऊँगा।
🇬🇧 I **will be able to** finish the work by 10.

🇮🇳 वह बचपन में 5 भाषाएँ बोलने में सक्षम था।
🇬🇧 He **was able to** speak 5 languages as a child.
  `,
  rules: [
    'Am/Is/Are + able to + V1 = present ability (formal)',
    'Was/Were + able to + V1 = past ability (specific achievement)',
    'Will be able to + V1 = future ability',
    'Have/has been able to + V1 = present perfect ability',
    'Could = general past ability; Was able to = specific occasion',
    '"Could not" and "was not able to" = similar negative meanings',
    'After modals, use "be able to": "I will be able to..." (not "I will can...")',
  ],
  examples: [
    { hindi: 'मैं इस मुश्किल problem को solve कर पाया।', english: 'I was able to solve this difficult problem.', type: 'Specific achievement (past)' },
    { hindi: 'वह अगले साल तक fluent English बोल पाएगी।', english: 'She will be able to speak fluent English by next year.', type: 'Future ability' },
    { hindi: 'क्या आप आज meeting attend कर पाएंगे?', english: 'Will you be able to attend the meeting today?', type: 'Future ability question' },
    { hindi: 'वह काफी effort के बाद job पा सका।', english: 'He was able to get a job after a lot of effort.', type: 'Specific past success' },
    { hindi: 'मैं आज तुम्हारी help नहीं कर पाऊँगा।', english: 'I will not be able to help you today.', type: 'Negative future' },
    { hindi: 'हम लोग finally ticket book कर पाए।', english: 'We were finally able to book the ticket.', type: 'Group achievement' },
  ],
  mistakes: [
    { wrong: 'I will can do it.', correct: 'I will be able to do it.', why: "Two modals together is wrong — use 'be able to' after 'will'" },
    { wrong: 'He was able to swam.', correct: 'He was able to swim.', why: "'Able to' + V1 (base form) always" },
    { wrong: 'She able to speak French.', correct: 'She is able to speak French.', why: "Be verb 'is' required: 'She IS able to'" },
    { wrong: 'Could he to come?', correct: 'Was he able to come?', why: "For specific past occasion, 'was able to' is preferred over 'could'" },
  ],
  memoryTrick: "**ABLE TO = CAN's flexible friend 🤝**\nCan = present only; Able to = सब tenses!\nwill + be able to | was/were + able to | have been able to\nModal + BE ABLE TO (never modal + can)",
  vocabulary: [
    { word: 'Capable', hindi: 'सक्षम', example: 'She is capable of leading a team.' },
    { word: 'Competent', hindi: 'योग्य', example: 'He is competent enough for the role.' },
    { word: 'Skillful', hindi: 'कुशल', example: 'She is skillful at designing.' },
    { word: 'Accomplish', hindi: 'पूरा करना', example: 'He was able to accomplish his target.' },
    { word: 'Achieve', hindi: 'हासिल करना', example: 'You will be able to achieve your goal.' },
    { word: 'Overcome', hindi: 'पार करना', example: 'She was able to overcome all obstacles.' },
  ],
  speakingTips: [
    "Interview में: 'I was able to increase sales by 30% in my previous role.'",
    "Future commitments: 'I will be able to submit the report by Friday, I promise.'",
    "Honest limitation: 'I am sorry, I won't be able to attend today's meeting.'",
  ],
};

// ============================================================
// Day 47 — Conjunctions
// ============================================================
export const DAY_47_CONTENT = {
  explanation: `
**Conjunctions — Joining Words (जोड़ने वाले शब्द):**

Conjunctions दो words, phrases, या clauses को जोड़ते हैं।

**COORDINATING CONJUNCTIONS (FANBOYS):**
• **F**or, **A**nd, **N**or, **B**ut, **O**r, **Y**et, **S**o

**AND** = और (adding info): I study English **and** Hindi.
**BUT** = लेकिन (contrast): I tried hard **but** failed.
**OR** = या (choice): Tea **or** coffee?
**SO** = इसलिए (result): I was tired, **so** I slept.
**YET** = फिर भी: He is rich, **yet** he is unhappy.

**SUBORDINATING CONJUNCTIONS:**
**BECAUSE** = क्योंकि: I stayed home **because** it rained.
**ALTHOUGH** = हालाँकि: **Although** it was late, she continued working.
**HOWEVER** = हालाँकि/लेकिन (formal): It is expensive; **however**, it is worth it.
**THEREFORE** = इसलिए (formal): He was late; **therefore**, he missed the bus.
**UNLESS** = जब तक नहीं: **Unless** you try, you will not succeed.
**WHILE** = जबकि / जब: I study **while** she cooks.
  `,
  rules: [
    'Coordinating conjunctions (FANBOYS) join equal elements (words, phrases, clauses)',
    'Subordinating conjunctions join a main clause with a dependent clause',
    'Because = reason; Although = contrast; Unless = condition (negative)',
    'However, Therefore, Moreover = used after semicolons (;) in formal writing',
    'Avoid "but + however" together (redundant)',
    'While = simultaneous actions OR contrast (जबकि)',
    'Although/Though/Even though = similar meaning (though is informal)',
  ],
  examples: [
    { hindi: 'मैं थका था लेकिन काम करता रहा।', english: 'I was tired but I kept working.', type: 'BUT — contrast' },
    { hindi: 'वह देर से आई क्योंकि traffic था।', english: 'She arrived late because there was traffic.', type: 'BECAUSE — reason' },
    { hindi: 'हालाँकि मुझे खाना पसंद नहीं था, मैंने खाया।', english: 'Although I did not like the food, I ate it.', type: 'ALTHOUGH — concession' },
    { hindi: 'उसने खूब पढ़ा, इसलिए pass हो गया।', english: 'He studied a lot; therefore, he passed.', type: 'THEREFORE — result' },
    { hindi: 'जब तक मेहनत नहीं करोगे, success नहीं मिलेगी।', english: 'Unless you work hard, you will not succeed.', type: 'UNLESS — condition' },
    { hindi: 'यह expensive है; हालाँकि, quality बेहतरीन है।', english: 'It is expensive; however, the quality is excellent.', type: 'HOWEVER — formal contrast' },
  ],
  mistakes: [
    { wrong: 'But however it was difficult.', correct: 'However, it was difficult. / But it was difficult.', why: 'But and However mean the same — use only one' },
    { wrong: 'Although she tried, but she failed.', correct: 'Although she tried, she failed.', why: "'Although' already shows contrast — no 'but' needed" },
    { wrong: 'Because of he was late, he missed the bus.', correct: 'Because he was late, he missed the bus.', why: "'Because' is a conjunction — follow with subject + verb, not 'of'" },
    { wrong: 'She is smart, so but she got the job.', correct: 'She is smart, so she got the job.', why: 'Only one conjunction needed' },
  ],
  memoryTrick: "**FANBOYS** = For, And, Nor, But, Or, Yet, So\nएक आसान trick: Because = Reason, Although = Surprise, Unless = Condition, Therefore = Result\nConjunctions = Bridges between ideas!",
  vocabulary: [
    { word: 'Moreover', hindi: 'इसके अलावा', example: 'She is talented; moreover, she is hardworking.' },
    { word: 'Nevertheless', hindi: 'फिर भी', example: 'It was raining; nevertheless, we went out.' },
    { word: 'Consequently', hindi: 'परिणामस्वरूप', example: 'He did not practice; consequently, he failed.' },
    { word: 'Meanwhile', hindi: 'इसी दौरान', example: 'I cooked; meanwhile, he set the table.' },
    { word: 'Whereas', hindi: 'जबकि (comparison)', example: 'She is quiet, whereas he is loud.' },
    { word: 'Provided', hindi: 'बशर्ते', example: 'I will help, provided you are honest.' },
  ],
  speakingTips: [
    "Complex sentences बनाओ: 'Although I was tired, I finished the work because the deadline was important.'",
    "Business: 'The project was delayed; however, the quality was not compromised.'",
    "Story: 'I was about to leave when it started raining, so I stayed inside.'",
  ],
};

// ============================================================
// Day 48 — WH Words (Question Words)
// ============================================================
export const DAY_48_CONTENT = {
  explanation: `
**WH Words — Question Words (प्रश्नवाचक शब्द):**

WH words से हम specific information माँगते हैं।

| WH Word | Hindi | Use |
|---------|-------|-----|
| **What** | क्या | thing/action |
| **When** | कब | time |
| **Where** | कहाँ | place |
| **Who** | कौन | person (subject) |
| **Whom** | किसे/किसको | person (object) |
| **Whose** | किसका | possession |
| **Why** | क्यों | reason |
| **How** | कैसे | manner |
| **Which** | कौन सा | choice |
| **How much** | कितना (uncountable) | quantity |
| **How many** | कितने (countable) | number |
| **How long** | कब से/कितने समय से | duration |

**Basic Structure:**
WH Word + auxiliary verb + subject + main verb?
"Where **do you** live?"
"What **is** your name?"
"When **did** she arrive?"
  `,
  rules: [
    'WH + do/does + subject + V1? (Simple Present)',
    'WH + did + subject + V1? (Simple Past)',
    'WH + am/is/are + subject + V+ing? (Present Continuous)',
    'WH + have/has + subject + V3? (Present Perfect)',
    'WH + will + subject + V1? (Future)',
    'Who = subject question (no auxiliary needed): "Who called?" ✓',
    'Whom = object (formal): "Whom did you meet?" / informal: "Who did you meet?"',
  ],
  examples: [
    { hindi: 'तुम्हारा नाम क्या है?', english: 'What is your name?', type: 'WHAT — identity' },
    { hindi: 'तुम कहाँ रहते हो?', english: 'Where do you live?', type: 'WHERE — place' },
    { hindi: 'वह कब वापस आएगा?', english: 'When will he come back?', type: 'WHEN — time' },
    { hindi: 'तुमने phone क्यों नहीं किया?', english: 'Why did you not call?', type: 'WHY — reason' },
    { hindi: 'तुम यह कैसे करते हो?', english: 'How do you do this?', type: 'HOW — manner' },
    { hindi: 'उसने किससे बात की?', english: 'Whom did she speak to?', type: 'WHOM — object' },
  ],
  mistakes: [
    { wrong: 'Where you live?', correct: 'Where do you live?', why: 'WH + auxiliary (do/does/did) + subject + V1' },
    { wrong: 'What you want?', correct: 'What do you want?', why: 'Auxiliary "do" required in WH questions' },
    { wrong: 'How many water do you drink?', correct: 'How much water do you drink?', why: "'Water' = uncountable → 'how much' (not 'how many')" },
    { wrong: 'Who did called you?', correct: 'Who called you?', why: "Subject WH question (Who = subject) → no auxiliary needed" },
  ],
  memoryTrick: "**WWW.WHY.HOW** = What, When, Where, Why, Who, Whom, Whose, How, Which\nRemember: Subject question (Who/What) = No auxiliary\nObject question = WH + do/does/did + subject + verb",
  vocabulary: [
    { word: 'Inquire', hindi: 'पूछताछ करना', example: 'May I inquire about the schedule?' },
    { word: 'Clarify', hindi: 'स्पष्ट करना', example: 'Could you clarify what you mean?' },
    { word: 'Specify', hindi: 'बताना/निर्दिष्ट करना', example: 'Please specify when you need this.' },
    { word: 'Confirm', hindi: 'पुष्टि करना', example: 'Can you confirm who will attend?' },
    { word: 'Elaborate', hindi: 'विस्तार से बताना', example: 'Could you elaborate on how this works?' },
    { word: 'Determine', hindi: 'निर्धारित करना', example: 'We need to determine why this happened.' },
  ],
  speakingTips: [
    "Practice tag questions: 'You are coming, aren't you?' / 'She didn't call, did she?'",
    "Job interview questions: 'What are your strengths? Why do you want this role?'",
    "Daily: Ask yourself 5 WH questions about your day — then answer them!",
  ],
};

// ============================================================
// Day 49 — Passive Voice Part 1
// ============================================================
export const DAY_49_CONTENT = {
  explanation: `
**Passive Voice Part 1 — Basic Passive Structures:**

**Active Voice:** Subject → करता है
🇮🇳 रोहन ने चाय बनाई।
🇬🇧 Rohan **made** tea. (Active)

**Passive Voice:** Subject → होता है (subject receives the action)
🇮🇳 चाय बनाई गई।
🇬🇧 Tea **was made** (by Rohan). (Passive)

**Why use Passive?**
• जब doer (agent) unknown हो: "The window was broken."
• जब action ज़्यादा important हो than doer: "The report has been submitted."
• Formal/academic writing में

**Passive Formula:**
Subject + **be verb** (correct form) + **V3** (past participle)

| Tense | Active | Passive |
|-------|--------|---------|
| Simple Present | She writes letters. | Letters **are written**. |
| Simple Past | He broke the vase. | The vase **was broken**. |
| Simple Future | They will complete it. | It **will be completed**. |
| Present Perfect | She has sent the email. | The email **has been sent**. |
  `,
  rules: [
    'Passive = Object of active → Subject of passive',
    'Passive formula: Subject + be (correct form) + V3',
    'Active object becomes passive subject; Active subject becomes "by + agent" (optional)',
    'Simple Present Passive: is/am/are + V3',
    'Simple Past Passive: was/were + V3',
    'Simple Future Passive: will be + V3',
    'Present Perfect Passive: has/have been + V3',
  ],
  examples: [
    { hindi: 'यहाँ Hindi बोली जाती है।', english: 'Hindi is spoken here.', type: 'Simple Present Passive' },
    { hindi: 'यह बिल्डिंग 1990 में बनाई गई थी।', english: 'This building was built in 1990.', type: 'Simple Past Passive' },
    { hindi: 'काम कल तक complete किया जाएगा।', english: 'The work will be completed by tomorrow.', type: 'Simple Future Passive' },
    { hindi: 'Email भेज दी गई है।', english: 'The email has been sent.', type: 'Present Perfect Passive' },
    { hindi: 'उसे promote किया गया।', english: 'He was promoted.', type: 'Simple Past Passive — person' },
    { hindi: 'यह किताब प्रेमचंद ने लिखी।', english: 'This book was written by Premchand.', type: 'Passive with by-agent' },
  ],
  mistakes: [
    { wrong: 'The letter is write by her.', correct: 'The letter is written by her.', why: 'Passive needs V3 (written, not write)' },
    { wrong: 'Rice was ate by them.', correct: 'Rice was eaten by them.', why: "V3 of eat = 'eaten' (not 'ate')" },
    { wrong: 'The project will completed.', correct: 'The project will be completed.', why: "Future passive = 'will be + V3' (be required)" },
    { wrong: 'He is been promoted.', correct: 'He has been promoted.', why: "Present Perfect Passive = 'has/have been + V3'" },
  ],
  memoryTrick: "**PASSIVE = BE + V3** 🔄\nজब Active object passive subject बनता है:\n• Is/Am/Are + V3 (Present)\n• Was/Were + V3 (Past)\n• Will be + V3 (Future)\n• Has/Have been + V3 (Perfect)",
  vocabulary: [
    { word: 'Agent', hindi: 'कर्ता', example: 'The cake was baked by the chef (= agent).' },
    { word: 'Process', hindi: 'प्रक्रिया', example: 'The application is being processed.' },
    { word: 'Approved', hindi: 'स्वीकृत', example: 'The plan was approved by the manager.' },
    { word: 'Manufactured', hindi: 'निर्मित', example: 'This product is manufactured in India.' },
    { word: 'Delivered', hindi: 'पहुँचाया गया', example: 'The package will be delivered tomorrow.' },
    { word: 'Submitted', hindi: 'जमा किया गया', example: 'The report has been submitted.' },
  ],
  speakingTips: [
    "Office में: 'The meeting has been rescheduled.' / 'Your request is being processed.'",
    "News style: 'Three people were injured in the accident.'",
    "Formal emails: 'The attached document should be reviewed and approved.'",
  ],
};

// ============================================================
// Day 50 — Passive Voice Part 2
// ============================================================
export const DAY_50_CONTENT = {
  explanation: `
**Passive Voice Part 2 — Advanced Passive Structures:**

**Continuing from Day 49 — More Tenses & Patterns:**

| Tense | Active | Passive |
|-------|--------|---------|
| Past Perfect | Had finished | Had been finished |
| Present Continuous | Is doing | Is being done |
| Past Continuous | Was doing | Was being done |
| Modal (Can/Should/Must) | Can do | Can be done |

**Passive with Modals:**
🇮🇳 यह काम किया जा सकता है।
🇬🇧 This work **can be done**.

🇮🇳 यह नहीं करना चाहिए।
🇬🇧 This **should not be done**.

🇮🇳 इसे तुरंत fix करना होगा।
🇬🇧 This **must be fixed** immediately.

**Double Object Sentences:**
Active: "Someone gave him the award."
Passive Option 1: "He **was given** the award."
Passive Option 2: "The award **was given** to him."
  `,
  rules: [
    'Past Perfect Passive: had been + V3',
    'Present Continuous Passive: is/am/are being + V3',
    'Past Continuous Passive: was/were being + V3',
    'Modal Passive: modal + be + V3 (can be done, should be fixed)',
    'Double object passive: prefer person as subject ("He was given the book.")',
    'Get-passive: "She got promoted." = informal passive (colloquial)',
    '"By" + agent = optional — omit when unknown or obvious',
  ],
  examples: [
    { hindi: 'काम हो रहा है।', english: 'The work is being done.', type: 'Present Continuous Passive' },
    { hindi: 'Report तैयार की जा रही थी।', english: 'The report was being prepared.', type: 'Past Continuous Passive' },
    { hindi: 'यह form ऑनलाइन भरा जा सकता है।', english: 'This form can be filled online.', type: 'Modal Passive — can' },
    { hindi: 'Mobile phone class में use नहीं करना चाहिए।', english: 'Mobile phones should not be used in class.', type: 'Modal Passive — should not' },
    { hindi: 'उसे award दिया गया।', english: 'He was given an award.', type: 'Double object passive' },
    { hindi: 'काम शुरू होने से पहले plan तैयार हो चुका था।', english: 'The plan had been finalized before the work started.', type: 'Past Perfect Passive' },
  ],
  mistakes: [
    { wrong: 'The car is being repaired currently.', correct: 'The car is being repaired.', why: "'Currently' already implies ongoing action; both fine but avoid redundancy" },
    { wrong: 'This should be do immediately.', correct: 'This should be done immediately.', why: 'Modal passive: should be + V3 (done, not do)' },
    { wrong: 'He was been selected.', correct: 'He was selected. / He has been selected.', why: 'Was + been is incorrect — was (Past Passive) OR has been (Present Perfect Passive)' },
    { wrong: 'The work is been finished.', correct: 'The work has been finished.', why: "Present Perfect Passive = 'has/have been + V3'" },
  ],
  memoryTrick: "**Continuous Passive = IS/WAS/WERE + BEING + V3**\n**Modal Passive = Modal + BE + V3**\nTrick: जहाँ भी -ing था, वहाँ 'being' लगा दो;\nजहाँ modal था, वहाँ 'be' लगा दो!",
  vocabulary: [
    { word: 'Implemented', hindi: 'लागू किया गया', example: 'The new policy was implemented.' },
    { word: 'Reviewed', hindi: 'समीक्षा की गई', example: 'The document is being reviewed.' },
    { word: 'Postponed', hindi: 'स्थगित', example: 'The event has been postponed.' },
    { word: 'Announced', hindi: 'घोषणा की गई', example: 'The results will be announced tomorrow.' },
    { word: 'Constructed', hindi: 'निर्माण किया गया', example: 'A new bridge is being constructed.' },
    { word: 'Allocated', hindi: 'आवंटित', example: 'Funds have been allocated for the project.' },
  ],
  speakingTips: [
    "Progress updates: 'The project is being reviewed by the management team.'",
    "Policies: 'Smoking is not allowed inside the building.'",
    "News: 'Three suspects have been arrested in connection with the case.'",
  ],
};

// ============================================================
// Day 51 — Advance Level Sentences Part 1
// ============================================================
export const DAY_51_CONTENT = {
  explanation: `
**Advance Level Sentences Part 1 — Complex & Compound Structures:**

अब हम ऐसे sentences सीखेंगे जो educated, professional और fluent speakers use करते हैं।

**1. Conditional Sentences (If Clauses):**
• Zero Conditional (fact): If you heat water, it boils.
• First Conditional (real future): If I study, I will pass.
• Second Conditional (unreal present): If I had money, I would travel.
• Third Conditional (unreal past): If I had studied, I would have passed.

**2. Reported Speech (Indirect Speech):**
Direct: She said, "I am happy."
Indirect: She said that she **was** happy.

**3. Relative Clauses:**
The man **who called** is my boss.
The book **that I read** was amazing.
The city **where I live** is beautiful.

**4. Emphasis Structures:**
**It is** English **that** I am learning.
**What** I need is your support.
  `,
  rules: [
    'Zero Conditional: If + Simple Present → Simple Present (universal truth)',
    'First Conditional: If + Simple Present → will + V1 (real possibility)',
    'Second Conditional: If + Simple Past → would + V1 (unreal present)',
    'Third Conditional: If + Past Perfect → would have + V3 (unreal past)',
    'Reported speech: tense shifts back one step (is→was, will→would, can→could)',
    'Relative pronouns: who (person), which (thing), where (place), when (time)',
    'Cleft sentences for emphasis: It is... that/who... / What I... is/was...',
  ],
  examples: [
    { hindi: 'अगर तुम मेहनत करो, तो सफल होगे।', english: 'If you work hard, you will succeed.', type: 'First Conditional' },
    { hindi: 'अगर मेरे पास wings होती, तो मैं उड़ता।', english: 'If I had wings, I would fly.', type: 'Second Conditional' },
    { hindi: 'उसने कहा कि वह थकी है।', english: 'She said that she was tired.', type: 'Reported Speech' },
    { hindi: 'जो आदमी वहाँ खड़ा है, वह मेरा boss है।', english: 'The man who is standing there is my boss.', type: 'Relative Clause (who)' },
    { hindi: 'मुझे जो चाहिए वो है तुम्हारा सहयोग।', english: 'What I need is your support.', type: 'Cleft Sentence (what)' },
    { hindi: 'अगर मैंने पहले शुरू किया होता, तो finish हो जाता।', english: 'If I had started earlier, I would have finished.', type: 'Third Conditional' },
  ],
  mistakes: [
    { wrong: 'If I will study, I will pass.', correct: 'If I study, I will pass.', why: "First conditional: If + Present (not 'will') → will + V1" },
    { wrong: 'If I would have money, I would travel.', correct: 'If I had money, I would travel.', why: "Second conditional: If + Past (not 'would have')" },
    { wrong: 'The book which I read it was nice.', correct: 'The book which I read was nice.', why: 'Relative clause replaces the pronoun — no double subject' },
    { wrong: 'She said she is happy.', correct: 'She said she was happy.', why: 'Reported speech: present → past (is → was)' },
  ],
  memoryTrick: "**CONDITIONAL STAIRS:**\n0 (Fact) → Present + Present\n1 (Real) → Present + Will\n2 (Unreal Present) → Past + Would\n3 (Unreal Past) → Had done + Would have done\nGo up one step each time!",
  vocabulary: [
    { word: 'Consequently', hindi: 'परिणामस्वरूप', example: 'He trained hard; consequently, he won.' },
    { word: 'Regardless', hindi: 'चाहे कुछ भी हो', example: 'Regardless of the outcome, we tried.' },
    { word: 'Apparently', hindi: 'ऐसा लगता है', example: 'Apparently, the meeting was cancelled.' },
    { word: 'Presumably', hindi: 'शायद / अनुमानतः', example: 'Presumably, she knew about this.' },
    { word: 'Undoubtedly', hindi: 'निःसंदेह', example: 'She is undoubtedly the best candidate.' },
    { word: 'Inevitably', hindi: 'अनिवार्य रूप से', example: 'Change is inevitably coming.' },
  ],
  speakingTips: [
    "Conditionals in daily talk: 'If you tell me earlier, I can arrange something.'",
    "Relative clauses: 'The colleague who helped me yesterday is very talented.'",
    "Interviews: 'The project that I led resulted in a 40% improvement in efficiency.'",
  ],
};

// ============================================================
// Day 52 — Advance Level Sentences Part 2
// ============================================================
export const DAY_52_CONTENT = {
  explanation: `
**Advance Level Sentences Part 2 — Sophisticated Expressions:**

**1. Inversion (Question word order in statements):**
Normal: I had hardly left when it rained.
Inverted: **Hardly had I left** when it rained. (dramatic)

Other inversions:
• **Never have I** seen such courage.
• **Not only** is she talented, **but also** hardworking.
• **So tired was he** that he slept immediately.

**2. Participle Clauses (concise, advanced):**
Long: Because she was tired, she went to bed.
Short: **Being tired**, she went to bed.

Long: After he had finished his work, he left.
Short: **Having finished his work**, he left.

**3. Wish Structures:**
🇮🇳 काश मेरे पास ज़्यादा time होता!
🇬🇧 I **wish I had** more time. (unreal present)
🇮🇳 काश मैंने उसे call किया होता!
🇬🇧 I **wish I had called** him. (unreal past)

**4. It's time / It's high time:**
🇮🇳 अब हमें शुरू करना चाहिए।
🇬🇧 **It is high time** we started. (use past tense after "time")
  `,
  rules: [
    'Negative inversion: Never/Rarely/Hardly + have/had/do/did + subject + V1',
    '"Not only...but also" = inversion in first clause',
    'Participle clause: -ing (active) or -ed (passive) replaces full clause',
    'Wish + Past Simple = unreal present (I wish I had...)',
    'Wish + Past Perfect = unreal past (I wish I had done...)',
    'It is time / It is high time + Past Simple (despite present/future meaning)',
    'Would rather + Past Simple = preference (I would rather you stayed.)',
  ],
  examples: [
    { hindi: 'ऐसी बहादुरी मैंने कभी नहीं देखी।', english: 'Never have I seen such bravery.', type: 'Negative Inversion' },
    { hindi: 'वह न केवल talented है बल्कि dedicated भी है।', english: 'Not only is she talented, but she is also dedicated.', type: 'Not only...but also' },
    { hindi: 'काम खत्म करके वह घर गया।', english: 'Having finished the work, he went home.', type: 'Participle Clause (perfect)' },
    { hindi: 'काश मैं doctor बन सकता!', english: 'I wish I could become a doctor!', type: 'Wish — unreal present' },
    { hindi: 'अब हमें action लेना ही चाहिए।', english: 'It is high time we took action.', type: 'High time + past' },
    { hindi: 'मैं चाहूँगा कि तुम यहाँ रहो।', english: 'I would rather you stayed here.', type: 'Would rather + past' },
  ],
  mistakes: [
    { wrong: 'Hardly I had left when it rained.', correct: 'Hardly had I left when it rained.', why: 'Negative inversion: Hardly + had + subject (inverted)' },
    { wrong: 'I wish I have more time.', correct: 'I wish I had more time.', why: 'Wish + Past Simple for unreal present (not present tense)' },
    { wrong: "It's high time you start studying.", correct: "It's high time you started studying.", why: "'High time' + Past Simple (despite present meaning)" },
    { wrong: 'Not only she is smart but also hardworking.', correct: 'Not only is she smart, but she is also hardworking.', why: "'Not only' at start → inversion (is she, not she is)" },
  ],
  memoryTrick: "**Advanced = Flip the normal! 🔄**\nInversion = put auxiliary BEFORE subject\nWish = go one tense BACK\nHigh time = use PAST despite present meaning\nParticiple = compress full clause into one word!",
  vocabulary: [
    { word: 'Eloquent', hindi: 'वाकपटु', example: 'She delivered an eloquent speech.' },
    { word: 'Concise', hindi: 'संक्षिप्त', example: 'Be concise in your writing.' },
    { word: 'Sophisticated', hindi: 'परिष्कृत', example: 'He uses sophisticated language.' },
    { word: 'Articulate', hindi: 'स्पष्ट रूप से बोलने वाला', example: 'She is very articulate in meetings.' },
    { word: 'Elaborate', hindi: 'विस्तृत', example: 'Please elaborate on your plan.' },
    { word: 'Profound', hindi: 'गहन', example: 'He made a profound observation.' },
  ],
  speakingTips: [
    "GD/Debate में: 'Not only does this policy fail economically, but it also fails socially.'",
    "Storytelling: 'Hardly had she arrived when the phone rang.'",
    "Self-reflection: 'I wish I had taken that opportunity — it would have changed everything.'",
  ],
};

// ============================================================
// Day 53 — Verb List (Irregular Verbs)
// ============================================================
export const DAY_53_CONTENT = {
  explanation: `
**Irregular Verbs — V1, V2, V3 List:**

Regular verbs में simply +ed लगता है: walk → walked → walked
Irregular verbs को अलग-अलग याद करना पड़ता है!

**Most Important Irregular Verbs:**

| V1 (Base) | V2 (Past) | V3 (Past Participle) | Hindi |
|-----------|-----------|----------------------|-------|
| go        | went      | gone                 | जाना |
| come      | came      | come                 | आना |
| eat       | ate       | eaten                | खाना |
| see       | saw       | seen                 | देखना |
| do        | did       | done                 | करना |
| make      | made      | made                 | बनाना |
| take      | took      | taken                | लेना |
| give      | gave      | given                | देना |
| get       | got       | got/gotten           | मिलना |
| know      | knew      | known                | जानना |
| think     | thought   | thought              | सोचना |
| speak     | spoke     | spoken               | बोलना |
| write     | wrote     | written              | लिखना |
| read      | read      | read                 | पढ़ना |
| run       | ran       | run                  | दौड़ना |
| buy       | bought    | bought               | खरीदना |
| find      | found     | found                | ढूंढना |
| tell      | told      | told                 | बताना |
| send      | sent      | sent                 | भेजना |
| break     | broke     | broken               | तोड़ना |
  `,
  rules: [
    'V1 = base form (dictionary form): go, eat, write',
    'V2 = simple past: went, ate, wrote (used in Simple Past)',
    'V3 = past participle: gone, eaten, written (used with have/has/had)',
    'Some V1=V2=V3: cut, put, set, hit, hurt, let, cost, read (pronunciation changes!)',
    'Some V2=V3: buy-bought-bought, make-made-made, tell-told-told',
    'Some V2≠V3: go-went-gone, eat-ate-eaten, see-saw-seen',
    'Regular verb pattern: V2 = V3 = V1+ed (work-worked-worked)',
  ],
  examples: [
    { hindi: 'उसने मुझे एक gift दिया।', english: 'She gave me a gift. (gave = V2 of give)', type: 'Irregular V2' },
    { hindi: 'क्या तुमने यह film देखी है?', english: 'Have you seen this movie? (seen = V3 of see)', type: 'Irregular V3 with have' },
    { hindi: 'उसने 5 km दौड़ा।', english: 'He ran 5 km. (ran = V2 of run)', type: 'Irregular V2' },
    { hindi: 'मैंने letter लिख दिया है।', english: 'I have written the letter. (written = V3)', type: 'Irregular V3' },
    { hindi: 'उन्होंने सारी शक्कर खरीद ली।', english: 'They bought all the sugar. (bought = V2/V3 of buy)', type: 'V2=V3 Irregular' },
    { hindi: 'Report कहाँ है? — भेज दी गई है।', english: 'Where is the report? — It has been sent. (sent = V3)', type: 'Passive with V3' },
  ],
  mistakes: [
    { wrong: 'I have went there.', correct: 'I have gone there.', why: 'V3 of go = gone (not went — went is V2)' },
    { wrong: 'She runned fast.', correct: 'She ran fast.', why: 'Run = irregular; V2 = ran (not runned)' },
    { wrong: 'He has ate the food.', correct: 'He has eaten the food.', why: 'V3 of eat = eaten (not ate — ate is V2)' },
    { wrong: 'I buyed a new phone.', correct: 'I bought a new phone.', why: 'Buy = irregular; V2 = bought (not buyed)' },
  ],
  memoryTrick: "**3 Groups of Irregular Verbs:**\n1. AAA = All same: cut-cut-cut, put-put-put\n2. ABB = V2=V3: buy-bought-bought, make-made-made\n3. ABC = All different: go-went-gone, see-saw-seen\nFlashcards बनाओ और रोज़ 5 learn करो!",
  vocabulary: [
    { word: 'Forget', hindi: 'भूलना', example: 'I forgot (V2) / I have forgotten (V3).' },
    { word: 'Begin', hindi: 'शुरू करना', example: 'The show began (V2) / has begun (V3).' },
    { word: 'Choose', hindi: 'चुनना', example: 'She chose (V2) / has chosen (V3).' },
    { word: 'Steal', hindi: 'चोरी करना', example: 'He stole (V2) / has stolen (V3).' },
    { word: 'Grow', hindi: 'बढ़ना', example: 'Plants grew (V2) / have grown (V3) well.' },
    { word: 'Drive', hindi: 'गाड़ी चलाना', example: 'She drove (V2) / has driven (V3) far.' },
  ],
  speakingTips: [
    "रोज़ सुबह 10 irregular verbs V1-V2-V3 form में बोलो",
    "Sentences बनाओ: 'Yesterday I ate...' / 'I have eaten...' — same verb, different forms",
    "बच्चों को games खिलाओ: Irregular verb snap/memory card game",
  ],
};

// ============================================================
// Day 54 — Idioms, Phrases & Proverbs
// ============================================================
export const DAY_54_CONTENT = {
  explanation: `
**Idioms, Phrases & Proverbs — Figurative Language:**

**IDIOMS** = ऐसे phrases जिनका literal (शाब्दिक) meaning कुछ और होता है
"Break a leg!" ≠ पैर तोड़ो! 😄
"Break a leg!" = Best of luck! (Good luck)

**Popular English Idioms:**
• **Hit the nail on the head** = बिल्कुल सही बात कहना
• **Under the weather** = तबियत ठीक नहीं होना
• **Bite the bullet** = मुश्किल काम हिम्मत से करना
• **Beat around the bush** = घुमा-फिराकर बात करना
• **Break the ice** = बातचीत शुरू करना
• **Burn the midnight oil** = रात को देर तक पढ़ना/काम करना
• **Call it a day** = काम बंद करना / दिन खत्म करना
• **On the fence** = undecided / neutral रहना

**PROVERBS (कहावतें):**
• Every cloud has a silver lining = हर मुश्किल में उम्मीद होती है
• Actions speak louder than words = करनी > कथनी
• Where there is a will, there is a way = मन चंगा तो कठौती में गंगा
• Don't judge a book by its cover = ऊपरी रूप से मत आँको
  `,
  rules: [
    'Idioms cannot be translated literally — learn them as fixed phrases',
    'Use idioms in appropriate contexts — they add color to speech',
    'Idioms can be formal or informal — use carefully in professional settings',
    'Proverbs give life lessons — use them at end of arguments/stories',
    'Phrasal verbs are semi-idiomatic: look up, give up, put off',
    'Learn 2-3 idioms per day and use them in conversation',
    'Context is everything — same idiom can mean different things in different situations',
  ],
  examples: [
    { hindi: 'उसने एकदम सही बात कही।', english: 'She hit the nail on the head.', type: 'Idiom — accuracy' },
    { hindi: 'मुझे आज तबियत ठीक नहीं है।', english: "I am feeling under the weather today.", type: 'Idiom — health' },
    { hindi: 'रात भर जागकर उसने exams की तैयारी की।', english: 'She burned the midnight oil for her exams.', type: 'Idiom — hard work' },
    { hindi: 'हर मुश्किल में उम्मीद होती है।', english: 'Every cloud has a silver lining.', type: 'Proverb — optimism' },
    { hindi: 'ठीक है, आज के लिए काम बंद करते हैं।', english: "OK, let's call it a day.", type: 'Idiom — ending work' },
    { hindi: 'वह अभी undecided है।', english: 'He is still on the fence about it.', type: 'Idiom — indecision' },
  ],
  mistakes: [
    { wrong: 'Break the leg for good luck.', correct: 'Break a leg! (wishing good luck)', why: '"Break a leg" is the idiom — not "break the leg"' },
    { wrong: 'He hit nail on head.', correct: 'He hit the nail on the head.', why: 'Idioms are fixed phrases — articles matter!' },
    { wrong: 'Using idioms in formal business emails.', correct: 'Avoid idioms in formal written communication.', why: 'Idioms are mostly for spoken / informal contexts' },
    { wrong: 'She burned midnight oil.', correct: 'She burned the midnight oil.', why: "Fixed phrase: 'the midnight oil' (not 'midnight oil')" },
  ],
  memoryTrick: "**IDIOM = Picture the image** 🖼️\nHit the nail on head → picture someone hitting a nail perfectly\nUnder the weather → picture someone sick under stormy clouds\nPicture बनाओ, idiom याद हो जाएगा!",
  vocabulary: [
    { word: 'Figurative', hindi: 'लाक्षणिक', example: 'Idioms use figurative language.' },
    { word: 'Literal', hindi: 'शाब्दिक', example: 'The literal meaning is different from the idiom.' },
    { word: 'Colloquial', hindi: 'बोलचाल का', example: 'Idioms are colloquial expressions.' },
    { word: 'Proverbial', hindi: 'कहावत संबंधी', example: 'As the proverbial saying goes...' },
    { word: 'Connotation', hindi: 'अंतर्निहित अर्थ', example: 'Every idiom has a specific connotation.' },
    { word: 'Expression', hindi: 'भाव/अभिव्यक्ति', example: 'This is a popular English expression.' },
  ],
  speakingTips: [
    "Meetings में: 'Let us not beat around the bush — here is the real issue.'",
    "Motivating someone: 'Break a leg in your interview tomorrow!'",
    "Casual: 'I was burning the midnight oil last night for this presentation.'",
  ],
};

// ============================================================
// Day 55 — Important Vocabulary (Professional Words)
// ============================================================
export const DAY_55_CONTENT = {
  explanation: `
**Important Professional Vocabulary — Office & Career Words:**

Professional vocabulary आपको workplace में confident और impressive बनाती है।

**Categories:**

**Management & Leadership:**
• Delegate = काम सौंपना | Implement = लागू करना
• Strategize = रणनीति बनाना | Facilitate = आसान बनाना
• Collaborate = मिलकर काम करना | Coordinate = समन्वय करना

**Communication:**
• Articulate = स्पष्ट रूप से कहना | Convey = संप्रेषित करना
• Negotiate = बातचीत करना | Reiterate = फिर से कहना
• Brief = संक्षेप में बताना | Elaborate = विस्तार से बताना

**Performance:**
• Excel = श्रेष्ठ प्रदर्शन करना | Benchmark = मानक
• Optimize = बेहतर बनाना | Streamline = सरल बनाना
• Assess = मूल्यांकन करना | Monitor = निगरानी करना

**Professional Adjectives:**
• Efficient, Proactive, Diligent, Competent, Reliable, Innovative
  `,
  rules: [
    'Professional vocabulary = formal, precise, and industry-specific words',
    'Use "implement" not "do" in professional contexts: "We implemented a new strategy."',
    'Use "collaborate" not "work together" in formal writing',
    'Use "facilitate" not "make easy": "The mentor facilitated the learning."',
    'Avoid vague words: say "optimize" not "make better"; "assess" not "check"',
    'Adjectives matter: say "proactive approach" not "good approach"',
    'Use nominalizations for formal writing: decide→decision, manage→management',
  ],
  examples: [
    { hindi: 'हमने एक नई strategy implement की।', english: 'We implemented a new strategy.', type: 'Management' },
    { hindi: 'Manager ने team को काम delegate किया।', english: 'The manager delegated tasks to the team.', type: 'Leadership' },
    { hindi: 'उसने अपनी बात clearly articulate की।', english: 'She articulated her point clearly.', type: 'Communication' },
    { hindi: 'हम process को और optimize कर सकते हैं।', english: 'We can optimize the process further.', type: 'Performance' },
    { hindi: 'दोनों teams ने मिलकर project पर collaborate किया।', english: 'Both teams collaborated on the project.', type: 'Teamwork' },
    { hindi: 'इस situation को carefully assess करने की ज़रूरत है।', english: 'This situation needs to be carefully assessed.', type: 'Analysis' },
  ],
  mistakes: [
    { wrong: 'We need to do the new policy.', correct: 'We need to implement the new policy.', why: "'Implement' is the professional word for 'करना' in policy/strategy context" },
    { wrong: 'I will check the results.', correct: 'I will assess/analyze/monitor the results.', why: "'Check' is too vague — use precise professional verbs" },
    { wrong: 'He is very good worker.', correct: 'He is a highly diligent/efficient worker.', why: "'Good' is too weak — use powerful professional adjectives" },
    { wrong: 'We should make things better.', correct: 'We should optimize our processes.', why: "'Optimize' is the professional word for making things better/efficient" },
  ],
  memoryTrick: "**PROFESSIONAL = PRECISE 🎯**\nEvery professional word has a specific meaning:\n• Check → Assess/Monitor/Review\n• Do → Implement/Execute/Accomplish\n• Help → Facilitate/Support/Assist\n• Show → Demonstrate/Present/Illustrate",
  vocabulary: [
    { word: 'Proactive', hindi: 'पहले से सोचकर काम करने वाला', example: 'Be proactive — do not wait for problems.' },
    { word: 'Innovative', hindi: 'अभिनव', example: 'We need innovative solutions.' },
    { word: 'Diligent', hindi: 'परिश्रमी', example: 'She is diligent in her work.' },
    { word: 'Competent', hindi: 'योग्य', example: 'He is highly competent in his field.' },
    { word: 'Efficient', hindi: 'कुशल', example: 'An efficient team completes tasks on time.' },
    { word: 'Transparent', hindi: 'पारदर्शी', example: 'Be transparent about the project status.' },
  ],
  speakingTips: [
    "Interview: 'In my previous role, I collaborated with cross-functional teams to implement new processes.'",
    "Meetings: 'I would like to elaborate on the strategy we discussed last week.'",
    "Emails: 'Please find the assessed report attached for your review.'",
  ],
};

// ============================================================
// Day 56 — Miscellaneous Vocabulary (Noun + Adjective)
// ============================================================
export const DAY_56_CONTENT = {
  explanation: `
**Miscellaneous Vocabulary — Nouns & Adjectives:**

**Important Nouns (संज्ञा):**
| English | Hindi | Example |
|---------|-------|---------|
| Opportunity | अवसर | This is a great opportunity. |
| Responsibility | ज़िम्मेदारी | Take responsibility. |
| Achievement | उपलब्धि | That is a great achievement. |
| Obstacle | बाधा | Overcome every obstacle. |
| Consequence | परिणाम | Think about consequences. |
| Perseverance | दृढ़ता | Perseverance leads to success. |
| Integrity | ईमानदारी/सत्यनिष्ठा | Act with integrity. |
| Gratitude | कृतज्ञता | Express gratitude. |

**Important Adjectives (विशेषण):**
| English | Hindi | Example |
|---------|-------|---------|
| Ambitious | महत्वाकांक्षी | She is ambitious. |
| Persistent | दृढ़/लगातार | Be persistent. |
| Versatile | बहुमुखी | He is versatile. |
| Empathetic | सहानुभूतिपूर्ण | Be empathetic. |
| Resilient | लचीला/मज़बूत | Stay resilient. |
| Meticulous | सावधानीपूर्वक | Be meticulous. |
  `,
  rules: [
    'Nouns = naming words: person, place, thing, idea, feeling',
    'Abstract nouns: integrity, perseverance, gratitude (cannot touch/see)',
    'Adjectives describe nouns and come before them: "a resilient person"',
    'Adjectives can come after be-verb: "She is ambitious."',
    'Noun + adjective collocations: deep regret, strong determination, high ambition',
    'Use precise nouns and adjectives to make speech impressive',
    'Opposite adjectives: ambitious ↔ lazy; resilient ↔ fragile; meticulous ↔ careless',
  ],
  examples: [
    { hindi: 'यह एक बड़ी उपलब्धि है।', english: 'This is a great achievement.', type: 'Noun — abstract' },
    { hindi: 'वह बहुत महत्वाकांक्षी है।', english: 'She is very ambitious.', type: 'Adjective after be-verb' },
    { hindi: 'हर बाधा को पार करो।', english: 'Overcome every obstacle.', type: 'Noun in sentence' },
    { hindi: 'वह एक दृढ़ इंसान है।', english: 'He is a persistent person.', type: 'Adjective + noun' },
    { hindi: 'अपने काम में ईमानदारी रखो।', english: 'Maintain integrity in your work.', type: 'Abstract noun' },
    { hindi: 'कृतज्ञता express करना सीखो।', english: 'Learn to express gratitude.', type: 'Abstract noun — emotion' },
  ],
  mistakes: [
    { wrong: 'She has much ambitions.', correct: 'She has many ambitions. / She is very ambitious.', why: "'Ambition' as countable noun = 'many'; as uncountable = 'much ambition'" },
    { wrong: 'He did a very meticulous work.', correct: 'He did very meticulous work. / He was very meticulous.', why: "'Work' is uncountable here — no 'a'" },
    { wrong: 'I am resiliently.', correct: 'I am resilient. / I acted resiliently.', why: "After 'am', use adjective not adverb" },
    { wrong: 'She showed perseverant.', correct: 'She showed perseverance. / She was perseverant.', why: "After 'showed', use noun ('perseverance')" },
  ],
  memoryTrick: "**Noun = thing/idea | Adjective = describes it**\nIntegrity (Noun) → someone WITH integrity is Honest (Adj)\nPerseverance (Noun) → someone WITH perseverance is Persistent (Adj)\nPair them: Noun + its describing Adjective!",
  vocabulary: [
    { word: 'Tenacious', hindi: 'दृढ़/हठी', example: 'She is tenacious in pursuing her goals.' },
    { word: 'Eloquent', hindi: 'वाकपटु', example: 'He gave an eloquent speech.' },
    { word: 'Pragmatic', hindi: 'व्यावहारिक', example: 'Take a pragmatic approach to problems.' },
    { word: 'Altruistic', hindi: 'परोपकारी', example: 'Her altruistic nature inspires everyone.' },
    { word: 'Vigorous', hindi: 'जोशीला/ऊर्जावान', example: 'She made a vigorous effort.' },
    { word: 'Empathy', hindi: 'सहानुभूति', example: 'Show empathy towards your colleagues.' },
  ],
  speakingTips: [
    "Self-description: 'I am a meticulous and resilient professional.'",
    "Awards: 'This achievement is a result of perseverance and dedication.'",
    "Describing others: 'She is the most empathetic and versatile person I have met.'",
  ],
};

// ============================================================
// Day 57 — Stationery Vocabulary
// ============================================================
export const DAY_57_CONTENT = {
  explanation: `
**Stationery Vocabulary — Office & School Supplies:**

Stationery = stationary नहीं! (stationary = न हिलने वाला)
Stationery = writing supplies (पेन, पेंसिल, आदि)

**Common Stationery Items:**
| English | Hindi |
|---------|-------|
| Pen | कलम |
| Pencil | पेंसिल |
| Eraser / Rubber | रबड़ |
| Sharpener | शार्पनर |
| Ruler | पट्टी/स्केल |
| Notebook | कॉपी/नोटबुक |
| Stapler | स्टेपलर |
| Staple pins | स्टेपल पिन |
| Paper clip | पेपर क्लिप |
| Highlighter | हाइलाइटर |
| Marker | मार्कर |
| Whiteboard | वाइटबोर्ड |
| Scissors | कैंची |
| Glue stick | गोंद की छड़ी |
| Tape / Sellotape | टेप |
| File folder | फ़ाइल फ़ोल्डर |
| Envelopes | लिफाफे |
| Ink | स्याही |
| Ballpoint pen | बॉलपॉइंट पेन |
| Fountain pen | फाउंटेन पेन |
  `,
  rules: [
    'Stationery items are mostly countable nouns: a pen, two pencils, three rulers',
    'Some are uncountable: glue, ink, paper (in general)',
    'Asking for stationery: "Do you have a stapler?" / "Can I borrow your pen?"',
    '"Some/any" for general requests: "Do you have any spare paper?"',
    'Office context: "Please send the stationery request to Admin."',
    'Plural forms: one pencil → two pencils; one stapler → three staplers',
    'Collective: "stationery" = all the items together (uncountable when collective)',
  ],
  examples: [
    { hindi: 'क्या तुम्हारे पास highlighter है?', english: 'Do you have a highlighter?', type: 'Request' },
    { hindi: 'मुझे एक stapler चाहिए।', english: 'I need a stapler.', type: 'Need + noun' },
    { hindi: 'कृपया papers को paper clip से लगाओ।', english: 'Please clip the papers with a paper clip.', type: 'Instruction' },
    { hindi: 'Office में सारी stationery खत्म हो गई।', english: 'All the stationery in the office has run out.', type: 'Collective noun' },
    { hindi: 'Whiteboard पर marker से लिखो।', english: 'Write on the whiteboard with a marker.', type: 'Compound instruction' },
    { hindi: 'गलती मिटाने के लिए eraser use करो।', english: 'Use an eraser to erase the mistake.', type: 'Practical use' },
  ],
  mistakes: [
    { wrong: 'Give me a stationary.', correct: 'Give me some stationery. / Can I have a pen?', why: "'Stationery' (supplies) vs 'stationary' (not moving). Also, collective = some" },
    { wrong: 'I need scissor.', correct: 'I need scissors.', why: "'Scissors' is always plural in English" },
    { wrong: 'Pass the rubber band.', correct: 'Pass me the rubber band / eraser (British) / rubber (informal UK)', why: "'Rubber' in US English = condom; say 'eraser' to be safe in international settings" },
    { wrong: 'Use whiteboard marker on the paper.', correct: 'Use a whiteboard marker on the whiteboard.', why: 'Whiteboard markers are non-permanent — not meant for paper' },
  ],
  memoryTrick: "**STATIONERY has an 'E' for ERASER 🖊️**\nStationERy = things you WRITE with (E for writing equipment)\nStationAry = not MOVING (A for At rest)\nRemember this E/A trick forever!",
  vocabulary: [
    { word: 'Ballpoint pen', hindi: 'बॉलपॉइंट कलम', example: 'I prefer using a ballpoint pen.' },
    { word: 'Sticky notes', hindi: 'चिपकने वाली पर्चियाँ', example: 'Write reminders on sticky notes.' },
    { word: 'Binder', hindi: 'बाइंडर/फ़ाइल', example: 'Keep your documents in a binder.' },
    { word: 'Laminator', hindi: 'लैमिनेटर', example: 'We laminated the important certificates.' },
    { word: 'Punching machine', hindi: 'पंचिंग मशीन', example: 'Use a punching machine to make holes.' },
    { word: 'Index card', hindi: 'इंडेक्स कार्ड', example: 'Write vocabulary words on index cards.' },
  ],
  speakingTips: [
    "Office में: 'Could you please restock the stationery cabinet?'",
    "Classroom: 'I forgot my eraser — can I borrow yours?'",
    "Admin request: 'I need to order some stationery for the new staff members.'",
  ],
};

// ============================================================
// Day 58 — Foods Vocabulary & Tastes
// ============================================================
export const DAY_58_CONTENT = {
  explanation: `
**Foods Vocabulary & Tastes — खाने के शब्द:**

**Food Categories:**
| Category | Examples |
|----------|----------|
| Grains (अनाज) | rice, wheat, bread, oats |
| Vegetables (सब्ज़ियाँ) | spinach, tomato, onion, potato |
| Fruits (फल) | mango, apple, banana, grapes |
| Dairy (डेरी) | milk, cheese, butter, yogurt/curd |
| Meat (मांस) | chicken, fish, mutton, egg |
| Beverages (पेय) | water, tea, coffee, juice |
| Snacks (नाश्ता) | chips, biscuits, cookies, popcorn |

**Tastes (स्वाद):**
| Taste | Hindi | Example |
|-------|-------|---------|
| Sweet | मीठा | mangoes, honey, sugar |
| Sour | खट्टा | lemon, tamarind, vinegar |
| Spicy / Hot | तीखा | chillies, pepper, curry |
| Bitter | कड़वा | karela, coffee (black) |
| Salty | नमकीन | chips, pretzels |
| Savory | स्वादिष्ट (नमकीन) | biryani, curry |
| Bland | बेस्वाद | plain rice, plain water |
| Crispy | कुरकुरा | fried chips, bhajia |
| Creamy | मलाईदार | ice cream, milk shake |
  `,
  rules: [
    'Food nouns: countable (an apple, two eggs) or uncountable (rice, milk, bread)',
    '"Some" with uncountable: "I want some rice." / "Do you want some tea?"',
    '"A/an" with countable: "I ate an apple." / "Give me a biscuit."',
    'Taste adjectives come before nouns: "sweet mango", "spicy curry"',
    'Or after be-verb: "This curry is very spicy."',
    'Describing food: "It tastes sweet/sour/spicy/bitter/salty/bland"',
    '"I like/love/enjoy + noun or V+ing": "I love eating biryani."',
  ],
  examples: [
    { hindi: 'यह curry बहुत तीखी है।', english: 'This curry is very spicy.', type: 'Taste adjective' },
    { hindi: 'मुझे मीठी चीज़ें बहुत पसंद हैं।', english: 'I love sweet things.', type: 'Preference + taste' },
    { hindi: 'चाय में थोड़ी चीनी डालो।', english: 'Add a little sugar to the tea.', type: 'Uncountable + instruction' },
    { hindi: 'क्या यह खाना fresh है?', english: 'Is this food fresh?', type: 'Quality adjective' },
    { hindi: 'मैं रोज़ breakfast में oats खाता हूँ।', english: 'I eat oats for breakfast every day.', type: 'Routine + food' },
    { hindi: 'इस dish का स्वाद खट्टा-मीठा है।', english: 'This dish tastes sweet and sour.', type: 'Combined taste' },
  ],
  mistakes: [
    { wrong: 'I want a rice.', correct: 'I want some rice. / I want a plate of rice.', why: "'Rice' = uncountable — no 'a' directly; use 'some' or 'a plate/bowl of'" },
    { wrong: 'This food is very tasteful.', correct: 'This food is very tasty / delicious.', why: "'Tasteful' means good taste in fashion/art. For food = tasty/delicious" },
    { wrong: 'I am hungry for the food.', correct: 'I am hungry. / I am hungry for food.', why: "No 'the' with general food: 'hungry for food' (not 'the food')" },
    { wrong: 'The curry tastes spicily.', correct: 'The curry tastes spicy.', why: "After 'taste', use adjective (spicy), not adverb (spicily)" },
  ],
  memoryTrick: "**6 TASTES = SSSSBC**\n**S**weet, **S**our, **S**picy, **S**alty, **B**itter, **C**reamy\nBiryani is Savory, karela is Bitter, nimbu is Sour, gulab jamun is Sweet!",
  vocabulary: [
    { word: 'Delicious', hindi: 'स्वादिष्ट', example: 'This biryani is absolutely delicious.' },
    { word: 'Appetizing', hindi: 'भूख लगाने वाला', example: 'The aroma was very appetizing.' },
    { word: 'Nutritious', hindi: 'पौष्टिक', example: 'Eat nutritious food every day.' },
    { word: 'Bland', hindi: 'फीका', example: 'Plain boiled vegetables taste bland.' },
    { word: 'Savory', hindi: 'नमकीन/स्वादिष्ट', example: 'Samosas are a popular savory snack.' },
    { word: 'Aromatic', hindi: 'सुगंधित', example: 'Indian spices are very aromatic.' },
  ],
  speakingTips: [
    "Restaurant order: 'I would like the grilled chicken, please. Can it be less spicy?'",
    "Compliment food: 'This is absolutely delicious! What is in it?'",
    "Describe your favourite dish: 'My favourite is mango — it is sweet, juicy, and aromatic.'",
  ],
};

// ============================================================
// Day 59 — Relation & Weather Vocabulary
// ============================================================
export const DAY_59_CONTENT = {
  explanation: `
**Relation & Weather Vocabulary:**

**FAMILY RELATIONS (परिवार):**
| Relation | Hindi |
|----------|-------|
| Grandfather | दादा / नाना |
| Grandmother | दादी / नानी |
| Father-in-law | ससुर |
| Mother-in-law | सास |
| Brother-in-law | साला / देवर / जीजा |
| Sister-in-law | साली / ननद / भाभी |
| Nephew | भतीजा / भांजा |
| Niece | भतीजी / भांजी |
| Cousin | चचेरा/ममेरा भाई/बहन |
| Stepfather | सौतेला पिता |
| Step-mother | सौतेली माँ |

**WEATHER Vocabulary:**
| English | Hindi |
|---------|-------|
| Sunny | धूप वाला |
| Cloudy | बादल वाला |
| Rainy | बारिश वाला |
| Thunderstorm | आंधी-तूफान |
| Foggy | कोहरे वाला |
| Humid | उमस वाला |
| Drizzle | हल्की बारिश |
| Hailstorm | ओले वाली बारिश |
| Breeze | हल्की हवा |
| Cyclone/Typhoon | चक्रवात |
  `,
  rules: [
    'Relations: Use "my + relation": "my cousin", "my niece", "my father-in-law"',
    'Weather: Use "It is + adjective": "It is sunny today."',
    'Weather: Use "There is + noun": "There is fog on the road."',
    'Weather: "It is raining/snowing/drizzling" = continuous form',
    '"Humid" vs "wet": humid = umsas (sticky heat); wet = physically wet',
    'Weather phrases: "What is the weather like?" / "How is the weather there?"',
    'In-laws: all husband/wife\'s family members add "in-law"',
  ],
  examples: [
    { hindi: 'मेरे ससुर बहुत अच्छे इंसान हैं।', english: 'My father-in-law is a very good person.', type: 'Family relation' },
    { hindi: 'आज मौसम बहुत humid है।', english: 'The weather is very humid today.', type: 'Weather description' },
    { hindi: 'मेरे भांजे की उम्र 5 साल है।', english: 'My nephew is 5 years old.', type: 'Family — nephew' },
    { hindi: 'कोहरे की वजह से flight late हुई।', english: 'The flight was delayed due to fog.', type: 'Weather consequence' },
    { hindi: 'मेरी ननद बहुत talented है।', english: 'My sister-in-law is very talented.', type: 'Family — in-law' },
    { hindi: 'कल रात thunderstorm आया था।', english: 'There was a thunderstorm last night.', type: 'Weather — past' },
  ],
  mistakes: [
    { wrong: 'My cousin-brother called me.', correct: 'My cousin called me.', why: '"Cousin" itself is neutral — no need to add "brother" or "sister"' },
    { wrong: 'It is very hot weather outside.', correct: 'It is very hot outside. / The weather is very hot.', why: "Not 'hot weather' as object — say 'it is hot' or 'the weather is hot'" },
    { wrong: 'There is raining outside.', correct: 'It is raining outside.', why: "For precipitation: 'It is raining/snowing' (not 'there is')" },
    { wrong: 'My niece-daughter is 3.', correct: 'My niece is 3.', why: "'Niece' already means a girl — no need for 'daughter'" },
  ],
  memoryTrick: "**In-laws = अपने husband/wife के relatives**\nFather-in-law = पति/पत्नी का पिता (ससुर)\nSister-in-law = पति/पत्नी की बहन (ननद/साली)\n\nWeather tip: **IT IS + adj / IT IS + Verb+ing**\n'It is cold.' / 'It is snowing.'",
  vocabulary: [
    { word: 'Blizzard', hindi: 'बर्फ़ीला तूफान', example: 'A blizzard hit the northern states.' },
    { word: 'Monsoon', hindi: 'मानसून', example: 'India gets heavy rain during monsoon.' },
    { word: 'Humidity', hindi: 'नमी/उमस', example: 'Mumbai has high humidity in summer.' },
    { word: 'Descendant', hindi: 'वंशज', example: 'She is a descendant of a royal family.' },
    { word: 'Ancestor', hindi: 'पूर्वज', example: 'Our ancestors were farmers.' },
    { word: 'Guardian', hindi: 'अभिभावक', example: 'His uncle is his legal guardian.' },
  ],
  speakingTips: [
    "Family intro: 'I have a large family — my grandparents, parents, and my nephew all live together.'",
    "Small talk: 'How is the weather there? It is very humid here in Mumbai.'",
    "Describing: 'Yesterday there was a heavy thunderstorm and the power went out.'",
  ],
};

// ============================================================
// Day 60 — Professions & Occupations Vocabulary
// ============================================================
export const DAY_60_CONTENT = {
  explanation: `
**Professions & Occupations Vocabulary:**

**Common Professions:**
| Profession | Hindi | Action Verb |
|-----------|-------|------------|
| Doctor | डॉक्टर | treats patients |
| Engineer | इंजीनियर | designs/builds |
| Teacher | शिक्षक | teaches |
| Accountant | हिसाब-किताब करने वाला | manages accounts |
| Lawyer | वकील | practices law |
| Architect | वास्तुकार | designs buildings |
| Journalist | पत्रकार | reports news |
| Pharmacist | फार्मासिस्ट | dispenses medicine |
| Plumber | प्लंबर | fixes pipes |
| Electrician | इलेक्ट्रीशियन | repairs wiring |
| Chef | रसोइया | cooks food |
| Pilot | पायलट | flies aircraft |
| Nurse | नर्स | cares for patients |
| Programmer | प्रोग्रामर | writes code |
| Marketing Manager | मार्केटिंग मैनेजर | promotes products |

**How to Talk About Professions:**
• What do you do (for a living)? — "I am a software engineer."
• I work as a / I work in / I am employed as...
• She is in healthcare / He is in finance / We are in IT.
  `,
  rules: [
    '"I am a/an + profession": I am an engineer. I am a doctor.',
    '"I work as a/an + profession": I work as a nurse.',
    '"I work in + field": I work in education. / She works in finance.',
    'Asking: "What do you do?" / "What is your profession?"',
    'Some professions end in -ist (journalist, pharmacist, specialist)',
    'Some end in -er/-or (teacher, doctor, architect, director)',
    'Some end in -ian (musician, politician, technician, librarian)',
  ],
  examples: [
    { hindi: 'मैं एक software developer हूँ।', english: 'I am a software developer.', type: 'Introduction' },
    { hindi: 'वह Finance में काम करती है।', english: 'She works in finance.', type: 'Field of work' },
    { hindi: 'आप क्या काम करते हैं?', english: 'What do you do for a living?', type: 'Asking profession' },
    { hindi: 'मेरे पिता एक accountant हैं।', english: 'My father is an accountant.', type: 'Family profession' },
    { hindi: 'उसने nurse के रूप में काम किया।', english: 'She worked as a nurse.', type: 'Worked as (past)' },
    { hindi: 'उन्होंने अपना business शुरू किया।', english: 'They started their own business.', type: 'Entrepreneurship' },
  ],
  mistakes: [
    { wrong: 'I am engineer.', correct: 'I am an engineer.', why: "Article 'an' required before vowel sounds ('engineer' starts with 'e')" },
    { wrong: 'She is doctor.', correct: 'She is a doctor.', why: "'A' required before profession nouns" },
    { wrong: 'He does work as lawyer.', correct: 'He works as a lawyer.', why: "'Works as a' — article required; 'does work' = wrong structure" },
    { wrong: 'What is your work?', correct: 'What do you do? / What is your profession/occupation?', why: "'What is your work?' is incorrect; use proper profession-asking phrases" },
  ],
  memoryTrick: "**PROFESSIONS = I AM A/AN + NOUN**\n• Vowel start = an (an engineer, an accountant)\n• Consonant start = a (a doctor, a teacher)\n\nField = I work IN (in IT, in education, in finance)",
  vocabulary: [
    { word: 'Freelancer', hindi: 'स्वतंत्र कामगार', example: 'He is a freelancer — he works independently.' },
    { word: 'Entrepreneur', hindi: 'उद्यमी', example: 'She is an entrepreneur who runs three companies.' },
    { word: 'Consultant', hindi: 'सलाहकार', example: 'He works as a management consultant.' },
    { word: 'Intern', hindi: 'प्रशिक्षु', example: 'She is doing an internship at a bank.' },
    { word: 'Veteran', hindi: 'अनुभवी', example: 'He is a veteran in the field of marketing.' },
    { word: 'Occupation', hindi: 'पेशा/व्यवसाय', example: 'Please state your occupation in the form.' },
  ],
  speakingTips: [
    "Networking: 'Hi, I am Rahul. I work as a data analyst at a tech company.'",
    "Asking: 'That is interesting! So what exactly do you do in your role?'",
    "Career change: 'I used to work as a teacher, but now I work in corporate training.'",
  ],
};

// ============================================================
// Day 61 — Buildings, Worms & Insects Vocabulary
// ============================================================
export const DAY_61_CONTENT = {
  explanation: `
**Buildings, Worms & Insects Vocabulary:**

**BUILDINGS & STRUCTURES:**
| English | Hindi |
|---------|-------|
| Skyscraper | ऊँची इमारत |
| Bungalow | बंगला |
| Cottage | छोटा घर/कुटिया |
| Mansion | हवेली/बड़ा महल |
| Warehouse | गोदाम |
| Courtyard | आँगन |
| Balcony | बालकनी |
| Basement | तहखाना |
| Corridor | गलियारा |
| Staircase | सीढ़ियाँ |

**INSECTS (कीड़े):**
| English | Hindi |
|---------|-------|
| Butterfly | तितली |
| Bee | मधुमक्खी |
| Wasp | ततैया |
| Ant | चींटी |
| Cockroach | तिलचट्टा |
| Mosquito | मच्छर |
| Beetle | गुबरैला |
| Grasshopper | टिड्डी |
| Firefly | जुगनू |
| Dragonfly | व्याध-पतंग |

**WORMS & CRAWLIES:**
Earthworm (केंचुआ), Caterpillar (इल्ली), Centipede (सौ-पाँव), Snail (घोंघा), Slug (बिना खोल का घोंघा)
  `,
  rules: [
    'Building names: use "a/an" for singular: "a skyscraper", "a bungalow"',
    '"There is a..." / "There are many..." for describing buildings',
    'Insects are countable: an ant, two butterflies, several mosquitoes',
    'Some insects are uncountable when referring to infestations: "There is mosquito problem"',
    'Describing buildings: "The building has X floors." / "It is a X-storey building."',
    'Insect actions: bees sting, ants crawl, butterflies flutter, mosquitoes bite',
    'Prepositions with buildings: on the ground floor, in the basement, on the balcony',
  ],
  examples: [
    { hindi: 'उस शहर में कई ऊँची इमारतें हैं।', english: 'There are many skyscrapers in that city.', type: 'Buildings — plural' },
    { hindi: 'मधुमक्खियाँ शहद बनाती हैं।', english: 'Bees make honey.', type: 'Insects — fact' },
    { hindi: 'गोदाम में सामान रखा है।', english: 'The goods are stored in the warehouse.', type: 'Building use' },
    { hindi: 'जुगनू रात को चमकते हैं।', english: 'Fireflies glow at night.', type: 'Insects — natural fact' },
    { hindi: 'घर के आँगन में एक पेड़ है।', english: 'There is a tree in the courtyard.', type: 'Building part' },
    { hindi: 'Caterpillar तितली बन जाती है।', english: 'A caterpillar transforms into a butterfly.', type: 'Transformation' },
  ],
  mistakes: [
    { wrong: 'The building has 10 floor.', correct: 'The building has 10 floors.', why: "'Floors' is a countable noun — use plural" },
    { wrong: 'I saw a butterfly beautiful.', correct: 'I saw a beautiful butterfly.', why: 'Adjective comes BEFORE the noun in English' },
    { wrong: 'There are many mosquitoes problem.', correct: 'There is a mosquito problem.', why: "'Problem' is singular — 'mosquito' here is used as adjective modifier" },
    { wrong: 'The bee stinged me.', correct: 'The bee stung me.', why: "'Sting' is irregular: sting-stung-stung" },
  ],
  memoryTrick: "**Building = Structure where people live/work**\n🏗️ Sky → Skyscraper (touches the sky)\n🏡 Bungalow = ground floor only\n🏚️ Cottage = small, cozy, country-style\n\n🐝 Bee = Makes honey, lives in hive\n🦋 Butterfly = starts as caterpillar\n🦟 Mosquito = bites, spreads disease",
  vocabulary: [
    { word: 'Hive', hindi: 'मधुमक्खी का छत्ता', example: 'Bees live in a hive.' },
    { word: 'Infestation', hindi: 'कीड़ों का प्रकोप', example: 'There is a cockroach infestation in the kitchen.' },
    { word: 'Architect', hindi: 'वास्तुकार', example: 'The architect designed this skyscraper.' },
    { word: 'Facade', hindi: 'इमारत का अगला हिस्सा', example: 'The facade of the building is stunning.' },
    { word: 'Larvae', hindi: 'लार्वा (कीड़े की अवस्था)', example: 'Mosquito larvae grow in stagnant water.' },
    { word: 'Exterminate', hindi: 'नष्ट करना (कीड़े)', example: 'We called a pest control to exterminate the insects.' },
  ],
  speakingTips: [
    "Describing your home: 'I live in a two-storey bungalow with a courtyard.'",
    "Nature conversations: 'Have you ever seen a firefly? They glow in the dark!'",
    "Environmental: 'Bees are essential for pollination — we must protect them.'",
  ],
};

// ============================================================
// Day 62 — Flowers & Fruits Vocabulary
// ============================================================
export const DAY_62_CONTENT = {
  explanation: `
**Flowers & Fruits Vocabulary — फूल और फल:**

**FLOWERS (फूल):**
| English | Hindi |
|---------|-------|
| Rose | गुलाब |
| Lotus | कमल |
| Jasmine | चमेली |
| Marigold | गेंदा |
| Sunflower | सूरजमुखी |
| Lavender | लैवेंडर |
| Hibiscus | गुड़हल |
| Tulip | ट्यूलिप |
| Lily | कुमुद |
| Orchid | आर्किड |

**FRUITS (फल):**
| English | Hindi |
|---------|-------|
| Mango | आम |
| Pomegranate | अनार |
| Guava | अमरूद |
| Jackfruit | कटहल |
| Papaya | पपीता |
| Custard apple | सीताफल |
| Watermelon | तरबूज़ |
| Litchi | लीची |
| Sapota/Chikoo | चीकू |
| Pineapple | अनानास |

**Describing Flowers & Fruits:**
Fragrant (सुगंधित), blooming (खिला हुआ), ripe (पका हुआ), juicy (रसीला), seedless (बीज रहित)
  `,
  rules: [
    'Flowers and fruits are countable: a rose, two mangoes, several flowers',
    'Fragrant, beautiful, colorful = adjectives for flowers',
    'Ripe, sweet, juicy, fresh = adjectives for fruits',
    'Verb + flower: flowers bloom, wilt, grow, spread fragrance',
    'Verb + fruit: fruits ripen, fall, grow, harvest',
    '"A bunch of flowers" / "A basket of fruits" = collective expressions',
    '"In season" = जब मिलता है: "Mangoes are in season now."',
  ],
  examples: [
    { hindi: 'बगीचे में गुलाब खिले हुए हैं।', english: 'The roses are blooming in the garden.', type: 'Flowers — blooming' },
    { hindi: 'कमल राष्ट्रीय फूल है।', english: 'The lotus is the national flower.', type: 'Flowers — general fact' },
    { hindi: 'आम फलों का राजा है।', english: 'Mango is the king of fruits.', type: 'Fruits — cultural' },
    { hindi: 'यह अमरूद बहुत रसीला है।', english: 'This guava is very juicy.', type: 'Fruits — description' },
    { hindi: 'चमेली के फूल बहुत सुगंधित होते हैं।', english: 'Jasmine flowers are very fragrant.', type: 'Flowers — smell' },
    { hindi: 'अनार खाने से खून बढ़ता है।', english: 'Eating pomegranate increases blood count.', type: 'Fruits — health benefit' },
  ],
  mistakes: [
    { wrong: 'I bought a flower bouquet of roses.', correct: 'I bought a bouquet of roses.', why: "'Bouquet' already means bunch of flowers — no need to add 'flower'" },
    { wrong: 'Mangoes is my favourite fruit.', correct: 'Mango is my favourite fruit. / Mangoes are my favourite fruit.', why: "If using general plural 'mangoes', verb = 'are'; if singular idea, use 'mango is'" },
    { wrong: 'The flowers smell fragrantly.', correct: 'The flowers smell fragrant.', why: "After 'smell' (linking verb), use adjective (fragrant), not adverb" },
    { wrong: 'I want to eat ripe mangos.', correct: 'I want to eat ripe mangoes.', why: "Plural of mango = mangoes (not mangos — both acceptable but 'mangoes' preferred)" },
  ],
  memoryTrick: "**Flowers BLOOM 🌸, Fruits RIPEN 🍎**\nFragrant flowers = चमेली, गुलाब (sweet smell)\nSour fruit = imli, nimbu | Sweet fruit = आम, लीची\nNational flower = Lotus 🪷 | National fruit = Mango 🥭",
  vocabulary: [
    { word: 'Pollination', hindi: 'परागण', example: 'Bees help in the pollination of flowers.' },
    { word: 'Fragrance', hindi: 'सुगंध', example: 'The garden was filled with the fragrance of jasmine.' },
    { word: 'Orchard', hindi: 'बाग/फलों का बगीचा', example: 'We visited a mango orchard.' },
    { word: 'Harvest', hindi: 'फसल काटना', example: 'Farmers harvest mangoes in summer.' },
    { word: 'Tropical', hindi: 'उष्णकटिबंधीय', example: 'Mango is a tropical fruit.' },
    { word: 'Wilt', hindi: 'मुरझाना', example: 'The flowers wilted in the heat.' },
  ],
  speakingTips: [
    "Gift: 'I brought you a bouquet of fresh roses and lilies.'",
    "Cultural: 'In India, marigold flowers are used in almost every celebration.'",
    "Seasonal: 'Summer is the best time because mangoes and litchis are in season.'",
  ],
};

// ============================================================
// Day 63 — Maths Vocabulary
// ============================================================
export const DAY_63_CONTENT = {
  explanation: `
**Maths Vocabulary — गणित के शब्द:**

**Basic Operations (मूल क्रियाएँ):**
| Operation | Symbol | English | Hindi |
|-----------|--------|---------|-------|
| Addition | + | add / plus | जोड़ |
| Subtraction | - | subtract / minus | घटाना |
| Multiplication | × | multiply / times | गुणा |
| Division | ÷ | divide by | भाग |
| Equals | = | equals | बराबर |

**How to SAY Maths in English:**
• 5 + 3 = 8 → "Five plus three equals eight."
• 10 - 4 = 6 → "Ten minus four is six."
• 6 × 7 = 42 → "Six times seven equals forty-two." OR "Six multiplied by seven"
• 20 ÷ 4 = 5 → "Twenty divided by four is five."

**Useful Maths Terms:**
| Term | Hindi |
|------|-------|
| Fraction | भिन्न |
| Percentage | प्रतिशत |
| Square root | वर्गमूल |
| Prime number | अभाज्य संख्या |
| Geometry | ज्यामिति |
| Circumference | परिधि |
| Diameter | व्यास |
| Radius | त्रिज्या |
| Perimeter | परिमाप |
| Area | क्षेत्रफल |
  `,
  rules: [
    '"Plus" = addition; "Minus" = subtraction; "Times" = multiplication; "Divided by" = division',
    '"Equals" or "is" for result: "5 plus 3 equals 8" / "5 plus 3 is 8"',
    'Percentages: "50% = fifty percent"; "25% = a quarter"',
    'Fractions: 1/2 = "one half / a half"; 1/4 = "a quarter"; 3/4 = "three quarters"',
    'Square: "the square of 5 is 25" / "5 squared is 25" / "5 to the power of 2"',
    'Square root: "the square root of 25 is 5"',
    'Ordinal numbers in maths: first, second, third... (1st, 2nd, 3rd)',
  ],
  examples: [
    { hindi: '12 का 25 प्रतिशत क्या है?', english: 'What is 25 percent of 12?', type: 'Percentage question' },
    { hindi: '144 का वर्गमूल 12 है।', english: 'The square root of 144 is 12.', type: 'Square root' },
    { hindi: 'इस triangle की भुजाएँ 3, 4 और 5 cm हैं।', english: 'The sides of this triangle are 3, 4, and 5 cm.', type: 'Geometry' },
    { hindi: '50 का दोगुना 100 है।', english: 'Double of 50 is 100.', type: 'Multiplication' },
    { hindi: 'Rectangle का क्षेत्रफल = length × width है।', english: 'The area of a rectangle = length × width.', type: 'Formula' },
    { hindi: 'वृत्त की परिधि = 2πr होती है।', english: 'The circumference of a circle = 2πr.', type: 'Circle formula' },
  ],
  mistakes: [
    { wrong: '5 × 6 = "five time six"', correct: '"Five times six" (not "five time")', why: "'Times' has the 's' — always say 'times' for multiplication" },
    { wrong: 'Three divided with four', correct: 'Three divided BY four', why: "Division = 'divided by' (not 'divided with')" },
    { wrong: '50% = "fifty percentage"', correct: '50% = "fifty percent"', why: "Say 'percent' (not 'percentage') after a number. 'Percentage' = noun for the concept" },
    { wrong: 'The square root of 25 is five square.', correct: 'The square root of 25 is five.', why: "Square root gives a simple number — no 'square' after the result" },
  ],
  memoryTrick: "**MATHS IN ENGLISH:**\n+ → PLUS/ADD\n- → MINUS/SUBTRACT\n× → TIMES/MULTIPLY\n÷ → DIVIDED BY\n= → EQUALS/IS\n\n% → PERCENT (not percentage after number)\nFraction: ½ = half, ¼ = quarter, ¾ = three quarters",
  vocabulary: [
    { word: 'Calculate', hindi: 'गणना करना', example: 'Can you calculate the total cost?' },
    { word: 'Estimate', hindi: 'अनुमान लगाना', example: 'Estimate the area of the room.' },
    { word: 'Equation', hindi: 'समीकरण', example: 'Solve the equation step by step.' },
    { word: 'Variable', hindi: 'चर राशि', example: 'In algebra, x is a variable.' },
    { word: 'Profit', hindi: 'लाभ', example: 'Calculate the profit percentage.' },
    { word: 'Average', hindi: 'औसत', example: 'The average score was 75%.' },
  ],
  speakingTips: [
    "Meetings: 'The profit margin increased by 15 percent this quarter.'",
    "Teaching: 'Six times eight equals forty-eight.'",
    "Shopping: 'There is a 30 percent discount — what will be the final price?'",
  ],
};

// ============================================================
// Day 64 — Body & Diseases Vocabulary
// ============================================================
export const DAY_64_CONTENT = {
  explanation: `
**Body & Diseases Vocabulary — शरीर और बीमारियाँ:**

**Body Parts (शरीर के अंग):**
| External | Hindi | Internal | Hindi |
|---------|-------|---------|-------|
| Forehead | माथा | Lungs | फेफड़े |
| Eyebrow | भौंह | Heart | दिल |
| Earlobe | कान की लौ | Kidney | गुर्दा |
| Nostril | नथुना | Liver | जिगर |
| Chin | ठोड़ी | Spine | रीढ़ |
| Wrist | कलाई | Brain | मस्तिष्क |
| Ankle | टखना | Stomach | पेट |
| Elbow | कोहनी | Intestine | आँत |

**Common Diseases & Conditions:**
| Disease | Hindi |
|---------|-------|
| Fever | बुखार |
| Headache | सिरदर्द |
| Diabetes | मधुमेह |
| Asthma | दमा |
| Hypertension | उच्च रक्तचाप |
| Arthritis | गठिया |
| Pneumonia | निमोनिया |
| Anemia | रक्ताल्पता |
| Allergy | एलर्जी |
| Fracture | हड्डी टूटना |
  `,
  rules: [
    '"I have a + disease/pain": "I have a headache." / "I have diabetes."',
    '"My + body part + hurts/aches": "My back hurts." / "My throat aches."',
    '"I am suffering from + disease": "She is suffering from diabetes."',
    'Symptoms: "I am feeling feverish/nauseous/dizzy/weak."',
    '"I have been having + symptom + for": "I have been having a cough for 3 days."',
    'Doctor language: "I am experiencing pain in my..." / "I have pain in my..."',
    'Medical terms end in -itis = inflammation: tonsillitis, appendicitis, arthritis',
  ],
  examples: [
    { hindi: 'मेरे सिर में बहुत दर्द है।', english: 'I have a severe headache.', type: 'Pain expression' },
    { hindi: 'उसे बुखार है और गले में दर्द है।', english: 'She has a fever and a sore throat.', type: 'Multiple symptoms' },
    { hindi: 'मेरे दादा को diabetes है।', english: 'My grandfather has diabetes.', type: 'Chronic condition' },
    { hindi: 'उसकी कलाई में fracture है।', english: 'She has a fracture in her wrist.', type: 'Injury' },
    { hindi: 'डॉक्टर ने rest करने की सलाह दी।', english: 'The doctor advised complete rest.', type: 'Doctor advice' },
    { hindi: 'मुझे 3 दिनों से खाँसी है।', english: 'I have been having a cough for 3 days.', type: 'Duration of symptom' },
  ],
  mistakes: [
    { wrong: 'I have headache.', correct: 'I have a headache.', why: "'Headache' is a countable noun — 'a headache' required" },
    { wrong: 'My body is paining.', correct: 'My body is aching. / I am in pain.', why: "'Pain' is not used as a continuous verb; say 'ache/hurt' or 'be in pain'" },
    { wrong: 'I am suffering diabetes.', correct: 'I am suffering from diabetes.', why: "'Suffering from' — preposition 'from' is required" },
    { wrong: 'Doctor told me to take rest.', correct: 'The doctor advised/told me to rest.', why: "'Take rest' is Indian English; standard = 'rest' / 'get rest'" },
  ],
  memoryTrick: "**Body + HAVE/HURT/SUFFER:**\n• I HAVE a cold/fever/cough (condition)\n• My [body part] HURTS/ACHES (pain)\n• I am SUFFERING FROM diabetes/cancer (serious)\n• I am FEELING feverish/nauseous (symptom feeling)",
  vocabulary: [
    { word: 'Symptom', hindi: 'लक्षण', example: 'Fever is a symptom of many diseases.' },
    { word: 'Diagnosis', hindi: 'रोग की पहचान', example: 'The doctor gave a diagnosis of pneumonia.' },
    { word: 'Prescription', hindi: 'डॉक्टर की पर्ची', example: 'Show this prescription at the pharmacy.' },
    { word: 'Inflammation', hindi: 'सूजन', example: 'There is inflammation in his knee joint.' },
    { word: 'Immunization', hindi: 'टीकाकरण', example: 'Immunization prevents many diseases.' },
    { word: 'Recovery', hindi: 'स्वस्थ होना', example: 'She is on the path to recovery.' },
  ],
  speakingTips: [
    "Doctor visit: 'Doctor, I have been having chest pain and shortness of breath for 2 days.'",
    "Asking about health: 'How are you feeling? You look a little under the weather.'",
    "Medical history: 'I have high blood pressure and I am allergic to penicillin.'",
  ],
};

// ============================================================
// Day 65 — Industry Vocabulary
// ============================================================
export const DAY_65_CONTENT = {
  explanation: `
**Industry Vocabulary — उद्योग के शब्द:**

**Key Industries & Their Vocabulary:**

**IT Industry (Information Technology):**
Software, Hardware, Application, Database, Server, Cloud, Cybersecurity, Algorithm, Bug, Debug, Deploy, Bandwidth

**Manufacturing Industry:**
Raw material, Production, Assembly line, Quality control, Inventory, Supply chain, Defect, Output, Batch, Capacity

**Finance Industry:**
Investment, Portfolio, ROI (Return on Investment), Equity, Revenue, Profit, Loss, Budget, Audit, Fiscal year, Depreciation

**Healthcare Industry:**
Diagnosis, Treatment, Patient, Discharge, OPD (Outpatient), ICU, Prescription, Consultation, Ward, Surgery

**Construction Industry:**
Blueprint, Foundation, Beam, Concrete, Scaffold, Contractor, Tender, Estimation, Load-bearing, Renovation

**Education Industry:**
Curriculum, Enrollment, Pedagogy, Assessment, Accreditation, Faculty, Campus, Syllabus, Lecture, Seminar
  `,
  rules: [
    'Industry-specific vocabulary makes you sound professional and credible',
    'Use correct terms: "deploy" not "upload" in IT; "audit" not "check" in Finance',
    'Each industry has its own jargon — learn the top 20 words of your field',
    'Abbreviations are common in industry: IT, OPD, ROI, GDP, B2B, B2C, HR',
    'Collocations matter: "supply chain management", "quality control team", "cloud storage"',
    'Industry verbs: IT deploys/codes; Finance audits/invests; Construction builds/designs',
    'Formal industry emails use precise vocabulary to avoid ambiguity',
  ],
  examples: [
    { hindi: 'हमें product को Monday तक deploy करना है।', english: 'We need to deploy the product by Monday.', type: 'IT — deployment' },
    { hindi: 'इस quarter में revenue 20% बढ़ा।', english: 'Revenue increased by 20% this quarter.', type: 'Finance — performance' },
    { hindi: 'Assembly line में defect मिला।', english: 'A defect was found in the assembly line.', type: 'Manufacturing — quality' },
    { hindi: 'patient को ICU से general ward में shift किया।', english: 'The patient was shifted from ICU to the general ward.', type: 'Healthcare — movement' },
    { hindi: 'Contractor ने renovation का estimate दिया।', english: 'The contractor provided an estimate for the renovation.', type: 'Construction — cost' },
    { hindi: 'Faculty meeting में नया curriculum discuss हुआ।', english: 'The new curriculum was discussed in the faculty meeting.', type: 'Education — academic' },
  ],
  mistakes: [
    { wrong: 'We uploaded the app to the server.', correct: 'We deployed the app to the server.', why: "'Deploy' is the correct IT term for making software live on a server" },
    { wrong: 'The company checked its accounts.', correct: 'The company audited its accounts.', why: "'Audit' is the correct finance term for examining accounts" },
    { wrong: 'There is a mistake in the product.', correct: 'There is a defect/flaw in the product.', why: "Manufacturing uses 'defect' or 'flaw' (not 'mistake') for product issues" },
    { wrong: 'The teacher made the syllabus.', correct: 'The teacher designed/prepared the syllabus.', why: "'Designed' or 'prepared' is more professional for academic contexts" },
  ],
  memoryTrick: "**Each Industry has its ACTION VERB:**\n• IT = deploy, debug, code, test\n• Finance = audit, invest, budget, forecast\n• Manufacturing = produce, assemble, inspect, dispatch\n• Healthcare = diagnose, treat, prescribe, discharge\nLearn the verbs, dominate the conversation!",
  vocabulary: [
    { word: 'Procurement', hindi: 'खरीद/प्राप्ति', example: 'The procurement team ordered new materials.' },
    { word: 'Scalability', hindi: 'बड़े पैमाने पर काम करने की क्षमता', example: 'The software needs better scalability.' },
    { word: 'Benchmark', hindi: 'मानक', example: 'Set a benchmark for quality performance.' },
    { word: 'Liability', hindi: 'देनदारी', example: 'Reduce financial liabilities.' },
    { word: 'Compliance', hindi: 'अनुपालन', example: 'All companies must ensure regulatory compliance.' },
    { word: 'Stakeholder', hindi: 'हितधारक', example: 'All stakeholders must be informed.' },
  ],
  speakingTips: [
    "IT: 'We need to resolve this bug before we can deploy the next build.'",
    "Finance: 'The quarterly audit revealed a 12% increase in operational costs.'",
    "Manufacturing: 'Quality control rejected 5% of the batch due to defects.'",
  ],
};

// ============================================================
// Day 66 — Colours & Judiciary Vocabulary
// ============================================================
export const DAY_66_CONTENT = {
  explanation: `
**Colours & Judiciary Vocabulary:**

**SHADES OF COLOURS:**
| Basic | Hindi | Shades |
|-------|-------|--------|
| Red | लाल | Crimson, Scarlet, Maroon |
| Blue | नीला | Navy, Cobalt, Turquoise |
| Green | हरा | Olive, Emerald, Lime |
| Yellow | पीला | Golden, Amber, Ivory |
| Pink | गुलाबी | Rose, Blush, Fuchsia |
| Purple | बैंगनी | Violet, Lavender, Magenta |
| White | सफेद | Off-white, Ivory, Pearl |
| Black | काला | Charcoal, Ebony, Jet |
| Brown | भूरा | Beige, Tan, Chocolate |
| Orange | नारंगी | Peach, Amber, Rust |

**JUDICIARY Vocabulary (न्यायपालिका):**
| Term | Hindi |
|------|-------|
| Court | न्यायालय |
| Judge | न्यायाधीश |
| Lawyer / Advocate | वकील |
| Plaintiff | वादी |
| Defendant | प्रतिवादी |
| Verdict | फैसला |
| Evidence | सबूत |
| Witness | गवाह |
| Bail | ज़मानत |
| Sentence | सज़ा |
| Appeal | अपील |
| Acquit | बरी करना |
  `,
  rules: [
    'Colour adjectives come before nouns: "a navy blue shirt", "an emerald green ring"',
    'Shades add precision: not just "blue" but "navy blue" or "sky blue"',
    'Judiciary terms: plaintiff = who files the case; defendant = who faces the case',
    'Verdict = final decision; Sentence = punishment given',
    '"Acquit" = found not guilty; "Convict" = found guilty',
    'Evidence is uncountable: "The evidence is strong." (not "evidences")',
    '"Bail" in legal context = temporary release condition',
  ],
  examples: [
    { hindi: 'उसने ivory white kurta पहना था।', english: 'He was wearing an ivory white kurta.', type: 'Colour shade' },
    { hindi: 'Judge ने verdict सुनाया।', english: 'The judge announced the verdict.', type: 'Judiciary' },
    { hindi: 'Defendant को bail मिल गई।', english: 'The defendant was granted bail.', type: 'Legal process' },
    { hindi: 'Witness ने court में गवाही दी।', english: 'The witness gave testimony in court.', type: 'Court process' },
    { hindi: 'उसकी charcoal gray suit बहुत stylish थी।', english: 'His charcoal gray suit was very stylish.', type: 'Colour description' },
    { hindi: 'Plaintiff का वकील बहुत experienced था।', english: 'The plaintiff\'s lawyer was very experienced.', type: 'Legal party' },
  ],
  mistakes: [
    { wrong: 'The court gave a sentence to the plaintiff.', correct: 'The court gave a sentence to the defendant.', why: 'Sentence (punishment) goes to DEFENDANT (who is accused) not plaintiff (who filed case)' },
    { wrong: 'Police arrested him with many evidences.', correct: 'Police arrested him with strong evidence.', why: "'Evidence' is uncountable — no plural 'evidences'" },
    { wrong: 'He wore a navy shirt blue.', correct: 'He wore a navy blue shirt.', why: 'Adjective (colour) comes BEFORE the noun' },
    { wrong: 'The judge acquitted him guilty.', correct: 'The judge convicted him. / The judge acquitted him. (not guilty)', why: "'Acquit' = not guilty; 'convict' = guilty — opposite meanings" },
  ],
  memoryTrick: "**P vs D in Court: P = Plaintiff (Problem raiser), D = Defendant (Defender)**\nEvidence = UNCOUNTABLE (no 's')\nAcquit = A for 'All Clear' (free!) | Convict = C for 'Caught' (guilty!)\n\nColours: Shade adds depth — 'deep red' = crimson, 'light blue' = sky blue",
  vocabulary: [
    { word: 'Testimony', hindi: 'गवाही', example: 'The witness gave important testimony.' },
    { word: 'Jurisdiction', hindi: 'अधिकार क्षेत्र', example: 'This case falls under our court\'s jurisdiction.' },
    { word: 'Precedent', hindi: 'मिसाल', example: 'This judgment sets a legal precedent.' },
    { word: 'Vivid', hindi: 'चमकीला', example: 'She wore vivid fuchsia dress.' },
    { word: 'Subtle', hindi: 'हल्का/सूक्ष्म', example: 'The room was painted in subtle beige tones.' },
    { word: 'Prosecution', hindi: 'अभियोजन पक्ष', example: 'The prosecution presented strong evidence.' },
  ],
  speakingTips: [
    "Describing fashion: 'She was wearing a stunning emerald green saree with gold embroidery.'",
    "Legal context: 'The defendant was acquitted due to lack of sufficient evidence.'",
    "Office: 'The new branding uses a cobalt blue and ivory white color scheme.'",
  ],
};

// ============================================================
// Day 67 — Birds & Astrology Vocabulary
// ============================================================
export const DAY_67_CONTENT = {
  explanation: `
**Birds & Astrology Vocabulary:**

**BIRDS (पक्षी):**
| English | Hindi |
|---------|-------|
| Sparrow | गौरैया |
| Pigeon | कबूतर |
| Cuckoo | कोयल |
| Parrot | तोता |
| Peacock | मोर |
| Owl | उल्लू |
| Eagle | चील/बाज़ |
| Kingfisher | राम चिरैया |
| Woodpecker | कठफोड़वा |
| Crane | सारस |
| Swan | हंस |
| Crow | कौआ |
| Flamingo | राजहंस |
| Nightingale | बुलबुल |

**ASTROLOGY (ज्योतिष):**
| English | Hindi |
|---------|-------|
| Zodiac sign | राशि |
| Aries | मेष |
| Taurus | वृषभ |
| Gemini | मिथुन |
| Cancer | कर्क |
| Leo | सिंह |
| Virgo | कन्या |
| Libra | तुला |
| Scorpio | वृश्चिक |
| Sagittarius | धनु |
| Capricorn | मकर |
| Aquarius | कुंभ |
| Pisces | मीन |
| Horoscope | जन्मकुंडली |
| Constellation | नक्षत्र मंडल |
  `,
  rules: [
    'Birds = countable nouns: a sparrow, two eagles, several parrots',
    'Bird sounds: crow = caws, cuckoo = calls, parrot = talks, eagle = screams',
    'Collective nouns: a flock of birds / a murder of crows / a parliament of owls',
    'Zodiac signs are proper nouns: Aries (not "the aries"), Leo (not "the leo")',
    'Asking: "What is your sun sign?" / "What zodiac sign are you?"',
    'Saying: "I am a Scorpio." / "She is a Virgo." (be + zodiac sign)',
    'Astrology adjectives: "He has Aries-like qualities — bold and energetic."',
  ],
  examples: [
    { hindi: 'गौरैया लुप्त होती जा रही है।', english: 'The sparrow is becoming extinct.', type: 'Birds — conservation' },
    { hindi: 'मोर हमारा राष्ट्रीय पक्षी है।', english: 'The peacock is our national bird.', type: 'National bird fact' },
    { hindi: 'वह Leo zodiac sign की है।', english: 'She is a Leo.', type: 'Zodiac — identity' },
    { hindi: 'उल्लू रात को देखने में सक्षम होता है।', english: 'Owls are capable of seeing at night.', type: 'Birds — nature fact' },
    { hindi: 'Scorpio लोग intense और passionate होते हैं।', english: 'Scorpios are said to be intense and passionate.', type: 'Astrology — personality' },
    { hindi: 'बाज़ की नज़र बहुत तेज़ होती है।', english: 'Eagles have very sharp eyesight.', type: 'Birds — ability' },
  ],
  mistakes: [
    { wrong: 'A flock of crows cawed.', correct: 'A murder of crows cawed.', why: "Collective noun for crows = 'murder' (unusual but correct English)" },
    { wrong: 'What is your zodiac?', correct: 'What is your zodiac sign? / What is your sun sign?', why: "'Zodiac' alone is incomplete — 'zodiac sign' or 'sun sign' is correct" },
    { wrong: 'I am the Scorpio.', correct: 'I am a Scorpio.', why: "Zodiac signs use 'a' not 'the' in this context" },
    { wrong: 'The parrot speaks.', correct: 'The parrot talks / mimics human speech.', why: "'Talks' or 'mimics' is more natural for parrots than 'speaks'" },
  ],
  memoryTrick: "**NATIONAL BIRDS:**\n🇮🇳 India = Peacock (मोर)\n🇬🇧 UK = Robin\n🇺🇸 USA = Bald Eagle\n\n**ZODIAC SIGNS = 12 months, 12 signs**\nAries (March) to Pisces (February) — know YOUR sign in English!",
  vocabulary: [
    { word: 'Migration', hindi: 'प्रवास', example: 'Birds migrate to warmer places in winter.' },
    { word: 'Extinct', hindi: 'विलुप्त', example: 'The dodo bird is now extinct.' },
    { word: 'Plumage', hindi: 'पक्षी के पंख', example: 'The peacock has beautiful plumage.' },
    { word: 'Celestial', hindi: 'आकाशीय', example: 'Stars are celestial objects.' },
    { word: 'Prophecy', hindi: 'भविष्यवाणी', example: 'Astrologers make prophecies based on stars.' },
    { word: 'Constellation', hindi: 'नक्षत्र', example: 'Orion is a famous constellation.' },
  ],
  speakingTips: [
    "Nature: 'I love watching birds — especially kingfishers near the river.'",
    "Social icebreaker: 'I am a Libra — what is your zodiac sign?'",
    "Interesting fact: 'Did you know that a group of owls is called a parliament?'",
  ],
};

// ============================================================
// Day 68 — Factory & Sports + Sound & Maths Vocabulary
// ============================================================
export const DAY_68_CONTENT = {
  explanation: `
**Factory & Sports + Sound & Maths Vocabulary:**

**FACTORY / PRODUCTION VOCABULARY:**
| Term | Hindi |
|------|-------|
| Raw material | कच्चा माल |
| Finished goods | तैयार माल |
| Assembly | असेंबली |
| Conveyor belt | कन्वेयर बेल्ट |
| Machinery | मशीनरी |
| Shift | पाली |
| Foreman | फोरमैन |
| Output | उत्पादन |
| Defective | दोषपूर्ण |
| Maintenance | रखरखाव |

**SPORTS VOCABULARY:**
| Sport | Key Terms |
|-------|----------|
| Cricket | wicket, over, innings, boundary, LBW, no-ball |
| Football | goal, penalty, offside, referee, striker |
| Badminton | shuttle, net, smash, deuce, set |
| Athletics | sprint, marathon, relay, hurdles, javelin |
| Swimming | stroke, lap, heat, freestyle, butterfly |

**SOUNDS (आवाज़ें):**
Murmur (गुनगुनाहट), Whisper (फुसफुसाहट), Thunder (गड़गड़ाहट), Roar (दहाड़), Chirp (चहचहाना), Splash (छपाका), Creak (चर्र-चर्र), Hiss (सरसराहट — snake)
  `,
  rules: [
    'Factory nouns: machinery (uncountable), goods (plural), output (uncountable)',
    'Sport scores: "3 to 1" / "three-one" / "three goals to one"',
    'Sound verbs: "The door creaked." / "The baby whimpered." / "Thunder roared."',
    'Factory verbs: produce, manufacture, assemble, inspect, maintain, dispatch',
    'Sports verbs: score, win, lose, draw, compete, qualify, eliminate, champion',
    'Onomatopoeia = sound words: buzz, hiss, roar, splash, chirp, crunch',
    'Volume of sound: loud/soft; Pitch: high/low; Quality: harsh/melodious',
  ],
  examples: [
    { hindi: 'Factory की night shift में 200 workers काम करते हैं।', english: 'Two hundred workers work in the night shift at the factory.', type: 'Factory — shift' },
    { hindi: 'India ने match में 3 wicket लिए।', english: 'India took 3 wickets in the match.', type: 'Sports — cricket' },
    { hindi: 'Conveyor belt पर defective products आ रहे थे।', english: 'Defective products were coming on the conveyor belt.', type: 'Factory — quality' },
    { hindi: 'शेर की दहाड़ दूर से सुनाई दी।', english: 'The roar of the lion was heard from far away.', type: 'Sound — animal' },
    { hindi: 'Football match में penalty kick से goal हुआ।', english: 'A goal was scored from a penalty kick in the football match.', type: 'Sports — football' },
    { hindi: 'दरवाज़े ने खुलते समय चर्र-चर्र की आवाज़ की।', english: 'The door creaked when it opened.', type: 'Sound — object' },
  ],
  mistakes: [
    { wrong: 'India winned the match.', correct: 'India won the match.', why: "'Win' is irregular: win-won-won" },
    { wrong: 'The factory makes many machineries.', correct: 'The factory has a lot of machinery.', why: "'Machinery' is uncountable — no plural 'machineries'" },
    { wrong: 'The snake hissed loudly noise.', correct: 'The snake hissed loudly.', why: "'Hissed' already describes the sound — 'noise' is redundant" },
    { wrong: 'He scored a boundary in cricket.', correct: 'He hit a boundary in cricket.', why: "'Boundary' = hit (not scored); 'scored' is used for runs/goals/points" },
  ],
  memoryTrick: "**FACTORY = 4 Ps:**\nProcure raw material → Produce → Package → Dispatch\n\n**SOUNDS = Imitate them!**\n🐍 Hiss | 🦁 Roar | 🐦 Chirp | ⛈️ Thunder\nSay the sound word and make the sound — it sticks!",
  vocabulary: [
    { word: 'Dispatch', hindi: 'भेजना/रवाना करना', example: 'The goods were dispatched yesterday.' },
    { word: 'Referee', hindi: 'रेफरी', example: 'The referee blew the whistle.' },
    { word: 'Champion', hindi: 'विजेता/चैंपियन', example: 'She became the national swimming champion.' },
    { word: 'Vibration', hindi: 'कंपन', example: 'The machinery caused heavy vibration.' },
    { word: 'Resonance', hindi: 'अनुनाद', example: 'The hall had excellent acoustic resonance.' },
    { word: 'Inspect', hindi: 'जाँचना', example: 'The engineer inspected the conveyor belt.' },
  ],
  speakingTips: [
    "Factory tour: 'This is the assembly section where all the parts are put together.'",
    "Sports commentary: 'India needed only 5 runs off the last over!'",
    "Sound description: 'The whole stadium roared when the goal was scored.'",
  ],
};

// ============================================================
// Day 69 — Application Writing
// ============================================================
export const DAY_69_CONTENT = {
  explanation: `
**Application Writing — आवेदन पत्र लिखना:**

Applications are formal written requests. They follow a strict format.

**FORMAT OF A FORMAL APPLICATION:**

**[Your Name]**
**[Your Address]**
**[Date]**

**To,**
**The [Designation],**
**[Organization Name],**
**[Address]**

**Subject: Application for [reason]**

**Sir/Madam,**

**Body:**
**Paragraph 1:** State who you are and why you are writing.
**Paragraph 2:** Give details, explain the reason, provide facts.
**Paragraph 3:** Request/polite ask, express confidence.

**Thanking you,**
**Yours faithfully,**
**[Signature]**
**[Name]**

**Types of Applications:**
1. Leave Application (छुट्टी के लिए)
2. Job Application (नौकरी के लिए)
3. Complaint Application (शिकायत के लिए)
4. Scholarship Application (छात्रवृत्ति के लिए)
  `,
  rules: [
    'Format is strict: Address → Date → Receiver → Subject → Salutation → Body → Close',
    'Subject line: clear and specific (not vague)',
    'Salutation: Sir/Madam (formal); Dear Mr./Ms. [Name] (semi-formal)',
    'Body: 3 paragraphs — Introduction, Details, Request',
    'Closing: "Yours faithfully" (when salutation = Sir/Madam)',
    '"Yours sincerely" = when you know the name (Dear Mr. Sharma)',
    'No contractions in formal writing: "I am" not "I\'m"; "cannot" not "can\'t"',
  ],
  examples: [
    { hindi: 'मैं 3 दिनों की छुट्टी के लिए आवेदन कर रहा हूँ।', english: 'I am writing to request a leave of 3 days.', type: 'Leave Application' },
    { hindi: 'मुझे आपकी company में job में रुचि है।', english: 'I wish to apply for the position of Marketing Executive at your esteemed company.', type: 'Job Application' },
    { hindi: 'मुझे खेद है कि यह सूचित करना पड़ रहा है।', english: 'I regret to inform you that the situation has not improved.', type: 'Complaint Application' },
    { hindi: 'कृपया मेरा आवेदन स्वीकार करें।', english: 'I kindly request you to consider my application.', type: 'Request line' },
    { hindi: 'मैं जल्द ही join करने में सक्षम हूँ।', english: 'I am available to join at the earliest.', type: 'Job availability' },
    { hindi: 'इसके लिए मैं सदा आपका आभारी रहूँगा।', english: 'I shall remain ever grateful for this favour.', type: 'Gratitude closing' },
  ],
  mistakes: [
    { wrong: 'Respected Sir, I am writing this application to you that...', correct: 'Dear Sir, I am writing to request...', why: "Avoid 'Respected' in English; 'Dear Sir/Madam' is standard formal salutation" },
    { wrong: 'Yours truly, [Name] (wrong closing)', correct: "Yours faithfully (when Sir/Madam) / Yours sincerely (when you know their name)", why: "'Yours truly' is American casual — in formal British-Indian English, use faithfully/sincerely" },
    { wrong: 'I want to inform you that I will not be able to come.', correct: 'I am writing to inform you that I will be unable to attend.', why: "'I want' sounds informal — 'I am writing to inform' is more formal" },
    { wrong: 'Please grant me leave for 3 days on urgent basis.', correct: 'I humbly request you to grant me leave for 3 days on urgent grounds.', why: "More formal phrasing with 'humbly request' and 'on grounds'" },
  ],
  memoryTrick: "**Application = ADSB Format:**\n**A**ddress (yours + receiver)\n**D**ate\n**S**ubject\n**B**ody (3 paragraphs)\nEnd: Yours faithfully/sincerely + Sign",
  vocabulary: [
    { word: 'Humbly', hindi: 'विनम्रतापूर्वक', example: 'I humbly request your consideration.' },
    { word: 'Esteemed', hindi: 'माननीय/आदरणीय', example: 'I wish to join your esteemed organization.' },
    { word: 'Aforementioned', hindi: 'उपर्युक्त', example: 'As per the aforementioned reasons...' },
    { word: 'Oblige', hindi: 'अनुग्रह करना', example: 'You would greatly oblige me by...' },
    { word: 'Forthcoming', hindi: 'आने वाला', example: 'The forthcoming examination is on Monday.' },
    { word: 'Endeavour', hindi: 'प्रयास', example: 'I shall endeavour to give my best.' },
  ],
  speakingTips: [
    "Read your application aloud after writing — check if it sounds professional.",
    "Practise with AI tutor: 'Write a leave application for me for 2 days.'",
    "Interview prep: 'How would you write a job application for a sales manager role?'",
  ],
};

// ============================================================
// Day 70 — Letter Writing
// ============================================================
export const DAY_70_CONTENT = {
  explanation: `
**Letter Writing — पत्र लेखन:**

**TWO TYPES OF LETTERS:**

**1. Formal Letter:**
• Business letters, official communication
• Strict format, professional language
• To companies, officials, banks, etc.

**2. Informal Letter:**
• Personal letters to friends, family
• Casual language, no strict format
• Begin with "Dear [Name]," and end with "Yours lovingly / With love"

**FORMAL LETTER FORMAT:**
Sender's Address → Date → Receiver's Address → Subject → Dear Sir/Madam → Body (3 paras) → Yours faithfully → Signature

**INFORMAL LETTER FORMAT:**
[Your address] → [Date] → Dear [Friend's name], → Body (freely written) → With love/Yours truly → [Your name]

**Key Phrases for Formal Letters:**
• "I am writing with reference to..." (शुरुआत)
• "I would like to bring to your attention..."
• "I look forward to hearing from you." (end)
• "Please do not hesitate to contact me."
  `,
  rules: [
    'Formal: Yours faithfully (Sir/Madam) / Yours sincerely (Dear Mr./Ms.)',
    'Informal: Yours lovingly / With warm regards / Take care',
    'Formal: no contractions, no slang, complex vocabulary',
    'Informal: contractions OK, casual phrases, simple vocabulary',
    'Both types: Date format — 15th March 2025 OR 15 March 2025',
    'Subject line: only in formal letters (not in informal)',
    'Formal salutation: "Dear Sir/Madam" — Informal: "Dear Rahul" / "Hey Priya"',
  ],
  examples: [
    { hindi: 'मैं इस पत्र के माध्यम से शिकायत दर्ज करना चाहता हूँ।', english: 'I am writing this letter to lodge a formal complaint.', type: 'Formal — complaint' },
    { hindi: 'मुझे उम्मीद है कि तुम अच्छे होगे।', english: 'I hope you are doing well.', type: 'Informal — opening' },
    { hindi: 'कृपया जल्द से जल्द जवाब दें।', english: 'I look forward to receiving your prompt reply.', type: 'Formal — closing' },
    { hindi: 'बहुत समय बाद पत्र लिख रहा हूँ।', english: 'I am writing to you after a long time.', type: 'Informal — reconnecting' },
    { hindi: 'आपकी company के product की quality खराब है।', english: 'I am writing to bring to your attention the poor quality of your product.', type: 'Formal — complaint opening' },
    { hindi: 'तुम्हारी शादी की बहुत बधाई!', english: 'Congratulations on your wedding!', type: 'Informal — celebration' },
  ],
  mistakes: [
    { wrong: 'Dear Sir, Hope you are fine.', correct: 'Dear Sir, I hope this letter finds you in good health.', why: "Informal opening ('Hope you are fine') in a formal letter — use professional language" },
    { wrong: 'Yours sincerely (when salutation = Sir/Madam)', correct: 'Yours faithfully (when salutation = Sir/Madam)', why: "'Yours sincerely' requires knowing the person's name in the salutation" },
    { wrong: "I'm writing to complaint about...", correct: 'I am writing to complain about...', why: "No contractions in formal letters; 'complain' is the verb (not 'complaint')" },
    { wrong: 'With regards, (as closing)', correct: 'Yours sincerely / Yours faithfully / With warm regards (choose appropriately)', why: "'With regards' is incomplete — use full formal closing phrases" },
  ],
  memoryTrick: "**FORMAL vs INFORMAL = SUIT vs T-SHIRT 👔👕**\nFormal = Business suit (strict, professional, no fun)\nInformal = T-shirt (relaxed, personal, casual)\n\nFormal ending: Faithfully (Sir/Madam) | Sincerely (Known name)\nInformal ending: Lovingly | With love | Take care",
  vocabulary: [
    { word: 'Correspondence', hindi: 'पत्राचार', example: 'We have been in correspondence for months.' },
    { word: 'Acknowledge', hindi: 'स्वीकार करना', example: 'Please acknowledge receipt of this letter.' },
    { word: 'Enclosure', hindi: 'संलग्न सामग्री', example: 'Please find the enclosure attached.' },
    { word: 'Referral', hindi: 'संदर्भ', example: 'With referral to your letter dated...' },
    { word: 'Grievance', hindi: 'शिकायत', example: 'I wish to address my grievance.' },
    { word: 'Resolution', hindi: 'समाधान', example: 'I request a quick resolution to this issue.' },
  ],
  speakingTips: [
    "Practice writing both types: Write one formal and one informal letter today.",
    "Formal read-aloud: Read your formal letter to hear if it sounds professional.",
    "Informal: Write a letter to a friend you haven't spoken to in a year — make it genuine.",
  ],
};

// ============================================================
// Day 71 — E-mail Writing
// ============================================================
export const DAY_71_CONTENT = {
  explanation: `
**E-mail Writing — Professional Emails:**

Email is the most common professional communication tool.
A good email = clear subject + professional tone + action point.

**EMAIL FORMAT:**
**To:** [recipient@email.com]
**CC:** [copy@email.com] (optional — for information copy)
**Subject:** [Clear and specific subject]

**Dear [Name] / Hello [Name] / Hi [Name] (based on formality),**

**Opening line:**
• Formal: "I hope this email finds you well."
• Semi-formal: "I wanted to follow up on our last discussion."
• Casual: "Quick update on the project!"

**Body:** Explain clearly in 2-3 short paragraphs.

**Action required:** "Could you please...?" / "Please review and revert by..."

**Closing:**
• Formal: "Best regards / Warm regards / Yours sincerely"
• Casual: "Thanks / Cheers / Best"

**[Your Name]**
**[Designation]**
**[Contact]**
  `,
  rules: [
    'Subject: specific and informative — not just "Important" or "Hello"',
    'Keep emails short: say only what is necessary',
    'One email = one main purpose (do not combine 5 topics)',
    '"Please find attached" = when sending a file',
    '"Please revert by [date]" = Indian English for "reply by"',
    'CC = For information | BCC = blind copy (recipient cannot see others)',
    'Professional tone: avoid ALL CAPS (sounds like shouting)',
  ],
  examples: [
    { hindi: 'Meeting reschedule के बारे में email लिखना।', english: 'Subject: Request to Reschedule Monday Meeting', type: 'Subject line' },
    { hindi: 'मैं आपको project update देना चाहता हूँ।', english: 'I am writing to give you a quick update on the project status.', type: 'Opening — update' },
    { hindi: 'कृपया attached file review करें।', english: 'Please find the attached file for your review.', type: 'Attachment mention' },
    { hindi: 'कल तक reply करने का अनुरोध है।', english: 'Could you please respond by end of day tomorrow?', type: 'Action request' },
    { hindi: 'मुझसे contact करने में संकोच न करें।', english: 'Please do not hesitate to reach out if you have any questions.', type: 'Offer help' },
    { hindi: 'समय पर reply करने के लिए धन्यवाद।', english: 'Thank you for your prompt response.', type: 'Gratitude' },
  ],
  mistakes: [
    { wrong: 'Subject: Important Email', correct: 'Subject: Meeting Rescheduled to 3 PM on Friday', why: "Vague subjects are unprofessional — be specific about what the email is about" },
    { wrong: 'I am mailing you to ask...', correct: 'I am writing to inquire about...', why: "'Mailing' is too casual — 'writing' is standard formal email language" },
    { wrong: 'Kindly do the needful.', correct: 'Could you please process the request? / Please take the necessary action.', why: "'Do the needful' is Indian English — internationally use clearer specific language" },
    { wrong: 'Please revert ASAP.', correct: 'Could you please respond at your earliest convenience?', why: "'Revert' = go back (not reply); 'ASAP' is informal — avoid in formal emails" },
  ],
  memoryTrick: "**Email = STAR format:**\n**S**ubject — specific\n**T**one — professional\n**A**ction — what you want done\n**R**esponse — when you need it by\n\nAlso: Short emails get read; Long emails get ignored!",
  vocabulary: [
    { word: 'Attachment', hindi: 'संलग्नक', example: 'Please see the attachment for details.' },
    { word: 'Recipient', hindi: 'प्राप्तकर्ता', example: 'Add all recipients in the TO field.' },
    { word: 'Thread', hindi: 'ईमेल की श्रृंखला', example: 'Refer to the email thread below.' },
    { word: 'Follow-up', hindi: 'अनुवर्ती संपर्क', example: 'This is a follow-up email.' },
    { word: 'Urgent', hindi: 'तत्काल', example: 'Mark the email as urgent if needed.' },
    { word: 'Loop', hindi: 'जानकारी में रखना', example: 'Please keep me in the loop.' },
  ],
  speakingTips: [
    "Read good professional emails and notice how they open, explain, and close.",
    "Practice: Write an email to your boss requesting 2 days of leave.",
    "Tip: Always proofread your email once before hitting 'Send'.",
  ],
};

// ============================================================
// Day 72 — Paragraph Writing
// ============================================================
export const DAY_72_CONTENT = {
  explanation: `
**Paragraph Writing — अनुच्छेद लिखना:**

A good paragraph has 3 parts:
1. **Topic Sentence** (मुख्य विचार — what the paragraph is about)
2. **Supporting Sentences** (details, examples, explanations)
3. **Concluding Sentence** (summary/wrap-up)

**Example Paragraph — Topic: Benefits of Exercise:**
"Regular exercise is essential for a healthy life. (Topic sentence) It strengthens muscles, improves heart health, and boosts mental well-being. Studies show that even 30 minutes of daily exercise can reduce the risk of diabetes and heart disease by up to 40%. Moreover, exercise releases endorphins, which improve mood and reduce stress. (Supporting sentences) Therefore, incorporating exercise into our daily routine is one of the best investments we can make for long-term health." (Concluding sentence)

**Types of Paragraphs:**
• Descriptive (किसी चीज़ का वर्णन)
• Narrative (कहानी/घटना)
• Expository (जानकारी देना)
• Persuasive (मनाना/convince करना)
  `,
  rules: [
    'One paragraph = one main idea',
    'Topic sentence = first sentence (states the main point)',
    'Every supporting sentence must relate to the topic sentence',
    'Use transition words: firstly, moreover, however, therefore, in conclusion',
    'Concluding sentence: summarize or give a final thought',
    'Average paragraph = 5-8 sentences',
    'No personal opinions in expository paragraphs — stick to facts',
  ],
  examples: [
    { hindi: 'Technology ने जीवन को आसान बना दिया है।', english: 'Technology has made life significantly easier in modern times.', type: 'Topic Sentence' },
    { hindi: 'पहली बात, Smartphones ने communication बदल दिया।', english: 'Firstly, smartphones have completely transformed how we communicate.', type: 'Supporting — firstly' },
    { hindi: 'इसके अलावा, internet ने education को accessible बनाया।', english: 'Moreover, the internet has made quality education accessible to all.', type: 'Supporting — moreover' },
    { hindi: 'हालाँकि, इसके कुछ नुकसान भी हैं।', english: 'However, technology also has its downsides, such as addiction and privacy concerns.', type: 'Counter point — however' },
    { hindi: 'इसलिए, technology का सही उपयोग ज़रूरी है।', english: 'Therefore, it is essential to use technology wisely and responsibly.', type: 'Concluding Sentence' },
    { hindi: 'अंत में, यह कहा जा सकता है कि...', english: 'In conclusion, technology, when used correctly, is one of the greatest tools available to humanity.', type: 'Final Conclusion' },
  ],
  mistakes: [
    { wrong: 'Writing a paragraph with only 2 sentences.', correct: 'Write 5-8 sentences for a complete paragraph.', why: 'Too short = incomplete; a good paragraph needs topic + support + conclusion' },
    { wrong: 'Starting every sentence with "I".', correct: 'Vary sentence starters using transition words.', why: 'Repetitive starts make writing monotonous — vary with "Moreover", "However", "In addition"' },
    { wrong: 'Going off-topic in the middle.', correct: 'Every sentence should relate to the topic sentence.', why: 'Paragraphs must have unity — one idea, all sentences supporting it' },
    { wrong: 'No transition words between sentences.', correct: 'Use: Firstly, Moreover, However, Therefore, In conclusion.', why: 'Transitions make writing flow smoothly and logically' },
  ],
  memoryTrick: "**TSC = Topic-Support-Conclusion 🏗️**\nTopic Sentence = Foundation (what we're building)\nSupporting Sentences = Walls (facts, examples, details)\nConcluding Sentence = Roof (ties it together)\nA paragraph without all 3 = incomplete building!",
  vocabulary: [
    { word: 'Moreover', hindi: 'इसके अलावा', example: 'Moreover, the benefits extend to mental health.' },
    { word: 'Nevertheless', hindi: 'फिर भी', example: 'Nevertheless, challenges remain.' },
    { word: 'Consequently', hindi: 'परिणामस्वरूप', example: 'Consequently, productivity increased.' },
    { word: 'Furthermore', hindi: 'इसके अतिरिक्त', example: 'Furthermore, research supports this claim.' },
    { word: 'Elaborate', hindi: 'विस्तार से बताना', example: 'Please elaborate on this point.' },
    { word: 'Concise', hindi: 'संक्षिप्त', example: 'Keep your paragraphs concise and focused.' },
  ],
  speakingTips: [
    "Speak a mini-paragraph about your hometown in 5-8 sentences.",
    "Use paragraph structure in spoken answers: 'The main point is... For example... Therefore...'",
    "Essay practice: Write one paragraph each on Health, Technology, and Education.",
  ],
};

// ============================================================
// Day 73 — Notice Writing + Writing Skills Practice
// ============================================================
export const DAY_73_CONTENT = {
  explanation: `
**Notice Writing — सूचना लेखन:**

A Notice is a formal written announcement displayed publicly.

**FORMAT OF A NOTICE:**
---
**[NAME OF ORGANIZATION]**
**NOTICE**
**[Date]**

**[TITLE — in capital letters]**

[Body — 3-4 sentences: who, what, when, where, why]

[Name]
[Designation]

---

**Key Features of a Good Notice:**
• Heading: NOTICE (in capitals, centered)
• Date: top right or below heading
• Title: specific and clear
• Body: brief and to the point (no extra details)
• Signed by an authorized person

**Notices are used for:**
• School/college announcements
• Office circulars
• Public announcements
• Lost & found notices
• Event notices
  `,
  rules: [
    'Notice = formal, short, to-the-point (not a letter!)',
    'Always include: Who is issuing + What is the event/news + When/Where',
    '"NOTICE" heading = centered and in CAPITALS',
    'Date: Always include the date',
    'No "I" — use organization/school name as issuer',
    'Passive voice common: "All students are hereby informed..."',
    'End with: Name + Designation (not "Yours faithfully")',
  ],
  examples: [
    { hindi: 'स्कूल बंद रहेगा।', english: 'All students are informed that the school will remain closed on 25th March due to a public holiday.', type: 'School closure notice' },
    { hindi: 'Meeting की सूचना।', english: 'A mandatory staff meeting will be held on Monday, 20th March 2025, at 10 AM in the Conference Room.', type: 'Meeting notice' },
    { hindi: 'खोई हुई चीज़ की सूचना।', english: 'This is to inform that a brown leather wallet was found near the library. Kindly contact the school office to claim it.', type: 'Lost and found notice' },
    { hindi: 'खेल प्रतियोगिता की सूचना।', english: 'The Annual Sports Day will be held on 5th April 2025. All students are requested to register by 28th March.', type: 'Event notice' },
    { hindi: 'अवकाश की सूचना।', english: 'In view of the upcoming festival, the office will remain closed from 15th to 17th October 2025.', type: 'Holiday notice' },
    { hindi: 'Important announcement।', english: 'Students are hereby notified that the examination schedule has been revised. Refer to the updated timetable on the notice board.', type: 'Examination notice' },
  ],
  mistakes: [
    { wrong: 'Writing a long notice (like a letter)', correct: 'Keep notices within 50-80 words', why: 'Notices are brief — excess detail defeats the purpose' },
    { wrong: 'Dear Students, This is to inform you...', correct: 'NOTICE / All students are informed that...', why: 'No "Dear..." salutation in notices — use impersonal formal language' },
    { wrong: 'Yours faithfully at the end of notice.', correct: 'Name + Designation at end of notice.', why: "Notices don't close like letters — just name and designation of issuing authority" },
    { wrong: 'Using casual language: "Hey, there is an event tomorrow."', correct: '"All members are hereby informed that an event will be held on..."', why: 'Notices use formal, impersonal, passive language' },
  ],
  memoryTrick: "**NOTICE = WHAT + WHO + WHEN + WHERE**\n• WHAT happened/will happen?\n• WHO is affected/invited?\n• WHEN is it?\n• WHERE is it?\nIf your notice answers all 4 = Perfect Notice! ✅",
  vocabulary: [
    { word: 'Hereby', hindi: 'इसके द्वारा', example: 'All students are hereby informed.' },
    { word: 'Circular', hindi: 'परिपत्र', example: 'A circular was issued by the principal.' },
    { word: 'Mandatory', hindi: 'अनिवार्य', example: 'Attendance is mandatory for all staff.' },
    { word: 'Venue', hindi: 'स्थान', example: 'The venue for the event is the main hall.' },
    { word: 'Pursuant', hindi: 'के अनुसार', example: 'Pursuant to the management decision...' },
    { word: 'Forthwith', hindi: 'तुरंत', example: 'Report to the office forthwith.' },
  ],
  speakingTips: [
    "Write and read a notice aloud: 'The annual meeting will be held on...'",
    "Compare notice with letter — feel the difference in tone and format.",
    "Practice all 4 writing types: Application, Letter, Email, Notice — write one of each this week.",
  ],
};

// ============================================================
// Day 74 — Grammar + Vocabulary + Speaking Full Revision
// ============================================================
export const DAY_74_CONTENT = {
  explanation: `
**Day 74 — Full Revision: Grammar + Vocabulary + Speaking:**

75 दिनों का सफर लगभग खत्म होने वाला है! आज complete revision करेंगे।

**GRAMMAR REVISION (Days 1-52):**
✅ Simple Present, Past, Future (Days 1, 32)
✅ Be Verb, Has/Have/Had/Will Have (Days 4, 6, 7, 8)
✅ Modal Verbs: Can, Should, May, Must, Would (Days 16-30)
✅ Tenses — All 12 (Days 32-35)
✅ Prepositions (Days 36-37)
✅ Have to/Had to/Will have to (Days 38-39)
✅ Causatives: Make/Get (Day 40)
✅ Going To, About To (Days 41-42)
✅ Conjunctions, WH Words (Days 47-48)
✅ Passive Voice (Days 49-50)
✅ Advanced Structures (Days 51-52)

**VOCABULARY REVISION (Days 53-68):**
✅ Irregular Verbs, Idioms, Professional Words
✅ Stationery, Food, Weather, Family
✅ Professions, Buildings, Nature, Maths
✅ Industry, Judiciary, Sports, Sounds

**WRITING REVISION (Days 69-73):**
✅ Application, Letter, Email, Paragraph, Notice
  `,
  rules: [
    'All 12 tenses: Present/Past/Future × Simple/Continuous/Perfect/Perfect Continuous',
    'Modal verbs golden rule: modal + base verb ALWAYS (no s, no ing, no to)',
    'Passive = be verb (correct form) + V3',
    'Conditionals: 0/1st/2nd/3rd conditional structures',
    'Perfect modals: Must/Could/Should/Would/May/Might + have + V3',
    'Prepositions: In/On/At/By/For/Since (time/place rules)',
    'Writing: Application → Faithfully; Letter → Sincerely/Lovingly; Notice → Name+Designation',
  ],
  examples: [
    { hindi: 'वह 3 साल से यहाँ काम कर रही है।', english: 'She has been working here for 3 years.', type: 'Present Perfect Continuous' },
    { hindi: 'अगर मैंने पहले पूछा होता, यह नहीं होता।', english: 'If I had asked earlier, this would not have happened.', type: '3rd Conditional' },
    { hindi: 'Report तैयार की जा रही है।', english: 'The report is being prepared.', type: 'Present Continuous Passive' },
    { hindi: 'न केवल वह talented है बल्कि dedicated भी।', english: 'Not only is she talented, but she is also dedicated.', type: 'Advanced — Inversion' },
    { hindi: 'उसे ज़रूर पता रहा होगा।', english: 'She must have known about it.', type: 'Perfect Modal — Must Have' },
    { hindi: 'काश मैंने इस opportunity को use किया होता।', english: 'I wish I had made use of this opportunity.', type: 'Wish — Unreal Past' },
  ],
  mistakes: [
    { wrong: 'She is working here since 3 years.', correct: 'She has been working here for 3 years.', why: "Duration = Present Perfect Continuous; 'for' for duration" },
    { wrong: 'If I would have studied, I would pass.', correct: 'If I had studied, I would have passed.', why: "3rd conditional: if + had + V3 → would have + V3" },
    { wrong: 'The work is been completed.', correct: 'The work has been completed.', why: "Present Perfect Passive = 'has/have been + V3'" },
    { wrong: 'I wish I have more time.', correct: 'I wish I had more time.', why: "'Wish' + past simple for unreal present" },
  ],
  memoryTrick: "**75-DAY JOURNEY SUMMARY:**\n• Days 1-10: Basics → Be Verb, Has/Have, There is/are\n• Days 11-20: Want, Let, Can, Should, May, Must\n• Days 21-30: Used To, Perfect Modals\n• Days 31-52: Tenses, Prepositions, Passive, Advanced\n• Days 53-68: Vocabulary (8 categories)\n• Days 69-73: Writing Skills\n• Day 74-75: Revision + Final Test!",
  vocabulary: [
    { word: 'Comprehensive', hindi: 'व्यापक', example: 'This is a comprehensive revision.' },
    { word: 'Consolidate', hindi: 'मज़बूत करना', example: 'Consolidate all your learning today.' },
    { word: 'Proficient', hindi: 'कुशल', example: 'You are now proficient in English grammar.' },
    { word: 'Fluency', hindi: 'प्रवाह', example: 'Regular practice leads to fluency.' },
    { word: 'Confident', hindi: 'आत्मविश्वासी', example: 'Speak confidently with your new skills.' },
    { word: 'Milestone', hindi: 'मील का पत्थर', example: 'Day 74 is a major milestone in your journey.' },
  ],
  speakingTips: [
    "Today speak for 5 minutes non-stop on any topic — use all tenses, modals, conditionals.",
    "Test yourself: Convert 5 Hindi sentences to English using advanced structures.",
    "Celebrate your progress — you have come so far! Keep speaking every day.",
  ],
};

// ============================================================
// Day 75 — Complete Mock Test + Final Revision
// ============================================================
export const DAY_75_CONTENT = {
  explanation: `
**Day 75 — Complete Mock Test + Final Revision 🏁**

**यह आपका आखिरी दिन है — 75 Hard English का समापन!**

**MOCK TEST STRUCTURE:**

**Section A: Grammar (40 marks)**
1. Fill in the blanks with correct tense (10 Q × 2 = 20)
2. Correct the errors (5 Q × 2 = 10)
3. Voice change: Active ↔ Passive (5 Q × 2 = 10)

**Section B: Vocabulary (20 marks)**
1. Match idioms with meanings (5 Q × 2 = 10)
2. Fill in professional vocabulary (5 Q × 2 = 10)

**Section C: Writing (20 marks)**
1. Write a leave application (10 marks)
2. Write a paragraph on 'Benefits of Learning English' (10 marks)

**Section D: Speaking (20 marks)**
1. Self-introduction (2 min) = 10 marks
2. Speak on a given topic for 2 min = 10 marks

**Total: 100 Marks**
✅ 90-100 = Excellent 🏆
✅ 75-89 = Very Good 🥈
✅ 60-74 = Good 🥉
✅ Below 60 = Revise more and retake!
  `,
  rules: [
    'All grammar rules: from Day 1 basics to Day 52 advanced structures',
    'All 12 tenses: use correctly with appropriate time expressions',
    'Modal verbs: can/could, should/should have, must/must have, may/might, will/would',
    'Passive voice: all tenses + modals',
    'Writing skills: application, letter, email, notice, paragraph formats',
    'Vocabulary: irregular verbs, idioms, professional words, categories',
    'Speaking: confidence, clarity, correct grammar, good vocabulary',
  ],
  examples: [
    { hindi: 'Grammar Test Sample: वह 2020 से यहाँ है।', english: 'She has been here since 2020. ✅ (NOT: She is here since 2020)', type: 'Grammar Test — Tense' },
    { hindi: 'Voice Change: राम ने खाना बनाया।', english: 'Active: Ram cooked the food. → Passive: The food was cooked by Ram. ✅', type: 'Voice Change' },
    { hindi: 'Idiom: He hit the nail on the head.', english: 'Meaning: He said exactly the right thing. ✅', type: 'Idiom meaning' },
    { hindi: 'Error correction: She have finished.', english: 'Corrected: She has finished. ✅ (She/He/It → has)', type: 'Error correction' },
    { hindi: 'Conditional test: अगर बारिश होती...', english: 'If it rains, I will stay home. (1st Conditional) ✅', type: 'Conditional' },
    { hindi: 'Professional vocab: हमें project deploy करना है।', english: 'We need to deploy the project by Friday. ✅', type: 'Professional vocabulary' },
  ],
  mistakes: [
    { wrong: 'She have completed the course.', correct: 'She has completed the course.', why: "She/He/It → 'has' (not 'have')" },
    { wrong: 'If I would study, I will pass.', correct: 'If I study, I will pass. (1st conditional)', why: "First conditional: If + Present → will (not 'would study')" },
    { wrong: 'The work is been done.', correct: 'The work has been done. (Present Perfect Passive)', why: "'Is been' is wrong — Present Perfect Passive = 'has/have been + V3'" },
    { wrong: 'I am knowing the answer.', correct: 'I know the answer.', why: "Stative verbs (know, want, love) never use -ing form" },
  ],
  memoryTrick: "**🏁 75-DAY ACHIEVEMENT UNLOCKED! 🏁**\n\nYou have learned:\n✅ 12 Tenses | ✅ All Modal Verbs\n✅ Active & Passive Voice | ✅ Conditionals\n✅ 200+ Vocabulary Words | ✅ Idioms & Phrases\n✅ 5 Writing Formats | ✅ Professional English\n\n**Remember: English is not just a language — it's a superpower! 💪**\nSpeak daily, make mistakes, learn, improve. That is the ONLY formula!",
  vocabulary: [
    { word: 'Achievement', hindi: 'उपलब्धि', example: 'Completing 75 days is a great achievement!' },
    { word: 'Perseverance', hindi: 'दृढ़ता', example: 'Your perseverance brought you to Day 75.' },
    { word: 'Fluent', hindi: 'धाराप्रवाह', example: 'You are on the path to becoming fluent.' },
    { word: 'Proficient', hindi: 'कुशल', example: 'You are now proficient in English.' },
    { word: 'Consistent', hindi: 'निरंतर', example: 'Be consistent — speak English every day.' },
    { word: 'Journey', hindi: 'सफर', example: 'This 75-day journey has transformed you!' },
  ],
  speakingTips: [
    "आज full mock test दो — बिना help के सब खुद करो!",
    "After the test: review every mistake and understand why you got it wrong.",
    "From Day 76 onwards: Speak English for at least 30 minutes every single day. The real practice starts now!",
  ],
};

// ============================================================
// Export helper — Get content for a specific day
// (Placed after all content declarations to avoid TDZ errors)
// ============================================================
const CONTENT_MAP = {
  1:  DAY_01_CONTENT,
  2:  DAY_02_CONTENT,
  3:  DAY_03_CONTENT,
  4:  DAY_04_CONTENT,
  5:  DAY_05_CONTENT,
  6:  DAY_06_CONTENT,
  7:  DAY_07_CONTENT,
  8:  DAY_08_CONTENT,
  9:  DAY_09_CONTENT,
  10: DAY_10_CONTENT,
  11: DAY_11_CONTENT,
  12: DAY_12_CONTENT,
  13: DAY_13_CONTENT,
  14: DAY_14_CONTENT,
  15: DAY_15_CONTENT,
  16: DAY_16_CONTENT,
  17: DAY_17_CONTENT,
  18: DAY_18_CONTENT,
  19: DAY_19_CONTENT,
  20: DAY_20_CONTENT,
  21: DAY_21_CONTENT,
  22: DAY_22_CONTENT,
  23: DAY_23_CONTENT,
  24: DAY_24_CONTENT,
  25: DAY_25_CONTENT,
  26: DAY_26_CONTENT,
  27: DAY_27_CONTENT,
  28: DAY_28_CONTENT,
  29: DAY_29_CONTENT,
  30: DAY_30_CONTENT,
  31: DAY_31_CONTENT,
  32: DAY_32_CONTENT,
  33: DAY_33_CONTENT,
  34: DAY_34_CONTENT,
  35: DAY_35_CONTENT,
  36: DAY_36_CONTENT,
  37: DAY_37_CONTENT,
  38: DAY_38_CONTENT,
  39: DAY_39_CONTENT,
  40: DAY_40_CONTENT,
  41: DAY_41_CONTENT,
  42: DAY_42_CONTENT,
  43: DAY_43_CONTENT,
  44: DAY_44_CONTENT,
  45: DAY_45_CONTENT,
  46: DAY_46_CONTENT,
  47: DAY_47_CONTENT,
  48: DAY_48_CONTENT,
  49: DAY_49_CONTENT,
  50: DAY_50_CONTENT,
  51: DAY_51_CONTENT,
  52: DAY_52_CONTENT,
  53: DAY_53_CONTENT,
  54: DAY_54_CONTENT,
  55: DAY_55_CONTENT,
  56: DAY_56_CONTENT,
  57: DAY_57_CONTENT,
  58: DAY_58_CONTENT,
  59: DAY_59_CONTENT,
  60: DAY_60_CONTENT,
  61: DAY_61_CONTENT,
  62: DAY_62_CONTENT,
  63: DAY_63_CONTENT,
  64: DAY_64_CONTENT,
  65: DAY_65_CONTENT,
  66: DAY_66_CONTENT,
  67: DAY_67_CONTENT,
  68: DAY_68_CONTENT,
  69: DAY_69_CONTENT,
  70: DAY_70_CONTENT,
  71: DAY_71_CONTENT,
  72: DAY_72_CONTENT,
  73: DAY_73_CONTENT,
  74: DAY_74_CONTENT,
  75: DAY_75_CONTENT,
};

// Default content template generator for days without custom data (Days 31-75)
function getDefaultContent(dayNum, topicTitle) {
  // Find the topic object by its day number
  const topic = DAYS_75_TOPICS.find((t) => t.day === dayNum);
  // Get the type of the topic (e.g. grammar, vocabulary, writing)
  const type = topic ? topic.type : 'grammar';

  // Default values that we will customize
  let explanation = '';
  let rules = [];
  let examples = [];
  let mistakes = [];
  let memoryTrick = '';
  let vocabulary = [];
  let speakingTips = [];

  // Check if this topic is a grammar lesson
  if (type === 'grammar') {
    // Explanation written in Hindi and English
    explanation = `
**${topicTitle} — Grammar Lesson:**

यह topic English Grammar का बहुत ही महत्वपूर्ण हिस्सा है।
इस lesson में हम सीखेंगे कि **${topicTitle}** का उपयोग सही तरीके से कैसे किया जाता है।

**Key Concepts of this grammar topic:**
- Understand structure rules for positive, negative, and questions.
- Practice daily usage examples.
- Identify and avoid common mistakes.
    `;

    // Specific rules based on day ranges
    if (dayNum >= 32 && dayNum <= 35) {
      // Rules for Tenses
      rules = [
        'Tense rules help you express time correctly (Present, Past, Future).',
        'Check the verb form (V1, V2, V3, V4, V5) based on helper verbs.',
        'Use auxiliary verbs like do/does, is/am/are, has/have, did, was/were, will.',
        'Always practice tenses using both singular and plural subjects.',
      ];
      // Examples for Tenses
      examples = [
        { hindi: 'वह रोज़ काम करता है।', english: 'He works daily.', type: 'Simple Present' },
        { hindi: 'मैं खेल रहा हूँ।', english: 'I am playing.', type: 'Present Continuous' },
        { hindi: 'हम कल गए थे।', english: 'We went yesterday.', type: 'Past Simple' },
        { hindi: 'वे खाना खाएंगे।', english: 'They will eat food.', type: 'Future Simple' },
      ];
      // Common mistakes for Tenses
      mistakes = [
        { wrong: 'I am go to office.', correct: 'I go to office.', why: '"Am" is not used with direct base verbs.' },
        { wrong: 'He do not know.', correct: 'He does not know.', why: 'Use "does" with singular subjects (He, She, It).' },
      ];
      memoryTrick = 'Remember: **Past = V2/Did, Present = V1/Is/Am/Are, Future = Will + V1.**';
    } else if (dayNum === 36 || dayNum === 37) {
      // Rules for Prepositions
      rules = [
        'Prepositions show position, direction, or time relationship.',
        'Common prepositions: in, on, at, to, under, over, between, behind.',
        'Do not translate prepositions literally from Hindi, learn their usage rules.',
        'Use "at" for specific points of time/places, and "in" for enclosed spaces/years.',
      ];
      examples = [
        { hindi: 'किताब मेज़ पर है।', english: 'The book is on the table.', type: 'Position' },
        { hindi: 'वह ऑफ़िस में है।', english: 'He is in the office.', type: 'In/At' },
        { hindi: 'हम 5 बजे मिलेंगे।', english: 'We will meet at 5 o\'clock.', type: 'Time' },
      ];
      mistakes = [
        { wrong: 'I am in school.', correct: 'I am at school.', why: 'Use "at school" when referring to school as a location/activity.' },
        { wrong: 'He sits in the chair.', correct: 'He sits on the chair.', why: 'Use "on" for flat seats without armrests.' },
      ];
      memoryTrick = 'Remember: **ON the surface, IN the volume, AT the point.**';
    } else {
      // Fallback for general Grammar
      rules = [
        `Learn the structure of ${topicTitle} sentences.`,
        'Practice changing singular subjects to plural.',
        'Identify helper verbs and V-forms needed for this structure.',
        'Avoid mixing up passive and active voices.',
      ];
      examples = [
        { hindi: 'कृपया इसे ध्यान से पढ़ें।', english: 'Please read this carefully.', type: 'Instruction' },
        { hindi: 'यह अभ्यास बहुत ज़रूरी है।', english: 'This practice is very important.', type: 'Example' },
      ];
      mistakes = [
        { wrong: 'Incorrect helper verb usage.', correct: 'Correct helper verb usage.', why: 'Check subject agreement.' },
      ];
      memoryTrick = `Visual Trick: Write down 5 formulas of ${topicTitle} on a sticky note.`;
    }

    // Default vocabulary for grammar days
    vocabulary = [
      { word: 'Structure', hindi: 'संरचना / ढांचा', example: 'Practice the sentence structure.' },
      { word: 'Identify', hindi: 'पहचानना', example: 'Identify the verb form.' },
      { word: 'Regularly', hindi: 'नियमित रूप से', example: 'Practice tenses regularly.' },
      { word: 'Fluent', hindi: 'प्रवाहमयी', example: 'Your English is getting fluent.' },
    ];

    speakingTips = [
      'Speak 5 sentences using this structure loud and clear.',
      'Record your voice and compare it with the pronunciation guide.',
      'Try talking to a friend or AI Tutor using these phrases.',
    ];
  }
  // Check if this topic is a vocabulary category lesson
  else if (type === 'vocabulary') {
    explanation = `
**${topicTitle} — Vocabulary Building:**

शब्दकोश (Vocabulary) English Fluency की रीढ़ की हड्डी है।
इस class में हम **${topicTitle}** से जुड़े सबसे महत्वपूर्ण शब्दों को याद करेंगे।

**How to expand your vocabulary:**
- Learn the English words, their correct pronunciation (IPA), and Hindi meaning.
- Make sentences using the new words.
- Learn synonyms and antonyms to understand related words.
    `;

    rules = [
      'Focus on spelling and sound pronunciation.',
      'Group related words together to remember them easily.',
      'Create 3 daily life sentences with every new word.',
      'Revise your word bank every 3 days using spaced repetition.',
    ];

    examples = [
      { hindi: 'मुझे नए शब्द सीखना पसंद है।', english: 'I love learning new words.', type: 'Expression' },
      { hindi: 'यह शब्द दैनिक जीवन में उपयोगी है।', english: 'This word is useful in daily life.', type: 'Context' },
    ];

    mistakes = [
      { wrong: 'Using words without knowing context.', correct: 'Check context of synonyms.', why: 'Some synonyms are formal, others are informal.' },
    ];

    memoryTrick = 'Tip: **Use the Flashcard method (Spaced Repetition)** to memorize these words.';

    // Dynamic vocab words based on Day index (different categories)
    vocabulary = [
      { word: 'Express', hindi: 'व्यक्त करना', example: 'Express your thoughts clearly.' },
      { word: 'Acquire', hindi: 'प्राप्त करना / सीखना', example: 'Acquire new vocabulary daily.' },
      { word: 'Memory', hindi: 'याददाश्त', example: 'Keep a record in your memory.' },
      { word: 'Improve', hindi: 'सुधारना', example: 'Practice will improve your skills.' },
      { word: 'Fluency', hindi: 'प्रवाह', example: 'Vocabulary increases fluency.' },
      { word: 'Conversation', hindi: 'बातचीत', example: 'Use these words in conversation.' },
    ];

    speakingTips = [
      'Pronounce each word slowly, paying attention to silent letters.',
      'Use at least 3 of these new words in your speaking test today.',
      'Explain the meaning of these words to someone else in Hindi.',
    ];
  }
  // Check if this topic is a writing skills lesson
  else if (type === 'writing') {
    explanation = `
**${topicTitle} — Professional Writing Skills:**

लिखने की कला (Writing Skills) आपको professional environment in English में आगे बढ़ाती है।
इस lesson में हम **${topicTitle}** का प्रारूप (Format) और लिखने का तरीका सीखेंगे।

**Important Writing tips:**
- Format rules are extremely strict in formal letter and application writing.
- Keep sentences clear, concise, and to-the-point.
- Check spelling and punctuation errors before finishing.
    `;

    rules = [
      'Always start with a clear, engaging Subject line.',
      'Use proper salutations: Dear Sir/Madam, Hello Team.',
      'Structure the body into Intro, details, and call to action.',
      'Proofread twice to remove spelling mistakes and grammar errors.',
    ];

    examples = [
      { hindi: 'कृपया मेरा आवेदन स्वीकार करें।', english: 'Please accept my application.', type: 'Formal' },
      { hindi: 'मैं इस ईमेल के साथ फ़ाइल संलग्न कर रहा हूँ।', english: 'I am attaching the file with this email.', type: 'Email' },
    ];

    mistakes = [
      { wrong: 'Writing long paragraphs without spacing.', correct: 'Divide writing into 3 short paragraphs.', why: 'Short paragraphs are easier to read.' },
    ];

    memoryTrick = 'Format Formula: **Sender → Date → Receiver → Subject → Body → Sign off.**';

    vocabulary = [
      { word: 'Application', hindi: 'आवेदन / प्रार्थना पत्र', example: 'Write a leave application.' },
      { word: 'Request', hindi: 'अनुरोध करना', example: 'Send a formal request.' },
      { word: 'Attach', hindi: 'संलग्न करना / जोड़ना', example: 'Attach the documents here.' },
      { word: 'Signature', hindi: 'हस्ताक्षर', example: 'Put your signature at the end.' },
    ];

    speakingTips = [
      'Read your written essay or email aloud to check if it sounds natural.',
      'Discuss the structure of a formal letter with your AI speaking partner.',
    ];
  }
  // Fallback for Revision, Tests, Practice
  else {
    explanation = `
**${topicTitle} — Challenge Section:**

यह revision और practice का दिन है।
हमने पिछले lessons में जो भी सीखा है, उसे आज हम review करेंगे।

**Revision guidelines:**
- Go back to previous days if you forgot rules.
- Take mock tests to track accuracy and weak areas.
- Solve translation questions to test active recall.
    `;

    rules = [
      'Revise grammar structures and tenses rules.',
      'Check your daily vocabulary words list.',
      'Practice speaking and writing exercises.',
      'Review your previous test mistakes to avoid repeating them.',
    ];

    examples = [
      { hindi: 'मुझे फिर से अभ्यास करना होगा।', english: 'I need to practice again.', type: 'Revision' },
      { hindi: 'इस बार मैं सही उत्तर दूंगा।', english: 'This time I will give the correct answer.', type: 'Test' },
    ];

    mistakes = [
      { wrong: 'Skipping revisions.', correct: 'Do active recall revision weekly.', why: 'Revision prevents forgetting rules over time.' },
    ];

    memoryTrick = 'Rule of study: **Learn new topics 80% of the time, revise 20% of the time.**';

    vocabulary = [
      { word: 'Revision', hindi: 'पुनरावृत्ति', example: 'Revision is key to success.' },
      { word: 'Accuracy', hindi: 'सटीकता', example: 'Aim for 95% accuracy in tests.' },
      { word: 'Assessment', hindi: 'मूल्यांकन', example: 'Daily assessment is useful.' },
    ];

    speakingTips = [
      'Speak for 2 minutes continuously about everything you learned this week.',
      'Check your progress stats on the main dashboard page.',
    ];
  }

  // Return the complete lesson content object
  return {
    explanation,
    rules,
    examples,
    mistakes,
    memoryTrick,
    vocabulary,
    speakingTips,
  };
}

export function getContentForDay(dayNum, topicTitle = '') {
  return CONTENT_MAP[dayNum] || getDefaultContent(dayNum, topicTitle);
}

export default getContentForDay;
