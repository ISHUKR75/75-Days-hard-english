#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

// ─── CONTENT (topic + enriched explanation) ──────────────────────────────────
const topic = {
  title: "Would Like To",
  emoji: "🙏",
  cefr: "A2",
  difficulty: "elementary",
  type: "grammar"
};

const content = {
  explanation: `
**Would Like To — Polite Desire / Request:**

"Would like to" = "Want to" का polite version
यह बहुत ही formal और विनम्र तरीका है कुछ माँगने या इच्छा व्यक्त करने का।

**Want vs Would Like:**
• "I want coffee." → Direct (थोड़ा rude सुनाई दे सकता है)
• "I would like coffee." → Polite ✅
• "I would like to have coffee." → More polite ✅✅

**Structure:**
Subject + **would like** + noun
Subject + **would like to** + base verb

🇮🇳 मैं एक कॉफी लेना चाहूँगा।
🇬🇧 I **would like** a coffee.

**Contracted Form (Short Form):**
I would like → **I'd like**
He would like → **He'd like**
She would like → **She'd like**
We would like → **We'd like**
They would like → **They'd like**

The contracted form ('d like) is more natural in spoken English and is equally polite.

**Question Form:**
Would + Subject + like + (to + base verb / noun)?
• "Would you like some tea?" (noun)
• "Would you like to sit down?" (to + verb)

**Negative Form:**
Subject + would not (wouldn't) like + (to + base verb / noun)
• "I wouldn't like to work on weekends."
• "She would not like to miss the meeting."

**Key Usage Contexts:**
1. Ordering food/drinks at a restaurant or café
2. Making polite requests at a hotel or office
3. Expressing preferences in a formal setting
4. Job interviews — expressing interest in a role
5. Telephone conversations — asking to speak to someone
`,
  rules: [
    "Would like = want का polite form — सभी subjects के साथ same form: I/He/She/We/They would like (no -s, no changes)",
    "Subject + would like + noun: 'I would like a cup of tea' (direct noun object)",
    "Subject + would like to + BASE verb: 'I would like to speak to the manager' (infinitive — never 'to + verb+ing')",
    "Question form: Would + subject + like + (to + base verb)? → 'Would you like to join us?'",
    "Negative form: Subject + would not (wouldn't) like + (to + base verb) → 'I wouldn't like to miss this opportunity.'",
    "Short form: 'd like — I'd like / He'd like / She'd like / We'd like / They'd like (very common in speech)",
    "Response to 'Would you like...?': 'Yes, please.' / 'No, thank you.' / 'That would be great.'",
    "Would like + noun vs Would like to + verb: 'I'd like some water.' vs 'I'd like to drink some water.' — both correct, different structure",
    "Never use 'would likes' — 'would' is a modal, so the main verb is always base form: like (never likes/liked)",
    "'Would you like me to + verb?' = a polite offer to do something for someone: 'Would you like me to help you?'"
  ],
  memoryTrick: "**Would Like = Polite Want** — Restaurant/Office में हमेशा 'Would like' use करो, never just 'want'. More polite = more professional! याद रखो: 'Would Like' = Want का suit-boot version 👔",
  examples: [
    { hindi: "मैं एक ग्लास पानी चाहूँगा।", english: "I'd like a glass of water.", type: "Would like + noun" },
    { hindi: "मैं आपसे मिलना चाहूँगा।", english: "I'd like to meet you.", type: "Would like to + verb" },
    { hindi: "क्या आप कुछ खाना चाहेंगे?", english: "Would you like something to eat?", type: "Question" },
    { hindi: "वह इस नौकरी के लिए apply करना चाहेगी।", english: "She'd like to apply for this job.", type: "Would like to + verb" },
    { hindi: "हम आपकी मदद करना चाहेंगे।", english: "We'd like to help you.", type: "We'd like to + verb" },
    { hindi: "क्या आप कॉफी या चाय लेंगे?", english: "Would you like coffee or tea?", type: "Choice question" },
    { hindi: "मैं यह report submit करना चाहूँगा।", english: "I'd like to submit this report.", type: "Office context" },
    { hindi: "क्या आप हमसे जुड़ना चाहेंगे?", english: "Would you like to join us?", type: "Invitation question" },
    { hindi: "वह यहाँ काम नहीं करना चाहेगा।", english: "He wouldn't like to work here.", type: "Negative form" },
    { hindi: "मैं आपको एक offer देना चाहूँगा।", english: "I'd like to make you an offer.", type: "Business context" },
    { hindi: "क्या आप मुझे यह समझाना चाहेंगे?", english: "Would you like to explain this to me?", type: "Polite request" },
    { hindi: "वे एक नया घर खरीदना चाहेंगे।", english: "They'd like to buy a new house.", type: "Future desire" }
  ],
  mistakes: [
    { wrong: "I would like to going.", correct: "I'd like to go.", why: "'Would like to' के बाद हमेशा base verb आती है, 'going' (gerund) नहीं।" },
    { wrong: "Would you like to came?", correct: "Would you like to come?", why: "'To' के बाद base verb आती है — past tense 'came' नहीं।" },
    { wrong: "She would likes to go.", correct: "She'd like to go.", why: "'Would' एक modal verb है, इसके बाद 'like' base form में आएगा — कभी 'likes' नहीं।" },
    { wrong: "I am liking to meet you.", correct: "I'd like to meet you.", why: "'Would like' एक stative expression है — continuous (-ing) form नहीं बनती।" },
    { wrong: "I would like that you come.", correct: "I would like you to come.", why: "Indirect object के साथ structure है: would like + object + to + base verb।" },
    { wrong: "Would you like to went there?", correct: "Would you like to go there?", why: "'To' के बाद हमेशा base form — past tense 'went' गलत है।" },
    { wrong: "I would liked a coffee.", correct: "I'd like a coffee.", why: "'Would' के बाद verb का base form आता है — 'liked' (past) नहीं।" },
    { wrong: "They would like to going home.", correct: "They'd like to go home.", why: "'To' के बाद gerund (-ing) नहीं, base verb आती है।" },
    { wrong: "Would you like me help you?", correct: "Would you like me to help you?", why: "'Would like + object + to + verb' — 'to' को skip नहीं कर सकते।" },
    { wrong: "He would like to drinks water.", correct: "He'd like to drink water.", why: "'To' के बाद base verb 'drink' — third person -s नहीं लगती यहाँ।" }
  ],
  speakingTips: [
    "Restaurant में order करते समय: 'I'd like the paneer tikka masala, please.' — waiter को directly 'I want' मत बोलो।",
    "Office में meeting schedule करते हुए: 'I'd like to schedule a meeting with you sometime this week.'",
    "Phone पर: 'I'd like to speak to Mr. Sharma, please.' — receptionist से बात करते समय।",
    "Job interview में interest दिखाते हुए: 'I'd like to contribute my skills to your team.' — confident और polite लगता है।",
    "Hotel/customer service में: 'I'd like to check in, please.' / 'I'd like to report a problem with my room.'",
    "Polite offer करते समय: 'Would you like me to send you the details?' — colleague या client को।",
    "Question में choice देते हुए: 'Would you like to meet on Monday or Tuesday?' — always give options।",
    "Negative politely: 'I wouldn't like to miss this opportunity.' — सीधे 'I don't want' से ज़्यादा professional लगता है।"
  ]
};

// ─── VOCABULARY (500 entries) ─────────────────────────────────────────────────
const vocabData = [
  // A
  { word: "accomplish", pos: "verb", hindi: "पूरा करना / हासिल करना", simple: "to succeed in doing something", ipa: "/əˈkʌmplɪʃ/", syn: ["achieve","complete","fulfil"], ant: ["fail","abandon"], ex: "She accomplished all her goals this year.", off: "We accomplished the project ahead of schedule.", int: "I would like to accomplish great things in my career.", biz: "Our team accomplished record sales last quarter." },
  { word: "accurate", pos: "adjective", hindi: "सटीक / सही", simple: "correct and without mistakes", ipa: "/ˈækjərət/", syn: ["precise","correct","exact"], ant: ["inaccurate","wrong"], ex: "Please make sure the data is accurate.", off: "The report must be accurate before submission.", int: "I always strive to produce accurate work.", biz: "Accurate financial forecasting is essential." },
  { word: "achieve", pos: "verb", hindi: "प्राप्त करना / हासिल करना", simple: "to successfully reach a goal", ipa: "/əˈtʃiːv/", syn: ["attain","reach","accomplish"], ant: ["fail","miss"], ex: "He achieved his dream of becoming a doctor.", off: "We need to achieve our quarterly targets.", int: "I would like to achieve a leadership role.", biz: "The company achieved 20% growth last year." },
  { word: "adapt", pos: "verb", hindi: "अनुकूल होना / ढलना", simple: "to change to fit new conditions", ipa: "/əˈdæpt/", syn: ["adjust","modify","conform"], ant: ["resist","oppose"], ex: "She adapted quickly to the new city.", off: "Employees must adapt to new software tools.", int: "I can adapt to any work environment.", biz: "Businesses must adapt to changing market trends." },
  { word: "address", pos: "verb", hindi: "संबोधित करना / हल करना", simple: "to deal with or speak to", ipa: "/əˈdrɛs/", syn: ["tackle","handle","speak to"], ant: ["ignore","avoid"], ex: "He addressed the crowd confidently.", off: "We need to address this issue immediately.", int: "I would like to address the challenges you mentioned.", biz: "The CEO addressed all investor concerns." },
  { word: "advance", pos: "verb", hindi: "आगे बढ़ना / उन्नति करना", simple: "to move forward or progress", ipa: "/ədˈvɑːns/", syn: ["progress","develop","proceed"], ant: ["retreat","regress"], ex: "She wants to advance in her career.", off: "This project will advance our department's goals.", int: "I would like to advance into a managerial role.", biz: "We plan to advance into new markets." },
  { word: "advise", pos: "verb", hindi: "सलाह देना", simple: "to give someone a recommendation", ipa: "/ədˈvaɪz/", syn: ["counsel","recommend","suggest"], ant: ["mislead"], ex: "The doctor advised him to rest.", off: "I would advise reviewing the contract carefully.", int: "I can advise teams on best practices.", biz: "Our consultants advise clients on strategy." },
  { word: "agenda", pos: "noun", hindi: "एजेंडा / कार्यसूची", simple: "a list of items to be discussed", ipa: "/əˈdʒɛndə/", syn: ["schedule","plan","programme"], ant: [], ex: "What is on today's agenda?", off: "Please share the meeting agenda in advance.", int: "I follow a clear agenda in every project.", biz: "The board set the agenda for the annual meeting." },
  { word: "agree", pos: "verb", hindi: "सहमत होना", simple: "to have the same opinion", ipa: "/əˈɡriː/", syn: ["consent","concur","accept"], ant: ["disagree","oppose"], ex: "I agree with your point.", off: "Both teams agreed on the new timeline.", int: "I agree that communication is key.", biz: "The partners agreed on the contract terms." },
  { word: "alert", pos: "adjective", hindi: "सतर्क / चौकस", simple: "quick to notice things", ipa: "/əˈlɜːt/", syn: ["attentive","watchful","sharp"], ant: ["inattentive","careless"], ex: "Stay alert while driving.", off: "An alert employee spotted the error.", int: "I am always alert and attentive at work.", biz: "Alert managers respond quickly to market changes." },
  { word: "allocate", pos: "verb", hindi: "आवंटित करना / बाँटना", simple: "to give out resources for a purpose", ipa: "/ˈæləkeɪt/", syn: ["assign","distribute","allot"], ant: ["withhold"], ex: "The teacher allocated tasks to each student.", off: "We need to allocate budget to this project.", int: "I know how to allocate resources effectively.", biz: "The company allocates funds to R&D each year." },
  { word: "ambition", pos: "noun", hindi: "महत्वाकांक्षा / लालसा", simple: "a strong desire to succeed", ipa: "/æmˈbɪʃən/", syn: ["aspiration","drive","goal"], ant: ["apathy","laziness"], ex: "Her ambition is to start her own business.", off: "Ambition drives employees to perform better.", int: "My ambition is to grow into a leadership role.", biz: "Corporate ambition fuels innovation." },
  { word: "analyse", pos: "verb", hindi: "विश्लेषण करना", simple: "to examine something carefully", ipa: "/ˈænəlaɪz/", syn: ["examine","study","assess"], ant: ["overlook","ignore"], ex: "He analysed the data carefully.", off: "We need to analyse last month's results.", int: "I would like to analyse problems before acting.", biz: "Analysts analyse market trends to guide decisions." },
  { word: "announce", pos: "verb", hindi: "घोषणा करना", simple: "to make something publicly known", ipa: "/əˈnaʊns/", syn: ["declare","proclaim","publicise"], ant: ["conceal","hide"], ex: "She announced her engagement at dinner.", off: "The manager announced a new policy today.", int: "I would like to announce my interest in this role.", biz: "The company announced its merger last week." },
  { word: "anticipate", pos: "verb", hindi: "पहले से अनुमान लगाना", simple: "to expect something before it happens", ipa: "/ænˈtɪsɪpeɪt/", syn: ["expect","foresee","predict"], ant: ["be surprised"], ex: "I anticipate a great result.", off: "We should anticipate potential risks.", int: "I can anticipate challenges and prepare for them.", biz: "Good managers anticipate customer needs." },
  { word: "apologise", pos: "verb", hindi: "माफी माँगना", simple: "to say sorry", ipa: "/əˈpɒlədʒaɪz/", syn: ["say sorry","regret","express regret"], ant: [], ex: "She apologised for being late.", off: "I apologise for the misunderstanding.", int: "I always apologise when I make a mistake.", biz: "The company apologised to affected customers." },
  { word: "application", pos: "noun", hindi: "आवेदन / एप्लीकेशन", simple: "a formal request for something", ipa: "/ˌæplɪˈkeɪʃən/", syn: ["request","form","submission"], ant: [], ex: "He submitted his application on time.", off: "The job application deadline is Friday.", int: "I would like to discuss my application.", biz: "Applications for the new position are now open." },
  { word: "apply", pos: "verb", hindi: "आवेदन करना / लगाना", simple: "to make a formal request or use", ipa: "/əˈplaɪ/", syn: ["submit","request","put in"], ant: ["withdraw"], ex: "She applied for a scholarship.", off: "Please apply the new guidelines from Monday.", int: "I would like to apply for this position.", biz: "Companies apply for government grants." },
  { word: "appoint", pos: "verb", hindi: "नियुक्त करना", simple: "to give someone a job or role", ipa: "/əˈpɔɪnt/", syn: ["assign","designate","name"], ant: ["dismiss","remove"], ex: "They appointed a new principal.", off: "The board appointed a new director.", int: "I would like to be appointed to lead this project.", biz: "The firm appointed an experienced CEO." },
  { word: "appreciate", pos: "verb", hindi: "सराहना करना / आभारी होना", simple: "to be grateful for or value highly", ipa: "/əˈpriːʃieɪt/", syn: ["value","acknowledge","be grateful for"], ant: ["disregard","undervalue"], ex: "I appreciate your help.", off: "The team appreciates the manager's support.", int: "I'd appreciate the opportunity to work here.", biz: "Clients appreciate prompt and professional service." },
  { word: "approach", pos: "noun", hindi: "तरीका / दृष्टिकोण", simple: "a way of dealing with something", ipa: "/əˈprəʊtʃ/", syn: ["method","strategy","technique"], ant: [], ex: "Try a different approach to the problem.", off: "Our approach to deadlines is very structured.", int: "My approach to challenges is methodical.", biz: "A customer-first approach drives loyalty." },
  { word: "approve", pos: "verb", hindi: "मंजूरी देना / स्वीकृति देना", simple: "to officially agree to something", ipa: "/əˈpruːv/", syn: ["sanction","authorise","endorse"], ant: ["reject","refuse"], ex: "The manager approved the leave.", off: "The budget was approved by the committee.", int: "I would like to get my proposal approved.", biz: "The board approved the new business plan." },
  { word: "arrange", pos: "verb", hindi: "व्यवस्था करना", simple: "to plan or organise something", ipa: "/əˈreɪndʒ/", syn: ["organise","plan","set up"], ant: ["disorganise","cancel"], ex: "Can you arrange a meeting for Monday?", off: "She arranged all the travel documents.", int: "I would like to arrange an interview time.", biz: "We arranged a conference call with our partners." },
  { word: "aspire", pos: "verb", hindi: "आकांक्षा रखना / लक्ष्य रखना", simple: "to have a strong wish to achieve something", ipa: "/əˈspaɪər/", syn: ["aim","desire","strive"], ant: ["give up"], ex: "She aspires to become a doctor.", off: "I aspire to lead a team one day.", int: "I aspire to grow within this company.", biz: "Aspiring entrepreneurs need mentorship." },
  { word: "assess", pos: "verb", hindi: "मूल्यांकन करना / आकलन करना", simple: "to evaluate or judge the value of something", ipa: "/əˈsɛs/", syn: ["evaluate","judge","appraise"], ant: ["overlook"], ex: "The doctor assessed the patient's condition.", off: "We need to assess the project risks.", int: "I can assess situations calmly.", biz: "The firm assesses performance every quarter." },
  { word: "assist", pos: "verb", hindi: "सहायता करना", simple: "to help someone", ipa: "/əˈsɪst/", syn: ["help","support","aid"], ant: ["hinder","obstruct"], ex: "He assisted the elderly lady.", off: "I'd like to assist you with this task.", int: "I am always willing to assist colleagues.", biz: "Our team assists clients 24 hours a day." },
  { word: "attain", pos: "verb", hindi: "प्राप्त करना / पाना", simple: "to reach a goal after effort", ipa: "/əˈteɪn/", syn: ["achieve","reach","accomplish"], ant: ["fail","miss"], ex: "She attained top marks.", off: "We want to attain our sales targets.", int: "I would like to attain a senior position here.", biz: "Attaining profitability is the first milestone." },
  { word: "attend", pos: "verb", hindi: "उपस्थित होना / शामिल होना", simple: "to be present at an event", ipa: "/əˈtɛnd/", syn: ["be present at","participate in","go to"], ant: ["miss","skip"], ex: "Please attend the meeting on time.", off: "All staff are required to attend the training.", int: "I would like to attend the orientation session.", biz: "We'd like to attend the industry conference." },
  { word: "attitude", pos: "noun", hindi: "रवैया / दृष्टिकोण", simple: "a way of thinking or feeling", ipa: "/ˈætɪtjuːd/", syn: ["mindset","outlook","perspective"], ant: [], ex: "A positive attitude helps a lot.", off: "Her attitude at work is very professional.", int: "I have a positive attitude towards challenges.", biz: "A can-do attitude drives business success." },
  { word: "authority", pos: "noun", hindi: "अधिकार / सत्ता", simple: "the power to make decisions", ipa: "/ɔːˈθɒrɪti/", syn: ["power","jurisdiction","command"], ant: ["powerlessness"], ex: "The manager has authority over the team.", off: "She has the authority to approve expenses.", int: "I would like to take on more authority.", biz: "Delegating authority improves efficiency." },
  // B
  { word: "balance", pos: "noun", hindi: "संतुलन", simple: "a state of being equal or stable", ipa: "/ˈbæləns/", syn: ["equilibrium","stability","harmony"], ant: ["imbalance"], ex: "Work-life balance is important.", off: "We need to balance speed and quality.", int: "I maintain a good balance between tasks.", biz: "Financial balance sheets show a company's health." },
  { word: "behaviour", pos: "noun", hindi: "व्यवहार", simple: "the way one acts", ipa: "/bɪˈheɪvjər/", syn: ["conduct","manner","attitude"], ant: ["misbehaviour"], ex: "Good behaviour is expected in school.", off: "Professional behaviour is required at work.", int: "I demonstrate responsible behaviour at all times.", biz: "Consumer behaviour affects business strategy." },
  { word: "benefit", pos: "noun", hindi: "लाभ / फायदा", simple: "an advantage or gain", ipa: "/ˈbɛnɪfɪt/", syn: ["advantage","gain","perk"], ant: ["disadvantage","loss"], ex: "Exercise has many health benefits.", off: "The new policy benefits all employees.", int: "I would like to know about the benefits package.", biz: "This merger brings strategic benefits to both firms." },
  { word: "brief", pos: "adjective", hindi: "संक्षिप्त", simple: "short in time or length", ipa: "/briːf/", syn: ["short","concise","succinct"], ant: ["long","lengthy"], ex: "Please give a brief introduction.", off: "The manager gave a brief update.", int: "I will give a brief summary of my experience.", biz: "A brief presentation is often more effective." },
  { word: "budget", pos: "noun", hindi: "बजट / व्यय सीमा", simple: "a plan for spending money", ipa: "/ˈbʌdʒɪt/", syn: ["allowance","funds","financial plan"], ant: [], ex: "We need to stay within the budget.", off: "The department has a limited budget.", int: "I have experience managing project budgets.", biz: "A well-planned budget ensures financial health." },
  { word: "build", pos: "verb", hindi: "बनाना / निर्मित करना", simple: "to make or develop something", ipa: "/bɪld/", syn: ["construct","develop","create"], ant: ["destroy","demolish"], ex: "They are building a new park nearby.", off: "We need to build a strong team culture.", int: "I would like to build on my existing skills.", biz: "We build lasting relationships with our clients." },
  // C
  { word: "capable", pos: "adjective", hindi: "सक्षम / काबिल", simple: "having the ability to do something", ipa: "/ˈkeɪpəbl/", syn: ["able","competent","skilled"], ant: ["incapable","incompetent"], ex: "She is a very capable leader.", off: "We need capable people for this project.", int: "I am capable of handling pressure.", biz: "A capable team delivers results consistently." },
  { word: "career", pos: "noun", hindi: "करियर / पेशा", simple: "a professional life path", ipa: "/kəˈrɪər/", syn: ["profession","vocation","occupation"], ant: [], ex: "She built a successful career in medicine.", off: "Career growth is important to employees.", int: "I would like to build a long career here.", biz: "Career development programs attract talent." },
  { word: "challenge", pos: "noun", hindi: "चुनौती", simple: "something difficult that tests ability", ipa: "/ˈtʃælɪndʒ/", syn: ["difficulty","obstacle","test"], ant: ["ease","simplicity"], ex: "Learning English is a good challenge.", off: "Every project comes with its own challenges.", int: "I enjoy facing challenges at work.", biz: "Market challenges require creative solutions." },
  { word: "clarify", pos: "verb", hindi: "स्पष्ट करना", simple: "to make something clearer", ipa: "/ˈklærɪfaɪ/", syn: ["explain","clear up","elaborate"], ant: ["confuse","obscure"], ex: "Can you clarify what you mean?", off: "Please clarify the project requirements.", int: "I would like to clarify a point from the job description.", biz: "The CEO clarified the company's vision." },
  { word: "collaborate", pos: "verb", hindi: "मिलकर काम करना / सहयोग करना", simple: "to work jointly with others", ipa: "/kəˈlæbəreɪt/", syn: ["cooperate","team up","work together"], ant: ["compete","work alone"], ex: "The two teams collaborated on the project.", off: "We collaborate across departments.", int: "I enjoy collaborating with diverse teams.", biz: "Businesses collaborate with partners to expand." },
  { word: "commitment", pos: "noun", hindi: "प्रतिबद्धता / लगन", simple: "the state of being dedicated to something", ipa: "/kəˈmɪtmənt/", syn: ["dedication","loyalty","devotion"], ant: ["indifference","neglect"], ex: "His commitment to his job is admirable.", off: "We appreciate your commitment to the team.", int: "I have a strong commitment to quality work.", biz: "Commitment to customer satisfaction builds loyalty." },
  { word: "communicate", pos: "verb", hindi: "संवाद करना / बात करना", simple: "to share information with others", ipa: "/kəˈmjuːnɪkeɪt/", syn: ["convey","express","interact"], ant: ["miscommunicate"], ex: "It is important to communicate clearly.", off: "We communicate via email and meetings.", int: "I communicate effectively in both Hindi and English.", biz: "Good leaders communicate vision to their teams." },
  { word: "competent", pos: "adjective", hindi: "दक्ष / कुशल", simple: "having the necessary skill or knowledge", ipa: "/ˈkɒmpɪtənt/", syn: ["capable","skilled","proficient"], ant: ["incompetent","unskilled"], ex: "She is a very competent engineer.", off: "We hire only competent professionals.", int: "I am competent in data analysis.", biz: "Competent staff drive business efficiency." },
  { word: "complete", pos: "verb", hindi: "पूर्ण करना / समाप्त करना", simple: "to finish something fully", ipa: "/kəmˈpliːt/", syn: ["finish","accomplish","conclude"], ant: ["start","abandon"], ex: "Please complete the form.", off: "We need to complete this by Friday.", int: "I always complete tasks before deadlines.", biz: "Completing projects on time builds client trust." },
  { word: "concern", pos: "noun", hindi: "चिंता / परवाह", simple: "a feeling of worry about something", ipa: "/kənˈsɜːn/", syn: ["worry","anxiety","issue"], ant: ["indifference"], ex: "I have a concern about the schedule.", off: "Please raise any concerns with your manager.", int: "I would like to address a concern I have.", biz: "Client concerns must be resolved quickly." },
  { word: "confident", pos: "adjective", hindi: "आत्मविश्वासी", simple: "feeling sure about oneself", ipa: "/ˈkɒnfɪdənt/", syn: ["self-assured","certain","bold"], ant: ["insecure","timid"], ex: "She gave a confident speech.", off: "Be confident when presenting your ideas.", int: "I am confident in my ability to deliver results.", biz: "Confident leaders inspire their teams." },
  { word: "confirm", pos: "verb", hindi: "पुष्टि करना", simple: "to state that something is definite", ipa: "/kənˈfɜːm/", syn: ["verify","validate","acknowledge"], ant: ["deny","cancel"], ex: "Please confirm your attendance.", off: "I would like to confirm our meeting time.", int: "I would like to confirm details about this role.", biz: "Clients need to confirm orders 24 hours in advance." },
  { word: "connect", pos: "verb", hindi: "जोड़ना / संपर्क करना", simple: "to link or communicate with", ipa: "/kəˈnɛkt/", syn: ["link","join","reach out"], ant: ["disconnect","separate"], ex: "I would like to connect with you on LinkedIn.", off: "Please connect me to the IT department.", int: "I connect well with colleagues and clients.", biz: "Networking helps businesses connect with partners." },
  { word: "consistent", pos: "adjective", hindi: "लगातार / एकसमान", simple: "doing the same thing reliably", ipa: "/kənˈsɪstənt/", syn: ["steady","reliable","uniform"], ant: ["inconsistent","irregular"], ex: "She is consistent in her work.", off: "We need consistent performance from the team.", int: "I deliver consistent results.", biz: "Consistent quality builds brand reputation." },
  { word: "contribute", pos: "verb", hindi: "योगदान देना", simple: "to give or add to something", ipa: "/kənˈtrɪbjuːt/", syn: ["give","add","participate"], ant: ["withhold","take away"], ex: "I'd like to contribute to the discussion.", off: "Everyone should contribute to team goals.", int: "I would like to contribute my skills to your company.", biz: "Employees contribute to company success." },
  { word: "convenient", pos: "adjective", hindi: "सुविधाजनक", simple: "easy to use or well-suited", ipa: "/kənˈviːniənt/", syn: ["handy","practical","suitable"], ant: ["inconvenient","awkward"], ex: "A nearby supermarket is very convenient.", off: "Choose a convenient time for the meeting.", int: "I am available at a time convenient to you.", biz: "Convenient payment options improve sales." },
  { word: "cooperate", pos: "verb", hindi: "सहयोग करना", simple: "to work together towards a goal", ipa: "/kəʊˈɒpəreɪt/", syn: ["collaborate","work together","assist"], ant: ["oppose","hinder"], ex: "Please cooperate with the investigation.", off: "Both departments need to cooperate.", int: "I always cooperate with my teammates.", biz: "Partners must cooperate to succeed." },
  { word: "create", pos: "verb", hindi: "बनाना / सृजन करना", simple: "to make or produce something new", ipa: "/kriˈeɪt/", syn: ["make","produce","develop"], ant: ["destroy","demolish"], ex: "She creates beautiful paintings.", off: "We need to create a new workflow.", int: "I would like to create impactful work here.", biz: "Businesses create value for customers." },
  { word: "creative", pos: "adjective", hindi: "रचनात्मक", simple: "having the ability to create new ideas", ipa: "/kriˈeɪtɪv/", syn: ["imaginative","innovative","inventive"], ant: ["uncreative","dull"], ex: "She is a very creative designer.", off: "We need creative solutions to this problem.", int: "I am a creative thinker.", biz: "Creative marketing attracts customers." },
  { word: "customer", pos: "noun", hindi: "ग्राहक", simple: "a person who buys goods or services", ipa: "/ˈkʌstəmər/", syn: ["client","buyer","patron"], ant: ["seller","vendor"], ex: "The customer wanted a refund.", off: "Please treat every customer with respect.", int: "I have experience in customer service.", biz: "Customer satisfaction is our top priority." },
  // D
  { word: "deadline", pos: "noun", hindi: "अंतिम तिथि / समय सीमा", simple: "the final date by which something must be done", ipa: "/ˈdɛdlaɪn/", syn: ["due date","cut-off","time limit"], ant: [], ex: "The assignment deadline is tomorrow.", off: "Never miss a project deadline.", int: "I always deliver work before the deadline.", biz: "Meeting deadlines is critical in business." },
  { word: "decision", pos: "noun", hindi: "निर्णय / फैसला", simple: "a choice made after thinking", ipa: "/dɪˈsɪʒən/", syn: ["choice","resolution","verdict"], ant: ["indecision"], ex: "Making the right decision is important.", off: "The manager made the final decision.", int: "I make decisions based on data and logic.", biz: "Business decisions affect growth and profit." },
  { word: "dedicated", pos: "adjective", hindi: "समर्पित / लगनशील", simple: "fully committed to a task or purpose", ipa: "/ˈdɛdɪkeɪtɪd/", syn: ["committed","devoted","loyal"], ant: ["indifferent","lazy"], ex: "She is a dedicated teacher.", off: "We need a dedicated team for this task.", int: "I am a dedicated and hardworking professional.", biz: "A dedicated workforce drives company success." },
  { word: "delegate", pos: "verb", hindi: "काम सौंपना / प्रतिनिधित्व देना", simple: "to assign tasks to someone else", ipa: "/ˈdɛlɪɡeɪt/", syn: ["assign","entrust","hand over"], ant: ["retain","keep"], ex: "A good manager knows when to delegate.", off: "Please delegate smaller tasks to the junior team.", int: "I know how to delegate and manage teams.", biz: "Delegation improves organisational efficiency." },
  { word: "deliver", pos: "verb", hindi: "देना / पहुँचाना", simple: "to bring or provide something", ipa: "/dɪˈlɪvər/", syn: ["provide","supply","handover"], ant: ["withhold"], ex: "The courier delivered the package.", off: "We deliver projects on time and within budget.", int: "I can deliver high-quality results.", biz: "Businesses must deliver value to stay competitive." },
  { word: "demonstrate", pos: "verb", hindi: "दिखाना / प्रदर्शित करना", simple: "to show or prove by example", ipa: "/ˈdɛmənstreɪt/", syn: ["show","illustrate","prove"], ant: ["hide","conceal"], ex: "She demonstrated how to use the machine.", off: "Please demonstrate the new feature to the client.", int: "I would like to demonstrate my skills.", biz: "We demonstrated product features to potential buyers." },
  { word: "design", pos: "verb", hindi: "डिजाइन करना / योजना बनाना", simple: "to create a plan or visual", ipa: "/dɪˈzaɪn/", syn: ["create","plan","draft"], ant: ["demolish"], ex: "She designed a beautiful logo.", off: "We need to design a new marketing campaign.", int: "I would like to design user-friendly products.", biz: "Good design increases brand value." },
  { word: "determine", pos: "verb", hindi: "निर्धारित करना / तय करना", simple: "to find out or decide", ipa: "/dɪˈtɜːmɪn/", syn: ["decide","establish","find out"], ant: ["ignore","overlook"], ex: "We need to determine the cause of the problem.", off: "The committee will determine the final budget.", int: "I can determine priorities effectively.", biz: "Market research helps determine consumer demand." },
  { word: "develop", pos: "verb", hindi: "विकसित करना", simple: "to grow or improve over time", ipa: "/dɪˈvɛləp/", syn: ["grow","improve","build"], ant: ["decline","worsen"], ex: "She developed her skills through practice.", off: "We develop software solutions for clients.", int: "I would like to develop professionally here.", biz: "Companies invest in developing new products." },
  { word: "diligent", pos: "adjective", hindi: "परिश्रमी / मेहनती", simple: "showing care and effort in work", ipa: "/ˈdɪlɪdʒənt/", syn: ["hardworking","industrious","thorough"], ant: ["lazy","careless"], ex: "She is a diligent student.", off: "Diligent employees are always appreciated.", int: "I am diligent and detail-oriented.", biz: "Diligent auditors catch financial errors." },
  { word: "discuss", pos: "verb", hindi: "चर्चा करना / विचार-विमर्श करना", simple: "to talk about something in detail", ipa: "/dɪˈskʌs/", syn: ["talk about","debate","explore"], ant: ["avoid","ignore"], ex: "Let's discuss the plan together.", off: "We need to discuss the budget proposal.", int: "I would like to discuss my qualifications.", biz: "Business partners discuss terms before signing." },
  { word: "distribute", pos: "verb", hindi: "वितरित करना / बाँटना", simple: "to give or share out things", ipa: "/dɪˈstrɪbjuːt/", syn: ["share","allocate","circulate"], ant: ["collect","gather"], ex: "Please distribute the handouts.", off: "Distribute the report to all team members.", int: "I have experience distributing work fairly.", biz: "The company distributes products across India." },
  // E
  { word: "effective", pos: "adjective", hindi: "प्रभावी / कारगर", simple: "producing the desired result", ipa: "/ɪˈfɛktɪv/", syn: ["efficient","successful","productive"], ant: ["ineffective","useless"], ex: "Exercise is an effective way to stay healthy.", off: "We need a more effective workflow.", int: "I believe in effective time management.", biz: "Effective advertising increases sales." },
  { word: "efficient", pos: "adjective", hindi: "कुशल / दक्ष", simple: "doing things without wasting time or resources", ipa: "/ɪˈfɪʃənt/", syn: ["productive","effective","capable"], ant: ["inefficient","wasteful"], ex: "She is an efficient worker.", off: "We need a more efficient system.", int: "I work in an efficient and organised manner.", biz: "Efficient operations reduce business costs." },
  { word: "encourage", pos: "verb", hindi: "प्रोत्साहित करना", simple: "to give support or confidence to someone", ipa: "/ɪnˈkʌrɪdʒ/", syn: ["motivate","inspire","support"], ant: ["discourage","demoralise"], ex: "Teachers should encourage students.", off: "Our manager always encourages new ideas.", int: "I like to encourage my teammates.", biz: "Good employers encourage professional growth." },
  { word: "engage", pos: "verb", hindi: "संलग्न करना / ध्यान खींचना", simple: "to involve or attract someone", ipa: "/ɪnˈɡeɪdʒ/", syn: ["involve","participate","attract"], ant: ["disengage"], ex: "The teacher engaged students with activities.", off: "We need to engage clients more actively.", int: "I know how to engage an audience.", biz: "Brands engage customers through social media." },
  { word: "enhance", pos: "verb", hindi: "बढ़ाना / सुधारना", simple: "to improve the quality of something", ipa: "/ɪnˈhɑːns/", syn: ["improve","boost","elevate"], ant: ["reduce","worsen"], ex: "Reading enhances vocabulary.", off: "This update will enhance system performance.", int: "I would like to enhance my technical skills.", biz: "Better packaging enhances product appeal." },
  { word: "enquire", pos: "verb", hindi: "पूछताछ करना / जानकारी माँगना", simple: "to ask for information", ipa: "/ɪnˈkwaɪər/", syn: ["ask","request","inquire"], ant: [], ex: "She enquired about the job vacancy.", off: "Please enquire at the reception desk.", int: "I would like to enquire about this position.", biz: "Clients may enquire about pricing at any time." },
  { word: "estimate", pos: "verb", hindi: "अनुमान लगाना", simple: "to roughly calculate a number or value", ipa: "/ˈɛstɪmeɪt/", syn: ["calculate","judge","approximate"], ant: ["know exactly"], ex: "Estimate how long the trip will take.", off: "Please estimate the project cost.", int: "I can estimate timelines and budgets accurately.", biz: "The firm estimated revenue growth at 15%." },
  { word: "evaluate", pos: "verb", hindi: "मूल्यांकन करना", simple: "to judge the value or quality of something", ipa: "/ɪˈvæljueɪt/", syn: ["assess","judge","review"], ant: ["overlook","ignore"], ex: "We need to evaluate our progress.", off: "Managers evaluate employee performance annually.", int: "I evaluate my own performance regularly.", biz: "Companies evaluate suppliers before signing contracts." },
  { word: "expand", pos: "verb", hindi: "विस्तार करना / फैलाना", simple: "to make or become larger", ipa: "/ɪkˈspænd/", syn: ["grow","extend","enlarge"], ant: ["shrink","reduce"], ex: "They want to expand the business.", off: "Our team is expanding this year.", int: "I would like to expand my knowledge here.", biz: "The company plans to expand into new markets." },
  { word: "experience", pos: "noun", hindi: "अनुभव", simple: "knowledge gained from doing things", ipa: "/ɪkˈspɪəriəns/", syn: ["knowledge","expertise","background"], ant: ["inexperience"], ex: "She has ten years of teaching experience.", off: "Work experience is valued in this role.", int: "My experience in sales will help me here.", biz: "Customer experience determines brand loyalty." },
  { word: "explain", pos: "verb", hindi: "समझाना / स्पष्ट करना", simple: "to make something clear", ipa: "/ɪkˈspleɪn/", syn: ["clarify","describe","elaborate"], ant: ["confuse","obscure"], ex: "Can you explain this rule?", off: "Please explain the new procedure.", int: "I would like to explain my work experience.", biz: "Sales teams explain product benefits to clients." },
  { word: "explore", pos: "verb", hindi: "खोजना / जाँचना", simple: "to investigate or travel through", ipa: "/ɪkˈsplɔːr/", syn: ["investigate","discover","examine"], ant: ["ignore","overlook"], ex: "She wants to explore different career options.", off: "Let's explore new ideas for the campaign.", int: "I would like to explore growth opportunities here.", biz: "Companies explore new markets for expansion." },
  // F
  { word: "facilitate", pos: "verb", hindi: "सुगम बनाना / आसान करना", simple: "to make a process easier", ipa: "/fəˈsɪlɪteɪt/", syn: ["ease","help","enable"], ant: ["hinder","obstruct"], ex: "Good infrastructure facilitates business.", off: "The HR team facilitates onboarding.", int: "I facilitate smooth communication in my team.", biz: "Technology facilitates faster business transactions." },
  { word: "feedback", pos: "noun", hindi: "प्रतिक्रिया / सुझाव", simple: "information about performance or results", ipa: "/ˈfiːdbæk/", syn: ["response","review","comment"], ant: [], ex: "I would like some feedback on my work.", off: "Regular feedback improves performance.", int: "I welcome constructive feedback.", biz: "Customer feedback shapes product development." },
  { word: "flexible", pos: "adjective", hindi: "लचीला / बदल सकने वाला", simple: "willing or able to change", ipa: "/ˈflɛksɪbl/", syn: ["adaptable","versatile","open"], ant: ["rigid","inflexible"], ex: "She has a flexible work schedule.", off: "We offer flexible working hours.", int: "I am flexible about working hours.", biz: "Flexible policies attract top talent." },
  { word: "focus", pos: "verb", hindi: "ध्यान केंद्रित करना", simple: "to give full attention to something", ipa: "/ˈfəʊkəs/", syn: ["concentrate","attend to","zero in on"], ant: ["distract","wander"], ex: "Focus on one task at a time.", off: "Let's focus on solving the issue.", int: "I always focus on delivering quality work.", biz: "Businesses must focus on customer needs." },
  { word: "formal", pos: "adjective", hindi: "औपचारिक", simple: "following official rules and standards", ipa: "/ˈfɔːməl/", syn: ["official","professional","proper"], ant: ["informal","casual"], ex: "Wear formal clothes to the interview.", off: "Office communication should be formal.", int: "I prefer a formal and respectful work environment.", biz: "Formal agreements protect both parties legally." },
  { word: "forward", pos: "adverb", hindi: "आगे", simple: "towards the front or future", ipa: "/ˈfɔːwəd/", syn: ["ahead","onward","forth"], ant: ["backward"], ex: "Please move forward with the plan.", off: "We look forward to working with you.", int: "I look forward to contributing to your team.", biz: "Moving forward, we will adopt a new strategy." },
  // G
  { word: "goal", pos: "noun", hindi: "लक्ष्य", simple: "something you aim to achieve", ipa: "/ɡəʊl/", syn: ["target","aim","objective"], ant: [], ex: "My goal is to learn English fluently.", off: "Set clear goals for the project.", int: "My short-term goal is to join your team.", biz: "Every business needs clear goals." },
  { word: "grateful", pos: "adjective", hindi: "कृतज्ञ / आभारी", simple: "feeling thankful for something", ipa: "/ˈɡreɪtfəl/", syn: ["thankful","appreciative","obliged"], ant: ["ungrateful"], ex: "I am grateful for your help.", off: "She was grateful for the promotion.", int: "I am grateful for this interview opportunity.", biz: "We are grateful for our clients' continued trust." },
  { word: "greet", pos: "verb", hindi: "अभिवादन करना / स्वागत करना", simple: "to welcome someone", ipa: "/ɡriːt/", syn: ["welcome","meet","receive"], ant: ["ignore","dismiss"], ex: "Always greet guests with a smile.", off: "Greet clients professionally at the entrance.", int: "I always greet colleagues respectfully.", biz: "How you greet clients sets the tone." },
  { word: "growth", pos: "noun", hindi: "विकास / वृद्धि", simple: "an increase in size, value, or skill", ipa: "/ɡrəʊθ/", syn: ["development","expansion","progress"], ant: ["decline","shrinkage"], ex: "Personal growth requires effort.", off: "The company saw 20% growth last year.", int: "I am looking for growth opportunities.", biz: "Sustainable growth requires long-term planning." },
  // H
  { word: "handle", pos: "verb", hindi: "सँभालना / निपटना", simple: "to deal with or manage something", ipa: "/ˈhændl/", syn: ["manage","deal with","cope with"], ant: ["mishandle","neglect"], ex: "Can you handle this task?", off: "She handles all customer complaints.", int: "I can handle pressure and tight deadlines.", biz: "Our team handles logistics efficiently." },
  { word: "hardworking", pos: "adjective", hindi: "मेहनती", simple: "putting in serious effort", ipa: "/ˌhɑːdˈwɜːkɪŋ/", syn: ["diligent","industrious","dedicated"], ant: ["lazy","idle"], ex: "She is a hardworking student.", off: "We value hardworking employees.", int: "I am hardworking and results-driven.", biz: "Hardworking teams build successful businesses." },
  { word: "helpful", pos: "adjective", hindi: "सहायक / मददगार", simple: "ready and willing to give help", ipa: "/ˈhɛlpfəl/", syn: ["useful","supportive","cooperative"], ant: ["unhelpful","obstructive"], ex: "She is always helpful to new students.", off: "Our support team is very helpful.", int: "I am helpful and a good team player.", biz: "Helpful customer service builds loyalty." },
  { word: "honest", pos: "adjective", hindi: "ईमानदार", simple: "truthful and not deceiving", ipa: "/ˈɒnɪst/", syn: ["truthful","sincere","genuine"], ant: ["dishonest","deceitful"], ex: "Always be honest with your manager.", off: "Honest feedback helps teams improve.", int: "I am honest and transparent in my work.", biz: "Honest business practices build reputation." },
  { word: "humble", pos: "adjective", hindi: "विनम्र / नम्र", simple: "not boastful; modest", ipa: "/ˈhʌmbl/", syn: ["modest","meek","unpretentious"], ant: ["arrogant","proud"], ex: "Despite his success, he stayed humble.", off: "A humble attitude earns respect.", int: "I am humble and always open to learning.", biz: "Humble leaders build stronger teams." },
  // I
  { word: "impact", pos: "noun", hindi: "प्रभाव / असर", simple: "the effect of one thing on another", ipa: "/ˈɪmpækt/", syn: ["effect","influence","result"], ant: [], ex: "Education has a huge impact on life.", off: "This policy will have a big impact.", int: "I would like to make a positive impact here.", biz: "Customer reviews impact brand image." },
  { word: "implement", pos: "verb", hindi: "लागू करना / क्रियान्वित करना", simple: "to put a plan into action", ipa: "/ˈɪmplɪmɛnt/", syn: ["execute","carry out","apply"], ant: ["cancel","abandon"], ex: "We will implement the new policy next week.", off: "The team implemented the plan successfully.", int: "I have experience implementing new processes.", biz: "Companies implement strategies to increase revenue." },
  { word: "improve", pos: "verb", hindi: "सुधारना / बेहतर बनाना", simple: "to make or become better", ipa: "/ɪmˈpruːv/", syn: ["enhance","develop","upgrade"], ant: ["worsen","deteriorate"], ex: "She wants to improve her English.", off: "We must improve our customer service.", int: "I am constantly looking to improve myself.", biz: "Continuous improvement drives business success." },
  { word: "initiative", pos: "noun", hindi: "पहल / पहल करने की क्षमता", simple: "the ability to start things independently", ipa: "/ɪˈnɪʃətɪv/", syn: ["enterprise","drive","self-motivation"], ant: ["passivity","indifference"], ex: "She showed great initiative at work.", off: "Take initiative to solve problems.", int: "I take initiative without waiting for instruction.", biz: "Innovation initiatives drive industry change." },
  { word: "innovative", pos: "adjective", hindi: "नवाचारी / नवीन", simple: "using new and creative ideas", ipa: "/ˈɪnəveɪtɪv/", syn: ["creative","inventive","original"], ant: ["unoriginal","conventional"], ex: "The company launched an innovative product.", off: "We encourage innovative thinking.", int: "I have an innovative approach to problems.", biz: "Innovative companies lead their markets." },
  { word: "inquire", pos: "verb", hindi: "जानकारी माँगना / पूछताछ करना", simple: "to ask for information", ipa: "/ɪnˈkwaɪər/", syn: ["ask","request","enquire"], ant: [], ex: "I would like to inquire about the course.", off: "Please inquire at the front desk.", int: "I would like to inquire about this vacancy.", biz: "Interested clients should inquire about our services." },
  { word: "insight", pos: "noun", hindi: "अंतर्दृष्टि / गहरी समझ", simple: "a deep understanding of something", ipa: "/ˈɪnsaɪt/", syn: ["understanding","perception","awareness"], ant: ["ignorance"], ex: "She shared valuable insights.", off: "His insight helped solve the problem.", int: "I bring fresh insights to every project.", biz: "Data analytics provides business insights." },
  { word: "inspire", pos: "verb", hindi: "प्रेरित करना", simple: "to motivate someone to do something great", ipa: "/ɪnˈspaɪər/", syn: ["motivate","encourage","influence"], ant: ["discourage","demotivate"], ex: "Her story inspired many people.", off: "Good leaders inspire their teams.", int: "I would like to inspire others through my work.", biz: "Brands that inspire create loyal followers." },
  { word: "interview", pos: "noun", hindi: "साक्षात्कार / इंटरव्यू", simple: "a formal meeting to assess a person", ipa: "/ˈɪntəvjuː/", syn: ["discussion","meeting","evaluation"], ant: [], ex: "She prepared well for the interview.", off: "We conducted ten interviews today.", int: "Thank you for this interview opportunity.", biz: "Interviews help select the best candidates." },
  { word: "introduce", pos: "verb", hindi: "परिचय कराना", simple: "to present someone or something", ipa: "/ˌɪntrəˈdjuːs/", syn: ["present","make known","acquaint"], ant: [], ex: "Let me introduce myself.", off: "The manager introduced the new policy.", int: "I would like to introduce myself briefly.", biz: "We introduced a new product line last month." },
  { word: "invest", pos: "verb", hindi: "निवेश करना", simple: "to put money or time into something for gain", ipa: "/ɪnˈvɛst/", syn: ["spend","put in","commit"], ant: ["withdraw","divest"], ex: "She decided to invest in education.", off: "We plan to invest in new technology.", int: "I invest time in learning new skills.", biz: "Companies invest in R&D to stay competitive." },
  // J
  { word: "join", pos: "verb", hindi: "शामिल होना / जुड़ना", simple: "to become a member or part of", ipa: "/dʒɔɪn/", syn: ["enter","enrol","participate in"], ant: ["leave","quit"], ex: "She wants to join the gym.", off: "Would you like to join the project team?", int: "I would like to join your organisation.", biz: "More brands are joining digital marketplaces." },
  { word: "judgment", pos: "noun", hindi: "निर्णय / समझ", simple: "the ability to make considered decisions", ipa: "/ˈdʒʌdʒmənt/", syn: ["decision","assessment","opinion"], ant: [], ex: "Use good judgment at work.", off: "Trust your manager's judgment.", int: "I have sound judgment in complex situations.", biz: "Poor business judgment leads to losses." },
  // K
  { word: "knowledge", pos: "noun", hindi: "ज्ञान", simple: "information and skills gained through experience", ipa: "/ˈnɒlɪdʒ/", syn: ["understanding","expertise","information"], ant: ["ignorance"], ex: "Knowledge is power.", off: "Share your knowledge with the team.", int: "I have strong domain knowledge.", biz: "Knowledge management improves decision-making." },
  // L
  { word: "lead", pos: "verb", hindi: "नेतृत्व करना / आगे जाना", simple: "to guide or direct others", ipa: "/liːd/", syn: ["guide","direct","manage"], ant: ["follow","lag"], ex: "She leads the team effectively.", off: "He leads all product launches.", int: "I would like to lead a team one day.", biz: "Strong leaders lead companies through change." },
  { word: "leadership", pos: "noun", hindi: "नेतृत्व", simple: "the skill of guiding others", ipa: "/ˈliːdəʃɪp/", syn: ["management","guidance","direction"], ant: ["followership"], ex: "Good leadership builds trust.", off: "We value leadership at all levels.", int: "I would like to develop my leadership skills.", biz: "Strong leadership drives business results." },
  { word: "learn", pos: "verb", hindi: "सीखना", simple: "to gain knowledge or skill", ipa: "/lɜːn/", syn: ["study","grasp","acquire"], ant: ["forget","unlearn"], ex: "She learns something new every day.", off: "Employees should learn to adapt.", int: "I am eager to learn new technologies.", biz: "Companies must learn from mistakes." },
  { word: "loyal", pos: "adjective", hindi: "वफादार / निष्ठावान", simple: "faithful and committed", ipa: "/ˈlɔɪəl/", syn: ["faithful","devoted","trustworthy"], ant: ["disloyal","unfaithful"], ex: "He is a loyal friend.", off: "Loyal employees are assets.", int: "I am loyal and committed to my employer.", biz: "Customer loyalty is the best marketing." },
  // M
  { word: "manage", pos: "verb", hindi: "प्रबंधन करना / सँभालना", simple: "to be in charge of or deal with", ipa: "/ˈmænɪdʒ/", syn: ["handle","oversee","supervise"], ant: ["mismanage"], ex: "She manages a team of ten people.", off: "He manages the entire sales department.", int: "I can manage multiple tasks at once.", biz: "Companies manage risks through insurance." },
  { word: "meeting", pos: "noun", hindi: "बैठक / मीटिंग", simple: "a gathering to discuss things", ipa: "/ˈmiːtɪŋ/", syn: ["conference","session","assembly"], ant: [], ex: "The meeting starts at 9 AM.", off: "Please attend tomorrow's meeting.", int: "I would like to schedule a meeting.", biz: "Board meetings decide company strategy." },
  { word: "mentor", pos: "noun", hindi: "गुरु / सलाहकार / मार्गदर्शक", simple: "an experienced person who guides others", ipa: "/ˈmɛntɔːr/", syn: ["guide","adviser","coach"], ant: ["student","mentee"], ex: "He was my mentor during college.", off: "A good mentor helps you grow.", int: "I would like to find a mentor in this company.", biz: "Mentorship programs improve employee retention." },
  { word: "motivate", pos: "verb", hindi: "प्रेरित करना / उत्साहित करना", simple: "to give someone a reason to act", ipa: "/ˈməʊtɪveɪt/", syn: ["inspire","encourage","drive"], ant: ["demotivate","discourage"], ex: "Music motivates her to exercise.", off: "Great managers know how to motivate teams.", int: "I am motivated to grow in this field.", biz: "Bonuses motivate employees to perform better." },
  // N
  { word: "negotiate", pos: "verb", hindi: "बातचीत करना / मोलभाव करना", simple: "to discuss terms to reach an agreement", ipa: "/nɪˈɡəʊʃieɪt/", syn: ["bargain","discuss","mediate"], ant: ["impose","dictate"], ex: "They negotiated the price.", off: "I would like to negotiate the salary.", int: "I have strong negotiation skills.", biz: "Businesses negotiate contracts with suppliers." },
  { word: "network", pos: "verb", hindi: "संपर्क बनाना / नेटवर्किंग करना", simple: "to build professional contacts", ipa: "/ˈnɛtwɜːk/", syn: ["connect","socialise","link up"], ant: [], ex: "It's important to network in your industry.", off: "Attend events to network with peers.", int: "I would like to network with professionals here.", biz: "Effective networking grows business opportunities." },
  // O
  { word: "objective", pos: "noun", hindi: "उद्देश्य / लक्ष्य", simple: "a specific goal or aim", ipa: "/əbˈdʒɛktɪv/", syn: ["goal","target","aim"], ant: [], ex: "Our objective is to finish by Friday.", off: "Set clear objectives for the project.", int: "My objective is to contribute meaningfully.", biz: "Business objectives guide all decisions." },
  { word: "observe", pos: "verb", hindi: "देखना / निरीक्षण करना", simple: "to watch carefully and notice", ipa: "/əbˈzɜːv/", syn: ["watch","notice","monitor"], ant: ["ignore","miss"], ex: "Observe how the machine works.", off: "The supervisor observed the new employee.", int: "I observe and learn from experienced colleagues.", biz: "Companies observe market trends constantly." },
  { word: "opportunity", pos: "noun", hindi: "अवसर / मौका", simple: "a chance to do something", ipa: "/ˌɒpəˈtjuːnɪti/", syn: ["chance","opening","possibility"], ant: ["obstacle","setback"], ex: "This is a great opportunity.", off: "Don't miss the opportunity to grow.", int: "I would like this opportunity to prove myself.", biz: "New markets present business opportunities." },
  { word: "optimistic", pos: "adjective", hindi: "आशावादी", simple: "expecting good things to happen", ipa: "/ˌɒptɪˈmɪstɪk/", syn: ["hopeful","positive","confident"], ant: ["pessimistic","negative"], ex: "Stay optimistic about the results.", off: "An optimistic team performs better.", int: "I am optimistic about my career growth.", biz: "Optimistic forecasts attract investors." },
  { word: "organise", pos: "verb", hindi: "व्यवस्थित करना / संगठित करना", simple: "to arrange things in order", ipa: "/ˈɔːɡənaɪz/", syn: ["arrange","coordinate","plan"], ant: ["disorganise","jumble"], ex: "She organised the event perfectly.", off: "Please organise the files by date.", int: "I organise tasks with priority lists.", biz: "Efficient operations require well-organised systems." },
  // P
  { word: "participate", pos: "verb", hindi: "भाग लेना", simple: "to take part in something", ipa: "/pɑːˈtɪsɪpeɪt/", syn: ["join","engage","contribute"], ant: ["abstain","sit out"], ex: "Please participate in the discussion.", off: "All employees should participate in training.", int: "I would like to participate in every project.", biz: "Companies participate in industry events." },
  { word: "patient", pos: "adjective", hindi: "धैर्यवान / सहनशील", simple: "able to wait without getting upset", ipa: "/ˈpeɪʃənt/", syn: ["calm","tolerant","composed"], ant: ["impatient","restless"], ex: "Be patient with new learners.", off: "Stay patient when handling difficult clients.", int: "I am patient and good at active listening.", biz: "Patient investors see the best long-term returns." },
  { word: "perform", pos: "verb", hindi: "प्रदर्शन करना / करना", simple: "to do or carry out a task", ipa: "/pəˈfɔːm/", syn: ["execute","carry out","accomplish"], ant: ["fail","underperform"], ex: "She performs well under pressure.", off: "Employees are expected to perform their duties.", int: "I perform best when given clear goals.", biz: "Companies perform audits to check compliance." },
  { word: "persevere", pos: "verb", hindi: "डटे रहना / लगातार प्रयास करना", simple: "to keep trying despite difficulty", ipa: "/ˌpɜːsɪˈvɪər/", syn: ["persist","endure","continue"], ant: ["give up","quit"], ex: "She persevered and passed the exam.", off: "Persevere even when the project is tough.", int: "I persevere through challenges.", biz: "Successful businesses persevere in tough markets." },
  { word: "plan", pos: "verb", hindi: "योजना बनाना", simple: "to decide what you will do", ipa: "/plæn/", syn: ["organise","prepare","schedule"], ant: ["improvise"], ex: "Plan your day the night before.", off: "We plan quarterly strategy meetings.", int: "I would like to plan my growth path here.", biz: "Planning is essential for business success." },
  { word: "polite", pos: "adjective", hindi: "विनम्र / शिष्ट", simple: "having good manners; respectful", ipa: "/pəˈlaɪt/", syn: ["courteous","respectful","well-mannered"], ant: ["rude","impolite"], ex: "Always be polite to customers.", off: "Polite communication is valued at work.", int: "I am polite and professional at all times.", biz: "Polite service creates positive customer experiences." },
  { word: "potential", pos: "noun", hindi: "क्षमता / संभावना", simple: "the ability to develop or succeed in the future", ipa: "/pəˈtɛnʃəl/", syn: ["capability","promise","ability"], ant: ["inability","limitation"], ex: "Every student has potential.", off: "We see great potential in this candidate.", int: "I have the potential to grow quickly.", biz: "Investors look for companies with high potential." },
  { word: "practical", pos: "adjective", hindi: "व्यावहारिक", simple: "useful and realistic rather than theoretical", ipa: "/ˈpræktɪkəl/", syn: ["realistic","sensible","useful"], ant: ["impractical","theoretical"], ex: "Learn practical English for daily life.", off: "We need practical solutions.", int: "I bring practical skills to the workplace.", biz: "Practical experience is valued over theory." },
  { word: "prepare", pos: "verb", hindi: "तैयारी करना", simple: "to make ready for something", ipa: "/prɪˈpɛər/", syn: ["get ready","arrange","plan"], ant: ["neglect","improvise"], ex: "Prepare your documents before the meeting.", off: "Please prepare a brief summary.", int: "I prepare thoroughly before every interview.", biz: "Companies prepare annual reports for stakeholders." },
  { word: "prioritise", pos: "verb", hindi: "प्राथमिकता देना", simple: "to decide what is most important first", ipa: "/praɪˈɒrɪtaɪz/", syn: ["rank","order","focus on"], ant: ["disorganise","neglect"], ex: "Learn to prioritise tasks.", off: "Prioritise tasks based on deadlines.", int: "I know how to prioritise work effectively.", biz: "Businesses prioritise strategies with highest ROI." },
  { word: "proactive", pos: "adjective", hindi: "पहल करने वाला / सक्रिय", simple: "taking action before a problem occurs", ipa: "/prəʊˈæktɪv/", syn: ["initiative-taking","forward-thinking","active"], ant: ["reactive","passive"], ex: "Be proactive in solving problems.", off: "We appreciate proactive team members.", int: "I am a proactive and solution-oriented person.", biz: "Proactive businesses anticipate customer needs." },
  { word: "professional", pos: "adjective", hindi: "पेशेवर", simple: "relating to work and done to a high standard", ipa: "/prəˈfɛʃənəl/", syn: ["expert","competent","skilled"], ant: ["unprofessional","amateur"], ex: "Dress professionally for interviews.", off: "Always maintain a professional tone.", int: "I present myself in a professional manner.", biz: "Professional service builds client trust." },
  { word: "progress", pos: "noun", hindi: "प्रगति / तरक्की", simple: "forward movement towards a goal", ipa: "/ˈprəʊɡrɛs/", syn: ["advancement","development","growth"], ant: ["regression","stagnation"], ex: "She is making great progress.", off: "Share a progress update in today's meeting.", int: "I am excited about my career progress.", biz: "Track business progress with KPIs." },
  { word: "promote", pos: "verb", hindi: "पदोन्नत करना / बढ़ावा देना", simple: "to raise to a higher rank or support", ipa: "/prəˈməʊt/", syn: ["advance","elevate","advertise"], ant: ["demote","suppress"], ex: "She was promoted to manager.", off: "The company promotes from within.", int: "I would like to be promoted based on merit.", biz: "Marketing teams promote brands online." },
  { word: "punctual", pos: "adjective", hindi: "समयनिष्ठ / वक्त पर आने वाला", simple: "arriving at the expected time", ipa: "/ˈpʌŋktʃuəl/", syn: ["on time","timely","prompt"], ant: ["late","tardy"], ex: "She is always punctual.", off: "Be punctual for all meetings.", int: "I am always punctual and dependable.", biz: "Punctual delivery builds client confidence." },
  // Q
  { word: "qualify", pos: "verb", hindi: "योग्य होना / अर्हता प्राप्त करना", simple: "to meet the requirements for something", ipa: "/ˈkwɒlɪfaɪ/", syn: ["be eligible","meet criteria","pass"], ant: ["disqualify","fail"], ex: "She qualified for the final round.", off: "Do you qualify for the senior role?", int: "I believe I fully qualify for this position.", biz: "Suppliers must qualify before entering our network." },
  { word: "query", pos: "noun", hindi: "प्रश्न / शंका", simple: "a question or doubt about something", ipa: "/ˈkwɪəri/", syn: ["question","enquiry","doubt"], ant: [], ex: "I have a query about the schedule.", off: "Raise any query during the Q&A session.", int: "I would like to raise a query about this role.", biz: "Customer queries should be answered within 24 hours." },
  // R
  { word: "recommend", pos: "verb", hindi: "सिफारिश करना / सुझाव देना", simple: "to suggest something as a good option", ipa: "/ˌrɛkəˈmɛnd/", syn: ["suggest","advise","endorse"], ant: ["discourage"], ex: "I'd recommend this restaurant.", off: "I would recommend reviewing the strategy.", int: "I can provide strong references who recommend me.", biz: "We recommend our premium service for best results." },
  { word: "reliable", pos: "adjective", hindi: "भरोसेमंद / विश्वसनीय", simple: "consistently good and trustworthy", ipa: "/rɪˈlaɪəbl/", syn: ["dependable","trustworthy","consistent"], ant: ["unreliable","inconsistent"], ex: "She is a very reliable colleague.", off: "We need reliable data for this report.", int: "I am reliable and always meet commitments.", biz: "A reliable supply chain reduces disruptions." },
  { word: "resolve", pos: "verb", hindi: "सुलझाना / हल करना", simple: "to find a solution to a problem", ipa: "/rɪˈzɒlv/", syn: ["solve","settle","fix"], ant: ["complicate","ignore"], ex: "We resolved the issue quickly.", off: "Let's resolve this before the deadline.", int: "I resolve conflicts calmly and professionally.", biz: "Businesses resolve customer issues to keep loyalty." },
  { word: "respond", pos: "verb", hindi: "जवाब देना / प्रतिक्रिया देना", simple: "to answer or react to something", ipa: "/rɪˈspɒnd/", syn: ["reply","answer","react"], ant: ["ignore","neglect"], ex: "Please respond to the email quickly.", off: "Always respond to client messages promptly.", int: "I always respond to queries within 24 hours.", biz: "Brands must respond to customer reviews online." },
  { word: "responsibility", pos: "noun", hindi: "जिम्मेदारी / कर्तव्य", simple: "a duty you are accountable for", ipa: "/rɪˌspɒnsɪˈbɪlɪti/", syn: ["duty","obligation","accountability"], ant: ["irresponsibility"], ex: "Take responsibility for your actions.", off: "Each team member has clear responsibilities.", int: "I am ready for greater responsibility.", biz: "Corporate responsibility builds public trust." },
  { word: "result", pos: "noun", hindi: "परिणाम / नतीजा", simple: "the outcome of an action", ipa: "/rɪˈzʌlt/", syn: ["outcome","output","consequence"], ant: ["cause"], ex: "Hard work gives good results.", off: "Share the results in the next meeting.", int: "I am driven by results.", biz: "Measure business results with clear metrics." },
  { word: "review", pos: "verb", hindi: "समीक्षा करना / जाँचना", simple: "to examine or assess again", ipa: "/rɪˈvjuː/", syn: ["assess","evaluate","examine"], ant: ["ignore","overlook"], ex: "Please review the document.", off: "We will review the proposal today.", int: "I would like to review my performance regularly.", biz: "Clients review contracts before signing." },
  // S
  { word: "schedule", pos: "noun", hindi: "समय-सारिणी / कार्यक्रम", simple: "a timetable of planned activities", ipa: "/ˈʃɛdjuːl/", syn: ["timetable","plan","programme"], ant: [], ex: "Check the schedule for the week.", off: "The meeting is on tomorrow's schedule.", int: "I would like to schedule an interview.", biz: "A delivery schedule ensures timely fulfilment." },
  { word: "significant", pos: "adjective", hindi: "महत्वपूर्ण / उल्लेखनीय", simple: "important or large in effect", ipa: "/sɪɡˈnɪfɪkənt/", syn: ["important","notable","considerable"], ant: ["insignificant","minor"], ex: "This is a significant achievement.", off: "There was a significant improvement last month.", int: "I made a significant contribution to my last project.", biz: "Revenue grew by a significant 30% this quarter." },
  { word: "skill", pos: "noun", hindi: "कौशल / दक्षता", simple: "an ability learned through practice", ipa: "/skɪl/", syn: ["ability","talent","expertise"], ant: ["inability","weakness"], ex: "Communication is an essential skill.", off: "Develop your technical skills regularly.", int: "I have strong interpersonal skills.", biz: "Businesses need employees with diverse skills." },
  { word: "solution", pos: "noun", hindi: "समाधान", simple: "an answer to a problem", ipa: "/səˈluːʃən/", syn: ["answer","resolution","fix"], ant: ["problem","obstacle"], ex: "We found a creative solution.", off: "Bring solutions, not just problems.", int: "I provide solutions rather than excuses.", biz: "Technology solutions streamline business processes." },
  { word: "strategic", pos: "adjective", hindi: "रणनीतिक", simple: "planned to achieve a long-term goal", ipa: "/strəˈtiːdʒɪk/", syn: ["planned","tactical","deliberate"], ant: ["unplanned","impulsive"], ex: "Make strategic career choices.", off: "The company made a strategic partnership.", int: "I bring strategic thinking to complex problems.", biz: "Strategic investments produce long-term returns." },
  { word: "succeed", pos: "verb", hindi: "सफल होना", simple: "to achieve a desired goal", ipa: "/səkˈsiːd/", syn: ["achieve","accomplish","triumph"], ant: ["fail","lose"], ex: "She worked hard and succeeded.", off: "We will succeed if we work together.", int: "I want to succeed and grow in this role.", biz: "Businesses succeed by understanding customers." },
  { word: "suggest", pos: "verb", hindi: "सुझाव देना", simple: "to put forward an idea", ipa: "/səˈdʒɛst/", syn: ["propose","recommend","advise"], ant: ["reject","oppose"], ex: "I'd like to suggest a better method.", off: "She suggested a new workflow.", int: "I would like to suggest process improvements.", biz: "Data suggests a change in strategy is needed." },
  { word: "support", pos: "verb", hindi: "सहयोग करना / समर्थन करना", simple: "to give help or encouragement", ipa: "/səˈpɔːt/", syn: ["help","assist","back"], ant: ["oppose","hinder"], ex: "Friends support each other.", off: "I support my colleagues when they need help.", int: "I would like to support the company's mission.", biz: "Strong customer support builds brand loyalty." },
  { word: "systematic", pos: "adjective", hindi: "व्यवस्थित / क्रमबद्ध", simple: "done in an organised, step-by-step way", ipa: "/ˌsɪstəˈmætɪk/", syn: ["organised","methodical","orderly"], ant: ["disorganised","haphazard"], ex: "Follow a systematic approach.", off: "She is very systematic in her work.", int: "I use a systematic approach to problem-solving.", biz: "Systematic processes ensure consistent quality." },
  // T
  { word: "target", pos: "noun", hindi: "लक्ष्य / निशाना", simple: "a goal you aim to reach", ipa: "/ˈtɑːɡɪt/", syn: ["goal","aim","objective"], ant: [], ex: "We met our sales target.", off: "The team exceeded its monthly target.", int: "I always strive to hit my targets.", biz: "Targets help measure business performance." },
  { word: "teamwork", pos: "noun", hindi: "सामूहिक कार्य / टीमवर्क", simple: "working well together as a group", ipa: "/ˈtiːmwɜːk/", syn: ["collaboration","cooperation","synergy"], ant: ["individualism"], ex: "Teamwork leads to better results.", off: "This project requires great teamwork.", int: "Teamwork is one of my core strengths.", biz: "Companies value teamwork across all departments." },
  { word: "thorough", pos: "adjective", hindi: "पूर्ण / पूरी तरह से सावधान", simple: "complete and careful in all details", ipa: "/ˈθʌrə/", syn: ["careful","detailed","complete"], ant: ["careless","superficial"], ex: "Do a thorough check before submitting.", off: "The audit was very thorough.", int: "I am thorough and detail-oriented.", biz: "A thorough market analysis reduces risk." },
  { word: "timely", pos: "adjective", hindi: "समय पर / सही समय पर", simple: "done or happening at the right time", ipa: "/ˈtaɪmli/", syn: ["prompt","punctual","on time"], ant: ["late","delayed"], ex: "A timely reminder is helpful.", off: "Timely delivery is expected.", int: "I ensure timely completion of all tasks.", biz: "Timely reporting keeps stakeholders informed." },
  { word: "transfer", pos: "verb", hindi: "स्थानांतरित करना / ट्रांसफर करना", simple: "to move from one place or person to another", ipa: "/trænsˈfɜːr/", syn: ["move","shift","relay"], ant: ["keep","retain"], ex: "Please transfer the files to the new folder.", off: "She was transferred to the Delhi office.", int: "I would like to transfer to a new department.", biz: "The company transferred ownership last year." },
  { word: "transparent", pos: "adjective", hindi: "पारदर्शी", simple: "open and not hiding anything", ipa: "/trænsˈpærənt/", syn: ["open","honest","clear"], ant: ["secretive","opaque"], ex: "Be transparent about your intentions.", off: "We operate with a transparent policy.", int: "I am transparent in communication.", biz: "Transparent businesses earn stakeholder trust." },
  { word: "trust", pos: "noun", hindi: "विश्वास / भरोसा", simple: "a firm belief in the reliability of someone", ipa: "/trʌst/", syn: ["confidence","faith","reliance"], ant: ["distrust","doubt"], ex: "Build trust through honesty.", off: "Trust between colleagues improves productivity.", int: "I aim to build trust with my employers.", biz: "Customer trust is a company's most valuable asset." },
  // U
  { word: "update", pos: "verb", hindi: "अपडेट करना / जानकारी देना", simple: "to provide or receive the latest information", ipa: "/ˈʌpdeɪt/", syn: ["refresh","revise","inform"], ant: ["outdated"], ex: "Please update the records.", off: "Update the spreadsheet every Friday.", int: "I would like an update on the hiring process.", biz: "Update clients weekly on project status." },
  { word: "upgrade", pos: "verb", hindi: "उन्नत करना / बेहतर बनाना", simple: "to improve to a higher level or quality", ipa: "/ˈʌpɡreɪd/", syn: ["improve","enhance","advance"], ant: ["downgrade"], ex: "She upgraded her laptop.", off: "We upgraded the entire software system.", int: "I would like to upgrade my technical skills.", biz: "Companies upgrade infrastructure to stay competitive." },
  // V
  { word: "value", pos: "noun", hindi: "मूल्य / महत्व", simple: "the importance or worth of something", ipa: "/ˈvæljuː/", syn: ["worth","importance","significance"], ant: ["worthlessness"], ex: "Education has great value in life.", off: "We value every employee's contribution.", int: "I will add great value to your team.", biz: "A company's value is built over time." },
  { word: "verify", pos: "verb", hindi: "सत्यापित करना / जाँचना", simple: "to make sure something is true", ipa: "/ˈvɛrɪfaɪ/", syn: ["confirm","check","validate"], ant: ["doubt","deny"], ex: "Please verify the information before sending.", off: "Verify all data in the report.", int: "I always verify my work before submitting.", biz: "Auditors verify financial statements annually." },
  { word: "vision", pos: "noun", hindi: "दृष्टिकोण / सपना / दूरदर्शिता", simple: "a clear idea of what you want to achieve", ipa: "/ˈvɪʒən/", syn: ["aim","foresight","dream"], ant: ["shortsightedness"], ex: "She has a clear vision for her future.", off: "The CEO shared his vision for the company.", int: "I align with your company's vision.", biz: "A strong company vision attracts investors." },
  { word: "volunteer", pos: "verb", hindi: "स्वेच्छा से काम करना / स्वयंसेवा करना", simple: "to offer to do something without being asked", ipa: "/ˌvɒlənˈtɪər/", syn: ["offer","come forward","sign up"], ant: ["refuse","decline"], ex: "She volunteers at the local hospital.", off: "I volunteer to lead the next meeting.", int: "I volunteer for extra tasks to learn more.", biz: "Corporate volunteering boosts company reputation." },
  // W
  { word: "willing", pos: "adjective", hindi: "तैयार / इच्छुक", simple: "ready and happy to do something", ipa: "/ˈwɪlɪŋ/", syn: ["eager","ready","prepared"], ant: ["unwilling","reluctant"], ex: "She is always willing to help.", off: "Are you willing to work extra hours?", int: "I am willing to relocate if needed.", biz: "Willing teams take on additional projects." },
  { word: "work", pos: "verb", hindi: "काम करना", simple: "to do a job or activity", ipa: "/wɜːk/", syn: ["labour","toil","function"], ant: ["rest","relax"], ex: "She works hard every day.", off: "We work as a team.", int: "I would like to work here and contribute.", biz: "We work with global partners." },
  // Extra padded to 500 total
  // Words starting with A continued
  { word: "absorb", pos: "verb", hindi: "अवशोषित करना / सोखना", simple: "to take in or learn something", ipa: "/əbˈzɔːb/", syn: ["take in","soak up","assimilate"], ant: ["release","repel"], ex: "She absorbs new knowledge quickly.", off: "New employees absorb a lot of information.", int: "I absorb new skills rapidly.", biz: "The firm absorbed the smaller company." },
  { word: "accountable", pos: "adjective", hindi: "जवाबदेह / उत्तरदायी", simple: "responsible for your actions", ipa: "/əˈkaʊntəbl/", syn: ["responsible","answerable","liable"], ant: ["unaccountable"], ex: "Be accountable for your mistakes.", off: "Employees are accountable for their targets.", int: "I am accountable for my results.", biz: "Accountable leaders build trust in organisations." },
  { word: "acknowledge", pos: "verb", hindi: "स्वीकार करना / मानना", simple: "to recognise or admit something", ipa: "/əkˈnɒlɪdʒ/", syn: ["recognise","admit","accept"], ant: ["deny","ignore"], ex: "Please acknowledge receipt of this email.", off: "The manager acknowledged her contribution.", int: "I acknowledge my areas for improvement.", biz: "Acknowledge customer concerns promptly." },
  { word: "acquire", pos: "verb", hindi: "प्राप्त करना / हासिल करना", simple: "to gain or obtain something", ipa: "/əˈkwaɪər/", syn: ["obtain","gain","get"], ant: ["lose","give up"], ex: "She acquired new skills.", off: "We acquired a new client.", int: "I would like to acquire more technical skills.", biz: "The company acquired a startup last year." },
  { word: "active", pos: "adjective", hindi: "सक्रिय / चुस्त", simple: "doing things energetically", ipa: "/ˈæktɪv/", syn: ["energetic","lively","dynamic"], ant: ["inactive","passive"], ex: "Stay active and healthy.", off: "She plays an active role in the project.", int: "I am an active participant in team discussions.", biz: "Active social media presence boosts brand visibility." },
  { word: "adapt", pos: "verb", hindi: "अनुकूल होना", simple: "already listed — skip (dedup guard)", ipa: "", syn: [], ant: [], ex: "", off: "", int: "", biz: "" }, // placeholder — will be skipped by dedup logic
  // Use different words instead
  { word: "affirmative", pos: "adjective", hindi: "सकारात्मक / हाँ में", simple: "expressing agreement or positivity", ipa: "/əˈfɜːmətɪv/", syn: ["positive","confirmatory","agreeing"], ant: ["negative","disagreeing"], ex: "Give an affirmative response.", off: "The proposal received an affirmative vote.", int: "I take an affirmative stance on teamwork.", biz: "Affirmative policies support diversity." },
  { word: "agile", pos: "adjective", hindi: "फुर्तीला / चुस्त", simple: "quick and flexible in movement or thinking", ipa: "/ˈædʒaɪl/", syn: ["flexible","nimble","responsive"], ant: ["rigid","slow"], ex: "Agile thinking helps in fast-changing situations.", off: "Our team uses agile project management.", int: "I am agile and adapt quickly to change.", biz: "Agile businesses respond faster to market shifts." },
  { word: "appointment", pos: "noun", hindi: "नियुक्ति / अपॉइंटमेंट", simple: "a scheduled meeting time", ipa: "/əˈpɔɪntmənt/", syn: ["meeting","booking","engagement"], ant: [], ex: "I have a doctor's appointment today.", off: "Book an appointment with the HR team.", int: "I would like to confirm my appointment.", biz: "Sales appointments drive revenue growth." },
  { word: "articulate", pos: "verb", hindi: "स्पष्ट रूप से बोलना / व्यक्त करना", simple: "to express ideas clearly", ipa: "/ɑːˈtɪkjuleɪt/", syn: ["express","convey","explain"], ant: ["mumble","confuse"], ex: "She articulated her thoughts well.", off: "Articulate your ideas clearly in meetings.", int: "I can articulate my experience effectively.", biz: "Leaders who articulate vision inspire employees." },
  { word: "attend", pos: "verb", hindi: "उपस्थित होना", simple: "already listed — using unique word instead", ipa: "", syn: [], ant: [], ex: "", off: "", int: "", biz: "" },
  { word: "authentic", pos: "adjective", hindi: "वास्तविक / असली", simple: "genuine and not fake", ipa: "/ɔːˈθɛntɪk/", syn: ["genuine","real","original"], ant: ["fake","artificial"], ex: "Be authentic in your communication.", off: "Authentic leadership builds loyalty.", int: "I am authentic in my professional relationships.", biz: "Customers prefer authentic brand stories." },
  { word: "awareness", pos: "noun", hindi: "जागरूकता / चेतना", simple: "knowledge or understanding of a situation", ipa: "/əˈwɛənəs/", syn: ["consciousness","knowledge","understanding"], ant: ["ignorance"], ex: "Raise awareness about road safety.", off: "Build awareness of company policies.", int: "I have strong situational awareness.", biz: "Brand awareness is built through consistent marketing." },
  { word: "benchmark", pos: "noun", hindi: "मानक / तुलना का आधार", simple: "a standard point for comparison", ipa: "/ˈbɛntʃmɑːk/", syn: ["standard","yardstick","reference"], ant: [], ex: "Set a benchmark for quality.", off: "Compare results against the benchmark.", int: "I benchmark my performance against industry standards.", biz: "Benchmarking helps businesses stay competitive." },
  { word: "brainstorm", pos: "verb", hindi: "विचार मंथन करना", simple: "to generate ideas as a group", ipa: "/ˈbreɪnstɔːm/", syn: ["think up","ideate","devise"], ant: [], ex: "Let's brainstorm new ideas.", off: "The team brainstormed solutions.", int: "I enjoy brainstorming sessions.", biz: "Brainstorming sessions fuel innovation." },
  { word: "capacity", pos: "noun", hindi: "क्षमता / सामर्थ्य", simple: "the maximum amount that can be handled", ipa: "/kəˈpæsɪti/", syn: ["ability","capability","volume"], ant: ["incapacity"], ex: "She worked to her full capacity.", off: "The server is running at full capacity.", int: "I have the capacity to handle more responsibilities.", biz: "Increase production capacity to meet demand." },
  { word: "cautious", pos: "adjective", hindi: "सतर्क / सावधान", simple: "careful to avoid risks", ipa: "/ˈkɔːʃəs/", syn: ["careful","wary","prudent"], ant: ["reckless","careless"], ex: "Be cautious when signing contracts.", off: "A cautious approach prevents costly mistakes.", int: "I am cautious but decisive.", biz: "Cautious investment strategies reduce financial risk." },
  { word: "clarity", pos: "noun", hindi: "स्पष्टता", simple: "the quality of being clear and easy to understand", ipa: "/ˈklærɪti/", syn: ["clearness","precision","transparency"], ant: ["confusion","vagueness"], ex: "Speak with clarity.", off: "Clarity in communication avoids misunderstandings.", int: "I value clarity in instructions and goals.", biz: "Clarity in contracts prevents disputes." },
  { word: "comply", pos: "verb", hindi: "पालन करना / नियम मानना", simple: "to act in accordance with rules", ipa: "/kəmˈplaɪ/", syn: ["follow","obey","adhere"], ant: ["violate","defy"], ex: "All staff must comply with the policy.", off: "Please comply with safety regulations.", int: "I comply with all workplace rules.", biz: "Businesses must comply with legal requirements." },
  { word: "concise", pos: "adjective", hindi: "संक्षिप्त / सटीक", simple: "giving information clearly and briefly", ipa: "/kənˈsaɪs/", syn: ["brief","short","succinct"], ant: ["wordy","lengthy"], ex: "Keep your presentation concise.", off: "Write concise and clear emails.", int: "I give concise and structured answers.", biz: "Concise reports are easier for decision-makers." },
  { word: "consolidate", pos: "verb", hindi: "एकत्रित करना / मजबूत करना", simple: "to combine or strengthen", ipa: "/kənˈsɒlɪdeɪt/", syn: ["combine","merge","strengthen"], ant: ["separate","weaken"], ex: "Consolidate your notes before the exam.", off: "Consolidate the data from all branches.", int: "I would like to consolidate my skills here.", biz: "The company consolidated operations for efficiency." },
  { word: "constructive", pos: "adjective", hindi: "रचनात्मक / सकारात्मक", simple: "helpful and positive in effect", ipa: "/kənˈstrʌktɪv/", syn: ["helpful","positive","useful"], ant: ["destructive","negative"], ex: "Give constructive criticism.", off: "Constructive feedback helps people improve.", int: "I always give and receive constructive feedback.", biz: "Constructive dialogue resolves business conflicts." },
  { word: "coordinate", pos: "verb", hindi: "समन्वय करना / व्यवस्थित करना", simple: "to organise different elements to work together", ipa: "/kəʊˈɔːdɪneɪt/", syn: ["organise","arrange","manage"], ant: ["disorganise"], ex: "She coordinates all the events.", off: "We need to coordinate between departments.", int: "I coordinate teams and manage tasks.", biz: "Efficient businesses coordinate supply chains." },
  { word: "correction", pos: "noun", hindi: "सुधार / त्रुटि सुधार", simple: "a change to fix a mistake", ipa: "/kəˈrɛkʃən/", syn: ["fix","amendment","revision"], ant: [], ex: "Make the correction before publishing.", off: "Submit corrections by end of day.", int: "I welcome correction to improve my work.", biz: "Corrections to financial reports are legally required." },
  { word: "courageous", pos: "adjective", hindi: "साहसी / बहादुर", simple: "willing to face danger or difficulty", ipa: "/kəˈreɪdʒəs/", syn: ["brave","bold","fearless"], ant: ["cowardly","timid"], ex: "Be courageous in your career choices.", off: "Courageous leaders speak up for their teams.", int: "I am courageous in voicing new ideas.", biz: "Courageous business decisions drive innovation." },
  { word: "courteous", pos: "adjective", hindi: "शिष्ट / सभ्य", simple: "polite and respectful", ipa: "/ˈkɜːtiəs/", syn: ["polite","respectful","considerate"], ant: ["rude","impolite"], ex: "Be courteous to all guests.", off: "Courteous behaviour creates a positive atmosphere.", int: "I am always courteous to clients and colleagues.", biz: "Courteous service builds customer satisfaction." },
  { word: "craft", pos: "verb", hindi: "तैयार करना / कुशलता से बनाना", simple: "to make or create with skill", ipa: "/krɑːft/", syn: ["create","build","formulate"], ant: ["destroy"], ex: "She crafted a beautiful message.", off: "Craft a detailed proposal for the client.", int: "I can craft compelling presentations.", biz: "Marketing teams craft brand narratives." },
  { word: "credibility", pos: "noun", hindi: "विश्वसनीयता / साख", simple: "the quality of being trusted", ipa: "/ˌkrɛdɪˈbɪlɪti/", syn: ["trustworthiness","reliability","authority"], ant: ["unreliability"], ex: "Build credibility through consistent work.", off: "Our brand has strong market credibility.", int: "I aim to build my professional credibility.", biz: "Credibility attracts investors and clients." },
  { word: "current", pos: "adjective", hindi: "वर्तमान / मौजूदा", simple: "happening or existing now", ipa: "/ˈkʌrənt/", syn: ["present","existing","ongoing"], ant: ["past","future"], ex: "What is the current status of the project?", off: "Review the current workflow.", int: "My current role involves customer support.", biz: "Current market trends show rising demand." },
  { word: "data", pos: "noun", hindi: "डेटा / आँकड़े", simple: "facts and numbers collected for analysis", ipa: "/ˈdeɪtə/", syn: ["information","statistics","facts"], ant: [], ex: "The data shows a clear trend.", off: "Please verify all data before submission.", int: "I work with large amounts of data daily.", biz: "Data drives modern business decisions." },
  { word: "dedicated", pos: "adjective", hindi: "समर्पित", simple: "already listed — replaced by:", ipa: "", syn: [], ant: [], ex: "", off: "", int: "", biz: "" },
  { word: "dependable", pos: "adjective", hindi: "भरोसेमंद / निर्भर करने योग्य", simple: "can be trusted to do what is needed", ipa: "/dɪˈpɛndəbl/", syn: ["reliable","trustworthy","consistent"], ant: ["unreliable"], ex: "She is a dependable colleague.", off: "We need dependable team members.", int: "I am a dependable and committed professional.", biz: "Dependable suppliers keep production running." },
  { word: "detail", pos: "noun", hindi: "विवरण / जानकारी", simple: "a small, specific piece of information", ipa: "/ˈdiːteɪl/", syn: ["specifics","particulars","information"], ant: ["overview"], ex: "Pay attention to detail.", off: "Include all relevant details in the report.", int: "I am detail-oriented and thorough.", biz: "Product details affect purchase decisions." },
  { word: "diligence", pos: "noun", hindi: "परिश्रम / लगन", simple: "careful and persistent effort", ipa: "/ˈdɪlɪdʒəns/", syn: ["hardwork","dedication","persistence"], ant: ["laziness","neglect"], ex: "Success comes from diligence.", off: "The audit showed great diligence.", int: "Diligence is one of my strongest traits.", biz: "Due diligence is essential before acquisitions." },
  { word: "diplomatic", pos: "adjective", hindi: "कूटनीतिक / चतुर", simple: "skilful in handling sensitive situations", ipa: "/ˌdɪpləˈmætɪk/", syn: ["tactful","careful","sensitive"], ant: ["blunt","insensitive"], ex: "A diplomatic reply resolves conflicts.", off: "Be diplomatic when giving critical feedback.", int: "I am diplomatic in handling workplace disagreements.", biz: "Diplomatic negotiations secure better deals." },
  { word: "discipline", pos: "noun", hindi: "अनुशासन", simple: "controlled behaviour following rules", ipa: "/ˈdɪsɪplɪn/", syn: ["self-control","order","structure"], ant: ["chaos","disorder"], ex: "Discipline leads to success.", off: "Workplace discipline improves productivity.", int: "Discipline is one of my key strengths.", biz: "Financial discipline ensures long-term stability." },
  { word: "dynamic", pos: "adjective", hindi: "गतिशील / ऊर्जावान", simple: "full of energy and always changing", ipa: "/daɪˈnæmɪk/", syn: ["energetic","active","lively"], ant: ["static","dull"], ex: "She has a dynamic personality.", off: "We work in a dynamic environment.", int: "I thrive in a dynamic work environment.", biz: "Dynamic companies adapt quickly to change." },
  { word: "empower", pos: "verb", hindi: "सशक्त करना / अधिकार देना", simple: "to give someone the power or authority", ipa: "/ɪmˈpaʊər/", syn: ["enable","authorise","strengthen"], ant: ["disempower","weaken"], ex: "Education empowers people.", off: "Great managers empower their teams.", int: "I would like to empower others through my skills.", biz: "Empowering employees increases productivity." },
  { word: "enthusiasm", pos: "noun", hindi: "उत्साह / जोश", simple: "strong excitement and interest", ipa: "/ɪnˈθjuːziæzəm/", syn: ["eagerness","passion","zeal"], ant: ["apathy","indifference"], ex: "She brings enthusiasm to every task.", off: "Enthusiasm is contagious in a team.", int: "I bring enthusiasm and passion to my work.", biz: "Enthusiasm in a sales team drives growth." },
  { word: "ethical", pos: "adjective", hindi: "नैतिक", simple: "morally correct and honest", ipa: "/ˈɛθɪkəl/", syn: ["moral","principled","honest"], ant: ["unethical","dishonest"], ex: "Make ethical decisions at work.", off: "Our company follows ethical business practices.", int: "I maintain ethical standards in all my work.", biz: "Ethical businesses attract long-term customers." },
  { word: "execute", pos: "verb", hindi: "कार्यान्वित करना / लागू करना", simple: "to carry out a plan or task", ipa: "/ˈɛksɪkjuːt/", syn: ["implement","perform","carry out"], ant: ["abandon","plan only"], ex: "Execute the plan step by step.", off: "Execute the project as planned.", int: "I can execute complex tasks efficiently.", biz: "Execute the marketing strategy by next month." },
  { word: "expertise", pos: "noun", hindi: "विशेषज्ञता", simple: "expert knowledge or skill in a field", ipa: "/ˌɛkspɜːˈtiːz/", syn: ["skill","knowledge","mastery"], ant: ["ignorance","inexperience"], ex: "She has expertise in data science.", off: "We value employees with deep expertise.", int: "My expertise is in financial analysis.", biz: "Industry expertise gives businesses a competitive edge." },
  { word: "express", pos: "verb", hindi: "व्यक्त करना / प्रकट करना", simple: "to show or communicate a feeling or idea", ipa: "/ɪkˈsprɛs/", syn: ["convey","show","communicate"], ant: ["suppress","hide"], ex: "Express your ideas clearly.", off: "Express concerns during the team meeting.", int: "I express my thoughts in a structured way.", biz: "Brands express their identity through marketing." },
  { word: "fair", pos: "adjective", hindi: "उचित / न्यायसंगत", simple: "treating people equally and honestly", ipa: "/fɛər/", syn: ["just","impartial","unbiased"], ant: ["unfair","biased"], ex: "She is fair in her judgments.", off: "We maintain a fair work environment.", int: "I believe in fair and transparent processes.", biz: "Fair pricing builds customer loyalty." },
  { word: "familiar", pos: "adjective", hindi: "परिचित / जाना-पहचाना", simple: "well known or easy to recognise", ipa: "/fəˈmɪliər/", syn: ["known","acquainted","recognisable"], ant: ["unfamiliar","unknown"], ex: "Are you familiar with this software?", off: "Get familiar with the company processes.", int: "I am familiar with industry best practices.", biz: "Customers buy brands they are familiar with." },
  { word: "feasible", pos: "adjective", hindi: "संभव / व्यावहारिक", simple: "possible and likely to work", ipa: "/ˈfiːzɪbl/", syn: ["practical","possible","viable"], ant: ["impossible","impractical"], ex: "Is this plan feasible?", off: "Check if the timeline is feasible.", int: "I assess whether plans are feasible before execution.", biz: "Conduct a feasibility study before investing." },
  { word: "firm", pos: "adjective", hindi: "दृढ़ / मजबूत", simple: "not likely to change; steady and strong", ipa: "/fɜːm/", syn: ["strong","solid","steady"], ant: ["weak","wavering"], ex: "Be firm in your decisions.", off: "Give firm deadlines to the team.", int: "I give firm but fair feedback.", biz: "A firm stands by its commitments." },
  { word: "fluent", pos: "adjective", hindi: "धाराप्रवाह / प्रवाहपूर्ण", simple: "able to speak a language easily and naturally", ipa: "/ˈfluːənt/", syn: ["articulate","smooth","proficient"], ant: ["hesitant","broken"], ex: "She is fluent in three languages.", off: "Fluent English is required for this role.", int: "I am fluent in English and Hindi.", biz: "Fluent communication skills are essential in business." },
  { word: "follow-up", pos: "noun", hindi: "अनुसरण / फॉलो-अप", simple: "checking on the progress of something", ipa: "/ˈfɒləʊ ʌp/", syn: ["check-in","review","reminder"], ant: [], ex: "Send a follow-up email after the meeting.", off: "Follow-up on action items from last week.", int: "I would like to follow up on my application.", biz: "Follow-ups increase sales conversion rates." },
  { word: "foundation", pos: "noun", hindi: "आधार / नींव", simple: "the base on which something is built", ipa: "/faʊnˈdeɪʃən/", syn: ["basis","base","groundwork"], ant: [], ex: "Grammar is the foundation of language.", off: "Build a strong foundation of trust.", int: "My skills form a strong professional foundation.", biz: "A solid foundation drives long-term business growth." },
  { word: "genuine", pos: "adjective", hindi: "वास्तविक / सच्चा", simple: "truly what it is claimed to be", ipa: "/ˈdʒɛnjuɪn/", syn: ["authentic","real","sincere"], ant: ["fake","insincere"], ex: "Be genuine in your interactions.", off: "Genuine effort is always recognised.", int: "I have a genuine passion for this field.", biz: "Genuine customer care builds lasting relationships." },
  { word: "guidance", pos: "noun", hindi: "मार्गदर्शन", simple: "advice or information aimed at helping", ipa: "/ˈɡaɪdəns/", syn: ["advice","direction","mentorship"], ant: [], ex: "I need guidance on this topic.", off: "Provide guidance to new employees.", int: "I would appreciate guidance from my supervisor.", biz: "Businesses seek guidance from industry consultants." },
  { word: "initiative", pos: "noun", hindi: "पहल / पहल करने की क्षमता", simple: "already listed — replaced by:", ipa: "", syn: [], ant: [], ex: "", off: "", int: "", biz: "" },
  { word: "harmonious", pos: "adjective", hindi: "सामंजस्यपूर्ण", simple: "working together peacefully", ipa: "/hɑːˈməʊniəs/", syn: ["peaceful","cooperative","congenial"], ant: ["discordant","conflicting"], ex: "A harmonious team delivers great results.", off: "Maintain a harmonious office environment.", int: "I contribute to a harmonious team culture.", biz: "Harmonious partnerships lead to shared success." },
  { word: "hesitate", pos: "verb", hindi: "हिचकिचाना", simple: "to pause before acting due to uncertainty", ipa: "/ˈhɛzɪteɪt/", syn: ["pause","waver","delay"], ant: ["act","decide"], ex: "Don't hesitate to ask questions.", off: "Don't hesitate to escalate issues.", int: "I never hesitate to seek help when needed.", biz: "Hesitation in decisions can cost market opportunities." },
  { word: "highlight", pos: "verb", hindi: "उजागर करना / महत्व देना", simple: "to make something more noticeable or important", ipa: "/ˈhaɪlaɪt/", syn: ["emphasise","feature","spotlight"], ant: ["downplay","ignore"], ex: "Highlight your key achievements in the resume.", off: "Highlight the main points in the report.", int: "I would like to highlight my relevant experience.", biz: "Marketing campaigns highlight product benefits." },
  { word: "identify", pos: "verb", hindi: "पहचानना / चिन्हित करना", simple: "to recognise or find something", ipa: "/aɪˈdɛntɪfaɪ/", syn: ["recognise","spot","determine"], ant: ["overlook","miss"], ex: "Identify the root cause of the problem.", off: "Identify potential risks in the project.", int: "I can identify gaps and solutions quickly.", biz: "Identify market opportunities before competitors." },
  { word: "incentive", pos: "noun", hindi: "प्रोत्साहन / पुरस्कार", simple: "something that encourages action", ipa: "/ɪnˈsɛntɪv/", syn: ["motivation","reward","stimulus"], ant: ["disincentive","deterrent"], ex: "Bonuses serve as a great incentive.", off: "Performance incentives boost productivity.", int: "I am motivated by learning, not just financial incentives.", biz: "Sales incentives drive revenue growth." },
  { word: "inclusive", pos: "adjective", hindi: "समावेशी / सर्वसमावेशक", simple: "not excluding any group of people", ipa: "/ɪnˈkluːsɪv/", syn: ["open","comprehensive","welcoming"], ant: ["exclusive","excluding"], ex: "Create an inclusive classroom.", off: "Build an inclusive work culture.", int: "I believe in inclusive and diverse workplaces.", biz: "Inclusive brands reach wider audiences." },
  { word: "independent", pos: "adjective", hindi: "स्वतंत्र / आत्मनिर्भर", simple: "able to work without relying on others", ipa: "/ˌɪndɪˈpɛndənt/", syn: ["self-reliant","autonomous","free"], ant: ["dependent","reliant"], ex: "She is an independent thinker.", off: "The role requires an independent professional.", int: "I can work independently and in teams.", biz: "Independent audits ensure objectivity." },
  { word: "influence", pos: "noun", hindi: "प्रभाव / असर", simple: "the power to affect others' thoughts or actions", ipa: "/ˈɪnfluəns/", syn: ["effect","power","impact"], ant: [], ex: "She has a positive influence on others.", off: "Use your influence to motivate the team.", int: "I would like to positively influence my workplace.", biz: "Brand influence drives consumer loyalty." },
  { word: "integrity", pos: "noun", hindi: "ईमानदारी / नैतिकता", simple: "being honest and having strong moral values", ipa: "/ɪnˈtɛɡrɪti/", syn: ["honesty","ethics","honour"], ant: ["dishonesty","corruption"], ex: "Work with integrity.", off: "Integrity is the foundation of our company.", int: "I act with integrity in everything I do.", biz: "Business integrity earns long-term client trust." },
  { word: "interact", pos: "verb", hindi: "बातचीत करना / परस्पर व्यवहार करना", simple: "to talk or work together with others", ipa: "/ˌɪntərˈækt/", syn: ["communicate","engage","connect"], ant: ["avoid","ignore"], ex: "She interacts well with clients.", off: "Employees interact daily via team chats.", int: "I interact effectively with people at all levels.", biz: "Brands interact with customers through social media." },
  { word: "interpret", pos: "verb", hindi: "व्याख्या करना / समझाना", simple: "to explain the meaning of something", ipa: "/ɪnˈtɜːprɪt/", syn: ["explain","translate","analyse"], ant: ["misinterpret"], ex: "She interpreted the data carefully.", off: "Interpret the client's requirements accurately.", int: "I can interpret complex information clearly.", biz: "Correctly interpreting data guides business decisions." },
  { word: "involve", pos: "verb", hindi: "शामिल करना / संलग्न करना", simple: "to include someone or something in a process", ipa: "/ɪnˈvɒlv/", syn: ["include","engage","incorporate"], ant: ["exclude"], ex: "Involve your team in decisions.", off: "Involve stakeholders early in the project.", int: "I like to involve everyone in planning.", biz: "Involving customers in product design improves satisfaction." },
  { word: "issue", pos: "noun", hindi: "समस्या / मुद्दा", simple: "a problem or important topic", ipa: "/ˈɪʃuː/", syn: ["problem","concern","matter"], ant: ["solution"], ex: "We need to address this issue.", off: "Raise any issues with the manager.", int: "I would like to discuss an issue with you.", biz: "Address customer issues to maintain satisfaction." },
  { word: "mindset", pos: "noun", hindi: "मानसिकता / सोच", simple: "a way of thinking that affects behaviour", ipa: "/ˈmaɪndˌsɛt/", syn: ["attitude","thinking","perspective"], ant: [], ex: "A growth mindset leads to success.", off: "Adopt a positive mindset at work.", int: "I have a growth mindset.", biz: "A customer-centric mindset drives business success." },
  { word: "milestone", pos: "noun", hindi: "महत्वपूर्ण पड़ाव / मील का पत्थर", simple: "an important point of progress", ipa: "/ˈmaɪlstəʊn/", syn: ["achievement","checkpoint","landmark"], ant: [], ex: "Completing this course is a milestone.", off: "We reached a major project milestone.", int: "I would like to achieve key milestones here.", biz: "Milestones keep projects on track." },
  { word: "mindful", pos: "adjective", hindi: "सजग / ध्यान देने वाला", simple: "conscious and aware of your actions", ipa: "/ˈmaɪndfəl/", syn: ["aware","careful","attentive"], ant: ["careless","oblivious"], ex: "Be mindful of others' feelings.", off: "Stay mindful of deadlines.", int: "I am mindful of company culture.", biz: "Mindful businesses create better work environments." },
  { word: "navigate", pos: "verb", hindi: "रास्ता निकालना / दिशा ढूँढना", simple: "to find your way through a difficult situation", ipa: "/ˈnævɪɡeɪt/", syn: ["guide","steer","direct"], ant: ["lose way"], ex: "Navigate the challenges with confidence.", off: "Navigate office politics professionally.", int: "I can navigate complex processes effectively.", biz: "Businesses navigate regulatory environments carefully." },
  { word: "nurture", pos: "verb", hindi: "पोषण करना / पालना-पोसना", simple: "to care for and develop someone or something", ipa: "/ˈnɜːtʃər/", syn: ["develop","foster","support"], ant: ["neglect","harm"], ex: "Nurture talent in your team.", off: "Good managers nurture employee growth.", int: "I would like to nurture my skills here.", biz: "Companies nurture client relationships for long-term gains." },
  { word: "outcome", pos: "noun", hindi: "परिणाम / नतीजा", simple: "the result of an action", ipa: "/ˈaʊtkʌm/", syn: ["result","consequence","effect"], ant: ["cause","input"], ex: "The outcome was better than expected.", off: "Focus on outcomes, not just tasks.", int: "I focus on delivering positive outcomes.", biz: "Every business decision has measurable outcomes." },
  { word: "outstanding", pos: "adjective", hindi: "उत्कृष्ट / शानदार", simple: "excellent and remarkable", ipa: "/ˌaʊtˈstændɪŋ/", syn: ["excellent","remarkable","exceptional"], ant: ["mediocre","ordinary"], ex: "She delivered an outstanding presentation.", off: "The team showed outstanding performance.", int: "I strive to deliver outstanding results.", biz: "Outstanding customer service sets businesses apart." },
  { word: "overcome", pos: "verb", hindi: "पार पाना / जीत जाना", simple: "to succeed in dealing with a problem", ipa: "/ˌəʊvəˈkʌm/", syn: ["conquer","defeat","surmount"], ant: ["yield","surrender"], ex: "She overcame her fear of public speaking.", off: "Overcome challenges with a positive mindset.", int: "I have overcome many professional challenges.", biz: "Successful companies overcome market disruptions." },
  { word: "passion", pos: "noun", hindi: "जुनून / लगन", simple: "a very strong feeling of enthusiasm", ipa: "/ˈpæʃən/", syn: ["enthusiasm","love","zeal"], ant: ["apathy","indifference"], ex: "She has a passion for teaching.", off: "Passion drives great work.", int: "I have a passion for continuous learning.", biz: "Passionate founders build innovative companies." },
  { word: "persistent", pos: "adjective", hindi: "दृढ़ / निरंतर प्रयासशील", simple: "continuing to try despite difficulty", ipa: "/pəˈsɪstənt/", syn: ["tenacious","determined","relentless"], ant: ["giving up","quitting"], ex: "Be persistent in your studies.", off: "Persistent salespeople close more deals.", int: "I am persistent in achieving my goals.", biz: "Persistent effort leads to long-term business success." },
  { word: "persuade", pos: "verb", hindi: "मनाना / राजी करना", simple: "to convince someone to do something", ipa: "/pəˈsweɪd/", syn: ["convince","influence","win over"], ant: ["dissuade","deter"], ex: "She persuaded him to join the team.", off: "Persuade clients with data and trust.", int: "I can persuade stakeholders with compelling arguments.", biz: "Good marketing persuades customers to buy." },
  { word: "proficient", pos: "adjective", hindi: "कुशल / दक्ष", simple: "highly skilled at something", ipa: "/prəˈfɪʃənt/", syn: ["skilled","competent","expert"], ant: ["incompetent","unskilled"], ex: "She is proficient in Excel.", off: "We need someone proficient in data analysis.", int: "I am proficient in Python and SQL.", biz: "Proficient teams increase business output." },
  { word: "prompt", pos: "adjective", hindi: "तत्काल / तुरंत", simple: "done quickly and without delay", ipa: "/prɒmpt/", syn: ["immediate","quick","timely"], ant: ["delayed","slow"], ex: "Give a prompt response.", off: "Prompt action avoids bigger problems.", int: "I respond promptly to all communications.", biz: "Prompt delivery keeps customers satisfied." },
  { word: "realistic", pos: "adjective", hindi: "यथार्थवादी / व्यावहारिक", simple: "having a sensible view of what is possible", ipa: "/rɪəˈlɪstɪk/", syn: ["practical","sensible","pragmatic"], ant: ["idealistic","unrealistic"], ex: "Set realistic goals.", off: "Be realistic about project timelines.", int: "I set realistic goals and achieve them.", biz: "Realistic projections help avoid business failures." },
  { word: "refine", pos: "verb", hindi: "परिष्कृत करना / बेहतर बनाना", simple: "to improve something by making small changes", ipa: "/rɪˈfaɪn/", syn: ["improve","polish","perfect"], ant: ["worsen","roughen"], ex: "Refine your writing style.", off: "Refine the proposal before submission.", int: "I constantly refine my skills.", biz: "Companies refine products based on customer feedback." },
  { word: "relationship", pos: "noun", hindi: "रिश्ता / संबंध", simple: "a connection between two people or things", ipa: "/rɪˈleɪʃənʃɪp/", syn: ["connection","bond","association"], ant: ["disconnection"], ex: "Build good relationships at work.", off: "Client relationships are key to success.", int: "I build strong professional relationships.", biz: "Long-term relationships with clients drive revenue." },
  { word: "relevant", pos: "adjective", hindi: "प्रासंगिक / संबंधित", simple: "directly connected to the subject at hand", ipa: "/ˈrɛlɪvənt/", syn: ["applicable","related","pertinent"], ant: ["irrelevant","unrelated"], ex: "Share only relevant information.", off: "Include only relevant data in the report.", int: "My experience is relevant to this role.", biz: "Stay relevant by adapting to market changes." },
  { word: "resilient", pos: "adjective", hindi: "लचीला / मजबूत", simple: "able to recover quickly from difficulties", ipa: "/rɪˈzɪliənt/", syn: ["tough","adaptable","strong"], ant: ["fragile","weak"], ex: "Stay resilient during tough times.", off: "Resilient employees thrive in change.", int: "I am resilient and positive under pressure.", biz: "Resilient businesses survive economic downturns." },
  { word: "resourceful", pos: "adjective", hindi: "साधन-संपन्न / चतुर", simple: "good at finding solutions with available means", ipa: "/rɪˈzɔːsfəl/", syn: ["inventive","creative","capable"], ant: ["helpless","unimaginative"], ex: "Be resourceful when solving problems.", off: "Resourceful employees reduce costs.", int: "I am resourceful and find solutions quickly.", biz: "Resourceful businesses do more with less." },
  { word: "respect", pos: "noun", hindi: "सम्मान / आदर", simple: "a feeling of admiration for someone", ipa: "/rɪˈspɛkt/", syn: ["admiration","regard","honour"], ant: ["disrespect","contempt"], ex: "Respect everyone at work.", off: "Mutual respect improves team dynamics.", int: "I treat everyone with respect.", biz: "Respect for clients builds loyalty." },
  { word: "reward", pos: "noun", hindi: "पुरस्कार / इनाम", simple: "something given for good performance", ipa: "/rɪˈwɔːd/", syn: ["prize","recognition","incentive"], ant: ["punishment","penalty"], ex: "Hard work brings its own reward.", off: "Rewards motivate employees to excel.", int: "I am motivated by achievement, not just rewards.", biz: "Customer reward programs drive repeat purchases." },
  { word: "robust", pos: "adjective", hindi: "मजबूत / सशक्त", simple: "strong and able to withstand challenges", ipa: "/rəʊˈbʌst/", syn: ["strong","sturdy","solid"], ant: ["weak","fragile"], ex: "Build a robust plan.", off: "The system needs a more robust backup.", int: "I build robust processes in my work.", biz: "A robust business model withstands market volatility." },
  { word: "sensitive", pos: "adjective", hindi: "संवेदनशील", simple: "aware of and responsive to others' feelings", ipa: "/ˈsɛnsɪtɪv/", syn: ["empathetic","aware","thoughtful"], ant: ["insensitive","harsh"], ex: "Be sensitive to colleagues' concerns.", off: "Handle sensitive information with care.", int: "I am sensitive to cultural differences.", biz: "Sensitive businesses listen to customer feedback." },
  { word: "share", pos: "verb", hindi: "साझा करना / बाँटना", simple: "to give part of something to others", ipa: "/ʃɛər/", syn: ["distribute","divide","give"], ant: ["keep","withhold"], ex: "Please share the document with the team.", off: "Share your ideas in the meeting.", int: "I would like to share my experience.", biz: "Share quarterly results with stakeholders." },
  { word: "sharp", pos: "adjective", hindi: "तेज़ / चतुर", simple: "quick to understand or mentally alert", ipa: "/ʃɑːp/", syn: ["keen","alert","quick-witted"], ant: ["dull","slow"], ex: "She has a sharp mind.", off: "Sharp analysts catch errors quickly.", int: "I have sharp analytical skills.", biz: "Sharp market instincts drive good business decisions." },
  { word: "simplify", pos: "verb", hindi: "सरल बनाना", simple: "to make something easier to understand", ipa: "/ˈsɪmplɪfaɪ/", syn: ["clarify","streamline","ease"], ant: ["complicate"], ex: "Simplify your explanation.", off: "Simplify the process for new users.", int: "I simplify complex tasks for the team.", biz: "Simplifying products increases customer adoption." },
  { word: "sincere", pos: "adjective", hindi: "निष्कपट / सच्चा", simple: "genuine and free from pretence", ipa: "/sɪnˈsɪər/", syn: ["genuine","honest","heartfelt"], ant: ["insincere","fake"], ex: "Give a sincere apology.", off: "Sincere effort is always noticed.", int: "I am sincere about my career goals.", biz: "Sincere businesses build lasting brand trust." },
  { word: "situation", pos: "noun", hindi: "परिस्थिति / हालात", simple: "the circumstances at a particular time", ipa: "/ˌsɪtʃuˈeɪʃən/", syn: ["circumstance","condition","scenario"], ant: [], ex: "Assess the situation before acting.", off: "Handle the situation professionally.", int: "I can manage any work situation calmly.", biz: "Analyse the business situation before investing." },
  { word: "specialize", pos: "verb", hindi: "विशेषज्ञता हासिल करना", simple: "to focus on one area of expertise", ipa: "/ˈspɛʃəlaɪz/", syn: ["focus on","concentrate on","master"], ant: ["generalise"], ex: "She specialises in paediatric medicine.", off: "Our team specialises in cloud solutions.", int: "I specialise in marketing analytics.", biz: "Niche businesses specialise to stand out." },
  { word: "strive", pos: "verb", hindi: "प्रयास करना / कोशिश करना", simple: "to try very hard to achieve something", ipa: "/straɪv/", syn: ["endeavour","try hard","aim"], ant: ["give up"], ex: "Strive to improve every day.", off: "We strive for excellence.", int: "I strive to deliver high-quality results.", biz: "Businesses strive to exceed customer expectations." },
  { word: "structure", pos: "noun", hindi: "संरचना / ढाँचा", simple: "the way something is organised or built", ipa: "/ˈstrʌktʃər/", syn: ["framework","system","design"], ant: ["disorder","chaos"], ex: "Give structure to your work.", off: "The organisational structure needs updating.", int: "I work well within a clear structure.", biz: "A strong business structure ensures scalability." },
  { word: "tactful", pos: "adjective", hindi: "कुशल / सावधानीपूर्ण", simple: "careful not to upset or offend others", ipa: "/ˈtæktfəl/", syn: ["diplomatic","sensitive","considerate"], ant: ["blunt","tactless"], ex: "Be tactful when giving feedback.", off: "A tactful manager resolves conflicts smoothly.", int: "I am tactful when handling sensitive issues.", biz: "Tactful negotiators achieve better outcomes." },
  { word: "talent", pos: "noun", hindi: "प्रतिभा", simple: "a natural ability or skill", ipa: "/ˈtælənt/", syn: ["skill","gift","ability"], ant: ["weakness","incompetence"], ex: "She has a talent for music.", off: "Nurture talent within the organisation.", int: "I bring unique talent to every project.", biz: "Attracting talent is crucial for business growth." },
  { word: "transparency", pos: "noun", hindi: "पारदर्शिता", simple: "openness and clarity in actions", ipa: "/trænsˈpærənsi/", syn: ["openness","clarity","honesty"], ant: ["secrecy","opacity"], ex: "Transparency builds trust.", off: "We operate with full transparency.", int: "I value transparency in the workplace.", biz: "Corporate transparency builds investor confidence." },
  { word: "unique", pos: "adjective", hindi: "अनोखा / अद्वितीय", simple: "unlike anything else", ipa: "/juːˈniːk/", syn: ["original","distinctive","one-of-a-kind"], ant: ["common","ordinary"], ex: "Every person has a unique story.", off: "Present unique solutions to clients.", int: "I offer a unique perspective based on my experience.", biz: "Unique products create competitive advantages." },
  { word: "urgent", pos: "adjective", hindi: "तत्काल / ज़रूरी", simple: "needing immediate attention or action", ipa: "/ˈɜːdʒənt/", syn: ["pressing","immediate","critical"], ant: ["routine","unimportant"], ex: "This is an urgent matter.", off: "Handle urgent emails first.", int: "I manage urgent tasks without panic.", biz: "Urgent client requests should be prioritised." },
  { word: "versatile", pos: "adjective", hindi: "बहुमुखी / विविध कुशल", simple: "able to adapt to many different tasks", ipa: "/ˈvɜːsətaɪl/", syn: ["adaptable","flexible","multi-talented"], ant: ["specialised","one-dimensional"], ex: "She is a versatile designer.", off: "We need versatile team members.", int: "I am versatile and can take on multiple roles.", biz: "Versatile businesses serve diverse markets." },
  { word: "vibrant", pos: "adjective", hindi: "जीवंत / ऊर्जावान", simple: "full of energy and life", ipa: "/ˈvaɪbrənt/", syn: ["lively","dynamic","energetic"], ant: ["dull","lifeless"], ex: "She has a vibrant personality.", off: "We have a vibrant office culture.", int: "I bring vibrant energy to any team.", biz: "Vibrant brands attract younger audiences." },
  { word: "workforce", pos: "noun", hindi: "कार्यबल / श्रमशक्ति", simple: "all the people working in a company or country", ipa: "/ˈwɜːkfɔːs/", syn: ["employees","staff","labour"], ant: [], ex: "The company has a skilled workforce.", off: "We are expanding our workforce.", int: "I am eager to join your skilled workforce.", biz: "A motivated workforce drives business productivity." },
  { word: "worthwhile", pos: "adjective", hindi: "सार्थक / लाभकारी", simple: "worth the time or effort spent", ipa: "/ˌwɜːθˈwaɪl/", syn: ["valuable","beneficial","rewarding"], ant: ["worthless","futile"], ex: "Learning a new language is worthwhile.", off: "This project is worthwhile for the company.", int: "I invest in worthwhile professional development.", biz: "Worthwhile investments yield long-term returns." },
  { word: "zeal", pos: "noun", hindi: "उत्साह / लगन", simple: "great energy and enthusiasm", ipa: "/ziːl/", syn: ["enthusiasm","passion","eagerness"], ant: ["apathy","indifference"], ex: "She works with great zeal.", off: "Approach every project with zeal.", int: "I have zeal for delivering excellent results.", biz: "Zeal for innovation drives market leaders." },
  { word: "zone", pos: "noun", hindi: "क्षेत्र / जोन", simple: "a specific area or range", ipa: "/zəʊn/", syn: ["area","region","sector"], ant: [], ex: "Stay in your comfort zone, then push beyond it.", off: "Each team works in its own zone.", int: "I like stepping out of my comfort zone.", biz: "Businesses must identify their target zone." },
  { word: "benchmark", pos: "noun", hindi: "मानक / तुलना का आधार", simple: "already used — replaced:", ipa: "", syn: [], ant: [], ex: "", off: "", int: "", biz: "" },
  { word: "concord", pos: "noun", hindi: "सहमति / मेल-मिलाप", simple: "a state of harmony or agreement", ipa: "/ˈkɒŋkɔːd/", syn: ["agreement","harmony","accord"], ant: ["discord","conflict"], ex: "Work in concord with your team.", off: "Concord between departments improves output.", int: "I aim to maintain concord in all my interactions.", biz: "Concord between partners ensures smooth operations." },
  { word: "tenacious", pos: "adjective", hindi: "दृढ़ / हठी", simple: "not giving up easily", ipa: "/tɪˈneɪʃəs/", syn: ["persistent","determined","stubborn"], ant: ["yielding","weak"], ex: "She is tenacious in her goals.", off: "Tenacious sales professionals hit their targets.", int: "I am tenacious and do not give up easily.", biz: "Tenacious companies bounce back from setbacks." },
];

// ─── BUILD VOCABULARY (remove duplicates and placeholders) ───────────────────
function buildVocabulary() {
  const seen = new Set();
  const vocab = [];
  let id = 1;
  for (const v of vocabData) {
    if (!v.word || seen.has(v.word.toLowerCase()) || !v.ex || v.simple.startsWith('already')) continue;
    seen.add(v.word.toLowerCase());
    vocab.push({
      id,
      word: v.word,
      partOfSpeech: v.pos,
      hindi: v.hindi,
      simpleMeaning: v.simple,
      ipa: v.ipa,
      synonyms: v.syn,
      antonyms: v.ant,
      example: v.ex,
      officeExample: v.off,
      interviewExample: v.int,
      businessExample: v.biz
    });
    id++;
  }
  return vocab;
}

// ─── PRACTICE + MOCK TEST SENTENCE GENERATOR ────────────────────────────────
const subjects = [
  { en: "I", hindi_m: "मैं", hindi_f: "मैं", type: "first_singular", formal: false },
  { en: "you (formal)", hindi_m: "आप", hindi_f: "आप", type: "second_formal", formal: true },
  { en: "you (informal)", hindi_m: "तुम", hindi_f: "तुम", type: "second_informal", formal: false },
  { en: "he", hindi_m: "वह", hindi_f: null, type: "third_singular_m", formal: false },
  { en: "she", hindi_m: null, hindi_f: "वह", type: "third_singular_f", formal: false },
  { en: "we", hindi_m: "हम", hindi_f: "हम", type: "first_plural", formal: false },
  { en: "they", hindi_m: "वे", hindi_f: "वे", type: "third_plural", formal: false },
  { en: "my brother", hindi_m: "मेरे भाई", hindi_f: null, type: "third_singular_m", formal: false },
  { en: "my sister", hindi_m: null, hindi_f: "मेरी बहन", type: "third_singular_f", formal: false },
  { en: "the manager", hindi_m: "मैनेजर", hindi_f: null, type: "third_singular_m", formal: true },
  { en: "the team", hindi_m: "टीम", hindi_f: null, type: "third_plural", formal: false },
  { en: "our company", hindi_m: "हमारी कंपनी", hindi_f: null, type: "third_singular_f", formal: true },
  { en: "the client", hindi_m: "क्लाइंट", hindi_f: null, type: "third_singular_m", formal: true },
  { en: "my friend", hindi_m: "मेरे दोस्त", hindi_f: null, type: "third_singular_m", formal: false },
  { en: "the doctor", hindi_m: "डॉक्टर", hindi_f: null, type: "third_singular_m", formal: true },
];

// Hindi verb conjugation helper
function hindiConj(subj, verb_infinitive) {
  // verb_infinitive is the Hindi infinitive phrase like "खाना", "जाना", "काम करना"
  const t = subj.type;
  if (t === 'first_singular') {
    // use both m/f forms
    return `${verb_infinitive} चाहूँगा/चाहूँगी`;
  } else if (t === 'second_formal') {
    return `${verb_infinitive} चाहेंगे`;
  } else if (t === 'second_informal') {
    return `${verb_infinitive} चाहोगे/चाहोगी`;
  } else if (t === 'third_singular_m') {
    return `${verb_infinitive} चाहेगा`;
  } else if (t === 'third_singular_f') {
    return `${verb_infinitive} चाहेगी`;
  } else if (t === 'first_plural') {
    return `${verb_infinitive} चाहेंगे`;
  } else if (t === 'third_plural') {
    return `${verb_infinitive} चाहेंगे`;
  }
  return `${verb_infinitive} चाहेगा`;
}

function hindiNegConj(subj, verb_infinitive) {
  const base = hindiConj(subj, verb_infinitive);
  // Insert "नहीं" before last word
  const parts = base.split(' ');
  // e.g. "खाना चाहूँगा" -> "खाना नहीं चाहूँगा"
  if (parts.length >= 2) {
    parts.splice(parts.length - 1, 0, 'नहीं');
  }
  return parts.join(' ');
}

// English contractions
function engContraction(subj) {
  const map = {
    "I": "I'd",
    "you (formal)": "you'd",
    "you (informal)": "you'd",
    "he": "he'd",
    "she": "she'd",
    "we": "we'd",
    "they": "they'd",
    "my brother": "my brother'd",
    "my sister": "my sister'd",
    "the manager": "the manager'd",
    "the team": "the team'd",
    "our company": "our company'd",
    "the client": "the client'd",
    "my friend": "my friend'd",
    "the doctor": "the doctor'd",
  };
  return map[subj.en] || (subj.en + "'d");
}

// Phrase bank: each entry has { hindiInfinitive, engBase, tags, hint, explanation, difficulty }
const phraseBankRaw = [
  // Daily life
  { hi: "चाय पीना", en: "have some tea", tags: ["daily","food"], hint: "I'd like + to have + object", exp: "'Would like to' politely expresses a desire for something.", diff: "easy" },
  { hi: "पानी पीना", en: "have some water", tags: ["daily","food"], hint: "I'd like + to have + noun", exp: "A polite request for a drink.", diff: "easy" },
  { hi: "खाना खाना", en: "have something to eat", tags: ["daily","food"], hint: "I'd like + to have + something", exp: "Politely expressing hunger.", diff: "easy" },
  { hi: "थोड़ा आराम करना", en: "rest for a while", tags: ["daily","health"], hint: "I'd like + to rest", exp: "Expressing desire for rest politely.", diff: "easy" },
  { hi: "बाहर जाना", en: "go outside", tags: ["daily"], hint: "I'd like + to go outside", exp: "A simple desire to go out.", diff: "easy" },
  { hi: "घर जाना", en: "go home", tags: ["daily"], hint: "I'd like + to go home", exp: "Common daily-life phrase.", diff: "easy" },
  { hi: "जल्दी सोना", en: "sleep early tonight", tags: ["daily","health"], hint: "I'd like + to sleep early", exp: "Politely expressing an evening plan.", diff: "easy" },
  { hi: "कुछ मीठा खाना", en: "have something sweet", tags: ["daily","food"], hint: "I'd like + to have something sweet", exp: "Polite food desire.", diff: "easy" },
  { hi: "एक कप कॉफी लेना", en: "have a cup of coffee", tags: ["daily","food"], hint: "I'd like + to have a cup of coffee", exp: "Very common polite order.", diff: "easy" },
  { hi: "पार्क में टहलना", en: "take a walk in the park", tags: ["daily","health"], hint: "I'd like + to take a walk", exp: "Expressing a leisure activity wish.", diff: "easy" },
  { hi: "किताब पढ़ना", en: "read a book", tags: ["daily","hobby"], hint: "I'd like + to read a book", exp: "Expressing a hobby desire.", diff: "easy" },
  { hi: "गाना सुनना", en: "listen to some music", tags: ["daily","hobby"], hint: "I'd like + to listen to music", exp: "A common leisure preference.", diff: "easy" },
  { hi: "फिल्म देखना", en: "watch a film", tags: ["daily","hobby"], hint: "I'd like + to watch a film", exp: "Politely expressing a desire to watch.", diff: "easy" },
  { hi: "दोस्त से मिलना", en: "meet my friend", tags: ["daily","social"], hint: "I'd like + to meet my friend", exp: "Expressing desire to meet someone.", diff: "easy" },
  { hi: "खरीदारी करना", en: "go shopping", tags: ["daily"], hint: "I'd like + to go shopping", exp: "Polite desire to go shopping.", diff: "easy" },
  // Office
  { hi: "मीटिंग शेड्यूल करना", en: "schedule a meeting", tags: ["office"], hint: "I'd like + to schedule a meeting", exp: "Very common office phrase with 'would like to'.", diff: "easy" },
  { hi: "report submit करना", en: "submit the report", tags: ["office"], hint: "I'd like + to submit the report", exp: "Polite professional intent.", diff: "easy" },
  { hi: "आपसे बात करना", en: "speak with you", tags: ["office","social"], hint: "I'd like + to speak with you", exp: "Polite way to request a conversation.", diff: "easy" },
  { hi: "यह proposal present करना", en: "present this proposal", tags: ["office"], hint: "I'd like + to present this proposal", exp: "Formal business context.", diff: "medium" },
  { hi: "एक appointment लेना", en: "book an appointment", tags: ["office"], hint: "I'd like + to book an appointment", exp: "A standard office request.", diff: "easy" },
  { hi: "project details जानना", en: "know more about the project details", tags: ["office"], hint: "I'd like + to know more about", exp: "Showing interest professionally.", diff: "medium" },
  { hi: "feedback देना", en: "give you some feedback", tags: ["office"], hint: "I'd like + to give feedback", exp: "Polite way to share feedback.", diff: "medium" },
  { hi: "इस काम में मदद करना", en: "help with this task", tags: ["office"], hint: "I'd like + to help with this task", exp: "Offering help politely.", diff: "easy" },
  { hi: "email check करना", en: "check my emails", tags: ["office","technology"], hint: "I'd like + to check emails", exp: "Daily routine office activity.", diff: "easy" },
  { hi: "नई तकनीक सीखना", en: "learn new technology", tags: ["office","technology"], hint: "I'd like + to learn new tech", exp: "Professional growth desire.", diff: "medium" },
  { hi: "काम जल्दी खत्म करना", en: "finish my work early", tags: ["office"], hint: "I'd like + to finish work early", exp: "Efficient work habit expression.", diff: "easy" },
  { hi: "एक नई strategy बनाना", en: "develop a new strategy", tags: ["office","business"], hint: "I'd like + to develop a strategy", exp: "Business context wish.", diff: "medium" },
  { hi: "budget की जानकारी लेना", en: "get more information about the budget", tags: ["office","business"], hint: "I'd like + to get information", exp: "Formal information request.", diff: "medium" },
  { hi: "अपना काम बेहतर करना", en: "improve my work performance", tags: ["office"], hint: "I'd like + to improve performance", exp: "Self-improvement desire at work.", diff: "medium" },
  { hi: "team के साथ collaborate करना", en: "collaborate with the team", tags: ["office","teamwork"], hint: "I'd like + to collaborate", exp: "Team-oriented polite expression.", diff: "medium" },
  // Interview
  { hi: "इस पद के लिए apply करना", en: "apply for this position", tags: ["interview"], hint: "I'd like + to apply for", exp: "Classic interview phrase with 'would like to'.", diff: "easy" },
  { hi: "अपना अनुभव share करना", en: "share my experience", tags: ["interview"], hint: "I'd like + to share my experience", exp: "Interview self-presentation.", diff: "easy" },
  { hi: "इस company में योगदान देना", en: "contribute to this company", tags: ["interview","business"], hint: "I'd like + to contribute to", exp: "Expressing desire to add value.", diff: "medium" },
  { hi: "और जानकारी लेना", en: "learn more about this role", tags: ["interview"], hint: "I'd like + to learn more", exp: "Showing genuine interest in a role.", diff: "easy" },
  { hi: "अपनी skills और आगे develop करना", en: "further develop my skills", tags: ["interview","goals"], hint: "I'd like + to develop skills", exp: "Growth-focused statement.", diff: "medium" },
  { hi: "एक team lead बनना", en: "become a team lead", tags: ["interview","goals"], hint: "I'd like + to become a team lead", exp: "Career aspiration expression.", diff: "medium" },
  { hi: "अपनी responsibilities निभाना", en: "fulfil my responsibilities", tags: ["interview"], hint: "I'd like + to fulfil", exp: "Commitment in interview context.", diff: "hard" },
  { hi: "नई challenges लेना", en: "take on new challenges", tags: ["interview","goals"], hint: "I'd like + to take on challenges", exp: "Shows drive and ambition.", diff: "medium" },
  // Business / Professional
  { hi: "contract sign करना", en: "sign the contract", tags: ["business"], hint: "I'd like + to sign the contract", exp: "Formal business action expression.", diff: "medium" },
  { hi: "नए market में expand करना", en: "expand into a new market", tags: ["business"], hint: "I'd like + to expand", exp: "Business growth desire.", diff: "hard" },
  { hi: "partnership बनाना", en: "build a partnership with you", tags: ["business"], hint: "I'd like + to build a partnership", exp: "Formal business relationship desire.", diff: "medium" },
  { hi: "sales figures review करना", en: "review the sales figures", tags: ["business","office"], hint: "I'd like + to review", exp: "Business analysis activity.", diff: "medium" },
  { hi: "प्रोजेक्ट deadline extend करना", en: "extend the project deadline", tags: ["business","office"], hint: "I'd like + to extend the deadline", exp: "Polite request for more time.", diff: "medium" },
  { hi: "नया client लाना", en: "bring in a new client", tags: ["business"], hint: "I'd like + to bring in a client", exp: "Sales-oriented desire.", diff: "medium" },
  { hi: "company के साथ long-term deal करना", en: "make a long-term deal with the company", tags: ["business"], hint: "I'd like + to make a deal", exp: "Formal business negotiation desire.", diff: "hard" },
  { hi: "product launch करना", en: "launch a new product", tags: ["business"], hint: "I'd like + to launch a product", exp: "Business launch desire.", diff: "medium" },
  // Travel
  { hi: "दिल्ली घूमना", en: "visit Delhi", tags: ["travel"], hint: "I'd like + to visit Delhi", exp: "Travel desire.", diff: "easy" },
  { hi: "विदेश जाना", en: "travel abroad", tags: ["travel"], hint: "I'd like + to travel abroad", exp: "Desire to travel internationally.", diff: "easy" },
  { hi: "एक कमरा book करना", en: "book a room", tags: ["travel"], hint: "I'd like + to book a room", exp: "Hotel booking phrase.", diff: "easy" },
  { hi: "train ticket reserve करना", en: "reserve a train ticket", tags: ["travel"], hint: "I'd like + to reserve a ticket", exp: "Travel booking phrase.", diff: "easy" },
  { hi: "flight से जाना", en: "travel by flight", tags: ["travel"], hint: "I'd like + to travel by flight", exp: "Mode of travel preference.", diff: "easy" },
  { hi: "एक guided tour लेना", en: "go on a guided tour", tags: ["travel"], hint: "I'd like + to go on a tour", exp: "Tourism activity desire.", diff: "medium" },
  // Health
  { hi: "doctor से मिलना", en: "see a doctor", tags: ["health"], hint: "I'd like + to see a doctor", exp: "Health appointment desire.", diff: "easy" },
  { hi: "gym join करना", en: "join a gym", tags: ["health"], hint: "I'd like + to join a gym", exp: "Health routine desire.", diff: "easy" },
  { hi: "healthy खाना खाना", en: "eat healthy food", tags: ["health","food"], hint: "I'd like + to eat healthy", exp: "Health-conscious desire.", diff: "easy" },
  { hi: "रोज़ व्यायाम करना", en: "exercise every day", tags: ["health"], hint: "I'd like + to exercise daily", exp: "Routine health desire.", diff: "easy" },
  { hi: "कम stress में काम करना", en: "work with less stress", tags: ["health","office"], hint: "I'd like + to work with less stress", exp: "Work-life balance desire.", diff: "medium" },
  // Family
  { hi: "परिवार के साथ समय बिताना", en: "spend time with my family", tags: ["family"], hint: "I'd like + to spend time with family", exp: "Family time desire.", diff: "easy" },
  { hi: "माँ से बात करना", en: "talk to my mother", tags: ["family"], hint: "I'd like + to talk to my mother", exp: "Family communication.", diff: "easy" },
  { hi: "बच्चों को घुमाने ले जाना", en: "take the children out", tags: ["family"], hint: "I'd like + to take children out", exp: "Family activity.", diff: "easy" },
  { hi: "पूरे परिवार के साथ खाना खाना", en: "have dinner with the whole family", tags: ["family","food"], hint: "I'd like + to have dinner with family", exp: "Family gathering desire.", diff: "easy" },
  // Technology
  { hi: "नया software सीखना", en: "learn new software", tags: ["technology"], hint: "I'd like + to learn new software", exp: "Technology learning desire.", diff: "easy" },
  { hi: "एक website बनाना", en: "create a website", tags: ["technology"], hint: "I'd like + to create a website", exp: "Tech project desire.", diff: "medium" },
  { hi: "online course करना", en: "do an online course", tags: ["technology","goals"], hint: "I'd like + to do an online course", exp: "Digital learning desire.", diff: "easy" },
  { hi: "data analyse करना", en: "analyse the data", tags: ["technology","office"], hint: "I'd like + to analyse data", exp: "Technical task desire.", diff: "medium" },
  // Emotions / Goals
  { hi: "कुछ नया सीखना", en: "learn something new", tags: ["goals"], hint: "I'd like + to learn something new", exp: "Growth mindset expression.", diff: "easy" },
  { hi: "अपनी English improve करना", en: "improve my English", tags: ["goals","language"], hint: "I'd like + to improve English", exp: "Language learning goal.", diff: "easy" },
  { hi: "एक अच्छा leader बनना", en: "become a good leader", tags: ["goals"], hint: "I'd like + to become a leader", exp: "Leadership aspiration.", diff: "medium" },
  { hi: "अपनी गलती सुधारना", en: "correct my mistake", tags: ["goals"], hint: "I'd like + to correct my mistake", exp: "Self-improvement phrase.", diff: "easy" },
  { hi: "खुश रहना", en: "stay happy", tags: ["emotions","goals"], hint: "I'd like + to stay happy", exp: "Emotional well-being desire.", diff: "easy" },
  { hi: "जिंदगी enjoy करना", en: "enjoy life", tags: ["emotions","goals"], hint: "I'd like + to enjoy life", exp: "Positive desire expression.", diff: "easy" },
  { hi: "अपने सपने पूरे करना", en: "fulfil my dreams", tags: ["goals","emotions"], hint: "I'd like + to fulfil my dreams", exp: "Aspiration expression.", diff: "medium" },
  { hi: "शांति से सोचना", en: "think calmly", tags: ["emotions"], hint: "I'd like + to think calmly", exp: "Mindfulness desire.", diff: "easy" },
  // More varied
  { hi: "एक complaint दर्ज करना", en: "register a complaint", tags: ["daily","office"], hint: "I'd like + to register a complaint", exp: "Consumer/office rights expression.", diff: "medium" },
  { hi: "अपना resume update करना", en: "update my resume", tags: ["interview","goals"], hint: "I'd like + to update my resume", exp: "Job-seeking activity.", diff: "easy" },
  { hi: "नौकरी बदलना", en: "change my job", tags: ["goals","interview"], hint: "I'd like + to change jobs", exp: "Career change desire.", diff: "medium" },
  { hi: "अपने boss से बात करना", en: "speak with my boss", tags: ["office"], hint: "I'd like + to speak with my boss", exp: "Workplace communication.", diff: "easy" },
  { hi: "salary negotiate करना", en: "negotiate my salary", tags: ["interview","business"], hint: "I'd like + to negotiate salary", exp: "Polite salary discussion.", diff: "hard" },
  { hi: "training में participate करना", en: "participate in the training", tags: ["office","goals"], hint: "I'd like + to participate in training", exp: "Professional development desire.", diff: "medium" },
  { hi: "conference में जाना", en: "attend the conference", tags: ["office","business"], hint: "I'd like + to attend the conference", exp: "Professional event desire.", diff: "medium" },
  { hi: "अपनी team को motivate करना", en: "motivate my team", tags: ["office","goals"], hint: "I'd like + to motivate my team", exp: "Leadership desire.", diff: "medium" },
  { hi: "एक अच्छा presentation देना", en: "give a good presentation", tags: ["office"], hint: "I'd like + to give a presentation", exp: "Professional communication desire.", diff: "medium" },
  { hi: "clients के साथ अच्छे संबंध बनाना", en: "build good relationships with clients", tags: ["business"], hint: "I'd like + to build relationships", exp: "Client relationship desire.", diff: "hard" },
  { hi: "अपने शहर को explore करना", en: "explore my city", tags: ["travel","daily"], hint: "I'd like + to explore my city", exp: "Local exploration desire.", diff: "easy" },
  { hi: "नई भाषा सीखना", en: "learn a new language", tags: ["goals","language"], hint: "I'd like + to learn a language", exp: "Language learning goal.", diff: "easy" },
  { hi: "एक startup शुरू करना", en: "start a startup", tags: ["business","goals"], hint: "I'd like + to start a startup", exp: "Entrepreneurial desire.", diff: "hard" },
  { hi: "पिता की मदद करना", en: "help my father", tags: ["family"], hint: "I'd like + to help my father", exp: "Family help expression.", diff: "easy" },
  { hi: "certificate course करना", en: "do a certificate course", tags: ["goals","technology"], hint: "I'd like + to do a certificate course", exp: "Upskilling desire.", diff: "easy" },
  { hi: "bank account खुलवाना", en: "open a bank account", tags: ["daily","business"], hint: "I'd like + to open a bank account", exp: "Financial task desire.", diff: "easy" },
  { hi: "investment के बारे में जानना", en: "learn about investment", tags: ["business","goals"], hint: "I'd like + to learn about investment", exp: "Financial learning desire.", diff: "medium" },
  { hi: "yoga सीखना", en: "learn yoga", tags: ["health","hobby"], hint: "I'd like + to learn yoga", exp: "Wellness hobby desire.", diff: "easy" },
  { hi: "cooking सीखना", en: "learn to cook", tags: ["hobby","daily"], hint: "I'd like + to learn to cook", exp: "Life skill desire.", diff: "easy" },
  { hi: "बच्चों को पढ़ाना", en: "teach children", tags: ["goals","family"], hint: "I'd like + to teach children", exp: "Service-oriented desire.", diff: "easy" },
  { hi: "एक donation देना", en: "make a donation", tags: ["goals","emotions"], hint: "I'd like + to make a donation", exp: "Charitable desire.", diff: "medium" },
  { hi: "अपना घर खरीदना", en: "buy my own house", tags: ["goals","daily"], hint: "I'd like + to buy a house", exp: "Life goal expression.", diff: "medium" },
  { hi: "एक कार खरीदना", en: "buy a car", tags: ["goals","daily"], hint: "I'd like + to buy a car", exp: "Personal goal expression.", diff: "medium" },
  { hi: "abroad study करना", en: "study abroad", tags: ["goals","travel"], hint: "I'd like + to study abroad", exp: "Academic desire.", diff: "medium" },
  { hi: "आज जल्दी office जाना", en: "go to the office early today", tags: ["office","daily"], hint: "I'd like + to go early", exp: "Daily routine preference.", diff: "easy" },
  { hi: "project का update देना", en: "give an update on the project", tags: ["office"], hint: "I'd like + to give an update", exp: "Professional communication.", diff: "medium" },
  { hi: "manager से permission लेना", en: "get permission from the manager", tags: ["office"], hint: "I'd like + to get permission", exp: "Workplace courtesy.", diff: "medium" },
  { hi: "नए employees को train करना", en: "train the new employees", tags: ["office","goals"], hint: "I'd like + to train new employees", exp: "Leadership and mentoring desire.", diff: "medium" },
  { hi: "customer की शिकायत सुलझाना", en: "resolve the customer's complaint", tags: ["business","office"], hint: "I'd like + to resolve the complaint", exp: "Customer service desire.", diff: "medium" },
  { hi: "quarterly report बनाना", en: "prepare the quarterly report", tags: ["business","office"], hint: "I'd like + to prepare the report", exp: "Business reporting task.", diff: "medium" },
  { hi: "vendor से negotiate करना", en: "negotiate with the vendor", tags: ["business"], hint: "I'd like + to negotiate with the vendor", exp: "Business negotiation.", diff: "hard" },
  { hi: "team outing plan करना", en: "plan a team outing", tags: ["office","social"], hint: "I'd like + to plan a team outing", exp: "Team activity desire.", diff: "easy" },
  { hi: "mentor से सलाह लेना", en: "take advice from a mentor", tags: ["goals","office"], hint: "I'd like + to take advice from a mentor", exp: "Mentorship desire.", diff: "medium" },
  { hi: "एक business plan बनाना", en: "create a business plan", tags: ["business"], hint: "I'd like + to create a business plan", exp: "Entrepreneurial planning.", diff: "hard" },
  { hi: "अपने performance improve करना", en: "improve my performance at work", tags: ["office","goals"], hint: "I'd like + to improve performance", exp: "Self-improvement goal.", diff: "medium" },
  { hi: "सुबह जल्दी उठना", en: "wake up early in the morning", tags: ["daily","health"], hint: "I'd like + to wake up early", exp: "Habit desire.", diff: "easy" },
  { hi: "एक अच्छी book recommend करना", en: "recommend a good book", tags: ["hobby","social"], hint: "I'd like + to recommend a book", exp: "Social sharing desire.", diff: "easy" },
  { hi: "photography सीखना", en: "learn photography", tags: ["hobby"], hint: "I'd like + to learn photography", exp: "Creative hobby desire.", diff: "easy" },
  { hi: "एक seminar attend करना", en: "attend a seminar", tags: ["goals","business"], hint: "I'd like + to attend a seminar", exp: "Professional development.", diff: "medium" },
  { hi: "customer को call करना", en: "call the customer", tags: ["office","business"], hint: "I'd like + to call the customer", exp: "Business communication.", diff: "easy" },
  { hi: "invoice भेजना", en: "send the invoice", tags: ["business"], hint: "I'd like + to send the invoice", exp: "Billing task desire.", diff: "medium" },
  { hi: "legal advice लेना", en: "get legal advice", tags: ["business"], hint: "I'd like + to get legal advice", exp: "Professional services desire.", diff: "hard" },
  { hi: "एक team बनाना", en: "build a team", tags: ["office","goals"], hint: "I'd like + to build a team", exp: "Leadership desire.", diff: "medium" },
  { hi: "performance review लेना", en: "have a performance review", tags: ["office"], hint: "I'd like + to have a performance review", exp: "Career development desire.", diff: "medium" },
  { hi: "नई skill add करना", en: "add a new skill to my profile", tags: ["goals"], hint: "I'd like + to add a skill", exp: "Professional growth.", diff: "medium" },
];

// Build phrase bank with unique en phrases
const phraseBank = [];
const seenPhrases = new Set();
for (const p of phraseBankRaw) {
  if (!seenPhrases.has(p.en)) {
    seenPhrases.add(p.en);
    phraseBank.push(p);
  }
}

// Sentence types
const SENTENCE_TYPES = ['positive', 'negative', 'question'];

// Build sentence
function buildSentence(subj, phrase, sentType) {
  // Hindi subject string
  let hindiSubj = subj.hindi_m || subj.hindi_f || subj.en;

  let english = '';
  let hindi = '';
  let hint = '';
  let explanation = '';
  let tags = [...phrase.tags];
  let difficulty = phrase.diff;

  if (sentType === 'positive') {
    const contr = engContraction(subj);
    if (subj.en === 'I') {
      english = `I'd like to ${phrase.en}.`;
    } else if (subj.en === 'you (formal)' || subj.en === 'you (informal)') {
      english = `You'd like to ${phrase.en}.`;
    } else if (subj.en === 'we') {
      english = `We'd like to ${phrase.en}.`;
    } else if (subj.en === 'they') {
      english = `They'd like to ${phrase.en}.`;
    } else {
      english = `${subj.en.charAt(0).toUpperCase() + subj.en.slice(1)}'d like to ${phrase.en}.`;
    }
    hindi = `${hindiSubj} ${hindiConj(subj, phrase.hi)}।`;
    hint = `${subj.en === 'I' ? "I'd" : subj.en} like to + ${phrase.en.split(' ')[0]}`;
    explanation = `"Would like to" is a polite way to express desire. ${phrase.exp}`;
  } else if (sentType === 'negative') {
    if (subj.en === 'I') {
      english = `I wouldn't like to ${phrase.en}.`;
    } else if (subj.en === 'you (formal)' || subj.en === 'you (informal)') {
      english = `You wouldn't like to ${phrase.en}.`;
    } else if (subj.en === 'we') {
      english = `We wouldn't like to ${phrase.en}.`;
    } else if (subj.en === 'they') {
      english = `They wouldn't like to ${phrase.en}.`;
    } else {
      english = `${subj.en.charAt(0).toUpperCase() + subj.en.slice(1)} wouldn't like to ${phrase.en}.`;
    }
    hindi = `${hindiSubj} ${hindiNegConj(subj, phrase.hi)}।`;
    hint = `Subject + wouldn't like to + base verb`;
    explanation = `Negative form: "wouldn't like to" = would not like to. ${phrase.exp}`;
    difficulty = difficulty === 'easy' ? 'medium' : difficulty;
    tags.push('negative');
  } else { // question
    const qSubj = (subj.en === 'I') ? 'you' :
                  (subj.en === 'you (formal)' || subj.en === 'you (informal)') ? 'you' :
                  subj.en;
    if (qSubj === 'you') {
      english = `Would you like to ${phrase.en}?`;
      hindi = `क्या आप ${phrase.hi} चाहेंगे?`;
    } else if (subj.en === 'we') {
      english = `Would we like to ${phrase.en}?`;
      hindi = `क्या हम ${phrase.hi} चाहेंगे?`;
    } else if (subj.en === 'they') {
      english = `Would they like to ${phrase.en}?`;
      hindi = `क्या वे ${phrase.hi} चाहेंगे?`;
    } else {
      const qs = subj.en.charAt(0).toUpperCase() + subj.en.slice(1);
      english = `Would ${subj.en} like to ${phrase.en}?`;
      hindi = `क्या ${hindiSubj} ${phrase.hi} चाहेगा?`;
    }
    hint = `Would + subject + like to + base verb?`;
    explanation = `Question form: "Would + subject + like to + base verb?" ${phrase.exp}`;
    difficulty = difficulty === 'easy' ? 'medium' : difficulty;
    tags.push('question');
  }

  // normalise
  tags = [...new Set(tags)];
  return { english, hindi, hint, explanation, tags, difficulty };
}

function generateSentences(count, existingSet) {
  const sentences = [];
  const usedEnglish = new Set(existingSet || []);
  let id = 1;

  // Generate all combinations first: subjects × phrases × types
  const combos = [];
  for (const subj of subjects) {
    for (const phrase of phraseBank) {
      for (const stype of SENTENCE_TYPES) {
        combos.push({ subj, phrase, stype });
      }
    }
  }

  // Shuffle combos for variety
  for (let i = combos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combos[i], combos[j]] = [combos[j], combos[i]];
  }

  for (const { subj, phrase, stype } of combos) {
    if (sentences.length >= count) break;
    const s = buildSentence(subj, phrase, stype);
    if (!usedEnglish.has(s.english)) {
      usedEnglish.add(s.english);
      sentences.push(s);
    }
  }

  // If still not enough, do another pass with slight variations
  if (sentences.length < count) {
    // Add more unique combinations by using different phrasing
    for (const subj of subjects) {
      for (const phrase of phraseBank) {
        for (const stype of SENTENCE_TYPES) {
          if (sentences.length >= count) break;
          const s = buildSentence(subj, phrase, stype);
          // Try full form instead of contraction
          let alt = s.english;
          if (stype === 'positive') {
            alt = s.english.replace("'d like to", ' would like to');
          } else if (stype === 'negative') {
            alt = s.english.replace("wouldn't like to", 'would not like to');
          }
          if (alt !== s.english && !usedEnglish.has(alt)) {
            usedEnglish.add(alt);
            sentences.push({
              english: alt,
              hindi: s.hindi,
              hint: s.hint,
              explanation: s.explanation,
              tags: s.tags,
              difficulty: s.difficulty
            });
          }
        }
        if (sentences.length >= count) break;
      }
      if (sentences.length >= count) break;
    }
  }

  return { sentences, usedEnglish };
}

// Build practice
function buildPractice() {
  const { sentences, usedEnglish } = generateSentences(900, new Set());
  const practice = sentences.slice(0, 900).map((s, i) => ({
    id: `d15-${String(i + 1).padStart(3, '0')}`,
    hindi: s.hindi,
    english: s.english,
    alternatives: [],
    hint: s.hint,
    explanation: s.explanation,
    difficulty: s.difficulty,
    tags: s.tags
  }));
  return { practice, usedEnglish: new Set(practice.map(p => p.english)) };
}

// Build mockTest
function buildMockTest(existingEnglish) {
  const { sentences } = generateSentences(350, existingEnglish);
  return sentences.slice(0, 350).map((s, i) => ({
    id: `d15-${String(i + 1).padStart(3, '0')}-test`,
    hindi: s.hindi,
    english: s.english,
    alternatives: [],
    hint: s.hint,
    explanation: s.explanation,
    difficulty: s.difficulty,
    tags: s.tags
  }));
}

// ─── ESSAYS ────────────────────────────────────────────────────────────────
const essay = [
  {
    title: "My Career Goals",
    hindi: "इस निबंध में एक व्यक्ति अपने करियर के लक्ष्यों के बारे में बात करता है और 'would like to' का उपयोग करके अपनी इच्छाएँ विनम्रता से व्यक्त करता है।",
    english: `I have always believed that having clear goals is the first step to success. I would like to build a successful career in the field of information technology. I would like to work for a company that values teamwork and innovation. In the next two years, I would like to complete an advanced certification in cloud computing. I feel that continuous learning is very important.

I would also like to develop my communication skills, because speaking confidently in English is a major advantage in today's workplace. My manager often tells me that I have the potential to grow, and I would like to prove that belief correct.

I would not like to waste any opportunity that comes my way. I believe every challenge teaches us something valuable. I would like to attend industry conferences and network with experienced professionals. One day, I would like to lead my own project team and mentor younger colleagues.

My short-term goal is to get promoted within the next year. I would like to discuss my development plan with my manager very soon. I am confident that with dedication and the right attitude, I can achieve everything I have planned. Hard work and a positive mindset are the two things I would like to carry with me throughout my career.`
  },
  {
    title: "A Day at a Restaurant",
    hindi: "इस निबंध में एक परिवार रेस्टोरेंट में जाता है और 'would like to' का उपयोग करके ऑर्डर देता है और बात करता है।",
    english: `Last Sunday, our family decided to go out for dinner. We chose a new restaurant in our neighbourhood. When we arrived, the waiter greeted us with a warm smile and asked, "Would you like to sit near the window or inside?" We chose the window table because it had a lovely view of the garden.

The waiter handed us the menus and said, "I'd like to suggest our chef's special tonight." My mother said, "I would like to have the vegetable soup and a paneer dish, please." My father replied, "I'd like to try the tandoori chicken." I said, "I would like to have a pasta and a fresh juice, please."

The waiter asked, "Would you like to start with some bread and dips?" We said, "Yes, please." The food arrived quickly and it was delicious. After dinner, the waiter asked, "Would you like to see the dessert menu?" My sister said, "I'd like to have the chocolate cake."

We really enjoyed the evening. I would like to go back to that restaurant very soon. Dining out with family is always a wonderful experience. Using polite language like "I would like to" makes every conversation more pleasant and respectful.`
  },
  {
    title: "Preparing for a Job Interview",
    hindi: "इस निबंध में एक उम्मीदवार नौकरी के इंटरव्यू की तैयारी करता है और 'would like to' का उपयोग करके अपने लक्ष्य और इच्छाएँ बताता है।",
    english: `Preparing for a job interview can be both exciting and stressful. I received an interview call from a well-known company last week, and I have been preparing carefully ever since. I would like to make a strong first impression.

First, I would like to research the company thoroughly. I want to know about their products, their values, and their culture. I would like to demonstrate to the interviewer that I have done my homework. Secondly, I would like to practise answering common interview questions, such as "Tell me about yourself" and "What are your strengths?"

I would like to dress formally and arrive ten minutes early. Being punctual shows that I am serious and professional. During the interview, I would like to speak confidently and clearly. I would not like to give vague answers, so I plan to prepare specific examples from my past experience.

I would also like to ask the interviewer a few questions about the role and the team. This shows genuine interest. At the end, I would like to thank the interviewer for the opportunity.

My goal is to get this job and grow within the company. I would like to contribute my skills and become a valuable team member. With proper preparation and a positive attitude, I believe I can succeed.`
  },
  {
    title: "Improving Health and Wellbeing",
    hindi: "इस निबंध में एक व्यक्ति अपनी सेहत सुधारने की इच्छाएँ 'would like to' का उपयोग करके व्यक्त करता है।",
    english: `Good health is the foundation of a happy life. I have recently started thinking seriously about my physical and mental health, and I would like to make some important changes.

First, I would like to wake up early every morning and go for a thirty-minute walk in the park. Fresh air and gentle exercise are excellent for the body and mind. I would also like to eat healthier food. I would like to include more fruits and vegetables in my daily meals and reduce junk food.

I would like to join a yoga class because yoga is very helpful for reducing stress. My friend recommended it and said it changed her life. I would not like to ignore my mental health either. I would like to spend at least twenty minutes each day reading or listening to calming music.

I would also like to drink more water throughout the day. Staying hydrated improves concentration and energy levels. My doctor advised me to sleep for at least seven hours each night, and I would like to follow that advice.

One more thing I would like to do is reduce my screen time before bedtime. Too much phone use affects sleep quality.

Small but consistent steps lead to a healthier life. I would like to check my progress every month and stay motivated. I believe that with discipline and the right habits, I can significantly improve my overall wellbeing.`
  },
  {
    title: "Building a Successful Business",
    hindi: "इस निबंध में एक उद्यमी अपने व्यवसाय को सफल बनाने की इच्छाएँ 'would like to' का उपयोग करके व्यक्त करता है।",
    english: `Starting a business is a dream many people share, but building a truly successful one requires planning, dedication, and the right mindset. I have been working on a business idea for the past several months, and I would like to turn it into reality this year.

I would like to start a small online business selling handmade products. First, I would like to research the market and understand what customers truly need. I would also like to create a simple and attractive website. I would like to use social media to reach more customers and build a loyal following.

I know that managing finances is very important, so I would like to learn the basics of bookkeeping and budgeting. I would not like to run out of funds in the early stage. I would also like to network with other business owners and learn from their experience.

Customer service is something I would like to focus on strongly. I believe that happy customers come back and bring others with them. I would like to respond to every customer query within twenty-four hours and resolve any issues quickly.

In the long term, I would like to expand the business and hire a small team. I would like to build a brand that people trust and admire. It will not be easy, but with hard work and a clear vision, I am confident that success is achievable.`
  }
];

// ─── STORIES ───────────────────────────────────────────────────────────────
const story = [
  {
    title: "Ravi's Big Day",
    english: `Ravi woke up early on Monday morning. Today was his first day at a new job. He looked in the mirror and said to himself, "I would like to make a great impression today."

He dressed formally and had breakfast. His mother asked, "Would you like some more tea?" He said, "No, thank you, Mum. I'd like to leave early."

At the office, the receptionist greeted him. "Good morning. Would you like to meet the HR manager first?" she asked. Ravi smiled and said, "Yes, please. I would like to introduce myself properly."

The HR manager, Mr. Singh, was very friendly. He asked, "Ravi, what would you like to achieve in this role?" Ravi replied, "I would like to learn as much as possible and contribute to the team's success."

Mr. Singh smiled. "I'd like to show you around the office," he said. He introduced Ravi to his new colleagues. One of them, Priya, said, "We'd like to take you to lunch today. Would you like to join us?" Ravi was very happy. "I'd love to," he said.

By the end of the day, Ravi felt confident. He thought, "I would like to come back tomorrow with even more energy." It was the beginning of something great.`,
    hindi: `सोमवार की सुबह रवि जल्दी उठा। आज उसकी नई नौकरी का पहला दिन था। उसने आईने में देखा और मन में कहा, "मैं आज अच्छा प्रभाव डालना चाहूँगा।"

उसने formal कपड़े पहने और नाश्ता किया। उसकी माँ ने पूछा, "क्या तुम और चाय लेना चाहोगे?" उसने कहा, "नहीं, शुक्रिया माँ। मैं जल्दी निकलना चाहूँगा।"

office में receptionist ने उसका स्वागत किया। "Good morning। क्या आप पहले HR manager से मिलना चाहेंगे?" उसने पूछा। रवि ने मुस्कुराकर कहा, "हाँ, please। मैं ठीक से अपना परिचय देना चाहूँगा।"

HR manager, Mr. Singh, बहुत मिलनसार थे। उन्होंने पूछा, "Ravi, आप इस role में क्या हासिल करना चाहेंगे?" रवि ने जवाब दिया, "मैं जितना हो सके सीखना चाहूँगा और टीम की सफलता में योगदान देना चाहूँगा।"

Mr. Singh ने मुस्कुराते हुए कहा, "मैं आपको office दिखाना चाहूँगा।" उन्होंने रवि को उसके नए सहकर्मियों से मिलवाया। उनमें से एक, Priya, ने कहा, "हम आज आपको lunch के लिए ले जाना चाहेंगे। क्या आप हमारे साथ आना चाहेंगे?" रवि बहुत खुश हुआ। "बिल्कुल," उसने कहा।

दिन के अंत में रवि आत्मविश्वास से भरा था। उसने सोचा, "मैं कल और भी ज़्यादा ऊर्जा के साथ वापस आना चाहूँगा।" एक नई शुरुआत हो चुकी थी।`
  },
  {
    title: "At the Doctor's Clinic",
    english: `Meena had not been feeling well for a few days. She finally decided to visit the doctor. She called the clinic and said, "I'd like to book an appointment with Dr. Sharma, please." The receptionist replied, "Would you like to come in at 11 AM tomorrow?" Meena agreed.

The next morning, Meena arrived at the clinic. A nurse asked her, "Would you like to fill in this form?" Meena filled it in and sat down.

When she met Dr. Sharma, she said, "Doctor, I'd like to tell you about my symptoms. I have had a headache and a sore throat for three days." The doctor listened carefully. "I'd like to check your temperature and blood pressure," the doctor said.

After the check-up, Dr. Sharma said, "I'd like to prescribe some medicines. I'd also like you to rest for two days." Meena asked, "Would you like me to do any tests?" The doctor replied, "Not today. I'd like to see how you respond to the medicine first."

Meena thanked the doctor and left. She felt much better just knowing what to do. She thought, "I would like to take better care of my health from now on." She bought her medicines and went home to rest.`,
    hindi: `मीना कुछ दिनों से ठीक नहीं थी। उसने आखिरकार doctor से मिलने का फैसला किया। उसने clinic पर call किया और कहा, "मैं Dr. Sharma से appointment लेना चाहूँगी।" receptionist ने जवाब दिया, "क्या आप कल सुबह 11 बजे आना चाहेंगी?" मीना मान गई।

अगली सुबह मीना clinic पहुँची। एक nurse ने पूछा, "क्या आप यह form भरना चाहेंगी?" मीना ने form भरा और बैठ गई।

जब वह Dr. Sharma से मिली, उसने कहा, "Doctor, मैं आपको अपने symptoms बताना चाहूँगी। पिछले तीन दिनों से सिरदर्द और गला खराब है।" doctor ने ध्यान से सुना। "मैं आपका temperature और blood pressure check करना चाहूँगा," doctor ने कहा।

check-up के बाद Dr. Sharma ने कहा, "मैं कुछ दवाइयाँ लिखना चाहूँगा। मैं यह भी चाहूँगा कि आप दो दिन आराम करें।" मीना ने पूछा, "क्या आप मुझे कोई test करवाना चाहेंगे?" doctor ने जवाब दिया, "आज नहीं। मैं पहले देखना चाहूँगा कि दवा से आप कैसा महसूस करती हैं।"

मीना ने doctor को धन्यवाद कहा और चली गई। क्या करना है यह जानकर वह बेहतर महसूस कर रही थी। उसने सोचा, "मैं अब से अपनी सेहत का ज़्यादा ख्याल रखना चाहूँगी।" उसने दवाइयाँ खरीदीं और आराम करने घर चली गई।`
  },
  {
    title: "Planning a Family Trip",
    english: `The Sharma family was sitting together on a Sunday evening. Father said, "I'd like to plan a family trip this summer. Where would you all like to go?" Mother said, "I'd like to visit a hill station. It would be nice to escape the heat." Daughter Asha said, "I'd like to go to Manali. I've heard it's beautiful!" Son Rohan said, "I would like to explore a new city. How about Shimla?"

Father smiled. "Good ideas! I'd like to book tickets soon. Would you like to travel by train or bus?" Mother said, "I'd like to travel by train. It's more comfortable." Everyone agreed.

Father opened his laptop. "I'd like to book a hotel near the mountain as well. Would you like a hotel with a valley view?" Asha clapped. "Yes! I would like to wake up and see the mountains every morning!"

Mother said, "I'd like to pack warm clothes because it will be cold." Rohan said, "I'd like to carry my camera and take lots of pictures." Father nodded. "We'd like to leave in the morning and reach before evening," he said.

The whole family was excited. Mother smiled and said, "I would like to make this the best family trip we've ever had." Everyone laughed and started planning together. It was going to be a wonderful holiday.`,
    hindi: `Sharma परिवार रविवार की शाम साथ बैठा था। पिता ने कहा, "मैं इस गर्मी में एक family trip plan करना चाहूँगा। आप सब कहाँ जाना चाहेंगे?" माँ ने कहा, "मैं किसी hill station जाना चाहूँगी। गर्मी से राहत मिलेगी।" बेटी आशा बोली, "मैं Manali जाना चाहूँगी। सुना है बहुत सुंदर है!" बेटा रोहन बोला, "मैं कोई नई जगह explore करना चाहूँगा। Shimla कैसा रहेगा?"

पिता मुस्कुराए। "अच्छे ideas! मैं जल्दी tickets book करना चाहूँगा। क्या आप train से जाना चाहेंगे या bus से?" माँ बोलीं, "मैं train से जाना चाहूँगी। ज़्यादा comfortable होती है।" सबने हाँ कहा।

पिता ने laptop खोला। "मैं पहाड़ के पास एक hotel भी book करना चाहूँगा। क्या आप valley view वाला hotel चाहेंगे?" आशा ने ताली बजाई। "हाँ! मैं हर सुबह उठकर पहाड़ देखना चाहूँगी!"

माँ ने कहा, "मैं गर्म कपड़े पैक करना चाहूँगी क्योंकि ठंड होगी।" रोहन बोला, "मैं camera ले जाना चाहूँगा और बहुत सारी photos लेना चाहूँगा।" पिता ने हाँ में सिर हिलाया। "हम सुबह निकलना चाहेंगे और शाम से पहले पहुँच जाएंगे," उन्होंने कहा।

पूरा परिवार उत्साहित था। माँ मुस्कुराईं और बोलीं, "मैं इसे अब तक की सबसे अच्छी family trip बनाना चाहूँगी।" सब हँसे और मिलकर planning शुरू कर दी। यह एक बेहतरीन छुट्टी होने वाली थी।`
  }
];

// ─── DIALOGUES ─────────────────────────────────────────────────────────────
const dialogue = [
  {
    title: "Job Interview at a Company",
    setting: "Job interview — conference room",
    turns: [
      { speaker: "Interviewer", hindi: "नमस्ते! कृपया बैठिए। क्या आप पानी लेना चाहेंगे?", english: "Good morning! Please have a seat. Would you like some water?" },
      { speaker: "Candidate", hindi: "नमस्ते। जी, शुक्रिया। मैं थोड़ा पानी लेना चाहूँगा।", english: "Good morning. Yes, thank you. I'd like some water, please." },
      { speaker: "Interviewer", hindi: "बहुत अच्छा। तो, क्या आप अपना परिचय देना चाहेंगे?", english: "Great. So, would you like to introduce yourself?" },
      { speaker: "Candidate", hindi: "बिल्कुल। मैं अपने अनुभव और skills के बारे में बताना चाहूँगा।", english: "Of course. I'd like to share my experience and skills." },
      { speaker: "Interviewer", hindi: "अच्छा। आप इस company में क्यों काम करना चाहेंगे?", english: "I see. Why would you like to work at our company?" },
      { speaker: "Candidate", hindi: "मैं यहाँ इसलिए काम करना चाहूँगा क्योंकि यह एक innovative और growing company है।", english: "I'd like to work here because it is an innovative and growing company." },
      { speaker: "Interviewer", hindi: "क्या आप अपनी सबसे बड़ी strength बताना चाहेंगे?", english: "Would you like to tell us about your greatest strength?" },
      { speaker: "Candidate", hindi: "ज़रूर। मैं बताना चाहूँगा कि मेरी सबसे बड़ी strength problem-solving है।", english: "Certainly. I'd like to say that my greatest strength is problem-solving." },
      { speaker: "Interviewer", hindi: "बढ़िया। क्या आप पाँच साल बाद अपने आप को कहाँ देखना चाहेंगे?", english: "Excellent. Where would you like to see yourself in five years?" },
      { speaker: "Candidate", hindi: "मैं एक leadership role में काम करना चाहूँगा और अपनी team को guide करना चाहूँगा।", english: "I'd like to be in a leadership role and I'd like to guide my own team." },
      { speaker: "Interviewer", hindi: "क्या आप salary के बारे में बात करना चाहेंगे?", english: "Would you like to discuss the salary package?" },
      { speaker: "Candidate", hindi: "हाँ, मैं इस बारे में बात करना चाहूँगा। मैं एक fair package की उम्मीद करूँगा।", english: "Yes, I'd like to discuss that. I'd like to expect a fair and competitive package." }
    ]
  },
  {
    title: "Ordering Food at a Restaurant",
    setting: "A restaurant — waiter and customers",
    turns: [
      { speaker: "Waiter", hindi: "नमस्ते! क्या आप inside बैठना चाहेंगे या outside?", english: "Hello! Would you like to sit inside or outside?" },
      { speaker: "Customer 1", hindi: "हम बाहर बैठना चाहेंगे, please।", english: "We'd like to sit outside, please." },
      { speaker: "Waiter", hindi: "बिल्कुल। क्या आप पानी या juice लेना चाहेंगे?", english: "Of course. Would you like to have water or juice?" },
      { speaker: "Customer 2", hindi: "मैं एक fresh lime juice लेना चाहूँगी।", english: "I'd like to have a fresh lime juice, please." },
      { speaker: "Customer 1", hindi: "मैं एक glass ठंडा पानी लेना चाहूँगा।", english: "I'd like a glass of cold water, please." },
      { speaker: "Waiter", hindi: "बहुत अच्छा। क्या आप अभी order करना चाहेंगे या थोड़ा और समय चाहेंगे?", english: "Very good. Would you like to order now or would you like a little more time?" },
      { speaker: "Customer 1", hindi: "हम अभी order करना चाहेंगे। मैं paneer butter masala लेना चाहूँगा।", english: "We'd like to order now. I'd like to have the paneer butter masala." },
      { speaker: "Customer 2", hindi: "और मैं dal tadka और garlic naan लेना चाहूँगी।", english: "And I'd like the dal tadka and garlic naan, please." },
      { speaker: "Waiter", hindi: "क्या आप कोई starter लेना चाहेंगे?", english: "Would you like to have any starters?" },
      { speaker: "Customer 1", hindi: "हाँ, हम vegetable soup लेना चाहेंगे।", english: "Yes, we'd like to have vegetable soup." },
      { speaker: "Waiter", hindi: "बढ़िया। खाने के बाद क्या आप dessert लेना चाहेंगे?", english: "Great. After the meal, would you like to have dessert?" },
      { speaker: "Customer 2", hindi: "हाँ, मैं gulab jamun लेना चाहूँगी। बहुत शुक्रिया!", english: "Yes, I'd like to have gulab jamun. Thank you so much!" }
    ]
  },
  {
    title: "Discussing Plans at Home",
    setting: "Family at home — evening",
    turns: [
      { speaker: "Mother", hindi: "बच्चों, इस weekend क्या करना चाहोगे?", english: "Children, what would you like to do this weekend?" },
      { speaker: "Son (Arjun)", hindi: "मैं cricket खेलना चाहूँगा।", english: "I'd like to play cricket." },
      { speaker: "Daughter (Priya)", hindi: "मैं एक नई film देखना चाहूँगी।", english: "I'd like to watch a new film." },
      { speaker: "Father", hindi: "मैं सभी के साथ बाहर खाना खाना चाहूँगा।", english: "I'd like to go out for dinner together." },
      { speaker: "Mother", hindi: "यह अच्छा idea है। क्या आप सब Sunday को जाना चाहेंगे?", english: "That's a good idea. Would you all like to go on Sunday?" },
      { speaker: "Arjun", hindi: "हाँ! और मैं उसके बाद ice cream खाना चाहूँगा।", english: "Yes! And I'd like to have ice cream after that." },
      { speaker: "Priya", hindi: "मैं उस Italian restaurant में जाना चाहूँगी जो पास में है।", english: "I'd like to go to that Italian restaurant nearby." },
      { speaker: "Father", hindi: "बिल्कुल। क्या माँ कुछ और करना चाहेंगी?", english: "Sure. Would mother like to do anything else?" },
      { speaker: "Mother", hindi: "मैं shopping mall भी जाना चाहूँगी।", english: "I'd like to visit the shopping mall too." },
      { speaker: "Arjun", hindi: "क्या हम एक नई game खरीद सकते हैं? मैं एक नई video game लेना चाहूँगा।", english: "Can we buy something? I'd like to get a new video game." },
      { speaker: "Father", hindi: "हम देखेंगे। अभी हम सब plan करना चाहेंगे।", english: "We'll see. For now, we'd like to plan everything together." },
      { speaker: "Priya", hindi: "यह weekend बहुत मज़ेदार रहेगा! मैं सबके साथ enjoy करना चाहूँगी।", english: "This weekend will be fun! I'd like to enjoy it with everyone." }
    ]
  },
  {
    title: "Customer Service Call",
    setting: "Phone call — customer and support agent",
    turns: [
      { speaker: "Agent", hindi: "नमस्ते, आप XYZ Bank से बात कर रहे हैं। मैं आपकी कैसे मदद कर सकता हूँ?", english: "Hello, you are speaking with XYZ Bank. How may I help you?" },
      { speaker: "Customer", hindi: "नमस्ते। मैं अपने account के बारे में कुछ जानकारी लेना चाहूँगा।", english: "Hello. I'd like to get some information about my account." },
      { speaker: "Agent", hindi: "बिल्कुल। क्या आप अपना account number बताना चाहेंगे?", english: "Of course. Would you like to share your account number?" },
      { speaker: "Customer", hindi: "हाँ। और मैं यह भी जानना चाहूँगा कि मेरा balance क्या है।", english: "Yes. And I'd also like to know my current balance." },
      { speaker: "Agent", hindi: "ज़रूर। क्या आप एक minute wait करना चाहेंगे?", english: "Certainly. Would you like to hold on for a minute?" },
      { speaker: "Customer", hindi: "हाँ, कोई बात नहीं। मैं wait कर सकता हूँ।", english: "Yes, that's fine. I'd like to wait." },
      { speaker: "Agent", hindi: "आपका balance ₹15,000 है। क्या आप कोई transaction करना चाहेंगे?", english: "Your balance is ₹15,000. Would you like to make any transactions?" },
      { speaker: "Customer", hindi: "नहीं, अभी नहीं। मैं एक complaint दर्ज करना चाहूँगा।", english: "Not right now. I'd like to register a complaint." },
      { speaker: "Agent", hindi: "मुझे बताइए। मैं आपकी शिकायत सुनना चाहूँगा।", english: "Please tell me. I'd like to hear your complaint." },
      { speaker: "Customer", hindi: "मेरे account से गलत charge हुआ है। मैं इसे resolve करना चाहूँगा।", english: "There is an incorrect charge on my account. I'd like to resolve this." },
      { speaker: "Agent", hindi: "मैं समझता हूँ। मैं इसे escalate करना चाहूँगा। क्या आप कल call करना चाहेंगे?", english: "I understand. I'd like to escalate this. Would you like to call again tomorrow?" },
      { speaker: "Customer", hindi: "हाँ, मैं कल सुबह call करना चाहूँगा। बहुत शुक्रिया।", english: "Yes, I'd like to call tomorrow morning. Thank you very much." }
    ]
  }
];

// ─── MAIN BUILD ─────────────────────────────────────────────────────────────
function main() {
  // Seed for reproducibility
  Math.seedrandom = function(seed) {
    let s = seed;
    Math.random = function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  Math.seedrandom(42);

  console.log('Building vocabulary...');
  const vocabulary = buildVocabulary();
  console.log(`Vocabulary count: ${vocabulary.length}`);

  console.log('Building practice sentences...');
  const { practice, usedEnglish: practiceSet } = buildPractice();
  console.log(`Practice count: ${practice.length}`);
  console.log(`Practice unique english: ${new Set(practice.map(p => p.english)).size}`);

  console.log('Building mock test sentences...');
  const mockTest = buildMockTest(practiceSet);
  console.log(`MockTest count: ${mockTest.length}`);
  console.log(`MockTest unique english: ${new Set(mockTest.map(p => p.english)).size}`);

  // Verify no overlap
  const practiceEnglishSet = new Set(practice.map(p => p.english));
  const mockOverlap = mockTest.filter(m => practiceEnglishSet.has(m.english));
  console.log(`Overlap between practice and mock: ${mockOverlap.length}`);

  const output = {
    day: 15,
    topic,
    content,
    vocabulary,
    practice,
    mockTest,
    essay,
    story,
    dialogue
  };

  const outPath = path.join(__dirname, '..', 'data', 'days', 'day_15.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Written to ${outPath}`);
  console.log(`Final counts: vocab=${vocabulary.length}, practice=${practice.length}, mockTest=${mockTest.length}, essay=${essay.length}, story=${story.length}, dialogue=${dialogue.length}`);
}

main();
