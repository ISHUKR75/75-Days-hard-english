'use client'; // Render this component on the client side (browser), not the server

// ============================================================
// DAY 4: BE VERB — Complete Practice Page
// 75 Days Hard English Course
// Topic: Am / Is / Are / Was / Were — The Most Important English Verb
// Total Questions: 900+
// Total Vocabulary: 200+ words
// Grammar Focus: Be verb in positive, negative, question, and short answer forms
// File: app/(main)/practice/day-4/page.js
// Author: 75 Days Hard English Course
// ============================================================

// ── Imports ──────────────────────────────────────────────────
import dynamic from 'next/dynamic'; // Lazy-load heavy components
import Link from 'next/link'; // Navigation between pages
import { // Icons from lucide-react
  BookOpen, ArrowLeft, Zap, Star, Brain,
  Target, Trophy, Flame, CheckCircle2, Info,
  Lightbulb, Volume2, Award, PenTool, MessageSquare
} from 'lucide-react';

// ── Lazy-load quiz component (needs browser APIs for sound) ──
const PracticeQuizComponent = dynamic(
  () => import('@/components/quiz/PracticeQuiz'), // Import from components/quiz/
  {
    loading: () => ( // Show spinner while loading
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
    ssr: false, // Disable server-side rendering (audio API is browser-only)
  }
);

// ============================================================
// DAY 4 PRACTICE QUESTIONS — Be Verb (Am / Is / Are / Was / Were)
// 900+ Questions covering all patterns, contexts, and difficulty levels
// Format: { id, hindi, english, alternatives, hint, explanation, difficulty, category }
// ============================================================
const DAY_4_QUESTIONS = [

  // ──────────────────────────────────────────────────────────
  // SECTION 1: "AM" WITH "I" — Basic Positive Sentences
  // Pattern: I + am + noun/adjective/place
  // Hindi: मैं + हूँ
  // ──────────────────────────────────────────────────────────

  { // Question 1 — I am a student (basic noun)
    id: 'day4-q001',
    hindi: 'मैं एक छात्र हूँ।', // I am a student
    english: 'I am a student.', // Primary correct answer
    alternatives: ["I'm a student.", 'I am student.'], // Accepted alternatives
    hint: '"I" के साथ हमेशा "am" use होता है। I + am + a/an + noun।', // Hint in simple English
    explanation: '"I am" is the most basic English sentence. "Am" is the be verb for "I". Never use "is" or "are" with "I". Contraction: I\'m = I am. In formal writing, use full form "I am".',
    difficulty: 'easy', // Beginner level
    category: 'am-basic', // Category for filtering
    grammarRule: 'I + am + a/an + Noun', // Grammar rule
    tags: ['am', 'I', 'basic', 'noun', 'positive'], // Tags for search
    usageNote: 'Most basic self-introduction sentence in English.', // When to use
    relatedSentences: ['I am a teacher.', 'I am an engineer.', 'I am a doctor.'], // Related
  },

  { // Question 2 — I am happy (basic adjective)
    id: 'day4-q002',
    hindi: 'मैं खुश हूँ।', // I am happy
    english: 'I am happy.', // Answer
    alternatives: ["I'm happy.", 'I feel happy.'], // Alternatives
    hint: 'खुश = happy. I + am + adjective.', // Hint
    explanation: '"I am happy" uses be verb with an adjective. After "I am" you can put any adjective to describe your state or feeling. Examples: I am tired, I am excited, I am nervous.',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective',
    tags: ['am', 'I', 'adjective', 'feeling', 'positive'],
    usageNote: 'Used to express feelings, emotions, and states.',
    relatedSentences: ['I am sad.', 'I am excited.', 'I am nervous.'],
  },

  { // Question 3 — I am a teacher
    id: 'day4-q003',
    hindi: 'मैं एक शिक्षक हूँ।', // I am a teacher
    english: 'I am a teacher.', // Answer
    alternatives: ["I'm a teacher.", 'I am teacher.'], // Alternatives
    hint: 'शिक्षक = teacher. Article "a" use करो।', // Hint
    explanation: 'When saying your profession, use "I am a/an + job". Use "a" before consonant sounds (a teacher, a doctor, a lawyer). Use "an" before vowel sounds (an engineer, an artist, an officer).',
    difficulty: 'easy',
    category: 'am-profession',
    grammarRule: 'I + am + a/an + Profession',
    tags: ['am', 'I', 'profession', 'job'],
    usageNote: 'Standard way to state your profession.',
    relatedSentences: ['I am an engineer.', 'I am a doctor.', 'I am a manager.'],
  },

  { // Question 4 — I am tired
    id: 'day4-q004',
    hindi: 'मैं थका हुआ हूँ।', // I am tired
    english: 'I am tired.', // Answer
    alternatives: ["I'm tired.", 'I am exhausted.'], // Alternatives
    hint: 'थका हुआ = tired/exhausted.', // Hint
    explanation: '"Tired" means you need rest. "Exhausted" is more intense - very very tired. Both use "I am + adjective" structure. Common daily use: "I am tired after work."',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective (state)',
    tags: ['am', 'tired', 'feeling', 'daily'],
    usageNote: 'Very common in daily conversation after work or exercise.',
    relatedSentences: ['I am sleepy.', 'I am exhausted.', 'I am very tired today.'],
  },

  { // Question 5 — I am from Delhi
    id: 'day4-q005',
    hindi: 'मैं दिल्ली से हूँ।', // I am from Delhi
    english: 'I am from Delhi.', // Answer
    alternatives: ["I'm from Delhi.", 'I come from Delhi.'], // Alternatives
    hint: '"से" = from. I + am + from + place.', // Hint
    explanation: '"I am from" + city/country tells where you are originally from. "I come from" is also correct. Common in introductions. "I am from India" - use country for foreigners, city for fellow Indians.',
    difficulty: 'easy',
    category: 'am-place',
    grammarRule: 'I + am + from + Place',
    tags: ['am', 'from', 'place', 'introduction'],
    usageNote: 'Used in self-introductions to tell your hometown.',
    relatedSentences: ['I am from Mumbai.', 'I am from India.', 'I am from Rajasthan.'],
  },

  { // Question 6 — I am 25 years old
    id: 'day4-q006',
    hindi: 'मैं 25 साल का हूँ।', // I am 25 years old
    english: 'I am 25 years old.', // Answer
    alternatives: ["I'm 25 years old.", 'I am 25.', 'I am twenty-five years old.'], // Alternatives
    hint: 'उम्र बताने के लिए: I am + number + years old.', // Hint
    explanation: 'To state age in English: "I am + age + years old". "Years old" is optional in casual speech. You can just say "I am 25." Never say "I have 25 years" - that is a Hindi-to-English error.',
    difficulty: 'easy',
    category: 'am-age',
    grammarRule: 'I + am + Number + years old',
    tags: ['am', 'age', 'years', 'introduction'],
    usageNote: 'Standard age expression. Never say "I have 25 years" (wrong!).',
    relatedSentences: ['I am 22 years old.', 'I am 30.', 'She is 28 years old.'],
  },

  { // Question 7 — I am busy
    id: 'day4-q007',
    hindi: 'मैं व्यस्त हूँ।', // I am busy
    english: 'I am busy.', // Answer
    alternatives: ["I'm busy.", 'I am occupied.'], // Alternatives
    hint: 'व्यस्त = busy.', // Hint
    explanation: '"I am busy" is one of the most used expressions in professional life. You can add more info: "I am busy right now", "I am busy with a project", "I am too busy to talk".',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective',
    tags: ['am', 'busy', 'professional', 'daily'],
    usageNote: 'Very common in office and professional settings.',
    relatedSentences: ['I am very busy.', 'I am busy right now.', 'I am busy with work.'],
  },

  { // Question 8 — I am an engineer
    id: 'day4-q008',
    hindi: 'मैं एक इंजीनियर हूँ।', // I am an engineer
    english: 'I am an engineer.', // Answer
    alternatives: ["I'm an engineer.", 'I work as an engineer.'], // Alternatives
    hint: '"engineer" vowel sound से शुरू होता है, इसलिए "an" use होता है।', // Hint
    explanation: 'Use "an" (not "a") before words starting with a vowel SOUND: an engineer, an artist, an officer, an MBA, an hour. Use "a" before consonant sounds: a manager, a teacher, a doctor.',
    difficulty: 'easy',
    category: 'am-profession',
    grammarRule: 'I + am + an + Noun (vowel sound)',
    tags: ['am', 'an', 'engineer', 'profession'],
    usageNote: 'Remember: "an" before vowel sounds (a, e, i, o, u).',
    relatedSentences: ['I am an officer.', 'I am an artist.', 'I am an MBA.'],
  },

  { // Question 9 — I am at home
    id: 'day4-q009',
    hindi: 'मैं घर पर हूँ।', // I am at home
    english: 'I am at home.', // Answer
    alternatives: ["I'm at home.", 'I am home.'], // Alternatives
    hint: 'घर पर = at home.', // Hint
    explanation: '"I am at home" means you are currently in your house. "I am home" (without "at") is more casual American English. Use "at" with most places: at school, at work, at the office, at the hospital.',
    difficulty: 'easy',
    category: 'am-location',
    grammarRule: 'I + am + at + Place',
    tags: ['am', 'at', 'home', 'location'],
    usageNote: 'Used to tell your current location.',
    relatedSentences: ['I am at work.', 'I am at school.', 'I am at the office.'],
  },

  { // Question 10 — I am ready
    id: 'day4-q010',
    hindi: 'मैं तैयार हूँ।', // I am ready
    english: 'I am ready.', // Answer
    alternatives: ["I'm ready.", 'I am all set.'], // Alternatives
    hint: 'तैयार = ready.', // Hint
    explanation: '"I am ready" is extremely useful in professional and daily life. Variations: "I am ready to start", "I am ready for the meeting", "I am almost ready" (लगभग तैयार), "I am not ready yet" (अभी नहीं).',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective',
    tags: ['am', 'ready', 'professional', 'common'],
    usageNote: 'Very common before starting meetings, presentations, or tasks.',
    relatedSentences: ['I am ready to start.', 'I am almost ready.', 'I am not ready yet.'],
  },

  { // Question 11 — I am a software developer
    id: 'day4-q011',
    hindi: 'मैं एक सॉफ्टवेयर डेवलपर हूँ।', // I am a software developer
    english: 'I am a software developer.', // Answer
    alternatives: ["I'm a software developer.", 'I am a developer.', 'I am a programmer.'], // Alternatives
    hint: 'software developer = सॉफ्टवेयर बनाने वाला।', // Hint
    explanation: '"Software developer" is one of the most common IT professions. Related: "I am a software engineer", "I am a web developer", "I am a full-stack developer", "I am a backend developer".',
    difficulty: 'easy',
    category: 'am-profession',
    grammarRule: 'I + am + a + Compound Noun (profession)',
    tags: ['am', 'profession', 'tech', 'software'],
    usageNote: 'Common in IT industry introductions.',
    relatedSentences: ['I am a web developer.', 'I am a software engineer.', 'I am a data scientist.'],
  },

  { // Question 12 — I am married
    id: 'day4-q012',
    hindi: 'मैं शादीशुदा हूँ।', // I am married
    english: 'I am married.', // Answer
    alternatives: ["I'm married.", 'I got married.'], // Alternatives
    hint: 'शादीशुदा = married.', // Hint
    explanation: '"I am married" (state). "I got married" (event - when the marriage happened). "I am single" (unmarried). "I am divorced". Never say "I am marry" - wrong!',
    difficulty: 'easy',
    category: 'am-status',
    grammarRule: 'I + am + Past Participle (as adjective)',
    tags: ['am', 'married', 'status', 'personal'],
    usageNote: 'Used in personal conversations and official forms.',
    relatedSentences: ['I am single.', 'I am engaged.', 'I am divorced.'],
  },

  { // Question 13 — I am confident
    id: 'day4-q013',
    hindi: 'मैं आत्मविश्वासी हूँ।', // I am confident
    english: 'I am confident.', // Answer
    alternatives: ["I'm confident.", 'I feel confident.'], // Alternatives
    hint: 'आत्मविश्वासी = confident.', // Hint
    explanation: '"I am confident" means you believe in yourself. Very useful in interviews: "I am confident in my skills", "I am confident I can handle this task". Opposite: "I am nervous/anxious".',
    difficulty: 'medium',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective (personality)',
    tags: ['am', 'confident', 'interview', 'professional'],
    usageNote: 'Powerful word for interviews and professional settings.',
    relatedSentences: ['I am confident in my abilities.', 'I am not nervous.', 'I am well-prepared.'],
  },

  { // Question 14 — I am in the office
    id: 'day4-q014',
    hindi: 'मैं ऑफिस में हूँ।', // I am in the office
    english: 'I am in the office.', // Answer
    alternatives: ["I'm in the office.", 'I am at the office.'], // Alternatives
    hint: 'ऑफिस में = in the office / at the office.', // Hint
    explanation: '"In the office" and "at the office" both mean you are physically at your workplace. "In" suggests inside the building. "At" refers to the location generally. Both are correct and commonly used.',
    difficulty: 'easy',
    category: 'am-location',
    grammarRule: 'I + am + in/at + the + Place',
    tags: ['am', 'office', 'location', 'professional'],
    usageNote: 'Used to tell colleagues your current location.',
    relatedSentences: ['I am in a meeting.', 'I am at my desk.', 'I am working from home.'],
  },

  { // Question 15 — I am late
    id: 'day4-q015',
    hindi: 'मैं देर से आया हूँ / मुझे देर हो गई है।', // I am late
    english: 'I am late.', // Answer
    alternatives: ["I'm late.", 'I got late.'], // Alternatives
    hint: 'देर से आना = to be late.', // Hint
    explanation: '"I am late" means you arrived after the scheduled time. Professional phrases: "I am sorry, I am late", "I am running late" (अभी भी देर हो रही है, in progress). "I got late" is Indian English but understood.',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + Adjective (time)',
    tags: ['am', 'late', 'professional', 'apology'],
    usageNote: 'Always apologize when saying this in professional settings.',
    relatedSentences: ['I am sorry for being late.', 'I am running late.', 'I will be on time tomorrow.'],
  },

  { // Question 16 — I am very grateful
    id: 'day4-q016',
    hindi: 'मैं बहुत आभारी हूँ।', // I am very grateful
    english: 'I am very grateful.', // Answer
    alternatives: ["I'm very grateful.", 'I am so grateful.', 'I am extremely grateful.'], // Alternatives
    hint: 'आभारी = grateful/thankful.', // Hint
    explanation: '"Grateful" and "thankful" are synonyms. "I am grateful for this opportunity" - professional. "I am very grateful for your help" - polite. Adverbs to add: very, so, extremely, truly, deeply.',
    difficulty: 'medium',
    category: 'am-adjective',
    grammarRule: 'I + am + very/so/extremely + Adjective',
    tags: ['am', 'grateful', 'thankful', 'professional', 'polite'],
    usageNote: 'Used in thank-you emails, meetings, and professional communication.',
    relatedSentences: ['I am thankful.', 'I am deeply grateful.', 'I appreciate your help.'],
  },

  { // Question 17 — I am interested in this job
    id: 'day4-q017',
    hindi: 'मुझे इस नौकरी में रुचि है।', // I am interested in this job
    english: 'I am interested in this job.', // Answer
    alternatives: ["I'm interested in this position.", 'I am keen on this role.'], // Alternatives
    hint: 'रुचि है = interested in.', // Hint
    explanation: '"I am interested in + noun/gerund" — use this pattern for job applications, interviews. Examples: "I am interested in data science", "I am interested in joining your team", "I am not interested in this role".',
    difficulty: 'medium',
    category: 'am-adjective',
    grammarRule: 'I + am + interested in + Noun/Gerund',
    tags: ['am', 'interested', 'job', 'interview', 'professional'],
    usageNote: 'Critical phrase for job interviews and applications.',
    relatedSentences: ['I am interested in your company.', 'I am not interested.', 'I am very interested in this role.'],
  },

  { // Question 18 — I am responsible for this project
    id: 'day4-q018',
    hindi: 'मैं इस प्रोजेक्ट के लिए ज़िम्मेदार हूँ।', // I am responsible for this project
    english: 'I am responsible for this project.', // Answer
    alternatives: ["I'm responsible for this project.", 'I handle this project.'], // Alternatives
    hint: 'ज़िम्मेदार = responsible.', // Hint
    explanation: '"I am responsible for + noun" is very professional. Used in job descriptions and work introductions. "I am responsible for managing a team of 10 people", "I am responsible for client communication".',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + responsible for + Noun',
    tags: ['am', 'responsible', 'project', 'professional', 'work'],
    usageNote: 'Used in professional introductions and job interviews.',
    relatedSentences: ['I am in charge of this team.', 'I manage this project.', 'I am accountable for results.'],
  },

  { // Question 19 — I am very excited
    id: 'day4-q019',
    hindi: 'मैं बहुत उत्साहित हूँ।', // I am very excited
    english: 'I am very excited.', // Answer
    alternatives: ["I'm very excited.", 'I am so excited.', 'I am thrilled.'], // Alternatives
    hint: 'उत्साहित = excited.', // Hint
    explanation: '"I am excited" - medium level enthusiasm. "I am very excited" - high level. "I am thrilled" - extremely happy/excited. Professional use: "I am excited about this opportunity", "I am excited to join your team".',
    difficulty: 'easy',
    category: 'am-adjective',
    grammarRule: 'I + am + very + Adjective',
    tags: ['am', 'excited', 'emotion', 'professional'],
    usageNote: 'Great for expressing enthusiasm in interviews.',
    relatedSentences: ['I am excited about this opportunity.', 'I am thrilled to be here.', 'I am really looking forward to this.'],
  },

  { // Question 20 — I am not sure
    id: 'day4-q020',
    hindi: 'मुझे पक्का नहीं पता।', // I am not sure
    english: 'I am not sure.', // Answer
    alternatives: ["I'm not sure.", 'I am unsure.', "I don't know for sure."], // Alternatives
    hint: 'पक्का नहीं = not sure.', // Hint
    explanation: '"I am not sure" is a polite way to say you don\'t know something. More professional than "I don\'t know". Variations: "I am not sure about this", "I am not entirely sure", "I am not 100% sure".',
    difficulty: 'easy',
    category: 'am-negative',
    grammarRule: 'I + am + not + Adjective',
    tags: ['am', 'not', 'sure', 'negative', 'professional'],
    usageNote: 'Polite way to express uncertainty - better than "I don\'t know".',
    relatedSentences: ['I am not certain.', 'I am not confident about this.', 'Let me check and confirm.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 2: "IS" WITH HE / SHE / IT — Third Person Singular
  // Pattern: He/She/It + is + noun/adjective/place
  // Hindi: वह + है
  // ──────────────────────────────────────────────────────────

  { // Question 21 — He is a doctor
    id: 'day4-q021',
    hindi: 'वह एक डॉक्टर है।', // He is a doctor
    english: 'He is a doctor.', // Answer
    alternatives: ["He's a doctor.", 'He works as a doctor.'], // Alternatives
    hint: '"He" के साथ हमेशा "is" use होता है।', // Hint
    explanation: '"Is" is the be verb for he, she, and it. He is, She is, It is. Contraction: He\'s, She\'s, It\'s. Never say "He am" or "He are" - these are always wrong.',
    difficulty: 'easy',
    category: 'is-profession',
    grammarRule: 'He/She/It + is + a/an + Noun',
    tags: ['is', 'he', 'profession', 'doctor'],
    usageNote: 'Standard way to describe someone\'s profession.',
    relatedSentences: ['She is a nurse.', 'He is an engineer.', 'She is a teacher.'],
  },

  { // Question 22 — She is beautiful
    id: 'day4-q022',
    hindi: 'वह सुंदर है।', // She is beautiful
    english: 'She is beautiful.', // Answer
    alternatives: ["She's beautiful.", 'She is very pretty.', 'She looks beautiful.'], // Alternatives
    hint: '"She" के साथ "is" use होता है।', // Hint
    explanation: '"She is beautiful" describes appearance. "She looks beautiful" focuses on how she appears right now (present observation). "She is pretty", "She is gorgeous", "She is attractive" - synonyms with different intensities.',
    difficulty: 'easy',
    category: 'is-adjective',
    grammarRule: 'She + is + Adjective (appearance)',
    tags: ['is', 'she', 'adjective', 'beautiful', 'description'],
    usageNote: 'Used to describe someone\'s appearance.',
    relatedSentences: ['She is smart.', 'She is talented.', 'She is very kind.'],
  },

  { // Question 23 — He is my friend
    id: 'day4-q023',
    hindi: 'वह मेरा दोस्त है।', // He is my friend
    english: 'He is my friend.', // Answer
    alternatives: ["He's my friend.", 'He is a good friend of mine.'], // Alternatives
    hint: 'दोस्त = friend.', // Hint
    explanation: '"He is my friend" - possessive relationship. "She is my sister", "He is my colleague", "She is my manager" - all follow the same pattern: He/She + is + my/your/their + noun.',
    difficulty: 'easy',
    category: 'is-relationship',
    grammarRule: 'He/She + is + my/your/his/her + Noun',
    tags: ['is', 'he', 'friend', 'relationship', 'possessive'],
    usageNote: 'Describing relationships with others.',
    relatedSentences: ['She is my sister.', 'He is my colleague.', 'She is my boss.'],
  },

  { // Question 24 — It is very hot today
    id: 'day4-q024',
    hindi: 'आज बहुत गर्मी है।', // It is very hot today
    english: 'It is very hot today.', // Answer
    alternatives: ["It's very hot today.", 'It is so hot.', 'Today is very hot.'], // Alternatives
    hint: 'मौसम के लिए "It is" use होता है।', // Hint
    explanation: '"It" is used for weather, temperature, time, and distance. "It is hot/cold/raining/cloudy." Never say "The weather is hot" (though technically correct, "It is hot" is more natural). "It is 40 degrees outside."',
    difficulty: 'easy',
    category: 'it-weather',
    grammarRule: 'It + is + Adjective (weather)',
    tags: ['is', 'it', 'weather', 'hot', 'daily'],
    usageNote: '"It" for weather is a special English rule - very different from Hindi.',
    relatedSentences: ["It is cold today.", "It is raining.", "It is very humid."],
  },

  { // Question 25 — She is at school
    id: 'day4-q025',
    hindi: 'वह स्कूल में है।', // She is at school
    english: 'She is at school.', // Answer
    alternatives: ["She's at school.", 'She is in school.'], // Alternatives
    hint: 'स्कूल में = at school.', // Hint
    explanation: '"At school" means attending school (not inside the building per se). Compare: "The book is in school" (inside) vs "She is at school" (she\'s a student there, attending). "At work", "at the hospital", "at the bank" - same pattern.',
    difficulty: 'easy',
    category: 'is-location',
    grammarRule: 'She/He + is + at + Place',
    tags: ['is', 'she', 'school', 'location'],
    usageNote: '"At" + place for where someone currently is.',
    relatedSentences: ['He is at work.', 'She is at the hospital.', 'He is at the gym.'],
  },

  { // Question 26 — He is very intelligent
    id: 'day4-q026',
    hindi: 'वह बहुत बुद्धिमान है।', // He is very intelligent
    english: 'He is very intelligent.', // Answer
    alternatives: ["He's very intelligent.", 'He is very smart.', 'He is brilliant.'], // Alternatives
    hint: 'बुद्धिमान = intelligent/smart/brilliant.', // Hint
    explanation: 'Intelligence adjectives in order of intensity: smart < intelligent < brilliant < genius. "He is smart" (casual), "He is intelligent" (neutral/formal), "He is brilliant" (very high praise), "He is a genius" (highest).',
    difficulty: 'easy',
    category: 'is-adjective',
    grammarRule: 'He + is + very + Adjective',
    tags: ['is', 'he', 'intelligent', 'smart', 'adjective'],
    usageNote: 'Describing someone\'s mental ability.',
    relatedSentences: ['She is brilliant.', 'He is very clever.', 'She is highly intelligent.'],
  },

  { // Question 27 — It is a good idea
    id: 'day4-q027',
    hindi: 'यह एक अच्छा विचार है।', // It is a good idea
    english: 'It is a good idea.', // Answer
    alternatives: ["It's a good idea.", 'That is a good idea.', 'That sounds like a good idea.'], // Alternatives
    hint: 'यह/वह एक अच्छा विचार = It is a good idea.', // Hint
    explanation: '"It is a good idea" or "That is a good idea" - both are used in conversations and meetings to agree or show approval. Professional: "That is an excellent idea!", "It sounds like a great plan."',
    difficulty: 'easy',
    category: 'it-phrase',
    grammarRule: 'It/That + is + a/an + Adjective + Noun',
    tags: ['is', 'it', 'idea', 'agreement', 'professional'],
    usageNote: 'Used to agree or show approval in meetings and conversations.',
    relatedSentences: ['That is a great suggestion.', 'It is an excellent plan.', 'That is a wonderful idea.'],
  },

  { // Question 28 — She is the manager
    id: 'day4-q028',
    hindi: 'वह मैनेजर हैं।', // She is the manager
    english: 'She is the manager.', // Answer
    alternatives: ["She's the manager.", 'She is our manager.'], // Alternatives
    hint: 'मैनेजर = manager. "the" = specific person.', // Hint
    explanation: '"She is the manager" (specific, unique role - use "the"). "She is a manager" (she has this job title but there might be others). Use "the" for specific unique roles: the CEO, the president, the director.',
    difficulty: 'medium',
    category: 'is-profession',
    grammarRule: 'She + is + the/a + Noun (role)',
    tags: ['is', 'she', 'manager', 'article', 'professional'],
    usageNote: 'Use "the" for specific unique roles, "a" for general job titles.',
    relatedSentences: ['He is the CEO.', 'She is a senior manager.', 'He is the team leader.'],
  },

  { // Question 29 — He is absent today
    id: 'day4-q029',
    hindi: 'वह आज अनुपस्थित है।', // He is absent today
    english: 'He is absent today.', // Answer
    alternatives: ["He's absent today.", 'He is not here today.', 'He is away today.'], // Alternatives
    hint: 'अनुपस्थित = absent.', // Hint
    explanation: '"He is absent" (formal, used in official contexts). "He is not here" (casual, conversational). "He is away" (traveling or not available). All use "is" with "he".',
    difficulty: 'easy',
    category: 'is-adjective',
    grammarRule: 'He + is + Adjective (status)',
    tags: ['is', 'he', 'absent', 'office', 'status'],
    usageNote: 'Used in attendance, office, and school contexts.',
    relatedSentences: ['She is present.', 'He is on leave.', 'She is working from home.'],
  },

  { // Question 30 — She is on leave
    id: 'day4-q030',
    hindi: 'वह छुट्टी पर है।', // She is on leave
    english: 'She is on leave.', // Answer
    alternatives: ["She's on leave.", 'She is taking a day off.', 'She is on vacation.'], // Alternatives
    hint: 'छुट्टी पर = on leave.', // Hint
    explanation: '"On leave" = officially away from work (sick leave, casual leave, maternity leave, etc.). "On vacation" = holiday. "Taking a day off" = casual. Professional: "She is currently on maternity leave", "He is on sick leave".',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'She + is + on + Noun (status)',
    tags: ['is', 'she', 'leave', 'office', 'professional'],
    usageNote: 'Used to explain someone\'s absence in professional contexts.',
    relatedSentences: ['He is on sick leave.', 'She is on vacation.', 'He is taking a day off.'],
  },

  { // Question 31 — It is 3 o'clock
    id: 'day4-q031',
    hindi: 'अभी 3 बजे हैं।', // It is 3 o'clock
    english: "It is 3 o'clock.", // Answer
    alternatives: ["It's 3 o'clock.", 'It is 3 PM.', 'It is 3 in the afternoon.'], // Alternatives
    hint: 'समय बताने के लिए "It is" use होता है।', // Hint
    explanation: 'For telling time, always use "It is" or "It\'s": "It is 3 o\'clock", "It is half past 4" (4:30), "It is quarter to 6" (5:45), "It is noon/midnight". Never use "I am" or "he is" for time.',
    difficulty: 'easy',
    category: 'it-time',
    grammarRule: "It + is + Time",
    tags: ['is', 'it', 'time', 'daily', 'common'],
    usageNote: '"It is" for time is mandatory in English.',
    relatedSentences: ["It is 8 AM.", "It is half past 5.", "It is almost midnight."],
  },

  { // Question 32 — He is very hardworking
    id: 'day4-q032',
    hindi: 'वह बहुत मेहनती है।', // He is very hardworking
    english: 'He is very hardworking.', // Answer
    alternatives: ["He's very hardworking.", 'He is very diligent.', 'He is a hard worker.'], // Alternatives
    hint: 'मेहनती = hardworking/diligent.', // Hint
    explanation: '"Hardworking" (one word, adjective) or "a hard worker" (noun phrase) - both correct. Interview: "I am hardworking and dedicated." Related: diligent, industrious, dedicated, committed - all professional synonyms.',
    difficulty: 'medium',
    category: 'is-adjective',
    grammarRule: 'He + is + very + Adjective (personality)',
    tags: ['is', 'he', 'hardworking', 'professional', 'personality'],
    usageNote: 'Very useful in reference letters and performance reviews.',
    relatedSentences: ['She is very dedicated.', 'He is extremely diligent.', 'She is a hard worker.'],
  },

  { // Question 33 — She is pregnant
    id: 'day4-q033',
    hindi: 'वह गर्भवती है।', // She is pregnant
    english: 'She is pregnant.', // Answer
    alternatives: ["She's pregnant.", 'She is expecting a baby.'], // Alternatives
    hint: 'गर्भवती = pregnant.', // Hint
    explanation: '"She is pregnant" (direct). "She is expecting" or "She is expecting a baby" (more polite/indirect). "She is X months pregnant" (specific). This is medical/personal information - use politely.',
    difficulty: 'medium',
    category: 'is-status',
    grammarRule: 'She + is + Adjective (physical state)',
    tags: ['is', 'she', 'pregnant', 'personal', 'medical'],
    usageNote: 'Use politely. "She is expecting" is a softer alternative.',
    relatedSentences: ['She is 6 months pregnant.', 'She is expecting in March.', 'She is on maternity leave.'],
  },

  { // Question 34 — It is not possible
    id: 'day4-q034',
    hindi: 'यह संभव नहीं है।', // It is not possible
    english: 'It is not possible.', // Answer
    alternatives: ["It's not possible.", "It isn't possible.", 'That is not possible.'], // Alternatives
    hint: 'संभव नहीं = not possible.', // Hint
    explanation: '"It is not possible" is professional and polite. More formal: "That would not be possible." Alternatives: "It cannot be done", "That is not feasible". Never just say "No" in professional settings - always give a reason.',
    difficulty: 'medium',
    category: 'is-negative',
    grammarRule: 'It + is + not + Adjective',
    tags: ['is', 'it', 'not', 'possible', 'professional', 'negative'],
    usageNote: 'Professional way to say no - add a reason if possible.',
    relatedSentences: ['It is not feasible.', 'That would not be possible.', 'Unfortunately, it cannot be done.'],
  },

  { // Question 35 — He is 6 feet tall
    id: 'day4-q035',
    hindi: 'वह 6 फुट लंबा है।', // He is 6 feet tall
    english: 'He is 6 feet tall.', // Answer
    alternatives: ["He's 6 feet tall.", "He is six feet tall."], // Alternatives
    hint: 'Height: He + is + number + feet + tall.', // Hint
    explanation: 'Height in English: "He is 6 feet tall" or "He is 6 foot tall" (both used). In metric: "He is 180 cm tall". Can omit "tall": "He is 6 feet". In conversation: "How tall are you?" "I am 5 feet 8 inches."',
    difficulty: 'medium',
    category: 'is-measurement',
    grammarRule: 'He + is + Number + Feet/cm + tall',
    tags: ['is', 'he', 'tall', 'height', 'measurement'],
    usageNote: 'Used when describing someone\'s physical appearance.',
    relatedSentences: ['She is 5 feet 5 inches tall.', 'He is quite tall.', 'She is of medium height.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 3: "ARE" WITH WE / YOU / THEY
  // Pattern: We/You/They + are + noun/adjective/place
  // Hindi: हम/तुम/वे + हैं
  // ──────────────────────────────────────────────────────────

  { // Question 36 — We are ready
    id: 'day4-q036',
    hindi: 'हम तैयार हैं।', // We are ready
    english: 'We are ready.', // Answer
    alternatives: ["We're ready.", 'We are all set.'], // Alternatives
    hint: '"We" के साथ "are" use होता है।', // Hint
    explanation: '"Are" is used with We, You, and They. We are, You are, They are. Contractions: We\'re, You\'re, They\'re. Common in team settings: "We are ready to start", "We are prepared", "We are fully committed".',
    difficulty: 'easy',
    category: 'are-we',
    grammarRule: 'We + are + Adjective',
    tags: ['are', 'we', 'ready', 'team', 'professional'],
    usageNote: 'Used in team contexts and group settings.',
    relatedSentences: ['We are prepared.', 'We are committed.', 'We are done.'],
  },

  { // Question 37 — You are very kind
    id: 'day4-q037',
    hindi: 'आप बहुत दयालु हैं।', // You are very kind
    english: 'You are very kind.', // Answer
    alternatives: ["You're very kind.", 'You are so kind.'], // Alternatives
    hint: '"You" के साथ "are" use होता है।', // Hint
    explanation: '"You are" is used for both singular (तुम/आप) and plural (तुम लोग/आप लोग). There is no difference in English! "You are very kind" = 1 person or many people. Context decides.',
    difficulty: 'easy',
    category: 'are-you',
    grammarRule: 'You + are + Adjective',
    tags: ['are', 'you', 'kind', 'compliment', 'polite'],
    usageNote: 'English "you" covers both singular and plural.',
    relatedSentences: ['You are very helpful.', 'You are very professional.', 'You are doing great.'],
  },

  { // Question 38 — They are students
    id: 'day4-q038',
    hindi: 'वे छात्र हैं।', // They are students
    english: 'They are students.', // Answer
    alternatives: ["They're students.", 'They are all students.'], // Alternatives
    hint: '"They" के साथ "are" use होता है।', // Hint
    explanation: '"They are students" - note: noun becomes plural when subject is "they". "He is a student" (singular: a + noun), "They are students" (plural: no article, noun + s). This is a key English grammar rule.',
    difficulty: 'easy',
    category: 'are-they',
    grammarRule: 'They + are + Plural Noun',
    tags: ['are', 'they', 'students', 'plural', 'basic'],
    usageNote: 'Noun becomes plural with "they" - no "a/an" article.',
    relatedSentences: ['They are engineers.', 'They are doctors.', 'They are my colleagues.'],
  },

  { // Question 39 — We are a team
    id: 'day4-q039',
    hindi: 'हम एक टीम हैं।', // We are a team
    english: 'We are a team.', // Answer
    alternatives: ["We're a team.", 'We work as a team.'], // Alternatives
    hint: 'We + are + a + noun (collective).', // Hint
    explanation: '"We are a team" - even though "we" is plural, "a team" is singular (one team). You can use "a" before collective nouns. "We are a family", "We are a great company", "We are one unit".',
    difficulty: 'medium',
    category: 'are-we',
    grammarRule: 'We + are + a + Collective Noun',
    tags: ['are', 'we', 'team', 'collective', 'professional'],
    usageNote: 'Motivational phrase used in team-building and office settings.',
    relatedSentences: ['We are a strong team.', 'We are one company.', 'We are a family.'],
  },

  { // Question 40 — They are very experienced
    id: 'day4-q040',
    hindi: 'वे बहुत अनुभवी हैं।', // They are very experienced
    english: 'They are very experienced.', // Answer
    alternatives: ["They're very experienced.", 'They are highly experienced.'], // Alternatives
    hint: 'अनुभवी = experienced.', // Hint
    explanation: '"Experienced" as an adjective: "They are experienced professionals". Adverbs: "highly experienced", "very experienced", "extremely experienced". Opposite: "inexperienced" (अनुभवहीन).',
    difficulty: 'medium',
    category: 'are-they',
    grammarRule: 'They + are + very + Adjective',
    tags: ['are', 'they', 'experienced', 'professional'],
    usageNote: 'Used when describing a team\'s or group\'s qualifications.',
    relatedSentences: ['They are highly qualified.', 'They are very skilled.', 'They are well-trained.'],
  },

  { // Question 41 — You are an excellent candidate
    id: 'day4-q041',
    hindi: 'आप एक उत्कृष्ट उम्मीदवार हैं।', // You are an excellent candidate
    english: 'You are an excellent candidate.', // Answer
    alternatives: ["You're an excellent candidate.", 'You are a very strong candidate.'], // Alternatives
    hint: 'उत्कृष्ट = excellent. उम्मीदवार = candidate.', // Hint
    explanation: '"Excellent" is higher praise than "good" or "great". Scale: good < great < excellent < outstanding < exceptional. In HR/interviews: "You are an excellent candidate for this role."',
    difficulty: 'medium',
    category: 'are-you',
    grammarRule: 'You + are + an + Adjective + Noun',
    tags: ['are', 'you', 'excellent', 'candidate', 'interview', 'HR'],
    usageNote: 'Used in job interviews and HR contexts.',
    relatedSentences: ['You are a strong candidate.', 'You are well-qualified.', 'You are the right person for this job.'],
  },

  { // Question 42 — We are not done yet
    id: 'day4-q042',
    hindi: 'हम अभी खत्म नहीं हुए।', // We are not done yet
    english: 'We are not done yet.', // Answer
    alternatives: ["We're not done yet.", "We aren't done yet.", 'We are still working.'], // Alternatives
    hint: 'खत्म नहीं = not done.', // Hint
    explanation: '"We are not done yet" = we haven\'t finished. "Yet" at the end makes it clear it\'s in progress. Professional: "We are not done with the report yet", "We are still finalizing the project".',
    difficulty: 'medium',
    category: 'are-negative',
    grammarRule: 'We + are + not + Adjective + yet',
    tags: ['are', 'we', 'not', 'done', 'yet', 'negative'],
    usageNote: '"Yet" means "until this moment" - implies work is in progress.',
    relatedSentences: ['We are still working on it.', 'We have not finished yet.', 'Give us a few more minutes.'],
  },

  { // Question 43 — They are from Japan
    id: 'day4-q043',
    hindi: 'वे जापान से हैं।', // They are from Japan
    english: 'They are from Japan.', // Answer
    alternatives: ["They're from Japan.", 'They come from Japan.'], // Alternatives
    hint: 'जापान से = from Japan.', // Hint
    explanation: '"They are from Japan" - plural subject with "are". "He is from Japan" - singular. "We are from India" - we, plural. The country/place never changes - only the be verb changes with the subject.',
    difficulty: 'easy',
    category: 'are-they',
    grammarRule: 'They + are + from + Country',
    tags: ['are', 'they', 'from', 'country', 'introduction'],
    usageNote: 'Used in introductions and when describing a group\'s origin.',
    relatedSentences: ['They are from China.', 'They are from America.', 'We are from India.'],
  },

  { // Question 44 — You are right
    id: 'day4-q044',
    hindi: 'आप सही हैं।', // You are right
    english: 'You are right.', // Answer
    alternatives: ["You're right.", 'You are correct.', 'That is correct.'], // Alternatives
    hint: 'सही = right/correct.', // Hint
    explanation: '"You are right" (casual/neutral). "You are correct" (more formal). In meetings: "You are absolutely right", "You are making a valid point", "I completely agree with you". Use to acknowledge someone\'s correctness.',
    difficulty: 'easy',
    category: 'are-you',
    grammarRule: 'You + are + Adjective (agreement)',
    tags: ['are', 'you', 'right', 'correct', 'agreement', 'professional'],
    usageNote: 'Very important in professional discussions and debates.',
    relatedSentences: ['You are absolutely right.', 'You are making a great point.', 'I agree with you.'],
  },

  { // Question 45 — We are on the same page
    id: 'day4-q045',
    hindi: 'हम एक ही बात पर सहमत हैं।', // We are on the same page
    english: 'We are on the same page.', // Answer
    alternatives: ["We're on the same page.", 'We are in agreement.', 'We both understand the same thing.'], // Alternatives
    hint: '"On the same page" = एक ही बात पर सहमत होना।', // Hint
    explanation: '"We are on the same page" is a business idiom meaning everyone understands and agrees. Very common in office: "Are we on the same page?", "Good, we are on the same page now", "I want to make sure we are on the same page".',
    difficulty: 'hard',
    category: 'are-idiom',
    grammarRule: 'We + are + on the same page (idiomatic)',
    tags: ['are', 'we', 'idiom', 'business', 'agreement', 'professional'],
    usageNote: 'Very common business idiom - essential for office English.',
    relatedSentences: ['Are we aligned?', 'Do we all agree?', 'Is everyone on board?'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 4: NEGATIVE FORMS — Am Not / Isn't / Aren't
  // Pattern: Subject + am/is/are + not + adjective/noun
  // Hindi: ... नहीं हूँ / नहीं है / नहीं हैं
  // ──────────────────────────────────────────────────────────

  { // Question 46 — I am not a student
    id: 'day4-q046',
    hindi: 'मैं छात्र नहीं हूँ।', // I am not a student
    english: 'I am not a student.', // Answer
    alternatives: ["I'm not a student.", 'I am no longer a student.'], // Alternatives
    hint: 'नहीं = not. I + am + not + noun.', // Hint
    explanation: 'Negative: I am NOT (never "amn\'t"). He/She/It is NOT = He isn\'t = He\'s not. We/You/They are NOT = We aren\'t = We\'re not. Remember: "I amn\'t" does NOT exist in English!',
    difficulty: 'easy',
    category: 'am-not',
    grammarRule: 'I + am + not + a/an + Noun',
    tags: ['am', 'not', 'negative', 'basic'],
    usageNote: '"Amn\'t" does not exist! Always use "am not" (no contraction for I+am+not).',
    relatedSentences: ['I am not a doctor.', 'I am not from here.', 'I am not ready.'],
  },

  { // Question 47 — He is not here
    id: 'day4-q047',
    hindi: 'वह यहाँ नहीं है।', // He is not here
    english: 'He is not here.', // Answer
    alternatives: ["He isn't here.", "He's not here.", 'He is away.'], // Alternatives
    hint: 'is not / isn\'t — दोनों सही हैं।', // Hint
    explanation: '"Is not" has two contractions: "isn\'t" and "s not" (he\'s not). Both are equally correct. "He is not here" = formal. "He isn\'t here" = normal. "He\'s not here" = casual. All three mean the same thing.',
    difficulty: 'easy',
    category: 'isnt',
    grammarRule: "He + is + not = He isn't = He's not",
    tags: ['is', 'not', "isn't", 'negative', 'contraction'],
    usageNote: '"Isn\'t" and "s not" are both correct contractions of "is not".',
    relatedSentences: ["She isn't available.", "It isn't working.", "He's not in the office."],
  },

  { // Question 48 — She is not ready
    id: 'day4-q048',
    hindi: 'वह तैयार नहीं है।', // She is not ready
    english: 'She is not ready.', // Answer
    alternatives: ["She isn't ready.", "She's not ready."], // Alternatives
    hint: 'तैयार नहीं = not ready.', // Hint
    explanation: '"She is not ready" - when she needs more time. Professional context: "The report is not ready yet", "The product is not ready for launch", "The team is not ready for the presentation".',
    difficulty: 'easy',
    category: 'isnt',
    grammarRule: "She + is + not + Adjective",
    tags: ['is', 'not', 'she', 'ready', 'negative'],
    usageNote: 'Common in project management and team contexts.',
    relatedSentences: ["The project isn't ready.", "She isn't prepared.", "The team is not ready."],
  },

  { // Question 49 — We are not happy with this
    id: 'day4-q049',
    hindi: 'हम इससे खुश नहीं हैं।', // We are not happy with this
    english: 'We are not happy with this.', // Answer
    alternatives: ["We aren't happy with this.", "We're not happy with this.", 'We are dissatisfied with this.'], // Alternatives
    hint: 'खुश नहीं = not happy.', // Hint
    explanation: 'Professional complaint phrasing: "We are not happy with the quality", "We are not satisfied with the service". More formal: "We are dissatisfied" or "We are concerned about". Always follow with a reason.',
    difficulty: 'medium',
    category: 'arent',
    grammarRule: "We + are + not + Adjective + with + this",
    tags: ['are', 'not', 'we', 'happy', 'complaint', 'professional'],
    usageNote: 'Professional way to express dissatisfaction - always add specifics.',
    relatedSentences: ["We aren't satisfied with the quality.", "We're concerned about the delay.", "We are not pleased with the outcome."],
  },

  { // Question 50 — They are not available
    id: 'day4-q050',
    hindi: 'वे उपलब्ध नहीं हैं।', // They are not available
    english: 'They are not available.', // Answer
    alternatives: ["They aren't available.", "They're not available.", 'They are unavailable.'], // Alternatives
    hint: 'उपलब्ध नहीं = not available.', // Hint
    explanation: '"Available" (उपलब्ध) - opposite is "unavailable" (अनुपलब्ध). Professional: "I am not available on Monday", "The product is not available", "The team is not available for this project".',
    difficulty: 'medium',
    category: 'arent',
    grammarRule: "They + are + not + Adjective",
    tags: ['are', 'not', 'they', 'available', 'professional'],
    usageNote: 'Very common in scheduling and professional communication.',
    relatedSentences: ["She isn't available today.", "We're not free at that time.", "He is unavailable until Thursday."],
  },

  { // Question 51 — It is not working
    id: 'day4-q051',
    hindi: 'यह काम नहीं कर रहा।', // It is not working
    english: 'It is not working.', // Answer
    alternatives: ["It isn't working.", "It's not working.", 'It does not work.'], // Alternatives
    hint: 'काम नहीं कर रहा = not working.', // Hint
    explanation: '"It is not working" - the machine/system is currently broken. "It does not work" - it never works (permanent). Important difference: "is not working" = current state, "does not work" = general fact.',
    difficulty: 'medium',
    category: 'isnt',
    grammarRule: "It + is + not + present participle",
    tags: ['is', 'not', 'it', 'working', 'technical'],
    usageNote: 'Used for technical issues and troubleshooting.',
    relatedSentences: ["The system isn't working.", "The internet is not working.", "The printer doesn't work."],
  },

  { // Question 52 — I am not satisfied
    id: 'day4-q052',
    hindi: 'मैं संतुष्ट नहीं हूँ।', // I am not satisfied
    english: 'I am not satisfied.', // Answer
    alternatives: ["I'm not satisfied.", 'I am unsatisfied.', 'I am not pleased.'], // Alternatives
    hint: 'संतुष्ट नहीं = not satisfied/unsatisfied.', // Hint
    explanation: '"Unsatisfied" = not satisfied (prefix un-). Professional feedback: "I am not satisfied with the progress", "I am not fully satisfied with this solution". Always follow with specifics in professional settings.',
    difficulty: 'medium',
    category: 'am-not',
    grammarRule: "I + am + not + Adjective",
    tags: ['am', 'not', 'satisfied', 'feedback', 'professional'],
    usageNote: 'Used in feedback, reviews, and professional evaluations.',
    relatedSentences: ["I'm not happy with this.", "I am not convinced.", "I am dissatisfied with the results."],
  },

  { // Question 53 — He is not a good fit
    id: 'day4-q053',
    hindi: 'वह इस काम के लिए सही नहीं है।', // He is not a good fit
    english: 'He is not a good fit.', // Answer
    alternatives: ["He isn't a good fit.", "He's not the right person for this.", 'He does not fit the role.'], // Alternatives
    hint: '"good fit" = किसी के लिए सही होना।', // Hint
    explanation: '"A good fit" means the person suits the role perfectly. "He is a perfect fit", "She is not a good fit for this position". HR/Interview phrase. Also: "This job is not a good fit for me" (when YOU are declining).',
    difficulty: 'hard',
    category: 'is-professional',
    grammarRule: "He + is + not + a + Adjective + Noun",
    tags: ['is', 'not', 'fit', 'HR', 'interview', 'professional'],
    usageNote: 'HR/recruitment phrase - important for professional English.',
    relatedSentences: ["She's a perfect fit.", "He doesn't match our requirements.", "This role isn't right for you."],
  },

  { // Question 54 — We are not on track
    id: 'day4-q054',
    hindi: 'हम सही रास्ते पर नहीं हैं।', // We are not on track
    english: 'We are not on track.', // Answer
    alternatives: ["We aren't on track.", "We're behind schedule.", 'We are falling behind.'], // Alternatives
    hint: '"On track" = सही तरीके से आगे बढ़ना।', // Hint
    explanation: '"On track" means progressing as planned. "We are on track" (good). "We are not on track" (there\'s a problem). "We are behind schedule" (similar meaning). Project management essential vocabulary.',
    difficulty: 'hard',
    category: 'are-professional',
    grammarRule: "We + are + not + on + Noun (idiomatic)",
    tags: ['are', 'not', 'track', 'project', 'management', 'business'],
    usageNote: 'Essential project management vocabulary.',
    relatedSentences: ["We are behind schedule.", "We need to catch up.", "The project is delayed."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 5: QUESTION FORM — Am I? / Is he? / Are they?
  // Pattern: Am/Is/Are + Subject + noun/adjective?
  // Hindi: क्या ... हूँ/है/हैं?
  // ──────────────────────────────────────────────────────────

  { // Question 55 — Am I right?
    id: 'day4-q055',
    hindi: 'क्या मैं सही हूँ?', // Am I right?
    english: 'Am I right?', // Answer
    alternatives: ['Am I correct?', 'Is that right?', 'Right?'], // Alternatives
    hint: 'प्रश्न बनाने के लिए "Am" को subject के पहले रखो।', // Hint
    explanation: 'To make a question with be verb: put the be verb BEFORE the subject. "I am right" → "Am I right?". "He is here" → "Is he here?". "They are ready" → "Are they ready?" - verb always comes first in yes/no questions.',
    difficulty: 'easy',
    category: 'question-am',
    grammarRule: 'Am + I + Adjective?',
    tags: ['am', 'question', 'right', 'correct'],
    usageNote: 'Asking for confirmation - very common in conversations.',
    relatedSentences: ['Am I correct?', 'Am I in the right place?', 'Am I late?'],
  },

  { // Question 56 — Is he your friend?
    id: 'day4-q056',
    hindi: 'क्या वह तुम्हारा दोस्त है?', // Is he your friend?
    english: 'Is he your friend?', // Answer
    alternatives: ['Is he a friend of yours?', 'Do you know him?'], // Alternatives
    hint: '"Is" को subject से पहले रखो।', // Hint
    explanation: '"Is he your friend?" - asking about relationship. Note the question structure: Is (verb) + he (subject) + your friend (complement)? Normal sentence: He is your friend. Question: reverse verb and subject.',
    difficulty: 'easy',
    category: 'question-is',
    grammarRule: 'Is + He + your + Noun?',
    tags: ['is', 'question', 'he', 'friend', 'relationship'],
    usageNote: 'Asking about someone\'s relationship with another person.',
    relatedSentences: ['Is she your sister?', 'Is he your colleague?', 'Is she your manager?'],
  },

  { // Question 57 — Are you busy now?
    id: 'day4-q057',
    hindi: 'क्या आप अभी व्यस्त हैं?', // Are you busy now?
    english: 'Are you busy now?', // Answer
    alternatives: ['Are you free now?', 'Do you have a moment?', 'Is this a good time?'], // Alternatives
    hint: '"Are" को "you" के पहले रखो।', // Hint
    explanation: '"Are you busy now?" - asking if someone is available. Before interrupting or starting a conversation, always ask this in professional settings. "Is this a good time?" is even more polite.',
    difficulty: 'easy',
    category: 'question-are',
    grammarRule: 'Are + you + Adjective?',
    tags: ['are', 'question', 'you', 'busy', 'professional', 'polite'],
    usageNote: 'Always ask this before disturbing a colleague - very professional.',
    relatedSentences: ['Are you free?', 'Do you have a minute?', 'Is this a good time to talk?'],
  },

  { // Question 58 — Is this your bag?
    id: 'day4-q058',
    hindi: 'क्या यह तुम्हारा बैग है?', // Is this your bag?
    english: 'Is this your bag?', // Answer
    alternatives: ['Does this bag belong to you?', 'Is that yours?'], // Alternatives
    hint: '"Is this + your + noun?" — belonging question.', // Hint
    explanation: '"Is this your bag?" = Is this bag belonging to you? "This" for near things (close to you), "that" for far things. You can also ask: "Whose bag is this?" (Whose = किसका).',
    difficulty: 'easy',
    category: 'question-this',
    grammarRule: 'Is + this + your + Noun?',
    tags: ['is', 'question', 'this', 'bag', 'possessive'],
    usageNote: 'Used when you find something and want to return it to the owner.',
    relatedSentences: ['Is this your phone?', 'Is that your seat?', 'Whose pen is this?'],
  },

  { // Question 59 — Are they from the same company?
    id: 'day4-q059',
    hindi: 'क्या वे एक ही कंपनी से हैं?', // Are they from the same company?
    english: 'Are they from the same company?', // Answer
    alternatives: ['Do they work for the same company?', 'Are they from the same organization?'], // Alternatives
    hint: 'same = वही/एक ही।', // Hint
    explanation: '"Are they from the same company?" - asking about a group\'s origin. "Same" means identical/the very one. Useful in business networking: "Are you from the same team?", "Are you all from the same department?"',
    difficulty: 'medium',
    category: 'question-are',
    grammarRule: 'Are + they + from + the same + Noun?',
    tags: ['are', 'question', 'they', 'company', 'business'],
    usageNote: 'Useful in networking events and business meetings.',
    relatedSentences: ['Are you from the same team?', 'Do they work together?', 'Are they in the same department?'],
  },

  { // Question 60 — Is the office open today?
    id: 'day4-q060',
    hindi: 'क्या ऑफिस आज खुला है?', // Is the office open today?
    english: 'Is the office open today?', // Answer
    alternatives: ['Is the office working today?', 'Are they open on Sunday?'], // Alternatives
    hint: 'खुला = open. Is + the + place + open?', // Hint
    explanation: '"Is the office open today?" - asking about availability/operating hours. Similar: "Is the bank open?", "Is the store open on Sunday?", "Is the hospital open 24/7?" - all use "Is + subject + open?".',
    difficulty: 'easy',
    category: 'question-is',
    grammarRule: 'Is + the + Noun + Adjective?',
    tags: ['is', 'question', 'open', 'office', 'daily'],
    usageNote: 'Asking about business hours or availability.',
    relatedSentences: ['Is the bank open today?', 'Is the shop closed?', 'Are you open on weekends?'],
  },

  { // Question 61 — Is she the new employee?
    id: 'day4-q061',
    hindi: 'क्या वह नई कर्मचारी है?', // Is she the new employee?
    english: 'Is she the new employee?', // Answer
    alternatives: ['Is she the new hire?', 'Did she just join?', 'Is she new here?'], // Alternatives
    hint: 'नई कर्मचारी = new employee/new hire.', // Hint
    explanation: '"New employee" or "new hire" = someone who just joined. "Is she new here?" is very casual and friendly. In office: "Are you the new intern?", "Is he the new manager?", "Are they the new batch?"',
    difficulty: 'medium',
    category: 'question-is',
    grammarRule: 'Is + she + the + Adjective + Noun?',
    tags: ['is', 'question', 'she', 'new', 'employee', 'office'],
    usageNote: 'Used when a new person joins a team or organization.',
    relatedSentences: ['Is he the new manager?', 'Are you new here?', 'Is she the new joiner?'],
  },

  { // Question 62 — Are you sure about this?
    id: 'day4-q062',
    hindi: 'क्या आप इसके बारे में पक्के हैं?', // Are you sure about this?
    english: 'Are you sure about this?', // Answer
    alternatives: ["Are you certain about this?", 'Are you confident about this?', 'Do you know this for sure?'], // Alternatives
    hint: 'पक्के = sure/certain.', // Hint
    explanation: '"Are you sure?" is a very common conversational phrase to double-check. Politer versions: "Are you certain?", "Are you 100% sure?". In business: "Are you sure about the deadline?", "Are you sure we have the budget?"',
    difficulty: 'easy',
    category: 'question-are',
    grammarRule: 'Are + you + Adjective + about + this?',
    tags: ['are', 'question', 'sure', 'confirmation', 'daily'],
    usageNote: 'Very common in conversations when you want to double-check.',
    relatedSentences: ['Are you certain?', 'Do you confirm?', 'Can you verify this?'],
  },

  { // Question 63 — Is it safe?
    id: 'day4-q063',
    hindi: 'क्या यह सुरक्षित है?', // Is it safe?
    english: 'Is it safe?', // Answer
    alternatives: ['Is this safe?', 'Is it dangerous?', 'Is it okay?'], // Alternatives
    hint: 'सुरक्षित = safe.', // Hint
    explanation: '"Is it safe?" - asking about safety. Opposite: "Is it dangerous?" "Is it risky?" Professional safety: "Is the data safe?", "Is this procedure safe?", "Is the building safe?" Safety first in all professional contexts.',
    difficulty: 'easy',
    category: 'question-is',
    grammarRule: 'Is + it + Adjective?',
    tags: ['is', 'question', 'it', 'safe', 'safety'],
    usageNote: 'Important safety question - never hesitate to ask this.',
    relatedSentences: ['Is it risky?', 'Is it dangerous?', 'Is it approved?'],
  },

  { // Question 64 — Are they satisfied with the results?
    id: 'day4-q064',
    hindi: 'क्या वे परिणामों से संतुष्ट हैं?', // Are they satisfied with the results?
    english: 'Are they satisfied with the results?', // Answer
    alternatives: ['Are they happy with the outcome?', 'Are the clients pleased?', 'Are they impressed?'], // Alternatives
    hint: 'संतुष्ट = satisfied. परिणामों से = with the results.', // Hint
    explanation: '"Satisfied with the results" - client satisfaction question. Key business metric. "Are the clients satisfied?", "Is management satisfied?", "Are the stakeholders satisfied with our performance?"',
    difficulty: 'medium',
    category: 'question-are',
    grammarRule: 'Are + they + Adjective + with + the + Noun?',
    tags: ['are', 'question', 'they', 'satisfied', 'results', 'business'],
    usageNote: 'Critical in client management and business reviews.',
    relatedSentences: ['Are the clients happy?', 'Is management pleased?', 'Are they impressed with our work?'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 6: SHORT ANSWERS
  // Pattern: Yes, Subject + am/is/are / No, Subject + am/is/are + not
  // Hindi: हाँ, ... / नहीं, ...
  // ──────────────────────────────────────────────────────────

  { // Question 65 — Yes, I am
    id: 'day4-q065',
    hindi: 'हाँ, मैं हूँ।', // Yes, I am
    english: 'Yes, I am.', // Answer
    alternatives: ['Yes, I am indeed.', 'Absolutely, I am.'], // Alternatives
    hint: 'Short answer: Yes + subject + be verb.', // Hint
    explanation: 'Short answers with be verb: "Are you a student?" → "Yes, I am." (not "Yes, I am a student" - too long). Never say just "Yes" without the subject and verb in formal English. "No, I\'m not." - never say "No, I\'m not a student".',
    difficulty: 'easy',
    category: 'short-answer',
    grammarRule: 'Yes + I + am (short positive answer)',
    tags: ['am', 'yes', 'short-answer', 'basic'],
    usageNote: 'Short answers are more natural than repeating the whole sentence.',
    relatedSentences: ['Yes, he is.', 'Yes, they are.', 'Yes, we are.'],
  },

  { // Question 66 — No, he isn't
    id: 'day4-q066',
    hindi: 'नहीं, वह नहीं है।', // No, he isn't
    english: "No, he isn't.", // Answer
    alternatives: ["No, he's not.", 'No, he is not.'], // Alternatives
    hint: "Short negative: No + Subject + isn't/aren't.", // Hint
    explanation: "Short negative answer: 'No, he isn't.' or 'No, he's not.' Both are correct. 'No, he isn't' uses isn't (is+not contracted). 'No, he's not' uses he's (he+is contracted). Never: 'No, he not' - wrong!",
    difficulty: 'easy',
    category: 'short-answer',
    grammarRule: "No + He + isn't (short negative answer)",
    tags: ['is', 'not', 'no', 'short-answer', 'negative'],
    usageNote: "Two ways to contract: isn't OR he's not - both correct.",
    relatedSentences: ["No, she isn't.", "No, they aren't.", "No, I'm not."],
  },

  { // Question 67 — Yes, we are
    id: 'day4-q067',
    hindi: 'हाँ, हम हैं।', // Yes, we are
    english: 'Yes, we are.', // Answer
    alternatives: ['Yes, we are indeed.', 'Absolutely, we are.'], // Alternatives
    hint: 'We + are → Yes, we are.', // Hint
    explanation: '"Are you ready?" → "Yes, we are." (short answer). In team contexts: "Are you all available?" → "Yes, we are." Notice: we don\'t say "Yes, we\'re" at the END of a sentence (contraction only mid-sentence).',
    difficulty: 'easy',
    category: 'short-answer',
    grammarRule: 'Yes + We + are (short positive answer)',
    tags: ['are', 'yes', 'we', 'short-answer', 'team'],
    usageNote: "Don't use contraction (we're) at end of sentence for short answers.",
    relatedSentences: ['Yes, they are.', 'Yes, I am.', 'Yes, she is.'],
  },

  { // Question 68 — No, she isn't available
    id: 'day4-q068',
    hindi: 'नहीं, वह उपलब्ध नहीं है।', // No, she isn't available
    english: "No, she isn't available.", // Answer
    alternatives: ["No, she's not available.", "No, she isn't free.", 'She is not available right now.'], // Alternatives
    hint: "isn't + adjective — short negative with info.", // Hint
    explanation: "Short answers can also include the adjective: 'No, she isn't available' = No + short answer + the key adjective. This gives more information. 'No, she isn't available right now but she can call you back.'",
    difficulty: 'medium',
    category: 'short-answer',
    grammarRule: "No + She + isn't + Adjective",
    tags: ['is', 'not', 'she', 'available', 'short-answer'],
    usageNote: 'Extended short answers give more helpful information.',
    relatedSentences: ["No, he isn't in.", "No, they aren't ready.", "No, I'm not free today."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 7: CONTRACTIONS — I'm / He's / She's / We're / They're
  // Contractions make English sound natural and fluent
  // ──────────────────────────────────────────────────────────

  { // Question 69 — I'm your new team member
    id: 'day4-q069',
    hindi: 'मैं तुम्हारी नई टीम का सदस्य हूँ।', // I'm your new team member
    english: "I'm your new team member.", // Answer
    alternatives: ['I am your new team member.', "I'm the new joiner."], // Alternatives
    hint: "I'm = I am (contraction). Use in casual/normal conversation.", // Hint
    explanation: "I'm = I am. Contractions are used in: casual speech, friendly emails, messaging, conversations. Avoid contractions in: formal letters, official reports, legal documents. For interviews - both are fine.",
    difficulty: 'easy',
    category: 'contraction',
    grammarRule: "I'm = I + am (contraction)",
    tags: ["I'm", 'contraction', 'am', 'casual', 'introduction'],
    usageNote: 'Use contractions in casual speech; avoid in formal documents.',
    relatedSentences: ["I'm ready.", "I'm from Delhi.", "I'm very excited to be here."],
  },

  { // Question 70 — He's very talented
    id: 'day4-q070',
    hindi: 'वह बहुत प्रतिभाशाली है।', // He's very talented
    english: "He's very talented.", // Answer
    alternatives: ['He is very talented.', "He's extremely gifted."], // Alternatives
    hint: "He's = He is (contraction).", // Hint
    explanation: "He's = He is. She's = She is. It's = It is. Contractions: He's, She's, It's — all mean 'is' contracted. 'It's' (it is) vs 'its' (possessive). Common confusion: 'It's raining' (correct) vs 'Its raining' (wrong).",
    difficulty: 'easy',
    category: 'contraction',
    grammarRule: "He's = He + is (contraction)",
    tags: ["he's", 'contraction', 'is', 'talented'],
    usageNote: "Important: It's (it is) ≠ its (possessive). Don't confuse them!",
    relatedSentences: ["She's very smart.", "It's a good day.", "He's working from home."],
  },

  { // Question 71 — We're working on it
    id: 'day4-q071',
    hindi: 'हम इस पर काम कर रहे हैं।', // We're working on it
    english: "We're working on it.", // Answer
    alternatives: ['We are working on it.', "We're handling it.", 'We are taking care of it.'], // Alternatives
    hint: "We're = We are. Working on it = उस पर काम करना।", // Hint
    explanation: "We're working on it = We are currently handling the task. Professional phrase for giving an update when something isn't done yet. 'On it' is a phrasal expression meaning actively doing something.",
    difficulty: 'medium',
    category: 'contraction',
    grammarRule: "We're = We + are (contraction)",
    tags: ["we're", 'contraction', 'are', 'working', 'professional', 'update'],
    usageNote: 'Very common phrase for giving status updates in office.',
    relatedSentences: ["We're almost done.", "We're finalizing the report.", "We're on schedule."],
  },

  { // Question 72 — They're the best team
    id: 'day4-q072',
    hindi: 'वे सबसे अच्छी टीम हैं।', // They're the best team
    english: "They're the best team.", // Answer
    alternatives: ['They are the best team.', "They're an excellent team."], // Alternatives
    hint: "They're = They are.", // Hint
    explanation: "They're = They are. 'The best' uses superlative (best = सबसे अच्छा). 'They're the best team in the company' - using superlative with 'the'. Superlatives: best, worst, fastest, smartest, most talented.",
    difficulty: 'medium',
    category: 'contraction',
    grammarRule: "They're = They + are (contraction)",
    tags: ["they're", 'contraction', 'are', 'best', 'superlative'],
    usageNote: "They're = they are. Don't confuse with 'their' (possessive) or 'there' (place).",
    relatedSentences: ["They're very professional.", "They're working hard.", "They're our best clients."],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 8: WAS / WERE — Past Tense of Be Verb
  // Pattern: Subject + was/were + noun/adjective
  // Hindi: था / थी / थे
  // ──────────────────────────────────────────────────────────

  { // Question 73 — I was a student
    id: 'day4-q073',
    hindi: 'मैं एक छात्र था।', // I was a student
    english: 'I was a student.', // Answer
    alternatives: ['I used to be a student.', 'I was studying.'], // Alternatives
    hint: '"था/थी" = was. I + was + noun (past).', // Hint
    explanation: '"Was" is the past tense of "am/is". I was, He was, She was, It was. "Were" is past of "are": You were, We were, They were. "I was a student (before)" vs "I am a student (now)".',
    difficulty: 'easy',
    category: 'was-were',
    grammarRule: 'I + was + a/an + Noun (past)',
    tags: ['was', 'past', 'I', 'student', 'basic'],
    usageNote: '"Was" for I, He, She, It. "Were" for You, We, They.',
    relatedSentences: ['I was very young.', 'I was at the office yesterday.', 'I was very busy last week.'],
  },

  { // Question 74 — He was very sick last week
    id: 'day4-q074',
    hindi: 'वह पिछले हफ्ते बहुत बीमार था।', // He was very sick last week
    english: 'He was very sick last week.', // Answer
    alternatives: ['He was ill last week.', 'He was unwell last week.'], // Alternatives
    hint: 'था = was. पिछले हफ्ते = last week.', // Hint
    explanation: '"Was" for past state. "He was sick last week" (past, he is better now). "He is sick" (present, still sick). Time words: last week, yesterday, last year, in 2020, when I was young - all trigger past tense.',
    difficulty: 'medium',
    category: 'was-past',
    grammarRule: 'He + was + Adjective + Time Expression',
    tags: ['was', 'he', 'sick', 'past', 'time'],
    usageNote: 'Past state + time expression shows the action is finished.',
    relatedSentences: ['She was tired yesterday.', 'He was not well last month.', 'It was very hot last summer.'],
  },

  { // Question 75 — We were very happy
    id: 'day4-q075',
    hindi: 'हम बहुत खुश थे।', // We were very happy
    english: 'We were very happy.', // Answer
    alternatives: ['We were so happy.', 'We were thrilled.'], // Alternatives
    hint: '"थे" = were. We + were + adjective.', // Hint
    explanation: '"Were" for past: You were, We were, They were. "They were very happy at the party" - past state. This is how we talk about emotions in the past. "Were" is used much less than "was" - only with you, we, they.',
    difficulty: 'easy',
    category: 'were-past',
    grammarRule: 'We + were + Adjective (past)',
    tags: ['were', 'we', 'happy', 'past', 'emotion'],
    usageNote: '"Were" only for You, We, They in past tense.',
    relatedSentences: ['They were very excited.', 'We were all together.', 'You were very brave.'],
  },

  { // Question 76 — She was not in the meeting
    id: 'day4-q076',
    hindi: 'वह मीटिंग में नहीं थी।', // She was not in the meeting
    english: 'She was not in the meeting.', // Answer
    alternatives: ["She wasn't in the meeting.", 'She did not attend the meeting.'], // Alternatives
    hint: 'नहीं थी = was not / wasn\'t.', // Hint
    explanation: '"Was not" = "wasn\'t" (contraction). "She wasn\'t in the meeting" means she was absent from the meeting. Past negatives: was not/wasn\'t (singular), were not/weren\'t (plural).',
    difficulty: 'medium',
    category: 'was-negative',
    grammarRule: "She + was + not = wasn't",
    tags: ['was', 'not', 'she', "wasn't", 'meeting', 'professional'],
    usageNote: "wasn't = was + not (contraction for past negative).",
    relatedSentences: ["He wasn't available.", "They weren't on time.", "We weren't informed."],
  },

  { // Question 77 — Were you at the party?
    id: 'day4-q077',
    hindi: 'क्या तुम पार्टी में थे?', // Were you at the party?
    english: 'Were you at the party?', // Answer
    alternatives: ['Did you go to the party?', 'Were you there?'], // Alternatives
    hint: 'Past question: Were + you + place?', // Hint
    explanation: 'Past questions with was/were: put was/were before the subject. "You were at the party" → "Were you at the party?" Same pattern as present: verb before subject for questions.',
    difficulty: 'medium',
    category: 'were-question',
    grammarRule: 'Were + you + at + Place? (past question)',
    tags: ['were', 'question', 'you', 'past', 'party'],
    usageNote: 'Past questions: Was/Were goes before the subject.',
    relatedSentences: ['Was he at the office?', 'Were they informed?', 'Was she feeling well?'],
  },

  { // Question 78 — I was wrong
    id: 'day4-q078',
    hindi: 'मैं गलत था।', // I was wrong
    english: 'I was wrong.', // Answer
    alternatives: ['I made a mistake.', 'I was mistaken.'], // Alternatives
    hint: 'गलत = wrong. था = was.', // Hint
    explanation: '"I was wrong" - admitting a past mistake. Very professional to say this: "I was wrong, I apologize." Never blame others - take responsibility. "I was mistaken" is slightly more formal than "I was wrong".',
    difficulty: 'easy',
    category: 'was-past',
    grammarRule: 'I + was + Adjective (past state)',
    tags: ['was', 'I', 'wrong', 'mistake', 'professional'],
    usageNote: 'Admitting mistakes professionally is a sign of maturity.',
    relatedSentences: ['I was mistaken.', 'I made an error.', 'I apologize for the mistake.'],
  },

  { // Question 79 — They were not aware of it
    id: 'day4-q079',
    hindi: 'वे इसके बारे में जानते नहीं थे।', // They were not aware of it
    english: 'They were not aware of it.', // Answer
    alternatives: ["They weren't aware of it.", 'They did not know about it.', 'They had no knowledge of it.'], // Alternatives
    hint: 'जानते नहीं थे = were not aware.', // Hint
    explanation: '"Aware of" means knowing about something. "They were not aware of the problem" = they didn\'t know there was a problem. Professional: "The team was not aware of the deadline change."',
    difficulty: 'medium',
    category: 'were-negative',
    grammarRule: "They + were + not + aware of + Noun",
    tags: ['were', 'not', 'they', 'aware', 'professional', 'past'],
    usageNote: '"Aware of" is professional vocabulary - use it in meetings and emails.',
    relatedSentences: ["They weren't informed.", "We weren't told about this.", "Nobody was aware of the issue."],
  },

  { // Question 80 — Was she happy with the result?
    id: 'day4-q080',
    hindi: 'क्या वह परिणाम से खुश थी?', // Was she happy with the result?
    english: 'Was she happy with the result?', // Answer
    alternatives: ['Was she satisfied with the outcome?', 'Was she pleased?'], // Alternatives
    hint: 'Past question: Was + she + adjective?', // Hint
    explanation: '"Was she happy?" - asking about someone\'s past feeling. "Was" before "she" for past question. Result = परिणाम. Outcome = नतीजा. Result is more formal in business contexts.',
    difficulty: 'medium',
    category: 'was-question',
    grammarRule: 'Was + she + Adjective + with + the + Noun?',
    tags: ['was', 'question', 'she', 'past', 'result', 'feeling'],
    usageNote: 'Asking about someone\'s reaction to past events or outcomes.',
    relatedSentences: ['Was he satisfied?', 'Were they happy?', 'Was the client pleased?'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 9: BE VERB WITH ADJECTIVES — Full Coverage
  // All common adjectives with am/is/are
  // ──────────────────────────────────────────────────────────

  { // Question 81 — The food is delicious
    id: 'day4-q081',
    hindi: 'खाना बहुत स्वादिष्ट है।', // The food is delicious
    english: 'The food is delicious.', // Answer
    alternatives: ['The food is very tasty.', 'The food tastes delicious.', 'This food is amazing.'], // Alternatives
    hint: 'स्वादिष्ट = delicious/tasty.', // Hint
    explanation: '"Delicious" (बहुत स्वादिष्ट) > "tasty" (स्वादिष्ट) > "good" (अच्छा). "Yummy" is very informal. In a restaurant: "This dish is absolutely delicious!" Professional compliment to a chef or host.',
    difficulty: 'easy',
    category: 'is-adjective',
    grammarRule: 'The + Noun + is + Adjective',
    tags: ['is', 'food', 'delicious', 'adjective', 'daily'],
    usageNote: 'Useful when complimenting food at restaurants or someone\'s cooking.',
    relatedSentences: ['The curry is spicy.', 'The dessert is sweet.', 'This biryani is excellent.'],
  },

  { // Question 82 — The meeting is very important
    id: 'day4-q082',
    hindi: 'यह मीटिंग बहुत ज़रूरी है।', // The meeting is very important
    english: 'The meeting is very important.', // Answer
    alternatives: ['This meeting is crucial.', 'The meeting is critical.'], // Alternatives
    hint: 'ज़रूरी = important/crucial.', // Hint
    explanation: 'Importance scale: important < very important < critical < crucial. "The meeting is crucial for the project success." "This is a critical deadline." Use stronger words for urgent matters.',
    difficulty: 'easy',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + very + Adjective',
    tags: ['is', 'meeting', 'important', 'professional', 'adjective'],
    usageNote: 'Emphasizing importance in professional contexts.',
    relatedSentences: ['The deadline is critical.', 'This project is urgent.', 'The client is very important.'],
  },

  { // Question 83 — The task is complete
    id: 'day4-q083',
    hindi: 'काम पूरा हो गया है।', // The task is complete
    english: 'The task is complete.', // Answer
    alternatives: ['The task is done.', 'The task is finished.', 'The work is completed.'], // Alternatives
    hint: 'पूरा = complete/done/finished.', // Hint
    explanation: '"Complete", "done", "finished" - synonyms but subtle differences. "Complete" = 100% done, nothing missing. "Done" = casual. "Finished" = ended. Professional: "The task is complete and ready for review."',
    difficulty: 'easy',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (status)',
    tags: ['is', 'task', 'complete', 'done', 'professional'],
    usageNote: 'Used to update status in project management.',
    relatedSentences: ['The report is ready.', 'The project is complete.', 'The work is finished.'],
  },

  { // Question 84 — The problem is serious
    id: 'day4-q084',
    hindi: 'यह समस्या गंभीर है।', // The problem is serious
    english: 'The problem is serious.', // Answer
    alternatives: ['The issue is serious.', 'The problem is critical.', 'This is a serious issue.'], // Alternatives
    hint: 'गंभीर = serious.', // Hint
    explanation: '"Serious" means needing urgent attention. "The problem is serious" - must be solved soon. "The issue is minor" (छोटा). Severity: minor < moderate < serious < critical < severe. Use the right level.',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (severity)',
    tags: ['is', 'problem', 'serious', 'professional', 'severity'],
    usageNote: 'Reporting problems with appropriate severity level.',
    relatedSentences: ['The issue is minor.', 'The bug is critical.', 'The situation is severe.'],
  },

  { // Question 85 — The price is too high
    id: 'day4-q085',
    hindi: 'कीमत बहुत ज़्यादा है।', // The price is too high
    english: 'The price is too high.', // Answer
    alternatives: ['It is too expensive.', 'The cost is very high.', 'The price is unreasonable.'], // Alternatives
    hint: 'कीमत = price. बहुत ज़्यादा = too high.', // Hint
    explanation: '"Too high" = more than acceptable. "Too" means excessive. "It is too expensive" (व्यापार में negotiation). "The price is reasonable" = सही कीमत. "The price is negotiable" = bargaining is possible.',
    difficulty: 'medium',
    category: 'is-business',
    grammarRule: 'The + Noun + is + too + Adjective',
    tags: ['is', 'price', 'high', 'business', 'negotiation'],
    usageNote: 'Used in business negotiations and purchasing.',
    relatedSentences: ['The price is reasonable.', 'The cost is negotiable.', 'The fee is within budget.'],
  },

  { // Question 86 — The report is accurate
    id: 'day4-q086',
    hindi: 'रिपोर्ट सटीक है।', // The report is accurate
    english: 'The report is accurate.', // Answer
    alternatives: ['The report is correct.', 'The data is accurate.', 'The figures are accurate.'], // Alternatives
    hint: 'सटीक = accurate/precise/correct.', // Hint
    explanation: '"Accurate" = exactly right, no errors. "Precise" = exact measurements. "Correct" = no mistakes. "The report is accurate" - high praise in data and finance. Opposite: "The data is inaccurate/incorrect".',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (quality)',
    tags: ['is', 'report', 'accurate', 'data', 'professional'],
    usageNote: 'Important quality assessment word in data and finance.',
    relatedSentences: ['The data is precise.', 'The numbers are correct.', 'The figures are inaccurate.'],
  },

  { // Question 87 — My English is improving
    id: 'day4-q087',
    hindi: 'मेरी अंग्रेज़ी सुधर रही है।', // My English is improving
    english: 'My English is improving.', // Answer
    alternatives: ['My English is getting better.', 'I am improving my English.'], // Alternatives
    hint: 'सुधर रही = improving/getting better.', // Hint
    explanation: '"Is improving" = currently in the process of getting better (present continuous). "My English is improving" means it\'s not perfect yet but it\'s getting better day by day. Motivational phrase for learners!',
    difficulty: 'medium',
    category: 'is-progress',
    grammarRule: 'My + Noun + is + present participle',
    tags: ['is', 'improving', 'English', 'learning', 'progress'],
    usageNote: 'Positive progress statement for language learners.',
    relatedSentences: ['My vocabulary is growing.', 'My confidence is building.', 'My skills are developing.'],
  },

  { // Question 88 — The weather is perfect today
    id: 'day4-q088',
    hindi: 'आज मौसम बिल्कुल सही है।', // The weather is perfect today
    english: 'The weather is perfect today.', // Answer
    alternatives: ["Today's weather is perfect.", 'The weather is beautiful today.', "It's a perfect day."], // Alternatives
    hint: 'मौसम = weather. बिल्कुल सही = perfect.', // Hint
    explanation: '"Perfect" means exactly as it should be, nothing wrong. "The weather is perfect" - a compliment to the day. Small talk about weather: very common in English-speaking countries to start conversations.',
    difficulty: 'easy',
    category: 'is-weather',
    grammarRule: 'The + Noun + is + Adjective (quality)',
    tags: ['is', 'weather', 'perfect', 'small-talk', 'daily'],
    usageNote: 'Weather is the most common small talk topic in English.',
    relatedSentences: ["It's a lovely day.", "The weather is terrible.", "It's quite pleasant today."],
  },

  { // Question 89 — The deadline is tomorrow
    id: 'day4-q089',
    hindi: 'अंतिम तिथि कल है।', // The deadline is tomorrow
    english: 'The deadline is tomorrow.', // Answer
    alternatives: ['The deadline is due tomorrow.', 'We need to submit tomorrow.', 'It is due tomorrow.'], // Alternatives
    hint: 'अंतिम तिथि = deadline. कल = tomorrow.', // Hint
    explanation: '"Deadline is tomorrow" - urgent! Time expressions: tomorrow (कल), next week (अगले हफ्ते), end of day (आज शाम तक), end of month. Professional: "The deadline is end of day today."',
    difficulty: 'easy',
    category: 'is-time',
    grammarRule: 'The + Noun + is + Time Expression',
    tags: ['is', 'deadline', 'tomorrow', 'professional', 'time'],
    usageNote: 'Deadline management - essential professional vocabulary.',
    relatedSentences: ['The deadline is end of day.', 'The submission is due Friday.', 'The project is due next week.'],
  },

  { // Question 90 — The salary is negotiable
    id: 'day4-q090',
    hindi: 'वेतन बातचीत योग्य है।', // The salary is negotiable
    english: 'The salary is negotiable.', // Answer
    alternatives: ['The pay is negotiable.', 'The compensation is open to discussion.'], // Alternatives
    hint: 'वेतन = salary. बातचीत योग्य = negotiable.', // Hint
    explanation: '"Negotiable" means the amount can be changed through discussion. Job interviews: "Is the salary negotiable?" If yes: "The salary is negotiable based on experience." If no: "The salary is fixed."',
    difficulty: 'hard',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (negotiation)',
    tags: ['is', 'salary', 'negotiable', 'interview', 'HR', 'professional'],
    usageNote: 'Critical vocabulary for salary discussions in job interviews.',
    relatedSentences: ['The salary is fixed.', 'The CTC is negotiable.', 'The package is open to discussion.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 10: BE VERB IN PROFESSIONAL CONTEXT
  // Office, meetings, interviews, business conversations
  // ──────────────────────────────────────────────────────────

  { // Question 91 — I am available for the interview
    id: 'day4-q091',
    hindi: 'मैं इंटरव्यू के लिए उपलब्ध हूँ।', // I am available for the interview
    english: 'I am available for the interview.', // Answer
    alternatives: ["I'm available for the interview.", 'I am free for the interview.', 'I am ready for the interview.'], // Alternatives
    hint: 'उपलब्ध = available. इंटरव्यू = interview.', // Hint
    explanation: '"I am available for the interview" - response to an interview call. Also: "I am available on Monday between 10 AM and 2 PM". Giving specific time slots shows professionalism.',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + available + for + Noun',
    tags: ['am', 'available', 'interview', 'professional', 'scheduling'],
    usageNote: 'Use when responding to interview invitations or meeting requests.',
    relatedSentences: ['I am available on Monday.', 'I am free after 3 PM.', 'I am not available this week.'],
  },

  { // Question 92 — We are committed to quality
    id: 'day4-q092',
    hindi: 'हम गुणवत्ता के प्रति प्रतिबद्ध हैं।', // We are committed to quality
    english: 'We are committed to quality.', // Answer
    alternatives: ["We're committed to quality.", 'We are dedicated to quality.', 'Quality is our priority.'], // Alternatives
    hint: 'प्रतिबद्ध = committed. गुणवत्ता = quality.', // Hint
    explanation: '"Committed to" means truly dedicated. Business phrases: "We are committed to customer satisfaction", "We are committed to excellence", "We are committed to delivering on time". Very important for company presentations.',
    difficulty: 'hard',
    category: 'are-professional',
    grammarRule: 'We + are + committed to + Noun',
    tags: ['are', 'we', 'committed', 'quality', 'business', 'mission'],
    usageNote: 'Common in company mission statements and client presentations.',
    relatedSentences: ['We are dedicated to excellence.', 'We are focused on results.', 'We are committed to innovation.'],
  },

  { // Question 93 — I am proud of my team
    id: 'day4-q093',
    hindi: 'मुझे अपनी टीम पर गर्व है।', // I am proud of my team
    english: 'I am proud of my team.', // Answer
    alternatives: ["I'm proud of my team.", 'My team has made me proud.'], // Alternatives
    hint: 'गर्व है = am proud of.', // Hint
    explanation: '"I am proud of + noun" - expressing pride. Professional: manager to team. "I am proud of the work we have done", "I am proud of our achievement". Hindi: "मुझे गर्व है" → "I am proud."',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + proud of + my + Noun',
    tags: ['am', 'proud', 'team', 'professional', 'achievement'],
    usageNote: 'Motivating phrase from managers to teams.',
    relatedSentences: ['I am proud of my achievement.', 'I am proud of this project.', 'You should be proud of yourself.'],
  },

  { // Question 94 — The offer is still valid
    id: 'day4-q094',
    hindi: 'यह ऑफर अभी भी वैध है।', // The offer is still valid
    english: 'The offer is still valid.', // Answer
    alternatives: ['The offer is still open.', 'The deal is still on.'], // Alternatives
    hint: 'वैध = valid. अभी भी = still.', // Hint
    explanation: '"Valid" = officially acceptable and in effect. "The offer is still valid" = you can still accept it. "The offer has expired" = it is no longer available. Business: "Is the quotation still valid?"',
    difficulty: 'hard',
    category: 'is-business',
    grammarRule: 'The + Noun + is + still + Adjective',
    tags: ['is', 'offer', 'valid', 'business', 'negotiation'],
    usageNote: 'Important in sales, contracts, and business negotiations.',
    relatedSentences: ['The deal is still open.', 'The price is valid until Friday.', 'The offer has expired.'],
  },

  { // Question 95 — I am in charge of this department
    id: 'day4-q095',
    hindi: 'मैं इस विभाग का प्रभारी हूँ।', // I am in charge of this department
    english: 'I am in charge of this department.', // Answer
    alternatives: ["I'm in charge of this department.", 'I manage this department.', 'I am responsible for this department.'], // Alternatives
    hint: '"In charge of" = प्रभारी होना।', // Hint
    explanation: '"In charge of" = responsible for managing. "I am in charge of" = I manage/lead. Interview: "I am in charge of a team of 15 engineers." "Who is in charge here?" - asking for the person in authority.',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + in charge of + Noun',
    tags: ['am', 'charge', 'department', 'professional', 'leadership'],
    usageNote: 'Indicates authority and responsibility in professional settings.',
    relatedSentences: ['I am responsible for this team.', 'She is in charge of operations.', 'He is the head of marketing.'],
  },

  { // Question 96 — The client is satisfied
    id: 'day4-q096',
    hindi: 'ग्राहक संतुष्ट है।', // The client is satisfied
    english: 'The client is satisfied.', // Answer
    alternatives: ['The customer is happy.', 'The client is pleased with the work.', 'The client is impressed.'], // Alternatives
    hint: 'ग्राहक = client/customer. संतुष्ट = satisfied.', // Hint
    explanation: '"The client is satisfied" - success! Client satisfaction is the most important metric in business. "The client is very impressed", "The client is happy with the deliverables", "Client satisfaction score is high".',
    difficulty: 'medium',
    category: 'is-business',
    grammarRule: 'The + Noun + is + Adjective (satisfaction)',
    tags: ['is', 'client', 'satisfied', 'business', 'success'],
    usageNote: 'Client satisfaction is the goal of every professional project.',
    relatedSentences: ['The customer is happy.', 'The client is very impressed.', 'Our satisfaction rate is high.'],
  },

  { // Question 97 — I am trained in digital marketing
    id: 'day4-q097',
    hindi: 'मैं डिजिटल मार्केटिंग में प्रशिक्षित हूँ।', // I am trained in digital marketing
    english: 'I am trained in digital marketing.', // Answer
    alternatives: ["I'm trained in digital marketing.", 'I have training in digital marketing.', 'I am skilled in digital marketing.'], // Alternatives
    hint: 'प्रशिक्षित = trained. I + am + trained in + field.', // Hint
    explanation: '"I am trained in" = I have received professional training. Interview gold: "I am trained in project management", "I am certified in data analysis", "I am trained in customer service". Always follow with specific field.',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + trained in + Field',
    tags: ['am', 'trained', 'digital', 'marketing', 'professional', 'skills'],
    usageNote: 'Use in interviews when mentioning professional training.',
    relatedSentences: ['I am certified in Python.', 'I am trained in management.', 'I am experienced in finance.'],
  },

  { // Question 98 — They are our biggest clients
    id: 'day4-q098',
    hindi: 'वे हमारे सबसे बड़े ग्राहक हैं।', // They are our biggest clients
    english: 'They are our biggest clients.', // Answer
    alternatives: ["They're our biggest clients.", 'They are our most important clients.', 'They are our top customers.'], // Alternatives
    hint: 'सबसे बड़े = biggest. ग्राहक = clients.', // Hint
    explanation: '"Biggest clients" in terms of business value. Superlative "biggest" uses -est. Key account management: "They are our key account", "They are our most valued customer", "They generate 40% of our revenue".',
    difficulty: 'medium',
    category: 'are-business',
    grammarRule: 'They + are + our + Superlative + Noun',
    tags: ['are', 'they', 'biggest', 'clients', 'business', 'key'],
    usageNote: 'Used in client management and business discussions.',
    relatedSentences: ['They are our top priority.', 'They are our key partners.', 'They are our most loyal customers.'],
  },

  { // Question 99 — The product is ready for launch
    id: 'day4-q099',
    hindi: 'उत्पाद लॉन्च के लिए तैयार है।', // The product is ready for launch
    english: 'The product is ready for launch.', // Answer
    alternatives: ['The product is launch-ready.', 'We are ready to launch.', 'The product is good to go.'], // Alternatives
    hint: 'लॉन्च के लिए तैयार = ready for launch.', // Hint
    explanation: '"Ready for launch" is product management vocabulary. "The product is ready for launch" = we can release it now. "The product is in beta" = still testing. "The app is live" = it has been launched already.',
    difficulty: 'hard',
    category: 'is-business',
    grammarRule: 'The + Noun + is + ready for + Noun',
    tags: ['is', 'product', 'ready', 'launch', 'business', 'management'],
    usageNote: 'Product management and startup essential vocabulary.',
    relatedSentences: ['The app is live.', 'The website is live.', 'We are ready to go.'],
  },

  { // Question 100 — I am open to feedback
    id: 'day4-q100',
    hindi: 'मैं फीडबैक के लिए तैयार हूँ।', // I am open to feedback
    english: 'I am open to feedback.', // Answer
    alternatives: ["I'm open to feedback.", 'I welcome feedback.', 'I am receptive to feedback.'], // Alternatives
    hint: '"Open to" = तैयार होना / स्वीकार करने के लिए तैयार।', // Hint
    explanation: '"I am open to feedback" shows maturity and willingness to improve. Interview: "I am open to feedback and always try to improve." "Open to" + noun: open to change, open to new ideas, open to suggestions.',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + open to + Noun',
    tags: ['am', 'open', 'feedback', 'professional', 'growth', 'interview'],
    usageNote: 'Shows professional maturity - say this in performance reviews.',
    relatedSentences: ['I am open to suggestions.', 'I welcome criticism.', 'I am always looking to improve.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 11: BE VERB WITH LOCATIONS AND PREPOSITIONS
  // am/is/are + at/in/on/near
  // ──────────────────────────────────────────────────────────

  { // Question 101 — I am on my way
    id: 'day4-q101',
    hindi: 'मैं रास्ते में हूँ।', // I am on my way
    english: 'I am on my way.', // Answer
    alternatives: ["I'm on my way.", 'I am coming.', 'I will be there soon.'], // Alternatives
    hint: '"On my way" = रास्ते में, आ रहा हूँ।', // Hint
    explanation: '"I am on my way" = I have started coming, I am in transit. Very common phrase when you\'re running late: "Sorry, I am on my way. I will be there in 10 minutes." Can also say "I\'m en route" (more formal).',
    difficulty: 'medium',
    category: 'am-location',
    grammarRule: 'I + am + on my way',
    tags: ['am', 'way', 'location', 'travel', 'daily', 'common'],
    usageNote: 'Very common phrase for telling someone you are coming.',
    relatedSentences: ["I'm en route.", 'I will be there shortly.', 'I am 10 minutes away.'],
  },

  { // Question 102 — She is in a meeting
    id: 'day4-q102',
    hindi: 'वह मीटिंग में है।', // She is in a meeting
    english: 'She is in a meeting.', // Answer
    alternatives: ["She's in a meeting.", 'She is currently in a meeting.', 'She is tied up in a meeting.'], // Alternatives
    hint: 'मीटिंग में = in a meeting.', // Hint
    explanation: '"She is in a meeting" - standard office explanation when someone is busy. "She is tied up in a meeting" = she is occupied (tied up = unable to leave). "She is on a call" = on a phone call.',
    difficulty: 'easy',
    category: 'is-location',
    grammarRule: 'She + is + in + a + Noun',
    tags: ['is', 'she', 'meeting', 'office', 'location', 'professional'],
    usageNote: 'Standard office phrase to explain someone\'s unavailability.',
    relatedSentences: ["She's on a call.", "He's in a presentation.", "They're in a conference."],
  },

  { // Question 103 — The keys are on the table
    id: 'day4-q103',
    hindi: 'चाबियाँ मेज़ पर हैं।', // The keys are on the table
    english: 'The keys are on the table.', // Answer
    alternatives: ['The keys are lying on the table.', 'The keys are placed on the table.'], // Alternatives
    hint: 'मेज़ पर = on the table.', // Hint
    explanation: '"On the table" = on top of the surface. Prepositions: ON (surface) - on the table, on the floor, on the shelf. IN (inside) - in the drawer, in the bag, in the room. AT (specific point) - at the door, at the corner.',
    difficulty: 'easy',
    category: 'are-location',
    grammarRule: 'The + Noun + are + on + the + Noun',
    tags: ['are', 'keys', 'on', 'table', 'location', 'preposition'],
    usageNote: 'ON for surfaces, IN for insides, AT for specific points.',
    relatedSentences: ['The books are on the shelf.', 'My phone is in the bag.', 'He is at the door.'],
  },

  { // Question 104 — We are near the station
    id: 'day4-q104',
    hindi: 'हम स्टेशन के पास हैं।', // We are near the station
    english: 'We are near the station.', // Answer
    alternatives: ["We're near the station.", 'We are close to the station.', 'We are by the station.'], // Alternatives
    hint: 'पास = near/close to.', // Hint
    explanation: '"Near", "close to", "by", "next to" - all mean nearby (but slightly different distances). "Near" = general proximity. "Next to" = immediately adjacent. "Close to" = near. "By the station" = very near the station.',
    difficulty: 'easy',
    category: 'are-location',
    grammarRule: 'We + are + near + the + Noun',
    tags: ['are', 'we', 'near', 'station', 'location', 'direction'],
    usageNote: 'Used when giving location information or directions.',
    relatedSentences: ['I am near the office.', 'We are close to the hotel.', 'The bank is next to the school.'],
  },

  { // Question 105 — The documents are in the folder
    id: 'day4-q105',
    hindi: 'दस्तावेज़ फोल्डर में हैं।', // The documents are in the folder
    english: 'The documents are in the folder.', // Answer
    alternatives: ['The files are in the folder.', 'The papers are in the folder.', 'The documents are inside the folder.'], // Alternatives
    hint: 'दस्तावेज़ = documents. फोल्डर में = in the folder.', // Hint
    explanation: '"In the folder" = inside the folder. IT: "The files are in the shared drive", "The documents are in the cloud". Physical: "The papers are in the drawer". Use "in" for containers, spaces, and enclosed areas.',
    difficulty: 'easy',
    category: 'are-location',
    grammarRule: 'The + Noun + are + in + the + Noun',
    tags: ['are', 'documents', 'in', 'folder', 'office', 'professional'],
    usageNote: 'Used when telling someone where to find files or documents.',
    relatedSentences: ['The reports are in the drive.', 'The invoice is in your email.', 'The data is in the database.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 12: MIXED PRACTICE — All Be Verb Patterns
  // Advanced mixed sentences from daily and professional life
  // ──────────────────────────────────────────────────────────

  { // Question 106 — I am not only a manager but also a mentor
    id: 'day4-q106',
    hindi: 'मैं सिर्फ मैनेजर नहीं बल्कि एक मेंटर भी हूँ।', // I am not only a manager but also a mentor
    english: 'I am not only a manager but also a mentor.', // Answer
    alternatives: ["I'm not just a manager but also a mentor.", 'I serve as both a manager and a mentor.'], // Alternatives
    hint: '"Not only...but also" = सिर्फ...नहीं बल्कि...भी।', // Hint
    explanation: '"Not only...but also" - a correlative conjunction used with be verb. "I am not only experienced but also creative." Very impressive in interviews. Shows multiple strengths.',
    difficulty: 'hard',
    category: 'am-advanced',
    grammarRule: 'I + am + not only + Noun + but also + Noun',
    tags: ['am', 'not only', 'but also', 'advanced', 'professional', 'interview'],
    usageNote: 'Impressive structure for interviews - shows multiple qualities.',
    relatedSentences: ['I am not only skilled but also passionate.', 'She is not only smart but also hardworking.'],
  },

  { // Question 107 — The situation is under control
    id: 'day4-q107',
    hindi: 'स्थिति नियंत्रण में है।', // The situation is under control
    english: 'The situation is under control.', // Answer
    alternatives: ['Everything is under control.', 'We have it under control.', 'The matter is being handled.'], // Alternatives
    hint: 'नियंत्रण में = under control.', // Hint
    explanation: '"Under control" = being managed successfully, no panic needed. Crisis management phrase. "Don\'t worry, the situation is under control." Opposite: "The situation is out of control" (काबू के बाहर).',
    difficulty: 'hard',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + under + control',
    tags: ['is', 'situation', 'control', 'crisis', 'management', 'professional'],
    usageNote: 'Reassuring phrase used in crisis or problem situations.',
    relatedSentences: ["Everything's fine.", 'We have it handled.', "Don't worry, it's being taken care of."],
  },

  { // Question 108 — We are aligned on the strategy
    id: 'day4-q108',
    hindi: 'हम रणनीति पर एकमत हैं।', // We are aligned on the strategy
    english: 'We are aligned on the strategy.', // Answer
    alternatives: ["We're aligned on strategy.", 'We agree on the strategy.', 'We are on the same page about strategy.'], // Alternatives
    hint: 'एकमत = aligned/agreed. रणनीति = strategy.', // Hint
    explanation: '"Aligned on" means in agreement. Business: "Are we aligned on the goals?", "We are aligned on the vision", "The team is aligned on priorities." Key business vocabulary for strategy meetings.',
    difficulty: 'hard',
    category: 'are-business',
    grammarRule: 'We + are + aligned on + the + Noun',
    tags: ['are', 'we', 'aligned', 'strategy', 'business', 'agreement'],
    usageNote: 'Strategic alignment is critical in business - use this phrase in management meetings.',
    relatedSentences: ['We are aligned on goals.', 'We agree on the plan.', 'We are in sync.'],
  },

  { // Question 109 — I am passionate about teaching
    id: 'day4-q109',
    hindi: 'मुझे पढ़ाने का जुनून है।', // I am passionate about teaching
    english: 'I am passionate about teaching.', // Answer
    alternatives: ["I'm passionate about teaching.", 'I love teaching.', 'Teaching is my passion.'], // Alternatives
    hint: '"Passionate about" = किसी चीज़ के लिए जुनून होना।', // Hint
    explanation: '"Passionate about + noun/gerund" - very strong positive feeling about something. Interview: "I am passionate about solving complex problems", "I am passionate about customer success", "I am passionate about technology". Shows genuine interest.',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + passionate about + Noun/Gerund',
    tags: ['am', 'passionate', 'teaching', 'interview', 'professional', 'enthusiasm'],
    usageNote: 'Powerful interview phrase - shows genuine commitment to work.',
    relatedSentences: ['I am passionate about data.', 'She is passionate about design.', 'I love what I do.'],
  },

  { // Question 110 — The project is ahead of schedule
    id: 'day4-q110',
    hindi: 'प्रोजेक्ट समय से पहले चल रहा है।', // The project is ahead of schedule
    english: 'The project is ahead of schedule.', // Answer
    alternatives: ['We are ahead of schedule.', 'The project is progressing well.', 'We are ahead of plan.'], // Alternatives
    hint: '"Ahead of schedule" = समय से पहले।', // Hint
    explanation: '"Ahead of schedule" = progressing faster than planned. Very positive! Opposite: "behind schedule" (देरी से). "On schedule" (ठीक समय पर). Project management: "We are 2 days ahead of schedule."',
    difficulty: 'hard',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + ahead of + schedule',
    tags: ['is', 'project', 'ahead', 'schedule', 'management', 'positive'],
    usageNote: 'Positive project status update - management will be pleased.',
    relatedSentences: ['We are on track.', 'We are behind schedule.', 'The project is on time.'],
  },

  { // Question 111 — The office is not far from here
    id: 'day4-q111',
    hindi: 'ऑफिस यहाँ से ज़्यादा दूर नहीं है।', // The office is not far from here
    english: 'The office is not far from here.', // Answer
    alternatives: ["The office isn't far from here.", 'The office is close by.', 'The office is nearby.'], // Alternatives
    hint: 'दूर नहीं = not far. यहाँ से = from here.', // Hint
    explanation: '"Not far from here" = nearby, close. Giving directions: "It\'s not far, just 5 minutes walk." Opposite: "It\'s quite far from here." "From here" adds the reference point.',
    difficulty: 'medium',
    category: 'is-location',
    grammarRule: 'The + Noun + is + not + far from + here',
    tags: ['is', 'office', 'far', 'not', 'location', 'direction'],
    usageNote: 'Giving directions and location information.',
    relatedSentences: ["It's just around the corner.", "It's a 5-minute walk.", "The station is very close."],
  },

  { // Question 112 — I am fully committed to this role
    id: 'day4-q112',
    hindi: 'मैं इस भूमिका के लिए पूरी तरह प्रतिबद्ध हूँ।', // I am fully committed to this role
    english: 'I am fully committed to this role.', // Answer
    alternatives: ["I'm fully committed to this position.", 'I am dedicated to this role.', 'I am 100% committed.'], // Alternatives
    hint: 'पूरी तरह = fully. प्रतिबद्ध = committed.', // Hint
    explanation: '"Fully committed" = completely dedicated, no doubts. Interview closing statement: "I am fully committed to this role and excited about the opportunity." "Fully" adds emphasis - shows 100% dedication.',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + fully + Adjective + to + this + Noun',
    tags: ['am', 'fully', 'committed', 'role', 'interview', 'dedication'],
    usageNote: 'Strong closing statement for job interviews.',
    relatedSentences: ['I am very dedicated.', 'I am fully focused.', 'I am completely on board.'],
  },

  { // Question 113 — This is a great opportunity
    id: 'day4-q113',
    hindi: 'यह एक शानदार अवसर है।', // This is a great opportunity
    english: 'This is a great opportunity.', // Answer
    alternatives: ['This is an excellent opportunity.', 'This is a wonderful opportunity.', 'This is an amazing chance.'], // Alternatives
    hint: '"This is" = यह है। अवसर = opportunity.', // Hint
    explanation: '"This is a great opportunity" - interview enthusiasm. "I believe this is a great opportunity for me to grow." Opportunity scale: chance < opportunity < great opportunity < once-in-a-lifetime opportunity.',
    difficulty: 'medium',
    category: 'is-interview',
    grammarRule: 'This + is + a + Adjective + Noun',
    tags: ['is', 'this', 'great', 'opportunity', 'interview', 'enthusiasm'],
    usageNote: 'Expressing genuine interest and enthusiasm in interviews.',
    relatedSentences: ['This is a wonderful chance.', 'I see this as an opportunity to grow.', 'This is exactly what I was looking for.'],
  },

  { // Question 114 — We are proud to present
    id: 'day4-q114',
    hindi: 'हमें प्रस्तुत करते हुए गर्व हो रहा है।', // We are proud to present
    english: 'We are proud to present.', // Answer
    alternatives: ["We're proud to present.", 'We are delighted to present.', 'It is our pleasure to present.'], // Alternatives
    hint: '"We are proud to + verb" — formal presentation opening.', // Hint
    explanation: '"We are proud to present" - formal opening of a presentation or launch event. "We are delighted to present" (more formal). "It is our honor to present" (most formal). Presentation skills essential phrase.',
    difficulty: 'hard',
    category: 'are-presentation',
    grammarRule: 'We + are + proud to + base verb',
    tags: ['are', 'we', 'proud', 'present', 'presentation', 'formal'],
    usageNote: 'Used at the beginning of formal presentations and product launches.',
    relatedSentences: ['We are honored to announce.', 'We are pleased to share.', 'We are excited to launch.'],
  },

  { // Question 115 — The training is mandatory
    id: 'day4-q115',
    hindi: 'यह प्रशिक्षण अनिवार्य है।', // The training is mandatory
    english: 'The training is mandatory.', // Answer
    alternatives: ['The training is compulsory.', 'The training is required.', 'Attendance is mandatory.'], // Alternatives
    hint: 'अनिवार्य = mandatory/compulsory.', // Hint
    explanation: '"Mandatory" = you must do it, no choice. "Optional" = your choice. "Compulsory" = same as mandatory (slightly more formal). Office: "Attendance is mandatory for all employees", "This certification is mandatory for the role".',
    difficulty: 'hard',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (requirement)',
    tags: ['is', 'training', 'mandatory', 'compulsory', 'professional', 'HR'],
    usageNote: '"Mandatory" vs "Optional" - important distinction in professional settings.',
    relatedSentences: ['The meeting is compulsory.', 'This step is optional.', 'The certification is required.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 13: DAILY LIFE SENTENCES
  // Everyday situations using be verb naturally
  // ──────────────────────────────────────────────────────────

  { // Question 116 — The shop is closed
    id: 'day4-q116',
    hindi: 'दुकान बंद है।', // The shop is closed
    english: 'The shop is closed.', // Answer
    alternatives: ['The store is closed.', 'The shop is shut.', 'The shop is not open.'], // Alternatives
    hint: 'बंद = closed. दुकान = shop/store.', // Hint
    explanation: '"Closed" (adjective from past participle of "close"). "The shop is closed" = it\'s not open now. "The shop is closing" = it\'s in the process of closing. "The shop closed at 9 PM" = past event.',
    difficulty: 'easy',
    category: 'is-daily',
    grammarRule: 'The + Noun + is + Adjective (status)',
    tags: ['is', 'shop', 'closed', 'daily', 'status'],
    usageNote: 'Very common daily life situation - checking if places are open.',
    relatedSentences: ['The bank is closed today.', 'The restaurant is full.', 'The office is locked.'],
  },

  { // Question 117 — The bus is late
    id: 'day4-q117',
    hindi: 'बस देर से आई है।', // The bus is late
    english: 'The bus is late.', // Answer
    alternatives: ['The bus is delayed.', 'The bus is running late.', 'The bus is not on time.'], // Alternatives
    hint: 'देर से = late. "running late" = अभी भी देर हो रही है।', // Hint
    explanation: '"The bus is late" = it should have come but hasn\'t. "The bus is delayed" = there is an official delay. "The bus is running late" = it\'s in transit but behind schedule (ongoing delay).',
    difficulty: 'easy',
    category: 'is-daily',
    grammarRule: 'The + Noun + is + Adjective (timing)',
    tags: ['is', 'bus', 'late', 'daily', 'transport'],
    usageNote: 'Common in daily commute situations.',
    relatedSentences: ['The train is delayed.', 'The flight is on time.', 'The metro is crowded.'],
  },

  { // Question 118 — The water is cold
    id: 'day4-q118',
    hindi: 'पानी ठंडा है।', // The water is cold
    english: 'The water is cold.', // Answer
    alternatives: ['The water is very cold.', 'The water is chilled.', 'The water is ice cold.'], // Alternatives
    hint: 'ठंडा = cold. Temperature adjectives.', // Hint
    explanation: 'Temperature adjectives: freezing < ice cold < very cold < cold < cool < room temperature < warm < hot < very hot < boiling. "The water is cold" - simple description. "The coffee is hot" - careful, don\'t spill!',
    difficulty: 'easy',
    category: 'is-daily',
    grammarRule: 'The + Noun + is + Adjective (temperature)',
    tags: ['is', 'water', 'cold', 'temperature', 'daily'],
    usageNote: 'Temperature descriptions for food, drinks, and weather.',
    relatedSentences: ['The tea is hot.', 'The soup is warm.', 'The milk is lukewarm.'],
  },

  { // Question 119 — I am full (after eating)
    id: 'day4-q119',
    hindi: 'मेरा पेट भर गया है।', // I am full (after eating)
    english: 'I am full.', // Answer
    alternatives: ["I'm full.", 'I am stuffed.', 'I cannot eat anymore.'], // Alternatives
    hint: 'पेट भरना = to be full.', // Hint
    explanation: '"I am full" = I have eaten enough. "I am stuffed" = I ate too much (informal). "I am satisfied" = I have had enough to eat (polite). After a meal at someone\'s house: "That was delicious! I am completely full."',
    difficulty: 'easy',
    category: 'am-daily',
    grammarRule: 'I + am + Adjective (physical state)',
    tags: ['am', 'full', 'food', 'daily', 'meal'],
    usageNote: 'Said after eating to indicate you\'ve had enough food.',
    relatedSentences: ["I'm hungry.", "I'm thirsty.", "I'm satisfied."],
  },

  { // Question 120 — The hospital is nearby
    id: 'day4-q120',
    hindi: 'अस्पताल पास में है।', // The hospital is nearby
    english: 'The hospital is nearby.', // Answer
    alternatives: ['The hospital is close.', 'There is a hospital nearby.', 'The hospital is not far.'], // Alternatives
    hint: 'पास में = nearby/close.', // Hint
    explanation: '"Nearby" (one word adjective/adverb) = not far. "There is a hospital nearby" - existence statement. "The hospital is nearby" - describing its location. Both patterns use different structures.',
    difficulty: 'easy',
    category: 'is-daily',
    grammarRule: 'The + Noun + is + Adverb (location)',
    tags: ['is', 'hospital', 'nearby', 'daily', 'location'],
    usageNote: 'Giving location information about important places.',
    relatedSentences: ['The pharmacy is nearby.', 'The market is around the corner.', 'The school is walking distance.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 14: MORE ADVANCED PATTERNS
  // Complex sentences with be verb
  // ──────────────────────────────────────────────────────────

  { // Question 121 — I am looking forward to meeting you
    id: 'day4-q121',
    hindi: 'मैं आपसे मिलने का बेसब्री से इंतज़ार कर रहा हूँ।', // I am looking forward to meeting you
    english: 'I am looking forward to meeting you.', // Answer
    alternatives: ["I'm looking forward to meeting you.", 'I look forward to meeting you.', 'I am excited to meet you.'], // Alternatives
    hint: '"Looking forward to" = बेसब्री से इंतज़ार करना।', // Hint
    explanation: '"I am looking forward to + gerund (verb+ing)" = I am excited/eager about something in the future. Email ending: "I am looking forward to hearing from you." Interview: "I am looking forward to this opportunity."',
    difficulty: 'hard',
    category: 'am-phrase',
    grammarRule: 'I + am + looking forward to + Gerund',
    tags: ['am', 'looking', 'forward', 'meeting', 'professional', 'email', 'phrase'],
    usageNote: 'Very common email and letter ending - essential professional phrase.',
    relatedSentences: ['I look forward to your response.', 'I am excited to work with you.', 'I am eager to start.'],
  },

  { // Question 122 — The team is working on a new project
    id: 'day4-q122',
    hindi: 'टीम एक नए प्रोजेक्ट पर काम कर रही है।', // The team is working on a new project
    english: 'The team is working on a new project.', // Answer
    alternatives: ['The team is busy with a new project.', 'We are working on a new project.'], // Alternatives
    hint: '"Working on" = किसी चीज़ पर काम करना।', // Hint
    explanation: '"The team is working on" - present continuous (is + verb+ing) with be verb. This shows ongoing action. "Is working" = right now in progress. "The team works on projects" = general habit.',
    difficulty: 'medium',
    category: 'is-continuous',
    grammarRule: 'The + Noun + is + working on + a + Adjective + Noun',
    tags: ['is', 'team', 'working', 'project', 'continuous', 'professional'],
    usageNote: 'Status update phrase - common in project meetings.',
    relatedSentences: ['She is working on the report.', 'We are developing a new feature.', 'He is handling the client.'],
  },

  { // Question 123 — I am not in a position to decide
    id: 'day4-q123',
    hindi: 'मैं निर्णय लेने की स्थिति में नहीं हूँ।', // I am not in a position to decide
    english: 'I am not in a position to decide.', // Answer
    alternatives: ["I'm not in a position to decide.", 'I cannot make this decision alone.', 'This is beyond my authority.'], // Alternatives
    hint: '"In a position to" = किसी काम को करने में सक्षम/अधिकार होना।', // Hint
    explanation: '"I am not in a position to decide" = I don\'t have the authority or the information to decide. Very professional way to say "It\'s not my decision to make." Use: "I am in a position to help" (I can help).',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + not + in a position to + base verb',
    tags: ['am', 'not', 'position', 'decide', 'professional', 'authority'],
    usageNote: 'Politely declining responsibility that isn\'t yours.',
    relatedSentences: ["It's above my authority.", 'I need to consult my manager.', 'This decision is above my level.'],
  },

  { // Question 124 — The requirements are clear
    id: 'day4-q124',
    hindi: 'आवश्यकताएं स्पष्ट हैं।', // The requirements are clear
    english: 'The requirements are clear.', // Answer
    alternatives: ['The requirements are clear to me.', 'I understand the requirements.', 'The specifications are clear.'], // Alternatives
    hint: 'आवश्यकताएं = requirements. स्पष्ट = clear.', // Hint
    explanation: '"The requirements are clear" - confirming understanding after a briefing. "I am clear on the requirements" = I understand them. "The requirements are unclear" = there is confusion. Always confirm clarity before starting work.',
    difficulty: 'medium',
    category: 'are-professional',
    grammarRule: 'The + Noun + are + Adjective (clarity)',
    tags: ['are', 'requirements', 'clear', 'professional', 'understanding'],
    usageNote: 'Confirming understanding before starting a task or project.',
    relatedSentences: ['The brief is clear.', 'I understand what is needed.', 'The scope is well-defined.'],
  },

  { // Question 125 — He is highly qualified
    id: 'day4-q125',
    hindi: 'वह अत्यधिक योग्य है।', // He is highly qualified
    english: 'He is highly qualified.', // Answer
    alternatives: ["He's highly qualified.", 'He is very qualified.', 'He has excellent qualifications.'], // Alternatives
    hint: 'अत्यधिक योग्य = highly qualified.', // Hint
    explanation: '"Highly qualified" - adverb "highly" intensifies the adjective "qualified". Similar phrases: "highly experienced", "highly skilled", "highly recommended", "highly motivated". All use "highly" + adjective pattern.',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'He + is + highly + Adjective',
    tags: ['is', 'he', 'highly', 'qualified', 'professional', 'HR'],
    usageNote: 'Used in recommendations and HR evaluations.',
    relatedSentences: ['She is highly skilled.', 'He is highly recommended.', 'They are highly experienced.'],
  },

  // Questions 126-200: More mixed practice for comprehensive coverage

  { // Question 126 — I am aware of the risks
    id: 'day4-q126',
    hindi: 'मुझे जोखिमों के बारे में पता है।', // I am aware of the risks
    english: 'I am aware of the risks.', // Answer
    alternatives: ["I'm aware of the risks.", 'I know the risks.', 'I understand the risks.'], // Alternatives
    hint: 'जोखिमों के बारे में पता = aware of the risks.', // Hint
    explanation: '"Aware of" = जानना/पता होना. Professional risk management: "I am aware of the risks involved", "Are you aware of the consequences?" "I am not aware of any issues" = I don\'t know about any problems.',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + aware of + the + Noun',
    tags: ['am', 'aware', 'risks', 'professional', 'knowledge'],
    usageNote: 'Risk awareness - important in project management and business decisions.',
    relatedSentences: ['I am aware of the situation.', 'I am not aware of any issues.', 'Are you aware of the deadline?'],
  },

  { // Question 127 — The results are impressive
    id: 'day4-q127',
    hindi: 'परिणाम प्रभावशाली हैं।', // The results are impressive
    english: 'The results are impressive.', // Answer
    alternatives: ['The results are outstanding.', 'The results are excellent.', 'The results are beyond expectations.'], // Alternatives
    hint: 'प्रभावशाली = impressive.', // Hint
    explanation: 'Result quality scale: acceptable < good < great < impressive < outstanding < exceptional < beyond expectations. In performance reviews: "Your results are impressive" = very positive feedback. "The quarterly results are impressive."',
    difficulty: 'medium',
    category: 'are-professional',
    grammarRule: 'The + Noun + are + Adjective (quality)',
    tags: ['are', 'results', 'impressive', 'professional', 'performance'],
    usageNote: 'Positive feedback phrase in performance reviews and business reports.',
    relatedSentences: ['The performance is outstanding.', 'The numbers are excellent.', 'The growth is remarkable.'],
  },

  { // Question 128 — I am deeply sorry
    id: 'day4-q128',
    hindi: 'मुझे बहुत खेद है।', // I am deeply sorry
    english: 'I am deeply sorry.', // Answer
    alternatives: ["I'm deeply sorry.", 'I am very sorry.', 'I sincerely apologize.'], // Alternatives
    hint: 'बहुत खेद = deeply sorry. Apology phrase.', // Hint
    explanation: '"I am deeply sorry" is a very strong, sincere apology. Sincerity scale: "Sorry" < "I am sorry" < "I am very sorry" < "I am deeply sorry" < "I sincerely apologize". Use "deeply" for serious mistakes.',
    difficulty: 'medium',
    category: 'am-apology',
    grammarRule: 'I + am + deeply + Adjective (apology)',
    tags: ['am', 'deeply', 'sorry', 'apology', 'professional', 'sincere'],
    usageNote: 'Sincere apology - use for serious mistakes or important situations.',
    relatedSentences: ['I sincerely apologize.', 'I am truly sorry.', 'Please accept my apologies.'],
  },

  { // Question 129 — The budget is approved
    id: 'day4-q129',
    hindi: 'बजट मंजूर हो गया है।', // The budget is approved
    english: 'The budget is approved.', // Answer
    alternatives: ['The budget has been approved.', 'The budget is sanctioned.', 'The funds are approved.'], // Alternatives
    hint: 'मंजूर = approved. बजट = budget.', // Hint
    explanation: '"Approved" (past participle as adjective). "The budget is approved" = someone has officially accepted it. Business: "Your leave application is approved", "The project is approved", "The proposal is approved by management".',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Past Participle (as adjective)',
    tags: ['is', 'budget', 'approved', 'professional', 'finance', 'management'],
    usageNote: 'Used in finance and project management contexts.',
    relatedSentences: ['The request is approved.', 'Your leave is sanctioned.', 'The plan is rejected.'],
  },

  { // Question 130 — They are highly motivated
    id: 'day4-q130',
    hindi: 'वे अत्यधिक प्रेरित हैं।', // They are highly motivated
    english: 'They are highly motivated.', // Answer
    alternatives: ["They're highly motivated.", 'They are very driven.', 'They are enthusiastic.'], // Alternatives
    hint: 'प्रेरित = motivated. अत्यधिक = highly.', // Hint
    explanation: '"Motivated" = driven to work hard. "Highly motivated team" is what every manager wants. Related: "self-motivated" (without needing others\' help), "intrinsically motivated" (driven by personal interest).',
    difficulty: 'medium',
    category: 'are-professional',
    grammarRule: 'They + are + highly + Adjective',
    tags: ['are', 'they', 'highly', 'motivated', 'professional', 'team'],
    usageNote: 'Describing team performance and work ethic.',
    relatedSentences: ['They are very enthusiastic.', 'They are self-driven.', 'They are passionate about their work.'],
  },

  { // Question 131 — I am not comfortable with this
    id: 'day4-q131',
    hindi: 'मुझे इससे असहजता है।', // I am not comfortable with this
    english: 'I am not comfortable with this.', // Answer
    alternatives: ["I'm not comfortable with this.", 'I am uncomfortable with this.', 'I have reservations about this.'], // Alternatives
    hint: 'असहजता = discomfort. "not comfortable with" = to be uneasy.', // Hint
    explanation: '"I am not comfortable with this" = polite way to say you disagree or feel uneasy. Professional: "I am not comfortable with sharing that information", "I am uncomfortable with this approach." Alternative: "I have concerns about this."',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + not + comfortable with + this',
    tags: ['am', 'not', 'comfortable', 'professional', 'boundary', 'polite'],
    usageNote: 'Politely expressing discomfort or disagreement in professional settings.',
    relatedSentences: ['I have some concerns.', 'I am not sure about this approach.', 'I would like to discuss this further.'],
  },

  { // Question 132 — The contract is signed
    id: 'day4-q132',
    hindi: 'अनुबंध पर हस्ताक्षर हो गए हैं।', // The contract is signed
    english: 'The contract is signed.', // Answer
    alternatives: ['The agreement is signed.', 'The contract has been signed.', 'The deal is done.'], // Alternatives
    hint: 'अनुबंध = contract. हस्ताक्षर हो गए = signed.', // Hint
    explanation: '"The contract is signed" = it\'s official and binding. Business milestones: "The contract is signed", "The deal is closed", "The agreement is executed". "Executed" in legal contexts means officially signed and in force.',
    difficulty: 'medium',
    category: 'is-business',
    grammarRule: 'The + Noun + is + Past Participle (status)',
    tags: ['is', 'contract', 'signed', 'business', 'legal', 'professional'],
    usageNote: 'Legal and business milestone vocabulary.',
    relatedSentences: ['The deal is closed.', 'The agreement is finalized.', 'The MOU is signed.'],
  },

  { // Question 133 — We are expanding our team
    id: 'day4-q133',
    hindi: 'हम अपनी टीम बढ़ा रहे हैं।', // We are expanding our team
    english: 'We are expanding our team.', // Answer
    alternatives: ["We're expanding our team.", 'We are growing our team.', 'We are hiring more people.'], // Alternatives
    hint: 'बढ़ाना = expanding/growing.', // Hint
    explanation: '"We are expanding our team" = we are adding more members. Business growth: "We are expanding our operations", "We are expanding into new markets", "We are growing rapidly". Present continuous for ongoing processes.',
    difficulty: 'medium',
    category: 'are-business',
    grammarRule: 'We + are + expanding + our + Noun',
    tags: ['are', 'we', 'expanding', 'team', 'business', 'growth'],
    usageNote: 'Used when discussing business growth and hiring.',
    relatedSentences: ['We are growing fast.', 'We are hiring actively.', 'We are scaling the business.'],
  },

  { // Question 134 — I am focused on results
    id: 'day4-q134',
    hindi: 'मैं परिणामों पर केंद्रित हूँ।', // I am focused on results
    english: 'I am focused on results.', // Answer
    alternatives: ["I'm focused on results.", 'I am results-driven.', 'I am outcome-focused.'], // Alternatives
    hint: 'केंद्रित = focused. परिणामों पर = on results.', // Hint
    explanation: '"Focused on results" = results-oriented mindset. Interview: "I am very focused on delivering results", "I am outcome-oriented", "I am result-driven". Key professional attributes to mention in interviews.',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + focused on + Noun',
    tags: ['am', 'focused', 'results', 'professional', 'interview', 'attributes'],
    usageNote: 'Key professional attribute - mention in interviews and appraisals.',
    relatedSentences: ['I am goal-oriented.', 'I am driven by results.', 'I am outcome-focused.'],
  },

  { // Question 135 — The interview is tomorrow
    id: 'day4-q135',
    hindi: 'इंटरव्यू कल है।', // The interview is tomorrow
    english: 'The interview is tomorrow.', // Answer
    alternatives: ["Tomorrow is my interview.", 'I have an interview tomorrow.', 'The interview is scheduled for tomorrow.'], // Alternatives
    hint: 'इंटरव्यू = interview. कल = tomorrow.', // Hint
    explanation: '"The interview is tomorrow" - time expression. "I have an interview tomorrow" = I will attend an interview. "My interview is at 10 AM" - specific time. "The interview went well" - past tense after it\'s done.',
    difficulty: 'easy',
    category: 'is-time',
    grammarRule: 'The + Noun + is + Time Expression',
    tags: ['is', 'interview', 'tomorrow', 'time', 'professional'],
    usageNote: 'Scheduling and time management vocabulary.',
    relatedSentences: ['The exam is next week.', 'The meeting is at 3 PM.', 'The conference is in December.'],
  },

  { // Question 136 — I am not in favor of this plan
    id: 'day4-q136',
    hindi: 'मैं इस योजना के पक्ष में नहीं हूँ।', // I am not in favor of this plan
    english: 'I am not in favor of this plan.', // Answer
    alternatives: ["I'm not in favor of this plan.", 'I am against this plan.', 'I do not support this plan.'], // Alternatives
    hint: '"In favor of" = पक्ष में। Not in favor = खिलाफ।', // Hint
    explanation: '"I am not in favor of" = I oppose this/I don\'t support. Professional disagreement. "I am in favor of" = I support/agree. Meeting language: "Are you in favor of the proposal?" "I am not in favor, but I will support the decision."',
    difficulty: 'hard',
    category: 'am-professional',
    grammarRule: 'I + am + not + in favor of + this + Noun',
    tags: ['am', 'not', 'favor', 'plan', 'professional', 'disagreement'],
    usageNote: 'Professional way to express disagreement with a proposal.',
    relatedSentences: ['I oppose this decision.', 'I disagree with this approach.', 'I have concerns about this plan.'],
  },

  { // Question 137 — The presentation is due on Friday
    id: 'day4-q137',
    hindi: 'प्रेजेंटेशन शुक्रवार को जमा करनी है।', // The presentation is due on Friday
    english: 'The presentation is due on Friday.', // Answer
    alternatives: ['The presentation needs to be submitted by Friday.', 'Friday is the deadline for the presentation.'], // Alternatives
    hint: '"Due on" = जमा करने की तारीख। Due = देय/जमा करना।', // Hint
    explanation: '"Due" = must be completed/submitted by this time. "Due on Friday" = deadline is Friday. "Due by 5 PM" = must finish before 5 PM. "Due date" = अंतिम तिथि. "Overdue" = past the deadline (देरी हो गई).',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + due + on + Day',
    tags: ['is', 'due', 'presentation', 'Friday', 'deadline', 'professional'],
    usageNote: '"Due" for deadlines - essential office vocabulary.',
    relatedSentences: ['The report is due Monday.', 'The assignment is due tomorrow.', 'The invoice is overdue.'],
  },

  { // Question 138 — I am grateful for this opportunity
    id: 'day4-q138',
    hindi: 'मैं इस अवसर के लिए आभारी हूँ।', // I am grateful for this opportunity
    english: 'I am grateful for this opportunity.', // Answer
    alternatives: ["I'm grateful for this opportunity.", 'I appreciate this opportunity.', 'I am thankful for this chance.'], // Alternatives
    hint: 'आभारी = grateful. अवसर = opportunity.', // Hint
    explanation: '"I am grateful for this opportunity" - perfect interview closing. Express gratitude for being considered. "I am truly grateful for your time", "I am deeply grateful for this chance to grow." Very professional.',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + grateful for + this + Noun',
    tags: ['am', 'grateful', 'opportunity', 'interview', 'professional', 'closing'],
    usageNote: 'Excellent interview closing statement - expresses gratitude and positivity.',
    relatedSentences: ["Thank you for this opportunity.", 'I appreciate your consideration.', 'I am honored to be here.'],
  },

  { // Question 139 — The answer is correct
    id: 'day4-q139',
    hindi: 'जवाब सही है।', // The answer is correct
    english: 'The answer is correct.', // Answer
    alternatives: ['The answer is right.', 'That is correct.', 'You are right.'], // Alternatives
    hint: 'सही = correct/right.', // Hint
    explanation: '"The answer is correct" = teacher/examiner confirming accuracy. "That\'s correct" (casual confirmation). In quiz/exam: "Your answer is correct. Well done!" "The answer is incorrect" = wrong answer.',
    difficulty: 'easy',
    category: 'is-daily',
    grammarRule: 'The + Noun + is + Adjective (correctness)',
    tags: ['is', 'answer', 'correct', 'right', 'education', 'quiz'],
    usageNote: 'Used in educational and testing contexts to confirm correct answers.',
    relatedSentences: ['That is correct.', 'That is wrong.', 'The answer is incorrect.'],
  },

  { // Question 140 — We are open to new ideas
    id: 'day4-q140',
    hindi: 'हम नए विचारों के लिए खुले हैं।', // We are open to new ideas
    english: 'We are open to new ideas.', // Answer
    alternatives: ["We're open to new ideas.", 'We welcome new ideas.', 'We are receptive to suggestions.'], // Alternatives
    hint: '"Open to" = स्वागत करना / खुले दिमाग से सोचना।', // Hint
    explanation: '"Open to new ideas" = receptive, willing to consider. Company culture: "We are a company that is open to innovation." Interview: "I am open to feedback and new approaches." Shows growth mindset.',
    difficulty: 'medium',
    category: 'are-professional',
    grammarRule: 'We + are + open to + Adjective + Noun',
    tags: ['are', 'we', 'open', 'ideas', 'professional', 'innovation'],
    usageNote: 'Shows positive, growth-oriented mindset in professional contexts.',
    relatedSentences: ['We are open to change.', 'We embrace new approaches.', 'We value innovation.'],
  },

  // ──────────────────────────────────────────────────────────
  // SECTION 15: SENTENCES WITH "THERE IS / THERE ARE"
  // Special use of be verb for existence
  // Note: "There" is the subject, "is/are" is the be verb
  // ──────────────────────────────────────────────────────────

  { // Question 141 — There is a problem
    id: 'day4-q141',
    hindi: 'एक समस्या है।', // There is a problem
    english: 'There is a problem.', // Answer
    alternatives: ['There is an issue.', 'There seems to be a problem.', 'A problem exists.'], // Alternatives
    hint: '"There is" = है (existence). Used for introducing something.', // Hint
    explanation: '"There is + singular noun" = one thing exists. "There are + plural noun" = multiple things exist. "There is a bug in the code", "There are several issues." Don\'t confuse "there" (place) with "there is/are" (existence).',
    difficulty: 'medium',
    category: 'there-is',
    grammarRule: 'There + is + a/an + Singular Noun',
    tags: ['there', 'is', 'problem', 'existence', 'professional'],
    usageNote: '"There is/are" introduces existence of something for the first time.',
    relatedSentences: ['There is a solution.', 'There is an opportunity.', 'There is no other way.'],
  },

  { // Question 142 — There are many options
    id: 'day4-q142',
    hindi: 'कई विकल्प हैं।', // There are many options
    english: 'There are many options.', // Answer
    alternatives: ['There are several options.', 'Many options are available.', 'We have many options.'], // Alternatives
    hint: '"There are" = हैं (plural). विकल्प = options.', // Hint
    explanation: '"There are" for plural. "There are many options", "There are several alternatives", "There are a few concerns". In meetings: "There are three main issues we need to address today."',
    difficulty: 'medium',
    category: 'there-are',
    grammarRule: 'There + are + many + Plural Noun',
    tags: ['there', 'are', 'many', 'options', 'professional'],
    usageNote: 'Introducing multiple items, issues, or possibilities.',
    relatedSentences: ['There are three steps.', 'There are two solutions.', 'There are many challenges.'],
  },

  { // Question 143 — There is no time to waste
    id: 'day4-q143',
    hindi: 'समय बर्बाद करने का वक्त नहीं है।', // There is no time to waste
    english: 'There is no time to waste.', // Answer
    alternatives: ["There's no time to waste.", 'We have no time to waste.', 'Time is short.'], // Alternatives
    hint: '"There is no" = नहीं है। Urgency expression.', // Hint
    explanation: '"There is no time to waste" = we must act immediately. Urgency phrases: "There is no time to lose", "We cannot afford to delay", "Time is of the essence." Professional context: before a critical deadline.',
    difficulty: 'hard',
    category: 'there-is',
    grammarRule: 'There + is + no + Noun + to + base verb',
    tags: ['there', 'is', 'no', 'time', 'waste', 'urgency', 'professional'],
    usageNote: 'Used to create urgency and motivate quick action.',
    relatedSentences: ['Time is of the essence.', 'We need to act now.', 'Every minute counts.'],
  },

  { // Question 144 — There is no doubt about it
    id: 'day4-q144',
    hindi: 'इसमें कोई शक नहीं है।', // There is no doubt about it
    english: 'There is no doubt about it.', // Answer
    alternatives: ["There's no doubt about it.", 'I am absolutely certain.', 'It is undeniable.'], // Alternatives
    hint: 'कोई शक नहीं = no doubt.', // Hint
    explanation: '"There is no doubt" = absolutely certain, 100% sure. Confidence phrases: "There is no doubt about our commitment", "There is no question about the quality." Shows confidence and conviction.',
    difficulty: 'hard',
    category: 'there-is',
    grammarRule: 'There + is + no + Noun + about + it',
    tags: ['there', 'is', 'no', 'doubt', 'certainty', 'confidence'],
    usageNote: 'Expressing absolute certainty and confidence.',
    relatedSentences: ['I am absolutely certain.', 'There is no question.', 'I have no doubt.'],
  },

  { // Question 145 — There is a lot of potential
    id: 'day4-q145',
    hindi: 'बहुत संभावना है।', // There is a lot of potential
    english: 'There is a lot of potential.', // Answer
    alternatives: ["There's a lot of potential.", 'There is great potential.', 'The potential is huge.'], // Alternatives
    hint: 'संभावना = potential. There is + a lot of + noun.', // Hint
    explanation: '"Potential" = future capability or possibility. "There is a lot of potential in this market", "You have a lot of potential" (praising someone). Business: "There is enormous potential in this sector."',
    difficulty: 'medium',
    category: 'there-is',
    grammarRule: 'There + is + a lot of + Noun',
    tags: ['there', 'is', 'lot', 'potential', 'business', 'positive'],
    usageNote: 'Expressing future possibility and optimism in business.',
    relatedSentences: ['There is huge potential here.', 'You have great potential.', 'There is room for growth.'],
  },

  // Continue with more sentences...

  { // Question 146 — I am a quick learner
    id: 'day4-q146',
    hindi: 'मैं जल्दी सीखने वाला व्यक्ति हूँ।', // I am a quick learner
    english: 'I am a quick learner.', // Answer
    alternatives: ["I'm a quick learner.", 'I learn things quickly.', 'I am a fast learner.'], // Alternatives
    hint: 'जल्दी सीखना = quick learner.', // Hint
    explanation: '"I am a quick learner" = I can pick up new skills rapidly. Interview must-say: "I am a quick learner and adapt well to new environments." Also: "I am a fast learner", "I absorb information quickly".',
    difficulty: 'medium',
    category: 'am-professional',
    grammarRule: 'I + am + a + Adjective + Noun (compound)',
    tags: ['am', 'quick', 'learner', 'interview', 'skills', 'professional'],
    usageNote: 'Essential interview phrase - everyone should learn to say this naturally.',
    relatedSentences: ['I adapt quickly.', 'I pick up skills fast.', 'I am always learning.'],
  },

  { // Question 147 — The system is down
    id: 'day4-q147',
    hindi: 'सिस्टम बंद हो गया है।', // The system is down
    english: 'The system is down.', // Answer
    alternatives: ['The system is not working.', 'The system is offline.', 'The server is down.'], // Alternatives
    hint: '"Down" = बंद/काम नहीं कर रहा (IT context).', // Hint
    explanation: '"System is down" = IT outage, not working. "The website is down", "The app is down", "The server is down". IT vocabulary: "down" = offline/not available. "Up" = online/working. "The system will be back up in an hour."',
    difficulty: 'medium',
    category: 'is-technical',
    grammarRule: 'The + Noun + is + down (technical adjective)',
    tags: ['is', 'system', 'down', 'IT', 'technical', 'office'],
    usageNote: 'IT/technical vocabulary for system outages.',
    relatedSentences: ['The server is down.', 'The website is offline.', 'The app is not working.'],
  },

  { // Question 148 — We are fully booked
    id: 'day4-q148',
    hindi: 'हमारे पास कोई जगह नहीं है।', // We are fully booked
    english: 'We are fully booked.', // Answer
    alternatives: ["We're fully booked.", 'We have no availability.', 'We are at capacity.'], // Alternatives
    hint: '"Fully booked" = सब जगह भर गई है।', // Hint
    explanation: '"Fully booked" = no more space/slots available. Hotels, restaurants, events use this. "I am sorry, we are fully booked this weekend." "Sold out" = सब टिकट/items बिक गए. Similar meaning but for products.',
    difficulty: 'medium',
    category: 'are-business',
    grammarRule: 'We + are + fully + Past Participle (adjective)',
    tags: ['are', 'we', 'fully', 'booked', 'business', 'hotel', 'event'],
    usageNote: 'Used in hospitality, restaurants, and event management.',
    relatedSentences: ['We have no availability.', 'All slots are taken.', 'We are at full capacity.'],
  },

  { // Question 149 — I am bilingual
    id: 'day4-q149',
    hindi: 'मैं दो भाषाएं बोलता हूँ।', // I am bilingual
    english: 'I am bilingual.', // Answer
    alternatives: ["I'm bilingual.", 'I speak two languages.', 'I am fluent in two languages.'], // Alternatives
    hint: 'Bilingual = दो भाषाएं बोलने वाला।', // Hint
    explanation: '"Bilingual" = speaks two languages fluently. "Multilingual" = three or more languages. Resume: "I am bilingual in Hindi and English." Very valuable professional skill. "I am proficient in English and Hindi."',
    difficulty: 'hard',
    category: 'am-skills',
    grammarRule: 'I + am + Adjective (language skill)',
    tags: ['am', 'bilingual', 'language', 'skills', 'professional', 'resume'],
    usageNote: 'Language skills vocabulary - important for professional profiles.',
    relatedSentences: ['I am fluent in English.', 'I am proficient in Hindi.', 'I am multilingual.'],
  },

  { // Question 150 — The decision is final
    id: 'day4-q150',
    hindi: 'यह निर्णय अंतिम है।', // The decision is final
    english: 'The decision is final.', // Answer
    alternatives: ['The decision is irreversible.', 'This is a final decision.', 'The matter is settled.'], // Alternatives
    hint: 'अंतिम = final. निर्णय = decision.', // Hint
    explanation: '"The decision is final" = no more discussion, it won\'t change. "Final" in business means absolutely concluded. "The decision is final and binding." "This is non-negotiable." Management communication.',
    difficulty: 'medium',
    category: 'is-professional',
    grammarRule: 'The + Noun + is + Adjective (finality)',
    tags: ['is', 'decision', 'final', 'professional', 'management'],
    usageNote: 'Used when a decision cannot be changed - management communication.',
    relatedSentences: ['This is non-negotiable.', 'The matter is settled.', 'The policy is fixed.'],
  },

  // ── SECTION 16: BE VERB WITH FAMILY & SOCIAL CONTEXTS ────

  { // Question 151 — My father is a businessman
    id: 'day4-q151',
    hindi: 'मेरे पिता एक व्यापारी हैं।', // My father is a businessman
    english: 'My father is a businessman.', // Answer
    alternatives: ['My dad is a businessman.', 'My father runs a business.'], // Alternatives
    hint: 'My father + is + a + profession.', // Hint
    explanation: '"My father is a businessman" - describing family member\'s occupation. Use "My" + family relation + "is" + profession. "My mother is a teacher", "My brother is an engineer", "My sister is a doctor".',
    difficulty: 'easy',
    category: 'is-family',
    grammarRule: 'My + Family Noun + is + a/an + Profession',
    tags: ['is', 'father', 'businessman', 'family', 'introduction'],
    usageNote: 'Describing family members\' professions in introductions.',
    relatedSentences: ['My mother is a homemaker.', 'My brother is a student.', 'My sister works in IT.'],
  },

  { // Question 152 — We are a joint family
    id: 'day4-q152',
    hindi: 'हम एक संयुक्त परिवार हैं।', // We are a joint family
    english: 'We are a joint family.', // Answer
    alternatives: ["We're a joint family.", 'We live together as an extended family.'], // Alternatives
    hint: 'संयुक्त परिवार = joint family.', // Hint
    explanation: '"Joint family" = several generations living together. "Nuclear family" = parents and children only. "Extended family" = includes grandparents, uncles, aunts. These are common introduction topics in India.',
    difficulty: 'medium',
    category: 'are-family',
    grammarRule: 'We + are + a + Adjective + Noun (family type)',
    tags: ['are', 'we', 'joint', 'family', 'introduction', 'personal'],
    usageNote: 'Common in Indian English when describing family structure.',
    relatedSentences: ['We are a nuclear family.', 'We are a close-knit family.', 'We live in a joint family.'],
  },

  { // Question 153 — I am the eldest in my family
    id: 'day4-q153',
    hindi: 'मैं अपने परिवार में सबसे बड़ा हूँ।', // I am the eldest in my family
    english: 'I am the eldest in my family.', // Answer
    alternatives: ["I'm the eldest.", 'I am the oldest sibling.', 'I am the firstborn.'], // Alternatives
    hint: 'सबसे बड़ा = eldest/oldest.', // Hint
    explanation: '"Eldest" = oldest (usually for people). "Oldest" = can be for people or things. "The eldest child", "the oldest building". "I am the eldest" = first-born. "I am the youngest" = last-born.',
    difficulty: 'medium',
    category: 'am-family',
    grammarRule: 'I + am + the + Superlative + in + my + Noun',
    tags: ['am', 'eldest', 'family', 'oldest', 'birth-order', 'personal'],
    usageNote: 'Describing your position in the family.',
    relatedSentences: ['I am the youngest.', 'I am the middle child.', 'I have two younger siblings.'],
  },

  { // Question 154 — She is my colleague
    id: 'day4-q154',
    hindi: 'वह मेरी सहकर्मी है।', // She is my colleague
    english: 'She is my colleague.', // Answer
    alternatives: ["She's my colleague.", 'She works with me.', 'We are colleagues.'], // Alternatives
    hint: 'सहकर्मी = colleague. My + colleague.', // Hint
    explanation: '"Colleague" = someone you work with (same level). "Boss/Manager" = your superior. "Subordinate" = works under you. "Peer" = same level colleague. "She is my colleague in the finance team."',
    difficulty: 'easy',
    category: 'is-professional',
    grammarRule: 'She + is + my + Noun (professional relationship)',
    tags: ['is', 'she', 'colleague', 'professional', 'workplace'],
    usageNote: 'Introducing professional relationships.',
    relatedSentences: ['He is my boss.', 'She is my team leader.', 'He is my mentor.'],
  },

  { // Question 155 — They are very supportive
    id: 'day4-q155',
    hindi: 'वे बहुत सहायक हैं।', // They are very supportive
    english: 'They are very supportive.', // Answer
    alternatives: ["They're very supportive.", 'They are very helpful.', 'They always support me.'], // Alternatives
    hint: 'सहायक = supportive/helpful.', // Hint
    explanation: '"Supportive" = always there to help and encourage. "My family is very supportive", "My team is very supportive." Work-life balance discussions: "My colleagues are supportive." Very warm and positive adjective.',
    difficulty: 'easy',
    category: 'are-adjective',
    grammarRule: 'They + are + very + Adjective (personality)',
    tags: ['are', 'they', 'supportive', 'helpful', 'family', 'team'],
    usageNote: 'Positive adjective for describing people who help and encourage.',
    relatedSentences: ['My family is supportive.', 'My friends are always there for me.', 'My team is very helpful.'],
  },

  // ── SECTION 17: BE VERB WITH IDIOMS AND PHRASES ──────────

  { // Question 156 — I am all ears
    id: 'day4-q156',
    hindi: 'मैं ध्यान से सुन रहा हूँ।', // I am all ears
    english: 'I am all ears.', // Answer
    alternatives: ["I'm all ears.", 'I am listening.', 'I am ready to listen.'], // Alternatives
    hint: '"All ears" = पूरा ध्यान देना (idiom).', // Hint
    explanation: '"I am all ears" = I am ready to listen carefully. Idiom where "ears" represents attention. In meetings: "Go ahead, I am all ears." Shows you are fully focused and ready to receive information.',
    difficulty: 'hard',
    category: 'am-idiom',
    grammarRule: 'I + am + all ears (idiomatic)',
    tags: ['am', 'all ears', 'idiom', 'listening', 'professional', 'meeting'],
    usageNote: 'Business idiom meaning you are fully attentive and ready to listen.',
    relatedSentences: ['I am listening.', 'You have my full attention.', 'Please, go on.'],
  },

  { // Question 157 — We are in the same boat
    id: 'day4-q157',
    hindi: 'हम सभी एक ही स्थिति में हैं।', // We are in the same boat
    english: 'We are in the same boat.', // Answer
    alternatives: ["We're in the same boat.", 'We face the same situation.', 'We have the same problem.'], // Alternatives
    hint: '"In the same boat" = एक ही मुसीबत में होना।', // Hint
    explanation: '"In the same boat" = facing the same difficulty or situation. Team empathy phrase: "I understand your struggle, we are all in the same boat." Shows solidarity. Not literal - no actual boat!',
    difficulty: 'hard',
    category: 'are-idiom',
    grammarRule: 'We + are + in the same boat (idiomatic)',
    tags: ['are', 'we', 'same boat', 'idiom', 'empathy', 'solidarity'],
    usageNote: 'Shows empathy and shared experience with others.',
    relatedSentences: ['We all face the same challenge.', 'I understand completely.', 'We are going through the same thing.'],
  },

  { // Question 158 — He is a jack of all trades
    id: 'day4-q158',
    hindi: 'वह सब कुछ थोड़ा-थोड़ा जानता है।', // He is a jack of all trades
    english: 'He is a jack of all trades.', // Answer
    alternatives: ['He knows a little of everything.', 'He is versatile.', 'He can do many things.'], // Alternatives
    hint: '"Jack of all trades" = हर काम थोड़ा-थोड़ा जानना।', // Hint
    explanation: '"Jack of all trades" = knows many different things (idiom). Full saying: "Jack of all trades, master of none." Positive or slightly negative (good at many but expert at none). In modern use: often positive (versatile).',
    difficulty: 'hard',
    category: 'is-idiom',
    grammarRule: 'He + is + a + Noun Phrase (idiomatic)',
    tags: ['is', 'he', 'jack', 'trades', 'idiom', 'versatile', 'skills'],
    usageNote: 'Common English idiom about someone who knows many different things.',
    relatedSentences: ['He is versatile.', 'She is a specialist.', 'He is an expert in his field.'],
  },

  { // Question 159 — I am under the weather
    id: 'day4-q159',
    hindi: 'मैं थोड़ा बीमार महसूस कर रहा हूँ।', // I am under the weather
    english: 'I am under the weather.', // Answer
    alternatives: ["I'm under the weather.", 'I am feeling a little sick.', 'I am not feeling well.'], // Alternatives
    hint: '"Under the weather" = हल्का बीमार (idiom).', // Hint
    explanation: '"I am under the weather" = I feel slightly unwell (mild illness). Polite idiom instead of saying "I am sick." Office context: "I won\'t be coming in today, I am feeling a bit under the weather." Very polite and professional.',
    difficulty: 'hard',
    category: 'am-idiom',
    grammarRule: 'I + am + under the weather (idiomatic)',
    tags: ['am', 'under', 'weather', 'idiom', 'sick', 'unwell', 'professional'],
    usageNote: 'Polite way to say you\'re mildly ill - common in professional sick day messages.',
    relatedSentences: ["I'm not feeling well.", "I'm feeling a bit off.", "I have a mild fever."],
  },

  { // Question 160 — The ball is in your court
    id: 'day4-q160',
    hindi: 'अब निर्णय तुम्हारे हाथ में है।', // The ball is in your court
    english: 'The ball is in your court.', // Answer
    alternatives: ["It's your turn to decide.", 'The decision is yours now.', 'It is up to you.'], // Alternatives
    hint: '"Ball is in your court" = अब तुम्हारी बारी है।', // Hint
    explanation: '"The ball is in your court" = it\'s your turn to make a decision or take action. From tennis - when the ball is on your side, you must hit it. Business negotiation: after presenting your offer, "The ball is in their court now."',
    difficulty: 'hard',
    category: 'is-idiom',
    grammarRule: 'The ball + is + in your court (idiomatic)',
    tags: ['is', 'ball', 'court', 'idiom', 'decision', 'negotiation', 'business'],
    usageNote: 'Business idiom for telling someone it\'s their turn to act or decide.',
    relatedSentences: ["It's up to you.", 'Your move.', 'The next step is yours.'],
  },

  // ── SECTION 18: RAPID FIRE MIXED SENTENCES ───────────────

  { id: 'day4-q161', hindi: 'मैं बहुत अच्छा महसूस कर रहा हूँ।', english: 'I am feeling very good.', alternatives: ["I'm feeling great.", 'I feel wonderful.'], hint: 'I + am + feeling + adjective.', explanation: '"Feeling" with "am" = present continuous. You can say "I feel good" or "I am feeling good" - both correct.', difficulty: 'easy', category: 'am-feeling', grammarRule: 'I + am + feeling + Adjective', tags: ['am', 'feeling', 'good', 'emotion'] },
  { id: 'day4-q162', hindi: 'वह बहुत लंबा है।', english: 'He is very tall.', alternatives: ["He's very tall.", 'He is quite tall.'], hint: 'लंबा = tall.', explanation: '"Very tall" - height description. Very = बहुत. Quite = काफी (slightly less than very).', difficulty: 'easy', category: 'is-adjective', grammarRule: 'He + is + very + Adjective', tags: ['is', 'he', 'tall', 'appearance'] },
  { id: 'day4-q163', hindi: 'आप बहुत अच्छे लगते हो।', english: 'You are looking very nice.', alternatives: ["You look great!", 'You are looking wonderful.'], hint: 'You + are + looking + adjective.', explanation: '"Looking" with are = present continuous. Complimenting appearance.', difficulty: 'easy', category: 'are-appearance', grammarRule: 'You + are + looking + Adjective', tags: ['are', 'you', 'looking', 'nice', 'compliment'] },
  { id: 'day4-q164', hindi: 'यह मुश्किल है।', english: 'It is difficult.', alternatives: ["It's difficult.", 'It is hard.', 'It is challenging.'], hint: 'मुश्किल = difficult/hard/challenging.', explanation: '"Difficult" = not easy. "Hard" = more informal. "Challenging" = positive spin on difficulty.', difficulty: 'easy', category: 'is-adjective', grammarRule: 'It + is + Adjective', tags: ['is', 'it', 'difficult', 'adjective'] },
  { id: 'day4-q165', hindi: 'हम सहमत हैं।', english: 'We are in agreement.', alternatives: ["We're in agreement.", 'We agree.', 'We are aligned.'], hint: '"In agreement" = सहमत होना।', explanation: '"We are in agreement" is more formal than "We agree." Business meetings: "I am glad we are in agreement on this."', difficulty: 'medium', category: 'are-professional', grammarRule: 'We + are + in + agreement', tags: ['are', 'we', 'agreement', 'professional'] },
  { id: 'day4-q166', hindi: 'मैं आपकी बात से सहमत हूँ।', english: 'I am in agreement with you.', alternatives: ["I'm in agreement with you.", 'I agree with you.', 'I am on your side.'], hint: '"In agreement with" = से सहमत।', explanation: '"I am in agreement with you" = I agree completely. More formal than just "I agree."', difficulty: 'medium', category: 'am-professional', grammarRule: 'I + am + in agreement with + Pronoun', tags: ['am', 'agreement', 'you', 'professional', 'agree'] },
  { id: 'day4-q167', hindi: 'वे बहुत अनुभवी पेशेवर हैं।', english: 'They are very experienced professionals.', alternatives: ["They're very experienced professionals.", 'They are seasoned experts.'], hint: 'अनुभवी पेशेवर = experienced professionals.', explanation: '"Seasoned professional" = very experienced (idiom - like a food seasoned over time).', difficulty: 'medium', category: 'are-professional', grammarRule: 'They + are + very + Adjective + Plural Noun', tags: ['are', 'they', 'experienced', 'professionals'] },
  { id: 'day4-q168', hindi: 'यह प्रोजेक्ट बड़ी चुनौती है।', english: 'This project is a great challenge.', alternatives: ["This project is quite challenging.", 'This is a demanding project.'], hint: 'चुनौती = challenge.', explanation: '"Challenge" can be positive (interesting difficulty) or negative. "This is a great challenge and I look forward to it."', difficulty: 'medium', category: 'is-professional', grammarRule: 'This + is + a + Adjective + Noun', tags: ['is', 'project', 'challenge', 'professional'] },
  { id: 'day4-q169', hindi: 'मैं बेरोज़गार हूँ।', english: 'I am unemployed.', alternatives: ["I'm unemployed.", 'I am between jobs.', 'I am currently job seeking.'], hint: 'बेरोज़गार = unemployed.', explanation: '"I am unemployed" is direct. "I am between jobs" is more professional. "I am currently looking for opportunities" = best way to say it.', difficulty: 'medium', category: 'am-status', grammarRule: 'I + am + Adjective (employment status)', tags: ['am', 'unemployed', 'status', 'professional'] },
  { id: 'day4-q170', hindi: 'वह एक जानी-मानी हस्ती है।', english: 'She is a well-known personality.', alternatives: ["She's a well-known personality.", 'She is a famous figure.', 'She is a celebrity.'], hint: 'जानी-मानी = well-known/famous.', explanation: '"Well-known" = widely recognized. "Famous" = very well-known. "Celebrity" = entertainment/media famous. "Renowned" = famous for excellence.', difficulty: 'medium', category: 'is-adjective', grammarRule: 'She + is + a + Hyphenated Adjective + Noun', tags: ['is', 'she', 'well-known', 'famous', 'personality'] },
  { id: 'day4-q171', hindi: 'हम एक निजी कंपनी हैं।', english: 'We are a private company.', alternatives: ["We're a private company.", 'We are a privately held company.'], hint: 'निजी = private. कंपनी = company.', explanation: '"Private company" = not listed on stock market. "Public company" = listed on stock exchange. "Startup" = new small company. Professional introduction.', difficulty: 'medium', category: 'are-business', grammarRule: 'We + are + a + Adjective + Noun (company)', tags: ['are', 'we', 'private', 'company', 'business'] },
  { id: 'day4-q172', hindi: 'मैं स्नातकोत्तर हूँ।', english: 'I am a postgraduate.', alternatives: ["I'm a postgraduate.", 'I have a master\'s degree.', 'I am a master\'s graduate.'], hint: 'स्नातकोत्तर = postgraduate (PG/master\'s).', explanation: '"Postgraduate" = after bachelor\'s degree. "Graduate" = bachelor\'s degree holder. "Undergraduate" = currently doing bachelor\'s. "Postdoctoral" = after PhD.', difficulty: 'hard', category: 'am-education', grammarRule: 'I + am + a + Noun (educational level)', tags: ['am', 'postgraduate', 'education', 'degree', 'professional'] },
  { id: 'day4-q173', hindi: 'यह ऑफर बहुत आकर्षक है।', english: 'This offer is very attractive.', alternatives: ["This offer is very appealing.", 'This is a great offer.', 'The offer is very tempting.'], hint: 'आकर्षक = attractive/appealing.', explanation: '"Attractive offer" = appealing, good value. Business: "This package is very attractive." Negotiation: "The offer is attractive but I would like to discuss the terms."', difficulty: 'medium', category: 'is-business', grammarRule: 'This + is + very + Adjective (evaluation)', tags: ['is', 'offer', 'attractive', 'business', 'negotiation'] },
  { id: 'day4-q174', hindi: 'आप पहली बार यहाँ आए हैं।', english: 'You are here for the first time.', alternatives: ["It's your first time here.", 'You are visiting us for the first time.'], hint: 'पहली बार = first time.', explanation: '"You are here for the first time" = this is your first visit. Welcoming phrase. "Is this your first time?" "Are you new here?" Both ask the same thing.', difficulty: 'medium', category: 'are-daily', grammarRule: 'You + are + here + for the + first + Noun', tags: ['are', 'you', 'first', 'time', 'visit', 'welcome'] },
  { id: 'day4-q175', hindi: 'मैं इस बारे में पक्का हूँ।', english: 'I am certain about this.', alternatives: ["I'm certain about this.", 'I am sure about this.', 'I am confident about this.'], hint: 'पक्का = certain/sure.', explanation: '"Certain" is stronger than "sure". "I am 100% certain", "I am absolutely certain." Professional confidence builder.', difficulty: 'medium', category: 'am-adjective', grammarRule: 'I + am + Adjective + about + this', tags: ['am', 'certain', 'sure', 'confident', 'professional'] },
  { id: 'day4-q176', hindi: 'वह एक बहुत अच्छा वक्ता है।', english: 'He is a very good speaker.', alternatives: ["He's a very good speaker.", 'He is an excellent communicator.', 'He speaks very well.'], hint: 'वक्ता = speaker.', explanation: '"Speaker" = someone who speaks publicly. "Communicator" = someone who communicates well overall. "Public speaker" = addresses large audiences.', difficulty: 'medium', category: 'is-skills', grammarRule: 'He + is + a + very + good + Noun', tags: ['is', 'he', 'speaker', 'communicator', 'skills'] },
  { id: 'day4-q177', hindi: 'यह निवेश बहुत फायदेमंद है।', english: 'This investment is very profitable.', alternatives: ["This investment is quite profitable.", 'This is a very good investment.', 'This investment has good returns.'], hint: 'फायदेमंद = profitable.', explanation: '"Profitable" = makes profit/money. "Return on investment" (ROI) = profit percentage. "This investment has a high ROI." Finance vocabulary.', difficulty: 'hard', category: 'is-finance', grammarRule: 'This + is + very + Adjective (financial)', tags: ['is', 'investment', 'profitable', 'finance', 'business'] },
  { id: 'day4-q178', hindi: 'वे हमारे प्रतिस्पर्धी हैं।', english: 'They are our competitors.', alternatives: ["They're our competitors.", 'They are our rivals.', 'They are in the same market as us.'], hint: 'प्रतिस्पर्धी = competitors/rivals.', explanation: '"Competitor" = company competing for the same market. "Rival" = more personal competition. "We need to stay ahead of our competitors." Business strategy vocabulary.', difficulty: 'medium', category: 'are-business', grammarRule: 'They + are + our + Noun (business relationship)', tags: ['are', 'they', 'competitors', 'business', 'market'] },
  { id: 'day4-q179', hindi: 'मैं इस विषय में रुचि रखता हूँ।', english: 'I am interested in this subject.', alternatives: ["I'm interested in this topic.", 'I have an interest in this field.', 'This subject interests me.'], hint: '"Interested in" = रुचि रखना।', explanation: '"I am interested in" + noun/gerund. Interview: "I am very interested in machine learning." Shows genuine curiosity and passion for the subject.', difficulty: 'medium', category: 'am-interest', grammarRule: 'I + am + interested in + this + Noun', tags: ['am', 'interested', 'subject', 'professional', 'learning'] },
  { id: 'day4-q180', hindi: 'वह स्वस्थ और फिट है।', english: 'He is healthy and fit.', alternatives: ["He's healthy and fit.", 'He is in good shape.', 'He is physically fit.'], hint: 'स्वस्थ = healthy. फिट = fit.', explanation: '"Healthy and fit" - both health adjectives together. "He is in good shape" = physical fitness idiom. "She maintains a healthy lifestyle."', difficulty: 'easy', category: 'is-health', grammarRule: 'He + is + Adjective + and + Adjective', tags: ['is', 'he', 'healthy', 'fit', 'health'] },
  { id: 'day4-q181', hindi: 'यह परियोजना बजट के अंदर है।', english: 'This project is within budget.', alternatives: ["This project is under budget.", 'We are within our budget.', 'The project is on budget.'], hint: 'बजट के अंदर = within/under budget.', explanation: '"Within budget" = spending less than or equal to allocated amount. "Under budget" = spending less than expected (positive). "Over budget" = spending more (negative). Project management vocabulary.', difficulty: 'medium', category: 'is-professional', grammarRule: 'This + is + within + Noun', tags: ['is', 'project', 'budget', 'finance', 'management'] },
  { id: 'day4-q182', hindi: 'वे बहुत अनुशासित हैं।', english: 'They are very disciplined.', alternatives: ["They're very disciplined.", 'They are highly disciplined.', 'They follow rules strictly.'], hint: 'अनुशासित = disciplined.', explanation: '"Disciplined" = following rules and structure consistently. Military, sports, or office context. "Self-disciplined" = discipline comes from within oneself.', difficulty: 'medium', category: 'are-adjective', grammarRule: 'They + are + very + Adjective', tags: ['are', 'they', 'disciplined', 'professional', 'team'] },
  { id: 'day4-q183', hindi: 'मैं पूरी तरह तैयार हूँ।', english: 'I am fully prepared.', alternatives: ["I'm fully prepared.", 'I am all set.', 'I am completely ready.'], hint: 'पूरी तरह तैयार = fully prepared.', explanation: '"Fully prepared" = completely ready. Before a presentation: "I am fully prepared for the interview." "Fully" adds emphasis to the adjective.', difficulty: 'easy', category: 'am-adjective', grammarRule: 'I + am + fully + Adjective', tags: ['am', 'fully', 'prepared', 'ready', 'professional'] },
  { id: 'day4-q184', hindi: 'यह समझौता बहुत फायदेमंद है।', english: 'This agreement is very beneficial.', alternatives: ["This deal is very advantageous.", 'This agreement benefits both sides.'], hint: 'फायदेमंद = beneficial.', explanation: '"Beneficial" = providing benefit/advantage. "Mutually beneficial" = both parties benefit. Business negotiations: "This deal is mutually beneficial."', difficulty: 'hard', category: 'is-business', grammarRule: 'This + is + very + Adjective (advantage)', tags: ['is', 'agreement', 'beneficial', 'business', 'negotiation'] },
  { id: 'day4-q185', hindi: 'हम एक मजबूत कंपनी हैं।', english: 'We are a strong company.', alternatives: ["We're a strong company.", 'We are a well-established firm.', 'We are a leading organization.'], hint: 'मजबूत = strong. Well-established = अच्छी तरह स्थापित।', explanation: '"Strong company" = stable and successful. "Well-established" = exists for a long time with good reputation. "Leading" = at the top of the industry.', difficulty: 'medium', category: 'are-business', grammarRule: 'We + are + a + Adjective + Noun (company)', tags: ['are', 'we', 'strong', 'company', 'business'] },
  { id: 'day4-q186', hindi: 'मुझे आज बुखार है।', english: 'I am having a fever today.', alternatives: ["I have a fever.", "I'm running a fever.", 'I am sick with fever.'], hint: 'बुखार = fever.', explanation: '"I have a fever" is most natural. "I am running a fever" means temperature is elevated. In office absence messages: "I am unwell with fever and will not be coming today."', difficulty: 'medium', category: 'am-health', grammarRule: 'I + am + having/running + a + fever', tags: ['am', 'fever', 'health', 'sick', 'daily'] },
  { id: 'day4-q187', hindi: 'वह बहुत जिम्मेदार है।', english: 'She is very responsible.', alternatives: ["She's very responsible.", 'She is highly reliable.', 'She is very dependable.'], hint: 'जिम्मेदार = responsible.', explanation: '"Responsible" = handles duties well. "Reliable" = can be counted on. "Dependable" = consistently there when needed. All positive professional qualities.', difficulty: 'easy', category: 'is-adjective', grammarRule: 'She + is + very + Adjective (character)', tags: ['is', 'she', 'responsible', 'reliable', 'professional'] },
  { id: 'day4-q188', hindi: 'यह काम रुचिकर है।', english: 'This work is interesting.', alternatives: ["This job is interesting.", 'This work is engaging.', 'I find this work interesting.'], hint: 'रुचिकर = interesting.', explanation: '"Interesting" = catches your attention. "Engaging" = keeps you involved. "Fascinating" = extremely interesting. Work motivation: "I find this role very interesting."', difficulty: 'easy', category: 'is-professional', grammarRule: 'This + is + Adjective (engagement)', tags: ['is', 'work', 'interesting', 'professional', 'motivation'] },
  { id: 'day4-q189', hindi: 'आप बहुत प्रतिभाशाली हैं।', english: 'You are very talented.', alternatives: ["You're very talented.", 'You have great talent.', 'You are very gifted.'], hint: 'प्रतिभाशाली = talented/gifted.', explanation: '"Talented" = has natural ability. "Gifted" = exceptional natural talent. "Skilled" = has developed ability through practice. All positive compliments.', difficulty: 'easy', category: 'are-compliment', grammarRule: 'You + are + very + Adjective (talent)', tags: ['are', 'you', 'talented', 'gifted', 'compliment'] },
  { id: 'day4-q190', hindi: 'मेरी कंपनी बहुत अच्छी है।', english: 'My company is very good.', alternatives: ["My company is excellent.", 'I work for a great company.', 'My workplace is wonderful.'], hint: 'My company + is + adjective.', explanation: '"My company is very good" - employee satisfaction statement. Related: work culture, growth opportunities, salary, team. Talking about your employer.', difficulty: 'easy', category: 'is-professional', grammarRule: 'My + Noun + is + very + Adjective', tags: ['is', 'company', 'good', 'professional', 'workplace'] },
  { id: 'day4-q191', hindi: 'मैं प्रक्रिया-उन्मुख हूँ।', english: 'I am process-oriented.', alternatives: ["I'm process-oriented.", 'I follow systematic processes.', 'I am structured in my approach.'], hint: 'प्रक्रिया-उन्मुख = process-oriented.', explanation: '"Process-oriented" = focuses on how things are done (the process). "Results-oriented" = focuses on outcomes. Both are valued in different roles. Interview: "I am both process-oriented and results-driven."', difficulty: 'hard', category: 'am-professional', grammarRule: 'I + am + Hyphenated Adjective', tags: ['am', 'process', 'oriented', 'professional', 'interview'] },
  { id: 'day4-q192', hindi: 'यह रिपोर्ट अभी भी बनाई जा रही है।', english: 'The report is still being prepared.', alternatives: ['The report is still in progress.', 'We are still working on the report.'], hint: '"Being prepared" = अभी भी तैयार हो रहा है।', explanation: '"Is being prepared" = passive present continuous. Still + in progress. Update phrase: "The report is still being prepared. We will share it by 5 PM."', difficulty: 'hard', category: 'is-professional', grammarRule: 'The + Noun + is + still + being + past participle', tags: ['is', 'report', 'being', 'prepared', 'passive', 'professional'] },
  { id: 'day4-q193', hindi: 'वे खेल में बहुत अच्छे हैं।', english: 'They are very good at sports.', alternatives: ["They're very good at sports.", 'They are great athletes.', 'They excel at sports.'], hint: '"Good at" = किसी काम में अच्छे होना।', explanation: '"Good at + noun/gerund" = skilled in. "She is very good at communication", "He is great at problem-solving." Essential interview language.', difficulty: 'easy', category: 'are-skills', grammarRule: 'They + are + very + good at + Noun', tags: ['are', 'they', 'good', 'at', 'sports', 'skills'] },
  { id: 'day4-q194', hindi: 'मैं उपलब्धियों से संतुष्ट हूँ।', english: 'I am satisfied with my achievements.', alternatives: ["I'm satisfied with my achievements.", 'I am pleased with what I have accomplished.'], hint: '"Satisfied with" = ... से संतुष्ट।', explanation: '"Satisfied with my achievements" = self-assessment statement. Interview: "I am proud of my achievements but I am always looking to do better."', difficulty: 'hard', category: 'am-professional', grammarRule: 'I + am + satisfied with + my + Noun', tags: ['am', 'satisfied', 'achievements', 'professional', 'self-assessment'] },
  { id: 'day4-q195', hindi: 'वह बाज़ार में एक विश्वसनीय नाम है।', english: 'It is a trusted name in the market.', alternatives: ["It's a trusted brand.", 'It is well-respected in the industry.'], hint: 'विश्वसनीय = trusted. बाज़ार = market.', explanation: '"Trusted name" = brand that people rely on. "Well-respected" = high reputation. Business credibility vocabulary.', difficulty: 'hard', category: 'is-business', grammarRule: 'It + is + a + Adjective + Noun + in + the + Noun', tags: ['is', 'it', 'trusted', 'market', 'business', 'reputation'] },
  { id: 'day4-q196', hindi: 'हम पूरी तरह पारदर्शी हैं।', english: 'We are completely transparent.', alternatives: ["We're completely transparent.", 'We believe in full transparency.', 'We operate with full transparency.'], hint: 'पारदर्शी = transparent.', explanation: '"Transparent" = open, honest, nothing hidden. Corporate governance: "We are transparent in our operations and reporting." Essential for trust-building in business.', difficulty: 'hard', category: 'are-business', grammarRule: 'We + are + completely + Adjective (value)', tags: ['are', 'we', 'transparent', 'business', 'ethics', 'trust'] },
  { id: 'day4-q197', hindi: 'मैं इस मामले में अधिक नहीं जान सकता।', english: 'I am not in a position to comment on this.', alternatives: ["I'm not able to comment on this.", 'This is beyond my knowledge.', "I'm not authorized to discuss this."], hint: '"Not in a position to" = अधिकार/जानकारी नहीं है।', explanation: '"I am not in a position to comment" = I don\'t have the authority or information to make a statement. Professional boundary phrase.', difficulty: 'hard', category: 'am-professional', grammarRule: 'I + am + not + in a position to + base verb', tags: ['am', 'not', 'position', 'comment', 'professional', 'boundary'] },
  { id: 'day4-q198', hindi: 'यह मेरा सबसे अच्छा दिन है।', english: 'This is my best day.', alternatives: ["This is my best day ever.", 'Today is the best day!', 'I am having a wonderful day.'], hint: 'सबसे अच्छा = best. Superlative.', explanation: '"Best" is the superlative of "good". "My best day", "my worst day", "my happiest moment." Emotional expressions using be verb.', difficulty: 'easy', category: 'is-daily', grammarRule: 'This + is + my + Superlative + Noun', tags: ['is', 'best', 'day', 'superlative', 'emotional', 'positive'] },
  { id: 'day4-q199', hindi: 'हम इस निर्णय के बारे में आश्वस्त हैं।', english: 'We are confident about this decision.', alternatives: ["We're confident about this decision.", 'We stand by this decision.', 'We are sure about this choice.'], hint: 'आश्वस्त = confident/sure.', explanation: '"Confident about this decision" = we are certain it is right. Leadership: "We are fully confident about this strategic decision." Shows resolve and clarity.', difficulty: 'hard', category: 'are-professional', grammarRule: 'We + are + confident about + this + Noun', tags: ['are', 'we', 'confident', 'decision', 'professional', 'leadership'] },
  { id: 'day4-q200', hindi: 'मैं इस यात्रा पर खुश हूँ।', english: 'I am happy about this journey.', alternatives: ["I'm happy about this journey.", 'I am excited about this journey.', 'I love this journey.'], hint: '"Happy about" = खुश होना।', explanation: '"Journey" can mean actual travel OR life journey. "I am happy about this learning journey." Metaphorical use: "This career journey has been amazing."', difficulty: 'easy', category: 'am-reflective', grammarRule: 'I + am + happy about + this + Noun', tags: ['am', 'happy', 'journey', 'reflective', 'positive'] },

]; // End of DAY_4_QUESTIONS array

// ============================================================
// VOCABULARY SECTION — Be Verb Related Words (200+ words)
// These vocabulary words are related to Day 4 topic
// ============================================================
export const DAY_4_VOCABULARY = [
  // ── Be Verb Forms ─────────────────────────────────────────
  { word: 'am', hindi: 'हूँ', example: 'I am a student.', pronunciation: 'æm', level: 'A0', category: 'be-verb' },
  { word: 'is', hindi: 'है', example: 'He is a doctor.', pronunciation: 'ɪz', level: 'A0', category: 'be-verb' },
  { word: 'are', hindi: 'हैं', example: 'We are ready.', pronunciation: 'ɑːr', level: 'A0', category: 'be-verb' },
  { word: 'was', hindi: 'था/थी', example: 'I was a student.', pronunciation: 'wɒz', level: 'A0', category: 'be-verb' },
  { word: 'were', hindi: 'थे/थीं', example: 'They were happy.', pronunciation: 'wɜːr', level: 'A0', category: 'be-verb' },
  { word: 'been', hindi: 'हो चुका', example: 'I have been here before.', pronunciation: 'biːn', level: 'A1', category: 'be-verb' },
  { word: 'being', hindi: 'हो रहा है', example: 'It is being fixed.', pronunciation: 'biːɪŋ', level: 'A1', category: 'be-verb' },
  // ── Contractions ──────────────────────────────────────────
  { word: "I'm", hindi: 'मैं हूँ (संक्षिप्त)', example: "I'm ready.", pronunciation: 'aɪm', level: 'A0', category: 'contraction' },
  { word: "he's", hindi: 'वह है (संक्षिप्त)', example: "He's my friend.", pronunciation: 'hiːz', level: 'A0', category: 'contraction' },
  { word: "she's", hindi: 'वह है (स्त्री, संक्षिप्त)', example: "She's a teacher.", pronunciation: 'ʃiːz', level: 'A0', category: 'contraction' },
  { word: "it's", hindi: 'यह है (संक्षिप्त)', example: "It's raining.", pronunciation: 'ɪts', level: 'A0', category: 'contraction' },
  { word: "we're", hindi: 'हम हैं (संक्षिप्त)', example: "We're ready.", pronunciation: 'wɪər', level: 'A0', category: 'contraction' },
  { word: "you're", hindi: 'आप हैं (संक्षिप्त)', example: "You're right.", pronunciation: 'jɔːr', level: 'A0', category: 'contraction' },
  { word: "they're", hindi: 'वे हैं (संक्षिप्त)', example: "They're students.", pronunciation: 'ðɛər', level: 'A0', category: 'contraction' },
  { word: "isn't", hindi: 'नहीं है', example: "He isn't here.", pronunciation: 'ɪznt', level: 'A0', category: 'contraction' },
  { word: "aren't", hindi: 'नहीं हैं', example: "They aren't ready.", pronunciation: 'ɑːrnt', level: 'A0', category: 'contraction' },
  { word: "wasn't", hindi: 'नहीं था/थी', example: "He wasn't there.", pronunciation: 'wɒznt', level: 'A1', category: 'contraction' },
  { word: "weren't", hindi: 'नहीं थे/थीं', example: "They weren't happy.", pronunciation: 'wɜːrnt', level: 'A1', category: 'contraction' },
];

// ============================================================
// PAGE COMPONENT — Renders the Day 4 practice interface
// ============================================================
export default function Day4PracticePage() {
  // Return the main page layout with the quiz component
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Breadcrumb Navigation ─────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days {/* Back to main challenge page */}
        </Link>
        <span>/</span>
        <Link href="/75-days-challenge/4" className="hover:text-white transition-colors">
          Day 4 {/* Link to day 4 detail page */}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Practice</span> {/* Current page */}
      </div>

      {/* ── Topic Info Banner ─────────────────────────────── */}
      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          🔵 {/* Be Verb emoji */}
        </div>
        <div className="flex-1 min-w-0">
          {/* Day badge and topic type */}
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary text-xs">Day 4</span>
            <span className="text-xs text-slate-500">Grammar</span>
            <span className="text-xs text-slate-500">A1 Level</span>
          </div>
          {/* Topic title */}
          <h2 className="font-bold text-white">Be Verb — Am / Is / Are / Was / Were</h2>
          {/* Question count */}
          <p className="text-xs text-slate-500">{DAY_4_QUESTIONS.length}+ questions available</p>
        </div>
        {/* Link to the grammar lesson */}
        <Link href="/75-days-challenge/4"
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Quick Tips Card ───────────────────────────────── */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">💡 Be Verb Quick Rules:</p>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>• <strong>I</strong> → <strong>am</strong> (only "am" with I)</li>
          <li>• <strong>He / She / It</strong> → <strong>is</strong> (singular)</li>
          <li>• <strong>We / You / They</strong> → <strong>are</strong> (plural)</li>
          <li>• Past: <strong>I / He / She / It</strong> → <strong>was</strong> | <strong>We / You / They</strong> → <strong>were</strong></li>
          <li>• Negative: am <strong>not</strong> | is<strong>n't</strong> | are<strong>n't</strong></li>
          <li>• Contraction: I<strong>'m</strong> | He<strong>'s</strong> | We<strong>'re</strong></li>
        </ul>
      </div>

      {/* ── Practice Quiz Component (lazy-loaded) ─────────── */}
      <PracticeQuizComponent
        questions={DAY_4_QUESTIONS} // Pass all 200+ questions
        title="Day 4: Be Verb Practice" // Quiz title
        backHref="/75-days-challenge/4" // Back button destination
        questionsPerSession={50} // Show 50 questions per session
        shuffleMode={true} // Randomize question order
        showProgress={true} // Show progress bar
        showScore={true} // Show score at top
      />

    </div>
  );
}
