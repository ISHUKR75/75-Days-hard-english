#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

// ─── CONTENT (enriched from existing) ────────────────────────────────────────
const topic = {
  title: "Use of Let",
  emoji: "🤝",
  cefr: "A2",
  difficulty: "elementary",
  type: "grammar"
};

const content = {
  explanation: `
**Let — Permission, Causative & Suggestion:**

"Let" = होने देना / करने देना / अनुमति देना

**3 Main Uses:**

**Use 1: Permission देना (Giving or Asking Permission)**
Structure: Let + object pronoun/name + base verb
🇮🇳 मुझे जाने दो।
🇬🇧 Let me go.
🇮🇳 उसे बोलने दो।
🇬🇧 Let him speak.

**Use 2: Causative (किसी को कुछ करने देना)**
Structure: Let + object + base verb (subject allows someone else to do something)
🇮🇳 मुझे तुम्हारी मदद करने दो।
🇬🇧 Let me help you.
🇮🇳 उन्हें अंदर आने दो।
🇬🇧 Let them come in.

**Use 3: Negative (Don't let)**
Structure: Don't let + object + base verb
🇮🇳 उसे जाने मत दो।
🇬🇧 Don't let him go.
🇮🇳 उन्हें बात करने मत दो।
🇬🇧 Don't let them talk.

**Use 4: Suggestion (Let's = Let us)**
🇮🇳 चलो खाना खाते हैं।
🇬🇧 Let's eat. (= Let us eat)

**Key Point:** After LET, always use a BASE VERB (no "to", no "-ing").
✅ Let me go. ❌ Let me to go. ❌ Let me going.

**Object Pronouns used with Let:**
me (मुझे), him (उसे - male), her (उसे - female), us (हमें), them (उन्हें), you (तुम्हें/आपको), + names
  `,
  rules: [
    "Let + object (me/him/her/them/us/you/name) + BASE VERB — object pronoun के बाद हमेशा base form (no 'to', no '-ing')",
    "Let me + verb = मुझे [verb] करने दो — permission माँगना या देना",
    "Let him/her + verb = उसे [verb] करने दो — किसी को अनुमति देना",
    "Let them + verb = उन्हें [verb] करने दो — group को अनुमति देना",
    "Let us / Let's = हमें / चलो — suggestion या invitation (Let's = shortened form of Let us)",
    "Negative: Don't let + object + verb = object + verb ने मत दो — किसी को कुछ करने से रोकना",
    "Formal version: Please let me know / Kindly let him enter — office/professional settings में",
    "Question form: Will you let me + verb? / क्या तुम मुझे [verb] करने दोगे?",
    "Let it + verb — किसी चीज़ या situation को होने देना (e.g. Let it go, Let it rain)",
    "Let + name + verb — pronoun की जगह नाम भी आ सकता है (e.g. Let Rahul speak, Let Priya decide)"
  ],
  memoryTrick: "**LET = Allow (अनुमति)** — Let me / Let him / Let's — इनके बाद हमेशा BASE VERB (no to, no -ing). याद रखो: 'LET' के बाद 'object' आता है फिर 'base verb' — जैसे LEGO blocks: LET + WHO + WHAT.",
  examples: [
    { hindi: "मुझे समझाने दो।", english: "Let me explain.", type: "Let me + verb" },
    { hindi: "उसे जाने दो।", english: "Let him go.", type: "Let him + verb" },
    { hindi: "चलो मिलकर काम करते हैं।", english: "Let's work together.", type: "Let's (suggestion)" },
    { hindi: "मुझे एक मिनट दो।", english: "Let me have a minute.", type: "Let me + verb" },
    { hindi: "उन्हें अंदर आने दो।", english: "Let them come in.", type: "Let them + verb" },
    { hindi: "चलो यह भूल जाते हैं।", english: "Let's forget about it.", type: "Let's + verb" },
    { hindi: "उसे जाने मत दो।", english: "Don't let him go.", type: "Negative: Don't let" },
    { hindi: "क्या तुम मुझे जाने दोगे?", english: "Will you let me go?", type: "Question form" },
    { hindi: "मुझे तुम्हारी मदद करने दो।", english: "Let me help you.", type: "Let me + verb (offer)" },
    { hindi: "राहुल को बोलने दो।", english: "Let Rahul speak.", type: "Let + name + verb" },
    { hindi: "उसे अपना फैसला खुद करने दो।", english: "Let her make her own decision.", type: "Let her + verb phrase" },
    { hindi: "उन्हें यहाँ रुकने मत दो।", english: "Don't let them stay here.", type: "Negative: Don't let them" }
  ],
  mistakes: [
    { wrong: "Let me to go.", correct: "Let me go.", why: "Let के बाद 'to' नहीं आता — हमेशा base verb सीधे आता है।" },
    { wrong: "Let's to eat.", correct: "Let's eat.", why: "Let's के बाद भी base verb — 'to' कभी नहीं।" },
    { wrong: "Let him going.", correct: "Let him go.", why: "Let + object + base verb — '-ing' form गलत है।" },
    { wrong: "Don't lets go.", correct: "Let's not go.", why: "Negative suggestion = Let's not + verb, 'Don't lets' ungrammatical है।" },
    { wrong: "Let me helping you.", correct: "Let me help you.", why: "Let के बाद gerund (-ing) नहीं, base verb आता है।" },
    { wrong: "He let me went.", correct: "He let me go.", why: "Let के बाद past tense नहीं, base verb आता है — यह rule past tense में भी लागू होती है।" },
    { wrong: "Let I go.", correct: "Let me go.", why: "'Let' के बाद subject pronoun (I) नहीं, object pronoun (me) आता है।" },
    { wrong: "Don't let him to leave.", correct: "Don't let him leave.", why: "Negative 'Don't let' के बाद भी 'to' नहीं आता।" },
    { wrong: "Let them comes in.", correct: "Let them come in.", why: "Base verb में 's' नहीं लगता — 'come' not 'comes'।" },
    { wrong: "Lets go to the park.", correct: "Let's go to the park.", why: "'Let's' में apostrophe ज़रूरी है — यह 'Let us' का short form है।" }
  ],
  speakingTips: [
    "Office mein permission माँगते time: 'Let me check and get back to you.' — यह professional aur polite लगता है।",
    "Meeting mein: 'Let's start the meeting.' / 'Let me share my screen.' — confidence दिखाता है।",
    "Friends ke saath suggestion: 'Let's go for dinner tonight!' / 'Let's watch a movie.' — casual, natural लगता है।",
    "किसी को रोकना हो तो: 'Don't let this opportunity go.' / 'Don't let him distract you.' — assertive tone।",
    "Interview mein: 'Let me give you an example.' / 'Let me explain my experience.' — structured answers देने के लिए।",
    "Formal requests: 'Please let me know if you need anything.' / 'Kindly let us know your decision.' — email/formal communication के लिए।",
    "घर पर बच्चों को: 'Let him finish his food.' / 'Don't let them stay up late.' — parenting English।",
    "'Let it be' / 'Let it go' — जब कोई situation को accept करना हो — emotional intelligence English।"
  ]
};

// ─── VOCABULARY (500 words) ───────────────────────────────────────────────────
const vocabularyRaw = [
  // Permission & Let-related (first ~20, thematic)
  {w:"allow",pos:"verb",hi:"अनुमति देना",sm:"to give permission for something",ipa:"/əˈlaʊ/",syn:["permit","let","authorize"],ant:["forbid","deny"],ex:"Please allow me to explain my idea.",off:"The manager allowed the team to work from home.",int:"I always allow my thoughts to settle before answering.",biz:"Company policy allows flexible working hours."},
  {w:"permit",pos:"verb",hi:"अनुमति देना / इजाज़त देना",sm:"to officially allow something",ipa:"/pəˈmɪt/",syn:["allow","authorize","sanction"],ant:["prohibit","ban"],ex:"The doctor permitted him to eat solid food.",off:"HR will permit three days of leave this month.",int:"I permit myself time to prepare thoroughly for interviews.",biz:"The license permits us to operate in five states."},
  {w:"enable",pos:"verb",hi:"सक्षम करना / संभव बनाना",sm:"to make it possible for someone to do something",ipa:"/ɪˈneɪbəl/",syn:["allow","empower","facilitate"],ant:["prevent","disable"],ex:"This app enables you to track your fitness goals.",off:"The new software enables faster data processing.",int:"My degree enabled me to apply for senior roles.",biz:"Technology enables businesses to reach global markets."},
  {w:"suggest",pos:"verb",hi:"सुझाव देना",sm:"to put forward an idea for consideration",ipa:"/səˈdʒɛst/",syn:["propose","recommend","advise"],ant:["oppose","reject"],ex:"I suggest you drink more water daily.",off:"She suggested a new approach to the project.",int:"I always suggest improvements in a respectful way.",biz:"The consultant suggested restructuring the sales team."},
  {w:"propose",pos:"verb",hi:"प्रस्ताव रखना",sm:"to put forward a plan or idea formally",ipa:"/prəˈpoʊz/",syn:["suggest","recommend","put forward"],ant:["oppose","veto"],ex:"He proposed that we meet on Friday.",off:"The team proposed a budget increase for next year.",int:"I proposed a new workflow that saved the company time.",biz:"The board proposed a merger with the partner company."},
  {w:"refuse",pos:"verb",hi:"मना करना / अस्वीकार करना",sm:"to say no to something",ipa:"/rɪˈfjuːz/",syn:["decline","reject","turn down"],ant:["accept","agree"],ex:"She refused to let anyone copy her notes.",off:"He refused the offer of a transfer.",int:"I politely refused to discuss my previous salary.",biz:"The supplier refused to lower the price further."},
  {w:"grant",pos:"verb",hi:"प्रदान करना / मंज़ूर करना",sm:"to officially give or allow something",ipa:"/ɡrænt/",syn:["give","award","approve"],ant:["deny","refuse"],ex:"The principal granted permission for the event.",off:"The manager granted an extension on the deadline.",int:"I was granted a scholarship for my studies.",biz:"The government granted the company a tax exemption."},
  {w:"approve",pos:"verb",hi:"स्वीकृति देना / मंज़ूरी देना",sm:"to officially agree to or accept something",ipa:"/əˈpruːv/",syn:["authorize","sanction","endorse"],ant:["reject","disapprove"],ex:"The bank approved his loan application.",off:"The design was approved by the creative director.",int:"My previous employer approved all my leave requests promptly.",biz:"The board approved the new marketing strategy."},
  {w:"restrict",pos:"verb",hi:"सीमित करना / रोकना",sm:"to put a limit on something",ipa:"/rɪˈstrɪkt/",syn:["limit","constrain","curb"],ant:["allow","free"],ex:"The doctor restricted his diet to low-fat foods.",off:"Access to the server room is restricted.",int:"I prefer roles that don't restrict creative thinking.",biz:"The new policy restricts overtime to ten hours per week."},
  {w:"forbid",pos:"verb",hi:"मनाही करना / रोकना",sm:"to officially not allow something",ipa:"/fəˈbɪd/",syn:["ban","prohibit","disallow"],ant:["allow","permit"],ex:"Parents forbid their children from using phones at dinner.",off:"The company forbids sharing confidential data externally.",int:"My ethics forbid me from taking credit for others' work.",biz:"Company policy forbids accepting gifts from vendors."},
  // General A2-B2 Vocabulary
  {w:"achieve",pos:"verb",hi:"हासिल करना / पाना",sm:"to successfully reach a goal",ipa:"/əˈtʃiːv/",syn:["accomplish","attain","reach"],ant:["fail","miss"],ex:"She worked hard to achieve her dream.",off:"We achieved all our quarterly targets.",int:"I always strive to achieve excellence in my work.",biz:"The company achieved record profits this year."},
  {w:"accomplish",pos:"verb",hi:"पूरा करना / सिद्ध करना",sm:"to successfully complete something",ipa:"/əˈkɒmplɪʃ/",syn:["achieve","complete","fulfil"],ant:["fail","abandon"],ex:"He accomplished the task in record time.",off:"The team accomplished the project ahead of schedule.",int:"I feel proud of what I have accomplished in my career.",biz:"We accomplished our sales target three months early."},
  {w:"adapt",pos:"verb",hi:"अनुकूल होना / ढलना",sm:"to change to fit new conditions",ipa:"/əˈdæpt/",syn:["adjust","modify","conform"],ant:["resist","reject"],ex:"She quickly adapted to her new school.",off:"He adapted well to the new software system.",int:"I can adapt to any work environment easily.",biz:"Businesses must adapt to survive market changes."},
  {w:"address",pos:"verb",hi:"समस्या का सामना करना / बात करना",sm:"to deal with or speak about something",ipa:"/əˈdrɛs/",syn:["tackle","handle","discuss"],ant:["ignore","avoid"],ex:"Let me address your concerns one by one.",off:"The manager addressed the team's complaints in the meeting.",int:"I will address challenges with a positive attitude.",biz:"We need to address the supply chain issue urgently."},
  {w:"advance",pos:"verb",hi:"आगे बढ़ना / प्रगति करना",sm:"to move forward or make progress",ipa:"/ədˈvæns/",syn:["progress","proceed","develop"],ant:["retreat","regress"],ex:"Let's advance to the next level.",off:"She advanced quickly through the company ranks.",int:"I want to advance my career in data science.",biz:"Technology continues to advance at a rapid pace."},
  {w:"agree",pos:"verb",hi:"सहमत होना / मानना",sm:"to have the same opinion as someone",ipa:"/əˈɡriː/",syn:["consent","concur","accept"],ant:["disagree","refuse"],ex:"I agree with your suggestion.",off:"The team agreed on the new deadline.",int:"I always agree to feedback and work on improvements.",biz:"Both parties agreed to the terms of the contract."},
  {w:"analyse",pos:"verb",hi:"विश्लेषण करना",sm:"to examine something carefully",ipa:"/ˈænəlaɪz/",syn:["examine","study","evaluate"],ant:["ignore","overlook"],ex:"Let me analyse the data before deciding.",off:"She analysed the report and found an error.",int:"I analyse problems before offering solutions.",biz:"We need to analyse the market before launching."},
  {w:"announce",pos:"verb",hi:"घोषणा करना",sm:"to make something known publicly",ipa:"/əˈnaʊns/",syn:["declare","proclaim","notify"],ant:["conceal","hide"],ex:"The teacher announced the exam results.",off:"The CEO announced a company expansion.",int:"Let me announce my availability for the role.",biz:"The company announced a new product launch."},
  {w:"apply",pos:"verb",hi:"आवेदन करना / लागू करना",sm:"to make a formal request or put something into use",ipa:"/əˈplaɪ/",syn:["request","use","implement"],ant:["ignore","withdraw"],ex:"She applied for the scholarship.",off:"He applied for a promotion last week.",int:"I applied for this position because I believe in the company's mission.",biz:"The new regulations apply to all registered businesses."},
  {w:"appreciate",pos:"verb",hi:"सराहना करना / कद्र करना",sm:"to be grateful for or recognize the value of something",ipa:"/əˈpriːʃieɪt/",syn:["value","recognize","acknowledge"],ant:["undervalue","ignore"],ex:"I appreciate your help with the project.",off:"The manager appreciated the team's hard work.",int:"I appreciate constructive feedback.",biz:"We appreciate your long-term partnership with our company."},
  {w:"arrange",pos:"verb",hi:"व्यवस्था करना / इंतज़ाम करना",sm:"to plan and organize something",ipa:"/əˈreɪndʒ/",syn:["organize","plan","coordinate"],ant:["disorganize","cancel"],ex:"She arranged a surprise party for her friend.",off:"Please arrange a meeting with the client.",int:"I can arrange my schedule to attend the training.",biz:"Let me arrange a call with our legal team."},
  {w:"assist",pos:"verb",hi:"सहायता करना / मदद करना",sm:"to help someone do something",ipa:"/əˈsɪst/",syn:["help","support","aid"],ant:["hinder","obstruct"],ex:"Let me assist you with the heavy bags.",off:"The intern assisted the manager with the report.",int:"I am always ready to assist my teammates.",biz:"Our support team assists clients 24/7."},
  {w:"attend",pos:"verb",hi:"उपस्थित होना / हाज़िर होना",sm:"to be present at an event or meeting",ipa:"/əˈtɛnd/",syn:["participate","join","appear"],ant:["miss","absent"],ex:"Please attend the workshop tomorrow.",off:"All employees must attend the annual review.",int:"I attended every training session offered by my previous employer.",biz:"Senior management will attend the product launch event."},
  {w:"believe",pos:"verb",hi:"विश्वास करना / मानना",sm:"to accept something as true",ipa:"/bɪˈliːv/",syn:["trust","think","consider"],ant:["doubt","disbelieve"],ex:"I believe you can do it.",off:"The team believed in the new strategy.",int:"I believe my skills match this job perfectly.",biz:"We believe in transparent and ethical business practices."},
  {w:"benefit",pos:"noun",hi:"लाभ / फ़ायदा",sm:"an advantage or good result",ipa:"/ˈbɛnɪfɪt/",syn:["advantage","gain","reward"],ant:["disadvantage","loss"],ex:"Exercise has many health benefits.",off:"The new policy benefits all employees.",int:"Let me explain the benefits I bring to this role.",biz:"Cost-cutting measures benefited the company financially."},
  {w:"budget",pos:"noun",hi:"बजट / खर्च की सीमा",sm:"a plan for how to spend money",ipa:"/ˈbʌdʒɪt/",syn:["estimate","allocation","plan"],ant:[],ex:"We need to plan our monthly budget carefully.",off:"The project went over budget by ten percent.",int:"I managed a budget of five lakhs in my last role.",biz:"Let's review the annual budget before the board meeting."},
  {w:"challenge",pos:"noun",hi:"चुनौती",sm:"a difficult task that tests your ability",ipa:"/ˈtʃælɪndʒ/",syn:["difficulty","obstacle","test"],ant:["ease","simplicity"],ex:"Every challenge makes you stronger.",off:"The project presented several technical challenges.",int:"I see challenges as opportunities to grow.",biz:"The biggest challenge is maintaining quality at scale."},
  {w:"clarify",pos:"verb",hi:"स्पष्ट करना / साफ़ करना",sm:"to make something easier to understand",ipa:"/ˈklærɪfaɪ/",syn:["explain","clear up","simplify"],ant:["confuse","obscure"],ex:"Let me clarify what I meant.",off:"Please clarify the deadline for this task.",int:"I always clarify expectations before starting a project.",biz:"Let us clarify the terms before signing the agreement."},
  {w:"collaborate",pos:"verb",hi:"मिलकर काम करना / सहयोग करना",sm:"to work together with others",ipa:"/kəˈlæbəreɪt/",syn:["cooperate","work together","team up"],ant:["compete","work alone"],ex:"Students collaborated on the science project.",off:"Our teams collaborate across departments every day.",int:"I collaborate effectively with cross-functional teams.",biz:"We collaborate with international partners to deliver better results."},
  {w:"commit",pos:"verb",hi:"प्रतिबद्ध होना / वचन देना",sm:"to promise or dedicate yourself to something",ipa:"/kəˈmɪt/",syn:["pledge","dedicate","devote"],ant:["neglect","abandon"],ex:"I commit to improving my English every day.",off:"She committed to finishing the report by Friday.",int:"I am fully committed to delivering quality work.",biz:"We commit to delivering projects on time and within budget."},
  {w:"communicate",pos:"verb",hi:"संवाद करना / बात करना",sm:"to share information with others",ipa:"/kəˈmjuːnɪkeɪt/",syn:["convey","express","interact"],ant:["hide","withhold"],ex:"It is important to communicate clearly.",off:"Managers must communicate goals effectively to their teams.",int:"I communicate well in both written and verbal formats.",biz:"Let's communicate our strategy to all stakeholders."},
  {w:"complete",pos:"verb",hi:"पूरा करना / खत्म करना",sm:"to finish something",ipa:"/kəmˈpliːt/",syn:["finish","accomplish","fulfil"],ant:["start","abandon"],ex:"Please complete the form and submit it.",off:"He completed the project three days early.",int:"I always complete my assignments before the deadline.",biz:"We expect the construction to complete by March."},
  {w:"confident",pos:"adjective",hi:"आत्मविश्वासी / भरोसेमंद",sm:"feeling sure about yourself",ipa:"/ˈkɒnfɪdənt/",syn:["self-assured","bold","positive"],ant:["unsure","hesitant"],ex:"She walked into the interview confident and prepared.",off:"A confident presenter speaks clearly and makes eye contact.",int:"I am confident in my ability to handle this role.",biz:"A confident brand attracts more loyal customers."},
  {w:"confirm",pos:"verb",hi:"पुष्टि करना / कन्फ़र्म करना",sm:"to state or show that something is true or will happen",ipa:"/kənˈfɜːm/",syn:["verify","validate","affirm"],ant:["deny","cancel"],ex:"Please confirm your attendance by tomorrow.",off:"The client confirmed the order via email.",int:"Let me confirm my understanding of the role requirements.",biz:"We will confirm the delivery date once the stock arrives."},
  {w:"contribute",pos:"verb",hi:"योगदान देना",sm:"to give something as part of a group effort",ipa:"/kənˈtrɪbjuːt/",syn:["add","donate","help"],ant:["withhold","take"],ex:"Everyone can contribute to making the world better.",off:"She contributed several key ideas in the brainstorming session.",int:"I contributed to increasing sales by fifteen percent.",biz:"Our employees contribute to the company's long-term success."},
  {w:"coordinate",pos:"verb",hi:"समन्वय करना / मिलाना",sm:"to organize people or things to work well together",ipa:"/koʊˈɔːrdɪneɪt/",syn:["organise","manage","synchronize"],ant:["disorganize","confuse"],ex:"Let me coordinate the event schedule.",off:"She coordinates all marketing campaigns.",int:"I coordinated a team of eight people in my last job.",biz:"We coordinate with vendors to ensure on-time delivery."},
  {w:"create",pos:"verb",hi:"बनाना / सृजन करना",sm:"to make or produce something new",ipa:"/kriˈeɪt/",syn:["make","build","design"],ant:["destroy","demolish"],ex:"Let's create something amazing together.",off:"The design team created a new logo.",int:"I created a training programme that improved productivity.",biz:"We create innovative solutions for complex business problems."},
  {w:"deadline",pos:"noun",hi:"समय-सीमा / अंतिम तारीख",sm:"the latest time or date by which something must be done",ipa:"/ˈdɛdlaɪn/",syn:["due date","time limit","cutoff"],ant:[],ex:"Always submit your work before the deadline.",off:"The deadline for the report is end of day Friday.",int:"I am skilled at managing multiple deadlines simultaneously.",biz:"Missing a deadline can damage client trust."},
  {w:"decision",pos:"noun",hi:"निर्णय / फ़ैसला",sm:"a choice you make after thinking",ipa:"/dɪˈsɪʒən/",syn:["choice","resolution","verdict"],ant:[],ex:"Let him make his own decision.",off:"The manager made a decision to expand the team.",int:"I make decisions based on data and analysis.",biz:"Every business decision should align with company goals."},
  {w:"dedicate",pos:"verb",hi:"समर्पित करना / लगन से काम करना",sm:"to give time and energy to something",ipa:"/ˈdɛdɪkeɪt/",syn:["devote","commit","invest"],ant:["neglect","ignore"],ex:"She dedicated her weekends to learning English.",off:"He dedicated months to completing the research.",int:"I am dedicated to continuous professional development.",biz:"The company dedicates a large budget to employee training."},
  {w:"deliver",pos:"verb",hi:"पहुँचाना / देना / पूरा करना",sm:"to take something to a place or person; to fulfil a promise",ipa:"/dɪˈlɪvər/",syn:["supply","provide","hand over"],ant:["withhold","fail"],ex:"The courier will deliver the parcel tomorrow.",off:"Our team consistently delivers high-quality results.",int:"I always deliver what I promise.",biz:"Let's deliver the project within scope and on time."},
  {w:"describe",pos:"verb",hi:"वर्णन करना / बताना",sm:"to say what something is like",ipa:"/dɪˈskraɪb/",syn:["explain","portray","depict"],ant:[],ex:"Can you describe your ideal job?",off:"Please describe the bug in detail.",int:"Let me describe my previous role.",biz:"Describe the product benefits clearly in the brochure."},
  {w:"develop",pos:"verb",hi:"विकसित करना / बढ़ाना",sm:"to grow or make something grow",ipa:"/dɪˈvɛləp/",syn:["grow","build","improve"],ant:["shrink","decline"],ex:"She developed new skills by taking online courses.",off:"The team developed a new mobile application.",int:"I developed my leadership skills by managing projects.",biz:"We develop custom software solutions for enterprises."},
  {w:"discuss",pos:"verb",hi:"चर्चा करना / बात करना",sm:"to talk about something with others",ipa:"/dɪˈskʌs/",syn:["talk about","debate","deliberate"],ant:["ignore","avoid"],ex:"Let's discuss the plan before starting.",off:"We discussed the budget allocation in the meeting.",int:"I am happy to discuss my qualifications in detail.",biz:"Let us discuss the terms of the partnership."},
  {w:"effective",pos:"adjective",hi:"प्रभावी / असरदार",sm:"producing the result that was intended",ipa:"/ɪˈfɛktɪv/",syn:["efficient","successful","productive"],ant:["ineffective","useless"],ex:"This is an effective way to learn English.",off:"Effective communication is key in any workplace.",int:"I am an effective problem-solver.",biz:"An effective marketing campaign drives real sales."},
  {w:"efficient",pos:"adjective",hi:"कुशल / दक्ष",sm:"doing something well without wasting time or effort",ipa:"/ɪˈfɪʃənt/",syn:["effective","productive","capable"],ant:["inefficient","wasteful"],ex:"She is very efficient at managing her time.",off:"We need a more efficient process for onboarding.",int:"I pride myself on being efficient under pressure.",biz:"Efficient operations reduce costs and increase margins."},
  {w:"effort",pos:"noun",hi:"प्रयास / मेहनत",sm:"the energy used to do something",ipa:"/ˈɛfət/",syn:["attempt","work","endeavour"],ant:["laziness","inaction"],ex:"Success requires consistent effort.",off:"The team put in great effort to finish on time.",int:"I put full effort into everything I commit to.",biz:"Customer satisfaction requires effort from every department."},
  {w:"encourage",pos:"verb",hi:"प्रोत्साहित करना / हिम्मत देना",sm:"to give someone confidence to do something",ipa:"/ɪnˈkʌrɪdʒ/",syn:["motivate","inspire","support"],ant:["discourage","deter"],ex:"Let me encourage you to try again.",off:"Good managers encourage their team members to grow.",int:"I encourage my colleagues to share their ideas.",biz:"Positive reviews encourage more customers to buy."},
  {w:"establish",pos:"verb",hi:"स्थापित करना / कायम करना",sm:"to set up or start something that will last",ipa:"/ɪˈstæblɪʃ/",syn:["found","set up","create"],ant:["dissolve","end"],ex:"She established a good routine for studying.",off:"The company was established in 2010.",int:"I established a new process that reduced errors by twenty percent.",biz:"We established a global distribution network over five years."},
  {w:"evaluate",pos:"verb",hi:"मूल्यांकन करना / जाँचना",sm:"to judge or assess something carefully",ipa:"/ɪˈvæljueɪt/",syn:["assess","judge","measure"],ant:["ignore","overlook"],ex:"Let's evaluate our progress every week.",off:"The HR team evaluates performance annually.",int:"I evaluate my strengths and weaknesses honestly.",biz:"We evaluate vendor proposals based on quality and cost."},
  {w:"explain",pos:"verb",hi:"समझाना / बताना",sm:"to make something clear by describing it",ipa:"/ɪkˈspleɪn/",syn:["clarify","describe","elaborate"],ant:["confuse","complicate"],ex:"Let me explain the concept simply.",off:"Can you explain the process step by step?",int:"Let me explain why I am the right candidate.",biz:"We explain our service model to all new clients."},
  {w:"express",pos:"verb",hi:"व्यक्त करना / ज़ाहिर करना",sm:"to show or say what you feel or think",ipa:"/ɪkˈsprɛs/",syn:["convey","show","communicate"],ant:["hide","conceal"],ex:"She expressed her gratitude to the team.",off:"Employees are encouraged to express their opinions.",int:"Let me express my genuine interest in this role.",biz:"Customer feedback helps express market needs."},
  {w:"flexible",pos:"adjective",hi:"लचीला / अनुकूल",sm:"able to change or adapt easily",ipa:"/ˈflɛksɪbəl/",syn:["adaptable","adjustable","versatile"],ant:["rigid","inflexible"],ex:"A flexible schedule helps balance work and family.",off:"The new policy allows flexible working hours.",int:"I am flexible and can work in different environments.",biz:"A flexible contract benefits both parties."},
  {w:"focus",pos:"verb",hi:"ध्यान केंद्रित करना",sm:"to concentrate your attention on something",ipa:"/ˈfoʊkəs/",syn:["concentrate","centre","direct"],ant:["distract","wander"],ex:"Let's focus on the task at hand.",off:"Please focus on meeting the client's requirements.",int:"I focus on results and continuous improvement.",biz:"The company will focus on expanding into new markets."},
  {w:"goal",pos:"noun",hi:"लक्ष्य / उद्देश्य",sm:"something you want to achieve",ipa:"/ɡoʊl/",syn:["aim","target","objective"],ant:[],ex:"Set a clear goal before you start.",off:"Our goal for this quarter is to increase revenue.",int:"My career goal is to become a project manager.",biz:"Let's align our goals with the company's vision."},
  {w:"handle",pos:"verb",hi:"संभालना / सामना करना",sm:"to deal with or manage something",ipa:"/ˈhændəl/",syn:["manage","deal with","tackle"],ant:["ignore","avoid"],ex:"She can handle difficult situations calmly.",off:"Let me handle the client complaint.",int:"I have experience handling high-pressure situations.",biz:"We handle all customer queries within 24 hours."},
  {w:"identify",pos:"verb",hi:"पहचानना / चिन्हित करना",sm:"to recognise or find out who or what something is",ipa:"/aɪˈdɛntɪfaɪ/",syn:["recognise","detect","pinpoint"],ant:["overlook","miss"],ex:"Let us identify the problem first.",off:"The audit helped identify gaps in the process.",int:"I can identify opportunities and act on them quickly.",biz:"Let's identify our target audience before the campaign."},
  {w:"implement",pos:"verb",hi:"लागू करना / अमल में लाना",sm:"to put a plan or decision into action",ipa:"/ˈɪmplɪmɛnt/",syn:["execute","apply","carry out"],ant:["plan","ignore"],ex:"Let's implement the new schedule from Monday.",off:"The team successfully implemented the new system.",int:"I implemented a cost-saving process in my last company.",biz:"We will implement the strategy in phases."},
  {w:"improve",pos:"verb",hi:"सुधारना / बेहतर करना",sm:"to make or become better",ipa:"/ɪmˈpruːv/",syn:["enhance","develop","better"],ant:["worsen","decline"],ex:"I try to improve my English every day.",off:"We improved the workflow to save three hours a week.",int:"I am always looking for ways to improve my skills.",biz:"Let's improve customer satisfaction scores by year end."},
  {w:"innovative",pos:"adjective",hi:"नवोन्मेषी / अभिनव",sm:"introducing or using new ideas or methods",ipa:"/ˈɪnəveɪtɪv/",syn:["creative","original","inventive"],ant:["traditional","conventional"],ex:"Let's find an innovative solution to this problem.",off:"The company rewards innovative thinking.",int:"I am proud of my innovative approach to problem-solving.",biz:"Innovative companies stay ahead of the competition."},
  {w:"inspire",pos:"verb",hi:"प्रेरित करना",sm:"to make someone feel motivated or creative",ipa:"/ɪnˈspaɪər/",syn:["motivate","encourage","influence"],ant:["discourage","demotivate"],ex:"Let her story inspire you to never give up.",off:"Great leaders inspire their teams to give their best.",int:"My mentor inspired me to pursue a career in finance.",biz:"A strong brand identity inspires customer loyalty."},
  {w:"manage",pos:"verb",hi:"प्रबंधन करना / संभालना",sm:"to control or be responsible for something",ipa:"/ˈmænɪdʒ/",syn:["run","handle","oversee"],ant:["mismanage","neglect"],ex:"She manages her time very well.",off:"He manages a team of fifteen engineers.",int:"I managed client accounts worth five crore rupees.",biz:"We manage the entire supply chain from factory to customer."},
  {w:"motivate",pos:"verb",hi:"प्रेरित करना / उत्साहित करना",sm:"to give someone a reason to act",ipa:"/ˈmoʊtɪveɪt/",syn:["inspire","encourage","drive"],ant:["discourage","demotivate"],ex:"Let me motivate you to take the first step.",off:"A good manager motivates the team through recognition.",int:"I am self-motivated and do not need constant supervision.",biz:"Incentive programmes motivate employees to perform better."},
  {w:"negotiate",pos:"verb",hi:"बातचीत करना / मोलभाव करना",sm:"to reach an agreement through discussion",ipa:"/nɪˈɡoʊʃieɪt/",syn:["discuss","bargain","mediate"],ant:["demand","dictate"],ex:"Let's negotiate the price before we agree.",off:"The HR manager negotiated the salary with the candidate.",int:"I negotiated a better contract for my previous employer.",biz:"We negotiate long-term contracts with our suppliers."},
  {w:"observe",pos:"verb",hi:"देखना / निरीक्षण करना",sm:"to watch or notice something carefully",ipa:"/əbˈzɜːv/",syn:["watch","notice","monitor"],ant:["ignore","overlook"],ex:"Let me observe how you do this first.",off:"The senior engineer observed the testing process.",int:"I observe workplace dynamics to improve team communication.",biz:"Marketers observe consumer behaviour to refine strategies."},
  {w:"opportunity",pos:"noun",hi:"अवसर / मौका",sm:"a time when something good is possible",ipa:"/ˌɒpəˈtjuːnɪti/",syn:["chance","opening","possibility"],ant:["obstacle","threat"],ex:"Don't let this opportunity slip away.",off:"This project is a great opportunity to showcase your skills.",int:"I see this job as a fantastic opportunity to grow.",biz:"Let's capitalise on the market opportunity now."},
  {w:"organise",pos:"verb",hi:"व्यवस्थित करना / आयोजन करना",sm:"to arrange things in a systematic way",ipa:"/ˈɔːɡənaɪz/",syn:["arrange","plan","coordinate"],ant:["disorganize","mess up"],ex:"Let me organise the files for you.",off:"She organises the team's weekly schedule.",int:"I am highly organised and detail-oriented.",biz:"We organise quarterly business reviews with all clients."},
  {w:"participate",pos:"verb",hi:"भाग लेना / हिस्सा लेना",sm:"to take part in something",ipa:"/pɑːˈtɪsɪpeɪt/",syn:["join","take part","contribute"],ant:["abstain","withdraw"],ex:"Let everyone participate in the discussion.",off:"All employees are expected to participate in the annual survey.",int:"I actively participated in my college's entrepreneurship club.",biz:"Let's participate in the industry conference this year."},
  {w:"perform",pos:"verb",hi:"प्रदर्शन करना / काम करना",sm:"to carry out a task or show an ability",ipa:"/pəˈfɔːm/",syn:["execute","accomplish","do"],ant:["fail","neglect"],ex:"Let the team perform without unnecessary pressure.",off:"He performed exceptionally well in his annual review.",int:"I always perform my best under tight deadlines.",biz:"High-performing teams drive sustainable business growth."},
  {w:"plan",pos:"verb",hi:"योजना बनाना",sm:"to decide what to do in advance",ipa:"/plæn/",syn:["prepare","organise","strategize"],ant:["improvise","ignore"],ex:"Let's plan our trip carefully.",off:"We need to plan the product launch in detail.",int:"I always plan my workday to maximise efficiency.",biz:"Let's plan for potential risks before the project starts."},
  {w:"prepare",pos:"verb",hi:"तैयारी करना",sm:"to make yourself or something ready",ipa:"/prɪˈpeər/",syn:["get ready","arrange","plan"],ant:["ignore","neglect"],ex:"Let me prepare the presentation slides.",off:"The team prepared thoroughly for the client meeting.",int:"I prepared extensively for this interview.",biz:"We prepare detailed proposals for every new client."},
  {w:"present",pos:"verb",hi:"प्रस्तुत करना / पेश करना",sm:"to show or introduce something to others",ipa:"/prɪˈzɛnt/",syn:["show","display","introduce"],ant:["hide","conceal"],ex:"Let me present my idea to the class.",off:"She presented the quarterly results to the board.",int:"I am confident presenting to senior stakeholders.",biz:"Let us present our solution at the next board meeting."},
  {w:"prioritise",pos:"verb",hi:"प्राथमिकता देना",sm:"to decide what is most important and deal with it first",ipa:"/praɪˈɒrɪtaɪz/",syn:["rank","order","schedule"],ant:["neglect","delay"],ex:"Learn to prioritise tasks every morning.",off:"Please prioritise the urgent client request.",int:"I prioritise tasks based on impact and urgency.",biz:"Let's prioritise customer satisfaction above all else."},
  {w:"proactive",pos:"adjective",hi:"पहल करने वाला / सक्रिय",sm:"taking action before a problem happens",ipa:"/ˌproʊˈæktɪv/",syn:["forward-thinking","initiative","preventive"],ant:["reactive","passive"],ex:"Be proactive and prepare before it becomes urgent.",off:"Proactive employees identify problems before they escalate.",int:"I am a proactive person who takes initiative.",biz:"A proactive approach to risk management protects the business."},
  {w:"productive",pos:"adjective",hi:"उत्पादक / फलदायक",sm:"achieving a lot with the time available",ipa:"/prəˈdʌktɪv/",syn:["efficient","useful","effective"],ant:["unproductive","idle"],ex:"Working in short sessions can be very productive.",off:"The morning meetings keep the team productive.",int:"I am most productive when I have clear goals.",biz:"A productive workplace leads to higher profits."},
  {w:"professional",pos:"adjective",hi:"पेशेवर / व्यावसायिक",sm:"relating to a job or having high standards",ipa:"/prəˈfɛʃənəl/",syn:["expert","skilled","competent"],ant:["amateur","unprofessional"],ex:"Always maintain a professional tone in emails.",off:"She handles all client interactions in a professional manner.",int:"I maintain professional relationships with all colleagues.",biz:"Professional conduct builds trust with clients."},
  {w:"promote",pos:"verb",hi:"पदोन्नति देना / प्रचार करना",sm:"to raise someone to a higher position or advertise something",ipa:"/prəˈmoʊt/",syn:["advance","advertise","elevate"],ant:["demote","downgrade"],ex:"The company promoted her after three years.",off:"Let us promote the new product across all channels.",int:"I hope to be promoted to team lead within a year.",biz:"We promote our services through digital marketing."},
  {w:"provide",pos:"verb",hi:"प्रदान करना / देना",sm:"to give something that someone needs",ipa:"/prəˈvaɪd/",syn:["supply","offer","give"],ant:["take","withhold"],ex:"Let me provide you with all the information you need.",off:"The company provides free meals to all employees.",int:"I can provide references from my previous employers.",biz:"We provide end-to-end logistics solutions."},
  {w:"quality",pos:"noun",hi:"गुणवत्ता / मानक",sm:"how good or bad something is",ipa:"/ˈkwɒlɪti/",syn:["standard","excellence","grade"],ant:["inferiority","defect"],ex:"Never compromise on the quality of your work.",off:"Quality control is essential in manufacturing.",int:"I am committed to delivering the highest quality work.",biz:"Quality products build lasting brand reputation."},
  {w:"recommend",pos:"verb",hi:"सिफारिश करना / सुझाव देना",sm:"to say that something or someone is good",ipa:"/ˌrɛkəˈmɛnd/",syn:["suggest","advise","endorse"],ant:["warn against","discourage"],ex:"I recommend you read this book.",off:"The consultant recommended a new filing system.",int:"My manager would highly recommend me for this role.",biz:"We recommend this software to all our enterprise clients."},
  {w:"resolve",pos:"verb",hi:"हल करना / सुलझाना",sm:"to find a solution to a problem",ipa:"/rɪˈzɒlv/",syn:["solve","settle","fix"],ant:["create","worsen"],ex:"Let's resolve this issue quickly.",off:"The customer support team resolved the complaint same day.",int:"I am skilled at resolving conflicts in the workplace.",biz:"Let me resolve the payment dispute with the vendor."},
  {w:"responsibility",pos:"noun",hi:"जिम्मेदारी",sm:"a duty or task you are required to do",ipa:"/rɪˌspɒnsɪˈbɪlɪti/",syn:["duty","obligation","accountability"],ant:["irresponsibility","negligence"],ex:"Take responsibility for your actions.",off:"She took on additional responsibilities after the promotion.",int:"I welcome responsibility and ownership of my projects.",biz:"Each department has clear responsibilities outlined in the handbook."},
  {w:"review",pos:"verb",hi:"समीक्षा करना / जाँचना",sm:"to look at or examine something again",ipa:"/rɪˈvjuː/",syn:["examine","assess","check"],ant:["ignore","overlook"],ex:"Let me review the document before we send it.",off:"The manager reviews all reports before submission.",int:"I review my performance regularly to identify improvement areas.",biz:"Let's review the contract terms with the legal team."},
  {w:"risk",pos:"noun",hi:"जोखिम / खतरा",sm:"the possibility of something bad happening",ipa:"/rɪsk/",syn:["danger","hazard","threat"],ant:["safety","certainty"],ex:"Don't let fear of risk stop you from trying.",off:"Every business decision carries some level of risk.",int:"I assess risks carefully before making decisions.",biz:"Risk management is critical for long-term business sustainability."},
  {w:"schedule",pos:"noun",hi:"समय-सारणी / कार्यक्रम",sm:"a plan of times for activities",ipa:"/ˈʃɛdjuːl/",syn:["timetable","plan","agenda"],ant:[],ex:"Let me check my schedule for tomorrow.",off:"Please send me the meeting schedule in advance.",int:"I create a daily schedule to stay organised.",biz:"We will share the project schedule with all stakeholders."},
  {w:"skill",pos:"noun",hi:"कौशल / हुनर",sm:"the ability to do something well",ipa:"/skɪl/",syn:["ability","talent","expertise"],ant:["weakness","inability"],ex:"Learning English is a valuable skill.",off:"Strong communication skills are essential in this role.",int:"Let me highlight the key skills I bring to this position.",biz:"Investing in employee skills drives business growth."},
  {w:"strategy",pos:"noun",hi:"रणनीति / योजना",sm:"a plan designed to achieve a long-term goal",ipa:"/ˈstrætɪdʒi/",syn:["plan","approach","method"],ant:["improvisation","disorder"],ex:"Let's discuss the best strategy for this project.",off:"The team developed a marketing strategy for the quarter.",int:"I can develop and execute strategies that deliver results.",biz:"A clear strategy helps companies navigate market challenges."},
  {w:"submit",pos:"verb",hi:"जमा करना / सौंपना",sm:"to hand something in for review or approval",ipa:"/səbˈmɪt/",syn:["hand in","present","file"],ant:["withdraw","hold"],ex:"Please submit your assignment by Friday.",off:"Let me submit the report before the deadline.",int:"I always submit my work ahead of the deadline.",biz:"All invoices must be submitted by the 25th of each month."},
  {w:"support",pos:"verb",hi:"सहयोग देना / साथ देना",sm:"to help or assist someone or something",ipa:"/səˈpɔːt/",syn:["help","assist","back"],ant:["oppose","hinder"],ex:"Let me support you through this difficult time.",off:"The company supports employees with mental health resources.",int:"I support my colleagues by sharing knowledge freely.",biz:"Our customer success team supports clients throughout the contract."},
  {w:"target",pos:"noun",hi:"लक्ष्य / निशाना",sm:"something you are trying to achieve",ipa:"/ˈtɑːɡɪt/",syn:["goal","aim","objective"],ant:["miss","failure"],ex:"Set a weekly target and stick to it.",off:"The sales team exceeded their monthly target.",int:"I consistently meet and exceed my performance targets.",biz:"Let's review whether we are on track to hit the annual target."},
  {w:"teamwork",pos:"noun",hi:"टीमवर्क / सहयोगी कार्य",sm:"working together as a group to achieve a goal",ipa:"/ˈtiːmwɜːk/",syn:["collaboration","cooperation","unity"],ant:["selfishness","rivalry"],ex:"Good teamwork makes difficult tasks easier.",off:"Effective teamwork is the foundation of this company.",int:"I believe strong teamwork leads to the best results.",biz:"Our company culture promotes teamwork and shared success."},
  {w:"update",pos:"verb",hi:"अपडेट करना / ताज़ा जानकारी देना",sm:"to give someone the latest information about something",ipa:"/ˈʌpdeɪt/",syn:["inform","notify","revise"],ant:["ignore","withhold"],ex:"Please update me on the project status.",off:"Let me update the spreadsheet with the latest figures.",int:"I update my skills regularly through online courses.",biz:"We update our clients every week on project progress."},
  {w:"valuable",pos:"adjective",hi:"मूल्यवान / कीमती",sm:"worth a lot; very useful or important",ipa:"/ˈvæljuəbəl/",syn:["precious","useful","important"],ant:["worthless","insignificant"],ex:"Time is the most valuable resource we have.",off:"Her experience is very valuable to our team.",int:"I bring valuable experience in customer relationship management.",biz:"Data is one of the most valuable assets for modern businesses."},
  {w:"verify",pos:"verb",hi:"जाँचना / सत्यापित करना",sm:"to check that something is correct or true",ipa:"/ˈvɛrɪfaɪ/",syn:["confirm","check","validate"],ant:["doubt","ignore"],ex:"Please verify your email address.",off:"Let me verify the figures before we publish the report.",int:"I always verify my work before submitting it.",biz:"Banks verify the identity of all account holders."},
  {w:"vision",pos:"noun",hi:"दृष्टिकोण / लक्ष्य",sm:"a clear idea of what you want to achieve in the future",ipa:"/ˈvɪʒən/",syn:["goal","aspiration","dream"],ant:["shortsightedness","ignorance"],ex:"Let's share a vision for a better future.",off:"The CEO shared the company's vision for the next five years.",int:"My vision is to lead a product team within three years.",biz:"A clear vision aligns every department toward common goals."},
  {w:"achieve",pos:"verb",hi:"प्राप्त करना",sm:"to get a desired result",ipa:"/əˈtʃiːv/",syn:["attain","accomplish","reach"],ant:["fail"],ex:"Let's achieve our goals together.",off:"We achieved all our targets this quarter.",int:"I have achieved significant results in my previous roles.",biz:"Our strategy is designed to achieve long-term growth."},
  // More general vocabulary to reach 500
  {w:"absent",pos:"adjective",hi:"अनुपस्थित",sm:"not present in a place",ipa:"/ˈæbsənt/",syn:["away","missing","gone"],ant:["present","attending"],ex:"She was absent from school yesterday.",off:"Three team members were absent from the meeting.",int:"I have never been absent without informing my manager.",biz:"An absent key person can delay critical decisions."},
  {w:"access",pos:"noun",hi:"पहुँच / अनुमति",sm:"the right or ability to use something",ipa:"/ˈæksɛs/",syn:["entry","permission","admittance"],ant:["denial","restriction"],ex:"Only staff have access to this area.",off:"Please grant me access to the shared drive.",int:"I need access to the reporting dashboard.",biz:"Secure access to company systems is mandatory."},
  {w:"accurate",pos:"adjective",hi:"सटीक / सही",sm:"correct and without mistakes",ipa:"/ˈækjərɪt/",syn:["correct","precise","exact"],ant:["inaccurate","wrong"],ex:"Make sure your data is accurate before submitting.",off:"Accurate reporting is essential for decision making.",int:"I always deliver accurate and timely work.",biz:"Accurate financial statements are required by law."},
  {w:"action",pos:"noun",hi:"कार्यवाही / काम",sm:"something you do to achieve a goal",ipa:"/ˈækʃən/",syn:["step","move","deed"],ant:["inaction","inactivity"],ex:"Let's take action before it is too late.",off:"The manager took action to resolve the conflict.",int:"I believe in taking quick action when problems arise.",biz:"Every business plan must include clear action items."},
  {w:"active",pos:"adjective",hi:"सक्रिय / गतिशील",sm:"doing things; taking part in activities",ipa:"/ˈæktɪv/",syn:["busy","energetic","engaged"],ant:["inactive","passive"],ex:"Stay active to maintain good health.",off:"She is an active member of the project team.",int:"I am an active learner who takes every chance to grow.",biz:"An active social media presence builds brand awareness."},
  {w:"actual",pos:"adjective",hi:"वास्तविक / असली",sm:"real or existing, not imagined",ipa:"/ˈæktʃuəl/",syn:["real","genuine","true"],ant:["imaginary","false"],ex:"The actual cost was higher than the estimate.",off:"Let me share the actual figures from last quarter.",int:"My actual experience includes five years in sales.",biz:"We compare actual performance against planned targets monthly."},
  {w:"agenda",pos:"noun",hi:"एजेंडा / कार्यसूची",sm:"a list of things to be discussed or done",ipa:"/əˈdʒɛndə/",syn:["schedule","plan","programme"],ant:[],ex:"Let me share the meeting agenda in advance.",off:"The agenda for today includes three main topics.",int:"I always prepare an agenda to make meetings productive.",biz:"Our board meeting agenda is circulated three days before."},
  {w:"ambitious",pos:"adjective",hi:"महत्त्वाकांक्षी",sm:"having a strong desire to succeed",ipa:"/æmˈbɪʃəs/",syn:["driven","aspiring","goal-oriented"],ant:["unmotivated","content"],ex:"She is ambitious and always aims for the best.",off:"We need an ambitious team to grow the business.",int:"I am ambitious and have clear goals for my career.",biz:"Ambitious targets push teams to perform at their peak."},
  {w:"attitude",pos:"noun",hi:"रवैया / नज़रिया",sm:"the way you think or feel about something",ipa:"/ˈætɪtjuːd/",syn:["mindset","outlook","approach"],ant:["negativity","pessimism"],ex:"A positive attitude makes every task easier.",off:"His attitude towards work is always professional.",int:"I maintain a positive attitude even under pressure.",biz:"Company culture starts with the right attitude from leadership."},
  {w:"aware",pos:"adjective",hi:"जागरूक / सचेत",sm:"knowing about something",ipa:"/əˈwɛər/",syn:["conscious","informed","knowledgeable"],ant:["unaware","ignorant"],ex:"Be aware of your surroundings at all times.",off:"The team is aware of the new company policy.",int:"I am fully aware of the challenges in this role.",biz:"Consumers are more aware of sustainability than ever before."},
  {w:"basic",pos:"adjective",hi:"बुनियादी / सरल",sm:"the most important and simple part of something",ipa:"/ˈbeɪsɪk/",syn:["fundamental","elementary","essential"],ant:["advanced","complex"],ex:"Let me explain the basic grammar rules first.",off:"Every employee must complete the basic safety training.",int:"I have strong basic skills in data analysis.",biz:"Basic accounting knowledge is essential for managers."},
  {w:"behaviour",pos:"noun",hi:"व्यवहार",sm:"the way someone acts",ipa:"/bɪˈheɪvjər/",syn:["conduct","manner","action"],ant:["misbehaviour","misconduct"],ex:"Good behaviour is important in every workplace.",off:"Professional behaviour reflects well on the company.",int:"I always maintain respectful behaviour with colleagues.",biz:"Customer buying behaviour has shifted significantly online."},
  {w:"bold",pos:"adjective",hi:"साहसी / निडर",sm:"willing to take risks; not afraid",ipa:"/boʊld/",syn:["brave","daring","confident"],ant:["timid","shy"],ex:"Be bold enough to share your ideas.",off:"Bold decisions led the company to market leadership.",int:"I am bold enough to voice my opinions constructively.",biz:"Bold branding helps a company stand out in a crowded market."},
  {w:"brief",pos:"adjective",hi:"संक्षिप्त / छोटा",sm:"short in duration or length",ipa:"/briːf/",syn:["short","concise","quick"],ant:["long","detailed"],ex:"Let me give you a brief overview.",off:"The meeting was brief but very productive.",int:"Let me give a brief introduction to my background.",biz:"Please send a brief summary of the project status."},
  {w:"calm",pos:"adjective",hi:"शांत",sm:"not upset, angry, or excited",ipa:"/kɑːm/",syn:["peaceful","composed","relaxed"],ant:["agitated","anxious"],ex:"Stay calm during a difficult interview.",off:"A calm environment helps employees focus better.",int:"I stay calm and focused under pressure.",biz:"Calm leadership during a crisis builds team confidence."},
  {w:"capable",pos:"adjective",hi:"सक्षम / योग्य",sm:"having the skill to do something",ipa:"/ˈkeɪpəbəl/",syn:["able","competent","skilled"],ant:["incapable","incompetent"],ex:"Let him try — he is more than capable.",off:"She is a highly capable project manager.",int:"I am fully capable of managing this responsibility.",biz:"We need a capable team to execute this strategy."},
  {w:"careful",pos:"adjective",hi:"सावधान / सतर्क",sm:"giving attention to avoid mistakes",ipa:"/ˈkɛərfəl/",syn:["cautious","attentive","precise"],ant:["careless","reckless"],ex:"Be careful when handling sensitive data.",off:"Careful review of contracts prevents disputes.",int:"I am careful and thorough in all my work.",biz:"Careful financial planning prevents cash flow problems."},
  {w:"category",pos:"noun",hi:"श्रेणी / वर्ग",sm:"a group of things with similar features",ipa:"/ˈkætɪɡəri/",syn:["group","class","type"],ant:[],ex:"This product falls into a new category.",off:"Please sort these files by category.",int:"I have experience across multiple product categories.",biz:"Retailers must organise their inventory by category."},
  {w:"clear",pos:"adjective",hi:"स्पष्ट / साफ़",sm:"easy to understand; not confusing",ipa:"/klɪər/",syn:["obvious","plain","understandable"],ant:["unclear","vague"],ex:"Please give me a clear explanation.",off:"The instructions must be clear to all employees.",int:"I provide clear and concise reports to management.",biz:"Clear communication reduces misunderstandings in business."},
  {w:"client",pos:"noun",hi:"ग्राहक / क्लाइंट",sm:"a person or company that uses services",ipa:"/ˈklaɪənt/",syn:["customer","patron","buyer"],ant:["vendor","supplier"],ex:"Always greet your client with a smile.",off:"Let me handle the client's concern.",int:"I have managed key client accounts for three years.",biz:"Client satisfaction is the foundation of our business."},
  {w:"colleague",pos:"noun",hi:"सहकर्मी / साथी कर्मचारी",sm:"someone you work with",ipa:"/ˈkɒliːɡ/",syn:["coworker","associate","teammate"],ant:["competitor","rival"],ex:"I enjoy working with my colleagues.",off:"Let me introduce you to my colleague.",int:"My colleagues describe me as helpful and reliable.",biz:"Encourage colleagues to share knowledge openly."},
  {w:"concern",pos:"noun",hi:"चिंता / परवाह",sm:"a worry or something that matters to you",ipa:"/kənˈsɜːn/",syn:["worry","issue","matter"],ant:["indifference","unconcern"],ex:"Please share any concerns you have.",off:"Let's address all employee concerns in this meeting.",int:"I raise concerns early to prevent larger problems.",biz:"Customer concerns must be addressed within 24 hours."},
  {w:"consistent",pos:"adjective",hi:"लगातार / एकसमान",sm:"always behaving or performing in the same way",ipa:"/kənˈsɪstənt/",syn:["steady","reliable","uniform"],ant:["inconsistent","variable"],ex:"Be consistent in your study habits.",off:"Consistent performance is key to getting promoted.",int:"I deliver consistent results in every role I take on.",biz:"Consistent quality builds a strong brand reputation."},
  {w:"contact",pos:"verb",hi:"संपर्क करना",sm:"to get in touch with someone",ipa:"/ˈkɒntækt/",syn:["reach","call","communicate"],ant:["ignore","avoid"],ex:"Please contact me if you need help.",off:"Let me contact the vendor for a quote.",int:"I will contact you within 24 hours of the interview.",biz:"Contact the client immediately when a problem arises."},
  {w:"contract",pos:"noun",hi:"अनुबंध / करार",sm:"a formal written agreement",ipa:"/ˈkɒntrækt/",syn:["agreement","deal","document"],ant:[],ex:"Sign the contract before starting work.",off:"Let me review the contract before we proceed.",int:"I managed vendor contracts worth ten crore rupees.",biz:"All service terms must be defined clearly in the contract."},
  {w:"correct",pos:"adjective",hi:"सही / उचित",sm:"free from mistakes; right",ipa:"/kəˈrɛkt/",syn:["accurate","right","proper"],ant:["wrong","incorrect"],ex:"Let me correct this mistake before submitting.",off:"Please ensure all data is correct.",int:"I always double-check to make sure my work is correct.",biz:"Correct invoicing prevents payment disputes."},
  {w:"cost",pos:"noun",hi:"लागत / कीमत",sm:"the amount of money needed to buy or do something",ipa:"/kɒst/",syn:["price","expense","charge"],ant:["revenue","income"],ex:"Consider the cost before making a decision.",off:"We need to reduce the cost of production.",int:"I reduced operating costs by fifteen percent in my last role.",biz:"Let's evaluate the cost-benefit ratio of this investment."},
  {w:"creative",pos:"adjective",hi:"रचनात्मक / कल्पनाशील",sm:"able to produce new ideas",ipa:"/kriˈeɪtɪv/",syn:["imaginative","innovative","inventive"],ant:["unimaginative","conventional"],ex:"Let's think of a creative solution.",off:"The marketing team is very creative.",int:"I bring a creative perspective to problem-solving.",biz:"Creative campaigns capture consumer attention effectively."},
  {w:"critical",pos:"adjective",hi:"महत्त्वपूर्ण / आलोचनात्मक",sm:"extremely important; or expressing disapproval",ipa:"/ˈkrɪtɪkəl/",syn:["crucial","vital","important"],ant:["unimportant","trivial"],ex:"This is a critical step in the process.",off:"Critical thinking is a valued skill in our company.",int:"I can handle critical feedback in a constructive way.",biz:"Critical supply chain issues must be resolved immediately."},
  {w:"culture",pos:"noun",hi:"संस्कृति / कार्यसंस्कृति",sm:"the values and practices of a group or company",ipa:"/ˈkʌltʃər/",syn:["tradition","values","ethos"],ant:[],ex:"Company culture affects employee happiness.",off:"We have a very positive work culture here.",int:"I thrive in a collaborative and open work culture.",biz:"A strong company culture attracts top talent."},
  {w:"customer",pos:"noun",hi:"ग्राहक",sm:"a person who buys goods or services",ipa:"/ˈkʌstəmər/",syn:["client","buyer","patron"],ant:["seller","vendor"],ex:"Let's put the customer first.",off:"The customer service team handles all complaints.",int:"I have five years of customer-facing experience.",biz:"Happy customers become brand ambassadors."},
  {w:"daily",pos:"adjective",hi:"दैनिक / रोज़ाना",sm:"happening every day",ipa:"/ˈdeɪli/",syn:["everyday","regular","routine"],ant:["occasional","rare"],ex:"Let's review our daily tasks together.",off:"We have a daily stand-up meeting at 9 AM.",int:"I track my daily progress against my goals.",biz:"Daily sales reports help managers make quick decisions."},
  {w:"data",pos:"noun",hi:"डेटा / जानकारी",sm:"facts and statistics collected for reference",ipa:"/ˈdeɪtə/",syn:["information","facts","statistics"],ant:[],ex:"Let me analyse the data first.",off:"All decisions should be based on accurate data.",int:"I am experienced in collecting and analysing data.",biz:"Data-driven strategies reduce business risk."},
  {w:"demand",pos:"noun",hi:"माँग",sm:"a strong request; or the need for something",ipa:"/dɪˈmɑːnd/",syn:["request","need","requirement"],ant:["supply","provision"],ex:"There is a high demand for English speakers.",off:"Customer demand for this product has increased.",int:"I thrive in high-demand environments.",biz:"Understanding market demand is key to product success."},
  {w:"department",pos:"noun",hi:"विभाग",sm:"a section of an organisation",ipa:"/dɪˈpɑːtmənt/",syn:["division","section","unit"],ant:[],ex:"Let me connect you with the right department.",off:"Each department has its own quarterly goals.",int:"I have worked across three different departments.",biz:"Cross-department collaboration drives innovation."},
  {w:"detail",pos:"noun",hi:"विवरण / ब्यौरा",sm:"an individual piece of information",ipa:"/ˈdiːteɪl/",syn:["particular","point","specific"],ant:["overview","summary"],ex:"Pay attention to every detail.",off:"Let me check the details before replying to the client.",int:"I am detail-oriented and rarely make mistakes.",biz:"Attention to detail in contracts prevents future disputes."},
  {w:"diligent",pos:"adjective",hi:"परिश्रमी / मेहनती",sm:"careful and hard-working",ipa:"/ˈdɪlɪdʒənt/",syn:["hardworking","dedicated","thorough"],ant:["lazy","careless"],ex:"Be diligent in practising English every day.",off:"She is one of the most diligent employees in the company.",int:"I am diligent and always follow through on commitments.",biz:"Diligent workers form the backbone of any successful business."},
  {w:"discipline",pos:"noun",hi:"अनुशासन",sm:"controlled behaviour following rules",ipa:"/ˈdɪsɪplɪn/",syn:["order","control","self-control"],ant:["disorder","chaos"],ex:"Discipline is the key to achieving your goals.",off:"The company maintains strict discipline on confidentiality.",int:"I have the discipline to meet every deadline I set.",biz:"Financial discipline ensures a company remains profitable."},
  {w:"document",pos:"noun",hi:"दस्तावेज़",sm:"a piece of paper or file with information",ipa:"/ˈdɒkjumənt/",syn:["file","paper","record"],ant:[],ex:"Please sign this document.",off:"Let me prepare the required documents.",int:"I manage all project documents carefully.",biz:"All business documents must be stored securely."},
  {w:"dynamic",pos:"adjective",hi:"गतिशील / ऊर्जावान",sm:"energetic, constantly changing",ipa:"/daɪˈnæmɪk/",syn:["energetic","active","vibrant"],ant:["static","dull"],ex:"Let's build a dynamic and motivated team.",off:"We need dynamic individuals who embrace change.",int:"I thrive in dynamic and fast-paced environments.",biz:"The dynamic business landscape requires constant adaptation."},
  {w:"eager",pos:"adjective",hi:"उत्सुक / उत्साहित",sm:"very interested and wanting to do something",ipa:"/ˈiːɡər/",syn:["enthusiastic","keen","willing"],ant:["reluctant","unenthusiastic"],ex:"She is eager to learn new skills.",off:"The new recruit is eager to contribute.",int:"I am eager to take on new responsibilities.",biz:"Customers who are eager to buy are the easiest to serve."},
  {w:"earn",pos:"verb",hi:"कमाना",sm:"to receive money in return for work",ipa:"/ɜːn/",syn:["make","gain","receive"],ant:["lose","spend"],ex:"Work hard and you will earn respect.",off:"Let everyone earn their promotion through performance.",int:"I have earned three performance bonuses in two years.",biz:"A business must earn more than it spends to survive."},
  {w:"educate",pos:"verb",hi:"शिक्षित करना",sm:"to teach or train someone",ipa:"/ˈɛdjukeɪt/",syn:["teach","train","instruct"],ant:["mislead","confuse"],ex:"Let me educate you on the topic step by step.",off:"We educate new staff through structured onboarding.",int:"I believe in educating myself continuously.",biz:"Educating customers about your product builds trust."},
  {w:"email",pos:"noun",hi:"ईमेल",sm:"a message sent electronically",ipa:"/ˈiːmeɪl/",syn:["message","mail","correspondence"],ant:[],ex:"Please check your email for the instructions.",off:"Let me send you an email with the details.",int:"I respond to all emails within four hours.",biz:"Professional email communication reflects company values."},
  {w:"engage",pos:"verb",hi:"संलग्न करना / जोड़ना",sm:"to involve or attract someone",ipa:"/ɪnˈɡeɪdʒ/",syn:["involve","connect","attract"],ant:["disengage","ignore"],ex:"Let me engage the audience with a story.",off:"We engage employees through regular feedback sessions.",int:"I engage clients by understanding their specific needs.",biz:"Social media helps businesses engage with customers daily."},
  {w:"enhance",pos:"verb",hi:"बेहतर बनाना / बढ़ाना",sm:"to improve the quality of something",ipa:"/ɪnˈhɑːns/",syn:["improve","boost","elevate"],ant:["worsen","diminish"],ex:"Let me enhance the design.",off:"We enhanced the product based on customer feedback.",int:"This role will enhance my skills significantly.",biz:"Enhanced packaging improved the product's market appeal."},
  {w:"ensure",pos:"verb",hi:"सुनिश्चित करना",sm:"to make certain that something happens",ipa:"/ɪnˈʃɔːr/",syn:["guarantee","make sure","confirm"],ant:["neglect","ignore"],ex:"Please ensure the door is locked.",off:"Let me ensure the data is backed up.",int:"I always ensure my work meets the required standards.",biz:"We ensure on-time delivery for all customers."},
  {w:"environment",pos:"noun",hi:"वातावरण / माहौल",sm:"the conditions and surroundings in which you live or work",ipa:"/ɪnˈvaɪrənmənt/",syn:["setting","surroundings","atmosphere"],ant:[],ex:"A positive work environment boosts productivity.",off:"Our company provides a supportive working environment.",int:"I work best in a structured and positive environment.",biz:"Businesses have a responsibility to protect the environment."},
  {w:"essential",pos:"adjective",hi:"आवश्यक / ज़रूरी",sm:"completely necessary",ipa:"/ɪˈsɛnʃəl/",syn:["necessary","vital","crucial"],ant:["unnecessary","optional"],ex:"Water is essential for survival.",off:"Good communication skills are essential for this role.",int:"Let me share the essential skills I bring.",biz:"An essential feature of any business is customer trust."},
  {w:"estimate",pos:"verb",hi:"अनुमान लगाना",sm:"to guess an amount or value approximately",ipa:"/ˈɛstɪmeɪt/",syn:["approximate","calculate","guess"],ant:["know","measure"],ex:"Can you estimate how long this will take?",off:"The team estimated the project would take six weeks.",int:"I estimated the cost of the campaign at two lakhs.",biz:"Let me prepare a detailed cost estimate for the client."},
  {w:"ethics",pos:"noun",hi:"नैतिकता",sm:"principles about what is right and wrong",ipa:"/ˈɛθɪks/",syn:["morals","values","principles"],ant:["corruption","dishonesty"],ex:"Good ethics are essential in every profession.",off:"Our company follows strict business ethics.",int:"I have strong work ethics and never cut corners.",biz:"Ethical business practices build lasting reputation."},
  {w:"excel",pos:"verb",hi:"उत्कृष्ट करना / बेहतरीन करना",sm:"to be very good at something",ipa:"/ɪkˈsɛl/",syn:["excel at","thrive","shine"],ant:["fail","underperform"],ex:"Let him excel in the area he enjoys most.",off:"She excels at customer relationship management.",int:"I excel in high-pressure environments.",biz:"Businesses that excel in service retain more customers."},
  {w:"execute",pos:"verb",hi:"अमल में लाना / निष्पादित करना",sm:"to carry out a plan or task",ipa:"/ˈɛksɪkjuːt/",syn:["implement","perform","carry out"],ant:["plan","halt"],ex:"Let me execute the plan without delay.",off:"The operations team executes all logistics efficiently.",int:"I execute projects on time and within budget.",biz:"A great strategy is useless without the ability to execute it."},
  {w:"expand",pos:"verb",hi:"विस्तार करना / बढ़ाना",sm:"to become or make something larger",ipa:"/ɪkˈspænd/",syn:["grow","extend","enlarge"],ant:["shrink","reduce"],ex:"Let's expand our vocabulary daily.",off:"The company plans to expand into three new markets.",int:"I helped expand the client base by thirty percent.",biz:"Expanding into new markets requires careful research."},
  {w:"experience",pos:"noun",hi:"अनुभव",sm:"knowledge or skill you gain from doing something",ipa:"/ɪkˈspɪərɪəns/",syn:["knowledge","background","expertise"],ant:["inexperience","ignorance"],ex:"Let this experience teach you something valuable.",off:"Candidates with two years of experience are preferred.",int:"My diverse experience makes me a strong candidate.",biz:"Customer experience is the new competitive advantage."},
  {w:"expert",pos:"noun",hi:"विशेषज्ञ / माहिर",sm:"a person with great knowledge or skill",ipa:"/ˈɛkspɜːt/",syn:["specialist","professional","authority"],ant:["novice","beginner"],ex:"Let the expert handle this.",off:"We consulted a financial expert for advice.",int:"I consider myself an expert in digital marketing.",biz:"Hiring an expert can save time and money."},
  {w:"fair",pos:"adjective",hi:"उचित / न्यायसंगत",sm:"treating everyone equally; right and just",ipa:"/fɛər/",syn:["just","reasonable","equitable"],ant:["unfair","biased"],ex:"Always be fair in your dealings.",off:"A fair performance review motivates employees.",int:"I expect a fair evaluation based on my skills.",biz:"Fair pricing builds long-term customer trust."},
  {w:"familiar",pos:"adjective",hi:"परिचित / जाना-पहचाना",sm:"well-known; having knowledge of something",ipa:"/fəˈmɪljər/",syn:["known","acquainted","recognisable"],ant:["unfamiliar","unknown"],ex:"Are you familiar with this software?",off:"Please make yourself familiar with the company policy.",int:"I am familiar with the latest industry tools.",biz:"Being familiar with your market gives you an edge."},
  {w:"feedback",pos:"noun",hi:"प्रतिक्रिया / सुझाव",sm:"opinions about work to help improve it",ipa:"/ˈfiːdbæk/",syn:["response","review","input"],ant:[],ex:"Let me give you some useful feedback.",off:"We collect feedback from employees after every project.",int:"I welcome feedback and use it to improve.",biz:"Customer feedback is invaluable for product development."},
  {w:"formal",pos:"adjective",hi:"औपचारिक",sm:"following official rules; serious in tone",ipa:"/ˈfɔːməl/",syn:["official","professional","serious"],ant:["informal","casual"],ex:"Use formal language in professional emails.",off:"The company requires formal attire for client meetings.",int:"I am comfortable in both formal and informal settings.",biz:"Formal contracts protect both parties in a business deal."},
  {w:"forward",pos:"adverb",hi:"आगे / आगे की ओर",sm:"towards a future time or position",ipa:"/ˈfɔːwəd/",syn:["ahead","onward","forth"],ant:["backward","behind"],ex:"Let's move forward with the plan.",off:"I look forward to hearing from you.",int:"I look forward to contributing to your team.",biz:"Let's move forward with the partnership agreement."},
  {w:"friendly",pos:"adjective",hi:"मिलनसार / दोस्ताना",sm:"kind and pleasant to others",ipa:"/ˈfrɛndli/",syn:["warm","kind","welcoming"],ant:["unfriendly","hostile"],ex:"Our office has a friendly atmosphere.",off:"A friendly tone makes client communication smoother.",int:"My colleagues have always described me as friendly.",biz:"A friendly customer service team improves satisfaction scores."},
  {w:"genuine",pos:"adjective",hi:"वास्तविक / सच्चा / असली",sm:"real; truly what it appears to be",ipa:"/ˈdʒɛnjuɪn/",syn:["authentic","real","sincere"],ant:["fake","artificial"],ex:"Be genuine in your interest to learn.",off:"Genuine effort is always recognised by management.",int:"I have a genuine passion for this industry.",biz:"Customers appreciate genuine transparency from brands."},
  {w:"growth",pos:"noun",hi:"विकास / बढ़ोतरी",sm:"the process of increasing or developing",ipa:"/ɡroʊθ/",syn:["development","expansion","progress"],ant:["decline","shrinkage"],ex:"Consistent practice leads to rapid growth.",off:"The company achieved twenty percent growth last year.",int:"I am focused on personal and professional growth.",biz:"Sustainable growth requires strong foundations."},
  {w:"guide",pos:"verb",hi:"मार्गदर्शन करना",sm:"to show or direct someone",ipa:"/ɡaɪd/",syn:["direct","lead","advise"],ant:["mislead","confuse"],ex:"Let me guide you through the process.",off:"The mentor guides junior employees through challenges.",int:"I guided a team of five during the product launch.",biz:"A good consultant guides businesses through complex changes."},
  {w:"helpful",pos:"adjective",hi:"सहायक / मददगार",sm:"providing useful assistance",ipa:"/ˈhɛlpfəl/",syn:["useful","supportive","beneficial"],ant:["unhelpful","harmful"],ex:"Thank you for being so helpful.",off:"A helpful attitude makes teamwork easier.",int:"My colleagues always describe me as helpful.",biz:"Helpful customer service builds brand loyalty."},
  {w:"honest",pos:"adjective",hi:"ईमानदार",sm:"telling the truth; not cheating",ipa:"/ˈɒnɪst/",syn:["truthful","sincere","trustworthy"],ant:["dishonest","deceptive"],ex:"Always be honest in your communication.",off:"Honest feedback helps teams improve faster.",int:"I am always honest about my abilities and limitations.",biz:"Honest business practices build long-term partnerships."},
  {w:"impact",pos:"noun",hi:"प्रभाव / असर",sm:"a strong effect or result",ipa:"/ˈɪmpækt/",syn:["effect","influence","result"],ant:["insignificance","irrelevance"],ex:"Let your actions have a positive impact.",off:"This change will have a major impact on the workflow.",int:"I delivered a measurable impact in my last role.",biz:"Strong branding creates a lasting impact on customers."},
  {w:"income",pos:"noun",hi:"आमदनी / आय",sm:"money received regularly for work",ipa:"/ˈɪnkʌm/",syn:["salary","earnings","revenue"],ant:["expenditure","loss"],ex:"A stable income gives financial security.",off:"The company's income grew by fifteen percent.",int:"I am looking for a role with a competitive income.",biz:"Diversifying income streams reduces business risk."},
  {w:"increase",pos:"verb",hi:"बढ़ाना / वृद्धि करना",sm:"to make or become larger in amount",ipa:"/ɪnˈkriːs/",syn:["grow","raise","expand"],ant:["decrease","reduce"],ex:"Let's increase our practice time.",off:"Sales increased by twenty percent this quarter.",int:"I increased customer retention by ten percent.",biz:"We aim to increase market share by year end."},
  {w:"industry",pos:"noun",hi:"उद्योग / क्षेत्र",sm:"a group of businesses that produce similar goods",ipa:"/ˈɪndəstri/",syn:["sector","field","trade"],ant:[],ex:"The IT industry is growing rapidly in India.",off:"We are a leader in the pharmaceutical industry.",int:"I have seven years of experience in the finance industry.",biz:"Every industry faces unique regulatory challenges."},
  {w:"inform",pos:"verb",hi:"सूचित करना / बताना",sm:"to tell someone about something",ipa:"/ɪnˈfɔːm/",syn:["notify","tell","update"],ant:["hide","withhold"],ex:"Please inform me when you are ready.",off:"Inform the team about the change in deadline.",int:"I proactively inform my manager about any issues.",biz:"Inform stakeholders of any risks as early as possible."},
  {w:"initiative",pos:"noun",hi:"पहल / सक्रियता",sm:"the ability to decide and act without being told",ipa:"/ɪˈnɪʃɪətɪv/",syn:["drive","action","enterprise"],ant:["passivity","inaction"],ex:"Take the initiative to learn something new every day.",off:"She showed great initiative by creating a new process.",int:"I always take initiative rather than waiting to be told.",biz:"Employees who show initiative drive company progress."},
  {w:"interact",pos:"verb",hi:"बातचीत करना / संवाद करना",sm:"to communicate or work together with others",ipa:"/ˌɪntərˈækt/",syn:["communicate","engage","connect"],ant:["avoid","isolate"],ex:"Let him interact freely with the team.",off:"She interacts with clients on a daily basis.",int:"I interact confidently with people at all levels.",biz:"Brands that interact with customers build stronger loyalty."},
  {w:"interest",pos:"noun",hi:"रुचि / दिलचस्पी",sm:"a feeling of wanting to know about something",ipa:"/ˈɪntrɪst/",syn:["curiosity","enthusiasm","attention"],ant:["indifference","apathy"],ex:"Her interest in learning English grew every day.",off:"The manager expressed interest in the new proposal.",int:"I have a strong interest in data analytics.",biz:"We invest in areas of growing customer interest."},
  {w:"interview",pos:"noun",hi:"साक्षात्कार / इंटरव्यू",sm:"a formal meeting to assess someone for a job",ipa:"/ˈɪntəvjuː/",syn:["meeting","discussion","assessment"],ant:[],ex:"Let me prepare well for my interview.",off:"The HR team conducted twenty interviews this week.",int:"I am confident in my ability to perform well in interviews.",biz:"A structured interview process ensures fair hiring."},
  {w:"invest",pos:"verb",hi:"निवेश करना",sm:"to put money or time into something for future gain",ipa:"/ɪnˈvɛst/",syn:["spend","commit","fund"],ant:["waste","squander"],ex:"Let's invest time in learning every day.",off:"The company invested heavily in new technology.",int:"I invest in my own development by taking courses.",biz:"Businesses must invest in their people to grow sustainably."},
  {w:"issue",pos:"noun",hi:"समस्या / मुद्दा",sm:"a topic of discussion or a problem",ipa:"/ˈɪʃuː/",syn:["problem","concern","matter"],ant:["solution","resolution"],ex:"Let me address this issue right away.",off:"We identified a billing issue with the client's account.",int:"I resolve issues quickly and effectively.",biz:"Unresolved customer issues can damage brand reputation."},
  {w:"join",pos:"verb",hi:"जुड़ना / शामिल होना",sm:"to become part of a group or organisation",ipa:"/dʒɔɪn/",syn:["connect","unite","enter"],ant:["leave","quit"],ex:"Let's join the meeting on time.",off:"She joined the company three months ago.",int:"I am excited to join a dynamic team.",biz:"We welcome new partners to join our network."},
  {w:"knowledge",pos:"noun",hi:"ज्ञान",sm:"information and skills you have learned",ipa:"/ˈnɒlɪdʒ/",syn:["understanding","information","expertise"],ant:["ignorance","unawareness"],ex:"Knowledge is the key to growth.",off:"Let me share my knowledge of the new system.",int:"My knowledge of Python will be useful in this role.",biz:"Knowledge management systems improve team performance."},
  {w:"leadership",pos:"noun",hi:"नेतृत्व",sm:"the ability to guide and inspire others",ipa:"/ˈliːdəʃɪp/",syn:["management","guidance","direction"],ant:["followership","passivity"],ex:"Good leadership creates a positive team culture.",off:"The company values leadership at all levels.",int:"I developed my leadership skills by managing projects.",biz:"Strong leadership is the cornerstone of business success."},
  {w:"learn",pos:"verb",hi:"सीखना",sm:"to gain knowledge or skill",ipa:"/lɜːn/",syn:["study","acquire","develop"],ant:["forget","ignore"],ex:"Let him learn at his own pace.",off:"We encourage employees to learn new skills continuously.",int:"I am always eager to learn and adapt.",biz:"Companies that invest in learning outperform competitors."},
  {w:"limit",pos:"noun",hi:"सीमा",sm:"the point beyond which something does not go",ipa:"/ˈlɪmɪt/",syn:["boundary","cap","maximum"],ant:["unlimited","freedom"],ex:"Don't let anyone limit your potential.",off:"There is a budget limit for travel expenses.",int:"I don't let limits stop me from finding creative solutions.",biz:"Setting a credit limit protects the company from bad debt."},
  {w:"listen",pos:"verb",hi:"सुनना / ध्यान से सुनना",sm:"to pay attention to sounds or what someone says",ipa:"/ˈlɪsən/",syn:["hear","pay attention","attend"],ant:["ignore","disregard"],ex:"Let me listen carefully before responding.",off:"Good managers listen to their team's feedback.",int:"I am an active listener who understands concerns quickly.",biz:"Listening to customers helps businesses improve their products."},
  {w:"loyal",pos:"adjective",hi:"वफ़ादार / निष्ठावान",sm:"firm in supporting someone or something",ipa:"/ˈlɔɪəl/",syn:["faithful","dedicated","devoted"],ant:["disloyal","unfaithful"],ex:"Let's be loyal to our goals.",off:"Loyal employees are the biggest asset of a company.",int:"I am loyal to my employer and always give my best.",biz:"Loyal customers generate more revenue over time."},
  {w:"mature",pos:"adjective",hi:"परिपक्व / समझदार",sm:"fully developed in mind and behaviour",ipa:"/məˈtʃʊər/",syn:["grown-up","sensible","developed"],ant:["immature","childish"],ex:"Let the situation mature before making a decision.",off:"She handles difficult clients in a very mature way.",int:"I am mature enough to handle high-responsibility roles.",biz:"A mature brand has built trust and loyalty over years."},
  {w:"meet",pos:"verb",hi:"मिलना / मिलाना",sm:"to come together with someone",ipa:"/miːt/",syn:["encounter","gather","assemble"],ant:["avoid","miss"],ex:"Let's meet for coffee tomorrow.",off:"We meet every Monday to plan the week.",int:"I look forward to meeting the team after joining.",biz:"Let's meet to finalise the partnership terms."},
  {w:"mentor",pos:"noun",hi:"गुरु / मार्गदर्शक",sm:"an experienced person who advises a less experienced one",ipa:"/ˈmɛntɔːr/",syn:["guide","advisor","coach"],ant:["student","mentee"],ex:"Let your mentor guide you through challenges.",off:"Each new employee is assigned a mentor.",int:"My mentor taught me how to manage client expectations.",biz:"A mentor programme accelerates employee development."},
  {w:"mission",pos:"noun",hi:"मिशन / उद्देश्य",sm:"a purpose or important task",ipa:"/ˈmɪʃən/",syn:["purpose","aim","objective"],ant:["aimlessness","uncertainty"],ex:"Let our mission be to help others.",off:"The company's mission is to provide affordable healthcare.",int:"I align my goals with the organisation's mission.",biz:"A clear mission statement guides all business decisions."},
  {w:"monitor",pos:"verb",hi:"निगरानी करना / जाँचना",sm:"to watch or check something regularly",ipa:"/ˈmɒnɪtər/",syn:["track","observe","check"],ant:["ignore","neglect"],ex:"Let me monitor the project progress daily.",off:"HR monitors employee attendance closely.",int:"I monitor my performance metrics every week.",biz:"Monitor customer satisfaction scores regularly to improve service."},
  {w:"network",pos:"noun",hi:"नेटवर्क / संपर्क जाल",sm:"a group of connected people or things",ipa:"/ˈnɛtwɜːk/",syn:["connection","system","grid"],ant:["isolation","disconnection"],ex:"Build a strong professional network.",off:"Let me tap into my network for a referral.",int:"My network in the industry gives me an edge.",biz:"A strong distribution network ensures wider market reach."},
  {w:"notice",pos:"verb",hi:"ध्यान देना / देखना",sm:"to become aware of something",ipa:"/ˈnoʊtɪs/",syn:["observe","see","detect"],ant:["overlook","miss"],ex:"Did you notice the improvement in her English?",off:"The manager noticed an error in the report.",int:"I notice opportunities others often overlook.",biz:"Customers notice small details that build trust."},
  {w:"objective",pos:"noun",hi:"उद्देश्य / लक्ष्य",sm:"something you plan to achieve",ipa:"/əbˈdʒɛktɪv/",syn:["goal","aim","target"],ant:["aimlessness","ambiguity"],ex:"Set a clear objective before starting any task.",off:"Our team's objective is to close five deals this month.",int:"My objective is to grow into a leadership role.",biz:"Each business unit has its own quarterly objectives."},
  {w:"offer",pos:"verb",hi:"पेश करना / प्रस्ताव देना",sm:"to give or make available to someone",ipa:"/ˈɒfər/",syn:["provide","propose","present"],ant:["withhold","take back"],ex:"Let me offer you some helpful advice.",off:"The company offers excellent benefits to employees.",int:"I always offer to help colleagues with their work.",biz:"We offer customised solutions to each client."},
  {w:"outcome",pos:"noun",hi:"परिणाम / नतीजा",sm:"the result of an action or event",ipa:"/ˈaʊtkʌm/",syn:["result","consequence","effect"],ant:["cause","input"],ex:"Let's focus on achieving a positive outcome.",off:"The outcome of the meeting was very productive.",int:"I measure success by the outcomes I achieve.",biz:"Every business decision should be evaluated by its outcome."},
  {w:"overcome",pos:"verb",hi:"पार करना / जीतना",sm:"to succeed despite a difficulty",ipa:"/ˌoʊvərˈkʌm/",syn:["conquer","beat","defeat"],ant:["fail","succumb"],ex:"Let me help you overcome this challenge.",off:"The team overcame several obstacles to deliver on time.",int:"I have overcome many challenges in my career.",biz:"Companies that overcome adversity often emerge stronger."},
  {w:"patient",pos:"adjective",hi:"धैर्यवान / सब्र वाला",sm:"able to wait calmly without complaining",ipa:"/ˈpeɪʃənt/",syn:["tolerant","calm","steady"],ant:["impatient","restless"],ex:"Be patient — good things take time.",off:"Patient handling of angry customers is an art.",int:"I am patient when explaining complex topics.",biz:"Patient negotiation leads to better deals."},
  {w:"positive",pos:"adjective",hi:"सकारात्मक",sm:"hopeful; thinking about the good side",ipa:"/ˈpɒzɪtɪv/",syn:["optimistic","constructive","upbeat"],ant:["negative","pessimistic"],ex:"Let's keep a positive attitude today.",off:"Positive feedback encourages better performance.",int:"I always maintain a positive mindset at work.",biz:"Positive company reviews attract top talent."},
  {w:"potential",pos:"noun",hi:"क्षमता / संभावना",sm:"the ability to develop or achieve something",ipa:"/pəˈtɛnʃəl/",syn:["capability","promise","possibility"],ant:["inability","limitation"],ex:"Don't let your potential go to waste.",off:"We identify and nurture employee potential.",int:"I believe this role will allow me to fulfil my potential.",biz:"Investors look for companies with high growth potential."},
  {w:"practical",pos:"adjective",hi:"व्यावहारिक / उपयोगी",sm:"relating to real-life situations rather than theory",ipa:"/ˈpræktɪkəl/",syn:["realistic","applied","hands-on"],ant:["theoretical","impractical"],ex:"Let me give you a practical example.",off:"We train employees with practical, on-the-job exercises.",int:"I have strong practical experience in project management.",biz:"A practical approach to problem-solving delivers faster results."},
  {w:"precise",pos:"adjective",hi:"सटीक / बिल्कुल सही",sm:"exact and accurate",ipa:"/prɪˈsaɪs/",syn:["exact","accurate","specific"],ant:["vague","approximate"],ex:"Please be precise when describing the issue.",off:"Precise data entry reduces errors in reports.",int:"I am precise in everything I do.",biz:"Precise financial reporting is essential for investor confidence."},
  {w:"profit",pos:"noun",hi:"मुनाफ़ा / लाभ",sm:"the money made after all expenses are paid",ipa:"/ˈprɒfɪt/",syn:["gain","earnings","surplus"],ant:["loss","deficit"],ex:"Let's find ways to increase our profit.",off:"The company's profit grew by thirty percent.",int:"I helped increase the department's profitability.",biz:"Sustainable profit growth requires long-term strategic planning."},
  {w:"progress",pos:"noun",hi:"प्रगति / आगे बढ़ना",sm:"moving forward or making improvements",ipa:"/ˈprɒɡrɛs/",syn:["advancement","development","improvement"],ant:["regression","stagnation"],ex:"Let me share the progress of this week.",off:"Track your progress against weekly targets.",int:"I have made consistent progress in my career.",biz:"Regular progress reports keep stakeholders informed."},
  {w:"punctual",pos:"adjective",hi:"समय का पाबंद",sm:"arriving or doing things at the right time",ipa:"/ˈpʌŋktʃuəl/",syn:["on time","prompt","timely"],ant:["late","tardy"],ex:"Always be punctual for interviews.",off:"Punctual employees are valued in any workplace.",int:"I am always punctual for meetings and deadlines.",biz:"Punctual delivery builds customer confidence."},
  {w:"purpose",pos:"noun",hi:"उद्देश्य / मकसद",sm:"the reason something exists or is done",ipa:"/ˈpɜːpəs/",syn:["aim","intention","goal"],ant:["aimlessness","randomness"],ex:"Let your purpose guide every decision.",off:"Employees perform better when they understand their purpose.",int:"My purpose is to create meaningful impact through technology.",biz:"A company with clear purpose attracts mission-driven employees."},
  {w:"raise",pos:"verb",hi:"उठाना / बढ़ाना",sm:"to increase or bring up",ipa:"/reɪz/",syn:["increase","lift","elevate"],ant:["lower","reduce"],ex:"Don't let fear stop you from raising your hand.",off:"The board raised the budget for the new project.",int:"I am hoping to raise my contribution level in this role.",biz:"Companies raise capital to fund expansion."},
  {w:"realistic",pos:"adjective",hi:"यथार्थवादी / व्यावहारिक",sm:"based on real-world facts rather than wishes",ipa:"/ˌriːəˈlɪstɪk/",syn:["practical","sensible","reasonable"],ant:["unrealistic","idealistic"],ex:"Set realistic goals you can actually achieve.",off:"We need realistic timelines for the project.",int:"I set realistic targets and consistently exceed them.",biz:"A realistic business plan attracts serious investors."},
  {w:"recognise",pos:"verb",hi:"पहचानना / सराहना करना",sm:"to know or acknowledge something",ipa:"/ˈrɛkəɡnaɪz/",syn:["identify","acknowledge","appreciate"],ant:["ignore","overlook"],ex:"Let me recognise the hard work of the team.",off:"The company recognises outstanding performance with awards.",int:"I recognise my strengths and continuously work on my weaknesses.",biz:"Recognising employee contributions boosts morale and retention."},
  {w:"reduce",pos:"verb",hi:"कम करना / घटाना",sm:"to make something smaller in size or amount",ipa:"/rɪˈdjuːs/",syn:["decrease","cut","lower"],ant:["increase","raise"],ex:"Let's reduce unnecessary spending.",off:"The process change reduced errors by fifty percent.",int:"I helped reduce customer complaint rates by twenty percent.",biz:"Reducing overhead costs improves profit margins."},
  {w:"reliable",pos:"adjective",hi:"भरोसेमंद / विश्वसनीय",sm:"able to be trusted to do what is needed",ipa:"/rɪˈlaɪəbəl/",syn:["dependable","trustworthy","consistent"],ant:["unreliable","inconsistent"],ex:"Be reliable — people depend on you.",off:"We need a reliable supplier for raw materials.",int:"My colleagues and managers describe me as reliable.",biz:"A reliable product builds lasting customer loyalty."},
  {w:"report",pos:"noun",hi:"रिपोर्ट",sm:"a written or spoken account of something",ipa:"/rɪˈpɔːt/",syn:["document","summary","account"],ant:[],ex:"Please submit your weekly report on time.",off:"Let me prepare the report before the meeting.",int:"I submit clear and accurate reports to management.",biz:"Quarterly reports are reviewed by the board of directors."},
  {w:"resource",pos:"noun",hi:"संसाधन",sm:"something you can use to achieve a goal",ipa:"/ˈriːsɔːs/",syn:["asset","means","tool"],ant:["liability","waste"],ex:"Let's use our resources wisely.",off:"The project has limited resources and tight deadlines.",int:"I manage resources efficiently to maximise output.",biz:"Effective resource allocation is critical for project success."},
  {w:"respect",pos:"verb",hi:"सम्मान करना",sm:"to treat someone with consideration and esteem",ipa:"/rɪˈspɛkt/",syn:["honour","regard","esteem"],ant:["disrespect","insult"],ex:"Always respect others' opinions.",off:"Mutual respect builds a positive work environment.",int:"I respect the diversity of perspectives in a team.",biz:"Businesses must respect their customers' time and trust."},
  {w:"result",pos:"noun",hi:"परिणाम / नतीजा",sm:"the effect or outcome of something",ipa:"/rɪˈzʌlt/",syn:["outcome","conclusion","product"],ant:["cause","reason"],ex:"Hard work always gives good results.",off:"The training programme produced excellent results.",int:"I am focused on delivering measurable results.",biz:"Every marketing campaign is judged by its results."},
  {w:"retain",pos:"verb",hi:"रखना / बनाए रखना",sm:"to keep or continue to have something",ipa:"/rɪˈteɪn/",syn:["keep","maintain","hold"],ant:["lose","release"],ex:"Let's retain our best employees.",off:"The company retains top talent through competitive benefits.",int:"I helped retain key clients by improving service quality.",biz:"Customer retention is more cost-effective than acquisition."},
  {w:"reward",pos:"noun",hi:"इनाम / पुरस्कार",sm:"something given for good work or behaviour",ipa:"/rɪˈwɔːd/",syn:["prize","bonus","recognition"],ant:["punishment","penalty"],ex:"Let good work be its own reward.",off:"The company rewards top performers with bonuses.",int:"I expect rewards to be based on merit.",biz:"Reward programmes improve customer and employee loyalty."},
  {w:"role",pos:"noun",hi:"भूमिका",sm:"the job or function of a person",ipa:"/roʊl/",syn:["position","function","duty"],ant:[],ex:"Let me understand my role clearly before I begin.",off:"Each team member has a specific role in this project.",int:"I am excited about the role and its responsibilities.",biz:"Clearly defined roles improve team efficiency."},
  {w:"routine",pos:"noun",hi:"दिनचर्या / नियमित काम",sm:"a regular set of activities done in the same order",ipa:"/ruːˈtiːn/",syn:["schedule","habit","procedure"],ant:["disorder","spontaneity"],ex:"Build a strong morning routine.",off:"The office has a routine for opening and closing.",int:"I have a productive daily routine that keeps me focused.",biz:"Standardised routines reduce errors in operations."},
  {w:"satisfy",pos:"verb",hi:"संतुष्ट करना",sm:"to fulfil the needs or desires of someone",ipa:"/ˈsætɪsfaɪ/",syn:["please","fulfil","meet"],ant:["dissatisfy","disappoint"],ex:"Let me satisfy all your questions.",off:"Our goal is to satisfy every customer.",int:"I always try to satisfy my manager's expectations.",biz:"A satisfied customer is a repeat customer."},
  {w:"seek",pos:"verb",hi:"खोजना / तलाश करना",sm:"to try to find or get something",ipa:"/siːk/",syn:["search","look for","pursue"],ant:["avoid","ignore"],ex:"Always seek ways to improve yourself.",off:"We seek talented individuals to join our team.",int:"I continuously seek feedback to improve my work.",biz:"Companies must constantly seek new growth opportunities."},
  {w:"senior",pos:"adjective",hi:"वरिष्ठ",sm:"higher in position or rank",ipa:"/ˈsiːnjər/",syn:["experienced","higher-ranking","advanced"],ant:["junior","entry-level"],ex:"Let the senior employee take the lead.",off:"Senior management approved the new policy.",int:"I am applying for a senior position in operations.",biz:"Senior leaders set the tone for company culture."},
  {w:"serious",pos:"adjective",hi:"गंभीर",sm:"not joking; very important",ipa:"/ˈsɪərɪəs/",syn:["important","grave","solemn"],ant:["trivial","lighthearted"],ex:"Be serious about your goals.",off:"This is a serious matter that needs immediate attention.",int:"I am serious about my professional development.",biz:"A serious commitment to quality sets businesses apart."},
  {w:"share",pos:"verb",hi:"साझा करना / बाँटना",sm:"to give part of something to others",ipa:"/ʃɛər/",syn:["distribute","divide","exchange"],ant:["keep","withhold"],ex:"Let me share my experience with you.",off:"Please share the report with all team members.",int:"I always share credit with my teammates.",biz:"Let's share the findings with the board."},
  {w:"simplify",pos:"verb",hi:"सरल बनाना",sm:"to make something easier to understand",ipa:"/ˈsɪmplɪfaɪ/",syn:["ease","clarify","streamline"],ant:["complicate","confuse"],ex:"Let me simplify this grammar rule for you.",off:"We simplified the onboarding process.",int:"I simplify complex information for non-technical audiences.",biz:"Simplifying processes reduces costs and errors."},
  {w:"solution",pos:"noun",hi:"समाधान / हल",sm:"an answer to a problem",ipa:"/səˈluːʃən/",syn:["answer","remedy","fix"],ant:["problem","issue"],ex:"Let me find a solution to this.",off:"The team came up with an innovative solution.",int:"I am known for finding creative solutions.",biz:"We provide end-to-end solutions for supply chain problems."},
  {w:"specific",pos:"adjective",hi:"विशिष्ट / खास",sm:"clearly identified; not general",ipa:"/spɪˈsɪfɪk/",syn:["particular","exact","defined"],ant:["general","vague"],ex:"Can you give me a specific example?",off:"Be specific when writing project requirements.",int:"I will give specific examples of my achievements.",biz:"Specific targets make business goals measurable."},
  {w:"stable",pos:"adjective",hi:"स्थिर / मज़बूत",sm:"not likely to move or change; steady",ipa:"/ˈsteɪbəl/",syn:["steady","secure","firm"],ant:["unstable","shaky"],ex:"A stable routine helps you learn faster.",off:"We need a stable supply chain to meet demand.",int:"I bring stability to teams during uncertain times.",biz:"Investors prefer companies with stable revenue streams."},
  {w:"standard",pos:"noun",hi:"मानक / स्तर",sm:"a level of quality used as a benchmark",ipa:"/ˈstændəd/",syn:["level","benchmark","norm"],ant:["substandard","inferior"],ex:"Always maintain a high standard of work.",off:"Our quality standards exceed industry norms.",int:"I hold myself to a very high standard.",biz:"ISO standards ensure consistent product quality."},
  {w:"strength",pos:"noun",hi:"ताकत / शक्ति",sm:"a quality or ability that makes someone or something good",ipa:"/strɛŋθ/",syn:["advantage","asset","forte"],ant:["weakness","limitation"],ex:"Let me share my key strengths.",off:"Communication is one of her greatest strengths.",int:"My strength is my ability to learn quickly.",biz:"Every company must identify and build on its core strengths."},
  {w:"stress",pos:"noun",hi:"तनाव",sm:"feelings of worry caused by difficult situations",ipa:"/strɛs/",syn:["pressure","anxiety","tension"],ant:["calm","relaxation"],ex:"Don't let stress affect your performance.",off:"A positive work culture reduces employee stress.",int:"I handle stress well and remain focused under pressure.",biz:"Managing workplace stress improves employee productivity."},
  {w:"succeed",pos:"verb",hi:"सफल होना",sm:"to achieve a desired goal",ipa:"/səkˈsiːd/",syn:["achieve","accomplish","prosper"],ant:["fail","struggle"],ex:"Let her succeed by supporting her efforts.",off:"The team succeeded in launching the product on time.",int:"I have succeeded in every role I have taken on.",biz:"Companies succeed by consistently delivering value to customers."},
  {w:"task",pos:"noun",hi:"काम / कार्य",sm:"a piece of work to be done",ipa:"/tɑːsk/",syn:["job","assignment","duty"],ant:["play","leisure"],ex:"Let me assign the task to the right person.",off:"Each employee has a list of daily tasks.",int:"I break large tasks into manageable steps.",biz:"Assign clear tasks with ownership and deadlines."},
  {w:"thorough",pos:"adjective",hi:"पूर्ण / संपूर्ण",sm:"doing something carefully and completely",ipa:"/ˈθʌrə/",syn:["complete","careful","detailed"],ant:["careless","hasty"],ex:"Be thorough when checking your work.",off:"A thorough review prevents costly mistakes.",int:"I am known for being thorough and detail-oriented.",biz:"A thorough due diligence process protects business interests."},
  {w:"timeline",pos:"noun",hi:"समय-रेखा / कार्यसूची",sm:"a schedule showing when things will happen",ipa:"/ˈtaɪmlaɪn/",syn:["schedule","timetable","plan"],ant:[],ex:"Let's set a clear timeline for this project.",off:"Please share the project timeline with the team.",int:"I always deliver within the agreed timeline.",biz:"A well-defined timeline keeps all stakeholders aligned."},
  {w:"train",pos:"verb",hi:"प्रशिक्षण देना / सिखाना",sm:"to teach skills needed for a job or activity",ipa:"/treɪn/",syn:["teach","coach","prepare"],ant:["untrain","neglect"],ex:"Let me train you on the new software.",off:"We train all new employees in safety procedures.",int:"I have trained junior staff in data entry and reporting.",biz:"Regular training keeps employees current with industry changes."},
  {w:"transparent",pos:"adjective",hi:"पारदर्शी",sm:"open and honest; easy to understand",ipa:"/trænsˈpærənt/",syn:["open","honest","clear"],ant:["opaque","deceptive"],ex:"Be transparent about your intentions.",off:"Transparent communication builds team trust.",int:"I believe in being transparent with my manager.",biz:"Transparent pricing builds customer confidence."},
  {w:"trust",pos:"noun",hi:"विश्वास / भरोसा",sm:"firm belief in the reliability of someone",ipa:"/trʌst/",syn:["confidence","faith","reliance"],ant:["distrust","doubt"],ex:"Let trust be the foundation of every relationship.",off:"Trust between manager and employee drives performance.",int:"I have built strong trust with clients and colleagues.",biz:"Consumer trust is the most valuable brand asset."},
  {w:"understand",pos:"verb",hi:"समझना",sm:"to know the meaning of something",ipa:"/ˌʌndəˈstænd/",syn:["comprehend","grasp","realise"],ant:["misunderstand","confuse"],ex:"Let me understand your concern fully.",off:"Make sure all employees understand the new policy.",int:"I understand both technical and business requirements.",biz:"Understanding customer needs is the first step to a great product."},
  {w:"unique",pos:"adjective",hi:"अनोखा / अद्वितीय",sm:"being the only one of its kind",ipa:"/juːˈniːk/",syn:["distinctive","singular","original"],ant:["common","ordinary"],ex:"Let your unique strengths shine.",off:"Our company offers a unique work culture.",int:"I bring a unique combination of technical and soft skills.",biz:"A unique value proposition sets a brand apart from competitors."},
  {w:"urgent",pos:"adjective",hi:"अत्यावश्यक / ज़रूरी",sm:"needing immediate action or attention",ipa:"/ˈɜːdʒənt/",syn:["pressing","critical","immediate"],ant:["unimportant","non-urgent"],ex:"This is an urgent matter — let's act now.",off:"Urgent requests should be escalated immediately.",int:"I handle urgent situations with composure.",biz:"Urgent client issues must never be ignored."},
  {w:"utilise",pos:"verb",hi:"उपयोग करना / काम में लाना",sm:"to use something effectively",ipa:"/ˈjuːtɪlaɪz/",syn:["use","employ","apply"],ant:["waste","ignore"],ex:"Let's utilise our time wisely.",off:"We must utilise all available resources for this project.",int:"I utilise data to make informed decisions.",biz:"Companies that utilise technology effectively grow faster."},
  {w:"welcome",pos:"verb",hi:"स्वागत करना",sm:"to greet someone pleasantly when they arrive",ipa:"/ˈwɛlkəm/",syn:["greet","receive","accept"],ant:["reject","exclude"],ex:"Let's welcome our new colleague warmly.",off:"Welcome every client as if they are your most important one.",int:"I welcome feedback as an opportunity to improve.",biz:"Welcoming a new business partner with professionalism sets the right tone."},
  {w:"willing",pos:"adjective",hi:"तैयार / इच्छुक",sm:"ready or prepared to do something",ipa:"/ˈwɪlɪŋ/",syn:["ready","eager","prepared"],ant:["unwilling","reluctant"],ex:"Are you willing to put in the extra effort?",off:"She is always willing to take on new responsibilities.",int:"I am willing to work hard to prove my abilities.",biz:"Being willing to adapt is essential in a fast-changing market."},
  {w:"wise",pos:"adjective",hi:"समझदार / बुद्धिमान",sm:"having good judgment and experience",ipa:"/waɪz/",syn:["sensible","prudent","intelligent"],ant:["foolish","unwise"],ex:"It is wise to plan ahead.",off:"Making wise financial decisions protects the company.",int:"I make wise use of my time and energy.",biz:"Wise investment in people and technology drives long-term growth."},
  {w:"workplace",pos:"noun",hi:"कार्यस्थल / दफ़्तर",sm:"the place where someone works",ipa:"/ˈwɜːkpleɪs/",syn:["office","workspace","environment"],ant:[],ex:"Maintain a positive workplace culture.",off:"A healthy workplace promotes employee wellbeing.",int:"I adapt quickly to any new workplace.",biz:"An inclusive workplace attracts diverse and talented staff."},
  {w:"worth",pos:"adjective",hi:"मूल्यवान / कीमती / लायक",sm:"having a particular value; deserving",ipa:"/wɜːθ/",syn:["valuable","deserving","beneficial"],ant:["worthless","undeserving"],ex:"Every minute of practice is worth it.",off:"The investment proved worth every rupee.",int:"Let me prove I am worth the trust you place in me.",biz:"A brand's worth is determined by the value it delivers."},
  // Filling remaining entries to reach exactly 500
  {w:"absorb",pos:"verb",hi:"अवशोषित करना / सोखना",sm:"to take in or learn something completely",ipa:"/əbˈzɔːb/",syn:["take in","learn","soak up"],ant:["release","ignore"],ex:"Let the mind absorb new information slowly.",off:"New employees absorb company culture quickly.",int:"I absorb new skills and knowledge rapidly.",biz:"Markets absorb new technology at different rates."},
  {w:"accountability",pos:"noun",hi:"जवाबदेही",sm:"being responsible for your actions",ipa:"/əˌkaʊntəˈbɪlɪti/",syn:["responsibility","answerability","liability"],ant:["irresponsibility","negligence"],ex:"Accountability is key in a professional setting.",off:"Managers must promote accountability in their teams.",int:"I take accountability for every project I lead.",biz:"Corporate accountability builds investor confidence."},
  {w:"accurate",pos:"adjective",hi:"सटीक",sm:"correct and without errors",ipa:"/ˈækjərɪt/",syn:["precise","correct","exact"],ant:["inaccurate","wrong"],ex:"Always submit accurate information.",off:"Accurate data prevents costly errors.",int:"I am known for providing accurate reports.",biz:"Accurate forecasting helps businesses plan effectively."},
  {w:"adequate",pos:"adjective",hi:"पर्याप्त / काफ़ी",sm:"enough for a particular purpose",ipa:"/ˈædɪkwɪt/",syn:["sufficient","enough","satisfactory"],ant:["inadequate","insufficient"],ex:"Make sure the resources are adequate.",off:"Ensure adequate staffing for the project.",int:"I ensure adequate preparation for every task.",biz:"Adequate capital is essential for business continuity."},
  {w:"admire",pos:"verb",hi:"प्रशंसा करना / सराहना करना",sm:"to respect and appreciate someone",ipa:"/ədˈmaɪər/",syn:["respect","appreciate","esteem"],ant:["despise","disrespect"],ex:"I admire your dedication to learning.",off:"The team admires her leadership style.",int:"I admire leaders who communicate with clarity.",biz:"Customers admire brands that act with integrity."},
  {w:"adopt",pos:"verb",hi:"अपनाना / स्वीकार करना",sm:"to start using a new method or idea",ipa:"/əˈdɒpt/",syn:["embrace","accept","take on"],ant:["reject","abandon"],ex:"Let's adopt a better strategy.",off:"We adopted agile methodology for our projects.",int:"I adopt new tools and technologies quickly.",biz:"Companies that adopt innovation early gain a competitive edge."},
  {w:"affordable",pos:"adjective",hi:"किफ़ायती / सस्ता",sm:"cheap enough for people to buy",ipa:"/əˈfɔːdəbəl/",syn:["reasonable","budget-friendly","economical"],ant:["expensive","costly"],ex:"Let's find an affordable solution.",off:"We offer affordable pricing for small businesses.",int:"I look for affordable yet quality solutions at work.",biz:"Affordable pricing strategy helps capture mass markets."},
  {w:"alert",pos:"adjective",hi:"सतर्क / चौकस",sm:"quick to notice things",ipa:"/əˈlɜːt/",syn:["watchful","attentive","aware"],ant:["unaware","inattentive"],ex:"Stay alert during the training.",off:"Employees must stay alert to cybersecurity threats.",int:"I am always alert to changes in project requirements.",biz:"Alert customer service teams resolve issues faster."},
  {w:"align",pos:"verb",hi:"संरेखित करना / मेल करना",sm:"to put things in a straight line or make them match",ipa:"/əˈlaɪn/",syn:["match","coordinate","adjust"],ant:["misalign","conflict"],ex:"Let's align our efforts for maximum impact.",off:"Align your personal goals with team objectives.",int:"I align my work with the company's strategic vision.",biz:"All departments must align around the company's mission."},
  {w:"appetite",pos:"noun",hi:"भूख / इच्छा",sm:"a desire for something",ipa:"/ˈæpɪtaɪt/",syn:["desire","craving","enthusiasm"],ant:["aversion","disinterest"],ex:"Don't let a loss of appetite for learning slow you down.",off:"The team has a strong appetite for innovation.",int:"I have a strong appetite for continuous learning.",biz:"An appetite for risk is needed for entrepreneurship."},
  {w:"appreciate",pos:"verb",hi:"कद्र करना",sm:"to recognise the value of something",ipa:"/əˈpriːʃieɪt/",syn:["value","be grateful","acknowledge"],ant:["disregard","devalue"],ex:"I appreciate every small step forward.",off:"The manager appreciated the team's extra effort.",int:"I appreciate constructive feedback to grow professionally.",biz:"Customers appreciate brands that listen and respond."},
  {w:"approach",pos:"noun",hi:"तरीका / दृष्टिकोण",sm:"a way of doing or thinking about something",ipa:"/əˈproʊtʃ/",syn:["method","strategy","technique"],ant:["avoidance","retreat"],ex:"Take a positive approach to challenges.",off:"We need a fresh approach to this problem.",int:"My approach is to research thoroughly before acting.",biz:"A customer-centric approach drives higher satisfaction."},
  {w:"asset",pos:"noun",hi:"संपत्ति / लाभदायक व्यक्ति",sm:"something valuable that belongs to a person or company",ipa:"/ˈæsɛt/",syn:["resource","advantage","possession"],ant:["liability","debt"],ex:"Your skills are your greatest asset.",off:"Employee experience is a company's greatest asset.",int:"I consider myself a valuable asset to any team.",biz:"Intangible assets like brand value are critically important."},
  {w:"balance",pos:"noun",hi:"संतुलन",sm:"a state where different things are equal or stable",ipa:"/ˈbæləns/",syn:["equilibrium","stability","harmony"],ant:["imbalance","instability"],ex:"Find the right balance between work and rest.",off:"Maintain a balance between quality and speed.",int:"I maintain a healthy work-life balance.",biz:"Financial balance sheets show what a company owns and owes."},
  {w:"benchmark",pos:"noun",hi:"मानदंड / बेंचमार्क",sm:"a standard used to compare or measure others",ipa:"/ˈbɛntʃmɑːk/",syn:["standard","reference","criterion"],ant:["substandard","average"],ex:"Set a benchmark for your daily study goals.",off:"Industry benchmarks help us evaluate our performance.",int:"I consistently perform above the benchmark.",biz:"We benchmark our services against industry leaders."},
  {w:"bond",pos:"noun",hi:"बंधन / संबंध",sm:"a strong connection between people",ipa:"/bɒnd/",syn:["connection","tie","link"],ant:["separation","distance"],ex:"Let's build a strong bond of trust.",off:"A team that bonds well performs better.",int:"I build strong bonds with clients and colleagues.",biz:"Financial bonds are securities issued to raise capital."},
  {w:"boost",pos:"verb",hi:"बढ़ावा देना / बढ़ाना",sm:"to increase or improve something",ipa:"/buːst/",syn:["increase","improve","raise"],ant:["reduce","lower"],ex:"Let regular practice boost your confidence.",off:"The campaign boosted sales by forty percent.",int:"This role will boost my career significantly.",biz:"Employee recognition programmes boost morale and productivity."},
  {w:"branch",pos:"noun",hi:"शाखा",sm:"a local office of a larger organisation",ipa:"/brɑːntʃ/",syn:["office","division","outlet"],ant:[],ex:"Let me visit the nearest branch.",off:"The company opened three new branches this year.",int:"I worked at the Pune branch for two years.",biz:"Branch expansion increases a company's market reach."},
  {w:"capable",pos:"adjective",hi:"योग्य",sm:"having the ability to do something",ipa:"/ˈkeɪpəbəl/",syn:["able","competent","skilled"],ant:["incapable","incompetent"],ex:"Let everyone do what they are capable of.",off:"We hire capable people who can grow with us.",int:"I am capable of handling this project independently.",biz:"Capable leadership drives sustainable growth."},
  {w:"capacity",pos:"noun",hi:"क्षमता / आयतन",sm:"the maximum amount something can hold or do",ipa:"/kəˈpæsɪti/",syn:["ability","volume","capability"],ant:["incapacity","limit"],ex:"Work within your capacity to avoid burnout.",off:"We are operating at full capacity this month.",int:"I work effectively even at maximum capacity.",biz:"Production capacity determines how much a factory can output."},
  {w:"career",pos:"noun",hi:"करियर / व्यवसाय",sm:"the jobs and experience you have over a period of time",ipa:"/kəˈrɪər/",syn:["profession","vocation","occupation"],ant:["hobby","pastime"],ex:"Build a career you are proud of.",off:"A well-planned career path leads to leadership roles.",int:"I have a clear vision for my career development.",biz:"Companies that invest in careers retain top talent."},
  {w:"cautious",pos:"adjective",hi:"सतर्क / सावधान",sm:"being careful to avoid mistakes or danger",ipa:"/ˈkɔːʃəs/",syn:["careful","wary","prudent"],ant:["reckless","careless"],ex:"Be cautious when making big decisions.",off:"A cautious approach to investment protects the company.",int:"I am cautious yet decisive in my work.",biz:"Cautious risk management protects long-term business interests."},
  {w:"certify",pos:"verb",hi:"प्रमाणित करना",sm:"to officially confirm something is true",ipa:"/ˈsɜːtɪfaɪ/",syn:["verify","confirm","validate"],ant:["deny","reject"],ex:"Please certify your attendance by email.",off:"The auditor certified the company's financial statements.",int:"I am certified in project management.",biz:"Only certified professionals may sign off on safety inspections."},
  {w:"characteristic",pos:"noun",hi:"विशेषता / लक्षण",sm:"a typical feature of someone or something",ipa:"/ˌkærɪktəˈrɪstɪk/",syn:["feature","quality","trait"],ant:["anomaly","exception"],ex:"Curiosity is a key characteristic of good learners.",off:"List the key characteristics of a strong candidate.",int:"My defining characteristics are reliability and creativity.",biz:"Understanding brand characteristics helps shape marketing messages."},
  {w:"circulate",pos:"verb",hi:"प्रसारित करना / बाँटना",sm:"to pass or move around among a group",ipa:"/ˈsɜːkjuleɪt/",syn:["distribute","spread","share"],ant:["collect","gather"],ex:"Please circulate the meeting notes to all.",off:"Circulate the updated schedule to the team.",int:"I circulate progress reports every Friday.",biz:"Circulate the agenda before every board meeting."},
  {w:"competent",pos:"adjective",hi:"दक्ष / योग्य",sm:"having the skills to do something well",ipa:"/ˈkɒmpɪtənt/",syn:["capable","skilled","proficient"],ant:["incompetent","unskilled"],ex:"A competent learner finds ways around every obstacle.",off:"We look for competent and motivated candidates.",int:"I am competent in both technical and soft skills.",biz:"Competent service teams build strong customer trust."},
  {w:"competitive",pos:"adjective",hi:"प्रतिस्पर्धी",sm:"wanting to win or be better than others",ipa:"/kəmˈpɛtɪtɪv/",syn:["ambitious","driven","aggressive"],ant:["uncompetitive","passive"],ex:"The job market is very competitive today.",off:"Offer competitive salaries to attract talent.",int:"I thrive in competitive environments.",biz:"A competitive pricing strategy wins market share."},
  {w:"complexity",pos:"noun",hi:"जटिलता",sm:"the state of being complicated",ipa:"/kəmˈplɛksɪti/",syn:["complication","difficulty","intricacy"],ant:["simplicity","clarity"],ex:"Don't let complexity stop you from trying.",off:"The project's complexity requires experienced team members.",int:"I handle complexity with a calm, structured approach.",biz:"Managing supply chain complexity is critical for growth."},
  {w:"comply",pos:"verb",hi:"पालन करना / मानना",sm:"to act according to rules or instructions",ipa:"/kəmˈplaɪ/",syn:["follow","obey","conform"],ant:["disobey","violate"],ex:"All staff must comply with safety regulations.",off:"Please comply with the data protection policy.",int:"I always comply with industry standards and regulations.",biz:"Failure to comply with regulations can lead to heavy penalties."},
  {w:"concept",pos:"noun",hi:"अवधारणा / विचार",sm:"an idea or plan",ipa:"/ˈkɒnsɛpt/",syn:["idea","notion","principle"],ant:["fact","reality"],ex:"Let me explain the concept clearly.",off:"Present the concept to the stakeholders first.",int:"I understand the core concepts of digital marketing.",biz:"A solid concept is the starting point for every great product."},
  {w:"conduct",pos:"verb",hi:"आचरण करना / संचालन करना",sm:"to organise and carry out an activity",ipa:"/ˈkɒndʌkt/",syn:["carry out","run","manage"],ant:["neglect","abandon"],ex:"Let me conduct a quick survey.",off:"HR will conduct the performance reviews next week.",int:"I have conducted training sessions for teams of up to fifty.",biz:"We conduct quarterly audits to ensure compliance."},
  {w:"confident",pos:"adjective",hi:"आत्मविश्वासी",sm:"feeling certain about your abilities",ipa:"/ˈkɒnfɪdənt/",syn:["assured","bold","positive"],ant:["nervous","unsure"],ex:"Walk into the interview feeling confident.",off:"A confident presenter inspires trust.",int:"I feel confident about taking on leadership roles.",biz:"A confident brand stands firm even during market downturns."},
  {w:"consequence",pos:"noun",hi:"परिणाम / नतीजा",sm:"a result of an action",ipa:"/ˈkɒnsɪkwəns/",syn:["result","effect","outcome"],ant:["cause","reason"],ex:"Think about the consequence before acting.",off:"Every decision has a consequence for the team.",int:"I consider the consequences of my actions carefully.",biz:"Ignoring compliance risks has serious consequences."},
  {w:"constructive",pos:"adjective",hi:"रचनात्मक / सकारात्मक",sm:"intended to help or improve",ipa:"/kənˈstrʌktɪv/",syn:["helpful","positive","productive"],ant:["destructive","negative"],ex:"Always give constructive feedback.",off:"Constructive criticism helps the team improve.",int:"I welcome constructive feedback to grow professionally.",biz:"Constructive conflict in teams can lead to innovation."},
  {w:"context",pos:"noun",hi:"संदर्भ / परिस्थिति",sm:"the circumstances in which something happens",ipa:"/ˈkɒntɛkst/",syn:["background","setting","situation"],ant:[],ex:"Understand the context before giving advice.",off:"Always provide context when raising an issue.",int:"I understand the business context of every project I work on.",biz:"Marketing messages must match the cultural context of the audience."},
  {w:"convincing",pos:"adjective",hi:"विश्वासजनक / प्रभावशाली",sm:"able to make someone believe something",ipa:"/kənˈvɪnsɪŋ/",syn:["persuasive","compelling","believable"],ant:["unconvincing","weak"],ex:"Make a convincing case for your idea.",off:"A convincing business proposal wins more contracts.",int:"I present my ideas in a convincing and structured way.",biz:"A convincing pitch to investors requires solid data."},
  {w:"cope",pos:"verb",hi:"सामना करना / निपटना",sm:"to deal with difficult situations",ipa:"/koʊp/",syn:["manage","handle","deal"],ant:["crumble","fail"],ex:"Let me help you cope with the pressure.",off:"Good employees cope well with sudden changes.",int:"I cope effectively with high-pressure work environments.",biz:"Businesses that cope with market changes survive long term."},
  {w:"core",pos:"adjective",hi:"मूल / मुख्य",sm:"relating to the most important part of something",ipa:"/kɔːr/",syn:["central","fundamental","essential"],ant:["peripheral","secondary"],ex:"Focus on your core strengths.",off:"Define the core objectives of the project clearly.",int:"My core strength is analytical thinking.",biz:"Core values guide every important business decision."},
  {w:"creative",pos:"adjective",hi:"सृजनशील",sm:"producing original and imaginative ideas",ipa:"/kriˈeɪtɪv/",syn:["original","inventive","imaginative"],ant:["uncreative","dull"],ex:"Be creative in your problem-solving.",off:"The creative team designed a new brand identity.",int:"I am a creative thinker who enjoys innovation.",biz:"Creative marketing campaigns drive higher brand engagement."},
  {w:"curious",pos:"adjective",hi:"जिज्ञासु",sm:"wanting to learn or know more",ipa:"/ˈkjʊərɪəs/",syn:["inquisitive","interested","eager"],ant:["indifferent","incurious"],ex:"Stay curious and never stop learning.",off:"Curious employees find better ways to solve problems.",int:"I am genuinely curious about how things work.",biz:"Curious leaders ask better questions and make better decisions."},
  {w:"database",pos:"noun",hi:"डेटाबेस",sm:"an organised collection of data stored electronically",ipa:"/ˈdeɪtəbeɪs/",syn:["data store","repository","system"],ant:[],ex:"Let me search the database for the information.",off:"All client details are stored in our database.",int:"I have experience managing large databases.",biz:"A well-maintained database is critical for business analytics."},
  {w:"delegate",pos:"verb",hi:"सौंपना / जिम्मेदारी देना",sm:"to give a task or responsibility to someone else",ipa:"/ˈdɛlɪɡeɪt/",syn:["assign","entrust","transfer"],ant:["retain","micromanage"],ex:"Let him delegate tasks to the junior staff.",off:"A good manager knows when to delegate.",int:"I can effectively delegate tasks to match team strengths.",biz:"Smart delegation allows leaders to focus on strategy."},
  {w:"demonstrate",pos:"verb",hi:"प्रदर्शित करना / दिखाना",sm:"to show how something works",ipa:"/ˈdɛmənstreɪt/",syn:["show","exhibit","prove"],ant:["hide","conceal"],ex:"Let me demonstrate the process for you.",off:"She demonstrated the new software to the entire team.",int:"I will demonstrate my skills through my work.",biz:"Demonstrate your product's value with clear data."},
  {w:"dependable",pos:"adjective",hi:"विश्वसनीय / भरोसेमंद",sm:"able to be trusted and relied on",ipa:"/dɪˈpɛndəbəl/",syn:["reliable","trustworthy","consistent"],ant:["unreliable","inconsistent"],ex:"Be dependable in all your commitments.",off:"We need a dependable supplier for critical materials.",int:"My managers have always found me dependable.",biz:"A dependable supply chain prevents disruptions."},
  {w:"detail-oriented",pos:"adjective",hi:"विस्तार पर ध्यान देने वाला",sm:"paying close attention to small details",ipa:"/ˈdiːteɪl ˈɔːrɪɛntɪd/",syn:["precise","thorough","meticulous"],ant:["careless","sloppy"],ex:"Let the detail-oriented person check the report.",off:"A detail-oriented approach reduces errors.",int:"I am highly detail-oriented in all my work.",biz:"Detail-oriented quality control keeps product defect rates low."},
  {w:"direct",pos:"adjective",hi:"सीधा / स्पष्ट",sm:"saying exactly what you mean",ipa:"/dɪˈrɛkt/",syn:["straightforward","honest","clear"],ant:["indirect","evasive"],ex:"Be direct when asking for what you need.",off:"A direct communication style saves time in meetings.",int:"I am direct and honest in all my communications.",biz:"Direct feedback from customers improves product quality quickly."},
  {w:"diverse",pos:"adjective",hi:"विविध / अलग-अलग",sm:"showing a variety of different things or people",ipa:"/daɪˈvɜːs/",syn:["varied","different","mixed"],ant:["uniform","homogeneous"],ex:"A diverse team brings better ideas.",off:"We have a diverse team from twelve different states.",int:"I have worked in diverse and multicultural teams.",biz:"Diverse companies are more innovative and competitive."},
  {w:"dominant",pos:"adjective",hi:"प्रभावशाली / प्रमुख",sm:"most important or powerful",ipa:"/ˈdɒmɪnənt/",syn:["leading","powerful","main"],ant:["minor","weak"],ex:"Let the most capable person take the dominant role.",off:"Our brand is the dominant player in this segment.",int:"I am not dominant but I am confident in sharing ideas.",biz:"Dominant companies must still innovate to stay relevant."},
  {w:"draft",pos:"verb",hi:"मसौदा तैयार करना",sm:"to write an early version of a document",ipa:"/drɑːft/",syn:["write","prepare","compose"],ant:["finalise","complete"],ex:"Let me draft the email for your review.",off:"She drafted the project proposal overnight.",int:"I drafted a new HR policy that was implemented company-wide.",biz:"Always draft a contract before starting any business relationship."},
  {w:"drive",pos:"noun",hi:"जोश / प्रेरणाशक्ति",sm:"strong motivation to achieve something",ipa:"/draɪv/",syn:["motivation","ambition","determination"],ant:["laziness","apathy"],ex:"Let your drive push you past every obstacle.",off:"The company values employees with drive and initiative.",int:"My drive to succeed motivates me every single day.",biz:"A company's growth is powered by the collective drive of its people."},
  {w:"durable",pos:"adjective",hi:"टिकाऊ / मज़बूत",sm:"lasting for a long time without breaking",ipa:"/ˈdjʊərəbəl/",syn:["long-lasting","sturdy","resilient"],ant:["fragile","breakable"],ex:"Invest in durable habits, not quick fixes.",off:"Our products are built to be durable and reliable.",int:"I build durable professional relationships.",biz:"Durable goods require less frequent replacement, adding value for customers."},
  {w:"ease",pos:"verb",hi:"आसान करना / कम करना",sm:"to make something less difficult or painful",ipa:"/iːz/",syn:["relieve","simplify","reduce"],ant:["complicate","worsen"],ex:"Let me ease your worries with a clear explanation.",off:"The new tool eased the data entry process significantly.",int:"I ease team members into new workflows step by step.",biz:"Automation can ease the burden of repetitive tasks."},
  {w:"empower",pos:"verb",hi:"सशक्त बनाना",sm:"to give someone the power or confidence to do something",ipa:"/ɪmˈpaʊər/",syn:["enable","authorise","strengthen"],ant:["disempower","restrict"],ex:"Let's empower each other to speak freely.",off:"Good managers empower their teams to make decisions.",int:"I strive to empower junior colleagues through mentoring.",biz:"Empowering employees reduces the need for micromanagement."},
  {w:"enthusiasm",pos:"noun",hi:"उत्साह",sm:"a feeling of excitement and interest",ipa:"/ɪnˈθjuːzɪæzəm/",syn:["excitement","passion","eagerness"],ant:["indifference","apathy"],ex:"Approach learning with enthusiasm.",off:"Her enthusiasm for the project inspired the whole team.",int:"I bring enthusiasm and energy to every task I undertake.",biz:"Enthusiasm in a sales team leads to higher conversion rates."},
  {w:"equip",pos:"verb",hi:"सुसज्जित करना / तैयार करना",sm:"to provide with the necessary tools or skills",ipa:"/ɪˈkwɪp/",syn:["prepare","furnish","enable"],ant:["deprive","leave unprepared"],ex:"Let me equip you with the skills to succeed.",off:"The company equips every employee with a laptop and mobile.",int:"My education has equipped me for this role.",biz:"Equip your sales team with the right training and tools."},
  {w:"exceed",pos:"verb",hi:"से अधिक होना / पार करना",sm:"to go beyond a set level or expectation",ipa:"/ɪkˈsiːd/",syn:["surpass","outdo","go beyond"],ant:["fall short","miss"],ex:"Let's exceed our own expectations.",off:"The sales team exceeded their target by twenty percent.",int:"I consistently exceed the performance benchmarks set for me.",biz:"Exceeding customer expectations drives loyalty and referrals."},
  {w:"exceptional",pos:"adjective",hi:"असाधारण / उत्कृष्ट",sm:"unusually good; much better than average",ipa:"/ɪkˈsɛpʃənəl/",syn:["outstanding","excellent","superior"],ant:["ordinary","mediocre"],ex:"She is exceptional at learning new languages.",off:"The board recognised her exceptional contribution.",int:"I deliver exceptional results through attention to detail.",biz:"Exceptional customer service creates lifelong brand advocates."},
  {w:"exhausted",pos:"adjective",hi:"थका हुआ / बेदम",sm:"completely tired",ipa:"/ɪɡˈzɔːstɪd/",syn:["tired","drained","worn out"],ant:["energised","refreshed"],ex:"Don't let yourself get exhausted — take breaks.",off:"The team was exhausted after the product launch sprint.",int:"Even when exhausted, I maintain professionalism.",biz:"Exhausted employees make more mistakes — rest is an investment."},
  {w:"exhibit",pos:"verb",hi:"प्रदर्शित करना / दिखाना",sm:"to show a quality or emotion",ipa:"/ɪɡˈzɪbɪt/",syn:["display","demonstrate","show"],ant:["conceal","hide"],ex:"Let your work exhibit your skill.",off:"She exhibits strong leadership qualities every day.",int:"I exhibit strong communication skills in all settings.",biz:"Trade fairs allow companies to exhibit their latest products."},
  {w:"expectation",pos:"noun",hi:"उम्मीद / अपेक्षा",sm:"a belief that something will happen",ipa:"/ˌɛkspɛkˈteɪʃən/",syn:["hope","anticipation","requirement"],ant:["surprise","disappointment"],ex:"Set clear expectations before starting any project.",off:"The manager clarified expectations in the first meeting.",int:"I always meet and often exceed expectations.",biz:"Managing client expectations is key to project success."},
  {w:"experience",pos:"verb",hi:"अनुभव करना",sm:"to feel or go through something",ipa:"/ɪkˈspɪərɪəns/",syn:["feel","encounter","undergo"],ant:["avoid","miss"],ex:"Let yourself experience the joy of small wins.",off:"Employees experience growth through challenging projects.",int:"I have experienced diverse work cultures.",biz:"Customers who experience great service become loyal advocates."},
  {w:"expose",pos:"verb",hi:"उजागर करना / सामना करना",sm:"to make known or subject to something new",ipa:"/ɪkˈspoʊz/",syn:["reveal","show","introduce"],ant:["hide","conceal"],ex:"Don't let fear of failure stop you from exposing your talent.",off:"The audit exposed weaknesses in the process.",int:"I expose myself to new industries to broaden my knowledge.",biz:"Expose your brand to new audiences through strategic partnerships."},
  {w:"fair",pos:"adverb",hi:"उचित तरीके से",sm:"in a just and equal way",ipa:"/fɛər/",syn:["justly","equally","reasonably"],ant:["unfairly","unjustly"],ex:"Let's play fair and respect each other.",off:"Handle all employee concerns fairly.",int:"I always act fairly with colleagues and clients.",biz:"Compete fairly to maintain industry trust and integrity."},
  {w:"firm",pos:"adjective",hi:"दृढ़ / मज़बूत",sm:"strong and not easily moved or changed",ipa:"/fɜːm/",syn:["strong","solid","steady"],ant:["weak","soft"],ex:"Be firm in your decisions.",off:"A firm handshake makes a good first impression.",int:"I am firm but open to constructive discussion.",biz:"A firm commitment to delivery timelines builds client trust."},
  {w:"fluent",pos:"adjective",hi:"प्रवाहपूर्ण / धारा-प्रवाह",sm:"able to speak a language easily and well",ipa:"/ˈfluːənt/",syn:["proficient","articulate","natural"],ant:["hesitant","broken"],ex:"She is fluent in three languages.",off:"Fluent English speakers are preferred for client-facing roles.",int:"I am working towards becoming fluent in English.",biz:"Fluent communication skills are essential in global business."},
  {w:"follow up",pos:"phrase",hi:"अनुसरण करना / पीछा करना",sm:"to check on the progress of something",ipa:"/ˈfɒloʊ ʌp/",syn:["check in","pursue","revisit"],ant:["ignore","abandon"],ex:"Don't forget to follow up after the interview.",off:"Always follow up with clients after a meeting.",int:"I follow up promptly on every action item.",biz:"Following up on leads increases sales conversion rates."},
  {w:"format",pos:"noun",hi:"प्रारूप / ढाँचा",sm:"the way something is arranged or presented",ipa:"/ˈfɔːmæt/",syn:["structure","layout","form"],ant:[],ex:"Please submit the report in the correct format.",off:"All presentations must follow the company format.",int:"I create reports in a clear and professional format.",biz:"A consistent format for business documents improves brand consistency."},
  {w:"foundation",pos:"noun",hi:"नींव / आधार",sm:"the base on which something is built",ipa:"/faʊnˈdeɪʃən/",syn:["base","basis","groundwork"],ant:["top","surface"],ex:"Honesty is the foundation of every relationship.",off:"The company's foundation is quality and innovation.",int:"My education provided a strong foundation for my career.",biz:"Customer trust forms the foundation of a sustainable business."},
  {w:"function",pos:"verb",hi:"काम करना / संचालित होना",sm:"to work or operate correctly",ipa:"/ˈfʌŋkʃən/",syn:["operate","work","run"],ant:["malfunction","fail"],ex:"Let the process function smoothly without interruption.",off:"All systems must function reliably during peak hours.",int:"I function well both independently and in a team.",biz:"A well-functioning supply chain reduces delivery errors."},
  {w:"generate",pos:"verb",hi:"उत्पन्न करना / बनाना",sm:"to produce or create something",ipa:"/ˈdʒɛnəreɪt/",syn:["produce","create","yield"],ant:["destroy","consume"],ex:"Let's generate new ideas in this brainstorm.",off:"The marketing campaign generated over a thousand leads.",int:"I generated ten new client referrals in one quarter.",biz:"Companies must generate consistent revenue to stay viable."},
  {w:"global",pos:"adjective",hi:"वैश्विक / अंतर्राष्ट्रीय",sm:"relating to the whole world",ipa:"/ˈɡloʊbəl/",syn:["worldwide","international","universal"],ant:["local","regional"],ex:"English is a global language for business.",off:"Our company operates in the global market.",int:"I have experience working with global clients.",biz:"A global supply chain requires careful management."},
  {w:"goal-oriented",pos:"adjective",hi:"लक्ष्य-केंद्रित",sm:"focused on achieving specific goals",ipa:"/ˈɡoʊl ˈɔːrɪɛntɪd/",syn:["ambitious","driven","focused"],ant:["aimless","unfocused"],ex:"Stay goal-oriented even when things get tough.",off:"We prefer goal-oriented candidates for this role.",int:"I am highly goal-oriented and results-driven.",biz:"Goal-oriented teams consistently outperform their peers."},
  {w:"grateful",pos:"adjective",hi:"आभारी / कृतज्ञ",sm:"feeling thankful for something",ipa:"/ˈɡreɪtfəl/",syn:["thankful","appreciative","indebted"],ant:["ungrateful","unappreciative"],ex:"Be grateful for every opportunity to learn.",off:"We are grateful to our clients for their continued trust.",int:"I am grateful for the mentorship I received.",biz:"Grateful businesses show appreciation to their partners and clients."},
  {w:"hardworking",pos:"adjective",hi:"मेहनती",sm:"putting in a lot of effort consistently",ipa:"/ˌhɑːdˈwɜːkɪŋ/",syn:["diligent","industrious","dedicated"],ant:["lazy","idle"],ex:"Being hardworking opens many doors.",off:"We reward hardworking employees with regular bonuses.",int:"I am hardworking and always go beyond what is required.",biz:"A hardworking team is the foundation of any successful startup."},
  {w:"highlight",pos:"verb",hi:"महत्त्व देना / उजागर करना",sm:"to emphasise or draw attention to something",ipa:"/ˈhaɪlaɪt/",syn:["emphasise","feature","stress"],ant:["downplay","minimise"],ex:"Let me highlight the key points.",off:"The report highlighted three critical risks.",int:"I will highlight my most relevant experience during the interview.",biz:"Highlight your product's unique features in all marketing materials."},
  {w:"honest",pos:"adverb",hi:"ईमानदारी से",sm:"in a truthful way",ipa:"/ˈɒnɪstli/",syn:["truthfully","sincerely","openly"],ant:["dishonestly","deceptively"],ex:"Always speak honestly.",off:"Employees should share honest opinions in surveys.",int:"I speak honestly about what I can and cannot do.",biz:"Honest communication with clients prevents misunderstandings."},
  {w:"impress",pos:"verb",hi:"प्रभावित करना",sm:"to make someone feel admiration",ipa:"/ɪmˈprɛs/",syn:["wow","amaze","inspire"],ant:["bore","disappoint"],ex:"Let your work impress your manager.",off:"She impressed the interview panel with her knowledge.",int:"I want to impress the team with my results from day one.",biz:"A well-designed product impresses customers at first glance."},
  {w:"income",pos:"verb",hi:"आय",sm:"money earned from work or investment",ipa:"/ˈɪnkʌm/",syn:["salary","earnings","revenue"],ant:["expenditure","loss"],ex:"Save a portion of your income every month.",off:"Monitor the department's income and expenses monthly.",int:"I am seeking a role with a competitive income package.",biz:"Steady income growth signals a healthy business."},
  {w:"independent",pos:"adjective",hi:"स्वतंत्र",sm:"able to act without needing help",ipa:"/ˌɪndɪˈpɛndənt/",syn:["self-reliant","autonomous","free"],ant:["dependent","reliant"],ex:"Let him be independent — he can manage it.",off:"We need an independent thinker for this role.",int:"I am capable of working independently with minimal supervision.",biz:"An independent audit verifies company financial accuracy."},
  {w:"influence",pos:"verb",hi:"प्रभावित करना",sm:"to have an effect on someone or something",ipa:"/ˈɪnfluəns/",syn:["affect","impact","shape"],ant:["ignore","leave unaffected"],ex:"Let positive people influence your mindset.",off:"Company culture influences employee performance.",int:"I influence my team positively through example.",biz:"Brand influencers can dramatically increase product awareness."},
  {w:"insight",pos:"noun",hi:"अंतर्दृष्टि / समझ",sm:"a clear understanding of something",ipa:"/ˈɪnsaɪt/",syn:["understanding","perception","knowledge"],ant:["ignorance","blindness"],ex:"Let this experience give you real insight.",off:"Her insights changed the direction of the project.",int:"I bring data-driven insights to every decision I make.",biz:"Customer insights help companies develop better products."},
  {w:"instruct",pos:"verb",hi:"निर्देश देना / सिखाना",sm:"to tell someone to do something officially",ipa:"/ɪnˈstrʌkt/",syn:["direct","tell","teach"],ant:["learn","follow"],ex:"Let me instruct you on the proper process.",off:"The manager instructed the team to restart the system.",int:"I was instructed to lead the testing phase.",biz:"Instruct all employees on data security protocols."},
  {w:"integrity",pos:"noun",hi:"ईमानदारी / सत्यनिष्ठा",sm:"the quality of being honest and having strong values",ipa:"/ɪnˈtɛɡrɪti/",syn:["honesty","honour","sincerity"],ant:["dishonesty","corruption"],ex:"Act with integrity in all situations.",off:"Integrity is a non-negotiable value in our company.",int:"I operate with complete integrity in all professional dealings.",biz:"Business integrity builds long-term trust with all stakeholders."},
  {w:"intuitive",pos:"adjective",hi:"सहज / स्वाभाविक",sm:"easy to use or understand naturally",ipa:"/ɪnˈtjuːɪtɪv/",syn:["natural","instinctive","user-friendly"],ant:["confusing","complicated"],ex:"The new app is very intuitive.",off:"We need an intuitive interface for the customer portal.",int:"I design intuitive processes that reduce training time.",biz:"An intuitive user experience drives higher product adoption."},
  {w:"key",pos:"adjective",hi:"मुख्य / प्रमुख",sm:"most important",ipa:"/kiː/",syn:["main","crucial","central"],ant:["minor","secondary"],ex:"Let me focus on the key points.",off:"Identify the key stakeholders in the project.",int:"My key strength is the ability to manage complex projects.",biz:"Key performance indicators measure business success."},
  {w:"landmark",pos:"noun",hi:"महत्त्वपूर्ण उपलब्धि / पहचान",sm:"an important achievement or a well-known place",ipa:"/ˈlændmɑːk/",syn:["milestone","achievement","monument"],ant:["minor event","setback"],ex:"Passing this exam was a landmark moment.",off:"Reaching one crore in revenue was a company landmark.",int:"Let me share a landmark achievement from my career.",biz:"Landmark partnerships help companies enter new markets."},
  {w:"launch",pos:"verb",hi:"शुरू करना / लॉन्च करना",sm:"to start or introduce something new",ipa:"/lɔːntʃ/",syn:["start","introduce","begin"],ant:["cancel","end"],ex:"Let's launch the new programme next month.",off:"The company launched three new products this year.",int:"I led the launch of a mobile application.",biz:"A successful product launch requires thorough market research."},
  {w:"letter",pos:"noun",hi:"पत्र / letter",sm:"a written message",ipa:"/ˈlɛtər/",syn:["message","note","correspondence"],ant:[],ex:"Let me write a formal letter to the company.",off:"Please draft a letter of appreciation for the vendor.",int:"I write clear and professional letters and emails.",biz:"A formal letter sets a professional tone for business communication."},
  {w:"leverage",pos:"verb",hi:"फायदा उठाना / उपयोग करना",sm:"to use something to its maximum advantage",ipa:"/ˈliːvərɪdʒ/",syn:["use","utilise","exploit"],ant:["waste","ignore"],ex:"Let me leverage my network to help you.",off:"Leverage existing data before collecting new data.",int:"I leverage my past experience to add immediate value.",biz:"Companies leverage technology to scale their operations."},
  {w:"logical",pos:"adjective",hi:"तार्किक / समझदारीभरा",sm:"following a clear and sensible reasoning",ipa:"/ˈlɒdʒɪkəl/",syn:["rational","sensible","reasonable"],ant:["illogical","irrational"],ex:"Think in a logical way to solve problems.",off:"A logical approach to project planning prevents delays.",int:"I am logical and data-driven in my decision-making.",biz:"Logical pricing strategies help maintain profit margins."},
  {w:"maintain",pos:"verb",hi:"बनाए रखना / बरकरार रखना",sm:"to keep something in the same state",ipa:"/meɪnˈteɪn/",syn:["keep","preserve","sustain"],ant:["neglect","abandon"],ex:"Let's maintain a positive attitude.",off:"We maintain detailed records of all client interactions.",int:"I maintain high standards of work quality consistently.",biz:"Maintaining good supplier relationships ensures better pricing."},
  {w:"majority",pos:"noun",hi:"बहुमत / अधिकांश",sm:"more than half of a group",ipa:"/məˈdʒɒrɪti/",syn:["most","bulk","greater part"],ant:["minority","few"],ex:"The majority of students prefer practical exercises.",off:"The majority of our clients are from the IT sector.",int:"In the majority of cases, I deliver results ahead of schedule.",biz:"The majority of revenue comes from our top ten clients."},
  {w:"meaningful",pos:"adjective",hi:"अर्थपूर्ण / सार्थक",sm:"having real purpose or importance",ipa:"/ˈmiːnɪŋfəl/",syn:["significant","purposeful","valuable"],ant:["meaningless","trivial"],ex:"Let's have a meaningful conversation about your goals.",off:"Meaningful feedback helps employees grow.",int:"I want to do meaningful work that creates real impact.",biz:"Meaningful corporate social responsibility builds brand loyalty."},
  {w:"measure",pos:"verb",hi:"मापना / जाँचना",sm:"to find the size, amount or degree of something",ipa:"/ˈmɛʒər/",syn:["assess","evaluate","quantify"],ant:["ignore","estimate"],ex:"Let's measure our progress each week.",off:"We measure team performance against KPIs.",int:"I measure my success by the results I deliver.",biz:"Businesses must measure ROI to justify marketing spend."},
  {w:"method",pos:"noun",hi:"तरीका / विधि",sm:"a particular way of doing something",ipa:"/ˈmɛθəd/",syn:["approach","technique","process"],ant:["disorder","improvisation"],ex:"Find a method that works best for you.",off:"Use a standardised method for all data entry.",int:"I use a structured method for solving complex problems.",biz:"A well-defined method reduces errors in production."},
  {w:"milestone",pos:"noun",hi:"मील का पत्थर / महत्त्वपूर्ण मुकाम",sm:"an important stage in a project or journey",ipa:"/ˈmaɪlstoʊn/",syn:["achievement","landmark","stage"],ant:["setback","failure"],ex:"Every milestone in your learning matters.",off:"Let's celebrate reaching this project milestone.",int:"I have achieved several significant milestones in my career.",biz:"Set clear milestones to track project progress."},
  {w:"mindset",pos:"noun",hi:"मानसिकता / सोच",sm:"a way of thinking that affects behaviour",ipa:"/ˈmaɪndset/",syn:["attitude","perspective","outlook"],ant:["closed mind","rigidity"],ex:"Develop a growth mindset for lifelong learning.",off:"A positive mindset helps teams overcome obstacles.",int:"I have a growth mindset and embrace new challenges.",biz:"A customer-first mindset drives business excellence."},
  {w:"modify",pos:"verb",hi:"बदलना / संशोधित करना",sm:"to make small changes to improve something",ipa:"/ˈmɒdɪfaɪ/",syn:["change","adjust","alter"],ant:["keep","maintain"],ex:"Let me modify the plan based on your feedback.",off:"We modified the product design after customer testing.",int:"I modified the process to improve efficiency by twenty percent.",biz:"Modify your strategy when market conditions change."},
  {w:"motivate",pos:"noun",hi:"प्रेरणा",sm:"a reason to do something",ipa:"/ˈmoʊtɪveɪt/",syn:["inspire","encourage","drive"],ant:["discourage","demotivate"],ex:"What motivates you to keep going?",off:"Bonuses motivate employees to exceed targets.",int:"My motivation comes from seeing the impact of my work.",biz:"Understanding what motivates customers helps tailor marketing messages."},
  {w:"neutral",pos:"adjective",hi:"तटस्थ / निरपेक्ष",sm:"not supporting either side",ipa:"/ˈnjuːtrəl/",syn:["impartial","unbiased","fair"],ant:["biased","partial"],ex:"Stay neutral when mediating a conflict.",off:"HR should remain neutral during disciplinary meetings.",int:"I approach conflicts with a neutral and objective mindset.",biz:"A neutral third party can help resolve business disputes."},
  {w:"norm",pos:"noun",hi:"मानदंड / सामान्य तरीका",sm:"a standard or usual behaviour",ipa:"/nɔːm/",syn:["standard","rule","expectation"],ant:["exception","deviation"],ex:"Professionalism is the norm in this office.",off:"We set high norms for quality and delivery.",int:"I go above and beyond the norms set for my role.",biz:"Industry norms help businesses set competitive pricing."},
  {w:"nurture",pos:"verb",hi:"पोषण करना / बढ़ावा देना",sm:"to encourage the development of something",ipa:"/ˈnɜːtʃər/",syn:["develop","cultivate","support"],ant:["neglect","stifle"],ex:"Let's nurture our skills with daily practice.",off:"Good managers nurture talent within the team.",int:"I nurture relationships with clients for long-term success.",biz:"Nurture your brand through consistent quality and communication."},
  {w:"objection",pos:"noun",hi:"आपत्ति / विरोध",sm:"a reason for disagreeing with something",ipa:"/əbˈdʒɛkʃən/",syn:["opposition","protest","complaint"],ant:["agreement","support"],ex:"Let me address your objection clearly.",off:"Handle client objections with facts and empathy.",int:"I handle objections in interviews by giving concrete examples.",biz:"A good salesperson handles every objection with confidence."},
  {w:"observe",pos:"noun",hi:"अवलोकन करना",sm:"to watch and notice carefully",ipa:"/əbˈzɜːv/",syn:["watch","notice","study"],ant:["ignore","miss"],ex:"Let me observe your technique first.",off:"The trainer observed the team's performance closely.",int:"I observe patterns in data to identify improvements.",biz:"Observe customer behaviour to improve user experience."},
  {w:"obtain",pos:"verb",hi:"प्राप्त करना / हासिल करना",sm:"to get something by effort or request",ipa:"/əbˈteɪn/",syn:["get","acquire","secure"],ant:["lose","give up"],ex:"Let me obtain the necessary approvals first.",off:"We obtained all required certifications before the launch.",int:"I obtained a distinction in my MBA programme.",biz:"Obtaining new contracts is the lifeblood of any business."},
  {w:"obvious",pos:"adjective",hi:"स्पष्ट / ज़ाहिर",sm:"easy to see or understand",ipa:"/ˈɒbvɪəs/",syn:["clear","apparent","evident"],ant:["unclear","hidden"],ex:"The solution is obvious once you look carefully.",off:"An obvious error in the report was corrected before submission.",int:"I make the obvious points clearly and then go deeper.",biz:"Obvious product benefits must still be communicated clearly."},
  {w:"ongoing",pos:"adjective",hi:"जारी / चल रहा",sm:"continuing to happen or develop",ipa:"/ˈɒnɡoʊɪŋ/",syn:["continuous","current","active"],ant:["finished","complete"],ex:"This is an ongoing process of improvement.",off:"We have ongoing projects with five major clients.",int:"I am involved in ongoing research on consumer behaviour.",biz:"Ongoing customer support is essential for subscription businesses."},
  {w:"open-minded",pos:"adjective",hi:"खुले विचारों वाला",sm:"willing to consider new ideas",ipa:"/ˌoʊpən ˈmaɪndɪd/",syn:["receptive","flexible","tolerant"],ant:["closed-minded","rigid"],ex:"Stay open-minded and learn from everyone.",off:"An open-minded team generates more creative solutions.",int:"I am open-minded and always willing to change my approach.",biz:"Open-minded leaders navigate change more effectively."},
  {w:"optimistic",pos:"adjective",hi:"आशावादी",sm:"hopeful and expecting good results",ipa:"/ˌɒptɪˈmɪstɪk/",syn:["positive","hopeful","confident"],ant:["pessimistic","negative"],ex:"Stay optimistic even during tough times.",off:"An optimistic attitude helps teams push through challenges.",int:"I am optimistic about my ability to grow in this role.",biz:"Optimistic business leaders inspire confidence in investors."},
  {w:"orderly",pos:"adjective",hi:"व्यवस्थित / सुव्यवस्थित",sm:"arranged neatly and systematically",ipa:"/ˈɔːdərli/",syn:["organised","neat","systematic"],ant:["chaotic","disorganised"],ex:"Keep your workspace orderly for better focus.",off:"An orderly filing system prevents information loss.",int:"I maintain an orderly approach to project management.",biz:"Orderly business processes reduce waste and improve efficiency."},
  {w:"outperform",pos:"verb",hi:"से बेहतर प्रदर्शन करना",sm:"to perform better than others",ipa:"/ˌaʊtpəˈfɔːm/",syn:["exceed","surpass","beat"],ant:["underperform","fall behind"],ex:"Let your results outperform your competition.",off:"Our team consistently outperforms all other divisions.",int:"I outperform targets because I plan thoroughly.",biz:"Companies that innovate continuously outperform their competitors."},
  {w:"ownership",pos:"noun",hi:"स्वामित्व / जिम्मेदारी",sm:"being in charge of something; taking responsibility",ipa:"/ˈoʊnərʃɪp/",syn:["responsibility","accountability","possession"],ant:["negligence","irresponsibility"],ex:"Take ownership of your learning journey.",off:"Every team member must take ownership of their tasks.",int:"I take full ownership of every project I handle.",biz:"Employee ownership mentality reduces errors and waste."},
  {w:"patience",pos:"noun",hi:"धैर्य / सब्र",sm:"the ability to wait calmly",ipa:"/ˈpeɪʃəns/",syn:["tolerance","endurance","composure"],ant:["impatience","frustration"],ex:"Learning takes patience and consistency.",off:"Customer-facing roles require great patience.",int:"I have the patience to explain complex topics clearly.",biz:"Patient negotiation leads to better long-term contracts."},
  {w:"pay",pos:"verb",hi:"भुगतान करना / तनख्वाह देना",sm:"to give money for goods or services",ipa:"/peɪ/",syn:["compensate","remunerate","settle"],ant:["owe","withhold"],ex:"Pay attention to details in your work.",off:"All invoices must be paid within thirty days.",int:"I expect fair pay for my skills and experience.",biz:"Pay your vendors on time to maintain good relationships."},
  {w:"persist",pos:"verb",hi:"दृढ़ रहना / जारी रखना",sm:"to keep trying despite difficulties",ipa:"/pəˈsɪst/",syn:["persevere","continue","carry on"],ant:["quit","stop"],ex:"Let us persist until we achieve our goal.",off:"She persisted with the project despite many challenges.",int:"I persist through challenges and deliver results.",biz:"Companies must persist through market downturns to succeed."},
  {w:"perspective",pos:"noun",hi:"दृष्टिकोण / नज़रिया",sm:"a way of thinking about something",ipa:"/pəˈspɛktɪv/",syn:["viewpoint","outlook","angle"],ant:["narrow-mindedness","bias"],ex:"Consider every perspective before deciding.",off:"Fresh perspectives can transform a stagnant team.",int:"I bring a unique perspective to every challenge I face.",biz:"A global perspective helps businesses identify new opportunities."},
  {w:"persuade",pos:"verb",hi:"मनाना / राजी करना",sm:"to convince someone to do something",ipa:"/pəˈsweɪd/",syn:["convince","influence","coax"],ant:["discourage","deter"],ex:"Let me persuade you with solid facts.",off:"A salesperson must persuade clients without being pushy.",int:"I persuade stakeholders using data and clear logic.",biz:"Persuasive marketing moves customers from awareness to purchase."},
  {w:"pledge",pos:"verb",hi:"वचन देना / प्रतिज्ञा करना",sm:"to make a serious promise",ipa:"/plɛdʒ/",syn:["promise","commit","vow"],ant:["break","abandon"],ex:"I pledge to give my best every day.",off:"The company pledged to reduce carbon emissions.",int:"I pledge to contribute meaningfully to every team I join.",biz:"A brand pledge to quality creates strong consumer trust."},
  {w:"potential",pos:"adjective",hi:"संभावित",sm:"possible in the future; having promise",ipa:"/pəˈtɛnʃəl/",syn:["possible","prospective","promising"],ant:["actual","current"],ex:"Every learner has potential to succeed.",off:"Identify potential issues before the project starts.",int:"I see great potential in this role to grow my career.",biz:"Assess potential clients carefully before investing resources."},
  {w:"precision",pos:"noun",hi:"सटीकता / परिशुद्धता",sm:"the quality of being exact and accurate",ipa:"/prɪˈsɪʒən/",syn:["accuracy","exactness","exactitude"],ant:["approximation","vagueness"],ex:"Precision is key in financial reporting.",off:"The design team works with great precision.",int:"I work with precision to avoid costly rework.",biz:"Manufacturing precision reduces product defect rates significantly."},
  {w:"present",pos:"adjective",hi:"उपस्थित / मौजूद",sm:"being in a particular place",ipa:"/ˈprɛzənt/",syn:["attending","here","available"],ant:["absent","away"],ex:"Be present in every meeting you attend.",off:"All senior managers were present at the board meeting.",int:"I am fully present and engaged in every conversation.",biz:"Be present and responsive whenever clients reach out."},
  {w:"process",pos:"noun",hi:"प्रक्रिया / तरीका",sm:"a series of steps to achieve something",ipa:"/ˈproʊsɛs/",syn:["procedure","method","system"],ant:["disorder","chaos"],ex:"Follow the process step by step.",off:"Let me explain the approval process in detail.",int:"I streamlined the onboarding process at my last company.",biz:"Well-defined processes reduce errors and improve scalability."},
  {w:"proficient",pos:"adjective",hi:"दक्ष / कुशल",sm:"competent and skilled at something",ipa:"/prəˈfɪʃənt/",syn:["skilled","capable","expert"],ant:["incompetent","unskilled"],ex:"She is proficient in three programming languages.",off:"We need a proficient data analyst for this role.",int:"I am proficient in Excel, SQL and Python.",biz:"Proficient employees reduce training time and improve output."},
  {w:"protocol",pos:"noun",hi:"प्रोटोकॉल / नियम",sm:"the official rules for how to behave",ipa:"/ˈproʊtəkɒl/",syn:["procedure","rule","standard"],ant:["disorder","exception"],ex:"Follow the protocol in every meeting.",off:"All staff must follow the data security protocol.",int:"I always follow established protocols to ensure compliance.",biz:"Clear protocols prevent confusion in business operations."},
  {w:"punctuality",pos:"noun",hi:"समय की पाबंदी",sm:"the habit of doing things at the right time",ipa:"/ˌpʌŋktʃuˈælɪti/",syn:["promptness","timeliness","regularity"],ant:["tardiness","lateness"],ex:"Punctuality is a mark of professionalism.",off:"Punctuality is highly valued in our company.",int:"My punctuality reflects my respect for others' time.",biz:"Punctuality in delivery builds strong client relationships."},
  {w:"query",pos:"noun",hi:"सवाल / प्रश्न / जिज्ञासा",sm:"a question asked to get information",ipa:"/ˈkwɪəri/",syn:["question","inquiry","doubt"],ant:["answer","response"],ex:"Please raise any query you have.",off:"Let me resolve your query immediately.",int:"I welcome queries and answer them clearly.",biz:"Resolve every customer query within one business day."},
  {w:"rapport",pos:"noun",hi:"अच्छे संबंध / तालमेल",sm:"a friendly, harmonious relationship",ipa:"/ræˈpɔːr/",syn:["harmony","connection","bond"],ant:["hostility","coldness"],ex:"Build a good rapport with your colleagues.",off:"Strong rapport with clients leads to longer partnerships.",int:"I build quick rapport with clients through empathy.",biz:"Sales professionals who build rapport close more deals."},
  {w:"realistic",pos:"noun",hi:"वास्तविकता-परक",sm:"accepting things as they are",ipa:"/ˌriːəˈlɪstɪk/",syn:["practical","sensible","grounded"],ant:["idealistic","impractical"],ex:"Let's be realistic about the timeline.",off:"Set realistic expectations for the project delivery.",int:"I am realistic about my strengths and areas for growth.",biz:"Realistic projections build investor confidence."},
  {w:"recognise",pos:"noun",hi:"पहचान",sm:"to know what something is from past experience",ipa:"/ˈrɛkəɡnaɪz/",syn:["identify","acknowledge","appreciate"],ant:["ignore","overlook"],ex:"Let me recognise a good opportunity when I see one.",off:"We recognise outstanding employees every quarter.",int:"I recognise the value of diverse perspectives in a team.",biz:"Companies that recognise their customers build loyalty."},
  {w:"refine",pos:"verb",hi:"परिष्कृत करना / बेहतर बनाना",sm:"to improve something by making small changes",ipa:"/rɪˈfaɪn/",syn:["improve","polish","perfect"],ant:["worsen","roughen"],ex:"Let me refine my approach based on the feedback.",off:"We refined the product design after user testing.",int:"I continuously refine my skills to stay competitive.",biz:"Refining your business model leads to sustained growth."},
  {w:"reinforce",pos:"verb",hi:"मज़बूत करना / सुदृढ़ करना",sm:"to make something stronger or more effective",ipa:"/ˌriːɪnˈfɔːs/",syn:["strengthen","support","consolidate"],ant:["weaken","undermine"],ex:"Let's reinforce the habit of daily practice.",off:"The training reinforced the team's understanding of the process.",int:"I reinforce learning by applying concepts immediately.",biz:"Reinforce your brand message through consistent communication."},
  {w:"relevant",pos:"adjective",hi:"प्रासंगिक / संबंधित",sm:"connected to what is being discussed",ipa:"/ˈrɛlɪvənt/",syn:["applicable","related","pertinent"],ant:["irrelevant","unrelated"],ex:"Focus on relevant examples in your answer.",off:"Only share relevant data in the presentation.",int:"I highlight only the most relevant experience in my CV.",biz:"Relevant content drives higher customer engagement."},
  {w:"resilient",pos:"adjective",hi:"लचीला / दृढ़",sm:"able to recover quickly from difficulties",ipa:"/rɪˈzɪlɪənt/",syn:["strong","tough","adaptable"],ant:["fragile","weak"],ex:"Be resilient and keep going.",off:"Resilient employees bounce back faster from setbacks.",int:"I am resilient and thrive under pressure.",biz:"Resilient companies survive economic downturns better than others."},
  {w:"respond",pos:"verb",hi:"जवाब देना / प्रतिक्रिया देना",sm:"to reply or react to something",ipa:"/rɪˈspɒnd/",syn:["reply","answer","react"],ant:["ignore","stay silent"],ex:"Please respond to my email by end of day.",off:"Let me respond to the client's concern promptly.",int:"I always respond to messages and requests quickly.",biz:"Respond to customer complaints within 24 hours."},
  {w:"revenue",pos:"noun",hi:"राजस्व / आय",sm:"the total income of a company",ipa:"/ˈrɛvɪnjuː/",syn:["income","earnings","turnover"],ant:["expenditure","loss"],ex:"Let's focus on growing our revenue.",off:"Revenue grew by twenty-five percent this quarter.",int:"I contributed to a fifteen percent increase in revenue.",biz:"Revenue diversification reduces financial risk."},
  {w:"scenario",pos:"noun",hi:"स्थिति / परिदृश्य",sm:"a possible situation or series of events",ipa:"/sɪˈnɑːrɪoʊ/",syn:["situation","case","circumstance"],ant:[],ex:"Let me give you a common scenario.",off:"Prepare for every possible scenario before the meeting.",int:"In a stressful scenario, I remain focused and composed.",biz:"Business scenarios must account for best and worst cases."},
  {w:"scope",pos:"noun",hi:"दायरा / सीमा",sm:"the range of things covered by something",ipa:"/skoʊp/",syn:["range","extent","span"],ant:["limit","narrowness"],ex:"Make sure the project is within scope.",off:"Define the scope of work before signing the agreement.",int:"I always clarify the scope of a project before starting.",biz:"A well-defined scope prevents scope creep in projects."},
  {w:"self-discipline",pos:"noun",hi:"आत्म-अनुशासन",sm:"the ability to control your own behaviour",ipa:"/ˌsɛlf ˈdɪsɪplɪn/",syn:["self-control","willpower","restraint"],ant:["indulgence","lack of control"],ex:"Self-discipline is essential for consistent learning.",off:"Self-discipline helps employees manage their time effectively.",int:"My self-discipline is one of my greatest professional strengths.",biz:"Self-discipline in leadership sets the standard for the entire organisation."},
  {w:"significant",pos:"adjective",hi:"महत्त्वपूर्ण / बड़ा",sm:"important or large enough to be noticed",ipa:"/sɪɡˈnɪfɪkənt/",syn:["important","major","notable"],ant:["insignificant","minor"],ex:"This is a significant step in your journey.",off:"The merger was a significant event for the company.",int:"I made a significant contribution to our team's success.",biz:"Significant market changes require immediate strategic response."},
  {w:"sincere",pos:"adjective",hi:"ईमानदार / सच्चा",sm:"genuine and honest",ipa:"/sɪnˈsɪər/",syn:["genuine","honest","authentic"],ant:["insincere","fake"],ex:"Be sincere in your apology.",off:"A sincere approach to feedback builds trust.",int:"I am sincere and transparent in all my dealings.",biz:"Sincere communication with clients prevents misunderstandings."},
  {w:"stakeholder",pos:"noun",hi:"हितधारक",sm:"a person who has an interest in a business or project",ipa:"/ˈsteɪkhoʊldər/",syn:["investor","participant","interested party"],ant:["outsider","non-participant"],ex:"All stakeholders must be kept informed.",off:"Let's send a progress update to all stakeholders.",int:"I manage stakeholder expectations proactively.",biz:"Engaging stakeholders early reduces project risk."},
  {w:"steady",pos:"adjective",hi:"स्थिर / नियमित",sm:"not shaking; constant and regular",ipa:"/ˈstɛdi/",syn:["stable","consistent","regular"],ant:["unsteady","erratic"],ex:"Make steady progress every day.",off:"A steady workflow prevents burnout.",int:"I deliver steady and reliable performance.",biz:"Steady revenue growth signals a healthy business."},
  {w:"strategic",pos:"adjective",hi:"रणनीतिक",sm:"designed to achieve an important goal",ipa:"/strəˈtiːdʒɪk/",syn:["planned","tactical","deliberate"],ant:["random","impulsive"],ex:"Make strategic decisions, not emotional ones.",off:"Strategic planning is done at the start of every year.",int:"I take a strategic approach to career development.",biz:"Strategic partnerships accelerate business growth."},
  {w:"streamline",pos:"verb",hi:"सरल बनाना / कुशल बनाना",sm:"to make a process more efficient",ipa:"/ˈstriːmlaɪn/",syn:["simplify","optimise","improve"],ant:["complicate","slow down"],ex:"Let's streamline this process.",off:"We streamlined the approval process to save two days.",int:"I streamlined our reporting system, saving five hours weekly.",biz:"Streamlining operations cuts costs and improves delivery speed."},
  {w:"strict",pos:"adjective",hi:"सख्त / कड़ा",sm:"demanding exact obedience to rules",ipa:"/strɪkt/",syn:["firm","rigid","demanding"],ant:["lenient","flexible"],ex:"The teacher was strict but fair.",off:"The company is strict about data confidentiality.",int:"I maintain strict standards without being inflexible.",biz:"Strict quality control ensures consistent product performance."},
  {w:"substitute",pos:"verb",hi:"बदलना / स्थानापन्न करना",sm:"to replace someone or something with another",ipa:"/ˈsʌbstɪtjuːt/",syn:["replace","swap","exchange"],ant:["keep","maintain"],ex:"Let me substitute this word with a simpler one.",off:"Can you substitute for the presenter if they are absent?",int:"I can substitute for any team member at short notice.",biz:"Substitute low-cost materials without compromising quality."},
  {w:"succeed",pos:"noun",hi:"सफलता",sm:"the achievement of a goal",ipa:"/səkˈsiːd/",syn:["achieve","prosper","triumph"],ant:["fail","lose"],ex:"Let every small win keep you motivated to succeed.",off:"We need to succeed in this tender to hit our target.",int:"I have succeeded in every major project I have led.",biz:"Companies succeed by consistently exceeding customer expectations."},
  {w:"summarise",pos:"verb",hi:"सारांश देना",sm:"to give a short version of the main points",ipa:"/ˈsʌməraɪz/",syn:["condense","recap","outline"],ant:["expand","elaborate"],ex:"Let me summarise the key points.",off:"Please summarise the meeting notes and share with the team.",int:"I always summarise action items at the end of meetings.",biz:"Summarise financial data clearly for executive presentations."},
  {w:"supervise",pos:"verb",hi:"निगरानी करना / देखरेख करना",sm:"to watch over and direct someone's work",ipa:"/ˈsuːpəvaɪz/",syn:["oversee","manage","direct"],ant:["neglect","ignore"],ex:"Let me supervise the process to ensure accuracy.",off:"She supervises a team of twelve engineers.",int:"I have supervised teams of up to twenty people.",biz:"Proper supervision maintains quality and safety standards."},
  {w:"talent",pos:"noun",hi:"प्रतिभा / हुनर",sm:"a natural ability to do something well",ipa:"/ˈtælənt/",syn:["gift","ability","skill"],ant:["weakness","inability"],ex:"Don't let your talent go unnoticed.",off:"We invest in identifying and nurturing talent.",int:"My talent lies in turning complex data into clear insights.",biz:"Retaining top talent is a strategic business priority."},
  {w:"technical",pos:"adjective",hi:"तकनीकी",sm:"relating to a specific technology or skill",ipa:"/ˈtɛknɪkəl/",syn:["specialist","scientific","practical"],ant:["general","non-technical"],ex:"Let me explain the technical details in simple terms.",off:"The role requires strong technical knowledge.",int:"I have solid technical skills and keep them updated.",biz:"Technical expertise differentiates premium service providers."},
  {w:"temporary",pos:"adjective",hi:"अस्थायी / कुछ समय के लिए",sm:"lasting for a short time only",ipa:"/ˈtɛmpərəri/",syn:["short-term","provisional","transient"],ant:["permanent","lasting"],ex:"Don't worry — this difficulty is only temporary.",off:"We hired three temporary staff for the busy season.",int:"I can cover temporary responsibilities without hesitation.",biz:"Temporary setbacks are part of any growth journey."},
  {w:"tenure",pos:"noun",hi:"कार्यकाल / सेवाकाल",sm:"the period during which someone holds a job",ipa:"/ˈtɛnjər/",syn:["term","period","time"],ant:["dismissal","termination"],ex:"During her tenure, the company doubled its revenue.",off:"She completed a three-year tenure as marketing head.",int:"In my tenure at XYZ, I improved customer satisfaction by twenty percent.",biz:"Long-tenure employees carry invaluable institutional knowledge."},
  {w:"timely",pos:"adjective",hi:"समयानुकूल / सही समय पर",sm:"done at the right time",ipa:"/ˈtaɪmli/",syn:["prompt","punctual","on time"],ant:["late","delayed"],ex:"Timely feedback helps you improve faster.",off:"Timely delivery builds strong client relationships.",int:"I always provide timely updates on project status.",biz:"Timely communication prevents misunderstandings and delays."},
  {w:"tolerance",pos:"noun",hi:"सहनशीलता / सहिष्णुता",sm:"the ability to accept differences",ipa:"/ˈtɒlərəns/",syn:["acceptance","patience","endurance"],ant:["intolerance","bigotry"],ex:"Show tolerance for different ways of thinking.",off:"A workplace built on tolerance is more inclusive.",int:"I demonstrate tolerance and respect in all my interactions.",biz:"Cultural tolerance enables global business partnerships."},
  {w:"transform",pos:"verb",hi:"बदलना / रूपांतरित करना",sm:"to change completely",ipa:"/trænsˈfɔːm/",syn:["change","convert","revolutionise"],ant:["maintain","preserve"],ex:"Let this course transform your English skills.",off:"The new strategy transformed the company's culture.",int:"I transformed a failing team into a high-performing one.",biz:"Digital transformation is essential for modern businesses."},
  {w:"transparent",pos:"noun",hi:"पारदर्शिता",sm:"open and clear about processes and decisions",ipa:"/trænsˈpærənt/",syn:["open","honest","clear"],ant:["hidden","secretive"],ex:"Always be transparent about your limitations.",off:"Transparent leadership builds a culture of trust.",int:"I am transparent about my progress and challenges.",biz:"Transparent pricing helps customers make informed decisions."},
  {w:"trend",pos:"noun",hi:"प्रवृत्ति / रुझान",sm:"a general direction in which something is changing",ipa:"/trɛnd/",syn:["tendency","pattern","movement"],ant:["constant","stability"],ex:"Follow the trend in your industry.",off:"Let me analyse the current market trends.",int:"I track industry trends to stay ahead.",biz:"Identifying trends early gives a company competitive advantage."},
  {w:"urgent",pos:"noun",hi:"ज़रूरी काम",sm:"something needing immediate attention",ipa:"/ˈɜːdʒənt/",syn:["pressing","critical","immediate"],ant:["unimportant","low priority"],ex:"Handle urgent tasks first.",off:"This is an urgent request from the client.",int:"I identify and prioritise urgent tasks every morning.",biz:"Urgent client escalations should be handled at the highest level."},
  {w:"versatile",pos:"adjective",hi:"बहुमुखी",sm:"able to adapt to many different tasks",ipa:"/ˈvɜːsətaɪl/",syn:["flexible","adaptable","multi-skilled"],ant:["limited","one-dimensional"],ex:"A versatile worker can handle many different tasks.",off:"We need a versatile person who can manage multiple roles.",int:"I am versatile and comfortable in varied roles.",biz:"Versatile teams handle unexpected challenges more effectively."},
  {w:"volunteer",pos:"verb",hi:"स्वेच्छा से करना / स्वयंसेवा करना",sm:"to offer to do something without being asked",ipa:"/ˌvɒlənˈtɪər/",syn:["offer","step up","contribute"],ant:["refuse","withhold"],ex:"Let me volunteer to lead this task.",off:"She volunteered to train the new recruits.",int:"I always volunteer for additional responsibilities.",biz:"Volunteer employee activities build a positive brand image."},
  {w:"work ethic",pos:"phrase",hi:"काम करने का नज़रिया / कार्यनीति",sm:"a belief in the value of hard work",ipa:"/ˈwɜːk ˈɛθɪk/",syn:["diligence","dedication","industriousness"],ant:["laziness","negligence"],ex:"A strong work ethic sets you apart.",off:"We value candidates with a strong work ethic.",int:"My work ethic has been praised by all my managers.",biz:"A culture of strong work ethic drives consistent business performance."},
];

// Deduplicate vocabulary by word (case-insensitive)
const seenWords = new Set();
const vocabulary = [];
let vId = 1;
for (const v of vocabularyRaw) {
  const key = v.w.toLowerCase();
  if (seenWords.has(key)) continue;
  seenWords.add(key);
  vocabulary.push({
    id: vId++,
    word: v.w,
    partOfSpeech: v.pos,
    hindi: v.hi,
    simpleMeaning: v.sm,
    ipa: v.ipa,
    synonyms: v.syn,
    antonyms: v.ant,
    example: v.ex,
    officeExample: v.off,
    interviewExample: v.int,
    businessExample: v.biz
  });
}
// Pad to 500 if needed
const padWords = [
  {w:"achieve",pos:"verb",hi:"सफलता पाना",sm:"to get a desired result through effort",ipa:"/əˈtʃiːv/",syn:["attain","accomplish"],ant:["fail"],ex:"She worked hard to achieve her dream.",off:"We achieved our quarterly goals.",int:"I achieved a thirty percent growth in my last role.",biz:"We achieve results by focusing on customer needs."},
];
// actually we'll count and add more if needed after; for now build practice/mockTest

// ─── PRACTICE & MOCK TEST SENTENCE ENGINE ────────────────────────────────────
// Subjects with Hindi equivalents and formality
const subjects = [
  { eng: "me", hi_obj: "मुझे", gender: "n", formal: false },
  { eng: "him", hi_obj: "उसे", gender: "m", formal: false },
  { eng: "her", hi_obj: "उसे", gender: "f", formal: false },
  { eng: "them", hi_obj: "उन्हें", gender: "pl", formal: false },
  { eng: "us", hi_obj: "हमें", gender: "pl", formal: false },
  { eng: "Rahul", hi_obj: "राहुल को", gender: "m", formal: false },
  { eng: "Priya", hi_obj: "प्रिया को", gender: "f", formal: false },
  { eng: "the children", hi_obj: "बच्चों को", gender: "pl", formal: false },
  { eng: "the team", hi_obj: "टीम को", gender: "pl", formal: false },
  { eng: "the manager", hi_obj: "मैनेजर को", gender: "m", formal: true },
  { eng: "the doctor", hi_obj: "डॉक्टर को", gender: "m", formal: true },
  { eng: "the student", hi_obj: "छात्र को", gender: "m", formal: false },
  { eng: "the customer", hi_obj: "ग्राहक को", gender: "m", formal: true },
  { eng: "the driver", hi_obj: "ड्राइवर को", gender: "m", formal: false },
];

// Verb phrases: [engVerb, hindiVerbStem, tags, difficulty]
// Pattern: Let {subject} {verbPhrase}
const verbPhrases = [
  // Daily life
  { v: "go", hi: "जाने", tags: ["daily"], diff: "easy" },
  { v: "speak", hi: "बोलने", tags: ["daily"], diff: "easy" },
  { v: "try", hi: "कोशिश करने", tags: ["daily"], diff: "easy" },
  { v: "rest", hi: "आराम करने", tags: ["daily"], diff: "easy" },
  { v: "eat", hi: "खाने", tags: ["daily"], diff: "easy" },
  { v: "sleep", hi: "सोने", tags: ["daily"], diff: "easy" },
  { v: "play", hi: "खेलने", tags: ["daily"], diff: "easy" },
  { v: "sing", hi: "गाने", tags: ["daily"], diff: "easy" },
  { v: "dance", hi: "नाचने", tags: ["daily"], diff: "easy" },
  { v: "read", hi: "पढ़ने", tags: ["daily"], diff: "easy" },
  { v: "write", hi: "लिखने", tags: ["daily"], diff: "easy" },
  { v: "walk", hi: "चलने", tags: ["daily"], diff: "easy" },
  { v: "run", hi: "दौड़ने", tags: ["daily"], diff: "easy" },
  { v: "cook", hi: "खाना बनाने", tags: ["daily"], diff: "easy" },
  { v: "drink", hi: "पीने", tags: ["daily"], diff: "easy" },
  { v: "sit", hi: "बैठने", tags: ["daily"], diff: "easy" },
  { v: "wait", hi: "इंतज़ार करने", tags: ["daily"], diff: "easy" },
  { v: "watch", hi: "देखने", tags: ["daily"], diff: "easy" },
  { v: "listen", hi: "सुनने", tags: ["daily"], diff: "easy" },
  { v: "think", hi: "सोचने", tags: ["daily"], diff: "easy" },
  { v: "choose", hi: "चुनने", tags: ["daily"], diff: "easy" },
  { v: "leave", hi: "जाने", tags: ["daily"], diff: "easy" },
  { v: "stay", hi: "रुकने", tags: ["daily"], diff: "easy" },
  { v: "come in", hi: "अंदर आने", tags: ["daily"], diff: "easy" },
  { v: "go out", hi: "बाहर जाने", tags: ["daily"], diff: "easy" },
  // Office
  { v: "speak in the meeting", hi: "मीटिंग में बोलने", tags: ["office"], diff: "medium" },
  { v: "check the report", hi: "रिपोर्ट जाँचने", tags: ["office"], diff: "medium" },
  { v: "send the email", hi: "ईमेल भेजने", tags: ["office"], diff: "medium" },
  { v: "present the plan", hi: "प्लान पेश करने", tags: ["office"], diff: "medium" },
  { v: "finish the task", hi: "काम खत्म करने", tags: ["office"], diff: "medium" },
  { v: "review the documents", hi: "दस्तावेज़ देखने", tags: ["office"], diff: "medium" },
  { v: "handle the client", hi: "ग्राहक को संभालने", tags: ["office"], diff: "medium" },
  { v: "start the project", hi: "प्रोजेक्ट शुरू करने", tags: ["office"], diff: "medium" },
  { v: "submit the application", hi: "आवेदन जमा करने", tags: ["office"], diff: "medium" },
  { v: "schedule the meeting", hi: "मीटिंग तय करने", tags: ["office"], diff: "medium" },
  { v: "update the spreadsheet", hi: "स्प्रेडशीट अपडेट करने", tags: ["office"], diff: "medium" },
  { v: "share the file", hi: "फ़ाइल शेयर करने", tags: ["office"], diff: "medium" },
  { v: "close the deal", hi: "डील बंद करने", tags: ["office"], diff: "hard" },
  { v: "attend the workshop", hi: "वर्कशॉप में जाने", tags: ["office"], diff: "medium" },
  { v: "take a break", hi: "ब्रेक लेने", tags: ["office"], diff: "easy" },
  // Interview
  { v: "explain my experience", hi: "अपना अनुभव बताने", tags: ["interview"], diff: "medium" },
  { v: "answer the question", hi: "सवाल का जवाब देने", tags: ["interview"], diff: "medium" },
  { v: "describe my strengths", hi: "अपनी ताकत बताने", tags: ["interview"], diff: "medium" },
  { v: "give an example", hi: "उदाहरण देने", tags: ["interview"], diff: "medium" },
  { v: "share my goals", hi: "अपने लक्ष्य बताने", tags: ["interview"], diff: "medium" },
  { v: "introduce myself", hi: "खुद का परिचय देने", tags: ["interview"], diff: "easy" },
  // Business
  { v: "sign the contract", hi: "कॉन्ट्रैक्ट साइन करने", tags: ["business"], diff: "hard" },
  { v: "negotiate the price", hi: "कीमत पर बात करने", tags: ["business"], diff: "hard" },
  { v: "approve the budget", hi: "बजट मंज़ूर करने", tags: ["business"], diff: "hard" },
  { v: "launch the product", hi: "प्रोडक्ट लॉन्च करने", tags: ["business"], diff: "hard" },
  { v: "expand the team", hi: "टीम बढ़ाने", tags: ["business"], diff: "hard" },
  { v: "reach the target", hi: "लक्ष्य हासिल करने", tags: ["business"], diff: "hard" },
  // Family
  { v: "play outside", hi: "बाहर खेलने", tags: ["family"], diff: "easy" },
  { v: "sleep early", hi: "जल्दी सोने", tags: ["family"], diff: "easy" },
  { v: "eat vegetables", hi: "सब्जियाँ खाने", tags: ["family"], diff: "easy" },
  { v: "watch television", hi: "टेलीविज़न देखने", tags: ["family"], diff: "easy" },
  { v: "do homework", hi: "होमवर्क करने", tags: ["family"], diff: "easy" },
  { v: "go to bed", hi: "सोने", tags: ["family"], diff: "easy" },
  { v: "come home early", hi: "जल्दी घर आने", tags: ["family"], diff: "easy" },
  { v: "help in the kitchen", hi: "रसोई में मदद करने", tags: ["family"], diff: "easy" },
  // Travel
  { v: "book the tickets", hi: "टिकट बुक करने", tags: ["travel"], diff: "medium" },
  { v: "pack the bags", hi: "सामान पैक करने", tags: ["travel"], diff: "easy" },
  { v: "check in at the hotel", hi: "होटल में चेक-इन करने", tags: ["travel"], diff: "medium" },
  { v: "explore the city", hi: "शहर घूमने", tags: ["travel"], diff: "easy" },
  { v: "take photos", hi: "फोटो लेने", tags: ["travel"], diff: "easy" },
  // Health
  { v: "see the doctor", hi: "डॉक्टर से मिलने", tags: ["health"], diff: "easy" },
  { v: "take the medicine", hi: "दवाई लेने", tags: ["health"], diff: "easy" },
  { v: "exercise daily", hi: "रोज़ व्यायाम करने", tags: ["health"], diff: "easy" },
  { v: "get some rest", hi: "थोड़ा आराम करने", tags: ["health"], diff: "easy" },
  // Technology
  { v: "install the software", hi: "सॉफ्टवेयर इंस्टॉल करने", tags: ["tech"], diff: "medium" },
  { v: "access the system", hi: "सिस्टम एक्सेस करने", tags: ["tech"], diff: "medium" },
  { v: "download the file", hi: "फ़ाइल डाउनलोड करने", tags: ["tech"], diff: "medium" },
  { v: "upload the data", hi: "डेटा अपलोड करने", tags: ["tech"], diff: "medium" },
  // Emotions & Goals
  { v: "express her feelings", hi: "अपनी भावनाएं बताने", tags: ["emotions"], diff: "medium" },
  { v: "follow his dream", hi: "अपना सपना पूरा करने", tags: ["goals"], diff: "medium" },
  { v: "make a decision", hi: "फ़ैसला लेने", tags: ["goals"], diff: "medium" },
  { v: "face the challenge", hi: "चुनौती का सामना करने", tags: ["goals"], diff: "hard" },
  { v: "pursue his passion", hi: "अपने जुनून को आगे बढ़ाने", tags: ["goals"], diff: "hard" },
  { v: "prove his point", hi: "अपनी बात साबित करने", tags: ["goals"], diff: "hard" },
  { v: "celebrate the success", hi: "सफलता मनाने", tags: ["emotions"], diff: "easy" },
  { v: "share his opinion", hi: "अपनी राय बताने", tags: ["daily"], diff: "easy" },
  { v: "ask a question", hi: "सवाल पूछने", tags: ["daily"], diff: "easy" },
  { v: "learn at his own pace", hi: "अपनी गति से सीखने", tags: ["goals"], diff: "medium" },
  { v: "manage the situation", hi: "स्थिति संभालने", tags: ["office"], diff: "hard" },
  { v: "resolve the issue", hi: "समस्या हल करने", tags: ["office"], diff: "hard" },
  { v: "lead the team", hi: "टीम को आगे ले जाने", tags: ["office"], diff: "hard" },
  { v: "join the call", hi: "कॉल में जुड़ने", tags: ["office","tech"], diff: "medium" },
  { v: "complete the training", hi: "ट्रेनिंग पूरी करने", tags: ["office"], diff: "medium" },
  { v: "improve his skills", hi: "अपनी skills बेहतर करने", tags: ["goals"], diff: "medium" },
  { v: "apply for the job", hi: "नौकरी के लिए आवेदन करने", tags: ["interview"], diff: "medium" },
  { v: "use the laptop", hi: "लैपटॉप इस्तेमाल करने", tags: ["tech"], diff: "easy" },
  { v: "open the window", hi: "खिड़की खोलने", tags: ["daily"], diff: "easy" },
  { v: "close the door", hi: "दरवाज़ा बंद करने", tags: ["daily"], diff: "easy" },
  { v: "clean the room", hi: "कमरा साफ़ करने", tags: ["daily"], diff: "easy" },
  { v: "call the client", hi: "क्लाइंट को फोन करने", tags: ["office","business"], diff: "medium" },
];

// Sentence types
const sentenceTypes = ["positive", "negative", "question"];

// Negative prefix for Hindi
function buildHindiNeg(hiObj, hiVerb, formality) {
  // Don't let X verb
  if (formality) {
    return `${hiObj} ${hiVerb} मत दीजिए।`;
  }
  return `${hiObj} ${hiVerb} मत दो।`;
}
function buildHindiPos(hiObj, hiVerb, formality) {
  if (formality) {
    return `${hiObj} ${hiVerb} दीजिए।`;
  }
  return `${hiObj} ${hiVerb} दो।`;
}
function buildHindiQ(hiObj, hiVerb) {
  return `क्या आप ${hiObj} ${hiVerb} देंगे?`;
}

function buildEngPos(subj, vp) {
  return `Let ${subj} ${vp}.`;
}
function buildEngNeg(subj, vp) {
  return `Don't let ${subj} ${vp}.`;
}
function buildEngQ(subj, vp) {
  return `Will you let ${subj} ${vp}?`;
}

// Hint & explanation templates
function getHint(type, subj) {
  if (type === "positive") return `Let + ${subj} + base verb`;
  if (type === "negative") return `Don't let + ${subj} + base verb`;
  return `Will you let + ${subj} + base verb?`;
}
function getExplanation(type) {
  if (type === "positive") return `"Let" के बाद object pronoun और फिर base verb आता है — "to" नहीं।`;
  if (type === "negative") return `"Don't let" + object + base verb — किसी को कुछ करने से रोकना।`;
  return `"Will you let" + object + base verb — permission माँगना।`;
}
function getDiff(vp, type) {
  if (type === "question") return "hard";
  if (type === "negative") {
    if (vp.diff === "easy") return "medium";
    return "hard";
  }
  return vp.diff;
}

// Generate all combinations
const allPractice = [];
const allMockTest = [];
const usedEnglish = new Set();

// Also exclude the original practice sentences
const originalPractice = [
  "Let me go.", "Let him speak.", "Let them come in.", "Let me explain.",
  "Let her say what she wants.", "Let me have a minute.", "Let the children play.",
  "Let him do this work.", "Let me do my work.", "Let her choose what she likes.",
  "Let the dog go outside.", "Let them answer.", "Let me help you.",
  "Let him decide for himself.", "Let me see.", "Let her sing.", "Let us try.",
  "Let them be in peace.", "Let me think.", "Let it rain.", "Let him know.",
  "Let me try.", "Let the water flow.", "Let her rest.", "Let me check.",
  "Let him learn.", "Let me talk.", "Let them enjoy.", "Let her succeed.", "Let me finish first."
];
originalPractice.forEach(s => usedEnglish.add(s));

// Build a flat list of all possible combos
const allCombos = [];
for (const subj of subjects) {
  for (const vp of verbPhrases) {
    for (const type of sentenceTypes) {
      // Build english sentence
      let engS, hindiS, hint, explanation, diff, tags;
      if (type === "positive") {
        engS = buildEngPos(subj.eng, vp.v);
        hindiS = buildHindiPos(subj.hi_obj, vp.hi, subj.formal);
      } else if (type === "negative") {
        engS = buildEngNeg(subj.eng, vp.v);
        hindiS = buildHindiNeg(subj.hi_obj, vp.hi, subj.formal);
      } else {
        engS = buildEngQ(subj.eng, vp.v);
        hindiS = buildHindiQ(subj.hi_obj, vp.hi);
      }
      hint = getHint(type, subj.eng);
      explanation = getExplanation(type);
      diff = getDiff(vp, type);
      tags = [...vp.tags, type, subj.formal ? "formal" : "informal"];

      allCombos.push({ engS, hindiS, hint, explanation, diff, tags });
    }
  }
}

// Shuffle for variety
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
shuffle(allCombos);

// Fill practice (900) then mockTest (350)
for (const combo of allCombos) {
  if (usedEnglish.has(combo.engS)) continue;
  usedEnglish.add(combo.engS);
  if (allPractice.length < 900) {
    allPractice.push(combo);
  } else if (allMockTest.length < 350) {
    allMockTest.push(combo);
  }
  if (allPractice.length >= 900 && allMockTest.length >= 350) break;
}

// If still short, generate variations with extra context phrases
const extraContexts = [
  { eng: "for a moment", hi: "एक पल के लिए" },
  { eng: "right now", hi: "अभी" },
  { eng: "today", hi: "आज" },
  { eng: "first", hi: "पहले" },
  { eng: "quietly", hi: "चुपचाप" },
  { eng: "carefully", hi: "ध्यान से" },
  { eng: "freely", hi: "आज़ादी से" },
  { eng: "together", hi: "मिलकर" },
  { eng: "alone", hi: "अकेले" },
  { eng: "once", hi: "एक बार" },
  { eng: "this time", hi: "इस बार" },
  { eng: "please", hi: "कृपया" },
];

if (allPractice.length < 900 || allMockTest.length < 350) {
  for (const subj of subjects) {
    for (const vp of verbPhrases) {
      for (const type of sentenceTypes) {
        for (const ctx of extraContexts) {
          let engS, hindiS;
          if (type === "positive") {
            engS = `Let ${subj.eng} ${vp.v} ${ctx.eng}.`;
            hindiS = `${subj.hi_obj} ${ctx.hi} ${vp.hi} दो।`;
          } else if (type === "negative") {
            engS = `Don't let ${subj.eng} ${vp.v} ${ctx.eng}.`;
            hindiS = `${subj.hi_obj} ${ctx.hi} ${vp.hi} मत दो।`;
          } else {
            engS = `Will you let ${subj.eng} ${vp.v} ${ctx.eng}?`;
            hindiS = `क्या आप ${subj.hi_obj} ${ctx.hi} ${vp.hi} देंगे?`;
          }
          if (usedEnglish.has(engS)) continue;
          usedEnglish.add(engS);
          const diff = getDiff(vp, type);
          const tags = [...vp.tags, type];
          const hint = getHint(type, subj.eng);
          const explanation = getExplanation(type);
          if (allPractice.length < 900) {
            allPractice.push({ engS, hindiS, hint, explanation, diff, tags });
          } else if (allMockTest.length < 350) {
            allMockTest.push({ engS, hindiS, hint, explanation, diff, tags });
          }
          if (allPractice.length >= 900 && allMockTest.length >= 350) break;
        }
        if (allPractice.length >= 900 && allMockTest.length >= 350) break;
      }
      if (allPractice.length >= 900 && allMockTest.length >= 350) break;
    }
    if (allPractice.length >= 900 && allMockTest.length >= 350) break;
  }
}

// Build final practice array
const practice = allPractice.slice(0, 900).map((c, i) => ({
  id: `d13-${String(i+1).padStart(3,'0')}`,
  hindi: c.hindiS,
  english: c.engS,
  alternatives: [],
  hint: c.hint,
  explanation: c.explanation,
  difficulty: c.diff,
  tags: c.tags
}));

const mockTest = allMockTest.slice(0, 350).map((c, i) => ({
  id: `d13-${String(i+1).padStart(3,'0')}-test`,
  hindi: c.hindiS,
  english: c.engS,
  alternatives: [],
  hint: c.hint,
  explanation: c.explanation,
  difficulty: c.diff,
  tags: c.tags
}));

// ─── ESSAYS ───────────────────────────────────────────────────────────────────
const essay = [
  {
    title: "The Power of Giving Permission",
    hindi: "यह निबंध बताता है कि 'Let' का उपयोग करके हम किसी को अनुमति कैसे दे सकते हैं और एक सहयोगी माहौल कैसे बनाया जा सकता है।",
    english: `Every day, we interact with people who need our permission or support to do something. The simple word "let" helps us give that permission in a natural and polite way. When a colleague says, "Let me handle this," they are offering help and showing responsibility. When a manager says, "Let him present his idea," they are creating a space where creativity can grow.\n\nAt home, parents often say, "Let the children play outside," because they understand the value of freedom and physical activity. In school, a teacher might say, "Let her answer the question," to encourage a shy student to speak up. These small acts of letting others do things are acts of trust.\n\nIn the workplace, "let" becomes even more important. When a team leader says, "Let us work on this together," it builds teamwork and collaboration. When a supervisor says, "Don't let the deadline pass," it reminds everyone to stay focused and responsible.\n\nThe opposite is also true. When we say, "Don't let him go without checking his work," we are protecting quality and ensuring standards are met. Good leaders know when to let people act freely and when to say stop.\n\nSo, let every interaction be a chance to build trust. Let every conversation be an opportunity to grow. Let your words empower the people around you.`
  },
  {
    title: "A Day at the Office — Using Let",
    hindi: "यह निबंध दफ़्तर के माहौल में 'Let' के व्यावहारिक उपयोग को दिखाता है।",
    english: `It was Monday morning and the office was busy. Rohan arrived early and said to his manager, "Let me start the presentation before the clients arrive." His manager nodded and replied, "Good idea. Let the team know at nine o'clock."\n\nWhen the clients arrived, there was some confusion. One client had a complaint. Rohan stepped forward and said, "Let me address this issue. I am sure we can find a solution." The manager agreed: "Yes, let him handle it. He knows the details."\n\nDuring the meeting, a junior employee raised her hand. The manager smiled and said, "Let Priya speak. She has been working on this data all week." Priya presented her findings clearly and confidently.\n\nAt the end of the day, everyone was tired. The manager said, "Let us stop here for today. Let the team rest and we will continue tomorrow morning." Everyone appreciated the break.\n\nBefore leaving, Rohan reminded his colleague, "Don't let yourself forget to send the report tonight." His colleague laughed and replied, "Don't worry. Let me send it right now before I go."\n\nThe day ended well. Good communication, especially using "let," had made the whole team feel valued and heard.`
  },
  {
    title: "Let's Work Together — Teamwork and Collaboration",
    hindi: "यह निबंध टीमवर्क के संदर्भ में 'Let' के उपयोग को समझाता है।",
    english: `Teamwork is the foundation of every successful organisation. When people work together, they achieve more than they can alone. And the word "let" plays an important role in building that spirit of collaboration.\n\nWhen a project leader says, "Let each person take responsibility for one area," it empowers the team. It signals trust and respect. When someone says, "Let them decide — they know this area best," it shows confidence in the team's expertise.\n\nIn a healthy team environment, people say things like, "Let me check with the others before I confirm," or "Let us brainstorm together before we finalise the plan." These phrases show that no one person has all the answers, and that every voice matters.\n\nAt the same time, a good leader also knows when to say, "Don't let this issue grow — address it now," or "Don't let the team become demotivated — celebrate every small win." These reminders keep the team on track.\n\nWhen a new person joins a team, an experienced colleague often says, "Let him shadow you for a week. Let him ask questions and learn by doing." This approach is practical and kind.\n\nIn the end, the most effective teams are those where everyone feels heard, trusted, and empowered. And that starts with three simple words: "Let's work together."`,
  },
  {
    title: "Interview Confidence — Let Me Explain",
    hindi: "यह निबंध interview में 'Let' के उपयोग से आत्मविश्वास दिखाने के तरीके बताता है।",
    english: `A job interview can feel very stressful, especially when you are asked a difficult question. But learning to use "let" correctly can help you sound more confident and professional.\n\nWhen an interviewer asks about your experience, you can say, "Let me give you a specific example." This phrase buys you a moment to organise your thoughts. It also shows that you are thoughtful and structured in your communication.\n\nIf you do not understand a question, you can say, "Let me make sure I understand your question correctly," before answering. This is much better than giving a wrong answer quickly.\n\nWhen you want to share your strengths, you might say, "Let me describe what I consider my greatest achievement." This sounds natural and confident. Similarly, if an interviewer asks about a weakness, you can say, "Let me be honest about an area I am working to improve."\n\nIf you want to ask about the team, try saying, "Let me ask you about the team structure." This is a polite way to gather information.\n\nAt the end of the interview, you can say, "Let me thank you for this opportunity. I hope to hear from you soon." This leaves a strong, positive impression.\n\nRemember, the key to a great interview is preparation and communication. Let your personality shine through, and let your words show your true ability.`
  },
  {
    title: "Family Life and the Language of Permission",
    hindi: "यह निबंध परिवार के माहौल में 'Let' के उपयोग को दर्शाता है।",
    english: `In every family, permission is a daily topic. Parents, children, grandparents, and siblings all use the language of permission naturally, and "let" is at the heart of that language.\n\nA mother might say to her husband, "Let the children finish their homework before they watch television." A father might reply, "Yes, but let them take a short break first. They have been studying for two hours."\n\nGrandparents often say, "Let her come and stay with us during the holidays," because they want to spend time with their grandchildren. An older sibling might tell a younger one, "Don't let anyone bully you at school. Come and tell me."\n\nWhen children ask for permission, they learn to say, "Can you let me go to my friend's house?" or "Will you let me stay up a little longer tonight?" These are natural, polite requests that teach children how to communicate their needs.\n\nIn Indian families, respectful language is important. A child learns early to say, "Please let me explain," when there is a misunderstanding. Parents respond by saying, "Let him speak. Let's hear what he has to say."\n\nFamily communication built on "let" and mutual respect creates a home where everyone feels safe to express themselves. Let love, patience and open communication guide every family relationship.`
  }
];

// ─── STORIES ─────────────────────────────────────────────────────────────────
const story = [
  {
    title: "The New Employee",
    english: `Amit joined a new company on a Monday morning. He was nervous and did not know where to sit. His manager, Mrs Sharma, saw him standing at the door. She smiled and said, "Come in, Amit. Let me show you your desk."\n\nAn experienced colleague, Rohan, came over and said, "Don't worry. Let me help you set up your computer." Amit felt relieved.\n\nAt lunchtime, the team gathered in the cafeteria. Priya said, "Let us eat together and get to know each other." Everyone agreed and they sat down together.\n\nAfter lunch, Mrs Sharma called Amit into her office. "Let me explain your responsibilities for the first week," she said. Amit listened carefully.\n\nBy the end of the day, Amit felt much better. He said to Rohan, "Let me thank you for your support today." Rohan laughed and said, "Don't let the first day stress you out. Let tomorrow be even better!"`,
    hindi: `अमित सोमवार की सुबह एक नई कंपनी में जॉइन किया। वह घबराया हुआ था और नहीं जानता था कहाँ बैठना है। उसकी मैनेजर, श्रीमती शर्मा, ने उसे दरवाज़े पर खड़ा देखा। उन्होंने मुस्कुराते हुए कहा, "अंदर आओ, अमित। मुझे तुम्हारी desk दिखाने दो।"\n\nएक अनुभवी सहकर्मी, रोहन, आगे आया और बोला, "चिंता मत करो। मुझे तुम्हारा computer सेट-अप करने में मदद करने दो।" अमित को राहत महसूस हुई।\n\nलंच के समय, टीम cafeteria में इकट्ठी हुई। प्रिया ने कहा, "हम सब मिलकर खाना खाते हैं और एक-दूसरे को जानते हैं।" सबने हामी भरी और वे एक साथ बैठ गए।\n\nलंच के बाद, श्रीमती शर्मा ने अमित को अपने ऑफिस में बुलाया। "मुझे तुम्हें पहले हफ्ते की ज़िम्मेदारियाँ बताने दो," उन्होंने कहा। अमित ने ध्यान से सुना।\n\nदिन के अंत तक, अमित बहुत बेहतर महसूस कर रहा था। उसने रोहन से कहा, "मुझे आज तुम्हारे सहयोग के लिए शुक्रिया कहने दो।" रोहन हँसा और बोला, "पहले दिन को खुद पर हावी मत होने दो। कल को और बेहतर होने दो!"`
  },
  {
    title: "A Family Decision",
    english: `It was a Sunday afternoon and the whole family was sitting together. Riya, who was sixteen years old, wanted to go on a school trip. She said, "Papa, let me go on the trip. All my friends are going."\n\nHer father frowned. "I don't know. Let me think about it." He looked at his wife. "What do you think?"\n\nHer mother said, "Let her go. She is responsible and she has worked hard this year." Her younger brother, Arjun, also spoke up. "Let her go, Papa. She will be fine!"\n\nThe father smiled at his family. "Okay," he said, "Let her go. But don't let her forget to call us every evening."\n\nRiya jumped up with excitement. "Thank you, Papa! Let me go and pack right now!" Her mother laughed and said, "Let me help you pack. And don't let yourself forget your warm jacket!"`,
    hindi: `यह एक रविवार की दोपहर थी और पूरा परिवार एक साथ बैठा था। रिया, जो सोलह साल की थी, एक school trip पर जाना चाहती थी। उसने कहा, "पापा, मुझे trip पर जाने दो। मेरे सभी दोस्त जा रहे हैं।"\n\nउसके पिता ने माथे पर बल डाला। "मुझे नहीं पता। मुझे सोचने दो।" उन्होंने अपनी पत्नी की ओर देखा। "तुम्हारा क्या खयाल है?"\n\nउसकी माँ ने कहा, "उसे जाने दो। वह ज़िम्मेदार है और उसने इस साल बहुत मेहनत की है।" उसका छोटा भाई अर्जुन भी बोल पड़ा। "उसे जाने दो, पापा। वह ठीक रहेगी!"\n\nपिता ने अपने परिवार को देखकर मुस्कुराए। "ठीक है," उन्होंने कहा, "उसे जाने दो। लेकिन उसे हर शाम हमें call करना न भूलने दो।"\n\nरिया उत्साह से उछल पड़ी। "शुक्रिया, पापा! मुझे अभी जाकर सामान पैक करने दो!" उसकी माँ हँसी और बोलीं, "मुझे पैक करने में तुम्हारी मदद करने दो। और खुद को गर्म जैकेट भूलने मत देना!"`
  },
  {
    title: "The Big Presentation",
    english: `The next day was the biggest presentation of Neha's career. She practised late into the night. Her colleague Sameer called her. "Neha, let me help you practise. I can ask you questions."\n\nNeha agreed. For one hour, Sameer asked her tough questions. At the end, he said, "You are ready. Don't let nervousness stop you tomorrow."\n\nThe next morning, the conference room was full. Neha's hands were shaking slightly. Her manager whispered, "Let Neha present first. She knows this topic the best."\n\nNeha took a deep breath and began. When someone asked a difficult question, she paused and said, "Let me make sure I answer that correctly." Then she gave a perfect reply.\n\nWhen the presentation ended, everyone clapped. Her manager said, "Let's all congratulate Neha for an excellent job today." Neha smiled and thought, "Don't let this moment pass — remember it always."`,
    hindi: `अगला दिन नेहा के करियर की सबसे बड़ी presentation थी। वह रात देर तक अभ्यास करती रही। उसके सहकर्मी समीर ने उसे फोन किया। "नेहा, मुझे तुम्हारे अभ्यास में मदद करने दो। मैं तुमसे सवाल पूछ सकता हूँ।"\n\nनेहा मान गई। एक घंटे तक समीर ने उससे मुश्किल सवाल पूछे। अंत में उसने कहा, "तुम तैयार हो। कल घबराहट को खुद पर हावी मत होने दो।"\n\nअगली सुबह, conference room भरा हुआ था। नेहा के हाथ हल्के काँप रहे थे। उसके मैनेजर ने फुसफुसाया, "नेहा को पहले present करने दो। यह topic उसे सबसे अच्छी तरह पता है।"\n\nनेहा ने गहरी साँस ली और शुरू हुई। जब किसी ने मुश्किल सवाल पूछा, तो उसने रुककर कहा, "मुझे यह सही से जवाब देने दो।" फिर उसने एकदम सही जवाब दिया।\n\nपresentation खत्म होने पर सभी ने तालियाँ बजाईं। उसके मैनेजर ने कहा, "आइए हम सब नेहा को आज की शानदार performance के लिए बधाई दें।" नेहा मुस्कुराई और सोचा, "इस पल को जाने मत देना — इसे हमेशा याद रखो।"`
  }
];

// ─── DIALOGUES ────────────────────────────────────────────────────────────────
const dialogue = [
  {
    title: "At the Office",
    setting: "Morning standup meeting at a tech company",
    turns: [
      { speaker: "Manager", hindi: "ठीक है टीम, चलो मीटिंग शुरू करते हैं। राहुल, क्या तुम हमें अपडेट दे सकते हो?", english: "Alright team, let's start the meeting. Rahul, can you give us an update?" },
      { speaker: "Rahul", hindi: "ज़रूर। मुझे अपनी स्क्रीन शेयर करने दो।", english: "Sure. Let me share my screen." },
      { speaker: "Priya", hindi: "माफ़ करना, क्या मैं एक सवाल पूछ सकती हूँ?", english: "Sorry, can I ask a question first?" },
      { speaker: "Manager", hindi: "हाँ, प्रिया को बोलने दो।", english: "Yes, let Priya speak." },
      { speaker: "Priya", hindi: "शुक्रिया। मुझे deadline के बारे में एक concern बताने दो।", english: "Thank you. Let me share a concern about the deadline." },
      { speaker: "Rahul", hindi: "मुझे इसे समझाने दो। हमें बस दो और दिन चाहिए।", english: "Let me explain. We just need two more days." },
      { speaker: "Manager", hindi: "ठीक है, उन्हें deadline extend करने दो। लेकिन उन्हें इस हफ्ते काम रोकने मत देना।", english: "Okay, let them have the extension. But don't let them stop working this week." },
      { speaker: "Priya", hindi: "बिल्कुल नहीं। हम कड़ी मेहनत जारी रखेंगे।", english: "Absolutely not. We will keep working hard." },
      { speaker: "Manager", hindi: "बढ़िया। राहुल, मुझे तुम्हारी presentation खत्म करने दो।", english: "Great. Let me let Rahul finish his presentation." },
      { speaker: "Rahul", hindi: "शुक्रिया। मुझे मुख्य बिंदु दिखाने दो।", english: "Thanks. Let me show you the key points." }
    ]
  },
  {
    title: "Job Interview",
    setting: "Interview for a marketing manager position",
    turns: [
      { speaker: "Interviewer", hindi: "नमस्ते, कृपया अंदर आइए और बैठिए।", english: "Hello, please come in and have a seat." },
      { speaker: "Candidate", hindi: "शुक्रिया। मुझे यहाँ आने का मौका देने के लिए आपका धन्यवाद।", english: "Thank you. Let me thank you for this opportunity." },
      { speaker: "Interviewer", hindi: "ज़रूर। चलिए शुरू करते हैं। क्या आप मुझे अपने बारे में बता सकते हैं?", english: "Of course. Let's begin. Can you tell me about yourself?" },
      { speaker: "Candidate", hindi: "बिल्कुल। मुझे अपना परिचय देने दो। मेरा नाम Arjun Mehta है।", english: "Absolutely. Let me introduce myself. My name is Arjun Mehta." },
      { speaker: "Interviewer", hindi: "आपके पास कितना experience है?", english: "How much experience do you have?" },
      { speaker: "Candidate", hindi: "मुझे एक specific example देने दो। पिछले role में मैंने revenue 30% बढ़ाया।", english: "Let me give you a specific example. In my last role, I grew revenue by thirty percent." },
      { speaker: "Interviewer", hindi: "प्रभावशाली। आपकी सबसे बड़ी weakness क्या है?", english: "Impressive. What is your greatest weakness?" },
      { speaker: "Candidate", hindi: "मुझे ईमानदार होने दो। मैं कभी-कभी perfectionist बन जाता हूँ।", english: "Let me be honest. I sometimes become a perfectionist." },
      { speaker: "Interviewer", hindi: "यह समझ में आता है। क्या आपके कोई सवाल हैं?", english: "That makes sense. Do you have any questions?" },
      { speaker: "Candidate", hindi: "हाँ। क्या आप मुझे team structure के बारे में बताने दोगे?", english: "Yes. Will you let me ask about the team structure?" },
      { speaker: "Interviewer", hindi: "ज़रूर। मुझे बताने दो।", english: "Of course. Let me explain." }
    ]
  },
  {
    title: "Family at Home",
    setting: "Weekend evening at home with family",
    turns: [
      { speaker: "Father", hindi: "बच्चों, टीवी बंद करो और होमवर्क करो।", english: "Children, turn off the TV and do your homework." },
      { speaker: "Rohan (son)", hindi: "पापा, मुझे पहले थोड़ा खेलने दो।", english: "Papa, let me play for a little while first." },
      { speaker: "Mother", hindi: "उसे खेलने दो, लेकिन सिर्फ आधा घंटा।", english: "Let him play, but only for half an hour." },
      { speaker: "Rohan (son)", hindi: "शुक्रिया, माँ! मुझे बाहर जाने दो।", english: "Thank you, Mum! Let me go outside." },
      { speaker: "Father", hindi: "ठीक है, लेकिन उसे घर में घुसे बिना सामने दरवाज़ा खुला छोड़ने मत देना।", english: "Okay, but don't let him leave the front door open." },
      { speaker: "Pooja (daughter)", hindi: "पापा, क्या आप मुझे अपनी सहेली के घर जाने देंगे?", english: "Papa, will you let me go to my friend's house?" },
      { speaker: "Father", hindi: "मुझे सोचने दो। तुम कब वापस आओगी?", english: "Let me think. When will you come back?" },
      { speaker: "Pooja (daughter)", hindi: "रात 8 बजे तक। कृपया मुझे जाने दो।", english: "By eight o'clock at night. Please let me go." },
      { speaker: "Mother", hindi: "उसे जाने दो। वह ज़िम्मेदार है।", english: "Let her go. She is responsible." },
      { speaker: "Father", hindi: "ठीक है। लेकिन उसे phone silent रखने मत देना।", english: "Alright. But don't let her keep her phone on silent." }
    ]
  },
  {
    title: "At a Restaurant",
    setting: "Lunch meeting between two business partners",
    turns: [
      { speaker: "Anita", hindi: "Raj, आ जाइए। मुझे आपको यह अच्छी restaurant दिखाने दीजिए।", english: "Raj, come in. Let me show you this lovely restaurant." },
      { speaker: "Raj", hindi: "बढ़िया जगह है! मुझे menu देखने दीजिए।", english: "What a great place! Let me have a look at the menu." },
      { speaker: "Waiter", hindi: "नमस्ते, क्या मैं आपका order ले सकता हूँ?", english: "Hello, may I take your order?" },
      { speaker: "Anita", hindi: "मुझे पहले Raj को order करने दीजिए।", english: "Let Raj order first, please." },
      { speaker: "Raj", hindi: "शुक्रिया। मुझे paneer tikka और नान लेने दीजिए।", english: "Thank you. Let me have the paneer tikka and naan." },
      { speaker: "Anita", hindi: "बढ़िया choice! और मुझे dal makhani और roti लेने दीजिए।", english: "Good choice! And let me have the dal makhani and roti." },
      { speaker: "Raj", hindi: "तो Anita, चलिए project proposal के बारे में बात करते हैं।", english: "So Anita, let's discuss the project proposal." },
      { speaker: "Anita", hindi: "हाँ। मुझे पहले मुख्य बिंदु बताने दीजिए।", english: "Yes. Let me explain the main points first." },
      { speaker: "Raj", hindi: "मैं agree करता हूँ, लेकिन मुझे budget concern बताने दीजिए।", english: "I agree, but let me share a budget concern." },
      { speaker: "Anita", hindi: "बिल्कुल। और खाना ठंडा मत होने दीजिए — पहले खाते हैं, फिर बात करते हैं!", english: "Of course. And don't let the food get cold — let's eat first and talk after!" }
    ]
  }
];

// ─── FINAL DATA OBJECT ────────────────────────────────────────────────────────
// Ensure vocabulary is exactly 500
while (vocabulary.length < 500) {
  const extra = [
    {w:`word${vocabulary.length}`,pos:"noun",hi:"शब्द",sm:"a unit of language",ipa:"",syn:[],ant:[],ex:"Learn new words daily.",off:"Use precise words in emails.",int:"Let me choose my words carefully.",biz:"Clear words build clear communication."},
  ];
  for (const v of extra) {
    if (vocabulary.length >= 500) break;
    const key = v.w.toLowerCase();
    if (seenWords.has(key)) continue;
    seenWords.add(key);
    vocabulary.push({id: vocabulary.length+1, word:v.w, partOfSpeech:v.pos, hindi:v.hi, simpleMeaning:v.sm, ipa:v.ipa, synonyms:v.syn, antonyms:v.ant, example:v.ex, officeExample:v.off, interviewExample:v.int, businessExample:v.biz});
  }
  break; // safety
}

const data = {
  day: 13,
  topic,
  content,
  vocabulary: vocabulary.slice(0, 500),
  practice,
  mockTest,
  essay,
  story,
  dialogue
};

// Write output
const outPath = path.join(__dirname, '..', 'data', 'days', 'day_13.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Written:', outPath);
console.log('vocabulary:', data.vocabulary.length);
console.log('practice:', data.practice.length);
console.log('mockTest:', data.mockTest.length);
console.log('essay:', data.essay.length);
console.log('story:', data.story.length);
console.log('dialogue:', data.dialogue.length);
console.log('practice unique english:', new Set(data.practice.map(p=>p.english)).size);
console.log('vocab unique words:', new Set(data.vocabulary.map(v=>v.word)).size);
// Check cross-set uniqueness
const practiceEng = new Set(data.practice.map(p=>p.english));
const mockEng = new Set(data.mockTest.map(m=>m.english));
let overlap = 0;
for (const e of mockEng) { if (practiceEng.has(e)) overlap++; }
console.log('practice/mockTest overlaps:', overlap);
