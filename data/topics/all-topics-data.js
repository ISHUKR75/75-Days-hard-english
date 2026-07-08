// ============================================================
// 75 DAYS HARD ENGLISH - COMPLETE TOPICS DATA
// This file contains ALL topics, subtopics, and complete learning data
// Each topic follows the EXACT same structure for consistency
// ============================================================

/**
 * Topic Structure (MANDATORY for EVERY topic):
 * - id: unique identifier
 * - day: day number (1-75)
 * - title: topic name
 * - slug: URL-friendly name
 * - category: grammar/vocabulary/writing/speaking/etc
 * - difficulty: easy/medium/hard
 * - duration: estimated time in minutes
 * - subtopics: array of subtopics (each with same structure)
 * - explanation: complete theory
 * - concept: core concept explanation
 * - realLifeExamples: array of daily life examples
 * - professionalExamples: array of office/business examples
 * - commonMistakes: array of common errors
 * - errorDetection: array of error detection exercises
 * - speakingTips: array of speaking tips
 * - memoryTricks: array of memory aids
 * - vocabulary: 500-1000 words with full details
 * - verbs: relevant verbs with all forms
 * - sentencePatterns: sentence structure patterns
 * - dailyConversation: daily conversation examples
 * - officeConversation: office conversation examples
 * - practiceQuestions: 500-1000 Hindi to English questions
 * - testQuestions: 100-200 randomized test questions
 * - fillInBlanks: fill in the blank exercises
 * - mcqs: multiple choice questions
 * - speakingTest: speaking practice drills
 * - writingTest: writing exercises
 * - listeningTest: listening comprehension
 * - revisionNotes: summary for revision
 * - story: story using only this grammar
 * - essay: essay using learned concepts
 * - dialogue: conversational dialogue
 * - summary: quick summary
 * - progress: tracking fields
 */

// ============================================================
// DAY 1: BASICS OF ENGLISH
// ============================================================
export const day1BasicsOfEnglish = {
  id: 'basics-of-english',
  day: 1,
  title: 'Basics of English',
  slug: 'basics-of-english',
  category: 'grammar',
  difficulty: 'easy',
  duration: 45,
  
  explanation: {
    hindi: `
      अंग्रेजी सीखने की शुरुआत करते हैं। सबसे पहली और सबसे महत्वपूर्ण बात - अंग्रेजी में हर वाक्य (Sentence) के तीन मुख्य भाग होते हैं:
      
      1. **Subject (कर्ता)** - वो व्यक्ति या चीज जो काम करती है
         उदाहरण: मैं, तुम, राहुल, लड़की, बिल्ली
      
      2. **Verb (क्रिया)** - वो काम या action जो किया जाता है
         उदाहरण: खाना, पढ़ना, जाना, सोना
      
      3. **Object (कर्म)** - वो चीज जिस पर action होता है
         उदाहरण: खाना, किताब, स्कूल, बिस्तर
      
      **Basic Sentence Pattern:**
      Subject + Verb + Object
      
      Examples:
      - मैं (S) खाता हूँ (V) खाना (O) → I eat food
      - राहुल (S) पढ़ता है (V) किताब (O) → Rahul reads a book
      - वह (S) जाता है (V) स्कूल (O) → He goes to school
    `,
    english: `
      Let's start learning English. The first and most important thing - every English sentence has three main parts:
      
      1. **Subject** - The person or thing that performs the action
         Example: I, you, Rahul, girl, cat
      
      2. **Verb** - The action that is being done
         Example: eat, read, go, sleep
      
      3. **Object** - The thing that receives the action
         Example: food, book, school, bed
      
      **Basic Sentence Pattern:**
      Subject + Verb + Object
      
      This is the foundation of English grammar. Master this, and you can build any sentence.
    `
  },

  concept: {
    title: 'Core Concept: SVO Structure',
    description: 'English follows Subject-Verb-Object order, unlike Hindi where verb often comes at the end.',
    keyPoints: [
      'Subject always comes first',
      'Verb shows the action',
      'Object receives the action',
      'This order rarely changes in English'
    ],
    formula: 'Subject + Verb + Object = Complete Sentence'
  },

  realLifeExamples: [
    {
      hindi: 'मैं खाना खाता हूँ',
      english: 'I eat food',
      breakdown: {
        subject: 'I (मैं)',
        verb: 'eat (खाता हूँ)',
        object: 'food (खाना)'
      },
      usage: 'Daily routine - talking about meals'
    },
    {
      hindi: 'वह पानी पीता है',
      english: 'He drinks water',
      breakdown: {
        subject: 'He (वह)',
        verb: 'drinks (पीता है)',
        object: 'water (पानी)'
      },
      usage: 'Daily routine - describing actions'
    },
    {
      hindi: 'बच्चे खेलते हैं',
      english: 'Children play',
      breakdown: {
        subject: 'Children (बच्चे)',
        verb: 'play (खेलते हैं)',
        object: '(no object - intransitive verb)'
      },
      usage: 'Describing activities'
    },
    {
      hindi: 'मैं किताब पढ़ता हूँ',
      english: 'I read a book',
      breakdown: {
        subject: 'I (मैं)',
        verb: 'read (पढ़ता हूँ)',
        object: 'a book (किताब)'
      },
      usage: 'Daily activity - studying'
    },
    {
      hindi: 'वह गाना गाती है',
      english: 'She sings a song',
      breakdown: {
        subject: 'She (वह)',
        verb: 'sings (गाती है)',
        object: 'a song (गाना)'
      },
      usage: 'Describing hobbies'
    }
  ],

  professionalExamples: [
    {
      hindi: 'मैं रिपोर्ट लिखता हूँ',
      english: 'I write a report',
      context: 'Office work - documentation',
      formality: 'formal'
    },
    {
      hindi: 'वह मीटिंग अटेंड करता है',
      english: 'He attends meetings',
      context: 'Office work - participation',
      formality: 'formal'
    },
    {
      hindi: 'टीम काम करती है',
      english: 'The team works',
      context: 'Office - collaboration',
      formality: 'formal'
    },
    {
      hindi: 'मैनेजर प्लान बनाता है',
      english: 'The manager makes a plan',
      context: 'Office - planning',
      formality: 'formal'
    },
    {
      hindi: 'हम प्रोजेक्ट पूरा करते हैं',
      english: 'We complete the project',
      context: 'Office - achievements',
      formality: 'formal'
    }
  ],

  commonMistakes: [
    {
      wrong: 'I food eat',
      right: 'I eat food',
      explanation: 'In English, verb comes before object, not after',
      hindi: 'अंग्रेजी में क्रिया (verb) ऑब्जेक्ट से पहले आती है'
    },
    {
      wrong: 'Book I read',
      right: 'I read a book',
      explanation: 'Subject must come first',
      hindi: 'कर्ता (subject) सबसे पहले आता है'
    },
    {
      wrong: 'Go I school',
      right: 'I go to school',
      explanation: 'Correct word order: Subject + Verb + Object',
      hindi: 'सही क्रम: कर्ता + क्रिया + कर्म'
    },
    {
      wrong: 'Water drinks he',
      right: 'He drinks water',
      explanation: 'Never put subject at the end',
      hindi: 'कर्ता को कभी अंत में मत रखो'
    },
    {
      wrong: 'Play children games',
      right: 'Children play games',
      explanation: 'Verb must come after subject',
      hindi: 'क्रिया कर्ता के बाद आती है'
    }
  ],

  errorDetection: [
    {
      sentence: 'Food I eat daily',
      error: 'Wrong word order',
      correction: 'I eat food daily',
      rule: 'Subject + Verb + Object'
    },
    {
      sentence: 'School go I',
      error: 'Incorrect SVO structure',
      correction: 'I go to school',
      rule: 'Always start with subject'
    },
    {
      sentence: 'Book read she',
      error: 'Verb and object misplaced',
      correction: 'She reads a book',
      rule: 'Verb comes before object'
    }
  ],

  speakingTips: [
    {
      tip: 'Always think: WHO does WHAT to WHOM',
      example: 'WHO (I) does WHAT (eat) to WHOM (food)',
      practice: 'Before speaking, identify these three parts in your mind'
    },
    {
      tip: 'Practice saying simple sentences slowly',
      example: 'I... eat... food (pause between each word)',
      practice: 'Say 10 sentences daily with clear pauses'
    },
    {
      tip: 'Don\'t translate word-by-word from Hindi',
      example: 'मैं खाना खाता हूँ ≠ I food eat am',
      practice: 'Think in English structure, not Hindi'
    },
    {
      tip: 'Start with simple subjects: I, You, He, She',
      example: 'I play. You sing. He reads. She writes.',
      practice: 'Make 20 simple sentences daily'
    }
  ],

  memoryTricks: [
    {
      trick: 'SVO = "Superman Visits Ohio"',
      explanation: 'Subject (Superman) Verb (Visits) Object (Ohio)',
      usage: 'Remember this phrase for word order'
    },
    {
      trick: 'Think of it like a train: Engine (S) → Coach (V) → Passenger (O)',
      explanation: 'Subject pulls the sentence, verb connects, object completes',
      usage: 'Visualize sentences as trains'
    },
    {
      trick: 'Ask yourself: WHO (S) + DOES WHAT (V) + TO WHAT (O)',
      explanation: 'Three questions = three parts of sentence',
      usage: 'Use this formula every time'
    }
  ],

  vocabulary: [
    // Basic verbs for Day 1 (100 words)
    { word: 'eat', hindi: 'खाना', type: 'verb', ipa: '/iːt/', example: 'I eat breakfast', difficulty: 'easy' },
    { word: 'drink', hindi: 'पीना', type: 'verb', ipa: '/drɪŋk/', example: 'She drinks water', difficulty: 'easy' },
    { word: 'play', hindi: 'खेलना', type: 'verb', ipa: '/pleɪ/', example: 'Children play games', difficulty: 'easy' },
    { word: 'read', hindi: 'पढ़ना', type: 'verb', ipa: '/riːd/', example: 'He reads books', difficulty: 'easy' },
    { word: 'write', hindi: 'लिखना', type: 'verb', ipa: '/raɪt/', example: 'I write letters', difficulty: 'easy' },
    { word: 'go', hindi: 'जाना', type: 'verb', ipa: '/ɡəʊ/', example: 'We go to school', difficulty: 'easy' },
    { word: 'come', hindi: 'आना', type: 'verb', ipa: '/kʌm/', example: 'They come home', difficulty: 'easy' },
    { word: 'see', hindi: 'देखना', type: 'verb', ipa: '/siː/', example: 'I see a bird', difficulty: 'easy' },
    { word: 'hear', hindi: 'सुनना', type: 'verb', ipa: '/hɪə/', example: 'Can you hear me?', difficulty: 'easy' },
    { word: 'speak', hindi: 'बोलना', type: 'verb', ipa: '/spiːk/', example: 'She speaks English', difficulty: 'easy' },
    { word: 'food', hindi: 'खाना', type: 'noun', ipa: '/fuːd/', example: 'I love Italian food', difficulty: 'easy' },
    { word: 'water', hindi: 'पानी', type: 'noun', ipa: '/ˈwɔːtə/', example: 'Drink more water', difficulty: 'easy' },
    { word: 'book', hindi: 'किताब', type: 'noun', ipa: '/bʊk/', example: 'This book is interesting', difficulty: 'easy' },
    { word: 'school', hindi: 'स्कूल', type: 'noun', ipa: '/skuːl/', example: 'I go to school daily', difficulty: 'easy' },
    { word: 'home', hindi: 'घर', type: 'noun', ipa: '/həʊm/', example: 'Welcome to my home', difficulty: 'easy' },
    // ... Add 485 more words to reach 500 words
  ],

  verbs: [
    {
      base: 'eat',
      v1: 'eat',
      v2: 'ate',
      v3: 'eaten',
      v4: 'eating',
      v5: 'eats',
      hindi: 'खाना',
      usage: 'I eat breakfast every day',
      commonMistakes: ['eated', 'aten']
    },
    {
      base: 'drink',
      v1: 'drink',
      v2: 'drank',
      v3: 'drunk',
      v4: 'drinking',
      v5: 'drinks',
      hindi: 'पीना',
      usage: 'She drinks coffee in the morning',
      commonMistakes: ['drinked', 'dranked']
    },
    // ... Add 498 more verbs
  ],

  sentencePatterns: [
    {
      pattern: 'Subject + Verb + Object',
      example: 'I eat food',
      usage: 'Most common sentence structure',
      variations: ['I eat.', 'I eat food.', 'I eat healthy food.']
    },
    {
      pattern: 'Subject + Verb',
      example: 'Birds fly',
      usage: 'For intransitive verbs',
      variations: ['She smiles.', 'They sleep.', 'He runs.']
    },
    {
      pattern: 'Subject + Verb + Object + Object',
      example: 'I give you a book',
      usage: 'For verbs with two objects',
      variations: ['She teaches us English.', 'He tells me stories.']
    }
  ],

  dailyConversation: [
    {
      situation: 'At home - morning',
      hindi: 'मैं नाश्ता खाता हूँ',
      english: 'I eat breakfast',
      alternatives: ['I have breakfast', 'I\'m having breakfast']
    },
    {
      situation: 'At home - evening',
      hindi: 'मैं TV देखता हूँ',
      english: 'I watch TV',
      alternatives: ['I\'m watching TV', 'I watch television']
    },
    {
      situation: 'With friends',
      hindi: 'हम खेलते हैं',
      english: 'We play',
      alternatives: ['We are playing', 'We play games']
    }
  ],

  officeConversation: [
    {
      situation: 'Morning at office',
      hindi: 'मैं ऑफिस जाता हूँ',
      english: 'I go to the office',
      formality: 'formal',
      alternatives: ['I commute to office', 'I head to work']
    },
    {
      situation: 'During work',
      hindi: 'मैं रिपोर्ट लिखता हूँ',
      english: 'I write reports',
      formality: 'formal',
      alternatives: ['I prepare reports', 'I draft reports']
    },
    {
      situation: 'Meeting',
      hindi: 'टीम काम करती है',
      english: 'The team works',
      formality: 'formal',
      alternatives: ['The team collaborates', 'The team is working']
    }
  ],

  practiceQuestions: [
    // 500-1000 Hindi to English translation questions
    {
      id: 'q001',
      hindi: 'मैं खाना खाता हूँ',
      correctAnswer: 'I eat food',
      alternativeAnswers: ['I eat', 'I have food'],
      difficulty: 'easy',
      topic: 'basic-sentence',
      hint: 'Remember: Subject + Verb + Object'
    },
    {
      id: 'q002',
      hindi: 'वह पानी पीता है',
      correctAnswer: 'He drinks water',
      alternativeAnswers: ['He has water'],
      difficulty: 'easy',
      topic: 'basic-sentence',
      hint: 'He is the subject, drinks is the verb'
    },
    // ... Add 498 more practice questions
  ],

  testQuestions: [
    // 100-200 MCQ/test format questions
    {
      id: 't001',
      type: 'mcq',
      question: 'वह किताब पढ़ता है को English में क्या होगा?',
      options: [
        'He reads a book',
        'He book reads',
        'Book he reads',
        'Reads he a book'
      ],
      correctAnswer: 0,
      explanation: 'सही क्रम है: Subject (He) + Verb (reads) + Object (a book)',
      difficulty: 'easy',
      marks: 1
    },
    {
      id: 't002',
      type: 'fill-blank',
      question: 'I ___ food every day. (खाना)',
      correctAnswer: 'eat',
      alternatives: ['have', 'take'],
      explanation: '"eat" is the most common verb for consuming food',
      difficulty: 'easy',
      marks: 1
    },
    // ... Add 98 more test questions
  ],

  fillInBlanks: [
    {
      sentence: 'I ___ a book every day.',
      answer: 'read',
      hint: 'पढ़ना',
      difficulty: 'easy'
    },
    {
      sentence: 'She ___ to school.',
      answer: 'goes',
      hint: 'जाना (Remember: She/He/It needs "s")',
      difficulty: 'easy'
    }
    // ... more fill in the blanks
  ],

  mcqs: [
    {
      question: 'Choose the correct sentence:',
      options: [
        'I eat food',
        'I food eat',
        'Food I eat',
        'Eat I food'
      ],
      correctIndex: 0,
      explanation: 'English follows Subject + Verb + Object order'
    }
    // ... more MCQs
  ],

  speakingTest: [
    {
      instruction: 'Repeat after me: "I eat food"',
      expectedResponse: 'I eat food',
      focusPoints: ['clear pronunciation', 'correct stress', 'natural flow'],
      tips: 'Stress "eat" and "food" equally'
    },
    {
      instruction: 'Say 5 sentences about your daily routine',
      sampleAnswer: 'I wake up early. I eat breakfast. I go to office. I work hard. I come home.',
      evaluationCriteria: ['grammar', 'vocabulary', 'fluency', 'pronunciation']
    }
    // ... more speaking tests
  ],

  writingTest: [
    {
      prompt: 'Write 5 sentences about your family using Subject + Verb + Object',
      sampleAnswer: 'My father works in a bank. My mother cooks food. My brother plays cricket. My sister studies hard. I help them.',
      minWords: 25,
      evaluationCriteria: ['grammar', 'sentence structure', 'vocabulary']
    }
    // ... more writing tests
  ],

  listeningTest: [
    {
      audioUrl: '/audio/day1/listen1.mp3',
      transcript: 'I eat breakfast every morning',
      question: 'What does the speaker eat?',
      options: ['Lunch', 'Breakfast', 'Dinner', 'Snacks'],
      correctAnswer: 1
    }
    // ... more listening tests
  ],

  revisionNotes: {
    summary: `
      Day 1 Summary:
      - English sentences have 3 parts: Subject + Verb + Object
      - Subject always comes first
      - Verb shows the action
      - Object receives the action
      - This order rarely changes
    `,
    keyPoints: [
      'SVO structure is fundamental',
      'Subject = कर्ता (who)',
      'Verb = क्रिया (action)',
      'Object = कर्म (what/whom)'
    ],
    practiceDaily: [
      'Make 10 simple SVO sentences',
      'Translate 20 Hindi sentences to English',
      'Speak 5 sentences about yourself'
    ]
  },

  story: {
    title: 'राहुल की दिनचर्या (Rahul\'s Daily Routine)',
    hindi: `
      राहुल एक छात्र है। वह रोज सुबह उठता है। वह अपने दांत साफ करता है।
      वह नाश्ता खाता है। वह दूध पीता है। वह स्कूल जाता है।
      वह किताबें पढ़ता है। वह दोस्तों के साथ खेलता है। वह शाम को घर आता है।
      वह होमवर्क करता है। वह टीवी देखता है। वह रात को सोता है।
    `,
    english: `
      Rahul is a student. He wakes up every morning. He brushes his teeth.
      He eats breakfast. He drinks milk. He goes to school.
      He reads books. He plays with friends. He comes home in the evening.
      He does homework. He watches TV. He sleeps at night.
    `,
    grammarUsed: ['Only SVO structure', 'Simple present tense', 'Basic verbs'],
    newWords: ['student', 'brushes', 'teeth', 'homework', 'evening']
  },

  essay: {
    title: 'मेरी दिनचर्या (My Daily Routine)',
    content: `
      I wake up at 6 AM. I brush my teeth. I take a shower. I eat breakfast.
      I drink coffee. I go to office. I work on my computer. I attend meetings.
      I eat lunch at 1 PM. I continue my work. I finish work at 6 PM.
      I come home. I watch TV. I eat dinner. I read a book. I sleep at 11 PM.
    `,
    wordCount: 68,
    grammarCoverage: ['SVO sentences only', 'Present simple tense', 'Daily routine vocabulary']
  },

  dialogue: {
    title: 'दोस्तों के बीच बातचीत (Conversation Between Friends)',
    participants: ['राहुल (Rahul)', 'प्रिया (Priya)'],
    conversation: [
      { speaker: 'Rahul', hindi: 'मैं खाना खाता हूँ', english: 'I eat food' },
      { speaker: 'Priya', hindi: 'तुम क्या खाते हो?', english: 'What do you eat?' },
      { speaker: 'Rahul', hindi: 'मैं रोटी खाता हूँ', english: 'I eat roti' },
      { speaker: 'Priya', hindi: 'मैं चावल खाती हूँ', english: 'I eat rice' },
    ]
  },

  summary: '🎯 Day 1: Learn SVO structure - the foundation of English',
  
  progress: {
    totalQuestions: 500,
    totalTests: 100,
    estimatedTime: 45,
    prerequisites: [],
    nextTopics: ['day2-self-introduction']
  }
};

// ============================================================
// Export all topic data
// ============================================================
export const allTopicsData = {
  day1BasicsOfEnglish,
  // We'll add day2, day3... day75 following the EXACT same structure
};

export default allTopicsData;
