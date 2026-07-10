#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

// ─── VOCABULARY BANK (500 entries) ───────────────────────────────────────────
const vocabRaw = [
  // VERBS
  {word:"achieve",pos:"verb",hindi:"हासिल करना",simple:"To successfully reach a goal",ipa:"/əˈtʃiːv/",syn:["accomplish","attain","reach"],ant:["fail","miss"],ex:"Let's achieve our targets this month.",off:"Let's achieve the sales target before Friday.",intv:"I always strive to achieve my goals on time.",biz:"Let's achieve a 20% growth this quarter."},
  {word:"adapt",pos:"verb",hindi:"अनुकूल होना",simple:"To adjust to new conditions",ipa:"/əˈdæpt/",syn:["adjust","modify","conform"],ant:["resist","reject"],ex:"Let's adapt to the new system quickly.",off:"Let's adapt our workflow to the new software.",intv:"I can adapt easily to changing environments.",biz:"Let's adapt our strategy to market changes."},
  {word:"advise",pos:"verb",hindi:"सलाह देना",simple:"To give a recommendation",ipa:"/ədˈvaɪz/",syn:["suggest","recommend","counsel"],ant:["mislead","deceive"],ex:"Let me advise you on this matter.",off:"Let's advise the team before the deadline.",intv:"I can advise junior colleagues effectively.",biz:"Let's advise our client on the best approach."},
  {word:"agree",pos:"verb",hindi:"सहमत होना",simple:"To have the same opinion",ipa:"/əˈɡriː/",syn:["consent","concur","accept"],ant:["disagree","refuse","deny"],ex:"Let's agree on a time to meet.",off:"Let's agree on the project deadline.",intv:"I agree with the company's core values.",biz:"Let's agree on the contract terms today."},
  {word:"analyse",pos:"verb",hindi:"विश्लेषण करना",simple:"To examine in detail",ipa:"/ˈænəlaɪz/",syn:["examine","study","evaluate"],ant:["ignore","overlook"],ex:"Let's analyse the data carefully.",off:"Let's analyse last month's performance report.",intv:"I analyse problems before suggesting solutions.",biz:"Let's analyse the market before launching."},
  {word:"announce",pos:"verb",hindi:"घोषणा करना",simple:"To make something known publicly",ipa:"/əˈnaʊns/",syn:["declare","proclaim","reveal"],ant:["conceal","hide"],ex:"Let's announce the good news together.",off:"Let's announce the new policy tomorrow.",intv:"I am comfortable announcing results to a team.",biz:"Let's announce the merger at the press conference."},
  {word:"apply",pos:"verb",hindi:"आवेदन करना / लागू करना",simple:"To make a formal request or put into use",ipa:"/əˈplaɪ/",syn:["request","submit","use"],ant:["withdraw","remove"],ex:"Let's apply for the scholarship now.",off:"Let's apply the new guidelines from Monday.",intv:"I applied for this role because I believe in growth.",biz:"Let's apply best practices across all departments."},
  {word:"arrange",pos:"verb",hindi:"व्यवस्था करना",simple:"To put in order or plan",ipa:"/əˈreɪndʒ/",syn:["organise","plan","schedule"],ant:["disarrange","disorder"],ex:"Let's arrange the chairs before the guests arrive.",off:"Let's arrange a meeting for next week.",intv:"I can arrange tasks efficiently under pressure.",biz:"Let's arrange a client visit this month."},
  {word:"assist",pos:"verb",hindi:"सहायता करना",simple:"To help or support someone",ipa:"/əˈsɪst/",syn:["help","support","aid"],ant:["hinder","obstruct"],ex:"Let's assist the new employee with onboarding.",off:"Let's assist the team during peak hours.",intv:"I love to assist colleagues when they face challenges.",biz:"Let's assist our partner company with the launch."},
  {word:"attempt",pos:"verb",hindi:"कोशिश करना",simple:"To try to do something",ipa:"/əˈtempt/",syn:["try","endeavour","strive"],ant:["abandon","give up"],ex:"Let's attempt the difficult questions first.",off:"Let's attempt to finish the report today.",intv:"I always attempt new challenges with confidence.",biz:"Let's attempt to break into the new market."},
  {word:"avoid",pos:"verb",hindi:"बचना / टालना",simple:"To stay away from something",ipa:"/əˈvɔɪd/",syn:["evade","escape","shun"],ant:["confront","face","meet"],ex:"Let's avoid unnecessary arguments.",off:"Let's avoid sending emails after office hours.",intv:"I try to avoid mistakes by double-checking my work.",biz:"Let's avoid overspending on the marketing budget."},
  {word:"benefit",pos:"verb",hindi:"लाभ उठाना",simple:"To gain an advantage from something",ipa:"/ˈbenɪfɪt/",syn:["gain","profit","help"],ant:["harm","hurt"],ex:"Let's benefit from this opportunity.",off:"Let's benefit from the training programme.",intv:"Everyone benefits when the team works well together.",biz:"Let's benefit from the new tax incentives."},
  {word:"build",pos:"verb",hindi:"बनाना / निर्माण करना",simple:"To construct or develop",ipa:"/bɪld/",syn:["construct","develop","create"],ant:["destroy","demolish"],ex:"Let's build a stronger friendship.",off:"Let's build a better process for approvals.",intv:"I want to build on my existing skills.",biz:"Let's build a strong client relationship."},
  {word:"celebrate",pos:"verb",hindi:"जश्न मनाना",simple:"To mark a happy occasion",ipa:"/ˈselɪbreɪt/",syn:["rejoice","commemorate","honour"],ant:["mourn","grieve"],ex:"Let's celebrate your promotion!",off:"Let's celebrate the team's success today.",intv:"I believe in celebrating small wins at work.",biz:"Let's celebrate reaching our annual target."},
  {word:"clarify",pos:"verb",hindi:"स्पष्ट करना",simple:"To make something easier to understand",ipa:"/ˈklærɪfaɪ/",syn:["explain","clear up","elaborate"],ant:["confuse","obscure"],ex:"Let's clarify the instructions before starting.",off:"Let's clarify roles before the project begins.",intv:"I always clarify doubts before starting a task.",biz:"Let's clarify the deliverables with the client."},
  {word:"collaborate",pos:"verb",hindi:"मिलकर काम करना",simple:"To work jointly with others",ipa:"/kəˈlæbəreɪt/",syn:["cooperate","partner","work together"],ant:["compete","oppose"],ex:"Let's collaborate on this project.",off:"Let's collaborate across departments.",intv:"I thrive when I collaborate with talented teams.",biz:"Let's collaborate with the marketing team."},
  {word:"commit",pos:"verb",hindi:"प्रतिबद्ध होना",simple:"To pledge or dedicate oneself",ipa:"/kəˈmɪt/",syn:["pledge","dedicate","promise"],ant:["abandon","neglect"],ex:"Let's commit to practising English daily.",off:"Let's commit to meeting every Monday.",intv:"I commit fully to every project I take on.",biz:"Let's commit to this partnership long term."},
  {word:"communicate",pos:"verb",hindi:"संवाद करना",simple:"To share information with others",ipa:"/kəˈmjuːnɪkeɪt/",syn:["convey","express","inform"],ant:["conceal","withhold"],ex:"Let's communicate more openly.",off:"Let's communicate the changes to the entire team.",intv:"Strong communication is my key strength.",biz:"Let's communicate our vision clearly to stakeholders."},
  {word:"compare",pos:"verb",hindi:"तुलना करना",simple:"To examine differences and similarities",ipa:"/kəmˈpeər/",syn:["contrast","evaluate","assess"],ant:[],ex:"Let's compare the two options.",off:"Let's compare the proposals before deciding.",intv:"I compare alternatives before making decisions.",biz:"Let's compare vendors and choose the best one."},
  {word:"complete",pos:"verb",hindi:"पूरा करना",simple:"To finish something",ipa:"/kəmˈpliːt/",syn:["finish","accomplish","finalise"],ant:["abandon","start"],ex:"Let's complete the assignment together.",off:"Let's complete the audit by Thursday.",intv:"I always complete tasks before the deadline.",biz:"Let's complete the project on schedule."},
  {word:"confirm",pos:"verb",hindi:"पुष्टि करना",simple:"To make certain or establish firmly",ipa:"/kənˈfɜːm/",syn:["verify","validate","affirm"],ant:["deny","cancel","refute"],ex:"Let's confirm the plan before moving ahead.",off:"Let's confirm the meeting time with everyone.",intv:"I confirmed my availability for the interview immediately.",biz:"Let's confirm the order before the deadline."},
  {word:"contribute",pos:"verb",hindi:"योगदान देना",simple:"To give or add to something",ipa:"/kənˈtrɪbjuːt/",syn:["give","add","donate"],ant:["take","withhold"],ex:"Let's contribute to the community project.",off:"Let's contribute ideas in the brainstorming session.",intv:"I want to contribute meaningfully to this organisation.",biz:"Let's contribute a portion of profits to CSR."},
  {word:"coordinate",pos:"verb",hindi:"समन्वय करना",simple:"To organise people or activities effectively",ipa:"/kəʊˈɔːdɪneɪt/",syn:["organise","manage","align"],ant:["disrupt","disorder"],ex:"Let's coordinate our efforts.",off:"Let's coordinate with all departments.",intv:"I can coordinate multiple tasks simultaneously.",biz:"Let's coordinate the launch activities across regions."},
  {word:"create",pos:"verb",hindi:"बनाना / सृजन करना",simple:"To bring something new into existence",ipa:"/kriˈeɪt/",syn:["make","design","develop"],ant:["destroy","eliminate"],ex:"Let's create something amazing.",off:"Let's create a shared document for notes.",intv:"I enjoy creating innovative solutions.",biz:"Let's create a go-to-market strategy."},
  {word:"decide",pos:"verb",hindi:"निर्णय लेना",simple:"To make a choice",ipa:"/dɪˈsaɪd/",syn:["choose","determine","resolve"],ant:["hesitate","waver"],ex:"Let's decide quickly.",off:"Let's decide the agenda for tomorrow's meeting.",intv:"I can decide under pressure without hesitation.",biz:"Let's decide on the final budget allocation."},
  {word:"deliver",pos:"verb",hindi:"देना / वितरित करना",simple:"To bring or provide something",ipa:"/dɪˈlɪvər/",syn:["provide","hand over","present"],ant:["withhold","retain"],ex:"Let's deliver the best work possible.",off:"Let's deliver the report by end of day.",intv:"I consistently deliver quality results.",biz:"Let's deliver value to our clients every time."},
  {word:"design",pos:"verb",hindi:"डिज़ाइन करना",simple:"To plan and create something",ipa:"/dɪˈzaɪn/",syn:["create","plan","develop"],ant:["destroy","demolish"],ex:"Let's design a better layout.",off:"Let's design a user-friendly process.",intv:"I designed the company's new onboarding system.",biz:"Let's design a product that solves real problems."},
  {word:"discuss",pos:"verb",hindi:"चर्चा करना",simple:"To talk about something in detail",ipa:"/dɪˈskʌs/",syn:["talk about","debate","confer"],ant:[],ex:"Let's discuss the plan.",off:"Let's discuss the feedback from last week.",intv:"I like to discuss ideas openly with my team.",biz:"Let's discuss the contract terms with legal."},
  {word:"encourage",pos:"verb",hindi:"प्रोत्साहित करना",simple:"To give support or confidence to someone",ipa:"/ɪnˈkʌrɪdʒ/",syn:["motivate","inspire","support"],ant:["discourage","demotivate"],ex:"Let's encourage each other every day.",off:"Let's encourage a culture of feedback.",intv:"I encourage my peers to share ideas freely.",biz:"Let's encourage innovation at every level."},
  {word:"engage",pos:"verb",hindi:"जुड़ना / संलग्न होना",simple:"To involve or participate actively",ipa:"/ɪnˈɡeɪdʒ/",syn:["involve","participate","connect"],ant:["disengage","withdraw"],ex:"Let's engage with the community.",off:"Let's engage all team members in the discussion.",intv:"I engage with stakeholders at all levels.",biz:"Let's engage our customers through social media."},
  {word:"evaluate",pos:"verb",hindi:"मूल्यांकन करना",simple:"To assess or judge something carefully",ipa:"/ɪˈvæljueɪt/",syn:["assess","judge","appraise"],ant:[],ex:"Let's evaluate all the options.",off:"Let's evaluate the team's quarterly performance.",intv:"I evaluate my own work honestly.",biz:"Let's evaluate the ROI before investing."},
  {word:"explore",pos:"verb",hindi:"खोजना / जानकारी लेना",simple:"To investigate or discover new things",ipa:"/ɪkˈsplɔːr/",syn:["investigate","discover","examine"],ant:[],ex:"Let's explore the new area.",off:"Let's explore new tools to improve productivity.",intv:"I love to explore innovative approaches.",biz:"Let's explore new revenue streams."},
  {word:"focus",pos:"verb",hindi:"ध्यान केंद्रित करना",simple:"To concentrate on something",ipa:"/ˈfəʊkəs/",syn:["concentrate","direct","centre"],ant:["distract","scatter"],ex:"Let's focus on the main points.",off:"Let's focus on high-priority tasks today.",intv:"I stay focused even under tight deadlines.",biz:"Let's focus our budget on digital marketing."},
  {word:"improve",pos:"verb",hindi:"सुधार करना",simple:"To make or become better",ipa:"/ɪmˈpruːv/",syn:["enhance","better","develop"],ant:["worsen","deteriorate"],ex:"Let's improve our daily habits.",off:"Let's improve the customer onboarding process.",intv:"I continuously look for ways to improve myself.",biz:"Let's improve our product quality this quarter."},
  {word:"include",pos:"verb",hindi:"शामिल करना",simple:"To make part of a group",ipa:"/ɪnˈkluːd/",syn:["involve","add","incorporate"],ant:["exclude","omit"],ex:"Let's include everyone in the plan.",off:"Let's include the design team in the kickoff.",intv:"I believe in including diverse perspectives.",biz:"Let's include all stakeholders in the review."},
  {word:"increase",pos:"verb",hindi:"बढ़ाना",simple:"To make something larger or greater",ipa:"/ɪnˈkriːs/",syn:["raise","grow","expand"],ant:["decrease","reduce"],ex:"Let's increase our daily practice.",off:"Let's increase our efficiency by 15%.",intv:"I helped increase customer satisfaction scores.",biz:"Let's increase our market share this year."},
  {word:"innovate",pos:"verb",hindi:"नई खोज करना / नवाचार करना",simple:"To introduce new ideas or methods",ipa:"/ˈɪnəveɪt/",syn:["create","invent","pioneer"],ant:["copy","imitate"],ex:"Let's innovate instead of following the same old way.",off:"Let's innovate our internal reporting process.",intv:"I am passionate about innovating within my field.",biz:"Let's innovate our product roadmap."},
  {word:"inspire",pos:"verb",hindi:"प्रेरित करना",simple:"To fill someone with motivation",ipa:"/ɪnˈspaɪər/",syn:["motivate","encourage","stimulate"],ant:["discourage","demotivate"],ex:"Let's inspire each other to do better.",off:"Let's inspire our team with a strong vision.",intv:"Great leaders inspire their teams.",biz:"Let's inspire our brand community with stories."},
  {word:"invest",pos:"verb",hindi:"निवेश करना",simple:"To put money or effort into something",ipa:"/ɪnˈvest/",syn:["fund","spend","commit"],ant:["withdraw","divest"],ex:"Let's invest in learning new skills.",off:"Let's invest time in team training.",intv:"I believe in investing in self-development.",biz:"Let's invest in technology to scale operations."},
  {word:"launch",pos:"verb",hindi:"शुरू करना / लॉन्च करना",simple:"To start or introduce something new",ipa:"/lɔːntʃ/",syn:["start","introduce","release"],ant:["end","withdraw","cancel"],ex:"Let's launch the new product next month.",off:"Let's launch the internal newsletter this week.",intv:"I successfully launched a new feature last year.",biz:"Let's launch a pilot programme before going live."},
  {word:"lead",pos:"verb",hindi:"नेतृत्व करना",simple:"To guide or be in charge of",ipa:"/liːd/",syn:["guide","manage","direct"],ant:["follow","obey"],ex:"Let's lead by example.",off:"Let's lead the project with clear milestones.",intv:"I have experience leading cross-functional teams.",biz:"Let's lead the industry with better products."},
  {word:"learn",pos:"verb",hindi:"सीखना",simple:"To gain knowledge or a skill",ipa:"/lɜːn/",syn:["study","discover","master"],ant:["forget","unlearn"],ex:"Let's learn something new every day.",off:"Let's learn from last quarter's mistakes.",intv:"I am always eager to learn new technologies.",biz:"Let's learn from our competitors' strategies."},
  {word:"manage",pos:"verb",hindi:"संभालना / प्रबंधित करना",simple:"To control or be in charge of",ipa:"/ˈmænɪdʒ/",syn:["handle","oversee","direct"],ant:["mismanage","neglect"],ex:"Let's manage our time better.",off:"Let's manage resources efficiently this month.",intv:"I have managed a team of eight people.",biz:"Let's manage costs without sacrificing quality."},
  {word:"motivate",pos:"verb",hindi:"प्रेरित करना",simple:"To provide a reason to act",ipa:"/ˈməʊtɪveɪt/",syn:["inspire","encourage","drive"],ant:["demotivate","discourage"],ex:"Let's motivate each other to keep going.",off:"Let's motivate the team before the big deadline.",intv:"I motivate myself by setting clear daily goals.",biz:"Let's motivate our sales team with incentives."},
  {word:"negotiate",pos:"verb",hindi:"बातचीत करना / सौदेबाज़ी करना",simple:"To discuss to reach an agreement",ipa:"/nɪˈɡəʊʃieɪt/",syn:["bargain","discuss","deal"],ant:[],ex:"Let's negotiate a fair deal.",off:"Let's negotiate the project timeline with the client.",intv:"I can negotiate effectively under pressure.",biz:"Let's negotiate better terms with the supplier."},
  {word:"observe",pos:"verb",hindi:"देखना / निरीक्षण करना",simple:"To notice or watch carefully",ipa:"/əbˈzɜːv/",syn:["watch","notice","monitor"],ant:["ignore","overlook"],ex:"Let's observe how others handle this situation.",off:"Let's observe the new employee's progress.",intv:"I observe carefully before drawing conclusions.",biz:"Let's observe market trends before pivoting."},
  {word:"organise",pos:"verb",hindi:"व्यवस्थित करना",simple:"To arrange in a structured way",ipa:"/ˈɔːɡənaɪz/",syn:["arrange","plan","structure"],ant:["disorganise","disorder"],ex:"Let's organise the desk before work.",off:"Let's organise the data in a spreadsheet.",intv:"I am skilled at organising complex projects.",biz:"Let's organise a product launch event."},
  {word:"participate",pos:"verb",hindi:"भाग लेना",simple:"To take part in something",ipa:"/pɑːˈtɪsɪpeɪt/",syn:["join","engage","contribute"],ant:["withdraw","abstain"],ex:"Let's all participate in the quiz.",off:"Let's participate in the company's annual survey.",intv:"I actively participate in all team activities.",biz:"Let's participate in the industry conference."},
  {word:"plan",pos:"verb",hindi:"योजना बनाना",simple:"To decide in advance what to do",ipa:"/plæn/",syn:["arrange","organise","prepare"],ant:["improvise","neglect"],ex:"Let's plan the trip carefully.",off:"Let's plan the project milestones this week.",intv:"I plan my work for the week every Monday morning.",biz:"Let's plan the quarterly business review."},
  {word:"prepare",pos:"verb",hindi:"तैयारी करना",simple:"To make ready in advance",ipa:"/prɪˈpeər/",syn:["plan","arrange","ready"],ant:["neglect","ignore"],ex:"Let's prepare for the exam together.",off:"Let's prepare the agenda before the meeting.",intv:"I always prepare thoroughly for interviews.",biz:"Let's prepare a detailed proposal for the client."},
  {word:"present",pos:"verb",hindi:"प्रस्तुत करना",simple:"To show or introduce something to others",ipa:"/prɪˈzent/",syn:["show","introduce","display"],ant:["hide","conceal"],ex:"Let's present our ideas to the group.",off:"Let's present the findings to management.",intv:"I can present complex ideas in simple terms.",biz:"Let's present the proposal at next week's board meeting."},
  {word:"prioritise",pos:"verb",hindi:"प्राथमिकता देना",simple:"To put the most important things first",ipa:"/praɪˈɒrɪtaɪz/",syn:["rank","order","emphasise"],ant:["neglect","ignore"],ex:"Let's prioritise our tasks for today.",off:"Let's prioritise the critical bugs first.",intv:"I know how to prioritise in a fast-paced environment.",biz:"Let's prioritise customers with the highest lifetime value."},
  {word:"promote",pos:"verb",hindi:"बढ़ावा देना / प्रचार करना",simple:"To raise awareness or advance something",ipa:"/prəˈməʊt/",syn:["advertise","advance","support"],ant:["demote","suppress"],ex:"Let's promote healthy habits.",off:"Let's promote our brand on social media.",intv:"I helped promote a new internal learning programme.",biz:"Let's promote the product at trade fairs."},
  {word:"propose",pos:"verb",hindi:"प्रस्ताव करना",simple:"To suggest or put forward an idea",ipa:"/prəˈpəʊz/",syn:["suggest","recommend","offer"],ant:["reject","oppose"],ex:"Let's propose a better solution.",off:"Let's propose a new workflow to the manager.",intv:"I proposed a cost-saving idea in my previous job.",biz:"Let's propose a joint venture to the investors."},
  {word:"protect",pos:"verb",hindi:"सुरक्षित करना",simple:"To keep safe from harm",ipa:"/prəˈtekt/",syn:["safeguard","defend","secure"],ant:["harm","expose","neglect"],ex:"Let's protect the environment together.",off:"Let's protect company data with strong passwords.",intv:"I take steps to protect customer information.",biz:"Let's protect our intellectual property legally."},
  {word:"provide",pos:"verb",hindi:"प्रदान करना",simple:"To give or supply something",ipa:"/prəˈvaɪd/",syn:["supply","give","offer"],ant:["withhold","take"],ex:"Let's provide the best service we can.",off:"Let's provide regular feedback to the team.",intv:"I can provide detailed analytical reports.",biz:"Let's provide value-added services to clients."},
  {word:"pursue",pos:"verb",hindi:"पीछा करना / कोशिश जारी रखना",simple:"To continue striving for something",ipa:"/pəˈsjuː/",syn:["chase","follow","seek"],ant:["abandon","give up"],ex:"Let's pursue our dreams without fear.",off:"Let's pursue new business opportunities.",intv:"I pursue excellence in everything I do.",biz:"Let's pursue this market segment aggressively."},
  {word:"recommend",pos:"verb",hindi:"सिफारिश करना",simple:"To suggest something as a good choice",ipa:"/ˌrekəˈmend/",syn:["suggest","advise","endorse"],ant:["warn against","discourage"],ex:"Let's recommend this book to everyone.",off:"Let's recommend a better vendor.",intv:"My manager always recommends me for leadership roles.",biz:"Let's recommend a strategy to the board."},
  {word:"resolve",pos:"verb",hindi:"हल करना / सुलझाना",simple:"To find a solution to a problem",ipa:"/rɪˈzɒlv/",syn:["solve","settle","fix"],ant:["ignore","worsen"],ex:"Let's resolve this issue calmly.",off:"Let's resolve the conflict within the team.",intv:"I resolve problems quickly and methodically.",biz:"Let's resolve the client complaint immediately."},
  {word:"review",pos:"verb",hindi:"समीक्षा करना",simple:"To examine something again carefully",ipa:"/rɪˈvjuː/",syn:["examine","assess","check"],ant:["ignore","overlook"],ex:"Let's review the notes before the test.",off:"Let's review the proposal before sending it.",intv:"I review my work multiple times before submitting.",biz:"Let's review the KPIs at the end of the month."},
  {word:"schedule",pos:"verb",hindi:"अनुसूची बनाना / तय करना",simple:"To plan something for a specific time",ipa:"/ˈʃedjuːl/",syn:["plan","arrange","timetable"],ant:["cancel","postpone"],ex:"Let's schedule a call for tomorrow.",off:"Let's schedule the training for next week.",intv:"I schedule my tasks the night before.",biz:"Let's schedule a product demo for the client."},
  {word:"share",pos:"verb",hindi:"साझा करना",simple:"To give a part of something to others",ipa:"/ʃeər/",syn:["distribute","divide","give"],ant:["keep","withhold","hoard"],ex:"Let's share what we learn.",off:"Let's share the workload fairly.",intv:"I always share credit with my team.",biz:"Let's share the quarterly report with all stakeholders."},
  {word:"simplify",pos:"verb",hindi:"सरल बनाना",simple:"To make something easier to understand",ipa:"/ˈsɪmplɪfaɪ/",syn:["streamline","clarify","ease"],ant:["complicate","confuse"],ex:"Let's simplify these instructions.",off:"Let's simplify the approval process.",intv:"I simplified the reporting template for the team.",biz:"Let's simplify our pricing structure."},
  {word:"solve",pos:"verb",hindi:"हल करना",simple:"To find the answer to a problem",ipa:"/sɒlv/",syn:["fix","resolve","crack"],ant:["ignore","create"],ex:"Let's solve this puzzle together.",off:"Let's solve the technical issue before launch.",intv:"I can solve complex problems calmly.",biz:"Let's solve the supply chain bottleneck."},
  {word:"start",pos:"verb",hindi:"शुरू करना",simple:"To begin something",ipa:"/stɑːt/",syn:["begin","commence","initiate"],ant:["stop","end","finish"],ex:"Let's start the day with a positive mindset.",off:"Let's start the meeting on time.",intv:"I started two successful projects from scratch.",biz:"Let's start the new financial year with clear goals."},
  {word:"strengthen",pos:"verb",hindi:"मजबूत करना",simple:"To make stronger",ipa:"/ˈstreŋθən/",syn:["reinforce","boost","build"],ant:["weaken","undermine"],ex:"Let's strengthen our skills every day.",off:"Let's strengthen interdepartmental communication.",intv:"I want to strengthen my leadership abilities.",biz:"Let's strengthen our brand presence."},
  {word:"support",pos:"verb",hindi:"समर्थन देना",simple:"To help or stand behind someone",ipa:"/səˈpɔːt/",syn:["assist","back","help"],ant:["oppose","undermine"],ex:"Let's support each other's goals.",off:"Let's support the new team members.",intv:"I believe in supporting colleagues at all times.",biz:"Let's support our customers with 24/7 service."},
  {word:"track",pos:"verb",hindi:"नज़र रखना / ट्रैक करना",simple:"To monitor or follow the progress of something",ipa:"/træk/",syn:["monitor","follow","record"],ant:["ignore","lose"],ex:"Let's track our progress weekly.",off:"Let's track expenses using the finance software.",intv:"I track all project milestones meticulously.",biz:"Let's track customer feedback data monthly."},
  {word:"transform",pos:"verb",hindi:"बदलना / रूपांतरित करना",simple:"To change completely",ipa:"/trænsˈfɔːm/",syn:["change","convert","alter"],ant:["preserve","maintain"],ex:"Let's transform our approach.",off:"Let's transform the way we handle customer queries.",intv:"I helped transform the onboarding process.",biz:"Let's transform our business model digitally."},
  {word:"understand",pos:"verb",hindi:"समझना",simple:"To grasp the meaning of something",ipa:"/ˌʌndəˈstænd/",syn:["comprehend","grasp","perceive"],ant:["misunderstand","miss"],ex:"Let's understand the topic before moving on.",off:"Let's understand the client's requirements first.",intv:"I take time to understand problems before acting.",biz:"Let's understand what the customer truly needs."},
  {word:"update",pos:"verb",hindi:"अपडेट करना",simple:"To bring something up to date",ipa:"/ʌpˈdeɪt/",syn:["revise","refresh","upgrade"],ant:["ignore","obsolete"],ex:"Let's update the plan based on new information.",off:"Let's update the spreadsheet every Monday.",intv:"I update my manager on progress every Friday.",biz:"Let's update our product features based on feedback."},
  {word:"utilise",pos:"verb",hindi:"उपयोग करना",simple:"To make practical use of something",ipa:"/ˈjuːtɪlaɪz/",syn:["use","employ","apply"],ant:["waste","ignore"],ex:"Let's utilise our resources wisely.",off:"Let's utilise the new software effectively.",intv:"I know how to utilise available tools efficiently.",biz:"Let's utilise data analytics to drive decisions."},
  {word:"verify",pos:"verb",hindi:"जाँच करना / सत्यापित करना",simple:"To check that something is true or correct",ipa:"/ˈverɪfaɪ/",syn:["confirm","check","validate"],ant:["ignore","assume"],ex:"Let's verify the information before sharing.",off:"Let's verify the figures in the report.",intv:"I always verify my work before submission.",biz:"Let's verify the vendor's credentials."},
  {word:"visualise",pos:"verb",hindi:"कल्पना करना / देखना",simple:"To form a mental image of something",ipa:"/ˈvɪʒuəlaɪz/",syn:["imagine","picture","envision"],ant:[],ex:"Let's visualise our goal every morning.",off:"Let's visualise the data in a chart.",intv:"I visualise the end result before starting a project.",biz:"Let's visualise market trends with a dashboard."},
  // NOUNS
  {word:"achievement",pos:"noun",hindi:"उपलब्धि",simple:"Something accomplished successfully",ipa:"/əˈtʃiːvmənt/",syn:["accomplishment","success","feat"],ant:["failure","defeat"],ex:"Winning the competition was a great achievement.",off:"Let's recognise the team's achievement this month.",intv:"My greatest achievement was reducing costs by 30%.",biz:"Let's celebrate each achievement publicly."},
  {word:"agenda",pos:"noun",hindi:"कार्यसूची",simple:"A list of items to be discussed at a meeting",ipa:"/əˈdʒendə/",syn:["schedule","plan","programme"],ant:[],ex:"Let's check the agenda before the meeting starts.",off:"Let's prepare the agenda the day before.",intv:"I always come prepared with an agenda.",biz:"Let's set a clear agenda for the board meeting."},
  {word:"ambition",pos:"noun",hindi:"महत्वाकांक्षा",simple:"A strong desire to succeed",ipa:"/æmˈbɪʃən/",syn:["aspiration","drive","goal"],ant:["laziness","apathy","indifference"],ex:"Her ambition drives her to work hard.",off:"Let's channel our ambition into productive work.",intv:"My ambition is to become a project manager.",biz:"Let's align our ambition with company values."},
  {word:"approach",pos:"noun",hindi:"तरीका / दृष्टिकोण",simple:"A way of dealing with something",ipa:"/əˈprəʊtʃ/",syn:["method","strategy","way"],ant:[],ex:"Let's try a different approach.",off:"Let's discuss our approach before we begin.",intv:"My approach is always structured and data-driven.",biz:"Let's take a customer-first approach."},
  {word:"attitude",pos:"noun",hindi:"रवैया / दृष्टिकोण",simple:"The way someone thinks or feels about something",ipa:"/ˈætɪtjuːd/",syn:["outlook","mindset","perspective"],ant:[],ex:"A positive attitude changes everything.",off:"Let's maintain a positive attitude at work.",intv:"My attitude towards challenges is always optimistic.",biz:"Let's build an attitude of continuous improvement."},
  {word:"budget",pos:"noun",hindi:"बजट",simple:"A plan for how money will be spent",ipa:"/ˈbʌdʒɪt/",syn:["finance","funds","allowance"],ant:[],ex:"Let's stick to our budget this month.",off:"Let's review the project budget together.",intv:"I managed a budget of ₹50 lakh in my previous role.",biz:"Let's finalise the annual marketing budget."},
  {word:"challenge",pos:"noun",hindi:"चुनौती",simple:"A difficult task that tests ability",ipa:"/ˈtʃælɪndʒ/",syn:["difficulty","obstacle","problem"],ant:["ease","advantage"],ex:"Every challenge makes us stronger.",off:"Let's accept this challenge as a team.",intv:"I welcome every challenge as a learning opportunity.",biz:"Let's address the supply chain challenge directly."},
  {word:"clarity",pos:"noun",hindi:"स्पष्टता",simple:"The quality of being clear and easy to understand",ipa:"/ˈklærɪti/",syn:["clearness","precision","transparency"],ant:["confusion","ambiguity"],ex:"Let's bring some clarity to the discussion.",off:"Let's ensure clarity in our communications.",intv:"I always seek clarity before starting a task.",biz:"Let's bring clarity to the project scope."},
  {word:"colleague",pos:"noun",hindi:"सहकर्मी",simple:"A person you work with",ipa:"/ˈkɒliːɡ/",syn:["coworker","associate","teammate"],ant:[],ex:"Let's thank our colleagues for their support.",off:"Let's include all colleagues in the update.",intv:"I enjoy working closely with my colleagues.",biz:"Let's invite all colleagues to the annual dinner."},
  {word:"commitment",pos:"noun",hindi:"प्रतिबद्धता",simple:"A promise to do or give something",ipa:"/kəˈmɪtmənt/",syn:["dedication","pledge","promise"],ant:["neglect","indifference"],ex:"Your commitment to learning is impressive.",off:"Let's show our commitment to the deadline.",intv:"My commitment to quality is unwavering.",biz:"Let's demonstrate our commitment to the client."},
  {word:"communication",pos:"noun",hindi:"संचार / संवाद",simple:"The exchange of information",ipa:"/kəˌmjuːnɪˈkeɪʃən/",syn:["interaction","dialogue","exchange"],ant:[],ex:"Good communication is the key to success.",off:"Let's improve internal communication.",intv:"Strong communication is my greatest strength.",biz:"Let's build a communication plan for the campaign."},
  {word:"confidence",pos:"noun",hindi:"आत्मविश्वास",simple:"The belief in one's own abilities",ipa:"/ˈkɒnfɪdəns/",syn:["self-assurance","certainty","boldness"],ant:["doubt","insecurity","fear"],ex:"Let's speak with confidence in our interviews.",off:"Let's build confidence in every team member.",intv:"My confidence grows with each new experience.",biz:"Let's project confidence in our investor pitch."},
  {word:"conflict",pos:"noun",hindi:"विवाद / टकराव",simple:"A serious disagreement or argument",ipa:"/ˈkɒnflɪkt/",syn:["dispute","disagreement","clash"],ant:["agreement","harmony","peace"],ex:"Let's resolve any conflict peacefully.",off:"Let's address the conflict before it escalates.",intv:"I handle conflict by listening to both sides.",biz:"Let's avoid contract conflict with clear terms."},
  {word:"creativity",pos:"noun",hindi:"रचनात्मकता",simple:"The ability to produce new ideas",ipa:"/ˌkriːeɪˈtɪvɪti/",syn:["innovation","imagination","originality"],ant:["dullness","conformity"],ex:"Let's use our creativity to solve this.",off:"Let's encourage creativity in our team.",intv:"Creativity is one of my core strengths.",biz:"Let's use creativity to differentiate our brand."},
  {word:"deadline",pos:"noun",hindi:"अंतिम तिथि / समय सीमा",simple:"The latest time something must be done",ipa:"/ˈdedlaɪn/",syn:["due date","cutoff","time limit"],ant:[],ex:"Let's finish before the deadline.",off:"Let's track all deadlines on a shared calendar.",intv:"I have never missed a project deadline.",biz:"Let's communicate deadlines clearly to vendors."},
  {word:"decision",pos:"noun",hindi:"निर्णय",simple:"A choice made after thinking",ipa:"/dɪˈsɪʒən/",syn:["choice","resolution","conclusion"],ant:[],ex:"Let's make a wise decision together.",off:"Let's make this decision as a team.",intv:"I make decisions based on data and experience.",biz:"Let's make a data-driven decision on pricing."},
  {word:"dedication",pos:"noun",hindi:"समर्पण",simple:"Strong commitment to something",ipa:"/ˌdedɪˈkeɪʃən/",syn:["commitment","devotion","loyalty"],ant:["apathy","neglect"],ex:"Her dedication to English is inspiring.",off:"Let's show dedication in all our work.",intv:"My dedication to excellence sets me apart.",biz:"Let's recognise dedication with performance bonuses."},
  {word:"development",pos:"noun",hindi:"विकास",simple:"The process of growing or becoming better",ipa:"/dɪˈveləpmənt/",syn:["growth","progress","advancement"],ant:["decline","stagnation"],ex:"Personal development requires daily effort.",off:"Let's invest in employee development.",intv:"I focus on both professional and personal development.",biz:"Let's track product development milestones closely."},
  {word:"discipline",pos:"noun",hindi:"अनुशासन",simple:"Training that makes people obey rules or behave well",ipa:"/ˈdɪsɪplɪn/",syn:["self-control","order","rigour"],ant:["disorder","laziness"],ex:"Discipline is the key to any success.",off:"Let's maintain discipline in our work routines.",intv:"My discipline helps me deliver consistent results.",biz:"Let's bring financial discipline to operations."},
  {word:"effort",pos:"noun",hindi:"प्रयास",simple:"Energy or work put into doing something",ipa:"/ˈefət/",syn:["work","attempt","exertion"],ant:["laziness","inaction"],ex:"Let's put in our best effort.",off:"Let's acknowledge everyone's effort in this project.",intv:"I give full effort to every task.",biz:"Let's direct our effort towards high-impact activities."},
  {word:"enthusiasm",pos:"noun",hindi:"उत्साह",simple:"Intense enjoyment or eagerness",ipa:"/ɪnˈθjuːziæzəm/",syn:["excitement","passion","eagerness"],ant:["apathy","indifference"],ex:"Let's bring enthusiasm to everything we do.",off:"Let's start each Monday with enthusiasm.",intv:"My enthusiasm for this role is genuinely high.",biz:"Let's channel team enthusiasm into productivity."},
  {word:"environment",pos:"noun",hindi:"वातावरण / परिवेश",simple:"The surroundings or conditions in which one lives",ipa:"/ɪnˈvaɪərənmənt/",syn:["surroundings","setting","atmosphere"],ant:[],ex:"Let's keep our environment clean.",off:"Let's create a positive work environment.",intv:"I thrive in a collaborative environment.",biz:"Let's protect the natural environment through green practices."},
  {word:"excellence",pos:"noun",hindi:"उत्कृष्टता",simple:"The quality of being outstanding",ipa:"/ˈeksələns/",syn:["brilliance","quality","superiority"],ant:["mediocrity","inferiority"],ex:"Let's aim for excellence in everything.",off:"Let's build a culture of excellence.",intv:"I strive for excellence in every assignment.",biz:"Let's make excellence our company standard."},
  {word:"experience",pos:"noun",hindi:"अनुभव",simple:"Knowledge or skill from doing something",ipa:"/ɪkˈspɪəriəns/",syn:["knowledge","background","expertise"],ant:["inexperience","ignorance"],ex:"Experience teaches us more than books.",off:"Let's use our experience to mentor juniors.",intv:"My three years of experience make me a strong candidate.",biz:"Let's leverage our team's collective experience."},
  {word:"feedback",pos:"noun",hindi:"प्रतिक्रिया / राय",simple:"Information about how well someone is doing",ipa:"/ˈfiːdbæk/",syn:["response","comment","review"],ant:[],ex:"Let's give each other honest feedback.",off:"Let's create a regular feedback system.",intv:"I welcome constructive feedback openly.",biz:"Let's collect customer feedback to improve our product."},
  {word:"goal",pos:"noun",hindi:"लक्ष्य",simple:"Something you want to achieve",ipa:"/ɡəʊl/",syn:["target","aim","objective"],ant:[],ex:"Let's set clear goals for the week.",off:"Let's align personal and team goals.",intv:"My short-term goal is to master data analysis.",biz:"Let's define our quarterly business goals."},
  {word:"growth",pos:"noun",hindi:"वृद्धि / विकास",simple:"An increase in size, value, or importance",ipa:"/ɡrəʊθ/",syn:["expansion","development","progress"],ant:["decline","shrinkage"],ex:"Personal growth requires consistent effort.",off:"Let's support each other's professional growth.",intv:"I have shown strong growth in every role.",biz:"Let's target 25% year-on-year growth."},
  {word:"habit",pos:"noun",hindi:"आदत",simple:"A regular, often unconscious behaviour",ipa:"/ˈhæbɪt/",syn:["routine","practice","custom"],ant:[],ex:"Let's develop good habits together.",off:"Let's build a habit of documenting work.",intv:"My habit of daily review keeps me on track.",biz:"Let's build a habit of data-driven decisions."},
  {word:"idea",pos:"noun",hindi:"विचार",simple:"A thought or suggestion for action",ipa:"/aɪˈdɪə/",syn:["thought","concept","suggestion"],ant:[],ex:"Let's share our ideas freely.",off:"Let's collect ideas from the whole team.",intv:"My best idea saved the company three months of work.",biz:"Let's turn this idea into a business case."},
  {word:"initiative",pos:"noun",hindi:"पहल",simple:"The ability to start things independently",ipa:"/ɪˈnɪʃətɪv/",syn:["drive","enterprise","action"],ant:["passivity","inaction"],ex:"Let's take the initiative and start now.",off:"Let's reward employees who show initiative.",intv:"I always take the initiative in unclear situations.",biz:"Let's launch a green initiative this year."},
  {word:"knowledge",pos:"noun",hindi:"ज्ञान",simple:"Facts and information acquired through experience",ipa:"/ˈnɒlɪdʒ/",syn:["understanding","expertise","information"],ant:["ignorance","inexperience"],ex:"Let's share our knowledge with others.",off:"Let's build a knowledge-sharing platform.",intv:"My knowledge of Python sets me apart.",biz:"Let's turn our knowledge into competitive advantage."},
  {word:"leadership",pos:"noun",hindi:"नेतृत्व",simple:"The action of leading a group",ipa:"/ˈliːdəʃɪp/",syn:["management","guidance","direction"],ant:["followership"],ex:"Good leadership inspires everyone.",off:"Let's develop leadership skills in all employees.",intv:"My leadership style is collaborative and inclusive.",biz:"Let's build strong leadership at every level."},
  {word:"meeting",pos:"noun",hindi:"बैठक",simple:"A gathering to discuss something",ipa:"/ˈmiːtɪŋ/",syn:["conference","discussion","session"],ant:[],ex:"Let's keep the meeting short and productive.",off:"Let's start the meeting with a clear agenda.",intv:"I run effective meetings with clear outcomes.",biz:"Let's hold a strategy meeting this Friday."},
  {word:"milestone",pos:"noun",hindi:"पड़ाव / महत्वपूर्ण चरण",simple:"An important point in the progress of something",ipa:"/ˈmaɪlstəʊn/",syn:["achievement","marker","landmark"],ant:[],ex:"Let's celebrate every milestone on our journey.",off:"Let's track project milestones weekly.",intv:"I helped the team reach three major milestones last year.",biz:"Let's publish our company milestones in the annual report."},
  {word:"mindset",pos:"noun",hindi:"सोचने का तरीका / मानसिकता",simple:"A way of thinking that affects one's behaviour",ipa:"/ˈmaɪndset/",syn:["attitude","perspective","outlook"],ant:[],ex:"A growth mindset helps you improve every day.",off:"Let's build a positive mindset in the team.",intv:"My mindset is always solution-focused.",biz:"Let's develop a customer-centric mindset company-wide."},
  {word:"motivation",pos:"noun",hindi:"प्रेरणा",simple:"The reason or drive behind doing something",ipa:"/ˌməʊtɪˈveɪʃən/",syn:["drive","inspiration","enthusiasm"],ant:["apathy","laziness"],ex:"Music is my motivation to keep going.",off:"Let's boost team motivation with recognition.",intv:"My motivation comes from solving real problems.",biz:"Let's keep motivation high during the busy season."},
  {word:"objective",pos:"noun",hindi:"उद्देश्य",simple:"A specific goal or aim",ipa:"/əbˈdʒektɪv/",syn:["goal","aim","target"],ant:[],ex:"Let's define our objective clearly.",off:"Let's write down each team member's objective.",intv:"My objective is to add value from day one.",biz:"Let's set measurable objectives for each quarter."},
  {word:"opportunity",pos:"noun",hindi:"अवसर",simple:"A favourable time or chance",ipa:"/ˌɒpəˈtjuːnɪti/",syn:["chance","possibility","opening"],ant:["obstacle","disadvantage"],ex:"Let's grab this opportunity with both hands.",off:"Let's look for opportunities to upskill.",intv:"I see every challenge as an opportunity to grow.",biz:"Let's capitalise on this market opportunity."},
  {word:"performance",pos:"noun",hindi:"प्रदर्शन",simple:"How well someone or something does a task",ipa:"/pəˈfɔːməns/",syn:["output","results","execution"],ant:[],ex:"Let's review our performance every month.",off:"Let's link appraisals to actual performance.",intv:"My performance ratings have always been 'excellent'.",biz:"Let's improve overall business performance."},
  {word:"potential",pos:"noun",hindi:"क्षमता / संभावना",simple:"The ability to develop or succeed in the future",ipa:"/pəˈtenʃəl/",syn:["capability","promise","ability"],ant:["limitation","weakness"],ex:"Let's unlock our full potential.",off:"Let's identify employees with leadership potential.",intv:"I have the potential to lead large-scale projects.",biz:"Let's explore the potential of emerging markets."},
  {word:"priority",pos:"noun",hindi:"प्राथमिकता",simple:"Something given special attention first",ipa:"/praɪˈɒrɪti/",syn:["main concern","focus","precedence"],ant:["afterthought","least important"],ex:"Let's make learning our top priority.",off:"Let's set priorities at the start of each week.",intv:"My top priority is always delivering quality work.",biz:"Let's align priorities with the company's strategy."},
  {word:"process",pos:"noun",hindi:"प्रक्रिया",simple:"A series of steps taken to achieve a result",ipa:"/ˈprəʊses/",syn:["procedure","method","system"],ant:[],ex:"Let's follow the correct process.",off:"Let's document the entire process clearly.",intv:"I improved the process, saving two hours a week.",biz:"Let's automate repetitive processes."},
  {word:"productivity",pos:"noun",hindi:"उत्पादकता",simple:"The efficiency with which work is done",ipa:"/ˌprɒdʌkˈtɪvɪti/",syn:["efficiency","output","performance"],ant:["inefficiency","laziness"],ex:"Let's increase our productivity this week.",off:"Let's find tools that boost productivity.",intv:"I improved team productivity by 20% last year.",biz:"Let's track productivity metrics monthly."},
  {word:"progress",pos:"noun",hindi:"प्रगति",simple:"Movement forward or improvement",ipa:"/ˈprəʊɡres/",syn:["advancement","improvement","development"],ant:["regression","decline"],ex:"Let's check our progress every week.",off:"Let's share a progress update each Friday.",intv:"I made significant progress on the product launch.",biz:"Let's measure business progress against targets."},
  {word:"project",pos:"noun",hindi:"परियोजना",simple:"A planned piece of work with a goal",ipa:"/ˈprɒdʒekt/",syn:["assignment","task","venture"],ant:[],ex:"Let's divide the project into small parts.",off:"Let's track the project using a Gantt chart.",intv:"I delivered three projects on time last year.",biz:"Let's evaluate the project's ROI."},
  {word:"purpose",pos:"noun",hindi:"उद्देश्य / मकसद",simple:"The reason for which something is done",ipa:"/ˈpɜːpəs/",syn:["aim","goal","intention"],ant:["aimlessness","randomness"],ex:"Let's find our purpose and work towards it.",off:"Let's connect our daily work to a larger purpose.",intv:"I am driven by a clear sense of purpose.",biz:"Let's communicate our brand purpose to customers."},
  {word:"relationship",pos:"noun",hindi:"संबंध",simple:"The way two or more people are connected",ipa:"/rɪˈleɪʃənʃɪp/",syn:["connection","bond","association"],ant:[],ex:"Let's build a strong relationship.",off:"Let's strengthen our working relationship.",intv:"I build positive relationships with all stakeholders.",biz:"Let's nurture our client relationships carefully."},
  {word:"responsibility",pos:"noun",hindi:"ज़िम्मेदारी",simple:"A duty or obligation",ipa:"/rɪˌspɒnsɪˈbɪlɪti/",syn:["duty","obligation","accountability"],ant:["irresponsibility","negligence"],ex:"Let's take responsibility for our actions.",off:"Let's divide responsibilities clearly.",intv:"Taking responsibility for mistakes shows maturity.",biz:"Let's assign clear responsibilities to every team member."},
  {word:"result",pos:"noun",hindi:"परिणाम",simple:"An outcome of an action",ipa:"/rɪˈzʌlt/",syn:["outcome","effect","consequence"],ant:["cause","reason"],ex:"Hard work always brings good results.",off:"Let's review the results from last week.",intv:"I am proud of the results I achieved.",biz:"Let's measure results against our key metrics."},
  {word:"routine",pos:"noun",hindi:"दिनचर्या",simple:"A regular way of doing things",ipa:"/ruːˈtiːn/",syn:["habit","schedule","procedure"],ant:["irregularity","spontaneity"],ex:"Let's build a healthy morning routine.",off:"Let's establish a routine for daily standups.",intv:"My work routine keeps me focused and productive.",biz:"Let's streamline routine tasks with automation."},
  {word:"skill",pos:"noun",hindi:"कौशल",simple:"The ability to do something well",ipa:"/skɪl/",syn:["ability","expertise","talent"],ant:["inability","weakness"],ex:"Let's develop skills that matter.",off:"Let's identify the skills needed for this project.",intv:"My analytical skills are my strongest asset.",biz:"Let's invest in upskilling our workforce."},
  {word:"solution",pos:"noun",hindi:"समाधान",simple:"A way to solve a problem",ipa:"/səˈluːʃən/",syn:["answer","fix","resolution"],ant:["problem","obstacle"],ex:"Let's find a creative solution together.",off:"Let's focus on solutions, not problems.",intv:"I bring practical solutions to every challenge.",biz:"Let's offer a complete solution to the client."},
  {word:"strategy",pos:"noun",hindi:"रणनीति",simple:"A plan designed to achieve a goal",ipa:"/ˈstrætɪdʒi/",syn:["plan","approach","policy"],ant:[],ex:"Let's build a strong strategy.",off:"Let's revisit our strategy every quarter.",intv:"My strength is designing clear, actionable strategies.",biz:"Let's align our strategy with market trends."},
  {word:"success",pos:"noun",hindi:"सफलता",simple:"The accomplishment of an aim",ipa:"/səkˈses/",syn:["achievement","victory","triumph"],ant:["failure","defeat"],ex:"Let's celebrate every success together.",off:"Let's define what success looks like for this project.",intv:"I measure success by the impact I create.",biz:"Let's build a roadmap for long-term business success."},
  {word:"teamwork",pos:"noun",hindi:"टीम वर्क / सहयोग",simple:"The joint action of a team working together",ipa:"/ˈtiːmwɜːk/",syn:["collaboration","cooperation","partnership"],ant:["individualism","competition"],ex:"Let's show excellent teamwork today.",off:"Let's encourage teamwork across all departments.",intv:"Teamwork is the foundation of my work philosophy.",biz:"Let's build a culture of teamwork."},
  {word:"trust",pos:"noun",hindi:"विश्वास",simple:"Firm belief in someone's reliability",ipa:"/trʌst/",syn:["confidence","faith","reliance"],ant:["distrust","suspicion","doubt"],ex:"Let's build trust through honesty.",off:"Let's build trust within the team first.",intv:"I earn trust by delivering on my promises.",biz:"Let's build customer trust with transparent practices."},
  {word:"value",pos:"noun",hindi:"मूल्य",simple:"The importance or worth of something",ipa:"/ˈvæljuː/",syn:["worth","importance","benefit"],ant:["worthlessness"],ex:"Let's add value to every conversation.",off:"Let's deliver real value to our customers.",intv:"I bring value by combining technical and soft skills.",biz:"Let's communicate our product's core value clearly."},
  {word:"vision",pos:"noun",hindi:"दृष्टि / लक्ष्य",simple:"A long-term idea of the future",ipa:"/ˈvɪʒən/",syn:["goal","dream","aspiration"],ant:[],ex:"Let's keep our vision clear.",off:"Let's share the company vision with new joinees.",intv:"I have a clear vision of where I want to be in 5 years.",biz:"Let's craft a compelling vision statement."},
  // ADJECTIVES
  {word:"accountable",pos:"adjective",hindi:"जवाबदेह",simple:"Responsible for one's actions",ipa:"/əˈkaʊntəbəl/",syn:["responsible","answerable","liable"],ant:["irresponsible","unaccountable"],ex:"Let's be accountable for our own work.",off:"Let's hold everyone accountable for results.",intv:"I am fully accountable for all my decisions.",biz:"Let's create an accountable culture in the organisation."},
  {word:"accurate",pos:"adjective",hindi:"सटीक / सही",simple:"Free from errors; correct",ipa:"/ˈækjərət/",syn:["correct","precise","exact"],ant:["wrong","inaccurate","incorrect"],ex:"Let's give an accurate answer.",off:"Let's ensure all reports are accurate.",intv:"I double-check all my work to make sure it's accurate.",biz:"Let's provide accurate data to clients at all times."},
  {word:"active",pos:"adjective",hindi:"सक्रिय",simple:"Engaged in activity; energetic",ipa:"/ˈæktɪv/",syn:["energetic","busy","engaged"],ant:["passive","inactive","idle"],ex:"Let's stay active and healthy.",off:"Let's stay active in team discussions.",intv:"I am an active listener and learner.",biz:"Let's maintain an active presence on social media."},
  {word:"adaptable",pos:"adjective",hindi:"लचीला / अनुकूलनीय",simple:"Able to change to fit new conditions",ipa:"/əˈdæptəbəl/",syn:["flexible","versatile","adjustable"],ant:["rigid","inflexible"],ex:"Being adaptable helps in every situation.",off:"Let's be adaptable when priorities change.",intv:"I am highly adaptable to new work environments.",biz:"Let's build an adaptable business model."},
  {word:"ambitious",pos:"adjective",hindi:"महत्वाकांक्षी",simple:"Having a strong desire to succeed",ipa:"/æmˈbɪʃəs/",syn:["driven","determined","motivated"],ant:["lazy","apathetic"],ex:"Ambitious people never stop learning.",off:"Let's set ambitious but achievable targets.",intv:"I am ambitious and always aim higher.",biz:"Let's attract ambitious talent to the organisation."},
  {word:"analytical",pos:"adjective",hindi:"विश्लेषणात्मक",simple:"Able to examine and understand complex things",ipa:"/ˌænəˈlɪtɪkəl/",syn:["logical","systematic","critical"],ant:["illogical","random"],ex:"Let's take an analytical approach.",off:"Let's use analytical tools for better decisions.",intv:"My analytical thinking helps me find root causes fast.",biz:"Let's take an analytical look at the competition."},
  {word:"attentive",pos:"adjective",hindi:"ध्यान देने वाला",simple:"Paying close attention",ipa:"/əˈtentɪv/",syn:["alert","observant","careful"],ant:["inattentive","careless","distracted"],ex:"Let's be attentive during the training.",off:"Let's be more attentive in our meetings.",intv:"I am highly attentive to detail.",biz:"Let's be attentive to customer needs."},
  {word:"brilliant",pos:"adjective",hindi:"प्रतिभाशाली / शानदार",simple:"Very clever or outstanding",ipa:"/ˈbrɪliənt/",syn:["exceptional","intelligent","talented"],ant:["dull","mediocre"],ex:"That was a brilliant idea!",off:"Let's recognise brilliant performance openly.",intv:"My brilliant problem-solving approach saved the project.",biz:"Let's find brilliant minds for our R&D team."},
  {word:"calm",pos:"adjective",hindi:"शांत",simple:"Not excited or nervous",ipa:"/kɑːm/",syn:["peaceful","composed","relaxed"],ant:["anxious","nervous","agitated"],ex:"Let's stay calm under pressure.",off:"A calm response is always more effective at work.",intv:"I remain calm even in high-pressure situations.",biz:"Let's present a calm, confident image to clients."},
  {word:"capable",pos:"adjective",hindi:"सक्षम",simple:"Having the ability to do something",ipa:"/ˈkeɪpəbəl/",syn:["competent","able","skilled"],ant:["incapable","unable","incompetent"],ex:"We are all capable of great things.",off:"Let's identify capable candidates for leadership roles.",intv:"I am fully capable of handling this responsibility.",biz:"Let's hire capable people at every level."},
  {word:"careful",pos:"adjective",hindi:"सावधान",simple:"Giving attention to avoid mistakes or danger",ipa:"/ˈkeəfəl/",syn:["cautious","attentive","thorough"],ant:["careless","reckless","negligent"],ex:"Let's be careful with confidential information.",off:"Let's be more careful about data accuracy.",intv:"I am always careful and thorough in my work.",biz:"Let's be careful not to overpromise to clients."},
  {word:"clear",pos:"adjective",hindi:"स्पष्ट",simple:"Easy to understand or see",ipa:"/klɪər/",syn:["obvious","plain","transparent"],ant:["unclear","vague","confusing"],ex:"Let's give a clear explanation.",off:"Let's keep our communication clear and concise.",intv:"I communicate in a clear and direct manner.",biz:"Let's make our pricing clear and transparent."},
  {word:"confident",pos:"adjective",hindi:"आत्मविश्वासी",simple:"Having a strong belief in one's abilities",ipa:"/ˈkɒnfɪdənt/",syn:["self-assured","bold","certain"],ant:["uncertain","insecure","doubtful"],ex:"Let's be confident in our decisions.",off:"Let's present our ideas in a confident manner.",intv:"I am confident in my ability to handle this role.",biz:"Let's project a confident brand image."},
  {word:"consistent",pos:"adjective",hindi:"लगातार / निरंतर",simple:"Always behaving in the same way",ipa:"/kənˈsɪstənt/",syn:["steady","regular","reliable"],ant:["inconsistent","irregular","erratic"],ex:"Let's be consistent with our practice.",off:"Let's be consistent in how we report results.",intv:"I deliver consistent results every single quarter.",biz:"Let's maintain a consistent brand voice."},
  {word:"constructive",pos:"adjective",hindi:"रचनात्मक / उपयोगी",simple:"Helpful and useful in improving something",ipa:"/kənˈstrʌktɪv/",syn:["helpful","positive","productive"],ant:["destructive","harmful","critical"],ex:"Let's give constructive feedback.",off:"Let's make our criticism constructive, not discouraging.",intv:"I appreciate constructive feedback and act on it.",biz:"Let's offer constructive suggestions to clients."},
  {word:"creative",pos:"adjective",hindi:"रचनात्मक",simple:"Having original ideas or imagination",ipa:"/kriˈeɪtɪv/",syn:["inventive","imaginative","original"],ant:["unimaginative","ordinary"],ex:"Let's be creative in our problem-solving.",off:"Let's hire more creative thinkers.",intv:"I am a creative thinker who loves new ideas.",biz:"Let's apply creative marketing to reach new audiences."},
  {word:"critical",pos:"adjective",hindi:"महत्वपूर्ण / आलोचनात्मक",simple:"Very important or expressing judgement",ipa:"/ˈkrɪtɪkəl/",syn:["crucial","vital","analytical"],ant:["unimportant","trivial"],ex:"This is a critical step — let's not skip it.",off:"Let's focus on critical deliverables first.",intv:"I have strong critical thinking skills.",biz:"Let's do a critical analysis of the competitors."},
  {word:"dedicated",pos:"adjective",hindi:"समर्पित",simple:"Fully committed to a cause or activity",ipa:"/ˈdedɪkeɪtɪd/",syn:["committed","devoted","focused"],ant:["distracted","indifferent","uncommitted"],ex:"Dedicated learners always succeed.",off:"Let's build a dedicated team for this project.",intv:"I am a dedicated professional with proven results.",biz:"Let's show our dedicated support to key clients."},
  {word:"detail-oriented",pos:"adjective",hindi:"बारीकियों पर ध्यान देने वाला",simple:"Paying careful attention to small details",ipa:"/ˈdiːteɪl ˈɔːrientɪd/",syn:["thorough","precise","meticulous"],ant:["careless","sloppy"],ex:"A detail-oriented person rarely makes errors.",off:"Let's be more detail-oriented in our reports.",intv:"I am known for being detail-oriented and thorough.",biz:"Let's choose a detail-oriented team for auditing."},
  {word:"diligent",pos:"adjective",hindi:"परिश्रमी",simple:"Showing careful and persistent effort",ipa:"/ˈdɪlɪdʒənt/",syn:["hardworking","industrious","thorough"],ant:["lazy","careless","negligent"],ex:"Diligent students always improve.",off:"Let's be diligent about meeting every deadline.",intv:"I am known for being diligent in all tasks.",biz:"Let's reward our most diligent employees."},
  {word:"dynamic",pos:"adjective",hindi:"गतिशील / ऊर्जावान",simple:"Energetic and full of new ideas",ipa:"/daɪˈnæmɪk/",syn:["energetic","active","vibrant"],ant:["static","dull","passive"],ex:"This is a dynamic group — let's keep the energy high!",off:"Let's build a dynamic team culture.",intv:"I am a dynamic professional who thrives in fast-paced settings.",biz:"Let's create a dynamic brand image."},
  {word:"effective",pos:"adjective",hindi:"प्रभावी",simple:"Producing the desired result",ipa:"/ɪˈfektɪv/",syn:["efficient","successful","productive"],ant:["ineffective","useless","unproductive"],ex:"Let's find the most effective solution.",off:"Let's make our meetings more effective.",intv:"I am known for effective time management.",biz:"Let's build an effective sales funnel."},
  {word:"efficient",pos:"adjective",hindi:"दक्ष / कुशल",simple:"Achieving results with minimum waste",ipa:"/ɪˈfɪʃənt/",syn:["productive","effective","economical"],ant:["inefficient","wasteful","slow"],ex:"Let's find a more efficient way to do this.",off:"Let's build efficient workflows.",intv:"I am highly efficient when working under pressure.",biz:"Let's make our supply chain more efficient."},
  {word:"enthusiastic",pos:"adjective",hindi:"उत्साही",simple:"Having or showing great eagerness",ipa:"/ɪnˌθjuːziˈæstɪk/",syn:["eager","keen","excited"],ant:["apathetic","unenthusiastic","indifferent"],ex:"Let's be enthusiastic about today's lesson.",off:"Let's be enthusiastic in how we welcome new clients.",intv:"I am genuinely enthusiastic about this opportunity.",biz:"Let's build an enthusiastic sales team."},
  {word:"excellent",pos:"adjective",hindi:"उत्कृष्ट / बेहतरीन",simple:"Extremely good",ipa:"/ˈeksələnt/",syn:["outstanding","superb","exceptional"],ant:["poor","mediocre","bad"],ex:"That was excellent work — let's keep it up!",off:"Let's aim for excellent customer service.",intv:"My performance has always been rated excellent.",biz:"Let's deliver excellent results every quarter."},
  {word:"experienced",pos:"adjective",hindi:"अनुभवी",simple:"Having skill or knowledge from doing something",ipa:"/ɪkˈspɪəriənst/",syn:["skilled","seasoned","expert"],ant:["inexperienced","fresh","novice"],ex:"Let's learn from our more experienced colleagues.",off:"Let's assign experienced staff to critical tasks.",intv:"I am an experienced professional in this domain.",biz:"Let's hire experienced consultants for this project."},
  {word:"flexible",pos:"adjective",hindi:"लचीला",simple:"Able to change easily",ipa:"/ˈfleksɪbəl/",syn:["adaptable","versatile","open"],ant:["rigid","inflexible","stubborn"],ex:"Let's be flexible when plans change.",off:"Let's offer flexible working hours.",intv:"I am highly flexible and adapt quickly.",biz:"Let's build a flexible pricing model."},
  {word:"focused",pos:"adjective",hindi:"केंद्रित",simple:"Concentrating on one thing",ipa:"/ˈfəʊkəst/",syn:["concentrated","directed","attentive"],ant:["distracted","unfocused","scattered"],ex:"Let's stay focused on the goal.",off:"Let's stay focused during peak hours.",intv:"I am highly focused in high-pressure situations.",biz:"Let's stay focused on our core business."},
  {word:"hardworking",pos:"adjective",hindi:"मेहनती",simple:"Putting in a lot of effort",ipa:"/ˈhɑːdwɜːkɪŋ/",syn:["diligent","industrious","dedicated"],ant:["lazy","idle","slack"],ex:"Hardworking people always find success.",off:"Let's appreciate our hardworking colleagues.",intv:"I am hardworking and never shy away from extra effort.",biz:"Let's build a culture that rewards hardworking individuals."},
  {word:"helpful",pos:"adjective",hindi:"सहायक",simple:"Ready and willing to assist",ipa:"/ˈhelpfəl/",syn:["supportive","useful","cooperative"],ant:["unhelpful","obstructive","useless"],ex:"Let's be helpful to everyone around us.",off:"Let's create a helpful and supportive culture.",intv:"I am known for being helpful and approachable.",biz:"Let's provide helpful resources to our customers."},
  {word:"honest",pos:"adjective",hindi:"ईमानदार",simple:"Telling the truth and being fair",ipa:"/ˈɒnɪst/",syn:["truthful","sincere","transparent"],ant:["dishonest","deceitful","lying"],ex:"Let's be honest with each other.",off:"Let's build a culture of honest communication.",intv:"I am always honest about my strengths and limitations.",biz:"Let's be honest and transparent with our investors."},
  {word:"innovative",pos:"adjective",hindi:"नवाचारी",simple:"Introducing new ideas or methods",ipa:"/ˈɪnəveɪtɪv/",syn:["creative","original","inventive"],ant:["old-fashioned","conventional","stagnant"],ex:"Let's find an innovative solution.",off:"Let's reward innovative thinking in the team.",intv:"I am known for my innovative approach to problems.",biz:"Let's build an innovative product roadmap."},
  {word:"motivated",pos:"adjective",hindi:"प्रेरित",simple:"Having a reason to do something",ipa:"/ˈməʊtɪveɪtɪd/",syn:["driven","inspired","eager"],ant:["unmotivated","apathetic","lazy"],ex:"A motivated learner grows quickly.",off:"Let's keep our team motivated every day.",intv:"I am highly motivated by new challenges.",biz:"Let's keep our clients motivated with visible progress."},
  {word:"optimistic",pos:"adjective",hindi:"आशावादी",simple:"Expecting the best outcome",ipa:"/ˌɒptɪˈmɪstɪk/",syn:["positive","hopeful","upbeat"],ant:["pessimistic","negative","doubtful"],ex:"Let's be optimistic about tomorrow.",off:"Let's stay optimistic even when results are slow.",intv:"My optimistic attitude helps my team stay motivated.",biz:"Let's be optimistic but realistic in our forecasts."},
  {word:"organised",pos:"adjective",hindi:"सुव्यवस्थित",simple:"Arranged in a systematic way",ipa:"/ˈɔːɡənaɪzd/",syn:["systematic","orderly","structured"],ant:["disorganised","chaotic","messy"],ex:"Let's be organised in our approach.",off:"Let's keep our workspace organised.",intv:"I am a highly organised professional.",biz:"Let's run an organised product launch."},
  {word:"patient",pos:"adjective",hindi:"धैर्यवान",simple:"Able to wait calmly without complaining",ipa:"/ˈpeɪʃənt/",syn:["tolerant","calm","composed"],ant:["impatient","hasty","restless"],ex:"Let's be patient when things take time.",off:"Let's be patient with new employees.",intv:"I am patient and persistent in achieving goals.",biz:"Let's be patient while waiting for market results."},
  {word:"positive",pos:"adjective",hindi:"सकारात्मक",simple:"Optimistic and focused on the good",ipa:"/ˈpɒzɪtɪv/",syn:["optimistic","constructive","hopeful"],ant:["negative","pessimistic","doubtful"],ex:"Let's keep a positive attitude always.",off:"Let's foster a positive work environment.",intv:"I maintain a positive approach to challenges.",biz:"Let's communicate positive business updates regularly."},
  {word:"proactive",pos:"adjective",hindi:"पहल करने वाला",simple:"Acting in advance to deal with expected problems",ipa:"/ˌprəʊˈæktɪv/",syn:["initiative-taking","forward-thinking","enterprising"],ant:["reactive","passive"],ex:"Let's be proactive and prepare in advance.",off:"Let's be proactive in identifying risks.",intv:"I take a proactive approach to problem-solving.",biz:"Let's be proactive in responding to customer needs."},
  {word:"professional",pos:"adjective",hindi:"पेशेवर",simple:"Behaving in a way expected at work",ipa:"/prəˈfeʃənəl/",syn:["skilled","competent","expert"],ant:["unprofessional","amateurish"],ex:"Let's maintain professional conduct at all times.",off:"Let's always behave in a professional manner.",intv:"I believe in maintaining a professional attitude.",biz:"Let's deliver a professional presentation to the board."},
  {word:"punctual",pos:"adjective",hindi:"समय का पाबंद",simple:"Doing things exactly at the right time",ipa:"/ˈpʌŋktʃuəl/",syn:["on time","timely","prompt"],ant:["late","tardy","unpunctual"],ex:"Let's be punctual to every class.",off:"Let's be punctual for every client meeting.",intv:"I am always punctual for every commitment.",biz:"Let's ensure punctual delivery to build client trust."},
  {word:"reliable",pos:"adjective",hindi:"भरोसेमंद",simple:"That can be trusted to do what is expected",ipa:"/rɪˈlaɪəbəl/",syn:["dependable","trustworthy","consistent"],ant:["unreliable","untrustworthy","inconsistent"],ex:"Let's be reliable and keep our promises.",off:"Let's build a reliable vendor network.",intv:"My colleagues describe me as reliable and consistent.",biz:"Let's be known as a reliable business partner."},
  {word:"resourceful",pos:"adjective",hindi:"साधनसंपन्न",simple:"Able to find clever ways to solve problems",ipa:"/rɪˈsɔːsfəl/",syn:["inventive","creative","capable"],ant:["helpless","dependent"],ex:"Let's be resourceful and find a way.",off:"Let's value resourceful thinking in the team.",intv:"I am resourceful and find solutions independently.",biz:"Let's be resourceful in managing limited budgets."},
  {word:"responsible",pos:"adjective",hindi:"ज़िम्मेदार",simple:"Having an obligation to do something or able to be trusted",ipa:"/rɪˈspɒnsɪbəl/",syn:["accountable","dependable","trustworthy"],ant:["irresponsible","negligent"],ex:"Let's be responsible for our own growth.",off:"Let's assign responsible individuals to leadership tasks.",intv:"I am responsible, dependable, and results-driven.",biz:"Let's practise responsible business conduct."},
  {word:"sincere",pos:"adjective",hindi:"ईमानदार / सच्चा",simple:"Genuinely meaning what one says",ipa:"/sɪnˈsɪər/",syn:["genuine","honest","truthful"],ant:["insincere","fake","dishonest"],ex:"Let's be sincere in all our interactions.",off:"Let's give sincere feedback.",intv:"I am sincere in my efforts to improve.",biz:"Let's build sincere and lasting client relationships."},
  {word:"systematic",pos:"adjective",hindi:"व्यवस्थित / क्रमबद्ध",simple:"Done in an orderly, methodical way",ipa:"/ˌsɪstəˈmætɪk/",syn:["methodical","orderly","organised"],ant:["haphazard","random","chaotic"],ex:"Let's take a systematic approach.",off:"Let's be systematic in our data collection.",intv:"I solve problems in a systematic, step-by-step manner.",biz:"Let's follow a systematic process for quality control."},
  {word:"thoughtful",pos:"adjective",hindi:"विचारशील",simple:"Showing care and consideration",ipa:"/ˈθɔːtfəl/",syn:["considerate","careful","attentive"],ant:["thoughtless","careless","inconsiderate"],ex:"Let's be thoughtful in our responses.",off:"Let's give thoughtful and considered feedback.",intv:"I am thoughtful in how I approach every task.",biz:"Let's create thoughtful customer journeys."},
  {word:"transparent",pos:"adjective",hindi:"पारदर्शी",simple:"Open and honest with no hidden information",ipa:"/trænsˈpærənt/",syn:["open","clear","honest"],ant:["opaque","secretive","unclear"],ex:"Let's be transparent about our goals.",off:"Let's be transparent in how we report results.",intv:"I believe in transparent communication at all levels.",biz:"Let's be transparent with all financial disclosures."},
  // ADVERBS
  {word:"carefully",pos:"adverb",hindi:"सावधानी से",simple:"With great attention and caution",ipa:"/ˈkeəfəli/",syn:["cautiously","attentively","thoroughly"],ant:["carelessly","hastily"],ex:"Let's read the instructions carefully.",off:"Let's review the contract carefully.",intv:"I always handle client data carefully.",biz:"Let's analyse the risks carefully before proceeding."},
  {word:"clearly",pos:"adverb",hindi:"स्पष्ट रूप से",simple:"In a way that is easy to understand",ipa:"/ˈklɪəli/",syn:["plainly","obviously","directly"],ant:["vaguely","unclearly"],ex:"Let's communicate clearly.",off:"Let's present our ideas clearly.",intv:"I always explain my decisions clearly.",biz:"Let's define success metrics clearly."},
  {word:"confidently",pos:"adverb",hindi:"आत्मविश्वास के साथ",simple:"In a self-assured manner",ipa:"/ˈkɒnfɪdəntli/",syn:["boldly","assuredly","decisively"],ant:["nervously","hesitantly"],ex:"Let's speak confidently in English.",off:"Let's present confidently to the client.",intv:"I answer every interview question confidently.",biz:"Let's pitch confidently to investors."},
  {word:"consistently",pos:"adverb",hindi:"लगातार / निरंतर रूप से",simple:"Always behaving in the same way",ipa:"/kənˈsɪstəntli/",syn:["regularly","steadily","reliably"],ant:["inconsistently","irregularly"],ex:"Let's consistently practise good habits.",off:"Let's consistently update our progress tracker.",intv:"I consistently deliver results above expectations.",biz:"Let's consistently meet our SLA commitments."},
  {word:"effectively",pos:"adverb",hindi:"प्रभावी ढंग से",simple:"In a way that produces the right result",ipa:"/ɪˈfektɪvli/",syn:["successfully","productively","efficiently"],ant:["ineffectively","poorly"],ex:"Let's use our time effectively.",off:"Let's communicate effectively at every level.",intv:"I communicate effectively with cross-functional teams.",biz:"Let's manage costs effectively."},
  {word:"efficiently",pos:"adverb",hindi:"कुशलता से",simple:"With minimal waste of time or resources",ipa:"/ɪˈfɪʃəntli/",syn:["productively","effectively","economically"],ant:["inefficiently","wastefully"],ex:"Let's work more efficiently today.",off:"Let's use technology to work more efficiently.",intv:"I manage multiple tasks efficiently.",biz:"Let's allocate resources efficiently."},
  {word:"honestly",pos:"adverb",hindi:"ईमानदारी से",simple:"In a truthful and fair way",ipa:"/ˈɒnɪstli/",syn:["truthfully","sincerely","openly"],ant:["dishonestly","deceptively"],ex:"Let's speak honestly with each other.",off:"Let's give honest feedback.",intv:"I share my views honestly and diplomatically.",biz:"Let's report our results honestly."},
  {word:"immediately",pos:"adverb",hindi:"तुरंत",simple:"At once; without delay",ipa:"/ɪˈmiːdiətli/",syn:["instantly","at once","right away"],ant:["later","eventually","gradually"],ex:"Let's start immediately!",off:"Let's address urgent emails immediately.",intv:"I respond to client requests immediately.",biz:"Let's resolve this issue immediately."},
  {word:"proactively",pos:"adverb",hindi:"पहल करते हुए",simple:"In a way that acts in advance",ipa:"/ˌprəʊˈæktɪvli/",syn:["actively","early","anticipatorily"],ant:["reactively","passively"],ex:"Let's proactively share updates.",off:"Let's proactively communicate risks.",intv:"I proactively identify and solve problems.",biz:"Let's proactively reach out to potential clients."},
  {word:"professionally",pos:"adverb",hindi:"पेशेवर तरीके से",simple:"In a way that meets professional standards",ipa:"/prəˈfeʃənəli/",syn:["expertly","competently","formally"],ant:["unprofessionally","carelessly"],ex:"Let's conduct ourselves professionally.",off:"Let's respond to all emails professionally.",intv:"I handle difficult situations professionally.",biz:"Let's represent the brand professionally."},
  {word:"quickly",pos:"adverb",hindi:"जल्दी से",simple:"At a fast speed",ipa:"/ˈkwɪkli/",syn:["rapidly","swiftly","promptly"],ant:["slowly","gradually"],ex:"Let's finish this quickly.",off:"Let's resolve issues quickly.",intv:"I learn new tools quickly.",biz:"Let's respond to customers quickly."},
  {word:"respectfully",pos:"adverb",hindi:"सम्मानपूर्वक",simple:"In a polite and considerate way",ipa:"/rɪˈspektfəli/",syn:["politely","courteously","considerately"],ant:["rudely","disrespectfully"],ex:"Let's address everyone respectfully.",off:"Let's respond to complaints respectfully.",intv:"I disagree respectfully when needed.",biz:"Let's handle negotiations respectfully."},
  {word:"seriously",pos:"adverb",hindi:"गंभीरता से",simple:"In a sincere and careful way",ipa:"/ˈsɪəriəsli/",syn:["earnestly","sincerely","gravely"],ant:["casually","lightly","jokingly"],ex:"Let's take our goals seriously.",off:"Let's take customer feedback seriously.",intv:"I take every assignment seriously.",biz:"Let's take our environmental commitments seriously."},
  {word:"sincerely",pos:"adverb",hindi:"सच्चाई से / दिल से",simple:"In a genuine, heartfelt way",ipa:"/sɪnˈsɪəli/",syn:["genuinely","honestly","truthfully"],ant:["insincerely","falsely"],ex:"Let's mean every word sincerely.",off:"Let's apologise sincerely when we make mistakes.",intv:"I sincerely want to contribute to this team.",biz:"Let's sincerely thank our clients for their partnership."},
  {word:"strategically",pos:"adverb",hindi:"रणनीतिक रूप से",simple:"In a way that serves a long-term goal",ipa:"/strəˈtiːdʒɪkli/",syn:["deliberately","thoughtfully","tactically"],ant:["randomly","blindly"],ex:"Let's think strategically about our future.",off:"Let's plan strategically for the next quarter.",intv:"I approach every problem strategically.",biz:"Let's invest strategically to maximise ROI."},
  {word:"successfully",pos:"adverb",hindi:"सफलतापूर्वक",simple:"In a way that achieves the intended result",ipa:"/səkˈsesfəli/",syn:["effectively","well","triumphantly"],ant:["unsuccessfully","poorly"],ex:"Let's complete this successfully.",off:"Let's deliver this project successfully.",intv:"I have successfully led three major projects.",biz:"Let's launch the product successfully."},
  {word:"thoroughly",pos:"adverb",hindi:"पूरी तरह से",simple:"In a complete and careful way",ipa:"/ˈθʌrəli/",syn:["completely","carefully","fully"],ant:["partially","superficially"],ex:"Let's check thoroughly before submitting.",off:"Let's review the document thoroughly.",intv:"I always check my work thoroughly.",biz:"Let's audit the financials thoroughly."},
  {word:"together",pos:"adverb",hindi:"मिलकर / साथ में",simple:"With each other; jointly",ipa:"/təˈɡeðər/",syn:["jointly","collectively","as one"],ant:["separately","apart","alone"],ex:"Let's do this together!",off:"Let's solve this together.",intv:"I believe we succeed together as a team.",biz:"Let's build this business together."},
  {word:"wisely",pos:"adverb",hindi:"समझदारी से",simple:"In a sensible and careful way",ipa:"/ˈwaɪzli/",syn:["sensibly","prudently","carefully"],ant:["foolishly","recklessly"],ex:"Let's spend our time wisely.",off:"Let's use resources wisely.",intv:"I make decisions wisely and thoughtfully.",biz:"Let's invest wisely for sustainable growth."},
  // PHRASES
  {word:"all set",pos:"phrase",hindi:"पूरी तरह तैयार",simple:"Ready to begin",ipa:"/ɔːl set/",syn:["ready","prepared"],ant:["unprepared"],ex:"Are we all set? Let's start!",off:"Let's confirm everyone is all set before the demo.",intv:"I am all set to take on this new role.",biz:"Let's ensure we are all set before the product goes live."},
  {word:"bear in mind",pos:"phrase",hindi:"ध्यान में रखना",simple:"To remember a fact",ipa:"/beər ɪn maɪnd/",syn:["remember","keep in mind","consider"],ant:["forget","overlook"],ex:"Let's bear in mind that time is limited.",off:"Let's bear in mind the client's preferences.",intv:"I always bear in mind the company's values.",biz:"Let's bear in mind the regulatory requirements."},
  {word:"break the ice",pos:"phrase",hindi:"बात शुरू करना / माहौल बनाना",simple:"To start a conversation in a social situation",ipa:"/breɪk ðə aɪs/",syn:["start talking","initiate"],ant:[],ex:"Let's break the ice with a quick game.",off:"Let's break the ice before the big client meeting.",intv:"I can break the ice in any new team.",biz:"Let's break the ice with prospects using a free demo."},
  {word:"catch up",pos:"phrase",hindi:"हाल-चाल लेना / पीछा करना",simple:"To meet informally or to reach the same level",ipa:"/kætʃ ʌp/",syn:["reconnect","meet up","keep up"],ant:[],ex:"Let's catch up over coffee soon.",off:"Let's catch up on emails after the meeting.",intv:"I make time to catch up with industry trends.",biz:"Let's catch up with the market leader within two years."},
  {word:"come up with",pos:"phrase",hindi:"सुझाव देना / सोचकर निकालना",simple:"To think of or produce an idea",ipa:"/kʌm ʌp wɪð/",syn:["devise","suggest","generate"],ant:[],ex:"Let's come up with a better solution.",off:"Let's come up with three options for the client.",intv:"I can come up with creative ideas under pressure.",biz:"Let's come up with a differentiated value proposition."},
  {word:"cut down on",pos:"phrase",hindi:"कम करना",simple:"To reduce the amount of something",ipa:"/kʌt daʊn ɒn/",syn:["reduce","decrease","limit"],ant:["increase","add to"],ex:"Let's cut down on screen time before bed.",off:"Let's cut down on unnecessary meetings.",intv:"I helped cut down on project delays by 40%.",biz:"Let's cut down on overhead costs."},
  {word:"figure out",pos:"phrase",hindi:"समझना / हल निकालना",simple:"To find a solution or understand something",ipa:"/ˈfɪɡər aʊt/",syn:["solve","work out","understand"],ant:["confuse","miss"],ex:"Let's figure out the best approach.",off:"Let's figure out why the system is slow.",intv:"I can figure out complex problems independently.",biz:"Let's figure out the root cause of the delay."},
  {word:"follow up",pos:"phrase",hindi:"अनुवर्ती कार्रवाई करना",simple:"To contact someone again after initial interaction",ipa:"/ˈfɒləʊ ʌp/",syn:["check back","revisit","pursue"],ant:["drop","ignore"],ex:"Let's follow up with the team tomorrow.",off:"Let's follow up on the pending approvals.",intv:"I always follow up with clients after a meeting.",biz:"Let's follow up on every lead within 24 hours."},
  {word:"get started",pos:"phrase",hindi:"शुरुआत करना",simple:"To begin an activity",ipa:"/ɡet ˈstɑːtɪd/",syn:["begin","start","kick off"],ant:["stop","end"],ex:"Let's get started right away.",off:"Let's get started on the proposal.",intv:"I am eager to get started in this role.",biz:"Let's get started on the digital transformation."},
  {word:"give it a try",pos:"phrase",hindi:"एक बार कोशिश करना",simple:"To attempt something",ipa:"/ɡɪv ɪt ə traɪ/",syn:["attempt","try it out","have a go"],ant:["give up","avoid"],ex:"We haven't tried this approach — let's give it a try.",off:"Let's give it a try with the new software.",intv:"I always give it a try before saying it can't be done.",biz:"Let's give it a try with a small pilot batch."},
  {word:"go over",pos:"phrase",hindi:"दोबारा देखना / समीक्षा करना",simple:"To review or check something",ipa:"/ɡəʊ ˈəʊvər/",syn:["review","examine","revisit"],ant:["skip","ignore"],ex:"Let's go over the notes once more.",off:"Let's go over the contract before signing.",intv:"I always go over my work before submission.",biz:"Let's go over the proposal with the client."},
  {word:"keep in touch",pos:"phrase",hindi:"संपर्क में रहना",simple:"To stay in contact with someone",ipa:"/kiːp ɪn tʌtʃ/",syn:["stay connected","stay in contact","reach out"],ant:["lose touch","disconnect"],ex:"Let's keep in touch after the event.",off:"Let's keep in touch with former clients.",intv:"I like to keep in touch with my professional network.",biz:"Let's keep in touch with potential partners."},
  {word:"keep track of",pos:"phrase",hindi:"नज़र रखना",simple:"To record and monitor something regularly",ipa:"/kiːp træk ɒv/",syn:["monitor","track","follow"],ant:["lose track","ignore"],ex:"Let's keep track of our daily progress.",off:"Let's keep track of all expenses.",intv:"I keep track of project deadlines meticulously.",biz:"Let's keep track of customer acquisition costs."},
  {word:"kick off",pos:"phrase",hindi:"शुरुआत करना",simple:"To begin an event or project",ipa:"/kɪk ɒf/",syn:["start","launch","begin"],ant:["end","conclude"],ex:"Let's kick off the session with a quick intro.",off:"Let's kick off the project with a team meeting.",intv:"I look forward to kicking off in my new role.",biz:"Let's kick off the campaign with a social media post."},
  {word:"look forward to",pos:"phrase",hindi:"उत्सुकता से प्रतीक्षा करना",simple:"To feel excited about something in the future",ipa:"/lʊk ˈfɔːwəd tuː/",syn:["anticipate","await","expect"],ant:["dread","fear"],ex:"Let's look forward to tomorrow's session!",off:"Let's look forward to the new quarter.",intv:"I look forward to contributing to your team.",biz:"Let's look forward to a long-term partnership."},
  {word:"make a difference",pos:"phrase",hindi:"बदलाव लाना / असर डालना",simple:"To have a positive impact",ipa:"/meɪk ə ˈdɪfərəns/",syn:["create impact","contribute","matter"],ant:[],ex:"Let's make a difference every day.",off:"Let's make a difference in our customer experience.",intv:"I want to make a difference in this organisation.",biz:"Let's make a difference through our CSR programmes."},
  {word:"make the most of",pos:"phrase",hindi:"पूरा फ़ायदा उठाना",simple:"To use an opportunity as fully as possible",ipa:"/meɪk ðə məʊst ɒv/",syn:["maximise","capitalise on","utilise"],ant:["waste","ignore"],ex:"Let's make the most of this opportunity.",off:"Let's make the most of our training budget.",intv:"I always make the most of every learning opportunity.",biz:"Let's make the most of the festive season sales."},
  {word:"move on",pos:"phrase",hindi:"आगे बढ़ना",simple:"To continue to the next topic or phase",ipa:"/muːv ɒn/",syn:["proceed","continue","advance"],ant:["dwell","stay","stop"],ex:"Let's move on to the next topic.",off:"Let's move on from the issue and find a solution.",intv:"I believe in learning from mistakes and moving on.",biz:"Let's move on to phase two of the project."},
  {word:"on the same page",pos:"phrase",hindi:"एक राय होना / सहमत होना",simple:"To have the same understanding",ipa:"/ɒn ðə seɪm peɪdʒ/",syn:["aligned","in agreement","in sync"],ant:["misaligned","disagreeing"],ex:"Let's make sure we're all on the same page.",off:"Let's get on the same page before the client call.",intv:"I always ensure my team is on the same page.",biz:"Let's get all stakeholders on the same page."},
  {word:"set a goal",pos:"phrase",hindi:"लक्ष्य निर्धारित करना",simple:"To decide on something you want to achieve",ipa:"/set ə ɡəʊl/",syn:["target","aim","plan"],ant:[],ex:"Let's set a goal together.",off:"Let's set a goal for next month's team performance.",intv:"I set a goal at the start of each quarter.",biz:"Let's set a goal to acquire 100 new clients."},
  {word:"step up",pos:"phrase",hindi:"आगे आना / बढ़-चढ़कर काम करना",simple:"To take on more responsibility or effort",ipa:"/step ʌp/",syn:["rise to the occasion","take charge","improve"],ant:["step back","retreat"],ex:"Let's step up and take responsibility.",off:"Let's step up our customer support quality.",intv:"I stepped up to lead the team when my manager was on leave.",biz:"Let's step up our marketing efforts this season."},
  {word:"take action",pos:"phrase",hindi:"कदम उठाना",simple:"To do something about a problem",ipa:"/teɪk ˈækʃən/",syn:["act","respond","do something"],ant:["delay","procrastinate","wait"],ex:"Let's take action instead of just talking.",off:"Let's take action on the customer's complaint today.",intv:"I take action quickly when I see a problem.",biz:"Let's take action before competitors do."},
  {word:"take a break",pos:"phrase",hindi:"विराम लेना",simple:"To stop work temporarily for rest",ipa:"/teɪk ə breɪk/",syn:["rest","pause","have a rest"],ant:["continue","keep going"],ex:"Let's take a break and refresh our minds.",off:"Let's take a break before the afternoon session.",intv:"I know when to take a break to maintain productivity.",biz:"Let's take a break from the current strategy and re-evaluate."},
  {word:"think outside the box",pos:"phrase",hindi:"अलग सोचना",simple:"To think creatively beyond normal limits",ipa:"/θɪŋk aʊtˈsaɪd ðə bɒks/",syn:["be creative","innovate","think differently"],ant:["follow convention","stay traditional"],ex:"Let's think outside the box for this campaign.",off:"Let's think outside the box to solve this problem.",intv:"I always think outside the box to find better solutions.",biz:"Let's think outside the box to enter new markets."},
  {word:"win-win",pos:"phrase",hindi:"सभी के लिए फायदेमंद",simple:"A situation where everyone benefits",ipa:"/wɪn wɪn/",syn:["mutually beneficial","advantageous","positive for all"],ant:["lose-lose","one-sided"],ex:"Let's find a win-win for both sides.",off:"Let's aim for a win-win in every negotiation.",intv:"I always look for a win-win outcome.",biz:"Let's structure this deal as a win-win partnership."},
];

// Deduplicate by word
const seen = new Set();
const vocabulary = [];
let vid = 1;
for (const v of vocabRaw) {
  const key = v.word.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  vocabulary.push({
    id: vid++,
    word: v.word,
    partOfSpeech: v.pos,
    hindi: v.hindi,
    simpleMeaning: v.simple,
    ipa: v.ipa,
    synonyms: v.syn,
    antonyms: v.ant,
    example: v.ex,
    officeExample: v.off,
    interviewExample: v.intv,
    businessExample: v.biz
  });
}

// ─── PRACTICE & MOCK TEST GENERATOR ─────────────────────────────────────────
// Subject definitions
const subjects = [
  { name: "हम", eng: "we", formal: false },
  { name: "हम सब", eng: "we all", formal: false },
  { name: "हम दोनों", eng: "the two of us", formal: false },
  { name: "हम सब मिलकर", eng: "we all together", formal: false },
  { name: "चलिए हम", eng: "let us", formal: true },
  { name: "हमारी टीम", eng: "our team", formal: false },
  { name: "हम सब मिलकर काम करें", eng: "we work together", formal: true },
  { name: "हम लोग", eng: "we people", formal: false },
  { name: "हम सबको मिलकर", eng: "all of us", formal: false },
  { name: "हमारा ग्रुप", eng: "our group", formal: false },
  { name: "मित्रों", eng: "friends", formal: false },
  { name: "सहकर्मियों", eng: "colleagues", formal: true },
];

// Verb phrases for "Let's + base verb" — 90 unique phrases
const verbPhrases = [
  // Daily Life
  { h: "बाहर जाते हैं", e: "go outside", tags: ["daily","easy"] },
  { h: "खाना खाते हैं", e: "have lunch", tags: ["daily","easy"] },
  { h: "पानी पीते हैं", e: "drink some water", tags: ["daily","easy"] },
  { h: "थोड़ा आराम करते हैं", e: "take some rest", tags: ["daily","easy"] },
  { h: "सुबह जल्दी उठते हैं", e: "wake up early in the morning", tags: ["daily","easy"] },
  { h: "साथ नाश्ता करते हैं", e: "have breakfast together", tags: ["daily","easy"] },
  { h: "रात का खाना बनाते हैं", e: "cook dinner", tags: ["daily","easy"] },
  { h: "घर की सफाई करते हैं", e: "clean the house", tags: ["daily","easy"] },
  { h: "बाज़ार जाते हैं", e: "go to the market", tags: ["daily","easy"] },
  { h: "पार्क में टहलते हैं", e: "take a walk in the park", tags: ["daily","easy"] },
  { h: "फिल्म देखने जाते हैं", e: "go watch a movie", tags: ["daily","easy"] },
  { h: "संगीत सुनते हैं", e: "listen to some music", tags: ["daily","easy"] },
  { h: "साथ खेलते हैं", e: "play together", tags: ["daily","easy"] },
  { h: "घर वापस जाते हैं", e: "head back home", tags: ["daily","easy"] },
  { h: "कुछ मीठा खाते हैं", e: "eat something sweet", tags: ["daily","easy"] },
  { h: "चाय पीते हैं", e: "have some tea", tags: ["daily","easy"] },
  { h: "बाहर घूमने जाते हैं", e: "go for a stroll outside", tags: ["daily","medium"] },
  { h: "कहानी सुनते हैं", e: "listen to a story", tags: ["daily","easy"] },
  { h: "बच्चों के साथ खेलते हैं", e: "play with the children", tags: ["family","easy"] },
  { h: "परिवार के साथ समय बिताते हैं", e: "spend time with family", tags: ["family","easy"] },
  // Office
  { h: "मीटिंग शुरू करते हैं", e: "start the meeting", tags: ["office","easy"] },
  { h: "रिपोर्ट बनाते हैं", e: "prepare the report", tags: ["office","medium"] },
  { h: "ईमेल चेक करते हैं", e: "check our emails", tags: ["office","easy"] },
  { h: "प्रेजेंटेशन तैयार करते हैं", e: "prepare the presentation", tags: ["office","medium"] },
  { h: "टीम के साथ बात करते हैं", e: "talk to the team", tags: ["office","easy"] },
  { h: "काम की समीक्षा करते हैं", e: "review our work", tags: ["office","medium"] },
  { h: "क्लाइंट को कॉल करते हैं", e: "call the client", tags: ["office","medium"] },
  { h: "डेटा एनालाइज़ करते हैं", e: "analyse the data", tags: ["office","medium"] },
  { h: "एजेंडा तैयार करते हैं", e: "prepare the agenda", tags: ["office","medium"] },
  { h: "टास्क डिवाइड करते हैं", e: "divide the tasks", tags: ["office","medium"] },
  { h: "फाइल सेव करते हैं", e: "save the file", tags: ["office","easy"] },
  { h: "प्रोजेक्ट पर काम शुरू करते हैं", e: "start working on the project", tags: ["office","medium"] },
  { h: "टीम मीटिंग में भाग लेते हैं", e: "attend the team meeting", tags: ["office","easy"] },
  { h: "फीडबैक देते हैं", e: "give feedback", tags: ["office","medium"] },
  { h: "नई पॉलिसी पढ़ते हैं", e: "read the new policy", tags: ["office","medium"] },
  // Business
  { h: "नया प्लान बनाते हैं", e: "make a new plan", tags: ["business","medium"] },
  { h: "बजट तय करते हैं", e: "decide the budget", tags: ["business","hard"] },
  { h: "मार्केट रिसर्च करते हैं", e: "do market research", tags: ["business","hard"] },
  { h: "क्लाइंट से मिलते हैं", e: "meet the client", tags: ["business","medium"] },
  { h: "प्रपोज़ल भेजते हैं", e: "send the proposal", tags: ["business","medium"] },
  { h: "नई स्ट्रैटेजी बनाते हैं", e: "build a new strategy", tags: ["business","hard"] },
  { h: "पार्टनरशिप एक्सप्लोर करते हैं", e: "explore a partnership", tags: ["business","hard"] },
  { h: "सेल्स टारगेट तय करते हैं", e: "set our sales targets", tags: ["business","hard"] },
  { h: "रिव्यू मीटिंग रखते हैं", e: "schedule a review meeting", tags: ["business","medium"] },
  { h: "प्रॉफिट कैलकुलेट करते हैं", e: "calculate the profit", tags: ["business","hard"] },
  // Health
  { h: "रोज़ व्यायाम करते हैं", e: "exercise every day", tags: ["health","easy"] },
  { h: "योगा शुरू करते हैं", e: "start yoga", tags: ["health","easy"] },
  { h: "हेल्दी खाना खाते हैं", e: "eat healthy food", tags: ["health","easy"] },
  { h: "जल्दी सोते हैं", e: "sleep early", tags: ["health","easy"] },
  { h: "पर्याप्त पानी पीते हैं", e: "drink enough water", tags: ["health","easy"] },
  { h: "जंक फूड से बचते हैं", e: "avoid junk food", tags: ["health","easy"] },
  { h: "डॉक्टर से मिलते हैं", e: "visit the doctor", tags: ["health","medium"] },
  { h: "मेडिटेशन करते हैं", e: "do some meditation", tags: ["health","easy"] },
  // Travel
  { h: "यात्रा की योजना बनाते हैं", e: "plan the trip", tags: ["travel","medium"] },
  { h: "टिकट बुक करते हैं", e: "book the tickets", tags: ["travel","medium"] },
  { h: "होटल ढूंढते हैं", e: "find a hotel", tags: ["travel","medium"] },
  { h: "एक नई जगह एक्सप्लोर करते हैं", e: "explore a new place", tags: ["travel","medium"] },
  { h: "रास्ता ढूंढते हैं", e: "find the way", tags: ["travel","easy"] },
  { h: "ट्रेन पकड़ते हैं", e: "catch the train", tags: ["travel","easy"] },
  // Learning / Education
  { h: "English practice करते हैं", e: "practise English", tags: ["education","easy"] },
  { h: "नई vocabulary सीखते हैं", e: "learn new vocabulary", tags: ["education","easy"] },
  { h: "किताब पढ़ते हैं", e: "read a book", tags: ["education","easy"] },
  { h: "नोट्स बनाते हैं", e: "make notes", tags: ["education","easy"] },
  { h: "गणित की practice करते हैं", e: "practise maths", tags: ["education","easy"] },
  { h: "इस topic को दोहराते हैं", e: "revise this topic", tags: ["education","medium"] },
  { h: "ऑनलाइन कोर्स join करते हैं", e: "join an online course", tags: ["education","medium"] },
  { h: "हर रोज़ कुछ नया सीखते हैं", e: "learn something new every day", tags: ["education","easy"] },
  // Technology
  { h: "नया app डाउनलोड करते हैं", e: "download a new app", tags: ["tech","medium"] },
  { h: "सॉफ्टवेयर अपडेट करते हैं", e: "update the software", tags: ["tech","medium"] },
  { h: "ऑनलाइन ग्रुप बनाते हैं", e: "create an online group", tags: ["tech","medium"] },
  { h: "वेबसाइट चेक करते हैं", e: "check the website", tags: ["tech","easy"] },
  { h: "वीडियो कॉल करते हैं", e: "make a video call", tags: ["tech","easy"] },
  // Goals / Motivation
  { h: "अपने लक्ष्य तय करते हैं", e: "set our goals", tags: ["goals","medium"] },
  { h: "एक-दूसरे को प्रेरित करते हैं", e: "motivate each other", tags: ["goals","easy"] },
  { h: "हार नहीं मानते", e: "not give up", tags: ["goals","medium"] },
  { h: "सकारात्मक सोचते हैं", e: "think positively", tags: ["goals","easy"] },
  { h: "एक नई शुरुआत करते हैं", e: "make a fresh start", tags: ["goals","easy"] },
  { h: "समय का सदुपयोग करते हैं", e: "use our time wisely", tags: ["goals","medium"] },
  { h: "अपनी गलतियों से सीखते हैं", e: "learn from our mistakes", tags: ["goals","medium"] },
  // Emotions / Social
  { h: "खुशी मनाते हैं", e: "celebrate", tags: ["social","easy"] },
  { h: "माफी मांगते हैं", e: "apologise", tags: ["social","medium"] },
  { h: "धन्यवाद देते हैं", e: "say thank you", tags: ["social","easy"] },
  { h: "एक-दूसरे की मदद करते हैं", e: "help each other", tags: ["social","easy"] },
  { h: "अच्छी बातें करते हैं", e: "have a good conversation", tags: ["social","easy"] },
  { h: "झगड़ा नहीं करते", e: "not argue", tags: ["social","easy"] },
  { h: "मिलजुल कर रहते हैं", e: "live together harmoniously", tags: ["family","medium"] },
  // Interview
  { h: "इंटरव्यू की तैयारी करते हैं", e: "prepare for the interview", tags: ["interview","medium"] },
  { h: "सवालों के जवाब practice करते हैं", e: "practise answering questions", tags: ["interview","medium"] },
  { h: "अपना रिज़्यूमे update करते हैं", e: "update our resume", tags: ["interview","medium"] },
];

// Sentence types
const sentenceTypes = [
  {
    type: "positive",
    build: (vp) => ({ e: `Let's ${vp.e}.`, tags: ["positive"], hint: "Let's + base verb", exp: `"Let's" is short for "Let us". Use it to suggest doing something together.`, diff: vp.tags.includes("hard") ? "hard" : vp.tags.includes("medium") ? "medium" : "easy" }),
  },
  {
    type: "negative",
    build: (vp) => ({ e: `Let's not ${vp.e}.`, tags: ["negative"], hint: "Let's not + base verb", exp: `"Let's not" is used to suggest NOT doing something as a group. The base verb follows directly.`, diff: vp.tags.includes("hard") ? "hard" : "medium" }),
  },
  {
    type: "tag",
    build: (vp) => ({ e: `Let's ${vp.e}, shall we?`, tags: ["tag question"], hint: "Let's + base verb + , shall we?", exp: `Tag question for "Let's": always use "shall we?" at the end to confirm the suggestion.`, diff: "hard" }),
  },
];

// Build Hindi sentences
function buildHindi(vp, type) {
  if (type === "positive") return `चलो ${vp.h}।`;
  if (type === "negative") return `चलो ${vp.h} नहीं।`;
  if (type === "tag") return `चलो ${vp.h}, ठीक है?`;
  return `चलो ${vp.h}।`;
}

// Additional Hindi sentence variants for negatives to sound more natural
const negativeHindiOverride = {
  "go outside": "चलो बाहर नहीं जाते।",
  "have lunch": "चलो अभी खाना नहीं खाते।",
  "drink some water": "चलो अभी पानी नहीं पीते।",
  "take some rest": "चलो अभी आराम नहीं करते।",
  "wake up early in the morning": "चलो कल सुबह जल्दी नहीं उठते।",
  "have breakfast together": "चलो साथ नाश्ता नहीं करते।",
  "cook dinner": "चलो आज रात खाना नहीं बनाते।",
  "clean the house": "चलो अभी घर की सफाई नहीं करते।",
  "go to the market": "चलो अभी बाज़ार नहीं जाते।",
  "take a walk in the park": "चलो आज पार्क में नहीं टहलते।",
  "go watch a movie": "चलो फिल्म देखने नहीं जाते।",
  "listen to some music": "चलो अभी संगीत नहीं सुनते।",
  "play together": "चलो अभी नहीं खेलते।",
  "head back home": "चलो अभी घर वापस नहीं जाते।",
  "eat something sweet": "चलो अभी कुछ मीठा नहीं खाते।",
  "have some tea": "चलो अभी चाय नहीं पीते।",
  "go for a stroll outside": "चलो आज बाहर नहीं घूमते।",
  "listen to a story": "चलो अभी कहानी नहीं सुनते।",
  "play with the children": "चलो अभी बच्चों के साथ नहीं खेलते।",
  "spend time with family": "चलो अभी परिवार के साथ नहीं बैठते।",
  "start the meeting": "चलो अभी मीटिंग शुरू नहीं करते।",
  "prepare the report": "चलो अभी रिपोर्ट नहीं बनाते।",
  "check our emails": "चलो अभी ईमेल चेक नहीं करते।",
  "prepare the presentation": "चलो अभी प्रेजेंटेशन तैयार नहीं करते।",
  "talk to the team": "चलो अभी टीम से बात नहीं करते।",
  "review our work": "चलो अभी काम की समीक्षा नहीं करते।",
  "call the client": "चलो अभी क्लाइंट को कॉल नहीं करते।",
  "analyse the data": "चलो अभी डेटा एनालाइज़ नहीं करते।",
  "prepare the agenda": "चलो अभी एजेंडा तैयार नहीं करते।",
  "divide the tasks": "चलो अभी टास्क डिवाइड नहीं करते।",
  "save the file": "चलो अभी फाइल सेव नहीं करते।",
  "start working on the project": "चलो अभी प्रोजेक्ट पर काम नहीं करते।",
  "attend the team meeting": "चलो आज टीम मीटिंग में नहीं जाते।",
  "give feedback": "चलो अभी फीडबैक नहीं देते।",
  "read the new policy": "चलो अभी नई पॉलिसी नहीं पढ़ते।",
  "make a new plan": "चलो अभी नया प्लान नहीं बनाते।",
  "decide the budget": "चलो अभी बजट तय नहीं करते।",
  "do market research": "चलो अभी मार्केट रिसर्च नहीं करते।",
  "meet the client": "चलो आज क्लाइंट से नहीं मिलते।",
  "send the proposal": "चलो अभी प्रपोज़ल नहीं भेजते।",
  "build a new strategy": "चलो अभी नई स्ट्रैटेजी नहीं बनाते।",
  "explore a partnership": "चलो अभी पार्टनरशिप एक्सप्लोर नहीं करते।",
  "set our sales targets": "चलो अभी सेल्स टारगेट तय नहीं करते।",
  "schedule a review meeting": "चलो अभी रिव्यू मीटिंग नहीं रखते।",
  "calculate the profit": "चलो अभी प्रॉफिट कैलकुलेट नहीं करते।",
  "exercise every day": "चलो हर रोज़ व्यायाम करना बंद नहीं करते।",
  "start yoga": "चलो अभी योगा शुरू नहीं करते।",
  "eat healthy food": "चलो आज हेल्दी खाना नहीं खाते।",
  "sleep early": "चलो आज जल्दी नहीं सोते।",
  "drink enough water": "चलो आज पर्याप्त पानी पीना नहीं छोड़ते।",
  "avoid junk food": "चलो जंक फूड खाना बंद नहीं करते।",
  "visit the doctor": "चलो अभी डॉक्टर के पास नहीं जाते।",
  "do some meditation": "चलो अभी मेडिटेशन नहीं करते।",
  "plan the trip": "चलो अभी यात्रा की योजना नहीं बनाते।",
  "book the tickets": "चलो अभी टिकट बुक नहीं करते।",
  "find a hotel": "चलो अभी होटल नहीं ढूंढते।",
  "explore a new place": "चलो अभी नई जगह एक्सप्लोर नहीं करते।",
  "find the way": "चलो अभी रास्ता नहीं ढूंढते।",
  "catch the train": "चलो यह ट्रेन नहीं पकड़ते।",
  "practise English": "चलो अभी English practice नहीं करते।",
  "learn new vocabulary": "चलो अभी नई vocabulary नहीं सीखते।",
  "read a book": "चलो अभी किताब नहीं पढ़ते।",
  "make notes": "चलो अभी नोट्स नहीं बनाते।",
  "practise maths": "चलो आज गणित की practice नहीं करते।",
  "revise this topic": "चलो इस topic को अभी नहीं दोहराते।",
  "join an online course": "चलो अभी कोई ऑनलाइन कोर्स join नहीं करते।",
  "learn something new every day": "चलो कुछ नया सीखना बंद नहीं करते।",
  "download a new app": "चलो अभी नया app download नहीं करते।",
  "update the software": "चलो अभी सॉफ्टवेयर अपडेट नहीं करते।",
  "create an online group": "चलो अभी ऑनलाइन ग्रुप नहीं बनाते।",
  "check the website": "चलो अभी वेबसाइट चेक नहीं करते।",
  "make a video call": "चलो अभी वीडियो कॉल नहीं करते।",
  "set our goals": "चलो अभी अपने लक्ष्य तय नहीं करते।",
  "motivate each other": "चलो एक-दूसरे को निराश नहीं करते।",
  "not give up": "चलो हार नहीं मानते।",
  "think positively": "चलो नकारात्मक नहीं सोचते।",
  "make a fresh start": "चलो पुरानी बातें नहीं भूलते।",
  "use our time wisely": "चलो समय बर्बाद नहीं करते।",
  "learn from our mistakes": "चलो अपनी गलतियों को नज़रअंदाज़ नहीं करते।",
  "celebrate": "चलो अभी जश्न नहीं मनाते।",
  "apologise": "चलो माफी माँगना नहीं भूलते।",
  "say thank you": "चलो शुक्रिया कहना नहीं भूलते।",
  "help each other": "चलो एक-दूसरे की मदद करना नहीं छोड़ते।",
  "have a good conversation": "चलो बुरी बातें नहीं करते।",
  "not argue": "चलो झगड़ा नहीं करते।",
  "live together harmoniously": "चलो अलग-अलग नहीं रहते।",
  "prepare for the interview": "चलो इंटरव्यू की तैयारी अभी नहीं करते।",
  "practise answering questions": "चलो अभी सवालों के जवाब practice नहीं करते।",
  "update our resume": "चलो अभी रिज़्यूमे अपडेट नहीं करते।",
};

// Also generate additional varied phrases by adding context words
const extraPhrases = [
  { h: "जल्दी से खाना खाते हैं", e: "have a quick meal", tags: ["daily","easy"] },
  { h: "साथ कॉफी पीते हैं", e: "have coffee together", tags: ["daily","easy"] },
  { h: "अपनी आदतें सुधारते हैं", e: "improve our habits", tags: ["goals","medium"] },
  { h: "मिलकर निर्णय लेते हैं", e: "make a decision together", tags: ["office","medium"] },
  { h: "एक नया प्रयास करते हैं", e: "make a new attempt", tags: ["goals","medium"] },
  { h: "अपने दिन की योजना बनाते हैं", e: "plan our day", tags: ["daily","easy"] },
  { h: "समस्या का हल ढूंढते हैं", e: "find a solution to the problem", tags: ["office","medium"] },
  { h: "एक साथ मिलकर पढ़ते हैं", e: "study together", tags: ["education","easy"] },
  { h: "कुछ नया try करते हैं", e: "try something new", tags: ["goals","easy"] },
  { h: "साथ में gym जाते हैं", e: "go to the gym together", tags: ["health","medium"] },
  { h: "मीटिंग से पहले prepare करते हैं", e: "prepare before the meeting", tags: ["office","medium"] },
  { h: "अपना कमरा organize करते हैं", e: "organise our room", tags: ["daily","easy"] },
  { h: "अपनी team को motivate करते हैं", e: "motivate our team", tags: ["office","medium"] },
  { h: "एक-दूसरे का ख़याल रखते हैं", e: "look after each other", tags: ["family","easy"] },
  { h: "नई skills develop करते हैं", e: "develop new skills", tags: ["goals","medium"] },
  { h: "market visit करते हैं", e: "visit the market", tags: ["business","medium"] },
  { h: "अपना काम जल्दी खत्म करते हैं", e: "finish our work quickly", tags: ["office","medium"] },
  { h: "नाश्ते के बाद walk करते हैं", e: "go for a walk after breakfast", tags: ["health","easy"] },
  { h: "दोस्तों से मिलते हैं", e: "meet our friends", tags: ["social","easy"] },
  { h: "अपने लक्ष्य review करते हैं", e: "review our goals", tags: ["goals","medium"] },
  { h: "client को email करते हैं", e: "email the client", tags: ["office","medium"] },
  { h: "project की deadline check करते हैं", e: "check the project deadline", tags: ["office","medium"] },
  { h: "conference call join करते हैं", e: "join the conference call", tags: ["office","medium"] },
  { h: "नई strategy implement करते हैं", e: "implement the new strategy", tags: ["business","hard"] },
  { h: "अपनी progress share करते हैं", e: "share our progress", tags: ["office","medium"] },
  { h: "weekend का plan बनाते हैं", e: "plan our weekend", tags: ["daily","easy"] },
  { h: "अपने parents से बात करते हैं", e: "talk to our parents", tags: ["family","easy"] },
  { h: "किसी ज़रूरतमंद की मदद करते हैं", e: "help someone in need", tags: ["social","easy"] },
  { h: "अपने भविष्य के बारे में सोचते हैं", e: "think about our future", tags: ["goals","medium"] },
  { h: "आज का काम आज ही करते हैं", e: "do today's work today", tags: ["daily","medium"] },
  { h: "कोई नई किताब order करते हैं", e: "order a new book", tags: ["education","easy"] },
  { h: "अपनी team को training देते हैं", e: "train our team", tags: ["office","hard"] },
  { h: "social media break लेते हैं", e: "take a social media break", tags: ["health","easy"] },
  { h: "अपनी presentation improve करते हैं", e: "improve our presentation", tags: ["office","medium"] },
  { h: "अपने expenses track करते हैं", e: "track our expenses", tags: ["daily","medium"] },
  { h: "एक अच्छा meal cook करते हैं", e: "cook a nice meal", tags: ["daily","easy"] },
  { h: "volunteer work करते हैं", e: "do some volunteer work", tags: ["social","medium"] },
  { h: "अपनी company grow करते हैं", e: "grow our company", tags: ["business","hard"] },
  { h: "एक नया project शुरू करते हैं", e: "start a new project", tags: ["office","medium"] },
  { h: "अच्छी नींद लेते हैं", e: "get a good night's sleep", tags: ["health","easy"] },
  { h: "अपनी team की बात सुनते हैं", e: "listen to our team", tags: ["office","medium"] },
  { h: "community event में भाग लेते हैं", e: "participate in a community event", tags: ["social","medium"] },
  { h: "picnic पर जाते हैं", e: "go on a picnic", tags: ["travel","easy"] },
  { h: "अपना CV update करते हैं", e: "update our CV", tags: ["interview","medium"] },
  { h: "एक-दूसरे को पढ़ाते हैं", e: "teach each other", tags: ["education","medium"] },
  { h: "leadership skill develop करते हैं", e: "develop leadership skills", tags: ["goals","hard"] },
  { h: "नए ideas brainstorm करते हैं", e: "brainstorm new ideas", tags: ["office","medium"] },
  { h: "अपनी team को appreciate करते हैं", e: "appreciate our team", tags: ["office","easy"] },
  { h: "performance review करते हैं", e: "conduct a performance review", tags: ["office","hard"] },
  { h: "customer service improve करते हैं", e: "improve our customer service", tags: ["business","hard"] },
];

const allPhrases = [...verbPhrases, ...extraPhrases];

// Generate all sentences
const practiceEnglishSet = new Set();
const mockTestEnglishSet = new Set();
const allItems = [];

function buildItem(vp, stype, idx) {
  const typeObj = sentenceTypes.find(s => s.type === stype);
  const built = typeObj.build(vp);
  let hindi;
  if (stype === "negative" && negativeHindiOverride[vp.e]) {
    hindi = negativeHindiOverride[vp.e];
  } else {
    hindi = buildHindi(vp, stype);
  }
  const tags = [...(vp.tags || []), ...(built.tags || [])];
  const uniqueTags = [...new Set(tags)];
  // alternatives
  let alternatives = [];
  if (stype === "positive") {
    alternatives = [`let's ${vp.e}.`].filter(a => a !== built.e.toLowerCase());
    if (alternatives[0] === built.e.toLowerCase()) alternatives = [];
  }
  return {
    hindi,
    english: built.e,
    alternatives,
    hint: built.hint,
    explanation: built.exp,
    difficulty: built.diff,
    tags: uniqueTags,
  };
}

// Generate all combinations
for (const vp of allPhrases) {
  for (const st of sentenceTypes) {
    const core = buildItem(vp, st.type, 0);
    allItems.push(core);
  }
}

// Shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
shuffle(allItems);

// Deduplicate by english sentence
const dedupedItems = [];
const globalEnglishSet = new Set();
for (const item of allItems) {
  const key = item.english.toLowerCase().trim();
  if (!globalEnglishSet.has(key)) {
    globalEnglishSet.add(key);
    dedupedItems.push(item);
  }
}

// Need 900 practice + 350 mockTest = 1250 unique items
// We have allPhrases.length * 3 = 140 * 3 = 420 combinations — not enough
// So we need to expand by adding more varied sentences directly
const extraItems = [
  // positive
  {hindi:"चलो अपना काम ध्यान से करते हैं।",english:"Let's do our work carefully.",alternatives:["let's work carefully."],hint:"Let's + base verb + adverb",explanation:"Let's is followed directly by the base verb.",difficulty:"easy",tags:["daily","positive"]},
  {hindi:"चलो सब एक साथ आगे बढ़ते हैं।",english:"Let's all move forward together.",alternatives:[],hint:"Let's + base verb + adverb",explanation:"Let's suggests a joint action for the group.",difficulty:"medium",tags:["goals","positive"]},
  {hindi:"चलो office में नई policy follow करते हैं।",english:"Let's follow the new office policy.",alternatives:[],hint:"Let's + follow + object",explanation:"'Let's' proposes the action of following the policy together.",difficulty:"medium",tags:["office","positive"]},
  {hindi:"चलो अपने दिन को productive बनाते हैं।",english:"Let's make our day productive.",alternatives:[],hint:"Let's + make + object + adjective",explanation:"Let's is used to propose making the day productive.",difficulty:"medium",tags:["goals","positive"]},
  {hindi:"चलो थोड़ा धैर्य रखते हैं।",english:"Let's be a little patient.",alternatives:["let's stay patient."],hint:"Let's + be + adjective",explanation:"'Let's be' is a common pattern to suggest a quality.",difficulty:"easy",tags:["goals","positive"]},
  {hindi:"चलो project की final review करते हैं।",english:"Let's do the final review of the project.",alternatives:[],hint:"Let's + do + object",explanation:"'Let's do' is a common way to propose a task.",difficulty:"medium",tags:["office","positive"]},
  {hindi:"चलो interview के बाद HR को thank you note भेजते हैं।",english:"Let's send a thank-you note to HR after the interview.",alternatives:[],hint:"Let's + send + object + to + noun",explanation:"'Let's send' suggests sending something together.",difficulty:"hard",tags:["interview","positive"]},
  {hindi:"चलो सब मिलकर report finish करते हैं।",english:"Let's all finish the report together.",alternatives:[],hint:"Let's + all + base verb",explanation:"Adding 'all' makes the suggestion more inclusive.",difficulty:"medium",tags:["office","positive"]},
  {hindi:"चलो presentation में confidence के साथ बोलते हैं।",english:"Let's speak confidently in the presentation.",alternatives:[],hint:"Let's + base verb + adverb",explanation:"Let's + speak + adverb — suggesting a manner of speaking.",difficulty:"hard",tags:["office","positive"]},
  {hindi:"चलो कल की meeting की तैयारी अभी से करते हैं।",english:"Let's start preparing for tomorrow's meeting now.",alternatives:[],hint:"Let's + start + gerund",explanation:"Let's + start + verb-ing is a common pattern.",difficulty:"hard",tags:["office","positive"]},
  {hindi:"चलो budget के अंदर रहते हैं।",english:"Let's stay within the budget.",alternatives:[],hint:"Let's + stay + within + noun",explanation:"'Let's stay within' suggests remaining in limits.",difficulty:"hard",tags:["business","positive"]},
  {hindi:"चलो अच्छे से plan follow करते हैं।",english:"Let's follow the plan properly.",alternatives:[],hint:"Let's + follow + noun + adverb",explanation:"'Properly' is an adverb that describes how to follow the plan.",difficulty:"medium",tags:["office","positive"]},
  {hindi:"चलो क्लाइंट की problem seriously लेते हैं।",english:"Let's take the client's problem seriously.",alternatives:[],hint:"Let's + take + noun + adverb",explanation:"'Take seriously' means to treat with full attention.",difficulty:"hard",tags:["business","positive"]},
  {hindi:"चलो इस बार बेहतर result लाते हैं।",english:"Let's achieve better results this time.",alternatives:[],hint:"Let's + achieve + object",explanation:"Let's + achieve + noun suggests working toward a better outcome.",difficulty:"hard",tags:["goals","positive"]},
  {hindi:"चलो सब साथ में एक अच्छा plan बनाते हैं।",english:"Let's all make a good plan together.",alternatives:[],hint:"Let's + all + make + object",explanation:"'All' adds emphasis that everyone participates.",difficulty:"medium",tags:["goals","positive"]},
  // negative
  {hindi:"चलो बेकार की बातों में समय बर्बाद नहीं करते।",english:"Let's not waste time on unnecessary things.",alternatives:[],hint:"Let's not + waste + noun",explanation:"'Let's not waste' is a negative suggestion to avoid wasting time.",difficulty:"medium",tags:["goals","negative"]},
  {hindi:"चलो office में loud music नहीं बजाते।",english:"Let's not play loud music in the office.",alternatives:[],hint:"Let's not + play + noun + place",explanation:"'Let's not' prohibits the action of playing loud music.",difficulty:"medium",tags:["office","negative"]},
  {hindi:"चलो meeting में phone नहीं चेक करते।",english:"Let's not check our phones during the meeting.",alternatives:[],hint:"Let's not + check + noun + during + noun",explanation:"'Let's not check' is a group suggestion to avoid phone use.",difficulty:"medium",tags:["office","negative"]},
  {hindi:"चलो deadline miss नहीं करते।",english:"Let's not miss the deadline.",alternatives:[],hint:"Let's not + miss + noun",explanation:"'Let's not miss' is a collective commitment.",difficulty:"medium",tags:["office","negative"]},
  {hindi:"चलो एक-दूसरे की बुराई नहीं करते।",english:"Let's not speak badly about each other.",alternatives:[],hint:"Let's not + speak + adverb + about + noun",explanation:"'Let's not speak badly' is a suggestion to avoid gossip.",difficulty:"medium",tags:["social","negative"]},
  {hindi:"चलो पैसे बर्बाद नहीं करते।",english:"Let's not waste money.",alternatives:["let's not spend unnecessarily."],hint:"Let's not + waste + noun",explanation:"'Let's not waste' = negative group suggestion.",difficulty:"easy",tags:["daily","negative"]},
  {hindi:"चलो जल्दबाज़ी में गलत निर्णय नहीं लेते।",english:"Let's not make hasty decisions.",alternatives:[],hint:"Let's not + make + adjective + noun",explanation:"'Let's not make hasty decisions' — negative group suggestion.",difficulty:"hard",tags:["goals","negative"]},
  {hindi:"चलो काम को टालते नहीं रहते।",english:"Let's not keep postponing the work.",alternatives:[],hint:"Let's not + keep + gerund",explanation:"'Let's not keep + -ing' means don't continue doing something.",difficulty:"hard",tags:["office","negative"]},
  {hindi:"चलो अपनी कमज़ोरियों को ignore नहीं करते।",english:"Let's not ignore our weaknesses.",alternatives:[],hint:"Let's not + ignore + noun",explanation:"'Ignore' follows directly after 'let's not'.",difficulty:"medium",tags:["goals","negative"]},
  {hindi:"चलो नकारात्मक सोच पर ध्यान नहीं देते।",english:"Let's not focus on negative thinking.",alternatives:[],hint:"Let's not + focus on + noun",explanation:"'Let's not focus on' suggests avoiding dwelling on negativity.",difficulty:"medium",tags:["goals","negative"]},
  {hindi:"चलो project का scope अचानक नहीं बदलते।",english:"Let's not suddenly change the project scope.",alternatives:[],hint:"Let's not + suddenly + change + noun",explanation:"Adverbs like 'suddenly' can appear between 'not' and the verb.",difficulty:"hard",tags:["business","negative"]},
  {hindi:"चलो client को गलत जानकारी नहीं देते।",english:"Let's not give the client wrong information.",alternatives:[],hint:"Let's not + give + noun + adjective + noun",explanation:"'Let's not give wrong information' is a professional commitment.",difficulty:"hard",tags:["business","negative"]},
  {hindi:"चलो बिना prepare किए present नहीं होते।",english:"Let's not go unprepared.",alternatives:["let's not attend without preparation."],hint:"Let's not + go + adjective",explanation:"'Go unprepared' means to arrive without being ready.",difficulty:"hard",tags:["office","negative"]},
  {hindi:"चलो बहाने नहीं बनाते।",english:"Let's not make excuses.",alternatives:["let's not give excuses."],hint:"Let's not + make + noun",explanation:"'Make excuses' is a common phrase after 'let's not'.",difficulty:"easy",tags:["goals","negative"]},
  {hindi:"चलो गुस्से में कोई बात नहीं करते।",english:"Let's not say anything in anger.",alternatives:[],hint:"Let's not + say + anything + in + noun",explanation:"'In anger' is a prepositional phrase describing the state.",difficulty:"hard",tags:["social","negative"]},
  // tag questions
  {hindi:"चलो काम शुरू करते हैं, ठीक है?",english:"Let's get to work, shall we?",alternatives:[],hint:"Let's + base verb + , shall we?",explanation:"'Shall we?' is the standard tag for 'let's' sentences.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो मिलकर खाना खाते हैं, ठीक है?",english:"Let's eat together, shall we?",alternatives:[],hint:"Let's + base verb + , shall we?",explanation:"Tag question after 'let's' is always 'shall we?'.",difficulty:"easy",tags:["daily","tag question"]},
  {hindi:"चलो एक break लेते हैं, ठीक है?",english:"Let's take a break, shall we?",alternatives:[],hint:"Let's take a + noun + , shall we?",explanation:"'Shall we?' confirms the suggestion and invites agreement.",difficulty:"easy",tags:["daily","tag question"]},
  {hindi:"चलो इस plan पर आगे बढ़ते हैं, ठीक है?",english:"Let's go ahead with this plan, shall we?",alternatives:[],hint:"Let's + go ahead + , shall we?",explanation:"'Shall we?' is placed at the end after a comma.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो meeting schedule करते हैं, ठीक है?",english:"Let's schedule a meeting, shall we?",alternatives:[],hint:"Let's + schedule + noun + , shall we?",explanation:"'Shall we?' invites the other person to agree.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो कुछ ideas share करते हैं, ठीक है?",english:"Let's share some ideas, shall we?",alternatives:[],hint:"Let's + share + noun + , shall we?",explanation:"Standard tag question form for a group suggestion.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो बाहर टहलने जाते हैं, ठीक है?",english:"Let's go for a walk, shall we?",alternatives:[],hint:"Let's + go for a + noun + , shall we?",explanation:"'Shall we?' is always used after 'let's' for tag questions.",difficulty:"easy",tags:["daily","tag question"]},
  {hindi:"चलो एक-साथ काम करते हैं, ठीक है?",english:"Let's work together, shall we?",alternatives:[],hint:"Let's + base verb + , shall we?",explanation:"Tag question confirms the joint suggestion.",difficulty:"easy",tags:["office","tag question"]},
  {hindi:"चलो इस problem को solve करते हैं, ठीक है?",english:"Let's solve this problem, shall we?",alternatives:[],hint:"Let's + solve + noun + , shall we?",explanation:"'Shall we?' seeks agreement from the listener.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो कल सुबह जल्दी मिलते हैं, ठीक है?",english:"Let's meet early tomorrow morning, shall we?",alternatives:[],hint:"Let's + meet + time + , shall we?",explanation:"Adding 'shall we?' turns it into a tag question.",difficulty:"medium",tags:["daily","tag question"]},
  {hindi:"चलो यह movie देखते हैं, ठीक है?",english:"Let's watch this movie, shall we?",alternatives:[],hint:"Let's + watch + noun + , shall we?",explanation:"Seeking agreement with 'shall we?' at the end.",difficulty:"easy",tags:["daily","tag question"]},
  {hindi:"चलो नाश्ता करके निकलते हैं, ठीक है?",english:"Let's have breakfast before we leave, shall we?",alternatives:[],hint:"Let's + base verb + before + clause + , shall we?",explanation:"A complex suggestion with 'shall we?' as tag.",difficulty:"hard",tags:["daily","tag question"]},
  {hindi:"चलो project की रिपोर्ट submit करते हैं, ठीक है?",english:"Let's submit the project report, shall we?",alternatives:[],hint:"Let's + submit + noun + , shall we?",explanation:"Professional suggestion with 'shall we?' tag.",difficulty:"medium",tags:["office","tag question"]},
  {hindi:"चलो इस बार competition में भाग लेते हैं, ठीक है?",english:"Let's take part in the competition this time, shall we?",alternatives:[],hint:"Let's + take part in + noun + , shall we?",explanation:"'Shall we?' seeks agreement after the suggestion.",difficulty:"medium",tags:["social","tag question"]},
  {hindi:"चलो एक नया goal set करते हैं, ठीक है?",english:"Let's set a new goal, shall we?",alternatives:[],hint:"Let's + set + noun + , shall we?",explanation:"Standard tag question with 'shall we?'.",difficulty:"easy",tags:["goals","tag question"]},
];

const allRaw = [...dedupedItems, ...extraItems];

// Deduplicate again
const finalDedupedItems = [];
const finalSet = new Set();
for (const item of allRaw) {
  const key = item.english.toLowerCase().trim();
  if (!finalSet.has(key)) {
    finalSet.add(key);
    finalDedupedItems.push(item);
  }
}

// If we still don't have 1250, generate more varied items programmatically
// Add context-flavoured versions: "right after work", "before the meeting", "every morning" etc.
const timeContexts = ["after work","before the meeting","every morning","on weekends","during lunch","after class","this evening","next week","right now","before dinner","in the evening","every Friday","before the deadline","this afternoon","after the call"];
const extraGen = [];
for (const vp of allPhrases.slice(0, 30)) {
  for (const ctx of timeContexts) {
    const e = `Let's ${vp.e} ${ctx}.`;
    if (!finalSet.has(e.toLowerCase().trim())) {
      finalSet.add(e.toLowerCase().trim());
      extraGen.push({
        hindi: `चलो ${ctx} में ${vp.h}।`,
        english: e,
        alternatives: [],
        hint: "Let's + base verb + time context",
        explanation: "Adding a time context shows when the action should happen.",
        difficulty: "medium",
        tags: [...(vp.tags || []), "positive"]
      });
    }
  }
}

// More negative variations with time contexts
for (const vp of allPhrases.slice(0, 15)) {
  for (const ctx of timeContexts.slice(0, 8)) {
    const e = `Let's not ${vp.e} ${ctx}.`;
    if (!finalSet.has(e.toLowerCase().trim())) {
      finalSet.add(e.toLowerCase().trim());
      extraGen.push({
        hindi: `चलो ${ctx} में ${vp.h} नहीं।`,
        english: e,
        alternatives: [],
        hint: "Let's not + base verb + time context",
        explanation: "Adding a time context to a negative suggestion.",
        difficulty: "medium",
        tags: [...(vp.tags || []), "negative"]
      });
    }
  }
}

const allGenerated = [...finalDedupedItems, ...extraGen];

// Final dedup
const practicePool = [];
const usedInPractice = new Set();
for (const item of allGenerated) {
  const key = item.english.toLowerCase().trim();
  if (!usedInPractice.has(key)) {
    usedInPractice.add(key);
    practicePool.push(item);
  }
}

// Now split into practice (900) and mockTest (350)
// Ensure no overlap
const shuffledPool = shuffle([...practicePool]);

const practice900 = shuffledPool.slice(0, 900);
const mockTest350 = shuffledPool.slice(900, 1250);

// Verify no overlap
const practiceKeys = new Set(practice900.map(p => p.english.toLowerCase().trim()));
const mockKeys = new Set(mockTest350.map(p => p.english.toLowerCase().trim()));
const overlap = [...practiceKeys].filter(k => mockKeys.has(k));
if (overlap.length > 0) {
  console.error("OVERLAP FOUND:", overlap.length, "items");
  process.exit(1);
}

// Assign IDs
const practice = practice900.map((item, i) => ({
  id: `d14-${String(i + 1).padStart(3, '0')}`,
  ...item,
}));

const mockTest = mockTest350.map((item, i) => ({
  id: `d14-${String(i + 901).padStart(3, '0')}-test`,
  ...item,
}));

// Check we have enough items
console.log("Practice pool size:", practicePool.length);
console.log("Practice:", practice.length, "MockTest:", mockTest.length);
if (practice.length < 900 || mockTest.length < 350) {
  console.error(`NOT ENOUGH ITEMS! Practice:${practice.length} MockTest:${mockTest.length}`);
  process.exit(1);
}

// ─── ESSAYS ──────────────────────────────────────────────────────────────────
const essay = [
  {
    title: "Working Together as a Team",
    hindi: "यह निबंध बताता है कि 'Let's' का उपयोग करके हम टीम में मिलकर काम कैसे कर सकते हैं। इसमें office, goals, और daily life के उदाहरण हैं।",
    english: `Every successful team starts with a simple idea: let's work together. When we say "let's", we include everyone — no one is left out. Let's begin by setting clear goals for the week. Once we know what we want to achieve, let's divide the responsibilities fairly so each person can contribute their best.\n\nIn the office, communication matters a lot. Let's share our progress every morning in a short standup. If someone faces a problem, let's not ignore it — let's solve it as a team. Mistakes happen, but let's learn from them instead of pointing fingers.\n\nLet's also celebrate our achievements, big and small. A team that celebrates together stays motivated together. At the end of the week, let's review what went well and what we can improve.\n\nFinally, let's remember that teamwork is not just about work. Let's support each other personally too. Let's be kind, patient, and honest. A team built on trust can achieve anything. So let's start today — let's build a team we are all proud of, shall we?`
  },
  {
    title: "Building Healthy Daily Habits",
    hindi: "यह निबंध हमें बताता है कि 'Let's' का उपयोग करके हम अपने दैनिक जीवन में अच्छी आदतें कैसे अपना सकते हैं। स्वास्थ्य, समय प्रबंधन और सकारात्मक सोच पर ज़ोर दिया गया है।",
    english: `Good habits shape a good life. Let's start by waking up a little earlier every morning. Those extra thirty minutes can change your day. Let's use that time to exercise, even if it is just a short walk in the park.\n\nLet's eat healthy food and drink enough water throughout the day. Our body is our most important tool — let's take care of it. Let's not skip breakfast, because a good morning meal gives us energy for the whole day.\n\nWhen it comes to work, let's plan our tasks the night before. A clear plan means less stress in the morning. Let's prioritise the most important things first and not waste time on distractions. Let's also take a short break after every ninety minutes of focused work — our brain needs it.\n\nIn the evening, let's spend time with our family. Let's not take work stress home. Let's have a good conversation, laugh together, and enjoy the small moments.\n\nBefore sleeping, let's reflect on the day. What did we do well? What can we do better tomorrow? Let's sleep early so we are fresh and ready for a new day. These simple habits, done consistently, will transform our lives.`
  },
  {
    title: "Preparing for a Job Interview",
    hindi: "इस निबंध में बताया गया है कि 'Let's' का उपयोग करके हम एक job interview की तैयारी कैसे कर सकते हैं। interview tips और professional English का उपयोग दिखाया गया है।",
    english: `Getting a job starts long before the interview. Let's prepare well and give ourselves the best chance of success.\n\nFirst, let's research the company thoroughly. Let's read about their products, values, and recent news. When an interviewer asks "What do you know about us?", let's be ready with a confident, informed answer.\n\nNext, let's practise common interview questions. Let's not just think about the answers — let's speak them out loud. Practising with a friend is even better. Let's ask someone to listen and give us honest feedback.\n\nLet's also update our resume and make it clear and accurate. Let's remove any old or irrelevant information. A clean, well-organised resume makes a strong first impression.\n\nOn the day of the interview, let's arrive five minutes early. Let's not rush. Let's dress professionally and greet the interviewer with a confident smile. During the interview, let's listen carefully to every question before answering. Let's not rush our answers — a thoughtful, clear response is always better.\n\nFinally, let's follow up with a thank-you email after the interview. It shows professionalism and genuine interest. With preparation, confidence, and the right attitude, let's go get that job, shall we?`
  },
  {
    title: "Making Our City Cleaner and Greener",
    hindi: "यह निबंध पर्यावरण और समाज के प्रति जिम्मेदारी की बात करता है। 'Let's' का उपयोग करके सामूहिक प्रयासों पर ज़ोर दिया गया है।",
    english: `Our city belongs to all of us, so let's take responsibility for keeping it clean and green.\n\nLet's start with small actions. Let's not throw rubbish on the street. Let's use dustbins and encourage others to do the same. Let's also reduce the use of plastic bags. Let's carry our own cloth bags when we go to the market.\n\nLet's plant more trees in our neighbourhood. A single tree provides shade, clean air, and a home for birds. Let's organise a tree-planting event on weekends and invite everyone to join. The more people who participate, the bigger the impact.\n\nLet's use public transport or carpool when possible. Let's not waste electricity or water at home. Turning off the lights when leaving a room is a small habit with a big difference.\n\nLet's teach children good habits from an early age. Let's show them by example that we care about our environment. Let's not wait for the government to act alone — let's take action as responsible citizens.\n\nTogether, these small changes add up to a large impact. Let's build a cleaner, greener, and healthier city for ourselves and for future generations, shall we?`
  },
  {
    title: "Growing as a Professional",
    hindi: "यह निबंध professional growth के बारे में है। 'Let's' का उपयोग करते हुए यह बताया गया है कि हम अपने career में कैसे आगे बढ़ सकते हैं।",
    english: `Every professional journey is a series of choices. Let's make the right ones.\n\nLet's begin by setting clear career goals. Where do we want to be in three years? In five years? Let's write down these goals and review them regularly. A goal without a plan is just a wish — let's make a real plan.\n\nLet's invest in our skills. Let's take online courses, read industry articles, and attend workshops. The world is changing fast — let's change with it. Let's not be afraid to learn from people younger or more experienced than us.\n\nIn the workplace, let's be proactive. Let's not wait to be told what to do — let's identify opportunities and take the initiative. Let's volunteer for new projects and show our capabilities.\n\nLet's also build strong professional relationships. Let's network genuinely, not just for personal benefit. Let's mentor others and share our knowledge — teaching is one of the best ways to deepen our own understanding.\n\nWhen we face setbacks, let's not give up. Let's analyse what went wrong, make the necessary changes, and try again. Every failure is a lesson.\n\nLet's also take care of our wellbeing. A healthy, balanced professional performs better in the long run. Let's grow every day, step by step, and become the best version of ourselves.`
  }
];

// ─── STORIES ─────────────────────────────────────────────────────────────────
const story = [
  {
    title: "The Morning Decision",
    english: `Ravi looked at the clock. It was six in the morning. He knocked on his sister's door.\n\n"Priya, let's wake up early today. Let's not waste the morning."\n\nPriya opened one eye. "Let's go for a walk first. Fresh air will wake us up."\n\n"Good idea," said Ravi. "Let's get ready quickly, shall we?"\n\nThey went to the park. The air was cool and the sky was turning orange. "Let's come here every day," said Priya. "It feels wonderful."\n\n"Let's also bring Mother next time," Ravi suggested. "She loves walking in the morning."\n\nAfter the walk, they felt energetic. "Let's make a healthy breakfast together," said Priya. "Eggs and fruit?"\n\n"Perfect," said Ravi. "And after breakfast, let's study for two hours before checking our phones."\n\nPriya smiled. "That's a great habit. Let's start today and keep it going, shall we?"\n\nBy nine in the morning, they had exercised, eaten well, and studied. It was the best start to a day they had ever had.`,
    hindi: `रवि ने घड़ी देखी। सुबह के छह बज रहे थे। उसने बहन के कमरे का दरवाज़ा खटखटाया।\n\n"प्रिया, चलो आज जल्दी उठते हैं। चलो सुबह बर्बाद नहीं करते।"\n\nप्रिया ने एक आँख खोली। "चलो पहले टहलने जाते हैं। ताज़ी हवा हमें जगा देगी।"\n\n"अच्छा idea है," रवि ने कहा। "चलो जल्दी से तैयार होते हैं, ठीक है?"\n\nवे पार्क गए। हवा ठंडी थी और आकाश नारंगी हो रहा था। "चलो यहाँ हर रोज़ आते हैं," प्रिया ने कहा। "बहुत अच्छा लग रहा है।"\n\n"चलो अगली बार माँ को भी साथ लाते हैं," रवि ने सुझाया। "उन्हें सुबह की सैर बहुत पसंद है।"\n\nटहलने के बाद दोनों energetic महसूस कर रहे थे। "चलो मिलकर healthy नाश्ता बनाते हैं," प्रिया ने कहा। "अंडे और फल?"\n\n"बढ़िया," रवि ने कहा। "और नाश्ते के बाद, चलो phone देखने से पहले दो घंटे पढ़ते हैं।"\n\nप्रिया मुस्कुराई। "यह बहुत अच्छी आदत है। चलो आज से शुरू करते हैं, ठीक है?"\n\nसुबह के नौ बजते-बजते दोनों ने व्यायाम किया, अच्छा खाना खाया, और पढ़ाई भी की। यह उनके जीवन की सबसे अच्छी सुबह थी।`
  },
  {
    title: "The Team Project",
    english: `It was Monday morning. The manager, Neha, called her team together.\n\n"We have a big presentation on Friday," she said. "Let's plan our approach right now."\n\nArjun raised his hand. "Let's divide the work so everyone contributes equally."\n\n"Great idea," said Neha. "Let's not leave everything to one person."\n\nThey agreed on a plan. "Let's meet every morning this week for a quick update," Neha suggested. "Let's not let small problems become big ones."\n\n"Let's also create a shared document so we can all see each other's work," said Meera.\n\nBy Wednesday, they were ahead of schedule. "Let's use Thursday to practise the presentation," Arjun suggested. "Let's make sure we are confident, shall we?"\n\nOn Friday, the team presented brilliantly. The client was impressed. Neha looked at her team proudly. "Let's celebrate tonight," she said with a big smile. "We earned it."`,
    hindi: `सोमवार की सुबह थी। मैनेजर नेहा ने अपनी टीम को बुलाया।\n\n"शुक्रवार को एक बड़ी presentation है," उसने कहा। "चलो अभी से plan बनाते हैं।"\n\nअर्जुन ने हाथ उठाया। "चलो काम बाँटते हैं ताकि सब बराबर योगदान दें।"\n\n"बढ़िया idea है," नेहा ने कहा। "चलो सारा काम एक ही इंसान पर नहीं छोड़ते।"\n\nसबने एक plan पर सहमति जताई। "चलो इस हफ्ते हर सुबह थोड़ी देर मिलते हैं," नेहा ने सुझाया। "चलो छोटी-छोटी problems को बड़ा नहीं बनने देते।"\n\n"चलो एक shared document बनाते हैं ताकि सब एक-दूसरे का काम देख सकें," मीरा ने कहा।\n\nबुधवार तक वे schedule से आगे थे। "चलो गुरुवार को presentation की practice करते हैं," अर्जुन ने सुझाया। "चलो confident रहते हैं, ठीक है?"\n\nशुक्रवार को team ने शानदार presentation दी। Client बहुत प्रभावित हुआ। नेहा ने गर्व से अपनी team को देखा। "चलो आज रात celebrate करते हैं," उसने मुस्कुराते हुए कहा। "हमने यह deserve किया है।"`
  },
  {
    title: "A Family Weekend",
    english: `It was Saturday morning and the whole family was at home. Father put down his newspaper.\n\n"Let's do something different today," he said. "Let's not stay inside all day."\n\nMother looked up from the kitchen. "Let's go to the lake. It has been months since we went there."\n\n"Yes!" shouted ten-year-old Kabir. "Let's take our bicycles!"\n\n"Let's pack some food too," said his older sister Anya. "Let's make sandwiches and take fruit juice."\n\nEveryone agreed. They packed quickly and rode to the lake. The water was calm and the air was fresh.\n\n"Let's sit here for a while," said Mother. "Let's not rush back."\n\nKabir ran to the water. "Let's play a game," he called.\n\n"Let's not get our clothes wet," laughed Father. But he joined Kabir anyway.\n\nOn the way home, Anya said, "Let's do this every weekend, shall we?"\n\nEveryone smiled and agreed. Some of the best days are the ones spent together as a family.`,
    hindi: `शनिवार की सुबह थी और पूरा परिवार घर पर था। पिताजी ने अखबार रखा।\n\n"चलो आज कुछ अलग करते हैं," उन्होंने कहा। "चलो पूरे दिन घर के अंदर नहीं बैठते।"\n\nमाँ ने रसोई से ऊपर देखा। "चलो झील पर जाते हैं। महीनों हो गए वहाँ गए।"\n\n"हाँ!" दस साल के कबीर ने चिल्लाया। "चलो साइकिल लेकर जाते हैं!"\n\n"चलो खाना भी pack करते हैं," उसकी बड़ी बहन आन्या ने कहा। "चलो sandwiches बनाते हैं और फलों का रस लेते हैं।"\n\nसबने हामी भरी। जल्दी से pack किया और साइकिल पर झील की तरफ निकल पड़े। पानी शांत था और हवा ताज़ी थी।\n\n"चलो यहाँ थोड़ी देर बैठते हैं," माँ ने कहा। "चलो जल्दी वापस नहीं जाते।"\n\nकबीर पानी की तरफ दौड़ा। "चलो कोई खेल खेलते हैं," उसने आवाज़ लगाई।\n\n"चलो कपड़े गीले नहीं करते," पिताजी ने हँसते हुए कहा। फिर भी वे कबीर के साथ चले गए।\n\nघर वापसी पर आन्या ने कहा, "चलो हर weekend यही करते हैं, ठीक है?"\n\nसब मुस्कुराए और सहमत हुए। कुछ सबसे अच्छे दिन वही होते हैं जो परिवार के साथ बिताए जाते हैं।`
  }
];

// ─── DIALOGUES ───────────────────────────────────────────────────────────────
const dialogue = [
  {
    title: "Planning a Project at the Office",
    setting: "At the office — Monday morning",
    turns: [
      { speaker: "Manager (Sunita)", hindi: "टीम, हमें इस हफ्ते एक बड़ा काम खत्म करना है। चलो अभी plan बनाते हैं।", english: "Team, we have a big task to finish this week. Let's make a plan right now." },
      { speaker: "Rohan", hindi: "ज़रूर। चलो पहले सभी tasks list करते हैं।", english: "Sure. Let's list all the tasks first." },
      { speaker: "Priya", hindi: "ठीक है। और चलो हर task के लिए एक deadline तय करते हैं।", english: "Okay. And let's set a deadline for each task." },
      { speaker: "Manager (Sunita)", hindi: "बढ़िया। चलो ज़िम्मेदारियाँ बाँटते हैं, ठीक है? रोहन, तुम data analysis संभालो।", english: "Great. Let's divide the responsibilities, shall we? Rohan, you handle data analysis." },
      { speaker: "Rohan", hindi: "ज़रूर। चलो एक shared document बनाते हैं ताकि सब एक-दूसरे का काम देख सकें।", english: "Sure. Let's create a shared document so everyone can see each other's work." },
      { speaker: "Priya", hindi: "हाँ, और चलो Slack पर एक group channel बनाते हैं quick updates के लिए।", english: "Yes, and let's create a group channel on Slack for quick updates." },
      { speaker: "Manager (Sunita)", hindi: "अच्छा idea है। चलो छोटी-छोटी problems को ignore नहीं करते — जैसे ही कोई problem हो, immediately बताओ।", english: "Good idea. Let's not ignore small problems — report immediately if anything comes up." },
      { speaker: "Rohan", hindi: "समझा। चलो हर शाम पाँच बजे एक quick check-in call भी रखते हैं।", english: "Understood. Let's also have a quick check-in call every evening at five." },
      { speaker: "Priya", hindi: "और चलो Friday को final presentation से पहले एक rehearsal करते हैं।", english: "And let's do a rehearsal before the final presentation on Friday." },
      { speaker: "Manager (Sunita)", hindi: "Perfect। चलो एक अच्छी team की तरह काम करते हैं। हम यह कर सकते हैं, ठीक है?", english: "Perfect. Let's work like a great team. We can do this, shall we?" },
    ]
  },
  {
    title: "Getting Fit Together",
    setting: "At home — Sunday morning",
    turns: [
      { speaker: "Arjun", hindi: "यार, मैं बहुत lazy हो गया हूँ। चलो आज से exercise शुरू करते हैं।", english: "Yaar, I have become very lazy. Let's start exercising from today." },
      { speaker: "Simran", hindi: "बिल्कुल! चलो सुबह छह बजे पार्क जाते हैं।", english: "Absolutely! Let's go to the park at six in the morning." },
      { speaker: "Arjun", hindi: "ठीक है। चलो एक schedule बनाते हैं — Monday, Wednesday, Friday।", english: "Okay. Let's make a schedule — Monday, Wednesday, Friday." },
      { speaker: "Simran", hindi: "और चलो जंक food कम करते हैं। Let's eat healthy from this week.", english: "And let's cut down on junk food. Let's eat healthy from this week." },
      { speaker: "Arjun", hindi: "हाँ, चलो रात का खाना हल्का रखते हैं।", english: "Yes, let's keep dinner light." },
      { speaker: "Simran", hindi: "चलो हर रात 10 बजे सोते हैं और जल्दी उठते हैं।", english: "Let's sleep at ten every night and wake up early." },
      { speaker: "Arjun", hindi: "और चलो एक-दूसरे को motivate करते हैं। अगर कोई skip करना चाहे तो याद दिलाना।", english: "And let's motivate each other. If anyone wants to skip, remind them." },
      { speaker: "Simran", hindi: "बिल्कुल। चलो एक महीने में अपना progress track करते हैं, ठीक है?", english: "Absolutely. Let's track our progress after one month, shall we?" },
      { speaker: "Arjun", hindi: "Perfect। चलो आज से शुरू करते हैं — no more excuses!", english: "Perfect. Let's start today — no more excuses!" },
      { speaker: "Simran", hindi: "हाँ! चलो अभी shoes पहनते हैं और निकलते हैं!", english: "Yes! Let's put on our shoes right now and go!" },
    ]
  },
  {
    title: "Discussing a Business Idea",
    setting: "At a café — Two friends planning a startup",
    turns: [
      { speaker: "Kavya", hindi: "मेरे पास एक idea है। चलो एक online tutoring platform शुरू करते हैं।", english: "I have an idea. Let's start an online tutoring platform." },
      { speaker: "Dev", hindi: "Interesting! चलो पहले market research करते हैं।", english: "Interesting! Let's do market research first." },
      { speaker: "Kavya", hindi: "हाँ। चलो देखते हैं कि already कौन-सी platforms हैं और उनमें क्या कमी है।", english: "Yes. Let's see what platforms already exist and what's missing in them." },
      { speaker: "Dev", hindi: "ठीक है। चलो अपना target audience भी define करते हैं — school students या working professionals?", english: "Okay. Let's also define our target audience — school students or working professionals?" },
      { speaker: "Kavya", hindi: "Working professionals! English language skills improve करने के लिए। चलो उस niche focus करते हैं।", english: "Working professionals! To improve English language skills. Let's focus on that niche." },
      { speaker: "Dev", hindi: "बढ़िया। चलो एक basic business plan बनाते हैं। Revenue model क्या होगा?", english: "Great. Let's make a basic business plan. What will the revenue model be?" },
      { speaker: "Kavya", hindi: "Subscription-based। चलो pricing carefully decide करते हैं।", english: "Subscription-based. Let's decide the pricing carefully." },
      { speaker: "Dev", hindi: "और चलो social media पर एक pilot campaign run करते हैं पहले।", english: "And let's run a pilot campaign on social media first." },
      { speaker: "Kavya", hindi: "Perfect। चलो अगले हफ्ते एक proper meeting करते हैं और सब details finalise करते हैं, ठीक है?", english: "Perfect. Let's have a proper meeting next week and finalise all the details, shall we?" },
      { speaker: "Dev", hindi: "Absolutely। चलो इस dream को reality बनाते हैं!", english: "Absolutely. Let's make this dream a reality!" },
    ]
  },
  {
    title: "Preparing for an Interview",
    setting: "At home — Friends helping each other prepare",
    turns: [
      { speaker: "Neha", hindi: "मेरा कल interview है। चलो practice करते हैं।", english: "I have an interview tomorrow. Let's practise." },
      { speaker: "Vijay", hindi: "ज़रूर। चलो common questions से शुरू करते हैं। पहला सवाल: Tell me about yourself।", english: "Sure. Let's start with common questions. First question: Tell me about yourself." },
      { speaker: "Neha", hindi: "My name is Neha Sharma. I am a marketing graduate with two years of experience...", english: "My name is Neha Sharma. I am a marketing graduate with two years of experience..." },
      { speaker: "Vijay", hindi: "अच्छा। चलो इसे और confident बनाते हैं। Hesitation मत करो।", english: "Good. Let's make it more confident. Don't hesitate." },
      { speaker: "Neha", hindi: "ठीक है। चलो अब weakness वाला सवाल try करते हैं।", english: "Okay. Let's try the weakness question now." },
      { speaker: "Vijay", hindi: "Sure। और चलो body language पर भी ध्यान देते हैं — eye contact ज़रूरी है।", english: "Sure. And let's also focus on body language — eye contact is important." },
      { speaker: "Neha", hindi: "हाँ। चलो interview से पहले कुछ deep breaths लेते हैं calm रहने के लिए।", english: "Yes. Let's take a few deep breaths before the interview to stay calm." },
      { speaker: "Vijay", hindi: "बिल्कुल। और चलो कुछ company-specific questions prepare करते हैं।", english: "Absolutely. And let's prepare some company-specific questions." },
      { speaker: "Neha", hindi: "अच्छा idea है। चलो उनकी website और LinkedIn page देखते हैं।", english: "Good idea. Let's check their website and LinkedIn page." },
      { speaker: "Vijay", hindi: "Perfect। चलो एक बार पूरा mock interview करते हैं, ठीक है? Main interviewer बनता हूँ।", english: "Perfect. Let's do a complete mock interview, shall we? I'll be the interviewer." },
    ]
  }
];

// ─── CONTENT (enriched) ──────────────────────────────────────────────────────
const content = {
  explanation: `**Let's — Suggestion & Invitation:**\n\n"Let's" = "Let us" ka short form\nUse hota hai jab hum kisi ko kuch karne ki **suggestion** dete hain — yani hum khud bhi us action mein shamil hote hain.\n\n🇮🇳 चलो बाहर जाते हैं।\n🇬🇧 **Let's** go outside.\n\n🇮🇳 चलो इसके बारे में बात करते हैं।\n🇬🇧 **Let's** talk about this.\n\n**Patterns:**\n- Let's + base verb (positive suggestion) → "Let's start."\n- Let's not + base verb (negative suggestion) → "Let's not waste time."\n- Let's + base verb + , shall we? (tag question) → "Let's go, shall we?"\n- Shall we + base verb? (question form alternative) → "Shall we begin?"\n\n**Key Point:** "Let's" always refers to **we** — both the speaker AND the listener are included. It is a group suggestion, not an order.`,
  rules: [
    "Let's = Let us — always use it when the speaker is INCLUDED in the action.",
    "Let's + base verb (no 'to'): Let's go ✅ | Let's to go ❌",
    "Let's + base verb (no -ing): Let's start ✅ | Let's starting ❌",
    "Negative form: Let's not + base verb — 'not' comes directly after 'let's'.",
    "Tag question form: Let's + base verb + , shall we? — always use 'shall we?' (never 'won't we?' or 'don't we?')",
    "Response to 'Let's': Yes, let's! / No, let's not. / That's a great idea! / Why not?",
    "Don't confuse Let's (suggestion) with Let (permission): Let me go. | Let's go.",
    "Let's is always followed by the base form of the verb, regardless of the subject.",
    "'Shall we + base verb?' is the question-form alternative to 'Let's'. Both are correct for suggestions.",
    "You can add emphasis: Let's all go. / Let's both try. / Let's quickly finish this."
  ],
  memoryTrick: "**Let's = चलो!** — हिंदी में 'चलो' = English में 'Let's'. दोनों group suggestion के लिए हैं! जब भी 'चलो' कहना हो, English में 'Let's' लगाओ!",
  examples: [
    { hindi: "चलो English practice करते हैं।", english: "Let's practise English.", type: "Let's + verb" },
    { hindi: "चलो एक break लेते हैं।", english: "Let's take a break.", type: "Let's + verb phrase" },
    { hindi: "चलो इस topic को दोबारा नहीं करते।", english: "Let's not repeat this topic.", type: "Let's not + verb" },
    { hindi: "क्या हम मिलकर lunch करें?", english: "Shall we have lunch together?", type: "Shall we? (question)" },
    { hindi: "चलो इसे मिलकर solve करते हैं।", english: "Let's solve this together.", type: "Let's + verb + together" },
    { hindi: "चलो पानी पीते हैं।", english: "Let's drink some water.", type: "Let's + verb + noun" },
    { hindi: "चलो meeting शुरू करते हैं, ठीक है?", english: "Let's start the meeting, shall we?", type: "Tag question" },
    { hindi: "चलो समय बर्बाद नहीं करते।", english: "Let's not waste time.", type: "Let's not + verb" },
    { hindi: "चलो celebrate करते हैं!", english: "Let's celebrate!", type: "Let's + verb (exclamation)" },
    { hindi: "चलो अपने goals तय करते हैं।", english: "Let's set our goals.", type: "Let's + verb + noun" },
    { hindi: "चलो मिलकर काम करते हैं, ठीक है?", english: "Let's work together, shall we?", type: "Tag question" },
    { hindi: "चलो कुछ नया सीखते हैं।", english: "Let's learn something new.", type: "Let's + verb + object" },
  ],
  mistakes: [
    { wrong: "Let's to go.", correct: "Let's go.", why: "Let's के बाद 'to' नहीं लगता — directly base verb आता है।" },
    { wrong: "Let's going.", correct: "Let's go.", why: "Let's के बाद -ing form नहीं आता — base verb (V1) लगता है।" },
    { wrong: "Lets go! (no apostrophe)", correct: "Let's go!", why: "Apostrophe ज़रूरी है — Let's = Let us। बिना apostrophe के 'lets' एक अलग verb है जिसका मतलब 'allows' होता है।" },
    { wrong: "Let's not to argue.", correct: "Let's not argue.", why: "Let's not के बाद भी directly base verb — 'to' नहीं लगता।" },
    { wrong: "Let us to go now.", correct: "Let us go now.", why: "'Let us' के बाद भी 'to' नहीं — यह Let's का formal form है।" },
    { wrong: "Let's goes outside.", correct: "Let's go outside.", why: "Base verb always: जैसे go, eat, start — कभी goes, eats, starts नहीं।" },
    { wrong: "Let's went home.", correct: "Let's go home.", why: "Let's के बाद past tense (went) नहीं — present base form (go) लगता है।" },
    { wrong: "Let's start, will we?", correct: "Let's start, shall we?", why: "Tag question for 'Let's' is always 'shall we?' — 'will we?' or 'won't we?' incorrect है।" },
    { wrong: "Let me and you go.", correct: "Let's go.", why: "'Let me and you go' awkward है। 'Let's' is the correct short form for a joint suggestion।" },
    { wrong: "Let's not to waste money.", correct: "Let's not waste money.", why: "After 'Let's not', use the base verb directly — no 'to' is needed." },
  ],
  speakingTips: [
    "रोज़ किसी को 'Let's + verb' वाला suggestion दो — घर में, office में, दोस्तों के साथ।",
    "Meeting में: 'Let's get started.' / 'Let's move on to the next point.' / 'Let's wrap up.'",
    "Informally: 'Let's hang out sometime!' / 'Let's catch up soon!' / 'Let's grab coffee!'",
    "Negative form को practice करो: 'Let's not rush.' / 'Let's not overthink.' / 'Let's not waste this chance.'",
    "Tag question add करो confidence बढ़ाने के लिए: 'Let's give it a try, shall we?'",
    "Response practice करो: 'Yes, let's!' / 'Sounds good!' / 'I'm in!' / 'Why not?' / 'Let's do it!'",
    "Professional settings में Let's बहुत useful है: 'Let's schedule a call.' / 'Let's review this together.' / 'Let's align on the goals.'",
    "English speaking fast improve करना हो तो: हर suggestion को 'चलो' की जगह 'Let's' से शुरू करने की आदत डालो।",
  ],
};

// ─── TOPIC (unchanged) ───────────────────────────────────────────────────────
const topic = {
  title: "Use of Let's",
  emoji: "🎯",
  cefr: "A2",
  difficulty: "elementary",
  type: "grammar"
};

// ─── FINAL DATA STRUCTURE ────────────────────────────────────────────────────
const dayData = {
  day: 14,
  topic,
  content,
  vocabulary,
  practice,
  mockTest,
  essay,
  story,
  dialogue,
};

// ─── WRITE OUTPUT ────────────────────────────────────────────────────────────
const outPath = path.join(__dirname, '..', 'data', 'days', 'day_14.json');
fs.writeFileSync(outPath, JSON.stringify(dayData, null, 2), 'utf8');
console.log('Written to', outPath);
console.log('Vocabulary:', vocabulary.length);
console.log('Practice:', practice.length);
console.log('MockTest:', mockTest.length);
console.log('Essay:', essay.length);
console.log('Story:', story.length);
console.log('Dialogue:', dialogue.length);
console.log('Practice unique (by english):', new Set(practice.map(p => p.english)).size);
console.log('Vocabulary unique (by word):', new Set(vocabulary.map(v => v.word)).size);
