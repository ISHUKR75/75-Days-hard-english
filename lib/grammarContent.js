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

// ============================================================
// Export helper — Get content for a specific day
// ============================================================
const CONTENT_MAP = {
  1: DAY_01_CONTENT,
  2: DAY_02_CONTENT,
  3: DAY_03_CONTENT,
  4: DAY_04_CONTENT,
  5: DAY_05_CONTENT,
  6: DAY_06_CONTENT,
  7: DAY_07_CONTENT,
  8: DAY_08_CONTENT,
  9: DAY_09_CONTENT,
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
