// ============================================================
// Vocabulary Data Library — 75 Days Hard English
// Comprehensive real vocabulary organized by category and level
// Every word has: word, hindi, pronunciation, example, level
// ============================================================

import { generateVocabularyForDay } from './generatedDayContent';

// ── Category Metadata ────────────────────────────────────────
export const VOCAB_CATEGORIES_META = [
  { id:'daily-life',    label:'Daily Life',        emoji:'🏠', color:'from-indigo-500 to-blue-500',   level:'A0-A1', count:120 },
  { id:'family',        label:'Family & Relations', emoji:'👨‍👩‍👧', color:'from-pink-500 to-rose-500',    level:'A0',    count:60  },
  { id:'food-drinks',   label:'Food & Drinks',      emoji:'🍛', color:'from-amber-500 to-orange-500', level:'A1',    count:80  },
  { id:'weather',       label:'Weather & Nature',   emoji:'🌦️', color:'from-cyan-500 to-sky-500',     level:'A1',    count:50  },
  { id:'body-health',   label:'Body & Health',      emoji:'🏥', color:'from-red-500 to-rose-500',     level:'A1-A2', count:70  },
  { id:'clothing',      label:'Clothing & Fashion', emoji:'👗', color:'from-purple-500 to-violet-500',level:'A1',    count:50  },
  { id:'travel',        label:'Travel & Transport',  emoji:'✈️', color:'from-sky-500 to-blue-500',     level:'A2',    count:80  },
  { id:'office',        label:'Office & Business',   emoji:'💼', color:'from-teal-500 to-emerald-500', level:'B1',    count:90  },
  { id:'technology',    label:'Technology & IT',     emoji:'💻', color:'from-violet-500 to-purple-500',level:'B1',    count:70  },
  { id:'emotions',      label:'Emotions & Feelings', emoji:'❤️', color:'from-rose-500 to-pink-500',    level:'A2',    count:60  },
  { id:'personality',   label:'Personality Traits',  emoji:'🧠', color:'from-emerald-500 to-teal-500', level:'B1',    count:50  },
  { id:'education',     label:'Education & Learning',emoji:'📚', color:'from-blue-500 to-indigo-500',  level:'A2',    count:60  },
  { id:'idioms',        label:'Idioms & Phrases',    emoji:'💬', color:'from-amber-500 to-yellow-500', level:'B2',    count:100 },
  { id:'phrasal-verbs', label:'Phrasal Verbs',       emoji:'🔀', color:'from-orange-500 to-red-500',   level:'B1',    count:80  },
  { id:'professional',  label:'Professional English', emoji:'🏆', color:'from-slate-500 to-gray-500',  level:'B2',    count:90  },
  { id:'synonyms',      label:'Synonyms & Antonyms', emoji:'🔤', color:'from-green-500 to-emerald-500',level:'B1',    count:80  },
];

// ── Daily Life Vocabulary ─────────────────────────────────────
export const DAILY_LIFE = [
  { word:'Wake up',      hindi:'जागना',            pronunciation:'weyk up',       example:'I wake up at 6 AM every day.',         level:'A0' },
  { word:'Brush teeth',  hindi:'दांत साफ करना',    pronunciation:'bruhsh teeth',  example:'Always brush your teeth before bed.',  level:'A0' },
  { word:'Bath',         hindi:'नहाना',             pronunciation:'baath',         example:'I take a bath every morning.',         level:'A0' },
  { word:'Breakfast',    hindi:'नाश्ता',            pronunciation:'brekfuhst',     example:'Breakfast is the most important meal.',level:'A0' },
  { word:'Commute',      hindi:'आना-जाना',          pronunciation:'kuh-myoot',     example:'My daily commute takes 45 minutes.',   level:'A2' },
  { word:'Routine',      hindi:'दिनचर्या',          pronunciation:'roo-teen',      example:'Having a routine helps you stay healthy.',level:'A2' },
  { word:'Grocery',      hindi:'किराने का सामान',   pronunciation:'groh-suh-ree',  example:'I buy groceries every Saturday.',      level:'A1' },
  { word:'Laundry',      hindi:'कपड़े धोना',        pronunciation:'lawn-dree',     example:'I do laundry on Sundays.',             level:'A1' },
  { word:'Chores',       hindi:'घर के काम',         pronunciation:'chorz',         example:'We share household chores equally.',   level:'A2' },
  { word:'Budget',       hindi:'बजट',               pronunciation:'buj-it',        example:'I manage my monthly budget carefully.',level:'A2' },
  { word:'Appointment',  hindi:'अपॉइंटमेंट',        pronunciation:'uh-point-muhnt',example:'I have a doctor appointment at 3.',    level:'A2' },
  { word:'Neighbour',    hindi:'पड़ोसी',             pronunciation:'nay-ber',       example:'My neighbour is very friendly.',       level:'A1' },
  { word:'Landlord',     hindi:'मकान मालिक',        pronunciation:'land-lord',     example:'The landlord increased the rent.',     level:'A2' },
  { word:'Utility bills',hindi:'बिजली-पानी के बिल', pronunciation:'yoo-til-uh-tee', example:'Pay your utility bills on time.',     level:'A2' },
  { word:'Suburb',       hindi:'शहर का बाहरी इलाका',pronunciation:'sub-erb',       example:'We live in a quiet suburb.',           level:'B1' },
];

// ── Family & Relations ────────────────────────────────────────
export const FAMILY_VOCAB = [
  { word:'Grandmother',  hindi:'दादी/नानी',         pronunciation:'gran-muhth-er', example:'My grandmother makes amazing food.',   level:'A0' },
  { word:'Grandfather',  hindi:'दादा/नाना',         pronunciation:'gran-faa-ther', example:'My grandfather tells great stories.',  level:'A0' },
  { word:'Sibling',      hindi:'भाई या बहन',        pronunciation:'sib-ling',      example:'I have two siblings.',                 level:'A1' },
  { word:'Cousin',       hindi:'चचेरा/ममेरा भाई-बहन',pronunciation:'kuz-in',       example:'My cousins visit every Diwali.',       level:'A1' },
  { word:'Nephew',       hindi:'भतीजा/भांजा',       pronunciation:'nef-yoo',       example:'My nephew is five years old.',         level:'A1' },
  { word:'Niece',        hindi:'भतीजी/भांजी',       pronunciation:'nees',          example:'I bought a gift for my niece.',        level:'A1' },
  { word:'In-laws',      hindi:'ससुराल वाले',       pronunciation:'in-lawz',       example:'My in-laws are very supportive.',      level:'A2' },
  { word:'Spouse',       hindi:'पति/पत्नी',         pronunciation:'spowz',         example:'My spouse supports all my decisions.',  level:'A2' },
  { word:'Ancestor',     hindi:'पूर्वज',            pronunciation:'an-ses-ter',    example:'We honor our ancestors.',              level:'B1' },
  { word:'Guardian',     hindi:'अभिभावक',           pronunciation:'gaar-dee-en',   example:'His uncle is his legal guardian.',     level:'B1' },
  { word:'Orphan',       hindi:'अनाथ',              pronunciation:'or-fan',        example:'The charity helps orphan children.',    level:'B1' },
  { word:'Adopted',      hindi:'गोद लिया हुआ',     pronunciation:'uh-dop-tid',    example:'They adopted a child last year.',      level:'A2' },
  { word:'Extended family',hindi:'बड़ा परिवार',     pronunciation:'ex-ten-did',    example:'We have a large extended family.',     level:'A2' },
  { word:'Nuclear family',hindi:'छोटा/एकल परिवार', pronunciation:'nyoo-klee-er',   example:'Nuclear families are common in cities.',level:'B1' },
];

// ── Food & Drinks ─────────────────────────────────────────────
export const FOOD_DRINKS = [
  { word:'Appetizer',    hindi:'शुरुआती खाना',      pronunciation:'ap-ih-ty-zer',  example:'We ordered soup as an appetizer.',    level:'B1' },
  { word:'Cuisine',      hindi:'खाना बनाने की शैली', pronunciation:'kwi-zeen',     example:'I love Indian cuisine.',              level:'B1' },
  { word:'Ingredients',  hindi:'सामग्री',            pronunciation:'in-gree-dee-ents',example:'List all the ingredients.',          level:'A2' },
  { word:'Recipe',       hindi:'पकाने की विधि',      pronunciation:'res-uh-pee',    example:'Can you share the recipe?',           level:'A2' },
  { word:'Spicy',        hindi:'मसालेदार',           pronunciation:'spy-see',       example:'Indian food is often very spicy.',     level:'A1' },
  { word:'Nutritious',   hindi:'पौष्टिक',            pronunciation:'noo-trish-us',  example:'Eat nutritious food daily.',           level:'B1' },
  { word:'Beverage',     hindi:'पेय/पीने की चीज़',   pronunciation:'bev-rij',       example:'What beverage would you like?',       level:'B1' },
  { word:'Vegetarian',   hindi:'शाकाहारी',           pronunciation:'vej-uh-tair-ee-en',example:'I am vegetarian.',                  level:'A1' },
  { word:'Portion',      hindi:'हिस्सा',             pronunciation:'por-shun',      example:'Can I have a smaller portion?',       level:'A2' },
  { word:'Reservation',  hindi:'बुकिंग/आरक्षण',     pronunciation:'rez-er-vay-shun',example:'I have a restaurant reservation.',    level:'B1' },
  { word:'Menu',         hindi:'मेन्यू',             pronunciation:'men-yoo',       example:'Can I see the menu, please?',         level:'A1' },
  { word:'Dessert',      hindi:'मिठाई/मीठा',         pronunciation:'duh-zert',      example:'We had gulab jamun for dessert.',     level:'A1' },
  { word:'Snack',        hindi:'नाश्ता/हल्का खाना', pronunciation:'snak',          example:'Have a healthy snack in the evening.', level:'A1' },
  { word:'Digest',       hindi:'पचाना',              pronunciation:'dy-jest',       example:'Walk after meals to help digest.',     level:'B1' },
  { word:'Culinary',     hindi:'पाककला संबंधी',      pronunciation:'kul-uh-ner-ee', example:'She has excellent culinary skills.',   level:'C1' },
];

// ── Travel & Transportation ───────────────────────────────────
export const TRAVEL_VOCAB = [
  { word:'Departure',    hindi:'रवाना होना',         pronunciation:'duh-par-cher',  example:'Departure time is 10 AM.',            level:'A2' },
  { word:'Arrival',      hindi:'पहुँचना',            pronunciation:'uh-ry-vel',     example:'Expected arrival is 3 PM.',           level:'A2' },
  { word:'Itinerary',    hindi:'यात्रा कार्यक्रम',  pronunciation:'eye-tin-er-air-ee',example:'Share your itinerary with us.',      level:'B2' },
  { word:'Boarding pass',hindi:'बोर्डिंग पास',       pronunciation:'bor-ding pas',  example:'Don\'t lose your boarding pass.',      level:'B1' },
  { word:'Customs',      hindi:'कस्टम/सीमा शुल्क',  pronunciation:'kus-tumz',      example:'Declare items at customs.',           level:'B1' },
  { word:'Immigration',  hindi:'आव्रजन विभाग',       pronunciation:'im-ih-gray-shun',example:'Fill the immigration form correctly.',level:'B1' },
  { word:'Transit',      hindi:'रास्ते में रुकना',   pronunciation:'tran-zit',      example:'We have a 3-hour transit in Dubai.',  level:'B1' },
  { word:'Check-in',     hindi:'चेक-इन करना',        pronunciation:'chek-in',       example:'Online check-in saves time.',         level:'A2' },
  { word:'Luggage',      hindi:'सामान/बैगेज',        pronunciation:'lug-ij',        example:'Don\'t exceed the luggage limit.',     level:'A2' },
  { word:'Commute',      hindi:'रोज़ का सफर',         pronunciation:'kuh-myoot',     example:'His commute takes one hour.',         level:'A2' },
  { word:'Traffic jam',  hindi:'ट्रैफिक जाम',        pronunciation:'traf-ik jam',   example:'There was a terrible traffic jam.',   level:'A1' },
  { word:'Platform',     hindi:'प्लेटफार्म',         pronunciation:'plat-form',     example:'The train is at platform 5.',         level:'A1' },
  { word:'Fare',         hindi:'किराया',             pronunciation:'fair',          example:'What is the bus fare to the station?',level:'A1' },
  { word:'Visa',         hindi:'वीज़ा',              pronunciation:'vee-za',        example:'I applied for a US work visa.',        level:'B1' },
  { word:'Passport',     hindi:'पासपोर्ट',           pronunciation:'pas-port',      example:'Keep your passport safe.',            level:'A2' },
  { word:'Layover',      hindi:'बीच में रुकना',      pronunciation:'lay-oh-ver',    example:'We have a 6-hour layover in Singapore.',level:'B1' },
  { word:'Terminal',     hindi:'टर्मिनल',            pronunciation:'ter-mih-nel',   example:'Domestic flights are at Terminal 1.',  level:'A2' },
  { word:'Destination',  hindi:'मंज़िल',             pronunciation:'des-tuh-nay-shun',example:'What is your final destination?',     level:'A2' },
];

// ── Office & Business ─────────────────────────────────────────
export const OFFICE_VOCAB = [
  { word:'Agenda',       hindi:'कार्यसूची',          pronunciation:'uh-jen-da',     example:'Share the meeting agenda in advance.', level:'B1' },
  { word:'Minutes',      hindi:'कार्यवृत्त',         pronunciation:'min-its',       example:'Who will take the minutes today?',    level:'B1' },
  { word:'Deadline',     hindi:'समय-सीमा',           pronunciation:'ded-line',      example:'Submit your report before the deadline.',level:'B1' },
  { word:'Proposal',     hindi:'प्रस्ताव',           pronunciation:'pruh-poh-zel',  example:'Send the project proposal by Monday.', level:'B1' },
  { word:'Invoice',      hindi:'बिल/इनवॉइस',         pronunciation:'in-voys',       example:'The invoice is due by end of month.', level:'B1' },
  { word:'Client',       hindi:'ग्राहक/क्लाइंट',    pronunciation:'kly-ent',       example:'Our client is very satisfied.',       level:'B1' },
  { word:'Revenue',      hindi:'राजस्व/आमदनी',       pronunciation:'rev-en-yoo',    example:'Revenue grew by 30% this quarter.',   level:'B2' },
  { word:'Quarterly',    hindi:'तिमाही',             pronunciation:'kwor-ter-lee',  example:'We review performance quarterly.',    level:'B2' },
  { word:'KPI',          hindi:'मुख्य प्रदर्शन संकेतक',pronunciation:'kay-pee-eye', example:'Set your KPIs for the year.',          level:'C1' },
  { word:'Delegate',     hindi:'सौंपना',             pronunciation:'del-uh-gayt',   example:'Learn to delegate tasks effectively.', level:'B2' },
  { word:'Collaborate',  hindi:'मिलकर काम करना',     pronunciation:'kuh-lab-uh-rayt',example:'We collaborate across departments.',   level:'B1' },
  { word:'Stakeholder',  hindi:'हितधारक',            pronunciation:'stayk-hol-der', example:'Keep all stakeholders informed.',      level:'C1' },
  { word:'Milestone',    hindi:'पड़ाव/लक्ष्य',        pronunciation:'mile-stohn',    example:'We reached an important milestone.',  level:'B2' },
  { word:'Appraisal',    hindi:'कार्य-मूल्यांकन',    pronunciation:'uh-pray-zel',   example:'Annual appraisals happen in April.',  level:'B2' },
  { word:'Probation',    hindi:'परिवीक्षा',          pronunciation:'proh-bay-shun', example:'New employees are on probation.',     level:'B2' },
  { word:'Resign',       hindi:'इस्तीफा देना',       pronunciation:'rih-zyn',       example:'He decided to resign from the position.',level:'B1' },
  { word:'Promotion',    hindi:'पदोन्नति',           pronunciation:'pruh-moh-shun', example:'She received a well-deserved promotion.',level:'B1' },
  { word:'Strategy',     hindi:'रणनीति',             pronunciation:'strat-uh-jee',  example:'We need a better marketing strategy.', level:'B2' },
  { word:'Productivity', hindi:'उत्पादकता',          pronunciation:'proh-duk-tiv-ih-tee',example:'Remote work boosted our productivity.',level:'B2' },
  { word:'Briefing',     hindi:'जानकारी देना',       pronunciation:'bree-fing',     example:'Morning briefing starts at 9 sharp.', level:'B1' },
];

// ── Technology & IT ───────────────────────────────────────────
export const TECHNOLOGY_VOCAB = [
  { word:'Algorithm',    hindi:'एल्गोरिदम',          pronunciation:'al-guh-rith-em',example:'The algorithm sorts data quickly.',   level:'B2' },
  { word:'Cloud',        hindi:'क्लाउड/सर्वर',       pronunciation:'klowd',         example:'Store your files on the cloud.',      level:'B1' },
  { word:'Bandwidth',    hindi:'बैंडविड्थ/नेट स्पीड',pronunciation:'band-width',    example:'We need more bandwidth for video.',    level:'B2' },
  { word:'Interface',    hindi:'इंटरफ़ेस',            pronunciation:'in-ter-fays',   example:'The app has a clean user interface.', level:'B1' },
  { word:'Bug',          hindi:'गड़बड़ी/बग',          pronunciation:'bug',           example:'We found a bug in the system.',        level:'A2' },
  { word:'Database',     hindi:'डेटाबेस',            pronunciation:'day-tuh-bays',  example:'The database stores all user info.',   level:'B1' },
  { word:'Server',       hindi:'सर्वर',               pronunciation:'ser-ver',       example:'The server is down right now.',        level:'B1' },
  { word:'Encryption',   hindi:'एन्क्रिप्शन',        pronunciation:'en-krip-shun',  example:'All passwords use encryption.',       level:'C1' },
  { word:'Update',       hindi:'अपडेट करना',          pronunciation:'up-dayt',       example:'Please update your software.',        level:'A1' },
  { word:'Download',     hindi:'डाउनलोड करना',        pronunciation:'down-lohd',     example:'Download the app from the store.',    level:'A1' },
  { word:'Upload',       hindi:'अपलोड करना',          pronunciation:'up-lohd',       example:'Upload your documents here.',         level:'A1' },
  { word:'Cybersecurity',hindi:'साइबर सुरक्षा',       pronunciation:'sy-ber-suh-kyoor-ih-tee',example:'Cybersecurity is very important.',level:'B2' },
  { word:'Artificial Intelligence',hindi:'कृत्रिम बुद्धिमत्ता',pronunciation:'ar-tuh-fish-ul',example:'AI is changing every industry.',    level:'B2' },
  { word:'Machine Learning',hindi:'मशीन लर्निंग',    pronunciation:'muh-sheen ler-ning',example:'ML helps with data analysis.',        level:'B2' },
  { word:'Automation',   hindi:'स्वचालन',             pronunciation:'aw-tuh-may-shun',example:'Automation is replacing many jobs.',   level:'B2' },
  { word:'Remote work',  hindi:'घर से काम',           pronunciation:'rih-moht werk', example:'Remote work became normal after 2020.',level:'B1' },
  { word:'Bandwidth',    hindi:'इंटरनेट की क्षमता',  pronunciation:'band-width',    example:'We upgraded our bandwidth.',           level:'B1' },
  { word:'Prototype',    hindi:'प्रारूप/नमूना',      pronunciation:'proh-tuh-type',  example:'Build a prototype first, then launch.', level:'B2' },
];

// ── Emotions & Feelings ───────────────────────────────────────
export const EMOTIONS_VOCAB = [
  { word:'Anxious',      hindi:'चिंतित/घबराया',      pronunciation:'ang-shus',      example:'I feel anxious before interviews.',   level:'B1' },
  { word:'Enthusiastic', hindi:'उत्साही',             pronunciation:'en-thoo-zee-as-tik',example:'She is enthusiastic about learning.',level:'B1' },
  { word:'Frustrated',   hindi:'निराश/झुंझलाया',     pronunciation:'frus-tray-tid',  example:'I feel frustrated when I make errors.',level:'B1' },
  { word:'Overwhelmed',  hindi:'बहुत ज़्यादा दबाव',  pronunciation:'oh-ver-whelmd',  example:'I am overwhelmed with work.',         level:'B2' },
  { word:'Grateful',     hindi:'आभारी',              pronunciation:'grayt-ful',      example:'I am grateful for this opportunity.',  level:'A2' },
  { word:'Confident',    hindi:'आत्मविश्वासी',       pronunciation:'kon-fih-dent',   example:'I feel confident about my skills.',   level:'A2' },
  { word:'Disappointed', hindi:'निराश',              pronunciation:'dis-uh-poin-tid',example:'I was disappointed by the result.',    level:'A2' },
  { word:'Embarrassed',  hindi:'शर्मिंदा',            pronunciation:'em-bar-uhst',   example:'I felt embarrassed by my mistake.',   level:'B1' },
  { word:'Thrilled',     hindi:'रोमांचित',            pronunciation:'thrild',        example:'I am thrilled about my promotion.',   level:'B1' },
  { word:'Melancholy',   hindi:'उदासी',              pronunciation:'mel-en-kol-ee',  example:'I felt melancholy after the news.',   level:'C1' },
  { word:'Motivated',    hindi:'प्रेरित',             pronunciation:'moh-tuh-vay-tid',example:'This book motivated me to work harder.',level:'B1' },
  { word:'Nostalgic',    hindi:'पुरानी यादों में',   pronunciation:'nos-tal-jik',    example:'Old songs make me nostalgic.',        level:'B2' },
  { word:'Relieved',     hindi:'राहत महसूस करना',   pronunciation:'rih-leevd',      example:'I felt relieved after the exam.',     level:'B1' },
  { word:'Jealous',      hindi:'ईर्ष्यालु',          pronunciation:'jel-us',        example:'Try not to be jealous of others.',    level:'A2' },
  { word:'Compassionate',hindi:'दयालु/सहानुभूतिपूर्ण',pronunciation:'kum-pash-un-it', example:'Be compassionate to people in need.', level:'B2' },
];

// ── Personality Traits ────────────────────────────────────────
export const PERSONALITY_VOCAB = [
  { word:'Ambitious',    hindi:'महत्वाकांक्षी',      pronunciation:'am-bish-us',    example:'She is very ambitious about her career.',level:'B1' },
  { word:'Reliable',     hindi:'भरोसेमंद',            pronunciation:'rih-ly-uh-bul',  example:'A reliable employee is hard to find.',level:'B1' },
  { word:'Diligent',     hindi:'मेहनती',             pronunciation:'dil-ih-jent',    example:'He is diligent and completes tasks well.',level:'B2' },
  { word:'Adaptable',    hindi:'अनुकूलनीय',          pronunciation:'uh-dap-tuh-bul', example:'Stay adaptable in a changing market.', level:'B2' },
  { word:'Empathetic',   hindi:'दूसरों की भावना समझने वाला',pronunciation:'em-puh-thet-ik',example:'Great leaders are empathetic.',          level:'B2' },
  { word:'Persistent',   hindi:'दृढ़',               pronunciation:'per-sis-tent',   example:'Success requires persistent effort.',   level:'B2' },
  { word:'Optimistic',   hindi:'आशावादी',            pronunciation:'op-tuh-mis-tik', example:'Try to stay optimistic in hard times.', level:'B1' },
  { word:'Introvert',    hindi:'अंतर्मुखी',          pronunciation:'in-truh-vert',   example:'Many great writers are introverts.',    level:'B1' },
  { word:'Extrovert',    hindi:'बहिर्मुखी',          pronunciation:'eks-truh-vert',  example:'Extroverts enjoy networking events.',   level:'B1' },
  { word:'Charismatic',  hindi:'आकर्षक/प्रभावशाली',  pronunciation:'kuh-riz-mat-ik', example:'A charismatic leader inspires teams.',  level:'C1' },
  { word:'Humble',       hindi:'विनम्र',             pronunciation:'hum-bul',        example:'Successful people stay humble.',         level:'A2' },
  { word:'Creative',     hindi:'रचनात्मक',           pronunciation:'kree-ay-tiv',    example:'She has a very creative mind.',          level:'A2' },
];

// ── Idioms & Phrases ──────────────────────────────────────────
export const IDIOMS = [
  { word:'Break the ice',      hindi:'बातचीत शुरू करना',     example:'Tell a joke to break the ice.',          level:'B1' },
  { word:'Hit the nail on the head',hindi:'बिल्कुल सही बात',  example:'You hit the nail on the head.',          level:'B2' },
  { word:'Beat around the bush',hindi:'घुमा-फिराकर बात करना', example:"Don't beat around the bush — speak directly.",level:'B2' },
  { word:'Bite the bullet',    hindi:'मुश्किल काम करना',     example:'Just bite the bullet and apologize.',    level:'B2' },
  { word:'Under the weather',  hindi:'थोड़ा बीमार',          example:'I\'m feeling under the weather today.',   level:'B1' },
  { word:'Cost an arm and a leg',hindi:'बहुत महँगा',         example:'That phone costs an arm and a leg.',     level:'B1' },
  { word:'Once in a blue moon',hindi:'बहुत कम ही',           example:'He visits us once in a blue moon.',      level:'B1' },
  { word:'The ball is in your court',hindi:'अब तुम्हारी बारी है',example:'The ball is in your court now.',         level:'B2' },
  { word:'Burn bridges',       hindi:'रिश्ते खराब करना',    example:"Don't burn bridges with your ex-boss.",  level:'B2' },
  { word:'Hit the ground running',hindi:'तुरंत काम शुरू करना',example:'The new employee hit the ground running.',level:'C1' },
  { word:'Silver lining',      hindi:'मुश्किल में अच्छाई',   example:'Every problem has a silver lining.',     level:'B2' },
  { word:'Bite off more than you can chew',hindi:'क्षमता से ज़्यादा लेना',example:"Don't bite off more than you can chew.",level:'B2' },
  { word:'Cut corners',        hindi:'कामचलाऊ काम करना',    example:"Don't cut corners with safety.",          level:'B2' },
  { word:'Go back to the drawing board',hindi:'फिर से शुरू करना',example:'The plan failed — back to the drawing board.',level:'C1' },
  { word:'Think outside the box',hindi:'नए तरीके से सोचना',  example:'We need to think outside the box.',      level:'B1' },
  { word:'Get the ball rolling',hindi:'शुरुआत करना',         example:"Let's get the ball rolling on this project.",level:'B1' },
  { word:'On the same page',   hindi:'एक ही समझ पर होना',    example:'Are we all on the same page?',           level:'B1' },
  { word:'Touch base',         hindi:'बात करना/अपडेट लेना',  example:'Let\'s touch base after the meeting.',   level:'B2' },
  { word:'Take it with a grain of salt',hindi:'पूरा भरोसा न करना',example:'Take his advice with a grain of salt.',level:'C1' },
  { word:'The elephant in the room',hindi:'जो बात कोई नहीं कहता',example:'No one mentioned the elephant in the room.',level:'C1' },
];

// ── Phrasal Verbs ─────────────────────────────────────────────
export const PHRASAL_VERBS = [
  { word:'Bring up',    hindi:'बात उठाना / बड़ा करना', example:'She brought up an important issue.',       level:'B1' },
  { word:'Call off',    hindi:'रद्द करना',             example:'The event was called off due to rain.',    level:'B1' },
  { word:'Carry on',    hindi:'जारी रखना',             example:'Please carry on with your work.',         level:'A2' },
  { word:'Come across',hindi:'मिलना/सामना होना',       example:'I came across an interesting article.',   level:'B1' },
  { word:'Cut down',    hindi:'कम करना',               example:'Try to cut down on sugar.',               level:'B1' },
  { word:'Deal with',   hindi:'निपटना',                example:'He deals with customer complaints.',       level:'B1' },
  { word:'Figure out',  hindi:'समझना/हल करना',         example:'Can you figure out this problem?',        level:'B1' },
  { word:'Follow up',   hindi:'अनुवर्ती कार्रवाई करना', example:'Please follow up on that email.',        level:'B1' },
  { word:'Get along',   hindi:'अच्छे से रहना',         example:'I get along well with my colleagues.',    level:'A2' },
  { word:'Give up',     hindi:'हार मान लेना',          example:"Don't give up on your dreams.",           level:'A2' },
  { word:'Go over',     hindi:'समीक्षा करना',          example:'Let\'s go over the report together.',     level:'B1' },
  { word:'Hang in there',hindi:'हिम्मत रखना',          example:'Hang in there — things will improve.',    level:'B1' },
  { word:'Keep up with',hindi:'साथ चलना/अपडेट रहना',  example:'It\'s hard to keep up with the news.',    level:'B1' },
  { word:'Look into',   hindi:'जाँच करना',             example:'I will look into this matter.',           level:'B1' },
  { word:'Make up',     hindi:'सुलह करना/बनाना',       example:'They made up after the argument.',        level:'A2' },
  { word:'Put off',     hindi:'टालना',                 example:'Don\'t put off important work.',           level:'B1' },
  { word:'Run out of',  hindi:'खत्म हो जाना',          example:'We ran out of time.',                     level:'A2' },
  { word:'Set up',      hindi:'स्थापित करना',          example:'We set up a new office last month.',      level:'A2' },
  { word:'Stand out',   hindi:'अलग दिखना',             example:'Make your resume stand out.',             level:'B1' },
  { word:'Take over',   hindi:'संभालना',               example:'She took over as the new manager.',       level:'B1' },
  { word:'Turn down',   hindi:'मना करना',              example:'He turned down the job offer.',           level:'B1' },
  { word:'Work out',    hindi:'हल होना/व्यायाम करना',  example:'Things always work out in the end.',     level:'A2' },
];

// ── Professional Vocabulary ───────────────────────────────────
export const PROFESSIONAL_VOCAB = [
  { word:'Negotiate',    hindi:'बातचीत/समझौता करना',  pronunciation:'nih-goh-shee-ayt',example:'We need to negotiate better terms.',   level:'B2' },
  { word:'Implement',    hindi:'लागू करना',           pronunciation:'im-pluh-ment',   example:'Implement the new policy from Monday.',level:'B2' },
  { word:'Acknowledge',  hindi:'स्वीकार करना',        pronunciation:'ak-nol-ij',      example:'Please acknowledge receipt of email.', level:'B2' },
  { word:'Pursuant',     hindi:'के अनुसार',           pronunciation:'per-soo-ent',    example:'Pursuant to our agreement...',         level:'C1' },
  { word:'Leverage',     hindi:'फायदा उठाना',         pronunciation:'lev-er-ij',      example:'Leverage your network for opportunities.',level:'C1' },
  { word:'Synergy',      hindi:'मिलकर बेहतर नतीजा',   pronunciation:'sin-er-jee',     example:'There is great synergy in this team.', level:'C1' },
  { word:'Scalable',     hindi:'बड़ा करने योग्य',     pronunciation:'skay-luh-bul',   example:'Build a scalable business model.',     level:'C1' },
  { word:'Streamline',   hindi:'सरल और कुशल बनाना',   pronunciation:'stream-line',    example:'Streamline the approval process.',     level:'C1' },
  { word:'Benchmark',    hindi:'मानदंड/तुलना का आधार',pronunciation:'bench-mark',     example:'Set a benchmark for performance.',     level:'B2' },
  { word:'Pivotal',      hindi:'बहुत ज़रूरी/महत्वपूर्ण',pronunciation:'piv-uh-tel',    example:'This decision is pivotal for growth.', level:'C1' },
  { word:'Proactive',    hindi:'सक्रिय/पहले सोचने वाला',pronunciation:'proh-ak-tiv',   example:'Be proactive in solving problems.',    level:'B2' },
  { word:'Ethical',      hindi:'नैतिक',              pronunciation:'eth-ih-kel',     example:'Maintain ethical business practices.', level:'B2' },
  { word:'Transparent',  hindi:'पारदर्शी',            pronunciation:'trans-pair-ent', example:'Be transparent with your team.',       level:'B2' },
  { word:'Accountability',hindi:'जवाबदेही',           pronunciation:'uh-kown-tuh-bil-ih-tee',example:'Accountability builds trust.',       level:'B2' },
  { word:'Innovation',   hindi:'नवाचार',             pronunciation:'in-oh-vay-shun', example:'Encourage innovation in your team.',   level:'B2' },
  { word:'Professionalism',hindi:'व्यावसायिकता',     pronunciation:'pruh-fesh-un-uh-liz-em',example:'Professionalism is key to success.',level:'B2' },
];

// ── Synonyms for Common Words (Advanced Use) ──────────────────
export const SYNONYMS_LIST = [
  { word:'Good',       synonyms:['Excellent','Outstanding','Superb','Remarkable','Exceptional'],   hindi:'अच्छा',    level:'A2' },
  { word:'Bad',        synonyms:['Terrible','Awful','Dreadful','Horrible','Atrocious'],            hindi:'बुरा',     level:'A2' },
  { word:'Happy',      synonyms:['Joyful','Delighted','Ecstatic','Elated','Content'],              hindi:'खुश',      level:'A2' },
  { word:'Sad',        synonyms:['Miserable','Dejected','Gloomy','Downcast','Melancholy'],         hindi:'दुखी',     level:'A2' },
  { word:'Important',  synonyms:['Crucial','Vital','Significant','Critical','Essential'],          hindi:'ज़रूरी',    level:'B1' },
  { word:'Show',       synonyms:['Demonstrate','Exhibit','Display','Reveal','Present'],            hindi:'दिखाना',   level:'B1' },
  { word:'Say',        synonyms:['Mention','State','Declare','Assert','Communicate'],              hindi:'कहना',     level:'A2' },
  { word:'Big',        synonyms:['Enormous','Massive','Gigantic','Huge','Substantial'],            hindi:'बड़ा',     level:'A2' },
  { word:'Fast',       synonyms:['Rapid','Swift','Quick','Speedy','Brisk'],                       hindi:'तेज़',     level:'A2' },
  { word:'Smart',      synonyms:['Intelligent','Clever','Bright','Sharp','Astute'],               hindi:'होशियार',  level:'A2' },
  { word:'Difficult',  synonyms:['Challenging','Complex','Demanding','Arduous','Strenuous'],      hindi:'मुश्किल',  level:'B1' },
  { word:'Help',       synonyms:['Assist','Support','Aid','Facilitate','Enable'],                 hindi:'मदद',      level:'A2' },
  { word:'Think',      synonyms:['Consider','Contemplate','Ponder','Reflect','Deliberate'],       hindi:'सोचना',    level:'B1' },
  { word:'Want',       synonyms:['Desire','Wish','Crave','Aspire','Seek'],                        hindi:'चाहना',    level:'A1' },
  { word:'Get',        synonyms:['Obtain','Acquire','Receive','Gain','Secure'],                   hindi:'पाना',     level:'A1' },
];

// ── Body & Health Vocabulary ──────────────────────────────────
export const BODY_HEALTH = [
  { word:'Symptom',      hindi:'लक्षण',              pronunciation:'simp-tum',      example:'Fever is a symptom of infection.',    level:'B1' },
  { word:'Diagnosis',    hindi:'रोग-निदान',          pronunciation:'dy-ug-noh-sis', example:'The doctor gave a clear diagnosis.',   level:'B2' },
  { word:'Prescription', hindi:'पर्ची',              pronunciation:'prih-skrip-shun',example:'Take this medicine as per prescription.',level:'B1' },
  { word:'Surgery',      hindi:'ऑपरेशन',             pronunciation:'ser-juh-ree',   example:'He needs emergency surgery.',          level:'B1' },
  { word:'Recovery',     hindi:'ठीक होना',           pronunciation:'rih-kuv-er-ee', example:'Full recovery takes two weeks.',       level:'B1' },
  { word:'Allergy',      hindi:'एलर्जी',             pronunciation:'al-er-jee',     example:'I have a dust allergy.',              level:'A2' },
  { word:'Checkup',      hindi:'स्वास्थ्य जाँच',    pronunciation:'chek-up',       example:'Get a regular health checkup.',        level:'A2' },
  { word:'Chronic',      hindi:'दीर्घकालिक',         pronunciation:'kron-ik',       example:'He has chronic back pain.',           level:'B2' },
  { word:'Immune system',hindi:'प्रतिरक्षा प्रणाली', pronunciation:'ih-myoon',      example:'Vitamins boost your immune system.',   level:'B2' },
  { word:'Nutrition',    hindi:'पोषण',               pronunciation:'noo-trish-un',  example:'Proper nutrition is essential.',       level:'B1' },
  { word:'Prescription', hindi:'दवाई की पर्ची',      pronunciation:'pruh-skrip-shun',example:'Always take medicine by prescription.',level:'B1' },
  { word:'Vaccinate',    hindi:'टीका लगाना',         pronunciation:'vak-suh-nayt',  example:'Vaccinate your children on time.',     level:'B1' },
];

// ── Education Vocabulary ──────────────────────────────────────
export const EDUCATION_VOCAB = [
  { word:'Scholarship',  hindi:'छात्रवृत्ति',         pronunciation:'skol-er-ship',  example:'She won a full scholarship.',         level:'B1' },
  { word:'Curriculum',   hindi:'पाठ्यक्रम',          pronunciation:'kuh-rik-yoo-lum',example:'The curriculum covers all topics.',    level:'B2' },
  { word:'Thesis',       hindi:'शोध प्रबंध',          pronunciation:'thee-sis',       example:'She submitted her thesis last month.', level:'C1' },
  { word:'Semester',     hindi:'सत्र/सेमेस्टर',      pronunciation:'sem-es-ter',     example:'Each semester has six months.',        level:'A2' },
  { word:'Assignment',   hindi:'काम/असाइनमेंट',      pronunciation:'uh-syn-ment',    example:'Submit your assignment by Friday.',    level:'A2' },
  { word:'Grade',        hindi:'अंक/ग्रेड',          pronunciation:'grayd',          example:'I got an A grade in English.',         level:'A1' },
  { word:'Internship',   hindi:'इंटर्नशिप',          pronunciation:'in-tern-ship',   example:'She did a 6-month internship.',        level:'B1' },
  { word:'Extracurricular',hindi:'पाठ्येतर गतिविधि', pronunciation:'eks-truh-kuh-rik',example:'Join extracurricular activities.',     level:'B2' },
  { word:'Campus',       hindi:'परिसर',               pronunciation:'kam-pus',        example:'The college campus is beautiful.',     level:'A2' },
  { word:'Mentor',       hindi:'गुरु/मार्गदर्शक',    pronunciation:'men-tor',        example:'Find a good mentor in your field.',    level:'B1' },
  { word:'Diploma',      hindi:'डिप्लोमा',           pronunciation:'dih-ploh-muh',   example:'He got a diploma in IT.',             level:'A2' },
  { word:'Academic',     hindi:'अकादमिक/शैक्षिक',    pronunciation:'ak-uh-dem-ik',   example:'Maintain good academic performance.',  level:'B1' },
];

// ── Main export — Get words by category ──────────────────────
export const ALL_VOCABULARY = {
  'daily-life':    DAILY_LIFE,
  'family':        FAMILY_VOCAB,
  'food-drinks':   FOOD_DRINKS,
  'travel':        TRAVEL_VOCAB,
  'office':        OFFICE_VOCAB,
  'technology':    TECHNOLOGY_VOCAB,
  'emotions':      EMOTIONS_VOCAB,
  'personality':   PERSONALITY_VOCAB,
  'body-health':   BODY_HEALTH,
  'education':     EDUCATION_VOCAB,
  'idioms':        IDIOMS,
  'phrasal-verbs': PHRASAL_VERBS,
  'professional':  PROFESSIONAL_VOCAB,
  'synonyms':      SYNONYMS_LIST,
};

// Get all words as flat array for search
export function getAllWords() {
  return Object.values(ALL_VOCABULARY).flat();
}

export function getVocabularyForDay(dayNum, targetCount = 500) {
  const existingWords = getAllWords();
  const generatedWords = generateVocabularyForDay(dayNum, targetCount);
  const mergedWords = [...existingWords, ...generatedWords];
  return mergedWords.slice(0, targetCount);
}

// Get words by level
export function getWordsByLevel(level) {
  return getAllWords().filter(w => w.level === level);
}

// Search words
export function searchWords(query) {
  const q = query.toLowerCase();
  return getAllWords().filter(w =>
    w.word.toLowerCase().includes(q) ||
    w.hindi.includes(q) ||
    (w.example && w.example.toLowerCase().includes(q))
  );
}

export default ALL_VOCABULARY;
