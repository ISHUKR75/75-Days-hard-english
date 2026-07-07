// Practice Questions Library — 75 Days Hard English
// Hindi questions → English translation practice
// Format: { id, hindi, english, alternatives[], hint, type }
// Types: translation | fill-blank | mcq | error-detection

// ============================================================
// Day 1 — Basics of English (Subject-Verb-Object structure)
// ============================================================
const DAY_01 = [
  { id:'d01-001', hindi:'मैं पानी पीता हूँ।', english:'I drink water.', alternatives:['i drink water'], hint:'Subject + Verb + Object', type:'translation' },
  { id:'d01-002', hindi:'वह खाना खाती है।', english:'She eats food.', alternatives:['she eats food.'], hint:'She/He + verb+s', type:'translation' },
  { id:'d01-003', hindi:'हम स्कूल जाते हैं।', english:'We go to school.', alternatives:['we go to school.'], hint:'We + base verb', type:'translation' },
  { id:'d01-004', hindi:'वे क्रिकेट खेलते हैं।', english:'They play cricket.', alternatives:['they play cricket.'], hint:'They + base verb', type:'translation' },
  { id:'d01-005', hindi:'मेरी माँ खाना बनाती है।', english:'My mother cooks food.', alternatives:['my mother cooks food.','my mom cooks food.'], hint:'Singular subject + verb+s', type:'translation' },
  { id:'d01-006', hindi:'मैं हर रोज़ व्यायाम करता हूँ।', english:'I exercise every day.', alternatives:['i exercise everyday.','i exercise every day.'], hint:'Daily routine = simple present', type:'translation' },
  { id:'d01-007', hindi:'वह किताब पढ़ता है।', english:'He reads a book.', alternatives:['he reads book.','he reads a book.'], hint:'He + reads (verb+s)', type:'translation' },
  { id:'d01-008', hindi:'तुम बहुत तेज़ दौड़ते हो।', english:'You run very fast.', alternatives:['you run very fast.'], hint:'You + base verb', type:'translation' },
  { id:'d01-009', hindi:'बच्चे खेलते हैं।', english:'Children play.', alternatives:['children play.','the children play.'], hint:'Plural = base verb (no +s)', type:'translation' },
  { id:'d01-010', hindi:'सूरज पूर्व से उगता है।', english:'The sun rises in the east.', alternatives:['sun rises in east.','the sun rises in east.'], hint:'Fact/truth = simple present', type:'translation' },
  { id:'d01-011', hindi:'मैं चाय पीता हूँ।', english:'I drink tea.', alternatives:['i drink tea.'], hint:'I + base verb', type:'translation' },
  { id:'d01-012', hindi:'वह ऑफिस जाती है।', english:'She goes to the office.', alternatives:['she goes to office.','she goes to the office.'], hint:'She + goes (irregular verb+s)', type:'translation' },
  { id:'d01-013', hindi:'मेरा भाई गाना गाता है।', english:'My brother sings a song.', alternatives:['my brother sings songs.'], hint:'Singular + verb+s', type:'translation' },
  { id:'d01-014', hindi:'कुत्ते भौंकते हैं।', english:'Dogs bark.', alternatives:['dogs bark.','the dogs bark.'], hint:'Plural noun + base verb', type:'translation' },
  { id:'d01-015', hindi:'मैं अंग्रेज़ी सीखता हूँ।', english:'I learn English.', alternatives:['i study english.','i am learning english.'], hint:'I + base verb', type:'translation' },
  { id:'d01-016', hindi:'वे हर दिन काम करते हैं।', english:'They work every day.', alternatives:['they work everyday.','they work every day.'], hint:'They + base verb', type:'translation' },
  { id:'d01-017', hindi:'मेरे दोस्त मेरी मदद करते हैं।', english:'My friends help me.', alternatives:['my friends help me.'], hint:'Plural subject + base verb', type:'translation' },
  { id:'d01-018', hindi:'पक्षी आकाश में उड़ते हैं।', english:'Birds fly in the sky.', alternatives:['birds fly in sky.','birds fly in the sky.'], hint:'Plural + base verb', type:'translation' },
  { id:'d01-019', hindi:'मैं सुबह जल्दी उठता हूँ।', english:'I wake up early in the morning.', alternatives:['i wake up early morning.','i get up early in the morning.'], hint:'I + base verb', type:'translation' },
  { id:'d01-020', hindi:'वह बहुत खुश रहती है।', english:'She stays very happy.', alternatives:['she is very happy.','she remains very happy.'], hint:'She + stays/is + adjective', type:'translation' },
  { id:'d01-021', hindi:'पानी ऊपर से नीचे बहता है।', english:'Water flows from top to bottom.', alternatives:['water flows downward.'], hint:'Scientific fact = simple present', type:'translation' },
  { id:'d01-022', hindi:'मेरे पिता अखबार पढ़ते हैं।', english:'My father reads the newspaper.', alternatives:['my father reads newspaper.'], hint:'Singular subject + reads', type:'translation' },
  { id:'d01-023', hindi:'हम मिलकर काम करते हैं।', english:'We work together.', alternatives:['we work together.'], hint:'We + base verb', type:'translation' },
  { id:'d01-024', hindi:'वह रात को देर से सोता है।', english:'He sleeps late at night.', alternatives:['he sleeps late at night.'], hint:'He + sleeps', type:'translation' },
  { id:'d01-025', hindi:'मेरी बहन नृत्य करती है।', english:'My sister dances.', alternatives:['my sister dances.','my sister dance.'], hint:'Singular + verb+s', type:'translation' },
  { id:'d01-026', hindi:'बादल आकाश में उड़ते हैं।', english:'Clouds float in the sky.', alternatives:['clouds float in sky.'], hint:'Plural + base verb', type:'translation' },
  { id:'d01-027', hindi:'मैं रोज़ नहाता हूँ।', english:'I take a bath every day.', alternatives:['i bathe every day.','i shower every day.'], hint:'Daily habit = simple present', type:'translation' },
  { id:'d01-028', hindi:'मेरे शिक्षक अच्छे हैं।', english:'My teachers are good.', alternatives:['my teachers are good.'], hint:'Plural + are', type:'translation' },
  { id:'d01-029', hindi:'वह बहुत मेहनत करता है।', english:'He works very hard.', alternatives:['he works hard.'], hint:'He + works (with +s)', type:'translation' },
  { id:'d01-030', hindi:'हम सब दोस्त हैं।', english:'We are all friends.', alternatives:['we all are friends.'], hint:'We + are', type:'translation' },
];

// ============================================================
// Day 2 — Self Introduction (Spoken English)
// ============================================================
const DAY_02 = [
  { id:'d02-001', hindi:'मेरा नाम राहुल है।', english:'My name is Rahul.', alternatives:['my name is rahul.'], hint:'My name is + Name', type:'translation' },
  { id:'d02-002', hindi:'मैं दिल्ली से हूँ।', english:'I am from Delhi.', alternatives:['i am from delhi.'], hint:'I am from + city', type:'translation' },
  { id:'d02-003', hindi:'मैं एक छात्र हूँ।', english:'I am a student.', alternatives:['i am student.'], hint:'I am a + noun', type:'translation' },
  { id:'d02-004', hindi:'मेरी उम्र 22 साल है।', english:'I am 22 years old.', alternatives:['i am 22.','my age is 22.'], hint:'I am + age + years old', type:'translation' },
  { id:'d02-005', hindi:'मैं एक सॉफ्टवेयर इंजीनियर हूँ।', english:'I am a software engineer.', alternatives:['i am software engineer.'], hint:'Profession = I am a + job', type:'translation' },
  { id:'d02-006', hindi:'मेरे परिवार में 4 लोग हैं।', english:'There are 4 people in my family.', alternatives:['my family has 4 members.','there are 4 members in my family.'], hint:'There are + number + in my family', type:'translation' },
  { id:'d02-007', hindi:'मुझे क्रिकेट खेलना पसंद है।', english:'I like playing cricket.', alternatives:['i love playing cricket.','i enjoy playing cricket.'], hint:'I like/love + verb+ing', type:'translation' },
  { id:'d02-008', hindi:'मेरी माँ गृहिणी हैं।', english:'My mother is a housewife.', alternatives:['my mom is a housewife.'], hint:'Mother + is a + noun', type:'translation' },
  { id:'d02-009', hindi:'मेरे पिता एक डॉक्टर हैं।', english:'My father is a doctor.', alternatives:['my dad is a doctor.'], hint:'Father + is a + profession', type:'translation' },
  { id:'d02-010', hindi:'मैं पिछले 2 साल से इंग्लिश सीख रहा हूँ।', english:'I have been learning English for 2 years.', alternatives:['i am learning english since 2 years.'], hint:'Perfect continuous tense', type:'translation' },
  { id:'d02-011', hindi:'आपसे मिलकर बहुत खुशी हुई।', english:'Nice to meet you.', alternatives:['pleased to meet you.','it is nice to meet you.'], hint:'Common greeting phrase', type:'translation' },
  { id:'d02-012', hindi:'मेरे दो भाई-बहन हैं।', english:'I have two siblings.', alternatives:['i have 2 siblings.','i have a brother and a sister.'], hint:'I have + number + siblings', type:'translation' },
  { id:'d02-013', hindi:'मैं मुंबई में रहता हूँ।', english:'I live in Mumbai.', alternatives:['i stay in mumbai.'], hint:'I live in + city', type:'translation' },
  { id:'d02-014', hindi:'मेरी रुचि संगीत में है।', english:'My hobby is music.', alternatives:['i am interested in music.','i love music.'], hint:'My hobby is + noun', type:'translation' },
  { id:'d02-015', hindi:'मैं एक साल से इस कंपनी में काम कर रहा हूँ।', english:'I have been working in this company for one year.', alternatives:['i am working here for 1 year.'], hint:'I have been + verb+ing + for', type:'translation' },
  { id:'d02-016', hindi:'क्या आप मुझे अपना परिचय दे सकते हैं?', english:'Can you introduce yourself?', alternatives:['could you introduce yourself?','would you please introduce yourself?'], hint:'Can you + verb + yourself?', type:'translation' },
  { id:'d02-017', hindi:'मैं एक बिज़नेस एनालिस्ट के रूप में काम करता हूँ।', english:'I work as a business analyst.', alternatives:['i am working as a business analyst.'], hint:'I work as a + job title', type:'translation' },
  { id:'d02-018', hindi:'मेरा जन्म पटना में हुआ था।', english:'I was born in Patna.', alternatives:['i am born in patna.'], hint:'Was born (past tense)', type:'translation' },
  { id:'d02-019', hindi:'मुझे यात्रा करना पसंद है।', english:'I love travelling.', alternatives:['i like travelling.','i enjoy travelling.'], hint:'I love/like + verb+ing', type:'translation' },
  { id:'d02-020', hindi:'मेरा लक्ष्य एक अच्छी नौकरी पाना है।', english:'My goal is to get a good job.', alternatives:['my aim is to get a good job.'], hint:'My goal is + to + verb', type:'translation' },
  { id:'d02-021', hindi:'मुझे किताबें पढ़ना बहुत अच्छा लगता है।', english:'I enjoy reading books very much.', alternatives:['i love reading books.'], hint:'I enjoy/love + verb+ing', type:'translation' },
  { id:'d02-022', hindi:'मैं अपने परिवार के साथ रहता हूँ।', english:'I live with my family.', alternatives:['i stay with my family.'], hint:'I live with + noun', type:'translation' },
  { id:'d02-023', hindi:'मेरे बॉस बहुत सहयोगी हैं।', english:'My boss is very supportive.', alternatives:['my manager is very supportive.'], hint:'My boss + is + adjective', type:'translation' },
  { id:'d02-024', hindi:'मैं हिंदी और अंग्रेज़ी दोनों बोल सकता हूँ।', english:'I can speak both Hindi and English.', alternatives:['i speak both hindi and english.'], hint:'I can speak + both languages', type:'translation' },
  { id:'d02-025', hindi:'मुझे खाना बनाना पसंद नहीं है।', english:'I do not like cooking.', alternatives:["i don't like cooking.",'i dislike cooking.'], hint:"I don't like + verb+ing", type:'translation' },
  { id:'d02-026', hindi:'मेरी उम्र 25 से 30 के बीच है।', english:'I am between 25 and 30 years old.', alternatives:['i am in my late twenties.'], hint:'I am between + age + and + age', type:'translation' },
  { id:'d02-027', hindi:'आपसे मिलना अच्छा लगा।', english:'It was nice meeting you.', alternatives:['it was great meeting you.'], hint:'It was nice + verb+ing', type:'translation' },
  { id:'d02-028', hindi:'मेरी पत्नी/पति बहुत समझदार हैं।', english:'My spouse is very understanding.', alternatives:['my wife is very understanding.','my husband is very understanding.'], hint:'My spouse + is + adjective', type:'translation' },
  { id:'d02-029', hindi:'मैं अपने काम में सर्वश्रेष्ठ देता हूँ।', english:'I give my best in my work.', alternatives:['i always give my best.','i put in my best effort.'], hint:'I give my best in + noun', type:'translation' },
  { id:'d02-030', hindi:'मुझे आशा है कि हम आगे मिलते रहेंगे।', english:'I hope we will meet again.', alternatives:['i hope to see you again.'], hint:'I hope + future tense', type:'translation' },
];

// ============================================================
// Day 3 — Imperative Sentences (Commands & Requests)
// ============================================================
const DAY_03 = [
  { id:'d03-001', hindi:'यहाँ बैठो।', english:'Sit here.', alternatives:['sit here.','please sit here.'], hint:'Direct command = base verb', type:'translation' },
  { id:'d03-002', hindi:'कृपया खिड़की बंद करो।', english:'Please close the window.', alternatives:['close the window please.'], hint:'Please + base verb + object', type:'translation' },
  { id:'d03-003', hindi:'शोर मत करो।', english:'Do not make noise.', alternatives:["don't make noise.",'do not be noisy.'], hint:"Don't / Do not + base verb", type:'translation' },
  { id:'d03-004', hindi:'मेरी मदद करो।', english:'Help me.', alternatives:['please help me.'], hint:'Base verb + object', type:'translation' },
  { id:'d03-005', hindi:'वहाँ मत जाओ।', english:'Do not go there.', alternatives:["don't go there.",'do not go there.'], hint:"Don't + verb", type:'translation' },
  { id:'d03-006', hindi:'अंदर आ जाओ।', english:'Come inside.', alternatives:['come in.','please come in.'], hint:'Come + direction', type:'translation' },
  { id:'d03-007', hindi:'अपना काम करो।', english:'Do your work.', alternatives:['do your job.','complete your work.'], hint:'Do + your + noun', type:'translation' },
  { id:'d03-008', hindi:'ध्यान से सुनो।', english:'Listen carefully.', alternatives:['listen attentively.','please listen carefully.'], hint:'Verb + adverb', type:'translation' },
  { id:'d03-009', hindi:'देर मत करो।', english:'Do not be late.', alternatives:["don't be late.",'do not delay.'], hint:"Don't + be + adjective", type:'translation' },
  { id:'d03-010', hindi:'कृपया धीरे बोलो।', english:'Please speak slowly.', alternatives:['please speak slow.'], hint:'Please + speak + adverb', type:'translation' },
  { id:'d03-011', hindi:'पानी पियो।', english:'Drink water.', alternatives:['drink some water.'], hint:'Base verb + object', type:'translation' },
  { id:'d03-012', hindi:'इधर देखो।', english:'Look here.', alternatives:['look over here.'], hint:'Look + direction', type:'translation' },
  { id:'d03-013', hindi:'झूठ मत बोलो।', english:'Do not lie.', alternatives:["don't lie.",'do not tell lies.'], hint:"Don't + verb", type:'translation' },
  { id:'d03-014', hindi:'मेहनत से पढ़ो।', english:'Study hard.', alternatives:['study with hard work.'], hint:'Verb + adverb', type:'translation' },
  { id:'d03-015', hindi:'कृपया मुझे माफ़ करें।', english:'Please forgive me.', alternatives:['please excuse me.','please pardon me.'], hint:'Please + verb + me', type:'translation' },
  { id:'d03-016', hindi:'दरवाज़ा खोलो।', english:'Open the door.', alternatives:['open the door please.'], hint:'Open + the + noun', type:'translation' },
  { id:'d03-017', hindi:'मेरे पीछे आओ।', english:'Come after me.', alternatives:['follow me.'], hint:'Come + after me', type:'translation' },
  { id:'d03-018', hindi:'इस कमरे में मत आओ।', english:'Do not enter this room.', alternatives:["don't come into this room.",'do not come in this room.'], hint:"Don't + enter/come into", type:'translation' },
  { id:'d03-019', hindi:'फ़ोन रख दो।', english:'Keep the phone down.', alternatives:['put the phone down.'], hint:'Put/Keep + object + down', type:'translation' },
  { id:'d03-020', hindi:'कृपया बैठ जाइए।', english:'Please have a seat.', alternatives:['please sit down.','please be seated.'], hint:'Please have a seat (formal)', type:'translation' },
  { id:'d03-021', hindi:'जल्दी करो।', english:'Hurry up.', alternatives:['be quick.','please hurry.'], hint:'Hurry up = common phrase', type:'translation' },
  { id:'d03-022', hindi:'चिंता मत करो।', english:'Do not worry.', alternatives:["don't worry.",'stop worrying.'], hint:"Don't worry = common phrase", type:'translation' },
  { id:'d03-023', hindi:'यहाँ खड़े रहो।', english:'Stand here.', alternatives:['stay here.','remain standing here.'], hint:'Stand/Stay + here', type:'translation' },
  { id:'d03-024', hindi:'अपना ख्याल रखो।', english:'Take care of yourself.', alternatives:['take care.'], hint:'Take care of + yourself', type:'translation' },
  { id:'d03-025', hindi:'किसी से झगड़ा मत करो।', english:'Do not fight with anyone.', alternatives:["don't argue with anyone.",'do not quarrel with anyone.'], hint:"Don't + fight/argue + with anyone", type:'translation' },
  { id:'d03-026', hindi:'समय पर आना।', english:'Come on time.', alternatives:['be on time.','arrive on time.'], hint:'Come/Be on time', type:'translation' },
  { id:'d03-027', hindi:'मुझे बताओ।', english:'Tell me.', alternatives:['let me know.','inform me.'], hint:'Tell + me', type:'translation' },
  { id:'d03-028', hindi:'खाना खाओ।', english:'Eat your food.', alternatives:['eat food.','have your meal.'], hint:'Eat + your food', type:'translation' },
  { id:'d03-029', hindi:'तेज़ मत दौड़ो।', english:'Do not run fast.', alternatives:["don't run fast.",'do not run so fast.'], hint:"Don't + run", type:'translation' },
  { id:'d03-030', hindi:'मुझसे झूठ मत बोलो।', english:'Do not lie to me.', alternatives:["don't lie to me.",'do not tell me lies.'], hint:"Don't + lie + to me", type:'translation' },
];

// ============================================================
// Day 4 — Be Verb (am/is/are/was/were)
// ============================================================
const DAY_04 = [
  { id:'d04-001', hindi:'मैं थका हुआ हूँ।', english:'I am tired.', alternatives:['i am exhausted.'], hint:'I am + adjective', type:'translation' },
  { id:'d04-002', hindi:'वह एक डॉक्टर है।', english:'He is a doctor.', alternatives:['she is a doctor.'], hint:'He/She is a + profession', type:'translation' },
  { id:'d04-003', hindi:'हम खुश हैं।', english:'We are happy.', alternatives:['we are glad.'], hint:'We are + adjective', type:'translation' },
  { id:'d04-004', hindi:'यह किताब अच्छी है।', english:'This book is good.', alternatives:['this is a good book.'], hint:'This + is + adjective', type:'translation' },
  { id:'d04-005', hindi:'वे तैयार हैं।', english:'They are ready.', alternatives:['they are prepared.'], hint:'They are + adjective', type:'translation' },
  { id:'d04-006', hindi:'मैं कल बीमार था।', english:'I was sick yesterday.', alternatives:['i was ill yesterday.'], hint:'Was = past of am/is', type:'translation' },
  { id:'d04-007', hindi:'वे कल ऑफिस में थे।', english:'They were in the office yesterday.', alternatives:['they were at office yesterday.'], hint:'Were = past of are', type:'translation' },
  { id:'d04-008', hindi:'क्या तुम ठीक हो?', english:'Are you okay?', alternatives:['are you alright?','are you fine?'], hint:'Are you + adjective?', type:'translation' },
  { id:'d04-009', hindi:'मौसम बहुत गर्म है।', english:'The weather is very hot.', alternatives:['it is very hot.'], hint:'Weather + is + adjective', type:'translation' },
  { id:'d04-010', hindi:'वह मेरी दोस्त है।', english:'She is my friend.', alternatives:['she is my best friend.'], hint:'She is + my + noun', type:'translation' },
  { id:'d04-011', hindi:'मैं एक छात्र हूँ।', english:'I am a student.', alternatives:['i am student.'], hint:'I am a + noun', type:'translation' },
  { id:'d04-012', hindi:'यह घर बड़ा है।', english:'This house is big.', alternatives:['this house is large.'], hint:'This + noun + is + adjective', type:'translation' },
  { id:'d04-013', hindi:'क्या आप तैयार हैं?', english:'Are you ready?', alternatives:['are you prepared?'], hint:'Are you + adjective?', type:'translation' },
  { id:'d04-014', hindi:'बाज़ार बंद था।', english:'The market was closed.', alternatives:['the shop was closed.'], hint:'Was = past singular', type:'translation' },
  { id:'d04-015', hindi:'वे बहुत व्यस्त थे।', english:'They were very busy.', alternatives:['they were quite busy.'], hint:'Were = past plural', type:'translation' },
  { id:'d04-016', hindi:'मेरे दोस्त होशियार हैं।', english:'My friends are intelligent.', alternatives:['my friends are smart.','my friends are clever.'], hint:'Plural + are + adjective', type:'translation' },
  { id:'d04-017', hindi:'खाना ठंडा है।', english:'The food is cold.', alternatives:['food is cold.'], hint:'Noun + is + adjective', type:'translation' },
  { id:'d04-018', hindi:'मैं गुस्से में नहीं हूँ।', english:'I am not angry.', alternatives:["i'm not angry.",'i am not upset.'], hint:'I am not + adjective', type:'translation' },
  { id:'d04-019', hindi:'वह कहाँ है?', english:'Where is he?', alternatives:['where is she?'], hint:'Where + is + subject?', type:'translation' },
  { id:'d04-020', hindi:'आसमान नीला है।', english:'The sky is blue.', alternatives:['sky is blue.'], hint:'Noun + is + color', type:'translation' },
  { id:'d04-021', hindi:'क्या तुम खुश हो?', english:'Are you happy?', alternatives:['are you glad?'], hint:'Are you + adjective?', type:'translation' },
  { id:'d04-022', hindi:'हम सब भारतीय हैं।', english:'We are all Indians.', alternatives:['we all are indians.'], hint:'We are + all + nationality', type:'translation' },
  { id:'d04-023', hindi:'मेरा नाम गलत था।', english:'My name was wrong.', alternatives:['my name was incorrect.'], hint:'My name + was + adjective', type:'translation' },
  { id:'d04-024', hindi:'वह बहुत अच्छी इंसान है।', english:'She is a very good person.', alternatives:['she is a great person.'], hint:'She is a + adjective + noun', type:'translation' },
  { id:'d04-025', hindi:'कमरे में 5 लोग हैं।', english:'There are 5 people in the room.', alternatives:['there are five people in the room.'], hint:'There are + number + noun', type:'translation' },
  { id:'d04-026', hindi:'मेरी तबियत अच्छी नहीं है।', english:'I am not feeling well.', alternatives:['i am not well.','i do not feel good.'], hint:'I am not + well/feeling well', type:'translation' },
  { id:'d04-027', hindi:'वे सब पढ़े-लिखे हैं।', english:'They are all educated.', alternatives:['all of them are educated.'], hint:'They are all + adjective', type:'translation' },
  { id:'d04-028', hindi:'यह सच है।', english:'This is true.', alternatives:['it is true.','this is correct.'], hint:'This/It is + adjective', type:'translation' },
  { id:'d04-029', hindi:'उसकी बात सही थी।', english:'His point was correct.', alternatives:['his point was right.','what he said was correct.'], hint:'Noun + was + adjective', type:'translation' },
  { id:'d04-030', hindi:'बच्चे बहुत शरारती होते हैं।', english:'Children are very naughty.', alternatives:['kids are very naughty.'], hint:'Plural + are + adjective', type:'translation' },
];

// ============================================================
// Day 5 — Demonstrative Pronouns (This/That/These/Those)
// ============================================================
const DAY_05 = [
  { id:'d05-001', hindi:'यह मेरी कार है।', english:'This is my car.', alternatives:['this is my car.'], hint:'This = nearby singular', type:'translation' },
  { id:'d05-002', hindi:'वह एक पुरानी इमारत है।', english:'That is an old building.', alternatives:['that is an old building.'], hint:'That = far singular', type:'translation' },
  { id:'d05-003', hindi:'ये मेरी किताबें हैं।', english:'These are my books.', alternatives:['these are my books.'], hint:'These = nearby plural', type:'translation' },
  { id:'d05-004', hindi:'वे बच्चे हमारे स्कूल के हैं।', english:'Those children are from our school.', alternatives:['those kids are from our school.'], hint:'Those = far plural', type:'translation' },
  { id:'d05-005', hindi:'यह क्या है?', english:'What is this?', alternatives:['what is this?'], hint:'What is this? (near)', type:'translation' },
  { id:'d05-006', hindi:'वह कौन है?', english:'Who is that?', alternatives:['who is that?'], hint:'Who is that? (far)', type:'translation' },
  { id:'d05-007', hindi:'ये फूल बहुत सुंदर हैं।', english:'These flowers are very beautiful.', alternatives:['these flowers are very pretty.'], hint:'These + plural + are', type:'translation' },
  { id:'d05-008', hindi:'वे पहाड़ बहुत ऊँचे हैं।', english:'Those mountains are very high.', alternatives:['those mountains are very tall.'], hint:'Those + plural + are + adjective', type:'translation' },
  { id:'d05-009', hindi:'क्या यह तुम्हारा फ़ोन है?', english:'Is this your phone?', alternatives:['is this your mobile?'], hint:'Is this your + noun?', type:'translation' },
  { id:'d05-010', hindi:'वह मेरा घर नहीं है।', english:'That is not my house.', alternatives:["that isn't my house.",'that is not my home.'], hint:'That is not + my + noun', type:'translation' },
  { id:'d05-011', hindi:'यह समस्या बड़ी है।', english:'This problem is big.', alternatives:['this issue is big.'], hint:'This + noun + is + adjective', type:'translation' },
  { id:'d05-012', hindi:'ये सेब मीठे हैं।', english:'These apples are sweet.', alternatives:['these apples taste sweet.'], hint:'These + plural + are + adjective', type:'translation' },
  { id:'d05-013', hindi:'वे लड़के शोर मचा रहे हैं।', english:'Those boys are making noise.', alternatives:['those boys are being noisy.'], hint:'Those + noun + are + verb+ing', type:'translation' },
  { id:'d05-014', hindi:'यह सच्चाई है।', english:'This is the truth.', alternatives:['this is true.','this is the reality.'], hint:'This is the + noun', type:'translation' },
  { id:'d05-015', hindi:'वह मेरी गलती थी।', english:'That was my mistake.', alternatives:['that was my fault.'], hint:'That was my + noun', type:'translation' },
  { id:'d05-016', hindi:'ये तस्वीरें बहुत अच्छी हैं।', english:'These pictures are very nice.', alternatives:['these photos are very beautiful.'], hint:'These + noun + are + adjective', type:'translation' },
  { id:'d05-017', hindi:'वे पेड़ बहुत पुराने हैं।', english:'Those trees are very old.', alternatives:['those trees are quite old.'], hint:'Those + noun + are + adjective', type:'translation' },
  { id:'d05-018', hindi:'क्या यह सही है?', english:'Is this correct?', alternatives:['is this right?'], hint:'Is this + adjective?', type:'translation' },
  { id:'d05-019', hindi:'यह मेरी ज़िम्मेदारी है।', english:'This is my responsibility.', alternatives:['this is my duty.'], hint:'This is my + noun', type:'translation' },
  { id:'d05-020', hindi:'वे दिन बहुत अच्छे थे।', english:'Those days were very good.', alternatives:['those were good days.'], hint:'Those days were + adjective', type:'translation' },
  { id:'d05-021', hindi:'यह मौका मत गँवाओ।', english:'Do not miss this opportunity.', alternatives:["don't miss this chance.",'do not waste this opportunity.'], hint:"Don't miss this + noun", type:'translation' },
  { id:'d05-022', hindi:'ये सवाल बहुत कठिन हैं।', english:'These questions are very difficult.', alternatives:['these questions are very hard.'], hint:'These + noun + are + adjective', type:'translation' },
  { id:'d05-023', hindi:'वह बहुत दूर है।', english:'That is very far.', alternatives:['that place is very far.'], hint:'That is + very + adjective', type:'translation' },
  { id:'d05-024', hindi:'यह रास्ता सही है।', english:'This is the right way.', alternatives:['this is the correct path.'], hint:'This is the right + noun', type:'translation' },
  { id:'d05-025', hindi:'वे नियम पुराने हो गए हैं।', english:'Those rules are outdated.', alternatives:['those rules are old now.'], hint:'Those + noun + are + adjective', type:'translation' },
  { id:'d05-026', hindi:'ये फल बहुत ताज़े हैं।', english:'These fruits are very fresh.', alternatives:['these fruits are quite fresh.'], hint:'These + noun + are + adjective', type:'translation' },
  { id:'d05-027', hindi:'यह काम कल तक हो जाएगा।', english:'This work will be done by tomorrow.', alternatives:['this will be completed by tomorrow.'], hint:'This + will be + done + by', type:'translation' },
  { id:'d05-028', hindi:'वह लड़की मेरी बहन की दोस्त है।', english:'That girl is my sister\'s friend.', alternatives:['that girl is a friend of my sister.'], hint:'That + noun + is + possessive', type:'translation' },
  { id:'d05-029', hindi:'ये मेरे सपने हैं।', english:'These are my dreams.', alternatives:['these are my goals.'], hint:'These are my + plural noun', type:'translation' },
  { id:'d05-030', hindi:'वह एक ऐतिहासिक पल था।', english:'That was a historic moment.', alternatives:['that was a historical moment.'], hint:'That was a + adjective + noun', type:'translation' },
];

// ============================================================
// Day 6 — Has / Have (Possession & Obligation)
// ============================================================
const DAY_06 = [
  { id:'d06-001', hindi:'मेरे पास एक गाड़ी है।', english:'I have a car.', alternatives:['i have got a car.','i own a car.'], hint:'I have + article + noun', type:'translation' },
  { id:'d06-002', hindi:'उसके पास बहुत पैसा है।', english:'He has a lot of money.', alternatives:['he has lots of money.'], hint:'He/She has + noun', type:'translation' },
  { id:'d06-003', hindi:'क्या तुम्हारे पास समय है?', english:'Do you have time?', alternatives:['have you got time?'], hint:'Do you have + noun?', type:'translation' },
  { id:'d06-004', hindi:'मेरे पास एक अच्छी नौकरी है।', english:'I have a good job.', alternatives:['i have got a good job.'], hint:'I have a + adjective + noun', type:'translation' },
  { id:'d06-005', hindi:'उसके दो बच्चे हैं।', english:'She has two children.', alternatives:['she has 2 kids.'], hint:'She has + number + noun', type:'translation' },
  { id:'d06-006', hindi:'मेरे पास फ़ोन नहीं है।', english:'I do not have a phone.', alternatives:["i don't have a phone.",'i have no phone.'], hint:"I don't have + noun", type:'translation' },
  { id:'d06-007', hindi:'उनके पास बड़ा घर है।', english:'They have a big house.', alternatives:['they have a large house.'], hint:'They have a + adjective + noun', type:'translation' },
  { id:'d06-008', hindi:'क्या उसके पास पेन है?', english:'Does he have a pen?', alternatives:['has he got a pen?'], hint:'Does he/she have + article + noun?', type:'translation' },
  { id:'d06-009', hindi:'हमारे पास कोई विकल्प नहीं है।', english:'We have no option.', alternatives:['we do not have any option.'], hint:'We have no + noun', type:'translation' },
  { id:'d06-010', hindi:'मेरे पास 500 रुपए हैं।', english:'I have 500 rupees.', alternatives:['i have five hundred rupees.'], hint:'I have + amount + currency', type:'translation' },
  { id:'d06-011', hindi:'उस कंपनी में 1000 कर्मचारी हैं।', english:'That company has 1000 employees.', alternatives:['that company has a thousand employees.'], hint:'Company + has + number + noun', type:'translation' },
  { id:'d06-012', hindi:'मेरे पास तुम्हारे लिए एक खबर है।', english:'I have news for you.', alternatives:['i have some news for you.'], hint:'I have + noun + for you', type:'translation' },
  { id:'d06-013', hindi:'क्या आपके पास ID Card है?', english:'Do you have an ID card?', alternatives:['have you got an ID card?'], hint:'Do you have + article + noun?', type:'translation' },
  { id:'d06-014', hindi:'इस शहर में कोई अच्छा अस्पताल नहीं है।', english:'This city does not have a good hospital.', alternatives:['there is no good hospital in this city.'], hint:'City + does not have + noun', type:'translation' },
  { id:'d06-015', hindi:'उसके पास अच्छी अंग्रेज़ी नहीं है।', english:'He does not have good English.', alternatives:["he doesn't have good english skills.",'his english is not good.'], hint:'Does not have + noun', type:'translation' },
  { id:'d06-016', hindi:'मेरे पास थोड़ा समय है।', english:'I have a little time.', alternatives:['i have some time.'], hint:'I have a little/some + noun', type:'translation' },
  { id:'d06-017', hindi:'उसके पास शानदार विचार हैं।', english:'She has brilliant ideas.', alternatives:['she has great ideas.'], hint:'She has + adjective + plural noun', type:'translation' },
  { id:'d06-018', hindi:'हमारे पास कोई सुराग नहीं है।', english:'We have no clue.', alternatives:['we do not have any clue.'], hint:'We have no + noun', type:'translation' },
  { id:'d06-019', hindi:'मेरे पास तुमसे एक सवाल है।', english:'I have a question for you.', alternatives:['i have something to ask you.'], hint:'I have a + noun + for you', type:'translation' },
  { id:'d06-020', hindi:'भारत में बहुत सारी भाषाएँ हैं।', english:'India has many languages.', alternatives:['india has a lot of languages.'], hint:'Country + has + many + noun', type:'translation' },
  { id:'d06-021', hindi:'मेरे पास तुम्हारे लिए बुरी खबर है।', english:'I have bad news for you.', alternatives:['i have some bad news for you.'], hint:'I have + adjective + news', type:'translation' },
  { id:'d06-022', hindi:'क्या उनके पास अनुभव है?', english:'Do they have experience?', alternatives:['have they got experience?'], hint:'Do they have + noun?', type:'translation' },
  { id:'d06-023', hindi:'इस फोन में अच्छा कैमरा है।', english:'This phone has a good camera.', alternatives:['this phone has a great camera.'], hint:'Noun + has + article + adjective + noun', type:'translation' },
  { id:'d06-024', hindi:'मेरी बहन के पास लंबे बाल हैं।', english:'My sister has long hair.', alternatives:['my sister has got long hair.'], hint:'Subject + has + adjective + noun', type:'translation' },
  { id:'d06-025', hindi:'क्या तुम्हारे पास कोई शिकायत है?', english:'Do you have any complaint?', alternatives:['have you got any complaint?'], hint:'Do you have any + noun?', type:'translation' },
  { id:'d06-026', hindi:'इस पार्टी में 50 लोग हैं।', english:'This party has 50 people.', alternatives:['there are 50 people at this party.'], hint:'This + noun + has + number + noun', type:'translation' },
  { id:'d06-027', hindi:'उसके पास बहुत आत्मविश्वास है।', english:'He has a lot of confidence.', alternatives:['he has great confidence.'], hint:'Subject + has + noun', type:'translation' },
  { id:'d06-028', hindi:'मेरे पास तुम्हारे लिए कुछ सलाह है।', english:'I have some advice for you.', alternatives:['i have some suggestions for you.'], hint:'I have some + noun + for you', type:'translation' },
  { id:'d06-029', hindi:'उस रेस्टोरेंट में 4 मंज़िल हैं।', english:'That restaurant has 4 floors.', alternatives:['that restaurant has four floors.'], hint:'Noun + has + number + noun', type:'translation' },
  { id:'d06-030', hindi:'हमारे देश में बहुत सारे त्योहार हैं।', english:'Our country has many festivals.', alternatives:['our country has a lot of festivals.'], hint:'Country + has + many + noun', type:'translation' },
];

// ============================================================
// Day 7 — Had (Past Possession & Experience)
// ============================================================
const DAY_07 = [
  { id:'d07-001', hindi:'मेरे पास एक पुरानी साइकिल थी।', english:'I had an old bicycle.', alternatives:['i had an old bike.'], hint:'I had + article + noun', type:'translation' },
  { id:'d07-002', hindi:'उसके पास बहुत पैसा था।', english:'He had a lot of money.', alternatives:['he had lots of money.'], hint:'He/She had + noun', type:'translation' },
  { id:'d07-003', hindi:'क्या तुम्हारे पास गाड़ी थी?', english:'Did you have a car?', alternatives:['had you a car?'], hint:'Did you have + article + noun?', type:'translation' },
  { id:'d07-004', hindi:'उस समय हमारे पास ज़्यादा विकल्प नहीं थे।', english:'At that time, we did not have many options.', alternatives:["at that time, we didn't have many options."], hint:'Did not have + many + noun', type:'translation' },
  { id:'d07-005', hindi:'उन्होंने एक बड़ा व्यवसाय चलाया था।', english:'They had a big business.', alternatives:['they used to have a big business.'], hint:'They had + article + noun', type:'translation' },
  { id:'d07-006', hindi:'मेरे दादाजी के पास ज़मीन थी।', english:'My grandfather had land.', alternatives:['my grandfather had some land.'], hint:'Grandfather + had + noun', type:'translation' },
  { id:'d07-007', hindi:'क्या उसके पास कोई सबूत था?', english:'Did he have any evidence?', alternatives:['was there any evidence with him?'], hint:'Did he/she have + any + noun?', type:'translation' },
  { id:'d07-008', hindi:'पहले मेरे बाल लंबे थे।', english:'I used to have long hair.', alternatives:['i had long hair before.'], hint:'Had/Used to have + adjective + noun', type:'translation' },
  { id:'d07-009', hindi:'उस लड़की के पास बहुत प्रतिभा थी।', english:'That girl had great talent.', alternatives:['that girl had a lot of talent.'], hint:'Subject + had + adjective + noun', type:'translation' },
  { id:'d07-010', hindi:'हमारे पास एक प्यारा कुत्ता था।', english:'We had a lovely dog.', alternatives:['we had a cute dog.'], hint:'We had a + adjective + noun', type:'translation' },
  { id:'d07-011', hindi:'उस शहर में कभी ट्रैफिक नहीं था।', english:'That city had no traffic.', alternatives:['there was no traffic in that city.'], hint:'City + had no + noun', type:'translation' },
  { id:'d07-012', hindi:'मेरे बचपन में बहुत मज़ा था।', english:'I had a lot of fun in my childhood.', alternatives:['my childhood was very fun.'], hint:'Had a lot of fun + in + time period', type:'translation' },
  { id:'d07-013', hindi:'क्या तुम्हारे पास उसका नंबर था?', english:'Did you have his number?', alternatives:['did you have her number?'], hint:'Did you have + possessive + noun?', type:'translation' },
  { id:'d07-014', hindi:'उस कंपनी में बहुत अच्छी सुविधाएँ थीं।', english:'That company had very good facilities.', alternatives:['that company had great facilities.'], hint:'Company + had + adjective + plural noun', type:'translation' },
  { id:'d07-015', hindi:'मेरे पास वक्त था पर इच्छाशक्ति नहीं।', english:'I had time but not the willpower.', alternatives:['i had time but no willpower.'], hint:'Had + noun + but + not', type:'translation' },
  { id:'d07-016', hindi:'पहले घर पर एक बगीचा था।', english:'There used to be a garden at home.', alternatives:['we had a garden at home before.'], hint:'Used to have/be + article + noun', type:'translation' },
  { id:'d07-017', hindi:'उसके पास अच्छे संपर्क थे।', english:'He had good contacts.', alternatives:['he had great connections.'], hint:'He had + adjective + plural noun', type:'translation' },
  { id:'d07-018', hindi:'हमने उस समय मज़ा किया था।', english:'We had a great time then.', alternatives:['we had fun at that time.'], hint:'We had a great time + time expression', type:'translation' },
  { id:'d07-019', hindi:'उस स्कूल में 2000 छात्र थे।', english:'That school had 2000 students.', alternatives:['there were 2000 students in that school.'], hint:'School + had + number + noun', type:'translation' },
  { id:'d07-020', hindi:'मेरे पास कोई जवाब नहीं था।', english:'I had no answer.', alternatives:['i did not have any answer.'], hint:'I had no + noun', type:'translation' },
  { id:'d07-021', hindi:'उसके पास हर सवाल का जवाब था।', english:'He had an answer for every question.', alternatives:['he had answers to all questions.'], hint:'Subject + had + noun + for every + noun', type:'translation' },
  { id:'d07-022', hindi:'हमारे पास खाने के लिए कुछ नहीं था।', english:'We had nothing to eat.', alternatives:['we did not have anything to eat.'], hint:'We had nothing + to + verb', type:'translation' },
  { id:'d07-023', hindi:'उसने सोचा था कि वह जीत जाएगा।', english:'He thought he would win.', alternatives:['he had thought that he would win.'], hint:'He thought / had thought + future in past', type:'translation' },
  { id:'d07-024', hindi:'मेरे पास उस वक्त बहुत काम था।', english:'I had a lot of work at that time.', alternatives:['i was very busy at that time.'], hint:'I had a lot of + noun + at that time', type:'translation' },
  { id:'d07-025', hindi:'उन दिनों उसके पास अच्छा स्वास्थ्य था।', english:'In those days, he had good health.', alternatives:['he was healthy in those days.'], hint:'Subject + had + adjective + noun', type:'translation' },
  { id:'d07-026', hindi:'जब वह बच्चा था, उसके बहुत दोस्त थे।', english:'When he was a child, he had many friends.', alternatives:['as a child, he had many friends.'], hint:'When + past clause + had + noun', type:'translation' },
  { id:'d07-027', hindi:'उसके पास कोई बहाना नहीं था।', english:'He had no excuse.', alternatives:['he did not have any excuse.'], hint:'He had no + noun', type:'translation' },
  { id:'d07-028', hindi:'पहले उसके पास सारे जवाब थे।', english:'Earlier, she had all the answers.', alternatives:['she used to have all the answers.'], hint:'Used to have + all + noun', type:'translation' },
  { id:'d07-029', hindi:'उस समय हमारे पास कोई तकनीक नहीं थी।', english:'At that time, we had no technology.', alternatives:['there was no technology back then.'], hint:'Had no + noun + back then', type:'translation' },
  { id:'d07-030', hindi:'मेरी दादी के पास बहुत ज्ञान था।', english:'My grandmother had a lot of wisdom.', alternatives:['my grandmother was very wise.'], hint:'Grandmother + had + a lot of + noun', type:'translation' },
];

// ============================================================
// Day 8 — Will Have (Future Possession)
// ============================================================
const DAY_08 = [
  { id:'d08-001', hindi:'अगले साल मेरे पास नई गाड़ी होगी।', english:'Next year, I will have a new car.', alternatives:['i will have a new car next year.'], hint:'Will have + article + adjective + noun', type:'translation' },
  { id:'d08-002', hindi:'2025 तक उसके पास डिग्री होगी।', english:'By 2025, she will have a degree.', alternatives:['she will have her degree by 2025.'], hint:'By + year + will have + noun', type:'translation' },
  { id:'d08-003', hindi:'क्या तुम्हारे पास कल समय होगा?', english:'Will you have time tomorrow?', alternatives:['will you be free tomorrow?'], hint:'Will you have + noun + time expression?', type:'translation' },
  { id:'d08-004', hindi:'वे जल्द ही अपना खुद का घर ले लेंगे।', english:'They will soon have their own house.', alternatives:['they will have their own home soon.'], hint:'Will have + their own + noun', type:'translation' },
  { id:'d08-005', hindi:'अगले महीने हमारे पास नया ऑफिस होगा।', english:'We will have a new office next month.', alternatives:['next month we will have a new office.'], hint:'Will have + article + adjective + noun', type:'translation' },
  { id:'d08-006', hindi:'जब तुम बड़े होगे, तुम्हारे पास ज़्यादा ज़िम्मेदारियाँ होंगी।', english:'When you grow up, you will have more responsibilities.', alternatives:['you will have more responsibilities when you grow up.'], hint:'When + clause + will have + more + noun', type:'translation' },
  { id:'d08-007', hindi:'क्या वह अगले साल शादी कर चुकी होगी?', english:'Will she have got married by next year?', alternatives:['will she be married by next year?'], hint:'Will have + got/been', type:'translation' },
  { id:'d08-008', hindi:'2030 तक भारत बहुत विकसित होगा।', english:'By 2030, India will have developed a lot.', alternatives:['india will have advanced a lot by 2030.'], hint:'By + year + will have + verb3', type:'translation' },
  { id:'d08-009', hindi:'कल शाम तक वह काम खत्म कर चुका होगा।', english:'By tomorrow evening, he will have finished the work.', alternatives:['he will have completed the work by tomorrow evening.'], hint:'By + time + will have + verb3', type:'translation' },
  { id:'d08-010', hindi:'तुम एक साल में fluent English बोल पाओगे।', english:'You will have fluent English in one year.', alternatives:['in one year, you will be fluent in english.'], hint:'Will have + noun + in + time', type:'translation' },
  { id:'d08-011', hindi:'तब तक वह बहुत अनुभव ले चुका होगा।', english:'By then, he will have gained a lot of experience.', alternatives:['by that time, he will have a lot of experience.'], hint:'By then + will have + gained + noun', type:'translation' },
  { id:'d08-012', hindi:'अगले 5 साल में उसके पास खुद का व्यवसाय होगा।', english:'In the next 5 years, he will have his own business.', alternatives:['he will have his own business in 5 years.'], hint:'In + time + will have + own + noun', type:'translation' },
  { id:'d08-013', hindi:'तुमने तब तक 1000 शब्द सीख लिए होंगे।', english:'By then, you will have learned 1000 words.', alternatives:['you will have learnt 1000 words by then.'], hint:'Will have + learned/learnt + noun', type:'translation' },
  { id:'d08-014', hindi:'क्या शाम तक वह आ चुका होगा?', english:'Will he have arrived by evening?', alternatives:['will he have come by evening?'], hint:'Will + subject + have + verb3?', type:'translation' },
  { id:'d08-015', hindi:'इस कोर्स को पूरा करके तुम्हें नौकरी मिल जाएगी।', english:'After completing this course, you will have a job.', alternatives:['you will get a job after completing this course.'], hint:'After + verb+ing + will have + noun', type:'translation' },
  { id:'d08-016', hindi:'रात तक वह खाना बना चुकी होगी।', english:'By night, she will have cooked the food.', alternatives:['she will have prepared the food by night.'], hint:'By night + will have + cooked', type:'translation' },
  { id:'d08-017', hindi:'जब तक तुम पहुँचोगे, वे जा चुके होंगे।', english:'By the time you arrive, they will have left.', alternatives:['they will have gone by the time you reach.'], hint:'By the time + clause + will have + left', type:'translation' },
  { id:'d08-018', hindi:'इस साल के अंत तक वह पदोन्नति पा चुकी होगी।', english:'By the end of this year, she will have been promoted.', alternatives:['she will have gotten a promotion by year end.'], hint:'By the end of + time + will have been + promoted', type:'translation' },
  { id:'d08-019', hindi:'अगले जन्मदिन तक मैं 25 का हो जाऊँगा।', english:'By my next birthday, I will have turned 25.', alternatives:['i will be 25 by my next birthday.'], hint:'Will have + turned + age', type:'translation' },
  { id:'d08-020', hindi:'क्या तुमने तब तक यह किताब पढ़ ली होगी?', english:'Will you have read this book by then?', alternatives:['will you have finished this book by then?'], hint:'Will + subject + have + read?', type:'translation' },
  { id:'d08-021', hindi:'वे अगले महीने तक सब तय कर चुके होंगे।', english:'They will have decided everything by next month.', alternatives:['by next month, they will have decided everything.'], hint:'Will have + decided + everything', type:'translation' },
  { id:'d08-022', hindi:'10 साल बाद यह शहर बिल्कुल बदल चुका होगा।', english:'In 10 years, this city will have changed completely.', alternatives:['this city will have completely changed in 10 years.'], hint:'Will have + changed + completely', type:'translation' },
  { id:'d08-023', hindi:'तुमने कोर्स खत्म करके एक सर्टिफिकेट पाया होगा।', english:'You will have earned a certificate after finishing the course.', alternatives:['you will have received a certificate after completing the course.'], hint:'Will have + earned/received + noun', type:'translation' },
  { id:'d08-024', hindi:'क्या वह तब तक काफी पैसे बचा चुका होगा?', english:'Will he have saved enough money by then?', alternatives:['will he have saved sufficient money by then?'], hint:'Will + have + saved + enough?', type:'translation' },
  { id:'d08-025', hindi:'2040 तक AI सब कुछ बदल चुकी होगी।', english:'By 2040, AI will have changed everything.', alternatives:['ai will have transformed everything by 2040.'], hint:'By + year + will have + changed + everything', type:'translation' },
  { id:'d08-026', hindi:'जब तक मैं उठूँगा, वह जा चुका होगा।', english:'By the time I wake up, he will have left.', alternatives:['he will have gone by the time i wake up.'], hint:'By the time + present tense + will have + left', type:'translation' },
  { id:'d08-027', hindi:'इस परियोजना के खत्म होने तक हम थक चुके होंगे।', english:'By the end of this project, we will have been exhausted.', alternatives:['we will have gotten tired by the end of this project.'], hint:'By the end of + noun + will have + been + adjective', type:'translation' },
  { id:'d08-028', hindi:'वह कल रात तक 5 किताबें पढ़ चुकी होगी।', english:'By tomorrow night, she will have read 5 books.', alternatives:['she will have finished 5 books by tomorrow night.'], hint:'By + time + will have + read + number + noun', type:'translation' },
  { id:'d08-029', hindi:'क्या अगले सप्ताह तक आपकी मरम्मत हो चुकी होगी?', english:'Will the repairs have been done by next week?', alternatives:['will the repair work be completed by next week?'], hint:'Will + noun + have + been + verb3?', type:'translation' },
  { id:'d08-030', hindi:'दिसंबर तक वे दो प्रोजेक्ट पूरे कर चुके होंगे।', english:'By December, they will have completed two projects.', alternatives:['they will have finished two projects by december.'], hint:'By + month + will have + completed + number + noun', type:'translation' },
];

// ============================================================
// Day 9 — Use of There (There is / There are)
// ============================================================
const DAY_09 = [
  { id:'d09-001', hindi:'मेज़ पर एक किताब है।', english:'There is a book on the table.', alternatives:['there is a book on the table.'], hint:'There is + article + noun + place', type:'translation' },
  { id:'d09-002', hindi:'पार्क में बहुत बच्चे हैं।', english:'There are many children in the park.', alternatives:['there are lots of children in the park.'], hint:'There are + many + plural noun + place', type:'translation' },
  { id:'d09-003', hindi:'फ्रिज में खाना नहीं है।', english:'There is no food in the fridge.', alternatives:["there isn't any food in the fridge.",'there is no food in the refrigerator.'], hint:'There is no + noun + place', type:'translation' },
  { id:'d09-004', hindi:'क्या बाहर कोई है?', english:'Is there anyone outside?', alternatives:['is there somebody outside?'], hint:'Is there + anyone/someone + place?', type:'translation' },
  { id:'d09-005', hindi:'कमरे में दो बिस्तर हैं।', english:'There are two beds in the room.', alternatives:['there are 2 beds in the room.'], hint:'There are + number + noun + place', type:'translation' },
  { id:'d09-006', hindi:'गली में बहुत ट्रैफिक है।', english:'There is a lot of traffic on the road.', alternatives:['there is heavy traffic on the road.'], hint:'There is a lot of + noun + place', type:'translation' },
  { id:'d09-007', hindi:'कल परीक्षा है।', english:'There is an exam tomorrow.', alternatives:['there is a test tomorrow.'], hint:'There is + article + noun + time', type:'translation' },
  { id:'d09-008', hindi:'इस शहर में तीन बड़े मॉल हैं।', english:'There are three big malls in this city.', alternatives:['there are 3 large malls in this city.'], hint:'There are + number + adjective + noun + place', type:'translation' },
  { id:'d09-009', hindi:'पार्किंग में कोई जगह नहीं है।', english:'There is no space in the parking.', alternatives:["there isn't any space in the parking lot.",'there is no parking space.'], hint:'There is no + noun + place', type:'translation' },
  { id:'d09-010', hindi:'क्या इस शहर में कोई अच्छा रेस्टोरेंट है?', english:'Is there a good restaurant in this city?', alternatives:['are there any good restaurants in this city?'], hint:'Is there + article + adjective + noun + place?', type:'translation' },
  { id:'d09-011', hindi:'कल कोई मीटिंग नहीं है।', english:'There is no meeting tomorrow.', alternatives:["there isn't any meeting tomorrow.",'there will be no meeting tomorrow.'], hint:'There is no + noun + time', type:'translation' },
  { id:'d09-012', hindi:'इस रास्ते में एक खतरनाक मोड़ है।', english:'There is a dangerous turn on this road.', alternatives:['there is a risky curve on this road.'], hint:'There is + article + adjective + noun + place', type:'translation' },
  { id:'d09-013', hindi:'क्या यहाँ कोई डॉक्टर है?', english:'Is there a doctor here?', alternatives:['is there any doctor here?'], hint:'Is there + article + noun + here?', type:'translation' },
  { id:'d09-014', hindi:'इस विषय में बहुत कुछ सीखने को है।', english:'There is a lot to learn in this subject.', alternatives:['there is much to learn in this subject.'], hint:'There is a lot + to + verb + place', type:'translation' },
  { id:'d09-015', hindi:'पिछले साल इस जगह पर एक पेड़ था।', english:'There was a tree here last year.', alternatives:['last year there was a tree here.'], hint:'There was + article + noun + place + time', type:'translation' },
  { id:'d09-016', hindi:'यहाँ बहुत शोर था।', english:'There was a lot of noise here.', alternatives:['there was so much noise here.'], hint:'There was + a lot of + noun', type:'translation' },
  { id:'d09-017', hindi:'क्या उस घर में कोई था?', english:'Was there anyone in that house?', alternatives:['was there somebody in that house?'], hint:'Was there + anyone + place?', type:'translation' },
  { id:'d09-018', hindi:'शहर में तब बहुत कम बिजली थी।', english:'There was very little electricity in the city then.', alternatives:['there was hardly any electricity in the city back then.'], hint:'There was very little + noun + place', type:'translation' },
  { id:'d09-019', hindi:'अगले हफ्ते एक बड़ी सेल होगी।', english:'There will be a big sale next week.', alternatives:['there is going to be a big sale next week.'], hint:'There will be + article + adjective + noun + time', type:'translation' },
  { id:'d09-020', hindi:'कल और बारिश होगी।', english:'There will be more rain tomorrow.', alternatives:['it will rain more tomorrow.'], hint:'There will be + more + noun', type:'translation' },
  { id:'d09-021', hindi:'इस मुद्दे पर बहुत बहस होगी।', english:'There will be a lot of debate on this issue.', alternatives:['there will be much discussion on this issue.'], hint:'There will be + noun + on + issue', type:'translation' },
  { id:'d09-022', hindi:'मैच में कोई दर्शक नहीं था।', english:'There were no spectators at the match.', alternatives:['there was no audience at the match.'], hint:'There were no + noun + at + event', type:'translation' },
  { id:'d09-023', hindi:'घर में तीन बाथरूम हैं।', english:'There are three bathrooms in the house.', alternatives:['the house has three bathrooms.'], hint:'There are + number + noun + place', type:'translation' },
  { id:'d09-024', hindi:'क्या कोई शिकायत है?', english:'Is there any complaint?', alternatives:['are there any complaints?','do you have any complaints?'], hint:'Is there any + noun?', type:'translation' },
  { id:'d09-025', hindi:'खाने में कुछ गड़बड़ है।', english:'There is something wrong with the food.', alternatives:['there is a problem with the food.'], hint:'There is something wrong with + noun', type:'translation' },
  { id:'d09-026', hindi:'कल का कार्यक्रम रद्द हो गया।', english:'There is no program tomorrow.', alternatives:["tomorrow's event has been cancelled.",'there will be no event tomorrow.'], hint:'There is no + noun + time', type:'translation' },
  { id:'d09-027', hindi:'आसमान में बादल हैं।', english:'There are clouds in the sky.', alternatives:['the sky has clouds.'], hint:'There are + noun + in the sky', type:'translation' },
  { id:'d09-028', hindi:'इस कमरे में रोशनी कम है।', english:'There is not enough light in this room.', alternatives:['there is less light in this room.'], hint:'There is not enough + noun + place', type:'translation' },
  { id:'d09-029', hindi:'रास्ते में कई गड्ढे हैं।', english:'There are many potholes on the road.', alternatives:['the road has many potholes.'], hint:'There are + many + noun + place', type:'translation' },
  { id:'d09-030', hindi:'इस कंपनी में विकास के बहुत अवसर हैं।', english:'There are many growth opportunities in this company.', alternatives:['this company has many growth opportunities.'], hint:'There are many + noun + place', type:'translation' },
];

// ============================================================
// Day 10 — Revision + Practice (Days 1-9 Mixed)
// ============================================================
const DAY_10 = [
  { id:'d10-001', hindi:'मैं रोज़ खाना खाता हूँ।', english:'I eat food every day.', hint:'Day 1 — Simple Present', type:'translation' },
  { id:'d10-002', hindi:'मेरा नाम प्रिया है और मैं पुणे से हूँ।', english:'My name is Priya and I am from Pune.', hint:'Day 2 — Introduction', type:'translation' },
  { id:'d10-003', hindi:'यहाँ मत खड़े रहो।', english:'Do not stand here.', alternatives:["don't stand here."], hint:'Day 3 — Imperative (Negative)', type:'translation' },
  { id:'d10-004', hindi:'क्या आप थके हुए हैं?', english:'Are you tired?', hint:'Day 4 — Be Verb Question', type:'translation' },
  { id:'d10-005', hindi:'ये मेरे जूते नहीं हैं।', english:'These are not my shoes.', alternatives:["these aren't my shoes."], hint:'Day 5 — Demonstrative (Negative)', type:'translation' },
  { id:'d10-006', hindi:'मेरे पास एक कैमरा है।', english:'I have a camera.', hint:'Day 6 — Have (Possession)', type:'translation' },
  { id:'d10-007', hindi:'उसके पास बहुत दोस्त थे।', english:'He had many friends.', hint:'Day 7 — Had (Past)', type:'translation' },
  { id:'d10-008', hindi:'कल शाम तक मैं काम खत्म कर चुका होऊँगा।', english:'By tomorrow evening, I will have finished the work.', hint:'Day 8 — Will Have (Future Perfect)', type:'translation' },
  { id:'d10-009', hindi:'इस कमरे में पाँच कुर्सियाँ हैं।', english:'There are five chairs in this room.', hint:'Day 9 — There Are', type:'translation' },
  { id:'d10-010', hindi:'वह डॉक्टर थी।', english:'She was a doctor.', hint:'Day 4 — Be Verb (Past)', type:'translation' },
  { id:'d10-011', hindi:'कृपया यहाँ बैठिए।', english:'Please sit here.', hint:'Day 3 — Imperative (Polite)', type:'translation' },
  { id:'d10-012', hindi:'वह घर नहीं है।', english:'He is not at home.', alternatives:["he isn't home."], hint:'Day 4 — Be Verb (Negative)', type:'translation' },
  { id:'d10-013', hindi:'मेरे पास कोई जानकारी नहीं थी।', english:'I had no information.', alternatives:['i did not have any information.'], hint:'Day 7 — Had (Negative)', type:'translation' },
  { id:'d10-014', hindi:'क्या मेज़ पर कोई सेब है?', english:'Is there an apple on the table?', hint:'Day 9 — Is There Question', type:'translation' },
  { id:'d10-015', hindi:'मैं एक अध्यापक हूँ।', english:'I am a teacher.', hint:'Day 4 — Be Verb (Profession)', type:'translation' },
  { id:'d10-016', hindi:'वे दोनों भाई-बहन हैं।', english:'They are siblings.', alternatives:['they are brother and sister.'], hint:'Day 4 — Be Verb (Plural)', type:'translation' },
  { id:'d10-017', hindi:'मेरे जन्मदिन पर कोई आया नहीं था।', english:'There was no one at my birthday.', alternatives:['nobody came to my birthday.'], hint:'Day 9 — There Was (Negative)', type:'translation' },
  { id:'d10-018', hindi:'अगले साल उसके पास कार होगी।', english:'Next year, he will have a car.', hint:'Day 8 — Will Have', type:'translation' },
  { id:'d10-019', hindi:'मुझे पढ़ाई पसंद है।', english:'I like studying.', alternatives:['i love studying.','i enjoy studying.'], hint:'Day 2 — Introduction/Hobby', type:'translation' },
  { id:'d10-020', hindi:'वे सब मेरे दोस्त हैं।', english:'They are all my friends.', hint:'Day 4 — Be Verb', type:'translation' },
  { id:'d10-021', hindi:'दरवाज़ा बंद करो।', english:'Close the door.', alternatives:['shut the door.'], hint:'Day 3 — Imperative', type:'translation' },
  { id:'d10-022', hindi:'इस बिल्डिंग में 20 मंज़िल हैं।', english:'There are 20 floors in this building.', alternatives:['this building has 20 floors.'], hint:'Day 9 — There Are', type:'translation' },
  { id:'d10-023', hindi:'उस समय उसके पास कुछ भी नहीं था।', english:'At that time, he had nothing.', hint:'Day 7 — Had Nothing', type:'translation' },
  { id:'d10-024', hindi:'यह वह समय है जिसकी मुझे ज़रूरत है।', english:'This is the time I need.', hint:'Day 5 — Demonstrative', type:'translation' },
  { id:'d10-025', hindi:'क्या उसके पास पासपोर्ट है?', english:'Does she have a passport?', alternatives:['has she got a passport?'], hint:'Day 6 — Does She Have?', type:'translation' },
  { id:'d10-026', hindi:'कल मीटिंग में बहुत लोग थे।', english:'There were many people at yesterday\'s meeting.', alternatives:['there were a lot of people at the meeting yesterday.'], hint:'Day 9 — There Were', type:'translation' },
  { id:'d10-027', hindi:'मैं खुश और तंदुरुस्त हूँ।', english:'I am happy and healthy.', hint:'Day 4 — Be Verb + adjectives', type:'translation' },
  { id:'d10-028', hindi:'वह उस समय बहुत बीमार थी।', english:'She was very sick at that time.', alternatives:['she was very ill at that time.'], hint:'Day 4 — Be Verb Past', type:'translation' },
  { id:'d10-029', hindi:'किताब मेज़ पर है।', english:'The book is on the table.', hint:'Day 4 — Be Verb Location', type:'translation' },
  { id:'d10-030', hindi:'अगले महीने तक परियोजना तैयार हो जाएगी।', english:'The project will be ready by next month.', alternatives:['by next month, the project will have been completed.'], hint:'Day 8 — Will Have/Will Be', type:'translation' },
];

// ============================================================
// Days 11-75 — Template Questions
// These provide 30 questions per day for key grammar topics
// ============================================================

const DAYS_11_TO_75_QUESTIONS = {
  11: [ // Want To / Wanted To
    { id:'d11-001', hindi:'मैं पानी पीना चाहता हूँ।', english:'I want to drink water.', hint:'want to + base verb', type:'translation' },
    { id:'d11-002', hindi:'वह घर जाना चाहती है।', english:'She wants to go home.', hint:'wants to + base verb', type:'translation' },
    { id:'d11-003', hindi:'हम यहाँ रहना चाहते हैं।', english:'We want to stay here.', hint:'want to + stay', type:'translation' },
    { id:'d11-004', hindi:'मैं तुमसे मिलना चाहता था।', english:'I wanted to meet you.', hint:'wanted to + base verb', type:'translation' },
    { id:'d11-005', hindi:'वह कुछ कहना चाहता था।', english:'He wanted to say something.', hint:'wanted to + say', type:'translation' },
    { id:'d11-006', hindi:'क्या तुम कुछ खाना चाहते हो?', english:'Do you want to eat something?', hint:'Do you want to + eat?', type:'translation' },
    { id:'d11-007', hindi:'मैं यह नहीं करना चाहता।', english:'I do not want to do this.', alternatives:["i don't want to do this."], hint:"don't want to + verb", type:'translation' },
    { id:'d11-008', hindi:'वे अंग्रेज़ी सीखना चाहते हैं।', english:'They want to learn English.', hint:'want to + learn', type:'translation' },
    { id:'d11-009', hindi:'मुझे डॉक्टर बनना था।', english:'I wanted to become a doctor.', hint:'wanted to + become', type:'translation' },
    { id:'d11-010', hindi:'क्या वह आना चाहती थी?', english:'Did she want to come?', hint:'Did + want to + come?', type:'translation' },
    { id:'d11-011', hindi:'मैं तुम्हारी मदद करना चाहता हूँ।', english:'I want to help you.', hint:'I want to + help', type:'translation' },
    { id:'d11-012', hindi:'वह खुद को बेहतर बनाना चाहती है।', english:'She wants to improve herself.', hint:'wants to + improve', type:'translation' },
    { id:'d11-013', hindi:'हम सब खुश रहना चाहते हैं।', english:'We all want to be happy.', hint:'want to + be + adjective', type:'translation' },
    { id:'d11-014', hindi:'उसने माफ़ी माँगनी थी।', english:'He wanted to apologize.', hint:'wanted to + apologize', type:'translation' },
    { id:'d11-015', hindi:'मैं यह किताब पढ़ना चाहता हूँ।', english:'I want to read this book.', hint:'I want to + read', type:'translation' },
    { id:'d11-016', hindi:'तुम क्या करना चाहते हो?', english:'What do you want to do?', hint:'What do you want to + do?', type:'translation' },
    { id:'d11-017', hindi:'वे विदेश जाना चाहते हैं।', english:'They want to go abroad.', hint:'want to + go abroad', type:'translation' },
    { id:'d11-018', hindi:'मुझे तुमसे बात करनी थी।', english:'I wanted to talk to you.', hint:'wanted to + talk', type:'translation' },
    { id:'d11-019', hindi:'वह पायलट बनना चाहता है।', english:'He wants to become a pilot.', hint:'wants to + become', type:'translation' },
    { id:'d11-020', hindi:'क्या तुम छुट्टी लेना चाहते हो?', english:'Do you want to take a day off?', hint:'Do you want to + take a day off?', type:'translation' },
    { id:'d11-021', hindi:'मैं एक नई शुरुआत करना चाहता हूँ।', english:'I want to make a fresh start.', hint:'want to + make a fresh start', type:'translation' },
    { id:'d11-022', hindi:'वह कुछ अलग करना चाहती थी।', english:'She wanted to do something different.', hint:'wanted to + do something different', type:'translation' },
    { id:'d11-023', hindi:'तुम क्या बनना चाहते थे?', english:'What did you want to become?', hint:'What did you want to + become?', type:'translation' },
    { id:'d11-024', hindi:'मुझे और समय चाहिए था।', english:'I wanted more time.', alternatives:['i needed more time.'], hint:'wanted + more + noun', type:'translation' },
    { id:'d11-025', hindi:'वे अपनी गलतियाँ सुधारना चाहते हैं।', english:'They want to correct their mistakes.', hint:'want to + correct', type:'translation' },
    { id:'d11-026', hindi:'मैं तुम्हारे साथ चलना चाहता हूँ।', english:'I want to walk with you.', hint:'I want to + walk with', type:'translation' },
    { id:'d11-027', hindi:'उसे किसी से बात नहीं करनी थी।', english:'He did not want to talk to anyone.', alternatives:["he didn't want to talk to anyone."], hint:"didn't want to + talk", type:'translation' },
    { id:'d11-028', hindi:'तुम किसके साथ जाना चाहते हो?', english:'Who do you want to go with?', hint:'Who do you want to + go with?', type:'translation' },
    { id:'d11-029', hindi:'वह कुछ खास बनाना चाहती है।', english:'She wants to create something special.', hint:'wants to + create something special', type:'translation' },
    { id:'d11-030', hindi:'मैं अपना भविष्य खुद बनाना चाहता हूँ।', english:'I want to build my own future.', hint:'want to + build my own future', type:'translation' },
  ],
  12: [ // Can / Could (Modal Verbs - Ability)
    { id:'d12-001', hindi:'मैं तेज़ दौड़ सकता हूँ।', english:'I can run fast.', hint:'I can + base verb', type:'translation' },
    { id:'d12-002', hindi:'वह अंग्रेज़ी बोल सकती है।', english:'She can speak English.', hint:'She can + base verb', type:'translation' },
    { id:'d12-003', hindi:'क्या तुम तैर सकते हो?', english:'Can you swim?', hint:'Can + subject + base verb?', type:'translation' },
    { id:'d12-004', hindi:'मैं यह नहीं कर सकता।', english:'I cannot do this.', alternatives:["i can't do this."], hint:"I can't + base verb", type:'translation' },
    { id:'d12-005', hindi:'बचपन में मैं पेड़ पर चढ़ सकता था।', english:'As a child, I could climb trees.', hint:'could + base verb (past ability)', type:'translation' },
    { id:'d12-006', hindi:'क्या तुम मेरी मदद कर सकते हो?', english:'Can you help me?', hint:'Can you + help me?', type:'translation' },
    { id:'d12-007', hindi:'वह बहुत अच्छा गाना गा सकता है।', english:'He can sing very well.', hint:'He can + base verb + well', type:'translation' },
    { id:'d12-008', hindi:'पहले मैं 6 भाषाएँ बोल सकता था।', english:'Earlier, I could speak 6 languages.', hint:'could + speak + languages', type:'translation' },
    { id:'d12-009', hindi:'क्या वह यहाँ आ सकती है?', english:'Can she come here?', hint:'Can + she + base verb?', type:'translation' },
    { id:'d12-010', hindi:'मैं पियानो बजा सकता हूँ।', english:'I can play the piano.', hint:'I can + play the + instrument', type:'translation' },
    { id:'d12-011', hindi:'वे इस समस्या को हल कर सकते हैं।', english:'They can solve this problem.', hint:'They can + base verb', type:'translation' },
    { id:'d12-012', hindi:'क्या कोई बता सकता है?', english:'Can anyone explain?', hint:'Can anyone + base verb?', type:'translation' },
    { id:'d12-013', hindi:'मैं उस वक्त कुछ नहीं देख सकता था।', english:'I could not see anything at that time.', alternatives:["i couldn't see anything then."], hint:"couldn't + base verb", type:'translation' },
    { id:'d12-014', hindi:'वह खाना पका सकती है।', english:'She can cook food.', hint:'She can + cook', type:'translation' },
    { id:'d12-015', hindi:'बच्चे बहुत तेज़ सीख सकते हैं।', english:'Children can learn very quickly.', hint:'can + learn + quickly', type:'translation' },
    { id:'d12-016', hindi:'क्या तुम ज़ोर से बोल सकते हो?', english:'Can you speak louder?', hint:'Can you + speak louder?', type:'translation' },
    { id:'d12-017', hindi:'वह कल नहीं आ सकती।', english:'She cannot come tomorrow.', alternatives:["she can't come tomorrow."], hint:"can't + come tomorrow", type:'translation' },
    { id:'d12-018', hindi:'मैं तुम्हारे लिए यह कर सकता हूँ।', english:'I can do this for you.', hint:'I can + do this for you', type:'translation' },
    { id:'d12-019', hindi:'क्या वह गिटार बजा सकता था?', english:'Could he play the guitar?', hint:'Could + he + base verb?', type:'translation' },
    { id:'d12-020', hindi:'मेरे दोस्त बहुत अच्छा नाच सकते हैं।', english:'My friends can dance very well.', hint:'can + dance very well', type:'translation' },
    { id:'d12-021', hindi:'हम यह साथ में कर सकते हैं।', english:'We can do this together.', hint:'We can + do this + together', type:'translation' },
    { id:'d12-022', hindi:'वह एक घंटे में यहाँ पहुँच सकता है।', english:'He can reach here in one hour.', hint:'can + reach + in one hour', type:'translation' },
    { id:'d12-023', hindi:'बच्चे कल से आ सकते हैं।', english:'Children can come from tomorrow.', hint:'can + come from + time', type:'translation' },
    { id:'d12-024', hindi:'मैं इसे बेहतर कर सकता हूँ।', english:'I can do this better.', hint:'I can + do better', type:'translation' },
    { id:'d12-025', hindi:'क्या तुम अकेले काम कर सकते हो?', english:'Can you work alone?', hint:'Can you + work alone?', type:'translation' },
    { id:'d12-026', hindi:'वे देर रात तक काम कर सकते हैं।', english:'They can work till late at night.', hint:'can + work + till late', type:'translation' },
    { id:'d12-027', hindi:'मैं अपनी गलती स्वीकार कर सकता हूँ।', english:'I can accept my mistake.', hint:'I can + accept + my mistake', type:'translation' },
    { id:'d12-028', hindi:'वह बिना नींद के काम कर सकता था।', english:'He could work without sleep.', hint:'could + work + without sleep', type:'translation' },
    { id:'d12-029', hindi:'क्या हम यहाँ बात कर सकते हैं?', english:'Can we talk here?', hint:'Can we + talk here?', type:'translation' },
    { id:'d12-030', hindi:'मैं यह काम अकेले नहीं कर सकता।', english:'I cannot do this work alone.', alternatives:["i can't do this alone."], hint:"can't + do + alone", type:'translation' },
  ],
};

// ============================================================
// Helper — Generate template questions for days 13-75
// Uses the topic info to produce generic but useful questions
// ============================================================
function generateQuestionsForDay(dayNum, topicTitle) {
  const templates = [
    { hindi:`मैं ${topicTitle.toLowerCase()} सीखना चाहता हूँ।`, english:`I want to learn ${topicTitle}.`, hint:'Want to learn', type:'translation' },
    { hindi:`${topicTitle} बहुत महत्वपूर्ण है।`, english:`${topicTitle} is very important.`, hint:'Is very important', type:'translation' },
    { hindi:`क्या आप ${topicTitle.toLowerCase()} जानते हैं?`, english:`Do you know about ${topicTitle}?`, hint:'Do you know about?', type:'translation' },
    { hindi:`मुझे ${topicTitle.toLowerCase()} समझ में आ गया।`, english:`I have understood ${topicTitle}.`, hint:'Have understood', type:'translation' },
    { hindi:`${topicTitle} की प्रैक्टिस करना ज़रूरी है।`, english:`It is important to practice ${topicTitle}.`, hint:'It is important to', type:'translation' },
  ];
  // Return 5 template questions for days without custom data
  return templates.map((t, i) => ({
    id: `d${String(dayNum).padStart(2,'0')}-0${i+1}`,
    ...t,
  }));
}

// ============================================================
// Export — Get questions for a specific day
// ============================================================
const ALL_QUESTIONS = {
  1:  DAY_01,
  2:  DAY_02,
  3:  DAY_03,
  4:  DAY_04,
  5:  DAY_05,
  6:  DAY_06,
  7:  DAY_07,
  8:  DAY_08,
  9:  DAY_09,
  10: DAY_10,
  11: DAYS_11_TO_75_QUESTIONS[11],
  12: DAYS_11_TO_75_QUESTIONS[12],
};

export function getQuestionsForDay(dayNum) {
  if (ALL_QUESTIONS[dayNum]) return ALL_QUESTIONS[dayNum];
  // Generate template questions for other days
  return generateQuestionsForDay(dayNum, `Day ${dayNum} Topic`);
}

// For topic-based practice (grammar/vocabulary/etc.)
export const TOPIC_QUESTION_SETS = {
  'grammar-present-simple': DAY_01.concat(DAY_04),
  'grammar-be-verb':        DAY_04,
  'grammar-modals-can':     DAYS_11_TO_75_QUESTIONS[12],
  'spoken-introduction':    DAY_02,
  'grammar-imperative':     DAY_03,
  'grammar-demonstrative':  DAY_05,
  'grammar-have':           DAY_06,
  'grammar-had':            DAY_07,
  'grammar-will-have':      DAY_08,
  'grammar-there':          DAY_09,
};

// Total counts
export const TOTAL_QUESTIONS = Object.values(ALL_QUESTIONS).reduce((sum, qs) => sum + qs.length, 0);

export default getQuestionsForDay;
