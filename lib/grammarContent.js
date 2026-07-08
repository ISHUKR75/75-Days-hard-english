// Grammar Content Library — Real explanations for all 75 days
// Each entry: { explanation (Hindi+English), rules[], examples[], mistakes[], memoryTrick, vocabulary[], speakingTips[] }

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
};

// Default content template for days without custom content
function getDefaultContent(dayNum, topicTitle) {
  return {
    explanation: `
**${topicTitle} — Complete Explanation:**

यह topic English grammar का एक महत्वपूर्ण हिस्सा है।
Is page पर आपको complete explanation, examples, और practice मिलेगी।

इस topic को master करने के लिए:
1. पहले theory समझो
2. Examples देखो
3. Practice questions करो (500+)
4. Speaking practice करो
5. Mini test दो
    `,
    rules: [
      `${topicTitle} का basic structure समझो`,
      'Daily sentences में use करने की कोशिश करो',
      'Mistakes से सीखो — हर गलती एक lesson है',
      'Regular practice से fluency आती है',
    ],
    examples: [
      { hindi: 'Practice sentence 1', english: 'Practice sentence 1 in English', type: 'Example' },
      { hindi: 'Practice sentence 2', english: 'Practice sentence 2 in English', type: 'Example' },
      { hindi: 'Practice sentence 3', english: 'Practice sentence 3 in English', type: 'Example' },
    ],
    mistakes: [
      { wrong: 'Common mistake example', correct: 'Correct version', why: 'Explanation' },
    ],
    memoryTrick: `**${topicTitle} Trick:** इस topic को याद रखने के लिए pattern याद करो और daily use करो।`,
    vocabulary: [
      { word: 'Practice', hindi: 'अभ्यास', example: 'Practice makes perfect.' },
      { word: 'Grammar', hindi: 'व्याकरण', example: 'Grammar is important.' },
      { word: 'Fluency', hindi: 'प्रवाह', example: 'Aim for fluency.' },
    ],
    speakingTips: [
      'रोज़ इस topic पर 5 sentences बोलो',
      'Conversations में naturally use karo',
    ],
  };
}

export function getContentForDay(dayNum, topicTitle = '') {
  return CONTENT_MAP[dayNum] || getDefaultContent(dayNum, topicTitle);
}

export default getContentForDay;
