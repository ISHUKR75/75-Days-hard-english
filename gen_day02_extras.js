#!/usr/bin/env node
// ============================================================================
// gen_day02_extras.js
// One-off content generator for Day 2 — "Self Introduction"
// Expands the SIX thinner Day 2 files (lessons, speaking-drill, writing-
// exercise, listening-exercise, reading-exercise, revision) with real,
// non-repeating Hindi/English content, following the same combinatorial
// approach used in gen_day02_v2.js (which already expanded
// practice-questions.json / vocabulary.json / daily-test.json).
//
// IMPORTANT: this script only ADDS content on top of what already exists in
// each JSON file — nothing is deleted. Existing sections/drills/tasks/
// exercises/questions are kept exactly as they are and new ones are
// appended after them.
//
// Run with: node gen_day02_extras.js
// ============================================================================
const fs = require('fs');
const path = require('path');

const OUT = 'data/challenge/day-02';

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(OUT, file), 'utf8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(path.join(OUT, file), JSON.stringify(data, null, 2) + '\n');
}

// ----------------------------------------------------------------------------
// 1) LESSONS.JSON — add many more real-life self-introduction situations on
//    top of the existing 8 sections (name/city/profession/experience/family/
//    hobbies/greetings/common-errors).
// ----------------------------------------------------------------------------
const newLessonSections = [
  {
    id: 'phone-intro',
    title: 'Introducing Yourself on a Phone Call',
    hindiTitle: 'Phone Call पर अपना Introduction देना',
    explanation: "Phone पर introduction देते समय आवाज़ ही आपकी पहचान होती है, इसलिए साफ़ और धीरे बोलना ज़रूरी है। सबसे पहले greeting, फिर अपना नाम, फिर काम की वजह बताएं। 'This is [Name] speaking' एक बहुत common formal तरीका है phone पर अपना परिचय देने का।",
    formula: "Hello, this is [Name] speaking / Hi, [Name] here, calling from [Company]",
    examples: [
      { english: "Hello, this is Rohan speaking from ABC Solutions.", hindi: "नमस्ते, मैं रोहन बोल रहा हूँ ABC Solutions से।" },
      { english: "Hi, this is Priya calling regarding the job interview.", hindi: "नमस्ते, मैं प्रिया बोल रही हूँ, job interview के बारे में call कर रही हूँ।" },
      { english: "Good afternoon, this is Aman from the HR department.", hindi: "नमस्ते, मैं अमन हूँ HR department से।" },
      { english: "May I know who is calling, please?", hindi: "क्या मैं जान सकता हूँ कि कौन बोल रहा है?" },
      { english: "I'm returning your call regarding the project update.", hindi: "मैं project update के बारे में आपका call वापस कर रहा हूँ।" }
    ]
  },
  {
    id: 'online-meeting-intro',
    title: 'Introducing Yourself in an Online Meeting (Zoom/Google Meet)',
    hindiTitle: 'Online Meeting में Introduction देना',
    explanation: "आजकल ज़्यादातर meetings online होती हैं। Video call join करते ही mic on करके एक छोटा introduction देना professional माना जाता है, खासकर तब जब meeting में नए लोग हों।",
    formula: "Hi everyone, I'm [Name], I'll be [role] for this project/meeting.",
    examples: [
      { english: "Hi everyone, I'm Neha, I'll be presenting the sales report today.", hindi: "नमस्ते सभी, मैं नेहा हूँ, आज मैं sales report present करूँगी।" },
      { english: "Good morning team, this is Vikas joining from the Pune office.", hindi: "सुप्रभात team, मैं विकास हूँ, पुणे office से जुड़ रहा हूँ।" },
      { english: "Can everyone see my screen? I'm going to share the presentation now.", hindi: "क्या सभी को मेरी screen दिख रही है? मैं presentation share करने जा रहा हूँ।" },
      { english: "I'll quickly introduce myself before we begin.", hindi: "शुरू करने से पहले मैं जल्दी से अपना परिचय दे देता हूँ।" }
    ]
  },
  {
    id: 'linkedin-intro',
    title: 'Introducing Yourself on LinkedIn / Professional Networking',
    hindiTitle: 'LinkedIn पर Professional Introduction',
    explanation: "LinkedIn जैसी professional networking sites पर introduction थोड़ा achievement-focused होता है। अपना current role, key skills और क्या search कर रहे हैं (job, connections, opportunities) बताना चाहिए।",
    formula: "I'm a [job title] with [X years] experience in [field], passionate about [interest].",
    examples: [
      { english: "I'm a data analyst with three years of experience in the fintech industry.", hindi: "मैं एक data analyst हूँ, fintech industry में तीन साल का अनुभव है।" },
      { english: "Currently exploring new opportunities in product management.", hindi: "अभी मैं product management में नए अवसर तलाश रहा हूँ।" },
      { english: "Let's connect if you're working in digital marketing too!", hindi: "अगर आप भी digital marketing में काम करते हैं तो चलिए जुड़ते हैं!" }
    ]
  },
  {
    id: 'college-intro',
    title: 'Introducing Yourself on the First Day of College',
    hindiTitle: 'College के पहले दिन Introduction',
    explanation: "College के पहले दिन classmates और teachers के सामने अपना introduction देना होता है। इसमें अपना नाम, school/city और interest बताना काफी है — यह informal-formal mix होता है।",
    formula: "Hi, I'm [Name] from [city]. I completed my schooling from [school].",
    examples: [
      { english: "Hi everyone, I'm Kartikeya from Kanpur. I completed my schooling from DAV Public School.", hindi: "नमस्ते सभी, मैं कार्तिकेय हूँ, कानपुर से। मैंने अपनी schooling DAV Public School से पूरी की।" },
      { english: "I'm excited to be part of this college and look forward to making new friends.", hindi: "मैं इस college का हिस्सा बनकर उत्साहित हूँ और नए दोस्त बनाने का इंतज़ार कर रहा हूँ।" },
      { english: "My favourite subject is Mathematics and I hope to join the debate club.", hindi: "मेरा पसंदीदा विषय Mathematics है और मैं debate club join करने की उम्मीद रखता हूँ।" }
    ]
  },
  {
    id: 'group-discussion-intro',
    title: 'Introducing Yourself in a Group Discussion',
    hindiTitle: 'Group Discussion में Introduction',
    explanation: "Group discussion (GD) में हर participant को 20-30 seconds में खुद को introduce करना होता है — नाम, education, और topic पर एक line की राय एक साथ। संक्षिप्त और confident होना ज़रूरी है।",
    formula: "I'm [Name], a [degree] graduate, and I believe [one-line opinion on topic].",
    examples: [
      { english: "I'm Simran, a B.Com graduate, and I believe technology has made communication easier but also more distracting.", hindi: "मैं सिमरन हूँ, B.Com graduate, और मेरा मानना है कि technology ने communication आसान बना दिया है पर distraction भी बढ़ाया है।" },
      { english: "I'm Gaurav, an engineering student, and I'd like to add a point to what the previous speaker said.", hindi: "मैं गौरव हूँ, engineering का student, और मैं पिछले speaker की बात में एक point जोड़ना चाहूँगा।" }
    ]
  },
  {
    id: 'confidence-body-language',
    title: 'Confidence & Body Language Tips While Introducing Yourself',
    hindiTitle: 'Introduction देते समय Confidence और Body Language',
    explanation: "सिर्फ सही sentences बोलना काफी नहीं है — eye contact रखना, सीधे खड़े होना, हल्की मुस्कान और firm handshake आपकी introduction को और प्रभावी बनाते हैं। बहुत तेज़ या बहुत धीरे बोलने से बचें, natural pace रखें।",
    formula: "Eye contact + Smile + Steady pace + Firm handshake = Confident introduction",
    examples: [
      { english: "Maintain eye contact while saying your name — it shows confidence.", hindi: "अपना नाम बोलते समय eye contact रखें — यह confidence दिखाता है।" },
      { english: "Take a deep breath before you start speaking to avoid sounding nervous.", hindi: "बोलना शुरू करने से पहले गहरी साँस लें ताकि नर्वस न लगें।" },
      { english: "A genuine smile makes your introduction more memorable.", hindi: "एक असली मुस्कान आपकी introduction को यादगार बनाती है।" }
    ]
  },
  {
    id: 'introduction-mistakes-part2',
    title: 'More Common Mistakes in Self Introduction',
    hindiTitle: 'Self Introduction में और भी सामान्य गलतियां',
    explanation: "6) 'I am doing job in a company' ❌ → 'I work at a company' या 'I am working at a company' ✅. 7) 'My good name is' ❌ → 'My name is' ✅ ('good name' Hindi का direct translation है, English में unnecessary है). 8) 'I am from Delhi city' ❌ → 'I am from Delhi' ✅ (city शब्द जोड़ने की ज़रूरत नहीं). 9) 'I am fresher' ❌ → 'I am a fresher' ✅ (article ज़रूरी है). 10) 'I have family of 5 members' ❌ → 'I have a family of 5 members' या 'There are 5 members in my family' ✅.",
    formula: "Never add unnecessary words like 'good name' or 'city' after a proper noun",
    examples: [
      { english: "I work at a company.", hindi: "गलत: I am doing job in a company." },
      { english: "My name is Sunita.", hindi: "गलत: My good name is Sunita." },
      { english: "I am from Delhi.", hindi: "गलत: I am from Delhi city." },
      { english: "I am a fresher.", hindi: "गलत: I am fresher." }
    ]
  },
  {
    id: 'formal-vs-informal',
    title: 'Formal vs Informal Introduction — Choosing the Right Tone',
    hindiTitle: 'Formal और Informal Introduction में फर्क',
    explanation: "Situation के हिसाब से tone बदलना ज़रूरी है। Interview/business meeting में formal English (contractions जैसे 'I'm' से बचें, पूरा 'I am' इस्तेमाल करें) और दोस्तों/social situations में informal English (contractions ठीक हैं) इस्तेमाल होती है।",
    formula: "Formal: 'I am...' | Informal: 'I'm...'",
    examples: [
      { english: "Formal: Good morning, sir. I am Rakesh Gupta, and I represent the sales team.", hindi: "Formal: सुप्रभात सर, मैं राकेश गुप्ता हूँ और मैं sales team का representative हूँ।" },
      { english: "Informal: Hey, I'm Rakesh! Nice to meet you.", hindi: "Informal: हे, मैं राकेश हूँ! आपसे मिलकर अच्छा लगा।" }
    ]
  }
];

const lessons = readJSON('lessons.json');
const existingLessonIds = new Set(lessons.sections.map(s => s.id));
for (const sec of newLessonSections) {
  if (!existingLessonIds.has(sec.id)) lessons.sections.push(sec);
}
writeJSON('lessons.json', lessons);

// ----------------------------------------------------------------------------
// 2) SPEAKING-DRILL.JSON — add more drill categories on top of the existing 5
// ----------------------------------------------------------------------------
const newDrills = [
  {
    id: 6,
    type: 'phone',
    title: 'Phone Call Introduction — Speak Naturally',
    sentences: [
      { english: 'Hello, this is Rohan speaking from ABC Solutions.', hindi: 'नमस्ते, मैं रोहन बोल रहा हूँ ABC Solutions से।', pronunciation: 'he-LO, this is RO-han SPEAK-ing.' },
      { english: 'May I know who is calling, please?', hindi: 'क्या मैं जान सकता हूँ कि कौन बोल रहा है?', pronunciation: 'may I KNOW who is CALL-ing, please?' },
      { english: 'I am returning your call regarding the interview.', hindi: 'मैं interview के बारे में आपका call वापस कर रहा हूँ।', pronunciation: 'I am re-TURN-ing your CALL re-GARD-ing the IN-ter-view.' }
    ]
  },
  {
    id: 7,
    type: 'online_meeting',
    title: 'Online Meeting Introduction — Speak Naturally',
    sentences: [
      { english: "Hi everyone, I'm Neha, I'll be presenting today.", hindi: 'नमस्ते सभी, मैं नेहा हूँ, आज मैं present करूँगी।', pronunciation: "hi EV-ry-one, I'm NEH-a." },
      { english: 'Can everyone see my screen?', hindi: 'क्या सभी को मेरी screen दिख रही है?', pronunciation: 'can EV-ry-one see my SCREEN?' },
      { english: "I'll quickly introduce myself before we begin.", hindi: 'शुरू करने से पहले मैं जल्दी introduce करता हूँ।', pronunciation: "I'll QUICK-ly in-tro-DUCE my-SELF." }
    ]
  },
  {
    id: 8,
    type: 'group_discussion',
    title: 'Group Discussion Introduction — Speak Naturally',
    sentences: [
      { english: "I'm Simran, a B.Com graduate.", hindi: 'मैं सिमरन हूँ, B.Com graduate।', pronunciation: "I'm sim-RAN, a B COM GRAD-u-ate." },
      { english: "I'd like to add a point to what the previous speaker said.", hindi: 'मैं पिछले speaker की बात में एक point जोड़ना चाहूँगा।', pronunciation: "I'd LIKE to ADD a POINT." }
    ]
  },
  {
    id: 9,
    type: 'interview_pitch',
    title: 'Interview 30-Second Elevator Pitch — Speak Aloud',
    sentences: [
      { english: 'Good morning, sir. My name is Rakesh Gupta, and I have three years of experience in sales.', hindi: 'सुप्रभात सर, मेरा नाम राकेश गुप्ता है, और मुझे sales में तीन साल का अनुभव है।', pronunciation: 'good MORN-ing sir. My NAME is ra-KESH GUP-ta.' },
      { english: 'I am a quick learner and I enjoy working in a team.', hindi: 'मैं जल्दी सीखता हूँ और team में काम करना पसंद करता हूँ।', pronunciation: 'I am a QUICK LEARN-er.' }
    ]
  },
  {
    id: 10,
    type: 'error_correction_speaking',
    title: 'Speak the CORRECT Version Aloud (Error Correction Drill)',
    sentences: [
      { english: 'I belong to Mumbai. (not: I am belongs to Mumbai)', hindi: 'सही: मैं मुंबई से हूँ।', pronunciation: 'I be-LONG to MUM-bai.' },
      { english: 'I have three years of experience. (not: I have three year experience)', hindi: 'सही: मुझे तीन साल का अनुभव है।', pronunciation: 'I have THREE YEARS of ex-PEER-i-ence.' },
      { english: 'My name is Sunita. (not: My good name is Sunita)', hindi: 'सही: मेरा नाम सुनीता है।', pronunciation: 'My NAME is su-NEE-ta.' }
    ]
  }
];
const drills = readJSON('speaking-drill.json');
const existingDrillIds = new Set(drills.drills.map(d => d.id));
for (const d of newDrills) {
  if (!existingDrillIds.has(d.id)) drills.drills.push(d);
}
writeJSON('speaking-drill.json', drills);

// ----------------------------------------------------------------------------
// 3) WRITING-EXERCISE.JSON — add more writing tasks (6-onwards)
// ----------------------------------------------------------------------------
const newWritingTasks = [
  { id: 6, type: 'guided', prompt: 'Write a phone-call introduction script for calling a client for the first time.', hindiPrompt: 'किसी client को पहली बार call करने के लिए एक phone introduction script लिखें।', sampleAnswer: "Hello, this is Aman calling from XYZ Pvt Ltd. Am I speaking with Mr. Verma? I'm calling regarding the proposal we sent last week.", wordLimit: 60 },
  { id: 7, type: 'guided', prompt: "Write an introduction message to send in a new WhatsApp/Slack work group.", hindiPrompt: 'एक नए WhatsApp/Slack work group में भेजने के लिए एक introduction message लिखें।', sampleAnswer: "Hi everyone! I'm Neha, the new UI/UX designer joining the team this week. Looking forward to working with all of you.", wordLimit: 50 },
  { id: 8, type: 'guided', prompt: 'Write a LinkedIn "About" section introducing yourself professionally.', hindiPrompt: 'अपना LinkedIn "About" section professionally लिखें।', sampleAnswer: "I'm a data analyst with 3 years of experience in the fintech industry, skilled in Python and SQL. Passionate about turning data into actionable insights. Open to new opportunities in analytics.", wordLimit: 100 },
  { id: 9, type: 'guided', prompt: 'Write your first-day-of-college introduction to your new classmates.', hindiPrompt: 'College के पहले दिन नए classmates को दिया जाने वाला introduction लिखें।', sampleAnswer: "Hi everyone, I'm Kartikeya from Kanpur. I completed my schooling from DAV Public School. I'm excited to be here and hope to make many new friends.", wordLimit: 60 },
  { id: 10, type: 'free', prompt: 'Write a 30-second group discussion opening introducing yourself and giving one opinion on the topic "Social Media: Boon or Bane".', hindiPrompt: '"Social Media: Boon or Bane" topic पर एक 30-second group discussion opening लिखें जिसमें अपना introduction और एक opinion शामिल हो।', sampleAnswer: null, wordLimit: 60 },
  { id: 11, type: 'free', prompt: 'Correct these 5 sentences and rewrite them: "I am belongs to Pune.", "My good name is Kiran.", "I have two year experience.", "I am fresher.", "I am from Delhi city."', hindiPrompt: 'इन 5 गलत sentences को सही करके फिर से लिखें।', sampleAnswer: null, wordLimit: 60 },
  { id: 12, type: 'free', prompt: 'Write two versions of your introduction — one formal (for an interview) and one informal (for a new friend).', hindiPrompt: 'अपने introduction के दो versions लिखें — एक formal (interview के लिए) और एक informal (नए दोस्त के लिए)।', sampleAnswer: null, wordLimit: 100 }
];
const writing = readJSON('writing-exercise.json');
const existingWritingIds = new Set(writing.tasks.map(t => t.id));
for (const t of newWritingTasks) {
  if (!existingWritingIds.has(t.id)) writing.tasks.push(t);
}
writeJSON('writing-exercise.json', writing);

// ----------------------------------------------------------------------------
// 4) LISTENING-EXERCISE.JSON — more fill-in-blank items + extra dictation
//    passages
// ----------------------------------------------------------------------------
const newListeningExercises = [
  { id: 6, audioText: 'Hello, this is Rohan speaking from ABC Solutions.', hindi: 'नमस्ते, मैं रोहन बोल रहा हूँ ABC Solutions से।', fillInBlank: 'Hello, this is _____ speaking from ABC _____.', answer: ['Rohan', 'Solutions'] },
  { id: 7, audioText: "Hi everyone, I'll be presenting the report today.", hindi: 'नमस्ते सभी, आज मैं report present करूँगी।', fillInBlank: "Hi everyone, I'll be _____ the _____ today.", answer: ['presenting', 'report'] },
  { id: 8, audioText: "I'm a data analyst with three years of experience.", hindi: 'मैं एक data analyst हूँ, तीन साल का अनुभव है।', fillInBlank: "I'm a data _____ with three years of _____.", answer: ['analyst', 'experience'] },
  { id: 9, audioText: 'I completed my schooling from DAV Public School.', hindi: 'मैंने अपनी schooling DAV Public School से पूरी की।', fillInBlank: 'I completed my _____ from DAV Public _____.', answer: ['schooling', 'School'] },
  { id: 10, audioText: 'I am a fresher looking for my first job opportunity.', hindi: 'मैं एक fresher हूँ, अपनी पहली job opportunity ढूँढ रहा हूँ।', fillInBlank: 'I am a _____ looking for my first job _____.', answer: ['fresher', 'opportunity'] }
];
const listening = readJSON('listening-exercise.json');
const existingListeningIds = new Set(listening.exercises.map(e => e.id));
for (const e of newListeningExercises) {
  if (!existingListeningIds.has(e.id)) listening.exercises.push(e);
}
if (!listening.dictationPassages) {
  listening.dictationPassages = [listening.dictationPassage].filter(Boolean);
}
listening.dictationPassages.push(
  {
    text: "Good afternoon everyone. This is Aman speaking, calling from the HR department. I'm reaching out regarding your interview scheduled for next Monday at 10 AM. Please confirm your availability at your earliest convenience. Thank you.",
    hindi: "नमस्ते सभी को। मैं अमन बोल रहा हूँ, HR department से। मैं आपके interview के बारे में call कर रहा हूँ जो अगले सोमवार सुबह 10 बजे है। कृपया जल्द से जल्द अपनी availability confirm करें। धन्यवाद।"
  },
  {
    text: "Hi everyone, I'm Kartikeya from Kanpur. I completed my schooling from DAV Public School and I'm now pursuing a B.Tech in Computer Science. In my free time, I enjoy playing chess and reading science fiction novels. I'm really excited to be part of this college.",
    hindi: "नमस्ते सभी, मैं कार्तिकेय हूँ, कानपुर से। मैंने अपनी schooling DAV Public School से पूरी की और अभी Computer Science में B.Tech कर रहा हूँ। खाली समय में मुझे शतरंज खेलना और science fiction novels पढ़ना पसंद है। मैं इस college का हिस्सा बनकर बहुत उत्साहित हूँ।"
  }
);
writeJSON('listening-exercise.json', listening);

// ----------------------------------------------------------------------------
// 5) READING-EXERCISE.JSON — add 4 more reading passages with comprehension
//    questions on top of the existing "Successful Job Interview" passage
// ----------------------------------------------------------------------------
const readingPassage2 = {
  title: 'A First Day at a New Office',
  text: "Neha walked into her new office feeling both nervous and excited. Her manager, Mr. Kapoor, greeted her warmly. 'Welcome aboard! Let's introduce you to the team.' Neha stood up and said, 'Hi everyone, I'm Neha Sharma, the new marketing executive. I graduated from Pune University with a degree in Business Administration. Before joining here, I worked as a marketing intern for one year. I'm really excited to be part of this team and I look forward to learning from all of you.' Her colleague, Rohit, smiled and said, 'Great to have you, Neha! If you have any questions, feel free to ask me anytime.' By the end of the day, Neha felt much more comfortable in her new workplace.",
  hindiTranslation: "नेहा अपने नए office में घबराई हुई और उत्साहित दोनों feel कर रही थी। उसके manager, श्री कपूर ने उसका गर्मजोशी से स्वागत किया। 'स्वागत है! चलिए आपको team से मिलवाते हैं।' नेहा खड़ी हुई और बोली, 'नमस्ते सभी, मैं नेहा शर्मा हूँ, नई marketing executive। मैंने Pune University से Business Administration में डिग्री ली है। यहाँ join करने से पहले मैंने एक साल marketing intern के रूप में काम किया। मैं इस team का हिस्सा बनकर बहुत उत्साहित हूँ और आप सभी से सीखने का इंतज़ार कर रही हूँ।' उसके colleague, रोहित ने मुस्कुराते हुए कहा, 'आपका स्वागत है नेहा! अगर कोई सवाल हो तो कभी भी पूछ सकती हो।' दिन के अंत तक नेहा अपने नए workplace में काफी comfortable महसूस करने लगी।"
};
const readingPassage2Questions = [
  { id: 6, question: "What is Neha's new job title?", hindi: 'नेहा की नई job title क्या है?', options: ['HR Executive', 'Marketing Executive', 'Software Engineer', 'Accountant'], answer: 'Marketing Executive' },
  { id: 7, question: 'Which university did Neha graduate from?', hindi: 'नेहा ने किस university से graduation किया?', options: ['Delhi University', 'Pune University', 'Mumbai University', 'Chennai University'], answer: 'Pune University' },
  { id: 8, question: 'What was Neha doing before joining this company?', hindi: 'नेहा इस company में join करने से पहले क्या कर रही थी?', options: ['Studying', 'Marketing Intern', 'Teaching', 'Freelancing'], answer: 'Marketing Intern' },
  { id: 9, question: 'How did Neha feel by the end of the day?', hindi: 'दिन के अंत तक नेहा कैसा feel कर रही थी?', options: ['Nervous', 'Angry', 'Comfortable', 'Confused'], answer: 'Comfortable' },
  { id: 10, question: 'Who welcomed Neha to the team?', hindi: 'नेहा का team में किसने स्वागत किया?', options: ['Mr. Kapoor', 'Rohit', 'Both Mr. Kapoor and Rohit', 'No one'], answer: 'Both Mr. Kapoor and Rohit' }
];

const readingPassage3 = {
  title: 'Meeting an Old Friend Online',
  text: "Vikas logged into the video call, and there was Simran, a friend he hadn't seen in years. 'Vikas! Is that really you?' Simran exclaimed. 'Yes, it's me!' Vikas laughed. 'Let me properly introduce myself again — I'm Vikas Malhotra, currently working as a project manager in Bangalore. I got married last year and I have a two-year-old daughter now.' Simran smiled, 'Wow, so much has changed! I'm still in Jaipur, running my own boutique. Life has been good.' They spent the next hour catching up on old memories and sharing their new lives.",
  hindiTranslation: "विकास video call में login हुआ और वहाँ सिमरन थी, एक दोस्त जिसे उसने सालों से नहीं देखा था। 'विकास! क्या यह सच में तुम हो?' सिमरन ने कहा। 'हाँ, यह मैं हूँ!' विकास हँसा। 'चलो मैं फिर से अपना परिचय देता हूँ — मैं विकास मल्होत्रा हूँ, अभी बैंगलोर में project manager के रूप में काम कर रहा हूँ। पिछले साल मेरी शादी हुई और अब मेरी दो साल की बेटी है।' सिमरन मुस्कुराई, 'वाह, कितना कुछ बदल गया है! मैं अभी भी जयपुर में हूँ, अपनी boutique चला रही हूँ। ज़िंदगी अच्छी रही है।' उन्होंने अगला एक घंटा पुरानी यादों और अपनी नई ज़िंदगी के बारे में बात करते हुए बिताया।"
};
const readingPassage3Questions = [
  { id: 11, question: 'Where does Vikas currently work?', hindi: 'विकास अभी कहाँ काम करता है?', options: ['Jaipur', 'Bangalore', 'Delhi', 'Pune'], answer: 'Bangalore' },
  { id: 12, question: "What is Vikas's job title?", hindi: 'विकास की job title क्या है?', options: ['Software Engineer', 'Project Manager', 'Teacher', 'Doctor'], answer: 'Project Manager' },
  { id: 13, question: 'What does Simran run in Jaipur?', hindi: 'सिमरन जयपुर में क्या चलाती है?', options: ['A restaurant', 'A boutique', 'A school', 'A hospital'], answer: 'A boutique' },
  { id: 14, question: "How old is Vikas's daughter?", hindi: 'विकास की बेटी कितने साल की है?', options: ['One year', 'Two years', 'Three years', 'Four years'], answer: 'Two years' }
];

const reading = readJSON('reading-exercise.json');
if (!reading.passages) {
  reading.passages = [{ ...reading.passage, comprehensionQuestions: reading.comprehensionQuestions }];
}
const existingPassageTitles = new Set(reading.passages.map(p => p.title));
if (!existingPassageTitles.has(readingPassage2.title)) {
  reading.passages.push({ ...readingPassage2, comprehensionQuestions: readingPassage2Questions });
}
if (!existingPassageTitles.has(readingPassage3.title)) {
  reading.passages.push({ ...readingPassage3, comprehensionQuestions: readingPassage3Questions });
}
writeJSON('reading-exercise.json', reading);

// ----------------------------------------------------------------------------
// 6) REVISION.JSON — expand key points, quick quiz and must-remember rules
// ----------------------------------------------------------------------------
const newQuickQuiz = [
  { id: 6, question: "Fix this sentence: 'My good name is Sunita.'", answer: 'My name is Sunita.' },
  { id: 7, question: "Fix this sentence: 'I am doing job in a company.'", answer: 'I work at a company.' },
  { id: 8, question: 'Translate: मैं जल्दी सीखता हूँ और team में काम करना पसंद करता हूँ।', answer: 'I am a quick learner and I enjoy working in a team.' },
  { id: 9, question: "Fix this sentence: 'I am fresher.'", answer: 'I am a fresher.' },
  { id: 10, question: 'Translate: नमस्ते, मैं रोहन बोल रहा हूँ ABC Solutions से।', answer: 'Hello, this is Rohan speaking from ABC Solutions.' },
  { id: 11, question: "Fix this sentence: 'I am from Delhi city.'", answer: 'I am from Delhi.' },
  { id: 12, question: 'Translate: क्या सभी को मेरी screen दिख रही है?', answer: 'Can everyone see my screen?' },
  { id: 13, question: 'What is the correct pattern for stating experience? Fill: I have been ______ (work) here for two years.', answer: 'working' },
  { id: 14, question: "Fix this sentence: 'I have two year experience.'", answer: 'I have two years of experience.' },
  { id: 15, question: 'Translate: मैं अपना खुद का business चलाता हूँ।', answer: 'I run my own business.' }
];
const newKeyPoints = [
  "Phone introduction: 'This is [Name] speaking' — very common formal phone opener",
  "Online meeting introduction: 'Hi everyone, I'm [Name], I'll be [role]'",
  "LinkedIn/networking introduction focuses on job title + years of experience + interest",
  "Group discussion introduction must be short (20-30 seconds): name + degree + one opinion",
  "Formal tone avoids contractions ('I am' not 'I'm'); informal tone allows them",
  "Avoid unnecessary words: 'good name', 'city' after a proper noun, missing articles before job titles"
];
const newMustRememberRules = [
  "On the phone, say 'This is [Name] speaking', not 'I am [Name] speaking'",
  "Never say 'my good name is' — just 'my name is'",
  "'Fresher' always needs an article: 'a fresher', not 'fresher'",
  "Don't add 'city' after a place name that's already a city: 'I am from Delhi', not 'Delhi city'"
];
const revision = readJSON('revision.json');
const existingQuizIds = new Set(revision.quickQuiz.map(q => q.id));
for (const q of newQuickQuiz) {
  if (!existingQuizIds.has(q.id)) revision.quickQuiz.push(q);
}
for (const kp of newKeyPoints) {
  if (!revision.keyPointsSummary.includes(kp)) revision.keyPointsSummary.push(kp);
}
for (const r of newMustRememberRules) {
  if (!revision.mustRememberRules.includes(r)) revision.mustRememberRules.push(r);
}
writeJSON('revision.json', revision);

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log('Day 2 extras expanded:');
console.log('  lessons.json sections:', lessons.sections.length);
console.log('  speaking-drill.json drills:', drills.drills.length);
console.log('  writing-exercise.json tasks:', writing.tasks.length);
console.log('  listening-exercise.json exercises:', listening.exercises.length, '| dictation passages:', listening.dictationPassages.length);
console.log('  reading-exercise.json passages:', reading.passages.length);
console.log('  revision.json quickQuiz:', revision.quickQuiz.length, '| keyPoints:', revision.keyPointsSummary.length, '| mustRememberRules:', revision.mustRememberRules.length);
