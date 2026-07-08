// ============================================================
// PRACTICE DATA — DAYS 31 TO 75
// 75 Days Hard English — Hindi → English Translation Questions
// Each day has 60-80 real questions for proper practice
// Format: { id, hindi, english, alternatives[], hint, type }
// ============================================================

// ============================================================
// Day 31 — Revision (Modals + Be Verb + Have/Had + Tenses Mix)
// ============================================================
const DAY_31 = [
  // Be Verb revision
  { id:'d31-001', hindi:'मैं बहुत थका हुआ हूँ।', english:'I am very tired.', alternatives:['i am very tired.','i am so tired.'], hint:'I am + adjective', type:'translation' },
  { id:'d31-002', hindi:'वह एक अच्छा इंसान है।', english:'He is a good person.', alternatives:['he is a very good person.'], hint:'He is + article + adjective + noun', type:'translation' },
  { id:'d31-003', hindi:'हम सब यहाँ हैं।', english:'We are all here.', alternatives:['we all are here.'], hint:'We are + all + adjective', type:'translation' },
  { id:'d31-004', hindi:'कल मौसम बहुत ठंडा था।', english:'Yesterday the weather was very cold.', alternatives:['the weather was very cold yesterday.'], hint:'was + adjective (past)', type:'translation' },
  { id:'d31-005', hindi:'वे लोग बाज़ार में थे।', english:'They were in the market.', alternatives:['they were at the market.'], hint:'They were + in/at + place', type:'translation' },
  // Has/Have revision
  { id:'d31-006', hindi:'मेरे पास एक स्मार्टफोन है।', english:'I have a smartphone.', alternatives:['i have got a smartphone.'], hint:'I have + article + noun', type:'translation' },
  { id:'d31-007', hindi:'उसके पास तीन बिल्लियाँ हैं।', english:'She has three cats.', alternatives:['she has got three cats.'], hint:'She has + number + noun', type:'translation' },
  { id:'d31-008', hindi:'क्या तुम्हारे पास समय है?', english:'Do you have time?', alternatives:['do you have any time?','have you got time?'], hint:'Do you have + noun?', type:'translation' },
  // Had revision
  { id:'d31-009', hindi:'मेरे पास पहले एक साइकिल थी।', english:'I had a bicycle before.', alternatives:['i used to have a bicycle.'], hint:'I had + article + noun + before', type:'translation' },
  { id:'d31-010', hindi:'जब वह स्टेशन पहुँचा, ट्रेन जा चुकी थी।', english:'When he reached the station, the train had already left.', alternatives:['by the time he reached, the train had left.'], hint:'Past Perfect: had + past participle', type:'translation' },
  // Modal verbs revision
  { id:'d31-011', hindi:'मैं तैर सकता हूँ।', english:'I can swim.', alternatives:['i am able to swim.'], hint:'can + base verb', type:'translation' },
  { id:'d31-012', hindi:'तुम्हें रोज़ व्यायाम करना चाहिए।', english:'You should exercise every day.', alternatives:['you should exercise daily.'], hint:'should + base verb', type:'translation' },
  { id:'d31-013', hindi:'शायद कल बारिश होगी।', english:'It may rain tomorrow.', alternatives:['it might rain tomorrow.'], hint:'may/might + base verb', type:'translation' },
  { id:'d31-014', hindi:'तुम्हें अभी जाना चाहिए।', english:'You must go now.', alternatives:['you should go now.'], hint:'must + base verb', type:'translation' },
  { id:'d31-015', hindi:'क्या मैं यहाँ बैठ सकता हूँ?', english:'May I sit here?', alternatives:['can i sit here?'], hint:'May I + verb?', type:'translation' },
  { id:'d31-016', hindi:'मुझे पहले यह करना था।', english:'I should have done this earlier.', alternatives:['i ought to have done this before.'], hint:'should have + past participle', type:'translation' },
  { id:'d31-017', hindi:'वह ज़रूर यहाँ आया होगा।', english:'He must have come here.', alternatives:['he must have visited here.'], hint:'must have + past participle', type:'translation' },
  { id:'d31-018', hindi:'काश मैंने यह पहले सीखा होता।', english:'I wish I had learned this earlier.', alternatives:['i wish i had studied this before.'], hint:'I wish + had + past participle', type:'translation' },
  // Want/Let revision
  { id:'d31-019', hindi:'मैं एक नई नौकरी चाहता हूँ।', english:'I want a new job.', alternatives:['i want to find a new job.'], hint:'I want + noun/to + verb', type:'translation' },
  { id:'d31-020', hindi:'मुझे जाने दो।', english:'Let me go.', alternatives:['please let me go.'], hint:'Let + me + base verb', type:'translation' },
  { id:'d31-021', hindi:'चलो बाहर खाना खाते हैं।', english:"Let's eat out.", alternatives:["let's go out to eat.","let's have food outside."], hint:"Let's + base verb", type:'translation' },
  { id:'d31-022', hindi:'मैं एक कप चाय लेना चाहूँगा।', english:'I would like to have a cup of tea.', alternatives:['i would like a cup of tea.'], hint:'would like to + base verb', type:'translation' },
  { id:'d31-023', hindi:'मुझे पहले यह पसंद था।', english:'I used to like this.', alternatives:['i used to enjoy this.'], hint:'used to + base verb', type:'translation' },
  { id:'d31-024', hindi:'वह पहले बहुत तेज़ दौड़ सकता था।', english:'He could run very fast before.', alternatives:['he was able to run fast before.'], hint:'could + base verb', type:'translation' },
  { id:'d31-025', hindi:'शायद वह कल आ सकती है।', english:'She could come tomorrow.', alternatives:['she might come tomorrow.'], hint:'could + base verb (possibility)', type:'translation' },
  { id:'d31-026', hindi:'तुम्हें डॉक्टर से मिलना होगा।', english:'You will have to see a doctor.', alternatives:['you must see a doctor.'], hint:'will have to + base verb', type:'translation' },
  { id:'d31-027', hindi:'हमें कड़ी मेहनत करनी चाहिए।', english:'We ought to work hard.', alternatives:['we should work hard.'], hint:'ought to + base verb', type:'translation' },
  { id:'d31-028', hindi:'वह जाने की हिम्मत नहीं कर सका।', english:'He dared not go.', alternatives:['he did not dare to go.'], hint:'dare + not + base verb', type:'translation' },
  { id:'d31-029', hindi:'मुझे पानी चाहिए।', english:'I need water.', alternatives:['i want some water.'], hint:'I need + noun', type:'translation' },
  { id:'d31-030', hindi:'क्या तुम मेरी मदद करना चाहोगे?', english:'Would you like to help me?', alternatives:['would you help me?'], hint:'Would you like to + verb?', type:'translation' },
  // Mixed sentences
  { id:'d31-031', hindi:'मैं अंग्रेज़ी में बात करना सीख रहा हूँ।', english:'I am learning to speak in English.', alternatives:['i am learning to talk in english.'], hint:'I am + verb+ing + to + verb', type:'translation' },
  { id:'d31-032', hindi:'वह हर सुबह योग करता है।', english:'He does yoga every morning.', alternatives:['he practices yoga every morning.'], hint:'He does + noun + every morning', type:'translation' },
  { id:'d31-033', hindi:'मुझे समझ नहीं आया।', english:'I did not understand.', alternatives:["i didn't understand.",'i could not understand.'], hint:'I did not + base verb', type:'translation' },
  { id:'d31-034', hindi:'हम कल दिल्ली जाएँगे।', english:'We will go to Delhi tomorrow.', alternatives:['we are going to delhi tomorrow.'], hint:'will + base verb + tomorrow', type:'translation' },
  { id:'d31-035', hindi:'उसने मुझसे माफ़ी माँगी।', english:'He apologized to me.', alternatives:['he said sorry to me.'], hint:'He + past verb + to me', type:'translation' },
  { id:'d31-036', hindi:'क्या तुम खुश हो?', english:'Are you happy?', alternatives:['are you feeling happy?'], hint:'Are you + adjective?', type:'translation' },
  { id:'d31-037', hindi:'बच्चे पार्क में खेल रहे थे।', english:'The children were playing in the park.', alternatives:['children were playing in park.'], hint:'were + verb+ing (past continuous)', type:'translation' },
  { id:'d31-038', hindi:'मैं यह काम तीन घंटे से कर रहा हूँ।', english:'I have been doing this work for three hours.', alternatives:['i have been working on this for three hours.'], hint:'have been + verb+ing + for + time', type:'translation' },
  { id:'d31-039', hindi:'उसने मुझे कभी धोखा नहीं दिया।', english:'He never cheated me.', alternatives:['he has never cheated me.','he never deceived me.'], hint:'never + past verb', type:'translation' },
  { id:'d31-040', hindi:'मैं तुमसे सहमत हूँ।', english:'I agree with you.', alternatives:['i agree with you.'], hint:'I agree with + you', type:'translation' },
];

// ============================================================
// Day 32 — Tenses Part 1 (Simple Present, Present Continuous, Present Perfect)
// ============================================================
const DAY_32 = [
  // Simple Present
  { id:'d32-001', hindi:'मैं रोज़ सुबह 6 बजे उठता हूँ।', english:'I wake up at 6 AM every day.', alternatives:['i get up at 6 am daily.'], hint:'Simple Present = daily habit', type:'translation' },
  { id:'d32-002', hindi:'वह अपने माता-पिता से बहुत प्यार करती है।', english:'She loves her parents very much.', alternatives:['she loves her parents a lot.'], hint:'She loves + object', type:'translation' },
  { id:'d32-003', hindi:'पानी 100 डिग्री पर उबलता है।', english:'Water boils at 100 degrees.', alternatives:['water boils at 100 degree celsius.'], hint:'Scientific fact = Simple Present', type:'translation' },
  { id:'d32-004', hindi:'क्या तुम रोज़ व्यायाम करते हो?', english:'Do you exercise every day?', alternatives:['do you workout daily?'], hint:'Do you + base verb + ?', type:'translation' },
  { id:'d32-005', hindi:'वह सुबह अखबार नहीं पढ़ता।', english:'He does not read the newspaper in the morning.', alternatives:["he doesn't read newspaper in morning."], hint:'does not + base verb', type:'translation' },
  { id:'d32-006', hindi:'मेरे पिता सरकारी नौकरी करते हैं।', english:'My father works in a government job.', alternatives:['my father does a government job.'], hint:'Subject + works/does + noun', type:'translation' },
  { id:'d32-007', hindi:'पृथ्वी सूर्य के चारों ओर घूमती है।', english:'The Earth revolves around the Sun.', alternatives:['earth goes around the sun.'], hint:'Universal truth = Simple Present', type:'translation' },
  { id:'d32-008', hindi:'हम हर रविवार मंदिर जाते हैं।', english:'We go to the temple every Sunday.', alternatives:['we visit the temple every sunday.'], hint:'We go + every + day/time', type:'translation' },
  { id:'d32-009', hindi:'वह बहुत तेज़ बोलती है।', english:'She speaks very fast.', alternatives:['she talks very fast.'], hint:'She speaks + adverb', type:'translation' },
  { id:'d32-010', hindi:'क्या वह कॉफी पसंद करता है?', english:'Does he like coffee?', alternatives:['does he enjoy coffee?'], hint:'Does he + base verb + ?', type:'translation' },
  // Present Continuous
  { id:'d32-011', hindi:'मैं अभी खाना खा रहा हूँ।', english:'I am eating food right now.', alternatives:['i am having food right now.'], hint:'am + verb+ing (right now)', type:'translation' },
  { id:'d32-012', hindi:'वह ऑफिस में काम कर रही है।', english:'She is working in the office.', alternatives:['she is working at the office.'], hint:'is + verb+ing', type:'translation' },
  { id:'d32-013', hindi:'बच्चे बाहर खेल रहे हैं।', english:'The children are playing outside.', alternatives:['the kids are playing outside.'], hint:'are + verb+ing', type:'translation' },
  { id:'d32-014', hindi:'क्या तुम अभी पढ़ रहे हो?', english:'Are you studying right now?', alternatives:['are you reading right now?'], hint:'Are you + verb+ing + ?', type:'translation' },
  { id:'d32-015', hindi:'वह अभी सो नहीं रहा।', english:'He is not sleeping right now.', alternatives:["he isn't sleeping now."], hint:'is not + verb+ing', type:'translation' },
  { id:'d32-016', hindi:'मैं इस हफ्ते मुंबई में हूँ।', english:'I am staying in Mumbai this week.', alternatives:['i am in mumbai this week.'], hint:'am + verb+ing (temporary situation)', type:'translation' },
  { id:'d32-017', hindi:'कंपनी अभी नए कर्मचारी ले रही है।', english:'The company is hiring new employees.', alternatives:['the company is recruiting employees.'], hint:'is + verb+ing (ongoing)', type:'translation' },
  { id:'d32-018', hindi:'तुम क्या कर रहे हो?', english:'What are you doing?', alternatives:['what are you up to?'], hint:'What are you + verb+ing ?', type:'translation' },
  { id:'d32-019', hindi:'वह मेरी बात नहीं सुन रही।', english:'She is not listening to me.', alternatives:["she isn't listening to me."], hint:'is not + verb+ing', type:'translation' },
  { id:'d32-020', hindi:'हम एक नया प्रोजेक्ट शुरू कर रहे हैं।', english:'We are starting a new project.', alternatives:['we are launching a new project.'], hint:'are + verb+ing (new action)', type:'translation' },
  // Present Perfect
  { id:'d32-021', hindi:'मैं दिल्ली जा चुका हूँ।', english:'I have been to Delhi.', alternatives:['i have visited delhi.','i have gone to delhi.'], hint:'have + past participle (experience)', type:'translation' },
  { id:'d32-022', hindi:'उसने अभी-अभी खाना खाया है।', english:'She has just eaten food.', alternatives:['she has just had food.'], hint:'has + just + past participle', type:'translation' },
  { id:'d32-023', hindi:'हम तीन साल से दोस्त हैं।', english:'We have been friends for three years.', alternatives:['we have been friends since three years.'], hint:'have been + adjective + for + time', type:'translation' },
  { id:'d32-024', hindi:'क्या तुमने अपना होमवर्क किया?', english:'Have you done your homework?', alternatives:['have you completed your homework?'], hint:'Have you + past participle ?', type:'translation' },
  { id:'d32-025', hindi:'उसने अभी तक काम खत्म नहीं किया।', english:'He has not finished the work yet.', alternatives:["he hasn't finished yet."], hint:'has not + past participle + yet', type:'translation' },
  { id:'d32-026', hindi:'मैंने कभी झूठ नहीं बोला।', english:'I have never told a lie.', alternatives:['i have never lied.'], hint:'have never + past participle', type:'translation' },
  { id:'d32-027', hindi:'वह आज तीन कप चाय पी चुकी है।', english:'She has had three cups of tea today.', alternatives:['she has drunk three cups of tea today.'], hint:'has + past participle + today', type:'translation' },
  { id:'d32-028', hindi:'मुझे अभी-अभी एक अच्छी खबर मिली है।', english:'I have just received good news.', alternatives:['i have just got good news.'], hint:'have just + past participle', type:'translation' },
  { id:'d32-029', hindi:'क्या तुमने कभी विदेश देखा है?', english:'Have you ever been abroad?', alternatives:['have you ever traveled abroad?'], hint:'Have you ever + past participle ?', type:'translation' },
  { id:'d32-030', hindi:'हम 2020 से इस शहर में रह रहे हैं।', english:'We have been living in this city since 2020.', alternatives:['we have been staying here since 2020.'], hint:'have been + verb+ing + since + year', type:'translation' },
  // More mixed tenses
  { id:'d32-031', hindi:'मैं हर रात 11 बजे सोता हूँ।', english:'I sleep at 11 PM every night.', alternatives:['i go to sleep at 11 pm every night.'], hint:'Simple Present + time', type:'translation' },
  { id:'d32-032', hindi:'वह अभी मीटिंग में है।', english:'He is in a meeting right now.', alternatives:['he is attending a meeting right now.'], hint:'is + in + noun (ongoing)', type:'translation' },
  { id:'d32-033', hindi:'मैंने आज सुबह जिम में व्यायाम किया।', english:'I have exercised at the gym this morning.', alternatives:['i exercised at the gym this morning.'], hint:'have + past participle + this morning', type:'translation' },
  { id:'d32-034', hindi:'वह रोज़ सुबह 10 किलोमीटर दौड़ता है।', english:'He runs 10 kilometres every morning.', alternatives:['he runs 10 km every morning.'], hint:'Simple Present + habit', type:'translation' },
  { id:'d32-035', hindi:'वे अभी टीवी देख रहे हैं।', english:'They are watching TV right now.', alternatives:['they are watching television now.'], hint:'are + verb+ing', type:'translation' },
  { id:'d32-036', hindi:'मैंने यह किताब तीन बार पढ़ी है।', english:'I have read this book three times.', alternatives:['i have read this book 3 times.'], hint:'have + past participle + number + times', type:'translation' },
  { id:'d32-037', hindi:'वह हमेशा समय पर आती है।', english:'She always comes on time.', alternatives:['she is always punctual.'], hint:'always + Simple Present', type:'translation' },
  { id:'d32-038', hindi:'तुम अभी क्या सोच रहे हो?', english:'What are you thinking about right now?', alternatives:['what are you thinking right now?'], hint:'What are you + verb+ing ?', type:'translation' },
  { id:'d32-039', hindi:'उसने इस कंपनी में 5 साल काम किया है।', english:'He has worked in this company for 5 years.', alternatives:['he has been working here for 5 years.'], hint:'have + past participle + for + period', type:'translation' },
  { id:'d32-040', hindi:'मैं अंग्रेज़ी सीखना बहुत ज़रूरी समझता हूँ।', english:'I think learning English is very important.', alternatives:['i believe english learning is very important.'], hint:'I think + gerund + is + adjective', type:'translation' },
  { id:'d32-041', hindi:'वह रोज़ अपनी माँ को फोन करती है।', english:'She calls her mother every day.', alternatives:['she phones her mother daily.'], hint:'She calls + object + every day', type:'translation' },
  { id:'d32-042', hindi:'क्या तुम कभी क्रिकेट खेलते हो?', english:'Do you ever play cricket?', alternatives:['do you play cricket sometimes?'], hint:'Do you ever + base verb ?', type:'translation' },
  { id:'d32-043', hindi:'वह पिछले एक घंटे से मेरा इंतज़ार कर रहा है।', english:'He has been waiting for me for the past one hour.', alternatives:['he has been waiting for me for an hour.'], hint:'has been + verb+ing + for + time', type:'translation' },
  { id:'d32-044', hindi:'मुझे आज बहुत काम करना है।', english:'I have a lot of work to do today.', alternatives:['i have much work today.'], hint:'have + a lot of + noun + to do', type:'translation' },
  { id:'d32-045', hindi:'वह सच नहीं बोल रहा।', english:'He is not telling the truth.', alternatives:["he isn't telling the truth.",'he is lying.'], hint:'is not + verb+ing', type:'translation' },
];

// ============================================================
// Day 33 — Tenses Part 2 (Simple Past, Past Continuous, Past Perfect)
// ============================================================
const DAY_33 = [
  // Simple Past
  { id:'d33-001', hindi:'मैंने कल एक अच्छी फिल्म देखी।', english:'I watched a good movie yesterday.', alternatives:['i saw a good film yesterday.'], hint:'Simple Past: watched/saw', type:'translation' },
  { id:'d33-002', hindi:'वह सुबह जल्दी उठी।', english:'She woke up early in the morning.', alternatives:['she got up early this morning.'], hint:'woke up (irregular past)', type:'translation' },
  { id:'d33-003', hindi:'हम पिछले साल शिमला गए थे।', english:'We went to Shimla last year.', alternatives:['we visited shimla last year.'], hint:'went (irregular past of go)', type:'translation' },
  { id:'d33-004', hindi:'क्या तुमने कल रात खाना खाया?', english:'Did you eat last night?', alternatives:['did you have food last night?'], hint:'Did you + base verb + ?', type:'translation' },
  { id:'d33-005', hindi:'उसने मुझे कोई जवाब नहीं दिया।', english:'He did not give me any answer.', alternatives:["he didn't give me any reply."], hint:'did not + base verb', type:'translation' },
  { id:'d33-006', hindi:'मेरे दादाजी एक शिक्षक थे।', english:'My grandfather was a teacher.', alternatives:['my grandpa was a teacher.'], hint:'was + article + noun (past)', type:'translation' },
  { id:'d33-007', hindi:'बच्चे ने ज़ोर से रोया।', english:'The child cried loudly.', alternatives:['the child wept loudly.'], hint:'cried (past of cry)', type:'translation' },
  { id:'d33-008', hindi:'मैंने पाँच साल पहले नौकरी शुरू की।', english:'I started working five years ago.', alternatives:['i began my job five years ago.'], hint:'started + verb+ing + ago', type:'translation' },
  { id:'d33-009', hindi:'उसने मुझसे माफ़ी माँगी।', english:'She apologized to me.', alternatives:['she said sorry to me.'], hint:'apologized = asked for forgiveness', type:'translation' },
  { id:'d33-010', hindi:'हमने मिलकर खाना बनाया।', english:'We cooked food together.', alternatives:['we made food together.'], hint:'cooked + noun + together', type:'translation' },
  // Past Continuous
  { id:'d33-011', hindi:'जब मैं पढ़ रहा था, बिजली चली गई।', english:'While I was studying, the electricity went off.', alternatives:['when i was reading, the power went out.'], hint:'was + verb+ing (when something happened)', type:'translation' },
  { id:'d33-012', hindi:'वह रात को 12 बजे तक काम कर रही थी।', english:'She was working until midnight.', alternatives:['she was working till 12 at night.'], hint:'was + verb+ing + until + time', type:'translation' },
  { id:'d33-013', hindi:'बच्चे सुबह से खेल रहे थे।', english:'The children were playing since morning.', alternatives:['the kids were playing from morning.'], hint:'were + verb+ing + since/from + time', type:'translation' },
  { id:'d33-014', hindi:'क्या तुम कल उस वक्त सो रहे थे?', english:'Were you sleeping at that time yesterday?', alternatives:['were you asleep at that time?'], hint:'Were you + verb+ing + at that time ?', type:'translation' },
  { id:'d33-015', hindi:'वे सब एक साथ गाना गा रहे थे।', english:'They were all singing together.', alternatives:['they were singing a song together.'], hint:'were + verb+ing + together', type:'translation' },
  { id:'d33-016', hindi:'मैं घर जा रहा था जब उसने मुझे रोका।', english:'I was going home when she stopped me.', alternatives:['i was heading home when she stopped me.'], hint:'was + verb+ing + when + Simple Past', type:'translation' },
  { id:'d33-017', hindi:'वह खिड़की से बाहर देख रहा था।', english:'He was looking outside the window.', alternatives:['he was staring out of the window.'], hint:'was + verb+ing + preposition', type:'translation' },
  { id:'d33-018', hindi:'बारिश हो रही थी इसलिए हम नहीं गए।', english:'It was raining so we did not go.', alternatives:["it was raining so we didn't go."], hint:'was raining = Past Continuous', type:'translation' },
  { id:'d33-019', hindi:'जब मैं खाना बना रहा था, वह आई।', english:'She came while I was cooking food.', alternatives:['she arrived while i was making food.'], hint:'came while + was + verb+ing', type:'translation' },
  { id:'d33-020', hindi:'वे लोग घंटों बातें कर रहे थे।', english:'They were talking for hours.', alternatives:['they were chatting for hours.'], hint:'were + verb+ing + for + time', type:'translation' },
  // Past Perfect
  { id:'d33-021', hindi:'जब पुलिस आई, चोर जा चुका था।', english:'By the time the police arrived, the thief had already left.', alternatives:['when police came, thief had escaped.'], hint:'Past Perfect: had + left/gone', type:'translation' },
  { id:'d33-022', hindi:'मैंने उसे पहले कभी नहीं देखा था।', english:'I had never seen him before.', alternatives:['i had not seen him earlier.'], hint:'had never + past participle', type:'translation' },
  { id:'d33-023', hindi:'उसने खाना खाने से पहले हाथ धोए थे।', english:'She had washed her hands before eating.', alternatives:['she had washed hands before having food.'], hint:'had + past participle + before + verb+ing', type:'translation' },
  { id:'d33-024', hindi:'परीक्षा से पहले मैंने पूरा syllabus पढ़ लिया था।', english:'I had completed the entire syllabus before the exam.', alternatives:['i had finished studying before the exam.'], hint:'had + past participle + before', type:'translation' },
  { id:'d33-025', hindi:'वह बात मैं पहले से जानता था।', english:'I had already known that.', alternatives:['i had known that already.'], hint:'had already + past participle', type:'translation' },
  { id:'d33-026', hindi:'जब तक हम पहुँचे, फिल्म शुरू हो चुकी थी।', english:'By the time we arrived, the movie had already started.', alternatives:['when we reached, the film had started.'], hint:'By the time + Simple Past + had + past participle', type:'translation' },
  { id:'d33-027', hindi:'उसने मुझे बताया कि वह पहले वहाँ जा चुका था।', english:'He told me that he had already been there.', alternatives:['he said he had visited there before.'], hint:'told me that + had + past participle', type:'translation' },
  { id:'d33-028', hindi:'डॉक्टर के आने से पहले मरीज़ बेहोश हो गया था।', english:'The patient had fainted before the doctor arrived.', alternatives:['the patient had become unconscious before doctor came.'], hint:'had + past participle + before + Simple Past', type:'translation' },
  { id:'d33-029', hindi:'उसने कभी इतनी मुश्किल परिस्थिति नहीं देखी थी।', english:'He had never faced such a difficult situation before.', alternatives:['he had never seen such difficulty before.'], hint:'had never + past participle', type:'translation' },
  { id:'d33-030', hindi:'जब तक वह जागा, बाकी सब जा चुके थे।', english:'By the time he woke up, everyone else had already left.', alternatives:['when he got up, the others had gone.'], hint:'by the time + Simple Past + had + gone', type:'translation' },
  // More past sentences
  { id:'d33-031', hindi:'मैंने अपनी परीक्षा पास की।', english:'I passed my exam.', alternatives:['i cleared my exam.'], hint:'passed = past tense of pass', type:'translation' },
  { id:'d33-032', hindi:'उसने नया घर खरीदा।', english:'He bought a new house.', alternatives:['he purchased a new home.'], hint:'bought = irregular past of buy', type:'translation' },
  { id:'d33-033', hindi:'हम पिछले महीने मिले थे।', english:'We had met last month.', alternatives:['we met last month.'], hint:'Past Perfect or Simple Past', type:'translation' },
  { id:'d33-034', hindi:'बच्चा रो रहा था और माँ गाना गा रही थी।', english:'The child was crying while the mother was singing.', alternatives:['the baby was crying and mom was singing.'], hint:'was crying / was singing (simultaneous)', type:'translation' },
  { id:'d33-035', hindi:'उसने मुझे एक महँगा तोहफा दिया।', english:'She gave me an expensive gift.', alternatives:['she gifted me an expensive present.'], hint:'gave = irregular past of give', type:'translation' },
  { id:'d33-036', hindi:'मैंने कभी इतना अच्छा खाना नहीं खाया था।', english:'I had never eaten such delicious food before.', alternatives:['i had never tasted such good food.'], hint:'had never + past participle', type:'translation' },
  { id:'d33-037', hindi:'जब फोन बजा, मैं शॉवर ले रहा था।', english:'When the phone rang, I was taking a shower.', alternatives:['when the phone rang, i was in the shower.'], hint:'rang = irregular past / was + verb+ing', type:'translation' },
  { id:'d33-038', hindi:'पिछले साल उसकी तनख्वाह बढ़ी।', english:'His salary increased last year.', alternatives:['his salary was raised last year.'], hint:'increased = past tense', type:'translation' },
  { id:'d33-039', hindi:'वे पाँच घंटे से गाड़ी चला रहे थे।', english:'They had been driving for five hours.', alternatives:['they were driving for five hours.'], hint:'had been + verb+ing + for + time', type:'translation' },
  { id:'d33-040', hindi:'उसने मुझे अपना राज़ बताया।', english:'She told me her secret.', alternatives:['she shared her secret with me.'], hint:'told = irregular past of tell', type:'translation' },
];

// ============================================================
// Day 34 — Tenses Part 3 (Simple Future, Future Continuous, Future Perfect)
// ============================================================
const DAY_34 = [
  // Simple Future (will)
  { id:'d34-001', hindi:'मैं कल सुबह जल्दी उठूँगा।', english:'I will wake up early tomorrow morning.', alternatives:['i will get up early tomorrow.'], hint:'will + base verb + tomorrow', type:'translation' },
  { id:'d34-002', hindi:'वह इस हफ्ते दिल्ली जाएगी।', english:'She will go to Delhi this week.', alternatives:['she will travel to delhi this week.'], hint:'will + go + time', type:'translation' },
  { id:'d34-003', hindi:'हम मिलकर यह काम करेंगे।', english:'We will do this work together.', alternatives:['we will complete this together.'], hint:'will + base verb + together', type:'translation' },
  { id:'d34-004', hindi:'क्या तुम मेरी मदद करोगे?', english:'Will you help me?', alternatives:['would you help me?'], hint:'Will you + base verb ?', type:'translation' },
  { id:'d34-005', hindi:'वह कभी नहीं झूठ बोलेगा।', english:'He will never lie.', alternatives:['he will not lie ever.'], hint:'will never + base verb', type:'translation' },
  { id:'d34-006', hindi:'अगले साल मैं इंजीनियर बन जाऊँगा।', english:'I will become an engineer next year.', alternatives:['i will be an engineer next year.'], hint:'will + become + noun + next year', type:'translation' },
  { id:'d34-007', hindi:'बारिश होगी इसलिए छाता लेकर जाओ।', english:'It will rain so take an umbrella.', alternatives:['it is going to rain, take an umbrella.'], hint:'will rain = future prediction', type:'translation' },
  { id:'d34-008', hindi:'मैं तुम्हें बाद में बताऊँगा।', english:'I will tell you later.', alternatives:['i will let you know later.'], hint:'will + tell + you + later', type:'translation' },
  { id:'d34-009', hindi:'क्या वह इस काम को पूरा करेगा?', english:'Will he complete this work?', alternatives:['will he finish this task?'], hint:'Will + subject + base verb + ?', type:'translation' },
  { id:'d34-010', hindi:'हम कभी नहीं हारेंगे।', english:'We will never lose.', alternatives:['we will never give up.'], hint:'will never + base verb', type:'translation' },
  // Going to (planned future)
  { id:'d34-011', hindi:'मैं इस साल नई गाड़ी खरीदने वाला हूँ।', english:'I am going to buy a new car this year.', alternatives:['i am planning to buy a new car.'], hint:'going to + base verb (planned)', type:'translation' },
  { id:'d34-012', hindi:'वह अगले महीने शादी करने वाली है।', english:'She is going to get married next month.', alternatives:['she is getting married next month.'], hint:'going to + get married', type:'translation' },
  { id:'d34-013', hindi:'देखो बादल आ रहे हैं, बारिश होने वाली है।', english:'Look at the clouds, it is going to rain.', alternatives:['it is about to rain, see the clouds.'], hint:'going to + rain (evidence based)', type:'translation' },
  { id:'d34-014', hindi:'हम अगले हफ्ते एक नया प्रोजेक्ट शुरू करने वाले हैं।', english:'We are going to start a new project next week.', alternatives:['we are planning to launch a new project.'], hint:'are going to + start + noun', type:'translation' },
  // Future Continuous
  { id:'d34-015', hindi:'कल इस वक्त मैं ट्रेन में होऊँगा।', english:'I will be travelling on the train at this time tomorrow.', alternatives:['this time tomorrow i will be in the train.'], hint:'will be + verb+ing (future at specific time)', type:'translation' },
  { id:'d34-016', hindi:'अगले हफ्ते वह इस प्रोजेक्ट पर काम कर रही होगी।', english:'She will be working on this project next week.', alternatives:['she will be doing this project next week.'], hint:'will be + verb+ing + next week', type:'translation' },
  { id:'d34-017', hindi:'कल सुबह 10 बजे हम मीटिंग में होंगे।', english:'We will be attending the meeting at 10 AM tomorrow.', alternatives:['we will be in a meeting at 10 am tomorrow.'], hint:'will be + verb+ing + time', type:'translation' },
  { id:'d34-018', hindi:'जब तुम आओगे, मैं पढ़ रहा होऊँगा।', english:'When you come, I will be studying.', alternatives:['i will be studying when you arrive.'], hint:'when you come + will be + verb+ing', type:'translation' },
  { id:'d34-019', hindi:'क्या वह कल इस वक्त सो रहा होगा?', english:'Will he be sleeping at this time tomorrow?', alternatives:['will he be asleep this time tomorrow?'], hint:'Will + subject + be + verb+ing ?', type:'translation' },
  // Future Perfect
  { id:'d34-020', hindi:'अगले महीने तक मैं यह कोर्स पूरा कर चुका होऊँगा।', english:'By next month, I will have completed this course.', alternatives:['i will have finished this course by next month.'], hint:'will have + past participle + by + time', type:'translation' },
  { id:'d34-021', hindi:'शाम तक वह काम खत्म कर चुकी होगी।', english:'By evening, she will have finished the work.', alternatives:['she will have completed work by evening.'], hint:'will have + past participle + by evening', type:'translation' },
  { id:'d34-022', hindi:'2025 तक हम 10 साल की शादी पूरी कर चुके होंगे।', english:'By 2025, we will have completed 10 years of marriage.', alternatives:['we will have been married for 10 years by 2025.'], hint:'will have + past participle + by + year', type:'translation' },
  { id:'d34-023', hindi:'जब तक तुम आओगे, खाना बन चुका होगा।', english:'By the time you arrive, food will have been cooked.', alternatives:['the food will have been ready by the time you come.'], hint:'will have + past participle + by the time', type:'translation' },
  { id:'d34-024', hindi:'अगले साल तक वह डॉक्टर बन चुका होगा।', english:'By next year, he will have become a doctor.', alternatives:['he will have qualified as a doctor by next year.'], hint:'will have + become + noun + by next year', type:'translation' },
  // Mixed future sentences
  { id:'d34-025', hindi:'मैं तुम्हें कल फोन करूँगा।', english:'I will call you tomorrow.', alternatives:['i will give you a call tomorrow.'], hint:'will + call + tomorrow', type:'translation' },
  { id:'d34-026', hindi:'वह जल्द ही वापस आएगा।', english:'He will come back soon.', alternatives:['he will return soon.'], hint:'will + come back + soon', type:'translation' },
  { id:'d34-027', hindi:'अगर मेहनत करोगे, सफल ज़रूर होंगे।', english:'If you work hard, you will definitely succeed.', alternatives:['if you put in effort, you will succeed.'], hint:'If + Simple Present + will + base verb', type:'translation' },
  { id:'d34-028', hindi:'वह इस साल अमेरिका जाने वाला है।', english:'He is going to go to America this year.', alternatives:['he is planning to go to america this year.'], hint:'is going to + base verb + this year', type:'translation' },
  { id:'d34-029', hindi:'हम शाम को पार्टी में होंगे।', english:'We will be at the party in the evening.', alternatives:['we will attend the party in the evening.'], hint:'will be + at + place + time', type:'translation' },
  { id:'d34-030', hindi:'क्या तुम कल ऑफिस आओगे?', english:'Will you come to the office tomorrow?', alternatives:['are you coming to office tomorrow?'], hint:'Will you + come + tomorrow ?', type:'translation' },
  { id:'d34-031', hindi:'मुझे पता था कि वह यहाँ नहीं होगा।', english:'I knew he would not be here.', alternatives:['i knew he would not come.'], hint:'knew + would not + base verb', type:'translation' },
  { id:'d34-032', hindi:'वह इस काम में सफल होगी।', english:'She will succeed in this work.', alternatives:['she will be successful in this.'], hint:'will + succeed in + noun', type:'translation' },
  { id:'d34-033', hindi:'हम इस साल नई ऊँचाइयाँ छुएँगे।', english:'We will reach new heights this year.', alternatives:['we will achieve new milestones this year.'], hint:'will + reach + noun + this year', type:'translation' },
  { id:'d34-034', hindi:'उसके जन्मदिन पर हम उसे सरप्राइज़ देंगे।', english:'We will give him a surprise on his birthday.', alternatives:['we will surprise him on his birthday.'], hint:'will + give + surprise + on his birthday', type:'translation' },
  { id:'d34-035', hindi:'कल रात तक रिपोर्ट तैयार हो जाएगी।', english:'The report will be ready by tomorrow night.', alternatives:['the report will be done by tomorrow evening.'], hint:'will be + adjective + by + time', type:'translation' },
];

// ============================================================
// Day 35 — Tenses Part 4 (All 12 Tenses Mixed Practice)
// ============================================================
const DAY_35 = [
  { id:'d35-001', hindi:'मैं रोज़ सुबह चाय पीता हूँ। (आदत)', english:'I drink tea every morning. (habit)', alternatives:['i have tea every morning.'], hint:'Simple Present = habit', type:'translation' },
  { id:'d35-002', hindi:'वह अभी किताब पढ़ रही है।', english:'She is reading a book right now.', alternatives:['she is studying a book now.'], hint:'Present Continuous = right now', type:'translation' },
  { id:'d35-003', hindi:'मैं 5 साल से यहाँ रह रहा हूँ।', english:'I have been living here for 5 years.', alternatives:['i have been staying here for 5 years.'], hint:'Present Perfect Continuous = since/for', type:'translation' },
  { id:'d35-004', hindi:'उसने कल एक नई कार खरीदी।', english:'She bought a new car yesterday.', alternatives:['she purchased a new car yesterday.'], hint:'Simple Past = yesterday', type:'translation' },
  { id:'d35-005', hindi:'वह काम कर रहा था जब मैं पहुँचा।', english:'He was working when I arrived.', alternatives:['he was doing work when i reached.'], hint:'Past Continuous + Simple Past', type:'translation' },
  { id:'d35-006', hindi:'ट्रेन जाने से पहले मैं स्टेशन पहुँच गया था।', english:'I had reached the station before the train left.', alternatives:['i had arrived before the train departed.'], hint:'Past Perfect = before Simple Past', type:'translation' },
  { id:'d35-007', hindi:'हम दो घंटे से इंतज़ार कर रहे थे।', english:'We had been waiting for two hours.', alternatives:['we were waiting for two hours.'], hint:'Past Perfect Continuous = for + time', type:'translation' },
  { id:'d35-008', hindi:'मैं कल दिल्ली जाऊँगा।', english:'I will go to Delhi tomorrow.', alternatives:['i am going to delhi tomorrow.'], hint:'Simple Future = will + base verb', type:'translation' },
  { id:'d35-009', hindi:'कल इस वक्त वह सो रही होगी।', english:'She will be sleeping at this time tomorrow.', alternatives:['she will be asleep this time tomorrow.'], hint:'Future Continuous = will be + verb+ing', type:'translation' },
  { id:'d35-010', hindi:'शाम तक काम खत्म हो जाएगा।', english:'The work will have been finished by evening.', alternatives:['the work will be done by evening.'], hint:'Future Perfect = will have + past participle', type:'translation' },
  { id:'d35-011', hindi:'मैं तीन घंटे से पढ़ रहा हूँ।', english:'I have been studying for three hours.', alternatives:['i have been reading for three hours.'], hint:'Present Perfect Continuous = for + time', type:'translation' },
  { id:'d35-012', hindi:'वह सुबह से कुछ नहीं खाया।', english:'She has not eaten anything since morning.', alternatives:["she hasn't eaten since morning."], hint:'Present Perfect = since + time point', type:'translation' },
  { id:'d35-013', hindi:'हम अगले महीने तक प्रोजेक्ट पूरा कर चुके होंगे।', english:'We will have completed the project by next month.', alternatives:['we will have finished the project next month.'], hint:'Future Perfect = will have + past participle', type:'translation' },
  { id:'d35-014', hindi:'मुझे नहीं पता था कि वह वहाँ था।', english:'I did not know that he was there.', alternatives:["i didn't know he was there."], hint:'did not know + was (Simple Past)', type:'translation' },
  { id:'d35-015', hindi:'जब से मैं यहाँ आया हूँ, बहुत कुछ सीखा है।', english:'I have learned a lot since I came here.', alternatives:['i have learnt so much since i arrived.'], hint:'have + learned + since + Simple Past', type:'translation' },
  { id:'d35-016', hindi:'वह कल से बीमार है।', english:'He has been sick since yesterday.', alternatives:['he has been unwell since yesterday.'], hint:'has been + adjective + since', type:'translation' },
  { id:'d35-017', hindi:'मैंने कभी झूठ नहीं बोला।', english:'I have never told a lie.', alternatives:['i have never lied.'], hint:'have never + past participle', type:'translation' },
  { id:'d35-018', hindi:'तुम जब तक वापस आओगे, मैं खाना बना चुका होऊँगा।', english:'By the time you return, I will have cooked food.', alternatives:['i will have prepared food by the time you come back.'], hint:'will have + cooked + by the time', type:'translation' },
  { id:'d35-019', hindi:'वह 2018 से इस कंपनी में काम कर रही है।', english:'She has been working in this company since 2018.', alternatives:['she has been employed here since 2018.'], hint:'has been + verb+ing + since + year', type:'translation' },
  { id:'d35-020', hindi:'जब बारिश होगी, हम घर के अंदर होंगे।', english:'When it rains, we will be inside the house.', alternatives:['when it rains, we will stay indoors.'], hint:'When + Simple Present + will + base verb', type:'translation' },
  { id:'d35-021', hindi:'वह पिछले 3 सालों से डाइट पर है।', english:'She has been on a diet for the past 3 years.', alternatives:['she has been dieting for 3 years.'], hint:'has been + noun/adjective + for + time', type:'translation' },
  { id:'d35-022', hindi:'बच्चे घंटों से खेल रहे हैं।', english:'The children have been playing for hours.', alternatives:['the kids have been playing for many hours.'], hint:'have been + verb+ing + for + time', type:'translation' },
  { id:'d35-023', hindi:'क्या तुम कभी कश्मीर गए हो?', english:'Have you ever been to Kashmir?', alternatives:['have you ever visited kashmir?'], hint:'Have you ever + past participle ?', type:'translation' },
  { id:'d35-024', hindi:'कल सुबह 8 बजे मैं जिम में होऊँगा।', english:'I will be at the gym at 8 AM tomorrow morning.', alternatives:['i will be working out at 8 tomorrow.'], hint:'will be + at + place + time', type:'translation' },
  { id:'d35-025', hindi:'उसने कभी नहीं सोचा था कि यह होगा।', english:'He had never thought that this would happen.', alternatives:['he had never imagined this would occur.'], hint:'had never + thought + would happen', type:'translation' },
  { id:'d35-026', hindi:'वह दो घंटे से बात कर रही है।', english:'She has been talking for two hours.', alternatives:['she has been speaking for 2 hours.'], hint:'has been + verb+ing + for + time', type:'translation' },
  { id:'d35-027', hindi:'मुझे नहीं पता कि वह कब आएगा।', english:'I do not know when he will come.', alternatives:["i don't know when he will arrive."], hint:'do not know + when + will + base verb', type:'translation' },
  { id:'d35-028', hindi:'हम पाँच साल से एक साथ काम कर रहे हैं।', english:'We have been working together for five years.', alternatives:['we have been teammates for 5 years.'], hint:'have been + verb+ing + for + time', type:'translation' },
  { id:'d35-029', hindi:'अगर तुम कल आओगे, हम मिलकर खाना खाएँगे।', english:'If you come tomorrow, we will eat together.', alternatives:['if you visit tomorrow, we will have food together.'], hint:'If + Simple Present + will + base verb', type:'translation' },
  { id:'d35-030', hindi:'जब मैं छोटा था, मैं पतंग उड़ाता था।', english:'When I was young, I used to fly kites.', alternatives:['when i was a child, i would fly kites.'], hint:'used to + base verb (past habit)', type:'translation' },
];

// ============================================================
// Day 36 — Prepositions Part 1 (in, on, at, to, for, of, by)
// ============================================================
const DAY_36 = [
  // IN
  { id:'d36-001', hindi:'मैं दिल्ली में रहता हूँ।', english:'I live in Delhi.', alternatives:['i stay in delhi.'], hint:'in + city/country/room', type:'translation' },
  { id:'d36-002', hindi:'वह कमरे में है।', english:'She is in the room.', alternatives:['she is inside the room.'], hint:'in = enclosed space', type:'translation' },
  { id:'d36-003', hindi:'किताब बैग में है।', english:'The book is in the bag.', alternatives:['the book is inside the bag.'], hint:'in + container', type:'translation' },
  { id:'d36-004', hindi:'वह सुबह में व्यायाम करता है।', english:'He exercises in the morning.', alternatives:['he works out in the morning.'], hint:'in the morning/evening/afternoon', type:'translation' },
  { id:'d36-005', hindi:'मैं 2005 में पैदा हुआ।', english:'I was born in 2005.', alternatives:['i was born in the year 2005.'], hint:'in + year/month', type:'translation' },
  { id:'d36-006', hindi:'वह जनवरी में वापस आएगी।', english:'She will return in January.', alternatives:['she will come back in january.'], hint:'in + month', type:'translation' },
  // ON
  { id:'d36-007', hindi:'किताब मेज़ पर है।', english:'The book is on the table.', alternatives:['the book is on top of the table.'], hint:'on + surface', type:'translation' },
  { id:'d36-008', hindi:'वह सोमवार को काम करता है।', english:'He works on Monday.', alternatives:['he goes to work on monday.'], hint:'on + day of week', type:'translation' },
  { id:'d36-009', hindi:'मेरा जन्मदिन 15 अगस्त को है।', english:'My birthday is on 15th August.', alternatives:['my birthday falls on august 15.'], hint:'on + specific date', type:'translation' },
  { id:'d36-010', hindi:'वह फ़र्श पर बैठी है।', english:'She is sitting on the floor.', alternatives:['she is seated on the floor.'], hint:'on + flat surface', type:'translation' },
  { id:'d36-011', hindi:'तुम्हारा नाम लिस्ट में है।', english:'Your name is on the list.', alternatives:['your name is listed.'], hint:'on the list/on the team', type:'translation' },
  // AT
  { id:'d36-012', hindi:'वह 8 बजे ऑफिस आता है।', english:'He comes to the office at 8 o\'clock.', alternatives:['he arrives at office at 8.'], hint:'at + specific time', type:'translation' },
  { id:'d36-013', hindi:'मैं घर पर हूँ।', english:'I am at home.', alternatives:['i am home.'], hint:'at home/at work/at school', type:'translation' },
  { id:'d36-014', hindi:'वह स्टेशन पर खड़ी है।', english:'She is standing at the station.', alternatives:['she is at the train station.'], hint:'at + specific place/point', type:'translation' },
  { id:'d36-015', hindi:'रात में वह देर से सोती है।', english:'She sleeps late at night.', alternatives:['she goes to bed late at night.'], hint:'at night/at noon/at midnight', type:'translation' },
  // TO
  { id:'d36-016', hindi:'मैं हर रोज़ स्कूल जाता हूँ।', english:'I go to school every day.', alternatives:['i attend school daily.'], hint:'go to + place', type:'translation' },
  { id:'d36-017', hindi:'कृपया मुझे स्टेशन तक छोड़ दो।', english:'Please drop me to the station.', alternatives:['please take me to the station.'], hint:'drop/take + me + to + place', type:'translation' },
  { id:'d36-018', hindi:'मैं दिल्ली से मुंबई गया।', english:'I went from Delhi to Mumbai.', alternatives:['i traveled from delhi to mumbai.'], hint:'from + place + to + place', type:'translation' },
  // FOR
  { id:'d36-019', hindi:'मैं दो घंटे से पढ़ रहा हूँ।', english:'I have been studying for two hours.', alternatives:['i have been reading for 2 hours.'], hint:'for + duration of time', type:'translation' },
  { id:'d36-020', hindi:'यह तोहफा तुम्हारे लिए है।', english:'This gift is for you.', alternatives:['this present is for you.'], hint:'for + recipient', type:'translation' },
  { id:'d36-021', hindi:'मैं इस काम के लिए बिल्कुल तैयार हूँ।', english:'I am completely ready for this work.', alternatives:['i am fully prepared for this job.'], hint:'ready for + noun', type:'translation' },
  // OF
  { id:'d36-022', hindi:'यह मेरी किताब का एक पन्ना है।', english:'This is a page of my book.', alternatives:['this is one page of my book.'], hint:'of = belonging/part of', type:'translation' },
  { id:'d36-023', hindi:'वह टीम का कप्तान है।', english:'He is the captain of the team.', alternatives:['he is the team captain.'], hint:'captain of + the + noun', type:'translation' },
  { id:'d36-024', hindi:'मुझे उस पर बहुत गर्व है।', english:'I am very proud of him.', alternatives:['i feel very proud of him.'], hint:'proud of + noun/pronoun', type:'translation' },
  // BY
  { id:'d36-025', hindi:'वह ट्रेन से दिल्ली जाएगी।', english:'She will go to Delhi by train.', alternatives:['she will travel to delhi by train.'], hint:'by + mode of transport', type:'translation' },
  { id:'d36-026', hindi:'यह पेंटिंग पिकासो ने बनाई थी।', english:'This painting was made by Picasso.', alternatives:['this painting was created by picasso.'], hint:'made/created by + person', type:'translation' },
  { id:'d36-027', hindi:'शाम तक रिपोर्ट जमा करो।', english:'Submit the report by evening.', alternatives:['hand in the report by evening.'], hint:'by + time = deadline', type:'translation' },
  { id:'d36-028', hindi:'वह नदी के किनारे बैठी थी।', english:'She was sitting by the river.', alternatives:['she sat beside the river.'], hint:'by = beside/next to', type:'translation' },
  // Mixed prepositions
  { id:'d36-029', hindi:'वह सुबह 8 बजे स्कूल में आती है।', english:'She comes to school at 8 AM in the morning.', alternatives:['she arrives at school at 8 in the morning.'], hint:'at + time + in + morning', type:'translation' },
  { id:'d36-030', hindi:'हम रविवार को पार्क में जाते हैं।', english:'We go to the park on Sunday.', alternatives:['we visit the park on sundays.'], hint:'on + day + to + place', type:'translation' },
  { id:'d36-031', hindi:'यह किताब बच्चों के लिए लिखी गई है।', english:'This book has been written for children.', alternatives:['this book was written for kids.'], hint:'written for + audience', type:'translation' },
  { id:'d36-032', hindi:'वह मई के महीने में भारत आएगा।', english:'He will come to India in the month of May.', alternatives:['he will arrive in india in may.'], hint:'in + month + to + country', type:'translation' },
  { id:'d36-033', hindi:'मेरे पास बैठो।', english:'Sit beside me.', alternatives:['sit next to me.','sit by me.'], hint:'beside/next to/by = पास', type:'translation' },
  { id:'d36-034', hindi:'वह सात बजे तक घर पहुँच जाएगी।', english:'She will reach home by seven o\'clock.', alternatives:['she will be home by 7.'], hint:'by + time = deadline', type:'translation' },
  { id:'d36-035', hindi:'यह ऑफिस शहर के बीचो-बीच है।', english:'This office is in the centre of the city.', alternatives:['this office is in the heart of the city.'], hint:'in the centre of + place', type:'translation' },
];

// ============================================================
// Day 37 — Prepositions Part 2 (into, onto, with, from, about, between, among, through, during, over, under, across, behind, above, below, beside, along, against)
// ============================================================
const DAY_37 = [
  // INTO / ONTO
  { id:'d37-001', hindi:'वह कमरे में अंदर आया।', english:'He came into the room.', alternatives:['he entered into the room.'], hint:'into = movement to inside', type:'translation' },
  { id:'d37-002', hindi:'बच्चा पूल में कूदा।', english:'The child jumped into the pool.', alternatives:['the kid jumped into the swimming pool.'], hint:'jumped into = movement into water', type:'translation' },
  { id:'d37-003', hindi:'उसने किताब मेज़ पर रख दी।', english:'She put the book onto the table.', alternatives:['she placed the book on the table.'], hint:'onto = movement onto a surface', type:'translation' },
  // WITH
  { id:'d37-004', hindi:'मैं अपने परिवार के साथ रहता हूँ।', english:'I live with my family.', alternatives:['i stay with my family.'], hint:'with = साथ में', type:'translation' },
  { id:'d37-005', hindi:'क्या तुम मेरे साथ आओगे?', english:'Will you come with me?', alternatives:['are you coming with me?'], hint:'come with + me/us', type:'translation' },
  { id:'d37-006', hindi:'वह चाकू से सेब काटती है।', english:'She cuts the apple with a knife.', alternatives:['she slices apple with a knife.'], hint:'with + tool/instrument', type:'translation' },
  { id:'d37-007', hindi:'मुझे तुमसे बात करनी है।', english:'I need to talk with you.', alternatives:['i need to speak with you.'], hint:'talk/speak with + person', type:'translation' },
  // FROM
  { id:'d37-008', hindi:'मैं लखनऊ से हूँ।', english:'I am from Lucknow.', alternatives:['i belong to lucknow.'], hint:'from = origin place', type:'translation' },
  { id:'d37-009', hindi:'दिल्ली से मुंबई 1400 किलोमीटर है।', english:'Delhi is 1400 kilometres from Mumbai.', alternatives:['it is 1400 km from delhi to mumbai.'], hint:'distance + from + place', type:'translation' },
  { id:'d37-010', hindi:'उसे बचपन से किताबें पढ़ने का शौक है।', english:'She has been fond of reading books from childhood.', alternatives:['she loves reading since childhood.'], hint:'from + time period', type:'translation' },
  // ABOUT
  { id:'d37-011', hindi:'मुझे इस विषय के बारे में ज़्यादा जानकारी नहीं है।', english:'I do not know much about this subject.', alternatives:["i don't know much about this topic."], hint:'know about + topic', type:'translation' },
  { id:'d37-012', hindi:'वे बैठक के बारे में बात कर रहे थे।', english:'They were talking about the meeting.', alternatives:['they were discussing about the meeting.'], hint:'talk about + noun', type:'translation' },
  { id:'d37-013', hindi:'मुझे उसके बारे में कुछ पता नहीं।', english:'I do not know anything about him.', alternatives:["i don't know anything about him."], hint:'know about + pronoun', type:'translation' },
  // BETWEEN / AMONG
  { id:'d37-014', hindi:'बैंक और स्कूल के बीच एक पार्क है।', english:'There is a park between the bank and the school.', alternatives:['a park is located between bank and school.'], hint:'between + two specific things', type:'translation' },
  { id:'d37-015', hindi:'मेरा घर दो बड़ी इमारतों के बीच है।', english:'My house is between two big buildings.', alternatives:['my home is between two large buildings.'], hint:'between + two things', type:'translation' },
  { id:'d37-016', hindi:'दोनों भाइयों के बीच कोई लड़ाई नहीं है।', english:'There is no fight between the two brothers.', alternatives:['the two brothers do not fight.'], hint:'between + two people', type:'translation' },
  { id:'d37-017', hindi:'वह अपने दोस्तों के बीच बहुत लोकप्रिय है।', english:'She is very popular among her friends.', alternatives:['she is popular in her friend group.'], hint:'among = among a group', type:'translation' },
  { id:'d37-018', hindi:'उसने अपनी बात सबके बीच रखी।', english:'He put his point among everyone.', alternatives:['he presented his point to everyone.'], hint:'among + all people', type:'translation' },
  // THROUGH
  { id:'d37-019', hindi:'वह जंगल से होकर गया।', english:'He went through the forest.', alternatives:['he passed through the jungle.'], hint:'through = अंदर से होकर', type:'translation' },
  { id:'d37-020', hindi:'बारिश खिड़की से अंदर आ रही थी।', english:'Rain was coming in through the window.', alternatives:['rain entered through the window.'], hint:'through + opening/passage', type:'translation' },
  { id:'d37-021', hindi:'वे सुरंग से गुज़रे।', english:'They passed through the tunnel.', alternatives:['they went through the tunnel.'], hint:'passed through = through से गुज़रना', type:'translation' },
  // DURING
  { id:'d37-022', hindi:'परीक्षा के दौरान मोबाइल बंद रखो।', english:'Keep your mobile off during the exam.', alternatives:['switch off phone during the examination.'], hint:'during + noun = उस समय के दौरान', type:'translation' },
  { id:'d37-023', hindi:'बैठक के दौरान वह चुप रहा।', english:'He stayed quiet during the meeting.', alternatives:['he was silent during the meeting.'], hint:'during + event', type:'translation' },
  { id:'d37-024', hindi:'छुट्टियों के दौरान हम गोवा गए।', english:'We went to Goa during the holidays.', alternatives:['we visited goa during vacation.'], hint:'during the holidays = छुट्टियों में', type:'translation' },
  // OVER / UNDER
  { id:'d37-025', hindi:'पुल नदी के ऊपर है।', english:'The bridge is over the river.', alternatives:['the bridge is above the river.'], hint:'over = ऊपर (covering)', type:'translation' },
  { id:'d37-026', hindi:'बिल्ली मेज़ के नीचे है।', english:'The cat is under the table.', alternatives:['the cat is beneath the table.'], hint:'under = नीचे', type:'translation' },
  { id:'d37-027', hindi:'उड़ान के दौरान हम बादलों के ऊपर थे।', english:'During the flight, we were over the clouds.', alternatives:['we flew over the clouds.'], hint:'over = ऊपर से', type:'translation' },
  // ACROSS / BEHIND / BESIDE
  { id:'d37-028', hindi:'दुकान सड़क के उस पार है।', english:'The shop is across the road.', alternatives:['the store is on the other side of the road.'], hint:'across = उस तरफ', type:'translation' },
  { id:'d37-029', hindi:'पेड़ के पीछे एक छोटा घर है।', english:'There is a small house behind the tree.', alternatives:['a small home is behind the tree.'], hint:'behind = पीछे', type:'translation' },
  { id:'d37-030', hindi:'अस्पताल मेरे घर के बगल में है।', english:'The hospital is beside my house.', alternatives:['the hospital is next to my home.'], hint:'beside = बगल में', type:'translation' },
  // ALONG / AGAINST
  { id:'d37-031', hindi:'वे नदी के किनारे-किनारे चले।', english:'They walked along the river.', alternatives:['they strolled along the riverside.'], hint:'along = किनारे-किनारे', type:'translation' },
  { id:'d37-032', hindi:'वह दीवार के साथ खड़ा था।', english:'He was standing against the wall.', alternatives:['he leaned against the wall.'], hint:'against = सहारा लेकर / के खिलाफ', type:'translation' },
  { id:'d37-033', hindi:'मत जाओ — यह तुम्हारे हित के खिलाफ है।', english:'Do not go — it is against your interest.', alternatives:["don't go, it's against your interest."], hint:'against = के विरुद्ध', type:'translation' },
  // ABOVE / BELOW
  { id:'d37-034', hindi:'तापमान शून्य से नीचे था।', english:'The temperature was below zero.', alternatives:['the temperature dropped below zero.'], hint:'below = नीचे (level)', type:'translation' },
  { id:'d37-035', hindi:'विमान बादलों के ऊपर उड़ रहा था।', english:'The aeroplane was flying above the clouds.', alternatives:['the plane was above the clouds.'], hint:'above = ऊपर (level)', type:'translation' },
];

// ============================================================
// Day 38 — Has To / Have To (Obligation & Necessity)
// ============================================================
const DAY_38 = [
  { id:'d38-001', hindi:'मुझे रोज़ ऑफिस जाना पड़ता है।', english:'I have to go to the office every day.', alternatives:['i need to go to office daily.'], hint:'have to = necessity', type:'translation' },
  { id:'d38-002', hindi:'उसे दवाई खानी होगी।', english:'She has to take the medicine.', alternatives:['she needs to take medicine.'], hint:'has to = necessity (he/she/it)', type:'translation' },
  { id:'d38-003', hindi:'हमें समय पर काम खत्म करना होगा।', english:'We have to finish the work on time.', alternatives:['we need to complete work on time.'], hint:'have to + base verb', type:'translation' },
  { id:'d38-004', hindi:'क्या तुम्हें आज काम करना है?', english:'Do you have to work today?', alternatives:['do you need to work today?'], hint:'Do you have to + base verb ?', type:'translation' },
  { id:'d38-005', hindi:'उसे कल परीक्षा देनी है।', english:'He has to give an exam tomorrow.', alternatives:['he has to take an exam tomorrow.'], hint:'has to + give/take + exam', type:'translation' },
  { id:'d38-006', hindi:'मुझे खाना बनाना पड़ेगा।', english:'I have to cook food.', alternatives:['i need to make food.'], hint:'have to + cook', type:'translation' },
  { id:'d38-007', hindi:'उन्हें नए नियम मानने होंगे।', english:'They have to follow the new rules.', alternatives:['they need to obey the new rules.'], hint:'have to + follow', type:'translation' },
  { id:'d38-008', hindi:'क्या उसे रोज़ दौड़ना पड़ता है?', english:'Does she have to run every day?', alternatives:['does she need to run daily?'], hint:'Does she have to + base verb ?', type:'translation' },
  { id:'d38-009', hindi:'मुझे नहीं जाना।', english:'I do not have to go.', alternatives:["i don't have to go.",'i need not go.'], hint:'do not have to = no obligation', type:'translation' },
  { id:'d38-010', hindi:'वह यहाँ नहीं रहना चाहता लेकिन उसे रहना पड़ता है।', english:'He does not want to stay here but he has to.', alternatives:["he doesn't want to stay but he has to."], hint:'does not want but has to', type:'translation' },
  { id:'d38-011', hindi:'हमें कड़ी मेहनत करनी है।', english:'We have to work hard.', alternatives:['we need to work hard.'], hint:'have to + work hard', type:'translation' },
  { id:'d38-012', hindi:'उसे रोज़ स्कूल जाना पड़ता है।', english:'She has to go to school every day.', alternatives:['she needs to attend school daily.'], hint:'has to + go + every day', type:'translation' },
  { id:'d38-013', hindi:'मुझे डॉक्टर से मिलना है।', english:'I have to meet the doctor.', alternatives:['i need to see the doctor.'], hint:'have to + meet/see', type:'translation' },
  { id:'d38-014', hindi:'क्या हमें रात को यहाँ रुकना होगा?', english:'Do we have to stay here at night?', alternatives:['do we need to stay overnight?'], hint:'Do we have to + verb ?', type:'translation' },
  { id:'d38-015', hindi:'उसे जल्दी उठना पड़ता है।', english:'He has to wake up early.', alternatives:['he needs to get up early.'], hint:'has to + wake up', type:'translation' },
  { id:'d38-016', hindi:'मुझे यह रिपोर्ट आज जमा करनी है।', english:'I have to submit this report today.', alternatives:['i need to hand in this report today.'], hint:'have to + submit + today', type:'translation' },
  { id:'d38-017', hindi:'उन्हें सच बोलना पड़ेगा।', english:'They have to tell the truth.', alternatives:['they must tell the truth.'], hint:'have to + tell the truth', type:'translation' },
  { id:'d38-018', hindi:'वह बिल्कुल नहीं जाना चाहती थी लेकिन उसे जाना था।', english:'She did not want to go at all but she had to.', alternatives:["she didn't want to go but she had to."], hint:'did not want but had to', type:'translation' },
  { id:'d38-019', hindi:'क्या तुम्हें नई ड्रेस खरीदनी है?', english:'Do you have to buy a new dress?', alternatives:['do you need to buy new clothes?'], hint:'Do you have to + buy ?', type:'translation' },
  { id:'d38-020', hindi:'इस नौकरी में बहुत यात्रा करनी पड़ती है।', english:'In this job, you have to travel a lot.', alternatives:['this job requires a lot of travelling.'], hint:'have to + travel + a lot', type:'translation' },
  { id:'d38-021', hindi:'वह कल ऑपरेशन के लिए जाने वाला है।', english:'He has to go for the operation tomorrow.', alternatives:['he needs to go for surgery tomorrow.'], hint:'has to + go for + noun', type:'translation' },
  { id:'d38-022', hindi:'हमें अपनी गलतियों से सीखना होगा।', english:'We have to learn from our mistakes.', alternatives:['we need to learn from our errors.'], hint:'have to + learn from', type:'translation' },
  { id:'d38-023', hindi:'उसे हर सुबह 5 बजे उठना पड़ता है।', english:'She has to wake up at 5 AM every morning.', alternatives:['she needs to get up at 5 am daily.'], hint:'has to + wake up + time', type:'translation' },
  { id:'d38-024', hindi:'क्या बच्चों को स्कूल में यूनिफॉर्म पहननी पड़ती है?', english:'Do children have to wear uniforms at school?', alternatives:['do kids have to wear school uniform?'], hint:'Do children have to + wear ?', type:'translation' },
  { id:'d38-025', hindi:'मुझे उससे माफ़ी माँगनी होगी।', english:'I have to apologize to him.', alternatives:['i need to say sorry to him.'], hint:'have to + apologize to', type:'translation' },
];

// ============================================================
// Day 39 — Had To / Will Have To (Past & Future Obligation)
// ============================================================
const DAY_39 = [
  // Had to (past obligation)
  { id:'d39-001', hindi:'कल मुझे रात को देर तक काम करना पड़ा।', english:'Yesterday I had to work late at night.', alternatives:['i had to stay up late working yesterday.'], hint:'had to + base verb (past obligation)', type:'translation' },
  { id:'d39-002', hindi:'उसे डॉक्टर के पास जाना पड़ा।', english:'She had to go to the doctor.', alternatives:['she was forced to visit the doctor.'], hint:'had to + go', type:'translation' },
  { id:'d39-003', hindi:'हमें बारिश में बाहर जाना पड़ा।', english:'We had to go out in the rain.', alternatives:['we had to step out in the rain.'], hint:'had to + go out', type:'translation' },
  { id:'d39-004', hindi:'क्या तुम्हें कल उठना पड़ा?', english:'Did you have to wake up yesterday?', alternatives:['did you have to get up early yesterday?'], hint:'Did you have to + base verb ?', type:'translation' },
  { id:'d39-005', hindi:'उसे ऑफिस में देर तक रुकना पड़ा।', english:'He had to stay late in the office.', alternatives:['he had to work overtime.'], hint:'had to + stay late', type:'translation' },
  { id:'d39-006', hindi:'मुझे अपनी पुरानी नौकरी छोड़नी पड़ी।', english:'I had to leave my old job.', alternatives:['i had to quit my previous job.'], hint:'had to + leave + noun', type:'translation' },
  { id:'d39-007', hindi:'उन्हें पूरी रात जागना पड़ा।', english:'They had to stay awake all night.', alternatives:['they had to stay up the whole night.'], hint:'had to + stay awake', type:'translation' },
  { id:'d39-008', hindi:'वह आज काम पर नहीं जा सका।', english:'He did not have to go to work today.', alternatives:["he didn't have to work today."], hint:'did not have to + go', type:'translation' },
  { id:'d39-009', hindi:'परीक्षा में फेल होने के कारण उसे दोबारा पढ़ना पड़ा।', english:'Because of failing the exam, he had to study again.', alternatives:['he had to repeat studying after failing the exam.'], hint:'had to + study + because of', type:'translation' },
  { id:'d39-010', hindi:'मुझे सब कुछ शुरू से शुरू करना पड़ा।', english:'I had to start everything from scratch.', alternatives:['i had to begin all over again.'], hint:'had to + start + from scratch', type:'translation' },
  // Will have to (future obligation)
  { id:'d39-011', hindi:'तुम्हें कल जल्दी आना होगा।', english:'You will have to come early tomorrow.', alternatives:['you will need to arrive early tomorrow.'], hint:'will have to + come + early', type:'translation' },
  { id:'d39-012', hindi:'उसे यह परीक्षा फिर से देनी होगी।', english:'She will have to take this exam again.', alternatives:['she will need to appear in the exam again.'], hint:'will have to + take + exam', type:'translation' },
  { id:'d39-013', hindi:'हमें नए नियमों का पालन करना होगा।', english:'We will have to follow the new rules.', alternatives:['we will need to obey new regulations.'], hint:'will have to + follow + rules', type:'translation' },
  { id:'d39-014', hindi:'क्या मुझे ज़्यादा मेहनत करनी होगी?', english:'Will I have to work harder?', alternatives:['will i need to put in more effort?'], hint:'Will I have to + verb ?', type:'translation' },
  { id:'d39-015', hindi:'उसे नया घर खरीदना होगा।', english:'He will have to buy a new house.', alternatives:['he will need to purchase a new home.'], hint:'will have to + buy', type:'translation' },
  { id:'d39-016', hindi:'अगर वह पास नहीं हुआ तो उसे दोबारा पढ़ना होगा।', english:'If he does not pass, he will have to study again.', alternatives:['if he fails, he will have to repeat.'], hint:'if + Simple Present + will have to', type:'translation' },
  { id:'d39-017', hindi:'नई पॉलिसी के तहत सबको रजिस्टर करना होगा।', english:'Under the new policy, everyone will have to register.', alternatives:['all will have to register under the new policy.'], hint:'will have to + register', type:'translation' },
  { id:'d39-018', hindi:'भविष्य में हमें और तकनीक सीखनी होगी।', english:'In the future, we will have to learn more technology.', alternatives:['we will have to learn new technology in future.'], hint:'will have to + learn + future', type:'translation' },
  { id:'d39-019', hindi:'अगर पैसे नहीं बचाए तो बाद में दिक्कत होगी।', english:'If you do not save money, you will have to face problems later.', alternatives:['not saving money will create problems later.'], hint:'will have to + face + problems', type:'translation' },
  { id:'d39-020', hindi:'क्या हमें शहर से बाहर जाना होगा?', english:'Will we have to go outside the city?', alternatives:['will we need to leave the city?'], hint:'Will we have to + go ?', type:'translation' },
  // Mixed
  { id:'d39-021', hindi:'मुझे कल अस्पताल जाना होगा।', english:'I will have to go to the hospital tomorrow.', alternatives:['i need to visit hospital tomorrow.'], hint:'will have to + go + tomorrow', type:'translation' },
  { id:'d39-022', hindi:'पिछले हफ्ते हमें ट्रेन से जाना पड़ा।', english:'Last week we had to go by train.', alternatives:['we had to travel by train last week.'], hint:'had to + go by + transport', type:'translation' },
  { id:'d39-023', hindi:'उसे माफ़ी माँगनी पड़ी।', english:'She had to apologize.', alternatives:['she was forced to say sorry.'], hint:'had to + apologize', type:'translation' },
  { id:'d39-024', hindi:'अगले साल मुझे विदेश जाना होगा।', english:'Next year I will have to go abroad.', alternatives:['i will have to travel overseas next year.'], hint:'will have to + go abroad', type:'translation' },
  { id:'d39-025', hindi:'हमें यह फ़ैसला जल्दी करना होगा।', english:'We will have to make this decision quickly.', alternatives:['we will have to decide fast.'], hint:'will have to + decide/make decision', type:'translation' },
];

// ============================================================
// Day 40 — Make / Get (Causative Verbs)
// ============================================================
const DAY_40 = [
  // MAKE someone do something
  { id:'d40-001', hindi:'उसने मुझे रोने पर मजबूर किया।', english:'He made me cry.', alternatives:['he caused me to cry.'], hint:'made + object + base verb', type:'translation' },
  { id:'d40-002', hindi:'माँ ने मुझे सब्ज़ियाँ खाने पर मजबूर किया।', english:'Mother made me eat vegetables.', alternatives:['mom made me have vegetables.'], hint:'made + me + eat', type:'translation' },
  { id:'d40-003', hindi:'उस फिल्म ने मुझे हँसाया।', english:'That movie made me laugh.', alternatives:['the film made me burst out laughing.'], hint:'made + me + laugh', type:'translation' },
  { id:'d40-004', hindi:'टीचर ने सबको कक्षा के बाद रुकाया।', english:'The teacher made everyone stay after class.', alternatives:['the teacher made students stay back.'], hint:'made + everyone + base verb', type:'translation' },
  { id:'d40-005', hindi:'इस खबर ने मुझे खुश कर दिया।', english:'This news made me happy.', alternatives:['the news made me feel happy.'], hint:'made + me + adjective', type:'translation' },
  { id:'d40-006', hindi:'वह मुझे गुस्सा कर देती है।', english:'She makes me angry.', alternatives:['she makes me feel angry.'], hint:'makes + me + adjective', type:'translation' },
  { id:'d40-007', hindi:'उसने मुझे इंतज़ार करवाया।', english:'He made me wait.', alternatives:['he kept me waiting.'], hint:'made + me + wait', type:'translation' },
  { id:'d40-008', hindi:'किताब ने मुझे बहुत सोचने पर मजबूर किया।', english:'The book made me think a lot.', alternatives:['that book made me reflect deeply.'], hint:'made + me + think', type:'translation' },
  // GET someone to do something
  { id:'d40-009', hindi:'मैंने उससे रिपोर्ट ठीक करवाई।', english:'I got him to fix the report.', alternatives:['i had him correct the report.'], hint:'got + object + to + base verb', type:'translation' },
  { id:'d40-010', hindi:'वह उसे समझाने में सफल रही।', english:'She got him to understand.', alternatives:['she managed to get him to understand.'], hint:'got + him + to + understand', type:'translation' },
  { id:'d40-011', hindi:'मुझे गाड़ी ठीक करवानी है।', english:'I need to get my car repaired.', alternatives:['i want to get the car fixed.'], hint:'get + noun + past participle', type:'translation' },
  { id:'d40-012', hindi:'उसने बाल कटवाए।', english:'He got his hair cut.', alternatives:['he had his hair cut.'], hint:'got + noun + past participle', type:'translation' },
  { id:'d40-013', hindi:'मुझे अपना फोन ठीक करवाना है।', english:'I need to get my phone repaired.', alternatives:['i want to get my phone fixed.'], hint:'get + noun + repaired/fixed', type:'translation' },
  { id:'d40-014', hindi:'उसने घर पेंट करवाया।', english:'She got the house painted.', alternatives:['she had her house painted.'], hint:'got/had + noun + past participle', type:'translation' },
  { id:'d40-015', hindi:'मैंने उसे खाना बनवाया।', english:'I got her to cook food.', alternatives:['i made her cook the food.'], hint:'got + her + to + cook', type:'translation' },
  // Make vs Get comparisons
  { id:'d40-016', hindi:'उसने मुझे यह काम करने पर मजबूर किया।', english:'He made me do this work.', alternatives:['he forced me to do this work.'], hint:'made + me + do (force/cause)', type:'translation' },
  { id:'d40-017', hindi:'मैंने उसे काम करने के लिए मना लिया।', english:'I got him to do the work.', alternatives:['i persuaded him to work.'], hint:'got + him + to + do (persuasion)', type:'translation' },
  { id:'d40-018', hindi:'क्या तुमने अपना होमवर्क करवाया?', english:'Did you get your homework done?', alternatives:['have you got your homework finished?'], hint:'get + noun + done/finished', type:'translation' },
  { id:'d40-019', hindi:'वह हमेशा मुझे मुस्कुराने पर मजबूर करती है।', english:'She always makes me smile.', alternatives:['she always brings a smile to my face.'], hint:'makes + me + smile (always)', type:'translation' },
  { id:'d40-020', hindi:'उसने कपड़े धुलवाए।', english:'She got her clothes washed.', alternatives:['she had her clothes laundered.'], hint:'got + noun + past participle', type:'translation' },
  { id:'d40-021', hindi:'यह गाना मुझे खुश कर देता है।', english:'This song makes me happy.', alternatives:['this song makes me feel good.'], hint:'makes + me + happy/feel', type:'translation' },
  { id:'d40-022', hindi:'मैं उसे यह सच मनवाने में कामयाब हुआ।', english:'I managed to get him to accept the truth.', alternatives:['i got him to believe the truth.'], hint:'got + him + to + accept', type:'translation' },
  { id:'d40-023', hindi:'उसकी बातों ने मुझे सोचने पर मजबूर किया।', english:'His words made me think.', alternatives:['what he said made me think.'], hint:'made + me + think', type:'translation' },
  { id:'d40-024', hindi:'मुझे अपना कमरा साफ़ करवाना है।', english:'I need to get my room cleaned.', alternatives:['i want to get my room tidied up.'], hint:'get + my room + cleaned', type:'translation' },
  { id:'d40-025', hindi:'उसने मुझे यह किताब पढ़ने के लिए मना लिया।', english:'She got me to read this book.', alternatives:['she convinced me to read this book.'], hint:'got + me + to + read', type:'translation' },
];

// ============================================================
// Day 41 — Going To (Planned Future & Predictions based on Evidence)
// ============================================================
const DAY_41 = [
  { id:'d41-001', hindi:'मैं कल नई नौकरी के लिए interview देने वाला हूँ।', english:'I am going to give an interview for a new job tomorrow.', alternatives:['i am going to attend a job interview tomorrow.'], hint:'going to + base verb (plan)', type:'translation' },
  { id:'d41-002', hindi:'वह इस साल घर खरीदने वाली है।', english:'She is going to buy a house this year.', alternatives:['she is planning to buy a home this year.'], hint:'is going to + buy', type:'translation' },
  { id:'d41-003', hindi:'हम अगले हफ्ते छुट्टी पर जाने वाले हैं।', english:'We are going to go on vacation next week.', alternatives:['we are going to take a holiday next week.'], hint:'are going to + go on vacation', type:'translation' },
  { id:'d41-004', hindi:'देखो आसमान — बारिश होने वाली है।', english:'Look at the sky — it is going to rain.', alternatives:['it looks like it is going to rain.'], hint:'going to + rain (evidence based)', type:'translation' },
  { id:'d41-005', hindi:'वह वज़न कम करने वाला है।', english:'He is going to lose weight.', alternatives:['he is planning to lose weight.'], hint:'is going to + lose', type:'translation' },
  { id:'d41-006', hindi:'क्या तुम मुझसे मिलने आने वाले हो?', english:'Are you going to come to meet me?', alternatives:['are you going to visit me?'], hint:'Are you going to + base verb ?', type:'translation' },
  { id:'d41-007', hindi:'वह अगले महीने से योग शुरू करने वाली है।', english:'She is going to start yoga from next month.', alternatives:['she is planning to begin yoga next month.'], hint:'is going to + start + from', type:'translation' },
  { id:'d41-008', hindi:'मैं यह ग़लती दोबारा नहीं करने वाला।', english:'I am not going to make this mistake again.', alternatives:["i am not going to repeat this mistake."], hint:'am not going to + repeat', type:'translation' },
  { id:'d41-009', hindi:'वे एक बड़ी पार्टी करने वाले हैं।', english:'They are going to throw a big party.', alternatives:['they are planning to host a big party.'], hint:'are going to + throw a party', type:'translation' },
  { id:'d41-010', hindi:'क्या तुम्हारी कंपनी नए कर्मचारी रखने वाली है?', english:'Is your company going to hire new employees?', alternatives:['is your company planning to recruit?'], hint:'Is + subject + going to + hire ?', type:'translation' },
  { id:'d41-011', hindi:'मैं आज रात जल्दी सोने वाला हूँ।', english:'I am going to sleep early tonight.', alternatives:['i plan to sleep early today night.'], hint:'am going to + sleep + time', type:'translation' },
  { id:'d41-012', hindi:'वह नई कंपनी में जॉइन करने वाला है।', english:'He is going to join the new company.', alternatives:['he is going to start the new job.'], hint:'is going to + join', type:'translation' },
  { id:'d41-013', hindi:'हम इस प्रोजेक्ट पर मिलकर काम करने वाले हैं।', english:'We are going to work on this project together.', alternatives:['we plan to collaborate on this project.'], hint:'are going to + work together', type:'translation' },
  { id:'d41-014', hindi:'देखो वह कितना थका है — वह गिरने वाला है।', english:'Look how tired he is — he is going to fall.', alternatives:['he looks so tired, he is about to fall.'], hint:'going to + fall (visible evidence)', type:'translation' },
  { id:'d41-015', hindi:'मैं इस साल इंग्लिश सीखने वाला हूँ।', english:'I am going to learn English this year.', alternatives:['i am planning to learn english this year.'], hint:'am going to + learn + this year', type:'translation' },
  { id:'d41-016', hindi:'वे लोग विदेश में बसने वाले हैं।', english:'They are going to settle abroad.', alternatives:['they are planning to move overseas.'], hint:'are going to + settle abroad', type:'translation' },
  { id:'d41-017', hindi:'क्या तुम घर की मरम्मत करवाने वाले हो?', english:'Are you going to get the house repaired?', alternatives:['are you going to renovate the house?'], hint:'Are you going to + get + noun + repaired ?', type:'translation' },
  { id:'d41-018', hindi:'उसका व्यापार अगले साल तेज़ होने वाला है।', english:'His business is going to grow next year.', alternatives:['his business is going to boom next year.'], hint:'is going to + grow + next year', type:'translation' },
  { id:'d41-019', hindi:'हम एक नई शुरुआत करने वाले हैं।', english:'We are going to make a fresh start.', alternatives:['we are going to start anew.'], hint:'are going to + make a fresh start', type:'translation' },
  { id:'d41-020', hindi:'यह टीम यह मैच जीतने वाली है।', english:'This team is going to win this match.', alternatives:['this team is going to win the game.'], hint:'is going to + win', type:'translation' },
];

// ============================================================
// Day 42 — About To (Immediate Future)
// ============================================================
const DAY_42 = [
  { id:'d42-001', hindi:'मैं अभी जाने वाला हूँ।', english:'I am about to leave.', alternatives:['i am just about to go.'], hint:'about to + base verb = just going to', type:'translation' },
  { id:'d42-002', hindi:'ट्रेन अभी-अभी जाने वाली है।', english:'The train is about to leave.', alternatives:['the train is just about to depart.'], hint:'is about to + leave (imminent)', type:'translation' },
  { id:'d42-003', hindi:'वह अभी रोने वाली है।', english:'She is about to cry.', alternatives:['she is on the verge of tears.'], hint:'is about to + cry', type:'translation' },
  { id:'d42-004', hindi:'फिल्म अभी शुरू होने वाली है।', english:'The movie is about to start.', alternatives:['the film is just about to begin.'], hint:'is about to + start', type:'translation' },
  { id:'d42-005', hindi:'मैं अभी खाना खाने वाला हूँ।', english:'I am about to have my food.', alternatives:['i am just about to eat.'], hint:'am about to + eat/have food', type:'translation' },
  { id:'d42-006', hindi:'वह अभी बोलने वाला था।', english:'He was about to speak.', alternatives:['he was on the verge of speaking.'], hint:'was about to + speak (past)', type:'translation' },
  { id:'d42-007', hindi:'मीटिंग अभी खत्म होने वाली है।', english:'The meeting is about to end.', alternatives:['the meeting is almost over.'], hint:'is about to + end/finish', type:'translation' },
  { id:'d42-008', hindi:'मैं अभी-अभी तुम्हें फोन करने वाला था।', english:'I was about to call you.', alternatives:['i was just about to phone you.'], hint:'was about to + call (past - interrupted)', type:'translation' },
  { id:'d42-009', hindi:'बच्चा अभी सोने वाला है।', english:'The baby is about to sleep.', alternatives:['the baby is almost asleep.'], hint:'is about to + sleep', type:'translation' },
  { id:'d42-010', hindi:'सूरज अभी डूबने वाला है।', english:'The sun is about to set.', alternatives:['sunset is about to happen.'], hint:'is about to + set (sun)', type:'translation' },
  { id:'d42-011', hindi:'मेरी बैटरी अभी खत्म होने वाली है।', english:'My battery is about to die.', alternatives:['my phone battery is about to run out.'], hint:'is about to + die/run out', type:'translation' },
  { id:'d42-012', hindi:'वह जाने वाला था तभी फोन आया।', english:'He was about to leave when the phone rang.', alternatives:['just as he was about to go, the phone rang.'], hint:'was about to + leave + when + Simple Past', type:'translation' },
  { id:'d42-013', hindi:'क्या खाना अभी तैयार होने वाला है?', english:'Is the food about to be ready?', alternatives:['is the meal almost ready?'], hint:'Is + noun + about to + be + adjective ?', type:'translation' },
  { id:'d42-014', hindi:'दुकान बंद होने वाली है।', english:'The shop is about to close.', alternatives:['the store is about to shut.'], hint:'is about to + close', type:'translation' },
  { id:'d42-015', hindi:'मैं यह काम खत्म करने ही वाला हूँ।', english:'I am just about to finish this work.', alternatives:['i am almost done with this work.'], hint:'am just about to + finish', type:'translation' },
];

// ============================================================
// Day 43 — Want To / Wanted To
// ============================================================
const DAY_43 = [
  // Want to (present/future desire)
  { id:'d43-001', hindi:'मैं इंजीनियर बनना चाहता हूँ।', english:'I want to become an engineer.', alternatives:['i wish to become an engineer.'], hint:'want to + base verb', type:'translation' },
  { id:'d43-002', hindi:'वह विदेश में पढ़ना चाहती है।', english:'She wants to study abroad.', alternatives:['she wishes to study overseas.'], hint:'wants to + study + abroad', type:'translation' },
  { id:'d43-003', hindi:'क्या तुम कुछ खाना चाहते हो?', english:'Do you want to eat something?', alternatives:['would you like to have something?'], hint:'Do you want to + verb ?', type:'translation' },
  { id:'d43-004', hindi:'वह नई भाषा सीखना चाहता है।', english:'He wants to learn a new language.', alternatives:['he wishes to learn another language.'], hint:'wants to + learn', type:'translation' },
  { id:'d43-005', hindi:'हम एक साथ छुट्टी मनाना चाहते हैं।', english:'We want to celebrate the holiday together.', alternatives:['we want to go on vacation together.'], hint:'want to + celebrate', type:'translation' },
  { id:'d43-006', hindi:'मुझे पानी पीना है।', english:'I want to drink water.', alternatives:['i need some water.'], hint:'want to + drink', type:'translation' },
  { id:'d43-007', hindi:'वह एक अच्छा इंसान बनना चाहती है।', english:'She wants to be a good person.', alternatives:['she wishes to become a good human being.'], hint:'wants to + be + adjective', type:'translation' },
  { id:'d43-008', hindi:'क्या वह अभी सोना चाहता है?', english:'Does he want to sleep now?', alternatives:['does he feel like sleeping?'], hint:'Does he want to + base verb ?', type:'translation' },
  { id:'d43-009', hindi:'मैं तुमसे बात करना चाहता हूँ।', english:'I want to talk to you.', alternatives:['i want to speak with you.'], hint:'want to + talk/speak + to/with', type:'translation' },
  { id:'d43-010', hindi:'वे नई कंपनी खोलना चाहते हैं।', english:'They want to open a new company.', alternatives:['they wish to start a new business.'], hint:'want to + open/start', type:'translation' },
  // Wanted to (past desire)
  { id:'d43-011', hindi:'मैं डॉक्टर बनना चाहता था।', english:'I wanted to become a doctor.', alternatives:['i had wished to be a doctor.'], hint:'wanted to + become (past desire)', type:'translation' },
  { id:'d43-012', hindi:'वह क्रिकेटर बनना चाहती थी।', english:'She wanted to become a cricketer.', alternatives:['she had wished to be a cricketer.'], hint:'wanted to + become + noun', type:'translation' },
  { id:'d43-013', hindi:'हम उससे मिलना चाहते थे लेकिन वह व्यस्त था।', english:'We wanted to meet him but he was busy.', alternatives:['we had wanted to see him but he was occupied.'], hint:'wanted to + meet + but + was', type:'translation' },
  { id:'d43-014', hindi:'मैं उससे माफ़ी माँगना चाहता था।', english:'I wanted to apologize to him.', alternatives:['i had wanted to say sorry to him.'], hint:'wanted to + apologize', type:'translation' },
  { id:'d43-015', hindi:'वह बचपन से पायलट बनना चाहता था।', english:'He had wanted to become a pilot since childhood.', alternatives:['he always wanted to be a pilot.'], hint:'wanted to + become + since childhood', type:'translation' },
  { id:'d43-016', hindi:'क्या तुम उससे मिलना चाहते थे?', english:'Did you want to meet him?', alternatives:['had you wanted to see him?'], hint:'Did you want to + meet ?', type:'translation' },
  { id:'d43-017', hindi:'उसने मुझे बताया कि वह जाना चाहती थी।', english:'She told me that she wanted to go.', alternatives:['she said she had wanted to leave.'], hint:'told me that + wanted to + go', type:'translation' },
  { id:'d43-018', hindi:'मैं उस पार्टी में नहीं जाना चाहता था।', english:'I did not want to go to that party.', alternatives:["i didn't feel like going to that party."], hint:'did not want to + go', type:'translation' },
  { id:'d43-019', hindi:'वे वहाँ रहना नहीं चाहते थे।', english:'They did not want to stay there.', alternatives:["they didn't want to live there."], hint:'did not want to + stay', type:'translation' },
  { id:'d43-020', hindi:'मुझे पता था कि वह आना चाहती थी।', english:'I knew she wanted to come.', alternatives:['i was aware that she wanted to visit.'], hint:'knew + that + subject + wanted to', type:'translation' },
];

// ============================================================
// Day 44 — Need To / Needed To
// ============================================================
const DAY_44 = [
  { id:'d44-001', hindi:'मुझे अभी आराम करना ज़रूरी है।', english:'I need to rest now.', alternatives:['i need some rest right now.'], hint:'need to + base verb (necessity)', type:'translation' },
  { id:'d44-002', hindi:'उसे नई नौकरी ढूँढनी ज़रूरी है।', english:'She needs to find a new job.', alternatives:['she needs to look for new employment.'], hint:'needs to + find', type:'translation' },
  { id:'d44-003', hindi:'हमें इस समस्या का हल निकालना होगा।', english:'We need to find a solution to this problem.', alternatives:['we need to solve this problem.'], hint:'need to + find a solution', type:'translation' },
  { id:'d44-004', hindi:'क्या तुम्हें पैसों की ज़रूरत है?', english:'Do you need money?', alternatives:['do you require money?'], hint:'Do you need + noun ?', type:'translation' },
  { id:'d44-005', hindi:'उसे डॉक्टर की ज़रूरत है।', english:'He needs a doctor.', alternatives:['he requires medical attention.'], hint:'needs + article + noun', type:'translation' },
  { id:'d44-006', hindi:'बच्चों को माता-पिता के प्यार की ज़रूरत है।', english:'Children need the love of their parents.', alternatives:['kids need parental love.'], hint:'need + noun', type:'translation' },
  { id:'d44-007', hindi:'मुझे इस बारे में और जानकारी चाहिए।', english:'I need more information about this.', alternatives:['i require more details about this.'], hint:'need + more + noun + about', type:'translation' },
  { id:'d44-008', hindi:'क्या उसे मदद की ज़रूरत है?', english:'Does she need help?', alternatives:['does she require assistance?'], hint:'Does she need + noun ?', type:'translation' },
  { id:'d44-009', hindi:'हमें इस प्रोजेक्ट के लिए और समय चाहिए।', english:'We need more time for this project.', alternatives:['we require additional time for this project.'], hint:'need + more + noun + for', type:'translation' },
  { id:'d44-010', hindi:'मुझे यह काम आज ही खत्म करना ज़रूरी है।', english:'I need to finish this work today itself.', alternatives:['i must complete this work by today.'], hint:'need to + finish + today', type:'translation' },
  // Needed to (past)
  { id:'d44-011', hindi:'मुझे कल डॉक्टर के पास जाना पड़ा।', english:'I needed to see the doctor yesterday.', alternatives:['i had to go to the doctor yesterday.'], hint:'needed to + see (past necessity)', type:'translation' },
  { id:'d44-012', hindi:'उसे उस वक्त मेरी मदद की ज़रूरत थी।', english:'She needed my help at that time.', alternatives:['she required my assistance then.'], hint:'needed + noun + at that time', type:'translation' },
  { id:'d44-013', hindi:'हमें तेज़ी से काम करना पड़ा।', english:'We needed to work fast.', alternatives:['we had to work quickly.'], hint:'needed to + work fast', type:'translation' },
  { id:'d44-014', hindi:'उसे उस समय कोई नहीं था।', english:'He needed someone at that time.', alternatives:['he required someone at that moment.'], hint:'needed + someone + at that time', type:'translation' },
  { id:'d44-015', hindi:'हमें पहले इस बारे में सोचना था।', english:'We needed to think about this earlier.', alternatives:['we should have thought about this before.'], hint:'needed to + think + earlier', type:'translation' },
  // More need to sentences
  { id:'d44-016', hindi:'मुझे तुमसे कुछ बात करनी है।', english:'I need to talk to you about something.', alternatives:['i need to discuss something with you.'], hint:'need to + talk + about', type:'translation' },
  { id:'d44-017', hindi:'उसे अपना व्यवहार बदलना ज़रूरी है।', english:'She needs to change her behaviour.', alternatives:['she needs to improve her behaviour.'], hint:'needs to + change', type:'translation' },
  { id:'d44-018', hindi:'इस देश को अच्छे नेताओं की ज़रूरत है।', english:'This country needs good leaders.', alternatives:['this nation requires good leaders.'], hint:'needs + noun', type:'translation' },
  { id:'d44-019', hindi:'क्या तुम्हें अभी जाने की ज़रूरत है?', english:'Do you need to go now?', alternatives:['is it necessary for you to leave now?'], hint:'Do you need to + base verb + now ?', type:'translation' },
  { id:'d44-020', hindi:'मुझे अपना पासपोर्ट नवीनीकरण करवाना है।', english:'I need to get my passport renewed.', alternatives:['i need to renew my passport.'], hint:'need to + get + noun + renewed', type:'translation' },
];

// ============================================================
// Day 45 — Fond Of (Liking / Interest)
// ============================================================
const DAY_45 = [
  { id:'d45-001', hindi:'मुझे संगीत सुनना बहुत पसंद है।', english:'I am very fond of listening to music.', alternatives:['i am really fond of music.'], hint:'fond of + verb+ing', type:'translation' },
  { id:'d45-002', hindi:'वह खाना बनाने की शौकीन है।', english:'She is fond of cooking.', alternatives:['she is very fond of making food.'], hint:'is fond of + verb+ing', type:'translation' },
  { id:'d45-003', hindi:'वह बचपन से क्रिकेट का दीवाना है।', english:'He has been fond of cricket since childhood.', alternatives:['he is very fond of cricket.'], hint:'has been fond of + noun', type:'translation' },
  { id:'d45-004', hindi:'क्या तुम्हें यात्रा करना पसंद है?', english:'Are you fond of travelling?', alternatives:['do you like to travel?'], hint:'Are you fond of + verb+ing ?', type:'translation' },
  { id:'d45-005', hindi:'बच्चे खेलने के शौकीन होते हैं।', english:'Children are fond of playing.', alternatives:['children love to play.'], hint:'are fond of + verb+ing (general)', type:'translation' },
  { id:'d45-006', hindi:'मुझे किताबें पढ़ना बहुत पसंद है।', english:'I am very fond of reading books.', alternatives:['i love reading books.'], hint:'fond of + reading + noun', type:'translation' },
  { id:'d45-007', hindi:'वह मीठे खाने की दीवानी है।', english:'She is very fond of sweets.', alternatives:['she loves eating sweet things.'], hint:'fond of + noun (sweets)', type:'translation' },
  { id:'d45-008', hindi:'वह फोटोग्राफी का शौकीन है।', english:'He is fond of photography.', alternatives:['he has a passion for photography.'], hint:'fond of + noun/verb+ing', type:'translation' },
  { id:'d45-009', hindi:'हम दोनों नाचने के शौकीन हैं।', english:'Both of us are fond of dancing.', alternatives:['we both love dancing.'], hint:'are fond of + dancing', type:'translation' },
  { id:'d45-010', hindi:'क्या वह रात को घूमने का शौकीन है?', english:'Is he fond of going out at night?', alternatives:['does he like going out at night?'], hint:'Is he fond of + verb+ing ?', type:'translation' },
  { id:'d45-011', hindi:'मुझे पहाड़ों की यात्रा करना बहुत पसंद है।', english:'I am very fond of travelling to mountains.', alternatives:['i love mountain trips.'], hint:'fond of + travelling to + place', type:'translation' },
  { id:'d45-012', hindi:'वह बचपन से मछली पकड़ने का शौकीन है।', english:'He has been fond of fishing since childhood.', alternatives:['he loves fishing since his childhood.'], hint:'has been fond of + verb+ing', type:'translation' },
  { id:'d45-013', hindi:'उन्हें कुत्ते पालना बहुत पसंद है।', english:'They are very fond of keeping dogs.', alternatives:['they love having pet dogs.'], hint:'fond of + keeping + noun', type:'translation' },
  { id:'d45-014', hindi:'वह बागवानी की शौकीन है।', english:'She is fond of gardening.', alternatives:['she loves to garden.'], hint:'is fond of + gardening', type:'translation' },
  { id:'d45-015', hindi:'मैं अच्छी फिल्में देखने का शौकीन हूँ।', english:'I am fond of watching good movies.', alternatives:['i love watching great films.'], hint:'fond of + watching + noun', type:'translation' },
  { id:'d45-016', hindi:'वह उस लड़की की बहुत दीवानी है।', english:'She is very fond of that girl.', alternatives:['she likes that girl a lot.'], hint:'fond of + person', type:'translation' },
  { id:'d45-017', hindi:'बच्चे मिठाई के दीवाने होते हैं।', english:'Children are fond of sweets.', alternatives:['kids love candy and sweets.'], hint:'are fond of + noun (general truth)', type:'translation' },
  { id:'d45-018', hindi:'क्या तुम पेंटिंग के शौकीन हो?', english:'Are you fond of painting?', alternatives:['do you like painting?'], hint:'Are you fond of + noun/verb+ing ?', type:'translation' },
  { id:'d45-019', hindi:'मुझे अंग्रेज़ी सीखना बहुत पसंद है।', english:'I am very fond of learning English.', alternatives:['i love learning english.'], hint:'fond of + learning + noun', type:'translation' },
  { id:'d45-020', hindi:'वह पुरानी फिल्मों का दीवाना है।', english:'He is very fond of old movies.', alternatives:['he loves classic films.'], hint:'fond of + adjective + noun', type:'translation' },
];

// ============================================================
// Day 46 — Able To / Not Able To (Ability)
// ============================================================
const DAY_46 = [
  { id:'d46-001', hindi:'मैं अंग्रेज़ी बोलने में सक्षम हूँ।', english:'I am able to speak English.', alternatives:['i can speak english.'], hint:'am able to + base verb', type:'translation' },
  { id:'d46-002', hindi:'वह इस काम को करने में सक्षम नहीं है।', english:'She is not able to do this work.', alternatives:["she isn't able to do this task.",'she cannot do this work.'], hint:'is not able to + base verb', type:'translation' },
  { id:'d46-003', hindi:'क्या तुम यह उठाने में सक्षम हो?', english:'Are you able to lift this?', alternatives:['can you lift this?'], hint:'Are you able to + base verb ?', type:'translation' },
  { id:'d46-004', hindi:'वह तीन भाषाएँ बोलने में सक्षम है।', english:'He is able to speak three languages.', alternatives:['he can speak 3 languages.'], hint:'is able to + speak + number', type:'translation' },
  { id:'d46-005', hindi:'हम इस समस्या को सुलझाने में सक्षम हैं।', english:'We are able to solve this problem.', alternatives:['we can solve this issue.'], hint:'are able to + solve', type:'translation' },
  { id:'d46-006', hindi:'वह बचपन से तैर सकती है।', english:'She has been able to swim since childhood.', alternatives:['she could swim since childhood.'], hint:'has been able to + swim + since', type:'translation' },
  { id:'d46-007', hindi:'मैं आज नहीं जा पाऊँगा।', english:'I will not be able to go today.', alternatives:["i won't be able to come today."], hint:'will not be able to + go', type:'translation' },
  { id:'d46-008', hindi:'क्या वह कल आ सकेगा?', english:'Will he be able to come tomorrow?', alternatives:['can he make it tomorrow?'], hint:'Will he be able to + come ?', type:'translation' },
  { id:'d46-009', hindi:'वह उस दिन अपनी पीड़ा छुपाने में सक्षम नहीं था।', english:'He was not able to hide his pain that day.', alternatives:["he couldn't hide his grief that day."], hint:'was not able to + hide', type:'translation' },
  { id:'d46-010', hindi:'हम वहाँ समय पर पहुँचने में सक्षम थे।', english:'We were able to reach there on time.', alternatives:['we managed to reach on time.'], hint:'were able to + reach + on time', type:'translation' },
  { id:'d46-011', hindi:'मैं उसे समझाने में सफल नहीं हुआ।', english:'I was not able to convince him.', alternatives:["i couldn't convince him."], hint:'was not able to + convince', type:'translation' },
  { id:'d46-012', hindi:'वह अब ठीक से चलने में सक्षम है।', english:'She is now able to walk properly.', alternatives:['she can now walk normally.'], hint:'is now able to + walk', type:'translation' },
  { id:'d46-013', hindi:'क्या तुम यह गाना गा सकते हो?', english:'Are you able to sing this song?', alternatives:['can you sing this song?'], hint:'Are you able to + sing ?', type:'translation' },
  { id:'d46-014', hindi:'वह अकेले यह काम करने में सक्षम है।', english:'He is able to do this work alone.', alternatives:['he can handle this task by himself.'], hint:'is able to + do + alone', type:'translation' },
  { id:'d46-015', hindi:'उन्होंने मुश्किल वक्त में भी हिम्मत रखी।', english:'They were able to stay strong even in difficult times.', alternatives:['they managed to stay courageous in hard times.'], hint:'were able to + stay strong + even in', type:'translation' },
];

// ============================================================
// Day 47 — Conjunctions (and, but, or, so, because, although, if, when, while, until, unless, since, after, before, though, yet, for, nor)
// ============================================================
const DAY_47 = [
  // AND, BUT, OR
  { id:'d47-001', hindi:'मैं सेब और केला खाता हूँ।', english:'I eat apples and bananas.', alternatives:['i have apples and bananas.'], hint:'and = तथा / और', type:'translation' },
  { id:'d47-002', hindi:'वह होशियार है लेकिन आलसी है।', english:'She is intelligent but lazy.', alternatives:['she is smart but idle.'], hint:'but = लेकिन (contrast)', type:'translation' },
  { id:'d47-003', hindi:'क्या तुम चाय लोगे या कॉफी?', english:'Will you have tea or coffee?', alternatives:['do you want tea or coffee?'], hint:'or = या (choice)', type:'translation' },
  // SO, BECAUSE
  { id:'d47-004', hindi:'बारिश हो रही थी इसलिए मैं घर रहा।', english:'It was raining so I stayed home.', alternatives:["it was raining so i didn't go out."], hint:'so = इसलिए (result)', type:'translation' },
  { id:'d47-005', hindi:'मैं खुश हूँ क्योंकि मैंने परीक्षा पास की।', english:'I am happy because I passed the exam.', alternatives:['i am happy since i cleared the test.'], hint:'because = क्योंकि (reason)', type:'translation' },
  { id:'d47-006', hindi:'मुझे भूख लगी है इसलिए मैं कुछ खाऊँगा।', english:'I am hungry so I will eat something.', alternatives:['i feel hungry so i will have something.'], hint:'so = result/consequence', type:'translation' },
  // ALTHOUGH, THOUGH, EVEN THOUGH
  { id:'d47-007', hindi:'वह थका हुआ था फिर भी उसने काम किया।', english:'Although he was tired, he worked.', alternatives:['though he was tired, he kept working.'], hint:'although/though = फिर भी (concession)', type:'translation' },
  { id:'d47-008', hindi:'हालाँकि वह अमीर है, वह खुश नहीं है।', english:'Although he is rich, he is not happy.', alternatives:['even though he is wealthy, he is unhappy.'], hint:'although = हालाँकि', type:'translation' },
  // IF, UNLESS
  { id:'d47-009', hindi:'अगर तुम मेहनत करोगे, तो सफल होगे।', english:'If you work hard, you will succeed.', alternatives:['if you put in effort, you will achieve success.'], hint:'if = अगर (condition)', type:'translation' },
  { id:'d47-010', hindi:'जब तक तुम नहीं मेहनत करोगे, सफल नहीं होगे।', english:'Unless you work hard, you will not succeed.', alternatives:['you will not succeed unless you work hard.'], hint:'unless = जब तक नहीं (negative condition)', type:'translation' },
  // WHEN, WHILE, UNTIL
  { id:'d47-011', hindi:'जब वह आई, मैं सो रहा था।', english:'When she came, I was sleeping.', alternatives:['i was asleep when she arrived.'], hint:'when = जब', type:'translation' },
  { id:'d47-012', hindi:'वह खाना बना रही थी जब मैंने फोन किया।', english:'She was cooking while I called.', alternatives:['i called while she was cooking.'], hint:'while = जबकि (simultaneous)', type:'translation' },
  { id:'d47-013', hindi:'जब तक वह नहीं आएगा, हम इंतज़ार करेंगे।', english:'We will wait until he comes.', alternatives:['we shall wait till he arrives.'], hint:'until/till = जब तक नहीं', type:'translation' },
  // SINCE, AFTER, BEFORE
  { id:'d47-014', hindi:'जब से वह गई है, घर सुनसान लग रहा है।', english:'Since she left, the house feels empty.', alternatives:['the house feels lonely since she left.'], hint:'since = जब से', type:'translation' },
  { id:'d47-015', hindi:'खाना खाने के बाद वह सो गया।', english:'After eating food, he slept.', alternatives:['he went to sleep after having food.'], hint:'after + verb+ing = बाद में', type:'translation' },
  { id:'d47-016', hindi:'सोने से पहले दाँत ज़रूर साफ़ करो।', english:'Before sleeping, always brush your teeth.', alternatives:['always brush your teeth before you sleep.'], hint:'before + verb+ing = पहले', type:'translation' },
  // YET, NOR, FOR
  { id:'d47-017', hindi:'वह थका हुआ था फिर भी उसने हार नहीं मानी।', english:'He was tired yet he did not give up.', alternatives:['he was tired but he still did not quit.'], hint:'yet = फिर भी (contrast after statement)', type:'translation' },
  { id:'d47-018', hindi:'न मैं जाऊँगा, न वह जाएगी।', english:'Neither I will go nor will she.', alternatives:['i will not go and she will not either.'], hint:'neither...nor = न...न', type:'translation' },
  { id:'d47-019', hindi:'वह अच्छी तरह पढ़ता है इसलिए वह हमेशा पास होता है।', english:'He studies well, for he always passes.', alternatives:['he always passes because he studies well.'], hint:'for = क्योंकि (formal writing)', type:'translation' },
  // Complex sentences
  { id:'d47-020', hindi:'वह होशियार है और मेहनती भी है।', english:'She is intelligent and hardworking too.', alternatives:['she is smart and also dedicated.'], hint:'and = addition', type:'translation' },
  { id:'d47-021', hindi:'मैं जानता था कि वह आएगा।', english:'I knew that he would come.', alternatives:['i was sure that he would arrive.'], hint:'that = कि (subordinate conjunction)', type:'translation' },
  { id:'d47-022', hindi:'वह इतनी तेज़ चिल्लाई कि सब घबरा गए।', english:'She screamed so loudly that everyone got scared.', alternatives:['she shouted so much that people panicked.'], hint:'so...that = इतना...कि', type:'translation' },
  { id:'d47-023', hindi:'मैं घर जाऊँगा जब तुम बुलाओगे।', english:'I will go home when you call.', alternatives:['i will leave when you call me.'], hint:'when = जब (future)', type:'translation' },
  { id:'d47-024', hindi:'तुम जहाँ भी जाओ, मैं साथ चलूँगा।', english:'Wherever you go, I will come with you.', alternatives:['i will follow you wherever you go.'], hint:'wherever = जहाँ भी', type:'translation' },
  { id:'d47-025', hindi:'जितनी जल्दी तुम शुरू करोगे, उतना बेहतर होगा।', english:'The sooner you start, the better it will be.', alternatives:['the earlier you begin, the better.'], hint:'the sooner...the better', type:'translation' },
];

// ============================================================
// Day 48 — WH Words (What, Who, Where, When, Why, Which, How, Whose, Whom)
// ============================================================
const DAY_48 = [
  // WHAT
  { id:'d48-001', hindi:'तुम्हारा नाम क्या है?', english:'What is your name?', alternatives:['what do they call you?'], hint:'What is your + noun ?', type:'translation' },
  { id:'d48-002', hindi:'तुम क्या कर रहे हो?', english:'What are you doing?', alternatives:['what are you up to?'], hint:'What are you + verb+ing ?', type:'translation' },
  { id:'d48-003', hindi:'यह क्या है?', english:'What is this?', alternatives:['what is it?'], hint:'What is this/that ?', type:'translation' },
  { id:'d48-004', hindi:'तुम क्या चाहते हो?', english:'What do you want?', alternatives:['what would you like?'], hint:'What do you + want/need ?', type:'translation' },
  { id:'d48-005', hindi:'तुमने क्या खाया?', english:'What did you eat?', alternatives:['what did you have?'], hint:'What did you + base verb ?', type:'translation' },
  // WHO
  { id:'d48-006', hindi:'वह कौन है?', english:'Who is he?', alternatives:['who is that person?'], hint:'Who is he/she/that ?', type:'translation' },
  { id:'d48-007', hindi:'यह काम किसने किया?', english:'Who did this work?', alternatives:['who completed this task?'], hint:'Who + did + this ?', type:'translation' },
  { id:'d48-008', hindi:'वहाँ कौन जाएगा?', english:'Who will go there?', alternatives:['who is going there?'], hint:'Who will + go ?', type:'translation' },
  { id:'d48-009', hindi:'तुम किससे मिले?', english:'Whom did you meet?', alternatives:['who did you meet?'], hint:'Whom did you + meet ? (object)', type:'translation' },
  // WHERE
  { id:'d48-010', hindi:'तुम कहाँ रहते हो?', english:'Where do you live?', alternatives:['where do you stay?'], hint:'Where do you + live/stay ?', type:'translation' },
  { id:'d48-011', hindi:'मेरी चाबियाँ कहाँ हैं?', english:'Where are my keys?', alternatives:['where did i put my keys?'], hint:'Where are + my + noun ?', type:'translation' },
  { id:'d48-012', hindi:'वह कहाँ गई?', english:'Where did she go?', alternatives:['where has she gone?'], hint:'Where did she + go ?', type:'translation' },
  { id:'d48-013', hindi:'तुम इतने दिन कहाँ थे?', english:'Where were you all this while?', alternatives:['where have you been all this time?'], hint:'Where were you + time ?', type:'translation' },
  // WHEN
  { id:'d48-014', hindi:'तुम कब आओगे?', english:'When will you come?', alternatives:['when are you coming?'], hint:'When will you + come ?', type:'translation' },
  { id:'d48-015', hindi:'यह मीटिंग कब है?', english:'When is this meeting?', alternatives:['what time is the meeting?'], hint:'When is + noun ?', type:'translation' },
  { id:'d48-016', hindi:'तुम्हारा जन्मदिन कब है?', english:'When is your birthday?', alternatives:['what date is your birthday?'], hint:'When is your + noun ?', type:'translation' },
  { id:'d48-017', hindi:'वह कब से यहाँ है?', english:'Since when has he been here?', alternatives:['how long has he been here?'], hint:'Since when + has + subject + been ?', type:'translation' },
  // WHY
  { id:'d48-018', hindi:'तुम देर से क्यों आए?', english:'Why did you come late?', alternatives:['why were you late?'], hint:'Why did you + base verb ?', type:'translation' },
  { id:'d48-019', hindi:'वह रो क्यों रही है?', english:'Why is she crying?', alternatives:['what is she crying about?'], hint:'Why is she + verb+ing ?', type:'translation' },
  { id:'d48-020', hindi:'तुमने यह क्यों किया?', english:'Why did you do this?', alternatives:['why have you done this?'], hint:'Why did you + do + this ?', type:'translation' },
  // WHICH
  { id:'d48-021', hindi:'कौन सी किताब तुम्हारी है?', english:'Which book is yours?', alternatives:['which one is your book?'], hint:'Which + noun + is yours ?', type:'translation' },
  { id:'d48-022', hindi:'तुम कौन सी भाषा सीखना चाहते हो?', english:'Which language do you want to learn?', alternatives:['which language would you like to learn?'], hint:'Which + noun + do you want ?', type:'translation' },
  // HOW
  { id:'d48-023', hindi:'तुम कैसे हो?', english:'How are you?', alternatives:['how do you do?'], hint:'How are you ? (greeting)', type:'translation' },
  { id:'d48-024', hindi:'तुमने यह कैसे किया?', english:'How did you do this?', alternatives:['how did you manage this?'], hint:'How did you + do + this ?', type:'translation' },
  { id:'d48-025', hindi:'यह कितने का है?', english:'How much does this cost?', alternatives:['how much is this?'], hint:'How much does + noun + cost ?', type:'translation' },
  { id:'d48-026', hindi:'वहाँ कितने लोग थे?', english:'How many people were there?', alternatives:['how many people were present?'], hint:'How many + noun + were there ?', type:'translation' },
  { id:'d48-027', hindi:'तुम कितने समय से यहाँ हो?', english:'How long have you been here?', alternatives:['since when are you here?'], hint:'How long have you been + here ?', type:'translation' },
  { id:'d48-028', hindi:'वह कितनी दूर है?', english:'How far is it?', alternatives:['how far away is it?'], hint:'How far is + noun ?', type:'translation' },
  // WHOSE
  { id:'d48-029', hindi:'यह बैग किसका है?', english:'Whose bag is this?', alternatives:['who does this bag belong to?'], hint:'Whose + noun + is this ?', type:'translation' },
  { id:'d48-030', hindi:'यह किसका पेन है?', english:'Whose pen is this?', alternatives:['who owns this pen?'], hint:'Whose + noun + is this ?', type:'translation' },
  // Mixed WH questions
  { id:'d48-031', hindi:'तुम्हारे पिता क्या काम करते हैं?', english:'What does your father do?', alternatives:['what is your father\'s profession?'], hint:'What does your + noun + do ?', type:'translation' },
  { id:'d48-032', hindi:'यह गाना किसने लिखा?', english:'Who wrote this song?', alternatives:['who composed this song?'], hint:'Who + wrote + this ?', type:'translation' },
  { id:'d48-033', hindi:'तुम किसके साथ आए?', english:'With whom did you come?', alternatives:['who did you come with?'], hint:'With whom + did you come ?', type:'translation' },
  { id:'d48-034', hindi:'यह इमारत कब बनी थी?', english:'When was this building built?', alternatives:['when was this building constructed?'], hint:'When was + noun + built/made ?', type:'translation' },
  { id:'d48-035', hindi:'वह यहाँ क्यों नहीं आई?', english:'Why did she not come here?', alternatives:["why didn't she come here?"], hint:'Why did she not + come ?', type:'translation' },
];

// ============================================================
// Day 49 — Passive Voice Part 1 (Simple Present & Simple Past Passive)
// ============================================================
const DAY_49 = [
  // Simple Present Passive
  { id:'d49-001', hindi:'यहाँ हिंदी बोली जाती है।', english:'Hindi is spoken here.', alternatives:['hindi is spoken over here.'], hint:'is/are + past participle (present passive)', type:'translation' },
  { id:'d49-002', hindi:'यह किताब हर साल पढ़ी जाती है।', english:'This book is read every year.', alternatives:['this book is read annually.'], hint:'is + past participle + every year', type:'translation' },
  { id:'d49-003', hindi:'यहाँ अंग्रेज़ी सिखाई जाती है।', english:'English is taught here.', alternatives:['english is being taught here.'], hint:'is + taught + here', type:'translation' },
  { id:'d49-004', hindi:'गेहूँ पंजाब में उगाया जाता है।', english:'Wheat is grown in Punjab.', alternatives:['wheat is cultivated in punjab.'], hint:'is + grown + in + place', type:'translation' },
  { id:'d49-005', hindi:'यह दरवाज़ा हर रात बंद किया जाता है।', english:'This door is closed every night.', alternatives:['this door is shut every night.'], hint:'is + past participle + every night', type:'translation' },
  { id:'d49-006', hindi:'यह काम बहुत सावधानी से किया जाता है।', english:'This work is done very carefully.', alternatives:['this task is performed with great care.'], hint:'is + done + carefully', type:'translation' },
  { id:'d49-007', hindi:'खाना 12 बजे परोसा जाता है।', english:'Food is served at 12 o\'clock.', alternatives:['food is served at noon.'], hint:'is + served + at + time', type:'translation' },
  { id:'d49-008', hindi:'क्या यहाँ अंग्रेज़ी बोली जाती है?', english:'Is English spoken here?', alternatives:['do people speak english here?'], hint:'Is + past participle + here ?', type:'translation' },
  { id:'d49-009', hindi:'पैसे हर महीने बैंक में जमा किए जाते हैं।', english:'Money is deposited in the bank every month.', alternatives:['money is put into the bank monthly.'], hint:'is + deposited + every month', type:'translation' },
  { id:'d49-010', hindi:'परीक्षा हर साल आयोजित की जाती है।', english:'The exam is conducted every year.', alternatives:['the examination is held annually.'], hint:'is + conducted + every year', type:'translation' },
  // Simple Past Passive
  { id:'d49-011', hindi:'यह पत्र कल लिखा गया।', english:'This letter was written yesterday.', alternatives:['this letter was composed yesterday.'], hint:'was + past participle + yesterday (past passive)', type:'translation' },
  { id:'d49-012', hindi:'वह दरवाज़ा तोड़ा गया।', english:'That door was broken.', alternatives:['the door was damaged.'], hint:'was + past participle (past passive)', type:'translation' },
  { id:'d49-013', hindi:'यह इमारत 1950 में बनाई गई थी।', english:'This building was built in 1950.', alternatives:['this building was constructed in 1950.'], hint:'was + built + in + year', type:'translation' },
  { id:'d49-014', hindi:'चोर को पुलिस ने पकड़ा।', english:'The thief was caught by the police.', alternatives:['the thief was arrested by police.'], hint:'was + caught + by + agent', type:'translation' },
  { id:'d49-015', hindi:'यह गाना एक मशहूर गायक ने गाया।', english:'This song was sung by a famous singer.', alternatives:['this song was performed by a renowned singer.'], hint:'was + sung + by + person', type:'translation' },
  { id:'d49-016', hindi:'मीटिंग कैंसिल कर दी गई।', english:'The meeting was cancelled.', alternatives:['the meeting has been cancelled.'], hint:'was + past participle (no agent)', type:'translation' },
  { id:'d49-017', hindi:'मेरी साइकिल किसी ने चुरा ली।', english:'My bicycle was stolen by someone.', alternatives:['someone stole my bicycle.'], hint:'was + stolen + by + someone', type:'translation' },
  { id:'d49-018', hindi:'यह खत पोस्ट में डाला गया।', english:'This letter was posted.', alternatives:['the letter was sent by post.'], hint:'was + past participle (delivered/sent)', type:'translation' },
  { id:'d49-019', hindi:'उसे नौकरी से निकाल दिया गया।', english:'He was fired from the job.', alternatives:['he was dismissed from his post.'], hint:'was + fired/dismissed + from', type:'translation' },
  { id:'d49-020', hindi:'यह निर्णय बोर्ड ने लिया।', english:'This decision was taken by the board.', alternatives:['this decision was made by the board.'], hint:'was + taken + by + agent', type:'translation' },
  { id:'d49-021', hindi:'खेल का मैदान साफ़ किया गया।', english:'The playground was cleaned.', alternatives:['the ground was tidied up.'], hint:'was + cleaned (no agent)', type:'translation' },
  { id:'d49-022', hindi:'यह किताब शेक्सपियर ने लिखी थी।', english:'This book was written by Shakespeare.', alternatives:['shakespeare wrote this book.'], hint:'was + written + by + person', type:'translation' },
  { id:'d49-023', hindi:'पुरस्कार समारोह में उसे सम्मानित किया गया।', english:'He was honored at the award ceremony.', alternatives:['he received an award at the ceremony.'], hint:'was + honored + at + event', type:'translation' },
  { id:'d49-024', hindi:'क्या परीक्षा कल ली गई?', english:'Was the exam taken yesterday?', alternatives:['was the test conducted yesterday?'], hint:'Was + noun + past participle ?', type:'translation' },
  { id:'d49-025', hindi:'मरीज़ को अस्पताल में भर्ती किया गया।', english:'The patient was admitted to the hospital.', alternatives:['the patient was hospitalized.'], hint:'was + admitted + to + hospital', type:'translation' },
];

// ============================================================
// Day 50 — Passive Voice Part 2 (Present & Past Continuous, Present Perfect Passive)
// ============================================================
const DAY_50 = [
  // Present Continuous Passive
  { id:'d50-001', hindi:'एक नई इमारत बनाई जा रही है।', english:'A new building is being built.', alternatives:['a new building is being constructed.'], hint:'is being + past participle (present continuous passive)', type:'translation' },
  { id:'d50-002', hindi:'वह सड़क मरम्मत की जा रही है।', english:'That road is being repaired.', alternatives:['the road is being fixed.'], hint:'is being + repaired', type:'translation' },
  { id:'d50-003', hindi:'यह दवाई दुनिया भर में बनाई जा रही है।', english:'This medicine is being manufactured worldwide.', alternatives:['this medicine is being made all over the world.'], hint:'is being + manufactured + worldwide', type:'translation' },
  { id:'d50-004', hindi:'एक नई पॉलिसी बनाई जा रही है।', english:'A new policy is being formed.', alternatives:['a new policy is being formulated.'], hint:'is being + formed/created', type:'translation' },
  { id:'d50-005', hindi:'क्या खाना बनाया जा रहा है?', english:'Is food being cooked?', alternatives:['is the meal being prepared?'], hint:'Is + noun + being + past participle ?', type:'translation' },
  // Past Continuous Passive
  { id:'d50-006', hindi:'इमारत पिछले साल बनाई जा रही थी।', english:'The building was being constructed last year.', alternatives:['the building was being built the previous year.'], hint:'was being + past participle (past continuous passive)', type:'translation' },
  { id:'d50-007', hindi:'गाना रिकॉर्ड किया जा रहा था।', english:'The song was being recorded.', alternatives:['the track was being recorded.'], hint:'was being + recorded', type:'translation' },
  { id:'d50-008', hindi:'परीक्षा के प्रश्न तैयार किए जा रहे थे।', english:'The exam questions were being prepared.', alternatives:['the test papers were being set.'], hint:'were being + prepared', type:'translation' },
  // Present Perfect Passive
  { id:'d50-009', hindi:'यह रिपोर्ट पहले ही जमा की जा चुकी है।', english:'This report has already been submitted.', alternatives:['the report has been handed in already.'], hint:'has been + past participle (present perfect passive)', type:'translation' },
  { id:'d50-010', hindi:'मेरी गाड़ी ठीक कर दी गई है।', english:'My car has been repaired.', alternatives:['my car has been fixed.'], hint:'has been + repaired', type:'translation' },
  { id:'d50-011', hindi:'दरवाज़ा बंद कर दिया गया है।', english:'The door has been closed.', alternatives:['the door has been shut.'], hint:'has been + closed', type:'translation' },
  { id:'d50-012', hindi:'क्या चिट्ठी भेजी जा चुकी है?', english:'Has the letter been sent?', alternatives:['has the mail been dispatched?'], hint:'Has + noun + been + past participle ?', type:'translation' },
  { id:'d50-013', hindi:'सभी तैयारियाँ पूरी की जा चुकी हैं।', english:'All arrangements have been completed.', alternatives:['all preparations have been made.'], hint:'have been + completed', type:'translation' },
  { id:'d50-014', hindi:'चोर को पहले ही गिरफ्तार किया जा चुका है।', english:'The thief has already been arrested.', alternatives:['the criminal has been caught already.'], hint:'has already been + arrested', type:'translation' },
  { id:'d50-015', hindi:'नए नियम लागू किए जा चुके हैं।', english:'The new rules have been implemented.', alternatives:['new regulations have been put in place.'], hint:'have been + implemented', type:'translation' },
  // Future Passive
  { id:'d50-016', hindi:'यह काम कल किया जाएगा।', english:'This work will be done tomorrow.', alternatives:['this task will be completed tomorrow.'], hint:'will be + past participle (future passive)', type:'translation' },
  { id:'d50-017', hindi:'पुरस्कार अगले हफ्ते दिए जाएँगे।', english:'Awards will be given next week.', alternatives:['prizes will be distributed next week.'], hint:'will be + given + next week', type:'translation' },
  { id:'d50-018', hindi:'नई ब्रांच अगले महीने खोली जाएगी।', english:'The new branch will be opened next month.', alternatives:['the new office will be launched next month.'], hint:'will be + opened + next month', type:'translation' },
  // Modal Passive
  { id:'d50-019', hindi:'यह काम जल्दी होना चाहिए।', english:'This work should be done quickly.', alternatives:['this task must be completed fast.'], hint:'should/must + be + past participle', type:'translation' },
  { id:'d50-020', hindi:'यह दरवाज़ा बंद होना चाहिए।', english:'This door should be kept closed.', alternatives:['the door must remain closed.'], hint:'should be + kept + adjective', type:'translation' },
  { id:'d50-021', hindi:'यह रहस्य किसी को नहीं बताया जाना चाहिए।', english:'This secret should not be told to anyone.', alternatives:['this secret must not be revealed.'], hint:'should not be + told/revealed', type:'translation' },
  { id:'d50-022', hindi:'मरीज़ का खयाल रखा जाना चाहिए।', english:'The patient should be taken care of.', alternatives:['the patient must be looked after.'], hint:'should be + taken care of', type:'translation' },
  // Mixed passive
  { id:'d50-023', hindi:'इस गाने को लाखों लोगों ने सुना है।', english:'This song has been heard by millions of people.', alternatives:['millions have heard this song.'], hint:'has been + heard + by + people', type:'translation' },
  { id:'d50-024', hindi:'वह जीत बहुत याद की जाती है।', english:'That victory is remembered greatly.', alternatives:['that win is deeply cherished.'], hint:'is + remembered + greatly', type:'translation' },
  { id:'d50-025', hindi:'यह प्रश्न अभी तक हल नहीं किया गया है।', english:'This question has not been solved yet.', alternatives:["this question hasn't been answered yet."], hint:'has not been + solved + yet', type:'translation' },
];

// ============================================================
// Day 51 — Advance Level Sentences Part 1
// ============================================================
const DAY_51 = [
  { id:'d51-001', hindi:'अगर मैं तुम होता, तो यह गलती कभी नहीं करता।', english:'If I were you, I would never make this mistake.', alternatives:['were i in your place, i would not do this.'], hint:'If I were you + would + base verb (Second Conditional)', type:'translation' },
  { id:'d51-002', hindi:'काश मेरे पास और समय होता!', english:'I wish I had more time!', alternatives:['i wish there was more time.'], hint:'I wish + had + noun (wish for impossible/unlikely)', type:'translation' },
  { id:'d51-003', hindi:'मुझे खेद है कि मैं वहाँ नहीं आ सका।', english:'I regret that I could not come there.', alternatives:['i am sorry i could not make it.'], hint:'I regret that + past tense', type:'translation' },
  { id:'d51-004', hindi:'वह इतना थका था कि खड़ा भी नहीं हो सकता था।', english:'He was so tired that he could not even stand.', alternatives:['he was too tired to even stand up.'], hint:'so + adjective + that + could not', type:'translation' },
  { id:'d51-005', hindi:'जितनी मेहनत करोगे, उतनी सफलता मिलेगी।', english:'The harder you work, the more success you will achieve.', alternatives:['the more effort you put in, the more you will succeed.'], hint:'The more/harder + you verb, the more + result', type:'translation' },
  { id:'d51-006', hindi:'न केवल वह होशियार है बल्कि वह बहुत मेहनती भी है।', english:'Not only is he intelligent but he is also very hardworking.', alternatives:['he is not only smart but also very diligent.'], hint:'Not only is + subject + but also', type:'translation' },
  { id:'d51-007', hindi:'मैं चाहे कितनी भी कोशिश करूँ, वह नहीं मानेगा।', english:'No matter how hard I try, he will not agree.', alternatives:['however hard i try, he will not agree.'], hint:'No matter how + adjective + I verb + result', type:'translation' },
  { id:'d51-008', hindi:'वह जैसे ही घर पहुँचा, बारिश शुरू हो गई।', english:'As soon as he reached home, it started raining.', alternatives:['the moment he got home, rain began.'], hint:'As soon as + Simple Past + Simple Past', type:'translation' },
  { id:'d51-009', hindi:'तुम्हारे बिना यह काम करना असंभव था।', english:'Without you, this work was impossible to do.', alternatives:['it was impossible to complete this work without you.'], hint:'Without + pronoun + was + impossible + to', type:'translation' },
  { id:'d51-010', hindi:'मैं उसके बारे में जो सुनता था, वह सच नहीं था।', english:'What I used to hear about him was not true.', alternatives:['the things i heard about him were untrue.'], hint:'What I used to hear + was not + adjective', type:'translation' },
  { id:'d51-011', hindi:'भले ही वह अमीर हो, वह ख़ुश नहीं है।', english:'Even though he is rich, he is not happy.', alternatives:['despite being wealthy, he is unhappy.'], hint:'Even though + Present + negative result', type:'translation' },
  { id:'d51-012', hindi:'उसने इतनी जल्दी में काम किया कि उसमें गलतियाँ हो गईं।', english:'He worked in such a hurry that mistakes crept in.', alternatives:['he was in such a rush that errors appeared.'], hint:'such a + noun + that + result', type:'translation' },
  { id:'d51-013', hindi:'तुम वही बन जाते हो जो तुम सोचते हो।', english:'You become what you think.', alternatives:['you are what you think.'], hint:'You become + what + you think', type:'translation' },
  { id:'d51-014', hindi:'जब तक तुम गलती मानना नहीं सीखोगे, तुम आगे नहीं बढ़ सकते।', english:'Until you learn to accept your mistakes, you cannot move forward.', alternatives:['you cannot progress until you accept your faults.'], hint:'Until you + learn to + accept + result', type:'translation' },
  { id:'d51-015', hindi:'जो बोया, वही काटोगे।', english:'You will reap what you sow.', alternatives:['as you sow, so shall you reap.'], hint:'Proverb structure: you will reap what you sow', type:'translation' },
  { id:'d51-016', hindi:'मुझे अफसोस है कि मैंने उसकी बात नहीं सुनी।', english:'I regret not listening to him.', alternatives:['i am sorry i did not listen to him.'], hint:'I regret + not + verb+ing', type:'translation' },
  { id:'d51-017', hindi:'वह बात करने के बजाय काम करता है।', english:'Instead of talking, he works.', alternatives:['he works rather than talking.'], hint:'Instead of + verb+ing + main clause', type:'translation' },
  { id:'d51-018', hindi:'उसने बिना सोचे-समझे निर्णय लिया।', english:'He made the decision without thinking.', alternatives:['he decided without any thought.'], hint:'made decision + without + verb+ing', type:'translation' },
  { id:'d51-019', hindi:'जितना अधिक तुम पढ़ोगे, उतना ज़्यादा जानोगे।', english:'The more you read, the more you will know.', alternatives:['reading more leads to knowing more.'], hint:'The more + you verb + the more + result', type:'translation' },
  { id:'d51-020', hindi:'मैं तब तक नहीं रुकूँगा जब तक मुझे जवाब नहीं मिलता।', english:'I will not stop until I get an answer.', alternatives:['i shall not rest until i receive a reply.'], hint:'will not stop + until + I get', type:'translation' },
];

// ============================================================
// Day 52 — Advance Level Sentences Part 2
// ============================================================
const DAY_52 = [
  { id:'d52-001', hindi:'अगर तुमने पहले कोशिश की होती, तो सफल हो जाते।', english:'If you had tried earlier, you would have succeeded.', alternatives:['had you tried before, you would have been successful.'], hint:'If + had + past participle + would have (Third Conditional)', type:'translation' },
  { id:'d52-002', hindi:'वह इतना बोलती है जैसे सब कुछ जानती हो।', english:'She talks as if she knows everything.', alternatives:['she speaks as though she knows it all.'], hint:'talks as if + she knows (present unreal)', type:'translation' },
  { id:'d52-003', hindi:'मुझे मालूम था कि कुछ गड़बड़ होने वाला है।', english:'I had a feeling that something was going to go wrong.', alternatives:['i sensed that something would go wrong.'], hint:'I had a feeling that + past progressive', type:'translation' },
  { id:'d52-004', hindi:'तुम्हारी बात सुनकर मुझे बहुत अच्छा लगा।', english:'Hearing you made me feel very good.', alternatives:['listening to you made me feel great.'], hint:'verb+ing + made me feel + adjective', type:'translation' },
  { id:'d52-005', hindi:'वह ऐसा बोल रहा था जैसे वह मालिक हो।', english:'He was speaking as though he were the boss.', alternatives:['he spoke as if he owned the place.'], hint:'speaking as though + were (unreal comparison)', type:'translation' },
  { id:'d52-006', hindi:'इसमें कोई शक नहीं कि वह सबसे बेहतरीन है।', english:'There is no doubt that he is the best.', alternatives:['it is beyond doubt that he is the finest.'], hint:'There is no doubt that + Simple Present', type:'translation' },
  { id:'d52-007', hindi:'वह जो कुछ भी करती है, पूरी लगन से करती है।', english:'Whatever she does, she does it with complete dedication.', alternatives:['she does everything with full commitment.'], hint:'Whatever + subject + does + result', type:'translation' },
  { id:'d52-008', hindi:'मैं इसके बारे में जितना सोचता हूँ, उतना उलझता जाता हूँ।', english:'The more I think about it, the more confused I get.', alternatives:['thinking about it makes me more confused.'], hint:'The more + I think + the more confused', type:'translation' },
  { id:'d52-009', hindi:'पैसा महत्वपूर्ण है लेकिन स्वास्थ्य सबसे ज़रूरी है।', english:'Money is important but health is the most essential.', alternatives:['money matters but health is paramount.'], hint:'X is important but Y is most essential', type:'translation' },
  { id:'d52-010', hindi:'उसे याद है जब वह बच्चा था।', english:'He remembers when he was a child.', alternatives:['he recalls his childhood days.'], hint:'remembers + when + he was + noun/adjective', type:'translation' },
  { id:'d52-011', hindi:'यह वही जगह है जहाँ वह पला-बढ़ा।', english:'This is the very place where he grew up.', alternatives:['this is the place he grew up in.'], hint:'This is the place where + subject + grew up', type:'translation' },
  { id:'d52-012', hindi:'वह चाहे जहाँ भी जाए, खुशियाँ लेकर आता है।', english:'Wherever he goes, he brings happiness.', alternatives:['he spreads happiness wherever he goes.'], hint:'Wherever + subject + goes + result', type:'translation' },
  { id:'d52-013', hindi:'उसकी मेहनत ही उसकी सबसे बड़ी ताकत है।', english:'His hard work is his greatest strength.', alternatives:['his dedication is his biggest asset.'], hint:'His + noun + is his + adjective + noun', type:'translation' },
  { id:'d52-014', hindi:'अगर समय होता तो मैं ज़रूर आता।', english:'If I had time, I would definitely come.', alternatives:['i would come if i had the time.'], hint:'If + had + noun + would + definitely + base verb', type:'translation' },
  { id:'d52-015', hindi:'वह जो सोचता है वह दिल से कहता है।', english:'He says from the heart what he thinks.', alternatives:['what he thinks, he speaks from the heart.'], hint:'says from the heart + what + he thinks', type:'translation' },
  { id:'d52-016', hindi:'इसमें कोई दो राय नहीं कि हम सब भाई हैं।', english:'There is no question that we are all brothers.', alternatives:['undeniably, we are all brothers.'], hint:'There is no question that + we are + noun', type:'translation' },
  { id:'d52-017', hindi:'जितना कम बोलो, उतना अच्छा।', english:'The less you speak, the better.', alternatives:['silence is golden — speak less.'], hint:'The less + you speak + the better', type:'translation' },
  { id:'d52-018', hindi:'उसने एक ऐसा रास्ता चुना जो किसी ने पहले नहीं चुना था।', english:'He chose a path that no one had chosen before.', alternatives:['he took a route that nobody had taken before.'], hint:'chose a path + that + no one had + past participle', type:'translation' },
  { id:'d52-019', hindi:'मैं उस दिन को कभी नहीं भूल सकता जब हम पहली बार मिले।', english:'I can never forget the day when we first met.', alternatives:['i will always remember the day we first met.'], hint:'can never forget + the day + when + Simple Past', type:'translation' },
  { id:'d52-020', hindi:'सफलता उन्हीं को मिलती है जो हार नहीं मानते।', english:'Success comes only to those who never give up.', alternatives:['only those who persist achieve success.'], hint:'Success comes to + those who + never + verb', type:'translation' },
];

// ============================================================
// Day 53 — Verb List (Most Important Verbs with V1/V2/V3 + Hindi)
// ============================================================
const DAY_53 = [
  { id:'d53-001', hindi:'वह रोज़ सुबह जल्दी उठता है। (उठना)', english:'He wakes up early every morning. (wake - woke - woken)', alternatives:['he gets up early every morning.'], hint:'wake / woke / woken', type:'translation' },
  { id:'d53-002', hindi:'मैंने कल रात बहुत अच्छा खाना खाया। (खाना)', english:'I ate very good food last night. (eat - ate - eaten)', alternatives:['i had a great meal last night.'], hint:'eat / ate / eaten', type:'translation' },
  { id:'d53-003', hindi:'वह बहुत तेज़ भागती है। (दौड़ना)', english:'She runs very fast. (run - ran - run)', alternatives:['she is a very fast runner.'], hint:'run / ran / run', type:'translation' },
  { id:'d53-004', hindi:'उसने मुझे एक पत्र लिखा। (लिखना)', english:'He wrote me a letter. (write - wrote - written)', alternatives:['he sent me a letter.'], hint:'write / wrote / written', type:'translation' },
  { id:'d53-005', hindi:'वह पिछले महीने यहाँ आई। (आना)', english:'She came here last month. (come - came - come)', alternatives:['she visited here last month.'], hint:'come / came / come', type:'translation' },
  { id:'d53-006', hindi:'बच्चे पार्क में खेले। (खेलना)', english:'Children played in the park. (play - played - played)', alternatives:['the kids played at the park.'], hint:'play / played / played (regular)', type:'translation' },
  { id:'d53-007', hindi:'मैंने नई किताब खरीदी। (खरीदना)', english:'I bought a new book. (buy - bought - bought)', alternatives:['i purchased a new book.'], hint:'buy / bought / bought', type:'translation' },
  { id:'d53-008', hindi:'वह हर रात ख़्वाब देखता है। (सोना/देखना)', english:'He dreams every night. (dream - dreamed/dreamt - dreamed/dreamt)', alternatives:['he has dreams every night.'], hint:'dream / dreamed/dreamt / dreamed/dreamt', type:'translation' },
  { id:'d53-009', hindi:'मैंने उससे बात की। (बात करना)', english:'I spoke to him. (speak - spoke - spoken)', alternatives:['i talked to him.'], hint:'speak / spoke / spoken', type:'translation' },
  { id:'d53-010', hindi:'उसने कमरा साफ़ किया। (करना/साफ़ करना)', english:'She cleaned the room. (clean - cleaned - cleaned)', alternatives:['she tidied up the room.'], hint:'clean / cleaned / cleaned (regular)', type:'translation' },
  { id:'d53-011', hindi:'वह गाना गाती है। (गाना)', english:'She sings a song. (sing - sang - sung)', alternatives:['she sings beautifully.'], hint:'sing / sang / sung', type:'translation' },
  { id:'d53-012', hindi:'मैंने अपना नाश्ता तैयार किया। (बनाना)', english:'I made my breakfast. (make - made - made)', alternatives:['i prepared my breakfast.'], hint:'make / made / made', type:'translation' },
  { id:'d53-013', hindi:'वह कल ऑफिस जाएगा। (जाना)', english:'He will go to the office tomorrow. (go - went - gone)', alternatives:['he will head to office tomorrow.'], hint:'go / went / gone', type:'translation' },
  { id:'d53-014', hindi:'हम आज जल्दी घर आ गए। (आना)', english:'We came home early today. (come - came - come)', alternatives:['we returned home early today.'], hint:'come / came / come', type:'translation' },
  { id:'d53-015', hindi:'उसने मुझे सच बताया। (बताना)', english:'She told me the truth. (tell - told - told)', alternatives:['she spoke the truth to me.'], hint:'tell / told / told', type:'translation' },
  { id:'d53-016', hindi:'बच्चे ने गिलास तोड़ा। (तोड़ना)', english:'The child broke the glass. (break - broke - broken)', alternatives:['the kid broke the glass.'], hint:'break / broke / broken', type:'translation' },
  { id:'d53-017', hindi:'वह तेज़ आवाज़ में हँसा। (हँसना)', english:'He laughed loudly. (laugh - laughed - laughed)', alternatives:['he burst out laughing.'], hint:'laugh / laughed / laughed (regular)', type:'translation' },
  { id:'d53-018', hindi:'मैंने उसे एक तोहफा दिया। (देना)', english:'I gave him a gift. (give - gave - given)', alternatives:['i presented him a gift.'], hint:'give / gave / given', type:'translation' },
  { id:'d53-019', hindi:'वह पुस्तक पढ़ रहा है। (पढ़ना)', english:'He is reading a book. (read - read - read)', alternatives:['he is going through a book.'], hint:'read / read / read (pronunciation changes)', type:'translation' },
  { id:'d53-020', hindi:'बच्चे ने रोया। (रोना)', english:'The child cried. (cry - cried - cried)', alternatives:['the baby wept.'], hint:'cry / cried / cried (regular)', type:'translation' },
  { id:'d53-021', hindi:'उसने परीक्षा दी। (देना)', english:'He gave the exam. (give - gave - given)', alternatives:['he appeared in the exam.'], hint:'give an exam = take an exam', type:'translation' },
  { id:'d53-022', hindi:'वह बहुत जल्दी सीखती है। (सीखना)', english:'She learns very quickly. (learn - learned/learnt - learned/learnt)', alternatives:['she picks up things fast.'], hint:'learn / learned / learned (regular)', type:'translation' },
  { id:'d53-023', hindi:'मैंने अपनी ज़िम्मेदारी निभाई। (निभाना)', english:'I fulfilled my responsibility. (fulfill - fulfilled - fulfilled)', alternatives:['i carried out my duty.'], hint:'fulfill / fulfilled / fulfilled', type:'translation' },
  { id:'d53-024', hindi:'वे सब मिलकर काम करते हैं। (काम करना)', english:'They all work together. (work - worked - worked)', alternatives:['they collaborate well.'], hint:'work / worked / worked (regular)', type:'translation' },
  { id:'d53-025', hindi:'उसने नई जगह visit की। (visit करना)', english:'She visited a new place. (visit - visited - visited)', alternatives:['she explored a new location.'], hint:'visit / visited / visited (regular)', type:'translation' },
];

// ============================================================
// Day 54 — Idioms, Phrases & Proverbs
// ============================================================
const DAY_54 = [
  { id:'d54-001', hindi:'वह हमेशा कठिन मेहनत करता है।', english:'He always burns the midnight oil.', alternatives:['he always works very hard late at night.'], hint:'Burn the midnight oil = रात भर मेहनत करना', type:'translation' },
  { id:'d54-002', hindi:'वह बातों में बहुत माहिर है।', english:'He has a way with words.', alternatives:['he is very good at communicating.'], hint:'Have a way with words = बोलने में माहिर होना', type:'translation' },
  { id:'d54-003', hindi:'इस काम में बहुत पैसा है।', english:'This work is a gold mine.', alternatives:['this business is very profitable.'], hint:'Gold mine = बहुत फायदेमंद', type:'translation' },
  { id:'d54-004', hindi:'उसने आखिरकार बात मान ली।', english:'He finally came around.', alternatives:['he eventually agreed.'], hint:'Come around = मान जाना/बदल जाना', type:'translation' },
  { id:'d54-005', hindi:'मेरे पास अभी समय नहीं है।', english:'I am tied up right now.', alternatives:["i'm busy at the moment."], hint:'Tied up = व्यस्त होना', type:'translation' },
  { id:'d54-006', hindi:'वह अपना वादा पूरा नहीं करती।', english:'She always lets people down.', alternatives:['she never keeps her word.'], hint:'Let someone down = निराश करना', type:'translation' },
  { id:'d54-007', hindi:'वह बहुत ही खुले दिल का इंसान है।', english:'He is a very big-hearted person.', alternatives:['he is an extremely generous person.'], hint:'Big-hearted = उदार/दयालु', type:'translation' },
  { id:'d54-008', hindi:'इस मामले में अभी नहीं बोलना चाहिए।', english:'We should not let the cat out of the bag yet.', alternatives:["we shouldn't reveal this secret yet."], hint:'Let the cat out of the bag = राज़ खोल देना', type:'translation' },
  { id:'d54-009', hindi:'वह हमेशा तुम्हारी बात काटता है।', english:'He always cuts you off.', alternatives:['he always interrupts you.'], hint:'Cut someone off = बात के बीच में काटना', type:'translation' },
  { id:'d54-010', hindi:'वह हमेशा दूसरों पर भरोसा करता है।', english:'He always takes things at face value.', alternatives:['he always trusts others blindly.'], hint:'Take at face value = बिना सोचे विश्वास करना', type:'translation' },
  { id:'d54-011', hindi:'अब तुम उसकी तरफ से बोल रहे हो।', english:'Now you are taking his side.', alternatives:['now you are siding with him.'], hint:'Take someone\'s side = किसी का पक्ष लेना', type:'translation' },
  { id:'d54-012', hindi:'वह मुश्किल में है।', english:'He is in hot water.', alternatives:['he is in trouble.'], hint:'In hot water = मुसीबत में', type:'translation' },
  { id:'d54-013', hindi:'सभी सफल लोग शुरुआत में संघर्ष करते हैं।', english:'Every cloud has a silver lining.', alternatives:['there is hope even in difficult times.'], hint:'Every cloud has a silver lining = हर मुश्किल में उम्मीद होती है', type:'translation' },
  { id:'d54-014', hindi:'जो बोया वो काटोगे।', english:'You reap what you sow.', alternatives:['as you sow so shall you reap.'], hint:'You reap what you sow = करनी का फल', type:'translation' },
  { id:'d54-015', hindi:'उसने मुझे पूरी जानकारी दी।', english:'He filled me in on everything.', alternatives:['he briefed me on everything.'], hint:'Fill someone in = जानकारी देना', type:'translation' },
  { id:'d54-016', hindi:'बिना परिश्रम के कुछ नहीं मिलता।', english:'No pain, no gain.', alternatives:['nothing comes without hard work.'], hint:'No pain no gain = मेहनत के बिना कुछ नहीं मिलता', type:'translation' },
  { id:'d54-017', hindi:'वह हमेशा काम टालता रहता है।', english:'He always puts things off.', alternatives:['he always procrastinates.'], hint:'Put off = काम को आगे टालना', type:'translation' },
  { id:'d54-018', hindi:'पहले सोचो, फिर बोलो।', english:'Look before you leap.', alternatives:['think before you act.'], hint:'Look before you leap = पहले सोचो फिर करो', type:'translation' },
  { id:'d54-019', hindi:'वह हमेशा पैसे बचाता है।', english:'He always saves for a rainy day.', alternatives:['he saves money for tough times.'], hint:'Save for a rainy day = मुश्किल के लिए बचत करना', type:'translation' },
  { id:'d54-020', hindi:'तुम हर जगह जाते हो — घुमक्कड़ हो।', english:'You have itchy feet.', alternatives:['you love to travel and roam.'], hint:'Itchy feet = यात्रा करने की इच्छा', type:'translation' },
  { id:'d54-021', hindi:'इस मुश्किल में उसने मेरा साथ दिया।', english:'He stood by me in this difficult time.', alternatives:['he supported me through this challenge.'], hint:'Stand by someone = साथ खड़े रहना', type:'translation' },
  { id:'d54-022', hindi:'इस नौकरी में बड़ा भविष्य है।', english:'This job has a bright future.', alternatives:['there is a lot of potential in this job.'], hint:'Bright future = उज्जवल भविष्य', type:'translation' },
  { id:'d54-023', hindi:'वह अचानक मेरे दिमाग में आया।', english:'It struck me suddenly.', alternatives:['the idea hit me out of the blue.'], hint:'Strike/Hit = अचानक याद आना', type:'translation' },
  { id:'d54-024', hindi:'जल्दी का काम शैतान का।', english:'Haste makes waste.', alternatives:['rushing things leads to mistakes.'], hint:'Haste makes waste = जल्दबाज़ी में गलतियाँ होती हैं', type:'translation' },
  { id:'d54-025', hindi:'बड़ों का सम्मान करो।', english:'Respect your elders.', alternatives:['always show respect to elders.'], hint:'Respect your elders = proverb', type:'translation' },
];

// ============================================================
// Day 55 — Important Vocabulary (Professional & Daily Use Words)
// ============================================================
const DAY_55 = [
  { id:'d55-001', hindi:'यह काम बहुत ज़रूरी है।', english:'This work is very important.', alternatives:['this task is crucial.'], hint:'important / crucial / essential', type:'translation' },
  { id:'d55-002', hindi:'उसका व्यवहार बहुत विनम्र है।', english:'Her behaviour is very polite.', alternatives:['she is very courteous.'], hint:'polite / courteous / well-mannered', type:'translation' },
  { id:'d55-003', hindi:'वह बहुत भरोसेमंद इंसान है।', english:'He is a very reliable person.', alternatives:['he is a very trustworthy person.'], hint:'reliable / trustworthy / dependable', type:'translation' },
  { id:'d55-004', hindi:'इस प्रोजेक्ट में बहुत मेहनत लगी।', english:'This project required a lot of effort.', alternatives:['a lot of hard work went into this project.'], hint:'effort / hard work / dedication', type:'translation' },
  { id:'d55-005', hindi:'उसकी क्षमता बहुत अच्छी है।', english:'His capability is very good.', alternatives:['he has excellent ability.'], hint:'capability / ability / skill', type:'translation' },
  { id:'d55-006', hindi:'वह बहुत उत्साही है।', english:'She is very enthusiastic.', alternatives:['she is very energetic and eager.'], hint:'enthusiastic / eager / passionate', type:'translation' },
  { id:'d55-007', hindi:'यह समझौता बहुत फायदेमंद रहा।', english:'This agreement was very beneficial.', alternatives:['this deal was very profitable.'], hint:'beneficial / profitable / advantageous', type:'translation' },
  { id:'d55-008', hindi:'उसके पास बहुत अनुभव है।', english:'He has a lot of experience.', alternatives:['he is very experienced.'], hint:'experience / expertise / knowledge', type:'translation' },
  { id:'d55-009', hindi:'यह निर्णय बहुत समझदारी का था।', english:'This was a very wise decision.', alternatives:['this was a very sensible choice.'], hint:'wise / sensible / smart decision', type:'translation' },
  { id:'d55-010', hindi:'वह बहुत प्रेरणादायक है।', english:'She is very inspiring.', alternatives:['she is very motivating.'], hint:'inspiring / motivating / encouraging', type:'translation' },
  { id:'d55-011', hindi:'मुझे इस काम में संतुष्टि मिलती है।', english:'I get satisfaction from this work.', alternatives:['this work gives me fulfillment.'], hint:'satisfaction / fulfillment / contentment', type:'translation' },
  { id:'d55-012', hindi:'उसकी प्रस्तुति बहुत प्रभावशाली थी।', english:'His presentation was very impressive.', alternatives:['his presentation was outstanding.'], hint:'impressive / outstanding / remarkable', type:'translation' },
  { id:'d55-013', hindi:'यह परियोजना अभी प्रारंभिक चरण में है।', english:'This project is still in the preliminary stage.', alternatives:['this project is in the early phase.'], hint:'preliminary / initial / early stage', type:'translation' },
  { id:'d55-014', hindi:'वह बातों में बहुत स्पष्ट है।', english:'She is very clear in her communication.', alternatives:['she communicates very clearly.'], hint:'clear / articulate / precise', type:'translation' },
  { id:'d55-015', hindi:'उसकी कुशलता बेमिसाल है।', english:'Her efficiency is unmatched.', alternatives:['her competence is outstanding.'], hint:'efficiency / competence / proficiency', type:'translation' },
  { id:'d55-016', hindi:'मेरे लिए यह एक चुनौती है।', english:'This is a challenge for me.', alternatives:['this is a tough task for me.'], hint:'challenge / difficulty / obstacle', type:'translation' },
  { id:'d55-017', hindi:'वह हमेशा बेहतर परिणाम देता है।', english:'He always delivers better results.', alternatives:['he consistently produces better outcomes.'], hint:'results / outcomes / performance', type:'translation' },
  { id:'d55-018', hindi:'इस मीटिंग का उद्देश्य क्या है?', english:'What is the purpose of this meeting?', alternatives:['what is the objective of this meeting?'], hint:'purpose / objective / aim / goal', type:'translation' },
  { id:'d55-019', hindi:'हमें इस समस्या का त्वरित समाधान चाहिए।', english:'We need a quick solution to this problem.', alternatives:['we require an immediate fix for this problem.'], hint:'solution / fix / remedy + quick/immediate', type:'translation' },
  { id:'d55-020', hindi:'उसके काम की बहुत प्रशंसा होती है।', english:'His work is greatly appreciated.', alternatives:['people highly appreciate his work.'], hint:'appreciated / praised / valued', type:'translation' },
];

// ============================================================
// Day 56 — Miscellaneous Vocabulary (Nouns + Adjectives)
// ============================================================
const DAY_56 = [
  { id:'d56-001', hindi:'यह एक उचित क़दम है।', english:'This is an appropriate step.', alternatives:['this is a suitable action.'], hint:'appropriate / suitable / proper', type:'translation' },
  { id:'d56-002', hindi:'वह बहुत जिद्दी इंसान है।', english:'He is a very stubborn person.', alternatives:['he is very adamant.'], hint:'stubborn / adamant / obstinate', type:'translation' },
  { id:'d56-003', hindi:'उसकी बहुत बड़ी महत्वाकांक्षा है।', english:'She has very big ambitions.', alternatives:['she is very ambitious.'], hint:'ambition / goal / aspiration', type:'translation' },
  { id:'d56-004', hindi:'वह बहुत ईमानदार है।', english:'He is very honest.', alternatives:['he is very sincere.'], hint:'honest / sincere / truthful', type:'translation' },
  { id:'d56-005', hindi:'इस स्थिति में बहुत सावधानी की ज़रूरत है।', english:'This situation requires a lot of caution.', alternatives:['great care is needed in this situation.'], hint:'caution / care / alertness', type:'translation' },
  { id:'d56-006', hindi:'उसके पास बहुत धैर्य है।', english:'He has a lot of patience.', alternatives:['he is very patient.'], hint:'patience / tolerance / perseverance', type:'translation' },
  { id:'d56-007', hindi:'यह स्थिति बहुत जटिल है।', english:'This situation is very complex.', alternatives:['this is a very complicated situation.'], hint:'complex / complicated / intricate', type:'translation' },
  { id:'d56-008', hindi:'वह बहुत साहसी है।', english:'She is very courageous.', alternatives:['she is very brave.'], hint:'courageous / brave / daring', type:'translation' },
  { id:'d56-009', hindi:'इसमें बहुत रचनात्मकता की ज़रूरत है।', english:'This requires a lot of creativity.', alternatives:['it needs a lot of imagination.'], hint:'creativity / imagination / innovation', type:'translation' },
  { id:'d56-010', hindi:'उसका व्यक्तित्व बहुत आकर्षक है।', english:'His personality is very attractive.', alternatives:['he has a very charming personality.'], hint:'attractive / charming / appealing', type:'translation' },
  { id:'d56-011', hindi:'वह बहुत सहयोगी है।', english:'She is very cooperative.', alternatives:['she is very collaborative.'], hint:'cooperative / helpful / supportive', type:'translation' },
  { id:'d56-012', hindi:'यह एक दुर्लभ अवसर है।', english:'This is a rare opportunity.', alternatives:['this is an uncommon chance.'], hint:'rare / uncommon / exceptional', type:'translation' },
  { id:'d56-013', hindi:'उसका दृष्टिकोण बहुत व्यावहारिक है।', english:'His approach is very practical.', alternatives:['his mindset is very realistic.'], hint:'practical / realistic / pragmatic', type:'translation' },
  { id:'d56-014', hindi:'यह एक बहुत संवेदनशील मामला है।', english:'This is a very sensitive matter.', alternatives:['this is a delicate issue.'], hint:'sensitive / delicate / touchy', type:'translation' },
  { id:'d56-015', hindi:'वह बहुत उदार इंसान है।', english:'He is a very generous person.', alternatives:['he is very giving and charitable.'], hint:'generous / charitable / giving', type:'translation' },
];

// ============================================================
// Day 57 — Stationery Vocabulary
// ============================================================
const DAY_57 = [
  { id:'d57-001', hindi:'मुझे एक पेन चाहिए।', english:'I need a pen.', alternatives:['i want a pen.'], hint:'pen = लिखने की कलम', type:'translation' },
  { id:'d57-002', hindi:'कृपया मुझे एक पेंसिल दो।', english:'Please give me a pencil.', alternatives:['can you give me a pencil?'], hint:'pencil = पेंसिल', type:'translation' },
  { id:'d57-003', hindi:'मेरी इरेज़र कहाँ है?', english:'Where is my eraser?', alternatives:['where did i put my eraser?'], hint:'eraser = रबड़', type:'translation' },
  { id:'d57-004', hindi:'कागज़ पर लिखो।', english:'Write on the paper.', alternatives:['put it down on paper.'], hint:'paper = कागज़', type:'translation' },
  { id:'d57-005', hindi:'इस नोटबुक में लिखो।', english:'Write in this notebook.', alternatives:['note it down in this notebook.'], hint:'notebook = कॉपी/नोटबुक', type:'translation' },
  { id:'d57-006', hindi:'उसने रूलर से लाइन खींची।', english:'She drew a line with the ruler.', alternatives:['she drew a straight line using the ruler.'], hint:'ruler = पट्टी', type:'translation' },
  { id:'d57-007', hindi:'कैंची से कागज़ काटो।', english:'Cut the paper with scissors.', alternatives:['use scissors to cut the paper.'], hint:'scissors = कैंची', type:'translation' },
  { id:'d57-008', hindi:'पेपर को स्टेपल करो।', english:'Staple the papers together.', alternatives:['use a stapler to attach them.'], hint:'staple = स्टेपल करना', type:'translation' },
  { id:'d57-009', hindi:'उसने ग्लू से चिपकाया।', english:'She glued it with adhesive.', alternatives:['she stuck it with glue.'], hint:'glue / adhesive = गोंद', type:'translation' },
  { id:'d57-010', hindi:'मेरे पास एक हाइलाइटर है।', english:'I have a highlighter.', alternatives:['i own a marker pen.'], hint:'highlighter = महत्वपूर्ण चीज़ें mark करने वाला', type:'translation' },
  { id:'d57-011', hindi:'स्केल से नापो।', english:'Measure with the scale.', alternatives:['use the ruler to measure.'], hint:'scale/ruler = नापने की पट्टी', type:'translation' },
  { id:'d57-012', hindi:'पिन से कागज़ लगाओ।', english:'Pin the paper to the board.', alternatives:['attach the paper with a pin.'], hint:'pin = पिन', type:'translation' },
  { id:'d57-013', hindi:'मैंने रिपोर्ट फ़ाइल में रखी।', english:'I put the report in the file.', alternatives:['i filed the report.'], hint:'file = फ़ाइल', type:'translation' },
  { id:'d57-014', hindi:'उसने मार्कर से लिखा।', english:'He wrote with a marker.', alternatives:['he used a marker to write.'], hint:'marker = मार्कर', type:'translation' },
  { id:'d57-015', hindi:'मेरे पास एक शार्पनर है।', english:'I have a pencil sharpener.', alternatives:['i own a sharpener.'], hint:'sharpener = पेंसिल छीलने वाला', type:'translation' },
];

// ============================================================
// Day 58 — Foods Vocabulary & Tastes
// ============================================================
const DAY_58 = [
  { id:'d58-001', hindi:'यह खाना बहुत मीठा है।', english:'This food is very sweet.', alternatives:['this dish is very sweet.'], hint:'sweet = मीठा', type:'translation' },
  { id:'d58-002', hindi:'यह करेला बहुत कड़वा है।', english:'This bitter gourd is very bitter.', alternatives:['the bitter gourd tastes very bitter.'], hint:'bitter = कड़वा', type:'translation' },
  { id:'d58-003', hindi:'नींबू बहुत खट्टा है।', english:'Lemon is very sour.', alternatives:['lemon has a very sour taste.'], hint:'sour = खट्टा', type:'translation' },
  { id:'d58-004', hindi:'यह मिर्च बहुत तीखी है।', english:'This chilli is very spicy.', alternatives:['this pepper is very hot.'], hint:'spicy / hot = तीखा', type:'translation' },
  { id:'d58-005', hindi:'नमक का स्वाद नमकीन है।', english:'Salt has a salty taste.', alternatives:['salt tastes salty.'], hint:'salty = नमकीन', type:'translation' },
  { id:'d58-006', hindi:'मुझे तंदूरी चिकन बहुत पसंद है।', english:'I love tandoori chicken.', alternatives:['i really enjoy tandoori chicken.'], hint:'tandoori chicken = एक भारतीय व्यंजन', type:'translation' },
  { id:'d58-007', hindi:'वह शाकाहारी है।', english:'He is a vegetarian.', alternatives:['he does not eat meat.'], hint:'vegetarian = शाकाहारी', type:'translation' },
  { id:'d58-008', hindi:'वह माँसाहारी है।', english:'She is a non-vegetarian.', alternatives:['she eats meat.'], hint:'non-vegetarian = माँसाहारी', type:'translation' },
  { id:'d58-009', hindi:'मुझे दाल-चावल बहुत पसंद है।', english:'I love lentils and rice.', alternatives:['dal chawal is my favourite food.'], hint:'lentils = दाल', type:'translation' },
  { id:'d58-010', hindi:'यह खाना बहुत स्वादिष्ट है।', english:'This food is very delicious.', alternatives:['this dish is very tasty.'], hint:'delicious / tasty = स्वादिष्ट', type:'translation' },
  { id:'d58-011', hindi:'मुझे चाय के साथ बिस्किट पसंद हैं।', english:'I like biscuits with tea.', alternatives:['i enjoy having biscuits with my tea.'], hint:'biscuits = बिस्कुट', type:'translation' },
  { id:'d58-012', hindi:'यह दूध ताज़ा है।', english:'This milk is fresh.', alternatives:['the milk is very fresh.'], hint:'fresh = ताज़ा', type:'translation' },
  { id:'d58-013', hindi:'मुझे मसाला डोसा बहुत पसंद है।', english:'I love masala dosa.', alternatives:['masala dosa is my favourite.'], hint:'masala dosa = दक्षिण भारतीय व्यंजन', type:'translation' },
  { id:'d58-014', hindi:'उसने नाश्ते में परांठा खाया।', english:'He had paratha for breakfast.', alternatives:['he ate paratha at breakfast.'], hint:'breakfast = नाश्ता, paratha = Indian flatbread', type:'translation' },
  { id:'d58-015', hindi:'यह खाना थोड़ा नमकीन है।', english:'This food is a little salty.', alternatives:['this dish is slightly salty.'], hint:'a little + adjective = थोड़ा', type:'translation' },
];

// ============================================================
// Day 59 — Relation & Weather Vocabulary
// ============================================================
const DAY_59 = [
  // Relations
  { id:'d59-001', hindi:'वह मेरे पिता के बड़े भाई हैं।', english:'He is my father\'s elder brother.', alternatives:['he is my uncle.'], hint:'elder brother = बड़ा भाई', type:'translation' },
  { id:'d59-002', hindi:'वह मेरी माँ की बहन है।', english:'She is my mother\'s sister.', alternatives:["she is my mother's sibling."], hint:'sister = बहन', type:'translation' },
  { id:'d59-003', hindi:'मेरे नाना-नानी गाँव में रहते हैं।', english:'My maternal grandparents live in the village.', alternatives:['my grandparents from my mother\'s side live in a village.'], hint:'maternal grandparents = नाना-नानी', type:'translation' },
  { id:'d59-004', hindi:'वह मेरा चचेरा भाई है।', english:'He is my cousin brother.', alternatives:['he is my cousin.'], hint:'cousin = चचेरा/ममेरा भाई-बहन', type:'translation' },
  { id:'d59-005', hindi:'उसकी शादी हो गई है।', english:'She is married.', alternatives:['she has gotten married.'], hint:'married = विवाहित', type:'translation' },
  { id:'d59-006', hindi:'मेरे ससुर बहुत अच्छे हैं।', english:'My father-in-law is very good.', alternatives:['my father in law is kind.'], hint:'father-in-law = ससुर', type:'translation' },
  { id:'d59-007', hindi:'वह मेरी भाभी है।', english:'She is my sister-in-law.', alternatives:["she is my brother's wife."], hint:'sister-in-law = भाभी / ननद', type:'translation' },
  { id:'d59-008', hindi:'उसके दो बेटे और एक बेटी है।', english:'She has two sons and one daughter.', alternatives:['she has 2 boys and a girl.'], hint:'sons = बेटे, daughter = बेटी', type:'translation' },
  // Weather
  { id:'d59-009', hindi:'आज बहुत गर्मी है।', english:'It is very hot today.', alternatives:["today's weather is very hot."], hint:'hot = गर्म', type:'translation' },
  { id:'d59-010', hindi:'कल बारिश होगी।', english:'It will rain tomorrow.', alternatives:['tomorrow is going to be rainy.'], hint:'rain = बारिश', type:'translation' },
  { id:'d59-011', hindi:'आज बहुत ठंड है।', english:'It is very cold today.', alternatives:["today's weather is freezing."], hint:'cold = ठंडा', type:'translation' },
  { id:'d59-012', hindi:'आसमान में बादल हैं।', english:'There are clouds in the sky.', alternatives:['the sky is cloudy.'], hint:'clouds = बादल', type:'translation' },
  { id:'d59-013', hindi:'बाहर तेज़ धूप है।', english:'There is bright sunshine outside.', alternatives:['it is very sunny outside.'], hint:'sunshine = धूप', type:'translation' },
  { id:'d59-014', hindi:'मौसम बहुत सुहावना है।', english:'The weather is very pleasant.', alternatives:['the climate is very nice today.'], hint:'pleasant = सुहावना', type:'translation' },
  { id:'d59-015', hindi:'तेज़ आँधी चल रही है।', english:'There is a strong storm.', alternatives:['a heavy storm is blowing.'], hint:'storm = आँधी/तूफ़ान', type:'translation' },
];

// ============================================================
// Day 60 — Professions & Occupations Vocabulary
// ============================================================
const DAY_60 = [
  { id:'d60-001', hindi:'वह एक डॉक्टर है।', english:'He is a doctor.', alternatives:['he works as a physician.'], hint:'doctor = डॉक्टर', type:'translation' },
  { id:'d60-002', hindi:'मेरी माँ एक शिक्षिका हैं।', english:'My mother is a teacher.', alternatives:['my mother works as an educator.'], hint:'teacher = शिक्षक/शिक्षिका', type:'translation' },
  { id:'d60-003', hindi:'वह एक सॉफ्टवेयर इंजीनियर है।', english:'He is a software engineer.', alternatives:['he works as an IT professional.'], hint:'software engineer = IT professional', type:'translation' },
  { id:'d60-004', hindi:'उसने वकील बनने का सपना देखा।', english:'She dreamed of becoming a lawyer.', alternatives:['she aspired to be an advocate.'], hint:'lawyer / advocate = वकील', type:'translation' },
  { id:'d60-005', hindi:'वह एक पत्रकार है।', english:'He is a journalist.', alternatives:['he works as a reporter.'], hint:'journalist / reporter = पत्रकार', type:'translation' },
  { id:'d60-006', hindi:'वह एक नर्स के रूप में काम करती है।', english:'She works as a nurse.', alternatives:['she is a nursing professional.'], hint:'nurse = नर्स', type:'translation' },
  { id:'d60-007', hindi:'मेरे पिता एक किसान हैं।', english:'My father is a farmer.', alternatives:['my father is an agriculturist.'], hint:'farmer = किसान', type:'translation' },
  { id:'d60-008', hindi:'वह एक पायलट है।', english:'He is a pilot.', alternatives:['he works as an aviator.'], hint:'pilot = उड़ान-चालक', type:'translation' },
  { id:'d60-009', hindi:'वह एक architect है।', english:'She is an architect.', alternatives:['she designs buildings.'], hint:'architect = वास्तुकार', type:'translation' },
  { id:'d60-010', hindi:'उसने व्यवसायी बनने का फैसला किया।', english:'He decided to become a businessman.', alternatives:['he chose to be an entrepreneur.'], hint:'businessman / entrepreneur = व्यापारी', type:'translation' },
  { id:'d60-011', hindi:'वह एक पुलिस अधिकारी है।', english:'He is a police officer.', alternatives:['he is a law enforcement officer.'], hint:'police officer = पुलिस अधिकारी', type:'translation' },
  { id:'d60-012', hindi:'उसने सेना में भर्ती होने का मन बनाया।', english:'She made up her mind to join the army.', alternatives:['she decided to enlist in the military.'], hint:'army / military = सेना', type:'translation' },
  { id:'d60-013', hindi:'मेरा भाई एक CA है।', english:'My brother is a Chartered Accountant.', alternatives:['my brother is a CA.'], hint:'Chartered Accountant = CA', type:'translation' },
  { id:'d60-014', hindi:'वह एक कलाकार है।', english:'She is an artist.', alternatives:['she is a creative professional.'], hint:'artist = कलाकार', type:'translation' },
  { id:'d60-015', hindi:'वह एक web designer है।', english:'He is a web designer.', alternatives:['he designs websites.'], hint:'web designer = वेबसाइट बनाने वाला', type:'translation' },
];

// ============================================================
// Day 61 — Buildings, Worms & Insects Vocabulary
// ============================================================
const DAY_61 = [
  { id:'d61-001', hindi:'वह पुरानी इमारत टूट रही है।', english:'That old building is collapsing.', alternatives:['the old structure is falling apart.'], hint:'building = इमारत', type:'translation' },
  { id:'d61-002', hindi:'कक्षा में एक मकड़ी है।', english:'There is a spider in the classroom.', alternatives:['a spider has entered the classroom.'], hint:'spider = मकड़ी', type:'translation' },
  { id:'d61-003', hindi:'चींटियाँ बहुत मेहनती होती हैं।', english:'Ants are very hardworking.', alternatives:['ants are extremely industrious.'], hint:'ants = चींटियाँ', type:'translation' },
  { id:'d61-004', hindi:'मच्छर एक ख़तरनाक कीड़ा है।', english:'The mosquito is a dangerous insect.', alternatives:['mosquitoes are very harmful insects.'], hint:'mosquito = मच्छर', type:'translation' },
  { id:'d61-005', hindi:'वह स्कूल की इमारत बहुत पुरानी है।', english:'That school building is very old.', alternatives:['the school structure is very ancient.'], hint:'school building = स्कूल की इमारत', type:'translation' },
  { id:'d61-006', hindi:'यहाँ एक मंदिर है।', english:'There is a temple here.', alternatives:['a temple is located here.'], hint:'temple = मंदिर', type:'translation' },
  { id:'d61-007', hindi:'पुस्तकालय शहर के बीच में है।', english:'The library is in the middle of the city.', alternatives:['the library is in the city centre.'], hint:'library = पुस्तकालय', type:'translation' },
  { id:'d61-008', hindi:'तितली बहुत सुंदर होती है।', english:'The butterfly is very beautiful.', alternatives:['butterflies are very pretty.'], hint:'butterfly = तितली', type:'translation' },
  { id:'d61-009', hindi:'गर्मी में मक्खियाँ बहुत परेशान करती हैं।', english:'Flies are very troublesome in summer.', alternatives:['flies are a nuisance in hot weather.'], hint:'flies = मक्खियाँ', type:'translation' },
  { id:'d61-010', hindi:'यह अस्पताल बहुत बड़ा है।', english:'This hospital is very large.', alternatives:['this is a very big hospital.'], hint:'hospital = अस्पताल', type:'translation' },
  { id:'d61-011', hindi:'उसने एक नई दुकान खोली।', english:'He opened a new shop.', alternatives:['he started a new store.'], hint:'shop / store = दुकान', type:'translation' },
  { id:'d61-012', hindi:'तिलचट्टा रात को निकलता है।', english:'The cockroach comes out at night.', alternatives:['cockroaches are active at night.'], hint:'cockroach = तिलचट्टा', type:'translation' },
  { id:'d61-013', hindi:'मधुमक्खी शहद बनाती है।', english:'Bees make honey.', alternatives:['bees produce honey.'], hint:'bee = मधुमक्खी, honey = शहद', type:'translation' },
  { id:'d61-014', hindi:'स्टेशन के पास एक होटल है।', english:'There is a hotel near the station.', alternatives:['a hotel is located near the station.'], hint:'hotel = होटल', type:'translation' },
  { id:'d61-015', hindi:'पार्क के बगल में एक दुकान है।', english:'There is a shop next to the park.', alternatives:['a store is situated beside the park.'], hint:'next to / beside = बगल में', type:'translation' },
];

// ============================================================
// Day 62 — Flowers & Fruits Vocabulary
// ============================================================
const DAY_62 = [
  { id:'d62-001', hindi:'गुलाब प्रेम का प्रतीक है।', english:'The rose is a symbol of love.', alternatives:['roses represent love.'], hint:'rose = गुलाब', type:'translation' },
  { id:'d62-002', hindi:'आम भारत का राष्ट्रीय फल है।', english:'Mango is the national fruit of India.', alternatives:['the national fruit of india is mango.'], hint:'mango = आम, national fruit = राष्ट्रीय फल', type:'translation' },
  { id:'d62-003', hindi:'सेब खाने से डॉक्टर दूर रहता है।', english:'An apple a day keeps the doctor away.', alternatives:['eating an apple daily keeps you healthy.'], hint:'Proverb: apple = सेब', type:'translation' },
  { id:'d62-004', hindi:'कमल राष्ट्रीय फूल है।', english:'Lotus is the national flower.', alternatives:['the national flower of india is the lotus.'], hint:'lotus = कमल', type:'translation' },
  { id:'d62-005', hindi:'केला ऊर्जा से भरपूर है।', english:'Banana is full of energy.', alternatives:['bananas are packed with energy.'], hint:'banana = केला', type:'translation' },
  { id:'d62-006', hindi:'वह बगीचे में फूल लगाती है।', english:'She plants flowers in the garden.', alternatives:['she grows flowers in her garden.'], hint:'flowers = फूल, garden = बगीचा', type:'translation' },
  { id:'d62-007', hindi:'तरबूज़ गर्मियों का फल है।', english:'Watermelon is a summer fruit.', alternatives:['watermelon is popular in summer.'], hint:'watermelon = तरबूज़', type:'translation' },
  { id:'d62-008', hindi:'अंगूर का रस बहुत मीठा होता है।', english:'Grape juice is very sweet.', alternatives:['grapes are very sweet.'], hint:'grapes = अंगूर', type:'translation' },
  { id:'d62-009', hindi:'सूरजमुखी सूरज की तरफ मुड़ता है।', english:'The sunflower turns towards the sun.', alternatives:['sunflowers face the sun.'], hint:'sunflower = सूरजमुखी', type:'translation' },
  { id:'d62-010', hindi:'पपीता पेट के लिए अच्छा है।', english:'Papaya is good for the stomach.', alternatives:['papaya aids digestion.'], hint:'papaya = पपीता', type:'translation' },
  { id:'d62-011', hindi:'चमेली की महक बहुत अच्छी होती है।', english:'Jasmine has a very pleasant fragrance.', alternatives:['jasmine smells wonderful.'], hint:'jasmine = चमेली, fragrance = महक', type:'translation' },
  { id:'d62-012', hindi:'अनार का जूस स्वास्थ्य के लिए फायदेमंद है।', english:'Pomegranate juice is beneficial for health.', alternatives:['pomegranate juice is good for your health.'], hint:'pomegranate = अनार', type:'translation' },
  { id:'d62-013', hindi:'गेंदे का फूल बहुत आम है।', english:'The marigold flower is very common.', alternatives:['marigolds are found everywhere.'], hint:'marigold = गेंदा', type:'translation' },
  { id:'d62-014', hindi:'स्ट्रॉबेरी देखने में लाल होती है।', english:'Strawberry is red in appearance.', alternatives:['strawberries look bright red.'], hint:'strawberry = स्ट्रॉबेरी', type:'translation' },
  { id:'d62-015', hindi:'लीची का मौसम गर्मियों में होता है।', english:'Lychee season is in summer.', alternatives:['lychees are available in summer.'], hint:'lychee = लीची', type:'translation' },
];

// ============================================================
// Day 63 — Maths Vocabulary
// ============================================================
const DAY_63 = [
  { id:'d63-001', hindi:'दो और दो चार होते हैं।', english:'Two plus two equals four.', alternatives:['2 + 2 = 4'], hint:'plus = और/जोड़, equals = बराबर', type:'translation' },
  { id:'d63-002', hindi:'दस में से पाँच घटाने पर पाँच बचते हैं।', english:'Ten minus five equals five.', alternatives:['10 - 5 = 5'], hint:'minus = घटाना', type:'translation' },
  { id:'d63-003', hindi:'तीन गुना चार बारह होता है।', english:'Three multiplied by four equals twelve.', alternatives:['3 × 4 = 12'], hint:'multiplied by = गुणा', type:'translation' },
  { id:'d63-004', hindi:'बीस को चार से भाग देने पर पाँच आता है।', english:'Twenty divided by four equals five.', alternatives:['20 ÷ 4 = 5'], hint:'divided by = भाग', type:'translation' },
  { id:'d63-005', hindi:'क्या तुम्हें भूमिति पसंद है?', english:'Do you like geometry?', alternatives:['are you interested in geometry?'], hint:'geometry = भूमिति', type:'translation' },
  { id:'d63-006', hindi:'त्रिकोण के तीन कोण होते हैं।', english:'A triangle has three angles.', alternatives:['triangles have 3 corners/angles.'], hint:'triangle = त्रिकोण, angles = कोण', type:'translation' },
  { id:'d63-007', hindi:'वृत्त की कोई भुजा नहीं होती।', english:'A circle has no sides.', alternatives:['circles have no edges.'], hint:'circle = वृत्त, sides = भुजाएँ', type:'translation' },
  { id:'d63-008', hindi:'इस संख्या का वर्गमूल क्या है?', english:'What is the square root of this number?', alternatives:['find the square root of this number.'], hint:'square root = वर्गमूल', type:'translation' },
  { id:'d63-009', hindi:'प्रतिशत का मतलब सौ में से होता है।', english:'Percentage means out of hundred.', alternatives:['percent means per hundred.'], hint:'percentage / percent = प्रतिशत', type:'translation' },
  { id:'d63-010', hindi:'जोड़, घटाव, गुणा और भाग चार मूल क्रियाएँ हैं।', english:'Addition, subtraction, multiplication and division are the four basic operations.', alternatives:['the four basic math operations are add, subtract, multiply, divide.'], hint:'basic operations = मूल क्रियाएँ', type:'translation' },
  { id:'d63-011', hindi:'विषम संख्याएँ 1, 3, 5, 7 हैं।', english:'Odd numbers are 1, 3, 5, 7.', alternatives:['examples of odd numbers: 1, 3, 5, 7.'], hint:'odd numbers = विषम संख्याएँ', type:'translation' },
  { id:'d63-012', hindi:'सम संख्याएँ 2, 4, 6, 8 हैं।', english:'Even numbers are 2, 4, 6, 8.', alternatives:['examples of even numbers: 2, 4, 6, 8.'], hint:'even numbers = सम संख्याएँ', type:'translation' },
  { id:'d63-013', hindi:'वह गणित में बहुत अच्छा है।', english:'He is very good at mathematics.', alternatives:['he excels in maths.'], hint:'mathematics / maths = गणित', type:'translation' },
  { id:'d63-014', hindi:'यह समीकरण हल करो।', english:'Solve this equation.', alternatives:['find the answer to this equation.'], hint:'equation = समीकरण', type:'translation' },
  { id:'d63-015', hindi:'अनुपात और समानुपात एक महत्वपूर्ण टॉपिक है।', english:'Ratio and proportion is an important topic.', alternatives:['ratio and proportion is a key subject.'], hint:'ratio = अनुपात, proportion = समानुपात', type:'translation' },
];

// ============================================================
// Day 64 — Body & Diseases Vocabulary
// ============================================================
const DAY_64 = [
  { id:'d64-001', hindi:'मेरे सिर में दर्द हो रहा है।', english:'I have a headache.', alternatives:['my head is aching.'], hint:'headache = सिरदर्द', type:'translation' },
  { id:'d64-002', hindi:'उसे बुखार है।', english:'He has a fever.', alternatives:['he is running a temperature.'], hint:'fever = बुखार', type:'translation' },
  { id:'d64-003', hindi:'वह बीमार है।', english:'She is ill.', alternatives:['she is sick.'], hint:'ill / sick = बीमार', type:'translation' },
  { id:'d64-004', hindi:'मेरी आँखें जल रही हैं।', english:'My eyes are burning.', alternatives:['i have a burning sensation in my eyes.'], hint:'eyes = आँखें, burning = जलन', type:'translation' },
  { id:'d64-005', hindi:'उसके पेट में दर्द है।', english:'He has a stomach ache.', alternatives:['he is having abdominal pain.'], hint:'stomach ache = पेट दर्द', type:'translation' },
  { id:'d64-006', hindi:'उसे खाँसी और ज़ुकाम है।', english:'She has a cough and cold.', alternatives:['she is suffering from cold and cough.'], hint:'cough = खाँसी, cold = ज़ुकाम', type:'translation' },
  { id:'d64-007', hindi:'मुझे दाँत में दर्द है।', english:'I have a toothache.', alternatives:['my tooth is aching.'], hint:'toothache = दाँत दर्द', type:'translation' },
  { id:'d64-008', hindi:'डॉक्टर ने उसे दवाई लिखी।', english:'The doctor prescribed medicine to him.', alternatives:['the doctor wrote a prescription for him.'], hint:'prescribed / prescribed medicine = दवाई लिखना', type:'translation' },
  { id:'d64-009', hindi:'उसे एलर्जी है।', english:'She has an allergy.', alternatives:['she suffers from allergies.'], hint:'allergy = एलर्जी', type:'translation' },
  { id:'d64-010', hindi:'मुझे मधुमेह है।', english:'I have diabetes.', alternatives:['i am diabetic.'], hint:'diabetes = मधुमेह / शुगर', type:'translation' },
  { id:'d64-011', hindi:'हृदय रोग एक गंभीर बीमारी है।', english:'Heart disease is a serious illness.', alternatives:['cardiac disease is a severe condition.'], hint:'heart disease = हृदय रोग', type:'translation' },
  { id:'d64-012', hindi:'उसे रक्तचाप की समस्या है।', english:'He has blood pressure problems.', alternatives:['he suffers from hypertension.'], hint:'blood pressure = रक्तचाप', type:'translation' },
  { id:'d64-013', hindi:'मेरी उँगली में चोट लगी।', english:'My finger got hurt.', alternatives:['i injured my finger.'], hint:'finger = उँगली, hurt / injured = चोट लगना', type:'translation' },
  { id:'d64-014', hindi:'डॉक्टर ने कहा कि आराम करो।', english:'The doctor said to take rest.', alternatives:['the doctor advised me to rest.'], hint:'doctor said = डॉक्टर ने कहा', type:'translation' },
  { id:'d64-015', hindi:'वह जल्दी ठीक हो जाएगा।', english:'He will recover soon.', alternatives:['he will get better quickly.'], hint:'recover / get better = ठीक होना', type:'translation' },
];

// ============================================================
// Day 65 — Industry Vocabulary
// ============================================================
const DAY_65 = [
  { id:'d65-001', hindi:'वह एक बड़ी कंपनी में काम करता है।', english:'He works in a large company.', alternatives:['he is employed at a big firm.'], hint:'company / firm = कंपनी', type:'translation' },
  { id:'d65-002', hindi:'इस उद्योग में बहुत प्रतिस्पर्धा है।', english:'There is a lot of competition in this industry.', alternatives:['this sector is very competitive.'], hint:'industry / sector = उद्योग', type:'translation' },
  { id:'d65-003', hindi:'वे लोग एक नई फैक्ट्री खोल रहे हैं।', english:'They are opening a new factory.', alternatives:['they are launching a new manufacturing unit.'], hint:'factory = फैक्ट्री / कारखाना', type:'translation' },
  { id:'d65-004', hindi:'उत्पादन की गुणवत्ता बनाए रखनी चाहिए।', english:'The quality of production should be maintained.', alternatives:['production quality must be kept high.'], hint:'production = उत्पादन, quality = गुणवत्ता', type:'translation' },
  { id:'d65-005', hindi:'इस महीने उत्पादन कम रहा।', english:'Production was low this month.', alternatives:['output was reduced this month.'], hint:'production / output = उत्पादन', type:'translation' },
  { id:'d65-006', hindi:'वह IT क्षेत्र में काम करता है।', english:'He works in the IT sector.', alternatives:['he is in the information technology field.'], hint:'IT sector = सूचना प्रौद्योगिकी क्षेत्र', type:'translation' },
  { id:'d65-007', hindi:'यह कंपनी निर्यात करती है।', english:'This company exports products.', alternatives:['this firm exports goods.'], hint:'export = निर्यात करना', type:'translation' },
  { id:'d65-008', hindi:'आयात बढ़ने से व्यापार घाटा बढ़ता है।', english:'Increasing imports raises the trade deficit.', alternatives:['more imports lead to a trade gap.'], hint:'import = आयात, trade deficit = व्यापार घाटा', type:'translation' },
  { id:'d65-009', hindi:'उन्होंने एक नया उत्पाद लॉन्च किया।', english:'They launched a new product.', alternatives:['they introduced a new item.'], hint:'product = उत्पाद, launch = शुरू करना', type:'translation' },
  { id:'d65-010', hindi:'बाज़ार में माँग बढ़ रही है।', english:'The demand in the market is increasing.', alternatives:['market demand is growing.'], hint:'demand = माँग, market = बाज़ार', type:'translation' },
  { id:'d65-011', hindi:'वे इस महीने ज़्यादा मुनाफा कमाएँगे।', english:'They will earn more profit this month.', alternatives:['they will make higher profits this month.'], hint:'profit = मुनाफा / लाभ', type:'translation' },
  { id:'d65-012', hindi:'कर्मचारियों की संख्या बढ़ाई जाएगी।', english:'The number of employees will be increased.', alternatives:['the workforce will be expanded.'], hint:'employees / workforce = कर्मचारी', type:'translation' },
  { id:'d65-013', hindi:'उद्योग को सरकारी सहायता मिल रही है।', english:'The industry is receiving government support.', alternatives:['the sector is getting government assistance.'], hint:'government support = सरकारी सहायता', type:'translation' },
  { id:'d65-014', hindi:'यह क्षेत्र तेज़ी से विकसित हो रहा है।', english:'This sector is developing rapidly.', alternatives:['this field is growing very fast.'], hint:'developing / growing rapidly = तेज़ी से बढ़ रहा है', type:'translation' },
  { id:'d65-015', hindi:'कारखाने में श्रमिक काम करते हैं।', english:'Workers work in the factory.', alternatives:['labourers are employed in the factory.'], hint:'workers / labourers = श्रमिक', type:'translation' },
];

// ============================================================
// Day 66 — Colours & Judiciary Vocabulary
// ============================================================
const DAY_66 = [
  { id:'d66-001', hindi:'उसने लाल रंग की साड़ी पहनी।', english:'She wore a red saree.', alternatives:['she was dressed in a red sari.'], hint:'red = लाल', type:'translation' },
  { id:'d66-002', hindi:'आसमान नीला है।', english:'The sky is blue.', alternatives:['the sky appears blue.'], hint:'blue = नीला', type:'translation' },
  { id:'d66-003', hindi:'घास हरी होती है।', english:'Grass is green.', alternatives:['grass appears green.'], hint:'green = हरा', type:'translation' },
  { id:'d66-004', hindi:'सफ़ेद रंग शांति का प्रतीक है।', english:'White is a symbol of peace.', alternatives:['white colour represents peace.'], hint:'white = सफ़ेद', type:'translation' },
  { id:'d66-005', hindi:'न्यायालय ने फैसला सुनाया।', english:'The court delivered its judgement.', alternatives:['the court pronounced its verdict.'], hint:'court = न्यायालय, judgement/verdict = फैसला', type:'translation' },
  { id:'d66-006', hindi:'वह मासूम है।', english:'He is innocent.', alternatives:['he is not guilty.'], hint:'innocent = मासूम / निर्दोष', type:'translation' },
  { id:'d66-007', hindi:'उसे जेल भेजा गया।', english:'He was sent to jail.', alternatives:['he was imprisoned.'], hint:'jail / prison = जेल', type:'translation' },
  { id:'d66-008', hindi:'न्याय सबके लिए बराबर होना चाहिए।', english:'Justice should be equal for all.', alternatives:['justice must be impartial.'], hint:'justice = न्याय', type:'translation' },
  { id:'d66-009', hindi:'पीला रंग खुशी का प्रतीक है।', english:'Yellow is a symbol of happiness.', alternatives:['yellow represents joy.'], hint:'yellow = पीला', type:'translation' },
  { id:'d66-010', hindi:'वकील ने मुवक्किल का बचाव किया।', english:'The lawyer defended his client.', alternatives:['the advocate protected his client.'], hint:'lawyer / advocate = वकील, client = मुवक्किल', type:'translation' },
  { id:'d66-011', hindi:'काला और सफ़ेद दो विपरीत रंग हैं।', english:'Black and white are two opposite colours.', alternatives:['black and white are contrasting colours.'], hint:'opposite = विपरीत', type:'translation' },
  { id:'d66-012', hindi:'न्यायाधीश ने आरोपी को बेकसूर पाया।', english:'The judge found the accused innocent.', alternatives:['the judge declared him not guilty.'], hint:'judge = न्यायाधीश, accused = आरोपी', type:'translation' },
  { id:'d66-013', hindi:'उसे ज़मानत मिल गई।', english:'He got bail.', alternatives:['he was released on bail.'], hint:'bail = ज़मानत', type:'translation' },
  { id:'d66-014', hindi:'नारंगी रंग बहुत चमकीला है।', english:'The colour orange is very bright.', alternatives:['orange is a vibrant colour.'], hint:'orange = नारंगी, bright = चमकीला', type:'translation' },
  { id:'d66-015', hindi:'मुकदमा बहुत लंबा चला।', english:'The case went on for a very long time.', alternatives:['the trial lasted very long.'], hint:'case / trial = मुकदमा', type:'translation' },
];

// ============================================================
// Day 67 — Birds & Astrology Vocabulary
// ============================================================
const DAY_67 = [
  { id:'d67-001', hindi:'मोर भारत का राष्ट्रीय पक्षी है।', english:'Peacock is the national bird of India.', alternatives:["india's national bird is the peacock."], hint:'peacock = मोर', type:'translation' },
  { id:'d67-002', hindi:'तोता बहुत चतुर पक्षी होता है।', english:'Parrot is a very clever bird.', alternatives:['parrots are very intelligent birds.'], hint:'parrot = तोता', type:'translation' },
  { id:'d67-003', hindi:'कौआ बहुत चालाक पक्षी है।', english:'The crow is a very cunning bird.', alternatives:['crows are known for their intelligence.'], hint:'crow = कौआ', type:'translation' },
  { id:'d67-004', hindi:'कबूतर शांति का प्रतीक है।', english:'The dove/pigeon is a symbol of peace.', alternatives:['pigeons represent peace.'], hint:'pigeon / dove = कबूतर', type:'translation' },
  { id:'d67-005', hindi:'उल्लू रात को देखता है।', english:'The owl can see at night.', alternatives:['owls are nocturnal.'], hint:'owl = उल्लू, nocturnal = रात को सक्रिय', type:'translation' },
  { id:'d67-006', hindi:'वह मीन राशि का है।', english:'He is a Pisces.', alternatives:['his zodiac sign is pisces.'], hint:'Pisces = मीन राशि', type:'translation' },
  { id:'d67-007', hindi:'मेष राशि वाले बहुत साहसी होते हैं।', english:'Aries people are very courageous.', alternatives:['aries sign people are brave.'], hint:'Aries = मेष राशि', type:'translation' },
  { id:'d67-008', hindi:'मेरी राशि वृश्चिक है।', english:'My zodiac sign is Scorpio.', alternatives:['i am a scorpio.'], hint:'Scorpio = वृश्चिक राशि', type:'translation' },
  { id:'d67-009', hindi:'गौरैया एक छोटी-सी चिड़िया है।', english:'Sparrow is a small bird.', alternatives:['sparrows are tiny birds.'], hint:'sparrow = गौरैया', type:'translation' },
  { id:'d67-010', hindi:'हंस पानी पर तैरता है।', english:'The swan swims on water.', alternatives:['swans glide on water.'], hint:'swan = हंस', type:'translation' },
  { id:'d67-011', hindi:'मेरी जन्म कुंडली के अनुसार मेरा भाग्य अच्छा है।', english:'According to my birth chart, my fortune is good.', alternatives:['my horoscope says my luck is good.'], hint:'birth chart / horoscope = कुंडली', type:'translation' },
  { id:'d67-012', hindi:'बाज़ बहुत तेज़ उड़ता है।', english:'The eagle flies very fast.', alternatives:['eagles are very fast flyers.'], hint:'eagle = बाज़ / गरुड़', type:'translation' },
  { id:'d67-013', hindi:'कंगन तुला राशि का प्रतीक है।', english:'The scale is the symbol of Libra.', alternatives:['libra is represented by scales.'], hint:'Libra = तुला राशि', type:'translation' },
  { id:'d67-014', hindi:'मुर्गा सुबह बाँग देता है।', english:'The rooster crows in the morning.', alternatives:['a rooster calls in the morning.'], hint:'rooster / cock = मुर्गा', type:'translation' },
  { id:'d67-015', hindi:'जल्दी उठने वाला पक्षी ही कीड़ा पाता है।', english:'The early bird catches the worm.', alternatives:['those who wake up early succeed.'], hint:'Proverb: early bird = सुबह जल्दी उठने वाला', type:'translation' },
];

// ============================================================
// Day 68 — Factory, Sports, Sound & Maths Vocabulary
// ============================================================
const DAY_68 = [
  { id:'d68-001', hindi:'क्रिकेट भारत का सबसे लोकप्रिय खेल है।', english:'Cricket is the most popular sport in India.', alternatives:['cricket is india\'s favourite game.'], hint:'cricket = क्रिकेट, popular sport = लोकप्रिय खेल', type:'translation' },
  { id:'d68-002', hindi:'वह हर रोज़ फुटबॉल खेलता है।', english:'He plays football every day.', alternatives:['he plays soccer daily.'], hint:'football / soccer = फुटबॉल', type:'translation' },
  { id:'d68-003', hindi:'तेज़ आवाज़ कान के लिए हानिकारक है।', english:'Loud sound is harmful to the ears.', alternatives:['high volume is dangerous for ears.'], hint:'loud = तेज़, harmful = हानिकारक', type:'translation' },
  { id:'d68-004', hindi:'इस कारखाने में 500 मजदूर काम करते हैं।', english:'500 workers work in this factory.', alternatives:['this factory employs 500 labourers.'], hint:'factory = कारखाना, workers = मजदूर', type:'translation' },
  { id:'d68-005', hindi:'हॉकी भारत का राष्ट्रीय खेल है।', english:'Hockey is the national sport of India.', alternatives:["india's national game is hockey."], hint:'hockey = हॉकी', type:'translation' },
  { id:'d68-006', hindi:'उसने बैडमिंटन में स्वर्ण पदक जीता।', english:'She won the gold medal in badminton.', alternatives:['she got gold in badminton.'], hint:'gold medal = स्वर्ण पदक', type:'translation' },
  { id:'d68-007', hindi:'यह मशीन बहुत शोर मचाती है।', english:'This machine makes a lot of noise.', alternatives:['this machine is very noisy.'], hint:'noise / sound = शोर / आवाज़', type:'translation' },
  { id:'d68-008', hindi:'कुत्ता भौंकता है।', english:'The dog barks.', alternatives:['dogs make a barking sound.'], hint:'bark = भौंकना', type:'translation' },
  { id:'d68-009', hindi:'सिंह दहाड़ता है।', english:'The lion roars.', alternatives:['lions make a roaring sound.'], hint:'roar = दहाड़ना', type:'translation' },
  { id:'d68-010', hindi:'समानांतर रेखाएँ कभी नहीं मिलतीं।', english:'Parallel lines never meet.', alternatives:['parallel lines do not intersect.'], hint:'parallel = समानांतर', type:'translation' },
  { id:'d68-011', hindi:'गेंद गोल होती है।', english:'A ball is round / spherical.', alternatives:['balls are circular/spherical in shape.'], hint:'round / spherical = गोल', type:'translation' },
  { id:'d68-012', hindi:'वह एक Olympic खिलाड़ी है।', english:'He is an Olympic athlete.', alternatives:['he participates in the olympics.'], hint:'Olympic athlete = ओलंपिक खिलाड़ी', type:'translation' },
  { id:'d68-013', hindi:'इस खेल में बहुत ऊर्जा लगती है।', english:'This sport requires a lot of energy.', alternatives:['you need lots of stamina for this sport.'], hint:'energy / stamina = ऊर्जा / शक्ति', type:'translation' },
  { id:'d68-014', hindi:'वर्ग की चारों भुजाएँ बराबर होती हैं।', english:'All four sides of a square are equal.', alternatives:['a square has four equal sides.'], hint:'square = वर्ग, sides = भुजाएँ', type:'translation' },
  { id:'d68-015', hindi:'अभ्यास से इंसान परफेक्ट बनता है।', english:'Practice makes a man perfect.', alternatives:['the more you practice the better you get.'], hint:'Practice makes perfect = अभ्यास से परिपूर्णता आती है', type:'translation' },
];

// ============================================================
// Day 69 — Application Writing
// ============================================================
const DAY_69 = [
  { id:'d69-001', hindi:'मैं आपसे विनम्रतापूर्वक निवेदन करता हूँ।', english:'I humbly request you.', alternatives:['i respectfully request you.'], hint:'humbly / respectfully request = विनम्रतापूर्वक निवेदन', type:'translation' },
  { id:'d69-002', hindi:'कृपया मेरी छुट्टी की अर्जी स्वीकार करें।', english:'Kindly accept my leave application.', alternatives:['please approve my leave request.'], hint:'accept / approve = स्वीकार करना', type:'translation' },
  { id:'d69-003', hindi:'मुझे दो दिन की छुट्टी चाहिए।', english:'I need a two-day leave.', alternatives:['i require two days off.'], hint:'leave = छुट्टी', type:'translation' },
  { id:'d69-004', hindi:'मैं बीमारी के कारण ऑफिस नहीं आ सकता।', english:'I am unable to come to the office due to illness.', alternatives:['i cannot attend office because of sickness.'], hint:'unable to = नहीं आ सकता, due to = के कारण', type:'translation' },
  { id:'d69-005', hindi:'कृपया मेरी समस्या पर ध्यान दें।', english:'Kindly pay attention to my problem.', alternatives:['please look into my issue.'], hint:'kindly = कृपया, pay attention = ध्यान देना', type:'translation' },
  { id:'d69-006', hindi:'मैं आपका आभारी रहूँगा।', english:'I shall be grateful to you.', alternatives:['i will be thankful to you.'], hint:'grateful / thankful = आभारी', type:'translation' },
  { id:'d69-007', hindi:'आवेदन के साथ दस्तावेज़ संलग्न हैं।', english:'Documents are attached with the application.', alternatives:['the required documents are enclosed.'], hint:'attached / enclosed = संलग्न', type:'translation' },
  { id:'d69-008', hindi:'मैं आपकी अनुमति माँगना चाहता हूँ।', english:'I would like to seek your permission.', alternatives:['i am requesting your permission.'], hint:'seek permission = अनुमति माँगना', type:'translation' },
  { id:'d69-009', hindi:'मैं आपका निवेदन स्वीकार करने की विनती करता हूँ।', english:'I request you to accept my appeal.', alternatives:['i urge you to approve my request.'], hint:'accept = स्वीकार करना, appeal = निवेदन', type:'translation' },
  { id:'d69-010', hindi:'धन्यवाद सहित आपका आज्ञाकारी छात्र।', english:'Yours obediently, with thanks.', alternatives:['thanking you, yours faithfully.'], hint:'Yours obediently / faithfully = आपका आज्ञाकारी', type:'translation' },
  { id:'d69-011', hindi:'मैं इस पद के लिए आवेदन कर रहा हूँ।', english:'I am applying for this position.', alternatives:['i wish to apply for this post.'], hint:'applying for = आवेदन करना', type:'translation' },
  { id:'d69-012', hindi:'उपर्युक्त विषय के संदर्भ में।', english:'With reference to the above subject.', alternatives:['regarding the above matter.'], hint:'With reference to = के संदर्भ में', type:'translation' },
  { id:'d69-013', hindi:'कृपया जल्द से जल्द कार्यवाही करें।', english:'Kindly take action as soon as possible.', alternatives:['please act on this urgently.'], hint:'as soon as possible = जल्द से जल्द', type:'translation' },
  { id:'d69-014', hindi:'मैं इस संस्थान में प्रवेश का इच्छुक हूँ।', english:'I am desirous of getting admission to this institution.', alternatives:['i wish to take admission here.'], hint:'desirous of = इच्छुक होना', type:'translation' },
  { id:'d69-015', hindi:'कृपया मेरी समस्या का हल निकालें।', english:'Please resolve my problem.', alternatives:['kindly find a solution to my issue.'], hint:'resolve = हल करना', type:'translation' },
];

// ============================================================
// Day 70 — Letter Writing
// ============================================================
const DAY_70 = [
  { id:'d70-001', hindi:'मुझे उम्मीद है कि आप ठीक होंगे।', english:'I hope you are doing well.', alternatives:['i hope this finds you in good health.'], hint:'I hope you are + doing well', type:'translation' },
  { id:'d70-002', hindi:'मैं यह पत्र आपको यह बताने के लिए लिख रहा हूँ।', english:'I am writing this letter to inform you.', alternatives:['i write this letter to let you know.'], hint:'I am writing to + inform', type:'translation' },
  { id:'d70-003', hindi:'इस पत्र के माध्यम से।', english:'Through this letter.', alternatives:['by means of this letter.'], hint:'through / by means of = के माध्यम से', type:'translation' },
  { id:'d70-004', hindi:'कृपया पत्र का जवाब जल्दी दें।', english:'Please reply to this letter soon.', alternatives:['kindly respond at the earliest.'], hint:'reply / respond = जवाब देना', type:'translation' },
  { id:'d70-005', hindi:'मैं आपको यह सूचित करना चाहता था।', english:'I wanted to inform you about this.', alternatives:['i wished to notify you of this.'], hint:'inform / notify = सूचित करना', type:'translation' },
  { id:'d70-006', hindi:'प्रिय मित्र।', english:'Dear friend.', alternatives:['my dear friend.'], hint:'Dear = प्रिय (letter opening)', type:'translation' },
  { id:'d70-007', hindi:'आपका विश्वासू मित्र।', english:'Your faithful friend.', alternatives:['yours sincerely.'], hint:'faithful / sincerely = विश्वासू / शुभकामनाओं के साथ', type:'translation' },
  { id:'d70-008', hindi:'मुझे आपकी सलाह की ज़रूरत है।', english:'I need your advice.', alternatives:['i require your guidance.'], hint:'advice / guidance = सलाह', type:'translation' },
  { id:'d70-009', hindi:'यह पत्र पाकर मुझे बहुत खुशी हुई।', english:'I was very happy to receive your letter.', alternatives:['getting your letter made me very happy.'], hint:'happy to receive = पाकर खुशी हुई', type:'translation' },
  { id:'d70-010', hindi:'जैसा कि तुमने अपने पत्र में लिखा।', english:'As you wrote in your letter.', alternatives:['as you mentioned in your letter.'], hint:'As you wrote/mentioned in your letter', type:'translation' },
  { id:'d70-011', hindi:'आशा है कि यह पत्र आप तक सकुशल पहुँचे।', english:'I hope this letter reaches you safely.', alternatives:['i hope this mail arrives safely.'], hint:'reaches safely = सकुशल पहुँचे', type:'translation' },
  { id:'d70-012', hindi:'मेरा पता नीचे लिखा है।', english:'My address is written below.', alternatives:['my address is given below.'], hint:'address = पता, below = नीचे', type:'translation' },
  { id:'d70-013', hindi:'परिवार को मेरी तरफ से प्यार देना।', english:'Give my love to the family.', alternatives:['convey my regards to the family.'], hint:'give love / convey regards = प्यार देना', type:'translation' },
  { id:'d70-014', hindi:'बाकी बातें हम मिलकर करेंगे।', english:'We will discuss the rest when we meet.', alternatives:['we will talk more when we see each other.'], hint:'discuss / talk when we meet', type:'translation' },
  { id:'d70-015', hindi:'तुम्हारी कोई भी समस्या हो, मुझसे शेयर करना।', english:'Feel free to share any problem with me.', alternatives:['share any issue you have with me.'], hint:'feel free to = बिना झिझक के', type:'translation' },
];

// ============================================================
// Day 71 — E-mail Writing
// ============================================================
const DAY_71 = [
  { id:'d71-001', hindi:'मैं आपको यह ईमेल इस विषय के बारे में लिख रहा हूँ।', english:'I am writing this email regarding the subject.', alternatives:['this email is with respect to the matter.'], hint:'I am writing this email regarding + subject', type:'translation' },
  { id:'d71-002', hindi:'कृपया मेरे ईमेल का जवाब दें।', english:'Please reply to my email.', alternatives:['kindly respond to my message.'], hint:'reply / respond = जवाब देना', type:'translation' },
  { id:'d71-003', hindi:'मैं आपको फ़ाइल अटैच कर रहा हूँ।', english:'I am attaching the file to this email.', alternatives:['i have enclosed the file with this email.'], hint:'attaching / enclosing = अटैच कर रहा हूँ', type:'translation' },
  { id:'d71-004', hindi:'विषय: नई नीति के बारे में।', english:'Subject: Regarding the new policy.', alternatives:['subject: new policy update.'], hint:'Subject = ईमेल का विषय', type:'translation' },
  { id:'d71-005', hindi:'आशा करता हूँ कि आप अच्छे होंगे।', english:'I hope you are well.', alternatives:['i trust you are doing fine.'], hint:'I hope you are well = professional email greeting', type:'translation' },
  { id:'d71-006', hindi:'अगर कोई सवाल है तो मुझसे संपर्क करें।', english:'If you have any questions, please contact me.', alternatives:['for any queries, feel free to reach out.'], hint:'contact / reach out = संपर्क करना', type:'translation' },
  { id:'d71-007', hindi:'धन्यवाद आपके सहयोग के लिए।', english:'Thank you for your cooperation.', alternatives:['thanks for your support.'], hint:'Thank you for + noun', type:'translation' },
  { id:'d71-008', hindi:'ईमेल में जानकारी ध्यान से पढ़ें।', english:'Please read the information in the email carefully.', alternatives:['go through the email details carefully.'], hint:'read carefully = ध्यान से पढ़ें', type:'translation' },
  { id:'d71-009', hindi:'कृपया इस मामले को जल्दी सुलझाएँ।', english:'Please resolve this matter at the earliest.', alternatives:['kindly address this issue urgently.'], hint:'resolve / address = सुलझाना', type:'translation' },
  { id:'d71-010', hindi:'आगे की जानकारी के लिए मुझसे मिलें।', english:'Meet me for further information.', alternatives:['contact me for more details.'], hint:'further information = आगे की जानकारी', type:'translation' },
  { id:'d71-011', hindi:'मैं आपकी प्रतिक्रिया का इंतज़ार करूँगा।', english:'I will await your response.', alternatives:["i'll wait for your reply."], hint:'await your response = आपके जवाब का इंतज़ार', type:'translation' },
  { id:'d71-012', hindi:'यह ईमेल सभी टीम सदस्यों को भेजा जा रहा है।', english:'This email is being sent to all team members.', alternatives:['this mail is going to the entire team.'], hint:'being sent = भेजा जा रहा है', type:'translation' },
  { id:'d71-013', hindi:'कृपया इस लिंक पर क्लिक करें।', english:'Please click on this link.', alternatives:['kindly open this link.'], hint:'click on = क्लिक करना', type:'translation' },
  { id:'d71-014', hindi:'आपकी टीम का प्रदर्शन सराहनीय है।', english:'Your team\'s performance is commendable.', alternatives:["your team's work is praiseworthy."], hint:'commendable / praiseworthy = सराहनीय', type:'translation' },
  { id:'d71-015', hindi:'नमस्ते, आशा करता हूँ यह ईमेल आपको अच्छी हालत में मिले।', english:'Hello, I hope this email finds you in good health.', alternatives:['greetings, i hope you are doing well.'], hint:'I hope this email finds you = professional opener', type:'translation' },
];

// ============================================================
// Day 72 — Paragraph Writing
// ============================================================
const DAY_72 = [
  { id:'d72-001', hindi:'हमें हमेशा पर्यावरण की रक्षा करनी चाहिए।', english:'We should always protect the environment.', alternatives:['we must take care of our surroundings.'], hint:'protect the environment = पर्यावरण की रक्षा', type:'translation' },
  { id:'d72-002', hindi:'शिक्षा जीवन में बहुत महत्वपूर्ण है।', english:'Education is very important in life.', alternatives:['education plays a vital role in life.'], hint:'education = शिक्षा, important = महत्वपूर्ण', type:'translation' },
  { id:'d72-003', hindi:'स्वास्थ्य ही सबसे बड़ा धन है।', english:'Health is the greatest wealth.', alternatives:['good health is the best asset.'], hint:'Health is wealth = proverb', type:'translation' },
  { id:'d72-004', hindi:'प्रौद्योगिकी ने हमारे जीवन को बदल दिया है।', english:'Technology has changed our lives.', alternatives:['technology has transformed the way we live.'], hint:'technology = प्रौद्योगिकी, changed = बदल दिया', type:'translation' },
  { id:'d72-005', hindi:'मेहनत और लगन सफलता की कुंजी है।', english:'Hard work and dedication are the keys to success.', alternatives:['perseverance and effort lead to success.'], hint:'keys to success = सफलता की कुंजी', type:'translation' },
  { id:'d72-006', hindi:'पानी बचाना हम सबकी ज़िम्मेदारी है।', english:'Saving water is the responsibility of all of us.', alternatives:['it is our duty to conserve water.'], hint:'responsibility = ज़िम्मेदारी, conserve = बचाना', type:'translation' },
  { id:'d72-007', hindi:'डिजिटल इंडिया अभियान से कई बदलाव आए हैं।', english:'The Digital India campaign has brought many changes.', alternatives:['digital india has made significant reforms.'], hint:'campaign = अभियान, changes = बदलाव', type:'translation' },
  { id:'d72-008', hindi:'खेल स्वास्थ्य के लिए बहुत ज़रूरी है।', english:'Sports is very essential for good health.', alternatives:['playing sports is necessary for health.'], hint:'sports / exercise = खेल, essential = ज़रूरी', type:'translation' },
  { id:'d72-009', hindi:'भ्रष्टाचार देश की प्रगति में बाधा है।', english:'Corruption is an obstacle to national progress.', alternatives:['corruption hinders the country\'s development.'], hint:'corruption = भ्रष्टाचार, obstacle = बाधा', type:'translation' },
  { id:'d72-010', hindi:'हमें अपनी संस्कृति पर गर्व होना चाहिए।', english:'We should be proud of our culture.', alternatives:['we must take pride in our traditions.'], hint:'proud of = गर्व होना, culture = संस्कृति', type:'translation' },
  { id:'d72-011', hindi:'पेड़ हमारे जीवन के लिए बहुत ज़रूरी हैं।', english:'Trees are very essential for our lives.', alternatives:['trees are vital for human survival.'], hint:'trees = पेड़, vital = ज़रूरी', type:'translation' },
  { id:'d72-012', hindi:'महिलाओं की शिक्षा समाज के विकास के लिए ज़रूरी है।', english:'Women\'s education is necessary for the development of society.', alternatives:["educating women is key to society's growth."], hint:"women's education = महिला शिक्षा", type:'translation' },
  { id:'d72-013', hindi:'बच्चों का भविष्य उनकी शिक्षा पर निर्भर है।', english:'Children\'s future depends on their education.', alternatives:["a child's future is shaped by their education."], hint:'depends on = निर्भर होना', type:'translation' },
  { id:'d72-014', hindi:'हमें हिंसा नहीं, शांति से समस्याएँ सुलझानी चाहिए।', english:'We should solve problems peacefully, not through violence.', alternatives:['problems should be resolved peacefully, not violently.'], hint:'peacefully = शांति से, violence = हिंसा', type:'translation' },
  { id:'d72-015', hindi:'मोबाइल का अत्यधिक उपयोग नुकसानदेह है।', english:'Excessive use of mobile phones is harmful.', alternatives:['overuse of smartphones is dangerous.'], hint:'excessive / overuse = अत्यधिक उपयोग, harmful = नुकसानदेह', type:'translation' },
];

// ============================================================
// Day 73 — Notice Writing + Writing Skills Practice
// ============================================================
const DAY_73 = [
  { id:'d73-001', hindi:'एतद्द्वारा सूचित किया जाता है।', english:'It is hereby notified.', alternatives:['this is to inform everyone.'], hint:'hereby notified = एतद्द्वारा सूचित', type:'translation' },
  { id:'d73-002', hindi:'सभी छात्रों को सूचित किया जाता है।', english:'All students are hereby informed.', alternatives:['notice to all students.'], hint:'All students are informed = सब छात्रों को सूचना', type:'translation' },
  { id:'d73-003', hindi:'परीक्षा कल होगी।', english:'The examination will be held tomorrow.', alternatives:['the test is scheduled for tomorrow.'], hint:'held = आयोजित होगी', type:'translation' },
  { id:'d73-004', hindi:'जो कोई भी उपस्थित नहीं होगा उसे अनुपस्थित माना जाएगा।', english:'Anyone who is not present will be marked absent.', alternatives:['absentees will be marked accordingly.'], hint:'marked absent = अनुपस्थित माना जाएगा', type:'translation' },
  { id:'d73-005', hindi:'यह सूचना सभी को दी जाए।', english:'This notice should be circulated to all.', alternatives:['please share this notice with everyone.'], hint:'circulated to all = सभी को दी जाए', type:'translation' },
  { id:'d73-006', hindi:'समय: सुबह 10 बजे से दोपहर 1 बजे तक।', english:'Time: 10 AM to 1 PM.', alternatives:['from 10 o\'clock to 1 o\'clock in the afternoon.'], hint:'Time = समय, AM = सुबह, PM = दोपहर/शाम', type:'translation' },
  { id:'d73-007', hindi:'स्थान: विद्यालय का सभागार।', english:'Venue: School Auditorium.', alternatives:['location: school hall.'], hint:'venue / location = स्थान', type:'translation' },
  { id:'d73-008', hindi:'कृपया समय पर उपस्थित रहें।', english:'Please be present on time.', alternatives:['kindly attend on time.'], hint:'be present on time = समय पर उपस्थित रहें', type:'translation' },
  { id:'d73-009', hindi:'विद्यार्थियों का सहयोग अपेक्षित है।', english:'Cooperation from students is expected.', alternatives:['students are requested to cooperate.'], hint:'cooperation expected = सहयोग अपेक्षित', type:'translation' },
  { id:'d73-010', hindi:'इस कार्यक्रम में भाग लेना अनिवार्य है।', english:'Participation in this event is compulsory.', alternatives:['it is mandatory to attend this programme.'], hint:'compulsory / mandatory = अनिवार्य', type:'translation' },
  { id:'d73-011', hindi:'अधिक जानकारी के लिए प्रधानाचार्य से मिलें।', english:'For more information, please meet the Principal.', alternatives:['contact the headmaster for further details.'], hint:'Principal = प्रधानाचार्य', type:'translation' },
  { id:'d73-012', hindi:'प्रवेश पत्र लाना आवश्यक है।', english:'It is necessary to bring the admit card.', alternatives:['hall ticket is compulsory.'], hint:'admit card / hall ticket = प्रवेश पत्र', type:'translation' },
  { id:'d73-013', hindi:'बैठक की अध्यक्षता प्रधानाचार्य करेंगे।', english:'The meeting will be chaired by the Principal.', alternatives:['the principal will preside over the meeting.'], hint:'chaired by = अध्यक्षता करना', type:'translation' },
  { id:'d73-014', hindi:'यह सूचना तत्काल प्रभाव से लागू होगी।', english:'This notice will come into effect immediately.', alternatives:['this notice is effective with immediate effect.'], hint:'with immediate effect = तत्काल प्रभाव से', type:'translation' },
  { id:'d73-015', hindi:'किसी भी प्रकार की शिकायत के लिए संपर्क करें।', english:'For any kind of complaint, please contact us.', alternatives:['reach out for any grievances.'], hint:'complaint / grievance = शिकायत', type:'translation' },
];

// ============================================================
// Day 74 — Grammar + Vocabulary + Speaking Full Revision
// ============================================================
const DAY_74 = [
  { id:'d74-001', hindi:'अगर तुम मेहनत करो, तो ज़रूर सफल होगे।', english:'If you work hard, you will definitely succeed.', alternatives:['you will succeed if you put in efforts.'], hint:'Conditional: If + Present + will + succeed', type:'translation' },
  { id:'d74-002', hindi:'उसने मुझे बताया कि वह आएगा।', english:'He told me that he would come.', alternatives:['he said that he was going to come.'], hint:'Reported Speech: told me + would come', type:'translation' },
  { id:'d74-003', hindi:'यह काम पहले ही हो जाना चाहिए था।', english:'This work should have been done earlier.', alternatives:['this should have been completed before.'], hint:'Should have been + past participle', type:'translation' },
  { id:'d74-004', hindi:'वह इतनी तेज़ दौड़ती है कि कोई उसे नहीं पकड़ सकता।', english:'She runs so fast that no one can catch her.', alternatives:['she is so quick that nobody can keep up.'], hint:'so + adjective + that + result', type:'translation' },
  { id:'d74-005', hindi:'मैं 10 साल से इस शहर में हूँ।', english:'I have been in this city for 10 years.', alternatives:['i have lived in this city for a decade.'], hint:'Present Perfect Continuous: have been + for + time', type:'translation' },
  { id:'d74-006', hindi:'जब वह बोलता है, सब सुनते हैं।', english:'When he speaks, everyone listens.', alternatives:['whenever he talks, people pay attention.'], hint:'When + Present + Present', type:'translation' },
  { id:'d74-007', hindi:'मुझे यह पहले क्यों नहीं बताया गया?', english:'Why was I not told this earlier?', alternatives:['why was this not communicated to me before?'], hint:'Passive Voice: was not told + earlier', type:'translation' },
  { id:'d74-008', hindi:'वह बहुत अच्छी तरह से बोलती है।', english:'She speaks very well.', alternatives:['she is an excellent speaker.'], hint:'speaks well = अच्छी तरह से बोलती है', type:'translation' },
  { id:'d74-009', hindi:'मुझे उस पर बहुत विश्वास है।', english:'I trust him a lot.', alternatives:['i have a lot of faith in him.'], hint:'trust / faith = विश्वास', type:'translation' },
  { id:'d74-010', hindi:'वह हमेशा मुझे प्रेरित करती है।', english:'She always motivates me.', alternatives:['she always inspires me.'], hint:'motivates / inspires = प्रेरित करना', type:'translation' },
  { id:'d74-011', hindi:'क्या तुमने कभी किसी विदेशी से बात की है?', english:'Have you ever spoken to a foreigner?', alternatives:['have you ever talked to someone from abroad?'], hint:'Have you ever + past participle ?', type:'translation' },
  { id:'d74-012', hindi:'वह अपने लक्ष्य की तरफ लगातार बढ़ रहा है।', english:'He is consistently moving towards his goal.', alternatives:['he is steadily working towards his aim.'], hint:'consistently / steadily = लगातार', type:'translation' },
  { id:'d74-013', hindi:'आत्मविश्वास से बोलना बहुत ज़रूरी है।', english:'It is very important to speak with confidence.', alternatives:['speaking confidently is essential.'], hint:'speak with confidence = आत्मविश्वास से बोलना', type:'translation' },
  { id:'d74-014', hindi:'मैंने जो भी सीखा है वह मैं practice करूँगा।', english:'I will practise everything I have learned.', alternatives:['i will apply all that i have learned.'], hint:'will practise + everything + have learned', type:'translation' },
  { id:'d74-015', hindi:'यह course complete करने के बाद मैं fluent English बोल सकूँगा।', english:'After completing this course, I will be able to speak fluent English.', alternatives:['i will speak english fluently after this course.'], hint:'After completing + will be able to + speak', type:'translation' },
];

// ============================================================
// Day 75 — Complete Mock Test + Final Revision
// ============================================================
const DAY_75 = [
  { id:'d75-001', hindi:'मैंने यह 75-दिन का चैलेंज पूरा कर लिया है।', english:'I have completed this 75-day challenge.', alternatives:['i have finished the 75 days hard english course.'], hint:'have completed = पूरा कर लिया है', type:'translation' },
  { id:'d75-002', hindi:'मुझे अपनी अंग्रेज़ी पर गर्व है।', english:'I am proud of my English.', alternatives:['i take pride in my english skills.'], hint:'I am proud of = मुझे गर्व है', type:'translation' },
  { id:'d75-003', hindi:'मैं अब fluently अंग्रेज़ी बोल सकता हूँ।', english:'I can now speak English fluently.', alternatives:['i am now able to speak english with confidence.'], hint:'can now = अब कर सकता हूँ', type:'translation' },
  { id:'d75-004', hindi:'मैंने जो सीखा वह कभी नहीं भूलूँगा।', english:'I will never forget what I have learned.', alternatives:['i shall always remember my learnings.'], hint:'will never forget + what + have learned', type:'translation' },
  { id:'d75-005', hindi:'मेहनत का फल हमेशा मीठा होता है।', english:'The fruits of hard work are always sweet.', alternatives:['hard work always pays off.'], hint:'fruits of hard work = मेहनत का फल', type:'translation' },
  { id:'d75-006', hindi:'मैं रोज़ अंग्रेज़ी का अभ्यास जारी रखूँगा।', english:'I will continue practising English every day.', alternatives:['i will keep practising english daily.'], hint:'continue practising = अभ्यास जारी रखना', type:'translation' },
  { id:'d75-007', hindi:'इस course ने मेरी ज़िंदगी बदल दी।', english:'This course has changed my life.', alternatives:['this programme has transformed me.'], hint:'has changed my life = ज़िंदगी बदल दी', type:'translation' },
  { id:'d75-008', hindi:'मैं अपने दोस्तों को भी यह course recommend करूँगा।', english:'I will also recommend this course to my friends.', alternatives:['i will suggest this course to my friends too.'], hint:'recommend / suggest = सुझाव देना', type:'translation' },
  { id:'d75-009', hindi:'अंग्रेज़ी बोलने का डर अब मुझे नहीं है।', english:'I am no longer afraid of speaking English.', alternatives:['i have overcome my fear of english.'], hint:'no longer afraid of = डर नहीं रहा', type:'translation' },
  { id:'d75-010', hindi:'मैं हर situation में अंग्रेज़ी बोल सकता हूँ।', english:'I can speak English in every situation.', alternatives:['i am confident to speak english anywhere.'], hint:'in every situation = हर situation में', type:'translation' },
  { id:'d75-011', hindi:'मेरे शब्दकोश में हज़ारों नए शब्द जुड़ गए हैं।', english:'Thousands of new words have been added to my vocabulary.', alternatives:['my vocabulary has expanded by thousands of words.'], hint:'vocabulary expanded = शब्दकोश बढ़ा है', type:'translation' },
  { id:'d75-012', hindi:'मैं किसी भी interview में अंग्रेज़ी दे सकता हूँ।', english:'I can give any interview in English.', alternatives:['i can face any job interview in english.'], hint:'can give interview = इंटरव्यू दे सकता हूँ', type:'translation' },
  { id:'d75-013', hindi:'यह सिर्फ शुरुआत है, सफर जारी रहेगा।', english:'This is just the beginning, the journey will continue.', alternatives:['this is only the start, i will keep going.'], hint:'journey continues = सफर जारी रहेगा', type:'translation' },
  { id:'d75-014', hindi:'मैं हर दिन बेहतर होता जाऊँगा।', english:'I will get better every day.', alternatives:['i will improve with each passing day.'], hint:'get better = बेहतर होना', type:'translation' },
  { id:'d75-015', hindi:'75 दिनों की मेहनत रंग लाई।', english:'75 days of hard work paid off.', alternatives:['the efforts of 75 days have finally borne fruit.'], hint:'paid off = रंग लाई / सफल हुई', type:'translation' },
];

// ============================================================
// COMPLETE QUESTIONS MAP — Days 31 to 75
// ============================================================
export const EXTENDED_QUESTIONS = {
  31: DAY_31,
  32: DAY_32,
  33: DAY_33,
  34: DAY_34,
  35: DAY_35,
  36: DAY_36,
  37: DAY_37,
  38: DAY_38,
  39: DAY_39,
  40: DAY_40,
  41: DAY_41,
  42: DAY_42,
  43: DAY_43,
  44: DAY_44,
  45: DAY_45,
  46: DAY_46,
  47: DAY_47,
  48: DAY_48,
  49: DAY_49,
  50: DAY_50,
  51: DAY_51,
  52: DAY_52,
  53: DAY_53,
  54: DAY_54,
  55: DAY_55,
  56: DAY_56,
  57: DAY_57,
  58: DAY_58,
  59: DAY_59,
  60: DAY_60,
  61: DAY_61,
  62: DAY_62,
  63: DAY_63,
  64: DAY_64,
  65: DAY_65,
  66: DAY_66,
  67: DAY_67,
  68: DAY_68,
  69: DAY_69,
  70: DAY_70,
  71: DAY_71,
  72: DAY_72,
  73: DAY_73,
  74: DAY_74,
  75: DAY_75,
};

// Export total question count for extended days
export const EXTENDED_QUESTION_COUNT = Object.fromEntries(
  Object.entries(EXTENDED_QUESTIONS).map(([day, qs]) => [day, qs.length])
);

// Get questions for a specific extended day
export function getExtendedQuestionsForDay(dayNum) {
  return EXTENDED_QUESTIONS[dayNum] || [];
}

export default EXTENDED_QUESTIONS;
