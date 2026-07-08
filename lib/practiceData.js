// Practice Questions Library — 75 Days Hard English
// Hindi questions → English translation practice
// Format: { id, hindi, english, alternatives[], hint, type }
// Types: translation | fill-blank | mcq | error-detection

// Import the 75-day curriculum topics from topics.js in the same folder
import { DAYS_75_TOPICS } from './topics';

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
  // ── Day 13 — Use of Let ─────────────────────────────────────
  13: [
    { id:'d13-001', hindi:'मुझे जाने दो।', english:'Let me go.', hint:'Let me + base verb', type:'translation' },
    { id:'d13-002', hindi:'उसे बोलने दो।', english:'Let him speak.', alternatives:['let him talk.'], hint:'Let him + base verb', type:'translation' },
    { id:'d13-003', hindi:'उन्हें अंदर आने दो।', english:'Let them come in.', hint:'Let them + base verb', type:'translation' },
    { id:'d13-004', hindi:'मुझे समझाने दो।', english:'Let me explain.', hint:'Let me + explain', type:'translation' },
    { id:'d13-005', hindi:'उसे अपनी बात कहने दो।', english:'Let her say what she wants.', alternatives:['let her speak.'], hint:'Let her + say/speak', type:'translation' },
    { id:'d13-006', hindi:'मुझे एक मिनट दो।', english:'Let me have a minute.', alternatives:['give me a minute.'], hint:'Let me have + time', type:'translation' },
    { id:'d13-007', hindi:'बच्चों को खेलने दो।', english:'Let the children play.', hint:'Let + noun + base verb', type:'translation' },
    { id:'d13-008', hindi:'उसे यह काम करने दो।', english:'Let him do this work.', hint:'Let him + do', type:'translation' },
    { id:'d13-009', hindi:'मुझे अपना काम करने दो।', english:'Let me do my work.', hint:'Let me + do my work', type:'translation' },
    { id:'d13-010', hindi:'उसे अपनी मनपसंद चीज़ चुनने दो।', english:'Let her choose what she likes.', hint:'Let her + choose', type:'translation' },
    { id:'d13-011', hindi:'कुत्ते को बाहर जाने दो।', english:'Let the dog go outside.', hint:'Let the + noun + verb', type:'translation' },
    { id:'d13-012', hindi:'उन्हें जवाब देने दो।', english:'Let them answer.', hint:'Let them + answer', type:'translation' },
    { id:'d13-013', hindi:'मुझे तुम्हारी मदद करने दो।', english:'Let me help you.', hint:'Let me + help', type:'translation' },
    { id:'d13-014', hindi:'उसे खुद तय करने दो।', english:'Let him decide for himself.', hint:'Let him + decide', type:'translation' },
    { id:'d13-015', hindi:'मुझे देखने दो।', english:'Let me see.', hint:'Let me + see', type:'translation' },
    { id:'d13-016', hindi:'उसे गाने दो।', english:'Let her sing.', hint:'Let her + sing', type:'translation' },
    { id:'d13-017', hindi:'हमें कोशिश करने दो।', english:'Let us try.', alternatives:["let's try."], hint:'Let us + base verb', type:'translation' },
    { id:'d13-018', hindi:'उन्हें peace में रहने दो।', english:'Let them be in peace.', hint:'Let them + be', type:'translation' },
    { id:'d13-019', hindi:'मुझे सोचने दो।', english:'Let me think.', hint:'Let me + think', type:'translation' },
    { id:'d13-020', hindi:'बारिश आने दो।', english:'Let it rain.', hint:'Let it + verb', type:'translation' },
    { id:'d13-021', hindi:'उसे जानने दो।', english:'Let him know.', hint:'Let him + know', type:'translation' },
    { id:'d13-022', hindi:'मुझे कोशिश करने दो।', english:'Let me try.', hint:'Let me + try', type:'translation' },
    { id:'d13-023', hindi:'पानी बहने दो।', english:'Let the water flow.', hint:'Let the + noun + verb', type:'translation' },
    { id:'d13-024', hindi:'उसे आराम करने दो।', english:'Let her rest.', hint:'Let her + rest', type:'translation' },
    { id:'d13-025', hindi:'मुझे check करने दो।', english:'Let me check.', hint:'Let me + check', type:'translation' },
    { id:'d13-026', hindi:'उसे सीखने दो।', english:'Let him learn.', hint:'Let him + learn', type:'translation' },
    { id:'d13-027', hindi:'मुझे बात करने दो।', english:'Let me talk.', hint:'Let me + talk', type:'translation' },
    { id:'d13-028', hindi:'उन्हें enjoy करने दो।', english:'Let them enjoy.', hint:'Let them + enjoy', type:'translation' },
    { id:'d13-029', hindi:'उसे succeed होने दो।', english:'Let her succeed.', hint:'Let her + succeed', type:'translation' },
    { id:'d13-030', hindi:'मुझे पहले finish करने दो।', english:'Let me finish first.', hint:'Let me + finish first', type:'translation' },
  ],

  // ── Day 14 — Use of Let's ────────────────────────────────────
  14: [
    { id:'d14-001', hindi:"चलो बाहर जाते हैं।", english:"Let's go outside.", hint:"Let's + base verb", type:'translation' },
    { id:'d14-002', hindi:"चलो खाना खाते हैं।", english:"Let's eat.", alternatives:["let's have food."], hint:"Let's + eat", type:'translation' },
    { id:'d14-003', hindi:"चलो यह भूल जाते हैं।", english:"Let's forget about it.", hint:"Let's + forget", type:'translation' },
    { id:'d14-004', hindi:"चलो मिलकर पढ़ते हैं।", english:"Let's study together.", hint:"Let's + study together", type:'translation' },
    { id:'d14-005', hindi:"चलो फिल्म देखने चलते हैं।", english:"Let's go watch a movie.", hint:"Let's + go watch", type:'translation' },
    { id:'d14-006', hindi:"चलो शुरू करते हैं।", english:"Let's begin.", alternatives:["let's start."], hint:"Let's + begin/start", type:'translation' },
    { id:'d14-007', hindi:"चलो plan बनाते हैं।", english:"Let's make a plan.", hint:"Let's + make a plan", type:'translation' },
    { id:'d14-008', hindi:"चलो celebrate करते हैं।", english:"Let's celebrate!", hint:"Let's + celebrate", type:'translation' },
    { id:'d14-009', hindi:"चलो बाहर घूमने चलते हैं।", english:"Let's go for a walk.", hint:"Let's go for a + noun", type:'translation' },
    { id:'d14-010', hindi:"चलो इस topic को बंद करते हैं।", english:"Let's close this topic.", hint:"Let's + close", type:'translation' },
    { id:'d14-011', hindi:"चलो coffee पीते हैं।", english:"Let's have coffee.", hint:"Let's have + noun", type:'translation' },
    { id:'d14-012', hindi:"चलो अभी नहीं जाते।", english:"Let's not go now.", hint:"Let's not + verb", type:'translation' },
    { id:'d14-013', hindi:"चलो इस पर बाद में बात करते हैं।", english:"Let's talk about this later.", hint:"Let's + talk about later", type:'translation' },
    { id:'d14-014', hindi:"चलो एक नई शुरुआत करते हैं।", english:"Let's make a fresh start.", hint:"Let's + make a fresh start", type:'translation' },
    { id:'d14-015', hindi:"चलो समय बर्बाद नहीं करते।", english:"Let's not waste time.", hint:"Let's not + waste", type:'translation' },
    { id:'d14-016', hindi:"चलो साथ मिलकर काम करते हैं।", english:"Let's work together.", hint:"Let's + work together", type:'translation' },
    { id:'d14-017', hindi:"चलो कुछ नया सीखते हैं।", english:"Let's learn something new.", hint:"Let's + learn something new", type:'translation' },
    { id:'d14-018', hindi:"चलो music सुनते हैं।", english:"Let's listen to music.", hint:"Let's + listen to", type:'translation' },
    { id:'d14-019', hindi:"चलो इसे solve करते हैं।", english:"Let's solve this.", hint:"Let's + solve", type:'translation' },
    { id:'d14-020', hindi:"चलो घर चलते हैं।", english:"Let's go home.", hint:"Let's + go home", type:'translation' },
    { id:'d14-021', hindi:"चलो थोड़ा break लेते हैं।", english:"Let's take a short break.", hint:"Let's take a + noun", type:'translation' },
    { id:'d14-022', hindi:"चलो इसे try करते हैं।", english:"Let's try this.", hint:"Let's + try", type:'translation' },
    { id:'d14-023', hindi:"चलो एक साथ lunch करते हैं।", english:"Let's have lunch together.", hint:"Let's have + noun + together", type:'translation' },
    { id:'d14-024', hindi:"चलो कल मिलते हैं।", english:"Let's meet tomorrow.", hint:"Let's + meet + time", type:'translation' },
    { id:'d14-025', hindi:"चलो तेज़ चलते हैं।", english:"Let's walk faster.", hint:"Let's + verb + adverb", type:'translation' },
    { id:'d14-026', hindi:"चलो इस पर ध्यान देते हैं।", english:"Let's focus on this.", hint:"Let's + focus on", type:'translation' },
    { id:'d14-027', hindi:"चलो कुछ interesting देखते हैं।", english:"Let's watch something interesting.", hint:"Let's watch something + adjective", type:'translation' },
    { id:'d14-028', hindi:"चलो एक team बनाते हैं।", english:"Let's form a team.", hint:"Let's + form a team", type:'translation' },
    { id:'d14-029', hindi:"चलो किसी की मदद करते हैं।", english:"Let's help someone.", hint:"Let's + help", type:'translation' },
    { id:'d14-030', hindi:"चलो इसे organize करते हैं।", english:"Let's organize this.", hint:"Let's + organize", type:'translation' },
  ],

  // ── Day 15 — Would Like To ───────────────────────────────────
  15: [
    { id:'d15-001', hindi:'मैं एक ग्लास पानी लेना चाहूँगा।', english:"I'd like a glass of water.", hint:"I'd like + noun", type:'translation' },
    { id:'d15-002', hindi:'क्या आप कुछ खाना चाहेंगे?', english:'Would you like something to eat?', hint:'Would you like + something?', type:'translation' },
    { id:'d15-003', hindi:'मैं आपसे मिलना चाहूँगा।', english:"I'd like to meet you.", hint:"I'd like to + meet", type:'translation' },
    { id:'d15-004', hindi:'क्या आप चाय या कॉफी लेंगे?', english:'Would you like tea or coffee?', hint:'Would you like + choice?', type:'translation' },
    { id:'d15-005', hindi:'वह इस position के लिए apply करना चाहेगी।', english:"She'd like to apply for this position.", hint:"She'd like to + apply for", type:'translation' },
    { id:'d15-006', hindi:'मैं थोड़ा और जानना चाहूँगा।', english:"I'd like to know more.", hint:"I'd like to + know more", type:'translation' },
    { id:'d15-007', hindi:'क्या आप कुछ और चाहेंगे?', english:'Would you like anything else?', hint:'Would you like anything + else?', type:'translation' },
    { id:'d15-008', hindi:'हम आपसे बात करना चाहेंगे।', english:"We'd like to speak with you.", hint:"We'd like to + speak with", type:'translation' },
    { id:'d15-009', hindi:'मैं एक table reserve करना चाहूँगा।', english:"I'd like to reserve a table.", hint:"I'd like to + reserve", type:'translation' },
    { id:'d15-010', hindi:'वह एक नई job चाहता होगा।', english:"He'd like a new job.", hint:"He'd like + noun", type:'translation' },
    { id:'d15-011', hindi:'क्या आप मुझसे बात करना चाहेंगे?', english:'Would you like to talk to me?', hint:'Would you like to + verb?', type:'translation' },
    { id:'d15-012', hindi:'मैं आपकी feedback सुनना चाहूँगा।', english:"I'd like to hear your feedback.", hint:"I'd like to + hear", type:'translation' },
    { id:'d15-013', hindi:'क्या आप अंदर आना चाहेंगे?', english:'Would you like to come in?', hint:'Would you like to + come in?', type:'translation' },
    { id:'d15-014', hindi:'मैं यह present करना चाहूँगा।', english:"I'd like to present this.", hint:"I'd like to + present", type:'translation' },
    { id:'d15-015', hindi:'वे कल आना चाहेंगे।', english:"They'd like to come tomorrow.", hint:"They'd like to + come", type:'translation' },
    { id:'d15-016', hindi:'क्या आप और time चाहेंगे?', english:'Would you like more time?', hint:'Would you like + more + noun?', type:'translation' },
    { id:'d15-017', hindi:'मैं यह order करना चाहूँगा।', english:"I'd like to order this.", hint:"I'd like to + order", type:'translation' },
    { id:'d15-018', hindi:'वह director से मिलना चाहेगा।', english:"He'd like to meet the director.", hint:"He'd like to + meet the", type:'translation' },
    { id:'d15-019', hindi:'क्या आप हमारे साथ join करना चाहेंगे?', english:'Would you like to join us?', hint:'Would you like to + join us?', type:'translation' },
    { id:'d15-020', hindi:'मैं यह report share करना चाहूँगा।', english:"I'd like to share this report.", hint:"I'd like to + share", type:'translation' },
    { id:'d15-021', hindi:'वह अपना experience share करना चाहेगी।', english:"She'd like to share her experience.", hint:"She'd like to + share", type:'translation' },
    { id:'d15-022', hindi:'क्या आप dessert लेना चाहेंगे?', english:'Would you like to have dessert?', hint:'Would you like to have + noun?', type:'translation' },
    { id:'d15-023', hindi:'मैं आपको एक suggestion देना चाहूँगा।', english:"I'd like to give you a suggestion.", hint:"I'd like to give you + noun", type:'translation' },
    { id:'d15-024', hindi:'हम यहाँ settle होना चाहेंगे।', english:"We'd like to settle here.", hint:"We'd like to + settle", type:'translation' },
    { id:'d15-025', hindi:'क्या आप कल available होंगे?', english:'Would you like to meet tomorrow?', alternatives:['are you available tomorrow?'], hint:'Would you like to + meet?', type:'translation' },
    { id:'d15-026', hindi:'मैं एक complaint दर्ज करना चाहूँगा।', english:"I'd like to register a complaint.", hint:"I'd like to + register", type:'translation' },
    { id:'d15-027', hindi:'वह यहाँ काम करना चाहेगा।', english:"He'd like to work here.", hint:"He'd like to + work here", type:'translation' },
    { id:'d15-028', hindi:'क्या आप कुछ और add करना चाहेंगे?', english:'Would you like to add anything?', hint:'Would you like to + add?', type:'translation' },
    { id:'d15-029', hindi:'मैं एक appointment लेना चाहूँगा।', english:"I'd like to book an appointment.", hint:"I'd like to + book", type:'translation' },
    { id:'d15-030', hindi:'हम आपके साथ partner बनना चाहेंगे।', english:"We'd like to partner with you.", hint:"We'd like to + partner with", type:'translation' },
  ],

  // ── Day 16 — Can ─────────────────────────────────────────────
  16: [
    { id:'d16-001', hindi:'मैं अंग्रेज़ी बोल सकता हूँ।', english:'I can speak English.', hint:'I can + base verb', type:'translation' },
    { id:'d16-002', hindi:'वह पियानो बजा सकती है।', english:'She can play the piano.', hint:'She can + play the + instrument', type:'translation' },
    { id:'d16-003', hindi:'क्या आप मेरी मदद कर सकते हैं?', english:'Can you help me?', hint:'Can you + help me?', type:'translation' },
    { id:'d16-004', hindi:'मैं यह नहीं कर सकता।', english:"I can't do this.", alternatives:['i cannot do this.'], hint:"I can't + base verb", type:'translation' },
    { id:'d16-005', hindi:'बच्चे बहुत तेज़ सीखते हैं।', english:'Children can learn very fast.', hint:'can + learn very fast', type:'translation' },
    { id:'d16-006', hindi:'क्या तुम तैर सकते हो?', english:'Can you swim?', hint:'Can you + swim?', type:'translation' },
    { id:'d16-007', hindi:'वह बहुत अच्छा गाना गा सकता है।', english:'He can sing very well.', hint:'He can + sing well', type:'translation' },
    { id:'d16-008', hindi:'मैं 5 भाषाएँ बोल सकता हूँ।', english:'I can speak 5 languages.', hint:'I can speak + number + languages', type:'translation' },
    { id:'d16-009', hindi:'क्या वह खाना बना सकती है?', english:'Can she cook?', hint:'Can she + cook?', type:'translation' },
    { id:'d16-010', hindi:'हम यह साथ में कर सकते हैं।', english:'We can do this together.', hint:'We can + do + together', type:'translation' },
    { id:'d16-011', hindi:'मैं गिटार बजा सकता हूँ।', english:'I can play the guitar.', hint:'I can play + instrument', type:'translation' },
    { id:'d16-012', hindi:'वे देर रात तक काम कर सकते हैं।', english:'They can work till late at night.', hint:'can work till late', type:'translation' },
    { id:'d16-013', hindi:'क्या तुम अकेले काम कर सकते हो?', english:'Can you work alone?', hint:'Can you + work alone?', type:'translation' },
    { id:'d16-014', hindi:'वह बहुत तेज़ दौड़ सकती है।', english:'She can run very fast.', hint:'She can + run fast', type:'translation' },
    { id:'d16-015', hindi:'मैं drive करना जानता हूँ।', english:'I can drive.', hint:'I can + drive', type:'translation' },
    { id:'d16-016', hindi:'क्या वे कल आ सकते हैं?', english:'Can they come tomorrow?', hint:'Can they + come + time?', type:'translation' },
    { id:'d16-017', hindi:'मैं इस problem को solve कर सकता हूँ।', english:'I can solve this problem.', hint:'I can + solve', type:'translation' },
    { id:'d16-018', hindi:'क्या मैं यहाँ बैठ सकता हूँ?', english:'Can I sit here?', hint:'Can I + sit here?', type:'translation' },
    { id:'d16-019', hindi:'वह एक घंटे में पहुँच सकता है।', english:'He can arrive in one hour.', hint:'He can + arrive + in one hour', type:'translation' },
    { id:'d16-020', hindi:'मैं अपनी गलती स्वीकार कर सकता हूँ।', english:'I can accept my mistake.', hint:'I can + accept my mistake', type:'translation' },
    { id:'d16-021', hindi:'वह नई भाषा बहुत जल्दी सीख सकती है।', english:'She can learn a new language very quickly.', hint:'can learn + quickly', type:'translation' },
    { id:'d16-022', hindi:'क्या हम अभी बात कर सकते हैं?', english:'Can we talk now?', hint:'Can we + talk now?', type:'translation' },
    { id:'d16-023', hindi:'मैं बिना list के खरीदारी नहीं कर सकता।', english:"I can't shop without a list.", hint:"can't + verb + without", type:'translation' },
    { id:'d16-024', hindi:'वे इस project में participate कर सकते हैं।', english:'They can participate in this project.', hint:'They can + participate in', type:'translation' },
    { id:'d16-025', hindi:'क्या कोई बता सकता है?', english:'Can anyone explain?', hint:'Can anyone + explain?', type:'translation' },
    { id:'d16-026', hindi:'मैं बिना glasses के नहीं पढ़ सकता।', english:"I can't read without glasses.", hint:"can't + read without", type:'translation' },
    { id:'d16-027', hindi:'वह इस team को lead कर सकती है।', english:'She can lead this team.', hint:'She can + lead', type:'translation' },
    { id:'d16-028', hindi:'क्या तुम ज़ोर से बोल सकते हो?', english:'Can you speak louder?', hint:'Can you + speak louder?', type:'translation' },
    { id:'d16-029', hindi:'हम सब कुछ बेहतर कर सकते हैं।', english:'We can all do better.', hint:'We can all + do better', type:'translation' },
    { id:'d16-030', hindi:'क्या मैं phone use कर सकता हूँ?', english:'Can I use the phone?', hint:'Can I + use the phone?', type:'translation' },
  ],

  // ── Day 17 — Should ──────────────────────────────────────────
  17: [
    { id:'d17-001', hindi:'तुम्हें ज़्यादा पानी पीना चाहिए।', english:'You should drink more water.', hint:'You should + drink more', type:'translation' },
    { id:'d17-002', hindi:'हमें समय पर पहुँचना चाहिए।', english:'We should arrive on time.', hint:'We should + arrive on time', type:'translation' },
    { id:'d17-003', hindi:'उसे माफ़ी माँगनी चाहिए।', english:'He should apologize.', hint:'He should + apologize', type:'translation' },
    { id:'d17-004', hindi:'क्या मुझे यह job लेनी चाहिए?', english:'Should I take this job?', hint:'Should I + take?', type:'translation' },
    { id:'d17-005', hindi:'तुम्हें रोज़ exercise करनी चाहिए।', english:'You should exercise every day.', hint:'should + exercise daily', type:'translation' },
    { id:'d17-006', hindi:'वह डॉक्टर के पास जाए।', english:'She should see a doctor.', hint:'She should + see a doctor', type:'translation' },
    { id:'d17-007', hindi:'हमें environment की care करनी चाहिए।', english:'We should take care of the environment.', hint:'should + take care of', type:'translation' },
    { id:'d17-008', hindi:'तुम्हें अपने parents की care करनी चाहिए।', english:'You should take care of your parents.', hint:'should take care of + parents', type:'translation' },
    { id:'d17-009', hindi:'क्या हमें अभी जाना चाहिए?', english:'Should we leave now?', hint:'Should we + leave now?', type:'translation' },
    { id:'d17-010', hindi:'वह अपना homework करे।', english:'He should do his homework.', hint:'He should + do his homework', type:'translation' },
    { id:'d17-011', hindi:'तुम्हें ऐसा नहीं कहना चाहिए।', english:"You shouldn't say that.", alternatives:['you should not say that.'], hint:"shouldn't + say", type:'translation' },
    { id:'d17-012', hindi:'उसे ज़्यादा मेहनत करनी चाहिए।', english:'She should work harder.', hint:'She should + work harder', type:'translation' },
    { id:'d17-013', hindi:'क्या उसे यह बताना चाहिए?', english:'Should she tell him?', hint:'Should she + tell?', type:'translation' },
    { id:'d17-014', hindi:'हमें पहले plan करना चाहिए।', english:'We should plan first.', hint:'We should + plan first', type:'translation' },
    { id:'d17-015', hindi:'तुम्हें English practice रोज़ करनी चाहिए।', english:'You should practice English daily.', hint:'should + practice daily', type:'translation' },
    { id:'d17-016', hindi:'वे जल्दी सोना चाहिए।', english:'They should sleep early.', hint:'They should + sleep early', type:'translation' },
    { id:'d17-017', hindi:'उसे truth बताना चाहिए।', english:'He should tell the truth.', hint:'should + tell the truth', type:'translation' },
    { id:'d17-018', hindi:'क्या मुझे इसे accept करना चाहिए?', english:'Should I accept this?', hint:'Should I + accept?', type:'translation' },
    { id:'d17-019', hindi:'हमें दूसरों की इज़्ज़त करनी चाहिए।', english:'We should respect others.', hint:'should + respect others', type:'translation' },
    { id:'d17-020', hindi:'तुम्हें healthy खाना खाना चाहिए।', english:'You should eat healthy food.', hint:'should + eat healthy', type:'translation' },
    { id:'d17-021', hindi:'वह ज़्यादा पढ़ना चाहिए।', english:'She should study more.', hint:'should + study more', type:'translation' },
    { id:'d17-022', hindi:'क्या उन्हें warning देनी चाहिए?', english:'Should we warn them?', hint:'Should we + warn them?', type:'translation' },
    { id:'d17-023', hindi:'तुम्हें झूठ नहीं बोलना चाहिए।', english:"You shouldn't lie.", alternatives:['you should not lie.'], hint:"shouldn't + lie", type:'translation' },
    { id:'d17-024', hindi:'उसे यह decision खुद लेना चाहिए।', english:'He should make this decision himself.', hint:'should + make this decision', type:'translation' },
    { id:'d17-025', hindi:'हमें team work करना चाहिए।', english:'We should work as a team.', hint:'should + work as a team', type:'translation' },
    { id:'d17-026', hindi:'क्या मुझे यह खरीदना चाहिए?', english:'Should I buy this?', hint:'Should I + buy?', type:'translation' },
    { id:'d17-027', hindi:'वे pollution नहीं बढ़ाना चाहिए।', english:"They shouldn't increase pollution.", hint:"shouldn't + increase pollution", type:'translation' },
    { id:'d17-028', hindi:'उसे अपने बारे में सोचना चाहिए।', english:'She should think about herself.', hint:'should + think about herself', type:'translation' },
    { id:'d17-029', hindi:'तुम्हें इसे seriously लेना चाहिए।', english:'You should take this seriously.', hint:'should + take seriously', type:'translation' },
    { id:'d17-030', hindi:'हमें change embrace करना चाहिए।', english:'We should embrace change.', hint:'should + embrace change', type:'translation' },
  ],

  // ── Day 18 — May ─────────────────────────────────────────────
  18: [
    { id:'d18-001', hindi:'कल बारिश हो सकती है।', english:'It may rain tomorrow.', hint:'It may + verb', type:'translation' },
    { id:'d18-002', hindi:'क्या मैं अंदर आ सकता हूँ?', english:'May I come in?', hint:'May I + base verb?', type:'translation' },
    { id:'d18-003', hindi:'वह आज late हो सकता है।', english:'He may be late today.', hint:'He may + be + adjective', type:'translation' },
    { id:'d18-004', hindi:'शायद वह ऑफिस में हो।', english:'She may be in the office.', hint:'She may be + place', type:'translation' },
    { id:'d18-005', hindi:'क्या मैं यह question पूछ सकता हूँ?', english:'May I ask a question?', hint:'May I + ask?', type:'translation' },
    { id:'d18-006', hindi:'मीटिंग cancel हो सकती है।', english:'The meeting may be cancelled.', hint:'may + be cancelled', type:'translation' },
    { id:'d18-007', hindi:'वह शायद नहीं आएगा।', english:'He may not come.', hint:'may not + verb', type:'translation' },
    { id:'d18-008', hindi:'शायद उसने call कर लिया हो।', english:'He may have called.', hint:'may have + V3', type:'translation' },
    { id:'d18-009', hindi:'क्या मैं आपसे बात कर सकता हूँ?', english:'May I speak with you?', hint:'May I + speak with?', type:'translation' },
    { id:'d18-010', hindi:'यह idea काम कर सकता है।', english:'This idea may work.', hint:'may + work', type:'translation' },
    { id:'d18-011', hindi:'वह कहीं और गया हो सकता है।', english:'He may have gone somewhere else.', hint:'may have gone + somewhere', type:'translation' },
    { id:'d18-012', hindi:'शायद वे जल्द ही आएंगे।', english:'They may arrive soon.', hint:'They may + arrive + soon', type:'translation' },
    { id:'d18-013', hindi:'क्या मैं यह file देख सकता हूँ?', english:'May I see this file?', hint:'May I + see?', type:'translation' },
    { id:'d18-014', hindi:'कीमत बढ़ सकती है।', english:'The price may increase.', hint:'may + increase', type:'translation' },
    { id:'d18-015', hindi:'शायद वह अभी busy हो।', english:'She may be busy right now.', hint:'may be + adjective + right now', type:'translation' },
    { id:'d18-016', hindi:'क्या मैं आपकी pen use कर सकता हूँ?', english:'May I use your pen?', hint:'May I + use your?', type:'translation' },
    { id:'d18-017', hindi:'यह सच भी हो सकता है।', english:'This may be true.', hint:'may be + adjective', type:'translation' },
    { id:'d18-018', hindi:'उन्होंने शायद पहले ही decide कर लिया हो।', english:'They may have already decided.', hint:'may have + already + V3', type:'translation' },
    { id:'d18-019', hindi:'शायद वह इस plan से agree ना हो।', english:'She may not agree with this plan.', hint:'may not + agree', type:'translation' },
    { id:'d18-020', hindi:'क्या मैं यह desk use कर सकता हूँ?', english:'May I use this desk?', hint:'May I + use?', type:'translation' },
    { id:'d18-021', hindi:'कल holidays हो सकती हैं।', english:'There may be a holiday tomorrow.', hint:'There may be + noun', type:'translation' },
    { id:'d18-022', hindi:'वह अपना job छोड़ सकता है।', english:'He may leave his job.', hint:'may + leave his job', type:'translation' },
    { id:'d18-023', hindi:'शायद result आज आए।', english:'The result may come today.', hint:'may + come today', type:'translation' },
    { id:'d18-024', hindi:'क्या मैं meeting join कर सकता हूँ?', english:'May I join the meeting?', hint:'May I + join?', type:'translation' },
    { id:'d18-025', hindi:'यह project successful हो सकता है।', english:'This project may be successful.', hint:'may be + adjective', type:'translation' },
    { id:'d18-026', hindi:'शायद वह already जा चुकी हो।', english:'She may have already left.', hint:'may have + already + left', type:'translation' },
    { id:'d18-027', hindi:'Traffic बहुत हो सकता है।', english:'There may be a lot of traffic.', hint:'There may be + noun', type:'translation' },
    { id:'d18-028', hindi:'क्या मैं आपसे कुछ माँग सकता हूँ?', english:'May I ask you for a favour?', hint:'May I + ask for a favour?', type:'translation' },
    { id:'d18-029', hindi:'शायद उसे help की ज़रूरत हो।', english:'She may need help.', hint:'may + need help', type:'translation' },
    { id:'d18-030', hindi:'यह एक बड़ा mistake हो सकता है।', english:'This may be a big mistake.', hint:'may be a + adjective + noun', type:'translation' },
  ],

  // ── Day 19 — Must ────────────────────────────────────────────
  19: [
    { id:'d19-001', hindi:'तुम्हें यह ज़रूर पढ़ना चाहिए।', english:'You must read this.', hint:'You must + base verb', type:'translation' },
    { id:'d19-002', hindi:'मुझे कल तक यह खत्म करना है।', english:'I must finish this by tomorrow.', hint:'must + finish + by', type:'translation' },
    { id:'d19-003', hindi:'वह ज़रूर थकी होगी।', english:'She must be tired.', hint:'must + be + adjective', type:'translation' },
    { id:'d19-004', hindi:'यहाँ शोर नहीं करना है।', english:'You must not make noise here.', alternatives:["you mustn't make noise here."], hint:"must not + make noise", type:'translation' },
    { id:'d19-005', hindi:'हमें rule follow करना ही है।', english:'We must follow the rules.', hint:'We must + follow the rules', type:'translation' },
    { id:'d19-006', hindi:'वह ज़रूर यहीं होगा।', english:'He must be here.', hint:'must + be + place', type:'translation' },
    { id:'d19-007', hindi:'तुम्हें passport ज़रूर लाना होगा।', english:'You must bring your passport.', hint:'You must + bring', type:'translation' },
    { id:'d19-008', hindi:'यहाँ smoking नहीं होगी।', english:'Smoking must not be done here.', alternatives:['you must not smoke here.'], hint:'must not + do', type:'translation' },
    { id:'d19-009', hindi:'वह ज़रूर doctor होगा।', english:'He must be a doctor.', hint:'must be + profession', type:'translation' },
    { id:'d19-010', hindi:'मुझे यह decision लेना ही है।', english:'I must make this decision.', hint:'must + make this decision', type:'translation' },
    { id:'d19-011', hindi:'क्या उसे अभी जाना ज़रूरी है?', english:'Must she go now?', hint:'Must + subject + verb?', type:'translation' },
    { id:'d19-012', hindi:'वे ज़रूर खुश होंगे।', english:'They must be happy.', hint:'must be + adjective', type:'translation' },
    { id:'d19-013', hindi:'तुम्हें यह form भरना ही है।', english:'You must fill this form.', hint:'must + fill', type:'translation' },
    { id:'d19-014', hindi:'उसे ज़रूर अच्छा लगा होगा।', english:'He must have liked it.', hint:'must have + liked', type:'translation' },
    { id:'d19-015', hindi:'हमें deadline meet करनी ही है।', english:'We must meet the deadline.', hint:'must + meet the deadline', type:'translation' },
    { id:'d19-016', hindi:'यह सच होना ही चाहिए।', english:'This must be true.', hint:'must be + adjective', type:'translation' },
    { id:'d19-017', hindi:'तुम्हें कभी झूठ नहीं बोलना चाहिए।', english:'You must never lie.', hint:'must never + verb', type:'translation' },
    { id:'d19-018', hindi:'वह ज़रूर अमीर होगा।', english:'He must be rich.', hint:'must be + adjective', type:'translation' },
    { id:'d19-019', hindi:'मुझे अभी जाना ही है।', english:'I must go now.', hint:'I must + go now', type:'translation' },
    { id:'d19-020', hindi:'students को uniform पहननी ज़रूरी है।', english:'Students must wear uniforms.', hint:'must + wear uniforms', type:'translation' },
    { id:'d19-021', hindi:'वे ज़रूर वहाँ पहुँच चुके होंगे।', english:'They must have reached there.', hint:'must have + reached', type:'translation' },
    { id:'d19-022', hindi:'तुम्हें respect करनी ज़रूरी है।', english:'You must show respect.', hint:'must + show respect', type:'translation' },
    { id:'d19-023', hindi:'वह ज़रूर बहुत talented होगी।', english:'She must be very talented.', hint:'must be + very + adjective', type:'translation' },
    { id:'d19-024', hindi:'हमें environment protect करना ज़रूरी है।', english:'We must protect the environment.', hint:'must + protect', type:'translation' },
    { id:'d19-025', hindi:'यह ज़रूर किसी गलतफहमी की वजह से हुआ होगा।', english:'This must have happened due to a misunderstanding.', hint:'must have + happened', type:'translation' },
    { id:'d19-026', hindi:'क्या हमें अभी decide करना ज़रूरी है?', english:'Must we decide right now?', hint:'Must we + decide?', type:'translation' },
    { id:'d19-027', hindi:'वह ज़रूर वहाँ गया होगा।', english:'He must have gone there.', hint:'must have + gone', type:'translation' },
    { id:'d19-028', hindi:'तुम्हें अपनी health का ख्याल रखना ज़रूरी है।', english:'You must take care of your health.', hint:'must + take care of your health', type:'translation' },
    { id:'d19-029', hindi:'यह movie ज़रूर अच्छी होगी।', english:'This movie must be good.', hint:'must be + adjective', type:'translation' },
    { id:'d19-030', hindi:'हमें अपने goals के लिए ज़रूर काम करना है।', english:'We must work towards our goals.', hint:'must + work towards', type:'translation' },
  ],

  // ── Day 20 — Revision + Speaking Practice ────────────────────
  20: [
    { id:'d20-001', hindi:'मैं English सीखना चाहता हूँ।', english:'I want to learn English.', hint:'Day 11 — Want to', type:'translation' },
    { id:'d20-002', hindi:'वह पहले पायलट बनना चाहती थी।', english:'She wanted to become a pilot.', hint:'Day 12 — Wanted to', type:'translation' },
    { id:'d20-003', hindi:'मुझे जाने दो।', english:'Let me go.', hint:'Day 13 — Let me', type:'translation' },
    { id:'d20-004', hindi:"चलो साथ में पढ़ते हैं।", english:"Let's study together.", hint:"Day 14 — Let's", type:'translation' },
    { id:'d20-005', hindi:'क्या आप एक cup of tea लेंगे?', english:"Would you like a cup of tea?", hint:'Day 15 — Would like', type:'translation' },
    { id:'d20-006', hindi:'मैं guitar बजा सकता हूँ।', english:'I can play the guitar.', hint:'Day 16 — Can', type:'translation' },
    { id:'d20-007', hindi:'तुम्हें रोज़ पढ़ना चाहिए।', english:'You should study every day.', hint:'Day 17 — Should', type:'translation' },
    { id:'d20-008', hindi:'कल बर्फबारी हो सकती है।', english:'It may snow tomorrow.', hint:'Day 18 — May', type:'translation' },
    { id:'d20-009', hindi:'तुम्हें यह ज़रूर करना है।', english:'You must do this.', hint:'Day 19 — Must', type:'translation' },
    { id:'d20-010', hindi:'वह गाना गाना चाहता है।', english:'He wants to sing.', hint:'Wants to + base verb', type:'translation' },
    { id:'d20-011', hindi:"चलो कुछ नया try करते हैं।", english:"Let's try something new.", hint:"Let's + try", type:'translation' },
    { id:'d20-012', hindi:'क्या तुम drive कर सकते हो?', english:'Can you drive?', hint:'Can you + drive?', type:'translation' },
    { id:'d20-013', hindi:'हमें देर नहीं करनी चाहिए।', english:"We shouldn't be late.", hint:"shouldn't + be late", type:'translation' },
    { id:'d20-014', hindi:'वह ज़रूर doctor होगा।', english:'He must be a doctor.', hint:'must be + noun', type:'translation' },
    { id:'d20-015', hindi:'मैं अपने दोस्त की मदद करना चाहता हूँ।', english:'I want to help my friend.', hint:'want to + help', type:'translation' },
    { id:'d20-016', hindi:'क्या मैं window खोल सकता हूँ?', english:'Can I open the window?', hint:'Can I + open?', type:'translation' },
    { id:'d20-017', hindi:'उसे doctor के पास जाना चाहिए।', english:'She should see a doctor.', hint:'should + see a doctor', type:'translation' },
    { id:'d20-018', hindi:'शायद वह busy हो।', english:'He may be busy.', hint:'may + be + adjective', type:'translation' },
    { id:'d20-019', hindi:'मुझे बोलने दो।', english:'Let me speak.', hint:'Let me + speak', type:'translation' },
    { id:'d20-020', hindi:'क्या आप dinner join करेंगे?', english:"Would you like to join us for dinner?", hint:"Would you like to + join?", type:'translation' },
    { id:'d20-021', hindi:'वह पहले यहाँ रहना चाहता था।', english:'He wanted to live here before.', hint:'wanted to + live here', type:'translation' },
    { id:'d20-022', hindi:'हमें यह form भरना ज़रूरी है।', english:'We must fill this form.', hint:'must + fill', type:'translation' },
    { id:'d20-023', hindi:"चलो बाहर खाते हैं।", english:"Let's eat out.", hint:"Let's + eat out", type:'translation' },
    { id:'d20-024', hindi:'मैं आपसे agree करना चाहूँगा।', english:"I'd like to agree with you.", hint:"I'd like to + agree", type:'translation' },
    { id:'d20-025', hindi:'क्या वह तैर सकती है?', english:'Can she swim?', hint:'Can she + swim?', type:'translation' },
    { id:'d20-026', hindi:'तुम्हें सच बोलना चाहिए।', english:'You should tell the truth.', hint:'should + tell the truth', type:'translation' },
    { id:'d20-027', hindi:'शायद वे already जा चुके हों।', english:'They may have already left.', hint:'may have + left', type:'translation' },
    { id:'d20-028', hindi:'उसे यह ज़रूर पसंद आया होगा।', english:'She must have liked this.', hint:'must have + liked', type:'translation' },
    { id:'d20-029', hindi:'क्या तुम मुझे बता सकते हो?', english:'Can you tell me?', hint:'Can you + tell me?', type:'translation' },
    { id:'d20-030', hindi:'मैं अपना best करना चाहता हूँ।', english:'I want to give my best.', hint:'want to + give my best', type:'translation' },
  ],

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

  // ── Day 21 — Used To ─────────────────────────────────────────
  21: [
    { id:'d21-001', hindi:'मैं पहले रोज़ morning walk जाता था।', english:'I used to go for a morning walk every day.', hint:'I used to + go', type:'translation' },
    { id:'d21-002', hindi:'वह बचपन में cricket खेलता था।', english:'He used to play cricket in childhood.', hint:'He used to + play', type:'translation' },
    { id:'d21-003', hindi:'हम पहले साथ school जाते थे।', english:'We used to go to school together.', hint:'We used to + go together', type:'translation' },
    { id:'d21-004', hindi:'वह पहले यहाँ रहती थी।', english:'She used to live here.', hint:'She used to + live', type:'translation' },
    { id:'d21-005', hindi:'मैं पहले बहुत fast food खाता था।', english:'I used to eat a lot of fast food.', hint:'I used to + eat', type:'translation' },
    { id:'d21-006', hindi:'वे पहले हर Sunday temple जाते थे।', english:'They used to go to the temple every Sunday.', hint:'They used to + go + every Sunday', type:'translation' },
    { id:'d21-007', hindi:'मेरे दादाजी बहुत कहानियाँ सुनाते थे।', english:'My grandfather used to tell many stories.', hint:'used to + tell many stories', type:'translation' },
    { id:'d21-008', hindi:'वह पहले बहुत shy था।', english:'He used to be very shy.', hint:'used to + be + adjective', type:'translation' },
    { id:'d21-009', hindi:'क्या तुम पहले यहाँ काम करते थे?', english:'Did you use to work here?', hint:'Did you use to + verb?', type:'translation' },
    { id:'d21-010', hindi:'हम पहले बहुत game खेला करते थे।', english:'We used to play a lot of games.', hint:'We used to + play', type:'translation' },
    { id:'d21-011', hindi:'मेरी माँ रोज़ खाना बनाती थीं।', english:'My mother used to cook every day.', hint:'used to + cook every day', type:'translation' },
    { id:'d21-012', hindi:'वह college में बहुत पढ़ता था।', english:'He used to study a lot in college.', hint:'used to + study a lot', type:'translation' },
    { id:'d21-013', hindi:'पहले यहाँ एक बड़ा park था।', english:'There used to be a big park here.', hint:'There used to be + noun', type:'translation' },
    { id:'d21-014', hindi:'मैं पहले regular gym जाता था।', english:'I used to go to the gym regularly.', hint:'I used to + go + regularly', type:'translation' },
    { id:'d21-015', hindi:'वह हर रात diary लिखती थी।', english:'She used to write a diary every night.', hint:'She used to + write + every night', type:'translation' },
    { id:'d21-016', hindi:'हम पहले बिना internet के जीते थे।', english:'We used to live without the internet.', hint:'used to + live without', type:'translation' },
    { id:'d21-017', hindi:'क्या वह पहले बहुत गाता था?', english:'Did he use to sing a lot?', hint:'Did he use to + sing?', type:'translation' },
    { id:'d21-018', hindi:'मेरे boss पहले बहुत strict थे।', english:'My boss used to be very strict.', hint:'used to + be strict', type:'translation' },
    { id:'d21-019', hindi:'हम पहले साथ lunch खाते थे।', english:'We used to have lunch together.', hint:'We used to + have lunch + together', type:'translation' },
    { id:'d21-020', hindi:'वह पहले बहुत late office आता था।', english:'He used to come to the office very late.', hint:'used to + come late', type:'translation' },
    { id:'d21-021', hindi:'मुझे पहले Hindi movies बहुत पसंद थीं।', english:'I used to like Hindi movies a lot.', hint:'I used to + like + a lot', type:'translation' },
    { id:'d21-022', hindi:'यहाँ पहले एक school हुआ करता था।', english:'There used to be a school here.', hint:'There used to be', type:'translation' },
    { id:'d21-023', hindi:'वह पहले बिल्कुल English नहीं बोल पाती थी।', english:'She used to not speak English at all.', alternatives:["she didn't use to speak english at all."], hint:'used to + not + verb', type:'translation' },
    { id:'d21-024', hindi:'मैं पहले बहुत ज़्यादा TV देखता था।', english:'I used to watch too much TV.', hint:'I used to + watch + too much', type:'translation' },
    { id:'d21-025', hindi:'उनका घर पहले बहुत छोटा था।', english:'Their house used to be very small.', hint:'used to + be + adjective', type:'translation' },
    { id:'d21-026', hindi:'हम school में अच्छे दोस्त हुआ करते थे।', english:'We used to be good friends in school.', hint:'We used to + be + friends', type:'translation' },
    { id:'d21-027', hindi:'वह पहले smoking करता था।', english:'He used to smoke.', hint:'He used to + smoke', type:'translation' },
    { id:'d21-028', hindi:'मेरे पिताजी रात को कहानियाँ पढ़ते थे।', english:'My father used to read stories at night.', hint:'used to + read + at night', type:'translation' },
    { id:'d21-029', hindi:'पहले यह company बहुत profitable थी।', english:'This company used to be very profitable.', hint:'used to + be + profitable', type:'translation' },
    { id:'d21-030', hindi:'क्या आप पहले यहाँ रहते थे?', english:'Did you use to live here?', hint:'Did you use to + live?', type:'translation' },
  ],

  // ── Day 22 — Could (Past Ability / Polite Request) ───────────
  22: [
    { id:'d22-001', hindi:'जब मैं छोटा था, तो बहुत तेज़ दौड़ सकता था।', english:'When I was young, I could run very fast.', hint:'could + run + fast', type:'translation' },
    { id:'d22-002', hindi:'वह बचपन में बहुत अच्छा गाना गा सकती थी।', english:'She could sing very well in childhood.', hint:'could + sing well', type:'translation' },
    { id:'d22-003', hindi:'क्या आप please थोड़ा और explain कर सकते हैं?', english:'Could you please explain a little more?', hint:'Could you please + verb?', type:'translation' },
    { id:'d22-004', hindi:'वह पहले 6 languages बोल सकता था।', english:'He could speak 6 languages before.', hint:'could + speak + languages', type:'translation' },
    { id:'d22-005', hindi:'क्या तुम कल meeting में आ सकते हो?', english:'Could you come to the meeting tomorrow?', hint:'Could you + come?', type:'translation' },
    { id:'d22-006', hindi:'पहले वह बहुत देर तक बैठकर पढ़ सकती थी।', english:'She could sit and study for a long time before.', hint:'could + sit and study', type:'translation' },
    { id:'d22-007', hindi:'क्या मैं आपकी pen use कर सकता हूँ?', english:'Could I use your pen?', hint:'Could I + use?', type:'translation' },
    { id:'d22-008', hindi:'वे पहले बिना glasses के पढ़ सकते थे।', english:'They could read without glasses before.', hint:'could + read + without', type:'translation' },
    { id:'d22-009', hindi:'जब मैं student था, रात को 2 बजे तक पढ़ सकता था।', english:'When I was a student, I could study till 2 AM.', hint:'could + study till 2 AM', type:'translation' },
    { id:'d22-010', hindi:'क्या आप please document email कर सकते हैं?', english:'Could you please email the document?', hint:'Could you please + email?', type:'translation' },
    { id:'d22-011', hindi:'वह पहले piano बहुत अच्छे से बजा सकती थी।', english:'She could play the piano very well before.', hint:'could + play the piano', type:'translation' },
    { id:'d22-012', hindi:'क्या आप मुझे station का रास्ता बता सकते हैं?', english:'Could you tell me the way to the station?', hint:'Could you tell me + direction?', type:'translation' },
    { id:'d22-013', hindi:'उसने कहा कि वह समझ नहीं सका।', english:'He said that he could not understand.', hint:'could not + understand', type:'translation' },
    { id:'d22-014', hindi:'क्या तुम please volume थोड़ा कम कर सकते हो?', english:'Could you please turn down the volume a little?', hint:'Could you please + turn down?', type:'translation' },
    { id:'d22-015', hindi:'जब वह बच्चा था, 5 घंटे cricket खेल सकता था।', english:'When he was a child, he could play cricket for 5 hours.', hint:'could + play for + hours', type:'translation' },
    { id:'d22-016', hindi:'क्या मैं कल छुट्टी ले सकता हूँ?', english:'Could I take a day off tomorrow?', hint:'Could I + take a day off?', type:'translation' },
    { id:'d22-017', hindi:'पहले वह बिना किसी help के सब कुछ कर सकती थी।', english:'She could do everything without any help before.', hint:'could + do + without help', type:'translation' },
    { id:'d22-018', hindi:'उस समय वह बहुत अच्छे decision ले सकता था।', english:'At that time, he could make very good decisions.', hint:'could + make + decisions', type:'translation' },
    { id:'d22-019', hindi:'क्या आप please meeting reschedule कर सकते हैं?', english:'Could you please reschedule the meeting?', hint:'Could you please + reschedule?', type:'translation' },
    { id:'d22-020', hindi:'शुरू में मैं कुछ भी नहीं बोल सकता था।', english:'In the beginning, I could not speak anything.', hint:'could not + speak + anything', type:'translation' },
    { id:'d22-021', hindi:'क्या आप कल 5 बजे free हो सकते हैं?', english:'Could you be free at 5 tomorrow?', hint:'Could you + be free at?', type:'translation' },
    { id:'d22-022', hindi:'वह बचपन में पाँच languages में लिख सकती थी।', english:'She could write in five languages as a child.', hint:'could + write in + languages', type:'translation' },
    { id:'d22-023', hindi:'क्या कोई मेरी help कर सकता है?', english:'Could someone help me?', hint:'Could someone + help?', type:'translation' },
    { id:'d22-024', hindi:'मैं पहले बहुत तेज़ type कर सकता था।', english:'I could type very fast before.', hint:'could + type + fast', type:'translation' },
    { id:'d22-025', hindi:'क्या तुम please इसे दूसरे तरीके से समझा सकते हो?', english:'Could you please explain this in a different way?', hint:'Could you + explain + differently?', type:'translation' },
    { id:'d22-026', hindi:'वह तीन साल की उम्र में पढ़ सकती थी।', english:'She could read at the age of three.', hint:'could + read + at the age of', type:'translation' },
    { id:'d22-027', hindi:'क्या हम इस project पर collaborate कर सकते हैं?', english:'Could we collaborate on this project?', hint:'Could we + collaborate on?', type:'translation' },
    { id:'d22-028', hindi:'पहले वे बिना plan के भी manage कर सकते थे।', english:'Before, they could manage even without a plan.', hint:'could + manage + without a plan', type:'translation' },
    { id:'d22-029', hindi:'क्या तुम मेरे लिए एक email draft कर सकते हो?', english:'Could you draft an email for me?', hint:'Could you + draft an email?', type:'translation' },
    { id:'d22-030', hindi:'जब वह college में था, रात भर study कर सकता था।', english:'When he was in college, he could study all night.', hint:'could + study all night', type:'translation' },
  ],

  // ── Day 23 — Should Have (Past Regret / Criticism) ───────────
  23: [
    { id:'d23-001', hindi:'मुझे पहले उससे बात करनी चाहिए थी।', english:'I should have talked to him earlier.', hint:'should have + talked', type:'translation' },
    { id:'d23-002', hindi:'तुम्हें doctor को पहले दिखाना चाहिए था।', english:'You should have seen the doctor earlier.', hint:'should have + seen + earlier', type:'translation' },
    { id:'d23-003', hindi:'उसे यह नहीं करना चाहिए था।', english:"He shouldn't have done this.", hint:"shouldn't have + done", type:'translation' },
    { id:'d23-004', hindi:'मुझे वह opportunity miss नहीं करनी चाहिए थी।', english:"I shouldn't have missed that opportunity.", hint:"shouldn't have + missed", type:'translation' },
    { id:'d23-005', hindi:'हमें meeting के लिए पहले prepare करना चाहिए था।', english:'We should have prepared for the meeting earlier.', hint:'should have + prepared', type:'translation' },
    { id:'d23-006', hindi:'उसे इतना गुस्सा नहीं होना चाहिए था।', english:"He shouldn't have gotten so angry.", hint:"shouldn't have + gotten angry", type:'translation' },
    { id:'d23-007', hindi:'मुझे पहले English सीखना शुरू करना चाहिए था।', english:'I should have started learning English earlier.', hint:'should have + started learning', type:'translation' },
    { id:'d23-008', hindi:'उसे वह secret किसी को नहीं बताना चाहिए था।', english:"She shouldn't have told that secret to anyone.", hint:"shouldn't have + told", type:'translation' },
    { id:'d23-009', hindi:'क्या मुझे वह email send करनी चाहिए थी?', english:'Should I have sent that email?', hint:'Should I have + sent?', type:'translation' },
    { id:'d23-010', hindi:'हमें पहले से backup plan बनाना चाहिए था।', english:'We should have made a backup plan in advance.', hint:'should have + made + in advance', type:'translation' },
    { id:'d23-011', hindi:'तुम्हें वह बात अपने boss को बतानी चाहिए थी।', english:'You should have told that to your boss.', hint:'should have + told + boss', type:'translation' },
    { id:'d23-012', hindi:'उसे more carefully listen करना चाहिए था।', english:'He should have listened more carefully.', hint:'should have + listened + carefully', type:'translation' },
    { id:'d23-013', hindi:'मुझे उस time पर हाँ कहनी चाहिए थी।', english:'I should have said yes at that time.', hint:'should have + said yes', type:'translation' },
    { id:'d23-014', hindi:'हमें project deadline से पहले submit करना चाहिए था।', english:'We should have submitted the project before the deadline.', hint:'should have + submitted + before deadline', type:'translation' },
    { id:'d23-015', hindi:'उसे पहले से ही save करना चाहिए था।', english:'She should have saved it beforehand.', hint:'should have + saved + beforehand', type:'translation' },
    { id:'d23-016', hindi:'तुम्हें इतने पैसे खर्च नहीं करने चाहिए थे।', english:"You shouldn't have spent so much money.", hint:"shouldn't have + spent", type:'translation' },
    { id:'d23-017', hindi:'मुझे उसकी बात माननी चाहिए थी।', english:'I should have listened to him.', alternatives:['i should have followed his advice.'], hint:'should have + listened', type:'translation' },
    { id:'d23-018', hindi:'उन्हें पहले ही inform करना चाहिए था।', english:'They should have informed us earlier.', hint:'should have + informed + earlier', type:'translation' },
    { id:'d23-019', hindi:'मुझे वह interview better prepare करना चाहिए था।', english:'I should have prepared better for that interview.', hint:'should have + prepared better', type:'translation' },
    { id:'d23-020', hindi:'उसे अकेले यह decision नहीं लेना चाहिए था।', english:"She shouldn't have made that decision alone.", hint:"shouldn't have + made + alone", type:'translation' },
    { id:'d23-021', hindi:'हमें पहले contract check करना चाहिए था।', english:'We should have checked the contract first.', hint:'should have + checked + first', type:'translation' },
    { id:'d23-022', hindi:'तुम्हें वह बात clearly बोलनी चाहिए थी।', english:'You should have spoken clearly.', hint:'should have + spoken clearly', type:'translation' },
    { id:'d23-023', hindi:'मुझे उस दिन office जाना चाहिए था।', english:'I should have gone to the office that day.', hint:'should have + gone', type:'translation' },
    { id:'d23-024', hindi:'उसे credit card use नहीं करना चाहिए था।', english:"He shouldn't have used a credit card.", hint:"shouldn't have + used", type:'translation' },
    { id:'d23-025', hindi:'मुझे पहले health insurance लेनी चाहिए थी।', english:'I should have gotten health insurance earlier.', hint:'should have + gotten insurance', type:'translation' },
    { id:'d23-026', hindi:'उन्हें वह file backup करनी चाहिए थी।', english:'They should have backed up that file.', hint:'should have + backed up', type:'translation' },
    { id:'d23-027', hindi:'क्या हमें उससे पहले बात करनी चाहिए थी?', english:'Should we have talked to her first?', hint:'Should we have + talked first?', type:'translation' },
    { id:'d23-028', hindi:'उसे English class join करनी चाहिए थी।', english:'She should have joined an English class.', hint:'should have + joined', type:'translation' },
    { id:'d23-029', hindi:'मुझे वह chance नहीं जाने देना चाहिए था।', english:"I shouldn't have let that chance go.", hint:"shouldn't have + let go", type:'translation' },
    { id:'d23-030', hindi:'तुम्हें थोड़ा और patient रहना चाहिए था।', english:'You should have been a little more patient.', hint:'should have + been + patient', type:'translation' },
  ],

  // ── Day 24 — Must Have (Strong Past Deduction) ───────────────
  24: [
    { id:'d24-001', hindi:'वह ज़रूर बहुत थका हुआ होगा।', english:'He must have been very tired.', hint:'must have + been + adjective', type:'translation' },
    { id:'d24-002', hindi:'ज़रूर रात को बारिश हुई होगी — रास्ता गीला है।', english:'It must have rained last night — the road is wet.', hint:'must have + rained', type:'translation' },
    { id:'d24-003', hindi:'उसने ज़रूर train miss की होगी।', english:'She must have missed the train.', hint:'must have + missed', type:'translation' },
    { id:'d24-004', hindi:'वह ज़रूर बहुत खुश हुआ होगा।', english:'He must have been very happy.', hint:'must have + been happy', type:'translation' },
    { id:'d24-005', hindi:'वे ज़रूर बहुत मेहनत करते रहे होंगे।', english:'They must have worked very hard.', hint:'must have + worked hard', type:'translation' },
    { id:'d24-006', hindi:'उसे ज़रूर पहले से पता था।', english:'She must have known already.', hint:'must have + known', type:'translation' },
    { id:'d24-007', hindi:'यह काम ज़रूर बहुत मुश्किल रहा होगा।', english:'This work must have been very difficult.', hint:'must have + been + difficult', type:'translation' },
    { id:'d24-008', hindi:'वह ज़रूर meeting में गया होगा।', english:'He must have gone to the meeting.', hint:'must have + gone', type:'translation' },
    { id:'d24-009', hindi:'ज़रूर कोई गलती हुई होगी system में।', english:'There must have been some error in the system.', hint:'must have + been + an error', type:'translation' },
    { id:'d24-010', hindi:'उसने ज़रूर message देखा होगा।', english:'She must have seen the message.', hint:'must have + seen', type:'translation' },
    { id:'d24-011', hindi:'वे ज़रूर late हो गए होंगे।', english:'They must have gotten late.', hint:'must have + gotten late', type:'translation' },
    { id:'d24-012', hindi:'उसे ज़रूर बहुत pressure था।', english:'He must have been under a lot of pressure.', hint:'must have + been under pressure', type:'translation' },
    { id:'d24-013', hindi:'ज़रूर किसी ने door lock नहीं किया होगा।', english:'Someone must not have locked the door.', hint:"must not have + locked", type:'translation' },
    { id:'d24-014', hindi:'वह ज़रूर घर पर होगी — phone नहीं उठाया।', english:'She must have been at home — she did not pick up the phone.', hint:'must have + been at home', type:'translation' },
    { id:'d24-015', hindi:'उन्होंने ज़रूर बहुत practice की होगी।', english:'They must have practiced a lot.', hint:'must have + practiced', type:'translation' },
    { id:'d24-016', hindi:'वह ज़रूर result से निराश हुआ होगा।', english:'He must have been disappointed with the result.', hint:'must have + been disappointed', type:'translation' },
    { id:'d24-017', hindi:'खाना गायब है — किसी ने ज़रूर खा लिया होगा।', english:'The food is gone — someone must have eaten it.', hint:'must have + eaten it', type:'translation' },
    { id:'d24-018', hindi:'वह ज़रूर कुछ important भूल गई होगी।', english:'She must have forgotten something important.', hint:'must have + forgotten', type:'translation' },
    { id:'d24-019', hindi:'उसे ज़रूर new job offer मिला होगा।', english:'He must have received a new job offer.', hint:'must have + received', type:'translation' },
    { id:'d24-020', hindi:'ज़रूर traffic jam था — इसीलिए देर हुई।', english:'There must have been a traffic jam — that is why he was late.', hint:'must have + been a jam', type:'translation' },
    { id:'d24-021', hindi:'उसे ज़रूर exam की tension थी।', english:'She must have been stressed about the exam.', hint:'must have + been stressed', type:'translation' },
    { id:'d24-022', hindi:'वे ज़रूर पहले मिल चुके होंगे।', english:'They must have met before.', hint:'must have + met before', type:'translation' },
    { id:'d24-023', hindi:'उसने ज़रूर उस news के बारे में सुना होगा।', english:'He must have heard about that news.', hint:'must have + heard', type:'translation' },
    { id:'d24-024', hindi:'ज़रूर उसने बहुत effort लगाया होगा।', english:'He must have put in a lot of effort.', hint:'must have + put in effort', type:'translation' },
    { id:'d24-025', hindi:'वह ज़रूर बहुत nervous थी interview में।', english:'She must have been very nervous in the interview.', hint:'must have + been nervous', type:'translation' },
    { id:'d24-026', hindi:'उन्होंने ज़रूर सारी रात काम किया होगा।', english:'They must have worked all night.', hint:'must have + worked all night', type:'translation' },
    { id:'d24-027', hindi:'वह ज़रूर कहीं और गया होगा।', english:'He must have gone somewhere else.', hint:'must have + gone somewhere else', type:'translation' },
    { id:'d24-028', hindi:'ज़रूर connection problem था।', english:'There must have been a connection problem.', hint:'must have + been a problem', type:'translation' },
    { id:'d24-029', hindi:'उसने ज़रूर सच बोला होगा।', english:'He must have told the truth.', hint:'must have + told the truth', type:'translation' },
    { id:'d24-030', hindi:'वे ज़रूर project complete कर चुके होंगे।', english:'They must have completed the project.', hint:'must have + completed', type:'translation' },
  ],

  // ── Day 25 — Could Have (Missed Opportunity / Past Possibility) ──
  25: [
    { id:'d25-001', hindi:'मैं और बेहतर तैयारी कर सकता था।', english:'I could have prepared better.', hint:'could have + prepared better', type:'translation' },
    { id:'d25-002', hindi:'यह situation और बुरी हो सकती थी।', english:'This situation could have been worse.', hint:'could have + been worse', type:'translation' },
    { id:'d25-003', hindi:'तुम कम से कम एक message कर सकते थे!', english:'You could have at least sent one message!', hint:'could have + sent a message', type:'translation' },
    { id:'d25-004', hindi:'वह doctor बन सकता था।', english:'He could have become a doctor.', hint:'could have + become', type:'translation' },
    { id:'d25-005', hindi:'मैं पहले ही यह बात कह सकता था।', english:'I could have said this earlier.', hint:'could have + said + earlier', type:'translation' },
    { id:'d25-006', hindi:'हम taxi ले सकते थे — घर पहुँचते।', english:'We could have taken a taxi — we would have reached home.', hint:'could have + taken a taxi', type:'translation' },
    { id:'d25-007', hindi:'तुम्हारी मदद के बिना मैं यह नहीं कर सकता था।', english:"I couldn't have done this without your help.", hint:"couldn't have + done + without", type:'translation' },
    { id:'d25-008', hindi:'वह उस job के लिए apply कर सकती थी।', english:'She could have applied for that job.', hint:'could have + applied for', type:'translation' },
    { id:'d25-009', hindi:'accident बहुत गंभीर हो सकती थी।', english:'The accident could have been very serious.', hint:'could have + been serious', type:'translation' },
    { id:'d25-010', hindi:'हम यह deal बहुत पहले close कर सकते थे।', english:'We could have closed this deal much earlier.', hint:'could have + closed + earlier', type:'translation' },
    { id:'d25-011', hindi:'वह उस competition में जीत सकता था।', english:'He could have won that competition.', hint:'could have + won', type:'translation' },
    { id:'d25-012', hindi:'तुम मुझे पहले inform कर सकते थे!', english:'You could have informed me earlier!', hint:'could have + informed + earlier', type:'translation' },
    { id:'d25-013', hindi:'मैं उस समय ज़्यादा save कर सकता था।', english:'I could have saved more at that time.', hint:'could have + saved more', type:'translation' },
    { id:'d25-014', hindi:'वह पहले से ही famous हो सकती थी।', english:'She could have been famous by now.', hint:'could have + been famous', type:'translation' },
    { id:'d25-015', hindi:'हम एक अलग route ले सकते थे।', english:'We could have taken a different route.', hint:'could have + taken a route', type:'translation' },
    { id:'d25-016', hindi:'वह यह गलती बचा सकता था।', english:'He could have avoided this mistake.', hint:'could have + avoided', type:'translation' },
    { id:'d25-017', hindi:'तुम उससे directly बात कर सकते थे।', english:'You could have spoken to her directly.', hint:'could have + spoken directly', type:'translation' },
    { id:'d25-018', hindi:'यह नहीं होता अगर हम careful रहते — हम बच सकते थे।', english:'We could have been more careful.', hint:'could have + been more careful', type:'translation' },
    { id:'d25-019', hindi:'वह रुक कर एक बार check कर सकता था।', english:'He could have stopped and checked once.', hint:'could have + stopped and checked', type:'translation' },
    { id:'d25-020', hindi:'हम बहुत पहले यहाँ आ सकते थे।', english:'We could have come here much earlier.', hint:'could have + come earlier', type:'translation' },
    { id:'d25-021', hindi:'तुम एक better answer दे सकते थे।', english:'You could have given a better answer.', hint:'could have + given a better answer', type:'translation' },
    { id:'d25-022', hindi:'वह professor बन सकती थी।', english:'She could have become a professor.', hint:'could have + become a professor', type:'translation' },
    { id:'d25-023', hindi:'यह project कम budget में हो सकता था।', english:'This project could have been done in less budget.', hint:'could have + been done in less budget', type:'translation' },
    { id:'d25-024', hindi:'मैं उस समय better salary negotiate कर सकता था।', english:'I could have negotiated a better salary at that time.', hint:'could have + negotiated', type:'translation' },
    { id:'d25-025', hindi:'उस situation को better handle किया जा सकता था।', english:'That situation could have been handled better.', hint:'could have + been handled better', type:'translation' },
    { id:'d25-026', hindi:'वह earlier आ सकता था।', english:'He could have come earlier.', hint:'could have + come earlier', type:'translation' },
    { id:'d25-027', hindi:'हम दोनों साथ मिलकर यह solve कर सकते थे।', english:'We both could have solved this together.', hint:'could have + solved together', type:'translation' },
    { id:'d25-028', hindi:'तुम उसे एक chance दे सकते थे।', english:'You could have given him one chance.', hint:'could have + given a chance', type:'translation' },
    { id:'d25-029', hindi:'मैं उस flight को catch कर सकता था।', english:'I could have caught that flight.', hint:'could have + caught the flight', type:'translation' },
    { id:'d25-030', hindi:'यह project on time deliver हो सकता था।', english:'This project could have been delivered on time.', hint:'could have + been delivered on time', type:'translation' },
  ],

  // ── Day 26 — Would Have (3rd Conditional / Imaginary Past) ────
  26: [
    { id:'d26-001', hindi:'अगर मैंने पढ़ाई की होती, तो pass हो जाता।', english:'If I had studied, I would have passed.', hint:'If + had studied → would have + passed', type:'translation' },
    { id:'d26-002', hindi:'अगर तुम जल्दी आते, तो हम मिल लेते।', english:'If you had come early, we would have met.', hint:'If + had come → would have + met', type:'translation' },
    { id:'d26-003', hindi:'मैं तुम्हारी ज़रूर मदद करता।', english:'I would have definitely helped you.', hint:'would have + helped + definitely', type:'translation' },
    { id:'d26-004', hindi:'अगर उसने invest किया होता, तो आज अमीर होता।', english:'If he had invested, he would have been rich today.', hint:'If + had invested → would have + been rich', type:'translation' },
    { id:'d26-005', hindi:'मैं यह नौकरी कभी नहीं छोड़ता।', english:'I would never have left this job.', hint:'would never have + left', type:'translation' },
    { id:'d26-006', hindi:'अगर उसने ध्यान दिया होता, तो गलती नहीं होती।', english:'If he had paid attention, he would not have made a mistake.', hint:'If + had paid → would not have + made', type:'translation' },
    { id:'d26-007', hindi:'तुम्हारी जगह मैं वह job ज़रूर लेता।', english:'In your place, I would have definitely taken that job.', hint:'would have + taken + in your place', type:'translation' },
    { id:'d26-008', hindi:'अगर हम earlier plan करते, तो better result होता।', english:'If we had planned earlier, we would have gotten better results.', hint:'If + had planned → would have + gotten', type:'translation' },
    { id:'d26-009', hindi:'वह competition ज़रूर जीतती अगर nervous नहीं होती।', english:'She would have won the competition if she had not been nervous.', hint:'would have + won + if not nervous', type:'translation' },
    { id:'d26-010', hindi:'मैं उससे माफ़ी माँगता अगर मुझे पता होता।', english:'I would have apologized to him if I had known.', hint:'would have + apologized + if had known', type:'translation' },
    { id:'d26-011', hindi:'अगर वे समय पर पहुँचते, तो presentation नहीं छूटती।', english:'If they had arrived on time, they would not have missed the presentation.', hint:'If + had arrived → would not have + missed', type:'translation' },
    { id:'d26-012', hindi:'मैं यह गलती कभी नहीं करता।', english:'I would never have made this mistake.', hint:'would never have + made', type:'translation' },
    { id:'d26-013', hindi:'अगर weather अच्छा होता, तो हम picnic जाते।', english:'If the weather had been good, we would have gone for a picnic.', hint:'If + had been → would have + gone', type:'translation' },
    { id:'d26-014', hindi:'अगर वह apply करता, तो ज़रूर select होता।', english:'If he had applied, he would have definitely been selected.', hint:'If + had applied → would have + been selected', type:'translation' },
    { id:'d26-015', hindi:'उसकी मदद के बिना मैं यह नहीं कर सकता था।', english:'Without her help, I would not have been able to do this.', hint:'would not have + been able to', type:'translation' },
    { id:'d26-016', hindi:'अगर मैंने उसकी बात सुनी होती, तो आज खुश होता।', english:'If I had listened to him, I would have been happy today.', hint:'If + had listened → would have + been happy', type:'translation' },
    { id:'d26-017', hindi:'हम ज़रूर agree करते उसकी proposal पर।', english:'We would have definitely agreed to his proposal.', hint:'would have + agreed + definitely', type:'translation' },
    { id:'d26-018', hindi:'अगर sale better होती, तो bonus मिलता।', english:'If the sales had been better, we would have gotten a bonus.', hint:'If + had been → would have + gotten bonus', type:'translation' },
    { id:'d26-019', hindi:'मैं वह chance कभी नहीं छोड़ता।', english:'I would never have missed that chance.', hint:'would never have + missed', type:'translation' },
    { id:'d26-020', hindi:'अगर वह system crash नहीं होता, तो data save होता।', english:'If the system had not crashed, the data would have been saved.', hint:'If + had not crashed → would have + been saved', type:'translation' },
    { id:'d26-021', hindi:'तुम्हारी जगह मैं directly HR से बात करता।', english:'In your place, I would have spoken to HR directly.', hint:'would have + spoken + in your place', type:'translation' },
    { id:'d26-022', hindi:'अगर project on time deliver होता, तो client खुश होता।', english:'If the project had been delivered on time, the client would have been happy.', hint:'If + had been delivered → would have + been happy', type:'translation' },
    { id:'d26-023', hindi:'मैं तुम्हें पहले ही बता देता।', english:'I would have told you earlier.', hint:'would have + told + earlier', type:'translation' },
    { id:'d26-024', hindi:'अगर उसने extra effort लगाया होता, तो promotion मिलता।', english:'If he had put in extra effort, he would have gotten the promotion.', hint:'If + had put in → would have + gotten', type:'translation' },
    { id:'d26-025', hindi:'हम उस समय much better decision लेते।', english:'We would have made a much better decision at that time.', hint:'would have + made a better decision', type:'translation' },
    { id:'d26-026', hindi:'वह तुम्हारे साथ ज़रूर आती।', english:'She would have definitely come with you.', hint:'would have + come + definitely', type:'translation' },
    { id:'d26-027', hindi:'अगर connection अच्छा होता, तो call better होती।', english:'If the connection had been good, the call would have been better.', hint:'If + had been → would have + been better', type:'translation' },
    { id:'d26-028', hindi:'मैं उसे personally thank करता।', english:'I would have thanked him personally.', hint:'would have + thanked + personally', type:'translation' },
    { id:'d26-029', hindi:'अगर हम earlier plan करते, तो stress कम होता।', english:'If we had planned earlier, there would have been less stress.', hint:'If + had planned → would have been less stress', type:'translation' },
    { id:'d26-030', hindi:'तुम्हारी जगह मैं वह property ज़रूर खरीदता।', english:'In your place, I would have definitely bought that property.', hint:'would have + bought + definitely', type:'translation' },
  ],

  // ── Day 27 — May Have (50% Past Possibility) ─────────────────
  27: [
    { id:'d27-001', hindi:'वह शायद घर चला गया हो।', english:'He may have gone home.', hint:'may have + gone', type:'translation' },
    { id:'d27-002', hindi:'वह शायद busy रही हो।', english:'She may have been busy.', hint:'may have + been busy', type:'translation' },
    { id:'d27-003', hindi:'Package शायद deliver हो गया हो।', english:'The package may have been delivered.', hint:'may have + been delivered', type:'translation' },
    { id:'d27-004', hindi:'Meeting शायद cancel हो गई हो।', english:'The meeting may have been cancelled.', hint:'may have + been cancelled', type:'translation' },
    { id:'d27-005', hindi:'उसने शायद आपका message नहीं पढ़ा हो।', english:'He may not have read your message.', hint:'may not have + read', type:'translation' },
    { id:'d27-006', hindi:'वे शायद पहले ही निकल गए हों।', english:'They may have already left.', hint:'may have + already + left', type:'translation' },
    { id:'d27-007', hindi:'शायद उसे address पता नहीं था।', english:'He may not have known the address.', hint:'may not have + known', type:'translation' },
    { id:'d27-008', hindi:'वह शायद train से गई हो।', english:'She may have gone by train.', hint:'may have + gone by train', type:'translation' },
    { id:'d27-009', hindi:'शायद उन्होंने हमारी plan के बारे में सुना हो।', english:'They may have heard about our plan.', hint:'may have + heard about', type:'translation' },
    { id:'d27-010', hindi:'शायद वह interview में select हो गई हो।', english:'She may have been selected in the interview.', hint:'may have + been selected', type:'translation' },
    { id:'d27-011', hindi:'Client शायद पहले ही email देख चुका हो।', english:'The client may have already seen the email.', hint:'may have + already + seen', type:'translation' },
    { id:'d27-012', hindi:'शायद उसे अभी तक नहीं पता।', english:'He may not have found out yet.', hint:'may not have + found out', type:'translation' },
    { id:'d27-013', hindi:'वे शायद already decide कर चुके हों।', english:'They may have already decided.', hint:'may have + already + decided', type:'translation' },
    { id:'d27-014', hindi:'शायद उसका phone switch off था।', english:'His phone may have been switched off.', hint:'may have + been switched off', type:'translation' },
    { id:'d27-015', hindi:'वह शायद अभी तक office में ही हो।', english:'She may have still been in the office.', hint:'may have + been in the office', type:'translation' },
    { id:'d27-016', hindi:'शायद वे किसी और route से गए हों।', english:'They may have gone by a different route.', hint:'may have + gone by different route', type:'translation' },
    { id:'d27-017', hindi:'शायद उसे promotion मिल गई हो।', english:'He may have gotten a promotion.', hint:'may have + gotten promotion', type:'translation' },
    { id:'d27-018', hindi:'Flight शायद delay हो गई हो।', english:'The flight may have been delayed.', hint:'may have + been delayed', type:'translation' },
    { id:'d27-019', hindi:'शायद वह already plan change कर चुका हो।', english:'He may have already changed his plan.', hint:'may have + already + changed', type:'translation' },
    { id:'d27-020', hindi:'वे शायद नए office में shift हो गए हों।', english:'They may have shifted to a new office.', hint:'may have + shifted to', type:'translation' },
    { id:'d27-021', hindi:'शायद उसे emergency थी।', english:'She may have had an emergency.', hint:'may have + had an emergency', type:'translation' },
    { id:'d27-022', hindi:'वह शायद exam में pass हो गया हो।', english:'He may have passed the exam.', hint:'may have + passed', type:'translation' },
    { id:'d27-023', hindi:'शायद उन्होंने already decision ले लिया हो।', english:'They may have already made the decision.', hint:'may have + already + made', type:'translation' },
    { id:'d27-024', hindi:'वह शायद नया laptop खरीद लिया हो।', english:'She may have bought a new laptop.', hint:'may have + bought', type:'translation' },
    { id:'d27-025', hindi:'शायद file गलती से delete हो गई हो।', english:'The file may have been accidentally deleted.', hint:'may have + been accidentally deleted', type:'translation' },
    { id:'d27-026', hindi:'वह शायद बीमार हो गया हो।', english:'He may have fallen ill.', hint:'may have + fallen ill', type:'translation' },
    { id:'d27-027', hindi:'शायद उन्हें अभी तक confirmation नहीं मिली हो।', english:'They may not have received the confirmation yet.', hint:'may not have + received', type:'translation' },
    { id:'d27-028', hindi:'वह शायद event में नहीं आई हो।', english:'She may not have come to the event.', hint:'may not have + come', type:'translation' },
    { id:'d27-029', hindi:'शायद report already submit हो गई हो।', english:'The report may have already been submitted.', hint:'may have + already + been submitted', type:'translation' },
    { id:'d27-030', hindi:'वह शायद already city छोड़ चुका हो।', english:'He may have already left the city.', hint:'may have + already + left the city', type:'translation' },
  ],

  // ── Day 28 — Might Have (30% Remote Past Possibility) ────────
  28: [
    { id:'d28-001', hindi:'वह शायद bus miss कर गई हो।', english:'She might have missed the bus.', hint:'might have + missed', type:'translation' },
    { id:'d28-002', hindi:'उसे शायद रास्ता नहीं पता होगा।', english:'He might not have known the way.', hint:'might not have + known', type:'translation' },
    { id:'d28-003', hindi:'शायद उन्होंने हमारी plan के बारे में सुना हो।', english:'They might have heard about our plan.', hint:'might have + heard', type:'translation' },
    { id:'d28-004', hindi:'वह शायद घबरा गई हो interview में।', english:'She might have been nervous in the interview.', hint:'might have + been nervous', type:'translation' },
    { id:'d28-005', hindi:'तुम कम से कम पहले बता सकते थे।', english:'You might have at least told us before.', hint:'might have + told + before', type:'translation' },
    { id:'d28-006', hindi:'वह शायद already अपना plan change कर चुका हो।', english:'He might have already changed his plan.', hint:'might have + changed + already', type:'translation' },
    { id:'d28-007', hindi:'शायद meeting अभी भी चल रही हो।', english:'The meeting might have still been going on.', hint:'might have + been going on', type:'translation' },
    { id:'d28-008', hindi:'वह शायद गलत impression ले बैठी हो।', english:'She might have gotten the wrong impression.', hint:'might have + gotten + impression', type:'translation' },
    { id:'d28-009', hindi:'शायद server down हो गया हो।', english:'The server might have gone down.', hint:'might have + gone down', type:'translation' },
    { id:'d28-010', hindi:'वे शायद किसी और project पर shift हो गए हों।', english:'They might have shifted to another project.', hint:'might have + shifted', type:'translation' },
    { id:'d28-011', hindi:'उसने शायद email delete कर दिया हो।', english:'He might have deleted the email.', hint:'might have + deleted', type:'translation' },
    { id:'d28-012', hindi:'शायद वे दोनों पहले से जानते हों।', english:'They might have known each other before.', hint:'might have + known + before', type:'translation' },
    { id:'d28-013', hindi:'वह शायद कहीं और job ढूंढ रही हो।', english:'She might have been looking for another job.', hint:'might have + been looking', type:'translation' },
    { id:'d28-014', hindi:'शायद उसे अच्छा offer मिला हो।', english:'He might have received a good offer.', hint:'might have + received', type:'translation' },
    { id:'d28-015', hindi:'वे शायद गलत venue पर चले गए हों।', english:'They might have gone to the wrong venue.', hint:'might have + gone + wrong venue', type:'translation' },
    { id:'d28-016', hindi:'शायद उसने password change कर दिया हो।', english:'He might have changed the password.', hint:'might have + changed', type:'translation' },
    { id:'d28-017', hindi:'वह शायद किसी और के साथ busy हो।', english:'She might have been busy with someone else.', hint:'might have + been busy', type:'translation' },
    { id:'d28-018', hindi:'शायद call रिकॉर्ड नहीं हुई हो।', english:'The call might not have been recorded.', hint:'might not have + been recorded', type:'translation' },
    { id:'d28-019', hindi:'वे शायद already finalize कर चुके हों।', english:'They might have already finalized.', hint:'might have + already + finalized', type:'translation' },
    { id:'d28-020', hindi:'शायद उसे extra time नहीं दिया गया हो।', english:'He might not have been given extra time.', hint:'might not have + been given', type:'translation' },
    { id:'d28-021', hindi:'वह शायद किसी अलग city में shift हो गई हो।', english:'She might have moved to a different city.', hint:'might have + moved to', type:'translation' },
    { id:'d28-022', hindi:'शायद उन्होंने पहले ही complaint कर दी हो।', english:'They might have already complained.', hint:'might have + already + complained', type:'translation' },
    { id:'d28-023', hindi:'वह शायद किसी बड़े project में लगा हो।', english:'He might have been working on a big project.', hint:'might have + been working on', type:'translation' },
    { id:'d28-024', hindi:'शायद system update हो रहा हो।', english:'The system might have been updating.', hint:'might have + been updating', type:'translation' },
    { id:'d28-025', hindi:'वह शायद किसी और तरीके से try करी हो।', english:'She might have tried a different approach.', hint:'might have + tried + different approach', type:'translation' },
    { id:'d28-026', hindi:'शायद उसे अभी पता नहीं है।', english:'He might not have known about it yet.', hint:'might not have + known', type:'translation' },
    { id:'d28-027', hindi:'वे शायद पहले से तैयार हों।', english:'They might have already been prepared.', hint:'might have + been prepared', type:'translation' },
    { id:'d28-028', hindi:'शायद email spam folder में चली गई हो।', english:'The email might have gone to the spam folder.', hint:'might have + gone to spam', type:'translation' },
    { id:'d28-029', hindi:'वह शायद कहीं और काम कर रही हो।', english:'She might have been working elsewhere.', hint:'might have + been working elsewhere', type:'translation' },
    { id:'d28-030', hindi:'शायद उन्होंने दूसरा option choose किया हो।', english:'They might have chosen a different option.', hint:'might have + chosen + different option', type:'translation' },
  ],

  // ── Day 29 — Will / Shall (Future Tense) ────────────────────
  29: [
    { id:'d29-001', hindi:'मैं कल office जाऊँगा।', english:'I will go to the office tomorrow.', hint:'will + go', type:'translation' },
    { id:'d29-002', hindi:'क्या आप मेरी मदद करेंगे?', english:'Will you help me?', hint:'Will you + help?', type:'translation' },
    { id:'d29-003', hindi:'वह अगले साल विदेश जाएगी।', english:'She will go abroad next year.', hint:'will + go abroad', type:'translation' },
    { id:'d29-004', hindi:'मैं यह secret किसी को नहीं बताऊँगा।', english:'I will not tell this secret to anyone.', alternatives:["i won't tell this secret."], hint:"won't + tell anyone", type:'translation' },
    { id:'d29-005', hindi:'क्या हम शुरू करें?', english:'Shall we begin?', hint:'Shall we + begin?', type:'translation' },
    { id:'d29-006', hindi:'वह interview में अच्छा करेगा।', english:'He will do well in the interview.', hint:'will + do well', type:'translation' },
    { id:'d29-007', hindi:'क्या मैं door खोलूँ?', english:'Shall I open the door?', hint:'Shall I + open?', type:'translation' },
    { id:'d29-008', hindi:'मैं तुम्हें शाम तक email करूँगा।', english:'I will email you by evening.', hint:'will + email + by evening', type:'translation' },
    { id:'d29-009', hindi:'वे project Friday तक complete करेंगे।', english:'They will complete the project by Friday.', hint:'will + complete + by Friday', type:'translation' },
    { id:'d29-010', hindi:'क्या तुम मुझे station drop करोगे?', english:'Will you drop me at the station?', hint:'Will you + drop + at station?', type:'translation' },
    { id:'d29-011', hindi:'यह नई policy next month से लागू होगी।', english:'This new policy will come into effect from next month.', hint:'will + come into effect', type:'translation' },
    { id:'d29-012', hindi:'मैं phone उठाता हूँ — रुको।', english:"I'll get the phone — wait.", hint:"I'll + get", type:'translation' },
    { id:'d29-013', hindi:'क्या हम lunch के बाद meeting करें?', english:'Shall we have the meeting after lunch?', hint:'Shall we + have the meeting?', type:'translation' },
    { id:'d29-014', hindi:'वह कभी नहीं बदलेगा।', english:'He will never change.', hint:'will never + change', type:'translation' },
    { id:'d29-015', hindi:'मैं इसका reply कल सुबह करूँगा।', english:'I will reply to this tomorrow morning.', hint:'will + reply + tomorrow morning', type:'translation' },
    { id:'d29-016', hindi:'क्या वह candidate accept करेगा?', english:'Will he accept the offer?', hint:'Will he + accept?', type:'translation' },
    { id:'d29-017', hindi:'हम ज़रूर results deliver करेंगे।', english:'We will definitely deliver results.', hint:'will + deliver + definitely', type:'translation' },
    { id:'d29-018', hindi:'क्या मैं यह report आपको send करूँ?', english:'Shall I send you this report?', hint:'Shall I + send?', type:'translation' },
    { id:'d29-019', hindi:'future में AI सब कुछ change कर देगा।', english:'AI will change everything in the future.', hint:'will + change everything', type:'translation' },
    { id:'d29-020', hindi:'मैं इसकी पूरी ज़िम्मेदारी लूँगा।', english:'I will take full responsibility for this.', hint:'will + take responsibility', type:'translation' },
    { id:'d29-021', hindi:'वह Tuesday तक वापस आ जाएगी।', english:'She will be back by Tuesday.', hint:'will + be back + by Tuesday', type:'translation' },
    { id:'d29-022', hindi:'क्या तुम मेरे साथ दिल्ली चलोगे?', english:'Will you come with me to Delhi?', hint:'Will you + come with me?', type:'translation' },
    { id:'d29-023', hindi:'मैं deadline miss नहीं करूँगा।', english:"I won't miss the deadline.", hint:"won't + miss", type:'translation' },
    { id:'d29-024', hindi:'क्या हम इस deal पर आगे बढ़ें?', english:'Shall we proceed with this deal?', hint:'Shall we + proceed with?', type:'translation' },
    { id:'d29-025', hindi:'यह medicine तुम्हें ठीक कर देगी।', english:'This medicine will cure you.', hint:'will + cure', type:'translation' },
    { id:'d29-026', hindi:'मैं तुम्हारे साथ हमेशा रहूँगा।', english:'I will always be with you.', hint:'will always + be with', type:'translation' },
    { id:'d29-027', hindi:'वह team को better lead करेगा।', english:'He will lead the team better.', hint:'will + lead + better', type:'translation' },
    { id:'d29-028', hindi:'क्या मैं आपके लिए कुछ कर सकता हूँ?', english:'Shall I do something for you?', hint:'Shall I + do something for?', type:'translation' },
    { id:'d29-029', hindi:'चिंता मत करो — सब ठीक हो जाएगा।', english:"Don't worry — everything will be alright.", hint:'will + be alright', type:'translation' },
    { id:'d29-030', hindi:'Company इस साल नए employees hire करेगी।', english:'The company will hire new employees this year.', hint:'will + hire + this year', type:'translation' },
  ],

  // ── Day 30 — Would + Ought To + Dare ─────────────────────────
  30: [
    { id:'d30-001', hindi:'क्या आप please window बंद कर देंगे?', english:'Would you please close the window?', hint:'Would you please + verb?', type:'translation' },
    { id:'d30-002', hindi:'क्या आप मुझे एक glass water दे सकते हैं?', english:'Would you give me a glass of water?', hint:'Would you + give?', type:'translation' },
    { id:'d30-003', hindi:'बचपन में वह रोज़ library जाता था।', english:'He would go to the library every day as a child.', hint:'would + go (past habit)', type:'translation' },
    { id:'d30-004', hindi:'तुम्हें अपने parents को respect करना चाहिए।', english:'You ought to respect your parents.', hint:'ought to + respect', type:'translation' },
    { id:'d30-005', hindi:'वह सच बोलने की हिम्मत रखती है।', english:'She dares to speak the truth.', hint:'dares to + speak', type:'translation' },
    { id:'d30-006', hindi:'क्या आप यह form fill करेंगे?', english:'Would you fill out this form?', hint:'Would you + fill out?', type:'translation' },
    { id:'d30-007', hindi:'तुम्हें समय पर आना चाहिए।', english:'You ought to come on time.', hint:'ought to + come', type:'translation' },
    { id:'d30-008', hindi:'तुम्हारी यह हिम्मत कैसे हुई ऐसा बोलने की!', english:'How dare you say something like that!', hint:'How dare you + verb!', type:'translation' },
    { id:'d30-009', hindi:'जब वह छोटा था, हर Sunday park जाता था।', english:'When he was young, he would go to the park every Sunday.', hint:'would + go + every Sunday (past habit)', type:'translation' },
    { id:'d30-010', hindi:'हम सभी को honest होना चाहिए।', english:'We all ought to be honest.', hint:'ought to + be honest', type:'translation' },
    { id:'d30-011', hindi:'क्या आप please इसे repeat करेंगे?', english:'Would you please repeat that?', hint:'Would you please + repeat?', type:'translation' },
    { id:'d30-012', hindi:'उसने अकेले stage पर जाने की हिम्मत दिखाई।', english:'He dared to go on stage alone.', hint:'dared to + go on stage', type:'translation' },
    { id:'d30-013', hindi:'तुम्हें deadline से पहले submit करना चाहिए।', english:'You ought to submit before the deadline.', hint:'ought to + submit + before deadline', type:'translation' },
    { id:'d30-014', hindi:'वह help करता अगर उसके पास time होता।', english:'He would help if he had time.', hint:'would + help + if had time', type:'translation' },
    { id:'d30-015', hindi:'क्या आप इस meeting में join होंगे?', english:'Would you join this meeting?', hint:'Would you + join?', type:'translation' },
    { id:'d30-016', hindi:'तुम्हें अपनी गलती स्वीकार करनी चाहिए।', english:'You ought to admit your mistake.', hint:'ought to + admit', type:'translation' },
    { id:'d30-017', hindi:'उसने अकेले उस बड़े company को challenge किया।', english:'He dared to challenge that big company alone.', hint:'dared to + challenge', type:'translation' },
    { id:'d30-018', hindi:'जब वह student था, हर रात notes बनाता था।', english:'When he was a student, he would make notes every night.', hint:'would + make notes (past habit)', type:'translation' },
    { id:'d30-019', hindi:'Employees को company rules follow करने चाहिए।', english:'Employees ought to follow company rules.', hint:'ought to + follow', type:'translation' },
    { id:'d30-020', hindi:'क्या तुम please यह document share करोगे?', english:'Would you please share this document?', hint:'Would you please + share?', type:'translation' },
    { id:'d30-021', hindi:'वह नया startup शुरू करने की हिम्मत रखती है।', english:'She dares to start a new startup.', hint:'dares to + start', type:'translation' },
    { id:'d30-022', hindi:'मैं help करता, अगर मेरे पास knowledge होती।', english:'I would help if I had the knowledge.', hint:'would + help + if had knowledge', type:'translation' },
    { id:'d30-023', hindi:'तुम्हें दूसरों के साथ politely बात करनी चाहिए।', english:'You ought to speak politely with others.', hint:'ought to + speak politely', type:'translation' },
    { id:'d30-024', hindi:'तुम्हारी यह हिम्मत कैसे हुई मुझे interrupt करने की!', english:'How dare you interrupt me!', hint:'How dare you + interrupt!', type:'translation' },
    { id:'d30-025', hindi:'बचपन में वह हर Sunday दादाजी के पास जाती थी।', english:'As a child, she would visit her grandfather every Sunday.', hint:'would + visit + every Sunday', type:'translation' },
    { id:'d30-026', hindi:'क्या आप कल available होंगे एक call के लिए?', english:'Would you be available for a call tomorrow?', hint:'Would you + be available?', type:'translation' },
    { id:'d30-027', hindi:'हमें अपने customers को best service देनी चाहिए।', english:'We ought to give our customers the best service.', hint:'ought to + give + best service', type:'translation' },
    { id:'d30-028', hindi:'उसने सबके सामने सच बोलने की हिम्मत की।', english:'He dared to speak the truth in front of everyone.', hint:'dared to + speak the truth', type:'translation' },
    { id:'d30-029', hindi:'क्या आप हमारे office visit करेंगे?', english:'Would you visit our office?', hint:'Would you + visit?', type:'translation' },
    { id:'d30-030', hindi:'तुम्हें अपने health का ख्याल रखना चाहिए।', english:'You ought to take care of your health.', hint:'ought to + take care of', type:'translation' },
  ],
};

// ============================================================
// Helper — Generate template questions for days 31-75
// Generates a large list of dynamic questions based on the topic type
// ============================================================
function generateQuestionsForDay(dayNum, topicTitle) {
  // Find the topic details by day number from the topics array
  const topic = DAYS_75_TOPICS.find(t => t.day === dayNum);
  // Get the type of the topic, or default to 'grammar'
  const type = topic ? topic.type : 'grammar';

  // We will build a list of questions in this array
  const list = [];

  // Lists of simple verbs for generator
  const verbs = [
    { en: 'learn', hi: 'सीखना', v2: 'learned', v3: 'learned', s: 'learns', ing: 'learning' },
    { en: 'speak', hi: 'बोलना', v2: 'spoke', v3: 'spoken', s: 'speaks', ing: 'speaking' },
    { en: 'write', hi: 'लिखना', v2: 'wrote', v3: 'written', s: 'writes', ing: 'writing' },
    { en: 'read', hi: 'पढ़ना', v2: 'read', v3: 'read', s: 'reads', ing: 'reading' },
    { en: 'work', hi: 'काम करना', v2: 'worked', v3: 'worked', s: 'works', ing: 'working' },
    { en: 'help', hi: 'मदद करना', v2: 'helped', v3: 'helped', s: 'helps', ing: 'helping' },
    { en: 'go', hi: 'जाना', v2: 'went', v3: 'gone', s: 'goes', ing: 'going' },
    { en: 'come', hi: 'आना', v2: 'came', v3: 'come', s: 'comes', ing: 'coming' },
    { en: 'eat', hi: 'खाना', v2: 'ate', v3: 'eaten', s: 'eats', ing: 'eating' },
    { en: 'drink', hi: 'पीना', v2: 'drank', v3: 'drunk', s: 'drinks', ing: 'drinking' },
  ];

  // Lists of simple nouns for generator
  const nouns = [
    { en: 'English', hi: 'अंग्रेज़ी' },
    { en: 'lessons', hi: 'पाठ' },
    { en: 'emails', hi: 'ईमेल' },
    { en: 'books', hi: 'किताबें' },
    { en: 'projects', hi: 'प्रोजेक्ट' },
  ];

  // Loop to generate 100 questions
  for (let i = 1; i <= 100; i++) {
    // Select verbs and nouns using modulo to repeat cleanly
    const v = verbs[i % verbs.length];
    const n = nouns[i % nouns.length];
    
    let question = {};

    // Check if the topic is Grammar
    if (type === 'grammar' || type === 'revision' || type === 'practice') {
      // Day 32-35: Tenses
      if (dayNum >= 32 && dayNum <= 35) {
        if (i % 3 === 0) {
          // Present Continuous
          question = {
            hindi: `मैं अभी ${n.hi} ${v.hi} रहा हूँ।`,
            english: `I am ${v.ing} ${n.en} right now.`,
            alternatives: [`i am ${v.ing} ${n.en.toLowerCase()} now.`],
            hint: 'Present Continuous Tense (Subject + am/is/are + verb-ing)',
            type: 'translation'
          };
        } else if (i % 3 === 1) {
          // Past Simple
          question = {
            hindi: `मैंने कल ${n.hi} ${v.hi}।`,
            english: `I ${v.v2} ${n.en} yesterday.`,
            alternatives: [`i ${v.v2} ${n.en.toLowerCase()} yesterday`],
            hint: 'Past Simple Tense (Subject + V2)',
            type: 'translation'
          };
        } else {
          // Future Simple
          question = {
            hindi: `मैं कल ${n.hi} ${v.hi}गा।`,
            english: `I will ${v.en} ${n.en} tomorrow.`,
            alternatives: [`i will ${v.en} ${n.en.toLowerCase()} tomorrow`],
            hint: 'Future Simple Tense (Subject + will + V1)',
            type: 'translation'
          };
        }
      }
      // Day 36-37: Prepositions
      else if (dayNum === 36 || dayNum === 37) {
        const preps = [
          { en: 'in the office', hi: 'ऑफ़िस में', hint: 'in' },
          { en: 'on the table', hi: 'मेज़ पर', hint: 'on' },
          { en: 'at the station', hi: 'स्टेशन पर', hint: 'at' },
          { en: 'under the chair', hi: 'कुर्सी के नीचे', hint: 'under' },
          { en: 'with my friend', hi: 'मेरे दोस्त के साथ', hint: 'with' },
        ];
        const p = preps[i % preps.length];
        question = {
          hindi: `मैं ${p.hi} हूँ।`,
          english: `I am ${p.en}.`,
          alternatives: [`i am ${p.en.toLowerCase()}`],
          hint: `Use preposition: ${p.hint}`,
          type: 'translation'
        };
      }
      // Day 38-39: Has to / Have to / Had to
      else if (dayNum === 38 || dayNum === 39) {
        if (i % 2 === 0) {
          question = {
            hindi: `मुझे ${n.hi} ${v.hi} पड़ता है।`,
            english: `I have to ${v.en} ${n.en}.`,
            alternatives: [`i have to ${v.en} ${n.en.toLowerCase()}`],
            hint: 'Obligation (have to + verb)',
            type: 'translation'
          };
        } else {
          question = {
            hindi: `मुझे ${n.hi} ${v.hi} पड़ा।`,
            english: `I had to ${v.en} ${n.en}.`,
            alternatives: [`i had to ${v.en} ${n.en.toLowerCase()}`],
            hint: 'Past Obligation (had to + verb)',
            type: 'translation'
          };
        }
      }
      // Day 49-50: Passive Voice
      else if (dayNum === 49 || dayNum === 50) {
        question = {
          hindi: `${n.hi} को ${v.hi} जाता है।`,
          english: `${n.en} is ${v.v3}.`,
          alternatives: [`${n.en.toLowerCase()} is ${v.v3}`],
          hint: 'Passive Voice (Object + is/are + V3)',
          type: 'translation'
        };
      }
      // General Grammar fallback
      else {
        question = {
          hindi: `मुझे ${topicTitle.toLowerCase()} का अभ्यास करना चाहिए।`,
          english: `I should practice ${topicTitle.toLowerCase()}.`,
          alternatives: [`i should practice ${topicTitle}`],
          hint: 'Practice sentence',
          type: 'translation'
        };
      }
    }
    // Check if the topic is Vocabulary (Days 53-68)
    else if (type === 'vocabulary') {
      question = {
        hindi: `शब्द "${v.en}" का हिंदी अर्थ क्या है?`,
        english: v.hi,
        alternatives: [v.hi],
        hint: `Word starts with ${v.hi[0]}`,
        type: 'translation'
      };
    }
    // Check if the topic is Writing (Days 69-73)
    else if (type === 'writing') {
      question = {
        hindi: `मुझे एक ${topicTitle.toLowerCase()} लिखना है।`,
        english: `I have to write a ${topicTitle.toLowerCase()}.`,
        alternatives: [`i must write a ${topicTitle.toLowerCase()}`],
        hint: 'Have to write',
        type: 'translation'
      };
    }
    // General fallback for other types
    else {
      question = {
        hindi: `मुझे ${topicTitle.toLowerCase()} समझ आ गया है।`,
        english: `I have understood ${topicTitle.toLowerCase()}.`,
        alternatives: [`i understood ${topicTitle.toLowerCase()}`],
        hint: 'Have understood',
        type: 'translation'
      };
    }

    // Assign unique id and add to list
    list.push({
      id: `d${String(dayNum).padStart(2, '0')}-${String(i).padStart(3, '0')}`,
      ...question
    });
  }

  // Return the array of 100 questions
  return list;
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
  13: DAYS_11_TO_75_QUESTIONS[13],
  14: DAYS_11_TO_75_QUESTIONS[14],
  15: DAYS_11_TO_75_QUESTIONS[15],
  16: DAYS_11_TO_75_QUESTIONS[16],
  17: DAYS_11_TO_75_QUESTIONS[17],
  18: DAYS_11_TO_75_QUESTIONS[18],
  19: DAYS_11_TO_75_QUESTIONS[19],
  20: DAYS_11_TO_75_QUESTIONS[20],
  21: DAYS_11_TO_75_QUESTIONS[21],
  22: DAYS_11_TO_75_QUESTIONS[22],
  23: DAYS_11_TO_75_QUESTIONS[23],
  24: DAYS_11_TO_75_QUESTIONS[24],
  25: DAYS_11_TO_75_QUESTIONS[25],
  26: DAYS_11_TO_75_QUESTIONS[26],
  27: DAYS_11_TO_75_QUESTIONS[27],
  28: DAYS_11_TO_75_QUESTIONS[28],
  29: DAYS_11_TO_75_QUESTIONS[29],
  30: DAYS_11_TO_75_QUESTIONS[30],
};

// Export total question count per day
export const QUESTIONS_PER_DAY_COUNT = Object.fromEntries(
  Object.entries(ALL_QUESTIONS).map(([day, qs]) => [day, qs.length])
);

// Retrieve questions for a day, falls back to dynamic generator for day > 30
export function getQuestionsForDay(dayNum) {
  if (ALL_QUESTIONS[dayNum]) return ALL_QUESTIONS[dayNum];
  // Find the topic details by day number from the topics array
  const topic = DAYS_75_TOPICS.find(t => t.day === dayNum);
  const title = topic ? topic.title : `Day ${dayNum} Topic`;
  // Generate template questions for other days dynamically
  return generateQuestionsForDay(dayNum, title);
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

// Total counts of static questions
export const TOTAL_QUESTIONS = Object.values(ALL_QUESTIONS).reduce((sum, qs) => sum + qs.length, 0);

export default getQuestionsForDay;

