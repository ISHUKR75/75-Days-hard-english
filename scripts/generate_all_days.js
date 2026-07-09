const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data/days');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data sets for algorithmic mixing
const subjects = [
  { eng: 'I', hin: 'मैं' },
  { eng: 'You', hin: 'तुम' },
  { eng: 'He', hin: 'वह' },
  { eng: 'She', hin: 'वह' },
  { eng: 'We', hin: 'हम' },
  { eng: 'They', hin: 'वे' },
  { eng: 'Rohan', hin: 'रोहन' },
  { eng: 'The teacher', hin: 'शिक्षक' }
];

const verbs = [
  { eng: 'go', hin: 'जाता', ipa: '/ɡoʊ/' },
  { eng: 'eat', hin: 'खाता', ipa: '/iːt/' },
  { eng: 'play', hin: 'खेलता', ipa: '/pleɪ/' },
  { eng: 'read', hin: 'पढ़ता', ipa: '/riːd/' },
  { eng: 'write', hin: 'लिखता', ipa: '/raɪt/' },
  { eng: 'speak', hin: 'बोलता', ipa: '/spiːk/' },
  { eng: 'understand', hin: 'समझता', ipa: '/ˌʌn.dɚˈstænd/' },
  { eng: 'learn', hin: 'सीखता', ipa: '/lɝːn/' }
];

const objects = [
  { eng: 'English', hin: 'अंग्रेज़ी' },
  { eng: 'food', hin: 'खाना' },
  { eng: 'the book', hin: 'किताब' },
  { eng: 'a letter', hin: 'एक पत्र' },
  { eng: 'truth', hin: 'सच' },
  { eng: 'math', hin: 'गणित' }
];

const topicsList = [
  "Basic of English", "Self Introduction", "Imperative Sentence", "Be Verb", "Demonstrative Pronoun",
  "Has / Have", "Had", "Will Have", "Use of There", "Revision + Practice",
  "Use of Want", "Use of Wanted", "Use of Let", "Use of Let's", "Would Like To",
  "Can", "Should", "May", "Must", "Revision + Speaking Practice",
  "Used To", "Could", "Should Have", "Must Have", "Could Have",
  "Would Have", "May Have", "Might Have", "Will / Shall", "Would + Ought To + Dare",
  "Revision", "Tenses Part 1", "Tenses Part 2", "Tenses Part 3", "Tenses Part 4",
  "Prepositions Part 1", "Prepositions Part 2", "Has To / Have To", "Had To / Will Have To", "Make / Get",
  "Going To", "About To", "Want To / Wanted To", "Need To / Needed To", "Fond Of",
  "Able To", "Conjunctions", "WH Words", "Passive Voice Part 1", "Passive Voice Part 2",
  "Advance Level Sentences Part 1", "Advance Level Sentences Part 2", "Verb List", "Idioms, Phrases & Proverbs", "Important Vocabulary",
  "Miscellaneous Vocabulary", "Stationery Vocabulary", "Foods Vocabulary", "Relation Vocabulary", "Professions Vocabulary",
  "Buildings Vocabulary", "Flowers Vocabulary", "Maths Vocabulary", "Body Vocabulary", "Industry Vocabulary",
  "Colours Vocabulary", "Birds Vocabulary", "Factory Vocabulary", "Application Writing", "Letter Writing",
  "E-mail Writing", "Paragraph Writing", "Notice Writing", "Grammar Revision", "Complete Mock Test"
];

// Helper to generate random questions algorithmically
function generateQuestions(count, dayNum) {
  const qs = [];
  for (let i = 0; i < count; i++) {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    const o = objects[Math.floor(Math.random() * objects.length)];
    
    // Simplistic present tense mapping for demo massive generation
    const isHeSheIt = ['He', 'She', 'Rohan', 'The teacher'].includes(s.eng);
    const verbEng = isHeSheIt ? v.eng + (v.eng.endsWith('o') ? 'es' : 's') : v.eng;
    const sentenceEng = `${s.eng} ${verbEng} ${o.eng}.`;
    
    const isFemale = s.eng === 'She';
    const verbHin = v.hin + (isFemale ? 'ी' : 'ा') + ' है'; // Simplified logic
    const sentenceHin = `${s.hin} ${o.hin} ${verbHin}।`;

    qs.push({
      id: `d${dayNum}-q${i+1}`,
      hindi: sentenceHin,
      english: sentenceEng,
      difficulty: i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
    });
  }
  return qs;
}

// Helper to generate massive vocabulary
function generateVocabulary(count) {
  const vocab = [];
  for (let i = 0; i < count; i++) {
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    vocab.push({
      word: `${v.eng} (Variation ${i+1})`,
      hindi: v.hin,
      ipa: v.ipa,
      example: `I like to ${v.eng} every day.`
    });
  }
  return vocab;
}

// Generate data for Day 1 to 75
async function generateAllDays() {
  console.log('Starting massive data generation for 75 days...');
  
  for (let day = 1; day <= 75; day++) {
    const topicTitle = topicsList[day - 1] || `Day ${day} Topic`;
    
    // Generate massive payloads
    const questions = generateQuestions(1000, day); // 1000 practice questions
    const testQs = generateQuestions(300, day);     // 300 test questions
    const vocabulary = generateVocabulary(1000);    // 1000 vocabulary words

    const dayData = {
      day: day,
      topic: {
        title: topicTitle,
        emoji: '📚',
        cefr: day < 25 ? 'A1' : day < 50 ? 'A2' : 'B1',
        difficulty: day < 25 ? 'beginner' : day < 50 ? 'elementary' : 'intermediate',
        type: 'Comprehensive'
      },
      content: {
        explanation: `# Welcome to Day ${day} - ${topicTitle}\n\nToday we will master this topic comprehensively.\n🇮🇳 आज हम इस विषय को पूरी तरह से सीखेंगे।\n\n**Concept Details:**\nThis is a generated massive text to ensure deep detail. Practice is the key to fluency. We will look at thousands of examples today.`,
        rules: [
          `Rule 1 for ${topicTitle}: Always remember the sentence structure.`,
          `Rule 2 for ${topicTitle}: Practice the vocabulary daily.`,
          `Rule 3 for ${topicTitle}: Speak out loud to improve pronunciation.`
        ],
        memoryTrick: `Visualize the structure in your mind before speaking.`
      },
      vocabulary,
      practice: questions,
      mockTest: testQs
    };

    const filePath = path.join(DATA_DIR, `day_${day}.json`);
    fs.writeFileSync(filePath, JSON.stringify(dayData, null, 2));
    
    if (day % 10 === 0 || day === 75) {
      console.log(`Generated data for Day ${day} (${Math.round(fs.statSync(filePath).size / 1024)} KB)`);
    }
  }

  console.log('Successfully generated complete data for all 75 days!');
}

generateAllDays();
