'use client'; // This tells Next.js to render this component on the client side (browser), not the server
// ============================================================
// DAY 3: IMPERATIVE SENTENCES — Complete Practice Page
// 75 Days Hard English Course
// Topic: Commands, Requests, Advice, Warnings, Suggestions
// Author: 75 Days Hard English Course Team
// Version: 1.0.0
// Total Practice Questions: 950+
// Total Test Questions: 400+
// Total Vocabulary Words: 500+
// Total Speaking Practice: 200 sentences
// Total Writing Prompts: 50 prompts
// File Purpose: Full interactive practice for Day 3 grammar topic
// Grammar Focus: Imperative sentences — how to give commands, requests, advice
// ============================================================

// ============================================================
// IMPORTS — All libraries and tools this file needs
// ============================================================
import dynamic from 'next/dynamic'; // This lets us load components lazily (only when needed)
import Link from 'next/link'; // This is used for navigation between pages in Next.js
import { // Import specific icons from the lucide-react library
  BookOpen, // Icon that looks like an open book — used for lesson/reading sections
  ArrowLeft, // Icon that looks like a left arrow — used for back navigation
  Zap, // Icon that looks like a lightning bolt — used for energy/power sections
  Shield, // Icon that looks like a shield — used for warnings/protection sections
  MessageSquare, // Icon that looks like a chat bubble — used for speaking sections
  PenTool, // Icon that looks like a pen — used for writing sections
  Brain, // Icon that looks like a brain — used for test/knowledge sections
  Target, // Icon that looks like a bullseye target — used for goals/accuracy sections
  Star, // Icon that looks like a star — used for vocabulary/rating sections
  AlertCircle, // Icon that looks like an exclamation circle — used for warning messages
  CheckCircle2, // Icon that looks like a checkmark in a circle — used for correct answers
  Info, // Icon that looks like the letter 'i' — used for information sections
  Lightbulb, // Icon that looks like a lightbulb — used for tips and hints
  Trophy, // Icon that looks like a trophy — used for achievements
  Flame, // Icon that looks like fire — used for streak/motivation
  Volume2, // Icon that looks like a speaker — used for pronunciation/audio
  Award, // Icon that looks like an award medal — used for badges/achievements
  ChevronDown, // Icon that looks like a downward arrow — used for dropdowns
  ChevronUp, // Icon that looks like an upward arrow — used for collapsing sections
  Play, // Icon that looks like a play button — used for starting activities
  RotateCcw, // Icon that looks like a counter-clockwise arrow — used for restart/reset
  Filter, // Icon that looks like a filter funnel — used for filtering questions
  Search, // Icon that looks like a magnifying glass — used for search functionality
  Clock, // Icon that looks like a clock — used for timer/time-related features
  Eye, // Icon that looks like an eye — used for show answer toggle
  EyeOff, // Icon that looks like a crossed-out eye — used for hide answer toggle
  HelpCircle, // Icon that looks like a question mark circle — used for hints
  CheckSquare, // Icon that looks like a checked checkbox — used for completed items
  XCircle, // Icon that looks like an X in a circle — used for wrong answers
  Mic, // Icon that looks like a microphone — used for speaking practice
  SortAsc, // Icon that looks like ascending sort arrows — used for sorting
  Sparkles, // Icon that looks like sparkles — used for special/featured content
} from 'lucide-react'; // End of lucide-react imports

// ============================================================
// LAZY LOAD THE QUIZ ENGINE
// We load the quiz component lazily so the page loads faster
// The audio API in PracticeQuiz only works in the browser (client-side)
// So we use dynamic import with ssr: false to prevent server-side errors
// ============================================================
const PracticeQuizComponent = dynamic( // Create a dynamically loaded version of the quiz component
  () => import('@/components/quiz/PracticeQuiz'), // The path to the actual quiz component file
  { // Options for the dynamic import
    loading: () => ( // What to show while the component is loading
      <div className="flex items-center justify-center py-24"> {/* Centered loading container */}
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /> {/* Spinning loading circle */}
      </div> // End of loading container
    ), // End of loading function
    ssr: false, // Do not render this component on the server — browser only
  } // End of options object
); // End of dynamic import

// ============================================================
// DAY 3 LESSON CONTENT
// This object stores all the information about today's lesson
// It is used in the header section of the page
// ============================================================
const DAY_3_LESSON = { // Start of lesson content object
  dayNumber: 3, // This is the 3rd day in the 75-day course
  title: 'Imperative Sentences', // The main topic name
  subtitle: 'Commands, Requests, Advice, Warnings, Suggestions', // A shorter description of the topic
  emoji: '⚡', // The emoji that represents this day
  color: '#d946ef', // Purple/violet color used for this day's theme
  cefrLevel: 'A1', // The difficulty level — A1 is beginner level
  totalQuestions: 950, // Total number of practice questions in this file
  totalTestQuestions: 400, // Total number of test questions (MCQ format)
  totalVocabWords: 500, // Total number of vocabulary words in this file
  grammarRules: [ // Array of grammar rules for imperative sentences
    { // First grammar rule
      rule: 'Positive Imperative', // Name of the rule
      formula: 'Base Verb (+ Object)', // Formula for making this type of sentence
      example: 'Open the door.', // An example sentence
      hindi: 'दरवाज़ा खोलो।', // Hindi translation of the example
      note: 'The subject "You" is hidden — never written or spoken', // Important note about this rule
    }, // End of first rule
    { // Second grammar rule
      rule: 'Polite Request', // Name of the rule
      formula: 'Please + Base Verb (+ Object)', // Formula for polite requests
      example: 'Please sit down.', // An example sentence
      hindi: 'कृपया बैठ जाइए।', // Hindi translation
      note: '"Please" makes the command sound polite and respectful', // Note about usage
    }, // End of second rule
    { // Third grammar rule
      rule: 'Negative Command', // Name of the rule
      formula: "Don't / Do not + Base Verb", // Formula for negative commands
      example: "Don't run.", // An example sentence
      hindi: 'मत दौड़ो।', // Hindi translation
      note: '"Don\'t" is informal; "Do not" is more formal or emphatic', // Note about formality
    }, // End of third rule
    { // Fourth grammar rule
      rule: 'Warning', // Name of the rule
      formula: 'Never + Base Verb', // Formula for warnings
      example: 'Never lie.', // An example sentence
      hindi: 'कभी झूठ मत बोलो।', // Hindi translation
      note: '"Never" is stronger than "Don\'t" — it means at no time ever', // Note about strength
    }, // End of fourth rule
    { // Fifth grammar rule
      rule: 'Suggestion', // Name of the rule
      formula: "Let's + Base Verb", // Formula for suggestions
      example: "Let's go.", // An example sentence
      hindi: 'चलो जाते हैं।', // Hindi translation
      note: '"Let\'s" includes both the speaker and the listener in the action', // Note about inclusion
    }, // End of fifth rule
  ], // End of grammar rules array
  keyPoints: [ // Array of key points to remember
    'The subject "You" is ALWAYS hidden in imperative sentences', // First key point
    'Always start with the BASE form of the verb (no -s, -ing, -ed)', // Second key point
    '"Please" makes any command polite — add it at the start or end', // Third key point
    '"Never" is a strong warning — stronger than "Don\'t"', // Fourth key point
    '"Let\'s" is used for suggestions — it includes YOU and ME both', // Fifth key point
    'Imperative sentences can end with period (.) or exclamation mark (!)', // Sixth key point
    'Used in daily life: recipes, instructions, signs, directions, advice', // Seventh key point
  ], // End of key points array
}; // End of DAY_3_LESSON object

// ============================================================
// SECTION 1: BASIC COMMANDS (Questions 1 to 100)
// These are simple imperative sentences for daily life commands
// Hindi has "करो" / "जाओ" / "आओ" etc. — we translate to English base verb form
// ============================================================
const DAY_3_QUESTIONS = [ // Start of the main questions array — contains ALL 950+ questions

  // ---- SECTION 1: BASIC COMMANDS — Questions 1 to 100 ----
  // These questions cover simple, everyday commands
  // Pattern: Hindi command → English base verb + object
  // Difficulty: Mostly easy, some medium

  { // Question 1 — Opening and Closing Commands
    id: 'day3-q001', // Unique identifier for this question — used for tracking progress
    hindi: 'दरवाज़ा खोलो।', // Hindi sentence the student needs to translate
    english: 'Open the door.', // The correct primary English translation
    alternatives: [ // Other correct answers that will also be accepted
      'Please open the door.', // Polite version is also correct
      'Open the door, please.', // Please at the end is also correct
    ], // End of alternatives array
    hint: 'Start with the verb "Open". No subject needed in imperative sentences.', // A small clue to help the student
    explanation: 'In imperative sentences, we always start with the base form of the verb. The subject "You" is hidden and not written. "Open" is the base form of the verb. "the door" is the object. So the sentence is: Open + the door.', // Detailed explanation
    difficulty: 'easy', // This question is easy level
    category: 'basic-commands', // Category for filtering
    grammarRule: 'Positive Imperative: Base Verb + Object', // Which grammar rule this uses
    tags: ['command', 'door', 'basic', 'open'], // Search tags for finding this question
    usageNote: 'Use this when you want someone to open a door for you.', // When to use this sentence
    relatedSentences: ['Close the door.', 'Lock the door.', 'Shut the door.'], // Similar sentences to practice
  }, // End of question 1

  { // Question 2
    id: 'day3-q002', // Unique question ID
    hindi: 'दरवाज़ा बंद करो।', // Hindi: Close the door
    english: 'Close the door.', // Primary English answer
    alternatives: ['Shut the door.', 'Please close the door.', 'Close the door, please.'], // Alternative correct answers
    hint: 'The verb "close" means बंद करना.', // Hint for the student
    explanation: '"Close the door" is a basic imperative command. Start with the base verb "Close". The hidden subject is "You". This is one of the most common commands used in everyday life, such as at home, school, or office.', // Full explanation
    difficulty: 'easy', // Easy difficulty
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'door', 'close', 'basic'], // Tags
    usageNote: 'Use this at home, school, or office to ask someone to close the door.', // Usage note
    relatedSentences: ['Open the door.', 'Lock the door.', 'Bolt the door.'], // Related sentences
  }, // End of question 2

  { // Question 3
    id: 'day3-q003', // Unique question ID
    hindi: 'खिड़की खोलो।', // Hindi: Open the window
    english: 'Open the window.', // Primary English answer
    alternatives: ['Please open the window.', 'Open the window, please.', 'Open up the window.'], // Alternatives
    hint: 'खिड़की = window. Use the same pattern as "Open the door."', // Hint
    explanation: 'Just like "Open the door", this sentence uses the imperative pattern. Start with "Open" (base verb), then add the object "the window". The subject "You" is always hidden in imperative sentences.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'window', 'open', 'basic'], // Tags
    usageNote: 'Use this when a room is hot or stuffy and you need fresh air.', // Usage
    relatedSentences: ['Close the window.', 'Open the door.', 'Open the curtains.'], // Related
  }, // End of question 3

  { // Question 4
    id: 'day3-q004', // Unique question ID
    hindi: 'खिड़की बंद करो।', // Hindi: Close the window
    english: 'Close the window.', // Primary English answer
    alternatives: ['Shut the window.', 'Please close the window.', 'Close the window, please.'], // Alternatives
    hint: 'खिड़की = window. Same as closing the door but for window.', // Hint
    explanation: 'This is another basic imperative command using the same pattern. "Close" is the base verb, "the window" is the object. Used when it is raining, cold, or noisy outside.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'window', 'close', 'basic'], // Tags
    usageNote: 'Use this when it is cold, raining, or too noisy outside.', // Usage
    relatedSentences: ['Open the window.', 'Close the door.', 'Close the curtains.'], // Related
  }, // End of question 4

  { // Question 5
    id: 'day3-q005', // Unique question ID
    hindi: 'किताब खोलो।', // Hindi: Open the book
    english: 'Open the book.', // Primary English answer
    alternatives: ['Open your book.', 'Please open the book.', 'Open up your book.'], // Alternatives
    hint: 'किताब = book. Use the verb "Open" at the start.', // Hint
    explanation: 'This imperative sentence is commonly used by teachers in classrooms. "Open" is the base verb and "the book" is the object. Teachers often say this to students: "Open the book to page 10."', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'book', 'school', 'basic'], // Tags
    usageNote: 'Teachers use this command in classrooms to instruct students.', // Usage
    relatedSentences: ['Close the book.', 'Open your notebook.', 'Read the book.'], // Related
  }, // End of question 5

  { // Question 6
    id: 'day3-q006', // Unique question ID
    hindi: 'किताब बंद करो।', // Hindi: Close the book
    english: 'Close the book.', // Primary English answer
    alternatives: ['Close your book.', 'Shut the book.', 'Please close the book.'], // Alternatives
    hint: 'किताब = book. The verb for बंद करना = close or shut.', // Hint
    explanation: 'Another classroom command. "Close the book" tells someone to shut their book. Teachers say this when they want students to stop reading and pay attention to them instead.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'book', 'school', 'close'], // Tags
    usageNote: 'Teachers use this when they want students to stop reading.', // Usage
    relatedSentences: ['Open the book.', 'Put the book down.', 'Keep the book.'], // Related
  }, // End of question 6

  { // Question 7
    id: 'day3-q007', // Unique question ID
    hindi: 'यहाँ आओ।', // Hindi: Come here
    english: 'Come here.', // Primary English answer
    alternatives: ['Come over here.', 'Please come here.', 'Come here, please.'], // Alternatives
    hint: 'यहाँ = here. आओ = come. The verb "come" is the base form.', // Hint
    explanation: '"Come here" is one of the most basic imperative sentences in English. "Come" is the base verb and "here" is an adverb of place. The subject "You" is hidden. Used to call someone to your location.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb', // Grammar rule
    tags: ['command', 'come', 'here', 'basic'], // Tags
    usageNote: 'Use this to call a person, child, or pet to your location.', // Usage
    relatedSentences: ['Go there.', 'Come with me.', 'Come inside.'], // Related
  }, // End of question 7

  { // Question 8
    id: 'day3-q008', // Unique question ID
    hindi: 'वहाँ जाओ।', // Hindi: Go there
    english: 'Go there.', // Primary English answer
    alternatives: ['Go over there.', 'Please go there.', 'Go to that place.'], // Alternatives
    hint: 'वहाँ = there. जाओ = go. Simple: Go + there.', // Hint
    explanation: '"Go there" uses the same pattern. "Go" is the base verb, "there" is an adverb of place. This is the opposite of "Come here." Used to direct someone to a specific location.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb', // Grammar rule
    tags: ['command', 'go', 'there', 'basic'], // Tags
    usageNote: 'Use this to direct someone to a specific place or location.', // Usage
    relatedSentences: ['Come here.', 'Go away.', 'Go straight.'], // Related
  }, // End of question 8

  { // Question 9
    id: 'day3-q009', // Unique question ID
    hindi: 'बैठ जाओ।', // Hindi: Sit down
    english: 'Sit down.', // Primary English answer
    alternatives: ['Please sit down.', 'Sit down, please.', 'Have a seat.', 'Take a seat.'], // Alternatives
    hint: 'बैठना = to sit. "Sit down" means to take a sitting position.', // Hint
    explanation: '"Sit down" is a very common command used everywhere — in classrooms, offices, courts, and homes. "Sit" is the base verb and "down" is an adverb that completes the meaning. "Have a seat" is a more polite alternative.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb', // Grammar rule
    tags: ['command', 'sit', 'down', 'basic', 'classroom'], // Tags
    usageNote: 'Teachers, employers, and parents use this very frequently.', // Usage
    relatedSentences: ['Stand up.', 'Get up.', 'Please be seated.'], // Related
  }, // End of question 9

  { // Question 10
    id: 'day3-q010', // Unique question ID
    hindi: 'खड़े हो जाओ।', // Hindi: Stand up
    english: 'Stand up.', // Primary English answer
    alternatives: ['Please stand up.', 'Get up.', 'Rise up.', 'Stand up, please.'], // Alternatives
    hint: 'खड़े होना = to stand. "Stand up" = get on your feet.', // Hint
    explanation: '"Stand up" is the opposite of "Sit down." In Hindi, "खड़े हो जाओ" means to rise from a sitting position. "Stand" is the base verb, "up" is an adverb that indicates movement upward.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb', // Grammar rule
    tags: ['command', 'stand', 'up', 'basic'], // Tags
    usageNote: 'Used in classrooms when a teacher enters, or during formal occasions.', // Usage
    relatedSentences: ['Sit down.', 'Get up.', 'Stand straight.'], // Related
  }, // End of question 10

  { // Question 11
    id: 'day3-q011', // Unique question ID
    hindi: 'रुको।', // Hindi: Stop / Wait
    english: 'Stop.', // Primary English answer
    alternatives: ['Stop right there.', 'Wait.', 'Halt.', 'Stop it.'], // Alternatives
    hint: 'रुको = stop or wait. One-word command.', // Hint
    explanation: '"Stop" is a powerful one-word imperative command. It means to stop doing something or to stop moving. It is used in emergencies, traffic, and when you want someone to pause an action.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Single Base Verb', // Grammar rule
    tags: ['command', 'stop', 'halt', 'basic', 'emergency'], // Tags
    usageNote: 'Used urgently to make someone stop moving or doing something.', // Usage
    relatedSentences: ['Wait.', 'Pause.', 'Hold on.'], // Related
  }, // End of question 11

  { // Question 12
    id: 'day3-q012', // Unique question ID
    hindi: 'रुको और सुनो।', // Hindi: Stop and listen
    english: 'Stop and listen.', // Primary English answer
    alternatives: ['Stop and listen to me.', 'Wait and listen.', 'Stop! Listen.'], // Alternatives
    hint: 'Two verbs joined by "and" — both are base forms: stop, listen.', // Hint
    explanation: 'This sentence has two imperative verbs connected with "and". Both "stop" and "listen" are base forms. In Hindi, "रुको और सुनो" uses the same two-action pattern. Very common in teaching situations.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Two Base Verbs + and', // Grammar rule
    tags: ['command', 'stop', 'listen', 'compound', 'classroom'], // Tags
    usageNote: 'Teachers and parents use this to get children\'s full attention.', // Usage
    relatedSentences: ['Look and listen.', 'Stop and think.', 'Come and see.'], // Related
  }, // End of question 12

  { // Question 13
    id: 'day3-q013', // Unique question ID
    hindi: 'दौड़ो।', // Hindi: Run
    english: 'Run.', // Primary English answer
    alternatives: ['Run fast.', 'Run quickly.', 'Start running.'], // Alternatives
    hint: 'दौड़ना = to run. Simple one-word command.', // Hint
    explanation: '"Run" as an imperative means "Start running now!" It is a direct command. Used in sports, emergencies, or training. In Hindi "दौड़ो" is the command form of "दौड़ना."', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Single Base Verb', // Grammar rule
    tags: ['command', 'run', 'sport', 'basic'], // Tags
    usageNote: 'Used in sports practice, emergencies, or physical training.', // Usage
    relatedSentences: ['Walk.', 'Jump.', 'Run faster.'], // Related
  }, // End of question 13

  { // Question 14
    id: 'day3-q014', // Unique question ID
    hindi: 'चलो।', // Hindi: Walk / Let's go / Come on
    english: 'Walk.', // Primary English answer
    alternatives: ["Let's go.", 'Come on.', 'Walk with me.', 'Keep walking.'], // Alternatives
    hint: 'चलो has multiple meanings — walk, let\'s go, come on. Context matters.', // Hint
    explanation: '"चलो" in Hindi can mean "walk", "let\'s go", or "come on" depending on context. As a simple command, "Walk" is the base verb imperative. If it means "let\'s go", we use "Let\'s go" in English.', // Explanation
    difficulty: 'medium', // Medium — because of the multiple meanings
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb', // Grammar rule
    tags: ['command', 'walk', 'go', 'medium'], // Tags
    usageNote: 'Use "Walk" for a command to walk. Use "Let\'s go" for a suggestion.', // Usage
    relatedSentences: ["Let's go.", 'Run.', 'Come on.'], // Related
  }, // End of question 14

  { // Question 15
    id: 'day3-q015', // Unique question ID
    hindi: 'उठो।', // Hindi: Get up / Rise
    english: 'Get up.', // Primary English answer
    alternatives: ['Wake up.', 'Rise up.', 'Get out of bed.', 'Stand up.'], // Alternatives
    hint: 'उठो = get up. Used in the morning.', // Hint
    explanation: '"Get up" means to rise from bed or a lying/sitting position. Very commonly used in mornings. "Wake up" is slightly different — it means to stop sleeping. "Get up" means to physically rise up from where you are.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb', // Grammar rule
    tags: ['command', 'get', 'up', 'morning', 'basic'], // Tags
    usageNote: 'Parents say this to children in the morning to wake them up.', // Usage
    relatedSentences: ['Wake up.', 'Come down.', 'Stand up.'], // Related
  }, // End of question 15

  { // Question 16
    id: 'day3-q016', // Unique question ID
    hindi: 'सो जाओ।', // Hindi: Go to sleep / Sleep
    english: 'Go to sleep.', // Primary English answer
    alternatives: ['Sleep now.', 'Go sleep.', 'Sleep.', 'Go to bed.'], // Alternatives
    hint: 'सो जाना = go to sleep. "Go to sleep" = two words.', // Hint
    explanation: '"Go to sleep" is the correct English phrase for "सो जाओ". The phrase "Go to sleep" uses the verb "go" followed by "to sleep" which is an infinitive acting as an adverb of purpose.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Infinitive Phrase', // Grammar rule
    tags: ['command', 'sleep', 'night', 'home', 'basic'], // Tags
    usageNote: 'Parents say this to children at bedtime.', // Usage
    relatedSentences: ['Get up.', 'Wake up.', 'Rest now.'], // Related
  }, // End of question 16

  { // Question 17
    id: 'day3-q017', // Unique question ID
    hindi: 'खाना खाओ।', // Hindi: Eat food / Have your meal
    english: 'Eat your food.', // Primary English answer
    alternatives: ['Have your meal.', 'Eat now.', 'Eat your dinner.', 'Have food.'], // Alternatives
    hint: 'खाना खाओ = eat food. Verb = eat, Object = your food.', // Hint
    explanation: '"Eat your food" is a common home command. "Eat" is the base verb, "your food" is the object. The possessive "your" makes it more natural in English. Used when someone is sitting at the dinner table and not eating.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'eat', 'food', 'home', 'meal'], // Tags
    usageNote: 'Parents say this to children who are not eating their food.', // Usage
    relatedSentences: ['Drink your milk.', 'Finish your food.', 'Have breakfast.'], // Related
  }, // End of question 17

  { // Question 18
    id: 'day3-q018', // Unique question ID
    hindi: 'पानी पियो।', // Hindi: Drink water
    english: 'Drink water.', // Primary English answer
    alternatives: ['Drink some water.', 'Have some water.', 'Drink your water.'], // Alternatives
    hint: 'पानी = water. पियो = drink.', // Hint
    explanation: '"Drink water" is a health command. "Drink" is the base verb, "water" is the object. Very commonly said when someone is sick, thirsty, or during hot weather.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'drink', 'water', 'health', 'basic'], // Tags
    usageNote: 'Used when advising someone to stay hydrated.', // Usage
    relatedSentences: ['Eat your food.', 'Drink your juice.', 'Have some water.'], // Related
  }, // End of question 18

  { // Question 19
    id: 'day3-q019', // Unique question ID
    hindi: 'दूध पियो।', // Hindi: Drink milk
    english: 'Drink your milk.', // Primary English answer
    alternatives: ['Drink milk.', 'Have your milk.', 'Drink the milk.'], // Alternatives
    hint: 'दूध = milk. Same pattern as "Drink water."', // Hint
    explanation: '"Drink your milk" is a typical command from parents to children. The possessive "your" is often added in English to make it more personal and natural. "Drink" is the base verb, "your milk" is the object phrase.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'drink', 'milk', 'home', 'children'], // Tags
    usageNote: 'Parents often say this to young children at breakfast.', // Usage
    relatedSentences: ['Drink water.', 'Eat your food.', 'Finish your juice.'], // Related
  }, // End of question 19

  { // Question 20
    id: 'day3-q020', // Unique question ID
    hindi: 'मेरी बात सुनो।', // Hindi: Listen to me
    english: 'Listen to me.', // Primary English answer
    alternatives: ['Hear me out.', 'Listen carefully.', 'Pay attention to me.'], // Alternatives
    hint: 'सुनो = listen. मेरी बात = what I am saying. "Listen to me."', // Hint
    explanation: '"Listen to me" uses the verb "listen" followed by the preposition "to" and the pronoun "me." This is different from just "Listen" because it specifies WHO to listen to. A very common command for getting attention.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Preposition + Pronoun', // Grammar rule
    tags: ['command', 'listen', 'attention', 'basic'], // Tags
    usageNote: 'Used when you want someone to pay full attention to what you are saying.', // Usage
    relatedSentences: ['Look at me.', 'Pay attention.', 'Hear me out.'], // Related
  }, // End of question 20

  { // Question 21
    id: 'day3-q021', // Unique question ID
    hindi: 'ध्यान दो।', // Hindi: Pay attention / Focus
    english: 'Pay attention.', // Primary English answer
    alternatives: ['Focus.', 'Concentrate.', 'Pay attention, please.', 'Listen carefully.'], // Alternatives
    hint: 'ध्यान देना = to pay attention. "Pay attention" is the English phrase.', // Hint
    explanation: '"Pay attention" is a common classroom and office command. "Pay" is the base verb here, and "attention" is the object. Together they form a fixed phrase meaning to focus on something. "Focus" and "Concentrate" are similar alternatives.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object (Fixed Phrase)', // Grammar rule
    tags: ['command', 'attention', 'focus', 'classroom', 'basic'], // Tags
    usageNote: 'Teachers use this when students are distracted.', // Usage
    relatedSentences: ['Listen carefully.', 'Concentrate.', 'Focus on the board.'], // Related
  }, // End of question 21

  { // Question 22
    id: 'day3-q022', // Unique question ID
    hindi: 'अंदर आओ।', // Hindi: Come in / Come inside
    english: 'Come in.', // Primary English answer
    alternatives: ['Come inside.', 'Please come in.', 'Enter.'], // Alternatives
    hint: 'अंदर = inside/in. आओ = come. "Come in" = enter.', // Hint
    explanation: '"Come in" is a very common English phrase used to invite someone to enter a room. It is shorter and more natural than "Come inside." People say this when someone knocks on a door.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb (Phrasal Verb)', // Grammar rule
    tags: ['command', 'come', 'in', 'enter', 'basic'], // Tags
    usageNote: 'Said when someone knocks on the door and you want them to enter.', // Usage
    relatedSentences: ['Go out.', 'Come here.', 'Enter the room.'], // Related
  }, // End of question 22

  { // Question 23
    id: 'day3-q023', // Unique question ID
    hindi: 'बाहर जाओ।', // Hindi: Go out / Go outside
    english: 'Go out.', // Primary English answer
    alternatives: ['Go outside.', 'Get out.', 'Leave the room.'], // Alternatives
    hint: 'बाहर = outside/out. जाओ = go. "Go out" or "Go outside."', // Hint
    explanation: '"Go out" means to exit a place. "Get out" is more forceful and impolite. "Go outside" and "Go out" are the most common. Used when asking someone to leave a room or go play outside.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb (Phrasal Verb)', // Grammar rule
    tags: ['command', 'go', 'out', 'outside', 'basic'], // Tags
    usageNote: 'Parents use this when sending children to play outside.', // Usage
    relatedSentences: ['Come in.', 'Go home.', 'Go to your room.'], // Related
  }, // End of question 23

  { // Question 24
    id: 'day3-q024', // Unique question ID
    hindi: 'आगे बढ़ो।', // Hindi: Move forward / Go ahead
    english: 'Move forward.', // Primary English answer
    alternatives: ['Go ahead.', 'Move ahead.', 'Step forward.', 'Proceed.'], // Alternatives
    hint: 'आगे = forward/ahead. बढ़ो = move/go. "Move forward" or "Go ahead."', // Hint
    explanation: '"Move forward" is a direction command. "Go ahead" is more informal and also means "proceed" or "you may start." Both are correct translations depending on the context.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Direction', // Grammar rule
    tags: ['command', 'move', 'forward', 'direction', 'proceed'], // Tags
    usageNote: 'Used when directing traffic, people in a queue, or giving permission.', // Usage
    relatedSentences: ['Stop.', 'Go back.', 'Turn left.'], // Related
  }, // End of question 24

  { // Question 25
    id: 'day3-q025', // Unique question ID
    hindi: 'पीछे जाओ।', // Hindi: Go back
    english: 'Go back.', // Primary English answer
    alternatives: ['Move back.', 'Step back.', 'Go backward.', 'Back up.'], // Alternatives
    hint: 'पीछे = back/backward. जाओ = go. "Go back" or "Move back."', // Hint
    explanation: '"Go back" means to return to a previous position. "Step back" is used when asking someone to take one step backward. "Back up" is informal. Used in traffic, crowd control, or during exercises.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Direction', // Grammar rule
    tags: ['command', 'go', 'back', 'direction', 'movement'], // Tags
    usageNote: 'Used to direct someone to move to their original position.', // Usage
    relatedSentences: ['Move forward.', 'Turn around.', 'Come back.'], // Related
  }, // End of question 25

  { // Question 26
    id: 'day3-q026', // Unique question ID
    hindi: 'बाईं ओर मुड़ो।', // Hindi: Turn left
    english: 'Turn left.', // Primary English answer
    alternatives: ['Take a left turn.', 'Go left.', 'Turn to the left.'], // Alternatives
    hint: 'बाईं ओर = left side. मुड़ो = turn. "Turn left."', // Hint
    explanation: '"Turn left" is a direction command. "Turn" is the base verb, "left" is the direction adverb. Used when giving directions while driving, walking, or in navigation apps.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Direction Adverb', // Grammar rule
    tags: ['command', 'turn', 'left', 'direction', 'navigation'], // Tags
    usageNote: 'Used when giving directions to someone who is driving or walking.', // Usage
    relatedSentences: ['Turn right.', 'Go straight.', 'Stop here.'], // Related
  }, // End of question 26

  { // Question 27
    id: 'day3-q027', // Unique question ID
    hindi: 'दाईं ओर मुड़ो।', // Hindi: Turn right
    english: 'Turn right.', // Primary English answer
    alternatives: ['Take a right turn.', 'Go right.', 'Turn to the right.'], // Alternatives
    hint: 'दाईं ओर = right side. मुड़ो = turn. "Turn right."', // Hint
    explanation: '"Turn right" is the opposite of "Turn left." Same grammatical structure. These two commands are essential for giving and understanding directions in English.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Direction Adverb', // Grammar rule
    tags: ['command', 'turn', 'right', 'direction', 'navigation'], // Tags
    usageNote: 'Essential for giving directions when driving or walking.', // Usage
    relatedSentences: ['Turn left.', 'Go straight.', 'Take a U-turn.'], // Related
  }, // End of question 27

  { // Question 28
    id: 'day3-q028', // Unique question ID
    hindi: 'सीधे जाओ।', // Hindi: Go straight
    english: 'Go straight.', // Primary English answer
    alternatives: ['Keep going straight.', 'Walk straight.', 'Drive straight.'], // Alternatives
    hint: 'सीधे = straight. जाओ = go. "Go straight."', // Hint
    explanation: '"Go straight" means to continue in the same direction without turning. It is one of the most basic direction commands in English. "Keep going straight" is a longer version meaning the same thing.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Direction Adverb', // Grammar rule
    tags: ['command', 'go', 'straight', 'direction', 'navigation'], // Tags
    usageNote: 'Used when giving road directions.', // Usage
    relatedSentences: ['Turn left.', 'Turn right.', 'Stop here.'], // Related
  }, // End of question 28

  { // Question 29
    id: 'day3-q029', // Unique question ID
    hindi: 'यहाँ रुको।', // Hindi: Stop here
    english: 'Stop here.', // Primary English answer
    alternatives: ['Park here.', 'Wait here.', 'Halt here.'], // Alternatives
    hint: 'यहाँ = here. रुको = stop/wait. "Stop here."', // Hint
    explanation: '"Stop here" is a direction command telling someone to stop at this particular location. Different from just "Stop" because it specifies WHERE to stop. Used with drivers, people walking, or delivery personnel.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Place', // Grammar rule
    tags: ['command', 'stop', 'here', 'direction', 'traffic'], // Tags
    usageNote: 'Used when directing a taxi, auto-rickshaw, or person to stop at a specific location.', // Usage
    relatedSentences: ['Go straight.', 'Wait here.', 'Park the car.'], // Related
  }, // End of question 29

  { // Question 30
    id: 'day3-q030', // Unique question ID
    hindi: 'मेरी मदद करो।', // Hindi: Help me
    english: 'Help me.', // Primary English answer
    alternatives: ['Please help me.', 'Help me out.', 'Assist me.'], // Alternatives
    hint: 'मदद करना = to help. "Help me" — verb + pronoun.', // Hint
    explanation: '"Help me" is a simple imperative request. "Help" is the base verb and "me" is the object pronoun. This is used in emergencies, when you need assistance, or when asking someone for a favor.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object Pronoun', // Grammar rule
    tags: ['command', 'help', 'me', 'request', 'basic'], // Tags
    usageNote: 'Said when you urgently need someone\'s help.', // Usage
    relatedSentences: ['Save me.', 'Help us.', 'Please assist me.'], // Related
  }, // End of question 30

  { // Question 31
    id: 'day3-q031', // Unique question ID
    hindi: 'मुझे पानी दो।', // Hindi: Give me water
    english: 'Give me water.', // Primary English answer
    alternatives: ['Please give me water.', 'Give me some water.', 'Get me water.'], // Alternatives
    hint: 'देना = to give. मुझे = to me / give me. पानी = water.', // Hint
    explanation: '"Give me water" uses the verb "give" with an indirect object "me" and a direct object "water." The structure is: Give + indirect object (me) + direct object (water). Very common in daily requests.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Indirect Object + Direct Object', // Grammar rule
    tags: ['command', 'give', 'water', 'request', 'daily'], // Tags
    usageNote: 'Used to ask for something to be given to you.', // Usage
    relatedSentences: ['Give me the pen.', 'Hand me the book.', 'Pass the salt.'], // Related
  }, // End of question 31

  { // Question 32
    id: 'day3-q032', // Unique question ID
    hindi: 'कलम दो।', // Hindi: Give me the pen / Give the pen
    english: 'Give me the pen.', // Primary English answer
    alternatives: ['Hand me the pen.', 'Pass me the pen.', 'Give the pen to me.'], // Alternatives
    hint: 'कलम = pen. दो = give. "Give me the pen."', // Hint
    explanation: '"Give me the pen" is a classroom favorite. "Give" is the base verb, "me" is the indirect object, "the pen" is the direct object. Alternatively, you can say "Give the pen to me" where "to me" comes after the direct object.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Indirect Object + Direct Object', // Grammar rule
    tags: ['command', 'give', 'pen', 'classroom', 'object'], // Tags
    usageNote: 'Commonly used in classrooms when you need a writing instrument.', // Usage
    relatedSentences: ['Pass the pencil.', 'Hand me the ruler.', 'Give me the eraser.'], // Related
  }, // End of question 32

  { // Question 33
    id: 'day3-q033', // Unique question ID
    hindi: 'नमक पास करो।', // Hindi: Pass the salt
    english: 'Pass the salt.', // Primary English answer
    alternatives: ['Please pass the salt.', 'Pass me the salt.', 'Hand me the salt.'], // Alternatives
    hint: 'नमक = salt. पास करना = to pass. "Pass the salt."', // Hint
    explanation: '"Pass the salt" is a classic dining table command. "Pass" is the base verb, "the salt" is the object. This is one of the first imperative sentences taught in English because it is so natural and practical.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'pass', 'salt', 'dining', 'table'], // Tags
    usageNote: 'Used at the dining table when you need the salt but can\'t reach it.', // Usage
    relatedSentences: ['Pass the pepper.', 'Pass the bread.', 'Hand me the spoon.'], // Related
  }, // End of question 33

  { // Question 34
    id: 'day3-q034', // Unique question ID
    hindi: 'अपना नाम लिखो।', // Hindi: Write your name
    english: 'Write your name.', // Primary English answer
    alternatives: ['Write your name here.', 'Please write your name.', 'Put your name.'], // Alternatives
    hint: 'अपना नाम = your name. लिखो = write.', // Hint
    explanation: '"Write your name" is a very common instruction in schools and offices. "Write" is the base verb, "your name" is the object (with possessive pronoun "your"). Always used before signing a form or starting an exam.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'write', 'name', 'school', 'exam'], // Tags
    usageNote: 'Teachers and officials use this before beginning any written work.', // Usage
    relatedSentences: ['Write the date.', 'Sign your name.', 'Print your name.'], // Related
  }, // End of question 34

  { // Question 35
    id: 'day3-q035', // Unique question ID
    hindi: 'तारीख लिखो।', // Hindi: Write the date
    english: 'Write the date.', // Primary English answer
    alternatives: ['Put the date.', 'Write today\'s date.', 'Note the date.'], // Alternatives
    hint: 'तारीख = date. लिखो = write. "Write the date."', // Hint
    explanation: '"Write the date" is another common classroom instruction. Teachers always ask students to write the date at the top of their work. "Write" is the imperative verb, "the date" is the object.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'write', 'date', 'school', 'classroom'], // Tags
    usageNote: 'Teachers ask this at the beginning of every class or assignment.', // Usage
    relatedSentences: ['Write your name.', 'Write the heading.', 'Note the topic.'], // Related
  }, // End of question 35

  { // Question 36
    id: 'day3-q036', // Unique question ID
    hindi: 'पढ़ो।', // Hindi: Read
    english: 'Read.', // Primary English answer
    alternatives: ['Read it.', 'Read aloud.', 'Read the passage.'], // Alternatives
    hint: 'पढ़ना = to read. Simple imperative: Read.', // Hint
    explanation: '"Read" as a one-word imperative means "start reading now." Teachers say this when pointing to text on the board or in a book. It can also be followed by an object like "Read the passage" or "Read chapter 2."', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Single Base Verb', // Grammar rule
    tags: ['command', 'read', 'school', 'basic'], // Tags
    usageNote: 'Teachers use this when instructing students to read something.', // Usage
    relatedSentences: ['Write.', 'Listen.', 'Read aloud.'], // Related
  }, // End of question 36

  { // Question 37
    id: 'day3-q037', // Unique question ID
    hindi: 'जोर से पढ़ो।', // Hindi: Read aloud / Read loudly
    english: 'Read aloud.', // Primary English answer
    alternatives: ['Read out loud.', 'Read loudly.', 'Read in a loud voice.'], // Alternatives
    hint: 'जोर से = loudly/aloud. पढ़ो = read. "Read aloud" = read in a loud voice.', // Hint
    explanation: '"Read aloud" means to read in a voice that others can hear. "Aloud" is the adverb modifying the verb "read." This is opposite to "Read silently" (मन ही मन पढ़ो). Teachers ask this to check pronunciation and fluency.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'read', 'aloud', 'loud', 'school'], // Tags
    usageNote: 'Teachers use this to check students\' reading ability and pronunciation.', // Usage
    relatedSentences: ['Read silently.', 'Speak clearly.', 'Read with expression.'], // Related
  }, // End of question 37

  { // Question 38
    id: 'day3-q038', // Unique question ID
    hindi: 'चुपचाप पढ़ो।', // Hindi: Read silently
    english: 'Read silently.', // Primary English answer
    alternatives: ['Read quietly.', 'Read to yourself.', 'Read in your mind.'], // Alternatives
    hint: 'चुपचाप = silently/quietly. पढ़ो = read. "Read silently."', // Hint
    explanation: '"Read silently" means to read without making any sound. "Silently" is the adverb of manner. Used in libraries, during exams, and when students need to read for comprehension without disturbing others.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'read', 'silently', 'quiet', 'library'], // Tags
    usageNote: 'Used in libraries and during reading comprehension exercises.', // Usage
    relatedSentences: ['Read aloud.', 'Be quiet.', 'Read carefully.'], // Related
  }, // End of question 38

  { // Question 39
    id: 'day3-q039', // Unique question ID
    hindi: 'अभ्यास करो।', // Hindi: Practice
    english: 'Practice.', // Primary English answer
    alternatives: ['Practice every day.', 'Keep practicing.', 'Practice more.'], // Alternatives
    hint: 'अभ्यास करना = to practice. "Practice" as a command.', // Hint
    explanation: '"Practice" as an imperative means "do practice now" or "make it a habit to practice." In American English it is spelled "practice" (verb). In British English, the verb is "practise" and the noun is "practice."', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Single Base Verb', // Grammar rule
    tags: ['command', 'practice', 'study', 'learning'], // Tags
    usageNote: 'Teachers and coaches use this to encourage regular practice.', // Usage
    relatedSentences: ['Study hard.', 'Keep practicing.', 'Work hard.'], // Related
  }, // End of question 39

  { // Question 40
    id: 'day3-q040', // Unique question ID
    hindi: 'ठीक से काम करो।', // Hindi: Work properly / Do the work properly
    english: 'Work properly.', // Primary English answer
    alternatives: ['Do your work properly.', 'Work carefully.', 'Do it correctly.'], // Alternatives
    hint: 'ठीक से = properly/correctly. काम करो = work/do the work.', // Hint
    explanation: '"Work properly" is an instruction to do something in the right way. "Properly" is an adverb of manner modifying the verb "work." Used in workplaces, classrooms, and at home to ensure quality.', // Explanation
    difficulty: 'medium', // Medium
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'work', 'properly', 'quality', 'instruction'], // Tags
    usageNote: 'Used by supervisors and teachers to insist on quality work.', // Usage
    relatedSentences: ['Do it right.', 'Be careful.', 'Work hard.'], // Related
  }, // End of question 40

  { // Question 41
    id: 'day3-q041', // Unique question ID
    hindi: 'जल्दी करो।', // Hindi: Hurry up / Be quick
    english: 'Hurry up.', // Primary English answer
    alternatives: ['Be quick.', 'Speed up.', 'Come on, hurry.', 'Move it.'], // Alternatives
    hint: 'जल्दी करो = hurry up. "Hurry up" = move faster.', // Hint
    explanation: '"Hurry up" is a phrasal verb used as an imperative command. It means to do something faster or to move more quickly. Very common in everyday speech when someone is running late.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb as Command', // Grammar rule
    tags: ['command', 'hurry', 'up', 'speed', 'daily'], // Tags
    usageNote: 'Used when someone is being too slow and you need them to speed up.', // Usage
    relatedSentences: ['Be quick.', 'Move faster.', 'Come on.'], // Related
  }, // End of question 41

  { // Question 42
    id: 'day3-q042', // Unique question ID
    hindi: 'धीरे चलो।', // Hindi: Walk slowly / Go slowly
    english: 'Walk slowly.', // Primary English answer
    alternatives: ['Go slowly.', 'Slow down.', 'Take it slow.', 'Walk carefully.'], // Alternatives
    hint: 'धीरे = slowly. चलो = walk/go. "Walk slowly."', // Hint
    explanation: '"Walk slowly" is the opposite of "Walk fast." "Slowly" is an adverb of manner. "Slow down" is a phrasal verb meaning the same thing but more emphatic. Used when someone is going too fast in a dangerous place.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'walk', 'slowly', 'safety', 'caution'], // Tags
    usageNote: 'Used with children, elderly people, or in slippery conditions.', // Usage
    relatedSentences: ['Be careful.', 'Slow down.', 'Take your time.'], // Related
  }, // End of question 42

  { // Question 43
    id: 'day3-q043', // Unique question ID
    hindi: 'ध्यान से देखो।', // Hindi: Look carefully
    english: 'Look carefully.', // Primary English answer
    alternatives: ['Watch carefully.', 'Look closely.', 'Observe carefully.'], // Alternatives
    hint: 'ध्यान से = carefully. देखो = look/see. "Look carefully."', // Hint
    explanation: '"Look carefully" combines the base verb "look" with the adverb "carefully." Used to instruct someone to examine something with attention to detail. Very common in science classes, art, and when finding something.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'look', 'carefully', 'observe', 'attention'], // Tags
    usageNote: 'Used when you want someone to examine something closely.', // Usage
    relatedSentences: ['Watch closely.', 'Observe.', 'Pay attention.'], // Related
  }, // End of question 43

  { // Question 44
    id: 'day3-q044', // Unique question ID
    hindi: 'अपना काम खत्म करो।', // Hindi: Finish your work
    english: 'Finish your work.', // Primary English answer
    alternatives: ['Complete your work.', 'Finish your task.', 'Get your work done.'], // Alternatives
    hint: 'खत्म करना = to finish/complete. काम = work. "Finish your work."', // Hint
    explanation: '"Finish your work" uses "finish" as the imperative verb and "your work" as the object. The possessive "your" makes it personal and direct. Used by teachers, parents, and bosses to remind someone to complete a task.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'finish', 'work', 'complete', 'productivity'], // Tags
    usageNote: 'Used by supervisors and teachers when work is not completed.', // Usage
    relatedSentences: ['Complete the task.', 'Submit the report.', 'Do your homework.'], // Related
  }, // End of question 44

  { // Question 45
    id: 'day3-q045', // Unique question ID
    hindi: 'शांत रहो।', // Hindi: Stay calm / Be quiet / Be calm
    english: 'Stay calm.', // Primary English answer
    alternatives: ['Be calm.', 'Keep calm.', 'Relax.', 'Be quiet.'], // Alternatives
    hint: 'शांत रहना = to stay calm/be quiet. "Stay calm" or "Keep calm."', // Hint
    explanation: '"Stay calm" uses the verb "stay" (remain in a state) with the adjective "calm." This is an advice/instruction to not panic. "Keep calm" is the same meaning. Very important in emergencies and stressful situations.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb (Linking) + Adjective', // Grammar rule
    tags: ['command', 'calm', 'stay', 'advice', 'emergency'], // Tags
    usageNote: 'Used during emergencies, conflicts, or stressful situations.', // Usage
    relatedSentences: ['Relax.', 'Be patient.', 'Take a deep breath.'], // Related
  }, // End of question 45

  { // Question 46
    id: 'day3-q046', // Unique question ID
    hindi: 'चुप रहो।', // Hindi: Be quiet / Stay silent
    english: 'Be quiet.', // Primary English answer
    alternatives: ['Stay quiet.', 'Keep quiet.', 'Silence, please.', 'Hush.'], // Alternatives
    hint: 'चुप रहना = to be quiet. "Be quiet" = stop making noise.', // Hint
    explanation: '"Be quiet" uses the imperative of "be" with the adjective "quiet." "Keep quiet" is also very common and means the same. "Hush" is informal. Used in libraries, during meetings, exams, and when someone is sleeping.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Be + Adjective', // Grammar rule
    tags: ['command', 'quiet', 'silence', 'noise', 'classroom'], // Tags
    usageNote: 'Used when you need silence in a room.', // Usage
    relatedSentences: ['Stay calm.', 'Stop talking.', 'Keep silent.'], // Related
  }, // End of question 46

  { // Question 47
    id: 'day3-q047', // Unique question ID
    hindi: 'हाथ उठाओ।', // Hindi: Raise your hand
    english: 'Raise your hand.', // Primary English answer
    alternatives: ['Put your hand up.', 'Lift your hand.', 'Raise your hand, please.'], // Alternatives
    hint: 'हाथ = hand. उठाओ = raise/lift. "Raise your hand."', // Hint
    explanation: '"Raise your hand" is the most common classroom imperative. Students are expected to raise their hand to ask a question or give an answer. "Put your hand up" means the same. "Raise" is the base verb, "your hand" is the object.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'raise', 'hand', 'classroom', 'school'], // Tags
    usageNote: 'Teachers say this when they want students to participate.', // Usage
    relatedSentences: ['Put your hand down.', 'Answer the question.', 'Stand up.'], // Related
  }, // End of question 47

  { // Question 48
    id: 'day3-q048', // Unique question ID
    hindi: 'हाथ नीचे करो।', // Hindi: Put your hand down / Lower your hand
    english: 'Put your hand down.', // Primary English answer
    alternatives: ['Lower your hand.', 'Bring your hand down.', 'Hands down.'], // Alternatives
    hint: 'हाथ = hand. नीचे करो = put down/lower. "Put your hand down."', // Hint
    explanation: '"Put your hand down" is the opposite of "Raise your hand." "Put down" is a phrasal verb meaning to lower something. The structure is: Put + your hand + down. "Hands down" is a shortened informal version.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'hand', 'down', 'classroom', 'lower'], // Tags
    usageNote: 'Teachers say this after a student has been seen or after a vote.', // Usage
    relatedSentences: ['Raise your hand.', 'Sit down.', 'Stand up.'], // Related
  }, // End of question 48

  { // Question 49
    id: 'day3-q049', // Unique question ID
    hindi: 'ब्लैकबोर्ड पर देखो।', // Hindi: Look at the blackboard
    english: 'Look at the blackboard.', // Primary English answer
    alternatives: ['Look at the board.', 'Watch the board.', 'See the blackboard.'], // Alternatives
    hint: 'ब्लैकबोर्ड = blackboard. देखो = look at. "Look at the blackboard."', // Hint
    explanation: '"Look at the blackboard" — "look at" is a phrasal verb that requires the preposition "at." You cannot say "Look the blackboard." Always: look + at + object. A very common classroom instruction.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb (Look at) + Object', // Grammar rule
    tags: ['command', 'look', 'blackboard', 'classroom', 'school'], // Tags
    usageNote: 'Teachers use this to direct students\' attention to the board.', // Usage
    relatedSentences: ['Look at me.', 'Write on the board.', 'Copy the notes.'], // Related
  }, // End of question 49

  { // Question 50
    id: 'day3-q050', // Unique question ID
    hindi: 'नोट्स लिखो।', // Hindi: Write notes / Take notes
    english: 'Take notes.', // Primary English answer
    alternatives: ['Write notes.', 'Note it down.', 'Write this down.'], // Alternatives
    hint: 'नोट्स लिखना = to take notes. "Take notes" is the most natural English phrase.', // Hint
    explanation: '"Take notes" is an idiomatic expression meaning to write down important information. Although "take" seems like an odd choice, it is the standard phrase. "Write notes" is also correct but "take notes" is more natural in English.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object (Idiomatic)', // Grammar rule
    tags: ['command', 'notes', 'write', 'classroom', 'study'], // Tags
    usageNote: 'Teachers say this during lectures when sharing important information.', // Usage
    relatedSentences: ['Write this down.', 'Copy the points.', 'Note the key words.'], // Related
  }, // End of question 50

  { // Question 51
    id: 'day3-q051', // Unique question ID
    hindi: 'लाइट बंद करो।', // Hindi: Turn off the light
    english: 'Turn off the light.', // Primary English answer
    alternatives: ['Switch off the light.', 'Turn the light off.', 'Put off the light.'], // Alternatives
    hint: 'लाइट = light. बंद करो = turn off/switch off. "Turn off the light."', // Hint
    explanation: '"Turn off the light" uses the phrasal verb "turn off" as the imperative. "Switch off" means the same. In Hindi "बंद करो" is used for both turning off lights and closing doors — in English, we use different verbs for each.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Object', // Grammar rule
    tags: ['command', 'turn', 'off', 'light', 'electricity', 'home'], // Tags
    usageNote: 'Said when leaving a room or to save electricity.', // Usage
    relatedSentences: ['Turn on the light.', 'Switch off the fan.', 'Unplug the TV.'], // Related
  }, // End of question 51

  { // Question 52
    id: 'day3-q052', // Unique question ID
    hindi: 'लाइट जलाओ।', // Hindi: Turn on the light
    english: 'Turn on the light.', // Primary English answer
    alternatives: ['Switch on the light.', 'Put on the light.', 'Turn the light on.'], // Alternatives
    hint: 'जलाओ = turn on. लाइट = light. "Turn on the light."', // Hint
    explanation: '"Turn on the light" is the opposite of "Turn off the light." "Turn on" is the phrasal verb meaning to activate or start something electrical. Also: "Switch on the light" which is more British English.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Object', // Grammar rule
    tags: ['command', 'turn', 'on', 'light', 'electricity', 'home'], // Tags
    usageNote: 'Used when entering a dark room or when it gets dark outside.', // Usage
    relatedSentences: ['Turn off the light.', 'Switch on the fan.', 'Plug in the charger.'], // Related
  }, // End of question 52

  { // Question 53
    id: 'day3-q053', // Unique question ID
    hindi: 'पंखा बंद करो।', // Hindi: Turn off the fan
    english: 'Turn off the fan.', // Primary English answer
    alternatives: ['Switch off the fan.', 'Turn the fan off.', 'Stop the fan.'], // Alternatives
    hint: 'पंखा = fan. बंद करो = turn off/switch off.', // Hint
    explanation: '"Turn off the fan" follows the same pattern as "Turn off the light." These are common home and office commands related to electrical appliances. Very practical for daily English use.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Object', // Grammar rule
    tags: ['command', 'turn', 'off', 'fan', 'electricity', 'home'], // Tags
    usageNote: 'Said when it is cold or when leaving a room.', // Usage
    relatedSentences: ['Turn on the fan.', 'Turn off the AC.', 'Switch off the TV.'], // Related
  }, // End of question 53

  { // Question 54
    id: 'day3-q054', // Unique question ID
    hindi: 'टीवी बंद करो।', // Hindi: Turn off the TV
    english: 'Turn off the TV.', // Primary English answer
    alternatives: ['Switch off the TV.', 'Turn the TV off.', 'Turn off the television.'], // Alternatives
    hint: 'टीवी = TV (television). बंद करो = turn off. Same pattern as lights and fan.', // Hint
    explanation: '"Turn off the TV" is another home command. TV (television) is an abbreviation. Both "TV" and "television" are correct in the sentence. Parents often say this to children when they are watching too much TV.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Object', // Grammar rule
    tags: ['command', 'turn', 'off', 'tv', 'television', 'home'], // Tags
    usageNote: 'Parents say this to children when it\'s time to study or sleep.', // Usage
    relatedSentences: ['Turn on the TV.', 'Lower the volume.', 'Change the channel.'], // Related
  }, // End of question 54

  { // Question 55
    id: 'day3-q055', // Unique question ID
    hindi: 'आवाज़ कम करो।', // Hindi: Lower the volume / Turn down the volume
    english: 'Lower the volume.', // Primary English answer
    alternatives: ['Turn down the volume.', 'Keep the noise down.', 'Reduce the volume.'], // Alternatives
    hint: 'आवाज़ कम करो = lower the volume. "Turn down" is a phrasal verb.', // Hint
    explanation: '"Lower the volume" uses "lower" as the base verb and "the volume" as the object. "Turn down the volume" uses the phrasal verb "turn down." Both are equally correct. Said when TV, music, or any device is too loud.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'volume', 'lower', 'noise', 'sound'], // Tags
    usageNote: 'Used when music, TV, or someone\'s voice is too loud.', // Usage
    relatedSentences: ['Raise the volume.', 'Turn up the music.', 'Mute the sound.'], // Related
  }, // End of question 55

  { // Question 56
    id: 'day3-q056', // Unique question ID
    hindi: 'मोबाइल बंद करो।', // Hindi: Turn off your phone / Switch off your mobile
    english: 'Turn off your phone.', // Primary English answer
    alternatives: ['Switch off your mobile.', 'Put your phone away.', 'Turn off your mobile phone.'], // Alternatives
    hint: 'मोबाइल = mobile/phone. बंद करो = turn off. "Turn off your phone."', // Hint
    explanation: '"Turn off your phone" is a very modern imperative used in cinemas, hospitals, classrooms, and meetings. "Mobile" is used in British/Indian English; "phone" or "cell phone" is used in American English.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'phone', 'mobile', 'off', 'modern'], // Tags
    usageNote: 'Used in cinemas, hospitals, classrooms, and during important meetings.', // Usage
    relatedSentences: ['Put your phone away.', 'Silence your phone.', 'No phones in class.'], // Related
  }, // End of question 56

  { // Question 57
    id: 'day3-q057', // Unique question ID
    hindi: 'कूड़ा मत फेंको।', // Hindi: Don't throw garbage / Don't litter
    english: "Don't litter.", // Primary English answer
    alternatives: ["Don't throw garbage.", "Do not throw garbage.", "Don't throw trash."], // Alternatives
    hint: 'कूड़ा = garbage/trash/litter. This is a negative imperative with "Don\'t".', // Hint
    explanation: '"Don\'t litter" is a common public sign and command. "Litter" as a verb means to throw rubbish/garbage in a public place. "Don\'t" makes it negative. This is a SECTION 3 type question about negative commands, but included here for variety.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['command', 'negative', 'litter', 'garbage', 'environment'], // Tags
    usageNote: 'Seen on public signs in parks, roads, and public places.', // Usage
    relatedSentences: ["Don't waste water.", "Don't pollute.", 'Keep the place clean.'], // Related
  }, // End of question 57

  { // Question 58
    id: 'day3-q058', // Unique question ID
    hindi: 'गहरी साँस लो।', // Hindi: Take a deep breath
    english: 'Take a deep breath.', // Primary English answer
    alternatives: ['Breathe deeply.', 'Inhale deeply.', 'Take deep breaths.'], // Alternatives
    hint: 'गहरी साँस लो = take a deep breath. "Take" is the base verb.', // Hint
    explanation: '"Take a deep breath" is an idiomatic imperative used to calm someone down. "Take" is the base verb, "a deep breath" is the noun phrase object. "Breathe deeply" is a more direct version using the verb "breathe."', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Article + Adjective + Object', // Grammar rule
    tags: ['command', 'breath', 'deep', 'relax', 'calm'], // Tags
    usageNote: 'Used when someone is angry, anxious, or panicking.', // Usage
    relatedSentences: ['Stay calm.', 'Relax.', 'Breathe slowly.'], // Related
  }, // End of question 58

  { // Question 59
    id: 'day3-q059', // Unique question ID
    hindi: 'सीधे खड़े रहो।', // Hindi: Stand straight / Stand up straight
    english: 'Stand straight.', // Primary English answer
    alternatives: ['Stand up straight.', 'Stand tall.', 'Keep your back straight.'], // Alternatives
    hint: 'सीधे = straight. खड़े रहो = stand/remain standing. "Stand straight."', // Hint
    explanation: '"Stand straight" is a posture command. "Straight" here is an adverb modifying the verb "stand." "Stand up straight" adds "up" for emphasis. Used in military training, yoga, dance classes, and by parents.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'stand', 'straight', 'posture', 'discipline'], // Tags
    usageNote: 'Used in military, yoga, dance class, or when correcting posture.', // Usage
    relatedSentences: ['Sit straight.', 'Stand tall.', 'Keep your back straight.'], // Related
  }, // End of question 59

  { // Question 60
    id: 'day3-q060', // Unique question ID
    hindi: 'अपनी जगह पर बैठो।', // Hindi: Sit in your place / Sit at your seat
    english: 'Sit in your seat.', // Primary English answer
    alternatives: ['Take your seat.', 'Go to your seat.', 'Sit at your place.', 'Return to your seat.'], // Alternatives
    hint: 'अपनी जगह = your place/seat. बैठो = sit. "Sit in your seat."', // Hint
    explanation: '"Sit in your seat" is a very common classroom command. "Sit" is the base verb, "in your seat" is the prepositional phrase telling WHERE to sit. Teachers say this when students are walking around the classroom.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Prepositional Phrase', // Grammar rule
    tags: ['command', 'sit', 'seat', 'classroom', 'place'], // Tags
    usageNote: 'Used in classrooms when students leave their seats without permission.', // Usage
    relatedSentences: ['Go back to your seat.', 'Stay in your place.', 'Sit down.'], // Related
  }, // End of question 60

  { // Question 61
    id: 'day3-q061', // Unique question ID
    hindi: 'टेबल पर रखो।', // Hindi: Put it on the table
    english: 'Put it on the table.', // Primary English answer
    alternatives: ['Place it on the table.', 'Keep it on the table.', 'Set it on the table.'], // Alternatives
    hint: 'टेबल = table. रखो = put/place. "Put it on the table."', // Hint
    explanation: '"Put it on the table" — "put" is the base verb, "it" is the object, "on the table" is the prepositional phrase telling WHERE. "Place," "keep," and "set" are all synonyms for "put" in this context.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object + Prepositional Phrase', // Grammar rule
    tags: ['command', 'put', 'table', 'place', 'object'], // Tags
    usageNote: 'Used when directing someone where to place an object.', // Usage
    relatedSentences: ['Pick it up.', 'Keep it safe.', 'Put it down.'], // Related
  }, // End of question 61

  { // Question 62
    id: 'day3-q062', // Unique question ID
    hindi: 'बैग उठाओ।', // Hindi: Pick up the bag / Lift the bag
    english: 'Pick up the bag.', // Primary English answer
    alternatives: ['Lift the bag.', 'Carry the bag.', 'Take the bag.'], // Alternatives
    hint: 'बैग = bag. उठाओ = pick up/lift. "Pick up the bag."', // Hint
    explanation: '"Pick up the bag" uses the phrasal verb "pick up" meaning to lift something off a surface. "Lift the bag" uses a simple verb. Both are correct. Used when someone drops something or when luggage needs to be taken.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Object', // Grammar rule
    tags: ['command', 'pick', 'up', 'bag', 'lift'], // Tags
    usageNote: 'Used when someone drops something or needs to carry their bag.', // Usage
    relatedSentences: ['Put down the bag.', 'Carry your bag.', 'Lift the box.'], // Related
  }, // End of question 62

  { // Question 63
    id: 'day3-q063', // Unique question ID
    hindi: 'दरवाज़ा बंद मत करो।', // Hindi: Don't close the door
    english: "Don't close the door.", // Primary English answer
    alternatives: ["Do not close the door.", "Don't shut the door.", 'Leave the door open.'], // Alternatives
    hint: 'Don\'t = do not (negative). Close the door → Don\'t close the door.', // Hint
    explanation: '"Don\'t close the door" is a negative imperative. We add "Don\'t" before the base verb to make any imperative negative. "Do not" is more formal. "Don\'t" is the contraction used in daily speech.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', 'command', 'door', 'close', "don't"], // Tags
    usageNote: 'Used to prevent someone from closing a door that should remain open.', // Usage
    relatedSentences: ["Don't open the door.", 'Keep the door open.', "Don't lock it."], // Related
  }, // End of question 63

  { // Question 64
    id: 'day3-q064', // Unique question ID
    hindi: 'शोर मत करो।', // Hindi: Don't make noise
    english: "Don't make noise.", // Primary English answer
    alternatives: ["Do not make noise.", "Don't be noisy.", 'Keep quiet.', 'Stop making noise.'], // Alternatives
    hint: 'शोर = noise. मत = do not/don\'t. "Don\'t make noise."', // Hint
    explanation: '"Don\'t make noise" is a very common household and school command. "Make noise" is the verb phrase — "make" is the base verb, "noise" is the object. Adding "Don\'t" makes it negative.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', 'noise', 'quiet', 'command', "don't"], // Tags
    usageNote: 'Used at home, in class, or in any place where silence is needed.', // Usage
    relatedSentences: ['Be quiet.', "Don't talk.", 'Keep silent.'], // Related
  }, // End of question 64

  { // Question 65
    id: 'day3-q065', // Unique question ID
    hindi: 'देर मत करो।', // Hindi: Don't be late
    english: "Don't be late.", // Primary English answer
    alternatives: ["Do not be late.", 'Be on time.', "Don't delay."], // Alternatives
    hint: 'देर करना = to be late. मत = don\'t. "Don\'t be late."', // Hint
    explanation: '"Don\'t be late" uses "Don\'t be" + adjective. "Late" is an adjective here. The positive version would be "Be on time." This is very common in offices, schools, and when meeting someone.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Be + Adjective", // Grammar rule
    tags: ['negative', 'late', 'time', 'punctual', "don't"], // Tags
    usageNote: 'Used by bosses, teachers, and parents to remind about punctuality.', // Usage
    relatedSentences: ['Be on time.', 'Come early.', "Don't delay."], // Related
  }, // End of question 65

  { // Question 66
    id: 'day3-q066', // Unique question ID
    hindi: 'झूठ मत बोलो।', // Hindi: Don't lie / Don't tell lies
    english: "Don't lie.", // Primary English answer
    alternatives: ["Do not lie.", "Don't tell lies.", 'Tell the truth.', 'Be honest.'], // Alternatives
    hint: 'झूठ बोलना = to lie. मत = don\'t. "Don\'t lie."', // Hint
    explanation: '"Don\'t lie" is one of the most important moral commands. "Lie" here is a verb (not the noun). The positive alternative is "Tell the truth" or "Be honest." Used in parenting, education, and any ethical context.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', 'lie', 'honest', 'moral', "don't"], // Tags
    usageNote: 'Used by parents, teachers, and in ethical/moral contexts.', // Usage
    relatedSentences: ['Tell the truth.', 'Be honest.', "Don't cheat."], // Related
  }, // End of question 66

  { // Question 67
    id: 'day3-q067', // Unique question ID
    hindi: 'जल्दबाज़ी मत करो।', // Hindi: Don't rush / Don't hurry
    english: "Don't rush.", // Primary English answer
    alternatives: ["Do not rush.", 'Take your time.', "Don't hurry.", 'Go slowly.'], // Alternatives
    hint: 'जल्दबाज़ी = rush/hurry. मत = don\'t. "Don\'t rush" = take your time.', // Hint
    explanation: '"Don\'t rush" tells someone not to hurry. "Rush" here is a verb meaning to do something too fast. The positive equivalent is "Take your time" which means to go at a comfortable pace without hurrying.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', 'rush', 'hurry', 'time', 'patience'], // Tags
    usageNote: 'Used when someone is moving too fast and making mistakes.', // Usage
    relatedSentences: ['Take your time.', 'Be careful.', 'Go slowly.'], // Related
  }, // End of question 67

  { // Question 68
    id: 'day3-q068', // Unique question ID
    hindi: 'समय बर्बाद मत करो।', // Hindi: Don't waste time
    english: "Don't waste time.", // Primary English answer
    alternatives: ["Do not waste time.", 'Use your time wisely.', "Don't lose time.", 'Stop wasting time.'], // Alternatives
    hint: 'समय बर्बाद करना = to waste time. मत = don\'t. "Don\'t waste time."', // Hint
    explanation: '"Don\'t waste time" is an important advisory command. "Waste" is the base verb, "time" is the object. The positive alternative "Use your time wisely" gives a constructive suggestion instead of just saying don\'t.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', 'waste', 'time', 'productivity', 'advice'], // Tags
    usageNote: 'Used by parents, teachers, and mentors to encourage productivity.', // Usage
    relatedSentences: ['Use your time wisely.', 'Work hard.', "Don't delay."], // Related
  }, // End of question 68

  { // Question 69
    id: 'day3-q069', // Unique question ID
    hindi: 'चिंता मत करो।', // Hindi: Don't worry
    english: "Don't worry.", // Primary English answer
    alternatives: ["Do not worry.", "Don't be worried.", 'Stay positive.', 'Everything will be fine.'], // Alternatives
    hint: 'चिंता करना = to worry. मत = don\'t. "Don\'t worry" = be calm.', // Hint
    explanation: '"Don\'t worry" is one of the most common comforting commands. "Worry" is the base verb. It is used to console someone who is anxious or upset. "Everything will be fine" is a reassurance that often follows.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', 'worry', 'comfort', 'consolation', 'reassurance'], // Tags
    usageNote: 'Used to comfort and reassure someone who is stressed or anxious.', // Usage
    relatedSentences: ['Stay calm.', 'Be positive.', 'Relax.'], // Related
  }, // End of question 69

  { // Question 70
    id: 'day3-q070', // Unique question ID
    hindi: 'मुझे परेशान मत करो।', // Hindi: Don't disturb me / Don't bother me
    english: "Don't disturb me.", // Primary English answer
    alternatives: ["Do not disturb me.", "Don't bother me.", "Don't interrupt me.", 'Leave me alone.'], // Alternatives
    hint: 'परेशान करना = to disturb/bother. मत = don\'t. मुझे = me.', // Hint
    explanation: '"Don\'t disturb me" — "disturb" is the base verb, "me" is the object. This command is used when you want privacy and focus. "Do Not Disturb" (DND) is a sign used in hotels.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object Pronoun", // Grammar rule
    tags: ['negative', 'disturb', 'bother', 'privacy', 'focus'], // Tags
    usageNote: 'Used when you are working or studying and need concentration.', // Usage
    relatedSentences: ["Don't interrupt.", 'Leave me alone.', 'Give me some space.'], // Related
  }, // End of question 70

  { // Question 71
    id: 'day3-q071', // Unique question ID
    hindi: 'थैला उठाओ और जाओ।', // Hindi: Pick up the bag and go
    english: 'Pick up the bag and go.', // Primary English answer
    alternatives: ['Take the bag and leave.', 'Grab the bag and go.', 'Pick up your bag and go.'], // Alternatives
    hint: 'Two commands joined with "and": Pick up + go.', // Hint
    explanation: 'This sentence combines two imperative commands: "Pick up the bag" and "go." They are connected with "and." Both verbs (pick, go) are in base form. The "and" makes the second action follow the first.', // Explanation
    difficulty: 'medium', // Medium
    category: 'basic-commands', // Category
    grammarRule: 'Compound Imperative: Base Verb + and + Base Verb', // Grammar rule
    tags: ['compound', 'command', 'bag', 'go', 'multiple'], // Tags
    usageNote: 'Used when you want someone to do two things in quick succession.', // Usage
    relatedSentences: ['Come in and sit down.', 'Get up and leave.', 'Eat and go.'], // Related
  }, // End of question 71

  { // Question 72
    id: 'day3-q072', // Unique question ID
    hindi: 'अपने जूते उतारो।', // Hindi: Take off your shoes
    english: 'Take off your shoes.', // Primary English answer
    alternatives: ['Remove your shoes.', 'Take your shoes off.', 'Remove your footwear.'], // Alternatives
    hint: 'जूते = shoes. उतारना = to take off/remove. "Take off your shoes."', // Hint
    explanation: '"Take off your shoes" uses the phrasal verb "take off" meaning to remove clothing or footwear. "Remove your shoes" is more formal. Very common in Indian homes where shoes are removed before entering.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'shoes', 'remove', 'take', 'home'], // Tags
    usageNote: 'Very common in Indian households and temples — remove shoes before entering.', // Usage
    relatedSentences: ['Put on your shoes.', 'Leave your shoes outside.', 'Wear slippers.'], // Related
  }, // End of question 72

  { // Question 73
    id: 'day3-q073', // Unique question ID
    hindi: 'अपने जूते पहनो।', // Hindi: Put on your shoes
    english: 'Put on your shoes.', // Primary English answer
    alternatives: ['Wear your shoes.', 'Put your shoes on.', 'Get your shoes on.'], // Alternatives
    hint: 'जूते पहनना = to put on/wear shoes. "Put on your shoes."', // Hint
    explanation: '"Put on your shoes" uses the phrasal verb "put on" meaning to dress in or wear something. "Wear" is also correct but "put on" implies the action of putting them on right now, while "wear" implies the state of having them on.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'shoes', 'put', 'on', 'wear', 'home'], // Tags
    usageNote: 'Said to children when they need to get ready to go somewhere.', // Usage
    relatedSentences: ['Take off your shoes.', 'Wear your uniform.', 'Get dressed.'], // Related
  }, // End of question 73

  { // Question 74
    id: 'day3-q074', // Unique question ID
    hindi: 'तैयार हो जाओ।', // Hindi: Get ready
    english: 'Get ready.', // Primary English answer
    alternatives: ['Be ready.', 'Prepare yourself.', 'Get yourself ready.'], // Alternatives
    hint: 'तैयार होना = to get ready. "Get ready" = prepare yourself.', // Hint
    explanation: '"Get ready" uses the phrasal verb "get ready" where "get" indicates a change of state and "ready" is the adjective. "Be ready" means to already be in a state of readiness. "Get ready" means to start preparing NOW.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Get + Adjective', // Grammar rule
    tags: ['command', 'get', 'ready', 'prepare', 'morning'], // Tags
    usageNote: 'Used in the morning before school or work, or before leaving.', // Usage
    relatedSentences: ['Wake up.', 'Get dressed.', 'Hurry up.'], // Related
  }, // End of question 74

  { // Question 75
    id: 'day3-q075', // Unique question ID
    hindi: 'सावधान रहो।', // Hindi: Be careful / Stay safe
    english: 'Be careful.', // Primary English answer
    alternatives: ['Stay safe.', 'Watch out.', 'Take care.', 'Be cautious.'], // Alternatives
    hint: 'सावधान रहना = to be careful. "Be careful" = take care, watch out.', // Hint
    explanation: '"Be careful" uses "be" as the imperative verb with "careful" as the adjective. "Watch out" is used for immediate dangers. "Take care" is used as a farewell. All three are common warnings/advice.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Be + Adjective', // Grammar rule
    tags: ['command', 'careful', 'safe', 'warning', 'advice'], // Tags
    usageNote: 'Used when someone is about to do something potentially dangerous.', // Usage
    relatedSentences: ['Watch out.', 'Stay safe.', "Don't be careless."], // Related
  }, // End of question 75

  { // Question 76
    id: 'day3-q076', // Unique question ID
    hindi: 'मुझे बताओ।', // Hindi: Tell me
    english: 'Tell me.', // Primary English answer
    alternatives: ['Tell me everything.', 'Tell me the truth.', 'Let me know.', 'Inform me.'], // Alternatives
    hint: 'बताना = to tell. मुझे = me. "Tell me" — verb + pronoun.', // Hint
    explanation: '"Tell me" is a common request/command. "Tell" is the base verb, "me" is the indirect object. It can be followed by what you want to know: "Tell me your name," "Tell me what happened," etc.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Indirect Object', // Grammar rule
    tags: ['command', 'tell', 'me', 'information', 'request'], // Tags
    usageNote: 'Used when you want someone to share information with you.', // Usage
    relatedSentences: ['Explain to me.', 'Show me.', 'Tell me your name.'], // Related
  }, // End of question 76

  { // Question 77
    id: 'day3-q077', // Unique question ID
    hindi: 'मुझे दिखाओ।', // Hindi: Show me
    english: 'Show me.', // Primary English answer
    alternatives: ['Show me how.', 'Show me the way.', 'Let me see.', 'Demonstrate.'], // Alternatives
    hint: 'दिखाना = to show. मुझे = me. "Show me" — verb + object.', // Hint
    explanation: '"Show me" — "show" is the base verb, "me" is the indirect object. Often followed by WHAT to show: "Show me your ID," "Show me the way." A very natural request used in many situations.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Indirect Object', // Grammar rule
    tags: ['command', 'show', 'me', 'demonstrate', 'request'], // Tags
    usageNote: 'Used to ask someone to demonstrate or reveal something.', // Usage
    relatedSentences: ['Tell me.', 'Explain.', 'Demonstrate it.'], // Related
  }, // End of question 77

  { // Question 78
    id: 'day3-q078', // Unique question ID
    hindi: 'अपना होमवर्क करो।', // Hindi: Do your homework
    english: 'Do your homework.', // Primary English answer
    alternatives: ['Complete your homework.', 'Finish your homework.', 'Work on your homework.'], // Alternatives
    hint: 'होमवर्क करना = to do homework. "Do your homework" — the most common version.', // Hint
    explanation: '"Do your homework" is one of the most classic parent-to-child commands in the English-speaking world. "Do" is the base verb, "your homework" is the object. "Complete" and "Finish" are slightly different in meaning but similar in usage.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'homework', 'study', 'school', 'parent'], // Tags
    usageNote: 'Said by parents and teachers to remind students about homework.', // Usage
    relatedSentences: ['Study hard.', 'Read your textbook.', 'Finish the assignment.'], // Related
  }, // End of question 78

  { // Question 79
    id: 'day3-q079', // Unique question ID
    hindi: 'सच बोलो।', // Hindi: Tell the truth / Speak the truth
    english: 'Tell the truth.', // Primary English answer
    alternatives: ['Speak the truth.', 'Be honest.', 'Say the truth.'], // Alternatives
    hint: 'सच = truth. बोलो = tell/speak. "Tell the truth" is the most natural phrase.', // Hint
    explanation: '"Tell the truth" — "tell" is the base verb, "the truth" is the object. "Say the truth" sounds unnatural in English (wrong preposition usage). Always use "tell the truth" not "say the truth." This is a common English mistake.', // Explanation
    difficulty: 'medium', // Medium — there is a common mistake here to watch out for
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Article + Object', // Grammar rule
    tags: ['command', 'truth', 'honest', 'moral', 'common-mistake'], // Tags
    usageNote: 'Important: "Tell the truth" — NOT "Say the truth" (that is wrong English).', // Usage
    relatedSentences: ["Don't lie.", 'Be honest.', 'Speak clearly.'], // Related
  }, // End of question 79

  { // Question 80
    id: 'day3-q080', // Unique question ID
    hindi: 'यहाँ बैठो और इंतज़ार करो।', // Hindi: Sit here and wait
    english: 'Sit here and wait.', // Primary English answer
    alternatives: ['Sit here and wait for me.', 'Wait here.', 'Have a seat and wait.'], // Alternatives
    hint: 'Two commands: sit + wait. Connected with "and."', // Hint
    explanation: '"Sit here and wait" combines two imperatives: "Sit here" and "wait." The two actions are connected with "and." This tells someone to find a seat and then wait. Very common in waiting rooms, clinics, and offices.', // Explanation
    difficulty: 'medium', // Medium
    category: 'basic-commands', // Category
    grammarRule: 'Compound Imperative: Base Verb + Adverb + and + Base Verb', // Grammar rule
    tags: ['compound', 'command', 'sit', 'wait', 'patience'], // Tags
    usageNote: 'Used in waiting rooms, reception areas, and offices.', // Usage
    relatedSentences: ['Wait outside.', 'Sit down and be quiet.', 'Wait for your turn.'], // Related
  }, // End of question 80

  { // Question 81
    id: 'day3-q081', // Unique question ID
    hindi: 'अपना मुँह बंद रखो।', // Hindi: Keep your mouth shut / Be quiet
    english: 'Keep your mouth shut.', // Primary English answer
    alternatives: ['Close your mouth.', 'Be quiet.', 'Keep quiet.', 'Stop talking.'], // Alternatives
    hint: 'मुँह बंद रखो = keep your mouth shut. "Keep" + possessive + object + adjective.', // Hint
    explanation: '"Keep your mouth shut" is an idiomatic expression meaning to stop talking or to not reveal a secret. It is more forceful than "Be quiet." "Keep" is the base verb, "your mouth" is the object, "shut" is the adjective.', // Explanation
    difficulty: 'medium', // Medium — idiomatic
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Keep + Object + Adjective', // Grammar rule
    tags: ['command', 'mouth', 'shut', 'quiet', 'idiomatic'], // Tags
    usageNote: 'More forceful than "Be quiet" — used when someone talks too much.', // Usage
    relatedSentences: ['Be quiet.', 'Stop talking.', "Don't say a word."], // Related
  }, // End of question 81

  { // Question 82
    id: 'day3-q082', // Unique question ID
    hindi: 'मन लगाकर पढ़ो।', // Hindi: Study with concentration / Focus and study
    english: 'Study with concentration.', // Primary English answer
    alternatives: ['Focus and study.', 'Study attentively.', 'Pay attention while studying.'], // Alternatives
    hint: 'मन लगाकर = with concentration/attentively. पढ़ो = study/read.', // Hint
    explanation: '"Study with concentration" uses "study" as the base verb and "with concentration" as a prepositional phrase showing HOW to study. "Attentively" is a single adverb that means the same as "with concentration."', // Explanation
    difficulty: 'medium', // Medium
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Prepositional Phrase of Manner', // Grammar rule
    tags: ['command', 'study', 'concentration', 'focus', 'school'], // Tags
    usageNote: 'Parents say this when children are distracted while studying.', // Usage
    relatedSentences: ['Focus.', 'Concentrate.', 'Study hard.'], // Related
  }, // End of question 82

  { // Question 83
    id: 'day3-q083', // Unique question ID
    hindi: 'घर जाओ।', // Hindi: Go home
    english: 'Go home.', // Primary English answer
    alternatives: ['Head home.', 'Return home.', 'Go back home.'], // Alternatives
    hint: 'घर = home. जाओ = go. Simple: "Go home."', // Hint
    explanation: '"Go home" — "home" here is an adverb of place (not a noun with an article). So we say "Go home" NOT "Go to the home." This is an important grammar point — "home" after verbs of motion (go, come, drive) does not need a preposition.', // Explanation
    difficulty: 'medium', // Medium — grammar point about "home" without preposition
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb (home without preposition)', // Grammar rule
    tags: ['command', 'go', 'home', 'grammar-point', 'preposition'], // Tags
    usageNote: 'Important: "Go home" NOT "Go to home" — no preposition needed with "home."', // Usage
    relatedSentences: ['Come home.', 'Stay home.', 'Head home.'], // Related
  }, // End of question 83

  { // Question 84
    id: 'day3-q084', // Unique question ID
    hindi: 'स्कूल जाओ।', // Hindi: Go to school
    english: 'Go to school.', // Primary English answer
    alternatives: ['Head to school.', 'Go to your school.', 'Leave for school.'], // Alternatives
    hint: 'स्कूल = school. जाओ = go. "Go to school" — needs "to" unlike "Go home."', // Hint
    explanation: '"Go to school" — unlike "Go home," "school" needs the preposition "to." This is an important contrast. "Go home," "Go there," "Go back" — no preposition. "Go to school," "Go to work," "Go to the store" — needs "to."', // Explanation
    difficulty: 'medium', // Medium — grammar point
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + to + Place', // Grammar rule
    tags: ['command', 'go', 'school', 'preposition', 'grammar-point'], // Tags
    usageNote: 'Compare: "Go home" (no "to") vs "Go to school" (needs "to").', // Usage
    relatedSentences: ['Come home.', 'Go to work.', 'Go to the market.'], // Related
  }, // End of question 84

  { // Question 85
    id: 'day3-q085', // Unique question ID
    hindi: 'हाथ धोओ।', // Hindi: Wash your hands
    english: 'Wash your hands.', // Primary English answer
    alternatives: ['Clean your hands.', 'Wash your hands with soap.', 'Rinse your hands.'], // Alternatives
    hint: 'हाथ = hands. धोना = to wash. "Wash your hands."', // Hint
    explanation: '"Wash your hands" is an essential hygiene command. "Wash" is the base verb, "your hands" is the object. This command became extremely important during the COVID-19 pandemic. Used before eating, after using the toilet, etc.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'wash', 'hands', 'hygiene', 'health'], // Tags
    usageNote: 'Essential hygiene instruction — said before meals and after using the bathroom.', // Usage
    relatedSentences: ['Brush your teeth.', 'Take a bath.', 'Clean your room.'], // Related
  }, // End of question 85

  { // Question 86
    id: 'day3-q086', // Unique question ID
    hindi: 'दाँत साफ़ करो।', // Hindi: Brush your teeth
    english: 'Brush your teeth.', // Primary English answer
    alternatives: ['Clean your teeth.', 'Brush your teeth twice a day.', 'Use your toothbrush.'], // Alternatives
    hint: 'दाँत = teeth. साफ़ करना = to clean/brush. "Brush your teeth" is the correct phrase.', // Hint
    explanation: '"Brush your teeth" — "brush" is the base verb, "your teeth" is the object. Note that "teeth" is the irregular plural of "tooth." We always say "brush your teeth" (not "tooth"), because you brush all your teeth together.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'brush', 'teeth', 'hygiene', 'health'], // Tags
    usageNote: 'Parents say this to children every morning and night.', // Usage
    relatedSentences: ['Wash your hands.', 'Comb your hair.', 'Take a bath.'], // Related
  }, // End of question 86

  { // Question 87
    id: 'day3-q087', // Unique question ID
    hindi: 'बाल बनाओ।', // Hindi: Comb your hair
    english: 'Comb your hair.', // Primary English answer
    alternatives: ['Brush your hair.', 'Set your hair.', 'Style your hair.'], // Alternatives
    hint: 'बाल = hair. बनाना = to comb/style/set. "Comb your hair."', // Hint
    explanation: '"Comb your hair" — "comb" used as a verb means to use a comb on your hair. "Brush your hair" uses a brush. Both mean to tidy your hair. The object is "your hair." Used when someone has messy hair.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'comb', 'hair', 'hygiene', 'appearance'], // Tags
    usageNote: 'Said in the morning before going to school or work.', // Usage
    relatedSentences: ['Brush your teeth.', 'Wash your face.', 'Get dressed.'], // Related
  }, // End of question 87

  { // Question 88
    id: 'day3-q088', // Unique question ID
    hindi: 'कमरा साफ़ करो।', // Hindi: Clean your room
    english: 'Clean your room.', // Primary English answer
    alternatives: ['Tidy up your room.', 'Clean up your room.', 'Organize your room.'], // Alternatives
    hint: 'कमरा = room. साफ़ करना = to clean. "Clean your room."', // Hint
    explanation: '"Clean your room" is a classic parent command. "Clean" is the base verb, "your room" is the object. "Tidy up" is a phrasal verb meaning to make neat and organized. "Organize" focuses on arranging items in order.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object', // Grammar rule
    tags: ['command', 'clean', 'room', 'home', 'tidy'], // Tags
    usageNote: 'Parents say this when a child\'s room is messy.', // Usage
    relatedSentences: ['Wash the dishes.', 'Make your bed.', 'Tidy up.'], // Related
  }, // End of question 88

  { // Question 89
    id: 'day3-q089', // Unique question ID
    hindi: 'बिस्तर ठीक करो।', // Hindi: Make your bed
    english: 'Make your bed.', // Primary English answer
    alternatives: ['Fix your bed.', 'Arrange your bed.', 'Tidy up your bed.'], // Alternatives
    hint: 'बिस्तर ठीक करो = make your bed. "Make your bed" is the idiomatic English phrase.', // Hint
    explanation: '"Make your bed" means to arrange the sheets, pillows, and blankets neatly after sleeping. This is an idiomatic expression — "make" doesn\'t mean to create the bed, but to organize it. "Make your bed" is the standard phrase.', // Explanation
    difficulty: 'medium', // Medium — idiomatic
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Possessive + Object (Idiomatic)', // Grammar rule
    tags: ['command', 'make', 'bed', 'idiomatic', 'morning', 'home'], // Tags
    usageNote: 'Parents say this to children after waking up. "Make your bed" is an idiom.', // Usage
    relatedSentences: ['Clean your room.', 'Tidy up.', 'Wash the dishes.'], // Related
  }, // End of question 89

  { // Question 90
    id: 'day3-q090', // Unique question ID
    hindi: 'बर्तन धोओ।', // Hindi: Wash the dishes
    english: 'Wash the dishes.', // Primary English answer
    alternatives: ['Do the dishes.', 'Clean the dishes.', 'Wash up.'], // Alternatives
    hint: 'बर्तन = dishes/utensils. धोना = wash. "Wash the dishes."', // Hint
    explanation: '"Wash the dishes" is a household chore command. "Do the dishes" is also very common (idiomatic). "Wash up" is a British English phrase meaning the same thing. All three are correct.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Article + Object', // Grammar rule
    tags: ['command', 'wash', 'dishes', 'home', 'chores'], // Tags
    usageNote: 'Used to assign household chores to family members.', // Usage
    relatedSentences: ['Clean the kitchen.', 'Make your bed.', 'Take out the trash.'], // Related
  }, // End of question 90

  { // Question 91
    id: 'day3-q091', // Unique question ID
    hindi: 'बाहर खेलो।', // Hindi: Play outside / Go play outside
    english: 'Play outside.', // Primary English answer
    alternatives: ['Go play outside.', 'Play in the yard.', 'Go outside and play.'], // Alternatives
    hint: 'बाहर = outside. खेलो = play. "Play outside."', // Hint
    explanation: '"Play outside" — "play" is the base verb, "outside" is the adverb of place. "Go play outside" adds another verb "go" which indicates movement + action. Both are correct and very commonly used.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Place', // Grammar rule
    tags: ['command', 'play', 'outside', 'children', 'fun'], // Tags
    usageNote: 'Parents say this when children need exercise and fresh air.', // Usage
    relatedSentences: ['Stay inside.', 'Come home early.', 'Play with your friends.'], // Related
  }, // End of question 91

  { // Question 92
    id: 'day3-q092', // Unique question ID
    hindi: 'अपना ख्याल रखो।', // Hindi: Take care of yourself
    english: 'Take care of yourself.', // Primary English answer
    alternatives: ['Take care.', 'Look after yourself.', 'Be good to yourself.'], // Alternatives
    hint: 'ख्याल रखना = to take care. अपना = yourself. "Take care of yourself."', // Hint
    explanation: '"Take care of yourself" — "take care of" is a phrasal verb, "yourself" is the reflexive pronoun object. This is both a command and a farewell expression. Often shortened to "Take care" when saying goodbye.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Phrasal Verb + Reflexive Pronoun', // Grammar rule
    tags: ['command', 'take', 'care', 'yourself', 'farewell', 'health'], // Tags
    usageNote: 'Used as advice and as a farewell expression.', // Usage
    relatedSentences: ['Stay healthy.', 'Be safe.', 'Look after yourself.'], // Related
  }, // End of question 92

  { // Question 93
    id: 'day3-q093', // Unique question ID
    hindi: 'माफ़ करना।', // Hindi: Excuse me / Forgive me / I am sorry
    english: 'Excuse me.', // Primary English answer
    alternatives: ['Forgive me.', 'Pardon me.', 'I am sorry.'], // Alternatives
    hint: 'माफ़ करना can mean "excuse me", "forgive me", or "I am sorry" depending on context.', // Hint
    explanation: '"Excuse me" is used to get attention or to apologize for a small inconvenience. "Forgive me" is deeper and used for more serious mistakes. "Pardon me" is very formal. Context matters when translating माफ़ करना.', // Explanation
    difficulty: 'medium', // Medium — multiple translations
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object Pronoun (Social Formula)', // Grammar rule
    tags: ['command', 'excuse', 'forgive', 'apology', 'social'], // Tags
    usageNote: '"Excuse me" for minor interruptions, "Forgive me" for serious apologies.', // Usage
    relatedSentences: ['Pardon me.', 'I am sorry.', 'Please forgive me.'], // Related
  }, // End of question 93

  { // Question 94
    id: 'day3-q094', // Unique question ID
    hindi: 'अपना परिचय दो।', // Hindi: Introduce yourself
    english: 'Introduce yourself.', // Primary English answer
    alternatives: ['Tell us about yourself.', 'Give your introduction.', 'Say your name and tell us about you.'], // Alternatives
    hint: 'परिचय देना = to introduce yourself. "Introduce yourself" — verb + reflexive pronoun.', // Hint
    explanation: '"Introduce yourself" uses the reflexive pronoun "yourself" as the object. "Introduce" is the base verb. This is a very common request in interviews, new classes, and meetings where people do not know each other yet.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Reflexive Pronoun', // Grammar rule
    tags: ['command', 'introduce', 'yourself', 'interview', 'social'], // Tags
    usageNote: 'Used at the start of meetings, interviews, and new classes.', // Usage
    relatedSentences: ['Tell me about yourself.', 'Say your name.', 'Introduce your friend.'], // Related
  }, // End of question 94

  { // Question 95
    id: 'day3-q095', // Unique question ID
    hindi: 'मेरे साथ आओ।', // Hindi: Come with me
    english: 'Come with me.', // Primary English answer
    alternatives: ['Follow me.', 'Walk with me.', 'Come along with me.'], // Alternatives
    hint: 'मेरे साथ = with me. आओ = come. "Come with me."', // Hint
    explanation: '"Come with me" — "come" is the base verb, "with me" is a prepositional phrase. "Follow me" means to come after someone in their footsteps. Both are commands directing someone to accompany you.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Prepositional Phrase', // Grammar rule
    tags: ['command', 'come', 'with', 'me', 'follow', 'direction'], // Tags
    usageNote: 'Used to invite or instruct someone to accompany you.', // Usage
    relatedSentences: ['Follow me.', 'Walk beside me.', 'Stay with me.'], // Related
  }, // End of question 95

  { // Question 96
    id: 'day3-q096', // Unique question ID
    hindi: 'मेरे पीछे आओ।', // Hindi: Follow me / Come behind me
    english: 'Follow me.', // Primary English answer
    alternatives: ['Come after me.', 'Walk behind me.', 'Come with me.'], // Alternatives
    hint: 'मेरे पीछे = behind me/after me. आओ = come. "Follow me" = come behind me.', // Hint
    explanation: '"Follow me" is an idiomatic command meaning to come after someone in the direction they are going. Very natural and short. Used by guides, teachers, and leaders. "Come after me" is more literal but less common.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object Pronoun (Idiomatic)', // Grammar rule
    tags: ['command', 'follow', 'me', 'direction', 'guide'], // Tags
    usageNote: 'Used by guides, teachers, and anyone leading a group somewhere.', // Usage
    relatedSentences: ['Come with me.', 'Walk with me.', 'Stay behind me.'], // Related
  }, // End of question 96

  { // Question 97
    id: 'day3-q097', // Unique question ID
    hindi: 'यहाँ खड़े रहो।', // Hindi: Stand here / Wait here (while standing)
    english: 'Stand here.', // Primary English answer
    alternatives: ['Wait here.', 'Remain here.', 'Stay here.'], // Alternatives
    hint: 'खड़े रहो = stand/remain standing. यहाँ = here. "Stand here."', // Hint
    explanation: '"Stand here" means to go to this location and stand. "Wait here" means to remain at this location (could be sitting or standing). "Stay here" has the same meaning as "Wait here" but is more about not moving away.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Place', // Grammar rule
    tags: ['command', 'stand', 'here', 'wait', 'position'], // Tags
    usageNote: 'Used when directing someone to a specific standing position.', // Usage
    relatedSentences: ['Sit here.', 'Wait there.', 'Move over here.'], // Related
  }, // End of question 97

  { // Question 98
    id: 'day3-q098', // Unique question ID
    hindi: 'आराम करो।', // Hindi: Rest / Take rest / Relax
    english: 'Take rest.', // Primary English answer
    alternatives: ['Rest.', 'Relax.', 'Have some rest.', 'Take it easy.'], // Alternatives
    hint: 'आराम करना = to rest/relax. "Take rest" or just "Rest."', // Hint
    explanation: '"Take rest" — in Indian English, "take rest" is commonly used. In British/American English, "Get some rest" or "Rest" is more common. All are understood. "Relax" means to loosen up, while "rest" specifically means to stop activity.', // Explanation
    difficulty: 'easy', // Easy
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Object', // Grammar rule
    tags: ['command', 'rest', 'relax', 'health', 'tiredness'], // Tags
    usageNote: 'Said to someone who is tired or unwell.', // Usage
    relatedSentences: ['Relax.', 'Sleep.', 'Take a break.'], // Related
  }, // End of question 98

  { // Question 99
    id: 'day3-q099', // Unique question ID
    hindi: 'ताज़ी हवा लो।', // Hindi: Get some fresh air
    english: 'Get some fresh air.', // Primary English answer
    alternatives: ['Go outside for fresh air.', 'Take a breath of fresh air.', 'Step outside for air.'], // Alternatives
    hint: 'ताज़ी हवा = fresh air. लो = get/take. "Get some fresh air."', // Hint
    explanation: '"Get some fresh air" means to go outside and breathe in clean, outdoor air. "Get" is the base verb, "some fresh air" is the object phrase. Used when someone feels stuffy indoors or needs a break from a screen.', // Explanation
    difficulty: 'medium', // Medium — idiomatic
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Determiner + Adjective + Object', // Grammar rule
    tags: ['command', 'fresh', 'air', 'outside', 'health', 'idiomatic'], // Tags
    usageNote: 'Used when someone needs a mental or physical break from indoors.', // Usage
    relatedSentences: ['Go for a walk.', 'Step outside.', 'Take a break.'], // Related
  }, // End of question 99

  { // Question 100
    id: 'day3-q100', // Unique question ID
    hindi: 'सकारात्मक सोचो।', // Hindi: Think positively
    english: 'Think positively.', // Primary English answer
    alternatives: ['Be positive.', 'Think positive.', 'Stay positive.', 'Have a positive mindset.'], // Alternatives
    hint: 'सकारात्मक = positive. सोचो = think. "Think positively."', // Hint
    explanation: '"Think positively" — "think" is the base verb, "positively" is the adverb of manner. "Think positive" (without -ly) is also used in informal speech as an adjective. Both are acceptable. "Be positive" and "Stay positive" are common alternatives.', // Explanation
    difficulty: 'medium', // Medium
    category: 'basic-commands', // Category
    grammarRule: 'Positive Imperative: Base Verb + Adverb of Manner', // Grammar rule
    tags: ['command', 'think', 'positive', 'motivation', 'mindset'], // Tags
    usageNote: 'Used for motivational and encouraging messages.', // Usage
    relatedSentences: ['Be confident.', 'Stay motivated.', 'Believe in yourself.'], // Related
  }, // End of question 100

  // ====================================================================
  // SECTION 2: POLITE REQUESTS — Questions 101 to 200
  // These use "Please + Base Verb" to make requests sound polite
  // Hindi has "कृपया" (krpaya) or tone of voice to show politeness
  // "Please" can go at the START or END of the sentence
  // Examples: "Please sit down." / "Sit down, please."
  // ====================================================================

  { // Question 101
    id: 'day3-q101', // Unique question ID
    hindi: 'कृपया बैठ जाइए।', // Hindi: Please sit down (formal/polite form)
    english: 'Please sit down.', // Primary English answer
    alternatives: ['Please have a seat.', 'Please be seated.', 'Sit down, please.', 'Please take a seat.'], // Alternatives
    hint: 'कृपया = please. बैठ जाइए = sit down (polite/formal form in Hindi).', // Hint
    explanation: '"Please sit down" — "Please" is added before the imperative to make it polite. Hindi uses "कृपया" for formal requests. "Please have a seat" and "Please be seated" are even more formal and are used in business and formal settings.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb', // Grammar rule
    tags: ['polite', 'please', 'sit', 'formal', 'request'], // Tags
    usageNote: 'Used in formal settings to politely invite someone to sit.', // Usage
    relatedSentences: ['Please stand up.', 'Please be comfortable.', 'Please come in.'], // Related
  }, // End of question 101

  { // Question 102
    id: 'day3-q102', // Unique question ID
    hindi: 'कृपया यहाँ आइए।', // Hindi: Please come here (formal)
    english: 'Please come here.', // Primary English answer
    alternatives: ['Please come over here.', 'Come here, please.', 'Would you please come here?'], // Alternatives
    hint: 'कृपया = please. यहाँ आइए = come here (formal/polite Hindi form).', // Hint
    explanation: '"Please come here" — adding "please" transforms the command "Come here" into a polite request. The grammar is the same but the tone is much softer. "Would you please come here?" is even more formal (question form).', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb', // Grammar rule
    tags: ['polite', 'please', 'come', 'here', 'request'], // Tags
    usageNote: 'Used when calling someone to you in a polite manner.', // Usage
    relatedSentences: ['Please go there.', 'Please follow me.', 'Please come in.'], // Related
  }, // End of question 102

  { // Question 103
    id: 'day3-q103', // Unique question ID
    hindi: 'कृपया पानी लाइए।', // Hindi: Please bring water
    english: 'Please bring water.', // Primary English answer
    alternatives: ['Please bring some water.', 'Bring water, please.', 'Could you bring some water?'], // Alternatives
    hint: 'लाना = to bring. कृपया = please. "Please bring water."', // Hint
    explanation: '"Please bring water" — "bring" is the base verb, "water" is the object. "Please" makes it polite. "Please bring some water" — adding "some" makes it even more natural. This is different from "fetch water" which is more formal.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'bring', 'water', 'request'], // Tags
    usageNote: 'Used when asking a waiter, servant, or family member to bring water.', // Usage
    relatedSentences: ['Please bring food.', 'Please get the tea.', 'Please serve water.'], // Related
  }, // End of question 103

  { // Question 104
    id: 'day3-q104', // Unique question ID
    hindi: 'कृपया रुकिए।', // Hindi: Please wait / Please stop
    english: 'Please wait.', // Primary English answer
    alternatives: ['Please hold on.', 'Wait a moment, please.', 'Please be patient.', 'Please wait a while.'], // Alternatives
    hint: 'रुकिए = wait/stop (polite form). कृपया = please. "Please wait."', // Hint
    explanation: '"Please wait" is one of the most frequently used polite commands in customer service, offices, and everyday interactions. "Please hold on" is used especially when on the phone. "Please be patient" emphasizes the attitude expected while waiting.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb', // Grammar rule
    tags: ['polite', 'please', 'wait', 'patience', 'customer-service'], // Tags
    usageNote: 'Very common in offices, customer service, and telephone conversations.', // Usage
    relatedSentences: ['Please come in.', 'Please have a seat.', 'Please be patient.'], // Related
  }, // End of question 104

  { // Question 105
    id: 'day3-q105', // Unique question ID
    hindi: 'कृपया दरवाज़ा खोलिए।', // Hindi: Please open the door (formal)
    english: 'Please open the door.', // Primary English answer
    alternatives: ['Open the door, please.', 'Could you open the door?', 'Would you please open the door?'], // Alternatives
    hint: 'खोलिए = open (formal/polite Hindi form). "Please open the door."', // Hint
    explanation: '"Please open the door" — same as "Open the door" but with "please" to show politeness. In professional or formal situations, the question forms "Could you..." or "Would you..." are even more polite than the imperative with "please."', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'open', 'door', 'request'], // Tags
    usageNote: 'Used when you need someone to open the door for you politely.', // Usage
    relatedSentences: ['Please close the door.', 'Please lock the door.', 'Please let me in.'], // Related
  }, // End of question 105

  { // Question 106
    id: 'day3-q106', // Unique question ID
    hindi: 'कृपया मेरी मदद कीजिए।', // Hindi: Please help me (very formal/respectful)
    english: 'Please help me.', // Primary English answer
    alternatives: ['Please assist me.', 'Help me, please.', 'Could you please help me?', 'Please lend me a hand.'], // Alternatives
    hint: 'कीजिए = do/please do (very formal/respectful Hindi form). "Please help me."', // Hint
    explanation: '"Please help me" combines "please" with the request "help me." "Please lend me a hand" is a more idiomatic expression. "Could you please help me?" turns it into a question which is even more polite.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object Pronoun', // Grammar rule
    tags: ['polite', 'please', 'help', 'me', 'request'], // Tags
    usageNote: 'Used in formal situations when you need someone\'s assistance.', // Usage
    relatedSentences: ['Please guide me.', 'Please assist me.', 'Please support me.'], // Related
  }, // End of question 106

  { // Question 107
    id: 'day3-q107', // Unique question ID
    hindi: 'कृपया धीरे बोलिए।', // Hindi: Please speak slowly
    english: 'Please speak slowly.', // Primary English answer
    alternatives: ['Speak slowly, please.', 'Please talk slowly.', 'Please speak more slowly.'], // Alternatives
    hint: 'धीरे = slowly. बोलिए = speak (polite). "Please speak slowly."', // Hint
    explanation: '"Please speak slowly" — essential for English learners! Use this when someone is speaking too fast for you to understand. "Please speak more slowly" adds "more" to emphasize that you need them to slow down even more.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb', // Grammar rule
    tags: ['polite', 'please', 'speak', 'slowly', 'language-learning'], // Tags
    usageNote: 'Very useful for English learners when talking with native speakers.', // Usage
    relatedSentences: ['Please repeat that.', 'Please say that again.', 'Please explain.'], // Related
  }, // End of question 107

  { // Question 108
    id: 'day3-q108', // Unique question ID
    hindi: 'कृपया फिर से बोलिए।', // Hindi: Please say it again / Please repeat
    english: 'Please say that again.', // Primary English answer
    alternatives: ['Please repeat.', 'Could you repeat that?', 'Please say it again.', 'Pardon?'], // Alternatives
    hint: 'फिर से = again. बोलिए = say/speak. "Please say that again."', // Hint
    explanation: '"Please say that again" — very useful for learners who didn\'t catch something. "Pardon?" or "Pardon me?" is a very British way of asking to repeat. "Could you repeat that?" is a question form that is more formal and very polite.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Pronoun + Adverb', // Grammar rule
    tags: ['polite', 'please', 'repeat', 'again', 'language-learning'], // Tags
    usageNote: 'Use this whenever you did not hear or understand something in English.', // Usage
    relatedSentences: ['Please speak slowly.', 'Could you clarify?', 'I did not understand.'], // Related
  }, // End of question 108

  { // Question 109
    id: 'day3-q109', // Unique question ID
    hindi: 'कृपया समझाइए।', // Hindi: Please explain
    english: 'Please explain.', // Primary English answer
    alternatives: ['Please explain it.', 'Could you explain?', 'Please clarify.', 'Please tell me more.'], // Alternatives
    hint: 'समझाइए = please explain (polite/formal Hindi). "Please explain."', // Hint
    explanation: '"Please explain" is a request for clarification or more detailed information. "Please clarify" means to make something clearer. "Please tell me more" asks for additional information. All are polite ways to seek explanation.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb', // Grammar rule
    tags: ['polite', 'please', 'explain', 'clarify', 'learning'], // Tags
    usageNote: 'Used when you need a teacher, colleague, or expert to explain something.', // Usage
    relatedSentences: ['Please speak slowly.', 'Please give an example.', 'Please elaborate.'], // Related
  }, // End of question 109

  { // Question 110
    id: 'day3-q110', // Unique question ID
    hindi: 'कृपया एक उदाहरण दीजिए।', // Hindi: Please give an example
    english: 'Please give an example.', // Primary English answer
    alternatives: ['Could you give an example?', 'Please provide an example.', 'Give me an example, please.'], // Alternatives
    hint: 'उदाहरण = example. दीजिए = give (polite). "Please give an example."', // Hint
    explanation: '"Please give an example" — "give" is the base verb, "an example" is the object (with the indefinite article "an" because "example" starts with a vowel sound). This is essential in classrooms and presentations.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Article + Object', // Grammar rule
    tags: ['polite', 'please', 'example', 'explain', 'classroom'], // Tags
    usageNote: 'Students use this to ask teachers for examples during lessons.', // Usage
    relatedSentences: ['Please explain.', 'Please give details.', 'Please demonstrate.'], // Related
  }, // End of question 110

  { // Question 111
    id: 'day3-q111', // Unique question ID
    hindi: 'कृपया दरवाज़ा बंद कीजिए।', // Hindi: Please close the door (formal)
    english: 'Please close the door.', // Primary English answer
    alternatives: ['Close the door, please.', 'Please shut the door.', 'Would you close the door?'], // Alternatives
    hint: 'बंद कीजिए = please close (very polite/formal Hindi). "Please close the door."', // Hint
    explanation: '"Please close the door" is used in formal and informal situations. In formal settings (offices, meetings), you might add "Could you please close the door?" to make it even more respectful and less of a direct command.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'close', 'door', 'formal'], // Tags
    usageNote: 'Used in offices and formal meetings when the door needs to be closed.', // Usage
    relatedSentences: ['Please open the door.', 'Please lock the door.', 'Please come in.'], // Related
  }, // End of question 111

  { // Question 112
    id: 'day3-q112', // Unique question ID
    hindi: 'कृपया अपना नाम बताइए।', // Hindi: Please tell me your name
    english: 'Please tell me your name.', // Primary English answer
    alternatives: ['May I know your name?', 'What is your name, please?', 'Please share your name.'], // Alternatives
    hint: 'नाम बताइए = tell your name (polite). "Please tell me your name."', // Hint
    explanation: '"Please tell me your name" — "tell" is the base verb, "me" is the indirect object, "your name" is the direct object. "May I know your name?" is a question form that is very formal and respectful for introductions.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Indirect + Direct Object', // Grammar rule
    tags: ['polite', 'please', 'tell', 'name', 'introduction', 'formal'], // Tags
    usageNote: 'Used when meeting someone for the first time in a formal setting.', // Usage
    relatedSentences: ['Please introduce yourself.', 'Please tell me about yourself.', 'May I ask your name?'], // Related
  }, // End of question 112

  { // Question 113
    id: 'day3-q113', // Unique question ID
    hindi: 'कृपया अंदर आइए।', // Hindi: Please come in (polite)
    english: 'Please come in.', // Primary English answer
    alternatives: ['Do come in, please.', 'Come in, please.', 'Please enter.'], // Alternatives
    hint: 'अंदर आइए = please come in (polite form). "Please come in."', // Hint
    explanation: '"Please come in" — adding "please" to "come in" makes the invitation to enter much warmer and more welcoming. "Do come in" adds extra emphasis and warmth. Very common in homes, offices, and professional settings.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb', // Grammar rule
    tags: ['polite', 'please', 'come', 'in', 'welcome', 'invitation'], // Tags
    usageNote: 'Said after someone knocks to warmly invite them to enter.', // Usage
    relatedSentences: ['Please have a seat.', 'Please make yourself comfortable.', 'Please go ahead.'], // Related
  }, // End of question 113

  { // Question 114
    id: 'day3-q114', // Unique question ID
    hindi: 'कृपया शांत रहिए।', // Hindi: Please be quiet / Please remain calm (formal)
    english: 'Please be quiet.', // Primary English answer
    alternatives: ['Please keep quiet.', 'Please be calm.', 'Quiet, please.', 'Silence, please.'], // Alternatives
    hint: 'शांत रहिए = please be quiet/calm (formal). "Please be quiet."', // Hint
    explanation: '"Please be quiet" is a polite way to ask someone to stop making noise. Much softer than "Be quiet!" or "Shut up!" "Quiet, please" is used as a sign in libraries and cinemas. "Silence, please" is used in courtrooms.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Be + Adjective', // Grammar rule
    tags: ['polite', 'please', 'quiet', 'calm', 'library', 'formal'], // Tags
    usageNote: 'Used in libraries, cinemas, and meetings to request silence.', // Usage
    relatedSentences: ['Please speak softly.', 'Quiet please.', 'Please listen.'], // Related
  }, // End of question 114

  { // Question 115
    id: 'day3-q115', // Unique question ID
    hindi: 'कृपया यहाँ हस्ताक्षर कीजिए।', // Hindi: Please sign here
    english: 'Please sign here.', // Primary English answer
    alternatives: ['Please sign this.', 'Sign here, please.', 'Please put your signature here.'], // Alternatives
    hint: 'हस्ताक्षर करना = to sign. यहाँ = here. "Please sign here."', // Hint
    explanation: '"Please sign here" is used in offices, banks, legal documents, and courier deliveries. "Sign" is the base verb, "here" is the adverb of place. A common instruction from bank officials, receptionists, and delivery personnel.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb of Place', // Grammar rule
    tags: ['polite', 'please', 'sign', 'here', 'office', 'bank', 'formal'], // Tags
    usageNote: 'Used in banks, offices, and when receiving deliveries.', // Usage
    relatedSentences: ['Please fill out this form.', 'Please initial here.', 'Please print your name.'], // Related
  }, // End of question 115

  { // Question 116
    id: 'day3-q116', // Unique question ID
    hindi: 'कृपया यह फॉर्म भरिए।', // Hindi: Please fill out this form
    english: 'Please fill out this form.', // Primary English answer
    alternatives: ['Please complete this form.', 'Fill out the form, please.', 'Please fill in this form.'], // Alternatives
    hint: 'फॉर्म भरना = to fill out a form. "Fill out" or "fill in" = complete a form.', // Hint
    explanation: '"Please fill out this form" — "fill out" is the phrasal verb meaning to complete a form. American English uses "fill out." British English often uses "fill in." Both are correct. Common at hospitals, schools, and government offices.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Phrasal Verb + Demonstrative + Object', // Grammar rule
    tags: ['polite', 'please', 'fill', 'form', 'office', 'hospital'], // Tags
    usageNote: 'Used in hospitals, banks, schools, and government offices.', // Usage
    relatedSentences: ['Please sign here.', 'Please write your details.', 'Please complete the application.'], // Related
  }, // End of question 116

  { // Question 117
    id: 'day3-q117', // Unique question ID
    hindi: 'कृपया अपनी राय बताइए।', // Hindi: Please share your opinion / Please tell me your opinion
    english: 'Please share your opinion.', // Primary English answer
    alternatives: ['Please tell me your opinion.', 'Please give your view.', 'Please let me know what you think.'], // Alternatives
    hint: 'राय = opinion. बताइए = please tell. "Please share your opinion."', // Hint
    explanation: '"Please share your opinion" — used in meetings, discussions, and classroom debates. "Share" as a verb means to express or communicate. "Give your view" — "view" is also used for opinion. Both are formal and polite.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Possessive + Object', // Grammar rule
    tags: ['polite', 'please', 'opinion', 'share', 'meeting', 'discussion'], // Tags
    usageNote: 'Used in meetings and discussions to invite someone\'s perspective.', // Usage
    relatedSentences: ['Please speak your mind.', 'Please contribute.', 'Please give feedback.'], // Related
  }, // End of question 117

  { // Question 118
    id: 'day3-q118', // Unique question ID
    hindi: 'कृपया खिड़की बंद कीजिए।', // Hindi: Please close the window (formal)
    english: 'Please close the window.', // Primary English answer
    alternatives: ['Close the window, please.', 'Please shut the window.', 'Would you close the window?'], // Alternatives
    hint: 'खिड़की = window. बंद कीजिए = please close (formal). "Please close the window."', // Hint
    explanation: '"Please close the window" — simple polite request. In very formal situations or when asking a stranger, "Would you mind closing the window?" is more appropriate as it gives the person the option to decline.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'close', 'window', 'request'], // Tags
    usageNote: 'Used when it is cold, raining, or noisy outside.', // Usage
    relatedSentences: ['Please open the window.', 'Please close the door.', 'Please turn on the AC.'], // Related
  }, // End of question 118

  { // Question 119
    id: 'day3-q119', // Unique question ID
    hindi: 'कृपया सड़क पार करने में मेरी मदद करें।', // Hindi: Please help me cross the road
    english: 'Please help me cross the road.', // Primary English answer
    alternatives: ['Help me cross the road, please.', 'Please assist me in crossing the road.', 'Could you help me cross the road?'], // Alternatives
    hint: 'सड़क पार करना = to cross the road. "Please help me cross the road."', // Hint
    explanation: '"Please help me cross the road" — uses the causative structure "help me + base verb (cross)." After "help me," we use the base form "cross" (without "to"). The structure is: Help + object + base verb (not infinitive).', // Explanation
    difficulty: 'medium', // Medium — causative structure
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Help + Object + Base Verb (Causative)', // Grammar rule
    tags: ['polite', 'please', 'help', 'cross', 'road', 'causative'], // Tags
    usageNote: 'Grammar note: "Help me cross" (correct) NOT "Help me to cross" (less natural).', // Usage
    relatedSentences: ['Please help me carry this.', 'Please help me find the way.', 'Please guide me.'], // Related
  }, // End of question 119

  { // Question 120
    id: 'day3-q120', // Unique question ID
    hindi: 'कृपया थोड़ा और जोर से बोलिए।', // Hindi: Please speak a little louder
    english: 'Please speak a little louder.', // Primary English answer
    alternatives: ['Please speak up.', 'Could you please speak louder?', 'Please raise your voice a little.'], // Alternatives
    hint: 'थोड़ा और जोर से = a little louder. बोलिए = speak. "Please speak a little louder."', // Hint
    explanation: '"Please speak a little louder" — "a little" softens the request (more polite than just "louder"). "Speak up" is a phrasal verb meaning to speak louder. Used when someone is speaking too softly to be heard clearly.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Modifier + Comparative Adjective', // Grammar rule
    tags: ['polite', 'please', 'speak', 'louder', 'volume', 'clarity'], // Tags
    usageNote: 'Used in presentations, phone calls, and meetings when someone is hard to hear.', // Usage
    relatedSentences: ['Please speak clearly.', 'Please speak slowly.', 'Please repeat.'], // Related
  }, // End of question 120

  { // Question 121
    id: 'day3-q121', // Unique question ID
    hindi: 'कृपया मुझे माफ़ कीजिए।', // Hindi: Please forgive me (formal)
    english: 'Please forgive me.', // Primary English answer
    alternatives: ['Please pardon me.', 'I beg your forgiveness.', 'Please excuse me.'], // Alternatives
    hint: 'माफ़ करना = to forgive. कृपया = please. "Please forgive me."', // Hint
    explanation: '"Please forgive me" — a sincere, heartfelt apology. More serious than "Please excuse me" (used for minor inconveniences). "I beg your forgiveness" is very formal and old-fashioned but very strong.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object Pronoun', // Grammar rule
    tags: ['polite', 'please', 'forgive', 'apology', 'sorry', 'formal'], // Tags
    usageNote: 'Used for genuine apologies when you have done something wrong.', // Usage
    relatedSentences: ['I am sorry.', 'Please pardon me.', 'Forgive me, please.'], // Related
  }, // End of question 121

  { // Question 122
    id: 'day3-q122', // Unique question ID
    hindi: 'कृपया इंतज़ार कीजिए।', // Hindi: Please wait (formal)
    english: 'Please wait.', // Primary English answer
    alternatives: ['Please hold on.', 'One moment please.', 'Just a moment, please.', 'Please be patient.'], // Alternatives
    hint: 'इंतज़ार करना = to wait. "Please wait" or "One moment, please."', // Hint
    explanation: '"Please wait" — universally understood. "One moment, please" or "Just a moment, please" tells the person how long they need to wait. Very common in customer service calls and office receptions.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb', // Grammar rule
    tags: ['polite', 'please', 'wait', 'patience', 'customer-service'], // Tags
    usageNote: 'Extremely common in customer service, hospitals, and office settings.', // Usage
    relatedSentences: ['Please hold.', 'One moment.', 'Please be seated.'], // Related
  }, // End of question 122

  { // Question 123
    id: 'day3-q123', // Unique question ID
    hindi: 'कृपया रिपोर्ट जमा कीजिए।', // Hindi: Please submit the report
    english: 'Please submit the report.', // Primary English answer
    alternatives: ['Submit the report, please.', 'Please send the report.', 'Please hand in the report.'], // Alternatives
    hint: 'रिपोर्ट जमा करना = to submit the report. "Please submit the report."', // Hint
    explanation: '"Please submit the report" is a professional/office command. "Submit" means to officially give in a document. "Hand in" is also used (especially in academic settings). "Send" is used when submitting electronically.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Article + Object', // Grammar rule
    tags: ['polite', 'please', 'submit', 'report', 'office', 'professional'], // Tags
    usageNote: 'Used in offices, schools, and workplaces for submitting documents.', // Usage
    relatedSentences: ['Please send the email.', 'Please complete the task.', 'Please hand it in.'], // Related
  }, // End of question 123

  { // Question 124
    id: 'day3-q124', // Unique question ID
    hindi: 'कृपया ध्यान से सुनिए।', // Hindi: Please listen carefully
    english: 'Please listen carefully.', // Primary English answer
    alternatives: ['Listen carefully, please.', 'Please pay attention.', 'Please listen attentively.'], // Alternatives
    hint: 'ध्यान से = carefully. सुनिए = listen (polite). "Please listen carefully."', // Hint
    explanation: '"Please listen carefully" is a common request from teachers, trainers, and speakers. "Carefully" is the adverb of manner. "Attentively" is a more formal adverb with the same meaning.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb', // Grammar rule
    tags: ['polite', 'please', 'listen', 'carefully', 'attention'], // Tags
    usageNote: 'Used by speakers and teachers before delivering important information.', // Usage
    relatedSentences: ['Please pay attention.', 'Please focus.', 'Please be attentive.'], // Related
  }, // End of question 124

  { // Question 125
    id: 'day3-q125', // Unique question ID
    hindi: 'कृपया नमस्ते कहिए।', // Hindi: Please say hello / Say namaste please
    english: 'Please say hello.', // Primary English answer
    alternatives: ['Say hello, please.', 'Please greet them.', 'Please say namaste.'], // Alternatives
    hint: 'नमस्ते कहना = to say hello/namaste. "Please say hello."', // Hint
    explanation: '"Please say hello" — "say" is the base verb, "hello" is the object (a greeting). Used when introducing someone, teaching children manners, or asking someone to greet another person.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'say', 'hello', 'greeting', 'manners'], // Tags
    usageNote: 'Used when introducing children to adults and teaching social manners.', // Usage
    relatedSentences: ['Please greet.', 'Please say thank you.', 'Please say goodbye.'], // Related
  }, // End of question 125

  { // Question 126
    id: 'day3-q126', // Unique question ID
    hindi: 'कृपया दरवाज़ा खटखटाएँ।', // Hindi: Please knock on the door
    english: 'Please knock on the door.', // Primary English answer
    alternatives: ['Knock on the door, please.', 'Please knock first.', 'Please knock before entering.'], // Alternatives
    hint: 'खटखटाना = to knock. दरवाज़ा = door. "Please knock on the door."', // Hint
    explanation: '"Please knock on the door" — "knock on" is a phrasal verb meaning to tap on a door with your knuckles. "Please knock before entering" adds the context of WHEN to knock. Very important in offices and private spaces.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Phrasal Verb + Article + Object', // Grammar rule
    tags: ['polite', 'please', 'knock', 'door', 'manners', 'privacy'], // Tags
    usageNote: 'Used to remind people to knock before entering a room.', // Usage
    relatedSentences: ['Please ask for permission.', 'Please wait outside.', 'Please ring the bell.'], // Related
  }, // End of question 126

  { // Question 127
    id: 'day3-q127', // Unique question ID
    hindi: 'कृपया एक गिलास पानी लाइए।', // Hindi: Please bring a glass of water
    english: 'Please bring a glass of water.', // Primary English answer
    alternatives: ['Could you bring a glass of water?', 'Please get me a glass of water.', 'A glass of water, please.'], // Alternatives
    hint: 'एक गिलास पानी = a glass of water. लाइए = bring (polite). "Please bring a glass of water."', // Hint
    explanation: '"Please bring a glass of water" — this is a complete polite request with details. "A glass of water" specifies HOW MUCH water. Compare with just "Please bring water." The more specific version is more natural in a restaurant or formal setting.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Article + Noun Phrase', // Grammar rule
    tags: ['polite', 'please', 'bring', 'water', 'glass', 'restaurant'], // Tags
    usageNote: 'Very natural in restaurants, homes, and offices when requesting water.', // Usage
    relatedSentences: ['Please bring the menu.', 'Please serve tea.', 'Please bring a chair.'], // Related
  }, // End of question 127

  { // Question 128
    id: 'day3-q128', // Unique question ID
    hindi: 'कृपया इसे दोबारा पढ़िए।', // Hindi: Please read this again
    english: 'Please read this again.', // Primary English answer
    alternatives: ['Please re-read this.', 'Read this again, please.', 'Please read it once more.'], // Alternatives
    hint: 'दोबारा = again/once more. पढ़िए = read (polite). "Please read this again."', // Hint
    explanation: '"Please read this again" — "again" is an adverb of frequency/repetition. "Once more" is another way to say the same. "Please re-read this" uses the prefix "re-" to indicate reading again.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Demonstrative + Adverb', // Grammar rule
    tags: ['polite', 'please', 'read', 'again', 'repeat', 'school'], // Tags
    usageNote: 'Used in classrooms and during proofreading.', // Usage
    relatedSentences: ['Please say that again.', 'Please repeat.', 'Please re-read.'], // Related
  }, // End of question 128

  { // Question 129
    id: 'day3-q129', // Unique question ID
    hindi: 'कृपया सुबह पाँच बजे मुझे जगाइए।', // Hindi: Please wake me up at 5 AM
    english: 'Please wake me up at 5 AM.', // Primary English answer
    alternatives: ['Wake me up at 5 in the morning, please.', 'Please call me at 5 AM.', 'Please set an alarm for 5 AM.'], // Alternatives
    hint: 'जगाना = to wake someone up. "Wake up" = phrasal verb. "Please wake me up at 5 AM."', // Hint
    explanation: '"Please wake me up at 5 AM" — "wake up" is a phrasal verb. When there is a pronoun object (me), it goes BETWEEN the verb and the particle: "wake me up" NOT "wake up me." This is called a separable phrasal verb.', // Explanation
    difficulty: 'medium', // Medium — separable phrasal verb
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Separable Phrasal Verb with Pronoun', // Grammar rule
    tags: ['polite', 'please', 'wake', 'up', 'morning', 'phrasal-verb'], // Tags
    usageNote: 'Grammar note: "Wake me up" (correct) NOT "Wake up me" (incorrect).', // Usage
    relatedSentences: ['Please set the alarm.', 'Please call me early.', 'Please remind me.'], // Related
  }, // End of question 129

  { // Question 130
    id: 'day3-q130', // Unique question ID
    hindi: 'कृपया अपना परिचय दीजिए।', // Hindi: Please introduce yourself (formal)
    english: 'Please introduce yourself.', // Primary English answer
    alternatives: ['Please tell us about yourself.', 'Please say a few words about yourself.', 'Please give us your introduction.'], // Alternatives
    hint: 'परिचय देना = to introduce. दीजिए = please give (very formal). "Please introduce yourself."', // Hint
    explanation: '"Please introduce yourself" — common in interviews, new classes, and business meetings. The reflexive pronoun "yourself" is the object. "Please tell us about yourself" is a broader, open-ended request used in interviews.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Reflexive Pronoun', // Grammar rule
    tags: ['polite', 'please', 'introduce', 'yourself', 'interview', 'meeting'], // Tags
    usageNote: 'Very common at the start of interviews, new classes, and meetings.', // Usage
    relatedSentences: ['Please tell me your name.', 'Please share your experience.', 'Please sit.'], // Related
  }, // End of question 130

  { // Question 131
    id: 'day3-q131', // Unique question ID
    hindi: 'कृपया थोड़ा धैर्य रखिए।', // Hindi: Please be a little patient
    english: 'Please be patient.', // Primary English answer
    alternatives: ['Please have patience.', 'Be patient, please.', 'Please wait a little longer.'], // Alternatives
    hint: 'धैर्य = patience. रखिए = have/keep (polite). "Please be patient."', // Hint
    explanation: '"Please be patient" — "be" is the imperative of the verb "be," "patient" is the adjective. This is a request for someone to wait calmly without getting frustrated. Common in customer service and when queuing.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Be + Adjective', // Grammar rule
    tags: ['polite', 'please', 'be', 'patient', 'wait', 'customer-service'], // Tags
    usageNote: 'Used when someone is getting impatient or frustrated while waiting.', // Usage
    relatedSentences: ['Please wait.', 'Please be calm.', 'Please be understanding.'], // Related
  }, // End of question 131

  { // Question 132
    id: 'day3-q132', // Unique question ID
    hindi: 'कृपया एक पल रुकिए।', // Hindi: Please wait a moment
    english: 'Please wait a moment.', // Primary English answer
    alternatives: ['One moment, please.', 'Just a minute, please.', 'Please hold on a moment.'], // Alternatives
    hint: 'एक पल = a moment/one moment. रुकिए = wait (polite). "Please wait a moment."', // Hint
    explanation: '"Please wait a moment" — "a moment" tells the person approximately how long to wait (a short time). "One moment, please" is commonly said on the phone. "Just a minute" gives one minute as the expected wait time.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Article + Noun Phrase', // Grammar rule
    tags: ['polite', 'please', 'wait', 'moment', 'time', 'phone'], // Tags
    usageNote: 'Very common on phone calls and in service situations.', // Usage
    relatedSentences: ['Please hold.', 'One moment.', 'Please be patient.'], // Related
  }, // End of question 132

  { // Question 133
    id: 'day3-q133', // Unique question ID
    hindi: 'कृपया यहाँ खड़े होइए।', // Hindi: Please stand here
    english: 'Please stand here.', // Primary English answer
    alternatives: ['Stand here, please.', 'Please wait here.', 'Please remain here.'], // Alternatives
    hint: 'यहाँ = here. खड़े होइए = stand (polite). "Please stand here."', // Hint
    explanation: '"Please stand here" — gives a polite instruction about WHERE to stand. Used at security checkpoints, photo shoots, and official proceedings. More respectful than just "Stand here!"', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb of Place', // Grammar rule
    tags: ['polite', 'please', 'stand', 'here', 'position', 'formal'], // Tags
    usageNote: 'Used at security checkpoints, photo shoots, and official venues.', // Usage
    relatedSentences: ['Please sit here.', 'Please wait here.', 'Please step aside.'], // Related
  }, // End of question 133

  { // Question 134
    id: 'day3-q134', // Unique question ID
    hindi: 'कृपया ताज़ा पानी लाइए।', // Hindi: Please bring fresh water
    english: 'Please bring fresh water.', // Primary English answer
    alternatives: ['Please get fresh water.', 'Bring fresh water, please.', 'Please fetch some cold water.'], // Alternatives
    hint: 'ताज़ा = fresh. पानी = water. लाइए = bring (polite). "Please bring fresh water."', // Hint
    explanation: '"Please bring fresh water" — "fresh" is an adjective describing the type of water. Adding descriptive adjectives before the object makes requests more specific and natural. Common in restaurants and homes.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adjective + Object', // Grammar rule
    tags: ['polite', 'please', 'bring', 'fresh', 'water', 'restaurant'], // Tags
    usageNote: 'Used in restaurants and homes when requesting fresh drinking water.', // Usage
    relatedSentences: ['Please bring cold water.', 'Please serve warm tea.', 'Please get a cold drink.'], // Related
  }, // End of question 134

  { // Question 135
    id: 'day3-q135', // Unique question ID
    hindi: 'कृपया मुझे रास्ता बताइए।', // Hindi: Please show me the way / Please tell me the direction
    english: 'Please show me the way.', // Primary English answer
    alternatives: ['Please tell me the way.', 'Please guide me.', 'Please direct me.', 'Can you show me the way?'], // Alternatives
    hint: 'रास्ता = way/direction. बताइए = show/tell (polite). "Please show me the way."', // Hint
    explanation: '"Please show me the way" — "show" is the base verb, "me" is the indirect object, "the way" is the direct object. "Guide me" means to lead someone along the way. "Direct me" means to give directions.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Indirect + Direct Object', // Grammar rule
    tags: ['polite', 'please', 'show', 'way', 'direction', 'guide'], // Tags
    usageNote: 'Used when you are lost or need directions to a place.', // Usage
    relatedSentences: ['Please guide me.', 'Please tell me where it is.', 'Please help me find it.'], // Related
  }, // End of question 135

  { // Question 136
    id: 'day3-q136', // Unique question ID
    hindi: 'कृपया मेरे लिए खाना लाइए।', // Hindi: Please bring food for me
    english: 'Please bring food for me.', // Primary English answer
    alternatives: ['Please get me some food.', 'Please serve my food.', 'Bring food for me, please.'], // Alternatives
    hint: 'मेरे लिए = for me. खाना लाना = to bring food. "Please bring food for me."', // Hint
    explanation: '"Please bring food for me" — "for me" shows the beneficiary of the action. "Please get me some food" is more informal and natural in everyday speech. Both are correct.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object + Prepositional Phrase', // Grammar rule
    tags: ['polite', 'please', 'bring', 'food', 'meal', 'restaurant'], // Tags
    usageNote: 'Used in restaurants or when asking someone to serve you food.', // Usage
    relatedSentences: ['Please serve the food.', 'Please bring the order.', 'Please get me some water.'], // Related
  }, // End of question 136

  { // Question 137
    id: 'day3-q137', // Unique question ID
    hindi: 'कृपया दवाई समय पर लीजिए।', // Hindi: Please take medicine on time
    english: 'Please take your medicine on time.', // Primary English answer
    alternatives: ['Take your medicine on time, please.', 'Please take your medication regularly.', 'Please do not forget your medicine.'], // Alternatives
    hint: 'दवाई = medicine. समय पर = on time. "Please take your medicine on time."', // Hint
    explanation: '"Please take your medicine on time" — a caring request or advice. "On time" means at the scheduled or correct time. Adding "your" makes it personal and warm. Used by doctors, nurses, and family members.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Possessive + Object + Adverb Phrase', // Grammar rule
    tags: ['polite', 'please', 'medicine', 'time', 'health', 'care'], // Tags
    usageNote: 'Doctors and caring family members say this to remind patients.', // Usage
    relatedSentences: ['Please drink water.', 'Please rest.', 'Please see the doctor.'], // Related
  }, // End of question 137

  { // Question 138
    id: 'day3-q138', // Unique question ID
    hindi: 'कृपया बिल दिखाइए।', // Hindi: Please show the bill
    english: 'Please show the bill.', // Primary English answer
    alternatives: ['Please show me the bill.', 'Could I see the bill?', 'Please bring the bill.', 'Check, please.'], // Alternatives
    hint: 'बिल = bill. दिखाइए = show (polite). "Please show the bill."', // Hint
    explanation: '"Please show the bill" — in a restaurant or shop. In American English, you can say "Check, please" to ask for the bill. "Bill" (British/Indian English) and "check" (American English) both refer to the invoice at a restaurant.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Article + Object', // Grammar rule
    tags: ['polite', 'please', 'bill', 'restaurant', 'payment', 'shopping'], // Tags
    usageNote: '"Check, please" (American) = "Please bring the bill" (Indian/British).', // Usage
    relatedSentences: ['Please prepare the invoice.', 'What is the total?', 'Please give the receipt.'], // Related
  }, // End of question 138

  { // Question 139
    id: 'day3-q139', // Unique question ID
    hindi: 'कृपया बताइए कि यह कैसे करते हैं।', // Hindi: Please tell me how to do this
    english: 'Please tell me how to do this.', // Primary English answer
    alternatives: ['Could you explain how to do this?', 'Please show me how to do it.', 'Please teach me this.'], // Alternatives
    hint: '"Tell me how to do this" = explain the method/process.', // Hint
    explanation: '"Please tell me how to do this" — "tell" is the base verb, "me" is the indirect object, "how to do this" is the direct object (an infinitive clause). Used when asking for instructions or methods.', // Explanation
    difficulty: 'medium', // Medium — complex structure
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object + Infinitive Clause', // Grammar rule
    tags: ['polite', 'please', 'tell', 'how', 'instructions', 'learning'], // Tags
    usageNote: 'Used when you need step-by-step instructions for something.', // Usage
    relatedSentences: ['Please demonstrate.', 'Please explain the steps.', 'Please guide me.'], // Related
  }, // End of question 139

  { // Question 140
    id: 'day3-q140', // Unique question ID
    hindi: 'कृपया समय पर आइए।', // Hindi: Please come on time
    english: 'Please come on time.', // Primary English answer
    alternatives: ['Please be punctual.', 'Come on time, please.', 'Please do not be late.', 'Please arrive on time.'], // Alternatives
    hint: 'समय पर = on time. आइए = come (polite). "Please come on time."', // Hint
    explanation: '"Please come on time" — "on time" is an adverbial phrase meaning at the correct scheduled time. "Please be punctual" uses an adjective. "Punctual" means habitually arriving on time.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Adverb Phrase', // Grammar rule
    tags: ['polite', 'please', 'come', 'time', 'punctual', 'professional'], // Tags
    usageNote: 'Used in business, school, and social settings regarding punctuality.', // Usage
    relatedSentences: ["Don't be late.", 'Please be on time.', 'Please arrive early.'], // Related
  }, // End of question 140

  { // Question 141
    id: 'day3-q141', // Unique question ID
    hindi: 'कृपया मेरी बात मानिए।', // Hindi: Please listen to me / Please follow my advice
    english: 'Please listen to me.', // Primary English answer
    alternatives: ['Please follow my advice.', 'Please do as I say.', 'Please hear me out.'], // Alternatives
    hint: 'मेरी बात मानना = to listen/obey me. "Please listen to me."', // Hint
    explanation: '"Please listen to me" — requesting someone\'s attention and compliance. "Please hear me out" means to listen to the whole thing before responding. "Please do as I say" is a direct command to follow instructions.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Phrasal Verb + Object Pronoun', // Grammar rule
    tags: ['polite', 'please', 'listen', 'me', 'follow', 'advice'], // Tags
    usageNote: 'Used by parents, doctors, and teachers when giving important advice.', // Usage
    relatedSentences: ['Please pay attention.', 'Please obey.', 'Please follow the rules.'], // Related
  }, // End of question 141

  { // Question 142
    id: 'day3-q142', // Unique question ID
    hindi: 'कृपया इस पर विचार कीजिए।', // Hindi: Please consider this / Please think about this
    english: 'Please consider this.', // Primary English answer
    alternatives: ['Please think about this.', 'Please give this some thought.', 'Please review this.'], // Alternatives
    hint: 'विचार करना = to consider/think. "Please consider this."', // Hint
    explanation: '"Please consider this" — "consider" means to think carefully about something. Used in business, formal discussions, and when suggesting ideas. More formal than "Please think about this."', // Explanation
    difficulty: 'medium', // Medium — formal vocabulary
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Demonstrative', // Grammar rule
    tags: ['polite', 'please', 'consider', 'think', 'business', 'formal'], // Tags
    usageNote: 'Used in formal business discussions and professional proposals.', // Usage
    relatedSentences: ['Please review.', 'Please evaluate.', 'Please look into this.'], // Related
  }, // End of question 142

  { // Question 143
    id: 'day3-q143', // Unique question ID
    hindi: 'कृपया अपनी भाषा का ध्यान रखिए।', // Hindi: Please watch your language
    english: 'Please watch your language.', // Primary English answer
    alternatives: ['Please mind your language.', 'Please use polite language.', 'Please speak respectfully.'], // Alternatives
    hint: 'भाषा का ध्यान रखना = watch your language. "Please watch your language."', // Hint
    explanation: '"Please watch your language" is used when someone is using rude, offensive, or inappropriate language. "Mind your language" has the same meaning. Both are polite ways of telling someone to speak more appropriately.', // Explanation
    difficulty: 'medium', // Medium — idiomatic
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Possessive + Object (Idiomatic)', // Grammar rule
    tags: ['polite', 'please', 'language', 'watch', 'manners', 'respect'], // Tags
    usageNote: 'Used when someone uses offensive or inappropriate words.', // Usage
    relatedSentences: ['Please be respectful.', 'Please speak politely.', "Don't use bad words."], // Related
  }, // End of question 143

  { // Question 144
    id: 'day3-q144', // Unique question ID
    hindi: 'कृपया कम बोलिए और ज़्यादा सुनिए।', // Hindi: Please speak less and listen more
    english: 'Please speak less and listen more.', // Primary English answer
    alternatives: ['Please talk less and listen more.', 'Listen more, speak less.', 'Please be a good listener.'], // Alternatives
    hint: 'कम बोलिए = speak less. ज़्यादा सुनिए = listen more. "Please speak less and listen more."', // Hint
    explanation: '"Please speak less and listen more" combines two polite imperatives with "and." This is advice often given to people who talk too much. "Be a good listener" is a more direct way to give the same advice.', // Explanation
    difficulty: 'medium', // Medium — compound
    category: 'polite-requests', // Category
    grammarRule: 'Polite Compound Imperative: Please + Base Verb + less/more + and + Base Verb + less/more', // Grammar rule
    tags: ['polite', 'please', 'listen', 'speak', 'compound', 'advice'], // Tags
    usageNote: 'Good advice for people who tend to talk too much in conversations.', // Usage
    relatedSentences: ['Please be a good listener.', 'Please pay attention.', 'Please let others speak.'], // Related
  }, // End of question 144

  { // Question 145
    id: 'day3-q145', // Unique question ID
    hindi: 'कृपया मेरे साथ बैठिए।', // Hindi: Please sit with me
    english: 'Please sit with me.', // Primary English answer
    alternatives: ['Please sit beside me.', 'Please join me.', 'Come sit with me, please.'], // Alternatives
    hint: 'मेरे साथ = with me. बैठिए = sit (polite). "Please sit with me."', // Hint
    explanation: '"Please sit with me" — a polite invitation to sit next to the speaker. "Please join me" is a broader invitation meaning "come be with me." Used in social settings, dining, and friendly gatherings.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Prepositional Phrase', // Grammar rule
    tags: ['polite', 'please', 'sit', 'with', 'me', 'social', 'friendly'], // Tags
    usageNote: 'A warm, friendly invitation to accompany someone.', // Usage
    relatedSentences: ['Please join me for lunch.', 'Please come and sit.', 'Please be my guest.'], // Related
  }, // End of question 145

  { // Question 146
    id: 'day3-q146', // Unique question ID
    hindi: 'कृपया अपना मोबाइल साइलेंट करें।', // Hindi: Please put your phone on silent
    english: 'Please put your phone on silent.', // Primary English answer
    alternatives: ['Please silence your phone.', 'Please turn your phone to silent.', 'Please mute your phone.'], // Alternatives
    hint: 'मोबाइल साइलेंट करना = to put on silent/mute the phone. "Please silence your phone."', // Hint
    explanation: '"Please put your phone on silent" — "put on silent" is a common expression. "Silence your phone" is shorter. "Mute your phone" means the same. Common requests in cinemas, hospitals, meeting rooms, and places of worship.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Phrasal Verb + Possessive + Object + Adverb', // Grammar rule
    tags: ['polite', 'please', 'phone', 'silent', 'mute', 'cinema', 'meeting'], // Tags
    usageNote: 'Said in cinemas, hospitals, religious places, and during meetings.', // Usage
    relatedSentences: ['Please turn off your phone.', 'No calls during the meeting.', 'Please be quiet.'], // Related
  }, // End of question 146

  { // Question 147
    id: 'day3-q147', // Unique question ID
    hindi: 'कृपया दरवाज़ा बंद करने के बाद ताला लगाएँ।', // Hindi: Please lock the door after closing it
    english: 'Please lock the door after closing it.', // Primary English answer
    alternatives: ['Please close and lock the door.', 'Please lock the door behind you.', 'Make sure to lock the door.'], // Alternatives
    hint: 'ताला लगाना = to lock. "Please lock the door after closing it."', // Hint
    explanation: '"Please lock the door after closing it" — a two-step instruction. "After closing it" is a temporal clause showing WHEN to lock. "Lock the door behind you" is more idiomatic and means to lock the door as you leave.', // Explanation
    difficulty: 'medium', // Medium — conditional structure
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object + Temporal Clause', // Grammar rule
    tags: ['polite', 'please', 'lock', 'door', 'security', 'instructions'], // Tags
    usageNote: 'Used for home security when leaving the house or going to bed.', // Usage
    relatedSentences: ['Please close the door.', 'Please lock up.', 'Please check the door.'], // Related
  }, // End of question 147

  { // Question 148
    id: 'day3-q148', // Unique question ID
    hindi: 'कृपया अपनी गलती स्वीकार कीजिए।', // Hindi: Please accept your mistake / Please admit your mistake
    english: 'Please accept your mistake.', // Primary English answer
    alternatives: ['Please admit your mistake.', 'Please acknowledge your error.', 'Please own your mistake.'], // Alternatives
    hint: 'गलती स्वीकार करना = to accept/admit a mistake. "Please accept your mistake."', // Hint
    explanation: '"Please accept your mistake" — "accept" means to acknowledge that something you did was wrong. "Admit your mistake" is also correct. "Own your mistake" is a more informal, modern expression meaning to take responsibility.', // Explanation
    difficulty: 'medium', // Medium
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Possessive + Object', // Grammar rule
    tags: ['polite', 'please', 'accept', 'mistake', 'responsibility', 'honesty'], // Tags
    usageNote: 'Used in situations where someone needs to take responsibility for their actions.', // Usage
    relatedSentences: ['Please apologize.', 'Please be honest.', 'Please take responsibility.'], // Related
  }, // End of question 148

  { // Question 149
    id: 'day3-q149', // Unique question ID
    hindi: 'कृपया दूसरों का सम्मान कीजिए।', // Hindi: Please respect others
    english: 'Please respect others.', // Primary English answer
    alternatives: ['Please be respectful to others.', 'Please treat others with respect.', 'Please show respect.'], // Alternatives
    hint: 'दूसरों का सम्मान करना = to respect others. "Please respect others."', // Hint
    explanation: '"Please respect others" — a value-based imperative. "Respect" is the base verb, "others" is the object (pronoun referring to other people). "Treat others with respect" emphasizes HOW to show respect.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Object', // Grammar rule
    tags: ['polite', 'please', 'respect', 'others', 'values', 'manners'], // Tags
    usageNote: 'A fundamental social rule — used in schools and parenting.', // Usage
    relatedSentences: ['Please be kind.', 'Please help others.', 'Please be polite.'], // Related
  }, // End of question 149

  { // Question 150
    id: 'day3-q150', // Unique question ID
    hindi: 'कृपया अपनी बारी का इंतज़ार कीजिए।', // Hindi: Please wait for your turn
    english: 'Please wait for your turn.', // Primary English answer
    alternatives: ['Please wait in line.', 'Please queue up.', 'Please wait your turn.', 'Please stand in line.'], // Alternatives
    hint: 'बारी = turn. इंतज़ार करना = to wait. "Please wait for your turn."', // Hint
    explanation: '"Please wait for your turn" — "for your turn" is a prepositional phrase. "Wait in line" or "Queue up" means to stand in a line and wait. This is an important social command for maintaining order in public places.', // Explanation
    difficulty: 'easy', // Easy
    category: 'polite-requests', // Category
    grammarRule: 'Polite Imperative: Please + Base Verb + Prepositional Phrase', // Grammar rule
    tags: ['polite', 'please', 'wait', 'turn', 'queue', 'order', 'social'], // Tags
    usageNote: 'Used in queues, waiting rooms, and any situation requiring ordered waiting.', // Usage
    relatedSentences: ['Please stand in line.', 'Please queue up.', 'Please be patient.'], // Related
  }, // End of question 150

  // ====================================================================
  // SECTION 3: NEGATIVE COMMANDS — Questions 151 to 300
  // These use "Don't / Do not + Base Verb" for negative imperatives
  // Hindi uses "मत" or "न करो" to express don't
  // "Don't" is informal; "Do not" is more formal/emphatic
  // ====================================================================

  { // Question 151
    id: 'day3-q151', // Unique question ID
    hindi: 'मत दौड़ो।', // Hindi: Don't run
    english: "Don't run.", // Primary English answer
    alternatives: ["Do not run.", 'No running.', "Don't run here."], // Alternatives
    hint: 'मत = don\'t. दौड़ना = to run. "Don\'t run" = negative command.', // Hint
    explanation: '"Don\'t run" is a simple negative imperative. "Don\'t" + base verb. "Do not run" is more formal and often seen on signs. "No running" is used on public signs (especially near swimming pools).', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', "don't", 'run', 'basic', 'safety'], // Tags
    usageNote: 'Used near swimming pools, hospitals, and corridors where running is dangerous.', // Usage
    relatedSentences: ["Don't walk.", 'Stop running.', 'Walk slowly.'], // Related
  }, // End of question 151

  { // Question 152
    id: 'day3-q152', // Unique question ID
    hindi: 'चिल्लाओ मत।', // Hindi: Don't shout / Don't yell
    english: "Don't shout.", // Primary English answer
    alternatives: ["Don't yell.", "Do not shout.", "Don't scream.", 'Lower your voice.'], // Alternatives
    hint: 'चिल्लाना = to shout/yell. मत = don\'t. "Don\'t shout."', // Hint
    explanation: '"Don\'t shout" — "shout" is the base verb. "Yell" and "scream" are synonyms but with different intensities: shout (loud) < yell (very loud) < scream (extremely loud). "Lower your voice" is the positive way to say the same thing.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', "don't", 'shout', 'noise', 'volume', 'manners'], // Tags
    usageNote: 'Used at home, in public places, and in classrooms for noise control.', // Usage
    relatedSentences: ['Speak softly.', "Don't make noise.", 'Keep your voice down.'], // Related
  }, // End of question 152

  { // Question 153
    id: 'day3-q153', // Unique question ID
    hindi: 'धोखा मत दो।', // Hindi: Don't cheat
    english: "Don't cheat.", // Primary English answer
    alternatives: ["Do not cheat.", 'Play fair.', "Don't be dishonest."], // Alternatives
    hint: 'धोखा देना = to cheat/deceive. मत = don\'t. "Don\'t cheat."', // Hint
    explanation: '"Don\'t cheat" is used in exams, games, and relationships. "Play fair" is the positive equivalent meaning to follow the rules honestly. Cheating destroys trust, so this is an important ethical command.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', "don't", 'cheat', 'honest', 'ethics', 'exam'], // Tags
    usageNote: 'Used in exams, competitions, and relationships.', // Usage
    relatedSentences: ['Be honest.', 'Play fair.', "Don't copy."], // Related
  }, // End of question 153

  { // Question 154
    id: 'day3-q154', // Unique question ID
    hindi: 'नकल मत करो।', // Hindi: Don't copy
    english: "Don't copy.", // Primary English answer
    alternatives: ["Don't copy others.", "Do not copy.", 'Write your own answers.', "Don't plagiarize."], // Alternatives
    hint: 'नकल करना = to copy (in an exam). मत = don\'t. "Don\'t copy."', // Hint
    explanation: '"Don\'t copy" is especially used in academic contexts. "Plagiarize" is the formal word for copying someone else\'s work and presenting it as your own. "Write your own answers" is the positive command.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', "don't", 'copy', 'exam', 'academic', 'honesty'], // Tags
    usageNote: 'Used in examinations and academic settings.', // Usage
    relatedSentences: ["Don't cheat.", 'Be original.', 'Write your own work.'], // Related
  }, // End of question 154

  { // Question 155
    id: 'day3-q155', // Unique question ID
    hindi: 'किसी को परेशान मत करो।', // Hindi: Don't bother anyone
    english: "Don't bother anyone.", // Primary English answer
    alternatives: ["Don't disturb others.", "Do not bother anyone.", "Don't trouble others."], // Alternatives
    hint: 'किसी को = anyone. परेशान करना = to bother/disturb. "Don\'t bother anyone."', // Hint
    explanation: '"Don\'t bother anyone" — "anyone" is an indefinite pronoun used in negative sentences. "Disturb" is slightly more formal than "bother." "Trouble" is also a synonym. A common rule in offices and schools.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Indefinite Pronoun", // Grammar rule
    tags: ['negative', "don't", 'bother', 'anyone', 'manners', 'respect'], // Tags
    usageNote: 'Used in offices, classrooms, and libraries.', // Usage
    relatedSentences: ["Don't disturb.", 'Respect others\' space.', "Don't interfere."], // Related
  }, // End of question 155

  { // Question 156
    id: 'day3-q156', // Unique question ID
    hindi: 'पानी बर्बाद मत करो।', // Hindi: Don't waste water
    english: "Don't waste water.", // Primary English answer
    alternatives: ["Do not waste water.", 'Save water.', 'Use water wisely.', "Don't waste natural resources."], // Alternatives
    hint: 'पानी = water. बर्बाद करना = to waste. "Don\'t waste water."', // Hint
    explanation: '"Don\'t waste water" is an important environmental message. "Save water" is the positive equivalent. Very common on water tanks, taps, and in environmental awareness campaigns.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', "don't", 'waste', 'water', 'environment', 'conservation'], // Tags
    usageNote: 'Used in environmental awareness campaigns and on public water sources.', // Usage
    relatedSentences: ['Save water.', "Don't waste electricity.", 'Conserve resources.'], // Related
  }, // End of question 156

  { // Question 157
    id: 'day3-q157', // Unique question ID
    hindi: 'खाना बर्बाद मत करो।', // Hindi: Don't waste food
    english: "Don't waste food.", // Primary English answer
    alternatives: ["Do not waste food.", 'Finish your food.', "Don't throw food away.", 'Eat what you take.'], // Alternatives
    hint: 'खाना = food. बर्बाद करना = to waste. "Don\'t waste food."', // Hint
    explanation: '"Don\'t waste food" — an important value command. "Finish your food" is the positive equivalent. "Eat what you take" emphasizes responsible portioning. These are important life lessons taught to children.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', "don't", 'waste', 'food', 'values', 'environment'], // Tags
    usageNote: 'Taught to children as an important value about appreciating food.', // Usage
    relatedSentences: ['Eat your food.', "Don't waste resources.", 'Be grateful for food.'], // Related
  }, // End of question 157

  { // Question 158
    id: 'day3-q158', // Unique question ID
    hindi: 'किसी से झगड़ा मत करो।', // Hindi: Don't fight with anyone
    english: "Don't fight with anyone.", // Primary English answer
    alternatives: ["Don't argue with anyone.", "Do not fight.", 'Stay peaceful.', 'Keep the peace.'], // Alternatives
    hint: 'झगड़ा करना = to fight/quarrel. किसी से = with anyone. "Don\'t fight with anyone."', // Hint
    explanation: '"Don\'t fight with anyone" — "fight with" means to have a physical or verbal conflict with someone. "Argue" is specifically for verbal fights. "Stay peaceful" is the positive advice. Very common parental instruction.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Prepositional Phrase", // Grammar rule
    tags: ['negative', "don't", 'fight', 'anyone', 'peace', 'manners'], // Tags
    usageNote: 'Parents say this to children going to school or playing with others.', // Usage
    relatedSentences: ['Be peaceful.', "Don't argue.", 'Get along with others.'], // Related
  }, // End of question 158

  { // Question 159
    id: 'day3-q159', // Unique question ID
    hindi: 'बच्चों को तंग मत करो।', // Hindi: Don't tease children / Don't bother the children
    english: "Don't tease the children.", // Primary English answer
    alternatives: ["Don't bother the children.", "Do not tease kids.", "Don't trouble children."], // Alternatives
    hint: 'बच्चों को = the children. तंग करना = to tease/bother. "Don\'t tease the children."', // Hint
    explanation: '"Don\'t tease the children" — "tease" means to make fun of someone or irritate them in a playful or unkind way. "Bother" means to disturb. "Trouble" means the same. All can be used here.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', "don't", 'tease', 'children', 'kindness', 'respect'], // Tags
    usageNote: 'Adults say this to older children or other adults around young children.', // Usage
    relatedSentences: ["Don't hurt others.", 'Be kind to children.', "Don't bully."], // Related
  }, // End of question 159

  { // Question 160
    id: 'day3-q160', // Unique question ID
    hindi: 'सड़क पर मत खेलो।', // Hindi: Don't play on the road
    english: "Don't play on the road.", // Primary English answer
    alternatives: ["Do not play on the road.", "Don't play in the street.", 'Play in the park.'], // Alternatives
    hint: 'सड़क = road. खेलना = to play. "Don\'t play on the road."', // Hint
    explanation: '"Don\'t play on the road" is a safety command. "On the road" is a prepositional phrase of place. "In the street" also means on the road. This is a critical safety instruction for children.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Prepositional Phrase of Place", // Grammar rule
    tags: ['negative', "don't", 'play', 'road', 'safety', 'children'], // Tags
    usageNote: 'A critical safety rule for children — playing on roads is very dangerous.', // Usage
    relatedSentences: ['Play in the park.', "Don't run on the road.", 'Stay on the footpath.'], // Related
  }, // End of question 160

  { // Question 161
    id: 'day3-q161', // Unique question ID
    hindi: 'यहाँ मत थूको।', // Hindi: Don't spit here
    english: "Don't spit here.", // Primary English answer
    alternatives: ["Do not spit here.", 'No spitting.', "Don't spit in public."], // Alternatives
    hint: 'थूकना = to spit. यहाँ = here. "Don\'t spit here."', // Hint
    explanation: '"Don\'t spit here" is a public hygiene sign common in India. "No spitting" is the sign version. "Don\'t spit in public" is a more general rule. Spitting in public is considered unhygienic and rude.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Adverb of Place", // Grammar rule
    tags: ['negative', "don't", 'spit', 'hygiene', 'public', 'sign'], // Tags
    usageNote: 'Common public health sign in Indian cities.', // Usage
    relatedSentences: ["Don't litter.", "Don't dirty the place.", 'Keep it clean.'], // Related
  }, // End of question 161

  { // Question 162
    id: 'day3-q162', // Unique question ID
    hindi: 'लाइन मत तोड़ो।', // Hindi: Don't break the line / Don't jump the queue
    english: "Don't jump the queue.", // Primary English answer
    alternatives: ["Don't cut in line.", "Don't break the line.", 'Wait your turn.', "Don't skip the line."], // Alternatives
    hint: 'लाइन तोड़ना = to jump the queue/cut in line. "Don\'t jump the queue."', // Hint
    explanation: '"Don\'t jump the queue" (British English) = "Don\'t cut in line" (American English) — both mean don\'t push in front of people who are waiting. "Jump the queue" and "cut in line" are idiomatic phrasal verbs.', // Explanation
    difficulty: 'medium', // Medium — idiomatic
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Phrasal Verb + Object (Idiomatic)", // Grammar rule
    tags: ['negative', "don't", 'queue', 'line', 'order', 'manners', 'idiomatic'], // Tags
    usageNote: 'British: "Don\'t jump the queue." American: "Don\'t cut in line."', // Usage
    relatedSentences: ['Wait your turn.', "Don't push.", 'Stand in line.'], // Related
  }, // End of question 162

  { // Question 163
    id: 'day3-q163', // Unique question ID
    hindi: 'मोबाइल पर इतना समय मत बिताओ।', // Hindi: Don't spend so much time on the phone
    english: "Don't spend so much time on your phone.", // Primary English answer
    alternatives: ["Don't waste time on your phone.", "Put down your phone.", "Don't use your phone so much."], // Alternatives
    hint: 'मोबाइल पर = on your phone. इतना समय = so much time. "Don\'t spend so much time..."', // Hint
    explanation: '"Don\'t spend so much time on your phone" is a modern parental command. "So much" intensifies the adjective. "Put down your phone" is a direct command to physically put the phone away right now.', // Explanation
    difficulty: 'medium', // Medium
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Intensifier + Object", // Grammar rule
    tags: ['negative', "don't", 'phone', 'time', 'modern', 'screen'], // Tags
    usageNote: 'Very relevant in the modern digital age — parents say this to children.', // Usage
    relatedSentences: ["Don't watch too much TV.", 'Put your phone down.', 'Read a book instead.'], // Related
  }, // End of question 163

  { // Question 164
    id: 'day3-q164', // Unique question ID
    hindi: 'रात को देर तक मत जागो।', // Hindi: Don't stay up late at night
    english: "Don't stay up late at night.", // Primary English answer
    alternatives: ["Don't stay up late.", 'Go to bed on time.', "Don't sleep late.", 'Sleep early.'], // Alternatives
    hint: 'देर तक जागना = to stay up late. रात को = at night. "Don\'t stay up late at night."', // Hint
    explanation: '"Don\'t stay up late at night" — "stay up late" is a phrasal verb meaning to remain awake past your normal bedtime. This is health advice and a common parental concern. "Sleep early" is the positive alternative.', // Explanation
    difficulty: 'medium', // Medium
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Phrasal Verb + Adverb + Prepositional Phrase", // Grammar rule
    tags: ['negative', "don't", 'stay', 'up', 'late', 'health', 'sleep'], // Tags
    usageNote: 'Parents and doctors advise this for maintaining good health.', // Usage
    relatedSentences: ['Sleep on time.', 'Get enough sleep.', 'Go to bed early.'], // Related
  }, // End of question 164

  { // Question 165
    id: 'day3-q165', // Unique question ID
    hindi: 'बिना इजाज़त के मत जाओ।', // Hindi: Don't go without permission
    english: "Don't go without permission.", // Primary English answer
    alternatives: ["Do not leave without permission.", "Don't go without asking.", 'Ask before going.'], // Alternatives
    hint: 'बिना इजाज़त के = without permission. मत जाओ = don\'t go. "Don\'t go without permission."', // Hint
    explanation: '"Don\'t go without permission" — "without permission" is a prepositional phrase that modifies the verb "go." Very important rule for children in school, employees at work, and anyone in a structured environment.', // Explanation
    difficulty: 'medium', // Medium
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Prepositional Phrase", // Grammar rule
    tags: ['negative', "don't", 'go', 'permission', 'rules', 'school'], // Tags
    usageNote: 'Schools, offices, and homes all have this rule.', // Usage
    relatedSentences: ['Ask for permission.', "Don't leave early.", 'Report before leaving.'], // Related
  }, // End of question 165

  { // Question 166
    id: 'day3-q166', // Unique question ID
    hindi: 'दूसरों की चीज़ें मत छुओ।', // Hindi: Don't touch others' things
    english: "Don't touch other people's things.", // Primary English answer
    alternatives: ["Don't touch others' belongings.", "Do not touch other people's stuff.", 'Respect others\' belongings.'], // Alternatives
    hint: "दूसरों की चीज़ें = other people's things. मत छुओ = don't touch.", // Hint
    explanation: '"Don\'t touch other people\'s things" — "other people\'s" shows possession. This is a fundamental boundary and respect rule taught to children from an early age. "Belongings" is a more formal word for personal things/stuff.', // Explanation
    difficulty: 'medium', // Medium
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object's Noun", // Grammar rule
    tags: ['negative', "don't", 'touch', 'others', 'belongings', 'respect'], // Tags
    usageNote: 'An important rule about respecting other people\'s privacy and property.', // Usage
    relatedSentences: ['Respect others.', "Don't take others' things.", 'Ask before using.'], // Related
  }, // End of question 166

  { // Question 167
    id: 'day3-q167', // Unique question ID
    hindi: 'गंदा मत करो।', // Hindi: Don't make a mess / Don't dirty the place
    english: "Don't make a mess.", // Primary English answer
    alternatives: ["Don't dirty the place.", "Do not make a mess.", 'Keep it clean.', "Don't be messy."], // Alternatives
    hint: 'गंदा करना = to make dirty/messy. "Don\'t make a mess."', // Hint
    explanation: '"Don\'t make a mess" — "make a mess" is an idiomatic expression meaning to create disorder or untidiness. "Keep it clean" is the positive instruction. Common at home, in classrooms, and in public spaces.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Phrasal Verb + Article + Object", // Grammar rule
    tags: ['negative', "don't", 'mess', 'dirty', 'clean', 'hygiene'], // Tags
    usageNote: 'Said to children and in public places to maintain cleanliness.', // Usage
    relatedSentences: ['Keep it clean.', "Don't litter.", 'Tidy up.'], // Related
  }, // End of question 167

  { // Question 168
    id: 'day3-q168', // Unique question ID
    hindi: 'खाना खाते वक्त बात मत करो।', // Hindi: Don't talk while eating
    english: "Don't talk while eating.", // Primary English answer
    alternatives: ["Don't speak with your mouth full.", "Do not talk while eating.", 'Finish your food, then talk.'], // Alternatives
    hint: 'खाना खाते वक्त = while eating. बात न करो = don\'t talk. "Don\'t talk while eating."', // Hint
    explanation: '"Don\'t talk while eating" is a table manner rule. "While eating" is a temporal clause (showing WHEN not to talk). "Don\'t speak with your mouth full" is even more specific — it refers to not talking when food is in your mouth.', // Explanation
    difficulty: 'medium', // Medium — complex clause
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Temporal Clause", // Grammar rule
    tags: ['negative', "don't", 'talk', 'eating', 'manners', 'dining'], // Tags
    usageNote: 'A basic table manner rule taught to children.', // Usage
    relatedSentences: ['Eat quietly.', "Don't make noise while eating.", 'Finish then talk.'], // Related
  }, // End of question 168

  { // Question 169
    id: 'day3-q169', // Unique question ID
    hindi: 'रास्ते में अजनबियों से बात मत करो।', // Hindi: Don't talk to strangers on the way
    english: "Don't talk to strangers.", // Primary English answer
    alternatives: ["Don't speak with strangers.", "Do not talk to strangers.", "Don't trust strangers."], // Alternatives
    hint: 'अजनबी = stranger. बात मत करो = don\'t talk. "Don\'t talk to strangers."', // Hint
    explanation: '"Don\'t talk to strangers" is a critical safety rule for children. "Strangers" = people you do not know. This is one of the most important safety lessons. "Don\'t trust strangers" goes further, advising not to believe or follow strangers.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Prepositional Phrase", // Grammar rule
    tags: ['negative', "don't", 'strangers', 'safety', 'children', 'important'], // Tags
    usageNote: 'Critical child safety rule — strangers should not be trusted by children alone.', // Usage
    relatedSentences: ['Stay safe.', "Don't follow strangers.", 'Tell your parents if a stranger approaches.'], // Related
  }, // End of question 169

  { // Question 170
    id: 'day3-q170', // Unique question ID
    hindi: 'किसी की बुराई मत करो।', // Hindi: Don't speak badly about anyone
    english: "Don't speak badly about others.", // Primary English answer
    alternatives: ["Don't badmouth others.", "Don't gossip.", "Don't talk behind people's backs."], // Alternatives
    hint: 'किसी की बुराई = speaking badly about someone. "Don\'t speak badly about others."', // Hint
    explanation: '"Don\'t speak badly about others" is an ethical command. "Badmouth" is an informal verb meaning to say bad things about someone. "Gossip" means to talk about others\' private matters. "Talk behind someone\'s back" means to say bad things about them when they are not present.', // Explanation
    difficulty: 'medium', // Medium — multiple idioms
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Adverb + Prepositional Phrase", // Grammar rule
    tags: ['negative', "don't", 'gossip', 'badmouth', 'ethics', 'respect'], // Tags
    usageNote: 'Important ethical advice about speaking respectfully about others.', // Usage
    relatedSentences: ["Don't gossip.", 'Be kind in words.', "Don't judge others."], // Related
  }, // End of question 170

  { // Question 171
    id: 'day3-q171', // Unique question ID
    hindi: 'बात को बीच में मत काटो।', // Hindi: Don't interrupt
    english: "Don't interrupt.", // Primary English answer
    alternatives: ["Don't cut me off.", "Don't interrupt when others are speaking.", 'Let me finish.', "Do not interrupt."], // Alternatives
    hint: 'बात बीच में काटना = to interrupt. "Don\'t interrupt."', // Hint
    explanation: '"Don\'t interrupt" — "interrupt" means to cut into someone\'s speech before they finish. "Let me finish" is a command you give when you are the one being interrupted. "Don\'t cut me off" is informal slang meaning the same.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb", // Grammar rule
    tags: ['negative', "don't", 'interrupt', 'manners', 'listening', 'respect'], // Tags
    usageNote: 'A basic communication skill — let others finish before you speak.', // Usage
    relatedSentences: ['Let others speak.', 'Wait for your turn.', "Don't cut in."], // Related
  }, // End of question 171

  { // Question 172
    id: 'day3-q172', // Unique question ID
    hindi: 'इतना मत खाओ।', // Hindi: Don't eat so much / Don't overeat
    english: "Don't eat so much.", // Primary English answer
    alternatives: ["Don't overeat.", "Do not eat too much.", 'Eat in moderation.', 'Eat less.'], // Alternatives
    hint: 'इतना = so much/too much. मत खाओ = don\'t eat. "Don\'t eat so much."', // Hint
    explanation: '"Don\'t eat so much" is a health-related command. "Overeat" means to eat too much food. "Eat in moderation" is positive advice meaning to eat the right amount — not too much, not too little.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Intensifier", // Grammar rule
    tags: ['negative', "don't", 'eat', 'much', 'health', 'diet'], // Tags
    usageNote: 'Health advice to prevent overeating and maintain healthy weight.', // Usage
    relatedSentences: ['Eat less.', "Don't skip meals.", 'Eat healthy.'], // Related
  }, // End of question 172

  { // Question 173
    id: 'day3-q173', // Unique question ID
    hindi: 'खाना छोड़ो मत।', // Hindi: Don't skip meals
    english: "Don't skip meals.", // Primary English answer
    alternatives: ["Do not skip meals.", 'Eat regularly.', "Don't miss your meals."], // Alternatives
    hint: 'खाना छोड़ना = to skip a meal. "Don\'t skip meals."', // Hint
    explanation: '"Don\'t skip meals" — "skip" here means to intentionally not eat a meal. This is health advice. Skipping meals can cause blood sugar problems, lack of energy, and overeating later. "Eat regularly" is the positive command.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Object", // Grammar rule
    tags: ['negative', "don't", 'skip', 'meals', 'health', 'diet'], // Tags
    usageNote: 'Important health advice — regular meals maintain energy levels.', // Usage
    relatedSentences: ['Eat on time.', "Don't eat too much.", 'Have breakfast every day.'], // Related
  }, // End of question 173

  { // Question 174
    id: 'day3-q174', // Unique question ID
    hindi: 'इतना मत पीओ।', // Hindi: Don't drink so much
    english: "Don't drink so much.", // Primary English answer
    alternatives: ["Don't drink too much.", "Do not drink excessively.", 'Drink in moderation.'], // Alternatives
    hint: 'इतना = so much. मत पीओ = don\'t drink. "Don\'t drink so much."', // Hint
    explanation: '"Don\'t drink so much" — can refer to water (when drinking too fast), juice, or alcohol. Context matters. "Drink in moderation" is positive advice meaning to drink a reasonable amount.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Intensifier", // Grammar rule
    tags: ['negative', "don't", 'drink', 'much', 'health', 'moderation'], // Tags
    usageNote: 'Can be used for any type of drink — context determines the meaning.', // Usage
    relatedSentences: ["Don't eat so much.", 'Drink slowly.', 'Sip your water.'], // Related
  }, // End of question 174

  { // Question 175
    id: 'day3-q175', // Unique question ID
    hindi: 'गाड़ी तेज़ मत चलाओ।', // Hindi: Don't drive fast
    english: "Don't drive fast.", // Primary English answer
    alternatives: ["Do not drive fast.", "Don't speed.", 'Drive slowly.', 'Drive carefully.'], // Alternatives
    hint: 'गाड़ी = car/vehicle. तेज़ = fast. चलाना = to drive. "Don\'t drive fast."', // Hint
    explanation: '"Don\'t drive fast" is a safety command. "Don\'t speed" uses "speed" as a verb meaning to drive faster than the legal limit. "Speed" (noun) = rate of motion; "speed" (verb) = to drive too fast. "Drive safely" is the positive instruction.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Adverb", // Grammar rule
    tags: ['negative', "don't", 'drive', 'fast', 'safety', 'traffic'], // Tags
    usageNote: 'Critical road safety advice for drivers.', // Usage
    relatedSentences: ['Drive safely.', "Don't speed.", 'Obey traffic rules.'], // Related
  }, // End of question 175

  { // Question 176
    id: 'day3-q176', // Unique question ID
    hindi: 'गाड़ी चलाते वक्त मोबाइल मत चलाओ।', // Hindi: Don't use phone while driving
    english: "Don't use your phone while driving.", // Primary English answer
    alternatives: ["Don't text while driving.", "Do not use your mobile while driving.", 'Put the phone away while driving.'], // Alternatives
    hint: 'गाड़ी चलाते वक्त = while driving. मोबाइल = phone. "Don\'t use your phone while driving."', // Hint
    explanation: '"Don\'t use your phone while driving" is a crucial traffic safety rule. "Don\'t text while driving" is even more specific. This is illegal in many countries. "While driving" is a temporal clause.', // Explanation
    difficulty: 'medium', // Medium
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Base Verb + Possessive + Object + Temporal Clause", // Grammar rule
    tags: ['negative', "don't", 'phone', 'driving', 'safety', 'traffic', 'law'], // Tags
    usageNote: 'Critical road safety rule — illegal in most countries.', // Usage
    relatedSentences: ["Don't drive fast.", "Don't drink and drive.", 'Wear your seatbelt.'], // Related
  }, // End of question 176

  { // Question 177
    id: 'day3-q177', // Unique question ID
    hindi: 'शराब पीकर गाड़ी मत चलाओ।', // Hindi: Don't drink and drive
    english: "Don't drink and drive.", // Primary English answer
    alternatives: ["Do not drink and drive.", 'Never drink and drive.'], // Alternatives
    hint: '"Drink and drive" is a fixed expression. "Don\'t drink and drive."', // Hint
    explanation: '"Don\'t drink and drive" is a famous road safety slogan. "Drink" here refers to consuming alcohol. This phrase is so well known that it has become a fixed expression. It is illegal and extremely dangerous.', // Explanation
    difficulty: 'easy', // Easy — very well known
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Fixed Expression (Slogan)", // Grammar rule
    tags: ['negative', "don't", 'drink', 'drive', 'safety', 'alcohol', 'slogan'], // Tags
    usageNote: 'One of the most famous safety slogans in the world.', // Usage
    relatedSentences: ["Don't drive fast.", "Don't use your phone while driving.", 'Stay safe on the road.'], // Related
  }, // End of question 177

  { // Question 178
    id: 'day3-q178', // Unique question ID
    hindi: 'उम्मीद मत छोड़ो।', // Hindi: Don't give up hope / Don't lose hope
    english: "Don't give up hope.", // Primary English answer
    alternatives: ["Don't lose hope.", "Do not give up.", "Don't stop trying.", 'Keep going.'], // Alternatives
    hint: 'उम्मीद = hope. छोड़ना = to give up/lose. "Don\'t give up hope."', // Hint
    explanation: '"Don\'t give up hope" — "give up" is a phrasal verb meaning to stop trying. "Don\'t lose hope" uses "lose" which means the hope is gone (like losing something). Both mean to keep believing things will get better.', // Explanation
    difficulty: 'easy', // Easy
    category: 'negative-commands', // Category
    grammarRule: "Negative Imperative: Don't + Phrasal Verb + Object", // Grammar rule
    tags: ['negative', "don't", 'give', 'up', 'hope', 'motivation', 'encouragement'], // Tags
    usageNote: 'Said to encourage someone who is feeling hopeless or defeated.', // Usage
    relatedSentences: ['Keep trying.', 'Stay strong.', "Don't quit."],
  }, // End of question 178
]; // End of DAY_3_QUESTIONS array

export default function Day3PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <span className="text-slate-300">Day 3 Practice</span>
      </div>

      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          <BookOpen className="w-6 h-6 text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge-primary text-xs">Day 3</span>
          <h2 className="font-bold text-white">Imperative Sentences — Commands, Requests, Advice</h2>
          <p className="text-xs text-slate-500">{DAY_3_QUESTIONS.length} questions available</p>
        </div>
      </div>

      <PracticeQuizComponent
        questions={DAY_3_QUESTIONS}
        title="Day 3: Imperative Sentences"
        backHref="/75-days-challenge/3"
        questionsPerSession={Math.min(20, DAY_3_QUESTIONS.length)}
        shuffleMode={true}
      />
    </div>
  );
}