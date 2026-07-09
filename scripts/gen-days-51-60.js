const fs = require('fs');
const path = require('path');

const DATA = {
  '51': {
    topic: 'Reported Speech Part 1 — Statements',
    formula: 'Subject + said (that) + subject + past tense verb (backshift tense one step back)',
    rule: [
      "Direct speech uses quotation marks; reported (indirect) speech reports what someone said without quotes",
      "Present simple becomes past simple; present continuous becomes past continuous; present perfect becomes past perfect",
      "Pronouns and time words often change (I -> he/she, today -> that day)",
      "'Said' is followed by an optional 'that'",
    ],
    pairs: [
      ['उसने कहा, "मैं थका हुआ हूँ।"', 'He said, "I am tired."'],
      ['उसने कहा कि वह थका हुआ था।', 'He said that he was tired.'],
      ['उसने कहा, "मैं स्कूल जाती हूँ।"', 'She said, "I go to school."'],
      ['उसने कहा कि वह स्कूल जाती थी।', 'She said that she went to school.'],
      ['उन्होंने कहा, "हम खुश हैं।"', 'They said, "We are happy."'],
      ['उन्होंने कहा कि वे खुश थे।', 'They said that they were happy.'],
      ['उसने कहा, "मैंने खाना खा लिया है।"', 'He said, "I have eaten food."'],
      ['उसने कहा कि उसने खाना खा लिया था।', 'He said that he had eaten food.'],
      ['उसने कहा, "मैं यह कर रहा हूँ।"', 'He said, "I am doing this."'],
      ['उसने कहा कि वह यह कर रहा था।', 'He said that he was doing this.'],
      ['उसने कहा, "मुझे यह पसंद है।"', 'She said, "I like this."'],
      ['उसने कहा कि उसे यह पसंद था।', 'She said that she liked this.'],
      ['मैंने कहा, "मैं आऊँगा।"', 'I said, "I will come."'],
      ['मैंने कहा कि मैं आऊँगा।', 'I said that I would come.'],
      ['उसने कहा, "यह सच है।"', 'He said, "This is true."'],
      ['उसने कहा कि यह सच था।', 'He said that this was true.'],
      ['उन्होंने कहा, "हमें मदद चाहिए।"', 'They said, "We need help."'],
      ['उन्होंने कहा कि उन्हें मदद चाहिए थी।', 'They said that they needed help.'],
      ['उसने कहा, "मैं यह समझता हूँ।"', 'He said, "I understand this."'],
      ['उसने कहा कि वह यह समझता था।', 'He said that he understood this.'],
    ],
  },
  '52': {
    topic: 'Reported Speech Part 2 — Questions & Commands',
    formula: "Asked + if/whether (yes/no) or WH word + subject + verb | Told/Ordered + object + to + base verb (commands)",
    rule: [
      "Reported yes/no questions use 'if' or 'whether' + normal word order (not question order)",
      "Reported WH questions keep the WH word but drop question order/question mark",
      "Reported commands use told/ordered/asked + object + to + base verb",
      "Negative commands use 'not to + base verb'",
    ],
    pairs: [
      ['उसने पूछा, "क्या तुम आ रहे हो?"', 'He asked, "Are you coming?"'],
      ['उसने पूछा कि क्या मैं आ रहा था।', 'He asked if I was coming.'],
      ['उसने पूछा, "तुम कहाँ रहते हो?"', 'She asked, "Where do you live?"'],
      ['उसने पूछा कि मैं कहाँ रहता था।', 'She asked where I lived.'],
      ['उसने कहा, "यह काम करो।"', 'He said, "Do this work."'],
      ['उसने मुझे यह काम करने को कहा।', 'He told me to do this work.'],
      ['उसने कहा, "यहाँ मत आओ।"', 'She said, "Do not come here."'],
      ['उसने मुझे यहाँ न आने को कहा।', 'She told me not to come here.'],
      ['उन्होंने पूछा, "क्या तुम तैयार हो?"', 'They asked, "Are you ready?"'],
      ['उन्होंने पूछा कि क्या मैं तैयार था।', 'They asked if I was ready.'],
      ['उसने पूछा, "तुम क्या कर रहे हो?"', 'He asked, "What are you doing?"'],
      ['उसने पूछा कि मैं क्या कर रहा था।', 'He asked what I was doing.'],
      ['टीचर ने कहा, "चुप रहो।"', 'The teacher said, "Be quiet."'],
      ['टीचर ने हमें चुप रहने को कहा।', 'The teacher told us to be quiet.'],
      ['उसने पूछा, "तुम कब आओगे?"', 'She asked, "When will you come?"'],
      ['उसने पूछा कि मैं कब आऊँगा।', 'She asked when I would come.'],
      ['डॉक्टर ने कहा, "दवा लो।"', 'The doctor said, "Take medicine."'],
      ['डॉक्टर ने मुझे दवा लेने को कहा।', 'The doctor told me to take medicine.'],
      ['उसने पूछा, "क्या तुम्हें मदद चाहिए?"', 'He asked, "Do you need help?"'],
      ['उसने पूछा कि क्या मुझे मदद चाहिए थी।', 'He asked if I needed help.'],
    ],
  },
  '53': {
    topic: 'Question Tags',
    formula: "Statement + comma + auxiliary verb (opposite polarity) + subject pronoun + ?",
    rule: [
      "Positive statement takes a negative tag; negative statement takes a positive tag",
      "Use the same auxiliary/verb tense as the main sentence",
      "'I am' uses tag 'aren't I?' as an exception",
      "Question tags are used to confirm information or invite agreement",
    ],
    pairs: [
      ['तुम आ रहे हो, है ना?', "You are coming, aren't you?"],
      ['वह नहीं आया, आया ना?', "He didn't come, did he?"],
      ['यह सुंदर है, है ना?', "This is beautiful, isn't it?"],
      ['तुम्हें यह पसंद नहीं है, है ना?', "You don't like this, do you?"],
      ['वह अच्छा गाता है, है ना?', "He sings well, doesn't he?"],
      ['हम मिलेंगे, ना?', "We will meet, won't we?"],
      ['तुमने यह किया, किया ना?', "You did this, didn't you?"],
      ['वह डॉक्टर है, है ना?', "She is a doctor, isn't she?"],
      ['तुम यह कर सकते हो, कर सकते हो ना?', "You can do this, can't you?"],
      ['उसे यह पसंद है, है ना?', "She likes this, doesn't she?"],
      ['तुम भूखे नहीं हो, हो ना?', "You are not hungry, are you?"],
      ['यह मुश्किल नहीं है, है ना?', "This is not difficult, is it?"],
      ['तुमने खाना खा लिया, लिया ना?', "You have eaten food, haven't you?"],
      ['वे आएंगे, आएंगे ना?', "They will come, won't they?"],
      ['मैं सही हूँ, हूँ ना?', "I am right, aren't I?"],
      ['यह तुमने नहीं किया, किया ना?', "You didn't do this, did you?"],
      ['वह वहाँ था, था ना?', "He was there, wasn't he?"],
      ['तुम स्कूल जाते हो, जाते हो ना?', "You go to school, don't you?"],
      ['वह जल्दी उठती है, उठती है ना?', "She wakes up early, doesn't she?"],
      ['हमें जल्दी जाना चाहिए, चाहिए ना?', "We should leave early, shouldn't we?"],
    ],
  },
  '54': {
    topic: 'Comparative & Superlative Adjectives',
    formula: "Comparative: adjective + er + than (or 'more' + adj + than) | Superlative: the + adjective + est (or 'the most' + adj)",
    rule: [
      "Short adjectives (1 syllable): add -er/-est (tall -> taller -> tallest)",
      "Long adjectives (2+ syllables): use more/most (beautiful -> more beautiful -> most beautiful)",
      "Irregular forms: good -> better -> best, bad -> worse -> worst",
      "Comparative compares two things; superlative compares three or more",
    ],
    pairs: [
      ['राम श्याम से लंबा है।', 'Ram is taller than Shyam.'],
      ['राम सबसे लंबा है।', 'Ram is the tallest.'],
      ['यह फिल्म उस फिल्म से बेहतर है।', 'This movie is better than that movie.'],
      ['यह सबसे अच्छी फिल्म है।', 'This is the best movie.'],
      ['यह किताब उससे ज्यादा दिलचस्प है।', 'This book is more interesting than that one.'],
      ['यह सबसे दिलचस्प किताब है।', 'This is the most interesting book.'],
      ['वह मुझसे तेज़ दौड़ता है।', 'He runs faster than me.'],
      ['वह सबसे तेज़ दौड़ता है।', 'He runs the fastest.'],
      ['आज का मौसम कल से खराब है।', "Today's weather is worse than yesterday's."],
      ['यह इस साल का सबसे खराब मौसम है।', "This is the worst weather this year."],
      ['यह कार उससे महंगी है।', 'This car is more expensive than that one.'],
      ['यह सबसे महंगी कार है।', 'This is the most expensive car.'],
      ['वह उससे छोटा है।', 'He is smaller than him.'],
      ['वह सबसे छोटा है।', 'He is the smallest.'],
      ['यह रास्ता उससे आसान है।', 'This way is easier than that one.'],
      ['यह सबसे आसान रास्ता है।', 'This is the easiest way.'],
      ['वह मुझसे ज़्यादा मेहनती है।', 'He is more hardworking than me.'],
      ['वह सबसे मेहनती है।', 'He is the most hardworking.'],
      ['यह समस्या उससे कठिन है।', 'This problem is harder than that one.'],
      ['यह सबसे कठिन समस्या है।', 'This is the hardest problem.'],
    ],
  },
  '55': {
    topic: 'Articles (A, An, The)',
    formula: "A/An + singular countable noun (unspecific) | The + noun (specific, already mentioned/known)",
    rule: [
      "Use 'a' before consonant sounds, 'an' before vowel sounds",
      "Use 'a/an' for first mention or general reference",
      "Use 'the' for specific things, previously mentioned things, or unique things",
      "No article before plural general nouns or abstract nouns in general statements",
    ],
    pairs: [
      ['मुझे एक किताब चाहिए।', 'I need a book.'],
      ['मुझे एक सेब चाहिए।', 'I need an apple.'],
      ['वह किताब मेज पर है।', 'The book is on the table.'],
      ['सूरज पूरब से निकलता है।', 'The sun rises in the east.'],
      ['मैंने एक कुत्ता देखा।', 'I saw a dog.'],
      ['वह कुत्ता बहुत प्यारा है।', 'The dog is very cute.'],
      ['यह एक अच्छी idea है।', 'This is a good idea.'],
      ['वह idea बहुत काम आई।', 'That idea worked well.'],
      ['मुझे एक umbrella चाहिए।', 'I need an umbrella.'],
      ['ताजमहल भारत में है।', 'The Taj Mahal is in India.'],
      ['वह एक teacher है।', 'She is a teacher.'],
      ['वह teacher बहुत अच्छी है।', 'The teacher is very good.'],
      ['मैंने एक hour इंतज़ार किया।', 'I waited for an hour.'],
      ['गंगा नदी बहुत पवित्र है।', 'The Ganges river is very sacred.'],
      ['उसने एक कार खरीदी।', 'He bought a car.'],
      ['वह कार लाल है।', 'The car is red.'],
      ['मुझे एक honest दोस्त चाहिए।', 'I need an honest friend.'],
      ['हिमालय पहाड़ बहुत ऊँचे हैं।', 'The Himalayas are very high.'],
      ['यह एक अच्छा मौका है।', 'This is a good opportunity.'],
      ['वह मौका फिर नहीं आएगा।', 'That opportunity will not come again.'],
    ],
  },
  '56': {
    topic: 'If Clauses / Conditionals Part 1 — Zero & First Conditional',
    formula: "Zero: If + present simple, present simple (general truth) | First: If + present simple, will + base verb (real future possibility)",
    rule: [
      "Zero conditional describes general facts/scientific truths that are always true",
      "First conditional describes a real, likely future situation and its result",
      "Both clauses can switch order without changing meaning (comma only needed when 'if' clause comes first)",
      "Do not use 'will' in the if-clause",
    ],
    pairs: [
      ['अगर पानी 100 डिग्री तक गर्म होता है, तो वह उबलता है।', 'If water heats to 100 degrees, it boils.'],
      ['अगर तुम बर्फ को गर्म करते हो, तो वह पिघल जाती है।', 'If you heat ice, it melts.'],
      ['अगर मुझे समय मिला, तो मैं आऊँगा।', 'If I get time, I will come.'],
      ['अगर बारिश हुई, तो हम घर पर रहेंगे।', 'If it rains, we will stay home.'],
      ['अगर तुम मेहनत करोगे, तो सफल होगे।', 'If you work hard, you will succeed.'],
      ['अगर वह जल्दी आया, तो हम शुरू करेंगे।', 'If he comes early, we will start.'],
      ['अगर सूरज निकलता है, तो दिन गर्म होता है।', 'If the sun comes out, the day is warm.'],
      ['अगर तुम यह खाओगे, तो तुम्हें अच्छा लगेगा।', 'If you eat this, you will feel good.'],
      ['अगर तुम्हें मदद चाहिए, तो मुझे बताओ।', 'If you need help, tell me.'],
      ['अगर वह नहीं आया, तो हम शुरू करेंगे।', "If he doesn't come, we will start."],
      ['अगर तुम गर्मी में बाहर जाते हो, तो पसीना आता है।', 'If you go out in summer, you sweat.'],
      ['अगर मैं यह exam पास करूँ, तो मैं खुश होऊँगा।', 'If I pass this exam, I will be happy.'],
      ['अगर पानी नहीं मिलेगा, तो पौधे मर जाएंगे।', "If plants don't get water, they die."],
      ['अगर तुम जल्दी सोओगे, तो जल्दी उठोगे।', 'If you sleep early, you will wake up early.'],
      ['अगर तुम्हें यह नहीं समझ आया, तो पूछो।', "If you don't understand this, ask."],
      ['अगर धूप निकलती है, तो बर्फ पिघलती है।', 'If the sun comes out, snow melts.'],
      ['अगर तुम यह करोगे, तो मैं खुश होऊँगा।', 'If you do this, I will be happy.'],
      ['अगर बिजली चली जाती है, तो कमरा अंधेरा हो जाता है।', 'If the electricity goes off, the room becomes dark.'],
      ['अगर तुम practice करोगे, तो बेहतर बनोगे।', 'If you practice, you will get better.'],
      ['अगर मुझे मौका मिला, तो मैं विदेश जाऊँगा।', 'If I get a chance, I will go abroad.'],
    ],
  },
  '57': {
    topic: 'If Clauses / Conditionals Part 2 — Second & Third Conditional',
    formula: "Second: If + past simple, would + base verb (unreal present/future) | Third: If + past perfect, would have + V3 (unreal past)",
    rule: [
      "Second conditional talks about imaginary/hypothetical present or future situations",
      "Third conditional talks about imaginary past situations that did not actually happen — often regret",
      "Use 'were' instead of 'was' in formal second conditional (If I were you...)",
      "Never use 'would' inside the if-clause",
    ],
    pairs: [
      ['अगर मेरे पास पैसे होते, तो मैं यह घर खरीदता।', 'If I had money, I would buy this house.'],
      ['अगर मैं तुम होता, तो मैं यह नहीं करता।', 'If I were you, I would not do this.'],
      ['अगर उसे पता होता, तो वह आती।', 'If she knew, she would come.'],
      ['अगर मुझे समय मिलता, तो मैं travel करता।', 'If I had time, I would travel.'],
      ['अगर मैंने मेहनत की होती, तो मैं पास हो जाता।', 'If I had worked hard, I would have passed.'],
      ['अगर तुमने मुझे बताया होता, तो मैं मदद करता।', 'If you had told me, I would have helped.'],
      ['अगर वह जल्दी आया होता, तो हम मिल पाते।', 'If he had come early, we would have met.'],
      ['अगर मुझे गलती पता होती, तो मैं इसे सुधार देता।', 'If I had known the mistake, I would have corrected it.'],
      ['अगर मौसम अच्छा होता, तो हम बाहर जाते।', 'If the weather were good, we would go out.'],
      ['अगर उसने मुझसे पूछा होता, तो मैं बता देता।', 'If he had asked me, I would have told him.'],
      ['अगर मेरे पास कार होती, तो मैं रोज ऑफिस जाता।', 'If I had a car, I would go to office every day.'],
      ['अगर हमने पहले शुरू किया होता, तो हम खत्म कर लेते।', 'If we had started earlier, we would have finished.'],
      ['अगर तुम खुश होते, तो मैं भी खुश होता।', 'If you were happy, I would be happy too.'],
      ['अगर उसने ध्यान दिया होता, तो यह गलती नहीं होती।', 'If he had paid attention, this mistake would not have happened.'],
      ['अगर मैं pilot होता, तो मैं दुनिया घूमता।', 'If I were a pilot, I would travel the world.'],
      ['अगर उसने मुझे फोन किया होता, तो मैं आ जाता।', 'If he had called me, I would have come.'],
      ['अगर तुम मेरी जगह होते, तो क्या करते?', 'If you were in my place, what would you do?'],
      ['अगर मुझे यह मौका पहले मिला होता, तो मैं ले लेता।', 'If I had gotten this chance earlier, I would have taken it.'],
      ['अगर वह ईमानदार होता, तो मैं उस पर भरोसा करता।', 'If he were honest, I would trust him.'],
      ['अगर हमने योजना बनाई होती, तो यह समस्या न होती।', 'If we had planned, this problem would not have happened.'],
    ],
  },
  '58': {
    topic: 'Since / For (Time Expressions with Perfect Tenses)',
    formula: "Have/Has/Had + been + V-ing/V3 + for + duration | ... + since + starting point",
    rule: [
      "'For' is used with a duration/period of time (for two years, for a week)",
      "'Since' is used with a starting point in time (since 2020, since Monday)",
      "Both are commonly used with perfect and perfect continuous tenses",
      "Common mistake: using 'from' instead of 'since'",
    ],
    pairs: [
      ['मैं दो साल से यहाँ रह रहा हूँ।', 'I have been living here for two years.'],
      ['मैं 2020 से यहाँ रह रहा हूँ।', 'I have been living here since 2020.'],
      ['वह तीन घंटे से पढ़ रही है।', 'She has been studying for three hours.'],
      ['वह सुबह से पढ़ रही है।', 'She has been studying since morning.'],
      ['हम पाँच साल से दोस्त हैं।', 'We have been friends for five years.'],
      ['हम कॉलेज के समय से दोस्त हैं।', 'We have been friends since college.'],
      ['उसने एक हफ्ते से यह काम नहीं किया।', 'He has not done this work for a week.'],
      ['उसने सोमवार से यह काम नहीं किया।', 'He has not done this work since Monday.'],
      ['मुझे दस साल से यह जानकारी है।', 'I have known this for ten years.'],
      ['मुझे 2015 से यह जानकारी है।', 'I have known this since 2015.'],
      ['वह दो महीने से बीमार है।', 'He has been sick for two months.'],
      ['वह अपने जन्मदिन से बीमार है।', 'He has been sick since his birthday.'],
      ['वे तीन साल से इस घर में हैं।', 'They have been in this house for three years.'],
      ['वे शादी के बाद से इस घर में हैं।', 'They have been in this house since their marriage.'],
      ['मैं एक घंटे से इंतज़ार कर रहा हूँ।', 'I have been waiting for an hour.'],
      ['मैं दोपहर से इंतज़ार कर रहा हूँ।', 'I have been waiting since noon.'],
      ['उसने चार साल से यह नौकरी की है।', 'She has done this job for four years.'],
      ['उसने 2021 से यह नौकरी की है।', 'She has done this job since 2021.'],
      ['हम दो हफ्ते से practice कर रहे हैं।', 'We have been practicing for two weeks.'],
      ['हम शुरुआत से practice कर रहे हैं।', 'We have been practicing since the beginning.'],
    ],
  },
  '59': {
    topic: 'Wish / If Only (Expressing Regret and Desire)',
    formula: "Wish/If only + subject + past simple (present regret) | Wish/If only + subject + past perfect (past regret)",
    rule: [
      "'Wish/If only' + past simple expresses a wish about present unreal situations",
      "'Wish/If only' + past perfect expresses regret about past events (things that didn't happen)",
      "'Wish/If only' + would + base verb expresses wanting someone else to change behavior",
      "'If only' is stronger/more emotional than 'wish'",
    ],
    pairs: [
      ['मुझे काश मेरे पास ज़्यादा पैसे होते।', 'I wish I had more money.'],
      ['काश मेरे पास ज़्यादा पैसे होते।', 'If only I had more money.'],
      ['मुझे काश मैं वहाँ होता।', 'I wish I were there.'],
      ['काश मैंने पहले पढ़ाई की होती।', 'If only I had studied earlier.'],
      ['मुझे काश मैंने यह गलती नहीं की होती।', 'I wish I had not made this mistake.'],
      ['काश तुम शांत हो जाओ।', 'I wish you would calm down.'],
      ['मुझे काश मैं उड़ सकता।', 'I wish I could fly.'],
      ['काश मौसम अच्छा होता।', 'If only the weather were good.'],
      ['मुझे काश मैंने उससे बात की होती।', 'I wish I had talked to him.'],
      ['काश मुझे यह पहले पता होता।', 'If only I had known this earlier.'],
      ['मुझे काश मेरे पास ज़्यादा समय होता।', 'I wish I had more time.'],
      ['काश तुम मुझे सुनो।', 'I wish you would listen to me.'],
      ['मुझे काश मैं यह decision न लेता।', 'I wish I had not taken this decision.'],
      ['काश हम फिर से मिल पाते।', 'If only we could meet again.'],
      ['मुझे काश मैं और मेहनत करता।', 'I wish I worked harder.'],
      ['काश उसने मुझे माफ़ कर दिया होता।', 'If only he had forgiven me.'],
      ['मुझे काश मैं यह भाषा जानता।', 'I wish I knew this language.'],
      ['काश तुम धीरे बोलो।', 'I wish you would speak slowly.'],
      ['मुझे काश मैंने वह मौका लिया होता।', 'I wish I had taken that opportunity.'],
      ['काश हम वहाँ न जाते।', 'If only we had not gone there.'],
    ],
  },
  '60': {
    topic: 'Revision of Days 51-59',
    formula: 'Mixed revision: Reported Speech, Question Tags, Comparatives/Superlatives, Articles, Conditionals, Since/For, Wish/If Only',
    rule: [
      'Reported speech backshifts tense; question tags use opposite polarity',
      'Comparatives/superlatives change form based on adjective length',
      'Articles depend on specificity and sound; conditionals depend on real vs unreal situations',
      "'Since' + starting point, 'for' + duration; 'wish/if only' express regret",
    ],
    pairs: [
      ['उसने कहा कि वह थका हुआ था।', 'He said that he was tired.'],
      ['उसने पूछा कि मैं कहाँ रहता था।', 'She asked where I lived.'],
      ['तुम आ रहे हो, है ना?', "You are coming, aren't you?"],
      ['राम सबसे लंबा है।', 'Ram is the tallest.'],
      ['यह सबसे दिलचस्प किताब है।', 'This is the most interesting book.'],
      ['मुझे एक किताब चाहिए।', 'I need a book.'],
      ['सूरज पूरब से निकलता है।', 'The sun rises in the east.'],
      ['अगर तुम मेहनत करोगे, तो सफल होगे।', 'If you work hard, you will succeed.'],
      ['अगर मेरे पास पैसे होते, तो मैं यह घर खरीदता।', 'If I had money, I would buy this house.'],
      ['अगर मैंने मेहनत की होती, तो मैं पास हो जाता।', 'If I had worked hard, I would have passed.'],
      ['मैं दो साल से यहाँ रह रहा हूँ।', 'I have been living here for two years.'],
      ['मैं 2020 से यहाँ रह रहा हूँ।', 'I have been living here since 2020.'],
      ['मुझे काश मेरे पास ज़्यादा पैसे होते।', 'I wish I had more money.'],
      ['काश मैंने पहले पढ़ाई की होती।', 'If only I had studied earlier.'],
      ['उसने मुझे यह काम करने को कहा।', 'He told me to do this work.'],
      ['वह अच्छा गाता है, है ना?', "He sings well, doesn't he?"],
      ['यह फिल्म उस फिल्म से बेहतर है।', 'This movie is better than that movie.'],
      ['वह teacher बहुत अच्छी है।', 'The teacher is very good.'],
      ['अगर वह जल्दी आया, तो हम शुरू करेंगे।', 'If he comes early, we will start.'],
      ['मुझे काश मैं यह भाषा जानता।', 'I wish I knew this language.'],
    ],
  },
};

function shuffleOptions(correct, sourceArr, seedIdx, isWord) {
  const opts = new Set([correct]);
  let i = seedIdx, guard = 0;
  while (opts.size < 4 && guard < 200) {
    guard++;
    const cand = sourceArr[(i + guard * 7) % sourceArr.length];
    const val = isWord ? cand.split(' ')[Math.min(3, cand.split(' ').length - 1)].replace(/[.,!?]/g, '') : cand;
    if (val && val !== correct) opts.add(val);
  }
  return shuffleArray(Array.from(opts));
}
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = (i * 31 + 7) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function blankOut(sentence) {
  const words = sentence.split(' ');
  let idx = Math.floor(words.length / 2);
  let word = words[idx].replace(/[.,!?]/g, '');
  if (!word) { idx = 1; word = words[1] ? words[1].replace(/[.,!?]/g, '') : words[0]; }
  return { blanked: words.map((w, i) => (i === idx ? '_____' : w)).join(' '), answer: word };
}
function makeErrorVersion(sentence) {
  const swaps = [[/\bis\b/, 'are'], [/\bare\b/, 'is'], [/\bwas\b/, 'were'], [/\bwere\b/, 'was'], [/\bwould\b/, 'will'], [/\bhad\b/, 'has'], [/\bhave\b/, 'has'], [/\bhas\b/, 'have']];
  for (const [re, rep] of swaps) if (re.test(sentence)) return sentence.replace(re, rep);
  return sentence.replace(/\.$/, '') + ' yesterday.';
}

const META = {
  '51': { emoji: '🗣️', color: '#3b82f6' }, '52': { emoji: '❔', color: '#f97316' },
  '53': { emoji: '🏷️', color: '#8b5cf6' }, '54': { emoji: '📊', color: '#06b6d4' },
  '55': { emoji: '🔤', color: '#ec4899' }, '56': { emoji: '🌱', color: '#22c55e' },
  '57': { emoji: '💭', color: '#eab308' }, '58': { emoji: '⏳', color: '#0ea5e9' },
  '59': { emoji: '🌠', color: '#ef4444' }, '60': { emoji: '🔁', color: '#64748b' },
};

for (const [dd, cfg] of Object.entries(DATA)) {
  const dir = path.join('data', 'challenge', `day-${dd}`);
  const pool = cfg.pairs.map(([hindi, english]) => ({ hindi, english }));
  const prev = parseInt(dd, 10) - 1;
  const next = parseInt(dd, 10) + 1;

  const lessonSections = [
    { id: 1, title: `${cfg.topic} — Introduction and Formula`, hindiTitle: `${cfg.topic} — परिचय और फॉर्मूला`, explanation: `${cfg.topic} is an essential building block of English grammar. Formula: ${cfg.formula}. Rules: ${cfg.rule.join(' | ')}`, formula: cfg.formula, examples: pool.slice(0, 6) },
    { id: 2, title: `${cfg.topic} — Daily Life Usage`, hindiTitle: `${cfg.topic} — रोज़मर्रा के उपयोग`, explanation: `Everyday sentences using ${cfg.topic} for daily conversation.`, formula: cfg.formula, examples: pool.slice(6, 12) },
    { id: 3, title: `${cfg.topic} — Office & Professional Usage`, hindiTitle: `${cfg.topic} — ऑफिस और पेशेवर उपयोग`, explanation: `Practice ${cfg.topic} in professional and office contexts.`, formula: cfg.formula, examples: pool.slice(12, 16) },
    { id: 4, title: `${cfg.topic} — Negative and Question Forms`, hindiTitle: `${cfg.topic} — नकारात्मक और प्रश्न रूप`, explanation: `How to make negative sentences and questions using ${cfg.topic}. Common mistakes are highlighted here.`, formula: cfg.formula, examples: pool.slice(16, 20) },
  ];
  fs.writeFileSync(path.join(dir, 'lessons.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, sections: lessonSections }, null, 2) + '\n');

  const vocabWords = pool.map((p, i) => {
    const engWords = p.english.replace(/[.,!?]/g, '').split(' ');
    const key = engWords[engWords.length - 1];
    return { id: i + 1, word: key.toLowerCase(), hindi: p.hindi.split(' ').slice(-2).join(' '), simpleMeaning: `Used in: "${p.english}"`, ipa: '', sentences: { daily: p.english, office: p.english, interview: p.english }, usageNote: `Appears with ${cfg.topic}`, cefrLevel: 'B1' };
  });
  fs.writeFileSync(path.join(dir, 'vocabulary.json'), JSON.stringify({ day: parseInt(dd, 10), title: cfg.topic, totalWords: vocabWords.length, words: vocabWords }, null, 2) + '\n');

  const practiceQs = pool.map((p, i) => ({ id: i + 1, hindi: p.hindi, english: p.english, alternatives: [], hint: `Use the pattern: ${cfg.formula}`, explanation: `Correct sentence: "${p.english}"`, difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard', tags: [cfg.topic.toLowerCase().split(' ')[0]], grammarRule: cfg.topic, category: `${cfg.topic} practice` }));
  fs.writeFileSync(path.join(dir, 'practice-questions.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalQuestions: practiceQs.length, questions: practiceQs }, null, 2) + '\n');

  const testQs = []; let qid = 1;
  pool.forEach((p, i) => {
    const type = i % 3 === 0 ? 'translate' : i % 3 === 1 ? 'fill' : 'error';
    if (type === 'translate') testQs.push({ id: qid++, type: 'translate', hindi: p.hindi, options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english, explanation: `Correct translation: "${p.hindi}" = "${p.english}"` });
    else if (type === 'fill') { const { blanked, answer } = blankOut(p.english); testQs.push({ id: qid++, type: 'fill', sentence: blanked, options: shuffleOptions(answer, pool.map((x) => x.english), i, true), answer, explanation: `Full sentence: "${p.english}"` }); }
    else { const wrong = makeErrorVersion(p.english); testQs.push({ id: qid++, type: 'error', sentence: wrong, options: [wrong, p.english], answer: p.english, explanation: `Correct sentence: "${p.english}"` }); }
  });
  fs.writeFileSync(path.join(dir, 'daily-test.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalQuestions: testQs.length, questions: testQs }, null, 2) + '\n');

  const drills = [];
  for (let i = 0; i < pool.length; i += 3) { const chunk = pool.slice(i, i + 3); if (!chunk.length) break; drills.push({ id: drills.length + 1, type: 'repeat-and-speak', title: `${cfg.topic} — Speaking Set ${drills.length + 1}`, sentences: chunk.map((p) => ({ english: p.english, hindi: p.hindi, pronunciation: p.english.toLowerCase().replace(/[.,!?]/g, '') })) }); }
  fs.writeFileSync(path.join(dir, 'speaking-drill.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalDrills: drills.length, drills }, null, 2) + '\n');

  const writingTasks = [
    { id: 1, type: 'sentence-writing', prompt: `Write 5 original English sentences using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए 5 नए वाक्य लिखिए।`, sampleAnswer: pool.slice(0, 5).map((p) => p.english).join(' '), wordLimit: 60 },
    { id: 2, type: 'paragraph-writing', prompt: `Write a short paragraph (5-6 lines) using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए एक छोटा पैराग्राफ लिखिए।`, sampleAnswer: pool.slice(5, 10).map((p) => p.english).join(' '), wordLimit: 80 },
    { id: 3, type: 'translation', prompt: `Translate into English: "${pool[10].hindi}"`, hindiPrompt: 'नीचे दिए गए वाक्य का अंग्रेज़ी अनुवाद करें।', sampleAnswer: pool[10].english, wordLimit: 20 },
    { id: 4, type: 'correction', prompt: `Correct this sentence: "${makeErrorVersion(pool[3].english)}"`, hindiPrompt: 'इस वाक्य में गलती ठीक कीजिए।', sampleAnswer: pool[3].english, wordLimit: 20 },
    { id: 5, type: 'dialogue-writing', prompt: `Write a short 4-line dialogue using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए एक संवाद लिखिए।`, sampleAnswer: pool.slice(12, 16).map((p) => p.english).join(' '), wordLimit: 60 },
  ];
  fs.writeFileSync(path.join(dir, 'writing-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, tasks: writingTasks }, null, 2) + '\n');

  const readingQs = pool.slice(0, 8).map((p, i) => ({ id: i + 1, question: `What does the passage say about: "${p.english.split(' ').slice(0, 4).join(' ')}..."?`, options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english, explanation: `Stated in the passage: "${p.english}"` }));
  fs.writeFileSync(path.join(dir, 'reading-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, passage: { title: `A Day with ${cfg.topic}`, text: pool.slice(0, 10).map((p) => p.english).join(' '), hindiTranslation: pool.slice(0, 10).map((p) => p.hindi).join(' ') }, comprehensionQuestions: readingQs }, null, 2) + '\n');

  const listenPool = pool.slice(10, 18).length >= 6 ? pool.slice(10, 18) : pool.slice(0, 10);
  const listenExercises = listenPool.slice(0, 8).map((p, i) => ({ id: i + 1, audioScript: p.english, hindiScript: p.hindi, question: 'What did you hear? Choose the correct sentence.', options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english }));
  fs.writeFileSync(path.join(dir, 'listening-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, exercises: listenExercises, dictationPassage: { text: listenPool.slice(0, 5).map((p) => p.english).join(' '), hindiTranslation: listenPool.slice(0, 5).map((p) => p.hindi).join(' ') } }, null, 2) + '\n');

  const quickQuiz = pool.slice(0, 10).map((p, i) => ({ id: i + 1, hindi: p.hindi, answer: p.english }));
  fs.writeFileSync(path.join(dir, 'revision.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, keyPointsSummary: cfg.rule, quickQuiz, mustRememberRules: cfg.rule.slice(0, 4) }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'milestones.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, milestones: [
    { id: 1, title: 'Lesson Completed', description: `Finished all lessons on ${cfg.topic}.`, xp: 20, badge: 'lesson-complete' },
    { id: 2, title: 'Vocabulary Mastered', description: `Learned new words related to ${cfg.topic}.`, xp: 15, badge: 'vocab-master' },
    { id: 3, title: 'Practice Champion', description: `Completed all practice questions for Day ${parseInt(dd, 10)}.`, xp: 25, badge: 'practice-champion' },
    { id: 4, title: 'Test Passed', description: `Scored well on the Day ${parseInt(dd, 10)} test.`, xp: 30, badge: 'test-passed' },
    { id: 5, title: 'Speaking Practiced', description: `Completed speaking drills for ${cfg.topic}.`, xp: 20, badge: 'speaking-star' },
  ] }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'morning-routine.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, steps: [
    { id: 1, title: 'Warm-up Reading', description: "Read yesterday's revision notes for 5 minutes.", duration: 5 },
    { id: 2, title: `Today's Topic: ${cfg.topic}`, description: `Read through all lesson sections on ${cfg.topic}.`, duration: 15 },
    { id: 3, title: 'Vocabulary Practice', description: "Learn and repeat today's new vocabulary words aloud.", duration: 10 },
    { id: 4, title: 'Practice Questions', description: `Solve today's practice questions on ${cfg.topic}.`, duration: 15 },
    { id: 5, title: 'Speaking Drill', description: "Speak today's example sentences aloud 3 times each.", duration: 10 },
  ] }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'challenge.json'), JSON.stringify({
    day: parseInt(dd, 10), topic: cfg.topic,
    challengeTask: `Use at least 10 sentences with ${cfg.topic} in a real conversation or diary entry today.`,
    hindiTask: `आज ${cfg.topic} का उपयोग करते हुए कम से कम 10 वाक्य किसी असली बातचीत या डायरी में लिखें।`,
    successCriteria: ['All 10 sentences are grammatically correct', `${cfg.topic} rule applied correctly in every sentence`, 'No spelling mistakes'],
    bonusChallenge: 'Record yourself speaking 5 of these sentences and check your pronunciation.',
    xpReward: 50,
  }, null, 2) + '\n');

  const m = META[dd];
  const meta = { day: parseInt(dd, 10), title: cfg.topic, slug: `${dd}-${cfg.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`, type: 'grammar', difficulty: 'intermediate', cefr: 'B1', emoji: m.emoji, color: m.color, topics: [cfg.topic], totalQuestions: pool.length, totalVocabulary: pool.length, estimatedTime: '2-3 hours', xpReward: 200, coinsReward: 30, prerequisites: [prev], nextDay: next, tags: ['grammar', cfg.topic.toLowerCase()], lastUpdated: '2026-07-09', version: '1.0' };
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

  const overview = { day: parseInt(dd, 10), title: cfg.topic, tagline: `${cfg.topic} को सही तरीके से समझें और बोलें।`, summary: `${cfg.topic} का सही उपयोग आपकी English को ज़्यादा natural और fluent बनाता है। Formula: ${cfg.formula}`, hindiSummary: `आज आप ${cfg.topic} का सही उपयोग सीखेंगे — कब और कैसे इसे बोलचाल और लेखन में use करना है।`, whatYouWillLearn: [`${cfg.topic} की सही formula और structure`, `${cfg.topic} के साथ positive, negative और question sentences`, `${cfg.topic} का daily life और office में उपयोग`, 'Common mistakes जो लोग यहां करते हैं'] };
  fs.writeFileSync(path.join(dir, 'overview.json'), JSON.stringify(overview, null, 2) + '\n');

  console.log(`day-${dd}: wrote all 14 files (pool size ${pool.length})`);
}
