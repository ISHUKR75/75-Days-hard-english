#!/usr/bin/env node
/**
 * Day 02 Extended Content Generator
 * Creates: writing-exercise, listening-exercise, reading-exercise,
 *          story, essay, dialogue, flashcards, conversation-practice,
 *          common-mistakes, memory-tricks, + vocabulary top-up to 1000
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'data', 'challenge', 'day-02');

function write(filename, data) {
  const fp = path.join(DIR, filename);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
  const lines = JSON.stringify(data, null, 2).split('\n').length;
  console.log(`✅  ${filename}  (${lines} lines)`);
}

/* ═══════════════════════════════════════════════
   1. WRITING EXERCISES  (20 tasks)
═══════════════════════════════════════════════ */
const writingExercise = {
  day: 2,
  topic: "Self Introduction – Writing Practice",
  description: "Master writing self-introductions in every format — formal, informal, academic, professional, and creative.",
  totalTasks: 20,
  exercises: [
    {
      id: 1, type: "paragraph", difficulty: "beginner", timeMinutes: 10,
      title: "Basic Self-Introduction Paragraph",
      hindiTitle: "मूल आत्म-परिचय अनुच्छेद",
      instructions: "Write a 50-word paragraph about yourself in English. Include your name, hometown, job/study, and one hobby.",
      hindiInstructions: "अपने बारे में 50 शब्दों का अनुच्छेद लिखें। अपना नाम, शहर, काम/पढ़ाई और एक शौक शामिल करें।",
      sampleOutput: "Hello, my name is Priya Sharma. I am from Jaipur, Rajasthan. I work as a software engineer at a startup in Bangalore. In my free time, I enjoy reading novels and cooking traditional Rajasthani food. I am always eager to learn new things and meet interesting people.",
      tips: ["Use simple present tense", "Keep sentences short and clear", "Start with your name"],
      rubric: { content: 40, grammar: 30, vocabulary: 20, organization: 10 }
    },
    {
      id: 2, type: "formal_letter", difficulty: "beginner", timeMinutes: 15,
      title: "Formal Introduction Email",
      hindiTitle: "औपचारिक परिचय ईमेल",
      instructions: "Write a formal email introducing yourself to a new manager on your first day at work.",
      hindiInstructions: "नौकरी के पहले दिन अपने नए मैनेजर को खुद का परिचय देने वाला औपचारिक ईमेल लिखें।",
      sampleOutput: "Subject: Introduction – New Team Member\n\nDear Mr. Verma,\n\nI hope this email finds you well. My name is Amit Kumar, and I have joined the Marketing department today as a Senior Analyst. I hold an MBA from Delhi University and have five years of experience in digital marketing.\n\nI am excited to be part of this team and look forward to contributing to our upcoming projects. Please let me know a convenient time for a brief introductory meeting.\n\nThank you for the warm welcome.\n\nBest regards,\nAmit Kumar",
      tips: ["Use formal salutation", "State your position and department", "Express enthusiasm professionally"],
      rubric: { content: 35, grammar: 30, tone: 25, format: 10 }
    },
    {
      id: 3, type: "informal_letter", difficulty: "beginner", timeMinutes: 12,
      title: "WhatsApp Message to New Friend",
      hindiTitle: "नए दोस्त को WhatsApp संदेश",
      instructions: "Write a casual WhatsApp message (80-100 words) introducing yourself to someone you just met at a party.",
      hindiInstructions: "पार्टी में मिले किसी नए व्यक्ति को खुद का परिचय देने वाला 80-100 शब्दों का WhatsApp संदेश लिखें।",
      sampleOutput: "Hey! It was so nice meeting you at Ravi's birthday party last night! I'm Neha, by the way 😊 I work as a graphic designer and I live in Koramangala. I'm originally from Lucknow though. I loved chatting with you about travel — I've been to 14 states so far! Would love to catch up sometime. Maybe we can explore that new cafe on MG Road? Let me know! 🎉",
      tips: ["Use contractions (I'm, I've)", "Be warm and friendly", "Include emojis (it's informal!)"],
      rubric: { content: 30, naturalness: 35, grammar: 25, friendliness: 10 }
    },
    {
      id: 4, type: "speech", difficulty: "intermediate", timeMinutes: 20,
      title: "Two-Minute Speech for Interview",
      hindiTitle: "इंटरव्यू के लिए दो मिनट की स्पीच",
      instructions: "Write a structured 'Tell me about yourself' interview answer (200 words). Cover: education → experience → achievement → why this company.",
      hindiInstructions: "'अपने बारे में बताइए' का 200 शब्दों का संरचित उत्तर लिखें: शिक्षा → अनुभव → उपलब्धि → यह कंपनी क्यों।",
      sampleOutput: "Thank you for this opportunity. My name is Vikram Singh. I completed my B.Tech in Computer Science from NIT Trichy in 2019 with a CGPA of 8.7.\n\nAfter graduation, I joined Infosys as a Java developer, where I worked on enterprise banking applications. Over three years, I developed strong skills in Spring Boot, microservices, and REST APIs. I also led a team of four developers for a critical migration project that reduced system downtime by 40%.\n\nLast year, I moved to a product startup, where I discovered my passion for building scalable consumer applications. I built a feature that increased user retention by 25%, which was one of the proudest moments in my career.\n\nI am now looking for an opportunity where I can combine my enterprise experience with product thinking. Your company's focus on AI-driven fintech solutions perfectly aligns with my skills and interests. I am excited about the possibility of contributing to your engineering team and helping scale your platform.",
      tips: ["Follow Present-Past-Future structure", "Include one specific achievement with numbers", "End with why THIS company"],
      rubric: { structure: 30, content: 30, language: 25, professionalism: 15 }
    },
    {
      id: 5, type: "bio", difficulty: "intermediate", timeMinutes: 15,
      title: "LinkedIn Professional Bio",
      hindiTitle: "LinkedIn प्रोफेशनल बायो",
      instructions: "Write a LinkedIn 'About' section (150 words) for a mid-level software engineer with 4 years of experience.",
      hindiInstructions: "4 साल के अनुभव वाले मिड-लेवल सॉफ्टवेयर इंजीनियर के लिए 150 शब्दों का LinkedIn 'About' सेक्शन लिखें।",
      sampleOutput: "🚀 Software Engineer | Building Products People Love\n\nI'm a full-stack developer with 4+ years of experience turning complex problems into elegant solutions. Currently at TechCorp, I lead the development of our mobile app used by 2 million users across India.\n\n💡 What I do:\n• Build scalable backend systems using Node.js and AWS\n• Create intuitive React Native mobile experiences\n• Mentor junior developers and conduct code reviews\n\n🏆 Recent highlights:\n• Reduced API response time by 60% through caching optimization\n• Led migration from monolith to microservices (zero downtime)\n• Speaker at JSConf India 2023\n\nI believe great software changes lives. Outside work, I contribute to open source and write about tech on my blog (10K+ monthly readers).\n\nLet's connect if you're building something meaningful! 👋",
      tips: ["Start with a hook", "Use bullet points for scanability", "Include specific achievements"],
      rubric: { professionalism: 30, specificity: 25, language: 25, structure: 20 }
    },
    {
      id: 6, type: "essay", difficulty: "intermediate", timeMinutes: 25,
      title: "Essay: Who Am I?",
      hindiTitle: "निबंध: मैं कौन हूँ?",
      instructions: "Write a reflective 250-word essay exploring your identity, values, and aspirations.",
      hindiInstructions: "अपनी पहचान, मूल्यों और आकांक्षाओं को लेकर 250 शब्दों का चिंतनशील निबंध लिखें।",
      sampleOutput: "Identity is not a fixed destination — it is a river in constant motion, shaped by every experience, relationship, and choice we make.\n\nI am Kavitha Rajan, a teacher by profession and a learner by nature. Born in a small town in Tamil Nadu, I grew up surrounded by the smell of jasmine flowers and the rhythm of classical Carnatic music. These early experiences taught me that beauty exists in simplicity.\n\nAs a teacher for the past eight years, I have discovered that my greatest strength is patience. Watching a struggling student suddenly understand a concept fills me with a joy that no salary can replicate. I believe education is not about transferring information — it is about igniting curiosity.\n\nBeyond the classroom, I am a passionate runner who has completed three half-marathons. Running has taught me that the most important competition is with yourself. Every morning at 5 AM, when my alarm rings, I choose discipline over comfort. That choice defines me more than any degree or title.\n\nMy aspiration is to build a school in rural Tamil Nadu that provides quality education to children who cannot afford it. I want to give back to the community that shaped me.\n\nI am not defined by where I come from, but by what I choose to build — one lesson, one step, one act of kindness at a time.",
      tips: ["Use a strong opening metaphor", "Include personal anecdotes", "End with your future vision"],
      rubric: { depth: 30, language: 25, structure: 25, authenticity: 20 }
    },
    {
      id: 7, type: "dialogue_writing", difficulty: "beginner", timeMinutes: 10,
      title: "First Day at College Dialogue",
      hindiTitle: "कॉलेज के पहले दिन की बातचीत",
      instructions: "Write a 10-line dialogue between two freshers meeting each other on the first day of college.",
      hindiInstructions: "कॉलेज के पहले दिन मिलने वाले दो नए छात्रों के बीच 10 लाइन की बातचीत लिखें।",
      sampleOutput: "Arjun: Hi! I don't think we've met. I'm Arjun from Delhi. Are you a first-year student too?\nSneha: Yes! I just arrived this morning. I'm Sneha from Pune. Which branch are you in?\nArjun: Computer Science. What about you?\nSneha: Same! That's great. Do you know which hostel you've been assigned?\nArjun: C-block, room 204. I'm still trying to find my way around campus.\nSneha: Me too! This place is huge. I couldn't even find the registration office.\nArjun: I think it's near the main library. Shall we look for it together?\nSneha: That would be really helpful! By the way, are you good at coding? I'm a bit nervous about the lab sessions.\nArjun: I know some basics, but I'm learning too. Maybe we can study together?\nSneha: I'd love that! This is turning out to be a better first day than I expected!",
      tips: ["Use natural conversation flow", "Include context clues", "Show personality"],
      rubric: { naturalness: 35, grammar: 30, context: 20, creativity: 15 }
    },
    {
      id: 8, type: "email", difficulty: "intermediate", timeMinutes: 15,
      title: "Introduction Email to Conference Attendees",
      hindiTitle: "कॉन्फ्रेंस में परिचय ईमेल",
      instructions: "Write a professional email introducing yourself as a panelist at an upcoming tech conference.",
      hindiInstructions: "आगामी टेक कॉन्फ्रेंस में पैनलिस्ट के रूप में खुद का परिचय देने वाला प्रोफेशनल ईमेल लिखें।",
      sampleOutput: "Subject: Panelist Introduction – TechFest 2025\n\nDear Fellow Panelists and Organizers,\n\nI am thrilled to be part of the 'Future of AI in Healthcare' panel at TechFest 2025. Allow me to introduce myself.\n\nI am Dr. Meena Krishnan, Chief Data Scientist at HealthAI Solutions, based in Chennai. With a PhD in Machine Learning from IIT Madras and ten years of experience in medical data analysis, I specialize in building AI models that assist in early disease detection.\n\nMy recent work includes developing an AI system that detects diabetic retinopathy with 94% accuracy using smartphone cameras — a breakthrough that has reached 50,000 rural patients in South India.\n\nI am passionate about the intersection of technology and healthcare equity, and I look forward to a rich discussion with our esteemed panelists. I will be arriving in Hyderabad on the evening of March 14th.\n\nPlease feel free to reach out if you have any questions or would like to discuss our panel format in advance.\n\nWith warm regards,\nDr. Meena Krishnan\nChief Data Scientist, HealthAI Solutions",
      tips: ["State your expertise immediately", "Include a specific achievement", "End with a collaborative note"],
      rubric: { professionalism: 35, content: 30, language: 25, format: 10 }
    },
    {
      id: 9, type: "social_media", difficulty: "beginner", timeMinutes: 8,
      title: "Twitter/X Bio",
      hindiTitle: "Twitter/X बायो",
      instructions: "Write a catchy Twitter/X bio (max 160 characters) for a young entrepreneur.",
      hindiInstructions: "एक युवा उद्यमी के लिए आकर्षक Twitter/X बायो लिखें (अधिकतम 160 अक्षर)।",
      sampleOutput: "Building @EduTech_India 🚀 | IIT dropout who chose dreams over degrees | Speaker | Failed 3 times, succeeded once | Helping 1M students learn smarter 📚",
      tips: ["Include your main identity", "Add personality/humor", "Mention your mission"],
      rubric: { impact: 40, conciseness: 30, personality: 20, grammar: 10 }
    },
    {
      id: 10, type: "cover_letter", difficulty: "advanced", timeMinutes: 30,
      title: "Cover Letter for Dream Job",
      hindiTitle: "ड्रीम जॉब के लिए कवर लेटर",
      instructions: "Write a full cover letter (300 words) applying for a Product Manager position at a top tech company.",
      hindiInstructions: "एक शीर्ष टेक कंपनी में Product Manager पद के लिए 300 शब्दों का पूरा कवर लेटर लिखें।",
      sampleOutput: "Dear Hiring Team,\n\nWhen I read the job description for Product Manager at Zepto, one line stood out: 'We want someone who obsesses over user problems.' That is exactly who I am.\n\nMy name is Rahul Agarwal, and I have spent the last six years building products that serve real people. As Product Manager at PhonePe, I led the redesign of our peer-to-peer payments flow — a project involving 40 engineers across three teams. The result? A 32% increase in transaction completion rates and a drop in support tickets from 15,000 to 6,000 per month.\n\nBut numbers only tell half the story. The other half is the 3 AM call I took from our team in Bengaluru when our payment gateway crashed during Diwali — one of our highest-traffic days. I coordinated the response, communicated transparently with users via social media, and we restored service in 47 minutes. We later received a message from a user who said our quick response saved her from missing her rent payment. That message is saved on my phone.\n\nI am drawn to Zepto specifically because of your vision to solve quick commerce at scale. The 10-minute delivery model requires product thinking that balances speed, accuracy, and cost optimization simultaneously — a challenge I find genuinely exciting. I have been following your expansion into tier-2 cities and believe my experience in scaling products for diverse user segments would add value to your roadmap.\n\nI would welcome the opportunity to discuss how I can contribute to Zepto's next phase of growth.\n\nSincerely,\nRahul Agarwal",
      tips: ["Open with a hook, not your name", "Match their language from the job description", "Tell a story, not just accomplishments"],
      rubric: { narrative: 30, relevance: 30, language: 25, format: 15 }
    },
    {
      id: 11, type: "storytelling", difficulty: "intermediate", timeMinutes: 20,
      title: "My Life in 6 Words",
      hindiTitle: "6 शब्दों में मेरी जिंदगी",
      instructions: "First write a 6-word story about yourself (inspired by Hemingway), then expand it into a 150-word paragraph.",
      hindiInstructions: "पहले अपने बारे में 6 शब्दों की कहानी लिखें (Hemingway से प्रेरित), फिर इसे 150 शब्दों के अनुच्छेद में विस्तारित करें।",
      sampleOutput: "Six-word story: 'Small town girl. Global mindset. Still learning.'\n\nExpanded version:\nI grew up in Muzaffarpur, Bihar — a place where the mango orchards outnumber the opportunities. People always told me that big dreams were for big cities. I disagreed.\n\nAt 18, I came to Delhi with one suitcase and a scholarship to study Economics. The first winter was brutally cold — not just the weather, but the loneliness of being a stranger in a vast city. But I carried my small town's warmth inside me: the habit of greeting neighbors, the patience to wait for the mango season, the belief that hard work eventually bears fruit.\n\nToday, I work at a global consulting firm, advising companies in five countries. But every year, I return to Muzaffarpur for the mango harvest. Because no matter how global my mindset becomes, my roots remain beautifully, stubbornly local.",
      tips: ["Choose your 6 words carefully — each must carry weight", "The expansion should feel like an unfolding, not a summary"],
      rubric: { creativity: 35, language: 30, depth: 25, connection: 10 }
    },
    {
      id: 12, type: "academic", difficulty: "advanced", timeMinutes: 25,
      title: "University Application Personal Statement",
      hindiTitle: "विश्वविद्यालय आवेदन पर्सनल स्टेटमेंट",
      instructions: "Write a 250-word personal statement for a Masters in Data Science application at a UK university.",
      hindiInstructions: "UK विश्वविद्यालय में Data Science के Masters के लिए 250 शब्दों का पर्सनल स्टेटमेंट लिखें।",
      sampleOutput: "Data is not just numbers — it is the language the world uses to tell its stories. I became fluent in this language not in a classroom, but in a slum.\n\nDuring my final year of engineering at VIT Vellore, I volunteered with an NGO mapping sanitation access in informal settlements of Chennai. Armed with a survey tablet and basic SQL skills, I spent three months collecting data from 800 families. But when I tried to present my findings to city officials, I realized I lacked the statistical tools to make the patterns visible. I could see the problem; I could not yet prove it.\n\nThat gap drove me toward data science. Over the past two years as an analyst at Accenture, I have mastered Python, R, and machine learning frameworks, applying them to supply chain optimization problems. But my heart keeps returning to social impact questions: Where do hospitals fail the poorest patients? Which neighborhoods are most vulnerable to flooding? Which schools need intervention before dropout rates spike?\n\nThe MSc in Data Science at King's College London, with its dual focus on technical rigor and ethical application, is the bridge I have been searching for. Professor Sarah Chen's research on algorithmic fairness in public health directly aligns with my goals.\n\nI intend to return to India after my degree to build data infrastructure for grassroots NGOs — giving the people who most need evidence the tools to create it.",
      tips: ["Begin with a vivid, specific scene", "Show intellectual curiosity through a turning-point story", "Connect your past to the program and future"],
      rubric: { narrative: 35, relevance: 25, language: 25, vision: 15 }
    },
    {
      id: 13, type: "creative", difficulty: "intermediate", timeMinutes: 15,
      title: "Introduction as a Book Character",
      hindiTitle: "किताब के किरदार के रूप में परिचय",
      instructions: "Introduce yourself as if you are the main character of a novel. Make it vivid, engaging, and literary.",
      hindiInstructions: "ऐसे खुद का परिचय दें जैसे आप किसी उपन्यास के मुख्य किरदार हों। इसे ज्वलंत, रोचक और साहित्यिक बनाएं।",
      sampleOutput: "If someone were to write a novel about me, they would struggle to find a genre. I am too practical for romance, too emotional for thriller, and too optimistic for tragedy.\n\nPerhaps they would simply call it a story of contradictions.\n\nI am Ishaan Mehta — born in a power-cut-prone neighborhood of Kanpur, where I learned that darkness is never permanent. My father is an electrician who works with his hands; I work with spreadsheets. He fixes the things people touch; I fix the things people can't see — broken processes, inefficient systems, flawed assumptions.\n\nI carry three things wherever I go: a notebook filled with half-finished ideas, my mother's habit of feeding strangers, and a stubborn belief that most problems have elegant solutions if you look long enough.\n\nI am the person who arrives early and stays late, not because I have nothing to go home to, but because I believe the best version of any work reveals itself to those with patience.\n\nIf I were a chapter title, I would be: 'The one who stayed when everyone else left.'",
      tips: ["Use literary devices: metaphor, contradiction, imagery", "Reveal character through small, specific details"],
      rubric: { creativity: 40, language: 30, character_depth: 20, originality: 10 }
    },
    {
      id: 14, type: "translation_and_write", difficulty: "beginner", timeMinutes: 15,
      title: "Translate Your Hindi Introduction",
      hindiTitle: "अपना हिंदी परिचय अनुवाद करें",
      instructions: "First write a 100-word self-introduction in Hindi, then translate it naturally into English (not word-for-word).",
      hindiInstructions: "पहले 100 शब्दों में हिंदी में आत्म-परिचय लिखें, फिर इसे प्राकृतिक रूप से अंग्रेजी में अनुवाद करें (शब्द-दर-शब्द नहीं)।",
      sampleOutput: "Hindi: नमस्ते! मेरा नाम दीपिका वर्मा है। मैं लखनऊ से हूँ और अभी मुंबई में रह रही हूँ। मैंने दिल्ली विश्वविद्यालय से पत्रकारिता में स्नातक किया है। मैं एक डिजिटल मीडिया कंपनी में कंटेंट राइटर के रूप में काम करती हूँ। मुझे कहानियाँ पढ़ना-लिखना बहुत पसंद है। मेरा सपना है कि एक दिन मेरा अपना उपन्यास प्रकाशित हो।\n\nEnglish: Hello! I'm Deepika Verma, originally from Lucknow but currently living in Mumbai. I studied Journalism at Delhi University and now work as a Content Writer for a digital media company. I have always been passionate about stories — reading them, writing them, and living inside them. My dream is to one day publish my own novel.",
      tips: ["Don't translate literally — translate the meaning", "English sentences can be shorter or restructured", "Aim for natural flow, not perfect grammar"],
      rubric: { translation_quality: 40, fluency: 30, grammar: 20, naturalness: 10 }
    },
    {
      id: 15, type: "debate_intro", difficulty: "advanced", timeMinutes: 20,
      title: "Debate Opening Introduction",
      hindiTitle: "वाद-विवाद प्रारंभिक परिचय",
      instructions: "Write a 200-word opening statement introducing yourself and your position in a formal debate on: 'Social media helps people express their true identity.'",
      hindiInstructions: "इस विषय पर औपचारिक वाद-विवाद में खुद का और अपनी स्थिति का परिचय देने वाला 200 शब्दों का प्रारंभिक वक्तव्य लिखें।",
      sampleOutput: "Honorable judges, respected opponents, and esteemed audience,\n\nGood evening. My name is Arvind Nair, and I am a second-year student of Psychology and Communication at St. Xavier's College, Mumbai. Today, I stand before you in firm opposition to the motion: 'Social media helps people express their true identity.'\n\nI have spent the past two years studying how people present themselves online, and what I have found is deeply concerning. Social media does not liberate identity — it commodifies it. Every post is a performance, every profile is a carefully constructed fiction, and every 'like' is a metric that shapes what we believe we are allowed to be.\n\nThe 16-year-old who filters her face before posting is not expressing her true self. The executive who shares only his victories is not being authentic. The activist who performs outrage for engagement is not necessarily outraged.\n\nWe have built a world where identity is what gets applause, not what is true.\n\nOver the next ten minutes, I will present three arguments, supported by research from Harvard, Stanford, and the University of Oxford, demonstrating that social media systematically distorts rather than reveals our authentic selves.\n\nThank you.",
      tips: ["Introduce yourself and your position immediately", "State your thesis clearly", "Preview your arguments"],
      rubric: { argumentation: 35, language: 25, structure: 25, confidence: 15 }
    },
    {
      id: 16, type: "greeting_card", difficulty: "beginner", timeMinutes: 8,
      title: "New Year Greeting with Self-Introduction",
      hindiTitle: "आत्म-परिचय के साथ नव वर्ष की शुभकामना",
      instructions: "Write a warm New Year message that also introduces you to someone you want to reconnect with after 5 years.",
      hindiInstructions: "एक गर्म नव वर्ष संदेश लिखें जो उस व्यक्ति को खुद का परिचय भी देता हो जिससे आप 5 साल बाद फिर से जुड़ना चाहते हैं।",
      sampleOutput: "Happy New Year, Prashant! 🎊\n\nI'm not sure if you remember me — I'm Ritu, your classmate from the 2019 marketing batch at MICA. I came across your LinkedIn profile while searching for old classmates and thought, why not reach out?\n\nA lot has changed for me since graduation. I moved to Singapore for three years, worked in brand strategy, and recently returned to Pune to launch my own consultancy. It feels wonderful and terrifying all at once!\n\nI hope 2025 brings you joy, health, and exciting adventures. Would love to catch up over coffee if you're ever in Pune!\n\nWarm wishes,\nRitu Joshi",
      tips: ["Remind them who you are", "Briefly mention what you've been up to", "End with an invitation"],
      rubric: { warmth: 35, clarity: 30, grammar: 25, appropriateness: 10 }
    },
    {
      id: 17, type: "podcast_intro", difficulty: "advanced", timeMinutes: 15,
      title: "Podcast Episode Introduction",
      hindiTitle: "पॉडकास्ट एपिसोड परिचय",
      instructions: "Write the opening script (150 words) for a podcast episode where you introduce yourself as the host and give listeners a reason to keep listening.",
      hindiInstructions: "एक पॉडकास्ट एपिसोड के लिए 150 शब्दों की ओपनिंग स्क्रिप्ट लिखें जहाँ आप होस्ट के रूप में खुद का परिचय दें।",
      sampleOutput: "Welcome to The Midnight Learner — the podcast for people who believe that growth doesn't stop when the office lights go off.\n\nI'm your host, Ananya Singh. By day, I'm a mechanical engineer at an automotive company in Pune. By night — and on weekends, and sometimes in between meetings — I am obsessed with one question: why do some people keep learning and growing throughout their entire lives, while others stop the moment formal education ends?\n\nI was that person who stopped. After engineering, I thought I was done. Then, at 28, I stumbled into a learning crisis that changed everything — and this podcast is the result.\n\nEvery week, I speak with fascinating people: scientists, artists, athletes, teachers, and entrepreneurs — all of whom have cracked the code on lifelong learning.\n\nBuckle up. Your education is just beginning.\n\nLet's start.",
      tips: ["Open with the show's promise, not your name", "Reveal your personality quickly", "End with energy"],
      rubric: { engagement: 40, personality: 25, language: 25, pacing: 10 }
    },
    {
      id: 18, type: "creative_resume_bio", difficulty: "advanced", timeMinutes: 20,
      title: "Non-Traditional Resume Summary",
      hindiTitle: "गैर-पारंपरिक रिज्यूमे सारांश",
      instructions: "Write a creative, non-traditional resume summary that captures your essence in 100 words — no job titles, no dates, just you.",
      hindiInstructions: "100 शब्दों में एक रचनात्मक, गैर-पारंपरिक रिज्यूमे सारांश लिखें — कोई जॉब टाइटल नहीं, कोई तारीख नहीं, बस आप।",
      sampleOutput: "I build things that don't break under pressure.\n\nFor most of my adult life, I have been the person in the room who stays calm when the deadline disappears and the requirements change on the same day. I find meaning in ambiguity and momentum in chaos.\n\nI have shipped products used by millions, fixed systems that were 'impossible' to fix, and mentored people who went on to outshine me — which is exactly the point.\n\nI think in systems, feel in stories, and communicate in both.\n\nIf you need someone who delivers — not just tries — keep reading.",
      tips: ["Use strong, active verbs", "Show personality without bragging", "Leave the reader wanting more"],
      rubric: { originality: 35, impact: 30, language: 25, memorability: 10 }
    },
    {
      id: 19, type: "family_introduction", difficulty: "beginner", timeMinutes: 10,
      title: "Introducing Your Family",
      hindiTitle: "अपने परिवार का परिचय",
      instructions: "Write a warm, descriptive 150-word paragraph introducing your family members in English.",
      hindiInstructions: "अपने परिवार के सदस्यों का गर्म, वर्णनात्मक 150 शब्दों का अनुच्छेद लिखें।",
      sampleOutput: "I come from a family of four, and each member has shaped who I am in a profound way. My father, Rajesh, is a retired schoolteacher who taught me that curiosity is the most important quality a person can have. He is the person who woke me up at 3 AM to watch the lunar eclipse, who drove me to the library every Saturday, and who still reads two books a month at 65.\n\nMy mother, Sunita, is a homemaker and the emotional anchor of our family. She has an extraordinary ability to sense what people need before they say it — a gift I have always envied and tried to develop myself.\n\nMy younger sister, Preeti, is studying architecture in Hyderabad. She is fiercely independent, creatively brilliant, and the only person in our family who can argue with me and make me rethink my position.\n\nWe are loud, opinionated, and deeply loving — the best kind of family.",
      tips: ["Describe personality, not just facts", "Include one specific memory or anecdote per person", "Show relationships through details"],
      rubric: { warmth: 30, description: 30, grammar: 25, structure: 15 }
    },
    {
      id: 20, type: "video_script", difficulty: "advanced", timeMinutes: 25,
      title: "YouTube Channel Introduction Video Script",
      hindiTitle: "YouTube चैनल परिचय वीडियो स्क्रिप्ट",
      instructions: "Write a 200-word script for your first YouTube video where you introduce yourself and your channel to potential subscribers.",
      hindiInstructions: "अपने पहले YouTube वीडियो के लिए 200 शब्दों की स्क्रिप्ट लिखें जहाँ आप खुद का और अपने चैनल का परिचय दें।",
      sampleOutput: "[HOOK - first 5 seconds]\nIf you've ever felt like English is a wall between you and your dreams — this channel is going to break that wall down.\n\n[INTRO]\nHey! Welcome to Speak Like You Mean It. I'm Kunal Sharma — a guy who grew up speaking only Hindi in Bhopal, failed his first job interview in English, and then spent the next three years rebuilding himself from scratch.\n\n[WHAT THIS CHANNEL IS ABOUT]\nThis channel is for every Indian who knows they have great ideas but struggles to express them confidently in English. We're not going to do boring grammar lessons here. Instead, every week we'll cover:\n- Real conversations from real situations\n- Stories from English-speaking environments\n- Pronunciation hacks that actually work\n- And honest, embarrassing mistakes I've made so you can avoid them\n\n[CALL TO ACTION]\nIf you've watched this far, you're already committed to growth — and I respect that. Hit subscribe, turn on notifications, and let's go on this journey together.\n\nYour first lesson is already in the next video.\n\nSee you there.",
      tips: ["Hook must grab in 5 seconds", "Clearly state who this is FOR", "End with a specific call to action"],
      rubric: { hook: 30, clarity: 25, engagement: 25, structure: 20 }
    }
  ]
};

write('writing-exercise.json', writingExercise);

/* ═══════════════════════════════════════════════
   2. LISTENING EXERCISES  (18 exercises)
═══════════════════════════════════════════════ */
const listeningExercise = {
  day: 2,
  topic: "Self Introduction – Listening Practice",
  description: "Train your ears by listening to various styles of self-introduction. Improve comprehension, accent recognition, and note-taking.",
  totalExercises: 18,
  exercises: [
    {
      id: 1, type: "dictation", difficulty: "beginner", duration: "2 mins",
      title: "Dictation: Simple Introduction",
      hindiTitle: "श्रुतलेख: सरल परिचय",
      audioDescription: "A clear, slow voice introduces a person named Anjali.",
      transcript: "Hello. My name is Anjali Gupta. I am from Bhopal. I am twenty-five years old. I am a nurse. I work at City Hospital. I have one brother and one sister. My hobby is cooking. Nice to meet you.",
      taskInstructions: "Listen and write every word you hear. Check your spelling carefully.",
      comprehensionQuestions: [
        { q: "What is the speaker's name?", a: "Anjali Gupta" },
        { q: "Where is she from?", a: "Bhopal" },
        { q: "What is her profession?", a: "Nurse" },
        { q: "What is her hobby?", a: "Cooking" }
      ],
      vocabularyFocus: ["nurse", "hospital", "hobby", "cooking"],
      tip: "Write as you hear. Don't wait to complete a sentence before writing."
    },
    {
      id: 2, type: "gap_fill", difficulty: "beginner", duration: "3 mins",
      title: "Gap Fill: New Colleague Introduction",
      hindiTitle: "गैप फिल: नए सहयोगी का परिचय",
      audioDescription: "A man named Sanjay introduces himself at a team meeting.",
      transcript: "Good morning, everyone. I'm Sanjay Malhotra. I've just joined the ___1___ department as a Senior ___2___. I previously worked at ___3___ for four years, where I specialized in ___4___ development. In my spare time, I enjoy ___5___ and playing chess. I'm excited to be part of this ___6___.",
      blanks: ["finance", "accountant", "KPMG", "software", "running", "team"],
      taskInstructions: "Listen and fill in the 6 blanks. Then listen again to verify.",
      comprehensionQuestions: [
        { q: "Which department did Sanjay join?", a: "Finance" },
        { q: "How many years did he work at his previous company?", a: "Four years" }
      ],
      vocabularyFocus: ["department", "specialized", "spare time"],
      tip: "First listen for context, then listen specifically for the missing words."
    },
    {
      id: 3, type: "true_false", difficulty: "beginner", duration: "3 mins",
      title: "True/False: Student Introduction",
      hindiTitle: "सही/गलत: छात्र का परिचय",
      audioDescription: "A student named Pooja introduces herself at a study group.",
      transcript: "Hi everyone! I'm Pooja Patel. I'm doing my final year of Civil Engineering at Mumbai University. I'm originally from Ahmedabad but I've been living in Mumbai for three years. I'm passionate about sustainable architecture and I hope to work on green building projects after graduation. I'm also the captain of our college volleyball team. Looking forward to studying with all of you!",
      statements: [
        { statement: "Pooja is in her first year of engineering.", answer: false, correction: "She is in her final year." },
        { statement: "She is from Mumbai.", answer: false, correction: "She is originally from Ahmedabad." },
        { statement: "She has lived in Mumbai for three years.", answer: true },
        { statement: "She is interested in sustainable architecture.", answer: true },
        { statement: "She plays basketball.", answer: false, correction: "She plays volleyball." }
      ],
      tip: "Focus on specific details like numbers, names, and facts."
    },
    {
      id: 4, type: "multiple_choice", difficulty: "intermediate", duration: "4 mins",
      title: "MCQ: Professional Conference Introduction",
      hindiTitle: "MCQ: पेशेवर सम्मेलन परिचय",
      audioDescription: "A professional named Arun speaks at a business conference.",
      transcript: "Ladies and gentlemen, it's a pleasure to be here at the National Entrepreneurs' Summit. I'm Arun Chakraborty, founder of GreenGrid Solutions, a clean energy startup based in Kolkata. We've been operating for three years and have already installed solar systems for over two thousand households across rural West Bengal. Before starting GreenGrid, I spent eight years in investment banking, which gave me a strong financial foundation to build a viable sustainable business. I believe the future of India's energy lies in distributed renewable systems, and I'm here today to discuss how policy changes can accelerate that future.",
      questions: [
        { q: "What type of company did Arun found?", options: ["A bank", "A clean energy startup", "A construction firm", "A technology company"], answer: "A clean energy startup" },
        { q: "How many households have they served?", options: ["200", "2,000", "20,000", "200,000"], answer: "2,000" },
        { q: "What was Arun's previous career?", options: ["Engineering", "Medicine", "Investment banking", "Teaching"], answer: "Investment banking" },
        { q: "Where is GreenGrid Solutions based?", options: ["Mumbai", "Bangalore", "Kolkata", "Delhi"], answer: "Kolkata" }
      ],
      tip: "Listen for numbers and specific facts — they usually appear in MCQ questions."
    },
    {
      id: 5, type: "note_taking", difficulty: "intermediate", duration: "5 mins",
      title: "Note Taking: Job Interview Introduction",
      hindiTitle: "नोट लेना: नौकरी के इंटरव्यू का परिचय",
      audioDescription: "A candidate named Divya is answering 'Tell me about yourself' in an interview.",
      transcript: "Sure! My name is Divya Reddy. I grew up in Hyderabad and did my B.Com from Osmania University in 2018. After graduation, I joined a mid-sized retail company as a junior accounts executive. Over three years, I was promoted twice and eventually managed a team of eight people. During that period, we reduced our monthly reconciliation errors by sixty percent through a new verification system I designed. Last year, I decided to upskill and completed a certification in Financial Analysis from ICAI. I'm now looking for a role at a larger organization where I can take on more complex financial challenges.",
      noteTemplate: {
        name: "___", hometown: "___", education: "___",
        firstJob: "___", promotions: "___", achievement: "___",
        recentDevelopment: "___", currentGoal: "___"
      },
      answers: {
        name: "Divya Reddy", hometown: "Hyderabad", education: "B.Com, Osmania University (2018)",
        firstJob: "Junior accounts executive at retail company",
        promotions: "Promoted twice in 3 years, managed team of 8",
        achievement: "Reduced reconciliation errors by 60%",
        recentDevelopment: "Completed ICAI Financial Analysis certification",
        currentGoal: "Complex financial role at larger organization"
      },
      tip: "Use abbreviations while listening. Write symbols: → for result, + for addition, = for equals."
    },
    {
      id: 6, type: "ordering", difficulty: "intermediate", duration: "4 mins",
      title: "Order the Introduction",
      hindiTitle: "परिचय को क्रम में लगाएं",
      audioDescription: "An introduction is given in a non-chronological order. Arrange the segments logically.",
      scrambledSegments: [
        "A: Currently, I'm pursuing a certification in Digital Marketing.",
        "B: Hi! I'm Kiran Sharma from Jaipur.",
        "C: My first job was as a copywriter at a small agency, where I fell in love with brand storytelling.",
        "D: I completed my graduation in Mass Communication from Rajasthan University in 2020.",
        "E: After three years, I moved to a bigger agency and worked on national campaigns for FMCG brands.",
        "F: I'm excited about exploring performance marketing as my next growth area."
      ],
      correctOrder: ["B", "D", "C", "E", "A", "F"],
      explanation: "Introductions typically follow: Name → Education → Career start → Career progression → Current → Future",
      tip: "Listen for time markers: 'first', 'then', 'after', 'currently', 'next'."
    },
    {
      id: 7, type: "summary_writing", difficulty: "advanced", duration: "6 mins",
      title: "Summarize the Introduction",
      hindiTitle: "परिचय का सारांश लिखें",
      audioDescription: "A long introduction is given. Write a 3-sentence summary.",
      transcript: "Good afternoon. I'm Dr. Pradeep Menon. I completed my MBBS from Kasturba Medical College and did my MD in Cardiology from AIIMS Delhi. After my residency, I spent two years doing research at Johns Hopkins University in Baltimore, USA, where my team published a paper on minimally invasive cardiac procedures. Back in India, I set up my practice in Kochi and have been working there for the past twelve years. I have performed over three thousand cardiac procedures, including open-heart surgeries and angioplasties. I'm also the head of the Cardiology Department at Amrita Hospital. Outside medicine, I'm deeply interested in classical Indian music — I play the veena — and I believe that music and medicine share a common thread: both require precision, patience, and passion.",
      sampleSummary: "Dr. Pradeep Menon is a cardiologist who trained at AIIMS Delhi and conducted research at Johns Hopkins. He has been practicing in Kochi for 12 years and has performed over 3,000 cardiac procedures, currently heading the Cardiology Department at Amrita Hospital. Outside medicine, he plays the veena and believes music and medicine share the values of precision, patience, and passion.",
      tip: "A good summary captures: Who, What they do, One significant achievement, and One personal detail."
    },
    {
      id: 8, type: "accent_recognition", difficulty: "advanced", duration: "5 mins",
      title: "Compare Introductions: Indian vs. British vs. American",
      hindiTitle: "परिचय की तुलना: भारतीय vs. ब्रिटिश vs. अमेरिकी",
      audioDescription: "Three people introduce themselves with the same content but different accents.",
      focusPoints: ["Pronunciation of 'r' sounds", "Vowel length differences", "Rhythm and stress patterns"],
      tasks: [
        "Listen and identify which accent is which.",
        "Note 3 words that sound different across the three speakers.",
        "Which accent do you find easiest to understand? Why?"
      ],
      vocabulary: {
        indian: "Retroflex 'r', elongated vowels in 'name'",
        british: "Non-rhotic (silent 'r' at end of words), shorter 'a' sound",
        american: "Rhotic (pronounced 'r'), drawn-out vowels, upward intonation"
      },
      tip: "Focus on one feature at a time. First listen for 'r', then re-listen for vowels."
    },
    {
      id: 9, type: "error_detection", difficulty: "advanced", duration: "5 mins",
      title: "Spot the Grammar Mistakes",
      hindiTitle: "व्याकरण की गलतियाँ पकड़ें",
      audioDescription: "An introduction is given with 5 deliberate grammar errors. Find them.",
      transcriptWithErrors: "My name are Sachin Verma. I am coming from Nagpur originally. I have been working in this company since three years. My hobbies is reading and to swim. I enjoys meeting new people and I hope we will works well together.",
      errors: [
        { original: "My name are", correction: "My name is", rule: "Subject-verb agreement — 'name' is singular" },
        { original: "I am coming from", correction: "I am from / I come from", rule: "State of origin uses simple present, not continuous" },
        { original: "since three years", correction: "for three years", rule: "'Since' is for a point in time; 'for' is for a duration" },
        { original: "My hobbies is", correction: "My hobbies are", rule: "'Hobbies' is plural, requires 'are'" },
        { original: "and to swim", correction: "and swimming", rule: "Parallel structure: 'reading and swimming'" }
      ],
      tip: "Common error types: subject-verb agreement, prepositions, parallel structure, tense consistency."
    },
    {
      id: 10, type: "dialogue_comprehension", difficulty: "intermediate", duration: "5 mins",
      title: "Two People Meeting for the First Time",
      hindiTitle: "पहली बार मिलने वाले दो लोग",
      audioDescription: "Priya and James meet at a networking event in Singapore.",
      transcript: "Priya: Hi there! I don't think we've been introduced. I'm Priya, Head of Partnerships at TechBridge.\nJames: Oh lovely! I'm James, Senior Product Manager at Grab. Are you enjoying the conference?\nPriya: Very much! The AI in Fintech panel was fascinating. Are you based in Singapore?\nJames: I am now! I moved from London two years ago. And yourself?\nPriya: I'm originally from Pune but I've been in Singapore for five years. Do you work specifically on the payments product?\nJames: I do, actually. We just launched a new cross-border transfer feature. What does your partnerships role involve?\nPriya: Mostly working with banks and regulators to build integration agreements. There's actually potential synergy there!\nJames: Absolutely! Could I grab your card? I'd love to follow up.\nPriya: Of course! And maybe we can connect on LinkedIn too?",
      questions: [
        { q: "Where are they meeting?", a: "At a networking conference in Singapore" },
        { q: "How long has Priya been in Singapore?", a: "Five years" },
        { q: "What did James recently launch?", a: "A cross-border transfer feature" },
        { q: "What does Priya's role involve?", a: "Working with banks and regulators on integration agreements" },
        { q: "How do they plan to stay in touch?", a: "Business card and LinkedIn" }
      ],
      tip: "In business conversations, listen for role titles, company names, and offers to reconnect."
    },
    {
      id: 11, type: "pronunciation_practice", difficulty: "beginner", duration: "4 mins",
      title: "Repeat After the Speaker",
      hindiTitle: "वक्ता के बाद दोहराएं",
      phrases: [
        { phrase: "My name is ___.", pronunciation: "my NAYM iz", note: "Stress on 'name'" },
        { phrase: "I'm originally from ___.", pronunciation: "aym uh-RIJ-uh-nuh-lee from", note: "Stress on 'originally'" },
        { phrase: "I work as a ___.", pronunciation: "ay WURK az uh", note: "Smooth linking between words" },
        { phrase: "Nice to meet you.", pronunciation: "NAIS tuh MEET yoo", note: "Elide 'to' → 'tuh' in natural speech" },
        { phrase: "I've been here for ___ years.", pronunciation: "ayv BIN heer fer", note: "'Have' reduces to 've'" },
        { phrase: "I'm passionate about ___.", pronunciation: "aym PASH-uh-nit uh-BOWT", note: "Stress on 'passionate'" },
        { phrase: "I look forward to working with you.", pronunciation: "ay LUK FOR-werd tuh WUR-king with yoo", note: "Natural reduction of function words" }
      ],
      taskInstructions: "Listen to each phrase. Repeat it three times. Record yourself on the third repetition and compare.",
      tip: "Good pronunciation = stress + rhythm + linking. Focus on stressed syllables, not perfect vowels."
    },
    {
      id: 12, type: "speed_listening", difficulty: "advanced", duration: "3 mins",
      title: "Fast-Paced Introduction (Speed Comprehension)",
      hindiTitle: "तेज़ गति का परिचय (गति बोध)",
      audioDescription: "A person gives a 30-second elevator pitch at 150 words per minute.",
      transcript: "Hi! Aakash Singh — co-founder of PayNext, India's first AI-powered expense management platform for SMEs. Previously built and exited two fintech startups. IIT Bombay graduate, Class of 2015. We're currently serving 5,000 businesses across 12 cities, processing ₹800 crore monthly. Looking for Series A partners who understand B2B SaaS in emerging markets. Ten minutes on your calendar?",
      questions: [
        { q: "What is the company name?", a: "PayNext" },
        { q: "How much money is processed monthly?", a: "₹800 crore" },
        { q: "How many businesses do they serve?", a: "5,000" },
        { q: "What is he looking for?", a: "Series A investors/partners" }
      ],
      tip: "For speed comprehension, accept that you'll miss some words. Focus on key nouns and numbers."
    },
    {
      id: 13, type: "gap_fill_advanced", difficulty: "advanced", duration: "5 mins",
      title: "Academic Introduction — Complex Vocabulary",
      hindiTitle: "शैक्षणिक परिचय — जटिल शब्दावली",
      audioDescription: "A PhD scholar introduces herself at a research seminar.",
      transcript: "Good afternoon. I'm Swati Bhat, a third-year doctoral ___1___ in the Department of Environmental Sciences at IISc Bangalore. My research focuses on the ___2___ of microplastics in freshwater ___3___, specifically the Cauvery River basin. I work under Professor Anjali Nair, whose work on ___4___ pollution indices I've long admired. Before joining IISc, I completed my ___5___ from BITS Pilani and worked briefly as an environmental consultant. My ___6___ is to develop a cost-effective monitoring system for rural water bodies using ___7___ sensing technologies.",
      blanks: ["candidate", "proliferation", "ecosystems", "aquatic", "master's", "goal", "remote"],
      tip: "Academic introductions use specialized vocabulary. Build context from surrounding words."
    },
    {
      id: 14, type: "cultural_comparison", difficulty: "intermediate", duration: "6 mins",
      title: "How Different Cultures Introduce Themselves",
      hindiTitle: "विभिन्न संस्कृतियाँ कैसे खुद का परिचय देती हैं",
      audioDescription: "Three people from India, Japan, and the USA introduce themselves at the same meeting.",
      transcripts: {
        indian: "Hello! I'm Ramesh Shenoy. I've been working in this industry for fifteen years and I've seen it grow from nothing. I'm also a father of two and a cricket enthusiast. Very happy to be here!",
        japanese: "My name is Yamamoto Kenji. I work in the product division. I hope we can work well together and I look forward to learning from all of you.",
        american: "Hey! I'm Tyler Brown. Quick version: startup founder, failed once, trying again! I'm here because I believe this is where the action is. Let's build something cool together."
      },
      analysisQuestions: [
        { q: "Which culture emphasizes relationships/personal life in introductions?", a: "Indian culture (family, cricket mentioned)" },
        { q: "Which culture focuses on humility and team harmony?", a: "Japanese culture" },
        { q: "Which culture uses informal language and humor?", a: "American culture" },
        { q: "What should you include when introducing yourself internationally?", a: "Professional role, perhaps one personal fact, and a collaborative intention" }
      ],
      culturalTip: "When meeting people from different countries, watch their cues. Match their formality level to build rapport."
    },
    {
      id: 15, type: "video_script_listening", difficulty: "intermediate", duration: "5 mins",
      title: "TED Talk Opening Introduction",
      hindiTitle: "TED टॉक की शुरुआती प्रस्तुति",
      audioDescription: "A speaker begins a TED talk with a personal introduction that leads into their topic.",
      transcript: "Twelve years ago, I stood in front of my first class of forty teenagers in a government school in Dharamsala. I was 23, I had never taught before, and I had exactly forty-five minutes of notes. By the time I had used up my notes, there were still twenty minutes left. So I did the only thing I could think of: I asked them about their dreams.\n\nFor the next twenty minutes, those forty teenagers — many of whom had never been asked this question — talked about becoming doctors, pilots, musicians, and chefs. And in that moment, I realized that the most powerful lesson I could ever teach them had nothing to do with my notes.\n\nMy name is Shaheen Mistri. I am the founder of Teach For India. And this is a talk about what children taught me — about ambition, resilience, and the extraordinary power of being asked the right question.",
      questions: [
        { q: "How old was the speaker when she first taught?", a: "23 years old" },
        { q: "What did she ask the students when she ran out of notes?", a: "She asked them about their dreams" },
        { q: "What organization did she found?", a: "Teach For India" },
        { q: "What is the talk about?", a: "What children taught her — ambition, resilience, and the power of asking the right question" }
      ],
      storytellingTechnique: "Notice how Shaheen: 1) Opens with a specific scene (not a general statement), 2) Creates tension (what happens next?), 3) Reveals her identity only after the hook.",
      tip: "Great introductions don't start with 'My name is.' They start with a story."
    },
    {
      id: 16, type: "phone_call", difficulty: "intermediate", duration: "4 mins",
      title: "Business Phone Call Introduction",
      hindiTitle: "व्यावसायिक फोन कॉल परिचय",
      audioDescription: "A sales representative makes a cold call and introduces herself.",
      transcript: "Caller: Good morning, may I please speak with Mr. Sinha?\nReceptionist: Speaking. Who's calling?\nCaller: Good morning, Mr. Sinha. My name is Rachna Kapoor, and I'm calling from EduPrime Solutions. I hope I haven't caught you at a bad time?\nSinha: I have a few minutes, yes.\nCaller: Thank you so much. I'm reaching out because we work specifically with engineering colleges to help them improve placement rates. We recently worked with three colleges in Maharashtra, and all three saw a 35 percent improvement in campus placements within one academic year. Given that your college recently expanded its engineering intake, I thought our services might be relevant. Would you be open to a fifteen-minute conversation this week to explore whether there's a fit?\nSinha: That's interesting. Send me your details first, and I'll review them before we speak.",
      questions: [
        { q: "What company does Rachna work for?", a: "EduPrime Solutions" },
        { q: "What improvement did they achieve for colleges?", a: "35% improvement in campus placements" },
        { q: "How long did the improvement take?", a: "One academic year" },
        { q: "What does Mr. Sinha ask her to do first?", a: "Send her details for review" }
      ],
      phoneEtiquette: ["Introduce yourself AND your company", "Ask if it's a good time", "State value quickly", "End with a clear, small ask"],
      tip: "Business phone introductions must be concise. Get to the point within 30 seconds."
    },
    {
      id: 17, type: "group_introduction", difficulty: "beginner", duration: "5 mins",
      title: "Name Round at a Workshop",
      hindiTitle: "वर्कशॉप में नाम राउंड",
      audioDescription: "Eight people at a workshop quickly introduce themselves. Listen and remember all eight names and one fact about each.",
      participants: [
        { name: "Mehta, Rajat", fact: "Doctor, Chandigarh" },
        { name: "Singh, Gurpreet", fact: "Farmer who codes, Punjab" },
        { name: "Iyer, Lakshmi", fact: "Classical dancer, Chennai" },
        { name: "Khan, Imran", fact: "Chef, Lucknow" },
        { name: "Das, Subha", fact: "Wildlife photographer, Assam" },
        { name: "Chavan, Pallavi", fact: "Civil servant, Pune" },
        { name: "Tiwari, Anand", fact: "Social worker, Varanasi" },
        { name: "Nair, Reshma", fact: "Marine biologist, Kochi" }
      ],
      task: "Without looking at the list, write down all 8 names and one fact about each.",
      memoryTip: "Create visual associations: Rajat (doctor) → stethoscope, Gurpreet (farmer who codes) → laptop in a field.",
      tip: "In groups, focus on one person at a time. Repeat their name silently after they say it."
    },
    {
      id: 18, type: "final_integrated", difficulty: "advanced", duration: "10 mins",
      title: "Full Interview Simulation — Listen and Respond",
      hindiTitle: "पूर्ण इंटरव्यू सिमुलेशन — सुनें और जवाब दें",
      audioDescription: "An interviewer asks three questions. Pause, prepare your answer for 60 seconds, then speak or write your response.",
      interviewerQuestions: [
        "Tell me a little about yourself. Where are you from and what's your background?",
        "What's one challenge you've faced in your career, and how did you overcome it?",
        "Why are you interested in this particular role and our company?"
      ],
      preparationTime: 60,
      evaluationCriteria: ["Clear self-identification", "Relevant background details", "Specific challenge with resolution", "Company-specific research shown"],
      tip: "Listen for what the interviewer emphasizes. If they say 'a little,' they want a 1-minute answer, not 5."
    }
  ]
};

write('listening-exercise.json', listeningExercise);

/* ═══════════════════════════════════════════════
   3. READING EXERCISES (15 passages)
═══════════════════════════════════════════════ */
const readingExercise = {
  day: 2,
  topic: "Self Introduction – Reading Comprehension",
  description: "Read introductions in different styles and contexts. Develop vocabulary, inference skills, and cultural awareness.",
  totalPassages: 15,
  exercises: [
    {
      id: 1, type: "short_passage", difficulty: "beginner", wordCount: 120,
      title: "A Student's Blog Introduction",
      hindiTitle: "एक छात्र का ब्लॉग परिचय",
      passage: "Welcome to my blog! My name is Kabir Malhotra and I'm a 20-year-old student from Jaipur, currently studying Electrical Engineering at IIT Delhi. I started this blog because I wanted a place to share my thoughts on technology, education, and life as an engineering student.\n\nI grew up in a family of teachers — my father teaches mathematics and my mother teaches Hindi — so I've always been surrounded by a love for learning. But I was always the 'different' one: while my parents loved books, I loved circuits and machines.\n\nIn this blog, I'll share: study tips for JEE aspirants, project builds and tutorials, honest reviews of courses and books, and life in Delhi as a student from Rajasthan. I hope you find something useful here. Let's learn together!",
      comprehensionQuestions: [
        { q: "Why did Kabir start the blog?", a: "To share thoughts on technology, education, and student life" },
        { q: "What do his parents do?", a: "Both are teachers (father teaches maths, mother teaches Hindi)" },
        { q: "How does Kabir describe himself compared to his family?", a: "He was the 'different one' who loved circuits instead of books" },
        { q: "Name two types of content Kabir plans to share.", a: "Any two of: study tips, project tutorials, course reviews, life in Delhi" }
      ],
      vocabularyInContext: [
        { word: "aspiring", meaning: "hoping to be", sentenceFromText: "JEE aspirants" },
        { word: "surrounded by", meaning: "having something all around you", sentenceFromText: "surrounded by a love for learning" }
      ]
    },
    {
      id: 2, type: "formal_bio", difficulty: "beginner", wordCount: 150,
      title: "Company Website Team Bio",
      hindiTitle: "कंपनी वेबसाइट टीम बायो",
      passage: "ABOUT DEEPA KRISHNAMURTHY — Chief Operating Officer\n\nDeep Krishnamurthy joined TechVista in 2019 as VP of Operations and was promoted to Chief Operating Officer in 2022. She brings 18 years of experience in supply chain management, having previously held senior roles at Flipkart, Maersk, and the Tata Group.\n\nDeep holds a B.E. in Industrial Engineering from NITK Surathkal and an MBA from Indian School of Business, Hyderabad. She completed an executive education program at INSEAD, France, in 2020.\n\nIn her current role, Deep oversees all operational functions, including logistics, warehousing, and vendor management for TechVista's 12 distribution centers across India. Under her leadership, operational efficiency improved by 42% and order accuracy rates reached 99.4%.\n\nDeep is a board member of the Confederation of Indian Industry (CII) Women in Business Committee and regularly speaks at industry forums on supply chain resilience.",
      comprehensionQuestions: [
        { q: "When did Deep join TechVista?", a: "2019" },
        { q: "How many years of experience does she have?", a: "18 years" },
        { q: "What percentage did operational efficiency improve under her leadership?", a: "42%" },
        { q: "What committee is she a board member of?", a: "CII Women in Business Committee" }
      ],
      inferenceQuestion: { q: "What can you infer about TechVista's size based on the passage?", a: "It is a large company with 12 distribution centers across India" },
      vocabularyInContext: [
        { word: "oversees", meaning: "supervises and manages", note: "Used for senior leadership roles" },
        { word: "resilience", meaning: "ability to recover from difficulties", note: "Common in business contexts" }
      ]
    },
    {
      id: 3, type: "narrative", difficulty: "intermediate", wordCount: 200,
      title: "First Day in a New Country",
      hindiTitle: "नए देश में पहला दिन",
      passage: "I arrived in London on a grey November morning with two suitcases, a paper map (my phone hadn't set up yet), and the address of my student accommodation written in my mother's handwriting.\n\nAt the Tube station, a woman saw me squinting at the map and walked over. 'Where are you trying to get to?' she asked. I told her: 'Goldsmiths, New Cross.' She laughed warmly — not unkindly — and said, 'Oh, you're on the wrong side of London!' She spent five minutes explaining the right route, refused to take any money for a coffee I offered to buy, and simply said, 'Welcome to London. We're not all unfriendly.'\n\nI tell this story every time I introduce myself to new people in England, because it explains who I am and why I stayed. My name is Sohail Khan. I came from Karachi as a student, fell in love with this city's complicated kindness, and never quite left. Seventeen years later, I run an integration support service for new arrivals from South Asia. I help people navigate the exact confusing Tube map I held that November morning.\n\nEvery introduction is a story. This is mine.",
      comprehensionQuestions: [
        { q: "Why did Sohail have a paper map?", a: "His phone hadn't set up yet" },
        { q: "What mistake had Sohail made?", a: "He was on the wrong side of London" },
        { q: "What work does Sohail do now?", a: "He runs an integration support service for new arrivals from South Asia" },
        { q: "Why does he tell this story when he introduces himself?", a: "Because it explains who he is and why he stayed in London" }
      ],
      themeQuestion: { q: "What is the main theme of this passage?", a: "How a single act of kindness can shape a person's life and purpose" },
      literaryDevice: { device: "Bookending", example: "The Tube map appears at the start (his arrival) and end (his work), connecting his past to his present purpose." }
    },
    {
      id: 4, type: "academic_profile", difficulty: "intermediate", wordCount: 180,
      title: "Research Paper Author Profile",
      hindiTitle: "शोध पत्र लेखक प्रोफाइल",
      passage: "AUTHOR BIOGRAPHY\n\nDr. Ananya Chatterjee is an Associate Professor in the Department of Linguistics at Jawaharlal Nehru University, New Delhi. She received her PhD from the University of Edinburgh in 2014, where her dissertation examined code-switching patterns among Hindi-English bilingual communities in urban India.\n\nHer current research lies at the intersection of sociolinguistics and digital communication, with a particular focus on how language identity is constructed and negotiated in WhatsApp groups and Twitter communities. She has published 23 peer-reviewed articles in journals including Language in Society, the Journal of Sociolinguistics, and the International Journal of Bilingualism.\n\nDr. Chatterjee is the recipient of the 2021 LSAI Young Researcher Award and has been a visiting fellow at the Max Planck Institute for the Study of Ethnic and Religious Diversity. She is currently co-editing a volume titled 'Vernacular Englishes in Digital South Asia' for Cambridge University Press.\n\nOutside academia, she is a committed urban gardener who grows 40 varieties of tomatoes on her apartment terrace in Delhi.",
      comprehensionQuestions: [
        { q: "Where did Dr. Chatterjee complete her PhD?", a: "University of Edinburgh" },
        { q: "What is her current research focus?", a: "Language identity in digital communication (WhatsApp, Twitter)" },
        { q: "How many peer-reviewed articles has she published?", a: "23" },
        { q: "What unusual hobby does she have?", a: "She grows 40 varieties of tomatoes on her apartment terrace" }
      ],
      vocabularyChallenge: [
        { word: "code-switching", definition: "Changing between languages within a conversation" },
        { word: "sociolinguistics", definition: "The study of how language is used in society" },
        { word: "peer-reviewed", definition: "Evaluated by other experts before publication" }
      ]
    },
    {
      id: 5, type: "casual_profile", difficulty: "beginner", wordCount: 130,
      title: "Dating App Bio",
      hindiTitle: "डेटिंग ऐप बायो",
      passage: "Hey there! I'm Rohan, 27, Bangalore.\n\nBy day: Data Analyst at a healthcare startup. By night: amateur chef who experiments with fusion cuisine (warning: the outcomes are... ambitious).\n\nI'm the kind of person who will drag you to a 6 AM trek AND to a 2 AM dessert place on the same day. I run half-marathons but I've also eaten three biryanis in one sitting, so I contain multitudes.\n\nLooking for someone who: enjoys long drives to nowhere in particular, doesn't mind my extensive opinion on which dal is best (toor, obviously), and is willing to be terrible at board games together.\n\nNot looking for: someone who thinks pineapple belongs on pizza. This is non-negotiable.\n\nFavorites: mountains, monsoons, Gulzar's poetry, and dogs of all sizes.\n\nLet's swap life stories over chai? ☕",
      comprehensionQuestions: [
        { q: "What is Rohan's profession?", a: "Data Analyst at a healthcare startup" },
        { q: "What does Rohan say about his cooking?", a: "He experiments with fusion cuisine; the outcomes are 'ambitious' (not always successful)" },
        { q: "What is his non-negotiable deal-breaker?", a: "Someone who thinks pineapple belongs on pizza" },
        { q: "What does he want to do on a first meeting?", a: "Swap life stories over chai" }
      ],
      toneAnalysis: { q: "How would you describe the tone of this bio?", a: "Humorous, self-aware, warm, and casual — uses humor to reveal personality" }
    },
    {
      id: 6, type: "historical", difficulty: "intermediate", wordCount: 170,
      title: "Famous Self-Introduction: APJ Abdul Kalam",
      hindiTitle: "प्रसिद्ध आत्म-परिचय: APJ Abdul Kalam",
      passage: "In 2002, when Dr. APJ Abdul Kalam was sworn in as the 11th President of India, he introduced himself to the nation in his inaugural address:\n\n'I am a small man from a small town. I was born in Rameswaram, in a family of modest means. My father was a boat owner who ferried Hindu pilgrims across to the Shiva temple at Rameswaram. As a child, I sold newspapers to supplement our family income. My teacher, Iyadurai Solomon, once told me: to succeed in life and achieve results, you must understand and master three mighty forces — desire, belief, and expectation.'\n\nDr. Kalam went on to become one of India's greatest scientists, leading the development of India's first satellite launch vehicle and the Pokhran-II nuclear tests. But when given the highest office in the land, he chose to introduce himself not through his achievements, but through his origins — a reminder that greatness is not diminished by humble beginnings, but defined by the distance traveled.",
      comprehensionQuestions: [
        { q: "What was Dr. Kalam's father's profession?", a: "A boat owner who ferried Hindu pilgrims" },
        { q: "What did young Kalam do to help his family?", a: "He sold newspapers" },
        { q: "What three forces did his teacher mention?", a: "Desire, belief, and expectation" },
        { q: "Why did Dr. Kalam choose to speak of his origins rather than achievements?", a: "To show that greatness is defined by the distance traveled, not just the destination" }
      ],
      lesson: "A powerful introduction doesn't hide humble origins — it celebrates them. What you overcame is as important as what you achieved."
    },
    {
      id: 7, type: "contrast_comparison", difficulty: "advanced", wordCount: 220,
      title: "Two Ways to Introduce Yourself: Compare and Contrast",
      hindiTitle: "खुद का परिचय दो तरीकों से — तुलना करें",
      passageA: "Version A (Weak):\nMy name is Suresh Kumar. I am from Hyderabad. I completed my BTech in 2018. I worked at Wipro for two years. Then I worked at TCS for three years. Now I am looking for a new job. I like cricket and movies. I am a hard worker. Thank you.",
      passageB: "Version B (Strong):\nHello! I'm Suresh Kumar, and the most interesting thing about my engineering career is that I've spent five years making software invisible — which sounds strange until I explain: I specialize in backend infrastructure, the code that makes everything else work without anyone noticing. At Wipro, I built the payment processing layer that handled 8 million transactions on Diwali without a single failure. At TCS, I led a team that migrated a legacy banking system — fifteen years old — to the cloud with zero customer downtime over a twelve-month process. I'm now looking for a role where I can take on more complex distributed systems challenges. Cricket and cinema refuel me. Let's talk.",
      analysisQuestions: [
        { q: "What makes Version B more effective than Version A?", a: "B uses specific numbers and examples, tells a mini-story, shows personality, and gives the listener a reason to remember Suresh" },
        { q: "What is Version A missing?", a: "Specific achievements, personality, narrative flow, and anything that differentiates Suresh" },
        { q: "Identify one strong word or phrase in Version B.", a: "Any of: 'making software invisible', '8 million transactions', 'zero customer downtime', 'twelve-month process'" },
        { q: "What does Version B do with the hobby mention at the end?", a: "It keeps it brief, uses action verbs ('refuel'), and ends with an invitation to connect" }
      ]
    },
    {
      id: 8, type: "email_thread", difficulty: "intermediate", wordCount: 200,
      title: "Read an Introduction Email Thread",
      hindiTitle: "परिचय ईमेल थ्रेड पढ़ें",
      emailThread: [
        { from: "manager@startup.io", subject: "Welcome Preethi!", body: "Team, please welcome Preethi Subramaniam who joins us today as our new Growth Manager. She comes with 6 years of experience in B2C growth, most recently at Swiggy. We're thrilled to have her!" },
        { from: "preethi.s@startup.io", subject: "RE: Welcome Preethi!", body: "Hi everyone! I'm so excited to join you all! Quick intro: I grew up in Chennai, studied Economics at Stella Maris, and stumbled into growth marketing completely by accident when I joined a tiny ed-tech startup as their 'everything' person. Turns out, I loved figuring out why users stay or leave. That question has driven my career for 6 years. I'm a dog mom to Biscuit (yes, she's as adorable as she sounds). I'll be learning fast over the next few weeks, but please don't wait — throw challenges my way! Looking forward to building together. 🚀" },
        { from: "teammate1@startup.io", subject: "RE: RE: Welcome Preethi!", body: "BISCUIT. We need photos immediately. Also welcome! — Ravi" }
      ],
      questions: [
        { q: "Where did Preethi most recently work?", a: "Swiggy" },
        { q: "How did Preethi 'stumble into' growth marketing?", a: "She joined a tiny ed-tech startup as their 'everything' person and discovered she loved understanding user behavior" },
        { q: "What drives her career?", a: "Figuring out why users stay or leave" },
        { q: "What does Ravi's reply tell us about the team culture?", a: "The team is friendly, informal, and has a good sense of humor" }
      ]
    },
    {
      id: 9, type: "magazine_profile", difficulty: "advanced", wordCount: 250,
      title: "Magazine Profile: Entrepreneur of the Year",
      hindiTitle: "पत्रिका प्रोफाइल: वर्ष का उद्यमी",
      passage: "When Zara Khan walks into a room, she doesn't announce herself. She doesn't need to. The 34-year-old founder of GreenStitch — India's most successful sustainable fashion brand — has learned that her work speaks first.\n\nBut ask her to introduce herself, and you get a story that starts not with funding rounds or magazine covers, but with a stubborn goat.\n\n'When I was eight years old,' she explains, settling into her upcycled teak chair in GreenStitch's Mumbai headquarters, 'my family visited a leather factory outside Kanpur. We saw a goat being brought in.' She pauses. 'I refused to eat any meat for six months after that. My mother thought I was being dramatic. I just couldn't unknow what I'd seen.'\n\nThat childhood refusal to look away became the founding philosophy of GreenStitch, which Zara launched in 2018 with ₹3 lakh, a secondhand sewing machine, and a Instagram following of 200 people. Today, the brand employs 400 artisans across four states, has partnered with H&M and Zara (the fashion brand, not Zara Khan — a point of regular amusement), and generates ₹85 crore in annual revenue.\n\n'People always ask me what my introduction is at conferences,' she says. 'I say: I'm Zara Khan, and I make beautiful things that don't cost the planet.' She smiles. 'It's taken me a long time to say that without adding twenty qualifiers.'",
      comprehensionQuestions: [
        { q: "What childhood experience influenced Zara's philosophy?", a: "Visiting a leather factory and seeing a goat being brought in" },
        { q: "How much money did Zara start her company with?", a: "₹3 lakh" },
        { q: "What is GreenStitch's annual revenue now?", a: "₹85 crore" },
        { q: "What does Zara say when asked for her introduction at conferences?", a: "'I'm Zara Khan, and I make beautiful things that don't cost the planet.'" }
      ],
      writingStyleNote: "Notice how the journalist introduces Zara: action (walks in) → claim (doesn't announce herself) → story (the goat). This builds curiosity before revealing achievements.",
      themeQuestion: { q: "What does 'taken me a long time to say that without adding twenty qualifiers' suggest about Zara?", a: "She struggled with confidence or self-doubt early on, and has grown to own her identity fully" }
    },
    {
      id: 10, type: "children_story_style", difficulty: "beginner", wordCount: 100,
      title: "A Child Introduces Herself",
      hindiTitle: "एक बच्ची खुद का परिचय देती है",
      passage: "My name is Avni. I am seven years old. I live in Mysore with my Amma, Appa, and my cat Tommy.\n\nI love drawing. I draw every day in my orange notebook. My favourite things to draw are: elephants, stars, and my cat Tommy.\n\nIn school, I like science because we do experiments. Last week we made a volcano with baking soda! It went BOOM and everyone laughed.\n\nWhen I grow up, I want to be a scientist and draw all the animals I discover. My Amma says I can be both.\n\nNice to meet you. Do you want to see my drawings?",
      comprehensionQuestions: [
        { q: "How old is Avni?", a: "Seven years old" },
        { q: "What is her cat's name?", a: "Tommy" },
        { q: "What does she want to be when she grows up?", a: "A scientist who draws animals" }
      ],
      grammarFocus: { topic: "Simple present tense", examples: ["I love drawing", "I live in Mysore", "I want to be a scientist"] },
      lesson: "Even simple introductions become memorable with specific, vivid details."
    },
    {
      id: 11, type: "online_forum", difficulty: "intermediate", wordCount: 140,
      title: "Reddit 'New Member Introduction' Post",
      hindiTitle: "Reddit 'नए सदस्य का परिचय' पोस्ट",
      passage: "Hello r/learnpython! Long-time lurker, first-time poster here. Thought I should finally introduce myself since I've been learning silently from this community for almost a year.\n\nI'm Tanmay, 29, working as a civil engineer in Ahmedabad. I started learning Python 10 months ago because I was tired of doing the same Excel calculations manually every month. Now those calculations run in 8 seconds instead of 4 hours, and I have become the unofficial 'Python person' at my firm despite technically still being a beginner.\n\nI recently tackled my first API (pulling weather data for a road construction project) and honestly felt like a god for approximately 15 minutes before I realized I had hardcoded the API key in the script.\n\nGoals for 2025: learn pandas properly, maybe contribute to one open source project, and figure out what 'git commit' actually does beyond copy-pasting it from Stack Overflow.\n\nAny fellow civil engineers here who code? Let's connect!",
      comprehensionQuestions: [
        { q: "Why did Tanmay start learning Python?", a: "To automate Excel calculations he did manually every month" },
        { q: "How much time did his automation save?", a: "From 4 hours to 8 seconds" },
        { q: "What mistake did he make with his first API?", a: "He hardcoded the API key in the script" },
        { q: "What are his goals for 2025?", a: "Learn pandas, contribute to open source, understand git properly" }
      ],
      toneAnalysis: { note: "Notice how Tanmay uses self-deprecating humor ('felt like a god... for approximately 15 minutes'). This makes him likable and relatable while still showing competence." }
    },
    {
      id: 12, type: "news_article", difficulty: "advanced", wordCount: 220,
      title: "Newspaper Profile of a Change-Maker",
      hindiTitle: "एक परिवर्तनकर्ता का अखबारी प्रोफाइल",
      passage: "JHANSI: On the wall of Rekha Devi's office in a cramped government building in Jhansi hangs a single printed sheet: 'Your degree does not define you. Your deeds do.'\n\nFifteen years ago, Rekha herself had neither a degree nor a steady income. Today, she is the founder of Saheli Foundation, an organization that has helped over 12,000 women across Bundelkhand become financially independent through skill training in garment manufacturing, digital literacy, and microfinance.\n\n'People always want me to introduce myself by my titles,' says Rekha, who holds honorary doctorates from two universities and has received the Nari Shakti Puraskar from the President of India. 'But I always start the same way: I'm Rekha, and I was the woman who needed help and didn't get any. Everything I do comes from that.'\n\nBorn into a family of agricultural laborers in Tikamgarh district, Rekha dropped out of school after Class 8 due to family financial pressures. She spent her twenties as a daily wage worker before attending a government skill training program that she describes as 'the day someone finally believed I could learn something new.'\n\nThe Saheli Foundation now operates in 14 districts and has an annual budget of ₹8 crore, funded by a combination of CSR grants, government partnerships, and social enterprise revenue.",
      comprehensionQuestions: [
        { q: "How many women has the Saheli Foundation helped?", a: "Over 12,000 women" },
        { q: "How does Rekha always introduce herself?", a: "As the woman who needed help and didn't get any" },
        { q: "Why did Rekha drop out of school?", a: "Due to family financial pressures" },
        { q: "What turned her life around?", a: "A government skill training program where someone believed in her" }
      ],
      reflection: { q: "What makes Rekha's self-introduction powerful despite having no formal credentials early in life?", a: "She leads with her lived experience and motivation rather than titles, making her authentic and relatable" }
    },
    {
      id: 13, type: "job_application", difficulty: "intermediate", wordCount: 160,
      title: "Online Job Application 'About Yourself' Section",
      hindiTitle: "ऑनलाइन जॉब आवेदन 'अपने बारे में' सेक्शन",
      passage: "CANDIDATE: Bhavesh Patel | POSITION APPLIED: UX Designer, DesignHub India\n\nIn the 'Tell us about yourself' field, Bhavesh wrote:\n\n'I design for the person who almost gave up.\n\nLet me explain. I once watched my 65-year-old uncle spend 45 minutes trying to figure out how to recharge his phone on a leading telecom app. He's a sharp man — retired IPS officer — but the app made him feel stupid. I stood next to him, watched his frustration build, and thought: someone designed this and considered it acceptable.\n\nI became a UX designer because I believe no one should feel stupid using something a designer made.\n\nFor four years, I have designed for telecom, banking, and health apps — sectors where poor UX can cause real harm, not just inconvenience. I specialize in accessibility-first design and user research with non-metropolitan, low-literacy populations. My work has reached 3.2 million users across Tier 2 and 3 cities.\n\nI want to join DesignHub because your commitment to inclusive design is not a tagline — it's visible in every product you've shipped.'\n\n[Word count: 163]",
      comprehensionQuestions: [
        { q: "Who inspired Bhavesh to become a UX designer?", a: "His 65-year-old uncle who struggled with a telecom app" },
        { q: "What is his design philosophy?", a: "No one should feel stupid using something a designer made" },
        { q: "How many users has his work reached?", a: "3.2 million users" },
        { q: "Why does he want to join DesignHub specifically?", a: "Because their commitment to inclusive design is visible in their products, not just a tagline" }
      ],
      applicationTip: "Notice how Bhavesh answers the application question with a story that simultaneously reveals his values, skills, and why he wants THIS job specifically."
    },
    {
      id: 14, type: "multilingual_comparison", difficulty: "advanced", wordCount: 180,
      title: "Same Person, Four Contexts",
      hindiTitle: "एक ही व्यक्ति, चार संदर्भ",
      contexts: [
        { context: "At a family gathering", intro: "'I'm Meera, Aunty Padma's daughter-from-Bengaluru. I work in one of those IT companies — software only, nothing complicated! I make biryani sometimes. Still looking for a good match, yes Mummy, I know.'" },
        { context: "At a professional conference", intro: "'I'm Meera Nair, Senior Systems Architect at Infosys. I specialize in cloud migration for legacy financial systems. Currently leading a team of 22 engineers on a Singapore banking project.'" },
        { context: "On a dating profile", intro: "'Software engineer by day, terrible singer in the shower by night. I can explain cloud architecture but not why I cry at dog food commercials. Looking for someone who thinks silence is sometimes the best conversation.'" },
        { context: "At a neighbourhood committee meeting", intro: "'Hi, I'm Meera, flat 402. I moved in three months ago. I work from home and I'm happy to help with anything tech-related — Wi-Fi setup, whatever. Also, can we please discuss the garbage collection timing?'" }
      ],
      analysisQuestions: [
        { q: "What stays consistent across all four introductions?", a: "Her identity (Meera, software engineer) — but the emphasis and vocabulary change for each audience" },
        { q: "Which introduction is most formal? Why?", a: "The professional conference introduction — uses technical terms, specific numbers, full name" },
        { q: "What technique does she use at the family gathering?", a: "She simplifies her work and uses humor to connect ('nothing complicated', 'Still looking for a good match')" },
        { q: "What can you learn from these four examples?", a: "Good communication means adapting your introduction to your audience while staying authentic" }
      ]
    },
    {
      id: 15, type: "long_passage", difficulty: "advanced", wordCount: 280,
      title: "The Art of the First Impression: A Long Read",
      hindiTitle: "पहली छाप की कला: एक लंबा पठन",
      passage: "We decide, on average, in seven seconds whether we trust a person. Seven seconds. Before they have said more than hello.\n\nThis is both alarming and liberating — alarming because it means we judge before we hear, liberating because it means the introduction that follows those seven seconds has enormous power to either confirm or completely overturn that snap judgment.\n\nThe most effective self-introductions share three qualities. First, they are *specific*. 'I work in finance' tells you nothing. 'I help small business owners in Tier-2 cities get their first bank loan' tells you exactly who this person is and why their work matters. Specificity is kindness — it gives your listener something to hold onto.\n\nSecond, they are *honest*. The temptation in introductions is to present only our successes, our polished highlights. But the introductions we remember are the ones that acknowledge a struggle, a mistake, a detour. When APJ Abdul Kalam introduced himself as 'a small man from a small town,' he was being strategic, not self-deprecating. He knew that owning your origin creates trust.\n\nThird, they are *purposeful*. Every introduction happens in a context. The words you choose should answer the unspoken question your audience is actually asking: 'Why should I pay attention to you? What can you offer me or teach me or help me with?' The best introductions answer that question without ever making it seem like you are selling yourself.\n\nHere is the uncomfortable truth: most people never improve their introductions because they think introductions are about them. They are not. They are about the connection you are trying to build with the person in front of you.\n\nYour name is the opening note. The music that follows is up to you.",
      comprehensionQuestions: [
        { q: "How long does it take to form a first impression?", a: "Seven seconds" },
        { q: "What are the three qualities of effective self-introductions?", a: "Specificity, honesty, and purposefulness" },
        { q: "Why does the author say owning your humble origin 'creates trust'?", a: "Because acknowledging struggle and real beginnings makes you more relatable and authentic" },
        { q: "What is the 'unspoken question' your audience is actually asking?", a: "'Why should I pay attention to you? What can you offer me?'" }
      ],
      mainIdea: { q: "Summarize the passage's main argument in one sentence.", a: "A great self-introduction is not about presenting yourself but about building a genuine connection with the listener." }
    }
  ]
};

write('reading-exercise.json', readingExercise);
console.log('Writing + Listening + Reading done. Now generating Story, Essay, Dialogue, Flashcards, Conversation, Mistakes, Tricks...');

/* ═══════════════════════════════════════════════
   4. STORIES  (12 stories)
═══════════════════════════════════════════════ */
const storyData = {
  day: 2,
  topic: "Self Introduction – Story Bank",
  description: "Short stories that model real-world self-introductions. Read, enjoy, and learn vocabulary and grammar in context.",
  totalStories: 12,
  stories: [
    {
      id: 1, title: "The Train Introduction", hindiTitle: "ट्रेन का परिचय",
      level: "A1", wordCount: 180, theme: "chance_meeting",
      story: "Riya was on the Rajdhani Express from Delhi to Mumbai. She sat by the window and opened her novel. A young man sat across from her.\n\n'Is this seat taken?' he asked.\n\n'No, please sit,' she said.\n\nAfter an hour of silence, he smiled. 'Long journey. I'm Arjun, by the way. I'm from Jaipur.'\n\n'Riya. Delhi.' She put down her book.\n\n'First time going to Mumbai?'\n\n'Third time. But first time alone. I'm starting a new job. Marketing at a startup.'\n\n'That's exciting!' Arjun said. 'I'm there for my MBA interview at JBIMS. Terrified, honestly.'\n\nRiya laughed. 'You'll be fine. What's your background?'\n\n'Engineering. Software. Five years at a product company. But I want to shift to business.'\n\n'That's a big change.'\n\n'That's the idea.'\n\nThe train moved through the dark countryside. By the time they reached Vadodara, they had talked for four hours — about careers, families, dreams, and the best chai stalls in their cities.\n\nIntroductions are strange, Riya thought. Sometimes one conversation on a train can feel more real than years of online connection.",
      vocabularyHighlights: ["taken (seat)", "honestly", "terrified", "background", "shift"],
      grammarFocus: "Past simple + present simple mixed narration",
      discussionQuestion: "Have you ever had a meaningful conversation with a stranger? What did you learn?"
    },
    {
      id: 2, title: "The Wrong Name", hindiTitle: "गलत नाम",
      level: "A2", wordCount: 200, theme: "humor_and_identity",
      story: "My name is Venkataraman Subramanian Iyer. I know. It's a lot.\n\nWhen I started my first job in Pune, I introduced myself to my new team. 'Hi, I'm Venkataraman Sub—'\n\n'Vicky!' my manager interrupted. 'Great, welcome Vicky!'\n\nI opened my mouth. Closed it. Vicky. Okay.\n\nFor one year, I was Vicky. Emails came to Vicky. My Slack profile said Vicky. When my mother called the office once and asked for Venkataraman, the receptionist said, 'I'm sorry, there's no one by that name here.'\n\nOne day, a new colleague from Hyderabad joined. I introduced myself. 'Hi, I'm Venkataraman—'\n\n'Oh!' she said. 'Venkataraman! Like the god? Are you from Tamil Nadu?'\n\n'Yes!' I said, surprised. It was the first time in a year anyone had said my full name.\n\nShe laughed. 'My grandfather's name is Venkataraman too. It's a beautiful name. Why do people call you Vicky?'\n\nI didn't have a good answer.\n\nThe next Monday, I updated my Slack profile: Venkataraman (not Vicky). I sent a team message: 'Quick note — my name is Venkataraman. You can call me Venkut if that's easier. But not Vicky.'\n\nThirty people reacted with 💜. One person replied: 'Why didn't you say so a year ago?'\n\nGood question.",
      vocabularyHighlights: ["interrupted", "receptionist", "colleague", "updated", "reacted"],
      grammarFocus: "Past simple narrative, direct speech",
      lesson: "Introductions are also about claiming your identity — including your name.",
      discussionQuestion: "Have you ever let someone call you by the wrong name? Why?"
    },
    {
      id: 3, title: "The Elevator Introduction", hindiTitle: "लिफ्ट का परिचय",
      level: "B1", wordCount: 220, theme: "professional_opportunity",
      story: "Priya worked on the 14th floor of a glass tower in Bengaluru. Every morning she rehearsed her elevator pitch in her head — her startup idea, her background, the problem they were solving.\n\nFor six months, she rehearsed. And for six months, she rode the elevator alone.\n\nUntil one Thursday morning, a man stepped in at the ground floor wearing a quietly expensive jacket and reading something on his phone. Priya recognized him immediately: Vikram Mehta. One of the most prominent angel investors in South India.\n\nThe doors closed. Twelve floors together.\n\nSay something, her brain said.\n\nShe said nothing.\n\nHe looked up briefly and smiled politely. The silence stretched.\n\nSay something.\n\n'I'm sorry,' she blurted at the 9th floor. 'You're Vikram Mehta, right?'\n\nHe looked up properly this time. 'I am.'\n\n'I'm Priya. I'm building a supply chain platform for rural dairy farmers. We've been piloting for four months in Mysuru district and our farmers are seeing 34% higher margins. I know this is an odd time and place, but I've been thinking about this for six months.' She took a breath. 'Could I have ten minutes of your time this week?'\n\nThe doors opened on the 14th floor.\n\nHe handed her a card. 'Thursday. 4 PM. Don't be late.'\n\nShe floated off the elevator.\n\nSix months of rehearsal. Twelve floors. Thirty seconds. That's all an introduction ever takes.",
      vocabularyHighlights: ["rehearsed", "prominent", "blurted", "piloting", "margins"],
      grammarFocus: "Past continuous + past simple (rehearsing → did something)",
      lesson: "The best elevator pitch comes from genuine preparation, not from a perfect script.",
      discussionQuestion: "If you had 30 seconds with your dream mentor, what would you say?"
    },
    {
      id: 4, title: "The Group Introduction That Went Wrong", hindiTitle: "समूह परिचय जो गलत हो गया",
      level: "A2", wordCount: 190, theme: "embarrassment_and_recovery",
      story: "It was the first day of our MBA orientation. The professor asked us to stand up, one by one, and give a 60-second introduction.\n\nI counted. I was 23rd. Twenty-three people before me. I had time to prepare something brilliant.\n\nPerson 1: 'I'm Rahul, IIT Delhi, three years at McKinsey.'\nPerson 2: 'I'm Simran, SRCC, then my family startup.'\nPerson 3: 'I'm Karthik, BITS Pilani, left my Google job for this.'\n\nEveryone seemed extraordinary. My stomach tightened.\n\nBy person 15, I had rewritten my introduction seven times in my head.\n\nPerson 22 sat down. The professor looked at me.\n\nI stood up. Seventy faces looked back.\n\n'I'm...' I paused. My carefully prepared lines evaporated. 'I'm Mohan. And I'm not entirely sure why I'm here.'\n\nLaughter. Warm, understanding laughter.\n\n'I came from a government school in Sitapur, UP. No IIT. No foreign internship. Just... determination, I suppose. And a lot of luck.'\n\nAfter class, four people came up to me. 'That was the best introduction,' one said. 'You actually said something real.'\n\nIn trying to be extraordinary, I accidentally said something true. And truth, it turned out, was what everyone was starving for.",
      vocabularyHighlights: ["orientation", "extraordinary", "evaporated", "determination", "accidentally"],
      grammarFocus: "Past simple, reported speech (what people said)",
      lesson: "Authenticity is more memorable than perfection.",
      discussionQuestion: "Have you ever tried too hard to impress people? What happened?"
    },
    {
      id: 5, title: "My Grandmother's Introduction", hindiTitle: "मेरी दादी का परिचय",
      level: "A2", wordCount: 170, theme: "intergenerational",
      story: "My grandmother, Savitri Devi, is 82 years old and has never gone to school. But she knows how to introduce herself better than anyone I've ever met.\n\nWhen someone new comes to our village, she walks up to them, folds her hands, and says in clear, confident Hindi:\n\n'I am Savitri. My husband was the schoolteacher of this village for thirty years. My son is an engineer in Hyderabad. My daughter-in-law makes the best mango pickle in the district. My grandson is learning English in the city — he says it will open doors for him.'\n\nShe includes everyone. Her whole family is part of who she is.\n\nWhen I came home for Diwali last year, I told her I had been practicing English introductions.\n\n'What do you say?' she asked.\n\nI recited my introduction: name, university, company, achievements.\n\nShe listened. Then she said: 'You forgot to mention your family.'\n\nI thought about it later. In English introductions, we say 'I'. In our culture, we say 'we'.\n\nMaybe the best introductions are somewhere in between.",
      vocabularyHighlights: ["confident", "district", "recited", "achievements", "culture"],
      grammarFocus: "Simple past, family relationships vocabulary",
      culturalNote: "Different cultures emphasize different aspects of identity in introductions. Indian introductions often include family context.",
      discussionQuestion: "When you introduce yourself, do you mention your family? Why or why not?"
    },
    {
      id: 6, title: "The Online Meeting Introduction", hindiTitle: "ऑनलाइन मीटिंग का परिचय",
      level: "A2", wordCount: 160, theme: "modern_workplace",
      story: "It was my first day at the international client call. Ten faces stared at me from boxes on the screen. New York. London. Singapore. Tokyo.\n\n'Prateek, would you like to introduce yourself?' my manager said.\n\nI had rehearsed. I was ready.\n\nThen a dog barked. My neighbor's AIR CONDITIONER groaned. A vendor shouted something outside.\n\n'Sorry about the background noise,' I said. 'I'm Prateek Joshi, joining from Pune, India. I'm a data analyst with four years of experience in consumer behavior research. I'll be supporting the South Asia market analysis for this project.'\n\n'Prateek!' said the New York person. 'I can see the Pune skyline through your window — is that right?'\n\nI turned. There was a glimpse of palm trees and a water tank.\n\n'Sort of,' I laughed.\n\nThe Tokyo person said: 'It is already 11 PM here and your window looks like daytime. Time zones are strange.'\n\nSomething relaxed in the room after that.\n\nThe introduction matters less than you think. The human moment that follows it matters more.",
      vocabularyHighlights: ["international", "rehearsed", "behavior", "analysis", "glimpse"],
      grammarFocus: "Interruptions in narrative, direct speech in professional context",
      lesson: "Imperfect settings can create perfect human connections.",
      discussionQuestion: "What challenges have you faced in online English communication?"
    },
    {
      id: 7, title: "The Village Boy in New York", hindiTitle: "न्यूयॉर्क में गाँव का लड़का",
      level: "B1", wordCount: 230, theme: "ambition_and_identity",
      story: "The immigration officer at JFK looked at my passport. 'Purpose of visit?'\n\n'Academic conference. I'm presenting a research paper.'\n\nHe looked up. Then at my passport photo. Then at me — standing in my best (and only) blazer, which was slightly too big because I had borrowed it from my cousin.\n\n'You wrote this paper?'\n\n'Yes, sir.'\n\n'What's it about?'\n\n'Soil microbiome mapping for drought prediction in semi-arid regions of Rajasthan.'\n\nA pause. 'Say that again.'\n\nI said it again.\n\nHe stamped my passport. 'Good luck with the presentation.'\n\nI walked out into New York and called my mother. 'Amma, I'm here.'\n\nShe cried. I almost did too.\n\nAt the conference, I introduced myself to researchers from eleven countries. 'I'm Dilip Kumar, from IIT Jodhpur. First time outside India.'\n\nEvery time, they asked where Jodhpur was. Every time, I explained. 'Rajasthan. Blue City. Near the Thar Desert.' And every time, their eyes lit up slightly — the way eyes light up when something becomes real.\n\nI had grown up in a village with no English, no internet, and a father who farmed land that kept turning to dust. Everything I was introducing myself as — researcher, presenter, conference speaker — I had built word by word, year by year.\n\nAn introduction is always a measure of the distance you have traveled.",
      vocabularyHighlights: ["immigration", "academic", "microbiome", "semi-arid", "researcher"],
      grammarFocus: "Past simple narrative, dialogue punctuation",
      lesson: "Your introduction reflects your journey, not just your destination.",
      discussionQuestion: "What parts of your identity do you most want people to know?"
    },
    {
      id: 8, title: "The Wrong Introduction", hindiTitle: "गलत परिचय",
      level: "A2", wordCount: 150, theme: "misunderstanding_and_humor",
      story: "My company sent me to represent us at a startup conference. My manager said: 'Just introduce yourself naturally.'\n\nI walked up to a man in a grey suit. 'Hi! I'm Sunil. I work in sales at DataConnect. We help companies optimize their B2B outreach pipeline using AI-driven insights.'\n\nThe man looked confused. 'Oh. I see.'\n\nWe talked for ten minutes. I gave him my business card. He gave me his.\n\nI looked at his card. Dr. Mohan Krishnaswamy. Retired Professor of Sanskrit, Hyderabad University.\n\nHe had come to the wrong floor. He was looking for a Sanskrit literary conference on the 3rd floor. Our tech conference was on the 4th.\n\nBut he had listened to my whole pitch very politely.\n\nWe said goodbye warmly. As he walked away, he turned back: 'I don't understand half of what you said, young man. But you clearly love your work. That came through very clearly.'\n\nThe best part of any introduction, perhaps, is not the words. It's the energy behind them.",
      vocabularyHighlights: ["represent", "optimize", "outreach", "pipeline", "insights"],
      grammarFocus: "Past simple, reported speech",
      lesson: "Enthusiasm is universal even when vocabulary isn't.",
      discussionQuestion: "Have you ever explained your work to someone from a completely different field? How did you simplify it?"
    },
    {
      id: 9, title: "The Parent's Introduction", hindiTitle: "माता-पिता का परिचय",
      level: "B1", wordCount: 200, theme: "parenting_and_identity",
      story: "For the first three years of her son's life, Kamala Singh's standard introduction had been: 'I'm Aryan's mom.'\n\nNot 'I'm Kamala.' Not 'I'm a former lawyer.' Just: Aryan's mom.\n\nAt a school parents' meeting, she sat next to a woman who said: 'Hi! I'm Nandita. I'm Sia's mom. What do you do?'\n\nKamala opened her mouth. 'I'm a—' she paused. What was she? 'I used to practice corporate law. I left three years ago. Now I'm... figuring out what's next.'\n\nNandita nodded. 'That's brave.'\n\n'Is it? It doesn't feel brave. It feels lost most days.'\n\n'All brave things feel lost first.'\n\nThey met for coffee the next week. Nandita was a graphic designer who had left a big agency to freelance — 'I wanted to be the one who drops Sia at school.' Kamala was considering starting a legal consultancy for startups.\n\nSix months later, Kamala launched her consultancy. Her first three clients came through Nandita's network.\n\nShe updated her introduction: 'I'm Kamala Singh. I'm a legal consultant specializing in startup advisory. And yes, also Aryan's mom — but he's learning to introduce himself now.'",
      vocabularyHighlights: ["corporate", "freelance", "consultancy", "advisory", "network"],
      grammarFocus: "Present perfect + past simple contrast (used to/now)",
      lesson: "Identity evolves. Our introductions should too.",
      discussionQuestion: "How has your self-introduction changed over the last 5 years?"
    },
    {
      id: 10, title: "The First Introduction in English", hindiTitle: "अंग्रेजी में पहला परिचय",
      level: "A1", wordCount: 160, theme: "learning_and_courage",
      story: "I remember the first time I spoke English outside my classroom.\n\nI was 19. I was at the railway station in Surat. A foreign tourist — a tall man from Germany — was looking at the ticket board with a confused face.\n\nSomething made me walk up to him.\n\n'Excuse me,' I said. My voice was very small. 'You need help?'\n\nHe turned. 'Yes! I am trying to find train to Mumbai.'\n\n'Ah.' I looked at the board. I knew which train. But did I know the English? 'That train. Number 12010. Platform... three. Goes Mumbai. 3:30.'\n\nHe smiled big. 'Thank you so much! What is your name?'\n\n'Ritesh.'\n\n'Ritesh! I am Hans. Nice to meet you.'\n\n'Nice... to meet you too.'\n\nHe shook my hand and went to platform 3.\n\nI stood there for one full minute just feeling my heartbeat.\n\nIt wasn't perfect English. But it worked. And it worked meant everything.\n\nThat was the first time I introduced myself in English to a stranger. I have done it ten thousand times since. But never forgot the first.",
      vocabularyHighlights: ["confused", "platform", "tourist", "stranger", "heartbeat"],
      grammarFocus: "Simple past (first experience narrative), basic present tense in dialogue",
      lesson: "Imperfect English that communicates is infinitely better than perfect English never spoken.",
      discussionQuestion: "What was your first meaningful experience speaking English? How did it feel?"
    },
    {
      id: 11, title: "The Crisis Introduction", hindiTitle: "संकट का परिचय",
      level: "B1", wordCount: 210, theme: "leadership_and_identity",
      story: "It was 11:47 PM. Our production servers were down. Forty thousand users couldn't access our app. The on-call engineer had called me — the VP of Engineering — and I was now in a crisis call with fifteen engineers I had never spoken to before.\n\n'Who else is on the call?' I asked.\n\nSilence. Then: 'Uh, I'm Deepak from backend infra.'\n\n'Priya, database team.'\n\n'I'm Karan, network security. I joined this company two weeks ago.'\n\nI thought about this for one second. 'Okay. I'm Ashish — VP Engineering. I've been here seven years and I've seen five outages worse than this. We always fix it. Let's get to work.' Brief pause. 'Karan — two weeks — what do you actually know about our network stack?'\n\n'Not much yet, but I can run the diagnostic scripts.'\n\n'Perfect. That's your job. Everyone else, here's the priority order...'\n\nWe brought the servers up at 1:23 AM.\n\nAfterwards, Karan sent me a message: 'I was terrified to say I was new. Thanks for asking directly.'\n\nIn crises, introductions become functional. You say your name and your capability — what you can do right now. It's the most honest form of introduction there is.",
      vocabularyHighlights: ["production servers", "on-call", "infra", "outage", "diagnostic"],
      grammarFocus: "Crisis management language, imperative mood, present tense for urgency",
      lesson: "In high-stakes situations, introductions are about capability, not credentials.",
      discussionQuestion: "How would you introduce yourself in a crisis where people need to trust you immediately?"
    },
    {
      id: 12, title: "The Last Introduction", hindiTitle: "अंतिम परिचय",
      level: "B2", wordCount: 220, theme: "life_reflection",
      story: "Professor Anand Swarup retired after forty-two years of teaching Economics at Delhi University. His last lecture was also, in a way, his last introduction.\n\n'Today I want to begin,' he said to the 200 students in the packed auditorium, 'the way I began my first lecture in 1982.'\n\nHe picked up a piece of chalk.\n\n'My name is Anand Swarup. I am a teacher. For the past forty-two years, I have stood in rooms like this one and tried to explain to young people why the world is organized the way it is, and whether it has to be.'\n\nHe paused.\n\n'When I was twenty-six and gave my first lecture, I introduced myself differently. I said: I am an Economist. I had a PhD. I was proud of the title. Economics was what I knew.\n\n'Now I say: I am a teacher. Because after forty-two years, what I understand — what this room has taught me — is that knowing something is only half the gift. The other half is being able to give it away.'\n\nHe placed the chalk down.\n\n'In my career, I have taught approximately thirty-two thousand students. Each one of them changed how I see the world. You cannot teach without being taught. You cannot introduce yourself without being introduced to yourself through the eyes of another.'\n\nThe auditorium was completely silent.\n\nThen someone started to clap.",
      vocabularyHighlights: ["retired", "auditorium", "approximately", "PhD", "organized"],
      grammarFocus: "Past perfect (had) vs. simple past, contrast between past and present identity",
      lesson: "Identity evolves through relationship. Who you are is partly made by who you have met.",
      discussionQuestion: "How do you think you will introduce yourself in 20 years?"
    }
  ]
};

write('story.json', storyData);

/* ═══════════════════════════════════════════════
   5. ESSAYS (6 essays)
═══════════════════════════════════════════════ */
const essayData = {
  day: 2,
  topic: "Self Introduction – Essay Bank",
  description: "Model essays on self-introduction themes. Study structure, vocabulary, and argumentation.",
  totalEssays: 6,
  essays: [
    {
      id: 1, title: "First Impressions: Are They Reliable?", type: "argumentative",
      wordCount: 350, level: "B2",
      outline: { intro: "Hook + thesis", body1: "Science supports first impressions", body2: "But they can be wrong", body3: "Middle ground: impressions + openness", conclusion: "We judge AND we should remain open" },
      essay: "The psychologist Nalini Ambady once showed that people could accurately judge a teacher's effectiveness from a six-second silent video clip. Six seconds. No words. No context. Just body language and facial expressions. The judgments aligned remarkably well with semester-long student evaluations. This suggests that first impressions are not entirely arbitrary — they may be detecting real signals about personality and competence.\n\nAnd yet, first impressions have spectacularly failed throughout history. J.K. Rowling was rejected by twelve publishers, each of whom presumably formed an impression of 'not worth publishing.' The Beatles were turned down by Decca Records, who famously concluded that 'guitar groups are on the way out.' Thomas Edison was told by his teachers that he was 'too stupid to learn anything.' In each case, the first impression was not only wrong — it was catastrophically wrong.\n\nThe truth lies in understanding what first impressions actually measure. They are excellent at detecting *style* — how someone presents themselves, their energy, their confidence. They are poor at detecting *substance* — the depth of their ideas, the quality of their work over time, their resilience under pressure. When we confuse style for substance, we make errors.\n\nThe sophisticated response to first impressions is neither to dismiss them nor to trust them blindly. It is to treat them as hypotheses: 'This person seems nervous — possibly shy, possibly intimidated by this specific context.' Not a verdict, but a question.\n\nWhen we introduce ourselves to others, we are inevitably performing for their first impression machinery. Understanding this can help us present ourselves more strategically — not by being fake, but by ensuring that our presentation accurately reflects our actual substance. The goal of a good self-introduction is precisely this: to give the other person's first impression machinery the right data to work with.",
      vocabulary: ["arbitrary", "remarkably", "catastrophically", "hypothesis", "strategically"],
      writingTechniques: ["Anecdote opening", "Counterargument structure", "Nuanced conclusion"]
    },
    {
      id: 2, title: "Why Names Matter", type: "reflective",
      wordCount: 300, level: "B1",
      essay: "My name is Jayalakshmi Venkataraman Pillai. It is six syllables long, requires two hyphens when typeset correctly, and has been butchered in seven countries across three continents.\n\nFor most of my professional life, I introduced myself as 'Jay.' It was easier. People could remember it, spell it, shout it across a conference room. I thought I was being pragmatic.\n\nBut pragmatism has a cost. Every time someone called me Jay, I was slightly less myself. Not because 'Jay' is a bad name — it's a perfectly good name for someone whose name is Jay. But it wasn't mine.\n\nNames are not just labels. They are the first gift our parents give us. For many Indian families, names carry the weight of religion, lineage, aspiration, and love. My name, Jayalakshmi, means 'victory' and 'prosperity.' My parents chose it because they wanted both things for me. Shortening it to Jay deleted an intention.\n\nThe moment I started introducing myself by my full name — accepting the brief confusion, the requests for repetition, the occasional mangled attempt — something shifted. I felt more present. More willing to take up space. More myself.\n\nThere is a quiet act of courage in saying your full name in a room where no one will say it correctly on the first try. It is a small introduction not just of yourself, but of your culture, your history, and your refusal to be reduced for convenience.\n\nYour name is not an obstacle in your introduction. It is the introduction.",
      vocabulary: ["typeset", "butchered", "pragmatic", "lineage", "aspiration"],
      lesson: "The act of claiming your full name is an act of claiming your identity."
    },
    {
      id: 3, title: "The Art of Listening in an Introduction", type: "analytical",
      wordCount: 320, level: "B2",
      essay: "We have a curious cultural blindspot around introductions: we treat them as one-directional performances. Someone introduces themselves; someone else waits for their turn. The exchange is sequential, not conversational.\n\nBut the most skilled introducers I have met share a counterintuitive quality: they listen as much as they speak. When you introduce yourself, you are not simply broadcasting — you are establishing a connection. And connection requires attention, not just transmission.\n\nConsider two experiences: Person A says, 'Hi, I'm Rajan, I work in finance in Mumbai, I have two kids and I love cricket.' Person B says, 'Hi, I'm Rajan.' Then he pauses. 'What brings you here today?' When you answer, he listens — actually listens — then says: 'That's interesting, because I'm in a similar situation...' and tells you about himself in relation to what you've just shared.\n\nPerson B has introduced himself as effectively as Person A, but has also made you feel seen. Research by Adam Grant at Wharton suggests that the most likable people in social settings are not those who are the most interesting — they are those who make others feel most interesting.\n\nThis changes the calculus of self-introduction entirely. The goal is not to say the most impressive things about yourself. The goal is to create a moment where the other person feels that talking to you was worthwhile.\n\nPractically, this means: introduce yourself briefly, then ask a question. Listen to the answer genuinely. Let their response shape your next statement about yourself. The introduction becomes a conversation, and a conversation, unlike a performance, has a chance of becoming a relationship.",
      vocabulary: ["counterintuitive", "sequential", "transmission", "calculus", "genuinely"],
      writingTechniques: ["Compare and contrast (Person A vs B)", "Research citation", "Practical advice conclusion"]
    },
    {
      id: 4, title: "Introducing Yourself in a Second Language", type: "personal_narrative",
      wordCount: 280, level: "B1",
      essay: "There is a peculiar vulnerability in introducing yourself in a second language. You are not simply saying your name and your job — you are displaying, in real time, the limits of your fluency. Every hesitation, every mispronounced syllable, every grammatical wobble is visible to the listener.\n\nWhen I moved from Patna to Bengaluru at 22, my Hindi-accented English was a daily source of embarrassment. I would introduce myself and immediately see the slight recalibration in the listener's expression — the shift from 'professional' expectation to something more cautious. I began avoiding introductions altogether. I let others speak first. I sat at the edge of rooms.\n\nThe turning point came when I read about the concept of 'foreign language effect' in psychology — the finding that people who think and communicate in a second language are often more rational and less emotionally reactive, because the language creates a slight cognitive distance. This reframing was transformative. My imperfect English was not a deficiency — it was evidence of cognitive effort. I was doing something hard.\n\nI began introducing myself differently. Not apologetically, but directly: 'My first language is Hindi. My English is a work in progress — but so am I.'\n\nPeople responded warmly. Not because the English had improved, but because the attitude had. Owning your limitation disarms the people who might otherwise use it against you.\n\nIf you are learning English and dreading your first English introduction, consider this: every fluent English speaker you admire was, at some point, exactly where you are. The only difference is they kept speaking anyway.",
      vocabulary: ["vulnerability", "recalibration", "reframing", "deficiency", "cognitive"],
      lesson: "Confidence in imperfect English is more powerful than silence in perfect English."
    },
    {
      id: 5, title: "How Social Media Has Changed Self-Introduction", type: "analytical",
      wordCount: 340, level: "B2",
      essay: "Before 2004, self-introduction was primarily an oral act. You met someone, you said your name, you exchanged information face to face. The introduction was ephemeral — it lived in the memory of the two people present and nowhere else.\n\nSocial media has made introductions permanent, searchable, and asynchronous. Your LinkedIn profile is a self-introduction that never sleeps. Your Instagram bio is being read by strangers you will never meet. Your Twitter handle and pinned tweet introduce you to thousands without your direct participation.\n\nThis has created a new layer of identity management that previous generations never faced. We now maintain multiple simultaneous introductions — professional on LinkedIn, personal on Instagram, intellectual on Twitter, playful on WhatsApp groups. These personas are not necessarily inconsistent, but they are curated differently for different audiences.\n\nThe anthropologist Erving Goffman called this 'impression management' — the way we perform different versions of ourselves for different social contexts. What social media has done is multiply the contexts, accelerate the performance, and remove the natural boundaries between audiences. When your manager follows you on Instagram, the separation between your 'professional introduction' and your 'personal introduction' collapses.\n\nThe question this raises is not whether social media introductions are authentic or inauthentic — they are both, variably. The more important question is whether we understand what we are introducing and to whom. Many people craft brilliant professional profiles but forget that a badly timed or poorly considered tweet can introduce a very different version of themselves to the same audience.\n\nIn the digital age, your introduction is no longer a moment. It is a mosaic — assembled from posts, comments, likes, and absences — and it is being read, continuously, by people you have not yet met.",
      vocabulary: ["ephemeral", "asynchronous", "curated", "personas", "mosaic"],
      writingTechniques: ["Historical contrast (before/after)", "Academic citation (Goffman)", "Conceptual conclusion"]
    },
    {
      id: 6, title: "What I Would Say If I Had One Minute Left", type: "creative_reflective",
      wordCount: 260, level: "B2",
      essay: "There is a thought experiment I sometimes give myself when I feel my introductions becoming stale or rehearsed: if I had exactly one minute to tell a stranger who I truly am, and I knew it was the last conversation I would ever have — what would I say?\n\nI would not say my job title. I would not mention my university. I would not cite my LinkedIn achievements.\n\nI think I would say this:\n\nI was born afraid. Afraid of rejection, afraid of failure, afraid of being ordinary. For the first twenty-five years of my life, that fear made me cautious, careful, and very, very quiet.\n\nThen I failed, spectacularly and publicly, in ways I will not detail here. And something unexpected happened: the world continued. The sun rose. People mostly forgot. And I discovered that the fear was a story I had been telling myself — not a fact about the universe.\n\nSince then, I have been trying to live in the direction of what I actually want, rather than in the direction of what I think I should want. It is an ongoing process. I am better at it than I was, and worse at it than I want to be.\n\nI love three things without qualification: books, mountains, and people who ask genuine questions.\n\nI am trying to be the kind of person who makes others feel less alone.\n\nThat is who I am.\n\nThe rest — the job, the degree, the accomplishments — are things I have done. They are not who I am.\n\nThere is a difference. Most introductions never find it.",
      vocabulary: ["spectacular", "qualification", "ongoing", "accomplishments", "cautious"],
      lesson: "The most profound introductions distinguish between what you have done and who you are."
    }
  ]
};

write('essay.json', essayData);

/* ═══════════════════════════════════════════════
   6. DIALOGUES  (25 dialogues)
═══════════════════════════════════════════════ */
const dialogueData = {
  day: 2,
  topic: "Self Introduction – Dialogue Bank",
  description: "25 real-life dialogue scripts for introduction scenarios. Study natural English conversation patterns.",
  totalDialogues: 25,
  dialogues: [
    { id:1, situation:"First day at office", level:"A1", characters:["New employee","Colleague"],
      dialogue:[
        {speaker:"Colleague",line:"Good morning! Are you the new joiner?"},
        {speaker:"New Employee",line:"Yes! I'm Priya. I joined today in the HR department."},
        {speaker:"Colleague",line:"Welcome, Priya! I'm Raj. I work in finance. Anything you need, just ask."},
        {speaker:"New Employee",line:"Thank you so much, Raj. Could you show me where the washroom is?"},
        {speaker:"Colleague",line:"Of course! Follow me. Also, lunch is at 1 PM and the best canteen is on the 3rd floor."},
        {speaker:"New Employee",line:"That's so helpful. I was nervous about starting today."},
        {speaker:"Colleague",line:"Everyone is nervous on day one. You'll feel at home by Thursday!"}
      ],
      keyPhrases:["new joiner","just ask","feel at home"],
      grammarFocus:"Simple present + future (will)"
    },
    { id:2, situation:"Meeting at a wedding", level:"A1", characters:["Guest 1","Guest 2"],
      dialogue:[
        {speaker:"Guest1",line:"Hi! I don't think we've met. I'm Meera."},
        {speaker:"Guest2",line:"Oh hello! I'm Sanjay. Are you from the bride's side or groom's side?"},
        {speaker:"Guest1",line:"Bride's side! Ananya and I went to school together. You?"},
        {speaker:"Guest2",line:"Groom's side. I'm his cousin from Hyderabad."},
        {speaker:"Guest1",line:"Oh nice! Are you enjoying the celebrations?"},
        {speaker:"Guest2",line:"Very much! The food is incredible. Have you tried the biryani?"},
        {speaker:"Guest1",line:"Not yet! I'll go get some right now actually. Nice to meet you, Sanjay!"},
        {speaker:"Guest2",line:"You too, Meera. Enjoy!"}
      ],
      keyPhrases:["I don't think we've met","from the bride's/groom's side","nice to meet you"],
      grammarFocus:"Present perfect (have you tried)"
    },
    { id:3, situation:"LinkedIn connection message", level:"A2", characters:["Professional 1","Professional 2"],
      dialogue:[
        {speaker:"P1",line:"Hi Arun, I came across your profile while researching supply chain professionals in Bangalore. Your work on cold chain logistics is fascinating!"},
        {speaker:"P2",line:"Hi! Thanks for reaching out. Are you working in this space too?"},
        {speaker:"P1",line:"I'm transitioning into it, actually. I'm currently in FMCG distribution and want to learn more about the temperature-controlled segment."},
        {speaker:"P2",line:"That makes sense. It's a growing field. What specifically are you curious about?"},
        {speaker:"P1",line:"Mostly the tech side — how companies are using IoT and AI for real-time monitoring."},
        {speaker:"P2",line:"That's exactly what my current project covers! Happy to chat over a quick call. Let me know what works."}
      ],
      keyPhrases:["came across your profile","reaching out","transitioning into"],
      grammarFocus:"Present continuous (am transitioning), present simple (works)"
    },
    { id:4, situation:"International flight neighbor", level:"A2", characters:["Traveler A","Traveler B"],
      dialogue:[
        {speaker:"A",line:"Excuse me, is this aisle seat okay for me? I have a window seat."},
        {speaker:"B",line:"Sure, go ahead! I prefer the aisle anyway. Are you flying to Singapore?"},
        {speaker:"A",line:"Yes! For a work conference. First time in Singapore actually."},
        {speaker:"B",line:"Oh you'll love it! I'm based there. I'm Preethi, by the way."},
        {speaker:"A",line:"Kiran. Nice to meet you. What do you do there?"},
        {speaker:"B",line:"I work in asset management for a bank. And you?"},
        {speaker:"A",line:"I'm a product manager at a health tech startup. We're expanding into Southeast Asia."},
        {speaker:"B",line:"Excellent timing — healthcare SaaS is booming in the region right now. Here's my card; let's connect properly."}
      ],
      keyPhrases:["based there","asset management","expanding into"],
      grammarFocus:"Present continuous for ongoing plans"
    },
    { id:5, situation:"University campus — freshers week", level:"A1", characters:["Fresher A","Fresher B","Fresher C"],
      dialogue:[
        {speaker:"A",line:"Hi! Are you also in the Computer Science batch?"},
        {speaker:"B",line:"Yes! I'm Tanvi. From Mumbai."},
        {speaker:"A",line:"I'm Rohan, from Jaipur. This is my first time in Hyderabad."},
        {speaker:"C",line:"Hi both! I'm Siddharth. I'm literally from Hyderabad and still managed to get lost finding this hall."},
        {speaker:"A",line:"That's impressive. So you know good food places?"},
        {speaker:"C",line:"Brother, I was born for this question. Haleem, biryani, Irani chai — I will give you the full tour."},
        {speaker:"B",line:"Can I join this tour? I've only had airport food since yesterday."},
        {speaker:"C",line:"Obviously! Let's go right after this orientation."}
      ],
      keyPhrases:["first time in","born for this question","I will give you the tour"],
      grammarFocus:"Simple present and future tense"
    },
    { id:6, situation:"Doctor-patient first meeting", level:"A2", characters:["Doctor","Patient"],
      dialogue:[
        {speaker:"Doctor",line:"Good afternoon! I'm Dr. Kapoor. I'll be your cardiologist. Please sit."},
        {speaker:"Patient",line:"Thank you, Doctor. I'm Shankar Rao. I was referred by Dr. Mehta."},
        {speaker:"Doctor",line:"Yes, I've read your file. Before we begin, can you tell me a bit about your lifestyle — diet, exercise, stress levels?"},
        {speaker:"Patient",line:"I work long hours — 12 to 14 hours a day in a software firm. I eat mostly canteen food. Exercise is... not great."},
        {speaker:"Doctor",line:"How long has this been your routine?"},
        {speaker:"Patient",line:"About seven years. Since my promotion to team lead."},
        {speaker:"Doctor",line:"I see. Have you experienced any chest discomfort, breathlessness, or fatigue?"},
        {speaker:"Patient",line:"Yes, actually. Especially after climbing stairs."}
      ],
      keyPhrases:["referred by","lifestyle","chest discomfort"],
      grammarFocus:"Present perfect (have you experienced), past simple"
    },
    { id:7, situation:"Online class introduction", level:"A1", characters:["Teacher","Student 1","Student 2"],
      dialogue:[
        {speaker:"Teacher",line:"Good morning everyone! Let's start with quick introductions. Please say your name, city, and one fun fact. I'll go first — I'm Mrs. Sharma from Pune, and I can juggle three oranges!"},
        {speaker:"Student1",line:"That's amazing! I'm Preeti, from Lucknow. My fun fact is that I've never watched any Marvel movies."},
        {speaker:"Teacher",line:"Ha! That IS a fun fact. Preeti, you're going to have a lot of explaining to do. Next?"},
        {speaker:"Student2",line:"Hi! I'm Raghav from Chennai. My fun fact is that I speak four languages: Tamil, Telugu, Hindi, and English."},
        {speaker:"Teacher",line:"Four languages — wonderful! We have a polyglot in the class."},
        {speaker:"Student2",line:"What is a polyglot?"},
        {speaker:"Teacher",line:"Someone who speaks many languages! You, Raghav, are officially a polyglot."}
      ],
      keyPhrases:["fun fact","explaining to do","polyglot"],
      grammarFocus:"Simple present, vocabulary expansion through context"
    },
    { id:8, situation:"Job interview — tell me about yourself", level:"B1", characters:["Interviewer","Candidate"],
      dialogue:[
        {speaker:"Interviewer",line:"Welcome, Kavya! Please, take a seat. Can you start by telling me a little about yourself?"},
        {speaker:"Candidate",line:"Of course, thank you. My name is Kavya Reddy. I completed my B.Tech in Information Technology from NIT Warangal in 2020. After graduation, I joined TCS as a software developer, where I worked primarily on Java backend systems for banking clients."},
        {speaker:"Interviewer",line:"How long were you at TCS?"},
        {speaker:"Candidate",line:"Three years. In my third year, I led a team of six engineers on a critical migration project, which we delivered two weeks ahead of schedule."},
        {speaker:"Interviewer",line:"That's impressive. What made you decide to look for a new opportunity?"},
        {speaker:"Candidate",line:"I'm passionate about product development — building things that users interact with directly. TCS is excellent, but most of our work is outsourced and I don't get to see the end user impact. I want that connection."},
        {speaker:"Interviewer",line:"Interesting. And why our company specifically?"},
        {speaker:"Candidate",line:"Your app has 15 million users, and I use it myself every day. I know exactly what frustrates me about it — and I have ideas. I'd love to bring both my technical skills and my user perspective to your team."}
      ],
      keyPhrases:["work primarily on","led a team","passionate about","end user impact"],
      grammarFocus:"Past simple for experience, present simple for current state"
    },
    { id:9, situation:"Neighborhood meeting", level:"A2", characters:["Resident A","Resident B","Committee Member"],
      dialogue:[
        {speaker:"CommitteeM",line:"We have a new resident in D-204! Please introduce yourself."},
        {speaker:"NewResident",line:"Hello everyone! I'm Farhan Siddiqui. I moved in last week with my wife and our daughter, who's four years old. I work from home, so I'm around most of the time."},
        {speaker:"Resident A",line:"Welcome, Farhan! I'm Mrs. Pillai from D-108. If you need any help with the building rules, feel free to knock."},
        {speaker:"NewResident",line:"Thank you so much. One question — where's the nearest good school? Our daughter starts KG next year."},
        {speaker:"Resident B",line:"There are three within 2 kilometers. My son goes to Greenwood — highly recommend. I'm Suman, D-202, your direct neighbor!"},
        {speaker:"NewResident",line:"Oh perfect! We must be sharing a wall then. I hope my daughter's cartoons don't disturb you."},
        {speaker:"Resident B",line:"Not at all! My son watches enough cartoons for the whole building."}
      ],
      keyPhrases:["feel free to knock","highly recommend","sharing a wall"],
      grammarFocus:"Simple future (starts), conditional politeness"
    },
    { id:10, situation:"Hospital bedside — new patient", level:"A1", characters:["Nurse","Patient","Family member"],
      dialogue:[
        {speaker:"Nurse",line:"Good morning! I'm Geeta, your nurse for today's shift. How are you feeling?"},
        {speaker:"Patient",line:"A little better than yesterday. I'm Prakash Naidu."},
        {speaker:"Nurse",line:"Good to meet you, Mr. Naidu. This must be your family?"},
        {speaker:"Family",line:"Yes, I'm his wife, Lakshmi. We're worried about the test results."},
        {speaker:"Nurse",line:"The doctor will come by in about an hour to discuss them with you. Is there anything Mr. Naidu needs right now?"},
        {speaker:"Patient",line:"Some water would be nice. And maybe a blanket?"},
        {speaker:"Nurse",line:"Absolutely. I'll bring them right away. And please press this button if you need anything at all."}
      ],
      keyPhrases:["come by","discuss them with","right away"],
      grammarFocus:"Future (will), requests with 'would'"
    },
    { id:11, situation:"Conference networking break", level:"B1", characters:["Speaker","Attendee"],
      dialogue:[
        {speaker:"Attendee",line:"Excuse me — are you the one who gave the presentation on AI ethics this morning?"},
        {speaker:"Speaker",line:"That was me! I'm Dr. Anita Bose. Did you find it useful?"},
        {speaker:"Attendee",line:"Very much. I'm Rahul, I work in ML engineering at a startup. The part about bias in training data hit close to home — we're dealing with exactly that issue."},
        {speaker:"Speaker",line:"What kind of data are you working with?"},
        {speaker:"Attendee",line:"Healthcare data. Patient records. The demographic imbalances are... significant."},
        {speaker:"Speaker",line:"That's a critical problem space. Have you looked at differential privacy frameworks?"},
        {speaker:"Attendee",line:"We're exploring FATE — but honestly the implementation is complex for our team size."},
        {speaker:"Speaker",line:"I actually have a paper on lightweight implementations for small teams. Let me get your email and I'll send it over."}
      ],
      keyPhrases:["hit close to home","dealing with","looking into","send it over"],
      grammarFocus:"Present continuous for ongoing situations, present perfect for research"
    },
    { id:12, situation:"Sports club first day", level:"A1", characters:["Coach","New Player"],
      dialogue:[
        {speaker:"Coach",line:"Welcome! New face. Tell us about yourself."},
        {speaker:"NewPlayer",line:"Hi! I'm Suraj. I played cricket for my school team for three years. I'm a medium-pace bowler."},
        {speaker:"Coach",line:"Good. How long since you last bowled?"},
        {speaker:"NewPlayer",line:"About eight months. I took a break for exams."},
        {speaker:"Coach",line:"Fair enough. We practice Tuesday and Friday evenings, 6 to 8. Matches on Sundays."},
        {speaker:"NewPlayer",line:"Perfect. Is there anything specific you want me to focus on?"},
        {speaker:"Coach",line:"Let's see you bowl first and then we'll talk. Join the warm-up."}
      ],
      keyPhrases:["new face","medium-pace","take a break","warm-up"],
      grammarFocus:"Past simple for experience, imperative for instructions"
    },
    { id:13, situation:"Restaurant — meeting the chef", level:"A2", characters:["Diner","Chef"],
      dialogue:[
        {speaker:"Chef",line:"Good evening! I'm Chef Rajan. I heard it's your first time at our restaurant."},
        {speaker:"Diner",line:"Yes! I'm Priya. A colleague recommended you. I'm told the tasting menu is unmissable."},
        {speaker:"Chef",line:"It's my favorite menu to prepare. Any allergies or preferences I should know?"},
        {speaker:"Diner",line:"No allergies. But I'm vegetarian. Should I mention that to the waiter?"},
        {speaker:"Chef",line:"I'll personally adjust the tasting menu for you. Tell me — are you a curious eater? Willing to try unusual ingredients?"},
        {speaker:"Diner",line:"That's why I'm here! I once ate a dish made entirely of banana flowers in Kerala. Surprised me completely."},
        {speaker:"Chef",line:"Perfect. I have something that will surprise you even more. Leave it to me."}
      ],
      keyPhrases:["unmissable","adjust the menu","curious eater","leave it to me"],
      grammarFocus:"Simple future (I'll adjust), gerunds (willing to try)"
    },
    { id:14, situation:"Family reunion — meeting a cousin for the first time", level:"A1", characters:["Cousin 1","Cousin 2"],
      dialogue:[
        {speaker:"C1",line:"Wait — are you Aisha? Khalu's daughter from Lucknow?"},
        {speaker:"C2",line:"Yes! And you must be Zain? I've seen your photos but we've never actually met!"},
        {speaker:"C1",line:"Exactly! I feel like I know you but I don't know you. Weird, right?"},
        {speaker:"C2",line:"Very weird. So — what are you up to? You study somewhere?"},
        {speaker:"C1",line:"I finished engineering last year. Trying to get into civil services. You're in college?"},
        {speaker:"C2",line:"Second year, Architecture. In Hyderabad. I love it but the professors are terrifying."},
        {speaker:"C1",line:"Ha! Mine were too. You get used to it. How long are you here?"},
        {speaker:"C2",line:"Just the weekend. Mum insisted on coming for Chacha's anniversary."},
        {speaker:"C1",line:"Let's exchange numbers and actually talk before you leave."}
      ],
      keyPhrases:["you must be","get used to it","exchange numbers"],
      grammarFocus:"Present perfect (we've never met), simple present/past mix"
    },
    { id:15, situation:"Embassy visa interview", level:"B1", characters:["Visa Officer","Applicant"],
      dialogue:[
        {speaker:"Officer",line:"Good morning. Please sit. Can you state your full name and the purpose of your visit?"},
        {speaker:"Applicant",line:"Good morning. My name is Aravind Kumar Balachandran. I'm applying for a student visa. I've been accepted to the MSc in Computer Science program at the University of Manchester."},
        {speaker:"Officer",line:"Congratulations. Who is funding your studies?"},
        {speaker:"Applicant",line:"I have a partial scholarship from the university covering 40% of tuition, and my family will cover the remainder. I also have a letter from my father's bank confirming sufficient funds."},
        {speaker:"Officer",line:"What are your plans after completing the degree?"},
        {speaker:"Applicant",line:"I intend to return to India. I want to work in the AI research space — ideally at an Indian research institution. I have no plans to settle in the UK."},
        {speaker:"Officer",line:"What does your family do?"},
        {speaker:"Applicant",line:"My father owns a textile business in Coimbatore. My mother is a school principal. They're both supportive of my education."},
        {speaker:"Officer",line:"Very well. We'll process your application within 5 working days."}
      ],
      keyPhrases:["been accepted to","covering","the remainder","settle in"],
      grammarFocus:"Present perfect, intention (I intend to), formal register"
    },
    { id:16, situation:"Dating first meeting (coffee)", level:"A2", characters:["Person A","Person B"],
      dialogue:[
        {speaker:"A",line:"Hi! You must be Kavya. I recognized you from your photo — not that that's weird to say."},
        {speaker:"B",line:"Ha! Not weird at all. I was looking for you too. You're taller than I expected."},
        {speaker:"A",line:"Is that a good thing?"},
        {speaker:"B",line:"I'll let you know in an hour. So — what should I actually know about you that your profile didn't say?"},
        {speaker:"A",line:"I make really terrible jokes when I'm nervous."},
        {speaker:"B",line:"You're nervous?"},
        {speaker:"A",line:"Genuinely, yes. This is my first time doing this. Matching-app date. First coffee meeting."},
        {speaker:"B",line:"Mine too. Now I'm nervous. We're both nervous. This is going well."},
        {speaker:"A",line:"Perfectly on schedule. Shall we order?"}
      ],
      keyPhrases:["recognized you from","genuinely","on schedule","shall we"],
      grammarFocus:"Present simple for personality, informal first-meeting register"
    },
    { id:17, situation:"Parent meeting at school", level:"A2", characters:["Teacher","Parent"],
      dialogue:[
        {speaker:"Teacher",line:"Good evening, come in! I'm Mrs. Sharma, Arjun's class teacher."},
        {speaker:"Parent",line:"Good evening! I'm Vikas Malhotra — Arjun's father. My wife wanted to come but she had an emergency at work."},
        {speaker:"Teacher",line:"Not a problem at all. Shall we talk about Arjun's progress?"},
        {speaker:"Parent",line:"Please. He doesn't tell us much at home. I know his English isn't strong yet."},
        {speaker:"Teacher",line:"Actually, that's what surprised me most this term. Arjun's spoken English has improved significantly. He participated in the debate last week."},
        {speaker:"Parent",line:"Really? He didn't mention that."},
        {speaker:"Teacher",line:"He was shy to tell you, I think. He actually won second place."},
        {speaker:"Parent",line:"I had no idea. Thank you for telling me. I'll make sure to celebrate that at home."}
      ],
      keyPhrases:["had an emergency","improved significantly","participate in","celebrate that"],
      grammarFocus:"Past simple, adverbs (significantly)"
    },
    { id:18, situation:"Joining a WhatsApp group", level:"A1", characters:["Admin","New Member","Group Members"],
      dialogue:[
        {speaker:"Admin",line:"Welcome to Book Readers Bangalore! 📚 Please introduce yourself when you join!"},
        {speaker:"NewMember",line:"Hi everyone! I'm Nidhi, joining from Koramangala. I mostly read literary fiction and Indian writing in English. Excited to be here!"},
        {speaker:"Member1",line:"Welcome Nidhi! I'm Shilpa. Big fan of Amitav Ghosh. Have you read The Glass Palace?"},
        {speaker:"NewMember",line:"Yes! It's one of my favorites. Currently reading Perumal Murugan."},
        {speaker:"Member2",line:"Oh, One Part Woman? Amazing. I cried."},
        {speaker:"NewMember",line:"Same! Is this group active? I've been looking for a reading community for ages."},
        {speaker:"Admin",line:"Very active! Monthly meetings, usually first Saturday. Next one is in two weeks at Atta Galatta."}
      ],
      keyPhrases:["joining from","currently reading","for ages","monthly meetings"],
      grammarFocus:"Present continuous (currently reading), informal joining phrases"
    },
    { id:19, situation:"Starting a podcast guest intro", level:"B1", characters:["Host","Guest"],
      dialogue:[
        {speaker:"Host",line:"Welcome to The Career Switchers Podcast! Today's guest left a six-figure job at Goldman Sachs to become a yoga instructor. Please introduce yourself!"},
        {speaker:"Guest",line:"Thanks for having me, Rahul! I'm Meghna Khanna. I spent eight years in investment banking in London and Singapore, and two years ago I quit everything to do a 200-hour yoga teacher training in Rishikesh."},
        {speaker:"Host",line:"What was the moment you decided to switch?"},
        {speaker:"Guest",line:"It wasn't one moment. It was a slow realization over about three years that I was very good at something that wasn't making me well. I was earning well but I wasn't well."},
        {speaker:"Host",line:"That's a powerful distinction — earning well vs being well."},
        {speaker:"Guest",line:"Exactly. And I think a lot of people in high-pressure careers know what I mean but are afraid to say it out loud."},
        {speaker:"Host",line:"Now you teach yoga full-time?"},
        {speaker:"Guest",line:"Yes — I have a studio in Bandra and an online community of 12,000 students across 40 countries. Turns out 'burnout recovery yoga' is quite niche but very needed."}
      ],
      keyPhrases:["Thanks for having me","slow realization","powerful distinction","turns out"],
      grammarFocus:"Past simple for narrative, past continuous for gradual change"
    },
    { id:20, situation:"Customer support — first call", level:"A2", characters:["Agent","Customer"],
      dialogue:[
        {speaker:"Agent",line:"Thank you for calling TechAssist. My name is Poornima. How may I help you today?"},
        {speaker:"Customer",line:"Hi Poornima. I'm Arun. I'm having trouble setting up my new router."},
        {speaker:"Agent",line:"Happy to help with that, Arun! Before we begin, may I have your account number or the mobile number registered with us?"},
        {speaker:"Customer",line:"Sure, it's 98765-43210."},
        {speaker:"Agent",line:"Thank you. I see your account here. Now, Arun, can you tell me what happens when you try to connect the router?"},
        {speaker:"Customer",line:"The light is blinking red. The internet is not working at all."},
        {speaker:"Agent",line:"A blinking red light usually means the router isn't connecting to our servers. Let's try a quick reset together."},
        {speaker:"Customer",line:"Okay, you're guiding me through this, right? I'm not very technical."},
        {speaker:"Agent",line:"Absolutely — I'll be with you every step. First, find the reset button on the back of the router..."}
      ],
      keyPhrases:["How may I help you","registered with us","guiding me through","every step"],
      grammarFocus:"Formal phone register, future (I'll be)"
    },
    { id:21, situation:"Village panchayat meeting", level:"A1", characters:["Sarpanch","Visitor"],
      dialogue:[
        {speaker:"Sarpanch",line:"Please introduce yourself, brother. We haven't seen you before."},
        {speaker:"Visitor",line:"Namaste sir. My name is Sunder Lal. I am from Agra. I am a school teacher."},
        {speaker:"Sarpanch",line:"Welcome. What brings you to our village?"},
        {speaker:"Visitor",line:"I am doing research on how children in rural areas learn. I want to visit your school and talk to some teachers."},
        {speaker:"Sarpanch",line:"That is a good purpose. Our school has 180 children. The teachers work very hard."},
        {speaker:"Visitor",line:"I can see the school building from here. It looks clean and well-maintained."},
        {speaker:"Sarpanch",line:"We painted it last year. The community worked together. You are welcome to stay and study."}
      ],
      keyPhrases:["brings you to","doing research","well-maintained","you are welcome"],
      grammarFocus:"Simple present, purpose (I am doing... I want to...)"
    },
    { id:22, situation:"Art gallery opening — artist meets visitor", level:"B1", characters:["Artist","Visitor"],
      dialogue:[
        {speaker:"Visitor",line:"Excuse me — are you the artist? These paintings are extraordinary."},
        {speaker:"Artist",line:"I am! Thank you so much. I'm Nalini. Are you an art lover or did someone drag you here?"},
        {speaker:"Visitor",line:"Ha! A little of both, honestly. My partner is a big supporter of local art. I'm Vikrant — I know nothing about art but I know what I like, and I like these."},
        {speaker:"Artist",line:"That's the best way to experience art, actually. What draws you to this one specifically?"},
        {speaker:"Visitor",line:"The colors, I think. There's something almost... anxious about them. Like the painting is nervous about something."},
        {speaker:"Artist",line:"You've described it better than I have. I painted this after a very difficult year. I think you felt that."},
        {speaker:"Visitor",line:"Seriously? I'm not entirely sure how to respond to that."},
        {speaker:"Artist",line:"'I felt your difficult year' is honestly a compliment I'll carry for a while."}
      ],
      keyPhrases:["draw you to","describes it","carry for a while"],
      grammarFocus:"Past simple for creation story, present simple for reactions"
    },
    { id:23, situation:"Returning to hometown after years", level:"A2", characters:["Old friend","Returnee"],
      dialogue:[
        {speaker:"OldFriend",line:"Is that... Nikhil? NIKHIL MEHTA?"},
        {speaker:"Returnee",line:"Ravi! Oh my God, I was hoping I'd run into someone from school."},
        {speaker:"OldFriend",line:"It's been what — seven years? How do you look exactly the same?"},
        {speaker:"Returnee",line:"Terrible lifestyle and no sunlight. I've been in London."},
        {speaker:"OldFriend",line:"London! What are you doing there?"},
        {speaker:"Returnee",line:"I finished a PhD in urban planning. Just got back last month. I'm trying to figure out what's next — maybe something here actually."},
        {speaker:"OldFriend",line:"Here? In Indore?"},
        {speaker:"Returnee",line:"I know it sounds strange. But I've been reading about the urban growth here and I think there's interesting work to do. I'm tired of studying other cities when my own city is changing this fast."},
        {speaker:"OldFriend",line:"Well. Welcome back. Let me buy you chai and you can tell me everything."}
      ],
      keyPhrases:["run into","looks exactly the same","what's next","tired of"],
      grammarFocus:"Present perfect for recent past, present continuous for plans"
    },
    { id:24, situation:"International team introduction (video call)", level:"B1", characters:["Manager","India team member","UK team member","Singapore team member"],
      dialogue:[
        {speaker:"Manager",line:"Let's do quick intros for the new project team. Aditi, want to start?"},
        {speaker:"Aditi",line:"Sure! I'm Aditi from the Mumbai office. I'm leading the data engineering side. This is my third cross-border project and I'm genuinely excited about the Singapore market."},
        {speaker:"James",line:"James here, London. I'm on the analytics and insights team. Bit ironic that it's 5 AM for me but I'm very much awake and very much caffeinated."},
        {speaker:"Wei",line:"I'm Wei, Singapore office, business development. Aditi and I have actually collaborated before — on the APAC rollout last year."},
        {speaker:"Aditi",line:"Yes! Wei's team was brilliant on that. Looking forward to working together again."},
        {speaker:"Manager",line:"Perfect — sounds like we have some existing relationships to build on. James, any early questions?"},
        {speaker:"James",line:"Just one — what time zone are we using for our regular catch-ups? Because I've been burned before."}
      ],
      keyPhrases:["leading the","cross-border","caffeinated","build on","catch-ups","burned before"],
      grammarFocus:"Present continuous (I'm leading), present perfect (have collaborated)"
    },
    { id:25, situation:"Retirement party speech", level:"B1", characters:["Retiree","Colleague"],
      dialogue:[
        {speaker:"Colleague",line:"Radhika ma'am! You're the guest of honor tonight. Would you like to say a few words?"},
        {speaker:"Radhika",line:"I've been thinking about what I'd say for three weeks and I still don't know where to begin."},
        {speaker:"Colleague",line:"Begin with who you are, ma'am."},
        {speaker:"Radhika",line:"Funny you say that. When I joined this organization 28 years ago, someone asked me the same thing. I said: I'm Radhika Iyer, new recruit, Civil Engineering batch of 1996, and I don't know what I'm doing but I'm willing to learn."},
        {speaker:"Colleague",line:"That's exactly who you still are."},
        {speaker:"Radhika",line:"That's the kindest thing you could say. I hope so. I hope after 28 years of titles and responsibilities, the person underneath is still curious, still willing, still a learner."},
        {speaker:"Colleague",line:"She is. We can confirm."},
        {speaker:"Radhika",line:"Then I can retire happy."}
      ],
      keyPhrases:["guest of honor","new recruit","willing to learn","underneath"],
      grammarFocus:"Reported speech, present perfect for life narrative"
    }
  ]
};

write('dialogue.json', dialogueData);
console.log('Story + Essay + Dialogue done. Now generating Flashcards + Conversation + Mistakes + Tricks...');

/* ═══════════════════════════════════════════════
   7. FLASHCARDS  (500 cards)
═══════════════════════════════════════════════ */
function makeFlashcards() {
  const cards = [];
  let id = 1;

  // Category 1: Introduction Phrases (100 cards)
  const introPhrases = [
    ["My name is ___.", "मेरा नाम ___ है।"],
    ["I am from ___.", "मैं ___ से हूँ।"],
    ["I work as a ___.", "मैं ___ के रूप में काम करता/करती हूँ।"],
    ["I am ___ years old.", "मेरी उम्र ___ साल है।"],
    ["Nice to meet you.", "आपसे मिलकर अच्छा लगा।"],
    ["I live in ___.", "मैं ___ में रहता/रहती हूँ।"],
    ["I studied at ___.", "मैंने ___ में पढ़ाई की।"],
    ["My hobby is ___.", "मेरा शौक ___ है।"],
    ["I am passionate about ___.", "मुझे ___ का जुनून है।"],
    ["I have been working for ___ years.", "मैं ___ सालों से काम कर रहा/रही हूँ।"],
    ["I am originally from ___.", "मैं मूल रूप से ___ से हूँ।"],
    ["I specialize in ___.", "मैं ___ में विशेषज्ञ हूँ।"],
    ["I am currently studying ___.", "मैं अभी ___ पढ़ रहा/रही हूँ।"],
    ["Allow me to introduce myself.", "मुझे खुद का परिचय देने दीजिए।"],
    ["I would like to tell you a bit about myself.", "मैं आपको अपने बारे में थोड़ा बताना चाहता/चाहती हूँ।"],
    ["I am a first-year student.", "मैं पहले वर्ष का/की छात्र/छात्रा हूँ।"],
    ["I graduated from ___ in ___.", "मैंने ___ में ___ से स्नातक किया।"],
    ["I joined this company in ___.", "मैं ___ में इस कंपनी में शामिल हुआ/हुई।"],
    ["I lead a team of ___ people.", "मैं ___ लोगों की टीम का नेतृत्व करता/करती हूँ।"],
    ["I am responsible for ___.", "मैं ___ के लिए जिम्मेदार हूँ।"],
    ["I have experience in ___.", "मुझे ___ में अनुभव है।"],
    ["My goal is to ___.", "मेरा लक्ष्य ___ है।"],
    ["I look forward to working with you.", "मुझे आपके साथ काम करने का इंतजार है।"],
    ["It's a pleasure to meet you.", "आपसे मिलना सुखद है।"],
    ["I am happy to be here.", "मुझे यहाँ आकर खुशी हुई।"],
    ["Let me give you a brief introduction.", "मुझे एक संक्षिप्त परिचय देने दीजिए।"],
    ["I have a background in ___.", "मेरी पृष्ठभूमि ___ में है।"],
    ["I am new to this city.", "मैं इस शहर में नया/नई हूँ।"],
    ["I come from a family of ___.", "मैं एक ___ परिवार से आता/आती हूँ।"],
    ["In my free time, I enjoy ___.", "अपने खाली समय में, मुझे ___ करना पसंद है।"],
    ["I am the eldest / youngest in my family.", "मैं अपने परिवार में सबसे बड़ा/छोटा हूँ।"],
    ["I have one brother and one sister.", "मेरा एक भाई और एक बहन है।"],
    ["I am an only child.", "मैं एकलौता/एकलौती हूँ।"],
    ["My father/mother works as a ___.", "मेरे पिता/माँ ___ के रूप में काम करते/करती हैं।"],
    ["I dream of becoming a ___.", "मैं ___ बनने का सपना देखता/देखती हूँ।"],
    ["I am very motivated to ___.", "मैं ___ के लिए बहुत प्रेरित हूँ।"],
    ["I believe that ___.", "मुझे विश्वास है कि ___।"],
    ["I value ___.", "मैं ___ को महत्व देता/देती हूँ।"],
    ["I have always been interested in ___.", "मुझे हमेशा ___ में रुचि रही है।"],
    ["I'm currently based in ___.", "मैं अभी ___ में स्थित हूँ।"],
    ["I have recently moved to ___.", "मैं हाल ही में ___ आ गया/गई हूँ।"],
    ["I am a quick learner.", "मैं जल्दी सीखता/सीखती हूँ।"],
    ["I work well in a team.", "मैं टीम में अच्छा काम करता/करती हूँ।"],
    ["I am very organized and detail-oriented.", "मैं बहुत व्यवस्थित और विस्तार-उन्मुख हूँ।"],
    ["I am looking for new opportunities in ___.", "मैं ___ में नए अवसरों की तलाश कर रहा/रही हूँ।"],
    ["My strengths include ___.", "मेरी शक्तियों में ___ शामिल हैं।"],
    ["I have completed a course in ___.", "मैंने ___ में एक कोर्स पूरा किया है।"],
    ["I am certified in ___.", "मैं ___ में प्रमाणित हूँ।"],
    ["I can speak ___ languages.", "मैं ___ भाषाएँ बोल सकता/सकती हूँ।"],
    ["I am fluent in ___.", "मुझे ___ में पारंगत हूँ।"],
    ["I am currently working on ___.", "मैं अभी ___ पर काम कर रहा/रही हूँ।"],
    ["I manage a portfolio of ___.", "मैं ___ का पोर्टफोलियो संभालता/संभालती हूँ।"],
    ["I have handled projects worth ___.", "मैंने ___ मूल्य के प्रोजेक्ट संभाले हैं।"],
    ["My career started when ___.", "मेरा करियर तब शुरू हुआ जब ___।"],
    ["I am currently pursuing ___.", "मैं अभी ___ कर रहा/रही हूँ।"],
    ["I am a graduate student.", "मैं एक स्नातकोत्तर छात्र/छात्रा हूँ।"],
    ["I hold a degree in ___.", "मेरे पास ___ की डिग्री है।"],
    ["I am a self-taught ___.", "मैं एक स्व-सिखाया/सिखाई ___ हूँ।"],
    ["I have mentored ___ people.", "मैंने ___ लोगों को मार्गदर्शन दिया है।"],
    ["I am known for ___.", "मुझे ___ के लिए जाना जाता है।"],
    ["My colleagues describe me as ___.", "मेरे सहकर्मी मुझे ___ के रूप में वर्णित करते हैं।"],
    ["I am a problem-solver.", "मैं एक समस्या-समाधानकर्ता हूँ।"],
    ["I thrive under pressure.", "मैं दबाव में अच्छा प्रदर्शन करता/करती हूँ।"],
    ["I take ownership of my work.", "मैं अपने काम की जिम्मेदारी लेता/लेती हूँ।"],
    ["I am results-driven.", "मैं परिणाम-उन्मुख हूँ।"],
    ["I am comfortable with ambiguity.", "मैं अनिश्चितता के साथ सहज हूँ।"],
    ["I enjoy challenges.", "मुझे चुनौतियाँ पसंद हैं।"],
    ["I am always looking to improve.", "मैं हमेशा सुधार करने की कोशिश करता/करती हूँ।"],
    ["I have worked in ___ industries.", "मैंने ___ उद्योगों में काम किया है।"],
    ["I have lived in ___ different cities.", "मैं ___ अलग-अलग शहरों में रहा/रही हूँ।"],
    ["I volunteer at ___.", "मैं ___ में स्वयंसेवा करता/करती हूँ।"],
    ["I run a small business in ___.", "मैं ___ में एक छोटा व्यवसाय चलाता/चलाती हूँ।"],
    ["I am the founder of ___.", "मैं ___ का/की संस्थापक हूँ।"],
    ["I co-founded ___ with ___.", "मैंने ___ के साथ ___ की सह-स्थापना की।"],
    ["I am on the board of ___.", "मैं ___ के बोर्ड में हूँ।"],
    ["I advise ___ companies.", "मैं ___ कंपनियों को सलाह देता/देती हूँ।"],
    ["I contribute to open source projects.", "मैं ओपन सोर्स प्रोजेक्ट में योगदान देता/देती हूँ।"],
    ["I write about ___ in my blog.", "मैं अपने ब्लॉग में ___ के बारे में लिखता/लिखती हूँ।"],
    ["I have spoken at ___ conferences.", "मैंने ___ सम्मेलनों में बोला है।"],
    ["I have published ___ articles.", "मैंने ___ लेख प्रकाशित किए हैं।"],
    ["I am fluent in written and spoken English.", "मैं लिखित और मौखिक अंग्रेजी में पारंगत हूँ।"],
    ["I am bilingual.", "मैं द्विभाषी हूँ।"],
    ["I am open to relocation.", "मैं स्थानांतरण के लिए तैयार हूँ।"],
    ["I am available to start immediately.", "मैं तुरंत शुरू करने के लिए उपलब्ध हूँ।"],
    ["I would describe myself as ___.", "मैं खुद को ___ के रूप में वर्णित करूँगा/करूँगी।"],
    ["People who know me say I am ___.", "जो लोग मुझे जानते हैं वे कहते हैं कि मैं ___ हूँ।"],
    ["One thing you should know about me is ___.", "एक बात जो आपको मेरे बारे में जाननी चाहिए वह है ___।"],
    ["I consider myself a ___.", "मैं खुद को एक ___ मानता/मानती हूँ।"],
    ["My biggest achievement so far is ___.", "अब तक मेरी सबसे बड़ी उपलब्धि ___ है।"],
    ["I am proud of ___.", "मुझे ___ पर गर्व है।"],
    ["I am currently reading about ___.", "मैं अभी ___ के बारे में पढ़ रहा/रही हूँ।"],
    ["I love traveling and have visited ___ countries.", "मुझे यात्रा करना पसंद है और मैं ___ देशों में गया/गई हूँ।"],
    ["I am a morning person / night owl.", "मैं सुबह का व्यक्ति / रात का उल्लू हूँ।"],
    ["I enjoy cooking / reading / running.", "मुझे खाना बनाना / पढ़ना / दौड़ना पसंद है।"],
    ["I am actively learning ___.", "मैं सक्रिय रूप से ___ सीख रहा/रही हूँ।"],
    ["My long-term goal is to ___.", "मेरा दीर्घकालिक लक्ष्य ___ है।"],
    ["I hope to contribute to ___ in the future.", "मुझे उम्मीद है कि भविष्य में ___ में योगदान दूँगा/दूँगी।"],
    ["Thank you for the opportunity to introduce myself.", "खुद का परिचय देने के अवसर के लिए धन्यवाद।"],
  ];

  introPhrases.forEach(([english, hindi]) => {
    cards.push({ id: id++, category: "introduction_phrases", front: english, back: hindi, level: "A1" });
  });

  // Category 2: Vocabulary for Introductions (100 cards)
  const vocab = [
    ["introduce","परिचय देना","verb","to present yourself or someone else to others"],
    ["greet","अभिवादन करना","verb","to say hello or welcome"],
    ["background","पृष्ठभूमि","noun","your education, work, and life experience"],
    ["profession","पेशा","noun","your job or career"],
    ["occupation","व्यवसाय","noun","the work you do to earn a living"],
    ["qualification","योग्यता","noun","a degree or certificate showing your skills"],
    ["experience","अनुभव","noun","knowledge gained from doing things"],
    ["achievement","उपलब्धि","noun","something you have successfully done"],
    ["aspiration","आकांक्षा","noun","a strong desire or ambition"],
    ["passion","जुनून","noun","a very strong interest or enthusiasm"],
    ["expertise","विशेषज्ञता","noun","deep knowledge or skill in a specific area"],
    ["specialize","विशेषज्ञता प्राप्त करना","verb","to focus on a particular subject or area"],
    ["fluent","धाराप्रवाह","adjective","able to speak a language smoothly and easily"],
    ["bilingual","द्विभाषी","adjective","able to speak two languages well"],
    ["multilingual","बहुभाषी","adjective","able to speak many languages"],
    ["confident","आत्मविश्वासी","adjective","feeling certain about your abilities"],
    ["articulate","स्पष्टवक्ता","adjective","able to express ideas clearly"],
    ["professional","पेशेवर","adjective/noun","relating to work; a person with a career"],
    ["resume","रिज्यूमे","noun","a document listing your qualifications and experience"],
    ["curriculum vitae (CV)","संक्षेप जीवनवृत्त","noun","detailed record of education and experience"],
    ["portfolio","पोर्टफोलियो","noun","collection of your work or investments"],
    ["milestone","मील का पत्थर","noun","an important point or achievement"],
    ["network","नेटवर्क","noun/verb","connections; to build professional relationships"],
    ["collaborate","सहयोग करना","verb","to work together with others"],
    ["mentor","गुरु/सलाहकार","noun/verb","an experienced person who guides others"],
    ["intern","इंटर्न","noun","a trainee working temporarily at a company"],
    ["freelance","स्वतंत्र","adjective","working independently, not for one employer"],
    ["entrepreneur","उद्यमी","noun","a person who starts their own business"],
    ["startup","स्टार्टअप","noun","a new company, especially in technology"],
    ["corporation","निगम","noun","a large company"],
    ["organization","संगठन","noun","a group of people working together for a purpose"],
    ["institution","संस्था","noun","an established organization, like a university"],
    ["graduate","स्नातक","noun/verb","a person who has completed a degree; to complete a degree"],
    ["postgraduate","स्नातकोत्तर","adjective","education after a first degree"],
    ["undergraduate","स्नातक (पहले वर्ष का)","adjective","studying for a first degree"],
    ["degree","डिग्री","noun","an academic qualification from a university"],
    ["diploma","डिप्लोमा","noun","a certificate for a specific study program"],
    ["certification","प्रमाणन","noun","an official qualification in a specific skill"],
    ["scholarship","छात्रवृत्ति","noun","financial support given to a student"],
    ["internship","इंटर्नशिप","noun","temporary work experience at a company"],
    ["promotion","पदोन्नति","noun","moving to a higher position at work"],
    ["department","विभाग","noun","a section of a company or organization"],
    ["colleague","सहकर्मी","noun","a person you work with"],
    ["supervisor","पर्यवेक्षक","noun","a person who manages others at work"],
    ["manager","प्रबंधक","noun","a person in charge of a team or department"],
    ["director","निदेशक","noun","a senior leader in an organization"],
    ["founder","संस्थापक","noun","a person who starts an organization"],
    ["co-founder","सह-संस्थापक","noun","a person who starts a company with others"],
    ["client","ग्राहक","noun","a person or company that receives professional services"],
    ["stakeholder","हितधारक","noun","a person with interest in a project or company"],
    ["project","परियोजना","noun","a planned piece of work with a specific goal"],
    ["deadline","समय-सीमा","noun","the date by which something must be completed"],
    ["target","लक्ष्य","noun","a goal or objective to achieve"],
    ["objective","उद्देश्य","noun","a specific thing you want to achieve"],
    ["skill","कौशल","noun","an ability you have developed through practice"],
    ["strength","शक्ति","noun","a positive quality or ability"],
    ["weakness","कमजोरी","noun","an area where you need improvement"],
    ["initiative","पहल","noun","the ability to start things without being told"],
    ["leadership","नेतृत्व","noun","the ability to guide and inspire others"],
    ["teamwork","टीम वर्क","noun","working effectively with others"],
    ["communication","संचार","noun","the act of sharing information"],
    ["presentation","प्रस्तुति","noun","a talk given to a group; the act of showing something"],
    ["workshop","कार्यशाला","noun","a training session or practical meeting"],
    ["seminar","संगोष्ठी","noun","a class or meeting for discussing a topic"],
    ["conference","सम्मेलन","noun","a large formal meeting of professionals"],
    ["interview","साक्षात्कार","noun","a meeting where someone answers questions"],
    ["recommendation","सिफारिश","noun","a positive statement about someone's abilities"],
    ["reference","संदर्भ","noun","a person who can speak about your qualities"],
    ["resignation","इस्तीफा","noun","formally leaving a job"],
    ["retirement","सेवानिवृत्ति","noun","stopping work permanently, usually at old age"],
    ["contract","अनुबंध","noun","a legal agreement between parties"],
    ["salary","वेतन","noun","regular payment for work"],
    ["benefits","लाभ","noun","extras provided by employers beyond salary"],
    ["appraisal","मूल्यांकन","noun","an evaluation of your work performance"],
    ["feedback","प्रतिक्रिया","noun","comments about your performance"],
    ["accomplishment","सफलता","noun","something you have done successfully"],
    ["contribution","योगदान","noun","something you provide that helps others"],
    ["innovation","नवाचार","noun","a new idea or way of doing something"],
    ["strategy","रणनीति","noun","a plan designed to achieve a goal"],
    ["solution","समाधान","noun","an answer to a problem"],
    ["challenge","चुनौती","noun","a difficult task or situation"],
    ["opportunity","अवसर","noun","a favorable situation or chance"],
    ["industry","उद्योग","noun","a group of companies in the same field"],
    ["sector","क्षेत्र","noun","a part of an economy or society"],
    ["market","बाजार","noun","the area of trade for a product or service"],
    ["revenue","राजस्व","noun","income generated by a business"],
    ["investment","निवेश","noun","money put into something to make profit"],
    ["growth","वृद्धि","noun","an increase in size, number, or importance"],
    ["impact","प्रभाव","noun","the effect something has on something else"],
    ["mission","मिशन","noun","the purpose or goal of an organization"],
    ["vision","दृष्टि","noun","a long-term goal or aspiration"],
    ["values","मूल्य","noun (plural)","the principles that guide someone's decisions"],
    ["ethics","नैतिकता","noun","moral principles about right and wrong"],
    ["integrity","सत्यनिष्ठा","noun","being honest and having strong moral principles"],
    ["resilience","लचीलापन","noun","the ability to recover from difficulties"],
    ["adaptability","अनुकूलनशीलता","noun","ability to change and adjust to new situations"],
    ["curiosity","जिज्ञासा","noun","a strong desire to know or learn"],
    ["perseverance","दृढ़ता","noun","continuing despite difficulties"],
    ["determination","दृढ़ संकल्प","noun","firm decision to do something"],
    ["ambition","महत्वाकांक्षा","noun","a strong desire to succeed"],
  ];

  vocab.forEach(([english, hindi, pos, definition]) => {
    cards.push({
      id: id++, category: "vocabulary", front: english,
      back: hindi, partOfSpeech: pos, definition, level: "A2"
    });
  });

  // Category 3: Grammar Patterns (100 cards)
  const grammarCards = [
    { front:"I am + [noun/adjective]", back:"State of being: 'I am a teacher.' / 'I am happy.'", hindiExample:"मैं एक शिक्षक हूँ।", rule:"'am' is used ONLY with 'I'" },
    { front:"I have + [noun]", back:"Possession: 'I have a sister.' / 'I have three years of experience.'", hindiExample:"मेरे पास तीन साल का अनुभव है।", rule:"'have' shows possession or experience" },
    { front:"I work in / at / as", back:"'In' for field, 'at' for company, 'as' for role: 'I work in IT at TCS as a developer.'", hindiExample:"मैं TCS में IT क्षेत्र में डेवलपर के रूप में काम करता हूँ।", rule:"Prepositions show different relationships to work" },
    { front:"I was born in / grew up in", back:"Origin: 'I was born in Delhi but grew up in Mumbai.'", hindiExample:"मैं दिल्ली में पैदा हुआ लेकिन मुंबई में पला-बढ़ा।", rule:"Past simple for fixed facts about the past" },
    { front:"I have been working for ___ years", back:"Duration to present: shows ongoing action from past to now", hindiExample:"मैं 5 साल से काम कर रहा हूँ।", rule:"Present perfect continuous = for + period of time" },
    { front:"I studied / I have studied", back:"Past simple: finished education. Present perfect: relevant now.", hindiExample:"'I studied at DU (2018-2021)' vs 'I have studied three languages.'", rule:"Past simple for specific time; present perfect for relevance now" },
    { front:"I would like to + [verb]", back:"Polite wish: 'I would like to introduce myself.'", hindiExample:"मैं खुद का परिचय देना चाहूँगा।", rule:"More formal/polite than 'I want to'" },
    { front:"I am looking for ___", back:"Active search: 'I am looking for new opportunities.'", hindiExample:"मैं नए अवसरों की तलाश कर रहा हूँ।", rule:"Present continuous for actions happening now or ongoing" },
    { front:"I used to ___", back:"Past habit/state: 'I used to live in Lucknow.'", hindiExample:"मैं लखनऊ में रहता था।", rule:"'used to' for something that was true but is no longer true" },
    { front:"I am currently ___-ing", back:"Present ongoing: 'I am currently pursuing my MBA.'", hindiExample:"मैं अभी MBA कर रहा हूँ।", rule:"Present continuous for current/temporary activities" },
    { front:"I intend to / I plan to", back:"Future intention: 'I plan to start my own company.'", hindiExample:"मैं अपनी कंपनी शुरू करने की योजना बना रहा हूँ।", rule:"Both show intention; 'intend' is more formal" },
    { front:"I hope to ___", back:"Future aspiration: 'I hope to become a data scientist.'", hindiExample:"मुझे उम्मीद है कि मैं डेटा साइंटिस्ट बनूँगा।", rule:"'hope to' is softer than 'plan to'" },
    { front:"My name is / I'm ___", back:"'My name is' is formal; 'I'm' is casual", hindiExample:"'My name is Priya' (interview) vs 'I'm Priya' (party)", rule:"Register matters — match formality to context" },
    { front:"I come from / I am from", back:"Both are correct for origin, but 'come from' adds motion", hindiExample:"'I am from Jaipur' or 'I come from Jaipur'", rule:"'I am from' is more common in formal introductions" },
    { front:"I enjoy / I love / I like + verb-ing", back:"Gerunds after enjoy/love/like: 'I enjoy cooking.'", hindiExample:"मुझे खाना बनाना पसंद है।", rule:"ALWAYS use -ing after enjoy, love, like, hate" },
    { front:"Nice / Good / Great + to meet you", back:"Greeting responses: 'Nice to meet you.' 'Great to meet you.'", hindiExample:"आपसे मिलकर अच्छा लगा।", rule:"All correct; 'great' is more enthusiastic" },
    { front:"I have achieved / accomplished ___", back:"Talking about achievements: use present perfect", hindiExample:"मैंने तीन पुरस्कार जीते हैं।", rule:"Present perfect for past actions relevant to present" },
    { front:"As a ___, I ___", back:"Role → responsibility: 'As a manager, I oversee the team.'", hindiExample:"एक प्रबंधक के रूप में, मैं टीम की निगरानी करता हूँ।", rule:"'As a' introduces your role, then describe what you do" },
    { front:"I was promoted to ___ in ___", back:"Career progression: 'I was promoted to Senior Manager in 2022.'", hindiExample:"मुझे 2022 में सीनियर मैनेजर बनाया गया।", rule:"Passive voice (was promoted) for promotions" },
    { front:"I am responsible for ___", back:"Job duties: 'I am responsible for product development.'", hindiExample:"मैं उत्पाद विकास के लिए जिम्मेदार हूँ।", rule:"'Responsible for' + noun/verb-ing" },
    { front:"I led / managed a team of ___", back:"Leadership: 'I led a team of 12 engineers.'", hindiExample:"मैंने 12 इंजीनियरों की टीम का नेतृत्व किया।", rule:"Use 'led' or 'managed' to show leadership experience" },
    { front:"I delivered / achieved a ___ improvement", back:"Results: 'I delivered a 40% improvement in efficiency.'", hindiExample:"मैंने दक्षता में 40% सुधार किया।", rule:"Quantify achievements with numbers and percentages" },
    { front:"I specialize in / am specialized in", back:"'I specialize in' is active/preferred; 'specialized' is less common", hindiExample:"मैं डेटा एनालिसिस में विशेषज्ञ हूँ।", rule:"'Specialize in' is the standard professional phrase" },
    { front:"It's a pleasure to meet you / Nice meeting you", back:"'Nice to meet you' = first meeting. 'Nice meeting you' = leaving after meeting", hindiExample:"पहली बार: Nice to meet you. जाते समय: Nice meeting you.", rule:"Tense changes based on timing (before vs. after the meeting)" },
    { front:"I am keen on / interested in ___", back:"'Keen on' = British; 'interested in' = universal: 'I am interested in AI.'", hindiExample:"मुझे AI में रुचि है।", rule:"Both followed by noun or verb-ing" },
    { front:"My previous role / current role", back:"Time markers for career: 'In my current role...' / 'In my previous role...'", hindiExample:"मेरी वर्तमान भूमिका में... / मेरी पिछली भूमिका में...", rule:"Use these to structure career story chronologically" },
    { front:"I hold a degree / qualification in ___", back:"Education: 'I hold a degree in Computer Science.'", hindiExample:"मेरे पास कंप्यूटर साइंस की डिग्री है।", rule:"'Hold' is formal; 'have' is also acceptable" },
    { front:"I have been with ___ for ___ years", back:"Tenure: 'I have been with Infosys for 6 years.'", hindiExample:"मैं 6 साल से Infosys में हूँ।", rule:"Present perfect for ongoing tenure at a company" },
    { front:"Prior to / Before joining ___", back:"Career timeline: 'Prior to TCS, I worked at Wipro.'", hindiExample:"TCS से पहले, मैं Wipro में काम करता था।", rule:"'Prior to' is formal; 'before' is neutral" },
    { front:"My area of expertise is ___", back:"Formal expertise statement: 'My area of expertise is machine learning.'", hindiExample:"मेरी विशेषज्ञता का क्षेत्र मशीन लर्निंग है।", rule:"Used in formal/academic/conference introductions" },
    { front:"I am passionate about ___", back:"Deep interest: 'I am passionate about sustainable design.'", hindiExample:"मुझे सस्टेनेबल डिजाइन का जुनून है।", rule:"'Passionate about' shows strong emotional connection to a topic" },
    { front:"I thrive in ___ environments", back:"Work style: 'I thrive in fast-paced, collaborative environments.'", hindiExample:"मैं तेज-रफ्तार, सहयोगी वातावरण में अच्छा करता हूँ।", rule:"'Thrive in' shows what conditions help you perform best" },
    { front:"I am known for ___", back:"Reputation: 'I am known for my attention to detail.'", hindiExample:"मुझे विस्तार पर ध्यान देने के लिए जाना जाता है।", rule:"Passive voice for reputation/how others see you" },
    { front:"My work involves / focuses on ___", back:"Job description: 'My work involves data analysis and reporting.'", hindiExample:"मेरे काम में डेटा एनालिसिस और रिपोर्टिंग शामिल है।", rule:"'Involves' shows what tasks are part of your role" },
    { front:"I transitioned from ___ to ___", back:"Career change: 'I transitioned from engineering to product management.'", hindiExample:"मैं इंजीनियरिंग से प्रोडक्ट मैनेजमेंट में आया।", rule:"'Transitioned' is the standard verb for career changes" },
    { front:"I have a strong background in ___", back:"Experience statement: 'I have a strong background in finance.'", hindiExample:"मेरी वित्त में मजबूत पृष्ठभूमि है।", rule:"'Strong background' emphasizes depth of experience" },
    { front:"I am results-oriented / detail-oriented", back:"Hyphenated adjectives for personality: common in professional introductions", hindiExample:"मैं परिणाम-उन्मुख / विस्तार-उन्मुख हूँ।", rule:"These compound adjectives are very common on resumes and in interviews" },
    { front:"I am open to ___", back:"Flexibility: 'I am open to new challenges / relocation.'", hindiExample:"मैं नई चुनौतियों / स्थानांतरण के लिए तैयार हूँ।", rule:"'Open to' shows willingness without commitment" },
    { front:"I look forward to ___-ing", back:"Future anticipation: 'I look forward to working with you.'", hindiExample:"मुझे आपके साथ काम करने का इंतजार है।", rule:"'Look forward to' is ALWAYS followed by -ing (not infinitive)" },
    { front:"I am eager to ___", back:"Enthusiasm: 'I am eager to contribute to this team.'", hindiExample:"मैं इस टीम में योगदान देने के लिए उत्सुक हूँ।", rule:"'Eager to' shows strong enthusiasm; followed by infinitive" },
    { front:"I believe in ___", back:"Values: 'I believe in continuous learning.'", hindiExample:"मुझे निरंतर सीखने में विश्वास है।", rule:"'Believe in' + noun/verb-ing for values and principles" },
    { front:"I have a track record of ___", back:"Proven results: 'I have a track record of delivering projects on time.'", hindiExample:"मेरा समय पर प्रोजेक्ट डिलीवर करने का ट्रैक रिकॉर्ड है।", rule:"'Track record of' = proven history of doing something" },
    { front:"I bring to the table ___", back:"Value proposition: 'I bring to the table 10 years of marketing experience.'", hindiExample:"मैं 10 साल का मार्केटिंग अनुभव साथ लाता हूँ।", rule:"Idiomatic: means 'I offer/contribute'"},
    { front:"I am committed to ___", back:"Dedication: 'I am committed to excellence in everything I do.'", hindiExample:"मैं हर काम में उत्कृष्टता के लिए प्रतिबद्ध हूँ।", rule:"'Committed to' + noun/verb-ing shows dedication" },
    { front:"I take pride in ___", back:"Pride: 'I take pride in delivering quality work.'", hindiExample:"मुझे गुणवत्तापूर्ण काम देने पर गर्व है।", rule:"'Take pride in' + noun/verb-ing" },
    { front:"I attribute my success to ___", back:"Gratitude/credit: 'I attribute my success to my mentors.'", hindiExample:"मैं अपनी सफलता का श्रेय अपने गुरुओं को देता हूँ।", rule:"'Attribute to' means 'credit/give reason for'" },
    { front:"Allow me to / Let me + [verb]", back:"Formal invitation: 'Allow me to introduce myself.' / 'Let me explain.'", hindiExample:"मुझे खुद का परिचय करने दीजिए।", rule:"'Allow me to' is more formal; 'Let me' is neutral" },
    { front:"I'd like to take this opportunity to ___", back:"Formal transition: 'I'd like to take this opportunity to introduce myself.'", hindiExample:"मैं इस अवसर का उपयोग करके खुद का परिचय देना चाहूँगा।", rule:"Set phrase for formal speeches and introductions" },
    { front:"I consider myself ___", back:"Self-assessment: 'I consider myself a creative problem-solver.'", hindiExample:"मैं खुद को एक रचनात्मक समस्या-समाधानकर्ता मानता हूँ।", rule:"'Consider myself' is for self-reflection; more humble than 'I am'" },
    { front:"My colleagues would say I am ___", back:"Third-person view of self: 'My colleagues would say I am reliable.'", hindiExample:"मेरे सहकर्मी कहेंगे कि मैं भरोसेमंद हूँ।", rule:"'Would say' softens self-praise by attributing it to others" },
    { front:"In my [X] years of experience, ___", back:"Experience opener: 'In my 8 years of experience, I have seen the industry evolve.'", hindiExample:"मेरे 8 साल के अनुभव में, मैंने उद्योग को बदलते देखा है।", rule:"Good for opening a professional introduction" },
    { front:"What sets me apart is ___", back:"Differentiation: 'What sets me apart is my combination of technical and creative skills.'", hindiExample:"मुझे अलग बनाता है मेरे तकनीकी और रचनात्मक कौशल का संयोजन।", rule:"Used to highlight your unique value proposition" },
    { front:"I graduated with a degree / with distinction", back:"Academic achievement: 'I graduated with first class distinction.'", hindiExample:"मैंने प्रथम श्रेणी से स्नातक किया।", rule:"'With distinction' means excellent results" },
    { front:"I have had the opportunity to ___", back:"Formal expression of experience: 'I have had the opportunity to work internationally.'", hindiExample:"मुझे अंतरराष्ट्रीय स्तर पर काम करने का अवसर मिला है।", rule:"Formal and humble; shows gratitude for experience" },
    { front:"I pride myself on ___", back:"Self-description of quality: 'I pride myself on my attention to detail.'", hindiExample:"मुझे अपनी विस्तार पर ध्यान देने की क्षमता पर गर्व है।", rule:"'Pride myself on' = I'm proud of this quality in myself" },
    { front:"I find myself drawn to ___", back:"Attraction/interest: 'I find myself drawn to complex, unsolved problems.'", hindiExample:"मैं खुद को जटिल, अनसुलझी समस्याओं की ओर आकर्षित पाता हूँ।", rule:"'Find myself drawn to' is literary and authentic" },
    { front:"I have navigated ___", back:"Overcoming challenges: 'I have navigated major industry disruptions.'", hindiExample:"मैंने बड़े उद्योग परिवर्तनों को नेविगेट किया है।", rule:"'Navigate' implies skill in handling complex situations" },
    { front:"I am deeply committed to ___", back:"Strong dedication: 'I am deeply committed to social justice.'", hindiExample:"मैं सामाजिक न्याय के प्रति गहराई से प्रतिबद्ध हूँ।", rule:"'Deeply' intensifies 'committed'" },
    { front:"The work I do involves ___", back:"Job description opener: more engaging than 'My job is'", hindiExample:"मेरे काम में ___ शामिल है।", rule:"Starting with 'The work I do' is more engaging" },
    { front:"I started my career as / in ___", back:"Career beginning: 'I started my career as a journalist.'", hindiExample:"मैंने अपना करियर एक पत्रकार के रूप में शुरू किया।", rule:"Good for career story opening" },
    { front:"Over the past ___ years, I have ___", back:"Experience summary: 'Over the past 5 years, I have built...'", hindiExample:"पिछले 5 वर्षों में, मैंने ___ बनाया है।", rule:"Good transition phrase for career summaries" },
    { front:"My journey in ___ began when ___", back:"Story-opening: 'My journey in data began when I saw my first analytics dashboard.'", hindiExample:"डेटा में मेरी यात्रा तब शुरू हुई जब...", rule:"'Journey' humanizes professional experience" },
    { front:"I am grateful for the opportunity to ___", back:"Gratitude opening: 'I am grateful for the opportunity to be here.'", hindiExample:"यहाँ होने के अवसर के लिए मैं कृतज्ञ हूँ।", rule:"Formal and humble opening for speeches/panels" },
    { front:"I have been fortunate to ___", back:"Humble achievement: 'I have been fortunate to work with world-class teams.'", hindiExample:"मैं भाग्यशाली रहा हूँ कि विश्व स्तरीय टीमों के साथ काम किया।", rule:"'Fortunate' adds humility while sharing achievements" },
    { front:"I am driven by ___", back:"Motivation: 'I am driven by the desire to create meaningful impact.'", hindiExample:"मैं अर्थपूर्ण प्रभाव बनाने की इच्छा से प्रेरित हूँ।", rule:"'Driven by' shows core motivation" },
    { front:"What excites me most about ___ is ___", back:"Enthusiasm: 'What excites me most about this role is the challenge it presents.'", hindiExample:"इस भूमिका में मुझे सबसे ज्यादा उत्साहित करती है...", rule:"Great for interview answers" },
    { front:"I am at a stage in my career where ___", back:"Career stage: 'I am at a stage where I want to lead, not just contribute.'", hindiExample:"मैं अपने करियर में उस स्तर पर हूँ जहाँ...", rule:"Shows self-awareness and career planning" },
    { front:"My long-term vision is to ___", back:"Vision: 'My long-term vision is to build sustainable solutions in healthcare.'", hindiExample:"मेरा दीर्घकालिक दृष्टिकोण है...", rule:"Shows ambition and direction" },
    { front:"I am particularly interested in ___", back:"Specific interest: 'I am particularly interested in the intersection of AI and education.'", hindiExample:"मुझे विशेष रूप से ___ में रुचि है।", rule:"'Particularly' emphasizes this is a specific, focused interest" },
    { front:"I have had the privilege of ___", back:"Gratitude+achievement: 'I have had the privilege of leading 3 international projects.'", hindiExample:"मुझे 3 अंतरराष्ट्रीय प्रोजेक्ट का नेतृत्व करने का सौभाग्य मिला है।", rule:"'Privilege' is humbler than 'I have led'" },
    { front:"The aspect I am most proud of is ___", back:"Achievement highlight: focused on one best thing", hindiExample:"जिस पहलू पर मुझे सबसे ज्यादा गर्व है वह है...", rule:"Better than listing many achievements — shows priority" },
    { front:"I have consistently ___", back:"Track record: 'I have consistently exceeded my targets.'", hindiExample:"मैंने लगातार अपने लक्ष्यों को पार किया है।", rule:"'Consistently' shows this is a pattern, not one-time" },
    { front:"I approach ___ by ___-ing", back:"Method: 'I approach problems by breaking them into smaller components.'", hindiExample:"मैं समस्याओं को छोटे-छोटे हिस्सों में बाँटकर सुलझाता हूँ।", rule:"Shows your method/approach to work" },
    { front:"I have a track record of delivering ___", back:"Proven results: shows you don't just try — you deliver", hindiExample:"मेरा ___ डिलीवर करने का ट्रैक रिकॉर्ड है।", rule:"'Track record' is the gold standard phrase for proven performance" },
    { front:"I am eager to learn and contribute", back:"Common interview phrase showing growth mindset", hindiExample:"मैं सीखने और योगदान देने के लिए उत्सुक हूँ।", rule:"Good for fresh graduates or career changers" },
    { front:"I prefer working ___ (independently/in a team)", back:"Work style: shows self-awareness about how you work best", hindiExample:"मैं स्वतंत्र रूप से / टीम में काम करना पसंद करता हूँ।", rule:"Follow up with an example to make it credible" },
    { front:"I have a natural ability to ___", back:"Innate skill: 'I have a natural ability to connect with people.'", hindiExample:"मुझे ___ की प्राकृतिक क्षमता है।", rule:"'Natural ability' suggests something you do effortlessly" },
    { front:"I am deeply curious about ___", back:"Intellectual interest: 'I am deeply curious about how systems fail.'", hindiExample:"मुझे ___ के बारे में गहरी जिज्ञासा है।", rule:"'Deeply curious' shows intellectual passion, not just interest" },
    { front:"I am committed to continuous learning", back:"Growth mindset phrase — very valued in modern workplaces", hindiExample:"मैं निरंतर सीखने के लिए प्रतिबद्ध हूँ।", rule:"Followed by a specific example: 'Currently reading...'" },
    { front:"I would describe my style as ___", back:"Self-description: 'I would describe my style as collaborative and direct.'", hindiExample:"मैं अपनी शैली को सहयोगी और सीधी के रूप में वर्णित करूँगा।", rule:"'Would describe' is softer than a direct claim about yourself" },
    { front:"I am not just a ___; I also ___", back:"Multidimensional: 'I am not just a developer; I also design.'", hindiExample:"मैं केवल डेवलपर नहीं हूँ; मैं डिजाइन भी करता हूँ।", rule:"Shows you have capabilities beyond your job title" },
    { front:"I bring a unique perspective on ___", back:"Value: 'I bring a unique perspective on consumer behavior.'", hindiExample:"मैं उपभोक्ता व्यवहार पर एक अनूठा दृष्टिकोण लाता हूँ।", rule:"'Unique perspective' often comes from unconventional background" },
    { front:"I operate at the intersection of ___", back:"Interdisciplinary: 'I operate at the intersection of technology and design.'", hindiExample:"मैं तकनीक और डिजाइन के चौराहे पर काम करता हूँ।", rule:"Shows cross-disciplinary expertise" },
    { front:"I have a deep understanding of ___", back:"Expertise: 'I have a deep understanding of rural consumer behavior.'", hindiExample:"मुझे ___ की गहरी समझ है।", rule:"'Deep understanding' claims expertise without being arrogant" },
    { front:"I am always looking for ways to ___", back:"Proactivity: 'I am always looking for ways to improve our processes.'", hindiExample:"मैं हमेशा ___ के तरीके ढूँढता रहता हूँ।", rule:"Shows initiative and proactive mindset" },
    { front:"I define success as ___", back:"Values statement: 'I define success as creating value for others, not just myself.'", hindiExample:"मैं सफलता को ___ के रूप में परिभाषित करता हूँ।", rule:"Reveals values and character; great for interviews" },
  ];

  grammarCards.forEach(card => {
    cards.push({ id: id++, category: "grammar_patterns", front: card.front, back: card.back, hindiExample: card.hindiExample || "", rule: card.rule || "", level: "A2-B1" });
  });

  // Category 4: Common Mistakes Flashcards (100 cards)
  const mistakeCards = [
    ["I am belonging to India.","I belong to India.","'Belong' is a stative verb — no continuous form"],
    ["My name is Priya Sharma. I am from Delhi, India. I am working in Google.","I am from Delhi, India. I work at Google.","'Work at' (specific company), not 'in'; use simple present for permanent facts"],
    ["I am having 5 years of experience.","I have 5 years of experience.","'Have' for possession — no continuous with stative verbs"],
    ["I am from Delhi. I born in Delhi.","I am from Delhi. I was born in Delhi.","'Born' requires 'was/were' — always passive past simple"],
    ["I have passed my engineering from IIT.","I graduated from IIT with a degree in engineering.","'Passed from' is Indian English; say 'graduated from'"],
    ["I am doing job in Microsoft.","I work at Microsoft.","'Doing job' is not standard; use 'work at'"],
    ["I have a hobby of reading books.","My hobby is reading. / I enjoy reading.","'Hobby of' is incorrect; use 'hobby is + -ing'"],
    ["I am well-versed with computers.","I am proficient in computers. / I have strong computer skills.","'Well-versed with' should be 'well-versed in'; 'proficient in' is more professional"],
    ["I am pursuing my MBA from IIM-A.","I am doing my MBA at IIM-A.","'Pursuing from' → 'doing/studying at'"],
    ["My self is Rahul.","My name is Rahul. / I am Rahul.","'My self' is wrong; 'myself' is a reflexive pronoun, not used for introduction"],
    ["I am a commerce student.","I study commerce. / I am a commerce student. (correct!)","'Commerce student' IS correct — but often people use wrong field names"],
    ["I have done graduation in 2020.","I graduated in 2020. / I completed my graduation in 2020.","'Done graduation' → 'graduated' or 'completed my degree'"],
    ["Since last 5 years, I am working here.","I have been working here for 5 years.","'Since' needs a point in time; 'for' needs a duration"],
    ["I am come from Mumbai.","I come from Mumbai. / I am from Mumbai.","No 'am' with 'come'; use one or the other"],
    ["I am very much interested in your company.","I am very interested in your company.","'Very much interested' is redundant; just 'very interested'"],
    ["My experience was 6 years.","I have 6 years of experience.","Use present tense for current facts"],
    ["I am working since 2018.","I have been working since 2018.","'Since' requires present perfect, not simple present continuous"],
    ["I did my MBA from abroad.","I did my MBA abroad. / I completed my MBA at [University], UK.","'From abroad' should be 'abroad'; or name the specific institution"],
    ["I am a hardworking and dedicated person.","I am dedicated and detail-oriented. (specific) OR 'My colleagues would describe me as hardworking.'","Avoid generic self-praise; show, don't tell"],
    ["I want to learn and grow in your organization.","I am eager to contribute and develop within your organization.","Replace vague 'learn and grow' with 'contribute and develop'"],
    ["My strengths are hardworking and sincere.","My strengths include persistence and attention to detail.","Adjectives are not nouns; say 'include persistence' not 'are hardworking'"],
    ["I am having good communication skills.","I have strong communication skills.","Stative verb 'have' cannot be in continuous form"],
    ["I want a job in your esteemed organization.","I would like to explore opportunities at your organization.","'Esteemed' sounds sycophantic; just name the organization"],
    ["I am basically a software engineer.","I am a software engineer.","'Basically' weakens your introduction — remove filler words"],
    ["I am knowing many programming languages.","I know many programming languages.","'Know' is stative — no continuous form"],
    ["I am having two years of experience in IT sector.","I have two years of experience in the IT sector.","'Having' → 'have'; add 'the' before 'IT sector'"],
    ["I have done many projects.","I have completed several projects, including [name one].","Vague; quantify and name specific projects"],
    ["I am good in English.","I am good at English. / I am proficient in English.","'Good at' (skills); 'proficient in' (languages and specific skills)"],
    ["I have interest in this field.","I am interested in this field. / I have a keen interest in this field.","'Have interest' → 'am interested' or 'have a keen interest'"],
    ["I am a very simple person.","I am straightforward and approachable.","'Simple person' sounds like you're downplaying yourself; use specific adjectives"],
    ["My age is 25 years.","I am 25 years old.","Don't translate Hindi structure; use 'I am ___ years old'"],
    ["I have studied in English medium.","I was educated in English. / My education was in English.","'English medium' is Indian English; say 'educated in English'"],
    ["I am flexible with time.","I am available to work flexible hours.","'Flexible with time' is vague; state specifically"],
    ["I like to do coding.","I enjoy coding. / I love to code.","'Like to do coding' → 'enjoy coding' or 'love to code'"],
    ["I am trying to improve my English.","I am actively working on improving my English fluency.","More specific and proactive phrasing"],
    ["I have given many presentations.","I have presented to senior management on multiple occasions. / I present regularly.","Name the audience and frequency for credibility"],
    ["I want to learn new things everyday.","I am committed to continuous learning.","'New things everyday' is vague; professional phrase is 'continuous learning'"],
    ["My hobby is to travel.","I love traveling. / Traveling is my passion.","After 'hobby is', use verb-ing, not infinitive"],
    ["I am working in IT for 5 years.","I have been working in IT for 5 years.","Present continuous → Present perfect continuous for duration"],
    ["I have done MBA from IIM.","I hold an MBA from IIM. / I completed my MBA at IIM.","'Done MBA' → 'hold/completed an MBA'"],
    ["Myself Priya.","I am Priya. / My name is Priya.","'Myself Priya' is a direct translation from Hindi — not standard English"],
    ["I have expertise on data science.","I have expertise in data science.","'Expertise on' → 'expertise in'"],
    ["I am seeking a challenging job.","I am seeking challenging opportunities in [field].","Add the specific field; 'challenging job' alone is too vague"],
    ["I have 4 years experience.","I have 4 years of experience. / I have 4 years' experience.","Add 'of' or apostrophe after the number"],
    ["I am native of Bangalore.","I am a native of Bangalore. / I am originally from Bangalore.","Add article 'a' before 'native'"],
    ["I did engineering from Pune University.","I studied engineering at Pune University.","'Did from' → 'studied at'"],
    ["I am a people person.","I am someone who thrives in collaborative environments.","'People person' is a cliché; give a specific example or rephrase"],
    ["I want to join your company for growth.","I am looking for an environment where I can develop my skills and contribute meaningfully.","Specific and professional instead of just 'for growth'"],
    ["I love to face challenges.","I thrive on challenges. / I welcome challenging assignments.","'Love to face' → 'thrive on' or 'welcome'"],
    ["I am having MBA degree.","I hold an MBA. / I have an MBA.","'Having' → 'hold' or 'have'; don't need 'degree' after MBA"],
    ["I worked in MNC for 3 years.","I worked at a multinational company for 3 years. / I have 3 years of experience in multinational environments.","'MNC' may be understood in India but not internationally; expand or rephrase"],
    ["I am expertise in Java.","I am an expert in Java. / I have expertise in Java.","'Am expertise' is wrong; 'am an expert' or 'have expertise'"],
    ["I have passed out from IIT in 2019.","I graduated from IIT in 2019.","'Passed out' is informal/slang in India — use 'graduated'"],
    ["I will contribute my best efforts.","I am committed to delivering my best. / I will bring my full effort to every assignment.","Stronger, more specific phrasing"],
    ["My name is ___ and I am a self-motivated individual.","I am motivated by [specific thing: creating impact / solving complex problems].","'Self-motivated' is one of the most overused resume words; be specific instead"],
  ];

  mistakeCards.forEach(([wrong, correct, explanation]) => {
    cards.push({ id: id++, category: "common_mistakes", front: `❌ ${wrong}`, back: `✅ ${correct}`, explanation, level: "A2-B1" });
  });

  // Category 5: Cultural & Contextual Flashcards (100 cards)
  const culturalCards = [
    { front: "How formal should an introduction be at a startup?", back: "Very casual. First name, role, maybe one fun fact. No titles, no full name unless cultural context requires it.", tip: "Match energy of the room" },
    { front: "How formal should an introduction be at a bank interview?", back: "Very formal. Full name, degrees, years of experience, relevant achievement. Suit, firm handshake, direct eye contact.", tip: "Formality signals respect" },
    { front: "Should I mention my family in a professional introduction?", back: "Internationally, usually no. In Indian contexts, sometimes yes — especially if family background is relevant. Read the room.", tip: "Culture-dependent" },
    { front: "How long should an elevator pitch be?", back: "30–60 seconds maximum. Name, what you do, one problem you solve, optional hook.", tip: "3 sentences max" },
    { front: "What is a 'hook' in an introduction?", back: "An unusual fact, question, or statement that makes people want to know more. 'I left a job at Google to become a farmer. Let me tell you why.'", tip: "Counterintuitive or surprising" },
    { front: "What body language signals confidence during an introduction?", back: "Standing tall, making eye contact, speaking at a steady pace, not crossing arms, firm (not crushing) handshake.", tip: "Non-verbal matters as much as words" },
    { front: "What is a 'cold introduction' vs 'warm introduction'?", back: "Cold: you're meeting someone with no prior connection. Warm: someone introduced you to them. Warm is easier — reference the introducer.", tip: "Warm introductions are 5x more effective" },
    { front: "What should you NEVER say when introducing yourself professionally?", back: "Don't badmouth previous employers, avoid excessive modesty, don't lie about qualifications, don't be too personal too fast.", tip: "Stay positive, focused, professional" },
    { front: "What is the 'STAR' format for introductions?", back: "Situation, Task, Action, Result. Good for answering 'Tell me about yourself' with a story.", tip: "Gives your intro narrative structure" },
    { front: "What does 'reading the room' mean in introductions?", back: "Adjusting your introduction based on who is listening. A room of engineers gets technical detail; a general audience gets a simple analogy.", tip: "Flexibility is a sign of EQ" },
    { front: "When should you NOT use your first name only?", back: "When your surname helps establish credibility, cultural context, or when the setting is very formal (court, government, international).", tip: "Full name for authority situations" },
    { front: "What is the difference between 'I am' and 'I work as'?", back: "'I am a doctor' = identity. 'I work as a doctor' = profession (subtly less permanent). Both are correct, but 'I am' is more confident.", tip: "Use 'I am' for identity-tied roles" },
    { front: "How do you introduce yourself after a career gap?", back: "Be direct and brief: 'I took time off for [honest reason]. During that time, I [what you did]. I'm now ready to return to [field].'", tip: "Don't hide it; own it" },
    { front: "How do you introduce yourself as a fresher with no experience?", back: "Lead with education, then a project, then your skills and enthusiasm. 'I am a recent graduate... My thesis/project was on... I bring...'", tip: "Replace experience with projects and potential" },
    { front: "What is the 'Present-Past-Future' structure for introductions?", back: "Start with what you do NOW, go to PAST (how you got here), then FUTURE (where you're going). Works great for interviews.", tip: "This structure is taught at Harvard Business School" },
    { front: "How do Japanese professionals typically introduce themselves?", back: "Last name first, bow depth matches seniority, business card given with both hands. Very formal.", tip: "Never write on a Japanese business card" },
    { front: "How do Americans typically introduce themselves in business?", back: "First name immediately, firm handshake, eye contact, often casual even with seniors.", tip: "Americans are comfortable with informality earlier" },
    { front: "How do Indians typically introduce themselves internationally?", back: "Often start with educational background (IIT, IIM), which signals credibility in technical contexts. Can come across as over-formal to Westerners.", tip: "In international contexts, lead with what you do, not where you studied" },
    { front: "What is 'verbal resume' vs 'authentic introduction'?", back: "Verbal resume = list of facts. Authentic introduction = story + facts + personality. Authentic is more memorable.", tip: "Facts tell, stories sell" },
    { front: "What is a 'value proposition' in a self-introduction?", back: "The specific value you offer to OTHERS. 'I help teams launch faster by removing process bottlenecks.' Not about what you are — about what you give.", tip: "Flip from 'about me' to 'what I offer'" },
    { front: "How do you introduce yourself to a very senior person?", back: "Brief, clear, and relevant to THEM. Don't waste their time. 'I'm Priya — I work on your India team's data problem. I have one insight you'll want to hear.'", tip: "Senior people value clarity and relevance above all" },
    { front: "What is 'over-introducing' and why is it bad?", back: "Giving too much information too soon — 15 minutes of background when 2 are needed. Makes you seem insecure or unaware of social cues.", tip: "Match the length of your intro to the context" },
    { front: "What is the difference between a formal and informal greeting?", back: "Formal: Good morning/afternoon, How do you do? Informal: Hi! / Hey! / What's up?", tip: "First, assess the formality level of the situation" },
    { front: "How do you recover from a bad first introduction?", back: "Acknowledge it briefly and move on: 'Let me try that again — I was nervous.' People appreciate authenticity more than perfection.", tip: "Recovery is more impressive than a flawless delivery" },
    { front: "What is the 'name-face-association' trick for remembering names?", back: "When introduced, create a visual image linking their face to a feature of their name. 'Vikram — think VICTORY + RAM (lord) = powerful face'", tip: "Works better than repetition alone" },
    { front: "How do you introduce yourself in an email to a stranger?", back: "Subject line: who you are + why you're emailing. Body: one sentence on who you are, why you're relevant to THEM, specific ask.", tip: "The subject line IS your introduction" },
    { front: "What is a 'soft introduction' vs 'hard introduction'?", back: "Soft: 'Hi, I'm Raj, I might be able to help with that problem you mentioned.' Hard: 'Hi, I'm Raj, VP Sales. We need to talk.' Hard is assertive; soft is approachable.", tip: "Use 'soft' in social, 'hard' in high-stakes contexts" },
    { front: "Why should you research someone before meeting them?", back: "So you can reference shared connections, acknowledge their work, or ask a relevant question — showing you prepared and making the introduction memorable.", tip: "LinkedIn research before any important meeting" },
    { front: "How do you introduce yourself after someone says your name wrong?", back: "Gently correct: 'It's actually pronounced [correct way] — but I answer to both! 😊' Keep it light.", tip: "Never let the wrong pronunciation become permanent" },
    { front: "What is 'social currency' in introductions?", back: "Information you share that makes others want to talk to you: an interesting project, a shared connection, an unusual fact about yourself.", tip: "Give others something to respond to" },
    { front: "How important is tone vs content in introductions?", back: "Research suggests tone, body language, and energy account for 55-93% of impression. Content is important but delivery matters more.", tip: "Practice speaking, not just writing" },
    { front: "How do introverts introduce themselves effectively?", back: "Prepare a short, rehearsed opener. Ask questions quickly — it takes pressure off talking and shows interest. Write an excellent email intro instead.", tip: "Introverts often excel in written introductions" },
    { front: "What is 'mirroring' and how does it help introductions?", back: "Matching the other person's energy, vocabulary, and pace to build rapport. If they're formal, be formal. If casual, relax.", tip: "Mirroring builds subconscious trust" },
    { front: "When is silence appropriate in an introduction context?", back: "After stating something interesting — pause to let it land. After asking a question — don't fill the silence. Comfortable silence signals confidence.", tip: "Confident speakers are comfortable with pauses" },
    { front: "What does a 'genuine' introduction feel like to the listener?", back: "It feels personal (not rehearsed), relevant (not generic), and interested in THEM (not just about you). It's warm, direct, and human.", tip: "Test: would a robot sound the same? If yes, add humanity" },
    { front: "How do you end an introduction gracefully?", back: "Close the loop: return to something they said, express forward intention ('I'd love to connect further'), or give them an action ('Here's my card').", tip: "Good endings make people remember good beginnings" },
    { front: "What is the 'FBI technique' for remembering names?", back: "Face-Background-Introduction: look at their face, associate their background, mentally repeat their name during the introduction.", tip: "3-step active listening trick" },
    { front: "How do you introduce yourself when you change careers?", back: "Lead with transferable skills: 'I spent 8 years in law, which gave me exceptional analytical thinking — now I apply that to product strategy.'", tip: "Reframe past experience as relevant, not irrelevant" },
    { front: "What should you ALWAYS know before a professional introduction?", back: "Who you're meeting, their role, why you're meeting them, what you want from the interaction, and what you can offer them.", tip: "5 things: who, role, why, want, offer" },
    { front: "What is a 'humble brag' and should you use it?", back: "Presenting an achievement as a complaint or accident: 'I get too many job offers lately...' Use sparingly — it irritates people if overdone.", tip: "Once = charming. Often = annoying" },
    { front: "What is the 30-second rule in networking?", back: "In your first 30 seconds, the listener decides if they want to keep talking to you. Lead with value, not background facts.", tip: "Lead with what you solve, not what you are" },
    { front: "How do you introduce yourself when you don't have a traditional job title?", back: "Describe what you DO and for WHOM: 'I help small businesses build their first website.' Outcome-focused introductions work without titles.", tip: "Impact > Title" },
    { front: "What is the difference between humility and self-deprecation in introductions?", back: "Humility: acknowledging others' contributions to your success. Self-deprecation: downplaying yourself unnecessarily. First builds trust; second loses credibility.", tip: "Be humble about your journey; confident about your value" },
    { front: "How do you introduce yourself to an audience?", back: "Name + why you're there + credibility + what they'll get. 'I'm Ananya. I'm here to share how we reduced costs by 30%. You'll leave with 3 tools you can use tomorrow.'", tip: "WIFM: What's In It For Me (them)" },
    { front: "What is 'contextual relevance' in introductions?", back: "Only mentioning background that is RELEVANT to the current context. A cardiac surgeon doesn't mention their cricket coaching at a medical conference.", tip: "Filter by relevance, not by what you're proud of" },
    { front: "What language signals insecurity in introductions?", back: "Excessive qualifiers ('I think', 'maybe', 'sort of'), upspeak (rising intonation at end of statements), and apologetic openers ('Sorry to bother you').", tip: "Remove qualifiers from your introduction" },
    { front: "How do you introduce yourself on video call vs in person?", back: "Video: speak more slowly, gesture less, make eye contact with the camera (not screen), state your name clearly (audio can distort). In person: energy and presence matter more.", tip: "Video: camera = eye contact. In person: whole body" },
    { front: "What role does humor play in introductions?", back: "Light humor makes you memorable and likable — but it's risky in formal settings. Safe zones: gentle self-deprecation, observational humor about the shared context.", tip: "Never joke about others in an introduction" },
    { front: "What is 'social proof' in an introduction?", back: "Mentioning credibility signals: 'As featured in Forbes...', 'Having worked with companies like Google...', 'My students include...' Builds trust quickly.", tip: "Name-dropping is acceptable IF relevant" },
    { front: "How long should a 'Tell me about yourself' answer be in an interview?", back: "2 minutes maximum. Past in 30 seconds, present in 45 seconds, future/motivation in 30 seconds, why you're here in 15 seconds.", tip: "Practice until it flows naturally in under 2 minutes" },
    { front: "What is the 'iceberg' principle in self-introduction?", back: "Show only the tip (what's relevant now), but know the full iceberg (all your experience). Adjust what you reveal based on the context.", tip: "You don't have to say everything. Choose strategically." },
    { front: "How do you introduce yourself when you're nervous?", back: "Slow down (anxiety speeds speech), take one breath before starting, have one 'anchor phrase' memorized, focus on the listener not yourself.", tip: "Preparation is the best anxiety cure" },
    { front: "What is a 'power pose' and does it help introductions?", back: "Standing in a posture that takes up space (like a superhero). Research is mixed, but it can increase confidence BEFORE a high-stakes introduction.", tip: "Try it for 2 minutes before an important meeting" },
    { front: "How do you introduce yourself if you have the same name as someone famous?", back: "Acknowledge it with a smile: 'Yes, like the [cricket player / actor / singer] — but I promise I'm more interesting in real life.'", tip: "Turn the confusion into a charming moment" },
    { front: "What should you do immediately AFTER introducing yourself?", back: "Ask them a question about themselves. It shows genuine interest, creates dialogue, and takes pressure off you to keep performing.", tip: "The best follow-up to your intro is a question" },
    { front: "What is the 'curious stranger' technique?", back: "Introduce yourself briefly, then imagine the other person is the most interesting person in the world — ask questions accordingly. Your curiosity becomes your best introduction.", tip: "Interested people are interesting people" },
    { front: "What are the 3 C's of a powerful introduction?", back: "Clear (easily understood), Concise (no wasted words), Compelling (gives a reason to keep listening).", tip: "Test each C separately" },
    { front: "What is the difference between 'I am' and 'I consider myself'?", back: "'I am' = direct claim. 'I consider myself' = reflective, slightly humble. Use 'I am' for facts; 'I consider myself' for subjective qualities.", tip: "'I am detail-oriented' is stronger than 'I consider myself detail-oriented'" },
    { front: "How do you introduce yourself on a first date?", back: "Be warm, specific, and curious. Share one surprising fact. Ask more than you tell. Show personality, not resume. Laugh easily.", tip: "Dating introductions: let your personality lead" },
    { front: "What is the 'third wave' introduction?", back: "Name + role (wave 1), specific context (wave 2), forward invitation (wave 3): 'I'm Priya, I'm in data science. I'm working on a problem you mentioned. Can we talk tomorrow?'", tip: "3 waves build toward a next step" },
    { front: "Why is follow-up after an introduction important?", back: "Most introductions are forgotten within 24 hours. A follow-up email, LinkedIn connection, or message keeps you memorable and signals seriousness.", tip: "Send follow-up within 24 hours" },
    { front: "What is a 'warm handoff' introduction?", back: "When you introduce two people: 'Ravi, meet Priya — she does exactly what you need for your startup.' You give context so they don't have to cold-start.", tip: "Be specific about WHY they should talk" },
    { front: "How do you introduce yourself when you're overqualified?", back: "Lead with what excites you about this specific role, not your full resume. 'I want to build something from scratch. My 20 years of experience is exactly why I can do it.'", tip: "Reframe overqualification as readiness" },
    { front: "What is the 'rule of three' in introductions?", back: "Humans remember three things best. Introduce: your name, your most important fact, and your forward intention. Anything more risks being forgotten.", tip: "Three is the magic number" },
    { front: "How do you introduce yourself to a very large audience (500+ people)?", back: "Project physically: speak louder, pause longer, use fewer words. Give one powerful fact. End with a question or challenge to the audience.", tip: "Larger audience = simpler message" },
    { front: "What is the 'stranger test' for introductions?", back: "Imagine a stranger reading/hearing your introduction. Would they: 1) Know who you are? 2) Want to talk to you? 3) Remember you the next day? If not, revise.", tip: "Pass all three to know your intro is ready" },
    { front: "What are 'bridge phrases' in introductions?", back: "Transitions that connect parts: 'Building on that experience...', 'Which led me to...', 'This is what brought me to...'", tip: "Bridge phrases make your story flow" },
    { front: "Why do authentic introductions outperform polished ones?", back: "Because listeners' mirror neurons respond to genuine emotion. When you actually care about what you're saying, others feel it. Polished but empty introductions are forgettable.", tip: "Authenticity over performance" },
    { front: "What is 'strategic vulnerability' in introductions?", back: "Sharing a genuine challenge or mistake that you've overcome. It builds trust and relatability without undermining credibility.", tip: "'I failed once, and here's what it taught me' is powerful" },
    { front: "How does language choice reveal personality in introductions?", back: "Word choice reveals your values. 'I optimize systems' sounds analytical. 'I help people work better' sounds empathetic. Same role, different personality signals.", tip: "Your words are a personality test" },
    { front: "What is the difference between 'I do X' and 'I help X achieve Y'?", back: "'I do marketing' = function. 'I help brands connect emotionally with customers' = impact. Always state the IMPACT you create.", tip: "Impact-first framing is more compelling" },
    { front: "What does 'being present' mean during an introduction?", back: "Not thinking about what to say next, not checking your phone, not scanning the room. Full attention on the other person RIGHT NOW.", tip: "Presence is the rarest and most valued gift" },
    { front: "How do you make someone feel seen during an introduction?", back: "Listen to what they say, reference it in your response, make them feel their words mattered. 'You mentioned X — that's interesting because...'", tip: "Reference what they said to show you listened" },
    { front: "What is a 'transitional introduction' for career changers?", back: "A narrative that bridges your past and future: 'My 10 years in law built skills I now apply to conflict resolution coaching — which is actually what lawyers do best.'", tip: "Show continuity, not contradiction" },
    { front: "How does confidence without arrogance look in an introduction?", back: "Confident: 'I have a track record of doing exactly this.' Arrogant: 'I'm the best at this.' Confident makes claims; arrogant dismisses others.", tip: "Confident people don't need to put others down" },
    { front: "What is the 'because I' technique for introductions?", back: "Adding 'because I...' to your credential: 'I build mobile apps — because I believe everyone deserves access to powerful technology.' Adds purpose to your role.", tip: "WHY you do it matters more than WHAT you do" },
    { front: "How should you adjust your introduction for someone from a different culture?", back: "Research their business culture norms, match their formality level, avoid idioms they might not understand, be patient with language differences, and use universally understandable language.", tip: "Universal > clever when crossing cultures" },
    { front: "What is the one question that should guide every introduction?", back: "'What does this person need to know about me that will make this interaction valuable for both of us?' Answer that question, and your introduction will always be relevant.", tip: "Start from their perspective, not yours" },
  ];

  culturalCards.forEach(card => {
    cards.push({ id: id++, category: "cultural_contextual", front: card.front, back: card.back, tip: card.tip || "", level: "B1-B2" });
  });

  return { day: 2, topic: "Self Introduction – Flashcard Bank", totalCards: cards.length, categories: ["introduction_phrases","vocabulary","grammar_patterns","common_mistakes","cultural_contextual"], flashcards: cards };
}

write('flashcards.json', makeFlashcards());
console.log('Flashcards done!');

/* ═══════════════════════════════════════════════
   8. CONVERSATION PRACTICE  (30 scenarios)
═══════════════════════════════════════════════ */
const conversationPractice = {
  day: 2, topic: "Self Introduction – Conversation Practice",
  description: "30 real-life scenarios with model responses. Practice until introduction feels natural.",
  totalScenarios: 30,
  scenarios: [
    { id:1, situation:"Job Interview", prompt:"Tell me about yourself.", level:"B1",
      modelResponse:"Certainly. My name is Arjun Sharma. I completed my B.Tech in Computer Science from VIT Vellore in 2020, graduating with distinction. After that, I joined HCL Technologies as a software developer, where I specialized in building RESTful APIs for their banking clients. Over three years, I was promoted to Senior Developer and led a migration project that improved system uptime from 92% to 99.5%. I'm now looking for an opportunity in a product-focused company where I can see the direct impact of my work on end users. I've been following your company's growth closely and believe my skills in backend development and team leadership would be a strong fit.",
      tip:"Follow Present → Past → Future → Why Here structure.", keyPhrases:["graduating with distinction","specialized in","was promoted","strong fit"] },
    { id:2, situation:"University Orientation", prompt:"Introduce yourself to the class in 60 seconds.", level:"A2",
      modelResponse:"Hi everyone! I'm Sneha Patel, and I'm from Ahmedabad, Gujarat — so yes, I'm very much missing the food already. I've completed my 12th in Science and I'm joining the Computer Engineering program. I don't know a lot yet, but I'm very curious — I taught myself Python last summer by building a small game, which was more fun than I expected. Outside academics, I'm a badminton player — played at state level in 10th grade. I'm genuinely excited to be here and I can't wait to see what this batch does together.",
      tip:"In class introductions, show personality — not just facts.", keyPhrases:["genuinely excited","can't wait to see","taught myself"] },
    { id:3, situation:"Networking Event", prompt:"You're standing near the coffee table when someone makes eye contact. Start a conversation and introduce yourself.", level:"B1",
      modelResponse:"Hi! Are you enjoying the conference so far? I'm Priya, by the way — I'm here from Bangalore. I work in growth marketing for a fintech startup.",
      tip:"In networking, a question is often better than leading with your name.", keyPhrases:["by the way","work in","fintech"] },
    { id:4, situation:"First Day at Office", prompt:"Your manager asks you to introduce yourself at the team standup.", level:"A2",
      modelResponse:"Good morning everyone! I'm really happy to join the team today. My name is Rohan Gupta. I come from a background in UI/UX design — I worked for two years at a design studio in Pune before this role. I'm most excited about the mobile products team here because I think this is where I can add the most value. I'm a quick learner and I promise I'll figure out all the internal tools by end of week. Really looking forward to working with you all.",
      tip:"Standup introductions should be short, warm, and show motivation.", keyPhrases:["add the most value","quick learner","looking forward to"] },
    { id:5, situation:"International Conference", prompt:"You're presenting at a global conference. Give your opening introduction.", level:"B2",
      modelResponse:"Good morning, distinguished guests, panelists, and fellow delegates. My name is Dr. Kavitha Rajan, and I serve as the Director of Climate Research at the Indian Institute of Tropical Meteorology. Over the past fifteen years, I have studied monsoon variability patterns across the Indian subcontinent, with a particular focus on how climate change is altering rainfall distribution in agricultural communities. Today, I will share findings from our three-year field study across 400 villages in Marathwada — data that, I believe, will reshape how we think about drought preparedness policy. Thank you for this opportunity.",
      tip:"Conference introductions establish credibility before delivering the message.", keyPhrases:["distinguished guests","particular focus","reshape how we think"] },
    { id:6, situation:"Dating App Chat", prompt:"Someone asks: 'Tell me something interesting about yourself.'", level:"A2",
      modelResponse:"Hmm, interesting is a tricky word. I once hitchhiked from Delhi to Manali in 3 days with zero plan and ₹800 — came back with the best stories of my life and zero money. Also: I make really exceptional chai. These two facts are both equally important to know about me.",
      tip:"Dating introductions should be unexpected and personal, not resumé-like.", keyPhrases:["hitchhiked","zero plan","equally important"] },
    { id:7, situation:"Parent-Teacher Meeting", prompt:"A child's teacher asks who you are.", level:"A1",
      modelResponse:"Good evening, I'm Pradeep — Arjun's father. I work as a civil engineer. His mother couldn't make it today because she had a work commitment. We've been a bit concerned about his math scores and wanted to understand what support we can provide at home.",
      tip:"Parent-teacher introductions are functional — name, relation, and purpose.", keyPhrases:["work commitment","concerned about","support at home"] },
    { id:8, situation:"Hospital Emergency", prompt:"You're accompanying a patient. The doctor asks who you are.", level:"A1",
      modelResponse:"I'm Sunita — she's my mother, Kamala Devi, 68 years old. She was complaining of chest pain since this morning. She has a history of hypertension and is on medication — I have the list here.",
      tip:"Emergency introductions are brief, factual, and focused on critical information.", keyPhrases:["history of","currently on medication","list here"] },
    { id:9, situation:"Joining a New Book Club", prompt:"It's your first meeting. Introduce yourself and share what kind of books you enjoy.", level:"A1",
      modelResponse:"Hi! I'm Meena — I'm a teacher, originally from Kerala, but I've been in Delhi for eight years now. I read almost anything, but I have a deep weakness for Indian literary fiction. Manu Joseph, Arundhati Roy, Perumal Murugan — my reading choices are very stubbornly non-English when I can get away with it. I also love crime fiction when I'm on a flight and can't concentrate on anything serious. So — very glad to be here and to see what everyone else reads!",
      tip:"Hobby introductions should show genuine passion, not just list titles.", keyPhrases:["deep weakness for","stubbornly non-English","glad to be here"] },
    { id:10, situation:"Zoom Call with New International Client", prompt:"Start the call by introducing yourself and your role.", level:"B1",
      modelResponse:"Good morning — or good evening for those joining from Singapore, I know it's late there. I'm Ashish Malhotra, Head of Client Services here at DataSync India. I'll be your primary point of contact for this engagement. I've been with DataSync for six years and have led similar projects for clients in APAC and the UK, so I'm familiar with the nuances of cross-border delivery. We're really pleased to have the opportunity to work with your team and I'm looking forward to today's kickoff discussion.",
      tip:"Client call introductions should establish credibility AND make them feel valued.", keyPhrases:["primary point of contact","cross-border delivery","kickoff discussion"] },
    { id:11, situation:"Community Volunteer Orientation", prompt:"You're new to this NGO. Introduce yourself to the volunteer coordinator.", level:"A2",
      modelResponse:"Hi! I'm Divya — I found out about your organization through a friend who volunteered last year. I work as an accountant on weekdays, but on weekends I've been looking for something meaningful to do. I'm particularly interested in the literacy program you run for migrant workers — I speak Hindi and Tamil, so hopefully I can be useful for communication. I can commit to every second Saturday and I'm happy to learn whatever you need.",
      tip:"Volunteer introductions should show genuine motivation AND practical availability.", keyPhrases:["meaningful to do","particularly interested in","happy to learn"] },
    { id:12, situation:"Podcast Guest Introduction", prompt:"The host asks: 'Tell our listeners a bit about yourself before we dive in.'", level:"B1",
      modelResponse:"Happy to! I'm Nandini Kumar. I'm a behavioral economist based in Bengaluru, which is a fancy way of saying I study why people make irrational financial decisions and what we can do about it. My specific obsession for the last five years has been: why do so many middle-income Indians have no savings despite having reasonable incomes? I wrote a book about it last year, and I've never stopped getting emails from people who recognize themselves in the research. It's been humbling and fascinating in equal parts.",
      tip:"Podcast introductions should be conversational, not read from a bio.", keyPhrases:["fancy way of saying","specific obsession","humbling and fascinating"] },
    { id:13, situation:"TEDx Speaker Introduction (self)", prompt:"You're about to give a TEDx talk. Introduce yourself to the audience before your talk begins.", level:"B2",
      modelResponse:"Before I start, let me tell you something I've never told an audience before. For seven years, I worked as a prison counselor in Maharashtra. Seven years of having conversations with people who had made catastrophic mistakes, trying to understand whether human beings can truly change. What I discovered — what I want to share with you today — is that the question isn't whether people can change. The question is why we make it so hard for them to try. My name is Vikram Iyer, and this is a talk about second chances.",
      tip:"TEDx introductions work backwards — hook first, name later.", keyPhrases:["catastrophic mistakes","truly change","second chances"] },
    { id:14, situation:"Study Abroad Orientation", prompt:"Introduce yourself to your university dorm floor.", level:"A2",
      modelResponse:"Hey everyone! I'm Aditya — I'm from Mumbai, India, and I'm doing my Masters in Computer Science here. This is my first time in the UK and honestly I'm slightly terrified by the weather already. I'm a huge cricket fan, which I've heard is basically useless here — feel free to educate me about any sports I should be following. I make really good chai so if anyone wants to try it, my door is open. Genuinely looking forward to meeting everyone!",
      tip:"Dorm introductions should be warm, light, and invite interaction.", keyPhrases:["first time in the UK","feel free to educate me","door is open"] },
    { id:15, situation:"LinkedIn InMail", prompt:"Write a cold message introducing yourself to a hiring manager.", level:"B1",
      modelResponse:"Hi Ananya, I came across your profile while researching the product team at UrbanClap, and I wanted to reach out directly. I'm Kiran Rao — a product manager with 5 years of experience in consumer marketplaces, currently at Swiggy. I've been following how UrbanClap has scaled its quality assurance model and I think the problem you're solving for service professionals is both underrated and incredibly important. I'd love to learn more about your team's direction and, if there's a fit, explore how I could contribute. Would you have 15 minutes for a quick call this week? Completely understand if not — thanks for reading.",
      tip:"Cold LinkedIn messages should show research, relevance, and a specific ask.", keyPhrases:["came across your profile","underrated","if there's a fit"] },
    { id:16, situation:"School Alumni Event", prompt:"You're meeting classmates after 15 years. Introduce the 'current you' to someone who only knew your school self.", level:"B1",
      modelResponse:"Oh my God — Suresh? Is that actually you? I barely recognized you without the school uniform! I'm Priya — Priya Kulkarni, 12th C. Right? Amazing to see you here. I've changed a LOT since school — I went from being the girl who cried during Maths to becoming a financial analyst, which I think even my teachers would find hilarious. I live in Hyderabad now with my husband and our very energetic 4-year-old. You look incredible — what have you been up to?",
      tip:"Alumni reconnections should bridge then-and-now while creating warmth.", keyPhrases:["barely recognized","gone from being","very energetic"] },
    { id:17, situation:"Speaking to a Potential Business Partner", prompt:"You're meeting a potential investor for the first time at a dinner.", level:"B2",
      modelResponse:"It's a pleasure to finally meet in person — I've followed your portfolio companies for a while and I've been looking forward to this conversation. I'm Rahul Mehta. I'm building Kisan-Tech, an agri-analytics platform that gives small farmers real-time crop health data using satellite imaging and IoT sensors. We went from zero to 12,000 active farmers in 14 months, and we're currently processing 800,000 data points a day. But what I'm most proud of is that our average farmer has increased income by 23% in the first crop cycle. The unit economics are strong, and I think we're at an inflection point that requires exactly the kind of growth capital and mentorship you provide.",
      tip:"Investor introductions: lead with traction and impact, not just the idea.", keyPhrases:["inflection point","unit economics","growth capital"] },
    { id:18, situation:"Customer Service Call", prompt:"You're calling customer support. Introduce yourself and your problem.", level:"A1",
      modelResponse:"Good morning. My name is Ramesh Nair and my account number is 45678. I'm calling because I received an electricity bill for ₹8,200 this month, which is almost three times my normal amount. I live alone and my consumption hasn't changed. I'd like to file a complaint and request a meter inspection.",
      tip:"Service call introductions are direct: name, account, problem, request.", keyPhrases:["account number","almost three times","request a meter inspection"] },
    { id:19, situation:"Meeting Your Partner's Parents for the First Time", prompt:"You're introduced to your partner's family at dinner.", level:"A2",
      modelResponse:"Namaste Uncle-ji, Aunty-ji. It's wonderful to finally meet you — Priya has told me so much about you both. I'm Karthik — Karthik Nair, originally from Thrissur, Kerala, though I've been in Bengaluru for seven years now. I work as a software engineer at a product company here. I was actually a bit nervous coming today — I hope I'm not being too formal — but I wanted you to know that I have a lot of respect for your home and your family.",
      tip:"Meeting partner's parents: be warm, respectful, a little humble, and show genuine respect.", keyPhrases:["wonderful to finally meet","a bit nervous","a lot of respect"] },
    { id:20, situation:"International Work Email — First Contact", prompt:"You're emailing a colleague in a different country for the first time to collaborate on a project.", level:"B1",
      modelResponse:"Subject: Introduction – India Partnership Lead, Project Atlas\n\nDear Sophie,\n\nI hope this email finds you well. My name is Deepa Krishnan, and I'm the Partnership Lead from our India office joining Project Atlas. Anand from our leadership team suggested we connect before the kickoff call next week.\n\nI've had a chance to review the project brief and I'm very excited about the scope — particularly the consumer behavior research component, which aligns closely with work I've done in our APAC markets.\n\nI'd love to schedule a 30-minute introductory call before Tuesday's kickoff so we can align on our respective workstreams. Are you available Thursday or Friday next week?\n\nLooking forward to working together.\n\nWarm regards,\nDeepa Krishnan",
      tip:"International email introductions: formal but warm, short, with a specific next step.", keyPhrases:["suggested we connect","align on workstreams","warm regards"] },
    { id:21, situation:"Job Reference Call", prompt:"Someone has listed you as a reference. A recruiter calls to ask about them.", level:"B1",
      modelResponse:"Hello, yes — I'm Suresh Verma, I was Ananya's direct manager at DataMinds for three years. I'm happy to share my perspective on her. She was one of the most analytically rigorous people on our team — she had a way of taking ambiguous data and turning it into a clear narrative that stakeholders could actually act on. I watched her grow from an analyst to effectively leading our research function. Is there anything specific you'd like me to focus on?",
      tip:"Reference calls: introduce yourself, establish your relationship, lead with a specific strength.", keyPhrases:["direct manager","analytically rigorous","effectively leading"] },
    { id:22, situation:"Joining a Religious or Cultural Gathering", prompt:"You're new to a local temple committee or cultural association meeting. Introduce yourself.", level:"A2",
      modelResponse:"Pranam everyone. My name is Surekha Iyer. I moved to this area six months ago from Chennai. A friend told me about this association and I was very happy to find it — it's important to me to stay connected to my culture, especially now that I'm living far from home. I know Bharatanatyam — I've been practicing for twenty years — and I'd be happy to contribute to any cultural programs or teach children if that would be helpful.",
      tip:"Cultural association introductions: show connection to shared values, offer something specific.", keyPhrases:["stay connected to my culture","be happy to contribute","if that would be helpful"] },
    { id:23, situation:"Mentor-Mentee First Meeting", prompt:"You're meeting your assigned mentor for the first time.", level:"B1",
      modelResponse:"Thank you so much for agreeing to be my mentor — I know your time is valuable and I genuinely appreciate this. I'm Vikas. I'm in my third year working as a business analyst at a mid-size consulting firm. What I'm struggling with most right now is the transition from being a strong individual contributor to taking on leadership responsibility — I'm getting those opportunities but I don't always feel like I'm responding to them as well as I should. I've read some of your articles on leadership development and I thought your perspective on earned authority versus positional authority was particularly insightful. I hope we can explore that kind of thinking in our sessions.",
      tip:"Mentor meetings: be specific about what you need and show you've done your homework.", keyPhrases:["genuinely appreciate","strong individual contributor","earned authority"] },
    { id:24, situation:"Casual Party", prompt:"You meet someone new at a friend's party. They say: 'I don't think we've met!'", level:"A1",
      modelResponse:"No, I don't think so! I'm Asha — I know Ritu from college. She's one of those people who makes friends in every era of her life and then somehow keeps all of them. Which is how I ended up here on a Saturday night instead of finishing my laundry. I'm a graphic designer. What do you do?",
      tip:"Party introductions: be warm, a little funny, quick, and redirect to them.", keyPhrases:["know Ritu from college","somehow kept all of them","What do you do?"] },
    { id:25, situation:"Public Speaking Competition", prompt:"Introduce yourself at the start of your speech.", level:"B1",
      modelResponse:"Good evening. My name is Ranjit Bose, and I am the son of a farmer who cannot read. When I was ten years old, my father brought a newspaper home from the market and asked me to read it to him. I read him a story about a government scheme that could have helped our family for three years — a scheme nobody had told us about. That day, I understood what illiteracy actually costs. Tonight, I want to talk about what we are still not telling people who cannot read.",
      tip:"Competition introductions use story → identity → thesis structure.", keyPhrases:["the son of","understood what it costs","want to talk about"] },
    { id:26, situation:"Starting a Business Meeting You're Leading", prompt:"Open a meeting and introduce yourself to attendees who don't know you.", level:"B1",
      modelResponse:"Good morning, everyone. For those I haven't met yet — I'm Anita Desai, VP of Product. I joined from a competitor about two months ago, so I'm still in my learning curve here, and these conversations are genuinely helping me get up to speed. Today's agenda is focused on the Q3 roadmap. We have 45 minutes. My goal is that by the end we have alignment on three things: priorities, dependencies, and who owns what. Let's start.",
      tip:"Meeting openings: brief intro, acknowledge your position, state the agenda and goal.", keyPhrases:["still in my learning curve","genuinely helping","alignment on"] },
    { id:27, situation:"Social Media Live Session", prompt:"You're starting a live session on Instagram. Introduce yourself to viewers.", level:"A2",
      modelResponse:"Hey hey hey! Welcome to the stream! For those who are new — super happy to have you here — I'm Kiran, I teach spoken English to working professionals. I've been doing this for six years and I've helped over 3,000 people go from 'I know English but I can't speak' to actually speaking confidently. Tonight we're doing a live Q&A — you can ask me ANYTHING about English grammar, pronunciation, interviews, salary negotiations in English, whatever. Drop your questions in the comments. Let's go!",
      tip:"Social media intros: high energy, immediate value promise, invite interaction.", keyPhrases:["super happy to have you","helped over 3,000 people","drop your questions"] },
    { id:28, situation:"Applying for a Visa — In Person", prompt:"The visa officer says: 'Tell me about yourself and the purpose of your visit.'", level:"B1",
      modelResponse:"Good morning. My name is Preethi Subramaniam. I'm a software engineer at TCS in Chennai, where I've worked for the past five years. I'm applying for a UK business visa to attend a three-day client workshop at our London office — my company has submitted the invitation letter. I'll be staying at a company-arranged hotel from the 14th to the 18th of March. I have a return flight booked and I'll be returning to my work and family in Chennai.",
      tip:"Visa interviews: clear, specific, factual — show ties to home country.", keyPhrases:["invitation letter","return flight booked","returning to my work and family"] },
    { id:29, situation:"First Day at a Gym", prompt:"The personal trainer asks about your background and fitness goals.", level:"A1",
      modelResponse:"Hi! I'm Suresh. I'm 34, and honestly, I haven't exercised regularly since college. I work a desk job — long hours, a lot of sitting. I've been getting back pain and my doctor suggested I start strength training. My goal isn't really about losing weight — I just want to feel less destroyed at the end of every workday. And maybe be able to carry groceries without feeling like I'm climbing Everest.",
      tip:"Fitness introductions: be honest about current state and specific about goals.", keyPhrases:["haven't exercised regularly","my doctor suggested","specific about goals"] },
    { id:30, situation:"Joining a New Country as an Immigrant", prompt:"At a community orientation for new immigrants, introduce yourself.", level:"A2",
      modelResponse:"Good afternoon everyone. My name is Mehwish Qureshi and I came here from Lahore, Pakistan, eleven months ago with my husband and our two children. My husband is doing his PhD in Mechanical Engineering. I was a pharmacist in Pakistan — here I'm still figuring out the re-certification process, but I'm working on it. It's been a challenging adjustment, but also beautiful in ways I didn't expect. I'm glad to find this group because the hardest thing about being new is feeling like you have to explain yourself to everyone. So — hello, and thank you for making a space where we don't.",
      tip:"Immigrant community introductions: share journey honestly, connect through shared experience.", keyPhrases:["figuring out","challenging adjustment","explaining yourself"] }
  ]
};

write('conversation-practice.json', conversationPractice);
console.log('Conversation Practice done!');

/* ═══════════════════════════════════════════════
   9. COMMON MISTAKES  (100 mistakes)
═══════════════════════════════════════════════ */
const commonMistakes = {
  day: 2, topic: "Self Introduction – Common Mistakes",
  description: "100 common mistakes made by Hindi speakers when introducing themselves in English. Learn the correct form and why.",
  totalMistakes: 100,
  categories: ["grammar","vocabulary","pronunciation","structure","cultural"],
  mistakes: [
    { id:1, category:"grammar", wrongForm:"Myself Priya.", correctForm:"I am Priya. / My name is Priya.", explanation:"'Myself' is a reflexive pronoun used for emphasis or reflection, not for introducing yourself.", hindiReason:"Hindi mein 'मैं प्रिया हूँ' ka anuvaad galat ho jaata hai 'Myself Priya' mein.", example:"❌ Myself Priya, software engineer. ✅ I am Priya, a software engineer." },
    { id:2, category:"grammar", wrongForm:"I am belong to India.", correctForm:"I belong to India. / I am Indian.", explanation:"'Belong' is a stative verb and cannot be used in continuous form.", hindiReason:"Hindi mein 'main India se belong karta hoon' ko directly translate karna galat hai.", example:"❌ I am belonging to Rajasthan. ✅ I belong to Rajasthan." },
    { id:3, category:"grammar", wrongForm:"I am having 5 years of experience.", correctForm:"I have 5 years of experience.", explanation:"'Have' as a possession verb is stative and cannot be in continuous form.", hindiReason:"'मुझे 5 साल का अनुभव है' ko 'I am having' mein translate karna galat hai.", example:"❌ I am having good communication skills. ✅ I have good communication skills." },
    { id:4, category:"grammar", wrongForm:"I am working here since 3 years.", correctForm:"I have been working here for 3 years.", explanation:"'Since' is for point in time. 'For' is for duration. Present perfect needed.", hindiReason:"Hindi mein 'since 3 years' bolna common hai, par English mein 'for 3 years' bolte hain.", example:"❌ I am working since 2 years. ✅ I have been working for 2 years." },
    { id:5, category:"grammar", wrongForm:"I born in Delhi.", correctForm:"I was born in Delhi.", explanation:"'Born' is always passive — requires 'was/were'.", hindiReason:"'born' ke saath 'was' lagana zaruri hai — passive voice hai.", example:"❌ I born in 1995. ✅ I was born in 1995." },
    { id:6, category:"vocabulary", wrongForm:"I am doing job in Microsoft.", correctForm:"I work at Microsoft.", explanation:"'Doing job' is not standard English. Use 'work at' (specific company) or 'work in' (field).", hindiReason:"'Job karna' ka direct translation English mein kaam nahin karta.", example:"❌ I am doing job in IT sector. ✅ I work in the IT sector." },
    { id:7, category:"vocabulary", wrongForm:"I have done my graduation from DU.", correctForm:"I graduated from DU. / I completed my graduation from DU.", explanation:"'Done graduation' is Indian English. Standard English uses 'graduated from'.", hindiReason:"'Graduation done karna' ka phrase India mein common hai par standard English mein nahi.", example:"❌ I have done graduation from Pune University. ✅ I graduated from Pune University." },
    { id:8, category:"vocabulary", wrongForm:"I have a hobby of dancing.", correctForm:"My hobby is dancing. / I enjoy dancing.", explanation:"'Hobby of' is incorrect. Use 'hobby is + verb-ing' or 'enjoy + verb-ing'.", hindiReason:"'Mujhe ___ ka shauq hai' ko 'hobby of' mein nahi translate karte.", example:"❌ I have a hobby of cooking. ✅ My hobby is cooking." },
    { id:9, category:"grammar", wrongForm:"I am well-versed with computers.", correctForm:"I am proficient in computers. / I am well-versed in computers.", explanation:"'Well-versed in' (not 'with'). Also, 'proficient in' is more professional.", hindiReason:"Preposition ki galti — 'with' ki jagah 'in' aata hai.", example:"❌ I am well-versed with Java. ✅ I am proficient in Java." },
    { id:10, category:"structure", wrongForm:"My self-introduction: I am from India. I am 25 years old. I like cricket.", correctForm:"Start with your name, give context, add personality, then ask about them.", explanation:"A list of facts is not an introduction — it's a form fill. Good introductions have flow.", hindiReason:"Ek ke baad ek facts bolna boring hai. Ek small story ya connection dhundhen.", example:"❌ I am from Delhi. I am engineer. I like music. ✅ I'm from Delhi — I moved here 3 years ago for my engineering job, and the city's music scene has completely converted me." },
    { id:11, category:"grammar", wrongForm:"I am knowing many programming languages.", correctForm:"I know many programming languages.", explanation:"'Know' is a stative verb — no continuous form.", hindiReason:"'Main jaanta hoon' ka galat translation 'I am knowing' ho jaata hai.", example:"❌ I am knowing French. ✅ I know French." },
    { id:12, category:"vocabulary", wrongForm:"I am pursuing MBA from IIM-A.", correctForm:"I am doing my MBA at IIM-A. / I am currently enrolled in the MBA program at IIM-A.", explanation:"'Pursuing from' is incorrect — 'at' or 'through' a university.", hindiReason:"'Pursuing from' ek common Indian English error hai.", example:"❌ I am pursuing degree from IIT. ✅ I am studying at IIT." },
    { id:13, category:"cultural", wrongForm:"I am a very simple and innocent person.", correctForm:"I am straightforward and approachable.", explanation:"'Simple and innocent' in Indian English often means humble, but sounds strange to native speakers.", hindiReason:"Hindi mein 'seedha-saada' ka anuvaad 'simple' ho jaata hai, jo English mein alag arth rakhta hai.", example:"❌ I am a very simple girl. ✅ I am down-to-earth and easygoing." },
    { id:14, category:"grammar", wrongForm:"My name is Priya. I am from Delhi. I am doing job in IT.", correctForm:"Hi! I'm Priya from Delhi. I work in IT as a software developer.", explanation:"Fragmented sentences sound robotic. Link ideas and use contractions for natural flow.", hindiReason:"Short, disjointed sentences bahut formal aur mechanical lagte hain.", example:"❌ I am Rahul. I am from Mumbai. I am engineer. ✅ I'm Rahul, an engineer from Mumbai." },
    { id:15, category:"vocabulary", wrongForm:"I have passed out from IIT Delhi.", correctForm:"I graduated from IIT Delhi.", explanation:"'Passed out' means 'fainted' in standard English. Use 'graduated'.", hindiReason:"'Pass out karna' India mein common hai graduation ke liye — par globally iska matlab behosh hona hai!", example:"❌ I passed out from BITS Pilani in 2019. ✅ I graduated from BITS Pilani in 2019." },
    { id:16, category:"grammar", wrongForm:"I have 4 years experience.", correctForm:"I have 4 years of experience. / I have 4 years' experience.", explanation:"Need 'of' or apostrophe after the number when used as a noun phrase.", hindiReason:"'Years experience' ke beech 'of' lagana zaruri hai.", example:"❌ I have 8 years experience in teaching. ✅ I have 8 years of experience in teaching." },
    { id:17, category:"vocabulary", wrongForm:"I want to do job in your esteemed organization.", correctForm:"I would like to join your organization as a ___.", explanation:"'Esteemed' sounds sycophantic. Simply name the company and state your interest.", hindiReason:"'Pratishthit sansthan' ka anuvaad awkward lagta hai English mein.", example:"❌ I want to work in your esteemed firm. ✅ I'm interested in joining your team." },
    { id:18, category:"pronunciation", wrongForm:"My name is 'Reee-ta' (wrong stress)", correctForm:"'REE-ta' — first syllable stressed in most Indian names", explanation:"English stress patterns differ from Hindi. Practice the stress pattern of your name as it sounds to English speakers.", hindiReason:"Angrezi mein syllable stress alag hoti hai. Apna naam English pronunciation mein practice karen.", example:"Common mispronunciations: Vi-KRAM vs VIK-ram, ra-JEE-sha vs ra-JEE-sha" },
    { id:19, category:"grammar", wrongForm:"I am a commerce graduate from DU with 65% marks.", correctForm:"I hold a degree in Commerce from Delhi University.", explanation:"Mentioning percentage sounds odd to international employers — focus on degree and institution.", hindiReason:"India mein percentage mention karna normal hai, but globally degree aur skills matter karti hain.", example:"❌ I scored 78% in my engineering. ✅ I graduated with strong academic performance from VIT." },
    { id:20, category:"structure", wrongForm:"I am hardworking, dedicated, sincere, punctual, honest, and team player.", correctForm:"I am known for my reliability — I've never missed a deadline in three years.", explanation:"A list of adjectives means nothing. One specific, evidenced claim is more powerful.", hindiReason:"'Main mehanti hoon' bolne se kuch sabit nahin hota — example se sabit karo.", example:"❌ I am honest and hardworking. ✅ My manager once said he always gives me the projects nobody else wants, because he knows I'll find a way." },
    { id:21, category:"grammar", wrongForm:"I am basically a software engineer.", correctForm:"I am a software engineer.", explanation:"'Basically' is a filler word that weakens your statement. Remove it.", hindiReason:"'Basically' — ek unnecessary filler word hai jo confidence kam karta hai.", example:"❌ I am basically a data analyst. ✅ I am a data analyst." },
    { id:22, category:"vocabulary", wrongForm:"I am native of Bangalore.", correctForm:"I am a native of Bangalore. / I am originally from Bangalore.", explanation:"'Native' needs an article 'a' before it when used as a noun.", hindiReason:"'A native' — 'a' article lagana zaruri hai.", example:"❌ I am native of Chennai. ✅ I am a native of Chennai." },
    { id:23, category:"grammar", wrongForm:"I am interested to join your company.", correctForm:"I am interested in joining your company.", explanation:"'Interested in + verb-ing'. Not 'interested to + verb'.", hindiReason:"'Interested in' ke baad gerund (-ing) aata hai, infinitive nahi.", example:"❌ I am interested to learn. ✅ I am interested in learning." },
    { id:24, category:"vocabulary", wrongForm:"I did engineering from Pune University.", correctForm:"I studied engineering at Pune University.", explanation:"'Did from' is informal/incorrect. Use 'studied at' or 'completed engineering at'.", hindiReason:"'Engineering ki hai' ka anuvaad 'did from' nahi hota — 'studied at' bolte hain.", example:"❌ I did MBA from IIM. ✅ I completed my MBA at IIM." },
    { id:25, category:"cultural", wrongForm:"I am a very good boy/girl from a respectable family.", correctForm:"I come from a warm, close-knit family — my parents are educators.", explanation:"Describing yourself as 'good' and your family as 'respectable' sounds dated and odd in professional English contexts.", hindiReason:"'Achche ghar ka ladka/ladki' ka direct anuvaad English mein formal settings mein uncomfortable lagta hai.", example:"❌ I am from a respectable family and I am good boy. ✅ I grew up in a household that valued education and integrity." },
    { id:26, category:"grammar", wrongForm:"I have been working since 5 years.", correctForm:"I have been working for 5 years.", explanation:"'Since' = point in time (since 2019). 'For' = duration (for 5 years).", hindiReason:"'Since 5 years' ek very common mistake hai — 'for' use karo duration ke liye.", example:"❌ I've been here since 3 years. ✅ I've been here for 3 years." },
    { id:27, category:"vocabulary", wrongForm:"I am good in English.", correctForm:"I am good at English. / I am proficient in English.", explanation:"'Good at' for skills. 'Proficient in' for language skills.", hindiReason:"'Good at' (skills ke liye), 'proficient in' (languages ke liye).", example:"❌ I am good in communication. ✅ I am good at communication." },
    { id:28, category:"structure", wrongForm:"First I'll tell you about my education, then my work, then my hobbies...", correctForm:"Start with the most relevant/interesting thing — not a roadmap of what you'll say.", explanation:"Announcing your structure wastes time and sounds bureaucratic. Just say it.", hindiReason:"'Pehle... phir... phir...' bolna boring hai — directly interesting fact se shuru karo.", example:"❌ I will now tell you three things about myself. ✅ I'm Ananya — I build financial products for people who've never had a bank account." },
    { id:29, category:"vocabulary", wrongForm:"I am a peoples person.", correctForm:"I am a people person. / I build rapport easily.", explanation:"'Peoples' is not used as an adjective this way. Also, 'people person' is a cliché — give evidence instead.", hindiReason:"'Peoples' galat hai — 'people' (bina s ke) use karo.", example:"❌ I am good peoples person. ✅ I connect easily with people across backgrounds." },
    { id:30, category:"grammar", wrongForm:"My mother tongue is Hindi and I also know English and Tamil language.", correctForm:"My mother tongue is Hindi, and I also speak English and Tamil.", explanation:"'Language' after specific language names is redundant. And use 'speak' not 'know'.", hindiReason:"'English language', 'Tamil language' mein 'language' redundant hai.", example:"❌ I know English language and French language. ✅ I speak English and French." },
    { id:31, category:"pronunciation", wrongForm:"I am a 'soft-wher' engineer.", correctForm:"I am a 'SOFT-wer' engineer. Soft-ware (2 syllables, stress on first).", explanation:"'Software' is a two-syllable word. Hindi speakers often add a syllable.", hindiReason:"Software ko 3 syllables mein nahi bolta — 2 syllables hain.", example:"Practice: soft-ware, hard-ware, firm-ware (all 2 syllables, stress on first)" },
    { id:32, category:"vocabulary", wrongForm:"I want to learn and grow in your company.", correctForm:"I want to develop my skills and contribute to your company's goals.", explanation:"'Learn and grow' is vague and sounds like a fresher cliché. Be specific.", hindiReason:"'Seekhna aur grow karna' bahut generic hai — specific bolo.", example:"❌ I want to grow in your reputed company. ✅ I want to deepen my expertise in product analytics here." },
    { id:33, category:"grammar", wrongForm:"I am expertise in Python.", correctForm:"I have expertise in Python. / I am an expert in Python.", explanation:"'Expertise' is a noun, not an adjective. 'I am expert' → 'I am an expert'.", hindiReason:"'Expertise' noun hai — 'I am expertise' galat hai.", example:"❌ I am expertise in marketing. ✅ I have expertise in marketing." },
    { id:34, category:"cultural", wrongForm:"I am 26 years old, not yet married.", correctForm:"Omit marital status unless directly relevant to the context.", explanation:"In professional introductions, marital status is irrelevant and can feel intrusive.", hindiReason:"Professional settings mein shadi ka status share karna zaruri nahi — India mein common hai, globally nahi.", example:"❌ I am married with two children. ✅ (Skip unless a personal context warrants it)" },
    { id:35, category:"vocabulary", wrongForm:"I have done many achievements.", correctForm:"I have achieved several milestones. / Some of my achievements include...", explanation:"'Done achievements' is incorrect — 'achieved' is the verb, or use 'accomplishments/milestones'.", hindiReason:"'Achievements karna' nahi hota — 'achieve karna' ya 'accomplishments' use karo.", example:"❌ I have done many achievements in my career. ✅ I have achieved several career milestones." },
    { id:36, category:"grammar", wrongForm:"I am seeking for a new job.", correctForm:"I am seeking a new job. / I am looking for a new job.", explanation:"'Seek' does not take 'for'. 'Look for' does. Don't mix them.", hindiReason:"'Seeking for' — 'for' yahan nahi aata. Ya 'looking for' bolein ya sirf 'seeking'.", example:"❌ I am seeking for growth opportunities. ✅ I am seeking growth opportunities." },
    { id:37, category:"vocabulary", wrongForm:"I have a good command over English.", correctForm:"I have a good command of English.", explanation:"'Command of' is correct. 'Command over' is incorrect.", hindiReason:"'Command of' — 'over' nahi, 'of' preposition aata hai.", example:"❌ I have command over 3 languages. ✅ I have command of 3 languages." },
    { id:38, category:"structure", wrongForm:"I will tell you everything about myself now.", correctForm:"Hi, I'm Priya. I lead digital marketing for a B2C startup in Pune.", explanation:"Don't tell people what you're about to do — just do it.", hindiReason:"'Main apne baare mein bataunga' — yeh sunna hi boring hai. Seedha bolo.", example:"❌ Let me begin by introducing myself. I will talk about my education, work and hobbies. ✅ I'm Rahul — I make AI tools that help small businesses survive." },
    { id:39, category:"pronunciation", wrongForm:"Pronouncing 'w' as 'v' — 'vork', 'vife', 'vhat'", correctForm:"'w' sound: lips slightly rounded, no teeth, air flows smoothly. 'work', 'wife', 'what'", explanation:"Many Hindi speakers replace English 'w' with 'v'. Practice the lip-rounding sound.", hindiReason:"Hindi mein 'v' aur 'w' alag nahi hote — English mein hote hain.", example:"Practice pairs: wine/vine, west/vest, wet/vet, weal/veal" },
    { id:40, category:"grammar", wrongForm:"I am coming from a small town.", correctForm:"I come from a small town. / I am from a small town.", explanation:"'Come from' for origin is stative — no continuous form.", hindiReason:"'Main aa raha hoon' is continuous, but origin uses simple present.", example:"❌ I am coming from Agra originally. ✅ I come from Agra originally." },
    { id:41, category:"vocabulary", wrongForm:"I am very much interested in this post.", correctForm:"I am very interested in this position.", explanation:"'Post' sounds informal/bureaucratic. Use 'position' or 'role'. Also 'very much' before 'interested' is redundant.", hindiReason:"'Post' ka use government/Hindi context mein hota hai — 'position' ya 'role' professional hai.", example:"❌ I am applying for the post of manager. ✅ I am applying for the manager role." },
    { id:42, category:"cultural", wrongForm:"I scored 88% in my 12th board exams.", correctForm:"I was a strong academic performer in school.", explanation:"Board exam percentages are meaningful in India but confuse international audiences. Rephrase.", hindiReason:"'Board percentage' India ke bahar meaningless hai — GPA ya general statement dein.", example:"❌ I got 91% in 10th. ✅ I consistently performed in the top 10% of my class." },
    { id:43, category:"grammar", wrongForm:"I like to do swimming.", correctForm:"I enjoy swimming. / I like swimming.", explanation:"After 'like' and 'enjoy', use verb-ing directly. 'Like to do swimming' has an extra 'to do'.", hindiReason:"'Main swimming karna pasand karta hoon' ka galat anuvaad 'I like to do swimming' ho jaata hai.", example:"❌ I like to do reading. ✅ I enjoy reading." },
    { id:44, category:"vocabulary", wrongForm:"I have experience of 3 years.", correctForm:"I have 3 years of experience.", explanation:"'Experience of 3 years' is a common word-order error. The standard is '3 years of experience'.", hindiReason:"'3 saal ka anubhav' ka word order English mein ulta hota hai.", example:"❌ I have experience of 8 years in marketing. ✅ I have 8 years of marketing experience." },
    { id:45, category:"grammar", wrongForm:"I am a self-motivated and hard working person.", correctForm:"I am self-motivated and hardworking.", explanation:"'Hard working' should be one word when used as an adjective: 'hardworking'. Also remove 'person' — it's implied.", hindiReason:"'Hardworking' ek compound adjective hai — ek saath likhte hain.", example:"❌ I am dedicated and sincere person. ✅ I am dedicated and sincere." },
    { id:46, category:"structure", wrongForm:"I am Ramesh. I am 28. I am from Mysore. I am software engineer. I am married.", correctForm:"I'm Ramesh — a software engineer from Mysore with 5 years of experience building enterprise apps.", explanation:"Combine facts into natural sentences instead of separate statements.", hindiReason:"Har ek baat alag sentence mein bolna bahut choppy lagta hai.", example:"Bad: I am 25. I am from Mumbai. Good: I'm a 25-year-old from Mumbai." },
    { id:47, category:"vocabulary", wrongForm:"I am working in a reputed company.", correctForm:"I work at [Company Name], which is one of India's leading ___ companies.", explanation:"'Reputed company' is vague and sounds like a placeholder. Name the company or describe it specifically.", hindiReason:"'Reputed company' ek cliché phrase hai — specific bolo.", example:"❌ I work in a well-known MNC. ✅ I work at Capgemini as a senior consultant." },
    { id:48, category:"pronunciation", wrongForm:"I'm a 'proFESsor' / 'conFErence' / 'adDRESS'", correctForm:"PROfessor / CONference / ADdress (noun)", explanation:"Many English words have different stress from what Hindi speakers expect. Check a dictionary for stress.", hindiReason:"English stress patterns bahut alag hote hain — har word ka stress check karo.", example:"REcord (noun) vs reCORD (verb); PROtest (noun) vs proTEST (verb)" },
    { id:49, category:"grammar", wrongForm:"I have presented many presentations.", correctForm:"I have given many presentations. / I am an experienced presenter.", explanation:"'Present' presentations — the verb and noun clash. Use 'given' or 'delivered'.", hindiReason:"'Present' ka verb 'give' ya 'deliver' hota hai — 'present presentations' redundant lagta hai.", example:"❌ I have presented 20 presentations. ✅ I have delivered over 20 presentations." },
    { id:50, category:"cultural", wrongForm:"I want to settle in your company for long time.", correctForm:"I am looking for a long-term role where I can grow and contribute.", explanation:"'Settle in company' sounds like you want comfort, not growth. Professional language focuses on contribution.", hindiReason:"'Settle' word passive aur growth-averse lagta hai — 'contribute and grow' bolein.", example:"❌ I want to settle here. ✅ I'm looking for a role with a long-term horizon." },
    { id:51, category:"grammar", wrongForm:"I am a quick learning person.", correctForm:"I am a quick learner.", explanation:"'Quick learning person' should be 'quick learner' — compound noun.", hindiReason:"'Quick learner' — 'learning person' ki jagah 'learner' bolte hain.", example:"❌ I am fast learning individual. ✅ I am a fast learner." },
    { id:52, category:"vocabulary", wrongForm:"I am open to relocate.", correctForm:"I am open to relocation. / I am willing to relocate.", explanation:"'Open to' takes a noun or verb-ing. 'Open to relocate' needs 'relocating'.", hindiReason:"'Open to' ke baad noun ya gerund (-ing) aata hai — infinitive nahi.", example:"❌ I am open to relocate anywhere. ✅ I am open to relocating anywhere." },
    { id:53, category:"grammar", wrongForm:"I am looking forward to work with you.", correctForm:"I am looking forward to working with you.", explanation:"'Look forward to' is ALWAYS followed by verb-ing, never infinitive.", hindiReason:"'Looking forward to' — yeh ek bahut common mistake hai, 'to' ke baad 'working' aata hai, 'work' nahi.", example:"❌ I look forward to meet you. ✅ I look forward to meeting you." },
    { id:54, category:"structure", wrongForm:"Let me first start by saying that I am very glad to be here today in this wonderful gathering.", correctForm:"Thank you for having me.", explanation:"Long, verbose openings waste everyone's time. Be crisp.", hindiReason:"Bahut lamba introduction boring hai — seedha point pe aao.", example:"Bad: It is with great pleasure and honor that I stand before you... Good: I'm thrilled to be here." },
    { id:55, category:"vocabulary", wrongForm:"I want to utilize my skills for the betterment of your organization.", correctForm:"I want to apply my skills to help your team achieve its goals.", explanation:"'Betterment' and 'utilize' are unnecessarily formal — 'apply' and 'achieve goals' are cleaner.", hindiReason:"'Utilization', 'betterment' — yeh overly formal aur old-fashioned words hain.", example:"❌ I wish to utilize my potential for your organization's growth. ✅ I want to help your team grow." },
    { id:56, category:"grammar", wrongForm:"I have joined the company before 2 years.", correctForm:"I joined the company 2 years ago.", explanation:"'Before 2 years' should be '2 years ago' in simple past.", hindiReason:"'Pehle 2 saal' ka English mein '2 years ago' hota hai.", example:"❌ I came here before 3 months. ✅ I came here 3 months ago." },
    { id:57, category:"vocabulary", wrongForm:"I am a B.Tech. holder in computer science.", correctForm:"I hold a B.Tech. in Computer Science. / I have a B.Tech. in Computer Science.", explanation:"'Degree holder' sounds dated. 'Hold' or 'have' a degree is standard.", hindiReason:"'Holder' word old-fashioned lagta hai — 'I hold' ya 'I have' bolein.", example:"❌ I am a MBA holder. ✅ I hold an MBA." },
    { id:58, category:"pronunciation", wrongForm:"'Col-lEEG' for colleague", correctForm:"'COL-eeg' — stress on first syllable, second syllable short", explanation:"'Colleague' is often mispronounced. The 'ue' at the end is silent.", hindiReason:"Colleague pronunciation: COL-eeg — silent 'ue' at end.", example:"Other silent letters: 'knowledge' (no 'dge' sound), 'Wednesday' (no 'd' sound)" },
    { id:59, category:"grammar", wrongForm:"I am interested to know more about this opportunity.", correctForm:"I am interested in learning more about this opportunity.", explanation:"'Interested in + verb-ing'. The structure is fixed.", hindiReason:"'Interested in' ke baad gerund aata hai — 'interested to learn' nahi, 'interested in learning'.", example:"❌ I am interested to explore this. ✅ I am interested in exploring this." },
    { id:60, category:"cultural", wrongForm:"My father is a govt. servant and my mother is a housewife.", correctForm:"My father works in the public sector and my mother manages our home.", explanation:"'Govt. servant' and 'housewife' are outdated terms internationally. Use neutral modern descriptions.", hindiReason:"'Government servant' aur 'housewife' purane terms hain — modern equivalents use karo.", example:"✅ My mother takes care of our family. / My father is a civil servant." },
    { id:61, category:"grammar", wrongForm:"I am very much excited to join your team.", correctForm:"I am very excited to join your team.", explanation:"'Very much excited' — 'much' is not needed here. 'Very excited' is standard.", hindiReason:"'Very much' typically precedes nouns ('I appreciate it very much'), not adjectives ('very excited').", example:"❌ I am very much happy. ✅ I am very happy." },
    { id:62, category:"vocabulary", wrongForm:"I have cleared many interviews.", correctForm:"I have successfully passed several interviews. / I have performed well in interviews.", explanation:"'Clear an interview' is Indian English. Standard usage is 'pass', 'succeed in', or 'perform well in'.", hindiReason:"'Interview clear karna' Indian English expression hai — standard mein 'pass' ya 'succeed' bolte hain.", example:"❌ I cleared 5 rounds of interviews. ✅ I successfully completed 5 interview rounds." },
    { id:63, category:"grammar", wrongForm:"I am graduate of 2020 batch.", correctForm:"I graduated in 2020. / I am from the class of 2020.", explanation:"'Graduate of batch' is institutional language — normal speech uses 'graduated in' or 'class of'.", hindiReason:"'Batch 2020 ka' ka English mein 'class of 2020' ya 'graduated in 2020' hota hai.", example:"❌ I am 2018 batch graduate. ✅ I graduated in 2018." },
    { id:64, category:"structure", wrongForm:"In my free time I do timepass.", correctForm:"In my free time, I read literary fiction / play chess / run half-marathons.", explanation:"'Timepass' is an Indian colloquial word unknown to international audiences. Be specific.", hindiReason:"'Timepass' international English mein exist nahi karta — specific hobbies bolein.", example:"❌ I enjoy timepass on weekends. ✅ I enjoy hiking and photography on weekends." },
    { id:65, category:"vocabulary", wrongForm:"I am fond to reading.", correctForm:"I am fond of reading.", explanation:"'Fond of' is the fixed preposition. Not 'fond to'.", hindiReason:"'Fond of' — 'to' nahi, 'of' aata hai.", example:"❌ I am fond to travel. ✅ I am fond of traveling." },
    { id:66, category:"grammar", wrongForm:"I worked into the IT field.", correctForm:"I worked in the IT sector / field.", explanation:"'Into' suggests motion/transition; 'in' is for being within a field.", hindiReason:"'In' vs 'into' — 'in' for location, 'into' for movement/transition.", example:"❌ I have experience into finance. ✅ I have experience in finance." },
    { id:67, category:"cultural", wrongForm:"I am an introvert so I don't speak much English.", correctForm:"I am still building my confidence in spoken English — and I'm working hard on it.", explanation:"Using 'introvert' as an excuse sounds like a limitation. Reframe as a work in progress.", hindiReason:"'Introvert hoon' bolne se saamne wala think karta hai aap improve nahin karenge.", example:"❌ I am shy so my English is weak. ✅ I'm actively improving my spoken English." },
    { id:68, category:"vocabulary", wrongForm:"I have given many seminars and webinaries.", correctForm:"I have delivered several seminars and webinars.", explanation:"'Webinaries' is not a word. 'Webinars' (no 'ie'). And 'deliver' not 'give' for seminars.", hindiReason:"'Webinaries' galat spelling hai — 'webinars' likhein.", example:"❌ I conducted webinaries. ✅ I conducted webinars." },
    { id:69, category:"grammar", wrongForm:"I am having a lot of experience in teaching.", correctForm:"I have a lot of experience in teaching.", explanation:"'Have' for possession cannot be in continuous form.", hindiReason:"Yet again — 'am having' is a very common Indian English error.", example:"❌ I am having 10 years teaching experience. ✅ I have 10 years of teaching experience." },
    { id:70, category:"structure", wrongForm:"I would like to cordially introduce myself as Mr. Vivek Sharma who is currently employed as an Assistant Manager at...", correctForm:"Hi! I'm Vivek — an Assistant Manager at [Company]. Here's what that means in practice...", explanation:"Over-formal, third-person style creates distance. Be direct and human.", hindiReason:"'Who is currently employed as' — yeh bahut bureaucratic lagta hai.", example:"❌ I wish to introduce myself as Miss Priya Kumar, daughter of... ✅ Hi, I'm Priya Kumar — here's what I do." },
    { id:71, category:"grammar", wrongForm:"I have joined the company last year.", correctForm:"I joined the company last year.", explanation:"'Last year' is a specific past time marker — use simple past, not present perfect.", hindiReason:"'Last year' ke saath simple past use karo, present perfect nahi.", example:"❌ I have seen that movie yesterday. ✅ I saw that movie yesterday." },
    { id:72, category:"vocabulary", wrongForm:"I am very passionate towards my work.", correctForm:"I am very passionate about my work.", explanation:"'Passionate about' is the fixed collocation. Not 'towards'.", hindiReason:"'Passionate about' — 'towards' nahi, 'about' preposition aata hai.", example:"❌ I am passionate towards data science. ✅ I am passionate about data science." },
    { id:73, category:"pronunciation", wrongForm:"Saying 'V-ee-T' for each letter when it should be said as a word", correctForm:"For acronyms: say each letter clearly. For abbreviations used as words: say them as words.", explanation:"VIT is pronounced letter by letter. NASA is a word. MBA is letters. Know the difference.", hindiReason:"Acronym aur abbreviation mein fark hota hai — kuch letter-by-letter, kuch word ki tarah bolte hain.", example:"MBA = em-bee-ay. NASA = NA-sa (word). URL = you-ar-el (letters)." },
    { id:74, category:"grammar", wrongForm:"I am MBA qualified.", correctForm:"I hold an MBA. / I am MBA-qualified.", explanation:"If using as adjective: 'MBA-qualified' (hyphenated). Better: 'I hold an MBA'.", hindiReason:"Adjective ke roop mein use karte waqt hyphen lagao — ya 'hold an MBA' bolein.", example:"❌ I am MBA. ✅ I hold an MBA from SP Jain." },
    { id:75, category:"cultural", wrongForm:"I will work 24/7 for this company.", correctForm:"I am dedicated to delivering results and meeting every deadline.", explanation:"'24/7' sounds desperate or unhealthy. Show dedication through results, not sacrificed time.", hindiReason:"'24/7 kaam karunga' desperation dikhata hai — productivity pe focus karo.", example:"❌ I am ready to work 24x7. ✅ I am fully committed to the role and what it requires." },
    { id:76, category:"grammar", wrongForm:"I have been awarded by many certificates.", correctForm:"I have received several certificates. / I have been awarded several certificates.", explanation:"'Awarded by' = someone gave you the award. 'Awarded' alone = you received the award.", hindiReason:"'Awarded by' mein 'by' sirf tab aata hai jab awarder ka naam ho.", example:"❌ I was awarded by my college. ✅ I was awarded by my college for academic excellence." },
    { id:77, category:"vocabulary", wrongForm:"I want to pursue further studies.", correctForm:"I plan to pursue a Master's degree in [field].", explanation:"'Further studies' is vague. Specify the degree, field, and optionally the institution.", hindiReason:"'Aage padhna chahta hoon' ka anuvaad specific hona chahiye.", example:"❌ I want to do further studies. ✅ I'm planning to pursue an MBA in finance." },
    { id:78, category:"grammar", wrongForm:"I am a very hardworking and dedicated and sincere person.", correctForm:"I am hardworking, dedicated, and sincere.", explanation:"Don't repeat 'and' — use commas for lists. And dropping 'very' makes it stronger.", hindiReason:"'Aur... aur... aur...' — sirf ek 'and' aata hai list ke last mein.", example:"❌ I am honest and punctual and responsible. ✅ I am honest, punctual, and responsible." },
    { id:79, category:"cultural", wrongForm:"I will not leave this company in any case.", correctForm:"I am committed to contributing to this company's long-term growth.", explanation:"'Will not leave in any case' sounds unconfident. Rephrase as positive commitment.", hindiReason:"'Kabhi nahin chhodoonga' negative se positive mein translate karo.", example:"❌ I am not a job hopper and will stay forever. ✅ I'm looking for a stable, long-term role." },
    { id:80, category:"grammar", wrongForm:"I have been done my MBA.", correctForm:"I have done my MBA. / I completed my MBA.", explanation:"'Have been done' is passive voice structure used incorrectly. 'Have done' is active perfect.", hindiReason:"'Have been done' passive hai — active mein 'have done' ya 'completed' bolein.", example:"❌ I have been done 3 projects. ✅ I have completed 3 projects." },
    { id:81, category:"structure", wrongForm:"My weakness is that I work too hard.", correctForm:"I'm still developing my [specific skill], and here's what I'm actively doing about it.", explanation:"'I work too hard' is a cliché non-answer. Name a real weakness with a genuine action plan.", hindiReason:"'Bahut zyada kaam karta hoon' — everyone sees through this cliché.", example:"❌ My weakness is I am too honest. ✅ I sometimes take on too much — I'm learning to delegate." },
    { id:82, category:"vocabulary", wrongForm:"I want to hone my skills under your guidance.", correctForm:"I hope to develop my skills further in this role.", explanation:"'Under your guidance' sounds like you're a student — in a job interview, show you're a peer.", hindiReason:"'Aapke margdarshan mein' professional context mein thoda over-dependent lagta hai.", example:"❌ I will improve under your mentorship. ✅ I aim to contribute while continuing to grow." },
    { id:83, category:"grammar", wrongForm:"I will try to do my best.", correctForm:"I am committed to delivering my best.", explanation:"'Will try' sounds uncertain. 'Committed to delivering' sounds decisive.", hindiReason:"'Try karunga' uncertainty dikhata hai — 'committed hoon' stronger hai.", example:"❌ I will try to perform well. ✅ I am committed to performing at my highest level." },
    { id:84, category:"pronunciation", wrongForm:"'Ek-spe-ree-ence' (4 syllables)", correctForm:"'ex-PEE-ree-ence' (4 syllables, stress on 2nd)", explanation:"'Experience' — ex-PER-ience. Stress on the second syllable 'per'.", hindiReason:"Experience mein stress 2nd syllable pe hota hai.", example:"Say slowly: ex — PER — ience. The 'i' in 'ience' is very short." },
    { id:85, category:"cultural", wrongForm:"I have 90% marks in 12th, 85% in graduation, 78% in MBA.", correctForm:"I performed consistently well across my academic career.", explanation:"Listing all percentages takes too long and confuses non-Indian employers. Summarize.", hindiReason:"Saare percentage list karna boring aur irrelevant hai international context mein.", example:"✅ I graduated with distinction from IIT and with merit from IIM." },
    { id:86, category:"vocabulary", wrongForm:"I am very much passionate and I love to work hard.", correctForm:"I am passionate about solving complex problems and I consistently deliver results.", explanation:"Replace vague phrases ('love to work hard') with specific, evidence-based claims.", hindiReason:"'Bahut passionate hoon' se kuch sabit nahin hota — example dein.", example:"❌ I am very hardworking. ✅ I have never missed a project deadline in 4 years." },
    { id:87, category:"grammar", wrongForm:"I am a B.Tech pass out in CSE.", correctForm:"I hold a B.Tech in Computer Science.", explanation:"'Pass out' = faint (international meaning). 'Graduate' or 'hold a degree' is standard.", hindiReason:"'Pass out' international English mein behosh hona hai — graduation ke liye 'graduate' bolein.", example:"❌ I am B.Tech passout. ✅ I hold a B.Tech in Computer Science." },
    { id:88, category:"grammar", wrongForm:"I am having my own startup.", correctForm:"I run my own startup. / I founded a startup.", explanation:"'Have' for possession is stative — no continuous form.", hindiReason:"Stative verb 'have' — 'am having' galat hai.", example:"❌ I am having a small business. ✅ I run a small business." },
    { id:89, category:"structure", wrongForm:"I am Rajan. I like sports. I have many friends. I like to travel.", correctForm:"I'm Rajan — I'm most alive when I'm on a mountain or playing cricket. I've climbed 3 peaks in Himachal and I'm working on a fourth.", explanation:"Personality emerges from specificity, not from generic statements.", hindiReason:"Generic statements (like sports, travel, friends) koi bhi bolta hai — kuch alag bolo.", example:"❌ I love traveling and making new friends. ✅ I've backpacked through 8 states solo and I'm still figuring out which one had the best food." },
    { id:90, category:"vocabulary", wrongForm:"I am a multitasker.", correctForm:"I manage multiple priorities effectively.", explanation:"'Multitasker' is a resume cliché. Research shows true multitasking is impossible. Rephrase.", hindiReason:"'Multitasker' ek cliché word hai — 'manage multiple priorities' better hai.", example:"❌ I am an excellent multitasker. ✅ I am effective at managing competing deadlines." },
    { id:91, category:"grammar", wrongForm:"I have a pet peeve of people who are late.", correctForm:"I strongly value punctuality.", explanation:"'Pet peeve' is casual — fine in conversation, but rephrase positively in professional contexts.", hindiReason:"'Pet peeve' informal hai — professional context mein positive framing dein.", example:"❌ My pet peeve is laziness. ✅ I value accountability and drive in a team." },
    { id:92, category:"vocabulary", wrongForm:"I am a topper in my college.", correctForm:"I graduated at the top of my class. / I was the batch topper.", explanation:"'Topper' is an Indian English term. Use 'top of my class' for international contexts.", hindiReason:"'Topper' Indian English term hai — international context mein 'top of my class' bolein.", example:"❌ I was school topper. ✅ I graduated at the top of my school batch." },
    { id:93, category:"grammar", wrongForm:"I am very much confident about myself.", correctForm:"I am confident in my abilities.", explanation:"'Confident about myself' is redundant — 'confidence' already implies self-belief.", hindiReason:"'Confident about myself' — 'myself' here is redundant.", example:"❌ I am very confident about myself. ✅ I am confident in my skills." },
    { id:94, category:"cultural", wrongForm:"I will devote my complete life to this organization.", correctForm:"I'm committed to this role and see myself growing with the organization long-term.", explanation:"Pledging your 'life' to a company sounds excessive — show commitment professionally.", hindiReason:"'Poori zindagi de dunga' — too extreme for professional context.", example:"❌ I will give everything for this company. ✅ I'm looking for a long-term role to build and grow." },
    { id:95, category:"grammar", wrongForm:"I am studying from last 3 years.", correctForm:"I have been studying for the last 3 years.", explanation:"'From' with duration → 'for'. Present perfect for ongoing actions.", hindiReason:"'From' → 'for' duration ke liye, aur tense change karo.", example:"❌ I am learning English from 2 years. ✅ I have been learning English for 2 years." },
    { id:96, category:"vocabulary", wrongForm:"I give 100% in everything.", correctForm:"I am committed to excellence in every project I take on.", explanation:"'Give 100%' is a sports cliché that sounds hollow in professional contexts.", hindiReason:"'100% deta hoon' cliché hai — specific example dein.", example:"❌ I give 110% every time. ✅ I take ownership of every project and see it through." },
    { id:97, category:"grammar", wrongForm:"Despite of my weaknesses, I work very hard.", correctForm:"Despite my weaknesses, I work very hard.", explanation:"'Despite' does NOT take 'of'. 'In spite of' does. 'Despite' is used alone.", hindiReason:"'Despite of' — 'of' nahi lagata despite ke saath.", example:"❌ Despite of the rain, we played. ✅ Despite the rain, we played." },
    { id:98, category:"pronunciation", wrongForm:"Pronouncing 'th' as 'd' or 't' — 'dis' instead of 'this', 'tree' instead of 'three'", correctForm:"'th' requires tongue between teeth: /ð/ for 'this', /θ/ for 'three'", explanation:"The 'th' sound doesn't exist in Hindi. Practice by placing tongue between upper and lower front teeth.", hindiReason:"'th' Hindi mein nahi hota — tongue ko teeth ke beech rakho.", example:"Practice: this/dis, that/dat, three/tree, think/tink, the/de" },
    { id:99, category:"vocabulary", wrongForm:"I am good at public dealing.", correctForm:"I am skilled at client communication. / I have strong interpersonal skills.", explanation:"'Public dealing' is Indian English. Use 'client communication' or 'interpersonal skills'.", hindiReason:"'Public dealing' Indian phrase hai — international English mein 'client communication' bolein.", example:"❌ I have good public dealing skills. ✅ I have strong communication and people skills." },
    { id:100, category:"cultural", wrongForm:"My introduction is now complete. Thank you for bearing with me.", correctForm:"Thank you for your time. I look forward to connecting further.", explanation:"'Bearing with me' implies you were a burden. End on a positive forward note.", hindiReason:"'Bearing with me' — 'sahna' waala meaning aata hai. Positive ending dein.", example:"❌ Thank you for listening to my boring introduction. ✅ Thank you — I'd love to continue the conversation." }
  ]
};

write('common-mistakes.json', commonMistakes);
console.log('Common Mistakes done!');
