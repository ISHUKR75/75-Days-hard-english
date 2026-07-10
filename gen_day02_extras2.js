#!/usr/bin/env node
// ============================================================================
// gen_day02_extras2.js
// Second additive expansion pass for Day 2 — "Self Introduction".
// Adds even more lesson sections, speaking drills, writing tasks, listening
// exercises, reading passages and revision quiz items on top of what
// gen_day02_v2.js + gen_day02_extras.js already produced.
// ADDITIVE ONLY — nothing is removed from any existing file.
// Run with: node gen_day02_extras2.js
// ============================================================================
const fs = require('fs');
const path = require('path');
const OUT = 'data/challenge/day-02';
const readJSON = (f) => JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
const writeJSON = (f, d) => fs.writeFileSync(path.join(OUT, f), JSON.stringify(d, null, 2) + '\n');

// ---------------------------------------------------------------------------
// 1) LESSONS — 8 more real-life self-introduction situations
// ---------------------------------------------------------------------------
const moreLessons = [
  {
    id: 'email-intro',
    title: 'Introducing Yourself in a Professional Email',
    hindiTitle: 'Professional Email mein Introduction',
    explanation: "Email introduction likhte samay pehli line mein hi apna naam aur reason for writing batana chahiye. Subject line clear honi chahiye. Closing mein 'Best regards' ya 'Warm regards' jaisa professional sign-off use karein.",
    formula: "Dear [Name], My name is [Your Name], and I am writing to [reason].",
    examples: [
      { english: "Dear Mr. Sharma, My name is Aditya Verma, and I am writing to introduce myself as the new project coordinator.", hindi: "प्रिय श्री शर्मा, मेरा नाम आदित्य वर्मा है, और मैं नए project coordinator के रूप में अपना परिचय देने के लिए लिख रहा हूँ।" },
      { english: "I look forward to working closely with your team in the coming months.", hindi: "मैं आने वाले महीनों में आपकी team के साथ मिलकर काम करने का इंतज़ार कर रहा हूँ।" },
      { english: "Please feel free to reach out if you have any questions.", hindi: "अगर कोई सवाल हो तो बेझिझक संपर्क करें।" }
    ]
  },
  {
    id: 'social-gathering-intro',
    title: 'Introducing Yourself at a Social Gathering / Party',
    hindiTitle: 'Party ya Social Gathering mein Introduction',
    explanation: "Social gatherings mein introduction light aur friendly hota hai. Naam ke baad aap kaise jaante hain host ko, ya kya kaam karte hain, halka sa bata sakte hain — lekin bahut zyada detail dena zaroori nahi.",
    formula: "Hi, I'm [Name]. I'm a friend of [Host's name] / I work with [Host's name].",
    examples: [
      { english: "Hi, I'm Isha. I'm a friend of Rohan's from college.", hindi: "नमस्ते, मैं ईशा हूँ। मैं रोहन की college की दोस्त हूँ।" },
      { english: "Nice to meet you! I don't think we've met before.", hindi: "आपसे मिलकर अच्छा लगा! मुझे नहीं लगता हम पहले मिले हैं।" },
      { english: "I work with Rohan at the same company.", hindi: "मैं रोहन के साथ उसी company में काम करता हूँ।" }
    ]
  },
  {
    id: 'customer-service-intro',
    title: 'Introducing Yourself as a Customer Service Representative',
    hindiTitle: 'Customer Service Representative ke roop mein Introduction',
    explanation: "Customer service calls mein introduction short aur clear hona chahiye — naam, company, aur kaise madad kar sakte hain. Polite tone bahut zaroori hai.",
    formula: "Thank you for calling [Company]. My name is [Name]. How may I help you today?",
    examples: [
      { english: "Thank you for calling QuickFix Support. My name is Deepak. How may I help you today?", hindi: "QuickFix Support को call करने के लिए धन्यवाद। मेरा नाम दीपक है। मैं आपकी कैसे मदद कर सकता हूँ?" },
      { english: "My name is Anjali, and I'll be assisting you with your query.", hindi: "मेरा नाम अंजलि है, और मैं आपके सवाल में मदद करूँगी।" }
    ]
  },
  {
    id: 'teacher-intro',
    title: "Introducing Yourself as a Teacher/Trainer on Day One",
    hindiTitle: 'Teacher/Trainer ke roop mein pehle din Introduction',
    explanation: "Teacher ya trainer apna introduction dete waqt apni qualification, subject aur teaching style ke baare mein bataate hain taaki students comfortable feel karein.",
    formula: "Good morning, class. I'm [Name], and I'll be your [subject] teacher this year.",
    examples: [
      { english: "Good morning class, I'm Mrs. Kavita Rao, and I'll be your English teacher this year.", hindi: "सुप्रभात class, मैं श्रीमती कविता राव हूँ, और इस साल मैं आपकी English teacher रहूँगी।" },
      { english: "I have been teaching for over eight years and I love making grammar fun.", hindi: "मैं आठ सालों से ज़्यादा समय से पढ़ा रही हूँ और मुझे grammar को मज़ेदार बनाना पसंद है।" }
    ]
  },
  {
    id: 'business-meeting-intro',
    title: 'Introducing Yourself and Your Company in a Business Meeting',
    hindiTitle: 'Business Meeting mein Apna aur Company ka Introduction',
    explanation: "Business meetings mein introduction mein apna designation, company ka naam aur meeting ka purpose short mein cover karna chahiye.",
    formula: "Good morning everyone, I'm [Name], [designation] at [Company]. We're here to discuss [purpose].",
    examples: [
      { english: "Good morning everyone, I'm Rakesh Gupta, Sales Head at ABC Textiles. We're here to discuss the new partnership.", hindi: "सुप्रभात सभी, मैं राकेश गुप्ता हूँ, ABC Textiles में Sales Head। हम नए partnership पर चर्चा करने आए हैं।" },
      { english: "On behalf of my team, I'd like to thank you for this opportunity.", hindi: "अपनी team की तरफ से, मैं इस अवसर के लिए धन्यवाद देना चाहूँगा।" }
    ]
  },
  {
    id: 'introduction-mistakes-part3',
    title: 'Even More Common Mistakes in Self Introduction',
    hindiTitle: 'Self Introduction ki Aur Bhi Common Galtiyan',
    explanation: "11) 'I am married since 2020' ❌ → 'I have been married since 2020' ✅. 12) 'I am staying in Delhi' (for permanent residence) ❌ → 'I live in Delhi' ✅ ('staying' temporary ke liye use hota hai). 13) 'I am agree with introduction format' ❌ → 'I agree with the introduction format' ✅ ('agree' verb hai, 'am' ki zaroorat nahi). 14) 'She is my best friend since childhood' ❌ → 'She has been my best friend since childhood' ✅.",
    formula: "Use present perfect ('have been') for actions/states continuing from the past to now",
    examples: [
      { english: "I have been married since 2020.", hindi: "गलत: I am married since 2020." },
      { english: "I live in Delhi.", hindi: "गलत (permanent ke liye): I am staying in Delhi." },
      { english: "I agree with this.", hindi: "गलत: I am agree with this." }
    ]
  },
  {
    id: 'introduction-do-dont',
    title: "Do's and Don'ts Checklist for a Strong Self Introduction",
    hindiTitle: 'Strong Self Introduction ke liye Do\'s and Don\'ts',
    explanation: "DO: Naam clearly bolein, eye contact rakhein, positive tone rakhein, situation ke hisaab se tone adjust karein. DON'T: Bahut lamba introduction na dein, negative baatein na karein (jaise 'I am not good at English'), fillers jaise 'um', 'like' bahut zyada use na karein.",
    formula: "DO: Clear + Confident + Concise | DON'T: Long + Negative + Filled with 'um/like'",
    examples: [
      { english: "Do: Keep your introduction under 30-60 seconds unless asked for more detail.", hindi: "करें: अपना introduction 30-60 seconds के अंदर रखें जब तक ज़्यादा detail न माँगी जाए।" },
      { english: "Don't: Avoid saying 'I am not good at English' — it creates a negative impression.", hindi: "न करें: 'I am not good at English' कहने से बचें — यह negative impression बनाता है।" }
    ]
  },
  {
    id: 'cultural-notes',
    title: 'Cultural Notes: Indian vs Western Introduction Styles',
    hindiTitle: 'Cultural Notes: Indian aur Western Introduction Styles mein Farak',
    explanation: "India mein introduction mein family background aur native place batana common hai, jabki Western context mein professional achievements aur hobbies par zyada focus hota hai. Interview jaise formal settings mein Western style (professional-focused) follow karna behtar hota hai.",
    formula: "Indian style: Name + Family + Native place | Western/professional style: Name + Role + Achievement",
    examples: [
      { english: "Indian style: I am Rohan Sharma, from a small town called Rewa, and I come from a family of teachers.", hindi: "Indian style: मैं रोहन शर्मा हूँ, रीवा नाम के एक छोटे शहर से, और मैं शिक्षकों के परिवार से हूँ।" },
      { english: "Western/professional style: I'm Rohan Sharma, a software engineer with expertise in cloud computing.", hindi: "Western/professional style: मैं रोहन शर्मा हूँ, cloud computing में expertise रखने वाला software engineer।" }
    ]
  }
];
const lessons = readJSON('lessons.json');
const existingIds = new Set(lessons.sections.map(s => s.id));
for (const s of moreLessons) if (!existingIds.has(s.id)) lessons.sections.push(s);
writeJSON('lessons.json', lessons);

// ---------------------------------------------------------------------------
// 2) SPEAKING DRILLS — 5 more categories
// ---------------------------------------------------------------------------
const moreDrills = [
  { id: 11, type: 'email_reading_aloud', title: 'Read Aloud: Email Introduction', sentences: [
    { english: 'Dear Mr. Sharma, my name is Aditya Verma.', hindi: 'प्रिय श्री शर्मा, मेरा नाम आदित्य वर्मा है।', pronunciation: 'dear MIS-ter SHAR-ma, my NAME is a-DIT-ya VER-ma.' },
    { english: 'I look forward to working closely with your team.', hindi: 'मैं आपकी team के साथ काम करने का इंतज़ार कर रहा हूँ।', pronunciation: 'I look FOR-ward to WORK-ing CLOSE-ly.' }
  ]},
  { id: 12, type: 'party_intro', title: 'Speak Naturally: Party / Social Gathering', sentences: [
    { english: "Hi, I'm Isha. I'm a friend of Rohan's from college.", hindi: 'नमस्ते, मैं ईशा हूँ। मैं रोहन की कॉलेज की दोस्त हूँ।', pronunciation: "hi, I'm EE-sha." },
    { english: "Nice to meet you! I don't think we've met before.", hindi: 'आपसे मिलकर अच्छा लगा!', pronunciation: 'nice to MEET you!' }
  ]},
  { id: 13, type: 'customer_service', title: 'Speak Naturally: Customer Service Introduction', sentences: [
    { english: 'Thank you for calling QuickFix Support. My name is Deepak.', hindi: 'QuickFix Support को call करने के लिए धन्यवाद। मेरा नाम दीपक है।', pronunciation: 'thank you for CALL-ing QUICK-fix sup-PORT.' },
    { english: 'How may I help you today?', hindi: 'मैं आपकी कैसे मदद कर सकता हूँ?', pronunciation: 'how MAY I help you to-DAY?' }
  ]},
  { id: 14, type: 'teacher_intro', title: 'Speak Naturally: Teacher / Trainer Introduction', sentences: [
    { english: "Good morning class, I'm Mrs. Kavita Rao.", hindi: 'सुप्रभात class, मैं श्रीमती कविता राव हूँ।', pronunciation: 'good MORN-ing class.' },
    { english: 'I have been teaching for over eight years.', hindi: 'मैं आठ सालों से पढ़ा रही हूँ।', pronunciation: 'I have BEEN TEACH-ing for O-ver eight years.' }
  ]},
  { id: 15, type: 'business_meeting', title: 'Speak Naturally: Business Meeting Introduction', sentences: [
    { english: "I'm Rakesh Gupta, Sales Head at ABC Textiles.", hindi: 'मैं राकेश गुप्ता हूँ, ABC Textiles में Sales Head।', pronunciation: "I'm ra-KESH GUP-ta, SALES head." },
    { english: "We're here to discuss the new partnership.", hindi: 'हम नए partnership पर चर्चा करने आए हैं।', pronunciation: "we're HERE to dis-CUSS the new PART-ner-ship." }
  ]}
];
const drills = readJSON('speaking-drill.json');
const existingDrillIds = new Set(drills.drills.map(d => d.id));
for (const d of moreDrills) if (!existingDrillIds.has(d.id)) drills.drills.push(d);
writeJSON('speaking-drill.json', drills);

// ---------------------------------------------------------------------------
// 3) WRITING TASKS — 5 more
// ---------------------------------------------------------------------------
const moreWriting = [
  { id: 13, type: 'guided', prompt: 'Write a professional email introducing yourself as a new project coordinator.', hindiPrompt: 'एक नए project coordinator के रूप में अपना professional email introduction लिखें।', sampleAnswer: "Dear Team, My name is Aditya Verma, and I am writing to introduce myself as the new project coordinator. I look forward to working closely with all of you. Best regards, Aditya", wordLimit: 80 },
  { id: 14, type: 'guided', prompt: 'Write a short introduction you would give at a friend\'s birthday party where you know no one.', hindiPrompt: 'एक दोस्त की birthday party में अपना short introduction लिखें जहाँ आप किसी को नहीं जानते।', sampleAnswer: "Hi, I'm Isha. I'm a friend of Rohan's from college. Nice to meet you all!", wordLimit: 40 },
  { id: 15, type: 'guided', prompt: 'Write a customer-service style opening line for answering a support call.', hindiPrompt: 'Support call उठाने के लिए एक customer-service style opening line लिखें।', sampleAnswer: "Thank you for calling QuickFix Support, my name is Deepak. How may I help you today?", wordLimit: 40 },
  { id: 16, type: 'free', prompt: 'Write your own version of a teacher\'s Day-1 introduction to a new class, including your subject and one fun fact.', hindiPrompt: 'एक teacher की Day-1 introduction अपने शब्दों में लिखें, subject और एक fun fact के साथ।', sampleAnswer: null, wordLimit: 60 },
  { id: 17, type: 'free', prompt: 'Write a business-meeting introduction including your designation, company name, and meeting purpose.', hindiPrompt: 'अपना designation, company का नाम और meeting का purpose शामिल करते हुए एक business-meeting introduction लिखें।', sampleAnswer: null, wordLimit: 60 }
];
const writing = readJSON('writing-exercise.json');
const existingWritingIds = new Set(writing.tasks.map(t => t.id));
for (const t of moreWriting) if (!existingWritingIds.has(t.id)) writing.tasks.push(t);
writeJSON('writing-exercise.json', writing);

// ---------------------------------------------------------------------------
// 4) LISTENING — 5 more fill-in-blank + 2 more dictation passages
// ---------------------------------------------------------------------------
const moreListening = [
  { id: 11, audioText: 'Dear Mr. Sharma, my name is Aditya Verma.', hindi: 'प्रिय श्री शर्मा, मेरा नाम आदित्य वर्मा है।', fillInBlank: 'Dear Mr. Sharma, my _____ is Aditya _____.', answer: ['name', 'Verma'] },
  { id: 12, audioText: 'Thank you for calling QuickFix Support.', hindi: 'QuickFix Support को call करने के लिए धन्यवाद।', fillInBlank: 'Thank you for _____ QuickFix _____.', answer: ['calling', 'Support'] },
  { id: 13, audioText: 'I have been teaching for over eight years.', hindi: 'मैं आठ सालों से पढ़ा रही हूँ।', fillInBlank: 'I have been _____ for over eight _____.', answer: ['teaching', 'years'] },
  { id: 14, audioText: "We're here to discuss the new partnership.", hindi: 'हम नए partnership पर चर्चा करने आए हैं।', fillInBlank: "We're here to _____ the new _____.", answer: ['discuss', 'partnership'] },
  { id: 15, audioText: 'I live in Delhi with my family.', hindi: 'मैं अपने परिवार के साथ दिल्ली में रहता हूँ।', fillInBlank: 'I _____ in Delhi with my _____.', answer: ['live', 'family'] }
];
const listening = readJSON('listening-exercise.json');
const existingListeningIds = new Set(listening.exercises.map(e => e.id));
for (const e of moreListening) if (!existingListeningIds.has(e.id)) listening.exercises.push(e);
listening.dictationPassages.push(
  { text: "Good morning class. I'm Mrs. Kavita Rao, and I'll be your English teacher this year. I have been teaching for over eight years, and I love making grammar fun. I hope we'll have a great year of learning together.", hindi: "सुप्रभात class। मैं श्रीमती कविता राव हूँ, और इस साल मैं आपकी English teacher रहूँगी। मैं आठ सालों से पढ़ा रही हूँ, और मुझे grammar को मज़ेदार बनाना पसंद है। मुझे उम्मीद है हम साथ में एक बढ़िया साल सीखने में बिताएँगे।" },
  { text: "Good morning everyone, I'm Rakesh Gupta, Sales Head at ABC Textiles. On behalf of my team, I'd like to thank you for this opportunity. We're here to discuss the new partnership and explore how we can work together going forward.", hindi: "सुप्रभात सभी, मैं राकेश गुप्ता हूँ, ABC Textiles में Sales Head। अपनी team की तरफ से, मैं इस अवसर के लिए धन्यवाद देना चाहूँगा। हम नए partnership पर चर्चा करने और आगे साथ मिलकर काम करने के तरीके तलाशने आए हैं।" }
);
writeJSON('listening-exercise.json', listening);

// ---------------------------------------------------------------------------
// 5) READING — 2 more passages
// ---------------------------------------------------------------------------
const passage4 = {
  title: 'A New Teacher on the First Day',
  text: "Mrs. Kavita Rao walked into the classroom, feeling both nervous and excited on her first day at the new school. 'Good morning class,' she said with a warm smile, 'I'm Mrs. Kavita Rao, and I'll be your English teacher this year.' The students looked at her curiously. She continued, 'I have been teaching for over eight years, and I love making grammar fun through games and stories.' One student, Rohit, raised his hand and asked, 'Ma'am, what is your favourite book?' Mrs. Rao laughed and replied, 'That's a great question to start with! My favourite book is Pride and Prejudice.' By the end of the class, the students were already looking forward to her next lesson.",
  hindiTranslation: "श्रीमती कविता राव अपने नए school में पहले दिन कक्षा में गईं, घबराई हुई और उत्साहित दोनों। 'सुप्रभात class,' उन्होंने गर्मजोशी से मुस्कुराते हुए कहा, 'मैं श्रीमती कविता राव हूँ, और इस साल मैं आपकी English teacher रहूँगी।' छात्रों ने उत्सुकता से उन्हें देखा। उन्होंने आगे कहा, 'मैं आठ सालों से पढ़ा रही हूँ, और मुझे games और stories के ज़रिए grammar को मज़ेदार बनाना पसंद है।' एक छात्र, रोहित, ने हाथ उठाकर पूछा, 'मैडम, आपकी पसंदीदा किताब कौन सी है?' श्रीमती राव हँसीं और बोलीं, 'शुरुआत के लिए यह बढ़िया सवाल है! मेरी पसंदीदा किताब Pride and Prejudice है।' कक्षा के अंत तक, छात्र पहले से ही उनकी अगली lesson का इंतज़ार करने लगे थे।"
};
const passage4Questions = [
  { id: 15, question: "What subject does Mrs. Kavita Rao teach?", hindi: 'श्रीमती कविता राव कौन सा subject पढ़ाती हैं?', options: ['Maths', 'English', 'Science', 'History'], answer: 'English' },
  { id: 16, question: 'How many years of teaching experience does she have?', hindi: 'उनके पास कितने साल का teaching experience है?', options: ['Five years', 'Six years', 'Over eight years', 'Ten years'], answer: 'Over eight years' },
  { id: 17, question: 'Who asked about her favourite book?', hindi: 'उनकी पसंदीदा किताब के बारे में किसने पूछा?', options: ['Mrs. Rao', 'Rohit', 'The principal', 'No one'], answer: 'Rohit' },
  { id: 18, question: "What is Mrs. Rao's favourite book?", hindi: 'श्रीमती राव की पसंदीदा किताब कौन सी है?', options: ['War and Peace', 'Pride and Prejudice', 'Harry Potter', '1984'], answer: 'Pride and Prejudice' }
];

const passage5 = {
  title: 'Introducing a New Business Partner',
  text: "The conference room was full as Rakesh Gupta stood up to speak. 'Good morning everyone, I'm Rakesh Gupta, Sales Head at ABC Textiles,' he began confidently. 'On behalf of my team, I'd like to thank you for this opportunity. We're here to discuss the new partnership between our companies.' The clients nodded, impressed by his clear and confident introduction. After the meeting, one of the clients, Mr. Iyer, approached him and said, 'Your introduction was very professional, Mr. Gupta. I look forward to working with you.' Rakesh smiled and replied, 'Thank you, Mr. Iyer. I'm looking forward to a successful partnership as well.'",
  hindiTranslation: "Conference room भरा हुआ था जब राकेश गुप्ता बोलने के लिए खड़े हुए। 'सुप्रभात सभी, मैं राकेश गुप्ता हूँ, ABC Textiles में Sales Head,' उन्होंने आत्मविश्वास के साथ शुरुआत की। 'अपनी team की तरफ से, मैं इस अवसर के लिए धन्यवाद देना चाहूँगा। हम अपनी companies के बीच नए partnership पर चर्चा करने आए हैं।' clients ने उनके स्पष्ट और आत्मविश्वासी introduction से प्रभावित होकर सिर हिलाया। meeting के बाद, एक client, श्री अय्यर, ने उनके पास आकर कहा, 'आपका introduction बहुत professional था, श्री गुप्ता। मैं आपके साथ काम करने का इंतज़ार कर रहा हूँ।' राकेश मुस्कुराए और बोले, 'धन्यवाद, श्री अय्यर। मैं भी एक सफल partnership का इंतज़ार कर रहा हूँ।'"
};
const passage5Questions = [
  { id: 19, question: 'What is Rakesh Gupta\'s designation?', hindi: 'राकेश गुप्ता की designation क्या है?', options: ['Marketing Head', 'Sales Head', 'CEO', 'HR Manager'], answer: 'Sales Head' },
  { id: 20, question: 'Which company does Rakesh work for?', hindi: 'राकेश किस company के लिए काम करते हैं?', options: ['ABC Textiles', 'XYZ Solutions', 'QuickFix Support', 'DEF Traders'], answer: 'ABC Textiles' },
  { id: 21, question: 'What was the purpose of the meeting?', hindi: 'meeting का purpose क्या था?', options: ['Hiring', 'New partnership', 'Product launch', 'Salary discussion'], answer: 'New partnership' },
  { id: 22, question: "How did the client, Mr. Iyer, describe Rakesh's introduction?", hindi: 'client, श्री अय्यर ने राकेश के introduction को कैसे describe किया?', options: ['Boring', 'Confusing', 'Very professional', 'Too long'], answer: 'Very professional' }
];

const reading = readJSON('reading-exercise.json');
const existingTitles = new Set(reading.passages.map(p => p.title));
if (!existingTitles.has(passage4.title)) reading.passages.push({ ...passage4, comprehensionQuestions: passage4Questions });
if (!existingTitles.has(passage5.title)) reading.passages.push({ ...passage5, comprehensionQuestions: passage5Questions });
writeJSON('reading-exercise.json', reading);

// ---------------------------------------------------------------------------
// 6) REVISION — more quiz items + key points + rules
// ---------------------------------------------------------------------------
const moreQuiz = [
  { id: 16, question: "Fix this sentence: 'I am agree with this format.'", answer: 'I agree with this format.' },
  { id: 17, question: 'Translate: प्रिय श्री शर्मा, मेरा नाम आदित्य वर्मा है।', answer: 'Dear Mr. Sharma, my name is Aditya Verma.' },
  { id: 18, question: "Fix this sentence: 'I am staying in Delhi' (for a permanent home).", answer: 'I live in Delhi.' },
  { id: 19, question: 'Translate: मैं आठ सालों से पढ़ा रही हूँ।', answer: 'I have been teaching for over eight years.' },
  { id: 20, question: "Fix this sentence: 'I am married since 2020.'", answer: 'I have been married since 2020.' },
  { id: 21, question: 'Translate: हम नए partnership पर चर्चा करने आए हैं।', answer: "We're here to discuss the new partnership." },
  { id: 22, question: 'What should you avoid saying in an introduction to prevent a negative impression? (one phrase)', answer: 'I am not good at English' },
  { id: 23, question: 'Translate: मैं अपने परिवार के साथ दिल्ली में रहता हूँ।', answer: 'I live in Delhi with my family.' }
];
const moreKeyPoints = [
  "Email introduction: state your name and reason for writing in the first line",
  "Social gathering introduction should be light — name + connection to host, not too much detail",
  "Customer service introduction: name + company + how you can help",
  "Business meeting introduction: name + designation + company + purpose of meeting",
  "Use present perfect ('have been') for states continuing from past to present (married, teaching, friends)",
  "Indian introductions often include family/native place; Western/professional style focuses on role and achievement"
];
const moreRules = [
  "'I live in Delhi' is for permanent residence; 'I am staying in Delhi' implies something temporary",
  "'I agree' is already a complete verb — never say 'I am agree'",
  "Use 'have been' + verb-ing/adjective for ongoing states: 'I have been teaching', 'I have been married'"
];
const revision = readJSON('revision.json');
const existingQuizIds = new Set(revision.quickQuiz.map(q => q.id));
for (const q of moreQuiz) if (!existingQuizIds.has(q.id)) revision.quickQuiz.push(q);
for (const kp of moreKeyPoints) if (!revision.keyPointsSummary.includes(kp)) revision.keyPointsSummary.push(kp);
for (const r of moreRules) if (!revision.mustRememberRules.includes(r)) revision.mustRememberRules.push(r);
writeJSON('revision.json', revision);

console.log('Day 2 second expansion pass done:');
console.log('  lessons sections:', lessons.sections.length);
console.log('  speaking drills:', drills.drills.length);
console.log('  writing tasks:', writing.tasks.length);
console.log('  listening exercises:', listening.exercises.length, '| dictation passages:', listening.dictationPassages.length);
console.log('  reading passages:', reading.passages.length);
console.log('  revision quiz:', revision.quickQuiz.length, '| keyPoints:', revision.keyPointsSummary.length, '| rules:', revision.mustRememberRules.length);
